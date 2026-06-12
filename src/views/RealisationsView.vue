<script setup>
import { ArrowRight } from 'lucide-vue-next'
import { realisations } from '../text.js'
</script>

<template>
  <div class="bg-[#0f0a0a]">

    <!-- Hero -->
    <section class="pt-24 pb-16 px-6 text-center border-b border-zinc-800/40">
      <span class="text-[#d4af37] font-bold tracking-[0.4em] uppercase text-xs block mb-4">Portfolio</span>
      <h1 class="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
        Nos <span class="text-[#d4af37]">Réalisations</span>
      </h1>
      <p class="text-slate-500 text-base font-light max-w-lg mx-auto">
        Mauricie&nbsp;•&nbsp;Excellence&nbsp;•&nbsp;Précision
      </p>
      <div class="mt-10 animate-bounce">
        <div class="w-px h-12 bg-gradient-to-b from-[#d4af37] to-transparent mx-auto"></div>
      </div>
    </section>

    <!-- Projets -->
    <section class="max-w-7xl mx-auto px-6 py-24 space-y-32 md:space-y-48">
      <div
        v-for="(item, index) in realisations"
        :key="item.id"
        class="flex flex-col gap-12 items-center"
        :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
      >
        <!-- Image -->
        <div class="w-full md:w-3/5 group relative">
          <div class="absolute -inset-1 bg-[#d4af37]/15 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          <div class="relative overflow-hidden border border-zinc-800">
            <img
              :src="item.image"
              :alt="item.titre"
              class="w-full h-[380px] md:h-[560px] object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition duration-700"
            />
          </div>
        </div>

        <!-- Texte -->
        <div class="w-full md:w-2/5 space-y-6" :class="index % 2 === 0 ? 'md:pl-10' : 'md:pr-10'">
          <span class="text-[#d4af37] font-bold tracking-[0.3em] uppercase text-xs">{{ item.sousTitre }}</span>
          <h2 class="text-3xl md:text-5xl font-black text-white uppercase leading-tight tracking-tight">
            {{ item.titre }}
          </h2>
          <div class="w-8 h-0.5 bg-[#d4af37]"></div>
          <p class="text-slate-400 text-sm leading-relaxed font-light">{{ item.description }}</p>
          <router-link
            to="/contact"
            class="group inline-flex items-center gap-3 text-white font-bold uppercase text-xs tracking-widest hover:text-[#d4af37] transition"
          >
            Discuter de ce projet
            <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA — pointe vers /contact maintenant -->
    <section class="py-24 bg-[#140e0e] border-t border-zinc-800/40 text-center px-6">
      <span class="text-[#d4af37] font-bold tracking-[0.4em] uppercase text-xs block mb-4">Prêt à commencer?</span>
      <h3 class="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-8">
        Lancer votre projet
      </h3>
      <router-link
        to="/contact"
        class="inline-flex items-center gap-3 bg-[#d4af37] text-black px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-white transition-colors"
      >
        Estimation gratuite
        <ArrowRight class="w-4 h-4" />
      </router-link>
    </section>

  </div>
</template>