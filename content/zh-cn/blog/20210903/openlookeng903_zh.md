+++ 
title = "openLooKeng安装指导"
date = "2021-09-03"
tags = ["openLooKeng", "安装"]
categories = ["Announcement"]
author = "openLooKeng"
description = "如果您想自行配置安装openLooKeng，或者在安装过程中有一些困难，可以参考这篇博客。这是一篇来自社区小伙伴的分享，希望对您有帮助。"
+++ 



**社区代码仓：<https://gitee.com/openlookeng>**

<img src='/zh-cn/blog/20210903/cover.jpg' alt='安装配置与向导' />


## 1  软件安装
说明：需要提前手动部署jdk

### 1.1  快速部署集群脚本使用

下载安装脚本：<https://gitee.com/openlookeng/tools.git>
脚本installer目录下：

<img src='/zh-cn/blog/20210903/install01.png' alt='install01' />

部署时只需配置config.txt文件

<img src='/zh-cn/blog/20210903/install02.png' alt='install02' />

修改内容如下：

<img src='/zh-cn/blog/20210903/install03.png' alt='install03' />

修改完config.txt后执行main.sh开始部署集群

<img src='/zh-cn/blog/20210903/install04.png' alt='install04' />

main.sh执行后，openlookeng会部署在如下路径：

<img src='/zh-cn/blog/20210903/install05.png' alt='install05' />

在安装路径里存在以下几个文件：

<img src='/zh-cn/blog/20210903/install06.png' alt='install06' />


## 2  客户端使用
### 2.1  CLI使用
登录客户端命令：
`java -jar /opt/hetu-install/etc/hetu-cli-316-executable.jar --server ip:port --catalog CATALOGNAME `

`ip`：服务的节点IP

`port`：服务的端口号，默认为8090

`CATALOGNAME`：待访问的数据源，对应`/etc/hetu/catalog/`目录下的文件名

其它参数：
`--schema` ：指定`catalog`中的`schema`，后跟`schema`名称
`--user`：指定访问数据源的用户，后跟用户名
`--execute`：指定待执行的sql，后跟sql语句（sql需用双引号括起来，要带分号）
`-f`：指定sql文件，后跟sql文件名。用于不进入客户端执行sql，同-e。

### 2.2  JDBC使用
1. 获取`jdbc`的jar包`hetu-jdbc-316.jar`并放在所需要的目录；

2. 使用jdbc工具连接时， URL为：`jdbc:hetu://ip:8090`，driver class为：`io.hetu.core.jdbc.HetuDriver`，其中ip为hetu服务ip。

### 2.3  UDF 使用
#### 2.3.1  CBG UDF的集成

1. /etc/hetu/目录下上传udf函数注册文件`udf.properties`。文件格式为`function_name class_path`，如下：
    ```java
    booleanudf io.hetu.core.hive.dynamicfunctions.examples.udf.BooleanUDF
    shortudf io.hetu.core.hive.dynamicfunctions.examples.udf.ShortUDF
    byteudf io.hetu.core.hive.dynamicfunctions.examples.udf.ByteUDF
    intudf io.hetu.core.hive.dynamicfunctions.examples.udf.IntUDF
    ```

2. `${node.data-dir}`下创建`externalFunctions`文件夹，并将udf函数和依赖的类上传到该文件夹下；

3. 上传udf函数依赖的配置文件至`${node.data-dir}`中；

4. openLooKeng服务的各个节点均执行以上步骤，完成后重启服务。

#### 2.3.2  UDAF的集成
1. `${node.data-dir}`下创建externalFunctionsPlugin文件夹；

2. 将UDAF的zip包如`cbg-hive-functions-1.0-SNAPSHOT.zip`解压至`externalFunctionsPlugin`下；

3. openLooKeng服务的各个节点均执行以上步骤，完成后重启服务

### 2.4  SQL migration tool使用
1. 交互模式: `java -jar hetu-sql-migration-tool-316.jar`

<img src='/zh-cn/blog/20210903/install07.png' alt='install07' />

2. 执行模式：`java -jar hetu-sql-migration-tool-316.jar --execute` " 待转换的`hive-sql`"

<img src='/zh-cn/blog/20210903/install08.png' alt='install08' />

3. 文件模式：`java -jar hetu-sql-migration-tool-316.jar --file` 待转换的hive sql 文件 `--output` 转换后的文件目录

<img src='/zh-cn/blog/20210903/install09.png' alt='install09' />

4. 将转换后的sql在Hetu上面执行。
 
###  2.5  Web UI使用

在`coordinator`节点`config.properties`里面配置如下参数：
```java
hetu.queryeditor-ui.allow-insecure-over-http=true      --打开Web Interface,默认关闭（无法使用web 管理界面）
openlookeng.admins=lk             --指定Web 管理节点admin用户 
```   




## 3  数据源配置

### 3.1  配置文件添加数据源
#### 3.1.1  配置FI Hive数据源
可通过以下两种方法进行配置：

**方法一：服务安装前通过脚本自动配置**
1. FI集群上下载FI集群配置文件及用户凭证：
配置文件：登录FI页面，在【集群】页面点击【更多】，选择【下载客户端】。弹框中选择【仅配置文件】，点击【确定】。下载完成后解压。
用户凭证：登录FI页面，在【系统】页面选择用户，点击【更多】，点击【下载认证凭据】。弹框中点击【确定】。下载完成后解压文件。
<img src='/zh-cn/blog/20210903/install10.png' alt='install10' />

