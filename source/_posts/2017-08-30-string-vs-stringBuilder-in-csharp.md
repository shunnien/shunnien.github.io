title: 'C# 中 string 直接累加與 StringBuilder'
categories: 程式技術筆記
tags:
  - 'C#'
toc: false
date: 2017-08-30 09:31:50
description:
---

這陣子再重新閱讀設計模式，想到了 **String** 與 **StringBulder** 的對比，裡面應用了 **Builder** 這個模式；後來想到這兩者的差異也沒紀錄，這次就順手紀錄一下<!-- more -->

兩者的主要差異是在動態處理資料時，資源使用程度。

- **String**
**string** 是參考型別，所以每次在動態處理資料時，都會再配置一個新的記憶體給它，但是原本使用的資源雖然最終交由 **GC(Garbage Collection)** 回收，但是在回收之前資源卻已經浪費掉了。

- **StringBuilder**
使用了 Builder 模式，會維護一個緩衝區，以容納新資料。

``` csharp
void Main()
{
    Stopwatch sw = new Stopwatch();
    StringBuilder sb = new StringBuilder();
    String str = "";
    sw.Start();
    for (int i = 0; i < 10000; i++)
    {
        str += i.ToString();
    }
    sw.Stop();
    Console.WriteLine("String Class :" + sw.ElapsedMilliseconds);

    sw.Reset();
    sw.Start();
    for (int i = 0; i < 10000; i++)
    {
        sb.Append(i.ToString());
    }
    sw.Stop();
    Console.WriteLine("StringBuilder Class:" + sw.ElapsedMilliseconds);
}
```
動態處理 100000 筆資料的花費時間，輸出結果如下圖
![輸出結果](https://lh3.googleusercontent.com/Z0_uAcxoiG5o74KWsV9m0bHTk0cFunswJZerADEfT4oVtcBEvwrNvS9klwVeLu0DYzb5kqFYFFqtGe7KUoQjoeZWlltai4_NOU045snCIqDD0VR37JCuWk1V72bwcnWNNcvlW35bl3_WZFTfYjKHUTmrEZZFuK3FZafNBkkqY0gjdLRqF7P8fIy-MPpSz94b8zfq1013h1A2q1HOhaIoiaUXuXkqinhif07y-iU6ts8VnCjI0RtAmtA7XiUPSMbgao_p7KK6OZJJe3du0Zet6t_ZrVD6cYaMC5brEVJ7-tXmivLnL43QJPiRQwo5kZ0giFHO43O4_NqDXjNFaUGWfubQpOOQjxEnuCT85o-yNk_Q1ubljS85UW7PsbT6KFCxAcDRCQejuzVu_4jgaGatwQ9zAH7BN9mHA1EW9xtOJsIT1ZxYpgPiH-ADDfAgkDnT8EXFeWT1wabA3FKGWPfdHl6QzVdhFIjl5_DhgpqW631AIW7gZ-8PZYf404e-4rg7b1FAI6OeOdy6MamI9yiVk_jNSBvNHWEVFosrQ6H7eVXOjvMZkY_eCP8lWoH1M8mSVFfZgZ-IxZu9Ubf3GRunnpEMYeSUvrDEzdd1TuIN9WFp_WHGiJhDOmxXQdAy0cuEILAoApTi9l6xpM4oRSj9uW4e3cvX-Vc8f_bl0-z2vcg79g=w311-h105-no)



## 參考資料
- [MSDN StringBuilder][1]
- [MSDN Strin][2]

[1]: https://msdn.microsoft.com/zh-tw/library/system.text.stringbuilder(v=vs.110).aspx
[2]: https://msdn.microsoft.com/zh-tw/library/system.string(v=vs.110).aspx