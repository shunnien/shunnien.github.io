title: 列出資料庫中檢視表的欄位以及對應的資料表
categories: [程式技術筆記]
tags:
  - SQLServer
  - T-SQL
description: 列出資料庫中檢視表的欄位，還有檢視表對應的資料表與資料庫
toc: false
date: 2017-05-03 19:55:44
---

## 前言
這個 SQL 組合語法也很實用，畢竟檢視表(View)也很常用到。

## 語法
``` sql
-- 檢視表 名稱與欄位
SELECT a.name AS '表格名稱'
     --, b.text AS '創建資料表SQL'
     , c.name AS '欄位名稱'
FROM
  sysobjects a
  LEFT JOIN syscomments b
    ON a.id = b.id
  LEFT JOIN syscolumns c
    ON a.id = c.id
WHERE
  a.type = 'V'
ORDER BY
  a.name
  
-- 條列檢視表與資料表欄位對應關係
SET NOCOUNT ON
DECLARE @DataBases table (
 VIEW_CATALOG   nvarchar(256),
VIEW_SCHEMA   nvarchar(256),
VIEW_NAME   sysname,
TABLE_CATALOG   nvarchar(256),
TABLE_SCHEMA    nvarchar(256),
TABLE_NAME    sysname,
COLUMN_NAME   sysname  
  )

INSERT INTO @DataBases (VIEW_CATALOG
                      , VIEW_SCHEMA
                      , VIEW_NAME
                      , TABLE_CATALOG
                      , TABLE_SCHEMA
                      , TABLE_NAME
                      , COLUMN_NAME)

-- 資料庫1名稱那邊，可以列出檢視表有關連到的資料庫(假如所使用的檢視表有跨資料庫的話)
EXEC sp_msforeachdb '
SELECT *
FROM
  [?].INFORMATION_SCHEMA.VIEW_COLUMN_USAGE
WHERE
  VIEW_CATALOG IN (''資料庫1名稱'', ''資料庫2名稱'')
ORDER BY
  VIEW_CATALOG
, VIEW_NAME'
SET NOCOUNT OFF
SELECT VIEW_CATALOG AS '檢視表資料庫'
     --, VIEW_SCHEMA AS '檢視表結構結構'
     , VIEW_NAME AS '檢視表名稱'
     , TABLE_CATALOG AS '對應資料庫'
     --, TABLE_SCHEMA AS '資料表結構'
     , TABLE_NAME AS '資料表名稱'
     , COLUMN_NAME AS '欄位名稱'
FROM
  @DataBases
```