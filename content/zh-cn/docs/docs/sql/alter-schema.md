替代计划
============

摘要
--------

"```{.none}"
重命名{SCHEMA|DATABASE}名称重命名
```

问题描述
-----------

更改现有架构的定义。

示例
--------

将模式`web`重命名为`traffic`：

ALTER SCHEMA网站改名到流量
ALTER DATABASE网页改名到流量

限制
-----------

有些连接器不支持重命名模式，如Hive Connector。有关更多详细信息，请参阅连接器文档。

参见
--------

【创建模式】(./create-schema)
