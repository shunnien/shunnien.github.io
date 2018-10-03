title: 'C# 中 Boxing 與 Unboxing'
categories: 程式技術筆記
tags:
  - 'C#'
toc: false
date: 2017-08-31 14:09:53
description:
---

**Boxing** (裝箱) 與 **Unboxing** (拆箱) 會有這兩者的出現，簡單說係因為[**實值型別**][3]與[**參考型別**][2]兩者間的處理，不過針對這動作所造成的影響，可以進行簡單的小測試。<!-- more -->

{% blockquote 資料來源 https://docs.microsoft.com/zh-tw/dotnet/csharp/programming-guide/types/boxing-and-unboxing Microsoft Doc %}

- **Boxing**
是一種**隱含轉換**，是將**實值型別**轉換為 object 類型(參考型別)或是由這個實值型別實作之任何介面類型的程序。
![Boxing 轉換](https://docs.microsoft.com/zh-tw/dotnet/csharp/programming-guide/types/media/vcboxingconversion.gif)
- **Unboxing**
將 object 類型**明確轉換**為**實值型別**，或將介面類型明確轉換為實作介面之實值型別的程序。
![Unboxing 轉換](https://docs.microsoft.com/zh-tw/dotnet/csharp/programming-guide/types/media/vcunboxingconversion.gif)

{% endblockquote %}

``` csharp
int max = 100000;
int flag = 0;
Stopwatch sw = new Stopwatch();
sw.Reset();
sw.Start();
// 經過一次裝箱
for (int i = 0; i < max; i++)
{
    string str = " i = " +i;
}
sw.Stop();
Console.WriteLine("one boxing time:" + sw.Elapsed.TotalMilliseconds.ToString());

sw.Reset();
sw.Start();
// 不裝箱
for (int i = 0; i < max; i++)
{
    string str = " i = " + i.ToString();
}
sw.Stop();
Console.WriteLine("no boxing time:" + sw.Elapsed.TotalMilliseconds.ToString());

DateTime now = DateTime.Now;

while (!((DateTime.Now.Second - 5) == now.Second))
{
    string str = " i = " + flag;
    flag++;
}
Console.WriteLine("one boxing 5 second run :" + flag.ToString() + " times");


flag =0;
now = DateTime.Now;
while (!((DateTime.Now.Second - 5) == now.Second))
{
    string str = " i = " + flag.ToString();
    flag++;
}
Console.WriteLine("no boxing 5 second run :" + flag.ToString() + " times");
```

輸出結果
``` txt
one boxing time:12.413
no boxing time:9.1419
one boxing 5 second run :26794548 times
no boxing 5 second run :32986447 times
```

## 參考資料
- [Microsoft Doc][1]

[1]: https://docs.microsoft.com/zh-tw/dotnet/csharp/programming-guide/types/boxing-and-unboxing
[2]: https://docs.microsoft.com/zh-tw/dotnet/csharp/language-reference/keywords/reference-types
[3]: https://docs.microsoft.com/zh-tw/dotnet/csharp/language-reference/keywords/value-types