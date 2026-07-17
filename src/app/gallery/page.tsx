import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { GALLERY_PROJECTS_QUERY } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import type { GalleryProject } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse before-and-after photos of completed gardens, patios, and lawn transformations from our recent landscaping projects.",
};

export default async function GalleryPage() {
  const { data: projects } = await sanityFetch({ query: GALLERY_PROJECTS_QUERY });
  const projectList = (projects as GalleryProject[] | null) ?? [];

  return (
    <>
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Project Gallery"
            title="Before & After"
            description="Drag the slider on any photo to see the full transformation."
          />
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container>
          <GalleryGrid projects={projectList} />
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container className="flex flex-col items-center gap-6 rounded-sm bg-forest-900 px-8 py-16 text-center">
          <h2 className="max-w-xl font-serif text-3xl text-cream sm:text-4xl">
            Want results like these on your property?
          </h2>
          <Button href="/contact" variant="primary">
            Get a Free Quote
          </Button>
        </Container>
      </section>
    </>
  );
}
