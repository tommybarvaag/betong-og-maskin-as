import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Contact method tile (icon + label + value), used on the home contact section and the Kontakt
// page. `panel` is the standard surface card; `amber` is the emphasized call card (amber
// gradient + solid amber icon tile). Renders as a link when `href` is set, else a static div.
export function ContactMethodCard({
  icon,
  label,
  value,
  href,
  variant = "panel",
  monoLabel = false,
  className,
  iconTileClassName,
  valueClassName,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  variant?: "panel" | "amber";
  monoLabel?: boolean;
  className?: string;
  iconTileClassName?: string;
  valueClassName?: string;
}) {
  const isAmber = variant === "amber";
  const root = cn(
    "flex items-center gap-4 rounded-xl border p-[18px] transition-colors",
    isAmber
      ? "border-primary/35 bg-gradient-to-br from-primary/[0.12] to-primary/[0.04] hover:border-primary/60"
      : "border-line bg-surface hover:border-primary/40",
    className,
  );
  const iconTile = cn(
    "flex size-12 shrink-0 items-center justify-center rounded-[10px]",
    isAmber
      ? "bg-primary text-primary-foreground"
      : "bg-primary/[0.12] text-primary",
    iconTileClassName,
  );
  const labelCls = cn(
    "text-[13px]",
    monoLabel && "font-mono tracking-[1.5px] uppercase",
    isAmber ? "text-primary" : "text-muted-foreground",
  );
  const content = (
    <>
      <span className={iconTile}>{icon}</span>
      <span className="flex flex-col gap-0.5">
        <span className={labelCls}>{label}</span>
        <span
          className={cn(
            "text-foreground text-lg font-semibold",
            valueClassName,
          )}
        >
          {value}
        </span>
      </span>
    </>
  );

  return href ? (
    <Link href={href} className={root}>
      {content}
    </Link>
  ) : (
    <div className={root}>{content}</div>
  );
}
