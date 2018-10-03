title: 取得資料庫中的資料表的建立修改時間
categories: [程式技術筆記]
tags:
  - SQLServer
  - T-SQL
description: SQL Server 中，取得資料表或是檢視表等各種類型的建立修改時間
toc: false
date: 2017-05-07 16:35:43
---

## Introduction
可以用來查詢進來是否有人變動過資料表或是檢視表等等。

## Conetent
主要查詢 **[all_objects][1]**，利用條件式篩選出想要查詢的資訊
``` sql
-- 查詢資料表修改時間
SELECT
    [name]
   ,create_date
   ,modify_date
FROM sys.all_objects
WHERE type_desc = 'USER_TABLE'

-- 查詢預存程序修改時間
SELECT
    [name]
   ,create_date
   ,modify_date
FROM sys.all_objects
WHERE type_desc = 'SQL_STORED_PROCEDURE'
-- 以下這是過濾內建的預存程序
AND SUBSTRING([name], 1, 3) NOT IN ('sp_', 'dt_', 'xp_')
```

## Reference
- [Micsoft Doc all_objects][1]

[1]: https://docs.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-all-objects-transact-sql