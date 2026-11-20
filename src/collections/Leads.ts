import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from '@/access'
import { sourceField } from '@/fields/link'

/** Normaliza teléfonos argentinos a E.164 (+54...). Conservador: si no reconoce el formato, lo deja como vino. */
export const normalizeArPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, '')
  if (digits.startsWith('54')) return `+${digits}`
  if (digits.startsWith('0')) return `+54${digits.slice(1)}`
  if (digits.length === 10) return `+549${digits}`
  return raw.trim()
}

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: 'Consulta', plural: 'Consultas' },
  admin: {
    group: 'Consultas',
    useAsTitle: 'name',
    defaultColumns: ['createdAt', 'type', 'name', 'phone', 'experience', 'guests', 'status'],
    listSearchableFields: ['name', 'phone', 'email'],
    description: 'Se crean desde los formularios del sitio. Filtrá, gestioná y exportá desde acá.',
  },
  access: {
    // La creación pública pasa solo por la Server Action (Local API con overrideAccess), nunca por REST.
    create: isAdmin,
    read: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.phone && typeof data.phone === 'string') data.phone = normalizeArPhone(data.phone)
        return data
      },
    ],
  },
  fields: [
    {
      name: 'type',
      label: 'Tipo',
      type: 'select',
      required: true,
      options: [
        { label: 'Experiencia', value: 'experience' },
        { label: 'Privado / empresa', value: 'corporate' },
        { label: 'General', value: 'general' },
        { label: 'Lista de espera', value: 'waitlist' },
        { label: 'Regalo', value: 'gift' },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Consulta',
          fields: [
            { type: 'row', fields: [
              { name: 'name', label: 'Nombre', type: 'text', required: true },
              { name: 'phone', label: 'WhatsApp / teléfono', type: 'text' },
              { name: 'email', label: 'Email', type: 'email' },
            ] },
            { name: 'experience', label: 'Experiencia', type: 'relationship', relationTo: 'experiences' },
            { type: 'row', fields: [
              { name: 'requestedDate', label: 'Fecha deseada', type: 'date' },
              { name: 'guests', label: 'Personas', type: 'number', min: 1 },
              {
                name: 'occasion',
                label: 'Ocasión',
                type: 'select',
                options: ['cumpleanos', 'aniversario', 'propuesta', 'amigos', 'familia', 'empresa', 'otra'],
              },
            ] },
            { type: 'row', fields: [
              { name: 'eventType', label: 'Tipo de evento', type: 'text' },
              { name: 'company', label: 'Empresa', type: 'text' },
              { name: 'taxId', label: 'CUIT', type: 'text' },
              { name: 'budget', label: 'Presupuesto estimado (ARS)', type: 'number' },
            ] },
            { name: 'interest', label: 'Interés (lista de espera)', type: 'text' },
            { name: 'message', label: 'Mensaje', type: 'textarea' },
            { name: 'promotion', label: 'Promoción / código', type: 'relationship', relationTo: 'promotions' },
          ],
        },
        {
          label: 'Gestión',
          fields: [
            {
              name: 'status',
              label: 'Estado',
              type: 'select',
              required: true,
              defaultValue: 'new',
              options: [
                { label: 'Nueva', value: 'new' },
                { label: 'En curso', value: 'in_progress' },
                { label: 'Propuesta enviada', value: 'proposal_sent' },
                { label: 'Confirmada', value: 'confirmed' },
                { label: 'Perdida', value: 'lost' },
                { label: 'Spam', value: 'spam' },
              ],
            },
            { name: 'assignee', label: 'Responsable', type: 'relationship', relationTo: 'users' },
            { name: 'estimatedValue', label: 'Valor estimado (ARS)', type: 'number' },
            { name: 'internalNotes', label: 'Notas internas', type: 'textarea' },
          ],
        },
        { label: 'Origen', fields: [sourceField] },
        {
          label: 'Privacidad',
          fields: [
            { name: 'consentMarketing', label: 'Acepta comunicaciones', type: 'checkbox', admin: { readOnly: true } },
            { name: 'privacyVersion', label: 'Versión de la política aceptada', type: 'text', admin: { readOnly: true } },
            { name: 'ipHash', label: 'IP (hash)', type: 'text', admin: { readOnly: true }, access: { read: ({ req }) => req.user?.role === 'admin' } },
          ],
        },
      ],
    },
  ],
}

export const ConversionEvents: CollectionConfig = {
  slug: 'conversion-events',
  labels: { singular: 'Clic de conversión', plural: 'Clics de conversión' },
  admin: {
    group: 'Consultas',
    defaultColumns: ['createdAt', 'type', 'experience', 'source.ctaLocation', 'source.utmSource'],
    description: 'Registro automático de clics a WhatsApp, teléfono y reserva. Solo lectura.',
  },
  access: { create: isAdmin, read: isAdminOrEditor, update: () => false, delete: isAdmin },
  fields: [
    {
      name: 'type',
      label: 'Tipo',
      type: 'select',
      required: true,
      options: [
        { label: 'WhatsApp', value: 'whatsapp_click' },
        { label: 'Teléfono', value: 'phone_click' },
        { label: 'Reserva', value: 'booking_click' },
      ],
    },
    { name: 'experience', label: 'Experiencia', type: 'relationship', relationTo: 'experiences' },
    sourceField,
  ],
}
