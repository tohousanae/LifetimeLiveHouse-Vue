<template>
  <!-- 主導覽 start -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <RouterLink class="navbar-brand" to="/"></RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Vocaloid音樂/周邊/官方/世界計劃日台服情報</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">關於我們</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">商品列表</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">分店一覽</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">常見問題</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">聯絡我們</RouterLink>
          </li>

        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-primary" type="submit"><i class="bi bi-search"></i></button>
        </form>
        <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#userModal">
          <i class="bi bi-person-circle fs-3 ms-2"></i>
        </a>
        <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#cartModal">
          <i class="bi bi-cart fs-3 ms-2"></i>
        </a>
      </div>
    </div>
  </nav>
  <!-- 主導覽 end -->

  <!-- 登入modal start -->
  <Login></Login>
  <!-- 登入modal end -->
</template>

<style scoped></style>

<script setup>
import { RouterLink } from 'vue-router'
import Login from '@/components/bugershop/user/Login-page.vue'
</script>