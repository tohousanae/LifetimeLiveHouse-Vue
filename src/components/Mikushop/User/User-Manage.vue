<template>
  <div class="container mt-5 py-5">
    <h2 class="mb-4">會員中心</h2>
    
    <!-- 💰 點數與儲值金卡片 (新規格) -->
    <div class="row mb-4">
      <div class="col-md-6 mb-3">
        <div class="card bg-primary text-white shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">MikuMiku 回饋點數</h5>
            <h2 class="mb-0">{{ profile.memberPoint || 0 }} Pts</h2>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <div class="card bg-success text-white shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">帳戶儲值金</h5>
            <h2 class="mb-0">NT$ {{ profile.cash || 0 }}</h2>
          </div>
        </div>
      </div>
    </div>

    <!-- 驗證狀態區塊 -->
    <div class="row mb-4">
      <div class="col-md-6 mb-3">
        <div class="alert mb-0" :class="profile.isEmailVerified ? 'alert-success' : 'alert-warning'">
          信箱驗證：<strong>{{ profile.isEmailVerified ? '已驗證 ✔️' : '尚未驗證 ❌' }}</strong>
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <div class="alert mb-0" :class="profile.isPhoneVerified ? 'alert-success' : 'alert-warning'">
          手機驗證：<strong>{{ profile.isPhoneVerified ? '已驗證 ✔️' : '尚未驗證 ❌' }}</strong>
        </div>
      </div>
    </div>

    <!-- 會員資料修改表單 -->
    <div class="card shadow-sm">
      <div class="card-body p-4">
        <form @submit.prevent="updateProfile" class="row g-3 needs-validation">
          <div class="col-md-6">
            <label class="form-label">登入信箱 (不可修改)</label>
            <input type="email" class="form-control bg-light" v-model="profile.email" disabled />
          </div>
          <div class="col-md-6">
            <label class="form-label">會員名稱</label>
            <input type="text" class="form-control" v-model="profile.name" required maxlength="40" />
          </div>
          <div class="col-md-6">
            <label class="form-label">手機號碼</label>
            <input type="text" class="form-control" v-model="profile.cellphoneNumber" maxlength="20" placeholder="尚未設定" />
          </div>
          <div class="col-md-6">
            <label class="form-label">生日</label>
            <input type="datetime-local" class="form-control" v-model="profile.birthday" />
          </div>
          
          <!-- 💡 修正按鈕排版：使用 flex-column 與 flex-sm-row 搭配 gap-3，確保直向與橫向都有完美間距 -->
          <div class="col-12 mt-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <small class="text-muted mb-3 mb-md-0">加入時間：{{ new Date(profile.createdDate).toLocaleDateString() }}</small>
            <div class="d-flex flex-column flex-sm-row gap-3 w-100 justify-content-sm-end" style="max-width: 400px;">
              <RouterLink to="/" class="btn btn-outline-secondary px-4 w-100">回首頁</RouterLink>
              <button type="submit" class="btn btn-primary px-4 w-100">儲存變更</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- 💡 新增：取代原生 alert 的系統提示 Modal -->
    <div class="modal fade" id="infoModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title fs-6">系統提示</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center py-4">
            <p class="mb-0 fw-bold">{{ modalMessage }}</p>
          </div>
          <div class="modal-footer justify-content-center border-0">
            <button type="button" class="btn btn-primary px-4" data-bs-dismiss="modal">確認</button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import * as bootstrap from 'bootstrap' // 💡 確保引入 Bootstrap 以操作 Modal

const authStore = useAuthStore()
const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User`

const profile = ref({
  email: '', name: '', cellphoneNumber: '', birthday: '',
  cash: 0, memberPoint: 0, createdDate: '',
  isEmailVerified: false, isPhoneVerified: false
})

// 💡 新增：用來綁定 Modal 提示文字的變數
const modalMessage = ref('')
let infoModalInstance = null

onMounted(() => {
  // 💡 防禦機制：強制解除可能殘留的登入黑幕與捲軸鎖定
  document.body.classList.remove('modal-open')
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())

  // 💡 初始化 Modal 實例
  const modalEl = document.getElementById('infoModal')
  if (modalEl) {
    infoModalInstance = new bootstrap.Modal(modalEl)
  }

  // 從 Pinia 拿現成的快取資料
  if (authStore.isLoggedIn) {
    profile.value = { ...authStore.profile }
  }
})

// 💡 新增：用來觸發 Modal 的專用函式
function showMessage(msg) {
  modalMessage.value = msg
  if (infoModalInstance) {
    infoModalInstance.show()
  }
}

async function updateProfile() {
  if (!authStore.isLoggedIn) {
    showMessage('請先登入後再進行修改') // 替換 alert
    return
  }

  try {
    await axios.put(`${API_URL}/profile`, {
      name: profile.value.name,
      cellphoneNumber: profile.value.cellphoneNumber,
      birthday: profile.value.birthday
    }, { withCredentials: true })
    
    showMessage('會員資料更新成功！') // 替換 alert

    // 同步更新 Pinia 全域狀態
    authStore.profile.name = profile.value.name
    authStore.profile.cellphoneNumber = profile.value.cellphoneNumber
    authStore.profile.birthday = profile.value.birthday

  } catch (error) {
    showMessage(error.response?.data?.message || error.response?.data || '更新失敗，請稍後再試') // 替換 alert
  }
}
</script>

<style scoped> 
.container { min-height: 80vh; } 
</style>