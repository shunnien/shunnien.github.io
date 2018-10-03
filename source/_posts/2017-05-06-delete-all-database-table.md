title: SQL Server 刪除資料庫中所有資料表
categories: [程式技術筆記]
tags:
  - SQLServer
  - T-SQL
description: 在 SQL Server 中刪除資料庫中自行新增的所有資料表
toc: false
date: 2017-05-06 01:11:47
---

## 序
還是整理記錄。

## 作法
``` sql
-- 記得先切換到想要移除的資料庫名稱下
USE yourDataBaseName
GO

DECLARE @table_schema varchar(100)
       ,@table_name varchar(100)
       ,@constraint_schema varchar(100)
       ,@constraint_name varchar(100)
       ,@cmd nvarchar(200)

DECLARE table_cursor CURSOR FOR
  select TABLE_SCHEMA, TABLE_NAME
    from INFORMATION_SCHEMA.TABLES
   where TABLE_NAME != 'sysdiagrams'
  
OPEN table_cursor
FETCH NEXT FROM table_cursor INTO @table_schema, @table_name
  
WHILE @@FETCH_STATUS = 0 
BEGIN
     SELECT @cmd = 'DROP TABLE [' + @table_schema + '].[' + @table_name + ']'
     --select @cmd
     EXEC sp_executesql @cmd
  
  
     FETCH NEXT FROM table_cursor INTO @table_schema, @table_name
END
  
CLOSE table_cursor 
DEALLOCATE table_cursor
```

補充說明一下，這版假如在移除有關聯資料表的時候，會因為 **FOREIGN KEY constraint** 而失敗，要先移除所有的關聯限制喔。
可以參考我這篇[**移除關聯限制**](https://shunnien.github.io/2017/05/06/remove-database-relationship-constraint/)。