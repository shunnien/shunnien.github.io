title: JavaScript docxtemplater 匯出 Word 檔案套件
categories: 程式技術筆記
tags:
  - JavaScript
  - npm
description: JavaScript docxtemplater 套件匯出 Word 檔案
toc: false
date: 2017-06-12 14:40:59
---

## Introduction
以前匯出 word 檔案，都是從後端進行；這次試試看從前端進行。

## Conetent
[docxtemplater][3] 這套件的流程簡單描述是採用一個 word 檔案當作 template 樣板，透過 ajax 傳送至前端，然後按照對應的 object key value 去填入資料。聽起來很簡易，但是裡面應用的東西不少；安裝方式可以透過 npm 或 bower 或是手動引入檔案。
- 使用 npm 安裝
使用 npm 的話，我在重新 compile 的時候，發生錯誤；所以我是直接抓取 [Github][6] 上的檔案，然後 [jszip][5] 只能使用 2.x 版本。
``` bash
npm install docxtemplater --save-dev
npm install jszip@2 --save-dev
```

- 使用 bower 安裝
bower 安裝執行，倒是沒有發生其他錯誤，只是 bower 安裝的只有 [docxtemplater build][6] 與 [jszip][5]，所以還需要去 [docxtemplater][3] 抓取 **jszip-utils.js** 與 **jszip-utils-ie.js** (不同瀏覽器的使用)檔案
``` bash
bower install --save docxtemplater
```

示範程式碼如下，可以在 [Github][4] 上取得，其 **docxtemplater-latest** 引用的版本是 3.0.10 版本。
``` html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Demo</title>
</head>

<body>
    <input type="button" id="export" value="export word" />
    <script type="text/javascript" src="bundle.js"></script>
    <!-- <script src="/Jss/docxtemplater/docxtemplater.v3.1.3.js"></script> -->
    <!-- <script src="/node_modules/jszip/dist/jszip.min.js"></script> -->
    <script src="/Jss/docxtemplater/docxtemplater-latest.js"></script>
    <script src="/Jss/docxtemplater/jszip.min.js"></script>
    <script src="/Jss/docxtemplater/vendor/file-saver.min.js"></script>
    <!--[if IE]><script src="~/Jss/docxtemplater/vendor/jszip-utils-ie.js"></script><![endif]-->
    <!--[if !IE]>-->
    <script src="/Jss/docxtemplater/vendor/jszip-utils.js"></script>
    <!--<![endif]-->
    <script type="text/javascript">
    window.onload = function() {
        let btnExport = document.getElementById("export");

        let loadFile = function(url, callback) {
            /// <summary>
            /// loadFile for export word.
            /// </summary>
            /// <param name="url">The url path.</param>
            /// <param name="callback">The callback.</param>
            JSZipUtils.getBinaryContent(url, function(err, data) {
                callback(null, data);
            });
        };
        btnExport.addEventListener("click", function() {
            loadFile("template.docx", function(err, content) {
                let objData = {
                    "title": "大標題",
                    "subtitle": "子標題",
                    "desc": "隨便的內容描述",
                    "header1":"表格標題",
                    "header2":"第二列",
                    "cell1":"你好",
                    "cell2":"word 文件"
                };
                let zip = new JSZip(content);
                let doc = new Docxtemplater().loadZip(zip)
                doc.setData(objData) //set the templateVariables
                doc.render() //apply them (replace all occurences of {title} by Hipp, ...)
                let out = doc.getZip().generate({
                        type: "blob"
                    }) //Output the document using Data-URI
                saveAs(out, "output.docx")
            });
        });
    };
    </script>
</body>
</html>
```
最後說明一下 word 檔案的寫法，其格式為直接在 word 檔案寫上 `{ObjectProperty}` 大括弧裡面寫上 JS 物件的屬性名稱，在前端 `setData` function 執行時，會去自動對應。

![docx template](https://lh3.googleusercontent.com/wQOOQuQy-_iZ7fRsh82gCGtjcCVWhuRV49e52MepOx3e0VJ_gAHvTHaerxVriL_V4SWLsrT3kZCUM9ZyrerqGpFPl5-MihYc8k1Wwwo4-ykv0Yyw3pv8622NrirEFN_T9YpjOpEw_sQY5G5iRlwvGhNjN5C4PvdRxKVR-D8a-FWqgNrNwVCInd5fcC-blF7umq3yS6o4F_Y0aUpn4KBG2EH57LbdebOsP1NDzUIDDFPqLIUx2el45mWCWu3KISqZL-ZAaimFL8-QSEZPuS_LAEPye-FAaDxn9mWz3-dhs64EpQPJuMFRO7LuGERyNzFZDyR97vbtTMwRHxYuljIrjJhiL3CHfGbO7k4jhbeQaI4vLAMAVH5N0vFItmT9GvRlJ92Utv5inYQvqqhUcSag8IMlhZgsgCbqaCwHZnkW71LI-n7v1jNBdrik-mw9XuYg-bHyXY__SQ6ZME3sblAYpyDacfXXfeVHpv2rJArFi7QwYzSGF3BG_MYcvhT3HJ55AslIl48Osd3NA1YdmKKn8xYqjPb87OZdhtC64tl82j1siLRB8ezuF2tWvVC_B8COzP8xqYRW_JPdlvHzcOxxd-VhKlF7-nr6J-xNM9xjKxkEMXZNw1tY31XAurtP7uZ0HkIGdirFJlVq1gU8PtdU-fV5Qz2iiXIh1oBiTXOVuw=w767-h393-no)

## Reference
- [docxtemplater Documentation][1]
- [docxtemplater demo site][2]
- [docxtemplater GitHub][3]
- [docxtemplater build all version][6]
- [jszip][5]
- [My Sample Github][4]

[1]: http://docxtemplater.readthedocs.io/en/latest/
[2]: http://javascript-ninja.fr/docxtemplater/v3/examples/demo.html
[3]: https://github.com/open-xml-templating/docxtemplater
[4]: https://github.com/shunnien/docxtemplateDemo
[5]: https://github.com/Stuk/jszip/blob/v2.x/dist/jszip.js 
[6]: https://github.com/open-xml-templating/docxtemplater-build/tree/master/build