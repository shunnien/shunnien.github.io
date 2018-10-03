---
layout: post
title: "Octopress 加入 Category(分類)"
date: 2015-11-12 11:05:23 +0800
comments: true
categories: [Blog]
tags: [blog, Octopress]
description: Octopress 加入 Category(分類)
---

## 緣起
部落格文章一旦變多起來，就需要進行整理，而且為了讓慣看的人能夠快速簡單的找尋，最好進行分類列表，所以經由官網上的說明套入 Category 插件。

## 找尋套件
先搜尋一下 Octopress 對於 Category 的相關套件，發現這篇文章 [Octopress Top Categories Plugin][2]，看到該篇文章中提到有人開發了 [octopress-category-list][3] 這套件，這個套件也是作者 Fork [octopress-tagcloud] 調整而來的，此篇[文章作者自己又 Fork 調整了一版][4]，我就偷懶一點直接 Fork 作者自己調整的這版，這樣之後我就可以直接變動[我的版本][5]。

## 安裝套件
這部份很簡易，請[到此][5]直接下載，或是直接 git clone 一份，等下要把檔案複製到您的 octopress 資料夾下
![Github Download ZIP](https://lh3.googleusercontent.com/w2QCPdqIU62sfkHgnPZ-eXUFoFnCtCYXLalwL5XF-pBAdBPfNa6WI8yt-pI_G2QcM8KbHafApp6_dIstcDW0dUdTB-ZIE7Z77knOT6a3XVyA9YRBbGT1qs8qBjrwUNDcm71QFU5la_qwbXTp9XY4ctyLTadeu4EFT6O6t7PNPiPURtLvdyby5PcqBDY3TOHgATOOz2ugZ9FYxjj27yKbCBo1nFL1NInPDAEaOiK81Skc4rzMI3AErM2seWlWyqe_lPsxyTLphz22a2cN1YNfpYALtS1zesYLEpevOEr6_lrxTYvfjvp2c46X9bKRCQoRIpGwFfa7aCLTbx9wO1E0wFa2d8Ge9UI-2W1NhheMCDEd9Xip1b_PgvFB17TDRYbf8myCdv9xCX-pTA7RrNDnllVqK0nTpWTptXDwhfKNVpH_JmTZ9F51v13QiFz6rrsjWS43yInyfMTYx-Sb3v60Cq1KngJ6Nzdzz9C-gffG2DaMpfI11f4YWbUbI-dR41OOC1G8WaVwYFMTocjJhg8v96G1fB9RbmmFJ62Pqtci0lhTMulZnE1oMT6WjONIRxqP6JORMZjBY8Cm-2HjuRBvyiYpiuwJGk7mrr4MXFMCZbTm9cW1sRE3AV6U61xbH0e36tW0GI7EwenB1tuxJTRoFfc7ZjL-qRF7xWaTFw2_6Q=w248-h339-no)

在剛剛下載的檔案中可以看到以下檔案
Files:
------
    .
    ├───plugins
    │   └── category_list.rb
    └───source
        ├───categories
        │   └── index.markdown
        └───_includes
            └───custom
                ├───navigation.html
                └───asides
                    ├─ category_cloud.html
                    ├─ category_list.html
                    └─ category_cloud.html

這些檔案按照同樣的路徑放到您的 octopress 資料夾下，先把`category_list.rb`這檔案放到 plugins 資料夾下，這是 plugin 的核心 code。
接著修改您的`_config.yml`，在`default_asides`增加套件的 html 檔案路徑與名稱，就是 *category_cloud.html、category_list.html、category_cloud.html* 這三個檔案，這個是設定側邊欄位的顯示。示範如下
```
default_asides: [
	asides/recent_posts.html, 
	custom/asides/top_category_list.html, 
	custom/asides/category_cloud.html, 
	custom/asides/category_list.html, 
	asides/github.html, 
	asides/googleplus.html
]
```
接著建立頁面上方的選單
![blog menu link](https://lh3.googleusercontent.com/z1pDdy1ThCo--5fyxOoxa6ce1_BqBPxKhYsAs92V7KavJZkkkptPMeLA8cDA-uostwfMONTXZy0DwToZQoVQP6zMte1eYT-Zxa9LUGSjkAQQQbotJ3Go0N-1WiZOqJx2EoVM1Pfjn2l0nGZPTs5Dleybopd_zVUyuYf8Bb8UsPnxSWrQOqSmVnvHiVDk5b_9UhJA-d1KHR8DRKPXY1UUavs4AcXwHR2SFBafFrNFtrfGowZuxQgwPbkaoa-8q6n_kMVRBqhYIqamyqBNFTHnvbs4duTa_LfjVovGfGeCFgYNc0P2OU9T0GU3CZWeQiiUlQ3vC8RVhORv6GsOU5ibk0-IhWdGnAHtVuNB7wRyytpM9Gwa2fjtzDuVOp2rCH955Is15k_PyHTb-3dxY_f2kwGQJSwBZkhsxRTpovptE-nT8IQBGRWiHz_E7hXppMAv_6AMShJJQd9kFCldmWnc0z65J92fakTu8_BWHzP4veLsQSggCI2x8huiIM2jzexVcP_f6nrArwqzbzX-p1f9WaWuxuCLQ6AKyZqkQ_5vzS83wQlcb74TVjQ-pF0KfJ8NbeZWLj7Iybii78GLCtcA3-My5BmdUq3W4I5AQ73hjVoK32WEKanwfoJmAjTy5Wpb5iU_qUu1TP02zIdxRaJMA-VUqITjy8kR38wxPVyypw=w339-h169-no)

請參照上方的 Files tree，將 source 資料夾下的 categories 複製到您的 octopress/source 下，再把 navigation.html 複製到您的資料夾下，確認每個檔案都按照路徑複製就可以了。

> 上述的步驟太複雜的話，教大家簡單的方式：
> 將下載的 octopress-category-list 檔案開啟後，複製 plugins 跟 source 資料夾，貼上自己的 octopress 資料夾下

## 執行
一樣使用指令碼進行觀看
``` bash
rake preview
```

完成的話，直接發布了
``` bash
rake deploy
```

## 碎碎念
其實後來在看 [octostrap3]，在考慮要不要使用，看起來的版面挺漂亮的，可能等以後再使用了～

## 參考資料
- [octopress-tagcloud]
- [Time To Pull The Plug:Octopress Top Categories Plugin][2]
- [Neal Sheeran:Octopress Category List]
- [My code works, I don’t know why.:Add Categories List Plugin to Octopress][1]
- [高見龍:幫你的 Octopress 增加文章分類]
- [alswl octopress-category-list][3]
- [ctdk octopress-category-list][4]
- [shunnien octopress-category-list][5]


[1]: http://wen00072.github.io/blog/2015/03/31/add-categories-list-plugin-to-octopress/ "My code works, I don’t know why.:Add Categories List Plugin to Octopress"
[2]: http://time.to.pullthepl.ug/blog/2012/8/20/octopress-top-categories-plugin/ "Time To Pull The Plug:Octopress Top Categories Plugin"
[3]: https://github.com/alswl/octopress-category-list "alswl octopress-category-list"
[4]: https://github.com/ctdk/octopress-category-list "ctdk octopress-category-list"
[5]: https://github.com/shunnien/octopress-category-list "shunnien octopress-category-list"
[octopress-tagcloud]: https://github.com/tokkonopapa/octopress-tagcloud
[Neal Sheeran:Octopress Category List]: http://www.nealsheeran.com/archives/2013/01/octopress-category-list/
[高見龍:幫你的 Octopress 增加文章分類]: http://blog.eddie.com.tw/2011/12/05/add-catetories-to-sidebar-in-octopress/ 
[octostrap3]: http://kaworu.github.io/octostrap3/