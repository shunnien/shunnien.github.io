title: DataGridView 在 winform 的簡單操作(5)
date: 2015-12-25 15:18:17
categories: [程式技術筆記]
tags: [C#, WinForm]
description: WinForm 下的 DataGridView 操作(5)
---
## 前言
[前篇][2]文章主要是針對資料來源的綁定，學會了那些，那這篇就來個進階的連動

## 前置作業
首先在介面增加個 **comboBox** 並將 **Name** 命名為 *cbDes*，介面設計如下圖
![Design Pic](https://lh3.googleusercontent.com/InkH_aviwtmndN2GgPf8kYW69_L-9XtcSeeWNYg7cKc0TFiqgH68Fn4GJZqFExNpyEXez4Inx7gvhcI4_qJCXhHgVYkfxg8Gi3wMUqTtYMqvS8EAEaObP4R5liQ3uBwrL389Ujr5fV75w7sERTkX0Nqk_Au8IA9J1FPcDObVIdWmTihskhSfO_isgNo_niMucCSy4QE5VBH3821wZM8yCWV0Zy4gtVSkaa2HVSAHRjjChVKAy_Xa_tvC0Gbbd4cuYMut6tQv8333ymjEhAuXcdngFRWYOuS4uc87i2SgujPiyTVbA-J2-T1N3ghFZdm6rRuohW3LkHfqy5Co5z2MF-N7YEzbxwuQ4drcgGKDezEgyna3ggPMiexkheefRQbXbuyxyXHX_4js2ZASEXIf1ymHtvVkIaHPrc1CKrHVhU86nFct-HjKE38xSI5HeMZr9YElco8wQ62M6UY88mGRBF560YJYFBgDEHWvvvmad1PvsIab9tZQB0yL3GjdUFijHmb7RkLtMZoKc1oMTFD2yG44qGwytlurbYAoYV9ap1jFl5L9y_wD_O_YAt7uR3yqW9u4K-P6sF4E39iMO9pQIqrfvytAjP2mG03k0f5KuLrgArOcRuJADj0NiVWDU-MsyBDzGwpa0VMWcHYY9mIbX3dKFxJQYH3J8euaXkOMVw=w710-h377-no)

接著把上次 **ComboData** 類別變換一下格式，把 **Value** 變成 **int**，記得修正因為格變換的錯誤
``` csharp
public class ComboData {
    public ComboData(string text, int value) {
        Display = text;
        Value = value;
    }
    public string Display { get; set; }
    public int Value { get; set; }
}
```
### 連動 **ComboBox**
接著先來把剛剛新增的 **comboBox** 增加下拉選單的選項，並讓 **Gender** 的選單動態變更 **Description**。先建立一個不同選項的資料對應表
``` csharp
private void cbDesBind(dynamic sender, string selVal) {
    List<ComboData> listDes = new List<ComboData>();
    switch (selVal.Trim()) {
        case "Male":
            listDes.Add(new ComboData("Handsome", 1));
            listDes.Add(new ComboData("Nuttiness", 2));
            listDes.Add(new ComboData("Polite", 3));
            listDes.Add(new ComboData("Burly", 4));
            break;
        case "Female":
            listDes.Add(new ComboData("Beautiful", 1));
            listDes.Add(new ComboData("Sexy", 2));
            listDes.Add(new ComboData("Cute", 3));
            break;
        default:
            listDes.Add(new ComboData("Handsome", 1));
            listDes.Add(new ComboData("Nuttiness", 2));
            listDes.Add(new ComboData("Polite", 3));
            listDes.Add(new ComboData("Burly", 4));
            listDes.Add(new ComboData("Beautiful", 5));
            listDes.Add(new ComboData("Sexy", 6));
            listDes.Add(new ComboData("Cute", 7));
            break;
    }
    sender.DataSource = listDes;
}
```
接著在頁面初始化的時候載入(...表示省略程式碼)
``` csharp
public Form1() {
    InitializeComponent();
    ...
    cbDes.DisplayMember = "Display";
    cbDes.ValueMember = "Value";
    cbDesBind(cbDes, "Male");
    ...
}
```
然後就是要讓選單連動了，在 **Gender** 的下拉選單觸發 **SelectedIndexChanged** 事件，然後呼叫剛剛的 **cbDesBind**
``` csharp
private void cbGender_SelectedIndexChanged(object sender, EventArgs e) {
    cbDesBind(cbDes, (sender as ComboBox).Text);
}
```

### 連動 **DataGridView** 中的下拉選單
先把預設的呈現資料增加 **Description** 這欄位的資料
```
private DataTable sampleData() {
    using (DataTable table = new DataTable()) {
        ...
        table.Columns.Add("Des", typeof(int));

        // Add rows.
        table.Rows.Add("Allen", 1, 0, DateTime.Now, 1);
        table.Rows.Add("Kevin", 1, 1, DateTime.Now, 2);
        table.Rows.Add("Dean", 1, 0, DateTime.Today, 3);
        table.Rows.Add("Jenny", 0, 1, DateTime.Today, 1);
        return table;
    }
}

private void gvInit() {
    ...
    DataGridViewComboBoxColumn cb = new DataGridViewComboBoxColumn() {
        Name = "gvDes",
        DataPropertyName = "Des",
        HeaderText = "Des",
        DisplayMember = "Display",
        ValueMember = "Value"
    };
    cbDesBind(cb, "");
    gvSample.Columns.Add(cb);
    ...
}
```
這時候發現 **DataGridView** 的下拉選單會與新增功能的下拉選單連動，這是因為這兩個選單我偷懶使用相同資料來源，而 **SelectedIndexChanged** 會監看到同樣來源資料的變更，
所以這邊進行一下小調整，建一個新的資料來源
``` csharp
private void gvInit() {
    ...
    gvGender.DataSource = cbData.Select(q=> q).ToList();
    ...
}
```
接著來進行 **DataGridView** 中的欄位連動，首先針對 **DataGridView** 增加一個`EditingControlShowing`事件，這表示當此事件是發生於顯示編輯儲存格的控制項時
``` csharp
private void gvSample_EditingControlShowing(object sender, DataGridViewEditingControlShowingEventArgs e) {
    // 判斷觸發事件的欄位是 Gender 才進行以下動作
    if (((DataGridView)sender).Columns[((DataGridView)sender).CurrentCell.ColumnIndex].Name == "gvGender") {
        ComboBox cb = e.Control as ComboBox;
        if (cb != null) {
            // 增加事件
            cb.SelectionChangeCommitted += new EventHandler(cb_SelectedIndexChanged);
        }
    }
}

private void cb_SelectedIndexChanged(object sender, EventArgs e) {
    // 取得現在欄位索引
    int columnIndex = gvSample.CurrentCell.ColumnIndex;
    // 將控制項轉給 ComboBox
    ComboBox cbx = sender as ComboBox;
    // 判斷現在選取的 Column 是 Gender
    if (gvSample.Columns[columnIndex].Name == "gvGender") {
        string selTxt = cbx.Text,
        selVal = cbx.SelectedValue.ToString();
        // 當選取項目值和顯示文字任一為空，就不進行動作
        if (string.IsNullOrEmpty(selTxt) || string.IsNullOrEmpty(selVal)) return;
        // 將此列資料的 Des Cell　取出
        // 其 DataType 為 DataGridViewCell 
        // 將其強制轉換為 DataGridViewComboBoxCell
        var targetCbx = gvSample.CurrentRow.Cells["gvDes"] as DataGridViewComboBoxCell;
        // 綁定資料
        cbDesBind(targetCbx, selTxt);
    }
}
```
別忘記把新增的功能增加項目
``` csharp
private void button1_Click(object sender, EventArgs e) {
    ...
    dr["Des"] = cbDes.SelectedValue;
    ...
}
```
現在剩下當範例資料載入的時候沒有去將 **DataGridViewComboBox** 連動，要完成這功能，只要寫個迴圈去跑 **DataGridView** 每 *row* 的資料，然後變動更新就好。把以下程式碼放到`gvInit()`這方法的最後
``` csharp
private void gvInit() {
    ...
    // DataGridViewComboBoxCell gvDes dynamic databinding
    foreach (var dgvr in gvSample.Rows) {
        var targetCell = ((DataGridViewRow)dgvr).Cells["gvDes"] as DataGridViewComboBoxCell;
        var genderCell = ((DataGridViewRow)dgvr).Cells["gvGender"] as DataGridViewComboBoxCell;
        if (targetCell == null) continue;
        cbDesBind(targetCell, genderCell.FormattedValue.ToString());
    }
}
```
現在會發現，畫面好像還是沒有變化，這是因為呼叫`gvInit()`是在 *Form1* 初始化的時候，在 **LifeCycle* 上，有順序上的問題，所以將`gvInit()`移動到`Form1_Load`事件
``` csharp
private void Form1_Load(object sender, EventArgs e) {
    gvInit();
}
```
至於為什麼不移動到 **DataBindingComplete** 則可以參考這篇，主要是因為會多跑一次，所以才用這種架構。
``` csharp StackOverflow:Alternative to DataGridView DataBindingComplete Event http://stackoverflow.com/questions/24329964/alternative-to-datagridview-databindingcomplete-event
private void Initialize_DataGridView()
{
    // Add dummy data to generate the columns
    this.dataGridView_Items.DataContext = new Item[]{ new Item {Id = 5, Value = 6}};

    // Make your formatting
    foreach (DataGridViewRow row in grdComponents.Rows)
    {
        row.HeaderCell.Value = row.Cells[0].Value.ToString();
    }

    grdComponents.Columns[0].Visible = false;

    // Reset the dummy data
    this.dataGridView_Items.DataContext = null; // Or new Item[]{};
}

...
public MyForm()
{
    Initialize();

    this.Initialize_DataGridView();   
}
```

最後順便調整一下**DataGridView**編輯模式，不然每次都要在 **DataGridView** 點擊兩次才會出現下拉選單；只要在`gvInit()`中增加
``` csharp
gvSample.EditMode = DataGridViewEditMode.EditOnEnter;
```
下拉選單的防呆設計，增加以下程式碼在`cbDesBind`方法內，放在設定 *DataSource* 之前就可以
``` csharp
private void cbDesBind(dynamic sender, string selVal) {
    List<ComboData> listDes = new List<ComboData>();
    switch (selVal.Trim()) {
        case "Male":
            listDes.Add(new ComboData("Select...", 0));
            ...
            break;
        case "Female":
            listDes.Add(new ComboData("Select...", 0));
            ...
            break;
        default:
            listDes.Add(new ComboData("Select...", 0));
            ...
            break;
    }
    if (sender.GetType().Name == "DataGridViewComboBoxCell") {
        var cb = (DataGridViewComboBoxCell)sender;
        if (!listDes.Any(q => q.Value == (int)cb.Value)) {
            cb.Value = 0;
        }
    }
    sender.DataSource = listDes;
}
```
差不多完成了，但是發現這樣連動綁定，在新增一筆資料，在 **Des** Column 會是預設的下拉選項；如下圖所示
![Error Sample](https://lh3.googleusercontent.com/9U8xAcGlIRNx20djuwxbDZF_086qKrRTl4yfKjev15HKqjaENTOlHMHyn7iP8pYaJ_DrnuPd1ge_wmsiv1LsKTeaW9lIg0lgQv3enVJ4ma44kXY6tmDHUgY7u2Y3VdMNUIhqKTUtuav8A_QjfrpPSDX96C-67mzLMlcLnGJQC5zxKdHq1XUnfjkITTVIIWIoIR86_PjobfhV59gJX_o6w0XIKG2xANrD36UvTojQHUimiXrcfK1ZOWLxAldABiuM2ZnsLu9sq5ZWmhujWJfzt1t32prscdXBerPmcfIcCGSPYZQjUADlXy5n6RViWHBYHqgRYQXOk8RBB-uS2Wcg5tUfjPI1QJZ5T4YTtD0HT5cFh8YFGHgYM16C8OdRbbF1ZP__QE4B_hYUdNHdf_SK35wXaTxdxW3DcDbsTLL-WXoNbtH7Je5nqnOWNfzixJd__rCkeJhvoXeMkAO1PLUIT2i5-rIsKhpcS66dkMrrUsuXAoBUXJC1GzPZvr3dT22uDJwfJ3v7Au84MjlpNnBzcskeqx8N9xGIvu22veiGpKNv0QwUf1aKQoCmXmEfJH0jRwtPp5E1672wtl-AehBhWyHVm9vA6PstQU7GwurxskzbXjqKRwNWST9VLR_YoCOr15Q2bFSFzh5VhECVf3Ahda91Cvuw9z1ne9SeIsiScA=w694-h483-no)
好吧，看起來只能使用 **DataBindingComplete** 作法，把`gvInit()`放到`Form1()`初始化，把原本的綁定程式碼移動到 **DataBindingComplete** 事件
``` csharp
private void gvSample_DataBindingComplete(object sender, DataGridViewBindingCompleteEventArgs e) {
    // DataGridViewComboBoxCell gvDes dynamic databinding
    var dgv = sender as DataGridView;
    if (dgv.Rows.Count > 0 && dgv.Columns.Count > 5 ) {
        foreach (var dgvr in dgv.Rows) {
            var targetCell = ((DataGridViewRow)dgvr).Cells["gvDes"] as DataGridViewComboBoxCell;
            var genderCell = ((DataGridViewRow)dgvr).Cells["gvGender"] as DataGridViewComboBoxCell;
            if (targetCell == null) continue;
            cbDesBind(targetCell, genderCell.FormattedValue.ToString());
        }
    }
}
```

### 畫面呈現
這個系列就先到此結束，之後有其他想法再繼續延伸吧。
{% youtube ES_sgj5XlIA %}

## 範例程式
[Github 上的 Sample Code][3]
## 參考資料
- MSDN:[EditingControlShowing][1]
- MSDN:[DataGridView 事件][5]
- StackOverflow:[DataBindingComplete Event][6]

[1]: https://msdn.microsoft.com/zh-tw/library/system.windows.forms.datagridview.editingcontrolshowing(v=vs.100).aspx "MSDN:EditingControlShowing 事件"
[2]: http://shunnien.github.io/2015/12/21/DataGridView-in-winform-4/ "DataGridView 在 Winform 的簡單操作(4)"
[3]: https://github.com/shunnien/DataGridView-winform "Github:DataGridView-winform"
[4]: https://msdn.microsoft.com/en-us/library/system.windows.forms.datagridviewrow.databounditem(v=vs.110).aspx "MSDN:DataBoundItem Property"
[5]: https://msdn.microsoft.com/zh-tw/library/system.windows.forms.datagridview_events(v=vs.110).aspx "MSDN:DataGridView 事件"
[6]: http://stackoverflow.com/questions/24329964/alternative-to-datagridview-databindingcomplete-event "StackOverflow:DataBindingComplete Event"