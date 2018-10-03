---
title: mklink 指令建立 symbolic link
categories: 程式技術筆記
tags:
  - Windows
  - Windows Commands
toc: false
date: 2018-04-21 14:44:59
---


這功能簡單說就是建立指向目錄或是檔案的連結，例如： `C:\temp` 資料夾設定指向 `D:\temp` ，這樣原本 `C:\temp` 都會儲存到 `D:\temp` 內，類似捷徑的概念<!-- more -->，以下就來詳細看看用法語介紹。

# mklink

先看看 **microsoft** 文件上的說明

{% note info %}
Creates a symbolic link.
**資料來源** - [**microsoft docs**](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/mklink)
{% endnote %}

## 語法 (Syntax)

``` cmd
mklink [[/d] | [/h] | [/j]] <Link> <Target>
```

## 參數 (Parameters)

沒有參數設定的話，預設情形下，建立的會是檔案的 [**Symbolic link**][2]

|Parameter|Description|
|:---|:---|
|/d|建立資料夾的 [**Symbolic link**][2]|
|/h|建立 [**hard link**][4] 取代 [**Symbolic link**][2]|
|/j|建立資料夾的 [**Junction**][3]|
|&lt;Link&gt;|指定建立的 [**Symbolic link**][2] 名稱|
|&lt;Target&gt;|指定新 [**Symbolic link**][2] 的相對 (relative) 或絕對 (absolute) 路徑|
|/?|顯示指令說明|

## 範例

建立一個資料夾的 **Symbolic link** ，由來源為 **mklink_source** 指向 **mklink_target**

### 操作環境

``` cmd
$ systeminfo | findstr /B /C:"OS Name" /C:"OS Version"
OS Name:                   Microsoft Windows 10 Pro
OS Version:                10.0.16299 N/A Build 16299
```

在 **windows 10** 下，指向目標資料夾不需要建立，指令會自動建立

``` cmd
mklink /d mklink_target mklink_source
```

![make link](https://lh3.googleusercontent.com/-chmKATkbxi3yrxskTOnQwpD6ZclKjnzUW1V9zlUPCvCtg-UZdwd0cJ6EJvXi3oYToEOV_LC49IkEdFkCwa6eDGZu5gYrTyteokDAcHWVUdJNmKE8uSWRp1d9er06vP0pCuzM2ZYxQWvnDAwHlsAFXWtGLV4lBOUkqb468GEFDtp94pgSLh-gpKID7VtUwDuk7KltG5Dlm-SGJwlvpTuJmowkNnZ093erJ2QBmr2PiIiWXmXG3UkkSSZTybd44T6w_zvgNgdFlwT5HVmQ-6VbPrUP24X0eR4y3cWI4e8E7fHZxB-TfSLrJc4BOs0ARn-RgPslHhunh_ynPwgkTWpCQE-iXTN_2Armsn9-DzPj-eXbQ3GVkpgK7FV-HC6qPbLwkIrjeaR_P_m6qON7jjl0-24j3M9ziMJ2XAxV-b7NPTGtNkJGI-dMVC2iARkKBWgXvkKBbLdNJrkahOh7UeolgYl7C1w9XnYE3yCuA1vjcrHUdbv4HmljiHrx4mm9jFpqZ7LL0hc7wtddChYqqKHSBIq7xCBjaAHPlns2ZTru17Ucq1p_faCPT-nq7GbgegQspklOjNtvNJYf6UtlFTB6q2FgVYd_C532yG1cVF5gcTvA67ujEYlMBM_wRQOajMO8wj_FfMZMzi5PBRtfTY9jcnfvzV9Yqwr=w772-h98-no)

建立完成後，比較一下資料夾外觀，需要注意的是，資料夾類型都是 **File folder** ，而且圖示與捷徑相同，但是捷徑的類型是 **Shortcut**

![shortcut vs symbolic link icon](https://lh3.googleusercontent.com/p2qBzPTNpsD6XdjIkL-DIxnimkDD4nIIbKXSQxRPJheRXnA6konpltc1R9cisZiu-Ufd-XHCvU6mhJU0Ia_Us5o0SyNMFJjxrjGx8l2rEbWvaNvTxM_Dhsmet9ly2jF4ppT_qLdNDxWBoPIhwP6fMwBnyfUxYpkCma9xtlga3KNLasRjKJdZzbyf9vIX91snTroOem4rlT3eiPVfxbGKzvfRuwy0XZTyWzasiC2Asv2fnzCEC2FQ-J4Ayt42jBvtlqnRw1zV_DNqlShGxCD2GNexMUDBQnwfKEXW329xE5QWFVLfrzVctK7wGzxe2kEgHhk3WM9F7ldlTs1oa8XROJP7fI3XP6-ZAPEncYoljVsDQ83yknLYvn4SPgLY3o13VDA2qa4V3D3ERi8A7dV8tn1hwbOfKHHKFP7CIIOhG7IfnIf6T1bRlYQ4SbhCRdiEA7h0NMSCbOJhf3bjcISmM0K2UkllYnXxQzJGFMwx0bvwk9sVn1GJ7bS875xzklX7QSXLm2gth1qdlMkx-zstgAeZP4lYEWiaYIDWGW25yjP4wB0BQqnS75ajkiLJ69jOfiZQwvW8r9uj5ak-iVp1Cxn_-2ZUA8uMzdJ303-vq_8zGbRCuCtdckPv5xIq7inH-PbnUSAv2egbP5ucv4oxodP-4B0AlmwP=w626-h118-no)
![shortcut vs symbolic link type](https://lh3.googleusercontent.com/vSHAUSrxl6qKj5bEA8ecWa29juuEVeT2mVHbQEwjP_gYrj0hDEmzB1qcaT_rig2WryFzNJttlT7NDxocnmF3638tBCuyKcAcQs_AVzkfDVqIIKhbkj6qkH4Wegz0QD1WbJCW9whHmS_YGx9ZxhXOW5Ji0aMC74sDAdibxGZV1DXjIc1IJrHISJIUsJAsRxizeiiZuIlcNNadawR1QS4olMdwRiBv8ZsNVDZPJLGVBZvtl1pEs4aS-WiqzEaoWF81pvm8CA3O6HW2KlFWSr80Atnyu1cnbPc9WWydrL3sGmMFzERAAyIWl-YtQA5tJPuFqP1CHg9NMUJfWEmF3Laydbvu77AEJU7H7jthVE2yrt3-WPor9QJqnUVJ87dhXlr7AN_nyo7clD_dy_Yf-zI5gUgedj9Wip8_qxVltmblM9q_BNvey0ekzp_0WbBhUQn8h9-CcpESwttIrs0_fCubDCIvAQY8-47taagSZREK6rMTWM2V7wszIbd3m_SPma0LBfm7t04U7cj37aEy0aVGQfP4ucHFei8yrmpHPjWbbYQ8ARwArG6Nx1Avp_eHZRXoT9gzDENculii7V36nlr90Hwo0TxYnI9N4AswijOCH7p2no7mcZgTIF90Pd62SZD6NQKTNDV0sxyN6a9bFDcleYaZVLfoAGDV=w958-h514-no)

不需要的時候 **symbolic link** 直接移除資料夾即可

## 參考資料

- [microsoft docs mklink][1]
- [WiKi Symbolic link][2]

[1]: https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/mklink
[2]: https://en.wikipedia.org/wiki/Symbolic_link "Symbolic link"
[3]: https://en.wikipedia.org/wiki/NTFS_junction_point
[4]: https://en.wikipedia.org/wiki/Hard_link