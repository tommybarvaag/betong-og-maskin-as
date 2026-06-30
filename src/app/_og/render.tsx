import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared satori-rendered social card (vercel/satori via next/og). The opengraph-image and
// twitter-image routes import OG_* and renderOgImage from here, so og:image and twitter:image
// stay byte-identical. The fonts are read once per process (module-scope promise); the
// rasterized PNG is statically optimized at build.
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = "Betong & Maskin AS — mur, betong og graving på Radøy";

const AMBER = "#f2a413";

async function loadFonts() {
  const dir = join(process.cwd(), "src/app/_og");
  const [semibold, regular] = await Promise.all([
    readFile(join(dir, "oswald-600.woff")),
    readFile(join(dir, "oswald-400.woff")),
  ]);

  return [
    {
      name: "Oswald",
      data: semibold,
      weight: 600 as const,
      style: "normal" as const,
    },
    {
      name: "Oswald",
      data: regular,
      weight: 400 as const,
      style: "normal" as const,
    },
  ];
}

// Read the two woff buffers once per process, not per render. The card has no
// per-request inputs, so the fonts never change for the life of the process.
const fontsPromise = loadFonts();

export async function renderOgImage() {
  const fonts = await fontsPromise;

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "76px 80px",
        fontFamily: "Oswald",
        backgroundColor: "#0b0e17",
        backgroundImage:
          "radial-gradient(900px 520px at 86% -12%, rgba(242,164,19,0.20), transparent 60%), linear-gradient(180deg, #0b0e17 0%, #0e1320 58%, #0b0e17 100%)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              backgroundColor: AMBER,
            }}
          />
          <div
            style={{
              color: AMBER,
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Radøy · Alver · Nordhordland
          </div>
        </div>
        <div
          style={{
            marginTop: 26,
            color: "#f6f8fb",
            fontSize: 104,
            fontWeight: 600,
            lineHeight: 0.95,
            letterSpacing: -1,
            textTransform: "uppercase",
          }}
        >
          Betong &amp; Maskin AS
        </div>
        <div
          style={{
            marginTop: 24,
            maxWidth: 860,
            color: "#c4cbd6",
            fontSize: 33,
            fontWeight: 400,
            lineHeight: 1.3,
          }}
        >
          Mur, betong og graving — seriøs entreprenør siden 2016
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 30,
        }}
      >
        <div
          style={{
            color: AMBER,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          betongogmaskin.no
        </div>
        <div style={{ color: "#aeb6c4", fontSize: 28, fontWeight: 400 }}>
          +47 928 29 343
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 8,
          backgroundColor: AMBER,
        }}
      />
    </div>,
    { ...OG_SIZE, fonts },
  );
}
