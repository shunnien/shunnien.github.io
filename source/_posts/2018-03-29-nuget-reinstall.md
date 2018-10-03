---
title: Visual Studio 2017 使用 nuget 還原小技巧
categories: 程式技術筆記
tags:
  - Visual Studio
toc: false
date: 2018-03-29 22:30:01
---


使用 **Visual Studio 2017** 編輯器的時候，透過 [**nuget**][2] 安裝套件非常便利，而且當偵測到尚未安裝套件的時候，也會自動提示需要還原 (**resotre**)<!-- more -->；但是有時候版控取得的專案，裡面已經有套件了，需要手動清除 **packages** 資料夾，才能還原，以下介紹手動的方式與使用指令的方式

# 手動

此方式就是手動清除 **packages** 資料夾，假設取得的專案裡面已經有 **packages** 這時候 [**nuget**][2] 就不會提示還原，所以可以在專案資料夾下找到 **packages** 資料夾，將之移除

``` bash
D:.
├─ConsoleApplication2
│  ├─Properties
│  │  └─DataSources
│  └─Service References
│      └─ServiceReference1
└─packages
    └─Newtonsoft.Json.8.0.2
```

移除後，有兩個地方都可以點下還原

1. 可以在 [**Package Manager Console**](https://docs.microsoft.com/zh-tw/nuget/tools/package-manager-console) 中，看到還原按鈕

![package manager console restore](https://lh3.googleusercontent.com/PZfjqk8nqHe6iGJvYrwCN1FQdiODwMOoc2psV5fuZ3xlIqvHwuQHCee7FgnKLIUwXjgGkqpqtzjriHv-La_fTb2ffER0tTXZgsDK3fEdtJxwzR6y1r53jYJiQfPqwFw7YJSWEpJcu5ewLylcFMUAFpS-q9NjWLVtEwFyiGWjmRr8rIueVL1hUj4NiayQIJMV866zi-Fsb2RZNSM6jaidg8NvesVN9g-qH5VOFYxVmG0jkhhYwfMOGablnWYCbUyZQ8UXst1eCJ5T9YLffTeR8h6OZdfiDwWT0iahzX3CFV5K8QkhkfoEBucy2wyRzBQiwc2HxDC9Oy65v6DG0q0irBA13Y6mVrPI2hYGbPxTr5oIqSGI487_3oByfW8Da3tZ_IYcVFRO8ZnWV1UVcc50YxRQov_hghn8iWkEdQjyp4SFZmhBqaFm_WOKLaCssydFDtvXXtjGIjQlai9fh6TbAcIypoN-ERJGAIqNlMff72lv-YWipvJQhgyIt9xhbROVv58ivedmyzlJbq98Vz0_gcusUCyCg_cEEEAZMN1Au-rEuOufe00OXXmXMCGa5H5TIYl8PSvhErjAB9XJ_37XG4h56ziw7yVGffAIT51Qwg2PtZI7gi1s4XGgFewNHy29EQm8S7Ezxq_cDsVuhLsWDaAIrZMfydPX=w635-h158-no)

1. 在**方案總管**中 (Solution Explorer) 針對方案按下滑鼠右鍵，就可以看到還原選項

![mouse right click restore](https://lh3.googleusercontent.com/NtlykXutaJzmZgaQjv1ESAxoDi2CbfLeYK5xizeYnn_m2cFjxWw1Wo6ms2d89SBTehtUg8tTFOC9YaADcDGwx85lL8bR-s2MhPtZ8CdvC6ESfW_B8kthma7aHNpExoEdUDxJnTImqY-vXLq7xuxDGWJ3ZoQFKMAG7e1jqZj20-kdXvmNd9R9N7Vy0ZGnDyV94Mma3CJCC0I9I5-0JdOiUvBZAnt2wSJvJ6al9ulbx0vsnaCrr1USJ83GDyn_JeNy4MZpJfKMKeKCYy1_d8d_HoiCImG7ErpBEn0z4VYS9AQq8m7yWVfhssr9N-sRZVGMXW-A3X4Yq3EbrWwLxvTt7Sg2Ykw2E30cno1KLYnfzYJRS-PDVhWzS7_gmiInMN_cAIRTYVEwtEN7851cyFh6llUsSFwgzH-yS7Ymy1OWSzdl_tJM0khZB-7QsUyayv03Nsr9Bv06QxWJfx9XpQXzUMoUkcW2X5LTqXrGYjQyN9Tfw_ciI8k0jGBaDM2LvRCkclyVQSP-QN051EowXfu80ZwPe9lnkfWZ08juvVM1KI-nqnweDIbQKzYz7tfdLg8mvsW5C6wbMThfkuNw8LW1tXI85mASURSScAmyD5_ka94AI9ZPb5y75O97cn256TeqUt2X7ds2LDdSRTBq_708sWjXBYyr9gTg=w724-h188-no)

# [**Package Manager Console**](https://docs.microsoft.com/zh-tw/nuget/tools/package-manager-console) 指令還原

在 [**Package Manager Console**](https://docs.microsoft.com/zh-tw/nuget/tools/package-manager-console) 中，直接輸入以下指令即可

``` bash
Update-Package -reinstall
```

除了全部套件還原的指令，尚有針對單一套件還原，其指令參考如下，更多指令可以參考 [Microsoft Doc][3]

``` postscript
Update-Package -Id <package_name> –reinstall
```

# 參考資料與連結

- [Microsoft Doc][1]
- [Nuget][2]

[1]: https://docs.microsoft.com/en-us/nuget/consume-packages/reinstalling-and-updating-packages
[2]: https://www.nuget.org/
[3]: https://docs.microsoft.com/en-us/nuget/consume-packages/reinstalling-and-updating-packages#using-update-package