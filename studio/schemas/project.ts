import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', title: 'Full Details', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['ongoing', 'completed', 'planned'], layout: 'radio' }, initialValue: 'ongoing' }),
    defineField({ name: 'startDate', title: 'Start Date', type: 'date' }),
    defineField({ name: 'endDate', title: 'End Date', type: 'date' }),
    defineField({ name: 'department', title: 'Department', type: 'reference', to: [{ type: 'department' }] }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: { select: { title: 'title', media: 'mainImage', subtitle: 'status' } },
})
