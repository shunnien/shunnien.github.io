title: 將多列資料合併 使用 For XML Path
categories: 程式技術筆記
tags:
  - T-SQL
  - SQLServer
toc: false
date: 2014-02-25 15:17:38
description:
---

資料庫資料表中，想要將同一資料欄的資料合併顯示時，可以考慮採取 使用 for xml path 。以下進行範例說明：<!-- more -->

首先[範例資料][4]如下：

|OrderID|ProductID|UnitPrice|Quantity|Discount|
|:---:|:---:|:---:|:---:|:---:|
|10248|11|14|12|0|
|10248|42|9.8|10|0|
|10248|72|34.8|5|0|

想要把同個 OrderID 資料的 ProductID 和 UnitPrice 合併在一起顯示的時候，使用 for xml path
``` sql
SELECT
    ',' + CAST(ProductID AS VARCHAR) + '--' + CAST([Quantity] AS VARCHAR)
FROM OrderDetails
FOR XML PATH ('')
```
其[呈現結果](http://sqlfiddle.com/#!6/bc7ef/4)如下
`,11--12,42--10,72--5`

這個組合出來的字串，最前面會多出一個 **comma**(逗號，)，所以將多餘的分隔符號用 [**stuff**][1] 移除，其語法如下，或是觀看[線上範例](http://sqlfiddle.com/#!6/bc7ef/6)
``` sql
select [OrderID], stuff(mergingOd.pu,1,1,'') combineStr
from
(
    select  [OrderID],
    (
        SELECT
               ',' +cast(ProductID AS VARCHAR) + '--' + Cast([UnitPrice] AS VARCHAR )
          FROM OrderDetails
          WHERE [OrderID]=od2.[OrderID]
          for xml path('')
    )  pu
    from OrderDetails  od2
    GROUP BY [OrderID]
) as mergingOd
```
資料呈現

|OrderID|combineStr|
|:---:|:---:|
|10248|11--14.00,42--9.80,72--34.80|

如果不轉換字串，直接使用 For XML Path 的話，那就會轉換成 XML，而 XML 的節點名稱是可以改變的
[線上範例](http://sqlfiddle.com/#!6/bc7ef/8)
``` sql
ELECT
    CAST(ProductID AS VARCHAR)
FROM OrderDetails
FOR XML PATH ('pid')
```
資料呈現
`<pid>11</pid><pid>42</pid><pid>72</pid>`

## 參考資料
- [Microsof Docs STUFF][1]
- [Microsof Docs For XML 使用 PATH 模式][2]
- [Microsof Docs FOR XML 子句的基本語法][3]
- [Sqlfiddle 線上範例][4]

[1]: https://docs.microsoft.com/en-us/sql/t-sql/functions/stuff-transact-sql
[2]: https://docs.microsoft.com/zh-tw/sql/relational-databases/xml/use-path-mode-with-for-xml
[3]: https://docs.microsoft.com/zh-tw/sql/relational-databases/xml/basic-syntax-of-the-for-xml-clause
[4]: http://sqlfiddle.com/#!6/d70bc/1/0 "sample origin data"