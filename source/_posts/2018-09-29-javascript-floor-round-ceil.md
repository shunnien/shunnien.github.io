---
title: JavaScript 浮點數取整數
categories: 程式技術筆記
tags:
  - JavaScript
toc: false
date: 2018-09-29 02:47:41
---

# JavaScript 浮點數取整數

浮點數取整數，在數學中有**四捨五入**、**無條件進位**、**無條件捨去**三種方式，在 **JavaScript** 中，可以利用 [**ceil**][1] 、[**floor**][2] 和 [**round**][3] 來達到<!-- more -->

## [ceil][1]

此方法會回傳大於或等於的最小整數，就是無條件進位

``` js
console.log(Math.ceil(0.95));
// output: 1
console.log(Math.ceil(2));
// output: 2
console.log(Math.ceil(3.024));
// output: 4
console.log(Math.ceil(3.624));
// output: 4
console.log(Math.ceil(-3.654));
// output: -3
console.log(Math.ceil(-3.054));
// output: -3
```

## [floor][2]

此方法回傳小於或等於的最大整數，就是無條件捨去

``` js
console.log(Math.floor(0.95));
// output: 0
console.log(Math.floor(2));
// output: 2
console.log(Math.floor(3.024));
// output: 3
console.log(Math.floor(3.624));
// output: 3
console.log(Math.floor(-3.654));
// output: -4
console.log(Math.floor(-3.054));
// output: -4
```

## [round][3]

此方法近似四捨五入，注意正負的差異

``` js
console.log(Math.round(0.95));
// output: 1
console.log(Math.round(2));
// output: 2
console.log(Math.round(3.024));
// output: 3
console.log(Math.round(3.624));
// output: 4
console.log(Math.round(-3.654));
// output: -4
console.log(Math.round(-3.054));
// output: -3
```

## 線上範例

<iframe height='279' scrolling='no' title='float get integer part in javascript' src='//codepen.io/shunnien/embed/KGKOEZ/?height=279&theme-id=0&default-tab=js&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/shunnien/pen/KGKOEZ/'>float get integer part in javascript</a> by allen_yu (<a href='https://codepen.io/shunnien'>@shunnien</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 參考資料

- [MDN ceil][1]
- [MDN floor][2]
- [MDN round][3]

[1]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
[2]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round