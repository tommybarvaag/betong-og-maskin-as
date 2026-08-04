import { defineType, defineField } from "sanity";
import { WrenchIcon } from "@sanity/icons/Wrench";

// Service. `slug` is retained but UNUSED for routing (services render only as home-page cards;
// see decision: no /tjenester/[slug] route). The legacy `tjenester/`-prefix slugify + the
// `speakingurl` dep are dropped — existing slug values in content are untouched. `categories`
// dropped with the `category` type.
export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: WrenchIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({ name: "mainImage", title: "Main image", type: "mainImage" }),
  ],
  preview: {
    select: { title: "title", media: "mainImage" },
  },
});
