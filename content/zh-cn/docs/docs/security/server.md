协调器Kerberos认证
===================================

可以配置Presto协调器，为客户端（例如PrestoCLI或JDBC和ODBC驱动程序）启用基于HTTPS的Kerberos身份验证。

 

为了启用Presto的Kerberos身份验证，需要在Presto协调器上进行配置更改。工作节点配置不需要更改；工作节点将继续通过未经身份验证的HTTP连接到协调器。但是，如果需要确保Presto节点之间使用SSL/TLS安全通信，则需要配置“内部通信安全”。


环境配置
-------------------------

### Kerberos服务介绍

您需要运行在节点上的Kerberos KDC , Presto协调器可以通过网络访问它。KDC负责对主体进行身份验证，并发布可用于启用Kerberos服务的会话密钥。KDC通常在端口88上运行，该端口是IANA为Kerberos分配的端口。

MIT Kerberos配置介绍

Kerberos需要在Presto协调器上配置。至少需要在`/etc/krb5.conf`文件的`[realms]`节中有一个`kdc`条目。您可能还希望包含一个`admin_server`条目，并确保Presto协调器能够到达端口749上的Kerberos管理服务器。

```
【领域】
示例.COM = {
kdc = kdc.example.com
管理员服务器= kdc.example.com
}

【域名地址】
.presto.example.com =示例示例网站
presto.example.com =网站示例
```

krb5.conf`的完整【文档】（http://web.mit.edu/kerberos/krb5-latest/doc/admin/conf_files/kdc_conf.html）由麻省理工学院Kerberos项目托管。。如果您正在使用Kerberos协议的不同实现，则需要根据您的环境修改配置。

### Kerberos主体和Keytab文件

Presto协调器需要一个Kerberos主体，将要连接到Presto协调器的用户也需要一个Kerberos主体。您需要用[kadmin](http://web.mit.edu/kerberos/krb5-latest/doc/admin/admin_commands/kadmin_local.html)在Kerberos中创建这些用户，然后才能使用这些用户。

另外，Presto协调器需要一个【keytab文件】（http://web.mit.edu/kerberos/krb5-devel/doc/basic/keytab_def.html） ，在创建了principal之后，可通过**kadmin**创建keytab文件。

```
韩国管理学会
> addprinc -randkey <用户名> presto@EXAMPLE.COM <密码>
> addprinc -randkey <密钥名称> presto/presto-coordinator.example.com@EXAMPLE.COM <密钥名称> <密钥名称> <密钥名称>
> ktadd -k <安装目录> /etc/presto/presto.keytab <产品名称> presto@EXAMPLE.COM <协议类型>
> ktadd -k /etc/presto/presto.keytab <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/c/> <b/c/> <b/c/d/> <b/c/d>示例.com@EXAMPLE.
```

**说明**

*运行ktadd**，将主键随机化。如果您刚刚创建了主体，这无关紧要。如果主体已经存在，并且现有用户或服务依赖于能够使用密码或keytab进行验证，则使用`-norandkey`选项**ktadd**。

### Java密码学扩展策略文件

JavaRuntimeEnvironment附带的策略文件限制可使用的加密密钥的强度。默认情况下，Kerberos使用的密钥比包含的策略文件支持的密钥要大。有两种可能的解决方案：

> -更新JCE策略文件。
> -配置Kerberos，使用强度降低的密钥。

这两个选项中，建议更新JCE策略文件。JCE策略文件可以从Oracle下载。请注意，JCE策略文件因所运行的Java主版本而异。例如，Java6策略文件不能在Java8中工作。

Java 8策略文件可以在这里找到（http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html），安装策略文件的说明包含在Z语言的`README`文件中。IP归档。如果要在系统JRE中安装策略文件，则需要管理访问权限。

### TLS使用的Java keystore文件

使用Kerberos身份验证时，应该通过HTTPS访问Presto协调器。您可以通过在协调器上创建用于TLS的JavaKeystore文件来实现。

 

##系统访问控制插件

启用Kerberos的Presto协调器可能需要一个系统访问控制插件来达到所需的安全级别。

 

## Presto协调节点配置

在将Presto协调器配置为使用Kerberos身份验证和HTTPS之前，必须对环境进行上述更改。在完成以下环境更改后，您可以对Presto配置文件进行更改。

——Kerberos服务介绍
——MIT Kerberos配置介绍
- Kerberos主体和Keytab文件
-用于TLS的Java密钥库文件
-系统访问控制插件

###配置文件config.properties

Kerberos认证配置在coordinator节点`config.properties`文件中。需要添加的表项如下：

```
http-server.authentication.type=基于密钥的身份验证

