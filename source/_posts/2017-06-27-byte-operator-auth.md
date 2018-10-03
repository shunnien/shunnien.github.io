title: 位元運算與權限控制
categories: 程式技術筆記
tags:
  - 'C#'
toc: false
date: 2017-06-27 11:51:42
description:
---

這一篇其實就是 [byte 換算][3]文章中提過的權限資料，這些權限是使用位元來區分目前使用者擁有那些權限，針對這部分，順便把一些資料整理一下，說明一下權限設計的考量方向，然後針對位元運算與權限的方式說明。<!-- more -->

大部分權限的要求，都是管理介面的部分，或是管理者與一般使用者混用的狀況；而常見的權限有建立(新增)、檢視、變更、刪除四種可能，這是操作功能的權限。另外一種就是帳號的權限，該帳號可以操作的系統功能等...。這兩種權限是息息相關的；舉例來說，以下是一個網站系統架構：購物車、分析圖表及會員資料皆可能有新增、檢視、變更、刪除四種功能權限

{% mermaid %}
  graph TB
  A(fa:fa-sitemap 網站系統)
  A-->B1(fa:fa-cart-arrow-down 購物車)
  A-->B2(fa:fa-area-chart 分析圖表)
  A-->B3(fa:fa-user 會員資料)
{% endmermaid %}

將系統功能擁有的功能權限列出
- 購物車，擁有新增、檢視、變更、刪除功能權限
- 分析圖表，擁有檢視功能權限
- 會員資料，擁有新增、檢視、變更、刪除功能權限

但是不是每個使用者皆能擁有這些功能權限，假設一個是管理者，一個是一般使用者(購買者)，就可以看出分析圖表僅有管理者擁有，而且會員資料兩者也不同。所以使用者通常對應著系統功能項目的權限，設計方式還是需要看使用情境決定。
{% mermaid %}
  graph LR
  subgraph 使用者
  A1(fa:fa-user 管理者)
  A2(fa:fa-users 一般使用者)
  end
  subgraph 系統功能
  A1-->|檢視 新增 修改 刪除|B1(fa:fa-cart-arrow-down 購物車)
  A1-->|檢視|B2(fa:fa-area-chart 分析圖表)
  A1-->|檢視 新增 修改 刪除|B3(fa:fa-user 會員資料)
  A2-->|檢視 新增 修改 刪除|B1(fa:fa-cart-arrow-down 購物車)
  A2-->|檢視 修改 刪除|B3(fa:fa-user 會員資料)
  end
{% endmermaid %}

## 位元運算與權限
上述的部分好像都沒提到位元運算，其實在設定新增、修改、刪除、檢視這幾項功能的時候，就可以使用。

|功能|二進制|10進制|
|:---:|:---:|:--- |
|新增|00000001|1|
|修改|00000010|2|
|刪除|00001000|8|
|檢視|00000100|4|

稍微列出使用使用者對應的功能權限，功能權限應該是包含使用，例如：一般使用者同時擁有檢視、修改與刪除功能權限。
這部分做法就是使用 **|** 運算符了，其作法如下
``` csharp
public enum OperList : byte
{
    /*
0x08 : 00001000
0x04 : 00000100
0x02 : 00000010
0x01 : 00000001
     */
    
    /// <summary>
    /// 新增
    /// </summary>
    add = 0x1,
    
    /// <summary>
    /// 修改
    /// </summary>
    edit = 0x2,

    /// <summary>
    /// 刪除
    /// </summary>
    del = 0x8,

    /// <summary>
    /// 檢視
    /// </summary>
    view = 0x4
}
void Main()
{
    var admin = OperList.add |OperList.edit|OperList.del|OperList.view;
}
```

這比較方式就是每一個 bit 去比較
![bit operator compare](https://lh3.googleusercontent.com/6A6pa-1a7XbyZ0gZFO5F86NU_-BDAGtPY75TimLU53dzsicAeXBaVCfZGUSpf80aqbw2mhTA47P9M9Jd67xZjFAUBRE2uesQ1ONx34OYEaM4c47soR1YRD0WRh638UT62cJo6vYD_qtA4Mr-rnvbOU_AIVqR-bs6mXMAzIlGg88902se12GWgJGSwlSBZPlvAZSF4rQsNcJvRTgaGeE_wmYv7XQNCyu9zMMNVrECaVdtIwWJheuceAan-w47gLd2Sdw6J8lkKrDEm6nC3O_qGh5d9bIwy87Obyq0et03eqMkT9muDw4I55Rir3iYv1qG99x3WT_HqF86uwyKd-N6VSO_MmtuqDmvehqu8efP4L0iILHtFf8O7a--bC_ex0oQTK5ccChzbNE-euovLv0HyWnX6d1a8IZ6L7UaP7C9L37oY5kNV0KndrtqE55KIyL-sE3FSWxdY0pP2oml20-cOfnaaPu1QClQ33x6mWsihSCRSc57eVFeW_qrXNT4ewwNvSue-ZyACrO-YqtMbndQsLSRf_SgIUObtdxthnKPp1tqlw5IJa4znLXuToPqQ6TNRdLCSXbTFjqK_XTzSGW926LRiagYKFGvcmmn76OAAy1uNQrMCFlpWD-p4wk7xyxWwn-MBmQk0P4QB3KDhXvp3oAtX9_3gan6nWxGKbusuA=w486-h194-no)

|使用者名稱|系統功能|功能權限二進制|功能權限10進制|
|:---:|:---:| ---:|:---|
|管理者|會員資料|00001111|15|
|一般使用者|會員資料|00001110|14|

所以當想要判斷使用者是否擁有其功能權限，就可以改使用 **&** 運算符了。

## 參考資料
- [位元說明][3]
- [位運算與權限控制][1]

[1]: https://kknews.cc/zh-tw/tech/e94mzr.html
[2]: http://blog.xuite.net/tsai.oktomy/program/67226142
[3]: https://shunnien.github.io/2017/06/23/byte-introduction/