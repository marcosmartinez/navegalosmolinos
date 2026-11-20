'use client'

import { useActionState } from 'react'
import { joinWaitlist, type WaitlistState } from '@/app/(frontend)/actions'

const field =
  'h-[52px] w-full border border-verde-bruma bg-verde-profundo/40 px-4 text-lino placeholder:text-verde-bruma focus:border-oro-claro focus:outline-none'
const labelCls = 'label mb-2 block text-verde-niebla'

/** Formulario de lista de espera, sobre Verde Lago (DESIGN-SYSTEM §10.8). */
export function WaitlistForm({ interests }: { interests: readonly string[] }) {
  const [state, action, pending] = useActionState<WaitlistState, FormData>(joinWaitlist, { status: 'idle' })

  if (state.status === 'ok') {
    return (
      <div role="status" className="border border-verde-bruma p-8">
        <p className="font-display text-[length:var(--text-h2)] font-light text-lino">Listo, {state.name}.</p>
        <p className="mt-3 text-verde-niebla">
          Te escribimos por WhatsApp antes que a nadie cuando zarpe la primera salida.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="grid gap-5" noValidate>
      <div>
        <label htmlFor="wl-name" className={labelCls}>Nombre</label>
        <input id="wl-name" name="name" required autoComplete="given-name" className={field} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="wl-phone" className={labelCls}>WhatsApp</label>
          <input id="wl-phone" name="phone" required inputMode="tel" autoComplete="tel" placeholder="351 000 0000" className={field} />
        </div>
        <div>
          <label htmlFor="wl-email" className={labelCls}>Email (opcional)</label>
          <input id="wl-email" name="email" type="email" autoComplete="email" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="wl-interest" className={labelCls}>¿Qué te gustaría hacer?</label>
        <select id="wl-interest" name="interest" defaultValue="" className={`${field} appearance-none`}>
          <option value="" disabled>Elegí una opción</option>
          {interests.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="wl-hp">No completar</label>
        <input id="wl-hp" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="flex items-start gap-3 text-sm text-verde-niebla">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-oro-sierra" />
        <span>Acepto que Espíritu del Lago me escriba por WhatsApp o email sobre el lanzamiento. Puedo darme de baja cuando quiera.</span>
      </label>
      {state.status === 'error' && (
        <p role="alert" className="text-sm text-oro-claro">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="h-12 bg-oro-sierra px-6 text-[length:var(--text-cta)] font-semibold uppercase tracking-[0.08em] text-verde-profundo transition-colors hover:bg-oro-oscuro disabled:opacity-40 sm:justify-self-start"
      >
        {pending ? 'Enviando…' : 'Avisame primero'}
      </button>
    </form>
  )
}
