<script setup>
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import Navbar from './components/bugershop/Navbar.vue';
import end from './components/bugershop/end.vue'
</script>

<template>
  <header>
    <!--主導覽列-->
    <Navbar></Navbar>
    <!--主導覽列-->
  </header>

  <!--router頁面顯示區域-->
  <RouterView></RouterView>
  <!--router頁面顯示區域-->

  <!--footer區域-->
  <end></end>
  <!--footer區域-->
</template>
<style scoped>
@media (min-width:767px) {
  .row-md-cols-5 .col {
    width: 20%;
  }
}
</style>
<style lang="scss">
// 引入Boostrap自訂義css與boostrap icons
@import '../scss/custom.scss';
@import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
</style>