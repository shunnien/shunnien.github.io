---
layout: post
title: 'First() 跟 FirstOrDefault()'
date: 2015-11-04 14:46
comments: true
categories: [程式技術筆記]
tags: [C#, Linq]
description: CSharp 的 First() 跟 FirstOrDefault() 兩個方法差別
---
## 緣起
前陣子有個朋友跟我詢問一段 [LINQ][1] 的 code，說輸出不是他想要的值，不過當時我去倒杯水，想說回來再看的時候，他自己搞定了 XD，雖然已經解決了，但是既然都抽出時間了，就還是看一下，看到他使用了 First() 去解決，就問他怎麼不使用`FirstOrDefault`，不過那段 code 還是有些需要調整的地方就是了，以下就先來看看這個問題吧(我憑印象中的 code ，可能跟當時的有點落差)。

## 問題
``` csharp
Dictionary<string, string> Address = new Dictionary<string, string>(){
	{"zipCode","郵遞區號"},
	{"city","縣市"}
};
string str = Address.Where(p => p.Value == "縣市").Select(x => x.Key).ToString();
Console.WriteLine(str);
```
上面的程式碼會輸出以下的結果，但是其目的是想要輸出為 city

``` csharp
System.Linq.Enumerable+WhereSelectEnumerableIterator`2[System.Collections.Generic.KeyValuePair`2[System.String,System.String],System.String] 
```
為什麼會輸出這個，也很簡單，LINQ 的 [Select][5] 回傳的型別是`IEnumerable<TResult>`也就是說是個物件，因此在物件後面直接使用 [ToString()][2] 就是直接輸出該物件的型別狀態

## 解決方法
既然知道了原因，那就有了解決方法，加上個`First()`或是`FirstOrDefault()`就可以了，改正如下
``` csharp
Dictionary<string, string> Address = new Dictionary<string, string>(){
	{"zipCode","郵遞區號"},
	{"city","縣市"}
};
string str = Address.Where(p => p.Value == "縣市").Select(x => x.Key).First().ToString();
Console.WriteLine(str);
```

## [First][3] 與 [FirstOrDefault][4]
就是看到朋友是使用`First`解決，才想把`First`跟`FirstOrDefault`一起列出來，不過上面的 code 是示意而已，不要太介意為啥這樣寫。現在先來說明，[First][3] 跟 [FirstOrDefault][4] 差別在哪裡，其實兩者相差的點很簡單，使用`Enumerable.First`找不到資料的時候會出錯，而使用`Enumerable.FirstOrDefault` 找不到資料會給予預設值，使用上述的例子來示範一下
``` csharp Enumerable.First(會發生錯誤)
Dictionary<string, string> Address = new Dictionary<string, string>(){
	{"city","縣市"}
};
var queryF = Address.First(p => p.Value =="2");
Console.WriteLine(queryF);
```

![Enumerable.First Result](https://lh3.googleusercontent.com/PcmjVMFQXBxQEuke54Qnl2uwXK712VTfg-djruLOZLZuf1-vb446BwK_6nIRKb_ecCgLy_d3s3wyS3Uo9FaPNMqGYYi0mNLnKs5Qx38lZZ68kClzc6pImwRNzacttVR4M2FUTByXXDNWWhszcuhxR8J3EIXbU7H_0JsyOYmKJOaYfie5Iyw56HLD6ifVbtBWfxJU3WUOoVxtYINBR25w0rrkzeJl19rLoMTHrEuEedDLzHHY_BdVnhAknsUZt-h66mUltm7w5HkixkZquj0JFf8SaiaeC9S4wn96SQ4MRE-ncA-SohnDPPp4Y1tu0DZQUKxBOdofFbpTHpKkHWllUBbeyvr1mdAxeHER5IcDO0OU4GeqTDaa0I4djFoFJ-GqgZGrJUdva-9dnVQz0iqtZFL2bRL6FnyuqWEiXfzAKN31F_T9NEliAgsd6XrZw-Kvcw3lhiHjI30_kLGQOb7W78PxZzURpzDgkdK99MSpbxhLMAsMc8LsP_Sigyzflb3uZ3NADtbqsZpI2XlqNmhv1c7unDbRyRvdFJuVvz8MDuMZRqEEGdfux_C3CDrsv0ESEozUhahqAhKZJomqlrVU8EP8OBhUVggNi9brQqkZH1eKpupPSGU1ojVizG24pSXKsPeRSC1F9Juaei73q_ZD3HeQ8bPBMy4KA94EaVcYXg=w753-h266-no)

``` csharp Enumerable.FirstOrDefault
Dictionary<string, string> Address = new Dictionary<string, string>(){	
	{"city","縣市"}
};
var query = Address.FirstOrDefault(p => p.Value =="2");
if(query.Equals(default(KeyValuePair<string,string>))){
	Console.WriteLine(query.Key);
}
```

![Enumerable.FirstOrDefault Result](https://lh3.googleusercontent.com/M_LDcyF5Jz0rBY7a0MaR6OfXq1sltbHvOzG74YQ817Uj1IjOckKmcIgOqWhGpAO68dEN0h32qnKrO1P9z9EbJqBUTWRSIxbTvth3uHrrMK2fZLt5xypqUiWeGKj42cTxvg00SozWyEjUj1RN2nC8CxUE6Xr7SpNduXrhK_0egR3FfmfXaZJK3_JUj0GE6asd0jlAHq6QtovjzwqoDIyBC5BcKIA2C_L0XFDKejLgkyiygaIEOrspI0H-tqZO0fhjHgrusFJLa4ez1-ahRjuo2sfQl5tnGPYsksdOWaBL5p4_kwIcBk15n6RZAM29erV2UaSUNBZJrrCMyabkXi46d4nWJC13OKUPbjB_lv_ukUqlL4ztFpbiTWgWaKfNXMo1txelwRSp7JiuyTCd8tiB8QQBIhJ-hYXeQVP-QA5Z4hB_FO7YIPhkbKYOMKo71WZ66OlYRRSDy0dmaMn50oiXFcfQif2BXiLJVH9Gw2cBD-WF2CGVgXpdVFODsOhjKnlM3yfEyaYhIoau8RZl13W5AFbkMf3bF-_woqCVWsjoo1MBKr1MRVAoyfFX3fwtlUXaTQ1CgqjiPUNhIiJqbQAUoL20MBCfJZFtkO3nNsmAHXz03vdtzHrRvi-HOii5V4mbG2JgObjxsia4v7WG_Uj7bxsqQhL9lqX4PfCcjRUlBA=w661-h322-no)

[1]: https://msdn.microsoft.com/zh-tw/library/bb397897.aspx "LINQ"
[2]: https://msdn.microsoft.com/zh-tw/library/system.object.tostring(v=vs.110).aspx "Object.ToString"
[3]: https://msdn.microsoft.com/en-us/library/vstudio/bb535050(v=vs.100).aspx "Enumerable.First"
[4]: https://msdn.microsoft.com/zh-tw/library/vstudio/bb340482(v=vs.100).aspx "Enumerable.FirstOrDefault"
[5]: https://msdn.microsoft.com/zh-tw/library/vstudio/bb548891(v=vs.100).aspx "MSDN - Enumerable.Select"