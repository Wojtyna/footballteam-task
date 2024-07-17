import { createRouter, createWebHistory } from 'vue-router'

import RootView from '@/views/root/index.vue'
import UserView from '@/views/user/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RootView
    },
    {
      path: '/add-user',
      name: 'addUser',
      component: UserView
    },
    {
      path: '/update-user',
      name: 'updateUser',
      component: UserView,
      props: { updateMode: true }
    }
  ]
})

export default router
