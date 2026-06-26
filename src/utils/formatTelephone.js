// Formate un numéro de téléphone nord-américain en (819) 555-0199 au fil de la saisie.
export function formatTelephone(valeur) {
  const chiffres = valeur.replace(/\D/g, '').slice(0, 10)

  if (chiffres.length <= 3) return chiffres
  if (chiffres.length <= 6) return `(${chiffres.slice(0, 3)}) ${chiffres.slice(3)}`
  return `(${chiffres.slice(0, 3)}) ${chiffres.slice(3, 6)}-${chiffres.slice(6)}`
}
