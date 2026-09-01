import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'departmentResourceFile',
  title: 'Department Resource File',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'file', title: 'File', type: 'file' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'department', title: 'Department', type: 'reference', to: [{ type: 'department' }] }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
  ],
  preview: { select: { title: 'title', subtitle: 'category' } },
})
