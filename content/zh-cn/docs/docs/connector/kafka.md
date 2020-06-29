Kafka连接器
===============

【目标】

总体介绍
--------

此连接器允许在Presto中将Apache Kafka主题用作表。每条消息在Presto中显示为一行。

主题可以是活动的：当数据到达时，行将出现，当段被删除时，行将消失。如果在单个查询中多次访问同一个表（例如，执行自联接），这可能会导致奇怪的行为。

**说明**

*最低支持版本为0.10.0.*

配置说明
-------------

要配置Kafka连接器，需要创建一个目录属性文件`etc/catalog/kafka.properties`，并替换以下属性：

"```{.none}"
连接器.name=kafka
kafka.table-names=表一，表二名称
kafka.nodes=主机1：端口，主机2：端口
```

### Kafka多集群

可以根据需要创建多个目录，因此，如果您有额外的Kafka集群，只需在`etc/catalog`中添加另一个具有不同名称的属性文件（确保它以`.properties`结尾）。
如果您将属性文件命名为`sales.properties`,Presto将使用配置的连接器创建一个名为`sales`的目录。

配置属性
------------------------

配置属性包括：

|属性名称|描述|
| :---------------------------- | :----------------------------------------------------------- |
| `kafka.table-names` |该目录提供的所有表列表|
| `kafka.default-schema` |表的默认模式名|
| `kafka.nodes` | Kafka集群节点列表|
| `kafka.connect-timeout` |连接kafka集群超时失败|
| `kafka.buffer-size` | Kafka读缓冲区大小|
| `kafka.table-description-dir` |主题描述文件所在目录|
| `kafka.hide-internal-columns` |控制内部列是否是表模式的一部分|

### kafka.table-names（kafka的表名称）

此目录提供的所有表的逗号分隔列表。表名可以是非限定的（简单名称），并将被放入默认模式（见下文）或使用模式名限定（`<schema-name>.<table-name>`）。

对于这里定义的每个表，都可能存在一个表描述文件（见下文）。如果没有表描述文件，则使用表名作为Kafka的Topic名称，不映射数据列。该表仍将包含所有内部列（见下文）。

此属性是必需的；没有默认值，并且必须至少定义一个表。

### kafka默认模式

定义模式，该模式将包含所有在没有限定模式名称的情况下定义的表。

此属性是可选的；默认值为`default`。

### kafka节点

Kafka数据节点的`hostname:port`对列表，逗号分隔。

此属性是必需的；没有默认值，必须至少定义一个节点。

**说明**

*即使此处只指定了子集，Presto也必须能够连接到集群中的所有节点，因为段文件可能只位于* *某个特定的节点上*


### kafka连接超时

连接数据节点超时。繁忙的Kafka集群在接受连接之前可能要花费一些时间；当看到由于超时而导致的查询失败时，增加该值是一种很好的策略。

此属性是可选的；默认值为10秒（`10s`）。

### kafka缓冲区大小

从Kafka读取数据的内部数据缓冲区大小。数据缓冲区必须至少能够容纳一条消息，理想情况下可以容纳多条消息。每个工作者和数据都分配一个数据缓冲区
节点。

此属性是可选的；默认值为`64kb`。

### `kafka.table-description-dir`

在Presto部署中引用一个文件夹，其中包含一个或多个JSON文件（必须以`.json`结尾），其中包含表描述文件。

此属性是可选的；默认值为`etc/kafka`。

### `kafka.hide-内部列名`

除了在表描述文件中定义数据列外，连接器为每个表维护许多附加列。如果这些列是隐藏的，那么它们仍然可以在查询中使用，但不会
可以在表名或选择中出现。

此属性是可选的；默认值为`true`。

内部列
----------------

对于每个已定义的表，连接器维护以下列：

|栏目名称|类型|说明|
| :------------------ | :------ | :----------------------------------------------------------- |
| `_partition_id` | BIGINT |包含该行的Kafka分区编号。|
| `_partition_offset` | BIGINT |该行在Kafka分区内的偏移量。|
| `_segment_start` | BIGINT |包含该行的段的最小偏移量（包括该行）。这个偏移量是分区特定的。|
| `_segment_end` | BIGINT |包含该行的段（独占）中最大的偏移量。偏移量是分区特定的。和下个分片的`_segment_start`值相同（如果存在） |
| `_segment_count` | BIGINT |段内当前行的运行计数。对于未压实的主题，`_segment_start + _segment_count`等于`_partition_offset`。|
| `_message_corrupt` | BOOLEAN |如果解码器无法解码此行的消息，则为True。如果为true，则应将消息映射的数据列视为无效。|
| `_message` | VARCHAR |消息字节表示为UTF-8编码的字符串。这只对文本主题有用。|
| `_message_length` | BIGINT |消息的字节数。|
| `_key_corrupt` | BOOLEAN |如果密钥解码器无法解码该行的密钥，则为True。如果为true，则应将从键映射的数据列视为无效。|
| `_key` | VARCHAR |密钥字节作为UTF-8编码的字符串。这只对文本键有用。|
| `_key_length` | BIGINT |密钥的字节数。|

 

对于没有表定义文件的表，`_key_corrupt`列和`_message_corrupt`列始终为`false`。

表定义文件
----------------------

Kafka仅以字节消息的形式维护主题，并让生产者和消费者定义如何解释消息。对于Presto，必须将这些数据映射到列中，以便允许对数据进行查询。

**说明**

对于包含JSON数据的文本主题，完全可以使用Presto `/functions/json`{.interpreted-text role="doc"}来解析`_message`，而不使用任何表定义文件。
列，该列包含映射到UTF-8字符串的字节。然而，这相当麻烦，并且使得编写SQL查询变得很困难。


表定义文件由一个表的JSON定义组成。文件名可以任意，但必须以`.json`结尾。

"```{.none}"
{
"tableName": ...，
"schemaName": ...，
"topicName": ...，
"key": {
"dataFormat": "数据格式"，
"字段": [
...
]
}，
"message": {
"dataFormat": "数据格式"，
"字段": [
...
]
}
}
```

  

|字段|必填|类型|说明|
| :----------- | :------- | :---------- | :----------------------------------------------------------- |
| `tableName` | required | string |该文件定义的Presto表名。|
| `schemaName` |可选| string |将包含表的模式。如果省略，则使用默认架构名称。|
| `topicName` | required | string |被映射的Kafka主题名称。|
| `key` |可选| JSON对象|消息Key映射的数据列字段定义。|
| `message` |可选| JSON对象|消息本身映射的数据列的字段定义。|



Kafka中的密钥和消息
------------------------

从Kafka 0.8版本开始，每个Topic中的每条消息都可以有一个可选的Key。表定义文件包含键和消息的节，用于将数据映射到表列。

表定义中的`key`和`message`字段均为JSON对象，必须包含两个字段：

|字段|必填|类型|说明|
| :----------- | :------- | :--------- | :----------------------------------------------------------- |
| `dataFormat` | required | string |为这组字段选择解码器。|
| `fields` | required | JSON数组|字段定义的列表。每个字段定义在Presto表中创建一个新列。|

每个字段定义都是一个JSON对象：

"```{.none}"
{
"name": ...，
"type": ...，
"dataFormat": "数据格式"，
"映射": ...，
"formatHint": ...，
"隐藏": ...，
"评论": ...
}
```

  

|字段|必填|类型|说明|
| :----------- | :------- | :------ | :----------------------------------------------------------- |
| `name` | required | string | Presto表中字段的名称。|
| `type` | required | string |栏目的普雷斯托类型。|
| `dataFormat` |可选| string |选择该字段的列解码器。默认使用此行数据格式和列类型的默认解码器。|
| `dataSchema` |可选| string | Avro模式所在的路径或URL地址。仅用于Avro解码器。|
| `mapping` |可选| string |列的映射信息。这是解码器特有的，见下文。|
| `formatHint` |可选| string |设置列特定格式提示给列解码器。|
| `hidden` |可选| boolean |隐藏'DESCRIBE冯曦'和'SELECT *'中的列信息。默认为`false`。|
| `comment` |optional | string |添加列注释，以`DESCRIBE冯曦方式显示。|

