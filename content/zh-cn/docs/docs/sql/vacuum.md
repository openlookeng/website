真空
======

摘要
--------

"```{.none}"
VACUUM TABLE表名称【FULL】【分区值】？【和等待】
```

问题描述
-----------

大数据系统通常使用HDFS作为存储，实现数据在集群中各个节点之间的持久性、透明分布和均衡。HDFS是一个不可变的文件系统，其间的数据不可编辑，只能追加。为了与不可变的文件系统一起工作，不同的文件格式采用写新文件来支持数据突变，随后使用异步后台合并来保持性能并避免许多小文件。

例如，在HiveConnector中，您可以逐行更新或删除ORC事务性表。但每次执行update时，都会在HDFS文件系统上生成新的delta和delete\_delta文件。使用`VACUUM`可以将所有这些小文件合并到一个更大的文件中，并优化并行性和性能

**VACUUM的类型：**

**默认值**

默认真空可被视为合并表的小数据集的第一级。这将是频繁的，通常将更快比完全真空。

*Hive服务：*

Default Vacuum对应Hive Connector中的\'Minor Compaction'，即一般情况。将所有有效的增量目录合并到一个压缩的增量目录中，类似地将所有有效的delete\_delta目录合并到一个
delete\_delta目录，删除文件。基本文件不会被更改。旧的，较小的增量文件将被删除后，所有的读者读完他们。

**满**

FULLvacuum可以看作是合并所有表数据集的下一级。与默认真空相比，这些操作的频率会降低，完成时间也会延长。

*Hive服务：*

FULL Vacuum对应Hive Connector中的“Major Compaction”选项。合并所有base和delta文件。作为此操作的一部分，将永久删除已删除或更新的行。全部中止
从元数据库中的事务表中移除事务。旧的增量文件将被删除后，所有的读者是读完他们。

`FULL`关键字表示是否启动Major Compaction。如果没有这个选项，它将执行一个次要的压缩；

使用`PARTITION`子句指定清理哪个分区。

使用`AND WAIT`来标识此真空运行为同步模式。如果没有此选项，它将作为异步模式运行。

示例
--------

示例一：默认抽真空并等待完成：

VACUUM TABLEcompact_test_tableandWAIT（压缩测试表和等待表）

示例2：分区\'partition\_key=p1\'上的FULL真空：

VACUUM TABLE Compact_test_table_with_partition _FULL分区表分区表'分区键值=p1'；

示例三：完全真空等待完成：

VACUUM TABLE紧凑型测试表，分区已满且处于等待状态；

参见
--------

【更新】（./update），【删除】（./删除）
