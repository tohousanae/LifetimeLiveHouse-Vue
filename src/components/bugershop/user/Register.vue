<template>
  <!--註冊表單模板：https://codepen.io/1bbnuuu/pen/dyagBQz-->
  <div class="form-center">
    <form
      @submit.prevent="sendRegisterForm"
      class="row col-12 col-md-4 d-flex needs-validation"
      novalidate
    >
      <div class="col-12 text-start text-md-center mb-3">
        <h2>會員註冊</h2>
      </div>
      <div class="col-12 mb-3">
        <label for="validationCustom01" class="form-label">信箱</label>
        <input
          type="email"
          class="form-control"
          id="validationCustom01"
          placeholder="name@example.com"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">此為必填欄位</div>
      </div>
      <div class="col-12 mb-3">
        <label for="validationCustom02" class="form-label">會員名稱</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom02"
          placeholder="請填寫會員名稱"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">此為必填欄位</div>
      </div>
      <div class="col-12 mb-3">
        <label for="validationCustomUsername" class="form-label">Username</label>
        <div class="input-group has-validation">
          <input
            type="text"
            class="form-control"
            id="validationCustomUsername"
            aria-describedby="inputGroupPrepend"
            required
          />
          <div class="valid-feedback">Looks good!</div>
          <div class="invalid-feedback">此為必填欄位</div>
        </div>
      </div>
      <div class="col-12 mb-3">
        <label for="validationCustom03" class="form-label">City</label>
        <input type="text" class="form-control" id="validationCustom03" required />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">此為必填欄位</div>
      </div>
      <div class="col-12 mb-3">
        <label for="validationCustom04" class="form-label">性別</label>
        <select class="form-select" id="validationCustom04" required>
          <option selected disabled value="">請選擇...</option>
          <option>男</option>
          <option>女</option>
          <option>其他</option>
        </select>
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">此為必填欄位</div>
      </div>
      <div class="col-12 mb-3">
        <label for="validationCustom05" class="form-label">Zip</label>
        <input type="text" class="form-control" id="validationCustom05" required />
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
@import 'https://fonts.googleapis.com/css2family=Plus+Jakarta+Sans:ital,wght@0,200;0,700;1,200&display=swap';

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
let username = ref('').value
let password = ref('').value
let phoneNumber = ref('').value
let sex = ref('').value
let birthday = ref(new Date()).value
let permission = ref(1000).value
let phoneValidation = ref(false).value
let emailValidation = ref(false).value

// 送出註冊表單
async function sendRegisterForm() {
  // 前端部分密碼不進行哈希加密，而是以https來保護資料，後端再進行哈希加密，這可以防止攻擊者攔截網路請求看到哈希值後進行重放攻擊
  // 參考資料(https://academy.binance.com/zt/articles/what-is-a-replay-attack)

  // Send a POST request
  await axios({
    method: 'post',
    url: `${API_URL}/register`,
    data: {
      name: username,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      sex: sex,
      birthday: birthday,
      permission: permission,
      phoneValidation: phoneValidation,
      emailValidation: emailValidation
    }
  })
    .then(function (response) {
      console.log(response)
      alert(response.data)
    })
    .catch(function (error) {
      console.log(error)
      alert(error.response.data)
    })
}
</script>
