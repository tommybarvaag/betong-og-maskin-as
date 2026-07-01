"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  mailtoHref,
  phoneDisplayShort,
  phoneHref,
  type Info,
} from "@/lib/company";
import { NAV_LINKS } from "@/lib/site-nav";
import { cn } from "@/lib/utils";
import { Mail, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

// Sticky industrial header. Desktop: logo + RADØY divider, nav with amber active pill, e-post
// icon, persistent amber Ring button. Mobile (<880px): amber Ring + hamburger → slide-in Sheet.
// Breakpoint matches the prototype's 880px isMobile switch.
export function Header({ info }: { info: Info }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the sheet on navigation — the route stays mounted under Cache Components <Activity>.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const tel = phoneHref(info);
  const mail = mailtoHref(info);
  const phoneShort = phoneDisplayShort(info);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "border-line sticky top-0 z-50 border-b backdrop-blur-[14px] transition-colors",
        scrolled ? "bg-[#0f1320]/95" : "bg-[#0f1320]/55",
      )}
    >
      <div className="mx-auto flex h-[74px] max-w-[1240px] items-center gap-5 px-6">
        <Link
          href="/"
          aria-label="Betong & Maskin AS — forside"
          className="flex shrink-0 items-center gap-4"
        >
          <Logo />
          <span className="hidden items-center gap-3.5 min-[880px]:flex">
            <span className="h-[26px] w-px bg-white/15" />
            <span className="text-primary font-mono text-[10px] leading-[1.5] tracking-[2px]">
              RADØY
              <br />
              SIDEN 2016
            </span>
          </span>
        </Link>
        <nav className="ml-auto hidden items-center gap-1.5 min-[880px]:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "flex h-10 items-center rounded-lg px-3.5 text-[15px] font-medium transition-colors",
                isActive(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-dim hover:text-foreground hover:bg-white/[0.06]",
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={mail}
            title="Send e-post"
            aria-label="Send e-post"
            className="text-dim hover:border-primary/50 hover:text-primary ml-2 flex size-[42px] items-center justify-center rounded-lg border border-white/15 transition-colors"
          >
            <Mail className="size-[18px]" strokeWidth={1.8} />
          </a>
          <a
            href={tel}
            className={cn(
              buttonVariants(),
              "ml-1 h-11 gap-2.5 rounded-lg px-[18px] text-[15px] shadow-[0_4px_16px_rgba(242,164,19,0.28)]",
            )}
          >
            <Phone className="size-[17px]" />
            {phoneShort}
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-2.5 min-[880px]:hidden">
          <a
            href={tel}
            className={cn(
              buttonVariants(),
              "h-[42px] gap-2 rounded-lg px-3.5 text-sm",
            )}
          >
            <Phone className="size-4" />
            Ring
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Åpne meny"
              className="text-foreground hover:border-primary/50 hover:text-primary flex size-11 items-center justify-center rounded-lg border border-white/15 transition-colors"
            >
              <Menu className="size-[22px]" />
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="border-line flex w-[min(82vw,360px)] flex-col gap-0 border-l bg-[#141824] p-[22px]"
            >
              <div className="mb-6 flex items-center justify-between">
                <SheetTitle className="text-primary font-mono text-[11px] font-normal tracking-[2px]">
                  MENY
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Hovedmeny for Betong &amp; Maskin AS
                </SheetDescription>
                <SheetClose
                  aria-label="Lukk meny"
                  className="text-foreground hover:border-primary/50 hover:text-primary flex size-10 items-center justify-center rounded-lg border border-white/15 transition-colors"
                >
                  <X className="size-5" />
                </SheetClose>
              </div>
              <nav className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-display text-foreground py-3 text-[22px] font-medium tracking-[0.5px] uppercase",
                      i < NAV_LINKS.length - 1 &&
                        "border-b border-white/[0.07]",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2.5 pt-6">
                <a
                  href={tel}
                  className={cn(
                    buttonVariants(),
                    "h-[50px] gap-2.5 rounded-[9px] text-base",
                  )}
                >
                  <Phone className="size-[18px]" />
                  {phoneShort}
                </a>
                <a
                  href={mail}
                  className={cn(
                    buttonVariants({ variant: "glass" }),
                    "h-[50px] gap-2.5 rounded-[9px] border-white/15 bg-transparent text-[15px]",
                  )}
                >
                  <Mail className="size-[18px]" strokeWidth={1.8} />
                  Send e-post
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
