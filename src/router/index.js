import { createRouter, createWebHistory } from 'vue-router'
import view_auto from '@/pages/view_auto.vue'
import Home from '@/pages/Home.vue'
import Terasse from '@/pages/Terasse.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      
    },
    {
      path: '/vehicule',
      name: 'vehicule',
      component: view_auto,
      
    },
    {
      path: '/sol',
      name: 'terasse',
      component: Terasse,
      
    },
  ],
})

export default router
