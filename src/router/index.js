// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RealisationsView from '../views/RealisationsView.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router