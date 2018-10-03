---
title: spatial data note
toc: false
categories: Sql
tags: 
description: Spatial Data 筆記
---
## Introduction

## Conetent

For Geography

``` sql
SELECT location.Lat as Lat, location.Long as Lon from myTable;
```

For Geometry

``` sql
SELECT location.STY as Lat, location.STX as Lon from myTable;
```

## Reference

- [Ref1][1]

[1]: https://shunnien.github.io