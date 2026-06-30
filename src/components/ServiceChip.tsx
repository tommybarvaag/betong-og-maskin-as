import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

// Sub-service tag on the Tjenester page — a shadcn Badge restyled to the prototype's square
// surface chip (8px radius, taller than the default pill badge).
export function ServiceChip({ children }: { children: ReactNode }) {
  return (
    <Badge
      variant="outline"
      className="border-line bg-surface text-dim h-auto rounded-[8px] px-[15px] py-[9px] text-sm font-normal"
    >
      {children}
    </Badge>
  );
}
