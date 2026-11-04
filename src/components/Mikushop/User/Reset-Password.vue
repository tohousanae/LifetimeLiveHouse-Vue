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

    <form v-else @submit.prevent="submitResetPassword" class="row col-12 col-md-5 d-flex needs-validation" novalidate>
      <div class="col-12 text-center mb-4">
        <h2>重設密碼</h2>
      </div>

      <div class="col-12 mb-3 text-start">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <label class="form-label mb-0">新密碼</label>
          <button type="button" class="btn btn-sm fw-bold px-2 py-1 shadow-sm custom-dark-green-btn" @click="generateStrongPassword">
            🎲 隨機產生
          </button>
        </div>
        <div class="input-group has-validation">
          <input v-model.trim="newPassword" 
                 :type="showPassword ? 'text' : 'password'" 
                 autocomplete="new-password"
                 class="form-control hide-validation-icon fw-bold" 
                 :class="{ 'is-valid': hasSubmitted && isPasswordValid, 'is-invalid': hasSubmitted && !isPasswordValid }" 
                 placeholder="輸入新密碼" 
                 required />
          <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
          <div class="invalid-feedback">必須包含至少1個數字、大小寫字母和特殊字元，8-16碼</div>
        </div>
      </div>

      <div class="col-12 mb-4 text-start">
        <label class="form-label">確認新密碼</label>
        <div class="input-group has-validation">
          <input v-model.trim="confirmPassword" 
                 :type="showConfirmPassword ? 'text' : 'password'" 
                 autocomplete="new-password"
                 class="form-control hide-validation-icon fw-bold" 
                 :class="{ 'is-valid': hasSubmitted && isConfirmPasswordValid, 'is-invalid': hasSubmitted && !isConfirmPasswordValid }" 
                 placeholder="確認新密碼" 
                 required />
          <button class="btn btn-outline-secondary" type="button" @click="showConfirmPassword = !showConfirmPassword">
            {{ showConfirmPassword ? '🙈' : '👁️' }}
          </button>
          <div class="invalid-feedback">確認密碼不能為空，且必須與新密碼一致</div>
        </div>
      </div>

      <div class="col-12 mb-3 d-flex gap-2 mt-2">
        <RouterLink to="/" class="btn btn-outline-secondary w-50">回首頁</RouterLink>
        <button class="btn btn-primary w-50" type="submit">確認重設</button>
      </div>
    </form>

    <!-- 💡 新增：重設密碼結果提示 Modal -->
    <div class="modal fade" id="resetResultModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title fs-6">系統提示</h5>
          </div>
          <div class="modal-body text-center py-4">
            <i v-if="isSuccess" class="bi bi-check-circle-fill text-success fs-1 mb-2 d-block"></i>
            <i v-else class="bi bi-x-circle-fill text-danger fs-1 mb-2 d-block"></i>
            <p class="mb-0 fw-bold">{{ modalMessage }}</p>
          </div>
          <div class="modal-footer justify-content-center border-0">
            <button type="button" class="btn btn-primary px-4" @click="handleModalClose">確定</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.form-center { min-height: 100vh; display: flex; justify-content: center; align-items: center; }
.hide-validation-icon.is-valid, .hide-validation-icon.is-invalid { background-image: none !important; }

.custom-dark-green-btn {
  color: #14532d;
  border: 1px solid #14532d;
  background-color: #f0fdf4;
  transition: all 0.2s ease-in-out;
}
.custom-dark-green-btn:hover {
  background-color: #14532d;
  color: #ffffff;
}
</style>

<script setup>
import axios from 'axios'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as bootstrap from 'bootstrap'

const route = useRoute()
const router = useRouter()
const API_URL = `${import.meta.env.VITE_API_SPOTURL}/ForgetPassword`

const token = route.query.token
const isValidating = ref(true)
const isTokenValid = ref(false)

const newPassword = ref('')
const confirmPassword = ref('')
const hasSubmitted = ref(false)

const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Modal 狀態控制
const isSuccess = ref(false)
const modalMessage = ref('')
let resultModalInstance = null

const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
const isPasswordValid = computed(() => newPassword.value !== '' && regexPassword.test(newPassword.value))
const isConfirmPasswordValid = computed(() => confirmPassword.value !== '' && confirmPassword.value === newPassword.value)
const isFormValid = computed(() => isPasswordValid.value && isConfirmPasswordValid.value)

onMounted(async () => {
  const modalEl = document.getElementById('resetResultModal')
  if (modalEl) {
    resultModalInstance = bootstrap.Modal.getOrCreateInstance(modalEl)
  }

  if (!token) {
    isValidating.value = false
    return
  }
  
  try {
    await axios.post(`${API_URL}/valid-token`, { inputToken: token })
    isTokenValid.value = true
  } catch (error) {
    isTokenValid.value = false
  } finally {
    isValidating.value = false
  }
})

// 💡 終極清除函數：確保離開組件時不會殘留灰底
function forceCleanupBackdrop() {
  document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
  document.body.classList.remove('modal-open')
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

onUnmounted(() => {
  forceCleanupBackdrop()
})

function generateStrongPassword() {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const num = '0123456789'
  const sym = '!@#$%^&*+-='

  let pwd = ''
  pwd += upper[Math.floor(Math.random() * upper.length)]
  pwd += lower[Math.floor(Math.random() * lower.length)]
  pwd += num[Math.floor(Math.random() * num.length)]
  pwd += sym[Math.floor(Math.random() * sym.length)]

  const all = upper + lower + num + sym
  for (let i = 0; i < 8; i++) {
    pwd += all[Math.floor(Math.random() * all.length)]
  }

  pwd = pwd.split('').sort(() => 0.5 - Math.random()).join('')

  newPassword.value = pwd
  confirmPassword.value = pwd
  showPassword.value = true
  showConfirmPassword.value = true
}

async function submitResetPassword() {
  hasSubmitted.value = true
  if (!isFormValid.value) return

  try {
    const response = await axios.post(`${API_URL}/reset-password`, {
      inputToken: token,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value
    })
    
    isSuccess.value = true
    modalMessage.value = response.data.message || '密碼重設成功！'
    resultModalInstance?.show()
  } catch (error) {
    isSuccess.value = false
    modalMessage.value = error.response?.data?.message || '重設失敗，請確認連結是否過期。'
    resultModalInstance?.show()
  }
}

function handleModalClose() {
  resultModalInstance?.hide()
  
  // 給予 Bootstrap 關閉動畫 300ms 緩衝，再進行強制清除與跳轉
  setTimeout(() => {
    forceCleanupBackdrop()
    if (isSuccess.value) {
      router.push('/')
    }
  }, 300)
}
</script>