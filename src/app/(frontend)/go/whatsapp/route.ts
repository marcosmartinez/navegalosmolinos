import { cookies, headers } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { cms } from '@/lib/cms'
import { buildRefCode, buildWhatsAppUrl, DEFAULT_MESSAGE, fillTemplate } from '@/lib/conversion/whatsapp'

export const dynamic = 'force-dynamic'

/** Cookie first-party con UTM y referrer de la primera visita (30 días). La escribe el middleware (etapa 1C). */
const ATTRIBUTION_COOKIE = 'edl_attr'

type Attribution = { utmSource?: string; utmMedium?: string; utmCampaign?: string; utmContent?: string; utmTerm?: string; referrer?: string; gclid?: string; fbclid?: string }

const deviceFrom = (ua: string): 'mobile' | 'tablet' | 'desktop' =>
  /ipad|tablet/i.test(ua) ? 'tablet' : /mobi|android|iphone/i.test(ua) ? 'mobile' : 'desktop'

/**
 * GET /go/whatsapp?exp=golden-hour&cta=sticky_bar
 * Registra el clic (conversion-events) y redirige a wa.me con el mensaje precargado y el código de referencia.
 * Ver docs/INTEGRATIONS.md §1.1.
 */
export async function GET(req: NextRequest) {
  const expSlug = req.nextUrl.searchParams.get('exp') ?? undefined
  const cta = req.nextUrl.searchParams.get('cta') ?? 'unknown'
  const fallback = new URL('/#lista-de-espera', req.nextUrl.origin)

  let attribution: Attribution = {}
  try {
    const raw = (await cookies()).get(ATTRIBUTION_COOKIE)?.value
    if (raw) attribution = JSON.parse(raw) as Attribution
  } catch {
    attribution = {}
  }
  const utmSource = req.nextUrl.searchParams.get('utm_source') ?? attribution.utmSource

  try {
    const payload = await cms()
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
    if (!settings.whatsapp) return NextResponse.redirect(fallback, 302)

    const experience = expSlug
      ? (await payload.find({ collection: 'experiences', where: { slug: { equals: expSlug } }, depth: 0, limit: 1 })).docs[0]
      : undefined

    const ref = buildRefCode(experience?.refCode, utmSource)
    const message = fillTemplate(experience?.whatsappMessage ?? DEFAULT_MESSAGE, {
      experiencia: experience?.title ?? 'una salida',
      ref,
    })

    const ua = (await headers()).get('user-agent') ?? ''
    // Registro sin bloquear la redirección si falla.
    await payload
      .create({
        collection: 'conversion-events',
        overrideAccess: true,
        data: {
          type: 'whatsapp_click',
          experience: experience?.id,
          source: {
            pagePath: req.headers.get('referer') ?? undefined,
            ctaLocation: cta,
            refCode: ref,
            referrer: attribution.referrer,
            utmSource,
            utmMedium: attribution.utmMedium,
            utmCampaign: attribution.utmCampaign,
            utmContent: attribution.utmContent,
            utmTerm: attribution.utmTerm,
            gclid: attribution.gclid,
            fbclid: attribution.fbclid,
            device: deviceFrom(ua),
          },
        },
      })
      .catch(() => undefined)

    return NextResponse.redirect(buildWhatsAppUrl(settings.whatsapp, message), 302)
  } catch {
    return NextResponse.redirect(fallback, 302)
  }
}
