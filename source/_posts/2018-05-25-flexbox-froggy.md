---
title: Flexbox 的青蛙練習網站
categories: 程式技術筆記
tags:
  - CSS
toc: false
date: 2018-05-25 19:28:09
---

![demo](https://lh3.googleusercontent.com/47RyxSBXqZEWfRd1xMKpbDdo5IUtlNDHDT7e7lhbUE7k8x56v2TeqQ4dJHy_nHyINPvdcHf6jZ19sY72VNCG9nM-1awWG8q4oE6aPno5JabzD31ccvlh_u5U9SgOrKLsxDGw9Yl1kBt_eVxMgUR_eendKOR5PNPbxKEfY99gerxdoHQ5xlKfF2viBUA43p1LyPHipPy4ob8kXuXxAYGoUAzcczESccEbeuSm5qyB5IKZcPPWvcIRryba9KKo7KUqP3TKgSSIA3mA96OGi4I-bCIxEHRZgEYkOrcEBe6CaoYZERBnpY4eKcn_m3hrgMPvGBbNrFBwHTOyGJLUfjHWGccMUtiaFo8BZvMKAcAyWNoY9T8xTqtSyod1wMYkdp7FSxHqxQC3PN6PmHlO62RfJl6W055BNMy4dcj0QLV_lBsaEeREDI3ebQkUgQHbQvM74cG9i5aF5pCtW6WFg2T7W1a7q3wL-eDS2NGsiceayx5Zz0Lk91is6TDz8ipLQShIYWxaRnKTWmTE3HeH6n8d-D3WISLfW8uguFCvC3_xdJkp7kLTqdAWeRbsdjHawRsvyA8bmJZZORQlLV8imblFL4hkxCSInHtsKfuYYh4w8egvAR9-k_vHd3Bs_zb5_c9Y6AmHI82AF7bpvWdcHqREsGbcs_MBFDkF=w552-h263-no)
偶然看到這練習網站 [**Flexbox Froggy - A game for learning CSS flexbox**][1] 實在太有趣了，很快速地就可以完成所有題目，以下將題目解答附上。<!-- more -->

# 24 題目解答

## Level 1

第一題是送分題，簡單介紹怎麼撰寫

``` css
#pond {
  display: flex;
  justify-content: flex-end
}
```

## Level 2

``` css
#pond {
  display: flex;
  justify-content:center
}
```

## Level 3

``` css
#pond {
  display: flex;
  justify-content: space-around
}
```

## Level 4

``` css
#pond {
  display: flex;
  justify-content:space-between
}
```

## Level 5

``` css
#pond {
  display: flex;
  align-items:flex-end
}
```

## Level 6

``` css
#pond {
  display: flex;
  align-items:center;
  justify-content:center;
}
```

## Level 7

``` css
#pond {
  display: flex;
  align-items:flex-end;
  justify-content:space-around;
}
```

## Level 8

``` css
#pond {
  display: flex;
  flex-direction:row-reverse
}
```

## Level 9

``` css
#pond {
  display: flex;
  flex-direction:column;
}
```

## Level 10

``` css
#pond {
  display: flex;
  flex-direction:row-reverse;
  justify-content:flex-end;
}
```

## Level 11

``` css
#pond {
  display: flex;
  flex-direction:column;
  justify-content:flex-end;
}
```

## Level 12

``` css
#pond {
  display: flex;
  flex-direction:column-reverse;
  justify-content:space-between;
}
```

## Level 13

``` css
#pond {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: flex-end;
}
```

## Level 14

``` css
#pond {
  display: flex;
}

.yellow {
order: 1
}
```

## Level 15

``` css
#pond {
  display: flex;
}

.red {
order: -1
}
```

## Level 16

``` css
#pond {
  display: flex;
  align-items: flex-start;
}

.yellow {
align-self:flex-end
}
```

## Level 17

``` css
#pond {
  display: flex;
  align-items: flex-start;
}

.yellow {
align-self: flex-end;
order: 1
}
```

## Level 18

``` css
#pond {
  display: flex;
  flex-wrap: wrap;
}
```

## Level 19

``` css
#pond {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
```

## Level 20

``` css
#pond {
  display: flex;
  flex-flow: column wrap
}
```

## Level 21

``` css
#pond {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
```

## Level 22

``` css
#pond {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
}
```

## Level 23

``` css
#pond {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column-reverse;
  align-content: center;
}
```

## Level 24

``` css
#pond {
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap-reverse;
  align-content: space-between;
  justify-content: center;
}
```

# 重點屬性

- justify-content
  - flex-start: 元素和容器的左端對齊。
  - flex-end: 元素和容器的右端對齊。
  - center: 元素在容器裏居中。
  - space-between: 元素之間保持相等的距離。
  - space-around: 元素周圍保持相等的距離。
- align-items
  - flex-start: 元素與容器的頂部對齊。
  - flex-end: 元素與容器的底部對齊。
  - center: 元素縱向居中。
  - baseline: 元素在容器的基線位置顯示。
  - stretch: 元素被拉伸以填滿整個容器。
- flex-direction
  - row: 元素擺放的方向和文字方向一致。
  - row-reverse: 元素擺放的方向和文字的方向相反。
  - column: 元素從上放到下。
  - column-reverse: 元素從下放到上。
- order
- align-self
  - flex-start
  - flex-end
  - center
  - baseline
  - stretch
- flex-wrap
  - nowrap: 所有的元素都在一行。
  - wrap: 元素自動換成多行。
  - wrap-reverse: 元素自動換成逆序的多行。
- flex-flow
- align-content
  - flex-start: 多行都集中在頂部。
  - flex-end: 多行都集中在底部。
  - center: 多行居中。
  - space-between: 行與行之間保持相等距離。
  - space-around: 每行的周圍保持相等距離。
  - stretch: 每一行都被拉伸以填滿容器。

# 參考資料

- [Flexbox Froggy - A game for learning CSS flexbox][1]

[1]: https://flexboxfroggy.com/