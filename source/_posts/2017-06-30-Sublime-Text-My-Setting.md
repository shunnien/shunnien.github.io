title: Sublime Text3 個人設定
categories: 程式技術筆記
tags:
  - Sublime Text3
toc: false
date: 2017-06-30 11:05:46
description:
---

常用的個人設定，紀錄一下。<!-- more -->


``` js
{
    // 顏色樣式
    "color_scheme": "Packages/User/SublimeLinter/Monokai (SL).tmTheme",
    // 縮排檢測，當一個新檔案讀取的時候，會進行檢測，然後決定是否自動縮排
    "detect_indentation": false,
    // DPI 的縮放比例，Sublime Text 3 會根據作業系統目前的 DPI 設定，去同步放大/縮小其介面的各個元件，若作業系統的 DPI 調大，則 Sublime Text 3 的所有欄位也會跟著放大，遮住主要的編輯區塊。
    "dpi_scale": 1.0,
    // 顯示空格字元
    "draw_white_space": "all",
    // 字型
    "font_face": "Consolas",
    // 字型大小
    "font_size": 23,
    // tab 按鍵的空格字元，表示一個 tab 代表幾個空格
    "tab_size": 4,
    // 將 tab 轉換為空格，搭配 tab_size 的數值去進行轉換
    "translate_tabs_to_spaces": true,
    // 游標加粗
    "wide_caret": true,
    // 刪除不必要的空白
    "trim_trailing_white_space_on_save": true,
    // 有編輯過且還沒儲存的文件檔案顯示為橘色
    "highlight_modified_tabs": true,
    // 明顯顯示游標目前在哪一行
    "highlight_line": true
}
```
