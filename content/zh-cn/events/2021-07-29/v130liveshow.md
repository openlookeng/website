+++
author = "openLooKeng"
time = "2021.07.02-2021.07.29" 
title = "openLooKeng v1.3.0 新特性讲解" 
location = "线上" 
tag = "直播"
img = "./events/2021-07-29/20210728-v130.png" 
img_mobile = "./events/2021-07-29/20210728-v130.png" 
link = "./events/2021-07-29/v130liveshow.html"
eventtype = "upComing"
description = ""
weight = 91
+++


### 活动介绍

2021年6月30日，openLooKeng将迎来新版本 v1.3.0。基于社区用户和开发者的体验和建议，openLooKeng 新版本 v1.3.0 在原基础上进行特性优化，并提供新功能，以提升引擎性能。为了让大家更好地了解新版本特性，自7月2日起，openLooKeng社区举行了关于新特性的一系列讲解直播。

* <b>如果您想回顾视频，请查看[openLooKeng-v1.3.0新版本讲解系列](https://www.bilibili.com/video/BV1M64y1x7iP/)。</b>

---

#### <b>议题1：如何通过openLooKeng读取Hudi数据湖中的数据？</b>

<img src="/zh-cn//events/2021-07-29/01.png">

<a href="hudi-conector-support.pdf" download="">点击下载资料：Hudi Connector Support</a>

---

#### <b>议题2：Greenplum Connector使用介绍</b>

<img src="/zh-cn//events/2021-07-29/02.png">

<a href="greenplum-connector.pdf" download="">点击下载资料：Greenplum Connector使用介绍</a>

---

#### <b>议题3：Oracle 连接器如何支持Update和Delete语句操作？</b>

<img src="/zh-cn//events/2021-07-29/03.png">

openLooKeng v1.3.0新增的Oracle连接器支持Update和Delet操作。那在配置上要注意什么？其语句支持情况是什么样的？如果我们想开发一个连接器的Update和Delete语句支持，该怎么操作？本期，我将带大家深入了解。

<a href="oracle-connector.pdf" download="">点击下载资料：Oracle连接器支持Update和Delet操作</a>

---
#### <b>议题4：Memory Connector性能提升实践</b>

<img src="/zh-cn//events/2021-07-29/04.png">

在1.3.0版本中，openLooKeng的 Memory Connector性能得到了很大提升。本场直播将介绍openLooKeng如何重构 Memory Connector，并引入内存索引、序列化等来提升性能和可用性。同时，我也将介绍openLooKeng的元数据管理模块。如果您有兴趣，欢迎来直播间，我们一起交流。

博客分享，请查看 [Memory Connector: Sorting, Indexing and Spill-to-disk](https://openlookeng.io/blog/2021/07/20/2021-07-20-memory-connector-update-v1.3.0.html)

<a href="memory-connector.pdf" download="">点击下载资料：Memory Connector性能提升实践</a>

---

#### <b>议题5：ClickHouse Connector的介绍与开发经验分享</b>

<img src="/zh-cn//events/2021-07-29/05.png">

在1.3.0版本中，我为openLooKeng开发一个新特性--ClickHouse Connector。本期我将介绍如何通过openLooKeng查询ClickHouse的数据，也会分享这次开发过程中的心得体会和经验，希望帮助到社区的同学。如果您有兴趣，或者您正在开发某个特性功能，欢迎来直播间，我们一起交流交流。

<a href="openlookeng-clickhouse-connector.pdf" download="">点击下载资料：ClickHouse Connector</a>

---

#### <b>议题6：openLooKeng多分片管理特性介绍</b>

<img src="/zh-cn//events/2021-07-29/07.png">

在数据源不具备多分片能力的情况下，单个worker负载压力过大，读取数据效率普遍不高。对此，openLooKeng增加了多分片管理特性，以提高数据查询处理的效率。那该特性是原理是什么？带来了怎样强有力的效果？本期特性直播，有兴趣的朋友可以来听听，我们一起交流交流。

<a href="openLooKeng多分片管理特性介绍.pdf" download="">点击下载资料：openLooKeng多分片管理特性介绍</a>

---

### 更多详情，请关注

openLooKeng 官方公众号       openLooKeng微信小助手

<img src="./accountCode.jpg">
<img src="./assistantCode.jpg">