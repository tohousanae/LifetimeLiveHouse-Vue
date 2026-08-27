<template>
  <div class="modal fade" id="userModal" tabindex="-1" aria-hidden="true">
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
              <!-- 💡 加入 :class="{'is-invalid': errorMessage}" 讓輸入錯時框線也會變紅 (可選) -->
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
              
              <!-- 💡 新增：放置在密碼下方的小紅字錯誤提示 -->
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
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import * as bootstrap from 'bootstrap'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

async function submitForm() {
  errorMessage.value = '' // 先清空先前的錯誤

  try {
    await authStore.login(email.value, password.value)
    
    // 登入成功，關閉 Bootstrap Modal
    const modalEl = document.getElementById('userModal')
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || bootstrap.Modal.getOrCreateInstance(modalEl)
      modal.hide()
    }
    
    // 延遲跳轉以避免黑幕殘留
    setTimeout(() => {
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
      document.body.classList.remove('modal-open')
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''

      const targetPath = authStore.redirectPath || '/user-manage'
      router.push(targetPath)
      authStore.redirectPath = null
    }, 150)
    
  } catch (error) {
    // 💡 修改：設定你指定的錯誤文字作為預設值
    errorMessage.value = error.response?.data?.message || error.response?.data || '帳號或密碼錯誤，請重新輸入'
  }
}

function navigateFromModal(path) {
  errorMessage.value = '' // 切換畫面時順便清空錯誤訊息
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