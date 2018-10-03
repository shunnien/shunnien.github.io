---
title: ArcGISServer
toc: false
categories:
tags:
description:
---
## Introduction

## Conetent

ex:

``` txt
localhost/arcgist/manager
```

### 權限說明

- User 使用者

無法操作服務

- Publisher 發佈者

所有服務都看的到

- Administrator 管理者

所有服務都看的到

http://www.arcgis.com

wajatrain/wajaTrain123

## 部署選項

- 自有
- Cloud 雲端
- ArcGIS Online

## Create an ArcGIS.com viewer application

www.arcgis.com/home

### Service 服務權限部分

假如不同 Server 的話，需要在另一台沒有 ArcServer 的電腦設定一個 Arc GIS Server Account，此帳戶帳密，必須同 ArcServer 的。

### Tips

可以在 GIS Server 的 Data Store 設定連線設定，且在 Data Store 設定此動作可以不要複製一份到 Arc Server

### Optimize Map Service

- Remove unused layers and data frames.
- Turn off irrelevant table fields. 跟前一項類似，關閉無使用的資料表關連
- Set scale dependency for layers and labels.設定比例尺顯示該資料
- Use complementary symbology.

### Service Map Cache

*tips*
PNG24 因為不支援 IE 6，比較少人使用。

另外也可以使用 **ArcToolbox**

``` bash
ArcToolbox → Server Tools → Caching
```

### 向量圖磚 vs 快取地圖

向量圖磚是動態標籤，在地圖放大縮小的時候，可以動態變更，不會有圖片(快取地圖)的模糊，而且旋轉的時候，向量圖磚的說明文字可以永遠是正向的，不會跟隨轉動

### Mosaic Dataset

這是動態鑲嵌，需要 standard 以上版本才支援，另外要發佈成服務的時候，需要有 image extension

### Geoprocessing

為什麼需要轉換為 service 服務，因為製作封包檔，在其他環境使用需要同樣的套件與設定，過於不便

## Reference

- [Ref1][1]

[1]: https://shunnien.github.io