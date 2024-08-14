<template>
  <div class="about">
    <h1 v-if="忘記密碼連結是否可用 == true">This is an ResetPwd page</h1>
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
import { ref } from 'vue'
import { onMounted } from 'vue'

// 一些變數
let 忘記密碼連結是否可用 = ref(false).value

const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User`

async function getWeatherForecast() {
  await axios
    .get(`${API_URL}`)
    .then(function (response) {
      // handle success
      console.log(response.data)
      忘記密碼連結是否可用 == true
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
