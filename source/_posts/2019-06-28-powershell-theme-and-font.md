---
title: PowerShell 美化配置
categories: 程式技術筆記
tags:
  - powershell
  - Windows
toc: false
date: 2019-06-28 16:41:09
---

## PowerShell 美化配置

**powershell** 是 windows 目前很好用的工具，可以調整一些設定與安裝一些模組功能來美化它。<!-- more -->

## Terminal 與 Shell

- Windows 的**命令提示字元 (Command Prompt)**，實際上就是打開了一個終端 (Terminal)
- 在終端裡面**輸入命令，得到結果**的互動程式，就是命令行解釋器 (Shell)

## 主題樣式

個人推薦的主題樣式是 [**oh-my-posh**][6]，此主題類似 **Mac OS X** 的 [**oh-my-zsh**][11]，不過因為 [**oh-my-posh**][6] 有部分的指令倚賴 [**post-git**][5]，所以需要兩者都安裝。注意需要使用**系統管理員權限**啟動 **powershell** 來安裝，安裝指令如下：

``` powershell
Install-Module posh-git -Scope CurrentUser
Install-Module oh-my-posh -Scope CurrentUser
Set-Theme Paradox
```

安裝好之後，不滿意 **Paradox** 樣式的話，可以自行更換，[**oh-my-posh**][6] 提供了 10 個主題樣式，只要在 **PowerShell** 中輸入 `Theme` 就可以查看有哪些主題樣式

``` powershell
❯ theme

Name         Type     Location
----         ----     --------
Agnoster     Defaults C:\Program Files\WindowsPowerShell\Modules\oh-my-posh\2.0.263\Themes\Agnoster.psm1
Avit         Defaults C:\Program Files\WindowsPowerShell\Modules\oh-my-posh\2.0.263\Themes\Avit.psm1
Darkblood    Defaults C:\Program Files\WindowsPowerShell\Modules\oh-my-posh\2.0.263\Themes\Darkblood.psm1
Fish         Defaults C:\Program Files\WindowsPowerShell\Modules\oh-my-posh\2.0.263\Themes\Fish.psm1
Honukai      Defaults C:\Program Files\WindowsPowerShell\Modules\oh-my-posh\2.0.263\Themes\Honukai.psm1
Paradox      Defaults C:\Program Files\WindowsPowerShell\Modules\oh-my-posh\2.0.263\Themes\Paradox.psm1
PowerLine    Defaults C:\Program Files\WindowsPowerShell\Modules\oh-my-posh\2.0.263\Themes\PowerLine.psm1
pure         Defaults C:\Program Files\WindowsPowerShell\Modules\oh-my-posh\2.0.263\Themes\pure.psm1
robbyrussell Defaults C:\Program Files\WindowsPowerShell\Modules\oh-my-posh\2.0.263\Themes\robbyrussell.psm1
Sorin        Defaults C:\Program Files\WindowsPowerShell\Modules\oh-my-posh\2.0.263\Themes\Sorin.psm1
tehrob       Defaults C:\Program Files\WindowsPowerShell\Modules\oh-my-posh\2.0.263\Themes\tehrob.psm1
```

想要更換主題樣式的話，設定指令如下，`Set-Theme` 指令後接上想要設定主題樣式名稱

``` powershell
Set-Theme Darkblood
```

### 設定每次啟用 Powershell 的主題

上述設定完成後，現在使用的 **PowerShell** 畫面變漂亮了，但是 **PowerShell** 每次執行都是原始介面，所以需要設定，以下是設定步驟

#### 新增或修改 **$profile** 檔案

先開啟 **powershell** 輸入以下指令

```powershell
# 如果之前沒有檔案，就建立一個新檔案
if (!(Test-Path -Path $PROFILE )) { New-Item -Type File -Path $PROFILE -Force }
# 用 vscode 開啟檔案
code $profile
```

上述指令會建立 **profile** 檔案，但是需要注意的是，使用**管理者權限執行的路徑**與現在使用者的 **profile** 路徑不同，在 **powershell** 內，**$profile** 預設就是目前使用者的路徑(等同 **$profile.CurrentUserCurrentHost** )，一共有四種選擇，但是檔案路徑組合(32位元與64位元的搭配)會有多達 **9** 種，有興趣的可以參考[此篇文章][12]

