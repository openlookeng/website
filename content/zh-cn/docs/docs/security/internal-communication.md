安全内部通信
=============================

Presto集群可以配置为使用安全通信。Presto节点间通信支持SSL/TLS加密。

内部SSL/TLS配置
------------------------------

SSL/TLS配置在`config.properties`文件中配置。工作节点和协调节点上的SSL/TLS使用同一套属性进行配置。集群中每个节点都需要进行配置。哪些节点
未配置，或配置错误，将无法与集群中的其他节点通信。

开启Presto内部通信SSL/TLS功能。

1、禁用HTTP端点。

> ```{.none} .
> http-server.http.enabled=开启http协议功能，则关闭http协议功能。
> ```
>
>
> **警告**
>
>可以在不关闭HTTP协议的情况下，开启HTTPS协议。大多数情况下
这是个安全漏洞。如果你确定要使用这个
>配置，您应该考虑使用防火墙来限制
>只有那些主机可以访问HTTP端点。
>允许使用。
>
    
2、配置集群使用集群节点的fqdn进行通讯。可通过以下两种方式实现：
    
-如果DNS服务配置正常，我们可以让节点使用从系统配置获得的主机名（`hostname --fqdn`）向协调器介绍自己。
    
"```{.none}"
node.internal-address-source=配置内部域名
```
    
-也可以手动指定每个节点的完全限定的主机名。这对每台主机来说都是不同的。主机应该在同一个域中，以便创建
正确的SSL/TLS证书。例如：`coordinator.example.com`，
工人们1.example.com，工人们2.example.com。
    
"```{.none}"
node.internal-address=<节点内部通信地址><节点fqdn>
```
    
3.生成Java Keystore文件。每个Presto节点必须能够连接到同一集群中的任何其他节点。可以使用每台主机的完全限定的主机名为每个主机创建唯一的证书，创建一个包含所有主机的所有公钥的密钥库。并为客户端指定它（见下面的步骤\#8）。在大多数情况下，在证书中使用通配符会更简单，如下所示。
    
> ```{.none} .
> keytool -genkeypair -alias命令示例.com -keyalg RSA -keystore <密钥库名称> <密钥库名称> <密钥库名称>.jks
>输入密钥库密码：
>再次输入新密码：
>你的姓和名是什么？
>【未知】：*.example.com
>您所在的组织单位的名称是什么？
>【未知】：
>您所在的组织名称是什么？
>【未知】：
>你的城市或地区的名字是什么？
>【未知】：
>你所在的州或省的名称是什么？
>【未知】：
>这个单位的双字母国家代码是什么？
>【未知】：
> CN=*.example.com, OU=未知， O=未知， L=未知， ST=未知， C=未知是否正确？
>[no]：是
>
>输入<Presto>的密钥密码
> （如果与keystore密码相同则返回RETURN）：
> ```
    
4、将Java Keystore File文件分发到Presto集群。

5、启用HTTPS端点。

> ```{.none} .
> http-server.https.enabled=开启https协议功能，即https协议功能。
> http-server.https.port=<服务器IP地址> <服务器端口号>
> http-server.https.keystore.path=<证书库文件路径>
> http-server.https.keystore.key=<证书库密码>
> ```

6、将discovery uri修改为https方式。

> ```{.none} .
> discovery.uri=https://<协调器fqdn>:<https端口号>
> ```

7、配置内部通信使用HTTPS协议。

> ```{.none} .
>内部通信.https.required=true
> ```

8、配置内部通信使用Java keystore文件。

> ```{.none} .
>内部通信.https.keystore.path=<证书库路径>
>内部通信.https.keystore.key=<证书库密码>
> ```

### Kerberos内部SSL/TLS通信

如果启用了[Kerberos](../security/server)认证，除了指定SSL/TLS属性外，还需要指定有效的Kerberos凭证用于内部通信。

> ```{.none} .
>内部通信.kerberos.enabled=true
> ```


**说明**

*用于内部Kerberos的服务名和keytab文件* *认证来自服务器Kerberos认证属性，* *文档在`Kerberos</security/server>`{.interpreted-text*
分别为*role="doc"}、`http.server.authentication.krb5.服务名`和`http.server.authentication.krb5.keytab`，这两个参数的作用如下：确保你*
*在工作节点上也完成Kerberos设置。内部通信的Kerberos* *principal是在* *`http.server.authentication.krb5.service-name`之后加上* *Presto运行节点的主机名和来自* *Kerberos的默认域配置的.*


SSL/TLS开启性能
--------------------------------

启用加密会影响性能。性能下降可能因环境、查询和并发度而异。

对于不需要在Presto节点之间传输太多数据的查询（例如： `SELECT count(*） FROM table`)，对性能影响可以忽略。

但是，对于需要在节点之间传输大量数据的CPU密集型查询， （例如，需要重分区的分布式联接、聚合和窗口函数），
性能影响可能相当大。根据网络流量和CPU利用率的不同，可能会有10%到100%以上的减速。

高级性能调优
---------------------------

在某些情况下，改变随机数的来源将显着提高性能。

TLS加密默认使用系统设备`/dev/urandom`作为熵源。这种设备吞吐量有限，在具有高网络带宽（例如，。InfiniBand）可能会成为瓶颈。在这种情况下，建议尝试将随机数生成器算法切换为`SHA1PRNG`，方法是在协调器和所有工作者通过`config.properties`中的`http-server.https.secure-random-algorithm`属性设置它。如下：

> ```{.none} .
> http-server.https.secure-random-algorithm=安全验证算法
> ```

请注意，此算法从阻塞`/dev/random`设备获取初始种子。对于没有足够熵来生成`SHAPRNG`算法的环境，可以通过在`jvm.config`中添加`java.security.egd`属性，将源改为`/dev/urandom`：

> ```{.none} .
> -Djava.security.egd=该文件所在路径：/dev/urandom
> ```
