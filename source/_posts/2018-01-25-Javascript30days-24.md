title: JS30紀錄 24-Sticky Nav
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-01-25 15:21:36
---

# 目標

利用 **CSS** 來讓製作網站的置頂選單
![target](https://lh3.googleusercontent.com/Pte9EiISlwwpUNbj-iwvX-5Yt54-iInDeQaE5DYPvRrVgmRmdUmejPnc5WvsvYQNPCXzFlrhvGV5eSIZO54oakJj3vSebFu0XkD6dm9zQYaxJUdsLLr4qcsubF6INZq9JS1BSdcap16TkqSRo8DJ3_RoznjxD3adHbQ326t-oQHXYc5wC9Z76jbQrTA2w4DjJnh-5doHcJ52FIHY08ZZ8VlCcBjvqB0JsCdoQ3eu9dYOciPBi-UHy645yuq8tT5M58M1PVLEPhikpZQoymlbVVZgyvY1z38ebbCrjePf0pewTFlzJkO3w_8mpqFyW2TkfhlELc1_l-Mzv_7J3McwatM2fMDeyNWPvX_wv9qTBXaIzq3BHDq984q1pkivjvPJoyq_k8OBUtdPGe7sdlO4MgWV-RNZxFbliRrNy5ytAibhL-Atujw5Y1cH4_usyvjQW4iOL-xeDcvpo1UA7waBI6FN_cTdleQNvtu-DmJ-t9X3d289AW0kk6GYPZmHrjRICuhBR7NGis-wKR9LlYdUZZNh5WKHL3hI1A7RmFtikmLxF-iDMM7wBGFEvmqeIFz605p102cAoD2DWFTWeI_U_MOmOeyxl2c_n1_S27cRbEYM7vdwfGiEbp_U9EQECmqIw5D0zMigE3fsB2Py9QjHIzOv1GNyqPjv=w919-h510-no)
<!-- more -->
> [Demo](https://shunnien.github.io/JavaScript30day/day_24/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

利用 CSS 的 **position** 固定後，再使用 **transform** 來強調凸顯內容，撰寫一部分 JS ，調整內容的位置。

## 步驟 1.

建立卷軸移動觸發事件

``` js
const nav = document.querySelector("#main");

// 取得選單 top
let topOfNav = nav.offsetTop;

// 修正選單
function fixNav() {
}

// 建立卷軸移動事件
window.addEventListener("scroll", fixNav);
```

## 步驟 2.

建立固定標題列的 **CSS** 

``` css
* 固定標題 */
body.fixed-nav nav {
  position: fixed;
  box-shadow:0 5px 0 rgba(0,0,0,0.1);
}
```

然後在 **fixNav** 中，判斷卷軸移動位置，動態增加樣式

``` js
// 修正選單
function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.classList.add("fixed-nav");
  } else {
    document.body.classList.remove("fixed-nav");
  }
}
```

## 步驟 3.

增加標題列的 **logo** 樣式，並讓標題列置頂時顯示，並調整內文的文字大小

``` css
/* 顯示標題 logo */
.fixed-nav li.logo {
  max-width:500px;
}

/* 內容比例調整為原本文字大小 */
body.fixed-nav .site-wrap {
  transform: scale(1);
}
```

增加內文 padding 避免內文因為凍結標題列而被遮蔽

``` js
// 修正選單
function fixNav() {
  if (window.scrollY >= topOfNav) {

    // 增加內文 padding 避免內文因為凍結標題列而被遮蔽
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add("fixed-nav");
    
  } else {
    document.body.classList.remove("fixed-nav");
    document.body.style.paddingTop = 0;
  }
}
```

# 筆記與備註事項

## CSS 部分

### [position][1]

{% note info %}
CSS position属性用于指定一个元素在文档中的定位方式。top，right，bottom 和 left 属性则决定了该元素的最终位置。

### 定位类型

- 定位元素（positioned element）是其计算后位置属性为 relative, absolute, fixed 或 sticky 的一个元素。
- 相对定位元素（relatively positioned element）是计算后位置属性为 relative 的元素。
- 绝对定位元素（absolutely positioned element）是计算后位置属性为 absolute 或 fixed 的元素。
- 粘性定位元素（stickily positioned element）是计算后位置属性为 sticky 的元素。

**資料來源** - [*MDN*](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)
{% endnote %}

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/position
[2]: https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetHeight