<template>
  <div
    class="modal fade"
    id="userModal"
    tabindex="-1"
    aria-labelledby="userModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="userModalLabel">登入會員</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>立即登入，隨時收到獨家優惠</p>
          <form @submit.prevent="submitForm" class="needs-validation" novalidate>
            <div class="form-floating mb-3">
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">電子郵件</label>
            </div>
            <div class="form-floating">
              <input
                v-model="password"
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">密碼</label>
            </div>
            <a href="/forgetpassword" class="float-end">忘記密碼</a>
            <button type="submit" class="btn btn-primary form-control">登入</button>
            <a href="/register">還未加入我們嗎？立即註冊！</a>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="cartModal"
    tabindex="-1"
    aria-labelledby="cartModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">您的購物車是空的</div>
        <div class="modal-footer">
          <p>共 0 件商品</p>
          <button type="button" class="btn btn-primary">查看購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- Modal -->

<script setup>
import axios from 'axios'
import { ref } from 'vue'

// 💡 這裡維持原樣！Vite 在 Cloudflare 編譯時會自動替換
const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User`

// 🐛 修正一：移除 .value，保留 ref() 物件以維持雙向綁定
const email = ref('')
const password = ref('')

async function submitForm() {
  // ajax請求使用非同步方式，可以避免網頁在請求過程中無法操作的情況
  await axios({
    method: 'post',
    url: `${API_URL}/login`,
    withCredentials: true,
    data: {
      // 🐛 修正二：在 script 區塊內取用 ref 的資料，必須加上 .value
      email: email.value,
      password: password.value
    }
  })
    .then(function (response) {
      console.log(response)
      alert(response.data)
    })
    .catch(function (error) {
      console.log(error)
      // 加上 ?. 避免後端沒回傳 data 時發生錯誤
      alert(error.response?.data || '發生未知錯誤')
    })
}
</script>
