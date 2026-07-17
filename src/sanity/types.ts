import type { Image } from "sanity";

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

export interface SocialLink {
  platform: "facebook" | "instagram" | "linkedin" | "pinterest" | "youtube";
  url: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
}

export interface BusinessHoursEntry {
  days?: string;
  hours?: string;
}

export interface SiteSettings {
  businessName: string;
  tagline?: string;
  logo?: Image;
  phone: string;
  email: string;
  address?: Address;
  googleMapsEmbedUrl?: string;
  businessHours?: BusinessHoursEntry[];
  socialLinks?: SocialLink[];
  defaultSeo?: Seo;
}

export interface GalleryProject {
  _id: string;
  title: string;
  slug: { current: string };
  beforeImage: Image;
  afterImage: Image;
  description?: string;
  location?: string;
  category?: string;
  completedDate?: string;
  featured?: boolean;
}

export interface HomePage {
  heroHeading: string;
  heroSubheading?: string;
  heroImage: Image;
  heroCtaLabel?: string;
  introHeading?: string;
  introText?: string;
  featuredProjects?: GalleryProject[];
  seo?: Seo;
}

export interface Credential {
  title: string;
  issuer?: string;
}

export interface AboutPage {
  heading?: string;
  introText?: string;
  story?: unknown[];
  teamPhoto?: Image;
  yearsInBusiness?: number;
  credentials?: Credential[];
  seo?: Seo;
}

export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  summary: string;
  description?: unknown[];
  image?: Image;
  order?: number;
}

export interface Testimonial {
  _id: string;
  customerName: string;
  rating: number;
  quote: string;
  projectType?: string;
  date?: string;
  featured?: boolean;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photo?: Image;
  bio?: string;
}
