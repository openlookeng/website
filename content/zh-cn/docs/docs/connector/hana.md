Hana连接器
==============

总体介绍
--------

Hana连接器允许在外部Hana数据库中查询和创建表。这可用于在Hana和Hive等不同系统之间或在两个不同的Hana实例之间联接数据。

配置信息
--------------

###基本配置

首先，在您开始使用花环连接器之前，我们应该完成以下步骤。

- JDBC Connection详情，连接SAP HANA数据库

它应该以常规Presto连接器配置(例如。这个文件应该包含以下内容，替换连接属性以适合您的设置。

基本属性设置：

|连接器.name=hana |
| ------------------------------------------------------------ |
| connection-url=jdbc:sap://主机：端口|
| connection-user=用户名|
|连接密码=PASSWD |
| allow-drop-table=true #是否允许hana连接器丢弃表|

——添加SAP HANA驱动

SAP HANA JDBC Driver不在普通存储库中提供，因此您需要从SAP HANA下载它并手动安装到存储库中。SAP HANA JDBC Driver (ngdbc.jar)可能会安装为
部分SAP HANA客户端安装，或从SAP HANA办公网站下载安装。一旦您获得了SAP HANA JDBC驱动程序，您就可以将jdbc jar文件部署到协调器和工作节点上的Presto插件文件夹中。例如，jdbc驱动文件为ngdbc.jar，插件包目录为/usr/lib/presto/lib/plugin，则拷贝命令如下： cp ngdbc.jar
/usr/lib/presto/lib/plugin/hana重启coordinator和worker进程，hana连接器即可正常工作。

-是否开启查询下推特性。

如果您想启用hana连接器的连接器下推功能，则无需对hana连接器的下推功能做任何操作，默认情况下是打开的。但您也可以设置如下：

| hana.query.pushdown.enabled=开启状态|查询状态|下推状态|
| --------------------------------------------------- |
| #按下时为真，关闭时为假。|

###多Hana数据库或服务器

如果您要连接到多个Hana数据库，请将Hana插件的另一个实例配置为一个单独的目录。如需添加其他SAP HANA目录，请在../conf/catalog下添加其他名称的properties文件（注意后缀为.properties），例如：在../conf/catalog目录下新增一个名称为hana2.properties的文件，添加另一个名称为hana2的连接器。

通过Presto查询Hana
--------------------------

对于名为hana的SAP HANA连接器，每个SAP HANA数据库的用户都可以运行SHOW SCHEMAS通过hana连接器获取其可用的schema：

展示来自汉纳的剧本；

如果您已经拥有了这些表，您可以通过SHOW TABLES命令查看名为data的SAP HANA数据库拥有的表：

显示来自hana.data的表；

若要查看data的架构中名为hello的表中的列的列表，请使用下列方法之一：

数据.hello；
展示来自hana.data.hello的栏目；

并可以访问data的schema中的hello表：

从hana.data.hello中选择数据

连接器在这些架构中的权限是在连接属性文件中配置的用户的权限。如果用户无法访问这些表，则特定的连接器将无法访问它们。

Presto和Hana之间的映射数据类型
----------------------------------------

### Hana到Presto类型映射

目前支持以下SAP HANA Detabase类型的选择：表格显示了SAP HANA数据类型的映射关系。

数据类型投影表：

> | SAP HANA数据库类型| Presto类型| Notes |
> | :--------------------- | :----------------------------------------------------- | :----------------------- |
> |解毒剂(p, s) |解毒剂(p, s) | |
> |小型DECIMAL | DOUBLE |见小十进制映射|
> |提示|提示| |
> |小写|小写| |
> |整型|整型| |
> |大情报|大情报| |
> |真实|真实| |
> |双份|双份| |
> | FLOAT(n) | n<25 -> real, 25<=n<=53或者未声明n ->双倍| |
> |布尔|布尔| |
> | VARCHAR |可变长字符串| |
> | NVARCHAR |可变长字符串| |
> | ALPHANUM |字符串| |
> | SHORTTEXT类型| CHAR类型| |类型
> |变量|变量| |
> |日期|日期| |
> |时间|时间| |
> |时间戳|时间戳| |
> |截止时间|不涉及| |
> |黑名单|不涉及| |
> | CLOB |北美| |
> | NCLOB |不适用| |
> |文本|不适用| |
> |北信|北美| |

**说明**

小十进位映射：不会导致精度损失的排列是IEEE754double可精确表示的数字。中的详细说明：
<https://en.wikipedia.org/wiki/双精度浮点型_格式>。


### Presto到Hana类型映射

Presto支持在SAP HANA Database中创建以下类型的表。Presto到SAP HANA数据类型的映射关系。

> | Presto类型| SAP HANA数据库类型|注意事项|
> | :----------------------- | :--------------------- | :---- |
> |布尔|布尔| |
> |提示|提示| |
> |小写|小写| |
> |整型|整型| |
> |大情报|大情报| |
> |真实|真实| |
> |双份|双份| |
> |迪卡迈尔|迪卡迈尔| |
> | VARCHAR |可变长字符串| |
> | CHAR | CHAR | |
> |变量|变量| |
> | JSON |不涉及| |
> |日期|日期| |
> |时间|时间| |
> |带时区的时间| NA | |
> |时间戳|时间戳| |
> |带时区的时间戳| NA | |

###前置到Hana函数映射

支持映射为SAP HANA功能的Presto函数如下表所示。注：\"\$n\"是占位符，用来在函数中表示一个参数。

> | Presto功能\| HANA功能|注意事项| |
> | ----------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
> | DATE_ADD（单位，$1,$2） | ADD_SECONDS($2,$1)或ADD_DAYS($2,$1)或ADD_MONTHS($2,$1)或ADD_YEARS($2,$2)，表示以年为单位，表示以年为单位。$1) |当单位为微秒、微分或微小时时，对应ADD_SECONDS。当unit为△day△或△week△时，对应ADD_DAYS。当unit为∑month、∑quater时，对应ADD_MONTHS。当unit为∑year∑时，对应ADD_YEARS。|
> | CORR($1,$2) | CORR（$1,2美元） | |
> | STDDEV($1) | STDDEV($1) | |
> |变量($1) |变量($1) | |
> | ABS($1) | ABS($1) | |
> | ACOS($1) | ACOS($1) | |
> | ASIN($1) | ASIN($1) | |
> | ATAN($1) | ATAN($1) | |
> | ATAN2($1,$2) | ATAN2($1,$2) | | ($1,$2) ，表示当前费用为$1,$2，表示当前费用为$1,$2，表示当前费用为$1,$2，表示当前费用为$1，
> | CEIL($1) | CEIL($1) | |
> | CEILING($1) | CEIL($1) | |
> |套餐($1) |套餐($1) | |
> | EXP($1) | EXP($1) | |
> |地面($1) |地面($1) | |
> | LN($1) | LN($1) | |
> | LOG10($1) | LOG(10, $1) | |
> | LOG2($1) | LOG(2, $1) | |
> | LOG($1,$2) | LOG($1,$2) | |日志文件类型。
> | MOD($1,$2) | MOD($1,$2) | | ($1,$2) ，表示修改的金额大于1,2，表示修改的金额大于1,2，表示修改的金额大于2，表示修改的金额大于2。
> | POW($1,$2) | POW($1,$2) | |订单号
> | POWER($1,$2) | POWER($1,$2) | | ($1,$2) ，表示当前设备为电源供电。
> | RAND() | RAND() | |
> | RANDOM() | RAND() | |
> |向上取整($1) |向上取整($1) | |
> |向上取整($1,$2) |向上取整($1,$2) | |
> | SIGN($1) | SIGN($1) | |
> | SIN($1) | SIN($1) | |
> | SQRT($1) | SQRT($1) | |
> | TAN($1) | TAN($1) | |
> | CONCAT($1,$2) | CONCAT($1,$2) | | ($1,$2) ，表示用户付费方式，即用户付费方式。
> |长度($1) |长度($1) | |
> | LOWER($1) | LOWER($1) | |
> | LPAD($1,$2,$3) | LPAD($1,$2,$3) | |连续支付方式
> | LTRIM($1) | LTRIM($1) | |
> |替换($1,$2) |替换（$1,$2，‘’） | |
> |替换($1,$2,$3) |替换($1,$2,$3) | |
> | RPAD($1,$2,$3) | RPAD($1,$2,$3) | |代表不同的价格，即不同的价格。
> | RTRIM($1) | RTRIM($1) | |
> | STRPOS($1,$2) | LOCATE($1,$2) | |定位服务费用
> | SUBSTR($1,$2,$3) | SUBSTR($1,$2,$3) | |
> |位置($1,$2) |位置($2,$1) | |
> | TRIM($1) | TRIM($1) | |
> |超出费用($1) |超出费用($1) | |
> |年份($1) |年份（从$1开始） | |
> |月($1) |月（从$1开始） | |
> | DAY($1) | EXTRACT（从$1开始的一天） | |
> |每小时($1) |每小时从$1开始| |
> |分钟($1) |分钟从$1开始| |
> | SECOND($1) | EXTRACT（从$1开始的秒数） | |
> |星期几($1) |星期几($1) | |

