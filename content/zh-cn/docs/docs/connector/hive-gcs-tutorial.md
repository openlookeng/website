Hive连接器GCS教程
===========================

初步步骤
-----------------

###确保访问GCS

访问云存储数据是可能的，这要感谢【Hadoop云存储连接器】（https://cloud.google.com/dataproc/docs/concepts/connectors/cloud-storage）。

如果您的数据是公开的，您不需要做任何事情。但是，在大多数情况下，数据不是公开的，Presto集群需要能够访问这些数据。这通常通过创建具有访问数据权限的服务帐户来实现。
可在GCP的【业务帐号管理】（https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts）页面进行配置。
创建业务帐号后，需要创建业务帐号的密钥，并下载JSON格式的密钥。

### Hive Connector配置信息

另一个要求是您已经在Presto中启用并配置Hive连接器。连接器使用Hive metastore进行数据发现，不限于HDFS上的数据。

**配置Hive连接器**

- Hive元数据库URL：

> -新Hive元数据库在GCP：
>
> >如果您的Presto节点是由GCP发放的，那么您的Hive
> >元数据库也应该在GCP上，以最小化延迟和
> >成本。在上创建新的Hive元数据库的最简单方法
> > GCP是创建一个Cloud DataProc小集群(1 master, 0
> > workers)，可从您的Presto集群访问。跟随
> >该步骤执行完成后，即可对已有的Hive元数据库执行> >操作。
>
> -现有Hive元数据库：
>
> >要在Presto集群中使用现有的Hive元数据库，您需要
> >需要在您的Hive中设置`hive.metastore.uri`属性
> >目录属性文件
> > `thrift://${METASTORE_ADDRESS}:${METASTORE_THRIFT_PORT} <端口号> <端口号> <端口号> <端口号> <端口号> <端口号> <端口号> <端口号> <端口号> <端口号> <端口号> <端口号> <端口号> <端口号> <端口号> <端口号> <端口号>。如果
> >元数据库使用认证，请参考
> > [hive-security](./hive-security).

- GCS接入：

>这里是所有GCS配置属性的示例值，其中
>可以在Hivecatalog属性文件中设置：
>
> ```{.properties} <属性名称>
> #访问Google云存储的json密钥文件
> hive.gcs.json-key-file-path= <证书存放路径>/to/gcs_keyfile.json <证书存放路径>
>
> #使用客户端提供的OAuth token访问Google云存储
> hive.gcs.use-access-token=使用gcs访问令牌
> ```

### Hive Metastore的配置信息

如果您的Hive元存储使用StorageBasedAuthorization，那么还需要访问GCS来执行POSIX权限检查。为Hive配置GCS访问超出了本教程的范围，但是有一些
优秀指南在线链接：

-【谷歌：安装云存储连接器】(https://cloud.google.com/dataproc/docs/concepts/connectors/install-storage-connector)
-【HortonWorks：与谷歌云存储合作】（https://docs.hortonworks.com/HDPDocuments/HDP3/HDP-3.1.0/bk_cloud-数据访问/内容/gcp-get-started）网页)
-【Cloudera：配置谷歌云存储连接】(https://www.cloudera.com/documentation/enterprise/latest/topics/admin_gcs_config.html)

GCS访问通常在`core-site.xml`中配置，供所有使用ApacheHadoop的组件使用。

Hadoop的GCS连接器提供了一个HadoopFileSystem的实现。遗憾的是，GCS IAM权限没有映射到Hadoop FileSystem所需的POSIX权限，因此GCS连接器呈现的是伪造的POSIX文件权限。

当Hive元数据库访问GCS时，默认情况下，它将看到伪造的POSIX权限等于`0700`。如果Presto和Hive Metastore以不同的用户帐户运行，这将导致Hive Metastore拒绝Presto
数据访问。有两种可能的解决方案：

- Presto service和Hive服务使用同一个用户运行。
-确保HiveGCS配置包含一个属性a`fs.gs.reported.permissions`，值为`777`。

Presto首次访问GCS数据
-----------------------------------------------

###访问Hive元数据库中已映射的数据

如果您从Hive迁移到Presto，则GCS数据可能已经映射到元数据库中的SQL表。在这种情况下，您应该能够查询它。

###访问Hive元数据库中未映射的数据

要访问Hive元数据库中尚未映射的GCS数据，需要提供数据的模式、文件格式和数据位置。例如，如果您在GCS桶中有ORC或Parquet文
`my_bucket`，您将需要执行一个查询：

--选择将定义在其中的模式，必须已经存在
缺省使用hive.default；
    
--创建表
CREATE TABLE订单(
订单键大
顾客至上，
orderstatus varchar(1)，
总价翻倍，
orderdate日期，
orderpriority varchar(15)命令的返回值。
文员varchar(15)，
船舶优先权整数。
注释varchar(79)
)有(
external_location = '我的桶/路径/文件夹'，
format = 'ORC' --或者'PARQUET'，表示按ORC格式显示
)；

现在您应该能够查询新映射的表：

从订单中选择；

使用Presto写GCS数据
--------------------------

###前提条件

在尝试向GCS写入数据之前，请确保已完成从GCS读取数据所需的所有配置。

###创建导出Schema

如果Hive元数据库包含映射到GCS位置的schema，则可以使用这些schema导出数据到GCS。如果您不想使用现有的模式（或者Hive元数据库中没有合适的schema）你
需要创建一个新的：

CREATE SCHEMA hive.gcs_export WITH （location = '输入位置名称'）；

###导出数据到GCS

一旦您拥有了一个指向要导出数据的位置的模式，就可以使用`CREATE TABLE AS`语句发出导出命令，并选择所需的文件格式。数据将被写入一个或
命名空间`gs://my_bucket/some/path/my_table`下的更多文件。

示例：

创建表hive.gcs_export.orders_export的订单列表
WITH（format = 'ORC'）语法检查
从tpch.sf1.orders中选择*；
