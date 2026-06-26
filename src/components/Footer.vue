<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="border-t border-zinc-800/60 bg-[#1a1212]/30 py-6 px-6 mt-auto">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">

      <div class="text-center md:text-left space-y-1">
        <p class="text-[#d4af37] font-semibold uppercase tracking-widest text-[10px]">Michel & Co Construction</p>
        <p>&copy; 2026 Tous droits réservés.</p>
        <p class="font-light">Licence RBQ : 1234-5678-90 • Membre APCHQ</p>
      </div>

      <div class="flex flex-wrap justify-center gap-4 text-slate-500">
        <RouterLink to="/" class="hover:text-[#d4af37] transition">Accueil</RouterLink>
        <span>•</span>
        <RouterLink to="/realisations" class="hover:text-[#d4af37] transition">Réalisations</RouterLink>
        <span>•</span>
        <RouterLink to="/contact" class="hover:text-[#d4af37] transition">Contact</RouterLink>
      </div>

      <div class="flex flex-col items-center md:items-end gap-2 text-slate-600">
        <RouterLink to="/mentions-legales" class="hover:text-[#d4af37] transition">Confidentialité & Mentions légales</RouterLink>
        <a href="https://lamarquets.com" target="_blank" class="text-zinc-700 text-[10px] hover:text-[#d4af37] transition">Conception : LamarqueTs</a>
      </div>

      <RouterLink
        to="/admin/connexion"
        title="Connexion administration"
        class="group shrink-0 w-9 h-9 rounded-full border border-zinc-700/60 flex items-center justify-center hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all"
      >
        <svg viewBox="0 0 24 24" class="w-4 h-4 text-zinc-600 group-hover:text-[#d4af37] transition-colors" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="5" y="11" width="14" height="9" rx="1.5" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          <circle cx="12" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      </RouterLink>

    </div>
  </footer>
</template>
