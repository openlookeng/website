缓存表
===========

摘要
--------

"```{.none}"
CACHE TABLE table_name WHERE条件字段名
```

问题描述
-----------

`CACHE TABLE`用连接器应该缓存的表名和分区更新协调器元数据。

必须提供`condition`，并且只在分区列上定义。

示例
--------

缓存表：

CACHE TABLE store_sales where location = 'CA'，（缓存表存储位置）

限制
-----------

仅Hive连接器支持该功能。有关更多详细信息，请参阅连接器文档。

参见
--------

显示缓存(./show-cache)
[drop-cache]（./drop-cache表示删除缓存）
