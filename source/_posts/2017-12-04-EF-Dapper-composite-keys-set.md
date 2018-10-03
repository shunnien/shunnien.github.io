title: Entity Framework 與 Dapper Contrib 複合鍵的設定
categories: 程式技術筆記
tags:
  - EntityFramework
toc: false
date: 2017-12-04 11:24:57
description:
---

紀錄 **Entity Framework v6** Code First 與 **Dapper Contrib** 的模型建立時，資料表索引的設定；順便替懶得查文件的同事紀錄。
<!-- more -->

以下資料表模型參考 Northwind 建立，使用 **Region** 與 **Order Details**
![Regions](https://lh3.googleusercontent.com/9lc1O9inxc1jgB08tfN4caXM_1256Q_WnWBPIi1JGI-93xglC4JbgG3Wrrt4c6y1gxljPt7ozlLSfF8vlip7HDRfkGYkHvQdAfRMZw5r21y49z3tzHBDNg_umz0p3j6tQHbL711ATNWQUdoCIUx210pTw_81JhGip60n8r5fFQlivPj793i7fGXweUlwVNQAYmy0bA7lYob-eL_XKvKt86PV0aN6WrwBq9wmY48d9N5kHnjFBDertsW1LkvQicdMX2leKm2Cfwh1DCuXX9HQVqWwnj1yuo6xdKv6eaq0i-Jzmg8jzKbuisLlPPcb6m7GUutNxxsJm3dAXBK512AwLcvufnBeUcS2aPKIfHhyWgAtzSYFMRoT2XXmxIbOsDXclfzg6sPn3NHtD0m7ghV2qcf7l069IL4IbjxqOd1xxMZpoCzu2kWceQgVmxcvFFfUsGgHGxbW7WFELK5kVHIDaFDW0fwID8Urca3qE49I6CkpKAvkRx-kio0Xhu4MCAn0yssRNdsFG1JoLyzXpPBA9ItApQ2F0Y90Mo3XaUHf9lIsJZatZeKszDW-hmZnXbfs5iuRT_xbFXZnNP2NDp8VHd4sBEX2VxsnyOVAsw-aDfp-KmHlz2HvTniOD3aUbDXwqblqoyriFqLAUlBrlP9D_6wkIC8JB1kus8k=w287-h117-no)

![OrderDetail](https://lh3.googleusercontent.com/z6Xpt5KWANfiM--ELbM553yU26bk8b0IlAtKdnfpjgOUInswotD3-gMv5mLZG5yuFoQJQeJK_qFQZfcNMEHjus-iKEtEz7lu9RVmd4D1vB9Q9EYtqq4CItyFWpn9Ei9oEdPUZYReuNfLgOWL1x5YGx3QfcvkdG1CFJ5lfjVlpk4aDEHCNdzDX6XZaUZ5_mrlSqUgi8BiGnLx816Kl7b-kzm2Ii7iioN1y7d47805eGc0RgjNmkMTO9opBZw9P_vZLDPEfRQljUa-LDU2qd1PI7VhoDSTJbnxesQClfgjTkcdRt9q_BBXLMsqXIgQK4KXw8U0vqQeweuOycvC7t89FGL5XrYPCbFVXklbtd0AFWgHT_-0JoURxIhVDgW8thw9PgcloxpNEO6hKq6L-KGWtKLm8GTzdtvj8eb23AmZFUEduK27WCClGcMplIxOf9ClHA_xcwcZC90qGeRuKZCwtuclbRSaq91EQlP960LIx3vPqSsKej6-1GR-Mr0qze1O94syxDuwOTIvms4U4A55gdJLuary-XdkGPuLp9OjTG0uuZmZEOgHFQiBKFAJKs5fWNJsjUADnuf61cng3j5Y9DRYwUmPbwxE3-MRCbn_giO9NWliigZJURp5z8tPQQHVQaqWg64Yr_afFm7ggwuiVdt7pvxy-II3ZcU=w258-h204-no)

## **Entity Framework**

當資料庫資料表單一 **Primary Key** 時，透過 Attribute 設定 **[Key]** 即可。

``` csharp
public class Regions
{
  [Key]
  public int RegionID { get; set; }

  public string RegionDescription { get; set; }

}
```

當資料表是__複合索引__ (Composite keys) 時，針對是索引的欄位還是使用 **[Key]** 來設定，但是**必須**設定排序的順序，否則會出現錯誤；當複合鍵時，除了 **[Key]** 外，尚需要設定 **[Column(Order = n)]**
``` csharp
public class OrderDetails
{
  [Key]
  [Column(Order = 1)]
  public int OrderID { get; set; }
  [Key]
  [Column(Order = 2)]
  public int ProductID { get; set; }

  public decimal UnitPrice { get; set; }

  public short Quantity { get; set; }

  public float Discount { get; set; }

}
```

## __Dapper Contrib__

**Dapper Contrib** 與 **Entity Framework** 不同，__索引__的 **Attribute** 隨著是否自動增值有所差異，自動增值的索引直接使用 **[Key]** ， 非自動增值的索引使用 **[ExplicitKey]** 。
所以 **Dapper Contrib** 是已針對索引的自動增值與否進行設定，不管是**單一鍵**還是__複合鍵__都是如此。

以下為單一鍵的範例：

``` csharp
// 自動增值
public class Regions
{
  [Key]
  public int RegionID { get; set; }

  public string RegionDescription { get; set; }

}

// 非自動增值
public class Regions
{
  [ExplicitKey]
  public int RegionID { get; set; }

  public string RegionDescription { get; set; }

}
```

以下為複合鍵的範例，假設當兩個複合鍵皆是自動增值或是皆非自動增值
``` csharp
// 自動增值
public class OrderDetails
{
  [Key]
  public int OrderID { get; set; }
  [Key]
  public int ProductID { get; set; }

  public decimal UnitPrice { get; set; }

  public short Quantity { get; set; }

  public float Discount { get; set; }

}
// 非自動增值
public class OrderDetails
{
  [ExplicitKey]
  public int OrderID { get; set; }
  [ExplicitKey]
  public int ProductID { get; set; }

  public decimal UnitPrice { get; set; }

  public short Quantity { get; set; }

  public float Discount { get; set; }

}
```

## 參考資料
附上使用 **LinqPad** 的簡單範例， [Entity Framework][3] 、 [Dapper Contrib][4] ，使用前記得引用參考。


- [Dapper Toturial][1]
- [MSDN ][2]

[1]: https://msdn.microsoft.com/en-us/library/jj591583(v=vs.113).aspx
[2]: http://dapper-tutorial.net/data-annotation-explicitkey
[3]: https://gist.github.com/shunnien/f63486a52e63225660a60dad6f12ba4d "efv6"
[4]: https://gist.github.com/shunnien/322025689e25c3d6c873ace22cb692d8 "dapper"

