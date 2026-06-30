"use client";

import { useActionState, useEffect, useState } from "react";
import Script from "next/script";
import { Send, Check } from "lucide-react";
import { mergeForm, useForm, useTransform } from "@tanstack/react-form-nextjs";
import { submitContact } from "@/app/actions/contact";
import { contactFormOpts, type ContactFormResult } from "@/lib/contact-schema";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./ui/field";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

// Empty formState => mergeForm no-op on mount; the form uses its own defaultValues.
const initialResult: ContactFormResult = {
  formState: {},
  outcome: { status: "idle" },
};

function RequiredMark() {
  return <span className="text-primary">*</span>;
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
  // Bumped on every error to remount the Turnstile widget so it re-arms with a fresh token —
  // the previous one is spent once verified.
  const [widgetKey, setWidgetKey] = useState(0);

  const form = useForm({
    ...contactFormOpts,
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, result.formState),
      [result],
    ),
  });

  // Re-arm Turnstile only when the verify spent the token; a still-valid token
  // (field error, rate-limit) survives so the visitor needn't re-solve.
  useEffect(() => {
    if (result.outcome.status === "error" && result.outcome.resetTurnstile) {
      setWidgetKey((k) => k + 1);
    }
  }, [result]);

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
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />
      <form action={formAction} onSubmit={() => form.handleSubmit()}>
        <FieldSet>
          <FieldLegend className="sr-only">Kontaktskjema</FieldLegend>
          <FieldGroup>
            <form.Field name="name">
              {(field) => {
                const error = field.state.meta.errors[0];
                const showError =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field invalid={showError}>
                    <FieldLabel htmlFor={field.name}>
                      Fornavn og etternavn <RequiredMark />
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Ola Nordmann"
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      aria-invalid={showError || undefined}
                    />
                    <FieldError>
                      {showError
                        ? typeof error === "string"
                          ? error
                          : error?.message
                        : null}
                    </FieldError>
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="email">
              {(field) => {
                const error = field.state.meta.errors[0];
                const showError =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field invalid={showError}>
                    <FieldLabel htmlFor={field.name}>
                      E-post <RequiredMark />
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="din@epost.no"
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      aria-invalid={showError || undefined}
                    />
                    <FieldError>
                      {showError
                        ? typeof error === "string"
                          ? error
                          : error?.message
                        : null}
                    </FieldError>
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="text">
              {(field) => {
                const error = field.state.meta.errors[0];
                const showError =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field invalid={showError}>
                    <FieldLabel htmlFor={field.name}>
                      Tekst <RequiredMark />
                    </FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      rows={5}
                      placeholder="Fortell kort om prosjektet ditt…"
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      aria-invalid={showError || undefined}
                    />
                    <FieldError>
                      {showError
                        ? typeof error === "string"
                          ? error
                          : error?.message
                        : null}
                    </FieldError>
                  </Field>
                );
              }}
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
            {siteKey ? (
              <div
                key={widgetKey}
                className="cf-turnstile"
                data-sitekey={siteKey}
              />
            ) : null}
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
