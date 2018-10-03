title: postgresql 的一些查詢指令
categories: [程式技術筆記]
tags: [PostgrestSQL]
description: postgresql 的一些查詢指令
toc: false
date: 2016-06-07 21:12:25
---

## 前言
就是一份簡單的筆記

## 內文
注意喔，以下大部分都是 PostgrestSQL 的查詢喔，使用的 PG 版本是
`PostgreSQL 9.5.3`
### 查詢連線數
``` sql
SELECT datname, 
       Count(*) 
FROM   pg_stat_activity 
GROUP  BY datname; 
```
順便附上 Sql Server 的查詢連線數方式
``` sql
USE master 

SELECT cntr_value AS User_Connections 
FROM   sys.sysperfinfo AS sp 
WHERE  sp.object_name = 'SQLServer:General Statistics' 
       AND sp.counter_name = 'User Connections' 
```

### 取得版本
``` sql
SELECT version();
```

### 列出資料表名稱

``` sql
SELECT * 
FROM   information_schema.TABLES 
WHERE  table_schema = 'public' 
       AND table_type = 'BASE TABLE' 
```

SQL Server 的查詢方式相當簡單，還是附上好了
``` sql
select @@VERSION
```

### 取得繼承關係的資料表
``` sql
SELECT parent.relname AS parent_table, 
       child.relname AS child_table 
FROM   pg_inherits 
       join pg_class AS child 
         ON ( inhrelid = child.oid ) 
       join pg_class AS parent 
         ON ( inhparent = parent.oid ) 
```

## 參考資料
- [官方網站][2]


[1]: https://www.postgresql.org/docs/current/static/plpgsql.html
[2]: https://www.postgresql.org/