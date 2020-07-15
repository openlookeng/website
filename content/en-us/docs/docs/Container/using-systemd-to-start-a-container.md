# Using systemd to Start a Container

- [Using systemd to Start a Container](#using-systemd-to-start-a-container)


## Function Description

The init process started in system containers differs from that in common containers. Common containers cannot start system services through systemd. However, system containers have this capability. You can enable the systemd service by specifying the  **--system-contianer**  parameter when starting a system container.

## Parameter Description

<a name="en-us_topic_0182200831_table1869210387418"></a>
<table><thead align="left"><tr id="en-us_topic_0182200831_row1569373816419"><th class="cellrowborder" valign="top" width="14.04%" id="mcps1.1.4.1.1"><p id="en-us_topic_0182200831_p106936387415"><a name="en-us_topic_0182200831_p106936387415"></a><a name="en-us_topic_0182200831_p106936387415"></a><strong id="b84235270693550"><a name="b84235270693550"></a><a name="b84235270693550"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="19.67%" id="mcps1.1.4.1.2"><p id="en-us_topic_0182200831_p3923191620525"><a name="en-us_topic_0182200831_p3923191620525"></a><a name="en-us_topic_0182200831_p3923191620525"></a><strong id="b124025213584"><a name="b124025213584"></a><a name="b124025213584"></a>Parameter</strong></p>
</th>
<th class="cellrowborder" valign="top" width="66.29%" id="mcps1.1.4.1.3"><p id="en-us_topic_0182200831_p3924171618525"><a name="en-us_topic_0182200831_p3924171618525"></a><a name="en-us_topic_0182200831_p3924171618525"></a><strong id="b15699942584"><a name="b15699942584"></a><a name="b15699942584"></a>Value Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200831_row12693163810415"><td class="cellrowborder" valign="top" width="14.04%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200831_p66931838134110"><a name="en-us_topic_0182200831_p66931838134110"></a><a name="en-us_topic_0182200831_p66931838134110"></a>isula create/run</p>
</td>
<td class="cellrowborder" valign="top" width="19.67%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200831_p169241552111"><a name="en-us_topic_0182200831_p169241552111"></a><a name="en-us_topic_0182200831_p169241552111"></a>--system-container</p>
</td>
<td class="cellrowborder" valign="top" width="66.29%" headers="mcps1.1.4.1.3 "><a name="en-us_topic_0182200831_ul642434723115"></a><a name="en-us_topic_0182200831_ul642434723115"></a><ul id="en-us_topic_0182200831_ul642434723115"><li>The value is of a Boolean data type and can be <strong id="b12919744165815"><a name="b12919744165815"></a><a name="b12919744165815"></a>true</strong> or <strong id="b847511485584"><a name="b847511485584"></a><a name="b847511485584"></a>false</strong>. The default value is <strong id="b9350358105819"><a name="b9350358105819"></a><a name="b9350358105819"></a>true</strong>.</li><li>Specifies whether it is a system container. This function must be enabled.</li></ul>
</td>
</tr>
</tbody>
</table>

## Constraints

-   The systemd service needs to call some special system APIs, including mount, umount2, unshare, reboot, and name\_to\_handle\_at. Therefore, permissions to call the preceding APIs are enabled for system containers when the privileged container tag is disabled.
-   All system containers are started by the init process. The init process does not respond to the SIGTERM signal which indicates normal exit. By default, the  **stop**  command forcibly kills the container 10 seconds later. If you need a quicker stop, you can manually specify the timeout duration of the  **stop**  command.
-   **--system-container**  must be used together with  **--external-rootfs**.
-   Various services can run in a system container. The  **systemctl**  command is used to manage the service starting and stopping. Services may depend on each other. As a result, when an exception occurs, some service processes are in the D or Z state so that the container cannot exit properly.
-   Some service processes in a system container may affect other operation results. For example, if the NetworkManager service is running in the container, adding NICs to the container may be affected \(the NICs are successfully added but then stopped by the NetworkManger\), resulting in unexpected results.
-   Currently, system containers and hosts cannot be isolated by using udev events. Therefore, the  **fstab**  file cannot be configured.
-   The systemd service may conflict with the cgconfig service provided by libcgroup. You are advised to delete the libcgroup-related packages from a container or set  **Delegate**  of the cgconfig service to  **no**.

## Example

-   Specify the  **--system-container**  and  **--external-rootfs**  parameters to start a system container.

    ```
    [root@localhost ~]# isula run -tid -n systest01 --system-container --external-rootfs /root/myrootfs none init
    ```

-   After the preceding commands are executed, the container is running properly. You can run the  **exec**  command to access the container and view the process information. The command output indicates that the systemd service has been started.

    ```
    [root@localhost ~]# isula exec -it systest01 bash
    [root@localhost /]# ps -ef
    UID        PID  PPID  C STIME TTY          TIME CMD
    root         1     0  2 06:49 ?        00:00:00 init
    root        14     1  2 06:49 ?        00:00:00 /usr/lib/systemd/systemd-journal
    root        16     1  0 06:49 ?        00:00:00 /usr/lib/systemd/systemd-network
    dbus        23     1  0 06:49 ?        00:00:00 /usr/bin/dbus-daemon --system --
    root        25     0  0 06:49 ?        00:00:00 bash
    root        59    25  0 06:49 ?        00:00:00 ps –ef
    ```


-   Run the  **systemctl**  command in the container to check the service status. The command output indicates that the service is managed by systemd.

    ```
    [root@localhost /]# systemctl status dbus
    ● dbus.service - D-Bus System Message Bus
       Loaded: loaded (/usr/lib/systemd/system/dbus.service; static; vendor preset:
    disabled)
       Active: active (running) since Mon 2019-07-22 06:49:38 UTC; 2min 5
    8s ago
         Docs: man:dbus-daemon(1)
     Main PID: 23 (dbus-daemon)
       CGroup: /system.slice/dbus.service
               └─23 /usr/bin/dbus-daemon --system --address=systemd: --nofork --nopidf
    ile --systemd-activation --syslog-only
     
    Jul 22 06:49:38 localhost systemd[1]: Started D-Bus System Message Bus.
    ```

-   Run the  **systemctl**  command in the container to stop or start the service. The command output indicates that the service is managed by systemd.

    ```
    [root@localhost /]# systemctl stop dbus
    Warning: Stopping dbus.service, but it can still be activated by:
      dbus.socket
    [root@localhost /]# systemctl start dbus
    ```


