title: Github 上 Fork Repository 其來源 Repository 的紀錄同步更新
categories: 程式技術筆記
tags:
  - github
toc: false
date: 2017-07-14 15:29:56
description:
---

**[Github][1]** 上的 Fork 了一些 Repository，但是這些 Repository 還是需要從來源持續更新，**[Github][1]** 說明了怎麼處理這部分，這邊順便紀錄一下。<!-- more -->

其處理方式就是建立一個新的 **remote** 位置給原始來源，然後 **fetch** 更新資料，最後再進行 **merge**，以下使用我 Github 上 Fork 的 **Repository**

![my repo](https://lh3.googleusercontent.com/7MrKSEwC7HaGs2iaE2-G4z9HdGHIZCP7XlojzVE-gXe8mxzDhryqShk9lEdBSaLTBsfMdYToxiiCrmCEvhlerDUk8PQLhJ_h-x5EBp-IPhhkkZfwnwxduSEUCeOW-l1K0H3DAPcEb8YE-hKikb7YPZmDvaaklGE-RHUAcKQngu1PxkOPobpsppKbyOVIGPZed6rpHZeUxYyP6EVKG9uaR6LtOXBHL0UKYzyKdJh8w3dwqns8msO3LH1g_AFtn81pnm84Y6FiNY0KjFu-maChmAv2xxsspL8q1zx_OBhSfuGrfn9S1jrGK6m9016qjKRn-ZZ9yUg4ai9ZBDDVmET-a4QOoqXBzW5KbenL1UsLnMwVmneUqeZHhkTIhZ8g7IBUEFOQCMUS1JE94NXu6KCqwJ4yOs-_iDm6795m1S_qttbTJt9LebvdN6dRT0M8KArYpr170-9o_e8Yq2VT7FYzOhnffKzYZ_twr7Wr4WF3lg8-yVsXNWyGeXwD_snQq6SGfKRJAmTq9e7EIXzJiov6iPpmF8m3T9d7-rJjjW5sZJGljJ8-NH_XJ95WM6nnuGcFm0erK4oGwhbdP1Y03jN-LJaSsh780JFk7NUOMTKVQnWJRP5GuJ1y3dwBKn8Sn-xRj2ETnvaU6gx0SOB5nqLGeN4-fJt6accpQjEQ-dc3qIWy1A=w323-h293-no)
![source repo](https://lh3.googleusercontent.com/OL-bdWG9lm8XdwfNSy1up39LfhOa5-k61bMqDLQLQOnWOyG2VMJRZZkSu8PBrU2J_ZMxqT4_kT1yA_-ScoTd5p4TO5Fca_yUbpYD4_8SGsxG_20MQHJeoMoq4sJjP3cXG-YU6NJm2Jp-_PQlwWqxxF-W4AwjQCTPTHDUfr9Ir9rnR79nKd3K8WQmI8EJPzVHpNzSuu0CTq3SBFC68jLlKA5KT45mSKzOimkEZGUmhYNIJ6FZNUYLAktcrm0J23JFRNty_eTfp4Y9xwf0Ms23zhxBQUGWe7J-xPa70KbyItkcAOkZUb6nY_KUc7QjdNPoZ4kh7ngWrGefWb1OrzoauvCstyxQE6-Tpmx6TTSIr3-Kn9VEewuo35d5gMS7_mq7ruWIZjzLC2lIHVpoAvbqHJVst2_qK9zkD_A3PAHfNiv9pKNn2SLIkfYqPChNgAIi0u8O-H1Zk30232B99qYZHRJUQZZ7gVCDt9l9V3U-dU499KhLA0xsnw2ij5wZ3A3R31bhiVf3zUlKta-W4i-pw5AuLofQrtXTvPV5SI1TC_zGZQfv3kPWY3Qp8wu_RwuTWKAgA_OpUWFzCxSsgvBd6xU1uE2Y49Q1gGvJXdxGEYct_HBBoUk_ceMrs9bGl1XV6sNvN2mRy-VDveHZBOKALFnIClXKns_Ui4oV6orn99Ym4g=w355-h311-no)

假設 **Repository** 已經 clone 下來了，進入該 Repository 位置

``` bash
D:\Projects\Reference
$ git clone git@github.com:shunnien/lodash.git
Cloning into 'lodash'...
remote: Counting objects: 68089, done.
remote: Total 68089 (delta 0), reused 0 (delta 0), pack-reused 68089
Receiving objects: 100% (68089/68089), 44.11 MiB | 6.55 MiB/s, done.
Resolving deltas: 100% (46903/46903), done.
Checking out files: 100% (406/406), done.

D:\Projects\Reference
$ cd lodash\
```
這邊可以使用 `git remote -v` 來檢查遠端 **Repository** 的設定
``` bash
D:\Projects\Reference\lodash (master)
$ git remote -v
origin  git@github.com:shunnien/lodash.git (fetch)
origin  git@github.com:shunnien/lodash.git (push)
```
接著加入原始遠端 **Repository** 的設定
``` bash
D:\Projects\Reference\lodash (master)
$ git remote add upstream git@github.com:lodash/lodash.git
```

設定完成後，就是 **fetch** 資料回來了。
``` bash
D:\Projects\Reference\lodash (master)
$ git fetch upstream
remote: Counting objects: 10, done.
remote: Total 10 (delta 7), reused 8 (delta 7), pack-reused 2
Unpacking objects: 100% (10/10), done.
From github.com:lodash/lodash
 * [new branch]          3203         -> upstream/3203
 * [new branch]          amd          -> upstream/amd
 * [new branch]          es           -> upstream/es
 * [new branch]          master       -> upstream/master
 * [new branch]          npm          -> upstream/npm
 * [new branch]          npm-packages -> upstream/npm-packages
```
最後的 **merge** 一般來說都是合併到 master 上的，假如想要其他分支上紀錄，自行切換合併
``` bash
D:\Projects\Reference\lodash (master)
$ git merge upstream/master
Updating 61acdd0c2..01148a1df
Fast-forward
 .internal/stringToPath.js | 4 ++--
 dropRight.js              | 8 ++------
 invert.js                 | 5 +++++
 3 files changed, 9 insertions(+), 8 deletions(-)
```
合併完成後，別忘記 **push** 上去遠端 **Repository**

![sync complete repo](https://lh3.googleusercontent.com/cP1uiAoN88_bhkZQe1Nt1Lf74Ms-ev7KshW7pehjl6B66jIrRuNsbvoGlttlJyShBrbB0PS6XIMNYt-ILRjbXX__M5-0AS6fC3koddNrigWXy7ZMsr7TY3vK9F_lAqXa_D5clPxCvdIUEGpn3-iskroH8RdvhZrqsupb-QMBXWfBmHbVD2Jqi4ZbPugpYQAM-xK_C-XTqBzUO8y4ho2qmDejWHuT4v6tCX7TsuMTmSjbPnp0oKrOunZk1c-vqKrbT8CF697c2rajQjBZndMs59WEprqwfB3yYz7oJZMIm0HNT6n5rRvJUSppJSPK4zt8KVD_v6dwn4FUMhq9z1hcQu4WJWs3VHNAHLfyAlh0jEu0roPYsfCnagINTtOwSDgoUoVouhPp_Yv9OHiSMH7zzc5OdGKJ_W35klaCEc8wyc6EVuVa9Ji7caQNBu8Q4dboUBjXufXskMEmACgr0dTgOM6Bmq5_2Imr3IH5P1NRRsQIy-S1tkDhlux2TbsbWyQaXXAX8ToJEJN1L74yfE9ZLWRqF6FfVclfMck-MBIZe6O7-iFBZvHkCcbQ7HwUdZDMPc3ezkeiXYLOoKwfUczBC1JPXAu4MI_p_9-IiiSuVP8OcBEB5zkjmaoZvesNGDrCF7Li4_b6cuNh4OHPB58RhCv-BoclZhqu2Tqne44588CoRw=w252-h265-no)

## 參考資料
- [Github fork a repo][1]
- [Github syncing a fork][2]

[1]: https://help.github.com/articles/fork-a-repo/
[2]: https://help.github.com/articles/syncing-a-fork/
[3]: https://github.com/
