---
title: IIS 應用程式設定資料夾權限
categories: 程式技術筆記
tags:
  - IIS
  - security
  - other
toc: false
date: 2019-02-04 23:57:23
---

# IIS 應用程式設定資料夾權限

在 **windows** 環境針對 **IIS 應用程式集區**設定的應用程式設定資料夾權限，設定方法很簡易，紀錄一下資料。<!-- more -->

## 簡介

當建立新的**應用程式集區**時，**IIS** 都會建立一個[安全性識別碼 (SID)][2]，表示此建立的應用程式集區。但是此識別不是真實的帳戶，所以不會在控制台顯示。
以下方法，假定應用程式區建立完畢。

![IIS 應用程式集區](https://lh3.googleusercontent.com/wCkqOKGlW2TzeyS-wLnVitZDeg19HZ5UngjE_kEM-8D-dqb1BHDnKlnAFabpv4YF4OcWBhYDeABhlZ5VehvwqbTwmAxC5ZZGEMVL-FI03se23bpCHPV3tn6G5UxQx8WpOl7W4yGjoqO6Xbuz4dC2irk8ceAyiYrZmuFxBvKcNz4N9MXjleLAk24VrgMMUpeYsqCBLQmlIcMomuNW1tmP2Dsbscb_P1A7rciXG8cJ6g9OaS_vZGzWxwQA6qMeGHNekD1Z0GOK8i1xOmgn3zjdKGH6uxh2-L7CfFYT1HY9dWzTuSsUm9t9G0IOalqaiTIBQJ_A6CjLcYVhMCXWQZBQWgikns8JfEzwvWj2TksDJuw-XKvjLJGU20fZcGSwbUPJXouKFFYZZXO3DejQDO2qSa7gvGXL1qpaZuch7fGXhjTEI4S3NWYkQsQbbAeJO-ymx8wH8fALUiCIS58AO0W6G69HpAxgdxV5k02JHdYI7Cj0qzxxJE09KmPFx7Eq9R_kMFzPnIYSf-G5MPXXZkWhYXXbAHvSgVgidZz1vjIjI_8vsXoxXEQjiKay8NkDaWOmgg6dFzcmfXFrrMz7af5onfLK7lCVWiru4aiKgr9gXHVpCHgtsi2PhyNYLDMKVnkPXbxLD-8gEmUmrF3NcR_ov9rofqsSV4-Jb9AkbVsg6bD9KgzhRhac6OhQKskjG-yA66NSRa5JHdTt5D9j_P7PFqCn=w691-h286-no)

## 方法 1

直接針對資料夾設定權限，在 **windows** 中，直接透過介面操作

- 在需要設定權限的資料夾上點擊**滑鼠右鍵**
- 選擇**屬性(Properties)**
- 在屬性畫面中，選擇**安全性(Security)**，在按下**編輯(Edit...)**
  ![Properties window](https://lh3.googleusercontent.com/KhfbtzN8esZXN4SGEtvTtJAk9QZNJkkiFbABByLwjUSodg_UVO55Q7Mt4bPyPF9aFASPiDRfpgIGeF4kcmZlxi1P8Iv77jj_axf_JG5X4D7bcugUa-d5n2c-q9jnD_7mG6AOE_afNVSc9JAKM6ZXrCXrNjOLhcfx3osEWa9FPYGtErAo-01btX10jWBx52cosSmM3QqwSbn18nqigNmTBiJRt3E6sW8RpI9P7B33jhd1u_2X6_IvW4y-IOtL-jedcurS-d-HJ3ifTsB51jGRcurNW7pCiIgYlcFWw0WvS-ffdEyM7DkgYjvcf56I6wc2Wr84ieDpUZhnk1U-ibqJkdMoQo15db3m_qqlUkxLY_Q412UtIcPCd7quXqmyYVHbITMM3sjhe6aNHWppxE26QAzIn_2teZ64M4V13DsgSz7jW65b2wf7IliM-QUoRlF9yxExp5Xm5bs5rn4EKwOZbTUsBqyM5wyfgi4FKIrhkVYbnXbgOG0ufLygmAMrZa7lJMVwFw9eB0HNR1oKtOGXu6ahMhzmasI2p4OhR8NVxsDpfejcDuB0g7j2CZuqXlc6CM-eWPm4zGTSvlN113rcqGCPodvPnVIbHCntVE6uL-L5_CeeXGZSxiIPfsEZTOq54B8VhAXVu8M1nbUskjGKBOTZMoZ-iGQoohyb1f8FZO-wS1OXJ6vhGsQo41vQxydios6riNPLr8yLYTnX91gJJLh-=w484-h594-no)
- 在 **Permissions 視窗**中，點擊**新增(Add...)**
  ![Permissions window](https://lh3.googleusercontent.com/xGoV3LaViVXBgBey50E86csfeZDbfdEcjEXBr5VjmDo5Mqq5GyUBmJyp7IJYrZANwaSf3xbZJ63CXy0ze_Qb8MWT-Mtz3DMDA7YN9lO-ZXwXj9XBqdlj8KuflWlQNDZ1yvUtiGnJ67frXfOXhRZXTWM070tQ75gN9ssHibQamnEXvyW_PuySTA18fkmceDoQZE5lT2iXG8u6jOvWp7cWdwBEtTijGf2ogTLu_IuwGTm660LoiDsaHwp0jNYB2pC959Z2VWZBHK1-X4p6TrC-5nbUqMUQbBW3xJoTIsmfhbXiNy_rHtRYwg1BJ6dMei8_x794M57InD7SMI6ELw02u_1UXOoFeHqLJ0TaxI06Bae-ofshiyyfx-7YHh75AIhbukSyF2loLVIxDJGsb0Vi_7no9h4xyoMtCSlULjdbY5JOAG_M4-_coFmXdc3WoPMxlTK1wJRIgRh7WuHRZkJgLXqPpGPzt8x2OLMkaDzsbcCiDZaOkrrWUS4Eu5qeHfQvZe-FnLPys94-fc6fYY8Oon_PKQGkVWBl5ax0h5GNSwjX_4sMjyI-9DnbvmSpFCJfI3PFDw2w3-cKPgXECFQeIqlZhBzCeKAQIRxO3hakXa4nSD_v_IYodP0IOQ7Xr80s2LSH7RACzS9j4fFsI7VZI-GNoVIcTe4PECB0L8JfwqqyiAmpXyxYDrs-jTcQrX9EUg1SMC5qSQ7T4VUZN3Rx5Yi0=w484-h556-no)
- 在**輸入要選擇的對象名稱**的輸入框中輸入 `IIS AppPool\myAppPoolName`。例如：`IIS AppPool\temp`
- 輸入後，點擊**檢查名稱**，然後按下確定

## 方法 2

透過 **ICACLS** 工具來使用 **command line** 來設定權限，以下範例為設定 `D:\temp` 此資料夾

``` bash
ICACLS "D:\temp" /grant "IIS AppPool\temp":M /t
```

## 參考資料

- [pkware Granting folder permissions to IIS application pools][1]

[1]: https://support.pkware.com/display/SMAR/KB+-+Granting+folder+permissions+to+IIS+application+pools
[2]: https://support.microsoft.com/zh-tw/help/243330/well-known-security-identifiers-in-windows-operating-systems