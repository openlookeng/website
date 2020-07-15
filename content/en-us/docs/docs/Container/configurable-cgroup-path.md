# Configurable Cgroup Path

- [Configurable Cgroup Path](#configurable-cgroup-path)


## Function Description

System containers provide the capabilities of isolating and reserving container resources on hosts. You can use the  **--cgroup-parent**  parameter to specify the cgroup directory used by a container to another directory, thereby flexibly allocating host resources. For example, if the cgroup parent path of containers A, B, and C is set to  **/lxc/cgroup1**, and the cgroup parent path of containers D, E, and F is set to  **/lxc/cgroup2**, the containers are divided into two groups through the cgroup paths, implementing resource isolation at the cgroup level.

## Parameter Description


<table><thead align="left"><tr id="en-us_topic_0182200835_row1569373816419"><th class="cellrowborder" valign="top" width="21.09%" id="mcps1.1.4.1.1"><p id="en-us_topic_0182200835_p106936387415"><a name="en-us_topic_0182200835_p106936387415"></a><a name="en-us_topic_0182200835_p106936387415"></a><strong id="en-us_topic_0182200835_b925451112420"><a name="en-us_topic_0182200835_b925451112420"></a><a name="en-us_topic_0182200835_b925451112420"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="34.03%" id="mcps1.1.4.1.2"><p id="en-us_topic_0182200835_p15693173814112"><a name="en-us_topic_0182200835_p15693173814112"></a><a name="en-us_topic_0182200835_p15693173814112"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="44.879999999999995%" id="mcps1.1.4.1.3"><p id="en-us_topic_0182200835_p158581432132220"><a name="en-us_topic_0182200835_p158581432132220"></a><a name="en-us_topic_0182200835_p158581432132220"></a><strong id="en-us_topic_0182200835_b179619422420"><a name="en-us_topic_0182200835_b179619422420"></a><a name="en-us_topic_0182200835_b179619422420"></a>Value Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200835_row12693163810415"><td class="cellrowborder" valign="top" width="21.09%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200835_p66931838134110"><a name="en-us_topic_0182200835_p66931838134110"></a><a name="en-us_topic_0182200835_p66931838134110"></a>isula create/run</p>
</td>
<td class="cellrowborder" valign="top" width="34.03%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200835_p20308121310422"><a name="en-us_topic_0182200835_p20308121310422"></a><a name="en-us_topic_0182200835_p20308121310422"></a>--cgroup-parent</p>
</td>
<td class="cellrowborder" valign="top" width="44.879999999999995%" headers="mcps1.1.4.1.3 "><a name="en-us_topic_0182200835_ul12202171310237"></a><a name="en-us_topic_0182200835_ul12202171310237"></a><ul id="en-us_topic_0182200835_ul12202171310237"><li>Variable of the string type.</li><li>Specifies the cgroup parent path of the container.</li></ul>
</td>
</tr>
</tbody>
</table>

In addition to specifying the cgroup parent path for a system container using commands, you can also specify the cgroup paths of all containers by modifying the startup configuration files of the iSulad container engine.

<a name="en-us_topic_0182200835_table19691237182514"></a>
<table><thead align="left"><tr id="en-us_topic_0182200835_row3969103710257"><th class="cellrowborder" valign="top" width="28.312831283128315%" id="mcps1.1.4.1.1"><p id="en-us_topic_0182200835_p15311154852718"><a name="en-us_topic_0182200835_p15311154852718"></a><a name="en-us_topic_0182200835_p15311154852718"></a>Configuration File Path</p>
</th>
<th class="cellrowborder" valign="top" width="21.752175217521753%" id="mcps1.1.4.1.2"><p id="en-us_topic_0182200835_p1996983712519"><a name="en-us_topic_0182200835_p1996983712519"></a><a name="en-us_topic_0182200835_p1996983712519"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="49.934993499349936%" id="mcps1.1.4.1.3"><p id="en-us_topic_0182200835_p197083782512"><a name="en-us_topic_0182200835_p197083782512"></a><a name="en-us_topic_0182200835_p197083782512"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200835_row169701737132511"><td class="cellrowborder" valign="top" width="28.312831283128315%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200835_p731194872711"><a name="en-us_topic_0182200835_p731194872711"></a><a name="en-us_topic_0182200835_p731194872711"></a>/etc/isulad/daemon.json</p>
</td>
<td class="cellrowborder" valign="top" width="21.752175217521753%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200835_p1497063762512"><a name="en-us_topic_0182200835_p1497063762512"></a><a name="en-us_topic_0182200835_p1497063762512"></a>--cgroup-parent</p>
</td>
<td class="cellrowborder" valign="top" width="49.934993499349936%" headers="mcps1.1.4.1.3 "><a name="en-us_topic_0182200835_ul64991736162817"></a><a name="en-us_topic_0182200835_ul64991736162817"></a><ul id="en-us_topic_0182200835_ul64991736162817"><li>Variable of the string type.</li><li>Specifies the default cgroup parent path of the container.</li><li>Example: <strong id="en-us_topic_0182200835_b16285111384411"><a name="en-us_topic_0182200835_b16285111384411"></a><a name="en-us_topic_0182200835_b16285111384411"></a>"cgroup-parent": "/lxc/mycgroup"</strong></li></ul>
</td>
</tr>
</tbody>
</table>

## Constraints

-   If the  **cgroup parent**  parameter is set on both the daemon and client, the value specified on the client takes effect.
-   If container A is started before container B, the cgroup parent path of container B is specified as the cgroup path of container A. When deleting a container, you need to delete container B and then container A. Otherwise, residual cgroup resources exist.

## Example

Start a system container and specify the  **--cgroup-parent**  parameter.

```
[root@localhost ~]# isula run -tid --cgroup-parent /lxc/cgroup123 --system-container --external-rootfs /root/myrootfs none init
115878a4dfc7c5b8c62ef8a4b44f216485422be9a28f447a4b9ecac4609f332e
```

Check the cgroup information of the init process in the container.

```
[root@localhost ~]# isula inspect -f "{{json .State.Pid}}" 11
22167
[root@localhost ~]# cat /proc/22167/cgroup
13:blkio:/lxc/cgroup123/115878a4dfc7c5b8c62ef8a4b44f216485422be9a28f447a4b9ecac4609f332e
12:perf_event:/lxc/cgroup123/115878a4dfc7c5b8c62ef8a4b44f216485422be9a28f447a4b9ecac4609f332e
11:cpuset:/lxc/cgroup123/115878a4dfc7c5b8c62ef8a4b44f216485422be9a28f447a4b9ecac4609f332e
10:pids:/lxc/cgroup123/115878a4dfc7c5b8c62ef8a4b44f216485422be9a28f447a4b9ecac4609f332e
9:rdma:/lxc/cgroup123/115878a4dfc7c5b8c62ef8a4b44f216485422be9a28f447a4b9ecac4609f332e
8:devices:/lxc/cgroup123/115878a4dfc7c5b8c62ef8a4b44f216485422be9a28f447a4b9ecac4609f332e
7:hugetlb:/lxc/cgroup123/115878a4dfc7c5b8c62ef8a4b44f216485422be9a28f447a4b9ecac4609f332e
6:memory:/lxc/cgroup123/115878a4dfc7c5b8c62ef8a4b44f216485422be9a28f447a4b9ecac4609f332e
5:net_cls,net_prio:/lxc/cgroup123/115878a4dfc7c5b8c62ef8a4b44f216485422be9a28f447a4b9ecac4609f332e
4:cpu,cpuacct:/lxc/cgroup123/115878a4dfc7c5b8c62ef8a4b44f216485422be9a28f447a4b9ecac4609f332e
3:files:/lxc/cgroup123/115878a4dfc7c5b8c62ef8a4b44f216485422be9a28f447a4b9ecac4609f332e
2:freezer:/lxc/cgroup123/115878a4dfc7c5b8c62ef8a4b44f216485422be9a28f447a4b9ecac4609f332e
1:name=systemd:/lxc/cgroup123/115878a4dfc7c5b8c62ef8a4b44f216485422be9a28f447a4b9ecac4609f332e/init.scope
0::/lxc/cgroup123/115878a4dfc7c5b8c62ef8a4b44f216485422be9a28f447a4b9ecac4609f332e
```

The cgroup parent path of the container is set to  **/sys/fs/cgroup/**_<controller\>_**/lxc/cgroup123**.

In addition, you can configure the container daemon file to set the cgroup parent paths for all containers. For example:

```
{
         "cgroup-parent": "/lxc/cgroup123",
}
```

Restart the container engine for the configuration to take effect.

