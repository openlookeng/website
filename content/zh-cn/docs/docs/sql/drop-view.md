DROP视图
=========

摘要
--------

"```{.none}"
DROP VIEW【如果EXISTS】视图名称
```

问题描述
-----------

删除一个已经存在的视图。

如果视图不存在，则可选的`IF EXISTS`子句将导致错误被抑制。

示例
--------

删除视图`orders_by_date`，命令如下：

DROP VIEW订单数_按日期

如果视图`orders_by_date`存在，则删除该视图：

DROPVIEW IF EXISTS订单列表_按日期

参见
--------

【创建视图】(./create-view)
