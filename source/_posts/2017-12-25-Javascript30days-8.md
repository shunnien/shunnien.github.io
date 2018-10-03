title: JS30紀錄 08-Fun with HTML5 Canvas
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2017-12-25 14:52:01
---

# 目標

![target](https://lh3.googleusercontent.com/32bcpeeyeEw09veI7zDwBK-69zcoIgv6BkvbBsDp0Bs4yJd63ArmxJvkLE_4CABteEO37ix4OhyGwRF34qGrrxZFpz83YSbWS4pAXP57_BrM8DPJVp_S8fUvN-WXhythDZRHnYpmVvNzKZVUPHlsuPQoo13_4a2TwRetcTjMnA-9JYfcAKK7qfJo4W2cWNjMwQ4ODuLV1A_MCFgN11-tozJK1qnPmTRyF84-Knutq4mNVbbO4v1zqcze1C1BiMKd_mDXEj08az4gQq7lxtNEAu1GqT14fjT-oyNV9qtWYW8huUc4_Vw4el3ksRJ45FUmTuHp3PwS_vFn_-Yq9GXwF1Gy_5dNd34uDhvVP35_Xgu8Dl4CKc9PEkAiBy4vfxu1cNo0_wEc25HVT8DfBCDfAv7oRW4Ma68n6uteBbbp5ZczT0rGwy7HzUdq8cZur__8g1wyVwOZE6weahT4csnhYaNGzhWwFvoCFI_-XExy_Zf7ml8ZlLS432DYzSysZ2ZNPYj0IOhhFvi-v78QSxIM_MLS9nbflRAOpx59AMFMCYErsColQxsQMKdUN6o1pOmcz1N1Q2d5gkhyn5DU7NnFoiJZ8k1OsMofOGUfN_3Vj0G7-PB8JOTeSB75BthWXGAMJax47fT1LSx-tQGkq0vYC87ODGahngF6=w500-h364-no)
利用 Canvas 製作一個滿版的畫布，並讓畫筆隨著移動變動粗細與顏色。
<!-- more -->

> [Demo](https://shunnien.github.io/JavaScript30day/day_08/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

## 步驟 1.

取得 [canvas][1] DOM ，並將該 DOM 設定為 window 的大小，與畫筆的初始樣式設定。

- 取得 canvas 的 context
- 設定 strokeStyle 畫筆顏色
- 設定線條連結樣式 `lineJoin`
- 設定線條兩端端點樣式 `lineCap`
- 設定線條寬度 `lineWidth`

## 步驟 2.

- 設定滑鼠 `mousedown` 時，取得目前滑鼠位置為繪製起始點
- 設定滑鼠 `mousemove` 時，設定繪製路徑
- 設定滑鼠 `mouseup` 時，才開始繪製

## 步驟 3.

修正上一步驟的繪製過程，讓線條在滑鼠移動時也跟著繪製，因此建立 **isDrawing** flag 標註現在是否繪製，另外建立標註現在起始點的變數。

- 添加 **isDrawing** 變數，標註現在是否繪製
- 添加 **startPoint** 變數，設定起始

## 步驟 4.

增加畫筆變色與樣式變換
- 修正 **startPoint** 變數為 X,Y 分開變數
- 增加 **hue** 與 **direction** 變數
- 利用 **hue** 變換畫筆顏色
- 利用 **direction** 變化畫筆粗細
- 增加 **mouseout** 事件，當滑鼠移出畫布時，此次作畫結束

# 筆記與備註事項

## JavaScript 部分

### [Canvas 教學文件][1]

**Canvas** 有許多地方可以深入探討，因應此篇課題，就不多談，不過 [*MDN*][1] 提供了不錯的教學文件，因此這邊特地列上來。

{% note info %}
`<canvas>` 是一個 HTML 元素，我們可以利用程式腳本在這個元素上繪圖（通常是用 JavaScript）。除了繪圖，我們還可以合成圖片或做一些簡單（或是不那麼簡單）的動畫。
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API/Tutorial)
{% endnote %}

### [Canvas API][2]

{% note info %}
`<canvas>` 是 HTML5 的新元素，可透過 Script（通常是 JavaScript）繪製圖形。例如，可以用來繪圖、合成圖照片、建立動畫、甚至處理即時的影片播放。
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API)
{% endnote %}

### [CanvasRenderingContext2D.beginPath()][3]

