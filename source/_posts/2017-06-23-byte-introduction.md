---
layout: darft
title: 電腦中的 byte bit 等換算
tags:
  - notes
  - other
categories: 程式技術筆記
toc: false
date: 2017-06-23 22:05:08
---

最近弄同事的一個權限資料，是使用 byte 來計算的，當下看到一些 int 與各個單位換算，想說乾脆筆記記錄下來。<!-- more -->

最小單位是 Bit (位元)，然後按照 Wiki 資料上的列出
- 1 Byte = 8 Bits

|名稱|符號|2進位|16進位|10進位|
|:---:|:---:|:--- | ---:|:--- |
|Kilobyte|KB|2^10|0x400|= 1,024 Bytes|
|Megabyte|MB|2^20|0x10 0000|= 1024 KB |
|Gigabyte|GB|2^30|0x4000 0000|= 1024 MB|
|Terabyte|TB|2^40|0x100 0000 0000|= 1024 GB|
|Petabyte|PB|2^50|0x4 0000 0000 0000|= 1024 TB|
|Exabyte|EB|2^60|0x1000 0000 0000 0000|= 1024 PB|
|Zettabyte|ZB|2^70|0x40 0000 0000 0000 0000|= 1024 EB|
|Yottabyte|YB|2^80|0x1 0000 0000 0000 0000 0000|= 1024 ZB|

## 參考資料
- [Wiki Binary prefix][1]
- [Wiki Metric prefix][1]
- [Byte][1]
- [Binary prefix][1]


[1]: https://en.wikipedia.org/wiki/Binary_prefix
[2]: https://en.wikipedia.org/wiki/Metric_prefix
[3]: https://en.wikipedia.org/wiki/Byte
[4]: https://en.wikipedia.org/wiki/Binary_prefix