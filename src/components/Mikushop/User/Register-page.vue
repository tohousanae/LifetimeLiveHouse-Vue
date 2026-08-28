<template>
  <div class="form-center container">
    <!-- 💡 修正 1：加上 my-auto (安全置中) 與 py-5 (上下留白)，確保空間不夠時能正常滾動不被裁切 -->
    <form @submit.prevent="submitRegisterForm" class="row col-12 col-md-6 d-flex needs-validation my-auto py-5" novalidate>
      <div class="col-12 text-center mb-3">
        <h2>會員註冊</h2>
      </div>

      <!-- 信箱 -->
      <div class="col-12 mb-3 text-start">
        <label for="validationEmail" class="form-label">信箱</label>
        <input v-model.trim="inputEmail" type="email" class="form-control" :class="{ 'is-valid': hasSubmitted && isEmailValid, 'is-invalid': hasSubmitted && !isEmailValid }" placeholder="name@example.com" required />
        <div class="invalid-feedback">信箱不能為空，且格式必須正確，最多 30 字元</div>
      </div>

      <!-- 會員名稱 -->
      <div class="col-12 mb-3 text-start">
        <label for="validationCustomUsername" class="form-label">會員名稱</label>
        <input v-model.trim="inputName" 
        type="text" 
        class="form-control" 
        placeholder="請填寫會員名稱" 
        :class="{ 'is-valid': hasSubmitted && isUsernameValid, 
        'is-invalid': hasSubmitted && !isUsernameValid }" 
        required 
        autocomplete="username"/>
        <div class="invalid-feedback">會員名稱不能為空，長度必須在 1 到 40 字元之間</div>
      </div>

      <!-- 密碼 -->
      <div class="col-12 mb-3 text-start">
        <label for="validationPassword" class="form-label">密碼</label>
        <div class="input-group has-validation">
          <input v-model.trim="inputPassword" 
          :type="showPassword ? 'text' : 'password'" 
          autocomplete="new-password"
          class="form-control hide-validation-icon" 
          :class="{ 'is-valid': hasSubmitted && isPasswordValid, 'is-invalid': hasSubmitted && !isPasswordValid }" 
          placeholder="輸入密碼" 
          required />
          <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">{{ showPassword ? '🙈' : '👁️' }}</button>
          <div class="invalid-feedback">必須包含至少1個數字、大小寫字母和特殊字元，8-16碼</div>
        </div>
      </div>

      <!-- 確認密碼 -->
      <div class="col-12 mb-3 text-start">
        <label for="validationPasswordConfirm" class="form-label">確認密碼</label>
        <div class="input-group has-validation">
          <input v-model.trim="inputPasswordConfirm" 
          :type="showPasswordConfirm ? 'text' : 'password'" 
          autocomplete="new-password"
          class="form-control hide-validation-icon" 
          :class="{ 'is-valid': hasSubmitted && isPasswordConfirmValid, 'is-invalid': hasSubmitted && !isPasswordConfirmValid }" 
          placeholder="確認密碼" 
          required />
          <button class="btn btn-outline-secondary" type="button" @click="showPasswordConfirm = !showPasswordConfirm">{{ showPasswordConfirm ? '🙈' : '👁️' }}</button>
          <div class="invalid-feedback">確認密碼不能為空，且必須與密碼一致</div>
        </div>
      </div>

      <!-- 生日 (已經移除性別) -->
      <div class="col-12 mb-3 text-start">
        <label for="validationBirthday" class="form-label">生日</label>
        <input v-model.trim="inputBirthday" type="datetime-local" class="form-control" :class="{ 'is-valid': hasSubmitted && isBirthdayValid, 'is-invalid': hasSubmitted && !isBirthdayValid }" required />
        <div class="invalid-feedback">請選擇生日</div>
      </div>

      <div v-if="errorMessage" class="col-12 mb-3 text-start">
        <div class="alert alert-danger" role="alert">{{ errorMessage }}</div>
      </div>

      <div class="col-12 mb-3 d-flex gap-2">
        <RouterLink to="/" class="btn btn-outline-secondary w-50">回首頁</RouterLink>
        <button class="btn btn-primary w-50" type="submit">註冊</button>
      </div>
    </form>

    <!-- 註冊成功的 Modal -->
    <div class="modal fade" ref="successModalRef" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header"><h5 class="modal-title">註冊成功</h5></div>
          <div class="modal-body text-center"><p>註冊成功！請至信箱收取驗證信。</p></div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-primary" @click="goToHome">確認並回首頁</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-center { 
  min-height: 100vh; 
  display: flex; 
  justify-content: center; 
  /* 💡 修正 2：移除 align-items: center; 這是造成內容過長時上下被鎖死裁切的元凶 */
  padding: 15px; 
}
.hide-validation-icon.is-valid, .hide-validation-icon.is-invalid { background-image: none !important; }
</style>

<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import * as bootstrap from 'bootstrap'

const successModalRef = ref(null)
let successModal = null

onMounted(() => {
  if (successModalRef.value) successModal = new bootstrap.Modal(successModalRef.value)
})

function goToHome() {
  if (successModal) successModal.hide()
  window.location.href = '/'
}

const inputEmail = ref('')
const inputName = ref('')
const inputPassword = ref('')
const inputPasswordConfirm = ref('')
const inputBirthday = ref('')

const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const hasSubmitted = ref(false)
const errorMessage = ref('') 

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/

const isEmailValid = computed(() => inputEmail.value !== '' && regexEmail.test(inputEmail.value) && inputEmail.value.length <= 30)
const isUsernameValid = computed(() => inputName.value.length >= 1 && inputName.value.length <= 40)
const isPasswordValid = computed(() => inputPassword.value !== '' && regexPassword.test(inputPassword.value))
const isPasswordConfirmValid = computed(() => inputPasswordConfirm.value !== '' && inputPasswordConfirm.value === inputPassword.value)
const isBirthdayValid = computed(() => inputBirthday.value !== '')

const isFormValid = computed(() => isEmailValid.value && isUsernameValid.value && isPasswordValid.value && isPasswordConfirmValid.value && isBirthdayValid.value)

// 對應後端的 RegisterController
const API_URL = `${import.meta.env.VITE_API_SPOTURL}/Register`

async function submitRegisterForm() {
  hasSubmitted.value = true 
  errorMessage.value = '' 
  if (!isFormValid.value) return

  try {
    const redirectTarget = '/user-center'
    const response = await axios({
      method: 'post',
      url: `${API_URL}/postRegisterMember?redirectUrl=${encodeURIComponent(redirectTarget)}`,
      data: {
        name: inputName.value,
        email: inputEmail.value,
        password: inputPassword.value,
        birthday: inputBirthday.value
      } 
    })
    
    if (successModal) successModal.show()
  } catch (error) {
    errorMessage.value = error.response?.data || '發生未知錯誤，請確認網路連線或稍後再試。'
  }
}
</script>