import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Oswald, Archivo, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

// Variable fonts exposed as CSS vars, mapped in globals.css @theme to font-display / font-sans / font-mono.
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

// Root layout is REQUIRED in the App Router (route-group layouts don't replace it).
// Provides <html lang="nb"> / <body> and the single global stylesheet import.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.betongogmaskin.no"),
  title: {
    default: "Betong & Maskin AS",
    template: "%s · Betong & Maskin AS",
  },
  description:
    "Betong & Maskin AS leverer betong- og maskinentreprenørtjenester.",
  manifest: "/site.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "Betong & Maskin AS",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#141824" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nb"
      className={cn(
        "dark font-sans",
        oswald.variable,
        archivo.variable,
        jetbrainsMono.variable,
      )}
    >
      <body>{children}</body>
    </html>
  );
}
