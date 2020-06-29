### Hive ACID支持情况

Presto支持在Hive的事务表上插入ACID事务（INSERT,UPDATE,DELETE）。



####使用Hive Connector创建事务型表

要支持ACID事务，必须满足以下前提条件：

1.表应该创建为启用了“transactional”属性。
2、格式化为ORC。Reference #限制

示例：

sql语句
创建表hive_acid_table(
id整型。
名称字符串)
WITH （format='ORC'，事务性=true）；
```



####插入事务性表

对于事务性和非事务性表，从最终用户的角度来看，插入操作保持不变。

示例：

sql语句
插入到hive_acid_table表
价值
（1，'foo'），
（2，'bar'）；
```



####事务表更新

事务性表的UPDATE操作允许用户更新与WHERE子句匹配的特定行的列。

示例：

sql语句
刷新hive_acid_table结构体
SET name='约翰'
WHERE id=2；
```

上述示例将列冯曦name`的值更新为列`id`具有值`2`行的`john`。

UPDATE前select结果：

sql语句
presto:default> SELECT *取自hive_acid_table表的数据，如果该表不存在，则删除。
id |名称
----+------
2 |格子
1 |个
（2行）
```

UPDATE后的SELECT结果

sql语句
presto:default> SELECT *取自hive_acid_table表的数据，如果该表不存在，则删除。
id |名称
----+------
2 |约翰
1 |个
（2行）
```

####事务性表的DELETE操作

对事务性表的DELETE操作允许用户删除与WHERE子句匹配的特定行。

示例：

sql语句
从hive_acid_table中删除
WHERE id=2；
```

以上示例删除列`id`有值`2`的行。

DELETE前的SELECT结果：

sql语句
presto:default> SELECT *取自hive_acid_table表的数据，如果该表不存在，则删除。
id |名称
----+------
2 |约翰
1 |个
（2行）
```

DELETE后的SELECT结果：

sql语句
presto:default> SELECT *取自hive_acid_table表的数据，如果该表不存在，则删除。
id |名称
----+------
1 |个
（1行）
```



####对事务性表VACUUM

Hive将所有事务（INSERT/UPDATE/DELETE）保存在单独的delta目录中，以便记账。DELETE事务并不物理删除存储数据中的旧行，而是在新文件中将它们标记为已删除。UPDATE采用拆分更新机制更新数据。由于这些原因，表上的读操作需要读取许多文件，这增加了额外的开销。所有这些增量文件都需要合并，以获得合并后的数据，从而加快处理速度。presto中的VACUUM操作负责合并这些增量文件。

Hive中，真空操作转换为`compaction`。在Hive中有两种压缩类型，`Major`和`Minor`。

VACUUM和Hive Compaction的映射关系如下：

*VACUUM FULL（真空满压实）转换为Major Compaction（主要压实）。

* VACUUM转换为轻微压缩。

#####真空

sql语句
VACUUM表名称hive_acid_table；
```

上述操作会触发`hive_acid_table`上的VACUUM将所有delta目录合并到单个delta目录中。一旦操作达到RUNNING状态，它将继续异步运行，解除客户机的阻塞。

-----

**说明**：异步VACUUM的结果目前没有命令获取，但可以从UI监控到。

-----

#####真空满

FullVacuum合并delta目录中的所有事务，并创建一个只包含最终结果的`base`目录。该操作将永久删除已删除的行。因此，在读取期间，总的数据读取将非常少，因此提高了性能。

sql语句
VACUUM表hive_acid_table（用户酸度表）
满；
```

上述操作触发`hive_acid_table`上的VACUUM FULL，一旦它达到RUNNING状态，它将继续异步运行，解除客户机的阻塞。

#####在分区表上VACUUM

如果表是分区的，那么VACUUM操作可以单独对特定的分区进行操作，而不是将表的所有分区一起操作。

示例：创建分区表和INSERT数据。

sql语句
CREATE TABLE hive_acid_table_partitioned创建表分区表(
id整型。
名称字符串。
类整型)
WITH（format='ORC'，事务性=true，分区方式_by=ARRAY【'class'】）；

插入到hive的acid表分区
价值
（1，'foo'，5），
（2, 'bar'， 10）条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条，条
```

特定分区`class=5`上的真空可以按如下方式运行：

sql语句
VACUUM表hive_acid_table_partitioned（分区表，分区表）
满
分区'class=5'；
```

如果没有指定`PARTITION 'class=5'冯曦，则vacuum操作将运行在所有的分区上，并且如果任何一个分区中的任何故障都会导致整个操作失败。



#####和WAIT选项

默认情况下，VACUUM操作以异步方式运行，即一旦查询达到RUNNING状态，客户端将不再等待操作完成。

向vacuum操作添加`andWAIT`选项，使客户端同步等待vacuum操作完成。

上面的示例带有“AND WAIT”选项，如下所示：

sql语句
VACUUM表hive_acid_table（用户酸度表）
满
和等待；
```

sql语句
VACUUM表hive_acid_table（用户酸度表）
和等待；
```

sql语句
VACUUM表hive_acid_table_partitioned（分区表，分区表）
满
分区'class=5'
和等待；
```



####使用限制

- Presto只支持Hive 3.x版本的ACID事务

- Presto目前仅支持`ORC`格式的事务表。
