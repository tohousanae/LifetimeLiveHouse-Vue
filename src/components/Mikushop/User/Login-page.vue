<template>
  <div class="modal fade" id="userModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">登入會員</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>立即登入，隨時收到獨家優惠</p>

          <form @submit.prevent="submitForm">
            <!-- 帳號輸入框 -->
            <div class="form-floating mb-3">
              <input v-model="email" type="email" class="form-control" :class="{'is-invalid': errorMessage}" id="floatingInput" placeholder="name@example.com" />
              <label for="floatingInput">電子郵件</label>
            </div>
            
            <!-- 密碼輸入區塊 -->
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
              
              <!-- 放置在密碼下方的小紅字錯誤提示 -->
              <div v-if="errorMessage" class="text-danger small mt-1 ms-1 text-start fw-bold">
                <i class="bi bi-exclamation-circle me-1"></i>{{ errorMessage }}
              </div>
            </div>

            <!-- 下方連結與按鈕 -->
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

  <!-- 💡 新增：登入成功的提示 Modal -->
  <div class="modal fade" id="successLoginModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title fs-6">系統提示</h5>
        </div>
        <div class="modal-body text-center py-4">
          <i class="bi bi-check-circle-fill text-success fs-1 mb-2 d-block"></i>
          <p class="mb-0 fw-bold">登入成功</p>
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
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

let successLoginModalInstance = null

onMounted(() => {
  const successEl = document.getElementById('successLoginModal')
  if (successEl) {
    successLoginModalInstance = new bootstrap.Modal(successEl)
  }
})

async function submitForm() {
  errorMessage.value = '' // 先清空先前的錯誤

  try {
    await authStore.login(email.value, password.value)
    
    // 1. 先關閉原本的登入輸入 Modal
    const modalEl = document.getElementById('userModal')
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || bootstrap.Modal.getOrCreateInstance(modalEl)
      modal.hide()
    }
    
    // 2. 彈出「登入成功」的提示 Modal
    setTimeout(() => {
      // 確保清除登入視窗帶來的背景殘留，讓成功 Modal 順利顯示
      document.querySelectorAll('.modal-backdrop').forEach((el, index) => {
        if (index > 0) el.remove() // 保留最後一個給成功 Modal 用
      })

      if (successLoginModalInstance) {
        successLoginModalInstance.show()
      }
    }, 150)
    
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.response?.data || '帳號或密碼錯誤，請重新輸入'
  }
}

// 3. 點擊登入成功 Modal 的「確定」按鈕後
function handleLoginSuccessClose() {
  // 移除焦點防止 aria-hidden 警告
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }

  if (successLoginModalInstance) {
    successLoginModalInstance.hide()
  }

  // 清除所有 Modal 背景黑幕與捲軸鎖定
  setTimeout(() => {
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
    document.body.classList.remove('modal-open')
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''

    // 如果有原本被攔截的網址則跳轉，否則留在當前頁面
    if (authStore.redirectPath) {
      router.push(authStore.redirectPath)
      authStore.redirectPath = null
    }
  }, 150)
}

function navigateFromModal(path) {
  errorMessage.value = ''
  const modalEl = document.getElementById('userModal')
  if (modalEl) {
    const modal = bootstrap.Modal.getInstance(modalEl) || bootstrap.Modal.getOrCreateInstance(modalEl)
    modal.hide()
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