+++
title = "开源软件供应链点亮计划"
date = "2021-05-17"
categories = ["Announcement"]
module = 'news'
author = "openLooKeng"
description = "开源之夏是由“开源软件供应链点亮计划”发起并长期支持的一项暑期开源活动，旨在鼓励在校学生积极参与开源软件的开发维护，促进优秀开源软件社区的蓬勃发展，培养和发掘更多优秀的开发者。"
+++
 

开源之夏是开源软件供应链点亮计划下的暑期活动，活动时间覆盖每年暑期前后，已开展至第三届，旨在鼓励在校学生积极参与开源软件的开发维护，促进优秀开源软件社区的蓬勃发展，活动联合各大开源社区，针对开源项目的开发与维护提供mini任务，并面向全球高校学生开放报名。


学生自由选择项目任务，与社区导师沟通实现方案并撰写项目计划书。被选中的学生将在社区导师指导下，按计划完成开发工作，并将成果贡献给社区。在所承担的项目任务成功结项后，参与者将获得开源之夏活动奖金和结项证书。**(奖金：基础项目 8000元 进阶项目 12000元)**

openLooKeng社区将发布4个项目任务供大家选择，涉及到`Apache Iceberg Connector`开发、`Delta Connector`、`优化openLooKeng算子下推算法`、`Hive Connector支持count/max/min算子下推`等多样的项目任务

openLooKeng社区致力于培养更多的开发者，社区项目欢迎您的参与！

## 疑问咨询

1. 学生参与详情可进一步查看活动官方的学生指南（此处跳转：<https://summer-ospp.ac.cn/help/student/>）

2. 活动整体详情可访问开源之夏2022官网（<https://summer-ospp.ac.cn/>）
 
3. 扫码添加openLooKeng小助手微信，通过邀请进入2022暑期openLooKeng项目交流群，群内有相关项目老师答疑解惑，同时活动信息会第一时间在群内通知。

<img src='./code.png' alt='2022暑期openLooKeng项目交流群' />
 

## openLooKeng任务选择

### 任务1

1. 项目标题：**Apache Iceberg Connector开发**
2. 项目描述：Apache Iceberg是一种开放的表格格式，专为巨大的PB级表格而设计，是目前市面上流行的三大开源数据湖方案之一。当前，openLooKeng还没有支持Iceberg,因此需要开发Iceberg Connector。
3. 项目难度：基础(中等)
4. 社区导师：周思佩 
5. 导师邮箱：zhousipei@huawei.com

6. 项目产出要求：
   + a) Iceberg Connector设计文档
   + b) Iceberg Connector代码与相关测试用例
   + c) 性能测试结果
7. 项目技术要求
   + a) SQL、Java编程；
   + b) openLooKeng Connector原理与设计
8. 了解iceberg使用与设计
9. 相关的开源软件仓库列表
    + a) <https://openlookeng.io/>
    + b) <https://gitee.com/openlookeng/hetu-core>

### 任务2

1. 项目标题：**Delta Lake Connector开发**

2. 项目描述：Delta Lake是目前市面上流行的三大开源数据湖方案之一。当前，openLooKeng还没有支持Delta Lake,因此需要开发Delta Connector。Delta Connector使用Delta Lake提供的Delta Standalone Library (DSR)来读取表元数据。
3. 项目难度：基础(中等)
4. 社区导师：涂添翼
5. 导师邮箱：tutianyi@huawei.com
6. 项目产出要求：
   + a) Delta Lake Connector设计文档
   + b) Delta Lake Connector代码与相关测试用例
   + c) 性能测试结果
7. 项目技术要求
   + a) SQL、Java编程；
   + b) openLooKeng Connector原理与设计
   + c) 了解Delta Lake使用与设计
8. 相关的开源软件仓库列表
   + a) https://openlookeng.io/
   + b) https://gitee.com/openlookeng/hetu-core
 
### 任务3

1. 项目标题：**优化openLooKeng算子下推算法**
2. 项目描述：openLooKeng支持sql子查询下推到数据源执行(sub-query pushdow)，利用该能力可以减少openLooKeng与数据源之间的数据传输量，提升sql语句的端到端执行效率。由于openLooKeng与数据源的语法、数据类型表示的差异，高效的生成下推到数据源的子查询语句成为算子下推特性的关键环节，请对openLooKeng算子下推流程进行分析，并做算法、工作流程优化，提高查询执行效率。
3. 项目难度：基础(中等)
4. 社区导师：陈平增
5. 导师邮箱：chenpingzeng@huawei.com
6. 项目产出要求：
   + a) 项目设计文档；
   + b) 优化效果测试报告；

7. 项目技术要求：
    + a) 数据库原理基础；
    + b) JAVA、SQL编程技术；
    + c) 开源openLooKeng/presto/trino引擎使用；
8. 相关的开源软件仓库列表：
   + a) https://openlookeng.io/
   + b) https://gitee.com/openlookeng/hetu-core

### 任务4

1. 项目标题：**openLooKeng Hive Connector支持count/max/min算子下推**

2. 项目描述：通过openLooKeng查询hive数据源数据，例如当执行sql是select count(*) from table时，需要表所有数据取回，取回数据均为无用数据，浪费网络带宽。当把count、max、min这种推到hive数据源执行时，只需要读取表元数据信息即可，从而减少数据传输，使得openLooKeng执行时间缩短。

3. 项目难度：基础（中）
4. 社区导师：伍玉叶
5. 导师邮箱：wuyuye@huawei.com
6. 项目产出要求：
   + a) 支持count、max、min算子下推到hive
   + b) 输出对应文档说明
7. 项目技术要求：
    + a) SQL、Java编程能力
    + b) 数据库内核引擎相关技术
    + c) 可以参考prestodb中的HivePartialAggregationPushdown
8. 相关开源软件仓库列表
   + a) https://gitee.com/openlookeng/hetu-core 
   + b) https://github.com/prestodb/presto
