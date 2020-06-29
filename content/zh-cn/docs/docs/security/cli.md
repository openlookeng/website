CLI接口的Kerberos认证
===========================

Presto命令行接口可以连接到启用了Kerberos身份验证的Presto协调器。

 

##环境配置

### Kerberos服务介绍

您将需要一个运行在节点上的KerberosKDC，客户机可以通过网络访问它。KDC负责对主体进行身份验证，并发布可用于启用Kerberos服务的会话密钥。KDC通常在端口88上运行，该端口是IANA为Kerberos分配的端口。

### MIT Kerberos配置介绍

Kerberos需要在客户端配置。至少需要在`/etc/krb5.conf`文件的`[realms]`节中有一个`kdc`条目。您可能还希望包含一个`admin_server`条目，并确保客户端能够到达端口749上的Kerberos管理服务器。

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

连接到Presto协调器的每个用户都需要一个Kerberos主体。您需要用[kadmin](http://web.mit.edu/kerberos/krb5-latest/doc/admin/admin_commands/kadmin_local.html)在Kerberos中创建这些用户，然后才能使用这些用户。

另外，每个用户都需要一个【keytab文件】（http://web.mit.edu/kerberos/krb5-devel/doc/basic/keytab_def.html），创建principal后，就可以用kadmin来创建keytab文件了。。

```
韩国管理学会
> addprinc -randkey某用户@示例.COM
> ktadd -k <用户名> /home/someuser/someuser.keytab <用户名> <用户名> <用户名> <用户名>
```

注意事项

ktadd命令将主键随机化。如果您刚刚创建了主体，这无关紧要。如果主体已经存在，并且现有的用户或服务依赖于能够使用密码或keytab进行验证，则使用`-norandkey`选项来**ktadd**。

### Java密码学扩展策略文件

JavaRuntimeEnvironment附带的策略文件限制可使用的加密密钥的强度。默认情况下，Kerberos使用的密钥比包含的策略文件支持的密钥要大。有两种可能的解决方案：

> -更新JCE策略文件。
> -配置Kerberos，使用强度降低的密钥。

这两个选项中，建议更新JCE策略文件。JCE策略文件可以从Oracle下载。请注意，JCE策略文件因所运行的Java主版本而异。例如，Java6策略文件不能在Java8中工作。

Java 8策略文件可以在这里找到（http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html），安装策略文件的说明包含在Z语言的`README`文件中。IP归档。如果要在系统JRE中安装策略文件，则需要管理访问权限。

### TLS使用的Java keystore文件

使用Kerberos身份验证时，必须通过https访问Presto协调器。Presto协调器使用JavaKeystore文件进行TLS配置。该文件可以复制到客户端计算机，并用于其配置。

 

## Presto命令行执行

除了连接到不需要Kerberos身份验证的Presto协调器时所需的选项之外，调用启用Kerberos支持的CLI还需要许多额外的命令行选项。调用CLI的最简单方法是使用包装脚本。

```
#!/bin/bash

./presto \
--服务器名称https://presto-coordinator.example.com:7778 \
--krb5-config-路径/etc/krb5.conf <安装目录> \
--krb5-主要部分用户@EXAMPLE.COM \
--krb5-keytab-路径/home/someuser/someuser.keytab <用户名> <密钥文件> <密钥文件路径> <密钥文件> <密钥文件> <密钥文件> <密钥文件>
--krb5-remote-service-name <远端业务名称> presto <远端业务名称> \
--keystore-path <证书存放路径> /tmp/presto.jks \
--keystore-password用户密码\
--catalog <目录名称> \
--schema <模式名称>
```

|选项|说明|
| :--------------------------- | :----------------------------------------------------------- |
| `--server` | Presto协调器的地址和端口。端口必须设置为Presto协调器正在侦听的HTTPS连接的端口。|
| `--krb5-config-path` | kerberos服务的配置文件。|
| `--krb5-principal' |向协调器进行身份验证时使用的主体。|
| `--krb5-keytab-path` |可用于验证`--krb5-principal`指定的主体的keytab的位置|
| `--krb5-remote-service-name` | Presto协调器kerberos服务的名称。|
| `--keystore-path` |用于保护TLS的Java Keystore文件的位置。|
| `--keystore-password` |密钥库的密码。必须与创建密钥库时指定的密码匹配。|

 

##故障处理

故障诊断Presto协调器适用于故障诊断CLI时，可以使用的许多相同步骤。

### kerberos附加调试信息

您可以通过在启动CLI进程时将`-Dsun.security.krb5.debug=true`作为JVM参数传递，为PrestoCLI进程启用额外的Kerberos调试信息。这样做要求通过`java`调用CLIJAR，而不是直接运行自执行的JAR。自执行jar文件不能将选项传递给JVM。

```
#!/bin/bash

java目录
-Dsun.security.krb5.debug=该参数的值为true \
-jar presto-cli-*-可执行文件.jar \
--服务器名称https://presto-coordinator.example.com:7778 \
--krb5-config-路径/etc/krb5.conf <安装目录> \
--krb5-主要部分用户@EXAMPLE.COM \
--krb5-keytab-路径/home/someuser/someuser.keytab <用户名> <密钥文件> <密钥文件路径> <密钥文件> <密钥文件> <密钥文件> <密钥文件>
--krb5-remote-service-name <远端业务名称> presto <远端业务名称> \
--keystore-path <证书存放路径> /tmp/presto.jks \
--keystore-password用户密码\
--catalog <目录名称> \
--schema <模式名称>
```

在文档中列出的为Presto协调器设置Kerberos身份验证的附加资源在解释Kerberos调试消息时可能有帮助。
