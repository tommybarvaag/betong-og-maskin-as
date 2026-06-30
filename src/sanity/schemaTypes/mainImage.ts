import { defineType, defineField } from "sanity";

// Kept as a SEPARATE named type from `figure` (do not merge): existing documents store
// objects with _type:'mainImage' / 'figure'; a merge would orphan that content.
export const mainImage = defineType({
  name: "mainImage",
  title: "Main image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "alt",
      title: "Alternative text (for screen readers)",
      type: "string",
      // Non-blocking nudge (existing docs lack alt): missing alt warns in the Studio but never
      // blocks publish. Empty alt costs image-search relevance + accessibility.
      validation: (Rule) =>
        Rule.required().warning("Legg til alt-tekst for skjermlesere og SEO."),
    }),
  ],
});
