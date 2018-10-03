title: SQLServer Partition By
categories: 程式技術筆記
tags:
  - T-SQL
  - SQLServer
description: SQLServer 次序函數筆記
toc: false
date: 2017-06-09 16:05:05
---

## Introduction
持續整理。

## Conetent
說明

> **Partition By** 引數
>  
> 將查詢結果集分成幾個資料分割。
> 視窗函數會分別套用至每個資料分割，並且針對每個資料分割重新開始計算。
> 引用自[德瑞克部落格][1]

撰寫統計分析資料時，時常需要大量的運用子查詢及[彙總函式(SUM、AYG、COUNT)][4]，結合[次序函數][5]應用的話，程式碼少了許多，也較好維護。

``` sql
SELECT
    Project.PrjStartDay
   ,Project.PrjEndDay
   ,SUM(Updateuid) OVER (PARTITION BY PrjStatus) AS 'Total'
   ,AVG(Updateuid) OVER (PARTITION BY PrjStatus) AS 'Avg'
   ,COUNT(Updateuid) OVER (PARTITION BY PrjStatus) AS 'Count'
   ,MIN(Updateuid) OVER (PARTITION BY PrjStatus) AS 'Min'
FROM dbo.Project
WHERE Project.PrjStatus = 1
```

## Reference
- [德瑞克部落格][1]
- [MSDN SELECT-OVER 子句][3]
- [MSDN 次序函數][4]
- [MSDN 彙總函式][5]

[1]: http://sharedderrick.blogspot.tw/2012/10/sql-serverwindow-ranking-functions2.html
[2]: https://dotblogs.com.tw/joysdw12/2011/12/28/63596 
[3]: https://msdn.microsoft.com/zh-tw/library/ms189461.aspx "MSDN SELECT-OVER"
[4]: https://msdn.microsoft.com/zh-tw/library/ms173454.aspx "彙總函式"
[5]: https://msdn.microsoft.com/zh-tw/library/ms189798 "次序函數"