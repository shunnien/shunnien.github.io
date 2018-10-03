title: 建立死結查詢
categories: [程式技術筆記]
tags:
  - SQLServer
  - T-SQL
description: 建立 SqlServer 中的死結查詢
toc: false
date: 2017-05-09 23:02:44
---

## Introduction
建立一個預存程序，用來查詢死結(deadlock)

## Conetent
建立死結查詢的預存程序，該程序名稱請自由調整，這邊是命名為 **sp_who_lock**
``` sql
----- 建立死結查詢
USE master;
GO
DROP PROCEDURE sp_who_lock
GO
create procedure sp_who_lock
as
begin
declare @spid int,@bl int,
@intTransactionCountOnEntry int,
@intRowcount int,
@intCountProperties int,
@intCounter int
create table #tmp_lock_who (
id int identity(1,1),
spid smallint,
bl smallint)

IF @@ERROR<>0 RETURN @@ERROR

INSERT INTO #tmp_lock_who (spid, bl)
        SELECT
            0
           ,blocked
        FROM (SELECT
                *
            FROM sysprocesses
            WHERE blocked > 0) a
        WHERE NOT EXISTS (SELECT
                *
            FROM (SELECT
                    *
                FROM sysprocesses
                WHERE blocked > 0) b
            WHERE a.blocked = spid)
        UNION SELECT
            spid
           ,blocked
        FROM sysprocesses
        WHERE blocked > 0
IF @@ERROR <> 0
RETURN @@ERROR

-- 找到臨時表的紀錄數
SELECT
    @intCountProperties = COUNT(*)
   ,@intCounter = 1
FROM #tmp_lock_who

IF @@ERROR <> 0
RETURN @@ERROR

IF @intCountProperties = 0
SELECT
    '現在沒有阻塞和Dead Lock訊息' AS message
-- 循環開始
WHILE @intCounter <= @intCountProperties
BEGIN
-- 取第一條紀錄
SELECT
    @spid = spid
   ,@bl = bl
FROM #tmp_lock_who
WHERE id = @intCounter
BEGIN
IF @spid = 0
SELECT
    '引起死結的SPID是:' + CAST(@bl AS VARCHAR(10)) + ',其執行的SQL語法如下'
ELSE
SELECT
    'SPID：' + CAST(@spid AS VARCHAR(10)) + '被' + 'SPID：' + CAST(@bl AS VARCHAR(10)) + '阻塞,其當前執行的SQL語法如下'
DBCC INPUTBUFFER (@bl)
END
SET @intCounter = @intCounter + 1
end
DROP TABLE #tmp_lock_who
RETURN 0
END
```
建立完成後，就可以使用以下方式查詢了
``` sql
---- 查詢建立的死結查詢預存
EXECUTE  [master].[dbo].[sp_who_lock] 
```