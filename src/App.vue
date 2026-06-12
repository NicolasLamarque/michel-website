<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { Menu, X, ShieldCheck } from 'lucide-vue-next' // <-- Ajout de ShieldCheck ici
import logoUrl from './assets/Logo.png'

// État pour ouvrir/fermer le menu sur mobile
const isMenuOuvert = ref(false)

const fermerMenu = () => {
  isMenuOuvert.value = false
}

// 1. Déclaration essentielle de la variable (Cachée par défaut)
const cookiesAcceptes = ref(true)

// 2. Au chargement, on vérifie si Michel ou son client a déjà cliqué "Accepter"
onMounted(() => {
  const consentement = localStorage.getItem('michel_cookies_consent')
  if (!consentement) {
    cookiesAcceptes.value = false // Si aucun historique, on montre le bandeau
  }
})

// 3. La fonction qui enregistre le choix et cache le bandeau instantanément
const accepterCookies = () => {
  localStorage.setItem('michel_cookies_consent', 'accepte')
  cookiesAcceptes.value = true
}
</script>
<template>
  <div class="min-h-screen bg-[#0f0a0a] text-slate-100 font-sans antialiased flex flex-col">
    
    <header class="border-b border-zinc-800/60 bg-[#1a1212]/80 backdrop-blur sticky top-0 z-50 px-4 sm:px-8 py-4">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        
        <router-link to="/" @click="fermerMenu" class="flex items-center gap-3 group">
          <img 
            :src="logoUrl" 
            alt="Logo Michel Construction" 
            class="h-8 sm:h-10 w-auto object-contain" 
          />
          <div class="hidden xs:block">
            <span class="text-white font-black uppercase tracking-wider text-sm sm:text-lg block leading-none group-hover:text-[#d4af37] transition">Michel</span>
            <span class="text-[#d4af37] text-[10px] sm:text-xs font-medium tracking-widest uppercase">Construction</span>
          </div>
        </router-link>
        
        <nav class="hidden sm:flex items-center gap-4 text-sm font-medium">
          <router-link to="/" class="hover:text-[#d4af37] transition py-2" active-class="text-[#d4af37]">Accueil</router-link>
          <router-link to="/realisations" class="hover:text-[#d4af37] transition py-2" active-class="text-[#d4af37]">Réalisations</router-link>
        </nav>

        <button 
          @click="isMenuOuvert = !isMenuOuvert" 
          class="sm:hidden p-2 text-slate-400 hover:text-white transition focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu v-if="!isMenuOuvert" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>

      <div 
        v-show="isMenuOuvert" 
        class="sm:hidden absolute top-full left-0 w-full bg-[#1a1212] border-b border-zinc-800 shadow-xl py-4 px-6 flex flex-col gap-4 animate-fadeIn"
      >
        <router-link 
          to="/" 
          @click="fermerMenu" 
          class="text-base font-medium py-2 border-b border-zinc-800/40 text-slate-300 hover:text-[#d4af37]"
          active-class="text-[#d4af37] font-semibold"
        >
          Accueil
        </router-link>
        <router-link 
          to="/realisations" 
          @click="fermerMenu" 
          class="text-base font-medium py-2 text-slate-300 hover:text-[#d4af37]"
          active-class="text-[#d4af37] font-semibold"
        >
          Réalisations
        </router-link>
      </div>
    </header>

    <main class="flex-grow">
      <router-view />
    </main>

    <footer class="border-t border-zinc-800/60 bg-[#1a1212]/30 py-8 px-6 mt-auto">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
        
        <div class="text-center md:text-left space-y-1">
          <p>&copy; 2026 Michel Construction. Tous droits réservés.</p>
          <p class="font-light">Licence RBQ : 1234-5678-90 • Membre APCHQ</p>
        </div>

        <div class="flex gap-4 text-slate-400">
          <a href="#politique" class="hover:text-[#d4af37] transition">Politique de confidentialité</a>
          <span>•</span>
          <a href="#conditions" class="hover:text-[#d4af37] transition">Conditions d'utilisation</a>
          <span>•</span>
          <a href="#conditions" class="hover:text-[#d4af37] transition">Crédits</a>
        </div>
       
      

      </div>
    </footer>

    <transition name="slide-up">
      <div 
        v-if="!cookiesAcceptes" 
        class="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md bg-[#1a1212] border border-zinc-800 p-4 rounded-xl shadow-2xl z-50 flex flex-col gap-3"
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
          <button 
            @click="accepterCookies" 
            class="bg-zinc-800 hover:bg-zinc-700 text-slate-300 px-4 py-2 rounded-lg transition"
          >
            Continuer
          </button>
          <button 
            @click="accepterCookies" 
            class="bg-[#6b1124] hover:bg-[#520d1b] text-white px-4 py-2 rounded-lg transition border border-white/5"
          >
            Accepter
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>

<style>
/* Petite animation simple pour l'apparition du menu mobile */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}

/* Animation pour le bandeau Loi 25 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>