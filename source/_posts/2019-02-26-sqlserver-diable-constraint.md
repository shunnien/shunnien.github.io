---
title: sqlserver 停用與啟用條件約束
categories: 程式技術筆記
tags:
  - SQLServer
toc: false
date: 2019-02-26 19:19:41
---

# sqlserver 停用與啟用條件約束

紀錄停用與啟用條件約束的 sql ，還有檢查目前資料表條件約束的語法
<!-- more -->

## 語法

全部條件約束停用

``` sql
-- 全部條件約束停用
EXEC sp_MSforeachtable "ALTER TABLE ? NOCHECK CONSTRAINT ALL"
GO
```

刪除全部資料表資料

``` sql
-- 刪除全部資料表資料
EXEC sp_MSForEachTable "DELETE FROM ?"
GO
```

全部資料表增值索引重設

``` sql
-- 全部資料表增值索引重設
EXEC sp_MSforeachtable "DBCC CHECKIDENT('?', RESEED, 0)"
Go
```

全部條件約束啟用

``` sql
-- 全部條件約束啟用
EXEC sp_MSforeachtable "ALTER TABLE ? WITH NOCHECK CHECK CONSTRAINT ALL"
GO
```

檢查目前資料表條件約束狀態的語法

``` sql
SELECT f.NAME         N'物件名稱',
       is_disabled    N'已停用(1)',
       is_not_trusted N'不檢查現有資料(1)',
       s.NAME         N'結構描述',
       o.NAME         N'外部索引資料表',
       sc.NAME        N'結構描述',
       r.NAME         N'主索引資料表',
       delete_referential_action_desc
                      N'在進行刪除時，宣告的參考動作之描述',
       update_referential_action_desc
                      N'在進行更新時，宣告的參考動作之描述',
       f.type_desc    N'物件描述'
FROM   sys.foreign_keys f
       INNER JOIN sys.objects o
               ON f.parent_object_id = o.object_id
       INNER JOIN sys.schemas s
               ON o.schema_id = s.schema_id
       INNER JOIN sys.objects r
               ON f.referenced_object_id = r.object_id
       INNER JOIN sys.schemas sc
               ON r.schema_id = sc.schema_id
ORDER  BY o.NAME
GO
```

## 參考資料

- [德瑞克：SQL Server 學習筆記][1]
- [microsoft docs][2]

[1]: http://sharedderrick.blogspot.com/2017/06/sql-server-disable-foreign-key.html
[2]: https://docs.microsoft.com/zh-tw/sql/relational-databases/tables/disable-check-constraints-with-insert-and-update-statements?view=sql-server-2017