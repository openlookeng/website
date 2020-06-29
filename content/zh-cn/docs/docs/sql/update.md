更新
======

摘要
--------

"```{.none}"
UPDATE table_name SET column_name = expression【，column_name = expression, ...】【where条件字段】，根据表达式的值更新表信息。
```

问题描述
-----------

`UPDATE`将改变所有满足条件的行中指定列的值。SET子句中只需要提到要修改的列，没有显式修改的列保持原来的值。

示例
--------

更新表`users`，更改名称`Francisco`，其中`id`等于1：

UPDATE users设置名称= '弗朗西斯科' WHERE id=1；

限制
-----------

-目前仅Hive Connector和事务ORC表支持`UPDATE`。
- set表达式不支持子查询。
-支持直接列引用，但不支持带列引用的NOT表达式。
- `UPDATE`不能应用于视图。
- `UPDATE`不支持隐式数据类型转换，当value与目标列的数据类型不匹配时，请使用`CAST`。
-如果表是分区表和/或分桶表，则不能更新bucket\_column和分区列。即它们不能是SET表达式的目标。

参见
--------

【插入】（./插入），【插入-覆盖】（./插入-覆盖）
