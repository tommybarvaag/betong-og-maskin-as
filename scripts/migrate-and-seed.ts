/**
 * Standalone migrate + seed for the redesign CMS structures.
 *
 * Run in isolation:
 *   SANITY_API_WRITE_TOKEN=<token> pnpm dlx tsx scripts/migrate-and-seed.ts
 *
 * - READ-ONLY on the legacy archived setup (page / service / companyInfo). It never writes them.
 * - Migrates legacy real content where it maps 1:1 (page images, about story) into the new docs.
 * - Pushes the locked prototype copy into the new singletons + serviceCategory documents.
 * - Idempotent: fixed _ids + createOrReplace, so re-running overwrites the new docs only.
 */
import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

const projectId = "t6pwhwps";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2026-02-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN. Aborting.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

type ImageRef = {
  _type?: string;
  _key?: string;
  asset?: { _ref: string };
  alt?: string;
  caption?: string;
} | null;

type LegacyPage = {
  _id: string;
  title: string | null;
  image: ImageRef;
  text: unknown[] | null;
};

type LegacyService = { _id: string; title: string | null; mainImage: ImageRef };

type Doc = { _id: string; _type: string } & Record<string, unknown>;

const key = () => randomUUID().slice(0, 12);
const stat = (value: string, label: string) => ({
  _type: "stat",
  _key: key(),
  value,
  label,
});
const galleryItem = (caption: string): ImageRef => ({
  _type: "mainImage",
  _key: key(),
  caption,
});

const SERVICE_CATEGORIES = [
  {
    suffix: "stoping",
    title: "Støping",
    icon: "layers",
    order: 1,
    pillarText:
      "Gulvstøp, ringmurer, innstøping av kai og lavtbyggende badegulv. Vi støper gjerne ditt nye gulv.",
    description:
      "Solid betongarbeid fra grunn til ferdig overflate. Vi støper gjerne ditt nye gulv — enten det er nybygg, garasje eller tilbygg.",
    subServices: [
      "Gulvstøp",
      "Ringmurer til hus og garasje",
      "Innstøping av kai",
      "Lavtbyggende badegulv",
    ],
  },
  {
    suffix: "muring",
    title: "Muring",
    icon: "brick-wall",
    order: 2,
    pillarText:
      "Forstøtningsmurer, hagemurer og natursteinsmuring — solid håndverk som står seg i vestlandsvær.",
    description:
      "Murverk som står seg i vestlandsvær. Vi bygger funksjonelle og pene murer — i betong, blokk og naturstein.",
    subServices: ["Forstøtningsmurer", "Hagemurer", "Natursteinsmuring"],
  },
  {
    suffix: "graving",
    title: "Graving",
    icon: "truck",
    order: 3,
    pillarText:
      "Mindre gravejobber, tilkjøring og bortkjøring av masser. Riktig maskin til riktig oppdrag.",
    description:
      "Riktig maskin til riktig oppdrag. Vi tar mindre gravejobber og håndterer masser inn og ut av tomta di.",
    subServices: [
      "Mindre gravejobber",
      "Tilkjøring av masser",
      "Bortkjøring av masser",
    ],
  },
];

const GALLERY = [
  "GULVSTØP — NYBYGG",
  "NATURSTEINSMUR",
  "FORSTØTNINGSMUR",
  "RINGMUR GARASJE",
  "GRAVEARBEID",
  "INNSTØPING AV KAI",
];

// Prototype "Joar Morken" story as portable text (strong on the name).
function storyBlocks() {
  const span = (text: string, marks: string[] = []) => ({
    _type: "span",
    _key: key(),
    text,
    marks,
  });
  const block = (children: ReturnType<typeof span>[]) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children,
  });

  return [
    block([
      span("I 2016 startet daglig leder "),
      span("Joar Morken", ["strong"]),
      span(
        " selskapet Betong & Maskin AS. Entreprenørvirksomheten er lokalisert på Radøy i Alver kommune.",
      ),
    ]),
    block([
      span(
        "Vi ønsker å være en allsidig entreprenør der vi setter gjensidig tillit med kunder og samarbeidspartnere høyt for å nå felles mål.",
      ),
    ]),
    block([
      span(
        "Betong & Maskin er en liten, men seriøs og fleksibel bedrift som driver med det meste innenfor mur og betong. Vi er opptatt av å ta kunden på alvor og holde en god dialog gjennom hele byggeprosessen — det være seg både små og større oppdrag.",
      ),
    ]),
  ];
}

