---
title: ArcGISAPIforJs
toc: false
categories:
tags:
description:
---
## Introduction

## Conetent

### ArcGIS API for JavaScript

[ESRI GIS Dictionary][1]

online 上可以發 vistual service

教學用帳號/密碼
baajtrain/baajTrain123

可在[這裡][2]登錄，應用裡面的一些功能，建議自行註冊後登入，查找適合的或是需要的 ArcGIS Templates

### Tiled layer

靜態圖磚，BaseMap 最底層的圖層

### Dynamic layer

沒有圖磚的圖層，想要速度快的話，統一座標標準會比較快速

### Feature layer

### Graphics layer

最上層的畫布

### Map and layer spatial references

地圖會根據第一個加入的 baseMap(Tiled layer) 的座標為基準，後續疊加上去的圖層會參照底層

### 4 Applying queries to data

InfoTemplate 想要在地圖上呈現點擊後的資訊或是標示點，必須一定要設定 Geometry 和 Symbol

#### FeatureLayer

- attributes in a table or data grid

### Lesson 5 Visualizing and rendering data

PopupWindow 是 InfoWindow 的延伸

### Lession 6 分析

- Geoprocessor 這個 task 必須自行撰寫 UI
- Analsis Wdigets 一個 widget 工具，包含了 UI 等

#### Geometry service

#### ArcGIS Analysis service

### Lesson 7

### Contact 

Kate 盤淑燕
互動國際數位－技術服務處
katep@igis.com.tw

## Reference

- [ESRI GIS Dictionary][1]
- [ArcGis][2]
- [ESRI Github][4]
- [Esri Community][5]
- [Esri sample resource proxy][8]
- [MarkerSymbols][9]

[1]: http://support.esri.com/other-resources/gis-dictionary
[2]: http://www.arcgis.com/features/index.html
[3]: https://developers.arcgis.com/downloads/
[4]: http://esri.github.io/
[5]: http://geonet.esri.com "Esri Community"
[6]: http://jso.arcgis.com/ "Optimizer"
[7]: https://developers.arcgis.com/javascript/
[8]: https://github.com/Esri/resource-proxy/releases
[9]: https://developers.arcgis.com/javascript/3/samples/portal_symbols/ "MarkerSymbols"
[10]: https://developers.arcgis.com/javascript/3/jssamples/popup_chart.html "Popupwindow"
[11]: https://developers.arcgis.com/javascript/3/samples/gp_resultmapservice/
[12]: https://developers.arcgis.com/javascript/3/sandbox/sandbox.html?sample=renderer_class_breaks
[14]: https://developers.arcgis.com/javascript/3/samples/ed_simpletoolbar/