2. 将步骤1获取到的HDFS文件`core-site.xml、hdfs-site.xml`和用户认证凭据`user.keytab、  krb5.conf `以及`hosts`传至`hetu`安装包解压目录中的`client_dependencies`下；

3. 修改解压目录下的`client_dependencies/clientMainConfig`文件中的配置项：
`KRB_PRINCIPAL`：默认值修改为认证凭据对应的用户名；
`HIVE_METASTORE_URI`：默认值修改为步骤1获取的hive配置文件`hive-site.xml`中`hive.metastore.uris`的值。

之后执行install.sh脚本安装服务时，FI hive数据源会自动配置到服务各个节点上。

**方法二：服务安装后手动配置**

1. 获取FI hive配置文件及用户认证凭据，同方法一的步骤1；
2. 将步骤1获取到的HDFS文件`core-site.xml、hdfs-site.xml`和用户认证凭据`user.keytab、  krb5.conf`传至服务各个节点上；
3. `/etc/hetu/catalog`目录下创建`hive.properties`文件，写入以下内容：
    
    ```java
    connector.name=hive-hadoop2
    hive.metastore.uri=thrift://IP:21088,thrift://IP:21088   --改为步骤1获取的hive配置文件hive-site.xml中hive.metastore.uris的值
    hive.config.resources=/opt/hetu/conf/core-site.xml,/opt/hetu/conf/hdfs-site.xml    -- core-site.xml和hdfs-site.xml实际所在路径
    hive.metastore.authentication.type=KERBEROS
    hive.metastore.service.principal=hive/hadoop.hadoop.com@HADOOP.COM
    hive.metastore.client.principal=USER@HADOOP.COM     --USER改为认证凭据对应的用户名
    hive.metastore.client.keytab=/opt/hetu/conf/user.keytab     -- user.keytab文件所在路径
    hive.metastore.krb5.conf.path=/opt/hetu/conf              -- krb5.conf文件所在目录
    hive.hdfs.wire-encryption.enabled=true
    hive.collect-column-statistics-on-write=true
    hive.hdfs.authentication.type=KERBEROS
    hive.hdfs.impersonation.enabled=false
    hive.hdfs.hetu.principal=USER@HADOOP.COM     --USER改为认证凭据对应的用户名
    hive.hdfs.hetu.keytab=/opt/hetu/conf/user.keytab    -- user.keytab文件所在路径
    hive.allow-drop-table=true  ```

1. 将步骤1获取到的hosts文件中的内容添加到/ets/hosts文件中；

2. 步骤2~4每个节点都要执行，完成后重启服务


#### 3.1.2  配置开源Hive数据源

1. `HetuServer`部署完成后，进入`“/etc/hetu/catalog”`目录，编辑`“hive.properties”`文件

    ```java
    connector.name=hive-hadoop2
    hive.metastore.uri=thrift://ip:9083       --ip改为开源hive服务节点IP
    hive.allow-drop-table=true
    hive.allow-rename-table=true
    hive.allow-add-column=true
    hive.allow-drop-column=true
    hive.allow-rename-column=true
    hive.allow-comment-table=true    
    ```
2. 重启hetu服务。

#### 3.1.3  配置DC Connector

```java
connector.name=dc
connection-url=http://IP:8090    --IP改为对端hetu服务coordinate节点的IP
connection-user=root
dc.query.pushdown.enabled=false
dc.split-number=10
dc.http.commpression=false
dc.metadata.cache.ttl=10s
dc.ssl=false
```
1. Hetu服务每个节点`/etc/hetu/catalog`目录下创建`dc.properties`文件，写入以下内容：

2. 重启hetu服务。

####  3.1.4  配置Hbase数据源

1. 将Hbase服务所在的Hadoop服务的配置文件`core-site.xml、hdfs-site.xml`传至hetu服务的各个节点上；

2. `/etc/hetu/catalog`目录下创建`hbase.properties`文件，写入以下内容：
    ```java
    connector.name=hbase-connector
    hbase.zookeeper.quorum=51.2.99.141              --hbase对应的zookeeper服务器IP
    hbase.zookeeper.property.clientPort=2181        --hbase对应的zookeeper服务的端口号
    hbase.authentication.type=root
    hbase.core.site.path=/opt/hbase/core-site.xml        --core-site.xml文件所在路径
    hbase.hdfs.site.path=/opt/hbase/hdfs-site.xml         --hdfs-site.xml文件所在路径
    hbase.metastore.uri=/opt/hbase/hbasemetastore.ini    --hbase元数据存放位置，访问hbase数据源时自动生成ini文件
    ```
3. hetu服务每个节点执行完步骤1和2后重启服务。

#### 3.1.5  配置Oracle数据源

1. Hetu服务每个节点`/etc/hetu/catalog`目录下创建`oracle.properties`文件，写入以下内容：
    ```java
    connector.name=oracle
    connection-url=jdbc:oracle:thin:@ip:1521:orcl          --ip: oracle数据库IP
    connection-user=cicd_alpha_tpc                         --连接oracle服务的用户名
    connection-password=password                           --连接oracle服务用户对应的密码
    ```

2. 重启hetu服务。    
   
#### 3.1.6  配置Oracle数据源   

1. Hetu服务每个节点`/etc/hetu/catalog`目录下创建`mysql.properties`文件，写入以下内容：
    ```java
    connector.name= mysql
    connection-url= jdbc:mysql://ip: 3306           --ip: mysql数据库IP
    connection-user=DATAHUB                         --连接mysql服务的用户名
    connection-password=Huawei123                  --连接mysql服务用户对应的密码
    ```

