title: SQL Server 移除預設值
categories: 程式技術筆記
tags:
  - T-SQL
  - SQLServer
toc: false
date: 2018-01-19 09:55:07
---

已經設定好了的預設值，現在要變更，需要先把 **Constraint** 移除，再行新增
<!-- more -->

要移除某個資料表某個欄位的預設值 **constraint** ，所以需要先取得此 **constraint** 的 **OBJECT_NAME**

``` sql
-- 取得 Object_Name
-- TableName:請填入要變更的資料表名稱
-- ColumnName:請填入要變更的欄位名稱
DECLARE @defcon SYSNAME;
SELECT @defcon = OBJECT_NAME(sc.default_object_id)
FROM SYS.COLUMNS AS sc
WHERE sc.[object_id] = OBJECT_ID('TableName')
    AND sc.[name] = 'ColumnName';

-- 取得了 Object_Name，就可以來移除它
EXEC ('ALTER TABLE TableName DROP CONSTRAINT ' + @defcon)
```

## 參考資料

- [OBJECT_NAME][1]
- [sys.columns][2]
- [OBJECT_ID][3]

[1]: https://docs.microsoft.com/zh-tw/sql/t-sql/functions/object-name-transact-sql
[2]: https://docs.microsoft.com/zh-tw/sql/relational-databases/system-catalog-views/sys-columns-transact-sql
[3]: https://docs.microsoft.com/zh-tw/sql/t-sql/functions/object-id-transact-sql