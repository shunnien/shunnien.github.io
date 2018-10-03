title: JS30紀錄 06-Type Ahead
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2017-12-19 19:46:47
---

# 目標

![targe](https://lh3.googleusercontent.com/OTxAcGZTlWRisZjyQqZJbqJrC34DFbxDdF-MoMQM_nKzSYHtpgJgihKe7bclbWDLYhngHTuQevPGw2v1KV-UZUQ9YapMPAv3QBrUGdKUnXQ1krOr2wAQYKHwvaycv--ZGTSiJqOPm0ZXIoVfZNkG0J-zcmmJ4rDaJSTpsbxdPY-OMN1FxW0RmVQ2bh4LF2a-8bHJPXV4Cer8X0NXFH3GBNeKz42_YR0sB4YbJ4Q2Il9AUd8IQtSGjcN0zZIsMAiVTg6ly_0gS59pTB38KLQ6dS4iZOfDxtCDxqmg4_IJzWLrT870d80iJiwc9W_VIQpMc1vnxImbE-CRn386rzmPx3Vh9e_PrCd4JCq6CcNm5ojFjCEvyjEd_cIN8nTDxd6dVMC3kr2nj5PM9dXBYAr2hY-mjMHp4j_ZtsZ8_URkBMVyRbd0Gvyxm8sAXKmn7h_NN9MdLI3tWJGJLWwn18V8uUx71OgP31JZuF-m3OdOzBw2c9qorXB7ssVMDvRoDnVOtHIYpXX8zW5A6fSvjUMHePlmpeMpf9iw4k-cjS1ZHu801oyU4FjDMMxbC4jrnWaoryrLw9phLEZ4WFHvth1hOjF_qIylGZUKonmZKYreP2u-Y61jXQGSs9r9gJWmE8CVU1vjuLwsNPdOnlFXMVF6v-OLBUR0qiBT=w600-h407-no)

製作一個關鍵字建議提示訊息的功能<!--more-->

> [Demo](https://shunnien.github.io/JavaScript30day/day_06/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

## 步驟 1

- 使用 [Fetch][2] 取得 json
- 將 json 資料存入 **cities** Array

## 步驟 2.

- 建立 function **displayMatches**
- 關鍵字輸入框綁定 `change` 與 `keyup` 事件

## 步驟 3.

- function **displayMatches** 中，透過 filter 篩選 **cities**
- 然後在其中利用 [RegExp][3] 來尋找 city 與 state 的屬性中含有關鍵字的資料

## 步驟 4.

- 將上一步驟篩選結束的陣列進行 `map` 尋覽，利用文字範本組合 html 內容
- `map` 後的結果使用 `join` 來結合
- 放入 `.suggestions` 建議資料列表中

## 步驟 5.

將關鍵字強調顯示，並將數字使用逗號分隔；修改上一步驟中文字範本的組合 html 內容。

- 利用 [RegExp][3] 與 `replace` 來針對關鍵字強調
- 同上述的方式，針對 population 數字進行格式化

# 筆記與備註事項

## JavaScript 部分

### [Fetch API][1]

{% blockquote 資料來源 https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API MDN %}
Fetch API 提供了一個獲取資源的介面（包括跨域）。任何使用過 XMLHttpRequest 的人都能輕鬆上手，但新的 API 提供了更強大和靈活的功能集。
{% endblockquote %}

### [Using Fetch][2]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch MDN %}

{% endblockquote %}

### [RegExp][3]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp MDN %}
RegExp 建構函數創建了一個正則表達式物件，用於將文本與一個模式匹配。
有關正則表達式的介紹，請閱讀 JavaScript 指南中的[正則表達式章節][4]
{% endblockquote %}

### [Regular Expressions][4]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions MDN %}
正規表達式是被用來匹配字串中字元組合的模式。在 JavaScript 中，正規表達式也是物件，這些模式在 [**RegExp**][3] 的 [**exec**][5] 和 [**test**][6] 方法中，以及 **String** 的 [**match**][7]、[**replace**][8]、[**search**][9]、[**split**][10] 等方法中被運用。這一章節將解說 JavaScript 中的正規表達式。
{% endblockquote %}

``` javascript
// 使用 RegExp 常數，包含兩個 / 字元之間的模式如下：
var re = /ab+c/;
// 呼叫 RegExp 物件的建構子函數如下：
var re = new RegExp("ab+c");
```

### [String.prototype.match()][7]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match MDN %}
當一個字符串與一個正則表達式匹配時，  match()方法檢索匹配項。
{% endblockquote %}

### [String.prototype.replace()][8]

{% blockquote 資料來源 https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String/replace MDN %}
replace() 方法會傳回一個新字串，此新字串是透過將原字串與 pattern 比對，以 replacement 取代吻合處而生成。pattern 可以是字串或 RegExp，而 replacement 可以是字串或函式（會在每一次匹配時被呼叫）。
{% endblockquote %}

### [Body.json()][11]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/API/Body/json MDN %}
The json() method of the Body mixin takes a Response stream and reads it to completion. It returns a promise that resolves with the result of parsing the body text as JSON.
{% endblockquote %}

## CSS 部分

### [outline][12]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/CSS/outline MDN %}
CSS的outline屬性是用來設置一個或多個單獨的輪廓屬性的簡寫屬性  ，例如  outline-style, outline-width 和 outline-color。多數情況下，簡寫屬性更加可取和便捷。

輪廓與邊框在以下幾個方面存在不同：

- 輪廓不佔據空間，它們被描繪於內容之上
- 輪廓可以是非矩形的。在 Gecko / Firefox 中，輪廓是矩形的，但是 Opera 則會圍繞元素結構繪製非矩形的形狀
{% endblockquote %}

- [outline][12] 不佔據空間，它們被描繪於內容之上

### [list-style][13]

列表的樣式設定。

{% blockquote 資料來源 https://developer.mozilla.org/zh-TW/docs/Web/CSS/list-style MDN %}
CSS list-style 屬性是設置 list-style-type, list-style-image 和 list-style-position 的簡寫屬性。
{% endblockquote %}

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
[6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
[7]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
[8]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String/replace
[9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search
[10]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Body/json
[12]: https://developer.mozilla.org/en-US/docs/Web/CSS/outline
[13]: https://developer.mozilla.org/zh-TW/docs/Web/CSS/list-style