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
          <div v-else class="dropdown" ref="dropdownContainer">
            <a href="javascript:;" class="text-decoration-none dropdown-toggle d-flex align-items-center" id="userDropdown" @click.prevent="toggleDropdown">
              <i class="bi bi-person-check-fill fs-3"></i>
              <span v-if="authStore.profile.name" class="ms-2 fw-bold">{{ authStore.profile.name }}</span>
            </a>
            
            <!-- 💡 下拉選單：加入點數與儲值金資訊，並保持簡潔俐落 -->
            <ul class="dropdown-menu dropdown-menu-lg-end shadow-sm mt-2 p-2" :class="{ show: isDropdownOpen }" aria-labelledby="userDropdown" style="min-width: 220px;">
              <!-- 點數與儲值金摘要小卡 -->
              <li class="px-3 py-2 bg-light rounded mb-2">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="small text-muted">回饋點數</span>
                  <span class="fw-bold text-primary">{{ authStore.profile.memberPoint || 0 }} Pts</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="small text-muted">帳戶儲值金</span>
                  <span class="fw-bold text-success">NT$ {{ authStore.profile.cash || 0 }}</span>
                </div>
              </li>

              <li><RouterLink class="dropdown-item rounded py-2" to="/user-manage" @click="isDropdownOpen = false"><i class="bi bi-card-list me-2"></i>會員中心</RouterLink></li>
              <li><hr class="dropdown-divider my-1"></li>
              <li><a class="dropdown-item text-danger rounded py-2" href="javascript:;" @click="confirmLogout"><i class="bi bi-box-arrow-right me-2"></i>登出</a></li>
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

  <!-- 登入 modal -->
  <Login></Login>

  <!-- 購物車 modal -->
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

  <!-- 💡 1. 確認是否登出的詢問 Modal (取代原生 confirm) -->
  <div class="modal fade" id="confirmLogoutModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title fs-6">系統確認</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center py-4">
          <p class="mb-0 fw-bold">確定要登出系統嗎？</p>
        </div>
        <div class="modal-footer justify-content-center border-0 gap-2">
          <button type="button" class="btn btn-outline-secondary px-3" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger px-3" @click="executeLogout">確定登出</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 💡 2. 登出成功的提示 Modal -->
  <div class="modal fade" id="successLogoutModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title fs-6">系統提示</h5>
        </div>
        <div class="modal-body text-center py-4">
          <i class="bi bi-check-circle-fill text-success fs-1 mb-2 d-block"></i>
          <p class="mb-0 fw-bold">已成功登出！</p>
        </div>
        <div class="modal-footer justify-content-center border-0">
          <button type="button" class="btn btn-primary px-4" @click="handleSuccessModalClose">確定</button>
        </div>
      </div>
    </div>
  </div>
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

const isDropdownOpen = ref(false)

// Modal 實例變數
let confirmModalInstance = null
let successModalInstance = null

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function toggleNavbar() {
  const navbarCollapse = document.getElementById('navbarSupportedContent')
  if (navbarCollapse) {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse)
    bsCollapse.toggle()
  }
}

function forceCloseAll() {
  const navbarCollapse = document.getElementById('navbarSupportedContent')
  if (navbarCollapse && navbarCollapse.classList.contains('show')) {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse)
    bsCollapse.hide()
  }
  isDropdownOpen.value = false
}

// 全域點擊事件：點擊空白處時自動收合所有選單
function handleDocumentClick(event) {
  // 💡 關鍵修正：判斷點擊目標是否在 Modal 內，或者是 Modal 的黑幕。如果是，直接中斷，不要收合選單！
  if (event.target.closest('.modal') || event.target.closest('.modal-backdrop')) {
    return
  }

  const navbarCollapse = document.getElementById('navbarSupportedContent')
  const toggler = document.querySelector('.navbar-toggler')
  const dropdownEl = document.querySelector('.dropdown')

  // 如果漢堡選單是開著的，且點擊的地方不在選單與開關上，就關閉它
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

  // 初始化兩個登出用的 Modal
  const confirmEl = document.getElementById('confirmLogoutModal')
  if (confirmEl) confirmModalInstance = new bootstrap.Modal(confirmEl)

  const successEl = document.getElementById('successLogoutModal')
  if (successEl) successModalInstance = new bootstrap.Modal(successEl)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})

watch(() => route.path, () => {
  forceCloseAll()
})

// 1. 點擊登出按鈕：關閉選單，並彈出「確認是否登出」的 Modal
function confirmLogout() {
  forceCloseAll()
  if (confirmModalInstance) {
    confirmModalInstance.show()
  }
}

// 2. 確定登出：向後端發送登出請求，成功後彈出「登出成功」Modal
async function executeLogout() {
  // 💡 關鍵修正：在關閉 Modal 前，讓當前聚焦的按鈕失去焦點 (blur)，解除 aria-hidden 衝突
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }

  if (confirmModalInstance) {
    confirmModalInstance.hide()
  }

  try {
    await authStore.logout()
    
    // 顯示成功提示 Modal
    if (successModalInstance) {
      successModalInstance.show()
    }
  } catch (error) {
    alert('登出發生錯誤，請稍後再試')
  }
}

// 3. 點擊登出成功 Modal 的確定按鈕後
function handleSuccessModalClose() {
  // 💡 同樣在關閉前讓按鈕失去焦點
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }

  if (successModalInstance) {
    successModalInstance.hide()
  }
  
  // 清除殘留黑幕
  document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
  document.body.classList.remove('modal-open')
  document.body.style.overflow = ''

  if (router.currentRoute.value.meta.requiresAuth) {
    router.push('/')
  }
}
</script>

<style scoped>
.dropdown-toggle::after {
  vertical-align: middle;
}
</style>