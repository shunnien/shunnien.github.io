title: HTML Favicon 圖示
categories: 程式技術筆記
tags:
  - Html
toc: false
date: 2017-07-05 08:37:23
description:
---

為了美觀與方便辨識，會在網站設置 icon，這個 icon 檔案可以是 png 檔案或是常見的 icon 檔案，也可以是 svg 檔案，但是各家瀏覽器的支援度不一，所以有些檔案類型幾乎不會使用到，這邊紀錄這些較少使用的檔案類型。<!-- more -->
![browser icon](https://lh3.googleusercontent.com/PUD2riK79JS0HYascOQ9HL9lZBw6rDqhyHn15fsHDvEV89FllksczqnHetxslVxKcyEJPoFxiGAFHyONfYKtPCJ1b76xafNAMCHDrBy5Xq95pulYMXC_SB7Och3fZhRSHryVqdTc2ihDfzERACsSWBYXsUAcmwbVU4WUSn7GS8TR5fsiSQjksMug79kdtbV87NFPCzT2yN66nK5_Xrnehlf07ypnQ7P_nt_t_-soZR-OGULUkDsWuNrNbokJskGNSlSuqwdgsxyueoWRPev_1eimSEH7cd297cDKy_ZN-F3t_ofIdTCQ-c2CS52YnbxxKT1NSN2DjwnsbA6PUO5jiWkWOr_ViAD_qy7e7UjYgDI4OMcbdSrDBRv7UknbjEEidoE9Sa9AzH7hTKT_SsCsHRsPCAh8feayOHjW7Tnjqk15zqUUmMVCbQPIcXMABMI6GdgQ9kShAO8QMtoWUbZkpGBeNOuKDHUzkyAvo2bv_u5uJ1zzPqDIiskNElMmJRO44xdmZHn5YDazrLr-ISBigSzKW0GOVw2_vKNKusHqor_qGsZOV1y3oqoKc6yhkEmJF20W7xaT_3cjSu4c_Xt6Kh962Uy9tIUXvEGV4QXRcerApYIWTzwFe_Xyw2mrJxdONKig2KdRZWZ6ux2W3mCGbQnKfS6I3SbYrx0Qie2RGA=w156-h109-no)

**icon** 的使用是透過 `<link>` 標籤，主要類型有：
- png image/png
- ico image/vnd.microsoft.icon
- icns
- svg image/svg+xml

詳細定義可以參考 [W3C HTML 文件][4]，而在 Html 頁面上，使用方式範例引用文件內容如下：

``` html
<!DOCTYPE HTML>
<html>
  <head>
  <title>lsForums — Inbox</title>
  <link rel=icon href=favicon.png sizes="16x16" type="image/png">
  <link rel=icon href=windows.ico sizes="32x32 48x48" type="image/vnd.microsoft.icon">
  <link rel=icon href=mac.icns sizes="128x128 512x512 8192x8192 32768x32768">
  <link rel=icon href=iphone.png sizes="57x57" type="image/png">
  <link rel=icon href=gnome.svg sizes="any" type="image/svg+xml">
  <link rel=stylesheet href=lsforums.css>
  <script src=lsforums.js></script>
  <meta name=application-name content="lsForums">
  </head>
  <body>
  ...
  </body>
</html>
```
至於各瀏覽器的適用性，目前除了 svg 外，其他類型的支援度都有 8 成，所以想要通用的支援度，最好還是使用 ico 就好，詳細的比較可以在 [CanIUse favicon][1] 觀看。

![png caniuse](https://lh3.googleusercontent.com/sqVW44VtQxnV6CBbjF0EhqQeMfiU4BB-bGYMun_CvMIqp3yWrYwuwiS8Jj1lNElxAR_xmIk5N_uUrdYvWbsGV4CUfqeAr5US1EIMPGlXFiuZUwBl1s23WXFuil7vdOxeC6cuwFvcMCr3bAJRoBUZMZpjqxn9EXMCrv9X7o6jVHlaq2zYgFVjZfIRmfGZ80NOkmogi9__-0Yg2u7lol4TotBx-m00c5s-gd2binFV-sOyD_lxn1xNlpRA-9hWz62QgZg7oMj-teMNw9sXjvM8U9hYx0Pgp12LbxzyqMe89JXe6PmQ8FesbQ1jUaTH7V_kE0PYo8hOgI4q1Krd-HiThVUCYvSnIyKGKgN6lbuaKMcEaHmAwBu4u8eIo6NxRjxUnZjP_WWC-Cs3r5KkCIX8tS8OXjOESDCpAH0GicKBp9xItGh-zsgTAe6eNSN9Vv7-aYFr21DSyOOR_uNGV9RvQ8r6Ar8xCxrLLxDZqVB0NKW7V59Jt3LvulnMFc169cE1iUR-lSV_W-t65Y5GMpkhuu2_PnWu3iL5VA4Vn8iGz1_S-sSRQlu5Q-cZnyK5EO-LrNA_3JQt7IVvqYH-O9zuT-OZe9CkAiXWCZCyu9kKN3L2Z_ycAVWQT-zT7--3zXP9V8yVDcI0vtYP9s_2Aryjyjk2YfRp265b4TJXJbK0BA=w851-h561-no)

![svg caniuse](https://lh3.googleusercontent.com/4oZtCjqCJRCxZcyx1c_EEVUpt9NEkwws_mRDA-YvJLVCvI_sr7LQNhaZqGbowas6KcaIcL5OaRNJ62ZRriFK2ywrt48KfnqmKYTRBFA7jGgdp4WpEzpK1Qm8V1E8G5xIhsZsqMVf8xqz4Sh6DAoiJA7tPTZK89mAaKBH_0HqN-EMASn6SVVPP_qK9AioeLbGx4g06m19pUL7z28p_YBmCo1C9wB95hoGNIoslynP2tflsRn9xmDDvOWgHpct-Sp41uzz3kyQuyi-wXvxw6dwgS-zaCNMBGZ1inwxKjc_IzxcE9PIeh4OHkKRH1Ddm_O962sRulRbIu-1wExD-PuTaGqrXC195_EttePAel5aJoLhdlbK3uvi-MYWDG19nJ4EgUe3KawdzI7OsHCviW2xN8YE6HMf53ya9bXVAIrZU7ZvRyJNKx9cATsyFX6VoK24ISojeaCiLKGqqHUob53ZJ6uPFy_4g6s2gEpJgyidPAGrt8TUHITd7EcillA0n8fulUaqObPH1I29DtioqvshHmQ0g6fKGhgwOtF778IqJ3sqxWlMjDcFFzjxP2aneVuJsEnZp8_ZqSZeWaU7SfAnVswtTi9oKfwQculaZeL3Dw70geg1AtOZZNZcoh4o6O8gF_8lDYoyCDmECX9E_Ed-WKyQKI4cbDp316JOQBnH6A=w843-h652-no)

## 參考資料
- [CanIUse favicon][1]
- [Favicon線上製作轉換工具][2]
- [stackoverflow HTML 5 Favicon?][3]
- [免費 icon][5]

[1]: http://caniuse.com/#search=favicons
[2]: http://tw.faviconico.org/
[3]: https://stackoverflow.com/questions/23849377/html-5-favicon-support
[4]: http://w3c.github.io/html/links.html#link-type-icon
[5]: http://www.flaticon.com/