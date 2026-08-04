import { SanityImage } from "./SanityImage";
import { PlaceholderTile } from "./PlaceholderTile";
import { cn } from "@/lib/utils";
import type { MainImage } from "@/sanity/sanity.types";

// Renders a real Sanity photo when one is set, else the striped placeholder with a mono label.
// Intrinsic dimensions per aspect keep next/image's ratio + srcset correct.
const DIMS: Record<string, [number, number]> = {
  "4 / 3": [800, 600],
  "5 / 4": [800, 640],
  "16 / 9": [800, 450],
};

export function MediaTile({
  image,
  label,
  aspect = "4 / 3",
  className,
  loading,
  fetchPriority,
}: {
  image?: MainImage | null;
  label: string;
  aspect?: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
}) {
  if (!image?.asset) {
    return (
      <PlaceholderTile label={label} aspect={aspect} className={className} />
    );
  }

  const [width, height] = DIMS[aspect] ?? [800, 600];

  return (
    <div
      className={cn(
        "border-line overflow-hidden rounded-[14px] border",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      <SanityImage
        image={image}
        width={width}
        height={height}
        sizes="(max-width: 900px) 100vw, 600px"
        loading={loading}
        fetchPriority={fetchPriority}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
