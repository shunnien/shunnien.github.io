title: LINQPad DbContext 參照自訂的 DLL
categories: 程式技術筆記
tags:
  - 'C#'
  - Linq
toc: false
date: 2017-11-23 09:31:44
description:
---

[**LINQPad**][1] 提供很便利的方式使用，但是實務上的開發，會將**資料處理層**抽取出來，當想要針對這部分進行一些查詢的時候， [**LINQPad**][1] 還是可以使用的，以下就是使用 **Entity Framework 6** 或以下版本的設定方式<!-- more -->

## 設定步驟

- 在 **Explore Panel** 上(就是 [**LINQPad**][1] 左邊的區塊)，點下 **Add connection**

> **Choose Data Context**

- 選擇 **Entity Framework (DbConext V4/V5/V6)**
![Choose Data Context](https://lh3.googleusercontent.com/NeECnIe8Zui89URsfqrIuYgqNHQRg6cRsiFCKDakKQZvKCr-4jyAezZUlONeMcgr46fgLSRggl5Oaw8QKUW_1U41ao733CNjy9nzNyrPIQsXtxLVFLNVBMBk__Q5G8yrTk0hgqPPlrsM0_Zy7n_Y4b7AcLmHCYhp0UQVAMI0Iw9CpiZa_9PK4Bb7dcGk0j7F7Un95onE-iYKwAr3JeNHdsHS5swUKDIFMp_SIozgWj1bQ95cQFIdqqYsn6w4nPkZYYvVeHtQTRDLUD0B9B7KtXb_WBK9J6ahcIXVe_aLvTctbSUx4LB2F_3OhdCucBluJZiWrjQ-7z8giHpHnidNVq1dSYiwRP9bfhY-meCmYK5NCtdSNLZoeRwpVFX6TuNYhx8OhljGcgB3LVY98efwqjdqZlVg4IsQ0I2wMuBqNi6zVxKiSPSYeHleZukJQ5g_LeJPB6sSN7TNCRGa2MIzwCjsaBScQxEldX3Kq1LqbRRQ1GjJVIGiHYgLVq5TtAW4-Y6cgENcVf5S-9y05Uk7afeZi-PO11Sy8RfHhR2MHRCcP4G0wyc4ajObE05H5rfJEY55sRpXxAqV12ZqNuctjsyo71yGFmSxd2VluyRPuJBMm2kUiy-Tk1esp27IvCLcki0atpP9SnO9cObW4CUsB_PmffbtQha9ZCo=w775-h618-no)

> **Entity Framework DbContext Connection**

- **Path to Custom Assembly**
 設定 **Assembly** ，就是你的 dll 檔案

- **Full Type Name of Typed DbContext**
 假如你的 DLL 內有多個 DbContext ， [**LINQPad**][1] 會列出 DLL 內的 DbContext，然後選擇其中一個

- **Path to Application config file (...)**
 設定連線字串的檔案

![Entity Framework DbContext Connection](https://lh3.googleusercontent.com/Ne4Sh6QY2gXAGz2CHjNbq9LmKNq0lpQQqF7cM_MpxiDFkU6IPbx_LDHy-_VhVoaYvoX-3C7b9kn5GRrIFQ7_5JlOMBmMKEssvGJv6vjNdJTeeWS7RGKEvxya_ahDvYSl_FAIpi4iKrOIr8E9Hb8Oe7JRfJDFZBh8pAkEc9CWblI_LVL7zPqsOlfhFw5Y_4U8ZIyJM8Ml5h5jHx-LtVP692aVmgnXqN8yc3VJ_UMiiU2FV2MJI2pG_F300FzbRsQc977eux5TEMRa9JD1bu5S82ArVjC_MAK-tIg8KVwQLRJqvKW9T3icRHceJNuMnfJx6s0y5vqvqcTv9DYSeHXWXSz-oYaxurJpYo1vvxextTfBB40BbAyw9QOQ_4tsg3PFDTpSUeTVJ4LfCaz6NI87aCKRCU4AK8_R7cnRXSkmbRSquDgK7y4-1ah7owHUqWYW8MK0upoRigQqSRP4MLikohazewMPJHqKf7vLWaGe1VEIqanB3y3zmfhrbFwCAWzxq8d6Fg3N3WwbtG2QiLdh6LKViQ5g8QIBC6pja_hqeRckUtHD8QFsFBVT6x-yoV4sy4zBfEG4moclG5m5OvP2TqxkuSw9t8MmHiy46iVRJ4tQRNxdDldqSJc9sjtFxj-3XaK0Grp3fL4b_aJKFa4-baSVx7n57W1rEz0=w636-h695-no)

以上都設定好就完成了。

## 參考資料
- [LINQPad][1]

[1]: https://www.linqpad.net/