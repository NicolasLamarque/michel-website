<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { ShieldCheck } from 'lucide-vue-next'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

const cookiesAcceptes = ref(true)
onMounted(() => {
  const consentement = localStorage.getItem('michel_cookies_consent')
  if (!consentement) cookiesAcceptes.value = false
})
const accepterCookies = () => {
  localStorage.setItem('michel_cookies_consent', 'accepte')
  cookiesAcceptes.value = true
}
</script>

<template>
  <div class="min-h-screen bg-[#0f0a0a] text-slate-100 font-sans antialiased flex flex-col">

    <NavBar />

    <main class="flex-grow">
      <RouterView />
    </main>

    <Footer />

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