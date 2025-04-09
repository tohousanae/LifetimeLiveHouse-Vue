# 初音未來早午餐店線上點餐-前端(非官方)

## 商家介紹
台灣第一家初音未來主題早午餐店，除了提供中西式各種平價早午餐，內用者可以一邊吃東西一邊聽v家曲，還能參觀店內的vocaloid博物館，一邊享受美食一邊享受v家帶來的魅力，另外我們絕對不會因為有初音未來這塊ip就賣盤子價格，而是為消費者提供經濟實惠的平價選擇，詳情請參閱本店價目表。

## 功能
1. 會員相關：會員登入/註冊/修改基本資料/忘記密碼/第三方登入/註冊手機簡訊、信箱驗證等
2. 購物相關：瀏覽商品/加入購物車/送出訂單/選取付款方式(串接第三方金流)/外帶或外送(選取外送時自動計算當前訂單是否達分店外送門檻，若選擇第三方外送平台外送則會顯示運費)/優惠券等
3. 員工後臺：分店管理/營業額統計等
4. 首頁：在.net web api當中整合python爬蟲提供初音未來與vocaloid相關新聞、周邊商品網站情報、v家歌曲推薦、初音未來相關展演情報推播，讓您除了可以透過本網站訂購美食外，也能透過本網站連結購買初音未來相關周邊、展演與聽各種v家的歌曲。

## 基本技術
1. Vue.js框架
2. vite+.net web api前後端分離
3. 透過 ASP.NET Identity 使用簡訊和電子郵件進行的雙重要素驗證

## 進階技術
1. 忘記密碼用jwt產生token
2. ByCrypt亂數加密註冊密碼與token
3. CloudFlare自訂網域+CloudFlare Pages部署網頁前端，以cdn技術防ddos攻擊

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

## 重要聲明
本專案內容為程式交流學習與推廣初音未來與v家之用，不作為商業用途，"初音未來早午餐店"為虛構店家，現實並沒有此店家的存在，所有素材來源版權歸版權擁有者所有。

## 引用資料
1. https://pjsekai.fandom.com/zh-tw/wiki/%E5%88%9D%E9%9F%B3%E6%9C%AA%E4%BE%86
2. https://learn.microsoft.com/zh-tw/aspnet/identity/overview/features-api/two-factor-authentication-using-sms-and-email-with-aspnet-identity

## 模板來源
資展國際
