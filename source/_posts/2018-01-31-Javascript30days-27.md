title: JS30紀錄 27-Click and Drag
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-01-31 15:13:58
---

# 目標

左右移動卷軸，使用滑鼠拖曳來移動左右
![target](https://lh3.googleusercontent.com/o4X9v8Frhbw_lW45gBPjCXFgflOQL1xcoWUTL3KAf6OIfnxzO_t2M8JIMI3YMIzprU76aQOez85jNqXbUhaCNP_azfDyA0W4LInRwBkI7mYhgkq7DNSGqWAGdgn9TWHueYcwhuPzcjEQt5T5PJwzxK1ECbFxVQp-WEulIuIzmSSpMD0Nk0A2AwoXWyN6bQdw0O3lRi3lRCvHcK7hL5uLocjjoaqGBXMWBhL3g3-ig13lo-MokWpXwKVAgpsY5OihrAVai_FxW7IhMUgNaCsNfilM6xXZEx2XyfpFxYKp4syDAdEJmFvGuLQA3TLvM9ynSKdNrKWvb7X--j-8SAMpzG0GSZv_e9yS0aV7xyJ613F-Kbb1AC6aLLMKbjrg0Aiyy7ngLK_mxiiGwXuXhoGPpGzWHo416nfi2nvYXHDrOX9o7bpeHn2z0Z-NmU2-G5vmbLpoZMkuhplFQtsBY6P1kATgydK2Za3BDvXLa1oPkPTiowDHdIj9k8btb_SJZ5ZjJmK-eCaRWeOAml7WSNerOD2jGXqE7f9_mtK2c8YuCScaXMeCxxg9LVONAjyYyagfIT4z4exyjk-qvh9b7qfmwt80YmE5W1PLQlkoJ8US2t_JQuouNCRwR8Cr2uhrENLUSxM7BKkYOY9U85yVYWIbv141KfJ_OX25=w794-h350-no)
<!-- more -->
> [Demo](https://shunnien.github.io/JavaScript30day/day_27/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

目的是拖拉畫面的時候等於移動卷軸，所以需要知道卷軸的 **offsetLeft** 與滑鼠橫軸位置的 **pageX** ，計算出滑鼠移動距離後，將卷軸位置重新設定，以達到移動的目的。

## 步驟 1.

滑鼠點擊的時候，有樣式變換，離開畫面或是按鍵放開就樣式還原，建立 **mousedown** 、 **mouseup** 、 **mouseleave** 等事件，並切換樣式

``` js
// 取得最外層的 div items
const slider = document.querySelector(".items");

/**
 * 移除樣式
 */
function handleRemoveActive() {
  slider.classList.remove("active");
}
/**
 * 滑鼠按鍵按下
 * @param {*} e
 */
function handleMouseDown(e) {
  slider.classList.add("active");
}

// 滑鼠按鍵按下
slider.addEventListener("mousedown", handleMouseDown);
// 滑鼠離開元素
slider.addEventListener("mouseleave", handleRemoveActive);
// 滑鼠按鍵鬆開
slider.addEventListener("mouseup", handleRemoveActive);
```

## 步驟 2.

建立滑鼠移動的事件，並判斷滑鼠左鍵未點選時返回

``` js
/**
 * 移動事件
 * @param {*} e window.event
 */
function handleMove(e) {
  // 判斷滑鼠左鍵點選，未點選直接返回停止
  if (e.buttons !== 1) return;
}

// 滑鼠移動
slider.addEventListener("mousemove", handleMove);

```

## 步驟 3.

宣告變數 **startX** 紀錄滑鼠目前的 X 軸位置，以及 **scrollLeft** 卷軸目前的位置；接著計算移動距離與設定

``` js
// 紀錄滑鼠點擊的起始位置
let startX;
// 紀錄卷軸左邊位置
let scrollLeft;

/**
 * 滑鼠按鍵按下
 * @param {*} e
 */
function handleMouseDown(e) {
  slider.classList.add("active");
  // 設定起始位置
  startX = e.pageX - slider.offsetLeft;
  // 紀錄卷軸目前位置
  scrollLeft = slider.scrollLeft;
}

/**
 * 移動事件
 * @param {*} e window.event
 */
function handleMove(e) {
  // 判斷滑鼠左鍵點選，未點選直接返回停止
  if (e.buttons !== 1) return;
  // 停止冒泡
  e.stopPropagation();
  // 移動距離
  const walk = e.pageX - slider.offsetLeft - startX;
  // 卷軸設定位置
  slider.scrollLeft = scrollLeft - walk;
}

```

# 筆記與備註事項

## JavaScript 部分

### [offsetLeft][3]

取得元素的左邊界的相對值

### [pageX][4]

由滑鼠事件取得目前游標在畫面上的 X 座標

## CSS 部分

### [perspective][1]

{% note info %}
perspective 属性指定了观察者与z=0平面的距离，使具有三维位置变换的元素产生透视效果。z>0的三维元素比正常大，而z<0时则比正常小，大小程度由该属性的值决定。

三维元素在观察者后面的部分不会绘制出来，即z轴坐标值大于perspective属性值的部分。

默认情况下，消失点位于元素的中心，但是可以通过设置perspective-origin属性来改变其位置
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)
{% endnote %}

### [user-select][2]

實驗性功能，控制是否能被選取；

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/perspective
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/user-select
[3]: https://developer.mozilla.org/zh-TW/docs/Web/API/HTMLElement/offsetLeft
[4]: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX