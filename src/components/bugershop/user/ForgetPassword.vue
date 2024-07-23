<template>
  <!--註冊表單模板：https://codepen.io/1bbnuuu/pen/dyagBQz-->
  <div class="form-center">
    <form
      @submit.prevent="sendForgetPasswordForm"
      class="row col-12 col-md-4 d-flex needs-validation"
      novalidate
    >
      <div class="col-12 text-start text-md-center mb-3">
        <h2>忘記密碼</h2>
      </div>
      <div class="col-12 mb-3">
        <label for="validationEmail" class="form-label">信箱</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="validationEmail"
          placeholder="name@example.com"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">此為必填欄位</div>
      </div>
      <div class="col-12 mb-3">
        <button class="btn btn-primary" type="submit">送出</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* 置於畫面正中央 */
.form-center {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User`

// 定義表單資料變數
let email = ref('').value

// 送出註冊表單
async function sendForgetPasswordForm() {
  // 前端部分密碼不進行哈希加密，而是以https來保護資料，後端再進行哈希加密，這可以防止攻擊者攔截網路請求看到哈希值後進行重放攻擊
  // 參考資料(https://academy.binance.com/zt/articles/what-is-a-replay-attack)

  // Send a POST request
  await axios({
    method: 'post',
    url: `${API_URL}/forgetpasswordEmailSendTokenGen`,
    data: {
      email: email
    }
  })
    .then(async function (response) {
      console.log(response)
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_SPOTURL}/Mail/send`,
        data: {
          toEmail: email,
          subject: `凌晨3點漢堡店-重設密碼通知信`,
          body: `<h1>Hello World</h1><p>This is an HTML email. token:${response.data}</p>`
        }
      })
        .then(function (response) {
          console.log(response)
          alert(`已送出忘記密碼連結到${email}，請查看您的信箱`)
        })
        .catch(function (error) {
          console.log(error)
          alert(error.response.data)
        })
    })
    .catch(function (error) {
      console.log(error)
      alert(error.response.data)
    })
}
</script>
