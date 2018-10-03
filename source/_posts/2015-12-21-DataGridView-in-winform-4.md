title: DataGridView 在 winform 的簡單操作(4)
date: 2015-12-21 10:30:07
categories: [程式技術筆記]
tags: [C#, WinForm]
description: WinForm 下的 DataGridView 操作(4)
---
## 前言
[前篇][2]文章都是靠設計頁面完成，但是如果我想要直接靠程式碼動態給予 **DataGridViewComboBoxColumn** 選項資料，所以此篇來做一些簡單應用。
## 正文
### 方式一
在設計頁面的時候，給予這 **DataGridViewComboBoxColumn** 欄位一個 **Name**，然後如下
``` csharp
private void gvInit() {
    gvGender.Items.Clear();
    gvGender.Items.AddRange(new object[] {
    "Male",
    "Female",
    "test"});
    gvSample.DataSource = dt;
}
```

### 方式二
使用 **Class** 撰寫一個 **Text** 與 **Value** 的類別，類似網頁下拉選單的選項
``` csharp
/// <summary>
/// comboBox Items
/// </summary>
public class ComboData {
    public ComboData(string text, string value) {
        Display = text;
        Value = value;
    }
    public string Display { get; set; }
    public string Value { get; set; }
}
```
接著初始化的時候，把選項塞進去
``` csharp
private void gvInit() {
    gvGender.Items.Clear();

    // 方式二
    gvGender.Items.Add(new ComboData("Male", "1"));
    gvGender.Items.Add(new ComboData("Female", "0"));
    gvGender.Items.Add(new ComboData("test", "2"));
    gvGender.DisplayMember = "Display";
    gvGender.ValueMember = "Value";
    gvSample.DataSource = dt;
}
```
**cbGender.SelectedValue** 就是類別中的 **Value**， **cbGender.Text** 就會是 **Display**，所以注意一下新增動作的時候，要變更為
``` csharp
private void button1_Click(object sender, EventArgs e) {
    DataRow dr = dt.NewRow();
    dr["Name"] = txtName.Text.Trim();
    dr["Gender"] = cbGender.SelectedValue;
    dr["Married"] = ckMarried.Checked ? 1 : 0;
    dr["Birthday"] = dtpBirthday.Value;
    dt.Rows.Add(dr);
}
```

### 畫面呈現
與前篇相同，主要在程式碼的操作不同
![Result](https://lh3.googleusercontent.com/Xn8u7YmKByJ3A9IxQQ3UIAwMcpVXrbJ7WNHisMpkY_y1K0p-f2UPFQ_bqdCRpPrvZ4AQJ8Q6rofmlqL4AHZ4joyl4CWl3T_igyWZiuOFZ47yl9tBVKYNxDe_-EMWvNknmRXXZHlDFcSgbXdrA0GvhXfzaYnVB3yoIAnnUEVUYiWXZsXx6l8udaQMJrp56sO0N8nbrkX5WpAHLcfTAkbNpFufDTd9KC_Qw3_qlP9gj5zCJbMxwB_wYgSTA0lf6imX2K-4QhBHMCoruTlsKQj2DY9ChKlkrbLxEgns7rkcvVRNokQXyddUyj3bK-dw-t0BRaWyQCSVv2p-bxE0hYvM-bjulZvVAbFxjldQuD7mz6O2CY1qB1JSsMoFRPcR5DWdvpjEJhC3yyGW3lgUytfdsSIiTyqCvnOeFiAElYMaVXbkGPTunUImupU3tlcDSktZgXIac6RkYXDsSxv4HqU2MKbkX7Coulbdp2p6_rJZa55wdHRTgw_TtquobnMSqzGXmX-tLiq7Dzrh4DgHzydKAs8__gQU0vi2ys6J7DOHB_YXmLnXy0Sl26cVTz9QKQWzKwIWBXhmiQ2tRFYozHfGXsknAzjySYk9UJ5_fpVO8vLkkGzF2hKumJY5AxIfwfNaiIW4abmAFmPVboTp7vPXTP-eTynFxhOZz1IfhBYDLw=w694-h483-no)
![DataSource](https://lh3.googleusercontent.com/tpkMY7SlhmIbo_x-ChJqE3Mo5zRqT4krnjBHfTUx3TCztql66Wddb3jUhT5fthH5VdixgfkFAPfjTJnY-qf84XhhU6suzhDBHFranSIz58QuNbz-6RRvCoMxZ4QihKmoJ2Zf7g6PhyOnNttp5PCUgqMDiNvgkGIyO1rpaXd3gQqiiAaCrQoNvk5d5LkudVsd2S8XalaJuxVK0T2WypNFVVkeqVMqh---ts2miUKlmWsyEnw0nIiLJVvWyvGBnPb44E5nwazD-4_QykNYGaEGDFnZpvs7hw6bqMAYi6d2m1PCMu5Q3xZzeLxnik42G-koXyb-EUaeWMnMJepRrCsApYm1yAzZmBf96KSDK2eSREoQwqPQLTIFAGwIYRtiehg8LvjFJil50elUyfONMM-SBfnVFKbUfixEZ6og3DHjvvrapa35fHPfS-rtL-fxDGRj3jeqPGp8aEaQIPT5HhZQy_bz_GsaftYIKAauEfPY7MI00fiXaMwdiUsm2guL3X1WzXaEJK_klic-VVMWmISyTRFNet9gNVPbHFm7q-9e_3WLzxkXRMxaxMABkvoCTLlor_lWRAmsorJbWXaTlBxkw2FDumKKqV5j6wPt3Q9YoQTsReSRXcneFaQYmQ2vggDCR0TROqNillwJx4XaOeCsAoknkypZGS7QocXdQ6rftA=w853-h197-no)

## 範例程式
[Github 上的 Sample Code][3]
## 參考資料
- MSDN:[DataGridViewComboBoxColumn][1]

[1]: https://msdn.microsoft.com/zh-tw/library/system.windows.forms.datagridviewcomboboxcolumn(v=vs.110).aspx "MSDN:DataGridViewComboBoxColumn 類別"
[2]: http://shunnien.github.io/2015/12/17/DataGridView-in-winform-3/ "DataGridView 在 Winform 的簡單操作(3)"
[3]: https://github.com/shunnien/DataGridView-winform "Github:DataGridView-winform"