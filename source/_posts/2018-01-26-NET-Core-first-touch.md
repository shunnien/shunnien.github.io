title: .NET Core 入門筆記
categories: 程式技術筆記
tags:
  - notes
toc: false
date: 2018-01-26 11:16:45
---

紀錄 **Will 保哥** 的[**給 C# 開發人員的第一堂 .NET Core 入門**][1]的內容筆記，內容介紹詳細，從 .NET 介紹開始說明，
<!-- more -->

## .NET Framework 框架

{% note info %}
.NET Framework 大約在西元 2002 年推出 .NET 1.0 版，是一套由微軟主導的軟體開發平台，幫助開發人員可以更快的開發出各式各樣的應用程式，並且確保應用程式可以不受作業系統、CPU 架構等平台限制，在任意環境都可以正確執行。

微軟與其合作夥伴，共同訂製了 **Common Language Infrastructure (CLI) 共通語言基礎架構**，這是一份開放式的技術規範，讓所有符合 CLI 規範的應用程式，都能夠正常的運作在不同的電腦系統之中，而不用重新撰寫或編譯應用程式。
{% endnote %}

## .NET 可攜式類別庫 (PCL)

我們通常會將常用或是習慣使用的功能撰寫為 **Class Library** (類別庫)，使其產生組件 (Assembly) ，以利重複使用；但由於 **.NET Framework** 支援的平台時做太多，例如： .NET Framework  、.NET Core 、Mono 、Windows Phone ...，所以才出現 **PCL** ，不過現在除非還有需要使用 **Windows Phone** 與 **Silverlight** 這兩個平台，不然 PCL 已經不需要使用了，直接使用 **.NET Standard**

## .NET Core 2.0

**.NET Core** 就是微軟最新強調跨平台的的實作(雖然以前也推了一些，但是都不是真正跨平台)

{% note info %}
.NET Core 的組成包括

- 一個 **.NET** 執行階段 (**Runtime**)
提供型別系統、組件載入、記憶體回收機制、原生 Interop 及其他基本服務。

- 一組 Framework 函式庫 (**Framework Libraries**)
提供基礎資料型別 (primitive data types) 與一些好用的應用程式類別與工具類別。

- 一組 **SDK** 工具組及語言編譯器
提供軟體開發過程所需的基礎工具，此工具組可以透過 .NET Core SDK 取得。

- 一個 **dotnet** 主程式 ( **app host** ) 
它主要用來啟動與執行 .NET Core 應用程式 ( 例如你可以用 **dotnet ConsoleApp1.dll** 命令來啟動 .NET Core 應用程式 )，過程中它會自動選取正確的 Runtime，並將 Runtime 裝載到記憶體內，提供 DLL 組件的載入原則，然後啟動應用程式執行。

**.NET Core 並不是一套全新的框架，它是一份 .NET Framework 的跨平台實作。**

{% endnote %}

## .NET Standard 標準類別庫

**.NET Standard 標準類別庫** (簡稱 .NET Standard)，說穿了就是一種類別庫的類型；其實就是希望支援所有 .NET 平台能擁有一致的 BCL 基礎類別庫

{% note info %}
- .NET Standard 版本越新，代表你可以使用的 API 就越多
- .NET Standard 版本越舊，代表你可以支援的平台就越多 ( 相對的可使用的 API 就會減少 )

下表列出所有 .NET Standard 版本和支援的平台：
![.net standart version list](https://lh3.googleusercontent.com/3sFEa1vENTjm-7ElfomC92IUG6h2mMGR86tsiONMIATM90GN2DuiP4qYdbyJ7B-7m4jGk0eTHme_t2zfY4snZrBF0QJnvdSqVyzeb_x_vcez03zUN8-FTrYXbdmXR_sB3qtqqHMzwfJAzcM0wUuv2B3XprnxuGmSFRukk3E2Uh1XyfjBXK0YPGo9TI6dP0udSGlIBqWecj3pnDUPUStrQPXMMQa91N-IE6WPFkxP908hy7tw4uJrsgoBz9Bw4e7YQ1ADaSehXyORCqJSiVlOaV8M4YUaEUazsUtlXZUFBAYJfi_ZDPLtaoorLgWRa_cDic1T8iwckK__gJjrZbq6rf_jUx8JaunTO36dNoN5EmpO1HYb-Uf1_OqOyP4pzydZRkHCpYVo_ILMBpVwVHIzJEZuRXmcmKoVKkS8JuU3aewRGHkxDNkabDKb528cBXqo3Vfy_HsF-vbTuiEYxvc_AvCgTUga_iTVr84UHHJXt0ELGeF6m1a27Z9-v5Rg6Yp55R7SztZMqdEDhoQSP4vzXDfMW3TivkM2UYjNq-BEC7lHsyDqVkgyfNF56vW2uH45FaJcXN2xGMmNUClGLvqZhf2iW_-XK9QuLBo5JBRb13sDJwaMau0XvYo1FsXR3p5BHEALkGQJvq4W83nbduRDnlSPbcO_NE6v=w893-h605-no)

{% endnote %}

## 工具

### [.NET Portability Analyzer][16]

Visual Studio 2017 的擴充套件，檢查目前專案是否適合轉換為 .NET Core ，就是檢查是否有使用到不支援的 API
![setting](https://lh3.googleusercontent.com/1bfuhvDXrQX85bRB3z08ohsys60axwEL8sgWUL1UK-rodAqWy8A5IQltDIPxi_lX1JyRB0cDigR7ChZK08tweQDgEl6hHXWvsrYZ-Jm4KOwRVITWYWJvOSEGgG_pxiqmpAT5wb5Mliqrw4YkrN07NHJKkTbFR6oHHNbCk078J4fsvIcheSpjeDZj01709zkhSSl0ndQSqAItOLfioDhzKzG554hPNVJgX-axOa66i52IDif8xpxk7GcfGW4PuwC0cfzkA6GZYYUDRd2lFmhd3J2zlm6zArDjlgzYfc9Kw-Q_I-7ZmVJJploxp_vgPQx-Hgm32fwbmAuG-N5px52bOh7amLI6Wn3-W_9NcDcr7jvuH1k4e2puQ-Gg1w2tAw8Tg-MAyNmTx9hTQ0h5Nde9cffyd84az66dm-7zt1bL4VDXGSVr2Z10EXTTrRYzCTuX2uk5__zCdrSR181b53WJDEMmFzrIUl-viU6sHEUjzucLd9udZmuLY2_qbAOkXhYEFY4eqW5jy1aNRYwSt61zKPamM9c6KQtj-InWd_k1eVf41k5e_8KxcLbLizW_iL7Fh3U-14S86iSfbMk-TvZlzl5-uvuWNvTZaLSPiEXkntdEJ4RO-DyCM3ofEp3VSN2tu4cyDD-VfUxsZPJ_T4d_L_X_62YNnkgX=w874-h647-no)

使用方式相當簡單，只要在 **solution explore** 中，選取要比較的專案，再使用滑鼠右鍵呼叫選單，選取 **Analyzer Project Portability**
![Analyzer Project Portability](https://lh3.googleusercontent.com/YEW20ENrvzuh6s4MhoqDTmERjOJchacSY5fkasMGROt2IeZ19heVPEBlp7b6vuLOcxoWFtY9cSHKEBloIATU1OgWBbP2AcUZ5XIZTxT-IEtEbdvyfLYaMs7a66AZIhbmEKllr1XC-QTj4l6ScDWbIhwZQ_q8tfHTkexu1FvLtDvyOBulpo6d0U3rs1m0dnnanP7zD4JvMtTO0WcE2dIttjir4FDs1kkEo9dNRYILdEO-3CR8mnc1zFkIPAxxciIayR07iFa0jlQrez8w2F0hKDxhiR1LQj9VcDQK226X5m7-m20JUgHmD_SYnONERvXpsEy9vSwm8Je6LWxXU04A__w_C4VYD9FPbAYoN2C75OID_bKpVguAIw5mPsyQcTn4Zpf1-Kvc2mwN2UXXMyjELjmil9AoR3c-uAWXZrfMLmf9fXRn-nTj1wH5Qx9xjO1BpC9SJsRU-IiUYb19WcrOncbKtJPdK-s5U1KZLvsXkNCG6gq2SZwC9NXijoJp4zhCGcJDQfrM3xV8J8Flp9nKFOhO3iPXNg_w-IsuSJ3iMVqbCXTPsR_zv2J_Vvj4BSbbCQjGP_5W7PbdKj4ryDj8sPnRciynj1W763YvWrybjN3prevDLUo_yJRgE6-N26pxdaEu_QSXVLA8bsn1qsaZ4p6A_2cgTgHC=w466-h307-no)


### [NuGetPackageExplorer][18]

安裝方式可以透過 **Microsoft Store** 直接快速安裝；此工具可以分析 Nuget 上的套件相容性，可以清楚得知，此套件是不是可以運用在 .NET Core 上。

![Store Install](https://lh3.googleusercontent.com/g3kvMjRbRSdw0gpjBsHch63uNbiSqDUiEDlHYasA4caycYtSXijWblYSWje9HEgRNemS7bG1Js-FH98H2WCOuq6KZ0E6rql8toHuNKoSm6RLWNQIpi1XG4lmbr75Y5Bi76BCHDrSLE-K-iek66V4dl2VqCC7ldASmJvpEstvpIwzIQMa1xf1tbZagsVB1526sdnXndEwvky1DDYeO23dRO_w7s1HcaxGa6sHNZ-170uqWk_48lPxLor2ti0HSk7bdpi9vI2V1yRkazT-VLQ5CLNyEEkjURP0h9N8D66SdDbTfyAPm8kVeGevByOGgxYhopOD6ihe20YkEwZ2-wBfCxczUOoeJQunXiW3Mf9tA2SPrgCcS-hz6OrfOdTct5MmR4KbFGRY6IjtS6KYRqEKeSDqilMo0aHzMkcdHiCmdqe16Zrn4pS3A20IfYZXFNwwnP4BwuUFHCR5c5ukNZ5nTdwmh7RfRgscJOMEMyh6cpRx1XdGTwVE7ax-ZyVgOJzHaWdGNkGL0Bw-piizRayv5NIsqZ9STplgr0BchZpE104J-fAyZh5PNBEOG_9EMbmVsIv8DDLemvv4Yj7Or2MSyfB5VLyMdGPZVHsIDRrEaUsOADDf2xrDgzTE2cuq6F-AG6SXamR9v_Tn-hL-jaX5II-DGPHf9LP-=w767-h605-no)

## 相關連結

- [Managed 程式碼][3]
- [Common Language Runtime][4]
- [語言獨立性以及與語言無關的元件][5]
- [Framework 程式庫][6]
- [Developing for Multiple Platforms with the .NET Framework][7]
- [Portable Class Library (PCL) now available on all platforms][8]
- [.NET Core 指南][9]
- [.NET Core 使用者入門][10]
- [.NET Core Roadmap][11]
- [.NET Standard][12]
- [Target frameworks][13]
- [.NET Core SDK Downloads][14]
- [.NET API 瀏覽器][15]
- [.NET Portability Analyzer ( VS2017 擴充套件 )][16]
- [.NET Portability Analyzer-.NET | Microsoft Docs][17]
- [NuGetPackageExplorer | Github][18]

[1]: https://www.udemy.com/netcore2/learn/v4/overview
[2]: https://marketplace.visualstudio.com/items?itemName=doggy8088.netcore-extension-pack
[3]: https://docs.microsoft.com/zh-tw/dotnet/standard/managed-code
[4]: https://docs.microsoft.com/zh-tw/dotnet/standard/clr
[5]: https://docs.microsoft.com/zh-tw/dotnet/standard/language-independence
[6]: https://docs.microsoft.com/zh-tw/dotnet/standard/framework-libraries
[7]: https://docs.microsoft.com/en-us/dotnet/standard/cross-platform/
[8]: https://blogs.msdn.microsoft.com/dotnet/2013/10/14/portable-class-library-pcl-now-available-on-all-platforms/
[9]: https://docs.microsoft.com/zh-tw/dotnet/core/
[10]: https://docs.microsoft.com/zh-tw/dotnet/core/get-started
[11]: https://github.com/dotnet/core/blob/master/roadmap.md
[12]: https://docs.microsoft.com/zh-tw/dotnet/standard/net-standard
[13]: https://docs.microsoft.com/en-us/dotnet/standard/frameworks
[14]: https://www.microsoft.com/net/download/windows
[15]: https://docs.microsoft.com/zh-tw/dotnet/api/
[16]: https://marketplace.visualstudio.com/items?itemName=ConnieYau.NETPortabilityAnalyzer
[17]: https://docs.microsoft.com/zh-tw/dotnet/standard/portability-analyzer
[18]: https://github.com/NuGetPackageExplorer/NuGetPackageExplorer