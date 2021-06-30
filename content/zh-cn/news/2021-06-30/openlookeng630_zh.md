+++ 
title = "openLooKeng v1.3.0 正式发布"
date = "2021-06-30"
categories = ["Announcement"]
author = "openLooKeng"
description = "2021年6月底，openLooKeng将迎来新版本 v1.3.0。基于社区用户和开发者的体验和建议，openLooKeng 新版本 v1.3.0 在原基础上进行特性优化，并提供新功能，以提升引擎性能。"
+++


自2020年6月30日开源以来，openLooKeng项目服务越来越多，包括华为云DLI服务、北明软件数据资产管理平台、览众科技资蛛侠等。为了持续为用户提供极简的数据分析体验，openLooKeng保持3个月一个版本的迭代速率。2021年6月底， openLooKeng将迎来新版本 v1.3.0。基于社区用户和开发者的体验和建议，openLooKeng 新版本 v1.3.0 在原基础上进行特性优化，并提供新功能，以提升引擎性能。

于引擎内核来说，openLooKeng v1.3.0主要集中两个维度的增强：融合分析场景和性能提升。

## 融合分析场景

### Task recovery

Task recovery支持查询任务重试，即当查询任务或某个工作节点出现故障，可在其他节点上恢复查询任务。新版本v1.3.0在该基础上支持对CTE（公共表表达式）和spill-to-disk特性的兼容，进一步增强引擎内核的批查询能力。

## 性能提升

### 1. Star Tree索引

Star Tree 索引提供一种预聚合技术，通过创建和管理用户所需要的不同的Cubes（多维数据集）来优化冰山查询的延时。新版本v1.3.0增强包括支持对大型Cubes的创建（10 Billion基数）；支持在Cubes中创建过滤规则来过滤数据；支持对Cubes的增量插入。

### 2. CTE（Common Table Expressions）

对CTE（具有with的语句）进行执行计划优化，使得CTE只被执行一次，并将其流式传输到查询中的其他引用，减少该查询所需的计算资源。新版本v1.3.0中，CTE支持算子下推，进一步提高系统的总体并发。

### 3. 新增优化器CBO（Cost Based Optimization）

针对已排序的表，openLooKeng 新版本 v1.3.0新增排序聚合器。与原有的哈希聚合器相比，排序聚合器减少了对部分不必要的数据保存，节省了内存和处理时间，提高引擎查询性能。

openLooKeng注重引擎内核的增强，也重视南向生态的扩展，期待更多的小伙伴加入进来，共同发展。新版本v1.3.0 提升原有连接器功能的同时，新增Hudi、Greenplum、ClickHouse等数据源连接器，为社区小伙伴们提供更好的数据体验。

## 功能提升

1.Oracle Connector支持Update和Delete操作；

2.JDBC Connector支持多分片查询，通过提高并发来提升性能；

3.Memory Connector通过hetuMetastore支持数据和元数据的持久化，从而防止内存表信息丢失；提供新的数据布局以支持排序和索引，进而提高数据查询性能。

## 新增数据源连接器

1.Hudi Connector，支持对Hudi数据源的访问查询；

2.Greenplum Connector，支持对GreenPlum数据源的基本读写操作，但不支持删除和更新；

3.ClickHouse Connector，支持对ClickHouse数据源的基本读写操作；支持SQL语句下推到该数据源，支持外部函数的注册及函数下推能力。

当然，为了让用户有更好的体验，提高引擎的可靠性，openLooKeng v1.3.0还增强了资源隔离的特性：根据用户配置限制和资源使用情况进行节流调度或终止任务，从而确保资源的正确使用。

### **openLooKeng 新版本 v1.3.0下载地址**

<https://openlookeng.io/zh-cn/download.html>

作为大数据的关键项目，openLooKeng一直致力于为用户提供极速极简的数据体验。开源至今， openLooKeng已迭代更新6个版本，引擎性能不断完善，社区发展愈加有活力。我们感谢大家的支持，期待未来会有更多的新小伙伴加入到openLooKeng的大家庭中，一起携手前行，共话大数据引擎技术。

openLooKeng，Make Big Data Simplified！

如果您对新版本V1.3.0有任何建议，欢迎发邮件至 users@openlookeng.io 告知我们。

openLooKeng社区官网 <https://openlookeng.io/zh-cn/>

openLooKeng代码仓地址 <https://gitee.com/openlookeng>
