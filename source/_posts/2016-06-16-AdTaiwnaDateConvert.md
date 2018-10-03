title: '西元年與民國年的轉換 C#'
categories: [程式技術筆記]
tags: [C#]
description: '介紹西元年與民國年的轉換 C#'
toc: false
date: 2016-06-16 23:34:46
---

## Introduction
這陣子在改一個案子的舊 code，看到使用西元年減去 1911 的方式處理年份，月份與日期不與年份處理，這樣子進行轉換的確是可行的，但是個人還是比較喜歡使用 Calendar 的方式轉換；

因為使用減法方式處理轉換，萬一順手把月份與日期一起轉換，在閏年的時候就會有日期誤差了。
![errorEx](https://lh3.googleusercontent.com/G54xIonGf_LNMrYUNXkGFGNJC724d58NZGEsWS6xP9WGk4Nu5KRXg9AK-97syFNI_SV-GPTiElFUoIJ_f7nlGhsJH9Qv5AZPN9WPeTwTjwxg6ohk1xqIBI7hFkUCFWJ0LNN7AZ43LLXtUkJfgAuQgy1S7Pd4dYhvVwBmea4OnWMLwdt_iEUotNPbSBQllkfdCdyh42y1XKRHix36w7fsXsc77RTivp2WxeG-O6F-TBF3l9Encgi2g5iKlsCzmLJ1V9goRpimESE3UzACVnVW8gx-EyfnCgs-TfyInqTigiTA5ts2iABI5yweFCclwP61Dz4gqypUWik-0q5DE5EhBX1uwFXKnmhc43BCE8N4keL0qQ-Dn95ZduDN4hi7LELteyaFPNvwxnc0PGSYTvVV3JpObiF4Yo3vJs8rP53vlr9-RhjgkVXJddRrrYQ-wC2_9PNdtYcu5eK-TE9eGkO7nrsoMo9ABbZZKavgiz83Wyi33w3DkouJopFPJPHCJa8BQ2yieLsFTddPEui_S1TENYQ2CFUlz3naDx7RwXSzE5cPn14AyLoaHQ-f2X0VYrfIdYbxtfvKo22kUOHoAAReEFBJFMDGHA4bctvQlMlAIzcotUxJtAy1hNZrEL4uSnlaC9j4RWn3PBYSNCkByh6sRBoTNIdDb9RWLQdjNv2jrg=w441-h219-no)

## Conetent
個人習慣的處理方式還是使用 **Calendar**，而且要轉農民曆也方便 XD

- 西元年轉換民國年
``` csharp
string sampleDate = "2012-2-29";
DateTime dt = DateTime.Parse(sampleDate);
CultureInfo culture = new CultureInfo("zh-TW");
culture.DateTimeFormat.Calendar = new TaiwanCalendar();
dt.ToString("yyy/MM/dd",culture);
```
![AdToTwCal](https://lh3.googleusercontent.com/T3plt7Y-v9xbwsU052c5fOyCgHRFJuT5BOyOlZ-H-jEYEnAuiUvu5uNIzXHRocaxI-WSuetbnpsRnK1CWAZI0pjjDoCn28mb84bpjN2PXp7QdfgXQd07_JGegfi6yLHNR3i3JzXa7cJ8rYVY_4A3PuvbJ4VJfUufCUn38a8yDdmMMGwo8_mlaIagzzX1mqn9sDC8EJGHZ_7ny_4uoBQpuzGPoR2XWN6yBUvcAqFQNiCDgcHgitxI_wUoi7EClglvV5eyJ9fWCzIW11KZWcSs4WLVw8VNi4yJ0xlWxi3CsyRPGKxBcdQcu1nwq2rPfiPUCvgVfScbrEJqxTAjNk6WTTforyEUBrlpI_OR4WWYCHtKcpabKJ77hAaDdKVvGemmw4VA-dvt18l4-XznR2oCAAzSWdUV3zTILuU1ZXHarkWugTBqeO1xG3eEfrwFxpDnLHJ0yFHVPuDKSvYI3sf-YYDTkxmZBvV_OXvPJZsSHFqEYJhl5iX9AeTTBRlF1F2IcumZYHP65EQkl69zpHXHEuMlMVwzvvhzv7oOD65-i5m5PHhN5yhn4eTp_xe4synVrcPtptJW-PdLJm0COQgqFtH4A9HwKCSgOBp_q1HEfVByW_t-iz-yduf9fVu-ahPV2PhRGKocA-qPLJu64nz91608BqiBMzdNwSGOPVt2tA=w494-h249-no)

- 民國年轉換西元年
``` csharp
string sampleDate = "101/02/29";
CultureInfo culture = new CultureInfo("zh-TW");
culture.DateTimeFormat.Calendar = new TaiwanCalendar();
DateTime.Parse(sampleDate,culture);
```
![TwCalToAd](https://lh3.googleusercontent.com/ikKMh8PsGPADuY1pc6PSEaEK0gKBvnWsXSQEDZ5joqdc8pKVDFCBsbyQjObZtCwvciVB8DPyPCF-Xd_0JHHW7OL3hso8jMbjDoyhU4MO6xH023lgQzzKeAk7-C9zroaVjVrkLzaOr3d-D_EIpifz3QHObmHHBmt7U0nMKeOTY-bRcfPEfOp7jhnaTkzDai2FK3jxu5YSkD1YDv82WYsBFCb4-_sE74P72ZhCVWoibbu7bqZpvdSB4crasufCqDoLIWhDfQqWSLLb35A_Hb67DB4f43cF3FXfGW0-N58N_npNwjrgK-BU7vDJCe2SJ-0zQRW_Fn6wvY4KFvqdQvNCA2Ph8R_NWul2WBrryUn07rpSJ5CWBhCt85AqeDE5l4VQbjAbJ4nr0j1TufE_GduYYC7R6nO023IhOD3iK_zibe9YU57pXrE-HV7jFGqm6x0f7lq7dy-VG-RDqpQ6t9J3LAGTV_a3ErEnI_2nHGoglQzpfm5324U8BmvmrXFQE5Q-Qo0lWEnrhbFj9E6WKTHP7SFhLzkGmrpOcMnZ6LflifbyTZGgSIZquFUxDjbIR3k_Enxo8Y-UYLjz0qyxCDXjpNsvEznklK4wVcNKXgjtYMku6GvD9Or5Mk_1K5OfjfqNpty_iGMdAF32dNuzwUlMVL-HUUj3zCaXK2Q3OYpoZw=w454-h295-no)

## Reference
相關的資料非常多，就列出幾個比較知名的部落客
- [Kevin 學習筆記][1]
- [darkthread][2]
- [愛流浪的小風][3]
- [Will 保哥][6]
- MSDN:[CultureInfo][4]
- MSDN:[TaiwanCalendar][5]

[1]: http://kevintsengtw.blogspot.tw/2014/06/c.html "Kevin"
[2]: http://blog.darkthread.net/post-2012-03-01-leap-year-and-taiwancalendar.aspx "darkthread"
[3]: https://dotblogs.com.tw/kirkchen/archive/2009/11/30/12223.aspx?fid=56031 "愛流浪的小風"
[4]: https://msdn.microsoft.com/zh-tw/library/system.globalization.cultureinfo(v=vs.110).aspx "CultureInfo"
[5]: https://msdn.microsoft.com/zh-tw/library/system.globalization.taiwancalendar(v=vs.110).aspx "TaiwanCalendar"
[6]: http://blog.miniasp.com/post/2007/12/04/I-Found-two-very-useful-Calendar-for-Taiwan.aspx "Will保哥"