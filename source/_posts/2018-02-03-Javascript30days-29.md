title: JS30紀錄 29-Countdown Timer
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-02-03 14:56:16
---

# 目標

製作一個倒數計時器，頁面上已經有固定秒數的選項，也有 form 的自訂時間的倒數
![target](https://lh3.googleusercontent.com/cZgyBfIKklM03kJ1xWEuIn8Q6Nshb0RUaBdkEpWekSGkdtcpJhkgxnTASrDt0YHu-cE5AFDVCBlKnazxXSlNc5UsDpwNnar6aDZdsIY4B8Q-UpjR0eQRG4HoQMxKyJTOmYrqc_QyQMlYqqpSTCO_TmFAGssGwjP4pSgCBp6Ozk7gH3KkABe7TCTir27knUKtjqdNs7m2BK3YyiDmi4nGxN2Sd6G2y3ZWxCpy9jTp0DSDE_lI-R0PNzNQ--83jugpkBCfWvcR_Xla8r5WkWPP2ysvcsaQN1x8ydwc1kHN5FrFGdFZRg1wIoS-ZOG985Hd524KB0ICLpL63CXVhdrFAM-NfO6TO6X9UraoVfZ9Qf2pgRhu5yYMuVVptuNn98NL9ApEz8_Np2SAzK5FFucnmSTeYD55b9RikgAdofQurPNOFLjYREYkhNblsK6PvvuD0U9u3z5AqMo353uXxCwTwZtuGDp6XTvtMzys1k0nqk6F19M5mWVeprR2avZ52eAF_lu-kU6fNIw0whj3U-st7N7WLWV42OXH2Vy7U1Fg6lQSbmRkvOvGUHBbAXJZkiCaEEF98njTGn8whHwQBZcicnE1VTDg1IpVzdbO3dKOlHg7PuXlkb_xvmYlrlgymAjPmVHLbljcWlskIhoI9BueFk-wJNuk1cnZ=w802-h390-no)
<!-- more -->
> [Demo](https://shunnien.github.io/JavaScript30day/day_29/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

要製作一個倒數計時器，就要使用到 [**setInterval**][2] ，練習的範本上已經有幾個固定秒數按鈕，所以先把顯示文字呈現出來，最後在處理計時器

## 步驟 1.

顯示文字的部分有兩個，一個是倒數計時，一個是時間截止的時間，另外還要變更網頁標題(頁籤上的標題文字)

``` js
// 取得所有 buttons
const buttons = document.querySelectorAll("[data-time]");

// 倒數計時的顯示元素
const timerDisplay = document.querySelector(".display__time-left");
// 結束時間的顯示元素
const endTime = document.querySelector(".display__end-time");

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
  const display = `${minutes}:${remainderSeconds}`;
  // 變更網頁標題
  document.title = display;
  // 顯示倒數計時
  timerDisplay.textContent = display;
}

/**
 * 顯示結束時刻
 * @param {*} timestamp
 */
function displayEndTime(timestamp) {
  // 轉換為時間
  const end = new Date(timestamp);
  // 顯示結束時間
  endTime.textContent = `Be Back At ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}`;
}
```

## 步驟 2.

各按鈕事件與計時器撰寫，利用 [**setInterval**][2] 來顯示上一步驟的時間。由於 [**setInterval**][2] 設定為每秒鐘進行，所以顯示時間直接根據秒數去扣除顯示。

``` js
// 建立計時器
let countdown;

/**
 * 按鈕事件，啟動計時器
 */
function startTimer() {
  // dataset 轉換數值
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

/**
 * 倒數計時器
 * @param {*} seconds
 */
function timer(seconds) {
  // 先清除其他計時器，避免相互影響
  clearInterval(countdown);
  // 計算倒數計時完成的時刻(使用毫秒)
  const then = Date.now() + seconds * 1000;
  // 顯示倒數計時
  displayTimeLeft(seconds);
  // 顯示完成時刻
  displayEndTime(then);

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

buttons.forEach(button => button.addEventListener("click", startTimer));
```

## 步驟 3.

表單的自訂時間功能，同樣呼叫上一步驟的計時器；並將顯示時間的文字調整；注意表單送出的時候需要取消預設功能，避免頁面重整。

``` js
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
  // 變更網頁標題
  document.title = display;
  // 顯示倒數計時
  timerDisplay.textContent = display;
}

/**
 * 顯示結束時刻
 * @param {*} timestamp
 */
function displayEndTime(timestamp) {
  // 轉換為時間
  const end = new Date(timestamp);
  const hour = end.getHours().toString();
  const minute = end.getMinutes().toString();
  const second = end.getSeconds().toString();
  // 顯示結束時間
  endTime.textContent = `Be Back At ${paddingLeft(hour, 2)}:${paddingLeft(
    minute,
    2
  )}:${paddingLeft(second, 2)}`;
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

document.customForm.addEventListener("submit", function(e) {
  // 取消事件
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  // 表單清單
  this.reset();
});

```

# 筆記與備註事項

## JavaScript 部分

### [Date.now()][1]

{% note info %}
Date.now() 方法回傳自 1970/01/01 00:00:00 UTC 起經過的毫秒數。
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
{% endnote %}

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Date/now
[2]: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval