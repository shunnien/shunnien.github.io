title: GCA 政府憑證管理中心憑證串鍊說明
categories: 程式技術筆記
tags:
  - WindowsServer2012
  - IIS
  - notes
toc: false
date: 2017-08-11 16:25:44
description:
---

前陣子 8/3 幫同事弄憑證設定的時候，發現 **GCA** 發出解決 **Firefox** 與 **Android 7.0 ** 以上的問題，其公告訊息如下：
{% blockquote 資料來源 http://gca.nat.gov.tw/web2/database01-103.html GCA %}

- 106年07月31日

本憑證管理中心經由GRCA重新簽發2張自發憑證(GRCA1_to_GRCA1_5.cer及GRCA1_5_to_GRCA2.cer)，已可解決Firefox與Android 7.0以上遇到GCA SSL憑證不信任的問題，請參考GCA網站公告之新版憑證安裝手冊。若已經安裝過GCA SSL憑證串鍊的網站伺服器，請參考「SSL憑證重新設定5層串鍊說明」手冊調整憑證串鍊設定。
{% endblockquote %}
<!-- more -->

看到 **GCA** 都給出解決方式了，當然直接照著處理。 而且 **GCA** 很貼心，幾乎各種 **Web Server** 都有設定教學說明(是 step by step 說明喔)；雖然 **GCA** 都有說明文件，不過此篇文章以 **Windows IIS 8.0** 為主。

## 檢查根憑證

首先，開啟**執行**( Run ) ，然後輸入 **mmc** 。
![run mmc](https://lh3.googleusercontent.com/Zvrup1_vnO3faiPcJEcoR-IGWNyLlwS3B2YjSy9FeTArnbri7ztyY0V41F_xHzz6Mshr9lFg5kWa94LWc9IE-pvlpYaB2ybI32xjyNb32nDWrmPBqofrb_4z0utGKTiWafpvBMCEXWdTd925jYlPK2U1Ds5Vtt7UG45KdeVSxivuNCmItvfSm7WPThqke06JrcF9VO20BLO8P4cQG1I0A1FUHXtgC8WMVEMzo6FLuHyEwg8VGib0b2q8APrVZ6HsV6yTZEu1alpPXRtta_445L-2l3i0dQHE_xW1ZIeGixzkLMkOgJxSq49O23og33gtqYLu04QRs2dVZivIxDrXnfzJHf7vQzD0Q6PibTuag5aokiCYA93Zf9krp0EDLP1H3Q_HK3HlmNVvkIQF_eiN_GcirZU-471KapXe7xpKf8legAlfymPd76utCrLur6dhVrbcEerMLIem5Rbk1Z3zAJRV-7F0LI_Z_Y7dji8oEXvGfoYtfwAmJhNWeS28Uo4l1umujMZTzoDDE-HtIQ9KA10ktn3atOAUWxRN_664UU97iHqcNMpld5BrooSi8E6XBsEao315LDFpx7auZJJeNwF-UXOf-Dsp4EbCwrVM5Fm1DVlVWdt_0u2p5fwD7v1ixSS2QI2CEsWDAquOeMMB_GFR12ZpfkwaeNsvNNf3evvS-w=w456-h272-no)

接著設定主控台，增加憑證管理單元
![Add CA Manager](https://lh3.googleusercontent.com/azP6yYS98dW4wY3vp-_F9hx7BB8blGh1Wme1wQG28mQqRR4F1NqcKKLPdwhKRLzrWH39MM1q2MwDExG0XoU4Ygo9ModpR8FQ66PG3l6C2oWPHaIttrQJ6OCUXQy9EuF2pdMnlP2-u2BMtFQXytRdpFnkG7KASRyif25I7q51XOua30pVIkzRObo1By_E5-8T6eAX6MMLLcFaidEZ3PPZIVIGO1YGd1GATCfYgTuMN6k6Gq6LwyJLGq07STcZXKVKIStlgM-Io2W98lQvA7RGhXh5VWO3ZO5eYDwFuwcCuJDRaNXfCb9OavEDbZfjZ53ioKqinat0yuu756jopatyI6JGgRydFy6PIBtIODumlwKrcXo0S_rbWxDGUbeWquwrkEJrHELAW6JQNyLqN0autF48DEBKfEhIH4dFQu0EnrDobJyCCYnx8bHOHI94rOcdbTK49ky2dCnN5Ix_cBBvkHhqVPKRyIo-7BWBwRNj3dGRGUyqE-c1B5RKz7RuuevhEaaaDAycsCzjIXGXMsqGGkr0KZM2nbLC1Frz93rw-acB2iizqDYXXgbraQ33x-U-pvTCW-1WkQo7SMJFPfdnDpT5u-zB_eT6UkqBDWN6zIAgDx9aSm4-gS_rKjJ40_Ja9n2rh1LrZz2Rr4d4MCB8XhUlxRvyFKKAeS63J2t_fXfBlQ=w1104-h607-no)

現在進入憑證管理後，先到**受信任的根憑證授權單位**檢查，看是否有 **GRCA2 的憑證(到期日為 2037/12/31)** ，若是有這張憑證存在，請**刪除**它
![Trusted Root CA](https://lh3.googleusercontent.com/rxMgWIyMLIlOEzGWIXStULvjAnQRviQfC-E9cVLcc9raaqh8swP1UVzddbmGo5Q_i7s1HLBLFPel3wH6Q342FYxhRgXBI3zkdYPxXXxd3WnUhWJrl98w7Ms0MkF-McrVc7EUfkCNtvO-lPntnPFvRfgshhPXNB-xfNaGyDkYsj6x484QLG0Qt2xQFDwPyb7Q7pMi0mreMIx4VTnwvzmVszboYitzRR--cDqY5xBGAd34pBDP5MRWO0pFTf3LqvbQoGOvvryDCpvK8iapnsIi3B5kkDNaBers5YlC7IYl-5nRrXh4j7DfukDz-X4iOR_vfAvmbdKrP9flY35KErggKAKjbmOnvfTLsqTGStpdI28DSSD9H00ELct1i_1xIi2E0Gu-8-ktg_Rf79BO_B8HPCpGVaUtEq2ZnLQj_j_3kfI1J2S5Ax-a6anrDcGZFcEga0OB4KWZ2KCEUuin0l7DcxsobHrwU7-NQ0W3QhbcQC9srd6t9cNmBh_jyjEOWkIx7KSfJYPsTyqr2QoqabLaP7l5Ot5OI9hqjF1ClBgstcJQtWhE2TAm5Hx50TIS9G0UsG_2CyAlnIJFJOhNV0OjL3Ul6EkgZ0fUbsct0Bj4OfbwLznc2MFbQVHwJP693W9_uOvg_E1v-GjhNcOzKbyl1A7jNkJrTkW4b71m1PjlJMjSgg=w369-h311-no)
![Trusted Root CA Gov](https://lh3.googleusercontent.com/ZSeNkVFYnGpyIbbDx_XdORWHaN9y8lS2CYKuBMMs-au0Dj6jE50M_XAk02R1-F7XoSZpmOiHirco1wQ2qK-uqcjrFm2d-RtdoC7-D1i2WwABvmRxQVtX6-JcYHsho-SOcUN1aelRviMMUac-VZJNB7kAZBzRCD4g0o9SU1iNLI9QF8xEgkUUaCJTkXG_MlGT_MyWKSyRlgUX7Ci1Arpg9USkd-qM7VWLZKIPc8Dw89n1PK0TtybaZFOoQpGd7ojJyWkIhp9IoWoP4RW3uhn5bKZjirjJHcvucmGtXH99YJpCS0tFnHZ5txp6kWeA7E_-dEuICUdfDlZyVuICgEQ_yaxqmdpCxGvpilAMyh5L1TE0RyMKR_oZCE-yowBpZS4a3ibgVwlmbzcnZ2nWB6q9KkeOGBf4Z0sxkMXCQEpXoQVC-ZBJbNB6mTkquu_XByrkYim_BEucCut9BVGHIoSTWrWS44AciVjxY74BR_jnjXjUfPBlMNKJrSlqdMPcEWFOp5O2xw78nS_6rE2pvbp2HulUTiL758ietZs86QfG4K8TTNBuR75wPDUe6CHLSUMrajdU80YtCJSUpBdn9eFgV_i3vDWVVYDpO90MLB3HHFOF-GenAjpfAlqE0ipJZIfytyk4vsK0ATtFwchn2HTwOIX_wb9cBQ_xPsaWjXFDEQC_qg=w810-h389-no)

## 安裝中繼憑證

### 下載 GCA 自發憑證
**GCA** 的解決方案，需要下載三張自發憑證，然後匯入中繼憑證
- [GRCA 自發憑證(GRCA1 簽 GRCA1.5)][6]
- [GRCA 自發憑證(GRCA1.5 簽 GRCA2)][7]
- [GCA2 憑證][8]

### 匯入自發憑證
一樣呼叫出主控台，選擇**中繼憑證**進行匯入，將三張自發憑證匯入；自發憑證匯入後，請**重新開機**，不重開機的話，是不會作業的。
![Intermediate CA](https://lh3.googleusercontent.com/Cx8DcNdkN00Gkmau_P8H64HiDPlk2wKTKhEz9vds_Sb8jisUZF1yJeHTm0a2K7oCfqJiQKeMUZSoiN8lckWMBHpNJBprH-PQF1IjEnoQaBF-xUm2ftljWhxBWxx_JQ1m6unxbxYrjEPoMnWDYUES87SWWoUfeUOZXfSY5zeLAeLdRfpD-6B_Zj8t849c_5PasJmF1_rCCcwfIMPEFaiCynX22wdJr0noU4zRDn8NZUSUridamyXrQykQjiq_7I4G8ipNAmUVHnypBy2ySExKN6n-LTEdpBw8_SKcFIItMgQPX-UmQWvy0p1CQWuI2lS8A-9gOOmzq8qLAxpZ_IaE4TQ89TPhd7GwYwBRi0mjWX1po7m7Jn1jglWOH0GcdJuG3iCjiu8-XIEQVFxkMhAC-CnFprML7txj0fWZz0i_i0cggi7wIgLvpCCjjzAAxVjOwagO_X5wuUKU2aCYnmB7S45UcRNk0cyCgeDC91iiNTYrVJpSGpgOmj4fua3X_QYaAdED4OLT1_OUQy4Gpp_oFqbIgwERqhyu_tf-zkvtixeGEwDsEjzHPNCCLQGIHD8x66Hi3WbJMyPeJM1-PhF0msQ3mmn3TWpLbVml7C9yuRNBsbbKm7K0JjlPaGUSU10HhoawcVFjtxjzachbJIXkpUh5fODFq06BZSCLhtcNNV24wA=w313-h240-no)


## 檢查憑證鍊
完成上述的步驟後，憑證鍊檢查可以在 **[SSL Shopper][1]** 的 **[checker][1]** 功能進行線上檢查
![SSL Checker](https://lh3.googleusercontent.com/81EpzD5R9_mmaNKbq2VgMdi9rjKqPW6UKGf7VftQEsLATcmAt5csSxrZf_A_GudNU2FUBCo4jH97aBf49kuBH4zCG7UXUm5lpSPTluxMzEruZMNjMD3GRbNkFRV3MBeyl3wUFyyBbJBGnoSDQHqI99UePb1ubJH3aFooEJw6K3HWmUwx2b2_ZO46JBTjEtNfKbz0-S_N2JBim5SOEzlVNVKqKIFYoRR9gtepkU1btPjiAHaIdw5d0p49MEEyUrRSfZmPqRH5T4152GjL5mJEVztUredGVYhgxy-Fupdgc93DL_QoWMtTfwoJzx1RRtTpKB1GPMMoCYeCFmE4YtjPD7NhWQ4mHKMb28FIwx62gO8xY0oummuenw2IoyAuSSJ5NpuzkhYqQMinOtCiKASAV0KHMKzgpOJBzOtIFU-vOFEWKtp-6Atv4zpKV2yzv1Vv6ZSM-eyhWgntZUftHhtnamS0quPd_dd0TDdIErqbFL0VB9mTUHhzXngBGJFZmdQWPmPFNFdd093qfYF5qOKt7Encn8gnI4m0mdM9iWSTTMlob6iimP916gDICeHGNYl6RxJZJe82jbeIfnXUAIegbu_S3wZRQfyRIxJlrzEzKgdehKX-NW968izTOUWMft5oNNT0nhzSyAKinfnXJWqidra5O7cx6hQ_Em6rRsCcYAS0-w=w387-h607-no)

最後注意一下，此篇只有自發憑證串鍊的匯入與檢查，別忘記申請的憑證還是要安裝的，安裝說明可以參考[GCA 各項教學][3]

## 參考資料
- [GCA 政府憑證管理中心][2]
- [GCA 政府憑證管理中心 相關資料下載][3]
- [GCA 憑證串鍊教學][4]
- [GCA IIS8 憑證安裝教學][5]
- [GRCA 自發憑證(GRCA1 簽 GRCA1.5)][6]
- [GRCA 自發憑證(GRCA1.5 簽 GRCA2)][7]
- [GCA2 憑證][8]

[1]: https://www.sslshopper.com/ssl-checker.html
[2]: https://gca.nat.gov.tw/web2/index.html
[3]: https://gca.nat.gov.tw/web2/form02.html
[4]: https://gca.nat.gov.tw/download/GCA_SSL_Reset_5LayerChain.pdf
[5]: https://gca.nat.gov.tw/download/GCA_Windows_IIS8_CSR_and_INSTALL.pdf
[6]: http://grca.nat.gov.tw/repository/Certs/GRCA1_to_GRCA1_5.cer
[7]: http://grca.nat.gov.tw/repository/Certs/GRCA1_5_to_GRCA2.cer
[8]: http://gca.nat.gov.tw/repository/Certs/GCA2.cer