+++
title = "openLooKeng Connector 原理"
date = "2021-03-11"
tags = ["openLooKeng","大数据" ]
archives = "2020-06"
author = "gravitys169"
description = "朋友们，如果您已经对 openLooKeng 的整体方案有了解，知道 openLooKeng 有一个Connector 来连接数据源。如果您还想更深入了解 openLooKeng Connector 的实现原理，ufolr 的原创笔记应该能帮到您。"
+++

## 前言

朋友们，如果您已经对 openLooKeng 的整体方案有了解，知道 openLooKeng 有一个Connector 来连接数据源。如果您还想更深入了解 openLooKeng Connector 的实现原理，ufolr 的原创笔记应该能帮到您。

## openLooKeng Connector 原理

### <b> 1 什么是 Connector？</b>

我们知道在整个Presto工程中所有的功能都是以插件的形式实现，而Connector则是一种负责Presto与数据源进行交互的插件，不同的数据库对应于不同的Connector。

#### <b> 1.1 SPI (Service Provider Interface) </b>

SPI是JDK内置的服务提供/发现机制，它通过在ClassPath路径下的META-INF/services/目录中定义的文件，自动加载文件里所定义的类。该机制为很多框架的扩展提供了可能，如知名的JDBC就使用了该机制。

SPI 的特点:

  - SPI 文件名为实现Service接口的全限定名

  - SPI 文件内容为实现该接口的具体文件

  - 使用 ServiceLoader.load(Class class) 动态加载 Service 接口的实现类

  - 如果 SPI 实现的类在外部Jar包中，则需要将该jar包放在当前程序的classpath下

  - Service 的实现类必须有无参构造方法

#### <b>  1.2 PrestoPlugin (插件) </b>

openLooKeng中有一个presto-spi模块，该模块即定义了openLooKeng对外暴露的SPI接口，实现对应的接口即可实现连接器、类型、函数、系统访问控制等的功能。特别的，openLooKeng的插件即实现了Plugin SPI的模块：

<font size=2>

```
ConnectorSplitSource getSplits();
```

</font>

通过在META-INF/services/io.prestosql.spi.Plugin文件中列出实现io.prestosql.spi.Plugin接口的具体类，即可使该实现通过java内置的ServiceLoader提供给openLooKeng。对于包含在 openLooKeng 源码中的插件，只要在pom.xml中包含\<packaging\>presto-plugin\</packaging\> 就会自动创建spi文件。

#### <b> 1.3 Connector </b>

Connector即连接器，是一类用于在openLooKeng中提供查询特定数据源能力的插件。即使openLooKeng尚未支持当前数据源，只要将数据源与openLooKeng期望使用的API适配，创建一个Connector，即可扩展对该数据源的支持。

Connector实例由ConnectorFactory实例创建，openLooKeng调用插件上的 get ConnectorFactory() 时会创建该 ConnectorFactory 实例。ConnectorFactory可以返回一下实例：


  - ConnectorMetadata 元数据接口，允许openLooKeng查看模式列表、表列表、列列表等元数据信息。如果要接入的数据源是非关系型数据库，则需要将数据源映射到openLooKeng的模式、表、列概念。

  - ConnectorSplitManager 分片管理器，将表的数据分区为多块，将块由openLooKeng分发到不同的工作节点处理。对于没有已分区数据的数据源，比较好的策略是针对整张表返回单个分片。

  - ConnectorHandleResolver

  - ConnectorRecordSetProvider记录集提供器，给定一个分片和一个列列表的情况下，记录集提供器将数据提供给openLooKeng执行引擎。记录集提供器创建一个RecordSet, RecordSet又相应的创建一个RecordCursor，openLooKeng使用该RecordCursor来读取每一行的值。


### <b> 2 Connector 结构 </b>

<img src="/zh-cn/blog/connector/2021-03-11-connector01.jpg">

### <b> 3 Connector 开发 </b>

#### <b> 3.1 Maven工程配置 </b>

1. 在openLooKeng源码根目录创建与Connector名对应的目录，并在该目录中创建pom.xml

2. 将当前模块加入io.hetu.core组中，版本需要和当前openLooKeng工程版本一致：

<font size=2>

```
  <parent>

    <artifactId>presto-root</artifactId>

    <groupId>io.hetu.core</groupId>

    <version>316</version>

  </parent>
```

</font>

3. 定义当前工程信息，添加packaging选项为hetu-plugin在打包编译时会将当前工程打包到heto-core的plugin目录下。

<font size=2>

```
  <artifactId>hetu-example</artifactId>

  <version>${dep.hetu.version}</version>

  <description>Hetu - Example Connector</description>

  <packaging>hetu-plugin</packaging>
```

</font>

4. 引入 SPI 依赖，每个Plugin工程都会依赖 presto-spi 模块:

<font size=2>

```
  <dependency>

    <groupId>io.hetu.core</groupId>

    <artifactId>presto-spi</artifactId>

    <scope>provided</scope>

  </dependency>
```

</font>

5. 在整个编译整个openLooKeng工程时，我们需要将自定义添加的connector也编译打包到plugin目录下，通过以下的配置即可达到我们的目的：
  
  - 在hetu core根目录下的pom.xml中，将我们新增的Connector加入到modules中。

  <font size=2>
  
  ```
    <modules>
      ……
      <module>hetu-example</module>
      ……
    </modules>
  ```

  </font>

  - 在hetu-server的 src/main/provisio/hetu.xml 配置文件中，注册新增的Connector

  <font size=2>

  ```
    <artifactSet to="plugin/hetu-example">

      <artifact id="${project.groupId}:hetu-example:zip:${project.version}">

         <unpack />
        
      </artifact>

    </artifactSet>
  ```

  </font>

