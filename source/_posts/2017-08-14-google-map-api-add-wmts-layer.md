title: Google Map API 接取 WMTS
categories: 程式技術筆記
tags:
  - Google
  - JavaScript
toc: false
date: 2017-08-14 22:21:27
description:
---

使用 **Google Map API** 介接 **[WMTS][4](Web Map Tile Service)** ，介街方式不難，主要使用 **Google Map** 的 **[ImageMapType][3]** 。<!-- more -->
以下進入正題， **[WMTS][4]** 使用國土測繪中心的資料。

``` javascript
function initMap() {
  const wmsMapType = new google.maps.ImageMapType({
    maxZoom: 18,
    minZoom: 7,
    name: "EMAP",
    // 每個磚格設定為 256 X 256
    tileSize: new google.maps.Size(256, 256),
    isPng: true,
    // 使用國土測繪中心的 wmts 來進行範例
    getTileUrl: function(coord, zoom) {
      return `http://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/${zoom}/${coord.y}/${coord.x}.png`;
    }
  });

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(25.04, 121.505)
  });

  map.overlayMapTypes.insertAt(0, wmsMapType);
}
google.maps.event.addDomListener(window, 'load', initMap);
```

{% jsfiddle 2gae8em2 js,html,css,result dark %}


## 參考資料
- [Wiki WMTS][1]
- [Google Map maptype-image][3]

[1]: http://blog.csdn.net/supermapsupport/article/details/50423782
[2]: https://developers.google.com/maps/documentation/javascript/examples/maptype-base
[3]: https://developers.google.com/maps/documentation/javascript/examples/maptype-image
[4]: https://en.wikipedia.org/wiki/Web_Map_Tile_Service