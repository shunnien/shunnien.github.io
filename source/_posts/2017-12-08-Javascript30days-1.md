title: JS30紀錄 01-JavaScript Drum Kit
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2017-12-08 15:49:18
---

![target gif](https://lh3.googleusercontent.com/GJZCt6aTi-4RHLVjtM6dL0t9TjtavPQtQEdS3_MBecVDV_lMZEdSYXmVydgOWM8vepSJLLJm47Og3xKSM42chH6hMzEWKOhZdAvUW-fsJ2DLcRZh_Z_mN9apX7VNKhBdxy09krYwNVLk2oI9uCQdG_kdCHj7gCueqi9FQbBi-Vhu1pHCgcHWkpezAhQ_pMLxKTXIRNXP27FasXr1859LRMkXdNivUwgWvKFmwtKE6ExIgYnO8jo0MTd1sJQY1HtxV1kp2nhfiLufUA-GOd1X291Tg3CKqP2QppnuVP2AQnzrlmCiOBX1QtAUgytWMgFqg8QomU5th5qYZTVbfW65ZbibOuM1XXOvquQjaf2RaYVbFEfs9mWxuGIXBDYmYklFTDFBxUUxQR0fgZXx_GXTlGm1KUIe_ZjNYUwuqlOgp9hhJLObfeSbohvL7t3Z1GoIE6aEbSRpaqKFnZ5cp9uTE_5r3g_0HVy5gcJ5SoDqFrFacx9C8p6rl8Ohj5KFzQiPj2BTw7hTQ8p8qbucG18_UHmh7zeqrhnGbAcB_4qEelZSKpTYHWgiz6bewTgBjf4AY2NoDIL5c_UCQfwKa5R2UhB1sBIHsZqGfBWipTmCOuQIajUOSG5d3VOMVqS0HFe-4w_jYLZCVH9FxNEV5NHXqB0qjuABuaFhMoM=w832-h417-no)
[JavaScript 30 day][1] 課程第一天，主要目的是按下按鍵時，發出聲音並進行該按鍵文字的特效；透過 Js 來綁定事件，熟練基本 JS 操作。<!--more-->

> [Demo](https://shunnien.github.io/JavaScript30day/day_01/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

## 步驟 1. 認識 .playing CSS Class

- 使用 **transform** 進行縮放

## 步驟 2. 認識 keycode 還有 HTML 架構

- 聲音檔案 **audio** 與 按鍵文字 div 使用 **data-key** 對應
- 參考 [key code][4]

## 步驟 3. 建立 keydown listener

- 建立整份網頁文件檔案的鍵盤監聽事件

## 步驟 4. 建立 function playSound

- 取得目前觸發的按鍵 keyCode
- 取得該 keyCode 對應的文字 div DOM
- 取得該 keyCode 對應的聲音 audio DOM
- 當按鍵連續按下時，使聲音檔案重新播放 `audio.currentTime = 0`
- 播放聲音 `audio.play()`
- 加入 keyCode 對應的文字 div DOM 強調樣式 **playing**

## 步驟 5. 建立 transitionend listener

- keyCode 文字 div DOM 綁定 [transitionend][1]

## 步驟 6. 建立 function removeTransition

- 利用 [transitionend][1] 進行樣式凸顯後移除

- 在觸發事件內的執行順序

值得一提的是， **border-color** 會變成四個方向的顏色來設定，可以在 **removeTransition** function 中添加 log 來查看執行順序與觸發次數。

``` js
function removeTransition(e) {
  console.log(e.propertyName);
}
```

當按下觸發按鍵後， **removeTransition** 的 log 記錄訊息與觸發順序如下流程所示。

{% mermaid %}
  graph TD
  A(transform)-->B(border-right-color)
  B-->C(border-bottom-color)
  C-->D(border-top-color)
  D-->E(border-left-color)
  E-->F(box-shadow)
  F-->A1(transform)
  A1-->B1(border-right-color
  B1-->C1(border-bottom-color)
  C1-->D1(border-top-color)
  D1-->E1(border-left-color)
  E1-->F1(box-shadow)
{% endmermaid %}

另外值得一提的是， css 中的樣式順序變動，對於觸發順序毫無影響，也就是說就算把 __playing__ 的 css 變動成如下的順序，觸發順序還是 __transform__ 先開始。

``` css
  .playing {
    box-shadow: 0 0 1rem #ffc600;
    transform: scale(1.1);
    border-color: #ffc600;
  }
```

# 學習事項

將比較不熟練，或是較少使用的事項重複記錄一次。

## HTML 部分

### [HTML audio tag][2]

操作音效檔案的 HTML tag，此處透過 js 操作播放與設定音效檔案重頭播放，可以參考 [MDN][11] 的 **currentTime**

### [HTML kbd tag][5]

就是輸入按鍵的顯示文字，詳細說明可以觀看以下的說明。

{% blockquote 資料來源 https://www.w3schools.com/tags/tag_kbd.asp  %}

# Definition and Usage

The <kbd> tag is a phrase tag. It defines keyboard input.
Tip: This tag is not deprecated, but it is possible to achieve richer effect with CSS.
{% endblockquote %}

## JavaScript 部分

JS 部分列出一些比較便利的東西來說明。

### [querySelector][3]

這就是 JS 提供的 Selector 選擇器，有用過 JQuery 的就會感覺很熟悉，跟以下的 [querySelectorAll][8] 不太相同的地方是， [querySelector][3] 有找尋到結果的時候，會回傳一個 DOM object 。

``` js
var el = document.querySelector(".myclass");
```

### [querySelectorAll][8]

Selector 選擇器的變形，搜尋結果會是**類陣列(array-like)**

``` js
var matches = document.querySelectorAll("div.note, div.alert");

```

需要注意的，是 [querySelectorAll][8] 得到的結果並**不是** **Array**
``` js
var matches = document.querySelectorAll("div");
Array.isArray(matches);
// false
```

### [classList][9]

{% blockquote 資料來源 https://developer.mozilla.org/zh-TW/docs/Web/API/Element/classList  %}
Element.classList 唯讀屬性代表了該元素所擁有之類別屬性（Class Attribute）的即時更新集－DOMTokenList。

使用 classList 屬性是取得元素 Class 的一種便利方式，也可以透過 element.className 來得到以空格分隔之 Class 清單字串。
{% endblockquote %}

``` js
// div is an object reference to a <div> element with class="foo bar"
div.classList.remove("foo");
div.classList.add("anotherclass");

// if visible is set remove it, otherwise add it
div.classList.toggle("visible");

//  add/remove visible, depending on test conditional, i less than 10
div.classList.toggle("visible", i < 10 );

alert(div.classList.contains("foo"));

div.classList.add("foo","bar"); //add multiple classes
```

### [addEventListener][10]

{% blockquote 資料來源 https://developer.mozilla.org/zh-TW/docs/Web/API/EventTarget/addEventListener  %}
EventTarget.addEventListener() 方法能將指定的事件監聽器註冊到 EventTarget 實作物件上。EventTarget 可能是 Document 中的 Element 物件、Document 物件本身、Window 物件，或是其它支援事件的物件（如：XMLHttpRequest）。
{% endblockquote %}

### [transitionend][1]

為 DOM [CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) 變換完成後觸發，另外還有 [transitionstart](https://developer.mozilla.org/en-US/docs/Web/Events/transitionstart) 、 [transitioncancel](https://developer.mozilla.org/en-US/docs/Web/Events/transitioncancel)

### [Array.from][7]

{% blockquote 資料來源 https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/from  %}
Array.from() 會從類陣列(array-like)或是可迭代的物件建立一個新的陣列實例。
{% endblockquote %}

在教學的完成範例中，使用了 [Array.from][7] 來轉換 [querySelectorAll][8] 的結果，在此範例中，沒有使用此轉換也不影響； 所以才使用 [Array.from][7] 來轉換

``` js
const bar = ["a", "b", "c"];
Array.from(bar);
// ["a", "b", "c"]

Array.from('foo');
// ["f", "o", "o"]
```

## CSS 部分

介紹 CSS3 的新單位 **vh** 、 **vw** ，其[瀏覽器的支援程度][13]可以參考

### [vh][12]

代表的是 **view height** ，也就是螢幕可視範圍高度的百分比

### [vw][12]

表示的是 **view width** ，也就是螢幕可是範圍寬度的百分比。

# 延伸部分

按著按鈕不放，有時候 **Class** 樣式沒被移除。
![sampel gif picture](https://lh3.googleusercontent.com/wgrbTz2rivsv8QuGsc8JgJKvU9z8EtSIrCvz0-NGiBuhEDC5Ar02OLoz6RdGPVZ1W9t6W1SpDsnxyzbrZSeU4Gy3FcdJK7ZNATYHhhstCGbD0pECAl5dxWdCev8trX-7ukQSXg5NQrQP4vDzN_u5-tgSOInmX3riG9ob3Tdl6JVJakBFB-yJvOBeX2vlywxw4vgNDJnyIZYkGnIIVTtXqpQTHH2itXkbmFzUVgU7SGrU7S1cUS7P25xsCQ5vH9X8orNBjKB3Jy-j10n20Ps_7-ZT49Nwjc-dTPjPIlcMOJyn9DbN2wyBshDuJdQOqtYvg-VSC1DVxqvPZWn4KHh4YwzCjnMMO1Gv2ERfTgNIQcvBYwtmV-ljE17lHFPC50CmpPnmBIzRHSpuhdYR7MatKVYva49Kt_HCE5ppdmtdMQohsdXOY8c8A21Q9hoKVkBWHkYNiL6qZbKEd6ejGh-JL-WdrAxtt0WMezwWS2CcVmO2px7Q1C0AYrJk3T4tu6P6jLzGpxbT1ZaG9L3jaKFeuPQxRWYteUxNTjZFCGEwlFjvYeYIzzJxanuER2CVPglhcX8OHA9SF1iG4XjB0LlagA5tqAL2kV1tuf4MAChdmN9RM64HJKSl7AIa25-ic9unxdd2l70jcZUO5XQBJXJi7mkVW1sfb0d734A=w918-h516-no)

幾個解決方式，我決定使用 __keyup__ 事件進行移除，不使用 [transitionend][1] 改使用在 **keyup** 觸發 **removeClass** function

``` js
function removeClass(e) {
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  key.classList.remove("playing");
}
window.addEventListener("keyup", removeClass);
```

# 參考資料

- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/Events/transitionend
[2]: https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/audio
[3]: https://developer.mozilla.org/pt-BR/docs/Web/API/Document/querySelector
[4]: http://keycode.info/
[5]: https://www.w3schools.com/tags/tag_kbd.asp
[6]: https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/kbd
[7]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/from
[8]: https://developer.mozilla.org/zh-TW/docs/Web/API/Document/querySelectorAll
[9]: https://developer.mozilla.org/zh-TW/docs/Web/API/Element/classList
[10]: https://developer.mozilla.org/zh-TW/docs/Web/API/EventTarget/addEventListener
[11]: https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext
[12]: https://developer.mozilla.org/zh-TW/docs/Web/CSS/length
[13]: https://www.w3schools.com/cssref/css_units.asp