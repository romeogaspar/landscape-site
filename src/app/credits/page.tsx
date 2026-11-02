import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PHOTO_CREDITS } from "@/lib/credits";

export const metadata: Metadata = {
  title: "Photo Credits",
  description: "Credits for the demo photographs used on this site.",
};

export default function CreditsPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Photo Credits"
          title="Photographs"
          description="Demo photographs from Wikimedia Commons, resized and cropped for this site."
        />
        <ul className="mx-auto mt-12 flex max-w-3xl flex-col divide-y divide-forest-900/10">
          {PHOTO_CREDITS.map((credit) => (
            <li key={credit.use} className="flex flex-col gap-1 py-4 text-sm text-charcoal/80">
              <span className="text-xs font-semibold tracking-[0.15em] text-gold-dark uppercase">
                {credit.use}
              </span>
              <span>
                <a
                  href={credit.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-forest-950 underline underline-offset-2 hover:text-gold-dark"
                >
                  {credit.title}
                </a>{" "}
                by {credit.author},{" "}
                {credit.licenseUrl ? (
                  <a
                    href={credit.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-gold-dark"
                  >
                    {credit.license}
                  </a>
                ) : (
                  credit.license
                )}
                .
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
