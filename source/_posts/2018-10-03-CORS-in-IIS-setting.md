---
title: IIS 的 CORS 設定
categories: 程式技術筆記
tags:
  - IIS
toc: false
date: 2018-10-03 22:41:50
---

# IIS 的 CORS 設定

說明在 IIS 設如何設定 [CORS][1]<!-- more -->

## 內文

在 IIS 中，透過 **web.config** 直接設定 **header** ，針對 **header** 添加 **Access-Control-Allow-Origin** 此屬性即可，但是此種設定只能針對一組 Domain 設定，或是全開放；設定範例如下：

``` xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
 <system.webServer>
   <httpProtocol>
     <customHeaders>
        <!-- 全部開放 -->
        <!-- <add name="Access-Control-Allow-Origin" value="*" /> -->

        <!-- 指定一個Domain -->
        <add name="Access-Control-Allow-Origin" value="http://localhost:21259"/>
     </customHeaders>
   </httpProtocol>
 </system.webServer>
</configuration>
```

另一種則是為 **IIS** 安裝 [cors][4] 模組，其設定變得更方便，[官方文件][3]

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <cors enabled="true" failUnlistedOrigins="true">
            <add origin="*" />
            <add origin="https://*.microsoft.com"
                 allowCredentials="true"
                 maxAge="120"> 
                <allowHeaders allowAllRequestedHeaders="true">
                    <add header="header1" />
                    <add header="header2" />
                </allowHeaders>
                <allowMethods>
                     <add method="DELETE" />
                </allowMethods>
                <exposeHeaders>
                    <add header="header1" />
                    <add header="header2" />
                </exposeHeaders>
            </add>
            <add origin="http://*" allowed="false" />
        </cors>
    </system.webServer>
</configuration>
```

## 參考資料

- [MDN CORS][1]
- [Enable CORS IIS][2]
- [microsoft cors module][3]
- [IIS CORS Module Download][4]
- topcat [xdomain.js 多組(Multiple) 跨 Domain][5] 另一作法

[1]: https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS
[2]: https://enable-cors.org/server_iis7.html
[3]: https://docs.microsoft.com/en-us/iis/extensions/cors-module/cors-module-configuration-reference
[4]: https://www.iis.net/downloads/microsoft/iis-cors-module
[5]: https://dotblogs.com.tw/topcat/archive/2014/01/21/141979.aspx