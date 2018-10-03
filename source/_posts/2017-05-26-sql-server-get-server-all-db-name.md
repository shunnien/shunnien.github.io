title: 取得資料庫伺服器中所有資料庫名稱
categories: [程式技術筆記]
tags:
  - SQLServer
  - T-SQL
description: 在SQL SERVER中，取得資料庫伺服器中所有資料庫名稱
toc: false
date: 2017-05-26 09:14:53
---

## Introduction
在SQL SERVER中，取得資料庫伺服器中所有資料庫名稱

## Conetent
語法
``` sql
SELECT NAME 
FROM   master.dbo.sysdatabases 
```
