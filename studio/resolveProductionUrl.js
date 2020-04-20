const previewSecret = "MY_SECRET";
const projectUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://betongogmaskin.no/";

export default function resolveProductionUrl(document) {
  return `${projectUrl}/api/preview?secret=${previewSecret}&type=${document._type}&id=${document._id}&slug=${document.slug.current}`;
}
