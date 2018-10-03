title: 程式設計的基本認知
categories: 程式技術筆記
tags:
  - notes
toc: false
date: 2017-08-11 12:58:49
description:
---

在程式開發上，應該都需要**降低耦合**，**增強內聚**這樣的認知，而為了達成這樣的目標，就會有介面、原則等等...<!-- more -->

## 抽象
找出關鍵性特徵並加以描述；抽象表示一個群集，所以應該依賴抽象，而不是倚賴具體。倚賴抽象的目的是希望程式碼易於變動。

## 目標
- 高內聚
內聚性除了程式上之外，還有設計上的內聚；設計上的內聚，就是命名上的設計，例如：Math 這 Class 的方法都是低內聚，裡面的方法，看到 Math 就知道裡面的方法都是數學相關的運算，不會再 Math 裡面看到 sql connection 的方法，因為這完全不相關。
- 低耦合

## 特性
- 繼承
繼承是為了多型的目的；B 繼承 A，所以 B 就是 A。
- 封裝
- 多型
有泛型 <T>、多載也是多型、強制同型也是多型(編譯器比較多使用)

## 原則
- 單一職責原則(SRP)
- 里氏替換原則(LSP)
繼承父類別後，不要遮蔽父類別的方法。
簡單說，使用父類別的地方，都可以使用子類別替換。
``` csharp
void Main()
{
    Class1 c = new Class1();
    int val = c.Test();

    Class2 c2 = new Class2();
    int val2 = c2.Test();
}

// Define other methods and classes here
class Class1
{
    public int Test()
    {
        return 10;
    }
}

class Class2 : Class1
{
    public new void Test()
    {
        Console.WriteLine("Test");
    }
}
```
- 倚賴倒置原則(DIP)
倚賴抽象
- 介面隔離原則(ISP)
- **開閉原則(OCP)**
對擴展開放，對修改封閉。
- 最少知識原則(迪米特法則LOD)

## 參考資料
- [SKill Tree Bill 講師][1]
[1]: https://skilltree.my/