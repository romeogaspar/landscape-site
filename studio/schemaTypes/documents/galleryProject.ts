import { defineField, defineType } from 'sanity'
import { ImagesIcon as Images } from '@sanity/icons/Images'

export const galleryProject = defineType({
  name: 'galleryProject',
  title: 'Gallery Project',
  type: 'document',
  icon: Images,
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Project Title', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'beforeImage',
      type: 'image',
      title: 'Before Image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'afterImage',
      type: 'image',
      title: 'After Image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
    defineField({ name: 'location', type: 'string', title: 'Location', description: 'e.g. "Maple Street, Springfield"' }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Garden Design', value: 'garden-design' },
          { title: 'Lawn Care', value: 'lawn-care' },
          { title: 'Hardscaping', value: 'hardscaping' },
          { title: 'Planting', value: 'planting' },
          { title: 'Irrigation', value: 'irrigation' },
          { title: 'Outdoor Lighting', value: 'outdoor-lighting' },
        ],
      },
    }),
    defineField({ name: 'completedDate', type: 'date', title: 'Completed Date' }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured on Homepage',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Completed Date, New to Old',
      name: 'completedDateDesc',
      by: [{ field: 'completedDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'afterImage' },
  },
})
