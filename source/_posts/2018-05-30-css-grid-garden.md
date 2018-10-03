---
title: CSS Grid 的花園小遊戲教學網站
categories: 程式技術筆記
tags:
  - CSS
toc: false
date: 2018-05-30 18:39:49
---

![demo](https://lh3.googleusercontent.com/ic8kjV2hdVgL9oBUbN4cL4g1DprF0YKIDS1BtoNL3cWp-hTI3PUqqMHHmjtDwRHpmRmWbOlU32s932vlAMN1ZTw-RwuKOumET-mfUkaEUT0iAchrVqhf_S0CjgnK4mpGzBo4yE8jECt5kKHcMQWfQ4g8m8RfvYHXPs-JJ6CL35AuxIDDwLofPr5Lxm7ch5bF-mC2uyOvTCbUlRyodOkq3BqNHPB0xK4KB2XnGci-E0-9xGooQr7lkvzQFLim47PaBHo3g6ppdDFsEZfNWaS31nKLPWJErjae0sG50UlMHCxmU-8exg9iiCuQ9tzqyQLwPNAsXJkxErDRirE9Ltmd8AFgHH2DIPG_-50QSV004Bz8X0kp0cXDGtn4MA2n0OUSv89k4RJ1x8sC61AqjJxtIrAnGVmUTmGNfQuCcvPa57lay1X5RgFf_ihhN8V63QU-MZn_RkXqAKajJncXt6IVTPlSKQBzeqZdGjBkDVRBYme0sJIYuEnuNEmdf9CLoB6IpRYSmjie470yIIdKfOuC5_t7Xan9NHz8FB2Gcp7PGoUVI0iOtqe6BcnBosWBtcW_tHqKcF1xR1rcyZWlm1ySuqsRgjnv5UOBKJrH-9X_XvVlCTcWrr6TV9HlRYuTjOKGpE8TFl14Ofy84CW47ZLlczT-dPTqhbyy=w704-h350-no)
承襲上篇 [Flexbox 的青蛙練習網站][1]，上篇的 CSS 練習遊戲，除了 **Flexbox** 外，尚有 **CSS Grid** ，此篇就是 **CSS Grid** 小遊戲闖關過程。<!-- more -->

# 28 關

以下針對是我針對各關的解答

## 第 1 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-column-start: 3;
}
```

## 第 2 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#poison {
  grid-column-end:-1;
}
```

## 第 3 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-column-start: 1;
  grid-column-end:-3;
}
```

## 第 4 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-column-start: 5;
  grid-column-end: 2;
}
```

## 第 5 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-column-start: 1;
  grid-column-end: 5;
}
```

## 第 6 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#poison {
  grid-column-start:4;
}
```

## 第 7 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-column-start: 2;
  grid-column-end:4;
}
```

## 第 8 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-column-start: 1;
  grid-column-end: span 5;
}
```

## 第 9 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-column-start: span 3;
  grid-column-end: 6;
}
```

## 第 10 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-column: -3/-1;
}
```

## 第 11 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-column: 2 /span 3;
}
```

## 第 12 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-row-start: 3;
}
```

## 第 13 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-row: 3/span 3;
}
```

## 第 14 關

``` css
garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#poison {
  grid-column-start: 2;
  grid-row-start: 5;
}
```

## 第 15 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-column: 2/-1;
  grid-row: 1/-1;
}
```

## 第 16 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-area: 1/2/4/6;
}
```

## 第 17 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water-1 {
  grid-area: 1 / 4 / 6 / 5;
}

#water-2 {
  grid-area: 2/3/5/6;
}
```

## 第 18 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

.water {
  order: 0;
}

#poison {
  order: 1;
}
```

## 第 19 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

.water {
  order: 0;
}

.poison {
  order: -1;
}
```

## 第 20 關

``` css
#garden {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-column: 1;
  grid-row: 1;
}
```

## 第 21 關

``` css
#garden {
  display: grid;
  grid-template-columns: repeat(8,12.5%);
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-column: 1;
  grid-row: 1;
}
```

## 第 22 關

``` css
#garden {
  display: grid;
  grid-template-columns: 100px 3em 40%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}
```

## 第 23 關

``` css
#garden {
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 20% 20% 20% 20% 20%;
}
```

## 第 24 關

``` css
#garden {
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr 50px;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-area: 1 / 1 / 6 / 2;
}

#poison {
  grid-area: 1 / 5 / 6 / 6;
}
```

## 第 25 關

``` css
#garden {
  display: grid;
  grid-template-columns: 75px 3fr 2fr;
  grid-template-rows: 100%;
}
```

## 第 26 關

``` css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 50px 0 0 0 1fr;
}

#water {
  grid-column: 1 / 6;
  grid-row: 5 / 6;
}
```

## 第 27 關

``` css
#garden {
  display: grid;
  grid-template: 60% 1fr/ 200px 1fr;
}
#water {
  grid-column: 1;
  grid-row: 1;
}
```

## 第 28 關

``` css
#garden {
  display: grid;
  grid-template: 1fr 50px/20% 1fr;
}
```

# 參考資料

- [CSS Grid Garden][2]

[1]: https://shunnien.github.io/2018/05/25/flexbox-froggy/
[2]: https://cssgridgarden.com/