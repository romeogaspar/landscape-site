"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import type { SiteSettings } from "@/sanity/types";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ siteSettings }: { siteSettings: SiteSettings | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const businessName = siteSettings?.businessName ?? "Evergreen Grounds";

  return (
    <header className="sticky top-0 z-50 border-b border-forest-900/10 bg-cream/95 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-forest-950"
          onClick={() => setOpen(false)}
        >
          {businessName}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                pathname === link.href
                  ? "text-forest-950"
                  : "text-charcoal/60 hover:text-forest-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-sm bg-forest-900 px-6 py-3 text-sm font-medium tracking-wide text-cream uppercase transition-colors hover:bg-forest-800"
          >
            Get a Free Quote
          </Link>
        </div>

        <label
          htmlFor="mobile-menu-toggle"
          className="flex h-10 w-10 cursor-pointer items-center justify-center lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <input
            type="checkbox"
            id="mobile-menu-toggle"
            className="sr-only"
            checked={open}
            onChange={(e) => setOpen(e.target.checked)}
          />
          <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-forest-950" fill="none">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeWidth="1.75" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="1.75" strokeLinecap="round" />
            )}
          </svg>
        </label>
      </Container>

      {open && (
        <div className="border-t border-forest-900/10 bg-cream lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-sm px-3 py-3 text-sm font-medium tracking-wide uppercase transition-colors ${
                  pathname === link.href
                    ? "bg-forest-100 text-forest-950"
                    : "text-charcoal/70 hover:bg-forest-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-sm bg-forest-900 px-6 py-3 text-sm font-medium tracking-wide text-cream uppercase"
            >
              Get a Free Quote
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
