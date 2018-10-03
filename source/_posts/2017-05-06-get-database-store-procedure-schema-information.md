title: 取得預存程序的資訊
categories: [程式技術筆記]
tags:
  - SQLServer
  - T-SQL
description: 取得指定資料庫中所有預存程序的訊息
toc: false
date: 2017-05-06 01:19:43
---

## Introduction
還是紀錄...，等 **SQL** 部分都整理完，再來整理其他部分。
## Conetent
``` sql
--- set your database name
USE yourDataBaseName
GO
---取得 DATABASE 的預存程序資訊
SELECT
    A.[NAME] AS '結構敘述'
   ,B.[NAME] AS '預存程序名稱'
   ,C.[NAME] AS '預存程序傳入參數'
   ,C.[PARAMETER_ID] AS '傳入參數順序'
   ,D.[NAME] AS '傳入參數型別'
   ,C.[MAX_LENGTH] AS '長度'
   ,C.[PRECISION] AS '精確度'
   ,C.[IS_OUTPUT] AS '傳出參數'
   ,B.[CREATE_DATE] AS '建立時間'
   ,B.[MODIFY_DATE] AS '修改時間'
FROM SYS.SCHEMAS A
INNER JOIN SYS.PROCEDURES B
    ON A.[SCHEMA_ID] = B.[SCHEMA_ID]
INNER JOIN SYS.PARAMETERS C
    ON B.[OBJECT_ID] = C.[OBJECT_ID]
INNER JOIN SYS.TYPES D
    ON C.[SYSTEM_TYPE_ID] = D.[SYSTEM_TYPE_ID]
        AND C.[USER_TYPE_ID] = D.[USER_TYPE_ID]
WHERE B.[TYPE] = 'P'
ORDER BY A.[NAME], B.[NAME], C.[PARAMETER_ID] ASC
```
## Reference
- [Ref1][1]

[1]: https://shunnien.github.io