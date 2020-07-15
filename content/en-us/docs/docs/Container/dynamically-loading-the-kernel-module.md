Dynamically Loading the Kernel Module

- [Dynamically Loading the Kernel Module](#dynamically-loading-the-kernel-module)


## Function Description

Services in a container may depend on some kernel modules. You can set environment variables to dynamically load the kernel modules required by services in the container to the host before the system container starts. This feature must be used together with isulad-hooks. For details, see  [Dynamically Managing Container Resources \(syscontainer-tools\)](dynamically-managing-container-resources-(syscontainer-tools).md).

## Parameter Description


<table><thead align="left"><tr id="en-us_topic_0182200838_row1569373816419"><th class="cellrowborder" valign="top" width="20.22%" id="mcps1.1.4.1.1"><p id="en-us_topic_0182200838_p106936387415"><a name="en-us_topic_0182200838_p106936387415"></a><a name="en-us_topic_0182200838_p106936387415"></a><strong id="b1777818525556"><a name="b1777818525556"></a><a name="b1777818525556"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="51.910000000000004%" id="mcps1.1.4.1.2"><p id="en-us_topic_0182200838_p15693173814112"><a name="en-us_topic_0182200838_p15693173814112"></a><a name="en-us_topic_0182200838_p15693173814112"></a><strong id="b143109549554"><a name="b143109549554"></a><a name="b143109549554"></a>Parameter</strong></p>
</th>
<th class="cellrowborder" valign="top" width="27.87%" id="mcps1.1.4.1.3"><p id="en-us_topic_0182200838_p867912565112"><a name="en-us_topic_0182200838_p867912565112"></a><a name="en-us_topic_0182200838_p867912565112"></a><strong id="b11317195635512"><a name="b11317195635512"></a><a name="b11317195635512"></a>Value Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200838_row12693163810415"><td class="cellrowborder" valign="top" width="20.22%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200838_p66931838134110"><a name="en-us_topic_0182200838_p66931838134110"></a><a name="en-us_topic_0182200838_p66931838134110"></a>isula create/run</p>
</td>
<td class="cellrowborder" valign="top" width="51.910000000000004%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200838_p20308121310422"><a name="en-us_topic_0182200838_p20308121310422"></a><a name="en-us_topic_0182200838_p20308121310422"></a>-e KERNEL_MODULES=module_name1,module_name</p>
</td>
<td class="cellrowborder" valign="top" width="27.87%" headers="mcps1.1.4.1.3 "><a name="en-us_topic_0182200838_ul10878831151214"></a><a name="en-us_topic_0182200838_ul10878831151214"></a><ul id="en-us_topic_0182200838_ul10878831151214"><li>Variable of the string type.</li><li>This parameter can be set to multiple modules. Use commas (,) to separate module names.</li></ul>
</td>
</tr>
</tbody>
</table>

## Constraints

-   If loaded kernel modules are not verified or conflict with existing modules on the host, an unpredictable error may occur on the host. Therefore, exercise caution when loading kernel modules.
-   Dynamic kernel module loading transfers kernel modules to be loaded to containers. This function is implemented by capturing environment variables for container startup using isulad-tools. Therefore, this function relies on the proper installation and deployment of isulad-tools.
-   Loaded kernel modules need to be manually deleted.

## Example

When starting a system container, specify the  **-e KERNEL\_MODULES**  parameter. After the system container is started, the ip\_vs module is successfully loaded to the kernel.

```
[root@localhost ~]# lsmod | grep ip_vs
[root@localhost ~]# isula run -tid -e KERNEL_MODULES=ip_vs,ip_vs_wrr --hook-spec /etc/isulad-tools/hookspec.json --system-container --external-rootfs /root/myrootfs none init
ae18c4281d5755a1e153a7bff6b3b4881f36c8e528b9baba8a3278416a5d0980
[root@localhost ~]# lsmod | grep ip_vs
ip_vs_wrr              16384  0
ip_vs                 176128  2 ip_vs_wrr
nf_conntrack          172032  7 xt_conntrack,nf_nat,nf_nat_ipv6,ipt_MASQUERADE,nf_nat_ipv4,nf_conntrack_netlink,ip_vs
nf_defrag_ipv6         20480  2 nf_conntrack,ip_vs
libcrc32c              16384  3 nf_conntrack,nf_nat,ip_vs
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>-   isulad-tools must be installed on the host.  
>-   **--hooks-spec**  must be set to  **isulad hooks**.  

