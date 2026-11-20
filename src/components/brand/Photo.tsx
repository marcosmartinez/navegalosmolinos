import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import type { PhotoSlot } from '@/content/landing'

type Props = {
  slot: PhotoSlot
  className?: string
  sizes?: string
  priority?: boolean
  showBrief?: boolean
}

/** ¿Existe el archivo en public/? Se evalúa en el servidor al generar la página. */
const fileExists = (src?: string) => {
  if (!src || !src.startsWith('/')) return Boolean(src)
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', src))
  } catch {
    return false
  }
}

/**
 * Foto de marca. Si el archivo del slot existe en public/images/, se muestra; si no, aparece el
 * placeholder con la paleta y la indicación de dirección de arte del brandbook (07).
 * Para cargar una foto: guardarla en public/images/ con el nombre del slot (ver src/content/landing.ts).
 */
export function Photo({ slot, className = '', sizes = '100vw', priority, showBrief = true }: Props) {
  const position = /\babsolute\b/.test(className) ? '' : 'relative'
  const hasImage = fileExists(slot.src)
  const hasMobile = hasImage && Boolean(slot.srcMobile) && fileExists(slot.srcMobile)
  return (
    <div className={`${position} overflow-hidden ${className}`}>
      {hasImage && slot.src ? (
        <>
          <Image
            src={slot.src}
            alt={slot.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover ${hasMobile ? 'hidden sm:block' : ''}`}
            style={slot.focus ? { objectPosition: slot.focus } : undefined}
          />
          {hasMobile && slot.srcMobile && (
            <Image src={slot.srcMobile} alt={slot.alt} fill sizes="100vw" priority={priority} className="object-cover sm:hidden" />
          )}
        </>
      ) : (
        <div
          className={`photo-ph photo-ph--${slot.tone} ${showBrief ? 'photo-ph--framed' : ''}`}
          role="img"
          aria-label={slot.alt}
        >
          {showBrief && <span className="label relative z-10 text-[10px]">Foto · {slot.brief}</span>}
        </div>
      )}
    </div>
  )
}
