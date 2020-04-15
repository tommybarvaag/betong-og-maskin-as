import S from "@sanity/desk-tool/structure-builder";
import { FaFile } from "react-icons/fa";
import { MdBusiness, MdSettings, MdAttachMoney, MdBuild } from "react-icons/md";

const hiddenTypes = [
  "category",
  "companyInfo",
  "page",
  "person",
  "service",
  "project",
  "siteSettings"
];

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(S.editor().id("siteSettings").schemaType("siteSettings").documentId("siteSettings"))
        .icon(MdSettings),
      S.listItem()
        .title("Company Info")
        .child(S.editor().id("companyInfo").schemaType("companyInfo").documentId("companyInfo"))
        .icon(MdBusiness),
      S.listItem()
        .title("Projects")
        .schemaType("project")
        .child(S.documentTypeList("project"))
        .icon(MdAttachMoney),
      S.listItem()
        .title("Services")
        .schemaType("service")
        .child(S.documentTypeList("service").title("Services"))
        .icon(MdBuild),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Home")
                .child(S.editor().id("homePage").schemaType("page").documentId("home"))
                .icon(FaFile),
              S.listItem()
                .title("About")
                .child(S.editor().id("aboutPage").schemaType("page").documentId("about"))
                .icon(FaFile),
              S.listItem()
                .title("Contact")
                .child(S.editor().id("contactPage").schemaType("page").documentId("contact"))
                .icon(FaFile)
            ])
        ),
      S.listItem()
        .title("People")
        .schemaType("person")
        .child(S.documentTypeList("person").title("People")),
      S.listItem()
        .title("Categories")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categories")),
      ...S.documentTypeListItems().filter(listItem => !hiddenTypes.includes(listItem.getId()))
    ]);
