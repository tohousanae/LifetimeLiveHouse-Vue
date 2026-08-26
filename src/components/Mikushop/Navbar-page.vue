<template>
  <!-- 主導覽 start -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">品牌Logo</RouterLink>
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
            <RouterLink class="nav-link" to="/about">關於我們</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">吃點好吃的</RouterLink>
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

        <!-- 👤 會員專區 (狀態切換區) -->
        <div class="d-flex align-items-center ms-3">
          <!-- 狀態 A：未登入 (拿掉 text-dark，讓他吃原本的顏色) -->
          <a v-if="!authStore.isLoggedIn" href="javascript:;" data-bs-toggle="modal" data-bs-target="#userModal">
            <i class="bi bi-person-circle fs-3"></i>
          </a>

          <!-- 狀態 B：已登入 (拿掉 text-primary) -->
          <div v-else class="dropdown">
            <a href="#" class="text-decoration-none dropdown-toggle d-flex align-items-center" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <!-- 顯示已登入的 icon 與名字 -->
              <i class="bi bi-person-check-fill fs-3"></i>
              <span v-if="authStore.profile.name" class="ms-2 fw-bold">{{ authStore.profile.name }}</span>
            </a>
            
            <ul class="dropdown-menu dropdown-menu-end shadow-sm mt-2" aria-labelledby="userDropdown">
              <li><RouterLink class="dropdown-item" to="/user-manage"><i class="bi bi-card-list me-2"></i>會員中心</RouterLink></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-danger" href="javascript:;" @click="handleLogout"><i class="bi bi-box-arrow-right me-2"></i>登出</a></li>
            </ul>
          </div>

          <!-- 🛒 購物車 (拿掉 text-dark) -->
          <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#cartModal" class="ms-3">
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
import { RouterLink, useRouter } from 'vue-router'
import Login from '@/components/Mikushop/User/Login-page.vue'

// 💡 1. 引入剛剛寫好的 Pinia Store
import { useAuthStore } from '@/stores/auth' 

const authStore = useAuthStore()
const router = useRouter()

// 💡 2. 實作登出邏輯
async function handleLogout() {
  if (confirm('確定要登出嗎？')) {
    try {
      await authStore.logout() // 呼叫 Pinia 裡的登出 API
      
      // 登出後，如果目前人在需要權限的頁面 (例如會員中心)，強制踢回首頁
      if (router.currentRoute.value.meta.requiresAuth) {
        router.push('/')
      }
    } catch (error) {
      alert('登出發生錯誤，請稍後再試')
    }
  }
}
</script>

<style scoped>
/* 讓下拉選單的箭頭圖示稍微好看一點 */
.dropdown-toggle::after {
  vertical-align: middle;
}
</style>