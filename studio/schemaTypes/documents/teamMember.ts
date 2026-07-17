import { defineField, defineType } from 'sanity'
import { UserIcon as User } from '@sanity/icons/User'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: User,
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name', validation: (rule) => rule.required() }),
    defineField({ name: 'role', type: 'string', title: 'Role', validation: (rule) => rule.required() }),
    defineField({ name: 'photo', type: 'image', title: 'Photo', options: { hotspot: true } }),
    defineField({ name: 'bio', type: 'text', title: 'Bio', rows: 3 }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display Order',
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
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