**说明**

DATE\_ADD（单位，\$1,\$2）：当单位为\'秒\'，\'分钟\'或\'小时\'时，对应ADD\_SECONDS。当unit为\'day\'或\'week\'时，与ADD\_DAYS一一对应。当unit为\'month\'或\'quat\'时，对应ADD\_MONTHS。当unit为\'year\'时，对应ADD\_YEARS。


Hana sql迁移到Presto sql指南
----------------------------------

### hana和Presto的SQL语法差异

例如，hana sql中的\'map\'函数用于将行数据转换为列数据，Presto sql不支持该函数。但是您可以使用\'case\'作为替代实现。

例如，如果您有一个名为SCORES的表：

|名称|课程|分数|
| :--- | :------ | :---- |
| zs |英语| 90 |
| zs |数学| 80 |
| zs |科学| 99 |
|数学| 80 |
|是科学|99|
| ls |英语| 90 |
| ww |科学| 99 |
| ww |数学| 80 |
| ww |英语| 90 |

可以使用\'map\'函数将行数据转换为列数据：

选择
姓名，
SUM（MAP(SUBJECT, '英语'，SCORE,0）)作为"英语"，
SUM（MAP(SUBJECT, 'Math'，SCORE,0）)按"数学"排序，
SUM（MAP(SUBJECT, 'Science'，Score,0）)作为"科学"被引用
来自得分
按名称分组

