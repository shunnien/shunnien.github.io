title: SQL Server 資料庫清除 Log
categories: [程式技術筆記]
tags:
  - SQLServer
  - T-SQL
description: SQL Server 資料庫清除 Log
toc: false
date: 2017-05-27 20:39:07
---

## Introduction
先說說使用清除 Log 比較常見的情境，大部分是公司內部測試資料庫的維護等等，使用一段時間後，需要搬移或清理的時候，我都會把 log 清除，畢竟測試資料沒有太大必要留存。

## Conetent
清除的方式是 Sql Server 2008 以上版本使用。

``` sql
--- 清除SQL Server Log檔
USE [資料庫名稱]
GO
ALTER DATABASE [資料庫名稱] SET RECOVERY SIMPLE WITH NO_WAIT
DBCC SHRINKFILE(記錄檔邏輯名稱, 1)
ALTER DATABASE [資料庫名稱] SET RECOVERY FULL WITH NO_WAIT
GO
```
