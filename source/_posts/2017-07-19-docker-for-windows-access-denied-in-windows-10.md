title: windows 10 中 Docker access denied
categories: 程式技術筆記
tags:
  - Docker
  - Windows
toc: false
date: 2017-07-19 13:43:01
description:
---

我使用的 **windows 10** 中，我自己的帳戶不會是最高權限，會額外設定一個最高權限的使用者來提升安全性；詳細操作設定步驟，可以參考 [demo 小舖 Windows 10 新增本機帳號步驟][3]。[**Docker**][5] 我在今年初裝了 [**Docker for windows**][6] ，本來開機啟動都還正常，後來發生了 **access denied** ，想說怎麼權限不足，上去 [github docker issue][2] 一看，原來需要設定用戶群組<!-- more -->。

![docker access denied](https://lh3.googleusercontent.com/89KcL81sOuWBAADdiw5IsGv_TtVEWUCskZ-T5ODcKzx_Oi31v-pUTAZ8kcSl3QTonDwzAScucegA1yj22J5FCLyygbI0yJpuP0w9jOKGfoC66dTNHd9e6N9kTYfBdlZnIsYO5b2vDXiBMqjbB_A2UJicv57uD-fmlvHd5onKku7YUvsFriTHYgmdOdWFNgNrkEf2OFXgP1Ayj-VGQ38rqSIW0WtJQddqFKKhVd0S_qHMFy53c9jgE6q_AqXtnwqi_g8Du1pjSg_BEcCyqm7hK7BiiVPChr_EQArpcFj9EzL6FFNbj93Qabxm_uMVfu2znSUaj47FY3GDFj5de46_P4IAS9dxA4zL9z2kSZ_Sy-bd5z6h-6N0OCpIJQSJ4Zk1QUBPID_qgFPAStJHcOHgg1Ls280cExa1BlGLlBMBflDub9DBiZvENHb8p4cm6GwQ2cjdW7CGJ8lGbzb1hRE63_C4NfU_e26PxRIE0yVS4KyjcRkTB1GbmjJ7D4pbrj53UG4ZMz2g5g4Rdc71qIG6SCDfwUt0WkcrOB0Y5USNrF5JElkriOF7IE-Nli98I_btTaprpZlvqJwPLnDc8i6FxtvhNL30bzerl_9BcfnKhWV1HSJm8b5wdEu6VKmXpycWJNM1mbwWPhvahmdnnAaZbBAoLfuVeOUQW4NcilPWr9LPAA=w446-h148-no)

設定用戶群組可以從以下路徑開啟**電腦管理**，記得使用管理者權限開啟。
`
"C:\WINDOWS\system32\compmgmt.msc"
`
![Computer Management](https://lh3.googleusercontent.com/vQWiYpisFvx5scntHlYvLcb1-yLlxtqG89ykpX7GZd52XRITSSgcjdldjiObw_kfimHc0Hu3rrOk9QqZ2PwNrRqRT-Sj_iNN8ao37EFlKDbiFC2knox-KS-W6agxPcwo0pEV0jcGupphaSuDSsSGfRM61I1qoubDTA4UIJUiT7lnrMLxzpuA_acwlqGmhs6SzR-FaPm3GlzG4FqOSXRHbdNFxKnF6gdbYIEg3T5tZincG0VJFdNeX85jFi6UTPF91fAs8rAcPcWQ1AzcBs0lP_NUUejUgLo3pBfEEGcqYlG7tbhJAhcvchPXxa9g0H3TPTUbyYZNjn8LH697C5kQcaFkbwOK9uGN0rS9ehEJ0YIf3TFVQwH1GmIBZn0iu-Mke8-9LDlh--XiaSNG-0GzJCmGc7RKxSbqZe53_R3xDmeGR3KXmO7ULmg5cy_5U6Rz1AG_srB3WD09hXcS7XCFimbpwaPXPoKP0_ln25_TpzN25KvwYnjFPhNcqGhjfs7gNi0EXXKc0uN4Mzguo0Mj4bJKsxfeovAHxJY3OEZOofk7IK0WNsNA8izbl0eCcqpkm0YIn2Q7oUeylJzw70wAxm1uxK7eX31Q16qfA8cWT5sSwhz0NtFFgcwkimZj207Mr4MOl0kv1GKsNL6v5sZlqzQeVNaIzyPf9auo4UmciWPQ7A=w745-h613-no)

設定完成後記得重新開機

## 參考資料
- [Docker][4]
- [Docker Docs][5]
- [Docker for windows][6]
- [demo 小舖][3]

[1]: https://github.com/docker/for-win/issues/868
[2]: https://github.com/docker/for-win/issues/785
[3]: http://demo.tc/post/827
[4]: https://www.docker.com/
[5]: https://docs.docker.com/
[6]: https://www.docker.com/docker-windows