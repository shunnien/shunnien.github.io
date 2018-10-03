title: Entity Framework 6 建立資料庫 Function 的對應
categories: 程式技術筆記
tags:
  - EntityFramework
  - Asp.Net MVC
  - 'C#'
  - SQLServer
  - T-SQL
toc: false
date: 2017-08-15 16:57:47
description:
---

有朋友在問這方面的問題，直接整理一下資料，針對 **[Entity Framework][2] 6** 的 **[DataBase First][3]** 的處理對應。<!-- more -->使用之前文章的 [**Github** 範例][1]，不過先調整一下範例的資料庫連接方式，將資料庫連接方式變動為使用 **LocalDB** ，這些方式就不再贅述，以下進入正題。
因為範例使用的 **Northwind** 資料庫沒有 **Function**，所以建立二個 DB Function ，方便後續的測試，如以下的範例。

``` sql
-- =============================================
-- Author:                      Allen.YU
-- Script Version:              1.0
-- MSSQL Version:               20016
-- Create Date:                 2017-08-15
-- Update Date:                 2017-08-15
-- Description:                 範例 Db function 計算單價 X 數量 X 折扣
-- Param name="@OrderID":       對應 OrderDetail OrderID
-- Param name="@ProductID":     對應 OrderDetail ProductID
-- =============================================
CREATE FUNCTION fn_TotalPrice (@OrderID int,@ProductID int)
RETURNS decimal AS
BEGIN
    DECLARE @totalPrice decimal;
SET @totalPrice = (SELECT
        [UnitPrice] * [Quantity] * (1- [Discount])
    FROM [Order Details] WITH (NOLOCK)
    WHERE [OrderID] = @OrderID
    AND [ProductID] = @ProductID)

    RETURN @totalPrice
END

GO

-- =============================================
-- Author:                      Allen.YU
-- Script Version:              1.0
-- MSSQL Version:               20016
-- Create Date:                 2017-08-15
-- Update Date:                 2017-08-15
-- Description:                 範例 Db function 計算此訂單有幾樣商品
-- Param name="@OrderID":       對應 OrderDetail OrderID
-- =============================================
CREATE FUNCTION fn_TotalProductQuan (@OrderID int)
RETURNS tinyint AS
BEGIN
    DECLARE @result tinyint;
SET @result = (SELECT
        Count(*)
    FROM [Order Details] WITH (NOLOCK)
    WHERE [OrderID] = @OrderID)
    RETURN @result
END
GO
```

