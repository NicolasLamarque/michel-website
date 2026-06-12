<script setup>
import { ref } from 'vue'
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-vue-next'

const form = ref({
  nom: '',
  courriel: '',
  telephone: '',
  typeProjet: '',
  message: ''
})

const typesProjet = [
  'Rénovation résidentielle',
  'Toiture & charpente',
  'Salle de bain',
  'Cuisine',
  'Fondation & structure',
  'Autre'
]

const statut = ref('') // '', 'envoi', 'succes', 'erreur'

const soumettre = async () => {
  statut.value = 'envoi'
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    if (response.ok) {
      statut.value = 'succes'
      form.value = { nom: '', courriel: '', telephone: '', typeProjet: '', message: '' }
    } else {
      statut.value = 'erreur'
    }
  } catch {
    statut.value = 'erreur'
  }
}
</script>

<template>
  <div class="bg-[#0f0a0a] min-h-screen">

    <!-- Hero sobre -->
    <section class="pt-24 pb-16 px-6 text-center border-b border-zinc-800/40">
      <span class="text-[#d4af37] font-bold tracking-[0.4em] uppercase text-xs block mb-4">Contact</span>
      <h1 class="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
        Parlons de <span class="text-[#d4af37]">votre projet</span>
      </h1>
      <p class="text-slate-500 text-base font-light max-w-xl mx-auto">
        Réponse sous 24h. Estimation gratuite et sans engagement.
      </p>
    </section>

    <!-- Contenu principal -->
    <section class="max-w-6xl mx-auto px-6 py-20">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-16">

        <!-- Colonne gauche — infos -->
        <div class="lg:col-span-2 space-y-12">

          <div class="space-y-6">
            <h2 class="text-2xl font-black text-white uppercase tracking-tight">Michel Construction</h2>
            <div class="w-8 h-0.5 bg-[#d4af37]"></div>
            <p class="text-slate-400 text-sm leading-relaxed font-light">
              Entrepreneur général basé en Mauricie. Rénovation résidentielle, toiture, finitions intérieures — exécution rigoureuse, résultats durables.
            </p>
          </div>

          <!-- Coordonnées -->
          <div class="space-y-5">
            <a href="tel:8195550199" class="flex items-center gap-4 group">
              <div class="w-10 h-10 border border-zinc-700 flex items-center justify-center group-hover:border-[#d4af37] transition-colors shrink-0">
                <Phone class="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <p class="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Téléphone</p>
                <p class="text-white text-sm font-medium group-hover:text-[#d4af37] transition-colors">(819) 555-0199</p>
              </div>
            </a>

            <a href="mailto:michel@michconstruction.ca" class="flex items-center gap-4 group">
              <div class="w-10 h-10 border border-zinc-700 flex items-center justify-center group-hover:border-[#d4af37] transition-colors shrink-0">
                <Mail class="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <p class="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Courriel</p>
                <p class="text-white text-sm font-medium group-hover:text-[#d4af37] transition-colors">michel@michconstruction.ca</p>
              </div>
            </a>

            <div class="flex items-center gap-4">
              <div class="w-10 h-10 border border-zinc-700 flex items-center justify-center shrink-0">
                <MapPin class="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <p class="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Territoire</p>
                <p class="text-white text-sm font-medium">Mauricie & environs</p>
              </div>
            </div>
          </div>

          <!-- Badge RBQ -->
          <div class="border border-zinc-800 p-5 space-y-3">
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-500">Certifications</p>
            <div class="space-y-2 text-sm text-slate-400">
              <p>🏛️ Licence RBQ : <span class="text-white font-mono">1234-5678-90</span></p>
              <p>🤝 Membre <span class="text-white">APCHQ</span></p>
            </div>
          </div>

          <!-- Horaire -->
          <div class="border border-zinc-800 p-5 space-y-3">
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-500">Disponibilités</p>
            <div class="space-y-1 text-sm">
              <div class="flex justify-between text-slate-400">
                <span>Lundi – Vendredi</span>
                <span class="text-white">7h – 17h</span>
              </div>
              <div class="flex justify-between text-slate-400">
                <span>Samedi</span>
                <span class="text-white">Sur rendez-vous</span>
              </div>
              <div class="flex justify-between text-slate-400">
                <span>Dimanche</span>
                <span class="text-slate-600">Fermé</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Colonne droite — formulaire -->
        <div class="lg:col-span-3">
          <div class="bg-[#140e0e] border border-zinc-800 p-8 md:p-10 space-y-7">

            <!-- Succès -->
            <div v-if="statut === 'succes'" class="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <CheckCircle2 class="w-14 h-14 text-[#d4af37]" />
              <h3 class="text-2xl font-black text-white uppercase tracking-tight">Message envoyé !</h3>
              <p class="text-slate-400 text-sm max-w-xs">Michel vous contactera sous 24h pour discuter de votre projet.</p>
              <button @click="statut = ''" class="mt-4 text-xs font-bold uppercase tracking-widest text-[#d4af37] hover:text-white transition border border-[#d4af37]/40 px-5 py-2.5 hover:border-white">
                Envoyer un autre message
              </button>
            </div>

            <!-- Formulaire -->
            <template v-else>
              <div>
                <h3 class="text-lg font-black text-white uppercase tracking-tight mb-1">Estimation gratuite</h3>
                <p class="text-xs text-slate-500">Tous les champs marqués * sont requis.</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div class="space-y-2">
                  <label class="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Nom complet *</label>
                  <input
                    v-model="form.nom"
                    type="text"
                    required
                    placeholder="Jean Tremblay"
                    class="w-full bg-[#0f0a0a] border border-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37] transition-colors"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Téléphone</label>
                  <input
                    v-model="form.telephone"
                    type="tel"
                    placeholder="(819) 000-0000"
                    class="w-full bg-[#0f0a0a] border border-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37] transition-colors"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Courriel *</label>
                <input
                  v-model="form.courriel"
                  type="email"
                  required
                  placeholder="vous@exemple.com"
                  class="w-full bg-[#0f0a0a] border border-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Type de projet *</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="type in typesProjet"
                    :key="type"
                    type="button"
                    @click="form.typeProjet = type"
                    class="px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-colors"
                    :class="form.typeProjet === type
                      ? 'bg-[#d4af37] border-[#d4af37] text-black'
                      : 'border-zinc-700 text-slate-400 hover:border-zinc-500 hover:text-white'"
                  >
                    {{ type }}
                  </button>
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Décrivez votre projet *</label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  required
                  placeholder="Ex : Réfection complète de la toiture d'un bungalow, environ 1 200 pi², tuiles d'asphalte…"
                  class="w-full bg-[#0f0a0a] border border-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37] transition-colors resize-none leading-relaxed"
                ></textarea>
              </div>

              <!-- Erreur -->
              <div v-if="statut === 'erreur'" class="flex items-center gap-2 text-red-400 text-xs bg-red-900/20 border border-red-900/40 px-4 py-3">
                <AlertCircle class="w-4 h-4 shrink-0" />
                <span>Une erreur est survenue. Veuillez réessayer ou nous appeler directement.</span>
              </div>

              <button
                @click="soumettre"
                :disabled="statut === 'envoi'"
                class="w-full flex items-center justify-center gap-3 py-4 text-xs font-black uppercase tracking-widest transition-all"
                :class="statut === 'envoi'
                  ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                  : 'bg-[#d4af37] text-black hover:bg-white'"
              >
                <Loader2 v-if="statut === 'envoi'" class="w-4 h-4 animate-spin" />
                <template v-else>
                  Demander une estimation
                  <ArrowRight class="w-4 h-4" />
                </template>
              </button>

              <p class="text-center text-[10px] text-slate-600">Réponse garantie sous 24h — Estimation gratuite et sans engagement</p>

            </template>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>