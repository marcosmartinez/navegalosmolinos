import { APIError, type CollectionConfig, ValidationError } from 'payload'
import { adminFieldOnly, isAdmin, isAdminOrEditor } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidateCollection } from '@/hooks/revalidate'

const DAYS = [
  { label: 'Lunes', value: 'mon' },
  { label: 'Martes', value: 'tue' },
  { label: 'Miércoles', value: 'wed' },
  { label: 'Jueves', value: 'thu' },
  { label: 'Viernes', value: 'fri' },
  { label: 'Sábado', value: 'sat' },
  { label: 'Domingo', value: 'sun' },
]

/**
 * Ley provincial 11.005, art. 27: la actividad náutica comercial es siempre diurna.
 * Límite conservador para la validación del panel. [CONFIRMAR horario límite con SOYM]
 */
const LATEST_DEPARTURE = '19:30'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  labels: { singular: 'Experiencia', plural: 'Experiencias' },
  admin: {
    group: 'Contenido',
    useAsTitle: 'title',
    defaultColumns: ['title', 'availability', 'timeOfDay', 'durationMinutes', 'updatedAt'],
    description: 'Cada salida que se ofrece en el sitio. Pausar en lugar de borrar.',
  },
  versions: { drafts: { autosave: { interval: 2000 }, schedulePublish: true }, maxPerDoc: 30 },
  access: {
    read: ({ req }) => (req.user ? true : { availability: { in: ['active', 'coming_soon'] }, _status: { equals: 'published' } }),
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        // Una experiencia publicada como "activa" necesita lo mínimo para convertir.
        if (!data || data._status !== 'published' || data.availability !== 'active') return data
        const missing: string[] = []
        if (!data.heroImage) missing.push('imagen principal')
        if (!data.durationMinutes) missing.push('duración')
        if (!Array.isArray(data.departures) || data.departures.length === 0) missing.push('al menos una salida')
        const hasPrice = Array.isArray(data.priceOptions) && data.priceOptions.length > 0
        if (!hasPrice && !data.priceFallbackText) missing.push('precio o texto alternativo de precio')
        if (missing.length && operation) {
          throw new ValidationError({
            collection: 'experiences',
            errors: [{ path: 'availability', message: `Para publicar una experiencia activa falta: ${missing.join(', ')}.` }],
          })
        }
        return data
      },
    ],
    beforeDelete: [
      async ({ req, id }) => {
        const { totalDocs } = await req.payload.count({ collection: 'inquiries', where: { experience: { equals: id } }, req })
        if (totalDocs > 0) throw new APIError('Esta experiencia tiene consultas asociadas. Archivala en lugar de borrarla.', 400, undefined, true)
      },
    ],
    afterChange: [revalidateCollection('experiences')],
  },
  fields: [
    { name: 'title', label: 'Nombre', type: 'text', required: true, localized: true },
    slugField('title'),
    {
      // No se llama `status` para no chocar con `_status` (borradores de Payload).
      name: 'availability',
      label: 'Estado',
      type: 'select',
      required: true,
      defaultValue: 'active',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Activa', value: 'active' },
        { label: 'Próximamente', value: 'coming_soon' },
        { label: 'Pausada', value: 'paused' },
        { label: 'Archivada', value: 'archived' },
      ],
    },
    { name: 'featured', label: 'Destacada en Home', type: 'checkbox', admin: { position: 'sidebar' } },
    { name: 'order', label: 'Orden', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            { name: 'categories', label: 'Categorías', type: 'relationship', relationTo: 'categories', hasMany: true },
            {
              name: 'occasions',
              label: 'Ideal para (ocasiones)',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'Pareja', value: 'pareja' },
                { label: 'Amigos', value: 'amigos' },
                { label: 'Familia', value: 'familia' },
                { label: 'Grupos', value: 'grupos' },
                { label: 'Empresas', value: 'empresas' },
              ],
            },
            {
              name: 'timeOfDay',
              label: 'Momento del día',
              type: 'select',
              required: true,
              admin: { description: 'Solo horarios diurnos: la navegación comercial nocturna no está permitida (Ley 11.005).' },
              options: [
                { label: 'Mañana', value: 'manana' },
                { label: 'Mediodía', value: 'mediodia' },
                { label: 'Tarde', value: 'tarde' },
              ],
            },
          ],
        },
        {
          label: 'Contenido',
          fields: [
            { name: 'tagline', label: 'Bajada', type: 'text', localized: true, admin: { description: 'Una línea sensorial. Ej.: "El sol bajando atrás de las sierras y el motor apagado."' } },
            { name: 'description', label: 'Descripción', type: 'richText', localized: true },
            {
              name: 'itinerary',
              label: 'Cómo es la salida',
              type: 'array',
              fields: [
                { name: 'time', label: 'Momento', type: 'text', admin: { description: 'Ej.: "Min 0", "Min 30".' } },
                { name: 'title', label: 'Título', type: 'text', required: true, localized: true },
                { name: 'text', label: 'Texto', type: 'textarea', localized: true },
              ],
            },
            { name: 'included', label: 'Qué incluye', type: 'array', fields: [{ name: 'item', type: 'text', required: true, localized: true }] },
            {
              name: 'extras',
              label: 'Extras opcionales',
              type: 'array',
              fields: [
                { name: 'name', label: 'Nombre', type: 'text', required: true, localized: true },
                { name: 'price', label: 'Precio (ARS)', type: 'number', min: 0 },
                { name: 'note', label: 'Nota', type: 'text', localized: true },
              ],
            },
            { name: 'importantInfo', label: 'Información importante', type: 'richText', localized: true },
          ],
        },
        {
          label: 'Medios',
          fields: [
            { name: 'heroImage', label: 'Imagen principal (horizontal)', type: 'upload', relationTo: 'media' },
            { name: 'heroImageMobile', label: 'Imagen principal (vertical, mobile)', type: 'upload', relationTo: 'media' },
            { name: 'heroVideo', label: 'Video corto en loop (opcional)', type: 'upload', relationTo: 'media' },
            { name: 'gallery', label: 'Galería', type: 'relationship', relationTo: 'galleries' },
          ],
        },
        {
          label: 'Operación',
          fields: [
            { name: 'durationMinutes', label: 'Duración (minutos)', type: 'number', min: 15 },
            { name: 'boardingPoint', label: 'Punto de embarque', type: 'text', localized: true, admin: { description: 'Vacío = el de Información general.' } },
            { type: 'row', fields: [
              { name: 'capacity', label: 'Lugares por salida', type: 'number', min: 1 },
              { name: 'minGuests', label: 'Mínimo de personas', type: 'number', min: 1 },
              { name: 'minAge', label: 'Edad mínima', type: 'number', min: 0 },
            ] },
            { name: 'accessibility', label: 'Accesibilidad', type: 'richText', localized: true },
          ],
        },
        {
          label: 'Horarios',
          fields: [
            {
              name: 'departures',
              label: 'Salidas',
              type: 'array',
              fields: [
                { name: 'daysOfWeek', label: 'Días', type: 'select', hasMany: true, required: true, options: DAYS },
                {
                  name: 'time',
                  label: 'Hora (HH:mm)',
                  type: 'text',
                  required: true,
                  validate: (value: unknown) => {
                    if (typeof value !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return 'Usá el formato HH:mm, por ejemplo 17:30.'
                    if (value > LATEST_DEPARTURE) return `La operación comercial es solo diurna. Revisá la hora (límite configurado: ${LATEST_DEPARTURE}).`
                    return true
                  },
                },
                { name: 'season', label: 'Temporada', type: 'relationship', relationTo: 'seasons' },
                { name: 'note', label: 'Nota', type: 'text', localized: true },
                { name: 'externalSlotId', label: 'ID en el motor de reservas', type: 'text', access: { update: adminFieldOnly } },
              ],
            },
            {
              name: 'availabilityNote',
              label: 'Aviso de disponibilidad',
              type: 'group',
              admin: { description: 'Escasez real, nunca inventada. Ej.: "Para el sábado quedan 8 lugares".' },
              fields: [
                { name: 'text', label: 'Texto', type: 'text', localized: true },
                { name: 'expiresAt', label: 'Vence', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
              ],
            },
          ],
        },
        {
          label: 'Precios',
          fields: [
            {
              name: 'priceOptions',
              label: 'Tarifas',
              type: 'array',
              fields: [
                {
                  name: 'passengerType',
                  label: 'Tipo de pasajero',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Adulto', value: 'adulto' },
                    { label: 'Menor', value: 'menor' },
                    { label: 'Jubilado', value: 'jubilado' },
                    { label: 'Residente', value: 'residente' },
                    { label: 'Grupo', value: 'grupo' },
                  ],
                },
                { name: 'label', label: 'Etiqueta', type: 'text', localized: true },
                { name: 'season', label: 'Temporada', type: 'relationship', relationTo: 'seasons' },
                { name: 'amount', label: 'Monto (ARS, IVA incluido)', type: 'number', required: true, min: 0 },
                { name: 'isFromPrice', label: 'Usar como precio "desde"', type: 'checkbox' },
                { name: 'externalRateId', label: 'ID en el motor de reservas', type: 'text', access: { update: adminFieldOnly } },
              ],
            },
            { name: 'priceFallbackText', label: 'Texto si no hay precio publicado', type: 'text', localized: true, defaultValue: 'Consultá el precio' },
            { name: 'priceValidUntil', label: 'Precios vigentes hasta', type: 'date' },
          ],
        },
        {
          label: 'Conversión',
          fields: [
            {
              name: 'whatsappMessage',
              label: 'Mensaje precargado de WhatsApp',
              type: 'textarea',
              localized: true,
              defaultValue: 'Hola, quiero consultar por {experiencia}. Somos __ personas para el día __. (Ref. {ref})',
              admin: { description: 'Variables disponibles: {experiencia}, {ref}.' },
            },
            { name: 'refCode', label: 'Código de referencia', type: 'text', maxLength: 6, admin: { description: 'Ej.: GH → EDL-GH-IG.' } },
            { name: 'ctaLabel', label: 'Texto del CTA (opcional)', type: 'text', localized: true },
            {
              name: 'booking',
              label: 'Reserva online',
              type: 'group',
              access: { update: adminFieldOnly },
              admin: { description: 'Solo administradores. Ver docs/INTEGRATIONS.md §3.' },
              fields: [
                {
                  name: 'mode',
                  label: 'Modo',
                  type: 'select',
                  defaultValue: 'inherit',
                  options: [
                    { label: 'Heredar el modo global', value: 'inherit' },
                    { label: 'Consulta (WhatsApp / formulario)', value: 'contact' },
                    { label: 'Link externo', value: 'external_link' },
                    { label: 'Widget embebido', value: 'widget' },
                  ],
                },
                {
                  name: 'provider',
                  label: 'Proveedor',
                  type: 'select',
                  defaultValue: 'none',
                  options: ['none', 'turitop', 'bokun', 'fareharbor', 'other'],
                },
                { name: 'externalProductId', label: 'ID de producto', type: 'text' },
                { name: 'externalUrl', label: 'URL externa', type: 'text' },
                { name: 'widgetConfig', label: 'Parámetros del widget (JSON, sin scripts)', type: 'json' },
              ],
            },
          ],
        },
        {
          label: 'FAQ',
          fields: [{ name: 'faqs', label: 'Preguntas relacionadas', type: 'relationship', relationTo: 'faqs', hasMany: true }],
        },
      ],
    },
  ],
}
