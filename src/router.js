// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import RealisationsView from './views/RealisationsView.vue' // <-- On a changé '../' pour './'

const routes = [
  { path: '/', component: HomeView },
  { path: '/realisations', component: RealisationsView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router