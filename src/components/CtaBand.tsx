import type { ReactNode } from "react";

// Dark closing CTA band (Tjenester + Om oss): heading on the left, action buttons on the right,
// wrapping on narrow screens. `actions` are the caller's buttons/links.
export function CtaBand({
  title,
  description,
  actions,
}: {
  title?: string | null;
  description?: string | null;
  actions: ReactNode;
}) {
  return (
    <section className="border-line bg-panel border-t">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-7 px-6 py-[clamp(48px,6vw,80px)]">
        <div className="max-w-[20ch]">
          <h2 className="font-display text-[clamp(28px,4vw,44px)] leading-none font-semibold tracking-[-0.5px] text-balance uppercase">
            {title}
          </h2>
          {description ? (
            <p className="text-muted-foreground mt-2.5 text-[17px]">
              {description}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3.5">{actions}</div>
      </div>
    </section>
  );
}
