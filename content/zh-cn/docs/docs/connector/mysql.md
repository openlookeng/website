MySQL连接器
===============

MySQL连接器允许在外部MySQL数据库中查询和创建表。这可用于连接不同系统（如MySQL和Hive）或两个不同的MySQL实例之间的数据。

配置说明
-------------

配置MySQL连接器，在`etc/catalog`目录下创建一个目录属性文件，例如`mysql.properties`，将MySQL连接器挂载为`mysql`目录。使用下列命令创建文件
内容，则根据您的设置替换连接属性：

"```{.none}"
连接器名称=mysql
连接URL=jdbc:mysql://示例.net:3306，其中：
connection-user=根用户
connection-password=连接密码
```

###多台MySQL服务器

可以根据需要创建多个目录，因此，如果您有额外的MySQL服务器，只需在`etc/catalog`中添加另一个属性文件（确保它以`.properties`结尾）。
如果您将属性文件命名为`sales.properties`,Presto将使用配置的连接器创建一个名为`sales`的目录。

查询MySQL
--------------

MySQL连接器为每个MySQL *database*提供一个模式。通过`SHOW SCHEMAS`命令可以查看到可用的MySQL数据库：

展示来自mysql的SCHEMAS；

假设您有一个MySQL数据库，名为`web`，那么您可以通过`SHOW TABLES`命令查看该数据库中的表：

显示来自mysql.web的表；

在`web`数据库中可以看到`clicks`表中的列列表，使用下列方法之一：

在DESCRIBE mysql.web.
展示来自mysql.web的COLUMNS。点击；

最后，您可以访问`web`数据库中的`clicks`表：

从mysql.web.clicks；

如果您对目录属性文件使用不同的名称，那么在上面的例子中，请使用该目录名称而不是`mysql`。

MySQL连接器限制
---------------------------

暂不支持以下SQL语句：

【删除】（../sql/delete），【授权】（../sql/grant），【回收】（../sql/revoke），【显示-授权】（../sql/show-grantants），【显示-角色】（../sql/show-roles），【显示角色授权】(../sql/show-role-grants) , （显示角色授权）
