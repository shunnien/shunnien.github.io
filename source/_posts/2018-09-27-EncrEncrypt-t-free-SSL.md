---
title: TLS/SSL 簡介
categories: 心得筆記
tags:
  - notes
  - other
toc: false
date: 2018-09-27 09:11:44
---

# [TLS/SSL][2] 簡介

此篇已經紀錄一段時間，但是沒有把筆記整理好，這次把此篇筆記整理一下。<!-- more -->

## [HTTPS][1] (Hypertext Transfer Protocol Secure)

[HTTPS][1] = 加密過的 HTTP 連線

[HTTPS][1] = HTTP over [TLS/SSL][2]

- [TLS/SSL][2] 是一個介於 HTTP 與 TCP/IP 之間的安全通訊協定

[TLS][2] > [SSL][2]

[HTTPS][1] != 安全的連線
HTTP = 不安全的連線
HTTP/2 與 ServiceWorker 僅支援 [HTTPS][1] 連線

## [SSL][2] 安全通訊協定

[**SSL**][2] 的全名 **Secure Sockets Layer** (**安全通訊協定**)，後來改名為 [**TLS**][2] (**Transport Layer Security**)(**傳輸層安全協議**)，不過大家在口語上還是通稱 [**SSL**][2]
[**SSL**][2] 是一種**安全協議**或**加密協議**，一種以密碼學為基礎的訊息交換協議，目的是為為網際網路通訊，提供安全及資料完整性保障。

## PKI 公開金鑰基礎建設

- Public Key Infrastructure (PKI)(公開金鑰基礎建設)

  一組由硬體、軟體、參與者、管理政策與流程組成的基礎架構，其目的在於創造、管理、分配、使用、儲存以及撤銷數位憑證；簡單說就是一份基本規則。

- Certificate Authority(CA)(數位憑證認證機構)

  負責儲存與簽發數位憑證

- Registration Authority(RA)(註冊管理中心)

  確保**公開金鑰**和**特定個人或組織的身分**鏈結(辨識身分)