2. 重启hetu服务。 

#### 3.1.7  配置Hana数据源

1. Hetu服务每个节点`/etc/hetu/catalog`目录下创建`hana.properties`文件，写入以下内容：
    ```java
    connector.name=hana
    connection-url=jdbc:sap://ip: 34215/datahub    --ip: hana数据库IP，datahub: hana上已存在的database
    connection-user=DATAHUB               --连接hana服务的用户名
    connection-password=Huawei123      --连接hana服务用户对应的密码
    ```

2. 重启hetu服务。 

#### 3.1.8  配置VDM Connector

1. Hetu服务每个节点/etc/hetu/目录下创建`hetu-metastore.properties`文件，写入以下内
容：
    ```java
    hetu.metastore.type=jdbc
    hetu.metastore.db.url=jdbc:mysql://ip:3306/vdmmeta    --配置vdm存储数据的库，这里使用mysql数据库，其中vdmmeta需要在mysql中提前创建
    hetu.metastore.db.user=username    -- 登陆mysql服务器的用户名
    hetu.metastore.db.password=password    --登陆mysql服务器的密码
    ```

2. Hetu服务每个节点/etc/hetu/catalog目录下创建vdm.properties文件，写入以下内容：
    ```java
    connector.name=vdm 
    ```

3. 重启河图服务。

#### 3.1.9  配置Carbondata Connector

1. Hetu服务每个节点将`mapred-site，yarn-site.xml，core-site.xml`和`hdfs-site.xml`添加到安装到`/opt/ hetu/conf`下。

2. Hetu服务每个节点`/etc /hetu /catalog`中添加`carbondata.properties`文件，写入以下内容：

    ```java
    connector.name=carbondata
    hive.metastore.uri=thrift://ip:21088     -- ip:hive数据源ip
    hive.config.resources=/opt/hetu/conf/core-site.xml,/opt/hetu/conf/hdfs-site.xml,/opt/hetu/conf/yarn-site.xml,/opt/hetu/conf/mapred-site.xml  -- 4个xml文件的存放路径
    hive.metastore.authentication.type=KERBEROS    --认证类型为KERBEROS    
    hive.metastore.service.principal=hive/hadoop.hadoop.com@HADOOP.COM
    hive.metastore.client.principal=prestouser@HADOOP.COM   -- prestouser为对接的用户
    hive.metastore.client.keytab=/opt/hetu/conf/user.keytab    -- 用户凭证存放位置
    hive.metastore.krb5.conf.path=/opt/hetu/conf        -- krb5凭证存放位置
    hive.hdfs.wire-encryption.enabled=true
    hive.collect-column-statistics-on-write=true
    hive.hdfs.authentication.type=KERBEROS
    hive.hdfs.impersonation.enabled=false
    hive.hdfs.hetu.principal=prestouser@HADOOP.COM        -- prestouser为对接的用户
    hive.hdfs.hetu.keytab=/opt/hetu/conf/user.keytab          -- 用户凭证存放位置
    hive.allow-drop-table=true        -- 以下为允许的操作权限，默认为false
    hive.allow-rename-table=true
    hive.allow-add-column=true
    hive.allow-drop-column=true
    hive.allow-rename-column=true
    hive.non-managed-table-writes-enabled=true
    ```
3. 重启河图服务。


### 3.2  动态添加数据源
#### 3.2.1  动态目录配置

1. 在所有节点`node.properties` 中添加如下内容：
    ```java
    # Root directory for storing configuration files in local disk.
    catalog.config-dir=/etc/hetu/ 
    # Root directory for storing configuration files in the shared file system.
    catalog.share.config-dir=/hetu/dynamiccatalog/
    ```

2. 在所有节点`config.properties`中添加如下内容：
    ```java
    # Whether to enable dynamic catalog
    catalog.dynamic-enabled=true
    # Interval for scanning catalogs in the shared file system, default value is 5s.
    catalog.scanner-interval=5s 
    # Maximum file size, default value is 128k.
    catalog.max-file-size=128k
    ```

3. 参考4.4.2章节配置`local-config-catalog.properties`

#### 3.2.2  配置FI Hive数据源
```java
curl --location --request POST 'http://ip:port/v1/catalog/' \--IP 为hetu coordinator ip
--header 'X-Hetu-User: admin' \
--form 'catalogInformation={
"catalogName" : "hive",
"connectorName" : "hive-hadoop2",
"properties" : {
        "hive.hdfs.impersonation.enabled" : "false",
        "hive.hdfs.authentication.type" : "KERBEROS",
        "hive.collect-column-statistics-on-write" : "true",
        "hive.metastore.service.principal" : "hive/hadoop.hadoop.com@HADOOP.COM",
        "hive.metastore.authentication.type" : "KERBEROS",
        "hive.metastore.uri" : "thrift://10.21.103.168:21088,thrift://10.21.103.29:21088",//hive配置文件hive-site.xml中hive.metastore.uris的值
        "hive.allow-drop-table" : "true",
        "hive.config.resources" : "core-site.xml,hdfs-site.xml",
        "hive.hdfs.hetu.keytab" : "user.keytab",
        "hive.metastore.krb5.conf.path" : "krb5.conf",
        "hive.metastore.client.keytab" : "user.keytab",
        "hive.metastore.client.principal" : "test@HADOOP.COM",
        "hive.hdfs.wire-encryption.enabled" : "true",
        "hive.hdfs.hetu.principal" : "test@HADOOP.COM"
        }
    }' 
--form 'catalogConfigurationFiles=@/E:/catalog/core-site.xml' 
--form 'catalogConfigurationFiles=@/E:/catalog/hdfs-site.xml' 
--form 'catalogConfigurationFiles=@/E:/catalog/user.keytab' 
--form 'globalConfigurationFiles=@/E:/catalog/krb5.conf'
```
1. Curl命令添加： 
**四个凭证在本地计算机中路径要正确，该方式参数与本地参数一致，用户凭证需放在本地，请求才能发送成功。**

