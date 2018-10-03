title: 取得資料庫伺服器中指定資料庫中的所有資料表名稱
categories: [程式技術筆記]
tags:
  - SQLServer
  - T-SQL
description: SQL SERVER 中取得資料庫伺服器中指定資料庫中的所有資料表名稱
toc: false
date: 2017-05-26 09:17:29
---

## Introduction
SQL SERVER 中取得資料庫伺服器中指定資料庫中的所有資料表名稱

## Conetent
作法
``` sql
--List Table name 取得該DB中所有資料表名稱
SELECT 
 '['+SCHEMA_NAME(schema_id)+'].['+name+']' AS SchemaTable
FROM sys.tables
```