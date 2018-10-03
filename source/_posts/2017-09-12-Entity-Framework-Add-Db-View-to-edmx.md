title: 資料庫檢視表加入至 edmx 中
categories: 程式技術筆記
tags:
  - EntityFramework
  - Asp.Net MVC
  - 'C#'
  - T-SQL
toc: false
date: 2017-09-12 23:06:21
description:
---

資料庫檢視表無法加入至 edmx 中，主要原因都是檢視表沒有索引，此處說的沒有索引是 **Entity Framework** 無法辨識而造成的，所以必須按照 **Entity Framework** 的需求設計。<!-- more -->

其實不只是檢視表 ( View Table ) ，資料表沒有索引也會造成無法加入，不過 DBA ( 資料庫管理者 )應該不會這樣搞，所以資料結構正常設計的話，應該不太會出問題，檢視表才會比較常發生。

此篇使用以前使用的 [ASPNetMVC][2] 當範例，直接在 master分支上就可以觀看到詳細過程；首先為了方便觀看對照，針對北風資料庫的 **Order**，先建立兩個檢視表
![Northwind Order](https://lh3.googleusercontent.com/Yc8XDGG6uboI0nvBxJtrQnvgiHgfrrAZLZwTT8sPdNMznuye3uxvJ6rPADnXub8OezK7iVBFeqArQOkAaNrqiPS2ltJ3-FhV1KAJgg1aCtIUym4BT8DMAuiwYH4OJAjbKI8TIRZS7p0cPC14cFRrtrEOtSrmd4bdHczLGWmX2oqm0xm3pPkoG3uDF6IpUHWE4QP0uu2gpCfndjKFNF1wbMwPYfKaDjFnrL6qdnq3ny8WXeoVb6NQWZs4jLiNGT3j1NpXQAzmogpjhkQK-VUdKFkV9jwZ77EttFf7-VNZXqMOltKmCPp-06J06MGcxf6uXnsJU-v-B2RUHjgzRRYhobxNl8aU1zcELlsDxY7wKWW_UF3i3Nh2J9FYj-QVcjB5rc53JxNCYBkNQxvc_Z5kTBuDpEeUbUiOQESIXc2-sxzloUPvSsJIRUgTUm_Y_QWK0233zg2xjfcZB5n8_X9L8SqEXkQ69Q6H2ew3lhQDkcXo63FukFh-zUgK3V0rXR6dbNsJQsWY27aDjftW0mBLxeH6O4g6nJUr5h3zHc0fjpgf9lMY0i5wvpc5w83h4BCB07fvk9PtXDMbh1HW3Fq0qGNOBcZwbixpLzVg9-SzhB_3ojY3_S12B98XtngJFXAx87bXOUvYT5RqVg8Nhb6_II1TShHLHsHRkcwgAKY9maMJxA=w487-h430-no)

兩個檢視表建立，都不加入索引
``` sql
-- 加入失敗的範例
create view uv_null_order AS
SELECT
    ROW_NUMBER() OVER (ORDER BY OrderID) AS id
   ,[OrderDate]
   ,[RequiredDate]
   ,[ShippedDate]
   ,[ShipName]
   ,[ShipAddress]
FROM Orders
GO

-- 可以順利加入的範例
create view uv_not_null_order AS
SELECT
    ISNULL(ROW_NUMBER() OVER (ORDER BY OrderID),1) AS id
   ,[OrderDate]
   ,[RequiredDate]
   ,[ShippedDate]
   ,[ShipName]
   ,[ShipAddress]
FROM Orders
GO
```
添加失敗的範例
![Add failure](https://lh3.googleusercontent.com/Ce-hSIrPwMoVQnYEhcjv-YwpHE0hCcN5wLd89z5onwdg4sLCyXa1UKKeQdrSeurZ48qCPnOPqK5FphAo3UDIyhnXb7tORYQg5DggYJRay-Byu0NqgL1g3fQZAeSIc6ya6kXPw9_f8B1qcwcsXTJy8ncAyn8Z6cXy3FBmfSfaMfIOE4sI8uKVGUpJnVdFXdg9u96gbsmoWXSRTi1IYjOKADub5N58F_9Tk-tJ0DQwY5jvbB6UuH6_FsYb6gEgJFwp7MAQn0XTYoQ6s-xDref7YaOtvA9_s_JDecu7At770JYokKRyqoNcmjW04P3dg1TWSRel8KeH9o9Q4pazpfX94Zr4prOzKXGW9PxF_CZCrzQKZnLvjvSVvRv1w-sJ2wmK7gWZtmy8DCCYZPW2o-Cs4XU7RGV4Sq5erAOrPyv-91JQ_7SVMh_abm7PvLPDdggHez-rEWV9fGd7L8n867uLyZijNiZURQ63HJ-t6lkE7fcKJBgzQHkRyfzgeErOPwrlw_skpxsR5yQHgzGVHpsN5c8nqNiYq_Dg42uOVtC6IoP1niMjYROVv9XlrWso8ivT8ct9S1xfZGL8nZubyyXKPumlFA21wAMxoxGw1Mirj43YP6EZhRWtMqD_L6e1VAhUMVnkKLevb1_iorHWdt5cLMMZAdro8kvt2MaNZJ1FxYREeg=w1204-h127-no)

添加成功的範例
![Add success](https://lh3.googleusercontent.com/3EiFHYY5dRhCdr4jeXDzFVnqZmL3SSHoOZfQUNyvOZs-LQxUAJaedeaOJhGawEIUx74i_fWHGBzlV3NmjhCwcCBjmH3uX3Hc5Ph_a_6ggBexX7THQT_UU9qDCgnTs6xxbCgJaRRjk44ERvLUTViB5UnYJkJLj3DSvBz-agPnBtkIysI9wxIGcBq3Qvlf_C3hxkd0hAXzMHd8As4EHrWh77yS9C7N1HsPsVoxJrBBl32SMgT2A4zUk6QhYQ6bIDteZ9u69oRp46RduSmAqZSMvuXCQYzf6wkZ9Htypu_ozB-xS0MqGcX_YAdAD_u5ntlcDZlsirhdF9NKTnGGSVNiqjr-cQ0GrwNNu3Mvu_ZB5BZWMMHgZ2K3oaGLDR66qUl0eBH3KyVDERvm-pLhuLXwj__mntC-Z4Fk2yVh-otoGAw8ndlTwFOgn7vR1Oh1aMna3AXxstj7E1lZnmZiY2ax0WX_1r_DmhM7oQvtPYo_HZ58vuOwMDveOKdXEpYKtnjDfyeTITlw2gZAfMfMfQp8vnBRjkY13y_aSL-0rPSyiWKIG70_kC8gP555YGWatKBMXbfIUCuH0vcr4UEk-0QMfDu1sEiD3QWsINhNmP3zDGDcYQFwZmfnoUk81e6WDqQWkmMJA-M4R-QwSY6KnO0fcarBZeXWEBDixCEHfTekj8633Q=w851-h589-no)

主要差別就在於自訂的排序編號，一個使用 **NULL** 檢查一個沒有；在 **edmx** 中，判斷是否索引的話，只會依照是否為 **NULL** 去判別，所以就算成功加入，也要仔細去設定欄位。

## 延伸閱讀
- [Will 保哥 解決 SQL Server 檢視表 (Views) 無法匯入 EDMX 的問題][1]
- [Github 的範例][2]

[1]: https://blog.miniasp.com/post/2013/11/07/Entity-Framework-and-Primary-Keys-on-Views.aspx
[2]: https://github.com/shunnien/ASPNetMVC