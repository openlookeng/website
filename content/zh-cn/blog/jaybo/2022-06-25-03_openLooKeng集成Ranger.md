+++

title = "openLooKeng安全配置操作指南(三)----集成Ranger"
date = "2022-06-25"
tags = ["openLooKeng", "Ranger"]
archives = "2022-06"
author = "jaybo"
description = "openLooKeng集成Ranger"

+++

[toc]

# 0. 环境

| Role                    | IP            | Hostname | Hostname+domain name |
| :---------------------- | :------------ | :------- | :------------------- |
| openldap、ranger、mysql | 192.168.80.40 | olk0     | olk0.example.com     |
| kerberos                | 192.168.80.41 | olk1     | olk1.example.com     |
| coordinator             | 192.168.80.42 | olk2     | olk2.example.com     |
| worker                  | 192.168.80.43 | olk3     | olk3.example.com     |



# 1. 编译 Ranger

由于 Ranger 不提供二进制安装包，故需要 maven 编译，如何编译 Ranger 不做本文重点。

反正最后编译成功后会得到如下一些 tar.gz 包（图片来源网络）：

<img src="https://img-1256179949.cos.ap-shanghai.myqcloud.com/1721786ce564b553tplv-t2oaga2asx-zoom-in-crop-mark1304000.awebp" alt="在这里插入图片描述" style="zoom:67%;" />

当前我们只要 ranger admin 包：

``` xml
ranger-2.1.0-admin.tar.gz
```

若需要同步 ldap 用户，还需安装 usersync，这个可以等以后再安装：

``` shell
ranger-2.1.0-usersync.tar.gz
```



# 2. 编译 openLooKeng-ranger-plugin

