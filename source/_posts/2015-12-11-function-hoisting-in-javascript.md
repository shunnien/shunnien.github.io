title: JavaScript 函式的 Hoisting
date: 2015-12-11 17:16:09
categories: [程式技術筆記]
tags: [JavaScript]
description: 說明 JavaScript function 的 Hoisting 特性
---
## 前言
在看*JavaScript 設計模式*這本書的時候，覺得這邊整理得很好，想要筆記一下。
## 函式的 Hoisting
JavaScript 在函式(function)有兩個重要特色
1. 函式是個物件
2. 函式提供一個作用域

而 Hoisting 特色就是函式(function)跟變數一樣，也有 Hoisting 的特性，就是所有宣告的動作皆會提升至該作用域的頂端，而函式(function)比較需要注意的是，*函示宣告式*(如下所示)也是有這特性的
``` javascript 函示宣告式 
function foo() {}
```
另外比較需要注意的是，使用*表示式*的函式
``` javascript 表示式
var foo = function () {};
```
使用表示式其 Hoisting 的只有該變數，跟變數相同，函式(function)尚未定義，如以下範例
``` javascript 
(function (){
  // foo is function
  console.log('foo is ' + typeof foo);
  // bar is undefined
  console.log('bar is '+ typeof bar);
  
  foo();  // foo

  // Uncaught TypeError: bar is not a function(…)
  bar();
  
  function foo(){
    console.log('foo');
  }
  
  var bar = function(){
    console.log('bar');
  }
}());
```
## 參考資料
[JavaScript 設計模式](http://www.books.com.tw/products/0010538538)