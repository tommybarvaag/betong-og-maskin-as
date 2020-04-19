export default {
  name: "page",
  title: "Page",
  type: "document",
  liveEdit: false,
  __experimental_actions: ["update", "publish" /* 'create', 'delete' */],
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
        maxLength: 96
      }
    },
    {
      name: "image",
      title: "Image",
      type: "mainImage"
    },
    {
      name: "text",
      title: "Text",
      type: "blockText"
    },
    {
      name: "parallaxImage",
      title: "Parallax Image",
      type: "mainImage"
    },
    {
      name: "enableContactForm",
      title: "Enable contact form",
      type: "boolean"
    },
    {
      name: "enableGoogleMaps",
      title: "Enable Google Maps",
      type: "boolean"
    }
  ]
};
