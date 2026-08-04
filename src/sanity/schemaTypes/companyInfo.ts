import { defineType, defineField } from "sanity";
import { CaseIcon } from "@sanity/icons/Case";

// Singleton (one fixed _id 'companyInfo'); singleton behaviour enforced in structure + config.
export const companyInfo = defineType({
  name: "companyInfo",
  title: "Company Info",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({ name: "name", title: "Company name", type: "string" }),
    defineField({
      name: "managingDirector",
      title: "Managing director (daglig leder)",
      type: "string",
    }),
    defineField({
      name: "orgNumber",
      title: "Org. number (org.nr)",
      type: "string",
    }),
    defineField({ name: "email", title: "Email", type: "email" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "address1", title: "Address 1", type: "string" }),
    // Retained though not rendered (editors may have data) — consistent with legacy behaviour.
    defineField({ name: "address2", title: "Address 2", type: "string" }),
    defineField({ name: "zipCode", title: "ZIP Code", type: "string" }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "country", title: "Country", type: "string" }),
    defineField({
      name: "googleMapsLatitude",
      title: "Google Maps Latitude",
      type: "number",
    }),
    defineField({
      name: "googleMapsLongitude",
      title: "Google Maps Longitude",
      type: "number",
    }),
    defineField({
      name: "googleMapsZoom",
      title: "Google Maps Zoom level",
      type: "number",
    }),
    defineField({
      name: "socialMedias",
      title: "Social Media",
      type: "array",
      of: [{ type: "socialMedia" }],
    }),
  ],
});
