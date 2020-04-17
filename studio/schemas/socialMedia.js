import { MdShare } from "react-icons/md";

export default {
  name: "socialMedia",
  title: "Social Media",
  type: "object",
  icon: MdShare,
  fields: [
    {
      title: "Type",
      name: "type",
      type: "string",
      options: {
        layout: "dropdown",
        list: [
          { title: "Facebook", value: "Facebook" },
          { title: "Twitter", value: "Twitter" },
          { title: "LinkedIn", value: "LinkedIn" },
          { title: "GitHub", value: "GitHub" }
        ]
      }
    },
    {
      name: "url",
      title: "URL",
      type: "url"
    }
  ],
  liveEdit: true
};
