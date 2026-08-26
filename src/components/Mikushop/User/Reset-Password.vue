<template>
  <div class="form-center container">
    <div v-if="isValidating" class="text-center">
      <div class="spinner-border text-primary" role="status"></div>
      <h5 class="mt-3">驗證連結中...</h5>
    </div>

    <div v-else-if="!isTokenValid" class="text-center">
      <div class="alert alert-danger p-5 shadow-sm">
        <h3>❌ 連結無效或已過期</h3>
        <p>請重新申請忘記密碼。</p>
        <RouterLink to="/forgetpassword" class="btn btn-outline-danger mt-3">重新申請</RouterLink>
      </div>
    </div>

    <form v-else @submit.prevent="submitResetPassword" class="row col-12 col-md-5 d-flex needs-validation">
      <div class="col-12 text-center mb-4">
        <h2>重設密碼</h2>
      </div>

      <div class="col-12 mb-3">
        <label class="form-label">新密碼</label>
        <input v-model="newPassword" type="password" class="form-control" required placeholder="請輸入新密碼" />
      </div>

      <div class="col-12 mb-4">
        <label class="form-label">確認新密碼</label>
        <input v-model="confirmPassword" type="password" class="form-control" required placeholder="再次輸入新密碼" />
      </div>

      <div v-if="errorMessage" class="col-12 mb-3">
        <div class="alert alert-danger">{{ errorMessage }}</div>
      </div>

      <div class="col-12 mb-3 d-flex gap-2">
        <RouterLink to="/" class="btn btn-outline-secondary w-50">回首頁</RouterLink>
        <button class="btn btn-primary w-50" type="submit">確認重設</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-center { min-height: 100vh; display: flex; justify-content: center; align-items: center; }
</style>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 💡 對應後端的 ForgetPasswordController
const API_URL = `${import.meta.env.VITE_API_SPOTURL}/ForgetPassword`

const token = route.params.token // 依據你的 router 設定是 /:token
const isValidating = ref(true)
const isTokenValid = ref(false)

const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

onMounted(async () => {
  if (!token) {
    isValidating.value = false
    return
  }
  
  try {
    // 進入頁面先驗證 Token 是否有效
    await axios.post(`${API_URL}/valid-token`, { inputToken: token })
    isTokenValid.value = true
  } catch (error) {
    isTokenValid.value = false
  } finally {
    isValidating.value = false
  }
})

async function submitResetPassword() {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = '兩次輸入的密碼不一致'
    return
  }

  errorMessage.value = ''
  try {
    const response = await axios.post(`${API_URL}/reset-password`, {
      inputToken: token,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value
    })
    
    alert(response.data.message)
    router.push('/') // 重設成功導回首頁
  } catch (error) {
    errorMessage.value = error.response?.data?.message || '重設失敗'
  }
}
</script>