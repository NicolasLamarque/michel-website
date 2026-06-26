// Auth minimale par token signé HMAC, pour protéger /admin sans vrai système de comptes.

const COOKIE_NAME = 'admin_session'
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 jours

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
}

export async function createSessionToken(secret) {
  const expiry = String(Date.now() + SESSION_DURATION_MS)
  const sig = await hmac(secret, expiry)
  return `${expiry}.${sig}`
}

export async function verifySessionToken(token, secret) {
  if (!token || !token.includes('.')) return false
  const [expiry, sig] = token.split('.')
  if (!expiry || !sig) return false
  if (Date.now() > Number(expiry)) return false
  const expectedSig = await hmac(secret, expiry)
  return expectedSig === sig
}

export function getCookie(request, name) {
  const cookieHeader = request.headers.get('Cookie') || ''
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function sessionCookieHeader(token) {
  const maxAge = Math.floor(SESSION_DURATION_MS / 1000)
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}`
}

export function clearSessionCookieHeader() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`
}

export async function requireAuth(context) {
  const token = getCookie(context.request, COOKIE_NAME)
  const valid = await verifySessionToken(token, context.env.ADMIN_SESSION_SECRET)
  return valid
}

export { COOKIE_NAME }
