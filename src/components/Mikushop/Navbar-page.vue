<template>
  <!-- ================= 1. 主導覽列區塊 (Navbar) ================= -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <!-- 網站 Logo 連結 -->
      <RouterLink class="navbar-brand" to="/">LivetimeLivehouse</RouterLink>
      
      <!-- 手機版漢堡選單按鈕 -->
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

      <!-- 導覽列內容收合容器 -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- 導覽連結清單 -->
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
        
        <!-- 頂部搜尋列 -->
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-primary" type="submit"><i class="bi bi-search"></i></button>
        </form>

        <!-- ================= 2. 會員專區與購物車 ================= -->
        <div class="d-flex align-items-center mt-3 mt-lg-0 ms-lg-3">
          
          <!-- 狀態 A：未登入 (顯示頭像與「登入/註冊」文字，手機版自動隱藏文字)[cite: 9] -->
          <a v-if="!authStore.isLoggedIn" href="javascript:;" class="text-decoration-none d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#userModal">
            <i class="bi bi-person-circle fs-3"></i>
            <span class="ms-2 fw-bold d-none d-lg-block">登入 / 註冊</span>
          </a>

          <!-- 狀態 B：已登入 (顯示打勾頭像與會員名稱)[cite: 9] -->
          <div v-else class="dropdown" ref="dropdownContainer">
            <a href="javascript:;" class="text-decoration-none dropdown-toggle d-flex align-items-center" id="userDropdown" @click.prevent="toggleDropdown">
              <i class="bi bi-person-check-fill fs-3"></i>
              <!-- 超長名字防破版處理 (文字截斷) -->
              <span v-if="authStore.profile.name" class="ms-2 fw-bold d-inline-block text-truncate" style="max-width: 120px; vertical-align: bottom;">
                {{ authStore.profile.name }}
              </span>
            </a>
            
            <!-- 會員下拉選單 (包含點數、儲值金與功能選單)[cite: 9] -->
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

          <!-- 🛒 購物車觸發按鈕 -->
          <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#cartModal" class="ms-3">
            <i class="bi bi-cart fs-3"></i>
          </a>
        </div>
      </div>
    </div>
  </nav>

  <!-- ================= 3. 各式彈跳視窗 (Modals) ================= -->
  <!-- 引入登入元件 -->
  <Login></Login>

  <!-- 購物車 modal -->
  <div class="modal fade" id="cartModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">我的購物車</h5>
          <!-- 💡 加上 @click="$event.target.blur()" -->
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="$event.target.blur()"></button>
        </div>
        <div class="modal-body text-center py-5">
          <i class="bi bi-cart-x fs-1 text-muted mb-3 d-block"></i>
          <p class="text-muted">購物車裡面目前沒有東西喔！</p>
        </div>
        <div class="modal-footer justify-content-center border-0">
          <!-- 💡 加上 @click="$event.target.blur()" -->
          <button type="button" class="btn btn-primary px-4" data-bs-dismiss="modal" @click="$event.target.blur()">繼續購物</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal A：確認是否登出的詢問視窗[cite: 9] -->
  <div class="modal fade" id="confirmLogoutModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title fs-6">系統確認</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="$event.target.blur()"></button>
        </div>
        <div class="modal-body text-center py-4">
          <p class="mb-0 fw-bold">確定要登出系統嗎？</p>
        </div>
        <div class="modal-footer justify-content-center border-0 gap-2">
          <button type="button" class="btn btn-outline-secondary px-3" data-bs-dismiss="modal" @click="$event.target.blur()">取消</button>
          <button type="button" class="btn btn-danger px-3" @click="executeLogout">確定登出</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal B：獨立的「登出成功」提示視窗[cite: 9] -->
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
import * as bootstrap from 'bootstrap'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// 控制會員下拉選單開關狀態
const isDropdownOpen = ref(false)

// Modal 實例與控制旗標
let confirmLogoutModalInstance = null
let successLogoutModalInstance = null
let showSuccessWhenHidden = false // 💡 關鍵旗標：控制確認框完全關閉後才接力彈出成功框[cite: 9]

