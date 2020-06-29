Java密钥库和信任库
==============================

TLS的Java密钥库文件{#server_java_keystore}
--------------------------

使用Kerberos和LDAP身份验证时，必须通过HTTPS访问Presto协调器。Presto协调器使用`JavaKeystore<server_java_keystore>`文件进行TLS配置。这些密钥使用`keytool`{.interpreted-text role="command"}生成，并存储在Java Keystore文件中，供Presto协调器使用。

`keytool`{.interpreted-text role="command"}命令行中的别名应与Presto协调器将要使用的主体匹配。系统将提示您输入姓氏和姓氏。使用证书中的Common Name。在这种情况下，它应该是Presto协调器的非限定主机名。在下面的例子中，在确认信息正确的提示中可以看到这一点：

"```{.none}"
keytool -genkeypair -alias presto -keyalg RSA密钥库密钥库证书库证书库证书库
请输入密钥库密码：
再次输入新密码：
你姓什么？
【未知】：预协调器.example.com
您所在的组织单位名称是什么？
【未知】：
您的组织名称是什么？
【未知】：
你的城市或地区的名字是什么？
【未知】：
你所在的州或省份的名字是什么？
【未知】：
这个单位的双字母国家代码是什么？
【未知】：
CN=presto-coordinator.example.com, OU=未知， O=未知， L=未知， ST=未知， C=未知是否正确？
【no】：是

输入<presto>的密钥密码
（如果与keystore密码相同则返回RETURN）：
```

TLS对应的Java信任库文件{#cli_java_truststore}
----------------------------

信任存储文件包含受信任的TLS/SSL服务器的证书，或受信任标识服务器的证书颁发机构的证书。为了确保通过HTTPS访问Presto协调器的安全性，客户端可以配置信任库。Presto CLI要信任Presto协调器，协调器的证书必须导入到CLI的truststore中。

您可以将证书导入到默认的Java信任库，或者导入到自定义信任库。如果您选择使用默认证书，那么您应该小心，因为您可能需要删除CA的证书
不相信值得信任的。

可以使用`keytool`{.interpreted-text role="command"}将证书导入到信任库。在这个例子中，我们将把`presto_certificate.cer`导入到一个定制的信任库`presto_trust.jks`中，而您
会得到一个提示，询问该证书是否可信。

"```{.none}"
$ keytool -import -v -trustcacerts -alias presto_trust -文件名为presto_certificate.cer -keystore证书文件名为presto_trust.jks -keypass的证书文件对应的证书名称<truststore_pass>
```

异常处理
---------------

### Java keystore文件验证方法{#troubleshooting_keystore}

验证keystore文件的密码，并使用[keytool](http://docs.oracle.com/javase/8/docs/technotes/tools/windows/keytool.html)查看其内容。

"```{.none}"
$ keytool -list -v -keystore <密钥库名称> <密钥库名称> /etc/presto/presto.jks <密钥库名称>
```
