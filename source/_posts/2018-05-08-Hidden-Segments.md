---
title: 透過 IIS 來設定 Hidden Segments
categories: 程式技術筆記
tags:
  - security
  - IIS
toc: false
date: 2018-05-08 22:15:07
---

此篇提到了網站的目錄不受保護，或者說是敏感性資料夾名稱；簡單說就是整個網站系統有幾個資料夾被使用者得知。

{% note danger %}

# Web Server Misconfiguration: Unprotected Directory ( 10224 )

## Summary

IIS/Microsoft product directories were discovered within your web application during a Directory Enumeration scan. Risks associated with an attacker discovering a directory on your application server depend upon what type of directory is discovered, and what types of files are contained within it. The primary threat, other than accessing files containing sensitive discovered, and what types of files are contained within it. The primary threat, other than accessing files containing sensitive information, is that an attacker can utilize the information discovered in that directory to perform other types of attacks. Recommendations include restricting access to important directories or files by adopting a "need to know" requirement for both the document and server root, and turning off features such as Automatic Directory Listings that provide information that could be utilized by an attacker when formulating or conducting an attack.

{% endnote %}<!-- more -->

# 處理方式

此篇主要使用 **Hidden Segments** 來封閉網站的資料夾，此種作法會讓此資料夾的 **URL** 連線的時候回應 **404** ，直接讓此資料夾不對外連線，所以此方式適用部分檔案不對外開放的資料夾，例如一些抽取的 appsetting 檔案等。

另外一種情形則是網站要求有權限的使用者才可以下載的檔案，這些資料夾路徑假如也是此種弱點的話，有兩種方式處理：

- 變換資料夾名稱，讓人不那麼容易一眼猜出其內容
- 轉換程式作法，檔案需要透過網站程式轉換資料流去提供使用者下載

## IIS 設定方式

- 選擇**要求篩選** (Request Filtering)

