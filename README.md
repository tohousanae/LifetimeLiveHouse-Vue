# 初音未來早午餐店線上點餐-前端(非官方)

## 網站特色
結合商品訂購與Vocaloid資訊推播功能

## 功能
1. 會員相關：會員登入/註冊/修改基本資料/忘記密碼/第三方登入/手機簡訊、信箱驗證
2. 購物相關：瀏覽商品/加入購物車/送出訂單/選取付款方式(串接第三方金流)/外帶或外送/優惠券折扣
3. 員工後臺：分店管理/營業額統計等
4. 首頁/導覽頁：商品介紹/新品上市/vocaloid音樂周邊情報


## 技術
### 前端
1. SPA：Vite + Vue3 + Vue routing
2. AJAX
3. 簡訊、電子郵件雙因素驗證
4. google第三方登入
5. Jwt忘記密碼
6. ByCrypt亂數加密使用者密碼
7. Cloudflare：網域託管(抗ddos) + 電子郵件路由 + Pages部署

### 後端
1. .net core 9(後端)
2. 串接綠界金流
3. Python爬蟲

## 後端github頁面
https://github.com/tohousanae/am3buger-WebApi

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 參考系統
麥當勞歡樂送

## 重要聲明
本專案內容為程式交流學習與推廣初音未來與v家之用，不作為商業用途，網站功能僅為展示成果用，無法實際進行商品交易，"初音未來早午餐店"為虛構店家，現實並沒有此店家的存在，所有素材來源版權歸版權擁有者所有。

## 參考引用資料
1. https://pjsekai.fandom.com/zh-tw/wiki/%E5%88%9D%E9%9F%B3%E6%9C%AA%E4%BE%86
2. https://learn.microsoft.com/zh-tw/aspnet/identity/overview/features-api/two-factor-authentication-using-sms-and-email-with-aspnet-identity
3. 資料庫系統 PROJECT 2-歡樂送線上訂餐系統 https://www.mis.nsysu.edu.tw/db-book/DBProject2009Fall/db_98_03/report.ppt

## 模板來源
資展國際
