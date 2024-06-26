import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Result from '@/views/Result.vue'
import Index from '@/views/Index.vue'
import Trivia from '@/views/Trivia.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/trivia',
      name: 'Trivia',
      component: Trivia
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    }
  ]
})

export default router
