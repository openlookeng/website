# Specifying Rootfs to Create a Container

- [Specifying Rootfs to Create a Container](#specifying-rootfs-to-create-a-container)


## Function Description

Different from a common container that needs to be started by specifying a container image, a system container is started by specifying a local root file system \(rootfs\) through the  **--external-rootfs**  parameter. Rootfs contains the operating system environment on which the container depends during running.

## Parameter Description

<a name="en-us_topic_0182200826_table99231016135214"></a>
<table><thead align="left"><tr id="en-us_topic_0182200826_row13923616125218"><th class="cellrowborder" valign="top" width="15.2%" id="mcps1.1.4.1.1"><p id="en-us_topic_0182200826_p1692351613529"><a name="en-us_topic_0182200826_p1692351613529"></a><a name="en-us_topic_0182200826_p1692351613529"></a><strong id="b84235270693550"><a name="b84235270693550"></a><a name="b84235270693550"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="40.01%" id="mcps1.1.4.1.2"><p id="en-us_topic_0182200826_p3923191620525"><a name="en-us_topic_0182200826_p3923191620525"></a><a name="en-us_topic_0182200826_p3923191620525"></a><strong id="b186341111497"><a name="b186341111497"></a><a name="b186341111497"></a>Parameter</strong></p>
</th>
<th class="cellrowborder" valign="top" width="44.79%" id="mcps1.1.4.1.3"><p id="en-us_topic_0182200826_p3924171618525"><a name="en-us_topic_0182200826_p3924171618525"></a><a name="en-us_topic_0182200826_p3924171618525"></a><strong id="b842352706152130"><a name="b842352706152130"></a><a name="b842352706152130"></a>Value Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200826_row12924616195217"><td class="cellrowborder" valign="top" width="15.2%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200826_p092419166523"><a name="en-us_topic_0182200826_p092419166523"></a><a name="en-us_topic_0182200826_p092419166523"></a>isula create/run</p>
</td>
<td class="cellrowborder" valign="top" width="40.01%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200826_p692431614524"><a name="en-us_topic_0182200826_p692431614524"></a><a name="en-us_topic_0182200826_p692431614524"></a>--external-rootfs</p>
</td>
<td class="cellrowborder" valign="top" width="44.79%" headers="mcps1.1.4.1.3 "><a name="en-us_topic_0182200826_ul1292410168521"></a><a name="en-us_topic_0182200826_ul1292410168521"></a><ul id="en-us_topic_0182200826_ul1292410168521"><li>Variable of the string type.</li><li>Absolute path in the root file system of the container, that is, the path of rootfs.</li></ul>
</td>
</tr>
</tbody>
</table>

## Constraints

-   The rootfs directory specified by the  **--external-rootfs**  parameter must be an absolute path.
-   The rootfs directory specified by the  **--external-rootfs**  parameter must be a complete OS environment. Otherwise, the container fails to be started.
-   When a container is deleted, the rootfs directory specified by  **--external-rootfs**  is not deleted.
-   Containers based on ARM rootfs cannot run on x86 servers. Containers based on x86 rootfs cannot run on ARM servers.
-   You are not advised to start multiple container instances by using the same rootfs. That is, one rootfs is used only by container instances in the same lifecycle.

## Example

If the local rootfs path is  **/root/myrootfs**, run the following command to start a system container:

```
# isula run  -tid --system-container --external-rootfs /root/myrootfs none init
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>Rootfs is a user-defined file system. Prepare it by yourself. For example, a rootfs is generated after the TAR package of container images is decompressed.  

