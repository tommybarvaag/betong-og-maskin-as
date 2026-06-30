import { defineType, defineField } from "sanity";
import { ShareIcon } from "@sanity/icons";

// Enum VALUES kept identical to the legacy schema (Facebook/Twitter/LinkedIn/GitHub) so
// existing companyInfo.socialMedias[].type values aren't orphaned. Dropped `liveEdit:true`
// (meaningless on an object type).
export const socialMedia = defineType({
  name: "socialMedia",
  title: "Social Media",
  type: "object",
  icon: ShareIcon,
  fields: [
    defineField({
      title: "Type",
      name: "type",
      type: "string",
      options: {
        layout: "dropdown",
        list: [
          { title: "Facebook", value: "Facebook" },
          { title: "Twitter / X", value: "Twitter" },
          { title: "LinkedIn", value: "LinkedIn" },
          { title: "GitHub", value: "GitHub" },
        ],
      },
    }),
    defineField({ name: "url", title: "URL", type: "url" }),
  ],
});
