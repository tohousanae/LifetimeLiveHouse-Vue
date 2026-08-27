<template>
  <!-- ================= 1. 會員登入互動 Modal ================= -->
  <div class="modal fade" id="userModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">登入會員</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="$event.target.blur()"></button>
        </div>
        <div class="modal-body">
          <p class="text-muted mb-3">立即登入，隨時收到獨家優惠</p>

          <!-- 登入表單 (引用註冊畫面的驗證邏輯與 novalidate) -->
          <form @submit.prevent="submitForm" class="needs-validation" novalidate>
            <!-- 帳號 (電子郵件) 輸入框 -->
            <div class="mb-3 text-start">
              <label for="floatingInput" class="form-label">電子郵件</label>
              <input 
                v-model.trim="email" 
                type="email" 
                class="form-control" 
                :class="{ 'is-invalid': hasSubmitted && !isEmailValid }" 
                id="floatingInput" 
                placeholder="name@example.com" 
                required 
              />
              <div class="invalid-feedback">信箱不能為空，且格式必須正確</div>
            </div>
            
            <!-- 密碼輸入區塊 -->
            <div class="mb-3 text-start">
              <label for="floatingPassword" class="form-label">密碼</label>
              <div class="input-group has-validation">
                <input 
                  v-model.trim="password" 
                  :type="showPassword ? 'text' : 'password'" 
                  class="form-control hide-validation-icon" 
                  :class="{ 'is-invalid': hasSubmitted && !isPasswordValid }" 
                  id="floatingPassword" 
                  placeholder="請輸入密碼" 
                  required 
                />
                <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
                  {{ showPassword ? '🙈' : '👁️' }}
                </button>
                <div class="invalid-feedback">密碼不能為空</div>
              </div>
            </div>

            <!-- 💡 後端錯誤訊息顯示區塊：使用 Bootstrap Alert 取代直接貼上原始 JSON -->
            <div v-if="errorMessage" class="mb-3 text-start">
              <div class="alert alert-danger py-2 small mb-0" role="alert">
                <i class="bi bi-exclamation-circle me-1"></i>{{ errorMessage }}
              </div>
            </div>

            <!-- 下方輔助連結與登入按鈕 -->
            <a href="javascript:;" class="float-end mb-3 small" @click="navigateFromModal('/forgetpassword')">忘記密碼</a>
            <button type="submit" class="btn btn-primary w-100 mb-3">登入</button>
            <div class="text-center">
              <a href="javascript:;" class="small" @click="navigateFromModal('/register')">還未加入我們嗎？立即註冊！</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- ================= 2. 登入成功提示 Modal ================= -->
  <div class="modal fade" id="successLoginModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title fs-6">系統提示</h5>
        </div>
        <div class="modal-body text-center py-4">
          <i class="bi bi-check-circle-fill text-success fs-1 mb-2 d-block"></i>
          <p class="mb-0 fw-bold">登入成功，歡迎回來！</p>
        </div>
        <div class="modal-footer justify-content-center border-0">
          <button type="button" class="btn btn-primary px-4" @click="handleLoginSuccessClose">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 避免密碼輸入框旁邊的驗證圖示跟眼球按鈕打架 */
.hide-validation-icon.is-invalid {
  background-image: none !important;
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import * as bootstrap from 'bootstrap'

// 表單雙向繫結變數
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const hasSubmitted = ref(false) // 💡 引入註冊畫面的送出狀態旗標
const errorMessage = ref('') 

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// Modal 實例與串接旗標[cite: 10]
let userModalInstance = null
let successLoginModalInstance = null
let showSuccessWhenHidden = false 

// 💡 引入註冊畫面的驗證規則與 computed 邏輯[cite: 15]
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const isEmailValid = computed(() => email.value !== '' && regexEmail.test(email.value))
const isPasswordValid = computed(() => password.value !== '')
const isFormValid = computed(() => isEmailValid.value && isPasswordValid.value)

onMounted(() => {
  const userEl = document.getElementById('userModal')
  if (userEl) {
    userModalInstance = new bootstrap.Modal(userEl)

    userEl.addEventListener('hidden.bs.modal', () => {
      if (showSuccessWhenHidden) {
        showSuccessWhenHidden = false
        if (successLoginModalInstance) {
          successLoginModalInstance.show()
        }
      }
    })
  }

  const successEl = document.getElementById('successLoginModal')
  if (successEl) {
    successLoginModalInstance = new bootstrap.Modal(successEl)
  }
})

// 送出登入表單[cite: 10]
async function submitForm() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }

  hasSubmitted.value = true // 💡 觸發驗證紅框與提示[cite: 15]
  errorMessage.value = '' 

  // 如果前端格式驗證不通過，直接攔截不送出 API[cite: 15]
  if (!isFormValid.value) return

  try {
    await authStore.login(email.value, password.value)
    
    showSuccessWhenHidden = true

    if (userModalInstance) {
      userModalInstance.hide()
    }
    
  } catch (error) {
    // 💡 修正原本直接把 error.response?.data (原始 JSON) 貼上的問題，改顯示友善的提示文字[cite: 14]
    errorMessage.value = '帳號或密碼錯誤，請重新輸入'
  }
}

// 點擊登入成功 Modal 的「確定」按鈕後[cite: 10]
function handleLoginSuccessClose() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }

  if (successLoginModalInstance) {
    successLoginModalInstance.hide()
  }

  setTimeout(() => {
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
    document.body.classList.remove('modal-open')
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''

    if (authStore.redirectPath) {
      router.push(authStore.redirectPath)
      authStore.redirectPath = null
    }
  }, 150)
}

// 點擊 Modal 內的切換連結 (如忘記密碼、註冊)
function navigateFromModal(path) {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
  
  hasSubmitted.value = false // 切換時重置驗證狀態
  errorMessage.value = ''
  email.value = ''
  password.value = ''
  showSuccessWhenHidden = false 

  if (userModalInstance) {
    userModalInstance.hide()
  }
  
  setTimeout(() => {
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
    document.body.classList.remove('modal-open')
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''

    router.push(path)
  }, 150)
}
</script>