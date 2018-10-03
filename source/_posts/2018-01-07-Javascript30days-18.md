title: JS30紀錄 18-Adding Up Times with Reduce
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-01-07 17:49:26
---

# 目標

計算列表中的 **dataset** 時間的總和，在 **console** 輸出**時、分、秒**的數據，此篇需要搭配 **console** 觀看

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Videos</title>
</head>
<body>
  <ul class="videos">
    <li data-time="5:43">
      Video 1
    </li>
    <li data-time="2:33">
      Video 2
    </li>
    <!-- 以下省略... -->
  </ul>
</body>
</html>
```

<!-- more -->

> [Demo](https://shunnien.github.io/JavaScript30day/day_18/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

## 步驟 1.

一開始取得所有 **data-time** 的 DOM，並注意轉換為 **Array**

**querySelectorAll** 取出來的資料是類似 **Array** 而已，所以加上 **Array.from** 轉換為 **Array** 

``` js
const timeNodes = Array.from(document.querySelectorAll("[data-time]"));
```

## 步驟 2.

- 利用 **map** 來取得 **dataset** 資料

``` js
const seconds = timeNodes
  .map(node => node.dataset.time)
```

- 繼續利用 **map** 將分與秒轉換為秒數

``` js
const seconds = timeNodes
  .map(node => node.dataset.time)
  .map(timeCode => {
    const [mins, secs] = timeCode.split(":").map(parseFloat);
    return mins * 60 + secs;
    console.log(mins, secs);
  })
```

- 透過 **reduce** 來加總資料

``` js
const seconds = timeNodes
  .map(node => node.dataset.time)
  .map(timeCode => {
    const [mins, secs] = timeCode.split(":").map(parseFloat);
    return mins * 60 + secs;
    console.log(mins, secs);
  })
  .reduce((total, vidSeconds) => total + vidSeconds);
```

## 步驟 3.

總秒數取出來後，劃分時、分、秒的數值，利用 [**Math.floor**][1] 與 **%** 取得餘數的方式

``` js
let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
// 取得餘數
secondsLeft = secondsLeft % 3600;

const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log(hours,mins,secondsLeft);
```


# 筆記與備註事項

## JavaScript 部分

### [Math.floor()][1]

類似無條件捨去，直接取整數，需要注意的是負數的運用

``` js
Math.floor( 45.95); 
// 45 
Math.floor( 45.05); 
// 45 
Math.floor( 4 ); 
// 4 
Math.floor(-45.05); 
// -46 
Math.floor(-45.95); 
// -46

```

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/floor