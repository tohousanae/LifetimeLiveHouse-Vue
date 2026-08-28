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

          <!-- 登入表單 -->
          <form @submit.prevent="submitForm" class="needs-validation" novalidate>
            <!-- 帳號 (電子郵件) 輸入框 -->
            <div class="mb-3 text-start">
              <label for="floatingInput" class="form-label">電子郵件</label>
                <!-- 信箱輸入框 (加上 autocomplete="username") -->
                <input 
                  v-model.trim="email" 
                  type="email" 
                  autocomplete="username"
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
                  autocomplete="current-password"
                  required 
                />
                <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
                  {{ showPassword ? '🙈' : '👁️' }}
                </button>
                <div class="invalid-feedback">密碼不能為空</div>
              </div>
            </div>

            <!-- 錯誤訊息提示區塊 -->
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
.hide-validation-icon.is-invalid {
  background-image: none !important;
}
</style>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import * as bootstrap from 'bootstrap'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const hasSubmitted = ref(false)
const errorMessage = ref('') 

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

let userModalInstance = null
let successLoginModalInstance = null
let showSuccessWhenHidden = false 
let pendingRoute = null // 💡 關鍵新增：紀錄視窗關閉後要去哪裡

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const isEmailValid = computed(() => email.value !== '' && regexEmail.test(email.value))
const isPasswordValid = computed(() => password.value !== '')
const isFormValid = computed(() => isEmailValid.value && isPasswordValid.value)

onMounted(() => {
  const userEl = document.getElementById('userModal')
  if (userEl) {
    userModalInstance = new bootstrap.Modal(userEl)

    // 💡 核心防護：監聽登入視窗「完全關閉且解鎖捲軸」的事件
    userEl.addEventListener('hidden.bs.modal', () => {
      // 情境 A：接力開啟登入成功提示
      if (showSuccessWhenHidden) {
        showSuccessWhenHidden = false
        if (successLoginModalInstance) {
          successLoginModalInstance.show()
        }
      } 
      // 情境 B：接力換頁 (例如去註冊頁)
      else if (pendingRoute) {
        const target = pendingRoute
        pendingRoute = null
        router.push(target) // 確保 Bootstrap 清理完捲軸鎖定後才換頁
      }
    })
  }

  const successEl = document.getElementById('successLoginModal')
  if (successEl) {
    successLoginModalInstance = new bootstrap.Modal(successEl)
    
    // 成功視窗關閉後的跳轉
    successEl.addEventListener('hidden.bs.modal', () => {
      if (authStore.redirectPath) {
        const target = authStore.redirectPath
        authStore.redirectPath = null
        router.push(target)
      }
    })
  }
})

// 💡 終極安全網：如果元件被 Vue 強制卸載，確保解除所有鎖定
onUnmounted(() => {
  document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
  document.body.classList.remove('modal-open')
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
})

async function submitForm() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }

  hasSubmitted.value = true 
  errorMessage.value = '' 

  if (!isFormValid.value) return

  try {
    await authStore.login(email.value, password.value)
    showSuccessWhenHidden = true // 準備接力開啟成功框

    if (userModalInstance) {
      userModalInstance.hide() // 關閉自己，等待 hidden 事件接手
    }
  } catch (error) {
    errorMessage.value = '帳號或密碼錯誤，請重新輸入'
  }
}

function handleLoginSuccessClose() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
  if (successLoginModalInstance) {
    successLoginModalInstance.hide()
  }
}

// 點擊「註冊」或「忘記密碼」時的跳轉邏輯
function navigateFromModal(path) {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
  
  hasSubmitted.value = false 
  errorMessage.value = ''
  email.value = ''
  password.value = ''
  showSuccessWhenHidden = false 

  if (userModalInstance) {
    pendingRoute = path // 紀錄目的地
    userModalInstance.hide() // 關閉視窗，後續換頁交給 hidden.bs.modal 處理
  } else {
    router.push(path)
  }
}
</script>