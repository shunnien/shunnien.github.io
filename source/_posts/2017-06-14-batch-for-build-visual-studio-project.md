title: Visual Studio 專案透過指令列建置
categories: 程式技術筆記
tags:
  - batch
  - Visual Studio
description: 手動進行 Visual Studio 專案建置
toc: false
date: 2017-06-14 11:44:17
---

## Introduction
建立批次檔案的建置指令，提供後續 hook up 的機制。


## Conetent
引用 [MSDN][2] 上的說明
> 若要建置方案中的特定專案的特定目標
> 在命令列中，輸入 `MSBuild.exe <SolutionName>.sln,` ，其中 **<SolutionName>** 對應至包含您想要執行的目標的方案的檔案名稱。
> 指定的目標之後 /t 切換格式 **ProjectName:TargetName**。
> 範例
> 下列範例會執行 **Rebuild** 的目標 **NotInSlnFolder** 專案，然後再執行 **Clean** 的目標 **InSolutionFolder** 專案中，位於 **NewFolder** 方案資料夾。
> 
``` bash
msbuild SlnFolders.sln /t:NotInSlnfolder:Rebuild;NewFolder\InSolutionFolder:Clean  
```
知道命令列的指令後，可以參考 [MSDN 指令列說明][3] 寫成批次檔案(.bat)

``` bat
@echo off
pause

REM ==指定要使用的.NET版本.==
set NetVer=v4.0.30319

REM ==指定建置資訊結果資訊輸出的目錄==
set BuildInfoDir=自動建置結果

REM ==指定要編譯的方案檔==
set SlnFile=projectName.sln

set Builders=%windir%\Microsoft.NET\Framework\%NetVer%\MSBuild.exe
if not exist %BuildInfoDir%\ mkdir %BuildInfoDir%\

REM 步驟 ==.更新最新的程式.==
svn update

REM 步驟 ==.開始執行建置動作.==
REM 建立 摘要、警告、錯誤 log 文件
%Builders% %SlnFile% /t:Rebuild /p:Configuration=Release /flp:Summary;Verbosity=minimal;LogFile=%BuildInfoDir%\摘要.txt /flp1:warningsonly;logfile=%BuildInfoDir%\警告.txt  /flp2:errorsonly;logfile=%BuildInfoDir%\錯誤.txt

pause
```

## Reference
- [MSDN Sln Build][2]
- [MSDN  Command-Line Reference][3]
- [MSDN C# Compiler][1]

[1]: https://msdn.microsoft.com/zh-tw/library/78f4aasd(v=vs.110).aspx
[2]: https://msdn.microsoft.com/zh-tw/library/ms171486.aspx
[3]: https://msdn.microsoft.com/zh-tw/library/ms164311.aspx