title: JS30紀錄 14-JavaScript References VS Copying
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-01-03 09:52:54
---

# 目標

熟悉了解 References 位址與複製指向的差異，此篇需要對照 Console 才能觀看。
<!-- more -->
> [Demo](https://shunnien.github.io/JavaScript30day/day_14/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

## 步驟 1. 比較普通變數

字串、整數或布林變數的參照，只要宣告一變數複製，兩者即為不同；這幾個類型類似實值型別的參照

``` js
let age = 100;
let age2 = age;
console.log(age, age2); // 100,100
age = 200;
console.log(age, age2); // 200,100

let name = "Wes";
let name2 = name;
console.log(name, name2); // Wes,Wes
name = "wesley";
console.log(name, name2); // wesley,Wes
```

## 步驟 2. 比較陣列

陣列物件的複製就類似參照型別了，所以可以透過一些函式回傳新的陣列，有以下幾種方式

- [**slice()**](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [**[].concat**][2]
- [**Spread**][1]
- **Array.from**

## 步驟 3. 比較物件

物件的複製也是類似參照型別，所以跟陣列類似，有以下幾個方式處理：

- [Object.assign][3]
- [Spread syntax][1]

但是物件裡面尚有巢狀物件的情形需要考慮，陣列其實也是有巢狀的情形，所以可以利用 JSON 來處理

``` js
const wes = {
  name: "Wes",
  age: 100,
  social: {
    twitter: "@wesbos",
    facebook: "wesbos.developer"
  }
};
const dev2 = JSON.parse(JSON.stringify(wes));
dev2.social.twitter = "@coolman";
console.log(dev2.social, wes.social);
```

# 筆記與備註事項

## JavaScript 部分

### [Spread syntax][1]

ES 6 出現的快速語法，針對 function 、 array 、 object ，皆可以使用，用來結合物件或陣列等。

``` js
// For function calls:
myFunction(...iterableObj);

// For array literals or strings:
[...iterableObj, '4', 'five', 6];

// For object literals (new in ECMAScript; stage 3 draft):
let objClone = { ...obj };
```

### [Array.prototype.concat()][2]

{% note info %}
`concat()` 方法回傳一個包含呼叫者陣列本身的值，以及被當作參數提供的陣列或是值的而成的新陣列。
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
{% endnote %}

### [Object.assign()][3]

{% note info %}
`Object.assign()` 被用來複製一個或多個物件自身所有可數的屬性到另一個目標物件。回傳的值為該目標物件。
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
{% endnote %}


# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Spread_operator
[2]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
[3]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/assign