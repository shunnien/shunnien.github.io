---
title: SQL 中的 MERGE 語法
categories: 程式技術筆記
tags:
  - T-SQL
  - SQLServer
toc: false
date: 2018-04-19 22:08:59
---


有新人在問，乾脆記錄下來，這樣方便查詢與說明<!-- more -->，另外順便重新比較一下效能。

# **MERGE**

先來看看 **microsoft docs** 上的定義

{% note info %}
根據與來源資料表聯結的結果，在目標資料表上執行插入、更新或刪除作業。 例如，您可以根據在另一個資料表中所找到的差異在資料表中插入、更新或刪除資料列，以同步處理兩個資料表。

效能提示：當兩個資料表有複雜的比對特性時，MERGE 陳述式的條件式行為表現最佳。 例如沒有資料列時插入資料列，或資料列相符時更新資料列。 只要根據另一個資料表的資料列更新資料表，基本 INSERT、 UPDATE 及 DELETE 陳述式就能提升效能及可調適性。
**資料來源** - [microsoft docs](https://docs.microsoft.com/zh-tw/sql/t-sql/statements/merge-transact-sql)
{% endnote %}

看到上述的說明指出這語法適用比對條件複雜的情境。範例語法如下：
註：**SQL Server (從 2008 開始)**

``` sql
--Table A : 要 Update / Insert 的 Table
--Table B : 要用來比較並取得相關資料的 Table (或 subQuery )
-- ON : 表你自訂條件, 用以判斷 Matched 與否
MERGE table_A AS target
USING table_B AS source
    ON target.id = source.id
WHEN MATCHED THEN
    UPDATE SET col = @col
WHEN NOT MATCHED THEN
    INSERT (colkey)
    VALUES (@col);
```

當資料表只有簡易比對時可以考慮改用 **EXISTS** 判斷資料是否存在，再決定要 **Insert** 或 **Update** ，如下：

``` sql
-- 寫法 1
IF EXISTS (SELECT 1 FROM table_A WHERE col = @col)
BEGIN
    UPDATE table_A
        SET ...
    WHERE key = @col
END
ELSE
BEGIN
    INSERT INTO table_A (col, ...)
    VALUES (@col, ...)
END

-- 寫法 2
INSERT table_A (col, col2)
SELECT col, col2
FROM table_B
WHERE NOT EXISTS (SELECT col FROM table_A WHERE table_A.col = table_B.col);

```

# 範例

測試環境如下，採用 **SQL Server Profiler** 監測

``` txt
Microsoft SQL Server 2016 (SP1) (KB3182545) - 13.0.4001.0 (X64)
Windows 10 Pro 6.3 <X64> (Build 16299)
```

實際看範例操作吧

``` sql
SET NOCOUNT ON;
-- 確認暫存表是否存在，並移除存在的暫存表
IF OBJECT_ID('tempdb..#Merge_Target') IS NOT NULL
DROP TABLE #Merge_Target
IF OBJECT_ID('tempdb..#Merge_Source') IS NOT NULL
DROP table #Merge_Source

IF OBJECT_ID('tempdb..#Target') IS NOT NULL
DROP TABLE #Target
IF OBJECT_ID('tempdb..#Source') IS NOT NULL
DROP table #Source

-- 建立測試用暫存表 (merge 目標資料表)
CREATE TABLE #Merge_Target
(
    ID      BIGINT PRIMARY KEY
    ,Value  INT
);
-- 建立測試用暫存表 (merge 資料來源資料表)
CREATE TABLE #Merge_Source
(
    ID      BIGINT PRIMARY KEY
    ,Value  INT
);
-- 建立測試用暫存表 (insert update 目標資料表)
CREATE TABLE #Target
(
    ID      BIGINT PRIMARY KEY
    ,Value  INT
);
-- 建立測試用暫存表 (insert update 資料來源資料表)
CREATE TABLE #Source
(
    ID      BIGINT PRIMARY KEY
    ,Value  INT
);

-- 清除暫存表資料
TRUNCATE TABLE #Merge_Source;
TRUNCATE TABLE #Merge_Target;
TRUNCATE TABLE #Source;
TRUNCATE TABLE #Target;

-- 建立百萬筆隨機資料 (merge 目標資料表)
WITH Tally (n) AS
(
    SELECT TOP 1000000 ROW_NUMBER() OVER (ORDER BY (SELECT NULL))
    FROM sys.all_columns a CROSS JOIN sys.all_columns b
)
INSERT INTO #Merge_Target
SELECT 2*n, 1+ABS(CHECKSUM(NEWID()))%1000
FROM Tally;

-- 建立百萬筆隨機資料 (merge 資料來源資料表)
WITH Tally (n) AS
(
    SELECT TOP 1000000 ROW_NUMBER() OVER (ORDER BY (SELECT NULL))
    FROM sys.all_columns a CROSS JOIN sys.all_columns b
)
INSERT INTO #Merge_Source
SELECT CASE WHEN n <= 500000 THEN 2*n-1 ELSE 2*n END
    ,1+ABS(CHECKSUM(NEWID()))%1000
FROM Tally;
GO

-- 建立百萬筆隨機資料 (insert update 目標資料表)
WITH Tally (n) AS
(
    SELECT TOP 1000000 ROW_NUMBER() OVER (ORDER BY (SELECT NULL))
    FROM sys.all_columns a CROSS JOIN sys.all_columns b
)
INSERT INTO #Target
SELECT 2*n, 1+ABS(CHECKSUM(NEWID()))%1000
FROM Tally;

-- 建立百萬筆隨機資料 (insert update 資料來源資料表)
WITH Tally (n) AS
(
    SELECT TOP 1000000 ROW_NUMBER() OVER (ORDER BY (SELECT NULL))
    FROM sys.all_columns a CROSS JOIN sys.all_columns b
)
INSERT INTO #Source
SELECT CASE WHEN n <= 500000 THEN 2*n-1 ELSE 2*n END
    ,1+ABS(CHECKSUM(NEWID()))%1000
FROM Tally;
GO

-- MERGE
MERGE #Merge_Target t
USING #Merge_Source s
ON s.ID = t.ID
WHEN MATCHED THEN
    UPDATE SET Value = s.Value
WHEN NOT MATCHED THEN
    INSERT (ID, Value) VALUES(s.ID, s.Value);
GO

-- UPDATE/INSERT
BEGIN TRANSACTION T1;
UPDATE t
SET Value = s.Value
FROM #Target t
JOIN #Source s ON s.ID = t.ID;

INSERT INTO #Target
SELECT s.ID, s.Value
FROM #Source s
LEFT JOIN #Target t ON s.ID = t.ID
WHERE t.ID IS NULL;
COMMIT TRANSACTION T1;
GO

DROP TABLE #Source;
DROP TABLE #Target;
```

其效能評比如下圖，由於此測試是使用目標與來源資料表的比較方式進行，而且比對條件單純

- CPU 事件使用的 CPU 時間(毫秒)
- Reads 由伺服器代表事件讀取邏輯磁碟的次數
- Writes 由伺服器代表事件寫入物理磁碟的次數
- Duration 事件占用的時間(平均執行時間)

![Performance](https://lh3.googleusercontent.com/9bSSr0JLl4v7UFf4vZc2vE0O1idKB7wuGp4X7XZNwaKeT0LEZWphWB9FVPhcDWEwuWu48MIu8028AFlhDeYq1jd8DI-ngbDwbTxaNXbQLiKXurrlVkFbFlmKkGJkTynfzGoyaG91rw5GGxkCeU-hfpxC7nbhsFdaeNMBu1oW-N8U2OmpPM0RBTdUM68IMs4nE7nj5XnybrCbb5yyFNDkQJ5hVMfbQUe2nUto7JE80yAZzVnHub2VLK6TU7w8zmP1wEq0anUCvhpIlwX8KBBwEe8y1VwGueEy4d3JwMuZdu3fVBJEdsg2ImuAtjjf0SUJbnAR3QM3P_S6HrhCU_QRJ0pSpRuvNh-8WQQZfQRY7NSii0tUWRLZI1W9yDi2HZo6nIv6eHT4YUMgzVK4NsEFvb3jzo3rWzptkToBtRM6sSbsAXAxvTcEtKI1XdyQgvrUOva5qFyOn9vC-sSM-y0Mwzwxwz-Y9mmK6TAKTEm-bBD_QS86wSsJtr13oJKux3AZn06O_9_KkfpEWtz0aa0z8tZ8v-UiphO_b_R8RCcPKCZWTS3RZAUyHNzfrRUukDrHUUUvudEvmFgyBlDWxFVBWs_AH8c4O3h67uWD8NJrbHN6emHMVA3rTVCcohuF9BoM6lGNoSOWU1mPP1jNv3I3NKDzi1mJtCkm=w1141-h311-no)

## 參考資料

- [Microsoft Docs][1]
- [Microsoft technet][2]
- [Performance of the SQL MERGE vs. INSERT/UPDATE][3]

[1]: https://docs.microsoft.com/zh-tw/sql/t-sql/statements/merge-transact-sql
[2]: https://technet.microsoft.com/zh-tw/library/bb522522(v=sql.105).aspx
[3]: http://www.sqlservercentral.com/articles/MERGE/103127/
[4]: http://deanma.blogspot.tw/2015/01/ms-sql-merge.html