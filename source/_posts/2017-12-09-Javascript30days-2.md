title: JS30紀錄 02-JS + CSS Clock
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2017-12-09 08:02:19
---


![target fit](https://lh3.googleusercontent.com/wJKM6jsDyoZJwvIaCKGchRh4dEkc5nB7p_KBRwT7iO07PYQJ3hkusIK5uEG9PQdsXlMsI8IRlSpkIDZb3mtm1C1aZIowT95dyJiZc_-j-vXewycFeO6JyGrWmWZ96wuSTP7_CB_VLxikAVSfOHFMisP73Eue2FZptmG5ptEivbtVzCAKnTru-eO-5Zika5OW3p6REBQr1T97UaLUiu1M37SfRMmZvT8xsvgKsma4-2kQk1ZXFujJvySk1BBZONtJTEi_rkxDBehZvF8eWCqPzGYIIs1he2cl-HbbhBkCjSF24LK56P4Ce8R7u2q5szofuNCTnUoUH_MzuotshFtXmoizu9KT4d3B1ezUes9jxhywYhp15OqhUvAGBBEN2x1CPXjJ4OVzN1AKSCniF5Fjo4VEmyaDNV1UN7dANuLif845Cho2wLgri6uqXWRERam7yokrQgiLGOASvsoY3WN9ZbL7dszm12NQkN57VX01d_3XJwP6Ug5ldj0Irif93HmTCMq8X7_PnuvkSNkaj0Bxn-BM7PPFmEoJH8cqlit1zpB7Mf13rAFxc45aiT0NXm1wl__znFFx5a3WTbGIMxVAMqdJvmD4yV6w-4mR_xje6rOJE9qpu_JiqV9ygqyAEkHRB2RjXbQfR9BjdAJGw3o-0K_roHzQ0B3PFvI=w1040-h521-no)
使用 JS 和 CSS 建立時鐘<!--more-->

> [Demo](https://shunnien.github.io/JavaScript30day/day_02/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

## 步驟 1. 建立 HTML

- class clock 是圓時鐘容器
![div clock](https://lh3.googleusercontent.com/DCf6nT7DVs2Y3koYDEaZ15rAeGp1Z8Umgqs-ahdwKi47snSLQBLazPo96aQi0DRXEEzqlm5LWj0YiFLViJ0MoOgI2SHGP6KFeXcmzNEw9U7wikEUA4rjR6ZP0JDBFg2sYEfGLWGJuO22u-kHG635PIbMhI8jIKYPsGI5a5NGCbiqVtGHRNtTOaasuqqwFsFWNeMDiZW4OeHI3H-T1aFaumtyqfytBsyEYm2ztNHRV9CwgY08jIOtCXECwefW4cllS7rMEXTTO9nmuodok11t1amVlGW2nfXbMrGxJ33pWEmYuK24q9qD3M05WCxARQkcu_XmsgE0k6jJt900kkCpILrcSJwTAAt-eO6MXef0U4yDcpSlPmbBlMvCKwW6TBhtC0_9MTCIKUZTG7hTK0zkcE0DPAAfmC3_vZRWHLXWJ1uddNjvbrCgVJBDOpEry1VkgPAL3AhIQnbJV6Acf5yfcSkfoKSr8_6Ef9Bb-U-mIARrqYfGXPCjnxMYB-uXLx2L13bRARaQIOaPDNJDf6KiTsD5Kt4zjoKrSUtA8lCvOy0OOBdc8hlDon7oJHg2XrPUncV0fDR-75bXnzrbTwQj43Pdx-0PqDTYEDt8vhWhhV47u3U1jG1Dkfh2MQI_9CoLy-6y7gizTaLR8-cOSdeQ7fZ5yPC2tMUq8JI=w785-h707-no)
- class clock-face 是時鐘容納時針、分針、秒針的鐘面
![div clock-face](https://lh3.googleusercontent.com/3KAtmzw5c5R2bVt2YE5UJmCBmFeolBIir99vaJPuhgvjgzWysDDa7uasvqEbRlp0-laJ6q1MHQ6MT52VS_FLG7lowi5qvaRy2XDK6wm0oRjwWlOxFC9jzCKvcW7n84MY7UZarnu-TkA9zdoUK0kob-QcAmfG1D5s3wRBz_VkZ-dMwzBmWACbes7FZTPCiap7EvskQpAadLOdBHhYSGlqA5v2pCtIiEuYg8yK3UmzgFW63sxnVeA4hmr24ZurO2vW4Yy_1lmS8sDZRPrPDmaZFtY2eZJSi06e9bCIOg8b_y_aKJ0ILZKeAQ9MhfLNxinMUUFFMlDD84ZTZdKHSn8BM3ihBrlNRUfctfESzvucdE_kDarh8bM10U-d0eUbBdkVUBxjbQ2l_txdcWT7hmZ9EzXhZJ7WR6NOjLFTafeYEa8tN6pTtSLZY0qP6PIQNxaIGoxSJ79Lz24uKBc7fly4H6xJt6gDpt8hOU4l-vV9eIsx4RQsOX81HPV9syx6jJVSVqdK7EdNJUVA6CVSGZi4Yrwwm-AXsolrpAbeYR0TKAbZzZvVCWF1uQqQBiWnAG0oroMOG88gL9LdRy7YAL7fTYFn2_DA4pYijaV5pPM-qkK2nWA5oqfEvcgGbzJNU3xe-Qs3HxRckVCsHcXHMVk2x26_vx7z3vSDiBI=w534-h564-no)
- 建立三個 div 各自代表時針、分針、秒針

## 步驟 2. 調整時針、分針、秒針的 css

- 設定三針旋轉的中心 transform-origin
- 透過 transform 調整三針的位置， `rotate(90deg);` ，因為一開始是水平線，所以需要調整到 12 點鐘方向要加上 90 度
- 設定三針走動的晃動特效 transition

## 步驟 3. 設定時間

- 建立 **setDate** function
- 透過 [**setInterval**][5] 每秒鐘執行 setDate

# 學習事項

時鐘的 JS 並無太多的運用，僅需要簡單的角度計算，所以這次學到的大都是 CSS 部分。

## CSS 部分

## [transform-origin][1]

{% blockquote 資料來源 https://wcc723.github.io/css/2013/10/10/css-transform-origin/  %}
transform 的起始點，一般來說變形的起始點都在物件的中心點，但如果需要像時鐘的分秒針一樣，中心點並不在物件的中心，就需要靠 **transform-origin** 去設定物件變形的起始點。

基準點是從左上開始，從水平開始往右稱為 **x 軸**，垂直往下稱為 **y 軸**， CSS 在編寫習慣上也是先寫 x 軸 再寫 y 軸，如 `50px 100px`
{% endblockquote %}

``` css
div
{
transform-origin:20% 40%;

-ms-transform-origin:20% 40%; 		/* IE 9 */

-webkit-transform-origin:20% 40%;	/* Safari 和 Chrome */

-moz-transform-origin:20% 40%;		/* Firefox */

-o-transform-origin:20% 40%;		/* Opera */
}
```

## [transform: rotate][2]

變形的旋轉屬性。

``` css
.rotated {
  transform: rotate(45deg); /* Equal to rotateZ(45deg) */
}
```

## [transition][3]

[**transition**][4] 屬性是一個簡寫屬性，用於設置四個過渡屬性

- **transition-property** 設置過渡效果的 CSS 屬性的名稱
- **transition-duration** 定義動畫效果所花費的時間
- **transition-timing-function** 設定動畫效果時所依據的貝茲曲線
- **transition-delay** 定義多久之後開始發生動畫效果

## [transition-timing-function][6]

``` css
/* Keyword values */
transition-timing-function: ease;
transition-timing-function: ease-in;
transition-timing-function: ease-out;
transition-timing-function: ease-in-out;
transition-timing-function: linear;
transition-timing-function: step-start;
transition-timing-function: step-end;

/* Function values */
transition-timing-function: steps(4, end);
transition-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
transition-timing-function: frames(10);

/* Multiple timing functions */
transition-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1);

/* Global values */
transition-timing-function: inherit;
transition-timing-function: initial;
transition-timing-function: unset;
```

# 延伸部分

- 時分秒針，長度凸顯；
- 添加數字

利用 CSS 調整，簡單使用 width 完成長度。
數字的部分，可以直接在 clock 放上背景圖片來快速處理。

![extra part](https://lh3.googleusercontent.com/lQ0iqWgul8zpBfmdAREwakrFY6t8HFejXD4yHTjDOLK4SWByNUEZUTaHMG1fSBDuMELgppkRIETM-4xIMhRH5hmo_h4KLm6Tq2EhSK8vWn32zKQhsNdZ1vggqSfE8Z1SRcvr-DcRvYzAILGm-Zl0ipH76Mdan5kR_77mKG2gW875iJU6xkv2UMVjdl__0C2p4qdtu0bzckzYqyGzi_HaxVQz5Q7dlNjAi8zdgA0xbSNUuqzjxHzlg9zZ1hcUTKUWqvRHEhVbUdXkZIx0UUmGmyseQwyqELr64BxIYXUfGYvKOTGnfVONrlBmXUkxPtKH8r-Yz4ZqsnGHucUz1fc6gI5fu19CB8ZjkqGabX60uXJkhqA3IShiORevd1AD1-IVAWPHwL_ZJurb6VZDr-NyOFGNAW5NZAjddnIWiyb-HaFYHqqQreHeth9iKuBnl4kX6xDzEzOTL2HJ9dIMtA_jOU0ImePnrO3UQs3Qro9t5zEvijRNttKXeVTt-zdvdIgQOa3kdfjfuLTVxfRL5kLbY45213uUpFeVIUveokpoGJlIKLK0STHlpQoI_K76lPP-MOU_9XDX48XUC2fvPcSqnoyri9f7QncklTr94RptRwB2lVwCaQrxQ1m3_6cy8AXflPGb6MzZax-cmeSPxuG5jFDciqt95fEe6r0=w629-h510-no)

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/CSS/transform-origin
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate
[3]: https://developer.mozilla.org/zh-TW/docs/Web/CSS/transition
[4]: https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions
[5]: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setInterval
[6]: https://developer.mozilla.org/zh-TW/docs/Web/CSS/transition-timing-function