title: JS30紀錄 28-Video Speed Controller
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-02-01 15:46:16
---

# 目標

使用 div 來製作一個速度條，來調整影片播放速度
![target](https://lh3.googleusercontent.com/_m_1-XRbuqU-3yNuFU4CK2Y7_KmhPmcwLdE-k3VWUhULvYk9mkCNjf7ULZBANsCWn6Da4Mj8Ija3Y6N4sVTEgK6WFHd-9t2KC-1md8KW1lvMad6O6DiWl11xtUykOc24wAvxkztD8oTHrmPILByEKW8_rGGR3geARJ-MSTgQUtJTiZDrqiUQv3WzhChVS2bYGqirLcsTNzwtAQ2e_1JeNLdgsv822j2Q_dbQFn6nDfCPCy04awTpfYlBh9ISEJlyEy1iENAJ1icWlsbJt--2zSPg9Bh6cca8tcrUwOdUFqhtn66ft-B4FL9R8xq2aHKnsuN1g84IkVF1k2v147Bza_YVzBbGtY_F67AXWgsFA6EsjQvJ3WybgiV-lL0vZLRI2q1tRQdIonu-lu3VtCPMFw5GzzImtsaxIfrTTV2NJrx4SjvI9kawlXiXjTEeHnQDNqcMjNXg3jAEaP9m26QeZI_AUnca_N1pX5VoZxf7hdp60dRk4wtWkGADkG9QQQfqiT-GiWOZ7OcFm7XKWwgIKc5a41kZMY9udR_D1NjlgkIrq-iuTALujl9YsXkhBg7SRBDDIFjqjMJkIFKCHDGR_2mXZNdwkSAXkC291p9DVteeZWej9OS4qwLHYxsasOAo5O5vUElnUYogv17P4p6-LI8a1RHJx68K=w812-h421-no)
<!-- more -->
> [Demo](https://shunnien.github.io/JavaScript30day/day_28/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

不使用 input ，改使用 div ，透過滑鼠位置與 div 大小來計算播放速度

## 步驟 1.

取得速度元素的 DOM ，然後建立 **mousemove** 滑鼠移動事件的觸發

``` js
// 取得 speed div
const speed = document.querySelector(".speed");
// 取得 speed bar div
const bar = speed.querySelector(".speed-bar");

/**
 * 速度條上滑鼠移動
 * @param {*} e window.event
 */
function handleMove(e) {
}

speed.addEventListener("mousemove", handleMove);
```

## 步驟 2.

計算滑鼠在速度條上的位置，利用相對位置與速度條的大小計算比例；然後依照該比例去計算播放速度

``` js
/**
 * 速度條上滑鼠移動
 * @param {*} e window.event
 */
function handleMove(e) {
  // 取得滑鼠在速度條上的位置
  const mousePoint = e.pageY - this.offsetTop;
  // 計算移動的速度條百分比
  const mousePercent = mousePoint / this.offsetHeight;
  // 速度條的最小倍速與最大倍速
  const min = 0.4, max = 4;
  // 播放速度計算
  const playSpeed = mousePercent * (max - min) + min;
}

```

## 步驟 3.

更換速度條的樣式與內容文字，以及播放器的播放速度

``` js
// 取得播放器 DOM
const video = document.querySelector("video");
/**
 * 速度條上滑鼠移動
 * @param {*} e window.event
 */
function handleMove(e) {
  // 取得滑鼠在速度條上的位置
  const mousePoint = e.pageY - this.offsetTop;
  // 計算移動的速度條百分比
  const mousePercent = mousePoint / this.offsetHeight;
  // 速度條的最小倍速與最大倍速
  const min = 0.4, max = 4;
  // 播放速度計算
  const playSpeed = mousePercent * (max - min) + min;
  // 速度條的樣式
  bar.style.height = `${Math.round(mousePercent * 100)}%`;
  // 速度條的內容文字更新
  bar.textContent = `${playSpeed.toFixed(2)}X`;
  // 調整播放速度
  video.playbackRate = playSpeed;
}
```

# 筆記與備註事項

## JavaScript 部分

### [toFixed()][1]

格式化數字，設定顯示小數位，最多到 **20** 位數

``` js
var numObj = 12345.6789;

numObj.toFixed();       // Returns '12346': note rounding, no fractional part
numObj.toFixed(1);      // Returns '12345.7': note rounding
numObj.toFixed(6);      // Returns '12345.678900': note added zeros
(1.23e+20).toFixed(2);  // Returns '123000000000000000000.00'
(1.23e-10).toFixed(2);  // Returns '0.00'
2.34.toFixed(1);        // Returns '2.3'
2.35.toFixed(1);        // Returns '2.4'. Note that it rounds up in this case.
-2.34.toFixed(1);       // Returns -2.3 (due to operator precedence, negative number literals don't return a string...)
(-2.34).toFixed(1);     // Returns '-2.3' (...unless you use parentheses)
```

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed