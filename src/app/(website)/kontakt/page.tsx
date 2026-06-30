import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, Mail, MapPin } from "lucide-react";
import { KickerLabel } from "@/components/KickerLabel";
import { Masthead } from "@/components/Masthead";
import { ContactMethodCard } from "@/components/ContactMethodCard";
import { ContactForm } from "@/components/ContactForm";
import { loadKontakt, loadLayout } from "@/sanity/lib/load";
import {
  phoneHref,
  phoneDisplay,
  mailtoHref,
  emailAddress,
  formatAddress,
  mapsUrl,
  companyName,
  managingDirector,
  orgNumber,
  region,
} from "@/lib/company";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Ring, send e-post eller bruk skjemaet — Betong & Maskin AS på Radøy tar kontakt med deg.",
  alternates: { canonical: "/kontakt" },
};

export default async function KontaktPage() {
  const [{ info }, { page }] = await Promise.all([loadLayout(), loadKontakt()]);

  if (!page) notFound();

  return (
    <>
      <Masthead
        eyebrow={page.hero?.eyebrow}
        headline={page.hero?.headline}
        intro={page.hero?.intro}
      />

      <section className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[clamp(32px,4vw,52px)] px-6 py-[clamp(48px,6vw,84px)]">
        <div className="flex flex-col gap-3.5">
          <ContactMethodCard
            variant="amber"
            monoLabel
            icon={<Phone className="size-6" />}
            label="Ring oss"
            value={phoneDisplay(info)}
            href={phoneHref(info)}
            className="gap-[18px] rounded-[14px] p-[22px]"
            iconTileClassName="size-[54px] rounded-[11px]"
            valueClassName="text-[22px] font-bold"
          />
          <ContactMethodCard
            monoLabel
            icon={<Mail className="size-6" strokeWidth={1.8} />}
            label="E-post"
            value={emailAddress(info)}
            href={mailtoHref(info)}
            className="gap-[18px] rounded-[14px] p-[22px]"
            iconTileClassName="size-[54px] rounded-[11px]"
            valueClassName="break-words"
          />
          <ContactMethodCard
            monoLabel
            icon={<MapPin className="size-6" strokeWidth={1.8} />}
            label="Adresse"
            value={formatAddress(info)}
            className="gap-[18px] rounded-[14px] p-[22px]"
            iconTileClassName="size-[54px] rounded-[11px]"
          />
          <a
            href={mapsUrl(info)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Åpne adressen i Google Maps"
            className="border-line hover:border-primary/40 relative block aspect-[16/9] overflow-hidden rounded-[14px] border transition-colors"
            style={{
              background:
                "radial-gradient(circle at 50% 45%,#1d2433 0%,#11151f 100%)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />
            <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2.5">
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="#f2a413"
                stroke="#1a1205"
                strokeWidth="1.2"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="2.6" fill="#1a1205" />
              </svg>
              <span className="text-dim rounded-md bg-[#0f1320]/70 px-2.5 py-1.5 font-mono text-[11px] tracking-[1px]">
                ÅPNE I GOOGLE MAPS →
              </span>
            </div>
          </a>
          <div className="border-line bg-surface rounded-[14px] border p-[22px]">
            <KickerLabel className="mb-4 text-[11px]">
              FORETAKSOPPLYSNINGER
            </KickerLabel>
            <div className="grid grid-cols-[auto_1fr] gap-x-[18px] gap-y-2.5 text-[15px]">
              <span className="text-faint">Foretak</span>
              <span className="text-[#e6e9ef]">{companyName(info)}</span>
              <span className="text-faint">Daglig leder</span>
              <span className="text-[#e6e9ef]">{managingDirector(info)}</span>
              <span className="text-faint">Org.nr</span>
              <span className="text-[#e6e9ef]">{orgNumber(info)}</span>
              <span className="text-faint">Sted</span>
              <span className="text-[#e6e9ef]">{region()}</span>
            </div>
          </div>
        </div>
        <ContactForm
          heading={page.formHeading ?? undefined}
          description={page.formDescription ?? undefined}
          className="sticky top-24 p-[clamp(24px,3vw,40px)]"
        />
      </section>
    </>
  );
}
