title: LinQ IQueryable 轉換 DataTable
categories: 程式技術筆記
tags:
  - Linq
  - 'C#'
  - ADO.NET
description: 使用 LinQ IQueryable 轉換 DataTable
toc: false
date: 2017-06-20 11:33:16
---

## Introduction
最近有些案子需要使用到這需求，把以前一些方法紀錄一下。

## Conetent
目的是轉換 DateTable 使用，所以做法有很多，甚至是一開始就使用 DataSet 去取得資料來源等，但是這邊單純討論轉換 DataTable 。想要轉換到 DataTable 最常見的就是反射(Reflection) ，甚至官方都有文件資料說明如何實作 [CopyToDataTable<T>][5] 。
以下就簡單說明反射的部分


此部分是引用[黑暗執行緒大大][2] 的範例
``` csharp
public DataTable LinqQueryToDataTable<T>(IEnumerable<T> query)
        {
            DataTable tbl = new DataTable();
            PropertyInfo[] props = null;
            foreach (T item in query)
            {
                if (props == null) //尚未初始化
                {
                    Type t = item.GetType();
                    props = t.GetProperties();
                    foreach (PropertyInfo pi in props)
                    {
                        Type colType = pi.PropertyType;
                        //針對Nullable<>特別處理
                        if (colType.IsGenericType
                            && colType.GetGenericTypeDefinition() == typeof(Nullable<>))
                            colType = colType.GetGenericArguments()[0];
                        //建立欄位
                        tbl.Columns.Add(pi.Name, colType);
                    }
                }
                DataRow row = tbl.NewRow();
                foreach (PropertyInfo pi in props)
                    row[pi.Name] = pi.GetValue(item, null) ?? DBNull.Value;
                tbl.Rows.Add(row);
            }
            return tbl;
        }
```

或是使用 Json 的方式來轉換，不過這方式最好使用在資料量比較小的情境下

``` csharp
public DataTable LinqToDataTableByJson<T>(IEnumerable<T> query)
        {
            JArray jObjects = new JArray();
            PropertyInfo[] props = null;
            foreach (var item in query)
            {
                Type t = item.GetType();
                props = t.GetProperties();
                var jo = new JObject();
                foreach (PropertyInfo pi in props)
                    jo.Add(pi.Name, (JToken)pi.GetValue(item, null).ToString());
                jObjects.Add(jo);
            }
            return JsonConvert.DeserializeObject<DataTable>(jObjects.ToString());
        }
```

![Sample](https://lh3.googleusercontent.com/tlkWcUVMGJcylAZpSSaW_ejn5zihH0xXmaN_gyiSShb4pDu7RSWWDYtTb88r9xIP7GIIzeb4I7a6PqOYRtC5AJTwusypEYBW03eVEcVtPj5jZMQFAWbJvn3RY3ui4pFj_rzWrlQxOAvEKIP2dyOfV5jgqBcZhgD_jA2Vj6PNMkwHNEfNKHUi-UaxCWKuRU878OiupCjcc_4W5Oc9Z5QVn0ho9LKQnwdUl-dZsJRAiOfRdLzXEyvKZBYiE8dwXQXe1Ckbl_cWPcWsY1P572N99PpGPJ9J8TE5jT0LeulzL8hKMi0ZXM4pSIULwd1usHFWqZCvm1AobjhMDf4_iifYkLWmvS_7JyzynR445vvljoc5jc4CABSJCcin7g-WMfv0Y42wxfuz31E9fLi8nGxa1uxj-d9jTVcANOdTjoz2U-z7kE1k0G4sxH2lrNmI_fPE6bm5UGQcVbDZNq7pJlz8cAWDb5boV_i_XkLDk3eQtj0fK_Maqwk0Un_DEt6_At4fyxYAyf4MzT9DCdiVi0oC-3RRQ39Lh64zITl7OZCBzYJlRpWb853qwGJJtzeOsYK-PxR0oiiEP2QcSm_VR88XGWX7dhLstU1jhQsfRoAEv8oDf2S5aHLonsgnwd8nRtmpduzium6A1dyKeD-VBf3zqBrM-ee_c1km1bq2J6N3Dw=w858-h859-no)

## Reference

- [余小章 @ 大內殿堂][1]
- [darkthread][2]
- [stackoverflow ][3]
- [.Net Docs LINQ to DataSet][4]
- [.Net Docs Implement CopyToDataTable][5]

[1]: https://dotblogs.com.tw/yc421206/2014/07/14/145944
[2]: http://blog.darkthread.net/blogs/darkthreadtw/archive/2015/10/12/6134.aspx
[3]: https://stackoverflow.com/questions/10618605/how-to-convert-iqueryable-to-datatable
[4]: https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/creating-a-datatable-from-a-query-linq-to-dataset
[5]: https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/implement-copytodatatable-where-type-not-a-datarow