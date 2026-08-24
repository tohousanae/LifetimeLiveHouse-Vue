import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Mikushop/Home-page.vue'
import Register from '@/components/Mikushop/User/Register-page.vue'
import Forgetpassword from '@/components/Mikushop/User/Forget-Password.vue'
import ResetPasswordForm from '@/components/Mikushop/User/Reset-Password.vue'
import NotFound from '@/components/Mikushop/Others/NotFound.vue'
import Login from '@/components/Mikushop/User/Login-page.vue'
import UserManage from '@/components/Mikushop/User/User-Manage.vue'
import * as bootstrap from 'bootstrap' // 💡 確保有引入 bootstrap
import { useAuthStore } from '@/stores/auth' // 👈 補上這行把 Pinia store 引入進來

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
    },
    {
      path: '/user-manage',
      name: 'usermanage',
      component: UserManage,
      // 💡 關鍵設定：標記這個路由需要登入才能訪問
      meta: { requiresAuth: true } 
    }
  ]
})

/* 導航守衛 (Navigation Guard) */
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (!authStore.isInitialized) {
    await authStore.checkAuth()
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // 1. 記住他想去的網址
    authStore.redirectPath = to.fullPath 
    
    // 2. 💡 修正白畫面：判斷是否有「上一頁」
    if (from.name == null) {
      // 如果是直接貼網址進來，沒有上一頁，就導向首頁當背景
      next('/') 
    } else {
      // 如果是從首頁或其他頁點過來的，取消跳轉留在原畫面
      next(false) 
    }
    
    // 3. 抓取畫面上的 Modal 並把它彈出來 (加一點點延遲確保 DOM 已渲染)
    setTimeout(() => {
      const modalEl = document.getElementById('userModal')
      if (modalEl) {
        import('bootstrap').then(({ Modal }) => {
          const modal = Modal.getOrCreateInstance(modalEl)
          modal.show()
        })
      }
    }, 100)
  } else {
    next()
  }
})

export default router
