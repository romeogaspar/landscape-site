import { config } from "dotenv";
import { createClient } from "next-sanity";

config({ path: ".env.local" });
import {
  heroSvg,
  gardenBeforeSvg,
  gardenAfterSvg,
  servicesIconSvg,
  portraitSvg,
} from "./svg";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

function block(text: string) {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2),
    style: "normal",
    markDefs: [],
    children: [
      { _type: "span", _key: Math.random().toString(36).slice(2), text, marks: [] },
    ],
  };
}

async function uploadSvg(svg: string, filename: string) {
  const asset = await client.assets.upload("image", Buffer.from(svg), {
    filename,
    contentType: "image/svg+xml",
  });
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
}

async function main() {
  console.log("Uploading placeholder imagery...");
  const hero = await uploadSvg(heroSvg(), "hero.svg");
  const teamPhoto = await uploadSvg(portraitSvg(1), "team-group.svg");

  const serviceImages = {
    design: await uploadSvg(servicesIconSvg("leaf"), "service-design.svg"),
    lawn: await uploadSvg(servicesIconSvg("mower"), "service-lawn.svg"),
    hardscape: await uploadSvg(servicesIconSvg("paver"), "service-hardscape.svg"),
    irrigation: await uploadSvg(servicesIconSvg("drop"), "service-irrigation.svg"),
  };

  const gardens = [
    { key: "willow", title: "Willow Creek Backyard Retreat", location: "Willow Creek neighborhood", category: "garden-design" },
    { key: "maple", title: "Maple Street Front Yard Refresh", location: "Maple Street", category: "hardscaping" },
    { key: "hilltop", title: "Hilltop Terrace Garden", location: "Hilltop district", category: "planting" },
  ];

  const galleryAssets = [];
  for (let i = 0; i < gardens.length; i++) {
    const before = await uploadSvg(gardenBeforeSvg(i + 1), `${gardens[i].key}-before.svg`);
    const after = await uploadSvg(gardenAfterSvg(i + 1), `${gardens[i].key}-after.svg`);
    galleryAssets.push({ ...gardens[i], before, after });
  }

  console.log("Creating team members...");
  const alex = await client.create({
    _type: "teamMember",
    name: "Alex Rivera",
    role: "Lead Landscape Designer",
    photo: await uploadSvg(portraitSvg(2), "team-alex.svg"),
    bio: "Alex leads every design from first sketch to final planting, with a decade of experience shaping residential gardens.",
    order: 1,
  });

  const jordan = await client.create({
    _type: "teamMember",
    name: "Jordan Lee",
    role: "Grounds Maintenance Manager",
    photo: await uploadSvg(portraitSvg(3), "team-jordan.svg"),
    bio: "Jordan keeps every property looking its best year-round, overseeing our maintenance and lawn care crews.",
    order: 2,
  });

  console.log("Creating services...");
  const services = await Promise.all([
    client.create({
      _type: "service",
      title: "Garden Design & Installation",
      slug: { _type: "slug", current: "garden-design-installation" },
      summary: "Custom garden plans brought to life, from initial concept through final planting.",
      description: [
        block("We start with a conversation about how you use your outdoor space, then design a garden that fits your property, climate, and maintenance preferences."),
        block("Our design team handles everything from soil preparation and plant selection to the final installation, so the result matches the plan."),
      ],
      image: serviceImages.design,
      order: 1,
    }),
    client.create({
      _type: "service",
      title: "Lawn Care & Maintenance",
      slug: { _type: "slug", current: "lawn-care-maintenance" },
      summary: "Scheduled mowing, fertilization, and seasonal care to keep your lawn healthy.",
      description: [
        block("Regular maintenance visits keep lawns dense, green, and resistant to weeds and disease throughout the growing season."),
        block("We tailor a program to your grass type and local conditions, including aeration, overseeding, and fertilization."),
      ],
      image: serviceImages.lawn,
      order: 2,
    }),
    client.create({
      _type: "service",
      title: "Hardscaping & Patios",
      slug: { _type: "slug", current: "hardscaping-patios" },
      summary: "Patios, walkways, and retaining walls built to extend your living space outdoors.",
      description: [
        block("From paver patios to natural stone walkways, we build hardscape features that hold up to weather and daily use."),
        block("Every project is planned for proper drainage and a solid base, so it looks good for years, not just for the first season."),
      ],
      image: serviceImages.hardscape,
      order: 3,
    }),
    client.create({
      _type: "service",
      title: "Irrigation & Outdoor Lighting",
      slug: { _type: "slug", current: "irrigation-outdoor-lighting" },
      summary: "Efficient irrigation systems and landscape lighting designed around your property.",
      description: [
        block("A well-designed irrigation system saves water while keeping every zone of your property properly watered."),
        block("We also design low-voltage lighting layouts that highlight key features and improve safety after dark."),
      ],
      image: serviceImages.irrigation,
      order: 4,
    }),
  ]);

  console.log("Creating gallery projects...");
  const galleryProjects = await Promise.all(
    galleryAssets.map((g, i) =>
      client.create({
        _type: "galleryProject",
        title: g.title,
        slug: { _type: "slug", current: g.key },
        beforeImage: g.before,
        afterImage: g.after,
        description: "A full renovation covering grading, planting, and hardscape work completed over several weeks.",
        location: g.location,
        category: g.category,
        completedDate: new Date(Date.now() - (i + 1) * 45 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        featured: true,
      }),
    ),
  );

  console.log("Creating testimonials...");
  await Promise.all([
    client.create({
      _type: "testimonial",
      customerName: "Sarah M.",
      rating: 5,
      quote: "They transformed our backyard into something we actually want to spend time in. Professional from the first estimate to the final walk-through.",
      projectType: "Backyard Redesign",
      date: "2026-05-12",
      featured: true,
    }),
    client.create({
      _type: "testimonial",
      customerName: "David K.",
      rating: 5,
      quote: "Our lawn has never looked better. The crew shows up on schedule every time and always cleans up after themselves.",
      projectType: "Lawn Care & Maintenance",
      date: "2026-04-03",
      featured: true,
    }),
    client.create({
      _type: "testimonial",
      customerName: "Priya R.",
      rating: 5,
      quote: "The new patio is exactly what we pictured. They walked us through material options and the install was quick and clean.",
      projectType: "Hardscaping & Patios",
      date: "2026-03-21",
      featured: true,
    }),
    client.create({
      _type: "testimonial",
      customerName: "Tom H.",
      rating: 4,
      quote: "Great communication throughout the project and a fair price. Would use them again for future work.",
      projectType: "Irrigation & Outdoor Lighting",
      date: "2026-02-08",
      featured: false,
    }),
  ]);

  console.log("Creating singletons...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    businessName: "Evergreen Grounds Landscaping",
    tagline: "Landscapes built to last.",
    phone: "(555) 019-2837",
    email: "hello@evergreengrounds.com",
    address: {
      _type: "address",
      street: "482 Willow Creek Road",
      city: "Springfield",
      state: "IL",
      postalCode: "62704",
    },
    googleMapsEmbedUrl: "https://www.google.com/maps?q=Springfield,IL&output=embed",
    businessHours: [
      { _type: "hoursEntry", _key: "mf", days: "Mon - Fri", hours: "7:00am - 6:00pm" },
      { _type: "hoursEntry", _key: "sa", days: "Saturday", hours: "8:00am - 2:00pm" },
      { _type: "hoursEntry", _key: "su", days: "Sunday", hours: "Closed" },
    ],
    defaultSeo: {
      _type: "seo",
      metaTitle: "Evergreen Grounds Landscaping | Garden Design & Care",
      metaDescription: "Professional landscape design, installation, and maintenance. Licensed, insured, and trusted by homeowners across the region.",
    },
  });

  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroHeading: "Outdoor Spaces, Thoughtfully Cultivated",
    heroSubheading: "Full-service landscape design, installation, and maintenance for homeowners who want it done right the first time.",
    heroImage: hero,
    heroCtaLabel: "Get a Free Quote",
    introHeading: "Rooted in Craftsmanship",
    introText: "For over 15 years, we've combined horticultural expertise with careful attention to detail, delivering landscapes that hold up season after season.",
    featuredProjects: galleryProjects.map((p) => ({
      _type: "reference",
      _key: p._id,
      _ref: p._id,
    })),
    seo: {
      _type: "seo",
      metaTitle: "Evergreen Grounds Landscaping | Professional Garden Design & Care",
      metaDescription: "Full-service landscape design, installation, and maintenance. Browse our recent projects and get a free quote today.",
    },
  });

  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heading: "About Us",
    introText: "We're a local team of designers and horticulturists dedicated to building landscapes that last.",
    story: [
      block("Evergreen Grounds started with a simple idea: outdoor spaces should be as well-built and well-maintained as the homes they surround."),
      block("Today our crews handle everything from first design sketch to ongoing seasonal care, drawing on horticultural training and hands-on construction experience."),
      block("We're proud to be a locally owned, licensed, and insured company trusted by homeowners across the region."),
    ],
    teamPhoto,
    yearsInBusiness: 15,
    credentials: [
      { _key: "lic", title: "Licensed & Insured", issuer: "State Contractors Board" },
      { _key: "hort", title: "Certified Horticulturist on Staff" },
      { _key: "nalp", title: "Member, National Association of Landscape Professionals" },
    ],
    seo: {
      _type: "seo",
      metaTitle: "About Evergreen Grounds Landscaping",
      metaDescription: "Meet the team behind Evergreen Grounds Landscaping and learn about our credentials and approach to landscape design.",
    },
  });

  console.log("Done. Team refs:", alex._id, jordan._id);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
