title: 命令提示視窗中文字亂碼設定
categories: 程式技術筆記
tags:
  - notes
  - Cmder
  - Windows
toc: false
date: 2017-06-29 10:06:08
description:
---

在命列提示視窗的中文字亂碼，是因為編碼問題，在 windows 中文系統中，命令提示視窗預設編碼是 Big5，當檔案是 UTF-8 編碼時，檔案讀取中文字會因為編碼不同而變成亂碼。<!-- more -->

例如下圖：

![utf-8 code read](https://lh3.googleusercontent.com/ExbGk4WddcLTFyJ6y0_3r7oFa0DC5yJ9l4d0767Tquu8_Njb5Nt4WMDefxFJMtHeQpneNXYfmACjuOCCJ-cG0RSpDYELUX52BxQ4LgHNSIEVOhg84gwINCB2zbpTpMWrmTHObBCyIgsqYzV3x2jJB_IUjAJvdQrZKqFIQo4u-v44SZZew5q2942g2N-lxgPzNNI3S41reswh0C4_WJDtVfH6fmqGkjzUG3EL5FT3Gl_dvN6a4_ZUnA64NV3yKIWmM1o3U2fpW4oYCwmz9ULHb8TqOTpUoR2CpMY7ajwoNZloqdSzXnhSS5iCAgPeOsARdurDY3aXjGGi67wrGEm2cCBa6oARXMkAb5Hgo6yJ3kqJi5vjnR1r_94WJwG0Ck4iyHnlBwJTMfM_B9G83BREBpaTNcOURdphTwGQiokNEcs0lMNB29ESK-irG6n1cDgesElMPYTC2VkPFKkMLME1wLRIWI3YuU7q-1rKUA-LxvrBBd3_LrMYOGClD5dQi4oOg4MIKkz-oOfrs-LWgdlRZItM2JPVfGtlJ9CSNNvJN6ME9Jg9MAhKRtT8zmYZUpstiCNU1fmeryBodlxnDd9YPZhlLT3cXBjGaYKGu4t48QAoIaF9EXuULXqhHJmv-CvDR0z876lNqiHt6L7gWuzV79D6L5pyElvHHwcbEv7nmQ=w391-h597-no)

這時候可以透過 `chcp` 指令來變更預設編碼，透過查詢 [Code Page][1] 上的 UTF-8 編碼是 **65001**，直接進行指令設定
``` bash
chcp 65001
```
不過需要注意的是，命令提示字元切換成 **UTF-8** 後，中文輸入法不能使用，不過我是使用 [cmder][5] 就沒有這個影響了，而在 [cmder][5] 中，可以將 chcp 直接設定在 Setting ，這樣就不會影響命令提示字元
設定路徑是
> Settings-->Startup-->Environmnet
然後將 `chcp 65001` 輸入

![cmder setting](https://lh3.googleusercontent.com/CNnFzx9qFMlLVxPheqUw-S8XjYDGN5Zc2aPz9gs2KBmnBJe_n-EwBkzZ4y6n123sungSy_XfKHTMOofQOuiJdgCZgXX5OzF7HsJtfV-33kc3hmo7WNiD26gVca1_1kp01MFAhFfRqII70cNxrdLJBjTSX_yUv4PD5sfKmJ25QMbZ6G3gSyXzgxnKcJYUoZrqv1PdrQU3E4R-nEGwZLwn1M5bXly0ZnOxC1ZDreY3DSfnbgSOXdAlJEgrQngM9i8jTKGYZsaE1Kq4BLPNrZpYjvIOGXYVlGdk9lSCZ-MAM3rjAl8SoMPRyuNUFOfS94P0UdQHcCdF20lUNiOpQLEnzT2hP-OLfmizsyUbb2lcA5XloJdEcjIWz6dNIYwWJnIfKahTAjFCJBSCbW7cw7rMgU2_rh8RXf2wBLIgN-0Dr3-91Nl2QBeyj-odpFJ85zl642I5zqzAlDaAksZzeSGp1wFg01kccePzOIm7arjsiUsHheNU4H5J_scHsZcKe87MIRNq2n0-zm8ozf8TPjJJOS9qfQ0JK5bqxicI_DkFzstdPqB3pUucU830tKj8aKa8u_A7l2sLavfKAUBYgi1wQzASZdX2xPfhYsZWrCNyvFq2S7MWfI6Fwj8dym2y_EZpBV8hoxF3AkN-C4qxiOWvzTnJ-T6yaBBT-ET7kNx0hg=w641-h395-no)

不過使用 UTF-8 編碼還是有個缺點，就是行文字過長時，中文字將會重疊，所以要不要使用，看情況決定囉。
![重疊文字](https://lh3.googleusercontent.com/ff152HTcEE_k5zFUAhHcYyVBT2f2_LCxBmDvz7svI61MPNZPiu-vqu0b2Nt4-DlEjoODjS0W2EuH21NW6Y58EK9IX1BKHjS41AO3cY6zo6hjX_TMqst0RDs-fpaaWs3JoodAG0TBXcwyf0sJ3LIU6z7beoic55livUsdePGS86BLGdhckoxwTbMpTnigrkld60rB7zfj9Lwq0PtA9HvZ2GwZQ1suOO4gxKsLsWYsDW8hdH3XGBKF_Cgyaluo8vlEet_SuzndfSDk0LqqMVmz1XtSQIzRZx5Ah5_ZuvvzxlHFJOx2hI7GO2o4F4UmcPFIe6Q3YoiIeZFRFhmyIEy0O1ncnIlHSuuAEQ8EKdVzg26pzjuzoC6P_lPge9e6WCPjlcu1BLCKmJkTv2gZIP_77AtzIbdpDxdWgOlhO71LCsIpdokehINVshtM9VMvgMftY8dyoS0I0uVvWXP6i4_NcBYmJ2ugZPkS7CoLmH7s8bnCH9g0ONIdzVdkhWpsitLET5CbiJFTEqHkTcNBgWxXprDPaiQa8B1Hc08burIc1ITLwg28qqjXVuZq10_sNGl-xfIEGcOKsi-VgXlupibAnaVlZ08W9XjnOsTVHs_S3FiKRiB-a41dNMPGKR7OItncHv58i1PW1e1FhmRY1Wxab0VrYVYQ_dzwTVdCX0LVJA=w208-h67-no)


## 參考資料
- [Wiki Code Page][1]
- [Microsoft chcp][2]
- [Darkthread Blog][3]
- [Stackoverflow 上的討論][4]

[1]: https://en.wikipedia.org/wiki/Code_page
[2]: https://www.microsoft.com/resources/documentation/windows/xp/all/proddocs/en-us/chcp.mspx?mfr=true
[3]: http://blog.darkthread.net/post-2011-08-11-command-prompt-codepage.aspx
[4]: https://stackoverflow.com/questions/388490/unicode-characters-in-windows-command-line-how
[5]: http://cmder.net/