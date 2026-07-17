import { StarRating } from "@/components/ui/StarRating";
import type { Testimonial } from "@/sanity/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col gap-4 rounded-sm border border-forest-900/10 bg-white p-8">
      <StarRating rating={testimonial.rating} />
      <blockquote className="flex-1 font-serif text-lg leading-relaxed text-forest-950">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="flex flex-col gap-0.5 border-t border-forest-900/10 pt-4">
        <span className="text-sm font-semibold text-forest-950">{testimonial.customerName}</span>
        {testimonial.projectType && (
          <span className="text-xs text-charcoal/60">{testimonial.projectType}</span>
        )}
      </figcaption>
    </figure>
  );
}
