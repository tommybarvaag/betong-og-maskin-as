import { MdBuild } from "react-icons/md";
import speakingurl from "speakingurl";

function getSlug(value, options = { truncate: 200, symbols: true }) {
  return value ? speakingurl(value, options) : "";
}

export default {
  name: "service",
  title: "Service",
  type: "document",
  icon: MdBuild,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Some frontend will require a slug to be set to be able to show the post",
      options: {
        source: "title",
        slugify: input => `tjenester/${getSlug(input)}`
      }
    },
    {
      name: "text",
      title: "Text",
      type: "blockText"
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "mainImage"
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }]
    }
  ],
  preview: {
    select: {
      title: "title",
      image: "mainImage"
    }
  }
};
