import { describe, expect, it } from 'vitest'
import { normalizeArPhone } from '../../src/collections/Leads'
import { slugify } from '../../src/fields/slug'
import { effectiveMode } from '../../src/lib/booking/types'
import { buildRefCode, buildWhatsAppUrl, channelCode, fillTemplate } from '../../src/lib/conversion/whatsapp'

describe('whatsapp', () => {
  it('arma el código de referencia por experiencia y canal', () => {
    expect(buildRefCode('gh', 'instagram')).toBe('EDL-GH-IG')
    expect(buildRefCode(undefined, undefined)).toBe('EDL-GEN-DI')
    expect(channelCode('alojamiento-hotel-x')).toBe('AL')
  })

  it('completa la plantilla y codifica el mensaje', () => {
    const msg = fillTemplate('Hola, quiero consultar por {experiencia}. (Ref. {ref})', { experiencia: 'Golden Hour', ref: 'EDL-GH-IG' })
    expect(msg).toBe('Hola, quiero consultar por Golden Hour. (Ref. EDL-GH-IG)')
    expect(buildWhatsAppUrl('+54 9 351 000-0000', msg)).toMatch(/^https:\/\/wa\.me\/5493510000000\?text=Hola%2C/)
  })
})

describe('datos', () => {
  it('genera slugs sin tildes ni ñ', () => {
    expect(slugify('Brunch en el lago')).toBe('brunch-en-el-lago')
    expect(slugify('Planificá tu visita')).toBe('planifica-tu-visita')
    expect(slugify('Año Nuevo')).toBe('ano-nuevo')
  })

  it('normaliza teléfonos argentinos a E.164', () => {
    expect(normalizeArPhone('351 000 0000')).toBe('+5493510000000')
    expect(normalizeArPhone('+54 9 351 000 0000')).toBe('+5493510000000')
  })
})

describe('modo de reserva', () => {
  it('la preapertura manda sobre cualquier experiencia', () => {
    expect(effectiveMode('preapertura', 'widget')).toBe('waitlist')
  })
  it('la experiencia puede sobrescribir el modo global', () => {
    expect(effectiveMode('consultas', 'external_link')).toBe('external_link')
    expect(effectiveMode('consultas', 'inherit')).toBe('contact')
  })
})
