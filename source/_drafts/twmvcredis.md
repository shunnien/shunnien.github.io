---
title: twmvc redis
toc: false
categories:
tags:
description:
---
## Introduction


## Setting
- redis password 有大小寫區分
- 一個 port 一個 instance
[sentinel conf template](http://download.redis.io/redis-stable/sentinel.conf)

## Data Type
strings

#### Redis Sets
sets 裡面的 value 必須唯一
sets 可以針對集合進行交集與差集

#### Client Side Sentinel switch
當 master redis failover ，client side 怎麼去取得現在 runing 的 redis (原本的 slave)
##### 1
訂閱

##### 2



## Reference
- [Ref1][1]

[1]: https://shunnien.github.io