- Central Directory(中央目錄)
- Certificate Management System
- [Certificate Policy(CP)](https://en.wikipedia.org/wiki/Certificate_policy) 憑證策略

## [SSL][2] 伺服器憑證種類

- SSL 伺服器數位憑證
- EV SSL 伺服器數位憑證
- 萬用子網域 SSL 伺服器數位憑證

## 不同驗證等級的憑證

### Domain Validated SSL (DV SSL)

- **驗證等級最低**的 [SSL][2] 憑證
- 通常此類憑證不是免費就是價格極其低廉
- 此類憑證通常不適合企業或電子商務網站
- 僅做網域認證

![DV SSL](https://lh3.googleusercontent.com/N0Hj4QRTrETqfYsWlZIeJ_EOQPKcJHnvc4qw3WY5kD0xC-d7pRwNKhxNtVGsmPPD0h9tg9FzAhFk_JDDRwPmtJsqEZyLNTbGRRkzjRcyjGI3whA2CLusdQfkvlXjsikHSPDipVaVo94KR9zxh5695alWVEtsd78sY8uw_u_xZkftuDZomdCTdb7xetescHK7pxL9BYZz2vd17VejQ87aMZZDZOqYFWhqnIizq7S6eo3uC9w4yFrv8My-I5Qe2skAXaUXpCbcRYpFgKWloefH9viMY30XW-RuK1-0vgl6s-D3aYlN9LPJBK14I9XifdAjKLJWa1kYFy0PX3cAlIYAQmj20AejssHrlRUrBwAtz9kfuaWwkxs-w3jIIi6h0bqPjWCPsrK_ssJT97Ljt6MoDXk7rlEAwRpJfGTVkL1Qb5HrAzRNtntrB1v6RL3jwX-aneYRqvFmyN7F4bpINe4xiqpPquonzFcMrC1LUwIeFs5LysOBSUWqqt49TAiHn5HKsNaxoGkiuz8J3AmcAcc53njcZG1q96G5O6UCzxrFF5hS4KLmFXhPPM1wuyoYVvX2Dmo_b_XrI7H0CZnQ7_o1gYlJ_aB96w_VOQzDDFunxrR2PZO_23vv50VC6zAfp2uEE0HyMwLQfg7SrFaQKzPT0iDOHWdJ7Ew0oP4nR2EApVnCrobq96g6Tan4=w1206-h417-no)

### Organization Validated SSL (OV SSL)

- 公司組織認證
- 在憑證的 Organization(O)，含有組織資訊

![OV SSL](https://lh3.googleusercontent.com/K635GESidYbmXa8xrEOW9ILZ4ytZ4SIBNaORr33RmJvcDPkIFjW1DRh4tzhfJdxdpjO_PpEGrsNU0uPXyKJYxr2hbuVeVa52Ff6bw2EOsdsqAVYjJ3z8NtkozchpP8lvv6cHAV_5REbsxKQ2dmKJZ9zGIDCbiQ6c03eB1yKcKfGL56WO_sgpqZqgcDRrYG_IQvZjY2sE2BHyfb0Je4Fkll3zOQOIcbW8bdAvEHLRBb56FGoU2MEGTnHH-AnABi-Yg4NmFUX2-mRRZqAnjNKzuwwidfErq0_wak2Rl6-pnH66qta6crXHN18BixnT7hj9gLFQAsBRnDLNlAIQ4BqswzYzOUPxzFYD4vEkp65KBfOA7-Mp9tI17_bDRbsR407Pb78adlWbcBqgWNaZ7LzZcXqZaXL1Rx4DvIyyXbCbVxirCSHTzCZGlU81maHmB3sLL_CkJCkPgQUL9D032y2V-jy2r1QrrrdjAysI7dyYLsfrOxHS8aNU74dyIZ_BAYgC6nOV8KtxX-SglePxAYq4DcSEFAs_crJWTOtZMehdDgcGfkDqFSPMIctvztRA-g39mYDqIuVdgLDkEMwXocXAtOzaearMaHdFPBcsvshErIc5hJX-p99iUTRRRBKzi9Fx7GC_HTwSTtAz6Jl-0BMJgu_IeLXns5Ll2OSBlA3_AkLoqItHTPmF_IBP=w1201-h424-no)

### Extended Validated SSL (EV SSL)

- 驗證等級最高的憑證，會打電話到公司確認該公司存在
- 各瀏覽器網址列安全顯示公司名稱

![EV SSL](https://lh3.googleusercontent.com/HhNgvSwKXo9eQKylWcYnkY9Y48YJ3xaFLtXRZ8OaB1a1AHh33naakaJaoTgK4lIdPB6Y5RumwAEquvqU_zNDm27FrN5FDoNxTQW4Jhsjl2kQ_szz4TD4Qbszs60w0GZIjzzxSW1o3jByRHeaF28QmFj19HLn_De5eFHQ6jd5k9jjWGjY1Ci_q0b3Z9ToVHiCe_4B01u75Y_v5r3fcmXOmVcO7VlkWS22CV0D7ryeiA7CRJUf6tqxv1HoYYOpjAa5SXrDDwWMlCm2EjSnOZnPU5mh_SvOXzV8PjNOJ6xnfXkSDgO6KH6Vz1kNfQZVhTG-EMCgs6pT3caEEvlDgMjkKHZ9XTC_7X_si-Unr3Xe6sbVKIPHIekg0ip0IhBE-Ew45Cj0ZEoH5zD1KD6fUxzFVF9i9lO6GxrApqxbHA5j1cygHT6yleDwQpohMQOwyrCs2YCyEtjzmV5KdsAKnTu4v8EaZpoRLX-cx1kX6tghnm9tqocUytXiBDDaLqaGP9JwZW0iNphq698kvW29U1hNko2q03P9jkxSGY63I7V4olWuRCp_5pEJZb95duFy7oEeAAIiO1Xk5vnf29TiSskYzpA3tlLc9ikUxt_VL1nq0Veh3sSQ6_NHtz7rOmTz-hr6AxDTwbmwQT7T_lyaNYZWRHmDdpe9VSGbRVqgpdOwt8b-v8fCh8KJIowx=w915-h152-no)

## 備註

- [HTTPS][1] 相對 HTTP 而言會吃到一點點效能，因為需要加解密。
- Chrome 瀏覽器中網址列驚嘆號，表示網站是安全的但是裡面內容有些是不安全的

## 參考資料

- [wiki HTTPS][1]
- [wiki TLS SSL][2]

[1]: https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%AE%89%E5%85%A8%E5%8D%8F%E8%AE%AE
[2]: https://zh.wikipedia.org/wiki/%E5%82%B3%E8%BC%B8%E5%B1%A4%E5%AE%89%E5%85%A8%E6%80%A7%E5%8D%94%E5%AE%9A