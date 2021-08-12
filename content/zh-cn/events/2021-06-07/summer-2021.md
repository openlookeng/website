+++
author = "openLooKeng"
time = "2021.02-2021.11" 
title = "开源软件供应链点亮计划-暑期2021（openLooKeng）" 
location = "线上" 
tag = "开发者竞赛"
img = "/img/events/summer-2021-zh.png" 
img_mobile = "/img/events/summer-2021-zh.png" 
link = "./events/2021-06-07/summer-2021.html"
eventtype = "upComing"
description = ""
weight = 91
+++


## 暑期2021活动简介

开源软件供应链点亮计划 - 暑期 2021（以下简称 暑期 2021）是由中国科学院软件研究所与openEuler社区共同举办的一项面向高校学生的暑期活动，旨在鼓励在校学生积极参与开源软件的开发维护，促进优秀开源软件社区的蓬勃发展。我们将联合各大开源社区，针对重要开源软件的开发与维护提供项目，并向全球高校学生开放报名。

学生自由选择项目，与社区导师沟通实现方案并撰写项目计划书。被选中的学生将在社区导师指导下，按计划完成开发工作，并将成果贡献给社区。根据项目的难易程度和完成情况，参与者将获取由主办方发放的项目奖金。

<img src="/img/events/summer-2021-zh.png">

## openLooKeng社区任务详解

openLooKeng社区在暑期2021活动中发布3个任务，同学们可以通过本文的深度解析，找到感兴趣的项目（任务），通过邮件与导师详细沟通，或联系openLooKeng小助手（微信号openLooKengoss）协助。

---

#### 项目 1 openLooKeng 功能增强

1. 项目标题： openLooKeng 支持 HA Proxy

2. 项目描述：openLooKeng 支持 HA 模式，借助  Nginx 等第三方代理的能力，可以实现多个 Coordinator 之间的负载均衡，但 Nginx 等第三方代理无法自动发现 Coordinator，如果有新的 Coordinator 加入，那么需要手动修改 Nginx 等第三方 Proxy 的配置，这样给集群管理带来一定的难度。项目通过扩展 openLooKeng 原有的 Proxy 逻辑，结合 openLooKeng 的 discovery 框架，实现：

    a)	自动发现和监测，当 Coordinator 节点加入或退出时，可以近实时（ms级）的更新服务列表；
    
    b)	负载均衡，默认实现一种策略即可，但接口必须可扩展以便支持多种负载均衡策略；

    c)	高性能转发，以 Nginx 为标杆。

3.	项目难度：中

4.	项目社区导师：张景芳

5.	导师联系方式：410920672@qq.com

6.	项目产出要求：

    - proxy设计文档

    - Proxy 代码和相关测试用例

    - Proxy 性能测试结果

7.	项目技术要求：

    - 正向代理原理

    - NIO 理论知识

    - 负载均衡理论知识

    - Airlift Discovery 框架

8.	相关的开源软件仓库列表：

    <https://gitee.com/openlookeng/hetu-core>

---

#### 项目 2 openLooKeng 性能调优

1.	项目标题：openLooKeng AI 参数调优

2.	项目描述：当部署 openLooKeng 到一个新的集群当中时，对于参数的调整追求更高的性能是一个永恒的难题。openLooKeng 核心参数众多，性能调优涉及各种配置文件中的参数，比如各特性的配置属性，JDK参数等，如何根据多个维度的输入，如集群的结点个数，CPU核数、内存大小以及网络情况推荐更好的参数配置，进行设计方案，实现 AutoML，进行参数的自适应学习，得到更好的参数配置，让 openLooKeng 运行的更快。

3.	项目难度：中

4.	项目社区导师：李铮

5.	导师联系方式：lizheng@hust.edu.cn

6.	项目产出要求：

    - AutoML模型，结合 openLooKeng 进行参数自动调优

    - TPCDS Benchmark，调参前后性能对比测试

7.	项目技术要求：

	- 在 openLooKeng 参数中寻找最优参数，性能相对默认参数有明显性能提升

    - 可以参考多种AutoML模型

8.	相关的开源软件仓库列表：

    <https://gitee.com/openlookeng/hetu-core>

    DAC: [Datasize-Aware High Dimensional Configurations Auto-Tuning【 Zhibin Yu et al. （2018）】](http://alchem.usc.edu/portal/static/download/dac.pdf)

    Vega: [Towards an End-to-end configurable AutoML pipline 【Jiajin Zhang et al. 2020】](https://arxiv.org/abs/2011.01507)

---

#### 项目 3 openLooKeng 功能增强和性能优化

1.	项目标题：openLooKeng Elasticsearch Connector 支持算子下推

2.	项目描述：当前通过openLooKeng Elasticsearch Connector查询Elasticsearch数据源数据时，需要全数据表取回。当涉及的数据量比较大，且 openLooKeng 中输入的 SQL 语句含有较多的数据过滤条件，数据项全取回时大量的取回的数据为无用数据，非常浪费网络带宽。Elasticsearch数据源具有较强的计算能力，能够对数据进行过滤计算操作。将openLooKeng内核中的过滤算子映射为 Elasticsearch 可执行的过滤操作，使得数据能够提前在 Elasticsearch过滤计算
      （例如将 openLooKeng 中的‘count’算子推到 Elasticsearch），减少数据传输，使得 openLooKeng SQL 作业执行时间大幅缩短，是本项目的需要达到的目标。

3.	项目难度：中

4.	项目社区导师：黎一泽/Armlly

5.	导师联系方式：liyizeyouxiang@live.cn

6.	项目产出要求：
    - openLooKeng过滤算子到Elasticsearch过滤操作的映射模型

    - 重构现有openLooKeng Jdbc connector算子下推框架，提交可执行代码

    - TPCDS Benchmark，执行下推前后TPCDS执行性能对比和分析

7.	项目技术要求：

    - SQL、Java编程

    - 数据库内核引擎相关技术

    - openLooKeng 和 Elasticsearch 使用

8.	相关的开源软件仓库列表：

    <https://gitee.com/openlookeng/hetu-core>

如果您

---
## 活动日程


| 日期                     | 阶段                                     |
| -------------------------| ---------------------------------------- |
| 01 月 29 日               | 社区报名启动                            |
| 04 月 02 日               | 第一批社区名单公示，学生开始与社区沟通项目意向 |
| 05 月 20 日               | 社区报名截止                        |
| 05 月 21 日               | 第二批社区名单公示                        |
| **05 月 24 日 - 06 月 13 日** | **学生提交项目申请阶段**                     |
| **06 月 30 日**               | **项目申请审核结果公示**                     |
| 07 月 01 日 - 08 月 15 日 | 项目研发第一阶段                         |
| 08 月 30 日               | 项目中期考核结果公示                     |
| 08 月 16 日 - 09 月 30 日 | 项目研发第二阶段                         |
| **10 月 22 日**               | **项目结项考核结果公示**                     |
| 11 月上旬                 | 年度优秀项目公示                         |


## “暑期2021”活动参与指南
--- 
* 如果您想进一步了解赛题任务，请点击[暑期2021-openLooKeng项目任务讲解与答疑](https://www.bilibili.com/video/BV1c44y167gh)

* 如果您是学生，请查看[学生指南](https://summer.iscas.ac.cn/help/student/)。
* 如果您是导师，请查看[导师指南](https://summer.iscas.ac.cn/help/mentor/)。
* 更多详情，请查看[暑期2021](https://summer.iscas.ac.cn/)官网。


