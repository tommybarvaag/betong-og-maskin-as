import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons/Document";

// MULTI-DOCUMENT type (NOT a singleton): three fixed _ids — 'home' / 'about' / 'contact' —
// pinned in the structure. The frontend queries pages by _id. Hero is `image`, parallax is
// `parallaxImage` (both mainImage).
export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      readOnly: true,
    }),
    defineField({ name: "image", title: "Image (hero)", type: "mainImage" }),
    defineField({ name: "text", title: "Text", type: "blockText" }),
    defineField({
      name: "parallaxImage",
      title: "Parallax Image",
      type: "mainImage",
    }),
    defineField({
      name: "enableContactForm",
      title: "Enable contact form",
      type: "boolean",
    }),
    defineField({
      name: "enableGoogleMaps",
      title: "Enable Google Maps",
      type: "boolean",
    }),
  ],
});
