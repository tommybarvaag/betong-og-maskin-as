import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import type { MainImage } from "@/sanity/sanity.types";

type Props = {
  image: MainImage | null | undefined;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

// Builds a next/image from a Sanity image object (cdn.sanity.io is allow-listed in next.config).
export function SanityImage({
  image,
  width,
  height,
  className,
  sizes,
  priority,
}: Props) {
  if (!image?.asset) return null;

  const src = urlForImage(image).width(width).height(height).url();

  return (
    <Image
      src={src}
      alt={image.alt ?? image.caption ?? ""}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
