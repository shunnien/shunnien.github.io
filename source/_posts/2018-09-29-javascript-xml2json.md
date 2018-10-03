---
title: 透過 x2js 自由轉換 XML 與 Json
categories: 程式技術筆記
tags:
  - JavaScript
  - tools
toc: false
date: 2018-09-29 15:19:12
---

# [x2js][1]

在前端中，有許多工具可以轉換 [XML][2] 與 [JSON][3] ，此篇介紹 [x2js][1]<!-- more -->

## 使用方式

可以使用 **CDN** 方式， [**x2js CDN**](https://cdnjs.com/libraries/x2js) 或是手動引入

``` txt
<script src="https://cdnjs.cloudflare.com/ajax/libs/x2js/1.2.0/xml2json.min.js" integrity="sha256-RbFvov4fXA9DW/RzOAcIC0ZHIDmghGdsoug5slJHMMI=" crossorigin="anonymous"></script>
```

### 基本語法

- XML to JSON

  ``` js
  // Create x2js instance with default config
  var x2js = new X2JS();
  var xmlText = "<MyRoot><test>Success</test><test2><item>val1</item><item>val2</item></test2></MyRoot>";
  var jsonObj = x2js.xml_str2json( xmlText );
  ```

- JSON to XML

  ``` js
  // Create x2js instance with default config
  var x2js = new X2JS();
  var jsonObj = { 
      MyRoot : {
                  test: 'success',
                  test2 : { 
                      item : [ 'val1', 'val2' ]
                  }
        }
  };
  var xmlAsStr = x2js.json2xml_str( jsonObj );
  ```

此工具轉換 [XML][2] 會自動解析 **namespaces** ，這還挺方便的

## 線上範例

{% jsfiddle fe8rkwxy html,js,result dark %}

## 參考資料

- [Github x2js][1]

[1]: https://github.com/abdmob/x2js
[2]: https://zh.wikipedia.org/zh-tw/XML
[3]: https://zh.wikipedia.org/wiki/JSON
[4]: https://github.com/x2js/x2js