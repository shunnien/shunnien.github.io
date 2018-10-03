title: JS30紀錄 07-Array Cardio
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2017-12-21 09:28:31
---

# 目標

練習陣列操作，主要熟練 some、 every、 find、 findIndex、 slice 這幾個陣列操作語法，需要直接搭配 console 來觀看。
<!--more-->

> [Demo](https://shunnien.github.io/JavaScript30day/day_07/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

## 步驟 1.

操作 people 陣列，利用 `some` 與 `every` 檢查是否符合大於等於 19 歲的元素。

## 步驟 2.

操作 comment 陣列, `find` 類似 `filter` ，只是 `find` 只會回傳一個找尋到的元素。
而 `findIndex` 會回傳找到元素的索引。

## 步驟 3.

針對 comment 刪除指定元素，因為此次指定使用 `slice` ，不然可以採用 `splice` 更好處理。
- 建立一個新陣列
- 利用 slice 取出陣列
- 利用 `...` 語法糖連結陣列

# 筆記與備註事項

## JavaScript 部分

### [Array.prototype.some()][1]

{% blockquote 資料來源 https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/some MDN %}
The `some()` method tests whether at least one element in the array passes the test implemented by the provided function.
{% endblockquote %}

- 用來判斷是否有元素符合所設定的條件
- 只會回傳 `true` 或 `false`

``` js
[2, 5, 8, 1, 4].some(x => x > 10);  // false
[12, 5, 8, 1, 4].some(x => x > 10); // true
```

### [Array.prototype.every()][2]

> `every()` 方法會使用傳入的回呼函示來測試所有在陣列中的元素
> **資料來源** - [*MDN*][2]

- 陣列中的所有元素，都必須符合設定的條件
- 全部符合條件回傳 `true` ，只要有一元素不符合就回傳 `false` 

``` js
[12, 5, 8, 130, 44].every(x => x >= 10); // false
[12, 54, 18, 130, 44].every(x => x >= 10); // true
```

### [Array.prototype.find()][3]

{% blockquote 資料來源 https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/find MDN %}
`find()` 方法，如果一個在陣列中的元素滿足提供的測試函數，則返回一個在陣列中的值。否則回傳 **undefined**
{% endblockquote %}

### [Array.prototype.findIndex()][4]

{% blockquote 資料來源 https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex MDN %}
`findIndex()` 方法將依據提供的測試函式，尋找陣列中符合的元素，並返回其 **index** （鍵值）。如果沒有符合的對象，將返回 -1 。
{% endblockquote %}

### [Array.prototype.slice()][5]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice MDN %}

The `slice()` method returns a shallow copy of a portion of an array into a new array object selected from `begin` to `end` (`end` not included). The original array will not be modified.

# Syntax

> arr.slice([begin[, end]])

``` javascript
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]
```

{% endblockquote %}

- 取得陣列中指定區段的元素，將回傳新的陣列
- 語法中 begin 與 end 參數表示陣列元素的索引，都是從 0 開始
- 回傳的陣列，會依照 end 參數的前一位，也就是 end 參數指定的元素是不會回傳的

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/some
[2]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/every
[3]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/find
[4]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
[5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice