title: Blog 改用 Hexo
date: 2015-11-27 11:44:34
categories: Blog
tags: [blog, Hexo]
description: 原本使用的 Octopress 改換為 Hexo 來建立部落格
---
## 前言
其實使用了[Octopress][4]一陣子，就感覺在產生靜態檔案有點慢，也不曉得是不是在 windows 上的關係，加上之前就有在考慮是否使用[Hexo][1]了，就決定轉換使用[Heox]+Github。
## 安裝
要安裝[Hexo][1]，首先必須要安裝**Node.js**與**Git**，不太清楚的部分可以觀看[官方的文件][5]，這兩者都安裝完畢再執行以下命令
``` bash hexo https://hexo.io/
# 安裝 hexo command line interface
npm install hexo-cli -g
## hexo 初始化並建立資料夾 blog(這名稱請自由更換)
hexo init blog
# 進入 blog 資料夾，並安裝 npm 套件
cd blog
npm install
# 啟動 hexo 伺服器，在本機端檢查網站(預設為:http://localhost:4000)
hexo server
```
這樣就算安裝完成了。

## 資料轉移
我原本是使用[Octopress][4]，現在要轉到[Hexo][1]上，需要將 Octopress 安裝資料夾的`source/_posts`這內中的檔案，全部複製一份到[Hexo][1]的安裝資料夾下`source/_posts`的位置，其他方式的移轉可以參考[官方文件][6]。

## 佈署
[Hexo 的佈署][7]需要另外安裝 npm 的套件

| 佈署類型      | 套件安裝名稱            |
|:------------- |:----------------------- |
| Git           | hexo-deployer-git       |
| Heroku        | hexo-deployer-heroku    |
| Rsync         | hexo-deployer-rsync     |
| OpenShift     | hexo-deployer-openshift |
| FTPSync       | hexo-deployer-ftpsync   |

我是使用 git，所以使用以下指令進行安裝
``` bash
npm install 套件安裝名稱 --save
```
附上我的`package.json`
``` text
{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "hexo": {
    "version": "3.1.1"
  },
  "dependencies": {
    "hexo": "^3.1.0",
    "hexo-deployer-git": "0.0.4",
    "hexo-generator-archive": "^0.1.2",
    "hexo-generator-category": "^0.1.2",
    "hexo-generator-feed": "1.0.3",
    "hexo-generator-index": "^0.1.2",
    "hexo-generator-sitemap": "1.0.1",
    "hexo-generator-tag": "^0.1.1",
    "hexo-renderer-ejs": "^0.1.0",
    "hexo-renderer-marked": "^0.2.4",
    "hexo-renderer-stylus": "^0.3.0",
    "hexo-server": "^0.1.2"
  }
}
```
接著在 Hexo 目錄的`_config.yml`進行設定(不是 themes 裡面的`_config.yml`)，找到 deploy 這行，進行如下設定，repo 更改為自己的位址，message 可以自己自定一下。
``` yaml 佈署 https://hexo.io/docs/deployment.html
deploy:
  type: git ##部署類型 其他類型自行google之
  repo: git@github.com:shunnien/shunnien.github.io.git ##git位址  
  branch: ##git 頁面分支
  message: Site updated at {{ now("YYYY-MM-DD HH:mm:ss") }} ##git message建議默認字段update 可以自定義
```
這樣設定就都完成了，直接使用指令佈署到 Github 上
``` bash
hexo d
```
最後把原始碼加入到版控上，先在 Hexo 資料夾下建立新分支(hexo 安裝的資料夾下)

``` bash
# 建立 git repo
git init
# 加入 Github 位址
git remote add origin 你的Github位址
# 建立沒有 parent 的分支
git checkout --orphan 新分支名稱
# 加入檔案
git add .
# 寫入註解
git commit -m "chang to hexo"
# 將檔案推送到 github 上
git push orgin 新分支名稱
```
## 參考資料
- [Hexo][1]

[1]: https://hexo.io/ "Hexo"
[2]: http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html "阮一峰:搭建一个免费的，无限流量的Blog----github Pages和Jekyll入门"
[3]: http://wsgzao.github.io/post/hexo-guide/ "HelloDog:使用GitHub和Hexo搭建免费静态Blog"
[4]: http://shunnien.github.io/tags/Octopress/ "ShunNien:Octopress"
[5]: https://hexo.io/docs/index.html "Hexo:Documentation"
[6]: https://hexo.io/docs/migration.html "Hexo:Migration"
[7]: https://hexo.io/docs/deployment.html "Hexo:Deployment"
[98]: http://jekyllrb.com/ "Jekyll"
[99]: http://twiceyuan.com/2014/05/25/hexo%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0readmore%E6%A0%87%E8%AE%B0/ "Hexo自动添加ReadMore标记"