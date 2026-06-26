import { requireAuth } from '../_lib/auth.js'

export async function onRequestGet(context) {
  const authed = await requireAuth(context)
  return new Response(JSON.stringify({ authed }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
