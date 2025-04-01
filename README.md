# 丹丹漢堡-線上訂餐模擬器-前端(非官方)

## 開發理由
連鎖速食店麥當勞，目前丹丹官方還沒有提供線上訂餐的服務，遠端訂餐只能透過電話或是外送平台，除了外送平台需要負擔高昂運費外，電話訂餐若接近用餐時間打可能店家會因為忙碌而漏單，因此乾脆自己做一個網站提供一個提高丹丹訂餐方便性的解決方案參考，並且透過開發流程了解電商系統實務運作的邏輯。

## 功能
1. 會員相關：會員登入/註冊/修改基本資料/忘記密碼等
2. 購物相關：瀏覽商品/加入購物車/送出訂單/選取付款方式(實際營運需串接第三方金流)/外帶或外送(選取外送時自動計算當前訂單是否達分店外送門檻，若選擇第三方外送平台外送則會顯示運費)/優惠券等
3. 員工後臺：分店管理/營業額統計等

## 基本技術
1. Vue.js框架
2. Vite

## 進階技術
1. 忘記密碼用jwt產生token
2. ByCrypt亂數加密+加鹽註冊密碼與token，提高安全性

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
