+++ 
title = "一个简单的UserCase，带你认识openLooKeng的行级权限控制"
date = "2021-11-11"
tags = [ "openLooKeng", "rowfilter"]
archives = "2021-11"
author = "许德智"
description = "行级权限控制一直是大家所关注的内容，本期，社区小伙伴将用一个User Case，简单介绍openLooKeng的行级权限控制。希望对您有帮助。"
+++


### 行级权限的作用

通过 Rowfilter 实现对表数据行级别的权限控制：指定特定用户只能访问授权过的行，隐藏未授权的行数据。

### Use Case

源数据表：

<img src='/zh-cn/blog/20211111/filter01.jpg' />

配置Rowfilter策略：

<img src='/zh-cn/blog/20211111/filter02.jpg' />

查询效果：

<img src='/zh-cn/blog/20211111/filter03.jpg' />

### Rowfilter实现方式

回顾一下openLooKeng的coordinator接收到一个SQL的处理过程：终端用户通过ODBC或者JDBC driver将一个SQL语句发送到coordinator，这时SQL是以文本的形式被接收的。coordinator会解析parse和分析analysis，然后生成query plan。

<img src='/zh-cn/blog/20211111/filter04.jpg' />

openLooKeng analysis过程分为两部分：StatementRewrite和StatementAnalyzer。这两部分中都有权限相关的检查。

考虑到：

1. Rangeradmin侧仅存储鉴权策略，而鉴权逻辑在openLooKeng侧的ranger-plugin中完成。

2. Rowfilter策略实际就是where条件子句。

所以，在StatementRewrite中将Rowfilter条件子句重写到sql中。

主要的代码修改涉及：

1. Ranger侧：修改openLooKeng数据源的策略定义，增加行权限策略的配置界面。

2. openLooKeng侧：增加一个新的rewrite类：RowFilteRewrite，将条件子句加到sql中。

<img src='/zh-cn/blog/20211111/filter05.jpg' />

<img src='/zh-cn/blog/20211111/filter06.jpg' />

<img src='/zh-cn/blog/20211111/filter07.jpg' />


---

如果您有任何疑问或建议，欢迎在社区代码仓内提Issue；也欢迎加小助手微信(openLooKengoss)，进入专属技术交流群。

社区代码仓 

<https://gitee.com/openlookeng>

<https://github.com/openlookeng>


openLooKeng，让大数据更简单！