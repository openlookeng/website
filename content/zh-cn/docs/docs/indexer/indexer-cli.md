#索引命令行接口

##用法

索引可执行文件将在安装中位于`bin`目录下。例如：`opt/presto-server-316/bin/index`，默认使用相对路径，必须在`bin`目录下执行。

```
使用方法：索引[-v] [--debug]【--disableLocking】--table=<table>索引，指定需要操作锁的表。
[-c=<configDirPath>]【--column=<columns>[,<columns>...】] <安装目录> <备份目录> <备份目录> <备份目录> <备份目录> <备份目录> <备份目录> <备份目录> <备份目录> <备份目录> <备份目录> <备份目录> <备份目录>。
【--partition=<分区>[,<分区>...】]...
【--type=<indexTypes>[,<indexTypes>...】]...【-p=<插件名称>】[，
<plugins>...]]... <命令> <命令>

使用此索引工具，您可以创建、显示和删除索引。

支持的索引类型：BITMAP、BLOOM、MINMAX

支持的索引存储：LOCAL、HDFS（需要在{--config}/config.properties中配置）

支持的数据源：使用ORC文件的HIVE（需要在{--config}/catalog/catalog_name.properties中配置）


<command>命令类型，如create、delete、show等；说明：删除命令
只能作用于列级。
--column=<columns>【，<columns>...】，指定列号
列，多列逗号分隔格式
--debug if开启后，每次拆分的原始数据将
也与索引一起写入文件
--disable在表级别启用默认锁定；如果
设置为false时，用户必须保证数据相同
没有被多个呼叫方同时索引
(索引不同的列或分区是并行的
允许)
--partition=<分区>【，<分区>...】
只为这些分区创建索引，逗号分隔
多分区格式
--table=<table>全限定表名
--type=<indexTypes>【，<indexTypes>...】，指定索引类型名称。
索引类型，多类型逗号分隔
(支持的类型：BLOOM、BITMAP、MINMAX
-c, --config=<配置目录>
presto et目录的根文件夹（默认为../etc）
-p, --plugins=<插件名称>[,<插件名称>...]
plugins目录或文件，默认为(default：
/预启发式索引/plugins)
-v详细
```

##示例

###创建索引

"没有"
$ ./index -v -c ../etc --表名称hive.schema.table --列名称column1,column2 --类型bloom,minmax,bitmap --分区名称p=part1创建名称
```

###显示索引

"没有"
$ ./index -v -c ../etc --表名称模式名
```

###删除索引

*注意：*索引只能在表或列级别删除，即所有索引类型都将被删除。

"没有"
$ ./index -v -c ../etc --表hive.schema.table --column第1列数据被删除
```

##资源使用说明

###内存

默认情况下，JVM MaxHeapSize会使用默认的（`java -XX:+PrintFlagsFinal -version | grep MaxHeapSize`），为了提高性能，建议增大MaxHeapSize的值。这可以是
通过设置-Xmx值：

"没有"
export JAVA_TOOL_OPTIONS="-Xmx100G"
```

在此示例中，MaxHeapSize将设置为100G。

###并行索引

如果在一台机器上为一个大表创建索引的速度太慢，则可以在不同的机器上并行为不同的分区创建索引。这需要设置--disableLocking标志并指定分区，例如：

在机器1上：

"没有"
$ ./index -v ---disableLocking c ../etc --表名称hive.schema.table --column1,column2 --type Bloom,minmax,bitmap --分区名p=分区名1名称
```

在机器2上：

"没有"
$ ./index -v ---disableLocking c ../etc --表名称hive.schema.table --column1,column2 --type Bloom,minmax,bitmap --分区名称p=分区名称2创建模式
```
