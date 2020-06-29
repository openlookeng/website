LDAP认证
===================

通过配置Presto，可以为客户端（如`cli_ldap`{.interpreted-text role="ref"}）或JDBC、ODBC驱动启用HTTPS上的前端LDAP认证。目前只支持简单的LDAP认证机制，包括用户名和密码。Presto客户机将用户名和密码发送给协调器，协调器使用外部LDAP服务验证这些凭据。

为了给Presto启用LDAP身份验证，需要在Presto协调器上进行配置更改。不需要更改工作节点配置；仅验证从客户端到协调器的通信。但是，如果您希望使用SSL/TLS配置`/security/internal- communication`{.interpreted-text role="doc" }来保护Presto节点之间的通信安全，则请执行此操作。

Presto服务器配置
-------------------------

###环境配置

####安全LDAP协议{#ldap_server}

Presto需要安全的LDAP ( LDAPS ) ，所以请确保在LDAP服务器上启用了TLS。

####预协调器TLS配置

您需要将LDAP服务器的TLS证书导入到Presto协调器默认的Java信任库中，以保证TLS连接的安全性。您可以使用下面的示例`keytool`命令将证书`ldap_server.crt`导入到协调器上的信任库。

"```{.none}"
$ keytool -import -keystore <JAVA_HOME>/jre/lib/security/cacerts <证书所在路径> -trustcacerts <证书所在路径> -alias <证书所在路径> ldap_server <证书所在路径> -file <证书所在路径> ldap_server.crt <证书所在路径>
```

除此之外，对Presto协调器的访问应该通过HTTPS。您可以通过创建一个
协调器上的`server_java_keystore`。

### Presto协调节点配置

在将Presto协调器配置为使用LDAP身份验证和HTTPS之前，必须对环境进行下列更改。

> - `ldap_server`{.interpreted-text角色名称="ref"} <?Pub Caret?> <?> <?> <?> <?>> <?> <?>> <?> <?> <?> <?> <?> <?>> <?>的中文字符
> - `server_java_keystore`{.interpreted-text角色名称="ref"} <证书名称> <证书名称>

您还需要对Presto配置文件进行更改。LDAP认证在协调器上分为两部分进行配置。第一部分是启用HTTPS支持和密码认证
协调器的`config.properties`文件。第二部分是将LDAP配置为密码验证器插件。

####服务器配置属性

需要在coordinator的`config.properties`文件中添加的属性举例如下：

"```{.none}"
http-server.authentication.type=密码验证服务器密码验证

http-server.https.enabled=支持HTTPS协议，即支持HTTPS协议。
http-server.https.port=8443

http-server.https.keystore.path=/etc/presto_keystore.jks
http-server.https.keystore.key=证书库的密码
```

 

|属性|描述|
| :-------------------------------- | :----------------------------------------------------------- |
| `http-server.authentication.type` |开启Presto协调器密码认证功能。必须设置为`PASSWORD`。|
| `http-server.https.enabled` |开启Presto协调器HTTPS访问功能。应该设置为`true`。默认值为`false`。|
| `http-server.https.port` | HTTPS服务器的端口号。|
| `http-server.https.keystore.path` |将用于保护TLS的Java密钥库文件的位置。|
| `http-server.https.keystore.key` |密钥库的密码。必须与创建密钥库时指定的密码匹配。|



####密码验证器配置

使用LDAP协议需要配置密码认证。在协调器上创建`etc/password-authenticator.properties`文件。
示例：

"```{.none}"
密码验证方.name=ldap
ldap.url=ldaps://ldap-server:636
ldap.user-bind-pattern=<使用方法请参考下文>
```

|属性|描述|
| :----------------------- | :----------------------------------------------------------- |
| `ldap.url` |指向LDAP服务器的URL。由于Presto只允许使用安全的LDAP，所以url方案必须是`ldaps://`。|
| `ldap.user-bind-pattern` |该属性可用于为密码验证指定LDAP用户绑定字符串。该属性必须包含模式`${USER}`，在密码验证期间，该模式将被实际的用户名替换。示例：${USER}@corp.example.com`，请根据实际情况修改。|

根据LDAP服务器的实现类型，可以使用属性`ldap.user-bind-pattern`，如下所示。

根据LDAP服务器的实现类型，可以使用属性`ldap.user-bind-pattern`，如下所示。

#####活动目录

"```{.none}"
ldap.user-bind-pattern=${USER}@<服务器域名>
```

示例：

"```{.none}"
ldap.user-bind-pattern=${USER}@企业举例.com（企业绑定模式）
```

#####开放LDAP协议

"```{.none}"
ldap.user-bind-pattern=uid=${USER},<用户名的识别名称>
```

示例：

"```{.none}"
ldap.user-bind-pattern=uid=${USER},OU=美国，DC=公司名称，DC=举例，DC=com，以此类推。
```

####基于LDAP组成员关系授权

除了基本的LDAP身份验证属性之外，还可以通过设置可选的`ldap.group-auth-pattern`和`ldap.user-base-dn`属性，进一步根据组成员身份限制允许连接到Presto协调器的用户集。

|属性|描述|
| :------------------------ | :----------------------------------------------------------- |
| `ldap.user-base-dn` |尝试连接到服务器的用户的基本LDAP识别名。示例：`OU=美国，DC=公司，DC=示例，DC=com` |
| `ldap.group-auth-pattern` |该属性用于指定LDAP组成员身份授权的LDAP查询。该查询将针对LDAP服务器执行，如果成功，用户将获得授权。此属性必须包含一个模式`${USER}`，它将在组授权搜索查询中被替换为实际的用户名。见以下示例。|

根据LDAP服务器的实现类型，可以使用属性`ldap.group-auth-pattern`，如下所示。

#####活动目录

"```{.none}"
ldap.group-auth-pattern=（&(对象类=<用户的对象类>）（sAMAccountName=${USER}）（成员of=<授权用户组的dn>）
```

示例：

"```{.none}"
ldap.group-auth-pattern=（&(对象分类=人）(sAMAccountName=${USER})（memberof=CN=授权用户组，OU=亚洲，DC=公司，DC=示例，DC=com）)
```

#####开放LDAP协议

"```{.none}"
ldap.group-auth-pattern=（&(对象类=<用户所属的对象类>）（uid=${USER}）（成员of=<授权用户组的dn>）)
```

示例：

"```{.none}"
ldap.group-auth-pattern=（&(对象分类=inetOrgPerson）（uid=${USER}）（成员of=CN=授权组，OU=亚洲，DC=公司，DC=示例，DC=com）)
```

对于OpenLDAP，要使这个查询起作用，请确保启用`memberOf` [overlay] (http://www.openldap.org/doc/admin24/overlays.html)。

如果希望基于复杂的组授权搜索查询对用户进行授权，也可以使用此属性。例如，如果要授权属于多个组（在OpenLDAP中）中的任何一个组的用户，则此属性可以设置为：

"```{.none}"
ldap.group-auth-pattern=（&(|(memberOf=正常用户组，DC=公司名称，DC=公司名称）,memberOf=其他用户组， DC=com))(objectClass=inetOrgPerson(uid=${USER}) <用户名> <用户名> <用户名> <用户名> <用户名>
```

Presto CLI命令行接口
--------

###环境配置

#### TLS协议配置

使用LDAP身份验证时，应该通过HTTPS访问Presto协调器。Presto CLI可以使用`Java Keystore <server_java_keystore>`文件，也可以使用`Java Truststore <cli_java_truststore>`文件进行TLS配置。

如果您正在使用密钥存储文件，可以将它复制到客户端计算机，并用于它的TLS配置。如果您正在使用truststore，则可以使用默认的javatruststore，也可以在CLI上创建自定义truststore。我们不建议在生产中使用自签名证书。

### Presto命令行执行

除了连接到不需要LDAP身份验证的Presto协调器所需的选项之外，调用启用了LDAP支持的CLI还需要许多额外的命令行选项。您可以使用`--keystore-*`属性或`--truststore-*`属性来保护TLS连接。调用CLI的最简单方法是使用包装脚本。

"```{.none}"
#!/bin/bash

./presto \
--服务器名称https://presto-coordinator.example.com:8443 \示例服务器名称
--keystore-path <证书存放路径> /tmp/presto.jks \
--keystore-password用户密码\
--truststore-path <证书存放目录> /tmp/presto_truststore.jks <证书存放目录> \
--truststore-password用户密码\
--catalog <目录名称> \
--schema <模式名称> \
--user <LDAP用户> \
--密码
```

|选项|说明|
| :---------------------- | :----------------------------------------------------------- |
| `--server` | Presto协调器的地址和端口。端口必须设置为Presto协调器正在侦听的HTTPS连接的端口。使用LDAP认证时，Presto CLI不支持使用`http`scheme作为url。|
| `--keystore-path` |用于保护TLS的Java Keystore文件的位置。|
| `--keystore-password` |密钥库的密码。必须与创建密钥库时指定的密码匹配。|
| `--truststore-path` |用来保护TLS的Java Truststore文件的位置。|
| `--truststore-password` |信任库的密码。必须与创建信任库时指定的密码一致。|
| `--user` | LDAP用户名。对于ActiveDirectory，它应该是您的`sAMAccountName`，对于OpenLDAP，它应该是用户的`uid`。用户名，将用于替换`config.properties`中指定的属性中的`${USER}`占位符模式。|
| `--password` |提示用户输入`user`的密码。|

异常处理
---------------

### Java Keystore文件校验

验证keystore文件的密码，并使用`troubleshooting_keystore`查看其内容。

### Presto命令行下的SSL调试

如果在运行Presto CLI时遇到任何与SSL相关的错误，您可以运行CLI

使用`-Djavax.net.debug=ssl`参数进行调试。您应该使用PrestoCLI可执行jar来启用它。例：

"```{.none}"
java -Djavax.net.debug=ssl <证书路径> \<证书路径>
-jar文件夹
presto-cli-<版本号>-executable.jar <版本号> <版本号> <版本号> \
--服务器https://协调器：8443 \
<其他_cli_参数>
```

#### SSL常见错误

##### java.security.cert.CertificateException：不存在主题备用名称

当Presto协调器的证书无效，且在CLI的`--server`参数中没有您提供的IP时，就会出现此错误。您必须重新生成协调员的SSL证书，并添加适当的`SAN（主题替代名称）`。

如果`https://`使用URL中的IP地址而不是协调器证书中包含的域，则需要将SAN添加到此证书中。且证书中不包含`SAN (Subject Alternative Name)`参数，其对应的IP地址作为备选属性。

#### JDK升级认证或SSL错误

从JDK 8u181版本开始，为了提高LDAPS（安全的LDAP over TLS）连接的健壮性，默认启用了端点识别算法。参见版本说明书
【这里】（https://www.oracle.com/technetwork/java/javase/8u181-relnotes-4479407.html#JDK-8200666.）来查看此文件的内容，如果内容不正确，请手动修改。
Presto协调器（运行在JDK版本\>= 8u181）上的同一个LDAP服务器证书，以前能够成功连接到LDAPS服务器，现在可能失败，并出现以下错误：

"```{.none}"
javax.naming.CommunicationException：简单绑定失败：ldapserver：
【根异常：javax.net.ssl.SSLHandshakeException异常：java.security.cert.CertificateException异常：找不到与ldapserver匹配的主题备用DNS名称】
```

如果要暂时禁用端点识别，可以添加

property`-Dcom.sun.jndi.ldap.object.disableEndpointIdentification=true`对应的配置文件为Presto\的jvm.config`文件，如果不符合，请修改。但是，在生产环境中，我们建议通过重新生成LDAP服务器证书来修复该问题，使证书`SAN（主题备用名称）`或证书主题名称与LDAP服务器匹配。
