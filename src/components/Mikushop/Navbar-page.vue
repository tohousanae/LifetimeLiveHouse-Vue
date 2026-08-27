<template>
  <!-- 主導覽 start -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">LivetimeLivehouse</RouterLink>
      
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleNavbar"
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
        <div class="d-flex align-items-center mt-3 mt-lg-0 ms-lg-3">
          <!-- 狀態 A：未登入 -->
          <a v-if="!authStore.isLoggedIn" href="javascript:;" data-bs-toggle="modal" data-bs-target="#userModal">
            <i class="bi bi-person-circle fs-3"></i>
          </a>

          <!-- 狀態 B：已登入 -->
          <!-- 💡 加上 ref 讓 Vue 可以精準抓到這個 dropdown 容器 -->
          <div v-else class="dropdown" ref="dropdownContainer">
            <!-- 💡 改用 @click.prevent 呼叫我們自己寫的手動開關函式 -->
            <a href="javascript:;" class="text-decoration-none dropdown-toggle d-flex align-items-center" id="userDropdown" @click.prevent="toggleDropdown">
              <i class="bi bi-person-check-fill fs-3"></i>
              <span v-if="authStore.profile.name" class="ms-2 fw-bold">{{ authStore.profile.name }}</span>
            </a>
            
            <!-- 💡 加上 show 類別的動態切換支援 -->
            <ul class="dropdown-menu dropdown-menu-lg-end shadow-sm mt-2" :class="{ show: isDropdownOpen }" aria-labelledby="userDropdown">
              <li><RouterLink class="dropdown-item" to="/user-manage" @click="isDropdownOpen = false"><i class="bi bi-card-list me-2"></i>會員中心</RouterLink></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-danger" href="javascript:;" @click="handleLogout"><i class="bi bi-box-arrow-right me-2"></i>登出</a></li>
            </ul>
          </div>

          <!-- 🛒 購物車 -->
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

   <!-- 購物車modal start -->
  <div class="modal fade" id="cartModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">我的購物車</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center py-5">
          <i class="bi bi-cart-x fs-1 text-muted mb-3 d-block"></i>
          <p class="text-muted">購物車裡面目前沒有東西喔！</p>
        </div>
        <div class="modal-footer justify-content-center border-0">
          <button type="button" class="btn btn-primary px-4" data-bs-dismiss="modal">繼續購物</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 購物車modal end -->
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import Login from '@/components/Mikushop/User/Login-page.vue'
import { useAuthStore } from '@/stores/auth'
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// 💡 新增：用來手動控制會員選單開關的狀態變數
const isDropdownOpen = ref(false)

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

// 控制漢堡選單展開/收合
function toggleNavbar() {
  const navbarCollapse = document.getElementById('navbarSupportedContent')
  if (navbarCollapse) {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse)
    bsCollapse.toggle()
  }
}

// 強制關閉所有選單
function forceCloseAll() {
  // 關閉漢堡選單
  const navbarCollapse = document.getElementById('navbarSupportedContent')
  if (navbarCollapse && navbarCollapse.classList.contains('show')) {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse)
    bsCollapse.hide()
  }
  // 關閉會員下拉選單
  isDropdownOpen.value = false
}

// 全域點擊事件：點擊空白處時自動收合所有選單
function handleDocumentClick(event) {
  const navbarCollapse = document.getElementById('navbarSupportedContent')
  const toggler = document.querySelector('.navbar-toggler')
  const dropdownEl = document.querySelector('.dropdown')

  if (navbarCollapse && navbarCollapse.classList.contains('show')) {
    if (!navbarCollapse.contains(event.target) && !toggler.contains(event.target)) {
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse)
      bsCollapse.hide()
    }
  }

  // 如果點擊的地方不在會員 dropdown 內，就關閉會員選單
  if (dropdownEl && !dropdownEl.contains(event.target)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})

// 監聽路由切換自動收合
watch(() => route.path, () => {
  forceCloseAll()
})

async function handleLogout() {
  forceCloseAll()
  if (confirm('確定要登出嗎？')) {
    try {
      await authStore.logout()
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
.dropdown-toggle::after {
  vertical-align: middle;
}
</style>