<!-- Template 保持不變 -->
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
            <div class="form-floating mb-3">
              <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
              <label for="floatingInput">電子郵件</label>
            </div>
            <div class="input-group mb-3">
              <div class="form-floating">
                <input v-model="password" :type="showPassword ? 'text' : 'password'" class="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">密碼</label>
              </div>
              <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
            <!-- 💡 加上 data-bs-dismiss="modal"，點擊時順便關閉 Modal -->
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
import { useRouter, useRoute, RouterLink } from 'vue-router' // 💡 確保有引入 useRouter
import { useAuthStore } from '@/stores/auth'
import * as bootstrap from 'bootstrap' // 💡 確保有引入 bootstrap

const email = ref('')
const password = ref('')
const showPassword = ref(false) // 💡 新增這行：預設隱藏密碼

const authStore = useAuthStore()
const router = useRouter() // 💡 必須實例化 router，下面的 router.push 才會動！
const route = useRoute()

async function submitForm() {
  try {
    const message = await authStore.login(email.value, password.value)
    alert(message || '登入成功')
    
    // 登入成功，關閉 Bootstrap Modal
    const modalEl = document.getElementById('userModal')
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl)
      modal?.hide()
    }
    
    const targetPath = authStore.redirectPath || '/user-manage'
    router.push(targetPath)
    authStore.redirectPath = null
    
  } catch (error) {
    alert(error.response?.data?.message || error.response?.data || '帳號或密碼錯誤')
  }
}

// 💡 終極版跳轉函式：先關視窗，等動畫跑完再換頁
// 💡 終極版跳轉函式：強制清除 Bootstrap 殘留黑幕與鎖定狀態
function navigateFromModal(path) {
  const modalEl = document.getElementById('userModal')
  if (modalEl) {
    const modal = bootstrap.Modal.getInstance(modalEl) || bootstrap.Modal.getOrCreateInstance(modalEl)
    modal.hide() // 觸發關閉視窗
  }
  
  // 💡 關鍵解法：延遲 150 毫秒後，手動強制打掃戰場
  setTimeout(() => {
    // 1. 強制清除畫面上所有殘留的 Bootstrap 半透明黑幕
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
    
    // 2. 解除 body 的鎖定狀態與滾動限制
    document.body.classList.remove('modal-open')
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''

    // 3. 安全無誤地進行 Vue Router 換頁
    router.push(path)
  }, 150)
}
</script>