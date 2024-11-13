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
import { useRouter } from 'vue-router'

const router = useRouter()
// const route = useRoute()

// router.beforeEach(async (to, from) => {
//   if (
//     // 检查用户是否已登录
//     !isAuthenticated &&
//     // ❗️ 避免无限重定向
//     to.name !== 'Login'
//   ) {
//     // 将用户重定向到登录页面
//     return { name: 'Login' }
//   }
// })

const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User/getforgetPwdtoken`

async function getResetPasswordToken() {
  await axios
    .post(`${API_URL}`)
    .then(function (response) {
      // handle success
      console.log(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error)
      router.push({ path: '/404' })
    })
}
onMounted(() => {
  getResetPasswordToken()
})
</script>
