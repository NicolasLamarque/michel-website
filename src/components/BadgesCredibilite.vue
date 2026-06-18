<script setup>
import { ShieldCheck } from 'lucide-vue-next'
import apchqLogo from '../assets/apchq-logo.png'
</script>

<template>
  <section class="border-y border-zinc-800/50 bg-[#140e0e] py-16 px-6">
    <div class="max-w-6xl mx-auto">

      <div class="mb-10 text-center">
        <span class="text-[#d4af37] font-bold tracking-[0.4em] uppercase text-xs block mb-3">Certifications</span>
        <div class="w-10 h-0.5 bg-[#d4af37] mx-auto"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <!-- RBQ -->
        <div class="relative bg-[#0f0a0a] border border-zinc-800 hover:border-[#d4af37]/50 transition-all duration-300 p-8 flex flex-col gap-4">
          <div class="flex items-start justify-between">
            <div class="space-y-1">
              <p class="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Régie du bâtiment</p>
              <p class="text-2xl font-black text-white uppercase tracking-tight">Québec</p>
            </div>
            <div class="text-right">
              <p class="text-[10px] text-zinc-600 uppercase tracking-widest">Fleur de lys</p>
              <p class="text-lg font-black text-[#d4af37]">✦ ✦</p>
            </div>
          </div>
          <div class="w-8 h-0.5 bg-[#d4af37]"></div>
          <p class="text-slate-400 text-xs leading-relaxed font-light">
            Entrepreneur général licencié et en règle auprès de la Régie du bâtiment du Québec.
          </p>
          <div class="mt-auto pt-4 border-t border-zinc-800/60 flex justify-between items-center">
            <a href="https://www.rbq.gouv.qc.ca" target="_blank" rel="noopener noreferrer"
              class="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-[#d4af37] transition">
              rbq.gouv.qc.ca
            </a>
            <span class="text-[#d4af37] font-mono text-xs font-bold">1234-5678-90</span>
          </div>
        </div>

        <!-- APCHQ -->
        <div class="relative bg-[#0f0a0a] border border-zinc-800 hover:border-[#d4af37]/50 transition-all duration-300 p-8 flex flex-col gap-4">
          <div class="flex items-start justify-between">
            <div class="space-y-1">
              <p class="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Membre actif</p>
              <p class="text-2xl font-black text-white uppercase tracking-tight">APCHQ</p>
            </div>
          </div>
          <div class="w-8 h-0.5 bg-[#d4af37]"></div>
          <p class="text-slate-400 text-xs leading-relaxed font-light">
            Membre de l'Association des professionnels de la construction et de l'habitation du Québec.
          </p>
          <div class="mt-auto pt-4 border-t border-zinc-800/60">
            <a href="https://www.apchq.com" target="_blank" rel="noopener noreferrer">
              <img :src="apchqLogo" alt="Logo APCHQ" class="h-10 w-auto opacity-80 hover:opacity-100 transition" />
            </a>
          </div>
        </div>

        <!-- Assuré & Cautionné -->
        <div class="relative bg-[#0f0a0a] border border-zinc-800 hover:border-[#d4af37]/50 transition-all duration-300 p-8 flex flex-col gap-4">
          <div class="flex items-start justify-between">
            <div class="space-y-1">
              <p class="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Protection complète</p>
              <p class="text-2xl font-black text-white uppercase tracking-tight leading-tight">Assuré &<br/>Cautionné</p>
            </div>
            <ShieldCheck class="w-8 h-8 text-[#d4af37] shrink-0" />
          </div>
          <div class="w-8 h-0.5 bg-[#d4af37]"></div>
          <p class="text-slate-400 text-xs leading-relaxed font-light">
            Couverture complète pour chaque chantier. Vos travaux et votre propriété sont protégés en tout temps.
          </p>
          <div class="mt-auto pt-4 border-t border-zinc-800/60">
            <span class="text-[10px] uppercase tracking-widest text-zinc-600">Travaux garantis</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
