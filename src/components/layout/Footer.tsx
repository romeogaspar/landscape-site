import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { SiteSettings } from "@/sanity/types";

const SOCIAL_ICON_PATHS: Record<string, string> = {
  facebook:
    "M22 12a10 10 0 1 0-11.6 9.87v-6.98H7.9V12h2.5V9.8c0-2.47 1.47-3.84 3.72-3.84 1.08 0 2.2.2 2.2.2v2.42h-1.24c-1.22 0-1.6.76-1.6 1.54V12h2.72l-.44 2.89h-2.28v6.98A10 10 0 0 0 22 12",
  instagram:
    "M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.46.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.24.64.41 1.36.46 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.46 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.24-1.36.41-2.43.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.46a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.24-.64-.41-1.36-.46-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.46-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.44 2.5c.64-.24 1.36-.41 2.43-.46C8.94 2.01 9.28 2 12 2m0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10m0 8.25a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5m5.4-8.6a1.17 1.17 0 1 1-2.34 0 1.17 1.17 0 0 1 2.34 0",
  linkedin:
    "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12M7.12 20.45H3.56V9h3.56z",
  pinterest:
    "M12 2a10 10 0 0 0-3.65 19.31c-.05-.8-.09-2.04.02-2.92.1-.79.66-5.05.66-5.05s-.17-.34-.17-.83c0-.78.45-1.36 1.02-1.36.48 0 .71.36.71.79 0 .48-.31 1.2-.47 1.87-.13.56.28 1.02.83 1.02 1 0 1.77-1.05 1.77-2.58 0-1.35-.97-2.29-2.36-2.29-1.6 0-2.55 1.2-2.55 2.45 0 .48.19.99.42 1.27a.17.17 0 0 1 .04.16c-.05.19-.15.6-.17.68-.03.11-.09.13-.2.08-.79-.37-1.28-1.51-1.28-2.44 0-1.99 1.44-3.81 4.17-3.81 2.19 0 3.9 1.56 3.9 3.65 0 2.18-1.37 3.93-3.28 3.93-.64 0-1.24-.34-1.45-.73l-.39 1.5c-.14.55-.53 1.23-.78 1.65A10 10 0 1 0 12 2",
  youtube:
    "M23.5 7.19a3.02 3.02 0 0 0-2.12-2.14C19.51 4.5 12 4.5 12 4.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 7.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 4.81 3.02 3.02 0 0 0 2.12 2.14c1.87.55 9.38.55 9.38.55s7.51 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-4.81M9.6 15.4V8.6l6.27 3.4z",
};

export function Footer({ siteSettings }: { siteSettings: SiteSettings | null }) {
  const businessName = siteSettings?.businessName ?? "Evergreen Grounds Landscaping";
  const phone = siteSettings?.phone;
  const email = siteSettings?.email;
  const address = siteSettings?.address;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-cream/90">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <span className="font-serif text-xl text-cream">{businessName}</span>
          {siteSettings?.tagline && (
            <p className="text-sm leading-relaxed text-cream/60">{siteSettings.tagline}</p>
          )}
          {siteSettings?.socialLinks && siteSettings.socialLinks.length > 0 && (
            <div className="mt-2 flex gap-3">
              {siteSettings.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d={SOCIAL_ICON_PATHS[link.platform]} />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
            Navigate
          </h3>
          <Link href="/services" className="text-sm text-cream/70 hover:text-cream">Services</Link>
          <Link href="/gallery" className="text-sm text-cream/70 hover:text-cream">Gallery</Link>
          <Link href="/reviews" className="text-sm text-cream/70 hover:text-cream">Reviews</Link>
          <Link href="/about" className="text-sm text-cream/70 hover:text-cream">About Us</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
            Contact
          </h3>
          {phone && (
            <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="text-sm text-cream/70 hover:text-cream">
              {phone}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="text-sm text-cream/70 hover:text-cream">
              {email}
            </a>
          )}
          {address?.street && (
            <p className="text-sm text-cream/70">
              {address.street}
              <br />
              {[address.city, address.state, address.postalCode].filter(Boolean).join(", ")}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
            Hours
          </h3>
          {siteSettings?.businessHours && siteSettings.businessHours.length > 0 ? (
            siteSettings.businessHours.map((entry, i) => (
              <div key={i} className="flex justify-between gap-4 text-sm text-cream/70">
                <span>{entry.days}</span>
                <span>{entry.hours}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-cream/70">Mon - Fri, 8am - 5pm</p>
          )}
        </div>
      </Container>

      <div className="border-t border-cream/10 py-6">
        <Container>
          <p className="text-center text-xs text-cream/50">
            &copy; {year} {businessName}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
