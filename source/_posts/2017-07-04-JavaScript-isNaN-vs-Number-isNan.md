title: JavaScript isNaN vs Number.isNaN
categories: 程式技術筆記
tags:
  - JavaScript
toc: false
date: 2017-07-04 14:20:18
description:
---

isNaN 與 Number.isNaN，兩個方法是不同的，NaN 是非數值資料的表示，而這兩個方法都是判斷資料是否**非數值**，isNaN 是比較早期的方法，所以有許多特別的特例 <!-- more -->

## NaN

{% blockquote 資料來源 https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN MDN NaN %}
全域屬性 NaN 表示「非數值」（Not-A-Number）的數值。

NaN 的屬性屬於全域物件。

如同 Number.NaN 一般，NaN 的初始數值是「**非數值**」。在當今的瀏覽器中，NaN 屬性**不可設定**（non-configurable）也**不可覆寫**（non-writable）。雖然可能有例外，也請不要覆蓋它。

寫程式很少會直接動用 NaN。通常是在 Math 函式計算失敗（Math.sqrt(-1)）或函式解析數字失敗（parseInt("blabla")）後才會回傳。
{% endblockquote %}

## isNaN

{% blockquote 資料來源 https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/isNaN MDN isNaN %}
**isNaN()** 函式會判斷某個數值是不是 NaN。

**注意**：在 isNaN 函式裡面，有個有趣的強制性規則。你可能會想改用在 ECMAScript 6 導入的 Number.isNaN()、或是用 typeof 來判斷某個數值是不是「非數字」（Not-A-Number）。
{% endblockquote %}

``` javascript
isNaN(123) //false
isNaN(-1.23) //false
isNaN(5-2) //false
isNaN(0) //false
isNaN('123') //false
isNaN('Hello') //true
isNaN('2005/12/12') //true
isNaN('') //false
isNaN(true) //false
isNaN(undefined) //true
isNaN('NaN') //true
isNaN(NaN) //true
isNaN(0 / 0) //true
```

## Number.isNaN

{% blockquote 資料來源 https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN MDN Number.isNaN  %}

Number.isNaN()方法確定傳遞的值是否為NaN和其類型是Number。它是原始的全局isNaN()的更強大的版本。

和全局函數isNaN()相比，該方法不會強制將參數轉換成數字，只有在參數是真正的數字類型，且值為NaN的時候才會返回true。
{% endblockquote %}

``` javascript
Number.isNaN(123) //false
Number.isNaN(-1.23) //false
Number.isNaN(5-2) //false
Number.isNaN(0) //false
Number.isNaN('123') //false
Number.isNaN('Hello') //false
Number.isNaN('2005/12/12') //false
Number.isNaN('') //false
Number.isNaN(true) //false
Number.isNaN(undefined) //false
Number.isNaN('NaN') //false
Number.isNaN(NaN) //true
Number.isNaN(0 / 0) //true
```

## isNaN vs Number.isNaN

由上述的定義說明得知，**NaN** 就是用來判斷是否數值，那為什麼要使用 **isNaN**(不管 isNaN 或 Number.isNaN) 來判斷？

因為在JavaScript中，NaN 最特殊的地方，就是與其他 JavaScript 的值不同，我們不能使用等號運算符（== 與 ===）來判斷某個值是不是 NaN，因為連
``` javascript
NaN == NaN  // false
NaN === NaN  // false
```
結果都是 **false**。

因此，必須要有一個判斷值是否是 NaN 的方法。以下列出比較特別的特例，以及 Number.isNaN 與 NaN 的對比

``` javascript
// 比較特別的是，0/0 的結果會是 NaN，不過把其他數字除以零則不是 NaN。
0/0         // NaN
0/-0        // NaN
0/+0        // NaN
1/0         // Infinity
1/-0        // -Infinity
'A' == NaN  // false
'A' === NaN // false
NaN === NaN // false

isNaN(NaN)          // true
isNaN('A')          // true
isNaN("NaN");       // true
isNaN(undefined);   // true
isNaN({});          // true

// 以下這個範例就是不建議完全使用 isNaN 的理由
// "blabla" 在運算中被轉換為數字，在轉換為數字失敗後，回傳了 NaN，讓判斷結果變成 true
isNaN("blabla");    // true

isNaN(true);        // false
isNaN(null);        // false
isNaN(37);          // false

// 字串
isNaN("37");      // false: "37" 轉換成數字的 37 後就不是 NaN 了
isNaN("37.37");   // false: "37.37" 轉換成數字的 37.37 後就不是 NaN 了
isNaN("123ABC");  // true:  parseInt("123ABC") 是 123 但 Number("123ABC") 是 NaN
isNaN("");        // false: 空字串轉換成數字的 0 後就不是 NaN 了
isNaN(" ");       // false: 有空白的字串轉換成數字的 0 後就不是 NaN 了

// 日期
isNaN(new Date());                // false
isNaN(new Date().toString());     // true

Number.isNaN(NaN)         // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0/0)         // true
// 下面這幾個如果使用 isNaN() 時，會返回 true。
Number.isNaN('A')         // false
Number.isNaN("NaN");      // false，字符串 "NaN" 不會被轉換成數字 NaN。
Number.isNaN(undefined);  // false
Number.isNaN({});         // false
Number.isNaN("blabla");   // false

// 下面的都返回 false
Number.isNaN(true);
Number.isNaN(null);
Number.isNaN(37);
Number.isNaN("37");
Number.isNaN("37.37");
Number.isNaN("");
Number.isNaN(" ");

```

## 參考資料
- [W3 schools isNaN][1]
- [W3 schools Number isNaN][2]
- [MDN Number isNaN][3]
- [MDN NaN][4]
- [MDN isNaN][5]
- [ECMA-262][6]
- [stackoverflow 討論][7]
- [Nicolás Bevacqua TC39][8]

[1]: https://www.w3schools.com/jsref/jsref_isnan.asp
[2]: https://www.w3schools.com/jsref/jsref_isnan_number.asp
[3]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
[4]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/NaN
[5]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/isNaN
[6]: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
[7]: https://stackoverflow.com/questions/15534192/algorithm-for-javascript-pre-defined-functions-parseint-parsefloat-isnan-etc
[8]: https://ponyfoo.com/articles/tc39-ecmascript-proposals-future-of-javascript