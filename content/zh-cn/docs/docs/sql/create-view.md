创建视图
===========

摘要
--------

"```{.none}"
创建【或替换】视图view_name
【安全{定义| INVOKER}】
AS查询
```

问题描述
-----------

创建一个[SELECT](./select.md)查询的新视图。视图是一个逻辑表，可以被将来的查询所引用。视图中没有数据。相反，视图存储的查询在每次被其他查询引用时都会执行。

可选`OR REPLACE`子句使视图在已经存在时被替换，而不是引发错误。

安全性
--------

在默认的安全模式`DEFINER`中，视图内引用的表，将使用视图所有者（视图的*creator*或*definer*）的权限来访问，而不是使用执行查询的用户来访问。这允许提供对基础表的限制访问，而用户可能不允许直接访问这些表。

在`INVOKER`安全模式下，视图内引用的表以执行查询的用户（视图的*invoker*）的权限进行访问，以这种模式创建的视图只是存储
查询。

不管安全模式如何，`current_user`函数总是返回执行查询的用户，因此可以在视图中使用它来过滤行或限制访问。

示例
--------

在`orders`表上创建一个简单的视图`test`：

CREATE VIEW测试用AS
SELECT订单键，订单状态，总价/ 2 AS半价
从订单

创建视图`orders_by_date`，对`orders`进行汇总：

CREATE VIEW订单_按日期AS
SELECT订单日期，sum(totalprice) AS价格
从订单
GROUP BY订单日期

创建一个视图，覆盖已有的视图：

创建或替换视图测试AS
SELECT订单键，订单状态，总价/ 4 AS季度
从订单

参见
--------

[drop-view](./drop-view), [show-create-view](./show-create-view)
