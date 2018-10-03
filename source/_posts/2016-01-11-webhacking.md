title: Web駭客攻擊手法及防護實戰 Day 1
tags:
  - other
  - notes
categories:
  - [心得筆記]
description: Web駭客攻擊手法及防護實戰 Day 1 筆記
toc: false
date: 2016-01-11 16:55:16
---

## 本日議程
- 資安基本概念
- 各種標準解析
- 當資料變程式時
- 輸入確認及輸出確認
- 服務設定架構

## 2015 Mandiant 網路攻擊趨勢報告
- 2014前三大APT受駭產業
 - 金融服務(15%)
 - 媒體與娛樂(13%) 
 - 製造業(10%)

- 2015前三大APT受駭產業
 - 商業及專業服務(17%)
 - 零售(14%)
 - 金融服務(10%)

**進階持續性滲透攻擊**(**A**dvanced **P**ersistent **T**hreat, APT)，什麼是 **APT**？講師提了一個例子：
某高中女生某天回家路上，在離家不到百公尺的距離遇到一男子，那男子身穿大衣，雙手似在衣內進行手部運動(XD)，女高中生受到驚嚇趕緊回家，並告知家人這件事情，但是家人認為應該是突發性事件；
之後，這情形持續了一年，終於在某天，女高中生的男友送她回家，在門口前吻別，那跟蹤男子大受刺激，跑到高中女生前大喊：「妳怎麼可以這樣」之後急速跑離。原來，這跟蹤男子暗戀女高中生
這例子就是 APT >.<

## WEB Server 最難維持的是?
- 可用性(Availability)
 - 即時
 - 可信任
- 一致性(Integrity):
 - 避免未經授權的人做未經授權的變更。
 - 避免授權的人做未經授權的變更。
- 機密性(Confidentiality)
 - 避免有意或無意的
 機密資料不是敏感資料，例如前女友這是敏感資料

但是 Web Server 最難維持是**一致性**

## 雲端解決方案
- 雲端提供的是高可用性的解決方案。
- 雲端最大的罩門則是**機密性**!
- 隱私資料傳到雲端上失控時即開始散播!
例如：
Google free account 其實 google 擁有你所有檔案存取、散佈、再造的權力
又或者小紅傘免費版擁有提取分析病毒樣本的權利(例如中毒的是你的個人照片，被散佈到小紅傘)

## 角度與知識
黑箱、灰箱、白箱(黑帽、灰帽、白帽)
- 黑箱：沒有任何的資訊與權限
- 灰箱：部份的知識或授權
- 白箱：完全的充份授權
 白箱檢測就像原始碼檢測

## 典型的測試流程
- 主機弱點掃描:檢查主機 port 做什麼事
- 協定弱點掃描
- 組態設置測試
- 應用程式測試
- 資料權限測試

MAC(Mandatory Access Control)主動存取控制，例如:網路芳鄰
DAC(Discretionary Access Control)被動存取控制

## Hack如何扒糞?
- DNS
- WHOIS
- Google Hack
使用 Google Search
``` text
Robots.txt Disallow /admin filetype:txt
```
- Robots.txt
- 關鍵字
- Fingerprint

## Demo

### DNS
DNS 區域轉送測試指令碼
``` bash
nsloolup
server 8.8.8.8  
set type=ns
domain.com
server dns.domain.com
ls domain.com
```

### **telnet** 很好用 T_T
``` bash
telnet yourTarget

HEAD / HTTP/1.0
```
然後要按兩次 **ENTER**

### 改 PORT 只是騙自己
使用 [NMAP][4] 工具，列舉你的 port 
``` bash
Nmap –PN –sT –sV –p0-65535 x.x.x.x
```
改 port 不是就能一勞永逸，只要對方列舉 port ，就能知道開啟的 port 。

## 幾個流傳較廣的 hacking
- Facebook 
{% youtube HfJAtZcGXnk %}
- SQL Injection
{% youtube Fp47G4MQFvA %}

## 各種標準解析
- 系統測試遵循 
 [OSSTMM][6](Open Source Security Testing Methodology Manual)[v3][7]
 判別使用那些 OS 等等，例如:ssh 絕對不是 windows
- 網站應用程式測試遵循
 [OWASP][1](Open Web Application Security Project)[Testing Guide v4][9]
- 網路安全問題測試遵循
 SANS(SysAdmin, Audit, Networking, and Security)(Top 20 Internet Security Problems, Threats and Risks) (TOP 25 Most Dangerous Programming Errors)

