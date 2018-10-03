title: 取得SQL Server 的版本資訊
categories: [程式技術筆記]
tags:
  - SQLServer
  - T-SQL
description: 查詢 Sql Server 的版本資料
toc: false
date: 2017-05-07 16:35:54
---

## Introduction
列出 SQL Server 的相關資訊

## Conetent
``` sql
-- 查詢相關的版本資料
SELECT
    RIGHT(LEFT(@@VERSION, 25), 4) N'產品版本編號'
   ,SERVERPROPERTY('ProductVersion') N'版本編號'
   ,SERVERPROPERTY('ProductLevel') N'版本層級'
   ,SERVERPROPERTY('Edition') N'執行個體產品版本'
   ,DATABASEPROPERTYEX('master', 'Version') N'資料庫的內部版本號碼'
   ,@@VERSION N'相關的版本編號、處理器架構、建置日期和作業系統'
```
## Reference
- [Micsoft Doc @@version][1]

[1]: https://docs.microsoft.com/en-us/sql/t-sql/functions/version-transact-sql-configuration-functions