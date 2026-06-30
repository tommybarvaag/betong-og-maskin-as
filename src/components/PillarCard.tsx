import type { ReactNode } from "react";
import Link from "next/link";

export function PillarCard({
  icon,
  index,
  title,
  description,
  href,
}: {
  icon: ReactNode;
  index: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group border-line bg-surface hover:border-primary/45 block rounded-[14px] border p-8 transition-all duration-200 hover:-translate-y-[3px] hover:bg-[#1a2130]"
    >
      <div className="border-primary/30 bg-primary/[0.12] text-primary mb-6 flex size-14 items-center justify-center rounded-xl border">
        {icon}
      </div>
      <div className="text-faint mb-2 font-mono text-xs">{index}</div>
      <h3 className="font-display mb-3 text-[26px] font-semibold tracking-[0.3px] uppercase">
        {title}
      </h3>
      <p className="text-muted-foreground text-[15px] leading-relaxed">
        {description}
      </p>
    </Link>
  );
}