![測試遵循示意](https://lh3.googleusercontent.com/j1O0teYjvFs3e0mG0lw5hqinZYcOW_Y4jJ7EUUFBHOhlLbwIDoUVY9xR8-G6bMUMQC_O5ytL_AdWs0pdY8vL6OPhWSKnF4Q1bZYSdeOCDZggIzJoMFpLnLD6RDFyvhBYthAZE-D1rZG9Hy4YcEgGmVPdvfX4xreYb3zMdt1J84FPjS6nDwZEYyxnV7NnqDTV2tdrZYm9gN-kip2fjOTx5e_62X-NnMyDEhzOqFw1o-RrP9zMo4lpEx-bJtkQ_fFjihzVEq2fq57Gsf7VahLTY6qSW4JxBKEkkmxzl31oFEiFXj0S2NCUqI76IaxbAqllg49qQUx-1SpwG1hkNcIai7bep7qj-hi1rh94c_f3Ne4xCI09Wpvc2hf4QbeFCootZxw9AFITR4uaIr0Qd-_YGtu7isXjvhOFkDR-dnGfXzcw7y-g0OJPNHmsigB8vAUfnG2YuElBASq7gtbCA_K2fa1a7OOB_KXtnWQ5gKcDRTrlxruc8IvHkaynD-kr_OQ_Q5oup59XHjasYb_oiFCA7jCQH-VNWyGlsL_m3IugHoNc_dnkNobr8q6vY1w5R1K_EUhH1-V1IhotJx2Y7ikSjyH1mxAqGRsjU1eEqXxnWyFbAzYaC4q7tjhARJEHrajWoU0l95xVecPss0-e9olZXMqLo0KfVpy7f_xJzn_8Ng=w810-h463-no)
三種測試遵循各有優缺點，所以最好是三種都測試過，最是完善。

主機弱點
- 服務版本(版本過舊問題很多)
- 協定的基礎
程式弱點
- 應用程式
- 組態設定

測試細項很多，可以參考 [Guideline][2] 文件

### Injection
資料庫建立使用者資料，通常第一筆資料是一個停用的 nobody，因為這是為了避免最高權限資料被輕易找到

## 程式和資料的糾結
主要特性是吃了才知道有毒，簡單說就是資料餵回 server ，進行檢測才知道有問題等等，而沒辦法信任丟回前的檢測，因為在 Client 的檢測很容易被使用者關閉。

## 輸入確認及輸出確認
- 帳號/密碼本身就是問題，要納入的驗證有哪些？運算符號、科學符號？
 最好方式是使用白名單
- 大部分人都只進行 input validation，但是 output validation 讀取資料庫時，應該很少人還會再過濾一次。

## 無害測試法
使用單引號進行測試，在網址後加上單引號，尤其是使用參數的網址

## 作業
[OWASP_Testing_Guide_v4][9] 的 Testing for SQL Injection

## 參考資料
- [OWASP Top Ten Project][1]
- [OWASP Taiwan][8]
- OWASP Top 10:[2013 English][3]
- OWASP Top 10:[2013 Chinese][2]
- OWASP [Testing Guide v4][9]
- OWASP [Testing Guide v4 中文][10]
- [NMAP][4]
- [SQL Injection Prevention Cheat Sheet][5]

[1]: https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project "OWASP Top Ten Project"
[2]: https://www.owasp.org/images/5/51/OWASP_Top_10_2013-Chinese-V1.2.pdf "OWASP Top 10 2013 Chinese"
[3]: http://owasptop10.googlecode.com/files/OWASP%20Top%2010%20-%202013.pdf "OWASP Top 10 2013 English"
[4]: https://nmap.org/download.html "NMAP"
[5]: https://www.owasp.org/index.php/SQL_Injection_Prevention_Cheat_Sheet "SQL Injection Prevention Cheat Sheet"
[6]: http://www.isecom.org/research/osstmm.html "OSTMM"
[7]: http://www.isecom.org/mirror/OSSTMM.3.pdf "OSTMM v3"
[8]: https://www.owasp.org/index.php/Taiwan "OWASP Taiwan"
[9]: https://www.owasp.org/images/5/52/OWASP_Testing_Guide_v4.pdf "OWASP Testing Guide v4"
[10]: https://www.gitbook.com/book/kennel209/owasp-testing-guide-v4/details "OWASP Testing Guide v4 En/zh"