<template>
  <div class="about">
    <h1>User {{ $route.params.token }} This is an ResetPwd page</h1>
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
import { ref } from 'vue'

// 定義表單資料變數
let token = ref(4).value
</script>
