---
title: ArcGIS JavaScript API 安裝在 IIS
categories: 程式技術筆記
tags:
  - ArcGIS Js API
  - IIS
toc: false
date: 2018-09-06 17:06:02
---

# ArcGIS JavaScript API 安裝在 IIS

**ArcGIS JavaScript API** 提供的是類似 **CDN** 的服務，但是假如客戶是內部系統並不對外的時候，就無法使用了，由於該 API 包含許多功能模組，官方提供了此[說明][1]步驟來設定<!-- more -->，不只 js api ， SDK 也是類似的設定。

## 安裝設定

### 步驟 1

[下載安裝程式][3]， ESRI 的下載頁面僅提供會員使用，所以先註冊或是使用 google 帳號快速註冊(免費)，登入後在[此連結][3]即可下載。
此次安裝使用 3.25 版本，**API** 會下載 **arcgis_js_v325_api.zip** ， **Documentation** 則是 **arcgis_js_v325_sdk.zip** ，假如只使用 JS 部分，可以只安裝 **API** 就好

![download page](https://lh3.googleusercontent.com/4S8RWiivvmDb8SNBERU2818cxEXydYXvbBb3PkQF_1IpEH-MGGew-d3grCfNdgGYjPeEhywia_J8BKmKFaeUWKlR1jpn5qPZfFkJKX5tdwjMDkOiU7YzV6SGINPGB-joSXpc_Ahs9WLetuluBHH4ZAujeXF3FqJzfJAUx7Cf1YAhbwNtjxgoCcLaqOm4pnZbpAX8ulGQjyDT1wqSk9DmLWXjgTVVPsRBD29ph4OJ1IvW1Sz4zA18TBdoOobzNQA54njKy5tGniySDhZrolp0ZJpP9M1r_We6gt4f_9PYbMt21SSlwSQPRKu5su5_vSQKPSqW6GDJeAXPiB5loXxgs_eh8dktdhwDAehp4yMvW3h9vqFXXoov_4mge6hZojbXl1C2mxI2Gw06sfMWnXmwdfkLI11qYMgDSreSjYydcnFD0HqH0Pzh3q0wIcuC3uhRlNva561fbmtyJSUMqpcxwUk8sAUOJUlKZD919gP1Eac-VlwVk9jXrpJgo7rrc4fle5kUP-aYQ35BDMWo0opkCVl5cl4uZGWAzK0vPrAJCOYxpxnkCKgTaZolX3v2KHiALZi9rd0NLhfrxWXvRsByX-fYLP0nbb5OXqA43Cmw_P4ocPmY31oZzMlTb4bv9MCPI-VEPacNT2MaOeLYRBB0U6uwRKO5GUv76o6QWmtojTzFFbdThPs5UVKt=w1451-h476-no)

### 步驟 2

將下載檔案解壓縮
![unzip file](https://lh3.googleusercontent.com/jWHbm5wPINIVGPsI550NtGhlxdX_PszPfGbSIF5C2iwOonFkB2OVeag414Gi1XNA9TtHHPxsWEMVXPZV-gaTfGtskmXq6T9qjzpvJY_zSuoZmdSAgvKEkeYYbaYE5Bjz52wsqHcM034LW0icLdamhfOCUPHt07SouUp_kdR51WGou1UJrBb3oJyYzWZuOqI2EKzC53yfVDm9lP2StpFrlG9OQ-U1_cdDA5NrvpTXakEPZhmnzw97Gvq0UDjfk2l0YaK4kyd4GCVj8z3069C_yqTQNocbbRrTlqaOxJHWN6NsQNdjeecxlH_sGthy1pkxzmUGW9WQvzsXYKEB7-XuRWSxb9xHGTPpStJuqkMFWI0Vazc-xJv-Oj9z7SWpr6zrTVunoGdIVt6lnE-K9Q1qS4w3ZNrqULyYEwFSESjlhQbMVsH312l6DHVs8VlsF_JnCouIO2998zcY4IpGWsUvHOhrtlwaIb8slnbC2CgiD-0f_4S9LNfEu0qLbEP-ph-1tduY2fKZTxHObtCVjVoSAeWbzx6gkqVzyPQQG_f2KiCwwOTuDPgSpo1uAGxHk1MSOlz_B0Psd1pX0CAdRpG41gKA6pI2EN8XOo0um_Wp_MwLo9QyHxpWsV3dMG_d4KPBNiMl_iYOMAXo3hO66wCPB_2YLCeMbBSTrGa98w5ToT9Gyo1Jv7b4fLx6=w245-h132-no)

### 步驟 3

在 IIS 根目錄中建立一個虛擬目錄 **arcgis_js_api** ，選擇剛剛解壓縮後的檔案路徑，注意是要選擇 **rcgis_js_v325_api\arcgis_js_api** 這個資料夾

![virtual directory arcgis_js_api](https://lh3.googleusercontent.com/tdxDWQhkuDaNxE1XKgWVE8LMQXXAhoBrv7vrsMX-GyQ6Sj974Wi42m_EawS3zrUCESUZsVdK_soMetIB7YsQqCPfYCJOLq7CTVA2nOdiLG5vVBmqFKiQVJ_CV5US0ITYUWSWscGz7FNdQqBlzHK7MpW20-NArXT0_Zlilj3DMCbQrEnaZ-qWcOhPkATIAl2oRPxQoGY6_5sOR2KeNcUp2FeLhE8-20V_gJnm4s0yno6zQ3864Ro_VIJdtzgaiOBzx2JoiJS-SdXK6cViLeXQyQZzfXnQSkU2I-gDNlZEKu8BN0MgpAUZOVaeoHfR6CieZLNjjwE_tcSk9K-fcWdjX4N3hbg4RF7Qjs1ZGmnjacmmvPXxuLFH--95foKE9htowAt6iCjHNrrEbdBbcb17wV3sy46oVPAUeToVBNzYOuOa0cer39txeC7LSH9GKQNM5_FezE3jycUCpfehBwv9kZZFJPdPksUnCd3HR6UmrS4bsBW-cKAzhOEjBp-7eZ5shhJRv4rL9xQ_wvQlXPBUKxMHZhadcwMecpR3cCByaQ54pro8vMjcYRQHglvQmZUnTp6n-_kRX5UbpTpVGd886gVgOKYyUob0Y7AqTJ2CWFl9DlnwlKjQYFxJJxgNf7qUqPz1s3duhiIuIZTOQn9lKTb_wsUlvWB_yGVJ6jCGddky_xEo-Mkgqdl2=w550-h452-no)

### 步驟 4

上述都是 IIS 部分的設定，接下來則是修改 javascript 內容；按照以下路徑(前一步驟設定的實體路徑)開啟 **init.js**

``` txt
arcgis_js_api\library\3.25\3.25\init.js
```

找尋 **[HOSTNAME_AND_PATH_TO_JSAPI]** 此關鍵字，替換成各自設定的網域與資料夾路徑，如下

``` txt
<myhost.example.com>/arcgis_js_api/library/<myVersion>/<myVersion>/
```

以我此次 3.25 的設定則是

``` txt
http://127.0.0.1/arcgis_js_api/library/3.25/3.25/
```

![init.js setting](https://lh3.googleusercontent.com/Nz3_35XAOtCE8e1bl0myQlD-2OUh9eOsE-Ocfw4u5QUJ1uwzYlqd48NqUThhsFA8HsquXF9FiZBHL6tpWlUo6bj74VxCFJEsGXtIZ2fHv4ouDaFUVfvc8WH8p5OfrpqIre0sAc8-ueyN2h_IX3UrdKvObP_qj_tR55FNmeJLZBP7z5WoHFlwzyXZaNv5mSiEiB0poHIjiUOTI-Tiry0Ol2N3feMu9s_2Bx0OGqh3C5Sckn3ouTlnZGV4oESwDWAvaJqk982eTl7LSXCYxO75WBrLU1aRTMWtXt0rqzmeBsI1LpXdaQyOjym98UgrnrCrDgzAX3uY6XE365w2xwhXYO5q986mlM40H3Xxl4LqSGZexcfSVN9KgMEvALfZljJvyPiIqQyrMsYWc-cjfGTBgD5ZccKR5XBurx0M40XWzaBDOD1rg6XWi8m1uL0jB6mAz2yzC20MnZhD0i0-pbySJ2PBefmPfzvqSTt4XcQPQyks0Szj0P7osXhlFbift8c1i0v0z388y24zqAZhfwarrIa_jvrRF9ENQya9rNLLGZME3o6U4bIA1sutMEeet1PGiz1BorDSWy_qSbZj1yF_bErcxMpNzkqsHclfNjbfmfoGftZZxk1lZbGpryMTAa4ZeyJ0ZKz9pgJGXcMWHZALCpFmfA3L2KoW8t-8L_7iA_iurhmaV-unk7yP=w825-h191-no)

### 步驟 5

開啟 IIS 路徑下的 **dojo.js** ，就是設定的實體路徑

![dojo file](https://lh3.googleusercontent.com/eFKzlgFrbIH2PBqM2Pnw_ZzOZ3Vp4xFGSdaHSNnx9CS6G0EzWpaE4vABJJuopKzUccml39BfXLTIeic0Pim_8IrdlWU6FfEFJFzRmXE7wRmqm451nNk0-obHUCGNN9GqDE11RTuPXOddxZScb2aq1boXXndeo6dWA-ydbeLC8NJodxECP1F4ofkzNRvcirdZ5nKftV62rtQ8AGauIzYV0Q2fiu7UGIs7kVdrpGE0oO1gRLXeHv4vKTBmMzlZBmkYvfKNA1NUQ_M9I2kVsJrh6wJPVGRqH_NblJ3IdFqN74qx1Hy_11wV-WKqOWHglQ0R8vqQ76gyXT1BqLR7VhkSvefS2Ry0UhHyrF_eVDTNKLO-uya7u0wKECi4pswdb84LvoL2q4h_oCq7Lk21P90NN6MG04HST6Le_rp9_q9f-tvpDMeXE0lW2K5_CmDHWi_nhJkrhjYG5QTWYp2pHSkAJ5PEMFP4LBiKGyznXTEqv0mNPezc0tPT9FufKCS00tjTm_X7NOJ6L3r1tTTq0kn98ql1iRXwoGFzYMQSW6GoFPuy3BZXNzASs96XbbLZlmS9QbKaLguBrQBp5CGsYUF2yB_OjC-UDxB3Nq1Hmc42swXYE270__Hf7GWu54kmJJeGD9rJYOpPlmzGH4y-daM_6B8V9cfOf265yw_jk39v5GJpG_Zxe1WLFPBK=w797-h833-no)

``` txt
Default Web Site\arcgis_js_api\library\3.25\3.25\dojo\dojo.js
```

一樣找尋 **[HOSTNAME_AND_PATH_TO_JSAPI]** 關鍵字，用以下規則替換，同樣注意一下 **protocol** (http 與 https) 的差異

``` txt
<myhost.example.com>/arcgis_js_api/library/<myVersion>/<myVersion>/
```

### 測試

其實安裝檔案裏面都有說明教學檔案，裡面也有附上此測試頁面，將 **link** 與 **script** 替換成設定的路徑即可

``` html
<!DOCTYPE HTML>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Test Map</title>
    <link rel="stylesheet" href="http://127.0.0.1/arcgis_js_api/library/3.25/3.25/esri/css/esri.css" />
    <script src="http://127.0.0.1/arcgis_js_api/library/3.25/3.25/init.js"></script>
    <style>
      html,
      body,
      #map {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
    <script>
      require([
          "esri/map",
          "esri/layers/ArcGISTiledMapServiceLayer",
          "dojo/domReady!"
      ],function(Map, ArcGISTiledMapServiceLayer) {
          var map = new Map("map");
          //If you do not have Internet access then you will need to point this url to your own locally accessible tiled service.
          var tiled = new ArcGISTiledMapServiceLayer("https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer");
          map.addLayer(tiled);
      });
    </script>
  </head>
  <body>
    <div id="map"></div>
  </body>
</html>
```

![test page](https://lh3.googleusercontent.com/k3uwByjDg8x1ZhuJTv_XjLOkJPcRy88x-bPJWu3812Yb64DfG53ccTDajHfWTMmgoLVeO-xTDPCsJWgPlolE_pD18SGws95vg0W4wu7FJlYD3XwdeYmoaAVnjjkqh-VN0D4UjYQyg-fbkvTakUMid-mL0DpFDItKGcnfjszwqJ2YuxVtAyKXctXXwobfyHJ84U9lxN5LohrCFMngmyufn7yoKNXHn9yyy7w5TTwE-xGb2yFKGNYzQM0b7Bv08o1Tzk5P2O6XyMzSgk4nA5N9KSVY3wr0kDpgWhH4F_EM9OHk1_V_yFDfjLJyRSGkRenUsMQFkyBSdUMAWQ9jM4ZguKrbjNxazl7DdhZYhYuQOShPmixMPRixaCiZ5-GEa2hgFp_DMgby0-ZAFSNSzbES95tf-JXA4LXRZf2HhaBpDRC7fmvpV4QFYeAK2m0KUevdzgovDJd7q1QWuSV_cKzcP8IFFWwafTQBf5HszNZidqb5s4MVf_eigQC61y5JKpSkxzxeAVHgYqKZ7vEY-MoAKnPj2x6JeMEtvll32V2frEnK4_GF6vihTWoNtBmqCtrzW0Uj6W7A_DjI5C4bZ61orh-WsLrxeKtPylzT2jXPfSZo5i2JmPJCl1UzOqT4B9mp9lCCyJNEcWYjNEFE2VpUpiGy3ecGmQdmcE9IozXod1GuRt3AMz4p0pha=w872-h543-no)

## 參考資料

- [esri 設定步驟][1]
- [esri 安裝程式下載][3]

[1]: https://support.esri.com/en/technical-article/000011974
[2]: https://developers.arcgis.com/javascript/
[3]: https://developers.arcgis.com/downloads/