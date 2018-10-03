title: 刪除資料庫全部資料表的資料
categories: [程式技術筆記]
tags:
  - SQLServer
  - T-SQL
description: SQL Script 的操作，可以刪除指定資料庫中所有資料表中的資料。
toc: false
date: 2017-05-02 09:49:03
---

## 碎碎念
這個指令也是很實用的，在公司測試機上的資料或是 staging 上的系統，體驗完後，有要求要全部清空資料的話，這就很實用了，如果資料表不多，倒是不太需要。


## 做法
在 **SSMS** 或是 **sqlcmd** 執行以下 SQL ，要注意的是，有些資料表可能有建立關聯，導致 *Truncate Table* 失敗，但是以下 SQL Script 中會使用 *Truncate* 與 *Delete*，兩種方式同時使用來清除資料，所以出現錯誤訊息的話，多執行幾次應該就可了。

``` sql
-- 取得資料庫中的資料表，並建立儲存到 #LISTTABLES 這資料表中
select
    distinct 表格名稱
    into #LISTTABLES 
from
    (
    SELECT
        Top 100 PERCENT
        a.TABLE_NAME as 表格名稱
    FROM
        INFORMATION_SCHEMA.TABLES  a
        LEFT JOIN INFORMATION_SCHEMA.COLUMNS b ON ( a.TABLE_NAME=b.TABLE_NAME )
    WHERE
        a.TABLE_TYPE='BASE TABLE' 
        and a.TABLE_NAME != 'sysdiagrams'
    ORDER BY
        a.TABLE_NAME, ordinal_position) c;

declare 
    @tablename nvarchar(max)

declare icur cursor static for select * from #LISTTABLES
    
OPEN icur

fetch next from icur into @tablename
while(@@FETCH_STATUS=0)
BEGIN

    -- 使用 TRUNCATE 最快，且會將表格中的自動編號欄位歸零
    -- 但若表格有被參考 Foreign Key 的話，會無法使用 TRUNCATE 指令
    exec ('TRUNCATE TABLE ' + @tablename);  

    -- 如果 TRUNCATE 不成功，還可以用 DELETE 刪除所有資料
    exec ('delete from ' + @tablename + ' where 1=1');

    -- 使用 DELETE 不會將自動編號的欄位歸零，使用 DBCC CHECKIDENT 指令歸零
    exec ('DBCC CHECKIDENT(''' + @tablename + ''', RESEED, 0)');

    FETCH NEXT FROM icur INTO @tablename
END

close icur
deallocate icur

drop table #LISTTABLES 
```

## 參考資料
- [Will 保哥][1]

[1]: http://blog.miniasp.com/post/2007/11/16/SQL-Tips-Delete-All-Data-in-whole-Database.aspx