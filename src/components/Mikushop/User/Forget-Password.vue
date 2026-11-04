<template>
  <div class="form-center container">
    <!-- 💡 將表單寬度改為與註冊畫面一致的 col-md-6 -->
    <form @submit.prevent="sendForgetPasswordForm" class="row col-12 col-md-6 d-flex needs-validation my-auto py-5" novalidate>
      
      <!-- 💡 對齊註冊畫面的標題間距 (mb-3) -->
      <div class="col-12 text-center mb-3">
        <h2>忘記密碼</h2>
        <p class="text-muted mt-2">請輸入您的註冊信箱，我們將發送密碼重設連結給您。</p>
      </div>
      
      <!-- 信箱 -->
      <div class="col-12 mb-3 text-start">
        <label for="validationEmail" class="form-label">信箱</label>
        <input 
          v-model.trim="email" 
          type="email" 
          autocomplete="email"
          class="form-control" 
          :class="{ 'is-valid': hasSubmitted && isEmailValid, 'is-invalid': hasSubmitted && !isEmailValid }" 
          placeholder="name@example.com" 
          required 
        />
        <div class="invalid-feedback">信箱不能為空，且格式必須正確，最多 30 字元</div>
      </div>
      
      <!-- 提示訊息區塊 -->
      <div v-if="message" class="col-12 mb-3 text-start">
        <div class="alert py-2 small mb-0" :class="isSuccess ? 'alert-success' : 'alert-danger'" role="alert">
          <i class="bi me-1" :class="isSuccess ? 'bi-check-circle-fill' : 'bi-exclamation-circle'"></i>
          {{ message }}
        </div>
      </div>

      <!-- 按鈕區塊 -->
      <div class="col-12 mb-3 d-flex gap-2">
        <RouterLink to="/" class="btn btn-outline-secondary w-50">回首頁</RouterLink>
        <button class="btn btn-primary w-50" type="submit" :disabled="isLoading">
          {{ isLoading ? '發送中...' : '送出' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* 💡 完全比照註冊畫面的 CSS 結構 */
.form-center { 
  min-height: 100vh; 
  display: flex; 
  justify-content: center; 
  padding: 15px; 
}
.hide-validation-icon.is-valid, .hide-validation-icon.is-invalid { 
  background-image: none !important; 
}
</style>

<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'

const API_URL = `${import.meta.env.VITE_API_SPOTURL}/ForgetPassword`

const email = ref('')
const isLoading = ref(false)
const message = ref('')

const hasSubmitted = ref(false) 
const isSuccess = ref(false) 

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const isEmailValid = computed(() => email.value !== '' && regexEmail.test(email.value) && email.value.length <= 30)

async function sendForgetPasswordForm() {
  hasSubmitted.value = true 
  message.value = ''
  
  if (!isEmailValid.value) return

  isLoading.value = true

  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email: email.value })
    isSuccess.value = true 
    message.value = response.data.message
  } catch (error) {
    isSuccess.value = false 
    message.value = error.response?.data?.message || '發送失敗，請確認信箱是否正確'
  } finally {
    isLoading.value = false
  }
}
</script>