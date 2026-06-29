<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { LogOut, Mail, Phone, Trash2, Check, Eye, Loader2, Inbox, Printer } from 'lucide-vue-next'

const router = useRouter()
const messages = ref([])
const chargement = ref(true)
const filtre = ref('tous') // tous, nouveau, lu, traite

const filtres = [
  { valeur: 'tous', label: 'Tous' },
  { valeur: 'nouveau', label: 'Nouveaux' },
  { valeur: 'lu', label: 'Lus' },
  { valeur: 'traite', label: 'Traités' }
]

const statutLabel = { nouveau: 'Nouveau', lu: 'Lu', traite: 'Traité' }
const statutCouleur = {
  nouveau: 'text-[#d4af37] border-[#d4af37]/40',
  lu: 'text-blue-400 border-blue-400/40',
  traite: 'text-emerald-400 border-emerald-400/40'
}

const messagesFiltres = computed(() => {
  if (filtre.value === 'tous') return messages.value
  return messages.value.filter(m => m.statut === filtre.value)
})

const charger = async () => {
  chargement.value = true
  const res = await fetch('/api/messages')
  if (res.status === 401) {
    router.push('/admin/connexion')
    return
  }
  const data = await res.json()
  messages.value = data.messages
  chargement.value = false
}

const changerStatut = async (msg, statut) => {
  msg.statut = statut
  await fetch(`/api/messages/${msg.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ statut })
  })
}

const supprimer = async (msg) => {
  if (!confirm('Supprimer ce message définitivement ?')) return
  await fetch(`/api/messages/${msg.id}`, { method: 'DELETE' })
  messages.value = messages.value.filter(m => m.id !== msg.id)
}

const deconnecter = async () => {
  await fetch('/api/admin-logout', { method: 'POST' })
  router.push('/admin/connexion')
}

const formaterDate = (iso) => {
  return new Date(iso + 'Z').toLocaleString('fr-CA', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
}

const echapperHtml = (texte) => {
  const div = document.createElement('div')
  div.textContent = texte ?? ''
  return div.innerHTML
}

const imprimer = (msg) => {
  const nom = echapperHtml(msg.nom)
  const courriel = echapperHtml(msg.courriel)
  const telephone = echapperHtml(msg.telephone) || 'Non fourni'
  const typeProjet = echapperHtml(msg.type_projet) || 'Non précisé'
  const message = echapperHtml(msg.message)

  const fenetre = window.open('', '_blank')
  fenetre.document.write(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <title>Message de ${msg.nom}</title>
      <style>
        body { font-family: Georgia, serif; color: #1a1212; padding: 48px; max-width: 700px; margin: 0 auto; }
        h1 { font-size: 22px; margin-bottom: 4px; }
        .sous-titre { color: #6b6b6b; font-size: 13px; margin-bottom: 28px; }
        .or { color: #b8902c; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        td { padding: 6px 0; font-size: 14px; vertical-align: top; }
        td.label { color: #6b6b6b; width: 140px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
        .message { white-space: pre-wrap; border-top: 1px solid #ddd; padding-top: 20px; line-height: 1.6; font-size: 14px; }
        @media print { body { padding: 0; } }
      </style>
    </head>
    <body>
      <h1>Michel & Co Construction <span class="or">— Demande de contact</span></h1>
      <p class="sous-titre">${formaterDate(msg.created_at)}</p>
      <table>
        <tr><td class="label">Nom</td><td>${nom}</td></tr>
        <tr><td class="label">Courriel</td><td>${courriel}</td></tr>
        <tr><td class="label">Téléphone</td><td>${telephone}</td></tr>
        <tr><td class="label">Type de projet</td><td>${typeProjet}</td></tr>
        <tr><td class="label">Statut</td><td>${statutLabel[msg.statut]}</td></tr>
      </table>
      <p class="message">${message}</p>
    </body>
    </html>
  `)
  fenetre.document.close()
  fenetre.focus()
  fenetre.print()
}

