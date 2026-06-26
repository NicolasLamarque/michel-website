async function envoyerResend(env, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    console.error('Resend error', res.status, await res.text())
  }
}

export async function onRequestPost(context) {
  const { request, env } = context

  let body
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Requête invalide.' }), { status: 400 })
  }

  const { nom, courriel, telephone, typeProjet, message } = body

  if (!nom || !courriel || !message) {
    return new Response(JSON.stringify({ error: 'Champs requis manquants.' }), { status: 400 })
  }

  await env.DB.prepare(
    `INSERT INTO messages (nom, courriel, telephone, type_projet, message)
     VALUES (?, ?, ?, ?, ?)`
  ).bind(nom, courriel, telephone || null, typeProjet || null, message).run()

  // Les emails ne partent que si Michel a configuré Resend (RESEND_API_KEY, CONTACT_EMAIL, RESEND_FROM).
  if (env.RESEND_API_KEY && env.CONTACT_EMAIL && env.RESEND_FROM) {
    await envoyerResend(env, {
      from: env.RESEND_FROM,
      to: env.CONTACT_EMAIL,
      subject: `Nouvelle demande — ${typeProjet || 'Projet'}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Courriel :</strong> ${courriel}</p>
        <p><strong>Téléphone :</strong> ${telephone || 'Non fourni'}</p>
        <p><strong>Type de projet :</strong> ${typeProjet || 'Non précisé'}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    })

    await envoyerResend(env, {
      from: env.RESEND_FROM,
      to: courriel,
      subject: 'Votre message a bien été reçu',
      html: `
        <p>Bonjour ${nom},</p>
        <p>Merci pour votre message. Michel vous recontactera sous 24h pour discuter de votre projet.</p>
        <p>— Michel Construction</p>
      `
    })
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
