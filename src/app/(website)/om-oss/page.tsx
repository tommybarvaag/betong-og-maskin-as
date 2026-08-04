import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, ArrowRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { KickerLabel } from "@/components/KickerLabel";
import { MediaTile } from "@/components/MediaTile";
import { Masthead } from "@/components/Masthead";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { CtaBand } from "@/components/CtaBand";
import { PortableText } from "@/components/PortableText";
import { loadLayout, loadOmOss } from "@/sanity/lib/load";
import { phoneHref, phoneDisplayShort } from "@/lib/company";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Betong & Maskin AS ble startet i 2016 av Joar Morken — en allsidig, seriøs entreprenør på Radøy i Alver kommune.",
  alternates: { canonical: "/om-oss" },
};

export default async function OmOssPage() {
  const [{ info }, { page, services }] = await Promise.all([
    loadLayout(),
    loadOmOss(),
  ]);

  if (!page) notFound();

  const tel = phoneHref(info);
  const statCards = page.statCards ?? [];
  const serviceList = services.flatMap((service) => service.subServices ?? []);

  return (
    <>
      <Masthead
        eyebrow={page.hero?.eyebrow}
        headline={page.hero?.headline}
        intro={page.hero?.intro}
      />

      <section className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(32px,5vw,64px)] px-6 py-[clamp(56px,7vw,96px)]">
        <div>
          <PortableText value={page.story} />
        </div>
        <div className="flex flex-col gap-4">
          <MediaTile
            image={page.image}
            label="BILDE: JOAR / TEAMET"
            aspect="4 / 3"
            loading="eager"
            fetchPriority="high"
          />
          <div className="grid grid-cols-2 gap-4">
            {statCards.map((card) => (
              <div
                key={card._key}
                className="border-line bg-surface rounded-xl border p-[22px]"
              >
                <div className="font-display text-primary text-4xl leading-none font-semibold">
                  {card.value}
                </div>
                <div className="text-muted-foreground mt-1.5 text-sm">
                  {card.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary relative overflow-hidden">
        <NoiseOverlay className="opacity-[0.08] mix-blend-multiply" />
        <div className="relative mx-auto max-w-[1000px] px-6 py-[clamp(56px,7vw,88px)] text-center">
          <p className="font-display text-primary-foreground text-[clamp(26px,4vw,46px)] leading-[1.1] font-semibold tracking-[-0.5px] text-balance uppercase">
            {page.quote}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-[clamp(56px,7vw,96px)]">
        <div className="mb-9">
          <KickerLabel className="mb-3.5">
            {page.servicesSection?.eyebrow}
          </KickerLabel>
          <h2 className="font-display text-[clamp(30px,4.5vw,48px)] leading-none font-semibold tracking-[-0.5px] uppercase">
            {page.servicesSection?.heading}
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
          {serviceList.map((service, i) => (
            <div
              key={`${service}-${i}`}
              className="border-line bg-surface flex items-center gap-3.5 rounded-[11px] border px-5 py-[18px]"
            >
              <Check
                className="text-primary size-[18px] shrink-0"
                strokeWidth={2.4}
              />
              <span className="text-[15px] text-[#e6e9ef]">{service}</span>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground mt-8 max-w-[62ch] text-[17px] leading-[1.7]">
          {page.servicesSection?.outro}
        </p>
      </section>

      <CtaBand
        title={page.ctaTitle}
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
              Kontakt oss
              <ArrowRight className="size-[18px]" />
            </Link>
          </>
        }
      />
    </>
  );
}
