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
import axios from 'axios'
import { ref } from 'vue'

// 💡 對應後端的 LoginController
const API_URL = `${import.meta.env.VITE_API_SPOTURL}/Login`

const email = ref('')
const password = ref('')

async function submitForm() {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: email.value,
      password: password.value
    }, { withCredentials: true })
    
    alert(response.data)
    window.location.reload() // 登入成功後重整網頁以套用身分
  } catch (error) {
    alert(error.response?.data?.message || error.response?.data || '發生未知錯誤')
  }
}
</script>