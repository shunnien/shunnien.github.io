title: Sending DataBase Mail in Sql Server
date: 2015-11-21 15:20:20
categories: [程式技術筆記]
tags: [SQLServer]
description: 使用 Sql Server 的 Database Mail 來發送郵件
---

## 緣起
剛好有個需要發送郵件的需求，而且不是對外服務的需求，就拿資料庫來發送了。

## 我的環境
### 中文版
``` bash
$ systeminfo | findstr /B /C:"作業系統名稱" /C:"作業系統版本" /c:"作業系統設定" /c:"作業系統組建類型" /c:"系統類型" /c:"處理器" /c:"BIOS" /c:"實體記憶體總計" /c:"虛擬記憶體"
作業系統名稱:         Microsoft Windows 10 專業版
作業系統版本:         10.0.10240 N/A 組建 10240
作業系統設定:         獨立工作站
作業系統組建類型:     Multiprocessor Free
系統類型:             x64-based PC
處理器:               已安裝 1 處理器。
BIOS 版本:            American Megatrends Inc. 219, 2015/5/4
實體記憶體總計:       16,264 MB
虛擬記憶體: 大小上限: 18,696 MB
虛擬記憶體: 可用:     8,883 MB
虛擬記憶體: 使用中:   9,813 MB

$ sqlcmd -Q "SELECT @@VERSION"

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
------------------------------------------------------------
Microsoft SQL Server 2012 - 11.0.5343.0 (X64)
        May  4 2015 19:11:32
        Copyright (c) Microsoft Corporation
        Enterprise Edition (64-bit) on Windows NT 6.3 <X64> (Build 10240: ) (Hypervisor)

c:\Windows\Microsoft.NET\Framework\v4.0.30319
$ csc
Microsoft (R) Visual C# Compiler version 4.6.0079.0
for C# 5
Copyright (C) Microsoft Corporation. All rights reserved.

This compiler is provided as part of the Microsoft (R) .NET Framework, but only supports language versions up to C# 5, which is no longer the latest version. For compilers that support newer versions of the C# programming language, see http://go.microsoft.com/fwlink/?LinkID=533240        
```
### 英文版

``` bash
systeminfo | findstr /b /c:"OS Name" /c:"OS Version" /c:"OS Manufacturer" /c:"OS Configuration" /c:"OS Build Type" /c:"System Model" /c:"System Type" /c:"Processor" /c:"BIOS" /c:"Total Physical Memory" /c:"Virtual Memory"

OS Name:                   Microsoft Windows Server 2012 R2 Standard
OS Version:                6.3.9600 N/A Build 9600
OS Manufacturer:           Microsoft Corporation
OS Configuration:          Member Server
OS Build Type:             Multiprocessor Free
System Model:              VMware Virtual Platform
System Type:               x64-based PC
Processor(s):              2 Processor(s) Installed.
BIOS Version:              Phoenix Technologies LTD 6.00, 4/14/2014
Total Physical Memory:     4,096 MB
Virtual Memory: Max Size:  4,800 MB
Virtual Memory: Available: 2,497 MB
Virtual Memory: In Use:    2,303 MB


C:\>sqlcmd -Q "SELECT @@VERSION"

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
------------------------------------------------------------
Microsoft SQL Server 2012 - 11.0.5058.0 (X64)
        May 14 2014 18:34:29
        Copyright (c) Microsoft Corporation
        Enterprise Edition (64-bit) on Windows NT 6.3 <X64> (Build 9600: ) (Hype
rvisor)

(1 rows affected)

```

## Sql Server Database Mail 
設定方式有兩種，一種是透過 T-SQL，另一種是透過 GUI 介面設定(只需要滑鼠操作就可以完成)
- Transact-SQL
- Database Mail 組態精靈

