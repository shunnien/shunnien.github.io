title: DataGridView 在 winform 的簡單操作(1)
date: 2015-12-15 09:54:03
categories: [程式技術筆記]
tags: [C#, WinForm]
description: WinForm 下的 DataGridView 操作(1)
---
## 前言
有一位朋友最近接了一個 Case，這 Case 後來變成 WinForm 的系統，他對於 winform 不熟悉，跑來找我一起討論，我發覺我也很久沒碰了XD，覺得順便整理一下好了。
## 正文
我準備把[DataGridView][3]的操作當成一個系列來介紹；我會把範例程式丟到[Github][1]上，然後此系列應該都是同一個[Repo][7]，請大家觀看的時候配合 commit comment 。
1. ### 範例資料
此處採用[DataTable][2](因為朋友那邊是用[DataTable][2]，所以就不使用 Object 了)，關於資料處理的部分就不贅述了
``` csharp 要載入的資料
 private DataTable sampleData() {
            using (DataTable table = new DataTable()) {
                // Add columns.
                table.Columns.Add("Name", typeof(string));
                table.Columns.Add("Gender", typeof(string));
                table.Columns.Add("Married ", typeof(int));
                table.Columns.Add("Birthday", typeof(DateTime));

                // Add rows.
                table.Rows.Add("Allen", "Male", 0, DateTime.Now);
                table.Rows.Add("Kevin", "Male", 1, DateTime.Now);
                table.Rows.Add("Dean", "Male", 0, DateTime.Today);
                table.Rows.Add("Jenny", "Female", 1, DateTime.Today);
                return table;
            }
        }
```
2. ### 畫面設計
視窗畫面的部分，如下圖設計，有些功能這次還不會描述到，但是可以先設計。
![WinForm dataGridView Usage](https://lh3.googleusercontent.com/COImHwdCxJPobHK9TULGkVIpZ5nx8Wv7Z8saqnFt7ItL6d66z1Ntx8V-V0GeQarPzE3VFOHzpEj1jy4VjtJU644Kfbb2PRF59ekcWWOKJzTBJXH2o7azVV34dSqSz1XagrWPFUGHyTi8nzUrOqpDNDpl48BDiQWZc2GGTMkPfBQOpPouMiS8trgFP0HKDI8xrD2XRcL6nWedOGB4rNLS97NVHBOMybzYAVTPcgn-COVw9HA_vIoTmH_K8sUVDgvfagUYJtRIiF5bJnPUZ34ASshC8GASWiHqaGTWHGyxFOC5sM-jGyV4uuflfWSTYtnVclTdiHlMoDWxLgBUf_30riSBlXLd8WHy_gf6OXPEdMtGtK2zIvRudS52eq-NCoVYiTyHLWMQAPq3UJtw5djOBS1I3vsECcjCWoPU84-DcEoZtfTITZfDni78nOj_nx-yc9T5rEUopfCdyEZN5qf9tUsbvrK5X2F4bgYemt-No7h0c-T3XR8LxmEVPkUdJGd4DmRGZCd93qPqMizuIpWMmz5qEAWG9SkWPpa3lmCtUBJq3rsFaLZ3qL7jIFPodsfDh-ZNugr0M05RvJ1UBVNDh5YwCEqOQFwovOEtycIxHeD1L5DsCagtM9wWU54s225amV_6DpDkZXf97WRvai45XFbTo4OBSnlOzXzAI-vN3Q=w606-h502-no)

3. ### 欄位屬性設定
比較需要注意的是[DataGridView][3]的__Columns__設定(此處不自行撰寫程式碼，而依靠編輯器的 code generator)；需要在[DataGridView][4]的屬性視窗，點擊__Columns__這個屬性設定，之後就可以設定[DataGridView][3]顯示的欄位，另外需要設定[DataPropertyName][5]這屬性，這屬性跟等下需要綁定的[DataTable][2]欄位名稱相同，這樣才可以對應綁定。
![Property Columns Set](https://lh3.googleusercontent.com/V_3tStyrJWCGD4GyWho6JktkuEO3Q5lsZrfSjvVzWuZ8NdV5BszSFVvy7EywiPaDTUUkaRDphRkvCXopUfC4teeJ-GpuW7QRartPZdFVVkSnThbC5hERC2kHUCkqYKwuD2mV5P1CYHH6VwwKFhPMrSu1_sEk1tA-TaqnRSRGwbikBMvb77VXvTasENvEv0_Vfl7ezOxqvgigUmjV-2zH8CNqFUOMGA6IQIdONJKpGOscx1Sn_qyjG_BJhZss1R7vuC4uP4O4YM07XSru7d8I67my_Me3mSgGTOhej8_CAjMqn57qVRd7tjRAXvVGaHLLikEq77dAq1umwFVD3kQ1GfebjMxQnl32XKBOrS4EtvQHlEFO5Ueg8S73-JjPAm0JK91-9Dvz1LT3JQfTdtUkFp8qpaO29y-v4JSJAQELaH9Xxh61zwUWhcEuu3wOHxpYaVdswm6gRvHyTlUSjmnosAp2b5QzupgXKxv9p7DV9ltAskWlKjkG98tNDdCc2s0k9bVcCvtpLyFHih02XLrHAp5HCKJStrkU9hlNaCmQRjqiANgaDhDTDlTZEvZKp-uwuteW2CPVtyBAd9P8UkpvCvK-iA92xfm_qWyOGYK13k4Yf6x9f_lGVe1cT3yMKXcTk4NEeMNW_06YK6qnHqRo84lrj0ALnnX7roKS0RUs8w=w419-h232-no)
![DataPropertyName setting](https://lh3.googleusercontent.com/1F7yFS0PUsvx2uJhLHgxkab8HpYkMBQuus3ZDzgjaQLUseYr-196ZxBhbsgq_x1WHvjZa8zvs-pLlrKDjsx7BHYciW0oM0W9jPyyIUHoUUx9uftkDV98C3wBgVjWnC3ZvElUTdgA71n6dJAjVNVn0MlM_LSjpV30CzMXMsJvnlykKxamzPl7hHzeojhc5FLPP5Y_OUDW7rq7CfYFaFL58XFDt9AlllYX51ueRd6rxacFp1FtXh1EzEAOoMywh79i1XL60-dfrZ7S4GdJfpAOlAdTOUS_uabjAO8E-sfuzohjwkjdUKa3m_LdhkhqcoZdViHX-VCwgE6aJZVobAe6AIloyhC0Sx9R_edMbdQaBkELI36Nc_3zMCFyMfoSsV0dqMdxbJe5qm0jVeMTeAHES11hJv6MtOj9CJX09YfsYaP45BZyZAPKtUZg7S_4lWlMz9kxIXeXTUlwndQ1D9Lgu_Ld7509NnPacypQBt7n-bHkxbWTsLxUkV4lexSqzpxaXQIxPnZjZnldlTm_MEcnOl3tEaF5WHgyBC-3pziV6X2VxtxEXSG-ME7BaDcItvNXmUGgSgrg-o3Z-5jfqXDNp1xvVZjatpBMwmr1PUmLFFUZjjEPHdFuIt4exq2P6vqND0o0P_AGweBUiYWM_MTeC5sf356hiDhdc4NE4b7D1w=w840-h505-no)

4. ### 資料綁定
這部分的程式碼很簡易，直接將[DataGridView][3]的[DataSource][6]屬性指定為範例資料就好
``` csharp
public Form1() {
            InitializeComponent();
            gvSample.DataSource = sampleData();
        }
```
呈現樣式會這樣
![Sample Display](https://lh3.googleusercontent.com/jGvOMEpUFdPKWiuLAmSOW_yXox8e2oP9y66NNTtf_Irub_rU1-cw-eXr1MZaOBkCrM9JwP-FKu-tiApWEJzEWUrdc8-pgMiOrNPvyr6QUrH0xIlkQd_Cvib97nTuBTRiV7QIXsOh2uX5Bnfjmc4TXgjMbkF69QGvWOs6qZJEGN6ppu48QweJvic3b87gLrOmgt0MTMuJeIUgOOtTtLuA90Jwf-gsD7RbMBlGbUv-ggFwZVidA2Mg-brMVr5TRm1Gk-sbogw9CTGyKl4A5V06BABS6JeB_uabViJNxeAxyPXn1BuxLrAQsKUiSY5dpnYxQ18ze1IS-dLvcT-oWeBM8D_RVt-9rM2M-y1HhPllWVBgqi1tsb3GaOraHNjL9ASifU8ca5Ufxu6sD5azsGFoupcYmZIPdBT2ZX81QqkTNEP1hvjbqXP3OgbdPyql2gtAOOLGRgMib8SGKWknwNsrOFxVIEtt7o9BILCB5C3ZlfGyeBp5ZVMpaSJkZz5PszUgw983M3RA9V6gAbjIpdY6B6FnF7JyEQilISY-BPGGK0AhhKc9O4TgrCnxU0COoRFtoQt7UGOdMvqXKqueqce53tuNa9Dti14hQcVgKcFGzC0DsQWcilFIi1HKXTFvgvac4UmkvZZRUC4C4iRhw5O1l19-ir1jWE5PIqccQYgthQ=w694-h483-no)
附上 [sample 的 github][7]
## 參考資料
- MSDN:[DataGridView 控制項][3]
- MSDN:[DataGridView 類別][4]
- MSDN:[DataPropertyName][5]
[1]: https://github.com/ "Github"
[2]: https://msdn.microsoft.com/zh-tw/library/system.data.datatable(v=vs.110).aspx "MSDN:DataTable"
[3]: https://msdn.microsoft.com/zh-tw/library/e0ywh3cz(v=vs.110).aspx "MSDN:DataGridView 控制項"
[4]: https://msdn.microsoft.com/zh-tw/library/system.windows.forms.datagridview(v=vs.110).aspx "MSDN:DataGridView 類別"
[5]: https://msdn.microsoft.com/zh-tw/library/system.windows.forms.datagridviewcolumn.datapropertyname(v=vs.110).aspx "MSDN:DataPropertyName 屬性"
[6]: https://msdn.microsoft.com/zh-tw/library/system.windows.forms.datagridview.datasource(v=vs.110).aspx "MSDN:DataSource 屬性"
[7]: https://github.com/shunnien/DataGridView-winform