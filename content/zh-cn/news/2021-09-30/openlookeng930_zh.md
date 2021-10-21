+++ 
title = "openLooKeng v1.4.0 正式发布"
date = "2021-10-15"
categories = ["Announcement"]
author = "openLooKeng"
description = "金秋10月， openLooKeng 新版本 v1.4.0 正式发布。基于社区用户和开发者的体验和建议，新版本在原基础上进行了一些优化，以提升引擎性能。"
+++


随着IT构建成本越来越低，数据存储、平台构建、开源数据技术及人工智能的快速发展，各行各业越来越重视对大数据分析能力。自2020年6月开源以来，每一次的迭代更新，openLooKeng都为用户提供了更为简单与可靠的数据分析体验。这也使得搭载openLooKeng的用户伙伴越来越多，有ISV、政府，也有金融、互联网等等。我们感谢用户与社区小伙伴的支持。金秋10月， openLooKeng 新版本 v1.4.0 正式发布。基于社区用户和开发者的体验和建议，新版本在原基础上进行了一些优化，以提升引擎性能。

### · Star Tree索引

Star Tree 索引提供一种预聚合技术，通过创建和管理用户所需要的不同的Cubes（多维数据集）来优化冰山查询的延时。在支持对大型Cubes的创建（10 Billion基数）的基础上，新版本1.4.0更新了APIs 接口，使得其能够支持 JDBC Connector使用 Cube，比如Clickhouse Connector。其它JDBC Connector 将陆续支持。 

### · 启发式索引

对启发式索引，新版本1.4.0 做了如下一些优化：

1. 支持UPDATE INDEX。以往更改index时需要将其删除再创建。新版本1.4.0支持在原有的index上进行update操作；

2. SHOW INDEX中增加index大小，内存和磁盘占用信息，以便用户更加合理地使用索引；

3. Bloom index增加nmap cache来减少内存使用；

4. 支持DROP TABLE的同时删除index；

5. 支持创建index后自动加载index。

### · Memory 连接器

修复了几个重要的错误，以解决大型数据集和特定运算符偶尔发生的错误结果。

### · Task Recovery

修复了几个重要的错误，以解决高并发和worker节点故障期间偶尔发生的数据不一致问题。

### · 低时延

1. 优化不包含join的点查sql的stats计算，加快查询速度；

2. 新增自适应分片分组，提升高并发查询吞吐量； 

3. 支持非等式动态筛选器，以加快具有<、>、<= & >=等谓词的查询速度。

### · 新增 Kylin Connector

支持对Kylin数据源的访问查询。

### · Yarn上部署openLooKeng

支持在Yarn容器上部署openLooKeng集群，当前支持部署单coordinator和多worker节点部署。

---

以上便是新版本1.4.0 的优化。作为大数据的关键项目，openLooKeng一直致力于为用户提供极速极简的数据体验。如果您也关注大数据，欢迎加入openLooKeng，一起共话大数据引擎技术。欢迎下载并使用openLooKeng。
openLooKeng，Make Big Data Simplified！

openLooKeng 新版本 v1.4.0下载地址: 
<https://openlookeng.io/zh-cn/download.html>

欢迎在openLooKeng gitee仓上提Issue，分享您的体验感受与建议，您的声音或将成为openLooKeng引擎性能提升的关键。

openLooKeng代码仓地址: <https://gitee.com/openlookeng>

如果您对新版本V1.4.0有任何建议，欢迎发邮件至 users@openlookeng.io告知我们。

openLooKeng社区官网: <https://openlookeng.io/zh-cn/>

