title: SQL Server 中，移除資料庫中所有的關聯限制
categories: [程式技術筆記]
tags:
  - SQLServer
  - T-SQL
description: 移除指定資料庫中所有資料表的限制
toc: false
date: 2017-05-06 01:11:23
---

## 序言
還是紀錄。
## 內容
不多說，直接看作法吧
``` sql
-- 記得先切換到想要移除的資料庫名稱下
USE yourDataBaseName
GO

/*Create Script to drop constraint and remove columns*/
SELECT
    'IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N''' + DC.Name + ''') and Type = ''D'')
            ALTER TABLE [' + OBJECT_SCHEMA_NAME(SO.ID) + '].[' + SO.Name + '] DROP CONSTRAINT [' + DC.Name + ']'
FROM SysObjects SO
INNER JOIN SysColumns SC
    ON SO.ID = SC.ID
INNER JOIN sys.default_constraints DC
    ON SO.ID = DC.Parent_object_id
        AND SC.colid = DC.Parent_column_id
WHERE SO.XTYPE = 'U'
AND SC.Name = 'msrepl_tran_version'
UNION
SELECT
    'IF EXISTS (SELECT * FROM dbo.syscolumns where id = OBJECT_ID(N''' + SO.Name + ''') and Name = ''msrepl_tran_version'')
           ALTER TABLE [' + OBJECT_SCHEMA_NAME(SO.ID) + '].[' + SO.Name + '] DROP COLUMN [msrepl_tran_version]  '
FROM SysObjects SO
INNER JOIN SysColumns SC
    ON SO.ID = SC.ID
INNER JOIN sys.default_constraints DC
    ON SO.ID = DC.Parent_object_id
        AND SC.colid = DC.Parent_column_id
WHERE SO.XTYPE = 'U'
AND SC.Name = 'msrepl_tran_version'
ORDER BY 1
```
可以搭配[移除所有資料表](https://shunnien.github.io/2017/05/06/delete-all-database-table/)的語法一起使用。

