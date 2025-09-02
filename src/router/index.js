import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Mikushop/Home-page.vue'
import Register from '@/components/Mikushop/User/Register-page.vue'
import Forgetpassword from '@/components/Mikushop/User/Forget-Password.vue'
import ResetPasswordForm from '@/components/Mikushop/User/Reset-Password.vue'
import NotFound from '@/components/Mikushop/NotFound.vue'
import Login from '@/components/Mikushop/User/Login-page.vue'

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
    },
    {
      path: `/:token`,
      name: 'resetpassword',
      component: ResetPasswordForm
    },
    {
      path: `/404`,
      name: 'notfound',
      component: NotFound
    },
    {
      path: `/login`,
      name: 'login',
      component: Login
    }
  ]
})

/*導航守衛*/
// 使用者登入後才可進入的頁面

export default router
