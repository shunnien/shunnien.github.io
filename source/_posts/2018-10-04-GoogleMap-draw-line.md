---
title: GoogleMap Polyline 線
categories: 程式技術筆記
tags:
  - Google Map
  - Google
  - JavaScript
toc: false
date: 2018-10-04 23:26:08
---

# [GoogleMap Polyline][2]

透過 **GoogleMap** 操作 [**polyline**][2] 的顯示<!-- more -->，不管是要顯示線，或是編輯線，繪製線等，使用 [**polyline**][2] 就可以操作

## [**polyline**][2]

**Google** 提供了簡單的[範例][1]與詳細的[參考文件][2]，使用上也很簡易，需要注意在 **HTML** 中宣告使用地圖的 **div** 要設定明確大小(css 設定的大小)

``` HTML
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Simple Polylines</title>
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: {lat: 24.977179, lng: 121.312848},
          mapTypeId: 'ROADMAP',
          zoom: 13,
        });

        var bikeLaneCoordinates = [
          {lat: 24.977685, lng: 121.310424},
          {lat: 24.977179, lng: 121.312848},
          {lat: 24.977879, lng: 121.317708},
          {lat: 24.978132, lng: 121.319951}
        ];
        var bikeLanePath = new google.maps.Polyline({
          path: bikeLaneCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          editable: true,
          draggable: true
        });

        bikeLanePath.setMap(map);

        // no display polyline
        //bikeLanePath.setMap(null);
      }
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
    </script>
  </body>
</html>
```

> google.maps.Polyline 屬性說明

- path : 線條的座標點集合陣列
- strokeColor : 線條顏色
- strokeOpacity : 線條透明度
- strokeWeight : 線條粗細
- editable : 可以編輯，值為 **true** 或是 **false**
- draggable : 是否可以拖動，值為 **true** 或是 **false**

> 線上範例

{% jsfiddle 71csbo3q html,js,css,result dark %}

## 參考資料

- Google [simple polyline example][1]

[1]: https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
[2]: https://developers.google.com/maps/documentation/javascript/shapes#polylines