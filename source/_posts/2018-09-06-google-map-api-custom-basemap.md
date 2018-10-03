---
title: google map api 使用自訂底圖
categories: 程式技術筆記
tags: 
  - Google
  - Google Map
toc: false
date: 2018-09-06 17:27:08
---

# google map api 使用自訂底圖

在 Google map js api 中，不使用其預設底圖，改採用國土測繪中心的通用電子地圖<!-- more -->

參考 Google 官方的 [**Map Types**][1] 說明文件，提到可以使用 **setMapTypeId** 此方法來指定底圖，記得更換以下的 **google api key** ，可以參考[此篇][2]

``` html
<!DOCTYPE html>
<html>

<head>
    <title>Overlay map types</title>
    <style>
        html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        #map {
            height: 100%;
        }
    </style>
</head>

<body>
    <div id="map"></div>
    <script>
        function initMap() {
            const wmsMapType = new google.maps.ImageMapType({
                maxZoom: 18,
                minZoom: 7,
                name: "test",
                tileSize: new google.maps.Size(256, 256),
                isPng: true,
                getTileUrl: function (coord, zoom) {
                    return `http://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/${zoom}/${coord.y}/${coord.x}`;
                }
            });
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: new google.maps.LatLng(25.04, 121.505)
            });
            map.mapTypes.set('test', wmsMapType);
            map.setMapTypeId('test');
        }
    </script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCmg6WKhPyvaIM7yJI-x3LtXkgvWJzjiZE&callback=initMap"></script>
</body>

</html>
```

{% raw %}
<iframe height='265' scrolling='no' title='GoogleMapCustomBaseMap' src='//codepen.io/shunnien/embed/EewaEJ/?height=265&theme-id=0&default-tab=html&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/shunnien/pen/EewaEJ/'>GoogleMapCustomBaseMap</a> by allen_yu (<a href='https://codepen.io/shunnien'>@shunnien</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
{% endraw %}

## 參考資料

- [Google doc Map Types][1]
- [Google doc tutorial][2]

[1]: https://developers.google.com/maps/documentation/javascript/maptypes
[2]: https://developers.google.com/maps/documentation/javascript/tutorial