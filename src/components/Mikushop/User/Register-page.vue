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

      <!-- <div class="col-md-12 mb-3 text-start">
        <label for="validationPhone" class="form-label">手機號碼</label>
        <div class="input-group has-validation">
          <input
            v-model.trim="inputPhoneNumber"
            type="text"
            class="form-control"
            :class="{
              'is-valid': hasSubmitted && isPhoneNumberValid,
              'is-invalid': hasSubmitted && !isPhoneNumberValid
            }"
            id="validationPhone"
            placeholder="請填寫手機號碼"
            required
          />
          <div class="valid-feedback">Looks good!</div>
          <div class="invalid-feedback">手機不能為空，且必須為09開頭的10位數字</div>
        </div>
      </div> -->

      <!-- <div class="col-12 mb-3 text-start">
        <label for="validationSMS" class="form-label">簡訊驗證碼</label>
        <div class="input-group has-validation">
          <input
            v-model.trim="inputSmsCode"
            type="text"
            class="form-control"
            :class="{
              'is-valid': hasSubmitted && isSmsCodeValid,
              'is-invalid': hasSubmitted && !isSmsCodeValid
            }"
            id="validationSMS"
            placeholder="輸入簡訊驗證碼"
            required
          />
          <button type="button" class="btn btn-primary">獲取簡訊驗證碼</button>
          <div class="valid-feedback">Looks good!</div>
          <div class="invalid-feedback">請輸入簡訊驗證碼</div>
        </div>
      </div> -->

      <div class="col-12 mb-3 text-start">
        <label for="validationPassword" class="form-label">密碼</label>
        <input
          v-model.trim="inputPassword"
          type="password"
          class="form-control"
          :class="{
            'is-valid': hasSubmitted && isPasswordValid,
            'is-invalid': hasSubmitted && !isPasswordValid
          }"
          id="validationPassword"
          placeholder="輸入密碼"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">
          密碼不能為空，必須包含至少1個數字、1個大寫字母、1個小寫字母和1個特殊字元，且不含空格
        </div>
      </div>

      <div class="col-12 mb-3 text-start">
        <label for="validationPasswordConfirm" class="form-label">確認密碼</label>
        <input
          v-model.trim="inputPasswordConfirm"
          type="password"
          class="form-control"
          :class="{
            'is-valid': hasSubmitted && isPasswordConfirmValid,
            'is-invalid': hasSubmitted && !isPasswordConfirmValid
          }"
          id="validationPasswordConfirm"
          placeholder="確認密碼"
          required
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">確認密碼不能為空，且必須與密碼一致</div>
      </div>

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

      <div class="col-12 mb-3 text-start">
        <button class="btn btn-primary" type="submit">送出</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* 置於畫面正中央，並相容手機版長度 */
.form-center {
  min-height: 100vh; /* 關鍵修改：改用 min-height，確保內容過長時可以往下延伸撐開 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 15px; /* 增加上下 padding (2rem)，讓表單在手機版滑到頂或底時不會貼死螢幕邊緣 */
}

/* 自定義成功提示文字顏色 */
.valid-feedback {
  color: #008d00;
}
</style>

<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'

// 修正：必須保留 ref() 物件，不要在宣告時加上 .value
const inputEmail = ref('')
const inputName = ref('')
const inputPassword = ref('')
const inputPasswordConfirm = ref('')
// const inputPhoneNumber = ref('')
const inputSex = ref('')
const inputBirthday = ref('')
// const inputSmsCode = ref('')

// 新增：追蹤使用者是否已經按過「送出」按鈕
const hasSubmitted = ref(false)

// 驗證規則
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
const regexPhoneNumber = /^09\d{8}$/

// 結合 Vue 的 computed 即時計算各欄位是否有效（包含防呆空值檢驗）
const isEmailValid = computed(() => inputEmail.value !== '' && regexEmail.test(inputEmail.value))
const isUsernameValid = computed(() => inputName.value.length >= 1 && inputName.value.length <= 64)
const isPhoneNumberValid = computed(() => inputPhoneNumber.value !== '' && regexPhoneNumber.test(inputPhoneNumber.value))
// const isSmsCodeValid = computed(() => inputSmsCode.value !== '')
const isPasswordValid = computed(() => inputPassword.value !== '' && regexPassword.test(inputPassword.value))
const isPasswordConfirmValid = computed(() => inputPasswordConfirm.value !== '' && inputPasswordConfirm.value === inputPassword.value)
const isSexValid = computed(() => inputSex.value !== '')
const isBirthdayValid = computed(() => inputBirthday.value !== '')

// 判斷整張表單是否皆合法
const isFormValid = computed(() => {
  return isEmailValid.value &&
         isUsernameValid.value &&
        //  isPhoneNumberValid.value &&
        //  isSmsCodeValid.value &&
         isPasswordValid.value &&
         isPasswordConfirmValid.value &&
         isSexValid.value &&
         isBirthdayValid.value
})

const API_URL = `${import.meta.env.VITE_API_SPOTURL}/Register`

// 提交表單
async function submitRegisterForm() {
  hasSubmitted.value = true // 按下送出時，觸發 UI 顯示紅字/綠字驗證結果

  // 如果表單驗證不通過，阻擋 API 請求
  if (!isFormValid.value) {
    console.log('表單驗證失敗，請檢查紅字欄位')
    return
  }

  await axios({
    method: 'post',
    url: `${API_URL}/postRegisterMember`,
    data: {
      name: inputName.value,          // 讀取響應式資料必須加上 .value
      email: inputEmail.value,
      phoneNumber: inputPhoneNumber.value,
      password: inputPassword.value,
      sex: inputSex.value,
      birthday: inputBirthday.value
    }
  })
    .then(function (response) {
      console.log(response)
      alert(response.data)
      window.location.href = '/'
    })
    .catch(function (error) {
      console.log(error)
      alert(error.response?.data || '發生錯誤')
    })
}
</script>