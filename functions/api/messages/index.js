export async function onRequestGet(context) {
  const { env } = context
  const { results } = await env.DB.prepare(
    'SELECT * FROM messages ORDER BY created_at DESC'
  ).all()

  return new Response(JSON.stringify({ messages: results }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
