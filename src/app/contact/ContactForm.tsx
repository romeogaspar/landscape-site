"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

const inputClasses =
  "w-full rounded-sm border border-forest-900/20 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-forest-700 focus:outline-none";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-semibold tracking-wide text-forest-950 uppercase">
            Name
          </label>
          <input id="name" name="name" type="text" required className={inputClasses} placeholder="Jane Smith" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs font-semibold tracking-wide text-forest-950 uppercase">
            Phone <span className="normal-case text-charcoal/40">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" className={inputClasses} placeholder="(555) 123-4567" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs font-semibold tracking-wide text-forest-950 uppercase">
          Email
        </label>
        <input id="email" name="email" type="email" required className={inputClasses} placeholder="jane@example.com" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-semibold tracking-wide text-forest-950 uppercase">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClasses}
          placeholder="Tell us about your property and what you'd like done..."
        />
      </div>

      {state.status !== "idle" && (
        <p
          role="status"
          className={`text-sm ${state.status === "success" ? "text-forest-700" : "text-red-700"}`}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-forest-950 uppercase transition-colors hover:bg-gold-dark hover:text-cream disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
