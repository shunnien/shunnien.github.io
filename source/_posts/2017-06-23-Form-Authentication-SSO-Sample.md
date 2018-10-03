---
layout: darft
title: 透過 IIS 的 Form Authentication 來進行 SSO
tags:
  - Asp.Net MVC
  - 'C#'
  - IIS
  - SSO
categories: 程式技術筆記
description: 透過 IIS 的 Form Authentication 來進行 SSO 範例
toc: false
date: 2017-06-23 21:41:46
---

## Introduction
雖然現在 .Net 的登入機制已經較少 Form Authentication，但是剛好看到這範例，分享一下。

## Conetent
透過使用相同的 Form Authentication 來使兩個網站的登入機制使用共同的資料。
沒有單一簽入(SSO)的流程
{% mermaid %}
  graph LR
  A(fa:fa-user-md User)
  A-->B2[fa:fa-sign-in 登入A網站]
  A-->B3[fa:fa-sign-in 登入B網站]
  B2-->C1[fa:fa-sign-in 網站A]
  B3-->C2[fa:fa-sign-in 網站B]
{% endmermaid %}

對比
使用單一簽入(SSO)的流程
{% mermaid %}
  graph LR
  A(fa:fa-user-md User)
  A-->B[fa:fa-sign-in SSO登入]
  B-->C1[fa:fa-sign-in 網站A]
  B-->C2[fa:fa-sign-in 網站B]
{% endmermaid %}

這可以明顯看出，登入方式變成一個 SSO 登入了，當然此處是指會員資料的取得，實際看頁面流程的話，就不是這樣的單純。
以下簡單列出 [arunendapally SSO][5] 範例的樹狀結構，可以看出範例列了三個網站
- SSO 單一簽入的網站
- 模擬網站 A
- 模擬網站 B

``` bash
├─SSO
│  ├─App_Data
│  ├─App_Start
│  ├─Controllers
│  ├─Models
│  └─Views
│      └─Account
├─WebApp1
│  ├─App_Data
│  ├─App_Start
│  ├─Controllers
│  ├─Models
│  └─Views
│      └─Home
└─WebApp2
    ├─App_Data
    ├─App_Start
    ├─Controllers
    ├─Models
    └─Views
        └─Home
```

登入檢查 FormsAuthentication
``` csharp
[AllowAnonymous]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public ActionResult Login(string username, string password, string returnUrl)
    {
      if (FormsAuthentication.Authenticate(username, password))
      {
        FormsAuthentication.SetAuthCookie(username, false);
        if (!string.IsNullOrEmpty(returnUrl))
        {
          return Redirect(returnUrl);
        }
        else
        {
          return RedirectToAction("Index", "Home");
        }
      }
      else
      {
        ModelState.AddModelError(string.Empty, "Invalid login details");
        ViewBag.ReturnUrl = returnUrl;
        return View();
      }
    }
```

以上都是程式方面的操作，比較值得注意的是，這範例是透過 IIS 的 **machine key** 來進行設定這三個網站是使用同一份登入資訊

``` xml
  <machineKey validationKey="E4451576F51E0562D91A1748DF7AB3027FEF3C2CCAC46D
  756C833E1AF20C7BAEFFACF97C7081ADA4648918E0B56BF27D1699A6EB2D9B6967A562CAD14767F163"
              decryptionKey="6159C46C9E288028ED26F5A65CED7317A83CB3485DE8C592"
              validation="HMACSHA256" decryption="AES" />
```

