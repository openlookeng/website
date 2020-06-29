准备
=======

摘要
--------

"```{.none}"
PREPARE语句_name FROM语句
```

问题描述
-----------

准备一条语句，以便在以后执行。准备语句是保存在具有给定名称的会话中的查询。语句可以包含参数，以代替执行时要替换的文本。参数用问号表示。

示例
--------

准备select查询：

从my_select1开始准备
*从国家选择；

准备一个包含参数的select query。与`regionkey`和`nationkey`比较的值将用`execute`{.interpreted-text role="doc"}语句填充：

从my_select2开始准备
从国家选择名称WHERE regionkey =？和国码<?；

准备一个插入查询：

准备从my_insert开始
插入城市价值（1，'旧金山'）；

参见
--------

【执行方式】（./execute），【去分配-准备】（./deallocate-prepare），【描述-输入】（./decribe-输入），【描述-输出】（./decribe-输出）
