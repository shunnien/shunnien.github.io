title: SQLServer 的觸發程序
categories: 程式技術筆記
tags:
  - T-SQL
  - SQLServer
description: SQLServer Trigger 的筆記
toc: false
date: 2017-06-10 20:59:49
---

## Introduction
簡單介紹 [Trigger][1] 的撰寫

## Conetent
觸發程序可以設定在 table 異動或是欄位資料異動，而當 table 資料異動的時候，可能有新增、刪除、修改等情況，在 SQLServer 中，異動的時候會產生暫存的 **inserted** 和 **deleted** 兩個 table ，兩個 table 格式資訊皆與原 table 相同；
- **inserted** table 紀錄新增資料、修改後資料
- **deleted** table 紀錄刪除資料、修改前資料

以下範例展示該資料表異動的時候新增、修改或刪除的判斷。

``` sql
-- =============================================
-- Author:                      Allen.YU
-- Script Version:              1.0
-- MSSQL Version:               20012+
-- Create Date:                 yyyy-MM-dd
-- Update Date:                 yyyy-MM-dd
-- Description:                 description
-- =============================================
CREATE TRIGGER [dbo].[trigger_name] ON [dbo].[yourTable] 
-- 指定要觸發的狀態
    FOR INSERT,UPDATE,DELETE
AS 
BEGIN

-- 當 SET NOCOUNT 爲 ON 時，不返回計數（表示受 Transact-SQL 語句影響的行數）
SET NOCOUNT ON;

-- 以下 為 inserted 和 deleted 皆有資料表示為 UPDATE 狀態
-- 或是使用 UPDATE(columnName) 針對欄位名稱判斷
-- 指定某一欄位名稱是否修改狀態
IF (UPDATE([DataType]) and 
EXISTS (SELECT
        1
    FROM inserted)
AND EXISTS (SELECT
        1
    FROM deleted)
)
BEGIN
PRINT '--- update 修改狀態 ---';
-- 撰寫要變動的 code
END

-- 以下 為 inserted 有資料 deleted 無資料表示為 INSERT 狀態
ELSE
IF EXISTS (SELECT
            1
        FROM inserted)
    AND NOT EXISTS (SELECT
            1
        FROM deleted)
BEGIN

PRINT '--- create 新增狀態 ---';
-- 撰寫要變動的 code
END

-- 以下 為 inserted 無資料 deleted 有資料表示為 DELETE 狀態
ELSE
IF NOT EXISTS (SELECT
            1
        FROM inserted)
    AND EXISTS (SELECT
            1
        FROM deleted)
BEGIN
PRINT '--- delete 刪除狀態---';
END

END
```

## Reference
- [MSDN Trigger][1]

[1]: https://msdn.microsoft.com/zh-tw/library/ms189799.aspx