2.Postman添加

```java
    Header： X-Hetu-User：admin
    Body：catalogInformation: {
        "catalogName" : "hive",
        "connectorName" : "hive-hadoop2",
        "properties" : { 
            "hive.hdfs.impersonation.enabled" : "false",
            "hive.hdfs.authentication.type" : "KERBEROS",
            "hive.collect-column-statistics-on-write" : "true",
            "hive.metastore.service.principal" : "hive/hadoop.hadoop127.0.0.1.com@HADOOP127.0.0.1.COM",
            "hive.metastore.authentication.type" : "KERBEROS",
            "hive.metastore.uri" : "thrift://192.69.2.211:21088,thrift://192.69.2.212:21088",
            "hive.allow-drop-table" : "true",
            "hive.config.resources" : "core-site.xml,hdfs-site.xml",
            "hive.hdfs.hetu.keytab" : "user.keytab", 
            "hive.metastore.krb5.conf.path" : "krb5.conf",
            "hive.metastore.client.keytab" : "user.keytab",
            "hive.metastore.client.principal" : "testdr@HADOOP127.0.0.1.COM",
            "hive.hdfs.wire-encryption.enabled" : "true",
            "hive.hdfs.hetu.principal" : "testdr@HADOOP127.0.0.1.COM",
            "connector.name" : "hive-hadoop2" 
        } 
    }
    catalogConfigurationFiles:core-site.xml/ hdfs-site.xml/ user.keytab
globalConfigurationFiles: krb5.conf
```

#### 3.2.3  配置开源Hive数据源

```java
curl -X POST   http://ip:8090/v1/catalog   ---hetu coordinator 地址
    -H 'Cache-Control: no-cache'   
    -H 'Postman-Token: 7907174a-6aaa-457e-82bb-4b5358bafc91'  
    -H 'X-Hetu-User: admin'   
    -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'  
    -F 'catalogInformation={
            "catalogName" : "hivekaiyuan",   //127.0.0.1:9083", \ip为开源hiveip
            "connector.name" : "hive-hadoop2" ,
            "hive.allow-drop-table":"true",
            "hive.allow-rename-table":"true" , 
            "hive.allow-add-column":"true" ,
            "hive.allow-drop-column":"true",
            "hive.allow-rename-column":"true",
            "hive.allow-comment-table":"true" 
        }'   
    -F 'catalogConfigurationFiles=@path/core-site.xml' 
    -F 'catalogConfigurationFiles=@path/ core-site.xml ' //地址为开源hive地址
 ```

1. Curl命令添加：

    用`postman`添加开源`hive`需要`core-site.xml、core-site.xml`这两个文件，文件需存放在本地，且本地路径填写正确
    ```java
    Header： X-Hetu-User：admin
    Body：catalogInformation：{ 
        "catalogName" : "hivekaiyuan",
        "connectorName" : "hive-hadoop2",
        "properties" : { 
            "hive.metastore.uri" : "thrift://127.0.0.1:9083",
            "connector.name" : "hive-hadoop2" ,
            "hive.allow-drop-table":"true",
            "hive.allow-rename-table":"true" ,
            "hive.allow-add-column":"true" ,
            "hive.allow-drop-column":"true",
            "hive.allow-rename-column":"true",
            "hive.allow-comment-table":"true" 
            } 
    }
    catalogConfigurationFiles: core-site.xml、core-site.xml
    ```
2. Postman添加

#### 3.2.4  配置DC Connector

1. Curl命令添加：

    ```java
    curl -X POST \
    http://ip:8090/v1/catalog \---hetu coordinator 地址
    -H 'Cache-Control: no-cache' \
    -H 'Postman-Token: e0ab436d-64a8-4427-b2a0-c9cf60ab8043' \
    -H 'X-Hetu-User: admin' \
    -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
    -F 'catalogInformation={
            "catalogName" : "dc",  
            "connectorName" : "dc",   
            "properties" : {
                "connection-url" : "http://127.0.0.1:8090", 	
                "connection-user" : "root", 		
                "dc.metadata.cache.ttl" : "10s", 		
                "dc.ssl" : "false"
            }
        }'
    --地址为dc地址
    ```
2. Postman添加
    ```java
        Header： X-Hetu-User：admin
        Body：catalogInformation：{
            "catalogName" : "dc",
            "connectorName" : "dc",
            "properties" : {
                "connection-url" : "http://127.0.0.1:8090",
                "connection-user" : "root",
                "dc.metadata.cache.ttl" : "10s",
                "dc.ssl" : "false" 
            } 
        }
    ```

#### 3.2.5  配置Hbase数据源

