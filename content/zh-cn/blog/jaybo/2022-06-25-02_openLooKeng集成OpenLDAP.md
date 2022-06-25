+++

title = "openLooKeng安全配置操作指南(二)----集成OpenLDAP"
date = "2022-06-25"
tags = ["openLooKeng", "OpenLDAP"]
archives = "2022-06"
author = "jaybo"
description = "openLooKeng集成OpenLDAP"

+++

[toc]

# 0. 环境

| Role                    | IP            | Hostname | Hostname+domain name |
| :---------------------- | :------------ | :------- | :------------------- |
| openldap、ranger、mysql | 192.168.80.40 | olk0     | olk0.example.com     |
| kerberos                | 192.168.80.41 | olk1     | olk1.example.com     |
| coordinator             | 192.168.80.42 | olk2     | olk2.example.com     |
| worker                  | 192.168.80.43 | olk3     | olk3.example.com     |



# 1. 导入证书(crt文件)到jdk

拷贝 openldap 的 /etc/openldap/cert 文件夹下的 ldap.crt 证书到 openLooKeng 集群各个节点。

``` shell
scp /etc/openldap/cert/ldap.crt 192.168.80.42:/root/hetu-server-1.4.0
scp /etc/openldap/cert/ldap.crt 192.168.80.43:/root/hetu-server-1.4.0
```

在 openLooKeng 集群各个节点使用 keytool 导入证书到 jdk。

**(密码：changeit)**

``` shell
# 导入证书
keytool -import -trustcacerts -file ldap.crt -alias ldapserver -keystore /usr/local/java/jdk1.8.0_261/jre/lib/security/cacerts

# 移除证书(无需运行此命令) 
# -delete 删除密钥库中某条目
# 格式：keytool -delete -alias 指定需删除的别名 -keystore 指定keystore -storepass 密码
keytool -delete -alias ldapserver -keystore /usr/local/java/jdk1.8.0_261/jre/lib/security/cacerts
```

**如果这步跳过，后面当输入账号和密码登录 openLooKeng，ldap 会报 TLS negotiation failure：**

``` xml
May  3 03:27:57 olk0 slapd[11426]: conn=1001 fd=19 ACCEPT from IP=192.168.80.42:48838 (IP=0.0.0.0:636)
May  3 03:27:57 olk0 slapd[11426]: conn=1001 fd=19 closed (TLS negotiation failure)
```



# 2. 生成openLooKeng的keystore

> 使用 Kerberos 和 LDAP 身份验证时，必须通过 HTTPS 访问 openLooKeng 协调节点。openLooKeng 协调节点使用`JavaKeystore<server_java_keystore>`文件进行 TLS 配置。这些密钥使用`keytool`生成，并存储在 Java 密钥库文件中，供 openLooKeng 协调节点使用。https://openlookeng.io/zh-cn/docs/docs/security/tls.html

修改 coordinator、worker 节点 hostname 和 hosts。

hostname：

``` Markdown
hostnamectl set-hostname olk0
hostnamectl set-hostname olk1
hostnamectl set-hostname olk2
hostnamectl set-hostname olk3
```

hosts：

``` Markdown
192.168.80.40 olk0 olk0.example.com
192.168.80.41 olk1 olk1.example.com
192.168.80.42 olk2 olk2.example.com
192.168.80.43 olk3 olk3.example.com
```

创建所有 coordinator 和 worker 节点**公用的 keystore**。

``` shell
keytool -genkeypair -alias openLooKeng -keyalg RSA -keystore keystore.jks -keysize 2048
```

**创建 keystore，“first and last name”选项必须填为\*.域名，如\*.example.com**（这样不用每个 openLooKeng 节点生成一遍）

