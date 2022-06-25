+++

title = "openLooKeng安全配置操作指南(三)----关闭HTTP(含Kerberos安装)"
date = "2022-06-25"
tags = ["openLooKeng", "Kerberos"]
archives = "2022-06"
author = "jaybo"
description = "openLooKeng关闭HTTP，含Kerberos安装"

+++

[toc]

# 0. 环境

| Role                    | IP            | Hostname | Hostname+domain name |
| :---------------------- | :------------ | :------- | :------------------- |
| openldap、ranger、mysql | 192.168.80.40 | olk0     | olk0.example.com     |
| kerberos                | 192.168.80.41 | olk1     | olk1.example.com     |
| coordinator             | 192.168.80.42 | olk2     | olk2.example.com     |
| worker                  | 192.168.80.43 | olk3     | olk3.example.com     |



# 1. 安装 Kerberos Server

## 1.1 安装

``` shell
yum install -y krb5-server krb5-lib krb5-workstation
```

## 1.2 修改配置文件

**配置/etc/krb5.conf**：vim /etc/krb5.conf

``` properties
# Configuration snippets may be placed in this directory as well

includedir /etc/krb5.conf.d/
[logging]
 default = FILE:/var/log/krb5libs.log
 kdc = FILE:/var/log/krb5kdc.log
 admin_server = FILE:/var/log/kadmind.log
 
[libdefaults]
 dns_lookup_realm = false
 ticket_lifetime = 24h
 renew_lifetime = 7d
 forwardable = true
 rdns = false
 pkinit_anchors = FILE:/etc/pki/tls/certs/ca-bundle.crt
 default_realm = EXAMPLE.COM
 default_ccache_name = /tmp/krb5cc_%{uid} 

[realms]
 EXAMPLE.COM = {
  kdc = host4   //kerberos服务器主机名
  admin_server = host4
 }

[domain_realm]
 .example.com = EXAMPLE.COM
 example.com = EXAMPLE.COM
```

注：

1. 修改 default_realm 与 [realms] 中命名相同；
2. kdc、admin_server 配置为本地的 hostname；
3. 配置 default_ccache_name。

**拷贝 /etc/krb5.conf 文件到 openLooKeng 集群所有节点上，config.properties 认证配置会用到。**

**配置** **/var/kerberos/krb5kdc/kdc.conf**：vim /var/kerberos/krb5kdc/kdc.conf

``` properties
[kdcdefaults]
 kdc_ports = 88
 kdc_tcp_ports = 88
 
[realms]
 EXAMPLE.COM = {
  \#master_key_type = aes256-cts
  acl_file = /var/kerberos/krb5kdc/kadm5.acl
  dict_file = /usr/share/dict/words
  admin_keytab = /var/kerberos/krb5kdc/kadm5.keytab
  supported_enctypes = aes256-cts:normal aes128-cts:normal des3-hmac-sha1:normal arcfour-hmac:normal camellia256-cts:normal camellia128-cts:normal des-hmac-sha1:normal des-cbc-md5:normal des-cbc-crc:normal
 }
```

**注：** kdc.conf 中 realm 名与 krb5.conf 相同

## 1.3 创建数据库

``` shell
/usr/sbin/kdb5_util create -r EXAMPLE.COM -s
```

其中需要设置管理员密码，创建完成会在 /var/kerberos/krb5kdc/ 下面生成 principal 文件，若重建数据库则需先删除 /var/kerberos/krb5kdc 下面 principal 相关文件，附删除命令：

``` shell
rm -rf /var/kerberos/krb5kdc/principal*
```

## 1.4 创建管理员账号

编辑 /var/kerberos/krb5kdc/kadm5.acl，vim /var/kerberos/krb5kdc/kadm5.acl，增加：

``` shell
*/admin@EXAMPLE.COM      *
```

**注：** \* 代表全部权限

## 1.5 重启Kerberos服务器

``` shell
systemctl restart krb5kdc
systemctl restart kadmin
```

服务器关机后，kerberos 服务也会关闭。可以将 kerberos 加入开机自启：

``` shell
systemctl enable krb5kdc
systemctl enable kadmin
```

## 1.6 Kerberos Client安装（若client和server部署在同台服务器，不用安装）

``` shell
yum install krb5-workstation krb5-libs krb5-auth-dialog
```

复制 kerberos server 的 /etc/krb5.conf 到 kerberos client 的 /etc/krb5.conf。

## 1.7 在客户端添加用户

为 Kerberos database 添加 administrative principals：

``` shell
kadmin.local -q "addprinc admin/admin@EXAMPLE.COM"
```

## 1.8 验证客户端可以访问KDC