键或消息的字段说明不受限制。

行解码
------------

对于密钥和消息，使用解码器将消息和密钥数据映射到
表列。

Kafka Connector包含的解码器有：

- `raw` -不解释Kafka消息，将原始消息字节的范围映射到表列
- `csv` - Kafka消息被解释为逗号分隔消息，字段映射到表列
- `json` - Kafka消息被解析为JSON,JSON字段被映射到表列
- `avro` - Kafka消息按照Avro schema解析，Avro字段映射到表列

**说明**

如果表没有定义文件，则使用`dummy`解码器，`dummy`解码器不暴露任何列。


###裸解码器

raw解码器支持从Kafka消息或Key中读取原始（基于字节）值并将其转换为Presto列。

对于字段，支持如下属性：

- `dataFormat` -选择转换数据类型的宽度
- `type` - Presto数据类型（支持的数据类型列表见下表）
- `mapping` - `<start>[:<end>]`；要转换的字节的开始和结束位置（可选）

`dataFormat`属性选择转换的字节数。如果不存在，则假定为`BYTE`。所有值都有符号。

支持的值：

- `BYTE` -一个字节
- `SHORT` -两个字节（大字节序）
- `INT` - 4字节大字节序
- `LONG` - 8字节（大字节序）
- `FLOAT` - 4字节（IEEE 754格式）
- `DOUBLE` - 8字节（IEEE 754格式）

`type`属性定义值映射到的Presto数据类型。

根据分配给列的Presto类型，可以使用不同的dataFormat值：

| Presto数据类型|允许的`dataFormat`值|
| :----------------------- | :----------------------------- |
|红字|红字，短字，长字|
|整型|字节型，短型，整型|
|小巧玲珑| BYTE，短促
|丁字号| BYTE号|
|杜伯勒|杜伯勒，弗洛亚特
字节，短，长
| `VARCHAR` / `VARCHAR(x)` | `BYTE` |

`mapping`属性指定用于解码的密钥或消息中的字节范围。可以是1个或2个数字，中间用冒号隔开（`<start>[:<end>]`）。

如果只给出起始位置：

> -对于固定宽度类型，列将使用指定的`dateFormat`的适当字节数（见上文）。
> -解码`VARCHAR`值时，将使用从起始位置到消息结尾的所有字节。

如果给出开始和结束位置，则：

> -对于固定宽度类型，大小必须等于指定的`dataFormat`使用的字节数。
> -对于`VARCHAR`，使用start（包括）和end（不包括）之间的所有字节。

如果没有指定`mapping`属性，则等效于将起始位置设置为0，结束位置不定义。

数值数据类型（`BIGINT`,`INTEGER`,`SMALLINT`,`TINYINT`,`DOUBLE`）的解码方案非常简单。从输入消息中读取字节序列并根据以下任一条件进行解码：

> -大端编码（针对整数类型）
> - IEEE 754格式（用于`DOUBLE`）。

`dataFormat`暗含了已解码字节序列的长度。对于`VARCHAR`数据类型，按照UTF-8编码解释字节序列。

### `csv`解码器

CSV解码器将代表消息或密钥的字节转换为UTF-8编码的字符串，然后将结果解释为CSV（逗号分隔值）行。

对于字段，必须定义`type`和`mapping`属性：

- `type` - Presto数据类型（支持的数据类型列表见下表）
- `mapping` -字段在CSV记录中的索引

`dataFormat`和`formatHint`不支持，必须省略。下表列出了支持的Presto类型，可用于`type`和解码方案：

| Presto数据类型|解码规则|
| :-------------------------------------- | :----------------------------------------------------------- |
| `BIGINT``INTEGER``SMALLINT``TINYINT'|使用Java的`Long.parseLong()'进行解码|
| `DOUBLE' |使用Java`Double.parseDouble()`进行解码|
| `BOOLEAN` | "true"字符序列映射到`true`；其他字符序列映射到`false` |
| `VARCHAR` / `VARCHAR(x)` |用作是|



### `json`解码器

JSON解码器根据`4627`{.interpreted-text role="rfc"}将代表消息或密钥的字节转换为JSON格式。请注意，消息或键*MUST*转换为JSON对象，而不是数组或简单类型。

对于字段，支持如下属性：

- `type` -栏目的Presto类型。
- `dataFormat` -字段解码器，用于列。
- `mapping` -从JSON对象中选择字段的字段名列表，以斜杠分隔
- 'formatHint' -仅针对'custom-date-time'，见下文

JSON解码器支持多种字段解码器，`_default`用于标准表格列，`_default`用于基于日期和时间的类型。

下表列出了可在`type`中使用的Presto数据类型和可通过`dataFormat`attribute指定的匹配字段解码器

| Presto数据类型|允许的`dataFormat`值|
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| `BIGINT``INTEGER``SMALLINT```TINYINT```DOUBLE```BOOLEAN``VARCHAR``VARCHAR(x)`|默认字段解码器（省略了`dataFormat`属性）|
|带时区的时间带时区的时间|自定义日期时间，iso8601,rfc2822，毫秒-自-纪元，秒-自-纪元|
| `DATE` |`自定义日期时间`,`iso8601`,`rfc2822`,|



