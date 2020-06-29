Kafka连接器教程
========================

简介
------------

Kafka Connector for Presto允许使用Presto从Apache Kafka访问实时Topic数据。本教程演示如何设置主题以及如何创建支持Presto表的主题描述文件。

施工安装
------------

本教程假定您熟悉Presto和本地Presto安装（见【部署】(../安装/部署）。本教程将重点介绍设置Apache Kafka并将其与Presto集成。

###步骤1：安装Kafka

下载并解压[Apache Kafka](https://kafka.apache.org/)软件包，完成安装。


**说明**

*本教程使用Apache Kafka 0.8.1进行了测试。它应该可以与任何0.8.x版本的Apache Kafka一起使用

启动zookeeper和kafka服务器：

"```{.none}"
配置文件/zookeeper.properties
【2013-04-22 15:01:37,495】信息从配置文件config/zookeeper.properties中读取配置信息（org.apache.zookeeper.server.quorum.QuorumPeerConfig文件）
...
```

"```{.none}"
kafka-server服务启动脚本
【2013-04-22 15:01:47,028】信息验证属性列表(kafka.utils.VerableProperties)
【2013-04-22 15:01:47,051】信息的属性socket.send.buffer.bytes被重写为1048576 (kafka.utils.VerableProperties) ，导致发送失败，发送失败。
...
```

此操作将在`2181`端口启动Zookeeper,`9092`端口启动Kafka。

###步骤2：加载数据

从Maven Central下载tpch-kafka加载器，下载路径如下：

"```{.none}"
相关命令：$ curl -o kafka-tpch https://repo1.maven.org/maven2/de/softwareforge/kafka_tpch_0811/1.0/kafka_tpch_0811-1.0.sh（在浏览器端执行，在浏览器端执行即可）
$ chmod 755 kafka-tpch
```

现在运行`kafka-tpch`程序，用tpch数据预加载许多主题：

"```{.none}"
$ ./kafka-tpch load --brokers localhost:9092 --前缀指定tpch服务名称，服务名称，服务名称。--tpch类型tiny
2014-07-28T17:17:07.594-0700 INFO主io.airlift.log.支持向标准错误日志打印
2014-07-28T17:17:07.623-0700 INFO main de.softwareforge.kafka.LoadCommand处理列表：【客户，订单，部件，部件，供应商，国家，地区】
2014-07-28T17:17:07.981-0700 INFO池-1-线程-1 de.softwareforge.kafka.LoadCommand将表“客户”加载到主题“客户”中。
2014-07-28T17:17:07.981-0700 INFO资源池-1-线程-2 de.softwareforge.kafka.LoadCommand将订单表'订单'加载为主题'tpch.orders'...
2014-07-28T17:17:07.981-0700 INFO资源池-1-线程-3 de.softwareforge.kafka.LoadCommand将表'lineitem'加载到主题'tpch.lineitem'中，加载成功后，查看页面提示是否加载成功。
2014-07-28T17:17:07.982-0700 INFO资源池-1-线程-4 de.softwareforge.kafka.LoadCommand将表'部件'加载到主题'tpch.part'中，等待用户确认。
2014-07-28T17:17:07.982-0700 INFO池-1-线程-5 de.softwareforge.kafka.LoadCommand将表'partsupp'加载到主题'tpch.partsupp'中，加载成功后，可以开始加载，加载成功。
2014-07-28T17:17:07.982-0700 INFO池-1-线程-6 de.softwareforge.kafka.LoadCommand将表“供应商”加载到主题“供应商”中...
2014-07-28T17:17:07.982-0700 INFO资源池-1-线程-7 de.softwareforge.kafka.LoadCommand将表'nation'加载到主题'tpch.nation'中，等待用户确认，等待用户确认。
2014-07-28T17:17:07.982-0700 INFO资源池-1-线程-8 de.softwareforge.kafka.LoadCommand将表'区域'加载到主题'tpch.region'中，等待其加载完成。
2014-07-28T17:17:10.612-0700 ERROR pool-1-thread-8 kafka.producer.async.DefaultEventHandler按主题整理消息失败，分区：提取主题元数据失败，主题元数据：tpch.region
2014-07-28T17:17:10.781-0700 INFO pool-1-thread-8 de.softwareforge.kafka.LoadCommand为表名为'region'的表生成了5行数据，请关注！
2014-07-28T17:17:10.797-0700 ERROR pool-1-thread-3 kafka.producer.async.DefaultEventHandler按主题整理消息失败，分区原因是：提取主题元数据失败，主题：tpch.lineitem
2014-07-28T17:17:10.932-0700 ERROR pool-1-thread-1 kafka.producer.async.DefaultEventHandler按主题整理消息失败，分区，原因：提取主题元数据失败，主题：tpch.customer
2014-07-28T17:17:11.068-0700 ERROR pool-1-thread-2 kafka.producer.async.DefaultEventHandler按主题整理消息失败，分区，原因：提取主题元数据失败，主题：tpch.orders
2014-07-28T17:17:11.200-0700 ERROR pool-1-thread-6 kafka.producer.async.DefaultEventHandler按主题整理消息失败，无法继续处理消息。分区原因：为主题提取主题元数据失败：tpch.supplier
2014-07-28T17:17:11.319-0700 INFO pool-1-thread-6 de.softwareforge.kafka.LoadCommand为表'供应商'生成了100行数据，表示成功生成了100行数据。
2014-07-28T17:17:11.333-0700 ERROR pool-1-thread-4 kafka.producer.async.DefaultEventHandler按主题整理消息失败，分区，原因：提取主题元数据失败，主题：tpch.part
2014-07-28T17:17:11.466-0700 ERROR pool-1-thread-5 kafka.producer.async.DefaultEventHandler按主题整理消息失败，分区：提取主题元数据失败，主题元数据：tpch.partsupp
2014-07-28T17:17:11.597-0700 ERROR pool-1-thread-7 kafka.producer.async.DefaultEventHandler按主题整理消息失败，分区，原因：提取主题元数据失败，主题：tpch.nation
2014-07-28T17:17:11.706-0700 INFO pool-1-thread-7 de.softwareforge.kafka.LoadCommand为表'国家信息'生成了25行数据，请检查数据是否正确。
2014-07-28T17:17:12.180-0700 INFO池-1-线程-1 de.softwareforge.kafka.LoadCommand生成的表'客户'的行数为1500行，超过1500行的部分将被忽略。
2014-07-28T17:17:12.251-0700 INFO池-1-线程-4 de.softwareforge.kafka.LoadCommand为表'部件'生成的2000行信息，其中包含所有需要处理的信息。
2014-07-28T17:17:12.905-0700 INFO池-1-线程-2 de.softwareforge.kafka.LoadCommand为表'orders'生成了15000行数据，请分析原因并处理。
2014-07-28T17:17:12.919-0700 INFO pool-1-thread-5 de.softwareforge.kafka.LoadCommand为表'partsupp'生成了8000个行数据，表示成功生成软件分发任务。
2014-07-28T17:17:13.877-0700 INFO池-1-线程-3 de.softwareforge.kafka.LoadCommand为表'lineitem'生成了60175行数据，需要更新到此表。
```

Kafka现在拥有许多预先装载了要查询的数据的主题。

###第三步：让Presto知道Kafka的Topic

在Presto安装中，为Kafka连接器添加目录属性文件`etc/catalog/kafka.properties`。该文件列出了Kafka节点和Topic：

"```{.none}"
连接器.name=kafka
kafka.nodes=本地主机名：9092
kafka.table-names=tpch.customer,tpch.orders,tpch.lineitem,tpch.part,tpch.suppp,tpch.供应商，tpch.nation,tpch.地区信息，根据客户名称查询订单信息，根据地区信息查询订单信息。
kafka.hide-internal-columns=是否隐藏字段
```

现在启动Presto：

"```{.none}"
$bin/launcher启动程序
```

由于kafka的表在配置中都有`tpch.`前缀，所以表在`tpch`模式中。连接器挂载在`kafka`目录下，因为属性文件命名为`kafka.properties`。

进入[Presto CLI](../installation/cli)命令行窗口，命令如下：

"```{.none}"
$ ./presto --目录kafka --模式tpch
```

列出表格，以验证事情是否有效：

"```{.none}"
普雷斯托：tpch>展示表；
表格
----------
顾客
细列项目
民族
订单
零件
零件
地区
供应商
（8行）
```

### Step4：基础数据查询

Kafka数据是非结构化的，没有元数据来描述消息的格式。无需进一步配置，Kafka连接器可以访问数据并以原始形式映射数据，但除了内置列之外，没有实际列：

"```{.none}"
presto:tpch> DESCRIBE客户名称；
列|类型|附加|注释
-------------------+---------+-------+---------------------------------------------
_partition_id | bigint |分区编号
_partition_offset | bigint |消息在分区内的偏移量。
_segment_start | bigint | |分片起始偏移值。
_segment_end | bigint | |分片结束偏移量。
_segment_count | bigint |每段运行消息数
_key | varchar | |密钥文本信息
_key_corrupt | boolean | |关键数据被破坏
_key_length | bigint | |总的密钥字节数。
_message | varchar | |消息正文
_message_corrupt | boolean | |消息数据被破坏
_message_length | bigint | |消息总字节数。
（11行）

presto:tpch> SELECT count(*)来自于客户；
_col0
-------
1500

presto:tpch> SELECT _message from客户限制5；
_消息
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
{"rowNumber":1,"customerKey":1,"name":"客户编号000000001","地址":"IVhzIApeRb ot,c,E","nationKey":15, "电话":"25-989-741-2988","帐户余额":"711.56","市场细分":"建设","评论":"对均匀、规则的血小板。正规，讽刺墓志铭nage"}
{"rowNumber":3,"customerKey":3,"name":"客户#000000003","地址":"媒体网关9kdTD2WBHm","nationKey":1，电话："11-719-748-3364","accountBalance":7498.12,"市场细分":"自动移动","评论":"存款吃掉狡猾的讽刺，甚至指示。狐狸狡猾地发现。布里塞尔
{"rowNumber":5,"customerKey":5,"name":"客户#000000005","address":"注册邮箱地址","nationKey":3, "phone":"13-750-942-6364","accountBalance":794.47,"marketSegment":"市场部","评论":"n个账户将不得不解除锁定。狐狸的哄骗能力"}
{"rowNumber":7,"customerKey":7,"name":"客户#000000007","address":"营业网点号码","国家号码": 18,"phone":"28-190-982-9759","accountBalance":9561.95,"marketSegment":"自动机","评论":"反讽刺，表达经纬仪。特快的，速成的
{"rowNumber":9,"customerKey":9,"name":"客户#000000009","address":"xKiAFTjUsCuxfeleNqefumTrjS","nationKey":8,（根据客户编号查询其下订单的订单信息） "phone":"18-338-906-3675","accountBalance":8324.07,"marketSegment":"家具","评论":"r经纬仪根据请求醒来薄借口：待定
（5行）

presto:tpch> SELECT sum（cast(json_extract_scalar(_message, '$.accountBalance'） AS双倍金额)来自客户限额10；
_col0
------------
6681865.59
（1行）
```

Kafka中的数据可以使用Presto查询，但还没有形成实际的表形状。原始数据可以通过`_message`和`_key`列获得，但不会解码成列。由于样本数据是JSON格式，因此可以使用Presto内置的[json](../functions/json)对数据进行切片。

###步骤5：添加Topic描述文件

Kafka Connector支持Topic描述文件，将原始数据转换为表格式。这些文件位于Presto安装的`etc/kafka`文件夹中，必须以`.json`结尾。建议：
文件名与表名匹配，但非必须。

在`etc/kafka/tpch.customer.json`文件中添加如下文件，并重启Presto。

"``` {.json}"
{
"tableName": "客户名称"，
"schemaName": "tpch"，
"topicName": "tpch.客户名称"，
"key": {
"dataFormat": "原始格式"，
"字段": [
{
"name": "kafka_key"，
"dataFormat": "长数据格式"，
"type": "BIGINT"类型名称，
"hidden": "假的"
}
]
}
}
```

customer表现在多了一个列：`kafka_key`。

"```{.none}"
presto:tpch> DESCRIBE客户名称；
列|类型|附加|注释
-------------------+---------+-------+---------------------------------------------
kafka_key | bigint | <密钥> <密钥> <密钥> <密钥> <密钥> <密钥>
_partition_id | bigint |分区编号
_partition_offset | bigint |消息在分区内的偏移量。
_segment_start | bigint | |分片起始偏移值。
_segment_end | bigint | |分片结束偏移量。
_segment_count | bigint |每段运行消息数
_key | varchar | |密钥文本信息
_key_corrupt | boolean | |关键数据被破坏
_key_length | bigint | |总的密钥字节数。
_message | varchar | |消息正文
_message_corrupt | boolean | |消息数据被破坏
_message_length | bigint | |消息总字节数。
（12行）

presto:tpch> kafka_key LIMIT 10从客户订单中选择kafka_key
kafka_key
-----------
0
1
2
3
4
5
6
7
8
9
（10行）
```

topic定义文件将内部的Kafka key（8字节的裸长）映射到Presto `BIGINT`列上。

###步骤6：将topic消息的所有值映射到列

更新`etc/kafka/tpch.customer.json`文件，为消息添加字段，并重启Presto。由于消息中字段为JSON，所以使用`json`数据格式。这是对键和消息使用不同的数据格式的示例。

"``` {.json}"
{
"tableName": "客户名称"，
"schemaName": "tpch"，
"topicName": "tpch.客户名称"，
"key": {
"dataFormat": "原始格式"，
"字段": [
{
"name": "kafka_key"，
"dataFormat": "长数据格式"，
"type": "BIGINT"类型名称，
"hidden": "假的"
}
]
}，
"message": {
"dataFormat": "json" , <网络地址格式名称>，
"字段": [
{
"name": "行号"，
"mapping": "行号"，
"type": "BIGINT"
}，
{
"name": "客户密钥"，
"mapping": "客户键值"，
"type": "BIGINT"
}，
{
"name": "名称"，
"mapping": "名称"，
"type": "VARCHAR"
}，
{
"name": "地址"，
"mapping": "映射地址"，
"type": "VARCHAR"
}，
{
"name": "国家密钥"，
"mapping": "国家关键字"，
"type": "BIGINT"
}，
{
"name": "电话"，
"mapping": "话机号码"，
"type": "VARCHAR"
}，
{
"name": "账户余额"，
"mapping": "账户余额"，
"type": "双倍"
}，
{
"name": "细分市场"，
"mapping": "市场细分"，
"type": "VARCHAR"
}，
{
"name": "评论内容"，
"mapping": "评论信息"，
"type": "VARCHAR"
}
]
}
}
```

现在对消息的JSON中的所有字段都定义了列，并且来自前面的求和查询可以直接操作`account_balance`列：

"```{.none}"
presto:tpch> DESCRIBE客户名称；
列|类型|附加|注释
-------------------+---------+-------+---------------------------------------------
kafka_key | bigint | <密钥> <密钥> <密钥> <密钥> <密钥> <密钥>
行号| bigint | |
客户键值| bigint | |
名称| varchar |
地址| varchar |
国密码| bigint | |
phone |字符串| |
account_balance|双倍余额||
市场段|varchar|
注释| varchar |
_partition_id | bigint |分区编号
_partition_offset | bigint |消息在分区内的偏移量。
_segment_start | bigint | |分片起始偏移值。
_segment_end | bigint | |分片结束偏移量。
_segment_count | bigint |每段运行消息数
_key | varchar | |密钥文本信息
_key_corrupt | boolean | |关键数据被破坏
_key_length | bigint | |总的密钥字节数。
_message | varchar | |消息正文
_message_corrupt | boolean | |消息数据被破坏
_message_length | bigint | |消息总字节数。
（21行）

presto:tpch> SELECT *从客户限5；
kafka_key |行号|客户_key |姓名|地址|国家_key |电话|余额|市场_segment |评论
-----------+------------+--------------+--------------------+---------------------------------------+------------+-----------------+-----------------+----------------+---------------------------------------------------------------------------------------------------------
1 | 2 | 2 |客户#000000002 | XSTf4,NCwDVaWNe6tEgvwfmRchLXak | 13 | 23-768-687-3665 | 121.65 |自动机| l帐号信息查询接口。欢快的讽刺经纬仪大胆地整合
3 | 4 | 4 |客户#000000004 | XxVSJsLAGtn | 4 | 14-128-190-5944 | 2866.83 |机机接口协议|请求消息。最后的，最后的，最后的
5 | 6 | 6 |客户#000000006 | sKZz0CsnMD7mp4Xd0YrBvx,（表示客户名）表示客户名，表示客户名。雷库沃yVn|20|30-114-968-4951|7638.57|自动驾驶汽车。根据狡猾的大胆计划，甚至存款也会增加。决算哄骗要求。愤怒的
7 | 8 | 8 |客户#000000008 |版本号为I0B10bB0AymmC，版本号为0PrRYBCP1yGJ8xcBPmWhl5 |版本号为17 |版本号为27-147-574-9335 |版本号为6819.74 |版本号为BUIL在狡猾的正规经纬仪中，兴高采烈的宫廷里。甚至经纬仪也小心翼翼地狡猾地讨价还价。
9 | 10 | 10 | 10 |客户#000000010 | 6LrEaV6KR6PLVcgl2ArL Q3rqzLzcT1版本2 | 5 | 5 | 15-741-346-9870 |检查项编号：2753.54 |检查项编号：定期存款是讨价还价的。毛皮
（5行）

presto:tpch>来自客户LIMIT 10的金额（帐户余额）；
_col0
------------
6681865.59
（1行）
```

现在，来自“客户”主题消息的所有字段都作为Presto表列可用。

###步骤7：使用实时数据

Presto可以在实时数据到达时从Kafka中查询实时数据。为了模拟一个实时数据提要，本教程将实时tweet的提要设置到Kafka中。

####设置Twitter直播动态

-下载扭扭工具

"```{.none}"
$ curl -o twistr端口号<b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/c/> <b/c/> <b/c/c/d> <b/c/d> <b/c/c/> <b/c/> <b/c>参数值设置为需要的参数值。
$ chmod 755转盘
```

-在<https://dev.twitter.com/>上创建开发者账号，设置访问和消费者Token。
-创建一个`twistr.properties`文件，并将访问和消费者密钥和秘密放入其中：

"```{.none}"
转盘.access-token-key=...转盘密钥。
转盘.access-token-secret=...转盘接入令牌。
转盘.consumer-key=...
转盘.consumer-secret=...
kafka.brokers=本地主机名称：9092
```

####在Presto上创建tweets表

在`etc/catalog/kafka.properties`文件中添加tweets表，如下所示。

"```{.none}"
连接器.name=kafka
kafka.nodes=本地主机名：9092
kafka.table-names=tpch.customer,tpch.orders,tpch.lineitem,tpch.part,tpch.suppp,tpch.supplier,tpch.地区，tpch.地区，tpch订单数量，tpch订单数量，tpch订单数量，tpch订单数量，tpch订单数量，tpch订单数量
kafka.hide-internal-columns=是否隐藏字段
```

添加Twitter动态的主题定义文件为`etc/kafka/tweets.json`：

"``` {.json}"
{
"tableName": "tweets"，
"topicName": "twitter_feed"，
"dataFormat": "json" , <网络地址格式名称>，
"key": {
"dataFormat": "原始格式"，
"字段": [
{
"name": "kafka_key"，
"dataFormat": "长数据格式"，
"type": "BIGINT"类型名称，
"hidden": "假的"
}
]
}，
"message": {
"dataFormat":"json"，
"字段": [
{
"name": "文本内容"，
"mapping": "文本格式"，
"type": "VARCHAR"
}，
{
"name": "用户名"，
"mapping": "用户名/屏幕名称"，
"type": "VARCHAR"
}，
{
"name": "语言"，
"mapping": "语言类型"，
"type": "VARCHAR"
}，
{
"name": "创建时间"，
"mapping": "创建时间"，
"type" : "时间戳"，
"dataFormat":"rfc2822"媒体数据格式
}，
{
"name": "收藏数量"，
"mapping": "收藏数量"，
"type": "BIGINT"
}，
{
"name" : "转发次数"，
"mapping": "返回次数"，
"type": "BIGINT"
}，
{
"name": "已收藏"，
"mapping": "已收藏"，
"type": "布尔类型"
}，
{
"name": "编号"，
"mapping": "id_str"，
"type": "VARCHAR"
}，
{
"name": "在大屏名称中回复"，
"mapping": "在大屏名称中回复"，
"type": "VARCHAR"
}，
{
"name": "地名"，
"mapping": "位置/完整名称"，
"type": "VARCHAR"
}
]
}
}
```

由于此表没有显式的模式名，它将被放入`default`模式中。

####动态数据

启动捻线器工具：

"```{.none}"
$ java -Dness.config.location=文件类型：$(pwd) -Dness.config=twistr <用户名> -jar <文件类型> <文件类型> <文件类型> <文件类型> <文件类型> <文件类型> <文件类型> <文件类型> <文件类型> <文件类型> <文件类型>./twistr
```

`twistr`连接到Twitter API，并将\"sample tweet\"feed馈入名为`twitter_feed`的Kafka主题。

现在对实时数据运行查询：

"```{.none}"
$ ./presto-cli --catalog kafka --schema缺省目录名称

presto:default>从tweets中选择次数(*)
_col0
-------
4467
（1行）

presto:default>从tweets中选择次数(*)
_col0
-------
4517
（1行）

presto:default>从tweets中选择次数(*)
_col0
-------
4572
（1行）

presto:default>选择kafka_key，用户名，语言，创建时间从tweets限制10；
kafka_key|用户名|lang|创建时间
--------------------+-----------------+------+-------------------------
494227746231685121 |burncaniff |中文名：中文名：中文名：中文名：中文名：中文名：中文名：2014-07-29 14:07:31.000
494227746214535169 | gu8tn | ja |时间日期时间日期时间14:07:31.000
494227746219126785 |苯丙胺|苯丙胺|苯丙胺| 2014年7月29日14时07分31秒
494227746201931777 |约斯尼斯| ht | 2014年7月29日14时07分31秒
494227746219110401 | 510咖啡馆|英文名称| 2014年7月29日14时07分31秒
494227746210332673 |仅限英文版本| Da_JuanAnd_Only | 2014-07-29 14:07:31.000
494227746193956865 |微笑_kidrauhl6 | pt | 2014年7月29日14时07分31秒
494227750426017793 | CashforeverCD |中文版本| 2014年7月29日14时07分32秒版本
494227750396653569 |电影预演|录制| 2014-07-29 14:07:32.000
494227750388256769 | jmolas | es | 2014年7月29日14时07分32秒（中文大意）
（10行）
```

现在有一个活饲料到卡夫卡，可以查询使用Presto。

###尾声：时间戳

在最后一步中设置的tweetsfeed包含一个RFC2822格式的时间戳，作为每个tweet中的`created_at`属性。

"```{.none}"
presto:default> SELECT DISTINCT json_extract_scalar（_message, '$.created_at'） ) ，表示原始日期格式
->来自tweets限制5；
raw_日期
--------------------------------
周二7月29日21:07:31+0000 2014
周二7月29日21:07:32+0000 2014
周二7月29日21:07:33+0000 2014
周二7月29日21:07:34+0000 2014
周二7月29日21:07:35+0000 2014
（5行）
```

tweets表的主题定义文件包含使用`rfc2822`转换器映射到时间戳的映射：

"```{.none}"
...
{
"name": "创建时间"，
"mapping": "创建时间"，
"type" : "时间戳"，
"dataFormat":"rfc2822"媒体数据格式
}，
...
```

这允许将原始数据映射到Presto时间戳列：

"```{.none}"
presto:default> SELECT创建时间，原始日期从(
-> SELECT已创建日期，json_extract_scalar（_message, '$.created_at'） AS原始数据日期
->发自tweets)
-> GROUP BY 1, 2限制5个群组；
创建时间| raw_date
-------------------------+--------------------------------
2014年7月29日14时07分20秒| 2014年7月29日21时07分20秒+0000
2014年7月29日14时07分21秒| 2014年7月29日21时07分21秒+0000
2014年7月29日14时07分22秒| 2014年7月29日21时07分22秒+0000分
2014年7月29日14时07分23秒| 2014年7月29日21时07分23秒+0000
2014年7月29日14时07分24秒| 2014年7月29日21时07分24秒+0000
（5行）
```

Kafka连接器包含ISO8601、RFC2822文本格式以及自新纪元以来使用秒或毫秒的基于数字的时间戳的转换器。还有一个通用的、基于文本的格式化程序，它使用Joda-Time格式字符串来解析文本列。
