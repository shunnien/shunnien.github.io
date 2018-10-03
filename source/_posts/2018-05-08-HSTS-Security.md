---
title: 在 IIS 設定 HSTS 標頭
categories: 程式技術筆記
tags:
  - security
  - IIS
toc: false
date: 2018-05-08 10:24:48
---


![demo](https://lh3.googleusercontent.com/u1sGGmWTrvCgfb6SntbcJJIV3WH1XMinJYi1G9mhQ28lCHPKTF30vLTd1eo8JWdXd0OKjyBaXtDTJyT9xGW1Uw4KUGiQOxvxUUgoABUrFjyS-vR9qqv5LbPgPm83kQhWMcvNmxltza0mphw-bDoHSdBeM8EjhvNbGKlnExuxoM2nDD0JBdrdh8i7oIayM_PF7oMVuQOBSuiVYd_wyI7NUgd8gIOcHczQ70qTtKJDLEKQXew7dKO_djLP_-1ZyDLrLLGU2NPYmg5EicLevIFLwg1zLWMDnl0vjis69j3-yvHBh4-gdTb2PKRKamuYnhXdzkFxg49WLLizilZRRhm-nS6V82IO6Bx1_jelpffnRaoZSaKhlmzUPwGlIOExm9ZlVkVezuqIfK0GIrN5cfh-5DYhKJLfsF-RR9W4DsPrJaNZrm5jZ-Nwfi8BquP89znqXUelP06WK6BBJ-onxKut7p3KIgv5HFBSohBUrF0Btjf9BzOKeYGk8gMsi26IZBeBQb7QjxZalLTJqWqgvWOJcVTA3HzAt5aoVbUk8MEQTCWUG-l26leoeFftS1J_zLllxmIauQq61vt8h6i7-cskGaa0H_7qzuS15FsPmEnzo_WGXYOIvd2mZgznSMfeo-jQq1OZfp66-v0mXs34O_Ouyb273oAq51dd=w445-h222-no)

HSTS 對於公司專案內的部分單位而言幾乎是毫無作用，因為使用的瀏覽器不支援，所以此次被掃出來。

{% note danger %}

# Insecure Transport: HSTS not Set ( 11365 )

## Summary

Http Strict Transport Security (HSTS) policy enables web applications to enforce web browsers to restrict communication with the server over an encrypted SSL/TLS connection for a set period. Policy is declared via special Strict Transport Security response header. Encrypted connection protects sensitive user and session data from attackers eavesdropping on network connection.
Consider following attack scenarios:

- Users often omit the URI scheme i.e. `https:\\` when typing a URL in location bar to access a website. Also third party websites can link to the site using the “http” scheme instead of "”https”. This could result in an initial connection to a HTTPS-enabled site over an unencrypted channel. An eavesdropping attacker can hijack this unencrypted connection and replace the intended use of HTTPS protocol with HTTP in an attack known as SSLStrip, granting unauthorized access to all subsequent traffic.

- Websites often transfer non-sensitive resources such as help documents over an unencrypted HTTP connection. Any cookies without a secure flag are sent along with such requests potentially disclosing sensitive user and session data to eavesdropper.

- Man-in-the-Middle attacks that exploit user tendencies to override invalid certification warnings, e.g. SSLSniff.

For web sites configured with an accurate HSTS policy, browsers automatically upgrade any HTTP connections to HTTPS. Furthermore, browsers prevent users from overriding any host certificate warnings. HSTS offers an effective defense against above attack scenarios.

{% endnote %}

<!-- more -->

## HSTS 介紹

{% note info %}
The HTTP Strict-Transport-Security response header (often abbreviated as HSTS)  lets a web site tell browsers that it should only be accessed using HTTPS, instead of using HTTP.
**資料來源** - [*MDN*](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)
{% endnote %}

[HSTS(HTTP Strict Transport Security)][2] 是一份國際標準規格 ([RFC 6797](https://tools.ietf.org/html/rfc6797#page-12)) 網際網路瀏覽安全的機制，主要用來宣告瀏覽器與伺服器之間的通訊方式必須強制使用 **TLS/SSL 加密通道**，只要從伺服器端送出一個 **Strict-Transport-Security 標頭** (Header) 給瀏覽器，就可以告訴瀏覽器在未來的某段時間內一律使用 **SSL** 連接該網站 (可設定包含所有子域名網站)，如果有發生憑證失效的情況，使用者將無法瀏覽該網站，如此一來便可大幅減少中間人攻擊的問題發生。

## IIS 的設定

此篇設定在 [**scott**][4] 的文章中提過，也詳細說明了如何設定，因為 HSTS 必須在 **HTTPS** 的 head 去附加才符合規範，比較好的做法是透過 [Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite) 設定條件式來附加，如下所示

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="HTTP to HTTPS redirect" stopProcessing="true">
                    <match url="(.*)" />
                    <conditions>
                        <add input="{HTTPS}" pattern="off" ignoreCase="true" />
                    </conditions>
                    <action type="Redirect" url="https://{HTTP_HOST}/{R:1}"
                        redirectType="Permanent" />
                </rule>
            </rules>
            <outboundRules>
                <rule name="Add Strict-Transport-Security when HTTPS" enabled="true">
                    <match serverVariable="RESPONSE_Strict_Transport_Security"
                        pattern=".*" />
                    <conditions>
                        <add input="{HTTPS}" pattern="on" ignoreCase="true" />
                    </conditions>
                    <action type="Rewrite" value="max-age=31536000" />
                </rule>
            </outboundRules>
        </rewrite>
    </system.webServer>
</configuration>
```

## 參考資料

- [MDN HSTS][1]
- [Wiki HSTS][2]
- [Can I Use:HSTS][5]
- [OWASP HSTS][6]
- [SCOTT HANSELMAN][4]

[1]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
[2]: https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security
[3]: https://hk.saowen.com/a/0c7d113d38d0d199a2811e68d391c247dcd49f0478bccda9fe6ae746ab815a4c
[4]: https://www.hanselman.com/blog/HowToEnableHTTPStrictTransportSecurityHSTSInIIS7.aspx
[5]: https://caniuse.com/#search=hsts
[6]: https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet