title: DataGridView 在 winform 的簡單操作(3)
date: 2015-12-17 16:20:42
categories: [程式技術筆記]
tags: [C#, WinForm]
description: WinForm 下的 DataGridView 操作(3)
---
## 前言
接續[前篇][7]
## 正文
[前篇][7]文章已經完成新增與刪除的動作了，但是怎麼沒有修改呢？，其實 **DataGridView** 預設是啟用的，而且是針對每個 **Cell**，可以簡單想成 **Excel** 的樣式，都是儲存格，然後只要雙擊滑鼠左鍵就可以編輯；所以這樣的話，簡單的 **CRUD(Create Read Update Delete)** 就完成了，今天這篇就來把 **DataGridView** 呈現的資料上，變換為下拉選單等等。

### 添加 DataGridViewComboBoxColumn
在[DataGridView][3]設定 **Gender** 欄位，把一列的 __ColumnType__ 設定為[DataGridViewComboBoxColumn][6]，因為這是一個 **ComboBox** 所以需要設定 **Items** 在此輸入下拉選單要顯示的文字如下圖顯示。
![Bound Column Properties Set](https://lh3.googleusercontent.com/Fx-oeBkbQVFYTIXfPVNKyMzqLL7dcHsIyDV5E_lcjTqdqmTnUPyjNuEfQZzIqIRFV3a-xZT6TSxtoDCsVckx1qe9sXYtJaCDREkzsNntVIV3mDgn5arYmwdyU7wC3LDlNQpBXj7IZZSKVL2RIwt-XXCeFM0APEX_vLQNo4ycNygS--GkZe8RgSgyC5EZqF_fMmEzuWjye4h_ojji1Y_ejGTcVPsMfhgw_mkW9_8ydA15VguBY0mtBJu2KHOrxC5R8CjNGK1fetpbmrtcsC7zQtURhMj8yolNzgLBuOBeBDJYPjCF9eM__TSLcuIIY9X2frCoxWf7CscIma7VB49UU7QlIQZaEENumQ1pqWI0i5yCM60gHJOfCIwaN74wWDvd2Qx9kbM4PNhPsX33ERsHd8fbtm2RDdGyiNzYQdbdb-vGnKsm2ZBKmg8vr98yMq-PmTvrUO28GenjwM7HSgO9ucYMwYDqbtO29tB82h4eloDHH2nJ3n1p5eEq6T7C3N8I9L_inpUehOzoYXxFIJ04Mi1NC9B-zC0J87EZDOh4szQ9zIaGJMGtO-eYeDirFC_3pfEPq0uo05Nr59wpswYK3h7ni7PIu3_eVfaHa4vZmXSePUabamX-tDpipi2y_jZ-a5XzXN_tuKWFXJhU-AfWeoYTh3u7Wdn7P3NaKzmTUg=w476-h631-no)

### 添加 DataGridViewCheckBoxColumn
將 **Married** 欄位同 **DataGridViewComboBoxColumn** 設定一樣，將 __ColumnType__ 設定為[DataGridViewCheckBoxColumn][1]，接著設定以下屬性：
- [TrueValue][4]:對應已核取的值
- [FalseValue][5]:對應未核取的值
- [IndeterminateValue][2]:該儲存格值對應不到或 null 時，要給予的值

### 畫面呈現
添加好，直接執行就完成了
![Result](https://lh3.googleusercontent.com/Xn8u7YmKByJ3A9IxQQ3UIAwMcpVXrbJ7WNHisMpkY_y1K0p-f2UPFQ_bqdCRpPrvZ4AQJ8Q6rofmlqL4AHZ4joyl4CWl3T_igyWZiuOFZ47yl9tBVKYNxDe_-EMWvNknmRXXZHlDFcSgbXdrA0GvhXfzaYnVB3yoIAnnUEVUYiWXZsXx6l8udaQMJrp56sO0N8nbrkX5WpAHLcfTAkbNpFufDTd9KC_Qw3_qlP9gj5zCJbMxwB_wYgSTA0lf6imX2K-4QhBHMCoruTlsKQj2DY9ChKlkrbLxEgns7rkcvVRNokQXyddUyj3bK-dw-t0BRaWyQCSVv2p-bxE0hYvM-bjulZvVAbFxjldQuD7mz6O2CY1qB1JSsMoFRPcR5DWdvpjEJhC3yyGW3lgUytfdsSIiTyqCvnOeFiAElYMaVXbkGPTunUImupU3tlcDSktZgXIac6RkYXDsSxv4HqU2MKbkX7Coulbdp2p6_rJZa55wdHRTgw_TtquobnMSqzGXmX-tLiq7Dzrh4DgHzydKAs8__gQU0vi2ys6J7DOHB_YXmLnXy0Sl26cVTz9QKQWzKwIWBXhmiQ2tRFYozHfGXsknAzjySYk9UJ5_fpVO8vLkkGzF2hKumJY5AxIfwfNaiIW4abmAFmPVboTp7vPXTP-eTynFxhOZz1IfhBYDLw=w694-h483-no)
## 範例程式
[Github 上的 Sample Code][8]
## 參考資料
- MSDN:[IndeterminateValue][2]

[1]: https://msdn.microsoft.com/zh-tw/library/System.Windows.Forms.DataGridViewCheckBoxColumn(v=vs.110).aspx "MSDN:DataGridViewCheckBoxColumn 類別"
[2]: https://msdn.microsoft.com/zh-tw/library/system.windows.forms.datagridviewcheckboxcolumn.indeterminatevalue(v=vs.110).aspx "MSDN:IndeterminateValue 屬性"
[3]: https://msdn.microsoft.com/zh-tw/library/e0ywh3cz(v=vs.110).aspx "MSDN:DataGridView 控制項"
[4]: https://msdn.microsoft.com/zh-tw/library/system.windows.forms.datagridviewcheckboxcolumn.truevalue(v=vs.110).aspx "MSDN:TrueValue 屬性"
[5]: https://msdn.microsoft.com/zh-tw/library/system.windows.forms.datagridviewcheckboxcolumn.falsevalue(v=vs.110).aspx "MSDN:FalseValue 屬性"
[6]: https://msdn.microsoft.com/zh-tw/library/system.windows.forms.datagridviewcomboboxcolumn(v=vs.110).aspx "MSDN:DataGridViewComboBoxColumn 類別"
[7]: http://shunnien.github.io/2015/12/16/DataGridView-in-winform-2/ "DataGridView 在 Winform 的簡單操作(2)"
[8]: https://github.com/shunnien/DataGridView-winform "Github:DataGridView-winform"