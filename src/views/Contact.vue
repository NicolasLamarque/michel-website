<script setup>
import { ref } from 'vue'

const nom = ref('')
const courriel = ref('')
const telephone = ref('')
const message = ref('')
const statutEnvoi = ref('')
const erreurEnvoi = ref(false)

const soumettreFormulaire = async () => {
  statutEnvoi.value = 'Transmission de votre demande...'
  erreurEnvoi.value = false
  
  try {
    // On appelle notre micro-route locale (qu'on configure à l'étape 2)
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nom: nom.value,
        courriel: courriel.value,
        telephone: telephone.value,
        message: message.value
      })
    })
    
    if (response.ok) {
      statutEnvoi.value = 'Message envoyé avec succès ! Michel vous contactera sous peu.'
      nom.value = ''
      courriel.value = ''
      telephone.value = ''
      message.value = ''
    } else {
      erreurEnvoi.value = true
      statutEnvoi.value = "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
    }
  } catch (error) {
    erreurEnvoi.value = true
    statutEnvoi.value = "Impossible de joindre le service d'envoi."
  }
}
</script>

<template>
  <section class="max-w-4xl mx-auto px-6 py-32 border-t border-zinc-900/80">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-16">
      
      <div class="md:col-span-2 space-y-6">
        <span class="text-[#d4af37] font-bold tracking-[0.3em] uppercase text-xs block">Contact</span>
        <h2 class="text-4xl font-black text-white uppercase tracking-tight">Parlons de votre projet</h2>
        <div class="w-12 h-1 bg-[#d4af37]"></div>
        <p class="text-slate-400 text-sm leading-relaxed font-light">
          Qu'il s'agisse d'une rénovation résidentielle de prestige ou d'une structure de toiture complexe, nous assurons une exécution rigoureuse.
        </p>
        <div class="pt-6 text-xs font-mono text-slate-500 space-y-2">
          <p>📍 Mauricie, Québec</p>
          <p>📞 (819) 555-0199</p>
          <p>💼 Licence RBQ : 1234-5678-90</p>
        </div>
      </div>

      <form @submit.prevent="soumettreFormulaire" class="md:col-span-3 space-y-6 bg-[#140e0e]/50 border border-zinc-900 p-8 rounded-xl">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Nom complet</label>
            <input v-model="nom" type="text" required class="w-full bg-[#0f0a0a] border border-zinc-800/80 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition" />
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Téléphone</label>
            <input v-model="telephone" type="tel" class="w-full bg-[#0f0a0a] border border-zinc-800/80 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition" />
          </div>
        </div>

        <div>
          <label class="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Adresse courriel</label>
          <input v-model="courriel" type="email" required class="w-full bg-[#0f0a0a] border border-zinc-800/80 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition" />
        </div>

        <div>
          <label class="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Détails du projet</label>
          <textarea v-model="message" rows="4" required class="w-full bg-[#0f0a0a] border border-zinc-800/80 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition resize-none"></textarea>
        </div>

        <button type="submit" class="w-full bg-[#d4af37] text-black font-black uppercase text-xs tracking-widest py-4 rounded hover:bg-white transition duration-300">
          Demander une estimation
        </button>

        <p v-if="statutEnvoi" :class="erreurEnvoi ? 'text-red-400' : 'text-[#d4af37]'" class="text-center text-xs font-medium pt-2">
          {{ statutEnvoi }}
        </p>
      </form>

    </div>
  </section>
</template>