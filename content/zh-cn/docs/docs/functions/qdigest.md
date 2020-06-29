分位数摘要函数
=========================

Presto使用分位摘要数据结构实现`approx_percentile`函数。底层数据结构[qdigest](../language/types)在Presto中公开为一种数据类型，可以与`approx_percentile`分开创建、查询和存储。

数据结构
---------------

分位点摘要是存储近似百分位信息的数据草图。该数据结构的Presto类型称为`qdigest`，它接受一个参数，该参数必须是`bigint`、`double`或`real`中的一个，这些参数表示`qdigest`可能摄取的一组数字。它们可以在不降低精度的情况下合并，为了存储和检索，它们可以投射到`VARBINARY'或从`VARBINARY'。

功能介绍
---------

**合并(qdigest)** -\> qdigest合并后的结果

将所有输入的`qdigest`s合并成一个`qdigest`。


**数值\_at\_分位数（qdigest(T），分位数)** -\> T

返回从分位数摘要中给出的在0和1之间的数字`quantile`的近似百分位数值。

**values\_at\_quantiles(qdigest(T)，分位数)** -\> T，以此类推。

以数组形式返回近似百分位值，给定输入分位值摘要和0到1之间的值数组，这些值表示要返回的分位值。

**qdigest\_agg(x)** -\> qdigest\<\【与x相同\】\>（与x相同）

返回`qdigest`，由`x`的所有输入值组成。



**qdigest\_agg(x, w)** -\> qdigest\<\【与x相同\】\>（与x相同\）

返回`qdigest`，它由`x`的所有输入值使用每项权重`w`组成。

**qdigest\_agg(x, w, accuracy)** -\> qdigest\<\【与x相同\】\>（与x相同\）

返回`qdigest`，它由`x`的所有输入值组成，使用每个项的权重`w`和`accuracy`的最大误差。`accuracy`必须是大于零且小于一的值，并且对于所有输入行必须是常数。