[openlookeng-ranger-plugin](https://gitee.com/openlookeng/openlookeng-ranger-plugin) 是为 openLooKeng 开发的 Ranger 插件，用于全面的数据安全监控和权限管理。

- 代码仓库：https://gitee.com/openlookeng/openlookeng-ranger-plugin

编译过程：

1. 从 Git 仓库检出 openlookeng-ranger-plugin 代码

   ``` shell
   git clone -b 1.4.0 https://gitee.com/openlookeng/openlookeng-ranger-plugin.git
   ```

   **本文以 openLooKeng 1.4.0 版本为例。**

2. 进入代码根目录，执行 maven 命令：

   ```shell
   mvn clean package
   ```

3. 在上述 maven  命令执行完成后，可以在 target 目录发现以下 tar.gz 文件：

   ``` xml
   ranger-2.1.0-admin-openlookeng-1.4.0-plugin.tar.gz
   ranger-2.1.0-openlookeng-1.4.0-plugin.tar.gz
   ```



# 3. 所要用到的安装包

这是这次所要用到的安装包：

``` xml
ranger-2.1.0-admin.tar.gz
ranger-2.1.0-admin-openlookeng-1.4.0-plugin.tar.gz
ranger-2.1.0-openlookeng-1.4.0-plugin.tar.gz
```

![image-20220502220722786](https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220502220722786.png)

接下来按照步骤安装即可。



# 4. 安装 Ranger Admin

## 4.1 解压 Ranger Admin

``` shell
tar -zxvf ranger-2.1.0-admin.tar.gz
```

## 4.2 安装 Ranger Admin

需要使用 root 用户，**ranger admin 依赖 MySQL、JDK**（如何安装 MySQL 和 JDK，这里略过）。

进入 ranger admin 根目录，打开 install.properties：

``` shell
cd ranger-2.1.0-admin
vim install.properties
```

修改配置：

``` properties
# 指定一个mysql的驱动，需要自己指定一个jar包
SQL_CONNECTOR_JAR=/usr/local/java/mysql-connector-java-5.1.47.jar

# 配置mysql数据库的信息, mysql账号、密码、地址
db_root_user=root
db_root_password=123456 
db_host=localhost

# 安装时会使用上面的root用户创建如下数据库
db_name=ranger
db_user=ranger
db_password=123456 #数据库密码

#登录ranger-admin的用户名密码：admin/admin123
rangerAdmin_password=admin123
rangerTagsync_password=admin123
rangerUsersync_password=admin123
keyadmin_password=admin123

#Source for Audit Store. Currently solr and elasticsearch are supported.
# * audit_store is solr
# 不使用solr做审计存储，置为空即可
audit_stoe=

# * audit_solr_url Elasticsearch Host(s). E.g. 127.0.0.1
audit_elasticsearch_urls=
audit_elasticsearch_port=
audit_elasticsearch_protocol=
audit_elasticsearch_user=
audit_elasticsearch_password=
audit_elasticsearch_index=
audit_elasticsearch_bootstrap_enabled=true

#localhost或本机ip
policymgr_external_url=http://localhost:6080 
policymgr_http_enabled=true
policymgr_https_keystore_file=
policymgr_https_keystore_keyalias=rangeradmin policymgr_https_keystore_password=123456

unix_user=ranger
unix_user_pwd=ranger
unix_group=ranger
```

使用 root 用户执行如下脚本，安装 RangerAdmin：

``` shell
./setup.sh
```

## 4.3 启动 Ranger Admin

``` shell
# stop关闭 restar重启
ews/ranger-admin-services.sh start 
#或 ews/ranger-admin start	
```

**注：服务器关机后，需重启 ranger admin 服务。**

> 可以按如下步骤设置 ranger admin 服务为开机自启：
>
> 1. 将  `/etc/rc.d/rc.local` 文标记为可执行文件（因为在CentOS 7中，`/etc/rc.d/rc.local` 文件的权限被降低了——是没有执行权限的）
>
>   ``` shell
>   chmod +x /etc/rc.d/rc.local
>   ```
>
> 2. 打开  `/etc/rc.d/rc.local` 文件，在文件末尾加入启动命令即可
>
>   ``` shell
>   /root/ranger-2.1.0-admin/ews/ranger-admin-services.sh start
>   ```
>
> 3. 可以重启服务器看看是不是开机自启了：
>
>   ``` shell
>   reboot
>   lsof -i:6080
>   ```

## 4.4 web 登录验证是否安装

访问网址：http://192.168.80.40:6080/login.jsp

- 用户名：admin
- 密码：admin123（install.properties 中设置的）

如下登录成功，表示安装成功。

<img src="https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220502224844206.png" alt="image-20220502224844206" style="zoom: 67%;" />



# 5. 安装 Ranger Admin 插件

**(1) 解压 ranger-2.1.0-admin-openlookeng-1.4.0-plugin.tar.gz**

``` shell
tar -zxvf ranger-2.1.0-admin-openlookeng-1.4.0-plugin.tar.gz
```

可以发现以下目录：

``` xml
openlookeng
service-defs
```

**(2) Ranger 服务类型定义的注册**

使用 Ranger Admin 提供的 REST API 向 Ranger 注册服务类型定义。注册后，Ranger Admin 将提供 UI 以创建服务实例（在以前的版本中称为存储库）和服务类型策略。Ranger 插件使用服务类型定义和策略来确定请求是否有访问权限以进行授权。如下示例所示，可以使用 curl 命令调用 REST API 接口注册服务：

``` shell
curl -u admin:password -X POST -H "Accept: application/json" -H "Content-Type: application/json" -d @service-defs/ranger-servicedef-openlookeng.json http://ranger-admin-host:port/service/plugins/definitions
```

eg：

``` shell
curl -u admin:admin123 -X POST -H "Accept: application/json" -H "Content-Type: application/json" -d @service-defs/ranger-servicedef-openlookeng.json http://192.168.80.40:6080/service/plugins/definitions
```

**(3) 复制 openlookeng 目录到 Ranger Admin 安装目录下的 ranger-plugins 目录** 

``` shell
scp -r openlookeng/ /root/softwares/ranger-2.1.0-admin/ews/webapp/WEB-INF/classes/ranger-plugins/
```

这时打开 Ranger Admin 可以看到多了“OPENLOOKENG”服务。

![image-20220502225652234](https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220502225652234.png)



# 6. 安装 openLooKeng 插件

**(1) 解压 ranger-2.1.0-openlookeng-1.4.0-plugin.tar.gz**

``` shell
tar -zxvf ranger-2.1.0-openlookeng-1.4.0-plugin.tar.gz
```

**(2) 适当的修改 install.properties 文件**

如下示例所示，修改了部分参数值:

``` properties
# Location of Policy Manager URL
# ranger admin 地址
POLICY_MGR_URL=http://192.168.80.40:6080

# This is the repository name created within policy manager
# 这个随便取，回头在ranger admin中新建jdbc连接的时候需要填写这个
REPOSITORY_NAME=openlookengdev

# openLooKeng component installed directory
# openLooKeng 安装目录
COMPONENT_INSTALL_DIR_NAME=/root/hetu-server-1.4.0

XAAUDIT.SOLR.ENABLE=false

# 添加该条配置，不然后面执行会报错
XAAUDIT.SUMMARY.ENABLE=false
```

**(3) 执行 ./enable-openlookeng-plugin.sh**

``` shell
./enable-openlookeng-plugin.sh
```

重启服务：

``` shell
重启 Ranger Admin 服务：ews/ranger-admin-services.sh restart
重启 openLooKeng 服务：sh launcher restart
```

![image-20220502230955452](https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220502230955452.png)



# 7. 添加 openLookeng Service

## 7.1 添加 openLooKeng Service

打开 Admin Ranger：http://192.168.80.40:6080/index.html，找到「OPENLOOKENG」点击「+」添加 Service。

输入 Service Name、Username、Password、jdbc.driverClassName、jdbc.url 这些信息：

- Username填写：

  - 未对接 openLDAP，用户任意
  - 对接了 openLDAP，填写 ldap 用户

- Passworld：对接了 openLDAP 需填写；未对接 openLDAP 不用填写。

- jdbc 填写（openLooKeng 关闭了 http 选择 ②，否则选择 ①）：

  ① 非安全openLooKeng集群：jdbc:lk://openLooKeng-IP:http-port/catalog

  ``` properties
  eg:
  jdbc:lk://192.168.80.40:9999/hive
  ```

  

  <img src="https://img-1256179949.cos.ap-shanghai.myqcloud.com/20220507141300.png" style="zoom:67%;" />

  ② 安全openLooKeng集群：jdbc:lk://openLooKeng-IP:https-port/hive?SSL=true

  ``` properties
  eg:
  jdbc:lk://192.168.80.40:8443/hive?SSL=true
  ```

<img src="https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220502232941292.png" alt="image-20220502232941292" style="zoom: 50%;" />

点击「Test Connection」可能会报如下这样错误：

``` xm
Connection Failed.
Unable to retrieve any files using given parameters, You can still save the repository and start creating policies, but you would not be able to use autocomplete for resource names. Check ranger_admin.log for more info.

org.apache.ranger.plugin.client.HadoopException: Unable to execute SQL [SHOW CATALOGS]. .
Error executing query.
javax.net.ssl.SSLHandshakeException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target.
PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target.
unable to find valid certification path to requested target.
```

忽略，点击「Save」保存。

## 7.1 验证是否添加成功

重启 openLooKeng，再打开 Ranger Admin Web 页面，点击「Adult」->「Plugins」查看，出现如下表明 openLooKeng 插件安装成功。

![image-20220502232226897](https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220502232226897.png)

点击「OPENLOOKENG」下的 openlookengdev，可以看到生成了 jdbc 连接信息中填写的 lk 用户的 Policy，该默认权限配置，包含了执行如下 sql 权限：

``` sql
select * from system.information_schema.tables;
```

后面就以该条 sql 进行验证。注：没有进行配置的用户，没有任何权限，比如 lk2、test 用户没配置，则没有任何权限。

![image-20220502234122755](https://img-1256179949.cos.ap-shanghai.myqcloud.com/image-20220502234122755.png)



# 8. 验证权限控制

(1) HTTP

访问地址：http://192.168.80.42:9999/ui/login.html

- 分别使用 lk，test 用户进入执行 sql，可以发现 test 用户没有权限

(2) HTTPS

访问地址：https://192.168.80.42:8443/ui/

- 分别使用 lk，test 用户并输入正确的密码进入执行 sql，可以发现 test 用户没有权限



# 参考资料

[1] [openLooKeng 官网文档_Ranger 访问控制](https://openlookeng.io/zh-cn/docs/docs/security/ranger-access-control.html)

[2] [大数据权限管理工具Ranger2.0.0的安装部署到使用测试（踩坑详情）](https://juejin.cn/post/6844904159930482696)
