import type { Field } from 'payload'

/** CTA reutilizable: texto + destino. Los destinos internos empiezan con "/". */
export const ctaField = (name = 'cta', label = 'Botón'): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      name: 'label',
      label: 'Texto',
      type: 'text',
      localized: true,
      admin: { description: 'Infinitivo o voseo, sin signos de admiración. Ej.: "Reservá por WhatsApp".' },
    },
    {
      name: 'href',
      label: 'Destino',
      type: 'text',
      admin: { description: 'Ruta interna (/experiencias) o URL completa. Para WhatsApp usar /go/whatsapp.' },
    },
  ],
})

/** Origen de una consulta o clic. Solo lectura en el panel. */
export const sourceField: Field = {
  name: 'source',
  label: 'Origen',
  type: 'group',
  admin: { readOnly: true },
  fields: [
    { name: 'pagePath', label: 'Página', type: 'text' },
    { name: 'ctaLocation', label: 'Ubicación del CTA', type: 'text' },
    { name: 'refCode', label: 'Código de referencia', type: 'text' },
    { name: 'referrer', type: 'text' },
    { name: 'utmSource', type: 'text' },
    { name: 'utmMedium', type: 'text' },
    { name: 'utmCampaign', type: 'text' },
    { name: 'utmContent', type: 'text' },
    { name: 'utmTerm', type: 'text' },
    { name: 'gclid', type: 'text' },
    { name: 'fbclid', type: 'text' },
    { name: 'device', label: 'Dispositivo', type: 'select', options: ['mobile', 'tablet', 'desktop'] },
  ],
}