在prersto中，您可以使用\'case\'作为替代实现：

hana与Presto sql语法的其他差异，请参考以下官方文档列表：

|名称|网址|
| :--- | :----------------------------------------------------------- |
| Presto | https://presto.io/docs/current/ <当前版本号> <当前版本号> <版本号> <版本号> <版本号> <版本号>
| hana | https://帮助.sap.com/viewer/7c78579ce9b14a669c1f3295b0d8ca16/华为云服务/美国语言/20ff532c751910148657c32fe3431（中文版本） a9f.html <网页名称> |

###时间依赖类型差异

使用Presto-cli工具连接Presto服务器，对时间和时间戳进行处理时，如果不带时区，返回结果给cli显示时，将取决于Presto-cli工具的启动配置。例如，假设我们以timezone用户启动Presto-cli：

java -jar -Duser.timezone=亚洲/东京-jar ./onequery-cli-316-可执行文件
--client-request-timeout 30m --服务器ip:8080 --会话遗留时间戳=false

当您处理时间和时间戳相关类型时，Presto-cli将显示带有时区的时间相关类型：

onequery>select current_time，选择当前查询时间
_col0
-------------------------
21:19:49.122亚洲/东京
onequery> select当前时区（）；
_col0
------------
亚洲/东京
（1行）

如果启动Presto-cli时没有timezone用户，则：

java -jar ./onequery-cli-316-可执行文件
--client-request-timeout 30m --服务器IP地址：8080超时时间
--session legacy_时间戳=false --catalog节点名称hana2

当您处理时间和时间戳相关类型时，Presto-cli将显示不带时区的Time相关类型。相反，它将显示
UTC/GMT时区：

onequery> select当前时区（）；
_col0
--------
+08:00
（1行）
onequery>select current_time，选择当前查询时间
_col0
---------------------
20:20:45.659 +08:00
（1行）

但是在hana中，依赖于时间的类型的行为取决于hana服务器。例如，我们直接通过jdbc启动hana客户端：

java -jar -Duser.timezone=亚洲/东京ngdbc.jar -u环境变量
database,passwd -n ip:34215 -c "从DUMMY选择当前时间"
接通了。
| |
------------
| 20:38:57 |

Hana连接器的局限性
-----------------------------

由于hana数据类型与Presto数据类型的差异，在向Presto数据类型插入hana数据类型时存在一些限制。

### Hana的十进制小数据类型

汉纳中的小十进位精度和零标度长度可变，但Presto不支持。由于这个原因，Presto将hana中的小十进位转换成了Presto中的double，这将导致一些
特殊取值范围的精度损失。

### Hana的tiny int数据类型

hana中的tiny int是一个8位无符号整数，在Presto中会导致一些精度损失。
