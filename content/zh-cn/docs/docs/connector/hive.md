Hive连接器
==============

总体介绍
--------

Hive连接器支持查询存储在Hive数据仓库中的数据。
Hive是三个组件的组合：

-各种格式的数据文件，通常存储在HDFS或Amazon S3中。
-关于数据文件如何映射到模式和表的元数据。该元数据存储在MySQL等数据库中，通过Hive元数据库服务进行访问。
-一种称为HiveQL的查询语言。这种查询语言在分布式计算框架（如MapReduce或Tez）上执行。

Presto只使用前两个组件：数据和元数据。它不使用HiveQL或Hive执行环境的任何部分。

支持的文件类型
--------------------

Hive Connector支持以下文件类型：

- ORC
-实木复合地板
-阿夫罗
- RC文件
-序列文件
- json格式
-文本

使用Hive 3.x版本时，为了支持Avro表格和CSV文件，需要在Hive元数据库配置文件`hive-site.xml`中添加如下属性定义：

```` {.xml}配置文件
<属性>
<!-- https://community.hortonworks.com/content/supportkb/247055/错误javalangunsupported操作异常操作-存储.html -->
<name>元数据库.storage.schema.reader.impl </name> </name> </name> </idp:styler/> </idp:styler/> </name> </idp:styler/> </id:styler/> </name> </name> </name> </name> </name> </name> <服务器名称> </id>的存储服务名称必须具有一些属性。
<value>org.apache.hadoop.hive.metastore.SerDeStorageSchemaReader（服务端存储模式读取器）</value>，在元数据中读取数据的方式。
</属性>
```

配置说明
-------------

Hive连接器支持Apache Hadoop 2.x及其衍生发行版，包括Cloudera CDH 5和Hortonworks Data Platform (HDP)。

创建`etc/catalog/hive.properties`文件，内容如下，将`hive-hadoop2`连接器挂载为`hive`目录。将`example.net:9083`替换为您的Hive元数据库Thrift服务的正确主机和端口：

"```{.none}"
连接器.name=hive-hadoop2
hive.metastore.uri=thrift://示例.net:9083，其中：
```

###多Hive集群

可以根据需要创建多个编录，因此，如果您有额外的Hive集群，只需在`etc/catalog`中添加另一个不同名称的属性文件（确保它以`.properties`结尾）。
如果您将属性文件命名为`sales.properties`,Presto将使用配置的连接器创建名为`sales`的catalog。

### HDFS配置

对于基本设置，Presto自动配置HDFS客户端，不需要任何配置文件。在某些情况下，例如在使用联邦HDFS或NameNode高可用性时，需要指定额外的HDFS客户端选项来访问您的HDFS集群。为此，请添加`hive.config.resources`属性来引用您的HDFS配置文件：

"```{.none}"
hive.config.resources= <配置文件名称>/etc/hadoop/conf/core-site.xml, <配置文件名称>/etc/hadoop/conf/hdfs-site.xml，配置文件名称如下：
```

如果安装需要，只指定附加的配置文件。我们还建议减少配置文件，使其具有所需的最小属性集，因为附加属性可能导致问题。

所有Presto节点必须存在配置文件。如果您正在引用现有的Hadoop配置文件，请确保将它们复制到任何没有运行Hadoop的Presto节点。

### HDFS用户名和权限

在Presto中，对Hive表执行`CREATE TABLE`或`CREATE TABLE AS`语句前，需要确保Presto访问HDFS的用户能够访问Hive的仓库目录。蜂巢
仓库目录由`hive-site.xml`中的配置变量`hive.metastore.warehouse.dir`指定，默认值为`/user/hive/warehouse`。

不使用Kerberos with HDFS时，Presto会使用Presto进程的操作系统用户来访问HDFS。例如，如果Presto作为`nobody`运行，它将作为`nobody`访问HDFS。您可以通过以下方式覆盖此用户名
在Presto `presto_jvm_config`{.interpreted-text role="ref"}中设置系统属性`HADOOP_USER_NAME`，将`hdfs_user`替换为合适的用户名：

"```{.none}"
-DHADOOP_USER_NAME=文件系统用户名
```

`hive`用户通常起作用，因为Hive通常从`hive`用户启动，并且该用户可以访问Hive仓库。

每当修改Presto正在访问HDFS的用户时，请移除HDFS上的`/tmp/presto-*`，因为新用户可能没有权限访问已有的临时目录。

###访问Kerberos认证保护的Hadoop集群

HDFS支持Kerberos认证，Hive元数据库支持Kerberos认证。但是，目前还不支持通过票据缓存进行Kerberos身份验证。

应用于Hive连接器安全的属性在【Hive配置属性】（#hive-configuration-properties）表中列出。
请参阅[hive-security](../hive-security)部分，以获得Hive连接器中安全选项的更详细讨论。

Hive配置属性
-----------------------------

|属性名称|说明|默认|
| ----------------------------------------- | ------------------------------------------------------------ | -------- |
| hive.metastore | Hive元数据库类型| `thrift` |
| hive.config.resources | HDFS配置文件的可选列表，以逗号分隔。这些文件必须存在于运行Presto的机器上。仅在访问HDFS绝对必要的情况下指定。例如：`/etc/hdfs-site.xml` | | ，其中
| hive.recursive-directories |允许从表或分区位置的子目录读取数据。如果禁用，子目录将被忽略。这相当于Hive中的`hive.mapred.supports.subdirectories`属性。| |
| `hive.storage-format` |创建新表时默认使用的文件格式。"ORC"
| `hive.compression-codec` |写文件时使用的压缩编解码器。| GZIP（压缩文件）
| `hive.force-local-scheduling` |强制切分到与被切分数据的Hadoop DataNode进程同节点调度。这对于Presto与每个DataNode并置的安装非常有用。假的假的
| `hive.respect-table-format` |新的分区应该使用现有的表格式还是默认的Presto格式？是真的
| `hive.immutable-partitions` |新的分区数据是否可以插入到已有的分区中？假的假的
| `hive.create-empty-bucket-files` |对于没有数据的桶是否应该创建空文件？假的假的
| `hive.max-partitions-per-writers|每个写进程最大分区数。| 100 |
| `hive.max-partitions-per-scan` |单表扫描的最大分区数。| 100,000 |
| `hive.hdfs.authentication.type` | HDFS的认证类型，根据实际情况选择。可能的取值为`NONE`或`KERBEROS`。"无"
| `hive.hdfs.impersonation.enabled` |开启HDFS端用户模拟功能。假的假的
| `hive.hdfs.presto.principal` | Presto在连接HDFS时将使用的Kerberos主体。| |
| `hive.hdfs.presto.keytab` | HDFS客户端keytab文件所在的位置。| |
| `hive.security` |请参考【Hive安全配置】(./hive-security.md) | |
| `security.config-file` |当`hive.security=file`时，使用的配置文件的路径。详细内容请参见【基于文件的授权】(./hive-security.md#hive-file-based-authorization)。| |
| `hive.non-managed-table-writes-enabled |开启对非托管（外部）Hive表的写操作。假的假的
| `hive.non-managed-table-creates-enabled|启用创建非托管（外部）Hive表的功能。是真的
| `hive.collect-column-statistics-on-write` |开启写时自动统计列级数据的功能。详细内容请参见【表统计信息】（./hive.md#table-statistics）。是真的
| `hive.s3select-pushdown.enabled` |开启查询下推到AWS S3 Select服务的功能。假的假的
| `hive.s3select-pushdown.max-connections` | S3选择下推时同时打开的最大连接数(./hive.md#s3selectpushdown). | 500 |
| `hive.orc.use-column-names` |为了支持alter table的drop列，建议在hive属性中增加`hive.orc.use-column-names=true`，否则drop列可能无法正常工作。|假|




Hive Thrift Metastore配置属性说明
----------------------------------------------

|属性名称|描述|
| :----------------------------------------- | :----------------------------------------------------------- |
| `hive.metastore.uri` |使用Thrift协议连接Hive元数据库的URI(s)。如果提供了多个URI，则默认使用第一个URI，其余URI为回退元数据库。该属性不能为空。例如：`thrift://192.0.2.3:9083`或者`thrift://192.0.2.3:9083,thrift://192.0.2.4:9083` | ，表示从指定时间开始循环使用。
| `hive.metastore.username` | Presto访问Hive元数据库使用的用户名。|
| `hive.metastore.authentication.type` | Hive元数据库认证类型，包括：取值包括`NONE`和`KERBEROS`（默认为`NONE`） |
| `hive.metastore.thrift.client.ssl.enabled` |连接元数据库时请使用SSL安全协议。默认值为`false`当为true时，keystore和truststore二选一即可。keystore/truststore的路径和密码需要在`jvm.config`中配置。密钥库类型如下：`-Djavax.net.ssl.keystoreType=例如：jks```-Djavax.net.ssl.keyStore=``-Djavax.ssl.keyStorePassword=`-Djava（密钥库） x.net.ssl.trustStore=``-Djavax.net.ssl.trustStore用户密码=` |（使用安全证书的客户端）
| `hive.metastore.service.principal` | Hive元数据库服务的Kerberos主体名称。|
| `hive.metastore.client.principal` | Presto在连接Hive元数据库服务时将使用的Kerberos主体。|
| `hive.metastore.client.keytab` | Hive元数据库客户端keytab位置。|



AWS Glue Catalog配置属性
-----------------------------------------

|属性名称|描述|
| :------------------------------------------------- | :----------------------------------------------------------- |
| `hive.metastore.glue.region` |胶水目录所在的AWS区域。当不在EC2中运行时，或者当编录位于不同区域时，这都是必需的。示例：`us-east-1` |示例：
| `hive.metastore.glue.pin-client-to-current-region` | Pin Glue请求与Presto运行的EC2实例在同一个区域（默认为`false`） |
| `hive.metastore.glue.max-connections` |连接到Glue的最大并发连接数（默认为`5`） |
| `hive.metastore.glue.default-warehouse-dir` | Hive Glue元数据库默认仓库目录|
| `hive.metastore.glue.aws-access-key` |用来连接Glue目录的AWS访问密钥。如果和`hive.metastore.glue.aws-secret-key`同时指定，则该参数的优先级高于`hive.metastore.glue.iam-role`。|
| `hive.metastore.glue.aws-secret-key` |连接Glue目录所使用的AWS密钥。如果和`hive.metastore.glue.aws-access-key`同时指定，则该参数的优先级高于`hive.metastore.glue.iam-role`。|
| `hive.metastore.glue.iam-role` |连接Glue Catalog时，IAM角色的ARN信息。|

Amazon S3配置介绍
-----------------------

Hive Connector支持读写存储在S3中的表。这可以通过使用S3前缀而不是HDFS前缀的表或数据库位置来实现。

Presto对URI前缀`s3://`、`s3n://`和`s3a://`使用自己的S3文件系统。

### S3配置属性

  

|属性名称|描述|
| :-------------------------------------- | :----------------------------------------------------------- |
| `hive.s3.use-instance-credentials` |使用EC2元数据服务检索API凭证（默认为`true`），与EC2中的IAM角色配合使用。|
| `hive.s3.aws-access-key` |使用默认的AWS访问密钥。|
| `hive.s3.aws-secret-key` |使用默认的AWS密钥。|
| `hive.s3.iam-role` |需要承担的IAM角色。|
| `hive.s3.endpoint` | S3存储端点服务器。可用于对接兼容S3的存储系统，而不是AWS。当使用v4签名时，建议将其设置为AWS区域特定的端点（例如，`http[s]://.s3-.amazonaws.com`）。|
| `hive.s3.signer-type` |请指定与S3兼容的存储不同的Signer类型。示例：v2版本签署者类型：`S3SignerType` |
| `hive.s3.path-style-access` |对兼容S3的存储的所有请求都使用路径式访问。这是针对不支持虚拟主机式访问的S3兼容存储而言的。（默认为false）
| `hive.s3.staging-directory` |写入S3数据的本地staging目录。缺省为JVM系统属性`java.io.tmpdir`指定的Java临时目录。|
| `hive.s3.pin-client-to-current-region` | Pin S3请求与Presto运行的EC2实例在同一个region下（默认为`false`）|
| `hive.s3.ssl.enabled` |与S3 API之间使用HTTPS进行通信（默认为`true`） |
| `hive.s3.sse.enabled` |使用S3服务端加密（默认为`false`） |
| `hive.s3.sse.type` | S3服务端加密的密钥管理类型。对于S3托管的密钥，使用`S3`；对于KMS托管的密钥，使用`KMS`（默认为`S3`）。|
| `hive.s3.sse.kms-key-id` |使用KMS托管的密钥进行S3服务端加密的密钥ID。如果不设置，则使用默认密钥。|
| `hive.s3.kms-key-id` |如果设置了，请使用S3客户端加密，并使用AWS KMS存储加密密钥，并在新创建的对象中使用该属性的值作为KMS Key ID。|
| `hive.s3.encryption-aters-provider` |如果设置，请使用S3客户端加密，并使用此属性的值作为实现AWS SDK`EncryptionMaterials的Java类的完全限定名。提供方接口。如果类还从HadoopAPI实现了`Configurable`，那么在创建对象之后就会传入Hadoop配置。|
| `hive.s3.upload-acl-type` |向S3上传文件时要使用的Canned ACL（默认为`Private`） |
| `hive.s3.skip-glacier-objects' |忽略冰川对象，而不是查询失败。这将跳过可能属于表或分区的数据。默认为`false`。|



### S3凭证

如果您正在使用EMR或其他设施在Amazon EC2上运行Presto，强烈建议将`hive.s3.use-instance-credentials`设置为`true`，并对EC2使用IAM Roles来控制对S3的访问。如果是这种情况，则需要为EC2实例分配一个IAM角色，以授予对存储在您希望使用的S3桶中的数据的适当访问权限。也可以使用`hive.s3.iam-role`来配置IAM角色，访问任何S3桶都假定具有该角色。
这比在`hive.s3.aws-access-key`和`hive.s3.aws-secret-key`设置中设置AWS访问和密钥要干净得多。也允许EC2自动轮换凭证定期的基础上，没有任何额外的工作，您的部分。

###自定义S3凭据提供程序

您可以通过将Hadoop配置属性`presto.s3.credentials-provider`设置为自定义AWS凭据提供程序的完全限定类名，来配置自定义S3凭据提供程序
实现。该类必须实现一个[AWSCredentialsProvider](http://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/auth/AWSCredentialsProvider.html)这个类，并且这个类必须被引用到该对象中。
接口，提供了一个以`java.net.URI`和Hadoop `org.apache.hadoop.conf.Configuration`为参数的双参数构造函数。自定义凭据提供程序可用于从STS（使用`STSSessionCredentialsProvider`）、IAM基于角色的凭据（使用`STSAssumeRoleSessionCredentialsProvider`）或特定用例（ e.g.,bucket/userspecificcredentials），此Hadoop配置属性必须在`hive.config.resources`Hive连接器属性引用的Hadoop配置文件中设置。

###调整属性

当PrestoS3文件系统与S3通信时，以下调优属性会影响客户端的行为。这些参数中的大多数影响`ClientConfiguration`对象的设置
与`AmazonS3Client`相关。

|属性名称|说明|默认|
| :-------------------------------- | :----------------------------------------------------------- | :----------- |
| `hive.s3.max-error-retries` |在S3客户端设置的最大错误重试次数。| `10` |
| `hive.s3.max-client-retries` |重试读操作的最大次数。| `5` |
| `hive.s3.max-backoff-time` |与S3通信时，使用指数退避，从1秒开始，最大退避到该值。10分钟
| `hive.s3.max-retry-time` |尝试与S3通信的最大时间。10分钟
| `hive.s3.connect-timeout` | TCP连接超时时间，单位毫秒。五秒
| `hive.s3.socket-timeout` | TCP套接字读超时错误。五秒
| `hive.s3.max-connections` |同时打开到S3的最大连接数。| `500` |
| `hive.s3.multipart.min-file-size` |使用S3分段上传任务的最小文件大小。| `16MB` |
| `hive.s3.multipart.min-part-size` |多段上传的最小段大小。| `5MB` |

### S3数据加密

Presto支持在S3中通过使用S3托管密钥的服务器端加密读取和写入加密数据，以及通过使用Amazon KMS或管理AES加密密钥的软件插件的客户端加密读取和写入加密数据。

使用【S3服务器端加密】(http://docs.aws.amazon.com/AmazonS3/latest/dev/serv-side-encryption.html),（在Amazon的文档中称为*SSE-S3*）S3基础设施
负责所有加密和解密工作（客户端SSL除外，假设您已经将`hive.s3.ssl.enabled`设置为`true`） S3还为您管理所有的加密密钥。使能
此时，需要将`hive.s3.sse.enabled`设置为`true`。

使用【S3客户端加密】(http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingClientSideEncryption.html),S3存储加密数据，加密密钥在
S3基础设施。数据加解密由Presto完成，不在S3基础设施中。在这种情况下，可以通过使用AWS KMS或您自己的密钥管理系统来管理加密密钥。
如果需要使用AWS KMS进行密钥管理，请将`hive.s3.kms-key-id`设置为KMS密钥的UUID。您还需要授予AWS凭据或EC2 IAM角色使用给定密钥的权限。

若要使用自定义的加密密钥管理系统，请将`hive.s3.encryption-aters-provider`设置为实现[EncryptionMaterialsProvider](http://docs.aws.amazon)的类的完全限定名。可以从AWS Java SDK调用com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/s3/model/EncryptionMaterialsProvider.html)接口，获取加密对象列表，然后调用加密对象列表。此类必须通过类路径对Hive连接器进行访问，并且必须能够与您的自定义密钥管理系统进行通信。如果这个类还实现了来自Hadoop Java API的`org.apache.hadoop.conf.Configurable`接口，那么Hadoop配置将在创建对象实例之后，请求提供或
检索任何加密密钥。

### S3选择下推{#s3selectpushdown}

S3 Select Pushdown实现下推投影（SELECT）和谓词（WHERE）处理到[S3
选择](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectSELECTContent.html)，通过S3 Select Pushdown,Presto只从S3中检索需要的数据，而不是整个S3对象。降低时延，降低网络利用率。

#### S3是否适合我的工作量？

S3 Select Pushdown的性能取决于查询过滤的数据量。筛选大量行应能获得更好的性能。如果查询没有过滤任何数据，则下推可能不会增加任何附加值，并且用户将因S3选择请求而付费。因此，我们建议您使用S3和不使用S3来对工作负载进行基准测试。选择以查看使用S3是否适合您的工作负载。默认情况下，S3SelectPushdown是禁用的，在适当的基准测试和成本分析之后，应该在生产中启用它。有关S3选择请求成本的更多信息，请参阅【亚马逊S3云存储定价】（https://aws.amazon.com/s3/pricing/）。

使用以下准则来确定S3选择是否适合您的工作负载：

-您的查询过滤掉了超过一半的原始数据集。
+您的查询筛选谓词使用Presto和S3Select支持的数据类型的列。S3 Select Pushdown不支持TIMESTAMP、REAL和DOUBLE三种数据类型。我们建议使用十进制数据类型来表示数值数据。有关S3 Select所支持的数据类型的详细信息，请参阅【数据类型文档】（https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-glacier-select-sql-reference-data-types .html）的链接。
-Amazon S3与Amazon EMR集群之间的网络连接具有良好的传输速度和可用带宽。Amazon S3 Select不压缩HTTP响应，因此对于压缩的输入文件，响应大小可能会增加。

####考虑和限制

-仅支持CSV格式存储的对象。对象可以是未压缩的，也可以是用gzip或bzip2压缩的。
-不支持属性\"AllowQuotedRecordDelimiters\"。如果指定了此属性，则查询失败。
-不支持Amazon S3服务端加密（使用客户提供的加密密钥）和客户端加密。
-S3选择下推不能替代使用列式或压缩文件格式，如ORC和Parquet。

####开启S3 Select下推

可以使用`s3_select_pushdown_enabled`Hive会话属性或`hive.s3select-pushdown.enabled`配置属性启用S3选择下推。session属性将重写config属性，允许您在每个查询基础上启用或禁用。

####了解和调优最大连接数

Presto可以使用其原生的S3文件系统或EMRFS。使用本机FS时，最大连接数通过`hive.s3.max-connections`配置属性配置。使用EMRFS时，
最大连接是通过`fs.s3.maxConnections`Hadoop配置属性配置的。

S3 Select Pushdown在访问Amazon S3进行谓词操作时绕过文件系统。此时，`hive.s3select-pushdown.max-connections`决定了worker节点允许这些操作的最大客户端连接数。

如果您的工作负载遇到错误*Timeoutwaitingfrompool*，请增加`hive.s3select-pushdown.max-connections`值以及您正在使用的文件系统的最大连接配置。

Google云存储配置
----------------------------------

Hive Connector可以通过`gs://`URI前缀访问存储在GCS中的数据。请参考`hive-gcs-tutorial`{.interpreted-text role="doc"}中的分步说明。

### GCS配置属性

### GCS配置属性

 

|属性名称|描述|
| :---------------------------- | :----------------------------------------------------------- |
| `hive.gcs.json-key-file-path` |与Google云存储进行身份认证的json密钥文件。|
| `hive.gcs.use-access-token` |使用客户端提供的OAuth令牌访问谷歌云存储。这与全局JSON密钥文件互斥。|

ORC缓存配置
-----------------------

Hive Connector缓存ORC文件数据，提供更好的性能。数据缓存在worker本地内存中。只支持缓存分区表。`cache sql`可用于自定义Connector应缓存的表和分区。

### ORC缓存属性

 

|属性名称|说明|默认|
| :----------------------------------------- | :--------------------------------------------------- | :-------- |
| `hive.orc.file-tail.cache.enabled` |开启ORC文件尾部缓存功能| `false` |
| `hive.orc.file-tail.cache.ttl` | ORC文件尾部缓存的TTL值| `30mins` |
| `hive.orc.file-tail.cache.limit` | ORC文件尾缓存最大条目数| `10000` |
| `hive.orc.stripe-footer.cache.enabled` |开启ORC条带页脚缓存功能| `false` |
| `hive.orc.stripe-footer.cache.ttl` | ORC分条尾部缓存的TTL值| `30分钟
| `hive.orc.stripe-footer.cache.limit` |条带页脚缓存的最大条目数| `25000` |
| `hive.orc.row-index.cache.enabled` |开启ORC行索引缓存功能| `false` |
| `hive.orc.row-index.cache.ttl` |行索引缓存的TTL值| `30分钟
| `hive.orc.row-index.cache.limit` | ORC行索引缓存中的最大条目数| `50000` |
| `hive.orc.bloom-filters.cache.enabled` |启用ORCbloom过滤器缓存功能| `false` |
| `hive.orc.bloom-filters.cache.ttl` | ORC bloom过滤器缓存的存活时间| `30分钟
| `hive.orc.bloom-filters.cache.limit` | ORC Bloom过滤器缓存中的最大条目数| `50000` |
| `hive.orc.row-data.block.cache.enabled` |开启ORC行组块缓存功能| `false` |
| `hive.orc.row-data.block.cache.ttl` | ORC行组缓存的存活时间| `30mins` |
| `hive.orc.row-data.block.cache.max.weight` | ORC行组缓存最大权重值| `500MB` |

表统计
----------------

Hive连接器在写数据时，总是收集基本的统计数据（`numFiles`,`numRows`,`rawDataSize`,`totalSize`），默认还会收集列级别的统计数据：

 

|列类型|可统计|
| :---------- | :--------------------------------------------------------- |
| `TINYINT` |空值个数，非重复值个数，最小值/最大值|
| `SMALLINT` |空值个数，非重复值个数，最小值/最大值|
| `INTEGER` |空值个数，非重复值个数，最小值/最大值|
| `BIGINT` |空值个数，非重复值个数，最小值/最大值|
| `DOUBLE` |空值个数，非重复值个数，最小值/最大值|
| `REAL` |空值个数，非重复值个数，最小值/最大值|
| `DECIMAL` |空值个数，非重复值个数，最小值/最大值|
| `DATE` |空值个数，非重复值个数，最小值/最大值|
| `TIMESTAMP` |空值个数，非重复值个数，最小值/最大值|
| `VARCHAR` |空值个数，非重复值个数|
| `CHAR` |空值个数，非重复值个数|
| `VARBINARY` |空值个数|
| `BOOLEAN` |空值个数，真假值个数|

###更新表和分区统计信息{#hive_analyze}

如果您的查询很复杂，包括联接大型数据集，那么在表/分区上运行`/sql/analyze`{.interpreted-text role="doc"}可能会通过收集
数据。

在分析分区表时，可以通过可选的`partitions`属性指定要分析的分区，该属性是一个数组，包含分区键的值，其顺序与在表模式中声明它们的顺序一致：

ANALYZE表名WITH(
分区数= ARRAY[
ARRAY【'p1_value1'， 'p1_value2'】，
ARRAY【'p2_value1'， 'p2_value2'】])

此查询将收集两个分区的统计信息，它们的键分别为`p1_value1, p1_value2`和`p2_value1, p2_value2`。

Schema演进
----------------

Hive允许一个表中的分区与表具有不同的模式。这种情况发生在分区已经存在（使用原来的列类型）之后更改表的列类型。Hive连接器允许与Hive相同的转换：

- `varchar`到`tinyint`、`smallint`、`integer`和`bigint`的转换关系
-实转双
-扩大整型数的转换范围，如`tinyint`到`smallint`

任何转换失败都会导致null，这与Hive的行为相同。例如，将字符串“'foo'`”转换为数字，或将字符串“'1234'`”转换为“'tinyint'”（其中“'tin”具有最大值）
（第127号）。

Avro架构演进
---------------------

Presto支持Avro存储格式的Hive表的查询和操作，Avro存储格式是基于Avro schema file/textal设置。也可以在Presto中创建表，从本地或远程的HDFS/Web服务器中的有效Avro模式文件中推断模式。

要指定Avro模式应该用于解释表的数据，必须使用`avro_schema_url`表属性。模式可以远程放置在HDFS中（例如： `avro_schema_url = 'hdfs://user/avro/schema/avro_data.avsc'`）, S3（例如，将文件系统中的。`avro_schema_url = 's3n:///schema_bucket/schema/avro_data.avsc'`），网络服务器，例如，。
`avro_schema_url = 'http://example.org/schema/avro_data.avsc'`) ，并且支持本地文件系统功能，用户不能修改。该schema所在的url，必须可以从Hive元数据库和Presto协调器/worker节点访问。

Presto中通过`avro_schema_url`创建的表，其行为与Hive中`avro.schema.url`或`avro.schema.textal`设置的表相同。

示例：

创建表hive.avro.avro_data(
比格因
)
有(
format = '反病毒'，
avro_schema_url = '用户主目录/usr/local/avro_data.avsc'
)

如果声明了`avro_schema_url`,DDL中列出的列（上面示例中的`id`）将被忽略。表模式将与Avro模式文件中的模式匹配。在进行任何读操作之前，Avro
模式被访问，因此查询结果反映模式中的任何更改。因此， Presto利用了Avro的向后兼容性能力。

如果Avro schema文件中的表的模式发生变化，仍然可以使用新模式读取旧数据。Avro schema文件中新增/重命名的*must*字段必须有默认值。

Schema的演进行为如下：

-新模式中添加的列：当表使用新模式时，使用旧模式创建的数据将产生一个*default*值。
-新模式中删除的列：使用旧模式创建的数据将不再输出被删除列的数据。
-列在新模式中被重命名：这等效于删除列并添加新列，以及使用旧模式创建的数据
当表使用新模式时，模式将产生一个*default*值。
-改变新模式中列的类型：如果类型强制被Avro或Hive连接器支持，则发生转换。对于不兼容的类型将引发错误。

###使用限制

当设置了`avro_schema_url`时，不支持如下操作：

-不支持创建表AS。
-使用分区（`partitioned_by`）或分桶(`bucketed_by`)
`CREATE TABLE`不支持列。
-不支持`ALTER TABLE`命令修改列。

操作步骤
----------

- `system.create_empty_partition（模式名，表名，分区列，分区值）`

>在指定的表中创建一个空分区。

- `system.sync_partition_metadata（模式名，表名，模式）`

>检查并更新元数据库中的分区列表。有三种模式：
>
>- `ADD` ：添加文件系统中不存在的分区。
> - `DROP`：删除元数据库中存在但文件系统上不存在的任何分区。
> - `FULL`：同时执行`ADD`和`DROP`操作。

示例
--------

Hive Connector支持Hive表和模式（数据库）的查询和操作，虽然有些不常用操作需要使用Hive直接操作，但是大部分操作都可以使用Presto。

创建一个名为`web`的新Hive模式，它将在名为`my-bucket`的S3bucket中存储表：

创建SCHEMA配置单元
WITH（位置='s3://my-bucket/'）

在`web`模式中新建一个名为`page_views`的Hive表，以ORC文件格式存储，按日期和国家分区，按用户分桶，分桶为`50`个桶(注意Hive要求
个分区列作为表的最后一列。

从`page_views`表中删除一个分区：

从hive.web.page_views中删除
WHERE ds = DATE '2016年8月9日'
and国家= '美国'

给`page_views`表添加空分区：

呼叫系统.create_empty_partition(
schema_name => 'web'，
table_name => '页面视图'，
partition_columns =>分区表【'ds'， 'country'】，
partition_values => ARRAY【'2016-08-09'， '美国'】；

查询表`page_views`，命令如下：

从hive.web.page_views中选取*

列出表`page_views`的分区：

从hive.web中选取* "page_views$分区数"

创建Hive外表`request_logs`，指向S3中已存在的数据：

创建表hive.web.request_logs(
request_time时间戳。
url的varchar字符串，
变量，
user_agent变量名
)
有(
format = '文本格式'，
external_location = 's3://我的桶/数据/日志/'
)

统计`request_logs`表的数据：

分析hive.web.request_logs日志文件；

这里的例子应该适用于谷歌云存储，将`s3://`替换为`gs://`。

###清理

删除外部表`request_logs`。这只会删除表的元数据。引用的数据目录未删除：

删除表hive.web.request_logs日志

删除模式：

删除SCHEMA蜂箱.web




Hive Connector限制说明
--------------------------

[delete](../sql/delete)只支持表为非事务性时`WHERE`子句匹配整个分区的情况。对于事务型表，`WHERE`子句可以是任何条件。

[alter-schema](../sql/alter-schema)使用失败，因为Hive元数据库不支持重命名schema。
