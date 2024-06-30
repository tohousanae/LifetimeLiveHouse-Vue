import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/bugershop/Home.vue'
import Register from '@/components/bugershop/user/Register.vue'
import Forgetpassword from '@/components/bugershop/user/ForgetPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/forgetpassword',
      name: 'forgetpassword',
      component: Forgetpassword
    }
  ]
})

/*導航守衛*/
// 使用者登入後才可進入的頁面

export default router
