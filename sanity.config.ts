import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { projectId, dataset, apiVersion } from "./src/sanity/lib/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

// Fixed-id singletons (one document each). serviceCategory + the legacy page/service types are
// multi-document and intentionally excluded.
const SINGLETONS = [
  "homePage",
  "tjenesterPage",
  "omOssPage",
  "kontaktPage",
  "companyInfo",
  "siteSettings",
];

export default defineConfig({
  name: "default",
  title: "Betong & Maskin",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        previewMode: { enable: "/api/draft-mode/enable" },
      },
    }),
    ...(process.env.NODE_ENV !== "production"
      ? [visionTool({ defaultApiVersion: apiVersion })]
      : []),
  ],
  schema: { types: schemaTypes },
  document: {
    // Strip create/duplicate/delete from the singletons.
    actions: (input, context) =>
      SINGLETONS.includes(context.schemaType)
        ? input.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action ?? ""),
          )
        : input,
    // Keep singletons out of the global "create new" menu.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((item) => !SINGLETONS.includes(item.templateId))
        : prev,
  },
});
