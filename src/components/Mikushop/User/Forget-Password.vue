<template>
  <div class="form-center">
    <form @submit.prevent="sendForgetPasswordForm" class="row col-12 col-md-4 d-flex">
      <div class="col-12 text-start text-md-center mb-4">
        <h2>忘記密碼</h2>
        <p class="text-muted mt-2">請輸入您的註冊信箱，我們將發送密碼重設連結給您。</p>
      </div>
      <div class="col-12 mb-3">
        <label for="validationEmail" class="form-label">信箱</label>
        <input v-model="email" type="email" class="form-control" placeholder="name@example.com" required />
      </div>
      
      <div v-if="message" class="col-12 mb-3">
        <div class="alert alert-info">{{ message }}</div>
      </div>

      <div class="col-12 mb-3">
        <button class="btn btn-primary w-100" type="submit" :disabled="isLoading">
          {{ isLoading ? '發送中...' : '送出' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-center { height: 100vh; display: flex; justify-content: center; align-items: center; }
</style>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

// 💡 對應後端的 ForgetPasswordController
const API_URL = `${import.meta.env.VITE_API_SPOTURL}/ForgetPassword`

const email = ref('')
const isLoading = ref(false)
const message = ref('')

async function sendForgetPasswordForm() {
  if (!email.value) return
  isLoading.value = true
  message.value = ''

  try {
    // 💡 現在只需要呼叫一支 API，後端會自動處理 Token 產生與寄信！
    const response = await axios.post(`${API_URL}/forgot-password`, { email: email.value })
    message.value = response.data.message
  } catch (error) {
    message.value = error.response?.data?.message || '發送失敗，請確認信箱是否正確'
  } finally {
    isLoading.value = false
  }
}
</script>