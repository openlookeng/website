创建表AS
===============

摘要
--------

"```{.none}"
CREATE TABLE【如果不存在】table_name【（列名，...）】
【评论表_评论】
【WITH(property_name =表达式【,...】】，以此类推】
AS查询
【没有数据】
```

问题描述
-----------

创建包含[SELECT](./select.md)查询结果的新表。使用[CREATE TABLE](./create-table.md)方法创建空表。

如果表已经存在，则可选的`IFNOTEXISTS`子句将导致错误被抑制。

可选子句`WITH`用于设置新创建的表的属性。列出所有可用的表属性：

SELECT *从系统元数据中选取

示例
--------

使用查询结果和给定的列名创建新表`orders_column_aliased`：

CREATE TABLE订单行别名（订单日期，总价）
弹性伸缩
SELECT订单日期，总价
从订单

新建表`orders_by_date`，对`orders`进行汇总：

CREATE TABLE订单_按日期排序
comment '按日期汇总订单'，
WITH（format = 'ORC'）语法检查
弹性伸缩
SELECT订单日期，sum(totalprice) AS价格
从订单
GROUP BY订单日期

如果表`orders_by_date`不存在，则创建表`orders_by_date`：

创建表如果不存在订单_按日期AS
SELECT订单日期，sum(totalprice) AS价格
从订单
GROUP BY订单日期

创建一个空表`empty_nation`,schema与`nation`相同，无数据：

CREATE TABLE空国家属性
选择*
来自国家
无数据

参见
--------

【创建表】（./create-table），【选择】（./选择）
