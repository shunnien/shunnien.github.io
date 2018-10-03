---
title: javascript test
categories: 程式技術筆記
tags: []
description: javascript test
toc: false
---

通常使用 # 表示 function

## only skip

skip 也可以在語法前加上 x

``` js
it('大於 500 會打 8 折', () => {
    // Arrange
    var price = 1000;
    var expected = 800;
    var actual = 0;
    var shoppingCart = new ShoppingCart();

    // Act
    actual = shoppingCart.Calculate(price);

    // Assert
    actual.should.equal(expected);
});
```

單元測試中盡量連 Ajax 都隔離開，整合測試中才會去進行直接的 Ajax 連接；單元測試中可能使用 Stub 處理.

## homework

shopping cart
第一個 case 紅燈
之後綠燈
9/20 18:00

## KeyWord

SOLID
FIRST
MOCHA
CHAI
Unit Test
sinon
Stub
Mock
Spy

## Homework Review

## Selenium

Appnium

## 參考資料

- [Ref1][1]

[1]: https://shunnien.github.io