import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isAdminOrEditor } from '@/access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Imagen o video', plural: 'Imágenes y videos' },
  admin: { group: 'Medios', useAsTitle: 'alt', defaultColumns: ['filename', 'alt', 'register', 'updatedAt'] },
  access: { read: anyone, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdmin },
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'video/mp4', 'video/webm'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumb', width: 400 },
      { name: 'card', width: 800, height: 1000, position: 'centre' },
      { name: 'hero', width: 1920 },
      { name: 'heroMobile', width: 1080, height: 1920, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'thumb',
  },
  fields: [
    {
      name: 'alt',
      label: 'Texto alternativo',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description:
          'Describí lo que se ve. Ej.: "Cubierta del catamarán al atardecer con las sierras de fondo". Obligatorio.',
      },
    },
    { name: 'caption', label: 'Epígrafe', type: 'text', localized: true },
    { name: 'credit', label: 'Crédito / autor', type: 'text' },
    {
      name: 'register',
      label: 'Registro fotográfico',
      type: 'select',
      admin: { description: 'Brandbook 07.01: paisaje, experiencia o detalle.' },
      options: [
        { label: 'Paisaje', value: 'paisaje' },
        { label: 'Experiencia', value: 'experiencia' },
        { label: 'Detalle', value: 'detalle' },
        { label: 'Equipo', value: 'equipo' },
        { label: 'Obra / astillero', value: 'obra' },
      ],
    },
  ],
}
