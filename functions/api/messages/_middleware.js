import { requireAuth } from '../../_lib/auth.js'

export async function onRequest(context) {
  const authed = await requireAuth(context)
  if (!authed) {
    return new Response(JSON.stringify({ error: 'Non autorisé.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  return context.next()
}