1. Curl命令添加：
    ```java
    curl -X POST \
    http://ip:8090/v1/catalog \---hetu coordinator 地址
    -H 'Cache-Control: no-cache' \
    -H 'Postman-Token: a87e9f54-b781-417b-ad3b-346a6a7f7d25' \
    -H 'X-Hetu-User: admin' \
    -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
    -F 'catalogInformation={
        "catalogName" : "hbase",
        "connectorName" : "hbase-connector",   
        "properties" : {
            "hbase.zookeeper.quorum" : "127.0.0.1,
            "hbase.zookeeper.property.clientPort" : "2181", 
            "hbase.authentication.type" : "root", 		
            "hbase.core.site.path" : "core-site.xml", 		
            "hbase.hdfs.site.path" : "hdfs-site.xml", 		
            "hbase.metastore.uri" : "hbasemetastore.ini"
        }
    }'
    ----地址为hbase地址----
    ```
    ```java
    Header： X-Hetu-User：admin
    Body：catalogInformation：{ 
        "catalogName" : "hbase", 
        "connectorName" : "hbase-connector",
        "properties" : { 
                "hbase.zookeeper.quorum" : "127.0.0.1",
                "hbase.zookeeper.property.clientPort" : "2181",
                "hbase.authentication.type" : "root",
                "hbase.core.site.path" : "core-site.xml",
                "hbase.hdfs.site.path" : "hdfs-site.xml",
                "hbase.metastore.uri" : "hbasemetastore.ini" 
            }
        }
    ```
2. Postman添加

#### 3.2.6  配置Oracle数据源 
1. Curl命令添加：
    ```java
    curl -X POST \
    http://ip:8090/v1/catalog \---hetu coordinator 地址
    -H 'Cache-Control: no-cache' \
    -H 'Postman-Token: 572d6f08-a921-431a-831b-9561c0dd83d9' \
    -H 'X-Hetu-User: admin' \
    -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
    -F 'catalogInformation={
            "catalogName" : "Oracle",
            "connectorName" : "oracle",
            "properties" : {
                "connection-url" : "jdbc:oracle://127.0.0.1:3306",
                "connection-user" : "root",
                "connection-password" : "Huawei@123"
            }
        }'
    地址为Oracle地址 
    ```

2. Postman添加
    ```java
    Header： X-Hetu-User：admin
    Body：catalogInformation：{ 
        "catalogName" : "Oracle",
        "connectorName" : "oracle",
        "properties" : {
            "connection-url" : "jdbc:oracle://127.0.0.1:3306",
            "connection-user" : "root",
            "connection-password" : "Huawei@123"
            }
        }'
    ```
#### 3.2.7  配置Mysql数据源
1. Curl命令添加：
    ```java
    curl -X POST \
    http://ip:8090/v1/catalog \---hetu coordinator 地址
    -H 'Cache-Control: no-cache' \
    -H 'Postman-Token: 572d6f08-a921-431a-831b-9561c0dd83d9' \
    -H 'X-Hetu-User: admin' \
    -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
    -F 'catalogInformation={   
            "catalogName" : "mysql",
            "connectorName" : "mysql",
            "properties" : {
                "connection-url" : "jdbc:mysql://127.0.0.1:3306",
                "connection-user" : "root",
                "connection-password" : "Huawei@123"
            }
        }'
    地址为MySQL ip
    ```
    ```java
    Header： X-Hetu-User：admin
    Body：catalogInformation：{ 
        "catalogName" : "mysql",
        "connectorName" : "mysql",
        "properties" : {
            "connection-url" : "jdbc:mysql://127.0.0.1:3306",
            "connection-user" : "root",
            "connection-password" : "Huawei@123"
            }
        }'

    ```
2. Postman添加


#### 3.2.8  配置Hana数据源

1. Curl命令添加：
    ```java
    curl -X POST \
    http://ip:8090/v1/catalog \---hetu coordinator 地址
    -H 'Cache-Control: no-cache' \
    -H 'Postman-Token: 572d6f08-a921-431a-831b-9561c0dd83d9' \
    -H 'X-Hetu-User: admin' \
    -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
    -F 'catalogInformation={
            "catalogName" : "hana",
            "connectorName" : "hana",
            "properties" : {
                "connection-url" : " jdbc:sap://127.0.0.1:34215/datahub",
                "connection-user" : "root",
                "connection-password" : "Huawei@123"
            }
        }'
    地址为hana地址
    ```
    ```java
    Header： X-Hetu-User：admin
    Body：catalogInformation：{
        "catalogName" : "hana",
        "connectorName" : "hana",
        "properties" : {
            "connection-url" : " jdbc:sap://127.0.0.1:34215/datahub",
            "connection-user" : "root",
            "connection-password" : "Huawei@123"
            }
    }'
    ```
2. Postman添加


## 4  特性参数配置
### 4.1  State-store参数配置

1. 所有Hetu节点的`/etc/hetu/`目录下创建`state-store.properties`，按照如下模板配置：
   
2. 重启hetu服务。
    ```java
    # For now only support hazelcast
    state-store.type=hazelcast
    # User defined state store name
    state-store.name=query
    # User defined cluster name
    # must be unique if sharing the seed store with other clusters
    state-store.cluster=cluster1

    # Hazelcast Config
    hazelcast.discovery.mode=tcp-ip
    hazelcast.discovery.port=5701
    hazelcast.discovery.tcp-ip.seeds=<member1_ip:member1_hazelcast.discovery.port>,<member2_ip:member2_hazelcast.discovery.port>,...
    hazelcast.discovery.tcp-ip.profile=hdfs-config-default

    ```
    `hazelcast.discovery.tcp-ip.seeds` 和`hazelcast.discovery.tcp-ip.profile` 任选一种配置，如果两种都配置了，则`hazelcast.discovery.tcp-ip.seeds` 生效，建议`hazelcast.discovery.tcp-ip.seeds` 配置2个地址及以上

