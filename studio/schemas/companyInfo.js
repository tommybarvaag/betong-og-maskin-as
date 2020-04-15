import { MdBusiness } from "react-icons/md";

export default {
  name: "companyInfo",
  title: "Company Info",
  type: "document",
  __experimental_actions: ["update", "publish" /* 'create', 'delete' */],
  icon: MdBusiness,
  fields: [
    {
      name: "name",
      title: "Company name",
      type: "string"
    },
    {
      name: "email",
      title: "Email",
      type: "email"
    },
    {
      name: "phone",
      title: "Phone",
      type: "string"
    },
    {
      name: "address1",
      title: "Address 1",
      type: "string"
    },
    {
      name: "address2",
      title: "Address 2",
      type: "string"
    },
    {
      name: "zipCode",
      title: "ZIP Code",
      type: "string"
    },
    {
      name: "city",
      title: "City",
      type: "string"
    },
    {
      name: "country",
      title: "Country",
      type: "string"
    },
    {
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url"
    },
    {
      name: "linkedInUrl",
      title: "LinkedIn URL",
      type: "url"
    },
    {
      name: "twitterUrl",
      title: "Twitter URL",
      type: "url"
    },
    {
      name: "gitHubUrl",
      title: "GitHub URL",
      type: "url"
    }
  ]
};
