<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-vue-next'

const router = useRouter()
const password = ref('')
const statut = ref('') // '', 'envoi', 'erreur'

const connecter = async () => {
  statut.value = 'envoi'
  try {
    const response = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value })
    })
    if (response.ok) {
      router.push('/admin')
    } else {
      statut.value = 'erreur'
    }
  } catch {
    statut.value = 'erreur'
  }
}
</script>

<template>
  <div class="bg-[#0f0a0a] min-h-screen flex items-center justify-center px-6">
    <div class="w-full max-w-sm bg-[#140e0e] border border-zinc-800 p-10 space-y-7">
      <div class="text-center space-y-3">
        <div class="w-12 h-12 mx-auto border border-[#d4af37]/40 flex items-center justify-center">
          <Lock class="w-5 h-5 text-[#d4af37]" />
        </div>
        <h1 class="text-xl font-black text-white uppercase tracking-tight">Espace administration</h1>
        <p class="text-slate-500 text-xs">Gestion des messages reçus</p>
      </div>

      <form @submit.prevent="connecter" class="space-y-5">
        <div class="space-y-2">
          <label class="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            required
            autofocus
            class="w-full bg-[#0f0a0a] border border-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37] transition-colors"
          />
        </div>

        <div v-if="statut === 'erreur'" class="flex items-center gap-2 text-red-400 text-xs bg-red-900/20 border border-red-900/40 px-4 py-3">
          <AlertCircle class="w-4 h-4 shrink-0" />
          <span>Mot de passe incorrect.</span>
        </div>

        <button
          type="submit"
          :disabled="statut === 'envoi'"
          class="w-full flex items-center justify-center gap-3 py-4 text-xs font-black uppercase tracking-widest transition-all"
          :class="statut === 'envoi'
            ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
            : 'bg-[#d4af37] text-black hover:bg-white'"
        >
          <Loader2 v-if="statut === 'envoi'" class="w-4 h-4 animate-spin" />
          <template v-else>
            Se connecter
            <ArrowRight class="w-4 h-4" />
          </template>
        </button>
      </form>
    </div>
  </div>
</template>