- `$profile.CurrentUserAllHosts`
- `$profile.CurrentUserCurrentHost`
- `$profile.AllUsersAllHosts`
- `$profile.AllUsersCurrentHost`

```powershell
❯ $PROFILE | Select-Object -Property *
AllUsersAllHosts       : C:\Windows\System32\WindowsPowerShell\v1.0\profile.ps1
AllUsersCurrentHost    : C:\Windows\System32\WindowsPowerShell\v1.0\Microsoft.PowerShell_profile.ps1
CurrentUserAllHosts    : C:\Users\Shunnien Yu\Documents\WindowsPowerShell\profile.ps1
CurrentUserCurrentHost : C:\Users\Shunnien Yu\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
Length                 : 81
```

想要設定為不管是否使用管理者權限執行都是相同的畫面的話，需要設定 **AllUsersAllHosts** ，設定這個檔案後，其他檔案就可以不用設定了，網路上有可以[參考的設定範本][4]，以下是我自己的設定

```powershell
chcp 65001
Set-PSReadlineOption -EditMode Emacs
function which($name) { Get-Command $name | Select-Object Definition }
function rmrf($item) { Remove-Item $item -Recurse -Force }
function mkfile($file) { "" | Out-File $file -Encoding ASCII }
function getMyDoc() { Set-Location "C:\Users\Shunnien Yu\Documents\" }
function getGitOneLineGraphLog() { git log --oneline --all --graph --decorate }
Import-Module posh-git
Import-Module oh-my-posh
Import-Module Get-ChildItemColor
Set-Alias l Get-ChildItemColor -option AllScope
Set-Alias ls Get-ChildItemColorFormatWide -option AllScope
Set-Alias ... getMyDoc -option AllScope
Set-Alias ggl getGitOneLineGraphLog -option AllScope
Set-Theme PowerLine
```

## 字型

設定為上述的檔案後，**powershell** 在有 **git** 版控的資料夾路徑時，會使用 **PowerLine** 字體，但是由於目前的字型不支援會像下圖

![no powerline font](https://lh3.googleusercontent.com/ydZPSwjcR6TwBreZBDL5_7CTTysc4jg2Djdn2SsRtJh3EtUX69N_qqfpYLYT_54GPRKB5Cq2_6K2wmVU4AVM3kMUYwB_hefoAEapzuQ1Z-mqqcFCdvo258pKBYr4z4t3nzzuHRyNFBONGqQHtZ1L7C-swmLZHIKyA_guEtxw-N5lR9rMXO8ZdO7vQLVv5_f8dWhn3bhMvUDa75H0ZurXtUiMmi1qpUKFo2z0ycwL8mdvMOwAyGe-9zSeSzf9UqyC5eyfgmIxzH2yS1GvVmLvl04QArsi8gGUt65GDQRQHuXFffwZxHWujk4uvNzOKY9M5F5RmcT6OQzNl_8nK6SaHD4yaeFkI4nLSiSuiQ3NVY9pARNlstg16-wJuDDHjZVWNZ1RLve-SwqxQrZWrcgDDeXR08gClzJeudzJbJnfhMMcr1-w6lwUiURq27I-c5_zJyjLXu1NnN7Sx-KNElSnokqHGhiQlCrWjmOaPEJootMFtiSrwzA7_naE2ZAOnoPAEMEGMppvdhBkRHn7IZhvD0YcDnXznM3ggx7YKOJ3swkfYdBiDSAQurh2mY5oLnlfGq5tU-b8CH0XbIcQqb_xiMY1b01_NYViW1QQ3rtnLiBh8nkiVdHM2LbRkDD_Ynue-UDFYP-6Xzf8Fh-WiYjkuGjKbTfNjrt-l6ZDnJzBUmU8rlR3mfiUKXLn3pYHjIsGkFaOrKJsTdi5dXWrKCwZb8FV=w959-h145-no)

所以需要裝有支援 **PowerLine** 的字型，我個人使用 [Sarasa Gothic (更纱黑体 / 更紗黑體 / 更紗ゴシック) 字型][8]，可以由[Sarasa Gothic 字型][8]的 Github Release 下載

![Sarasa Gothic github release](https://lh3.googleusercontent.com/nY-3twm_cW385iVETvxfsNqSIqUufYHdUg3A-nxKY4DA-YsIYTFq57rGuz6Vjj9cTEqePsvJULa8D2WKFQDz1FeRvgktP5uw929rvDQDR-zWLt_u5eMAF1dFNyVYLmuMTRhq7Y67Hk3S41rhROf047quXgvSNA-aFiz4tRGgaxLItIxEA5vkGDtdrU2WDUvVUv-_64RShhtyIKuE504s9kvFhbtyEaUATAfey7HUB4-uFa4bbcrwBjr-pufGW66uncSI7WiBkxNIufrLGVA0GCWKkZakNgghl4XKpXQ0qqnX6E67Ye8wNGlyI1DuCz2TvncJRiI-IY2nkXLeRnMlgRbrsJRojyx2RLldEbx1mRqYoD1q-wNKF3kwD6CpHQuY5O7zucyb5vKOZDki_xkcWgJEEC_C9UvxPxala_c2kbncF_242Uvr7S-WX9g4DqLPKAuDKIlRNjYaIJo9-3gV-4FoqKBdjk8vd-n3Qlg3Ox1O0VGbGWGNC9enkjHMmxXAaJ_zeXASH7fNNd5v2QVzFNjrC2WMbraaoOT-T8545bC5VESXqIwvJwE6a_NR_-NSEeCNZE6zkquiXDkHhniWDybSazCHxXfAntgGJkosu2VAwuMweYGYXBuX6x2afnnn7vm49VC9Es6cr8hyrQkM8Zgw-yWN-DJvKOfXbqeV8SGxa0miIb7rai4_VZoVTqq4L51mFvGoTuCj9Kd0pq25f6Vf=w795-h691-no)

之後直接在 **Powershell** 的 **Properties** 內設定字型，我個人使用 **Sarasa Term TC**

![powershell properties font set](https://lh3.googleusercontent.com/rYo4MF1iQkB0VhhWxETUJ50-zlN8dOYmFVYg0pkiX0X7XHJ2zljNl05Te0yWm79NBFfyz5bnckVeR4YJHxas-iqseUbyXs-nCJmKyjMEqCdTCliuwVMDdyBsx3REHRe-2jvPu9mJeiaj5jJZY_KbD5-Tl_ibppn4MbBUqIlMAC8tkAPra_jtDX6sG7S79rRgCzncEQmnqLwxfP3zQfFYPbKqetEK3xoI_8cz0gW94R4MxFYRqIXMjTpfN-iec3zKhTdTqbvIr_R8HVKf_fZM0_wS_kD-zD2Exv186uU9MY8PZkYXdVK3MGUzgKAxIhqSHgG4VWaKkXs_zB_OBWWm78N85qzlrwAV8dXEn7QkHDK0ZIkK_BnZAL7UHwbVP_pXRPYiXgrDOjShru30SbKaa2Y7-7fTvGnxH0pLmK7WW9ObsMGgn3vu_tDmLL9JfCWq4XuMIpVMrC9WqZebnurNmx2g7XuFKmvO28aJ1JQne0hQ6eSsImanoKg2q8ieTeJiuVFPf7Aazl0iejgVaUDX3JrM8l3nTUjrabfh1pS_LRbf8dCS-WhsF8Z0mbn-nOwZ6QaijJ2zQFKYckIivYMCwC0fXUcpQ9IQ9dG-p2_Fkj570QdiYF1Kbfc3Uhm2DpmY5cPK-GP8JFgsa1zFlho9FZgmFAtWD9_STX06w_5QCea1CqSoLg-2WEK3egjUwuNHE1tNs_Pnx7v-LpkvK76rzqNc=w456-h136-no)

設定好之後，**powershell** 的畫面中就可以顯示符號

![powershll have powerline font](https://lh3.googleusercontent.com/Rc_cU4rb9QIfRWd-Lft2plHvrnQstqjjo8rGjN9KOTw1v4ylskW1yCH90N4bqJabTPOsdz5UbUr85zjl6pOLIEjoaLK2l99gL0LI3ddE2-bXWXzFYeSUm3SN-oyEHGe-OBh6JExA7lRe2-6FEcL2NAa71lUMCslSBlJ4npOdVTDOkICvKwkVdfZvQZLWvZOQi_9s69EscbWytOvo6C_feaDPliCw_nzx1-QuOBSBrWhtuadHQsd7uhOFspvEdIoC7p0KeWQpeBRxRhhedFf2uCCEFI7XXskdUZuegaI3mtD6qBvJLv1oYb_x9J5GTGCbG8gfTNyTc8nCXGndl6qwc-2EfB57FhrCMSBE5cGNrEm9NaYq6tZsRyT1a5Ah_0ax1sEY3nwi9qaH8gF53Brwc-V3iwvLWezFxtjZ4pnZ5_-4F5SUxGNk6qLWMoRoqIl5g649rbi2tjRFLIADLTiDvGkuNoN3WVkNfyyqyFHfNwLRQWc6TIOatf4C2BENJ5uKyOQPG5H1N-olcRG6nqvwnnkMNl_wt7rMkosd5-SBtRnbCzmvv9C2kCh8pBS9e_86XdHcC2wAPTPzk6Xp7uWkbUzsAq7EyT42-tXYDh48o8FXSnxcAJtHWAxcC79OdXMM9qEtZWQH9wPkDwTeFJICCy0Zrn9CpuWzfMVbvDrycojUJ2lgN0NJxR6jexLe4kxNWSw5TDIKpQ781ihLJYFfboS7=w800-h143-no)

## PowerShell 配色

都設定好之後，如果對於 **powershell** 的配色不滿意的話，可以安裝 [**ColorTool**][9] 這個微軟提供的工具，安裝方式直接下載 **Release**，解壓縮後的資料夾路徑加入倒環境變數中，直接就可以執行指令 `colortool`
想添加新的樣式的話，可以上 [iTerm2-Color-Schemes][14] 尋找符合各自需求的樣式，加入至 **schemes** 資料夾內即可；假如是透過 **chocolatey** 安裝的話，添加樣式的路徑在 `C:\ProgramData\chocolatey\lib\colortool\content\schemes`

## 參考資料

- [告别 Windows 终端的难看难用，从改造 PowerShell 的外观开始][1]
- [5 个 PowerShell 主题，让你的 Windows 终端更好看][2]
- [超酷的 PowerShell 美化指南][3]
- [配置命令行界面的初始化配置][4]
- [Github posh-git][5]
- [Github oh-my-posh][6]
- [PowerShell 美化指南][7]
- [Github Sarasa Gothic (更纱黑体 / 更紗黑體 / 更紗ゴシック) 字型][8]
- [Github Microsoft ColorTool download][9]
- [Github Microsoft ColorTool][13]
- [PowerShell profiles][12]

[1]: https://sspai.com/post/52868
[2]: https://sspai.com/post/52907
[3]: https://zhuanlan.zhihu.com/p/51901035
[4]: https://github.com/microexs/PowerAdmin/blob/master/PCInit.md
[5]: https://github.com/dahlbyk/posh-git
[6]: https://github.com/JanDeDobbeleer/oh-my-posh
[7]: https://coolcode.org/2018/03/16/how-to-make-your-powershell-beautiful/
[8]: https://github.com/be5invis/Sarasa-Gothic
[9]: https://github.com/microsoft/terminal/releases
[10]: https://segmentfault.com/a/1190000015928399
[11]: https://github.com/robbyrussell/oh-my-zsh
[12]: https://blog.simonw.se/using-powershell-profiles/
[13]: https://github.com/Microsoft/Terminal/tree/master/src/tools/ColorTool
[14]: https://github.com/mbadolato/iTerm2-Color-Schemes