async function main() {
  console.log(`→ ${projectId}/${dataset} (apiVersion ${apiVersion})`);

  // READ-ONLY: legacy archived content.
  const [pages, services] = await Promise.all([
    client.fetch<LegacyPage[]>(`*[_type == "page"]{ _id, title, image, text }`),
    client.fetch<LegacyService[]>(
      `*[_type == "service"]{ _id, title, mainImage }`,
    ),
  ]);
  console.log(
    `Read legacy: ${pages.length} page(s), ${services.length} service(s).`,
  );

  const home = pages.find((p) => p._id === "home");
  const about = pages.find((p) => p._id === "about");

  // Best-effort: reuse a legacy service photo whose title matches the fagområde name.
  const matchImage = (title: string): ImageRef =>
    services.find(
      (s) =>
        s.mainImage?.asset &&
        (s.title ?? "").toLowerCase().includes(title.toLowerCase()),
    )?.mainImage ?? null;

  const serviceDocs: Doc[] = SERVICE_CATEGORIES.map((c) => {
    const image = matchImage(c.title);

    return {
      // Hyphen, never a dot: Sanity treats dotted document IDs as private (not readable by
      // anonymous/published API reads), which would hide these from the live site.
      _id: `serviceCategory-${c.suffix}`,
      _type: "serviceCategory",
      title: c.title,
      icon: c.icon,
      order: c.order,
      pillarText: c.pillarText,
      description: c.description,
      subServices: c.subServices,
      ...(image ? { image } : {}),
    };
  });

  const legacyStory =
    about?.text && about.text.length > 0 ? about.text : undefined;

  const homeDoc: Doc = {
    _id: "homePage",
    _type: "homePage",
    hero: {
      _type: "pageHero",
      eyebrow: "ENTREPRENØR PÅ RADØY",
      headline: "Din entreprenør på Radøy",
      intro:
        "Mur, betong og graving for små og store oppdrag. Vi tar kunden på alvor og holder god dialog gjennom hele byggeprosessen.",
    },
    ...(home?.image?.asset ? { heroImage: home.image } : {}),
    trustStats: [
      stat("2016", "Etablert på Radøy"),
      stat("3", "Fagområder: mur, betong, graving"),
      stat("Alver", "& omegn — andre steder også aktuelt"),
      stat("100%", "Gjensidig tillit med kunden"),
    ],
    pillars: {
      eyebrow: "// HVA VI GJØR",
      heading: "Tre solide fagområder",
      linkLabel: "Se alle tjenester",
    },
    amberBand: {
      eyebrow: "// FRA GRUNN TIL FERDIG GULV",
      headline: "Vi støper gjerne ditt nye gulv",
      ctaLabel: "Snakk med oss",
    },
    gallery: {
      eyebrow: "// UTFØRTE PROSJEKT",
      heading: "Et utvalg av arbeidet",
      images: GALLERY.map(galleryItem),
    },
    contact: {
      eyebrow: "// TA KONTAKT",
      heading: "Ønsker du at vi kontakter deg?",
      intro:
        "Ta kontakt for en hyggelig byggeprosjekt-prat — du vil ikke angre. Ring direkte, eller bruk skjemaet så tar vi kontakt med deg.",
    },
  };

  const tjenesterDoc: Doc = {
    _id: "tjenesterPage",
    _type: "tjenesterPage",
    hero: {
      _type: "pageHero",
      eyebrow: "// TJENESTER",
      headline: "Mur, betong og graving",
      intro:
        "Vi driver med det meste innenfor mur og betong, og tar både små og større oppdrag. Her er de tre fagområdene våre.",
    },
    cta: {
      title: "Har du et prosjekt?",
      description: "Ta kontakt for en uforpliktende prat om jobben.",
    },
  };

  const omDoc: Doc = {
    _id: "omOssPage",
    _type: "omOssPage",
    hero: {
      _type: "pageHero",
      eyebrow: "// OM OSS",
      headline: "En seriøs entreprenør på Radøy",
    },
    story: legacyStory ?? storyBlocks(),
    ...(about?.image?.asset ? { image: about.image } : {}),
    statCards: [
      stat("2016", "Etablert"),
      stat("Alver", "Nedslagsfelt & omegn"),
    ],
    quote:
      "«Ta kontakt for en hyggelig byggeprosjekt-prat — du vil ikke angre.»",
    servicesSection: {
      eyebrow: "// VÅRE TJENESTER",
      heading: "Dette kan vi hjelpe deg med",
      outro:
        "Nedslagsfeltet er Alver og omegn, men andre steder lenger unna er også aktuelle. Ta kontakt, så finner vi en god løsning sammen.",
    },
    ctaTitle: "La oss ta en prat om prosjektet ditt",
  };

  const kontaktDoc: Doc = {
    _id: "kontaktPage",
    _type: "kontaktPage",
    hero: {
      _type: "pageHero",
      eyebrow: "// KONTAKT",
      headline: "Ta kontakt",
      intro:
        "Ring oss direkte for en rask prat, send en e-post, eller fyll ut skjemaet — så kontakter vi deg.",
    },
    formHeading: "Ønsker du at vi kontakter deg?",
    formDescription: "Bruk skjemaet nedenfor, så kontakter vi deg.",
  };

  const docs: Doc[] = [
    homeDoc,
    tjenesterDoc,
    omDoc,
    kontaktDoc,
    ...serviceDocs,
  ];
  const tx = docs.reduce(
    (t, doc) => t.createOrReplace(doc),
    client.transaction(),
  );
  await tx.commit();

  console.log(
    `Wrote ${docs.length} doc(s): homePage, tjenesterPage, omOssPage, kontaktPage + ${serviceDocs.length} serviceCategory.`,
  );
  console.log(
    `Migrated → heroImage: ${home?.image?.asset ? "from legacy home" : "none (uses default)"}, about image: ${about?.image?.asset ? "from legacy about" : "none"}, story: ${legacyStory ? "from legacy about.text" : "prototype"}.`,
  );
  console.log("Legacy page/service/companyInfo were NOT modified.");
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
