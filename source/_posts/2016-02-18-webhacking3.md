title: Web駭客攻擊手法及防護實戰 Day 3
categories: [心得筆記]
tags:
  - other
  - notes
description: Web駭客攻擊手法及防護實戰 Day 3 筆記
toc: false
date: 2016-02-18 18:49:35
---


## 本日議程
- 正確設置 Web 及 db 服務
- 第三方元件檢測與分析
- 案例分享及解析

## 正確設置 Web 及 db 服務

可以參考規範標準 [NIST][1]，建議觀看編號 **SP 800-44 Version2** 的文件，此篇文件 **Guidelines on Securing Public Web Servers** 都是說明 Web 相關的安全性。

例外，[微軟][2]也寫了一堆說明，而且很詳細。還有 [**O**pen **S**ecurity **A**rchitecture][3] 上的介紹，[此篇](http://www.opensecurityarchitecture.org/cms/library/patternlandscape/222-pattern-public-web-server)可以看出詳細職能的區分。

## 第三方元件檢測與分析

關於檢測的部分，需要考量第三方元件是否安全、是否有外洩的可能；可以觀看這篇資料[安全軟體測試參考指引](http://download.icst.org.tw/attachfilecomm/%E5%AE%89%E5%85%A8%E8%BB%9F%E9%AB%94%E6%B8%AC%E8%A9%A6%E5%8F%83%E8%80%83%E6%8C%87%E5%BC%95.pdf)

## 案例分享及解析
此篇主題就省略了...

## 附錄
此篇附上介紹的工具與講師提到的部分資料。

### [coin & able](http://www.oxid.it/cain.html)
> 15 年沒改過的軟體，請注意使用 XD

以下是三套進行檢測的工具
- [Nessus][5]
- [N-stalker][6]
- [OWASP ZAP][7]

### [Nessus][5]
> 主要針對協定的弱點掃描
進入[下載頁面][4]，選擇 **Nessus Home** 這樣就可以免費使用了，接著安裝，然後進行[序號申請](https://www.tenable> .com/products/nessus-home)，要啟用需要進行序號申請(序號申請失敗請更換瀏覽器試試)
> ![Nessus Login](https://lh3.googleusercontent.com/uN0C4NAQCVQvPNRG0ASphDe0BeAs1DEKOOF8OAgeMRmVQ62DkuLfeF_1FTa2402KKACZgwt2Z5mQ5YfO-Z0HAHm6Ex4OrBESX3eZ8-j7V1iuXAzBkEKBvVEWLjkNpaY2lvvYYRa7368IeKl9ymf47dDhZU_kAbmVlmIeP54UQSgHaw6jqjauGZErqu_EzMHbVY0YA5xeZytjjec0IX2JVtXJO-zmfGNSDoOaU05b4vMHRAtq1QjKGRfAERDah1Hq6BZoa2ESarEPF8Kc4EnxlOTESH_wJY6jXJ4ogfiapahjJM9NyFpG74kNMULr8JG5jZ-qGrjnApF4Urhl5pB2mc2RhP7uq4mmMSQYRuhBzPnY9y0zbIIf4xq1Qj8acqA5C5Euhh6OzXAhqtU_oGm_KGE_ri5frkZFFfK23M58luEt3LacjYacddyGg4XilEBKoRkavtKombTaUqFBNS2kNTELO-u5Z5gXeu_5whZdzNUIU0Q00oAgqk5JWE19nucR4h6QqusQZpCNnPQ64XiBPB65sB8lVWqrBFmuONPQpls_SWNlkqTVJ3G2wA8qU3mWoc_zDS-rsXG6nSchQ4p-qmwsU0YC1ib_UWTruMi_Ri2dwUKuW3Oj-XWRKTtCBO75VHfVCFBhmRX6bhZxOztby7m6Olm-UQhVGnhUa_PJOw=w525-h460-no)
> ![Advanced Scan](https://lh3.googleusercontent.com/CGcZIt_Ij4CT-G1L5Qd5dxGoUUrb9iWKd8NzRKsVgByeh_rbCNhOkg183EOFmZBL4C_UnJgOgkhOjLdtqnn9Zqm4icK3888XjitFGbSwdV28GVnglw0m7KLLthDJ2Cxig15texTQRZS_KzrfTAuxiesqB0xZyYRKtMLwcABjOr2HwlOtCSxeeDbeMOpmQsm0dfqgC2PDw9SNc0drLT3Nlc3W42FkLDU4nsWtPutyAYnfPqHrKJr7jdQf-3_3TO5RXs4Y333B33bCGyvm8hgIEr7fp1nkVVbli4tyq_-gv0kfNp1LgBtrEY2xfEnAWzzSFjgnvWkJq56DNWXefLO8ncOTEVecjUHRNZiOlz72eursO84j4RsfXD8OVqtBKdPXnvZqmQgM2etiT7UpnD7IAmso20ztbEtEfrQmps3HlK_FGT1Nlyj0q_LRJAy_deGg218hiUV99dte-1kNzUa0NTHSbU3NicMAlVJfq7OMtGxeE17kCaD1qu0uyIxPdq3Yk6d5iUlwOPiP7R3ZJRQVnGHQiffg4sHQGleCb3nixqPLZIOq18LROoViPdB1uyU4RCUuUFvgAYraxac51IHxK3cJUOiMtos_Vj0k3ppnFIb8D4DvA_4bwBrvG1lFUzWfNcAeIbhOhKkHsfgxofBzKBa33nebw4tBNFefNt3LOQ=w862-h631-no)
> ![Host Discovery](https://lh3.googleusercontent.com/XylK3SY6UUDwNWcRHft9QjQJAvZKk5Sy8P4yh_Mk1ZKIZt-eRaErwd8MEHJdLYOAtqDFI3H7tC7pC4tWplRSj996IbDDx2hziG3wA7U-WNzit8Rcc-r5bJ0ACyNl4-0-3FKZr9o5ZseVKLXwMhFRaHePYjKNNNuaOmMrs_iYfftk3lWF3rrywTzJ25u3IOUMYRGm8PK3bsMnJC1YOY3ZvToSzL3SwDHYbfYRr_Gso44T92E_dPj5QwS8rnGZozPAOaWZOW-rZbo1Oo3zpMAFgp01uB43JwkxWb41aLtnLBTy4aGIYI4TTt5_soCX2UpxFvEu3MxKlrD7K7pBde1_AhFd4qR36UnoLi3L79iG51zSVeFxaBPrAbLsoiK4Gjj-ECgzKgias8OPOSNHB2bDaRpQbIzL4XkIJ8sdIkrgvHV8e0MD0MsZyrk4JAqDMZwLA7x4I67lCabrhRZAHP1noOGGLWCBGwqJcHmnujZU7ReLzuAWHFek2QufrhMZOtmko-mCYawMlotstaygQmtIC0Ljx-pmKu1r3-7KDg5CdRyr0hBFnF-UpogX6hCQjHId9uZ3ZDsmwZ1vdq8JnGYhjg38IoHdDgRZSfIrTQ-jzj_VK58aBVBxmuVrQZZecDfSJcguO-fEvqO68aPUd3AUsUH5_zWvsXPI8G8nkU7fJQ=w716-h687-no)
> 
> - ARP
> ip 跟 mac 的對應 table，可以掃描 ip 就會對應到 mac，有 mac 就會掃到 ip
> 
> Web Applications 家用版沒有提供，只有付費版才有，而且掃出來的結果跟 Zap 一模一樣，所以使用 Zap 就好

### [N-stalker][6]
> 檔案下載前需要填寫資料，如果 Chrome 送不出去，請使用其他瀏覽器
> ![Download Free Edition](https://lh3.googleusercontent.com/Awhndmll-H0u2bXKgi2VYs3pKOIo5o90T4FKwlw46cnfYcKl2WpG7j-Q2D6vz-77mHt1fttS2rTAkQSFrHifbYQitrcz2YJgeL65FkLWPEgELDdSjG3uoja_jE4OsM6tfcKPFowy9gQzQlfETXbHY6ypLrTk7AnPaLNnn_OC2jwa6dyf_I939vtqAkkxTGdOq1RpfNPn-dbVQv1VaCk-42_eEonlL3D6iogDBKR8rOS8sYfw6yqyTrgtITfUngiR9gwo1gpc6RJAVplWVjRWp0YZxsgD2c9O3W7nA7mdjMMGfvUNO2dsB3qWsLuOk0lIolRiCn7KXxiBIPVjTNzvK3xpJDdRG5pdx5tyKT6xtGvhcNicjqqe63F-dOKEQpk5EzhhIy3uGbUxrKlzOvIwj0HtcXhdObZVA8shTrBwVr_Yvvcti77kABgq_1mpiAKEm-HmzVSAGPMlmMZEPcbFS_8Udo6ubU_4JIo_4XRmULBcuer4KHGZI4eoy8xphiIMOXWxt5tA2n6ijVRg6nrqF3pbXau3YhT9781n8q4pxvK0q6G-Lp-sIftQq3HA33Bj-BONRJVpFwWixzGiXnju9N4h7c7rAFV6oGxfy6OYrrtBS6NlaUY3eYf3qK0R38ePNeq5nVNLkV_nQJY4PxmZ6PUrF0FZJdAXZFAtjihTdA=w748-h569-no)
> 安裝完成後，直接啟動，如有需要更新請先行更新喔；然後就可以直接掃描了
> ![N-stalker Scan Set](https://lh3.googleusercontent.com/l2rt2umobWzQHyFkQqlnJkb5vxbVtDsuvjAE7SpZePSWc5bR7m4MTQ_WP5vlX40_P_Szhkvh6RvPjiYby08VSgwYtKFuScDb_ndm9cokrww31TX7ucs1Em94fL-kaHRHrjxZg6OG3eGKmUPQAUnEP90dE18lWXLAGY3sbA85QNtVvD3gjXuaEmfB_PM1Aff-UVhn-rWcSH7DDtA7yBRbQgor486ZfKYgvygVDO1o6SJwe4MDCbKWwjPhwJyqTwMFQ2utow-Nk5zLxSXByAc68aq3xT0eGK0BP7bgjDIZ4Ygs10tqTpUe4Ly50wWaboUx17RzHSFM0Kn8xhsoliC9H8JLbuCx-nIpTC1r9p1p4N0Cb0oJT0LrzIk3dPgXu5JqqonlCMLnOLevM0Myeo2WGSB8uJgRcjBaL9-tdzYCVZBrHWz6TTXwyb9BrihnInMK2btad2WQJH4jZWlCTG81zDhKsuIHTwgvYQ4HDK_BK1H0sCR3wUlaIaHhewHc7Qqf76AY_4Qt0EqqGhEOR9Flzp9lhRsz_gkOJ1O-8izzySyi8dMrVtVrQSH0pXGggoga4-uj9k1igQG5_rPBCOPK4XCQw6d-OQz-tjf7m-qtFueGLjKFBBCAltqwNr2sFune8wTxDn2-sXDjN8ZXyUB7y7MpbbBLwCNAuYRcvo_5SA=w776-h570-no)
> 掃描完成後會有 Report，裡面會有錯誤編號，這些編號可以查詢 [**CVE 弱點庫**][10]

### [OWASP ZAP][7]
> 安裝完成後，直接執行，輸入想要測試的 url 然後點下 **攻擊**
> ![Scan Set](https://lh3.googleusercontent.com/S7qzQ5UEXjgkdo5yKG74muGemGci_qMHwNIIQswIoLS5JW8AjDwbSs1oZcmjmhcQ_UDo1Yu7HOuYSSoD0xkRB4FWXj7Lwf7j7PR5be_ZTezzcYJ-ptBivoV_ztw9oXuTuzEJHSTNXOI8gr_y1-UWAYoRMtHmLE87kPty8V4mGtB7ueGijo2Z1ObQbgjTVBRuw4HJ-GMczYtvRca-MhjGQ5NvRFLoDDDzre5EKgAdAjhyLik40qb6QHa6NRPb8PwmSU-ln8GYF6v0xzOBpVduhTKS1B_TqXkzLd5FxK_6SsNbe0fXS4VNPRZULeIwqKVJb2IlDR8wqxafsK30-6OLC7LuSSMXRSoQeyt9VWfVM5RVZMUcJ47irQk5WRXL6ZjMihqlbO3ftJ87ZHLpGEnedrC23SWskKeUfWD6NU7m9Z4hsIPa95kXE3mem1hsG2nJe25765zbTvqe12cNJ7ycrt9HCScPszhosxkeXJD8ivzBX8nasY4Xf9le7jXqvZhuz6VMjO7MPjSTnoZp7pUiC1InSGaDZNUEvnRAQADrsdJ6VTP_dCSlqVRIfIgQmgDyM3x1Ch4G6gH8q3H15gnsTJNrSKryIdHLbdE0_RwkZQy06_F9CI8hVrE05agwinRqE28JcyVzLOT7V4Q1cbaeOXMFKUhn4wPY3xru5vOEfA=w786-h593-no)

### [mimikatz][11]
> 一個方便取得密碼的指令集工具
> #### 指令集
> privilege::debug

## 線上工具
- [Hash decrypted](https://hashkiller.co.uk/ntlm-decrypter.aspx)

## 參考資料
- [NIST][1]
- MSDN:[Web 應用程式的基本安全性實行方式][2]
- [Open Security Architecture][3]
- [Nessus Download][4]
- [Nessus][5]
- [N-stalker][6]
- [OWASP ZAP][7]
- [CVE][8]
- [mimikatz][11]

[1]: http://csrc.nist.gov/publications/PubsSPs.html "NIST"
[2]: https://msdn.microsoft.com/enus/library/zdh19h94.aspx "MSDN:Web 應用程式的基本安全性實行方式"
[3]: http://www.opensecurityarchitecture.org "Open Security Architecture"
[4]: https://www.tenable.com/products/nessus/select-your-operating-system "Nessus Download"
[5]: http://www.tenable.com/products/nessus-vulnerability-scanner "Nessus"
[6]: http://www.nstalker.com/ "N-stalker"
[7]: https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project "OWASP ZAP"
[8]: https://cve.mitre.org/ "CVE"
[9]: https://cve.mitre.org/cve/ "CVE List Main Page"
[10]: https://web.nvd.nist.gov/view/vuln/search?execution=e2s1 "Search CVE and CCE Vulnerability Database"
[11]: http://blog.gentilkiwi.com/mimikatz "mimikatz"
[12]: https://github.com/gentilkiwi/mimikatz "Github:mimikatz"
[13]: https://www.ssls.com/ "SSLS憑證商(不要用這家憑證，因為這家憑證是 comodo )"