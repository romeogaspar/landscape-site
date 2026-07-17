import { defineField, defineType } from 'sanity'
import { UsersIcon as Users } from '@sanity/icons/Users'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: Users,
  fields: [
    defineField({ name: 'heading', type: 'string', title: 'Heading', initialValue: 'About Us' }),
    defineField({ name: 'introText', type: 'text', title: 'Intro Text', rows: 3 }),
    defineField({ name: 'story', type: 'array', title: 'Our Story', of: [{ type: 'block' }] }),
    defineField({ name: 'teamPhoto', type: 'image', title: 'Team Photo', options: { hotspot: true } }),
    defineField({ name: 'yearsInBusiness', type: 'number', title: 'Years in Business' }),
    defineField({
      name: 'credentials',
      type: 'array',
      title: 'Credentials & Certifications',
      of: [
        {
          type: 'object',
          name: 'credential',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title', validation: (rule) => rule.required() }),
            defineField({ name: 'issuer', type: 'string', title: 'Issuing Organization' }),
          ],
          preview: { select: { title: 'title', subtitle: 'issuer' } },
        },
      ],
    }),
    defineField({ name: 'seo', type: 'seo', title: 'SEO' }),
  ],
  preview: {
    select: { title: 'heading' },
  },
})
