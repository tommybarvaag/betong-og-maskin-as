import { MdSettings } from "react-icons/md";

export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  __experimental_actions: ["update", "publish" /* 'create', 'delete' */],
  icon: MdSettings,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "description",
      title: "Description",
      type: "text"
    },
    {
      name: "menu",
      title: "Menu",
      type: "array",
      of: [{ type: "reference", to: { type: "page" } }]
    },
    {
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags"
      }
    },
    {
      name: "author",
      title: "Author",
      type: "string"
    }
  ]
};
