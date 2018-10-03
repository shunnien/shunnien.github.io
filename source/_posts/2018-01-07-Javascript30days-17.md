title: JS30紀錄 17-Sort Without Articles
categories: 程式技術筆記
tags:
  - JavaScript30
  - JavaScript
toc: false
date: 2018-01-07 16:27:52
---

# 目標

文章的排序，排除量詞等不必要的詞彙，再來排序，例如原本資料為

``` js
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];
```
要排除 a 、 an 、 the 這些詞彙後，排序列表
![target](https://lh3.googleusercontent.com/n5BgxA5Xi0Qwq4vqeQVqBDmp77Kp8uI4MCheJ28A7967CdIoCyYjZ0x-twklRNElvXKuUPVPe0FBc-YmR4x6Z249zXvpxeNTKzPkA8QYozfNFf4MkBAJN0mx-0d4wAk0RQIzcOrNX5I88D-Wm67HQ42l_3cD4vkRZQ5Pvln9FP6OVqOP1IAK5eOQ5vWZkj-f0zxtdLmteYsyc8xdHvlZwqXX_yaHrRWJeANQYHoWBvDXiVbhMyGdvKybPCHbIV_5fUdiCCMoYxH_iYWw4s7d3iv91UCKklz-OPI1BrhF3j3-qK56SYNfAhYeQxq1jqN9Ukrr9uKtqKBDAojMj-KMR9DMUs8TXj-2Si0xiLPH4ZHqo-VJJ26jClx6m4umB6eTaXJZPlOOsVhJ_5O6mHfMF-c4t-fG7_gLnKBwXO4zD5cAduClU7FmhPqd56pPKLsFZgIek0ulfy-u3kUy8kwOz2OFShj4LUuYTZachJPHysIpueAyacTbPozyXMkMvMX5i3NzH9fox9LhpuzxAHQ8zlq9M8zaKImCOcd22bC8-IKQfuS_opISpUAapT-pHQVsrwwYdwzLUhDOr88zqli8EA_bBo-hATBTYMw7gRuZg8Gip1i5tKDCqWp_AQZKeirREEmeRbgUTW9awbjClYloF_Tp5V2de6OT=w748-h864-no)
<!-- more -->
> [Demo](https://shunnien.github.io/JavaScript30day/day_17/) | [Github](https://github.com/shunnien/JavaScript30day)


# 處理步驟

## 步驟 1.

利用 **sort** 先行排序

## 步驟 2.

因為是文字排序所以自動採用 unicode 編碼排序，但是要排除  a 、 an 、 the 這些詞彙，所以建立 **strip** 方法來排除

## 步驟 3.

排序結果使用 **arrow function** ，並將結果呈現到 HTML 上

# 筆記與備註事項

此篇為應用 sort 的部分，應用的方法都是之前的主題學習過的內容，算是進階應用的部分。

# 參考資料
- [JavaScript 30 day](https://javascript30.com/)
- 作者 Github [Wes Bos](https://github.com/wesbos)
- [Js 30 day 中文指南](https://github.com/soyaine/JavaScript30)
- [瓜瓜的 JS 30](https://github.com/guahsu/JavaScript30)
- 我的 JS 30 [練習Github](https://github.com/shunnien/JavaScript30day)