title: javascript format 日期轉換處理
categories: 程式技術筆記
tags:
  - JavaScript
description: javascript format 日期轉換處理
toc: false
date: 2017-06-06 11:51:26
---

## Introduction
主要使用在日期轉換處理，擴展原本的 Format 。

## Conetent
因為使用在日期轉換，所以首先先介紹一下 [Date][1]，以下引用 [MDN][1] 上的介紹

> 建立一個  JavaScript Date 物件來指向某一個時間點。Date 物件是基於世界標準時間（UTC） 1970 年 1 月 1 日開始的毫秒數值來儲存時間。
> 
> #### 語法
> 
``` js
new Date();
new Date(value);
new Date(dateString);
new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
```
> 
> - value
自世界標準時間（UTC） 1970 年 1 月 1 日 00:00:00 開始的毫秒整數（Integer）值（Unix 紀元；但要注意到大多 Unix > 時間戳記是以秒而非毫秒為單位）。
> - dateString
表示時間日期的字串。這個字串應該要能被 Date.parse() 方法解析（符合 IETF-compliant RFC 2822 timestamps 及 version of > ISO8601 格式要求).
附註： 由於各家瀏覽器有所不同且具有差異性，因此非常不鼓勵使用 Date 建構子（或 Date.parse > 方法，它們是同等的）來解析時間日期字串。
> - year
> 表示年份的整數。當數值落在 0 到 99 之間，表示 1900 到 1999 之間的年份。參考下面的範例.
> - month
> 表示月份的整數。由 0 開始（一月）到 11 （十二月）。
> - day
> 選用。表示月份中第幾天的整數值。
> - hour
> 選用。表示小時數的整數值。
> - minute
> 選用。表示分鐘數的整數值。
> - second
> 選用。表示秒數的整數值。
> - millisecond
> 選用。表示毫秒數的整數值。

日期格式中，個人蠻習慣 `formate("yy-MM-dd")` 這種表示方式，所以這邊進行 Format 的擴充，透過 prototype 來進行。

``` js
Date.prototype.Format = function (fmt) { 
    /// <summary>
    /// 日期格式轉換
    /// </summary>
    /// <param name="fmt">The fmt.</param>
    const o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear().toString()).substr(4 - RegExp.$1.length));
    for (let k in o)
        if (o.hasOwnProperty(k))
            if (new RegExp(`(${k})`).test(fmt))
                fmt = fmt.replace(RegExp.$1,
                    (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr(o[k].toString().length)));
    return fmt;
}
```

## Reference
轉換的程式中，這邊列出使用的部分語法說明
- [MDN Date][1]
- [MDN Template_literals][2]
- [MDN RegExp][3]

[1]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Date
[2]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Template_literals
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp