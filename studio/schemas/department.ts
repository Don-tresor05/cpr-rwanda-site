import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'department',
  title: 'Department',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'headName', title: 'Department Head Name', type: 'string' }),
    defineField({ name: 'headTitle', title: 'Department Head Title', type: 'string' }),
    defineField({ name: 'headImage', title: 'Department Head Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: { select: { title: 'name', media: 'image' } },
})
