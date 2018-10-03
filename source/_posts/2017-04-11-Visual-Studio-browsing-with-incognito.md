title: Visual Studio browsing with incognito
categories: [程式技術筆記]
tags:
  - Visual Studio
description: Visual Studio 網站偵錯啟用無痕視窗或是隱私視窗
toc: false
date: 2017-04-11 11:17:12
---

## 設定方式
使用 Visual Studio 開發網站的時候，使用無痕視窗偵錯，避免每次清理一些快取或是 cookie 等資料。
首先，先開啟 *Visual Studio* ，開啟一個網站專案，然後在工具列上選取 **Browser with** ，如下圖
![Browser with](https://lh3.googleusercontent.com/4g6oS5pcK1bJydVygpuopUslPhNbhksyn7g4OwgcGhO58pLUNIwlTuQIJugB07w9efPJ8-cLZWEDTAZN4X3Mo6uKRj_ysR6TA48Sawkg1R4WoRMjlpWhqlv3x47XcJ4pu9bmZF5Wz6-gUaJMcQu-trqA3A0stV6ueOLjfUapV3nXyxCgEKtS2zBzyaTuVoVwCb8paEO5NM64NItb3FL-eDS2yHPk1dJg_IynBpbhFn58qw2fockxJla5xLNo1pWfHcHncwcbHW8z4ODGfJsP2T2oAXz-c-Pu-KLZ9t1aLDxrQu6aBpItmeF2gSfWYpZSX1H9eXV1PHmusqEsRswv-V2dpuLEDqzWcK6ORfmcHNLBvn_ymHoS4MS2bhMHOMuTWgMwCHOfSMjjItyQR9AjWnrg4drzQDWPfw6g0ZoVChcBr9JMvIwjsFU4EDIVmtAuHvnp5ShcWgm-PUF8fanDoEU0gGvc52WxSY4frUiasivcNzMD-DcnOy8O-jnhNW3zkGq1FY3KQiNIkGW66_PnkBna-3G1eyHt1V5Xal0H4I2KzvM_Iq2OdsPbp4Am8PB63PxCD4HrpDklHI8NPPfOhqyjFCA_MrY7GoTYOJuODPyga4Xln9DlHCwrgiqBI7_wxi6nlrTLerNpYqik2MkTkg2KuBveFr8X3chD8vyIvw=w304-h298-no)
之後會看到 *Visual Studio* 預設的偵錯瀏覽器，想要新增 **Chrome** 的，直接先複製 **Chrome ** 的執行程式路徑，接著設定*引數(Arguments)*，各瀏覽器設定方式如下：
![Add Program](https://lh3.googleusercontent.com/hhbGeZMi64HetqOgvY9l2XEZ_pkXhF7zn6T7cT_nlO25e4I6JBBqMwzsDOGTaFxJzDARBnc6MWElRvn4r6Ixqf-5jKGfR-VD7buw74jrSLBUt9SjA8rVsG1VyqYavYxERRfIdH3PgLJNExvujMoE7urygguDpdxiD5SXv28wTSn3ATatweBly4zinQoDHeRjoyXX7qR3H5EMnpDg_xuiJvciiMe_kGTIpM-V9s-SxVD77VJqKUDQLaq2nxip4XvzG9QPBi36_2PkyN8mqnt7DAFgfWNv2nlwBOm007nChtPPg6JKzPlJcp8mxFJ-G9EadgcHqqzH27OZ-gKWB7U37PSy_oH0rzEjQ5-LZO4HU1SYn1pcxhuGEc6Bad_wh2ODNU0taW4Epkxd4mg23zPm1wl7in2tWrY2CBxftJM_iREVX3zLPpsloF0gvcxEW8gg3104e6p_1nYqCa2_fsA0bFdXv-MXqEiCxvuBzM8a9VNYUD5-kmiNvildde45RIUPzGL6xgXdTZLm08sjaXNsqA6-5doinLAo_7CpOcKDDFwNU_tkFEN2Q0j8sfTEBcS8lpmkimrNcRD41jk0qGrDNtCUm63jUahsC66SYIs59b1UPQHG49me_JT2Zibc-Lw_0HQb9wSogT209Y19cv-JfYc7XPpx8ncD1vgXjg6Hkg=w457-h446-no)
### Chrome 設定方式
引數(Arguments)設定為`--incognito`

### Firefox 設定方式
引數(Arguments)設定為`-private` 或是 `-private-window`
- `-private`:*Firefox* 版本 **3.6** 及其後版本才可使用以下指令，第一次開啟視窗，之後啟動新分頁
- `-private-window`:*Firefox* 版本 **20** 及其後版本才可使用以下指令，每次都會開啟新視窗

### IE 設定方式
引數(Arguments)設定為`-private`

## Reference
- [耕作筆記本][1]
- [Peter Beverloo Chrome command line][2]
- [Firefox command line][3]
- [IE command line][4]
[1]: http://jumping-fun.blogspot.tw/2016/07/visual-studio-debug-with-incognito-browsing.html "耕作筆記本"
[2]: http://peter.sh/experiments/chromium-command-line-switches/ "Peter Beverloo"
[3]: https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options "Firefox"
[4]: https://msdn.microsoft.com/zh-tw/library/hh826025(v=vs.85).aspx "IE Private"