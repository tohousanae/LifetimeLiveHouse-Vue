# 初音未來早午餐店線上點餐-前端(非官方)

## 商家介紹
台灣第一家初音未來主題早午餐店，除了提供中西式各種平價早午餐，內用者可以一邊吃東西一邊聽v家曲，一邊享受美食一邊享受v家帶來的魅力，另外我們絕對不會因為有初音未來這塊ip就賣盤子價格，而是為消費者提供經濟實惠的平價選擇，詳情請參閱本店價目表。

## 開發理由
開趴的時候，只要點點滑鼠或手機螢幕就能買到必勝客的披薩或是麥當勞歡樂送不用出門，你以為這樣用滑鼠點一點就能吃美食現代的常態，但事實上有些美食還是無這樣線上點餐的功能，但有些商家要遠端訂餐的話還是維持傳統的電話訂餐方式，十分不便，所以就乾脆自己寫一套餐飲業線上訂餐系統，除了讓自己練習電商網站的開發外，也許能夠提供商業數位化解決方案的參考。

## 功能
1. 會員相關：會員登入/註冊/修改基本資料/忘記密碼等
2. 購物相關：瀏覽商品/加入購物車/送出訂單/選取付款方式(實際營運需串接第三方金流)/外帶或外送(選取外送時自動計算當前訂單是否達分店外送門檻，若選擇第三方外送平台外送則會顯示運費)/優惠券等
3. 員工後臺：分店管理/營業額統計等
4. 首頁：初音未來與vocaloid相關新聞、周邊商品網站情報推播、v家歌曲推薦，讓您除了可以透過本網站訂購美食外，也能透過本網站連結購買初音未來相關周邊與聽各種v家的歌曲。

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
與台灣各家acg相關廠商甚至初音未來官方合作，代售周邊或是展演票券，與官方合作舉辦初音未來相關活動等。

## 圖片素材來源

## 聲明
以上網站內容為程式交流學習與推廣初音未來與v家之用，除不作為商業用途外，"初音未來早午餐店"為虛構店家，現實並沒有此店家的存在，所有素材來源版權歸版權擁有者所有，另外，現實開這種動漫主題店家是需要官方的授權的。