### Transact-SQL
#### - 啟用 Database Mail
首先檢查是否已經啟用 Database Mail，沒有啟用的話，啟用它。
``` sql 
-- 啟用 Database Mail 必須在 master 系統資料庫下
Use master
GO

sp_CONFIGURE 'show advanced', 1
GO
RECONFIGURE
GO

sp_CONFIGURE 'Database Mail XPs', 1
GO
RECONFIGURE
GO

-- 檢查是否啟用成功
SELECT
	name,
	value,
	description
FROM sys.configurations
WHERE name = 'Database Mail XPs'
```
#### - 建立 Database Mail 帳戶
``` sql
-- 檢查是否有 Demo 這個帳戶，有的話就刪除 
IF  EXISTS (SELECT name FROM msdb.dbo.sysmail_account WHERE name='Demo')
BEGIN
 EXEC msdb.dbo.sysmail_delete_account_sp @account_name = 'Demo' ;
END

EXECUTE msdb.dbo.sysmail_add_account_sp
@account_name = 'Demo',  -- Database Mail 帳戶名稱
@email_address = 'wiamyu@gmail.com',  -- 電子郵件位址(寄件者Email)
@display_name = 'ShunNien',  -- 顯示的名稱
@replyto_address = Null,  -- 回應的傳送地址
@description = 'Database Mail Account',  -- 帳戶的描述

-- SMTP 郵件伺服器的名稱或 IP 位址
-- 127.0.0.1 是本機端位址，配合 smtp4dev
@mailserver_name = '127.0.0.1' ,
@mailserver_type =  'SMTP' ,  -- 郵件伺服器的類型
@port =  25 ,  -- 郵件伺服器的通訊埠編號。預設值是 25
@username =  Null,  -- 登入電子郵件伺服器的使用者名稱
@password =  Null,  -- 登入電子郵件伺服器的密碼

-- 參數 0 會使用 @username、@password 這兩個參數
-- 參數 1 會使用 資料庫的驗證，預設是參數 0
@use_default_credentials=0,
@enable_ssl=0  -- 是否使用SSL(安全通訊端層加密通訊)。預設值是 0 

-- 列出 Database Mail 帳戶資訊(密碼不會顯示)
EXEC msdb.dbo.sysmail_help_account_sp
GO

```
#### - 建立 Database Mail Profile

``` sql
-- 檢查是否存在 SendMail 這名稱的設定檔，有的話則刪除
IF  EXISTS (SELECT name FROM msdb.dbo.sysmail_profile WHERE name='SendMail')
BEGIN
 EXEC msdb.dbo.sysmail_delete_profile_sp @profile_name = N'SendMail';
END
-- 建立新的 Database Mail 設定檔
EXEC msdb.dbo.sysmail_add_profile_sp
  @profile_name = 'SendMail', -- 新設定檔的名稱
  @description = '' ; -- 新設定檔的性描述
GO
 
-- 列出郵件設定檔的資訊。
EXEC msdb.dbo.sysmail_help_profile_sp;
GO

```
#### - 把帳戶加入到設定檔
``` sql 
EXEC msdb.dbo.sysmail_add_profileaccount_sp
 @profile_name = N'SendMail',  -- 設定檔名稱
 @account_name = N'Demo',  -- 帳戶名稱
 -- 帳戶在設定檔內的序號。沒有預設值。序號決定了帳戶在設定檔中的使用順序。
 @sequence_number =1 ;
GO

-- 列出 Database Mail 設定檔相關聯的帳戶
EXEC msdb.dbo.sysmail_help_profileaccount_sp
GO

-- 補充資料 
-- 若是要從 Database Mail 設定檔中移除帳戶。
EXEC msdb.dbo.sysmail_delete_profileaccount_sp
 @profile_name = N'SendMail',
 @account_name = N'Demo';
GO
```
#### - 設定使用 Database Mail 設定檔的權限
此篇在德瑞克大大的[文章][5]說明得很詳細
``` sql
/*
主要參數說明： 
(1) @principal_name：
這是關聯的 msdb 資料庫中，資料庫使用者或角色的名稱。 
principal_name 是 sysname，預設值是 NULL。
 
您必須指定 principal_id 或 principal_name 其中之一。 
如果 principal_name 是 'public'，這個設定檔會成為公用設定檔，會將存取權授與資料庫中的所有主體。
 
(2) @is_default
指定這個設定檔是否為主體的預設設定檔。 主體只能有一個預設設定檔。
*/
EXEC msdb.dbo.sysmail_add_principalprofile_sp
    @profile_name = N'SendMail',
    @principal_name = 'public',     -- 設定為：公用設定檔
    @is_default = 1 ;
GO

-- 列出 Database Mail 設定檔和資料庫主體間之關聯的相關資訊。
EXEC msdb.dbo.sysmail_help_principalprofile_sp ;
GO
```
#### - 測試發送
到這邊設定就完成了，可以檢查一下設定檔
``` sql
-- 查看 Database Mail 帳戶
SELECT * FROM msdb.dbo.sysmail_account
-- 查看設定檔
SELECT * FROM msdb.dbo.sysmail_profile
```
接著進行發送 mail 測試，配合[smtp4dev][6]，就可以在本機端接收 mail 了，設定可以參考 demo 大的[這篇][7]

