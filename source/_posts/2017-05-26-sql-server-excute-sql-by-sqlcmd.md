title: 使用 SQLCMD 執行 .sql 檔案
categories: [程式技術筆記]
tags:
  - SQLServer
  - T-SQL
description: 透過 SQLCMD 來執行 SQL 命令
toc: false
date: 2017-05-26 09:24:47
---

## Introduction
某些 .sql 檔案過大時，想使用 GUI 介面開啟就需要不少時間，而且可能使 GUI 介面軟體記憶體不足而無法執行，所以透過 SQLCMD 來執行方便又快速。

## Conetent
使用 sqlcmd 之前，先確認自己電腦有安裝 sqlcmd 工具，並且在環境變數設定。
參數說明
> 伺服器選項 (-S)，識別 sqlcmd 所連接的 Microsoft SQL Server 執行個體。
> 驗證選項 (-E、-U 和 -P)，指定供 sqlcmd 用來連接到 SQL Server 執行個體的認證。
> 注意：****-E 選項是預設值，不需要予以指定。
> 輸入選項 (-Q、-q 和 -i)，識別 sqlcmd 的輸入位置。
> 輸出選項 (-o)，指定 sqlcmd 存放其輸出的檔案。

以下是示範範例，此範例直接在資料庫伺服器本機執行，所以沒有設定驗證選項
``` bash
sqlcmd -S myServer\instanceName -i C:\myScript.sql
```

## Reference
- [MSDN sqlcmd][1]

[1]: https://msdn.microsoft.com/zh-tw/library/ms180944.aspx