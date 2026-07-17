import { defineField, defineType } from 'sanity'
import { StarIcon as Star } from '@sanity/icons/Star'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: Star,
  fields: [
    defineField({ name: 'customerName', type: 'string', title: 'Customer Name', validation: (rule) => rule.required() }),
    defineField({
      name: 'rating',
      type: 'number',
      title: 'Rating',
      options: { list: [1, 2, 3, 4, 5] },
      validation: (rule) => rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({ name: 'quote', type: 'text', title: 'Quote', rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: 'projectType', type: 'string', title: 'Project Type', description: 'e.g. "Backyard Redesign"' }),
    defineField({ name: 'date', type: 'date', title: 'Date' }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured on Homepage',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Date, New to Old',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'customerName', subtitle: 'quote' },
  },
})
