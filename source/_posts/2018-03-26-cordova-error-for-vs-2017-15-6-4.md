---
title: cordova error for vs 2017 15.6.4
toc: false
date: 2018-03-26 14:47:24
categories: 程式技術筆記
tags: [Troubleshooting, Visual Studio]
---

開發 cordova 專案，在 [Visual Studio 2017](https://www.visualstudio.com/zh-hant/downloads/) 更新到 **version 15.6.4** 後，要建置的時候就發生錯誤了<!-- more -->，錯誤訊訊息如下：

{% note danger %}
Invalid command line switch for "tsc.exe". Value cannot be null. Parameter name: path1
{% endnote %}

這時候去 [microsoft developer community](https://developercommunity.visualstudio.com/spaces/8/index.html) 查詢，發現國外也有一些人遇到這個問題，處理方式都是打開專案檔案來調整，一種是指定 [**typescript**][2] 的編譯版本工具，另一種是乾脆取消使用 [**typescript**][2]

- 指定 [**typescript**][2] 版本

不過我使用方式的時候，還是會建置失敗，原因也還是上述的問題。

``` xml
<PropertyGroup>
    <TypeScriptCompileOnSaveEnabled>false</TypeScriptCompileOnSaveEnabled>
    <TypeScriptToolsVersion>2.3</TypeScriptToolsVersion>
</PropertyGroup>
```

- 取消使用 [**typescript**][2]

``` xml
<PropertyGroup>
    <TypeScriptCompileBlocked>True</TypeScriptCompileBlocked>
    <TypeScriptCompileOnSaveEnabled>false</TypeScriptCompileOnSaveEnabled>
</PropertyGroup>
```

# 參考資料

- [microsoft developer community][1]

[1]: https://developercommunity.visualstudio.com/content/problem/209035/apache-cordova-tools-error-after-upgrading-to-vs-2.html
[2]: https://zh.wikipedia.org/zh-tw/TypeScript