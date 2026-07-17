import { defineField, defineType } from 'sanity'
import { EnvelopeIcon as Envelope } from '@sanity/icons/Envelope'

export const contactSubmission = defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  icon: Envelope,
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name', readOnly: true }),
    defineField({ name: 'email', type: 'string', title: 'Email', readOnly: true }),
    defineField({ name: 'phone', type: 'string', title: 'Phone', readOnly: true }),
    defineField({ name: 'message', type: 'text', title: 'Message', rows: 5, readOnly: true }),
    defineField({ name: 'submittedAt', type: 'datetime', title: 'Submitted At', readOnly: true }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Closed', value: 'closed' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
  ],
  orderings: [
    {
      title: 'Submitted, New to Old',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'email' },
  },
})
