# Configuring the FTP Server
<!-- TOC -->

- [Configuring the FTP Server](#configuring-the-ftp-server)
    - [General Introduction](#general-introduction)
        - [FTP Overview](#ftp-overview)
        - [Port Used by the FTP Server](#port-used-by-the-ftp-server)
        - [Introduction to vsftpd](#introduction-to-vsftpd)
    - [Using vsftpd](#using-vsftpd)
        - [Installing vsftpd](#installing-vsftpd)
        - [Service Management](#service-management)
    - [Configuring vsftpd](#configuring-vsftpd)
        - [vsftpd Configuration Files](#vsftpd-configuration-files)
        - [Default Configuration Description](#default-configuration-description)
        - [Setting the Local Time](#setting-the-local-time)
        - [Configuring Welcome Information](#configuring-welcome-information)
        - [Configuring the Login Permission of a System Account](#configuring-the-login-permission-of-a-system-account)
    - [Verifying Whether the FTP Service Is Successfully Set Up](#verifying-whether-the-ftp-service-is-successfully-set-up)
    - [Configuring a Firewall](#configuring-a-firewall)
    - [File Transmission](#file-transmission)
        - [Overview](#overview)
        - [Connecting to the Server](#connecting-to-the-server)
        - [Downloading a File](#downloading-a-file)
        - [Uploading a file](#uploading-a-file)
        - [Deleting a File](#deleting-a-file)
        - [Disconnecting from the Server](#disconnecting-from-the-server)

<!-- /TOC -->

## General Introduction

### FTP Overview
File Transfer Protocol \(FTP\) is one of the earliest transmission protocols on the Internet. It is used to transfer files between the server and client. FTP allows users to access files on a remote system using a set of standard commands without logging in to the remote system. In addition, the FTP server provides the following functions:

-   Subscriber classification

    By default, the FTP server classifies users into real users, guest users, and anonymous users based on the login status. The three types of users have different access permissions. Real users have complete access permissions, while anonymous users have only the permission to downloading resources.

-   Command records and log file records

    FTP can use the syslogd to record data, including historical commands and user transmission data \(such as the transmission time and file size\). Users can obtain log information from the /var/log/ directory.

-   Restricting the access scope of users

    FTP can limit the work scope of a user to the home directory of the user. After a user logs in to the system through FTP, the root directory displayed by the system is the home directory of the user. This environment is called change root \(chroot for short\). In this way, users can access only the main directory, but not important directories such as /etc, /home, and /usr/local. This protects the system and keeps the system secure.


### Port Used by the FTP Server
The FTP service requires multiple network ports. The server uses the following ports:

-   Command channel. The default port number is 21.
-   Data channel. The default port number is 20.

Port 21 is used to receive connection requests from the FTP client, and port 20 is used by the FTP server to proactively connect to the FTP client.

### Introduction to vsftpd
FTP has a long history and uses the unencrypted transmission mode, and is therefore considered insecure. This section describes the Very Secure FTP Daemon \(vsftpd\), to use FTP in a more secure way.

The vsftpd is introduced to build a security-centric FTP server. The vsftpd is designed with the following features:

-   The startup user of the vsftpd service is a common user who has low system permission. In addition, the vsftpd service uses chroot to change the root directory, preventing the risk of misusing system tools.
-   Any vsftpd command that requires high execution permission is controlled by a special upper-layer program. The upper-layer program has low permission and does not affect the system.
-   vsftpd integrates most of the extra commands \(such as dir, ls, and cd\) used by FTP. Generally, the system does not need to provide extra commands, which are secure for the system.

## Using vsftpd

### Installing vsftpd
To use the vsftpd service, you need to install the vsftpd software. If the yum source has been configured, run the following command as the root user to install the vsftpd service:

```
# dnf install vsftpd
```

### Service Management
To start, stop, or restart the vsftpd service, run the corresponding command as the root user.

- Starting vsftpd services

    ```
    # systemctl start vsftpd
    ```

    You can run the netstat command to check whether communication port 21 is enabled. If the following information is displayed, the vsftpd service has been enabled.

    ```
    # netstat -tulnp | grep 21
    tcp6       0      0 :::21                   :::*                    LISTEN      19716/vsftpd
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >If the **netstat** command does not exist, run the **dnf install net-tools** command to install the **net-tools** software and then run the **netstat** command.  

-   Stopping the vsftpd services

    ```
    # systemctl stop vsftpd
    ```


-   Restarting the vsftpd service

    ```
    # systemctl restart vsftpd
    ```


## Configuring vsftpd



### vsftpd Configuration Files

You can modify the vsftpd configuration file to control user permissions.  [Table 1](#table1541615718372)  describes the vsftpd configuration files. You can modify the configuration files as required. You can run the man command to view more parameter meanings.

**Table  1**  vsftpd configuration files

<a name="table1541615718372"></a>
<table><thead align="left"><tr id="row1041620733716"><th class="cellrowborder" valign="top" width="26.16%" id="mcps1.2.3.1.1"><p id="p141619753716"><a name="p141619753716"></a><a name="p141619753716"></a>Configuration File</p>
</th>
<th class="cellrowborder" valign="top" width="73.83999999999999%" id="mcps1.2.3.1.2"><p id="p16416187153714"><a name="p16416187153714"></a><a name="p16416187153714"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="row541716723710"><td class="cellrowborder" valign="top" width="26.16%" headers="mcps1.2.3.1.1 "><p id="p1071316355299"><a name="p1071316355299"></a><a name="p1071316355299"></a>/etc/vsftpd/vsftpd.conf</p>
</td>
<td class="cellrowborder" valign="top" width="73.83999999999999%" headers="mcps1.2.3.1.2 "><p id="p04178718376"><a name="p04178718376"></a><a name="p04178718376"></a>Main configuration file of the vsftpd process. The configuration format is Parameter=Parameter value. The parameter and parameter value cannot be empty.</p>
<p id="p153451439183513"><a name="p153451439183513"></a><a name="p153451439183513"></a>You can run the following command to view details about the vsftpd.conf file:</p>
<p id="p128951154173518"><a name="p128951154173518"></a><a name="p128951154173518"></a>man 5 vsftpd.conf</p>
</td>
</tr>
<tr id="row1341710763719"><td class="cellrowborder" valign="top" width="26.16%" headers="mcps1.2.3.1.1 "><p id="p18697219193716"><a name="p18697219193716"></a><a name="p18697219193716"></a>/etc/pam.d/vsftpd</p>
</td>
<td class="cellrowborder" valign="top" width="73.83999999999999%" headers="mcps1.2.3.1.2 "><p id="p941714720378"><a name="p941714720378"></a><a name="p941714720378"></a>Pluggable authentication modules (PAMs) are used for identity authentication and restrict some user operations.</p>
</td>
</tr>
<tr id="row194171773716"><td class="cellrowborder" valign="top" width="26.16%" headers="mcps1.2.3.1.1 "><p id="p1024763374812"><a name="p1024763374812"></a><a name="p1024763374812"></a>/etc/vsftpd/ftpusers</p>
</td>
<td class="cellrowborder" valign="top" width="73.83999999999999%" headers="mcps1.2.3.1.2 "><p id="p74171174375"><a name="p74171174375"></a><a name="p74171174375"></a>List of users who are not allowed to use the vsftpd. By default, the system account is also in this file. Therefore, the system account cannot use vsftpd by default.</p>
</td>
</tr>
<tr id="row441787153712"><td class="cellrowborder" valign="top" width="26.16%" headers="mcps1.2.3.1.1 "><p id="p174183753711"><a name="p174183753711"></a><a name="p174183753711"></a>/etc/vsftpd/user_list</p>
</td>
<td class="cellrowborder" valign="top" width="73.83999999999999%" headers="mcps1.2.3.1.2 "><p id="p897451702311"><a name="p897451702311"></a><a name="p897451702311"></a>List of users who are allowed or not allowed to log in to the vsftpd server. Whether the file takes effect depends on the following parameters in the main configuration file vsftpd.conf:</p>
<p id="p235712118232"><a name="p235712118232"></a><a name="p235712118232"></a>userlist_enable: indicates whether to enable the userlist mechanism. The value YES indicates that the userlist mechanism is enabled. In this case, the userlist_deny configuration is valid. The value NO indicates that the userlist mechanism is disabled.</p>
<p id="p38688486536"><a name="p38688486536"></a><a name="p38688486536"></a>userlist_deny: indicates whether to forbid users in the user list to log in. YES indicates that users in the user list are forbidden to log in. NO indicates that users in the command are allowed to log in.</p>
<p id="p15866735202619"><a name="p15866735202619"></a><a name="p15866735202619"></a>For example, if userlist_enable is set to YES and userlist_deny is set to YES, all users in the user list cannot log in.</p>
</td>
</tr>
<tr id="row9535948142112"><td class="cellrowborder" valign="top" width="26.16%" headers="mcps1.2.3.1.1 "><p id="p17719134152118"><a name="p17719134152118"></a><a name="p17719134152118"></a>/etc/vsftpd/chroot_list</p>
</td>
<td class="cellrowborder" valign="top" width="73.83999999999999%" headers="mcps1.2.3.1.2 "><p id="p6618142417163"><a name="p6618142417163"></a><a name="p6618142417163"></a>Whether to restrict the user list in the home directory. By default, this file does not exist. You need to create it manually. It is the value of chroot_list_file in the vsftpd.conf file.</p>
<p id="p3279143081618"><a name="p3279143081618"></a><a name="p3279143081618"></a>The function of this parameter is determined by the following parameters in the vsftpd.conf file:</p>
<a name="ul1455581412205"></a><a name="ul1455581412205"></a><ul id="ul1455581412205"><li>chroot_local_user: indicates whether to restrict all users to the home directory. The value YES indicates that all users are restricted to the home directory, and the value NO indicates that all users are not restricted to the home directory.</li><li>chroot_list_enable: indicates whether to enable the list of restricted users. The value YES indicates that the list is enabled, and the value NO indicates that the list is disabled.</li></ul>
<p id="p197351059141313"><a name="p197351059141313"></a><a name="p197351059141313"></a>For example, if chroot_local_user is set to YES, chroot_list_enable is set to YES, and chroot_list_file is set to /etc/vsftpd/chroot_list, all users are restricted to their home directories, and users in chroot_list are not restricted.</p>
</td>
</tr>
<tr id="row12536248192116"><td class="cellrowborder" valign="top" width="26.16%" headers="mcps1.2.3.1.1 "><p id="p6724834162111"><a name="p6724834162111"></a><a name="p6724834162111"></a>/usr/sbin/vsftpd</p>
</td>
<td class="cellrowborder" valign="top" width="73.83999999999999%" headers="mcps1.2.3.1.2 "><p id="p1253634815218"><a name="p1253634815218"></a><a name="p1253634815218"></a>Unique execution file of vsftpd.</p>
</td>
</tr>
<tr id="row35371648162119"><td class="cellrowborder" valign="top" width="26.16%" headers="mcps1.2.3.1.1 "><p id="p772716348217"><a name="p772716348217"></a><a name="p772716348217"></a>/var/ftp/</p>
</td>
<td class="cellrowborder" valign="top" width="73.83999999999999%" headers="mcps1.2.3.1.2 "><p id="p25371248172114"><a name="p25371248172114"></a><a name="p25371248172114"></a>Default root directory for anonymous users to log in. The root directory is related to the home directory of the ftp user.</p>
</td>
</tr>
</tbody>
</table>


### Default Configuration Description

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>The configuration content in this document is for reference only. You can modify the content based on the site requirements \(for example, security hardening requirements\).  

In the openEuler system, vsftpd does not open to anonymous users by default. Run the vim command to view the main configuration file. The content is as follows:

```
$ vim /etc/vsftpd/vsftpd.conf
anonymous_enable=NO
local_enable=YES
write_enable=YES
local_umask=022
dirmessage_enable=YES
xferlog_enable=YES
connect_from_port_20=YES
xferlog_std_format=YES
listen=NO
listen_ipv6=YES
pam_service_name=vsftpd
userlist_enable=YES
```

[Table 2](#table18185162512499)  describes the parameters.

**Table  2**  Parameter description

<a name="table18185162512499"></a>
<table><thead align="left"><tr id="row101877257495"><th class="cellrowborder" valign="top" width="22.78%" id="mcps1.2.3.1.1"><p id="p21871725144910"><a name="p21871725144910"></a><a name="p21871725144910"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="77.22%" id="mcps1.2.3.1.2"><p id="p19187162564910"><a name="p19187162564910"></a><a name="p19187162564910"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="row3187425134916"><td class="cellrowborder" valign="top" width="22.78%" headers="mcps1.2.3.1.1 "><p id="p4968173712497"><a name="p4968173712497"></a><a name="p4968173712497"></a>anonymous_enable</p>
</td>
<td class="cellrowborder" valign="top" width="77.22%" headers="mcps1.2.3.1.2 "><p id="p74773423490"><a name="p74773423490"></a><a name="p74773423490"></a>Indicates whether to allow anonymous users to log in. YES indicates that anonymous users are allowed to log in; NO indicates that anonymous users are not allowed to log in.</p>
</td>
</tr>
<tr id="row19187225114911"><td class="cellrowborder" valign="top" width="22.78%" headers="mcps1.2.3.1.1 "><p id="p8968237174919"><a name="p8968237174919"></a><a name="p8968237174919"></a>local_enable</p>
</td>
<td class="cellrowborder" valign="top" width="77.22%" headers="mcps1.2.3.1.2 "><p id="p104782422495"><a name="p104782422495"></a><a name="p104782422495"></a>Whether to allow local users to log in. YES indicates that local users are allowed to log in. NO indicates that local users are not allowed to log in.</p>
</td>
</tr>
<tr id="row1418772574910"><td class="cellrowborder" valign="top" width="22.78%" headers="mcps1.2.3.1.1 "><p id="p8968737114910"><a name="p8968737114910"></a><a name="p8968737114910"></a>write_enable</p>
</td>
<td class="cellrowborder" valign="top" width="77.22%" headers="mcps1.2.3.1.2 "><p id="p81871825104914"><a name="p81871825104914"></a><a name="p81871825104914"></a>Whether to allow the login user to have the write permission. YES indicates that the upload and write function is enabled, and NO indicates that the function is disabled.</p>
</td>
</tr>
<tr id="row018722564917"><td class="cellrowborder" valign="top" width="22.78%" headers="mcps1.2.3.1.1 "><p id="p3969163704915"><a name="p3969163704915"></a><a name="p3969163704915"></a>local_umask</p>
</td>
<td class="cellrowborder" valign="top" width="77.22%" headers="mcps1.2.3.1.2 "><p id="p01856127552"><a name="p01856127552"></a><a name="p01856127552"></a>Indicates the umask value when a local user adds a profile.</p>
</td>
</tr>
<tr id="row171881425194917"><td class="cellrowborder" valign="top" width="22.78%" headers="mcps1.2.3.1.1 "><p id="p1796983716496"><a name="p1796983716496"></a><a name="p1796983716496"></a>dirmessage_enable</p>
</td>
<td class="cellrowborder" valign="top" width="77.22%" headers="mcps1.2.3.1.2 "><p id="p1718872516496"><a name="p1718872516496"></a><a name="p1718872516496"></a>Indicates whether to display the contents that users need to pay attention to when a user accesses a directory. The options are YES (yes) and NO (no).</p>
</td>
</tr>
<tr id="row1718862584912"><td class="cellrowborder" valign="top" width="22.78%" headers="mcps1.2.3.1.1 "><p id="p16969937194918"><a name="p16969937194918"></a><a name="p16969937194918"></a>xferlog_enable</p>
</td>
<td class="cellrowborder" valign="top" width="77.22%" headers="mcps1.2.3.1.2 "><p id="p11188725164915"><a name="p11188725164915"></a><a name="p11188725164915"></a>Indicates whether to record file upload and download operations. The options are YES (record operations) and NO (not record operations).</p>
</td>
</tr>
<tr id="row131884252495"><td class="cellrowborder" valign="top" width="22.78%" headers="mcps1.2.3.1.1 "><p id="p1497053713498"><a name="p1497053713498"></a><a name="p1497053713498"></a>connect_from_port_20</p>
</td>
<td class="cellrowborder" valign="top" width="77.22%" headers="mcps1.2.3.1.2 "><p id="p0223715115717"><a name="p0223715115717"></a><a name="p0223715115717"></a>Indicates whether port 20 is used for data transmission in port mode. YES indicates that port 20 is used, and NO indicates that port 20 is not used.</p>
</td>
</tr>
<tr id="row54729324499"><td class="cellrowborder" valign="top" width="22.78%" headers="mcps1.2.3.1.1 "><p id="p1797093744914"><a name="p1797093744914"></a><a name="p1797093744914"></a>xferlog_std_format</p>
</td>
<td class="cellrowborder" valign="top" width="77.22%" headers="mcps1.2.3.1.2 "><p id="p151867233590"><a name="p151867233590"></a><a name="p151867233590"></a>Indicates whether the transfer log file is written in the standard xferlog format. The options are YES (yes) and NO (no).</p>
</td>
</tr>
<tr id="row18472163284918"><td class="cellrowborder" valign="top" width="22.78%" headers="mcps1.2.3.1.1 "><p id="p1897013717499"><a name="p1897013717499"></a><a name="p1897013717499"></a>listen</p>
</td>
<td class="cellrowborder" valign="top" width="77.22%" headers="mcps1.2.3.1.2 "><p id="p1047214329495"><a name="p1047214329495"></a><a name="p1047214329495"></a>Indicates whether the vsftpd service is started in standalone mode. The options are YES (yes) and NO (no).</p>
</td>
</tr>
<tr id="row65527244272"><td class="cellrowborder" valign="top" width="22.78%" headers="mcps1.2.3.1.1 "><p id="p1955372410278"><a name="p1955372410278"></a><a name="p1955372410278"></a>pam_service_name</p>
</td>
<td class="cellrowborder" valign="top" width="77.22%" headers="mcps1.2.3.1.2 "><p id="p85531424172712"><a name="p85531424172712"></a><a name="p85531424172712"></a>Support for PAM management. The value is a service name, for example, vsftpd.</p>
</td>
</tr>
<tr id="row137361028142713"><td class="cellrowborder" valign="top" width="22.78%" headers="mcps1.2.3.1.1 "><p id="p3737132822713"><a name="p3737132822713"></a><a name="p3737132822713"></a>userlist_enable</p>
</td>
<td class="cellrowborder" valign="top" width="77.22%" headers="mcps1.2.3.1.2 "><p id="p573792872715"><a name="p573792872715"></a><a name="p573792872715"></a>Indicates whether to support account login control in the /etc/vsftpd/user_list file. The options are YES (yes) and NO (no).</p>
</td>
</tr>
<tr id="row1712712332278"><td class="cellrowborder" valign="top" width="22.78%" headers="mcps1.2.3.1.1 "><p id="p1512763312712"><a name="p1512763312712"></a><a name="p1512763312712"></a>tcp_wrappers</p>
</td>
<td class="cellrowborder" valign="top" width="77.22%" headers="mcps1.2.3.1.2 "><p id="p15127033152712"><a name="p15127033152712"></a><a name="p15127033152712"></a>Indicates whether to support the firewall mechanism of the TCP Wrappers. The options are YES (yes) and NO (no).</p>
</td>
</tr>
<tr id="row163601306111"><td class="cellrowborder" valign="top" width="22.78%" headers="mcps1.2.3.1.1 "><p id="p1597123717499"><a name="p1597123717499"></a><a name="p1597123717499"></a>listen_ipv6</p>
</td>
<td class="cellrowborder" valign="top" width="77.22%" headers="mcps1.2.3.1.2 "><p id="p0361200613"><a name="p0361200613"></a><a name="p0361200613"></a>Indicates whether to listen to IPv6 FTP requests. The options are YES (yes) and NO (no). listen and listen_ipv6 cannot be enabled at the same time.</p>
</td>
</tr>
</tbody>
</table>

### Setting the Local Time

#### Overview
In the openEuler system, vsftpd uses the Greenwich Mean Time \(GMT\) time by default, which may be different from the local time. For example, the GMT time is 8 hours later than the Beijing time. You need to change the GMT time to the local time. Otherwise, the server time and client time are inconsistent, which may cause errors during file upload and download.

#### Setting Method
To set the vsftpd time to the local time, perform the following steps as the **root** user:

1.  Open the vsftpd.conf file and change the value of use\_localtime to  **YES**. Run the following command:

    ```
    # vim /etc/vsftpd/vsftpd.conf
    ```

    Modify the file contents as follows:

    ```
    use_localtime=YES
    ```

2.  Restart the vsftpd service.

    ```
    # systemctl restart vsftpd
    ```

3.  Set the vsftpd service to start automatically upon power-on.

    ```
    # systemctl enable vsftpd
    ```


### Configuring Welcome Information

To use the vsftpd service normally, the welcome information file must exist. To configure the welcome.txt file of the vsftp service, perform the following steps as the **root** user:

1.  Open the vsftpd.conf configuration file, add the welcome information to the file, save the file, and exit.

    ```
    # vim /etc/vsftpd/vsftpd.conf
    ```

    The following configuration lines need to be added:

    ```
    banner_file=/etc/vsftpd/welcome.txt
    ```

2.  Create welcome information. Specifically, open the welcome.txt file, write the welcome information, save the file, and exit.

    ```
    # vim /etc/vsftpd/welcome.txt
    ```

    The following is an example:

    ```
    Welcome to this FTP server!
    ```


### Configuring the Login Permission of a System Account

Generally, users need to restrict the login permission of some accounts. You can set the restriction as required.

Two files are used to restrict the login of system accounts. The default files are as follows:

-   /etc/vsftpd/ftpusers: This file is managed by the PAM module and is determined by the settings of the /etc/pam.d/vsftpd file.
-   /etc/vsftpd/user\_list: This file is set by userlist\_file in vsftpd.conf and is provided by vsftpd.

Both files must exist and have the same content. You can write the accounts whose UIDs are smaller than 500 to the two files by referring to the /etc/passwd. Each line indicates an account.

To restrict the login of system accounts, add the accounts to /etc/vsftpd/ftpusers and /etc/vsftpd/user\_list as the **root** user.

Open the user\_list file to view the account information in the current file. The command and output are as follows:

```
$ vim /etc/vsftpd/user_list
root
bin
daemon
adm
lp
sync
shutdown
halt
mail
news
uucp
operator
games
nobody
```

## Verifying Whether the FTP Service Is Successfully Set Up

You can use the FTP client provided by openEuler for verification. The command and output are as follows. Enter the user name \(an existing user in the system\) and password as prompted. If the message "Login successful" is displayed, the FTP server is successfully set up.

```
$ ftp localhost
Trying 127.0.0.1...
Connected to localhost (127.0.0.1).
220-Welcome to this FTP server!
220
Name (localhost:root): USERNAME
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> bye
221 Goodbye.
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>If the **ftp** command does not exist, run the **dnf install ftp** command as the **root** user to install the **ftp** software and then run the **ftp** command.  

## Configuring a Firewall

To open the FTP service to the Internet, you need to configure the firewall and SElinux as the **root** user.

```
# firewall-cmd --add-service=ftp --permanent
success
# firewall-cmd --reload
success
# setsebool -P ftpd_full_access on
```

## File Transmission

### Overview
This section describes how to transfer files after the vsftpd service is started.

### Connecting to the Server
**Command Format**

**ftp**  \[_hostname_  |  _ip-address_\]

**hostname**  indicates the name of the server, and  **ip-address**  indicates the IP address of the server.

**Requirements**

Run the following command on the command-line interface \(CLI\) of the openEuler OS:

```
$ ftp ip-address
```

Enter the user name and password as prompted. If the following information is displayed after the authentication is successful, the FTP connection is successful. In this case, you have accessed the directory of the connected server.

```
ftp>
```

At this prompt, you can enter different commands to perform related operations.

-   Display the current path of the server.

    ```
    ftp>pwd
    ```

-   Display the local path. You can upload the files in this path to the corresponding location on the FTP server.

    ```
    ftp>lcd
    ```

-   Exit the current window and return to the local Linux terminal.

    ```
    ftp>!
    ```


### Downloading a File
Generally, the get or mget command is used to download files.

**How to use get**

-   Function description: Transfers files from a remote host to a local host.
-   Command format:  **get**  \[_remote-file_\] \[_local-file_\]

    _remote-file_  indicates a remote file, and  _local-file_  indicates a local file.

-   For example, run the following command to obtain the /home/openEuler/openEuler.htm file on the remote server to the local directory /home/myopenEuler/ and change the file name to myopenEuler.htm

    ```
    ftp> get /home/openEuler/openEuler.htm /home/myopenEuler/myopenEuler.htm
    ```


**How to use mget**

-   Function description: Receives a batch of files from the remote host to the local host.
-   Command format:  **mget**  \[_remote-file_\]

    _remote-file_  indicates a remote file.

-   For example, to obtain all files in the /home/openEuler/ directory on the server, run the following command:

    ```
    ftp> cd /home/openEuler/
    ftp> mget *.*
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >-   In this case, a message is displayed each time a file is downloaded. To block the prompt information, run the  **prompt off**  command before running the  **mget \*.\***  command.  
    >-   The files are downloaded to the current directory on the Linux host. For example, if you run the ftp command in /home/myopenEuler/, all files are downloaded to /home/myopenEuler/.  


### Uploading a file
Generally, the put or mput command is used to upload files.

**How to use put**

-   Function: Transfers a local file to a remote host.
-   Command format:  **put**  \[_local-file_\] \[_remote-file_\]

    _remote-file_  indicates a remote file, and  _local-file_  indicates a local file.

-   For example, run the following command to transfer the local myopenEuler.htm file to the remote host /home/openEuler/ and change the file name to openEuler.htm:

    ```
    ftp> put myopenEuler.htm /home/openEuler/openEuler.htm
    ```


**How to use mput**

-   Function: Transfers a batch of files from the local host to a remote host.
-   Command format:  **mput**  \[_local-file_\]

    _local-file_  indicates a local file.

-   For example, run the following command to upload all HTM files in the local directory to the /home/openEuler/ directory on the server:

    ```
    ftp> cd /home/openEuler/
    ftp> mput *.htm
    ```


### Deleting a File
Generally, the  **delete**  or  **mdelete**  command is used to delete a file.

**How to use delete**

-   Function description: Deletes one or more files from the remote server.
-   Command format:  **delete**  \[_remote-file_\]

    _remote-file_  indicates a remote file.

-   For example, to delete the /home/openEuler/openEuler.htm from the remote server, run the following command:

    ```
    ftp> cd /home/openEuler/
    ftp> delete openEuler.htm
    ```


**How to use mdelete**

-   Function description: Deletes files from a remote server. This function is used to delete files in batches.
-   Command format:  **mdelete**  \[_remote-file_\]

    _remote-file_  indicates a remote file.

-   For example, to delete all files whose names start with  **a** from the /home/openEuler/ directory on the remote server, run the following command:

    ```
    ftp> cd /home/openEuler/
    ftp> mdelete a*
    ```


### Disconnecting from the Server
Run the bye command to disconnect from the server.

```
ftp> bye 
```
