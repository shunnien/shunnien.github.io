---
title: IIS 關閉不安全的 SSL 加密方式(Cipher)
categories: 程式技術筆記
tags:
  - security
  - IIS
toc: false
date: 2018-05-09 11:00:32
---


![error point](https://lh3.googleusercontent.com/z81u7yY49rCGbPihu5HeulCM270W6Kk2J7rRvRhhXSgptbiIWGSnmJQ18nA7g-cSwfqWrFpd_Uhu0QA60Dforbr_2EVtMTgTp7FqDLeKMP5zW5uWT4LnlH42XK7pEi47BRXSneIUxMFiZ6XsGS11vtog0qb2JfMITFH-h-f32fFnsFiZ0IMZxb9IfmPcgAqQAMEP5WKdDKmB0vBQq6JbhVEWW2YI2EHUQgbCmt2g4nmfPDYzAJLe5zhivhqXOA2YNufHko0S1s4NKcnXyVf9hSq1nwCQJFbuQvUeevQ63i-V5iJ-9AqHkdIMECwwEcX74fYHfKtYWmLey9QOie1de_h5yE5ZaUVOhcVCqOPXQXy5B7PnMSdGqnMixY3U2-mTr5-wlECD4pQLz7nCpqJH6duzMkSgvWbw08v4OOETPVwqHI1GVdb1F_Yla8vrAYSY-9Q142LWpBRv-t4MBRSBaPAZnxGI656Hmxe811LYb2AfQBXN1It6ZOujoL0XjzX4M6N4dPHgLrB1s6wZS0xL3DUNFxm0BQ4GkT1Wj2b5089p-JTfSBUbtz6pI31ZuG4rz60De-B1XYsW6h3VCGPeObA5z6IJ0POC7A4yPafitnu5ivfBmN5-SvrG92GzF_9Y_pkrW2dIVnJdN-lfL8r0326m5wNhadHy=w627-h644-no)

因為 **3DES** 加密沒有關閉，導致了這個問題，以下是檢測報告的資料。

{% note danger %}

# Insecure Transport: Weak SSL Cipher ( 11285 )

## Summary

WebInspect has detected support for weak TLS/SSL ciphers on server `https://xxx.xxx.xx:443/` .

The Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols provide a mechanism to help protect authenticity, confidentiality and integrity of the data transmitted between a client and web server. The strength of this protection mechanism is determined by the authentication, encryption and hashing algorithms, collectively known as a cipher suite, chosen for the transmission of sensitive information over the TLS/SSL channel. Most Web servers support a range of such cipher suites of varying strengths. Using a weak cipher or an encryption key of insufficient length, for example, could allow an attacker to defeat the protection mechanism and steal or modify sensitive information.

If misconfigured, a web server could be manipulated into choosing weak cipher suites. Recommendations include updating the web server configuration to always choose the strongest ciphers for encryption.

{% endnote %}<!-- more -->

# 檢查工具

想要檢查 **Cipher** 的工具很多，也有許多線上網站提供線上檢測，以下列出幾種工具:

## 線上網站

Qualys Labs 的 [免費檢測工具][2]，選擇 **Test your server** ，然後輸入網域名稱，以下使用 google 當作範例

- 輸入網域名稱

![input hostname](https://lh3.googleusercontent.com/yUrE_6a-1WS-gRCT7lhISB94SIZf5zJuiB23Gtpgz9loiS-Iczsmpdi3PIEU9CcKrBb1LUWi1-RqgJaa_gRe35kk__s18R3pHRxjstwSONKkh9H71HenONOjrzde9WETDBqm9kqogpLdNMBCDPhaTB_kt1w2gXJXiFoS1Y6riMIF4nvno61-j6UBUqBroY-uc4xYvElS0Dg_2_KprH-9SMhSdLGwCSX-1GQ2Mg1kQ9oHkfLTJELcL0Wvj4g8WwxRBK1kcwafaOSuNT53gXnkcTV6k53I6RHqamcuQGtyd2sY67GWkcDoTlurKR0fV1exgisWUOBer8OaVsvaPKXnDhjCGi9VYoGZm1oiHO-2amf8dQzPRelSMdYC0QjNyY21OdcLZZHmfkDB98Mb_vbMf0av5osPjdt0nmWCKwS6rggH8v-gEV3VoGzP_WiuGnECcvgqz-sOjoNIqZRGedM9lTAEzg9uPN57_OhhgmQ0y3QCW_zNoe3fWLl1l7kZN89ocfrttTMniHi3erYm9S3-0idaO_cIQ_Fg7ghBNL5athBdYFuV1pjP8TJYjL4SfaUAW-HSidnKPKUDEI9IVYpEm40LLGVbHy6lWtayPvlndlrg5rV5BeHefcSmynuMyRFcL4nScSYd8CMwxYqLzdnwFTSLriXMD8Lp=w1027-h360-no)

- 檢測結果

![Qualys ssl report](https://lh3.googleusercontent.com/J4CXsVxCcPMS_pjz5vWq6ENcAw9d_gnNcAFMaWbY5EMR2hAOxmpEkqmAuYVaCidccVhIf4-fONC69Et9XGZRk8qXmRdJX1rHzwY3c-LngA92IWhpt5hWzMr7auII7vzeCJGZg1hR6T4bFdCiBSpCvYRVZ2KNwrCMaDrrjj7qEjIhLVsR2tY6f8Kn3PqoHjtC587rTWGRY3g1jNcAPLHAkh6ew6w1RPrJ60ulyoypMflaFiipZcSxG_TD5wC1iRcXoM0finaj8KyqXrqP7WCdDtLUS98zQEJBHXDrI_wpnUeNFeoJ0XK028__nBzDHICs9YpA2B43yCjQgxUK1K6R-n6So8nazKebaJbyYWkUoqxzKDB0OuK8gu42Hbt56MBEq9eoUJiM7qgZRDlDb-xccR8zAOrm8D0-1yDRvzjgLtGc2F8vgBMS2CxUJt7PxNE6ciqaFmOl4bxiOc_XkXfz9-LFBX0SqJuJhoT1dLh_jkKT78gjQLjE01m81ewilrb8XawgapdKIn2kT-Xa722WUvQvm_P7-B61_6tt4A1FcLGJbzmO7cuysDQLT2-O33Q2NJkGNFC9oIGgbZ0FSNnW2GfI1bXLoYZ9AvyKN8b29KXTSGqrqiOnMeAoMqeL1nQc4jer7e6eGDkmu8qLOJ_r8OU9l3Z1vH37=w1298-h619-no)

## [Nmap][7]

[Nmap][7] 是個指令列檢測工具，在 windows 上的安裝方式也挺容易的，檢查憑證與弱加密方式的測試指令如下：

``` cmd
nmap --script ssl-cert,ssl-enum-ciphers -p 443,465,993,995 www.google.com
```

OWASP 的[Testing for Weak SSL/TLS Ciphers][8]介紹了更多種檢測方式

## [IIS Crypto][6]

此章針對 **IIS** ，而 **IIS** 要調整加密方式，有些需要調整 **Registry 登錄檔**，所以 [**IIS Crypto**][6] 此工具不僅可以查看，還可以快速調整，是相當便利的工具

![apply](https://lh3.googleusercontent.com/shdVxRfRG5BnOmLxoH-aD7jwnpvST7WrezZmoLc7t--wiHpWGH4RqGjiVwlo3p8UuEnV7kE9hkfBmkOlYMZIN9gKp3WPFcperTjZR9M47KU1JzmKXVDgwdfgAQvDeQ9k8p8uMb3vAkQa-PbHbC_DGnnnLy_GDpedZ9tgaL5BN2SI8FKxR7Cj7vm9biK8XImWYRW0fB-og575O7WXxTP-9JobibeA9XGvmkVuYX6uvD4GkjjTEcKrJSmOt22eha8yWwix0SmiDiyJy1UUBH-W87kYgX8Sn5QFsTQ-d_tXq7n2KkBOyWyp3xNsJFWVnV1FHft9Wt4BLUW6UmL3oVvswuCv7DF_8wD6FBhpKmHlF_HoSXQCyt9yepFzdOW6VYH9iCMgMMHPSJezRqYBArjRmpo6VBhPK0A5_m8bzQKrqPsxqc2mU_JVlkwFT88HPUEZeITwwzaRVNbBuDJcnAWOOsgnkEznEfpbiSNN1LZDMxedMNySB4iy-4kL_ADLGUEiEqI2iCiahQspph3smCZ0_zjB9NJuIQMtmw8OgxPWeQoDumU5-Y4VOELQH9k_rJ6NCdOqvZz7CaNpXLA1RWg0NdfU_YxM5NcfXlO8hxG1loD1UUBKcqhTQMyIkFjF1xamRGFjPsjsDGwjcJz5wvLOD2jLiJxMhSC7=w1107-h866-no)

注意修改後，需要重新開機，不然調整的設定不會立即啟用。

## 參考資料

- [Wiki Cipher suite][1]
- [darkthread HTTPS網站被Chrome打臉？][4]
- [OWASP Testing for Weak SSL/TLS Ciphers][8]
- [OWASP Transport Layer Protection Cheat Sheet][9]
- 浮雲雅築[瀏覽器預設 HTTPS SSL Cipher 加密優先順序][5]

[1]: https://en.wikipedia.org/wiki/Cipher_suite
[2]: https://www.ssllabs.com/
[4]: http://blog.darkthread.net/post-2015-04-23-sha1-ssl-on-chrome.aspx
[5]: http://shaurong.blogspot.tw/2017/07/https-ssl-cipher_22.html
[6]: https://www.nartac.com/Products/IISCrypto
[7]: https://nmap.org/
[8]: https://www.owasp.org/index.php/Testing_for_Weak_SSL/TLS_Ciphers,_Insufficient_Transport_Layer_Protection_(OTG-CRYPST-001)
[9]: https://www.owasp.org/index.php/Transport_Layer_Protection_Cheat_Sheet