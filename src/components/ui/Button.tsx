import Link from 'next/link'
import type React from 'react'

type Variant = 'primary' | 'secondary' | 'accent' | 'ghost-light'
type Size = 'M' | 'S'

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ease-[var(--ease-calm)] text-center sm:whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary: 'bg-verde-lago text-lino hover:bg-verde-profundo',
  secondary: 'border border-verde-lago text-verde-lago hover:bg-verde-niebla',
  accent: 'bg-oro-sierra text-verde-profundo hover:bg-oro-oscuro',
  'ghost-light': 'border border-lino/70 text-lino hover:bg-lino/10',
}

const sizes: Record<Size, string> = {
  M: 'min-h-12 px-5 py-3 text-[length:var(--text-cta)] sm:px-6',
  S: 'h-10 px-4 text-xs',
}

type Props = {
  href: string
  variant?: Variant
  size?: Size
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

/** Botón-enlace del design system (DESIGN-SYSTEM §10.1). Radio 0, sin sombras. */
export function Button({ href, variant = 'primary', size = 'M', icon, children, className = '' }: Props) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {icon}
      {children}
    </Link>
  )
}

/** Enlace con flecha (variante "link"). */
export function ArrowLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-medium ${light ? 'text-lino' : 'text-verde-lago'}`}
    >
      {children}
      <span aria-hidden="true" className="text-oro-sierra transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </Link>
  )
}
