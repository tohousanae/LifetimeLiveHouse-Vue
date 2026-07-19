<template>
  <div class="form-center container">
    <form
      @submit.prevent="submitRegisterForm"
      class="row col-12 col-md-6 d-flex needs-validation"
      novalidate
    >
      <div class="col-12 text-center mb-3">
        <h2>會員註冊</h2>
      </div>

      <!-- 信箱 -->
      <div class="col-12 mb-3 text-start">
        <label for="validationEmail" class="form-label">信箱</label>
        <input
          v-model.trim="inputEmail"
          type="email"
          class="form-control"
          :class="{
            'is-valid': hasSubmitted && isEmailValid,
            'is-invalid': hasSubmitted && !isEmailValid
          }"
          id="validationEmail"
          placeholder="name@example.com"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">信箱不能為空，且格式必須正確</div>
      </div>

      <!-- 會員名稱 -->
      <div class="col-12 mb-3 text-start">
        <label for="validationCustomUsername" class="form-label">會員名稱</label>
        <input
          v-model.trim="inputName"
          type="text"
          class="form-control"
          id="validationCustomUsername"
          placeholder="請填寫會員名稱"
          :class="{
            'is-valid': hasSubmitted && isUsernameValid,
            'is-invalid': hasSubmitted && !isUsernameValid
          }"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">會員名稱不能為空，至少1字元，最多64字元</div>
      </div>

      <!-- 密碼 (加入 input-group 與眼睛按鈕) -->
      <div class="col-12 mb-3 text-start">
        <label for="validationPassword" class="form-label">密碼</label>
        <div class="input-group has-validation">
          <input
            v-model.trim="inputPassword"
            :type="showPassword ? 'text' : 'password'"
            class="form-control hide-validation-icon"
            :class="{
              'is-valid': hasSubmitted && isPasswordValid,
              'is-invalid': hasSubmitted && !isPasswordValid
            }"
            id="validationPassword"
            placeholder="輸入密碼"
            required
          />
          <button 
            class="btn btn-outline-secondary" 
            type="button" 
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
          <div class="valid-feedback">Looks good!</div>
          <div class="invalid-feedback">
            密碼不能為空，必須包含至少1個數字、1個大寫字母、1個小寫字母和1個特殊字元，且不含空格
          </div>
        </div>
      </div>

      <!-- 確認密碼 (加入 input-group 與眼睛按鈕) -->
      <div class="col-12 mb-3 text-start">
        <label for="validationPasswordConfirm" class="form-label">確認密碼</label>
        <div class="input-group has-validation">
          <input
            v-model.trim="inputPasswordConfirm"
            :type="showPasswordConfirm ? 'text' : 'password'"
            class="form-control hide-validation-icon"
            :class="{
              'is-valid': hasSubmitted && isPasswordConfirmValid,
              'is-invalid': hasSubmitted && !isPasswordConfirmValid
            }"
            id="validationPasswordConfirm"
            placeholder="確認密碼"
            required
          />
          <button 
            class="btn btn-outline-secondary" 
            type="button" 
            @click="showPasswordConfirm = !showPasswordConfirm"
          >
            {{ showPasswordConfirm ? '🙈' : '👁️' }}
          </button>
          <div class="valid-feedback">Looks good!</div>
          <div class="invalid-feedback">確認密碼不能為空，且必須與密碼一致</div>
        </div>
      </div>

      <!-- 性別 -->
      <div class="col-12 mb-3 text-start">
        <label for="validationSex" class="form-label">性別</label>
        <select 
          v-model.trim="inputSex" 
          class="form-select" 
          :class="{
            'is-valid': hasSubmitted && isSexValid,
            'is-invalid': hasSubmitted && !isSexValid
          }"
          id="validationSex" 
          required
        >
          <option selected disabled value="">請選擇...</option>
          <option>男</option>
          <option>女</option>
          <option>其他</option>
        </select>
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">請選擇性別</div>
      </div>

      <!-- 生日 -->
      <div class="col-12 mb-3 text-start">
        <label for="validationBirthday" class="form-label">生日</label>
        <input
          v-model.trim="inputBirthday"
          type="datetime-local"
          class="form-control"
          :class="{
            'is-valid': hasSubmitted && isBirthdayValid,
            'is-invalid': hasSubmitted && !isBirthdayValid
          }"
          id="validationBirthday"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">請選擇生日</div>
      </div>

      <!-- 錯誤訊息區塊 -->
      <div v-if="errorMessage" class="col-12 mb-3 text-start">
        <div class="alert alert-danger" role="alert" style="white-space: pre-wrap; word-break: break-all;">
          {{ errorMessage }}
        </div>
      </div>

      <!-- 送出按鈕 -->
      <div class="col-12 mb-3 text-start">
        <button class="btn btn-primary" type="submit">送出</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-center {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 15px;
}
.valid-feedback {
  color: #008d00;
}

/* 🌟 核心修正：移除 input-group 中 input 預設的紅綠圖示，避免遮擋按鈕 */
.hide-validation-icon.is-valid,
.hide-validation-icon.is-invalid {
  background-image: none !important;
}
</style>

<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'

const inputEmail = ref('')
const inputName = ref('')
const inputPassword = ref('')
const inputPasswordConfirm = ref('')
const inputSex = ref('')
const inputBirthday = ref('')

// 🌟 新增密碼顯示狀態
const showPassword = ref(false)
const showPasswordConfirm = ref(false)

// 狀態控制
const hasSubmitted = ref(false)
const errorMessage = ref('') 

// 驗證規則
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/

// 即時計算各欄位是否有效
const isEmailValid = computed(() => inputEmail.value !== '' && regexEmail.test(inputEmail.value))
const isUsernameValid = computed(() => inputName.value.length >= 1 && inputName.value.length <= 64)
const isPasswordValid = computed(() => inputPassword.value !== '' && regexPassword.test(inputPassword.value))
const isPasswordConfirmValid = computed(() => inputPasswordConfirm.value !== '' && inputPasswordConfirm.value === inputPassword.value)
const isSexValid = computed(() => inputSex.value !== '')
const isBirthdayValid = computed(() => inputBirthday.value !== '')

// 判斷整張表單是否皆合法
const isFormValid = computed(() => {
  return isEmailValid.value &&
         isUsernameValid.value &&
         isPasswordValid.value &&
         isPasswordConfirmValid.value &&
         isSexValid.value &&
         isBirthdayValid.value
})

const API_URL = `${import.meta.env.VITE_API_SPOTURL}/Register`

// 提交表單
async function submitRegisterForm() {
  hasSubmitted.value = true 
  errorMessage.value = '' 

  if (!isFormValid.value) {
    console.log('表單前端驗證失敗，請檢查紅字欄位')
    return
  }

  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/postRegisterMember`,
      data: {
        name: inputName.value,
        email: inputEmail.value,
        password: inputPassword.value,
        sex: inputSex.value,
        birthday: inputBirthday.value
      }
    })

    console.log(response)
    alert('註冊成功！請至信箱收取驗證信。')
    window.location.href = '/'

  } catch (error) {
    console.error('API 錯誤:', error)
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data
    } else {
      errorMessage.value = '發生未知錯誤，請確認網路連線或稍後再試。'
    }
  }
}
</script>