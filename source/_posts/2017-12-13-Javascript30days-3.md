---
layout: darft
title: JS30紀錄 03-Scoped CSS Variables and JS
tags:
  - JavaScript30
  - JavaScript
categories: 程式技術筆記
toc: false
date: 2017-12-13 21:08:42
---


![target](https://lh3.googleusercontent.com/jxHHEaAtxIZb9QBtiY0CGHV-g_3FZMWDRtlwedsTxytSd5iGZ82XlNBqMsEIfAEiU-pjhniXf3FT5UzMteR18H8rRrFMhIsmw7zxrCSUr1nqdfmNFIz_ZM8VhMVvnS9rt2z482-hE86IHnxFkOncuPM9KeJhspfNXPtLCbzPc2ZaBfp0YzT-3ksbDm1KJrk3HiYtwQeDWvEQ_-6fX6JESghXNhlKbtWr5oHBfu_wHmwKk_fT94YLaXsnpLJnobEbr1bya1xWbsZT6FOqLS5LD1REZpIzs83BqsPaLtt_E3e5WdqVDAYK4SwB-2grIVatTM1ZHGQWo68BHp2tyrr_9CU_VuhWIgBYqB_SOSpEJbJcIbqy8DWzILRg4ESQpWQ9vRqEAqOp48muN1ErzXbbreGPa07x_qLAgCW3vuXnvG8mqns-a2lnvcOvi5r5d_fr3cIuIerbo3qD8I_GKC2rbN2_PGX-Jf7o_4hoswLhC-4lpSXBDZkNemsZShGkrPz5JKXdE69JHlvTjQj9pm76TaIyaZYR3lRcBLhKmZJnA42752eotLSyDG62dp1x30EWGlzHpSX6zis7agmcAs0aiQj2UaX1mjpSfMm4j8QzKjyiZrNjAAfmIEcdPedyRhSBkYmgweAgavU0PL76zO5LGMnPTPEmqHwWpXs=w600-h406-no)

# 目標

利用 CSS 變數製作濾鏡。
<!--more-->
> [Demo](https://shunnien.github.io/JavaScript30day/day_03/) | [Github](https://github.com/shunnien/JavaScript30day)

# 處理步驟

## 步驟 1. 綁定 input 變更事件

- 取得所有 input
- 建立設定樣式 function handleUpdate
- 透過 arrow function 綁定 change 事件

## 步驟 2. 設定 css

- 設定 css 變數
- 設定圖片參照 css 變數


# 筆記與備註事項

主要重點在於 css 變數的運用。

## JavaScript 部分

### [箭頭函數 (Arrow Function)][1]

{% blockquote 資料來源 https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions MDN %}
箭頭函數表示式 (Arrow function expression，也是所謂的 fat arrow function) 比起一般的函數表示式擁有更短的語法以及詞彙上綁定 this 變數，所有的箭頭函數都是無名函數 (anonymous function).
{% endblockquote %}

``` javaScript
(param1, param2, …, paramN) => { statements } 
(param1, param2, …, paramN) => expression
     // 等於 :  => { return expression; } 

// 只有一個參數時,括號才能不加:
(singleParam) => { statements }
singleParam => { statements }

//若無參數,就一定要加括號:
() => { statements }
```

### [HTMLElement.dataset][5]

{% blockquote 資料來源 https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset MDN  %}
HTMLElement.dataset屬性允許無論是在讀取模式和寫入模式下訪問在HTML或DOM中的元素上設置的所有自定義數據屬性 ( data-* )集。
自定義的data屬性名稱轉化成  DOMStringMap 的鍵值時會遵循下面的規則：
- 前綴   data- 被去除(包括減號)；
- 對於每個在ASCII小寫字母的減號( )，減號會被去除，並且字母會轉變成對應的大寫字母。 a到 z前面U+002D
- 其他字符（包含其他減號）都不發生變化
{% endblockquote %}

### [CSSStyleDeclaration.setProperty()][8]

{% blockquote 資料來源 https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration/setProperty MDN  %}

{% endblockquote %}

### [Template literals][9]

{% blockquote 資料來源 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings MDN  %}
模板字面量/Template literals 是允許嵌入表達式的字符串字面量。你可以使用多行字符串和字符串插值功能。它們在ES2015規範的先前版本中被稱為“模板字符串/template strings”。
{% endblockquote %}

``` javaScript
`string text`

`string text line 1
 string text line 2`

`string text ${expression} string text`

tag `string text ${expression} string text`
```

## CSS 部分

### [:root][2]

- 宣告全域變數時，很好用。
- 表示 html 的屬性

{% blockquote 資料來源 https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root MDN %}
:root這個CSS 偽類匹配文檔樹的根元素。對於HTML來說，:root表示`<html>`元素，除了優先級更高之外，與html選擇器相同
{% endblockquote %}

``` css
:root {
  --main-color: hotpink;
  --pane-padding: 5px 42px;
}
```

### [CSS variables][3]

{% blockquote 資料來源 https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables MDN  %}
CSS變量是由CSS作者定義的實體，其中包含要在整個文檔中重複使用的特定值。使用自定義屬性來設置變量名，並使用特定的var()來訪問。（比如color:  var(--main-color) ;）。
{% endblockquote %}

``` css
/* 宣告區域變數 */
element {
  --main-bg-color: brown;
}
/* 使用區域變數 */
element {
  background-color: var(--main-bg-color);
}
/* 宣告全域變數 */
root {
  --global-color: #666;
  --pane-padding: 5px 42px;
}
/* 使用全域變數 */
.demo{
   color: var(--global-color);
}
```

### [var()][7]

{% blockquote 資料來源 https://developer.mozilla.org/zh-CN/docs/Web/CSS/var MDN  %}
ar() 函數可以代替元素中任何屬性中的值的任何部分。var()方法不能作為屬性名、選擇器或者其他除了屬性值之外的值。（這樣做通常會產生無效的語法或者一個沒有關聯到變量的值。）
{% endblockquote %}

``` css
:root {
  --main-bg-color: pink;
}

body {
  background-color: var(--main-bg-color);
}
```

### [Custome propertities (\-\-*)][4]

{% blockquote 資料來源 https://developer.mozilla.org/en-US/docs/Web/CSS/--* MDN  %}
帶有前綴--的屬性名，比如--example--name，表示的是帶有值的自定義屬性，其可以通過var 函數在全文檔範圍內復用的。
{% endblockquote %}

``` css
--somekeyword: left;
--somecolor: #0000ff;
--somecomplexvalue: 3px 6px rgb(20, 32, 54);
```

### [filter][6]

{% blockquote 資料來源 https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter MDN  %}
CSS濾鏡（filter）屬提供的圖形特效，像模糊，銳化或元素變色。過濾器通常被用於調整圖片，背景和邊界的渲染。

CSS標準裡包含了一些已實現預定義效果的函數。你也可以參考一個SVG 濾鏡，通過一個URL鏈接到SVG 濾鏡元素 ( [SVG filter element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter) )。
{% endblockquote %}

``` css
filter: url("filters.svg#filter-id");
filter: blur(5px);
filter: brightness(0.4);
filter: contrast(200%);
filter: drop-shadow(16px 16px 20px blue);
filter: grayscale(50%);
filter: hue-rotate(90deg);
filter: invert(75%);
filter: opacity(25%);
filter: saturate(30%);
filter: sepia(60%);

/* Apply multiple filters */
filter: contrast(175%) brightness(3%);

/* Global values */
filter: inherit;
filter: initial;
filter: unset;
```

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)

[1]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[2]: https://developer.mozilla.org/zh-TW/docs/Web/CSS/:root
[3]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables
[4]: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
[5]: https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset
[6]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter
[7]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/var
[8]: https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration/setProperty
[9]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings
