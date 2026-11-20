import type { BookingProvider } from './types'

/** Adaptador del MVP: el "reservar" es una consulta por WhatsApp medida vía /go/whatsapp. */
export const contactProvider: BookingProvider = {
  id: 'contact',
  getCtaHref(experience, ctx) {
    const params = new URLSearchParams({ exp: experience.slug, cta: ctx.ctaLocation })
    return `/go/whatsapp?${params.toString()}`
  },
}
