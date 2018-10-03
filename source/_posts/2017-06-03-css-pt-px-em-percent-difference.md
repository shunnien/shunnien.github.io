title: CSS 字型大小 pt、px、em 說明
categories:
  - 程式技術筆記
tags:
  - CSS
description: CSS 字型大小 pt、px、em 說明
toc: false
date: 2017-06-03 14:03:18
---

## Introduction
紀錄 [CSS Unit][1] 的說明。

## Conetent
以下列出 **pt**、**px**、**em** 在 CSS 樣式中的單位說明
- [**pt**(point)][3]
> 一般印列用字體尺寸，網頁一般不推薦使用
> 絕對長度單位。點（Point）。
> 1in = 2.54cm = 25.4 mm = 72pt = 6pc ([引自CSS2.0手冊][6])

- **px**(pixel)
> 像素，相對長度單位。像素 px 是相對於顯示器屏幕分辨率而言的。 ([引自CSS2.0手冊][7])

- [**em**][4]
> 相對長度單位，類似百分比，相對於當前對象內文本的字體尺寸。如當前對行內文本的字體尺寸未被人為設置，則相對於瀏覽器的默認字體尺寸 ([引自CSS2.0手冊][8])。
> 1em = 100% = 12pt = 16px = 瀏覽器預設尺寸

{% jsfiddle fs5q8nfd result %}

## Reference
- [W3schools CSS Units][1]
- [W3C units][2]
- [px to em 換算表][5]
- [CSS 2.0 中文手冊][9]

[1]: https://www.w3schools.com/cssref/css_units.asp
[2]: https://www.w3.org/Style/Examples/007/units.en.html
[3]: https://zh.wikipedia.org/wiki/%E9%BB%9E_(%E5%8D%B0%E5%88%B7)
[4]: https://zh.wikipedia.org/wiki/Em_(%E5%AD%97%E4%BD%93%E6%8E%92%E5%8D%B0%E5%AD%A6)
[5]: http://pxtoem.com/ "px to em converter"
[6]: http://mirror.sars.tw/CSS_2/css20/u_pt.html "css2_pt"
[7]: http://mirror.sars.tw/CSS_2/css20/u_px.html "css2_px"
[8]: http://mirror.sars.tw/CSS_2/css20/u_em.html "css2_em"
[9]: http://mirror.sars.tw/CSS_2/