import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'role', title: 'Role / Position', type: 'string' }),
    defineField({ name: 'church', title: 'Church', type: 'string' }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (R) => R.required() }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'name', subtitle: 'church', media: 'image' } },
})
