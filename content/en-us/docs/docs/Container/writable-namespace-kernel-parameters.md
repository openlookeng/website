# Writable Namespace Kernel Parameters

- [Writable Namespace Kernel Parameters](#writable-namespace-kernel-parameters)


## Function Description

For services running in containers, such as databases, big data, and common applications, some kernel parameters need to be set and adjusted to obtain the optimal performance and reliability. The modification permission of all kernel parameters must be disabled or enabled simultaneously \(by using privileged container\).

When the modification permission is disabled, only the --sysctl external interface is provided and parameters cannot be flexibly modified in a container.

When the modification permission is enabled, some kernel parameters are globally valid. If some parameters are modified in a container, all programs on the host will be affected, harming security.

  

System containers provide the  **--ns-change-opt**  parameter, which can be used to dynamically set namespace kernel parameters in a container. The parameter value can be  **net**  or  **ipc**.

## Parameter Description


<table><thead align="left"><tr id="en-us_topic_0182200836_row1569373816419"><th class="cellrowborder" valign="top" width="20.96%" id="mcps1.1.4.1.1"><p id="en-us_topic_0182200836_p106936387415"><a name="en-us_topic_0182200836_p106936387415"></a><a name="en-us_topic_0182200836_p106936387415"></a><strong id="en-us_topic_0182200836_b440818461613"><a name="en-us_topic_0182200836_b440818461613"></a><a name="en-us_topic_0182200836_b440818461613"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="20.47%" id="mcps1.1.4.1.2"><p id="en-us_topic_0182200836_p15693173814112"><a name="en-us_topic_0182200836_p15693173814112"></a><a name="en-us_topic_0182200836_p15693173814112"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="58.57%" id="mcps1.1.4.1.3"><p id="en-us_topic_0182200836_p284710435329"><a name="en-us_topic_0182200836_p284710435329"></a><a name="en-us_topic_0182200836_p284710435329"></a><strong id="en-us_topic_0182200836_b1023016471413"><a name="en-us_topic_0182200836_b1023016471413"></a><a name="en-us_topic_0182200836_b1023016471413"></a>Value Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200836_row12693163810415"><td class="cellrowborder" valign="top" width="20.96%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200836_p66931838134110"><a name="en-us_topic_0182200836_p66931838134110"></a><a name="en-us_topic_0182200836_p66931838134110"></a>isula create/run</p>
</td>
<td class="cellrowborder" valign="top" width="20.47%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200836_p20308121310422"><a name="en-us_topic_0182200836_p20308121310422"></a><a name="en-us_topic_0182200836_p20308121310422"></a>--ns-change-opt</p>
</td>
<td class="cellrowborder" valign="top" width="58.57%" headers="mcps1.1.4.1.3 "><a name="en-us_topic_0182200836_ul8762153118534"></a><a name="en-us_topic_0182200836_ul8762153118534"></a><ul id="en-us_topic_0182200836_ul8762153118534"><li>Variable of the string type.</li><li>The parameter value can be <strong id="en-us_topic_0182200836_b15212529172118"><a name="en-us_topic_0182200836_b15212529172118"></a><a name="en-us_topic_0182200836_b15212529172118"></a>net</strong> or <strong id="en-us_topic_0182200836_b1621213295216"><a name="en-us_topic_0182200836_b1621213295216"></a><a name="en-us_topic_0182200836_b1621213295216"></a>ipc</strong>.<p id="en-us_topic_0182200836_p9801138153410"><a name="en-us_topic_0182200836_p9801138153410"></a><a name="en-us_topic_0182200836_p9801138153410"></a><strong id="en-us_topic_0182200836_b10561203642114"><a name="en-us_topic_0182200836_b10561203642114"></a><a name="en-us_topic_0182200836_b10561203642114"></a>net</strong>: All namespace parameters in the <strong id="en-us_topic_0182200836_b15584154652119"><a name="en-us_topic_0182200836_b15584154652119"></a><a name="en-us_topic_0182200836_b15584154652119"></a>/proc/sys/net</strong> directory are supported.</p>
<p id="en-us_topic_0182200836_p52601216357"><a name="en-us_topic_0182200836_p52601216357"></a><a name="en-us_topic_0182200836_p52601216357"></a><strong id="en-us_topic_0182200836_b51141238102114"><a name="en-us_topic_0182200836_b51141238102114"></a><a name="en-us_topic_0182200836_b51141238102114"></a>ipc</strong>: Supported namespace parameters are as follows:</p>
<p id="en-us_topic_0182200836_p33951505546"><a name="en-us_topic_0182200836_p33951505546"></a><a name="en-us_topic_0182200836_p33951505546"></a>/proc/sys/kernel/msgmax</p>
<p id="en-us_topic_0182200836_p83965012547"><a name="en-us_topic_0182200836_p83965012547"></a><a name="en-us_topic_0182200836_p83965012547"></a>/proc/sys/kernel/msgmnb</p>
<p id="en-us_topic_0182200836_p1439650115419"><a name="en-us_topic_0182200836_p1439650115419"></a><a name="en-us_topic_0182200836_p1439650115419"></a>/proc/sys/kernel/msgmni</p>
<p id="en-us_topic_0182200836_p13396190125414"><a name="en-us_topic_0182200836_p13396190125414"></a><a name="en-us_topic_0182200836_p13396190125414"></a>/proc/sys/kernel/sem</p>
<p id="en-us_topic_0182200836_p83961407547"><a name="en-us_topic_0182200836_p83961407547"></a><a name="en-us_topic_0182200836_p83961407547"></a>/proc/sys/kernel/shmall</p>
<p id="en-us_topic_0182200836_p13396120125419"><a name="en-us_topic_0182200836_p13396120125419"></a><a name="en-us_topic_0182200836_p13396120125419"></a>/proc/sys/kernel/shmmax</p>
<p id="en-us_topic_0182200836_p93961302544"><a name="en-us_topic_0182200836_p93961302544"></a><a name="en-us_topic_0182200836_p93961302544"></a>/proc/sys/kernel/shmmni</p>
<p id="en-us_topic_0182200836_p8396204548"><a name="en-us_topic_0182200836_p8396204548"></a><a name="en-us_topic_0182200836_p8396204548"></a>/proc/sys/kernel/shm_rmid_forced</p>
<p id="en-us_topic_0182200836_p1339610075418"><a name="en-us_topic_0182200836_p1339610075418"></a><a name="en-us_topic_0182200836_p1339610075418"></a>/proc/sys/fs/mqueue/msg_default</p>
<p id="en-us_topic_0182200836_p239712095419"><a name="en-us_topic_0182200836_p239712095419"></a><a name="en-us_topic_0182200836_p239712095419"></a>/proc/sys/fs/mqueue/msg_max</p>
<p id="en-us_topic_0182200836_p1239790175410"><a name="en-us_topic_0182200836_p1239790175410"></a><a name="en-us_topic_0182200836_p1239790175410"></a>/proc/sys/fs/mqueue/msgsize_default</p>
<p id="en-us_topic_0182200836_p63977012541"><a name="en-us_topic_0182200836_p63977012541"></a><a name="en-us_topic_0182200836_p63977012541"></a>/proc/sys/fs/mqueue/msgsize_max</p>
<p id="en-us_topic_0182200836_p139714085417"><a name="en-us_topic_0182200836_p139714085417"></a><a name="en-us_topic_0182200836_p139714085417"></a>/proc/sys/fs/mqueue/queues_max</p>
</li><li>You can specify multiple namespace configurations and separate them with commas (,). For example, <strong id="en-us_topic_0182200836_b244052482213"><a name="en-us_topic_0182200836_b244052482213"></a><a name="en-us_topic_0182200836_b244052482213"></a>--ns-change-opt=net,ipc</strong>.</li></ul>
</td>
</tr>
</tbody>
</table>

## Constraints

-   If both  **--privileged**  \(privileged container\) and  **--ns-change-opt**  are specified during container startup,  **--ns-change-opt**  does not take effect.

## Example

Start a container and set  **--ns-change-opt**  to  **net**.

```
[root@localhost ~]# isula run -tid --ns-change-opt net --system-container --external-rootfs /root/myrootfs none init
4bf44a42b4a14fdaf127616c90defa64b4b532b18efd15b62a71cbf99ebc12d2
[root@localhost ~]# isula exec -it 4b mount | grep /proc/sys
proc on /proc/sys type proc (ro,nosuid,nodev,noexec,relatime)
proc on /proc/sysrq-trigger type proc (ro,nosuid,nodev,noexec,relatime)
proc on /proc/sys/net type proc (rw,nosuid,nodev,noexec,relatime)
```

The mount point  **/proc/sys/net**  in the container has the  **rw**  option, indicating that the  **net**-related namespace kernel parameters have the read and write permissions.

Start another container and set  **--ns-change-opt**  to  **ipc**.

```
[root@localhost ~]# isula run -tid --ns-change-opt ipc --system-container --external-rootfs /root/myrootfs none init
c62e5e5686d390500dab2fa76b6c44f5f8da383a4cbbeac12cfada1b07d6c47f
[root@localhost ~]# isula exec -it c6 mount | grep /proc/sys
proc on /proc/sys type proc (ro,nosuid,nodev,noexec,relatime)
proc on /proc/sysrq-trigger type proc (ro,nosuid,nodev,noexec,relatime)
proc on /proc/sys/kernel/shmmax type proc (rw,nosuid,nodev,noexec,relatime)
proc on /proc/sys/kernel/shmmni type proc (rw,nosuid,nodev,noexec,relatime)
proc on /proc/sys/kernel/shmall type proc (rw,nosuid,nodev,noexec,relatime)
proc on /proc/sys/kernel/shm_rmid_forced type proc (rw,nosuid,nodev,noexec,relatime)
proc on /proc/sys/kernel/msgmax type proc (rw,nosuid,nodev,noexec,relatime)
proc on /proc/sys/kernel/msgmni type proc (rw,nosuid,nodev,noexec,relatime)
proc on /proc/sys/kernel/msgmnb type proc (rw,nosuid,nodev,noexec,relatime)
proc on /proc/sys/kernel/sem type proc (rw,nosuid,nodev,noexec,relatime)
proc on /proc/sys/fs/mqueue type proc (rw,nosuid,nodev,noexec,relatime)
```

The mount point information of  **ipc**-related kernel parameters in the container contains the  **rw**  option, indicating that the  **ipc**-related namespace kernel parameters have the read and write permissions.

