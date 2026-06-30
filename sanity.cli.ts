import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "./src/sanity/lib/env";

export default defineCliConfig({
  api: { projectId, dataset },
  // GROQ TypeGen: extract schema.json (from sanity.config) then generate typed query results.
  // overloadClientMethods makes sanityFetch/client.fetch return types inferred from the query.
  typegen: {
    path: "./src/**/*.{ts,tsx}",
    schema: "schema.json",
    generates: "./src/sanity/sanity.types.ts",
    overloadClientMethods: true,
  },
});
