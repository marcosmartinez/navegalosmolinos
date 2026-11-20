/**
 * Contrato de los proveedores de reserva. En el MVP solo existe el adaptador `contact`
 * (WhatsApp / formulario). Ver docs/INTEGRATIONS.md §3.
 */

export type SiteMode = 'preapertura' | 'consultas' | 'reservas'
export type BookingMode = 'inherit' | 'contact' | 'external_link' | 'widget'
export type ProviderId = 'contact' | 'turitop' | 'bokun' | 'fareharbor' | 'custom'

export interface TrackingContext {
  pagePath: string
  ctaLocation: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

export interface BookableExperience {
  id: string | number
  slug: string
  title: string
  refCode?: string | null
  booking?: {
    mode?: BookingMode | null
    externalProductId?: string | null
    externalUrl?: string | null
  } | null
}

export interface Slot {
  startsAt: string
  capacity: number
  available: number
  externalSlotId: string
}

export interface BookingEvent {
  externalId: string
  experienceExternalId: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded'
  amount: number
  currency: 'ARS'
  raw: unknown
}

export interface BookingProvider {
  id: ProviderId
  getCtaHref(experience: BookableExperience, ctx: TrackingContext): string
  getWidgetProps?(experience: BookableExperience): Record<string, unknown>
  getAvailability?(externalProductId: string, from: Date, to: Date): Promise<Slot[]>
  verifyWebhook?(req: Request): Promise<BookingEvent | null>
}

/** Modo efectivo: preapertura manda sobre todo; después, el modo de la experiencia o el global. */
export const effectiveMode = (siteMode: SiteMode, experienceMode?: BookingMode | null): 'waitlist' | Exclude<BookingMode, 'inherit'> => {
  if (siteMode === 'preapertura') return 'waitlist'
  if (experienceMode && experienceMode !== 'inherit') return experienceMode
  return siteMode === 'reservas' ? 'external_link' : 'contact'
}
