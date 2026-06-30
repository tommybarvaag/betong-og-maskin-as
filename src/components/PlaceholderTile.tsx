import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Striped placeholder for a real photo the client will supply (gallery + service/about image
// slots). Diagonal hatch + image glyph + mono caption, per the prototype.
export function PlaceholderTile({
  label,
  aspect = "4 / 3",
  className,
}: {
  label: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-line flex flex-col items-center justify-center gap-2.5 overflow-hidden rounded-[14px] border",
        className,
      )}
      style={{
        aspectRatio: aspect,
        background:
          "repeating-linear-gradient(135deg,#161b27 0 14px,#1b2130 14px 28px)",
      }}
    >
      <ImageIcon className="size-[30px] text-[#3a4255]" strokeWidth={1.6} />
      <span className="px-4 text-center font-mono text-[11px] tracking-[1px] text-[#5a6376]">
        {label}
      </span>
    </div>
  );
}
