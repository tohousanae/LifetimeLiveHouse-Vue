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
        <button class="btn btn-primary btn-lg w-100" @click="goToLogin">
          立即登入
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

const route = useRoute()
const router = useRouter()

// 根據後端 RegisterController 設定的路由路徑
const API_URL = `${import.meta.env.VITE_API_SPOTURL}/Register` 

// 狀態控制：'loading' | 'success' | 'error'
const status = ref('loading')
const resultMessage = ref('')
const redirectUrl = ref('/') // 預設跳轉回首頁

onMounted(async () => {
  const token = route.query.token

  // 如果網址沒有帶 token，直接判定失敗
  if (!token) {
    status.value = 'error'
    resultMessage.value = '無效的驗證連結，請確認您的網址是否完整。'
    return
  }

  try {
    // 呼叫後端 API (後端要求用 POST 傳遞 JSON Body)
    const response = await axios.post(`${API_URL}/verify-email`, { token: token })
    
    // 驗證成功
    status.value = 'success'
    resultMessage.value = response.data.message || '信箱驗證成功！'
    
    // 接收後端智慧解析的跳轉路徑 (預設為 '/')
    if (response.data.redirectUrl) {
      redirectUrl.value = response.data.redirectUrl
    }

  } catch (error) {
    // 驗證失敗 (例如過期、Token 錯誤)
    status.value = 'error'
    resultMessage.value = error.response?.data?.message || error.response?.data || '驗證連結無效或已過期，請重新發送驗證信。'
  }
})

// 驗證成功後，跳轉並開啟登入視窗
function goToLogin() {
  // 1. 跳轉到後端指定的路徑
  router.push(redirectUrl.value).then(() => {
    // 2. 給予一點延遲，確保頁面渲染完成後，主動彈出登入 Modal
    setTimeout(() => {
      const modalEl = document.getElementById('userModal')
      if (modalEl) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl)
        modal.show()
      }
    }, 100)
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