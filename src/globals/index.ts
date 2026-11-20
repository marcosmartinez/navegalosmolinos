import type { GlobalConfig } from 'payload'
import { anyone, isAdmin, isAdminOrEditor } from '@/access'
import { ctaField } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidate'

const navItems = (name: string, label: string) => ({
  name,
  label,
  type: 'array' as const,
  fields: [
    { name: 'label', label: 'Texto', type: 'text' as const, required: true, localized: true },
    { name: 'href', label: 'Destino', type: 'text' as const, required: true },
  ],
})

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Información general',
  admin: { group: 'Configuración' },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateGlobal('settings')] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Marca y legales',
          fields: [
            { name: 'brandName', label: 'Nombre comercial', type: 'text', defaultValue: 'Espíritu del Lago' },
            { name: 'endorsement', label: 'Endoso', type: 'text', defaultValue: 'Una experiencia de SOYM S.A.' },
            { name: 'legalName', label: 'Razón social', type: 'text', defaultValue: 'SOYM S.A.' },
            { name: 'taxId', label: 'CUIT', type: 'text', admin: { description: '[CONFIRMAR]' } },
            { name: 'legalAddress', label: 'Domicilio legal', type: 'text' },
            {
              name: 'credentials',
              label: 'Credenciales (habilitaciones, seguros)',
              type: 'array',
              fields: [{ name: 'text', type: 'text', required: true, localized: true }],
            },
          ],
        },
        {
          label: 'Contacto',
          fields: [
            { name: 'whatsapp', label: 'WhatsApp (formato internacional, solo números)', type: 'text', admin: { description: 'Ej.: 5493510000000. [CONFIRMAR]' } },
            { name: 'phone', label: 'Teléfono', type: 'text' },
            { name: 'email', label: 'Email comercial', type: 'email' },
            { name: 'hours', label: 'Horario de atención', type: 'text', localized: true },
          ],
        },
        {
          label: 'Ubicación',
          fields: [
            { name: 'boardingPointName', label: 'Punto de embarque', type: 'text', defaultValue: 'Club Náutico Calamuchita', admin: { description: '[CONFIRMAR]' } },
            { name: 'address', label: 'Dirección', type: 'text' },
            { name: 'locality', label: 'Localidad', type: 'text', defaultValue: 'Villa Ciudad Parque' },
            { name: 'region', label: 'Provincia', type: 'text', defaultValue: 'Córdoba' },
            { type: 'row', fields: [
              { name: 'lat', label: 'Latitud', type: 'number' },
              { name: 'lng', label: 'Longitud', type: 'number' },
            ] },
            { name: 'mapsUrl', label: 'Link a Google Maps', type: 'text' },
            { name: 'directions', label: 'Indicaciones', type: 'textarea', localized: true },
          ],
        },
        {
          label: 'Comercial',
          fields: [
            { name: 'paymentMethods', label: 'Medios de pago', type: 'text', localized: true },
            { name: 'depositPolicy', label: 'Política de seña (texto corto)', type: 'text', localized: true },
          ],
        },
        {
          label: 'Redes',
          fields: ['instagram', 'facebook', 'tiktok', 'youtube', 'tripadvisor', 'googleBusiness'].map((name) => ({
            name,
            type: 'text' as const,
          })),
        },
        {
          label: 'SEO',
          fields: [
            { name: 'defaultTitle', label: 'Título por defecto', type: 'text', localized: true, defaultValue: 'Navegá el Lago Los Molinos · Espíritu del Lago' },
            { name: 'titleTemplate', label: 'Plantilla de títulos', type: 'text', defaultValue: '%s · Espíritu del Lago' },
            { name: 'defaultDescription', label: 'Descripción por defecto', type: 'textarea', localized: true, maxLength: 160 },
            { name: 'defaultOgImage', label: 'Imagen para compartir', type: 'upload', relationTo: 'media' },
            { name: 'searchConsoleVerification', label: 'Verificación de Search Console', type: 'text' },
          ],
        },
      ],
    },
  ],
}

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navegación',
  admin: { group: 'Configuración' },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateGlobal('navigation')] },
  fields: [navItems('main', 'Menú principal'), navItems('footer', 'Footer'), ctaField('headerCta', 'CTA del header')],
}

export const Announcement: GlobalConfig = {
  slug: 'announcement',
  label: 'Aviso operativo',
  admin: { group: 'Configuración', description: 'Ej.: "Hoy no hay salidas por viento. Te escribimos para reprogramar."' },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateGlobal('announcement')] },
  fields: [
    { name: 'enabled', label: 'Activo', type: 'checkbox' },
    { name: 'text', label: 'Texto', type: 'text', localized: true },
    { name: 'href', label: 'Enlace (opcional)', type: 'text' },
    { name: 'expiresAt', label: 'Vence', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
  ],
}

export const Integrations: GlobalConfig = {
  slug: 'integrations',
  label: 'Integraciones',
  admin: { group: 'Configuración', description: 'Solo administradores. Las claves secretas van en variables de entorno, nunca acá.' },
  // El frontend lee este global con la Local API del servidor; por REST solo lo ve el panel.
  access: { read: isAdminOrEditor, update: isAdmin },
  hooks: { afterChange: [revalidateGlobal('settings')] },
  fields: [
    {
      name: 'siteMode',
      label: 'Modo del sitio',
      type: 'select',
      required: true,
      defaultValue: 'preapertura',
      options: [
        { label: 'Preapertura (lista de espera)', value: 'preapertura' },
        { label: 'Consultas (WhatsApp / formularios)', value: 'consultas' },
        { label: 'Reservas online', value: 'reservas' },
      ],
    },
    {
      name: 'bookingProvider',
      label: 'Proveedor de reservas',
      type: 'select',
      defaultValue: 'none',
      options: ['none', 'turitop', 'bokun', 'fareharbor', 'other'],
    },
    {
      name: 'notifications',
      label: 'Destinatarios de notificaciones',
      type: 'array',
      fields: [
        { name: 'email', type: 'email', required: true },
        { name: 'types', label: 'Tipos de consulta', type: 'select', hasMany: true, options: ['experience', 'corporate', 'general', 'waitlist', 'gift'] },
      ],
    },
  ],
}

export const globals = [SiteSettings, Navigation, Announcement, Integrations]
