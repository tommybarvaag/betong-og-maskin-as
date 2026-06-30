"use client";

import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";
import { MediaTile } from "./MediaTile";
import { SanityImage } from "./SanityImage";
import { Button } from "@/components/ui/button";
import type { MainImage } from "@/sanity/sanity.types";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// SPIKE PROTOTYPE (plan 016): click-to-enlarge gallery lightbox layered over the existing grid.
// Build-safe while gallery items are caption-only placeholders — tiles still render via MediaTile
// and the dialog enlarges whatever asset exists (SanityImage returns null for a missing asset).
// Until real photos land in Studio this only proves wiring, not final appearance.

// Gallery items arrive from HOME_QUERY as keyed array members (MainImage + synthetic _key).
type GalleryImage = { _key: string } & MainImage;

export function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const open = activeIndex !== null;
  const active = open ? images[activeIndex] : null;

  function step(delta: number) {
    setActiveIndex((i) => {
      if (i === null) {
        return i;
      }

      return (i + delta + images.length) % images.length;
    });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
        {images.map((image, i) => (
          <button
            key={image._key}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`Vis ${image.caption ?? "bilde"} i full størrelse`}
            className="focus-visible:ring-ring/50 block rounded-xl text-left outline-none focus-visible:ring-3"
          >
            <MediaTile
              image={image}
              label={image.caption ?? ""}
              className="rounded-xl"
            />
          </button>
        ))}
      </div>
      <Dialog.Root
        open={open}
        onOpenChange={(next) => {
          if (!next) {
            setActiveIndex(null);
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/85 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup
            onKeyDown={handleKeyDown}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 p-6 outline-none"
          >
            <Dialog.Title className="sr-only">
              {active?.caption ?? "Galleribilde"}
            </Dialog.Title>
            {active ? (
              <SanityImage
                image={active}
                width={1600}
                height={1200}
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="max-h-[80vh] w-auto rounded-xl object-contain"
              />
            ) : null}
            {active?.caption ? (
              <span className="text-faint font-mono text-[11px] tracking-[1px]">
                {active.caption}
              </span>
            ) : null}
            <div className="flex items-center gap-2">
              <Button
                variant="glass"
                size="icon-sm"
                onClick={() => step(-1)}
                aria-label="Forrige"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="glass"
                size="icon-sm"
                onClick={() => step(1)}
                aria-label="Neste"
              >
                <ChevronRight />
              </Button>
            </div>
            <Dialog.Close
              render={
                <Button
                  variant="glass"
                  size="icon-sm"
                  className="absolute top-6 right-6"
                  aria-label="Lukk"
                />
              }
            >
              <X />
            </Dialog.Close>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
