分析
=======

摘要
--------

"```{.none}"
ANALYZE table_name【WITH（属性名=表达式[,...】）]
```

问题描述
-----------

收集给定表的表和列统计信息。

可选的`WITH`子句可用于提供连接器特定的属性。列出所有可用的属性：

SELECT *来自于系统元数据.metadata.analyze_properties

目前只有[Hive Connector](../connector/hive.md)支持该语句。

示例
--------

分析表`web`，收集表和列的统计信息：

分析网络；

分析hive和default下的表stores：

分析hive.default.stores文件，查看其内容。

从Hive分区表`sales`中分析分区`1992-01-01'，'1992-01-02'`：

对hive.default.sales with进行解析（分区数=ARRAY【ARRAY['1992-01-01'】，ARRAY【'1992-01-02'】]）；

从Hive分区表`customers`中分析复杂分区键（`state`和`city`列）的分区：

分析hive.default.customers with（分区=数组【'CA'， 'San Francis'】，数组【'NY'， 'NY'】）；
