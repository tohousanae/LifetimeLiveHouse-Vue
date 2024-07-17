<template>
  <!--註冊表單模板：https://codepen.io/1bbnuuu/pen/dyagBQz-->
  <div class="form-center">
    <div class="container">
      <div class="card">
        <form method="post" action="">
          <h2 class="register">會員註冊</h2>
          <input type="text" placeholder="會員名稱(Username)" autocomplete="username" v-model="username"/>
          <input
            type="password"
            minlength="8"
            id="password"
            placeholder="輸入密碼(Password)"
            autocomplete="password"
          />
          <input
            type="password"
            minlength="8"
            id="confirmPassword"
            placeholder="確認密碼(Confirm Password)"
          />

          <input
            type="text"
            id="fullName"
            placeholder="
full name"
          />
          <input type="number" id="phoneNumber" placeholder="phone number" />
          <button
            class="tombol-register"
            type="submit"
            id="registerButton"
            disabled
            onclick="redirectToLogin()"
          >
            Register
          </button>
        </form>
        <div class="switch">
          <h5>Already have account?</h5>
          <a href="#">Login</a>
        </div>
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
  width: 450px;
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
  color: #000000;
  transition: all 250ms;
}

input:focus {
  outline: none;
  border-color: #3498db;
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
    border-color: #3498db;
  }
  .mydict div {
    width: 100%;
  }
}
</style>

<script setup>
import axios from 'axios'
import { ref } from 'vue';

const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User`

// 定義表單資料變數
const username = ref('');


// 送出註冊表單
async function sendRegisterForm() {
  await axios
    .post(`${API_URL}/register`)
    .then(function (response) {
      // handle success
      console.log(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
}
</script>
