import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { StarRating } from "@/components/ui/StarRating";
import type { Testimonial } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read what our customers have to say about their landscape design, installation, and maintenance projects.",
};

export default async function ReviewsPage() {
  const { data: testimonials } = await sanityFetch({ query: TESTIMONIALS_QUERY });
  const testimonialList = (testimonials as Testimonial[] | null) ?? [];

  const averageRating =
    testimonialList.length > 0
      ? testimonialList.reduce((sum, t) => sum + t.rating, 0) / testimonialList.length
      : 0;

  return (
    <>
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Client Reviews"
            title="What Our Clients Say"
            description="Real feedback from homeowners we've worked with, added as new projects wrap up."
          />
          {testimonialList.length > 0 && (
            <div className="mt-8 flex flex-col items-center gap-2">
              <StarRating rating={Math.round(averageRating)} />
              <p className="text-sm text-charcoal/60">
                {averageRating.toFixed(1)} average from {testimonialList.length} reviews
              </p>
            </div>
          )}
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonialList.map((testimonial) => (
              <TestimonialCard key={testimonial._id} testimonial={testimonial} />
            ))}
          </div>
          {testimonialList.length === 0 && (
            <p className="text-center text-charcoal/60">Reviews are on their way — check back soon.</p>
          )}
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container className="flex flex-col items-center gap-6 rounded-sm bg-forest-900 px-8 py-16 text-center">
          <h2 className="max-w-xl font-serif text-3xl text-cream sm:text-4xl">
            Ready to become our next happy client?
          </h2>
          <Button href="/contact" variant="primary">
            Get a Free Quote
          </Button>
        </Container>
      </section>
    </>
  );
}
