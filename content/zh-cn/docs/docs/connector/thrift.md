Thrift连接器
================

Thrift连接器使得无需定制Presto连接器实现就可以与外部存储系统集成。

为了与外部系统使用Thrift连接器，您需要实现`PrestoThriftService`接口，如下所示。接下来，将Thrift连接器配置为指向一组称为Thrift服务器的机器，这些机器实现接口。作为接口实现的一部分，Thrift服务器将提供元数据、拆分和数据。连接器将从元数据调用或数据调用的可用实例中随机选择一个服务器与之通信，除非拆分包含地址列表。所有的请求都被假定为幂等的，并且可以在任何服务器之间自由地重试。

配置说明
-------------

要配置Thrift连接器，请创建目录属性文件`etc/catalog/thrift.properties`，并替换相应的属性，内容如下：

"```{.none}"
Connector.name=预浪费
presto.thrift.client.addresses=主机端口号，主机端口号
```

###多个Thrift系统

可以根据需要创建多个目录，因此，如果您需要连接到额外的Thrift系统，只需将另一个属性文件添加到具有不同名称的“etc/catalog”中（确保它以`.properties`结尾）。

配置属性
------------------------

配置属性包括：

|属性名称|描述|
| :---------------------------------------- | :------------------------------------------------------- |
| `presto.thrift.client.addresses` | Thrift服务器的位置|
| `presto-thrift.max-response-size` | Thrift服务端返回的最大数据量|
| `presto-thrift.metadata-refresh-threads` |元数据缓存刷新线程数|
| `presto.thrift.client.max-retries` | Thrift请求失败后的最大重试次数|
| `presto.thrift.client.max-backoff-delay` |最大重试时间间隔|
| `presto.thrift.client.min-backoff-delay` |重试的最小时间间隔|
| `presto.thrift.client.max-retry-time` | Thrift请求所有尝试之间的最大持续时间|
| `presto.thrift.client.backoff-scale-factor' |指数回退的缩放因子
| `presto.thrift.client.connect-timeout` |连接超时时间|
| `presto.thrift.client.request-timeout` |请求超时时间|
| `presto.thrift.client.socks-proxy` | socks代理服务地址|
| `presto.thrift.client.max-frame-size` | Thrift原始响应的最大尺寸|
| `presto.thrift.client.transport` |节约运输类型(`UNFRAMED`,`FRAMED`,`HEADER`) |
| `presto.thrift.client.protocol` |节约协议类型(`BINARY`,`COMPACT`,`FB_COMPACT`) |

###普雷斯托.thrift.client.addresses（客户端地址）

逗号分隔的thrift server列表，形式为`host:port`。例如：

"```{.none}"
presto.thrift.client.addresses=192.0.2.3:7777,192.0.2.4:7779
```

此属性是必需的；没有默认值。

###预先省钱。最大响应大小

连接器接受的数据响应的最大大小。此值由连接器在请求数据时发送给Thrift服务器，从而允许它适当地调整响应的大小。

此属性是可选的；默认值为`16MB`。

### `presto-thrift.元数据刷新-线程`

元数据缓存刷新线程数。此属性是可选的；默认值为`1`。

Thrift IDL文件
---------------

以下IDL描述了必须实现的`PrestoThriftService`：

```
枚举预分流绑定{
低于=1；
精确= 2；
以上=3；
}

exception预分流服务异常{
1：字符串消息；
2:bool可重试；
}

struct架构预存储架构名称{
1：可选字符串schemaName；
}

结构体PrestoThriftSchemaTableName（结构体名称） {
1：字符串模式名；
2：字符串表名；
}

struct预分流表元数据{
1：采用省电模式模式表名省电模式表名；
2:list<PrestoThriftColumnMetadata>类型下的列，其中，
3：可选字符串注释；

/**
*返回可用于索引查找的键集列表。
*预期该列表将只有唯一的键集。
* {@code set<set<string>>>}由于有些语言（如php）不支持，所以这里不使用。
*/
4：可选列表<set<string>>索引键；
}

