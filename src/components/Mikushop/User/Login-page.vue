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
            <div class="form-floating mb-3">
              <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password" />
              <label for="floatingPassword">密碼</label>
            </div>
            <a href="/forgetpassword" class="float-end mb-3">忘記密碼</a>
            <button type="submit" class="btn btn-primary form-control mb-3">登入</button>
            <div class="text-center">
              <a href="/register">還未加入我們嗎？立即註冊！</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import * as bootstrap from 'bootstrap' // 💡 引入 bootstrap 控制 Modal

const email = ref('')
const password = ref('')

const authStore = useAuthStore()
const router = useRouter()

async function submitForm() {
  try {
    const message = await authStore.login(email.value, password.value)
    alert(message || '登入成功')
    
    // 1. 登入成功，關閉 Bootstrap Modal
    const modalEl = document.getElementById('userModal')
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl)
      modal?.hide()
    }
    
    // 2. 決定跳轉路徑：如果有被攔截的紀錄就去該去的地方，沒有就預設去會員中心
    const targetPath = authStore.redirectPath || '/user-manage'
    
    // 3. 執行跳轉
    router.push(targetPath)
    
    // 4. 清除紀錄
    authStore.redirectPath = null
    
  } catch (error) {
    alert(error.response?.data?.message || error.response?.data || '帳號或密碼錯誤')
  }
}
</script>