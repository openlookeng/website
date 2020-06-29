降速计划
===========

摘要
--------

"```{.none}"
DROP {SCHEMA|DATABASE}【IF EXISTS】架构名称【{级联|限制}】
```

问题描述
-----------

删除一个已存在的模式。模式必须为空。

如果模式不存在，可选的`IF EXISTS`子句将导致错误被抑制。

示例
--------

删除模式`web`：

DROP SCHEMA网站
删除数据库web

删除模式`sales`，如果存在：

如果退出销售

限制
-----------

从功能上来说，`CASCADE`和`RESTRICT`目前还不支持。

参见
--------

[alter-schema](./alter-schema),[create-schema](./create-schema) <创建模式名称> <源模式名称> <源模式名称> <源模式名称> <源模式名称>
