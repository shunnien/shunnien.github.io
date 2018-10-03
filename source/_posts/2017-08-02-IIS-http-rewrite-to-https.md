title: 在 IIS 中設定網站自動轉換 HTTPS
categories: 程式技術筆記
tags:
  - IIS
toc: false
date: 2017-08-02 21:30:58
description:
---

政府今年開始慢慢全面導入 HTTPS 安全連線了，因此這設定很常使用到，將這設定紀錄在此，方便一些朋友查看。<!-- more -->

以下這方式是透過 IIS 伺服器的 **[URL Rewrite][2]** 來導向的，因此需要再 IIS 上擴充這模組，然後按照以下的 **web.config** 內容去修改，詳細的參數說明可以參照 [**Microsoft**][3] 說明

``` xml
<system.webServer>
    <rewrite>
        <rules>
            <rule name="HTTP to HTTPS redirect" stopProcessing="true">
                <match url="(.*)" />
                <conditions>
                    <!--限制處理網址 避免 http header 攻擊 -->
                    <add input="{HTTP_HOST}" pattern="(\.com\.tw|\.gov\.tw)$" />
                    <!--已經是 https 的不用處理 -->
                    <add input="{HTTPS}" pattern="off" ignoreCase="true" />
                </conditions>
                <action type="Redirect" redirectType="Found" url="https://{HTTP_HOST}/{R:1}"/>
            </rule>
        </rules>
    </rewrite>
</system.webServer>
```

這設定方式只要是 IIS 應該都是一樣的，不管是雲端平台還是自己架設的伺服器都是如此喔。


[1]: https://blog.miniasp.com/post/2014/06/04/Redirect-to-HTTPS-from-HTTP-using-IIS-URL-Rewrite.aspx
[2]: https://www.iis.net/downloads/microsoft/url-rewrite
[3]: https://docs.microsoft.com/en-us/iis/extensions/url-rewrite-module/url-rewrite-module-configuration-reference