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
          <p>立即登入，隨時收到獨家優惠</p>

          <!-- 登入表單 (攔截預設提交，改用非同步 submitForm) -->
          <form @submit.prevent="submitForm">
            <!-- 帳號 (電子郵件) 輸入框 -->
            <div class="form-floating mb-3">
              <input v-model="email" type="email" class="form-control" :class="{'is-invalid': errorMessage}" id="floatingInput" placeholder="name@example.com" />
              <label for="floatingInput">電子郵件</label>
            </div>
            
            <!-- 密碼輸入區塊 (含顯示/隱藏密碼切換按鈕) -->
            <div class="mb-3">
              <div class="input-group">
                <div class="form-floating">
                  <input v-model="password" :type="showPassword ? 'text' : 'password'" class="form-control" :class="{'is-invalid': errorMessage}" id="floatingPassword" placeholder="Password" />
                  <label for="floatingPassword">密碼</label>
                </div>
                <button class="btn btn-outline-secondary" :class="{'border-danger text-danger': errorMessage}" type="button" @click="showPassword = !showPassword">
                  {{ showPassword ? '🙈' : '👁️' }}
                </button>
              </div>
              
              <!-- 錯誤訊息提示紅字 -->
              <div v-if="errorMessage" class="text-danger small mt-1 ms-1 text-start fw-bold">
                <i class="bi bi-exclamation-circle me-1"></i>{{ errorMessage }}
              </div>
            </div>

            <!-- 下方輔助連結與登入按鈕 -->
            <a href="javascript:;" class="float-end mb-3" @click="navigateFromModal('/forgetpassword')">忘記密碼</a>
            <button type="submit" class="btn btn-primary form-control mb-3">登入</button>
            <div class="text-center">
              <a href="javascript:;" @click="navigateFromModal('/register')">還未加入我們嗎？立即註冊！</a>
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

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import * as bootstrap from 'bootstrap'

// 表單雙向繫結變數
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// Modal 實例與串接旗標[cite: 10]
let userModalInstance = null
let successLoginModalInstance = null
let showSuccessWhenHidden = false // 💡 控制登入視窗關閉後才彈出成功框的旗標[cite: 10]

onMounted(() => {
  // 1. 初始化登入 Modal 並監聽其關閉事件
  const userEl = document.getElementById('userModal')
  if (userEl) {
    userModalInstance = new bootstrap.Modal(userEl)

    // 💡 關鍵防護：當登入視窗完全收合後，才安全地呼叫成功提示框[cite: 10]
    userEl.addEventListener('hidden.bs.modal', () => {
      if (showSuccessWhenHidden) {
        showSuccessWhenHidden = false
        if (successLoginModalInstance) {
          successLoginModalInstance.show()
        }
      }
    })
  }

  // 2. 初始化登入成功 Modal[cite: 10]
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

  errorMessage.value = '' // 清除先前的錯誤

  try {
    await authStore.login(email.value, password.value)
    
    // 設定旗標準備接力開啟成功提示框[cite: 10]
    showSuccessWhenHidden = true

    // 隱藏登入 Modal[cite: 10]
    if (userModalInstance) {
      userModalInstance.hide()
    }
    
  } catch (error) {
    // 擷取後端回傳的錯誤訊息
    errorMessage.value = error.response?.data?.message || error.response?.data || '帳號或密碼錯誤，請重新輸入'
  }
}

// 3. 點擊登入成功 Modal 的「確定」按鈕後[cite: 10]
function handleLoginSuccessClose() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }

  if (successLoginModalInstance) {
    successLoginModalInstance.hide()
  }

  // 💡 強制清除黑幕與鎖定，並將使用者導向原本被攔截的網址[cite: 10]
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
  
  errorMessage.value = ''
  showSuccessWhenHidden = false // 取消連動

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