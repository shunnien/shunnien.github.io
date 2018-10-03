---
title: cache-control 在 IIS 上的設定
categories: 程式技術筆記
tags:
  - security
  - IIS
toc: false
date: 2018-05-08 09:27:42
---

![demo](https://lh3.googleusercontent.com/_xr4yWpJJUdg_w0bZZbstCQjQZOFWi7H54VZnZkSdFXkR-jKELJFaxniFxNIOdb7s1n33J0dJ5DUv_KtMYQ-rpc_B-yYWmqS80KdqKCZNVq24GWwjYqSZ1LLBzdICYzExs-6bGEoSvbS2Y87-B90lwnnkf7MzKpw1be83tS4r_dQssrpmmUozlLHhnrYPwIL1x8iPKDFM-fPlgnNmdUyb343irwa-7VGExhqCgrUR9Q1x3-cRrl4w5e8n3s-Cc9_43u7ep0EPFVvlQIzsPyLfvbd3QD1Ip3sYIFmpDqA71sDB03jHVC7l2-GYAMtOht5q1XkW2ZruRnLGadn42i0sEyeXr1kX0zhryMCFDleYySA4ZhM6Jc_WelQW7avtrDP1vr_eTh7RlcVcx7VbN4q4mXegNqExWKB10a96PzARWk7VU5EpjqiSnq03prU0j2B2M1FX5PshsPfjL-KQxmOJ6b9NCtlZUtVH8Ds8htFEZk2Fch06KY1a9wVEb_sEPpebW-CF6p3uMunf8AKpf4n3RJSFCLrIseZ9JXq6hTZ1JgfVb56NOYjgyMZy9VXWlsigNjMuSEDCH_DksRHVT2MLLG9tj3W2GUFROG-SLKJ-Hedp7oF-IO5bQBdH8Hd3abYnSAuk6uCO6OcCWkFc1H9KPcRnNkIGuEF=w344-h106-no)
前陣子公司專案由第三方弱掃，接下來的筆記就會紀錄多個專案都有的問題點

{% note danger %}

# Cache Management: Insecure Policy ( 11306 )

## Summary

WebInspect has detected a potentially unsafe cache control policy for secure content. While content transmitted over an SSL/TLS channel is expected to guarantee confidentiality, administrators must nonetheless ensure that caching of sensitive content is disabled unless absolutely needed. The misconception that secure content caching is disabled by default by user-agents could cause the application to fail the organization’s cache policy by leaving the secure content cacheable by browsers. Unsafe specification such as Cache-Control: public would instruct the browser to persistently cache the content on the hard drive. Caching can be prevented by specifying one of the following three directives in the response headers

· Cache-control: private
· Cache-Control: no-cache
· Cache-Control: no-store

{% endnote %}
<!-- more -->

第三方的掃描軟體為 [Fortify WebInspect Enterprise](https://software.microfocus.com/en-us/products/webinspect-dynamic-analysis-dast/overview) ，這是一套付費軟體，提供 15 天的試用，而且功能全部開放試用，但是鎖定只能掃描 **zero.webappsecurity.com**

## IIS 設定方式

在微軟的[文件][2]中有關於 **Client Cache** 的設定說明，以下列出 **cache-control** 在 **response** 的設定

- Cache-Control: must-revalidate
- Cache-Control: no-cache
- Cache-Control: no-store
- Cache-Control: no-transform
- Cache-Control: public
- Cache-Control: private
- Cache-Control: proxy-revalidate
- Cache-Control: max-age=&lt;seconds&gt;
- Cache-Control: s-maxage=&lt;seconds&gt;

在 IIS 的操作介面中設定相當便利，只要選擇 **HTTP 回應標頭** 就可以進入設定

![HTTP response header](https://lh3.googleusercontent.com/i4EUc8WWlXXAvq9oT-GgFKgVEVnQqolY7kUzcKBlIJJVcpsdn1UrdwfufNdIsI4foh7treGnCrbmKJQS4u5N4YGh3HDqyaNpV4G8mrWhi5THK_2DMqDiIyU10nYs_mHgpFriWPH6skHZ2nzzny-7USUvuy3BhnzVKh8aIMOxd3FNKKYRuJA3-iWF0dK3vSAiwIqQhfCJPIwyV4A57ffKCDCPnyQ8dss_uGiz3pRmp9EAp1l2VLOVaz32KVO9wIZjbGZOwg-V_fXyfB9lhSD_CotIDAiMTU1FBRdjEaCawC5F2XlsOyz2Ipo8ApjC0AO_hyjfzw3HwNDTaflMMvonzVqoP-Blspub8MNMMzuOvj-nrFiHzzsKwzvjirsVaireVeNYEp_0Pjc-aKG-wlNhEohivITYALr6b8COgNDABytayqocbn5HLn48mut79uSLrklplpGNuzaiYW-vVgYY-nL2-xCPzjWyiRm5NRIx-n2GOfhRdEWep_1W1Lv3nDODUEQv4FkRZMm22kYE01WtsJpNrifC9yuVmVU17xJwTMVQ8ViNhtnSzaIUYIhdodQf7Q2meDuY1nbn1moXacykT1dZLbd46E9PdJSqQGVCigM_GnQCONSupa5FrjBYlCLdyciaZuzSYy8IHlaWVvE58b8kgcwPkTUw=w686-h443-no)

接著選擇**設定一般標頭**就可以設定快取時間

![set header](https://lh3.googleusercontent.com/7t5DB_jySLObeuj2LDjBLDFtlJ5n4McRzxJd_vUUmwyD98q6LVgjCVzRMkqMaO2-6C3UigSocf_LUW2q7cb_-wAnUi65XsCCmNvygCNVPVqWDC9VaEjkvOG9RLE3ZsqgXxN3k7j0QPl531dzlU4uM-ybLxG64CphZNrXSUMdXmlxUsJINSVqSc67NLhJrjgvHQ0fQMCVEM8ZhZRFJlfgO7GTkz6NN9RwFpNEnbh3Gw_s5WioHcrU_O9Otaw_9kW3wEybyqA8yvXi_eYE0yvN1YmsmyZAlO0qJ2q2JqpDEZzGDH2tjHpX_2PfNwxNlhTjPwyVI5-M81InEDcrG2yRpHy4aX_MB4ukOsrnLxg0VyooNnj1mb7eaPC0MqapyAN2JNJDuudYcSXMyYdJqb5P4ovr-GYpZrpcnTxi33cMDNclzKQ2WAX_ILHO3TiEvcPjnaKOTqrTei2gmXuzeQ_8wxp_yoxERGN93ug38UoKKgREml6c4j3Ja8tKeh1yOMGqjq4T8TM5r4Zl2SC5IdsYT0SesxmsthildAFqCycYiFjEpWECWBr4e0nmLIpd1rbh52a0M9SIYo-99qd7Xs5PrdIAu96cT-kwoPxdmITEIQjEsgblIIRcRy2XsHe8Z4iZ36gKBjpapnTYmIXre_PhmGkqDwRzQPCm=w773-h414-no)

## 使用 web.config 設定

設定不使用快取

``` xml
<configuration>
   <system.webServer>
      <staticContent>
         <clientCache cacheControlMode="DisableCache" />
      </staticContent>
   </system.webServer>
</configuration>
```

設定過期時間為 8 天

``` xml
<configuration>
   <system.webServer>
      <staticContent>
         <clientCache cacheControlMode="UseMaxAge" cacheControlMaxAge="8.00:00:00" />
      </staticContent>
   </system.webServer>
</configuration>
```

## 設定完成檢驗

檢查方式可以透過 Chrome 等瀏覽器，開啟**開發者工具**，透過 **Network** 就可以觀察到 **response headers**

![demo](https://lh3.googleusercontent.com/_xr4yWpJJUdg_w0bZZbstCQjQZOFWi7H54VZnZkSdFXkR-jKELJFaxniFxNIOdb7s1n33J0dJ5DUv_KtMYQ-rpc_B-yYWmqS80KdqKCZNVq24GWwjYqSZ1LLBzdICYzExs-6bGEoSvbS2Y87-B90lwnnkf7MzKpw1be83tS4r_dQssrpmmUozlLHhnrYPwIL1x8iPKDFM-fPlgnNmdUyb343irwa-7VGExhqCgrUR9Q1x3-cRrl4w5e8n3s-Cc9_43u7ep0EPFVvlQIzsPyLfvbd3QD1Ip3sYIFmpDqA71sDB03jHVC7l2-GYAMtOht5q1XkW2ZruRnLGadn42i0sEyeXr1kX0zhryMCFDleYySA4ZhM6Jc_WelQW7avtrDP1vr_eTh7RlcVcx7VbN4q4mXegNqExWKB10a96PzARWk7VU5EpjqiSnq03prU0j2B2M1FX5PshsPfjL-KQxmOJ6b9NCtlZUtVH8Ds8htFEZk2Fch06KY1a9wVEb_sEPpebW-CF6p3uMunf8AKpf4n3RJSFCLrIseZ9JXq6hTZ1JgfVb56NOYjgyMZy9VXWlsigNjMuSEDCH_DksRHVT2MLLG9tj3W2GUFROG-SLKJ-Hedp7oF-IO5bQBdH8Hd3abYnSAuk6uCO6OcCWkFc1H9KPcRnNkIGuEF=w344-h106-no)

## 參考資料

- [IIS/ASP.NET responds with cache-control: private for all requests][1]
- [Microsoft docs][2]

[1]: https://stackoverflow.com/questions/47224561/iis-asp-net-responds-with-cache-control-private-for-all-requests?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
[2]: https://docs.microsoft.com/en-us/iis/configuration/system.webserver/staticcontent/clientcache