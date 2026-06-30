import { defineType, defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

// Singleton (fixed _id 'kontaktPage'). Contact methods + foretaksopplysninger render from
// companyInfo; this holds the hero and the form heading/description.
export const kontaktPage = defineType({
  name: "kontaktPage",
  title: "Kontakt",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: "hero", title: "Hero", type: "pageHero" }),
    defineField({
      name: "formHeading",
      title: "Skjema-overskrift",
      type: "string",
    }),
    defineField({
      name: "formDescription",
      title: "Skjema-tekst",
      type: "text",
      rows: 2,
    }),
  ],
  preview: { prepare: () => ({ title: "Kontakt" }) },
});
