title: JS30紀錄 09-Dev Tools Domination
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2017-12-26 19:03:12
---

# 目標

開發工具 Console 的運用說明。介紹 log 、 warn 、 error 、 info 、 assert 、 clear 、 dir 、groupCollapsed 、 groupEnd 、 count 、 time 、 timeEnd 等指令運用。
<!-- more -->
> [Demo](https://shunnien.github.io/JavaScript30day/day_09/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

## 步驟 1.

[console.log][9] 基本運用，利用 `log(string)` 裡面輸出字串。
進階運用是透過字符的替換
- ％s：字串
- ％f：浮點數
- ％o：物件
- ％d：整數
- ％c：設定輸出的樣式，在之後的文字將按照第二個參數里的設置進行顯示

``` js
console.log("I am a string: %s ", "log"); //log
console.log("I am a float number: %f ", 1.23); //1.23
console.log("I am a object: %o ", {name:"allen"}); // {name:"allen"}
console.log("I am a int number: %d ", 1); //1
console.log("%c other style", "color: #00fdff; font-size: 2em;");
```
![string format sample](https://lh3.googleusercontent.com/RdbTaZpW-wy0r6_INOomhBQrtJB0SpOVqjSBmniPZUO8mChY4jYTg5z76AXwKQ2lCT6HyKqnrelxsPXc8x0xfomvvxxRLRCvdPydrCrlQ2H8O_u73_eCh5hiOaeksaZ_zVH3bHslkMbcCnWLh35y282Mw9LaIR2eivWA0DvwHhv8BCm_ZTnzkwmNDyTN8zN2HAdFnIOPTZKCPCyE-MbyqGXfRjDg68-0ndduo3cw9qO5HAk0X7_yoc7eztJi2Nbwazu5zJkwrfHDgp_ps8cX5tDBJVw0LHGScrB9B6JBphq6kk2lpNzcXiWbhrZm-zssyW90B6kJtm0lwv3NGBNcYplD37ZP1lITd6vE7PPgckUWD9l4YjgQBU8aQkWuHJwWgTvfzQzYQJTM-f5C8oocccW3ngsWcs1k-Gnj1mDOiunQuJDdocsi9lTa8nJDOnFT3g6fuYmtUgx9TvPBpcFTl5-C4AMr3tAmXI6MkQ_IoyJicvrxGas-IquV0eFvCgnfOjV0oH6y99hSWvW7-knINLvTqmmbDjO_ws11bgExsrRvQ5v5pbpvknjc3t43ehftJxmbief58Z5cs9lD3BCsdnibkq0TYcnsXy32NGNgbiIvCS5wQpDz6IhetTUMGg-vir9S9_tZLKbD9Ox5CSJXu7ikQSqomhtQ=w348-h183-no)

## 步驟 2.

各式不同的訊息類型

- [warning][12] 訊息前出現此符號 <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
- [Error][13] 訊息前出現此符號 <i class="fa fa-times-circle" aria-hidden="true"></i>
- [Info][8] 單純只有訊息

## 步驟 3.

測試使用的 [assert][2] 與清除 [console][1] 的方法 [clear][3]。
使用 chrome 的時候，看一下有沒有設定 **Preserve log** ，這個選項勾選的話， [clear][3] 會無法清除 console 喔
![Preserve log](https://lh3.googleusercontent.com/l1WJvLdmnfjG297z3rYc7aErScp3vfUuxp9TbEmwSbC2fQ-tmrvEXzq3r4TqrdZxl3kAxAdJ-ZV_hhUxwFMkovdERhwrmYGJfDSayL0EcdRF6ZCU722---HkXHn8OrYcDSTJ3MHMU1blChpVK_5_KsIY4gu_Sz2jwE0rrY48gWJhrnQ9CaF0IO9AwGYRedLc3JcQMhexbYLPCOH-f-PokZhQMMzM0KhINy2jk-c4znfm4eTHFY8Sw-UnMvnvdWL40g7julFMEZ-IezD8Q6RnWYzuesQSamd_GGAaLd5zKlAR9W5m3A3MoH54vkXlffxs600XO-o9beRFolH4nJLTLPg-i2mdrDlLu6T67QJtG8Oph8S1VNqO8CCpXpDNa7LtAiU88jMkPvukiUWV-Ni-EeTEOj9nTcVx34VPKKGqSapwDUR9NPM8KxmDamaVbTxbPT2w9U4mMcIvswKkY45O-PN2_1hBZr_5e1-8Fi8XIK5XwRBfDy6bLdxQIsJqKMjQy-RwO1aDdUkQVLbod6WhmUXXLrmG1OcSpB6v0oPE1WUEsp-gEchEnHUYy4KN90RCz8zL-l9VBUye_0BoWxOf-WKZZ0SY-S175GpXfYoEbzHo9TwqFcUZWCEXbK7dBBqYS_PiBI0jLcAMLowTZxSdGAVOONe04JcI=w557-h213-no)

查看 DOM 元素，分別使用基本方式 [log()][9] 與 [dir()][5]

- [log()][9] 假如是物件的話，會直接輸出物件內容；假如是 DOM 則會輸出 HTML 標籤
- [dir()][5] 以樹狀結構呈現結果
![log dir compare](https://lh3.googleusercontent.com/txNg02YwGWecETLELIdw6UvBoHzKirQjppBhDszFfxjc3z6A_VVTcsgECXnfDvr97axUBmsNLp9W_KuUM55mWEjTRIJvHX2oa5uEE15yNs2mXSESLABE__LkjTPFORmzSs-XjTXnuqxzm-LX4pe_1Qh7Y9-dfNRN5H9qVTYK58uuj4bg5DOZwK70-wb-nmd-YEkz2tIHCRrDKZv4sNP8G7q0dOrj8c8J4khZ7Eag_ycad_694l2FSelJVj6Ofvh6QD08VZgHozOk051CuCZ2yCEuNx1p8j6f6heOBaIdM_xAFtmLzlsUjQmZuSvt-nXOBtFlrjxZVYrmn_lbm5hzWh1l-ba09L_LczkJ8rqzBrEU6JlxO1E9d0e1o1CWMIMrSK2CoqlDfT-Xva7OhmPWYxosCQOd7FnRAAGdRtFcq5cYxfzJWHXEzBnYo0ukiIZ3JS59JJ5rtmOhrxkm8uiyQUf6Q9POqr0WrNX78g6TLdLghc2mwv4p8c4diPt0vE-Mx0A0KSt3r7ozpdVivdMrVWPwvOjiH2tkoS1x607wph-1U3fZwQcCq3RcJgCbyMdvF05SI8OHNnTPyKezt_1yx1HvsZC-k1_1UXGiuTxaxTGPxi_kjHDDzfZ0tD5ExmodOHr_-zv7t1Z4NasIFALAb44hGJHSCuyr=w440-h79-no)

## 步驟 4.

進行分組、統計計算與時間計算等。分別運用 `groupCollapsed` 、 `count` 與 `time`

# 筆記與備註事項

此篇主題都是 [Console][1] 的運用，可以參考 **MDN** 上的說明來學習。

## JavaScript 部分

### [Console.assert()][2]

測試使用，當判斷的條件式成立，不會有任何反應，當條件式不成立，則會提供錯訊息，然後訊息顯示自訂的訊息部分

``` js
console.assert(1===1, 'this is wrong');  
console.assert(1===2, 'this is wrong');  // Assertion failed: this is wrong
```

### [Console.count()][4]

{% note info %}
輸出 count() 被調用的次數。此函數接受一個可選參數 **label**
如果有 **label** ，此函數輸出為那個指定的 **label** 和 count()被調用的次數。
如果 **label** 被忽略，此函數輸出 count() 在其所處位置上被調用的次數。

**資料來源** - [*MDN*](https://developer.mozilla.org/en-US/docs/Web/API/Console/count)
{% endnote %}

``` js
var user = "";

function greetEmpty() {
  console.count();
}
function greet() {
  console.count(user);
  return "hi " + user;
}
greetEmpty();       // 1
greetEmpty();       // 2
greetEmpty();       // 3
console.count();    // 1

user = "bob";
greet();                // "bob: 1"
user = "alice";
greet();                // "alice: 1"
greet();                // "alice: 2"
console.count("alice"); // "alice: 3"
```

### [Console.dir()][5]

{% note info %}
在控制台中顯示指定JavaScript對象的屬性，並通過類似文件樹樣式的交互列表顯示。
**資料來源** - [*MDN*](https://developer.mozilla.org/en-US/docs/Web/API/Console/dir)
{% endnote %}

### [groupCollapsed()][6] 與 [groupEnd()][7]

{% note info %}

#### console .group Collapsed

在Web控制台上創建一個新的分組.隨後輸出到控制台上的內容都會被添加一個縮進,表示該內容屬於當前分組,直到調用 [console.groupEnd()](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupEnd) 之後,當前分組結束。和 console.group() 方法的不同點是,新建的分組默認是折疊的。用戶必須點擊一個按鈕才能將折疊的內容打開.
**資料來源** - [*MDN*](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupCollapsed)
{% endnote %}

說明上這兩個方法都是無參數，但是範例中，是可以輸入參數的，輸入的參數則是顯示的分組標題文字。

``` js
const dogs = [{ name: "Snickers", age: 2 }, { name: "hugo", age: 8 }];
dogs.forEach(dog => {
  // 此是分組標題
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd();
});
```

### [time()][10] 與 [timeEnd()][11]

{% note info %}
#### console.time
你可以啟動一個計時器（timer）來跟踪某一個操作的佔用時長。每一個計時器必須擁有唯一的名字，頁面中最多能同時運行 **10,000** 個計時器。當以此計時器名字為參數調用 [**console.timeEnd()**](https://developer.mozilla.org/en-US/docs/Web/API/Console/timeEnd) 時，瀏覽器將以毫秒為單位，輸出對應計時器所經過的時間.
**資料來源** - [*MDN*](https://developer.mozilla.org/en-US/docs/Web/API/Console/time)
{% endnote %}

計算出來的時間以毫秒顯示

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Console
[2]: https://developer.mozilla.org/en-US/docs/Web/API/console/assert
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Console/clear
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Console/count
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Console/dir
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Console/groupCollapsed
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Console/groupEnd
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Console/info
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Console/log
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Console/time
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Console/timeEnd
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Console/warn
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Console/error
