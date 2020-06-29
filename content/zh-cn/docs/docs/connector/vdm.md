# VDM连接器

有一些用例需要在同一个会话或视图中管理和访问多个数据源。此外，用户可能根本不关心数据的分布和来源。VDM Virtualize Data Market)连接器旨在将该特性引入Presto。

VDM连接器支持：
-创建、更新和删除组合多个目录的视图
-通过视图访问真实数据
-通过视图管理用户权限
-记录每个用户对VDM视图的使用

##用法

VDM使用Presto元数据库存储其数据库信息。它既可以存储在HDFS上，也可以存储在关系数据库中，这取决于Presto元数据库的实现。

因此必须先配置metastore。下面是使用RDBMS作为元存储的示例：

元数据类型=jdbc
presto.meatstore.db.url=jdbc:mysql://.....数据库安装脚本示例。
presto.metastore.db.user=使用root用户登录数据库
数据库密码=123456

对于用户界面，可以从JDBC或命令行界面访问连接器。当前VDM仅支持逻辑库和视图。不支持表。

模式操作与通常的presto目录相同，包括`create schema`、`drop schema`、`rename schema`和`show schemas`。

视图可以创建在特定的模式下面：`create view as...`,`drop view`。

##使用示例：

配置数据源`vdm1`，在`etc/catalogs`中新建`vdm1.properties`，内容如下：

连接器.name=vdm

此示例在`vdm1`目录中创建模式`schema1`，并从其他两个不同的数据源创建两个视图。需要注意的是，metastore需要提前配置好（参考`usage`章节）。

创建模式vdm1.schema1；
使用vdm1.schema1模式；
创建视图view1作为select * from mysql.table.test；
创建视图view2作为hive.table.test的select *；
从view1中选择*；

VDM数据源也可以通过动态目录API进行管理。有关更多信息，请参见【动态目录】主题。

##所有支持的CLI查询

支持操作|外部接口（SQL命令）|
:-|:-|
添加VDM | `创建目录`（结果） |
Remove VDM | `删除目录`（恢复式） |
查询所有VDM | `show catalogs` |
创建模式| `创建模式` |
删除模式| `drop schema` |
重命名模式| `rename schema` |
查询VDM | `show schemas` |下的所有模式
查询模式中所有视图| `show tables` |
创建/更新视图| `创建【或替换】视图` |
删除视图| `drop view` |
按视图查询| `select * from view` |
查询视图创建信息| `show create view` |
查询视图列信息| `desc view` |

