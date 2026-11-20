import type { Access, FieldAccess } from 'payload'

type Role = 'admin' | 'editor'

const roleOf = (user: unknown): Role | undefined =>
  user && typeof user === 'object' && 'role' in user ? ((user as { role?: Role }).role ?? undefined) : undefined

/** Solo administradores. */
export const isAdmin: Access = ({ req }) => roleOf(req.user) === 'admin'

/** Administradores y Marketing/editor. */
export const isAdminOrEditor: Access = ({ req }) => {
  const role = roleOf(req.user)
  return role === 'admin' || role === 'editor'
}

/** Cualquier persona puede leer lo publicado; el panel ve también borradores. */
export const publishedOrEditor: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}

/** Lectura pública sin borradores (colecciones sin versiones). */
export const anyone: Access = () => true

/** Campos que solo puede editar un administrador (integraciones, modo de reserva). */
export const adminFieldOnly: FieldAccess = ({ req }) => roleOf(req.user) === 'admin'

/** Campos que se ven en el panel pero nunca se exponen por la API pública. */
export const authenticatedField: FieldAccess = ({ req }) => Boolean(req.user)
