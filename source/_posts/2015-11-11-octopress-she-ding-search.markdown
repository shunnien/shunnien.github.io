---
layout: post
title: "octopress 設定 search"
date: 2015-11-11 10:16:22 +0800
comments: true
categories: [Blog]
tags: [blog, Octopress]
description: octopress 設定 search
---

## _config 設定

此部分需要注意 **url** 與 **simple_search**，這兩個資料設定，**url** 是您自己的部落格位址，**simple_search** 使用預設值就可以；這些是由 [Octopress] 提供的預設搜尋方式，是透過 google 直接搜尋 **url** 這設定值的網站，再查詢這網站裡面有包含查詢關鍵字的頁面。
![_config.yml setting](https://lh3.googleusercontent.com/yszidoHKiM0nlORvfIhcUv3kaSqwOJy8-NsL2K_UUqw1PSdug8yGNoBidFaZX1b5KXQupVWmjo0hmNV_dgbAajDLw0QOBhvoS37TUE-MV9IdQabXlHbuInFTxXTBg3zveUrANlxo3WlCkBfA5NUTt8DYmOuWpStzBuJHHM1bqVPrWE1oR_ZcuvOG46goZpAx1mVyxnETgLYTXJJRm1FspXhyVi4zjrsbaO6NNMo6N_GF8QSQ3izMJcLrjVVeZR-s6AaID_QUT9nARK6icABTyhn3eQZMUPiSe62y0zLfBzgb0vi2pUQt1j27KfdsxXaA0kP-eoD9lcnwaZCZ8b8SnCszl7Hjm08ZxXbSTbK9PXYz-Y8qQC7M2DzSCmHp6GSdAd4vsGFu3dOJoLLCgprCVvr8FoDovA3IRE6S-Um2ZgYu6frvBTZbTssMzD3YioG5iNEUO_z1rdSqPLo2LcL5jiNjscbCCDm2-6LoLY3S7Enk1LG6ZuD5mVmetgNfsjq86ibibbAJB4iUB8QY5TgkILsgxgK9lPNr6VDNpkzTzVwqZkfiP3FirWsxNlMYpe9T0mL6s1vIBRtDyOittrP4q_CdQ7EoD9KDuHgs4YkMszzcRP-TTe2d1rNGThmQO12kOp7YPBwppV21sTCAfnNiZDaVe9p8m6ZYPKoMsEa2xg=w358-h456-no)

## navigation.html
除非是想要自訂更動，不然使用預設的搜尋方式的話是不需要變動的，
此檔案位置在 */source/_includes/navigation.html*，需要自訂的話，需要變更 form tag 的部分，如下圖圈選區域。
![navigation.html](https://lh3.googleusercontent.com/DK9Wvz2PtqLJnObvYkHt6h8-30AR6EEia4_4-HqFxAP0atd3mLLs6Aih-DqXpPFvuqMixe6u5IRWFweF1vz91tk9V_hdy090if_hkrf4MAVmz5t37wii6aPM1yS8Jucb8isuEIrfM5kH-NpKnJGi1wYCxPHRx0BvfQ6bY5t7RRn1LwbZNo5zmAt4Da9ytGdhMRyaEY4XsJoavftyAcXCBRe0PCu4M1XmMaTHGVT2Z3YyB1qjF-z1vmTX6F6NZG9hC0WTduvrhmosFxAWVJOvfwKZeEPKiSgk4RX3LmSMT3nOQmCYw4dqnU0vhHX0dhvCfWN0N1C8KOgf14VdnU0UvLAgj_S4o2zpoGD03VgrkmOdzrHWqEnl7mMgWT-S85ZsIlTCZOSt2AgH4PfSN3JKcFPuvmcNI8Y-2R6GhWn36zxOVmGE-LoFQ_ctQOA_4xX55amDgrbMk3hfYjCUl4AMLW0lg2t5YewJ8yGwu-nQaGGQMSDqjVAQ7p-S0NfV4gmlaiVF50N3TiMeEjko5lpRX4emzxypucP7dzZ3gELtxKVxHK30HF9Nr3j4veyVgStTE-S1Yvl1HyHX849jqvoNo2ahdcfTtiUFmmkcX7ubMQr9BtWZdfKBj5wpGqsU-gwiVvpRf5kiEUas05r_ebHEBen3XA7USerM8VR9nChoRA=w889-h418-no)
這些動作都完成後，就可以進行`rake gen_deploy`了，就可以看到部落格可以搜尋了。

## 注意事項
當完成上述動作後，發現搜尋沒有結果，有可能是 google 尚未將您的網站登錄，這是 google 有 [Googlebot][2] 會自動去搜尋網站登錄至 google 名單裡面；當然您也可以主動進行登錄，可由[google webmasters][3] 提交。
提交完成後，可以在 google 搜尋進行搜尋檢查是否成功提交了，搜尋方式示範如下
```
site:yourUrl.github.io
```

## 參考資料
- [Octopress]
- [Google 網站管理員][4]
- [Search Console說明:Googlebot][2]
- [耘想科技網頁設計:SEO 網站優化][5]

[1]: https://github.com/yortz/octopress-lunr-js-search "Lunr.js plugin"
[2]: https://support.google.com/webmasters/answer/182072?hl=zh-Hant "Search Console說明:Googlebot"
[3]: https://www.google.com/webmasters/tools/submit-url "Google 提交網站"
[4]: https://www.google.com/webmasters/ "Google 網站管理員"
[5]: http://www.pkthink.com/knowledge-info.asp?id=4 "耘想科技網頁設計:SEO 網站優化"
[Octopress]: http://octopress.org/