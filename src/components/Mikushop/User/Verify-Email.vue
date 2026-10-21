<template>
  <div class="form-center container">
    <!-- 狀態 1：驗證中 (Loading) -->
    <div v-if="status === 'loading'" class="text-center animate__animated animate__fadeIn">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status"></div>
      <h4 class="mt-4 fw-bold">信箱驗證中...</h4>
      <p class="text-muted">請稍候，正在為您開通帳號權限</p>
    </div>

    <!-- 狀態 2：驗證成功 (Success) -->
    <div v-else-if="status === 'success'" class="text-center animate__animated animate__zoomIn">
      <div class="card shadow-sm border-0 rounded-4 p-5" style="max-width: 500px; margin: 0 auto;">
        <i class="bi bi-check-circle-fill text-success mb-3" style="font-size: 4rem;"></i>
        <h3 class="fw-bold mb-3">{{ resultMessage }}</h3>
        <p class="text-muted mb-4">您的信箱已成功通過驗證，現在可以開始使用完整功能了！</p>
        
        <!-- 💡 根據登入狀態，動態切換按鈕文字 -->
        <button class="btn btn-primary btn-lg w-100" @click="handleSuccessRedirect">
          {{ authStore.isLoggedIn ? '完成並繼續瀏覽' : '立即登入' }}
        </button>
      </div>
    </div>

    <!-- 狀態 3：驗證失敗 (Error) -->
    <div v-else-if="status === 'error'" class="text-center animate__animated animate__zoomIn">
      <div class="card shadow-sm border-0 rounded-4 p-5" style="max-width: 500px; margin: 0 auto;">
        <i class="bi bi-x-circle-fill text-danger mb-3" style="font-size: 4rem;"></i>
        <h3 class="fw-bold mb-3">驗證失敗</h3>
        <p class="text-muted mb-4">{{ resultMessage }}</p>
        <RouterLink to="/" class="btn btn-outline-secondary btn-lg w-100 mb-2">回首頁</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import * as bootstrap from 'bootstrap'
import { useAuthStore } from '@/stores/auth' // 💡 1. 引入 Pinia Store

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore() // 💡 2. 實例化 Store

// 根據後端 RegisterController 設定的路由路徑
const API_URL = `${import.meta.env.VITE_API_SPOTURL}/Register` 

const status = ref('loading')
const resultMessage = ref('')
const redirectUrl = ref('/') 

onMounted(async () => {
  // 💡 確保 Pinia 的登入狀態已經初始化完畢
  if (!authStore.isInitialized) {
    await authStore.checkAuth()
  }

  const token = route.query.token

  if (!token) {
    status.value = 'error'
    resultMessage.value = '無效的驗證連結，請確認您的網址是否完整。'
    return
  }

  try {
    const response = await axios.post(`${API_URL}/verify-email`, { token: token })
    
    status.value = 'success'
    resultMessage.value = response.data.message || '信箱驗證成功！'
    
    // 接收後端傳來的跳轉路徑
    if (response.data.redirectUrl) {
      redirectUrl.value = response.data.redirectUrl
    }

    // 💡 核心邏輯：如果當下是「已登入」狀態 (例如從會員中心收信)
    if (authStore.isLoggedIn) {
      // 立刻重新向後端拉取最新 profile，這樣 Pinia 裡的 isEmailVerified 就會變成 true！
      await authStore.fetchProfile()
      
      // 如果後端沒有特別指定跳轉路徑 (預設為 '/')，我們自動將登入者的目標導向會員中心
      if (redirectUrl.value === '/') {
        redirectUrl.value = '/user-manage'
      }
    }

  } catch (error) {
    status.value = 'error'
    resultMessage.value = error.response?.data?.message || error.response?.data || '驗證連結無效或已過期，請重新發送驗證信。'
  }
})

// 💡 3. 處理驗證成功後的按鈕行為
function handleSuccessRedirect() {
  router.push(redirectUrl.value).then(() => {
    // 只有在「未登入」狀態下，才需要自動彈出登入 Modal
    if (!authStore.isLoggedIn) {
      setTimeout(() => {
        const modalEl = document.getElementById('userModal')
        if (modalEl) {
          const modal = bootstrap.Modal.getOrCreateInstance(modalEl)
          modal.show()
        }
      }, 100)
    }
  })
}
</script>

<style scoped>
.form-center { 
  min-height: 80vh; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
}
</style>