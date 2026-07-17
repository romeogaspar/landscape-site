import type { StructureResolver } from 'sanity/structure'
import { CogIcon as Cog } from '@sanity/icons/Cog'
import { HomeIcon as Home } from '@sanity/icons/Home'
import { UsersIcon as Users } from '@sanity/icons/Users'
import { EnvelopeIcon as Envelope } from '@sanity/icons/Envelope'

const SINGLETONS = [
  { id: 'homePage', title: 'Home Page', icon: Home },
  { id: 'aboutPage', title: 'About Page', icon: Users },
  { id: 'siteSettings', title: 'Site Settings', icon: Cog },
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map(({ id, title, icon }) =>
        S.listItem()
          .id(id)
          .title(title)
          .icon(icon)
          .child(S.document().schemaType(id).documentId(id)),
      ),
      S.divider(),
      S.listItem()
        .title('Services')
        .schemaType('service')
        .child(S.documentTypeList('service').title('Services')),
      S.listItem()
        .title('Gallery Projects')
        .schemaType('galleryProject')
        .child(S.documentTypeList('galleryProject').title('Gallery Projects')),
      S.listItem()
        .title('Testimonials')
        .schemaType('testimonial')
        .child(S.documentTypeList('testimonial').title('Testimonials')),
      S.listItem()
        .title('Team Members')
        .schemaType('teamMember')
        .child(S.documentTypeList('teamMember').title('Team Members')),
      S.divider(),
      S.listItem()
        .title('Contact Submissions')
        .icon(Envelope)
        .schemaType('contactSubmission')
        .child(
          S.documentTypeList('contactSubmission')
            .title('Contact Submissions')
            .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }]),
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![...SINGLETONS.map((s) => s.id), 'service', 'galleryProject', 'testimonial', 'teamMember', 'contactSubmission'].includes(
            listItem.getId() ?? '',
          ),
      ),
    ])
