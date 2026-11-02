"use server";

import { headers } from "next/headers";
import { writeClient } from "@/sanity/lib/write-client";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const SUCCESS_MESSAGE = "Thanks — your message has been sent. We'll be in touch soon.";
const MAX_LENGTHS = { name: 100, email: 200, phone: 40, message: 4000 };

// Simple per-instance rate limit: 5 messages per IP every 10 minutes.
// On serverless hosts each instance keeps its own counter; use a shared store
// (for example Upstash Redis) if you need a strict limit.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: real visitors never see or fill this field. Pretend success for bots.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in your name, email, and message." };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    phone.length > MAX_LENGTHS.phone ||
    message.length > MAX_LENGTHS.message
  ) {
    return { status: "error", message: "One of the fields is too long. Please shorten it and try again." };
  }

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return { status: "error", message: "Too many messages. Please wait a few minutes and try again." };
  }

  try {
    await writeClient.create({
      _type: "contactSubmission",
      name,
      email,
      phone: phone || undefined,
      message,
      submittedAt: new Date().toISOString(),
      status: "new",
    });
    return { status: "success", message: SUCCESS_MESSAGE };
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return { status: "error", message: "Something went wrong sending your message. Please try again or call us directly." };
  }
}
