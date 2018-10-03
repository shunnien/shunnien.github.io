title: SQL Server 中自動增長的索引重設為0
categories: [程式技術筆記]
tags:
  - SQLServer
  - T-SQL
description: SQL Server 中使用 Delete 刪除資料表資料後，自動增長的索引不會清除，而是持續遞增，可以重新設定
toc: false
date: 2017-05-26 09:11:57
---

## Introduction
SQL Server 中有 **Foreign Key** 的資料表，無法使用 **Truncate** 清除資料，需要使用 **DELETE** 語句刪除資料之後，再將編號重置為0。

## Conetent
語法。
``` sql
USE [DbName]
GO
 
DELETE [Table];
-- TableName 輸入要重新設定的資料表名稱
-- 0 這是要當做識別欄位之目前值使用的新值。
DBCC CHECKIDENT('TableName', RESEED, 0);
```

## Reference
- [MSDN DBCC CHECKIDENT][1]

[1]: https://msdn.microsoft.com/zh-tw/library/ms176057.aspx