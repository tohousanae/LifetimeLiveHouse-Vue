<script setup>
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './components/bugershop/Navbar.vue';
import Home from './components/bugershop/Home.vue';
import end from './components/bugershop/end.vue'
</script>

<template>
  <header>
    <!--主導覽列-->
    <Navbar></Navbar>
    <!--主導覽列-->
  </header>
  <!--首頁區域-->
  <home></home>
  <!--首頁區域-->

  <!--footer區域-->
  <end></end>
  <!--footer區域-->
</template>

<style lang="scss">
@import '../scss/custom.scss';
</style>
<style>
@import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
</style>
<style scoped>
@media (min-width:767px) {
  .row-md-cols-5 .col {
    width: 20%;
  }
}
</style>