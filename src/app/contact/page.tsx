import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";
import type { SiteSettings } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch for a free landscaping quote. Call, email, or send a message and we'll get back to you promptly.",
};

export default async function ContactPage() {
  const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const settings = siteSettings as SiteSettings | null;

  return (
    <>
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Contact Us"
            title="Let's Talk About Your Property"
            description="Reach out by phone or email, or send a message below and we'll follow up with a free quote."
          />
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container className="grid gap-14 lg:grid-cols-5">
          <div className="flex flex-col gap-8 lg:col-span-2">
            <div className="flex flex-col gap-4 rounded-sm border border-forest-900/10 bg-white p-8">
              {settings?.phone && (
                <a
                  href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-3 text-forest-950 hover:text-gold-dark"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0 fill-current">
                    <path d="M6.6 10.8c1.4 2.8 3.7 5.1 6.5 6.5l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.5c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1z" />
                  </svg>
                  <span className="text-lg">{settings.phone}</span>
                </a>
              )}
              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 text-forest-950 hover:text-gold-dark"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0 fill-current">
                    <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2.2.2 7.3 5.8a.8.8 0 0 0 1 0l7.3-5.8H4.2Z" />
                  </svg>
                  <span className="text-lg">{settings.email}</span>
                </a>
              )}
              {settings?.address?.street && (
                <div className="flex items-start gap-3 text-forest-950">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 flex-shrink-0 fill-current">
                    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
                  </svg>
                  <span className="text-lg">
                    {settings.address.street}
                    <br />
                    {[settings.address.city, settings.address.state, settings.address.postalCode]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
              )}
              {settings?.businessHours && settings.businessHours.length > 0 && (
                <div className="mt-2 flex flex-col gap-1 border-t border-forest-900/10 pt-4">
                  {settings.businessHours.map((entry, i) => (
                    <div key={i} className="flex justify-between text-sm text-charcoal/70">
                      <span>{entry.days}</span>
                      <span>{entry.hours}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {settings?.googleMapsEmbedUrl && (
              <div className="aspect-[4/3] w-full overflow-hidden rounded-sm border border-forest-900/10">
                <iframe
                  src={settings.googleMapsEmbedUrl}
                  className="h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Business location map"
                />
              </div>
            )}
          </div>

          <div className="rounded-sm border border-forest-900/10 bg-white p-8 lg:col-span-3">
            <h2 className="mb-6 font-serif text-2xl text-forest-950">Send Us a Message</h2>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
