import "server-only";

// Server-side Cloudflare Turnstile verification (the real gate; the client widget alone isn't).
export async function verifyTurnstile(
  token: string,
  ip?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) return false;

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);

  if (ip && ip !== "unknown") form.append("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: form },
    );
    const data = (await res.json()) as { success?: boolean };

    return data.success === true;
  } catch (err) {
    // Transient network/Cloudflare error or non-JSON response → fail closed.
    console.error("Turnstile verification failed:", err);
    return false;
  }
}
