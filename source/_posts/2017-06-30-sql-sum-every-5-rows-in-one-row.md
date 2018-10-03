title: SQL 按照資料中的數值去分隔計算
categories: 程式技術筆記
tags:
  - T-SQL
  - SQLServer
toc: false
date: 2017-06-30 14:38:37
description:
---

朋友有個需求，其資料類似以下所示，LCount 與 NCount 是某些資料的計算結果，其目的是將 LCount 按照 5 的倍數區分群組，例如: 11～15、16～20、21～25...之類的，再去合計 NCount。<!-- more -->

|LCount|NCount|
|:---:|:---:|
|11|1|
|12|2|
|13|3|
|14|4|
|15|5|
|16|6|
|17|7|
|18|8|
|19|9|
|20|10|
|26|11|
|36|12|
|40|13|
|44|14|
|45|15|
|128|16|

那這個其實就還是 group by 的問題，但是可以使用 **SUM() OVER** 加上 **Partition by** 來快速取得合計結果，作法如下。
``` sql
SELECT
    LCount
   ,NCount
   -- rn 是分組的編號
   ,RANK() OVER (ORDER BY ((LCount - 1) / 5)) AS rn
   ,SUM(NCount) OVER (PARTITION BY ((LCount - 1) / 5)) AS 'Total'
FROM tempdemo
```

呈現的結果如下，Total 就是合計的結果。

|LCount|NCount|rn|Total|
|:---:|:---:|:---:|:---:|
|11|1|1|15|
|12|2|1|15|
|13|3|1|15|
|14|4|1|15|
|15|5|1|15|
|16|6|6|40|
|17|7|6|40|
|18|8|6|40|
|19|9|6|40|
|20|10|6|40|
|26|11|11|11|
|36|12|12|25|
|40|13|12|25|
|44|14|14|29|
|45|15|14|29|
|128|16|16|16|

## 參考資料
[SQL fiddle 範例](http://sqlfiddle.com/#!6/43834/23)
- [msdn 論壇][1]

[1]: https://social.msdn.microsoft.com/Forums/sqlserver/en-US/71e3149e-7d6c-4de6-be35-c50ac0a7540d/sum-every-20-rows-in-one-row?forum=sqlreportingservices