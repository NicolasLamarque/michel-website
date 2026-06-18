<template>
  <div class="bg-[#0f0a0a] min-h-screen py-32 px-6">
    <div class="max-w-3xl mx-auto space-y-20">

      <!-- En-tête -->
      <div class="border-b border-zinc-800/60 pb-10">
        <span class="text-[#d4af37] font-bold tracking-[0.4em] uppercase text-xs block mb-4">Légal</span>
        <h1 class="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
          Mentions légales
        </h1>
        <div class="w-10 h-0.5 bg-[#d4af37] mt-4"></div>
        <p class="text-slate-500 text-sm mt-4">Dernière mise à jour : juin 2026</p>
      </div>

      <!-- Confidentialité -->
      <div class="space-y-6">
        <h2 class="text-lg font-black text-white uppercase tracking-tight border-l-2 border-[#d4af37] pl-4">
          Politique de confidentialité — Loi 25
        </h2>
        <p class="text-slate-400 text-sm leading-relaxed">
          Michel & Co Construction respecte la <strong class="text-white">Loi modernisant des dispositions législatives en matière de protection des renseignements personnels</strong> (Loi 25) du Québec.
        </p>
        <p class="text-slate-400 text-sm leading-relaxed">
          Ce site utilise uniquement des témoins de navigation <strong class="text-white">essentiels</strong> au bon fonctionnement. Aucun profilage publicitaire. Aucune donnée personnelle vendue ou partagée avec des tiers.
        </p>
        <div class="space-y-3 text-sm">
          <div class="flex gap-4 border-b border-zinc-800/40 pb-3">
            <span class="text-[#d4af37] font-bold w-44 shrink-0">Formulaire contact</span>
            <span class="text-slate-400">Nom, courriel, téléphone — uniquement pour vous répondre.</span>
          </div>
          <div class="flex gap-4 border-b border-zinc-800/40 pb-3">
            <span class="text-[#d4af37] font-bold w-44 shrink-0">Témoins essentiels</span>
            <span class="text-slate-400">Consentement cookies — stocké localement dans votre navigateur.</span>
          </div>
          <div class="flex gap-4">
            <span class="text-[#d4af37] font-bold w-44 shrink-0">Aucun tracking</span>
            <span class="text-slate-400">Aucun outil d'analyse, aucun pixel publicitaire.</span>
          </div>
        </div>
        <p class="text-slate-500 text-sm">
          Pour exercer vos droits d'accès, correction ou suppression :
          <a href="mailto:michel@michconstruction.ca" class="text-[#d4af37] hover:text-white transition ml-1">
            michel@michconstruction.ca
          </a>
        </p>
      </div>

      <!-- Conditions -->
      <div class="space-y-4">
        <h2 class="text-lg font-black text-white uppercase tracking-tight border-l-2 border-[#d4af37] pl-4">
          Conditions d'utilisation
        </h2>
        <p class="text-slate-400 text-sm leading-relaxed">
          Le contenu de ce site — textes, images et logo — est la propriété exclusive de <strong class="text-white">Michel & Co Construction</strong>. Toute reproduction sans autorisation écrite est interdite.
        </p>
        <p class="text-slate-400 text-sm leading-relaxed">
          Les informations présentées sont fournies à titre indicatif. Michel & Co Construction se réserve le droit de modifier ses tarifs, disponibilités et services sans préavis.
        </p>
      </div>

      <!-- Remerciements -->
      <div class="space-y-6">
        <h2 class="text-lg font-black text-white uppercase tracking-tight border-l-2 border-[#d4af37] pl-4">
          Remerciements — Technologies utilisées
        </h2>
        <p class="text-slate-500 text-sm">Ce site a été réalisé grâce aux technologies open source suivantes :</p>
        <div class="space-y-2">
          <div
            v-for="tech in stack"
            :key="tech.nom"
            class="flex justify-between items-center border-b border-zinc-800/40 py-3 text-sm"
          >
            <div class="flex items-center gap-4">
              <a :href="tech.url" target="_blank"
                class="text-white font-bold hover:text-[#d4af37] transition">{{ tech.nom }}</a>
              <span class="text-slate-500">{{ tech.desc }}</span>
            </div>
            <span class="text-[#d4af37] text-xs font-mono shrink-0">{{ tech.licence }}</span>
          </div>
        </div>
      </div>

      <!-- Conception -->
      <div class="border-t border-zinc-800/40 pt-10">
        <p class="text-slate-500 text-sm text-center">
          Site conçu et développé par
          <a href="https://nicolaslamarque.ca" target="_blank"
            class="text-[#d4af37] hover:text-white transition font-bold mx-1">LamarqueTs</a>
          — Développement web & applications, Mauricie, Québec.
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
const stack = [
  { nom: 'Vue 3', desc: 'Framework JavaScript progressif', licence: 'MIT', url: 'https://vuejs.org' },
  { nom: 'Vite', desc: 'Outil de build ultra-rapide', licence: 'MIT', url: 'https://vitejs.dev' },
  { nom: 'Tailwind CSS v4', desc: 'Framework CSS utilitaire', licence: 'MIT', url: 'https://tailwindcss.com' },
  { nom: 'Vue Router', desc: 'Routage officiel Vue', licence: 'MIT', url: 'https://router.vuejs.org' },
  { nom: 'Lucide Vue', desc: 'Bibliothèque d\'icônes open source', licence: 'ISC', url: 'https://lucide.dev' },
  { nom: 'Cloudflare Pages', desc: 'Hébergement & déploiement', licence: 'Free tier', url: 'https://pages.cloudflare.com' },
  { nom: 'Cloudflare Workers', desc: 'Backend serverless', licence: 'Free tier', url: 'https://workers.cloudflare.com' },
  { nom: 'Cloudflare R2', desc: 'Stockage d\'objets / images', licence: 'Free tier', url: 'https://cloudflare.com/r2' },
  { nom: 'Cloudflare D1', desc: 'Base de données SQLite', licence: 'Free tier', url: 'https://cloudflare.com/d1' },
]
</script>