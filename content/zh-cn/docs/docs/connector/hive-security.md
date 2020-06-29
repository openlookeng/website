Hive安全配置
===========================

授权
-------------

通过在Hivecatalogproperties文件中设置`hive.security`属性，可以启用[hive](./hive)的授权检查。此属性必须是下列值之一：

|属性值|说明|
| :----------------------- | :----------------------------------------------------------- |
| `legacy`（缺省值） |强制执行的授权检查很少，因此允许大多数操作。配置属性`hive.allow-drop-table`, `hive.allow-rename-table`, `hive.allow-add-column`，来指定允许删除的表名，或允许增加的列名。使用了`hive.allow-drop-column`和`hive.allow-rename-column`两个关键字。|
| `read-only` |允许读数据或元数据的操作，如`SELECT`；但不允许写数据或元数据的操作，如`CREATE`、`INSERT`、`DELETE`。|
| `file` |授权检查使用Hive配置属性`security.config-file`指定的配置文件执行。详细内容请参见【基于文件的授权】(./hive-security.md#hive-file-based-authorization)。|
| `sql-standard` |只要符合SQL标准，只要用户具有权限，就可以执行这些操作。在这种模式下，Presto基于Hive元数据库中定义的权限对查询执行授权检查。如果需要修改这些权限，可以使用[GRANT](../sql/grant)和[REVOKE](../sql/revoke)命令。详细信息请参考【SQL标准授权】(./hive-security.md#hive-sql-standard-based-authorization)。|

###基于SQL标准授权{#hive-sql-standard-based-authorization}

当启用`sql-standard`安全性时，Presto执行与Hive相同的基于SQL标准的授权。

由于Presto\的`ROLE`语法支持与SQL标准匹配，而Hive又不完全遵循SQL标准，因此存在以下限制和差异：

-不支持`CREATE ROLE role WITH ADMIN`子句。
-必须启用`admin`角色才能执行`CREATE ROLE`或`DROP ROLE`。
-不支持'某人授予给用户的巨型角色'。
-不支持'从用户授权角色'。
-新用户会话默认启用除`admin`外的所有角色。
-可通过执行`SET ROLE role`来选择特定的角色。
-“SET ROLE ALL”：启用用户除“admin”以外的所有角色。
-`admin`角色必须通过执行`SET ROLE admin`显式启用。

鉴权
--------------

`/connector/hive`{.interpreted-text role="doc"}的缺省安全配置没有使用
连接Hadoop集群时的认证。所有查询都以运行Presto进程的用户执行，不管哪个用户提交查询。

Hive连接器提供了额外的安全选项来支持配置为使用[Kerberos](./hive-security-kerberos-support)的Hadoop集群。

当访问`HDFS（Hadoop分布式文件系统）`时，Presto可以[impersonate](./hive-security-impersonation#impersonate)执行查询的最终用户。这可以与HDFS权限和`ACL（访问控制列表）`一起使用，为数据提供额外的安全性。

{#hive-security-kerberos-support}
**提示**

当使用Kerberos身份验证Hadoop服务时，应该使用Kerberos来保护对Presto协调器的访问。未能确保与普雷斯托协调员的接触可能导致未经授权接触
Hadoop集群上的敏感数据。

有关建立Kerberos身份验证的信息，请参阅[server](../security/server)和[cli](../security/cli)。

   

Kerberos支持
----------------

为了与使用`kerberos`认证的Hadoop集群使用Hive连接器，您需要将连接器配置为与Hadoop集群上的两个服务一起使用：

- Hive元数据库Thrift服务
——Hadoop分布式文件系统(HDFS)

Hive连接器对这些服务的访问是在属性文件中配置的，该文件包含Hive连接器的一般配置。

**说明**

如果您的`krb5.conf`位置与`/etc/krb5.conf`不同，则必须通过`jvm.config`文件中的`java.security.krb5.conf`JVM属性显式设置。

示例：`-Djava.security.krb5.conf=/example/路径/krb5.conf`，表示安全配置文件。


### Hive Metastore Thrift服务鉴权方式

在Kerberized Hadoop集群中，Presto通过
`SASL（简单身份验证和安全层）`并使用Kerberos进行身份验证。在connector\的properties文件中配置metastore的kerberos认证，使用以下属性：

|属性名称|描述|
| :----------------------------------- | :----------------------------------------------------------- |
| `hive.metastore.authentication.type` | Hive元数据库认证类型，包括： |
| `hive.metastore.service.principal` | Hive元数据库服务的Kerberos主体名称。|
| `hive.metastore.client.principal` | Presto在连接Hive元数据库服务时将使用的Kerberos主体。|
| `hive.metastore.client.keytab` | Hive元数据库客户端keytab位置。|

#### `hive.metastore.authentication.type`

“无”或“柯柏罗斯”中的一个。当使用默认值`NONE`时，Kerberos认证被禁用，无需配置其他属性。

当设置为`KERBEROS`时，Hive连接器将使用SASL连接到Hive元数据库Thrift服务，并使用Kerberos进行身份验证。

此属性是可选的；默认值为`NONE`。

#### `hive.metastore.service.principal.`，即主服务，即主服务，即主服务，即主服务。

Hive元数据库服务的Kerberos主体。Presto协调器将使用它来认证Hive元数据库。

在此属性值中可以使用`_HOST`占位符。Hive连接器在连接Hive元数据库时，会替换连接元数据库服务器的主机名。如果元数据库在多个主机上运行，则这一点非常有用。

例如：`hive/hive-server-host@EXAMPLE.COM`或者`hive/_HOST@EXAMPLE.COM`，这两个参数都表示主机。

此属性是可选的；没有默认值。

#### `hive.metastore.client.principal`

Presto在连接到Hive元数据库时使用的Kerberos主体。

在此属性值中可以使用`_HOST`占位符。连接Hive元数据库时，Hive连接器会替换上正在运行的**worker**节点的hostname。如果每个工作节点都有自己的Kerberos主体，那么这个方法很有用。

例如：presto/presto-server-node@EXAMPLE.COM，或者presto/_HOST@EXAMPLE.COM等，请根据实际情况修改。

此属性是可选的；没有默认值。

**提示**

`hive.metastore.client.principal`指定的主体必须具有足够的权限来删除`hive/warehouse`目录下的文件和目录。如果主体没有，则只有元数据
将会被删除，数据将继续占用磁盘空间。

这是由于Hive元数据库负责删除内部表数据。当元数据库配置为使用Kerberos身份验证时，元数据库执行的所有HDFS操作都会被模拟。删除数据的错误将被静默忽略。


#### `hive.metastore.client.keytab`

keytab文件的路径，该文件包含由`hive.metastore.client.principal`指定的主体的密钥。该文件必须可由运行Presto的操作系统用户读取。

此属性是可选的；没有默认值。

#### `NONE`认证配置示例

"```{.none}"
hive.metastore.authentication.type=用户主密钥认证类型
```

Hive元数据库默认认证类型为`NONE`。当认证类型为`NONE`时，Presto连接不安全的Hive元数据库。未使用Kerberos。

#### `KERBEROS`认证配置示例

"```{.none}"
hive.metastore.authentication.type=虚拟存储库类型
hive.metastore.service.principal=主机名称示例示例
hive.metastore.client.principal=用户名称@扩展名.COM
hive.metastore.client.keytab=用户主密钥文件
```

当Hive元数据库Thrift服务的认证类型为`KERBEROS`时，Presto将作为属性`hive.metastore.client.principal`指定的Kerberos主体连接。Presto将使用`hive.metastore.client.keytab`属性指定的keytab来验证此主体，并将验证元数据库的身份与`hive.metastore.service.principal`是否匹配。

Keytab文件需要分发到集群中每一个运行Presto的节点。

【keytab文件附加信息】（./hive-security.md#keytab文件附加信息）

### HDFS鉴权

在Kerberized Hadoop集群中，Presto使用Kerberos对HDFS进行身份验证。HDFS的Kerberos认证配置在connector的properties文件中，使用如下属性：

|属性名称|描述|
| :---------------------------------- | :----------------------------------------------------------- |
| `hive.hdfs.authentication.type` | HDFS的认证类型，根据实际情况选择。可能的取值为`NONE`或`KERBEROS`。|
| `hive.hdfs.impersonation.enabled` |启用HDFS的终端用户模拟。|
| `hive.hdfs.presto.principal` | Presto在连接HDFS时将使用的Kerberos主体。|
| `hive.hdfs.presto.keytab` | HDFS客户端keytab文件所在的位置。|
| `hive.hdfs.wire-encryption.enabled` |开启HDFS线路加密功能，启用该功能。|

#### `hive.hdfs.authentication.type`

“无”或“柯柏罗斯”中的一个。当使用默认值`NONE`时，Kerberos认证被禁用，无需配置其他属性。

当设置为`KERBEROS`时，Hive连接器将使用Kerberos对HDFS进行身份验证。

此属性是可选的；默认值为`NONE`。

#### `hive.hdfs.impersonation.enabled.使能该文件系统

启用终端用户HDFS模拟。

“终端用户模拟”一节对HDFS模拟进行了深入解释。

此属性是可选的；默认值为`false`。

#### `hive.hdfs.presto.principal.`（硬盘分区文件）`（硬盘分区文件）

Presto在连接到HDFS时将使用的Kerberos主体。

在此属性值中可以使用`_HOST`占位符。连接HDFS时，Hive Connector会替换工作节点Presto所在的hostname。如果每个工作节点都有自己的Kerberos主体，那么这个方法很有用。

示例：`presto-hdfs-superuser/presto-server-node@EXAMPLE.COM`，表示使用文件系统的超级用户。

或`presto-hdfs-superuser/_HOST@EXAMPLE.COM`命令，使文件系统处于超级用户状态。

此属性是可选的；没有默认值。

#### hive.hdfs.presto.keytab（预拷贝的密钥文件）

keytab文件的路径，该文件包含由`hive.hdfs.presto.principal`指定的主体的密钥。该文件必须可由运行Presto的操作系统用户读取。

此属性是可选的；没有默认值。

#### `hive.hdfs.wire-encryption.enabled`

在使用HDFS有线加密的Kerberized Hadoop集群中，应设置为`true`，使Presto能够访问HDFS。注意，使用有线加密可能会影响查询执行性能。

#### `NONE`认证的配置示例{#hive-security-simple}

"```{.none}"
hive.hdfs.authentication.type=硬盘文件系统认证类型=无
```

HDFS默认的认证类型为`NONE`。当认证类型为`NONE`时，Presto通过Hadoop的简单认证机制连接HDFS。未使用Kerberos。

####带`KERBEROS`认证的配置示例{#hive-security-kerberos}

"```{.none}"
hive.hdfs.authentication.type=硬盘文件系统类型
hive.hdfs.presto.principal=硬盘文件系统名称
hive.hdfs.presto.keytab= <文件系统根目录>/etc/presto/hdfs.keytab <文件系统根目录>
```

当认证类型为`KERBEROS`时，Presto作为`hive.hdfs.presto.principal`属性指定的principal访问HDFS。Presto将使用`hive.hdfs.presto.keytab`指定的keytab来认证这个主体。

Keytab文件需要分发到集群中每一个运行Presto的节点。

【keytab文件附加信息】（./hive-security.md#keytab文件附加信息）

模拟终端用户{#hive-security-impersonation}
----------------------

###模拟访问HDFS

Presto可以模拟运行查询的最终用户。在用户从命令行界面运行查询的情况下，最终用户是与PrestoCLI进程或可选的`--user`选项的参数关联的用户名。如果使用了HDFS权限或ACL，模拟最终用户可以在访问HDFS时提供额外的安全性。

HDFS权限和ACL在《HDFS权限指南》中有说明。

#### `NONE`HDFS模拟认证{#hive-security-simple-impersonation}的认证方式

"```{.none}"
hive.hdfs.authentication.type=硬盘文件系统认证类型=无
hive.hdfs.impersonation.enabled=使用镜像功能
```

当使用`NONE`身份验证和模拟时，Presto在访问HDFS时模拟运行查询的用户。用户Presto的运行必须被允许模拟这个用户，如`configuring-hadoop-impersonation`节中所讨论的。未使用Kerberos。

#### KERBEROS`HDFS模拟认证{#hive-security-kerberos-impersonation}，即使用HDFS模拟认证功能。

"```{.none}"
hive.hdfs.authentication.type=硬盘文件系统类型
hive.hdfs.impersonation.enabled=使用镜像功能
hive.hdfs.presto.principal=presto@EXAMPLE.COM
hive.hdfs.presto.keytab= <文件系统根目录>/etc/presto/hdfs.keytab <文件系统根目录>
```

当使用`KERBEROS`身份验证和模拟时，Presto在访问HDFS时模拟运行查询的用户。`hive.hdfs.presto.principal`属性指定的主体必须是
允许模拟此用户，如`configuring-hadoop-impersonation`一节中所讨论的。Presto通过`hive.hdfs.presto.keytab`指定的keytab对`hive.hdfs.presto.principal`进行鉴权，确保用户已经通过验证。

Keytab文件需要分发到集群中每一个运行Presto的节点。

【keytab文件附加信息】（./hive-security.md#keytab文件附加信息）

###模拟访问Hive元数据库

Presto目前不支持在访问Hive元数据库时模拟最终用户。

### Hadoop模拟实现{#configuring-hadoop-impersonation}（在Hadoop环境中实现）

为了使用`NONE` **认证HDFS模拟**或`KERBEROS` **认证HDFS模拟**, Hadoop集群必须配置为允许Presto正在运行的用户或主体模拟登录到Presto的用户。Hadoop中的模拟在`core-site.xml`文件中配置。配置选项的完整描述可以在[Hadoop
文档包]（https://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-common/超级用户.html#配置文档包）下载链接如下：

Keytab文件附加信息{#hive-security-additional-keytab}（keytab文件的附加信息）
-----------------------------------------

Keytab文件包含加密密钥，用于验证Kerberos`KDC（密钥分发中心）`的主体。必须安全地存储这些加密密钥；应采取与保护ssh私钥相同的预防措施来保护它们。

特别是，对keytab文件的访问应该仅限于实际需要使用它们进行身份验证的帐户。在实际操作中，这是Presto进程作为用户运行的。的所有权和权限。
keytab文件应设置，防止其他用户读取或修改。

需要将keytab文件分发到每个运行Presto的节点。在普通部署情况下，Hive Connector在所有节点上的配置是相同的。这意味着keytab需要在
每个节点的位置相同。

分发keytab文件后，需要确保keytab文件在每个节点上都有正确的权限。

基于文件授权{#hive-file-based-authorization}
------------------------

config文件使用JSON指定，由三个部分组成，每个部分是按config文件中指定的顺序匹配的规则列表。授予用户第一个匹配规则的权限。如果不指定，所有正则表达式都默认为`.*`。

###模式规则

这些规则控制着谁被认为是一个模式的所有者。

- `user`（可选）：与用户名匹配的正则表达式。
- `schema`（可选）：正则表达式，用来匹配模式名。
- `owner`（必填）：布尔值，表示所有权。

###表规则

这些规则管理授予特定表的权限。

- `user`（可选）：与用户名匹配的正则表达式。
- `schema`（可选）：正则表达式，用来匹配模式名。
- `table`（可选）：正则表达式，用来匹配表名。
- `privileges`（必需）:`SELECT`、`INSERT`、`零个或零个以上
删除，拥有，选择。

###会话属性规则

这些规则控制谁可以设置会话属性。

- `user`（可选）：与用户名匹配的正则表达式。
- `property`（可选）：根据会话属性名称匹配的正则表达式。
- `allowed`(required):boolean类型，表示是否本次会话。
属性。

见下面的例子。

"``` {.json}"
{
"模式": [
{
"user": "管理员"，
"schema": ".*"，
"owner":true，表示为真实
}，
{
"user": "访客"，
"owner"：假的
}，
{
"schema": "默认模式"，
"owner":true，表示为真实
}
]，
"表格": [
{
"user": "管理员"，
"privileges"：【"选择","插入","删除","拥有"】
}，
{
"user": "禁用用户"，
"privileges": []
}，
{
"schema": "默认模式"，
"table": ".*"，
"privileges": ["SELECT"]
}
]，
"会话属性": [
{
"property": "强制本地调度"，
"allow": "true"：允许通过
}，
{
"user": "管理员"，
"property": "最大分割大小"，
"allow": "true"：允许通过
}
]
}
```
