title: 三層結構與 Asp.Net MVC 的簡介
categories: 程式技術筆記
tags:
  - notes
  - other
toc: false
date: 2017-07-29 21:25:52
description:
---

## **三層式架構 ( Three-Tier ) **
是很常見的架構，可以應用在**實體機器架構**上，也可以應用在**邏輯架構**上，可以按照**實體**與**邏輯**上去進行區分。實體三層架構與作用如下
- **客戶端應用程式 ( Client Application 顯示層 ) **
負責處理客戶端的使用者介面及資料處理﹐比如說資料形態的確認等。
- **應用程式伺服器 ( Application Server 商業邏輯層 ) **
介于資料庫和客戶端應用程式間，負責將客戶端應用程式的需求回應給資料庫伺器﹐再將資料庫的資料傳給客戶端應用程式
- **資料庫伺服器 ( RDBMS, Relational Database Management System 資料層 ) **
就是資料庫﹐比如 MS SQL SERVER 、 PostgreSQL 、 Oracle 等等。
<!-- more -->

{% mermaid %}
  graph LR
  A(fa:fa-user 客戶端應用程式)-->B(fa:fa-server 應用程式伺服器)
  B-->C(fa:fa-database 資料庫伺服器)
{% endmermaid %}

三層式架構可以簡易看為是在客戶端與資料庫之間加入了一個**中間層**，中間層通常包含：
- **資料存取層** ( **D**atabase **A**ccess **L**ayer，簡稱 DAL )
- **商業邏輯層** ( **B**usiness **L**ogic **L**ayer，簡稱 BLL )
- **資料物件模型層** ( **D**atabase **O**bject **M**odel Layer，簡稱 DOM )

{% mermaid %}
  graph LR
  A(fa:fa-laptop 使用者介面)-->B(fa:fa-briefcase 商業邏輯)
  B-->C(fa:fa-tasks 資料存取)
  C-->D(fa:fa-object-group 物件模型)
  D-->E(fa:fa-database 資料庫伺服器)
{% endmermaid %}

邏輯上的三層式架構 ( 或 **N 層**架構 ) ，是一種**軟體抽象**的層次結構，從整個應用程式架構的角度來區分為三層 ( 如果需要，還可以分 N 層 ) ，是為了**解決整個應用程式中，各個操作過程中不同階段的程式碼封裝的問題**，使程式設計師更加專注的處理某階段的商業邏輯。
比如將資料庫操作封裝到一層中，提供一些方法根據參數直接返回用戶需要的資料，這樣在處理具體的商業邏輯的時候，就不用關心資料的儲存問題了；簡單來說就是**強化內聚，降低耦合**，其簡易分層如下：

- **表現層 USL** ( **U**ser **S**how **L**ayer 或 UI 或 Presentation layer)
用於顯示資訊和接收用戶輸入的資料，為用戶提供一種交互式操作的介面。通俗講就是展現給**用戶的介面**，即**用戶在使用一個系統的時候的所見所得**。

- **商業邏輯層 BLL** ( **B**usiness **L**ogic **L**ayer )
**商業邏輯層**在體系架構中的位置很關鍵，它處於**資料存取層**與**表現層**中，起到了數據交換中承上啟下的作用。由於層是一種弱耦合結構，層與層之間的依賴是向下的，底層對於上層而言是「無知」的，改變上層的設計對於其調用的底層而言沒有任何影響。

- **資料存取層 DAL** ( **D**ata **A**ccess **L**ayer )
有時候也稱為**持久層**，其功能主要是**負責資料庫的訪問**，可以訪問資料庫系統、二進位文件、文本文檔或是 XML 文檔。簡單說法就是**實現對資料表的查詢、新增、刪除與修改的操作**。如果加入 ORM ，那麼就會包括物件和資料表之間的對應，以及物件實體的持久化。

分層設計時，遵循了**面向介面**設計的思想，那麼這種向下的依賴也應該是一種**弱依賴**關係。因而在不改變介面定義的前提下，理想的分層式架構，應該是一個支持可抽取、可替換的「抽屜」式架構。
{% note success %}
### 優點
- 利於標準化
- 降低層與層之間的依賴
- 利於各層邏輯的復用，資源重用性好
- 開發人員可以只關注整個結構中的其中某一層
- 具有良好的開放性和可擴充性，維護和升級方便
- 提高系統的安全性
{% endnote %}
{% note danger %}
### 缺點
- 有時會導致連動的修改。
如果在表現層中需要增加一個功能，為保證其設計符合分層式結構，可能需要在相應的商業邏輯層和資料存取層中都增加相應的程式碼。
- 相對於不分層，降低了系統的性能。
如果不採用分層式結構，很多業務可以直接造訪資料庫，以此獲取相應的數據，如今卻必須通過中間層來完成。
- 增加了開發成本。
{% endnote %}
## [**Asp.Net MVC**][10] 架構

