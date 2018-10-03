title: 個人常用的 Sublime Text 3 快捷鍵
categories: [程式技術筆記]
tags:
  - Sublime Text3
description: 常用快捷鍵整理(windows/linux 版本)
date: 2016-02-23 19:45:12
---

紀錄個人比較常用的一些快捷鍵，或是一些比較少用但是實用的快捷鍵(僅有 windows/linux 版本)。

### 一般操作(General)
| 快捷鍵              |         描述|
|:--------------------|:------------|
|Ctrl + Shift + P|打開命令框|
|Ctrl + K + B|開/關側邊欄|

### 搜尋(Navigation/Goto)
| 快捷鍵              |         描述|
|:--------------------|:------------|
|Ctrl + F|打開底部的搜尋框|
|Ctrl + H|取代|
|Ctrl + Shift + F|按照資料夾/檔案進行搜索|
|Ctrl + P|打開搜尋框|
|Ctrl + R|打開搜尋框，自動代入**@**；前往符號(symbol)、函數名稱等|
|Ctrl + ;|打開搜尋框，自動代入**#**；前往變數名稱、屬性名稱(word)等 |
|Ctrl + G|打開搜尋框，自動代入**:**；前往此檔案某行|

### 編輯操作(Editing)
| 快捷鍵              |         描述|
|:--------------------|:------------|
|Ctrl + K + U|轉換大寫|
|Ctrl + K + L|轉換小寫|
|Ctrl + Enter|在下一行插入新行|
|Ctrl + Shift + Enter|在上一行插入新行|
|Ctrl + Shift + ↑|將所在行和上一行互換|
|Ctrl + Shift + ↓|將所在行和下一行互換|
|Ctrl + L|選取整行，跟 Shift + ↓ 效果相同|
|Ctrl + D|選取詞句，繼續操作則會繼續選取相同詞句的文字|
|Alt + F3|一次性選取相同內容的語句|
|Ctrl + M|游標移動到括號內結束或開始的位置|
|Ctrl + Shift + M|選取括號內的內容，繼續操作則會把括號一起選取|
|Ctrl + Shift + K|刪除整行|
|Ctrl + K + K|從游標處向右刪除到行尾|
|Ctrl + K + Backspace|從游標處向左刪除到行首|
|Ctrl + ]|向右縮排|
|Ctrl + [|向左縮排|
|Ctrl + Shift + D|複製游標所在整行，並插入到下一行|
|Ctrl + J|合併選取的多行為一行|
|Ctrl + /|註解單行|
|Ctrl + Shift + /|註解多行|
|Ctrl + Z|返回上一操作|
|Ctrl + Y|前往下一操作，對應 Ctrl + Z；或是重複最後執行的快捷鍵操作|
|Ctrl + Shift + V|貼上並進行縮排|
|Ctrl + Space|顯示自動化建議語句|
|Alt + Shift + W|將選取的內容外插入 html tag|
|Ctrl + T|游標左右字母互換|
|F6|單字檢測|
|Ctrl + Shift + L|先選取多行，操作後將開啟多行編輯|
|Ctrl + Shift + [|先選取程式碼，操作後，摺疊程式碼|
|Ctrl + Shift + ]|先選取程式碼，操作後，展開程式碼|
|Ctrl + K + 0|展開所有摺疊程式碼|
|Ctrl + F2|設定/取消書籤|
|F2|切換下一書籤|
|Shift + F2|切換上一書籤|
|Ctrl + Shift + F2|清除所有書籤|

### 分頁操作(Tabs)
| 快捷鍵              |         描述|
|:--------------------|:------------|
|Ctrl + Shift + T|開啟最後關閉的分頁|
|Ctrl + PgUp|分頁切換，向右順序切換|
|Ctrl + PgDn|分頁切換，向左順序切換|
|Ctrl + Tab|按照分頁瀏覽過的順序切換|
|Ctrl + W|關閉此分頁|
|Ctrl + [NUM]|切換到該數字代表的分頁，[NUM]表示分頁順序，由左至右，由 1 開始|

### 視窗操作(Split window)
| 快捷鍵              |         描述|
|:--------------------|:------------|
|Alt + Shift + 1|切換到單一欄位，其實就是一般分頁|
|Alt + Shift + 2|切換到兩欄位，就是把兩個分頁合併在一個分頁顯示，左右對照形式|
|Alt + Shift + 3|切換到三欄位，一個分頁顯示四個分頁內容，左右對照形式|
|Alt + Shift + 4|切換到四欄位，左右對照形式|
|Alt + Shift + 5|切換到十字分隔(Grid)形式，上述的分隔都是條列分隔，|
|Alt + Shift + 8|切換到兩欄位，橫向的分隔，上下對照形式|
|Alt + Shift + 9|切換到三欄位，橫向的分隔，上下對照形式|
|Ctrl + Shift + [NUM]|移動檔案到分隔的欄位，[NUM]表示 1-4|
|F11|全螢幕模式|

## 參考資料
- [Sublime Text 3 Documentation][1]

[1]: http://docs.sublimetext.info/en/latest/reference/keyboard_shortcuts_win.html