struct预分流列元数据{
1：字符串名称。
2：字符串类型。
3：可选字符串注释；
4：隐藏bool；
}

struct预存空列集合{
1：可选集合<string>列；
}

struct预分流域结构{
/**
*返回列名到constraint的映射。
*/
1：可选map<string,PrestoThriftDomain>域，表示非必选；
}

/**
*包含所有值或排除所有值的集合。
*/
struct预分流全部或无值集合{
1:bool类型；
}

/**
*包含可唯一识别的值的集合。
*假定无穷多个可能的值。这些值可以集中包含（又名白名单）
*或集体排除（又名！白名单）。
*该结构用于可比较的，但不可排序的类型，如"json"、"map"。
*/
struct PrestoThriftEquatableValueSet结构体中可以包含的值集合{
1：布尔类型whiteList。
2：列出<PrestoThriftBlock>的值列表；
}

/**
* {@code nulls}数组的元素确定对应行的值是否为null。
* {@code ints}数组的元素为每一行的值。如果行是空的，则值被忽略。
*/
struct PrestoThriftInteger结构体类型{结构体类型
1：可选列表<bool>nulls；
2：可选列表<i32> ints；
}

/**
* {@code nulls}数组的元素确定对应行的值是否为null。
* {@code longs}数组的元素是每一行的值。如果行是空的，则值被忽略。
*/
结构体prestoThriftBigint{结构体名称：
1：可选列表<bool>nulls；
2：可选列表<i64> longs；
}

/**
* {@code nulls}数组的元素确定对应行的值是否为null。
* {@code doubles}数组的元素为每一行的值。如果行是空的，则值被忽略。
*/
结构体PrestoThriftDouble{结构体名称
1：可选列表<bool>nulls；
2：可选列表<double>double；
}

/**
* {@code nulls}数组的元素确定对应行的值是否为null。
* {@code sizes}数组中的每个元素都包含对应元素的长度，单位为字节。
*如果row为null，则忽略{@code sizes}中的对应元素。
* {@code bytes}数组包含UTF-8编码的字节值。
*所有行的值依次写入{@code bytes}数组。
*总字节数必须等于所有大小之和。
*/
结构体PrestoThriftVarchar{结构体名称
1：可选列表<bool>nulls；
2：可选列表<i32>大小；
3：可选二进制字节；
}

/**
* {@code nulls}数组的元素确定对应行的值是否为null。
* {@code booleans}数组的元素是每一行的值。如果行是空的，则值被忽略。
*/
结构体prestoThriftBoolean{结构体名称：
1：可选列表<bool>nulls；
2：可选列表<bool>布尔值；
}

/**
* {@code nulls}数组的元素确定对应行的值是否为null。
* {@code dates}数组的元素是表示为数字的每一行的日期值
*自1970年1月1日以来的天数。
*如果row为null，则value值被忽略。
*/
struct预分流日期{
1：可选列表<bool>nulls；
2：可选列表<i32>日期；
}

/**
* {@code nulls}数组的元素确定对应行的值是否为null。
* {@code timestamps}数组的元素是每行的值，表示为数字
*自1970年1月1日T00:00:00 UTC以来的毫秒数。
*如果row为null，则value值被忽略。
*/
struct预分流时间戳{
1：可选列表<bool>nulls；
2：可选列表<i64>时间戳；
}

/**
* {@code nulls}数组的元素确定对应行的值是否为null。
* {@code sizes}数组中的每个元素都包含对应元素的长度，单位为字节。
*如果row为null，则忽略{@code sizes}中的对应元素。
* {@code bytes}数组包含UTF-8编码的字节值，用于json的字符串表示。
*所有行的值依次写入{@code bytes}数组。
*总字节数必须等于所有大小之和。
*/
结构体PrestoThriftJson{结构体名称
1：可选列表<bool>nulls；
2：可选列表<i32>大小；
3：可选二进制字节；
}

