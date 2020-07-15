# Reboot or Shutdown in a Container

- [Reboot or Shutdown in a Container](#reboot-or-shutdown-in-a-container)


## Function Description

The  **reboot**  and  **shutdown**  commands can be executed in a system container. You can run the  **reboot**  command to restart a container, and run the  **shutdown**  command to stop a container.

## Parameter Description


<table><thead align="left"><tr id="en-us_topic_0182200832_row1569373816419"><th class="cellrowborder" valign="top" width="14.29%" id="mcps1.1.4.1.1"><p id="en-us_topic_0182200832_p106936387415"><a name="en-us_topic_0182200832_p106936387415"></a><a name="en-us_topic_0182200832_p106936387415"></a><strong id="en-us_topic_0182200832_b77698409110"><a name="en-us_topic_0182200832_b77698409110"></a><a name="en-us_topic_0182200832_b77698409110"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="39.47%" id="mcps1.1.4.1.2"><p id="en-us_topic_0182200832_p113841447182213"><a name="en-us_topic_0182200832_p113841447182213"></a><a name="en-us_topic_0182200832_p113841447182213"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="46.239999999999995%" id="mcps1.1.4.1.3"><p id="en-us_topic_0182200832_p3924171618525"><a name="en-us_topic_0182200832_p3924171618525"></a><a name="en-us_topic_0182200832_p3924171618525"></a><strong id="en-us_topic_0182200832_b51452417112"><a name="en-us_topic_0182200832_b51452417112"></a><a name="en-us_topic_0182200832_b51452417112"></a>Value Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200832_row12693163810415"><td class="cellrowborder" valign="top" width="14.29%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200832_p66931838134110"><a name="en-us_topic_0182200832_p66931838134110"></a><a name="en-us_topic_0182200832_p66931838134110"></a>isula create/run</p>
</td>
<td class="cellrowborder" valign="top" width="39.47%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200832_p7384134752211"><a name="en-us_topic_0182200832_p7384134752211"></a><a name="en-us_topic_0182200832_p7384134752211"></a>--restart</p>
</td>
<td class="cellrowborder" valign="top" width="46.239999999999995%" headers="mcps1.1.4.1.3 "><a name="en-us_topic_0182200832_ul1096612111241"></a><a name="en-us_topic_0182200832_ul1096612111241"></a><ul id="en-us_topic_0182200832_ul1096612111241"><li>Variable of the string type.</li><li>Supported option is as follows:<p id="en-us_topic_0182200832_p153828551538"><a name="en-us_topic_0182200832_p153828551538"></a><a name="en-us_topic_0182200832_p153828551538"></a><strong id="en-us_topic_0182200832_b106287353818"><a name="en-us_topic_0182200832_b106287353818"></a><a name="en-us_topic_0182200832_b106287353818"></a>on-reboot</strong>: restarts the system container.</p>
<p id="en-us_topic_0182200832_p1778024415312"><a name="en-us_topic_0182200832_p1778024415312"></a><a name="en-us_topic_0182200832_p1778024415312"></a>&nbsp;&nbsp;</p>
</li></ul>
</td>
</tr>
</tbody>
</table>

## Constraints

-   The shutdown function relies on the actual OS of the container running environment.
-   When you run the  **shutdown -h now**  command to shut down the system, do not open multiple consoles. For example, if you run the  **isula run -ti**  command to open a console and run the  **isula attach**  command for the container in another host bash, another console is opened. In this case, the  **shutdown**  command fails to be executed.

## Example

-   Specify the  **--restart on-reboot**  parameter when starting a container. For example:

    ```
    [root@localhost ~]# isula run -tid --restart on-reboot --system-container --external-rootfs /root/myrootfs none init
    106faae22a926e22c828a0f2b63cf5c46e5d5986ea8a5b26de81390d0ed9714f
    ```


-   In the container, run the  **reboot**  command.

    ```
    [root@localhost ~]# isula exec -it 10 bash
    [root@localhost /]# reboot
    ```

    Check whether the container is restarted.

    ```
    [root@localhost ~]# isula exec -it 10 ps aux
    USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
    root         1  0.1  0.0  21588  9504 ?        Ss   12:11   0:00 init
    root        14  0.1  0.0  27024  9376 ?        Ss   12:11   0:00 /usr/lib/system
    root        17  0.0  0.0  18700  5876 ?        Ss   12:11   0:00 /usr/lib/system
    dbus        22  0.0  0.0   9048  3624 ?        Ss   12:11   0:00 /usr/bin/dbus-d
    root        26  0.0  0.0   8092  3012 ?        Rs+  12:13   0:00 ps aux
    ```

-   In the container, run the  **shutdown**  command.

    ```
    [root@localhost ~]# isula exec -it 10 bash
    [root@localhost /]# shutdown -h now
    [root@localhost /]# [root@localhost ~]#
    ```

    Check whether the container is stopped.

    ```
    [root@localhost ~]# isula exec -it 10 bash
    Error response from daemon: Exec container error;Container is not running:106faae22a926e22c828a0f2b63cf5c46e5d5986ea8a5b26de81390d0ed9714f
    ```


