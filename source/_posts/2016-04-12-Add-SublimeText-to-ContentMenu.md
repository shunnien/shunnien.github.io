title: Add SublimeText to ContentMenu
categories: [程式技術筆記]
tags:
  - Sublime Text3
description: 在 Windows 10 中把 SublimeText 加入到右鍵選單
toc: false
date: 2016-04-12 22:16:11
---

## 前言
最近把電腦重灌，順便把一些環境設置記錄下來。Sublime Text 在滑鼠右鍵是沒有快捷鍵，有些文件檔案在開啟的時候就沒那麼方便，把 SublimeText 加入到右鍵選單，這樣就便利許多。

## 正文
要調整滑鼠右鍵的話，就要動到登錄檔了，不過可以參考[此篇][1]，把以下的指令存成批次檔（.bat），然後使用管理者權限執行即可

``` bash
 @echo off
  :: st3Path 為 sublime Text3 的程式路徑
  SET st3Path=D:\OneDrive\Sublime Text Build 3065 x64\sublime_text.exe

  rem add it for all file types
  :: 滑鼠右鍵選單的顯示名稱
  @reg add "HKEY_CLASSES_ROOT\*\shell\Open with Sublime Text 3"         /t REG_SZ /v "" /d "Open with Sublime Text 3"   /f
  :: 滑鼠右鍵選單的顯示圖示  
  @reg add "HKEY_CLASSES_ROOT\*\shell\Open with Sublime Text 3"         /t REG_EXPAND_SZ /v "Icon" /d "%st3Path%,0" /f
  :: 執行程式路徑
  @reg add "HKEY_CLASSES_ROOT\*\shell\Open with Sublime Text 3\command" /t REG_SZ /v "" /d "%st3Path% \"%%1\"" /f

  rem add it for folders
  @reg add "HKEY_CLASSES_ROOT\Folder\shell\Open with Sublime Text 3"         /t REG_SZ /v "" /d "Open with Sublime Text 3"   /f
  @reg add "HKEY_CLASSES_ROOT\Folder\shell\Open with Sublime Text 3"         /t REG_EXPAND_SZ /v "Icon" /d "%st3Path%,0" /f
  @reg add "HKEY_CLASSES_ROOT\Folder\shell\Open with Sublime Text 3\command" /t REG_SZ /v "" /d "%st3Path% \"%%1\"" /f
  pause
```

完成後，滑鼠右鍵顯示
![result](https://lh3.googleusercontent.com/P1lUUl64jplXbDxkKZggx9cCHuKmNvcd5Gahp4vAqIwfIFcdE4Ro2OAY2-aaSGjWJB6gkY7Z27A6hqfZ-n4aqJAll9Q23Vo2WHvvzSsoNSm08hRVaGUVSOzjyZlUWPGQSsV8ZXLtbxI0MzRimpjFqnd7HXfLDksCrsUrjMTVfH9osYF1VFuSxfCdD_PCB2NJg7xeeJUPrI7lS2kl4YP75Ep9egTZhJkxPaGnOvQ0Z3MPGGrUWkRsHnJyxSNJwbC1ERDHJBjn1E23cpRO5k9ktttqOHtIycPj1sloJZxHRlyRCYCeA03ppIfP5YfboPElgZG3Xyb4OX4Si74j83zO-TsaXI3KlA5xvCPCEP3naJ_N-nlA01WnBxpOSRsta8M_PjFPq9MfYI-oV0T6PSFjXZQi8fEtq8HyOJEbxD2X41sUc7Wh6DNHmVkJmmPDEjKh8vcmXe3mNk6NAUUEjdP7st2XETU9qTOE51nmka7pkx3lqXTHvkyfNSBHYCn-gvgUlnHczRWAh-NB6Vch8-GRwYNgkMWbP8bcbI05EJmIOFK1FczZwfc5chFMBQkHYsikSH22K6E-BOGDQXWtMQwjT-ayXaDSd2CfsSQtk-q6vPznX2-IGLmDJiG3vF5I_xQlgZzJMBlUqawWvGfJL24e2AjoQepnWmKhD2nJ-7bYEw=w329-h202-no)

## 參考資料
- [Add “Open with Sublime Text 3” to Windows Explorer Context Menu][1]

[1]: http://wordpress-corner.com/add-open-sublime-text-3-windows-explorer-context-menu/