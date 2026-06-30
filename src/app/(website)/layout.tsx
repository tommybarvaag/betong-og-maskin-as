import type { ReactNode } from "react";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/lib/live";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { loadLayout } from "@/sanity/lib/load";
import { jsonLdScript, localBusinessJsonLd } from "@/lib/structured-data";

export default async function WebsiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isEnabled } = await draftMode();
  const { info } = await loadLayout();

  const jsonLd = localBusinessJsonLd(info);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Header info={info} />
      <main>{children}</main>
      <Footer info={info} />
      {/* R1: live editing only in draft mode — never ships the EventSource to anon visitors.
          Exit-draft is provided by the Presentation tool / VisualEditing overlay. */}
      {isEnabled ? (
        <>
          <SanityLive includeDrafts />
          <VisualEditing />
        </>
      ) : null}
    </>
  );
}
