import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios' // 💡 1. 確保有引入 axios

// ==========================================
// 💡 2. 在這裡設定 Axios 的全域 CSRF 與跨域規則
// ==========================================
// 允許跨域請求攜帶 Cookie
axios.defaults.withCredentials = true;
// 告訴 Axios 去哪裡找後端發送過來的 CSRF Cookie 名稱
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
// 告訴 Axios 抓到 Cookie 後，要塞入哪個 Request Header 傳回給後端
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
