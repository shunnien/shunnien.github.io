title: .net MVC 針對 Model 的 extension method
categories: 程式技術筆記
tags:
  - Asp.Net MVC
toc: false
date: 2017-07-31 10:41:05
description:
---

在 **Asp.Net MVC** 中 ( MVC 5 ) ，一般都會使用 **ORM** 工具，最常見的是 **Entity Framework** <!-- more -->，所以資料表的對應類別是自動產生，不會再這些對應類別中增加方法 ( method ) ，這些類別都會盡量不去變動它，需要使用方法的話，會使用 ** extension method** 。
以下使用 Northwind 資料庫來操作範例：

> ### 情境
> 針對 OrderDetail 將單價與數量計算，呈現總價格

- 建立 Model 對應
主要使用 OrderDetail 資料表
- 使用範本產生 Controller 和 View
- 添加 ViewModel
``` csharp
public class OrderDetailViewModel
{
    public int OrderID { get; set; }
    public int ProductID { get; set; }
    public decimal UnitPrice { get; set; }
    public short Quantity { get; set; }
    public float Discount { get; set; }
    public decimal TotalPrice { get; set; }
}
```
- 針對 OrderDetail model 建立 extension method
``` csharp
public static class ModelExtMethod
{
    public static decimal TotalPrice(this Order_Details orderDetail)
    {
        decimal result = 0;
        result = orderDetail.UnitPrice * orderDetail.Quantity;
        return result;
    }
}
```
- 修改 controller
此處僅修改 index 來做示範；另外這邊需要注意的是 LINQ 的使用
``` csharp
public ActionResult Index()
{
    var order_Details = db.Order_Details.ToList().Select(o=> new OrderDetailViewModel()
    {
        OrderID = o.OrderID,
        ProductID = o.ProductID,
        UnitPrice = o.UnitPrice,
        Quantity = o.Quantity,
        Discount = o.Discount,
        TotalPrice = o.TotalPrice()
    });
    return View(order_Details);
}
```

## 參考資料
- [Github 範例程式][1]

[1]: https://github.com/shunnien/ASPNetMVC