---
title: 利用 URL Rewrite 加入 tracking code
categories: 程式技術筆記
tags:
  - IIS
toc: false
date: 2018-05-10 10:48:04
---


此篇介紹 [**URL Rewrite**][2] 的運用，利用 [**URL Rewrite**][2] 來附加追蹤程式碼，例如：GA 等。或是某些頁面添加一些特定 javascript code<!-- more --> 。

# 操作環境

- IIS
 使用 IIS 10 來進行示範
![IIS version](https://lh3.googleusercontent.com/RHyuNMozaPNqwS2AybQPiUNqs0XK6ArmuGleX2PcHIt5ioaPD8eqiWJYuGsAo5qODuOFzItRT0fckexOrYW8FaYC5poITyMF6vNE_K2ZFdBEYpw7LtRhID27j_vIvDPoUj1m22u1w1ca9LI-IGncmJAnFHyKyahRY9vd_l_uMuzOhKsm-NXMQ8jB4HzpGhWox7JJHfuA5gqY9zpzeJZqIdcuQB7xxhC2H8Nt8iB2rwcHBYJA-eao6pCdvH-DhWMUYRqqrYec-_f0yLTOaXmO657vyJMeORmVibOFlsR43NU01LJg4TV36iekqhP_Iw1Gv1M7-M5DzvVNmac-HgZqrGdvm_1ADRj5HgXKV0_I4ppFNVv37PYP9Oh8T130QjFaCsUyJzTmCndw1l33vkWPdq_VnT5G6llPuqt2lWx82IaiYffRdlC0IS6HSp7QM4aZGYvnaST1NJdwNEStSHau_FfpeejnmWjBQqd_m1bU4-OAszGwqj7dI_mzyfzGG7dp8_K7mefDaGcxxBdHEXEHSKEHG0wtMyUP032LhLNtgcavSLi5jXTdX5twzeHfen13Tt9GemuxlebawWJsvAAZLPAeQge5ZCJYn0YqZ_yPwx1nQl8uvHdG3aDbYHAv4IjZAxlZg6K1lq0a8E7-6I0gv6GHje6mHAlC=w466-h256-no)

- 追蹤碼
 追蹤碼使用 [google analytics](https://analytics.google.com/) ，以下先附上[追蹤碼的範例程式](https://support.google.com/analytics/answer/1008080?hl=zh-Hant)

``` js
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'GA_TRACKING_ID');
</script>
```

# 設定方式

主題是使用 [**URL Rewrite**][2] 來附加，所以記得首要條件是安裝好 [**URL Rewrite**][2] 模組。
設定方式有兩種，一種是直接透過視窗操作介面設定，另一種是設定好 web.config 。
需要注意的是使用 [**URL Rewrite**][2] 來附加，需要關閉**動態內容壓縮**，因為壓縮後，就無法判斷內容去附加了。

## 介面設定

設定步驟其實在 [Microsoft Docs][1] 都有詳細介紹，這邊列出 IIS 的中文介面

- 開啟 IIS
- 選擇要設定的站台
- 選擇 **URL Rewrite** 模組
 ![select Url Rewrite](https://lh3.googleusercontent.com/aLotYdI0HjLLKw2uqZg4UyniTbSm-E-wfppnnjeGsezj8xw1BLUyBEVzbzy5hMATk0JbTWmitWLYXcWl1qq5xmvX6OgRJco8THfzewiCNO6TRsPvI55C5tdNWlainKSMuil-K650psIsa3V8XsEt7dsvI7kco2dP7g2rLTgWYv5TAUzIdrJ68AIDVuiLEA3eY_jGyEsUoQbhEnty52TsryQBdTFjk68Uw0Am3xKRoqdSlFHwInTj_6fSxicphl7Q0T-RkJ7k-Xu0mOaGFu_27qOpOlaFsnun7V8vq1f7AlYK5z3EbE7ECO6Abzfr7LBiOMgKXDnkNBo7MJdjvFv4RnsF3zka5qxNIAIvoxKtOO1SqUE1eMRghM19SaS74UC3rLC_mQveBt86mGw-Ug51qdrrii4RxYors2tQdDr_4ZxEfxcvQs5jJeBUWZ9Kem3MAgZ5qt0RvFWOLb3rK_xKkLFOG8RJ2SBIWzm19G6CRqIm_uodlrvBB2p155N9pMz2xEw1QVX19oBrJQJ_dhmezUdfF3TlYsq6jsUHemftltrer-Akp_BKxWLw60ObHD4VJXXEqhtBsW9KDwcYzvc9oEYXDge83WZL4-Rksmp56XdJQM9JikPaVh_t3SyeeDLp-brqi1R4M-70LZnusBuwzBpd2jjJDbSf=w448-h269-no)

- 點選**新增規則**，接著選擇**輸出規則**內的**空白規則**
 ![blank rule](https://lh3.googleusercontent.com/GIvKqYaC72vSyjTlNTo3vSPZOCZ0eKR-QSdW6qTu2oNNqcAGixce4PIAHjjGOeoRyy9KUeb8tUMRLwkC7Esxc6KFags7vxpQZNDS3gUbXTTjzd6kku8r6SDAKoEdJcqXn8dH-cG0jqyYKK5tdysWV67r3vPz-pgDdw3G0HSRVW2qA99TuURZOwsG1JcmgQX5pZKwE6hVsZnQ_CHPM85Xd1Ca8k8DhOw638KdPjSzfXB9xa4d4aJ-r7fAcSYc2eWvEd-zZUNADyiykB0mvntpCmZ8lTW5q78fytnfzIVo2LZPwbqHjmHQS8sIkfga0iDcQcF5LVqbDrO3KjmbPIHPuLRXq3OLKrTZ1gVuOmN7hhTy4JhJTns09voqySuCiweviaaJ72vseomGtDC2ABgy3PKwYbiewCKQlakfg4yIXITiE8_F3EJXA7I1LDiMLeDtj9bo9JuGXmsCjpi36MbO9BZiyFzxTbheTpOAoAyI_QdrkbWW5b84Xr6zoo3uP3WiyndKbaYjGBreaB8oIDAqFKK4Z04-fig2WzLH-56Dr6RCakZo4J3edzE7_2t6peCB-lrPYIm3WNPxqSdsWrTzlKswblTp8MRztKbetn9wNtX64BidW9jOlwLc-ZhgZSzqxMamSWq9gxIAOhYbb8g0yhVmhcrwJ2y6=w951-h647-no)

- 輸入規則名稱，接著設定**先決條件**
 ![precondition](https://lh3.googleusercontent.com/jPpD08n439jcCA-MhHkCzuhZ8iixDZPhohTOWq6DUQmncVQcMsaQVJBViOFowWeelhGjf1RPdG2B7P5iv5jBzPypGIsIFgFe_lqgr7CQ2fFU1NbtzmhQQRWonPXorUcQP2xWR2IFTbxPaAR5Bq8DT8qLKHldSAs2IdqciM7s7kakm7RF-BZ0hV71vlhna2bfXkWacLzZwb0TK2KLvzpMfdRPzP7ImFVTSb6zGavofzV8jhdRQtMUCaOEGi_LohqWmfTE2y1RI63OT9W5Ki7qbfFhEQybOF3EsnYhSJiFcOmFa6tqarec4_vj6sGuFWZf9ObKQAx4-I6R25JGGe8RHDYi33najvnAShQ9g_2vdUtWEVHm03sqmLjOssw-JsrktVTKiNkNtUKGnVpMLbqpHsus6i_lJHgAP4ful0Kp8iJXF343dYbjz5sXg1J416dWFrKCGzb-znaXp3trm6FZoU9zD2deOjfh14icFipY9WQzRddtoYKCNw0kVtwFzngRUVcdr3l9Aqx7-Ai2sEXj4kdFld0qefZtP0Cf9KH6QbF23aiZij2yqbvbePoJdGhLczf9K4MWcboi-QyzK9LBk9ylQQZlyx0MNSkuCCRjyfJhlQKmyoD1TgdJGyHfwtsAmWGr6Ui095SUBNQk-ryysYgjt6M0dyu1=w952-h634-no)

- 設定符合的條件，注意**比對範圍**是**回應**(Response)，另外這邊的**模式**可以不用使用 [HTML Encode](https://emn178.github.io/online-tools/html_encode.html) 編碼
 ![set rule](https://lh3.googleusercontent.com/rmZ-vhTBs0SzYc2GyqnEle287f9cLfUEylICYHaJrrVa3GW7378yDkq3HrlVEQwBKPTymw88Y3bC50vX4jmlA3Zjsdud0rCJ8ptMGKk0nnLY9Ge0EZyhOEoqgnGeuxTD-0u-bhVoP3s5jaruK6G3wYkr05BK_HsoIA5I16TIgxYLsM4LL1rvCU6BLq_aNDd6dLrgCZguMvEdVpYWBSR7wZFXjOCjRpMyUW3M9GReyDScTQGsFeLW4UqIHyEcZlr2O8WBFC-6BAYBNEvsO7K0xVzQW8mpioFDDcLXl_nPsXYsSaxlkQHlvFopQcpSl7oSnS_xZ7fhNETav5iZCtC6njZYb4-vSREbjztXcBZj60dJMZyKh5ccYlA6Sfd4oRN3OFltw8W3kLsHLPa4FuTmrPtUaRt0CQVD2wi-Qy-WsRmJQfcea2TDIltvZjaDcFaZnSnisetPkxUqCVWnctcB8yMpHvBbfz2EdtFbAH8v4pv6eb1OdQiFaTJdLwP0r8ITb8pURG08IPB_IWZ9j3xsTGhp4ZgVa2uY6sFB6GHhxyhe_56LfNK9-X9oraLt3m2GmLlNTntGedAyDR9OZ1c9KwmN7cohlajUkKlyWNTc-r7cQ3Mto_KhwzQrlxX8AP9bm2VL_XZh_klPnuWpXIcmSbeYVNuiWVKI=w835-h455-no)

- 設定**動作屬性**的值，就是要附加的追蹤碼
 ![action](https://lh3.googleusercontent.com/VnFp6hEniNqpdlax19Andm385dj7pHX0TF5S5mzuLipJCS7x3lCS-lVVeKKl6MjwkIBEqp2LlAgWUwsCKIUJhJk2IDMa0ITc3YqZTjOBqOL6N6-ohfSKmmIqYH5L-3wMrq6pA8cwVCmxRqwjDVNOhgbgVXSneF9vjH2WWCiONPF2fAd2ZpvH21jY7jdn18Z8j3-_bPUCYKL4u_WTIwy6YGqCt5HDs13ebbMgzPS4neLBxpJeI8TvU7xfVKu5SIflJMTMBxzdhzQhag5UbeGH45u6fedMlFRmJRPJ5JJlgd0zmimPlgHSII9HaL5c2oLCj0v1tBQHoDFpIbvherP-gM29_Ai59cn67dav-u2N4icF29Uv46Mh4QM_3zfXIpCPDgSK0sM1sq8cwZrp7qjDnMeeLwHW5lGryqmiUvFQIG_qWnIC2Wx2e-Eh06MYsJWbT9EJ23u7CrbuTELJpkWEosQOs5UU6x7NX5VS1ARHbgcr50Oq4ug5v-gSHHjudw4VfdXQaEmQMZEx_X-hMfcWBWWtK4iC3nTrv4CPSX0_YlaOCPNiqRFjG2gPwC6RAx5FzULW4egAHDX9oznve62D7p8VhwA8pSmwFrhTEaM8UhlCWdFj6Zr7hiPI0Pzugl4QF4TliOaYFqoObNq6qMigG7A-QdlyOPWE=w837-h249-no)

## config 設定

由於要設定在 **web.config** 所以注意一下標籤，透過 [HTML Encode](https://emn178.github.io/online-tools/html_encode.html) (HTML 編碼轉換)後，再把值設定進去

``` XML
<system.webServer>
  <rewrite>
    <outboundRules>
      <rule name="Add tracking script" patternSyntax="ExactMatch" preCondition="IsHTML">
        <match filterByTags="None" pattern="&lt;/head>" ignoreCase="true" />
        <action type="Rewrite" value="&lt;script async src=&quot;https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID&quot;>&lt;/script> &lt;script> window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'GA_TRACKING_ID'); &lt;/script>&lt;/head>" />
      </rule>
      <preConditions>
        <preCondition name="IsHTML">
          <add input="{RESPONSE_CONTENT_TYPE}" pattern="^text/html" />
        </preCondition>
      </preConditions>
    </outboundRules>
  </rewrite>
</system.webServer>
```

額外附上關閉**動態內容壓縮**

``` XML
<system.webServer>
  <urlCompression doStaticCompression="true" doDynamicCompression="false" />
</system.webServer>
```

## 參考資料

- [Microsoft Docs add tracking code][1]

[1]: https://docs.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-outbound-rules-to-add-web-analytics-tracking-code
[2]: https://www.iis.net/downloads/microsoft/url-rewrite
[3]: http://readily-notes.blogspot.tw/2011/11/url-rewrite.html "rewrite intro"