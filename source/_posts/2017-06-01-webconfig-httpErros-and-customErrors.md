title: HttpErros 與 CustomErrors 的自訂導向
categories: [程式技術筆記]
tags:
  - Asp.net
  - IIS
description: 自訂頁面導向的 Config 設定
toc: false
date: 2017-06-01 14:50:53
---

## Introduction
自訂 .Net WebSite 的錯誤頁面導向。

## Conetent
以下分別說明 **HttpErrors** 與 **CustomErros** ，這兩個差別在於
- HttpErrors
> 存取靜態檔案（如.js、.html、.css、.jpg…）發生錯誤，會依照此設定執行

- CustomErros
> 由 **.Net** 程式發生的錯誤（例如：.aspx、.ashx、MVC 路由），才會在 CustomError 的設定執行

### HttpErrors

**errorMode** 非必要屬性，預設為 DetailedLocalOnly
- DetailedLocalOnly
> 本機端顯示詳細錯誤訊息，非本機端顯示自訂錯誤頁面
> 不想輸入 **DetailedLocalOnly** 文字的話，可以輸入代碼，其代碼為 0
- Custom
> 不管本機端或是遠端客戶，皆顯示自訂錯誤頁面。
> 其代碼為 1
- Detailed
> 全部都顯示詳細錯誤訊息
> 其代碼為 2

以下是我的設定
``` xml
<system.webServer>
    <httpErrors errorMode="DetailedLocalOnly" existingResponse="Replace" defaultResponseMode="ExecuteURL">
        <remove statusCode="404" subStatusCode="-1" />
        <remove statusCode="500" subStatusCode="-1" />
        <error statusCode="404" path="404.html" responseMode="File" />
        <error statusCode="500" path="500.html" responseMode="File" />
    </httpErrors>
</system.webServer>
```
顯示畫面
![HttpError](https://lh3.googleusercontent.com/3UAhlh_IHa2JYbE3h7YFxbtHUW5y-yoSYcMhMASaLYRxjCmi6jtO0JcF4lnfUCTk5oDR0-E3-9ChqrTTwrHy1E7NePuQ0hb59ndmrXf5vVZR8C3mTqiSk6qqAIYz83L5Kc5S1PD5O44SmhhZoy7WuncsnejbdCjdmT4-GeseU7EdA5rchkTRq91s1FPFlu9o-OhNhjf23CJoaq8VL6HDvJmqF86IvMJlY6DfvUk3sDnjTSAYkE0SBgWc1DePxOYdYEvFxBO4Vad6UK-jFP232xbmvn9xbxBe9BQWmykr9hd-EsZrpB1MfoHbX9bEHMRN8-H7c7hFic-XSdqpuEt8km1qasGZfLQIf78XfkOrzAn1-oGIi71g_mKI6M1BbySH8wEnIMBkNdu0IVJJPafFVzVBGHjw8UAVQ_JoBUgvQA8YZ9ftXx_CF7ScvUxBvpavIpdAZcDbf5oM1nqmZ0MLP1QcscCvXmo5bgatTzxr0X8pyiXbz-e4Jy2btFQQ-gdKMjbxJrh9eLtZj3AiUCKqarY4Cerq11k0UgQYkg8sor9tghqp4-iwU7OnkkoemD5jsRV3KmTBVNWRlej10Z0C0HaUJ_9XxrZD1pZLj0Aq8hOIXsEcECKFgiGR1t611KYnO9x2XGhhjfxdZi6scz6-Ooi7kwiO3g2Emj5MzCn4Ig=w603-h582-no)

### CustomErrors
可以參考 [MSDN][1] 上的說明。
**mode** 必要屬性，有三種設定，預設為 RemoteOnly
- Off
> 等於不使用，錯誤訊息都會直接顯示。
- On
> 包含本機與 Client 端，都會收到自訂的顯示頁面
- RemoteOnly
> 非本機端才會收到自訂的顯示頁面

**redirectMode** 決定當自訂錯誤頁面顯示時要如何處理原始要求的 URL
- ResponseRedirect
> 指定導向瀏覽器的 URL 必須不同於原始的 Web 要求 URL。
> 簡單說就是設定重新導向的位置。
- ResponseRewrite
> 指定導向瀏覽器的 URL 必須是原始的 Web 要求 URL。
> 這動作是把發生錯的輸出，按照設定的自訂內容複寫。

我的範例寫法
``` xml
<system.web>
    <customErrors mode="RemoteOnly" defaultRedirect="~/error.aspx" redirectMode="ResponseRedirect" >
        <error statusCode="404" redirect="404Test.html" />
        <error statusCode="500" redirect="500.html" />
    </customErrors>
</system.web>
```
示範畫面，故意輸入以下位置，讓路徑錯誤，接著按照我的設定，畫面將會跳轉到設定好的畫面與路徑。
``` text
localhost:1900/abcd
```

![customError](https://lh3.googleusercontent.com/0ZF03b2iMvn7yD-BU0FtY6a6mVNkus54rRpncZj9m6FLiKvW2dGqAWMyPZheeMGCGqJ0US_VLCZQWsDkU2tpRZXOEHdU1FvVf6DY4mCVl2v7iv7DasiHZcd6oGZOqSHfi77_jkbPUrBzSdplg4UTZQj1C1qMI5P673u79qPy3Idb0_PnuQx5jr5WKNnfQOHoX4xnnyqr7236VfJNYyo4aid_yOxcFTvniL2FbVTUdTxy_BpVqlP6qpC3Qmqc0RZJFlfN7cSyIisukw7SdEVerPD8XbKn12G1df8rKbvKMzU77pq-slyft3cFhNfJBKdgBr7KKlH7l-fDs3sWek3OC7Qg9PrZwh6XrtJ1dASpCRd2TlicGzIt8Mz5AY7rKM-X0QJWC8V82trhS26SjHrna4wu-BeRH9xBt2T5iMjvw-lGQqcnUTQ5OWcqmgNFV2i7lnsFUPzCiC9OVhCBasu4yCj5hgg_PauPPIVD1nuiz5bvmz7xfvKuSMEYx8b70bQIENlmNqVfiveRBz0Nz7oYMZWFO393tFETw7c5dDDqbcPV2nM8xfOVpWNJ_2iSFzG_T_4VUT9qSN8Gv9-8GIaHi3fxTZtmrDlL5wxcf-3S0QvAIx0Q7LtGxh3YNSkliqHYpgbzigQ24-TsAAjuwUJ6HhFFRrFn3LLMFl5cFKRdvw=w634-h637-no)

## Reference
- [HttpErrors][2]
- [MSDN CustomErrors][1]
- [DarkThread customErrors and httpErrors][3]

[1]: https://msdn.microsoft.com/zh-tw/library/h0hfz6fc(v=vs.110).aspx
[2]: https://www.iis.net/configreference/system.webserver/httperrors
[3]: http://blog.darkthread.net/post-2015-11-10-customerrors-and-httperrors.aspx