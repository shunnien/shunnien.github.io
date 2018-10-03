title: Add Cmder to ContentMenu
categories: [程式技術筆記]
tags:
  - Cmder
description: 把 Cmder 加入到滑鼠右鍵選單，環境在 Windows 10 中的設定
toc: false
date: 2016-05-16 18:31:22
---


## 前言
同樣是重新設定一些便利的操作而已。目的是為了可以使用滑鼠右鍵選單操作。

## 設定方式

在設定之前，先說明我的環境，我的環境是在 **Windows 10**；

建立一個純文字檔案，將以下指令貼上，然後另存成 **.bat** 批次檔案

之後執行該批次檔案。

*cmderPath* 路徑按照個人的設定變動路徑位址

``` bash
 @echo off
  SET cmderPath=D:\OneDrive\DevTool\Win\cmder_mini\Cmder.exe

  rem add it for Directory
  @reg add "HKEY_CLASSES_ROOT\Directory\Background\shell\Open with Cmder"         /t REG_SZ /v "" /d "Open with Cmder"   /f
  @reg add "HKEY_CLASSES_ROOT\Directory\Background\shell\Open with Cmder"         /t REG_EXPAND_SZ /v "Icon" /d "%cmderPath%,0" /f
  @reg add "HKEY_CLASSES_ROOT\Directory\Background\shell\Open with Cmder\command" /t REG_SZ /v "" /d "%cmderPath% \"%%V\"" /f
  pause
```

## 參考資料
- jojobyte:[ContextCmder-Disable](https://gist.github.com/jojobyte/66c8346ed8948b9b395f)