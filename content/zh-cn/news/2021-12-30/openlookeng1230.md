+++ 
title = "openLooKeng v1.5.0 正式发布"
date = "2021-12-30"
categories = ["Announcement"]
author = "openLooKeng"
description = "openLooKeng社区用户数达到 100K +，累计收到 2000+ PR，1500+ Issue，1500+ Comments，2021年，社区下载量突破 100K +；遍及全球41个国家、210个城市。越来越多的人关注到openLooKeng，如今，社区呈现一派生机勃勃，绿荫环绕的景象。"
+++
 
自2020年6月30日开源以来。至今，openLooKeng社区用户数达到 100K +，累计收到 2000+ PR，1500+ Issue，1500+ Comments，2021年，社区下载量突破 100K +；遍及全球41个国家、210个城市。越来越多的人关注到openLooKeng，如今，社区呈现一派生机勃勃，绿荫环绕的景象。

每一次的迭代更新，openLooKeng都致力于为用户提供了极简的数据分析体验， 
2021.12.30， openLooKeng将迎来新版本 v1.5.0。openLooKeng V1.5.0是在旧版本的基础上进行了优化，并提供一些新功能，以提升引擎性能。
 
### Star Tree
对Star Tree，新版本1.5.0 做了如下一些优化：

1. 支持优化连接查询，如星型模型的查询。
2. 优化查询计划：由于Cube已经包含了汇总结果，所以改写查询计划将聚合运算结果重定向到Cube结果，当group by子句完全与Cube组匹配时性能收益明显。
3. 问题修复，以进一步增强Cube的可用性和健壮性。


### 内存连接器

1. 通过增加对内存表分区的支持，允许跳过整个分区的数据，从而提高内存连接器的性能。
2. 收集内存表的统计信息，以支持基于openLooKeng代价的优化器。

### Task Recovery
修复了几个重要的错误，以解决数据不一致问题，以及在高并发和工作节点故障期间偶尔发生的查询挂起问题。

数据持久化

优化了数据溢出到磁盘的机制，将序列化页面直接写入磁盘，而不是缓存。这样，算子可以释放更多的内存，相比之前性能提高30%。

### Yarn上部署openLooKeng
支持在yarn上部署启用HA的openLoKeng集群实例，该实例包含一个反向代理（默认为ngnix）和2个或更多协调节点。通过增加和移除yarn容器，实现手动水平缩放openLooKeng集群。

以上便是新版本1.5.0的优化。作为大数据的关键项目，openLooKeng一直致力于为用户提供极速极简的数据体验。

如果您也关注大数据，欢迎来社区打卡更多知识点，一起共建大数据繁荣生态，欢迎下载并使用openLooKeng。 

openLooKeng，Make Big Data Simplified！

---

openLooKeng 新版本 v1.5.0下载地址: <https://openlookeng.io/zh-cn/download.html>.

欢迎在openLooKeng gitee仓上提Issue，分享您的体验感受与建议，您的声音或将成为openLooKeng引擎性能提升的关键。 

openLooKeng代码仓地址: <https://gitee.com/openlookeng>

如果您对新版本V1.5.0有任何建议，欢迎发邮件至 <users@openlookeng.io>告知我们。

openLooKeng社区官网: <https://openlookeng.io/zh-cn> 

