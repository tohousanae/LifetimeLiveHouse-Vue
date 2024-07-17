<template>
  <!--註冊表單模板：https://codepen.io/1bbnuuu/pen/dyagBQz-->
  <div class="form-center">
    <div class="container">
      <div class="card">
        <form @submit.prevent="sendRegisterForm" class="row needs-validation" novalidate>
          <h2 class="register">會員註冊</h2>
          <input
            type="email"
            id="exampleFormControlInput1"
            placeholder="電子信箱(Email)"
            v-model="email"
            required
          />
          <input
            type="text"
            placeholder="會員名稱(Username)"
            autocomplete="username"
            v-model="username"
            required
          />
          <input
            type="password"
            minlength="8"
            v-model="password"
            placeholder="輸入密碼(Password)"
            autocomplete="password"
            required
          />
          <input
            type="password"
            minlength="8"
            id="confirmPassword"
            placeholder="確認密碼(Confirm Password)"
            required
          />
          <div class="row">
            <div class="col">
              <input
                type="number"
                id="phoneNumber"
                placeholder="電話號碼(phone number)"
                v-model="phoneNumber"
                required
              />
            </div>
            <div class="col">
              <input type="number" id="validation" placeholder="簡訊驗證碼" required />
            </div>
          </div>

          <button class="tombol-register" type="submit" id="registerButton" formnovalidate>
            註冊
          </button>
        </form>
      </div>
    </div>
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

body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-image: url(/public/photo/library-2.jpg);
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.card {
  width: 50%;
  background-color: #ffffff;
  backdrop-filter: blur(100px);
  padding: 20px;
  border-radius: 8px;
  border: 2px solid;
  overflow: hidden;
  align-items: center;
  justify-content: center;
}

h2 {
  text-align: left;
  font-weight: 600;
  font-size: 30px;
  margin-top: 0;
}

.register {
  text-align: center;
  font-weight: 600;
  margin-top: 0;
}

.register {
  font-size: 30px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.gambar-depan {
  border-radius: 6px;
}

input {
  padding: 20px;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  color: #ff8800;
  transition: all 250ms;
}

input:focus {
  outline: none;
  border-color: #db8d34;
  background-color: #eeeeee;
}

.card form a {
  padding: 15px 20px;
  background-color: rgba(17, 17, 17, 0.8);
  cursor: pointer;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
}

.tombol-register {
  padding: 15px 20px;
  background-color: rgba(17, 17, 17, 0.8);
  cursor: pointer;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  border: none;
  outline: none;
}

.tombol-register:hover,
a:hover {
  background-color: rgba(54, 54, 54, 0.8);
  color: #ffffff;
}

.switch a {
  cursor: pointer;
  color: rgb(0, 47, 255);
  text-align: center;
  text-decoration: none;
  font-weight: 600;
}

.switch {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

@media (max-width: 575px) {
  .card {
    width: 100%;
    max-width: 300px;
    max-height: 880px;
  }
  input:focus {
    outline: none;
    border-color: #ff9306;
  }
  .mydict div {
    width: 100%;
  }
}
</style>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User`

// 定義表單資料變數
const email = ref('')
const username = ref('')
const phoneNumber = ref('')
const password = ref('')

// 送出註冊表單
async function sendRegisterForm() {
  console.log(email, username, phoneNumber, password)
  // Send a POST request
  await axios({
    method: 'post',
    url: `${API_URL}/register`,
    data: {
      email: email,
      name: username,
      phoneNumber: phoneNumber,
      password: password
    }
  })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
</script>
