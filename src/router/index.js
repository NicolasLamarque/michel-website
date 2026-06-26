// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RealisationsView from '../views/RealisationsView.vue'
import ContactView from '../views/ContactView.vue'
import MentionsLegalesView from '../views/MentionsLegalesView.vue'
import AdminLoginView from '../views/AdminLoginView.vue'
import AdminView from '../views/AdminView.vue'

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
  },
  {
    path: '/admin/connexion',
    name: 'AdminLogin',
    component: AdminLoginView
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router