``` shell
kinit admin/admin
kadmin -p 'admin/admin' -w '123456' -s 'ip4' -q 'list_principals'
```

其中，ip4 为 kerberos server 地址。



# 2. openLooKeng对接Kerberos

## 2.1 生成openLooKeng的Keytab

在装有 Kerberos 客户端的机器上执行下面语句（**生成服务名为HTTP**）

创建 principal：

``` shell
kadmin -p admin/admin -q "addprinc -randkey HTTP@EXAMPLE.COM"
kadmin -p admin/admin -q "addprinc -randkey HTTP/olk2@EXAMPLE.COM"
kadmin -p admin/admin -q "addprinc -randkey HTTP/olk3@EXAMPLE.COM"
```

生成 keytab：

``` shell
kadmin -p admin/admin -q "ktadd -k ./lk.keytab HTTP@EXAMPLE.COM"
kadmin -p admin/admin -q "ktadd -k ./lk.keytab HTTP/olk2@EXAMPLE.COM"
kadmin -p admin/admin -q "ktadd -k ./lk.keytab HTTP/olk3@EXAMPLE.COM"
```

**注：**openLooKeng 主机名必须为小写，如 olk2、olk3。所有节点主机名的 principal 都要创建。

**拷贝 lk.keytab 文件到 openLooKeng 集群所有节点上，config.properties 认证配置会用到。**

``` shell
scp lk.keytab olk2:/root/hetu-server-1.4.0/
scp lk.keytab olk3:/root/hetu-server-1.4.0/
```

## 2.2 配置openLooKeng的config.properties

所有节点进行如下修改：

1. 禁用 http 端点

   ``` shell
   http-server.http.enabled=false
   ```

2. 配置集群使用集群节点的 FQDN（全量域名）进行通信：

   ``` shell
   node.internal-address=<node fqdn>
   #eg:node.internal-address=olk2.example.com
   ```

3. 启用 HTTPS 端点（这个在对接 openLDAP 时已配置）

   ``` properties
   http-server.https.enabled=true
   http-server.https.port=<https port>
   http-server.https.keystore.path=<keystore path>
   http-server.https.keystore.key=<keystore password>
   
   #eg:
   #http-server.https.enabled=true
   #http-server.https.port=8443
   #http-server.https.keystore.path=/root/hetu-server-1.4.0/keystore.jks
   #http-server.https.keystore.key=123456
   ```

4. 将 discovery URI 修改为 HTTPS 地址

   ``` properties
   discovery.uri=https://discovery_ip:port
   #eg:discovery.uri=https://olk2.example.com:8443
   ```

5. 配置内部通信需要使用 HTTPS 协议

   ``` properties
   internal-communication.https.required=true
   ```

6. 配置内部通信使用 Java 密钥库文件

   ``` properties
   internal-communication.https.keystore.path=<keystore path>
   internal-communication.https.keystore.key=<keystore password>
   
   #eg:
   #internal-communication.https.keystore.path=/root/hetu-server-1.4.0/keystore.jks
   # internal-communication.https.keystore.key=123456
   ```

7. 配置内部通信使用 kerberos 认证

   ``` properties
   internal-communication.kerberos.enabled=true
   ```

8. 启用 kerberos 认证，并指定 keytab 和 krb5 文件

   ``` shell
   http-server.authentication.type=KERBEROS
   http.server.authentication.krb5.service-name= HTTP
   http.server.authentication.krb5.keytab=/root/hetu-server-1.4.0/lk.keytab
   http.authentication.krb5.config=/root/hetu-server-1.4.0/krb5.conf
   ```

最终 config.properties(coordinator节点)如下，供参考：

``` properties
coordinator=true
node-scheduler.include-coordinator=false

query.max-memory=5GB
query.max-memory-per-node=1GB
query.max-total-memory-per-node=2GB

http-server.http.enabled=false
http-server.http.port=9999
discovery-server.enabled=true
#discovery.uri=http://olk2.example.com:9999
discovery.uri=https://olk2.example.com:8443

hetu.queryeditor-ui.allow-insecure-over-http=true

http-server.authentication.type=PASSWORD,KERBEROS
#http-server.authentication.type=PASSWORD
http-server.https.enabled=true
http-server.https.port=8443
http-server.https.keystore.path=/root/hetu-server-1.4.0/keystore.jks
http-server.https.keystore.key=123456

node.internal-address=olk2.example.com

internal-communication.https.required=true
internal-communication.https.keystore.path=/root/hetu-server-1.4.0/keystore.jks
internal-communication.https.keystore.key=123456

internal-communication.kerberos.enabled=true

#http-server.authentication.type=KERBEROS
http.server.authentication.krb5.service-name=HTTP
http.server.authentication.krb5.keytab=/root/hetu-server-1.4.0/lk.keytab
http.authentication.krb5.config=/root/hetu-server-1.4.0/krb5.conf
```



