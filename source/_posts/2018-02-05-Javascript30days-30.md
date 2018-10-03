title: JS30紀錄 30-Whack A Mole
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-02-05 17:29:49
---

# 目標

製作打地鼠小遊戲
![target](https://lh3.googleusercontent.com/hFdj5MmkFg1a_7IByCMDLsJUN189d9l9J07bS_v6IjtNSQA4mSwfa4nasmFF2QtyriYFdq6YqgjvQ0yOORLQQLYFsIQA_Q1hQVyaGHzh0N-XQPGvM51y0WIXMhqYS8ostZ1fFBdcXuXIJD0mL1d8hXCDL7douXV0kq-RWPAiAcalD78UFU0lDFEk_3lKmWETdUabzvpV0cpShlx8-fppFOpOXGVxDT8EupoU6qA4T9VGxgy6Q7SuNIY5q0J1Ym-g56BA9lty-Q30mmhAXqGfz0B5EdFpQ_Qs4UnefSBTN073uItwhkd9NCrEv6kRoMJ4xeRtAmquPriXYLuffCN3ge6IhSuV8STlwKQrEvCKjjwABIQtKAzFf1cO9FqWd9IgOJqED5bncYAyPJxeGnhxbqEKPY2gszsbKik7bGxnSgTdsMDJROWsxlvmQ1sQBLvkHkEfe_z8DrLPPBs0JLtvnx2CHLm0kfFfTzSVbqekIPnKsFT_o1ldS2jC6qGx-kcOd1SYxO7mf-Cefv_oo8Y0JsTlKhbql36-OGKtBKmLxfhQ49543hqlLhgs53r_ouMWngNaekjp_A6NHS4YUjX2DP_Tiv7I4HxnSpVyS0Ebms1tOTP13u5rC20vdBUyVU6VVuWpmkqaTdXaA8tmYG9ScYZp6GMnTXrZ=w788-h755-no)
<!-- more -->
> [Demo](https://shunnien.github.io/JavaScript30day/day_30/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

先了解地鼠是隨機出現在 6 個地洞中，而且出現時間也是隨機的長度

## 步驟 1.

建立隨機時間 **function** 設定隨機範圍

``` js
/**
 * 地鼠出現的時間
 * @param {*} min
 * @param {*} max
 */
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
```

## 步驟 2.

建立隨機出現地鼠的地洞 function ，並且由於隨機的數值可能重複，利用**遞迴** 與變數 **lastHole** 來排除

``` js
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
// 紀錄上次隨機的地洞
let lastHole;
/**
 * 隨機出現地鼠的地洞
 * @param {*} holes
 */
function randomHole(holes) {
  // holes 是陣列，由 0 開始，所以利用 random 直接設定 random 範圍
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  // 隨機有可能重複的地洞，所以建立變數排除重複
  if (hole === lastHole) {
    console.log("Ah nah thats the same one bud");
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}
```

## 步驟 3.

地鼠出現的樣式與呼叫前幾個步驟的 function ，並建立 **timeUp** 標註遊戲時間是否到達

``` js
// 遊戲時間是否已經到達
let timeUp = false;
/**
 * 地鼠出現
 */
function peep() {
  // 地鼠出現的隨機時間
  const time = randomTime(500, 2000);
  // 地鼠出現的隨機地洞
  const hole = randomHole(holes);
  // 變更該地洞的地鼠樣式，讓其顯示
  hole.classList.add("up");
  // 地鼠出現的時間
  setTimeout(() => {
    hole.classList.remove("up");
    // 讓地鼠出現連續，遊戲時間到則停止
    if (!timeUp) peep();
  }, time);
}
```

## 步驟 4.

建立開始遊戲按鈕的功能，宣告分數變數 **score** ； **setTimeout** 的時間是毫秒。

``` js
// 遊戲得分
let score = 0;
/**
 * 遊戲開始
 */
function startGame() {
  // 分數版歸 0
  scoreBoard.textContent = 0;
  // 遊戲時間標示
  timeUp = false;
  // 遊戲得分歸 0
  score = 0;
  // 地鼠開始出現
  peep();
  // 遊戲截止時間
  setTimeout(() => (timeUp = true), 30000);
}
```

## 步驟 5.

打擊地鼠後計算得分，並移除地鼠樣式(可以考慮替換成地鼠挨打樣式)，並使用 **isTrusted** 判斷是否使用程式碼作弊

``` js
/**
 * 打擊地鼠後得分
 * @param {*} e
 */
function bonk(e) {
  // 判斷是否真的使用滑鼠點擊
  if (!e.isTrusted) return; // cheater!
  // 分數 + 1
  score++;
  // 移除地鼠顯示
  this.parentNode.classList.remove("up");
  // 顯示得分
  scoreBoard.textContent = score;
}
moles.forEach(mole => mole.addEventListener('click', bonk));
```

## 步驟 6.

此步驟是自行延伸部分，增加顯示遊戲時間，參照 [day_29](https://shunnien.github.io/2018/02/03/Javascript30days-29/) 調整 html 顯示倒數遊戲時間

``` js
// 倒數計時的顯示元素
const timerDisplay = document.querySelector(".controllPanel span");
// 建立計時器
let countdown;
/**
 * 遊戲開始
 */
function startGame() {
  // 分數版歸 0
  scoreBoard.textContent = 0;
  // 遊戲時間標示
  timeUp = false;
  // 遊戲得分歸 0
  score = 0;
  // 地鼠開始出現
  peep();
  // 遊戲截止時間
  setTimeout(() => (timeUp = true), 30000);
  // 啟動計時器
  timer(30);
}

/**
 * 倒數計時器
 * @param {*} seconds
 */
function timer(seconds) {
  // 先清除其他計時器，避免相互影響
  clearInterval(countdown);
  // 顯示倒數計時
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    // 每秒鐘執行，所以直接每次減 1 就好
    seconds--;
    // 小於 0 時，清除計時器
    if (seconds < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(seconds);
  }, 1000);
}

/**
 * 顯示倒數計時
 * @param {*} seconds 秒數
 */
function displayTimeLeft(seconds) {
  // 計算幾分鐘
  const minutes = Math.floor(seconds / 60);
  // 計算剩餘秒數
  const remainderSeconds = seconds % 60;
  // 組合顯示文字(剩餘時間)
  const display = `${paddingLeft(minutes.toString(), 2)}:${paddingLeft(
    remainderSeconds.toString(),
    2
  )}`;
  // 顯示倒數計時
  timerDisplay.textContent = display;
}
/**
 * 文字在指定長度中左邊補 0
 * @param {*} str 輸入文字
 * @param {*} lenght 補 0 的長度
 */
function paddingLeft(str, lenght) {
  if (str.length >= lenght) return str;
  else return paddingLeft("0" + str, lenght);
}
```

# 筆記與備註事項

## JavaScript 部分

### [isTrusted][1]

{% note info %}
Event 介面的 isTrusted 唯讀屬性為一個布林值，若事件物件是由使用者操作而產生，則 isTrusted 值為 true。若事件物件是由程式碼所建立、修改，或是透過 EventTarget.dispatchEvent() 來觸發，則 isTrusted 值為 false。
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/isTrusted)
{% endnote %}

## CSS 部分

### [cursor][3]

定義滑鼠游標樣式，亦可以選擇 **url** 可以參考 [RealWorld Graphics][2] 取得游標 cur file

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/API/Event/isTrusted
[2]: http://www.rw-designer.com/gallery
[3]: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor