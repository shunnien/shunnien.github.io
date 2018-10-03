---
layout: post
title: "JavaScript to Json 基本觀念"
date: 2015-11-17 16:31:15 +0800
comments: true
categories: [程式技術筆記]
tags: [JavaScript]
description: octopress 設定 search
---
## 緣起
有個朋友詢問我`angular.toJson`這 function為什麼不能轉換到[Json][5]，他只是把他的[angularJS][6] 更換到 1.4.7 版本。
經過了解後，才知道他對於[JavaScript][7]一些觀念不是相當清楚，至於他的問題也不是[angularJS][6]的問題，是他套用的某一個對岸套件影響的，所以他才一直以為錯誤的使用方式是可行的 xd。

## Angular JS 部分
一開始想說會不會是更新[angularJs][6]的關係，所以就查看了一下 1.4.7 的[source code][4]
``` js toJson
/**
 * @ngdoc function
 * @name angular.toJson
 * @module ng
 * @kind function
 *
 * @description
 * Serializes input into a JSON-formatted string. Properties with leading $$ characters will be
 * stripped since angular uses this notation internally.
 *
 * @param {Object|Array|Date|string|number} obj Input to be serialized into JSON.
 * @param {boolean|number} [pretty=2] If set to true, the JSON output will contain newlines and whitespace.
 *    If set to an integer, the JSON output will contain that many spaces per indentation.
 * @returns {string|undefined} JSON-ified string representing `obj`.
 */
function toJson(obj, pretty) {
  if (typeof obj === 'undefined') return undefined;
  if (!isNumber(pretty)) {
    pretty = pretty ? 2 : null;
  }
  return JSON.stringify(obj, toJsonReplacer, pretty);
}
```
結果發現這段轉換很久沒更動過了，最後一次更改還是 2014/2/15(想查看的，自己在 NG github 切換到 Blame 查看)，而且仔細看看這 function 內容，還是使用[JSON.stringify][1]這函式。

### [JSON.stringify][1]
再看一次[JSON.stringify][1]這函式的意義

> The JSON.stringify() method converts a JavaScript value to a JSON string, optionally replacing values if a replacer function is specified, or optionally including only the specified properties if a replacer array is specified.
    
清楚明白的寫著可以將[JavaScript][7]值序列化成[JSON][2]

## 範例對比
``` js 錯誤用法
var foo = [];
foo.bar = "new property";
foo.baz = 3;
var jsonString = JSON.stringify(foo);
```
jsonString 會輸出 `[]`
    
![error sample](https://lh3.googleusercontent.com/PAwmyY6doy5gJUGu8gkMJ6fn0yod5DSwYqAEm_u3j9Mbz6B_S-38kpVS1bQWevWLUKTddDHJ1-e5KRsDhM8gevV-FoPvjiRVLeCJOq0MTrTtK4L7uXuTCUeOzIub2j68Xg7J-1d7x5TFXJ4Uw607bEaUbS4E_vuwSmfjCIGVM--qxS-eZgLMTRB389aGZcq46UeXPvtjxBnYoSgLgEIr51vUMKjS174Vc2Of-hZHv4N_JS-VheNegiBbDYnjLIwVN3KpJIxCyKPJeslIzSLL9eLbFBhmEJl4NyFLHyU87vtKhUPOcDZAg_I5GfX5EUnIlbyZSa90OEoudlRAm85gk871FM8jyyzFFcRQY0yR6v8NfT1JEhh9uOCNmRd0pM85PPrgGXmEPdsjSXPD9ci8DOU7275gH9feDsVMht-Y8PalS3PPFfaDln_hryiefg4X-tH4Jd5R-Xa_lgrQtc2vW9zVPoAHnQ8plESZLr5RCTO_kN5mGkB0-wu9biPxuEEAO8en9Sr1S0bZeoMcYNHWG3TtNLMOrGwJOdZhi_GhBeO35ww2IQ0Zv637TbP3JlFwHH5Ie6WQycwKupyGVyNLImUh45RyAEy0SRwvwWE2y0s4nZG5suSV2UlHFDR4Dn2iwe4RyScgZJRk7YPz3MzWrLTDo3NMBSPzFrumVREeYw=w385-h222-no)

``` js 正確用法
var foo = {};
foo.bar = "new property";
foo.baz = 3;
var jsonString = JSON.stringify(foo);
```
jsonString 會輸出 `"{\"bar\":\"new property\",\"baz\":3}"`
    
![sample](https://lh3.googleusercontent.com/2mN2EpudbftXw96i0LfrPmbzKCEV5HEBOmdREYoXxEC9WGemUi7fdqNmo3jiqzqmX7ZM9NtcgkbITJrkfQ3JVPhGvmVhXCycX0GOOT4H7QtJjjScuotRLJSdEfL7KilQIWkri3eFhN_PYCR15LhJ1yPVBBd_GyOnwT8ou8cHA9-fdSliveMi00Fiv2pS4EcsVdgzVC_oI9VvEFoulxac2BrbOwM4NVoa2TKV8I6HKeFxxvE9Z-HM8zn-uDigIK2ikQQmSaf2R0V81WWd0LLv2C28HSus-b6KuLsZ9BzdjB8V1iO79hCpciXw_R1hsRmhHP6S6E5BRYms3ogJqNlaSXnXlarAg02HPeDd2Sj4hZkUsgVwtgWmOMHiEcm4hTXPXBSAyFFKOr-nS274FSHXOOa5DwYLVJeSodLNMn4xpTrU9eYI5rQgRrzZU6NvHAIaJ7kAL4sUuS1rX1ZM3tIveZ5P5VfL2506r_jqNLtrHf0qTxIvMOzV_0t8xs0OV-dTFnU7rpHzbQ-Lmzy7pR8_un-Rw5ew7wDj2JXlf9lniM74xtUUGRakvBdUHGDM-RY8_-HEddOXD56bBfPo_8uTfcXOgJrfIVioGUmZNbrhSs3PMHHsvqs8tkKbaNCK9SS1PSqaCjmX0ntxHSBAT46-igmH_Rvjvt7bOYlWEyBHeQ=w409-h227-no)

## 說明
兩個範例的差別主要在`foo`一個是 array，一個是 object，所以在宣告完`var foo`之後，以下這兩個動作
``` js
foo.bar = "new property";
foo.baz = 3;
```
在 array 的範例中，是指定 foo 的屬性，但是該 foo 的值為 []。
在 object 的例子，則是 foo 的值就是一個物件，且`bar`與`baz`都設定是該物件的屬性。
而[JSON.stringify][1]是轉換值為[Json][5]，所以一個是 **[]**，一個是屬性資料。


## 參考資料
- MDN:[json.stringify()][1]
- w3schools:[JavaScript JSON][2]
- AngularJS:[angular.toJson][3]
- Github:[Angular.Js Source Code][4]

[1]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify "MDN:JSON.stringify()"
[2]:http://www.w3schools.com/js/js_json.asp "w3schools:JavaScript JSON"
[3]:https://docs.angularjs.org/api/ng/function/angular.toJson "AngularJS:angular.toJson"
[4]:https://github.com/angular/angular.js/blob/master/src/Angular.js#L1164 "Github:angularJs"
[5]:http://www.json.org/ "Json"
[6]:https://angularjs.org/ "AngularJS"
[7]:https://developer.mozilla.org/zh-TW/docs/Web/JavaScript "MDN:JavaScript"
[8]:https://developer.mozilla.org/zh-CN/docs/Using_native_JSON "MDN:Using native JSON"