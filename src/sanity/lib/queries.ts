import { defineQuery } from 'next-sanity'

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0]{
    businessName,
    tagline,
    logo,
    phone,
    email,
    address,
    googleMapsEmbedUrl,
    businessHours,
    socialLinks,
    defaultSeo
  }
`)

export const HOME_PAGE_QUERY = defineQuery(`
  *[_id == "homePage"][0]{
    heroHeading,
    heroSubheading,
    heroImage,
    heroCtaLabel,
    introHeading,
    introText,
    featuredProjects[]->{
      _id, title, slug, beforeImage, afterImage, description, location, category
    },
    seo
  }
`)

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_id == "aboutPage"][0]{
    heading,
    introText,
    story,
    teamPhoto,
    yearsInBusiness,
    credentials,
    seo
  }
`)

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(order asc){
    _id, title, slug, summary, description, image, order
  }
`)

export const SERVICE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    _id, title, slug, summary, description, image
  }
`)

export const GALLERY_PROJECTS_QUERY = defineQuery(`
  *[_type == "galleryProject"] | order(completedDate desc){
    _id, title, slug, beforeImage, afterImage, description, location, category, completedDate, featured
  }
`)

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(date desc){
    _id, customerName, rating, quote, projectType, date, featured
  }
`)

export const FEATURED_TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial" && featured == true] | order(date desc)[0...6]{
    _id, customerName, rating, quote, projectType, date
  }
`)

export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(order asc){
    _id, name, role, photo, bio
  }
`)
