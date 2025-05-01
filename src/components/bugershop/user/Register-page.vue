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

      <!-- 信箱 -->
      <!-- .trim去除輸入值兩端空格 -->
      <div class="col-12 mb-3">
        <label for="validationEmail" class="form-label">信箱</label>
        <input
          v-model.trim="email"
          type="email"
          class="form-control"
          :class="{ 'is-valid': isEmailValid, 'is-invalid': !isEmailValid && email !== '' }"
          id="validationEmail"
          placeholder="name@example.com"
          @input="validateEmail"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">信箱格式不正確</div>
      </div>

      <!-- 會員名稱 -->
      <div class="col-12 mb-3">
        <label for="validationCustomUsername" class="form-label">會員名稱</label>
        <input
          v-model.trim="name"
          type="text"
          class="form-control"
          id="validationCustomUsername"
          placeholder="請填寫會員名稱"
          @input="validateUsername"
          :class="{
            'is-valid': isUsernameValid,
            'is-invalid': !isUsernameValid && name !== ''
          }"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">會員名稱至少1字元，最多64字元</div>
      </div>

      <!-- 手機號碼 -->
      <div class="col-md-12 mb-3">
        <label for="validationPhone" class="form-label">手機號碼</label>
        <div class="input-group has-validation">
          <input
            v-model.trim="phoneNumber"
            type="text"
            class="form-control"
            :class="{
              'is-valid': isPhoneNumberValid,
              'is-invalid': !isPhoneNumberValid && phoneNumber !== ''
            }"
            id="validationPhone"
            placeholder="請填寫手機號碼"
            @input="validatePhoneNumber"
            required
          />
          <div class="valid-feedback">Looks good!</div>
          <div class="invalid-feedback">手機號碼格式不正確，必須為09開頭的10位數字</div>
        </div>
      </div>

      <!-- 簡訊驗證碼 -->
      <div class="col-md-8 mb-3">
        <label for="validationSMS" class="form-label">簡訊驗證碼</label>
        <div class="input-group has-validation">
          <input
            v-model.trim="smsCode"
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

      <!-- 密碼 -->
      <div class="col-12 mb-3">
        <label for="validationPassword" class="form-label">密碼</label>
        <input
          v-model.trim="password"
          type="password"
          class="form-control"
          :class="{
            'is-valid': isPasswordValid,
            'is-invalid': !isPasswordValid && password !== ''
          }"
          id="validationPassword"
          placeholder="輸入密碼"
          @input="validatePassword"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">
          密碼格式不正確，必須包含至少1個數字、1個大寫字母、1個小寫字母和1個特殊字元，並且不包含空格
        </div>
      </div>

      <!-- 確認密碼 -->
      <div class="col-12 mb-3">
        <label for="validationPasswordConfirm" class="form-label">確認密碼</label>
        <input
          v-model.trim="passwordConfirm"
          type="password"
          class="form-control"
          :class="{
            'is-valid': isPasswordConfirmValid,
            'is-invalid': !isPasswordConfirmValid && passwordConfirm !== ''
          }"
          id="validationPasswordConfirm"
          placeholder="確認密碼"
          @input="validatePasswordConfirm"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">密碼與確認密碼不一致</div>
      </div>

      <!-- 性別 -->
      <div class="col-12 mb-3">
        <label for="validationSex" class="form-label">性別</label>
        <select v-model.trim="sex" class="form-select" id="validationSex" required>
          <option selected disabled value="">請選擇...</option>
          <option>男</option>
          <option>女</option>
          <option>其他</option>
        </select>
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">此為必填欄位</div>
      </div>

      <!-- 生日 -->
      <div class="col-12 mb-3">
        <label for="validationBirthday" class="form-label">生日</label>
        <input
          v-model.trim="birthday"
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

// 表單資料的v-model
let email = ref('')
let name = ref('')
let password = ref('')
let passwordConfirm = ref('')
let phoneNumber = ref('')
let sex = ref('')
let birthday = ref(new Date())
let smsCode = ref('')

// 驗證狀態
let isEmailValid = ref(false)
let isPhoneNumberValid = ref(false)
let isPasswordValid = ref(false)
let isPasswordConfirmValid = ref(false)
let isUsernameValid = ref(false)

// 使用 import.meta.env.VITE_API_SPOTURL 環境變數來獲取 API 的基本 URL
const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User`

// 驗證規則
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
const regexPhoneNumber = /^09\d{8}$/

// 輸入時即時更新驗證狀態
function validateEmail() {
  isEmailValid.value = regexEmail.test(email.value)
}

function validatePhoneNumber() {
  isPhoneNumberValid.value = regexPhoneNumber.test(phoneNumber.value)
}

function validatePassword() {
  isPasswordValid.value = regexPassword.test(password.value)
}

function validatePasswordConfirm() {
  isPasswordConfirmValid.value = passwordConfirm.value === password.value
}

// 使用者名稱上限
function validateUsername() {
  isUsernameValid.value = name.value.length >= 1 && name.value.length <= 64
}

// 提交表單
async function submitRegisterForm() {
  if (
    isEmailValid.value &&
    isPhoneNumberValid.value &&
    isPasswordValid.value &&
    isPasswordConfirmValid.value &&
    isUsernameValid
  ) {
    await axios({
      method: 'post',
      url: `${API_URL}/register`,
      data: {
        name: name.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
        sex: sex.value,
        birthday: birthday.value
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
    if (name.value.length === 0) {
      isUsernameValid.value = false
    }
  }
}
</script>
