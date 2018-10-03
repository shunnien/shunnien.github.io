---
title: google map js api 串接 kml/kmz 檔案
categories: 程式技術筆記
tags:
  - Google Map
  - Google
  - JavaScript
toc: false
date: 2018-09-27 20:52:27
---

# Google Map 呈現 [KML][6]

使用 google map js API 來串接 [KML/KMZ][6] 檔案，其中需要注意的事項
<!-- more -->

## [KML/KMZ][6]

- [KML (Keyhole Markup Language)][6]，是基於 [XML (eXtensible Markup Language,可擴展標記語言)][7]語法標準的一種標記語言 (markup language)
- [KMZ][6] 為 [KML][6] 的壓縮格式，所以可以透過解壓縮得到 [KML][6]

## [Google Map js API kmllayer][2]

要使用 **Google Map js API** 串接 [KML/KMZ][6] ，需要透過 **kmllayer** 這類別，而 Google 在處理這部分有一些注意事項

- 取得最大檔案(包含原始 [KML][6]、原始 GeoRSS、壓縮後的 [KMZ][6])大小是 **3 MB**
- 最大未壓縮 [KML][6] 檔案是 **10 MB**
- 最大的網路連線是 **10**
- 最大文件內容數量是 **1000**
- KML 圖層數量，官方說明在單一地圖顯示中，有數量限制，平均在 **10 ～ 20** 左右

最後，最重要的是，google 官方有註記上述的注意事項隨時都可能變更，所以要隨時關注 [google document kmllayer][2]

另外串接的 [KML/KMZ][6] 連結必須是公開的網址，不能使用相對路徑進行連接

## 範例

[**kml Layer**][2] 參數的設定

``` js
var layer = new google.maps.KmlLayer([opts]);
```

|屬性|說明|
|:---:|:---:|
|clickable|圖層是否接收滑鼠事件，預設值為 true|
|map|顯示圖層的地圖物件|
|preserveViewport|自動縮放到 KML 圖層的中心，但是 KML 必須設定圖層的範圍邊界，假如沒有設定，則不會移動|
|screenOverlays|是否渲染至 overlays. 預設值為 true|
|uppressInfoWindows|點擊地圖時，禁止顯示跳出訊息視窗；預設值為 false|
|url|KML 的 url|
|zIndex|顯示圖層的 z-index |

所以在電腦的網頁上， **clickable** 設定為 **false** 時，因為事件冒泡被取消，所以 **uppressInfoWindows** 不管有無設定，都不會顯示 KML 圖層的訊息視窗。

``` js
var map = null;
var kmzLayer,kmlLayer;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(25.04, 121.505)
  });
}

var loadKmz = function () {
  kmzLayer = new google.maps.KmlLayer({
    url: 'https://shunnien.github.io/Victoria/sample.kmz',
    map: map
  });
}

var loadKml = function () {
  kmlLayer = new google.maps.KmlLayer({
    url: 'https://shunnien.github.io/Victoria/ty_bike_lane.kml',
    //suppressInfoWindows: true,
    map: map
  });
}
```

線上範例

{% jsfiddle ytucdm74 html,js,result dark %}

## 參考資料

- [Wiki KML][6]
- [google KML layer example][1]
- [google document KML and GeoRSS Layers][2]
- [google document Displaying KML][3]
- [google document KmlLayer class][4]
- [google document Kml 說明][5]

[1]: https://developers.google.com/maps/documentation/javascript/examples/layer-kml
[2]: https://developers.google.com/maps/documentation/javascript/kmllayer
[3]: https://developers.google.com/maps/documentation/javascript/kml
[4]: https://developers.google.com/maps/documentation/javascript/reference/kml
[5]: https://developers.google.com/kml/documentation/kmlreference
[6]: https://zh.wikipedia.org/zh-tw/KML
[7]: https://zh.wikipedia.org/zh-tw/XML