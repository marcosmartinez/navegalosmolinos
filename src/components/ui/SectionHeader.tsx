import type React from 'react'

type Props = {
  label: string
  title: React.ReactNode
  dark?: boolean
  className?: string
  as?: 'h1' | 'h2'
}

/** Label en mayúsculas + regla de horizonte + título en Cormorant (brandbook 06.03). */
export function SectionHeader({ label, title, dark = false, className = '', as: Tag = 'h2' }: Props) {
  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <p className={`label ${dark ? 'text-oro-claro' : 'text-verde-lago'}`}>{label}</p>
      <span className="horizon-rule" aria-hidden="true" />
      <Tag
        className={`max-w-[22ch] font-display text-[length:var(--text-h1)] font-light leading-[1.1] ${
          dark ? 'text-lino' : 'text-verde-lago'
        }`}
      >
        {title}
      </Tag>
    </div>
  )
}
