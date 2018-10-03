title: JS30紀錄 04-Array Cardio
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2017-12-15 19:47:08
---

# 目標

練習 JavaScript 的 [Array.prototype.filter()][2] 、 [Array.prototype.map()][3] 、 [Array.prototype.sort()][4] 、 [Array.prototype.reduce()][5] ，透過 console 介面比較前後結果。
<!--more-->

> [Demo](https://shunnien.github.io/JavaScript30day/day_04/) | [Github](https://github.com/shunnien/JavaScript30day)

# 筆記與備註事項

## JavaScript 部分

### [Console.table()][1]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/API/Console/table MDN %}
將數據以表格的形式顯示

這個方法接收一個強制的參數，它必須是一個數組或者是一個對象，還可以接受一個額外的參數描述表格的列數。

它把數據以table的形式打印出來， 在數組中的每一個元素（或對像中可枚舉的屬性）將會以行的形式顯示在table中。

table的第一列是index。如果數據是一個數組，那麼值就是索引。如果數據是一個對象，那麼它的值就是屬性名稱。注意（在FireFox中）console.table 被限制了不能顯示超過1000行（第一行用來標記索引）。
{% endblockquote %}

``` js
console.table(["apples", "oranges", "bananas"]);
```
![table](https://lh3.googleusercontent.com/xxOse0em1T9xiIoFWxIzyoTo-yRkgtPYkLzv8nNjc2BehPkMTb2GF3sFwP6wDG_zsmNF0u0beqXxJ_2QLEKZ04bX6vcbaLEb5_EZe2ghOoAiOmQRINonkZHh0xtBhR3_75nyKtQCrWnXwgsLwCKHKjC5pe6tX3pyD-ruUFBpiknMDE9gmufqnG67HoBQFgseI3pius8YJ7HdIKHIpnF24z2Rxlvmdtzf85kFN0W41y9RaGm3UB-CRiGcJydGn4u3Hf6BNw6oQH9E4zDaTYnTnTW5MBc2ngNMj_DmVd--8U6137UzLw9Ulr8iiwmIBMybU6ZK6WV1XqFFQWALMeJXVSWyb9GcSSZ2o0iRGfzFDOccrMCqq6QMiSxCKWwBedwUvkl-vbuBAMUhCSHbiy55m59Z71C2v54COcKDXGSdphdZIQdPXvO1wGwtCdlmKjG3CJc4Yth_m2xAIxDHWlC6PeKg_CS-U5-4mMsr2FDYojGsyvVw-yi4aw32guLPC9BKW34CD4cAZUBX568mII9Kk0s2flJATqURlItkxHDcft_0tIU49t-_VhUSpH2hqaGBCxuKmf1ZFSy_9krLV5j24hEZAZXmBTpA9qGvqI-Ar7eqeqVNigC0lLL28qg1nx0U8HNu0-NC2O3vLJmpHpofGyCXS1q9NzReluU=w806-h231-no)

### [Array.prototype.filter()][2]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter MDN %}
filter() 方法會建立一個經指定之函式運算後，由原陣列中通過該函式檢驗之元素所構成的新陣列。

# 語法

> var newArray = arr.filter(callback[, thisArg])

## 參數

#### callback

此函式為一個斷言，用於測試陣列中的每個元素。回傳值為 true 時將當前的元素保留至新陣列中，若為 false 則不保留。可傳入三個參數：

#### element

原陣列目前所迭代處理中的元素。

#### index

原陣列目前所迭代處理中的元素之索引。

#### array

呼叫 filter 方法的陣列。

#### thisArg 選擇性

執行 callback 回呼函式的 this 值。

## 回傳值

一個元素為通過回呼函式檢驗的新陣列。
{% endblockquote %}

``` js
var words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];

var longWords = words.filter(word => word.length > 6);

// Filtered array longWords is ["exuberant", "destruction", "present"]
```

### [Array.prototype.map()][3]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map MDN %}
map() 方法會建立一個新的陣列，其內容為原陣列的每一個元素經由回呼函式運算後所回傳的結果之集合。
{% endblockquote %}

``` js
var numbers = [1, 5, 10, 15];
var doubles = numbers.map(function(x) {
   return x * 2;
});
// doubles is now [2, 10, 20, 30]
// numbers is still [1, 5, 10, 15]

var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
// roots is now [1, 2, 3]
// numbers is still [1, 4, 9]
```

### [Array.prototype.sort()][4]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort MDN %}
sort() 方法將陣列中的元素排列至其應當的位置上並返回此陣列。排列不必是穩定的。預設的排列順序根據Unicode字串碼位來排序。

# 語法

> arr.sort([compareFunction])

## 參數

`compareFunction`
可選。指定一函數來定義排序順序。若省略，陣列將根據各個字元的Unicode碼位值排列，或根據每個元素轉換為字串。

------

如果 compareFunction 被應用, 陣列元素們將根據比較函數之回傳值來排序。如果 a 和 b 為被比較之兩元素, 則:

- 若 compareFunction(a, b) 小於 0, 將 a 排在比 b index還小處, i.e. a 排在第一個.
- 若 compareFunction(a, b) 回傳 0, a 與 b 互相不會改變順序, 但會與全部其他元素比較排列。註計: ECMAscript標準不保證能使用此行為, 因此不是所有瀏覽器 (e.g. Mozilla版本至少2003) 遵守此行為.
- 若 compareFunction(a, b) 大於 0, 將 b 排在比 a index還小處.
- compareFunction(a, b) 在給特定元素 a 及 b 為此函數之兩參數時必須每次都回傳相同之值。若回傳值不一致，排序順序則為undefined。

{% endblockquote %}

``` javascript
var scores = [1, 2, 10, 21]; 
scores.sort(); // [1, 10, 2, 21]

var things = ['word', 'Word', '1 Word', '2 Words'];
things.sort(); // ['1 Word', '2 Words', 'Word', 'word']
// 在Unicode中, 數字在大寫字母前,
// 大寫字母在小寫字母前

var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic' },
  { name: 'Zeros', value: 37 }
];
items.sort(function (a, b) {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
```

### [Array.prototype.reduce()][5]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce MDN %}
reduce() 方法將一個累加器及陣列中每項元素（由左至右）傳入回呼函式，將陣列簡化為單一值。
{% endblockquote %}

``` js
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```

# 延伸部分

這次的 JS 部分，大步以前都練習過，以前還寫過一篇 [reduce 的使用](https://shunnien.github.io/2017/06/05/javascript-reduce-note/)，有興趣的可以參考看看。

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)


[1]: https://developer.mozilla.org/en-US/docs/Web/API/Console/table
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
[5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce