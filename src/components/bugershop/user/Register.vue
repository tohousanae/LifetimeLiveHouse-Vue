<template>
  <!--註冊表單模板：https://codepen.io/1bbnuuu/pen/dyagBQz-->
  <!--主導覽列-->
  <Navbar></Navbar>
  <!--主導覽列-->
  <div class="form-center">
    <form
      @submit.prevent="submitForm"
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
          :class="[validationClass]"
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
import Navbar from '@/components/bugershop/Navbar.vue'
import end from '@/components/bugershop/end.vue'

const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User`

// 定義表單資料變數
let email = ref('').value
let username = ref('').value
let password = ref('').value
let passwordConfirm = ref('').value
let phoneNumber = ref('').value
let sex = ref('').value
let birthday = ref(new Date()).value
let phoneValidation = ref(false).value
let emailValidation = ref(false).value

// 正則表達式
// let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
let regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/

// 定義class資料變數
let validationClass = ref('')

async function submitForm() {
  // 選取了所有帶有 needs-validation 類別的元素，通常這些元素是表單 (<form>) 元素

  /*
  Array.prototype.slice.call(forms)：
  將 NodeList 轉換成一個真正的陣列。這樣可以使用陣列的 .forEach() 方法來遍歷所有的表單元素。
  */

  /* 
  form.classList.add('was-validated')：
  為每一個表單元素添加 was-validated 類別。這是 Bootstrap 5 用來標記表單已經進行了驗證的標誌。它將應用樣式來顯示表單驗證結果，例如標記未通過驗證的輸入框。
  */
  let forms = document.querySelectorAll('.needs-validation')
  await Array.prototype.slice.call(forms).forEach(function (form) {
    form.classList.add('was-validated')
  })

  // 检查是否通过验证
  if (document.querySelectorAll('.was-validated :invalid').length === 0) {
    // 通过验证，调用 addActivity 方法
    RegisterAJAX()
  }
}

// 送出註冊表單ajax部分
async function RegisterAJAX() {
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
      phoneValidation: phoneValidation,
      emailValidation: emailValidation
    }
  })
    .then(function (response) {
      console.log(response)
      alert(response.data)
      window.location.href = '/login'
    })
    .catch(function (error) {
      console.log(error)
      alert(error.response.data)
    })
}
</script>
