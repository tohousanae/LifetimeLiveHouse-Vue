# 丹丹線上點餐(非官方)

## 開發理由
丹丹官方不像麥當勞、肯德基、必勝客等連鎖業者有線上點餐跟叫外送的功能，每次要電話叫餐的過程都非常不便，例如得確認多少金額可外送、注意公休日、是否有送到該地區、統計的過程等，還得加上如果透過uber或foodpanda等第三方外送平台訂購的話可能要付出高額的抽成與外送費，所以就乾脆自己寫一個。

## 功能
1. 會員相關：會員登入/註冊/修改基本資料/忘記密碼等
2. 購物相關：瀏覽商品/加入購物車/送出訂單/選取付款方式(實際營運需串接第三方金流)/外帶或外送(選取外送時自動計算當前訂單是否達分店外送門檻，若選擇第三方外送平台外送則會顯示運費)/優惠券等/表演節目訂票
3. 員工後臺：分店管理/營業額統計等

## 基本技術
1. Vue.js框架
2. Vite

## 進階技術
1. 忘記密碼用jwt產生token
2. ByCrypt亂數加密+加鹽註冊密碼與token，提高安全性
3. CloudFlare自訂網域+CloudFlare Pages部署網頁前端

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
