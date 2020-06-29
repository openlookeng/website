Elasticsearch连接器
=======================

【目标】

总体介绍
--------

Elasticsearch Connector允许从Presto访问Elasticsearch数据。本文档主要介绍如何搭建Elasticsearch Connector来对Elasticsearch执行SQL查询。

**说明**
*强烈推荐使用Elasticsearch 6.0.0及以上版本*


配置说明

要配置Elasticsearch连接器，需要创建一个目录属性文件`etc/catalog/elasticsearch.properties`，并替换以下属性：

"```{.none}"
Connector.name=弹性搜索服务
弹性搜索.default-schema-name=default模式名称
弹性搜索.table-description-directory=etc/elasticsearch/ <弹性搜索服务名称> <弹性搜索服务名称>
弹性搜索.scroll-size=1000
弹性搜索.scroll-timeout=1m
弹性搜索请求超时时长=2s
弹性搜索.max-request-retries=5（最大请求数）
弹性搜索.max-request-retry-time=10秒
```

配置属性
------------------------

配置属性包括：

|属性名称|描述|
| :------------------------------------------ | :----------------------------------------------------------- |
| `elasticsearch.default-schema-name` |表的默认模式名。|
| `elasticsearch.table-description-directory` |表描述文件所在的目录，即json文件所在的目录。|
| `elasticsearch.scroll-size` |每次Elasticsearch滚动请求返回的最大命中次数。|
| `elasticsearch.scroll-timeout` |滚动请求保持搜索上下文的超时时间。|
| `elasticsearch.max-hits` | Elasticsearch单个请求最大取回命中次数。|
| `elasticsearch.request-timeout` | Elasticsearch请求超时时间设置。|
| `elasticsearch.max-request-retries` | Elasticsearch请求重试的最大次数。|
| `elasticsearch.max-request-retry-time` |对失败的请求进行重试时，使用指数退避，从1秒开始，最大退避到本配置指定的值。|



### `elasticsearch.default-schema-name`

定义将包含没有限定架构名称的所有表的架构。

此属性是可选的；默认值为`default`。

### `弹性搜索.table-description-directory`弹性搜索。

指定Presto部署目录下的一个路径，该路径包含一个或多个带有表描述（必须以`.json`结尾）的JSON文件。

此属性是可选的；默认值为`etc/elasticsearch`。

###弹性搜索.scroll-size

此属性定义每个Elasticsearch滚动请求中可以返回的最大点击数。

此属性是可选的；默认值为`1000`。

###弹性搜索滚动超时

此属性定义了Elasticsearch将保持[搜索上下文的时间（毫秒）
活动](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html#scroll-sea rch-context)用于滚动请求，该选项设置滚动请求的内容。

此属性是可选的；默认值为`1s`。

### `elasticsearch.max-hits`

此属性定义了Elasticsearch请求可以获取的[hits](https://www.elastic.co/guide/en/elasticsearch/reference/current/search.html)的最大数量。

此属性是可选的；默认值为`1000`。

### `elasticsearch.request-timeout（弹性搜索请求超时）`,（弹性搜索请求超时）

此属性定义所有Elasticsearch请求的超时值。

此属性是可选的；默认值为`100ms`。

### `elasticsearch.max-request-retries`

定义Elasticsearch请求重试的最大次数。

此属性是可选的；默认值为`5`。

### `elasticsearch.max-request-retry-time（弹性搜索服务最大重试次数）

当重试失败的请求的时候，使用指数退避，从1秒开始，最多退避到此配置指定的值。

此属性是可选的；默认值为`10s`。

搜索卫士认证
---------------------------

Elasticsearch连接器提供了额外的安全选项来支持配置为使用SearchGuard的Elasticsearch集群。

证书格式可通过Elasticsearch目录属性文件中的`searchguard.ssl.certificate_format` config属性进行配置。该配置允许的值是：

|属性值|说明|
| :--------------- | :------------------------------------------- |
| `NONE`（默认） |不使用Search Guard认证。|
| `PEM` |使用X.509 PEM证书和PKCS #8密钥。|
| `JKS` |使用Keystore和Truststore文件存储。|

 

如果使用X.509PEM证书和PKCS#8密钥，必须设置以下属性：

 

|属性名称|描述|
| :--------------------------------------- | :---------------------------------------------------------- |
| `searchguard.ssl.pemcert-filepath` | X.509节点证书链所在的路径。|
| `searchguard.ssl.pemkey-filepath` |证书密钥文件路径。|
| `searchguard.ssl.pemkey-password` |密钥对应的密码信息。如果密钥没有密码，则忽略此设置。|
| `searchguard.ssl.pemtrustedcas-filepath` |根证书所在路径（PEM格式） |

 

