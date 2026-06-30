import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ServiceChip } from "@/components/ServiceChip";
import { ServiceIcon } from "@/components/ServiceIcon";
import { MediaTile } from "@/components/MediaTile";
import { Masthead } from "@/components/Masthead";
import { CtaBand } from "@/components/CtaBand";
import { loadLayout, loadTjenester } from "@/sanity/lib/load";
import { phoneHref, phoneDisplayShort } from "@/lib/company";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tjenester",
  description:
    "Mur, betong og graving på Radøy — gulvstøp, ringmurer, forstøtningsmurer, natursteinsmuring og gravearbeid for små og store oppdrag.",
  alternates: { canonical: "/tjenester" },
};

export default async function TjenesterPage() {
  const [{ info }, { page, services }] = await Promise.all([
    loadLayout(),
    loadTjenester(),
  ]);

  if (!page) notFound();

  const tel = phoneHref(info);

  return (
    <>
      <Masthead
        eyebrow={page.hero?.eyebrow}
        headline={page.hero?.headline}
        intro={page.hero?.intro}
      />

      <section className="mx-auto flex max-w-[1240px] flex-col gap-[clamp(40px,5vw,72px)] px-6 py-[clamp(56px,7vw,96px)]">
        {services.map((service, i) => {
          const reversed = i % 2 === 1;

          return (
            <Fragment key={service._id}>
              {i > 0 ? <div className="h-px bg-white/[0.08]" /> : null}
              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(28px,4vw,56px)]">
                <div className={reversed ? "order-2" : undefined}>
                  <div className="mb-[22px] flex items-center gap-4">
                    <span className="border-primary/30 bg-primary/[0.12] text-primary flex size-[60px] shrink-0 items-center justify-center rounded-xl border">
                      <ServiceIcon
                        name={service.icon}
                        className="size-[30px]"
                      />
                    </span>
                    <div>
                      <div className="text-faint font-mono text-[13px]">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h2 className="font-display mt-0.5 text-[clamp(30px,4vw,46px)] leading-none font-semibold tracking-[-0.5px] uppercase">
                        {service.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 max-w-[52ch] text-base leading-[1.7]">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {(service.subServices ?? []).map((chip) => (
                      <ServiceChip key={chip}>{chip}</ServiceChip>
                    ))}
                  </div>
                </div>
                <MediaTile
                  image={service.image}
                  label={`BILDE: ${(service.title ?? "").toUpperCase()}`}
                  aspect="5 / 4"
                  className={reversed ? "order-1" : undefined}
                />
              </div>
            </Fragment>
          );
        })}
      </section>

      <CtaBand
        title={page.cta?.title}
        description={page.cta?.description}
        actions={
          <>
            <a href={tel} className={cn(buttonVariants({ size: "cta" }))}>
              <Phone className="size-[19px]" />
              {phoneDisplayShort(info)}
            </a>
            <Link
              href="/kontakt"
              className={cn(buttonVariants({ variant: "glass", size: "cta" }))}
            >
              Kontaktskjema
              <ArrowRight className="size-[18px]" />
            </Link>
          </>
        }
      />
    </>
  );
}
