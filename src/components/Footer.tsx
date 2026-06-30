import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { KickerLabel } from "./KickerLabel";
import { SOCIAL_ICONS } from "./icons";
import { NAV_LINKS } from "@/lib/site-nav";
import {
  companyName,
  phoneHref,
  phoneDisplay,
  mailtoHref,
  emailAddress,
  addressLine1,
  addressLine2,
  socialLinks,
  orgNumber,
  type Info,
  type SocialChannel,
} from "@/lib/company";

// Display labels for the social row (Twitter shows its X rename, matching the CMS dropdown title).
const SOCIAL_LABELS: Record<SocialChannel, string> = {
  Facebook: "Facebook",
  Twitter: "Twitter / X",
  LinkedIn: "LinkedIn",
  GitHub: "GitHub",
};

// `new Date()` is an "unstable value" under Cache Components prerendering — isolate it in a
// 'use cache' boundary (refreshes on rebuild / publish-revalidate; fine for a copyright year).
async function CopyrightYear() {
  "use cache";

  return <span>{new Date().getFullYear()}</span>;
}

export function Footer({ info }: { info: Info }) {
  // Bottom padding clears the fixed mobile action bar (Header) so the last row isn't hidden.
  return (
    <footer className="border-line text-foreground border-t bg-[#0b0e17] pb-20 min-[880px]:pb-0">
      <div className="mx-auto max-w-[1240px] px-6 pt-16 pb-10">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-8 gap-y-10">
          <div className="col-[1/-1] max-w-[380px]">
            <Logo className="mb-5 h-[34px]" />
            <p className="text-muted-foreground max-w-[340px] text-[15px] leading-[1.65]">
              Din allsidige entreprenør på Radøy. Mur, betong og graving — for
              små og store oppdrag i Alver og omegn.
            </p>
          </div>
          <div>
            <KickerLabel className="mb-[18px] text-[11px]">KONTAKT</KickerLabel>
            <a
              href={phoneHref(info)}
              className="hover:text-primary mb-3.5 flex items-center gap-2.5 text-[15px] transition-colors"
            >
              <Phone className="text-primary size-4" />
              {phoneDisplay(info)}
            </a>
            <a
              href={mailtoHref(info)}
              className="hover:text-primary mb-3.5 flex items-center gap-2.5 text-[15px] transition-colors"
            >
              <Mail className="text-primary size-4" strokeWidth={1.8} />
              {emailAddress(info)}
            </a>
            <div className="text-muted-foreground flex items-start gap-2.5 text-[15px]">
              <MapPin
                className="text-primary mt-0.5 size-4 shrink-0"
                strokeWidth={1.8}
              />
              <span>
                {addressLine1(info)}
                <br />
                {addressLine2(info)}
              </span>
            </div>
          </div>
          <div>
            <KickerLabel className="mb-[18px] text-[11px]">SIDER</KickerLabel>
            <div className="flex flex-col gap-3.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-dim hover:text-primary text-[15px] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <KickerLabel className="mb-[18px] text-[11px]">
              FØLG OSS
            </KickerLabel>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks(info).map((link) => {
                const Icon = SOCIAL_ICONS[link.type.toLowerCase()];

                return (
                  <a
                    key={link.type}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:border-primary/50 hover:text-primary inline-flex h-11 items-center gap-2.5 rounded-lg border border-white/15 px-4 text-[15px] font-medium transition-colors"
                  >
                    {Icon ? <Icon className="size-[17px]" /> : null}
                    {SOCIAL_LABELS[link.type]}
                  </a>
                );
              })}
            </div>
            <div className="text-faint mt-[22px] font-mono text-[11px] leading-[1.9] tracking-[1.5px]">
              ORG.NR {orgNumber(info)}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/[0.08] pt-6">
          <span className="text-faint text-[13px]">
            © {companyName(info)} <CopyrightYear />. Alle rettigheter
            forbeholdt.
          </span>
          <span className="font-mono text-[11px] tracking-[1.5px] text-[#4d5667]">
            RADØY · ALVER KOMMUNE
          </span>
        </div>
      </div>
    </footer>
  );
}
