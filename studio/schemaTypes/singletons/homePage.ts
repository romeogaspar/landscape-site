import { defineField, defineType } from 'sanity'
import { HomeIcon as Home } from '@sanity/icons/Home'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: Home,
  fields: [
    defineField({ name: 'heroHeading', type: 'string', title: 'Hero Heading', validation: (rule) => rule.required() }),
    defineField({ name: 'heroSubheading', type: 'text', title: 'Hero Subheading', rows: 2 }),
    defineField({ name: 'heroImage', type: 'image', title: 'Hero Image', options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: 'heroCtaLabel', type: 'string', title: 'Hero Button Label', initialValue: 'Get a Free Quote' }),
    defineField({ name: 'introHeading', type: 'string', title: 'Intro Heading' }),
    defineField({ name: 'introText', type: 'text', title: 'Intro Text', rows: 4 }),
    defineField({
      name: 'featuredProjects',
      type: 'array',
      title: 'Featured Projects',
      description: 'Recent projects to highlight on the homepage.',
      of: [{ type: 'reference', to: [{ type: 'galleryProject' }] }],
      validation: (rule) => rule.max(6),
    }),
    defineField({ name: 'seo', type: 'seo', title: 'SEO' }),
  ],
  preview: {
    select: { title: 'heroHeading' },
  },
})
