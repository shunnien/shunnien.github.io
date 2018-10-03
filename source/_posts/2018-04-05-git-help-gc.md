---
title: Git Push 出現 Auto Packing the Repository in Background for Optimum Performance
categories: 程式技術筆記
toc: false
date: 2018-04-05 21:01:59
tags: [git]
---

![error message](https://lh3.googleusercontent.com/a7cqWNh8UpwHK3S3EsBybpO6jgjGF_YA20WQFBDI_4Vk25zjBAPC_SKjng50JbZQG1veSUIlq_XYNgR_1BI3zKT1BzgX4H6HxwaIDoDeC_4gYY71vIz_kVIxELMj5xSOFqvqcFiVc_munkxOFLPjv5IhXGwdyznjrc2y4X5V7aNaGlRxlqv0JevGdtqeM2Ko-xtLR8HDCMs5YkxQLtzaT8VENi-6LC2BFaLl7jTnEmjJ0ChcULCSgpZQl_RYXn9rt_WkVEjWUq95tJ7T0JRkH3Q3VoN8HSA_kMxvk_4a5mJ458pnKluhl339FDQ9bogfvXhikEZRrZK5GZQvQMV1-kWm_mKCV8gfNNdSoe6-6bMOCY5w8dIxBbh_vOerqKUijCb7uWd22f75Z7XUkZAWwOFbRVT00sOOFWXiucX2W4avroKZmO88TlNlZqwpQ80dVEvjjGlkRnH5J6xMoOvGmWFtUZRy4tBxjZ_sAD9UIbP_TkkPDfLmK3VtsKebYjWaJlA2Zk7_jPsIQ-IGmUB4JyoDdeK3l98xqZrjMJYzk-29OQImslijIopuO2pKMpUtd9DDiAD9U6WsTvWzopDSq9xg3jffkL6Z5_cuMwR0R44wtc_NQRbCdZ1EtQlHbCuRavWjBfeM9ec_9KnNYLllZjNQK0iQnz52=w876-h183-no)
發生時機不太能確定，但是發生後只好按照提示的說明進行 **git gc** 清理了<!-- more -->，以下列出發生的環境

# 環境

{% note info %}
OS Name: Microsoft Windows 10 Pro
OS Version: 10.0.16299 N/A Build 16299
git version: 2.17.0.windows.1
{% endnote %}

錯訊訊息如下

{% note danger %}
Auto packing the repository in background for optimum performance.
See “git help gc” for manual housekeeping.
{% endnote %}

# 解決方式

按照提供的訊息，需要進行 **gc** 處理，所以可以參照以下指令處理，首先使用 [git fsck](https://git-scm.com/book/zh-tw/v1/Git-%E5%85%A7%E9%83%A8%E5%8E%9F%E7%90%86-%E7%B6%AD%E8%AD%B7%E5%8F%8A%E8%B3%87%E6%96%99%E5%BE%A9%E5%8E%9F) 此工具會檢查 **git repository** 的資料完整性

``` cmd
git fsck
```

此指令會列出已經不在 **git tree** 上的物件資料，假如沒有這些資料的話，此指令就不會列出；所以當確定有這些資料，就可以進行 **gc** 清理

``` cmd
git gc --prune=now
```

![git gc](https://lh3.googleusercontent.com/FXpdQiF31y8gNm3SVjEMJNefx0Grr2xVaJzdd_vC7xX_xcoZd-zrBVBjA1_MDSF9C4UlgexadwOYRz3U6ROYAQNRytXgxVXmX4SvIiimtywB8Po36EnPGRdxkwF5_G36HaECz4NJfKPq9jJINyEhk6Yt-LsIcEH-8P4xmVCb-qg9WuZYkYPpVhVfIy70Bm7L1jcar44IeY072DRuWVc3ha5ibjdLccbriMLZ9oZP3bCAAPkLxQbuRb2a92WLSD1iP3ldITJJHceXgru_Z4Rely2rvm-LGKCRqZvrzVxlIkHY04yvGTB3WZmh2ZMdkwnGg76U4nQXaTbyCBU3SZJLpXO_W17XQ1efsFxzmHhQYS6RAT6YXAiOnAk9_FAkFi0Uw9R4mqKYO2pD-diub2zy4ouc5zjk-5pFzkP9eRlqhyJuw72sV6KKJZa3KLhV9n-9_M16SqGVsUnL0K61uOHEmI-B0YKy3_4H3WaHiiFmsJUKSWP0HgVhoOh08NTC8un6htHMi4RkrX5YG9nklIHdU4qe6tGmlSy3SOp9CS-qwdBmaXPwlrzQ9WTbAYwguy7KL7e6CitJJnO4VKZBEFFBl25stGT2qQCxZJHPcl0jhSV1wP6JsL-aDctQSTfHyJxHTh8Lnj4LKrH1lKl3yx9R7WBm-6TDTk_5=w751-h186-no)

上述的指令請小心使用，因為這會清理掉這些物件

# 參考資料

- [stackoverflow][1]
- [git-fcsk document][2]

[1]: https://stackoverflow.com/questions/28633956/why-does-git-keep-telling-me-its-auto-packing-the-repository-in-background-for
[2]: https://git-scm.com/docs/git-fsck