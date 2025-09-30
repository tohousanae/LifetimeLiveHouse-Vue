# 

## 網站特色


## 功能
1. 會員：會員登入/註冊/修改基本資料/忘記密碼/google第三方登入/簡訊、電子郵件雙因素驗證。
2. 購物：商品搜尋/瀏覽商品(每頁顯示25/50/100筆)/加入購物車/送出訂單/選取付款方式(貨到付款/信用卡/門市取付)/收集點數兌換商品。
3. 舉辦、報名活動。
4. 練團室、樂器租借。
5. 員工後臺：分店管理/營業額統計(圖表)/指派訂單/員工權限
6. 首頁/導覽頁：商品介紹/新品上市/最新vocaloid曲情報、歌曲試聽
7. 使用者體驗相關：程式執行時有讀取畫面，SEO優化。

## 技術
### 前端
1. SPA單頁式應用：Vite + Vue3 + Vue routing
2. AJAX
3. Jwt忘記密碼
4. ByCrypt密碼加密儲存
5. Cloudflare：網域託管(抗ddos) + 電子郵件路由 + Pages部署

### 後端
1. .net core 8 Web api
2. 串接綠界金流
3. Python爬蟲
4. azure部署：app service + sql database(sql server)雲端資料庫 + key vault隱藏gmail金鑰等機密資料
5. redis快取

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
麥當勞歡樂送、麥當勞app、麥當勞點點卡、SEGA Diva F系列

## 重要聲明
本專案內容為程式交流學習之用，不作為商業用途，，所有素材來源版權歸版權擁有者所有。

## 世界計畫二次創作、Piapro角色創作規範
https://www.tw-pjsekai.com/news_detail.html?id=6998114598104701697

## 參考引用資料
1. https://pjsekai.fandom.com/zh-tw/wiki/%E5%88%9D%E9%9F%B3%E6%9C%AA%E4%BE%86
2. https://learn.microsoft.com/zh-tw/aspnet/identity/overview/features-api/two-factor-authentication-using-sms-and-email-with-aspnet-identity
3. 資料庫系統 PROJECT 2-歡樂送線上訂餐系統 https://www.mis.nsysu.edu.tw/db-book/DBProject2009Fall/db_98_03/report.ppt
4. 使用 Vue3 與 Tiptap 打造文字編輯器 https://eva813.github.io/2024/07/19/vue-tiptap/#:~:text=%E6%9C%AC%E6%96%87%E5%B0%87%E4%BB%8B%E7%B4%B9%E5%A6%82%E4%BD%95%E5%9C%A8%20Vue3%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20Tiptap%EF%BC%8C%E4%B8%A6%E7%B5%90%E5%90%88%20Vuetify%20%E5%AF%A6%E7%8F%BE%E6%96%87%E5%AD%97%E7%B7%A8%E8%BC%AF%E5%99%A8%E3%80%82%20%E6%A0%B9%E6%93%9A%E5%B0%8D%E6%87%89%20EXTENSIONS,italic%20%E4%BB%A5%E6%AD%A4%E9%A1%9E%E6%8E%A8%E2%80%A6%20%E6%A0%B9%E6%93%9A%E6%89%80%E9%9C%80%E8%A6%81%E7%9A%84%E5%8A%9F%E8%83%BD%E4%B8%80%E6%AD%A5%E6%AD%A5%E5%8A%A0%E5%85%A5%20%E4%BB%A5%20vue3%20%E7%82%BA%E7%AF%84%E4%BE%8B%20%2B%20vuetify
5. 中山大學資工系 歡樂送線上訂餐系統：https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwww.mis.nsysu.edu.tw%2Fdb-book%2FDBProject2009Fall%2Fdb_98_03%2Freport.ppt&wdOrigin=BROWSELINK
6. 初音ミク公式ナビ「ミクナビ」 https://mikunavi.com/\
7. 蝦皮購物 https://shopee.tw/
8. 必勝客 https://www.pizzahut.com.tw/
9. 台大活動報名系統 https://www.cc.ntu.edu.tw/chinese/epaper/0011/20091220_1103.htm

## 模板來源
資展國際

## 未來規劃
1. 完成所有功能與後端串接
2. Pinia狀態管理
3. 提升安全性並減少bug、效能優化
4. Visio繪製流程圖

