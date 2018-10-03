title: 透過指令列開啟新的 cmder 視窗
categories: 程式技術筆記
tags:
  - Cmder
  - batch
toc: false
date: 2017-07-07 11:21:49
description:
---

cmder 這指令列工具相當便利，而且採用分頁來開啟；
當 [cmder][3] 已經開啟後，在 [GitKraken][2] 或 [Visual Studio][4] 等工具中呼叫 [cmder][3] 執行，會沒有任何動作，只有 [cmder][3] 關閉，直接在 [GitKraken][2] 工具中呼叫才會開啟<!-- more -->，因為這方式太不便利了，所以在 [cmder][3] 的 [Github issue][1] 查詢到解決方式。

這方式是建立一個 **bat** 檔案來執行 [cmder][3]，這會新啟動一個 [cmder][3] 視窗，bat file 如下撰寫

``` bat
@echo off
rem CMDER_ROOT 表示你的 cmder 的路徑
set CMDER_ROOT=D:\cmder

rem 最後的 %CMDER_ROOT%\vendor\init.bat cd %CD% && %~1
rem 可以改成 %CMDER_ROOT%\vendor\init.bat %~1
start %CMDER_ROOT%\vendor\conemu-maximus5\ConEmu.exe /icon "%CMDER_ROOT%\cmder.exe" /title Cmder /loadcfgfile "%CMDER_ROOT%\config\ConEmu.xml" /cmd cmd /k "%CMDER_ROOT%\vendor\init.bat cd %CD% && %~1"
```
然後附上 [GitKraken][2] 的 Terminal 的設定，**%d** 參數是 [GitKraken][2] 中現在 respository 的路徑

``` bash
D:\cmder\cmder.bat "cd %d"
```
![GitKraken](https://lh3.googleusercontent.com/aMaTTU_qYUbjRYnFeAiZmVAVpjrTiKRHdJqJJuR90MNuEO0nneaDQ4Ee--ZUTQ3DrCHEmNxGvkjdQWIHEXKtRfKQ84TOkycpb8gzStXH1MldN9pON9HkRFDDJ7vhRo2IwtopjkXs-OFHJHmSKYHAl1mGKe5YkJTSbspXw5bKP3W_a6oIVWvdQdwKPG2DotEFt9os-Ck94uMJwjQjwan10qp755xdLV3H7Rxjj5a0G8CsxPUUSodLwJ8Q618IROge7B5ro5Dgey5fC9DbQTxmWp-PlQQv4K89-rcM-WoQaipePvaAyF2RyTWdHEjLu195hPkGfodJxWgxpXPcBBne6wYpN7EzIjV5Y2CMkhjaHCfXjVLriNNe7kHfKUD0RzO6Dp5qQARS8sfVgUUNu0RnPlCXNV-35MyTzbKlrirKSB40Y2_0Tti65qalY7jB_wFnmgUheXM3H-ber7Q04q5O1Gl3nI6dXW9UHRYU1-FjzlCm19vZI-4yUat9faqU_r4303MbaQ2vv7CrE8nJjB5QPwVuuFQ-WYiqeL-TcmAzAKn6gRMtyZX-OHTtfYA3GSfDzl6BY2lHr8WhHrY0v6WTku5CwNp1DYaQooZvPKDky6wK9R_dlKrltVkVy3wc7uk3VGjOiNGWKPACWHhyJO7RhMe2EGB8X0G9WQYxrf9jjSaQ6Q=w666-h413-no)

## 參考資料
- [Github issue 457][1]

[1]: https://github.com/cmderdev/cmder/issues/457
[2]: https://www.gitkraken.com/
[3]: http://cmder.net/
[4]: https://www.visualstudio.com/zh-hant/vs/