title: DataReader.GetFieldType(int) returned null
toc: false
date: 2017-04-04 14:56:10
categories: [程式技術筆記]
tags: [Troubleshooting, C#]
description: 發生 DataReader.GetFieldType(int) returned null 錯誤訊息
---
## 問題
開發完成的網站應用程式，在測試機運行都是正常，但在正式機時，發生了 HTTP 500 錯誤，錯誤訊息如下

```
Exception information:
    Exception type: InvalidOperationException
    Exception message: DataReader.GetFieldType(5) returned null.
```

## 原因
依據這個錯誤訊息，查找一下微軟論壇上的討論，確認應該是應用程式使用了 Sql Server 的部分元件，因此需要將此元件註冊；但是因為此專案主要是使用 Geomerty 型別產生的問題，所以比較符合 Huan-Lin 老師的[此篇文章][1]，需要在正式機的電腦上額外安裝 **Sql Server Featrue Pack**，版本按照各自使用的資料庫版本安裝


## 解決方式
請到[微軟][3]網站搜尋 **SQL Server Feature Pack**，取得[搜尋結果][2]，然後找尋符合自己資料庫的版本選取下載，我的版本是 *SQL Server 2014*，所以在下載列表中選取 **SQLSysClrTypes** 這檔案，在不同*Sql Server* 版本中名稱會有稍微不同，主要就是找尋 **CLR Types** 的元件擴充就是了。


## 參考資料
- [Huan-Lin DataReader.GetFieldType(5) returned null
][1]
- [Microsoft SQL Server Feature Pack][2]

[1]: http://huan-lin.blogspot.com/2012/08/datareadergetfieldtype5-returned-null.html "Huan-Lin DataReader.GetFieldType(5) returned null"
[2]: https://www.microsoft.com/en-us/search/result.aspx?q=SQL+Server+Feature+Pack&form=dlc "Microsoft SQL Server Feature Pack"
[3]: https://www.microsoft.com/zh-tw/ "Microsoft"