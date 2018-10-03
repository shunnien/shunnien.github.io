title: IE 相容性設定
categories: 程式技術筆記
tags:
  - IE
toc: false
date: 2017-09-20 09:28:22
description:
---

雖然現在很多網站已經漸漸淘汰一些舊版本的 IE 了，但是幾個月前同事的 IE 還是發生這問題，其原因還是該同事的瀏覽器有調整一些個人設定，所以仔細思考還是應該仔細針對 IE 版本設定好相容性。<!-- more -->

IE 的文件模式依照官方說法有三種
- Standard Mode
支援最新HTLM5/CSS3/SVG等標準，不過不同版本IE支持程度不同，而且 IE 現在也沒有更新
- Quirks Mode
力求相容較早版本瀏覽器的行為
- Almost-Standards Mode（準標準模式） 
支援最新標準，但保有先前版本的圖形渲染行為

三種模式的官方說明如下：
{% blockquote 資料來源 https://msdn.microsoft.com/zh-tw/library/cc288325(v=vs.85).aspx Defining document compatibility %}
All versions of Internet Explorer released after Internet Explorer 6 support up to three document modes:
- Standards mode provides the greatest support for the latest standards, such as HTML5, CSS3, SVG, and others. This is the preferred mode for new public websites.
- Quirks mode emphasizes compatibility over standards compliance by supporting behavior found in earlier versions of Internet Explorer.
- Almost-standards mode supports APIs defined by the latest standards while honoring graphic rendering behavior found in earlier browsers.
{% endblockquote %}

了解文件模式後，就可以透過切換不同文件模式來相容
## 修改每個 HTML 頁面
下列 HTML 中繼標籤放到各網頁的 **HEAD** 項目中 ( 在 TITLE 或 META 之外的標籤前面 )，這會告知 Windows Internet Explorer 以 Windows Internet Explorer 7 的方式呈現網頁
``` html
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7"/>
```
- 強制瀏覽器呈現為特定的版本的標準
`<meta http-equiv="X-UA-Compatible" content="IE=11"/>`
- 逗號分隔多個版本，瀏覽器自動挑選其能夠使用的最高版本，如：使用 IE 10 瀏覽就會自動挑選 IE 10
`<meta http-equiv="X-UA-Compatible" content="IE=9,IE=10,IE=11"/>`
- 強制瀏覽器呈現舊版本 IE 的相容
`<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7"/>`
- 強制瀏覽器呈現當前瀏覽器的最高版本
`<meta http-equiv="X-UA-Compatible" content="IE=edge"/>`
- 用分號分開，它設定為不同版本的兼容級別，IE7、IE9。允許不同層次的向後兼容性：
`<meta http-equiv="X-UA-Compatible" content="IE=7; IE-9"/>`

## 修改 IIS 設定
在針對站台的 **HTTP 回應標頭**新增 HTTP 標頭名稱為 **X-UA-Compatible** ，並且設定值即可完成全站設定。
``` xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
   <system.webServer>
      <httpProtocol>
         <customHeaders>
            <clear />
            <add name="X-UA-Compatible" value="IE=EmulateIE7" />
         </customHeaders>
      </httpProtocol>
   </system.webServer>
</configuration>
```
## 參考資料
- [MSDN X-UA-Compatible][1]
- [MSDN Defining document compatibility][3]
- [Darkthread 搞懂X-UA-Compatible IE相容設定][2]

[1]: https://msdn.microsoft.com/zh-tw/library/cc817570.aspx
[2]: http://blog.darkthread.net/post-2016-05-26-x-ua-compatible-setting.aspx
[3]: https://msdn.microsoft.com/zh-tw/library/cc288325(v=vs.85).aspx