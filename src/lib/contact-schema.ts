import { z } from "zod";
import { formOptions, revalidateLogic } from "@tanstack/react-form";
import type { ServerFormState } from "@tanstack/react-form";

// Shared by the client form (TanStack Form validation) and the server action
// (authoritative re-validation), so the two never drift. No "use client"/"use
// server" directive — this is a plain module imported by both.

// User-facing fields the client validates and the visitor fills in.
const contactFields = {
  name: z.string().trim().min(2, "Skriv inn navnet ditt").max(120),
  email: z.email("Ugyldig e-postadresse").max(254),
  text: z.string().trim().min(10, "Meldingen er for kort").max(5000),
};

export const contactClientSchema = z.object(contactFields);
export type ContactInput = z.infer<typeof contactClientSchema>;

// Shared form options: same defaultValues + client validation wiring used by the
// client `useForm` and the server `createServerValidate` (which decodes FormData
// against these defaults), per the TanStack Next.js server-actions pattern.
export const contactFormOpts = formOptions({
  defaultValues: { name: "", email: "", text: "" } satisfies ContactInput,
  validationLogic: revalidateLogic({
    mode: "change",
    modeAfterSubmission: "change",
  }),
  validators: { onDynamic: contactClientSchema },
});

// Non-validation outcomes the form-state channel can't model (success panel,
// rate-limit, Turnstile, send result). Returned alongside the form state.
type ContactOutcome =
  | { status: "idle" }
  // resetTurnstile: the verify ran and spent the token, so the widget must re-arm.
  // Omitted/false for pre-verify errors (rate-limit, field errors) where the token
  // is still valid and re-solving would be needless friction.
  | { status: "error"; message: string; resetTurnstile?: boolean }
  | { status: "success"; message: string };

// Opaque server form-state transport consumed only by mergeForm, never introspected.
// Partial so non-field outcomes can pass `{}` — a no-op merge that preserves the user's
// typed values (the library's initialFormState has `values: undefined`, which mergeForm
// would splat over the form, wiping input on a transient error). Typed loosely on purpose,
// like the library's own `ServerFormState<any, undefined>`; `instanceof` also erases the
// error's generics to `any`. Not a cast — a contained transport alias.
type ContactFormState = Partial<ServerFormState<any, any>>;

// The server action's typed return: field errors ride `formState` (merged back via
// mergeForm); everything else rides `outcome`. No casts needed at the call sites.
export type ContactFormResult = {
  formState: ContactFormState;
  outcome: ContactOutcome;
};
