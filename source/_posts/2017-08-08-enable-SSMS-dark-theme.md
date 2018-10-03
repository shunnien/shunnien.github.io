title: SSMS 2016 啟用黑色主題
categories: 程式技術筆記
tags:
  - SQLServer
toc: false
date: 2017-08-08 14:18:59
description:
---

許多開發工具介面都提供了黑色主題介面， SSMS (SQL Server Management Studio) 也提供了主題選擇，但是沒有黑色主題的選項。<!-- more -->其實微軟已經在實驗提供這功能了，所以可以按照以下的方法開啟這未開放的功能喔。
![SSMS 2016 option](https://lh3.googleusercontent.com/P-tqCdQTbeaSodHPJv1UlbGcBLa_e9GyAfOG9MCd7IOKzje0d5GkPN8BJ88xYvkgPGyfHKbYd5FnDUPw-DoIDJiWAFO9gtxN7hyETtUI50Xp1RosDtUKyPancdr-6z5YKZ94YuXUN2CjAiY1UKCb72B4QAggv26YHg2xuyfiSS8aiRFcHOgzZfAizYpo9aPERf6Ce-j0xknD4zzX0C4j7OWcNJVuhlpjV8TuQhR4xAXSF-8XrpH-EGMHNsH7iscmi15GGWyruJ-W7rrMr09dC--VP33ygqoGG-K7oTAKhK8jUu5S6NSrx4NiP9aiISNYpC__6dPYzXePmkG3rDlCFoTGJOLrE7KjD0PL1Njqf-z8yzc4i7Qw-CplHWV38mxlAFCQDim8ZroyuqLPCr4sFq9EBUC6UEr9jQgZ4rpP2cjiydDUcipyZF2rb3mscxaWtZivIfzUlqj_3EyLitfJXRsegUYN2V76eAF6g9QfNI1jq4uyqe558y0LVY52iRM3Ni1hRnId_jqsXBYlW0KPX24yNI2s4D7y8zZHuV7zCWEZ9rKwUmxZ4NRM1qHF_CaLwIOhdh4kdkLdquz7Rr7xOSluJonP_meVo__8xly9aq_2kpIiBJpyOtMKBfwZ2-GEgQ-L_pdf9PNapS3YdfOhYMfiK-lnQ-yLA3gClliG_13wdw=w575-h235-no)

先在以下路徑找尋 **ssms.pkgundef** 這檔案，然後使用記事本(或是其他文字編輯器)開啟，記得使用管理者權限。
```
C:\Program Files (x86)\Microsoft SQL Server\130\Tools\Binn\ManagementStudio
```

開啟後，搜尋 **Remove Dark theme** 這個段落，然後使用 `//` 進行註解，如以下段落：

``` txt
// Remove Dark theme
// [$RootKey$\Themes\{1ded0138-47ce-435e-84ef-9ec1f439b749}]
// [$RootKey$\AD7Metrics\PortSupplier\{4103F338-2255-40C0-ACF5-7380E2BEA13D}]
// [$RootKey$\External Tools\Error Loo&kup]
// [$RootKey$\LightSwitch]
// [$RootKey$\Debugger\LaunchHooks110]
// [$RootKey$\DiagnosticsHub]
// [$RootKey$\FeatureFlags]
// [$RootKey$\VB Editor]
// [$RootKey$\Languages\CodeExpansions\C/C++]
// [$RootKey$\Languages\CodeExpansions\JavaScript]
// [$RootKey$\Text Editor\C/C++]
// [$RootKey$\Text Editor\CSharp]
// [$RootKey$\Text Editor\Disassembly]
// [$RootKey$\Text Editor\ENC]
// [$RootKey$\Text Editor\JavaScript]
// [$RootKey$\Text Editor\Memory]
// [$RootKey$\Text Editor\Register]
// [$RootKey$\Text Editor\ResJSON]
// [$RootKey$\Text Editor\TypeScript]
// [$RootKey$\Text Editor\VBScript]
```

上述檔案修改存檔後，直接開啟 **SSMS** ，按照**工具->選項->環境**，設定色彩佈景主題為**深色**，這樣即可
![SSMS2016 enable dark theme](https://lh3.googleusercontent.com/yqlkCGa-fBaJumU1ONzGSRMwYYLSYOO_DiR2JXWx_R5pNreZqxnafbXZzRGCUixiJIgUz19_FpFxp69CTcHEXsKXdHZQ48c7WxTC6StTBbEd3PwFA7f97ERAdaD5CZbj2UpKbFSPOgFrIr2anYxxwWayu4ICNf9vpjLG1FM4M0jOhUQhcAcAPEyEY2fbKBsDArdn29OE4PKpXBU1kf7r4dOTcn8Uoe5a02Ry6Prf4wZA1kRYvZ7iWXSGKrAqk4oHw5qrA8KEuiX0ByBiU5n0WeF6bxrfxLyNlLMFiINLyzsjrowi7TCFgtMKs-3CvTP-GuB63ljc6DxSO-GTxuKa2NZ9ja5AeSPCasul3PWRRbepPQKF12Hqzj_HnBIHEs-dLt0nNPbHE_56G2uobxSkKvCRlhqQaBrqaM_qLD4zmwS8Xb72ZTMIqQIJ8_XH9Cc8-KVDsmjmojHuZ3-ZQU-rtST3G6D3MkkggzzQDeAcZuTP20T-kjsuWb1vyI68eVkyE4MWFowr7a-bYBGK4EhfyKswHSpSZdr98TtZ1LCUbmshI8zGwaTV_twif66azqN-65lbHspvF8xhG0s6ajdmecOZ4osK98WMZF7tvaDYR3G29kOI0xDRebe4eec9dKXtn5R_E3XfnKortfOmNCrZJ7_6WkX17Kl59H8d9WmqqU3nxQ=w575-h235-no)

由於預設的關鍵字顏色跟黑色背景實在看得吃力，所以我調整了一下顏色，然後字型也選擇我習慣的字形，變成以下這樣
![sample show](https://lh3.googleusercontent.com/fG7PGwJalniJsBuWqkvj7XB-WAVFeagSX4RLWajou4b_bRvshJE5gGwPx3-mgRBNnESsUHUcJiXUpSimf-gm3TK2IQyNSnY8ueuYIl8CbcQKa-VHWcvyki3Je3JjAlLCI-8TOE-tMaK4ynGhfAJZ1ROcdhJS-ZtejVxtaZgusOB47aECC9PUoDyUx07GllsC3grlp1OqB9ZTJfohoz0kIHEZnnkYB6TlEDyDlkKUZ0GGGZQyTEsXTpZprvYnulznakMutZwRNfcdoejLrQPQLRoX_Ht8R0HtC0-4QsqqfMslEUUdw4_zMgu4d-aqbFf9iBBhYg5K2ReMoN99SAfH4KcO5KAv2Y-fse6sLN7ze768LH9IuYS3sm6TejDBkOjCJomHiUUrq4zE0oSWMJV0vDNtjxr8j2S8tNhu2tMFYnwrUGdWF22XBnrE7u7HSUCSC1-JrR8XRBJ4G5kJJmKy5wmKoGT7PDErFm_dlVNPCEWKLIi6vBpmP2PyXWncC8KzwIedXSTQGHqs905mPvDl_W2sIvYR2YcAY_vBQ27xXGknVz7tUrhTj-oz5Rx9XIwGUxLsdZ_EnnNc35MRJ-ygStJsNowPwFn9nGKiwd3V7Etm6kCX8E-QAAL1XI5nl-gxTgvIAvTO9Lg2QzrwETdm1laIRUXqHaxDCwXfmIsGePlA5Q=w1364-h716-no)

![font setting](https://lh3.googleusercontent.com/RUKRSRtLgeZb8hDBviCbOQ7JyKLU-PEGG_L-Dycn4qhgMMgc0qK5pbgkwOMQxHitYOq-KNgHmkt6iI62H0ZWS_A3tqvUwaVnAZiYv4Nen73qb6dDXRKElr-91OcjOQkfJDxowfl67mlMb81U3QwplYOcGshe6TvBq_CdxjAC03kg6J4zP8rujAzr4E7rzUisYed3dbJzoLqEROlDZPFD6Mn_HL2Jdxxkfm7DXJIpE9tazHpwuMPFuXvcy6TWY1C2_qY2KFktUBC52qcaz1-90N0ZDIhYoQMZ0ywsAbdMaJgB1Op3bO1weyK2OQdhi639vPzyg0fafpqvIA_UT1RyVXFRH7HrEPNiBReLOcwK-DnL5ZS9JIJXFzwAdPfwW9FQDWV8vmXNfnQ3ciasIxYqRWZoeRYMv86ea1ul-XosdTWIq2gBz9iz9LoyFb-cqf3AKwu7oRc8kNV1DoRU36U0NCupD2TqEUFJT2NeUEkxUw-HR_idVhpAsf9XGn__JiX6hrKWnbTblUQSyFZ9JempuCKchM2W5okmDu969pz2kfCiXcjIJsSHNOWrRxkZ0F5-l7QSxREeLLW_eMoOWz2psc457UQIbYqOIpT1r-Hm68luQVEj39bMa2agUJceBbc5FSxc7oMZ63pPNh9eSMTZ60e0G19qL0QIfjOGMz7_CyPcbA=w930-h551-no)

## 參考資料
- [Enable "Dark" Theme in SQL Server Management Studio 2016][1]

[1]: https://community.spiceworks.com/how_to/136505-enable-dark-theme-in-sql-server-management-studio-2016