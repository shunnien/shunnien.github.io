title: DataGridView 在 winform 的簡單操作(2)
date: 2015-12-16 09:58:40
categories: [程式技術筆記]
tags: [C#, WinForm]
description: WinForm 下的 DataGridView 操作(2)
---
## 前言
接續前篇
## 正文
上一篇進行到資料連結完成，介面完成，這篇開始慢慢來完善功能吧。
1. ### 屬性設定
在[DataGridView][3]設定欄位，把一列的**ColumnType**設定為[DataGridViewButtonColumn][2]，然後**Text**輸入想要顯示的文字，此外再將[UseColumnTextForButtonValue][5]設定為**true**，這樣在**Text**設定的文字才會顯示，如下圖顯示。
![Property Set](https://lh3.googleusercontent.com/nDVSJ7rcHiFlwTqMn-qabJZT2PsG8k7QPUTfTivSu8dnOsAOPiHdQs7IYaJOLJuVjXJLFk6LNZj-bQg1xzDLiRe5saajWtDBrf6y76hJmuX-Uk1bipZlobEOuxxFLVFX3Ls-ZK-N6OqsZB9RTX647ehSYSzStdYZeo2_LI-Q2ZeCiYmzlFw_NCCDNmaawI51COxQUdaXhXkwivEvs9sn224Dghbp6jVc8cNe2bKJr9oWMV1gmwo-uPUtC7fQ0OSU09q7z2qZsEWSC47MBE-7bfYZyKWvWT81eQ73fFrZtjfKufHQF1xf7f0mHicl6Z2tDwrODtkyfMuLpxFLa-_yAy5ni3naFhYgE44xQt9gOsM1_lPMYZRU4Spu62RMs2bqS7s1Ix_06aTfNkjQMnKqGJy-kb8Qe7zoPvVdH-v3fNoTTrsoJAaSWOGxtyN4xrPCWC2j4SExJeFEn_8DDDG2D8H_Rp4B1mNZRt01sYk9k4XrGP7v5MGMM1O1hWGNIDe77JoUi2Bd6VwAhKa1p1s39Lra0o3Vr6AnzB0nz5Xd3fgWzs8SsIkap4prK-6LZMmbigeaCCFdcLUVirDH5BizUz9f2b0o562P5ILV5UcYoPQClq-k1F9S8eEc1FxSrASyQIjJdJZwx_QMuVGZk3OI3dvDCtjN73XHZQrAvtByxA=w524-h405-no)
接著選擇[DataGridView][3]，將[AllowUserToAddRows][6]設定為**False**，新增統一由按鍵新增就好。

2. ### 刪除功能
完成屬性設定後，在設計(Design)畫面選擇[DataGridView][3]，然後在屬性(Properties)視窗中切換頁籤到事件(Events)，然後在[CellContentClick][4]新增事件，
``` csharp
private void gvSample_CellContentClick(object sender, DataGridViewCellEventArgs e) {
	// 指定第 0 列，刪除按鈕的所在列
    if (e.ColumnIndex == 0) {
        (sender as DataGridView).Rows.RemoveAt(e.RowIndex);
    }
}
```
3. ### 新增功能
把設計畫面上的新增按鈕增加點擊事件
``` csharp
private void button1_Click(object sender, EventArgs e) {
    DataRow dr = dt.NewRow();
    dr["Name"] = txtName.Text.Trim();
    dr["Gender"] = cbGender.SelectedItem;
    dr["Married"] = ckMarried.Checked ? 1 : 0;
    dr["Birthday"] = dtpBirthday.Value;
    dt.Rows.Add(dr);
}
```
畫面的呈現
<iframe src="https://drive.google.com/file/d/0B24tdidnsV1vam0zQnNvRnhNcjA/preview" width="640" height="480"></iframe>

[sample 的 github](https://lh3.googleusercontent.com/-ZkkhY1m-0_ih0B2QEPAwBaOsQIEAHfk1luspxwijTpYEHEFQL7GXEs8E0vu8KETIi3ZLsZICjqb6Ku9L-FUl8hdjpobAHg24O0i_kC-RtDDOWKgt4wre0P8TtxRPpgVhSrKCRbohIG77WkRnf0-pQLVIqPDSOekWW9xFhX5UTfEsaW8aKZNIaPn_3TfGHx5ogpZijRSEXgzLcpPBGF1NXWNcm0o9HvBdmd17szn1tkO3pPFae-xPnsGzgEE1lJf_A-K1Qon21DgDtK4xEEinxNU2jt1oBhjmOERO5G3NYr47lcCBPd4hZ2cpJbyUxo6jebDkR_eKxEUBpC1zMZG7fbvBSphuYuISQXy6w7CKbp2gsRG7Tux2T03DNi-YCo5FWlVOkcE4TPVHe64cO3TmVYRAz_WW_tZeniUzsokNkC0NsYMCUOZwO9pd2K_Vp9McU_5LJsf8ucioHcSgvajWEH4jpUH33Ro1Nh5PHMRcCrfCppgJXWz_2hWeL-clL_LOitZFqvPyYBViwi3L7Kxo-GtWrZeeGOQcF9iiutY2jei5V8kKAkBkQIbMJACCReVZkHbrKJWzipAGjdMzJhLM6d8yIAvVYrGZHt5SPAe28a83NCkvvVD6Tl1m5uzQmI32s3-DOjwjhvPVLq58AjFyA5G9S_hfdho9t5NVGHceQ=w694-h483-no)
## 參考資料
- MSDN:[UseColumnTextForButtonValue][5]

[1]: https://msdn.microsoft.com/zh-tw/library/system.windows.forms.datagridviewbuttoncolumn.text(v=vs.110).aspx "MSDN:DataGridViewButtonColumn.Text 屬性"
[2]: https://msdn.microsoft.com/zh-tw/library/system.windows.forms.datagridviewbuttoncolumn(v=vs.110).aspx "MSDN:DataGridViewButtonColumn 類別"
[3]: https://msdn.microsoft.com/zh-tw/library/e0ywh3cz(v=vs.110).aspx "MSDN:DataGridView 控制項"
[4]: https://msdn.microsoft.com/zh-tw/library/system.windows.forms.datagridview.cellcontentclick(v=vs.110).aspx "MSDN:DataGridView.CellContentClick"
[5]: https://msdn.microsoft.com/zh-tw/library/system.windows.forms.datagridviewbuttoncolumn.usecolumntextforbuttonvalue(v=vs.110).aspx "MSDN:UseColumnTextForButtonValue"
[6]: https://msdn.microsoft.com/zh-tw/library/system.windows.forms.datagridview.allowusertoaddrows(v=vs.110).aspx "MSDN:AllowUserToAddRows 屬性"