![img](https://img-1256179949.cos.ap-shanghai.myqcloud.com/2021-09-24-config-01.png)

拷贝生成的 keystore.jks 到 openLookeng 集群所有节点。

``` shell
scp keystore.jks olk2:/root/hetu-server-1.4.0/
scp keystore.jks olk3:/root/hetu-server-1.4.0/
```

可验证该文件密码并查看其内容：

``` shell
keytool -list -v -keystore keystore.jks
```



# 3. 配置 config.properties

新增配置：

``` properties
# 配置config.properties增加
# vim config.properties
http-server.authentication.type=PASSWORD
http-server.https.enabled=true
http-server.https.port=8443
http-server.https.keystore.path=/root/hetu-server-1.4.0/keystore.jks
http-server.https.keystore.key=123456
```

此时 config.properties 供参考(如下为 coordinator 节点配置)：

``` properties
coordinator=true
node-scheduler.include-coordinator=false

query.max-memory=5GB
query.max-memory-per-node=1GB
query.max-total-memory-per-node=2GB

http-server.http.enabled=true
http-server.http.port=9999
discovery-server.enabled=true
discovery.uri=http://olk2.example.com:9999
#discovery.uri=https://olk2.example.com:8443

# 是否开启HTTP访问Web UI
hetu.queryeditor-ui.allow-insecure-over-http=true

http-server.authentication.type=PASSWORD
http-server.https.enabled=true
http-server.https.port=8443
http-server.https.keystore.path=/root/hetu-server-1.4.0/keystore.jks
http-server.https.keystore.key=123456
```



# 4. 配置 jvm.config

打开 etc/jvm.config，增加：

``` properties
# vim jvm.config
-Djavax.net.ssl.trustStore=/usr/local/java/jdk1.8.0_261/jre/lib/security/cacerts
-Djavax.net.ssl.trustStorePassword=changeit
```



# 5. 增加 password-authenticator.properties 配置文件

增加 etc/password-authenticator.properties 配置文件：

``` properties
# 增加password-authenticator.properties配置文件
# vim password-authenticator.properties
password-authenticator.name=ldap
ldap.url=ldaps://192.168.80.40:636
ldap.user-bind-pattern=uid=${USER},ou=People,dc=tcjf,dc=com
ldap.cache-ttl=1s
```

其中，ldap.url 为 ldap server 的地址。



# 6. 验证

## 6.1 Web UI

访问地址：https://192.168.80.42:8443/ui/login.html

> 因未关闭 HTTP 访问 Web UI，所以 HTTP 地址依然可以用： http://192.168.80.42:9999/ui/login.html

输入 ldap 中的账号和密码，点击 Log In。

<img src="https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220502194616006.png" alt="image-20220502194616006" style="zoom: 50%;" />

## 6.2 Hetu CLI

``` shell
./hetu-cli \
--server https://coordinator-ip:port \
--keystore-path /root/hetu-server-1.4.0/keystore.jks \
--keystore-password password \
--user <LDAP user> \
--password
```

(1) 使用 ip 地址访问：

``` shell
./hetu-cli \
--server https://192.168.80.42:8443 \
--keystore-path /root/hetu-server-1.4.0/keystore.jks \
--keystore-password 123456 \
--user test \
--password

#或
./hetu-cli --server https://192.168.80.42:8443 --keystore-path /root/hetu-server-1.4.0/keystore.jks --keystore-password 123456 --user test --password
```

进入后，执行 sql 会报：

``` xml
Error running command: javax.net.ssl.SSLPeerUnverifiedException: Hostname 192.168.80.42 not verified:
    certificate: sha256/rUnl0qCdFeyPJQ5dlHFtXn/ZAYPkRgYonVFkWc9d5TI=
    DN: CN=*.example.com, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown
    subjectAltNames: []
```

(2) 使用域名访问：

> 添加 ip 地址映射：
>
> ``` properties
> 192.168.80.42 olk2.example.com
> ```

``` shell
./hetu-cli \
--server https://olk2.example.com:8443 \
--keystore-path /root/hetu-server-1.4.0/keystore.jks \
--keystore-password 123456 \
--user test \
--password

#或
./hetu-cli --server https://olk2.example.com:8443 --keystore-path /root/hetu-server-1.4.0/keystore.jks --keystore-password 123456 --user test --password
```

- 当输入错误密码进入，执行 sql 会报：

  ``` xml
  Error running command: Authentication failed: Unauthorized
  ```

- 当输入正确密码进入，执行 sql 成功

## 6.3 JDBC 

使用如下连接信息：

``` shell
String url = "jdbc:lk://192.168.80.42:8443/hive/";
Properties properties = new Properties();
properties.setProperty("user", "test");
properties.setProperty("password", "123456");
properties.setProperty("SSL", "true");
properties.setProperty("SSLKeyStorePath", "D:\\keystore.jks");
properties.setProperty("SSLKeyStorePassword", "123456");
```

运行的时候要是出现如下报错：

``` xml
java.sql.SQLException: Error setting up SSL: KeyStore certificate is not yet valid: NotBefore: Mon May 02 23:42:08 CST 2022
```

先检查下运行程序的电脑和服务器的时间差，如果较大，修改服务器和电脑时间保持一致再运行。

若运行报错：

``` xml
Caused by: java.io.UncheckedIOException: javax.net.ssl.SSLPeerUnverifiedException: Hostname 192.168.80.42 not verified:
    certificate: sha256/uU1H9VEjdwlWBym1uNWTRGr3O7hNKYXslIphe2Hv1D0=
    DN: CN=*.example.com, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown
    subjectAltNames: []
```

需将 url 地址改为 ip 映射：

``` shell
String url = "jdbc:lk://olk2.example.com:8443/hive/";
```

并在 `C:\Windows\System32\drivers\etc\hosts` 添加该条映射：

``` properties
192.168.80.42 olk2.example.com
```

<img src="https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220502204118363.png" alt="image-20220502204118363" style="zoom:67%;" />

## 6.4 存在的问题: 基于HTTP访问(无需密码)依然可用

(1) Web UI

HTTP 访问地址：http://192.168.80.42:9999/ui/login.html

(2) Hetu CLI

``` shell
./hetu-cli --server http://olk2.example.com:9999 --user test
```

(3) JDBC

``` shell
String url = "jdbc:lk://olk2.example.com:9999/hive/";
Properties properties = new Properties();
properties.setProperty("user", "test");
properties.setProperty("password", "");
```

**以上三种基于 http 访问的方式（无需密码）依然可使用。**



# 7. 集成ldap成功，可先备份openLooKeng，再去集成Ranger

``` shell
cp -r hetu-server-1.4.0 hetu-server-1.4.0-ldap
```



# 参考资料

[1] [openLooKeng集成OpenLDAP（二）](https://mp.weixin.qq.com/s/daC1Rs3fy2iXBnktgB4sow)

[2] [openLooKeng AA安全配置指导（一）----对接Kerberos](https://openlookeng.io/zh-cn/blog/2021/09/24/2021-09-24-config-01.html)

[3] [openLooKeng 官网文档_Java密钥库和信任库](https://openlookeng.io/zh-cn/docs/docs/security/tls.html)

