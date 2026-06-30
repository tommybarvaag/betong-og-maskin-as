import { defineType, defineField } from "sanity";

// Reusable headline statistic — trust strip + about stat cards.
export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Value", type: "string" }),
    defineField({ name: "label", title: "Label", type: "string" }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});
