import Image from "next/image";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY, TEAM_MEMBERS_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import type { AboutPage, TeamMember } from "@/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY, stega: false });
  const about = data as AboutPage | null;
  return {
    title: about?.seo?.metaTitle ?? about?.heading ?? "About Us",
    description: about?.seo?.metaDescription ?? about?.introText,
  };
}

export default async function AboutPage() {
  const [{ data: about }, { data: team }] = await Promise.all([
    sanityFetch({ query: ABOUT_PAGE_QUERY }),
    sanityFetch({ query: TEAM_MEMBERS_QUERY }),
  ]);

  const aboutData = about as AboutPage | null;
  const teamList = (team as TeamMember[] | null) ?? [];

  if (!aboutData) return null;

  return (
    <>
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="About Us"
            title={aboutData.heading ?? "Our Story"}
            description={aboutData.introText}
          />
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {aboutData.teamPhoto && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={urlForImage(aboutData.teamPhoto).width(900).height(675).url()}
                alt={aboutData.heading ?? "Our team"}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col gap-6">
            {aboutData.yearsInBusiness && (
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-5xl text-forest-950">
                  {aboutData.yearsInBusiness}+
                </span>
                <span className="text-sm tracking-wide text-charcoal/60 uppercase">
                  Years in Business
                </span>
              </div>
            )}
            {aboutData.story && (
              <div className="prose-p:mb-4 prose-p:leading-relaxed prose-p:text-charcoal/80 flex flex-col">
                <PortableText value={aboutData.story} />
              </div>
            )}
          </div>
        </Container>
      </section>

      {aboutData.credentials && aboutData.credentials.length > 0 && (
        <section className="bg-forest-100/60 py-20 sm:py-28">
          <Container>
            <SectionHeading eyebrow="Credentials" title="Licensed, Certified, and Trusted" />
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {aboutData.credentials.map((credential, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 rounded-sm border border-forest-900/10 bg-white p-6 text-center"
                >
                  <span className="font-serif text-lg text-forest-950">{credential.title}</span>
                  {credential.issuer && (
                    <span className="text-sm text-charcoal/60">{credential.issuer}</span>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {teamList.length > 0 && (
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading eyebrow="Meet the Team" title="The People Behind the Work" />
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {teamList.map((member) => (
                <div key={member._id} className="flex flex-col items-center gap-4 text-center">
                  {member.photo && (
                    <div className="relative h-32 w-32 overflow-hidden rounded-full">
                      <Image
                        src={urlForImage(member.photo).width(256).height(256).url()}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-serif text-lg text-forest-950">{member.name}</h3>
                    <p className="text-sm text-gold-dark">{member.role}</p>
                  </div>
                  {member.bio && (
                    <p className="max-w-xs text-sm leading-relaxed text-charcoal/70">
                      {member.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="pb-20 sm:pb-28">
        <Container className="flex flex-col items-center gap-6 rounded-sm bg-forest-900 px-8 py-16 text-center">
          <h2 className="max-w-xl font-serif text-3xl text-cream sm:text-4xl">
            Let&apos;s talk about your property
          </h2>
          <Button href="/contact" variant="primary">
            Get a Free Quote
          </Button>
        </Container>
      </section>
    </>
  );
}
