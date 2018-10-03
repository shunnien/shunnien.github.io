title: 'C# 中繼承的執行順序'
categories: 程式技術筆記
tags:
  - 'C#'
toc: false
date: 2017-08-20 12:52:59
description:
---

在巢狀繼承中，建構式以及設定式的執行順序是不太相同的<!-- more -->，以下針對這部分，使用個簡單範例來說明。

``` chsarp
void Main()
{
    Second obj = new Second();
}

class Ref
{
    public Ref(string str)
    {
        Console.WriteLine(str);
    }
}

class Base
{
    public Ref BaseString = new Ref("Base 初始設定");
    public Base()
    {
        Console.WriteLine("Base 建構式");
    }
}

class First : Base
{
    public Ref firstString = new Ref("First 初始設定");
    public First()
    {
        Console.WriteLine("First 建構式");
    }
}

class Second : First
{
    public Ref SecondString = new Ref("Second 初始設定");
    public Second()
    {
        Console.WriteLine("Second 建構式");
    }
}
```

其執行順序是繼承的最末端到基底的方向(**子到父**)，執行**初始設定**，再由基底到繼承末端(**父到子**)執行**建構式**，執行結果如下：
![result](https://lh3.googleusercontent.com/I5s0lacU7EI01KtTK0cF_yNBYkZ0yhvlq7NCdLB3uNF8TUiKlHZ_1YfPlaIKwqM_y_ApGTi_s4jA6qoUMAK6nwGziMrSKmAVuQy_30hQlC-bh82J6MDYOgwFkbbRAL0AyxDrwxRX5QFUVmWFnRo-NVT3JbzGjLn6Bl4Rw6WDCoEaPT33po1jngb-cYd02zBIfGqGHjWY3DrDAirEXQ45kmaQrhlRKxhdnSeXkH9Z5MVs4nyNKcdZaGrIvBRKpnb2bImJCCtZuoHzEorZoU_f1YRF0ruEqzq-7TTOGHGDK5CZp75r9PxDwvtzrHjAAsQ03csuRcEjuF7bzQcnJ7-fZYbLLCCgEDC7LxnIaD_TsH1krg4_1XTrhB2nUS1J5Q_iZ57_PV7d0NI5aqnctjDRdN0i9rBLplguMKlTS9Q0R5xLSDeT0kZ0545yu2UoKTfxJ4m-r9aWG8MCMTSk45H5ifhISKQbTfPTZLtI94wstYZVKsFhl0MPwieRY04Tv1oTzHs32kry-5pbLjVooYRrd1NvzgFGPAdTeS8eC33oAozBgeU7s8gUnRaqjcPN8R7kUE2mIgy4KF8walIeEdpKIiHcDdRMX_havEAI6lsCZPHX1Y9cvCmTBs8L346mNUnZi-l0uaYz13udFDHt2v_6Hc53MxWit1IFfjfE8EDVAvczTA=w421-h382-no)

可由此張流程圖看出：

{% mermaid %}
  graph TD
  A(Second 初始設定)-->B(First 初始設定)
  B-->C(Base 初始設定)
  C-->D(Base 建構式)
  D-->E(First 建構式)
  E-->F(Second 建構式)
{% endmermaid %}