## 2.3 配置openLooKeng的jvm.config

所有节点增加：

``` shell
-Dsun.security.krb5.debug=true
-Dlog.enable-console=true
-Djava.security.krb5.conf=/root/hetu-server-1.4.0/krb5.conf
```

> 其中 -Dsun.security.krb5.debug=true、-Dlog.enable-console=true 用于调试，可以选择关闭。



## 关于使用hive连接器报“Cannot locate KDC ”错误的问题

如果在启用了 kerberos 认证的 hive 连接器执行 sql 时，报如下错误：

``` xml
Exception javax.security.auth.login.LoginException: Cannot locate KDC
```

请将 hive 连接器用到的 krb5.conf 文件拷贝一份，打开并将本文 krb5.conf 文件中的以下两处配置添加进去：

- [realms] 配置
- [domain_realm] 配置

再将 default_realm 修改为本文 krb5 文件中的 default_realm 。如图。

<img src="https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220625152608510.png" alt="image-20220625152608510" style="zoom:67%;" />

最后在 jvm.config 中添加或修改如下配置：

``` properties
-Djava.security.krb5.conf=/root/hetu-server-1.4.0/krb5.conf
```



# 3. 验证

## 3.1 Web UI

**(1) HTTP**

基于 HTTP 访问：http://192.168.80.42:9999/ui/login.html，访问不了。[达到目的]

**(2) HTTPS**

基于 HTTPS 访问：https://192.168.80.42:8443/ui/ 或 https://olk2.example.com:8443/ui/（可访问）

- 输入正确账户和密码才能进入。

执行 sql：

``` sql
select * from system.information_schema.tables;
```

报错如下：

``` xml
javax.net.ssl.SSLPeerUnverifiedException: Hostname localhost not verified: certificate: sha256/uU1H9VEjdwlWBym1uNWTRGr3O7hNKYXslIphe2Hv1D0= DN: CN=*.example.com, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown subjectAltNames: []
```

![image-20220502234531590](https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220502234531590-16515063386493.png)

> 问官方伙伴，貌似意思是一个 bug。

## 3.2 Hetu CLI

**(1) HTTPS**

- 输入 test 用户密码，执行 sql，可以看到 test 用户没有执行该条 sql 权限

  ``` shell
  ./hetu-cli --server https://olk2.example.com:8443 --keystore-path /root/hetu-server-1.4.0/keystore.jks --keystore-password 123456 --user test --password
  ```
  
  ![image-20220502235750600](https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220502235750600.png)
  
- 输入 lk 用户密码，执行 sql，因为 lk 具有该条 sql 权限，可以看到执行结果

  ``` shell
  ./hetu-cli --server https://olk2.example.com:8443 --keystore-path /root/hetu-server-1.4.0/keystore.jks --keystore-password 123456 --user lk --password
  ```
  
  ![image-20220502235948697](https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220502235948697.png)

**(2) HTTP**

http 访问，可以看到无法连接对应端口：[达到目的]

``` shell
./hetu-cli --server http://olk2.example.com:9999 --user test
```

![image-20220502212214749](https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220502212214749.png)

## 8.3 JDBC

**(1) HTTPS**

如下基于 https 的连接方式，可用：

``` xshell
String url = "jdbc:lk://olk2.example.com:8443/hive/";
Properties properties = new Properties();
properties.setProperty("user", "test");
properties.setProperty("password", "123456");
properties.setProperty("SSL", "true");
properties.setProperty("SSLKeyStorePath", "D:\\keystore.jks");
properties.setProperty("SSLKeyStorePassword", "123456");
```

<img src="https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220503000537019.png" alt="image-20220503000537019" style="zoom: 50%;" />

可以看到 test 用户没有该权限。改为 lk 用户可以。

<img src="https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220503000658142.png" alt="image-20220503000658142" style="zoom: 80%;" />

**(2) HTTP**

基于 http 方式，可以看到无法连接对应接口：[达到目的]

``` shell
String url = "jdbc:lk://olk2.example.com:9999/hive/";
Properties properties = new Properties();
properties.setProperty("user", "test");
properties.setProperty("password", "");
```

<img src="https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220502212659562.png" alt="image-20220502212659562" style="zoom:67%;" />



# 参考资料

[1] [openLooKeng AA安全配置指导（一）----对接Kerberos](https://openlookeng.io/zh-cn/blog/2021/09/24/2021-09-24-config-01.html)

[2] [openLooKeng 官网文档_内部通信安全](https://openlookeng.io/zh-cn/docs/docs/security/internal-communication.html)
