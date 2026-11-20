import type { Text } from '@/content/landing'

const SHOW = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== 'false'

/** Texto plano de un valor que puede ser placeholder. */
export const plain = (value: Text): string => (typeof value === 'string' ? value : value.ph)

/** Renderiza un texto; si es placeholder lo marca (subrayado punteado en oro). */
export function T({ value }: { value: Text }) {
  if (typeof value === 'string') return <>{value}</>
  if (!SHOW) return <>{value.ph}</>
  return (
    <span className="ph" title="Dato a confirmar">
      {value.ph}
    </span>
  )
}
