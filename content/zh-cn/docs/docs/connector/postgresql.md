PostgreSQL连接器
====================

PostgreSQL连接器允许在外部PostgreSQL数据库中查询和创建表。这可用于在不同系统（如PostgreSQL和Hive）之间或两个不同的系统之间连接数据
PostgreSQL实例。

配置说明
-------------

配置PostgreSQL连接器，在`etc/catalog`目录下创建一个目录属性文件，例如命名为`postgresql.properties`，将PostgreSQL连接器挂载为`postgresql`目录。使用以下内容创建文件，并根据您的设置替换连接属性：

"```{.none}"
连接器.name=postgresql
连接URL=jdbc:postgresql://example.net:5432/数据库名称
connection-user=根用户
connection-password=连接密码
```

###多个PostgreSQL数据库或服务器

PostgreSQL连接器只能访问PostgreSQL服务器中的单个数据库。因此，如果您有多个PostgreSQL数据库，或者想要连接到多个PostgreSQL服务器，您必须设置
PostgreSQL连接器的多个实例。

要添加另一个目录，只需将另一个属性文件添加到`etc/catalog`中，并使用一个不同的名称（确保它以`.properties`结尾）。Presto将使用配置的连接器创建一个名为`sales`的目录。

查询PostgreSQL数据库
-------------------

PostgreSQL连接器为每个PostgreSQL模式提供一个模式。通过`SHOW SCHEMAS`命令，可以看到当前可用的PostgreSQL模式：

从postgresql显示调度信息；

如果您有一个名为`web`的PostgreSQL模式，那么您可以通过`SHOW TABLES`命令查看该模式中的表：

从postgresql.web显示表；

在`web`数据库中可以看到`clicks`表中的列列表，使用下列方法之一：

DESCRIBE postgresql.web.单击按钮；
显示从postgresql.web.clicks的列；

最后，您可以访问`web`模式中的`clicks`表：

从postgresql.web.clicks开始选择；

如果您对目录属性文件使用不同的名称，请使用该目录名称，而不要在上述示例中使用`postgresql`。

PostgreSQL连接器限制
--------------------------------

暂不支持以下SQL语句：

【删除】（../sql/delete），【授权】（../sql/grant），【回收】（../sql/revoke），【显示-授权】（../sql/show-grantants），【显示-角色】（../sql/show-roles），【显示角色授权】(../sql/show-role-grants) , （显示角色授权）