### 4.2  Hetu metastore参数配置
```java
hetu.metastore.type=jdbc                                                    --采用jdbc方式使用metastore
hetu.metastore.db.url=jdbc:mysql://127.0.0.1:3306/hetu?createDatabaseIfNotExist=true&amp;characterEncoding=UTF-8&amp;useSSL=false                   --mysql的jdbc地址
hetu.metastore.db.user=root                          --mysql的用户名
hetu.metastore.db.password=Huawei@123             --mysql的密码
hetu.metastore.cache.ttl=0h                          --缓存时间，当前默认为4h，0h即关闭缓存
```

1. 所有Hetu节点的/etc/hetu/目录下创建hetu-metastore.properties，按照如下模板配置:
    ```
    hetu.metastore.type=hetufilesystem               --采用hdfs方式使用metastore
    hetu.metastore.hetufilesystem.profile-name=hdfs-config-default     --指定使用filesystem下的hdfs-config文件
    hetu.metastore.hetufilesystem.path=/tmp/openlookeng/metastore   --指定保存metastore的路径
    参考4.3.2章节配置hdfs-config-default.properties；
    ```

2. 重启hetu服务。

### 4.3  Hetu filesystem参数配置
/etc/hetu路径下创建目录filesystem

#### 4.3.1  hdfs-config-default.properties参数配置
1. 在`/etc/hetu/filesystem`目录下创建`hdfs-config-default.properties`文件，按照如下模板配置：
    ```java
    fs.client.type=hdfs
    hdfs.config.resources=/opt/hetu/conf/core-site.xml,/opt/hetu/conf/hdfs-site.xml   --要使用的hdfs配置文件
    hdfs.authentication.type=KERBEROS 	--认证方式
    hdfs.krb5.conf.path=/opt/hetu/conf/krb5.conf	--认证用户的krb5文件
    hdfs.krb5.keytab.path=/opt/hetu/conf/user.keytab		--认证用户的keytab文件
    hdfs.krb5.principal=hetu_test@HADOOP.COM
    fs.hdfs.impl.disable.cache=true
    ```
#### 4.3.2  hdfs-config-catalog.properties参数配置
1. 在`/etc/hetu/filesystem`目录下创建`hdfs-config-catalog.properties`文件，按照如下模板配置：
2. 如果`HDFS`禁用了`kerberos`：

    ```java
    fs.client.type=hdfs
    hdfs.config.resources=/opt/hetu/conf/core-site.xml,/opt/hetu/conf/hdfs-site.xml   --要使用的hdfs配置文件
    hdfs.authentication.type=KERBEROS 	--认证方式
    hdfs.krb5.conf.path=/opt/hetu/conf/krb5.conf	--认证用户的krb5文件
    hdfs.krb5.keytab.path=/opt/hetu/conf/user.keytab		--认证用户的keytab文件
    hdfs.krb5.principal=hetu_test@HADOOP.COM

    fs.client.type=hdfs
    hdfs.config.resources=/opt/hetu/conf/core-site.xml,/opt/hetu/conf/hdfs-site.xml
    hdfs.authentication.type=NONE
    ```
3. 本地文件系统配置：
    ```
    fs.client.type=local
    ```


### 4.4 AA 参数配置

1. 参考4.1章节配置`state-store.properties`；

2. 参考4.3.2章节配置`hdfs-config-default.properties`；

3. 在`coordinator`节点的`config.properties`文件中添加如下内容：

```java
hetu.embedded-state-store.enabled=true
hetu.multiple-coordinator.enabled=true
```
4. 在worker节点的config.properties文件中添加如下内容：
```java
hetu.multiple-coordinator.enabled=true
```
5. 重启hetu服务。


### 4.5  Global dynamic filter参数配置

1. 参考4.1章节配置`state-store.properties`。如果已配置，跳过此步骤；

2. 参考4.3.2章节配置`hdfs-config-default.properties`。如果已配置，跳过此步骤；

```java
hetu.embedded-state-store.enabled=true 
experimental.enable-dynamic-filtering=true  --当前默认值为true，可以不用配置
```

3. 在所有节点的config.properties文件中添加如下内容：


### 4.6  Execution plan cache 参数配置

1. 所有Hetu节点的`config.properties`添加如下配置，默认开启，无需额外配置

```java
experimental.enable-execution-plan-cache = true
hetu.executionplan.cache.enabled = true
hetu.executionplan.cache.limit = 10000
hetu.executionplan.cache.timeout = 86400000
```
2. 重启`hetu`服务

### 4.7  Star Tree参数配置

1. 参考4.2章节配置`hetu-metastore.properties`。如果已配置，跳过此步骤；

```java
optimizer.enable-star-tree-index=true
```

2. 在所有节点的config.properties文件中添加如下内容：

 Session配置：`set session enable_star_tree_index=true` 


### 4.8  Task Recovery参数配置

1. 参考4.3.2章节配置`hdfs-config-default.properties`。如果已配置，跳过此步骤；

```java
hetu.experimental.snapshot.profile=hdfs-config-default
```
2. 在所有节点的`config.properties`文件中添加如下内容：

 只支持session配置：`set session snapshot_enabled=true` 

