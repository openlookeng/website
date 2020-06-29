数据中心连接器
====================

数据中心连接器允许查询远程Presto数据中心。
这可用于连接来自本地Presto环境的不同Presto集群之间的数据。

配置说明
-------------

配置DC连接器，在`etc/catalog`目录下创建一个名为`dc.properties`的目录properties文件，将DC连接器挂载为`dc`目录。使用以下内容创建文件，并根据您的设置替换连接属性：

"```{.none}"
连接器.name=dc
连接地址=http://example.net:8080
connection-user=根用户
connection-password=连接密码
```

下表列出了数据中心连接器支持的所有属性。

|属性名称|说明|默认|
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|
| `connection-url` |连接链接地址| |
| `connection-user` |用户名| |
| `连接密码` |密码| |
| `dc.accesstoken` |基于令牌的认证访问令牌| |
| `dc.application.name.prefix` |在任何指定的ApplicationName client info属性后添加前缀，用于为Presto查询设置源名称。如果没有设置此属性或ApplicationName，则查询的源将是presto-dc | `presto-dc` |
| `dc.extra.credentials`|连接外部服务的额外凭证。ExtraCredentials是一个键值对列表。示例：foo:bar;abc:xyz将创建证书abc=xyz和foo=bar | |
| `dc.http-client-timeout` |客户端不断重试取数据的时间，默认为10min | `10.00m` |
| `dc.http-compression` |是否使用gzip压缩响应体，默认为true | `false` |
| `dc.http-request-connectTimeout` | http请求连接超时，默认值为1min | `30.00s` |
| `dc.http-request-readTimeout` | http请求读取超时时间，默认值为2min | `30.00s` |
| `dc.httpclient.maximum.idle.connections` | http客户端中允许打开的最大空闲连接个数| `20` |
| `dc.httpproxy` | HTTP代理的主机和端口。示例：localhost:8888 | |，表示本地主机。
| `dc.kerberos.config.path` | kerberos服务的配置文件| |
| `dc.kerberos.credential.cachepath` | kerberos证书缓存服务| |
| `dc.kerberos.keytab.path` | kerberos的密钥表文件| |
| `dc.kerberos.principal' |向Presto协调器验证时使用的主体| |
| `dc.kerberos.remote.service.name` |预置协调器Kerberos服务名。Kerberos认证时需要配置||
| `dc.kerberos.service.principal.pattern' |预协调器Kerberos服务主体模式。默认值为`${SERVICE}@${HOST}.${SERVICE}`替换为KerberosRemoteServiceName的值，`${HOST}`替换为coordinator的主机名（如果启用了标准化，则替换为标准化后的主机名）| `${SERVICE}@${HOST} ' |
| `dc.kerberos.use.canonical.hostname` |使用Kerberos服务主体的Presto协调器的规范主机名，方法是首先将主机名解析为IP地址，然后对该IP地址执行反向DNS查找。假的假的
| `dc.max.anticipated.delay` |集群中两个查询请求之间的最大预期时延。如果远程dc没有收到超过此延迟的请求，则它可能会取消查询。十点零分
| `dc.metadata.cache.enabled` |已启用元数据缓存服务| `true` |
| `dc.metadata.cache.maximum.size` |元数据缓存最大值| `10000` |
| `dc.metadata.cache.ttl` |元数据缓存时间Ttl | `1.00s` |
| `dc.query.pushdown.enabled` |开启子查询下推到本数据中心。如果未设置此属性，默认情况下，子查询将下推| `true` |
| `dc.remote-http-server.max-request-header-size` |该属性应该与远程服务器中的http-server.max-request-header-size的值相等| `4kB` |
| `dc.remote.cluster.id` |远端集群的唯一标识。
| `dc.socksproxy` | SOCKS代理主机和端口。示例：localhost:1080 | |示例：
| `dc.ssl` |使用HTTPS协议连接| `false` |
| `dc.ssl.keystore.password` |密钥库的密码| |
| `dc.ssl.keystore.path` |包含用于身份验证的证书和私钥的Java密钥库文件的位置| |
| `dc.ssl.truststore.password` |信任库的密码| |
| `dc.ssl.truststore.path` |用于验证HTTPS服务器证书的Java TrustStore文件的位置| |

###多个Presto集群

可以根据需要创建多个目录，因此，如果您有其他数据中心，只需在`etc/catalog`中添加另一个属性文件（确保它以`.properties`结尾）。
如果您将属性文件命名为`sales.properties`,Presto将使用配置的连接器创建一个名为`sales`的目录。

查询远端数据中心
---------------------------

DataCenter连接器为远程数据中心中的每个*catalog*提供一个以属性文件名为前缀的目录。将每个带前缀的远程编录视为本地集群中的独立编录。可以使用`SHOW CATALOGS`命令查看可用的远程编录：

展览目录；

如果您在远程数据中心中有一个名为`mysql`的目录，您可以通过`SHOW SCHEMAS`命令查看远程目录中的模式：

展示来自dc.mysql的SCHEMAS；

如果您在远程目录`mysql`中有一个名为`web`的模式，那么您可以通过``SHOW TABLES``命令查看该目录中的表：

显示来自dc.mysql.web的表；

在`web`模式中，您可以看到`clicks`表中列的列表，使用以下方法之一：

找到DESCRIBE dc.mysql.web.
展示来自dc.mysql.web.clicks的列；

最后，您可以访问`web`模式中的`clicks`表：

从dc.mysql.web.

如果您对目录属性文件使用不同的名称，那么在上面的例子中，请使用该目录名称而不是`dc`。

数据中心连接器限制
---------------------------------

数据中心连接器是一个只读连接器。暂不支持以下SQL语句：

[alter-schema](../sql/alter-schema),[alter-table](../sql/alter-table),[analyze](../sql/analyze),[cache-table](../sql/),（...执行脚本的模式名称，可以根据实际情况修改。缓存表）,[comment](../sql/comment),[create-schema](../sql/create-schema),[create-table](../sql/create-table),[create-table-as](../sql/)，创建模式模式模式模式模式模式模式模式模式模式模式模式模式模式模式创建表，创建视图（../sql/create-view），删除，删除，删除缓存（../sql/drop-cache），删除模式（../sql/drop-schema模式），【drop-table(../sql/drop-table)，【drop-view(../sql/drop-view)，【grant(../sql/grant)】，【插入】（../sql/insert），【插入-结束】写入](../sql/insert-overwrite),[revoke](../sql/revoke),[revoke](../sql/revoke),[show-cache](../sql/show-cache),[show-create-view]（执行脚本时显示此信息）执行该脚本的调用方法](../sql/show-create-view)，【显示角色】（../sql/show-grants），【显示角色】（../sql/show-roles），【显示角色】（../sql），显示角色信息/显示角色赠款)，【更新】（../sql/update），【清理】(../sql/vacuum)
