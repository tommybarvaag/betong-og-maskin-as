import { defineType, defineField } from "sanity";
import { WrenchIcon } from "@sanity/icons";

// A fagområde (Støping / Muring / Graving). Drives the home pillars, the /tjenester blocks, and
// (via subServices) the /om-oss service list. `icon` values must stay in sync with the lucide
// map in src/components/ServiceIcon.tsx.
export const serviceCategory = defineType({
  name: "serviceCategory",
  title: "Tjenesteområde",
  type: "document",
  icon: WrenchIcon,
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Ikon",
      type: "string",
      initialValue: "layers",
      options: {
        list: [
          { title: "Lag (støping)", value: "layers" },
          { title: "Murvegg (muring)", value: "brick-wall" },
          { title: "Lastebil (graving)", value: "truck" },
          { title: "Hammer", value: "hammer" },
          { title: "Spade", value: "shovel" },
          { title: "Hakke", value: "pickaxe" },
          { title: "Hjelm", value: "hard-hat" },
          { title: "Måling", value: "ruler" },
          { title: "Verktøy", value: "wrench" },
          { title: "Maskin", value: "forklift" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Rekkefølge",
      type: "number",
      description: "Lav til høy. Styrer 01/02/03-nummereringen.",
    }),
    defineField({
      name: "pillarText",
      title: "Kort tekst (forside)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description",
      title: "Beskrivelse (tjenester)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "subServices",
      title: "Undertjenester (chips)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      title: "Bilde (tjenester)",
      type: "mainImage",
    }),
  ],
  preview: { select: { title: "title", subtitle: "order", media: "image" } },
});
