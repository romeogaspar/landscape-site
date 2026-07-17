import { defineField, defineType } from 'sanity'
import { LinkIcon as Link } from '@sanity/icons/Link'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  icon: Link,
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
      title: 'Platform',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Pinterest', value: 'pinterest' },
          { title: 'YouTube', value: 'youtube' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'platform', subtitle: 'url' },
  },
})
