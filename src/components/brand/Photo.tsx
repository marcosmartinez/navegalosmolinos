import Image from 'next/image'
import type { PhotoSlot } from '@/content/landing'

type Props = {
  slot: PhotoSlot
  className?: string
  sizes?: string
  priority?: boolean
  showBrief?: boolean
}

/**
 * Foto de marca. Si el slot no tiene `src`, muestra un placeholder con la paleta y la
 * indicación de dirección de arte del brandbook (07). Para cargar una foto real:
 * copiarla a public/images/ y completar `src` en src/content/landing.ts.
 */
export function Photo({ slot, className = '', sizes = '100vw', priority, showBrief = true }: Props) {
  const position = /\babsolute\b/.test(className) ? '' : 'relative'
  return (
    <div className={`${position} overflow-hidden ${className}`}>
      {slot.src ? (
        <Image src={slot.src} alt={slot.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div className={`photo-ph photo-ph--${slot.tone}`} role="img" aria-label={slot.alt}>
          {showBrief && <span className="label relative z-10 text-[10px]">Foto · {slot.brief}</span>}
        </div>
      )}
    </div>
  )
}