詳細的操作內容可以參考 [arunendapally blog 文章][4]，此處補充 IIS 的設定，首先在開啟 IIS ，選取 SSO 網站的電腦金鑰，並記錄下其**驗證金鑰**與**解密金鑰**，接著在網站 A 與網站 B，都點擊電腦金鑰
![電腦金鑰](https://lh3.googleusercontent.com/ox_n3XG4-E5lgM-Vj7fSPRKIE7XVz1APNLngPItF_o_4FTtAT_MZXdpD9jzx2wYmf-ROAu4S9AmkERfHSfwPFmbVC_xuUtDDxstAQn6Yy2K7z_X8Zu-rUkaDTrJaeQfemlOMs8EswWUQ290IB6MvjFHqypTi1BbjqwUZvFs67dCOFbwZlXAic_bckct5l9IAIQ7HkA8X_AzXTdGMGlO7xRuzk5GjBexdqukw0R8sENz66xQT1p93b56iC3Z3KNKbw2kFvXY21R9z7NNyzLfemAOensErAmcTu1TQs1iTIYnUogMQXFSPl3B9xBbf6AU_vIAZ8jj78C87wBI3-UP70HJCZz-FvZofW1j6G_kynL8YyExYShoFCHykH6DaPqpexTYPM0voumfgEzRZi3bdAaCjw1vRNKvuEVH7tMt1rWDTZeugkagjFSnHQ8NYXlcz8m-XEL6hCpa5jsxf8IYn0WJ-DleHvNuJR5j0MOE1nqurCmZWpb5GdIfRGYtXC0YRo1cAWwPgd9IA0D-jd2Wqv-qRGhmZZW6ZdQ5nk_kJwFW0IbXIScB7gXIaJJbX3Px-Wbkqm5j8GEydlqGxPQDUxJotGy6Pitoy-tRav1k0dEtr_WAff4E_nLZcLcOBXb-l3iF0fdKAFt0J2kwuAAkxNEUCTkbj8LFD3vKcF0h0nQ=w814-h431-no)
然後將 SSO 網站的**驗證金鑰**與**解密金鑰**設定到網站 A 與網站 B
![電腦金鑰設定](https://lh3.googleusercontent.com/gBUB2zILxBpRU-D5P27zEVZBog0wZ0m2A3Gg5gNe20xfA3G_frW22q5HvW6AkMq0Rt-6whxq4X7BtK58f2T4ynFLWnqvjWLKmOerCI5L9h45WDEuB8aXrvHO-qQ_0SE-Yc70tbLjAY810OqG7U9AgYpY4DzTRbCf_kRkCBvJW4xC-Nb9RPIjLxG3Ud_NSB-5OeCbfFkMbCmusYU_SCeu-TDCySfN6BVtv0jXGieTiGcGRBvmHLZDrC0fpTU3V4QovwhXhQvvM1QpCsaaDoBGlAhLQY9rknm9paljsg05SGa9WNKxsn20V_91hc93bFai9G8sxoS_NsPhB1DplIcn8-IyWnJv-W3xicKffy9lUHgbgqhtbqUfOOdusFlWgvrL8bm3KVjj9D18zmjvEztR7BsmJHXGsJG9CFSPFyOAY8ZzZt2KOccmWUsgT4BvUbdDG3SXsxzxf4JnkLdfK1NANQufSmVGFLzOnCeVR9MS4BnEa-6RIYyiHYjz4jLc8vxP8-erSi0mhKruJM8pIva_i-kTI1WZhPv8PVk9mxzK8dItF7b1sj0tp5vJExx0WDxoAJWHqaVEYB1yE64X71HZS7IJealTWwGbO5IFkmfi-10bTKEq55Wwr1N1HEh2N_e4AwpZPz1Tqn1mbc6zemS3T0X5rL193IYanJJWI-rrBQ=w849-h553-no)

這樣這範例就可以操作囉。
## Reference
此文的範例是參考 [arunendapally][4]，範例可以在 [Github][5] 取得
- [arunendapally blog][4]
- [arunendapally codeproject][1]
- [arunendapally github][5]
- [MSDN authentication][2]

[1]: https://www.codeproject.com/Articles/1140228/Implementation-of-Single-Sign-On-SSO-in-ASP-NET-MV
[2]: https://blogs.msdn.microsoft.com/webdev/2013/07/03/understanding-owin-forms-authentication-in-mvc-5/
[3]: http://mvolo.com/iis-70-twolevel-authentication-with-forms-authentication-and-windows-authentication/
[4]: http://arunendapally.com/post/implementation-of-single-sign-on-(sso)-in-asp.net-mvc
[5]: https://github.com/arunendapally/SSO