``` sql
EXEC msdb.dbo.sp_send_dbmail   
@profile_name='SendMail',  
@recipients='test@gmail.com',  
@subject= N'這是郵件主旨',  
@body=N'這是郵件內容' 

```
![Send Mail Test](https://lh3.googleusercontent.com/hTRuihFjxtjWU0BBL3FvwWtyv2vIJ-GDeYSIgABlVeOVweBMUslz5KeHnwNUnAnQlWjj3SKcvu7j5xgGdoBlEqkSPzXIFSLv_oGh8nS20Bq1d_tgLLZvD7lEQSv8L-g2gy3zsPWj6-enDr3BLZko2Jdb09vl9UI_hnpdRPoZ-lM7_PUKjR328VC8wpqW4E0AjikNyiQGnZVqblDyErHJEwTjO5uBbtS0Cu8lKNZDyt5eZP377th3RvaVE1AiFTeHu47ArYC_plzDmhbqnGxxgWrZMw5zwztNlaWDjFAEST0NQRKqlDXGNRWtIoPZJKimwTqhkzM_BNlPrTKGEZ7lRKQk_Hpf6vugX1Z0ZAiFlzhVujZPpbOza_XZny3o5B_IDZLAvx8_8KjfDPEPn_ntuRT3-vEBA2ZLlbk0Rg0ndtZ6umiMALMxzg2Y-b5g5qc7Cfse3xa81gFaUAEkjwo-lr9DQGHnG4MyBpjugZzV4TgKlCS7rOWZ9pUndtVLY7-tU06Po2gsMHSSBq-QCcjM68BWd1T_zMf19p09eZ8K7fAMo8SV2SCx-lMXJg57LpOx5-XmLi6_PkbQdUN7-OKALVhbO9uZkADNS67fmbcmW9xB5awgswNNzOiV32DleQPsThvA1PkC9mKccB_pKh0_MiUzR1KZesnBuGY2Kulp4Q=w640-h278-no)

#### - 測試發送
查看發送的狀況
``` sql
-- 查看：Database Mail 處理的所有訊息
SELECT * FROM msdb.dbo.sysmail_allitems
GO
 
-- 查看：傳送成功的訊息時
SELECT * FROM msdb.dbo.sysmail_sentitems
GO
 
-- 查看：哪些訊息未成功傳送
SELECT * FROM msdb.dbo.sysmail_faileditems
GO
 
-- 查看：未傳送或正在重試狀態的 Database Mail 訊息
SELECT * FROM msdb.dbo.sysmail_faileditems
GO
 
-- 查看：Database Mail 系統傳回的錯誤訊息之類
SELECT * FROM msdb.dbo.sysmail_event_log
GO
 
-- 查看：Database Mail 附加檔案的相關資訊
SELECT * FROM msdb.dbo.sysmail_mailattachments
GO

-- 發送郵件的狀態
SELECT
	last_mod_date,
	CASE sent_status
		WHEN 1 THEN 'Sent Successfully'
		WHEN 2 THEN 'Failed'
		WHEN 3 THEN 'Unsent'
	END sent_status,
	[subject],
	recipients
FROM
	msdb.dbo.sysmail_mailitems
ORDER BY last_mod_date DESC

-- 發送失敗的郵件與錯誤訊息
SELECT
	profile_id,
	items.last_mod_date,
	items.[subject],
	l.[description] ErrorMessage,
	items.sent_status,
	recipients
FROM
	msdb.dbo.sysmail_faileditems AS items
	INNER JOIN msdb.dbo.sysmail_event_log AS l
		ON items.mailitem_id = l.mailitem_id
ORDER BY last_mod_date DESC
```

### Database Mail 組態精靈
首先開啟[SSMS][4]，接著選擇*管理*，然後選擇*Database Mail*，在選項上按下滑鼠右鍵
![SSMS Step1-1 En](https://lh3.googleusercontent.com/vbC2dM4iDUm9VhmUoZPGBwXdo0YAA4kJkhPhw0o326Av7FQIaUGicSfl1AQ_WNqjC9-kvwJRt5DEWLGslaH-Ubbts3a-Pi76idbLW_qiZtw8n33mOp3azrHgIz7lOZWG7JlAMIIQUWL23LVG4zH_gWh2eG5xdjCZ9Xc1NoymBbweeYLZcdymRF_is-qa0mNxtZvunWynvI32agJdWtMIm5VQbAal9Ojzydtjmiy9BbSYjHNDn5VDWHpUIGGPZGIBkPThqHp5SawMMKKC8T0EgoOhHiSmqd6WVPdsFtShIoJuySzGT7dW1R3FNysDn68rHAQXU3ob13Nu2WlIcLONa54I-uYtL9CnT294WFO9Jz7yNU9108D3QmDy8ICEeHXmD9RB23ZTANUxHg5aM3lgPvgGgzcz_j6An4VPL1i7z7UxegiVnTTswkZZQGt9WFA7OWuRZVVpSKxWZkgbnNAGWlGGm81ZhuORUWvLyWGQZu9lxYwgOQQxxmtIDBXoaItuBoskcuQkZlzeJkud4RMSDChE5mLagte3o773Q9DvBzGBthxP1Eqi0N45GjhSsWKTaA03_kqrHijKmJV8nZ2pxOIP7hX2smdAWz_FsiesJMBsT5UVpra-KrUPdq1ohTN077lXPdPQCo74aa01AdptSIrLJajHfdOFlNNSFSlC9A=w222-h237-no)
![SSMS Step1-2 En](https://lh3.googleusercontent.com/VDYwT7kT45aY89H5H2jfgE1-vX9Sc0aEaNzHOAeSMEkBdkH4duWkZxRO2m9_Kj3Td9-olDx42PisB4gc0-NTu6-6lo0XTRLm0538_NZIeElVQ20vy48cLTvhq2_OI95gvkheSGciJaRG2i-E3SbyLyJqsyeUQAKY5Z2gM9fJ-aDptgPwczuSBb7eKky3X88beVKKhykIauOCUEL-Mz8K2WTwgW4Az5_yDb9bJLfjbFf7jK4BaOdfKr0CAA4DdsYxovQRWF8dO-9vKbHA8xelNspWW7LHJoIAjpwhn1cUjgMy9h9lcsHpmIQzyihC8ZE3SnRYsi3C4we0rMenZnrRmiFbirPsKpkxjyHN1Txo8QXza5nNm1y4iCy5wogT-3m0E7ebQkhUQNa2ITv6CZ_uWonq6GZ9cTJd8Vq1aBasxVcQrEHKYcqHw_RK4T2z-r18gRfkRxyS21USpLlr3lN6la-9w4zmjvW3i18p77IZmZvXNSM8zE819y5ldfOxsPek8gF9WL1EzdzSdGwx02c9zDv5yguiFoqhF8wIop1gpZCEsUT8yrjQ34ijT_Traux5hC7NrV8rLeqc6Z2XEEyR5noect1Nw9WU_09envAyeZ_KR5HPP_ST3m3qmyKud4LjForYw_5zeXzdyP3knkoUmFHbHTs7FnRQuA5CpSf_5A=w347-h211-no)
![SSMS Step1 Cht](https://lh3.googleusercontent.com/q_7n6hXi58asqHSlfjDh2RGf2qXXic3rd-brWJV517AZ3jN3im9OgtqD5LoitgUAshooVjQQPk_Eg6mawaMQhfMnTfN3ByI_uwNzrl2Lr3jCjrKQyfV6d_YvXmnBGISh4nPzTaqkbOkzKLidaRtQwS5RqZV6E1MZzLHiq-Mtmu20cTYdDc01lkE9uhHz6Ft1_yI2rmET-naCpPL6ZMwaGAmyIymu3IIcEY3utdCWnXlpL1OKNfXqfviIZNdDLUjNxDLL4lv740c0NcRadhF0Zb_jhbb7vee7kszF1aJ_9CaoPBCOhZOLlua7vWcxCU0cRdvZzr44QxnITtCNPqYm-e_NopsLtc81NmnFhBf34UwC91-uMCT22L6tgeQRRy2zWis_RAop3_KGh8NKRR0eE2c2PdlD_HP8mAy4xE9kRt-IQBJN1m-7Q2xn6YUt-9YCMWD3UYn7zxNpCrb1RaSDfBhJPGgq5dDEV2865AJ34XXvAXI_Ms2dVKSH81VINfDPnipnC6LeW05qdm546SrXOUiVkmihQ4h9mWQdefibqkJihIOa2bHKdt_rvoWUlunk-g9AvXq5L8NG2k7x-Uv1xWfQjQjttUKEwYLSBbM4ruErkJweqZ_HO20h5P7VmrmBgYCL80g9jdIWkzQDDRjA_3Dz3mt6nk9Z3kOC14hsOw=w382-h312-no)
啟動精靈後，直接下一步
![SSMS Step2 Configuration Wizard En](https://lh3.googleusercontent.com/6iAZzbs3NeID5jr6tuOVMheo1h2k05Sufv1xIENvqmc3Np7A_-K0GlA6hwdHPGXAP8GQfoxLfu8H2NBRzl8t0DzzWrW3V04KpQLU6FqjA1BdJR97OiaZGgwc2QuhbpzY9h4x4XmowELbuXe1IRDwN1TjIjnri51jE6AybtrCp5vX6CrqPpvQRbJY3C-ISZae1Ou3CbpS0RpNW9V0X4wOJqsGAdawwYh84_jpERIqUIWIRie6v79hDhwxDug5rv5qqEwydJECOF6D5pkvVxX-3vk6s-YvGnEe5PQtM7nu9PZYaITlqk7RD-l6peH72ZqQbhUADF7x4X4mZr3LfG-fiE2YPTDnUvUp1h4RqzCiW7DD8w_BjRe4bq6T5pGqT8tvynoHdV_2g9aOBtXYSP_aqPrb6ISG53SRlOUiTW7upVZUUsBpdTkuNGt6PUVsm1ldMjMO4QAp7PjYwv3peCqWT5nlZ-j55H9wRWzA6UIiMWALcWlNtYM979J0Xqi5ARZmSgNNIbUugv1ksxk50mZ6KkeHxk7nU9IIVIYPTg4-vPlflGrm9QTajHg7Tc9kZZdUb0AtZ82Zo7ZfVrZw2y9v-YcTUWVLTz-uCjpf0hh-aqaolvfFM1GaKyyGiSFwrtlr3JfP_sGqnLSxgjiRU2buiHrxFmvWQCgmsa5aYZNvtg=w656-h573-no)
![SSMS Step2 Cht](https://lh3.googleusercontent.com/PybqHjvEdAiAv6e5gGS9SAmnuQwKIAQP3954lBJeme1Feq2lppNIaHuMd_woeWUqbizcUCqWwlIMG2YMkCMnFS16ChWDLRg3wgVWjfN3gCtq3Qo9YoT2OSSYwLeP-3ahaEeaAyD8SkAhFh4KU80fSlGxaHNOpbRZBFUisoBCJsWupbsBsxQ4jAzkzYZcIPgEkl6JWvdl_Vnh8WKVz0KCITyXfeiUM0H8orVApBWyRIaCseeXUDUlv2g0t7mZUcH7vJogZO9oBBX1P2iWeDm_4qAE4yvEg4kP_vSI-iTR6hJZY3250LP8KJnlNbQnkZ-NXGiliaJEhVJ-p-H4PPgVnWJLo8X-TteMM2Tk85KmZLAoJ_lRL5oYA3t8tu7zXjW6koa66LeuIkRob8k8ce4nuoRska2JsF-5yO3VzHdGJLvTdgyB3yvP5OYeX1P91QNcvVyLj1WRh58Xuz8Ak3Mz0jIq6G243h52Kts5w0O2Mkk--8r5ZCCWYZm3B7zSDHZ2BjRpwsYBd6OfQilUkskb5iK5J8QNuSgJDw-knS7rFU314nqfJ2WQnJvCHFOgWITi49LIEQ5KSnsnMzbZRYUI-e-aDiCTI7qWPXAjj6m8n9pA3gv1HOcJVmsI3zPpfUmooDdCASVespI3eBSrA4VAAFsmm73MluDvrQYYHMjJ-Q=w652-h709-no)
接著輸入設定檔資訊
![SSMS Step3 設定檔資訊 Cht](https://lh3.googleusercontent.com/gsH3IFxqXZJRfPvZcZn5v06PLiYS2tO3TqUeBw26pWBHKnY8IyZXoBrlAjZuSn8kZ7wgNW1hMMBXtDriurMjf427ZW7pNRZlMzfqYtApXDPn2_m37Bi3G4UtP7QAPj388_QzeOz_G8tBSEQXSXT9bOt_yoOHrTjnRke5bWXzSnzCSfRcTyrIeAf2rsO3-BZBLo7FO8AQzZE5mXLi-S2PqPGyx2z4G-XZ_8sCrs8NnJrBvTI2dLoaUSi1wydTqzvidPYMNz4VMNnqIp5JcBDZqaDyWEBidwRFoK5fAt0eGZ0MhbYGRuLol2AbCQCts8WSGT3mw1XaSSRabO6TPJj5cXDjKaYoJgr_4z04LtSk3faOV55bQgDR-8NSDr0k3OJokk5q3D5eEMOXWgmFhyvcMYNt_GphDCnA00VkG4MLRDMio94tJm4cgVUjaI_j4NRfNi85fZK57urxWumXpa2LXxxVn4J8py5w6AfleqVqQTOHdrjKzBKoYmLeWumED4HslktAFiRUACk0oemp_C-X-5T37-Ezrxi06nrPEcG_coXAdBr4xcdMKm_1zzJWIkt2QJf-28P-1J1tLFgGBavGtGqKgyB7urrMZp3j40tQYeyUYxJmIp-e1AZOqjgp_B001eP4Qct_UuhuOkZhNdnrBidRPoGBzwcZhN1vnBHV5w=w383-h115-no)
新增 Database Mail 帳戶資料
![SSMS Step4 新增 Database Mail 帳戶 Cht](https://lh3.googleusercontent.com/huxWDb4oAh9oMyIpX1d_M7FMmv3qR0A2yQUJ3GHZNp7MTJDryHNzCq6YMgnbIzQzlThW9dNyLCkT85B2KzgwmGNpBXSceRDnCA9nINVm1o8gE4PCGOQVLDGH9McJ8Q7OSddFqZAzzBCOVbfvxAO3KnD_mQaDdCLJQwPwFiPq3Tr5oxpauY3DVvKMPAq3EMoFtG3H2ZvnXly1GvDZ_KhX6qHIfsfjh0F7uHKWKRkLITqsqL4vwW0YgGzR57C8HG8hA4ayLXxCZhyvIIqzBg6RQXjYQB5GFFJWTuzn2U_Hnr1VD6J75_9IWGYBDQCFDTtgbfko-p_vNfHqk5QgtiO7GnddOQ6AxHJjMb3CrvDiCiklQUQq_2bpwQRC-_JdGvynHrsm_oswbqn4k-QI2J7KS4IZeXAzYcheePqeoUVNaNJWRZJGYgcf7nTS5VTfl8OXTDFY9CMVuYOtAwmyRQT02G2i8SG7X5uRgPL0ZIs1VU64R4jLd0L3I8hriwRQd2Aq9R296FFeJ_KJViWaw_oosAD9talOKVC96seTWjC63mcpbre0d5CaaRrjxmvQgirR9GO1Ku0i99GlRMseA42Cqz4rgquNjX-3Y5TU5GgKqX0mXeB-LrTJiScjBIyYYevbq8hYlBHDQKvdOIp3759QL1fgtN7XRITqpPUz1b5mgw=w583-h625-no)
設定帳戶資訊，接著將帳戶加入到設定檔，並進行下一步
![SSMS Step5 將帳戶加入到設定檔 Cht](https://lh3.googleusercontent.com/PYj-yG8t7jnKtOsSrs6RBMi7qDnCtGpPfogsOIx6zPD2WVh9GckNEUAfT1MiDTMFoWZCJ8Kn3XtMLb1gVZWCcowp4OVznlfCJjTkW45fXyHvGtNMy7bYfMZvvGvAdY6zcpBfiKyalhPp_R2Gl9BxzRWzftqAdqrzh1pVo0dnl_37nYG4yvNCFOUKOP8sM6pdim1Ggt273NiqOjSUlrMIgAnmicaGR52EzldqS0kTUc83GrXCLqJ7iBvN7gZm06gaCodw5OEt_xgccjWqEh1pD7VgyZeqOO3UqhRvg55MIqXAnQ2_WfMNty_TpuxDBB6On_eOdHxDXqrrhdtcKCDuS5olNPXEZhscv-XjUAubzAiJBDvHlVRl4p0IGIryjj8Gy9yRdZooeklK3m_fmvpUe8VksKz6kbfDkoWclqRIa-7YKho548xYVRoHUUArjBEWeEbJTI0l1VVuJmAyPjFkavdOgVkLH0p1asgACkuf30HOEB4AS1IaGjTsiK89dlXYQj-cmFtJU-ul3NRUdDl1b_VfFRAgujnHl3VJUy4UnGCgpblWci_iYkS_IbZkaRcWG74D16irNL1YX19cLShSiyrU3tNfXT9yradLJtn9NcbklpkrrxEiTG1s8nm8SvcgN7sVakBfkN2ficK3ohZZdwdAwQe97zUixNL8RMEdIQ=w594-h273-no)
勾選設定檔
![SSMS Step6 管理設定檔安全性 Cht](https://lh3.googleusercontent.com/nhzcPn0T75wCa669x4tnXZ1-vUSwfmwEDGRGrDI69fDwvqqhupiqBmdM879_GtdY5kW23pnzkmKGzfBJEoyl2da2u8txji2uwBDlSneQuzE3gnSWsvJWrv47f3F3tDrEgNOU0GrCMmUDKPwYm9gtQMSz3ICHzNp3RU89RZcbqhIiPrbDpWKOFOco6VNzNZYW-CWMYikT32ZNyv4YIu_3IU_yjH1TFSHBb8TWfGLGZjx-H4PAqsT0p6drS6xJmooqrTauEJ4zhvYNMN3A__ET_2Dmbrtj4X4oGjGJWF2432XzarviNn4WG8nEXjiUwLtVGpYe1EwaE_w2gV5YVrsYFZWBK9ixpqEoJljXjQJ0yFDMHAMm7ImN9sQcatrHU5wZKoLf2NNhPc5v6U8gUuPNMM09IyMCyGj2gyj0Egc5fjB1BFnDhZD8tgDVsB-bZykAKdCl10bSffO_FWrmyL8wmDUemF5MYTgLWzaFX2ETtMy2aVuIU21hc4LX_N-GUrWI3mGR5IQpsA5hm5GWIj0l6qdbt5OYxz19COGgAQIJRI_PiefNO-GfNjVQqBMMl4FAYRb4GgTj2bjwvlBhBYKwpYrfD-xadZ-BdqEEBkikTPJamiKECi1ssw-BnLI-c7gNmI6HF7FsNEkaCgMSnNGBBPMmUsdANPxv6pFk8LXk5Q=w652-h709-no)
設定系統參數可以不用變動，直接點擊下一步直到完成
![SSMS Step7 設定系統參數 Cht](https://lh3.googleusercontent.com/4tyt_bufmq-4RhRiyzgkM5yvgWk3OBXKw9mtn0HV5ITtN9wKAcDQFi2BtJ8YpfkHZWkYWULkzz2eNrgbUUUO2UgHXCX_qWePDx5IwaFnyj7vpSjZZywIcgez3irrx2MhYcnpa6TU3xAt6fr3X6lSkO3qHcwpFfYNP8RMCJUfXDBG75pKdRahTWNUgUeAfv8gUdqz8yoWakUY-iPmIePdZB_KWFcqQmKSlUczmbcDqpeQDJaI-N8kK4fPHLMhN1jsHUhbK90tn07ASPfzkXwgiyYOqkun6R_c6LS5BmnsFTdZfr8lWOmzFAdmdmkTfNOoIISuZ6yBRltwdXGmR_8bOffB0GTcNuBHWEKXXMeElp8FnGWa0m82G5UjqHv1VeTItVbufdS5syUjWfpNWU57JSkXJhEH0xNA-Lb9mvvf8mdzFx-pOyRYTD1lWOC8hsuqiWUuiIgv5RyAstfP7q9hSplBMMIy3lwWiiO_Jg9mcX17D3SaJhycRvAr_LQqpjgr11iuhr9DveWFaSqP_hpJXac4U9KT0oTksSBxit-0XgRhv3xlofMtrvJ4f8Fx_9mjYqzvchIWVnW0Hey_8McaEwLlal6CRu6lgImgP1LUgSo1YMTl3EWLWNhJGcN0g0RXTcC6LegcCnTZOe6nsgeLKJYYMcjiKFJqSaKea265Jg=w652-h709-no)
設定完成後，點擊關閉
![SSMS Step8 組態精靈設定 Cht](https://lh3.googleusercontent.com/eW7ShL9LZlZBxO56TDJWS5c_mjGs2QvqqzKsSsfBDEuBMw6OtZhCyRiihHPeMF2V90-UicXVxevQoTLv0v1JThu3FUiqvDOCHqirOfdYrPiK2noD0g1nsG8QPmImBnwga5FrvpdyoohCs1laKqzuf6vYP6AKQiSP_L91tEeHocjglg631yQ5h9D8XRSIj5xv8F0xeY9aMDzTyY25cLexFb57Yvwx2xythg1f_xho_JLa8ztBktR8hWyrlSoDqsy6IrmW5xqTayOxUDngKJWbUpDBkcRYLdmr7795dOa9sRde_MvpAU7oe4aPVCMbucr5mork6xpL8OtAU82qNB5UcAq1dozMFbMJUWvdY2d9JRNBEGvHQJ2H8ikyLJ7O2zTi0VAxDhyx_fgxnBoCHIppyE40MSmliCOXWl0zWpS9JloqB7BgsHsNaEebaDj4jvg3HiuxGgCCLnlyv9PHEkbBljqKo3q4mCCeA8B-YpoDmGClge9BEvDq03cigfJDwPODMyWKiOyn9BZQrQ08gwhjqevBc0bBkRpZn13MAYiYL8auk0sgSkyaC4GkwtB9DAq9zLYOB09mlIqobptLFwSQdO4kL1Ig5L2RtvamH2mj-xGeDkhyvncU4kiNEhVYdhddHoNcUg9wpobyLPEvzvMEF1mVRd14oHNZONDPTY6nJg=w652-h709-no)
這樣就設定完成了，需要注意的是，登入的帳戶權限記得開啟系統資料庫
![Security Set01 Security Properties En](https://lh3.googleusercontent.com/GsvjjP48GmQAbA_Gtd12O3fp2U4GhxJpzEd6wsEBWHEOH6aU4JQMwTXzyk-_rqJ4-x4Be90wLMIAs80povOjpBp94odztcuRkvcxhwJPARW5J9M_k-SKQBftMFGOXbxGi2xceoxbdxc-VfJGKkKttRVEyPGAo9kL5UXU2pBxLoKpuzPPlp7WqJjYhm4atb2jBou0f6MRzMZQkqP5hjQzRwthWdqvZsXUzunNs7QQW-F1CR5N5ph5-RAwSrvPTKWeY-UxK_3RKK3PMSA3s7zwBbhRC0ySlTmjSWemBeqlVyPMGmygqly7SDn5_Jof73_GHBJBzpPtcXamee7mqV1ETqB4MvIoVmUoA1k17WT5Y9Inqf82Y-s7O-a9UOMBCvpEk4T8_F8KPl7DXRtAs1PLdAnnk8QVvJawdq085bIpr5NZ5hVL7v2DJcntnS8HaRVOefwF7U-zzQHcbNlT7ghxbcqTaAH6DsUAPda6VAdcVctf73ujV-DY7vmH9ptBfEo0Se7pK4UOataOPPLcDOuyNu3M9Ln4rqvfxfpkuaOtkFitXJuyIaotc9jlT58QCNmtQTCV6R5sKfkoJkyN5iKEt_8apvHP9mVKvw_WLjXCc0mmmT7W0R2yGg4Tz5vDUxnbuYKNZbv3dJAgj3T5jl1mMCBr0CtHQlGfvXwhVWVkEA=w346-h444-no)
![Security Set02 Login Properties En](https://lh3.googleusercontent.com/SKr_4s4cePLMtU1xkQPRjaEZzI7_6ZLRcgIm_5QLp6Ovp49AodV8FXvL0cbKqf3RHiWiuf9I_rXdaFIy_t2yfpflyBurigNWtFTMVjM5kat4_YrmuaoHnpNmJ9Q4RL3LKPHynKVdntiwXpoWZDpHGtN6omN6ckZ3_ObPk48IRQgvVI073D9hHyA9RQ6VDtnHwX-N2_DZ-RAiK0asXZA24XtTLN0tyXCLwT1fGo7510WXXYWOnOo1_3TiE7-k99KEbU4p0oFUSEFPkENQ4N_3jIsNW8XPL4NWHpV-YGJLsMAZSa-vvpxbMH64koWDJr3fOldfCX7Lnrs-LIoxwZ49XcIV1mm_H6VURB7SEm7VUetA5r44w1byFVAZDtI8J28z35tLYSo5Lau2VL9PsJaDcwJ-rB8H2CfKZEGYKU4jX_Cm-fgOqGb1Hkyzq0rQjSsTOEGGhBxXMIjYBUBTBEiGLXYdiTNAChCT5zmkLPhSwa6WTYovnJoKsXwCLMe3stnU4MpLfUHfOioVhbpDioRrCYyhDF3xcor8Yg4OMSBLnBDKbiU5UsYnDIvKzogVbkJTcdI47-Ftz3b-8jV1qxibFVD23hhRSQINmpGG8S2wIqNJMCf-MGJDZyIPRVM6TDRhksVYqM4p5L1b0XlM7SQXplrljSMIzcQBQzXiZ46kGw=w763-h661-no)

## 參考資料
- SQLCache:[SQL Server Database Mail][1]
- CODE PROJECT:[Sending Email Using Stored Procedures in Sql Server][2]
- StackExchange:[Need to Send a formatted HTML Email via Database Mail in Sql Server 2008 R2][3]

[1]: http://sqlcache.blogspot.tw/2014/11/sql-server-database-mail.html "SQLCache:SQL Server Database Mail"
[2]: http://www.codeproject.com/Articles/1028172/Sending-Email-Using-Stored-Procedures-in-Sql-Serve "CODE PROJECT:Sending Email Using Stored Procedures in Sql Server"
[3]: http://dba.stackexchange.com/questions/83776/need-to-send-a-formatted-html-email-via-database-mail-in-sql-server-2008-r2 "StackExchange:Need to Send a formatted HTML Email via Database Mail in Sql Server 2008 R2"
[4]: https://msdn.microsoft.com/zh-tw/library/ms174173%28v=sql.120%29.aspx?f=255&MSPPError=-2147217396 "MSDN:SSMS"
[5]: http://sharedderrick.blogspot.tw/2012/05/database-mailtransact-sql.html "德瑞克:建立與組態 Database Mail，使用Transact-SQL為例"
[6]: https://smtp4dev.codeplex.com/ "CodePlex:smtp4dev"
[7]: http://demo.tc/post/793 "demoshop:如何在本機測試寄送郵件程式是否撰寫正確"