### 4.9  Reuse exchange参数配置

```java
experimental.spill-enabled=true  //必须设置为true
optimizer.reuse-table-scan=true
experimental.spill-reuse-tablescan=true
```
1. 所有Hetu节点的`config.properties`添加如下配置


### 4.10  CTE（Common Table Expression）参数配置

1. 所有Hetu节点的`config.properties`添加如下配置

```
optimizer.cte-reuse-enabled=true
cte.cte-max-queue-size=1024
cte.cte-max-prefetch-queue-size=512
```
 Session配置：`set session cte_reuse_enabled=true` 

#### 4.11  Hindex参数配置

```java
hetu.heuristicindex.filter.enabled=true                                                -- index开关
hetu.heuristicindex.filter.cache.max-memory=1GB                           -- index最大缓存
hetu.heuristicindex.indexstore.uri=/tmp/index                                  -- index文件存放的位置
hetu.heuristicindex.indexstore.filesystem.profile=index-store       -- 指定使用filesystem木下的具体文件
hetu.heuristicindex.filter.cache.loading-threads=10                         --加载index是使用的最大并发线程数
hetu.heuristicindex.filter.cache.ttl=20m                                   --指定index cache失效的时间
hetu.heuristicindex.filter.cache.soft-reference=true             -- 启用此属性允许GC在内存不足时从缓存中删除条目
hetu.heuristicindex.filter.cache.loading-delay=1s             -- 在第一次执行sql预热后，延迟1s后开始加载index

```
在`etc/config.properties`中添加如下配置：

在`etc/filesystem`下创建`index-store.properties`文件，并写入如下配置：

```java
fs.client.type=hdfs               --使用hdfs方式存储index文件
hdfs.config.resources=/opt/hetu/conf/core-site3.xml,/opt/hetu/conf/hdfs-site3.xml  -- 指定使用的hdfs文件的相关路径
hdfs.authentication.type=NONE        --不使用认证
```

#### 4.12  Pushdown framework参数配置（待补充）--hanxu

下面分别时`dc，oracle，mysql，oracle，hana connector`的`pushdown`配置

```java
dc.query.pushdown.enabled=true               -- dc pushdown的开关，默认为打开的
```
在`dc.properties`里面加入如下配置：

```java
jdbc.pushdown-enabled=true               -- oracle，mysql，hana pushdown的开关，默认都是打开的，其中mysql默认时半下推，oracle和mysql为全下推
```
在`oracle.properties，mysql.properties，hana.properties`里面加入如下配置：


```java
jdbc.pushdown-module=full_pushdown              --mysql.properties里加入这个参数后，mysql可以全下推

jdbc.pushdown-module=base_pushdown              --oracle.properties，hana.properties里加入这个参数后，oracle和hana可以实现半下推
```

#### 4.13  UDF pushdown参数配置

```java
list-built-in-functions-only=false  --设置为false，可以列出外联connector函数
```
Hetu 所有节点的`config.properties`添加如下配置，默认为true：

#### 4.14  CBO-aggregation参数配置

```java
optimizer.sort-based-aggregation-enabled=true
```

`Hetu coordinator`节点的`config.properties`添加如下配置，默认关闭：

 Session配置：`set session sort_based_aggregation_enabled=true` 
相关参数：`prcnt_drivers_for_partial_aggr=5`

## 5  参数优化
### 5.1  Hetu Core相关参数
#### 5.1.1  表5-1 jvm.properties参数配置 

 表5-1 `jvm.properties`参数配置 

参数名称	默认值	建议值	参数解释
-Xmx250G	5120	availableMem *0.7	

| 参数名称 | 默认值 |      建议值       |         参数解释         |
| :------: | :----: | :---------------: | :----------------------: |
| -Xmx250G |  5120  | availableMem *0.7 | Hetu JVM进程最大可用内存 |


#### 5.1.2  表5-2 `config.properties`参数配置 

 表5-2 `config.properties`参数配置 

| 参数名称                              | 默认值               | 建议值                                      | 参数解释                         |
| ------------------------------------- | -------------------- | ------------------------------------------- | -------------------------------- |
| query.max-memory-per-node             | 5120                 | JVM * 0.7                                   | Query单节点最大可用内存          |
| query.max-total-memory-per-node       | 1                    | JVM * 0.7                                   | Query + System单节点最大可用内存 |
| query.max-memory                      | 10240                | Sum (query.max-memory-per-node) * 0.7       | Query集群最大可用内存            |
| query.max-total-memory                | 2                    | Sum (query.max-total-memory-per-node) * 0.7 | Query集群最大可用内存            |
| memory.heap-headroom-per-node         | 1                    | JVM * 0.3                                   | 系统堆单节点最大可用内存         |
| experimental.spiller-spill-path       | /tmp/hetu-sqlengine/ | 一块或多块独立的SSD硬盘                     | 磁盘吐出文件路径                 |
| experimental.max-spill-per-node       | 10GB                 | Sum(每个节点可用空间) * 50%                 | 单节点磁盘吐出文件可用空间       |
| experimental.query-max-spill-per-node | 10GB                 | 节点可用硬盘空间的80%                       | 集群磁盘吐出文件可用空间         |

表5-3 其它参数配置

