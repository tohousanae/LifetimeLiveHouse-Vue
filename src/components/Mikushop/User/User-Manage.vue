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

    <!-- 會員資料修改表單 (已移除性別) -->
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
          <div class="col-12 mt-4 d-flex justify-content-between align-items-center">
            <small class="text-muted">加入時間：{{ new Date(profile.createdDate).toLocaleDateString() }}</small>
            <button type="submit" class="btn btn-primary px-4">儲存變更</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User`

// 本地端的 profile，用來綁定表單 (v-model)
const profile = ref({
  email: '', name: '', cellphoneNumber: '', birthday: '',
  cash: 0, memberPoint: 0, createdDate: '',
  isEmailVerified: false, isPhoneVerified: false
})

onMounted(() => {
  // 💡 1. 直接從 Pinia 拿現成的快取資料，0 次 API 請求！
  if (authStore.isLoggedIn) {
    // 使用展開運算子 (...) 複製一份資料給本地表單
    // 這樣在使用者還沒按下「儲存變更」前，打字修改不會直接污染到 Pinia 的全域狀態
    profile.value = { ...authStore.profile }
  }
})

async function updateProfile() {
  if (!authStore.isLoggedIn) {
    alert('請先登入後再進行修改')
    return
  }

  try {
    // 發送更新請求給後端
    await axios.put(`${API_URL}/profile`, {
      name: profile.value.name,
      cellphoneNumber: profile.value.cellphoneNumber,
      birthday: profile.value.birthday
    }, { withCredentials: true })
    
    alert('會員資料更新成功！')

    // 💡 2. 儲存成功後，同步更新 Pinia 裡的全域狀態
    // 這樣一來，導覽列上的名字也會瞬間跟著變，不需要重新整理網頁！
    authStore.profile.name = profile.value.name
    authStore.profile.cellphoneNumber = profile.value.cellphoneNumber
    authStore.profile.birthday = profile.value.birthday

  } catch (error) {
    alert(error.response?.data?.message || error.response?.data || '更新失敗，請稍後再試')
  }
}
</script>

<style scoped> .container { min-height: 80vh; } </style>