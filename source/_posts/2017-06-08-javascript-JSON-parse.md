title: JSON.parse 介紹
categories: 程式技術筆記
tags:
  - JavaScript
  - JSON
description: JavaScript 中 JSON.parse 簡介
toc: false
date: 2017-06-08 15:14:07
---

## Introduction
在網站的開發中，[JSON][2] 資料是很常見，所以 [JSON][2] 物件的轉換就會有所需要；

## Conetent
此篇主要介紹把 [JSON][3] 字串轉換成 JavaScript 物件的方法 `JSON.parse`，以下引用 [MDN JSON.parse][1]

> JSON.parse() 方法把會把一個JSON字串轉換成 JavaScript的數值或是物件。另外也可選擇使用reviver函數讓這些數值或是物件在被回傳之前做轉換。
> 
> #### 語法
``` js
JSON.parse(text[, reviver])
```
> 
> #### 參數
> - text
> 要解析成 JSON 的字串。針對 JSON 語法的描述，請參見 JSON 物件。
> - reviver 選擇性
> 為選擇性的參數，用來描述JSON字串中的值該如何被解析並回傳的函式(function)
> 
> #### 回傳值
> 從給定的 JSON text 回傳對應的 Object。
> 
> #### Throws
> 如果解析的字串不是合法的JSON格式會丟出一個 SyntaxError 例外
> 引用自 [MDN JSON.parse][1]

此處針對使用 **reviver** 選擇性參數來作範例，例如以下的 JSON 字串，birthday 的資料可以直接在 parse 轉換好在輸出

``` js
let jstr = '{"name":"allen","gender":"male","birthday":"1496905033982"}';

// 直接轉換
JSON.parse(jstr);
// 會輸出
// Object {name: "allen", gender: "male", birthday: "1496905033982"}


// 使用 reviver 參數
// key: JSON 字串中的 key (例如:name、gender...)
// value: JSON 字串中的 value (例如：allen、male...)
JSON.parse(jstr,function(key,value){
    if(key === "birthday"){
        let options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(+value).toLocaleString(undefined,options);
    }
    return value;
});
// 將會輸出
// Object {name: "allen", gender: "male", birthday: "2017-06-08 14:57"}
```

## Reference
- [MDN JSON parse][1]
- [MDN JSON][3]
- [MDN toLocaleString][4]
- [Wiki JSON][2]

[1]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
[2]: https://zh.wikipedia.org/wiki/JSON
[3]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/JSON
[4]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString