---
title: PowerShell 美化配置
categories: 程式技術筆記
tags: [powershell, Windows]
toc: false
---
## PowerShell 美化配置

**powershell** 是 windows 目前很好用的工具，可以調整一些設定與安裝一些模組功能來美化它。

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

設定完成後，現在使用的 **PowerShell** 畫面變漂亮了，但是 **PowerShell** 是每次執行都是原始介面，所以應該把上述的設定儲存起來。

### 設定每次啟用 Powershell 的主題

需要注意設定的 `$profile` 路徑，設定為通用的話，不管是否使用管理者權限執行都是相同的畫面

路徑 `C:\Windows\System32\WindowsPowerShell\v1.0`

`$profile.AllUsersAllHosts`

`$profile.CurrentUserAllHosts`

可以[參考的設定範本][4]

## 字型

## PowerShell 配色


## 參考資料

- [告别 Windows 终端的难看难用，从改造 PowerShell 的外观开始][1]
- [5 个 PowerShell 主题，让你的 Windows 终端更好看][2]
- [超酷的 PowerShell 美化指南][3]
- [配置命令行界面的初始化配置][4]
- [Github posh-git][5]
- [Github oh-my-posh][6]
- [PowerShell 美化指南][7]
- [Github Sarasa Gothic (更纱黑体 / 更紗黑體 / 更紗ゴシック) 字型][8]
- [Github Microsoft ColorTool][9]

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
