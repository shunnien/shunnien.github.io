title: SQLParameter名稱為啥不會對應
date: 2015-11-23 20:02:43
categories: [程式技術筆記]
tags: [C#, EntityFramework, ADO.NET]
description: SQLParameter 使用的小細節
---

## 緣起
承接[上篇][1]，在撰寫呼叫 Database Mail 的[Stored Procedure][2](預存程序)時，發現在使用[Parameter][3]上有些小地方需要注意；以前使用沒發現，因為呼叫[Stored Procedure][2]時使用的參數不多，所以都沒發現，這次記錄一下。

## 我的環境
``` bash
$ systeminfo
作業系統名稱:         Microsoft Windows 10 專業版
作業系統版本:         10.0.10240 N/A 組建 10240
作業系統設定:         獨立工作站
作業系統組建類型:     Multiprocessor Free
系統類型:             x64-based PC
處理器:               已安裝 1 處理器。
BIOS 版本:            American Megatrends Inc. 219, 2015/5/4
實體記憶體總計:       16,264 MB
```
#### Visual Studio Version
Visual Studio 2015
#### C# Version
``` bash
c:\Windows\Microsoft.NET\Framework\v4.0.30319
$ csc
Microsoft (R) Visual C# Compiler version 4.6.0079.0
for C# 5
```

## 使用方式
先介紹 SqlParameter 的三種使用方式，這三種方式都大同小異，至於為什麼要使用，可以看一下[余小章大大的說明][4]
- 第一種
指定參數名稱、格式與值
``` csharp
using (SqlConnection conn = new SqlConnection(connStr))
{
    conn.Open();
    using (SqlCommand cmd = new SqlCommand(str, conn))
    {
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.Add("@profile_name", SqlDbType.VarChar).Value = "SendMail";
        cmd.Parameters.Add("@recipients", SqlDbType.VarChar).Value = "test@test.com";
        cmd.Parameters.Add("@subject", SqlDbType.VarChar).Value = "ADO method 1 test";
        cmd.Parameters.Add("@body", SqlDbType.VarChar).Value = "Hello World";
        cmd.Parameters.Add("@importance", SqlDbType.VarChar).Value = "NORMAL";
        result = cmd.ExecuteNonQuery();
    }
}
```

- 第二種
指定參數名稱與值
``` csharp
using (SqlConnection conn = new SqlConnection(connStr))
{
    conn.Open();
    using (SqlCommand cmd = new SqlCommand(str, conn))
    {
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.Add(new SqlParameter("@profile_name", "SendMail"));
        cmd.Parameters.Add(new SqlParameter("@recipients", "test@test.com;test@test.com"));
        cmd.Parameters.Add(new SqlParameter("@subject", "ADO method 2 test"));
        cmd.Parameters.Add(new SqlParameter("@body", @"Hello World"));
        cmd.Parameters.Add(new SqlParameter("@importance", "NORMAL"));
        result = cmd.ExecuteNonQuery();
    }
}
```

- 第三種
一樣指定參數名稱與值
``` csharp
using (SqlConnection conn = new SqlConnection(connStr))
{
    conn.Open();
    using (SqlCommand cmd = new SqlCommand(str, conn))
    {
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@profile_name", "SendMail");
        cmd.Parameters.AddWithValue("@recipients", "test@test.com;test@test.com;test@test.com");
        cmd.Parameters.AddWithValue("@subject", "ADO method 3 test");
        cmd.Parameters.AddWithValue("@body", @"Hello World");
        cmd.Parameters.AddWithValue("@importance", "NORMAL");
        result = cmd.ExecuteNonQuery();
    }
}
```
上述的方法看起來都是正常的，但是如果沒有設定
``` csharp
cmd.CommandType = CommandType.StoredProcedure;
```
就會失去按照參數名稱對應的功能，只能按照順序對應(這順序是 Procedure 的參數宣告順序)；這情形出現在[Stored Procedure][2]上，也是因為[Database Mail][1]送信的參數很多，才發覺有這情形。

以下列出不使用`CommandType`的 Sql 字串
```
static void Main(string[] args)
{
	// 不使用 CommandType 的時候，呼叫 Procedure 必須指定參數名稱
	// 跟直接使用 Sql 字串查詢一樣
    string str = "msdb.dbo.sp_send_dbmail @profile_name,@recipients,@subject,@body,@importance";
	string connStr = ConfigurationManager.ConnectionStrings["DBConn"].ConnectionString;
    using (SqlConnection conn = new SqlConnection(connStr))
    {
        conn.Open();
        using (SqlCommand cmd = new SqlCommand(str, conn))
        {
            cmd.Parameters.Add(new SqlParameter("@profile_name", "SendMail"));
            cmd.Parameters.Add(new SqlParameter("@recipients", "test@test.com;test@test.com"));
            cmd.Parameters.Add(new SqlParameter("@subject", "ADO method 2 test"));
            cmd.Parameters.Add(new SqlParameter("@body", @"Hello World"));
            cmd.Parameters.Add(new SqlParameter("@importance", "NORMAL"));
            cmd.ExecuteNonQuery();
        }
    }
    Console.ReadKey();
}
```
其結果會是
![no use commandType](https://lh3.googleusercontent.com/v3jjenTq-EsxsTwIhvU7VfSQkuQlovyjuC-hF2Dynv2qoPTIkPyQWVIUF26UcJqzebppRd4EkH10V5oQ5sJTJIMK6yBo4QqRP4I-YsbWbwCQ6z8P-3Op2q_X3nx0l9axXw_hXyqgEmyhdkxNcKZdeUcpXiQPJ0i-DMrqoPK45o5IytMyPyYmUdDKWeLT6104BBvVQvhL9I3gArJGqXVY_p2SpC4lP_iD2cSIkrBDjnzRbr1SWKQbTaBIeeL1HyNVx_izVDq7v3u8yTlGXFaAB_BZjHhEuh1y1ecsojDcspneiPCvwMi5wdhokAIMG0ZgthGfiJkcGmjlJtukl2t_GbsdR7Jd-fgGc0v1G8rJzOOFzSEpPKSwMDfR4xtpdt3uTYWvPOEgzwGLv2e8nZV4wMqQFR8ZBFD_2fQiUi3pRTa4i1gEFohjsOy7ebz8xizP7mA0Uk-eKxQ1guCFZ8COIygGS4jT53qSMvyA5BXZI0qafnELoRPXaXNf0Yf9fcaYYNNfWWqujCUs-WGV3l3yyW85wLzLmPQWUbVXc4531qa-YdL8kya19snPkLHQR54tYKCryMBplgsj-OOEyTqtJmuJiprrEMGqiWcgPwQKKAmwe_xudOc9tCb6sD4NVmRYxw0TWg2pbNUL-9c9Zx7toALuMERaGzJobMEM3ylhqw=w557-h76-no)
對照一下 Procedure 的參數順序
![sp_send_dbmail code](https://lh3.googleusercontent.com/rFQ-vdsE5zxv09Q8bJOf6fzVq5bXfaQF76dBDx3kWbv6AAcl1L7--z0L--uc7WZs-kjBUIyNs30fmB_tTpWvnpEi1ziWYeOPUwtKhfPylSJ4K5FuomoQr51dz6UTWeCVyiw9bPLWBzDPnN7eEMdf3CPQ5Vv75wcZN-z325MTDgskjW2WrElBJQb5wNh4M-y3dP5AYVguXDEimvB7x1-DHxSxtyM3EG8wN1_DqljcyxHUacNFXYF8T6hOsYQO2UEPp3Lh3ZEhM4k7i83fYXAT1wVLLUNhFObnyocdBASug1ASoVrxi0OZ_0Txl6fQbXJnHE3s18-boVVLg73RzblHX3sW0oMuM0M1ODWPE70ikVDFQoBYgZ-MpUnjKBCUr7noQYDqpuXqsx5cdLGOPrRnHyDG6SnuKEUCWgqOl-pLrlTIn5dkaDiERshFFdNmSZtoC3cqXz8A4aEt6poB0Hf5X3L05-zJ7sysrVJ5r3TufUrE-JJyjee6Eq_ahIpmz0IkANcdS1NwUFvgD2Wjoaylm5-FPyhuA3VCf1StTj1wffCuB8lIAFh85P9QG1Ox-W08qyNH0HO5OYdFXCA0DLtJEpPMLIgc7JAtvbcWZ2lOPuMUZDUhLzaX6hsYx8qCjs5DVX9eVHE3Z4HOVXfw5BPdpkfKtcRvUMw5PReWyMo4nA=w588-h382-no)
所以如果不指定`CommandType`的話，Sql 字串的參數必須按照 Procedure 的參數順序輸入，這點一定要注意。

## 範例程式

[Github Repo](https://github.com/shunnien/SqlParameterTest)


## 參考資料
- MSDN:[Execute a Stored Procedure that Returns a Single Value][7]

[1]: http://shunnien.github.io/2015/11/21/Sending-DataBase-Mail-in-Sql-Server/
[2]: https://en.wikipedia.org/wiki/Stored_procedure "Wikipedia:Stored procedure"
[3]: https://msdn.microsoft.com/zh-tw/library/system.data.sqlclient.sqlparameter(v=vs.110).aspx "MSDN:SqlParameter 類別"
[4]: https://www.dotblogs.com.tw/yc421206/archive/2009/06/14/8819.aspx "余小章:為何/如何 使用 SQLParameter 物件"
[5]: https://msdn.microsoft.com/zh-tw/library/system.string.format(v=vs.110).aspx "MSDN:String.Format 方法"
[6]: https://msdn.microsoft.com/zh-tw/library/e80y5yhx(v=vs.110).aspx "MSDN:ADO.NET"
[7]: https://msdn.microsoft.com/en-us/library/37hwc7kt.aspx?f=255&MSPPError=-2147217396 "MSDN:Execute a Stored Procedure that Returns a Single Value"