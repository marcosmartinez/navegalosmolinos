'use client'

import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

/**
 * Barra de acción fija en mobile (DESIGN-SYSTEM §10.7). Aparece después del hero y se oculta
 * cuando la lista de espera está en pantalla, para no duplicar el CTA.
 */
export function StickyActionBar({
  primary,
  whatsapp,
  hideWhenVisibleId,
}: {
  primary: { label: string; href: string }
  whatsapp: { label: string; href: string }
  hideWhenVisibleId: string
}) {
  const [pastHero, setPastHero] = useState(false)
  const [targetVisible, setTargetVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const target = document.getElementById(hideWhenVisibleId)
    const io = target
      ? new IntersectionObserver(([entry]) => setTargetVisible(Boolean(entry?.isIntersecting)), { threshold: 0.1 })
      : null
    if (target && io) io.observe(target)
    return () => {
      window.removeEventListener('scroll', onScroll)
      io?.disconnect()
    }
  }, [hideWhenVisibleId])

  const visible = pastHero && !targetVisible

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-gris-niebla bg-lino px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center gap-3">
        <a
          href={whatsapp.href}
          tabIndex={visible ? 0 : -1}
          aria-label={whatsapp.label}
          className="grid h-12 w-12 shrink-0 place-items-center border border-verde-lago text-verde-lago"
        >
          <MessageCircle strokeWidth={1.5} />
        </a>
        <a
          href={primary.href}
          tabIndex={visible ? 0 : -1}
          className="flex h-12 flex-1 items-center justify-center bg-verde-lago text-[13px] font-semibold uppercase tracking-[0.08em] text-lino"
        >
          {primary.label}
        </a>
      </div>
    </div>
  )
}
