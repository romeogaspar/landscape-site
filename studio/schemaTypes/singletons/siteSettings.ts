import { defineField, defineType } from 'sanity'
import { CogIcon as Cog } from '@sanity/icons/Cog'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Cog,
  fields: [
    defineField({ name: 'businessName', type: 'string', title: 'Business Name', validation: (rule) => rule.required() }),
    defineField({ name: 'tagline', type: 'string', title: 'Tagline', description: 'Short line shown near the logo/hero, e.g. "Landscapes built to last."' }),
    defineField({ name: 'logo', type: 'image', title: 'Logo' }),
    defineField({ name: 'phone', type: 'string', title: 'Phone Number', validation: (rule) => rule.required() }),
    defineField({ name: 'email', type: 'string', title: 'Email Address', validation: (rule) => rule.required().email() }),
    defineField({ name: 'address', type: 'address', title: 'Business Address' }),
    defineField({
      name: 'googleMapsEmbedUrl',
      type: 'url',
      title: 'Google Maps Embed URL',
      description: 'From Google Maps: Share > Embed a map > copy the src URL from the iframe.',
    }),
    defineField({
      name: 'businessHours',
      type: 'array',
      title: 'Business Hours',
      of: [
        {
          type: 'object',
          name: 'hoursEntry',
          fields: [
            defineField({ name: 'days', type: 'string', title: 'Days', description: 'e.g. "Mon - Fri"' }),
            defineField({ name: 'hours', type: 'string', title: 'Hours', description: 'e.g. "8:00am - 5:00pm"' }),
          ],
          preview: { select: { title: 'days', subtitle: 'hours' } },
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      title: 'Social Links',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'defaultSeo',
      type: 'seo',
      title: 'Default SEO',
      description: 'Used as a fallback for pages without their own SEO fields.',
    }),
  ],
  preview: {
    select: { title: 'businessName' },
  },
})