/**
* {@code nulls}数组的元素确定对应行的值是否为null。
* {@code sizes}数组中的每个元素都包含对应元素的长度，单位为字节。
*如果row为null，则忽略{@code sizes}中的对应元素。
* {@code bytes}数组包含HyperLogLog表示的编码字节值，定义见
*空运规范：href="https://github.com/airlift/airlift/blob/master/stats/docs/hll.md，具体如下：
*所有行的值依次写入{@code bytes}数组。
*总字节数必须等于所有大小之和。
*/
struct PrestoThriftHyperLogLog结构体类型枚举类型，取值包括：{
1：可选列表<bool>nulls；
2：可选列表<i32>大小；
3：可选二进制字节；
}

/**
* {@code nulls}数组的元素确定对应行的值是否为null。
* {@code sizes}数组的每个元素包含对应values数组中的元素个数。
*如果row为null，则忽略{@code sizes}中的对应元素。
* {@code values}是一个bigint块，它包含所有行的数组元素。
* bigint块中的元素总数必须等于所有size之和。
*/
结构体PrestoThriftBigintArray（指定时间索引）{
1：可选列表<bool>nulls；
2：可选列表<i32>大小；
3：表示PrestoThriftBigint的可选值；
}

/**
*包含零个或多个可能值连续空间上相同类型的Range的集合。
*范围被合并成不重叠范围的最紧凑的表示。
*此结构用于可比较的和可排序的类型，如bigint,integer,double,varchar等。
*/
struct预分流区间值集合{
1：列出<PrestoThriftRange>区间范围；
}

结构体PrestoThriftId {
1：二进制id；
}

struct预分流分批{
1：列表<PrestoThriftSplit>分裂；
2：表示可选，即PrestoThriftId nextToken；
}

结构体PrestoThriftSplit {结构体名称，字符串类型，字符串类型，字符串类型，字符串类型，字符串类型，字符串类型，字符串类型，字符串类型，字符串类型，字符串类型，字符串类型，字符串类型，字符串类型，字符串类型，字符串类型，字符串类型
/**
*编码返回Presto的一批行所需的所有信息。
*对于基本扫描，包括模式名、表名和输出约束。
*对于索引扫描，包括模式名，表名，查找键集和输出约束。
*/
1 ：表示采用PrestoThriftId拆分ID；

/**
*标识行所在的主机集合。如果为空，那么行
*预期可在任何主机上使用。此列表中的主机可能是独立的
*来自用于服务元数据请求的主机。
*/
2：列表方式<PrestoThriftHostAddress>主机；
}

struct预分流主机地址{
1：字符串主机；
2:i32端口；
}

struct预分流分页返回结果{
/**
*以列式格式返回数据。
*列表中的列必须按照引擎要求的顺序排列。
*/
1：列表<PrestoThriftBlock>列块；

2:i32行计数；
3：表示可选，即PrestoThriftId nextToken；
}

struct预分流表元数据{
1：可选PrestoThriftTable元数据表元数据；
}

struct预分流值集合{
1：表示可选集合PrestoThriftAllOrNoneValueSet，即可选集合allOrNoneValueSet，即可选集合。
2：可选的PrestoThriftEquatableValueSet等价值集合；
3：可选PrestoThriftRangeValueSet可选范围值集；
}

结构体PrestoThriftBlock{
1：可选PrestoThriftInteger数据类型。
2：表示可选配置PrestoThriftBigint bigintData，表示配置BigintData的阈值。
3：表示PrestoThriftDouble doubleData（可选，即双倍数据）
4：表示可选，即PrestoThriftVarchar varcharData，表示从第1个开始。
5：可选的PrestoThriftBoolean布尔值数据；
6：可选PrestoThriftDate日期数据；
7：可选PrestoThriftTimestamp时间戳数据；
8：可选扩展参数PrestoThriftJson jsonData；
9:PrestoThriftHyperLogLoghyperLogLogData，此选项为可选选项，可以选择是否上报。
10：表示可选，即PrestoThriftBigintArray bigintArrayData，表示可以选择从该数组中取出数据。
}

