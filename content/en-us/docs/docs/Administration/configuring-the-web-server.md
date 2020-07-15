# Configuring the Web Server
<!-- TOC -->

- [Configuring the Web Server](#configuring-the-web-server)
    - [Apache Server](#apache-server)
        - [Overview](#overview)
        - [Managing httpd](#managing-httpd)
        - [Configuration File Description](#configuration-file-description)
        - [Management Module and SSL](#management-module-and-ssl)
        - [Verifying Whether the Web Service Is Successfully Set Up](#verifying-whether-the-web-service-is-successfully-set-up)
    - [Nginx Server](#nginx-server)
        - [Overview](#overview-1)
        - [Installing Nginx](#installing-nginx)
        - [Managing Nginx](#managing-nginx)
        - [Configuration File Description](#configuration-file-description-1)
        - [Management Modules](#management-modules)
        - [Verifying Whether the Web Service Is Successfully Set Up](#verifying-whether-the-web-service-is-successfully-set-up-1)

<!-- /TOC -->

## Apache Server




### Overview

World Wide Web \(Web\) is one of the most commonly used Internet protocols. At present, the web server in the Unix-Like system is mainly implemented through the Apache server software. To operate dynamic websites, LAMP \(Linux + Apache + MySQL + PHP\) is developed. Web services can be combined with multimedia such as text, graphics, images, and audio, and support information transmission through hyperlinks.

The web server version in the openEuler system is Apache HTTP server 2.4, that is, httpd, which is an open-source web server developed by the Apache Software Foundation.

### Managing httpd

#### Overview
You can use the systemctl tool to manage the httpd service, including starting, stopping, and restarting the service, and viewing the service status. This section describes how to manage the Apache HTTP service.

#### Prerequisites
-   To use the Apache HTTP service, ensure that the rpm package of the httpd service has been installed in your system. Run the following command as the **root** user to install the rpm package:

    ```
    # dnf install httpd
    ```

    For more information about service management, see  [Service Management](service-management.html).

-   To start, stop, and restart the httpd service, you must have the root permission.

#### Starting a Service
-   Run the following command to start and run the httpd service:

    ```
    # systemctl start httpd
    ```


-   If you want the httpd service to automatically start when the system starts, the command and output are as follows:

    ```
    # systemctl enable httpd
    Created symlink /etc/systemd/system/multi-user.target.wants/httpd.service → /usr/lib/systemd/system/httpd.service.
    ```


>![](public_sys-resources/icon-note.gif) **NOTE:**   
>If the running Apache HTTP server functions as a secure server, a password is required after the system is started. The password is an encrypted private SSL key.  

#### Stopping the Service
-   Run the following command to stop the httpd service:

    ```
    # systemctl stop httpd
    ```

-   If you want to prevent the service from automatically starting during system startup, the command and output are as follows:

    ```
    # systemctl disable httpd
    Removed /etc/systemd/system/multi-user.target.wants/httpd.service.
    ```


#### Restarting a Service
You can restart the service in any of the following ways:

-   Restart the service by running the restart command:

    ```
    # systemctl restart httpd
    ```

    This command stops the ongoing httpd service and restarts it immediately. This command is generally used after a service is installed or when a dynamically loaded module \(such as PHP\) is removed.

-   Reload the configuration.

    ```
    # systemctl reload httpd
    ```

    This command causes the running httpd service to reload its configuration file. Any requests that are currently being processed will be interrupted, causing the client browser to display an error message or re-render some pages.

-   Re-load the configuration without affecting the activation request.

    ```
    # apachectl graceful
    ```

    This command causes the running httpd service to reload its configuration file. Any requests that are currently being processed will continue to use the old configuration file.


#### Verifying the Service Status
Check whether the httpd service is running.

```
$ systemctl is-active httpd
```

If active is displayed in the command output, the service is running.

### Configuration File Description

After the httpd service is started, it reads the configuration file shown in  [Table 1](#table24341012096)  by default.

**Table  1**  Configuration file description

<a name="table24341012096"></a>
<table><thead align="left"><tr id="row2435101210918"><th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.1"><p id="p143513128912"><a name="p143513128912"></a><a name="p143513128912"></a>File</p>
</th>
<th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.2"><p id="p1543515125910"><a name="p1543515125910"></a><a name="p1543515125910"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="row94354128920"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p18435151218920"><a name="p18435151218920"></a><a name="p18435151218920"></a>/etc/httpd/conf/httpd.conf</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p943511216915"><a name="p943511216915"></a><a name="p943511216915"></a>Main configuration files.</p>
</td>
</tr>
<tr id="row13435412692"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p8435161215912"><a name="p8435161215912"></a><a name="p8435161215912"></a>/etc/httpd/conf.d</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p1042116010591"><a name="p1042116010591"></a><a name="p1042116010591"></a>Secondary directory of configuration files, which are also contained in the main configuration file.</p>
<p id="p143512126919"><a name="p143512126919"></a><a name="p143512126919"></a>The secondary directory of a configuration file is contained in the main configuration file.</p>
</td>
</tr>
</tbody>
</table>

Although the default configuration can be used in most cases, you need to be familiar with some important configuration items. After the configuration file is modified, run the following command as the **root** user to check the syntax errors that may occur in the configuration file:

```
# apachectl configtest
```

If the following information is displayed, the syntax of the configuration file is correct:

```
Syntax OK
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>-   Before modifying the configuration file, back up the original file so that the configuration file can be quickly restored if a fault occurs.  
>-   The modified configuration file takes effect only after the web service is restarted.  

### Management Module and SSL

#### Overview
The httpd service is a modular application that is distributed with many Dynamic Shared Objects \(DSOs\). DSOs can be dynamically loaded or unloaded when running if necessary. These modules are located in the /usr/lib64/httpd/modules/ directory of the server operating system. This section describes how to load and write a module.

#### Loading a Module
To load a special DSO module, you can use the load module indication in the configuration file. The modules provided by the independent software package have their own configuration files in the /etc/httpd/conf.modules.d directory.

For example, to load the asis DSO module, perform the following steps:

1.  In the /etc/httpd/conf.modules.d/00-optional.conf file, uncomment the following configuration line as the **root** user:

    ```
    LoadModule asis_module modules/mod_asis.so
    ```

2.  After the loading is complete, restart the httpd service as the **root** user to reload the configuration file.

    ```
    # systemctl restart httpd
    ```

3.  After the loading is complete, run the httpd -M command as the **root** user to check whether the asis DSO module is loaded.

    ```
    # httpd -M | grep asis
    ```

    If the following information is displayed, the asis DSO module is successfully loaded:

    ```
    asis_module (shared)
    ```


>![](public_sys-resources/icon-note.gif) **NOTE:**   
>**Common httpd commands**  
>-   httpd -v: views the httpd version number.  
>-   httpd -l: views the static modules compiled into the httpd program.  
>-   httpd -M: views the static modules and loaded dynamic modules that have been compiled into the httpd program.  

#### Introduction to SSL
Secure Sockets Layer \(SSL\) is an encryption protocol that allows secure communication between the server and client. The Transport Layer Security \(TLS\) protocol ensures security and data integrity for network communication. openEuler supports Mozilla Network Security Services \(NSS\) as the security protocol TLS. To load the SSL, perform the following steps:

1.  Install the  **mod\_ssl**  RPM package as the **root** user.

    ```
    # dnf install mod_ssl
    ```

2.  After the loading is complete, restart the httpd service as the **root** user to reload the configuration file.

    ```
    # systemctl restart httpd
    ```

3.  After the loading is complete, run the  **httpd -M**  command as the **root** user to check whether the SSL is loaded.

    ```
    # httpd -M | grep ssl
    ```

    If the following information is displayed, the SSL has been loaded successfully.

    ```
    ssl_module (shared)
    ```


### Verifying Whether the Web Service Is Successfully Set Up

After the web server is set up, perform the following operations to check whether the web server is set up successfully:

1.  Run the following command as the **root** user to check the IP address of the server:

    ```
    # ifconfig
    ```

    If the following information is displayed, the IP address of the server is 192.168.1.60.

    ```
    enp3s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
    inet 192.168.1.60  netmask 255.255.255.0  broadcast 192.168.1.255
    inet6 fe80::5054:ff:fe95:499f  prefixlen 64  scopeid 0x20<link>
    ether 52:54:00:95:49:9f  txqueuelen 1000  (Ethernet)
    RX packets 150713207  bytes 49333673733 (45.9 GiB)
    RX errors 0  dropped 43  overruns 0  frame 0
    TX packets 2246438  bytes 203186675 (193.7 MiB)
    TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
    
    enp4s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
    ether 52:54:00:7d:80:9e  txqueuelen 1000  (Ethernet)
    RX packets 149937274  bytes 44652889185 (41.5 GiB)
    RX errors 0  dropped 1102561  overruns 0  frame 0
    TX packets 0  bytes 0 (0.0 B)
    TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
    
    lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
    inet 127.0.0.1  netmask 255.0.0.0
    inet6 ::1  prefixlen 128  scopeid 0x10<host>
    loop  txqueuelen 1000  (Local Loopback)
    RX packets 37096  bytes 3447369 (3.2 MiB)
    RX errors 0  dropped 0  overruns 0  frame 0
    TX packets 37096  bytes 3447369 (3.2 MiB)
    TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
    ```

2.  Configure the firewall as the **root** user.

    ```
    # firewall-cmd --add-service=http --permanent
    success
    # firewall-cmd --reload
    success
    ```

3.  Verify whether the web server is successfully set up. You can select the Linux or Windows operating system for verification.
    -   Using the Linux OS

        Run the following command to check whether the web page can be accessed. If the service is successfully set up, the web page can be accessed.

        ```
        $ curl http://192.168.1.60
        ```

        Run the following command to check whether the command output is 0. If the command output is 0, the httpd server is successfully set up.

        ```
        $ echo $?
        ```

    -   Using the Windows OS

        Open the browser and enter the following address in the address box. If the web page can be accessed, the httpd server is successfully set up.

        http://192.168.1.60

        If the port number is changed, enter the address in the following format:

        http://192.168.1.60: port number



## Nginx Server



### Overview

Nginx is a lightweight web server which also acts as a reverse proxy server and email \(IMAP/POP3\) proxy server. It features low memory usage and strong concurrency capability. Nginx supports FastCGI, SSL, virtual hosts, URL rewrite, Gzip, and extension of many third-party modules.

### Installing Nginx

1.  Configure the local yum source. For details, see  [Configuring the Repo Server](configuring-the-repo-server.html).
2.  Clear the cache.

    ```
    $ dnf clean all
    ```

3.  Create a cache.

    ```
    $ dnf makecache
    ```

4.  Install the Nginx server as the **root** user.

    ```
    # dnf install nginx
    ```

5.  Check the installed RPM package.

    ```
    $ dnf list all | grep nginx
    ```


### Managing Nginx

#### Overview
You can use the systemctl tool to manage the Nginx service, including starting, stopping, and restarting the service, and viewing the service status. This section describes how to manage the Nginx service.

#### Prerequisites
-   Ensure that the Nginx service has been installed. If not, install it by referring to  [Installing Nginx](#installing-nginx).

    For more information about service management, see  [Service Management](service-management.html).

-   To start, stop, and restart the Nginx service, you must have the  **root**  permission.

#### Starting a Service
-   Run the following command to start and run the Nginx service:

    ```
    # systemctl start nginx
    ```


-   If you want the Nginx service to automatically start when the system starts, the command and output are as follows:

    ```
    # systemctl enable nginx
    Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service → /usr/lib/systemd/system/nginx.service.
    ```


>![](public_sys-resources/icon-note.gif) **NOTE:**   
>If the running Nginx server functions as a secure server, a password is required after the system is started. The password is an encrypted private SSL key.  

#### Stopping the Service
-   Run the following command to stop the Nginx service:

    ```
    # systemctl stop nginx
    ```

-   If you want to prevent the service from automatically starting during system startup, the command and output are as follows:

    ```
    # systemctl disable nginx
    Removed /etc/systemd/system/multi-user.target.wants/nginx.service.
    ```


#### Restarting a Service
You can restart the service in any of the following ways:

-   Restart the service.

    ```
    # systemctl restart nginx
    ```

    This command stops the ongoing Nginx service and restarts it immediately. This command is generally used after a service is installed or when a dynamically loaded module \(such as PHP\) is removed.

-   Reload the configuration.

    ```
    # systemctl reload nginx
    ```

    This command causes the running Nginx service to reload its configuration file. Any requests that are currently being processed will be interrupted, causing the client browser to display an error message or re-render some pages.

-   Smoothly restart Nginx.

    ```
    # kill -HUP PID
    ```

    This command causes the running Nginx service to reload its configuration file. Any requests that are currently being processed will continue to use the old configuration file.


#### Verifying the Service Status
Check whether the Nginx service is running.

```
$ systemctl is-active nginx
```

If  **active** is displayed in the command output, the service is running.

### Configuration File Description

After the Nginx service is started, it reads the configuration file shown in  [Table 2](#table24341012096)  by default.

**Table  2**  Configuration file description

<a name="table24341012096"></a>
<table><thead align="left"><tr id="row2435101210918"><th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.1"><p id="p143513128912"><a name="p143513128912"></a><a name="p143513128912"></a>File</p>
</th>
<th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.2"><p id="p1543515125910"><a name="p1543515125910"></a><a name="p1543515125910"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="row94354128920"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p18435151218920"><a name="p18435151218920"></a><a name="p18435151218920"></a>/etc/nginx/nginx.conf</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p943511216915"><a name="p943511216915"></a><a name="p943511216915"></a>Main configuration files.</p>
</td>
</tr>
<tr id="row13435412692"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p8435161215912"><a name="p8435161215912"></a><a name="p8435161215912"></a>/etc/nginx/conf.d</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p1042116010591"><a name="p1042116010591"></a><a name="p1042116010591"></a>Secondary directory of configuration files, which are also contained in the main configuration file.</p>
<p id="p143512126919"><a name="p143512126919"></a><a name="p143512126919"></a>The secondary directory of a configuration file is contained in the main configuration file.</p>
</td>
</tr>
</tbody>
</table>

Although the default configuration can be used in most cases, you need to be familiar with some important configuration items. After the configuration file is modified, run the following command as the **root** user to check the syntax errors that may occur in the configuration file:

```
# nginx -t
```

If the command output contains  **syntax is ok**, the syntax of the configuration file is correct.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>-   Before modifying the configuration file, back up the original file so that the configuration file can be quickly restored if a fault occurs.  
>-   The modified configuration file takes effect only after the web service is restarted.  

### Management Modules

#### Overview
The Nginx service is a modular application that is distributed with many Dynamic Shared Objects \(DSOs\). DSOs can be dynamically loaded or unloaded when running if necessary. These modules are located in the  **/usr/lib64/nginx/modules/**  directory of the server operating system. This section describes how to load and write a module.

#### Loading a Module
To load a special DSO module, you can use the load module indication in the configuration file. Generally, the modules provided by independent software packages have their own configuration files in the  **/usr/share/nginx/modules**  directory.

The DSO is automatically loaded when the  **dnf install nginx**  command is used to install the Nginx in the openEuler operating system.

### Verifying Whether the Web Service Is Successfully Set Up

After the web server is set up, perform the following operations to check whether the web server is set up successfully:

1.  Run the following command as the **root** user to check the IP address of the server:

    ```
    # ifconfig
    ```

    If the following information is displayed, the IP address of the server is  **192.168.1.60**.

    ```
    enp3s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
    inet 192.168.1.60  netmask 255.255.255.0  broadcast 192.168.1.255
    inet6 fe80::5054:ff:fe95:499f  prefixlen 64  scopeid 0x20<link>
    ether 52:54:00:95:49:9f  txqueuelen 1000  (Ethernet)
    RX packets 150713207  bytes 49333673733 (45.9 GiB)
    RX errors 0  dropped 43  overruns 0  frame 0
    TX packets 2246438  bytes 203186675 (193.7 MiB)
    TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
    
    enp4s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
    ether 52:54:00:7d:80:9e  txqueuelen 1000  (Ethernet)
    RX packets 149937274  bytes 44652889185 (41.5 GiB)
    RX errors 0  dropped 1102561  overruns 0  frame 0
    TX packets 0  bytes 0 (0.0 B)
    TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
    
    lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
    inet 127.0.0.1  netmask 255.0.0.0
    inet6 ::1  prefixlen 128  scopeid 0x10<host>
    loop  txqueuelen 1000  (Local Loopback)
    RX packets 37096  bytes 3447369 (3.2 MiB)
    RX errors 0  dropped 0  overruns 0  frame 0
    TX packets 37096  bytes 3447369 (3.2 MiB)
    TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
    ```

2.  Configure the firewall as the **root** user.

    ```
    # firewall-cmd --add-service=http --permanent
    success
    # firewall-cmd --reload
    success
    ```

3.  Verify whether the web server is successfully set up. You can select the Linux or Windows operating system for verification.
    -   Using the Linux OS

        Run the following command to check whether the web page can be accessed. If the service is successfully set up, the web page can be accessed.

        ```
        $ curl http://192.168.1.60
        ```

        Run the following command to check whether the command output is  **0**. If the command output is  **0**, the Nginx server is successfully set up.

        ```
        $ echo $?
        ```

    -   Using the Windows OS

        Open the browser and enter the following address in the address box. If the web page can be accessed, the Nginx server is successfully set up.

        http://192.168.1.60

        If the port number is changed, enter the address in the following format:

        http://192.168.1.60: port number
