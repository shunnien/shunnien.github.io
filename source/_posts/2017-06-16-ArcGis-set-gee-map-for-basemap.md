title: ArcGIS API for Js 應用，將圖層設定為底圖
categories: 程式技術筆記
tags:
  - JavaScript
  - ArcGIS
description: 透過套用圖層來設定底圖
toc: false
date: 2017-06-16 23:19:48
---

## Introduction
紀錄一下 [ArcGIS API for Js][3] 的一些應用

## Conetent
一般底圖設定方式是使用 basemaps 進行設定，但其實如果對於地圖類型的 API 稍微熟悉的話，就會知道，其上的圖層是一層層堆疊的，底圖也就是最底層的那一層。

利用這個概念，透過 WebTiledLayer 載入圖層，並且保持 basemaps 為空，這樣所設定的第一層圖層就是底層囉。

``` html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no">
    <title></title>
    <link rel="stylesheet" href="http://js.arcgis.com/3.15/esri/css/esri.css">
    <style>
      html, body, #map { 
        height: 100%; width: 100%;
        margin: 0; padding: 0;
      } 
      body{
        background-color: #fff; overflow:hidden; 
        font-family: sans-serif;
      } 
      #header {
        padding: 4px 15px 4px 0;
        background-color: #F2F2EC; 
        color: #575757; 
        font-size: 16pt; 
        text-align: right; 
        font-weight: bold;
        height:55px;
      }
      #subheader {
        color: #575757;
        font-size: small;
        padding: 5px 0 0 0;
        text-align: right;
      }
      #subheader a { color: #575757; }
    </style>
  </head>
  <body>
    <div id="mainWindow" 
         data-dojo-type="dijit/layout/BorderContainer" 
         data-dojo-props="design:'headline',gutters:false"
         style="width: 100%; height: 100%; margin: 0;">
      <div id="header" 
           data-dojo-type="dijit/layout/ContentPane"
           data-dojo-props="region:'top'">
        Base Map Demo
      </div>
      <div id="map" class="shadow" 
           data-dojo-type="dijit/layout/ContentPane"
           data-dojo-props="region:'center'">
      </div>
    </div>
    <script src="http://js.arcgis.com/3.15/"></script>
  </body>
</html>
```

``` js
var map;
      require([
        "esri/map", "esri/layers/WebTiledLayer", "dojo/parser",
        "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"
      ], function(
        Map, WebTiledLayer, parser
      ) {
        parser.parse();
        map = new Map("map", {
          center: [121.2028889,24.8221225],
          zoom: 8
        });

        var twMap = new WebTiledLayer("http://maps.nlsc.gov.tw/S_Maps/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=EMAP&STYLE=_null&TILEMATRIXSET=EPSG:3857&TILEMATRIX=EPSG:3857:{level}&TILEROW={row}&TILECOL={col}&FORMAT=image/png",{
            "id": "baseMaptw"
        })
          
        var gooMap = new WebTiledLayer("http://mt0.google.com/vt/lyrs=m&hl=cht&x={col}&y={row}&z={level}&s=Ga", {
          "copyright": "baseDemoMap",
          "id": "baseGoomap",
        });
        map.addLayer(twMap);
      });
```

{% jsfiddle a1f8Ly6g js,css,html dark %}

## Reference
- [國土測繪圖資服務雲][1]
- [國土測繪圖資][2]
- [ArcGIS API form JavaScript][3]
- [WebTiledLayer][4]

[1]: http://maps.nlsc.gov.tw/
[2]: http://whgis.nlsc.gov.tw/Default.aspx
[3]: https://developers.arcgis.com/javascript/ "ArcGis Js"
[4]: https://developers.arcgis.com/javascript/3/jsapi/webtiledlayer-amd.html