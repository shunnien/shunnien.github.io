---
title: PHP 安裝 MSSQL Driver
categories: 程式技術筆記
tags:
  - PHP
toc: false
date: 2018-08-10 01:49:07
---

# 安裝 **php_sqlsrv** 與 **php_pdo_sqlsrv**

使用 **PHP** 連接 MSSQL 進行 database migrate 時，發現出現以下訊息

![command line error message](https://lh3.googleusercontent.com/rUs6dN2BgmXZxn1Fkdf9y9wPlrEkUPai6UC50O_UktnCjzB_6es_Yq_s0YZn1ZcHcsFR53f0DTsgl2X63xVtreav4FFH5coZfiuFYz2TSOUwiRWJZraAA8x4yxnIY4tKKTcrEK-QcOvTuN3OfCgsqgtIscCfd8bBTZl-y4rxQmTeH1qDzZwdIxoaExCloWkYU_oS7RWO58njlu74_2Cjw4R4aVxFiUsyyKtjZEjnNxJc9dTHDDmnYbMeGVSMO6X4_fcU_8-jZytlH9WZrNOof4pw95L1dBpgTJMKMe5GRnXjrkAEU7SGAFX0CEAfyG1a7smaIiAV6WE1CQedbRUfhj8ZYX9MA_SfRTzWFBR5VoFM5yhOWtjUGLxqJpQi0tTAMvj3poH2fJxRJIUVaFXyHQQrYR-ehST5mgjBkrKRfgGlcr2xTsmCO28y1ttUQeut3aFFSjQwqGHOhlNjNxoHVKXWDPvAP9kWJKJiAU6Zh_2jvnOlT_kpVlSJrxmK3wA_U4bUdzXjjNUgeFdk6gcy4jKj-W0TtLJJq7OaZ4EB010E8seYcASu2zpg4oNLjTGH_YeVcFd0UP8fL8jr57W10AOJvzY-e6uy1N-JyyHpXAuqcmunYjamdkxgiHQG6Ztv80vwM43iZMpaawX6BBx8dH0sPm_AhP1J=w494-h340-no)
<!-- more -->

瀏覽頁面也出現以下錯誤

![page error message](https://lh3.googleusercontent.com/_wQX8-85GNXb53XFySs3IJX6Y324GZiR8JjNLFC0Bf_GknTa6emaIpbyS-YkKc5pK7Pf7JRrEdFivRagRD5AUnROiyiJIctAEUorOP7d0Cx5XEb5LG7zE9Vm2lz42G2kUmAEAquFwXsW8FOtvUf0AiFwK9PlpQoX88xk0YOTRcL1vaTcZbtAVf9rEPARz3KP1dvCFGFkhY-Q_D0ihYDHcEppYWqk-qZ8Avfx9EeW74Y9lssnoz6CxIaiBSPjN9yjxf5538uwAsRMvut3Sefizhu7LQJ17JMf4uixQ-igNL_7pGu14zxBuSUI9_fzrZ9x8mKa59-noH4KvAx3W1jv08c3AfRGwTQCKaUSv_a5hwCCUZYRRjE4rSLfNiypmP2caaQhyWvor5KAOdtQP_cTeBM6gMwN69eyHIwkczWxbfTL1frBoUy6-iV9xun8WVMw4kPZEZheo661MeD3-wuBPdqgHl6mE1WKSDHU79ix6lD9WC3p-SSeMs2CKnjQM0oiOUjlYmqk-dx0WlFUZ5uBV4LyLSNIB_9Zh51hU2xIB3nuRlEH6dklyK7medbK1CyDaaD05dHIAD1Ysi1QVzdYwRcKwG2mddr5YPeY9NLqsVXG4RVumfnByDTin1kAoEwJKiVMREiCdCODwifyYq_f8y8rZPgYB76_=w1109-h188-no)

此訊息已經說明找不到對應連接的程式，所以需要安裝 MSSQL 的對應套件。安裝流程在 [**stackoverflow**][2] 有人說明了，以下針對此次的流程進行說明

## 發生情形的環境

``` txt
資料庫-->docker for window / mssql-server-linux
PHP 開發環境-->XAMPP
PHP Version 5.6.36
```

## 安裝方法

首先檢核目前的 **PHP** 版本，找尋對應的 **dll** 元件版本，其詳細對應可以參考 [**microsoft**][3] ，我的 **PHP** 版本是 **5.6.36** 所以需要安裝的是 **3.2**

![sql server driver Version and php](https://lh3.googleusercontent.com/T66cbUAR_dZA0gBKUA3EynI2BG7gHo7cKt5K6ZDvQW8L69Chqgm7rvV-igXK3QxvnhxatSAd6rXSlJUsy_yMkJQo29jEqbqSM3mI0Ugef98EFqPnv91NA4Aj7iPDgoADWSdrZFhwPnePMuB1q9mTQ1AvBhCGlfvnWxwMBYUwAtgnqyV3dieYOEzyKnkpOs13x48rCYVDRPVDs_oFcbECG8FFgxyYoNHAc3IdpH0lRNdeKtUnE3fF57dlGZcg3QGsXCZ9CjWNMUAdDOQfASPUl8uzlNww_8-8lPCYWaGYZEg5pInp_RlHd7ydMCYimL8Jb8BGqUcxKUlSRmxSuhxUhzswVEU1pzOC3neoq4tcP0-8YclLmC4jN_koYLCvuLyfZVwzg3SgdtKqoHFC7BYEg7xw667KGfT6RBAhD9KQ8J3dhPvqGbkkkZWeAUhgabY5hrHJ2bV0Qil-m1bT3M_S9ge616e1xVBJ8scCoboW1ZkxwlogXH64PW1W_Q85ji1MLxSucMDqGS1B31RL2UTuloIIaq8J1reCBJkn1boEd8jfw1Bf53fajOr-FJRHDcRTrYS9DicV213pUIP7Rt2M7pQC7Q2sDlo_7sNoWH5p44AFHvnvg0nGlKWPpuluwYMGVUxscdkaPRGdgSFCMu5Be5tVpKIoBdqR=w1031-h601-no)

- **PHP 7.x** 版本，可以到 [Github msphpsql](https://github.com/Microsoft/msphpsql/releases) 下載
- **PHP 5.x** 版本，參考 [**microsoft**][3] 對照表內的[下載連結](https://docs.microsoft.com/en-us/sql/connect/php/download-drivers-php-sql-server?view=sql-server-2017)

下載完成後，將對應的 **php_sqlsrv.dll** 檔案放至 `C:\xampp\php\ext` (因為我是使用 **XAMPP**)，之後進行 **php.ini** 檔案的設定

以我的環境而言，就是在檔案內容最後添加，此檔案設定完後， **Apache** 需要 Stop 再重新啟動，這樣設定才會重新讀取

``` ini
extension=php_sqlsrv_56_ts.dll
extension=php_pdo_sqlsrv_56_ts.dll
```

此部分的設定還可以參考 [**microsoft docs Loading the Microsoft Drivers for PHP for SQL Server**](https://docs.microsoft.com/en-us/sql/connect/php/loading-the-php-sql-driver?view=sql-server-2017)

設定完成指令就可順利執行

![command line success](https://lh3.googleusercontent.com/CCNnZIJg31VRAAr6rMSkEgSP52noMUe3Mq_0ZhaYHeXFs8MUlMtLdNY7VUW74-ROJyV1ySHUO6ObvbMhOq7TPsQgOAHlJFPXDqeuGqa6ZUBWBYbhQ87vmDSDyWfllubyF5lh5C_RWrSBh9vYxwifOsx54otsPrYjaI6sAA2sT5MuAQnW0cA5X3b47L4ge4lHHmi46lySq5OAC7izeGFsOn3PYHYPN-XQtLs290CK9J5b3NW65tysP0kBsMIygB-np9qU482YDhLKD1j5C4JIfeOVq121vx6S-S45Vtg9C0VHvoW0rnvdCw8x-mAB1ZZj7s_oIZgXFOh20R_2eAmZ516QeFJShi7P-hTTDuwXUPtvz7EyJWtSKvqdY8NrQPW693JE-1BUhX6YfKbvqy0KzKVQc6ARNhCT2ARghPN10IkcnvUG3fdo-vB8fXndE4f_m-mi571se1vym4EqW4xcvaBrxDP2kGp_T_Pmr3ixGKaj1muFd8VUYbwpcoeDsWiKUafr1WmsP37McdaxXFaa3uo2hOYtH7NSiLmgZ6Lz-e-76u-dC5XV2wgQ9vpezoSeGDMIjG3qK5mjChk9xzSNCe5uMm9iiC-Hy7j41FFZJtGr2Vl8BEVB0VtkU9s3M_dICgylIViAnBtZbEYGq5DXBe0QiXn0YBpv=w715-h412-no)

![sqlsrv database](https://lh3.googleusercontent.com/RLSYNkf_9JOZcmk7lJet-igoRl0E-Sfs4qFGxkCZFgdzaMMkKcLrRd8gl_8vEF_VJi9g0AyFx3MZsSzVJkkQz1jSobkpsMdw5CQowDy8PLa-HW0dLK_8ut79chYVTzDRkV-FoeYwBcR77b0M_1eDJwwGC61kGhr2gs4UG5-dKtCba1u70dWSI-ISc-WeyrW1fWuRSHLtwwBHiAsMPxzco9QLSm4tYlCFYN2jqk_4XxBlcJYsVpN4-apYU25yVbL6Hac2X_Lb6RlNt1-X_IsjsKCYZryuuipTsHjHD6T1TwsGz1v2-PRxX1UmlTzU1Mgu213uBySYJoX5AQOHDAAmXbHSGMnNLhb2RW3Zr2tr0QXmf3KeS5iZutDVKBVysi46-3ik7YLdFSnBfmy9jmb2woTGjJds7s6BPrqVfZxXojwCewJBCpX61Y2StUCm4WQO9mcbYjTA73NeQAZ9TfojZlj2HeTFPUvsSwZ7wSjgS_XIwd4P0GYsBsqdTBTU-Cgl3lhHgzDMdF4i4tZm5QqEE7RFv5v5YFc8Nf2NJwuU7YXP5Uio8m254gmjMCoYdmnU6A9bmQ6gpbBQ9xH0mUUYB-DxsdtLmzwelsmuG4haJyfsiRTHeq_dSmU2iIigpgcs6sTeTUkMgZ_fBrGvJHpfUXp8ILym_JQr=w354-h385-no)

## 參考資料

- [stackoverflow][2]
- [microsoft docs system-requirements-for-the-php-sql-driver][3]
- 找到的中文 step by step 教學 [UCAMC][1]

[1]: http://www.ucamc.com/e-learning/computer-skills/146-php-sqlsrv.html
[2]: https://stackoverflow.com/questions/37245795/sqlsrv-could-not-find-driver-laravel-on-azure
[3]: https://docs.microsoft.com/en-us/sql/connect/php/system-requirements-for-the-php-sql-driver?view=sql-server-2017