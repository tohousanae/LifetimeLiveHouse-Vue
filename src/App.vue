<script setup>
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
</script>

<template>
  
  <!--router頁面顯示區域-->
  <RouterView>
  </RouterView>
  <!--router頁面顯示區域-->
</template>
<style scoped>
@media (min-width: 767px) {
  .row-md-cols-5 .col {
    width: 20%;
  }
}
</style>
<style lang="scss">
// 引入Boostrap自訂義css與boostrap icons
@use '../scss/bootstrap.scss';
@import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';
</style>
