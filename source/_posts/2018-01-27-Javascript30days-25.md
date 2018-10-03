title: 'JS30紀錄 25-Event Capture, Propagation, Bubbling and Once'
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-01-27 16:42:26
---


事件捕捉，冒泡事件的觀察與選擇參數的運用，**先捕獲，再冒泡**觀察，搭配 **Console** 觀看
![target](https://lh3.googleusercontent.com/Cqwp78p9DY1tmgQ7Sxnt_nouPp_MIlUAeSn9UsGW6MlbRheJ8q6lXSV2ljUn9_ub7mZuhMxlXv8kxkD-oZ44uHoQ6gtmF8WzsLWSoOsiEPYZ4eFzFqQLn45IOTOzmPjMDNXRtmUguyugpfPe0WTvcdh1J9H8nD-SDOh4DHZSWU-d0xPZvbTwOPYGq37htugTSiEPNwhNTME6b8Cq4jxQTP2d9pkN08XYD2FeJbrD7SPj0cViL_f0WbM0v6CZ7B9bHjApLZOiXKLCVf0XT8fC7LjErGb1sb4dwjECshoJU3PSQPoaSSCkAzGQIbIrcok3RTzTYFTCRtJlYlRm_DuOC7Mp_dwNXbR-ifW9iMrBnOje9ZGHWdeZTy-TBJmEGdwCT8psV7MZR19Oct2PHPwjd_3xHAJxeN2MHkDExL9Uzt14gS_THukIKRIicYI58ZkDCJOVxdlHjWvaofIuM6irxc85tj9T2DnYe6z9Erfv0eeC98WM1INLAxSa9m000gGrKTQ9sYLMIB1OQNNSYiq4u4u70x8irOboaj2u4TMVcBLEzTz6Uvj7qFkjYQavp4lxRdtiQvG-Je_Aajoio-XR3BaZKUqI3AKtDZY_c3FrZD19moHa4vkSI-coO8WZr1Nlz3gskog5lxqfyXRwm4avQ1IETdUqsvZL=w878-h828-no)
<!-- more -->
> [Demo](https://shunnien.github.io/JavaScript30day/day_25/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

首先觀察冒泡事件的觸發順序，變更為捕獲，觀察傳遞順序，最後使用 **once** 來觀察

## 步驟 1.

建立三組 Div ，以及 click 觸發，觀察觸發順序

``` js
const divs = document.querySelectorAll("div");

/**
 * 顯示目前觸發的 DOM 
 * 
 * @param {any} e 
 */
function logText(e) {
  console.log(this.classList.value);
}

divs.forEach(div => div.addEventListener("click", logText));
```

其結果會是 **three > two > one**

## 步驟 2.

變更為捕獲

``` js
const divs = document.querySelectorAll("div");

/**
 * 顯示目前觸發的 DOM 
 * 
 * @param {any} e 
 */
function logText(e) {
  console.log(this.classList.value);
}

// 變更為捕獲
divs.forEach(div => div.addEventListener("click", logText,{
    capture: true
}));
```

觸發順序變成 **one > two > three**

## 步驟 3.

其後增加使用 **once** 參數，此參數將使觸發進行一次

# 筆記與備註事項

## JavaScript 部分

### [EventTarget.addEventListener()][1]

{% note info %}
EventTarget.addEventListener() 方法能將指定的事件監聽器註冊到 EventTarget 實作物件上。EventTarget 可能是 Document 中的 Element 物件、Document 物件本身、Window 物件，或是其它支援事件的物件（如：XMLHttpRequest）。
**資料來源** - [*MDN*](https://developer.mozilla.org/zh-TW/docs/Web/API/EventTarget/addEventListener)
{% endnote %}

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)
- [DOM 的事件傳遞機制：捕獲與冒泡][2]

[1]: https://developer.mozilla.org/zh-TW/docs/Web/API/EventTarget/addEventListener
[2]: https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/