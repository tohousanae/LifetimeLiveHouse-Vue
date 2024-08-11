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
import { useRouter } from 'vue-router'

const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User`
const router = useRouter()

// 定義表單資料變數
let email = ref('').value

// 送出註冊表單
async function sendForgetPasswordForm() {
  try {
    // 發送第一個 POST 請求
    const response = await axios.post(`${API_URL}/forgetpasswordEmailSendTokenGen`, {
      email: email
    })
    console.log(response)

    // 動態添加路由
    const randomPath = `${window.location.origin}/${response.data}`
    router.addRoute({
      path: randomPath,
      component: () => import('@/components/bugershop/user/ResetPasswordForm.vue')
    })

    // 發送第二個 POST 請求
    const mailResponse = await axios.post(`${import.meta.env.VITE_API_SPOTURL}/Mail/send`, {
      toEmail: email,
      subject: `凌晨3點漢堡店-重設密碼通知信`,
      body: ` <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>重設密碼</title>
              </head>
              <body>
                <p>${email}您好</p>
                <p>密碼重置連結為：</p>
                <p><a href="${randomPath}">${randomPath}</a></p>
                <p>連結有效期限為30分鐘，請在30分鐘內完成完成重設密碼操作，否則連結失效。</p>
                <hr>
                <p>本信件為系統自動發出，請勿回覆</p>
              </body>
              </html>`
    })
    console.log(mailResponse)
    alert(`已送出忘記密碼連結到${email}，請查看您的信箱`)
  } catch (error) {
    console.log(error)
    alert(error.response.data)
  }
}
</script>
