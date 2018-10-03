title: JS30紀錄 19-Webcam Fun
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-01-09 10:41:01
---

# 目標

練習操作 Webcam 攝像頭，將攝像頭影像投射到 Video 上，並利用 canvas 來擷取圖片，練習濾鏡的操作。
![target](https://lh3.googleusercontent.com/Dn9HwhKBJ_YC5ANkWLNYdWaUWbP3-uWzLB3_K7sT44SimrflLUOmn4Trj6LwzNFExUuLW60-v_IwpoZcpj7BmL_QD7B2dJ22uOoZXWR2CqFNKPlxnAmUKchcEwpsyTfzNVX2_EgrSfAyo1IhEtX5Iyhzq7HtryAmFJ361DSb71xn7xf7GaIS70RmhykGa2IzLODyT3UdHcO3zKqTVMmrmzlRPOtv06H8SumgRiTrYybP-tOBSeD3zr0V9js1dTpuflgBIoWMRMLg-rrCKooWs4EMRud09k5hiAbd2HbCdeRo2Yjc_yEPKoRgZ5agYZWs9pWjOtbgjIzspTtZK26x7AUBbpHXRms4WP_pvcORdKuQols4Ri1thag26yWzdXlZ9KLtmYVRfmQENVODM2BJtKhUHiDclspLNjIp4tf_I7YtUr_Zq5JcGF2TfT3YMQOkeRheeKt0TPfSeiZoC39yWQ_eJcVDYS7J_lfM9Kh7L7WSoTi7j1Zp-ybouwykt_iZUBbYfFlv9IqPd6nGdqSe_AowuM0_WoP8GlnmIveJkeX4GT2oMx-AZGQtP6a-jZiff094P0fExstrPvNVdY4sB8AeoGgROpB25VqX-a3GbwEldENiyuNWLDoR0XR5IIPEYy0hKz9IVZXFjREEH1now2jolH9cRZOq=w764-h605-no)
<!-- more -->

> [Demo](https://shunnien.github.io/JavaScript30day/day_19/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

## 前置作業

必須先安裝 [**node.js**][13]，之後按照以下的設定，設定 **package.json** 
``` json
{
  "name": "gum",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "browser-sync start --server --files \"*.css, *.html, *.js\""
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.12.5"
  }
}
```

由於此篇主題需要伺服器模擬，所以使用了 [Browsersync][8] ，其啟動方式透過

``` bash
npm start
```

或是

``` bash
browser-sync start --server --files "*.css, *.html, *.js"
```

## 步驟 1.

啟動視訊裝置，並寫入 **video tag** 呈現出來

``` js
const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
/**
 * 啟動 webcam
 */
function getVideo() {
  // 取得user的視訊裝置
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    // 把回傳的 MediaStream 寫進 html 的 video tag 中並播放
    .then(localMediaStream => {
      //console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}

/**
 * 將 webcam 拍攝影像繪製到 canvas 上
 */
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
  }, 16);
}

getVideo();
video.addEventListener("canplay", paintToCanvas);
```

> 參考資料
> [Navigator.mediaDevices][1]
> [MediaDevices.getUserMedia()][2]
> [URL.createObjectURL()][3]
> [canplay][4]
> [CanvasRenderingContext2D.drawImage()][5]

## 步驟 2.

拍照截圖按鍵觸發功能

``` js
/**
 * 攝像頭截圖
 */
function takePhoto() {
  // played the sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  // 設置連結位置為轉圖檔後的base64位置
  link.href = data;
  // 設置連結為下載並設定預設下載檔名
  link.setAttribute("download", "handsome");
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  // strip.firsChild 永遠為 null 因為 strip 為 const 所以無法得到最新的資料
  strip.insertBefore(link, null);
}
```

> 參考資料
> [Node.insertBefore()][10]

## 步驟 3.

添加畫面與色彩分離功能

![split pixels](https://lh3.googleusercontent.com/_XhwBxLYI-kjBx9-Uw8g-XXr7JRIYVkqzxUbVPWD-JeoNlxs38drNUo2eRfRL2KcOIKcYCAaLww68e-Au9o0ccgcxqRZ13LArSU7QClIdQf5VngqveaUa18Mg_nIWVUy6WVKOtnG0rzGqevZzkTx8DV5S8-T_8FhbDJXoZdhOlB0a2T0Ub4WyutQ4SU9wp81r2Afp8bM-V7sysqJhxzE8jDTJqwuI363zdMndYBrjwphQ8VT-C4kn7AO5QQKrTe3ga5-VPM1eYIVqDFUqVTWMTm2MzpG2_I3otOdt6YIJ-0Q0oeXHM1JFDZGKPrgPXrhG3Yi4GhHzOOQ_CmocB_uf1q1FiBvYeMztA38hQtFZ7H1Y_Ff88f9u_9EWvwhPh6JI3LjIvqj9h-HCcPXKb8V5HchooZicvlgy3J_7S2A7a-ejRkUdS9njXwrRzE-JN5H3-2nWff7IkOMSINADB1ED8yelLSkUYdYM-fQzJNGQLy3FI3HcGDyPfkUUGqiEt-18T70qkSvuLmF1UxE-lzn7NoVEu19nwCQJ7jhkZybdPjbQDPK-37Z8jI11_27Y5ZrWhczwoZ5Q6cMxK9aM3VfHWMQvl1ARk2nK3A7fNmbbQgPmeI2yFTyqjr6qywLKjobMsCRVLORn5yeSPSwYyHq9B5ddCgViywo=w872-h766-no)

``` js
/**
 * 畫面色彩分割
 * @param {*} pixels
 */
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    //console.log(pixels);

    pixels = rgbSplit(pixels);

    // 重置分割畫面
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}
```

> 參考資料
> [getImageData()][6]
> [putImageData()][7]

## 步驟 4.

添加紅色濾鏡功能

``` js
/**
 * 紅色濾鏡效果
 * @param {*} pixels
 */
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}
```

## 步驟 5.

綠幕功能效果

``` js
function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll(".rgb input").forEach(input => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}
```

# 筆記與備註事項

## HTML 部分

### [a tag attribute download][9]

此屬性告知瀏覽器下載這個連結，假如屬性有設定資料，則為下載檔案的預設檔名。

## JavaScript 部分

### [Navigator.mediaDevices][1]

唯讀屬性，取得 MediaDevices 物件，連接視訊裝置，包含攝影鏡頭與麥克風。


### [MediaDevices.getUserMedia()][2]

{% note info %}
MediaDevices.getUserMedia()方法提示用户允许使用一个视频和/或一个音频输入设备，例如相机或屏幕共享和/或麦克风。如果用户给予许可，就返回一个Promise 对象，MediaStream对象作为此Promise对象的Resolved［成功］状态的回调函数参数，相应的，如果用户拒绝了许可，或者没有媒体可用的情况下，PermissionDeniedError 或者NotFoundError作为此Promise的Rejected［失败］状态的回调函数参数。注意，由于用户不会被要求必须作出允许或者拒绝的选择，所以返回的Promise对象可能既不会触发resolve 也不会触发 reject。
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)
{% endnote %}

### [URL.createObjectURL()][3]

{% note info %}
靜態方法 URL.createObjectURL() 用於建立一個帶有URL的 DOMString 以代表參數中所傳入的物件. 該URL的生命週期與創造它的window中的 document一致. 這個新的物件URL 代表了所指定的 File 物件 或是 Blob 物件.
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-TW/docs/Web/API/URL/createObjectURL)
{% endnote %}

### [canplay][4]

播放媒體檔案時候觸發

### [CanvasRenderingContext2D.drawImage()][5]

Canvas 2D API 中的方法，在 Canvas 上繪製圖案

### [CanvasRenderingContext2D.getImageData()][6]

{% note info %}
返回一个ImageData对象，用来描述canvas区域隐含的像素数据，这个区域通过矩形表示，起始点为(sx, sy)、宽为sw、高为sh。
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData)
{% endnote %}

