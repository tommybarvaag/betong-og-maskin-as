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
      name: "enableContactForm",
      title: "Enable contact form",
      type: "boolean"
    }
  ]
};
