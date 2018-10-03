title: 將共用資料夾設為虛擬資料夾
categories:
  - [程式技術筆記]
tags:
  - IIS
  - WindowsServer2012
description: 將共用資料夾設定為IIS虛擬資料夾(WinServer 2012)
toc: false
date: 2016-06-22 21:58:40
---

## Introduction
主要是針對 WebFarm 的一些調整，所以後來想說直接將共用資料夾設定為 IIS 虛擬資料；看以下說明圖比較清楚。
原本是這樣
![Origin](https://lh3.googleusercontent.com/jX-zI3AW6DpW27CIKqfv5GVgIzQJjs1Wa9lb3kcU97U8UiBGmYMLfTg1AsjwNMGflpqGGPI0tv-3ZHx5c0dQvlOfOrfYqDWBMGXExboxvg2-8Q2AZkBuSd6xU4k6XkT5k-34Mi5cQZ8RAI93q8jYAWzXOqisG6fS3n_Cb6xmlcWFEWbBwZpa43ySqYhkwnkOd-C3cv0ZhHt1c7zGnMj4uHH1dmckrAqMRR_G_VnQD5XwMdJ6roDCIOCiHcd_Y3UqtMON06nXI6cn-wXxpb5GH6cohpqZoUtOr-Z6fNWw8dCqxCyCawTcA2GVqxxl1dGlIMt9aQwn8b6vHAde21ZzILcAg_G03iUXLD9E3NewrJ2c440Q0g1vUgDVWPyEVO268InqXHDQfJiMm2sU57yLNzAcjX4iEx-LDrqkygOz3B8a25A2KhOkCqevLR6RIWJibBT9Qy2hjBoLRgyYXjzrepXGbtHwOubPbvVp1QRl-5s423sJx61JHug5FS0MDnywZrSolI3ECJ-VWkN0YxuULSbtSjCgkfk885qOhmxlf8FW_g7fw5mqfFgXWwuRNArHZrOIENZDvVrooZ2AufbnnJS1HZMIeYrD6DfSgQjQ_sACw6Zrw9w6w5KpOt35utabuid28KBEOw1pkScrggfYr6FsPx-9yQ_K6_pTk9GJEg=w711-h347-no)

轉換成這樣
![Fix](https://lh3.googleusercontent.com/Mxyp2eNy5sY4RH1tIDGdUI-0aZoVOuZGWe-rkfmMlPTcjDeOg89QrFHHHzAQodYPvJsDGbU6a7tcKPKP0GZhVI8Cl9EfVbQSpJfEThqc4zbtLfHtA1iofL2fZxyNAUkyY4h_Se4sl2Cqn8kum3wDnCurXxcWm_EYrgcThQa6RS5Mtw3X7HjLy5E9fyETT7zC4uln7JoMpigwI61F1KXGyoIWTrZaXH4ryJoH5EaPmvgB0rXBGgC_w33D61jw1OrJqpzfnSBvKIKD03sILuT2-ATeqkulEV8FVT3bJs4abt5fCTZOQHiP2XPRzdOfCq44b5uAzPnYWQl2OeVax5o6YvVXBfi-JYkI_FX8gETN7hprrAirc8pR-XPsWZn8fkJyhfICLk7ep7-BMgUp3hE7w1x4T9u0QE2CTuqEd0ZGjh6tr9g_7pKV3lbpvzSyQTK17rPyTBqH9-nsnJqk_1uKiXPtwYG0B2k8f7HfXbKt-IZsM27OQeEZn4plzoUuTR1ZC844LK39VcLv_1RBwua4PIAF6zbxtxvtTAlBV8GWrUf3O8mtwOXNDoC0VJffu7xBjffUz0syOgM_aashaFKy0m9-uQwaK6Fsc0A67XP6QSAvkCS6p9Nsm65khZXk4YSFQXnQgigIP_a0aqTnWMtK6_Ygtb5bB7-W5GYNErnRzg=w720-h389-no)

## Conetent
### 試作範例
我設定了兩台 VM，將共用資料夾設定在某台 VM，另一台 VM 的 IIS 去讀取或寫入該共享資料夾。
![MySample](https://lh3.googleusercontent.com/yTk0_LaPuhJtXwmeKt3vji5JqpB3iwW6fJ_W7SfI4D8IuFbaZW3D27iE81RgUxzi_vcNLRyXajM41JKCB4D7GF0gR9sjzX7Na4cWAAxb9UVgm8HiMeOXbyteC8rwsAOnG-JWqgael1Bkr7mDKSo4_fhVeQxtON-WHNvVACZ1eC_SbtBZoKDocQg4lV5JiM8D1QxBe8fwF3JZZYViPqhDoG0zdmKGjPWSADy1Ro2ZdMGmDOwQrKGTrJOSfUN-w0EiCWWju1qPG_ULvlAnxiDv0Byc5D9noCGFFEeooXLX7twoP_KaXSxeueoXUDz9FI356WOxgF4YuNjshmlrFYB3L5mig-UUYZ6ME0SpcZ5bnrgWSM7eTec0yTiKfDP_BxnfwiO5vEgTMTpf7zk_gCrlbMTHuGOq4VYbJaPxOjiLlGFLM3uZBUULt4x5SD_F13ulWucoE3ldKVGY0GarbZrODBCYtx2Qh2qO13g_Yr5Mb9wTUDv-r7tNJZASM9tgdfQdcGnxjzzdxh_nD26VPW8NLPxP_WVFOdS26088zgMT4NfYF53xJgPs_cJIoVN5yTmIcMen0gZBqgD9_LJxwEu18g2HqIRJqEzOgLsC6h0gOxnIGcaOzySceo4iuU-sicFCQGabis--TlN-BUPGg8pIw_wyWuuyai-Tr-GDj_drug=w762-h253-no)

### 作法
建立一個 Sample 網站（此處使用 asp.net mvc）示範
``` html
<div class="jumbotron">
    <h1>ASP.NET</h1>
    <p class="lead">ASP.NET is a free web framework for building great Web sites and Web applications using HTML, CSS and JavaScript.</p>
    <p><a href="http://asp.net" class="btn btn-primary btn-lg">Learn more &raquo;</a></p>
    <p>@Html.ActionLink("DownLoad Demo", 
            "DownloadFile",
            null,
            new {@class = "btn btn-primary btn-lg"})</p>
</div>
```
``` csharp
        public ActionResult DownloadFile() {
            string mimeType = "image/jpeg";
            return File(Server.MapPath("~/DLfiles/20130604_181744.jpg"),mimeType,"testDemo");
        }
```
然後架設該網站到 VM 上的 WebServer（以下稱這台機器為A好了） 上。
再把 DLfiles 放到 VM 的另一台機器B上，並開啟共用。接下來的設定才是重點。

> Server 說明
> - A 代表 vWinServer2012Web
> - B 代表 vWinServer2012DB

- 在 B 上建立一個新的帳戶
開啟執行視窗（Run）輸入 `compmgmt.msc` 開啟電腦管理建立帳戶也可以
帳號：Sample
密碼：Abcd1234
![BServer](https://lh3.googleusercontent.com/V3u6YtCWAxbNdxSNFUA6Drys6J1VBCAEKnPKw51zqTr4egGF4zqHU-2p37XsYrPqbxWIgbS3rgT7477-ErZqmAa7CMGR-2ZbFuKvYvBl3p7ExqP-7SwXjBI25ANu2TWa_nGmMsIv2B84l06XNnK_0fuPCU4UmHsCt_EIREI_SlL1vaLEMpgT3zaFDuwUEJdilmyJtHTYDPhO53NMLfE_IPDKB-00VT3ap7974oYGHeXwxDe0UOE3brT5Bhw9foYyAI6hQHrQgL24XfkrgXxD6hnN9hGoWiAUUa-v62yhovlwQrQBQuc9LeuHoEjz3-IIh6fcO68ol-K5aO2a3wYrX0WuSZaS47quUh-qLwVIAFEpx_c4S2MzSgq_5G715ndtOf2PgUaK1qZ04ggOK8VnuCVecUVrSl6KQi08UnUWSncY-uj9FdZ2bUt3LLvaWZvsL7Ab826grS_UPJoTiDAInYFtFjbVXPuZLdyO9F8HZ2fi2ZbM5-fSSbgtNqpOZx-bkqydM38pqR3OMlDKRYXdFfTrhJ0zXA1xcgWg52DykL76JkUv_CBoCbcHKV-cARSgcaRnQx4UQIGoJ3kFbkpY147UL57xicsTbq9LpFJyWQNRQCkd6Csa4xBmJX9-LqvOcqh_qczRlynwSnMN9UK4SurPBzfM1hl8J6VtoDfUTA=w596-h459-no)
- 共用資料夾加入該新建帳戶的權限
![ShareFolder](https://lh3.googleusercontent.com/Kh03j59CwBRaGH39RcdXyq7d8lLogvv-dGgwDNQ5rsvTtpD-cisbcoK5XDBb8j6K0kVXLWpbq1mV0Fj6DwmvZvzYpcuOmSjL5PGTjrT2r48kJtou8r6cjw2hj3znK_ji4ZHKuVZTYZM14n8v3af0XxYEqrforMs-hhJly75Pl7GfRZvCeEQvjY3rgJyY7wud3sOc0vGq6-erRMbKn9KFnvw0WaixdYu9ac4evx9daBLsnMxEgHI1PPMTfQC_SYsGl8VI-OtjH38ATbF1fOgVDWZtirUNDGaS3YEjUfo2Le1CvrYdkaZ67H1ptHrx-8zRm7UBdnmK97Wmc_s_XvfVNw8_HVcWJ2peobxPTBIArOvrbx-RNhwkW93KuJoXHLvBZxya4eaMrpZ2E_16g43fw8X8aGmOXc9c0GWGJ8Ic0cCStExia2ZTVSfpnM_1Pzv3pSBksp63UBijlfICi8AtDEnFgRX-2045Yeh1zoJFcyaElhnTpYlVRXcy0EwT_976lZO4aUxGLQV99ulYwowdwqHtlv14Il7wONeWiY2rwt8wNMnF5mEA9k9oLOlFqX6TeOq77M3dpRWCE1kv2q1D2jVuGWB6fN5EkC6yCSOxz66pogYqQ6nZcYbvizy8pOHUYQXZNDhmO4mAEQid_cirplzblM-OfE_Jroxkwt3AWQ=w418-h538-no)
接下來的設定，都是在 A 上面的部分了。

- 在 A 上也建立一個新的帳戶(帳號密碼必須與 B 相同)
帳號：Sample
密碼：Abcd1234
![AServer](https://lh3.googleusercontent.com/VY99Qs6ppLml-x6fjjBLdj3-2GZrrryd8eA7hFXK0jhzhVNzGOo9UvILVtA_1OQo42Xtw75reNmef3MJhQhkk0Zlx4nIHi29tdHdW9JIVsgUtZRQZ4ojgJA_hnNjUlRh98czqMICyjl6UUZq_WwQisG7Z9uue5D-TepqXtzLP3g3poIYNN1llELehKO_g4YnuxtLP7cnVrCTAX10fEX_DHnz9ZN1gnrMolcWjO0lsAzLILThxt0IQEMPFbu84G1PMbMzIYlWUcwg8l4rq8y42dLx31XfwIrpynB8bwhFQcm61Q36iQW3aL-Ojfz6WmWeq5fl5Ww38WQHxRFXBbvv2Fvly_9x7Z9PvypUr2taF1f9a-FD4cp7r-qwoWN1rQt4HY5V4Q-K46gVIQ9AGN7CSGza-dlDugOKJFWhhxv5GPmRgxMRNSrlz5feW5FRrebFVp_yFJfiEF5x7aPIAKNcRxnDZZOtB0jhkY4oLBMcjeoWdSPiTwJrpmBfM71_SETJtGqCOxtDW6GpkWU_zd6o6-ai630Ps7jLyQ-bk41BOlQKBpsJN1bIcD0qhUNwHA_w64LvAjhDojcScj3Xh2CK1fK130wm3pSLqcDRUiNBUswXmc5srh5_YOCAH-xr_XF8qBWK-93eg-vFHeU2I_5GZ7W8D6FpVP41AcjiBgOq7Q=w570-h466-no)

- IIS 設定
把示範網站部署到上，接著設定剛剛建立的共用資料為該網站的虛擬資料夾，接著設定應用程式集區(看網站使用那個應用程式就設定那個)，變更該應用程式的識別為自訂帳戶，輸入剛剛建立的新帳戶名稱與密碼
![DefaultAppPool](https://lh3.googleusercontent.com/WVwUsMrnsUIXWC5qRqKuSs85fDZXsMETToIeGppg9xvksrUc7yYgcmxmGof5doUJfn9QiIWUTbCjNEaWkUBMv5ElACvLr_UBTo4csjoyUk2IdjUl3pznZWagN18ekc0hSaysixjVZU-WIdDT-tOQ-DSSHw838VlWq-AttXmNMpBamSwO3OpVhImlNLyWR6aBq75Ub8hd-uYMGIYaYLt3f8aAzKrJ6gwtaV6HJTnbZoQ0P1dJS9wXUGoQi8zJjCKxR-1PRwyplrIr0MSOLscL2UkoUoV0kFPhx5m96aNAJ1KSHB-yye1iU3oIH3o0Le91oV75hNXguzSf05Q3gnhxjc-1FOJXGF_Q3EeGLSGskJv3cTctaQTREIJ5xcysgxxNyrfD2Rcl2Zj0Sa3ObAS3ydDA6mL-jHP3YrZTipshw5Kd77QoJdDAoZzRETn0mRSuX3bS0LJFTomdUl2OUwxJ1O_6Rz6GdheX5-84vfGdX6zKMMNWxjhdWyowZ4E0pl43-pLCDn-goV1y5X_TGO1ir_-SYW_IoQQYT_Mp4-JRoyqxjGrCvdemYszW0yBeXRBpO86odVvfpcjOsLtjQfwEtjUW8f0JPJKEgAb0-2sD5cCKG3vLE5KNWhndkNeWnL4Rw7OwexzUmf6PwXz-yrBJI476pOjGyZkuEnNk4LvKhw=w412-h634-no)

查看一下網站測試連線與該虛擬資料夾測試連線
![TestConnection](https://lh3.googleusercontent.com/Q8_WAhRpOX-qpU9qfEDpGYRuEM7Np21ML5lJcKwPHSHeA9_AMFsrq_5PR0MfNZZCaSQm86Ylyr6q5pZBWVwaM1CwPlHl-ufExDCXlGg-RSm3pIKZbboZ8WXwvLhOvAkm6xvs60-aHDH8__T_M_IY1FPSRN8KgF_du-a_qooD_bNCkfSK3nKj_evUdGToSrKAtKCAfzFj-TbDx_uLsmRv15rWYPxJIS21-P64Fte9hb6mVte25PnaaDkEWo59npOsQ_mLC95gOlIKBsH2b7HsIqvrmA8TtHzg-Mb0pXpDV7Hy0jsOLKp2wPUZ6HoXK1iNqwcpWnO7k28dO5CVUnv3BYszzUG37HqoQIlqoI-kg8hQwZPOIA094Vmr9TgQjh6LBaLe76Jc9wNilAQ-nJcALj3QM8JgZDR9dHpFj3PdnBbtyy3MSPP-iVtjKEf7zCqIozD2YzsSOKPf-vh6XaplXLH0oMkyP7bll5XRA9vw6vfJ4psy0YhDZKt5HocGEUBGMUFbagzQ70-u7KSLOxaaaK02L5Ff3mhg0Iwhje_CJWAtmf-gkRwv5lJaUDJ7hlmfeRxHWdWcVIioDnp2NIQzqpZkswcwlsClq4jUkJjxbrBhm2vlVuLdPstFaMKnoChczgc-dyoaFIEaoUHwdE8M9wLkIq4rPeXerdjQ8d59uw=w538-h201-no)

這樣就可以了，附上範例結果
![Result](https://lh3.googleusercontent.com/vAxdYHM3lBzPgXqMThLLqjW6tdOjTbnadWbwPk0fYgdupt0YFsF6k4jKgf45_HxDDyZnvqgmXxb28pQ_biD7cYyNFqR9UzJ5XO4OsFaLuCzjKPMm2LnyfV-sWxA6SFpkDr3ghq7jGXS638t8yDdCGv06zcYrwNIvogcFUYryzoguDAX924OXblewa_LhwJ0pGDPOA8YWdLhIWdHPNsOmUqAoi_fskyplrp69msGelqtoGm4QD8wVsZYO3ZqaKnTBrLzat15lwkM_dfDj4KkGhRsA35aW3_mSn88ZO19wUKJfqUIOHXYiAaslaEYo1FRTBBMTaN8uodjs55yr-ZZg27Hqby_iC78zddePZlFOPXehGx_7dhmyUzFiBCIFsnv5MmLXJ4HUlp29TFBYhYPrGHylfOinyGryFLMv02lnDhUJcGYSHf4TWcGF1HIUOu_CoWZvq8pcIhJR_N3jF8gOAQ5ZwqNJ7DYaERrBLbt_-2S9EANjkF0CtebLDgIGo-rqV-ReRbUdY_vFmK-Ah-fZGvp20Jnmzg4l9fVSl2k0ZFyKCm-nObAHn2uWxBSVEZ6pKfdea1qnBkRX8sMo1CMjDaeE9aQkJXx6B5IwlRhygvv9GzmYl2Bx98mSjbZx1vJgIogna8pIHB6kQuhv4dK6eDQuHBxAyf9eirhVQkakwQ=w635-h416-no)

## 附錄
IIS Version:8.5.99600.16384


## Reference
- Will保哥[ASP.NET 如何將檔案寫入到網路芳鄰的分享目錄][1]
- Will保哥[CryptographicException: 控制碼無效][2]
- Will保哥[ASP.NET 網站部署在 UNC 路徑上][3]
- Will保哥[IIS 7.5 的應用程式集區與新增的「虛擬帳戶」特性][4]

[1]: http://blog.miniasp.com/post/2007/11/10/How-to-write-file-to-net-share-folder-using-ASPNET.aspx "Will"
[2]: http://blog.miniasp.com/post/2009/04/17/CryptographicException-The-handle-is-invalid.aspx 
[3]: http://blog.miniasp.com/post/2010/02/28/Setup-aspnet-website-on-remote-UNC-Path.aspx
[4]: http://blog.miniasp.com/post/2009/09/09/Introduce-IIS-75-Application-Pool-Identity-and-Virtual-Account.aspx