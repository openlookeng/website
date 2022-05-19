+++
title = "开源软件供应链点亮计划"
date = "2021-05-17"
categories = ["Announcement"]
module = 'news'
author = "openLooKeng"
description = "开源之夏是开源软件供应链点亮计划下的暑期活动，活动时间覆盖每年暑期前后，已开展至第三届，旨在鼓励在校学生积极参与开源软件的开发维护，促进优秀开源软件社区的蓬勃发展，活动联合各大开源社区，针对开源项目的开发与维护提供mini任务，并面向全球高校学生开放报名。"
+++

开源之夏是开源软件供应链点亮计划下的暑期活动，活动时间覆盖每年暑期前后，已开展至第三届，旨在鼓励在校学生积极参与开源软件的开发维护，促进优秀开源软件社区的蓬勃发展，活动联合各大开源社区，针对开源项目的开发与维护提供 mini 任务，并面向全球高校学生开放报名。

学生自由选择项目任务，与社区导师沟通实现方案并撰写项目申请方案被选中的学生将在社区导师指导下，按计划完成开发工作，并将成果贡献给社区。在所承担的项目任务成功结项后，参与者将获得开源之夏活动奖金和结项证书。**(奖金：基础项目 8000 元 进阶项目 12000 元)**

openLooKeng 社区将发布 4 个项目任务供大家选择，涉及到`Iceberg Connector开发`、`Delta Lake Connector`、`优化openLooKeng算子下推算法`、`Hive Connector支持count/max/min算子下推`等多样的项目任务

openLooKeng 社区致力于培养更多的开发者，社区项目欢迎您的参与！

## 一、参考步骤

1. 选择：

    - a. 学生自由选择项目，可通过邮件向对应的任务导师咨询你感兴趣的任务。
    - b．邮件标题【开源之夏项目咨询】学生姓名+ 咨询项目任务名称。
    - c. 邮件内容：学生基本情况（学校、专业、年级）+清晰描述您想咨询的问题。

2. 申请

    - a. 确定自己想选择的项目，并撰写项目申请方案。(可参照项目申请模板)
    - b. 报名并提交项目申请方案，在开源之夏官网项目列表页(Summer-2022 (< https://summer-ospp.ac.cn >),找到对应的项目，点击申请按钮提交项目申请方案，可参照项目申请模板.pdf (https://summer-ospp.ac.cn>)
    - c. 申请开放时间：**2022.5.20—2022.6.4**

3. 项目

    - a. 等待方案评选结果，中选结果公布后开始进行项目开发。
    - b. 中选公布时间：**2022.6.15**
    - c. 项目开发时间：**2022.7.1-2022.9.30**

4. 贡献

    - a. 向社区提交 PR。
    - b. 项目任务完成后，将成果以 PR 形式向社区仓库提交，成果被社区仓库合入并通过导师及组委会评审后，即可成功结项。

## 二、交流与咨询

1. 学生参与详情可进一步查看活动官方的学生指南（<https://summer-ospp.ac.cn/help/student/>）
2. 活动整体详情可访问开源之夏 2022 官网（<https://summer-ospp.ac.cn/>）
3. 扫码添加 openLooKeng 小助手微信，通过邀请进入 2022 暑期 openLooKeng 项目交流群，群内有相关项目老师答疑解惑，同时活动信息会第一时间在群内通知。
   <img src='./code.png' alt='2022暑期openLooKeng项目交流群' />

## 三、openLooKeng 任务选择

### 项目 1

1. 项目标题：**Iceberg Connector 开发**
2. 项目描述：`AApache Iceberg` 是一种开放的表格格式，专为巨大的 PB 级表格而设计，是目前市面上流行的三大开源数据湖方案之一。当前，openLooKeng 还没有支持 Iceberg,因此需要开发 `Iceberg Connector`。
3. 项目难度：基础
4. 社区导师：周思佩
5. 导师邮箱：zhousipei@huawei.com

6. 项目产出要求：
    - a) Iceberg Connector 设计文档
    - b) Iceberg Connector 代码与相关测试用例
    - c) 性能测试结果
7. 项目技术要求
    - a) SQL、Java 编程；
    - b) openLooKeng Connector 原理与设计
8. 相关的开源软件仓库列表
    - a) <https://openlookeng.io/>
    - b) <https://gitee.com/openlookeng/hetu-core>

### 项目 2

1. 项目标题：**Delta Lake Connector 开发**

2. Delta Lake 是目前市面上流行的三大开源数据湖方案之一。当前，openLooKeng 还没有支持 Delta Lake,因此需要开发 `Delta Lake Connector。Delta Connector` 使用 `Delta Lake` 提供的 `Delta Standalone Library (DSR)`来读取表元数据。

3. 项目难度：基础
4. 社区导师：涂添翼
5. 导师邮箱：tutianyi@huawei.com
6. 项目产出要求：
    - a) Delta Lake Connector 设计文档
    - b) Delta Lake Connector 代码与相关测试用例
    - c) 性能测试结果
7. 项目技术要求
    - a) SQL、Java 编程；
    - b) openLooKeng Connector 原理与设计
    - c) 了解 Delta Lake 使用与设计
8. 相关的开源软件仓库列表
    - a) <https://openlookeng.io/>
    - b) <https://gitee.com/openlookeng/hetu-core>

### 项目 3

1. 项目标题：**优化 openLooKeng 算子下推算法**
2. 项目描述：openLooKeng 支持 sql 子查询下推到数据源执行(`sub-query pushdown`)，利用该能力可以减少 openLooKeng 与数据源之间的数据传输量，提升 sql 语句的端到端执行效率。由于 openLooKeng 与数据源的语法、数据类型表示的差异，高效的生成下推到数据源的子查询语句成为算子下推特性的关键环节，请对 openLooKeng 算子下推流程进行分析，并做算法、工作流程优化，提高查询执行效率。
3. 项目难度：进阶
4. 社区导师：陈平增
5. 导师邮箱：chenpingzeng@huawei.com
6. 项目产出要求：

    - a) 项目设计文档；
    - b) 优化效果测试报告；

7. 项目技术要求：
    - a) 数据库原理基础；
    - b) JAVA、SQL 编程技术；
    - c) 开源 `openLooKeng/presto/trino` 引擎使用；
8. 相关的开源软件仓库列表：
    - a) <https://openlookeng.io/>
    - b) <https://gitee.com/openlookeng/hetu-core>

### 项目 4

1. 项目标题：**openLooKeng Hive Connector 支持 count/max/min 算子下推**

2. 项目描述：通过 openLooKeng 查询 hive 数据源数据，例如当执行 sql 是`select count(*) from table`时，需要表所有数据取回，取回数据均为无用数据，浪费网络带宽。当把 count、max、min 这种推到 hive 数据源执行时，只需要读取表元数据信息即可，从而减少数据传输，使得 openLooKeng 执行时间缩短。

3. 项目难度：进阶
4. 社区导师：伍玉叶
5. 导师邮箱：wuyuye@huawei.com
6. 项目产出要求：
    - a) 支持 count、max、min 算子下推到 hive
    - b) 输出对应文档说明
7. 项目技术要求：
    - a) SQL、Java 编程能力
    - b) 数据库内核引擎相关技术
    - c) 可以参考 `prestodb 中的 HivePartialAggregationPushdown`
8. 相关开源软件仓库列表
    - a) <https://gitee.com/openlookeng/hetu-core>
    - b) <https://github.com/prestodb/presto>
