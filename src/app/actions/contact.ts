"use server";
import "server-only";
import { Resend } from "resend";
import { headers } from "next/headers";
import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form-nextjs";
import {
  contactClientSchema,
  contactFormOpts,
  type ContactFormResult,
  type ContactInput,
} from "@/lib/contact-schema";
import { verifyTurnstile } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";

// Generic, non-leaky failure message shown to the visitor for any unexpected
// or server-side error (misconfig, send failure, thrown exception).
const GENERIC_ERROR = "Kunne ikke sende meldingen. Prøv igjen senere.";

// Field validation runs the SAME schema as the client; createServerValidate decodes
// FormData against contactFormOpts' defaultValues. Honeypot + Turnstile are gated
// separately below — they are server-only spam mechanics, not user-facing fields.
const serverValidate = createServerValidate({
  ...contactFormOpts,
  onServerValidate: contactClientSchema,
});

// Non-field outcomes ride `outcome`; an empty `formState` is a no-op merge on the
// client (mergeForm touches nothing), preserving the visitor's typed values.
// resetTurnstile=true only when the Turnstile verify ran and spent the token.
function errorResult(
  message: string,
  resetTurnstile = false,
): ContactFormResult {
  return {
    formState: {},
    outcome: { status: "error", message, resetTurnstile },
  };
}

function successResult(message: string): ContactFormResult {
  return { formState: {}, outcome: { status: "success", message } };
}

export async function submitContact(
  _prev: ContactFormResult,
  formData: FormData,
): Promise<ContactFormResult> {
  // Tracks whether verifyTurnstile was called with a non-empty token (spent it).
  // Declared outside try so the outer catch can pass resetTurnstile correctly.
  let turnstileSpent = false;

  try {
    const ip =
      (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (!rateLimit(ip)) {
      return errorResult("For mange forsøk. Prøv igjen om litt.");
    }

    // Honeypot — pretend success, never reveal the trap. Read raw (it is not a
    // validated field) so bots short-circuit before validation and send.
    const honeypot = formData.get("website_url_hp");

    if (typeof honeypot === "string" && honeypot.length > 0) {
      return successResult("Takk for din henvendelse!");
    }

    // Field validation (name/email/text). On failure the field errors ride the
    // form state and are merged back into the client form via mergeForm.
    // serverValidate returns the RAW decoded FormData (schema transforms are
    // dropped), so re-parse to get the canonical .trim()ed values for the email.
    let data: ContactInput;

    try {
      data = contactClientSchema.parse(await serverValidate(formData));
    } catch (e) {
      if (e instanceof ServerValidateError) {
        return {
          formState: e.formState,
          outcome: { status: "error", message: "Sjekk feltene under." },
        };
      }

      throw e;
    }

    // Run the Turnstile gate only when configured server-side. In dev/CI without
    // the secret the form works tokenless; in prod a missing/failed token fails closed.
    if (process.env.TURNSTILE_SECRET_KEY) {
      const token = formData.get("cf-turnstile-response");

      if (typeof token === "string" && token.length > 0) {
        turnstileSpent = true;
        const verified = await verifyTurnstile(token, ip);

        if (!verified) {
          return errorResult(
            "Verifisering feilet. Last siden på nytt og prøv igjen.",
            true, // verify consumed the token — re-arm the widget
          );
        }
      } else {
        return errorResult(
          "Verifisering feilet. Last siden på nytt og prøv igjen.",
          false,
        );
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM;
    const to = process.env.CONTACT_TO;

    if (!apiKey || !from || !to) {
      // Misconfiguration is a server problem — log the detail, never leak it.
      console.error(
        "Contact form misconfigured: missing Resend env vars (RESEND_API_KEY/RESEND_FROM/CONTACT_TO).",
      );

      return errorResult(GENERIC_ERROR, turnstileSpent);
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      ...(process.env.CONTACT_BCC ? { bcc: process.env.CONTACT_BCC } : {}),
      replyTo: data.email, // visitor address here, never in `from`
      subject: `Kontaktskjema: ${data.name}`,
      text: `${data.name} (${data.email})\n\n${data.text}`,
    });

    if (error) {
      return errorResult(GENERIC_ERROR, turnstileSpent);
    }

    return successResult("Takk! Vi tar kontakt så snart som mulig.");
  } catch (err) {
    // Last line of defense: submitContact must never throw out to the client.
    console.error("Unexpected error in submitContact:", err);

    return errorResult(GENERIC_ERROR, turnstileSpent);
  }
}
