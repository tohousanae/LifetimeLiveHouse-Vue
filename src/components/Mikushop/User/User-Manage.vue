<template>
  <div class="container mt-5 py-5">
    <h2 class="mb-4">會員中心</h2>

    <!-- 💰 點數與儲值金卡片 (新規格) -->
    <div class="row mb-4">
      <div class="col-md-6 mb-3">
        <div class="card bg-primary text-white shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">回饋點數</h5>
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
      <!-- 信箱驗證 -->
      <div class="col-md-6 mb-3">
        <div class="alert h-100 mb-0 d-flex flex-column justify-content-center"
          :class="profile.isEmailVerified ? 'alert-success' : 'alert-warning'">
          <div class="d-flex justify-content-between align-items-center w-100">
            <div>信箱驗證：<strong>{{ profile.isEmailVerified ? '已驗證 ✔️' : '尚未驗證 ❌' }}</strong></div>
            <button v-if="!profile.isEmailVerified" @click="sendEmailVerify" :disabled="emailCooldown > 0 || isSending"
              class="btn btn-sm btn-outline-dark bg-white">
              {{ emailCooldown > 0 ? `請稍後 (${emailCooldown}s)` : '發送驗證信' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 手機驗證 -->
      <div class="col-md-6 mb-3">
        <div class="alert h-100 mb-0 d-flex flex-column justify-content-center"
          :class="profile.isPhoneVerified ? 'alert-success' : 'alert-warning'">
          <div class="d-flex justify-content-between align-items-center w-100">
            <div>手機驗證(目前尚只支持台灣手機號碼註冊)：<strong>{{ profile.isPhoneVerified ? '已驗證 ✔️' : '尚未驗證 ❌' }}</strong></div>
            <button v-if="!profile.isPhoneVerified" @click="sendPhoneVerify" :disabled="phoneCooldown > 0 || isSending"
              class="btn btn-sm btn-outline-dark bg-white">
              {{ phoneCooldown > 0 ? `請稍後 (${phoneCooldown}s)` : '發送驗證碼' }}
            </button>
          </div>
          <!-- 點擊發送後展開的輸入框 -->
          <div v-if="showPhoneInput && !profile.isPhoneVerified"
            class="mt-3 input-group input-group-sm animate__animated animate__fadeIn">
            <input type="text" v-model="phoneCode" class="form-control" placeholder="請輸入 6 位數簡訊驗證碼" maxlength="6" />
            <button @click="verifyPhoneCode" class="btn btn-primary px-3"
              :disabled="!phoneCode || isSending">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 會員資料修改表單 -->
    <div class="card shadow-sm">
      <div class="card-body p-4">
        <form @submit.prevent="updateProfile" class="row g-3 needs-validation">
          <div class="col-md-6">
            <label class="form-label">登入信箱</label>
            <!-- 💡 移除 disabled 與 bg-light，讓使用者可以修改 -->
            <input type="email" class="form-control" v-model="profile.email" required />
          </div>
          <div class="col-md-6">
            <label class="form-label">會員名稱</label>
            <input type="text" class="form-control" v-model="profile.name" required maxlength="40" />
          </div>
          <div class="col-md-6">
            <label class="form-label">手機號碼</label>
            <input type="text" class="form-control" v-model="profile.cellphoneNumber" maxlength="20"
              placeholder="尚未設定" />
          </div>
          <div class="col-md-6">
            <label class="form-label">生日</label>
            <input type="datetime-local" class="form-control" v-model="profile.birthday" />
          </div>

          <!-- 💡 修正按鈕排版：使用 flex-column 與 flex-sm-row 搭配 gap-3，確保直向與橫向都有完美間距 -->
          <div
            class="col-12 mt-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <small class="text-muted mb-3 mb-md-0">加入時間：{{ formattedCreatedDate }}</small>
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
import { ref, onMounted, onUnmounted, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import * as bootstrap from 'bootstrap'

const authStore = useAuthStore()
const API_URL = `${import.meta.env.VITE_API_SPOTURL}/User`

const profile = ref({
  email: '', name: '', cellphoneNumber: '', birthday: '',
  cash: 0, memberPoint: 0, createdDate: '',
  isEmailVerified: false, isPhoneVerified: false
})

const modalMessage = ref('')
let infoModalInstance = null

const isSending = ref(false)

// 冷卻時間變數
const emailCooldown = ref(0)
const phoneCooldown = ref(0)

// 獨立的計時器實例，避免信箱與手機互相干擾
let emailTimerInterval = null
let phoneTimerInterval = null

const showPhoneInput = ref(false)
const phoneCode = ref('')

// 💡 啟動冷卻倒數 (支援寫入 localStorage)
function startCooldown(type, secondsLeft = 60) {
  const storageKey = type === 'email' ? 'emailCooldownExpiry' : 'phoneCooldownExpiry'
  const expiryTime = Date.now() + secondsLeft * 1000
  localStorage.setItem(storageKey, expiryTime)

  if (type === 'email') {
    emailCooldown.value = secondsLeft
    if (emailTimerInterval) clearInterval(emailTimerInterval)
    emailTimerInterval = setInterval(() => checkCooldown(type, storageKey), 1000)
  } else {
    phoneCooldown.value = secondsLeft
    if (phoneTimerInterval) clearInterval(phoneTimerInterval)
    phoneTimerInterval = setInterval(() => checkCooldown(type, storageKey), 1000)
  }
}

// 💡 檢查與更新冷卻時間
function checkCooldown(type, storageKey) {
  const expiry = parseInt(localStorage.getItem(storageKey) || '0', 10)
  const now = Date.now()
  const remaining = Math.ceil((expiry - now) / 1000)

  if (remaining > 0) {
    if (type === 'email') emailCooldown.value = remaining
    if (type === 'phone') phoneCooldown.value = remaining
  } else {
    if (type === 'email') {
      emailCooldown.value = 0
      clearInterval(emailTimerInterval)
    }
    if (type === 'phone') {
      phoneCooldown.value = 0
      clearInterval(phoneTimerInterval)
    }
    localStorage.removeItem(storageKey)
  }
}

// 📧 發送註冊驗證信
async function sendEmailVerify() {
  if (isSending.value || emailCooldown.value > 0) return
  isSending.value = true
  try {
    const res = await axios.post(`${API_URL}/send-email-verification`, {}, { withCredentials: true })
    showMessage(res.data.message)
    startCooldown('email', 60)
  } catch (error) {
    const errorMsg = error.response?.data?.message || '發送失敗，請確認資料'
    showMessage(errorMsg)

    // 💡 同步後端秒數：如果使用者清空暫存強行點擊，抓取後端回傳的剩餘秒數校正前端
    const match = errorMsg.match(/請於 (\d+) 秒後再試/)
    if (match && match[1]) {
      startCooldown('email', parseInt(match[1], 10))
    }
  } finally {
    isSending.value = false
  }
}

// 📱 發送手機驗證碼
async function sendPhoneVerify() {
  if (!profile.value.cellphoneNumber) {
    showMessage('請先在下方表單填寫您的手機號碼，並點擊「儲存變更」後再發送驗證碼！')
    return
  }

  if (isSending.value || phoneCooldown.value > 0) return
  isSending.value = true
  try {
    const res = await axios.post(`${API_URL}/send-phone-verification`, {}, { withCredentials: true })
    showMessage(res.data.message)
    startCooldown('phone', 60)
    showPhoneInput.value = true
  } catch (error) {
    const errorMsg = error.response?.data?.message || '發送失敗，請確認手機號碼是否正確'
    showMessage(errorMsg)

    // 💡 同步後端秒數
    const match = errorMsg.match(/請於 (\d+) 秒後再試/)
    if (match && match[1]) {
      startCooldown('phone', parseInt(match[1], 10))
    }
  } finally {
    isSending.value = false
  }
}

// 📱 送出手機驗證碼
async function verifyPhoneCode() {
  if (!phoneCode.value || isSending.value) return
  isSending.value = true
  try {
    const res = await axios.post(`${API_URL}/verify-phone-code`, { code: phoneCode.value }, { withCredentials: true })
    showMessage(res.data)
    profile.value.isPhoneVerified = true
    authStore.profile.isPhoneVerified = true
    showPhoneInput.value = false
  } catch (error) {
    showMessage(error.response?.data?.message || error.response?.data || '驗證碼錯誤或已過期')
  } finally {
    isSending.value = false
  }
}

onMounted(() => {
  document.body.classList.remove('modal-open')
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())

  const modalEl = document.getElementById('infoModal')
  if (modalEl) {
    infoModalInstance = new bootstrap.Modal(modalEl)
  }

  if (authStore.isLoggedIn) {
    profile.value = { ...authStore.profile }
  }

  // 💡 頁面載入時，檢查 localStorage 是否有未跑完的冷卻時間並自動恢復倒數
  const emailExpiry = parseInt(localStorage.getItem('emailCooldownExpiry') || '0', 10)
  if (emailExpiry > Date.now()) {
    startCooldown('email', Math.ceil((emailExpiry - Date.now()) / 1000))
  }

  const phoneExpiry = parseInt(localStorage.getItem('phoneCooldownExpiry') || '0', 10)
  if (phoneExpiry > Date.now()) {
    startCooldown('phone', Math.ceil((phoneExpiry - Date.now()) / 1000))
  }
})

// 💡 離開頁面時清除計時器，避免記憶體洩漏
onUnmounted(() => {
  if (emailTimerInterval) clearInterval(emailTimerInterval)
  if (phoneTimerInterval) clearInterval(phoneTimerInterval)
})

const formattedCreatedDate = computed(() => {
  if (!profile.value.createdDate) return ''
  let dateStr = profile.value.createdDate
  if (!dateStr.endsWith('Z') && !dateStr.includes('+')) {
    dateStr += 'Z'
  }
  const d = new Date(dateStr)
  return d.toLocaleString(undefined, {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  })
})

function showMessage(msg) {
  modalMessage.value = msg
  if (infoModalInstance) {
    infoModalInstance.show()
  }
}

async function updateProfile() {
  if (!authStore.isLoggedIn) {
    showMessage('請先登入後再進行修改') 
    return
  }

  try {
    const res = await axios.put(`${API_URL}/profile`, {
      email: profile.value.email, // 💡 新增傳送信箱給 API
      name: profile.value.name,
      cellphoneNumber: profile.value.cellphoneNumber,
      birthday: profile.value.birthday
    }, { withCredentials: true })
    
    showMessage(res.data.message) 

    // 💡 核心體驗：如果信箱有變更，立刻將畫面上的驗證狀態切換為「未驗證」
    if (res.data.isEmailChanged) {
      profile.value.isEmailVerified = false
      authStore.profile.isEmailVerified = false
    }

    // 同步更新 Pinia 快取
    authStore.profile.email = profile.value.email
    authStore.profile.name = profile.value.name
    authStore.profile.cellphoneNumber = profile.value.cellphoneNumber
    authStore.profile.birthday = profile.value.birthday

  } catch (error) {
    showMessage(error.response?.data?.message || error.response?.data || '更新失敗，請稍後再試') 
  }
}
</script>

<style scoped>
.container {
  min-height: 80vh;
}
</style>