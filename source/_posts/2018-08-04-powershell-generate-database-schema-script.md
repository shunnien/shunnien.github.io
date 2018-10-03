---
title: 使用 PowerShell 來產生 database schema script
categories: 程式技術筆記
tags:
  - Powershell
toc: false
date: 2018-08-04 20:09:47
---

# 使用 PowerShell 來產生 database schema script

[前一篇文章](https://shunnien.github.io/2018/07/21/sqlserver-Data-tier-Applications/)提到了 DAC ，但是遇到了 DAC 匯出失敗的問題，看訊息是部分資料表的因素，但是那些資料又是客戶自己的需求，所以利用 sqlserver 的產生 script 來進行結構備份紀錄，而自動化紀錄可以省時省力，此篇透過 [PowerShell][9] 來自動產生與處理
<!-- more -->

## [PowerShell ISE][10]

要撰寫 [PowerShell][9] 可以透過 [PowerShell ISE][10] 這是一個方便撰寫的工具

![powershell ISE](https://lh3.googleusercontent.com/SkkjcmzkUIpekZSf-FJb0ynNJakPwDu9doPWbZMmYLfoAjLEEPCv0Ynr8_Vt4mOYzdym5wN9UtuaDOyFJMJvtHzEn4Y_JjQYLbXnielt7jJMV4qrxwFIobJnGXuLRxQqA5IBSyFJsuxEnYiZGBLXPhUBNWQ-bf3wVSPIA15PDgjl3uG-OBZ8Ip13-KTamKtJy_czCHpSXwMnzLBr_8X9MVnUIdCYYd6rJqcF9Zn9U9zppYUXGm7KfMkln-aleKrD0kHWV55ONHU-HzngMGZMONl8AHxQNxVGsI6THw_HoHGPI4M5NMmEU6GsdmQnLjszExpb3Bo8LpLEeSC1xu6yuzvNn-VZUOKArOBPhQWBCii_uNfoNya7BydvrYyty9vEkJ6Mo50Dl73IbcvUmITMjv5I4uF0tM7qzkc-ODG8KHMGrettmViPkTmv_FerEsMVILET2neipsWxG_HPMLctjNmL-XHtO7r4TBjyMQgljNQfQHdUrKXcQTwxzcQFC6QyUZc6NSkhfoGEECt8HH6HB14Vz9xAhvokhsaUfUgs82TsayOKTs_2ygRb3N7FO7WA4prr5JLVQ_Vf-TYdjZ0bdoCdWimOj14iE3oRW48rJc6IyPt8KDNOXxs3f5L1hZvpd6-CXWM3UD9ZeddbhiNv1SxgxYoJ_UFF=w1443-h915-no)

## 撰寫內容

首先簡單說明處理流程

- 將會依使用者變動的部分設定為變數
- 檢查目的地資料夾是否存在，並建立
- 透過 [SMO](https://docs.microsoft.com/zh-tw/sql/relational-databases/server-management-objects-smo/overview-smo?view=sql-server-2017) 建立連線
- 匯出設定
- 匯出結構

以下將程式與註解說明

``` PowerShell
# 最後儲存匯出結構的路徑資料夾
$Filepath = 'D:\MyScriptsDirectory'

# 資料庫連線的 data source
$DataSource = '127.0.0.1'

# 資料庫名稱
$Database = 'databaseName'

# 取得今天日期，後續會利用此日期當檔案名稱的一部份
$today = Get-Date -Format yyyy_MM_dd

# 防呆設計，當目的資料夾不存在時，建立資料夾
$homedir = "$Filepath\"
if (!(Test-Path -path $homedir)) {
  Try { New-Item $homedir -type directory | out-null }
  Catch [system.exception] {
    Write-Error "error while creating '$homedir' $_"
    return
  }  
}

# 開啟或關閉指令碼偵錯功能、設定追蹤層級和切換嚴格模式
set-psdebug -strict

# 可自訂 Windows PowerShell 行為的變數
$ErrorActionPreference = "stop"

# 讀取 SMO assembly, 假如使用 SQL 2008 DLLs 需要載入 SMOExtended 和 SQLWMIManagement libraries
$ms = 'Microsoft.SqlServer'
$v = [System.Reflection.Assembly]::LoadWithPartialName( "$ms.SMO")
if ((($v.FullName.Split(','))[1].Split('='))[1].Split('.')[0] -ne '9') {
  [System.Reflection.Assembly]::LoadWithPartialName("$ms.SMOExtended") | out-null
}

$My = "$ms.Management.Smo" #

# 設定連線資訊
$mySrvConn = new-object Microsoft.SqlServer.Management.Common.ServerConnection
$mySrvConn.ServerInstance = "$DataSource"
$mySrvConn.MultipleActiveResultSets = $true
$mySrvConn.LoginSecure = $false
$mySrvConn.Login = "sa"
$mySrvConn.Password = "1qaz@WSX"
$mySrvConn.DatabaseName = "$Database"

$s = new-object ("$My.Server") $mySrvConn

# 進行連線
if ($s.Version -eq $null ) {Throw "Can't find the instance $Datasource"}
$db = $s.Databases[$Database]
if ($db.name -ne $Database) {Throw "Can't find the database '$Database' in $Datasource"};

$transfer = new-object ("$My.Transfer") $db

# 匯出設定
$CreationScriptOptions = new-object ("$My.ScriptingOptions")
# yes, we want these
$CreationScriptOptions.ExtendedProperties = $true
# and all the constraints
$CreationScriptOptions.DRIAll = $true
# Yup, these would be nice
$CreationScriptOptions.Indexes = $true
# This should be included when scripting a database
$CreationScriptOptions.Triggers = $true
# this only goes to the file
$CreationScriptOptions.ScriptBatchTerminator = $true
# of course
$CreationScriptOptions.IncludeHeaders = $true;
#no need of string output as well
$CreationScriptOptions.ToFileOnly = $true
# not necessary but it means the script can be more versatile
$CreationScriptOptions.IncludeIfNotExists = $true
$CreationScriptOptions.Filename = "$($FilePath)\$($Database)_$($today)_Build.sql";
$transfer = new-object ("$My.Transfer") $s.Databases[$Database]

# tell the transfer object of our preferences
$transfer.options = $CreationScriptOptions
$transfer.ScriptTransfer()
"All done"
```

這是按照 [Automated Script-generation with Powershell and SMO][4] 此篇文章的資料，重新調整撰寫的範本，目的是設定排程進行定期結構備份，後續還可以參考 [Database Deployment: The Bits – Database Version Drift][2] 進行備份比較等...

## 排程設定

排程設定主要是因為 **.ps1** 不像是 **.bat** 直接執行，所以需要透過 [PowerShell][9] 程式，再把撰寫的範本路徑設定到引數

![schedule setting](https://lh3.googleusercontent.com/TmrI92StXFgAKpTFhzdJO63tDniKA8gkz4Z9JohXTBVVs0cJkoC4hnB2A-g-VC4nBZ_X1GiN-FPbyllfQHjTwn59JqY5HiU9_9BR-wSNMde5KOt1DDzFLBK5bYA4HpGG3vtQyYbmZGd8NimYqRzYCwnvMrzdVnfNawXB-XaAMEbZyjolNvSKLL_1-unHto5rkMYnX9F-sg3diHECN8tlNGtdyg445m4p582F7aouDJoh6sDUFFT4dsvhnMF_yhTQcus0v9aIRUNwDpVXlbJ3VVvEywS0Dvq7R9z1JmnKWWQWLbauYx_IUobKdbDWm_NInaK91DUbV27qKNo5Qy-MKt5J-yF_Bdr6UN444nCq5aTDUUx_n9GJrxZwdMw79pGgRY6Lm13HPUtN9XNqcgvFXRpxYjY6jPerZmTBANTjUhmjJOBBmCW7jAdmVGvEWFduAukjRa1px9p3CDzvzc6T17FQ8n20IQE3YcCcFkdhfKYcG3idoxumDdu0HWxQTm9qRG-IvBVXGuhhwvH5KbYqJfjYTclAX3PP2Ya2Mp2c8XEx_hv8wcxrMDpIr54yLoeh6k9bhUP5U0C1F4_S-a8Cj5fSyHabE0U0ZlQlvl-zxzkW5OmqGytz7BEWSoKnhC7fGe4nq9Ef5b_Ktw8DoOh9qICwsTPLOJFW=w497-h541-no)

## 參考資料

[我的 GIST](https://gist.github.com/shunnien/1bd60b2d8fe9c06578a214d9313673e8)

<script src="https://gist.github.com/shunnien/1bd60b2d8fe9c06578a214d9313673e8.js"></script>

> powershell 學習資源

- [IT邦鐵人賽 powershell][1]

> 延伸閱讀

- [Automated Script-generation with Powershell and SMO][4]
- [Database Deployment: The Bits – Database Version Drift][2]
- [Use PowerShell to Script SQL Database Objects][5]
- [Load the SMO Assemblies in Windows PowerShell][6]
- [使用Windows PowerShell 來執行 Cloudberry 的指令並進行排程備份][7]
- [powershell 檢查服務並且重新自動啟動][8] 裡面包含建立排程與工作的設定教學
- [Powershell Wiki][9]

> 其餘工具

- [WinMerge][3]

[1]: https://ithelp.ithome.com.tw/users/20005121/ironman/54?page=1
[2]: https://www.red-gate.com/simple-talk/sql/database-administration/database-deployment-the-bits---database-version-drift/
[3]: http://winmerge.org/?lang=en
[4]: https://www.red-gate.com/simple-talk/sql/database-administration/automated-script-generation-with-powershell-and-smo/
[5]: https://blogs.technet.microsoft.com/heyscriptingguy/2010/11/04/use-powershell-to-script-sql-database-objects/
[6]: https://docs.microsoft.com/en-us/sql/powershell/load-the-smo-assemblies-in-windows-powershell?view=sql-server-2017
[7]: http://s3help.cloudbox.hinet.net/index.php/cloudberry-buckup
[8]: https://dotblogs.com.tw/jamesfu/2014/05/16/autostartservice
[9]: https://zh.wikipedia.org/wiki/Windows_PowerShell
[10]: https://docs.microsoft.com/zh-tw/powershell/scripting/core-powershell/ise/introducing-the-windows-powershell-ise?view=powershell-6