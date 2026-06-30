import type { StructureResolver } from "sanity/structure";
import {
  HomeIcon,
  WrenchIcon,
  UsersIcon,
  EnvelopeIcon,
  CaseIcon,
  ThLargeIcon,
  ArchiveIcon,
} from "@sanity/icons";

// Single editor for a fixed-id singleton.
const singleton = (
  S: Parameters<StructureResolver>[0],
  id: string,
  schemaType: string,
  title: string,
) =>
  S.listItem()
    .title(title)
    .id(id)
    .child(S.editor().id(id).schemaType(schemaType).documentId(id));

// Redesign content up top; the legacy types (page/service/siteSettings) are kept under "Arkiv"
// for backwards compatibility with existing production data.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Innhold")
    .items([
      singleton(S, "homePage", "homePage", "Forside").icon(HomeIcon),
      singleton(S, "tjenesterPage", "tjenesterPage", "Tjenester").icon(
        WrenchIcon,
      ),
      singleton(S, "omOssPage", "omOssPage", "Om oss").icon(UsersIcon),
      singleton(S, "kontaktPage", "kontaktPage", "Kontakt").icon(EnvelopeIcon),
      S.divider(),
      S.documentTypeListItem("serviceCategory")
        .title("Tjenesteområder")
        .icon(ThLargeIcon),
      singleton(S, "companyInfo", "companyInfo", "Firmaopplysninger").icon(
        CaseIcon,
      ),
      S.divider(),
      S.listItem()
        .title("Arkiv (gammelt oppsett)")
        .icon(ArchiveIcon)
        .child(
          S.list()
            .title("Arkiv")
            .items([
              S.documentTypeListItem("page").title("Sider"),
              S.documentTypeListItem("service").title("Tjenester"),
              singleton(S, "siteSettings", "siteSettings", "Site Settings"),
            ]),
        ),
    ]);
