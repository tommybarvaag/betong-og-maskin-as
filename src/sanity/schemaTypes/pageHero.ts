import { defineType, defineField } from "sanity";

// Reusable hero block shared by every page.
export const pageHero = defineType({
  name: "pageHero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow (// kicker)",
      type: "string",
    }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
  ],
});
