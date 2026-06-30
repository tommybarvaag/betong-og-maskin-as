import type { SchemaTypeDefinition } from "sanity";

import { mainImage } from "./mainImage";
import { blockText } from "./blockText";
import { socialMedia } from "./socialMedia";
import { pageHero } from "./pageHero";
import { stat } from "./stat";
import { homePage } from "./homePage";
import { tjenesterPage } from "./tjenesterPage";
import { omOssPage } from "./omOssPage";
import { kontaktPage } from "./kontaktPage";
import { serviceCategory } from "./serviceCategory";
import { companyInfo } from "./companyInfo";
// legacy documents — kept for backwards compatibility with existing production content
import { page } from "./page";
import { service } from "./service";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  mainImage,
  blockText,
  socialMedia,
  pageHero,
  stat,
  homePage,
  tjenesterPage,
  omOssPage,
  kontaktPage,
  serviceCategory,
  companyInfo,
  page,
  service,
  siteSettings,
];
