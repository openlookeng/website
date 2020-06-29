执行
=======

摘要
--------

"```{.none}"
EXECUTEstatement_name【使用参数1【，参数2,...】]
```

问题描述
-----------

执行一个名字为`statement_name`的预备语句。参数值在`USING`子句中定义。

示例
--------

准备并执行一个不带参数的查询：

从my_select1开始准备
从国家选择名称；

``` {.sql}
执行my_select1命令；
```

准备并执行一个带两个参数的查询：

从my_select2开始准备
从国家选择名称WHERE regionkey =？和国密<?

``` {.sql}
执行my_select2，使用1,3；
```

这相当于：

从国家中选择名称WHERE regionkey = 1 and Nationalkey < 3；

参见
--------

【准备】（./准备）
