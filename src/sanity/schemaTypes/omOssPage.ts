import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons/Users";

// Singleton (fixed _id 'omOssPage'). The services list is derived from serviceCategory
// subServices; this holds the hero, founder story, stat cards, quote and CTA copy.
export const omOssPage = defineType({
  name: "omOssPage",
  title: "Om oss",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({ name: "hero", title: "Hero", type: "pageHero" }),
    defineField({
      name: "story",
      title: "Historie",
      type: "blockText",
      description: "Bruk fet skrift for å fremheve (f.eks. navn).",
    }),
    defineField({
      name: "image",
      title: "Bilde (Joar / teamet)",
      type: "mainImage",
    }),
    defineField({
      name: "statCards",
      title: "Nøkkeltall-kort",
      type: "array",
      of: [{ type: "stat" }],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "quote",
      title: "Sitat (gul stripe)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "servicesSection",
      title: "Tjenesteliste-seksjon",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Overskrift", type: "string" }),
        defineField({
          name: "outro",
          title: "Avsluttende tekst",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({ name: "ctaTitle", title: "CTA-overskrift", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Om oss" }) },
});
