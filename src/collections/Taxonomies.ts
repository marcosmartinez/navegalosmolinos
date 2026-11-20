import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isAdminOrEditor } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidateCollection } from '@/hooks/revalidate'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Categoría', plural: 'Categorías' },
  admin: { group: 'Comercial', useAsTitle: 'name', defaultColumns: ['name', 'order'] },
  access: { read: anyone, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdmin },
  hooks: { afterChange: [revalidateCollection('experiences')] },
  fields: [
    { name: 'name', label: 'Nombre', type: 'text', required: true, localized: true },
    slugField('name'),
    { name: 'description', label: 'Descripción', type: 'textarea', localized: true },
    { name: 'order', label: 'Orden', type: 'number', defaultValue: 0 },
  ],
}

export const Seasons: CollectionConfig = {
  slug: 'seasons',
  labels: { singular: 'Temporada', plural: 'Temporadas' },
  admin: {
    group: 'Comercial',
    useAsTitle: 'name',
    description: 'Los precios y horarios se asocian a temporadas. El sitio muestra la vigente (hora de Córdoba).',
  },
  access: { read: anyone, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdmin },
  hooks: { afterChange: [revalidateCollection('experiences')] },
  fields: [
    { name: 'name', label: 'Nombre', type: 'text', required: true, localized: true },
    slugField('name'),
    {
      name: 'ranges',
      label: 'Rangos de fechas',
      type: 'array',
      minRows: 1,
      fields: [
        { type: 'row', fields: [
          { name: 'from', label: 'Desde', type: 'date', required: true },
          { name: 'to', label: 'Hasta', type: 'date', required: true },
        ] },
      ],
    },
    {
      name: 'priority',
      label: 'Prioridad',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Si dos temporadas se superponen, gana la de mayor prioridad.' },
    },
  ],
}

export const Galleries: CollectionConfig = {
  slug: 'galleries',
  labels: { singular: 'Galería', plural: 'Galerías' },
  admin: { group: 'Medios', useAsTitle: 'name' },
  access: { read: anyone, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdmin },
  hooks: { afterChange: [revalidateCollection('galleries')] },
  fields: [
    { name: 'name', label: 'Nombre', type: 'text', required: true, localized: true },
    slugField('name'),
    { name: 'images', label: 'Imágenes', type: 'upload', relationTo: 'media', hasMany: true, required: true },
    { name: 'cover', label: 'Portada', type: 'upload', relationTo: 'media' },
  ],
}

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'Pregunta frecuente', plural: 'Preguntas frecuentes' },
  admin: { group: 'Contenido', useAsTitle: 'question', defaultColumns: ['question', 'category', 'order'] },
  access: { read: anyone, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdmin },
  hooks: { afterChange: [revalidateCollection('faqs')] },
  fields: [
    { name: 'question', label: 'Pregunta', type: 'text', required: true, localized: true },
    { name: 'answer', label: 'Respuesta', type: 'richText', required: true, localized: true },
    {
      name: 'category',
      label: 'Categoría',
      type: 'select',
      required: true,
      options: [
        { label: 'Reservas y pagos', value: 'reservas' },
        { label: 'Clima y cancelaciones', value: 'clima' },
        { label: 'A bordo', value: 'a-bordo' },
        { label: 'Seguridad', value: 'seguridad' },
        { label: 'Chicos y mascotas', value: 'chicos' },
        { label: 'Accesibilidad', value: 'accesibilidad' },
        { label: 'Cómo llegar', value: 'como-llegar' },
        { label: 'Privados y empresas', value: 'privados' },
      ],
    },
    { name: 'order', label: 'Orden', type: 'number', defaultValue: 0 },
    { name: 'showOnFaqPage', label: 'Mostrar en Preguntas frecuentes', type: 'checkbox', defaultValue: true },
  ],
}

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimonio', plural: 'Testimonios' },
  admin: { group: 'Contenido', useAsTitle: 'author', defaultColumns: ['author', 'origin', 'rating', 'publishConsent'] },
  access: {
    read: ({ req }) => (req.user ? true : { publishConsent: { equals: true } }),
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: { afterChange: [revalidateCollection('testimonials')] },
  fields: [
    { name: 'author', label: 'Autor', type: 'text', required: true },
    {
      name: 'origin',
      label: 'Origen',
      type: 'select',
      required: true,
      options: ['google', 'tripadvisor', 'instagram', 'directo'],
    },
    { name: 'date', label: 'Fecha', type: 'date' },
    { name: 'text', label: 'Texto', type: 'textarea', required: true, localized: true },
    { name: 'rating', label: 'Puntaje', type: 'number', min: 1, max: 5 },
    { name: 'experience', label: 'Experiencia', type: 'relationship', relationTo: 'experiences' },
    { name: 'sourceUrl', label: 'Enlace a la fuente', type: 'text' },
    {
      name: 'publishConsent',
      label: 'Tenemos permiso para publicarlo',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
  ],
}
