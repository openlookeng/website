DROP表名
==========

摘要
--------

"```{.none}"
DROP TABLE [ IF EXISTS ]数据表名
```

问题描述
-----------

删除一个已存在的表。

如果表不存在，可选的`IF EXISTS`子句将导致错误被抑制。

示例
--------

删除表`orders_by_date`，命令如下：

DROP TABLE按订单_按日期排序

如果表`orders_by_date`存在，则删除表`orders_by_date`：

DROP TABLE IF EXISTS订单列表_按日期排序

参见
--------

[alter-table](./alter-table)，【创建表】（./创建表）
