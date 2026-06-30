import { defineQuery } from "next-sanity";

// Company info for the header, footer, contact page and JSON-LD. No params → cacheable shell.
export const LAYOUT_QUERY = defineQuery(`{
  "info": *[_type == "companyInfo"][0]{
    name, managingDirector, orgNumber,
    address1, address2, zipCode, city, country, email, phone,
    googleMapsLatitude, googleMapsLongitude,
    socialMedias[]{ type, url }
  }
}`);

// Fagområder, ordered. Drive the home pillars, the /tjenester blocks and (via subServices) the
// /om-oss list. Projected inline per page query below so typegen stays static.
export const HOME_QUERY = defineQuery(`{
  "page": *[_id == "homePage"][0]{
    hero, heroImage, trustStats, pillars, amberBand, gallery, contact
  },
  "services": *[_type == "serviceCategory"] | order(order asc){
    _id, title, icon, pillarText
  }
}`);

export const TJENESTER_QUERY = defineQuery(`{
  "page": *[_id == "tjenesterPage"][0]{ hero, cta },
  "services": *[_type == "serviceCategory"] | order(order asc){
    _id, title, icon, description, subServices, image
  }
}`);

export const OM_QUERY = defineQuery(`{
  "page": *[_id == "omOssPage"][0]{
    hero, story, image, statCards, quote, servicesSection, ctaTitle
  },
  "services": *[_type == "serviceCategory"] | order(order asc){ subServices }
}`);

export const KONTAKT_QUERY = defineQuery(`{
  "page": *[_id == "kontaktPage"][0]{ hero, formHeading, formDescription }
}`);

// Per-route lastModified for the sitemap. Each route maps to its primary document's _updatedAt;
// the home + tjenester routes also reflect the latest serviceCategory edit (services render there).
export const SITEMAP_QUERY = defineQuery(`{
  "home": *[_id == "homePage"][0]._updatedAt,
  "tjenester": *[_id == "tjenesterPage"][0]._updatedAt,
  "omOss": *[_id == "omOssPage"][0]._updatedAt,
  "kontakt": *[_id == "kontaktPage"][0]._updatedAt,
  "servicesUpdatedAt": *[_type == "serviceCategory"] | order(_updatedAt desc)[0]._updatedAt
}`);