如果使用Keystore和Truststore文件，需要设置如下属性：

 

|属性名称|描述|
| :------------------------------------ | :--------------------------- |
| `searchguard.ssl.keystore-filepath` |证书库文件路径。|
| `searchguard.ssl.keystore-password` |证书库的密码，请根据实际情况填写。|
| `searchguard.ssl.truststore-filepath` |信任库文件的路径，用户可根据自己的需要自行设置。|
| `searchguard.ssl.truststore-password` |信任库的密码，请根据实际情况填写。|

### `searchguard.ssl.pemcert-filepath（证书所在的文件路径）`

X.509节点证书链的路径。该文件必须可由运行Presto的操作系统用户读取。

此属性是可选的；默认值为`etc/elasticsearch/esnode.pem`。

### `searchguard.ssl.pemkey-filepath文件所在的路径名`

证书密钥文件的路径。该文件必须可由运行Presto的操作系统用户读取。

此属性是可选的；默认值为`etc/elasticsearch/esnode-key.pem`。

### `searchguard.ssl.pemkey-密码安全证书

`searchguard.ssl.pemkey-filepath`指定的密钥文件的密钥密码。

此属性是可选的；默认为空字符串。

### `searchguard.ssl.pemtrustedcas-filepath安全证书库文件路径`

根CA（PEM格式）所在路径，该文件必须是运行Presto的操作系统用户可读的。

此属性是可选的；默认值为`etc/elasticsearch/root-ca.pem`。

### `searchguard.ssl.keystore文件所在的路径`

keystore文件的路径。该文件必须可由运行Presto的操作系统用户读取。

此属性是可选的；默认值为`etc/elasticsearch/keystore.jks`。

### `searchguard.ssl.keystore-密码名称`

`searchguard.ssl.keystore-filepath`指定的密钥库文件的密钥库密码。

此属性是可选的；默认为空字符串。

### `searchguard.ssl.truststore-filepath（证书的存放目录）`

信任库文件的路径。该文件必须可由运行Presto的操作系统用户读取。

此属性是可选的；默认值为`etc/elasticsearch/truststore.jks`。

### `searchguard.ssl.truststore-密码安全证书

`searchguard.ssl.truststore-password`指定的信任库文件的信任库密码。

此属性是可选的；默认为空字符串。

表定义文件
----------------------

Elasticsearch将数据存储在多个节点中，并构建索引以进行快速检索。对于Presto，必须将这些数据映射到列中，以便允许对数据进行查询。

表定义文件以JSON格式描述一个表。

"```{.none}"
{
"tableName": ...，
"schemaName": ...，
"主机地址": ...，
"端口": ...，
"clusterName": "集群名称"，
"index": ...，
"indexExactMatch": ...，
"类型": ...
"columns":[
{
"name": ...，
"type": ...，
"jsonPath": "...路径名称"，
"jsonType": ...，
"顺序位置": ...
}
]
}
```

|字段|必填|类型|说明|
| :---------------- | :------- | :------ | :----------------------------------------------------------- |
| `tableName` | required | string |表的名称，用来标识一个表。|
| `schemaName` |可选| string |包含表的模式。如果省略，则使用默认架构名称。|
| `host` | required | string | Elasticsearch搜索节点的主机名。|
| `port` | required |整数| Elasticsearch搜索节点的端口号。|
| `clusterName` | required | string | Elasticsearch集群名称，用户自定义。|
| `index` | required | string |当前正在支持该表的Elasticsearch索引。|
| `indexExactMatch` |可选| boolean |如果设置为true，则使用通过`index`属性指定的索引。否则，使用`index`属性指定的前缀开始的所有索引。|
| `type` | required | string | Elasticsearch【映射类型】（https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html#mapping-type），该选项决定了文档的索引方式，从而确定文档的索引方式。|
| `columns` |可选| list |列元数据信息列表。|

Elasticsearch列元数据
-----------------------------

可选的，列元数据可以与以下字段在同一个表描述JSON文件中描述：

 

|字段|必填|类型|说明|
| :---------------- | :------- | :------ | :----------------------------------------------------------- |
| `name` |可选| string | Elasticsearch字段的列名。|
| `type` |可选| string | Elasticsearch的列类型【字段】(https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html) |弹性搜索的列类型，可选项包括：
| `jsonPath` |可选| string | Elasticsearch字段的json路径信息。|
| `jsonType` |可选| string | Elasticsearch字段的json类型，可选。|
| `ordinalPosition` |可选|整数|列的顺序。|
