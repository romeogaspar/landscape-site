"use server";

import { writeClient } from "@/sanity/lib/write-client";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
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
    return { status: "success", message: "Thanks — your message has been sent. We'll be in touch soon." };
  } catch {
    return { status: "error", message: "Something went wrong sending your message. Please try again or call us directly." };
  }
}
