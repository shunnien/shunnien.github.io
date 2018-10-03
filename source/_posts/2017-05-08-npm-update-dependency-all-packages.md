title: 更新 npm 全部套件的方式
categories:
  - [程式技術筆記]
tags:
  - npm
description: npm 更新全部的套件
toc: false
date: 2017-05-08 09:10:18
---

## Introduction
這是昨天在整理資料的時候想到，我部落格的 **Repo** 裡面的 `package.json`，想要全部更新裡面使用到的 packages，以及安裝在全域(global)的 **packages**
## Conetent
更新全域套件的方式，使用 `npm-check-updates`
``` bash
npm i -g npm-check-updates
```
更新 **Repo** 裡面套件的方式，這語法有 **alias** 即是簡短指令，只要下 `ncu`，就可以不用下這麼長的指令。
``` bash
npm-check-updates -u
```

## Reference
以下是 [**npm**](npm info express version) 的參考資料
- [npm check updates][1]
- [updating local packages][2]
- [updating global packages][3]
[1]: https://www.npmjs.com/package/npm-check-updates
[2]: https://docs.npmjs.com/getting-started/updating-local-packages
[3]: https://docs.npmjs.com/getting-started/updating-global-packages