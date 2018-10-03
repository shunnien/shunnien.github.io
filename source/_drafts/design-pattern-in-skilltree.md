---
title: design pattern in skilltree
categories: 程式技術筆記
tags: []
toc: false
---
決戰設計模式第一日

一個抽象的定義，抽象表示一個群集，所以應該依賴抽象，而不是倚賴具體。倚賴抽象的目的是希望程式碼易於變動。

## 兩個目標

內聚性除了程式上之外，還有設計上的內聚；設計上的內聚，就是命名上的設計，例如：Math 這 Class 的方法都是低內聚，裡面的方法，看到 Math 就知道裡面的方法都是數學相關的運算，不會再 Math 裡面看到 sql connection 的方法，因為這完全不相關。

## 三個特性

繼承是為了多型的目的；B 繼承 A，所以 B 就是 A。

多型：有泛型 <T>、多載也是多型、強制同型也是多型(編譯器比較多使用)

## 六個原則

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

------

- 生成模式

就是 new 這件事情封裝隔離。
Facade 是為了縮小降低介面複雜度
Adapter 是為了適應原有的介面
virtual
使用在預設行為
ex: protectd virtual

Chain of Responsibility (責任鏈模式)

直到物件沒有處理他為止

------
決戰設計模式第二日

## Review

生成模式，例如:factory...
結構模式

## State

可以在程式內就決定下一段的，大部分會使用 State；而必須在程式外，才能決定下一階段的，則會使用 Strategy

Prototype 在效能上沒有優勢，實際上是在意圖上的定位，其意圖是在忠實的複製物件

------

# 決戰設計模式第三日

Stream 就是一個標準的 Decorator 模式。

## 參考資料

- [Ref1][1]

[1]: https://shunnien.github.io