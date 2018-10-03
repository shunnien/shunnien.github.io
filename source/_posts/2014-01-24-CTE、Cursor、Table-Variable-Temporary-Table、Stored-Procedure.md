title: 'CTE,Cursor,Table Variable,Temporary Table,Stored Procedure'
categories: 程式技術筆記
tags:
  - T-SQL
  - SQLServer
description: 'SQLServer CTE,Cursor,Table Variable,Temporary Table,Stored Procedure 介紹'
toc: false
date: 2014-01-24 11:17:12
---

## Conetent
分別介紹 CTE,Cursor,Table Variable,Temporary Table,Stored Procedure 這幾項。

### 一般資料表運算式(**C**ommon **T**able **E**xpressions)
或稱**通用資料表運算式**；簡單來說，就是建立一個**暫存資料表**給予查詢使用，此次查詢使用之後，將會自動釋放。另外 CTE 是 **SQLServer 2005** 才開始支援 
#### 語法
``` sql
WITH expression_name [ ( column_name [,...n] ) ]
AS
( 
     --CTE_query_definition 
)
```
#### 範例
``` sql
WITH tmpOrders
AS
(SELECT
        EmployeeID
       ,COUNT(*) AS OrderCounts
    FROM Orders
    GROUP BY EmployeeID)
SELECT
    *
FROM tmpOrders;
```


- expression_name
> CTE 名稱
- column_name
> 在一般資料表運算式中，指定資料行名稱。在單一 CTE 定義內，名稱不能重複。指定的資料行名稱數目必須符合CTE_query_definition 的結果集資料行數目。
- CTE_query_definition
> 不能使用下列子句：
> - COMPUTE 或 COMPUTE BY
> - ORDER BY (除非指定了 TOP 子句)
> - INTO
> - 含有查詢提示的 OPTION 子句
> - FOR XML
> - FOR BROWSE

### 遞迴 CTE

其實我是覺得支援遞迴查詢這部份真的便利許多，雖然還是有些限制錨點部分為遞迴查詢的初始資料，使用 UNION ALL 和遞迴部分結合遞迴部分為需要反覆執行的部分

#### 語法
``` sql
WITH expression_name AS [(ColName[,...n])]
(
    --CTE_query_definition
    -- 錨點部分
    UNION ALL
    -- 遞迴部分
)
```
使用規定可以參考 MSDN  比較需要注意的是**不允許使用**的項目，遞迴成員的 **CTE_query_definition** **不允許**使用下列項目：
> - SELECT DISTINCT
> - GROUP BY
> - HAVING
> - 純量彙總
> - TOP
> - LEFT、RIGHT、OUTER JOIN (允許 INNER JOIN)
> - 子查詢
> - 適用於 CTE_query_definition 內 CTE 之遞迴參考的提示。

若遞迴成員查詢定義，對父資料行與子資料行傳回相同的值，就會建立無限迴圈。若要防止無限迴圈，可以透過 **OPTION** 子句中，設定 **MAXRECURSION** 屬性( 0 和 32767 之間的值)，來限制遞迴層級數目。資料庫的遞迴預設值是 100。 指定 0 時，不限制遞迴層級。此外 **WITH** 這個關鍵字用在許多表達式中，所以若一個 CTE 表達式的第一行不是由 WITH 開始，就必須加上**分號(semicolon)**來斷行。

