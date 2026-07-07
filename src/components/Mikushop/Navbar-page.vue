<template>
  <!-- 主導覽 start -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <!-- 1. 加上 me-5 (margin-end: 3rem) 強制拉開與右側選單的距離 -->
      <!-- 註：我在這裡加了文字作為示意，您可以換成您的圖片或保持原本的寫法 -->
      <RouterLink class="navbar-brand me-5" to="/">LOGO / 網站名稱</RouterLink>
      
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
        <!-- 2. ms-auto 將選單推至右側，並加入 gap-lg-2 讓選單項目之間不要太擠 -->
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-2">
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

        <!-- 3. 將搜尋列和圖示包在一個 div 內，用 ms-lg-4 拉開與左邊選單的距離，用 gap-3 讓它們彼此保持完美間距 -->
        <div class="d-flex align-items-center ms-lg-4 gap-3">
          <form class="d-flex m-0">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-primary" type="submit"><i class="bi bi-search"></i></button>
          </form>
          
          <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#userModal" class="text-dark">
            <i class="bi bi-person-circle fs-3"></i>
          </a>
          
          <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#cartModal" class="text-dark">
            <i class="bi bi-cart fs-3"></i>
          </a>
        </div>
      </div>
    </div>
  </nav>
  <!-- 主導覽 end -->

  <!-- 登入modal start -->
  <Login></Login>
  <!-- 登入modal end -->
</template>

<script setup>
import { RouterLink } from 'vue-router'
import Login from '@/components/Mikushop/User/Login-page.vue'
</script>

<style scoped>
/* 讓圖示在 hover 時有顏色的過渡效果，提升使用者體驗（可選） */
.bi-person-circle,
.bi-cart {
  transition: color 0.2s ease-in-out;
}

a:hover .bi-person-circle,
a:hover .bi-cart {
  color: #0d6efd; /* 對應 Bootstrap 的 primary 藍色 */
}

/* 如果您希望導覽列的字體更清晰，可以在這微調 */
.navbar-brand {
  font-weight: bold;
}
</style>