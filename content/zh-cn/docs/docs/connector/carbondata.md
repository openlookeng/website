

# Carbondata连接器

【目标】

<hr/>
##概述

Carbondata连接器支持查询存储在Carbondata仓库中的数据。Carbondata由三个部分组成：

- Carbondata存储格式的数据文件，通常存储在HDFS中。
-关于数据文件如何映射到模式和表的元数据。该元数据存储在MySQL等数据库中，通过Hive Metastore Service (HMS)访问。
-一种称为HiveQL/SparkSQL的查询语言。这种查询语言在分布式计算框架（如MapReduce或Spark）上执行。

Presto只使用前两个组件：数据和元数据。它不使用HiveQL/SparkSQL或Hive的任何部分执行环境。

**说明：** *Carbondata 2.0.1版本从Presto开始支持*

##配置

Carbondata连接器支持Apache Hadoop 2.x版本。

创建`etc/catalog/carbondata.properties`文件，内容如下，将carbondata`连接器挂载为`hive`目录，替换`example.net:9083`为您的Hive Metastore Thrift服务正确的主机和端口：

```
Connector.name=碳素数据
hive.metastore.uri=thrift://示例.net:9083，其中：
```

### HDFS配置

对于基本设置，Presto自动配置HDFS客户端，不需要任何配置文件。在某些情况下，例如使用联邦HDFS或NameNode高可用性时，需要指定额外的HDFS客户端选项，以便访问HDFS集群。为此，请添加`hive.config.resources`属性来引用您的HDFS配置文件：

```
hive.config.resources=/etc/hadoop/conf/core-site.xml文件，配置文件为/etc/hadoop/conf文件，配置文件为/etc/hadoop/conf文件，配置文件为yarn-site.xml文件，配置文件为/etc/hadoop/conf/yarn-site.xml文件，文件路径：/etc/hadoop/conf/mapred-site.xml文件
```

如果设置需要，只指定附加的配置文件。还建议减少配置文件，使其具有所需的最小属性集，因为附加属性可能导致问题。

所有Presto节点必须存在配置文件。如果用户正在引用现有的Hadoop配置文件，请确保将它们复制到任何没有运行Hadoop的Presto节点。

### HDFS用户名和权限

在对Carbondata表执行`CREATE TABLE`或`CREATE TABLE AS`语句之前，Presto应该可以访问Hive和HDFS。Hive的仓库目录由`hive-site.xml`中的配置变量`hive.metastore.warehouse.dir`指定，默认值为`/user/hive/warehouse`。

不使用Kerberos with HDFS时，Presto会使用Presto进程的操作系统用户来访问HDFS。例如，如果Presto作为`nobody`运行，它将作为`nobody`访问HDFS。可以通过在Presto [JVM Config](/html/installation/deployment.html#presto-jvm-config)中设置系统属性`HADOOP_USER_NAME`来覆盖此用户名，将`hdfs_user`替换为适当的用户名：

```
-DHADOOP_USER_NAME=文件系统用户名
```

`hive`用户通常起作用，因为Hive通常从`hive`用户启动，并且该用户可以访问Hive仓库。

每当修改Presto访问HDFS的用户时，需要删除HDFS上的`/tmp/presto-*`，因为新用户可能无法访问已有的临时目录。

###访问Kerberos认证保护的Hadoop集群

HDFS支持Kerberos认证，Hive元数据库支持Kerberos认证。但是，目前还不支持通过票据缓存进行Kerberos身份验证。

适用于Carbondata连接器安全的属性在【Carbondata配置属性】（#carbondata-configuration-properties）表中列出。有关安全选项的更多详细讨论，请参阅【Hive安全配置】（html/connector/hive-security.html）部分。

## <a name="carbondata-configuration-properties">Carbondata配置数据的属性配置属性配置</a>

|属性名称|说明|默认|
| ----------------------------------------- | :----------------------------------------------------------- | ----------------------------------------------- |
| Carbondata.store-location |碳数据仓库的存储位置。如果不指定，则使用默认的hive仓库路径，即*/user/hive/warehouse/**carbon.store*** | `${hive.metastore.warehouse.dir} /carbon.store` |
| `hive.metastore` |要使用的Hive元数据库的类型。Presto目前支持默认的Hive Thrift元数据库(`thrift`) | `thrift` |
| `hive.config.resources` |以逗号分隔的HDFS配置文件列表。这些文件必须存在于运行Presto的机器上。例如：`/etc/hdfs-site.xml` | | ，其中
| `hive.hdfs.authentication.type` | HDFS的认证类型，根据实际情况选择。可能的取值为`NONE`或`KERBEROS`。"无"
| `hive.hdfs.impersonation.enabled` |开启HDFS端用户模拟功能。假的假的
| `hive.hdfs.presto.principal` | Presto在连接HDFS时将使用的Kerberos主体。| |
| `hive.hdfs.presto.keytab` | HDFS客户端keytab文件所在的位置。| |
| `hive.collect-column-statistics-on-write` |开启写时自动统计列级数据的功能。详细内容请参见【表统计信息】（/html/connector/hive.html#table-statistics）。是真的

## <a name="hive-thrift-metastore-configuration-properties">Hive持久化元数据配置属性</a>

|属性名称|描述|
| ------------------------------------ | ------------------------------------------------------------ |
| `hive.metastore.uri` |使用Thrift协议连接Hive元数据库的URI(s)。如果提供了多个URI，则默认使用第一个URI，其余URI为回退元数据库。该属性不能为空。例如：`thrift://192.0.2.3:9083`或者`thrift://192.0.2.3:9083,thrift://192.0.2.4:9083` | ，表示从指定时间开始循环使用。
| `hive.metastore.username` | Presto访问Hive元数据库使用的用户名。|
| `hive.metastore.authentication.type` | Hive元数据库认证类型，包括：取值包括`NONE`和`KERBEROS`（默认为`NONE`） |
| `hive.metastore.service.principal` | Hive元数据库服务的Kerberos主体名称。|
| `hive.metastore.client.principal` | Presto在连接Hive元数据库服务时将使用的Kerberos主体。|
| `hive.metastore.client.keytab` | Hive元数据库客户端keytab位置。|

