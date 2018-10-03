---
title: .Net Core Note
categories: 程式技術筆記
tags: []
toc: false
---

``` bash
dotnet --info
```

- RID

Runtime Identity 每台電腦執行都會有一個名稱

**Net Core** 不需要升級，直接安裝新版本即可，因為每一版本皆會保留

- dotnet help 顯示命令更詳細的線上文件
- dotnet new 初始化指定範本的 C# 或 F# 專案
- dotnet restore 還原所指定應用程式的相依性
- dotnet build 建置 .NET Core 應用程式
- dotnet msbuild 提供對 MSBuild 命令列的存取
- dotnet run 從原始檔執行應用程式
- dotnet publish 發行 .NET Core 應用程式
- dotnet clean 清除組建輸出
- dotnet pack 建立您程式碼的 NuGet 套件
- dotnet sln 建立方案檔中新增、移除及列出專案的選項
- dotnet store 在執行階段套件存放區中儲存組件
- dotnet test 使用測試執行器執行測試

# 開發 .NET Core 必備的執行環境與好用工具

# [ 作業系統 ]

.NET Core 2.0 支援的作業系統版本，請參考以下文件：[.NET Core 2.0 - Supported OS versions](https://github.com/dotnet/core/blob/master/release-notes/2.0/2.0-supported-os.md)

- Windows 7 SP1+
- Windows 8.1
- Windows 10 1607+
- Windows Server 2008 R2 SP1+
- Mac OS X 10.12+   以上版本
- Red Hat Enterprise Linux (RHEL) 7
- CentOS 7
- Oracle Linux 7
- Fedora 25, 26
- Debian 9, 8.7+
- Ubuntu 17.10, 17.04, 16.04, 14.04
- Linux Mint 18, 17
- openSUSE 42.2+
- SUSE Enterprise Linux (SLES) 12 SP2+

# [ 開發工具 ]

- Windows
  - [.NET Core SDK](https://www.microsoft.com/net/download/windows)
  - [Visual Studio Code](https://code.visualstudio.com/)
  - [Visual Studio 2017](https://www.visualstudio.com/vs/community/) ( [Latest Updates](https://www.visualstudio.com/zh-tw/news/releasenotes/vs2017-relnotes) )
  - [ILSpy - .NET Decompiler](https://github.com/icsharpcode/ILSpy)
  - [Nuget Packages Explorer](https://github.com/NuGetPackageExplorer/NuGetPackageExplorer)
- macOS
  - [.NET Core SDK](https://www.microsoft.com/net/download/macos)
  - [Visual Studio Code](https://code.visualstudio.com/) 
  - [Visual Studio for Mac](https://www.visualstudio.com/vs/visual-studio-mac/)
- Linux
  - [.NET Core SDK](https://www.microsoft.com/net/download/linux)
  - [Visual Studio Code](https://code.visualstudio.com/)

# [ 擴充套件 ]

- Visual Studio Code
  - 只要安裝 [.NET Core Extension Pack](https://marketplace.visualstudio.com/items?itemName=doggy8088.netcore-extension-pack) 即可！
    - [.NET Core Tools](https://marketplace.visualstudio.com/items?itemName=formulahendry.dotnet)
    - [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)
    - [C# Snippets](https://marketplace.visualstudio.com/items?itemName=jorgeserrano.vscode-csharp-snippets)
    - [C# Extensions](https://marketplace.visualstudio.com/items?itemName=jchannon.csharpextensions)
    - [C# FixFormat](https://marketplace.visualstudio.com/items?itemName=Leopotam.csharpfixformat)
    - [Super Sharp (C# extensions)](https://marketplace.visualstudio.com/items?itemName=craigthomas.supersharp)
    - [C# XML Documentation Comments](https://marketplace.visualstudio.com/items?itemName=k--kato.docomment)
    - [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
    - [NuGet Package Manager](https://marketplace.visualstudio.com/items?itemName=jmrog.vscode-nuget-package-manager)
    - [MSBuild project tools](https://marketplace.visualstudio.com/items?itemName=tintoy.msbuild-project-tools)
    - [ASP.NET Core Snippets](https://marketplace.visualstudio.com/items?itemName=rahulsahay.csharp-aspnetcore)
    - [ASP.NET Helper](https://marketplace.visualstudio.com/items?itemName=schneiderpat.aspnet-helper)
    - [mssql](https://marketplace.visualstudio.com/items?itemName=ms-mssql.mssql)
    - [Paste JSON as Code](https://marketplace.visualstudio.com/items?itemName=quicktype.quicktype)
- Visual Studio 2017
  - [.NET Portability Analyzer](https://marketplace.visualstudio.com/items?itemName=ConnieYau.NETPortabilityAnalyzer)
    - [.NET Portability Analyzer-.NET | Microsoft Docs](https://docs.microsoft.com/zh-tw/dotnet/standard/portability-analyzer)
  - [Browser Sync](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.BrowserSync)
  - [Browser Reload on Save](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.BrowserReloadonSave)
  - [QuickApp - ASP.NET Core/AngularX Project Template](https://marketplace.visualstudio.com/items?itemName=adentum.QuickApp-ASPNETCoreAngularXProjectTemplate)
  - [Project File Tools](https://aka.ms/projfiletools) ( [GitHub](https://github.com/dotnet/ProjFileTools) )
- Visual Studio for Mac
  - 目前尚未有擴充套件

# [ 遠端管理工具 ]

- 檔案傳輸工具
  - [WinSCP](https://winscp.net/eng/download.php)
    - [choco install winscp](https://chocolatey.org/packages/winscp)
  - [FileZilla Client](https://filezilla-project.org/download.php?type=client)
    - [choco install filezilla](https://chocolatey.org/packages/filezilla)
* 遠端連線工具
  - [PuTTY](https://www.putty.org)
    - [choco install putty](https://chocolatey.org/packages/putty)
  - [OpenSSH for Windows](https://github.com/PowerShell/Win32-OpenSSH/releases)
    - [choco install openssh](https://chocolatey.org/packages/openssh)

# [ 其他學習資源 ]

- [C# Guide | Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/csharp/)
- [.NET Core Guide | Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/core/index)
- [Samples and tutorials | Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/samples-and-tutorials/)

# .NET Core 延伸學習資源

## 官方資源

- [微軟 .NET 官方網站](http://dot.net/)
- [.NET Core 指南 | Microsoft Docs](https://docs.microsoft.com/zh-tw/dotnet/core/)

## 優質部落格

- [.NET Blog | A first-hand look from the .NET engineering teams](https://blogs.msdn.microsoft.com/dotnet/)
- [.NET Web Development and Tools Blog | Your official information source from the .NET Web Development and Tools group at Microsoft.](https://blogs.msdn.microsoft.com/webdev/)
- [A Journey In .NET Core – From .NET 4.6.1 to .NET Core](https://dotnetcore.gaprogman.com)

## 免費電子書

- [Exploring .NET Core with Microservices, ASP.NET Core, and Entity Framework Core](https://www.manning.com/books/exploring-dot-net-core)
  - [Free .NET Core eBook, including ASP.NET Core and EF Core](https://andrewlock.net/free-net-core-ebook-including-asp-net-core-and-ef-core/)
- [Architecting Modern Web Applications with ASP.NET Core and Azure eBook](https://aka.ms/webappebook)
- [Entity Framework Core Succinctly](https://www.syncfusion.com/ebooks/entity_frame_work_core_succinctly)
- [ASP.NET Core Succinctly](https://www.syncfusion.com/ebooks/asp_net_core_succinctly)
- [.NET Core Succinctly](https://www.syncfusion.com/ebooks/net_core_succinctly)

## 範例程式

- [Learn .NET Core by example· jonhilton.net - Making sense of .NET](https://jonhilton.net/2016/10/12/learning-dotnet-core-by-example/)
- [ASP.NET Core codebase containing real world examples](https://github.com/gothinkster/aspnetcore-realworld-example-app)
  - [RealWorld](https://realworld.io/) 包含了大量 "真實世界" 的範例程式，各種語言、框架都有實作！
- [125 samples for aspnetcore fundamentals](https://github.com/dodyg/practical-aspnetcore)
  - 每日更新的 ASP.NET Core 範例程式！
- [Blog engine for ASP.NET Core 2.0](https://github.com/madskristensen/Miniblog.Core)
  - [Miniblog.Core is a new blog engine built using ASP.NET Core 2.0](https://madskristensen.net/blog/miniblogcore-is-a-new-blog-engine-built-using-aspnet-core-20/)
- [eShopOnWeb](https://github.com/dotnet-architecture/eShopOnWeb)
  - 這也是一套相當完整的電子商務網站範例，完全用 ASP.NET Core 2.0 技術開發！

## 好用工具

- [中、英文網頁切換的瀏覽器書籤小工具](https://github.com/miniasp/en-zh-bookmarklet)
- [開發 .NET Core 必備的執行環境與好用工具](https://gist.github.com/doggy8088/bea988c953f9a86522cc69208a717c08)

## 社群資源

- [台灣 .NET 技術愛好者俱樂部](https://www.facebook.com/groups/DotNetUserGroupTaiwan/)

``` txt
dotnet help
dotnet new
dotnet restore
dotnet build
dotnet msbuild
dotnet run
dotnet publish
dotnet clean
dotnet pack
dotnet sln
dotnet store
dotnet test

rem 先建立並進入一個 solution1 空白資料夾
dotnet new -l
rem dotnet new --install Microsoft.AspNetCore.SpaTemplates::*
dotnet new console -o console1
cd console1
rem 編輯 Program.cs
rem 查看 console1.csproj (請注意 TargetFramework 屬性)
dotnet restore
dotnet build
dotnet run
dotnet clean
dotnet publish
dotnet bin/Debug/netcoreapp2.0/console1.dll

rem 回到 solution1 資料夾
cd ..
dotnet new classlib -o classlib1
cd classlib1
rem 編輯 Class1.cs
rem 查看 classlib1.csproj (請注意 TargetFramework 屬性)
dotnet restore
dotnet build
dotnet build -c Release
dotnet msbuild /p:Configuration=Release
dotnet clean
dotnet pack
dotnet publish
dotnet publish -c Release
dotnet msbuild /t:Publish /p:Configuration=Release

rem 回到 solution1 資料夾
cd ..
dotnet new mstest -n classlib1.test
cd classlib1.test
dotnet add reference ..\classlib1\classlib1.csproj
rem 編輯 UnitTest1.cs
rem 查看 classlib1.test.csproj (請注意 TargetFramework 屬性)
rem (列出專案中所有測試案例)
dotnet test -t 
rem (執行測試)
dotnet test
dotnet build
dotnet vstest bin\Debug\netcoreapp2.0\classlib1.test.dll
rem 回到 solution1 資料夾
cd ..
dotnet new sln
dotnet sln solution1.sln add console1\console1.csproj
dotnet sln solution1.sln add classlib1\classlib1.csproj
dotnet sln solution1.sln add **/*.csproj (Linux/macOS)
dotnet restore solution1.sln
dotnet build solution1.sln
dotnet clean solution1.sln
dotnet publish solution1.sln
dotnet pack solution1.sln

dotnet add reference 新增專案參考
dotnet list reference 列出專案參考
dotnet remove reference 移除專案參考
dotnet add package 新增 NuGet 套件
dotnet remove package 移除 NuGet 套件
dotnet nuget locals 列出或清除本機 NuGet 套件快取
dotnet nuget delete 從伺服器刪除或取消列出套件
dotnet nuget push 將套件推送至伺服器並發行
回到 console1 資料夾
dotnet add reference ..\classlib1\classlib1.csproj
dotnet list reference
dotnet remove reference ..\classlib1\classlib1.csproj
dotnet list reference
dotnet add package Newtonsoft.Json
dotnet remove package Newtonsoft.Json
dotnet add package -s \\server\NuGet mylib
dotnet nuget locals all --list



"files.associations": {
    "*.master": "csharp",
    "*.aspx":"html",
    "*.csproj":"msbuild"
  }
```