title: 清除資料庫的快取
categories: [程式技術筆記]
tags:
  - SQLServer
  - T-SQL
description: 清除 Sql Server 快取
toc: false
date: 2017-05-09 22:55:38
---

## Introduction
以前不知道哪學來的作法，現在補充一下實際說明。

## Conetent
一般來說，幾乎不會用到，只有在測試效能的時候，需要執行前後比較，才會使用到這些。
附上一些名詞說明。
- Clean Buffer
> data page cache 沒有修改過的
- Dirty Buffer
> data page cache 已修改過但未被寫入至磁碟中的部份
- Cold Buffer Cache
> data page 還沒載入 memory 中，需要從磁碟讀取
- [FREESYSTEMCACHE][2]
> 會清空Procedure的最佳化的計劃，重新執行重新產生新的執行計劃(不要亂用)
- [FREESESSIONCACHE][3]
> 排清散發查詢對 Microsoft SQL Server 執行個體所用的散發查詢連接快取。
- [FREEPROCCACHE][4]
> 從計畫快取移除所有元素；
- [DROPCLEANBUFFERS][5]
> 僅清除 **data page cache** 沒有修改過的，**data 

page cache** 已修改過但未被寫入至磁碟中的部份，無法被清除；

``` sql
CHECKPOINT; 
DBCC FREESYSTEMCACHE ('ALL');
DBCC FREESESSIONCACHE;
DBCC FREEPROCCACHE;
DBCC DROPCLEANBUFFERS
```

## Reference
- [關於清除 SQL Server 查詢快取的那些事][1]
- [Microsot FREESYSTEMCACHE][2]
- [Microsot FREESESSIONCACHE][3]
- [Microsot FREEPROCCACHE][4]
- [Microsot DROPCLEANBUFFERS][5]
[1]: http://ithelp.ithome.com.tw/articles/10187558
[2]: https://msdn.microsoft.com/zh-tw/library/ms178529.aspx
[3]: https://msdn.microsoft.com/zh-tw/library/ms187781.aspx
[4]: https://msdn.microsoft.com/zh-tw/library/ms174283.aspx
[5]: https://msdn.microsoft.com/zh-tw/library/ms187762.aspx