### [CanvasRenderingContext2D.putImageData()][7]

{% note info %}
CanvasRenderingContext2D.putImageData() 是 Canvas 2D API 将数据从已有的 ImageData 对象绘制到位图的方法。 如果提供了一个绘制过的矩形，则只绘制该矩形的像素。此方法不受画布转换矩阵的影响。
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/putImageData)
{% endnote %}

### [Node.insertBefore()][10]

在目前元素 ( DOM ) 中的子節點中插入一個子元素

``` js
// Get a reference to the element in which we want to insert a new node
var parentElement = document.getElementById('parentElement');
// Get a reference to the first child
var theFirstChild = parentElement.firstChild;

// Create a new element
var newElement = document.createElement("div");

// Insert the new element before the first child
parentElement.insertBefore(newElement, theFirstChild);
```

### [setInterval()][11]

需要每隔一段時間就重複執行的 **function** 就可以呼叫此方法。

### [.globalAlpha][12]

Canvas 2D API 設定透明度的屬性，設定區間在 **0.0** 和 **1.0** 之間。預設值為 **1.0**

# 參考資料

- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/API/Navigator/mediaDevices
[2]: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
[3]: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
[4]: https://developer.mozilla.org/en-US/docs/Web/Events/canplay
[5]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
[6]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
[7]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
[8]: https://www.browsersync.io/
[9]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
[11]: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
[12]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
[13]: https://nodejs.org/en/