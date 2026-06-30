import { KickerLabel } from "./KickerLabel";
import { NoiseOverlay } from "./NoiseOverlay";

// Inner-page hero band (Tjenester / Om oss / Kontakt): noise texture + mono eyebrow + Oswald
// headline + optional intro. The home page uses a bespoke full-bleed image hero instead.
export function Masthead({
  eyebrow,
  headline,
  intro,
}: {
  eyebrow?: string | null;
  headline?: string | null;
  intro?: string | null;
}) {
  return (
    <section className="border-line relative overflow-hidden border-b">
      <NoiseOverlay className="opacity-[0.05]" />
      <div className="relative mx-auto max-w-[1240px] px-6 pt-[clamp(56px,8vw,96px)] pb-[clamp(40px,5vw,64px)]">
        <KickerLabel className="mb-4">{eyebrow}</KickerLabel>
        <h1 className="font-display max-w-[16ch] text-[clamp(40px,7vw,88px)] leading-[0.95] font-bold tracking-[-0.5px] uppercase">
          {headline}
        </h1>
        {intro ? (
          <p className="mt-[22px] max-w-[56ch] text-[clamp(16px,2vw,20px)] leading-[1.6] text-[#dfe3ea]">
            {intro}
          </p>
        ) : null}
      </div>
    </section>
  );
}
