import { defineType, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

// Singleton (fixed _id 'homePage') for the Forside. Pillar cards come from serviceCategory; the
// rest of the copy lives here. Every field is optional — the frontend falls back to the locked
// prototype copy when empty.
export const homePage = defineType({
  name: "homePage",
  title: "Forside",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({ name: "hero", title: "Hero", type: "pageHero" }),
    defineField({
      name: "heroImage",
      title: "Hero-bilde (overstyrer standardbildet)",
      type: "mainImage",
    }),
    defineField({
      name: "trustStats",
      title: "Nøkkeltall (stripe)",
      type: "array",
      of: [{ type: "stat" }],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "pillars",
      title: "Fagområder-seksjon",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Overskrift", type: "string" }),
        defineField({ name: "linkLabel", title: "Lenketekst", type: "string" }),
      ],
    }),
    defineField({
      name: "amberBand",
      title: "Gul stripe",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Kicker", type: "string" }),
        defineField({ name: "headline", title: "Overskrift", type: "string" }),
        defineField({ name: "ctaLabel", title: "Knappetekst", type: "string" }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galleri",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Overskrift", type: "string" }),
        defineField({
          name: "images",
          title: "Bilder",
          type: "array",
          of: [{ type: "mainImage" }],
        }),
      ],
    }),
    defineField({
      name: "contact",
      title: "Kontakt-seksjon",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Overskrift", type: "string" }),
        defineField({ name: "intro", title: "Ingress", type: "text", rows: 3 }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Forside" }) },
});
