---
title: API 壓力測試工具 SuperBenchmarker
categories: 程式技術筆記
tags:
  - tools
toc: false
date: 2018-09-20 09:21:29
---

# SuperBenchmarker

這工具使用也一段時間，這次順手紀錄下來<!-- more -->；這是一個 command-line 工具，可以很便利使用。

## 安裝方式

可以透過 [**chocolatey**](https://chocolatey.org/) 來安裝，安裝指令如下

``` bash
choco install superbenchmarker
```

## 指令與參數說明

指令範例如下

``` bash
sb -u "https://reqres.in/api/users?page={{{Id}}}" -n 800 -c 5 -m GET -t D:\temp\template.txt -f D:\temp\values.csv -v -h
```

常用參數說明

|參數|說明|
|:---:|:---:|
|-u|設定要測試的 url|
|-n|要發出的 request 數量|
|-c|同時的連線數|
|-m|http method|
|-t|template 範本，要設定 header 可以使用此參數|
|-f|使用 csv 檔案來取代參數的指令|
|-v|顯示詳細訊息|
|-h|顯示 header 訊息|

另外執行結束會產生報告圖表的 html 頁面，此 html 會儲存在指令執行的路徑下，所以需要注意登入帳號是否有權限寫入檔案

![output result](https://lh3.googleusercontent.com/GoYY_-i8_sF5Waez3c21XwvEo4rBbMH5HDd1w0rnBnLyb1hSJpVL3s6QjxsTW6kn7FrdOrZ86_3AK9BnBMO5NevBRah6sXkF5dVF49kJOqPRSlFYbOofBcMLOubEfIYWMugGRiMibtXGP7aQES3TutmzCy0HPqbXRowB2KqaDW1f15PNaVMWR8Nk_7GgDvfgseY0j0dLXpy0rAz-e2ivzcvcxn1RJu-6FX5w_Vrja5-Msq6ljdAKfNFysQ6gJfeqyLBwcbPVs-Tv3J33z01WU7VpP5R0vMSA3r69tp4uoHSsT-IWqIvMR72aJFgCZIdwS89qk-dJxoSnJkvWJAUNyJjPYAXbWkDzgF82v06lXpjQcOHYmGSYxvd1xESiMVHIPSnqN4dflI069Oc1-MRnaufJiUJtLJMhi_lOzSi6IyZoGvi9DdOp7ZOSzghQ-689sKddoAL-ft6-ZwywfcUcqHrm9R557iAOcqOcxnJ9pldSjsQTk7HqOv1G9XE95G-8DCnC-Cm84Nso8JRgA3MzFXE9hru6zazangmPviklviA1qPvKMYzCMz9i51OloSrWI7YFqU8iq8ybSmRjcsPaS5YVOsMeSuXukzkjAfOpNSsG4sPwE-zoaQ_9Os1PBch2V7ZmHt8Jc-OE10sn5dc1SUFeMkQv5bMljCLcGiPuwJl4l2ywQdKaVZ5j=w1267-h826-no)

### 名詞說明

> 每秒需求處理能力 RPS( Requests Per Second)

## 參考資料

- [Github SuperBenchmarker][4]
- [Level Up SuperBenchmarker][2]
- [kkbruce 免費網站與REST服務壓力測試工具][3]

[1]: http://karatejb.blogspot.com/2015/10/superbenchmarkerhttp.html
[2]: http://larrynung.github.io/2013/10/27/superbenchmarker-a-load-generator-command-line-tool-for-testing-websites-and-http-apis/
[3]: https://blog.kkbruce.net/2013/09/free-website-rest-service-stress-test-tool.html#.W6IDSGgzaCg
[4]: https://github.com/aliostad/SuperBenchmarker