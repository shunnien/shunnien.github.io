title: JS30紀錄 26-Stripe Follow Along Nav
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-01-30 13:50:58
---

# 目標

類似 [day22 Follow Along Link Highlighter](https://shunnien.github.io/2018/01/17/Javascript30days-22/) 的概念，製作一個跟隨移動的強調下拉選單。
![target](https://lh3.googleusercontent.com/10ExDAZQzARkXXs-TIOCu5WYdBOmGSZoqGnITTxcswxyOvnnti3Hy0h-dPAMulHoKLWLI_PbbrrF_7l8tDoVRFK0iyojJjEpTnCEZNc3XJkM0CutfFHx1qsGNDklQl9cQTbTj_fiQE7AKV63HBSr2-LbdRlyMpghguFsUPxJL9tftq7HZ16FZzJAVXzCq3IJ87KEY0G5Eak9MxDkVPP5oI9q95LUCu8gQlPdMFEMem-HX-_en5m8pPa0_LrbZz-1oMW4MK48Bj50UlePwzGmRbedUvE6nwh_JfxDfG2k51TD-CIIzFLFC1TKJphHwDlD7SOG9MtAerfBDo_273Ml8jq6nTbFC4e_ghtKS5XyksN30a5J-5DX3Zmu68x5cXIXyxopug2wo03J5ZeGSSEMgQ9G9dxTvUH4jH3zBxcKhrnbE5MSwl7Ol5bOV9_FPCGt8SJFzHV-_EAbRMsjJSbA8NA8GcIx77gKAOv0e-qnq4OOCvKqtJT8nSxnGAT6w_qwsJPyG8ibwWXgmbNgzWm13Gylks2LuJFyy0cYRowqZpQWYpf8UiQvNJJPF0SJHJJ5L8M_juMUtBMMI4-eBLvDV3-PCAX4AKn3IJqUUcijLofL3J3XkAuhWWssRPM-D3R4aidKtxPUqdYywr_-uypp1J2P6u7dH52r=w794-h435-no)

<!-- more -->

> [Demo](https://shunnien.github.io/JavaScript30day/day_26/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

先製作強調的外框 **DOM** 與下拉選單的內容，利用 **CSS** 中的 **opacity** 與 **display** 來隱藏，之後透過 **JS** 在移動至選單標題時，進行外框大小的變化與 **CSS** 的顯示

## 步驟 1.

取的所有標題元素，並建立移動到元素上與離開的觸發事件

``` js
const triggers = document.querySelectorAll('.cool > li');

/**
 * 移動到元素上的觸發事件
 */
function handleEnter() {
}

/**
 * 離開元素的觸發事件
 */
function handleLeave() {
}

// 移動到元素上的觸發事件
triggers.forEach(trigger => trigger.addEventListener('mouseenter',handleEnter));
// 離開元素的觸發事件
triggers.forEach(trigger => trigger.addEventListener('mouseleave',handleLeave));
```

## 步驟 2.

透過 CSS 操作顯示與隱藏

``` js
/**
 * 移動到元素上的觸發事件
 */
function handleEnter() {
    this.classList.add('trigger-enter');
    background.classList.add('open');

    // 內容最後顯示
    this.classList.add('trigger-enter-active');
}

/**
 * 離開元素的觸發事件
 */
function handleLeave() {
    this.classList.remove('trigger-enter','trigger-enter-active');
    background.classList.remove('open');
}

```

## 步驟 3.

調整箭頭指向框位置與大小，使其符合下拉選單的內容

``` js
// 指向框元素
const background = document.querySelector('.dropdownBackground');
// 取得指向框的位置
const backgroundCoords = background.getBoundingClientRect();

/**
 * 移動到元素上的觸發事件
 */
function handleEnter() {
    this.classList.add('trigger-enter');
    background.classList.add('open');

    // 取得下拉選單內容 DOM
    const dropdown = this.querySelector('.dropdown');
    // 取得位置資料
    const dropCoords = dropdown.getBoundingClientRect();

    // 設定指向框大小為下拉選單大小
    background.style.width = `${dropCoords.width}px`;
    background.style.height = `${dropCoords.height}px`;
    // 使用 setProperty
    // background.style.setProperty('width', `${dropCoords.width}px`);
    // background.style.setProperty('height', `${dropCoords.height}px`);

    // 移動指向框
    background.style.transform = `translate(${dropCoords.left - backgroundCoords.left}px,${dropCoords.top - backgroundCoords.top}px)`;
    // 使用 setProperty
    // background.style.setProperty('transform', `translate(${dropCoords.left - backgroundCoords.left}px,${dropCoords.top - backgroundCoords.top}px)`);
    
    // 調整內容最後顯示
    this.classList.add('trigger-enter-active');
}
```

# 筆記與備註事項

## JavaScript 部分

### [mouseenter][1]

當滑鼠移動到元素上的時候觸發；類似 **mouseover** ，其差異點在於 **mouseenter** 不會冒泡。

### [mouseleave][2]

當滑鼠離開元素的時候觸發；類似 **mouseout** ，其差異點在於 **mouseleave** 不會冒泡。

### [getBoundingClientRect][4]

取得元素的位置各項資料

### [setProperty][5]

設定 **CSS** 樣式

## CSS 部分

### [will-change][3]

為**實驗性功能**，簡單說就是當某個 css 需要

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter
[2]: https://developer.mozilla.org/en-US/docs/Web/Events/mouseleave
[3]: https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
[5]: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty