import { defineField, defineType } from 'sanity'
import { WrenchIcon as Wrench } from '@sanity/icons/Wrench'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: Wrench,
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      title: 'Short Summary',
      rows: 2,
      description: 'One or two sentences shown on service cards.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({ name: 'description', type: 'array', title: 'Full Description', of: [{ type: 'block' }] }),
    defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Lower numbers appear first.',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'summary', media: 'image' },
  },
})