{% note info %}
是 **Canvas 2D API** 通過清空子路徑列表開始一個新路徑的方法。當你想創建一個新的路徑時，調用此方法。
**資料來源** - [*MDN*](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath)
{% endnote %}

畫線段時，使用此方法，表示以下開始繪製新的線段。

### [OffscreenCanvas.getContext()][4]

取得 canvas 的畫布內容，必須指定內容類型，有 **2d** 、 **webgl** 、 **webgl2** 、 **bitmaprenderer** 幾種。

### [CanvasRenderingContext2D.strokeStyle][5]

{% note info %}
`CanvasRenderingContext2D.strokeStyle` 是 **Canvas 2D API** 描述畫筆（繪製圖形）顏色或者樣式的屬性。默認值是 `#000`(black)。
**資料來源** - [*MDN*](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle)
{% endnote %}

就是畫筆顏色。

### [CanvasRenderingContext2D.lineJoin][6]

{% note info %}
`CanvasRenderingContext2D.lineJoin` 是 **Canvas 2D API** 用來設置 2 個長度不為 0 的相連部分（線段，圓弧，曲線）如何連接在一起的屬性（長度為 0 的變形部分，其指定的末端和控制點在同一位置，會被忽略）。
![lineJoin sample](https://mdn.mozillademos.org/files/237/Canvas_linejoin.png)
**資料來源** - [*MDN*](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin)
{% endnote %}

線條與線條的連接樣式。

### [CanvasRenderingContext2D.lineCap][7]

{% note info %}
**CanvasRenderingContext2D.lineCap** 是 **Canvas 2D API** 指定如何繪製每一條線段末端的屬性。有 3 個可能的值，分別是：`butt`, `round` 與 `square`。默認值是 `butt`。
**資料來源** - [*MDN*](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap)
{% endnote %}

簡而言之，就是設定線條兩端端點的樣式。

### [CanvasRenderingContext2D.lineWidth][8]

{% note info %}
`CanvasRenderingContext2D.lineWidth` 為 **Canvas 2D API** 設定線段粗細的屬性。可藉此屬性取得目前的線段粗細值（預設為 1.0）。設定此屬性時，**零**、**負數**、**Infinity** 以及 **NaN** 都會被忽略，而其他正確的值將會被設定成屬性值。
**資料來源** - [*MDN*](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth)
{% endnote %}

### [CanvasRenderingContext2D.moveTo()][9]

繪製路徑的設定，由畫筆落點移動到 (x,y) 座標。可以用來設定起始點之類。

### [CanvasRenderingContext2D.lineTo()][10]

{% note info %}
CanvasRenderingContext2D.lineTo() 是Canvas 2D API 使用直線連接子路徑的終點到x，y坐標的方法（並不會真正地繪製）。
**資料來源** - [*MDN*](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo)
{% endnote %}

### [CanvasRenderingContext2D.stroke()][11]

{% note info %}
CanvasRenderingContext2D.stroke() 是Canvas 2D API 使用非零環繞規則，根據當前的畫線樣式，繪製當前或已經存在的路徑的方法。
**資料來源** - [*MDN*](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke)
{% endnote %}

就是開始繪製，將設定的路徑繪製出來。

## CSS 部分

### [hsl()][12]

在 **CSS3** 中新增了 **HSL** 及 **HSLA** 等兩種跟顏色有關的屬性。
其中 H 為 **hue**(色相)、S 為 **saturation**(飽合度)、L 為 **lightness**(亮度)。HSLA 就跟 RGBA 一樣，都是在原本的屬性中多加入了不透明度的設定而已。

#### hue

- hue 為整數的角度值，基本上是從 0 到 360 之間，因為它是經過一個簡單的計算來處理所輸入的值
- 0 或 360 表示紅色；60 表示黃色；120 表示綠色；240 表示藍色。

#### saturation

saturation 的表示方式為百分比(%)；100% 就是最大飽合度，而 0% 則為灰色調。

#### lightness

lightness 的表示方式也一樣是百分比(%)；以 50% 為正常亮度為分界，百分比越高則會越接近白色(100%)，而百分比越低則會越接近黑色(0%)

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API/Tutorial
[2]: https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API
[3]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
[4]: https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas/getContext
[5]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
[6]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
[7]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
[8]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
[9]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/moveTo
[10]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
[11]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke
[12]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value