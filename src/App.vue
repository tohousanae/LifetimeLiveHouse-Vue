<script setup>
import { RouterView, RouterLink } from 'vue-router'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
</script>

<template>
  <div class="app-background"></div>

  <div class="app-wrapper">
    <header class="glass-header sticky-top">
      <div class="container d-flex justify-content-between align-items-center py-3">
        <h1 class="h5 mb-0 text-white shadow-text">MyGO 系統</h1>
        <nav>
          <RouterLink to="/" class="glass-btn">首頁</RouterLink>
          <RouterLink to="/about" class="glass-btn">關於</RouterLink>
        </nav>
      </div>
    </header>

    <main class="container mt-4 flex-grow-1">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* 背景圖片設定 (Fixed 讓它固定不跟著網頁滾動) */
.app-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* 請將這裡替換成你要的背景圖片路徑 */
  background-image: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 頂部導覽列獨有樣式 */
.glass-header {
  background: rgba(20, 20, 20, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.shadow-text {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
}

/* 保留你原有的 Bootstrap 網格調整 */
@media (min-width: 767px) {
  .row-md-cols-5 .col {
    width: 20%;
  }
}
</style>

<style lang="scss">
// 引入Boostrap自訂義css與boostrap icons
@use '../scss/custom.scss';
@import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';

/* =========================================
   將毛玻璃的共用元件放在全域 SCSS，
   讓 RouterView 裡面的所有頁面都可以直接使用！
   ========================================= */

// 毛玻璃卡片 (可用於子頁面的內容區塊)
.glass-card {
  background: rgba(30, 30, 30, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  color: white;
  padding: 24px;
  
  // 確保裡面的文字不會被背景吃掉
  h1, h2, h3, h4, h5, h6, p {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
}

// 毛玻璃按鈕 (與 Bootstrap btn 類別不衝突)
.glass-btn {
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.4);
    color: white;
    transform: translateY(-2px);
  }
  
  // 加上 primary 的狀態 (可以搭配你的 Bootstrap 色系)
  &.primary {
    background: rgba(13, 110, 253, 0.2); // Bootstrap primary blue
    border-color: rgba(13, 110, 253, 0.4);
    
    &:hover {
      background: rgba(13, 110, 253, 0.4);
      box-shadow: 0 0 15px rgba(13, 110, 253, 0.3);
    }
  }
}
</style>