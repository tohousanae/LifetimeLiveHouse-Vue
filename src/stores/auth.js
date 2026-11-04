import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    isInitialized: false,
    redirectPath: null,
    // 💡 新增：把會員資料直接快取在全域 State 裡
    profile: {
      email: '',
      name: '',
      cash: 0,
      memberPoint: 0,
      isEmailVerified: false,
      isPhoneVerified: false
    }
  }),
  actions: {
    async login(email, password) {
      const API_URL = `${import.meta.env.VITE_API_SPOTURL}/Login`
      await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true })
      this.isLoggedIn = true
      
      // 💡 登入成功後，順便把 profile 抓下來快取
      await this.fetchProfile()
    },

    async checkAuth() {
      const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User`
      try {
        // 💡 巧妙利用這支 API：不僅驗證身分，還順便把資料抓回來存快取！
        const response = await axios.get(`${API_URL}/profile`, { withCredentials: true })
        this.isLoggedIn = true
        this.profile = response.data // 存入 Pinia 全域快取
      } catch (error) {
        this.isLoggedIn = false
      } finally {
        this.isInitialized = true
      }
    },

    // 讓其他頁面如果需要主動更新資料時可以呼叫
    async fetchProfile() {
      const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User`
      try {
        const response = await axios.get(`${API_URL}/profile`, { withCredentials: true })
        this.profile = response.data
      } catch (error) {
        console.error('取得會員資料失敗')
      }
    },

    async logout() {
      const API_URL = `${import.meta.env.VITE_API_SPOTURL}/Login`
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true })
      this.isLoggedIn = false
      // 清空快取
      this.profile = { email: '', name: '', cash: 0, memberPoint: 0 }
    }
  }
})