![request filtering](https://lh3.googleusercontent.com/drzn9iG78x-0bri00wG0Fi0wCd8WGONeWvbmAqSWralWCXia3fse0tzyXxhD-JHjIYfxfXzw_azpb00BDYN9QdXnqIm__N1iFs-Fbx4ImGZxwt3gbCgHZybRPlK-9FO_vi3k4H5t3Jiv0E7r31JyxgtnEhikWv5MyYjrm23Ld62bbHZDhLG18qgEMZyZe6exinvBYOH9Zv6MHblke1Vsqblp7IWwV-UeA64GJPTdqh3TBr1FbDTrLBvSWvFMpRI6nZyGtPTg9Qx-tynmHWi_Lv4gv1XFvGKtLzrMrqYJFq-hrT2ILEOg2NqScFOCsyZu9Kyr-LEpS8ZmUXpYyvJmCnFAY6YaFMok3_PyU7ZKYdqDrGObGZBNtDFNFtfElGNdfoby_-8hKEcwB3FiNVROF46E_OkHO1iHArcC3cQDlRC4qFdPjBsZA7UXE7ZIAUFsIpqvkp6dfzn9hSPpRfY5GSkGBki8-CZ-jLduQP25gKnpk43u4x-DQcylrbwcRU8Kh9CrUbe3HtefjUqvdClhr7xfj0AhKuzDdYWBXTFDw9HNou9UkC4Ysn6VdDekXo6nfksoOhUuAHu1SMR8J1RNztKNXUeQG8Kp55AKFME0uIdcRsZPqPHOtFhMNd8c9mocKtBTV72NrNs960V_YhZs9mhW_ZTV41h-=w493-h261-no)

- 選擇**隱藏區段** (Hidden Segments)

![Hidden Segments](https://lh3.googleusercontent.com/5Pb5PR_BG9NaTmZKy_RFZYCi8RAV-navEUGBLwssoDTZFA3VvV6juUULM60q-v7IvUcIx36tVew9UMptF47Vv7arpqA5guMgPF6F91L5Mok38OmMQF_Cx2YEACRcmaKrFhfm8S9hWTCYzc4BihI48SczisBelMqef-aNKGOeSo_i-VZdYfSd3LrVznqfkW8fe_AJ7yiyUDXHQcgG4IvvpUYUjJ85auIfGlQhu1bTqe_yZfTLbFPXh-4KCHD7Gkqv0XEWtxFn1Zuokat0xDx6Ql4JI0FVIkSIyHVAp21ggrzSqfIqukU7s56eWIEPkp5YaOsZwc3xM_BBnG0kjHM5UK6PRxSVriyXfNrXP7puMpHVTFCXAANyT92-J-jER6Did9j4cNtlJXnVKA3Fqqt98fSpHouEDE130sTnCVrlY9K7VRteaQ2WEf2NpKoxJJAJ66KgAoY-oA6zmgTUisF0x4I4npIiXxHrmiSa0xbVuE7JDp00LAvdAMkQw-RYY_9GOEkowQHHcTcNaSHsxOQP511-PoVCUQSzf7fcsV_0Tr0uo-_oGB1dCJZEZd_uq6xGZTQTEZPCeO56K80yahGX-0fzIVlJ8AcX9DEgr974edWbEAKcNkcJMH5_6cwXaqkz5_zr7VN6xqXsTReKPUe6Pg16ToGong_5=w352-h475-no)

- 點選**隱藏區段...** (Add Hidden Segment...)

![Add Hidden Segment...](https://lh3.googleusercontent.com/iLUGJobAZcWrDH9M6SNzgqfizb7xKYgxOREIFzQE7GRGYMwHwPXwp9bt1ImagkZtXGCcAAb58yINcrMO4X9cMwNS461bAlys4xFfaN2I5wd9ftFVxHI2yuP_Mz48y9A213CGiyH8FFR6iJod5HJ6H-RY_lqRcF-DNg9gXUFuw3B9OrQjMWlxD39m1WU6xLu2v3igTOdVY-8tM-RZQ-blZCHUOyVqrDVt3SO1X6F-szyzkoLPEMZpgjgVOKThqHrwYlcf02DK2x444TbMjunb7bh7zYO-KtlTFe9Qa0IJrxVunbwIaOOm2wKOjvJ7IM0mGQl4U762J1PNxNZ3Qvu0T-Y-o57FFwdzdUTxwzTs__7kvRsGQlJTJef5AJPqjaTIcEenSIkgdPvJZ-oKzUgd4loxWDEzV36IlQqbWY5VS_i_ep2aP8BHpA5NKnrI0xp8asv9HLnItUoBCDDHUbfLajuSkHqzYxQgJB1b6hmunXPiQ2xjLTdiPjfBuEMpeSPGDYFDxaRUyR5NCL4JNjfNP5r6m6mMY4J0SpligsomRO2EyqlgJCxN-yXumRaDRaETHztT-v4Tp1rVaLQNAAdwTIxbgaoL8CrIizXsCor8gPrKmt8rKrbLECKCz0PWoQNp399wpOFHJ0iuyIinxEU3q6qtYjRdsSS5=w181-h180-no)

- 設定要隱藏的名稱

![Add Hidden Segment](https://lh3.googleusercontent.com/GMhdQTEp2jF0Qy-cWWLjFtnjvakq3ndztjq1VeSLNbkNTL9DPatJp9KSTitWhDySusDsv5vXs6aj-LEbhGPc7PAwv0UaF2zDbv2pSUg8g2s95HQkD1Zsv-yr9P6K8aCkxRmfxhrBA-89oflzbWfIo6nfpTniUHfNtTqWQkiJUe-LhQPd3lZQRACJD-oPUHnhbjQOADpJzCSKSuSOaP8SeUG4_Dr5bq_Kce3Z7GEq747dTGfjAupnKsb2ALnoK_fnGbMqCXSOSN6kh3RgJkzCKrhlS2FpTzjZg4kSbmFzalSnYMKoTlZVvThQ9IUuz081rk4s9Rxie4JUn7oNz-YaahD4rkTNRmkNUTbBwIdwUUuSTd8VE5RhAn1WjEzJpcTEKaqnQw1fKSQr1EOfhBVWkV5-_6VOXC-prj--vBnPzgbxjpxCSrzfeRdN-9YcrE6wJNsqcPVJXuMehf-oQebL0iZ1DPms4vWJJ2tTvYxXNPBWSnwh-XPkQYN6I2VNbHU1tOchFWOTIuNq0N5vqJ1sciOW0-EzJHpM74lCtg_jDlS0fH32N15ukcvuyAH-gdwQVsnCdn4hOL_on2LNkdPN4FPKvp-MdthbnMt68Ieda4hhO3X4dV0uFENYEimqjF0YFb39eVpiYdIb4L6kHllJCz-7K7HCgLtr=w403-h201-no)

## web.config 設定

設定方式很簡單，如下

``` xml
<system.webServer>
    <security>
        <requestFiltering>
            <hiddenSegments>
                <!-- 資料夾名稱 -->
                <add segment="folderName" />
            </hiddenSegments>
        </requestFiltering>
    </security>
</system.webServer>
```

假如想要設定**副檔名**、**指令動詞**、**高位元字元**，可以參考下列的設定，這幾項設定都是 true 或是 false 設定
![extra set](https://lh3.googleusercontent.com/ol5os7cslnYkHZ48YM5ojq45A-5VczJWKDszGVMpveWXV3umTzYgNlr9uJ1LnwT3J8U41_9b6BcEfAAbRMgeSTgkAEq5h5BHn4SGykz5Bfb2gh2FVS_HVbePe-eJ36GXRUS3MwEl5IS6SDrbf4H3kLQXxeGfTk5Ye4FUdPJL0HG3hLvJu4ycYGTY7B6oMhuntNz7EbDgiQ4s1B3vD3eLzoNpY_tmFp95fz2vFIHesJZ2X3IGZYSyNz_PKECtuVKRWIAKm7L-pBMTsqz2WwLJrf2UJHeQdVXd73XitHoY4BONWKQRjAYoRDrLoodjKf_TBjaAhvlEMlNhfFGI-qS5RTTpI8VmXjlFjaqgbptE4Qd1sxbiFoFnepPZcrSZ8ifm4IABTnRShUhbYfrq9Ka_N_BJmk9N332TxA3ybVR0bxwTCFJMQq3cOW5riD25bJnALYXtQX3Uwc4iH2VbyWWRpG99JdUIkZctx0MGBOHGfKz93VwsEAx7_MJiFg5gIm8FfxvE4Tr27kCeGpoI_IjfCodj09hZf5uJTrECGD7mOCDcH625Y-5MjTsNFuPOGH-AGdIO9MlLtLUebhkn3BSRPCXnNaBH6txJL9zr6us=w383-h231-no)

``` xml
<system.webServer>
    <security>
        <!-- 高位元字元 -->
        <requestFiltering allowHighBitCharacters="true">
            <hiddenSegments>
                <add segment="folderName" />
            </hiddenSegments>
            <!-- 副檔名 -->
            <fileExtensions allowUnlisted="true" />
            <!-- 指令動詞 -->
            <verbs allowUnlisted="true" />
        </requestFiltering>
    </security>
</system.webServer>
```

## 呈現效果

設定完成後，其頁面會回傳 **404.8**

![404.8](https://lh3.googleusercontent.com/BHWffAxOXHeREO3zxLUE-UP11N03B1QpJ6DMrn6ewLts7TDHj93caXiY87rgYWpLgePyVaohqZ2CsoJk3xluEM2UA-LaQmdAQESa59oHRiI0nfiW2g00pdY1ecm7OyGss4-kz-hkQQL6arnnM0w3_EHql2EmeJFrXrdjyYSz91bJ0jWexGn0uWKJZHlgRnPhQ44HkIXNmfDm3nglg5_pS1Z21_9IF9ggxYEYG69vx7ctKN59rPV9vYSBYt-vQt-FztO_b5bxAacjbN4QXJ3f4JdXWbBBfbBh0maspY0PpAHoAouVQEUqo2wPk66u3rVQy6GKLZmOPGSEhxBWyi8Wy7QRHU38q8Sc6UTlSCBNklyCTPpuHEsQEd1Ux663PRv7KMHnRL5ibkXO0m0MG7aDUBdP3qnzYsDl_qb4ZHT8k6bHzwdbc4iYBvwklrOc3aCzfGuMv9o81LEqj5dy4l75aGa4dLrS9vGOvvV6kps5M2LNtwFz3KouRUjJad6xegsbu48VXjAoLaLjlJHCf9cLQ9Lx_8iBB8iaBPjmRjbbaUXiPs2CjunHss2dlCGmMGiW-nD9I3NOKQ9IQls__Ai17isQx0LNwl0dbedTE2e56EzhJLhTtMrpGFcSCsGrzBqEggweIC6BPoJ_5xe4SdsBdsjH1Zv6p3tF=w820-h221-no)

## 參考資料

- [Microsoft Docs][1]

[1]: https://docs.microsoft.com/en-us/iis/configuration/system.webserver/security/requestfiltering/hiddensegments/