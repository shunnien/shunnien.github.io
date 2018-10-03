title: 下載 Blob 在 IE 11 遇到的問題
categories: 程式技術筆記
tags:
  - IE
  - JavaScript
toc: false
date: 2018-02-21 10:21:30
---


透過 **JavaScript** 下載 [Blob][3] ，發現在 IE 11 上，不能下載

<!-- more -->

範例程式如下，以下程式在 IE 就無法下載

``` js
var saveData = (function () {
    var a = document.createElement("a");
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    };
}());

var data = { x: 42, s: "hello, world", d: new Date() },
    fileName = "my-download.json";

saveData(data, fileName);
```

{% jsfiddle 2c2aaj04 html,js,result dark %}

{% note primary %}
主要原因是 `createObjectURL` 在 IE 11 中沒有作用
{% endnote %}

雖然 [createObjectURL](https://developer.mozilla.org/zh-TW/docs/Web/API/URL/createObjectURL) 在 MDN 中寫了支援 IE 11 ，但是不知道為什麼就是沒有效；參考了 [stackoverflow 此篇討論][1] 更改使用 **navigator.msSaveOrOpenBlob**

``` js
var saveData = function() {
  var a = document.createElement("a");
  var json = JSON.stringify(data),
    blob = new Blob([json], {
      type: "octet/stream"
    });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
    window.navigator.msSaveOrOpenBlob(blob, fileName);
  }
};

var data = {
    t: "hello, world",
    d: new Date()
  },
  fileName = "my-download.json";


document.querySelector('button').addEventListener('click', saveData);
```

{% jsfiddle pntnbj72 html,js,result dark %}


## 參考資料

- [stackoverflow][1]

[1]: https://stackoverflow.com/questions/36978795/download-a-blob-from-http-url-in-ie-11
[2]: https://www.bamossza.com/view?topic_id=44
[3]: https://zh.wikipedia.org/wiki/%E4%BA%8C%E9%80%B2%E4%BD%8D%E5%A4%A7%E5%9E%8B%E7%89%A9%E4%BB%B6