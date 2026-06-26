import { createSessionToken, sessionCookieHeader } from '../_lib/auth.js'

export async function onRequestPost(context) {
  const { request, env } = context

  if (!env.ADMIN_PASSWORD || !env.ADMIN_SESSION_SECRET) {
    return new Response(JSON.stringify({ error: 'Authentification non configurée.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Requête invalide.' }), { status: 400 })
  }

  if (!body.password || body.password !== env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Mot de passe incorrect.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const token = await createSessionToken(env.ADMIN_SESSION_SECRET)

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': sessionCookieHeader(token)
    }
  })
}
