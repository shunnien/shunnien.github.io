title: "Error 175:The ADO.NET provider with invariant name 'Npgsql'..."
categories: [程式技術筆記]
tags:
  - Troubleshooting
  - 'C#'
  - PostgrestSQL
description: "發生錯誤，Error 175: The ADO.NET provider with invariant name 'Npgsql' is either not registered in the machine or application config file, or could not be loaded."
toc: false
date: 2017-04-04 23:04:14
---

## 問題
有朋友在開發時要將透過 [Entity Framework][1] 產生的 *edmx file* 更新，但是出現了以下的錯誤訊息。(Entity Framework 6)
> Error 175: The ADO.NET provider with invariant name 'Npgsql' is either not registered in the machine or application config file, or could not be loaded.

## 原因
錯誤訊息說明 [Npgsql][2] 沒有註冊進機器，所以無法讀取使用，檢查過 `config` 設定，確認都已經進行設定後，確認 [Npgsql][2] 需要安裝其元件。

## 解決方式
至 [Npgsql Release][3] 下載 `Npgsql-3.2.2.msi` 安裝，即可解決。


## 參考資料
- [Entity Framework][1]
- [Github Npgsql][2]
- [Npgsql Release][3]

[1]: https://msdn.microsoft.com/en-us/library/aa937723(v=vs.113).aspx "Entity Framework"
[2]: https://github.com/npgsql "Github Npgsql"
[3]: https://github.com/npgsql/npgsql/releases "Npgsql Release"