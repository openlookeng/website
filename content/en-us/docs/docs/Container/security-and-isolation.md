# Security and Isolation

- [Security and Isolation](#security-and-isolation)
    - [Many-to-Many User Namespaces](#many-to-many-user-namespaces)
    - [User Permission Control](#user-permission-control)
    - [proc File System Isolation \(Lxcfs\)](#proc-file-system-isolation-(lxcfs))




## Many-to-Many User Namespaces

### Function Description

User namespaces are used to map user  **root**  of a container to a common user of the host and allow the processes and user in the container \(that are unprivileged on the host\) to have privilege. This can prevent the processes in the container from escaping to the host and performing unauthorized operations. In addition, after user namespaces are used, the container and host use different UIDs and GIDs. This ensures that user resources in the container such as file descriptors are isolated from those on the host.

In system containers, you can configure the  **--user-remap**  API parameter to map user namespaces of different containers to different user namespaces on the host, isolating the user namespaces of containers.

### Parameter Description


<table><thead align="left"><tr id="en-us_topic_0182200842_row1569373816419"><th class="cellrowborder" valign="top" width="19.98%" id="mcps1.1.4.1.1"><p id="en-us_topic_0182200842_p106936387415"><a name="en-us_topic_0182200842_p106936387415"></a><a name="en-us_topic_0182200842_p106936387415"></a><strong id="b1892563793410"><a name="b1892563793410"></a><a name="b1892563793410"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="19.36%" id="mcps1.1.4.1.2"><p id="en-us_topic_0182200842_p15693173814112"><a name="en-us_topic_0182200842_p15693173814112"></a><a name="en-us_topic_0182200842_p15693173814112"></a><strong id="b1112724033420"><a name="b1112724033420"></a><a name="b1112724033420"></a>Parameter</strong></p>
</th>
<th class="cellrowborder" valign="top" width="60.660000000000004%" id="mcps1.1.4.1.3"><p id="en-us_topic_0182200842_p18217181119202"><a name="en-us_topic_0182200842_p18217181119202"></a><a name="en-us_topic_0182200842_p18217181119202"></a><strong id="b6831134117348"><a name="b6831134117348"></a><a name="b6831134117348"></a>Value Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200842_row12693163810415"><td class="cellrowborder" valign="top" width="19.98%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200842_p66931838134110"><a name="en-us_topic_0182200842_p66931838134110"></a><a name="en-us_topic_0182200842_p66931838134110"></a>isula create/run</p>
</td>
<td class="cellrowborder" valign="top" width="19.36%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200842_p08101647154218"><a name="en-us_topic_0182200842_p08101647154218"></a><a name="en-us_topic_0182200842_p08101647154218"></a>--user-remap</p>
</td>
<td class="cellrowborder" valign="top" width="60.660000000000004%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182200842_p5810124718426"><a name="en-us_topic_0182200842_p5810124718426"></a><a name="en-us_topic_0182200842_p5810124718426"></a>The parameter format is <em id="i102871144143610"><a name="i102871144143610"></a><a name="i102871144143610"></a>uid</em><strong id="b1641047103710"><a name="b1641047103710"></a><a name="b1641047103710"></a>:</strong><em id="i18921184733620"><a name="i18921184733620"></a><a name="i18921184733620"></a>gid</em><strong id="b1444618516378"><a name="b1444618516378"></a><a name="b1444618516378"></a>:</strong><em id="i1677917500365"><a name="i1677917500365"></a><a name="i1677917500365"></a>offset</em>. The parameter is described as follows:</p>
<a name="en-us_topic_0182200842_ul13732312203"></a><a name="en-us_topic_0182200842_ul13732312203"></a><ul id="en-us_topic_0182200842_ul13732312203"><li><em id="i116802057123713"><a name="i116802057123713"></a><a name="i116802057123713"></a>uid</em> and <em id="i1987117193810"><a name="i1987117193810"></a><a name="i1987117193810"></a>gid</em> must be integers greater than or equal to 0.</li><li><em id="i15289135133810"><a name="i15289135133810"></a><a name="i15289135133810"></a>offset</em> must be an integer greater than 0 and less than 65536. The value cannot be too small. Otherwise, the container cannot be started.</li><li>Either the sum of <em id="i151752375"><a name="i151752375"></a><a name="i151752375"></a>uid</em> and <em id="i724616711715"><a name="i724616711715"></a><a name="i724616711715"></a>offset</em> or the sum of <em id="i172404503711"><a name="i172404503711"></a><a name="i172404503711"></a>gid</em> and <em id="i1179319539714"><a name="i1179319539714"></a><a name="i1179319539714"></a>offset</em> must be less than or equal to 2<sup id="en-us_topic_0182200842_sup1238617401203"><a name="en-us_topic_0182200842_sup1238617401203"></a><a name="en-us_topic_0182200842_sup1238617401203"></a>32</sup> - 1. Otherwise, an error is reported during container startup.</li></ul>
</td>
</tr>
</tbody>
</table>

### Constraints

-   If  **--user-remap**  is specified in a system container, the rootfs directory must be accessible to users specified by  _uid_  or  _gid_  in  **--user-remap**. Otherwise, user namespaces of containers cannot access rootfs. As a result, the containers fail to be started.
-   All IDs in the container can be mapped to the host rootfs. Some directories or files may be mounted from the host to containers, for example, device files in the  **/dev/pts**  directory. If  _offset_  is too small, the mounting may fail.
-   _uid_,  _gid_, and  _offset_  are controlled by the upper-layer scheduling platform. The container engine only checks the validity of them.
-   **--user-remap**  is available only in system containers.
-   **--user-remap**  and  **--privileged**  cannot be set simultaneously. Otherwise, an error is reported during container startup.
-   If  _uid_  or  _gid_  is set to  **0**,  **--user-remap**  does not take effect.

### Usage Guide

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>Before specifying the  **--user-remap**  parameter, configure an offset value for UIDs and GIDs of all directories and files in rootfs. The offset value should be equal to that for  _uid_  and  _gid_  in  **--user-remap**.  
>For example, run the following command to offset UIDs and GIDs of all files in the  **dev**  directory with 100000:  
>chown 100000:100000 dev  

Specify the  **--user-remap**  parameter when the system container is started.

```
[root@localhost ~]# isula run -tid --user-remap 100000:100000:65535 --system-container --external-rootfs /home/root-fs none /sbin/init
eb9605b3b56dfae9e0b696a729d5e1805af900af6ce24428fde63f3b0a443f4a
```

Check the /sbin/init process information on the host and in a container.

```
[root@localhost ~]# isula exec eb ps aux | grep /sbin/init
root         1  0.6  0.0  21624  9624 ?        Ss   15:47   0:00 /sbin/init
[root@localhost ~]# ps aux | grep /sbin/init
100000    4861  0.5  0.0  21624  9624 ?        Ss   15:47   0:00 /sbin/init
root      4948  0.0  0.0 213032   808 pts/0    S+   15:48   0:00 grep --color=auto /sbin/init
```

The owner of the /sbin/init process in the container is user  **root**, but the owner of the host is the user whose UID is  **100000**.

Create a file in a container and view the file owner on the host.

```
[root@localhost ~]# isula exec -it eb bash
[root@localhost /]# echo test123 >> /test123
[root@localhost /]# exit
exit
[root@localhost ~]# ll /home/root-fs/test123
-rw-------. 1 100000 100000 8 Aug  2 15:52 /home/root-fs/test123
```

The owner of the file that is generated in the container is user  **root**, but the file owner displayed on the host is the user whose ID is  **100000**.

## User Permission Control

### Function Description

A container engine supports TLS for user identity authentication, which is used to control user permissions. Currently, container engines can connect to the authz plug-in to implement permission control.

### API Description

You can configure the startup parameters of the iSulad container engine to specify the permission control plug-in. The default daemon configuration file is  **/etc/isulad/daemon.json**.


<table><thead align="left"><tr id="en-us_topic_0182200843_row3969103710257"><th class="cellrowborder" valign="top" width="24.779999999999998%" id="mcps1.1.4.1.1"><p id="en-us_topic_0182200843_p1996983712519"><a name="en-us_topic_0182200843_p1996983712519"></a><a name="en-us_topic_0182200843_p1996983712519"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="43.47%" id="mcps1.1.4.1.2"><p id="en-us_topic_0182200843_p197083782512"><a name="en-us_topic_0182200843_p197083782512"></a><a name="en-us_topic_0182200843_p197083782512"></a>Example</p>
</th>
<th class="cellrowborder" valign="top" width="31.75%" id="mcps1.1.4.1.3"><p id="en-us_topic_0182200843_p163741918172615"><a name="en-us_topic_0182200843_p163741918172615"></a><a name="en-us_topic_0182200843_p163741918172615"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200843_row169701737132511"><td class="cellrowborder" valign="top" width="24.779999999999998%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200843_p313573395910"><a name="en-us_topic_0182200843_p313573395910"></a><a name="en-us_topic_0182200843_p313573395910"></a>--authorization-plugin</p>
</td>
<td class="cellrowborder" valign="top" width="43.47%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200843_p1318314512594"><a name="en-us_topic_0182200843_p1318314512594"></a><a name="en-us_topic_0182200843_p1318314512594"></a>"authorization-plugin":  "authz-broker"</p>
</td>
<td class="cellrowborder" valign="top" width="31.75%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182200843_p19601904015"><a name="en-us_topic_0182200843_p19601904015"></a><a name="en-us_topic_0182200843_p19601904015"></a>User permission authentication plug-in. Currently, only authz-broker is supported.</p>
</td>
</tr>
</tbody>
</table>

### Constraints

-   User permission policies need to be configured for authz. The default policy file is  **/var/lib/authz-broker/policy.json**. This file can be dynamically modified and the modification will take effect immediately without restarting the plug-in service.
-   A container engine can be started by user  **root**. If some commands used are enabled for by common users, common users may obtain excessive permissions. Therefore, exercise caution when performing such operations. Currently, running the  **container\_attach**,  **container\_create**, and  **container\_exec\_create**  commands may cause risks.
-   Some compound operations, such as running  **isula exec**  and  **isula inspect**  or running and  **isula attach**  and  **isula inspect**, depend on the permission of  **isula inspect**. If a user does not have this permission, an error is reported.
-   Using SSL/TLS encryption channels hardens security but also reduces performance. For example, the delay increases, more CPU resources are consumed, and encryption and decryption require higher throughput. Therefore, the number of concurrent executions decreases compared with non-TLS communication. According to the test result, when the ARM server \(Cortex-A72 64-core\) is almost unloaded, TLS is used to concurrently start a container. The maximum number of concurrent executions is 200 to 250.
-   If  **--tlsverify**  is specified on the server, the default path where authentication files store is  **/etc/isulad**. The default file names are  **ca.pem**,  **cert.pem**, and  **key.pem**.

### Example

1.  Ensure that the authz plug-in is installed on the host. If the authz plug-in is not installed, run the following command to install and start the authz plug-in service:

    ```
    [root@localhost ~]# yum install authz
    [root@localhost ~]# systemctl start authz
    ```

2.  To enable this function, configure the container engine and TLS certificate. You can use OpenSSL to generate the required certificate.

    ```
    #SERVERSIDE
     
    # Generate CA key
    openssl genrsa -aes256 -passout "pass:$PASSWORD" -out "ca-key.pem" 4096
    # Generate CA
    openssl req -new -x509 -days $VALIDITY -key "ca-key.pem" -sha256 -out "ca.pem" -passin "pass:$PASSWORD" -subj "/C=$COUNTRY/ST=$STATE/L=$CITY/O=$ORGANIZATION/OU=$ORGANIZATIONAL_UNIT/CN=$COMMON_NAME/emailAddress=$EMAIL"
    # Generate Server key
    openssl genrsa -out "server-key.pem" 4096
     
    # Generate Server Certs.
    openssl req -subj "/CN=$COMMON_NAME" -sha256 -new -key "server-key.pem" -out server.csr
     
    echo "subjectAltName = DNS:localhost,IP:127.0.0.1" > extfile.cnf
    echo "extendedKeyUsage = serverAuth" >> extfile.cnf
     
    openssl x509 -req -days $VALIDITY -sha256 -in server.csr -passin "pass:$PASSWORD" -CA "ca.pem" -CAkey "ca-key.pem" -CAcreateserial -out "server-cert.pem" -extfile extfile.cnf
     
    #CLIENTSIDE
     
    openssl genrsa -out "key.pem" 4096
    openssl req -subj "/CN=$CLIENT_NAME" -new -key "key.pem" -out client.csr
    echo "extendedKeyUsage = clientAuth" > extfile.cnf
    openssl x509 -req -days $VALIDITY -sha256 -in client.csr -passin "pass:$PASSWORD" -CA "ca.pem" -CAkey "ca-key.pem" -CAcreateserial -out "cert.pem" -extfile extfile.cnf
    ```

    If you want to use the preceding content as the script, replace the variables with the configured values. If the parameter used for generating the CA is empty, set it to  **"**.  **PASSWORD**,  **COMMON\_NAME**,  **CLIENT\_NAME**, and  **VALIDITY**  are mandatory.

3.  When starting the container engine, add parameters related to the TLS and authentication plug-in and ensure that the authentication plug-in is running properly. In addition, to use TLS authentication, the container engine must be started in TCP listening mode instead of the Unix socket mode. The configuration on the container demon is as follows:

    ```
    {
        "tls": true,
        "tls-verify": true,
        "tls-config": {
               "CAFile": "/root/.iSulad/ca.pem",
               "CertFile": "/root/.iSulad/server-cert.pem",
               "KeyFile":"/root/.iSulad/server-key.pem"
        },
        "authorization-plugin": "authz-broker"
    }
    ```

4.  Configure policies. For the basic authorization process, all policies are stored in the  **/var/lib/authz-broker/policy.json**  configuration file. The configuration file can be dynamically modified without restarting the plug-in. Only the SIGHUP signal needs to be sent to the authz process. In the file, a line contains one JSON policy object. The following provides policy configuration examples:

    -   All users can run all iSuald commands:  **\{"name":"policy\_0","users":\[""\],"actions":\[""\]\}**
    -   Alice can run all iSulad commands:  **\{"name":"policy\_1","users":\["alice"\],"actions":\[""\]\}**
    -   A blank user can run all iSulad commands:  ** \{"name":"policy\_2","users":\[""\],"actions":\[""\]\}**
    -   Alice and Bob can create new containers:  **\{"name":"policy\_3","users":\["alice","bob"\],"actions":\["container\_create"\]\}**
    -   service\_account can read logs and run  **docker top**:  **\{"name":"policy\_4","users":\["service\_account"\],"actions":\["container\_logs","container\_top"\]\}**
    -   Alice can perform any container operations:  **\{"name":"policy\_5","users":\["alice"\],"actions":\["container"\]\}**
    -   Alice can perform any container operations, but the request type can only be  **get**:  **\{"name":"policy\_5","users":\["alice"\],"actions":\["container"\], "readonly":true\}**

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >-   **action**  indicates that regular expressions are supported.  
    >-   **users**  indicates that regular expressions are not supported.  
    >-   Users configured in  **users**  must be unique. That is, a user cannot match multiple rules.  

5.  After updating the configurations, configure TLS parameters on the client to connect to the container engine. That is, access the container engine with restricted permissions.

    ```
    [root@localhost ~]#  isula version --tlsverify --tlscacert=/root/.iSulad/ca.pem --tlscert=/root/.iSulad/cert.pem --tlskey=/root/.iSulad/key.pem  -H=tcp://127.0.0.1:2375
    ```

    If you want to use the TLS authentication for default client connection, move the configuration file to  **\~/.iSulad**  and set the  **ISULAD\_HOST**  and  **ISULAD\_TLS\_VERIFY**  variables \(rather than transferring  **-H=tcp://$HOST:2375**  and -**-tlsverify**  during each call\).

    ```
    [root@localhost ~]# mkdir -pv ~/.iSulad
    [root@localhost ~]# cp -v {ca,cert,key}.pem ~/.iSulad 
    [root@localhost ~]# export ISULAD_HOST=localhost:2375 ISULAD_TLS_VERIFY=1
    [root@localhost ~]# isula version
    ```


## proc File System Isolation \(Lxcfs\)

### Application Scenario

Container virtualization is lightweight and efficient, and can be quickly deployed. However, containers are not strongly isolated, which causes great inconvenience to users. Containers have some defects in isolation because the namespace feature of the Linux kernel is not perfect. For example, you can view the proc information on the host \(such as meminfo, cpuinfo, stat, and uptime\) in the proc file system of a container. You can use the lxcfs tool to replace the /proc content of instances in the container with the content in the /proc file system of the host so that services in the container can obtain the correct resource value.

### API Description

A system container provides two tool packages: lxcfs and lxcfs-toolkit, which are used together. Lxcfs resides on the host as the daemon process. lxcfs-toolkit mounts the lxcfs file system of the host to containers through the hook mechanism.

The command line of lxcfs-toolkit is as follows:

```
lxcfs-toolkit [OPTIONS] COMMAND [COMMAND_OPTIONS]
```


<table><thead align="left"><tr id="en-us_topic_0182200844_row1569373816419"><th class="cellrowborder" valign="top" width="20.349999999999998%" id="mcps1.1.4.1.1"><p id="en-us_topic_0182200844_p106936387415"><a name="en-us_topic_0182200844_p106936387415"></a><a name="en-us_topic_0182200844_p106936387415"></a><strong id="b1623833212154"><a name="b1623833212154"></a><a name="b1623833212154"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="33.410000000000004%" id="mcps1.1.4.1.2"><p id="en-us_topic_0182200844_p43193341215"><a name="en-us_topic_0182200844_p43193341215"></a><a name="en-us_topic_0182200844_p43193341215"></a>Function</p>
</th>
<th class="cellrowborder" valign="top" width="46.239999999999995%" id="mcps1.1.4.1.3"><p id="en-us_topic_0182200844_p15693173814112"><a name="en-us_topic_0182200844_p15693173814112"></a><a name="en-us_topic_0182200844_p15693173814112"></a><strong id="b27881241121517"><a name="b27881241121517"></a><a name="b27881241121517"></a>Parameter</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200844_row12693163810415"><td class="cellrowborder" valign="top" width="20.349999999999998%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200844_p66931838134110"><a name="en-us_topic_0182200844_p66931838134110"></a><a name="en-us_topic_0182200844_p66931838134110"></a>remount</p>
</td>
<td class="cellrowborder" valign="top" width="33.410000000000004%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200844_p811074612115"><a name="en-us_topic_0182200844_p811074612115"></a><a name="en-us_topic_0182200844_p811074612115"></a>Remounts lxcfs to containers.</p>
</td>
<td class="cellrowborder" valign="top" width="46.239999999999995%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182200844_p1273811584599"><a name="en-us_topic_0182200844_p1273811584599"></a><a name="en-us_topic_0182200844_p1273811584599"></a><strong id="b1451441216348"><a name="b1451441216348"></a><a name="b1451441216348"></a>--all</strong>: remounts lxcfs to all containers.</p>
<p id="en-us_topic_0182200844_p8738358165912"><a name="en-us_topic_0182200844_p8738358165912"></a><a name="en-us_topic_0182200844_p8738358165912"></a><strong id="b1498041543411"><a name="b1498041543411"></a><a name="b1498041543411"></a>--container-id</strong>: remounts lxcfs to a specified container.</p>
</td>
</tr>
<tr id="en-us_topic_0182200844_row12634059013"><td class="cellrowborder" valign="top" width="20.349999999999998%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200844_p9635951805"><a name="en-us_topic_0182200844_p9635951805"></a><a name="en-us_topic_0182200844_p9635951805"></a>umount</p>
</td>
<td class="cellrowborder" valign="top" width="33.410000000000004%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200844_p4389165412117"><a name="en-us_topic_0182200844_p4389165412117"></a><a name="en-us_topic_0182200844_p4389165412117"></a>Unmounts lxcfs from containers.</p>
</td>
<td class="cellrowborder" valign="top" width="46.239999999999995%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182200844_p112881622103"><a name="en-us_topic_0182200844_p112881622103"></a><a name="en-us_topic_0182200844_p112881622103"></a><strong id="b549611437399"><a name="b549611437399"></a><a name="b549611437399"></a>--all</strong>: unmounts lxcfs from all containers.</p>
<p id="en-us_topic_0182200844_p3288172210011"><a name="en-us_topic_0182200844_p3288172210011"></a><a name="en-us_topic_0182200844_p3288172210011"></a><strong id="b1662225218402"><a name="b1662225218402"></a><a name="b1662225218402"></a>--container-id</strong>: unmounts lxcfs from a specified container.</p>
</td>
</tr>
<tr id="en-us_topic_0182200844_row915811441301"><td class="cellrowborder" valign="top" width="20.349999999999998%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200844_p166420541409"><a name="en-us_topic_0182200844_p166420541409"></a><a name="en-us_topic_0182200844_p166420541409"></a>check-lxcfs</p>
</td>
<td class="cellrowborder" valign="top" width="33.410000000000004%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200844_p143691559811"><a name="en-us_topic_0182200844_p143691559811"></a><a name="en-us_topic_0182200844_p143691559811"></a>Checks whether the lxcfs service is running properly.</p>
</td>
<td class="cellrowborder" valign="top" width="46.239999999999995%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182200844_p1329712815118"><a name="en-us_topic_0182200844_p1329712815118"></a><a name="en-us_topic_0182200844_p1329712815118"></a>None</p>
</td>
</tr>
<tr id="en-us_topic_0182200844_row17443144712014"><td class="cellrowborder" valign="top" width="20.349999999999998%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200844_p1946512581606"><a name="en-us_topic_0182200844_p1946512581606"></a><a name="en-us_topic_0182200844_p1946512581606"></a>prestart</p>
</td>
<td class="cellrowborder" valign="top" width="33.410000000000004%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200844_p77340320217"><a name="en-us_topic_0182200844_p77340320217"></a><a name="en-us_topic_0182200844_p77340320217"></a>Mounts the <strong id="b775651211456"><a name="b775651211456"></a><a name="b775651211456"></a>/var/lib/lxcfs</strong> directory to the container before the lxcfs service starts.</p>
</td>
<td class="cellrowborder" valign="top" width="46.239999999999995%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182200844_p25281515315"><a name="en-us_topic_0182200844_p25281515315"></a><a name="en-us_topic_0182200844_p25281515315"></a>None</p>
</td>
</tr>
</tbody>
</table>

### Constraints

-   Currently, only the  **cpuinfo**,  **meminfo**,  **stat**,  **diskstats**,  **partitions**,  **swaps**, and  **uptime**  files in the proc file system are supported. Other files are not isolated from other kernel API file systems \(such as sysfs\).
-   After an RPM package is installed, a sample JSON file is generated in  **/var/lib/lcrd/hooks/hookspec.json**. To add the log function, you need to add the  **--log**  configuration during customization.
-   The  **diskstats**  file displays only information about disks that support CFQ scheduling, instead of partition information. Devices in containers are displayed as names in the  **/dev**  directory. If a device name does not exist, the information is left blank. In addition, the device where the container root directory is located is displayed as  **sda**.
-   The  **slave**  parameter is required when lxcfs is mounted. If the  **shared**  parameter is used, the mount point in containers may be leaked to the host, affecting the host running.
-   Lxcfs supports graceful service degradation. If the lxcfs service crashes or becomes unavailable, the  **cpuinfo**,  **meminfo**,  **stat**,  **diskstats**,  **partitions**,  **swaps **and  **uptime**  files in containers are about host information, and other service functions of containers are not affected.
-   Bottom layer of lxcfs depends on the FUSE kernel module and libfuse library. Therefore, the kernel needs to support FUSE.
-   Lxcfs supports only the running of 64-bit applications in containers. If a 32-bit application is running in a container, the CPU information \(**cpuinfo**\) read by the application may fail to meet expectations.
-   Lxcfs simulates the resource view only of container control groups \(cgroups\). Therefore, system calls \(such as sysconf\) in containers can obtain only host information. Lxcfs cannot implement the kernel isolation.
-   The CPU information \(**cpuinfo**\) displayed after lxcfs implements the isolation has the following features:
    -   **processor**: The value increases from 0.
    -   **physical id**: The value increases from 0.
    -   **sibliing**: It has a fixed value of  **1**.
    -   **core id**: It has a fixed value of  **0**.
    -   **cpu cores**: It has a fixed value of  **1**.


### Example

1.  Install the lxcfs and lxcfs-toolkit packages and start the lxcfs service.

    ```
    [root@localhost ~]# yum install lxcfs lxcfs-toolkit 
    [root@localhost ~]# systemctl start lxcfs
    ```

2.  After a container is started, check whether the lxcfs mount point exists in the container.

    ```
    [root@localhost ~]# isula run -tid -v /var/lib/lxc:/var/lib/lxc --hook-spec /var/lib/isulad/hooks/hookspec.json --system-container --external-rootfs /home/root-fs none init
    a8acea9fea1337d9fd8270f41c1a3de5bceb77966e03751346576716eefa9782
    [root@localhost ~]# isula exec a8 mount | grep lxcfs
    lxcfs on /var/lib/lxc/lxcfs type fuse.lxcfs (rw,nosuid,nodev,relatime,user_id=0,group_id=0,allow_other)
    lxcfs on /proc/cpuinfo type fuse.lxcfs (rw,nosuid,nodev,relatime,user_id=0,group_id=0,allow_other)
    lxcfs on /proc/diskstats type fuse.lxcfs (rw,nosuid,nodev,relatime,user_id=0,group_id=0,allow_other)
    lxcfs on /proc/meminfo type fuse.lxcfs (rw,nosuid,nodev,relatime,user_id=0,group_id=0,allow_other)
    lxcfs on /proc/partitions type fuse.lxcfs (rw,nosuid,nodev,relatime,user_id=0,group_id=0,allow_other)
    lxcfs on /proc/stat type fuse.lxcfs (rw,nosuid,nodev,relatime,user_id=0,group_id=0,allow_other)
    lxcfs on /proc/swaps type fuse.lxcfs (rw,nosuid,nodev,relatime,user_id=0,group_id=0,allow_other)
    lxcfs on /proc/uptime type fuse.lxcfs (rw,nosuid,nodev,relatime,user_id=0,group_id=0,allow_other)
    ```

3.  Run the  **update**  command to update the CPU and memory resource configurations of the container and check the container resources. As shown in the following command output, the container resource view displays the actual container resource data instead of data of the host.

    ```
    [root@localhost ~]# isula update --cpuset-cpus 0-1 --memory 1G a8
    a8
    [root@localhost ~]# isula exec a8 cat /proc/cpuinfo
    processor       : 0
    BogoMIPS        : 100.00
    cpu MHz         : 2400.000
    Features        : fp asimd evtstrm aes pmull sha1 sha2 crc32 cpuid
    CPU implementer : 0x41
    CPU architecture: 8
    CPU variant     : 0x0
    CPU part        : 0xd08
    CPU revision    : 2
    
    processor       : 1
    BogoMIPS        : 100.00
    cpu MHz         : 2400.000
    Features        : fp asimd evtstrm aes pmull sha1 sha2 crc32 cpuid
    CPU implementer : 0x41
    CPU architecture: 8
    CPU variant     : 0x0
    CPU part        : 0xd08
    CPU revision    : 2
    
    [root@localhost ~]# isula exec a8 free -m
                  total        used        free      shared  buff/cache   available
    Mem:           1024          17         997           7           8        1006
    Swap:          4095           0        4095
    ```


