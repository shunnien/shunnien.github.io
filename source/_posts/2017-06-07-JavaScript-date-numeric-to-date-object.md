title: Server 端給予日期資料是數字的轉換
categories: 程式技術筆記
tags:
  - JavaScript
description: Server Side 給予的日期資料是數字(毫秒)時，資料的轉換
toc: false
date: 2017-06-07 15:51:30
---

## Introduction
有時候， Server Side 給予的日期資料會類似這種`\Date(1496592000000)\`，所以介紹一下這種 Date 格式。

## Conetent
這種資料格式是其實就是 [getTime][1] 方法取得的資料，其數字資料就是
> 指定的日期和時間距 1970 年1 月1 日 00:00:00 UTC 之間的毫秒數。


- 情境
> 將 **/Date(1488297600000)/** 轉換為 Date

``` js
function dateTimeReviver(value) {
        /// <summary>
        /// Date the time reviver.
        /// </summary>
        /// <param name="value">The value.</param>
        var a;
        return typeof value === "string" && (a = /\/Date\((\d*)\)\//.exec(value),a)
            ? new Date(+a[1])
            : value;
    }
```

## Reference
- [MDN Date getTime][1]
- [MDN Operators][4]

[1]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
[2]: http://www.w3school.com.cn/jsref/jsref_getTime.asp
[3]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators