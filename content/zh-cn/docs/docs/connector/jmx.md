JMX连接器
=============

JMX连接器提供从Presto集群中的所有节点查询JMX信息的能力。这对于监视或调试非常有用。Java管理扩展（JMX）提供了有关Java虚拟机和其中运行的所有软件的信息。Presto本身就是通过JMX大量使用的工具。

 

还可以配置这个连接器，以便定期转储所选的JMX信息，并将其存储在内存中，供以后访问。

配置说明
-------------

配置JMX Connector需要新建一个目录属性文件`etc/catalog/jmx.properties`，内容如下：

"```{.none}"
连接器.name=jmx
```

若要启用定期转储，请定义以下属性：

"```{.none}"
连接器.name=jmx
jmx.dump-tables=java.lang:type=运行时间，presto.execution.scheduler：调度器名称=节点调度器
jmx.dump-period=转储周期=10秒
jmx.max-entries=86400
```

`dump-tables`是一个逗号分隔的Managed Beans (MBean)列表，它指定每个`dump-period`将采样哪些MBean并存储在内存中。历史将有有限的"最大条目"大小。`dump-period`和`max-entries`都有一个默认值，分别是`10s`和`86400`。

 

MBean名称中的逗号需要进行转义，转义方式如下：

"```{.none}"
连接器.name=jmx
jmx.dump-tables=presto.memory:type=内存池\\，名称=通用，\
presto.memory:type=内存池\\,name=系统名称，\
presto.memory:type=内存池\\,name=保留值
```

查询JMX
------------

JMX连接器提供了两种模式。

 

第一个是“current”，它包含Presto集群中每个节点的每个MBean。您可以通过`SHOW TABLES`命令看到所有可用的MBean：

显示表从jmx.current；

MBean名称映射为非标准表名，并且必须用
在查询中引用双引号时。例如：
查询每个节点的JVM版本：

SELECT节点，vmname,vmversion虚拟机名称
FROM jmx.current.java.lang:type=运行时间"；

"```{.none}"
node | vmname | vmversion
--------------------------------------+-----------------------------------+-----------
ddc4df17-0b8e-4843-bb14-1b8af1a7451a | Java热区(TM)64位服务器虚拟机| 24.60-b09
（1行）
```

以下查询显示了每个节点的打开和最大文件描述符计数：

openfiledescriptorcount（打开文件描述符个数）,maxfiledescriptorcount（打开文件描述符个数）
FROM jmx.current.java.lang:type=操作系统类型"；

"```{.none}"
开放文件描述符个数| maxfiledescriptorcount
-------------------------+------------------------
329 | 10240
（1行）
```

通配符`*`可以与`current`模式下的表名一起使用。这允许在单个查询中匹配多个MBean对象。以下查询返回每个节点上不同Presto内存池的信息：

SELECT自由字节数，节点，对象名
from jmx.current."presto.memory:*类型=内存池*"；

"```{.none}"
自由字节|节点|对象名
------------+---------+----------------------------------------------------------
214748364 |示例| presto.memory:type=内存池，name=保留值
1073741825 |示例| presto.memory:type=内存池，名称=通用名称
858993459 |示例| presto.memory:type=内存池，名称=系统名称
（3行）
```

`history`模式包含连接器属性文件中配置的表列表。这些表的列与当前架构中的列相同，但具有存储
抓拍时间：

从jmx.history.java.lang:type=runtime中选择"时间戳","启动时间"

"```{.none}"
时间戳|运行时间
-------------------------+--------
2016-01-28 10:18:50.000 | 11420
2016-01-28 10:19:00.000 | 21422
2016-01-28 10:19:10.000 | 31412
（3行）
```
