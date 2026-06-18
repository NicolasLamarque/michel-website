// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js' // <-- Vite est intelligent, il va chercher le index.js dans le dossier router automatiquement
import './style.css'

const app = createApp(App)

app.use(router) // <-- On attache le routeur à l'app
app.mount('#app')