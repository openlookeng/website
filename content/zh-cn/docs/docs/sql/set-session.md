设置会话
===========

摘要
--------

"```{.none}"
SET SESSION名称=表达式
SET SESSION catalog.name =会话目录名称表达式
```

问题描述
-----------

设置会话属性值。

示例
--------

``` {.sql}
SET SESSION优化哈希算法生成开关= true；
SET SESSION hive.optimized_reader_enabled=true; （设置会话是否打开读卡器开关）
```

参见
--------

【重置会话】（./重置会话），【显示会话】（./显示会话）
