title: JavaScript 中 reduce 方法筆記
categories: 程式技術筆記
tags:
  - JavaScript
description: JavaScript 中 reduce 方法筆記
toc: false
date: 2017-06-05 23:20:26
---

## Introduction
Js 中的 [reduce][1] 出來一段時間了，但是還是很少使用到，一方面是手上的需求都只是 [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)的處理而已，一方面處理陣列我也比較常使用 [map][2] ，這邊就做個紀錄吧。

## Conetent

首先說明一下 **reduce** 的定義，以下引用自 [MDN][1] 。
> reduce() 方法對累加器和數組中的每個元素(從左到右)應用一個函數，將其減少為單個值。
> ### 語法
> `arr.reduce(callback,[initialValue])`
> #### 參數
> 
> - callback
> 执行数组中每个值的函数，包含四个参数
> - accumulator
> 上一次調用回調返回的值，或者是提供的初始值（ initialValue ）
> - currentValue
> 數組中正在處理的元素
> - currentIndex
> 數據中正在處理的元素索引，如果提供了  initialValue  ，從0開始；否則從1開始
> - array
> 調用reduce的數組
> - initialValue
> 可選項，其值用於第一次調用callback 的第一個參數。
>
>
> ``` js
let sum = [0, 1, 2, 3].reduce(function(acc, val) {
  return acc + val;
}, 0);

console.log(sum);
// 6

let list1 = [[0, 1], [2, 3], [4, 5]];

let list2 = [0, [1, [2, [3, [4, [5, [6]]]]]]];

const flatten = (arr) => {
    return arr.reduce(
        (acc, val) => {
            return acc.concat(Array.isArray(val) ? flatten(val) : val)
        }, []
    );
};

flatten(list1); 
// [0, 1, 2, 3, 4, 5]

flatten(list2); 
// [ 0, 1, 2, 3, 4, 5, 6 ]
```
> 引用自 MDN 的說明

由 [MDN][1] 上的說明可以得知 **reduce** 是專門來處理陣列的運算，不過我這邊比較常處理物件的處理，所以以下就使用 reduce 來針對物件處理。

- 情境
> 依據 Object 中的 key 調整 value，將 name 轉換成大寫。

以下為作法，另外這是故意使用 **reduce** 來處理，這例子使用 **for...in** 迴圈處理亦可

``` js
let testobj = {"id": 2, "name": "allen"};

// 以下的 {} 為設定 previouse 的初始值
const reduceobj = Object.keys(testobj).reduce(function(previous, current) {
    previous[current] = (current!=="name")? testobj[current] : testobj[current].toUpperCase();
    console.log("previous: " + previous +"     current: " + current );
    return previous;
},{});
console.log("reduceobj: " + reduceobj);
```

## Reference
- [MDN reduce][1]
- [MDN map][2]
- [MDN Object][3]

[1]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
[2]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[3]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Working_with_Objects
