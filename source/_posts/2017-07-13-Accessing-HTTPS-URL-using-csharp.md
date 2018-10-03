title: '使用 C# 連接 HTTPS URL'
categories: 程式技術筆記
tags:
  - 'C#'
toc: false
date: 2017-07-13 17:12:17
description:
---

有朋友忽然在問 HTTPS 怎麼直接進行連接，想說乾脆直接整理一下好了；連接不外是透過 **[WebRequest][6]** 這個類別去操作，一個是直接使用 [**HttpWebRequest**][4]，另一個是使用 [**WebClient**][5] 這個 Component <!-- more -->，以下附上針對這兩者的簡單範例。

兩個方式中，比較需要注意的是強制讓憑證通過，一般瀏覽器憑證不通過還是會顯示出來，但是在程式這邊，不通過的話，後續就不會有結果；

- HttpWebRequest
詳細資料可以參考 [MSDN HttpWebRequest][4] 上的說明

``` csharp
void Main()
{
    var url = "https://www.moi.gov.tw/";
    string results;

    // 強制認為憑證都是通過的，特殊情況再使用
    //ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
    request.AutomaticDecompression = DecompressionMethods.GZip;

    // 加入憑證驗證
    request.ClientCertificates.Add(new System.Security.Cryptography.X509Certificates.X509Certificate());

    HttpWebResponse resp = (HttpWebResponse)request.GetResponse();
    using (StreamReader sr = new StreamReader(resp.GetResponseStream()))
    {
        results = sr.ReadToEnd();
        sr.Close();
    }
    results.Dump();
}

```
![httpWebRequest](https://lh3.googleusercontent.com/tP_WQvhWmZVlxP4TrUWACetMCwK2lBrkDvju_H51KQq4U--mVFoLfUSUHRf3Xy-nABlkUPOuXO_u7F5LO3YIvOFSe4A1hpKBEinCj_b-hTahdCUgu9ywK7jcy8Jn87hp-p-ktjoxJSqpsz3hS2VBGYdJdjLTpDmtychHhLSrNgn2rAeJ_8Jf-_qJqFnDUKtBcK4onKBp2dTQE5BVSGggpZmWKfAXCO_RGOS3CGFfsAFMHvHTs29XHbah4XjVY2WrP3eaCX-ikAsVaZOIC4sjiE7FlzinDVnhtBcRARhKw1caWe9ahSQRYCUKHaCuT88jc2x0FjUPBPNC50B4UzKKO20dRg8fUbuhFgtL0ecba-G3tdUk_XcAIqeZnDPEUQudINp3hpRvZZM8Vel1UNYseHh9dTOybygr7PxH0yvTrWJrKRTEBrgODx5g1xBAMhb-CC4kyPKDeIbSTjrccY-StpHpNrpYgCektnJiwY6X7hLLGUKXtyaRGhl3ZeTU6Xkh3PAnqZO9cxxpUWlhcP_ypdRzucHGyqvbUe0_vs0vTkV9uzlRCrXjCW4YBvcNUHRZubx0Ht0wmFQXRFEg-yaDAbrsUD31EM5t0nfxJkPWLtBi4_HZ409x7ir-PgPDuU6mxK8UEZjTwdm_KLswIf4zq8MIBGMDRm4Re_XRGq1GNKxS8w=w861-h665-no)

- WebClient
詳細資料可以參考 [MSDN WebClient][5]

``` csharp
void Main()
{
    string html = string.Empty;
    string url = @"https://www.moi.gov.tw/";

    WebClient wc = new WebClient();

    // 強制認為憑證都是通過的()
    // ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
    wc.Encoding = Encoding.UTF8;
    html = wc.DownloadString(url);
    html.Dump();
}
```

![WebClient](https://lh3.googleusercontent.com/KjgMHWy0mbAo8K-oOI-0PQJpJf6IgnqvjnMPYcp5mZwEd9klmYxMQQ24zC1muWKZvTKeep_IelK9mwFUDgj8izE-sYejR7LHwPqNqCyZS3sqOZrs7a1lw6E9zgWcBkiQPahaVED6F3ipXxKdACCnbKUl_BXUfpIPzPuHKqH7_rjpPPEivJBPZF822YweEhV4pc5YEdG15NOPJ83m2Dl7g_h31mRT5fhSvx3A9DAfSt7Zxr9ztv6TR56fBTIm9XWriMxUNWKQiWJpdOLJt5CiLQCsHYf1OMtvTIJGV7Ep2YtRkxn8jdfo21PHSfVK7VDGiFfGZLiFPXl2BiiPALxgF_Y6njQgmOJ4ajfVt0Yuyjf0PqYRRX0qZn6pv-1F_82WISkP-zV_NbirF3KTMzB0oiEAL_gw1S2cEBtBctpBwGAybM3eT-0WRXONhZwQ0JeZkM8Vm9c14bj3QBo2I6h78LT4eK2tR6iQRs3eeTLsjorf2FjGkLVnHzrXsCGB63XOkgN2i4_xAKtWVuhbmcqEEfjZYdNgAEshfuoC0yVM_Vg9jGrGVQ5jQQMJVQayqlF02jnyXTdBPDi-n-7MD4AFl_LFoHtU33C7HVaAw3SrWBPWLBPvlDE1PHNv_MPkc8PPOqgJOaDK69C5vIugJNsZ8AvLI72fsZg8OGV65nggIL2ivA=w852-h664-no)

## 參考資料
- [**stackoverflow** Accessing HTTPS URL from Console Application using C#][1]
- [**stackoverflow** Make Https call using HttpClient][2]
- [**stackoverflow** C# how to properly make a http web GET request][3]
- [MSDN HttpWebRequest 類別][4]
- [MSDN WebClient Class][5]
[1]: https://stackoverflow.com/questions/35308945/accessing-https-url-from-console-application-using-c-sharp
[2]: https://stackoverflow.com/questions/22251689/make-https-call-using-httpclient
[3]: https://stackoverflow.com/questions/27108264/c-sharp-how-to-properly-make-a-http-web-get-request
[4]: https://msdn.microsoft.com/zh-tw/library/system.net.httpwebrequest(v=vs.110).aspx
[5]: https://msdn.microsoft.com/en-us/library/system.net.webclient(v=vs.110).aspx
[6]: https://msdn.microsoft.com/zh-tw/library/system.net.webrequest(v=vs.110).aspx