import type { Block, Field } from 'payload'
import { ctaField } from '@/fields/link'

/**
 * Bloques del constructor de páginas. Cada bloque tiene un componente en
 * src/components/sections con el mismo `slug`. No hay campos de color,
 * tipografía ni tamaño libres: las variantes son las del brandbook.
 */

const label: Field = { name: 'label', label: 'Label (mayúsculas)', type: 'text', localized: true }
const title = { name: 'title', label: 'Título', type: 'text', localized: true } as const satisfies Field
const background: Field = {
  name: 'background',
  label: 'Fondo',
  type: 'select',
  defaultValue: 'claro',
  options: [
    { label: 'Claro', value: 'claro' },
    { label: 'Piedra', value: 'piedra' },
    { label: 'Verde Lago', value: 'verde' },
  ],
}

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heros' },
  fields: [
    {
      name: 'variant',
      label: 'Variante',
      type: 'select',
      defaultValue: 'image',
      options: [
        { label: 'Video', value: 'video' },
        { label: 'Imagen', value: 'image' },
        { label: 'Imagen + bloque', value: 'split' },
        { label: 'Sólido (Verde Lago)', value: 'solid' },
      ],
    },
    label,
    { ...title, required: true },
    { name: 'subtitle', label: 'Bajada', type: 'textarea', localized: true },
    { name: 'image', label: 'Imagen (horizontal)', type: 'upload', relationTo: 'media' },
    { name: 'imageMobile', label: 'Imagen (vertical, mobile)', type: 'upload', relationTo: 'media' },
    { name: 'video', label: 'Video', type: 'upload', relationTo: 'media' },
    ctaField('primaryCta', 'CTA principal'),
    ctaField('secondaryCta', 'CTA secundario'),
  ],
}

export const EditorialBlock: Block = {
  slug: 'editorial',
  labels: { singular: 'Texto editorial', plural: 'Textos editoriales' },
  fields: [label, title, { name: 'body', label: 'Texto', type: 'richText', localized: true }, background],
}

export const QuoteBlock: Block = {
  slug: 'quote',
  labels: { singular: 'Cita / insight', plural: 'Citas' },
  fields: [
    { name: 'quote', label: 'Cita', type: 'textarea', required: true, localized: true },
    { name: 'author', label: 'Autor', type: 'text' },
    background,
  ],
}

export const ExperienceGridBlock: Block = {
  slug: 'experienceGrid',
  labels: { singular: 'Grilla de experiencias', plural: 'Grillas de experiencias' },
  fields: [
    label,
    title,
    {
      name: 'source',
      label: 'Qué mostrar',
      type: 'select',
      defaultValue: 'featured',
      options: [
        { label: 'Destacadas', value: 'featured' },
        { label: 'Todas las activas', value: 'all' },
        { label: 'Selección manual', value: 'manual' },
      ],
    },
    {
      name: 'experiences',
      label: 'Experiencias',
      type: 'relationship',
      relationTo: 'experiences',
      hasMany: true,
      admin: { condition: (_, s) => s?.source === 'manual' },
    },
    { name: 'columns', label: 'Columnas', type: 'select', defaultValue: '3', options: ['3', '4'] },
  ],
}

export const TimelineBlock: Block = {
  slug: 'timeline',
  labels: { singular: 'Línea de tiempo', plural: 'Líneas de tiempo' },
  fields: [
    label,
    title,
    {
      name: 'steps',
      label: 'Pasos',
      type: 'array',
      minRows: 2,
      maxRows: 7,
      fields: [
        { name: 'time', label: 'Momento', type: 'text' },
        { name: 'title', label: 'Título', type: 'text', required: true, localized: true },
        { name: 'text', label: 'Texto', type: 'textarea', localized: true },
      ],
    },
  ],
}

export const FactsBlock: Block = {
  slug: 'facts',
  labels: { singular: 'Pilares / datos', plural: 'Pilares / datos' },
  fields: [
    label,
    title,
    {
      name: 'items',
      label: 'Ítems',
      type: 'array',
      minRows: 3,
      maxRows: 4,
      fields: [
        {
          name: 'icon',
          label: 'Ícono',
          type: 'select',
          options: ['sol', 'ola', 'copa', 'ancla', 'reloj', 'pin', 'grupo', 'estrella', 'barco', 'brujula', 'calendario'],
        },
        { name: 'title', label: 'Título', type: 'text', required: true, localized: true },
        { name: 'text', label: 'Texto', type: 'textarea', localized: true },
      ],
    },
    background,
  ],
}

export const BoatBlock: Block = {
  slug: 'boat',
  labels: { singular: 'Ficha del barco', plural: 'Fichas del barco' },
  fields: [
    label,
    title,
    { name: 'text', label: 'Texto', type: 'textarea', localized: true },
    { name: 'image', label: 'Foto', type: 'upload', relationTo: 'media' },
    {
      name: 'specs',
      label: 'Datos',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'value', label: 'Valor', type: 'text', required: true },
        { name: 'label', label: 'Descripción', type: 'text', required: true, localized: true },
      ],
    },
  ],
}

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: { singular: 'Galería', plural: 'Galerías' },
  fields: [
    title,
    { name: 'gallery', label: 'Galería', type: 'relationship', relationTo: 'galleries', required: true },
    { name: 'layout', label: 'Formato', type: 'select', defaultValue: 'grid', options: ['grid', 'carousel'] },
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonios', plural: 'Testimonios' },
  fields: [title, { name: 'items', label: 'Testimonios', type: 'relationship', relationTo: 'testimonials', hasMany: true }],
}

export const FaqBlock: Block = {
  slug: 'faq',
  labels: { singular: 'Preguntas frecuentes', plural: 'Preguntas frecuentes' },
  fields: [title, { name: 'items', label: 'Preguntas', type: 'relationship', relationTo: 'faqs', hasMany: true }],
}

export const PromoBlock: Block = {
  slug: 'promo',
  labels: { singular: 'Banner de promoción', plural: 'Banners de promoción' },
  fields: [{ name: 'promotion', label: 'Promoción', type: 'relationship', relationTo: 'promotions', required: true }],
}

export const FormBlock: Block = {
  slug: 'form',
  labels: { singular: 'Formulario', plural: 'Formularios' },
  fields: [
    title,
    {
      name: 'formType',
      label: 'Tipo',
      type: 'select',
      required: true,
      options: [
        { label: 'Consulta de experiencia', value: 'experience' },
        { label: 'Privados y empresas', value: 'corporate' },
        { label: 'General', value: 'general' },
        { label: 'Lista de espera', value: 'waitlist' },
      ],
    },
  ],
}

export const LocationBlock: Block = {
  slug: 'location',
  labels: { singular: 'Ubicación', plural: 'Ubicaciones' },
  fields: [label, title, { name: 'text', label: 'Texto', type: 'textarea', localized: true }],
}

export const ClosingBlock: Block = {
  slug: 'closing',
  labels: { singular: 'Cierre con CTA', plural: 'Cierres' },
  fields: [{ ...title, required: true }, { name: 'image', label: 'Foto', type: 'upload', relationTo: 'media' }, ctaField('cta', 'CTA')],
}

export const pageBlocks: Block[] = [
  HeroBlock,
  EditorialBlock,
  QuoteBlock,
  ExperienceGridBlock,
  TimelineBlock,
  FactsBlock,
  BoatBlock,
  GalleryBlock,
  TestimonialsBlock,
  FaqBlock,
  PromoBlock,
  FormBlock,
  LocationBlock,
  ClosingBlock,
]
