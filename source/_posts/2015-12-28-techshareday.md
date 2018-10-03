title: 現代化網站技術分享日筆記心得
tags:
  - other
  - notes
categories:
  - [心得筆記]
description: 現代化網站技術分享日的筆記
toc: false
date: 2015-12-28 15:46:07
---

# 活動簡介
- 時間：12/22(二) 
- 地點：台北國際會議中心 201 會議室(台北市信義路五段 1 號)
- 主辦單位：Microsoft  iThome

# 活動議程
|時間   |   議程|
|-------|:------|
|09:30-10:20| 現代化網頁開發技術三要素
|10:40-11:20|   SASS & RWD 前端版型架構規劃|
|11:40-12:20|   104 兒童美術館 (cicisasa.com) 自動部署上線技術分享|
|13:30-14:10|   前端網頁資料視覺化設計|
|14:30-15:10|   解密網頁設計效能優化 |
|15:30-16:10|   現代網頁設計趨勢觀察|

## 現代化網頁開發技術三要素
上官林傑 / 台灣微軟 應用開發技術經理

### 演講內容
> ### 現在網頁開發應該注意的事項
> - 標準文件模式
> 使用`<!DOCTYPE html>`作為開頭
> 避免使用`X-UA-Compatible`標頭，限制瀏覽器的能力
> 
> - 減少依賴外掛程式
> 安裝外掛程式會讓使用者不想停留在該網頁上
> 一定要用外掛程式嗎？找出當初使用此外掛程式的原因，逐漸走向沒有外掛程式的網頁應用。
> 此處的外掛是指例如：ActiveX、flash
> 
> - 避免判斷瀏覽器版本
瀏覽器版本不再是重要的指標，因為現在瀏覽器更新頻率很高，你很難記住哪些瀏覽器支援哪些功能，應該檢查此 function > > 存在，而不是根據瀏覽器版本做判斷。
>  
> - 使用新版的 JavaScript 函式庫
> 修正舊版本的錯誤，提升效能，如果你還在使用舊版本，等於在折磨你的 user
> 換不掉的原因可能是用了太多 plugin，存在著技術債
> 使用更有效率、瀏覽器原生的 HTML5/ECMAScript 2015 APIs
> 大幅導入 HTML5 特性的 jQuery 1.6 都是已經四年前的事了...
> 以 jQuery 為例，假如你在用 1.8.0 那你盡量用 1.8.3，找最穩定的版本，但是不要用latest.js XD
> 
> - 減少在 CSS 中使用 vendor-prefix
> `-webkit-*` 反而成為這個年代的 IE6，減少使用`vendor-prefix`，新增更多相容性
> 建議查看 http://caniuse.com 或 升級最新版本的 CSS Framework
> 
> - [Site Scan](https://dev.windows.com/zh-tw/microsoft-edge/tools/staticscan/)
> [Github](https://github.com/MicrosoftEdge/static-code-scan) 上有開放原始碼，可單機進行
> 
> ### RWD, Responsive Web Design
> 以前螢幕解析度還有特定解析度，但現在已經無法預測世界會有多少解析度了...
> 要採用手機用戶思考使用情境，更容易進行設計 ( 例如 table 桌機和手機設計大不同 ）
> 比較快速的方法：套用 RWD framework
> 設計是一回事，那怎麼做測試？
> - 手動調整瀏覽器寬度
> [BrowserStack](https://www.browserstack.com/)
> [Browser screenshots](https://dev.windows.com/en-us/microsoft-edge/tools/screenshots/)
> 
> ### 支援高解析度螢幕
> 新的裝置幾乎都是高解析度螢幕
- [HTML5 picture](http://webdesign.tutsplus.com/tutorials/quick-tip-how-to-use-html5-picture-for-responsive-images--> > s-21015)
> - [picturefill](https://github.com/scottjehl/picturefill)
> - 向量圖形，向量字型
> 
> ### Touch Friendly
> 減少只有滑鼠可以操作的行為
> 針對特殊的輸入格式，提供不同的鍵盤按鈕 例如 
> `<input type="email">`
> 
> ### 自動化工具
> 挑一個熟悉，生態系還活著的來用
> - grunt
> - gulp 
> - broccoli
> 
> ### [TypeScript](http://typescriptlang.org )
> 編譯成 JavaScript
> JavaScript 本身沒有 Type
> TypeScript 可以加上 Type 可以檢查呼叫的 Type ， 確認資料型態是否正確
> 
> ### BabelJS
> 將 ES6 的語法翻譯成 ES5
> 
> ### [VorlonJs](http://vorlonjs.com/)
大大部落格有介紹使用 [Vorlon.js: 同時測試多瀏覽器網頁呈現的好工具](http://blogs.msdn.com/b/ericsk/archive/2015/11/06/ing-> > vorlonjs-to-debug-your-web-app.aspx)
> 同時偵錯多個瀏覽器的呈現效果的工具，使用 nodejs 開發
> 如果在本機跑的話，會在本機產生一個 web 應用程式
> 網站裡只要加上一行：
 ``` html 
 <script src="http://localhost:1337/vorlon.js"></script>
 ```

感想：
大大說明了開發現代化網頁的注意事項，以及設計的重點。

## SASS & RWD 前端版型架構規劃
廖洧杰/高雄前端社群發起人

<iframe src="//www.slideshare.net/slideshow/embed_code/key/3avhl84oYNyNnd" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>

**[Sass & rwd前端版型架構規劃](www.slideshare.net/sfismy/sassamprwd)** from **[洧杰 廖](www.slideshare.net/sfismy)**

感想：
命名與架構規劃的結合，讓你維護更加便利。

補充：
[Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css)
bootstrap 4 用 sass
bootstrap 5 用 postcss

## Modem FrontEndDevops - 104 兒童美術館 (cicisasa.com) 自動部署上線技術分享
李坤承 / 104 Devops 專案經理

### 演講內容
> [兒童美術館](http://www.cicisasa.com/)這個網站，導入很多新技術
> 
> why FrontEnd Devops？
> Devops 其實不太會分前端後端
> 但是許多 Ops 偏向後端技術，他們不懂 為何前端如何複雜？
> 
> 我們需要好的架構，做上線的規劃
> 我們需要瞭解一些後端技術
> Plan & Goal 計畫網站要如何部署
> 1. 自動化！！！
> 不自動化的話，會非常的辛苦，為了降低人工的成本，自動化的範圍：QA TESTing
> 2. 需要有好的 JS/CSS 框架，如果沒有的話，會非常難處理
> 
> 利用 HotDeploy 實現 Zero Downtime 
> 特性是，上線的話，網站不需要封站
> 如何網站不要封，在部署的時候，那些使用者還繼續在使用你的網站
> 要去實現 Zero Downtime，要做的難度非常高，台灣的網站目前要做到，是完全不可能的，但我們把這個當作目標來看。
> 如果做自動化的話，要 CI/CD 實現隨時都可以上線
> 
> 500 error 需要被 handle
> server handlserver error handleing!!!
> 
> cicisasa 是如何做到如何自動部署？
> 
> cicisasa 做的事情是 免費儲存小孩圖畫的網路空間，保存孩子的童年回憶及創意
> 這個需求很簡單，把圖片上傳，讓大家留言和分享
> 那這麼簡單，就拿來玩吧，當作技術的實驗場
> 
> 考慮要用什麼 Code language？
> 例如 PHP nodejs 等
> 最後決定是 nodejs 
> 因為是輕量，語法很簡單，前後端語言可以相容，可以一致，
> 有相當豐富的 Ecosystem
> 
> Ecosystem 使用的技術
> - Database redis
> - FrontEnd Framework  JS Framework Backbone.js
> - Grunt
> - browserify Bower
> - Continuous integration 
> - Travis CI
> - Template Engine JADE
> - mocha PhantomJS
> - socket.io
> - HotDeploy naught

感想：
這個實作範例的目標是 Zero Downtime，但是大大特地繞了一下，想要當作技術實驗場

補充: [Kenny大大的gitHub 有分享日的資料](https://github.com/KennyTw/ITHomeFEDevops?files=1)

## 前端網頁資料視覺化設計
吳泰輝/infographics.tw 創辦人

### 演講內容

> ### 資料和前端怎麼結合在一起
[A 3-D View of a Chart That Predicts The Economic Future: The Yield Curve](http://www.nytimes.com/interactive/2015/3/19/> > upshot/3d-yield-curve-economic-growth.html)
> [Data-Driven Documents( D3.js)](http://d3js.org/)
> d3.js 不只可以畫 svg 也可以做數值運算 還可以畫 3d 的圖
> 例如：
> - [Banana in X3D](http://zbryikt.github.io/visualize/banana/)
> - [bl.ocks.org](http://bl.ocks.org/)
> 
> [Processing](http://processingjs.org/)
> [p5.js](http://p5js.org/)
> [pixijs](http://www.pixijs.com/)
> PathGL
> PathGL D3,meet webGL
> ![Rasterize D3.js](https://lh3.googleusercontent.com/opm0HwtQ_CHdY-gaDZwS_DpZZ2xGMZjUXdrUU9TF7eijzueCsPA09g0LvtnNAq5rNN1Pdy_1w9wd7wjbpYYuOto7RzKCtBZu-myJ-5bALbIP1xT_SZATDk7JHghO979LxpnQsOwEXrphf9WVXdROZA22gTRHMdxRRmgF4DCwkS3W105Fkc4M2g2Ns7aTyHyMV7vSgOZfSlyClvOsLqDPX0f07yoqvAME9F2TRsQi_1ASkk5jZ3G2nOf6r5oFzh4imeJ1GiHy_7MlOtIEA4foKVIsIDpfWEanI8JEhxY3q2MTpuoOxx-2m5sK1tbqh24S4CE-ebgo82i9UnsuLlk31rBAIdXNe4ZFXK8Fe4UxSDM-OHhzBniZMxlje03rvOP2Nhxn5vPmJLL_7PARs8Xuo6ns8fq05bvdyNObArV8IZ02cDZPqjxAGnYE9FBBtAUlXauRNGafVGEw0Wv2CdgmQKUoBemzTFCBiKIY3UVvbW69DqqIC0bKaHfL64FrMO6bIlp96mO72O0xg9aWindH5V8UwKoNccJA1y2S6HRntAyGDqnYrBzQZ_w2ALaueDgmNiA1s33M5WcDCPXsaim7klmsTWbEiq89ruLIqfxUNd1DMLoFqG4p2QZnXd_nRDzl0Wj25SCpI6mBDV-ThQDaKiwPYzmwtesDyXREFOWU7w=w429-h343-no)
> ### RWD 
[new york time example](http://www.nytimes.com/interactive/2015/06/17/world/middleeast/map-isis-attacks-around-the-orld.> > html)
> [U.S. GUN DEATHS](http://guns.periscopic.com/)
> 我們在做視覺化的時候，如果遇到螢幕比較小，可以把相關的文字資訊移出來
> 圖表文字的大小要注意
> 長條圖的長寬是可以調整的，自己去做 scale
> 如果遇到螢幕比較小，手指比較大，我們可以利用切割區域的方式增加感應的區塊
> 當你資料真的很多，但又想要全部顯示出來的話，可以透過 change 
> [房地資訊實驗室](http://www.foundi.info/lab/badneighbor/) 嫌惡設施報你知 灰色是墓碑，紅色是電塔
> 
> ### Visualization without Web
> 當我們在考慮視覺化的時候，我們可以用什麼方式讓人們重新去做思考
> U.S. 視覺化搭配情緒影響力，我們可以發現更多不一樣的東西
> [報導者，零傳媒](http://0media.tw/)
> 不只是視覺，還包括聽覺等等來敘事
> 新聞上面要怎麼使用這些新技術
> 新知和案例

感想：
視覺化設計的工具不少，效能與表現效果的取捨得看內容決定，所欲表達的內容，利用視覺化呈現達到加倍的效果是視覺化的目的。
 
## 解密網頁設計效能優化 (The Secrets of Web Design Performance)
Paul Li / Yahoo Front End Engineer

<iframe src="http://mei.homin.com.tw/Keynote_the_secrets_of_web_design_performance.html" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen > </iframe>

### 演講內容
> #### WebPageTest yslow 
> Chrome devTool 快速瞭解網站缺點和優點，進一步去改善
> 點到 Network 會看到網站發出哪些 Request 以及 藍色的線和綠色的線
> 藍色的線越短越好，藍色越短，使用者可以越快看到我們的內容
> 第一個原則是： 有效的減少 request 因為是我們網站等待時間成本最高的部分
> 點選 Timeline 可以看到 request detail
> 今天的任務就是有效的減少 request
> 如果你不在乎 user 的感受，那麼使用者就用訂單來修理你
> Avoid 404 response
> 我們要盡量避免這種事情發生，千萬不要忘記這個小圖示(Favicon)的置入
> 可能我們的頁面會有不同的 module
> checkout flow - cart
> Yahoo是BY PageFlow來載入CSS，只MERGE相關的CSS，不會載入不必要的CSS
> 用inline可以減少Request，但就無法得到Cache的好處。
> the Ultimate solution
> 
> #### Css Sprites
> 把所有的 icon 都 merge 成一張，透過 css 做動態定位的效果
> 原本有 50張圖片的 request，拼成一張 只需要一個 request
> or svg sprite?
> 
> #### Icon font
> 把圖形放到字型裡面，透過 Icon font，顯示向量圖檔，不會有失真的問題出現
> 例如： IcoMoon
> 
> #### imageLazyLoad
> 
> #### Minimize cookie
> #### Extend Max parallel HTTP request
> 如果我們可以拓展連線數的話，可以拆開不同的 domain，就可以加速同時連線的速度
> 這邊應該是 hostname 吧？
> Frontend就是要幫DOM做有效的瘦身
> 
> #### Remove useless DOM
> 例如：css的
> `before`
> `after`
> (使用css的before和after，就可以消除多餘的div，也減少DOM）
> Generate DOM when need
> Store DOM in somewhere
> 
> #### SEO Structure data
> Schema.org
> 使用 Microdata 會增加不少的節點，建議不要再用了！
> 我們可以使用最新最潮的 **JSON-LD**
> [Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/)
> 
> #### 即早輸出CSS
> CSS SELECTOR 做優化（browser是右邊往左邊讀)
> 盡量用classname做快速選取
> Screen Render flow
 ``` css
 CSS attribute: will-change
 .moving-element {
 will-change: transform;
 }
 .moving-element {
 will-change: transform, opacity;
 }
 ```
> 只要是CSS可以做到的，就不會用JS去代工
> JS是一個一個下載後再解析，等所有JS載入完成，會很久
> 
> #### timeline
> 動態的運行 script
> #### pageRender
> some javascript tips
> 真正需要用到才去 init
> 不要把太多的事件加在同一個 element ，會造成效能上的損耗
> 不要在同一個時間做太多DOM的操作
> #### Remove Flash
> 早期 multi-upload video 等，現在 html5 都可以幫我們執行
> Navigation Timing API
> #### Web Storage
> 我們可以透過 client side 來幫我們儲存資料
> 有效減少 request，幫我們把資料 cache 起來
> 可以用在例如搜尋 ( relative dropdown list ) 或autocomplete
> #### instant page

感想：
Paul 大大的調校面面觀，很有收穫呀。

## 現代網頁設計趨勢觀察
李建杭(Amos) / 熱血的前端開發者＆講師

> 那道閃光真的離開我們了！！！ flash！！
> 最友善的瀏覽器被宣告了死刑
> Javascript 突然稱霸了網路世界
> 視覺＋互動
> 扁平化設計當道
> 網頁總要放漢堡
> 操作流程改善
> 網頁互動改善
> 動畫設計組件化
> 參考網站
> - Smashing
> - awwwards
> - UXPin

補充一下最後Amos大demo的sublime text 外掛 ([iconfont snippets](https://packagecontrol.io/packages/iconfont%20snippets))：

------
詳細來源可以參考[共筆資料](https://hackpad.com/ZWVGk6BFDfn)
