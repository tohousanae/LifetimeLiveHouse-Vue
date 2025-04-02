<template>
  <!-- Modal -->
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

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User`

// 定義表單資料變數
let email = ref('').value
let password = ref('').value

// 正則表達式
// let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

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
  // let forms = document.querySelectorAll('.needs-validation')
  // await Array.prototype.slice.call(forms).forEach(function (form) {
  //   form.classList.add('was-validated')
  // })

  // 检查是否通过验证
  // if (document.querySelectorAll('.was-validated :invalid').length === 0) {
  // 通过验证，调用 addActivity 方法
  Login()
  // }
}

// 送出註冊表單ajax部分
async function Login() {
  // 前端部分密碼不進行哈希加密，而是以https來保護資料，後端再進行哈希加密，這可以防止攻擊者攔截網路請求看到哈希值後進行重放攻擊
  // 參考資料(https://academy.binance.com/zt/articles/what-is-a-replay-attack)
  // Send a POST request
  await axios({
    method: 'post',
    url: `${API_URL}/login`,
    withCredentials: true, //ajax請求有用到cookie時都要設定withCredentials: true
    data: {
      email: email,
      password: password
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
