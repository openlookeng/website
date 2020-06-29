HyperLogLog功能介绍
=====================

Presto通过使用[HyperLogLogLog](https://en.wikipedia.org/wiki/HyperLogLogLog)数据结构实现了`approx_distinct`功能，具体如下：

数据结构
---------------

Presto将HyperLogLog数据草图实现为一组32位存储*maximum哈希*的桶。它们可以分散存储（作为从桶ID到桶的映射），也可以密集存储（作为连续的内存块）。
HyperLogLog数据结构以稀疏表示开始，当它更有效时，转换到密集。P4HyperLogLog结构被密集地初始化，并且在它的生命周期内保持密集。

`hyperlog_type`隐式转换为`p4hyperlog_type`，而你可以显式转换为`P4HyperLogLog`：

演员表（AS模块P4HyperLogLog）

序列化
-------------

数据草图可以序列化为`varbinary`，也可以从`varbinary`反序列化。这允许它们被存储以备以后使用。结合了合并多个草图的能力，这允许我们计算查询分区的元素的“近似_可分辨”，然后用很少的时间来计算整个查询
成本。

例如，计算每日唯一用户的`HyperLogLog`，将允许每周或每月通过合并日报来增量计算唯一用户。这类似于计算周收入
汇总每日收入。使用`approx_distinct`和`GROUPING SETS`可以转换为使用`HyperLogLog`。
举例：

CREATE TABLE访问汇总(
访问日期日期，
可变二进制
)；
    
INSERT INTO参观_总结
SELECT访问日期，演员表(approx_set(user_id) AS变量)
FROM user_visits
GROUP BY访问日期；
    
SELECT基数（合并(cast(hll AS HyperLogLogLog）))AS每周_唯一_用户
FROM访问摘要
拜访地_日期>=当前_日期-间隔'7'天；

功能介绍
---------

**approx\_set(x)** -\>日志收集工具

返回`x`的输入数据集的`HyperLogLog`草图。此数据草图位于`approx_distinct`之下，可以在以后通过调用`cardinality()`来存储和使用。


**心率（赫尔）** -\> bigint

这将对`hll` HyperLogLog数据草图汇总的数据执行`approx_distinct`{.interpreted-text role="func"}操作。


**empty\_approx\_set()** -\>日志收集工具

返回一个空的`HyperLogLog`。


**合并(HyperLogLog)** -\> HyperLogLog日志功能介绍

返回单个`hll` HyperLogLog结构体的聚合联合体`HyperLogLog`。

