import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Mono amber section eyebrow — e.g. "// HVA VI GJØR", "// TJENESTER". The caller supplies the
// "//" prefix so the same component also renders bare labels (footer column heads, hero pill).
export function KickerLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("text-primary font-mono text-xs tracking-[2px]", className)}
    >
      {children}
    </div>
  );
}
