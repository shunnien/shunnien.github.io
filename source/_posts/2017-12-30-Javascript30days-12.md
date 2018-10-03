title: JS30紀錄 12-Key Sequence Detection
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2017-12-30 15:23:23
---

# 目標

此章節也要對照 Console 才能觀看，主要是偵測輸入按鍵，一開始設定一組密碼，例如: **wesbos** ，當輸入的內容符合到 **wesbos** 就顯示提示。
<!-- more -->
> [Demo](https://shunnien.github.io/JavaScript30day/day_12/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

## 步驟 1.

- 宣告記錄按鍵的變數陣列 **pressed**
- 宣告特殊密碼變數 **secretCode**

## 步驟 2.

- 綁定 **keyup** 事件
- 利用 **push()** 將輸入的按鍵記錄到變數 **pressed**

## 步驟 3.

此步驟為重點處理

- 判斷 **pressed** 陣列長度是否超過 **secretCode**
- 利用 `shift()` 判斷符合即可移除首位元素
- 再利用陣列的 `join()` 與 `includes()` 判斷是否為密碼

# 筆記與備註事項

教學說明中使用的 [splice()][1] ，不過使用 **splice()** 需要設定最少一個參數，所以練習的部分就使用 **shift()**

## JavaScript 部分

### [Array.prototype.splice()][1]

{% note info %}
`splice()` 這方法可刪除或新增一個 Array 的內容。

``` js
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];

myFish.splice(2, 0, 'drum'); // 新增字串'drum' 在第index=2的位置
// myFish is ["angel", "clown", "drum", "mandarin", "sturgeon"]

myFish.splice(2, 1); // 移除第二個位置的物件 (也就是字串"drum")
// myFish is ["angel", "clown","mandarin", "sturgeon"]
```

**資料來源** - [*MDN*](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
{% endnote %}

### [Array.prototype.shift()][2]

{% note info %}
`shift()` 方法 (method) 會從陣列移除第一個元素 (element)，並回傳該元素。此方法會改變陣列的長度。

``` js
var a = [1, 2, 3];
a.shift();

console.log(a); // [2, 3]
```

**資料來源** - [*MDN*](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
{% endnote %}

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
[2]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/shift