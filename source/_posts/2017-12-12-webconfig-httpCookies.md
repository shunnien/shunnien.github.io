title: web.config 的 httpCookies
categories: 程式技術筆記
tags:
  - IIS
  - Asp.net
toc: false
date: 2017-12-12 20:57:17
---


``` xml
<httpCookies domain="String"
             httpOnlyCookies="true|false"
             requireSSL="true|false" />
```

- httpOnlyCookies 屬性
 是 Cookie 只供瀏覽器與 WebServer 之間溝通使用，不允許 JavaScript 存取 Cookie (document.cookie)。
- requireSSL 屬性
 需要使用 SSL 才能傳送 cookie 資料。
<!-- more -->

以上情境在測試時，因為不一定使用 SSL ，所以可能會發生頁面錯誤等情形，可以利用多重組態來切換；另外由於 **Identity** 也是利用 **cookies** 來操作，所以當測試機**不使用 SSL** 時，記得將 __requireSSL__ 設定為 __false__


## 參考資料
- [MSDN][1]

[1]: https://msdn.microsoft.com/en-us/library/ms228262%28v=vs.100%29.aspx?f=255&MSPPError=-2147217396