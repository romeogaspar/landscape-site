import { type SchemaTypeDefinition } from 'sanity'

import { address } from './objects/address'
import { socialLink } from './objects/socialLink'
import { seo } from './objects/seo'

import { siteSettings } from './singletons/siteSettings'
import { homePage } from './singletons/homePage'
import { aboutPage } from './singletons/aboutPage'

import { service } from './documents/service'
import { galleryProject } from './documents/galleryProject'
import { testimonial } from './documents/testimonial'
import { teamMember } from './documents/teamMember'
import { contactSubmission } from './documents/contactSubmission'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    address,
    socialLink,
    seo,
    // Singletons
    siteSettings,
    homePage,
    aboutPage,
    // Documents
    service,
    galleryProject,
    testimonial,
    teamMember,
    contactSubmission,
  ],
}

export const schemaTypes = schema.types
