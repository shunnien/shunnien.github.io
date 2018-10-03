title: RAM Disk 的個人設定
description: RAM Disk 的瀏覽器設定以及 Visual Studio 的設定
toc: false
date: 2017-05-25 09:39:41
categories: [程式技術筆記]
tags: [other, RAMDisk, Windows]
---
[1]: https://shunnien.github.io
## Introduction
有多餘的記憶體可以使用的話，就拿來做 RAM Disk 來加速。
此篇紀錄一下 RAM Disk 的瀏覽器快取設定，以及編輯器的快取設定路徑。

## Conetent
我所使用的 RAM Disk 軟體是 [SoftPerfect RAM Disk][2]，OS則是 Windows 10 1703；RAM Disk 重新開機裡面的資料就會清除，除非設定為映像檔案，但是設定映像檔案變成開機後還要去讀取該檔案，所以我僅把快取路徑設定在 **RAM Disk**，這樣每次重新開機就等於清除快取了，以下附上一張設定截圖。
![RAMDisk Set](https://lh3.googleusercontent.com/JVSrqUywxxai46zpDRYy5aYxfI5cKj9bumcAt50uMsG1sZAF1AzIkmtzMG5Lo9VCn2-GAF6uv23PmyNK9zRWniVAqqVcuAFcCeq6-fnGhmnv4W_bOJ-_fLElRgfJm_XA66tzQmMdbh6JnoOUBzy8Yfefk9qhPttMcvvyz9BTUGhIulx_Vci4QK50UAwczrPIKCjB57GOENbiYZH9y7ZoaEG_Q6qaFTTxheuzZ09UkVrsfRJHdOY_1ddfedAd1fj7takRzTCmu__IS4YiFuHbYkpo_MUVVlFiF0WVpdXZra2FC5jRiVr-sKiu9GA5lrqgPsS9Vl2pbZ4pyev6YnBcpQXg0F_5d3cuC7b-NjRf3cKglYJmL8cbsc3wbTqePMRdYecgvFrwdtwgvOmaCkYLMsdjISJW_L6wrVHU-TTMTjrg5ZdD9vk_sVMllST3z_iLF2AQRKBs7OjsNyC-YWHwnuJR7XhNGNjOr3Ze0rqVEWIWEPIF30iOzdVpul3ey17OOGNrhTeepd7iyz1eThwGVNBhcGg6ssRpmP7GB40tgq1uaQo6br4IfkmGici03NHmjuldrs7hybutMk74Oyoo55hWeBry60d1s0wqk8soxfb9tDU0yNeyhem2-MIJRWVxEfLZQzn17QaSsUDcBdeYV8T3qkQ1w5hGnPMZvPKGyg=w646-h580-no)
以下分別在 Chrome、FireFox、IE 以及 Visual Studio 的快取設定說明。

### Chrome
設定前記得先把瀏覽器關閉，然後要先知道目前使用者的 Chrome 快取路徑，路徑如下：
`C:\Users\請自行變更個人電腦的帳戶名稱\AppData\Local\Google\Chrome\User Data\Default\Cache`
紀錄路徑後，因為命令列工具的需求，需要把 **...Chrome\User Data\Default\Cache** 這資料夾刪除，這樣才可以進行對應。
然後把 RAM Disk 的對應路徑使用下列指令進行連結。
``` bash
mklink /d "C:\Users\XXX\AppData\Local\Google\Chrome\User Data\Default\Cache" "R:\ChromeCache"
```
概念就是虛擬路徑的對應，對應成功的話，Chrome 資料夾內的 Cache 資料夾圖示會變成捷徑圖示；假如設定錯誤想要取消對應，只要把 *Cache* 資料夾刪除即可
![Cache Path](https://lh3.googleusercontent.com/x3rYEi4wIlyA4jiw7Gu2nsVZDaBE4-nPfNtQ3J_vhJQkJx-jVuAvl_UfLiiSo4bBy_9SbMR6Iev0_smVy4VgdDVyNVqEapODD5elPaaAU3dvAbIz92OJxBs67vRFw8mHq1_8s5HqnAuxXj0fEMAN5WDYx37_8BZBaRyHLlYswrx-WZey_bsCsybrV7EGIwOdMrQtKcoN-6TMdSdHHajPNUJjy1PJbAi40brO8kE0OfMx38TvewcrPBcMypssVly5yYqtGxe2ODEb9dN3gudeN3T3QvXvdiAgg-uu13MNDCxh78k0jdyYsBIyO90pu6sxx4V_SUfwzm8J7Oi0UPZG-trAAJwzEX4TC2_0QwyAX4wep9YoDgJNrmPhKMfvJZES1BLREtJc3MSFcYVLzg-5W3gm6gKdyBS8jh_L8GCAjGrso3L6B5t15oe85kkkj9cpQagCG_LuBttAxT-eCrYZ-TPd4lFpGjdUWbfug1ILv7Fa8cC7_keZ-x7nz4nkNLy_PfL45r_muLgqMfpiE5ghmCnRLk4ms8XMYvFnLe75yiGBk2tLhQpLBOJohfogkf6y9opw0evi4crRqBgdnM0VZH3dX7JK5-0c1GqyT-DIu02SUAegbk9_poAs-ydb5qS9yno2PYqhyn_j9-JOFKrFCplTcrhiR5hV4ofcvZ2hgQ=w624-h181-no)

### FireFox
FireFox 設定的方式需要開啟瀏覽器，在網址列上輸入
`about:config`
然後會出現警告，就不要理他，繼續設定。
然後在任意空白處按滑鼠右鍵，點選〔**新增**〕→〔**字串**〕→輸入 **browser.cache.disk.parent_directory**
在〔**值**〕的設定，就設定 RAM Disk 上的路徑
![FF config](https://lh3.googleusercontent.com/ZUiuUcI_KKMZzUL54S01fARJOkLqtqBbfflYqQ1aj8hgkpdhKy-tyZJbqY83PCjOPZmrFxAgzVVWX2ve7Y4QGljFaYyfiOz5aWqYKE5o5JTIyuQF1XSeg9rRPwQ1UvbvqhLRAhZtDyww1xRmItxuoqS_fP7J9KmtoAUE154Bu1ONzX0H1qYip0L3b1yGTMI-_KifKPHDapMaZV0Oxlk2ozBIYtq0BgzhAgVyMGLVD4v7TC6n_OP2FgiHELnCUA0KUilN8Wf2UguNlseJplmrIK6qPtyhsaELfpnfbqtLnKAqQQtRMr9URAy43qVA-4RUURIrfwSjiGhlj91KgojpJKriHCiEKzi_WOQetQP4JaFFfXPFsiPnuiYciHqZxOQdyyMXruwgJuZoAJINqF67u7n529XyIa42BT1h5pivRE_CKIjn39yMvCOGHb_3Yq57e9_PXsX-g-2k88a5ixTzDh48fSUwRuA-m1tbcuBgC-1x_smBvL6g6TUHgmxN3q_bRxuWM11u42vNp6kxScc2wV3WNbL2-bivj6YWF-i4GkeVejezmCCzR0xbJDMBlEGuey19XReVRgGRMKY-Wtqq3rb5b0S976vvElGCV9LnPsZ-sBBxvDRzjfWrpyI1Y7oHUfUI1sV9DpmaOb4vfgMFQ3l60kkIIJIYgl871kdubw=w921-h296-no)

### **I**nternet **E**xplore
IE 的話，一樣需要先開啟瀏覽器，然後開啟〔**網際網路選項**〕
![IE setting](https://lh3.googleusercontent.com/cPOHmvGjXVOukh0c1uDhaDmKXTWTU6dXvdDJDARGQVCd9rL37H_dSzx6Ymc_fKdJXOQwIt9d5d_5cY-fe06vvwD5BvvtetnQ9qNz5CR9siZOhnfesKOC9qPlzygGNK3yHzgpB5x3h1eL5kMAWr_QkdiZGAE5T-5p6WXiVGOr7SZwkYhONcMMSWcXXttQrJY9Z9G2GhtQt5vUUu7yy56cxJ9y3eOSpjfPTj-cvxERwS1WMO6QATfEGTfrHFERD8uGy2GlomrxaBpJz1E1jFaYldNANAUeC9fYb8m-8sPFKwcOVQuZ__4H3hNceu3nXo_I1ClyKxMbFpr74yBLCfjh_w2MtUT_HkN7dcBMEwVO9bovQwBKMJMfv2NZlMleGGjWcczqORzaXphDFxcBn8R5xin6MG6ES-4eCpqxDIlaLrn_5NFKhU62Dwe8bBM_mzDTnksbuOEfGCQsuCSdyof7OjAgE8M8cpDkKNHR-zUN01o5xcA_gLYnXCDM6qzmPu-gDCpVmW8J-7PWkRHrMfC-dzdhLjZWO0zDtyy2uXZ979d8xkSmqfEoP59iTLqBavrXsJoreXbZqv34CsLHWf5j_mzPYnkEGxWgKAYCqXHsjpcS3LcPdrgMf8Ql_cpA-kZ-mEfXx3g0VFfysIxyQeHVHq3zVIFoOaFOpfk4GC6_cA=w915-h283-no)

### Visual Studio
修改 Visual Studio 編譯暫存區至 RAM Disk
在下列目錄(32位元系統不會有 Framework64 目錄)找到 **machine.config**：
``` bash
C:\Windows\Microsoft.NET\Framework\v2.0.50727\CONFIG\machine.config
C:\Windows\Microsoft.NET\Framework\v4.0.30319\Config\machine.config
C:\Windows\Microsoft.NET\Framework64\v2.0.50727\CONFIG\machine.config
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\Config\machine.config
```
修改很簡單，找到 `<system.web>` 並加上 
``` xml
<compilation tempDirectory="R:\Temporary ASP.NET Files\"/>
```
R: 是你 RAM Disk 的代號。

### System Environment Path
將使用者變數及系統變數中的 TEMP, TMP改至 RAM Disk 的資料夾路徑。
(若電腦有多人使用，更改系統變數可能會使其他人無法使用，這點我沒試過，不過有些人發生，假如不是個人使用，還是不要設定)
預設的使用者變數路徑：%USERPROFILE%\AppData\Local\Temp
預設的系統變數路徑：%SystemRoot%\TEMP 更改後的路徑：R:\EnVarUsrTemp
![Temp Path](https://lh3.googleusercontent.com/wYp9YyfwybNiwT_ZugbAuwi20GBsGAX8f1MLeGVkNH6zUSWRWbD-p7pOG_0hcKkIlkYNz0cjX31oSHsw2a9nRs1ZGO5vQZl30XNNgrnGF46Kn4-5flZWNpgJ9In2GrtDgT-9P48ZWpSzsWXeWb9cJthM1_5H8ZiU8X0zUSZt2aanQ4qzpCSNeXFj4Dli2iBko67NXZUwjH9qUSIZjkfwLgwFL5LcWPFIpeoxnF7XiVj6DLUWqcdhqow-PlS2yIUa8TMxAGRza5UHH1WiTkVE4ScqXP8cky5LmyFP6GndE8UxbSko3KAzdxOy8JS-78X6gexjLTUzn9s0NMcUS5S9QEghlHubx4ogZRcsIqDyKkdwaEDM8n72mufNQavZU_1Ew8P3EWWaUKtyJY4KFnhp21fMFqNMnZ93EEn54lA30CiAmbh3eqsHXlKBhnGGZafCHnpzioOk75N_-OpjkivrNGrdnt5WWRwZahCyY6M8IQvzAAIVgcWiUOG4XwtFt6BfQQPdQn0DTerBC5RRA0w4UZZvruuxLRmAssiiKyRFStJDa_YjGOBE-fJ5st9hcR5XfP_5WVEeqBvDdt01rSG37xOq99Gn7vPF9EdmVHjFRmKAG2Xhw8HwRdPJ7be_LP0_Vnvk0h0RGESscvHBd5qtqwm9gNo_ZpDpCVojvdWUIA=w546-h294-no)

## Reference
- [KKBruce的2016年軟體(開發)工具大補帖][1]

[1]: http://blog.kkbruce.net/2016/10/KKBruce2016UltimateDeveloperAndPowerUsersToolListForWindows.html#.WSYyamiGNPY
[2]: https://www.softperfect.com/