##表统计

Carbondata连接器在写数据时，总是收集基本的统计数据（`numFiles`, `numRows`, `rawDataSize`, `totalSize`），默认还会收集列级的统计信息：

|列类型| Null-Count |差异值个数|最小值/最大值|
| ---------------- | ---------- | --------------------- | ------- |
| 'SMALLINT '完成|是|是|是|是|
完成了，是的，是的
|完美无缺的完成| Y | Y | Y |
|完成了|是|是|是|
|实实在在的完成|是|是|是|
做了|是|是|是|是
|‘日期’‘完成’|‘是’|‘是’|‘是’
|时光流逝| Y | Y | N |
| 'VARCHAR' '完成|是|是| N |
| `CHAR`完成|Y|Y|N|
变数完成|Y|N|N|
波伦亚人成功了是

##示例

Carbondata连接器支持查询和操作Carbondata表和模式（数据库），大部分操作可以使用Presto，部分不常用操作需要使用Spark::Carbondata直接操作。

###创建表

创建新表`orders`：

sql语句
CREATE TABLE订单(
orderkeybigint，
订单状态varchar，
总价翻倍，
订单日期变量
)；
```

 

支持的属性

|属性|说明|默认|
| -------- | ------------------------------------------------------------ | -------- |
| location |指定目录存放表数据。<br />如果不存在，将使用默认的文件系统位置。|可选|

在指定位置创建新表`orders`：

sql语句
CREATE TABLE订单带有存储位置(
订单键大
订单状态变量，
价格双倍
订单日期变量
)
WITH（location='/store/路径'）；
```

**说明**：

- *如果路径不是完全限定域名，将存储在默认文件系统中*



###以select方式创建表

基于SELECT语句的输出创建新表

sql语句
CREATE TABLE的已交付订单数
AS SELECT *选自订单WHERE orderstatus = '已送达'；
```

sql语句
CREATE TABLE备份命令
WITH（位置='/备份/存储/路径'）
AS SELECT *从订单中选取带有存储位置的订单；
```

###插入

向`orders`表中加载额外的行：

sql语句
插入订单
VALUES（BIGINT '101'， '就绪'， 1000.25, '2020-06-08'）；
```

通过覆盖现有行将其他行加载到`orders`表中：

sql语句
插入覆盖订单
VALUES（BIGINT '101'， '已送达'， 1040.25, '2020-06-26'）；
```

使用来自另一个表的值将其他行加载到`orders`表中；

sql语句
插入订单
SELECT * FROM交付订单；
```

###更新

更新表``orders`的所有行：

sql语句
更新订单SET orderstatus = '就绪'；
```

更新`orders`为过滤条件：

sql语句
UPDATE订单SET orderstatus = '已发送'
总价大于1000且总价小于2000；
```

###删除

删除表``orders``：的所有行：

sql语句
从订单中删除；
```

删除带过滤条件的表``orders``：

sql语句
DELETE FROM订单WHERE orderstatus = '订单状态不可用'；
```

###丢弃表

删除一个已存在的表。

sql语句
DROP TABLE订单；
```

## <a name="">Carbondata连接器使用限制</a>

Carbondata连接器暂不支持如下操作：

-不支持建表属性`CREATE TABLE`、排序属性`sort_by`、桶属性`bucketed_by`、分区属性`partitioned_by`。
-不支持物化视图。
-不支持Arrays、Lists、Maps等复杂数据类型。
-不支持alter表使用。
-不支持对分区表的操作。
