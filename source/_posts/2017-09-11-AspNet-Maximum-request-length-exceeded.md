title: AspNet 突破網站最大檔案設定
categories: 程式技術筆記
tags:
  - IIS
toc: false
date: 2017-09-11 08:40:39
description:
---

網站上傳檔案是很常見的需求，IIS 預設上傳檔案是 **4 MB** 大小，最大檔案限制是 **2 GB**，要讓上傳檔案超過 **4 MB** 大小，可以透過 **config** 設定，讓 IIS 來處理就可以達成。
<!-- more -->

主要設定是在 **httpRuntime** 進行設定，其設定屬性說明如下
- maxRequestLength
計算單位是 **kilobytes** ，所以 1 MB 是 1024 kilobytes
- enableVersionHeader
ASP.NET 是否應該輸出版本標頭
- executionTimeout
 ASP.NET 可執行的時間長度，以秒數為單位

``` xml
<configuration>
    <system.web>
        <!-- 300 秒可執行時間長度，檔案限制 5 MB -->
        <httpRuntime enableVersionHeader="False" executionTimeout="300" maxRequestLength="5120" />
    </system.web>
</configuration>
```
但是假如是 **IIS 7** 版本以上(包含 IIS 7)，需要再添加如下的設定

- maxAllowedContentLength
計算單位是 **bytes** ，所以 1 MB 是 1048576 bytes

``` xml
 <system.webServer>
   <security>
      <requestFiltering>
         <!-- 檔案限制 5 MB -->
         <requestLimits maxAllowedContentLength="5242880" />
      </requestFiltering>
   </security>
 </system.webServer>
```

## 參考資料
- [MSDN httpRuntime][3]
- [MSDN Request Limits][4]

## 延伸資料
- [91 超出檔案大小，導致特定頁面][2]

[1]: https://stackoverflow.com/questions/3853767/maximum-request-length-exceeded
[2]: https://dotblogs.com.tw/hatelove/archive/2010/01/14/fileuploadmaxrequestlengthtocustomerrorpage.aspx
[3]: https://msdn.microsoft.com/zh-tw/library/e1f13641(v=vs.71).aspx
[4]: https://docs.microsoft.com/en-us/iis/configuration/system.webserver/security/requestfiltering/requestlimits/