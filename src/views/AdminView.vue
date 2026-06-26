<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { LogOut, Mail, Phone, Trash2, Check, Eye, Loader2, Inbox } from 'lucide-vue-next'

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
              class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Eye class="w-3.5 h-3.5" />
              Marquer lu
            </button>
            <button
              v-if="msg.statut !== 'traite'"
              @click="changerStatut(msg, 'traite')"
              class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <Check class="w-3.5 h-3.5" />
              Marquer traité
            </button>
            <button
              @click="supprimer(msg)"
              class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-400 transition-colors ml-auto"
            >
              <Trash2 class="w-3.5 h-3.5" />
              Supprimer
            </button>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>