http.server.authentication.krb5.服务名称=presto（服务器鉴权服务名称）
http.server.authentication.krb5.principal-hostname=预共享密钥验证方式预共享密钥验证方式
http.server.authentication.krb5.keytab= <证书密码> <证书密码> <密钥密码> <密钥密码> <密钥密码> <密钥密码> <密钥密码>
http.authentication.krb5.config= <客户端登录用户名> /etc/krb5.conf <客户端登录用户名>

http-server.https.enabled=支持HTTPS协议，即支持HTTPS协议。
http-server.https.port=7778

http-server.https.keystore.path=/etc/presto_keystore.jks
http-server.https.keystore.key=证书库的密码
```

|属性|描述|
| :--------------------------------------------------- | :----------------------------------------------------------- |
| `http-server.authentication.type` | Presto协调器的认证类型。必须设置为`KERBEROS`。|
| `http.server.authentication.krb5.service-name` |普雷斯托协调器的Kerberos服务名。必须匹配Kerberos主体。|
| `http.server.authentication.krb5.principal-hostname` |普雷斯托协调器的Kerberos主机名。必须匹配Kerberos主体。该参数为可选参数。如果包含， Presto将在Kerberos主体的主机部分使用这个值，而不是机器的主机名。|
| `http.server.authentication.krb5.keytab` |可以用来对Kerberos主体进行身份验证的keytab的位置。|
| `http.authentication.krb5.config` | kerberos配置文件所在的位置。|
| `http-server.https.enabled` |开启Presto协调器HTTPS访问功能。应该设置为`true`。|
| `http-server.https.port` | HTTPS服务器的端口号。|
| `http-server.https.keystore.path` |将用于保护TLS的Java密钥库文件的位置。|
| `http-server.https.keystore.key` |密钥库的密码。必须与创建密钥库时指定的密码匹配。|

注意事项

开启HTTPS后，在Presto协调器上监控CPU使用率。如果您允许Java从大的列表中选择，那么它更喜欢CPU密集型的加密套件。启用HTTPS后，如果CPU占用率过高，可以通过设置Java的`http-server.https.included-cipher`属性，只允许使用廉价的密码算法套件。非前向安全算法默认关闭。因此，如果您想选择非FS密码，您需要将`http-server.https.excluded-cipher`属性设置为空列表，以覆盖默认的排除。

```
http-server.https.included-cipher=安全加密算法加密算法
http-server.https.excluded-cipher=
```

Java资料中列出了【支持的加密套件】（http://docs.oracle.com/javase/8/docs/technotes/guides/security/SunProviders.html#支持的加密套件）。

###访问控制配置文件

至少，`access-control.properties`文件必须包含`access-control.name`属性。所有其他配置都是针对正在配置的实现而特定的。有关详细信息，请参阅系统访问控制。

 



##故障处理

获得Kerberos身份验证工作可能具有挑战性。您可以独立地验证Presto之外的一些配置，以便在尝试解决问题时缩小您的关注范围。

### Kerberos认证

请确保Presto协调器能够通过**telnet**连接到KDC。

```
$ telnet kdc.example.com 88
```

验证使用keytab文件通过[kinit](http://web.mit.edu/kerberos/krb5-1.12/doc/user/user_commands/kinit.html)和[klist](http)成功获取工单功能是否正常链接地址：：//web.mit.edu/kerberos/krb5-1.12/doc/用户/用户命令/klist.html)

```
环境变量：$ kinit -kt /etc/presto/presto.keytab <安装目录> presto@EXAMPLE.COM <客户端IP地址>
美元klist
```

### Java Keystore文件校验

验证密钥库文件的密码，并使用Java Keystore File Verification查看其内容。

### kerberos附加调试信息

通过在Presto`jvm.config`文件中添加以下行，可以为Presto协调器进程启用额外的Kerberos调试信息

```
-Dsun.security.krb5.debug=该参数的值为true。
-Dlog.enable-console=开启日志服务
```

`-Dsun.security.krb5.debug=true`启用来自JRE Kerberos库的Kerberos调试输出。调试输出进入`stdout`,Presto重定向到日志记录系统。`-Dlog.enable-console=true`使输出到`stdout`的输出出现在日志中。

Kerberos调试输出发送到日志的信息量和有用性因身份验证失败的位置而异。异常消息和堆栈跟踪还可以提供有关问题本质的有用线索。



###额外资源

【Kerberos常见错误信息(A-M)】(http://docs.oracle.com/cd/E19253-01/816-4557/trouble-6/index.html)

【常见的Kerberos错误信息(N-Z)】(http://docs.oracle.com/cd/E19253-01/816-4557/trouble-27/index.html)

【MIT Kerberos文档：故障管理】(http://web.mit.edu/kerberos/krb5-latest/doc/admin/troubleshoot.html)
