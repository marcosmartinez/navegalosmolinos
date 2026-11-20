'use server'

import { createHash } from 'node:crypto'
import { headers } from 'next/headers'
import { z } from 'zod'
import { cms } from '@/lib/cms'

export type WaitlistState = { status: 'idle' | 'ok' | 'error'; message?: string; name?: string }

const schema = z.object({
  name: z.string().trim().min(2, 'Contanos tu nombre.').max(80),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, '').length >= 10, 'Revisá el número de WhatsApp: le faltan dígitos.'),
  email: z.union([z.literal(''), z.string().trim().email('Revisá el email.')]),
  interest: z.string().max(60).optional(),
  consent: z.literal('on', { message: 'Necesitamos tu OK para escribirte.' }),
  // Honeypot: los humanos no lo ven ni lo completan.
  company_website: z.string().max(0).optional(),
})

const PRIVACY_VERSION = '2026-11-borrador'

/** Alta en la lista de espera (docs/INTEGRATIONS.md §1.2). Antispam con Turnstile: etapa 1B. */
export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { status: 'error', message: parsed.error.issues[0]?.message ?? 'Revisá los datos.' }
  }
  const { name, phone, email, interest } = parsed.data

  try {
    const h = await headers()
    const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? ''
    const ua = h.get('user-agent') ?? ''
    const payload = await cms()
    await payload.create({
      collection: 'inquiries',
      overrideAccess: true,
      data: {
        type: 'waitlist',
        status: 'new',
        name,
        phone,
        email: email || undefined,
        interest,
        consentMarketing: true,
        privacyVersion: PRIVACY_VERSION,
        ipHash: ip ? createHash('sha256').update(ip + (process.env.PAYLOAD_SECRET ?? '')).digest('hex').slice(0, 32) : undefined,
        source: {
          pagePath: '/',
          ctaLocation: 'landing_waitlist',
          referrer: h.get('referer') ?? undefined,
          device: (/mobi|android|iphone/i.test(ua) ? 'mobile' : 'desktop') as 'mobile' | 'desktop',
        },
      },
    })
    return { status: 'ok', name: name.split(' ')[0] }
  } catch {
    return { status: 'error', message: 'No pudimos guardar tus datos. Probá de nuevo en un rato o escribinos por WhatsApp.' }
  }
}
