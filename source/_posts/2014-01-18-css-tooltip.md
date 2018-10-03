title: 使用 CSS 處理提示訊息框
categories: 程式技術筆記
tags:
  - CSS
toc: false
date: 2014-01-18 08:37:23
description:
---

一直都是使用 JavaScript 的方式來顯示提示訊息，雖然知道可以用 CSS 來控制，但是覺得很多地方
沒辦法完全配合需求，不過在製作大致的示範樣板，倒是還蠻好用的。<!-- more -->

其主要就是利用 **position**、**display** 與 **hover** 來達成想要的效果

``` css
.dvmain {
  position: relative;
  width: 65px;
  height: 25px;
}

.dvmain:hover .tooltip {
  display: inline-block;
}

.tooltip {
  display: none;
  position: absolute;
  bottom: 30px;
  left: 5px;
  width: 55px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  text-align: center;
  color: black;
  background: #f7f8f8;
  border: 1px solid #c9caca;
  border-radius: 0px;
  text-shadow: rgba(0, 0, 0, 0.09804) 1px 1px 1px;
  box-shadow: rgba(0, 0, 0, 0.09804) 1px 1px 2px 0px;
}
```

以下是在 JsFiddle 的範例
{% jsfiddle h997Lmha html,css,result dark %}