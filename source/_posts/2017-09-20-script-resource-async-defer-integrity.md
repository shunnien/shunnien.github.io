title: HTML 中 script 資源載入上的 async、defer、integrity
categories: 程式技術筆記
tags:
  - Html
toc: false
date: 2017-09-20 14:47:41
description:
---

HTML 中，在載入 JavaScript 時候，都知道使用 `<script>` 來進行載入，但是當資料使用 [**CDN**][4] 或是其他外部載入的時候，常會看到一些額外屬性設定，此篇紀錄一下 **async** 、**defer**、**integrity** 這三個屬性。<!-- more -->

會說到資源載入，必須先了解到網頁頁面的生命週期，以下是瀏覽器取的網頁文件檔後的主流程
{% blockquote 資料來源 http://taligarsiel.com/Projects/howbrowserswork1.htm#Rendering_engines howBrowserWork %}
![Webkit main flow](http://taligarsiel.com/Projects/webkitflow.png)
![Mozilla's Gecko rendering engine main flow](http://taligarsiel.com/Projects/image008.jpg)
{% endblockquote %}

上述的流程還可以解析更詳細的資料，不過此篇的主題不是這個，想了解更詳細的內容可以參考 [JavaScript.Info Page lifecycle][5] 或是 [How browsers work][6]

- **async**
使用非同步方式執行，使用布林值設定

- **defer**
使用布林值設定，在 HTML　文件解析後，DOMContentLoaded　觸發前執行

- **[integrity][7]**
檢驗載入的 script 是否經過第三方竄改

這些屬性在各瀏覽器中的相容性請參考[此處][8]

## 參考資料
- [MDN HTML script][3]
- [JavaScript.Info Page lifecycle][5]
- [How browsers work Render_tree_construction][6]
- [Browser compatibility][8]

[1]: https://blog.mozilla.com.tw/posts/8023/subresource-integrity
[2]: https://blog.camel2243.com/2016/05/22/html-script-%E8%B3%87%E6%BA%90%E8%BC%89%E5%85%A5%EF%BC%8Casync%E3%80%81defer-%E8%88%87-integrity/
[3]: https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/script
[4]: https://zh.wikipedia.org/zh-tw/%E5%85%A7%E5%AE%B9%E5%82%B3%E9%81%9E%E7%B6%B2%E8%B7%AF
[5]: https://javascript.info/onload-ondomcontentloaded
[6]: http://taligarsiel.com/Projects/howbrowserswork1.htm#Render_tree_construction
[7]: https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
[8]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#Browser_compatibility