import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isAdminOrEditor } from '@/access'
import { ctaField } from '@/fields/link'
import { slugField } from '@/fields/slug'
import { revalidateCollection } from '@/hooks/revalidate'

const dateTime = { date: { pickerAppearance: 'dayAndTime' as const } }

const computeStatus = (doc: { enabled?: boolean | null; startsAt?: string | null; endsAt?: string | null }) => {
  if (!doc.enabled) return 'paused'
  const now = Date.now()
  if (doc.startsAt && new Date(doc.startsAt).getTime() > now) return 'scheduled'
  if (doc.endsAt && new Date(doc.endsAt).getTime() <= now) return 'expired'
  return 'live'
}

const validateRange = (value: unknown, { siblingData }: { siblingData: { startsAt?: string } }) => {
  if (value && siblingData.startsAt && new Date(value as string) <= new Date(siblingData.startsAt)) {
    return 'La fecha de fin tiene que ser posterior a la de inicio.'
  }
  return true
}

export const Promotions: CollectionConfig = {
  slug: 'promotions',
  labels: { singular: 'Promoción', plural: 'Promociones' },
  admin: {
    group: 'Comercial',
    useAsTitle: 'internalName',
    defaultColumns: ['internalName', 'code', 'startsAt', 'endsAt', 'status'],
  },
  access: { read: anyone, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdmin },
  hooks: { afterChange: [revalidateCollection('promotions')] },
  fields: [
    { name: 'internalName', label: 'Nombre interno', type: 'text', required: true },
    { name: 'title', label: 'Título público', type: 'text', required: true, localized: true },
    { name: 'body', label: 'Texto', type: 'textarea', localized: true },
    { name: 'image', label: 'Imagen', type: 'upload', relationTo: 'media' },
    { type: 'row', fields: [
      {
        name: 'benefitType',
        label: 'Beneficio',
        type: 'select',
        options: [
          { label: 'Porcentaje', value: 'percent' },
          { label: 'Monto fijo', value: 'amount' },
          { label: '2x1', value: 'two_for_one' },
          { label: 'Otro (texto)', value: 'other' },
        ],
      },
      { name: 'benefitValue', label: 'Valor', type: 'number' },
      { name: 'code', label: 'Código', type: 'text', unique: true, admin: { description: 'Ej.: APERTURA15' } },
    ] },
    { name: 'experiences', label: 'Experiencias alcanzadas (vacío = todas)', type: 'relationship', relationTo: 'experiences', hasMany: true },
    { type: 'row', fields: [
      { name: 'startsAt', label: 'Inicio', type: 'date', required: true, admin: dateTime },
      { name: 'endsAt', label: 'Fin', type: 'date', required: true, admin: dateTime, validate: validateRange as never },
    ] },
    { name: 'enabled', label: 'Activa', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'featuredOnHome', label: 'Destacar en Home', type: 'checkbox', admin: { position: 'sidebar' } },
    { name: 'priority', label: 'Prioridad', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    { name: 'hasLanding', label: 'Tiene landing propia', type: 'checkbox', admin: { position: 'sidebar' } },
    { ...slugField('internalName'), required: false } as never,
    { name: 'terms', label: 'Condiciones', type: 'textarea', localized: true },
    ctaField('cta', 'Botón'),
    {
      name: 'status',
      label: 'Estado',
      type: 'text',
      virtual: true,
      admin: { readOnly: true, position: 'sidebar', description: 'Programada · Vigente · Vencida · Pausada' },
      hooks: { afterRead: [({ siblingData }) => computeStatus(siblingData)] },
    },
  ],
}

export const Banners: CollectionConfig = {
  slug: 'banners',
  labels: { singular: 'Banner', plural: 'Banners' },
  admin: { group: 'Comercial', useAsTitle: 'internalName', defaultColumns: ['internalName', 'placement', 'startsAt', 'endsAt', 'enabled'] },
  access: { read: anyone, create: isAdminOrEditor, update: isAdminOrEditor, delete: isAdmin },
  hooks: { afterChange: [revalidateCollection('banners')] },
  fields: [
    { name: 'internalName', label: 'Nombre interno', type: 'text', required: true },
    {
      name: 'placement',
      label: 'Ubicación',
      type: 'select',
      required: true,
      options: [
        { label: 'Barra superior (todo el sitio)', value: 'top_bar' },
        { label: 'Home, debajo del hero', value: 'home_after_hero' },
        { label: 'Ficha de experiencia', value: 'experience_page' },
        { label: 'Listado de experiencias', value: 'experiences_list' },
      ],
    },
    { name: 'text', label: 'Texto', type: 'text', required: true, localized: true },
    { name: 'image', label: 'Imagen (opcional)', type: 'upload', relationTo: 'media' },
    ctaField('cta', 'Botón'),
    { name: 'promotion', label: 'Promoción relacionada', type: 'relationship', relationTo: 'promotions' },
    {
      name: 'style',
      label: 'Estilo',
      type: 'select',
      defaultValue: 'piedra',
      options: [
        { label: 'Piedra (claro)', value: 'piedra' },
        { label: 'Verde Lago', value: 'verde' },
      ],
    },
    { type: 'row', fields: [
      { name: 'startsAt', label: 'Inicio', type: 'date', admin: dateTime },
      { name: 'endsAt', label: 'Fin', type: 'date', admin: dateTime, validate: validateRange as never },
    ] },
    { name: 'enabled', label: 'Activo', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'priority', label: 'Prioridad', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
