import { defineField, defineType } from 'sanity'
import { SearchIcon as Search } from '@sanity/icons/Search'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: Search,
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Shown in search results and browser tabs. Aim for 50-60 characters.',
      validation: (rule) => rule.max(60).warning('Keep it under 60 characters for best SEO'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Shown in search results. Aim for 140-160 characters.',
      validation: (rule) => rule.max(160).warning('Keep it under 160 characters for best SEO'),
    }),
  ],
})
