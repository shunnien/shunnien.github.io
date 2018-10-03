---
title: DataGridView 簡易分頁範例
date: 2013-07-23 14:18:47
categories: [程式技術筆記]
tags: [C#, WinForm]
description: WinForm 下的 DataGridView 簡易分頁範例
---

## 前言

在 WinForm 中，想將 DataGridView 進行分頁的話，就得自己處理了，不像 WebForm 的 DataGridView 有分頁設定。

## 介面設計

首先設計介面，介面上使用的物件如下：

- DataGridView X 1
- Button X 5
- Label X 3
- NumericUpDown X 1
- GroupBox X 1

版面畫面如下
![Form Design](https://lh3.googleusercontent.com/kntJL5Wb7N3WDsBZRBDJxXaowvHkuxpN_wEcaHQyybn0NZxRASA-VIXcQyiqzY2D_qEPOSqjZDnlVOvDsmHefE0vjhRZFCLLAfr0dEjEv8pbUVr-JbBLD0qq-KLKeEsxaPgRcSMIzpNzH6cdnRjwNClnIWpSMO3ezwFG6wx2SPaZKQx8r4QElY1uXGjUCuFtVGCDpYdZEtD5SlVeL4Uo70Q1VGmAJjrTMyVkkgPnwZ2sOckQXnU3kg73cJGxqmrUkLP1YFcXXvVGxod3C6bvy6yAZx8fQz5fWLISnDqwsHGXcx73RgOE5T5CO0wH6DWoYPJ1wCFiwQxjxAsvQP5Xaiap8aB8i0D3U-7TB7B0akFgRbYn5ShFu6nbVWnHYXGM56GVmEh-ESJuKp2sQTbyur59WryMDHyuj1huc4ueYpbgmr6V-oXw078bTZEEm-8fT7J1MmaehzqmiIp0y_uoYDiQeFQ1DYA7t4DAmT7OpyZMTWa5Bx3CrgYm-EfgF04RduoqQ94EGrw4WMmT5DGyydwU3KLrbhoRyF3ZrbB-COu0ioi6YjgS3a362RiVcUcrw8aQkIUgFJD0KiAGECf3VMMo8HpxlPgJryvzoU2X63EhROmBez9vhYGGiMwPepr-JJCn8SLsIeJtELTD9131NeFv5YK4VQPhuci9oiAyJQ=w475-h422-no)
比較需要注意的是自訂*Name*的對應，畫面顯示文字與 Name 對應如下

- 第一頁:btnFirstPage
- 上一頁:btnPreviousPage
- 第 1 頁:lbCurrentPage
- 下一頁:btnNextPage
- 最後一頁:btnLastPage
- 設定:btnSet
- 20:nudPageSize
- 共 頁:lbTotalPage

## 資料連線

使用[北風資料庫][1]來作範例，在*App.config*添加連線字串

``` xml
  <connectionStrings>
    <add name="DBConnection" connectionString="Data Source=localhost ;Initial Catalog=Northwind;Persist Security Info=True;Integrated Security=SSPI;" providerName="System.Data.SqlClient"/>
  </connectionStrings>
```

## 程式碼

先把每個按鈕點擊事件的程式碼自動產生，接著宣告三個整數與連線字串；此時應該會需要添加 Configuration 這個參考，加入完參考，請記得引用。

``` csharp
private string _connecString = ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString;
// 現在選取的分頁編號
private int _currentPageIndex = 1;
// 總共多少分頁
private int _totalPage = 0;
// 頁面大小
private int _pageSize = 20;
```

接著撰寫計算頁數的方法

``` csharp
/// <summary>
/// 計算頁數
/// </summary>
/// <param name="dt">The dt.</param>
private void CalculateTotalPages(DataTable dt) {
    int rowCount = dt.Rows.Count;
    _totalPage = rowCount / _pageSize;

    //不足一個分頁行數的還是算一頁
    if (rowCount % _pageSize > 0)
        _totalPage += 1;
}
```

然後利用 SQL 來取得現在的分頁資料

``` csharp
private DataTable GetCurrentRecords(int page)
{
    DataTable dt = new DataTable();
    using (SqlConnection con = new SqlConnection(ConnecString))
    {
        SqlCommand cmd = new SqlCommand();
        if (page == 1)
        {
            cmd = new SqlCommand("Select TOP " + PageSize +
            " [OrderID],[CustomerID],[ShipVia],[Freight] FROM [Northwind].[dbo].[Orders] ORDER BY [OrderID]", con);
        }
        else
        {
            //利用 SQL 語法來切換資料
            int PreviousPageOffSet = (page - 1) * PageSize;

            cmd = new SqlCommand("Select TOP " + PageSize + " [OrderID],[CustomerID],[ShipVia],[Freight] " +
                "FROM [Northwind].[dbo].[Orders] WHERE [OrderID] "+
                "NOT IN " +
                "(Select TOP " + PreviousPageOffSet +" [OrderID] from [Northwind].[dbo].[Orders] ORDER BY [OrderID] ) "
                , con);
        }
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        da.Fill(dt);
        lbCurrentPage.Text = "第 " + CurrentPageIndex + " 頁";
    }
    return dt;
}
```

以上部分完成，就可以把剩下的頁面切換都完成了

``` csharp
private void btnFirstPage_Click(object sender, EventArgs e) {
    _currentPageIndex = 1;
    dataGridView1.DataSource = getCurrentRecords(_currentPageIndex);
}

private void btnPreviousPage_Click(object sender, EventArgs e) {
    if (this._currentPageIndex > 1) {
        _currentPageIndex--;
        dataGridView1.DataSource = getCurrentRecords(_currentPageIndex);
    }
}

private void btnNextPage_Click(object sender, EventArgs e) {
    if (_currentPageIndex < _totalPage) {
        _currentPageIndex++;
        dataGridView1.DataSource = getCurrentRecords(_currentPageIndex);
    }
}

private void btnLastPage_Click(object sender, EventArgs e) {
    _currentPageIndex = _totalPage;
    dataGridView1.DataSource = getCurrentRecords(_currentPageIndex);
}
```

最後的分頁設定功能部分，需要取得沒分頁的全部資料，所以在連線資料庫取得全部資料

``` csharp
/// <summary>
/// Gets the data.
/// </summary>
/// <returns></returns>
private DataTable getData() {
    using (SqlConnection con = new SqlConnection(_connecString)) {
        con.Open();
        using (SqlCommand cmd = new SqlCommand("SELECT [OrderID],[CustomerID],[ShipVia],[Freight] FROM [Northwind].[dbo].[Orders] ORDER BY [OrderID]", con)) {
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            return dt;
        }
    }
}
```

接著就是設定分頁資料數功能了，這個功能就更新一下分頁列數，然後重新呼叫 Function

``` csharp
private void btnSet_Click(object sender, EventArgs e) {
    if (_pageSize != Convert.ToInt32(nudPageSize.Value)) {
        _currentPageIndex = 1;
        _pageSize = Convert.ToInt32(nudPageSize.Value);
        CalculateTotalPages(getData());
        lbTotalPage.Text = "共 " + _totalPage + " 頁";
        lbCurrentPage.Text = "第 " + _currentPageIndex + " 頁";
        dataGridView1.DataSource = getCurrentRecords(_currentPageIndex);
    }
}
```

### 畫面呈現

{% youtube CaTUTujmmC8 %}

## 範例程式

[sample 的 github][2]，不過程式碼我重新使用*Visual Studio 2015*寫過。

[1]: https://www.microsoft.com/en-us/download/details.aspx?id=23654 "Northwind Download"
[2]: https://github.com/shunnien/gvPagination "Github:Sample Code"