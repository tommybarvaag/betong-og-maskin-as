import { afterEach, describe, expect, it, vi } from "vitest";
import type { ContactFormResult } from "@/lib/contact-schema";

// vi.mock is hoisted above imports.
// `server-only` throws outside an RSC bundle — stub it for the node test env.
vi.mock("server-only", () => ({}));

// Per-test IP so the real in-memory rate limiter does not bleed across tests.
let currentIp = "";

vi.mock("next/headers", () => ({
  headers: () => ({
    get: (name: string) => (name === "x-forwarded-for" ? currentIp : null),
  }),
}));

// Control Turnstile verification per test. Mock the exact alias the action imports.
const verifyTurnstile =
  vi.fn<(token: string, ip?: string) => Promise<boolean>>();

vi.mock("@/lib/turnstile", () => ({
  verifyTurnstile: (token: string, ip?: string) => verifyTurnstile(token, ip),
}));

// Control Resend per test. `send` is reassigned in each test that needs it.
const send = vi.fn<(args: unknown) => Promise<{ error: unknown }>>();

vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

// Import AFTER the mocks are declared (they are hoisted, so this resolves them).
import { submitContact } from "./contact";

const initial = {
  formState: {},
  outcome: { status: "idle" },
} satisfies ContactFormResult;

const validInput = {
  name: "Ola Nordmann",
  email: "ola@example.no",
  text: "Hei, jeg ønsker et tilbud på betongarbeid.",
};

type FormFields = {
  name?: string;
  email?: string;
  text?: string;
  honeypot?: string;
  token?: string;
};

function buildForm(fields: FormFields): FormData {
  const fd = new FormData();

  if (fields.name !== undefined) fd.append("name", fields.name);

  if (fields.email !== undefined) fd.append("email", fields.email);

  if (fields.text !== undefined) fd.append("text", fields.text);

  if (fields.honeypot !== undefined)
    fd.append("website_url_hp", fields.honeypot);

  if (fields.token !== undefined) {
    fd.append("cf-turnstile-response", fields.token);
  }

  return fd;
}

function setEnv() {
  vi.stubEnv("RESEND_API_KEY", "re_test_key");
  vi.stubEnv("RESEND_FROM", "from@betongogmaskin.no");
  vi.stubEnv("CONTACT_TO", "to@betongogmaskin.no");
}

