---
title: 解決 Microsoft.SqlServer.Types 參考使用的問題
categories: 程式技術筆記
tags:
  - Troubleshooting
  - Asp.Net MVC
toc: false
date: 2019-06-24 12:01:14
---

## 解決 Microsoft.SqlServer.Types 參考使用的問題

透過 **Entity Framework** 使用 **SQL Server** 的空間資料 (**DbGeography**) 相當便利，但是需要 [**Microsoft.SqlServer.Types**][6] 參考，而有時參考後又出現問題。

Exception 訊息：

> System.InvalidOperationException
>
> > HResult=0x80131509
> >
> > Message=Spatial types and functions are not available for this provider because the > assembly 'Microsoft.SqlServer.Types' version 10 or higher could not be found.
> >
> > Source=EntityFramework.SqlServer

<!-- more -->

## [Microsoft.SqlServer.Types][6] 安裝

透過 **Nuget** 安裝 [**Microsoft.SqlServer.Types**][6] 套件，可以透過介面安裝或是透過指令安裝，安裝指令如下：

```powershell
Install-Package Microsoft.SqlServer.Types
```

安裝好之後，請仔細閱讀 **readme.htm** ，其中說明如何將套件註冊進程式中

### ASP.NET Web Sites

在 **Web Form** 中，開啟 **Default.aspx.cs**

```csharp
public partial class _Default : System.Web.UI.Page
{
    static bool _isSqlTypesLoaded = false;

    public _Default()
    {
        if (!_isSqlTypesLoaded)
        {
            SqlServerTypes.Utilities.LoadNativeAssemblies(Server.MapPath("~"));
            _isSqlTypesLoaded = true;
        }
    }
}
```

### ASP.NET Web Applications

開啟 **Global.asax.cs** 添加以下程式碼：

```csharp
SqlServerTypes.Utilities.LoadNativeAssemblies(Server.MapPath("~/bin"));
```

### Desktop Applications

在執行空間操作前執行以下程式碼：

```chsarp
SqlServerTypes.Utilities.LoadNativeAssemblies(AppDomain.CurrentDomain.BaseDirectory);
```

## 解決引用錯誤

就如同此文一開始所提到的 **exception**，按照[**Microsoft.SqlServer.Types**][6]套件的說明註冊引用，有時還是會出現問題，可能是 **Entity Framework** 版本因素或是伺服器沒有對應版本的[**Microsoft.SqlServer.Types**][6]或是沒有註冊引用到；[stack overflow][7] 此篇的討論方法可以解決我此次遇到的問題

- 方法一

添加參照

``` csharp
SqlProviderServices.SqlServerTypesAssemblyName = Assembly.GetAssembly(typeof(Microsoft.SqlServer.Types.SqlGeography)).FullName;
```

- 方法二

直接在 **config** 檔案中進行參照，需要注意版本號

``` xml
<assemblyBinding>
    <dependentAssembly>
      <assemblyIdentity name="Microsoft.SqlServer.Types" publicKeyToken="89845dcd8080cc91" culture="neutral" />
      <bindingRedirect oldVersion="10.0.0.0-11.0.0.0" newVersion="14.0.0.0" />
    </dependentAssembly>
  </assemblyBinding>
```

## 取得 **PublicKeyToken**

[**Microsoft.SqlServer.Types**] 的 DLL 的路徑，可以從以下路徑查找

``` txt
C:\Windows\assembly\GAC_MSIL\Microsoft.SqlServer.Types
```

根據以上的 DLL 取得 **PublicKeyToken** 的方式，可以透過 **powershell**

``` powershell
([system.reflection.assembly]::loadfile("c:\MyDLL.dll")).FullName
```

## 參考資料

- [stack overflow how use Microsoft.SqlServer.Types in WCF Service Application][1]
- [Github EntityFramework6 issue #244][2]
- [Mismatch using Microsoft.SqlServer.Types][3]
- [solving spatial types and functions are not available with entity framework][4]
- [find publickeytoken][5]
- [Microsoft.SqlServer.Types 找不到正確版本問題][8]

[1]: https://stackoverflow.com/questions/54004109/how-use-microsoft-sqlserver-types-in-wcf-service-application
[2]: https://github.com/aspnet/EntityFramework6/issues/244
[3]: https://social.msdn.microsoft.com/Forums/vstudio/en-US/bc51cd91-0c76-40c7-ab1a-f9dadb9f067a/mismatch-using-microsoftsqlservertypes?forum=visualstudiogeneral
[4]: https://www.andrewcbancroft.com/2017/03/27/solving-spatial-types-and-functions-are-not-available-with-entity-framework/
[5]: https://stackoverflow.com/questions/1710935/how-do-i-find-the-publickeytoken-for-a-particular-dll
[6]: https://www.nuget.org/packages/Microsoft.SqlServer.Types/
[7]: https://stackoverflow.com/questions/13174197/microsoft-sqlserver-types-version-10-or-higher-could-not-be-found-on-azure/40166192#40166192
[8]: https://blog.developer.money/dapper-%E4%BD%BF%E7%94%A8-microsoft-sqlserver-types-%E6%89%BE%E4%B8%8D%E5%88%B0%E6%AD%A3%E7%A2%BA%E7%89%88%E6%9C%AC%E5%95%8F%E9%A1%8C-a7848b95b6e5
