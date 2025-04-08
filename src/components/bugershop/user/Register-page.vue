<template>
  <!--註冊表單模板：https://codepen.io/1bbnuuu/pen/dyagBQz-->
  <!--主導覽列-->
  <Navbar></Navbar>
  <!--主導覽列-->
  <div class="form-center">
    <form
      @submit.prevent="submitRegisterForm"
      class="row col-12 col-md-4 d-flex needs-validation"
      novalidate
    >
      <div class="col-12 text-start text-md-center mb-3">
        <h2>會員註冊</h2>
      </div>
      <div class="col-12 mb-3">
        <label for="validationEmail" class="form-label">信箱</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          :class="{'is-valid': isEmailValid, 'is-invalid': !isEmailValid}"
          id="validationEmail"
          placeholder="name@example.com"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">信箱格式不正確</div>
      </div>
      <div class="col-12 mb-3">
        <label for="validationCustomUsername" class="form-label">會員名稱</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="validationCustomUsername"
          placeholder="請填寫會員名稱"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">此為必填欄位</div>
      </div>
      <div class="col-md-12 mb-3">
        <label for="validationPhone" class="form-label">手機號碼</label>
        <div class="input-group has-validation">
          <input
            v-model="phoneNumber"
            type="text"
            class="form-control"
            id="validationPhone"
            placeholder="請填寫手機號碼"
            aria-describedby="inputGroupPrepend"
            required
          />
          <div class="valid-feedback">Looks good!</div>
          <div class="invalid-feedback">此為必填欄位</div>
        </div>
      </div>

      <div class="col-md-8 mb-3">
        <label for="validationSMS" class="form-label">簡訊驗證碼</label>
        <div class="input-group has-validation">
          <input
            type="text"
            class="form-control"
            id="validationSMS"
            placeholder="輸入簡訊驗證碼"
            aria-describedby="inputGroupPrepend"
            required
          />
          <button type="button" class="btn btn-primary">獲取簡訊驗證碼</button>
          <div class="valid-feedback">Looks good!</div>
          <div class="invalid-feedback">此為必填欄位</div>
        </div>
      </div>
      <div class="col-12 mb-3">
        <label for="validationPassword" class="form-label">密碼</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="validationPassword"
          placeholder="輸入密碼"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">此為必填欄位</div>
      </div>
      <div class="col-12 mb-3">
        <label for="validationPasswordConfirm" class="form-label">確認密碼</label>
        <input
          v-model="passwordConfirm"
          placeholder="確認密碼"
          type="password"
          class="form-control"
          id="validationPasswordConfirm"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">此為必填欄位</div>
      </div>
      <div class="col-12 mb-3">
        <label for="validationSex" class="form-label">性別</label>
        <select v-model="sex" class="form-select" id="validationSex" required>
          <option selected disabled value="">請選擇...</option>
          <option>男</option>
          <option>女</option>
          <option>其他</option>
        </select>
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">此為必填欄位</div>
      </div>
      <div class="col-12 mb-3">
        <label for="validationBirthday" class="form-label">生日</label>
        <input
          v-model="birthday"
          type="datetime-local"
          class="form-control"
          id="validationBirthday"
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

  <!--footer區域-->
  <end></end>
  <!--footer區域-->
</template>

<style scoped>
/* 置於畫面正中央 */
.form-center {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 自定義成功提示文字顏色 */
.valid-feedback {
  color: #008d00; /* 設定為綠色 */
}
</style>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import Navbar from '@/components/bugershop/Navbar-page.vue'
import end from '@/components/bugershop/end-page.vue'

// 定義表單資料變數
let email = ref('').value
let username = ref('').value
let password = ref('').value
let passwordConfirm = ref('').value
let phoneNumber = ref('').value
let sex = ref('').value
let birthday = ref(new Date()).value

// 使用 import.meta.env.VITE_API_SPOTURL 環境變數來獲取 API 的基本 URL
const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User`

// 信箱格式驗證規則：必須包含 @ 符號，並且 @ 符號後面必須有至少一個字元和一個點號，點號後面必須有至少兩個字元
let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// 密碼高強度驗證規則：至少8個字元，包含至少1個數字、1個大寫字母、1個小寫字母和1個特殊字元，並且不包含空格
let regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/

// 電話號碼格式驗證規則：台灣手機號碼格式，開頭為09，後面9位數字
let regexPhoneNumber = /^09\d{8}$/

// 儲存驗證結果
let isEmailValid = regexEmail.test(email)
let isPasswordValid = regexPassword.test(password)
let isPhoneNumberValid = regexPhoneNumber.test(phoneNumber)

async function submitRegisterForm() {

  if (isEmailValid && isPasswordValid && password === passwordConfirm && isPhoneNumberValid) {
    // 如果前端驗證成功，則進行AJAX請求
    // 前端部分密碼不進行哈希加密，而是以https來保護資料，後端再進行哈希加密，這可以防止攻擊者攔截網路請求看到哈希值後進行重放攻擊
    // 參考資料(https://academy.binance.com/zt/articles/what-is-a-replay-attack)
    await axios({
      method: 'post',
      url: `${API_URL}/register`,
      data: {
        name: username,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        sex: sex,
        birthday: birthday
      }
    })
      .then(function (response) {
        console.log(response)
        alert(response.data)
        window.location.href = '/'
      })
      .catch(function (error) {
        console.log(error)
        alert(error.response.data)
      })
  } else {
    // 如果驗證失敗，則顯示錯誤訊息
    if (!isEmailValid) {
      console.log('信箱格式不正確')
    }
    if (!isPasswordValid) {
      console.log(
        '密碼格式不正確，必須包含至少1個數字、1個大寫字母、1個小寫字母和1個特殊字元，並且不包含空格'
      )
    }
    if (password !== passwordConfirm) {
      console.log('密碼與確認密碼不一致')
    }
    if (!isPhoneNumberValid) {
      console.log('手機號碼格式不正確，必須為09開頭的10位數字')
    }
  }
}
</script>
