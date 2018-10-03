---
layout: post
title: 'windows 刪除資料路徑太長的檔案'
date: 2015-11-03 06:04
comments: true
categories: [程式技術筆記]
tags: [npm, Windows]
description: windows 下刪除資料路徑太長的檔案
---
在 windows 系統中用 npm 裝了一些 generator 後，有些路徑長得不像話，很容易就爆了，砍都砍不掉，就像下圖。
![錯誤畫面](https://lh3.googleusercontent.com/rXVaO5P7DzoiqKni0kj4_wutFahG_OYtlF0mIUUFaUkDOHxlLPbeQlfIH3yCIRCccXLuF34TNqRz9Ag_iHvei6HWx3rUY_-t-fKg1CxqyYgA8i5r8EwOJlqdPIa6spLltNzo9dSoxnucWQg1Ru9dp32vHPn7z8C5twGKOZ0ny9bPPwu8bzQUA519Su5gJVs1RwbtkwhMoFITgo8v6rgVsv9CmOf7ZgPfUlTuovaA4MdFU__cRKL1R1E5TpRK1NyWeh8-F0j28yeUvMd8XNJ0pIDxb5WojZrpEVKTA600po4ijjEobVl062iLNPRbiQi1VeIz8wgjB3_r-I5XNMjzP2Jq3FnKStoMaS1KKV5IWQcIfnIFizaIhTjF2QrBb5hYVymhpvGAVxMpM7PY6-TTCprC8mwcOqFwDygehXDXxX_2kwwfeW9Xucs9SduCDkE-gKIKp4C40bRnONpmQeNkKAfoA5y1kzcJ7GGz9vZEDPpzQkF3ocQaMBzoK-HOq48OptfLPDzciQxNWG6fGdviku2oJcM-Rk0HAJTNLbgCM0T-RGRCptUIpNt8Myw4IvmLFxPWkuB4aO5Zq905nR6lOr3tfVcmjUnVGKHHmzmD6lJAS__12H1n0eTHdTz3MYY5jbxNdqJnQ8c-XBNDSQp0szHs2bfSzIRqWDmYTQPamA=w447-h252-no)
當時又不想靠 7-zip 來刪除檔案，就想找有沒有便利的工具直接下指令刪除了，剛好看到這工具挺方便的

## 問題環境
> npm version:2.11
> OS: win 10

## 問題原因
一方面是 npm 的設計，另一方面是 windows 環境下的問題，windows 下路徑檔名有長度限制。
對於 npm 在 windows 環境下的設定與路徑說明，可以參考[保哥的文章][3]；不是 npm 產生這問題的，也可以考慮以下解決方式，話說以前好像玩遊戲的時候搞出這種問題 ><。

## 解決方式
遇到這種情形，解決方式有幾點
* 改檔名，把路徑改到符合長度限制
* 第三方工具

第一種方式的土法煉鋼，除了真的想嘗試手指運動的人，我想應該不會有人想要這樣做，除非路徑長度剛好超出限制一點點。
工具的部分介紹大家兩種：
* [7-zip][4]，這是圖形化介面，簡單說就是滑鼠操作一下，今天就不說這個工具，想知道怎麼操作的可以參考一下 [demo 哥的文章][5]
* [rimraf][1]，以下介紹這工具

### 第三方工具 [rimraf][1]
這工具是 npm package ，可以直接在 cmd 直接執行，符合我的需求。順便說一下，我使用 npm 預設路徑，套用 Yeoman 的 Hottowel generator，擷取一小部分其檔案結構來看，應該不會有人想要一一刪除檔案
![tree view](https://lh3.googleusercontent.com/DvycZCZQfeRyBfAnYa96kzmdnkjQWRzU9mgocf69zvcWuVlClZDVGS6JpXuJYFUDzYsQG-ffb_J417fDAsw3_-BubvCZ1bKvSwr1nweKPeV7sbk0t8NqfVjL2aOTND0vsq7MxZEVnJZiZqWRV8vipXU3HtLzDjztbzidoSdLntQyleSuASh9Aq9nRh-5vSCnEe-gzjyuFjz6QHu60cd_GSk_2B25WouQ3wYy5XyjU8Vfa9VSB3UuvjwaFROVTkUqiDWT8Kv6LuHAdZpMA4zGlSKqjHKdJDlYbx6a6xwbTYlPSt5IW9EY_3ReUQF9G6PkssDJNUR9p3vJzmSBfYdEEtKE4sakaqIqfVbuQkcPHJGiV2iFTDEmGxi7EI6E5iFgdiiaTMoLUbUj1B6FqE1UKlh4VWUBMCtxNyFUBnYOHzPHxaga34WLNPyZjKVT7v3lk-ahamY1Yhr-JjzIJk2AXH86YzpklDugnEftQ-WaDI9zxYK8dj97fsDXCCJX3EuxwxhwTMD8Cnca02q2443r8QHGOnks0ktKeoAybyGyb-V_iSXGN5tlB0gNuu_a2Zh5eA2vVFmLEyqLfg3AtTCXU978f0c-3Q1eCjW4aaHPwXdT4yOd9Y1zyPNvypvLptmEDrFQXfk3FBT7sCU4Epb4rnekvO2x6cKq-NX51cqeVw=w556-h920-no)

### 操作方式
``` bash
rimraf(f, callback)
```
![cmder view](https://lh3.googleusercontent.com/Rhhc_xhnUAqu3EIjvi7GWVk-bBKo_uJl98tRb8fYqTTPzx7qy9HUZr3kLlY2Zu2wbEcgyADVO0cqz-aGlyu07nmIQIdRBDD18J2sDuUgkTvmy72-ivf5qGgVo5DBbp7uIa7iUE1N67oA_oOgfe7VZnl6fNAzOee_BkuYmfMWDfAhuzWOr2DmFjcRFHtQn9laFvnlZLb9Qgm-zNoeeEUj5v0q0U50abj541WZ7zi4Y_HkulE90NSSE9OvfmGVNGDTvCobo75bjpEDTtESQS4HDINEoSO1I46SXKLv4JmysX-J0Y56L8RfcvJSc1XI5F8TKg3eVb46xrS8LMKymVm017ts9ym35QOvrethO5OTKUaIcmqjwed5OCM2vbbhM4xyY-emvaYA9bSCO1qJS_NtPwXFVn5Iz8un9a6p4SqbcRqUJ88zftBT92pelP76YEEQGWIuGyZ4LoI8UgJPGCu95t6xVeED_1vNrsAt5jUvEkHEwhrRg2srtO7HOIIYtudV4r6p41c5I3L2jsTfN9NeSS-KxWr3jnS-RzuPhJAHIvq47Zf5VmB3Nb3b5HChAENSsGR10Pj7Wsrhp7Z6_S-X2SG-MFRGVatio9tveJaaK7ZylIr0nxx6J2m8BUFL4XaeFhrAAUGlMInwXsxfM0l7gHJ7LwP8wDnmQy0QDmCc-g=w213-h129-no)

[1]: https://www.npmjs.com/package/rimraf "rimraf"
[2]: http://www.nikola-breznjak.com/blog/nodejs/how-to-delete-node_modules-folder-on-windows-machine/ 
[3]: http://blog.miniasp.com/post/2015/09/02/Change-npm-default-global-installation-directory-for-nodejs-modules-in-Windows.aspx "保哥 如何在 Windows 平台變更 Node.js / npm 全域模組的預設安裝路徑"
[4]: http://www.7-zip.org/ "7-zip"
[5]: http://demo.tc/post/811 "demoshop - Windows 系統中資料路徑太長無法刪除的解決辦法"