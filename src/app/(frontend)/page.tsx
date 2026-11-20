/**
 * Landing de lanzamiento / presentación de Espíritu del Lago.
 * Contenido en src/content/landing.ts (placeholders marcados). Estructura según docs/SITEMAP.md §4.1,
 * adaptada a una sola página. Reglas visuales: docs/DESIGN-SYSTEM.md y brandbook en Figma.
 */
import type { Metadata } from 'next'
import Image from 'next/image'
import { Anchor, CalendarDays, Clock, Compass, MapPin, MessageCircle, Waves, Wine } from 'lucide-react'
import { Photo } from '@/components/brand/Photo'
import { T } from '@/components/brand/Ph'
import { WaitlistForm } from '@/components/forms/WaitlistForm'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { StickyActionBar } from '@/components/layout/StickyActionBar'
import { ArrowLink, Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { landing as c, photos } from '@/content/landing'

export const metadata: Metadata = {
  title: { absolute: c.meta.title },
  description: c.meta.description,
  openGraph: { title: c.meta.title, description: c.meta.description },
}

const pillarIcons = { compass: Compass, glass: Wine, wave: Waves } as const

export default function LandingPage() {
  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-lino focus:p-3">
        Saltar al contenido
      </a>
      <SiteHeader nav={c.nav} cta={c.cta.primary} />

      <main id="contenido">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative flex min-h-[100svh] max-h-[1000px] items-end overflow-hidden bg-verde-profundo text-lino lg:min-h-[88vh]">
          <Photo slot={photos.hero} className="absolute inset-0" priority showBrief={false} />
          <div className="absolute inset-0 bg-gradient-to-b from-verde-profundo/60 via-verde-profundo/10 via-30% to-verde-profundo/90" aria-hidden="true" />
          <div className="container-x relative w-full px-[var(--page-x)] pb-[clamp(2.5rem,8vh,6rem)] pt-32">
            <p className="label text-lino/85">{c.hero.label}</p>
            <h1 className="mt-5 max-w-[12ch] font-display text-[length:var(--text-display-xl)] font-light leading-[0.98] tracking-[-0.01em] text-lino">
              {c.hero.title}
            </h1>
            <p className="mt-6 max-w-[34rem] text-[length:var(--text-body-l)] text-lino/90">{c.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={c.cta.primary.href} variant="accent" className="w-full sm:w-auto">{c.cta.primary.label}</Button>
              <Button href={c.cta.whatsapp.href} variant="ghost-light" className="w-full sm:w-auto" icon={<MessageCircle size={18} strokeWidth={1.5} />}>
                {c.cta.whatsapp.label}
              </Button>
            </div>
            <p className="label mt-10 text-lino/70"><T value={c.hero.launch} /></p>
          </div>
        </section>

        {/* ── Insight / brand story ─────────────────────────── */}
        <section className="section bg-blanco">
          <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="reveal lg:col-span-7">
              <p className="font-display text-[length:var(--text-display-l)] font-light leading-[1.05] text-verde-lago">
                {c.insight.title}
              </p>
              <img src="/brand/ola-oro.svg" alt="" aria-hidden="true" className="mt-10 w-40" />
            </div>
            <div className="reveal lg:col-span-5">
              <p className="measure text-[length:var(--text-body-l)]">{c.insight.body}</p>
              <p className="measure mt-6 font-medium text-verde-lago">{c.insight.closing}</p>
            </div>
          </div>
        </section>

        {/* ── Pilares ───────────────────────────────────────── */}
        <section className="border-y border-gris-niebla bg-piedra px-[var(--page-x)] py-16">
          <ul className="container-x grid gap-10 md:grid-cols-3">
            {c.pillars.map((p) => {
              const Icon = pillarIcons[p.icon]
              return (
                <li key={p.title} className="reveal flex gap-5">
                  <Icon className="mt-1 shrink-0 text-verde-lago" size={28} strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <h3 className="text-[length:var(--text-h3)] font-semibold text-verde-lago">{p.title}</h3>
                    <p className="mt-2 text-[length:var(--text-body-m)]">{p.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        {/* ── Experiencias ──────────────────────────────────── */}
        <section id="experiencias" className="section scroll-mt-16 bg-blanco">
          <div className="container-x">
            <SectionHeader label={c.experiences.label} title={c.experiences.title} className="reveal" />
            <ul className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
              {c.experiences.items.map((e) => (
                <li key={e.slug} className="reveal group flex flex-col">
                  <Photo slot={photos[e.photo]} className="aspect-[4/5] w-full transition-transform duration-[600ms] group-hover:scale-[1.01]" sizes="(min-width: 768px) 33vw, 100vw" />
                  <span className="mt-6 w-fit rounded-[2px] bg-verde-niebla px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-verde-lago">
                    {e.chip}
                  </span>
                  <h3 className="mt-4 font-display text-[length:var(--text-h2)] font-medium leading-tight text-verde-lago">{e.title}</h3>
                  <p className="mt-3 text-[length:var(--text-body-m)]">{e.text}</p>
                  <dl className="mt-5 grid gap-2 border-t border-gris-niebla pt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={16} strokeWidth={1.5} className="text-verde-lago" aria-hidden="true" />
                      <dt className="sr-only">Duración</dt>
                      <dd><T value={e.duration} /></dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} strokeWidth={1.5} className="text-verde-lago" aria-hidden="true" />
                      <dt className="sr-only">Días</dt>
                      <dd><T value={e.schedule} /></dd>
                    </div>
                  </dl>
                  <p className="mt-4 font-display text-xl text-grafito"><T value={e.price} /></p>
                </li>
              ))}
            </ul>
            <p className="reveal mt-14 flex items-center gap-3 text-sm text-gris-piedra">
              <span className="block h-px w-8 bg-gris-niebla" aria-hidden="true" />
              {c.experiences.note}
            </p>
          </div>
        </section>

        {/* ── Cómo es una salida ────────────────────────────── */}
        <section className="section bg-verde-lago text-lino">
          <div className="container-x">
            <SectionHeader label={c.timeline.label} title={c.timeline.title} dark className="reveal" />
            <ol className="mt-14 grid gap-10 md:grid-cols-5 md:gap-6">
              {c.timeline.steps.map((s, i) => (
                <li key={s.title} className="reveal relative border-l border-verde-bruma pl-6 md:border-l-0 md:border-t md:pl-0 md:pt-6">
                  <span className="font-display text-3xl font-light text-oro-claro">{String(i + 1).padStart(2, '0')}</span>
                  <p className="label mt-3 text-verde-bruma"><T value={s.time} /></p>
                  <h3 className="mt-2 text-[length:var(--text-h3)] font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[length:var(--text-body-m)] text-verde-niebla">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── El barco ──────────────────────────────────────── */}
        <section id="el-barco" className="section scroll-mt-16 bg-blanco">
          <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
            <Photo slot={photos.barco} className="reveal aspect-[4/3] lg:col-span-7" sizes="(min-width: 1024px) 58vw, 100vw" />
            <div className="reveal lg:col-span-5">
              <SectionHeader label={c.boat.label} title={c.boat.title} />
              <p className="measure mt-6">{c.boat.text}</p>
              <p className="label mt-6 text-verde-lago"><T value={c.boat.status} /></p>
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-gris-niebla pt-8">
                {c.boat.specs.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="block font-display text-[2.5rem] font-light leading-none text-verde-lago sm:text-5xl"><T value={s.value} /></span>
                      <span className="mt-1 block text-sm text-gris-piedra">{s.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── El lago + Tres Bahías ─────────────────────────── */}
        <section id="el-lago" className="scroll-mt-16 bg-piedra">
          <div className="grid lg:grid-cols-2">
            <Photo slot={photos.insight} className="aspect-[4/5] lg:aspect-auto lg:min-h-[640px]" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div className="section flex flex-col justify-center">
              <SectionHeader label={c.lake.label} title={c.lake.title} className="reveal" />
              <p className="measure reveal mt-6">{c.lake.text}</p>
              <dl className="reveal mt-8 flex gap-12">
                {c.lake.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="sr-only">{f.label}</dt>
                    <dd>
                      <span className="block font-display text-4xl font-light text-verde-lago"><T value={f.value} /></span>
                      <span className="text-sm text-gris-piedra">{f.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="reveal mt-12 border border-gris-niebla bg-lino p-6">
                <span className="rounded-[2px] border border-verde-lago px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-verde-lago">
                  {c.lake.tresBahias.chip}
                </span>
                <h3 className="mt-4 font-display text-[length:var(--text-h2)] font-medium text-verde-lago">{c.lake.tresBahias.title}</h3>
                <p className="mt-2 text-[length:var(--text-body-m)]">{c.lake.tresBahias.text}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Compromiso ambiental ──────────────────────────── */}
        <section className="section bg-blanco">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <SectionHeader label={c.care.label} title={c.care.title} className="reveal lg:col-span-5" />
            <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
              {c.care.items.map((item) => (
                <li key={item.title} className="reveal border-t border-gris-niebla pt-5">
                  <h3 className="text-[length:var(--text-h3)] font-semibold text-verde-lago">{item.title}</h3>
                  <p className="mt-2 text-[length:var(--text-body-m)]">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Privados y empresas ───────────────────────────── */}
        <section className="relative overflow-hidden bg-verde-profundo text-lino">
          <Photo slot={photos.privados} className="absolute inset-0 opacity-60" showBrief={false} />
          <div className="absolute inset-0 bg-verde-lago/60" aria-hidden="true" />
          <div className="section container-x relative">
            <div className="reveal max-w-xl">
              <SectionHeader label={c.private.label} title={c.private.title} dark />
              <p className="mt-6 text-lino/90">{c.private.text}</p>
              <p className="label mt-6 text-oro-claro"><T value={c.private.capacity} /></p>
              <div className="mt-8">
                <Button href={c.private.cta.href} variant="ghost-light" icon={<MessageCircle size={18} strokeWidth={1.5} />}>
                  {c.private.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Dónde estamos ─────────────────────────────────── */}
        <section id="donde-estamos" className="section scroll-mt-16 bg-blanco">
          <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="reveal lg:col-span-5">
              <SectionHeader label={c.location.label} title={c.location.title} />
              <p className="mt-8 flex items-start gap-3">
                <MapPin size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-verde-lago" aria-hidden="true" />
                <span>
                  <T value={c.location.place} />
                  <br />
                  <span className="text-sm text-gris-piedra"><T value={c.location.address} /></span>
                </span>
              </p>
            </div>
            <ul className="reveal grid gap-px bg-gris-niebla lg:col-span-7">
              {c.location.distances.map((d) => (
                <li key={d.from} className="flex items-baseline justify-between bg-blanco py-5">
                  <span className="flex items-center gap-3">
                    <Anchor size={16} strokeWidth={1.5} className="text-verde-bruma" aria-hidden="true" />
                    Desde {d.from}
                  </span>
                  <span className="shrink-0 whitespace-nowrap pl-4 font-display text-2xl text-verde-lago"><T value={d.time} /></span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Lista de espera ───────────────────────────────── */}
        <section id="lista-de-espera" className="section scroll-mt-16 bg-verde-lago text-lino">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="reveal lg:col-span-5">
              <SectionHeader label={c.waitlist.label} title={c.waitlist.title} dark />
              <p className="mt-6 text-verde-niebla">{c.waitlist.text}</p>
              <p className="label mt-6 text-oro-claro"><T value={c.waitlist.benefit} /></p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <WaitlistForm interests={c.waitlist.interests} />
            </div>
          </div>
        </section>

        {/* ── Cierre ────────────────────────────────────────── */}
        <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-verde-profundo text-lino">
          <Photo slot={photos.cierre} className="absolute inset-0" showBrief={false} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-verde-profundo/90" aria-hidden="true" />
          <div className="container-x relative w-full px-[var(--page-x)] pb-[clamp(3rem,10vh,7rem)]">
            <p className="reveal max-w-[18ch] font-display text-[length:var(--text-display-l)] font-light leading-[1.05]">
              {c.closing.title}
            </p>
            <div className="mt-8">
              <ArrowLink href={c.cta.primary.href} light>{c.cta.primary.label}</ArrowLink>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="bg-verde-profundo px-[var(--page-x)] pb-28 pt-16 text-verde-niebla lg:pb-12">
        <div className="container-x grid gap-12 md:grid-cols-3 md:items-end">
          <div>
            <Image src="/brand/logo-vertical-oro-blanco.svg" alt="Espíritu del Lago" width={150} height={120} />
            <p className="label mt-6 text-verde-bruma">{c.footer.endorsement}</p>
          </div>
          <ul className="grid gap-2 text-sm">
            {c.footer.contact.map((item, i) => (
              <li key={i}><T value={item} /></li>
            ))}
          </ul>
          <ul className="flex gap-6 text-sm md:justify-end">
            {c.footer.social.map((s) => (
              <li key={s.label}><T value={{ ph: s.label }} /></li>
            ))}
          </ul>
        </div>
        <p className="container-x mt-12 border-t border-verde-bruma/40 pt-6 font-display text-lg italic text-verde-bruma">
          {c.footer.tagline}
        </p>
      </footer>

      <StickyActionBar primary={c.cta.primary} whatsapp={c.cta.whatsapp} hideWhenVisibleId="lista-de-espera" />
    </>
  )
}
