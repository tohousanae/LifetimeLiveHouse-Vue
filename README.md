# LivetimeLivehouse 一輩子的Livehouse系統-前端(非官方)

## 發想與製作動機
假設我是一個Livehouse新系統的開發團隊，而這個Livehouse要與BandDream少女音樂派對、Vocaloid系列(含世界計畫)等音樂主題ACG作品長期合作作為宣傳，因此這個系統的要求除了要有基本的練團室/樂器租借功能外，還要有讓廠商與個人舉辦活動、周邊商品販賣、資訊推播，讓使用者除了使用本系統租借練團室或樂器外，也能夠在這裡獲得第一手的官方資訊，讓本網站除了具有商品販賣、練團室樂器租借功能、舉辦活動外，也能有整理官方資訊的功能，減少使用者要去多個網站查詢前面提到的ACG作品官方資訊的負擔。

會製作這套系統是看了Mygo動畫裡面椎名立希在Livehouse登記練團時間時，店員操作Livehouse RiNG的POS機時想到的，乾脆做一個ACG作品主題的Livehouse系統出來好了，能夠在家裡就用電腦或手機預約、還不需要另外辦社群軟體的帳號去預約練團室，Livehouse練團室租借的系統在業界似乎相當少見，就連yamaha或是一些其他業者不是使用電話預約就是用社群軟體傳訊息預約。

## 功能
1. 會員相關：會員登入/註冊/修改基本資料/忘記密碼/寄送會員信箱驗證信/寄送會員簡訊驗證信
2. 購物相關(未完成)：商品搜尋/瀏覽商品(每頁顯示25/50/100筆)/加入購物車/送出訂單/選取付款方式(貨到付款/信用卡(串接第三方金流)/門市取付/儲值金扣款)/優惠券折扣、集點回饋兌換商品/追加儲值金/查看店家空位
3. 練團室相關(未完成)：租借樂器/練團室
4. 員工後臺(未完成)：分店管理/營業額統計(圖表)/指派訂單
5. 首頁/導覽頁(未完成)：商品介紹/新品上市/音樂收聽/周邊情報/二次元跨媒體作品最新情報
6. 使用者體驗相關：程式執行時有讀取畫面

## 畫面

> 登入畫面
<img width="376" height="422" alt="image" src="https://github.com/user-attachments/assets/246c8e91-56ac-4ad2-95f0-f434a954ee77" />

> 會員中心(可發送信箱驗證信、手機驗證簡訊)
<img width="368" height="648" alt="image" src="https://github.com/user-attachments/assets/eb0cd03b-09d1-46eb-8f0b-7a2225244330" />
<img width="371" height="582" alt="image" src="https://github.com/user-attachments/assets/21e63971-399d-4f57-8ae1-51dc135cd48d" />

> 註冊後與在會員中心發送的會員驗證信
<img width="628" height="343" alt="image" src="https://github.com/user-attachments/assets/16cdcef2-bf2b-44b8-9991-2450401eda25" />

## 技術
### 前端
1. Vue3
2. Vue routing
3. AJAX

### 後端
1. .net core 10 Web api
2. redis快取
3. Python爬蟲取得二次元跨媒體作品最新情報(未完成)
4. 使用者密碼使用ByCrypt、SHA256加密儲存
5. Cloudflare：網域託管(抗ddos) + 電子郵件路由 + Pages上線部署(未完成)
6. Twilio簡訊驗證

## 後端API的github介紹
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
