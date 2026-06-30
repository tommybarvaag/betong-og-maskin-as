import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ContactMethodCard } from "@/components/ContactMethodCard";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { KickerLabel } from "@/components/KickerLabel";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { PillarCard } from "@/components/PillarCard";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  emailAddress,
  formatAddress,
  mailtoHref,
  phoneDisplay,
  phoneDisplayShort,
  phoneHref,
} from "@/lib/company";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import { loadHome, loadLayout } from "@/sanity/lib/load";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Default hero photo per HANDOFF (the existing project image on the Sanity CDN). A CMS
// homePage.heroImage overrides it; this is a visual asset, not page copy.
const HERO_IMAGE =
  "https://cdn.sanity.io/images/t6pwhwps/production/e983fb165c9120eab9e1b2c4a3c416dcc9f97175-4460x2973.jpg?w=2000&q=80&auto=format";

export const metadata: Metadata = {
  title: "Mur, betong og graving på Radøy",
  description:
    "Betong & Maskin AS er en allsidig betong- og maskinentreprenør på Radøy i Alver kommune — gulvstøp, ringmurer, forstøtningsmurer, natursteinsmuring og gravearbeid.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [{ info }, { page, services }] = await Promise.all([
    loadLayout(),
    loadHome(),
  ]);

  if (!page) notFound();

  const tel = phoneHref(info);
  const mail = mailtoHref(info);
  const heroImage = page.heroImage;
  const heroSrc = heroImage?.asset
    ? urlForImage(heroImage).width(2000).height(1335).url()
    : HERO_IMAGE;
  const stats = page.trustStats ?? [];
  const galleryImages = page.gallery?.images ?? [];

  return (
    <>
      <section className="relative flex min-h-[clamp(560px,86vh,820px)] items-end overflow-hidden">
        <Image
          src={heroSrc}
          alt="Betong og maskinarbeid på Radøy"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e17]/55 via-[#0b0e17]/25 to-[#0b0e17]/[0.86]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e17]/70 to-[#0b0e17]/10" />
        <div className="relative mx-auto w-full max-w-[1240px] px-6 pb-[72px]">
          <Badge
            variant="outline"
            className="border-primary/35 bg-primary/[0.12] mb-6 h-auto gap-2.5 rounded-full px-3.5 py-[7px]"
          >
            <span className="bg-primary size-[7px] rounded-full" />
            <span className="text-primary font-mono text-xs tracking-[2px]">
              {page.hero?.eyebrow}
            </span>
          </Badge>
          <h1 className="font-display max-w-[13ch] text-[clamp(44px,7.5vw,104px)] leading-[0.95] font-bold tracking-[-0.5px] uppercase [text-shadow:0_2px_30px_rgba(0,0,0,0.4)]">
            {page.hero?.headline}
          </h1>
          <p className="mt-[22px] max-w-[54ch] text-[clamp(17px,2vw,21px)] leading-[1.6] text-[#dfe3ea]">
            {page.hero?.intro}
          </p>
          <div className="mt-[34px] flex flex-wrap gap-3.5">
            <a
              href={tel}
              className={cn(
                buttonVariants({ size: "cta" }),
                "shadow-[0_8px_30px_rgba(242,164,19,0.3)]",
              )}
            >
              <Phone className="size-5" />
              Ring {phoneDisplayShort(info)}
            </a>
            <a
              href="#kontakt"
              className={cn(buttonVariants({ variant: "glass", size: "cta" }))}
            >
              Be om tilbud
              <ArrowRight className="size-[18px]" />
            </a>
          </div>
        </div>
      </section>

      <div className="bg-panel border-y border-white/[0.08]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] px-6">
          {stats.map((stat, i) => (
            <div
              key={stat._key}
              className={cn(
                "flex flex-col gap-1 px-5 py-7",
                i < stats.length - 1 && "border-r border-white/[0.06]",
              )}
            >
              <span className="font-display text-primary text-[34px] leading-none font-semibold">
                {stat.value}
              </span>
              <span className="text-muted-foreground text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-[1240px] px-6 py-[clamp(64px,9vw,110px)]">
        <div className="mb-[46px] flex flex-wrap items-end justify-between gap-5">
          <div>
            <KickerLabel className="mb-3.5">
              {page.pillars?.eyebrow}
            </KickerLabel>
            <h2 className="font-display text-[clamp(32px,4.5vw,52px)] leading-none font-semibold tracking-[-0.5px] uppercase">
              {page.pillars?.heading}
            </h2>
          </div>
          <Link
            href="/tjenester"
            className="text-primary hover:text-amber-hover inline-flex items-center gap-2.5 text-base font-semibold transition-colors"
          >
            {page.pillars?.linkLabel}
            <ArrowRight className="size-[18px]" />
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          {services.map((service, i) => (
            <PillarCard
              key={service._id}
              icon={<ServiceIcon name={service.icon} className="size-7" />}
              index={String(i + 1).padStart(2, "0")}
              title={service.title ?? ""}
              description={service.pillarText ?? ""}
              href="/tjenester"
            />
          ))}
        </div>
      </section>

      <section className="bg-primary relative overflow-hidden">
        <NoiseOverlay className="opacity-[0.08] mix-blend-multiply" />
        <div className="relative mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-8 px-6 py-[clamp(56px,7vw,84px)]">
          <div className="max-w-[60ch]">
            <div className="mb-4 font-mono text-xs tracking-[2px] text-[#7a5402]">
              {page.amberBand?.eyebrow}
            </div>
            <h2 className="font-display text-primary-foreground text-[clamp(30px,4.5vw,54px)] leading-[0.98] font-bold tracking-[-0.5px] uppercase">
              {page.amberBand?.headline}
            </h2>
          </div>
          <Link
            href="/kontakt"
            className={cn(
              buttonVariants({ variant: "dark" }),
              "h-[58px] gap-2.5 rounded-[10px] px-7 text-[17px] whitespace-nowrap",
            )}
          >
            {page.amberBand?.ctaLabel}
            <ArrowRight className="size-[18px]" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-[clamp(64px,9vw,110px)]">
        <div className="mb-10">
          <KickerLabel className="mb-3.5">{page.gallery?.eyebrow}</KickerLabel>
          <h2 className="font-display text-[clamp(32px,4.5vw,52px)] leading-none font-semibold tracking-[-0.5px] uppercase">
            {page.gallery?.heading}
          </h2>
        </div>
        <GalleryLightbox images={galleryImages} />
      </section>

      <section
        id="kontakt"
        className="bg-panel scroll-mt-20 border-t border-white/[0.08]"
      >
        <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-12 px-6 py-[clamp(64px,9vw,110px)]">
          <div>
            <KickerLabel className="mb-3.5">
              {page.contact?.eyebrow}
            </KickerLabel>
            <h2 className="font-display mb-[18px] text-[clamp(30px,4vw,46px)] leading-none font-semibold tracking-[-0.5px] uppercase">
              {page.contact?.heading}
            </h2>
            <p className="text-muted-foreground mb-[30px] max-w-[46ch] text-base leading-[1.65]">
              {page.contact?.intro}
            </p>
            <div className="flex flex-col gap-3">
              <ContactMethodCard
                icon={<Phone className="size-[22px]" />}
                label="Ring oss"
                value={phoneDisplay(info)}
                href={tel}
              />
              <ContactMethodCard
                icon={<Mail className="size-[22px]" strokeWidth={1.8} />}
                label="Send e-post"
                value={emailAddress(info)}
                href={mail}
              />
              <ContactMethodCard
                icon={<MapPin className="size-[22px]" strokeWidth={1.8} />}
                label="Besøk / post"
                value={formatAddress(info)}
              />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
