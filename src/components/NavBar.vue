<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X, Home, Images, ClipboardList } from 'lucide-vue-next'
import logoUrl from '../assets/LOGO_3.png'
import logoScrollUrl from '../assets/LogoScroll.svg'

const isMenuOuvert = ref(false)
const fermerMenu = () => { isMenuOuvert.value = false }

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 10 }

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const navLinks = [
  { to: '/', label: 'Accueil', icon: Home },
  { to: '/realisations', label: 'Réalisations', icon: Images },
]
</script>

<template>
  <header
    class="border-b border-zinc-800/60 bg-[#1a1212]/80 backdrop-blur sticky top-0 z-50 px-4 sm:px-8 overflow-visible transition-all duration-300"
    :class="scrolled ? 'h-35 sm:h-42' : 'h-52 sm:h-50'"
  >
    <div class="h-full max-w-6xl mx-auto pb-2"
      :class="scrolled
        ? 'flex justify-between items-center'
        : 'flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-end'"
    >
      <div class="flex-1 flex justify-center sm:justify-start">
        <RouterLink to="/" @click="fermerMenu">
          <img :src="scrolled ? logoScrollUrl : logoUrl" class="h-35 sm:h-45 w-auto" />
        </RouterLink>
      </div>

      <!-- Nav desktop -->
      <nav class="hidden sm:flex items-end gap-2 pb-2">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="flex flex-col items-center gap-1 px-4 py-2 border border-zinc-700/60 hover:border-[#d4af37] hover:text-[#d4af37] text-slate-300 transition-all min-w-[72px]"
          active-class="border-[#d4af37] text-[#d4af37]"
          exact-active-class="border-[#d4af37] text-[#d4af37]"
        >
          <component :is="link.icon" class="w-5 h-5" />
          <span class="text-[10px] font-bold uppercase tracking-widest">{{ link.label }}</span>
        </RouterLink>
        <RouterLink
          to="/contact"
          class="flex flex-col items-center gap-1 px-4 py-2 bg-[#d4af37] text-black hover:bg-white transition-colors min-w-[72px]"
        >
          <ClipboardList class="w-5 h-5" />
          <span class="text-[10px] font-black uppercase tracking-widest">Soumission</span>
        </RouterLink>
      </nav>

      <!-- Burger mobile -->
      <button
        @click="isMenuOuvert = !isMenuOuvert"
        class="sm:hidden p-2 text-slate-400 hover:text-white transition focus:outline-none"
        aria-label="Toggle menu"
      >
        <Menu v-if="!isMenuOuvert" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>
    </div>

    <!-- Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMenuOuvert"
        @click="fermerMenu"
        class="sm:hidden fixed inset-0 bg-black/70 z-40"
      ></div>
    </Transition>

    <!-- Menu mobile — panneau coulissant depuis la droite -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isMenuOuvert"
        class="sm:hidden fixed top-0 right-0 h-full w-72 max-w-[85%] bg-[#1a1212] border-l border-zinc-800 shadow-2xl z-50 flex flex-col"
      >
        <div class="flex items-center justify-between px-6 py-5 border-b border-zinc-800/60">
          <span class="text-[#d4af37] font-bold tracking-[0.3em] uppercase text-xs">Menu</span>
          <button @click="fermerMenu" class="p-1 text-slate-400 hover:text-white transition" aria-label="Fermer le menu">
            <X class="w-5 h-5" />
          </button>
        </div>

        <nav class="flex flex-col gap-1 px-6 py-6">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            @click="fermerMenu"
            class="flex items-center gap-3 text-base font-medium py-3 border-b border-zinc-800/40 text-slate-300 hover:text-[#d4af37] transition"
            active-class="text-[#d4af37] font-semibold"
          >
            <component :is="link.icon" class="w-5 h-5" />
            {{ link.label }}
          </RouterLink>
          <RouterLink
            to="/contact"
            @click="fermerMenu"
            class="mt-4 flex items-center justify-center gap-2 text-center bg-[#d4af37] text-black text-xs font-black uppercase tracking-widest px-4 py-3 hover:bg-white transition-colors"
          >
            <ClipboardList class="w-4 h-4" />
            Soumission rapide
          </RouterLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>