onMounted(charger)
</script>

<template>
  <div class="bg-[#0f0a0a] min-h-screen">
    <header class="border-b border-zinc-800/40 px-6 py-6 flex items-center justify-between max-w-6xl mx-auto">
      <div>
        <span class="text-[#d4af37] font-bold tracking-[0.4em] uppercase text-xs block mb-1">Administration</span>
        <h1 class="text-2xl font-black text-white uppercase tracking-tight">Messages reçus</h1>
      </div>
      <button @click="deconnecter" class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#d4af37] transition-colors">
        <LogOut class="w-4 h-4" />
        Déconnexion
      </button>
    </header>

    <main class="max-w-6xl mx-auto px-6 py-10">

      <div class="flex gap-2 mb-8">
        <button
          v-for="f in filtres"
          :key="f.valeur"
          @click="filtre = f.valeur"
          class="px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors"
          :class="filtre === f.valeur
            ? 'bg-[#d4af37] border-[#d4af37] text-black'
            : 'border-zinc-700 text-slate-400 hover:border-zinc-500 hover:text-white'"
        >
          {{ f.label }}
        </button>
      </div>

      <div v-if="chargement" class="flex items-center justify-center py-24">
        <Loader2 class="w-6 h-6 text-[#d4af37] animate-spin" />
      </div>

      <div v-else-if="messagesFiltres.length === 0" class="flex flex-col items-center justify-center py-24 text-center space-y-3">
        <Inbox class="w-10 h-10 text-zinc-700" />
        <p class="text-slate-500 text-sm">Aucun message pour ce filtre.</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="msg in messagesFiltres"
          :key="msg.id"
          class="bg-[#140e0e] border border-zinc-800 p-6 space-y-4"
        >
          <div class="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div class="flex items-center gap-3 mb-1">
                <h3 class="text-white font-bold">{{ msg.nom }}</h3>
                <span class="text-[10px] font-bold uppercase tracking-widest border px-2 py-0.5" :class="statutCouleur[msg.statut]">
                  {{ statutLabel[msg.statut] }}
                </span>
              </div>
              <p class="text-slate-500 text-xs">{{ formaterDate(msg.created_at) }}</p>
            </div>
            <div class="flex items-center gap-4 text-xs text-slate-400">
              <a :href="`mailto:${msg.courriel}`" class="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors">
                <Mail class="w-3.5 h-3.5" />
                {{ msg.courriel }}
              </a>
              <a v-if="msg.telephone" :href="`tel:${msg.telephone}`" class="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors">
                <Phone class="w-3.5 h-3.5" />
                {{ msg.telephone }}
              </a>
            </div>
          </div>

          <p v-if="msg.type_projet" class="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {{ msg.type_projet }}
          </p>

          <p class="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{{ msg.message }}</p>

          <div class="flex items-center gap-3 pt-2 border-t border-zinc-800/60">
            <button
              v-if="msg.statut !== 'lu'"
              @click="changerStatut(msg, 'lu')"
              title="Marquer lu"
              class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Eye class="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              <span class="hidden sm:inline">Marquer lu</span>
            </button>
            <button
              v-if="msg.statut !== 'traite'"
              @click="changerStatut(msg, 'traite')"
              title="Marquer traité"
              class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <Check class="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              <span class="hidden sm:inline">Marquer traité</span>
            </button>
            <button
              @click="imprimer(msg)"
              title="Imprimer / PDF"
              class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#d4af37] transition-colors"
            >
              <Printer class="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              <span class="hidden sm:inline">Imprimer / PDF</span>
            </button>
            <button
              @click="supprimer(msg)"
              title="Supprimer"
              class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-400 transition-colors ml-auto"
            >
              <Trash2 class="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              <span class="hidden sm:inline">Supprimer</span>
            </button>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>
