import { defineType, defineField, defineArrayMember } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

// Singleton (one fixed _id 'siteSettings'). `menu` stays an array of references to `page`
// documents — projected as { title, 'slug': slug.current } and fed through hrefForSlug().
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "menu",
      title: "Menu",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "page" }] })],
    }),
  ],
});
