title: JS30紀錄 21-Geolocation
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-01-15 18:18:44
---

# 目標

操作 Geolocation API ，取得目前所在方位，與行進速度。

![target](https://lh3.googleusercontent.com/-Vs-vrp3_yZY5eCJ1ZLkoj9VPJ_1WqolVXaH5kzg0-7M4AxDFaPnlcJSqgX09LpKhIRbnv0ny_wfkzBV-kgp9pq2bfOyaKV4GKnojS_mV1dKkXsgv4Qi-BnyVnOV4L9R9Qg1cbYP1lmIkMU2ezpkILd_6uS22qrA7fEn0RKamurMiDh3pG4mri3UhzblNMqYx0TFUdWASYQ8H_U5dRTuyTWApBuJkkj_PERE2Fvv7gRyzB1AWvu6G1BuL6ObNk0Nst7XwM4M5K5uRoIBxAaUW5ldaom8Zq4sxhgGt80yM2d130rdmLimehRlq7CWNvHwWf7cPfrZ5ILJdihxwXh9d2NGYwfIgiTmJdQREfrpustX86covClcSaqSPwcuvkc1xNtvSEQ2p2GiVWpMSlYsR96nHcOH3Ow9WDuMLzmbqSIWUbs0_qtVjriY-oOagdBoXsyuQ02WhTiKaJjXRCGt81UXSubuWMutOmPvYG6C2iyOKuq3Eow0bZ9BIiqK6BtN9kyyAQQU2dK2dQEtgsVrXRLgymJ4wjYNRSYpXTXnN6EbymAJHtfQ543tvxQ_thk0M1QwNXg7rjvFGdU6IlKkDiMwC8zkAdPoXGM8ogHelrz1jJxbpsYZCgiHhdro8U3IuYh-UJ_OIUh4AkrSLTdRLKvm42xpPA96=w464-h633-no)

<!-- more -->

> [Demo](https://shunnien.github.io/JavaScript30day/day_21/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

由於教學影片使用 Xcode 來針對行動裝置模擬，並模擬行進速度與方向，而我使用 Windows 10 ，要直接在模擬器開啟尚須要一些設定，加上不確定 Android 有無 Geolocation 的模擬範例(模擬步行或是開車)，所以就直接上 [Github](https://shunnien.github.io/JavaScript30day/day_21/) 看結果。

另外也可以直接連接手機測試，透過 Chrome 的 [remote-debugging][4]

## 步驟 1.

取得 DOM 資料

``` js
// 取得方向 DOM
const arrow = document.querySelector(".arrow");
// 取得速度 DOM
const speed = document.querySelector(".speed-value");
```

## 步驟 2.

改變顯示資料，但是因為瀏覽器支援因素，目前手上的測試 **speed** 與 **heading** 皆是 **null**

``` js
navigator.geolocation.watchPosition(
  data => {
    console.log(data);
    speed.textContent = data.coords.speed;
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
  },
  err => {
    console.error(err);
  }
);
```

# 筆記與備註事項

## JavaScript 部分

### [地理位置定位 (Geolocation)][1]

{% note info %}
Web Apps 若需要使用者的位置，可透過 Geolocation API 取得相關資訊。而基於隱私權的考量，這些 Web Apps 均必須取得使用者的許可之後，才能發佈位置資訊。
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-TW/docs/Web/API/Geolocation/Using_geolocation)
{% endnote %}

### [Geolocation.watchPosition()][2]

{% note info %}
Geolocation.watchPosition() 這個方法是用來註冊一個處理的函式，當使用者的裝置位置更新時，這個函式所傳入的回呼函式(callback function) 就會自動被呼叫。你也可以選擇性的定義錯誤時哪些錯誤回呼函式(error callback function) 需要被呼叫。
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-TW/docs/Web/API/Geolocation/watchPosition)
{% endnote %}

### [Coordinates][3]

{% note info %}
Coordinates 這個介面用來存取裝置的經緯度，速度以及這些數值的準確度。
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-TW/docs/Web/API/Coordinates)
{% endnote %}

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/API/Geolocation/Using_geolocation
[2]: https://developer.mozilla.org/zh-TW/docs/Web/API/Geolocation/watchPosition
[3]: https://developer.mozilla.org/zh-TW/docs/Web/API/Coordinates
[4]: https://developers.google.com/web/tools/chrome-devtools/remote-debugging/?hl=zh-tw