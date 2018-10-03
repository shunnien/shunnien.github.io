title: github pages 上的網站開啟 HTTPS
categories: 程式技術筆記
tags:
  - blog
  - github
toc: false
date: 2017-07-10 09:30:53
description:
---

現在的網站愈來愈重視資訊安全，所以網站的連接建議使用 [HTTPS][2] 比較好；而架設在 [GitHub][1] 上的 Blog 預設沒有開啟 [HTTPS][2]，但是 GitHub 是有提供 [HTTPS][2] 的。<!-- more -->以前 [GitHub][1] 沒有提供這選項的時候，我是透過 JavaScript 自己去轉換，因為網站是在 [GitHub][1] 上，[GitHub][1] 本身就有 [HTTPS][2] 的提供。

而現在更方便了，不需要這樣轉和，可以直接在 **Repository** 的 **Settings** 進行設定就好，其設定路徑如下：

``` bash
您的Repository > Settings > GitHub Pages > Enforce HTTPS
```
![Setting](https://lh3.googleusercontent.com/NpoCMu-K-pa4WJlQ-EWAxR8za2tyBZcdqxYIzzOHmuQG1WR2QtuSO7Pz-IadBA7IMpggjqloKpqFPESgck76JxsCXKw7Xx-cPOckd1fFt3hFgd24sFNjaQqTVBMgpLaTMmb6e7U5T1juGQ4kEKjpKuq89foQOJ438RywhvXgP7f4mDo081vvtWYHG56KDC-x8XpGOwU6f5jztt4DttLGpvnSdxLLPadpEJk1ryW0b7ZijVupEaRyukApKtw_-NBx6ssZ73QlM8lXdRV_hHO-RPiSySw78E0zR1v0iKsWHc3XYgpR8aDOFpPucfd2phYi0lKmN16ns3SPKf3yTE0KGKL0F9VooS7HN4FB4a5hNiZpWqXD0lmmLJWSjP99ZMOyj6Mx4aMeoliAF3mJfKggh_GU42K4A1KDde38TT_gcD4dKQgUm8TKpoBYKXk_tldEM3pZPXFhMCio0rApJ9rYPDbH33IouoD9Wrph56kKbdrDBfLIPPFar7ykWts3sbG4EmRLezWvjIXKwABmkccxE4R710zQXxvxamToqoMOaVVlX29guPAWJ-OU_Zsk4O9LPtEX719QGUgs9BfiV8FlUGWyNOrjIu2o0-1R2H0Ziwd2XAyLbXoHqd8iNbltxsiOFinU6X7YpTqRFv_24ibP0ui-AB9fwX61VpnBdsGv3sL1YA=w884-h380-no)

![Enforce HTTPS](https://lh3.googleusercontent.com/TL_P4TVOQSMjgJI9VdW5k7Gc9cu1wH3lAmY9Q5ZcGcjdkD-7nYHemL7gnolpTQ-vVg1chfRXGWgoD00mw3Z1eMPOMsyub7Zic-m0fiQpa4kQ1jjc-cbOjL70jw0zpFum6xko6NfjWCVB1XjBGIBLJjf3oz8v3lkL4ge0zB0fDGSE5LlXbHE5vm8lsXj01KsRIka9TYrYxPtMvcXBd2jwSguaOT3ueg3lEP34zoxkE36U7dw7HR8I4YgN8dVWT65apsUjjeni4MvG7QN5ei9ABqlrWdVlMPU27DpYY_ZdJGEJ2-W76I7Jv-IcQsAYAUcA-tbcgLjITZ5fJx9XXRGBM2gB7NdvJTKC3B1y-AaeTLRm7mhpA2t0OBRUQ_LLTVBLszKLzvg48uCluA81LETRpPFpe1m4QdPs0qew_XZXn7vNfeibsvNkdU5V5MzsnnkqBj4pBlfsLY_vuPCTlo2WzW765r-61LDDXdSsCTJHDJyuKD-x9sIdNoHfwXaKL37s0R8jVcX-QOCDvsFXqXTblfWb98CJ8R38klto5tJEzkCaMSOC0jmeYVwVdWHRhS58y8OVAY5FiXCYUMfMK9gQ-aL_IsF5G_7a7VSSzr6ezhJQe22lldaZXPBDdO_CGJbBKWh6uTDeR2JVLSeXimRNSurqOK0mAdYERqBOtTJnxbQqOg=w515-h802-no)


[1]: https://github.com/
[2]: https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%AE%89%E5%85%A8%E5%8D%8F%E8%AE%AE