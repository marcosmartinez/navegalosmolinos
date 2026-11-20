'use client'

import { useEffect } from 'react'

/**
 * Movimiento sutil de la landing.
 * - Elementos `.reveal`: aparecen con un fundido lento al entrar en pantalla.
 *   Hermanos `.reveal` contiguos se escalonan solos (--reveal-delay).
 * - Sin JS o con "reducir movimiento", todo queda visible y quieto.
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    items.forEach((el) => {
      const siblings = el.parentElement
        ? Array.from(el.parentElement.children).filter((n) => n.classList.contains('reveal'))
        : [el]
      const i = Math.min(siblings.indexOf(el), 5)
      el.style.setProperty('--reveal-delay', `${i * 140}ms`)
    })

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    // Lo que ya está en pantalla al cargar se muestra sin esperar.
    const vh = window.innerHeight
    items.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('is-in')
      else io.observe(el)
    })
    root.classList.add('motion-ready')

    return () => io.disconnect()
  }, [])

  return null
}
