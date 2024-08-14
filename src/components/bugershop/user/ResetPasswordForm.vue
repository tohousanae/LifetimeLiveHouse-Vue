<template>
  <div class="about">
    <h1>This is an ResetPwd page</h1>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script setup>
import axios from 'axios'
import { onMounted } from 'vue'

const API_URL = `${import.meta.env.VITE_API_SPOTURL}/getforgetPwdtoken`

async function getResetPasswordToken() {
  await axios
    .get(`${API_URL}`)
    .then(function (response) {
      // handle success
      console.log(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
}
onMounted(() => {
  getWeatherForecast()
})
</script>
