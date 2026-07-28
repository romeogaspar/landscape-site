import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY, SERVICES_QUERY, FEATURED_TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import type { HomePage, Service, Testimonial } from "@/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: HOME_PAGE_QUERY, stega: false });
  const home = data as HomePage | null;
  return {
    title: home?.seo?.metaTitle ?? home?.heroHeading,
    description: home?.seo?.metaDescription ?? home?.heroSubheading,
  };
}

export default async function Home() {
  const [{ data: home }, { data: services }, { data: testimonials }] = await Promise.all([
    sanityFetch({ query: HOME_PAGE_QUERY }),
    sanityFetch({ query: SERVICES_QUERY }),
    sanityFetch({ query: FEATURED_TESTIMONIALS_QUERY }),
  ]);

  const homePage = home as HomePage | null;
  const serviceList = (services as Service[] | null) ?? [];
  const testimonialList = (testimonials as Testimonial[] | null) ?? [];

  if (!homePage) return null;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={urlForImage(homePage.heroImage).width(1920).height(1200).url()}
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/40 to-forest-950/10" />
        </div>
        <Container className="relative flex min-h-[640px] flex-col items-start justify-center gap-6 py-32">
          <span className="text-xs font-semibold tracking-[0.25em] text-charcoal uppercase">
            Design &middot; Installation &middot; Maintenance
          </span>
          <h1 className="max-w-2xl font-serif text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
            {homePage.heroHeading}
          </h1>
          {homePage.heroSubheading && (
            <p className="max-w-xl text-lg leading-relaxed text-cream/85">
              {homePage.heroSubheading}
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">
              {homePage.heroCtaLabel ?? "Get a Free Quote"}
            </Button>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-cream/70 bg-forest-950/40 px-7 py-3.5 text-sm font-medium tracking-wide text-cream uppercase backdrop-blur-sm transition-colors duration-200 hover:bg-cream/10"
            >
              View Our Work
            </Link>
          </div>
        </Container>
      </section>

      {/* Intro */}
      {(homePage.introHeading || homePage.introText) && (
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Why Homeowners Choose Us"
              title={homePage.introHeading ?? ""}
              description={homePage.introText}
            />
            <div className="mt-14 grid gap-10 sm:grid-cols-3">
              {[
                { title: "Licensed & Insured", body: "Every crew member is trained, insured, and held to the same standard of care." },
                { title: "Built to Last", body: "We plan for drainage, soil health, and seasons ahead — not just opening day." },
                { title: "Clear Communication", body: "You'll know the timeline, cost, and plan before any work begins." },
              ].map((item) => (
                <div key={item.title} className="flex flex-col items-center gap-3 text-center">
                  <span className="h-1 w-10 rounded-full bg-gold" />
                  <h3 className="font-serif text-lg text-forest-950">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-charcoal/70">{item.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Featured projects */}
      {homePage.featuredProjects && homePage.featuredProjects.length > 0 && (
        <section className="bg-forest-100/60 py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Recent Projects"
              title="Real Yards, Real Transformations"
              description="Drag the slider to compare before and after on a few of our recent projects."
            />
            <div className="mt-14 grid gap-10 lg:grid-cols-3">
              {homePage.featuredProjects.slice(0, 3).map((project) => (
                <div key={project._id} className="flex flex-col gap-4">
                  <BeforeAfterSlider
                    beforeImage={project.beforeImage}
                    afterImage={project.afterImage}
                    title={project.title}
                  />
                  <div>
                    <h3 className="font-serif text-lg text-forest-950">{project.title}</h3>
                    {project.location && <p className="text-sm text-charcoal/60">{project.location}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Button href="/gallery" variant="secondary">
                See Full Gallery
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Services summary */}
      {serviceList.length > 0 && (
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="What We Do"
              title="Services Built Around Your Property"
              description="From first design to ongoing care, every service is handled by our own crews."
            />
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {serviceList.slice(0, 4).map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Button href="/services" variant="ghost">
                View All Services
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Testimonials */}
      {testimonialList.length > 0 && (
        <section className="bg-forest-950 py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Client Reviews"
              title="What Our Clients Say"
              align="center"
            />
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonialList.slice(0, 3).map((testimonial) => (
                <TestimonialCard key={testimonial._id} testimonial={testimonial} />
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Button href="/reviews" variant="primary">
                Read All Reviews
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <Container className="flex flex-col items-center gap-6 rounded-sm bg-forest-900 px-8 py-16 text-center">
          <h2 className="max-w-xl font-serif text-3xl text-cream sm:text-4xl">
            Ready to start your project?
          </h2>
          <p className="max-w-lg text-cream/75">
            Tell us a bit about your property and what you have in mind — we&apos;ll follow up with a free, no-obligation quote.
          </p>
          <Button href="/contact" variant="primary">
            Get a Free Quote
          </Button>
        </Container>
      </section>
    </>
  );
}
