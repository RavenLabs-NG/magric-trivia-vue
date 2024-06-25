import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Play from '@/views/Play.vue'
import Result from '@/views/Result.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/play',
      name: 'Play',
      component: Play
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    }
  ]
})

export default router