資料庫有了 function 後(如下圖)，就可以更新 **Edmx** 檔案，更新後如下。
![DataBase Function](https://lh3.googleusercontent.com/qfgGJRAJUTDFCqKn8Jy4-ontuvjbZLCJiQt47LSAXLrUsOo-auWB_fGzAPVHzjrJ8ukRiza9ze9psQGmBVF_QKzdpxX7UmEtV3Cmu1sUC8ret6UTwyQfHKVLBMoNNN-GpzPV9f2GE4VpjKttK47fQrXQh8MZuh7B1Gx92k-bDYzksSNVDFdekrwlfdBF8lYmcX_Y_fp4xZPNEsiMBhE5lHJV0rw3spstLJ94nT7ervyuQDbVAUb6OFDDcOLh6KUKTuUSxCyAaVkvgyKXRbBQJ6txfQDgELtrdjNjlDiQ7QxmvFrlTQb063a1KApYBy6VfHyV2C_dnU_1ij4dQpBg11tnn4CFSyA9-nsOPjhK2UQ8O5Sz5ugqZbDv_cwixz89EHIoiai1jPq7gIyQ12N8trf_8O4ZHKA548SvgtXAMdh3vcVbOMAejjEh4swr-QX5MvUjuHZTGnlyRFltD-G7eICsLIxt3z8TFvopj-hAcblojENFqB4qeVjcs19xZIg0ei4NNWvWUNoQnzBKKzYPUCKlBvFkXZyQXdjI3rfiurT8DQD8JFo5woqy3Wg4VewtaeAcUiuQUAWEtJfywBxtGvrteeqhef-Y3pYo6VWPc_MJkqmkKW0m7AKrMtYgiApNFOt7S94YCY5crvdr7PAoq1CNwC8tYyxFuEK2a-kHydVcWQ=w333-h182-no)
![Edmx update](https://lh3.googleusercontent.com/VImdi3AGaIk9BhGznLKmaq_377mmKd6QAm-LcFIuXWaf5BBglrxuJd5zUYf43IKqM3LWwsT0BuWack19JjTKyP7bMw3tPv_jtRIdpCQj_BBexHGzWvjm85L7miNVNTNP1uk0S93zp_5jQgRV-aCGUcz1L-kGF8TQV9zfT7FUxUbZDgkLCqgy-3GAZLuAWZhZJsmWo2CxSmGoXTkxo5FcF59to4Wg4Vz78ZL9D1IQTGVtMneFlUjM56X4JcojtPyxbybuKEOufC2RYCRWsNOjTUu3kFx2LaFi41kXWqdv5bQaZLto67IL2fR_Kj4OeAdJgzOn2jRRNSZaIGe38FIsU3lDsgxcQacOGQsYOCUpnJ3Im7Mas21bAMcb_xwNFZ1RJRV6TAY90MNe5O_Bw-vAZPMAJBD6cOXqifwxPz1V1UpCfw8aklsTCAbL-cACKp11U2rTNcHs-DUwsFhBD8XlYS7VVsH6KQEs2iLSlDE1C3P22i7k6cBUbHvjnraoiEs01VldgXMEdX1RzSWcy1PI09KXn4_9a0qPRWGQ2cAxzT65r61PD_x4XSJry-mZX3e_7zdiiArgLNrCDpx1LdU2YcsTLbbcGnF-0kzapxY6zhNZjuetILmf-0qld3JOaVfzY9ZfkinWIlzTLRX381vhHlErZtUFanZQyUj9TYC6A893Hw=w332-h246-no)

之後就可以撰寫 DbFunction 對應，其寫法可以針對 **DbContxt** 使用 **partial class** 擴充，或是撰寫**靜態擴充方法**。

### partial Class 擴充

``` csharp
// 針對 DbContxt 去撰寫 partial class
public partial class NorthwindEntities
{
    /// <summary>
    /// Functions the total price.
    /// </summary>
    /// <param name="orderId">The order identifier.</param>
    /// <param name="productId">The product identifier.</param>
    /// <returns>System.Nullable&lt;System.Decimal&gt;.</returns>
    [DbFunction("NorthwindModel.Store", "fn_TotalPrice")]
    public decimal? Fn_TotalPrice(int orderId, int productId)
    {
        var parameters = new List<ObjectParameter>(2)
        {
            new ObjectParameter("OrderID", orderId),
            new ObjectParameter("ProductID", productId)
        };

        var lObjectContext = ((IObjectContextAdapter)this).ObjectContext;
        var output = lObjectContext.
            CreateQuery<decimal?>("NorthwindModel.Store.fn_TotalPrice(@OrderID, @ProductID)", parameters.ToArray())
            .Execute(MergeOption.NoTracking)
            .FirstOrDefault();
        return output;
    }

    /// <summary>
    /// Functions the total product quan.
    /// </summary>
    /// <param name="orderId">The order identifier.</param>
    /// <returns>System.Nullable&lt;System.Int32&gt;.</returns>
    [DbFunction("NorthwindModel.Store", "fn_TotalProductQuan")]
    public int? Fn_TotalProductQuan(int orderId)
    {
        var paramter = new ObjectParameter("OrderID", orderId);
        var lObjectContext = ((IObjectContextAdapter)this).ObjectContext;
        var output = lObjectContext.
            CreateQuery<int?>("NorthwindModel.Store.fn_TotalProductQuan(@OrderID)", paramter)
            .Execute(MergeOption.NoTracking)
            .FirstOrDefault();
        return output;
    }
}
```

使用 **Order_DetailsController** 來呈現
``` csharp
private NorthwindEntities db = new NorthwindEntities();
public ActionResult Index()
{
    var order_Details = db.Order_Details.Select(o => new OrderDetailViewModel()
    {
        OrderID = o.OrderID,
        ProductID = o.ProductID,
        UnitPrice = o.UnitPrice,
        Quantity = o.Quantity,
        Discount = o.Discount,

        // 使用 partial class
        TotalPrice = db.Fn_TotalPrice(o.OrderID, o.ProductID).Value
    });
    return View(order_Details);
}
```

### 靜態擴充方法
針對 **DbContext** 去撰寫**靜態擴充方法**
``` csharp
/// <summary>
/// Statics the function total price.
/// </summary>
/// <param name="db">The database.</param>
/// <param name="orderId">The order identifier.</param>
/// <param name="productId">The product identifier.</param>
/// <returns>System.Nullable&lt;System.Decimal&gt;.</returns>
[DbFunction("NorthwindModel.Store", "fn_TotalPrice")]
public static decimal? StaticFn_TotalPrice(this NorthwindEntities db,int orderId, int productId)
{
    var parameters = new List<ObjectParameter>(2)
    {
        new ObjectParameter("OrderID", orderId),
        new ObjectParameter("ProductID", productId)
    };

    var lObjectContext = ((IObjectContextAdapter)db).ObjectContext;
    var output = lObjectContext.
        CreateQuery<decimal?>("NorthwindModel.Store.fn_TotalPrice(@OrderID, @ProductID)", parameters.ToArray())
        .Execute(MergeOption.NoTracking)
        .FirstOrDefault();
    return output;
}

/// <summary>
/// Statics the function total product quan.
/// </summary>
/// <param name="db">The database.</param>
/// <param name="orderId">The order identifier.</param>
/// <returns>System.Nullable&lt;System.Int32&gt;.</returns>
[DbFunction("NorthwindModel.Store", "fn_TotalProductQuan")]
public static int? StaticFn_TotalProductQuan(this NorthwindEntities db, int orderId)
{
    var paramter = new ObjectParameter("OrderID", orderId);
    var lObjectContext = ((IObjectContextAdapter)db).ObjectContext;
    var output = lObjectContext.
        CreateQuery<int?>("NorthwindModel.Store.fn_TotalProductQuan(@OrderID)", paramter)
        .Execute(MergeOption.NoTracking)
        .FirstOrDefault();
    return output;
}
```

一樣使用 **Order_DetailsController** 來呈現
``` csharp
private NorthwindEntities db = new NorthwindEntities();
public ActionResult Index()
{
    var order_Details = db.Order_Details.ToList().Select(o => new OrderDetailViewModel()
    {
        OrderID = o.OrderID,
        ProductID = o.ProductID,
        UnitPrice = o.UnitPrice,
        Quantity = o.Quantity,
        Discount = o.Discount,
        // 靜態擴充方法
        TotalPrice = db.StaticFn_TotalPrice(o.OrderID, o.ProductID).Value
    });
    return View(order_Details);
}
```

## 範例檔案
- [Github 範例][1]

[1]: https://github.com/shunnien/ASPNetMVC
[2]: https://msdn.microsoft.com/zh-tw/library/bb399567(v=vs.110).aspx
[3]: https://msdn.microsoft.com/en-us/library/jj206878(v=vs.113).aspx