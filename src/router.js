// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import RealisationsView from './views/RealisationsView.vue'
import ContactView from './views/ContactView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/realisations', component: RealisationsView },
  { path: '/contact', component: ContactView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router