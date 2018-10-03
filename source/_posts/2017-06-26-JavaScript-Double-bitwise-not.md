title: JavaScript ~~ 符號
categories: 程式技術筆記
tags:
  - JavaScript
toc: false
date: 2017-06-26 17:24:07
description:
---

前陣子在一些討論區看到有人在討論 **~** 這符號的使用，想到自己也幾乎沒在 JavaScript 中使用，就查了一下，看到國外有些探討，使用 **~~** 比使用 `Math.floor` 的效能好<!-- more -->，因此紀錄一下。

**~ (tilde)** 位元運算符，延伸可以用來取整數，而且在[這連結](https://jsperf.com/math-round-vs)還有運算效能比較，運算速度比 Math.floor 好。以下列出一些基本比較結果

``` javascript
~~null;      // output ==> 0
~~undefined; // output ==> 0
~~0;         // output ==> 0
~~{};        // output ==> 0
~~[];        // output ==> 0
~~(9/0);     // output ==> 0
~~false;     // output ==> 0
~~true;      // output ==> 1
~~1.0213;    // output ==> 1
~~5.91561;   // output ==> 5
~~-3.6748;   // output ==> -3
```

## 參考資料
- [MDN Expressions and operators][3]
- [程式語言教學誌 JS][4]
- [sitepoint JavaScript Double Negation][2]

[1]: https://coderwall.com/p/9b6ksa/is-faster-than-math-floor
[2]: https://www.sitepoint.com/javascript-double-negation-trick-trouble/
[3]: https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Expressions_and_Operators
[4]: http://www.kaiching.org/2010/12/javascript-bitwise.html
[5]: https://j11y.io/javascript/double-bitwise-not/