---
title: git autocrlf 與 safecrlf
categories: 程式技術筆記
tags:
  - git
toc: false
date: 2018-06-03 23:42:50
---

關於 **autocrlf** 產生的一些警告訊息，在很早以前使用 **git** 的時候，就有了解了，但是一直沒有單獨進行筆記，加上 **safecrlf** 這設定一直沒有很仔細去了解，這次順便進行比較詳細的筆記。<!-- more -->

這兩個設定都是針對換行符的設定，主要是 **Git** 早期是為了維護 **Linux kernel** 設計而成的，所以絕大部分使用環境都是 **Linux** 平台，而在 **Linux** 平台下，文字檔案的斷行符號預設為 **LF** 字元 (`\n` ) ( `0x0A` )。不過，在 **Windows** 環境下，文字檔案的預設斷行符號卻是 **CRLF** ( `\r\n` ) ( `0x0D 0x0A` )。這種轉換功能，加上 **Git** 的檔案比對，此種設定會造成一些可能影響與風險

- 若是 **Repository** 中同時包含 **LF** 與 **CRLF** ，經過自動轉換之後，就會造成原始檔案內容不同，等於竄改或破壞原始檔案，增添辨識問題。

# **AutoCRLF**

此功能就上述提及，會自動轉換換行字元，主要的設定影響如下：

設定成 **true** 的作用是 **commit** 時會自動將 **CRLF** 轉成 **LF** ； **checkout** 時會自動將 **LF** 轉成 **CRLF**

``` bash
git config --global core.autocrlf true
```

設定成 **input** 的作用是 **commit** 時會自動將 **CRLF** 轉成 **LF** ； **checkout** 時不轉換

``` bash
git config --global core.autocrlf input
```

設定成 **false** 的則是停止自動轉換，不管 **commit** 或是 **checkout** 都不會進行轉換

``` bash
git config --global core.autocrlf false
```

# **SafeCRLF**

這設定是更加嚴格的過濾換行符，只要 **git add** 或是 **commit** 或是 **push** 都會過濾

**不允許** 有 **LF** 與 **CRLF** 混合的檔案

``` bash
git config --global core.autocrlf true
```

**允許** 有 **LF** 與 **CRLF** 混合的檔案

``` bash
git config --global core.autocrlf false
```

**允許** 有 **LF** 與 **CRLF** 混合的檔案，但是會出現 **warning** 警告訊息

``` bash
git config --global core.autocrlf warn
```

# 延伸閱讀

- Will 保哥 [Git 在 Windows 平台處理斷行字元 (CRLF) 的注意事項][1]
- Will 保哥 [Visual Studio Tools for Git 處理斷行字元 (CRLF) 的注意事項][2]
- Huan-Lin 學習筆記 [Git 的 core.autocrlf 參數][5]
- Huan-Lin 學習筆記 ["Git 在 Windows 平台的換行字元][6]

[1]: https://blog.miniasp.com/post/2013/09/15/Git-for-Windows-Line-Ending-Conversion-Notes.aspx "Git 在 Windows 平台處理斷行字元 (CRLF) 的注意事項"
[2]: https://blog.miniasp.com/post/2014/02/20/Visual-Studio-Tools-for-Git-Line-Ending-Conversion-Notes.aspx "Visual Studio Tools for Git 處理斷行字元 (CRLF) 的注意事項"
[3]: https://john24318.wordpress.com/2015/01/08/git-%E4%B8%AD%E7%9A%84-autocrlf-%E8%88%87-safecrlf-%E6%8F%9B%E8%A1%8C%E7%AC%A6%E5%95%8F%E9%A1%8C/ "John's code place:Git 中的 AutoCRLF 與 SafeCRLF 換行符問題"
[4]: http://www.cnblogs.com/flying_bat/p/3324769.html "Git中的AutoCRLF與SafeCRLF換行符問題"
[5]: https://www.huanlintalk.com/2011/05/git-coreautocrlf.html "Git 的 core.autocrlf 參數"
[6]: https://www.huanlintalk.com/2013/10/git-windows.html "Git 在 Windows 平台的換行字元"