title: 移除所有資料中符合指定名稱的欄位
categories: [程式技術筆記]
tags:
  - SQLServer
  - T-SQL
description: 移除指定資料欄位於所有自訂資料表中
toc: false
date: 2017-05-09 22:13:43
---

## Introduction
在移除某些通用資料欄位得時候挺好用的。

## Conetent
使用 **cursor** 來處理，請將以下程式碼中的 **your_column_name** 換成想要移除的欄位名稱即可。

``` sql
-- ================== 移除所有自訂資料表中某欄位 ========================
 DECLARE @table_schema varchar(100)
       ,@table_name varchar(100)
       ,@constraint_schema varchar(100)
       ,@constraint_name varchar(100)
       ,@cmd nvarchar(200)
      
DECLARE table_cursor CURSOR FOR
SELECT
    TABLE_SCHEMA
   ,TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME != 'sysdiagrams'
  
OPEN table_cursor
FETCH NEXT FROM table_cursor INTO @table_schema, @table_name
  
WHILE @@FETCH_STATUS = 0 
BEGIN
   IF   EXISTS (SELECT
        *
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = @table_name
    AND COLUMN_NAME = 'your_column_name')
BEGIN
SELECT
    @cmd = 'ALTER TABLE [' + @table_schema + '].[' + @table_name + '] DROP COLUMN your_column_name'
EXEC sp_executesql @cmd
PRINT 'delete your_column_name= ' + @table_name
END
ELSE
--BEGIN
--   PRINT ' no delete your_column_name= '+ @table_name 
--END
FETCH NEXT FROM table_cursor INTO @table_schema, @table_name
END
DEALLOCATE table_cursor
```