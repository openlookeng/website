# Shared Memory Channels

- [Shared Memory Channels](#shared-memory-channels)


## Function Description

System containers enable the communication between container and host processes through shared memory. You can set the  **--host-channel**  parameter when creating a container to allow the host to share the same tmpfs with the container so that they can communicate with each other.

## Parameter Description


<table><thead align="left"><tr id="en-us_topic_0182200837_row1569373816419"><th class="cellrowborder" valign="top" width="18%" id="mcps1.1.4.1.1"><p id="en-us_topic_0182200837_p106936387415"><a name="en-us_topic_0182200837_p106936387415"></a><a name="en-us_topic_0182200837_p106936387415"></a><strong id="en-us_topic_0182200837_b198081211366"><a name="en-us_topic_0182200837_b198081211366"></a><a name="en-us_topic_0182200837_b198081211366"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="18.25%" id="mcps1.1.4.1.2"><p id="en-us_topic_0182200837_p15693173814112"><a name="en-us_topic_0182200837_p15693173814112"></a><a name="en-us_topic_0182200837_p15693173814112"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="63.74999999999999%" id="mcps1.1.4.1.3"><p id="en-us_topic_0182200837_p346122717615"><a name="en-us_topic_0182200837_p346122717615"></a><a name="en-us_topic_0182200837_p346122717615"></a><strong id="en-us_topic_0182200837_b173010323615"><a name="en-us_topic_0182200837_b173010323615"></a><a name="en-us_topic_0182200837_b173010323615"></a>Value Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200837_row12693163810415"><td class="cellrowborder" valign="top" width="18%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200837_p66931838134110"><a name="en-us_topic_0182200837_p66931838134110"></a><a name="en-us_topic_0182200837_p66931838134110"></a>isula create/run</p>
</td>
<td class="cellrowborder" valign="top" width="18.25%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200837_p20308121310422"><a name="en-us_topic_0182200837_p20308121310422"></a><a name="en-us_topic_0182200837_p20308121310422"></a>--host-channel</p>
</td>
<td class="cellrowborder" valign="top" width="63.74999999999999%" headers="mcps1.1.4.1.3 "><a name="en-us_topic_0182200837_ul16925155365712"></a><a name="en-us_topic_0182200837_ul16925155365712"></a><ul id="en-us_topic_0182200837_ul16925155365712"><li>Variable of the string type. Its format is as follows:<pre class="screen" id="en-us_topic_0182200837_screen46854212570"><a name="en-us_topic_0182200837_screen46854212570"></a><a name="en-us_topic_0182200837_screen46854212570"></a>&lt;host path&gt;:&lt;container path&gt;:&lt;rw/ro&gt;:&lt;size limit&gt;</pre>
</li><li>The parameter is described as follows:<p id="en-us_topic_0182200837_p1888853414582"><a name="en-us_topic_0182200837_p1888853414582"></a><a name="en-us_topic_0182200837_p1888853414582"></a><strong id="en-us_topic_0182200837_b1106202016374"><a name="en-us_topic_0182200837_b1106202016374"></a><a name="en-us_topic_0182200837_b1106202016374"></a>&lt;host path&gt;</strong>: path to which tmpfs is mounted on the host, which must be an absolute path.</p>
<p id="en-us_topic_0182200837_p288863414581"><a name="en-us_topic_0182200837_p288863414581"></a><a name="en-us_topic_0182200837_p288863414581"></a><strong id="en-us_topic_0182200837_b38241622163714"><a name="en-us_topic_0182200837_b38241622163714"></a><a name="en-us_topic_0182200837_b38241622163714"></a>&lt;container path&gt;</strong>: path to which tmpfs is mounted in a container, which must be an absolute path.</p>
<p id="en-us_topic_0182200837_p888843420582"><a name="en-us_topic_0182200837_p888843420582"></a><a name="en-us_topic_0182200837_p888843420582"></a><strong id="en-us_topic_0182200837_b18696225143714"><a name="en-us_topic_0182200837_b18696225143714"></a><a name="en-us_topic_0182200837_b18696225143714"></a>&lt;rw/ro&gt;</strong>: permissions on the file system mounted to the container. The value can only be <strong id="en-us_topic_0182200837_b0966171714512"><a name="en-us_topic_0182200837_b0966171714512"></a><a name="en-us_topic_0182200837_b0966171714512"></a>rw</strong> (read and write) or <strong id="en-us_topic_0182200837_b849419220520"><a name="en-us_topic_0182200837_b849419220520"></a><a name="en-us_topic_0182200837_b849419220520"></a>ro</strong> (read only). The default value is <strong id="en-us_topic_0182200837_b185072270511"><a name="en-us_topic_0182200837_b185072270511"></a><a name="en-us_topic_0182200837_b185072270511"></a>rw</strong>.</p>
<p id="en-us_topic_0182200837_p0889133414583"><a name="en-us_topic_0182200837_p0889133414583"></a><a name="en-us_topic_0182200837_p0889133414583"></a><strong id="en-us_topic_0182200837_b12559152953711"><a name="en-us_topic_0182200837_b12559152953711"></a><a name="en-us_topic_0182200837_b12559152953711"></a>&lt;size limit&gt;</strong>: maximum size used by the mounted tmpfs. The minimum value is one 4 KB physical page, and the maximum value is half of the total physical memory in the system. The default value is <strong id="en-us_topic_0182200837_b135102714713"><a name="en-us_topic_0182200837_b135102714713"></a><a name="en-us_topic_0182200837_b135102714713"></a>64MB</strong>.</p>
</li></ul>
</td>
</tr>
</tbody>
</table>

## Constraints

-   The lifecycle of tmpfs mounted on the host starts from the container startup to the container deletion. After a container is deleted and its occupied space is released, the space is removed.
-   When a container is deleted, the path to which tmpfs is mounted on the host is deleted. Therefore, an existing directory on the host cannot be used as the mount path.
-   To ensure that processes running by non-root users on the host can communicate with containers, the permission for tmpfs mounted on the host is 1777.

## Example

Specify the  **--host-channel**  parameter when creating a container.

```
[root@localhost ~]# isula run --rm -it --host-channel /testdir:/testdir:rw:32M --system-container --external-rootfs /root/myrootfs none init 
root@3b947668eb54:/# dd if=/dev/zero of=/testdir/test.file bs=1024 count=64K 
dd: error writing '/testdir/test.file': No space left on device 
32769+0 records in 
32768+0 records out 
33554432 bytes (34 MB, 32 MiB) copied, 0.0766899 s, 438 MB/s
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>-   If  **--host-channel**  is used for size limit, the file size is constrained by the memory limit in the container. \(The OOM error may occur when the memory usage reaches the upper limit.\)  
>-   If a user creates a shared file on the host, the file size is not constrained by the memory limit in the container.  
>-   If you need to create a shared file in the container and the service is memory-intensive, you can add the value of  **--host-channel**  to the original value of the container memory limit, eliminating the impact.  

