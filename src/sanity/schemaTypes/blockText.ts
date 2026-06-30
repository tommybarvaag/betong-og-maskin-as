import { defineType, defineArrayMember } from "sanity";

// Paragraph-level rich text. Ported 1:1 from the legacy schema.
export const blockText = defineType({
  title: "Block Text",
  name: "blockText",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [],
      },
    }),
  ],
});
