'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

type NavItem = { label: string; href: string }

/**
 * Header: transparente sobre el hero (logo Oro + Blanco), sólido sobre Blanco al hacer scroll
 * (logo full color). Mobile: menú a pantalla completa sobre Verde Lago (DESIGN-SYSTEM §10.6).
 */
export function SiteHeader({ nav, cta }: { nav: readonly NavItem[]; cta: NavItem }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const light = !solid && !open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid && !open ? 'border-b border-gris-niebla bg-blanco' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between px-[var(--page-x)] lg:h-[88px]">
        <Link href="/" aria-label="Espíritu del Lago, inicio" className="relative z-50 block">
          <Image
            src={light || open ? '/brand/logo-horizontal-oro-blanco.svg' : '/brand/logo-horizontal-full.svg'}
            alt="Espíritu del Lago"
            width={180}
            height={51}
            priority
            className="h-auto w-[150px] lg:w-[180px]"
          />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${light ? 'text-lino/90 hover:text-lino' : 'text-grafito hover:text-verde-lago'}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={cta.href}
            className={`inline-flex h-10 items-center px-5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
              light ? 'border border-lino/70 text-lino hover:bg-lino/10' : 'bg-verde-lago text-lino hover:bg-verde-profundo'
            }`}
          >
            {cta.label}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className={`relative z-50 grid h-11 w-11 place-items-center lg:hidden ${light || open ? 'text-lino' : 'text-verde-lago'}`}
        >
          {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </button>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col justify-end bg-verde-lago px-[var(--page-x)] pb-12 pt-24 lg:hidden"
      >
        <nav aria-label="Menú" className="flex flex-col gap-4">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl font-light text-lino"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={cta.href}
          onClick={() => setOpen(false)}
          className="mt-10 inline-flex h-12 items-center justify-center bg-oro-sierra px-6 text-sm font-semibold uppercase tracking-[0.08em] text-verde-profundo"
        >
          {cta.label}
        </a>
      </div>
    </header>
  )
}
