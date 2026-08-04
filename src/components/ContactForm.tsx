"use client";

import { submitContact } from "@/app/actions/contact";
import { contactFormOpts, type ContactFormResult } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form";
import { mergeForm, useForm, useTransform } from "@tanstack/react-form-nextjs";
import { Check, Send } from "lucide-react";
import Script from "next/script";
import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

// Empty formState => mergeForm no-op on mount; the form uses its own defaultValues.
const initialResult: ContactFormResult = {
  formState: {},
  outcome: { status: "idle" },
};

// Minimal typing for Cloudflare Turnstile's explicit JS API (api.js).
type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: { sitekey: string; theme?: "dark" | "light" },
  ) => string;
  reset: (widgetId: string) => void;
  remove?: (widgetId: string) => void;
};

function getTurnstile(): TurnstileApi | undefined {
  return (window as unknown as { turnstile?: TurnstileApi }).turnstile;
}

function RequiredMark() {
  return <span className="text-primary">*</span>;
}

type ContactFieldProps = {
  // AnyFieldApi is TanStack Form's type for reusable field-render components — the concrete
  // per-field generics are erased here, which is the documented pattern for this extraction.
  field: AnyFieldApi;
  label: string;
  placeholder: string;
  multiline?: boolean;
  type?: string;
};

function ContactField({
  field,
  label,
  placeholder,
  multiline,
  type,
}: ContactFieldProps) {
  const error = field.state.meta.errors[0];
  const showError = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field invalid={showError}>
      <FieldLabel htmlFor={field.name}>
        {label} <RequiredMark />
      </FieldLabel>
      {multiline ? (
        <Textarea
          id={field.name}
          name={field.name}
          rows={5}
          placeholder={placeholder}
          value={field.state.value}
          onChange={(event) => field.handleChange(event.target.value)}
          onBlur={field.handleBlur}
          aria-invalid={showError || undefined}
        />
      ) : (
        <Input
          id={field.name}
          name={field.name}
          type={type}
          placeholder={placeholder}
          value={field.state.value}
          onChange={(event) => field.handleChange(event.target.value)}
          onBlur={field.handleBlur}
          aria-invalid={showError || undefined}
        />
      )}
      <FieldError>
        {showError
          ? typeof error === "string"
            ? error
            : error?.message
          : null}
      </FieldError>
    </Field>
  );
}

// Dark surface panel wrapping the real contact backend (submitContact server action → Resend).
// Follows the TanStack Next.js server-actions pattern: a native <form action> posts to the action,
// which re-validates with the SAME shared Zod schema; field errors are merged back via mergeForm,
// while success / rate-limit / Turnstile / send results ride the typed `outcome`. The server stays
// authoritative (honeypot + Turnstile + rate-limit). `heading`/`description` show on the Kontakt page.
export function ContactForm({
  heading,
  description,
  className,
}: {
  heading?: string;
  description?: string;
  className?: string;
}) {
  const [result, formAction, isPending] = useActionState(
    submitContact,
    initialResult,
  );
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [isActivated, setIsActivated] = useState(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);

  const form = useForm({
    ...contactFormOpts,
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, result.formState),
      [result],
    ),
  });

  const mountWidget = useCallback(() => {
    if (!siteKey || !widgetRef.current || !getTurnstile()) {
      return;
    }

    if (widgetId.current) {
      return;
    }

    widgetId.current = getTurnstile()!.render(widgetRef.current, {
      sitekey: siteKey,
      theme: "dark",
    });
  }, [siteKey]);

  // Script may already be cached when isActivated flips — mount if ready.
  useEffect(() => {
    if (isActivated && siteKey) {
      mountWidget();
    }
  }, [isActivated, siteKey, mountWidget]);

  // Re-arm via explicit reset when verify spent the token; field/rate-limit
  // errors leave a still-valid token alone.
  useEffect(() => {
    if (result.outcome.status === "error" && result.outcome.resetTurnstile) {
      const id = widgetId.current;
      const api = getTurnstile();

      if (id && api) {
        api.reset(id);
      }
    }
  }, [result]);

  useEffect(() => {
    return () => {
      const id = widgetId.current;
      const api = getTurnstile();

      if (id && api?.remove) {
        api.remove(id);
      }

      widgetId.current = null;
    };
  }, []);

  const panel = cn(
    "rounded-2xl border border-line bg-surface p-[clamp(24px,3vw,36px)]",
    className,
  );

  if (result.outcome.status === "success") {
    return (
      <div className={panel}>
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <span className="bg-primary/[0.12] text-primary flex size-14 items-center justify-center rounded-full">
            <Check className="size-7" />
          </span>
          <h2 className="font-display text-3xl font-semibold uppercase">
            Takk!
          </h2>
          <p className="text-muted-foreground">{result.outcome.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={panel}>
      {heading ? (
        <h2 className="font-display mb-2 text-[clamp(26px,3.4vw,38px)] leading-none font-semibold tracking-[-0.5px] uppercase">
          {heading}
        </h2>
      ) : null}
      {description ? (
        <p className="text-muted-foreground mb-6 text-[15px] leading-[1.6]">
          {description}
        </p>
      ) : null}
      {isActivated ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
          onLoad={mountWidget}
        />
      ) : null}
      <form
        action={formAction}
        onSubmit={() => form.handleSubmit()}
        onFocusCapture={() => setIsActivated(true)}
        onPointerDownCapture={() => setIsActivated(true)}
      >
        <FieldSet>
          <FieldLegend className="sr-only">Kontaktskjema</FieldLegend>
          <FieldGroup>
            <form.Field name="name">
              {(field) => (
                <ContactField
                  field={field}
                  label="Fornavn og etternavn"
                  placeholder="Ola Nordmann"
                />
              )}
            </form.Field>
            <form.Field name="email">
              {(field) => (
                <ContactField
                  field={field}
                  label="E-post"
                  type="email"
                  placeholder="din@epost.no"
                />
              )}
            </form.Field>
            <form.Field name="text">
              {(field) => (
                <ContactField
                  field={field}
                  label="Tekst"
                  placeholder="Fortell kort om prosjektet ditt…"
                  multiline
                />
              )}
            </form.Field>
            {/* Honeypot — hidden from users, must stay empty. Captured by FormData, gated server-side. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            {isActivated && siteKey ? <div ref={widgetRef} /> : null}
            {result.outcome.status === "error" ? (
              <p role="alert" className="text-destructive text-sm">
                {result.outcome.message}
              </p>
            ) : null}
            <form.Subscribe selector={(state) => state.canSubmit}>
              {(canSubmit) => (
                <Button
                  type="submit"
                  size="cta"
                  disabled={!canSubmit || isPending}
                  className="w-full"
                >
                  {isPending ? "Sender…" : "Send"}
                  {isPending ? null : <Send className="size-[18px]" />}
                </Button>
              )}
            </form.Subscribe>
            <p className="text-faint text-[13px] leading-[1.5]">
              Vi behandler henvendelsen din fortrolig og svarer så snart vi kan.
            </p>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