/**
* LOWER UNBOUNDED用空值和上面的绑定指定
* UPPER UNBOUNDED被指定为一个空值和一个BELOW界
*/
结构体PrestoThriftMarker{结构体名称
1：可选PrestoThriftBlock取值
2：绑定PrestoThriftBound策略；
}

结构体PrestoThriftNullableToken{结构体名称，类型
1：可选的PrestoThriftId令牌。
}

结构体预分流域{
1:PrestoThriftValueSet参数值集合；
2:bool null允许；
}

结构体PrestoThriftRange{结构体名称
1：表示PrestoThriftMarker低级别告警；
2：表示PrestoThriftMarker标记为高；
}

/**
* Presto Thrift服务定义。
*这个thrift服务需要实现才能与Thrift连接器一起使用。
*/
服务预分流服务{
/**
*返回可用的模式名。
*/
list<string> prestoListSchemaNames()
抛出（1:PrestoThriftServiceException异常ex1）；

/**
*返回给定模式名的表。
*
* @param schemaNameOrNull包含模式名或{@textal null}的结构体
* @return包含对应schema的表名列表。如果模式名为空，则返回
*所有模式的表列表。如果模式不存在，则返回空列表
*/
list<PrestoThriftSchemaTableName>过滤策略表列表(
1：表示采用无序模式名称schemaNameOrNull)
抛出（1:PrestoThriftServiceException异常ex1）；

/**
*返回给定表的元数据。
*
* @param schemaTableName模式名和表名
* @return给定表的元数据，如果表不存在，则返回一个{@textal null}值
*/
预热表元数据预热表元数据(
1：采用省电模式省电模式表名省电模式表名)
抛出（1:PrestoThriftServiceException异常ex1）；

/**
*返回一批split。
*
* @param schemaTableName模式名和表名
* @paramdesiredColumns要返回的列的超集，空集表示“没有列”， {@textal null} set表示“所有列”
* @param output返回数据约束
* @param maxSplitCount返回的最大分割数
* @param nextToken上一个拆分批次的令牌，如果是第一个调用，则{@textal null}
* @return一批分箱单
*/
预分账批量预分账(
1：采用省电模式省电模式表名省电模式表名。
2：预置空列设置期望的列数。
3:PrestoThriftTupleDomain输出约束，
4:i32最大分裂次数。
5：预流控（即PrestoThriftNullableToken）
抛出（1:PrestoThriftServiceException异常ex1）；

/**
*返回给定键的一批索引拆分。
*如果为查询选择索引连接策略，则调用此方法。
*
* @param schemaTableName模式名和表名
* @param indexColumnNames指定键的列及其顺序
* @param outputColumnName要返回的列名列表
* @param key需要返回记录的keys，只包含唯一且非空的值
* @param output返回数据约束
* @param maxSplitCount返回的最大分割数
* @param nextToken上一个拆分批次的令牌，如果是第一个调用，则{@textal null}
* @return一批分箱单
*/
预分流批量预获取索引分裂数(
1：采用省电模式省电模式表名省电模式表名。
2：列表<string>索引列名。
3：列表<string>输出列名。
4：表示PrestoThriftPageResult类型的按键。
5:PrestoThriftTupleDomain输出约束，
6:i32最大分裂次数。
7：无令牌令牌(prestoThriftNullableToken)
抛出（1:PrestoThriftServiceException异常ex1）；

/**
*为给定的拆分返回一批行。
*
* @param splitId拆分批次返回的拆分id
* @param columns要返回的列名列表
* @param maxBytes返回数据的最大字节数
* @param nextToken前一个批次的令牌，如果是第一个调用，则{@textal null}
* @return批量表数据
*/
分页返回结果prestoThriftPageResultprestoGetRows(
1：采用PrestoThriftId拆分标识。
2:list<string>列，即列表字段。
3:i64最大字节数。
4：预分流的NullableToken（预分流的NullableToken）
抛出（1:PrestoThriftServiceException异常ex1）；
}
```



