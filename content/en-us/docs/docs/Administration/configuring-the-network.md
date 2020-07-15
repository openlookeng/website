# Configuring the Network
<!-- TOC -->

- [Configuring the Network](#configuring-the-network)
    - [Configuring an IP Address](#configuring-an-ip-address)
        - [Using the nmcli Command](#using-the-nmcli-command)
        - [Using the ip Command](#using-the-ip-command)
        - [Configuring the Network Through the ifcfg File](#configuring-the-network-through-the-ifcfg-file)
    - [Configuring a Host Name](#configuring-a-host-name)
        - [Introduction](#introduction)
        - [Configuring a Host Name by Running the  **hostnamectl**  Command](#configuring-a-host-name-by-running-the-hostnamectl-command)
        - [Configuring a Host Name by Running the nmcli Command](#configuring-a-host-name-by-running-the-nmcli-command)
    - [Configuring Network Bonding](#configuring-network-bonding)
        - [Running the nmcli Command](#running-the-nmcli-command)
        - [Configuring Network Bonding by Using a Command Line](#configuring-network-bonding-by-using-a-command-line)
    - [IPv6 Differences \(vs IPv4\)](#ipv6-differences-vs-ipv4)
        - [Restrictions](#restrictions)
        - [Configuration Description](#configuration-description)
        - [FAQ](#faq)

<!-- /TOC -->


## Configuring an IP Address



### Using the nmcli Command

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>The network configuration configured by running the  **nmcli**  command takes effect immediately and will not be lost after the system restarts.  


#### Introduction to nmcli

**nmcli**  \(NetworkManager Command Line Interface\) is the command-line utility to configure networking through NetworkManager. The basic format of using  **nmcli**  is as follows:

```
 nmcli [OPTIONS] OBJECT { COMMAND | help }
```

In the preceding command,  **OBJECT**  can be one of the following options:  **general**,  **networking**,  **radio**,  **connection**, and  **device**.  **OPTIONS**  can be optional options, such as  **-t**,  **\-\-terse**  \(for script processing\),**-p**,  **\-\-pretty**  \(for human-readable output\),  **-h**, and  **\-\-help**. For more information, run the  **nmcli help**  command.

```
$ nmcli help
```

Common commands are listed as follows:

-   To display the general status of NetworkManager, run the following command:

    ```
    $ nmcli general status
    ```

-   To display all connections, run the following command:

    ```
    $ nmcli connection show
    ```

-   To display the current active connections only, add the  **-a**  or  **\-\-active**  option as follows:

    ```
    $ nmcli connection show --active
    ```

-   To display the device identified by NetworkManager and its connection status, run the following command:

    ```
    $ nmcli device status
    ```

-   To start or stop network interfaces, for example, run the nmcli commands as the **root** user:

    ```
    # nmcli connection up id enp3s0
    # nmcli device disconnect enp3s0
    ```


#### Setting Network Connections

Run the following command to display all the available network connections:

```
$ nmcli con show


NAME    UUID                                  TYPE      DEVICE
enp4s0  5afce939-400e-42fd-91ee-55ff5b65deab  ethernet  enp4s0
enp3s0  c88d7b69-f529-35ca-81ab-aa729ac542fd  ethernet  enp3s0
virbr0  ba552da6-f014-49e3-91fa-ec9c388864fa  bridge    virbr0
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>In the command output,  **NAME**  indicates the connection ID \(name\).  

After a network connection is added, the corresponding configuration file is generated and associated with the corresponding device. To check for available devices, run the following command:

```
$ nmcli dev status

DEVICE      TYPE      STATE      CONNECTION
enp3s0      ethernet  connected  enp3s0
enp4s0      ethernet  connected  enp4s0
virbr0      bridge    connected  virbr0
lo          loopback  unmanaged  --
virbr0-nic  tun       unmanaged  --
```



##### Configuring Dynamic IP Connections

###### Configuring IP Addresses
When DHCP is used to allocate a network, run the following command to add a network configuration file:

```
nmcli connection add type ethernet con-name connection-name ifname interface-name
```

For example, to create a dynamic connection configuration file named  **net-test**, run the following command as the **root** user:

```
# nmcli connection add type ethernet con-name net-test ifname enp3s0
Connection 'net-test' (a771baa0-5064-4296-ac40-5dc8973967ab) successfully added.
```

The NetworkManager sets  **connection.autoconnect**  to  **yes**  and saves the setting to the  **/etc/sysconfig/network-scripts/ifcfg-net-test**  file. In the  **/etc/sysconfig/network-scripts/ifcfg-net-test**  file,  **ONBOOT**  is set to  **yes**.

###### Activating a Connection and Checking Device Connection Status
Run the following command as the **root** user to activate a network connection:

```
# nmcli con up net-test 
Connection successfully activated (D-Bus active path:/org/freedesktop/NetworkManager/ActiveConnection/5)
```

Run the following command to check the connection status of devices:

```
$ nmcli device status

DEVICE      TYPE      STATE      CONNECTION
enp4s0      ethernet  connected  enp4s0
enp3s0      ethernet  connected  net-test
virbr0      bridge    connected  virbr0
lo          loopback  unmanaged  --
virbr0-nic  tun       unmanaged  --
```

##### Configuring Static IP Connections

###### Configuring IP Addresses
To add a static IPv4 network connection, run the following command:

```
nmcli connection add type ethernet con-name connection-name ifname interface-name ip4 address gw4 address
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>To add an IPv6 address and related gateway information, use the  **ip6**  and  **gw6**  options.  

For example, to create a static connection configuration file named  **net-static**, run the following command as the **root** user:

```
# nmcli con add type ethernet con-name net-static ifname enp3s0 ip4 192.168.0.10/24 gw4 192.168.0.254
```

You can also specify the IPv6 address and gateway for the device. The following is an example:

```
# nmcli con add type ethernet con-name test-lab ifname enp3s0 ip4 192.168.0.10/24 gw4 192.168.0.254 ip6 abbe::**** gw6 2001:***::*
Connection 'net-static' (63aa2036-8665-f54d-9a92-c3035bad03f7) successfully added.
```

The NetworkManager sets the internal parameter  **ipv4.method**  to  **manual**,  **connection.autoconnect**  to  **yes**, and writes the setting to the  **/etc/sysconfig/network-scripts/ifcfg-my-office**  file. In the file,  **BOOTPROTO**  is set to  **none**, and  **ONBOOT**  is set to  **yes**.

Run the following command as the **root** user to set IPv4 addresses of two DNS servers:

```
# nmcli con mod net-static ipv4.dns "*.*.*.* *.*.*.*"
```

Run the following command as the **root** user to set IPv6 addresses of two DNS servers:

```
# nmcli con mod net-static ipv6.dns "2001:4860:4860::**** 2001:4860:4860::****"
```

###### Activating a Connection and Checking Device Connection Status
Run the following command as the **root** user to activate a network connection:

```
# nmcli con up net-static ifname enp3s0
Connection successfully activated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/6)
```

Run the following command to check the connection status of devices:

```
$ nmcli device status

DEVICE      TYPE      STATE      CONNECTION
enp4s0      ethernet  connected  enp4s0
enp3s0      ethernet  connected  net-static
virbr0      bridge    connected  virbr0
lo          loopback  unmanaged  --
virbr0-nic  tun       unmanaged  --
```

Run the following command to view the connection details \(with the  **-p**  and  **\-\-pretty**  options to add the title and segment to the output\):

```
$ nmcli -p con show net-static 
===============================================================================
Connection profile details (net-static )
===============================================================================
connection.id:                          net-static
connection.uuid:                        b9f18801-6084-4aee-af28-c8f0598ff5e1
connection.stable-id:                   --
connection.type:                        802-3-ethernet
connection.interface-name:              enp3s0
connection.autoconnect:                 yes
connection.autoconnect-priority:        0
connection.autoconnect-retries:         -1 (default)
connection.multi-connect:               0 (default)
connection.auth-retries:                -1
connection.timestamp:                   1578988781
connection.read-only:                   no
connection.permissions:                 --
connection.zone:                        --
connection.master:                      --
connection.slave-type:                  --
connection.autoconnect-slaves:          -1 (default)
connection.secondaries:                 --
connection.gateway-ping-timeout:        0
connection.metered:                     unknown
connection.lldp:                        default
connection.mdns:                        -1 (default)
connection.llmnr:                       -1 (default)
```

##### Adding a Wi-Fi Connection

Run the following command to check for available Wi-Fi access points:

```
$ nmcli dev wifi list
```

Run the following command to generate a static IP address configuration that allows Wi-Fi connections automatically allocated by the DNS:

```
$ nmcli con add con-name Wifi ifname wlan0 type wifi ssid MyWifi ip4 192.168.100.101/24 gw4 192.168.100.1
```

Run the following command to set a WPA2 password, for example,  **answer**:

```
$ nmcli con modify Wifi wifi-sec.key-mgmt wpa-psk
$ nmcli con modify Wifi wifi-sec.psk answer
```

Run the following command to change the Wi-Fi status:

```
$ nmcli radio wifi [ on | off ]
```

##### Modifying Attributes

Run the following command to check a specific attribute, for example, mtu:

```
$ nmcli connection show id 'Wifi ' | grep mtu
802-11-wireless.mtu: auto
```

Run the following command to modify the attribute:

```
$ nmcli connection modify id 'Wifi ' 802-11-wireless.mtu 1350
```

Run the following command to confirm the modification:

```
$ nmcli connection show id 'Wifi ' | grep mtu
802-11-wireless.mtu: 1350
```

#### Configuring a Static Route

-   Run the nmcli command to configure a static route for a network connection:

    ```
    $ nmcli connection modify enp3s0 +ipv4.routes "192.168.122.0/24 10.10.10.1"
    ```


-   Run the following command to configure the static route using the editor:

    ```
    $ nmcli con edit type ethernet con-name enp3s0
    ===| nmcli interactive connection editor |===
    Adding a new '802-3-ethernet' connection
    Type 'help' or '?' for available commands.
    Type 'describe [<setting>.<prop>]' for detailed property description.
    You may edit the following settings: connection, 802-3-ethernet (ethernet), 802-1x, ipv4, ipv6, dcb
    nmcli> set ipv4.routes 192.168.122.0/24 10.10.10.1
    nmcli>
    nmcli> save persistent
    Saving the connection with 'autoconnect=yes'. That might result in an immediate activation of the connection.
    Do you still want to save? [yes] yes
    Connection 'enp3s0' (1464ddb4-102a-4e79-874a-0a42e15cc3c0) successfully saved.
    nmcli> quit
    ```


### Using the ip Command

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>The network configuration configured using the  **ip**  command takes effect immediately, but the configuration will be lost after the system restarts.  



#### Configuring IP Addresses

Run the  **ip**  command to configure an IP address for the interface. The command format is as follows, where  _interface-name_  indicates the NIC name.

```
ip addr [ add | del ] address dev interface-name
```

##### Configuring a Static IP Address
Run the following command as the **root** user to configure an IP address:

```
# ip address add 192.168.0.10/24 dev enp3s0
```

Run the following command as the **root** user to view the configuration result:

```
# ip addr show dev enp3s0
2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 52:54:00:aa:ad:4a brd ff:ff:ff:ff:ff:ff
    inet 192.168.202.248/16 brd 192.168.255.255 scope global dynamic noprefixroute enp3s0
       valid_lft 9547sec preferred_lft 9547sec
    inet 192.168.0.10/24 scope global enp3s0
       valid_lft forever preferred_lft forever
    inet6 fe80::32e8:cc22:9db2:f4d4/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
```

##### Configuring Multiple IP Addresses
The  **ip**  command can be used to assign multiple IP addresses to an interface. You can run the  **ip**  command multiple times as the **root** user to assign IP addresses to an interface. The following is an example:

```
# ip address add 192.168.2.223/24 dev enp4s0
# ip address add 192.168.4.223/24 dev enp4s0
# ip addr

3: enp4s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 52:54:00:aa:da:e2 brd ff:ff:ff:ff:ff:ff
    inet 192.168.203.12/16 brd 192.168.255.255 scope global dynamic noprefixroute enp4s0
       valid_lft 8389sec preferred_lft 8389sec
    inet 192.168.2.223/24 scope global enp4s0
       valid_lft forever preferred_lft forever
    inet 192.168.4.223/24 scope global enp4s0
       valid_lft forever preferred_lft forever
    inet6 fe80::1eef:5e24:4b67:f07f/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
```

#### Configuring a Static Route

To add a static route to the routing table, run the **ip route add**  command. To delete a route, run the  **ip route del**  command. The following shows the common format of the  **ip route**  command: 

```
ip route [ add | del | change | append | replace ] destination-address
```

To display the current IP routing table, run the  **ip route**  command as the **root** user. The following is an example:

```
# ip route

default via 192.168.0.1 dev enp3s0 proto dhcp metric 100
default via 192.168.0.1 dev enp4s0 proto dhcp metric 101
192.168.0.0/16 dev enp3s0 proto kernel scope link src 192.168.202.248 metric 100
192.168.0.0/16 dev enp4s0 proto kernel scope link src 192.168.203.12 metric 101
192.168.122.0/24 dev virbr0 proto kernel scope link src 192.168.122.1 linkdown
```

To add a static route to the host address, run the following command as the **root** user:

```
ip route add 192.168.2.1 via 10.0.0.1 [dev interface-name]
```

In the preceding command,  **192.168.2.1**  is the IP address in the dot-decimal notation,  **10.0.0.1**  is the next hop, and  _interface-name_  is the exit interface for entering the next hop.

To add a static route to the network, that is, an IP address that represents an IP address range, run the following command as the **root** user:

```
ip route add 192.168.2.0/24 via 10.0.0.1 [dev interface-name]
```

In the preceding command,  **192.168.2.1**  is the IP address of the target network,  _10.0.0.1_  is the network prefix, and  _interface-name_  is the NIC name.

### Configuring the Network Through the ifcfg File

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>The network configured in the  **ifcfg**  file does not take effect immediately. You need to run the  **systemctl reload NetworkManager**  command as the **root** user to restart the network service for the configuration to take effect.  

#### Configuring a Static Network
The following uses the  **enp4s0**  network interface as an example to describe how to configure a static network by modifying the  **ifcfg**  file as the **root** user. The  **ifcfg-enp4s0**  file is generated in the  **/etc/sysconfig/network-scripts/**  directory. Modify the following parameters in the file:

```
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=none
IPADDR=192.168.0.10
PREFIX=24
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=enp4s0static
UUID=08c3a30e-c5e2-4d7b-831f-26c3cdc29293
DEVICE=enp4s0
ONBOOT=yes
```

#### Configuring a Dynamic Network
The following uses the  **em1**  network interface as an example to describe how to configure a dynamic network by modifying the  **ifcfg**  file. The  **ifcfg-em1**  file is generated in the  **/etc/sysconfig/network-scripts/**  directory. Modify the following parameters in the file:

```
DEVICE=em1
BOOTPROTO=dhcp
ONBOOT=yes
```

To configure an interface to send different host names to the DHCP server, add the following content to the  **ifcfg**  file:

```
DHCP_HOSTNAME=hostname
```

To configure an interface to ignore the routes sent by the DHCP server to prevent network services from updating the /etc/resolv.conf file using the DNS server received from the DHCP server, add the following content to the  **ifcfg**  file:

```
PEERDNS=no
```

To configure an interface to use a specific DNS server, set the  **PEERDNS**  parameter to  **no**  and add the following content to the  **ifcfg**  file:

```
DNS1=ip-address
DNS2=ip-address
```

**ip-address**  is the IP address of the DNS server. This allows the network service to update the **/etc/resolv.conf**  file using the specified DNS server.

#### Default Gateway Configuration
When determining the default gateway, parse the  **/etc/sysconfig/network**  file and then the  **ifcfg**  file, and uses the value of  **GATEWAY**  that is read last as the default route in the routing table.

In a dynamic network environment, when the NetworkManager is used to manage hosts, you are advised to set the default gateway to DHCP assignment.

## Configuring a Host Name



### Introduction

There are three types of host names:  **static**,  **transient**, and  **pretty**.

-   **static**: Static host name, which can be set by users and saved in the  **/etc/hostname**  file.
-   **transient**: Dynamic host name, which is maintained by the kernel. The initial value is a static host name. The default value is  **localhost**. The value can be changed when the DHCP or mDNS server is running.
-   **pretty**: Flexible host name, which can be set in any form \(including special characters/blanks\). Static and transient host names are subject to the general domain name restrictions.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>Static and transient host names can contain only letters \(a–z and A–Z\), digits \(0–9\), hyphens \(-\), underlines \(\_\), and periods \(.\). The host names cannot start or end with a period \(.\) or contain two consecutive periods \(.\). The host name can contain a maximum of 64 characters.  

### Configuring a Host Name by Running the  **hostnamectl**  Command

#### Viewing All Host Names
Run the following command to view the current host name:

```
$ hostnamectl status
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>If no option is specified in the command, the  **status**  option is used by default.  

#### Setting All Host Names
Run the following command as the **root** user to set all host names:

```
# hostnamectl set-hostname name
```

#### Setting a Specific Host Name
Run the following command as the **root** user to set a specific host name:

```
# hostnamectl set-hostname name [option...]
```

The option may be one or more of  **\-\-pretty**,  **\-\-static**, and  **\-\-transient**.

If  **\-\-static**  or  **\-\-transient**  is used together with  **\-\-pretty**, the host names of the  **static**  or  **transient**  type will be simplified to the host names of the  **pretty**  type with spaces replaced with hyphens \(-\) and special characters deleted.

When setting a host name of the  **pretty**  type, use quotation marks if the host name contains spaces or single quotation marks. An example is as follows:

```
# hostnamectl set-hostname "Stephen's notebook" --pretty
```

#### Clearing a Specific Host Name
To clear a specific host name and restore it to the default format, run the following command as the **root** user:

```
# hostnamectl set-hostname "" [option...]
```

In the preceding command,  **""**  is a blank character string, and the  _option_  may be one or more of  **\-\-pretty**,  **\-\-static**, and  **\-\-transient**.

#### Remotely Changing a Host Name
To change the host name in a remote system, run the  **hostnamectl**  command as the **root** user with the  **-H**  or  **\-\-host**  option.

```
# hostnamectl set-hostname -H [username]@hostname new_hostname
```

In the preceding command,  _hostname_  indicates the name of the remote host to be configured,  _username_ indicates the user-defined name, and  *new\_hostname*  indicates the new host name.  **hostnamectl**  is used to connect to the remote system through SSH.

### Configuring a Host Name by Running the nmcli Command

To query a static host name, run the following command:

```
$ nmcli general hostname
```

To name a static host as  **host-server**, run the following command as **root** user:

```
# nmcli general hostname host-server
```

To enable the system to detect the change of the static host name, run the following command as the **root** user to restart the hostnamed service:

```
# systemctl restart systemd-hostnamed
```

## Configuring Network Bonding



### Running the nmcli Command

-   To create a bond named  **mybond0**, run the following command: 

    ```
    $ nmcli con add type bond con-name mybond0 ifname mybond0 mode active-backup
    ```

-   To add a slave interface, run the following command:

    ```
    $ nmcli con add type bond-slave ifname enp3s0 master mybond0
    ```

    To add another slave interface, repeat the preceding command with the new interface name:

    ```
    $ nmcli con add type bond-slave ifname enp4s0 master mybond0
    Connection 'bond-slave-enp4s0' (05e56afc-b953-41a9-b3f9-0791eb49f7d3) successfully added.
    ```

-   To enable a bond, run the following command to enable the slave interface first:

    ```
    $ nmcli con up bond-slave-enp3s0
    Connection successfully activated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/14)
    ```

    ```
    $ nmcli con up bond-slave-enp4s0
    Connection successfully activated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/15)
    ```

    Then, run the following command to enable the bond:

    ```
    $ nmcli con up mybond0
    Connection successfully activated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/16)
    ```


### Configuring Network Bonding by Using a Command Line

#### Checking Whether the Bonding Kernel Module Is Installed

By default, the bonding kernel module is loaded. To load this module, run the following command as the **root** user:

```
# modprobe --first-time bonding
```

Run the following command as the **root** user to display the information about the module:

```
# modinfo bonding
```

For more commands, run the modprobe \-\-help command as the **root** user.

#### Creating a Channel Bonding Interface

To create a channel bonding interface, you can create a file named  **ifcfg-bondN**  in the  **/etc/sysconfig/network-scripts/**  directory as the **root** user \(replacing N with the actual interface number, for example, 0\).

Write the corresponding content to the configuration file according to the type of the interface to be bonded, for example, network interface. An example of the interface configuration file is as follows:

```
DEVICE=bond0
NAME=bond0
TYPE=Bond
BONDING_MASTER=yes
IPADDR=192.168.1.1
PREFIX=24
ONBOOT=yes
BOOTPROTO=none
BONDING_OPTS="bonding parameters separated by spaces"
```

#### Creating a Slave Interface

After creating a channel bonding interface, you must add the  **MASTER**  and  **SLAVE**  instructions to the configuration file of the slave interface.

For example, to bind the two network interfaces enp3s0 and enp4s0 in channel mode, the configuration files are as follows:

```
TYPE=Ethernet
NAME=bond-slave-enp3s0
UUID=3b7601d1-b373-4fdf-a996-9d267d1cac40
DEVICE=enp3s0
ONBOOT=yes
MASTER=bond0
SLAVE=yes
```

```
TYPE=Ethernet
NAME=bond-slave-enp4s0
UUID=00f0482c-824f-478f-9479-abf947f01c4a
DEVICE=enp4s0
ONBOOT=yes
MASTER=bond0
SLAVE=yes
```

#### Activating Channel Bonding

To activate channel bonding, you need to enable all the slave interfaces. Run the following command as the  **root** user:

```
# ifup enp3s0
Connection successfully activated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/7)
```

```
# ifup enp4s0
Connection successfully activated (D-Bus active path: /org/freedesktop/NetworkManager/ActiveConnection/8)
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>If an interface is in  **up**  state, run the  **ifdown** _enp3s0_  command to change the state to  **down**. In the command,  _enp3s0_  indicates the actual NIC name.  

After that, enable all the slave interfaces to enable the bonding \(do not set them to  **Down**\).

To enable the NetworkManager to detect the modifications made by the system, run the following command as the **root**  user after each modification:

```
# nmcli con load /etc/sysconfig/network-scripts/ifcfg-device
```

Run the following command as the **root** user to check the status of the bonded interface:

```
# ip link show

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 52:54:00:aa:ad:4a brd ff:ff:ff:ff:ff:ff
3: enp4s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 52:54:00:aa:da:e2 brd ff:ff:ff:ff:ff:ff
4: virbr0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN mode DEFAULT group default qlen 1000
    link/ether 86:a1:10:fb:ef:07 brd ff:ff:ff:ff:ff:ff
5: virbr0-nic: <BROADCAST,MULTICAST> mtu 1500 qdisc fq_codel master virbr0 state DOWN mode DEFAULT group default qlen 1000
    link/ether 52:54:00:29:35:4c brd ff:ff:ff:ff:ff:ff
```

#### Creating Multiple Bondings

The system creates a channel bonding interface for each bonding, including the  **BONDING\_OPTS**  instruction. This configuration method allows multiple bonded devices to use different configurations. Perform the following operations to create multiple channel bonding interfaces:

-   Create multiple  **ifcfg-bondN**  files that contain the  **BONDING\_OPTS**  instruction so that network scripts can create bonding interfaces as required.
-   Create or edit the existing interface configuration file to be bonded, and add the  **SLAVE**  instruction.
-   Use the MASTER instruction to assign the interface to be bonded, that is, the slave interface, to the channel bonding interface.

The following is an example of the configuration file of a channel bonding interface:

```
DEVICE=bondN
NAME=bondN
TYPE=Bond
BONDING_MASTER=yes
IPADDR=192.168.1.1
PREFIX=24
ONBOOT=yes
BOOTPROTO=none
BONDING_OPTS="bonding parameters separated by spaces"
```

In this example, replace N with the number of the bonded interface. For example, to create two interfaces, you need to create two configuration files  **ifcfg-bond0**  and  **ifcfg-bond1**  with correct IP addresses.

## IPv6 Differences \(vs IPv4\)

### Restrictions

-   chrony supports global addresses but not link-local addresses.
-   Firefox supports the access to the global address through HTTP or HTTPS, but does not support the access to the link-local address.

### Configuration Description



#### Setting the MTU of an Interface Device

##### Overview
In an IPv6 scenario, the minimum MTU value of the entire routing path is used as the PMTU value of the current link. The source end determines whether to fragment packets based on the PMTU value. Other devices on the entire path do not need to fragment packets. This reduces the load of intermediate routing devices. The minimum value of IPv6 PMTU is 1280.

##### Setting the MTU of the Interface Device
If the MTU of an interface configured with an IPv6 address is set to a value smaller than  **1280**  \(the minimum value of the IPv6 PMTU\), the IPv6 address of the interface will be deleted and cannot be added again. Therefore, in IPv6 scenarios, the MTU of the interface device must be greater than or equal to 1280. Run the following commands as the **root** user to view the details: 

```
# ip addr show enp3s0
3: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 52:54:00:62:xx:xx brd ff:ff:ff:ff:xx:xx
    inet 10.41.125.236/16 brd 10.41.255.255 scope global noprefixroute dynamic enp3s0
       valid_lft 38663sec preferred_lft 38663sec
    inet6 2001:222::2/64 scope global
       valid_lft forever preferred_lft forever
```

```
# ip link set dev enp3s0 mtu 1200
# ip addr show enp3s0
3: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1200 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 52:54:00:62:xx:xx brd ff:ff:ff:ff:xx:xx
    inet 10.41.125.236/16 brd 10.41.255.255 scope global noprefixroute dynamic enp3s0
       valid_lft 38642sec preferred_lft 38642sec
```

```
# ip addr add 2001:222::2/64 dev enp3s0
RTNETLINK answers: No buffer space available
```

```
# ip link set dev enp3s0 mtu 1500
# ip addr show enp3s0
3: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 52:54:00:62:xx:xx brd ff:ff:ff:ff:xx:xx
    inet 10.41.125.236/16 brd 10.41.255.255 scope global noprefixroute dynamic enp3s0
       valid_lft 38538sec preferred_lft 38538sec
```

```
# ip addr add 2001:222::2/64 dev enp3s0
# ip addr show enp3s0
3: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 52:54:00:62:xx:xx brd ff:ff:ff:ff:xx:xx
    inet 10.41.125.236/16 brd 10.41.255.255 scope global noprefixroute dynamic enp3s0
       valid_lft 38531sec preferred_lft 38531sec
    inet6 2001:222::2/64 scope global
       valid_lft forever preferred_lft forever
```

#### Stateful IPv6 Address Autoconfiguration

##### Overview
Both IPv6 and IPv4 addresses can be obtained through DHCP as the **root** user. There are configuration methods for IPv6 address: stateless autoconfiguration and stateful autoconfiguration.

-   Stateless autoconfiguration

    The DHCP server is not required for management. The device obtains the network prefix according to the router advertisement \(RA\), or the prefix of a link-local address is fixed to fe80::. The interface ID is automatically obtained based on the value of IPV6\_ADDR\_GEN\_MODE in the ifcfg file.

    1.  If the value of IPv6\_ADDR\_GEN\_MODE is stable-privacy, the device determines a random interface ID based on the device and network environment.
    2.  If the value of IPv6\_ADDR\_GEN\_MODE is EUI64, the device determines the interface ID based on the device MAC address.

-   Stateful autoconfiguration: The DHCP server manages and leases IPv6 addresses from the DHCPv6 server base on the DHCPv6 protocol.

    In stateful autoconfiguration, the DHCPv6 server can classify clients based on the vendor class configured on the clients and assign IPv6 addresses in different address segments to different types of clients. In IPv4 scenarios, the client can use the -V option of the dhclient command to set the vendor-class-identifier field. The DHCP server classifies clients based on the vendor-class-identifier field in the configuration file. In IPv6 scenarios, if the same method is used to classify clients, the classification does not take effect.

    ```
    dhclient -6 <interface> -V <vendor-class-identifier string> <interface>
    ```

    This is because DHCPv6 differs greatly from DHCP. The vendor-class-option in DHCPv6 replaces the vendor-class-identifier in DHCP. However, the -V option of dhclient cannot be set to vendor-class-option.


##### Setting the vendor class for dhclient in Stateful IPv6 Address Autoconfiguration
-   On the client, add the setting of vendor class by using the configuration file.

    Client configuration file \(/etc/dhcp/dhclient6.conf\): The file location can be customized. You need to specify the configuration file using the dhclient -cf option.

    ```
    option dhcp6.vendor-class code 16 = {integer 32, integer 16, string};
    interface "enp3s0" {
            send dhcp6.vendor-class <Enterprise-ID number> <vendor class string length> <vendor class string>;
    }
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >-   \<Enterprise-ID number\>: a 32-digit integer, indicating the enterprise ID. The enterprise is registered through the IANA.  
    >-   \<vendor class string length\>: a 16-digit integer, indicating the length of the vendor class string.  
    >-   \<vendor class string\>: character string of the vendor class to be set, for example, HWHW.  

    On the client:

    ```
    dhclient -6 <interface> -cf /etc/dhcp/dhclient6.conf
    ```


-   The DHCPv6 server configuration file \(/etc/dhcp/dhcpd6.conf\) needs to be specified by the dhcpd -cf option.

    ```
    option dhcp6.vendor-class code 16 = {integer 32, integer 16, string};
    subnet6 fc00:4:12:ffff::/64 {
            class "hw" {
                    match if substring ( option dhcp6.vendor-class, 6, 10 ) = "HWHW";
            }
            pool6 {
                    allow members of "hw";
                    range6 fc00:4:12:ffff::ff10 fc00:4:12:ffff::ff20;
            }
            pool6 {
                    allow unknown clients;
                    range6 fc00:4:12:ffff::100 fc00:4:12:ffff::120;
            }
    }
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >In substring \(option dhcp6.vendor-class, 6, 10\), the start position of the substring is 6, because the substring contains four bytes of <Enterprise-ID number\> and two bytes of <string length\>. The end position of the substring is 6+<vendor class string length\>. In this example, the vendor class string is HWHW, and the length of the string is 4. Therefore, the end position of the substring is 6 + 4 = 10. You can specify <vendor class string\> and <vendor class string length\> as required.  

    On the server:

    ```
    dhcpd -6 -cf /etc/dhcp/dhcpd6.conf <interface>
    ```


#### Kernel Supporting Socket-Related System Calls

##### Overview
The length of an IPv6 address is extended to 128 bits, indicating that there are sufficient IPv6 addresses for allocation. Compared with the IPv4 header, the IPv6 header is simplified, and the IPv6 automatic configuration function is enhanced. IPv6 addresses are classified into unicast addresses, multicast addresses, and anycast addresses. Common unicast addresses include link-local addresses, unique local addresses, and global addresses. As there are sufficient global IPv6 addresses, unique local addresses are not used. \(formerly known as site-local addresses, which were discarded in 2004.\) Currently, the mainstream unicast addresses are link-local address and global address. The current kernel supports socket system invoking. The link-local address and global address using unicast addresses are different.

##### Differences Between the link-local Address and global Address During Socket Invoking
RFC 2553: Basic Socket Interface Extensions for IPv6 defines the sockaddr\_in6 data structure as follows:

```
struct sockaddr_in6 {     
    uint8_t         sin6_len;       /* length of this struct */     
    sa_family_t     sin6_family;    /* AF_INET6 */     
    in_port_t       sin6_port;      /* transport layer port # */     
    uint32_t        sin6_flowinfo;  /* IPv6 flow information */     
    struct in6_addr sin6_addr;      /* IPv6 address */     
    uint32_t        sin6_scope_id;  /* set of interfaces for a scope */ 
}; 
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>sin6\_scope\_id: a 32-bit integer. For the link-local address, it identifies the index of the specified interface. For the link-range sin6\_addr, it identifies the index of the specified interface. For the site-range sin6\_addr, it is used as the site identifier \(the site-local address has been discarded\).  

When the link-local address is used for socket communication, the interface index corresponding to the address needs to be specified when the destination address is constructed. Generally, you can use the if\_nametoindex function to convert an interface name into an interface index number. Details are as follows:

```
int port = 1234;
int sk_fd;
int iff_index = 0;
char iff_name[100] = "enp3s0";
char * ll_addr[100] = "fe80::123:456:789";
struct sockaddr_in6 server_addr;

memset(&server_addr,0,sizeof(structsockaddr_in6));
iff_index=if_nametoindex(iff_name);

server_addr.sin6_family=AF_INET6;
server_addr.sin6_port=htons(port);
server_addr.sin6_scope_id=iff_index;
inet_pton(AF_INET6, ll_addr, &(server_addr.sin6_addr));

sk_fd=socket(AF_INET6, SOCK_STREAM, IPPROTO_TCP);
connect(sk_fd, (struct sockaddr *)&server_addr, sizeof(struct sockaddr_in6));
```

#### Persistency Configuration of the IPv4 dhclient Daemon Process

##### Overview
When the NetworkManager service is used to manage network services, if the ifcfg-<interface-name\> configuration file of an interface is configured to obtain an IP address in DHCP mode, the NetworkManager service starts the dhclient daemon process to obtain an IP address from the DHCP server.

The dhclient provides the -1 option to determine whether the dhclient process persistently attempts to request an IP address or exits after the request times out before receiving a response from the DHCP server. For the IPv4 dhclient daemon process, you can set PERSISTENT\_DHCLIENT in the ifcfg-<interface-name\> configuration file to determine whether to set the persistence of the IPv4 dhclient process.

##### Restrictions
1.  If the ongoing dhclient process is killed, the network service cannot automatically start it. Therefore, you need to ensure the reliability.
2.  If PERSISTENT\_DHCLIENT is configured, ensure that the corresponding DHCP server exists. If no DHCP server is available when the network service is started and the dhclient process continuously attempts to send request packets but does not receive any response, the network service is suspended until the network service times out. The network service starts the IPv4 dhclient processes of multiple NICs in serial mode. If persistency is configured for a NIC but the DHCP server is not ready, the network service will be suspended when obtaining an IPv4 address for the NIC. As a result, the NIC cannot obtain an IPv4 or IPv6 address.

The preceding restrictions apply to special scenarios. You need to ensure reliability.

##### Configuration Differences Between IPv4 DHCP and IPv6 DHCPv6
You can configure the ifcfg-<interface-name\> parameter on an interface to enable IPv4 and IPv6 to dynamically obtain IP addresses using DHCP or DHCPv6. The configuration is as follows:

```
BOOTPROTO=none|bootp|dhcp
DHCPV6C=yes|no
PERSISTENT_DHCLIENT=yes|no|1|0
```

-   BOOTPROTO:  **none**  indicates that an IPv4 address is statically configured. bootp|dhcp enables DHCP dhclient to dynamically obtain an IPv4 address.
-   DHCPV6C:  **no**  indicates that an IPv6 address is statically configured, and  **yes**  indicates that the DHCPv6 dhclient is enabled to dynamically obtain the IPv6 address.
-   PERSISTENT\_DHCLIENT:  **no|0**  indicates that the IPv4 dhclient process is configured as nonpersistent. If the dhclient sends a request packet to the DHCP server but does not receive any response, the dhclient exits after a period of time and the exit value is 2.  **yes|1**  indicates that the IPv4 dhclient process is configured to be persistent. The dhclient process repeatedly sends request packets to the DHCP server.  **If PERSISTENT\_DHCLIENT is not configured, dhclient of IPv4 is set to yes|1 by default.**

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >The PERSISTENT\_DHCLIENT configuration takes effect only for IPv4 and does not take effect for IPv6-related dhclient -6 processes. By default, the persistence configuration is not performed for IPv6.  


#### Differences Between IPv4 and IPv6 Configuration Using the iproute Command

##### Overview
IPv4 and IPv6 are two different protocol standards. Therefore, the iproute commands are different in usage. This section describes the differences between IPv4 and IPv6 commands in the iproute package.

To run the iproute commands, you must have the root permission.  

##### Lifecycle of an IPv6 Address
<a name="en-us_topic_0161841798_en-us_topic_0159090633_table2076913233253"></a>
<table><thead align="left"><tr id="en-us_topic_0161841798_en-us_topic_0159090633_row583762317252"><th class="cellrowborder" valign="top" width="22%" id="mcps1.1.3.1.1"><p id="en-us_topic_0161841798_en-us_topic_0159090633_p2837142362517"><a name="en-us_topic_0161841798_en-us_topic_0159090633_p2837142362517"></a><a name="en-us_topic_0161841798_en-us_topic_0159090633_p2837142362517"></a><strong id="b416366142214"><a name="b416366142214"></a><a name="b416366142214"></a>IPv6 status</strong></p>
</th>
<th class="cellrowborder" valign="top" width="78%" id="mcps1.1.3.1.2"><p id="en-us_topic_0161841798_en-us_topic_0159090633_p10837823172516"><a name="en-us_topic_0161841798_en-us_topic_0159090633_p10837823172516"></a><a name="en-us_topic_0161841798_en-us_topic_0159090633_p10837823172516"></a><strong id="b1836381462215"><a name="b1836381462215"></a><a name="b1836381462215"></a>Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0161841798_en-us_topic_0159090633_row178371023162518"><td class="cellrowborder" valign="top" width="22%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0161841798_en-us_topic_0159090633_p38371523152510"><a name="en-us_topic_0161841798_en-us_topic_0159090633_p38371523152510"></a><a name="en-us_topic_0161841798_en-us_topic_0159090633_p38371523152510"></a>tentative</p>
</td>
<td class="cellrowborder" valign="top" width="78%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0161841798_en-us_topic_0159090633_p198371423102517"><a name="en-us_topic_0161841798_en-us_topic_0159090633_p198371423102517"></a><a name="en-us_topic_0161841798_en-us_topic_0159090633_p198371423102517"></a>Temporary state: The newly added address is still in the DAD process.</p>
</td>
</tr>
<tr id="en-us_topic_0161841798_en-us_topic_0159090633_row58376230252"><td class="cellrowborder" valign="top" width="22%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0161841798_en-us_topic_0159090633_p683716233250"><a name="en-us_topic_0161841798_en-us_topic_0159090633_p683716233250"></a><a name="en-us_topic_0161841798_en-us_topic_0159090633_p683716233250"></a>preferred</p>
</td>
<td class="cellrowborder" valign="top" width="78%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0161841798_en-us_topic_0159090633_p19837122311259"><a name="en-us_topic_0161841798_en-us_topic_0159090633_p19837122311259"></a><a name="en-us_topic_0161841798_en-us_topic_0159090633_p19837122311259"></a>Preferred state: The DAD process is complete, but no NA packet is received, indicating that the address does not conflict.</p>
</td>
</tr>
<tr id="en-us_topic_0161841798_en-us_topic_0159090633_row883712382517"><td class="cellrowborder" valign="top" width="22%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0161841798_en-us_topic_0159090633_p88371623142516"><a name="en-us_topic_0161841798_en-us_topic_0159090633_p88371623142516"></a><a name="en-us_topic_0161841798_en-us_topic_0159090633_p88371623142516"></a>deprecated</p>
</td>
<td class="cellrowborder" valign="top" width="78%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0161841798_en-us_topic_0159090633_p38372023132510"><a name="en-us_topic_0161841798_en-us_topic_0159090633_p38372023132510"></a><a name="en-us_topic_0161841798_en-us_topic_0159090633_p38372023132510"></a>Deprecated state: An address has a validity period (valid_lft or preferred_lft). After preferred_lft expires, the address changes to the deprecated state.</p>
<p id="en-us_topic_0161841798_en-us_topic_0159090633_p4838102352510"><a name="en-us_topic_0161841798_en-us_topic_0159090633_p4838102352510"></a><a name="en-us_topic_0161841798_en-us_topic_0159090633_p4838102352510"></a>The address in this state cannot be used to create a new connection, but the original connection can still be used.</p>
</td>
</tr>
<tr id="en-us_topic_0161841798_en-us_topic_0159090633_row16838152313252"><td class="cellrowborder" valign="top" width="22%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0161841798_en-us_topic_0159090633_p108383237254"><a name="en-us_topic_0161841798_en-us_topic_0159090633_p108383237254"></a><a name="en-us_topic_0161841798_en-us_topic_0159090633_p108383237254"></a>invalid</p>
</td>
<td class="cellrowborder" valign="top" width="78%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0161841798_en-us_topic_0159090633_p19838132372518"><a name="en-us_topic_0161841798_en-us_topic_0159090633_p19838132372518"></a><a name="en-us_topic_0161841798_en-us_topic_0159090633_p19838132372518"></a>Invalid state: If the lease renewal fails after the preferred_lft time expires, the address status is set to invalid after the valid_lft time expires, indicating that the address cannot be used again.</p>
</td>
</tr>
</tbody>
</table>

Remarks:

-   preferred\_lft: preferred lifetime. The preferred\_lft address has not expired and can be used for normal communication. If there are multiple preferred addresses, the address is selected based on the kernel mechanism.
-   valid\_lft: valid lifetime. The address cannot be used for creating new connections within the period of \[preferred\_lft, valid\_lft\]. The existing connections are still valid.

##### ip link Command
The commands are as follows:

```
ip link set IFNAME mtu MTU
```

The minimum PMTU of IPv6 is 1280. If the MTU is set to a value smaller than 1280, IPv6 addresses will be lost. Other devices cannot ping the IPv6 address.

##### ip addr Command
1.  The commands are as follows:

    ```
    ip [-6] addr add IFADDR dev IFNAME
    ```

    You can choose to add the -6 option or not to add the IPv6 address. The ip addr command determines whether the address is an IPv4 address or an IPv6 address based on the address type.

    If the -6 option is specified but IFADDR is an IPv4 address, an error message is returned.

2.  The commands are as follows:

    ```
    ip [-6] addr add IFADDR  dev IFNAME [home|nodad]
    ```

    \[home|nodad\] is valid only for IPv6 addresses.

    -   home: specifies the home address defined in RFC 6275. \(This address is obtained by the mobile node from the home link, and is a permanent address of the mobile node. If the mobile node remains in the same home link, communication between various entities is performed normally.\)
    -   nodad: indicates that DAD is not performed when this IPv6 address is added. \(RFC 4862\) If multiple interfaces on a device are configured with the same IPv6 address through nodad, the IPv6 address is used in the interface sequence. An IPv6 address with both nodad and non-nodad cannot be added the same interface because the two IP addresses are the same. Otherwise, the message "RTNETLINK answers: File exists" is displayed.

3.  The commands are as follows:

    ```
    ip [-6] addr del IFADDR dev IFNAME
    ```

    You can choose to add the -6 option or not to delete an IPv6 address. The ip addr del command determines whether an IPv4 address or an IPv6 address is used based on the address type.

4.  The commands are as follows:

    ```
    ip [-6] addr show dev IFNAME [tentative|-tentative|deprecated|-deprecated|dadfailed|-dadfailed|temporary]
    ```

    -   If the -6 option is not specified, both IPv4 and IPv6 addresses are displayed. If the -6 option is specified, only IPv6 addresses are displayed.
    -   \[tentative|-tentative|deprecated|-deprecated|dadfailed|-dadfailed|temporary\]. These options are only for IPv6. You can filter and view addresses based on the IPv6 address status.
        1.  tentative: \(only for IPv6\) lists only the addresses that have not passed duplicate address detection \(DAD\).
        2.  -tentative: \(only for IPv6\) lists only the addresses that are not in the DAD process.
        3.  deprecated: \(only for IPv6\) lists only the deprecated addresses.
        4.  -deprecated: \(only for IPv6\) lists only the addresses that are not deprecated.
        5.  dadfailed: \(only for IPv6\) lists only the addresses that fail the DAD.
        6.  -dadfailed: \(only for IPv6\) lists only the addresses that do not encounter DAD failures.
        7.  temporary: \(only for IPv6\) lists only the temporary addresses.



##### ip route Command
1.  The commands are as follows:

    ```
    ip [-6] route add ROUTE [mtu lock MTU]
    ```

    -   -6 option: You can add the -6 option or not when adding an IPv6 route. The ip route command determines whether an IPv4 or IPv6 address is used based on the address type.

    -   mtu lock MTU: specifies the MTU of the locked route. If the MTU is not locked, the MTU value may be changed by the kernel during the PMTUD process. If the MTU is locked, PMTUD is not attempted. All IPv4 packets are not set with the DF bit and IPv6 packets are segmented based on the MTU.

2.  The commands are as follows:

    ```
    ip [-6] route del ROUTE
    ```

    You can choose whether to add the -6 option when deleting an IPv6 route. The ip route command determines whether an IPv4 address or an IPv6 address is used based on the address type.


##### ip rule command
1.  The commands are as follows:

    ```
    ip [-6] rule list
    ```

    -6 option: If the -6 option is set, IPv6 policy-based routes are printed. If the -6 option is not set, IPv4 policy-based routes are printed. Therefore, you need to configure the -6 option according to the specific protocol type.

2.  The commands are as follows:

    ```
    ip [-6] rule [add|del] [from|to] ADDR table TABLE pref PREF
    ```

    -6 option: IPv6-related policy routing entries need to be configured with the -6 option. Otherwise, the error message "Error: Invalid source address." is displayed. Accordingly, the -6 option cannot be set for IPv4-related policy routing entries. Otherwise, the error message "Error: Invalid source address." is displayed.


#### Configuration Differences of the NetworkManager Service

##### Overview
The NetworkManager service uses the ifup/ifdown logical interface definition to perform advanced network settings. Most of the parameters are set in the /etc/sysconfig/network and /etc/sysconfig/network-scripts/ifcfg-<interface-name\> configuration files. The former is a global setting, and the latter is a setting of a specified NIC. When the two settings conflict, the latter takes effect.

##### Configuration Differences
The configuration differences in /etc/sysconfig/network are as follows:

<a name="en-us_topic_0161841799_en-us_topic_0159175469_table376122593014"></a>
<table><thead align="left"><tr id="en-us_topic_0161841799_en-us_topic_0159175469_row16343172516309"><th class="cellrowborder" valign="top" width="23.002300230023003%" id="mcps1.1.4.1.1"><p id="en-us_topic_0161841799_en-us_topic_0159175469_p1934452593010"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1934452593010"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1934452593010"></a><strong id="en-us_topic_0161841799_en-us_topic_0159175469_b1059113443114"><a name="en-us_topic_0161841799_en-us_topic_0159175469_b1059113443114"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_b1059113443114"></a>IPv4</strong></p>
</th>
<th class="cellrowborder" valign="top" width="40.564056405640564%" id="mcps1.1.4.1.2"><p id="en-us_topic_0161841799_en-us_topic_0159175469_p14344152593019"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p14344152593019"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p14344152593019"></a><strong id="en-us_topic_0161841799_en-us_topic_0159175469_b146313473111"><a name="en-us_topic_0161841799_en-us_topic_0159175469_b146313473111"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_b146313473111"></a>IPv6</strong></p>
</th>
<th class="cellrowborder" valign="top" width="36.43364336433643%" id="mcps1.1.4.1.3"><p id="en-us_topic_0161841799_en-us_topic_0159175469_p13344152533019"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p13344152533019"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p13344152533019"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0161841799_en-us_topic_0159175469_row934415256301"><td class="cellrowborder" valign="top" width="23.002300230023003%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p16344192543016"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p16344192543016"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p16344192543016"></a>NA</p>
</td>
<td class="cellrowborder" valign="top" width="40.564056405640564%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p1334482573012"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1334482573012"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1334482573012"></a>IPV6FORWARDING=yes|no</p>
</td>
<td class="cellrowborder" valign="top" width="36.43364336433643%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p934414251302"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p934414251302"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p934414251302"></a>IPv6 forwarding. By default, IPv6 packets are not forwarded.</p>
</td>
</tr>
<tr id="en-us_topic_0161841799_en-us_topic_0159175469_row1344122517308"><td class="cellrowborder" valign="top" width="23.002300230023003%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p9344152513303"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p9344152513303"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p9344152513303"></a>NA</p>
</td>
<td class="cellrowborder" valign="top" width="40.564056405640564%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p123441025123013"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p123441025123013"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p123441025123013"></a>IPV6_AUTOCONF=yes|no</p>
</td>
<td class="cellrowborder" valign="top" width="36.43364336433643%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p1134418258307"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1134418258307"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1134418258307"></a>If IPv6 forwarding is enabled, the value is <strong id="b105538218525"><a name="b105538218525"></a><a name="b105538218525"></a>no</strong>. Otherwise, the value is<strong id="b675215418524"><a name="b675215418524"></a><a name="b675215418524"></a> yes</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0161841799_en-us_topic_0159175469_row3344325173018"><td class="cellrowborder" valign="top" width="23.002300230023003%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p9344725143019"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p9344725143019"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p9344725143019"></a>NA</p>
</td>
<td class="cellrowborder" valign="top" width="40.564056405640564%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p2344225183011"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p2344225183011"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p2344225183011"></a>IPV6_ROUTER=yes|no</p>
</td>
<td class="cellrowborder" valign="top" width="36.43364336433643%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p113441425163010"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p113441425163010"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p113441425163010"></a>If IPv6 forwarding is enabled, the value is <strong id="b85772918528"><a name="b85772918528"></a><a name="b85772918528"></a>yes</strong>. Otherwise, the value is <strong id="b875931175216"><a name="b875931175216"></a><a name="b875931175216"></a>no</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0161841799_en-us_topic_0159175469_row173447253307"><td class="cellrowborder" valign="top" width="23.002300230023003%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p534417251308"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p534417251308"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p534417251308"></a>NA</p>
</td>
<td class="cellrowborder" valign="top" width="40.564056405640564%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p8344132563010"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p8344132563010"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p8344132563010"></a>IPV6_AUTOTUNNEL=yes|no</p>
</td>
<td class="cellrowborder" valign="top" width="36.43364336433643%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p1634492520303"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1634492520303"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1634492520303"></a>Indicates the automatic tunnel mode. The default value is <strong id="b2020062113520"><a name="b2020062113520"></a><a name="b2020062113520"></a>no</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0161841799_en-us_topic_0159175469_row93441325113014"><td class="cellrowborder" valign="top" width="23.002300230023003%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p5344192543017"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p5344192543017"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p5344192543017"></a>GATEWAY</p>
</td>
<td class="cellrowborder" valign="top" width="40.564056405640564%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p234515256308"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p234515256308"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p234515256308"></a>IPV6_DEFAULTGW=&lt;IPv6 address[%interface]&gt; (optional)</p>
</td>
<td class="cellrowborder" valign="top" width="36.43364336433643%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p103451125123015"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p103451125123015"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p103451125123015"></a>Indicates the default gateway in IPv6.</p>
</td>
</tr>
<tr id="en-us_topic_0161841799_en-us_topic_0159175469_row1234519256301"><td class="cellrowborder" valign="top" width="23.002300230023003%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p334511251304"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p334511251304"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p334511251304"></a>NA</p>
</td>
<td class="cellrowborder" valign="top" width="40.564056405640564%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p9345122511309"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p9345122511309"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p9345122511309"></a>IPV6_DEFAULTDEV=&lt;interface&gt; (optional)</p>
</td>
<td class="cellrowborder" valign="top" width="36.43364336433643%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p153457255303"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p153457255303"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p153457255303"></a>Specifies the default forwarding NIC.</p>
</td>
</tr>
<tr id="en-us_topic_0161841799_en-us_topic_0159175469_row3345825183015"><td class="cellrowborder" valign="top" width="23.002300230023003%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p1734518251306"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1734518251306"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1734518251306"></a>NA</p>
</td>
<td class="cellrowborder" valign="top" width="40.564056405640564%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p0345325193012"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p0345325193012"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p0345325193012"></a>IPV6_RADVD_PIDFILE=&lt;pid-file&gt; (optional)</p>
</td>
<td class="cellrowborder" valign="top" width="36.43364336433643%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p1034614253307"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1034614253307"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1034614253307"></a>The default path of ipv6_radvd_pid is /var/run/radvd/radvd.pid.</p>
</td>
</tr>
<tr id="en-us_topic_0161841799_en-us_topic_0159175469_row15346162518300"><td class="cellrowborder" valign="top" width="23.002300230023003%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p15346125163015"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p15346125163015"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p15346125163015"></a>NA</p>
</td>
<td class="cellrowborder" valign="top" width="40.564056405640564%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p13460257306"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p13460257306"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p13460257306"></a>IPV6_RADVD_TRIGGER_ACTION=startstop|reload|restart|SIGHUP (optional)</p>
</td>
<td class="cellrowborder" valign="top" width="36.43364336433643%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p19346132573014"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p19346132573014"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p19346132573014"></a>Default radvd trigger action.</p>
</td>
</tr>
</tbody>
</table>

The differences in /etc/sysconfig/network-scripts/ifcfg-<interface-name\> are as follows:

<a name="en-us_topic_0161841799_en-us_topic_0159175469_table4128225193017"></a>
<table><thead align="left"><tr id="en-us_topic_0161841799_en-us_topic_0159175469_row034692593015"><th class="cellrowborder" valign="top" width="23.36%" id="mcps1.1.4.1.1"><p id="en-us_topic_0161841799_en-us_topic_0159175469_p14346225143017"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p14346225143017"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p14346225143017"></a><strong id="en-us_topic_0161841799_en-us_topic_0159175469_b1766035020317"><a name="en-us_topic_0161841799_en-us_topic_0159175469_b1766035020317"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_b1766035020317"></a>IPv4</strong></p>
</th>
<th class="cellrowborder" valign="top" width="40.339999999999996%" id="mcps1.1.4.1.2"><p id="en-us_topic_0161841799_en-us_topic_0159175469_p15346132533012"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p15346132533012"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p15346132533012"></a><strong id="en-us_topic_0161841799_en-us_topic_0159175469_b3663175019313"><a name="en-us_topic_0161841799_en-us_topic_0159175469_b3663175019313"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_b3663175019313"></a>IPv6</strong></p>
</th>
<th class="cellrowborder" valign="top" width="36.3%" id="mcps1.1.4.1.3"><p id="en-us_topic_0161841799_en-us_topic_0159175469_p6346142517307"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p6346142517307"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p6346142517307"></a><strong id="b154574125315"><a name="b154574125315"></a><a name="b154574125315"></a>Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0161841799_en-us_topic_0159175469_row63465257306"><td class="cellrowborder" valign="top" width="23.36%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p15346192519307"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p15346192519307"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p15346192519307"></a>IPADDRn</p>
</td>
<td class="cellrowborder" valign="top" width="40.339999999999996%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p173461625163014"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p173461625163014"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p173461625163014"></a>IPV6ADDR=&lt;IPv6 address&gt;[/&lt;prefix length&gt;]</p>
</td>
<td class="cellrowborder" valign="top" width="36.3%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p133461225173019"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p133461225173019"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p133461225173019"></a>indicates the IP address. </p>
</td>
</tr>
<tr id="en-us_topic_0161841799_en-us_topic_0159175469_row13347172513011"><td class="cellrowborder" valign="top" width="23.36%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p11347192511306"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p11347192511306"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p11347192511306"></a>PREFIXn</p>
</td>
<td class="cellrowborder" valign="top" width="40.339999999999996%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p18347825153015"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p18347825153015"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p18347825153015"></a>NA</p>
</td>
<td class="cellrowborder" valign="top" width="36.3%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p1234752513017"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1234752513017"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1234752513017"></a>The network prefix, network alias, and PPP are invalid. The priority is higher than that of NETMASK.</p>
</td>
</tr>
<tr id="en-us_topic_0161841799_en-us_topic_0159175469_row153471625183015"><td class="cellrowborder" valign="top" width="23.36%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p18347132511300"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p18347132511300"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p18347132511300"></a>NETMASKn</p>
</td>
<td class="cellrowborder" valign="top" width="40.339999999999996%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p3347102511304"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p3347102511304"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p3347102511304"></a>NA</p>
</td>
<td class="cellrowborder" valign="top" width="36.3%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p734772515307"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p734772515307"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p734772515307"></a>Indicates the subnet mask. It is used only for the alias and PPP.</p>
</td>
</tr>
<tr id="en-us_topic_0161841799_en-us_topic_0159175469_row193471625163016"><td class="cellrowborder" valign="top" width="23.36%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p1534742593013"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1534742593013"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1534742593013"></a>GATEWAY</p>
</td>
<td class="cellrowborder" valign="top" width="40.339999999999996%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p9347132515300"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p9347132515300"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p9347132515300"></a>IPV6_DEFAULTGW=&lt;IPv6 address[%interface]&gt; (optional)</p>
</td>
<td class="cellrowborder" valign="top" width="36.3%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p14347132523011"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p14347132523011"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p14347132523011"></a>Default gateway</p>
</td>
</tr>
<tr id="en-us_topic_0161841799_en-us_topic_0159175469_row1434762573016"><td class="cellrowborder" valign="top" width="23.36%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p53471625203015"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p53471625203015"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p53471625203015"></a>MTU</p>
</td>
<td class="cellrowborder" valign="top" width="40.339999999999996%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p203477255305"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p203477255305"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p203477255305"></a>IPV6_MTU=&lt;MTU of link&gt; (optional)</p>
</td>
<td class="cellrowborder" valign="top" width="36.3%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p19348625183012"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p19348625183012"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p19348625183012"></a>Default MTU</p>
</td>
</tr>
<tr id="en-us_topic_0161841799_en-us_topic_0159175469_row5348225173015"><td class="cellrowborder" valign="top" width="23.36%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p203481925113014"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p203481925113014"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p203481925113014"></a>IPV4_FAILURE_FATAL=yes|no</p>
</td>
<td class="cellrowborder" valign="top" width="40.339999999999996%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p73481225143013"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p73481225143013"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p73481225143013"></a>IPV6_FAILURE_FATAL</p>
</td>
<td class="cellrowborder" valign="top" width="36.3%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p1581816596383"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1581816596383"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1581816596383"></a>The default value is <strong id="b16798203616020"><a name="b16798203616020"></a><a name="b16798203616020"></a>no</strong>. If this parameter is set to <strong id="b2502744602"><a name="b2502744602"></a><a name="b2502744602"></a>yes</strong>, ifup-eth exits when dhclient fails.</p>
</td>
</tr>
<tr id="en-us_topic_0161841799_en-us_topic_0159175469_row1134822543015"><td class="cellrowborder" valign="top" width="23.36%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p9348122573019"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p9348122573019"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p9348122573019"></a>NA</p>
</td>
<td class="cellrowborder" valign="top" width="40.339999999999996%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p734832513017"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p734832513017"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p734832513017"></a>IPV6_PRIVACY=rfc3041</p>
</td>
<td class="cellrowborder" valign="top" width="36.3%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p10348152518301"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p10348152518301"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p10348152518301"></a>Disabled by default.</p>
</td>
</tr>
<tr id="en-us_topic_0161841799_en-us_topic_0159175469_row1134882573014"><td class="cellrowborder" valign="top" width="23.36%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p634802533014"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p634802533014"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p634802533014"></a>NA</p>
</td>
<td class="cellrowborder" valign="top" width="40.339999999999996%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p33481925173012"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p33481925173012"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p33481925173012"></a>IPV6INIT=yes|no</p>
</td>
<td class="cellrowborder" valign="top" width="36.3%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p113492254302"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p113492254302"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p113492254302"></a>IPv6 is enabled by default.</p>
</td>
</tr>
<tr id="en-us_topic_0161841799_en-us_topic_0159175469_row133491725173012"><td class="cellrowborder" valign="top" width="23.36%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p1834922518303"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1834922518303"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1834922518303"></a>NA</p>
</td>
<td class="cellrowborder" valign="top" width="40.339999999999996%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p1834982543011"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1834982543011"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p1834982543011"></a>IPV6FORWARDING=yes|no</p>
</td>
<td class="cellrowborder" valign="top" width="36.3%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0161841799_en-us_topic_0159175469_p12349132516309"><a name="en-us_topic_0161841799_en-us_topic_0159175469_p12349132516309"></a><a name="en-us_topic_0161841799_en-us_topic_0159175469_p12349132516309"></a>This function is disabled by default and has been discarded.</p>
</td>
</tr>
</tbody>
</table>

### FAQ



#### The iscsi-initiator-utils Does Not Support the fe80 IPv6 Address.

##### Symptom
When a client uses an IPv6 address to log in to the iSCSI server, run the iscsiadm -m node -p ipv6address -l command. If the global address is used, replace ipv6address in the command example with the global address. However, the link-local address \(IPv6 address starting with fe80\) cannot be used because the current mechanism of iscsi-initiator-utils does not support the link-local address to log in to the iSCSI server.

##### Possible Cause
If you log in to the system using the iscsiadm -m node -p fe80::xxxx -l format, a login timeout error is returned. This is because you must specify an interface when using the link-local address. Otherwise, the iscsi\_io\_tcp\_connect function fails to invoke the connect function, and the standard error code 22 is generated.

If you use the iscsiadm -m node -p fe80::xxxx%enp3s0 -l format for login, the iscsi\_addr\_match function will compare the address fe80::xxxx%enp3s0 with the address fe80::xxxx in the node information returned by the server. The comparison result does not match, causing the login failure.

Therefore,  **the current mechanism of iscsi-initiator-utils does not support login to the iSCSI server using a link-local address.**

#### The IPv6 Address Is Lost After the NIC Is Down.

##### Symptom
Run the ip link down+up NIC or ifconfig down+up NIC command to disable the NIC and then enable it to go online. Check the IP address configured on the NIC. It is found that the IPv4 address is not lost but the configured IPv6 address is lost.

##### Possible Cause
According to the processing logic in the kernel, if the NIC is set to the down state, all IPv4 and IPv6 addresses will be cleared. After the NIC is set to the up state, the IPv4 address is automatically restored, and the automatically configured IPv6 link-local address on the NIC is also restored. However, other IPv6 addresses are lost by default. To retain these IPv6 addresses, run the  **sysctl -w net.ipv6.conf.\< _NIC name_ \>.keep\_addr\_on\_down=1**  command.

#### Taking a Long Time to Add or Delete an IPv6 Address for a Bond Interface with Multiple IPv6 Addresses

##### Symptom
When users run the following command to add or delete \(including flush\) an IPv6 address, the waiting time increases linearly along with the number of IPv6 addresses configured on a bond interface.  **X**  is the least significant 16 bits that dynamically change. For example, it takes about five minutes to add 3000 IPv6 address to or delete them from a bond interface that already has four physical NICs using a single thread, while for a common physical NIC, it takes less than 10 seconds.

```
ip a add/del 192:168::18:X/64 dev DEVICE
```

##### Possible Cause
When an IPv6 address is added to a bond interface, the IPv6 multicast address is generated and synchronized to all physical NICs. The time required increases with the number of IPv6 addresses. As a result, it takes a too long time.

##### Solution
The IPv6 multicast address is generated by combining the least significant 24 bits of the IPv6 address and 33-33-ff. If there are too many multicast addresses, it takes a long time to add or delete the address. If there are a few multicast addresses, the time required is not affected.

It is recommended that you set the least significant 24 bits of the IPv6 address to be the same as the most significant 24 bits of the IPv6 address. In this way, a single NIC can communicate with external devices using only one IP address in a network segment.

#### Rsyslog Log Transmission Is Delayed in the Scenario Where Both IPv4 and IPv6 Are Used

##### Symptom
When both IPv4 and IPv6 addresses are configured in the configuration file of the rsyslog client and the port configurations are the same, there is a possibility that log output is delayed when the server collects logs.

##### Possible Cause
The delay is caused by the buffer queue mechanism of rsyslog. By default, rsyslog writes data to a file only when the number of buffer queues reaches a specified value.

##### Solution
You can disable the buffer queue mechanism by configuring the Direct mode as the **root** user. Add the following information at the beginning of the new remote transmission configuration file in the /etc/rsyslog.d directory on the rsyslog remote transmission server:

```
$ActionQueueType Direct
$MainMsgQueueType Direct
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>-   In direct mode, the queue size is reduced by 1. Therefore, one log is reserved in the queue for the next log output.  
>-   The direct mode degrades the rsyslog performance of the server.  
