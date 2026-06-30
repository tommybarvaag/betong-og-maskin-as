import Image from "next/image";
import { cn } from "@/lib/utils";

// Brand wordmark (3 slanted bars + italic "BETONG & MASKIN AS"), recolored light for the dark
// theme. `unoptimized` serves the SVG raw (Next blocks SVG through the optimizer). Intrinsic
// ratio 211×38; default header height 30px, footer overrides to ~34px via className.
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-light.svg"
      alt="Betong & Maskin AS"
      width={211}
      height={38}
      priority
      unoptimized
      className={cn("h-[30px] w-auto", className)}
    />
  );
}
