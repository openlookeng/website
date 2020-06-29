解释
=======

摘要
--------

"```{.none}"
EXPLAIN【（选项【,...】） 】语句

其中，option可以是以下之一：

FORMAT {文本格式|语法格式| JSON格式}
类型{ LOGICAL |分发|有效| IO }
```

问题描述
-----------

显示语句的逻辑执行计划或分布式执行计划，或验证语句。使用`TYPE DISTRIBUTED`选项显示碎片化计划。每个计划片段由单个或多个计划片段执行
Presto节点。片段分离表示Presto节点之间的数据交换。Fragment type指定了分片在Presto节点中的执行方式，以及数据在分片之间的分布方式：

'SINGLE'，（单音）

：表示在单个节点上执行分片。

哈希

：在固定数量的节点上执行分片，输入数据通过哈希函数进行分布。

取整

：在固定数量的节点上执行分片，输入数据以轮询的方式分布。

布罗阿德卡斯特

：在固定数量的节点上执行分片，将输入数据广播到所有节点。

来源

：分片在访问输入拆分的节点上执行。

示例
--------

逻辑规划：

"```{.none}"
presto:tiny>解释选择区域键，count(*)从国家组按1；
查询计划
----------------------------------------------------------------------------------------------------------
-输出项[regionkey, _col1] =>【区域名称：bigint，数量：bigint】
_col1 :=计数值
-远程交换[GATHER]=>域密钥：bigint，计数：bigint
-聚合（最终）[regionkey] =>【regionkey:bigint,count:bigint】，表示本次操作为最终操作。
count := "计数" ("count_8") ，表示计数
-本地交换[HASH]【$hashvalue】("regionkey") =>区域密钥：bigint，计数_8:bigint, $hashvalue:bigint，表示指定区域密钥的哈希值。
-远端交换[REPARTITION]【$hashvalue_9】=>远端交换参数regionkey:bigint，计数值count_8:bigint, $hashvalue_9:bigint，表示指定远端交换参数
-项目[] =>【regionkey：大项，count_8：大项，$hashvalue_10：大项】
$hashvalue_10 := "组合哈希值"（BIGINT '0'， COALESCE("$operator$hash_code("regionkey"）, 0)) ，表示使用混合哈希值进行散列
-聚合（分区）[regionkey] =>【regionkey：大分区，count_8：大分区】
count_8 := "计数"(*)
- TableScan[tpch:tpch:nation:sf0.1,originalConstraint=true]，如果该选项设置为true，则此检查项通过，否则检查项不通过。=>[regionkey:bigint]
regionkey := tpch：区域密钥
```

分布式方案：

"```{.none}"
解释（类型分布）选择地区键，计数（*）从国家组按1；
查询计划
----------------------------------------------------------------------------------------------
分片0【单个】
输出布局：【regionkey,count】
输出分区：SINGLE []
-输出项[regionkey, _col1] =>【区域名称：bigint，数量：bigint】
_col1 :=计数值
- RemoteSource[1] =>【区域关键字，计数关键字】

分片1 [HASH]
输出布局：【regionkey,count】
输出分区：SINGLE []
-聚合（最终）[regionkey] =>【regionkey:bigint,count:bigint】，表示本次操作为最终操作。
count := "计数" ("count_8") ，表示计数
-本地交换[HASH]【$hashvalue】("regionkey") =>区域密钥：bigint，计数_8:bigint, $hashvalue:bigint，表示指定区域密钥的哈希值。
- RemoteSource[2] =>【区域名称：大区，数量_8：大区，$hash值_9：大区】

碎片2【来源】
输出布局：【regionkey,count_8,$hashvalue_10】，其中：
输出分区：哈希[regionkey][$hashvalue_10]
-项目[] =>【regionkey：大项，count_8：大项，$hashvalue_10：大项】
$hashvalue_10 := "组合哈希值"（BIGINT '0'， COALESCE("$operator$hash_code("regionkey"）, 0)) ，表示使用混合哈希值进行散列
-聚合（分区）[regionkey] =>【regionkey：大分区，count_8：大分区】
count_8 := "计数"(*)
- TableScan[tpch:tpch:nation:sf0.1,originalConstraint=true]，如果该选项设置为true，则此检查项通过，否则检查项不通过。=>[regionkey:bigint]
regionkey := tpch：区域密钥
```

验证：

"```{.none}"
presto:tiny>解释（类型有效）选择区域键，计数（*）从国家组按1；
是否有效
-------
真实
```

输入输出：

"```{.none}"
presto:hive> EXPLAIN（类型IO，格式化JSON）插入到test_nation选择*来自国家WHERE regionkey = 2；
查询计划
-----------------------------------
{
"inputTableColumnInfos": [ {表格列信息列表
"表" : {
"catalog" : "头像"，
"schemaTable" : {
"schema" : "tpch"，
"table" : "民族"
}
}，
"columns" : [ {
"columnName" : "区域密钥"，
"type" : "大"，
"domain" : {
"nullsAllowed" ：表示允许为空。
"ranges": [ {范围值
"low" : {
"value" : "2"，
"bound" : "精确"
}，
"高" : {
"value" : "2"，
"bound" : "精确"
}
} ]
}
} ]
} ]，
"outputTable" : {
"catalog" : "头像"，
"schemaTable" : {
"schema" : "tpch"，
"table" : "测试国家"
}
}
}
```

参见
--------

【解释-分析】（./解释-分析）