###默认字段解码器

这是支持所有Presto物理数据类型的标准字段解码器。通过JSON转换规则，字段值将被强制转换为布尔值、long值、double值或字符串值。对于非基于日期/时间的列，
应该使用这个解码器。

###日期和时间解码器

如果要将JSON对象中的值转换为Presto`DATE`、`TIME`、`TIMEWITHTIMEZONE`、`TIMESTAMP`或`TIMESTAMPWITHTIMEZONE`列，必须使用`dataFormat`选择特定的解码器。
字段定义的属性。

-`iso8601`-基于文本，将文本字段解析为ISO8601时间戳。
    
- `rfc2822` -基于文本，将文本字段解析为`2822`{.interpreted-text role="rfc"}时间戳。
    
-`custom-date-time`-基于文本，根据`formatHint`属性指定的Joda格式模式解析文本字段。格式模式应符合
<https://www.joda.org/joda-time/apidocs/org/joda/时间/格式/日期时间格式.html>，其中日期时间格式为日期时间格式。
    
- `msilliseconds-since-epoch` -基于数字，将文本或数字解释为自该时代以来的毫秒数。
    
- `seconds-since-epoch`-基于数字，将文本或数字解释为自该时代以来的毫秒数。

对于`TIMESTAMP WITH TIME ZONE`和`TIME WITH TIME ZONE`数据类型，如果解码值中存在时区信息，则将其用于Presto值中。否则，结果时区将被设置为`UTC`。

### `avro`解码器

Avro Decoder模块根据Schema将Avro格式的消息或密钥转换为相应的字节。消息必须嵌入Avro模式。Presto不支持无模式Avro解码。

对于key/message，使用`avro`解码器，必须定义`dataSchema`。这应该指向需要解码的消息的有效Avro模式文件的位置。此位置可以是远程Web
服务器（例如：'dataSchema：'http://example.org/schema/avro_data.avsc'`）或本地文件系统(例如：
`dataSchema: '/usr/local/schema/avro_data.avsc'`)，如果Presto协调节点无法访问该位置，解码器将故障。

对于字段，支持如下属性：

- `name` - Presto表中的列名。
- `type` -栏目的Presto类型。
- `mapping` -一组以斜杠分隔的字段名列表，用于选择字段
从Avro模式。如果`mapping`中指定的字段不存在
在原始Avro模式中，则读取操作将返回NULL。

下表列出了支持的Presto类型，这些类型可用于`type`中的等效Avro字段type/s。

| Presto数据类型|允许的Avro数据类型|
| :----------------------- | :--------------------- |
长，短|长|
|杜伯勒|杜伯勒，弗洛亚特
布尔人布尔人布尔人
| `VARCHAR` / `VARCHAR(x)` | `STRING` <源标识符> |
变量固定，小结
天线，天线，天线
|`MAP`|`MAP`|



#### Avro模式演进

Avro解码器支持向后兼容的模式演进特性。有了向后兼容性，就可以使用较新的模式读取用较旧的模式创建的Avro数据。Avro模式中的任何更改也必须反映在Presto的主题定义文件中。Avro schema文件中新增/重命名的*must*字段必须有默认值。

Schema的演进行为如下：

-新模式中添加的列：当表使用新模式时，使用旧模式创建的数据将产生一个*default*值。
-新模式中删除的列：使用旧模式创建的数据将不再输出被删除列的数据。
-列在新模式中被重命名：这相当于删除列并添加一个新列，当表使用新模式创建列时，使用旧模式创建的数据将产生一个*default*值。
模式。
-更改新架构中列的类型：如果类型强制为Avro支持的类型，则会发生转换。对于不兼容的类型将引发错误。