describe("submitContact", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("honeypot: a non-empty website_url_hp short-circuits to success without sending", async () => {
    currentIp = "10.0.0.1";
    setEnv();
    const result = await submitContact(
      initial,
      buildForm({ ...validInput, honeypot: "spam-bot" }),
    );

    expect(result.outcome.status).toBe("success");

    if (result.outcome.status === "success") {
      expect(result.outcome.message).toBe("Takk for din henvendelse!");
    }

    expect(send).not.toHaveBeenCalled();
  });

  it("valid input with no Turnstile secret: succeeds and sends once with the visitor as replyTo", async () => {
    currentIp = "10.0.0.2";
    setEnv();
    send.mockResolvedValueOnce({ error: null });
    const result = await submitContact(initial, buildForm(validInput));

    expect(result.outcome.status).toBe("success");

    if (result.outcome.status === "success") {
      expect(result.outcome.message).toBe(
        "Takk! Vi tar kontakt så snart som mulig.",
      );
    }

    expect(send).toHaveBeenCalledTimes(1);
    const arg = send.mock.calls[0]?.[0] as {
      from: string;
      to: string;
      replyTo: string;
    };
    expect(arg.replyTo).toBe(validInput.email);
    expect(arg.from).toBe("from@betongogmaskin.no");
    expect(arg.to).toBe("to@betongogmaskin.no");
  });

  it("invalid field (short name): returns a field error and does not send", async () => {
    currentIp = "10.0.0.3";
    setEnv();
    const result = await submitContact(
      initial,
      buildForm({ ...validInput, name: "O" }),
    );

    expect(result.outcome.status).toBe("error");

    if (result.outcome.status === "error") {
      expect(result.outcome.message).toBe("Sjekk feltene under.");
    }

    expect(result.formState).toBeTruthy();
    expect(send).not.toHaveBeenCalled();
  });

  it("rate-limit: the 6th call from the same IP is blocked", async () => {
    currentIp = "10.0.0.99";
    setEnv();
    send.mockResolvedValue({ error: null });

    for (let i = 0; i < 5; i++) {
      const ok = await submitContact(initial, buildForm(validInput));
      expect(ok.outcome.status).toBe("success");
    }

    const blocked = await submitContact(initial, buildForm(validInput));
    expect(blocked.outcome.status).toBe("error");

    if (blocked.outcome.status === "error") {
      expect(blocked.outcome.message).toContain("For mange forsøk");
    }
  });

  it("Turnstile configured and verify fails: error with resetTurnstile, no send", async () => {
    currentIp = "10.0.0.4";
    setEnv();
    vi.stubEnv("TURNSTILE_SECRET_KEY", "ts_secret");
    verifyTurnstile.mockResolvedValueOnce(false);
    const result = await submitContact(
      initial,
      buildForm({ ...validInput, token: "tok" }),
    );

    expect(result.outcome.status).toBe("error");

    if (result.outcome.status === "error") {
      expect(result.outcome.resetTurnstile).toBe(true);
    }

    expect(send).not.toHaveBeenCalled();
  });

  it("Turnstile configured and verify passes: succeeds and sends", async () => {
    currentIp = "10.0.0.5";
    setEnv();
    vi.stubEnv("TURNSTILE_SECRET_KEY", "ts_secret");
    verifyTurnstile.mockResolvedValueOnce(true);
    send.mockResolvedValueOnce({ error: null });
    const result = await submitContact(
      initial,
      buildForm({ ...validInput, token: "tok" }),
    );

    expect(result.outcome.status).toBe("success");
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("missing RESEND_API_KEY: returns the generic error and does not throw", async () => {
    currentIp = "10.0.0.6";
    // Only FROM/TO set; API key intentionally absent.
    vi.stubEnv("RESEND_FROM", "from@betongogmaskin.no");
    vi.stubEnv("CONTACT_TO", "to@betongogmaskin.no");
    const result = await submitContact(initial, buildForm(validInput));

    expect(result.outcome.status).toBe("error");

    if (result.outcome.status === "error") {
      expect(result.outcome.message).toBe(
        "Kunne ikke sende meldingen. Prøv igjen senere.",
      );
    }

    expect(send).not.toHaveBeenCalled();
  });

  it("Resend returns an error: returns the generic error", async () => {
    currentIp = "10.0.0.7";
    setEnv();
    send.mockResolvedValueOnce({ error: { message: "boom" } });
    const result = await submitContact(initial, buildForm(validInput));

    expect(result.outcome.status).toBe("error");

    if (result.outcome.status === "error") {
      expect(result.outcome.message).toBe(
        "Kunne ikke sende meldingen. Prøv igjen senere.",
      );
    }
  });

  it("Resend error after Turnstile verify: resetTurnstile is true", async () => {
    currentIp = "10.0.0.10";
    setEnv();
    vi.stubEnv("TURNSTILE_SECRET_KEY", "ts_secret");
    verifyTurnstile.mockResolvedValueOnce(true);
    send.mockResolvedValueOnce({ error: { message: "boom" } });
    const result = await submitContact(
      initial,
      buildForm({ ...validInput, token: "tok" }),
    );

    expect(result.outcome.status).toBe("error");

    if (result.outcome.status === "error") {
      expect(result.outcome.message).toBe(
        "Kunne ikke sende meldingen. Prøv igjen senere.",
      );
      expect(result.outcome.resetTurnstile).toBe(true);
    }
  });

  it("Resend send throws: the outer catch returns the generic error (never throws out)", async () => {
    currentIp = "10.0.0.8";
    setEnv();
    send.mockRejectedValueOnce(new Error("network down"));
    const result = await submitContact(initial, buildForm(validInput));

    expect(result.outcome.status).toBe("error");

    if (result.outcome.status === "error") {
      expect(result.outcome.message).toBe(
        "Kunne ikke sende meldingen. Prøv igjen senere.",
      );
    }
  });

  it("Resend throw after Turnstile verify: outer catch sets resetTurnstile true", async () => {
    currentIp = "10.0.0.11";
    setEnv();
    vi.stubEnv("TURNSTILE_SECRET_KEY", "ts_secret");
    verifyTurnstile.mockResolvedValueOnce(true);
    send.mockRejectedValueOnce(new Error("network down"));
    const result = await submitContact(
      initial,
      buildForm({ ...validInput, token: "tok" }),
    );

    expect(result.outcome.status).toBe("error");

    if (result.outcome.status === "error") {
      expect(result.outcome.message).toBe(
        "Kunne ikke sende meldingen. Prøv igjen senere.",
      );
      expect(result.outcome.resetTurnstile).toBe(true);
    }
  });

  it("Turnstile secret set, no token: verify error, no send, resetTurnstile false", async () => {
    currentIp = "10.0.0.12";
    setEnv();
    vi.stubEnv("TURNSTILE_SECRET_KEY", "ts_secret");
    const result = await submitContact(initial, buildForm(validInput));

    expect(result.outcome.status).toBe("error");

    if (result.outcome.status === "error") {
      expect(result.outcome.message).toBe(
        "Verifisering feilet. Last siden på nytt og prøv igjen.",
      );
      expect(result.outcome.resetTurnstile).toBe(false);
    }

    expect(verifyTurnstile).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });
});