| 参数名称                                   | 默认值                      | 建议值                      | 参数解释                                                                                                                                 |
| ------------------------------------------ | --------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| task.concurrency                           | 16                          | 16                          | 并行运算符的默认本地并发性, 必须是2的指数幂                                                                                              |
| task.max-worker-threads                    | CPUs * 2                    | CPUs * 2                    | 每个worker用于处理拆分的线程数                                                                                                           |
| experimental.reserved-pool-enabled         | true                        | false                       | Query使用预留内存池是否开启（根据sql查询所需要内存大小配置，大设置true，小设置false）                                                    |
| node-scheduler.max-pending-splits-per-task | 10                          | 10                          | 对于单个查询，可以为每个工作节点排队的未完成拆分数，即使该节点已经达到拆分总数的限制，此处设置为了CPU逻辑核的8倍（4倍和8倍效果相差不大） |
| node-scheduler.max-splits-per-node         | 100                         | 100                         | 每个worker节点运行的拆分总数值，此处设置为了CPU逻辑核的8倍（4倍和8倍效果相差不大）                                                       |
| distributed-index-joins-enabled            | false                       | false                       | 此属性设为True会强制重新划分用于索引的表的表。可能会减少处理时间                                                                         |
| node-scheduler.min-candidates              | 10                          | 10                          | 由调度器提出的最小的节点候选个数，以完成系统中的每一个工作，默认为10                                                                     |
| exchange.max-buffer-size                   | 32MB                        | 32MB                        | 查询中为不同stage预留的缓冲区最大值，默认为32MB                                                                                          |
| sink.max-buffer-size                       | 32MB                        | 32MB                        | 收集pipeline结果的时候的IO写缓存大小，默认为32MB                                                                                         |
| task.min-drivers                           | task.max-worker-threads * 2 | task.max-worker-threads * 2 | 每个worker节点中最少的driver数量，默认为2 * maxWorkerThreads                                                                             |


### 5.2  Connector相关参数
#### 5.2.1  Hive相关参数

表5-3 `Hive properties `参数配置

| 参数名称                                          | 默认值 | 建议值  | 参数解释                                                                                                                                                                                                                          |
| ------------------------------------------------- | ------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hive.metastore-cache-ttl                          | 0s     | 24h     | Time to live Hive metadata cache                                                                                                                                                                                                  |
| hive.metastore-refresh-interval                   | 0s     | 23h     | How often to refresh the Hive metastore cache                                                                                                                                                                                     |
| hive.metastore-cache-maximum-size                 | 10,000 | 1000000 | Hive metastore cache maximum size                                                                                                                                                                                                 |
| hive.per-transaction-metastore-cache-maximum-size | 1000   | 100000  | Hive metastore cache maximum size per transaction                                                                                                                                                                                 |
| hive.force-local-scheduling                       | false  | true    | Force splits to be scheduled on the same node as the Hadoop DataNode process serving the split data. This is useful for installations where Presto is collocated with every DataNode。hetu和数据源合部设置true；分离部署设置false |
| hive.dfs.domain-socket-path                       | NA     |         | special path in the filesystem that allows the Hetu and the DataNodes to communicate                                                                                                                                              |
| hive.allow-drop-table                             | False  |         | 允许在hive connector中删除表                                                                                                                                                                                                      |
| hive.max-partitions-per-writers=5000              | 100    |         | 向分区表中插入数据时，当分区字段的数据存在较多不同的值时，需要根据分区字段的值来设置改参数值的大小                                                                                                                                |


#### 5.2.2 DM相关优化：

| Hive参数名称                                      | 默认值 | 建议值 | 参数解释                                                                                                  |
| ------------------------------------------------- | ------ | ------ | --------------------------------------------------------------------------------------------------------- |
| delete_transactional_table_direct                 | False  |        | Direct Delete for whole partition deletes                                                                 |
| write_partition_distribution                      | False  |        | Intel X86: ensure only 1 file is created per partition For AARCH64:VACUUM TABLE catalog_sales FULL UNIFY; |
| collect_column_statistics_on_write                | Ture   |        | 如果改参数为true时，使用show stats 时会基于insert数据返回结果，如果设置为false，则不会                    |
| hive.per-transaction-metastore-cache-maximum-size | 1000   | 100000 | Hive metastore cache maximum size per transaction                                                         |
| task_writer_count                                 | 32     | 8      | 优化并发写入数据                                                                                          |


## 6  FAQ

一. 对接`FI hive`

1. 将`hdfs-site.xml`文件中的`“dfs.client.failover.proxy.provider.hacluster”`配置值改成`“org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider”`，如下所示：
```java
<property>
<name>dfs.client.failover.proxy.provider.hacluster</name>
<value>org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider</value>
</property>
```

二. LK删除大表失败，实际上表已删除

<img src='/zh-cn/blog/20210903/install11.png' alt='install11' />

<img src='/zh-cn/blog/20210903/install12.png' alt='install12' />

解决方法：
`if table is large, during drop it tries to delete partitions and all, which might be taking more than 10s , if that time is expire, then timeout happens .. in the backend table is dropped but due to timeout failure propagated error becomes different "table not found". though its deleted in the same request`

`hive.properties` 添加如下参数：
`hive.metastore-timeout=60s`


三. `Query 20210306_101831_00184_wx7j4 failed: Unable to create input format org.apache.hadoop.mapred.TextInputFormat`

解决方法：
将缺少的`hadoop-plugins-1.0.jar`打包到`hive connector plugin`中。 






<style>
table{ 
    border:1px solid #eee;
}
td,th{
    padding:10px;
    border:1px solid #eee;
}

</style>