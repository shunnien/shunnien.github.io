title: Web駭客攻擊手法及防護實戰 Day 2
categories: [心得筆記]
tags:
  - other
  - notes
description: Web駭客攻擊手法及防護實戰 Day 2 筆記
toc: false
date: 2016-01-27 18:56:23
---

## 本日議程
- 資料端安全
- 資料庫安全設置
- 連線與限制
- 權限管制與建議作法

## 資料安全
所有的資安事件都不是單一的錯誤，都是一連串的錯誤引起。

### SQL Injection
> 鄉野傳說
>  傳說...某冷色調店面討論區，有一位神人說.. SQL Injection 根本沒什麼!!
>  只要把 xp_cmdshell 刪除就好
> SQL Injection 只有 xp_cmdshell 有威脅?!
> 只要以 SQL Parameter 即可!
> 如果把 customErrors mode="Off" 你就倒大霉了

註：**xp_cmdshell** 利用 sql server 去呼叫可執行程式，關掉之後，一堆處理都會掛點，而且 sql server 只會回答**權限不足**
註：SQL Injection 做好，可以減少很多 XSS 錯誤

### XP_cmdshell %20 BCP

- BCP命令
SQL Server提供的一個快捷的資料導入匯出工具。使用它不需要啟動任何圖形管理工具就能以高效的方式導入匯出資料。當然，它也可以通過xp_cmdshell在SQL語句中執行，通過這種方式可以將其放到用戶端程式中（如delphi、c#等）運行，這也是使用戶端程式具有資料導入匯出功能的方法之一。
- xp_cmdshell
以作業系統命令列解譯器的方式執行給定的命令字串，並以文本行方式返回任何輸出。授予非管理使用者執行 xp_cmdshell 的許可權。

``` sql
SET NOCOUNT ON
create table #a (name varchar(128), id int identity)
INSERT #a
(
	name
)
	SELECT
		name
	FROM
		sysobjects
	WHERE xtype = 'U'
declare @id int, @cmd varchar(2000)
SELECT
	@id = 0
while @id < (
	SELECT
		MAX(id)
	FROM
		#a
) BEGIN
SELECT
	@id = MIN(id)
FROM
	#a
WHERE id > @id
SELECT
	@cmd = 'bcp ' + DB_NAME() + '..' + name + ' out
"c:\temp\' + name + '.txt" -c -T'
FROM
	#a
WHERE id = @id
EXEC master..xp_cmdshell @cmd
SELECT
	@cmd
END
```
這兩者混合使用，會達到非常嚴重的後果，所以伺服器角色權限設定非常重要。

### Blind SQL Injection:
仰賴**錯誤訊息**來建構出攻擊的語法；例如:註冊日期的年份，輸入負值，看有沒有過濾

註：Oracle 的最大數值位數是零下 32 位
註：PHP 5.2 和 5.3 版在 32bits 的 PHP 有浮點數 Bug，這個數字丟下去 **2.2250738585072011e-308**，會直接運算過載(沒有容錯處理)

### 自動化工具
- Havij:網路上流傳的一部分有毒，請不要亂下載 XD
- [W3AF][7]:可測試 SQL Injection + XSS
- [SQLMap][4]:有同學整理相關[指令集][11]，或是 Facebook 搜尋 **資訊安全+網路管理=資管?** 加入該[社群][12]
- [SQL Ninja][10]

### Hex to ASCII
將上述的範例或是一些簡易的 SQL Injection 透過 **[Hex Convert][2]** 工具，如果轉換出來覺得沒有排版可以使用[這個線上工具][3]來格式化。

## 資料庫安全設置

電腦發展到今年已經 52 年了，帳號密碼是最根本的驗證方法。而帳號與密碼對比而言，猜帳號比猜密碼還難，因為密碼還有限制，所以還比較好猜中；

### 3A架構
- Identification(識別)
輸入能被識別的資訊(如帳號、ID)
- Authentication(驗證)
輸入的資訊是否正確，辨認使用者(可以是人員或程式)的身份
- Authorization(授權)
依照權限給予相對的權利，主要精神在於根據安全政策給予使用者所能擁有的權限
- Accountability(審計)
供稽核使用，包括量測(measuring)、監控(monitoring)、報告(reporting)各種資源使用量及事件紀錄（log）；主要精神在於收集必要的使用者與系統之間互動的資料，最完備的作法就是「凡走過必留下痕跡」，鉅細靡遺地記錄所有的互動。

所以 **Identification(識別)**應該是先確認帳號，確認這帳號存在，再行驗證密碼，如果不驗證帳號的話，就等於直接進入電腦了。例如：遠端登入桌面，你只要帳號對就等於進入對方電腦了。

