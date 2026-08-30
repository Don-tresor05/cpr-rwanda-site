import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryCollection',
  title: 'Gallery Collection',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'images', title: 'Images', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'caption', title: 'Caption', type: 'string' },
        ],
        preview: { select: { media: 'image', title: 'caption' } },
      }],
    }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
  ],
  preview: { select: { title: 'title', media: 'coverImage', subtitle: 'category' } },
})
