<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { Menu, X, ShieldCheck } from 'lucide-vue-next'
import logoUrl from './assets/Logo.png'

const isMenuOuvert = ref(false)
const fermerMenu = () => { isMenuOuvert.value = false }

const cookiesAcceptes = ref(true)
onMounted(() => {
  const consentement = localStorage.getItem('michel_cookies_consent')
  if (!consentement) cookiesAcceptes.value = false
})
const accepterCookies = () => {
  localStorage.setItem('michel_cookies_consent', 'accepte')
  cookiesAcceptes.value = true
}

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/realisations', label: 'Réalisations' },
  { to: '/contact', label: 'Contact' },
]
</script>

<template>
  <div class="min-h-screen bg-[#0f0a0a] text-slate-100 font-sans antialiased flex flex-col">

    <header class="border-b border-zinc-800/60 bg-[#1a1212]/80 backdrop-blur sticky top-0 z-50 px-4 sm:px-8 py-4">
      <div class="max-w-6xl mx-auto flex justify-between items-center">

        <router-link to="/" @click="fermerMenu" class="flex items-center gap-3 group">
          <img :src="logoUrl" alt="Logo Michel Construction" class="h-8 sm:h-10 w-auto object-contain" />
          <div>
            <span class="text-white font-black uppercase tracking-wider text-sm sm:text-lg block leading-none group-hover:text-[#d4af37] transition">Michel</span>
            <span class="text-[#d4af37] text-[10px] sm:text-xs font-medium tracking-widest uppercase">Construction</span>
          </div>
        </router-link>

        <!-- Nav desktop -->
        <nav class="hidden sm:flex items-center gap-6 text-sm font-medium">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="hover:text-[#d4af37] transition py-2 tracking-wide"
            active-class="text-[#d4af37]"
            exact-active-class="text-[#d4af37]"
          >
            {{ link.label }}
          </router-link>

          <router-link
            to="/contact"
            class="ml-2 bg-[#d4af37] text-black text-xs font-black uppercase tracking-widest px-4 py-2 hover:bg-white transition-colors"
          >
            Soumission
          </router-link>
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

      <!-- Menu mobile -->
      <div
        v-show="isMenuOuvert"
        class="sm:hidden absolute top-full left-0 w-full bg-[#1a1212] border-b border-zinc-800 shadow-xl py-4 px-6 flex flex-col gap-1 animate-fadeIn"
      >
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          @click="fermerMenu"
          class="text-base font-medium py-3 border-b border-zinc-800/40 text-slate-300 hover:text-[#d4af37] transition"
          active-class="text-[#d4af37] font-semibold"
        >
          {{ link.label }}
        </router-link>
        <router-link
          to="/contact"
          @click="fermerMenu"
          class="mt-3 text-center bg-[#d4af37] text-black text-xs font-black uppercase tracking-widest px-4 py-3"
        >
          Soumission rapide
        </router-link>
      </div>
    </header>

    <main class="flex-grow">
      <router-view />
    </main>

    <footer class="border-t border-zinc-800/60 bg-[#1a1212]/30 py-10 px-6 mt-auto">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
        <div class="text-center md:text-left space-y-1">
          <p class="text-slate-400 font-semibold uppercase tracking-widest text-[10px]">Michel Construction</p>
          <p>&copy; 2026 Tous droits réservés.</p>
          <p class="font-light">Licence RBQ : 1234-5678-90 • Membre APCHQ</p>
        </div>
        <div class="flex flex-wrap justify-center gap-4 text-slate-500">
          <router-link to="/" class="hover:text-[#d4af37] transition">Accueil</router-link>
          <span>•</span>
          <router-link to="/realisations" class="hover:text-[#d4af37] transition">Réalisations</router-link>
          <span>•</span>
          <router-link to="/contact" class="hover:text-[#d4af37] transition">Contact</router-link>
        </div>
        <div class="flex gap-4 text-slate-600">
          <a href="#politique" class="hover:text-[#d4af37] transition">Confidentialité</a>
          <span>•</span>
          <a href="#conditions" class="hover:text-[#d4af37] transition">Conditions</a>
        </div>
      </div>
    </footer>

    <!-- Bandeau Loi 25 -->
    <transition name="slide-up">
      <div
        v-if="!cookiesAcceptes"
        class="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md bg-[#1a1212] border border-zinc-800 p-4 rounded-xl shadow-2xl z-50 flex flex-col gap-3"
      >
        <div class="flex items-start gap-3">
          <ShieldCheck class="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
          <div class="space-y-1">
            <h4 class="text-sm font-semibold text-white">Respect de votre vie privée</h4>
            <p class="text-xs text-slate-400 leading-relaxed">
              Ce site utilise des témoins de navigation essentiels pour optimiser votre expérience, en conformité avec la <strong>Loi 25</strong> du Québec. Aucun profilage publicitaire n'est effectué.
            </p>
          </div>
        </div>
        <div class="flex justify-end gap-2 text-xs font-semibold">
          <button @click="accepterCookies" class="bg-zinc-800 hover:bg-zinc-700 text-slate-300 px-4 py-2 rounded-lg transition">
            Continuer
          </button>
          <button @click="accepterCookies" class="bg-[#6b1124] hover:bg-[#520d1b] text-white px-4 py-2 rounded-lg transition border border-white/5">
            Accepter
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }

.slide-up-enter-active,
.slide-up-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from,
.slide-up-leave-to { opacity: 0; transform: translateY(20px); }
</style>