import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'radioProgram',
  title: 'Radio Program',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'host', title: 'Host', type: 'string' }),
    defineField({ name: 'schedule', title: 'Schedule', type: 'string' }),
    defineField({ name: 'audioFile', title: 'Audio File', type: 'file' }),
    defineField({ name: 'streamUrl', title: 'Stream URL', type: 'url' }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
  ],
  preview: { select: { title: 'title', media: 'image', subtitle: 'host' } },
})
