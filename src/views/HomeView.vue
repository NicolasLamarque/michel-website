<script setup>
import { ref, onMounted } from 'vue'
import { ArrowRight, HardHat, Wrench, Home, Layers, ChevronDown } from 'lucide-vue-next'
import { realisations } from '../text.js'

const vedettes = realisations.slice(0, 2)

const services = [
  {
    icon: Home,
    titre: 'Rénovation résidentielle',
    desc: 'Cuisine, salle de bain, sous-sol — des espaces pensés pour durer.'
  },
  {
    icon: Layers,
    titre: 'Toiture & charpente',
    desc: 'Installation, réfection et réparation. Maîtrise complète de la structure.'
  },
  {
    icon: Wrench,
    titre: 'Finitions intérieures',
    desc: 'Planchers, céramique, peinture, menuiserie. Le détail fait la différence.'
  },
  {
    icon: HardHat,
    titre: 'Gestion de projet',
    desc: 'Un seul interlocuteur du début à la fin. Délais respectés, budget tenu.'
  }
]
</script>

<template>
  <div class="bg-[#0f0a0a]">

    <!-- ─── HERO ─────────────────────────────────────────────────────── -->
    <section class="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">

      <!-- Fond décoratif -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#1a0a0a]/60 via-transparent to-[#0f0a0a]"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#d4af37]/4 blur-3xl pointer-events-none"></div>

      <div class="relative z-10 space-y-6 max-w-4xl">
        <span class="text-[#d4af37] font-bold tracking-[0.4em] uppercase text-xs block">Mauricie • Québec</span>

        <h1 class="text-6xl sm:text-8xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.9]">
          L'Art de<br/><span class="text-[#d4af37]">Bâtir</span>
        </h1>

        <p class="text-slate-400 text-base sm:text-lg font-light max-w-md mx-auto leading-relaxed">
          Entrepreneur général. Rénovation résidentielle, toiture, finitions — exécution rigoureuse, résultats durables.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <router-link
            to="/contact"
            class="flex items-center gap-2 bg-[#d4af37] text-black px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-white transition-colors"
          >
            Estimation gratuite
            <ArrowRight class="w-4 h-4" />
          </router-link>
          <router-link
            to="/realisations"
            class="flex items-center gap-2 border border-zinc-700 text-slate-300 px-8 py-4 font-bold uppercase text-xs tracking-widest hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
          >
            Voir nos réalisations
          </router-link>
        </div>
      </div>

      <!-- Flèche scroll -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown class="w-5 h-5 text-[#d4af37]/60" />
      </div>
    </section>

    <!-- ─── CHIFFRES ───────────────────────────────────────────────── -->
    <section class="border-y border-zinc-800/50 bg-[#140e0e]">
      <div class="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <p class="text-4xl font-black text-[#d4af37]">10+</p>
          <p class="text-xs text-slate-500 uppercase tracking-widest mt-1 font-medium">Années d'expérience</p>
        </div>
        <div>
          <p class="text-4xl font-black text-[#d4af37]">150+</p>
          <p class="text-xs text-slate-500 uppercase tracking-widest mt-1 font-medium">Projets complétés</p>
        </div>
        <div>
          <p class="text-4xl font-black text-[#d4af37]">RBQ</p>
          <p class="text-xs text-slate-500 uppercase tracking-widest mt-1 font-medium">Licence active</p>
        </div>
        <div>
          <p class="text-4xl font-black text-[#d4af37]">24h</p>
          <p class="text-xs text-slate-500 uppercase tracking-widest mt-1 font-medium">Délai de réponse</p>
        </div>
      </div>
    </section>

    <!-- ─── SERVICES ──────────────────────────────────────────────── -->
    <section class="max-w-6xl mx-auto px-6 py-28">
      <div class="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span class="text-[#d4af37] font-bold tracking-[0.4em] uppercase text-xs block mb-3">Ce qu'on fait</span>
          <h2 class="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Services</h2>
          <div class="w-10 h-0.5 bg-[#d4af37] mt-4"></div>
        </div>
        <p class="text-slate-500 text-sm font-light max-w-xs leading-relaxed">
          Du premier coup de crayon jusqu'à la dernière finition, une maîtrise complète du chantier.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800/40">
        <div
          v-for="service in services"
          :key="service.titre"
          class="bg-[#0f0a0a] p-8 group hover:bg-[#140e0e] transition-colors"
        >
          <component :is="service.icon" class="w-6 h-6 text-[#d4af37] mb-6" />
          <h3 class="text-lg font-black text-white uppercase tracking-tight mb-3 group-hover:text-[#d4af37] transition-colors">
            {{ service.titre }}
          </h3>
          <p class="text-slate-500 text-sm leading-relaxed font-light">{{ service.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ─── RÉALISATIONS EN VEDETTE ─────────────────────────────── -->
    <section class="bg-[#0c0808] border-t border-zinc-800/40 py-28 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span class="text-[#d4af37] font-bold tracking-[0.4em] uppercase text-xs block mb-3">Portfolio</span>
            <h2 class="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Réalisations</h2>
            <div class="w-10 h-0.5 bg-[#d4af37] mt-4"></div>
          </div>
          <router-link
            to="/realisations"
            class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#d4af37] transition-colors group"
          >
            Voir tout
            <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="item in vedettes"
            :key="item.id"
            class="group relative overflow-hidden"
          >
            <div class="relative overflow-hidden">
              <img
                :src="item.image"
                :alt="item.titre"
                class="w-full h-72 md:h-96 object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <span class="text-[#d4af37] text-[10px] font-bold uppercase tracking-widest">{{ item.sousTitre }}</span>
              <h3 class="text-xl font-black text-white uppercase tracking-tight mt-1">{{ item.titre }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CTA FINAL ────────────────────────────────────────────── -->
    <section class="py-28 px-6 text-center border-t border-zinc-800/40">
      <div class="max-w-2xl mx-auto space-y-6">
        <span class="text-[#d4af37] font-bold tracking-[0.4em] uppercase text-xs block">Prêt à commencer?</span>
        <h2 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
          Votre projet,<br/>notre métier.
        </h2>
        <p class="text-slate-500 text-sm font-light leading-relaxed">
          Estimation gratuite et sans engagement. On répond sous 24h.
        </p>
        <router-link
          to="/contact"
          class="inline-flex items-center gap-3 bg-[#d4af37] text-black px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-white transition-colors mt-4"
        >
          Contactez-nous
          <ArrowRight class="w-4 h-4" />
        </router-link>
      </div>
    </section>

  </div>
</template>