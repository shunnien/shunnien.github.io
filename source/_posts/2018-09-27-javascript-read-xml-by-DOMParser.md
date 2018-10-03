---
title: JavaScript 透過 DOMParser 讀取 XML
categories: 程式技術筆記
tags:
  - JavaScript
toc: false
date: 2018-09-27 04:17:39
---

# [DOMParser][1]

在前端讀取 XML 的 response 已經是字串了，再透過 [DOMParser][1] 來解析 XML ，使 XML 內容好取得。<!-- more -->如果 response 指定 XML 格式，就直接已經讀取 XML 檔案，可以直接操作

## [DOMParser][1] 轉換 XML 字串

主要關鍵在於使用 [DOMParser][1] 轉換字串

``` js
var text, parser, xmlDoc;

text = "<bookstore><book>" +
"<title>Everyday Italian</title>" +
"<author>Giada De Laurentiis</author>" +
"<year>2005</year>" +
"</book></bookstore>";

parser = new DOMParser();
xmlDoc = parser.parseFromString(text,"text/xml");
var title = xmlDoc.getElementsByTagName("title")[0].textContent;
```

{% jsfiddle 1w86ofyz html,js,result dark %}

## 參考資料

- [MDN DOMParser][1]
- [國土測繪中心][4]
- [國土測繪中心 WMTS][3]

[1]: https://developer.mozilla.org/zh-TW/docs/Web/API/DOMParser
[2]: https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started
[3]: http://maps.nlsc.gov.tw/S09SOA/
[4]: https://maps.nlsc.gov.tw/