註：sql server 提供的 AES 的預設加密是只有 128 位元，不過不幸的是已經被破了(附上[雜湊函式生命週期表][13])
> IT冷知識：Microsoft AD 的驗證系統是 **Kerberos**(地獄三頭犬的名字)

### MS SQL
資料庫的連線是基於RBAC(Role-base Access control;角色基礎存取控制)，**MS SQL** 是 **RBAC**
- Sysadmin & Public 外部連結帳戶是
 - **MSSQLServer**
 - SQLServerMSSQLUser$Computer$MSSQLSERVER

sql server 檢查順序是這樣 MSSQLServer => Authenticated Users => Users => Everyone 最後發現都不行的時候，sql server 通知 OS 他需要一個寫入的權限，OS 會開啟一個臨時的 Authenticated Users
版本愈新，控制措施愈好!

當你開了 Everyone 就包含了Everyone<=Users <= Authenticated Users<=MSSQLServer

有些人的資料庫會有本機執行時候很快，但是架到 Server 上發現，每秒鐘幾百 MB 的寫入率(單機)變成 27 MB 的寫入率(因為 sql server RBAC 會檢驗各個身分去看能不能寫入)，就是這個原因。

### [伺服器角色][14]

> |角色    |   描述|
> |:-------|:------|
> |sysadmin|系統管理員 (sysadmin) 固定伺服器角⾊的成員可以在伺服器中執行所有活動。|
> |serveradmin|伺服器管理員 (serveradmin) 固定伺服器角⾊的成員可以變更整個伺服器的組態選項及關閉伺服器。|
> |securityadmin|安全性管理員 (securityadmin) 固定伺服器角⾊的成員可以管理登入及其屬性。他們可以 GRANT、DENY 及 REVOKE伺服器層級權限。如果他們擁有資料庫的存取權，也可以GRANT、DENY 和 REVOKE 資料庫層級權限。此外，他們可以重設 SQL Server 登入的密碼。|
> |processadmin|處理序管理員 (processadmin) 固定伺服器角色的成員可以結束在 SQL Server 執行個體中執行的處理序。|
> |setupadmin|setupadmin 固定伺服器角色的成員可以使用 Transact-SQL 陳述式加入和移除連結伺服器 (使用 Management Studio 時需具備 sysadmin 成員資格)。|
> |bulkadmin|大量管理員 (bulkadmin) 固定伺服器角色的成員可以執行 BULK INSERT 陳述式。|
> |diskadmin|磁碟管理員 (diskadmin) 固定伺服器角色是用來管理磁碟檔案。|
> |dbcreator|資料庫建立者 (dbcreator) 固定伺服器角色的成員可以建立、改變、卸除及還原任何資料庫。|
> |public|每一個 SQL Server 登入都屬於 public 伺服器角色。當伺服器主體未被授與或拒絕安全物件的特定權限時，該使用者會繼承授與該物件之 public 的權限。只有當您想要將任何物件提供給所有使用者使用時，才指派該物件的 public 權限。您無法變更 public 的成員資格。|
> 資料參考：[MSDN][14]

- Securityadmin 權限幾乎等同 Sysadmin，但是兩者指令牴觸的時候，以 Sysadmin 為主
- Setupadmin 權限等同 ServerAdmin

## 連線與限制

### 資料庫權限影響
- 網路
 - 防火牆
 - 協定
- 作業系統
 - 權限設定
**明確許可**與**明確拒絕**非常重要，只要你設定為明確拒絕寫入的權限，那就幾乎不可能有 **SQL Injection**；但是這些安全性架構對於欄位新增的設定很麻煩，但是銀行、航空公司都是這樣的設定，安全性比較安全，所以像航空公司行李的托運條碼從 13 碼擴增就花了 13 年，才把全球的資料庫更新統一。
 - 應用程式安全
**共用資料夾的代理身份**、**服務啟動帳號權限設置**或**指定特定帳號及權限設置**，例如：IUser是否有寫入權，ASPNET是否應明確拒約特定目錄寫入權
- 資料庫
 - 身分角色
 - 資料庫權限
資料庫出包影響最大，依次遞減為作業系統、網路兩層，所以網路層安全性出問題，不會往後放大影響。

### 網路
- 防火牆
- 協定

IPv4 不能驗證來源，IPv6 可以獲取哪台電腦的 Mac Address

RBAC 的精神，伺服器角色與登入其電腦身分的權限，sql server 是以其登入其電腦身分權限為主；也就是說，就算你的 sql server 登入角色權限是最大的，但是想要將 table 資料擷取建立到新建資料夾等等，是要判斷你登入該電腦身分的權限，是否擁有建立的權限。

Sysadmin 與 Securityadmin 是在系統帳戶權限下；剩下的角色都是在資料庫權限下。

## 權限管制與建議作法

Robocopy 指令

關掉防火牆特定的 profile
``` bash
netsh advfirewall set /?
```

