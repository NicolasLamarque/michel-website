// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RealisationsView from '../views/RealisationsView.vue'
import ContactView from '../views/ContactView.vue'
import MentionsLegalesView from '../views/MentionsLegalesView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/realisations',
    name: 'Realisations',
    component: RealisationsView
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView
  },
  {
    path: '/mentions-legales',
    name: 'MentionsLegales',
    component: MentionsLegalesView
  }


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router