title: JS30紀錄 16-Mouse Move Shadow
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-01-05 21:23:46
---

# 目標

讓文字陰影因為滑鼠移動而移動。
![target](https://lh3.googleusercontent.com/ufNEtUhbxOVSfV0oHRjCFfeX4vIQ4hiPUAsFE4jK6IuVJUKwSfRBPzvHGySLwacnGwtmawNkhKHXsbnpbrs-cDA0yeGEoAw2TNfhkBNsNa7sVYGF9SDA5tD0zvbjNx0Ama53S9IL577O0DjF1cS1zdp_OZxI-w6MgB0zKZ-RSZYFuo6V6SozYc3DtrqRQYSJEFTsIGSWeBVLrE-KR88tx3QZLwS2ffdtIKWYmD9It4Q3eUM1KTCI6YSnAZQCE5cElabXMWBWQXA5vlE7L4UvN_kAPUteR_-xPAfvFmWjyQTxUEoCIsZJEknEbyrF4w6fe7OiDQektpVdW6zyKPT0p1sgnfgRR8FIJsW6ny7909Xl6z4sK-gkcKQvl6qxYOEj_6x9ZDok3dxIsTvEkD2AuPh9aoKgXClhn3n-Db8vOd7hMMY7oXfPiuZNets6m6ElYYaO0ZjLBR7JoeDxTuE1eN2_C3iT0r4ogeB8SnL9fBMYRUsJaS-elYSKNLKjs9XO7zFqhwAfE4rTHPjs4saMnpjbfEXT0eIZazwqxXt_MOFTmQYNSqVH45ZqsLpaWh8CHJyywOzJC0ZAj3o0XADsAS0Qf3rXCiBd3uBgV9UJRcoBL0NN8BlEMMm8hiDVjR0igqYcV65ZX_nCdkbZaTlF5fVtEPGxV1qh=w1028-h679-no)

<!-- more -->
> [Demo](https://shunnien.github.io/JavaScript30day/day_16/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

## 步驟 1.

- 因為 **.hero** 的樣式被設定滿版，所以直接取得 **.hero** 的 **DOM**
- 建立 **mousemove** 事件與綁定 **shadow**

## 步驟 2.

此步驟需要注意的是，利用 offset 來計算，另外因為事件綁定是 **mousemove** 所以在移動到文字上時，所取得的 offset 值會變成該文字 DOM 內的資料，所以需要進行判斷式，來針對數值調整

- 設定變數 **walk** 為陰影移動固定值
- **shadow** 內，取得 **hero** 的長寬，利用 **offsetWidth** 與 **offsetHeight**
- **shadow** 內，利用 e 取得目前滑鼠在畫面中的 **offsetX** 與 **offsetY**
- 當 **e.target** 為文字 DOM 時，讓數值添加 **offsetLeft** 或是 offsetTop

## 步驟 3.

- 使用 [**Math.round()**][2] 來取整數近似值
- 為了使陰影移動到文字的上邊與左邊，計算出來的值扣除 **walk** 的一半

``` js
  const xWalk = Math.round(mouseX / width * walk - walk / 2);
  const yWalk = Math.round(mouseY / height * walk - walk / 2);
```

- 添加多組陰影

# 筆記與備註事項

## HTML 部分

### [contenteditable][1]

表示該元素是否可以被使用者編輯

## JavaScript 部分

### [Math.round()][2]

{% note info %}
Math.round() 函數回傳四捨五入後的近似值.
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
{% endnote %}

### [MouseEvent.offsetX][3] 與 [MouseEvent.offsetY][4]

滑鼠移動點與事件對象在 X 軸或是 Y 軸的偏移量值。

### [HTMLElement.offsetLeft][5] 與 [HTMLElement.offsetTop][6]

{% note info %}
**offsetLeft** 返回當前元素左上角相對於 **HTMLElement.offsetParent** 節點的左邊界偏移的像素值。

**offsetTop** 返回當前元素相對於 **offsetParent** 元素頂部的偏移值。
{% endnote %}

### [HTMLElement.offsetWidth][7] 與 [HTMLElement.offsetHeight][8]

{% note info %}
![Dimensions-offset](https://mdn.mozillademos.org/files/347/Dimensions-offset.png)
**資料來源** - [*MDN*](HTMLElement.offsetWidth)
{% endnote %}

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/HTML/Global_attributes/contenteditable
[2]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/round
[3]: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetX
[4]: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetY
[5]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft
[6]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop
[7]: https://developer.mozilla.org/zh-TW/docs/Web/API/HTMLElement/offsetWidth
[8]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight