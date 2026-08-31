import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'departmentsPage',
  title: 'Departments Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'introText', title: 'Intro Text', type: 'array', of: [{ type: 'block' }] }),
  ],
  preview: { select: { title: 'title' } },
})
