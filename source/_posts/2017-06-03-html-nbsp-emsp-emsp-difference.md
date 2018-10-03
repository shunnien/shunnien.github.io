title: HTML字元符號 &nbsp; &ensp; &emsp; 的差異
categories: [程式技術筆記]
tags:
  - Html
  - notes
description: HTML字元符號 &nbsp; &ensp; &emsp; 介紹
toc: false
date: 2017-06-03 11:40:58
---

## Introduction
在進行一些 HTML 頁面中文對齊時，很常使用一些空格符號來調整，這邊來把幾個詳細的符號介紹與紀錄。

## Conetent
以下條列說明這幾個空白符的定義。
- **[&amp;nbsp;][3]**
> 半形的不換行空格，就是一般鍵盤上的[空白鍵(space key)][2]產生的空格
- **&amp;ensp;** 
> 半形的空格，特性為**寬度是 1/2 個中文字寬度**
- **&amp;emsp;**
> 全形的空格，特性係**寬度是 1 個中文字寬度**

以下列出幾個比較常用的字符對應表

|Result|Description|Entity Name|Entity Number|
|:--- |:--- |:--- |:--- |
|non-breaking|space|&amp;nbsp;|&amp;#160;|
|<|less than|&amp;lt;|&amp;#60;|
|>|greater than|&amp;gt;|&amp;#62;|
|&amp;|ampersand|&amp;amp;|&amp;#38;|
|"|double quotation mark|&amp;quot;|&amp;#34;|
|'|single quotation mark (apostrophe)|&amp;apos;|&amp;#39;|
|¢|cent|&amp;cent;|&amp;#162;|
|£|pound|&amp;pound;|&amp;#163;|
|¥|yen|&amp;yen;|&amp;#165;|
|€|euro|&amp;euro;|&amp;#8364;|
|©|copyright|&amp;copy;|&amp;#169;|
|®|registered trademark|&amp;reg;|&amp;#174;|

在 HTML 中，可以使用 **Entity Name** 或是 **Entity Number** 來顯示特定的字元符號，但是直接使用這些表達方式，在某些設備讀取時，可能會影響正常閱讀，這時可以考慮使用 **CSS** 的 **[content][5]** 來調整，注意 **[content][5]** 內容設定字元符**必須為 16 進制數字**
{% jsfiddle vsxb3hu2  html,css,result dark %}

## Reference
- [W3C Html Entities][1]
- [W3C Symbols](https://www.w3schools.com/html/html_symbols.asp)
- [Wiki non-breaking space][3]
- [MDN CSS content][5]

[1]: https://www.w3schools.com/html/html_entities.asp
[2]: https://zh.wikipedia.org/wiki/%E7%A9%BA%E6%A0%BC%E9%94%AE "space key"
[3]: https://en.wikipedia.org/wiki/Non-breaking_space "non-breaking space"
[4]: https://www.w3schools.com/charsets/ref_html_entities_e.asp
[5]: https://developer.mozilla.org/zh-TW/docs/Web/CSS/content