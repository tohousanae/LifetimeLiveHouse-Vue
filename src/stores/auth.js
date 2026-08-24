import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    isInitialized: false,
    // 💡 新增：用來記住被 Modal 攔截前，使用者原本想去的網址
    redirectPath: null 
  }),
  actions: {
    async login(email, password) {
      const API_URL = `${import.meta.env.VITE_API_SPOTURL}/Login`
      const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true })
      this.isLoggedIn = true
      return response.data
    },
    async logout() {
      const API_URL = `${import.meta.env.VITE_API_SPOTURL}/Login`
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true })
      this.isLoggedIn = false
    },
    async checkAuth() {
      const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User`
      try {
        await axios.get(`${API_URL}/profile`, { withCredentials: true })
        this.isLoggedIn = true
      } catch (error) {
        this.isLoggedIn = false
      } finally {
        this.isInitialized = true
      }
    }
  }
})