title: "Eclipse 無法啟動，出現 java was started but returned exit code=13"
date: 2015-12-09 18:36:05
categories: [程式技術筆記]
tags: [Eclipse, Troubleshooting]
description: Eclipse 啟動不了，出現 java was started but returned exit code=13
---
## 前言
今天在增加一個系統功能的時候，需要去修改一個 Model 的 Java project...
## 問題
因為需要更改那個 Java project，所以直接開啟 eclipse，但是居然沒辦法啟動，發生如下圖的情形
![Question](https://lh3.googleusercontent.com/mwK3KMsxF7k6LZtTdkT3yaa8U7wznEGwP2urI0aeD2jinGaNTFKvB4K269lL9yS27C6taSKYg_EqK7Cfq4AyDudNaOJoySba_XrLuFen8A6ygWZi5Xr5mTIg57cZQ9ODS4gXICwlKJ9EUfZ8efgO1ZsaBNfO0o7TyGehAxejtQ1jb77w9MffhyeaIxtLYJHZKjQY4ovCXihpHiskIcwVc5CDhqIHeEjZ21K1PEb_CG1p5kOnvgXVDG-UeB9RcH73pnV2eqleJwu9SLHGWtB_dqNnwAmyie7ybLo6et0UJrvdLPAsyX93jYq9ynEr2gX7X9poLZPPHvCWcIf4EzL9xSOcV0trjMJfD5hZ64HVFtQjSCaDBRfnhh4yZedzW6zktgBupyClaV1_uyqDE_-2W7riF4UrzORqBy4VBHooMTvj2ukaT3zEn1qfFfj-D1b5RrUSrQwiX-WQ9Y6aU3XuIqF3y1rd03zc15Z4UaMyEbag0wX2CSsizwgjddkFb1iGDd80fMoFcCanP8sXbiyNQKyhLXOn7SyPMOPCpO-a1e5MQQSqkaF-6zeVx_Kz8MJsR4kRfCFN2kqzkA8C-5KMh2MBb7bMybstTZibaRiJFkKlSJs3NqnR4Wh2IhTS0bUNvrH2h9glLeMgDTV-FrIXNnmlL_PZVmwaw9yXIuNkyA=w690-h822-no)
求助了 Google 大神，找到有可能出現這情形的因素有
#### 問題原因
1. 最常見的原因是安裝 Eclipse 的版本或者 Java JDK 的版本不合
2. 在 eclipse.ini 文件配置錯誤
3. Eclipse 安裝目錄有特殊字元(例如：#、！、@）
4. 使用太新版本的 Eclipse 導致 JVM 不支援

## 解決方法
不過我的情形，只有可能是前兩種，所以按照步驟
1. 檢查一下 java version，可透過指令碼查詢
``` bash
$ java -version
java version "1.8.0_65"
Java(TM) SE Runtime Environment (build 1.8.0_65-b17)
Java HotSpot(TM) Client VM (build 25.65-b01, mixed mode)
```
2. JDK 版本都有對應(沒對應的就要下載對應的版本)，此步驟我就可以跳過
3. 修改 eclipse.ini 配置文件
使用記事本直接開啟文件，添加上一行
``` bash
-vm
C:/Program Files/你自己的路徑/bin/javaw.exe
```
順利解決。
## 參考資料
- [eclipse wiki](http://wiki.eclipse.org/Eclipse.ini#Specifying_the_JVM)
- [A Shout:Fix Java was Started but Returned Exit Code=13 in Eclipse](http://www.ashout.com/fix-java-started-returned-exit-code13-eclipse/)