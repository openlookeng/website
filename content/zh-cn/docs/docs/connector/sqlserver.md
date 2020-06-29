SQL Server连接器
====================

SQLServer连接器允许在外部SQLServer数据库中查询和创建表。这可用于在不同系统（如SQLServer和Hive）之间或两个不同的SQLServer实例之间联接数据。

配置说明
-------------

要配置SQL Server连接器，请在`etc/catalog`目录下创建一个目录属性文件，例如`sqlserver.properties`，将SQL Server连接器挂载为`sqlserver`目录。使用以下内容创建文件，并根据您的设置替换连接属性：

"```{.none}"
连接器.name=sqlserver
connection-url=jdbc:sqlserver://[服务器名[\instanceName][：端口号]]（其中实例名以实际为准）
connection-user=根用户
connection-password=连接密码
```

###多个SQL Server数据库或服务器

SQLServer连接器只能访问SQLServer服务器中的单个数据库。因此，如果您有多个SQLServer数据库，或者想要连接到SQLServer的多个实例，则必须配置多个编录，每个实例一个。

要添加另一个目录，只需将另一个属性文件添加到`etc/catalog`中，并使用一个不同的名称（确保它以`.properties`结尾）。Presto将使用配置的连接器创建一个名为`sales`的目录。

查询SQL Server服务器
-------------------

SQLServer连接器提供对配置数据库中指定用户可见的所有架构的访问。对于以下示例，假设SQL Server目录为`sqlserver`。

可以使用`SHOW SCHEMAS`命令查看可用的模式：

显示来自sqlserver的SCHEMAS；

如果您有一个名为`web`的模式，那么您可以通过`SHOW TABLES`命令查看这个模式中的表：

显示来自sqlserver.web的表；

在`web`数据库中可以看到`clicks`表中的列列表，使用下列方法之一：

DESCRIBE sqlserver.web.单击图标；
显示列从sqlserver.web.clicks；

最后，可以在`web`模式中查询`clicks`表：

从sqlserver.web.clicks中选择

如果您对目录属性文件使用不同的名称，那么在上面的例子中，请使用该目录名称而不是`sqlserver`。

SQL Server连接器限制
--------------------------------

Presto支持连接SQL Server 2016、SQL Server 2014、SQL Server 2012以及Azure SQL数据库，您可以通过以下方式实现对接：

Presto支持以下SQL Server数据类型。下表显示了SQLServer和Presto数据类型之间的映射。

SQL Server类型预置类型
----------------- --------------
| SQL Server类型|前置类型|
| :-------------- | :----------- |
|大字报|大字报|
小的，小的，小的
| `int` | `整型` |
浮子双子
| `char(n)` | `char(n)` |
| `varchar(n)` | `varchar(n)` |
日期日期

[SQL Server数据完整列表
类型】（https://msdn.microsoft.com/zh-cn/library/ms187752.aspx） ，在微软微软官方网站上发布。

暂不支持以下SQL语句：

【删除】（../sql/delete），【授权】（../sql/grant），【回收】(../sql/revoke)
