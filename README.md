# 初音未來早餐店線上點餐-前端(非官方)

## 開發理由
開趴的時候，只要點點滑鼠或手機螢幕就能買到必勝客的披薩或是麥當勞歡樂送不用出門，你以為這樣用滑鼠點一點就能吃美食現代的常態，但事實上有些美食還是無這樣線上點餐的功能，但有些商家要遠端訂餐的話還是維持傳統的電話訂餐方式，十分不便，所以就乾脆自己寫一套餐飲業線上訂餐系統，也許能夠作為餐飲業數位化模式的參考。

## 功能
1. 會員相關：會員登入/註冊/修改基本資料/忘記密碼等
2. 購物相關：瀏覽商品/加入購物車/送出訂單/選取付款方式(實際營運需串接第三方金流)/外帶或外送(選取外送時自動計算當前訂單是否達分店外送門檻，若選擇第三方外送平台外送則會顯示運費)/優惠券等/表演節目訂票(初音未來3d投影演唱會)
3. 員工後臺：分店管理/營業額統計等

## 基本技術
1. Vue.js框架
2. Vite

## 進階技術
1. 忘記密碼用jwt產生token
2. ByCrypt亂數加密+加鹽註冊密碼與token，提高安全性
3. CloudFlare自訂網域+CloudFlare Pages部署網頁前端
4. api需驗證才能呼叫

## 後端部分

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
## 未來規劃
1. 既然身為

## 圖片素材來源
