title: 利用指令參數開啟 cmder 分頁
categories: 程式技術筆記
tags:
  - Cmder
toc: false
date: 2017-07-07 13:40:10
description:
---

承續[上篇][5]，開啟的 **[cmder][3]** 是新視窗，但是 **[cmder][3]** 的特色有分頁呀，所以希望直接開啟分頁，這樣視窗也比較好管理。<!-- more -->

想要開啟分頁，先了解一下 **[cmder][3]** 是透過 **[ConEmu][7]** 來組合命令列介面的，所以想要開啟分頁，主要啟動的程式，是 **[ConEmu][7]** ，再透過參數去指定其設定。

這指令的路徑請自行更換為各自的 **[cmder][3]** 路徑
``` bash
D:\cmder\vendor\conemu-maximus5\ConEmu.exe /cmd cmd /k "D:\cmder\vendor\init.bat" -new_console:%d
```

如果想要添加 Title 的話，可以照一下這個設定
``` bash
D:\cmder\vendor\conemu-maximus5\ConEmu.exe /icon "D:\cmder\Cmder.exe" /title Cmder /cmd cmd /k "D:\cmder\vendor\init.bat" -new_console:%d
```
附上 **[Visual Studio][4]** 中的設定，不過 **[Visual Studio][4]** 要先安裝擴充套件 **[OpenCommandLine][6]** 才會有這個設定喔。另外，在 **[Visual Studio][4]** 時候，指定命令列啟動後的路徑，對應到現在檔案資料夾路徑的餐數不是 `%d` 而是 `%folder%`。

![OpenCommandLine set](https://lh3.googleusercontent.com/Yssj-Wtp4TAHPWNsOmcBSjRV7UmbYy_7mVHxr2M28ErI4J06ZCGNX8FNpcelbNnRPXS7LTWUIjn5lyBJuNIjX-NitoahxreuZbKZiCZPbQQ1qdzOgBY2pPf3o52EPU_AU2mrzM0Ie33sGtjMKwLqNwRNV-5bhKMtOmkn40e7vu73M6qfLGiAqwokvVFDcdr8nq_XBNhbb1b5l5IP5zrlswDLJ5dsd-f31Z7geLjyZmeLc22v_1lJJVzrBvNIYajsC9ZeQYCWaYgDq1X0pdID9qjV-gPMZizQoKJdVXK7_YLAY8rFAAiRMAym4awQhJOoacp4jMu3EsDNZZBLaaiNCBGkDQKExhUzicu-pwHxIUJ1gkH5q7tesVSIi02sHx4WPgfnQ2IxGElrZXseqBzWxBRgPnggrAEpJUUU-wl0zkBPy-LYsJL-5dPCex3nlyMRx7b9bjIalFcAJUaqI7KxR4mUEEGwiblQ6ob9r3K3IOUEnVuF_VV4G8oBQHckJFF-G4OjCfq3zYrZh-bAlGKtLLYjsP56hEh6aaV7eC_sxqLBCo2tVm94GxpNu6SozLelCftQchfWrP9fGSQKEPzY9dZ0_JKjNawfY8K3SNUaxtlTiX0jBWj5PjLhzxpx4iF00YtNLwXC3383WdC2D9R-ZLWAYkbA6dVMirwYCOULhwG54w=w846-h585-no)

## 參考資料
附上這些工具的連結
- [Github issue 457][1]
- [cmder][3]
- [GitKraken][2]
- [Visual Studio][4]
- [OpenCommandLine][6]

[1]: https://github.com/cmderdev/cmder/issues/457
[2]: https://www.gitkraken.com/
[3]: http://cmder.net/
[4]: https://www.visualstudio.com/zh-hant/vs/
[5]: https://shunnien.github.io/2017/07/07/open-a-new-cmder/#more
[6]: https://marketplace.visualstudio.com/items?itemName=MadsKristensen.OpenCommandLine
[7]: https://conemu.github.io/