# LivetimeLivehouse 一輩子的Livehouse系統-前端(非官方)

## 發想與製作動機
假設我是一個Livehouse新系統的開發團隊，而這個Livehouse要與世界計畫、BandDream少女音樂派對、Vocaloid系列(含世界計畫)這幾個音樂主題二次元跨媒體作品長期連動作為宣傳，因此這個系統的要求除了要有基本的練團室/樂器租借功能外，還要有讓廠商與個人舉辦活動、周邊商品販賣、前述兩個ACG遊戲的日/台服官方資訊推播，讓使用者除了使用本系統租借練團室或樂器外，也能夠在這裡獲得第一手的世界計畫/BandDream/Vocaloid官方資訊，讓本網站除了具有商品販賣、練團室樂器租借功能、舉辦活動外，也能有整理並放送Vocaloid系列(含世界計畫)/BandDream官方資訊的功能，減少使用者要去多個網站查詢前述兩個作品官方資訊的負擔。

會製作這套系統是看了Mygo動畫裡面椎名立希在Livehouse登記練團時間時，店員操作Livehouse RiNG的POS機時想到的，乾脆做一個ACG作品主題的Livehouse系統出來好了，能夠在家裡就用電腦或手機預約、還不需要另外辦社群軟體的帳號預約好好練團室多方便阿，畢竟Livehouse練團室租借的系統在業界似乎相當少見，就連yamaha或是一些其他業者不是使用電話預約就是用社群軟體傳訊息預約。

## 功能
1. 會員相關：會員登入/註冊/修改基本資料/忘記密碼/寄送會員驗證信/寄送會員驗證簡訊
2. 購物相關：商品搜尋/瀏覽商品(每頁顯示25/50/100筆)/加入購物車/送出訂單/選取付款方式(貨到付款/信用卡/門市取付)/外帶或外送/優惠券折扣、集點回饋兌換、儲值金轉換點數/期間限定活動/抽獎(包含卡片收集)/購買vocaloid唱片與線上收聽(用miku點數購買)/小遊戲收集miku點數(簽到、vocaloid音遊)(未完成)
4. 員工後臺：分店管理/營業額統計(圖表)/指派訂單(未完成)
5. 首頁/導覽頁：商品介紹/新品上市/音樂收聽/周邊情報/二次元跨媒體作品最新情報(未完成)
6. 使用者體驗相關：程式執行時有讀取畫面

## 技術
### 前端
1. SPA框架：Vite + Vue3 + Vue routing
2. AJAX
3. Jwt忘記密碼

### 後端
1. .net core 10 Web api
2. redis快取
3. Python爬蟲取得(未完成)
4. 使用者密碼使用ByCrypt、SHA256加密儲存
5. Cloudflare：網域託管(抗ddos) + 電子郵件路由 + Pages上線部署(未完成)

## 後端的github頁面
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
麥當勞歡樂送、麥當勞app、麥當勞點點卡、SEGA Diva F系列、bangdream系列、MIKUNAVI App

## 重要聲明
本專案內容為程式交流學習之用，不作為商業用途，，所有素材來源版權歸版權擁有者所有。

## Piapro角色創作規範
https://www.tw-pjsekai.com/news_detail.html?id=6998114598104701697

## 參考引用資料
1. https://pjsekai.fandom.com/zh-tw/wiki/%E5%88%9D%E9%9F%B3%E6%9C%AA%E4%BE%86
2. https://learn.microsoft.com/zh-tw/aspnet/identity/overview/features-api/two-factor-authentication-using-sms-and-email-with-aspnet-identity
3. 資料庫系統 PROJECT 2-歡樂送線上訂餐系統 https://www.mis.nsysu.edu.tw/db-book/DBProject2009Fall/db_98_03/report.ppt

## 模板來源
資展國際
