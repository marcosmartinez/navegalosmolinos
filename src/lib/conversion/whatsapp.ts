/**
 * Links de WhatsApp con mensaje precargado y código de referencia.
 * Ver docs/INTEGRATIONS.md §1.1.
 */

/** Canal corto a partir de utm_source. */
export const channelCode = (utmSource?: string | null): string => {
  const s = (utmSource ?? '').toLowerCase()
  if (!s) return 'DI'
  if (s.includes('instagram') || s === 'ig') return 'IG'
  if (s.includes('facebook') || s === 'fb') return 'FB'
  if (s.includes('tiktok')) return 'TT'
  if (s.includes('google') && s.includes('ads')) return 'GA'
  if (s.includes('google')) return 'GO'
  if (s.startsWith('alojamiento')) return 'AL'
  if (s.includes('email')) return 'EM'
  return s.slice(0, 2).toUpperCase()
}

/** EDL-GH-IG */
export const buildRefCode = (experienceRef: string | null | undefined, utmSource?: string | null): string =>
  ['EDL', (experienceRef ?? 'GEN').toUpperCase(), channelCode(utmSource)].join('-')

export const fillTemplate = (template: string, vars: Record<string, string>): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => vars[key] ?? match)

export const DEFAULT_MESSAGE = 'Hola, quiero consultar por {experiencia}. (Ref. {ref})'

/** https://wa.me/<numero>?text=<mensaje> — el número va solo con dígitos, formato internacional. */
export const buildWhatsAppUrl = (phone: string, message: string): string => {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
