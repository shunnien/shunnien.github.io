---
title: IIS 設定 MIME Type
categories: 程式技術筆記
tags:
  - IIS
toc: false
date: 2018-09-13 15:00:44
---

# IIS 設定 MIME Type

簡單記錄一下設定方式<!-- more -->，因為 **IIS** 預設的副檔名還是有些不足，有些部分需要擴充設定，設定方式有兩種，一種是直接撰寫在 **web.config** 內，但是需要注意 **IIS 7.0** 以上版本才有支援，主要是 **staticContent** 此元素，詳情可以參考 [microsoft docs](https://docs.microsoft.com/en-us/iis/configuration/system.webserver/staticcontent/)

## 環境資訊

我的 IIS 環境

![my iis version](https://lh3.googleusercontent.com/nFGHoiNAh5Ex6Ys84aPauKybjHRm8_Xx--qbGzR_56mIFBOQ2PU9N93dInBKgV2HVf9hq4xXvHSUb5j5Kf08r5gchzK1SRe-u_YWX-Dvf6YGNbAXVSbTyxvSlHHAAcpVymYgch-Q5qSg83uQtlXeqtOlqoICiCltaG6dD7uZ5Bv1Bk7Klb19NLf2J-R70BZhBSIZ_VODZiVY7Yodk3Z9RKo78cxMmgIR_tNpcAdqK8unyQTU6AhIbV9ZWLHj9iGMv-njKqgXA_OWFxL1nr9B5khwhu3XkbiNP2RMYoAcNes_NxrQOXx77bwmP6a-eBuvYxkF_Cq4aXBcTaVB19iFIgpAukWSkl6KEkqAUE50Qcl-NQ0SVFrdOK6QHVKtI6mIDDsJgUyFsyPavdkE7CuOyMWg-zXhw36gdgWZ-rVdsCK9Qqx0T4GdRn1-g8HuGcEFcia7BeGzblhimrOmSmRTtDfgMyZxJi1BKrh0rjBekYDsIcexfYaz_Bvz2r8oP5bXDot8T32i38TzR9Gn-42GvD4Q7N00g0Q_cHswv4JFpwdS0crDc2kmUNs7CA4FfIX7oVIwSgyARbCX0kcw57G9jbKfwZ4TKN35F4sBbm3moZtj_l9qBNNDnCRFI06EV6U1q5RnVNly-LjY6OX3gKP55Rr5CTqvcr5hfWCy7yCJGXwX8z_SOLnIeqcN=w616-h252-no)

## 介面設定步驟

> 步驟 1

![click MIME type](https://lh3.googleusercontent.com/3HVMwl2jqvB9N1qQp78E_tPvVO-A9Df4QsnOlUNB2HTajLEC42cjiMaFEfY4UWs6YyLOvN2E6C2tk_KrMX3V1OtjQRyTO1YkXbcpz9gS1ItZrsiftdo5KSh9yx5JghOMLe-6SeEuT-ASaUOGquFaY5qfZyu53R7IE0pjX5P1iL4ExLIbkEhrOccUsa7DlUW-0GQKxHYdCV0FUzR3gRhkECqvI2nQgUwoFeRN5JBn9Fd_h8_nfn5nbSXXl_u2LCARGP9_5CFLdKvC4v0gcQ3RC9k0HgNlbB-SDrXSB0Se51zpH1Iy8q11guLNa35cf_bYEyTIAM8p6YSpbOP3b_CvoodcNrqy9Ph3ah4LwIE0GnMh4woJ9SAkOgoIRNz9me172JghKCsLHOfQ7y6sHE2fgRpebYrmB4EqTb041_MzDZevUayyLTkGsfB4nhCCKitW2if-2OF_ApHdcV3eOXiUh1qRB5AeD2FQQJS2CclD11VQObbkkX_XGSsUOttIlJQJ44P9WQCGdP5uPdjqN4aCW44B3rcKRKm3Un4zdqDvhQ7WLWEwk0z-20oMBvxsmvGCQL8D9u9mFYsqk5YSiaxzkAXyMqNvUwxvkJHQQhyxj4Hf0-Ja5WGCFdUcK7jE2cJ8NeOniqUcf9fqVAyZJS7SgGvnk41KKM0PfkfealjcDZPtILG69Qr6CC-J=w619-h346-no)

> 步驟 2

![add new MIME type](https://lh3.googleusercontent.com/CnPAHXZaIyJvazQDr988X8TChyQPCZB1FWse3cLIm2OrHQjx3DEbapKfWgj2o5w5toTAk61F_zjEFsu-MWlrsNeRxxKGzbw_csXgbxhr2H5UmV-HJvJZ7AbjYZ0ZSWT91hx3VK-HD0Ss-XamGUHIgm2iAVO0FPk3vS7Kbdo47LzHweb10GxUSyZahKZEghW-oFbntC1ljBRQ2zyQ0IKyQ9Pd4welY2B-y72jptqWi0LY8AcSmPhdr7ilhnyjOvnpnP82wRmK_T32z-J4GiE4Lqh08YuWMPOOOmInJBbQhb7HoLHR4T-c9WGuCzys3bTFG4W6uAZsD-rAp0-wIG4q77QuRBIU5oLeRba-fED_bCAd5oc8PFtN_wLowvEFZ-MlKK18ofzOnUiGwG7ZjKiF-ZIlEPq5IV2_jVO3hR5AuY4eBdtnZkThdAkqYtfxxFTCAYqpQe_Y4wP0QnBqsGeolkTPp-o_UNDpTL_F9p3nSosFQvE5wV-zb91FBcDEDdQB905XvOogEkJhE6a_7wYANLXgByANSYL_la1Lk1ETgvT5bZfvNn_2uaJUYdp1qxvwUvwaq5PzJvxwpmTqVWjWH-Zmd4Z2zEGp2UWKW_MU57_jhvqJAZI6cjPAKF3cRe9_1fYqxX05VmcFMIXhu6SViI2DL42GgL7j-6Nh8X8nZTSW1wm80zWMLx1q=w828-h504-no)

> 步驟 3

![fill MIME type](https://lh3.googleusercontent.com/2SYx8vgzDtjvVy2vcu13OJnki5NGvX3ZyAoyphrc0dBM6soYscAjsEUopD3P321LnanDlsFJ0oFqR9NKwyTelXCpFcixHnt6vc3XaUohAUGJBw2rx0ax4CYoOLGH2DOtzzkjcDoCXbLRQ8RccIzauYBXNGCBNOXJVq56Ppt8x3aqu_wPGxOGr9G97xd9dHVs0k6m49V5gf6RW9g8GVDaXivlufbGi687Y81anuHgBvSOrhgQbmRCoBhElsrg1TefeDG2wSlfQCfxhZ4fGAL6XNx3Dzr6qPkusoVKs4QLls1iYAXK_wd27a8zVhYf2v4T4_toEjQnlF7lrkuVjdGEAzkAVhThimAcvDsd5ZyWxKPnD6MT3oUHcxj73gra8viL2IdiJhMKuTeV1j4RXinzzhJwrJ7kQ9cxL9bv7sfjPLDMASWDJDeZe8KCLElcu4RgZGIiRGczyvKQPptd3tJp8JjuRIobY67Tptx6vSDH35VCjo-gcbdqqyXvW9eV1g2TPzMhT4SwvpbkLK2p1JLhfQoso6a6mbCAwnyRaN8e4yVKhX_za1tNxe8Z9vSdzB9D6rnLFxVbfEUoWslvywHIm2wvoEjhyC07q30VX2byVJS8e_jlWte8a-dlBFRzKQR_9dkHXCZfwh9yy2S4mmCU1kydsSkvgZvdbbagHGFroMRvMx-3nfagFYBm=w660-h676-no)

## 採用 web.config

使用 **config** 的話，為了避免版本不同的預設設定，先使用 remove 移除預設值再添加

``` xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
    <system.webServer>
        <staticContent>
            <remove fileExtension=".eot" />
            <mimeMap fileExtension=".eot" mimeType="application/vnd.ms-fontobject" />

            <remove fileExtension=".ttf" />
            <mimeMap fileExtension=".ttf" mimeType="font/ttf" />

            <remove fileExtension=".otf" />
            <mimeMap fileExtension=".otf" mimeType="font/otf" />

            <remove fileExtension=".woff" />
            <mimeMap fileExtension=".woff" mimeType="application/font-woff" />

            <remove fileExtension=".woff2" />
            <mimeMap fileExtension=".woff2" mimeType="application/font-woff2" />

            <remove fileExtension=".kml" />
            <mimeMap fileExtension=".kml" mimeType="application/vnd.google-earth.kml+xml" />

            <remove fileExtension=".kmz" />
            <mimeMap fileExtension=".kmz" mimeType="application/vnd.google-earth.kmz" />

            <remove fileExtension=".json" />
            <mimeMap fileExtension=".json" mimeType="application/json" />

            <remove fileExtension=".mp4" />
            <mimeMap fileExtension=".mp4" mimeType="video/mp4" />

            <remove fileExtension=".ogv" />
            <mimeMap fileExtension=".ogv" mimeType="video/ogg" />

            <remove fileExtension=".webm" />
            <mimeMap fileExtension=".webm" mimeType="video/webm" />

            <remove fileExtension=".svg" />
            <mimeMap fileExtension=".svg" mimeType="image/svg+xml" />

            <remove fileExtension=".svgz" />
            <mimeMap fileExtension=".svgz" mimeType="images/svg+xml" />

            <remove fileExtension=".geojson" />
            <mimeMap fileExtension=".geojson" mimeType="application/json" />

            <remove fileExtension=".csv" />
            <mimeMap fileExtension=".csv" mimeType="text/csv" />
        </staticContent>
    </system.webServer>
</configuration>
```

## 參考資料

- [microsoft support][1]
- [MDN_完整的 MIME Type 列表][2]

[1]: https://support.microsoft.com/zh-tw/help/2621229
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types