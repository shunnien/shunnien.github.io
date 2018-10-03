title: ASP.Net MVC 5 中 Model 的 MetaData
categories: 程式技術筆記
tags:
  - Asp.Net MVC
toc: false
date: 2017-07-31 15:33:52
description:
---


前一篇文章提到資料表的對應是自動產生，所以一般不會針對這些自動產生的檔案去做修改，因為當資料表有所異動，需要重新自動產生檔案的時候，這些修改就需要重新撰寫一次，萬一疏漏了就有可能出問題<!-- more -->。
**MetaData** 最常使用的是資料驗證，在資料進入資料庫前都會進行驗證，但是又不能再對應類別檔案上撰寫，這時候就可以使用 **MetaData** ；或是想手動去變動 T4 檔案也可以，這也是一個做法。

一樣使用範例來說明：

- 以 Northwind 的 OrderDetail 資料表的對應類別進行範例，先看產生的對應檔案
``` csharp
public partial class Order_Details
{
    public int OrderID { get; set; }
    public int ProductID { get; set; }
    public decimal UnitPrice { get; set; }
    public short Quantity { get; set; }
    public float Discount { get; set; }
    public virtual Orders Orders { get; set; }
}
```

- 因為這些自動產生的對應檔案都是 **[partial class][2]** ，所以就可以建立一個相同對應類別的 **[partial class][2]** ，範例使用 DisplayName 進行示範。
``` csharp
// 注意 namespace 必須跟 model 的相同
// 相同 namespace 才能 partial
namespace ModelExt.Models
{
    [MetadataType(typeof(Order_DetailsMetadata))]
    public partial class Order_Details
    {
        public class Order_DetailsMetadata
        {
            [DisplayName("單價")]
            public decimal UnitPrice { get; set; }
            [DisplayName("數量")]
            public short Quantity { get; set; }
            [DisplayName("折扣")]
            public float Discount { get; set; }
        }
    }
}
```

## 參考資料
- [github 範例][1]

[1]: https://github.com/shunnien/ASPNetMVC/tree/modelMetadata
[2]: https://docs.microsoft.com/zh-tw/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods