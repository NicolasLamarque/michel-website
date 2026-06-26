const STATUTS_VALIDES = ['nouveau', 'lu', 'traite']

export async function onRequestPatch(context) {
  const { request, env, params } = context
  const id = Number(params.id)
  if (!id) {
    return new Response(JSON.stringify({ error: 'Identifiant invalide.' }), { status: 400 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Requête invalide.' }), { status: 400 })
  }

  if (!STATUTS_VALIDES.includes(body.statut)) {
    return new Response(JSON.stringify({ error: 'Statut invalide.' }), { status: 400 })
  }

  await env.DB.prepare('UPDATE messages SET statut = ? WHERE id = ?')
    .bind(body.statut, id)
    .run()

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}

export async function onRequestDelete(context) {
  const { env, params } = context
  const id = Number(params.id)
  if (!id) {
    return new Response(JSON.stringify({ error: 'Identifiant invalide.' }), { status: 400 })
  }

  await env.DB.prepare('DELETE FROM messages WHERE id = ?').bind(id).run()

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
