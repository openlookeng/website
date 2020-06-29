创建表
============

摘要
--------

"```{.none}"
CREATE TABLE【如果不存在】
表名(
{ column_name data_type【注释】【WITH （属性名=表达式[, ...】） ]
|类似已有表名称【{包含|排除}属性】}
[, ...]
)
【评论表_评论】
【WITH(property_name =表达式【,...】】，以此类推】
```

问题描述
-----------

创建一个具有指定列的新空表。使用`create-table-as`{.interpreted-text role="doc"}创建一个有数据的表。

如果表已经存在，则可选的`IFNOTEXISTS`子句将导致错误被抑制。

可选的`WITH`子句可用于设置新创建的表或单列上的属性。列出所有可用的表属性：

SELECT *从系统元数据中选取

例如，对于蜂箱连接器，以下是一些可用且常用的表属性：

|属性名称|数据类型|说明|缺省值|
| ---------------- | -------------- | ------------------------------------------------------------ | ------- |
| `format` | varchar |表的Hive存储格式。取值范围：【ORC,PARQUET,AVRO,RCBINARY,RCTEXT,SEQUENCEFILE,JSON,TEXTFILE,CSV】|ORC |
| `bucket_count` |整数|桶的个数| |
| `bucketed_by` |数组(varchar) |桶的列数| |
| `sorted_by` | array(varchar) |桶的排序列| |
| `external` | boolean |该表是外部表吗| `false` |
| `location` | varchar |当`external``=``true`时，必须提供表location值的文件系统位置URI | |
| `partitioned_by` |数组(varchar) |分区列| |
| `transactional` | boolean |是否启用事务性属性？只有ORC存储格式支持创建事务性表是有限制的| `false` |

列出所有可用的列属性：

SELECT *来自于系统元数据.column_properties

可以使用`LIKE`子句将现有表中的所有列定义包含到新表中。可以指定多个`LIKE`子句，允许从多个表中复制列。

如果声明了`INCLUDING PROPERTIES`，那么所有的表属性都会复制到新表中。如果`WITH`子句指定了与所复制的属性之一相同的属性名称，则`WITH`的值
将使用子句。默认行为是`排除属性`。最多只能为一个表指定“包含属性”选项。

示例
--------

创建新表`orders`：

CREATE TABLE订单(
订单键大
订单状态varchar，
总价翻倍，
订单日期
)
WITH（format = 'ORC'）语法检查

创建一个新的事务表`orders`：

CREATE TABLE订单(
订单键大
订单状态varchar，
总价翻倍，
订单日期
)
WITH(format = 'ORC'，
事务性=true)

创建外部表`orders`：

CREATE TABLE订单(
订单键大
订单状态varchar，
总价翻倍，
订单日期
)
WITH(format = 'ORC'，
外部=true，
location='hdfs://hdcluster/tmp/externaltbl（本地磁盘文件）')

如果表`orders`不存在，则创建表`orders`，并添加表注释和列注释：

CREATE TABLE如果不存在订单(
订单键大
订单状态varchar，
totalprice double COMMENT '价格单位为分'，
订单日期
)
跟踪订单的表格。

使用`orders`的列加上开头和结尾的附加列创建表`barge_orders`：

CREATE TABLE biger_orders(创建表时指定的更大的订单数(
其他_orderkey的bigint类型，
像命令一样
other_orderdate订单日期
)

限制
-----------

不同的连接器可能支持不同的数据类型和不同的表/列属性。有关更多详细信息，请参阅连接器文档。

参见
--------

【alter-table(./alter-table)，【drop-table】（./drop-table），【create-table-as】（./create-table-as），【show-create-table】（./show-create-table），中文名称：显示-创建-表，英文名称：显示-创建-表