**[ASP.NET MVC][10]** 是微軟在 2009 年 4 月份發布的一種網站開發架構，它是把傳統意義上的 **MVC** 開發思想融合到了 **ASP.NET** 的開發當中，為了解決傳統開發中不能分離 **Model** , **View** 和 **Controller** 而設計的。

MVC 是在**應用程式 ( B/S 結構 )** 的**視圖層**劃分出來的不同功能的幾個模塊。主要是為了解決應用程式用戶介面的樣式替換問題，把展示數據的 HTML 頁面儘可能的和業務代碼分離。 MVC 把純凈的介面展示邏輯 ( 用戶介面 ) 獨立到一些文件中 ( Views ) ，把一些和用戶交互的程序邏輯 ( Controller ) 單獨放在一些文件中，在 Views 和 Controller 中傳遞數據使用一些專門封裝數據的實體對象，這些對象，統稱為 Models。
按照 [MSDN 上 **ASP.NET MVC 4**][11] 上的說明，其架構包含：
- 模型 ( **M**odel )
模型物件屬於實作應用程式資料網域邏輯之應用程式的一部分。
即 Model (模型層)，主要負責商業邏輯與資料庫之間的處理
不是三層中的 Model (實體層)，其實包括三層中的 BLL 、 DAL 、 Model
- 檢視 ( **V**iew )
檢視是顯示應用程式中使用者介面 (UI) 的元件。
即 View (視圖層)，主要用於顯示數據和提交數據
- 控制器 ( **C**ontroller )
控制器就是元件，可以處理使用者互動、使用模型並且在最後選擇可以轉譯要顯示 UI 的檢視。
主要是用作捕獲請求並控制請求轉發

{% mermaid %}
  graph LR
  A((檢　視))==>B((模　型))
  C((控制器))==>A
  C==>B
{% endmermaid %}

### 優點
- 沒有在頁面中保存頁面狀態狀態(相對 WebForm ViewState)
- 開發者可以完全掌控頁面的呈現過程
- 易於單元測試
- 易於測試驅動開發 (Test-Driven Development)
- 可擴展、可替換

## 三層架構與 ASP.NET MVC 比較

以下是 MVC 與三層架構的對應關係
{% mermaid %}
  graph LR
  subgraph USL
  controller((控制器))==>view((檢　視))
  end
  subgraph BLL
  model((模　型))
  end
  view==>model
  controller==>model
{% endmermaid %}

### 相同點
- 都是把資料與呈現分離，以降低耦合

### 相異點
- 兩者的差異如下表
|項目|三層式架構|ASP.NET MVC|
|:---:|:---:|:---:|
|Model|實體類別構成|商業邏輯層與資料存取層組成|
|Controller|沒有定義 Controller 的概念|-|
|分類|體系結構模式/部署模式|設計模式/表示模式|

不過在程式開發實務上，則是會依照情境的需要進行細分，所以如何區分，還是得看各自的需求。

## 參考資料
- [壹讀 mvc與三層結構終極區別][1]
- [壹讀 三層架構優缺點][2]
- [人人IT 三層架構及其優缺點][3]
- [台灣 WiKi][4]
- [WiKi Multitier architecture][5]
- [CS架構和BS架構][7]

[1]: https://read01.com/0ej6kj.html
[2]: https://read01.com/ezOm2Q.html
[3]: http://fanli7.net/a/bianchengyuyan/ASP/20130728/402562.html
[4]: http://www.twwiki.com/wiki/%E4%B8%89%E5%B1%A4%E7%B5%90%E6%A7%8B
[5]: https://en.wikipedia.org/wiki/Multitier_architecture
[6]: http://wiki.mbalib.com/zh-tw/%E4%B8%89%E5%B1%82%E7%BB%93%E6%9E%84
[7]: https://read01.com/zh-tw/kjxay.html#.WXlAzIiGNPY "CS架構和BS架構"
[8]: https://read01.com/z2L87.html
[9]: https://blog.yszhang.tw/how-write-api-architecture
[10]: https://msdn.microsoft.com/en-us/library/dd394709.aspx
[11]: https://msdn.microsoft.com/zh-tw/library/dd381412(v=vs.108).aspx