经过以上步骤，新增Connector的准备工作就已经完成。在开发过程中根据具体实现使用到的类来添加依赖。Plugin使用了独立的类加载器，和其他的类是隔离的，因此Plugin可以使用不同版本的类库，区别于hetu core内部使用的版本。

Connector 的加载由 ConnectorFactory 实现。但真正能够使用该 Connector 还需要加载 Catalog，所谓Catalog就是Hetu的数据源类别，Hetu通过如下三级结构来定义数据表。

<img src="/zh-cn/blog/connector/2021-03-11-connector02.jpg">

#### <b> 3.2 非JDBC数据源 </b>

对于非JDBC数据源，我们需要根据数据源的情况，手动实现一个完整Connector的几个必须组件。

<img src="/zh-cn/blog/connector/2021-03-11-connector03.jpg">

其调用逻辑如下图:

<img src="/zh-cn/blog/connector/2021-03-11-connector04.jpg">

<b> Metadata </b>

实现io.prestosql.spi.connector.ConnectorMetadata接口，提供了对数据源元数据的管理，例如列举Schemas、Tables、Columns信息，创建表、删除表，创建视图、删除视图等一系列DDL操作。

<b> SplitManager </b>

Split详细描述了一个数据分片的具体内容，每种数据源的Split都不尽相同，数据源中定义的Split即为Source Stage中调度的Split。Split的分片合理性直接决定了Hetu读取数据源数据的效率。如果一个 Split 分片涵盖的数据量过大，数据不均匀，则会拖慢整个SQL；若过小，则会造成大量的CPU资源都耗费在调度 Split 的操作上。

Splits通过SplitManager获取，最终是通过接口io.prestosql.spi.connector.ConnectorSplitManager的实现类，也就是各个Connector的 SplitManager 获取Split，该接口包括了以下方法用于获取Split:

<font size=2>

```
ConnectorSplitSource getSplits();
```

</font>

ConnectorSplitSource为一个Connector中具体表的Split集合，主要包含以下几个方法:

<font size=2>

<pre>
<em>//批量获取Splits列表，maxSize默认为1000，Split如何组织以及每调用一次该方法如何返回ConnectorSplitBatch都由各个Connector定义</em>
</pre>

</font>

<font size=2>

```
CompletableFuture<ConnectorSplitBatch> getNextBatch(ConnectorPartitionHandle partitionHandle, int maxSize);
```

</font>

<font size=2>

<pre>
<em>//Split列表是否获取完毕</em>
</pre>

</font>

<font size=2>

```
boolean isFinished();
```
</font>

<b> RecordSetProvider </b>

获取到 Source Split 后，将其调度到具体的 Worker 节点上执行数据读取，数据读取过程需要依赖Split对应的Connector所提供的数据读取类，也就是RecordSetProvider。

数据源的RecordSetProvider均需要实现io.prestosql.spi.connector.ConnectorRecordSetProvider接口，接口定义也很简单，提供了输入参数是Split、表和表的列信息及输出为RecordSet的方法。

<font size=2>

```
RecordSet getRecordSet(

      ConnectorTransactionHandle transaction,

      ConnectorSession session,

      ConnectorSplit split,

      ConnectorTableHandle table,

      List<? extends ColumnHandle> columns);
```
</font>

其中，RecordSet为io.prestosql.spi.connector.RecordSet，其定义的方法有：

<font size=2>

```
List<Type> getColumnTypes();

RecordCursor cursor();
```

</font>

cursor方法返回的 RecordCursor 就是真正的读取数据类，其定义了 Split 的数据读取方法，针对每个Split都会创建一个RecordCursor实例。


#### <b> 3.3 JDBC 数据源 </b>


<b>1.什么是JDBC?</b>

JDBC(Java Database Connectivity),即Java数据库编程接口，是Java语言访问数据库的一种规范，是一套API。

JDBC API主要位于JDK中的java.sql包之中(JavaEE扩展内容位于javax.sql包中)，数据库的JDBC驱动即针对该数据库的JDBC API接口实现类，任意数据库厂商或者个人都可以根据JDBC规范实现自己的驱动。通过使用JDBC，JAVA开发人员可以使用相同的代码查询几乎任意一种数据库，不必考虑数据库方言。

<b>2.JDBC Connector 原理</b>

由JDBC API的定义可知，理论上我们可以通过相同的Java代码去查询任意提供了JDBC驱动的数据库。所以我们可以基于JDBC规范在openLooKeng中实现一套统一的、适配openLooKeng Connector的数据库操作逻辑，当我们在面对不同JDBC数据源时，只需要替换JDBC驱动即可以对该数据源进行操作。

<b>3.JDBC Connector 开发</b>

基于上述原理，openLooKeng提供了JDBC Connector的适配代码——JdbcPlugin，开发JDBC 数据源的Connector，最理想的状态只需要引入对应数据源的驱动即可。具体实现为：使用需要的Jdbc驱动实例构建ConnectionFactory即可。

但不同的数据源各自有各自的特殊情况，对于JDBC的支持和实现细节都可能会有些许差异，所以应对不同的数据源，我们需要在了解该数据源特性和JDBC驱动使用的基础上，对原始JDBC进行一些适配性微调。

这些适配性调整的实现也很简单，只需要我们继承JdbcPlugin中对应的类型实现自己的处理类型，重载需要调整的方法即可。

通常需要调整的类型主要有：

  - JdbcPlugin 插件入口

  - JdbcMetadata 元数据管理类

  - BaseJdbcClient 数据库交互类

  - QueryBuilder Query处理类

---

本文来源：CSDN 博客

作者：ufolr

本文已获作者授权，版权归原作者所有。

原文链接 <https://blog.csdn.net/ufolr/article/details/109749564>