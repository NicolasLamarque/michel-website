<script setup>
import { ref } from 'vue'
import { MoveHorizontal } from 'lucide-vue-next'

const props = defineProps({
  avant: { type: String, required: true },
  apres: { type: String, required: true },
  avantLabel: { type: String, default: 'Avant' },
  apresLabel: { type: String, default: 'Après' },
})

const position = ref(50)
const dragging = ref(false)
const containerRef = ref(null)

function updateFromClientX(clientX) {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  let pct = ((clientX - rect.left) / rect.width) * 100
  position.value = Math.max(0, Math.min(100, pct))
}

function onPointerDown(e) {
  dragging.value = true
  updateFromClientX(e.clientX)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
}

function onPointerMove(e) {
  if (dragging.value) updateFromClientX(e.clientX)
}

function onPointerUp() {
  dragging.value = false
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
}

function onKey(e) {
  if (e.key === 'ArrowLeft') position.value = Math.max(0, position.value - 4)
  if (e.key === 'ArrowRight') position.value = Math.min(100, position.value + 4)
}
</script>

<template>
  <div class="group relative select-none">
    <!-- Halo doré au survol -->
    <div class="absolute -inset-1 bg-[#d4af37]/15 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>

    <div
      ref="containerRef"
      class="relative overflow-hidden rounded-3xl border border-zinc-800 aspect-[4/3] cursor-ew-resize touch-none"
      @pointerdown="onPointerDown"
    >
      <!-- Image APRÈS (base) -->
      <img
        :src="apres"
        :alt="apresLabel"
        draggable="false"
        class="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      <!-- Image AVANT (rognée par le curseur) -->
      <img
        :src="avant"
        :alt="avantLabel"
        draggable="false"
        class="absolute inset-0 w-full h-full object-cover grayscale pointer-events-none"
        :style="{ clipPath: `inset(0 ${100 - position}% 0 0)` }"
      />

      <!-- Étiquettes -->
      <span
        class="absolute top-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white font-bold uppercase text-[10px] tracking-[0.25em] rounded-full border border-white/10 transition-opacity duration-300"
        :class="position < 12 ? 'opacity-0' : 'opacity-100'"
      >{{ avantLabel }}</span>
      <span
        class="absolute top-4 right-4 px-3 py-1.5 bg-[#d4af37] text-black font-bold uppercase text-[10px] tracking-[0.25em] rounded-full transition-opacity duration-300"
        :class="position > 88 ? 'opacity-0' : 'opacity-100'"
      >{{ apresLabel }}</span>

      <!-- Ligne de séparation + poignée -->
      <div
        class="absolute top-0 bottom-0 w-0.5 bg-[#d4af37] shadow-[0_0_18px_rgba(212,175,55,0.7)] pointer-events-none"
        :style="{ left: `${position}%`, transform: 'translateX(-50%)' }"
      >
        <button
          type="button"
          aria-label="Glisser pour comparer avant et après"
          :aria-valuenow="Math.round(position)"
          aria-valuemin="0"
          aria-valuemax="100"
          role="slider"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 rounded-full bg-[#d4af37] text-black shadow-xl ring-4 ring-black/30 pointer-events-auto cursor-ew-resize transition-transform duration-150 group-hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-white"
          @keydown="onKey"
          @pointerdown.stop="onPointerDown"
        >
          <MoveHorizontal class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Indice d'utilisation -->
    <p class="mt-4 text-center text-slate-500 text-xs uppercase tracking-[0.3em] font-light">
      ← Glissez pour comparer →
    </p>
  </div>
</template>