#### 範例
``` sql
-- 遞迴 Recursive CTE's
;
WITH EmpCTE (EmployeeID, EmployeeFirstName, EmployeeLastName, MgrID, SalesLevel)
AS
(
    -- 錨點部分 Anchor Member (AM) 
    SELECT
        EmployeeID
       ,FirstName
       ,LastName
       ,ReportsTo
       ,0
    FROM Employees
    WHERE EmployeeID = 5

    UNION ALL

    -- 遞迴部分 Recursive Member (RM)
    SELECT
        e.EmployeeID
       ,e.FirstName
       ,e.LastName
       ,e.ReportsTo
       ,m.SalesLevel + 1
    FROM Employees AS e
    INNER JOIN EmpCTE m
        ON e.ReportsTo = m.EmployeeID)

-- 設定 MAXRECURSION 遞迴層次為 5
SELECT
    *
FROM EmpCTE
OPTION (MAXRECURSION 5)
```
![CTE Demo](https://lh3.googleusercontent.com/oOhY4U3Kbhes1a29lm5QU14T6Zh7GxcpRQk-K5d4UsQ1-lKquZcoh9JQieN6YAt7IbUndZOuQJz6ekm-me8pcAaP_WHnSa0whk7yyNwP95gGVJ-ckwOgdXmEtypUl4nNtX35mtyYSkAI6sf0bGLMj-pPpBmn3VPNCF9jp_hTM2YiEwmNbzD6GAZsmC0BSU8ANBDJeMqDKFcpVbmsA9gypl8EGqBMbR5kRt9UXCWdZ2a2QwvncVRr7pldr88KMZ33jx-6eXhjskpQGr3RbkIMn-FENEPYAUItSOvso7Jn0acPlWtyQgNFP-r7Q6P7CHNM2nSKlAsf_ad2SZXzOEN2xoJoLmJ1g8ULdxuDJyO9UMP_O3PP_BH54KJHBb8BmeNYEcvktQNga9hrAFwez-2JyJ1ARv1sXiecOyl3SO94Se5SkGcFvZjuL0pYUEAokKZeFf-miZimPupt6mP3hyhvCyLeFSvMNRXCrwMQ5x4mv5l3Cj1nK4VjnxZ18gWk44OSyWk-ryT3fbl6BF6UFI23rFGJW5ru6DS1NKo-qFWyOGx4klp4L6tXrrGVLI6AfgBVqerJIXiOj4yWVSm72LWHPDetHdXkOLPrjv5G2v6cqTp1knVXjJwEQpAJnBp61RfGxI1VrBn-0uakQJGcAD8ENNGwYFNuJqCKgQtZXMI9Pw=w448-h128-no)

### 參考資料
- [MSDN_WITH common_table_expression](http://msdn.microsoft.com/zh-tw/library/ms175972(v=sql.105).aspx)
- [TechNet_Common Table Expressions](http://technet.microsoft.com/zh-tw/library/ms190766(v=sql.105).aspx)
- [MSDN Magazine](http://msdn.microsoft.com/zh-tw/magazine/cc163346.aspx)
- [黑大_Common Table Expression](http://blog.darkthread.net/post-2007-05-23-sql-2005-t-sql-enhancement-common-table-expression.aspx)
- 介紹的蠻詳細，大力推薦 [VITO の SQL 學習筆記](http://vito-sql.blogspot.tw/2013/05/cte.html)
- [KingKong Bruce記事](http://blog.kkbruce.net/2011/01/t-sql-common-table-expression-cte.html#.UuCSLBAVGM8)
- [張小呆的碎碎唸](http://www.dotblogs.com.tw/dc690216/archive/2010/02/02/13440.aspx)
- [旗標知識網](http://www.flag.com.tw/book/cento-5105.asp?bokno=FS232&amp;id=419)
- [涛哥博客](http://wudataoge.blog.163.com/blog/static/80073886200961652022389/)
- [Microsoft REPLICATE](http://technet.microsoft.com/zh-tw/library/ms174644.aspx)
- [Microsoft OPTION](http://technet.microsoft.com/zh-tw/library/ms190322.aspx)

------

### [**Cursor**][3]

詳細說明參照[德瑞克大][1]，這邊主要紀錄一下 DECLARE CURSOR 的使用。不過很多文章都說盡量避免使用 [Cursor][3]，以免造成效能損耗，詳細原因的話可以參照[RiCo技術農場][2]與[德瑞克大][1]。

#### 範例

``` sql
 -- 建立一個暫存表  等下查看
CREATE Table #tmp
(
  id  int IDENTITY(1,1) NOT NULL,
 EpTitle nvarchar(30)
);

-- 建立Cursor 並啟用了效能最佳化的 FORWARD_ONLY、READ_ONLY 資料指標
DECLARE tmpCursor CURSOR  FAST_FORWARD  FOR 
        (select EmployeeID,Title
        from Employees);
        
-- 宣告 Cursor 等下使用的變數
DECLARE @eid int,@title nvarchar(30);
 
OPEN tmpCursor--開啟Cursor

--將第一筆資料填入變數
FETCH NEXT FROM tmpCursor INTO @eid,@title

--  @@FETCH_STATUS 傳回值
--   0  FETCH 陳述式成功。
--  -1 FETCH 陳述式失敗，或資料列已超出結果集。
--  -2 遺漏提取的資料列。
WHILE @@FETCH_STATUS = 0
BEGIN
     -- 進行想要處理的動作 
    INSERT INTO #tmp (EpTitle) VALUES(@title);
 
    -- 將下一筆資料填入變數 
    FETCH NEXT FROM tmpCursor INTO @eid,@title
END      

--關閉Cursor
CLOSE tmpCursor
--釋放Cursor
DEALLOCATE tmpCursor

-- 看一下剛剛處理後的結果
select * from #tmp

--DROP TABLE #tmp
```
![Cursor Demo](https://lh3.googleusercontent.com/WrinTSihQHLuw-F1vumZihMBahKluC9sbbJbaSqqxiEFzUAvxINFHgTi2CuAfPCr0YNbkX1dNOQDqK7Ef5ofu-myE_kKXpzg9WzE_Wl_enAxPeKoSAHf3FOSSHdJfltTaj4Z5ZGPtGij4_6ILGFI6KjSDZfPraY1MGJ7pWur2TSNB8-lY5pktDKZgyzqMZv2DLJoIpdvjlG0DNkaln0kBI6AZ2bXeJBod6s-t8nw_Utqftdatnb7kp_uCkoQcPnFTTstj51Yy86Ims0Fhs8Dx9EWE7s_pq0brwUdJT-Vfb8xtdTXnTv4yKgfHGz5PFgul3TDmXS3h6-QlEWAlUweOf7jx0J6T63UlveQwldDqIsfFz4NE7_V2ypLOQEW29UXQ4pJ2GrnyYZ4BOCJ3eoOqzf6Ur_v5IEFaApio-F4no5v-Hw1QW6QF98dSvqxxd55REsMSrSqrJ5vISWFZN0Lnc2xwijrZvxx7SAZXqDudnnrh5C_xrD3fP9_CMX-duKijzlfjkpfUvtXqCjBYh1GMu8NvKIEOcg9_eedCZ3EqjpkJKGbXRQmrxD0vPRQ-p-9ocPNyLVOgfb2c2VSoVQipW9AqikZFsJdZFcF0Dtq2JD7q5xCjlnVFybWl1ZRiJf4PFnOblcBlINoFwLNA6c-36-hNjTylDcJkMQ2cCx3ag=w382-h413-no)

### 參考資料

- [TechNet_CURSOR][3]
- [TechNet_FETCH_STATUS](http://technet.microsoft.com/zh-tw/library/ms187308(v=sql.105).aspx)
- [TechNet_DEALLOCATE](http://technet.microsoft.com/zh-tw/library/ms188782(v=sql.105).aspx)
- [TechNet_資料指標](http://technet.microsoft.com/zh-tw/library/ms181441.aspx)
- [MSDN_DECLARE CURSOR](http://msdn.microsoft.com/zh-tw/library/ms180169(SQL.90).aspx)
- [MSDN_FETCH_STATUS](http://msdn.microsoft.com/zh-tw/library/ms187308(v=sql.90).aspx)
- [德瑞克_初探Cursors(資料指標) 與資料列集(Rowsets)][1]
- [RiCo_盡量避免使用Cursor][2]

------

### **Table Variable** 與 **Temporary Table**

#### 暫存表(Temporary Tables)
暫存表名稱使用 **#** 開頭，後面接上自訂命名，當連線關閉或中斷後，此暫存表會刪除。暫存表建立後會存在於 **tempdb** 資料庫。建立方式如下:

``` sql
CREATE TABLE #TableName
(
    columnName bigint
)
```

除了 **Create** 暫存表外，還可以直接使用 **SELECT ... INTO ...** 這方式建立暫存表，資料庫會自動按照資料來源 Table 的欄位建立該暫存表。 

#### 範例
``` sql
SELECT *  INTO #temp FROM Northwind.dbo.Employees
```

![Temporary Tables Demo](https://lh3.googleusercontent.com/eeZER-3kVf5c7qO5RZs_KWS3dAWPl59urEincyrOyMf-lMTrPHK3iKCcTYXhVvpNKai4BgxTjizyKRDjbHtHYV_3EctGHmDpJqebNsGkU4nvRXtK69BD3AkmZyx71p-2NCXYp5EEu8NY4lCunAbVrgDe1DHfOQIbShDbj-AyaBhIpcnmqd8a0GHxVhT8IzqY1sPgSO_FSLyV8K-sQZP1c5_VX5XyYz3pq-o_ZibIrE7RGNEGUgISyFFsFdVztSSMnsyQN8pSxnMfjEhJ_PcvZX67hP1HxFALFzD_LiNDwZluwvB9VxKtlPnrv_iVMEZ-F4ebOyBCACLKJ5l0oA5Vy37xPyjGrTX7cg_Dt0lyKUEj7NCs8KD6lljv6XqVPIKgztt9ZfsKzFWNUlM0yIy_9JzYEocG6NGnM-d7DGS9jXmIzVE4n1DU0AaSBVwsq3bVqFkuuRGYPeayFqmeo-WfSoV1ozE1ADyg9iEWdS7HQ8ULAcKazpjUHRzQLhfj7eNitEJndFUHoKUrMiw4MBp9tZqiLBABS85r2hDFyPRDqruI3jJma5E1FvqacOsG0Qzztcxd_Bc3LkaBFlNpI-8wn_hz49Y0xn2PwBYJdmHRhSc4vRsXusuTty552NZuggAY23tFa5akklFr2XqCg1x8HxCfsokgdN3MoPn6ZvkG8g=w254-h355-no)

#### 全域暫存表(Global Temporary Tables)
暫存表名稱使用 **##** 開頭，表示這是**全域暫存表**，可以被所有連線使用者使用。一般的暫存表僅供建立該表的連線使用。至於全域暫存表的釋放與暫存表相同，是當建立此全域暫存表的連線中斷後，才會釋放。

#### 範例
產生兩個暫存資料表

``` sql
-- 全域暫存表 GTT
SELECT *  INTO ##temp FROM Northwind.dbo.Employees

-- 暫存表 TT
SELECT *  INTO #temp FROM Northwind.dbo.Employees
```

![Global Temporary Tables Demo](https://lh3.googleusercontent.com/lzzKoqAVfCWPb8RWi1HyBpPIOdKg3pU_vSzyvz_KmMoaMAVQYbI5s5irOJcuPrrDr7gY9PhSJEjtZSagLg8n9fu51tuS3q3z9EP5i21jcK3dQRD4gz1kB1BXepPobvOtnwfBfBNvrisjr1ibZzvG4AICqUyFlbqyQm-uGi_mEJg3fzJU5CRafTHLbuBS675qVm8X0h30sM1zMRpx22vzj88Nb_JeAickvHmoidE1gwi2pFKJ20BnW_0F11lw7V1Zb4tp88Cf1yeakjhAeSJCpqYhlAm6cqxB3n1ey4a3i-7N9Rvd0a2fcxy9_MWiEdnpL3qA8xmMUDmXVb2Sx37l97Jb8Zno2rTmhOCJWlOuPabq2_ECOucSBw-3i15UQ6DOZae5-enGwTBvtPIet1bmjVcvi2tJVuLXlcY2WlYPJKmf0Hf1FdpZS5AqwWMQ_sCHRjzBuPctGPG96Xh69AweHiFYpJMAw__UkeEyyTH2RLeU291ouiyEPY9lln0SEijX4zHgMmopNM3AY2y-lXj7YCJvDV9xf12x53o8KQZ-Gw8fD-tQPoHqV2O8lrni_rtPinm3-JeYsHmImHexJaag39dgdNgK0dWD6dXuwREL3gZ0QJm5fXB_BPzttiMSk9cRCKLZOBQccJwC520VEPDgyQg4czFEfs3gk0t8soExGQ=w188-h384-no)

在同一連線下 SELECT 資料，暫存表皆可讀取
![GTT the same connection Demo](https://lh3.googleusercontent.com/Veh-9_j8A7ufnJLZZGEx2zOB_vRCq9r7r0Vz9Nx5XnHAyVrtVw8mBMrsP6mUGrmFNe0nFUZPISLzi86npOglL6bLXMSs2PVoDGN0VoM1l5V8M0G4YP9ZYDuLLromXdZY89SQLbtaG7w6v1dIo7sis68p9LhTm6BugfIgr2A-ie21fwDh8Wj7p_lHi8tIqjTKUaUFg5J3rIqDbqRIxj6Pmm8zDxTdVhJ1wXh7UeqTv8ZrKy_pD8Gtpxu-Eo1etTvf2X7GT9wUY6_Yg2CP0rcwFPeKb9iKTM_MP9t36HCL87TIIv-sKIyvKzlM5sQkuN_zDsbH8sKSP79_33OsJTYfPPhAnO61Mn4KwKiTe-TkqSDaYGmTWsiZcFViOL0iDMimYC-cdssOHBs3VSuFJ0KFZVqdw9hZHCso6ZdFK1rIDBgDfvdPID-ZjXHAjN-TaIjOm0RSvQcz1hFetwa3EucODgRSBzchjA3TT3ya7BO0OvLAdv8Q2SUnSJCdLk6Jz4No-yWUGrMp10iyjnBDRz2QXtDIpiiNWjzfxwVE_6jX-kBVOPw5XBf9pAEnedIiIZ4kEKXIi8ndaYFxV6CYRDPtHinnCH3JKpB5sk_28NCXik3Ogh5T7VyrvFm5Bqp2X0oQ7_DlN4QYyF-cuYovdlJLR1RIN_E4QawvlbZQEgvnzA=w552-h626-no)

開一個新連線，一般的暫存表僅供建立該表的連線使用
![GTT other connection Demo](https://lh3.googleusercontent.com/hMGqMSTYuiQWdxIzRDB_sryyEtC_uSFTMjnO3lDUOqJhbVcKyw6ibTaBHUw4uxkNtq_OsrM3J3Sw45zlzUInbWziy4FHGGqbbjEgCleKyKvHi4sYprVvr8vMtcYg3__i0p59Y9dK5Ia2yG7HYp0jqGbEoi5BWNOrF-yxyIgj2PUS5MS9GapaAPmb6DjWiwCrHAq6IrC3FZeFs8H197R3iiOLweo-8SuRLfQoinb5mYPqPfBRa-JWNq7s2HKcdngYhvFOUlTA6ys0mopc77JHBWDKEWt26Y1e_Ty3ng0wOzPYeASgyqmXG4qmUXykh4OUWsIIU6vyRCsVA-gyAwlkvWRW2stPAq1FnIksGEmAp-mv-FWvSihvkP5o-WnM9AqZuQSRA1wk3zQjLhvHumd7dgwzNTFhj7KlylkfQMCsUqzkTHSe8IQS-LQmhL9XY0nvCRVA2tMCGBz9Ffzc3rQEB0HjY1EUp-kw7Li5yU4F9g3kHSxuPC0sG_VbamopaSRQ2wqn0LwNoxXgFE_O1pQuHnkU9o6PrJfyIMkvxoc6UuISks7qFTzN1J1ThMCDUctqu0cT_5S65rh8mkccMbTsFfJR_MivnfAD3XlUV6WDgIIZP7pLjNYwch3ahoFwoJwFa9sDBrJOTaFGplCTRMSgidhfYtrrVtsOzQ0DcTYWaQ=w1024-h385-no)

在新連線中，GTT 可以使用
![GTT on new connection Demo](https://lh3.googleusercontent.com/7OwfEZeUgYRD6W1kWP4sE4KJ_UY_xj78LQ1SQ_w60gFlYYWjflRRPoXEMv74oj9whUrvGaUBb9Uvckfn0zRB7E24WQFm7T-5Uu8mH34tzbxXecO7iSzFdgilkNqfJGDtIaHxicIgtjMVRH3P8ACacihnrRDjwFyPqEv76LRzzmeMt5XV12yq8SHPvLk3wjLe4-5f9-cByoSitKggSSJac6CQw71LWVQwx_qMax4z3QfbXI-m2IdzzJQuD4E4s3-Pq4hL_zAWborCy3zUMAvQ12xumrUupdhKs1c09TG4bFsqqBVqMLRTmE1tOML9J9nDKPF1svsJ9lgX2bAv61_ujdtFCYukosH-9FcFcJkeOhZk6W2dz7DfnA8_pdhyH-CkqfiQksCHRLyPsGLyEgaign1MSxX1YYSYXjH4Gskmd-ysopeJyTlvQUbJrS0_PkNV9IYBJQXY5zOqqkAH5rcy0WJSYjQnPw7PwFoh3Q0tkNreluhYxmfys5NTE3_2jJse09ggwrpcjoapw71B8jyOUmGEdk7BfeuWvW5Ltt5wAbzpAWeqQmS_ooBb8c6OnZQXLu3jWJSE38m0qWKgZsxmpErMv8wNQJAJu_nxgL3VwFTCmuB0UM2lFzddTnnhL0LiRlkRxIswGuY8IPFYafTLULHGe0jJhKQBU_wGNsVbRw=w571-h244-no)

#### 表格變數(Table Variables)
引用[黑暗執行緒大][4]分析的優缺點

> ##### 優點
> - 用於 Stored Procedure 時，不需要每次Recompile，速度較快
> - 比照 Local Variable，Scope 定義明確，在不需要時就立刻會被清除
> - Transaction Lock 存在時間短，也不影響實體資料庫，資料的更新操作更有效率
> ##### 缺點
> - 只支援 PK 及 UNIQUE KEY，不能建立 Non-Cluster Index，也沒有資料分佈統計機制，不利於大量資料或複雜的查詢。
> - 基於 Local Variable 的限制，使用 sp_executesql 時無法存取
> - 不支援 SELECT INTO、INSERT EXEC

結論就是，當暫存的資料筆數較小時，可使用表格變數，如果資料筆數多可使用暫存表。


### 參考資料

- [TechNet_特殊的資料表類型][5]
- [黑大的KB-SQL 2000的資料庫變數(Table Variable)][4]
- [亂馬客_Table-Variable in Transaction][6]
- [SQL SERVER – Difference TempTable and Table Variable – TempTable in Memory a Myth][7]
- [Yet Another Temp Tables Vs Table Variables Article][8]
- [暫存表(Temporary Tables)的使用簡介][9]
- [Microsoft技術支援_常見問題集-資料表變數][10]
- [Temporary Tables vs. Table Variables and Their Effect on SQL Server Performance][11]

------

### 預存程序(Stored Procedure)
當遇到一些冗長的查詢語句，建議可以使用預存程序來處理，降低網路的傳輸量。預存程序資料傳回方式：
- 使用 SELECT 以表格方式傳回。
- 設定 Output Parameter 以參數方式傳回。
- 使用 RETURN 傳回 1 個整數型別的資料。

#### 範例
搭配此篇文章主題，展示迴圈設計的範例。首先展示 WHILE 迴圈，此方式是以資料筆數的 Count 來進行迴圈設計
``` sql
--CREATE PROCEDURE dbo.SPRowIndexSample
--AS
-- 宣告 table 變數，此 @temp 資料為迴圈逐筆進行之資料

DECLARE @temp TABLE
(
    ID          INT ,  --ROW序號
    OrderID     INT,
    Employee    NVARCHAR(35)
);

-- @OutTable 為輸出暫存表
DECLARE @OutTable Table
(
  OrderID       INT,
    Employee    NVARCHAR(35)
);

-- 把資料塞到 @temp 變數裡面
INSERT INTO @temp (ID
, OrderID
, Employee)
    (SELECT
        ROW_NUMBER() OVER (ORDER BY OrderID) AS ID,
        OrderID,
        e.FirstName + '-' + e.LastName AS 'Employee'
    FROM Orders o
    INNER JOIN Employees e
        ON o.EmployeeID = e.EmployeeID
    WHERE o.OrderDate > '1998/5/1'
    )

-- 宣告變數
DECLARE
      -- @tmep 資料總筆數 
      @tempCount INT = ( SELECT
    COUNT(ID)
FROM @temp)
-- while 迴圈的逐筆資料 index
, @rowIndex int = 1
, @OrderId int
, @Employee nvarchar(35);

WHILE @rowIndex <= @tempCount
BEGIN

--透過 @tempCount ID 取得欲使用的欄位值
SELECT
    @OrderId = OrderID,
    @Employee = Employee
FROM @temp
WHERE ID = @rowIndex

-- 想要處理的動作 Start --
INSERT INTO @OutTable (OrderID
, Employee)
    VALUES (@OrderId, @Employee)
-- 想要處理的動作 End --

-- 設定 while 條件，跑下一筆
SET @rowIndex = @rowIndex + 1

END

-- 取出
SELECT
    OrderID,
    Employee
FROM @OutTable
--GO
```

接著是使用字串分割方式進行迴圈設計，不過這方式在字串變數長度小於要進迴圈的資料長度時，很容易會因為資料截斷產生誤差。

``` sql
--CREATE PROCEDURE dbo.SPStrSplitSample
--AS

-- 宣告字串變數，@strID 為資料來源的 OrderID 組合字串
-- @CurId 為迴圈進行的當下 OrderID
DECLARE @strOID NVARCHAR(2000), @CurOId NVARCHAR(10);

SET @strOID = '';
SELECT @strOID = @strOID + convert(VARCHAR, OrderID) + ','
FROM
  Orders
WHERE
  OrderDate > '1998/5/1';

-- @OutTable 為輸出暫存表
DECLARE @OutTable Table
(
  OrderID       INT,
    Employee    NVARCHAR(35)
);

-- 透過字串長度進行迴圈
WHILE LEN(@strOID) > 0
BEGIN

-- 擷取 OrderID
SET @CurOId = substring(@strOID, 1, charindex(',', @strOID, 1) - 1);
-- 想要處理的動作 Start --
INSERT INTO @OutTable (OrderID
                     , Employee)
SELECT OrderID
     , e.FirstName + '-' + e.LastName AS 'Employee'
FROM
  Orders o
  INNER JOIN Employees e
    ON o.EmployeeID = e.EmployeeID
WHERE
  OrderID = @CurOId;
-- 想要處理的動作 End --

-- 剃除完成的 OrederID，讓迴圈跑下一筆
SET @strOID = right(@strOID, len(@strOID) - charindex(',', @strOID, 1));

END

-- 取出
SELECT OrderID
     , Employee
FROM
  @OutTable
--GO
```
![string split loop Demo](https://lh3.googleusercontent.com/HSCOWXnY1k3OH7OiL_exhRFl3s373LDxUpoXjjJKx7tk1VPjXTDI4ZbMhzrfccbHEQrk9SVlQ5shB9qyrvoXkIwWsqjaf7MHgE_5kNi6znHqouDE-16J-oqPgze-nz1CHASRyKZoMW-OF9p3ToNuKUcShZzyXVMqAaiJPH_Ltw3pIlwdjUBjgzk0IU0aDMPzSrG7EgPY8wySq8EednO1PbTJWR41QQcObR7kI2tpATAegG2sz3jenm8devGywv-LioOnThtH26zLaTRp4HWjOSQSz5FzHfQbSkIByU0ZUbHfeo9teS1zfK7dWboMG9Yao4QhHnWVEjhaXYzB6Bl5caX3KyOoCEwren7sHAW2RiholkaMxYEC_E09c1hIJ9VJp9-aw-c2Jv8BWmTHKZN22l3I3O4tu3Rdpvtakc2g0Rg34P6KXUt0cOhfPa0z-LMW_lILqw4EtMf6z43oW-rPTJJppTGGiVoosmSbPkpJPxZsvXD73b9t297HtrKiDk9bvR49FclyA4BHqnrkDkQ2O9ZaGIPZ_N9xM1BZT41DH86h-9vERgB9PQ31glXXXIiUHN64vTLHPZFQiQvaSTcVPC70qmXJGj91FCiaoWkKxjq4nFmHi1H2fjeCD0SNGNbpAAvJIOpu1NXGtMNchrrmeaAAxvceoUYen1hI4nZAWg=w600-h370-no)
![string split loop error Demo](https://lh3.googleusercontent.com/C-AOQ0mf7hx1-7aWY5NanELvxXC9lGcvuxtIGiBVQzBaKqHCSg_b6kS7M_5I3m4cSwvDmPMYKfxNMjd1Ok8PgnBGElvbC-eeTpUUjWVhbZzFJeVjwz1JzbTtN6-N-z4yZMjkvBmwqH1DcXeYkYEhS_fwf3Ee6NVCZ5cZMQOUZQOz2mdIFFWglZYXu5gDcHZVlHyfe5R_czmRfrKL1FBQg9KBZOKeDFsBXV13GJuc_rSn1OIKaC5zVcP3H1eELyT1e4siPx07Y5AuP50iH5LnjoVwylG1tfQXBqIKWPSn8Owqo-DluMHCITAj0d-CB87P8r6HtnVxX4_dNI8y8AgvSBqQm_1-zYJjE-PZVp6DGtI32lfxXB5OD1wU529rQkJNfsxjI7Ka9p9d0EXIkkGEUZuGxKep6Q6PAkhdYD4VsgUrhlsv0E0KDGmVh2ABaE5SFdfY0YD0kuZd5Tpbh3olMH8n7rFRF0GJHxtHz_EcDpEsL70QKO66vCSHA3lVde3k9DTRzk58BDaeWZZm7ZBjc8GddTPsSUBnDfsL_m3A9dF6R2YbpZmAZKYnHGEbtPSMj_OhaR1k0UteJi57xUUJwCvumVciFbQ-7F2YSzcmF2VS-fHkq0R0Av3cKi4MxBNSMBBuRxPu2TRqd4Z9sS0kWV50cyC86Va6w6NVoV6JgQ=w587-h352-no)
最後展示接收**預存程序**的**回傳值**與**回傳參數**，如果**預存程序**使用表格方式輸出結果，那就要用表格參數或是暫存表去接收。

``` sql
 -- 接收預存程序回傳值
CREATE PROCEDURE SPDemo
(
    @Param1    int
   ,@Param2    varchar(100) OUTPUT  -- 回傳參數設定 OUTPUT
)
AS

IF ISNULL(@Param1,0)> 5
    BEGIN
SET @Param2 = 'the value is greather then 5 '
    END
ELSE
    BEGIN
SET @Param2 = 'the value is less then or equal to 5 '
    END

-- 回傳值
RETURN @Param1
GO
--==============================================
-- @OutputParameter 回傳參數
-- @ReturnValue 回傳值(僅能整數型別)
DECLARE @OutputParameter  varchar(100)
       ,@ReturnValue      int

EXEC @ReturnValue = SPDemo 8,@OutputParameter OUTPUT
PRINT @ReturnValue
PRINT @OutputParameter
```

![return Demo](https://lh3.googleusercontent.com/1X42ck7PyMxHmwIWZuAqJ4ieQ47qa4OFbqeX7f_UZrMduJ027oVE1OqJKL59JJ7coCZRmNnuFM1JMCO8c8Pwh2P9iHJ7TOZzds70fnF0GTUDI9Yh-DOguGWl8yy1npAgkaAF7u5nUpINXJL1VsO9cqxhSbjTu0Y58KksBTtdj7f8pVt5fb5UQr0biyyP5pBAaqsFSLsR-n06PFJqJHvbpUQX694fCgHX42EXaSL7swwxAoSrdKOM-SD2VG6enHxH9MIFR49sdO_mLF1_zkjptpHbykekUvDYaZEQEemU2qVKqSxY6PVhiDe70tfYATVgk43sut-TnXywU7YWdrnphIB2xStuG0xk0qG0AaLd6Ulc3O6o8GViWt3mSe5rWvV7TMv8X-GaIiCG7TH7Kwu5hfwVI_jev6DKB73CKrbczNeIWo55L15r_FdzghtjFrKD7idHM8Rh9Bg6SALLBDoC631rZX7sfNUeNkjvZUEujykN_G2cqVJRr7UxZL71IO81f9vvK3hc5_1sTZScjIlPVE-6ZBiEcTG03xbeY9E6gYQPF1eDYgNt0gjSeSv6BdHFSMsVgB3aJecDAwEwc6Iv94hcYIT5TRtl0bgJz_IH9K0BnR_NZKncccgW41_GP4Utf3ULmqkJ140P7KD5DK43ribmQZ4Te7qV4tidPXBYjA=w533-h237-no)

### 參考資料
- [TechNet_Stored Procedures 事件類別目錄](http://technet.microsoft.com/zh-tw/library/ms188275.aspx)
- [walter 心得筆記_接收 Store Procedure 的傳回值](http://www.dotblogs.com.tw/walter/archive/2009/07/04/how-to-get-store-procedure-return-value.aspx)
- [RiCo技術農場_撰寫Stored Procedure小細節](http://www.dotblogs.com.tw/ricochen/archive/2011/06/23/29628.aspx)
- [小信豬的原始部落_Stored Procedures](http://godleon.blogspot.tw/2008/12/oracle-stored-procedures.html)
- [如意網站 SQL 教學網_預存程序](http://yes.nctu.edu.tw/sql/StoredProcedure/StoredProcedure.htm)
- [如意網站 SQL 教學網_預存程序](http://yes.nctu.edu.tw/sql/StoredProcedure/StoredProcedure.htm)

## 備註
- 範例皆使用 SQL SERVER 2008 R2 做為測試

[1]: http://sharedderrick.blogspot.tw/2013/02/cursors-rowsets.html "德瑞克_初探Cursors(資料指標) 與資料列集(Rowsets)"
[2]: https://dotblogs.com.tw/ricochen/archive/2010/11/09/19323.aspx "RiCo_盡量避免使用Cursor" 
[3]: http://technet.microsoft.com/zh-tw/library/ms180169(v=sql.105).aspx "TechNet_CURSOR"
[4]: http://blog.darkthread.net/post-2006-08-08-kb-sql-2000-table-variable.aspx "黑大的KB-SQL 2000的資料庫變數(Table Variable)"

[5]: http://technet.microsoft.com/zh-tw/library/ms186986(v=sql.105).aspx "TechNet_特殊的資料表類型(Table Variable)"
[6]: http://www.dotblogs.com.tw/rainmaker/archive/2012/05/02/71932.aspx "亂馬客_Table-Variable in Transaction"
[7]: http://blog.sqlauthority.com/2009/12/15/sql-server-difference-temptable-and-table-variable-temptable-in-memory-a-myth/ "SQLSERVER_Difference TempTable and Table Variable"
[8]: http://sqlserverplanet.com/tsql/yet-another-temp-tables-vs-table-variables-article "Yet Another Temp Tables Vs Table Variables Article"
[9]: http://cbw0731.pixnet.net/blog/post/24993864-%E6%9A%AB%E5%AD%98%E8%A1%A8(temporary-tables)%E7%9A%84%E4%BD%BF%E7%94%A8%E7%B0%A1%E4%BB%8B "暫存表(Temporary Tables)的使用簡介"
[10]: http://support.microsoft.com/?kbid=305977 "Microsoft技術支援_常見問題集-資料表變數"
[11]: http://www.sql-server-performance.com/2007/temp-tables-vs-variables/ "Temporary Tables vs. Table Variables"