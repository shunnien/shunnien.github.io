title: CSS Specificity 權重說明
categories: [程式技術筆記]
tags:
  - CSS
  - notes
description: CSS Specificity 說明
toc: false
date: 2017-05-31 10:21:25
---

## Introduction
這陣子剛好都在弄 CSS ，CSS Specificity 以前沒念熟，這次記錄下來順便複習一下。

## Conetent
CSS 選擇器中，基本上大家都知道後載入的樣式，會優先執行，以及愈針對性的選擇器查詢會更優先，也就是說使用 element Id 搜尋的會比 class 搜尋的優先度高；表現在 Html 中，則是權重愈高的樣式才會執行，權重低的樣式被權重高的樣式覆蓋。

以下這是 **[W3C CSS Specificity][1]** 的範例說明，以及 **a-b-c** 權重說明
> count the number of ID selectors in the selector (= a)
> count the number of class selectors, attributes selectors, and pseudo-classes in the selector (= b)
> count the number of type selectors and pseudo-elements in the selector (= c)
> ignore the universal selector
> 
> ``` css
> *               /* a=0 b=0 c=0 -> specificity =   0 */
> LI              /* a=0 b=0 c=1 -> specificity =   1 */
> UL LI           /* a=0 b=0 c=2 -> specificity =   2 */
> UL OL+LI        /* a=0 b=0 c=3 -> specificity =   3 */
> H1 + *[REL=up]  /* a=0 b=1 c=1 -> specificity =  11 */
> UL OL LI.red    /* a=0 b=1 c=3 -> specificity =  13 */
> LI.red.level    /* a=0 b=2 c=1 -> specificity =  21 */
> #x34y           /* a=1 b=0 c=0 -> specificity = 100 */
> #s12:not(FOO)   /* a=1 b=0 c=1 -> specificity = 101 */
> ```


這範例只有列出 a-b-c 的權重值，想看更詳細的說明，需要看 Note 裡面的 **[CSS 2.1][7]** 文件，裡面就有說明 **a-b-c-d** 套用規則，以下截取至官方文件

> 6.4.3 Calculating a selector's specificity
> 
> A selector's specificity is calculated as follows:
> 
count 1 if the declaration is from is a 'style' attribute rather than a rule with a selector, 0 otherwise (= a) (In HTML, values of an element's "style" attribute are style sheet rules. These >r ules have no selectors, so a=1, b=0, c=0, and d=0.)
> count the number of ID attributes in the selector (= b)
> count the number of other attributes and pseudo-classes in the selector (= c)
> count the number of element names and pseudo-elements in the selector (= d)
> 
> ``` css
> *             {}  /* a=0 b=0 c=0 d=0 -> specificity = 0,0,0,0 */
> li            {}  /* a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 */
> li:first-line {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
> ul li         {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
> ul ol+li      {}  /* a=0 b=0 c=0 d=3 -> specificity = 0,0,0,3 */
> h1 + *[rel=up]{}  /* a=0 b=0 c=1 d=1 -> specificity = 0,0,1,1 */
> ul ol li.red  {}  /* a=0 b=0 c=1 d=3 -> specificity = 0,0,1,3 */
> li.red.level  {}  /* a=0 b=0 c=2 d=1 -> specificity = 0,0,2,1 */
> #x34y         {}  /* a=0 b=1 c=0 d=0 -> specificity = 0,1,0,0 */
> style=""          /* a=1 b=0 c=0 d=0 -> specificity = 1,0,0,0 */
> ```

由官方文件可以看得出，選擇器元素愈多權重愈高，使用 Id 的權重最高

{% jsfiddle 49sLxy87 result,css,html dark %}

## Reference
- [W3C CSS specificity][1]
- [W3C CSS Selector Specificity][4]
- [MDN CSS Specificity][2]
- [MUKI space][3]
- [CSS 權重計算機][6]

[1]: https://www.w3.org/TR/selectors/#specificity
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity
[3]: http://muki.tw/tech/css-specificity-document/
[4]: https://www.w3schools.com/cssref/css_selectors.asp
[5]: https://www.w3schools.com/cssref/trysel.asp "W3C Selector Specifity Try"
[6]: https://specificity.keegan.st/
[7]: https://www.w3.org/TR/CSS2/cascade.html#specificity