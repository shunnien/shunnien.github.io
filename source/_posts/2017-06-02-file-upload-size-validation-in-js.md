title: 檔案上傳透過 JS 驗證檔案大小
categories: [程式技術筆記]
tags:
  - JavaScript
description: 檔案上傳透過 JS 驗證檔案大小
toc: false
date: 2017-06-02 15:05:52
---

## Introduction
整理一下資料，順便紀錄一下。

## Conetent
作法很簡易，透過 [file API][1] 來取得檔案大小

``` html
<input type='file' id='fileinput'>
<input type='button' id='btnLoad' value='取得檔案大小'>
```

``` js
document.getElementById("btnLoad").addEventListener("click", function(event) {
  /// <summary>
  /// 取得檔案大小按鈕觸發事件
  /// </summary>
  var fileinput, getfile;

  if (!window.FileReader) {
    alert("file API 尚未支援此瀏覽器");
    return;
  }

  fileinput = document.getElementById('fileinput');
  
  if (!fileinput) {
    txtAppend("p", "找不到 fileinput 元素");
  } else if (!fileinput.files) {
    txtAppend("p", "此瀏覽器不支援 input 中的 files 屬性");
  } else if (!fileinput.files[0]) {
    txtAppend("p", "請先選擇檔案在點擊取得檔案大小");
  } else {
    getfile = fileinput.files[0];
    console.log(getfile);
    txtAppend("p", "檔案大小 " + getfile.size + " bytes");
    txtAppend("p", "檔案大小 " + getfile.size / 1024 + " KB");
    txtAppend("p", "檔案大小 " + getfile.size / 1024 / 1024 + " MB");
  }
}, false);

function txtAppend(tagName, innerHTML) {
    /// <summary>
  /// 附加 html 內容
  /// </summary>
  /// <param name="tagName">HTML tag 名稱</param>
  /// <param name="innerHTML">HTML 內容</param>
  var elm;
  elm = document.createElement(tagName);
  elm.innerHTML = innerHTML;
  document.body.appendChild(elm);
}
```
Jsfiddle 上的範例
{% jsfiddle t70n45be result,html,js dark %}

## Reference
- [MDN File][1]

[1]: https://developer.mozilla.org/en-US/docs/Web/API/File