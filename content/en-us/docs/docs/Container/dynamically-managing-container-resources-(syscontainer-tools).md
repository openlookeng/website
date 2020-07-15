# Dynamically Managing Container Resources \(syscontainer-tools\)

- [Dynamically Managing Container Resources \(syscontainer-tools\)](#dynamically-managing-container-resources-(syscontainer-tools))
    - [Device Management](#device-management)
    - [NIC Management](#nic-management)
    - [Route Management](#route-management)
    - [Volume Mounting Management](#volume-mounting-management)


Resources in common containers cannot be managed. For example, a block device cannot be added to a common container, and a physical or virtual NIC cannot be inserted to a common container. In the system container scenario, the syscontainer-tools can be used to dynamically mount or unmount block devices, network devices, routes, and volumes for containers.

To use this function, you need to install the syscontainer-tools first.

```
[root@localhost ~]# yum install syscontainer-tools
```


## Device Management

### Function Description

isulad-tools allows you to add block devices \(such as disks and logical volume managers\) or character devices \(such as GPUs, binners, and FUSEs\) on the host to a container. The devices can be used in the container. For example, you can run the  **fdisk**  command to format the disk and write data to the file system. If the devices are not required, isulad-tools allows you to delete them from the container and return them to the host.

### Command Format

```
isulad-tools [COMMADN][OPTIONS] <container_id> [ARG...]
```

In the preceding format:

**COMMAND**: command related to device management.

**OPTIONS**: option supported by the device management command.

**container\_id**: container ID.

**ARG**: parameter corresponding to the command.

### Parameter Description


<table><thead align="left"><tr id="en-us_topic_0182200846_row1569373816419"><th class="cellrowborder" valign="top" width="14.57%" id="mcps1.1.5.1.1"><p id="en-us_topic_0182200846_p106936387415"><a name="en-us_topic_0182200846_p106936387415"></a><a name="en-us_topic_0182200846_p106936387415"></a><strong id="b84235270693550"><a name="b84235270693550"></a><a name="b84235270693550"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="18.060000000000002%" id="mcps1.1.5.1.2"><p id="en-us_topic_0182200846_p43193341215"><a name="en-us_topic_0182200846_p43193341215"></a><a name="en-us_topic_0182200846_p43193341215"></a>Function Description</p>
</th>
<th class="cellrowborder" valign="top" width="34.1%" id="mcps1.1.5.1.3"><p id="en-us_topic_0182200846_p94481155184914"><a name="en-us_topic_0182200846_p94481155184914"></a><a name="en-us_topic_0182200846_p94481155184914"></a>Option Description</p>
</th>
<th class="cellrowborder" valign="top" width="33.269999999999996%" id="mcps1.1.5.1.4"><p id="en-us_topic_0182200846_p15693173814112"><a name="en-us_topic_0182200846_p15693173814112"></a><a name="en-us_topic_0182200846_p15693173814112"></a>Parameter Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200846_row12693163810415"><td class="cellrowborder" valign="top" width="14.57%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0182200846_p444842883212"><a name="en-us_topic_0182200846_p444842883212"></a><a name="en-us_topic_0182200846_p444842883212"></a>add-device</p>
</td>
<td class="cellrowborder" valign="top" width="18.060000000000002%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0182200846_p16340476530"><a name="en-us_topic_0182200846_p16340476530"></a><a name="en-us_topic_0182200846_p16340476530"></a>Adds block devices or character devices on the host to a container.</p>
</td>
<td class="cellrowborder" valign="top" width="34.1%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0182200846_p244855511499"><a name="en-us_topic_0182200846_p244855511499"></a><a name="en-us_topic_0182200846_p244855511499"></a>Supported options are as follows:</p>
<a name="en-us_topic_0182200846_ul01774256522"></a><a name="en-us_topic_0182200846_ul01774256522"></a><ul id="en-us_topic_0182200846_ul01774256522"><li><strong id="b621183012112"><a name="b621183012112"></a><a name="b621183012112"></a>--blkio-weight-device</strong>: sets the I/O weight (relative weight, ranging from 10 to 100) of a block device.</li><li><strong id="b10102941112919"><a name="b10102941112919"></a><a name="b10102941112919"></a>--device-read-bps</strong>: sets the read rate limit for the block device (byte/s).</li><li><strong id="b930719125319"><a name="b930719125319"></a><a name="b930719125319"></a>--device-read-iops</strong>: sets the read rate limit for the block device (I/O/s).</li><li><strong id="b193521739113419"><a name="b193521739113419"></a><a name="b193521739113419"></a>--device-write-bps</strong>: sets the write rate limit for the block device (byte/s).</li><li><strong id="b10776718143511"><a name="b10776718143511"></a><a name="b10776718143511"></a>--device-write-iops</strong>: sets the write rate limit for the block device (I/O/s).</li><li><strong id="b69551034216"><a name="b69551034216"></a><a name="b69551034216"></a>--follow-partition</strong>: If a block device is a basic block device (primary SCSI block disk), set this parameter to add all partitions of the primary disk.</li><li><strong id="b991063717117"><a name="b991063717117"></a><a name="b991063717117"></a>--force</strong>: If any block device or character device already exists in the container, use this parameter to overwrite the old block device or character device files.</li><li><strong id="b17031241114"><a name="b17031241114"></a><a name="b17031241114"></a>--update-config-only</strong>: updates configuration files only and does not add disks.</li></ul>
</td>
<td class="cellrowborder" valign="top" width="33.269999999999996%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0182200846_p64831829205219"><a name="en-us_topic_0182200846_p64831829205219"></a><a name="en-us_topic_0182200846_p64831829205219"></a>Parameter format: <em id="i1455573033513"><a name="i1455573033513"></a><a name="i1455573033513"></a>hostdevice</em><strong id="b19631203493518"><a name="b19631203493518"></a><a name="b19631203493518"></a>[:</strong><em id="i680010356353"><a name="i680010356353"></a><a name="i680010356353"></a>containerdevice</em><strong id="b79431438173510"><a name="b79431438173510"></a><a name="b79431438173510"></a>][:</strong><em id="i86276391355"><a name="i86276391355"></a><a name="i86276391355"></a>permission</em><strong id="b3200204463511"><a name="b3200204463511"></a><a name="b3200204463511"></a>] [</strong><em id="i13832045113513"><a name="i13832045113513"></a><a name="i13832045113513"></a>hostdevice</em><strong id="b1255717486354"><a name="b1255717486354"></a><a name="b1255717486354"></a>[:</strong><em id="i52529498351"><a name="i52529498351"></a><a name="i52529498351"></a>containerdevice</em><strong id="b7412115215355"><a name="b7412115215355"></a><a name="b7412115215355"></a>][:</strong><em id="i12334185314354"><a name="i12334185314354"></a><a name="i12334185314354"></a>permission</em><strong id="b1741218527350"><a name="b1741218527350"></a><a name="b1741218527350"></a>]]</strong></p>
<p id="en-us_topic_0182200846_p1612914315579"><a name="en-us_topic_0182200846_p1612914315579"></a><a name="en-us_topic_0182200846_p1612914315579"></a>In the preceding format:</p>
<p id="en-us_topic_0182200846_p155511013165316"><a name="en-us_topic_0182200846_p155511013165316"></a><a name="en-us_topic_0182200846_p155511013165316"></a><em id="i674233514217"><a name="i674233514217"></a><a name="i674233514217"></a>hostdevice</em>: path on the host for storing a device.</p>
<p id="en-us_topic_0182200846_p11101757155310"><a name="en-us_topic_0182200846_p11101757155310"></a><a name="en-us_topic_0182200846_p11101757155310"></a><em id="i183506403218"><a name="i183506403218"></a><a name="i183506403218"></a>containerdevice</em>: path on the container for storing a device.</p>
<p id="en-us_topic_0182200846_p1918318113541"><a name="en-us_topic_0182200846_p1918318113541"></a><a name="en-us_topic_0182200846_p1918318113541"></a><em id="i117864911422"><a name="i117864911422"></a><a name="i117864911422"></a>permission</em>: operation permission on a device within the container.</p>
</td>
</tr>
<tr id="en-us_topic_0182200846_row12634059013"><td class="cellrowborder" valign="top" width="14.57%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0182200846_p9635951805"><a name="en-us_topic_0182200846_p9635951805"></a><a name="en-us_topic_0182200846_p9635951805"></a>remove-device</p>
</td>
<td class="cellrowborder" valign="top" width="18.060000000000002%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0182200846_p3693165534"><a name="en-us_topic_0182200846_p3693165534"></a><a name="en-us_topic_0182200846_p3693165534"></a>Deletes block devices or character devices from a container and restores them to the host.</p>
</td>
<td class="cellrowborder" valign="top" width="34.1%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0182200846_p2448145512492"><a name="en-us_topic_0182200846_p2448145512492"></a><a name="en-us_topic_0182200846_p2448145512492"></a>Supported options are as follows:</p>
<p id="en-us_topic_0182200846_p61712289347"><a name="en-us_topic_0182200846_p61712289347"></a><a name="en-us_topic_0182200846_p61712289347"></a><strong id="b4671203518479"><a name="b4671203518479"></a><a name="b4671203518479"></a>--follow-partition</strong>: If a block device is a basic block device (primary SCSI block disk), set this parameter to delete all partitions of the primary disk in the container, and restore them to the host.</p>
</td>
<td class="cellrowborder" valign="top" width="33.269999999999996%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0182200846_p14901184913565"><a name="en-us_topic_0182200846_p14901184913565"></a><a name="en-us_topic_0182200846_p14901184913565"></a>Parameter format: <em id="i178156315504"><a name="i178156315504"></a><a name="i178156315504"></a>hostdevice</em><strong id="b156821145013"><a name="b156821145013"></a><a name="b156821145013"></a>[:</strong><em id="i137121287502"><a name="i137121287502"></a><a name="i137121287502"></a>containerdevice</em><strong id="b1951518570509"><a name="b1951518570509"></a><a name="b1951518570509"></a>] [</strong><em id="i4813235185018"><a name="i4813235185018"></a><a name="i4813235185018"></a>hostdevice</em><strong id="b13881133155118"><a name="b13881133155118"></a><a name="b13881133155118"></a>[:</strong><em id="i178151238155016"><a name="i178151238155016"></a><a name="i178151238155016"></a>containerdevice</em><strong id="b455077115117"><a name="b455077115117"></a><a name="b455077115117"></a>]]</strong></p>
<p id="en-us_topic_0182200846_p1416315705720"><a name="en-us_topic_0182200846_p1416315705720"></a><a name="en-us_topic_0182200846_p1416315705720"></a>In the preceding format:</p>
<p id="en-us_topic_0182200846_p1786451795612"><a name="en-us_topic_0182200846_p1786451795612"></a><a name="en-us_topic_0182200846_p1786451795612"></a><em id="i362235095119"><a name="i362235095119"></a><a name="i362235095119"></a>hostdevice</em>: path on the host for storing a device.</p>
<p id="en-us_topic_0182200846_p148648176569"><a name="en-us_topic_0182200846_p148648176569"></a><a name="en-us_topic_0182200846_p148648176569"></a><em id="i14551155218512"><a name="i14551155218512"></a><a name="i14551155218512"></a>containerdevice</em>: path on the container for storing a device.</p>
</td>
</tr>
<tr id="en-us_topic_0182200846_row915811441301"><td class="cellrowborder" valign="top" width="14.57%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0182200846_p1517984363416"><a name="en-us_topic_0182200846_p1517984363416"></a><a name="en-us_topic_0182200846_p1517984363416"></a>list-device</p>
</td>
<td class="cellrowborder" valign="top" width="18.060000000000002%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0182200846_p89272237538"><a name="en-us_topic_0182200846_p89272237538"></a><a name="en-us_topic_0182200846_p89272237538"></a>Lists all block devices or character devices in a container.</p>
</td>
<td class="cellrowborder" valign="top" width="34.1%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0182200846_p54486558499"><a name="en-us_topic_0182200846_p54486558499"></a><a name="en-us_topic_0182200846_p54486558499"></a>Supported options are as follows:</p>
<a name="en-us_topic_0182200846_ul12255019574"></a><a name="en-us_topic_0182200846_ul12255019574"></a><ul id="en-us_topic_0182200846_ul12255019574"><li><strong id="b83936231209"><a name="b83936231209"></a><a name="b83936231209"></a>--pretty</strong>: outputs data in JSON format.</li><li><strong id="b165511558909"><a name="b165511558909"></a><a name="b165511558909"></a>--sub-partition</strong>: For a primary disk, add this flag to display the primary disk and its sub-partitions.</li></ul>
</td>
<td class="cellrowborder" valign="top" width="33.269999999999996%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0182200846_p1384735113573"><a name="en-us_topic_0182200846_p1384735113573"></a><a name="en-us_topic_0182200846_p1384735113573"></a>None</p>
</td>
</tr>
<tr id="en-us_topic_0182200846_row17443144712014"><td class="cellrowborder" valign="top" width="14.57%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0182200846_p8971171519352"><a name="en-us_topic_0182200846_p8971171519352"></a><a name="en-us_topic_0182200846_p8971171519352"></a>update-device</p>
</td>
<td class="cellrowborder" valign="top" width="18.060000000000002%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0182200846_p27499305535"><a name="en-us_topic_0182200846_p27499305535"></a><a name="en-us_topic_0182200846_p27499305535"></a>Updates the disk QoS.</p>
</td>
<td class="cellrowborder" valign="top" width="34.1%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0182200846_p195615299587"><a name="en-us_topic_0182200846_p195615299587"></a><a name="en-us_topic_0182200846_p195615299587"></a>Supported options are as follows:</p>
<a name="en-us_topic_0182200846_ul1231001583"></a><a name="en-us_topic_0182200846_ul1231001583"></a><ul id="en-us_topic_0182200846_ul1231001583"><li><strong id="b13620129277"><a name="b13620129277"></a><a name="b13620129277"></a>--device-read-bps</strong>: sets the read rate limit for the block device (byte/s). You are advised to set this parameter to a value greater than or equal to 1024.</li><li><strong id="b172341422155317"><a name="b172341422155317"></a><a name="b172341422155317"></a>--device-read-iops</strong>: sets the read rate limit for the block device (I/O/s).</li><li><strong id="b15127930493"><a name="b15127930493"></a><a name="b15127930493"></a>--device-write-bps</strong>: sets the write rate limit for the block device (byte/s). You are advised to set this parameter to a value greater than or equal to 1024.</li><li><strong id="b9473213145816"><a name="b9473213145816"></a><a name="b9473213145816"></a>--device-write-iops</strong>: sets the write rate limit for the block device (I/O/s).</li></ul>
</td>
<td class="cellrowborder" valign="top" width="33.269999999999996%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0182200846_p414723312583"><a name="en-us_topic_0182200846_p414723312583"></a><a name="en-us_topic_0182200846_p414723312583"></a>None</p>
</td>
</tr>
</tbody>
</table>

### Constraints

-   You can add or delete devices when container instances are not running. After the operation is complete, you can start the container to view the device status. You can also dynamically add a device when the container is running.
-   Do not concurrently run the  **fdisk**  command to format disks in a container and on the host. Otherwise, the container disk usage will be affected.
-   When you run the  **add-device**  command to add a disk to a specific directory of a container, if the parent directory in the container is a multi-level directory \(for example,  **/dev/a/b/c/d/e**\) and the directory level does not exist, isulad-tools will automatically create the corresponding directory in the container. When the disk is deleted, the created parent directory is not deleted. If you run the  **add-device**  command to add a device to this parent directory again, a message is displayed, indicating that a device already exists and cannot be added.
-   When you run the** add-device**  command to add a disk or update disk parameters, you need to configure the disk QoS. Do not set the write or read rate limit for the block device \(I/O/s or byte/s\) to a small value. If the value is too small, the disk may be unreadable \(the actual reason is the speed is too slow\), affecting service functions.
-   When you run the  **--blkio-weight-device**  command to limit the weight of a specified block device, if the block device supports only the BFQ mode, an error may be reported, prompting you to check whether the current OS environment supports setting the weight of the BFQ block device.

### Example

-   Start a system container, and set  **hook spec**  to the isulad hook execution script.

    ```
    [root@localhost ~]# isula run -tid --hook-spec /etc/isulad-tools/hookspec.json --system-container --external-rootfs /root/root-fs none init
    eed1096c8c7a0eca6d92b1b3bc3dd59a2a2adf4ce44f18f5372408ced88f8350
    ```


-   Add a block device to a container.

    ```
    [root@localhost ~]# isulad-tools add-device ee /dev/sdb:/dev/sdb123
    Add device (/dev/sdb) to container(ee,/dev/sdb123) done.
    [root@localhost ~]# isula exec ee fdisk -l /dev/sdb123
    Disk /dev/sdb123: 50 GiB, 53687091200 bytes, 104857600 sectors
    Units: sectors of 1 * 512 = 512 bytes
    Sector size (logical/physical): 512 bytes / 512 bytes
    I/O size (minimum/optimal): 512 bytes / 512 bytes
    Disklabel type: dos
    Disk identifier: 0xda58a448
    
    Device        Boot Start       End   Sectors Size Id Type
    /dev/sdb123p1       2048 104857599 104855552  50G  5 Extended
    /dev/sdb123p5       4096 104857599 104853504  50G 83 Linux
    ```

-   Update the device information.

    ```
    [root@localhost ~]# isulad-tools update-device --device-read-bps /dev/sdb:10m ee
    Update read bps for device (/dev/sdb,10485760) done.
    ```

-   Delete a device.

    ```
    [root@localhost ~]# isulad-tools remove-device ee /dev/sdb:/dev/sdb123
    Remove device (/dev/sdb) from container(ee,/dev/sdb123) done.
    Remove read bps for device (/dev/sdb) done.
    ```


## NIC Management

### Function Description

isulad-tools allows you to insert physical or virtual NICs on the host to a container. If the NICs are not required, isulad-tools allows you to delete them from the container and return them to the host. In addition, the NIC configurations can be dynamically modified. To insert a physical NIC, add the NIC on the host to the container. To insert a virtual NIC, create a veth pair and insert its one end to the container.

### Command Format

```
isulad-tools [COMMADN][OPTIONS] <container_id>
```

In the preceding format:

**COMMAND**: command related to NIC management.

**OPTIONS**: option supported by the NIC management command.

**container\_id**: container ID.

### Parameter Description


<table><thead align="left"><tr id="en-us_topic_0182200847_row1569373816419"><th class="cellrowborder" valign="top" width="23.98%" id="mcps1.1.4.1.1"><p id="en-us_topic_0182200847_p106936387415"><a name="en-us_topic_0182200847_p106936387415"></a><a name="en-us_topic_0182200847_p106936387415"></a><strong id="b84235270693550"><a name="b84235270693550"></a><a name="b84235270693550"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="29.82%" id="mcps1.1.4.1.2"><p id="en-us_topic_0182200847_p43193341215"><a name="en-us_topic_0182200847_p43193341215"></a><a name="en-us_topic_0182200847_p43193341215"></a>Function Description</p>
</th>
<th class="cellrowborder" valign="top" width="46.2%" id="mcps1.1.4.1.3"><p id="en-us_topic_0182200847_p15693173814112"><a name="en-us_topic_0182200847_p15693173814112"></a><a name="en-us_topic_0182200847_p15693173814112"></a>Option Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200847_row12693163810415"><td class="cellrowborder" valign="top" width="23.98%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200847_p8603174842418"><a name="en-us_topic_0182200847_p8603174842418"></a><a name="en-us_topic_0182200847_p8603174842418"></a>add-nic</p>
</td>
<td class="cellrowborder" valign="top" width="29.82%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200847_p16721336607"><a name="en-us_topic_0182200847_p16721336607"></a><a name="en-us_topic_0182200847_p16721336607"></a>Creates an NIC for a container.</p>
</td>
<td class="cellrowborder" valign="top" width="46.2%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182200847_p02913277715"><a name="en-us_topic_0182200847_p02913277715"></a><a name="en-us_topic_0182200847_p02913277715"></a>Supported options are as follows:</p>
<a name="en-us_topic_0182200847_ul1875817141814"></a><a name="en-us_topic_0182200847_ul1875817141814"></a><ul id="en-us_topic_0182200847_ul1875817141814"><li><strong id="b7815102716287"><a name="b7815102716287"></a><a name="b7815102716287"></a>--type</strong>: specifies the NIC type. Only <strong id="b18345105812314"><a name="b18345105812314"></a><a name="b18345105812314"></a>eth</strong> and <strong id="b1464118103210"><a name="b1464118103210"></a><a name="b1464118103210"></a>veth</strong> are supported.</li><li><strong id="b844714179488"><a name="b844714179488"></a><a name="b844714179488"></a>--name</strong>: specifies the NIC name. The format is <strong id="b12447101774817"><a name="b12447101774817"></a><a name="b12447101774817"></a>[</strong><em id="i9447917114810"><a name="i9447917114810"></a><a name="i9447917114810"></a>host</em><strong id="b14479172482"><a name="b14479172482"></a><a name="b14479172482"></a>:]</strong><em id="i1944851710487"><a name="i1944851710487"></a><a name="i1944851710487"></a>container</em>. If <em id="i6448151716489"><a name="i6448151716489"></a><a name="i6448151716489"></a>host</em> is not specified, a random value is used.</li><li><strong id="b19130163145210"><a name="b19130163145210"></a><a name="b19130163145210"></a>--ip</strong>: specifies the NIC IP address.</li><li><strong id="b856913555317"><a name="b856913555317"></a><a name="b856913555317"></a>--mac</strong>: specifies the NIC MAC address.</li><li><strong id="b119354735417"><a name="b119354735417"></a><a name="b119354735417"></a>--bridge</strong>: specifies the network bridge bound to the NIC.</li><li><strong id="b11816162945716"><a name="b11816162945716"></a><a name="b11816162945716"></a>--mtu</strong>: specifies the MTU value of the NIC. The default value is <strong id="b17540166155719"><a name="b17540166155719"></a><a name="b17540166155719"></a>1500</strong>.</li><li><strong id="b14681910192217"><a name="b14681910192217"></a><a name="b14681910192217"></a>--update-config-only</strong>: If this flag is set, only configuration files are updated and NICs are not added.</li><li><strong id="b755619413572"><a name="b755619413572"></a><a name="b755619413572"></a>--qlen</strong>: specifies the value of QLEN. The default value is <strong id="b2385244145714"><a name="b2385244145714"></a><a name="b2385244145714"></a>1000</strong>.</li></ul>
</td>
</tr>
<tr id="en-us_topic_0182200847_row12634059013"><td class="cellrowborder" valign="top" width="23.98%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200847_p12351181472613"><a name="en-us_topic_0182200847_p12351181472613"></a><a name="en-us_topic_0182200847_p12351181472613"></a>remove-nic</p>
</td>
<td class="cellrowborder" valign="top" width="29.82%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200847_p78191855207"><a name="en-us_topic_0182200847_p78191855207"></a><a name="en-us_topic_0182200847_p78191855207"></a>Deletes NICs from a container and restores them to the host.</p>
</td>
<td class="cellrowborder" valign="top" width="46.2%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182200847_p4233191489"><a name="en-us_topic_0182200847_p4233191489"></a><a name="en-us_topic_0182200847_p4233191489"></a>Supported options are as follows:</p>
<a name="en-us_topic_0182200847_ul68987187111"></a><a name="en-us_topic_0182200847_ul68987187111"></a><ul id="en-us_topic_0182200847_ul68987187111"><li><strong id="b11872119205816"><a name="b11872119205816"></a><a name="b11872119205816"></a>--type</strong>: specifies the NIC type.</li><li><strong id="b1161102510488"><a name="b1161102510488"></a><a name="b1161102510488"></a>--name</strong>: specifies the name of the NIC. The format is <strong id="b16611225184814"><a name="b16611225184814"></a><a name="b16611225184814"></a>[</strong><em id="i1262142512481"><a name="i1262142512481"></a><a name="i1262142512481"></a>host</em><strong id="b862125184818"><a name="b862125184818"></a><a name="b862125184818"></a>:]</strong><em id="i1362162534811"><a name="i1362162534811"></a><a name="i1362162534811"></a>container</em>.</li></ul>
</td>
</tr>
<tr id="en-us_topic_0182200847_row915811441301"><td class="cellrowborder" valign="top" width="23.98%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200847_p54403352715"><a name="en-us_topic_0182200847_p54403352715"></a><a name="en-us_topic_0182200847_p54403352715"></a>list-nic</p>
</td>
<td class="cellrowborder" valign="top" width="29.82%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200847_p17641112811"><a name="en-us_topic_0182200847_p17641112811"></a><a name="en-us_topic_0182200847_p17641112811"></a>Lists all NICs in a container.</p>
</td>
<td class="cellrowborder" valign="top" width="46.2%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182200847_p164614131884"><a name="en-us_topic_0182200847_p164614131884"></a><a name="en-us_topic_0182200847_p164614131884"></a>Supported options are as follows:</p>
<a name="en-us_topic_0182200847_ul1478910231716"></a><a name="en-us_topic_0182200847_ul1478910231716"></a><ul id="en-us_topic_0182200847_ul1478910231716"><li><strong id="b1753841132916"><a name="b1753841132916"></a><a name="b1753841132916"></a>--pretty</strong>: outputs data in JSON format.</li><li><strong id="b3462458122710"><a name="b3462458122710"></a><a name="b3462458122710"></a>--filter</strong>: outputs filtered data in the specific format, for example,<strong id="b830224718536"><a name="b830224718536"></a><a name="b830224718536"></a> --filter' {"ip":"192.168.3.4/24", "Mtu":1500}'</strong>.</li></ul>
</td>
</tr>
<tr id="en-us_topic_0182200847_row17443144712014"><td class="cellrowborder" valign="top" width="23.98%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200847_p863734242710"><a name="en-us_topic_0182200847_p863734242710"></a><a name="en-us_topic_0182200847_p863734242710"></a>update-nic</p>
</td>
<td class="cellrowborder" valign="top" width="29.82%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200847_p167205392720"><a name="en-us_topic_0182200847_p167205392720"></a><a name="en-us_topic_0182200847_p167205392720"></a>Modifies configuration parameters of a specified NIC in a container.</p>
</td>
<td class="cellrowborder" valign="top" width="46.2%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182200847_p102662215818"><a name="en-us_topic_0182200847_p102662215818"></a><a name="en-us_topic_0182200847_p102662215818"></a>Supported options are as follows:</p>
<a name="en-us_topic_0182200847_ul7172711120"></a><a name="en-us_topic_0182200847_ul7172711120"></a><ul id="en-us_topic_0182200847_ul7172711120"><li><strong id="b19608412122910"><a name="b19608412122910"></a><a name="b19608412122910"></a>--name</strong>: specifies the name of the NIC in the container. This parameter is mandatory.</li><li><strong id="b19413133542917"><a name="b19413133542917"></a><a name="b19413133542917"></a>--ip</strong>: specifies the NIC IP address.</li><li><strong id="b1386113392295"><a name="b1386113392295"></a><a name="b1386113392295"></a>--mac</strong>: specifies the NIC MAC address.</li><li><strong id="b10289943132910"><a name="b10289943132910"></a><a name="b10289943132910"></a>--bridge</strong>: specifies the network bridge bound to the NIC.</li><li><strong id="b7609647162912"><a name="b7609647162912"></a><a name="b7609647162912"></a>--mtu</strong>: specifies the MTU value of the NIC.</li><li><strong id="b1039156152920"><a name="b1039156152920"></a><a name="b1039156152920"></a>--update-config-only</strong>: If this flag is set, configuration files are updated and NICs are not updated.</li><li><strong id="b198327733112"><a name="b198327733112"></a><a name="b198327733112"></a>--qlen</strong>: specifies the value of QLEN.</li></ul>
</td>
</tr>
</tbody>
</table>

### Constraints

-   Physical NICs \(eth\) and virtual NICs \(veth\) can be added.
-   When adding a NIC, you can also configure the NIC. The configuration parameters include  **--ip**,  **--mac**,  **--bridge**,  **--mtu**,  **--qlen**.
-   A maximum of eight physical NICs can be added to a container.
-   If you run the  **isulad-tools add-nic**  command to add an eth NIC to a container and do not add a hook, you must manually delete the NIC before the container exits. Otherwise, the name of the eth NIC on the host will be changed to the name of that in the container.
-   For a physical NIC \(except 1822 VF NIC\), use the original MAC address when running the  **add-nic**  command. Do not change the MAC address in the container, or when running the  **update-nic**  command.
-   When using the  **isulad-tools add-nic**  command, set the MTU value. The value range depends on the NIC model.
-   When using isulad-tools to add NICs and routes to containers, you are advised to run the  **add-nic**  command to add NICs and then run the  **add-route**  command to add routes. When using isulad-tools to delete NICs and routes from a container, you are advised to run the  **remove-route**  command to delete routes and then run the  **remove-nic**  command to delete NICs.
-   When using isulad-tools to add NICs, add a NIC to only one container.

### Example

-   Start a system container, and set  **hook spec**  to the isulad hook execution script.

    ```
    [root@localhost ~]# isula run -tid --hook-spec /etc/isulad-tools/hookspec.json --system-container --external-rootfs /root/root-fs none init
    2aaca5c1af7c872798dac1a468528a2ccbaf20b39b73fc0201636936a3c32aa8
    ```


-   Add a virtual NIC to a container.

    ```
    [root@localhost ~]# isulad-tools add-nic --type "veth" --name abc2:bcd2 --ip 172.17.28.5/24 --mac 00:ff:48:13:xx:xx --bridge docker0 2aaca5c1af7c
    Add network interface to container 2aaca5c1af7c (bcd2,abc2) done  
    ```

-   Add a physical NIC to a container.

    ```
    [root@localhost ~]# isulad-tools add-nic --type "eth" --name eth3:eth1 --ip 172.17.28.6/24  --mtu 1300  --qlen 2100 2aaca5c1af7c
    Add network interface to container 2aaca5c1af7c (eth3,eth1) done
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >When adding a virtual or physical NIC, ensure that the NIC is in the idle state. Adding a NIC in use will disconnect the system network.  


## Route Management

### Function Description

isulad-tools can be used to dynamically add or delete routing tables for system containers.

### Command Format

```
isulad-tools [COMMADN][OPTIONS] <container_id> [ARG...]
```

In the preceding format:

**COMMAND**: command related to route management.

**OPTIONS**: option supported by the route management command.

**container\_id**: container ID.

**ARG**: parameter corresponding to the command.

### API Description


<table><thead align="left"><tr id="en-us_topic_0182200848_row1569373816419"><th class="cellrowborder" valign="top" width="16.028397160283973%" id="mcps1.1.5.1.1"><p id="en-us_topic_0182200848_p106936387415"><a name="en-us_topic_0182200848_p106936387415"></a><a name="en-us_topic_0182200848_p106936387415"></a><strong id="b84235270693550"><a name="b84235270693550"></a><a name="b84235270693550"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="22.187781221877813%" id="mcps1.1.5.1.2"><p id="en-us_topic_0182200848_p43193341215"><a name="en-us_topic_0182200848_p43193341215"></a><a name="en-us_topic_0182200848_p43193341215"></a>Function Description</p>
</th>
<th class="cellrowborder" valign="top" width="30.45695430456954%" id="mcps1.1.5.1.3"><p id="en-us_topic_0182200848_p2170152961216"><a name="en-us_topic_0182200848_p2170152961216"></a><a name="en-us_topic_0182200848_p2170152961216"></a>Option Description</p>
</th>
<th class="cellrowborder" valign="top" width="31.326867313268675%" id="mcps1.1.5.1.4"><p id="en-us_topic_0182200848_p15693173814112"><a name="en-us_topic_0182200848_p15693173814112"></a><a name="en-us_topic_0182200848_p15693173814112"></a>Parameter Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200848_row12693163810415"><td class="cellrowborder" valign="top" width="16.028397160283973%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0182200848_p8603174842418"><a name="en-us_topic_0182200848_p8603174842418"></a><a name="en-us_topic_0182200848_p8603174842418"></a>add-route</p>
</td>
<td class="cellrowborder" valign="top" width="22.187781221877813%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0182200848_p43636507713"><a name="en-us_topic_0182200848_p43636507713"></a><a name="en-us_topic_0182200848_p43636507713"></a>Adds the network routing rules to a container.</p>
</td>
<td class="cellrowborder" valign="top" width="30.45695430456954%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0182200848_p11701929151216"><a name="en-us_topic_0182200848_p11701929151216"></a><a name="en-us_topic_0182200848_p11701929151216"></a>Supported options are as follows:</p>
<p id="en-us_topic_0182200848_p0431852201310"><a name="en-us_topic_0182200848_p0431852201310"></a><a name="en-us_topic_0182200848_p0431852201310"></a><strong id="b16601536174020"><a name="b16601536174020"></a><a name="b16601536174020"></a>--update-config-only</strong>: If this parameter is configured, configuration files are updated and routing tables are not updated.</p>
</td>
<td class="cellrowborder" valign="top" width="31.326867313268675%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0182200848_p4970743143512"><a name="en-us_topic_0182200848_p4970743143512"></a><a name="en-us_topic_0182200848_p4970743143512"></a>Parameter format: <strong id="b19794112375213"><a name="b19794112375213"></a><a name="b19794112375213"></a>[{</strong><em id="i367972414524"><a name="i367972414524"></a><a name="i367972414524"></a>rule1</em><strong id="b171791227175217"><a name="b171791227175217"></a><a name="b171791227175217"></a>},{</strong><em id="i2812152765218"><a name="i2812152765218"></a><a name="i2812152765218"></a>rule2</em><strong id="b1318032745212"><a name="b1318032745212"></a><a name="b1318032745212"></a>}]</strong></p>
<p id="en-us_topic_0182200848_p615914310354"><a name="en-us_topic_0182200848_p615914310354"></a><a name="en-us_topic_0182200848_p615914310354"></a>Example of <em id="i115451328114113"><a name="i115451328114113"></a><a name="i115451328114113"></a>rule</em>:</p>
<p id="en-us_topic_0182200848_p12159163116357"><a name="en-us_topic_0182200848_p12159163116357"></a><a name="en-us_topic_0182200848_p12159163116357"></a>'[{"dest":"default",  "gw":"192.168.10.1"},{"dest":"192.168.0.0/16","dev":"eth0","src":"192.168.1.2"}]'</p>
<a name="en-us_topic_0182200848_ul1058312615818"></a><a name="en-us_topic_0182200848_ul1058312615818"></a><ul id="en-us_topic_0182200848_ul1058312615818"><li><strong id="b823113134119"><a name="b823113134119"></a><a name="b823113134119"></a>dest</strong>: target network. If this parameter is left blank, the default gateway is used.</li><li><strong id="b182041533164118"><a name="b182041533164118"></a><a name="b182041533164118"></a>src</strong>: source IP address of a route.</li><li><strong id="b37991511184215"><a name="b37991511184215"></a><a name="b37991511184215"></a>gw</strong>: route gateway.</li><li><strong id="b3195715194210"><a name="b3195715194210"></a><a name="b3195715194210"></a>dev</strong>: network device.</li></ul>
</td>
</tr>
<tr id="en-us_topic_0182200848_row12634059013"><td class="cellrowborder" valign="top" width="16.028397160283973%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0182200848_p17486195414355"><a name="en-us_topic_0182200848_p17486195414355"></a><a name="en-us_topic_0182200848_p17486195414355"></a>remove-route</p>
</td>
<td class="cellrowborder" valign="top" width="22.187781221877813%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0182200848_p9398191102119"><a name="en-us_topic_0182200848_p9398191102119"></a><a name="en-us_topic_0182200848_p9398191102119"></a>Deletes a route from a container.</p>
</td>
<td class="cellrowborder" valign="top" width="30.45695430456954%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0182200848_p1217002917127"><a name="en-us_topic_0182200848_p1217002917127"></a><a name="en-us_topic_0182200848_p1217002917127"></a>Supported options are as follows:</p>
<p id="en-us_topic_0182200848_p9642651372"><a name="en-us_topic_0182200848_p9642651372"></a><a name="en-us_topic_0182200848_p9642651372"></a><strong id="b154670445217"><a name="b154670445217"></a><a name="b154670445217"></a>--update-config-only</strong>: If this parameter is configured, only configuration files are updated and routes are not deleted from the container.</p>
</td>
<td class="cellrowborder" valign="top" width="31.326867313268675%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0182200848_p185861042134216"><a name="en-us_topic_0182200848_p185861042134216"></a><a name="en-us_topic_0182200848_p185861042134216"></a>Parameter format: <strong id="b289518195424"><a name="b289518195424"></a><a name="b289518195424"></a>[</strong><em id="i1589631911429"><a name="i1589631911429"></a><a name="i1589631911429"></a>{rule1}</em><strong id="b128983191426"><a name="b128983191426"></a><a name="b128983191426"></a>,</strong><em id="i198991519164216"><a name="i198991519164216"></a><a name="i198991519164216"></a>{rule2}</em><strong id="b789981911425"><a name="b789981911425"></a><a name="b789981911425"></a>]</strong></p>
<p id="en-us_topic_0182200848_p19384145193619"><a name="en-us_topic_0182200848_p19384145193619"></a><a name="en-us_topic_0182200848_p19384145193619"></a>Example of <em id="i1553542414424"><a name="i1553542414424"></a><a name="i1553542414424"></a>rule</em>:</p>
<p id="en-us_topic_0182200848_p7384252365"><a name="en-us_topic_0182200848_p7384252365"></a><a name="en-us_topic_0182200848_p7384252365"></a>'[{"dest":"default",  "gw":"192.168.10.1"},{"dest":"192.168.0.0/16","dev":"eth0","src":"192.168.1.2"}]'</p>
<a name="en-us_topic_0182200848_ul208756521426"></a><a name="en-us_topic_0182200848_ul208756521426"></a><ul id="en-us_topic_0182200848_ul208756521426"><li><strong id="b43666281332"><a name="b43666281332"></a><a name="b43666281332"></a>dest</strong>: target network. If this parameter is left blank, the default gateway is used.</li><li><strong id="b41197421431"><a name="b41197421431"></a><a name="b41197421431"></a>src</strong>: source IP address of a route.</li><li><strong id="b11134104513319"><a name="b11134104513319"></a><a name="b11134104513319"></a>gw</strong>: route gateway.</li><li><strong id="b173991647434"><a name="b173991647434"></a><a name="b173991647434"></a>dev</strong>: network device.</li></ul>
</td>
</tr>
<tr id="en-us_topic_0182200848_row915811441301"><td class="cellrowborder" valign="top" width="16.028397160283973%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0182200848_p1512713135379"><a name="en-us_topic_0182200848_p1512713135379"></a><a name="en-us_topic_0182200848_p1512713135379"></a>list-route</p>
</td>
<td class="cellrowborder" valign="top" width="22.187781221877813%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0182200848_p144972610376"><a name="en-us_topic_0182200848_p144972610376"></a><a name="en-us_topic_0182200848_p144972610376"></a>Lists all routing rules in a container.</p>
</td>
<td class="cellrowborder" valign="top" width="30.45695430456954%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0182200848_p1517092931217"><a name="en-us_topic_0182200848_p1517092931217"></a><a name="en-us_topic_0182200848_p1517092931217"></a>Supported options are as follows:</p>
<a name="en-us_topic_0182200848_ul2807411144318"></a><a name="en-us_topic_0182200848_ul2807411144318"></a><ul id="en-us_topic_0182200848_ul2807411144318"><li><strong id="b1041516931719"><a name="b1041516931719"></a><a name="b1041516931719"></a>--pretty</strong>: outputs data in JSON format.</li><li><strong id="b15656121117177"><a name="b15656121117177"></a><a name="b15656121117177"></a>--filter</strong>: outputs filtered data in the specific format, for example,<strong id="b065701117170"><a name="b065701117170"></a><a name="b065701117170"></a> --filter' {"ip":"192.168.3.4/24", "Mtu":1500}'</strong>.</li></ul>
</td>
<td class="cellrowborder" valign="top" width="31.326867313268675%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0182200848_p174731584319"><a name="en-us_topic_0182200848_p174731584319"></a><a name="en-us_topic_0182200848_p174731584319"></a>None</p>
</td>
</tr>
</tbody>
</table>

### Constraints

-   When using isulad-tools to add NICs and routes to containers, you are advised to run the  **add-nic**  command to add NICs and then run the  **add-route**  command to add routes. When using isulad-tools to delete NICs and routes from a container, you are advised to run the  **remove-route**  command to delete routes and then run the  **remove-nic**  command to delete NICs.
-   When adding a routing rule to a container, ensure that the added routing rule does not conflict with existing routing rules in the container.

### Example

-   Start a system container, and set  **hook spec**  to the isulad hook execution script.

    ```
    [root@localhost ~]# isula run -tid --hook-spec /etc/isulad-tools/hookspec.json --system-container --external-rootfs /root/root-fs none init
    0d2d68b45aa0c1b8eaf890c06ab2d008eb8c5d91e78b1f8fe4d37b86fd2c190b
    ```


-   Use isulad-tools to add a physical NIC to the system container.

    ```
    [root@localhost ~]# isulad-tools add-nic --type "eth" --name enp4s0:eth123 --ip 172.17.28.6/24  --mtu 1300  --qlen 2100 0d2d68b45aa0
    Add network interface (enp4s0) to container (0d2d68b45aa0,eth123) done
    ```


-   isulad-tools adds a routing rule to the system container. Format example:  **\[\{"dest":"default", "gw":"192.168.10.1"\},\{"dest":"192.168.0.0/16","dev":"eth0","src":"192.168.1.2"\}\]**. If  **dest**  is left blank, its value will be  **default**.

    ```
    [root@localhost ~]# isulad-tools add-route 0d2d68b45aa0 '[{"dest":"172.17.28.0/32", "gw":"172.17.28.5","dev":"eth123"}]'
    Add route to container 0d2d68b45aa0, route: {dest:172.17.28.0/32,src:,gw:172.17.28.5,dev:eth123} done
    ```

-   Check whether a routing rule is added in the container.

    ```
    [root@localhost ~]# isula exec -it 0d2d68b45aa0 route
    Kernel IP routing table
    Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
    172.17.28.0     172.17.28.5     255.255.255.255 UGH   0      0        0 eth123
    172.17.28.0     0.0.0.0         255.255.255.0   U     0      0        0 eth123
    ```


## Volume Mounting Management

### Function Description

In a common container, you can set the  **--volume**  parameter during container creation to mount directories or volumes of the host to the container for resource sharing. However, during container running, you cannot unmount directories or volumes that are mounted to the container, or mount directories or volumes of the host to the container. Only the system container can use the isulad-tools tool to dynamically mount directories or volumes of the host to the container and unmount directories or volumes from the container.

### Command Format

```
isulad-tools [COMMADN][OPTIONS] <container_id> [ARG...]
```

In the preceding format:

**COMMAND**: command related to route management.

**OPTIONS**: option supported by the route management command.

**container\_id**: container ID.

**ARG**: parameter corresponding to the command.

### API Description

**Table  1**    

<a name="en-us_topic_0182200849_table1869210387418"></a>
<table><thead align="left"><tr id="en-us_topic_0182200849_row1569373816419"><th class="cellrowborder" valign="top" width="16.150000000000002%" id="mcps1.2.5.1.1"><p id="en-us_topic_0182200849_p106936387415"><a name="en-us_topic_0182200849_p106936387415"></a><a name="en-us_topic_0182200849_p106936387415"></a><strong id="b84235270693550"><a name="b84235270693550"></a><a name="b84235270693550"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="25.77%" id="mcps1.2.5.1.2"><p id="en-us_topic_0182200849_p43193341215"><a name="en-us_topic_0182200849_p43193341215"></a><a name="en-us_topic_0182200849_p43193341215"></a>Function Description</p>
</th>
<th class="cellrowborder" valign="top" width="23.189999999999998%" id="mcps1.2.5.1.3"><p id="en-us_topic_0182200849_p11217215104712"><a name="en-us_topic_0182200849_p11217215104712"></a><a name="en-us_topic_0182200849_p11217215104712"></a>Option Description</p>
</th>
<th class="cellrowborder" valign="top" width="34.89%" id="mcps1.2.5.1.4"><p id="en-us_topic_0182200849_p15693173814112"><a name="en-us_topic_0182200849_p15693173814112"></a><a name="en-us_topic_0182200849_p15693173814112"></a>Parameter Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200849_row12693163810415"><td class="cellrowborder" valign="top" width="16.150000000000002%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0182200849_p14909923205818"><a name="en-us_topic_0182200849_p14909923205818"></a><a name="en-us_topic_0182200849_p14909923205818"></a>add-path</p>
</td>
<td class="cellrowborder" valign="top" width="25.77%" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0182200849_p01201939112820"><a name="en-us_topic_0182200849_p01201939112820"></a><a name="en-us_topic_0182200849_p01201939112820"></a>Adds files or directories on the host to a container.</p>
</td>
<td class="cellrowborder" valign="top" width="23.189999999999998%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0182200849_p1621713152471"><a name="en-us_topic_0182200849_p1621713152471"></a><a name="en-us_topic_0182200849_p1621713152471"></a>None</p>
</td>
<td class="cellrowborder" valign="top" width="34.89%" headers="mcps1.2.5.1.4 "><p id="en-us_topic_0182200849_p126791042135812"><a name="en-us_topic_0182200849_p126791042135812"></a><a name="en-us_topic_0182200849_p126791042135812"></a>The parameter format is as follows:</p>
<p id="en-us_topic_0182200849_p5200195110493"><a name="en-us_topic_0182200849_p5200195110493"></a><a name="en-us_topic_0182200849_p5200195110493"></a>hostpath:containerpath:permission  [hostpath:containerpath:permission ...]</p>
<p id="en-us_topic_0182200849_p48182532492"><a name="en-us_topic_0182200849_p48182532492"></a><a name="en-us_topic_0182200849_p48182532492"></a>In the preceding format:</p>
<p id="en-us_topic_0182200849_p155511013165316"><a name="en-us_topic_0182200849_p155511013165316"></a><a name="en-us_topic_0182200849_p155511013165316"></a><em id="i16965288439"><a name="i16965288439"></a><a name="i16965288439"></a>hostpath</em>: path on the host for storing a volume.</p>
<p id="en-us_topic_0182200849_p11101757155310"><a name="en-us_topic_0182200849_p11101757155310"></a><a name="en-us_topic_0182200849_p11101757155310"></a><em id="i2629143434317"><a name="i2629143434317"></a><a name="i2629143434317"></a>containerpath</em>: path on the container for storing a volume.</p>
<p id="en-us_topic_0182200849_p1918318113541"><a name="en-us_topic_0182200849_p1918318113541"></a><a name="en-us_topic_0182200849_p1918318113541"></a><em id="i2087903713437"><a name="i2087903713437"></a><a name="i2087903713437"></a>permission</em>: operation permission on a mount path within the container.</p>
</td>
</tr>
<tr id="en-us_topic_0182200849_row12634059013"><td class="cellrowborder" valign="top" width="16.150000000000002%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0182200849_p17486195414355"><a name="en-us_topic_0182200849_p17486195414355"></a><a name="en-us_topic_0182200849_p17486195414355"></a>remove-path</p>
</td>
<td class="cellrowborder" valign="top" width="25.77%" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0182200849_p859584810286"><a name="en-us_topic_0182200849_p859584810286"></a><a name="en-us_topic_0182200849_p859584810286"></a>Deletes directories or files from the container and restores them to the host.</p>
</td>
<td class="cellrowborder" valign="top" width="23.189999999999998%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0182200849_p11217181544713"><a name="en-us_topic_0182200849_p11217181544713"></a><a name="en-us_topic_0182200849_p11217181544713"></a>None</p>
</td>
<td class="cellrowborder" valign="top" width="34.89%" headers="mcps1.2.5.1.4 "><p id="en-us_topic_0182200849_p9642651372"><a name="en-us_topic_0182200849_p9642651372"></a><a name="en-us_topic_0182200849_p9642651372"></a>Parameter format: <em id="i125725315391"><a name="i125725315391"></a><a name="i125725315391"></a>hostpath</em><strong id="b14212611392"><a name="b14212611392"></a><a name="b14212611392"></a>:</strong><em id="i4374410203910"><a name="i4374410203910"></a><a name="i4374410203910"></a>containerpath</em><strong id="b1886121133919"><a name="b1886121133919"></a><a name="b1886121133919"></a>[</strong><em id="i970110210392"><a name="i970110210392"></a><a name="i970110210392"></a>hostpath</em><strong id="b12823152393910"><a name="b12823152393910"></a><a name="b12823152393910"></a>:</strong><em id="i9458152412397"><a name="i9458152412397"></a><a name="i9458152412397"></a>containerpath </em><strong id="b08241123123918"><a name="b08241123123918"></a><a name="b08241123123918"></a>]</strong></p>
<p id="en-us_topic_0182200849_p17293751135113"><a name="en-us_topic_0182200849_p17293751135113"></a><a name="en-us_topic_0182200849_p17293751135113"></a>In the preceding format:</p>
<p id="en-us_topic_0182200849_p192934514511"><a name="en-us_topic_0182200849_p192934514511"></a><a name="en-us_topic_0182200849_p192934514511"></a><em id="i16666183823313"><a name="i16666183823313"></a><a name="i16666183823313"></a>hostpath</em>: path on the host for storing a volume.</p>
<p id="en-us_topic_0182200849_p132932051165117"><a name="en-us_topic_0182200849_p132932051165117"></a><a name="en-us_topic_0182200849_p132932051165117"></a><em id="i19417134233318"><a name="i19417134233318"></a><a name="i19417134233318"></a>containerpath</em>: path on the container for storing a volume.</p>
</td>
</tr>
<tr id="en-us_topic_0182200849_row915811441301"><td class="cellrowborder" valign="top" width="16.150000000000002%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0182200849_p1703322145914"><a name="en-us_topic_0182200849_p1703322145914"></a><a name="en-us_topic_0182200849_p1703322145914"></a>list-path</p>
</td>
<td class="cellrowborder" valign="top" width="25.77%" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0182200849_p89515512813"><a name="en-us_topic_0182200849_p89515512813"></a><a name="en-us_topic_0182200849_p89515512813"></a>Lists all path directories in a container.</p>
</td>
<td class="cellrowborder" valign="top" width="23.189999999999998%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0182200849_p421751513476"><a name="en-us_topic_0182200849_p421751513476"></a><a name="en-us_topic_0182200849_p421751513476"></a>Supported options are as follows:</p>
<p id="en-us_topic_0182200849_p2073501695211"><a name="en-us_topic_0182200849_p2073501695211"></a><a name="en-us_topic_0182200849_p2073501695211"></a><strong id="b1284013419121"><a name="b1284013419121"></a><a name="b1284013419121"></a>--pretty</strong>: outputs data in JSON format.</p>
</td>
<td class="cellrowborder" valign="top" width="34.89%" headers="mcps1.2.5.1.4 "><p id="en-us_topic_0182200849_p1915580203514"><a name="en-us_topic_0182200849_p1915580203514"></a><a name="en-us_topic_0182200849_p1915580203514"></a>None</p>
</td>
</tr>
</tbody>
</table>

### Constraints

-   When running the  **add-path**  command, specify an absolute path as the mount path.
-   The mount point /.sharedpath is generated on the host after the mount path is specified by running the  **add-path**  command.
-   A maximum of 128 volumes can be added to a container.
-   Do not overwrite the root directory \(/\) in a container with the host directory by running the  **add-path**  command. Otherwise, the function is affected.

### Example

-   Start a system container, and set  **hook spec**  to the isulad hook execution script.

    ```
    [root@localhost ~]# isula run -tid --hook-spec /etc/isulad-tools/hookspec.json --system-container --external-rootfs /root/root-fs none init
    e45970a522d1ea0e9cfe382c2b868d92e7b6a55be1dd239947dda1ee55f3c7f7
    ```


-   Use isulad-tools to mount a directory on the host to a container, implementing resource sharing.

    ```
    [root@localhost ~]# isulad-tools add-path e45970a522d1 /home/test123:/home/test123
    Add path (/home/test123) to container(e45970a522d1,/home/test123) done.
    ```

-   Create a file in the  **/home/test123**  directory on the host and check whether the file can be accessed in the container.

    ```
    [root@localhost ~]# echo "hello world" > /home/test123/helloworld
    [root@localhost ~]# isula exec e45970a522d1 bash
    [root@localhost /]# cat /home/test123/helloworld
    hello world
    ```

-   Use isulad-tools to delete the mount directory from the container.

    ```
    [root@localhost ~]# isulad-tools remove-path e45970a522d1 /home/test123:/home/test123
    Remove path (/home/test123) from container(e45970a522d1,/home/test123) done
    [root@localhost ~]# isula exec e45970a522d1 bash
    [root@localhost /]# ls /home/test123/helloworld
    ls: cannot access '/home/test123/helloworld': No such file or directory
    ```


