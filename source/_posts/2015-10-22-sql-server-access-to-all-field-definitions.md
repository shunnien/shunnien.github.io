---
layout: post
title: 'Sql Server 取得所有欄位定義'
date: 2015-10-22 04:11
comments: true
categories: [程式技術筆記]
tags: [SQLServer, T-SQL]
description: Sql Server Scripts 取得欄位資料
---
把一些以前整理的東西，紀錄一下

此部分最好在 Sql Server 2005 以上使用， Sql Server 2000 就沒使用過

``` sql
SELECT
CASE  a.TABLE_TYPE
WHEN  'BASE TABLE'  THEN '資料表'
WHEN 'VIEW'  THEN '檢視表'
END as 表格類型 ,
    a.TABLE_NAME                as 表格名稱,
    b.COLUMN_NAME               as 欄位名稱,
    b.DATA_TYPE                 as 資料型別,
    b.CHARACTER_MAXIMUM_LENGTH  as 最大長度,
    b.COLUMN_DEFAULT            as 預設值,
    b.IS_NULLABLE               as 允許空值,
    (
        SELECT
            value
        FROM
            fn_listextendedproperty (NULL, 'schema', 'dbo', 'table', 
                                     a.TABLE_NAME, 'column', default)
        WHERE
            name='MS_Description' 
            and objtype='COLUMN' 
            and objname Collate Chinese_Taiwan_Stroke_CI_AS=b.COLUMN_NAME
    ) as 欄位備註
FROM
    INFORMATION_SCHEMA.TABLES  a
    LEFT JOIN INFORMATION_SCHEMA.COLUMNS b ON (a.TABLE_NAME=b.TABLE_NAME)
--WHERE
--    TABLE_TYPE='VIEW'
--    TABLE_TYPE='BASE TABLE'
ORDER BY
   a.TABLE_TYPE, a.TABLE_NAME, ordinal_position
```

***

補充使用其他 function 或是其他系統資料表的查詢語法。
首先是取得資料表結構，主要是 `syscolumns` 系統欄位資料表查詢，不過這樣的顯示不容易觀看，所以才會有整理混合的語法。
``` sql
SELECT
    a.name
   ,a.Length
   ,b.name AS type
   ,'' AS value
FROM syscolumns AS a
INNER JOIN dbo.systypes AS b
    ON a.xusertype = b.xusertype
-- 指定為 View Table 欄位的查詢
--WHERE id = OBJECT_ID('INFORMATION_SCHEMA.VIEW_COLUMN_USAGE')
```

另一種查詢方式，使用 `sysobjects` 

``` sql
SELECT
    tab.name table_name
   ,col.colid column_id
   ,col.name column_name
   ,typ.name data_type
   ,col.prec PRECISION
   ,col.scale scale
   ,col.length
   ,com.TEXT default_value
   ,CASE
        WHEN col.isnullable = 1 THEN 'Y'
        ELSE 'N'
    END is_nullable
   ,CASE
        WHEN col.status & 0X80 = 0X80 THEN 'Y'
        ELSE 'N'
    END is_identity
   ,(SELECT
            VALUE
        FROM Fn_listextendedproperty(NULL, 'schema', 'dbo', 'table',
        tab.name,
        'column',
        col.name))
    DESCRIPTION
FROM sysobjects tab
    ,syscolumns col
     LEFT OUTER JOIN syscomments com
     INNER JOIN sysobjects obj
         ON com.id = obj.id
         ON col.cdefault = com.id
             AND com.colid = 1
    ,systypes typ
WHERE tab.id = col.id
AND tab.xtype = 'U'
AND col.xusertype = typ.xusertype
```