// 切換會員下拉選單
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

// 切換手機版導覽列收合
function toggleNavbar() {
  const navbarCollapse = document.getElementById('navbarSupportedContent')
  if (navbarCollapse) {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse)
    bsCollapse.toggle()
  }
}

// 強制關閉所有選單與下拉
function forceCloseAll() {
  const navbarCollapse = document.getElementById('navbarSupportedContent')
  if (navbarCollapse && navbarCollapse.classList.contains('show')) {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse)
    bsCollapse.hide()
  }
  isDropdownOpen.value = false
}

// 全域點擊事件：點擊空白處時自動收合選單（排除 Modal 內部點擊）
function handleDocumentClick(event) {
  if (event.target.closest('.modal') || event.target.closest('.modal-backdrop')) {
    return
  }

  const navbarCollapse = document.getElementById('navbarSupportedContent')
  const toggler = document.querySelector('.navbar-toggler')
  const dropdownEl = document.querySelector('.dropdown')

  if (navbarCollapse && navbarCollapse.classList.contains('show')) {
    if (!navbarCollapse.contains(event.target) && !toggler.contains(event.target)) {
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse)
      bsCollapse.hide()
    }
  }

  if (dropdownEl && !dropdownEl.contains(event.target)) {
    isDropdownOpen.value = false
  }
}

// 元件掛載時初始化 Bootstrap Modal 並綁定事件監聽
onMounted(() => {
  document.addEventListener('click', handleDocumentClick)

  // 1. 初始化確認登出 Modal[cite: 9]
  const confirmEl = document.getElementById('confirmLogoutModal')
  if (confirmEl) {
    confirmLogoutModalInstance = new bootstrap.Modal(confirmEl)

    // 💡 核心防護：利用 hidden 事件，等確認框黑幕完全退場後，才安全開啟成功提示框[cite: 9]
    confirmEl.addEventListener('hidden.bs.modal', () => {
      if (showSuccessWhenHidden) {
        showSuccessWhenHidden = false
        if (successLogoutModalInstance) {
          successLogoutModalInstance.show()
        }
      }
    })
  }

  // 2. 初始化登出成功 Modal[cite: 9]
  const successEl = document.getElementById('successLogoutModal')
  if (successEl) {
    successLogoutModalInstance = new bootstrap.Modal(successEl)

    // 💡 關鍵新增：當登出成功 Modal 完全關閉、動畫跑完後，才安全地清場與轉址
    successEl.addEventListener('hidden.bs.modal', () => {
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
      document.body.classList.remove('modal-open')
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''

      if (router.currentRoute.value.meta.requiresAuth) {
        router.push('/')
      }
    })
  }
})

// 移除全域點擊監聽
onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})

// 路由改變時自動收合選單
watch(() => route.path, () => {
  forceCloseAll()
})

// 點擊登出按鈕：收合選單並開啟確認 Modal[cite: 9]
function confirmLogout() {
  forceCloseAll()
  showSuccessWhenHidden = false
  if (confirmLogoutModalInstance) {
    confirmLogoutModalInstance.show()
  }
}

// 執行登出動作：呼叫 API 並設定接力旗標，然後關閉確認框[cite: 9]
async function executeLogout() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }

  try {
    await authStore.logout()
  } catch (error) {
    console.error('登出發生錯誤', error)
  }

  // 設定準備開啟成功框的旗標
  showSuccessWhenHidden = true

  // 隱藏確認 Modal（會觸發上方 hidden 事件）[cite: 9]
  if (confirmLogoutModalInstance) {
    confirmLogoutModalInstance.hide()
  }
}

// 點擊登出成功 Modal 的「確定」按鈕後[cite: 9]
function handleSuccessModalClose() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }

  if (successLogoutModalInstance) {
    successLogoutModalInstance.hide() // 讓 Bootstrap 自行優雅關閉並觸發 hidden 事件
  }
}
</script>

<style scoped>
.dropdown-toggle::after {
  vertical-align: middle;
}
</style>