MSDN 提供 DirectAccess

防火牆規則設定上，MS 資料庫的 1433 port 除了這個 port 之外，sql server 還可以分離，data 走 1433，指令跑 1434
![example](https://lh3.googleusercontent.com/Y78HAIdZGWT9kCokFc0PUBPaUmcRLIr1mJYOXwmpTAP0WhlhH5NV4rfwV-0TZzbrSJ0iATvBH0nIh0ZUanNe_zmxLtidv4CmEEZVvArDI8NYxdEDWKDta93m3vSvHQaLAJ9Ov8ebEetRBF_3saQtvitOFrIdKGBP3l6HlwfBf6ZjTacV5t22eTGpmBwqX56PTiQEAz5NCqtl2GFjUiHayOmhwZX6S8evbp6kU8rqHipiVh_3bSPdxLM7s4xGimTM6BTwg95-4h6kp1xL01-i_MoupXZRrdYq9RA_I5t_hlhx0itG34PMS7wNci6ojxpQjV92XdvQ6YCN-uSK4bbNL4BjE5ZbjAO3Ht7Fv6rSqEoxepplUZ_wHc8aAXchzp_q0slSxJti4ghHw7nIR0wtzSHGVN8HNbulwqsXyavsIftWrGiffmSJ1dXu3u1I0YiEWeXZUSXlHaA_lR3cjW23Ns4HuFp6sAyCqHu0-3V5T1i2nhKQJvihFR9EbtHsB2ghq-wPUksXUEizTFJ11q86W4ZI1SO2eqIkWeLAkFVfZwWOxOBKHx_6UkwqQEqx9ZAAsqdec72ksytk9skAr46CIWlNEPOt_BCA6HzJuQLCUljNUhhY4rCh-ZUkVBUlsqNtG6xSqzId1fTCUx13LBeDKqGanyqAiLN6H-7tiMfyZQ=w547-h391-no)

μ δ 這些符號送到 SQL 裡面，SQL 無法解析會導致電腦自動重啟

windows server 2012 原生就可以跑 php

php reference 多加一個單引號，可以把使用的方法列出；如果是 asp.net 會直接把 web.config 裡面的連線字串取出

SQL Injection 會讓被入侵的電腦，裡面新增的檔案(大量)建立日期都是一樣；

注意是否被 dll Injection

## 參考資料
- [bcp 公用程式][1]
- [Hex To ASCII Converter][2]
- [SQL Formatter][3]
- [SQLMap][4]
- [SQLMap 指令集][11]
- [QxOrm][5]
- [QxOrm安裝教學][6]
- [W3AF][7]
- [W3AF windows download][9]
- [SQL Ninja][10]
- [HTML URL Encoding Reference][16]
- MSDN:[DirectAccess][17]
- hacking 統計數據[zone-h][18]
- [Test IP Address][19]

[1]: https://msdn.microsoft.com/zh-tw/library/ms162802(v=sql.120).aspx "bcp 公用程式"
[2]: http://www.dolcevie.com/js/converter.html "Hex To ASCII Converter"
[3]: http://www.dpriver.com/pp/sqlformat.htm "Instant SQL Formatter"
[4]: http://sqlmap.org/ "SQLMap"
[5]: http://www.qxorm.com/qxorm_en/home.html "QxOrm"
[6]: https://www.youtube.com/watch?v=ZyjvDiOI3uw "QxOrm安裝教學"
[7]: http://w3af.org/ "W3AF"
[8]: http://w3af.org/#download "W3AF download"
[9]: https://sourceforge.net/projects/w3af/ "W3AF windows download"
[10]: http://sqlninja.sourceforge.net/ "SQL Ninja"
[11]: http://www.legendsec.org/1111.html "SQLMap 指令集"
[12]: https://www.facebook.com/groups/hacker.tw/ "資訊安全社群"
[13]: http://valerieaurora.org/hash.html "Lifetimes of cryptographic hash functions"
[14]: https://msdn.microsoft.com/zh-tw/library/ms188659(v=sql.120).aspx "伺服器層級角色"
[15]: http://www.icst.org.tw/ "國家資通安全科技中心"
[16]: http://www.w3schools.com/tags/ref_urlencode.asp "HTML URL Encoding Reference"
[17]: https://technet.microsoft.com/zh-tw/library/hh831416.aspx "MSDN:遠端存取 (DirectAccess、路由和遠端存取) 概觀"
[18]: http://www.zone-h.org/ "zone-h"
[19]: https://www.maxmind.com/en/geoip-demo "test IP address."
[999]:http://sample.com "有一種破命攻擊法，聽尖叫聲(運算的時候，CPU 的音頻聲音) 例如：等邊三角形，只要計算 1 公分的小三角形，得出公式後，套到原本要求的範圍裡"