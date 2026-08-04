import { defineType, defineField } from "sanity";
import { WrenchIcon } from "@sanity/icons/Wrench";

// Singleton (fixed _id 'tjenesterPage'). The service blocks come from serviceCategory; this
// holds the page hero and the closing CTA band.
export const tjenesterPage = defineType({
  name: "tjenesterPage",
  title: "Tjenester",
  type: "document",
  icon: WrenchIcon,
  fields: [
    defineField({ name: "hero", title: "Hero", type: "pageHero" }),
    defineField({
      name: "cta",
      title: "CTA-stripe",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Overskrift", type: "string" }),
        defineField({
          name: "description",
          title: "Tekst",
          type: "string",
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Tjenester" }) },
});
