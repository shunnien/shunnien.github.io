---
title: Gitlab CE 透過 rails console 變更帳號資料
categories: 程式技術筆記
tags:
  - git
  - Gitlab
toc: false
date: 2018-07-04 09:37:11
---


首先說明架設的環境， [**Gitlab CE(Community Edition)**][3] 架設在 **Linux** 上，其資訊如下

``` bash
[root@proj-git ~]# uname
Linux
[root@proj-git ~]# uname -v
#1 SMP Thu Jan 25 20:13:58 UTC 2018
[root@proj-git ~]# uname -r
3.10.0-693.17.1.el7.x86_64
[root@proj-git ~]# uname -m
x86_64
```

<!-- more -->

# 設定方式

要變更帳號資料，做法是連線至安裝主機 (Linux) 上，透過 **rails console** 來進行變更，以下按照步驟來說明

- 由於個人使用 **windows** 電腦，所以透過 [**PuTTY**][4] 進行 **Linux Server** 的連接

![PuTTY](https://lh3.googleusercontent.com/REXTZwHFZ6nWMQPJ4wF-Ds8bODRoapIMH2WOQVnRlGePBZRbYh4zB83VfvG4uDVLnANjz5yQIjHRNNGAJj1gVW0UMg1GDUqjd8epjabMQY5Og_131qnWE2y2RPwCyuMH5PqX34Dzpdk9uw7QwUPF2gNNS5z2RtagG1--_X2Nij6PZBoQR-OxdhtjSsEGtMdBCJBPZ54QII8MaJiT9B_1CnHw_KPvXT0OV_KUNpSnK4FKdv0TqFWTG1o_DjAAL4MaWpUOoZuCTc338GvRRh_iWd4zbBVU5t8tGhRjfZmMCPriQmMKpnK54zmDEltKaG5B5QuBc4X9yMVIcLHsxkajYtrtOdAZuRp5cOROlHAEdXsiFdOPL68yeFOINyYBf0j6ec4CLf6OeDFZZ-npYzCeIrGsl6jcuK1rormLqWd53GMU5oenQzH5CggkEXxIx1eNG-e7RkRMYar-txy8SWHCdfwCayWyrkseT5Vp0WE3T7vpYNIpM8-p2LYYrz2Hmyz8q_PMqXAfdjVY1ukECY8VoeL7HxaVvdms4TsneZI2yxtDAL5FFq417ByBUesUzaZLkhq-LUsPCYy3nBMqaVh_5OUbpmIChLhJ5dmSRQtk-X3dgXRa0chAr4GdzGsmbXRt31_JPDEv5x9r8ISD4Qz9rrglWOCqQdaE=w602-h543-no)

- 進入之後輸入 [**sudo bash**][5]

``` bash
sudo bash
```

- 接著輸入 **gitlab-rails console** ，啟動由 **gitlab** 內安裝的 **rails console** ，其執行畫面如下

``` bash
[root@proj-git ~]# gitlab-rails console
Loading production environment (Rails 4.2.8)
irb(main):001:0>
```

- 最後則是透過 **rails** 語法，進行變更，以下附上幾個 **method** ，修改完成輸入 **exit** 即可退出

``` rb
# find the user:
# user = User.find_by(email: "admin@example.com")
# user = User.find_by(username: "root")
# user = User.find_by(name: "Administrator")
# user = User.find_by(admin: true)
user = User.find_by(username: "root")
user.state = "active"
user.save
```

## 參考資料

- [Gitlab][3]
- [Gitlab 論壇討論][1]
- [操作語法 Gist][2]

[1]: https://forum.gitlab.com/t/how-to-reset-the-admin-password-via-the-rails-console/223
[2]: https://gist.github.com/shunnien/b8354bf918b54a6fbc9f64e8329e487d
[3]: https://about.gitlab.com/
[4]: https://www.putty.org/
[5]: https://zh.wikipedia.org/wiki/Sudo