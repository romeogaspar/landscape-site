import Image from "next/image";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/live";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Garden design, lawn care, hardscaping, and irrigation services for residential properties — clear pricing, clear timelines, no surprises.",
};

export default async function ServicesPage() {
  const { data: services } = await sanityFetch({ query: SERVICES_QUERY });
  const serviceList = (services as Service[] | null) ?? [];

  return (
    <>
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our Services"
            title="Everything Your Property Needs, One Team"
            description="From first design to season-round maintenance, each service below is handled by our own trained crews — not subcontracted out."
          />
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container className="flex flex-col gap-20">
          {serviceList.map((service, i) => (
            <div
              key={service._id}
              id={service.slug.current}
              className="grid scroll-mt-28 gap-10 lg:grid-cols-2 lg:items-center"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                {service.image && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                    <Image
                      src={urlForImage(service.image).width(900).height(675).url()}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <div className={`flex flex-col gap-4 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <h2 className="font-serif text-2xl text-forest-950 sm:text-3xl">{service.title}</h2>
                <p className="text-base leading-relaxed text-charcoal/70">{service.summary}</p>
                {service.description && (
                  <div className="prose-p:mb-3 prose-p:leading-relaxed prose-p:text-charcoal/70 flex flex-col">
                    <PortableText value={service.description} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container className="flex flex-col items-center gap-6 rounded-sm bg-forest-900 px-8 py-16 text-center">
          <h2 className="max-w-xl font-serif text-3xl text-cream sm:text-4xl">
            Not sure which service fits your property?
          </h2>
          <p className="max-w-lg text-cream/75">
            Tell us what you&apos;re working with and we&apos;ll recommend a plan — no pressure, no obligation.
          </p>
          <Button href="/contact" variant="primary">
            Get a Free Quote
          </Button>
        </Container>
      </section>
    </>
  );
}
