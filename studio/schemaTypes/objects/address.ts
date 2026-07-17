import { defineField, defineType } from 'sanity'
import { PinIcon as Pin } from '@sanity/icons/Pin'

export const address = defineType({
  name: 'address',
  title: 'Address',
  type: 'object',
  icon: Pin,
  fields: [
    defineField({ name: 'street', type: 'string', title: 'Street' }),
    defineField({ name: 'city', type: 'string', title: 'City' }),
    defineField({ name: 'state', type: 'string', title: 'State / Province' }),
    defineField({ name: 'postalCode', type: 'string', title: 'Postal Code' }),
  ],
})
