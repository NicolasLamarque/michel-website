<script setup>
import { realisations } from '../text.js'
</script>

<template>
  <div class="bg-[#0f0a0a]">
    <section class="h-[70vh] flex flex-col justify-center items-center text-center px-6">
      <h1 class="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4">
        L'Art de <span class="text-[#d4af37]">Bâtir</span>
      </h1>
      <p class="text-slate-400 text-xl font-light tracking-widest uppercase">Mauricie • Excellence • Précision</p>
      <div class="mt-12 animate-bounce">
        <div class="w-px h-16 bg-gradient-to-b from-[#d4af37] to-transparent mx-auto"></div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-24 space-y-32 md:space-y-64">
      <div 
        v-for="(item, index) in realisations" 
        :key="item.id"
        class="flex flex-col gap-12 items-center"
        :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
      >
        <div class="w-full md:w-3/5 group relative">
          <div class="absolute -inset-1 bg-[#d4af37]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          <div class="relative overflow-hidden rounded-xl border border-zinc-800">
            <img 
              :src="item.image" 
              :alt="item.titre"
              class="w-full h-[400px] md:h-[600px] object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition duration-700"
            />
          </div>
        </div>

        <div class="w-full md:w-2/5 space-y-6" :class="index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'">
          <span class="text-[#d4af37] font-bold tracking-[0.3em] uppercase text-sm">
            {{ item.sousTitre }}
          </span>
          <h2 class="text-4xl md:text-5xl font-black text-white leading-tight">
            {{ item.titre }}
          </h2>
          <div class="w-12 h-1 bg-[#d4af37]"></div>
          <p class="text-slate-400 text-lg leading-relaxed font-light">
            {{ item.description }}
          </p>
          <button class="group flex items-center gap-3 text-white font-bold uppercase text-sm tracking-widest hover:text-[#d4af37] transition">
            Découvrir le projet
            <div class="w-8 h-px bg-white group-hover:bg-[#d4af37] group-hover:w-12 transition-all"></div>
          </button>
        </div>
      </div>
    </section>

    <section class="py-32 bg-[#140e0e] border-y border-zinc-900 text-center">
      <h3 class="text-3xl text-white font-light mb-8">Prêt à lancer votre projet ?</h3>
      <router-link to="/realisations" class="bg-[#b88f0b] text-black px-10 py-4 font-black uppercase tracking-tighter hover:bg-[#661b04] transition-colors">
        Soumission Rapide
      </router-link>
    </section>
  </div>
</template>