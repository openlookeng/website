# Container Resource Management

- [Container Resource Management](#container-resource-management)
    - [Sharing Resources](#sharing-resources)
    - [Restricting CPU Resources of a Running Container](#restricting-cpu-resources-of-a-running-container)
    - [Restricting the Memory Usage of a Running Container](#restricting-the-memory-usage-of-a-running-container)
    - [Restricting I/O Resources of a Running Container](#restricting-i-o-resources-of-a-running-container)
    - [Restricting the Rootfs Storage Space of a Container](#restricting-the-rootfs-storage-space-of-a-container)
    - [Restricting the Number of File Handles in a Container](#restricting-the-number-of-file-handles-in-a-container)
    - [Restricting the Number of Processes or Threads that Can Be Created in a Container](#restricting-the-number-of-processes-or-threads-that-can-be-created-in-a-container)
    - [Configuring the ulimit Value in a Container](#configuring-the-ulimit-value-in-a-container)





## Sharing Resources

### Description

Containers or containers and hosts can share namespace information mutually, including PID, network, IPC, and UTS information.

### Usage

When running the  **isula create/run**  command, you can set the namespace parameters to share resources. For details, see the following parameter description table.

### Parameters

You can specify the following parameters when running the  **lcrc create/run**  command:


<table><thead align="left"><tr id="en-us_topic_0183293567_r461aacfe00054dd09da79ded3d0d5677"><th class="cellrowborder" valign="top" width="25.000000000000007%" id="mcps1.1.5.1.1"><p id="en-us_topic_0183293567_a4713c2757b4742f1bcfc60cf8f92362b"><a name="en-us_topic_0183293567_a4713c2757b4742f1bcfc60cf8f92362b"></a><a name="en-us_topic_0183293567_a4713c2757b4742f1bcfc60cf8f92362b"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="25.720000000000002%" id="mcps1.1.5.1.2"><p id="en-us_topic_0183293567_en-us_topic_0075721648_p349275174212"><a name="en-us_topic_0183293567_en-us_topic_0075721648_p349275174212"></a><a name="en-us_topic_0183293567_en-us_topic_0075721648_p349275174212"></a>Description</p>
</th>
<th class="cellrowborder" valign="top" width="27.990000000000002%" id="mcps1.1.5.1.3"><p id="en-us_topic_0183293567_a4d0aaa96c3b242aca9d2c22e494195f2"><a name="en-us_topic_0183293567_a4d0aaa96c3b242aca9d2c22e494195f2"></a><a name="en-us_topic_0183293567_a4d0aaa96c3b242aca9d2c22e494195f2"></a>Value Range</p>
</th>
<th class="cellrowborder" valign="top" width="21.290000000000003%" id="mcps1.1.5.1.4"><p id="en-us_topic_0183293567_a4cfdf0a8726d4fd08a52bb078988fc90"><a name="en-us_topic_0183293567_a4cfdf0a8726d4fd08a52bb078988fc90"></a><a name="en-us_topic_0183293567_a4cfdf0a8726d4fd08a52bb078988fc90"></a>Mandatory or Not</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0183293567_r771d05a684c4482b930111a484d0e970"><td class="cellrowborder" valign="top" width="25.000000000000007%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183293567_p15638101313244"><a name="en-us_topic_0183293567_p15638101313244"></a><a name="en-us_topic_0183293567_p15638101313244"></a>--pid</p>
</td>
<td class="cellrowborder" valign="top" width="25.720000000000002%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183293567_p121511444243"><a name="en-us_topic_0183293567_p121511444243"></a><a name="en-us_topic_0183293567_p121511444243"></a>Specifies the PID namespace to be shared.</p>
</td>
<td class="cellrowborder" valign="top" width="27.990000000000002%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183293567_p1363841312411"><a name="en-us_topic_0183293567_p1363841312411"></a><a name="en-us_topic_0183293567_p1363841312411"></a><strong id="en-us_topic_0183293567_b3190182517234"><a name="en-us_topic_0183293567_b3190182517234"></a><a name="en-us_topic_0183293567_b3190182517234"></a>[none, host, container:&lt;containerID&gt;]</strong>: <strong id="en-us_topic_0183293567_b1417915297233"><a name="en-us_topic_0183293567_b1417915297233"></a><a name="en-us_topic_0183293567_b1417915297233"></a>none</strong> indicates that the namespace is not shared. <strong id="en-us_topic_0183293567_b2520143452313"><a name="en-us_topic_0183293567_b2520143452313"></a><a name="en-us_topic_0183293567_b2520143452313"></a>host</strong> indicates that the namespace is shared with the host. <strong id="en-us_topic_0183293567_b183721947182315"><a name="en-us_topic_0183293567_b183721947182315"></a><a name="en-us_topic_0183293567_b183721947182315"></a>container:&lt;containerID&gt;</strong> indicates that the namespace is shared with the container.</p>
</td>
<td class="cellrowborder" valign="top" width="21.290000000000003%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183293567_p11638413142415"><a name="en-us_topic_0183293567_p11638413142415"></a><a name="en-us_topic_0183293567_p11638413142415"></a>No</p>
</td>
</tr>
<tr id="en-us_topic_0183293567_row477318296916"><td class="cellrowborder" valign="top" width="25.000000000000007%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183293567_p197743291392"><a name="en-us_topic_0183293567_p197743291392"></a><a name="en-us_topic_0183293567_p197743291392"></a>--net</p>
</td>
<td class="cellrowborder" valign="top" width="25.720000000000002%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183293567_p277462913917"><a name="en-us_topic_0183293567_p277462913917"></a><a name="en-us_topic_0183293567_p277462913917"></a>Specifies the network namespace to be shared.</p>
</td>
<td class="cellrowborder" valign="top" width="27.990000000000002%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183293567_p25177292378"><a name="en-us_topic_0183293567_p25177292378"></a><a name="en-us_topic_0183293567_p25177292378"></a><strong id="en-us_topic_0183293567_b1851212072414"><a name="en-us_topic_0183293567_b1851212072414"></a><a name="en-us_topic_0183293567_b1851212072414"></a>[none, host, container:&lt;containerID&gt;]</strong>: <strong id="en-us_topic_0183293567_b18342111142415"><a name="en-us_topic_0183293567_b18342111142415"></a><a name="en-us_topic_0183293567_b18342111142415"></a>none</strong> indicates that the namespace is not shared. <strong id="en-us_topic_0183293567_b1376831492413"><a name="en-us_topic_0183293567_b1376831492413"></a><a name="en-us_topic_0183293567_b1376831492413"></a>host</strong> indicates that the namespace is shared with the host. <strong id="en-us_topic_0183293567_b6402102212254"><a name="en-us_topic_0183293567_b6402102212254"></a><a name="en-us_topic_0183293567_b6402102212254"></a>container:&lt;containerID&gt;</strong> indicates that the namespace is shared with the container.</p>
</td>
<td class="cellrowborder" valign="top" width="21.290000000000003%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183293567_p6676175511118"><a name="en-us_topic_0183293567_p6676175511118"></a><a name="en-us_topic_0183293567_p6676175511118"></a>No</p>
</td>
</tr>
<tr id="en-us_topic_0183293567_row94589881017"><td class="cellrowborder" valign="top" width="25.000000000000007%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183293567_p1745812831010"><a name="en-us_topic_0183293567_p1745812831010"></a><a name="en-us_topic_0183293567_p1745812831010"></a>--ipc</p>
</td>
<td class="cellrowborder" valign="top" width="25.720000000000002%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183293567_p845814811108"><a name="en-us_topic_0183293567_p845814811108"></a><a name="en-us_topic_0183293567_p845814811108"></a>Specifies the IPC namespace to be shared.</p>
</td>
<td class="cellrowborder" valign="top" width="27.990000000000002%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183293567_p0403320379"><a name="en-us_topic_0183293567_p0403320379"></a><a name="en-us_topic_0183293567_p0403320379"></a><strong id="en-us_topic_0183293567_b1741915519259"><a name="en-us_topic_0183293567_b1741915519259"></a><a name="en-us_topic_0183293567_b1741915519259"></a>[none, host, container:&lt;containerID&gt;]</strong>: <strong id="en-us_topic_0183293567_b787115111265"><a name="en-us_topic_0183293567_b787115111265"></a><a name="en-us_topic_0183293567_b787115111265"></a>none</strong> indicates that the namespace is not shared. <strong id="en-us_topic_0183293567_b21612522615"><a name="en-us_topic_0183293567_b21612522615"></a><a name="en-us_topic_0183293567_b21612522615"></a>host</strong> indicates that the namespace is shared with the host. <strong id="en-us_topic_0183293567_b1822939132610"><a name="en-us_topic_0183293567_b1822939132610"></a><a name="en-us_topic_0183293567_b1822939132610"></a>container:&lt;containerID&gt;</strong> indicates that the namespace is shared with the container.</p>
</td>
<td class="cellrowborder" valign="top" width="21.290000000000003%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183293567_p752965651119"><a name="en-us_topic_0183293567_p752965651119"></a><a name="en-us_topic_0183293567_p752965651119"></a>No</p>
</td>
</tr>
<tr id="en-us_topic_0183293567_row88951155119"><td class="cellrowborder" valign="top" width="25.000000000000007%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183293567_p14896165515112"><a name="en-us_topic_0183293567_p14896165515112"></a><a name="en-us_topic_0183293567_p14896165515112"></a>--uts</p>
</td>
<td class="cellrowborder" valign="top" width="25.720000000000002%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183293567_p989618552018"><a name="en-us_topic_0183293567_p989618552018"></a><a name="en-us_topic_0183293567_p989618552018"></a>Specifies the UTS namespace to be shared.</p>
</td>
<td class="cellrowborder" valign="top" width="27.990000000000002%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183293567_p15643153493716"><a name="en-us_topic_0183293567_p15643153493716"></a><a name="en-us_topic_0183293567_p15643153493716"></a><strong id="en-us_topic_0183293567_b11756122632619"><a name="en-us_topic_0183293567_b11756122632619"></a><a name="en-us_topic_0183293567_b11756122632619"></a>[none, host, container:&lt;containerID&gt;]</strong>: <strong id="en-us_topic_0183293567_b1475702662610"><a name="en-us_topic_0183293567_b1475702662610"></a><a name="en-us_topic_0183293567_b1475702662610"></a>none</strong> indicates that the namespace is not shared. <strong id="en-us_topic_0183293567_b475762662618"><a name="en-us_topic_0183293567_b475762662618"></a><a name="en-us_topic_0183293567_b475762662618"></a>host</strong> indicates that the namespace is shared with the host. <strong id="en-us_topic_0183293567_b175812261265"><a name="en-us_topic_0183293567_b175812261265"></a><a name="en-us_topic_0183293567_b175812261265"></a>container:&lt;containerID&gt;</strong> indicates that the namespace is shared with the container.</p>
</td>
<td class="cellrowborder" valign="top" width="21.290000000000003%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183293567_p108966555117"><a name="en-us_topic_0183293567_p108966555117"></a><a name="en-us_topic_0183293567_p108966555117"></a>No</p>
</td>
</tr>
</tbody>
</table>

### Example

If two containers need to share the same PID namespace, add  **--pid container:<containerID\>**  when running the container. For example:

```
isula run -tid --name test_pid busybox sh
isula run -tid --name test --pid container:test_pid busybox sh
```

## Restricting CPU Resources of a Running Container

### Description

You can set parameters to restrict the CPU resources of a container.

### Usage

When running the  **isula create/run**  command, you can set CPU-related parameters to limit the CPU resources of a container. For details about the parameters and values, see the following table.

### Parameters

You can specify the following parameters when running the  **isula create/run**  command:

<a name="en-us_topic_0183293568_teea6792d7cdc4de6bbec22c6d34a8a56"></a>
<table><thead align="left"><tr id="en-us_topic_0183293568_r461aacfe00054dd09da79ded3d0d5677"><th class="cellrowborder" valign="top" width="25.000000000000007%" id="mcps1.1.5.1.1"><p id="en-us_topic_0183293568_a4713c2757b4742f1bcfc60cf8f92362b"><a name="en-us_topic_0183293568_a4713c2757b4742f1bcfc60cf8f92362b"></a><a name="en-us_topic_0183293568_a4713c2757b4742f1bcfc60cf8f92362b"></a><strong id="en-us_topic_0183293568_en-us_topic_0075721648_b576494217460"><a name="en-us_topic_0183293568_en-us_topic_0075721648_b576494217460"></a><a name="en-us_topic_0183293568_en-us_topic_0075721648_b576494217460"></a>Parameter</strong></p>
</th>
<th class="cellrowborder" valign="top" width="25.720000000000002%" id="mcps1.1.5.1.2"><p id="en-us_topic_0183293568_en-us_topic_0075721648_p349275174212"><a name="en-us_topic_0183293568_en-us_topic_0075721648_p349275174212"></a><a name="en-us_topic_0183293568_en-us_topic_0075721648_p349275174212"></a>Description</p>
</th>
<th class="cellrowborder" valign="top" width="27.990000000000002%" id="mcps1.1.5.1.3"><p id="en-us_topic_0183293568_a4d0aaa96c3b242aca9d2c22e494195f2"><a name="en-us_topic_0183293568_a4d0aaa96c3b242aca9d2c22e494195f2"></a><a name="en-us_topic_0183293568_a4d0aaa96c3b242aca9d2c22e494195f2"></a>Value Range</p>
</th>
<th class="cellrowborder" valign="top" width="21.290000000000003%" id="mcps1.1.5.1.4"><p id="en-us_topic_0183293568_a4cfdf0a8726d4fd08a52bb078988fc90"><a name="en-us_topic_0183293568_a4cfdf0a8726d4fd08a52bb078988fc90"></a><a name="en-us_topic_0183293568_a4cfdf0a8726d4fd08a52bb078988fc90"></a>Mandatory or Not</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0183293568_r771d05a684c4482b930111a484d0e970"><td class="cellrowborder" valign="top" width="25.000000000000007%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183293568_p15638101313244"><a name="en-us_topic_0183293568_p15638101313244"></a><a name="en-us_topic_0183293568_p15638101313244"></a>--cpu-period</p>
</td>
<td class="cellrowborder" valign="top" width="25.720000000000002%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183293568_p121511444243"><a name="en-us_topic_0183293568_p121511444243"></a><a name="en-us_topic_0183293568_p121511444243"></a>Limits the CPU CFS period in a container.</p>
</td>
<td class="cellrowborder" valign="top" width="27.990000000000002%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183293568_p1363841312411"><a name="en-us_topic_0183293568_p1363841312411"></a><a name="en-us_topic_0183293568_p1363841312411"></a>64-bit integer</p>
</td>
<td class="cellrowborder" valign="top" width="21.290000000000003%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183293568_p11638413142415"><a name="en-us_topic_0183293568_p11638413142415"></a><a name="en-us_topic_0183293568_p11638413142415"></a>No</p>
</td>
</tr>
<tr id="en-us_topic_0183293568_row477318296916"><td class="cellrowborder" valign="top" width="25.000000000000007%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183293568_p197743291392"><a name="en-us_topic_0183293568_p197743291392"></a><a name="en-us_topic_0183293568_p197743291392"></a>--cpu-quota</p>
</td>
<td class="cellrowborder" valign="top" width="25.720000000000002%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183293568_p277462913917"><a name="en-us_topic_0183293568_p277462913917"></a><a name="en-us_topic_0183293568_p277462913917"></a>Limits the CPU CFS quota.</p>
</td>
<td class="cellrowborder" valign="top" width="27.990000000000002%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183293568_p4676155501111"><a name="en-us_topic_0183293568_p4676155501111"></a><a name="en-us_topic_0183293568_p4676155501111"></a>64-bit integer</p>
</td>
<td class="cellrowborder" valign="top" width="21.290000000000003%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183293568_p6676175511118"><a name="en-us_topic_0183293568_p6676175511118"></a><a name="en-us_topic_0183293568_p6676175511118"></a>No</p>
</td>
</tr>
<tr id="en-us_topic_0183293568_row94589881017"><td class="cellrowborder" valign="top" width="25.000000000000007%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183293568_p1745812831010"><a name="en-us_topic_0183293568_p1745812831010"></a><a name="en-us_topic_0183293568_p1745812831010"></a>--cpu-shares</p>
</td>
<td class="cellrowborder" valign="top" width="25.720000000000002%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183293568_p845814811108"><a name="en-us_topic_0183293568_p845814811108"></a><a name="en-us_topic_0183293568_p845814811108"></a>Limits the CPU share (relative weight).</p>
</td>
<td class="cellrowborder" valign="top" width="27.990000000000002%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183293568_p125294568114"><a name="en-us_topic_0183293568_p125294568114"></a><a name="en-us_topic_0183293568_p125294568114"></a>64-bit integer</p>
</td>
<td class="cellrowborder" valign="top" width="21.290000000000003%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183293568_p752965651119"><a name="en-us_topic_0183293568_p752965651119"></a><a name="en-us_topic_0183293568_p752965651119"></a>No</p>
</td>
</tr>
<tr id="en-us_topic_0183293568_row491412141020"><td class="cellrowborder" valign="top" width="25.000000000000007%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183293568_p4914218105"><a name="en-us_topic_0183293568_p4914218105"></a><a name="en-us_topic_0183293568_p4914218105"></a>--cpuset-cpus</p>
</td>
<td class="cellrowborder" valign="top" width="25.720000000000002%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183293568_p1691451161015"><a name="en-us_topic_0183293568_p1691451161015"></a><a name="en-us_topic_0183293568_p1691451161015"></a>Limits the CPU nodes.</p>
</td>
<td class="cellrowborder" valign="top" width="27.990000000000002%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183293568_p2047135781116"><a name="en-us_topic_0183293568_p2047135781116"></a><a name="en-us_topic_0183293568_p2047135781116"></a>A character string. The value is the number of CPUs to be configured. The value ranges from 0 to 3, or 0 and 1.</p>
</td>
<td class="cellrowborder" valign="top" width="21.290000000000003%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183293568_p4471125741113"><a name="en-us_topic_0183293568_p4471125741113"></a><a name="en-us_topic_0183293568_p4471125741113"></a>No</p>
</td>
</tr>
<tr id="en-us_topic_0183293568_row88951155119"><td class="cellrowborder" valign="top" width="25.000000000000007%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183293568_p14896165515112"><a name="en-us_topic_0183293568_p14896165515112"></a><a name="en-us_topic_0183293568_p14896165515112"></a>--cpuset-mems</p>
</td>
<td class="cellrowborder" valign="top" width="25.720000000000002%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183293568_p989618552018"><a name="en-us_topic_0183293568_p989618552018"></a><a name="en-us_topic_0183293568_p989618552018"></a>Limits the memory nodes used by cpuset in the container.</p>
</td>
<td class="cellrowborder" valign="top" width="27.990000000000002%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183293568_p1896145515110"><a name="en-us_topic_0183293568_p1896145515110"></a><a name="en-us_topic_0183293568_p1896145515110"></a>A character string. The value is the number of CPUs to be configured. The value ranges from 0 to 3, or 0 and 1.</p>
</td>
<td class="cellrowborder" valign="top" width="21.290000000000003%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183293568_p108966555117"><a name="en-us_topic_0183293568_p108966555117"></a><a name="en-us_topic_0183293568_p108966555117"></a>No</p>
</td>
</tr>
</tbody>
</table>

### Example

To restrict a container to use a specific CPU, add  **--cpuset-cpus number**  when running the container. For example:

```
isula run -tid --cpuset-cpus 0,2-3 busybox sh
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>You can check whether the configuration is successful. For details, see "Querying Information About a Single Container."  

## Restricting the Memory Usage of a Running Container

### Description

You can set parameters to restrict the memory usage of a container.

### Usage

When running the  **isula create/run**  command, you can set memory-related parameters to restrict memory usage of containers. For details about the parameters and values, see the following table.

### Parameters

You can specify the following parameters when running the  **isula create/run**  command:

<a name="en-us_topic_0183293569_teea6792d7cdc4de6bbec22c6d34a8a56"></a>
<table><thead align="left"><tr id="en-us_topic_0183293569_r461aacfe00054dd09da79ded3d0d5677"><th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.1"><p id="en-us_topic_0183293569_a4713c2757b4742f1bcfc60cf8f92362b"><a name="en-us_topic_0183293569_a4713c2757b4742f1bcfc60cf8f92362b"></a><a name="en-us_topic_0183293569_a4713c2757b4742f1bcfc60cf8f92362b"></a><strong id="en-us_topic_0183293569_en-us_topic_0075721648_b576494217460"><a name="en-us_topic_0183293569_en-us_topic_0075721648_b576494217460"></a><a name="en-us_topic_0183293569_en-us_topic_0075721648_b576494217460"></a>Parameter</strong></p>
</th>
<th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.2"><p id="en-us_topic_0183293569_en-us_topic_0075721648_p349275174212"><a name="en-us_topic_0183293569_en-us_topic_0075721648_p349275174212"></a><a name="en-us_topic_0183293569_en-us_topic_0075721648_p349275174212"></a><strong id="en-us_topic_0183293569_ac040c826773e4b99805cc38e76ea34ab"><a name="en-us_topic_0183293569_ac040c826773e4b99805cc38e76ea34ab"></a><a name="en-us_topic_0183293569_ac040c826773e4b99805cc38e76ea34ab"></a>Description</strong></p>
</th>
<th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.3"><p id="en-us_topic_0183293569_a4d0aaa96c3b242aca9d2c22e494195f2"><a name="en-us_topic_0183293569_a4d0aaa96c3b242aca9d2c22e494195f2"></a><a name="en-us_topic_0183293569_a4d0aaa96c3b242aca9d2c22e494195f2"></a>Value Range</p>
</th>
<th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.4"><p id="en-us_topic_0183293569_a4cfdf0a8726d4fd08a52bb078988fc90"><a name="en-us_topic_0183293569_a4cfdf0a8726d4fd08a52bb078988fc90"></a><a name="en-us_topic_0183293569_a4cfdf0a8726d4fd08a52bb078988fc90"></a>Mandatory or Not</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0183293569_r771d05a684c4482b930111a484d0e970"><td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183293569_p15638101313244"><a name="en-us_topic_0183293569_p15638101313244"></a><a name="en-us_topic_0183293569_p15638101313244"></a>--memory</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183293569_p121511444243"><a name="en-us_topic_0183293569_p121511444243"></a><a name="en-us_topic_0183293569_p121511444243"></a>Specifies the upper limit of the memory usage of a container.</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183293569_p1363841312411"><a name="en-us_topic_0183293569_p1363841312411"></a><a name="en-us_topic_0183293569_p1363841312411"></a>64-bit integer The value is a non-negative number. The value <strong id="en-us_topic_0183293569_b1981313716401"><a name="en-us_topic_0183293569_b1981313716401"></a><a name="en-us_topic_0183293569_b1981313716401"></a>0</strong> indicates that no limit is set. The unit can be empty (byte), KB, MB, GB, TB, or PB.</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183293569_p11638413142415"><a name="en-us_topic_0183293569_p11638413142415"></a><a name="en-us_topic_0183293569_p11638413142415"></a>No</p>
</td>
</tr>
<tr id="en-us_topic_0183293569_row477318296916"><td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183293569_p197743291392"><a name="en-us_topic_0183293569_p197743291392"></a><a name="en-us_topic_0183293569_p197743291392"></a>--memory-reservation</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183293569_p277462913917"><a name="en-us_topic_0183293569_p277462913917"></a><a name="en-us_topic_0183293569_p277462913917"></a>Specifies the soft upper limit of the memory of a container.</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183293569_p4676155501111"><a name="en-us_topic_0183293569_p4676155501111"></a><a name="en-us_topic_0183293569_p4676155501111"></a>64-bit integer The value is a non-negative number. The value <strong id="en-us_topic_0183293569_b751018915402"><a name="en-us_topic_0183293569_b751018915402"></a><a name="en-us_topic_0183293569_b751018915402"></a>0</strong> indicates that no limit is set. The unit can be empty (byte), KB, MB, GB, TB, or PB.</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183293569_p6676175511118"><a name="en-us_topic_0183293569_p6676175511118"></a><a name="en-us_topic_0183293569_p6676175511118"></a>No</p>
</td>
</tr>
<tr id="en-us_topic_0183293569_row94589881017"><td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183293569_p1745812831010"><a name="en-us_topic_0183293569_p1745812831010"></a><a name="en-us_topic_0183293569_p1745812831010"></a>--memory-swap</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183293569_p845814811108"><a name="en-us_topic_0183293569_p845814811108"></a><a name="en-us_topic_0183293569_p845814811108"></a>Specifies the upper limit of the swap memory of the container.</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183293569_p125294568114"><a name="en-us_topic_0183293569_p125294568114"></a><a name="en-us_topic_0183293569_p125294568114"></a>64-bit integer The value can be <strong id="en-us_topic_0183293569_b18556113518407"><a name="en-us_topic_0183293569_b18556113518407"></a><a name="en-us_topic_0183293569_b18556113518407"></a>-1</strong> or a non-negative number. The value <strong id="en-us_topic_0183293569_b1698283918405"><a name="en-us_topic_0183293569_b1698283918405"></a><a name="en-us_topic_0183293569_b1698283918405"></a>-1</strong> indicates no limit, and the value <strong id="en-us_topic_0183293569_b36062437404"><a name="en-us_topic_0183293569_b36062437404"></a><a name="en-us_topic_0183293569_b36062437404"></a>0</strong> indicates that no limit is set. The unit can be empty (byte), KB, MB, GB, TB, or PB.</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183293569_p752965651119"><a name="en-us_topic_0183293569_p752965651119"></a><a name="en-us_topic_0183293569_p752965651119"></a>No</p>
</td>
</tr>
<tr id="en-us_topic_0183293569_row491412141020"><td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183293569_p4914218105"><a name="en-us_topic_0183293569_p4914218105"></a><a name="en-us_topic_0183293569_p4914218105"></a>--kernel-memory</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183293569_p1691451161015"><a name="en-us_topic_0183293569_p1691451161015"></a><a name="en-us_topic_0183293569_p1691451161015"></a>Specifies the upper limit of the kernel memory of the container.</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183293569_p2047135781116"><a name="en-us_topic_0183293569_p2047135781116"></a><a name="en-us_topic_0183293569_p2047135781116"></a>64-bit integer The value is a non-negative number. The value <strong id="en-us_topic_0183293569_b641211974115"><a name="en-us_topic_0183293569_b641211974115"></a><a name="en-us_topic_0183293569_b641211974115"></a>0</strong> indicates that no limit is set. The unit can be empty (byte), KB, MB, GB, TB, or PB.</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183293569_p4471125741113"><a name="en-us_topic_0183293569_p4471125741113"></a><a name="en-us_topic_0183293569_p4471125741113"></a>No</p>
</td>
</tr>
</tbody>
</table>

### Example

To set the upper limit of the memory of a container, add  **--memory <number\>\[<unit\>\]**  when running the container. For example:

```
isula run -tid --memory 1G busybox sh
```

## Restricting I/O Resources of a Running Container

### Description

You can set parameters to limit the read/write speed of devices in the container.

### Usage

When running the  **isula create/run**  command, you can set  **--device-read-bps/--device-write-bps <device-path\>:<number\>\[<unit\>\]**  to limit the read/write speed of devices in the container.

### Parameters

When running the  **isula create/run**  command, set  **--device-read/write-bps**.

<a name="en-us_topic_0183293570_teea6792d7cdc4de6bbec22c6d34a8a56"></a>
<table><thead align="left"><tr id="en-us_topic_0183293570_r461aacfe00054dd09da79ded3d0d5677"><th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.1"><p id="en-us_topic_0183293570_a4713c2757b4742f1bcfc60cf8f92362b"><a name="en-us_topic_0183293570_a4713c2757b4742f1bcfc60cf8f92362b"></a><a name="en-us_topic_0183293570_a4713c2757b4742f1bcfc60cf8f92362b"></a><strong id="en-us_topic_0183293570_en-us_topic_0075721648_b576494217460"><a name="en-us_topic_0183293570_en-us_topic_0075721648_b576494217460"></a><a name="en-us_topic_0183293570_en-us_topic_0075721648_b576494217460"></a>Parameter</strong></p>
</th>
<th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.2"><p id="en-us_topic_0183293570_en-us_topic_0075721648_p349275174212"><a name="en-us_topic_0183293570_en-us_topic_0075721648_p349275174212"></a><a name="en-us_topic_0183293570_en-us_topic_0075721648_p349275174212"></a>Description</p>
</th>
<th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.3"><p id="en-us_topic_0183293570_a4d0aaa96c3b242aca9d2c22e494195f2"><a name="en-us_topic_0183293570_a4d0aaa96c3b242aca9d2c22e494195f2"></a><a name="en-us_topic_0183293570_a4d0aaa96c3b242aca9d2c22e494195f2"></a>Value Range</p>
</th>
<th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.4"><p id="en-us_topic_0183293570_a4cfdf0a8726d4fd08a52bb078988fc90"><a name="en-us_topic_0183293570_a4cfdf0a8726d4fd08a52bb078988fc90"></a><a name="en-us_topic_0183293570_a4cfdf0a8726d4fd08a52bb078988fc90"></a>Mandatory or Not</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0183293570_r771d05a684c4482b930111a484d0e970"><td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183293570_p15638101313244"><a name="en-us_topic_0183293570_p15638101313244"></a><a name="en-us_topic_0183293570_p15638101313244"></a>--device-read-bps/--device-write-bps</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183293570_p121511444243"><a name="en-us_topic_0183293570_p121511444243"></a><a name="en-us_topic_0183293570_p121511444243"></a>Limits the read/write speed of devices in the container.</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183293570_p1363841312411"><a name="en-us_topic_0183293570_p1363841312411"></a><a name="en-us_topic_0183293570_p1363841312411"></a>64-bit integer The value is a positive integer. The value can be 0, indicating that no limit is set. The unit can be empty (byte), KB, MB, GB, TB, or PB.</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183293570_p11638413142415"><a name="en-us_topic_0183293570_p11638413142415"></a><a name="en-us_topic_0183293570_p11638413142415"></a>No</p>
</td>
</tr>
</tbody>
</table>

### Example

To limit the read/write speed of devices in the container, add  **--device-write-bps/--device-read-bps <device-path\>:<number\>\[<unit\>\]**  when running the container. For example, to limit the read speed of the device  **/dev/sda**  in the container  **busybox**  to 1 Mbit/s, run the following command:

```
isula run -tid --device-write /dev/sda:1mb busybox sh
```

To limit the write speed, run the following command:

```
isula run -tid read-bps /dev/sda:1mb busybox sh
```

## Restricting the Rootfs Storage Space of a Container

### Description

When the overlay2 storage driver is used on the EXT4 file system, the file system quota of a single container can be set. For example, the quota of container A is set to 5 GB, and the quota of container B is set to 10 GB.

This feature is implemented by the project quota function of the EXT4 file system. If the kernel supports this function, use the syscall SYS\_IOCTL to set the project ID of a directory, and then use the syscall SYS\_QUOTACTL to set the hard limit and soft limit of the corresponding project ID.

### Usage

1.  Prepare the environment.

    Ensure that the file system supports the  **Project ID**  and  **Project Quota**  attributes, the kernel version is 4.19 or later, and the version of the peripheral package e2fsprogs is 1.43.4-2 or later.

2.  Before mounting overlayfs to a container, set different project IDs for the upper and work directories of different containers and set inheritance options. After overlayfs is mounted to a container, the project IDs and inherited attributes cannot be modified.
3.  Set the quota as a privileged user outside the container.
4.  Add the following configuration to daemon:

    ```
    -s overlay2 --storage-opt overlay2.override_kernel_check=true
    ```

5.  Daemon supports the following options for setting default restrictions for containers:

    **--storage-opt overlay2.basesize=128M**  specifies the default limit. If  **--storeage-opt size**  is also specified when you run the  **isula run**  command, the value of this parameter takes effect. If no size is specified during the daemon process or when you run the  **isula run**  command, the size is not limited.

6.  Enable the  **Project ID**  and  **Project Quota**  attributes of the file system.
    -   Format and mount the file system.

        ```
        # mkfs.ext4 -O quota,project /dev/sdb
        # mount -o prjquota /dev/sdb /var/lib/isulad
        ```



### Parameters

When running the  **create/run**  command, set  **--storage-opt**.

<a name="en-us_topic_0183293571_table72131712411"></a>
<table><thead align="left"><tr id="en-us_topic_0183293571_row1526710754110"><th class="cellrowborder" valign="top" width="25.507449255074494%" id="mcps1.1.5.1.1"><p id="en-us_topic_0183293571_p2026715774113"><a name="en-us_topic_0183293571_p2026715774113"></a><a name="en-us_topic_0183293571_p2026715774113"></a><strong id="en-us_topic_0183293571_b142676713417"><a name="en-us_topic_0183293571_b142676713417"></a><a name="en-us_topic_0183293571_b142676713417"></a>Parameter</strong></p>
</th>
<th class="cellrowborder" valign="top" width="17.348265173482652%" id="mcps1.1.5.1.2"><p id="en-us_topic_0183293571_p192671473419"><a name="en-us_topic_0183293571_p192671473419"></a><a name="en-us_topic_0183293571_p192671473419"></a><strong id="en-us_topic_0183293571_b72671679414"><a name="en-us_topic_0183293571_b72671679414"></a><a name="en-us_topic_0183293571_b72671679414"></a>Description</strong></p>
</th>
<th class="cellrowborder" valign="top" width="39.796020397960206%" id="mcps1.1.5.1.3"><p id="en-us_topic_0183293571_p1126757144114"><a name="en-us_topic_0183293571_p1126757144114"></a><a name="en-us_topic_0183293571_p1126757144114"></a><strong id="b136446498171"><a name="b136446498171"></a><a name="b136446498171"></a>Value Range</strong></p>
</th>
<th class="cellrowborder" valign="top" width="17.348265173482652%" id="mcps1.1.5.1.4"><p id="en-us_topic_0183293571_p1267127154116"><a name="en-us_topic_0183293571_p1267127154116"></a><a name="en-us_topic_0183293571_p1267127154116"></a>Mandatory or Not</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0183293571_row72679724111"><td class="cellrowborder" valign="top" width="25.507449255074494%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183293571_p82681679412"><a name="en-us_topic_0183293571_p82681679412"></a><a name="en-us_topic_0183293571_p82681679412"></a>--storage-opt size=${rootfsSize}</p>
</td>
<td class="cellrowborder" valign="top" width="17.348265173482652%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183293571_p13268197164114"><a name="en-us_topic_0183293571_p13268197164114"></a><a name="en-us_topic_0183293571_p13268197164114"></a>Restricts the root file system (rootfs) storage space of the container.</p>
</td>
<td class="cellrowborder" valign="top" width="39.796020397960206%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183293571_p426810715413"><a name="en-us_topic_0183293571_p426810715413"></a><a name="en-us_topic_0183293571_p426810715413"></a>The size parsed by <strong id="b93695103262"><a name="b93695103262"></a><a name="b93695103262"></a>rootfsSize</strong> is a positive 64-bit integer expressed in bytes. You can also set it to <strong id="b7370151015261"><a name="b7370151015261"></a><a name="b7370151015261"></a>([kKmMgGtTpP])?[iI]?[bB]?$</strong>.</p>
</td>
<td class="cellrowborder" valign="top" width="17.348265173482652%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183293571_p142683715417"><a name="en-us_topic_0183293571_p142683715417"></a><a name="en-us_topic_0183293571_p142683715417"></a>No</p>
</td>
</tr>
</tbody>
</table>

### Example

In the  **isula run/create**  command, use the existing parameter  **--storage-opt size=**_value_  to set the quota. The value is a positive number in the unit of  **\[kKmMgGtTpP\]?\[iI\]?\[bB\]?**. If the value does not contain a unit, the default unit is byte.

```
$ [root@localhost ~]# isula run -ti --storage-opt size=10M busybox
/ # df -h
Filesystem                Size      Used Available Use% Mounted on
overlay                  10.0M     48.0K     10.0M   0% /
none                     64.0M         0     64.0M   0% /dev
none                     10.0M         0     10.0M   0% /sys/fs/cgroup
tmpfs                    64.0M         0     64.0M   0% /dev
shm                      64.0M         0     64.0M   0% /dev/shm
/dev/mapper/vg--data-ext41
                          9.8G     51.5M      9.2G   1% /etc/hostname
/dev/mapper/vg--data-ext41
                          9.8G     51.5M      9.2G   1% /etc/resolv.conf
/dev/mapper/vg--data-ext41
                          9.8G     51.5M      9.2G   1% /etc/hosts
tmpfs                     3.9G         0      3.9G   0% /proc/acpi
tmpfs                    64.0M         0     64.0M   0% /proc/kcore
tmpfs                    64.0M         0     64.0M   0% /proc/keys
tmpfs                    64.0M         0     64.0M   0% /proc/timer_list
tmpfs                    64.0M         0     64.0M   0% /proc/sched_debug
tmpfs                     3.9G         0      3.9G   0% /proc/scsi
tmpfs                    64.0M         0     64.0M   0% /proc/fdthreshold
tmpfs                    64.0M         0     64.0M   0% /proc/fdenable
tmpfs                     3.9G         0      3.9G   0% /sys/firmware
/ # 
/ # dd if=/dev/zero of=/home/img bs=1M count=12 && sync
dm-4: write failed, project block limit reached.
10+0 records in
9+0 records out
10432512 bytes (9.9MB) copied, 0.011782 seconds, 844.4MB/s
/ # df -h | grep overlay
overlay                  10.0M     10.0M         0 100% /
/ # 
```

### Constraints

1.  The quota applies only to the rw layer.

    The quota of overlay2 is for the rw layer of the container. The image size is not included.

2.  The kernel supports and enables this function.

    The kernel must support the EXT4 project quota function. When running  **mkfs**, add  **-O quota,project**. When mounting the file system, add  **-o prjquota**. If any of the preceding conditions is not met, an error is reported when  **--storage-opt size=**_value_  is used.

    ```
    $ [root@localhost ~]# isula run -it --storage-opt size=10Mb busybox df -h
    Error response from daemon: Failed to prepare rootfs with error: time="2019-04-09T05:13:52-04:00" level=fatal msg="error creating read-
    write layer with ID "a4c0e55e82c55e4ee4b0f4ee07f80cc2261cf31b2c2dfd628fa1fb00db97270f": --storage-opt is supported only for overlay over
    xfs or ext4 with 'pquota' mount option"
    ```

3.  Description of the limit of quota:
    1.  If the quota is greater than the size of the partition where user  **root**  of iSulad is located, the file system quota displayed by running the  **df**  command in the container is the size of the partition where user  **root**  of iSulad is located, not the specified quota.
    2.  **--storage-opt size=0**  indicates that the size is not limited and the value cannot be less than 4096. The precision of size is one byte. If the specified precision contains decimal bytes, the decimal part is ignored. For example, if size is set to  **0.1**, the size is not limited. \(The value is restricted by the precision of the floating point number stored on the computer. That is, 0.999999999999999999999999999 is equal to 1. The number of digits 9 may vary according to computers. Therefore, 4095.999999999999999999999999999 is equal to 4096.\) Note that running  **isula inspect**  displays the original command line specified format. If the value contains decimal bytes, you need to ignore the decimal part.
    3.  If the quota is too small, for example,** --storage-opt size=4k**, the container may fail to be started because some files need to be created for starting the container.
    4.  The  **-o prjquota**  option is added to the root partition of iSulad when iSulad is started last time. If this option is not added during this startup, the setting of the container with quota created during the last startup does not take effect.
    5.  The value range of the daemon quota  **--storage-opt overlay2.basesize**  is the same as that of  **--storage-opt size**.

4.  When  **storage-opt**  is set to 4 KB, the lightweight container startup is different from that of Docker.

    Use the  **storage-opt size=4k**  and image  **rnd-dockerhub.huawei.com/official/ubuntu-arm64:latest**  to run the container.

    Docker fails to be started.

    ```
    [root@localhost ~]# docker run -itd --storage-opt size=4k rnd-dockerhub.huawei.com/official/ubuntu-arm64:latest
    docker: Error response from daemon: symlink /proc/mounts /var/lib/docker/overlay2/e6e12701db1a488636c881b44109a807e187b8db51a50015db34a131294fcf70-init/merged/etc/mtab: disk quota exceeded.
    See 'docker run --help'.
    ```

    The lightweight container is started properly and no error is reported.

    ```
    [root@localhost ~]# isula run -itd --storage-opt size=4k rnd-dockerhub.huawei.com/official/ubuntu-arm64:latest
    636480b1fc2cf8ac895f46e77d86439fe2b359a1ff78486ae81c18d089bbd728
    [root@localhost ~]# isula ps
    STATUS  PID   IMAGE                                                 COMMAND   EXIT_CODE RESTART_COUNT STARTAT       FINISHAT RUNTIME ID           NAMES                                                            
    running 17609 rnd-dockerhub.huawei.com/official/ubuntu-arm64:latest /bin/bash 0         0             2 seconds ago -        lcr     636480b1fc2c 636480b1fc2cf8ac895f46e77d86439fe2b359a1ff78486ae81c18d089bbd728 
    ```

    During container startup, if you need to create a file in the  **rootfs**  directory of the container, the image size exceeds 4 KB, and the quota is set to 4 KB, the file creation will fail.

    When Docker starts the container, it creates more mount points than iSulad to mount some directories on the host to the container, such as  **/proc/mounts**  and  **/dev/shm**. If these files do not exist in the image, the creation will fail, therefore, the container fails to be started.

    When a lightweight container uses the default configuration during container startup, there are few mount points. The lightweight container is created only when the directory like  **/proc**  or  **/sys**  does not exist. The image  **rnd-dockerhub.huawei.com/official/ubuntu-arm64:latest**  in the test case contains  **/proc**  and  **/sys**. Therefore, no new file or directory is generated during the container startup. As a result, no error is reported during the lightweight container startup. To verify this process, when the image is replaced with  **rnd-dockerhub.huawei.com/official/busybox-aarch64:latest**, an error is reported when the lightweight container is started because  **/proc**  does not exist in the image.

    ```
    [root@localhost ~]# isula run -itd --storage-opt size=4k rnd-dockerhub.huawei.com/official/busybox-aarch64:latest
    8e893ab483310350b8caa3b29eca7cd3c94eae55b48bfc82b350b30b17a0aaf4
    Error response from daemon: Start container error: runtime error: 8e893ab483310350b8caa3b29eca7cd3c94eae55b48bfc82b350b30b17a0aaf4:tools/lxc_start.c:main:404 starting container process caused "Failed to setup lxc,
    please check the config file."
    ```

5.  Other description:

    When using iSulad with the quota function to switch data disks, ensure that the data disks to be switched are mounted using the  **prjquota**  option and the mounting mode of the  **/var/lib/isulad/storage/overlay2**  directory is the same as that of the  **/var/lib/isulad**  directory.

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >Before switching the data disk, ensure that the mount point of  **/var/lib/isulad/storage/overlay2**  is unmounted.  


## Restricting the Number of File Handles in a Container

### Description

You can set parameters to limit the number of file handles that can be opened in a container.

### Usage

When running the  **isula create/run**  command, set the  **--files-limit**  parameter to limit the number of file handles that can be opened in a container.

### Parameters

Set the  **--files-limit**  parameter when running the  **isula create/run**  command.

<a name="en-us_topic_0183293572_teea6792d7cdc4de6bbec22c6d34a8a56"></a>
<table><thead align="left"><tr id="en-us_topic_0183293572_r461aacfe00054dd09da79ded3d0d5677"><th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.1"><p id="en-us_topic_0183293572_a4713c2757b4742f1bcfc60cf8f92362b"><a name="en-us_topic_0183293572_a4713c2757b4742f1bcfc60cf8f92362b"></a><a name="en-us_topic_0183293572_a4713c2757b4742f1bcfc60cf8f92362b"></a><strong id="en-us_topic_0183293572_en-us_topic_0075721648_b576494217460"><a name="en-us_topic_0183293572_en-us_topic_0075721648_b576494217460"></a><a name="en-us_topic_0183293572_en-us_topic_0075721648_b576494217460"></a>Parameter</strong></p>
</th>
<th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.2"><p id="en-us_topic_0183293572_en-us_topic_0075721648_p349275174212"><a name="en-us_topic_0183293572_en-us_topic_0075721648_p349275174212"></a><a name="en-us_topic_0183293572_en-us_topic_0075721648_p349275174212"></a><strong id="en-us_topic_0183293572_ac040c826773e4b99805cc38e76ea34ab"><a name="en-us_topic_0183293572_ac040c826773e4b99805cc38e76ea34ab"></a><a name="en-us_topic_0183293572_ac040c826773e4b99805cc38e76ea34ab"></a>Description</strong></p>
</th>
<th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.3"><p id="en-us_topic_0183293572_a4d0aaa96c3b242aca9d2c22e494195f2"><a name="en-us_topic_0183293572_a4d0aaa96c3b242aca9d2c22e494195f2"></a><a name="en-us_topic_0183293572_a4d0aaa96c3b242aca9d2c22e494195f2"></a>Value Range</p>
</th>
<th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.4"><p id="en-us_topic_0183293572_a4cfdf0a8726d4fd08a52bb078988fc90"><a name="en-us_topic_0183293572_a4cfdf0a8726d4fd08a52bb078988fc90"></a><a name="en-us_topic_0183293572_a4cfdf0a8726d4fd08a52bb078988fc90"></a>Mandatory or Not</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0183293572_r771d05a684c4482b930111a484d0e970"><td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183293572_a668c80e436084fa48ad0a3aa56d627b9"><a name="en-us_topic_0183293572_a668c80e436084fa48ad0a3aa56d627b9"></a><a name="en-us_topic_0183293572_a668c80e436084fa48ad0a3aa56d627b9"></a>--files-limit</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183293572_ac71045ed552b48d6bcb54a96bc27f690"><a name="en-us_topic_0183293572_ac71045ed552b48d6bcb54a96bc27f690"></a><a name="en-us_topic_0183293572_ac71045ed552b48d6bcb54a96bc27f690"></a>Limits the number of file handles that can be opened in a container.</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183293572_aabdc1cfa9ac94f6dafcab0ff0400c2e7"><a name="en-us_topic_0183293572_aabdc1cfa9ac94f6dafcab0ff0400c2e7"></a><a name="en-us_topic_0183293572_aabdc1cfa9ac94f6dafcab0ff0400c2e7"></a>64-bit integer The value can be 0 or a negative number, but cannot be greater than 2 to the power of 63 minus 1. The value 0 or a negative number indicates no limit.</p>
<p id="en-us_topic_0183293572_a4e618a1fe09a48509e48acbb4da0635f"><a name="en-us_topic_0183293572_a4e618a1fe09a48509e48acbb4da0635f"></a><a name="en-us_topic_0183293572_a4e618a1fe09a48509e48acbb4da0635f"></a>During container creation, some handles are opened temporarily. Therefore, the value cannot be too small. Otherwise, the container may not be restricted by the file limit. If the value is less than the number of opened handles, the cgroup file cannot be written. It is recommended that the value be greater than 30.</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183293572_a0d045bd4e7814cfc9808521c9e3c1b5b"><a name="en-us_topic_0183293572_a0d045bd4e7814cfc9808521c9e3c1b5b"></a><a name="en-us_topic_0183293572_a0d045bd4e7814cfc9808521c9e3c1b5b"></a>No</p>
</td>
</tr>
</tbody>
</table>

### Example

When running the container, add  **--files-limit n**. For example:

```
isula run -ti --files-limit 1024 busybox bash
```

### Constraints

1.  If the  **--files-limit**  parameter is set to a small value, for example, 1, the container may fail to be started.

    ```
    [root@localhost ~]# isula run -itd --files-limit 1 rnd-dockerhub.huawei.com/official/busybox-aarch64
    004858d9f9ef429b624f3d20f8ba12acfbc8a15bb121c4036de4e5745932eff4
    Error response from daemon: Start container error: Container is not running:004858d9f9ef429b624f3d20f8ba12acfbc8a15bb121c4036de4e5745932eff4
    ```

    Docker will be started successfully, and the value of  **files.limit cgroup**  is  **max**.

    ```
    [root@localhost ~]# docker run -itd --files-limit 1 rnd-dockerhub.huawei.com/official/busybox-aarch64
    ef9694bf4d8e803a1c7de5c17f5d829db409e41a530a245edc2e5367708dbbab
    [root@localhost ~]# docker exec -it ef96 cat /sys/fs/cgroup/files/files.limit
    max
    ```

    The root cause is that the startup principles of the lxc and runc processes are different. After the lxc process creates the cgroup, the files.limit value is set, and then the PID of the container process is written into the cgroup.procs file of the cgroup. At this time, the process has opened more than one handle. As a result, an error is reported, and the startup fails. After you create a cgroup by running the  **runc**  command, the PID of the container process is written to the cgroup.procs file of the cgroup, and then the files.limit value is set. Because more than one handle is opened by the process in the cgroup, the file.limit value does not take effect, the kernel does not report any error, and the container is started successfully.


## Restricting the Number of Processes or Threads that Can Be Created in a Container

### Description

You can set parameters to limit the number of processes or threads that can be created in a container.

### Usage

When creating or running a container, use the  **--pids-limit**  parameter to limit the number of processes or threads that can be created in the container.

### Parameters

When running the  **create/run**  command, set the  **--pids-limit**  parameter.

<a name="en-us_topic_0183316274_teea6792d7cdc4de6bbec22c6d34a8a56"></a>
<table><thead align="left"><tr id="en-us_topic_0183316274_r461aacfe00054dd09da79ded3d0d5677"><th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.1"><p id="en-us_topic_0183316274_a4713c2757b4742f1bcfc60cf8f92362b"><a name="en-us_topic_0183316274_a4713c2757b4742f1bcfc60cf8f92362b"></a><a name="en-us_topic_0183316274_a4713c2757b4742f1bcfc60cf8f92362b"></a><strong id="en-us_topic_0183316274_en-us_topic_0075721648_b576494217460"><a name="en-us_topic_0183316274_en-us_topic_0075721648_b576494217460"></a><a name="en-us_topic_0183316274_en-us_topic_0075721648_b576494217460"></a>Parameter</strong></p>
</th>
<th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.2"><p id="en-us_topic_0183316274_en-us_topic_0075721648_p349275174212"><a name="en-us_topic_0183316274_en-us_topic_0075721648_p349275174212"></a><a name="en-us_topic_0183316274_en-us_topic_0075721648_p349275174212"></a><strong id="en-us_topic_0183316274_ac040c826773e4b99805cc38e76ea34ab"><a name="en-us_topic_0183316274_ac040c826773e4b99805cc38e76ea34ab"></a><a name="en-us_topic_0183316274_ac040c826773e4b99805cc38e76ea34ab"></a>Description</strong></p>
</th>
<th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.3"><p id="en-us_topic_0183316274_a4d0aaa96c3b242aca9d2c22e494195f2"><a name="en-us_topic_0183316274_a4d0aaa96c3b242aca9d2c22e494195f2"></a><a name="en-us_topic_0183316274_a4d0aaa96c3b242aca9d2c22e494195f2"></a>Value Range</p>
</th>
<th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.4"><p id="en-us_topic_0183316274_a4cfdf0a8726d4fd08a52bb078988fc90"><a name="en-us_topic_0183316274_a4cfdf0a8726d4fd08a52bb078988fc90"></a><a name="en-us_topic_0183316274_a4cfdf0a8726d4fd08a52bb078988fc90"></a>Mandatory or Not</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0183316274_r771d05a684c4482b930111a484d0e970"><td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183316274_a668c80e436084fa48ad0a3aa56d627b9"><a name="en-us_topic_0183316274_a668c80e436084fa48ad0a3aa56d627b9"></a><a name="en-us_topic_0183316274_a668c80e436084fa48ad0a3aa56d627b9"></a>--pids-limit</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183316274_ac71045ed552b48d6bcb54a96bc27f690"><a name="en-us_topic_0183316274_ac71045ed552b48d6bcb54a96bc27f690"></a><a name="en-us_topic_0183316274_ac71045ed552b48d6bcb54a96bc27f690"></a>Limits the number of file handles that can be opened in a container.</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183316274_aabdc1cfa9ac94f6dafcab0ff0400c2e7"><a name="en-us_topic_0183316274_aabdc1cfa9ac94f6dafcab0ff0400c2e7"></a><a name="en-us_topic_0183316274_aabdc1cfa9ac94f6dafcab0ff0400c2e7"></a>64-bit integer The value can be 0 or a negative number, but cannot be greater than 2 to the power of 63 minus 1. The value 0 or a negative number indicates no limit.</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183316274_a0d045bd4e7814cfc9808521c9e3c1b5b"><a name="en-us_topic_0183316274_a0d045bd4e7814cfc9808521c9e3c1b5b"></a><a name="en-us_topic_0183316274_a0d045bd4e7814cfc9808521c9e3c1b5b"></a>No</p>
</td>
</tr>
</tbody>
</table>

### Example

When running the container, add  **--pids-limit n**. For example:

```
isula run -ti --pids-limit 1024 busybox bash
```

### Constraints

During container creation, some processes are created temporarily. Therefore, the value cannot be too small. Otherwise, the container may fail to be started. It is recommended that the value be greater than 10.

## Configuring the ulimit Value in a Container

### Description

You can use parameters to control the resources for executed programs.

### Usage

Set the  **--ulimit**  parameter when creating or running a container, or configure the parameter on the daemon to control the resources for executed programs in the container.

### Parameters

Use either of the following methods to configure ulimit:

1.  When running the  **isula create/run**  command, use  **--ulimit <type\>=<soft\>\[:<hard\>\]**  to control the resources of the executed shell program.

    <a name="en-us_topic_0183316275_table192755843616"></a>
    <table><thead align="left"><tr id="en-us_topic_0183316275_row1927175818360"><th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.1"><p id="en-us_topic_0183316275_p2027105863611"><a name="en-us_topic_0183316275_p2027105863611"></a><a name="en-us_topic_0183316275_p2027105863611"></a><strong id="en-us_topic_0183316275_b122755815363"><a name="en-us_topic_0183316275_b122755815363"></a><a name="en-us_topic_0183316275_b122755815363"></a>Parameter</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.2"><p id="en-us_topic_0183316275_p92717581368"><a name="en-us_topic_0183316275_p92717581368"></a><a name="en-us_topic_0183316275_p92717581368"></a><strong id="en-us_topic_0183316275_b15271058103614"><a name="en-us_topic_0183316275_b15271058103614"></a><a name="en-us_topic_0183316275_b15271058103614"></a>Description</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.3"><p id="en-us_topic_0183316275_p162711588364"><a name="en-us_topic_0183316275_p162711588364"></a><a name="en-us_topic_0183316275_p162711588364"></a>Value Range</p>
    </th>
    <th class="cellrowborder" valign="top" width="25%" id="mcps1.1.5.1.4"><p id="en-us_topic_0183316275_p152715819368"><a name="en-us_topic_0183316275_p152715819368"></a><a name="en-us_topic_0183316275_p152715819368"></a>Mandatory or Not</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0183316275_row5282058193614"><td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183316275_p02895810364"><a name="en-us_topic_0183316275_p02895810364"></a><a name="en-us_topic_0183316275_p02895810364"></a>--ulimit</p>
    </td>
    <td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183316275_p2288589368"><a name="en-us_topic_0183316275_p2288589368"></a><a name="en-us_topic_0183316275_p2288589368"></a>Limits the resources of the executed shell program.</p>
    </td>
    <td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183316275_p113155510143"><a name="en-us_topic_0183316275_p113155510143"></a><a name="en-us_topic_0183316275_p113155510143"></a>64-bit integer The value of the soft limit must be less than or equal to that of the hard limit. If only the soft limit is specified, the value of the hard limit is equal to that of the soft limit. Some types of resources do not support negative numbers. For details, see the following table.</p>
    </td>
    <td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183316275_p128558163611"><a name="en-us_topic_0183316275_p128558163611"></a><a name="en-us_topic_0183316275_p128558163611"></a>No</p>
    </td>
    </tr>
    </tbody>
    </table>

2.  Use daemon parameters or configuration files.

    For details, see --default-ulimits in  [Deployment Mode](#deployment-mode.md#EN-US_TOPIC_0184808043).

    **--ulimit**  can limit the following types of resources:

    <a name="en-us_topic_0183316275_table107744812507"></a>
    <table><thead align="left"><tr id="en-us_topic_0183316275_row1277419815508"><th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.1.4.1.1"><p id="en-us_topic_0183316275_p2774681505"><a name="en-us_topic_0183316275_p2774681505"></a><a name="en-us_topic_0183316275_p2774681505"></a><strong id="en-us_topic_0183316275_b1777458105010"><a name="en-us_topic_0183316275_b1777458105010"></a><a name="en-us_topic_0183316275_b1777458105010"></a>Type</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.1.4.1.2"><p id="en-us_topic_0183316275_p6774168185013"><a name="en-us_topic_0183316275_p6774168185013"></a><a name="en-us_topic_0183316275_p6774168185013"></a><strong id="en-us_topic_0183316275_b157749817506"><a name="en-us_topic_0183316275_b157749817506"></a><a name="en-us_topic_0183316275_b157749817506"></a>Description</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.1.4.1.3"><p id="en-us_topic_0183316275_p10774983500"><a name="en-us_topic_0183316275_p10774983500"></a><a name="en-us_topic_0183316275_p10774983500"></a>Value Range</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0183316275_row677516855018"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183316275_p177518155011"><a name="en-us_topic_0183316275_p177518155011"></a><a name="en-us_topic_0183316275_p177518155011"></a>core</p>
    </td>
    <td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183316275_p1977548165019"><a name="en-us_topic_0183316275_p1977548165019"></a><a name="en-us_topic_0183316275_p1977548165019"></a>limits the core file size (KB)</p>
    </td>
    <td class="cellrowborder" rowspan="14" valign="top" width="33.33333333333333%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0183316275_p1577516855011"><a name="en-us_topic_0183316275_p1577516855011"></a><a name="en-us_topic_0183316275_p1577516855011"></a>64-bit integer, without unit. The value can be 0 or a negative number. The value -1 indicates no limit. Other negative numbers are forcibly converted into a large positive integer.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183316275_row38865448572"><td class="cellrowborder" valign="top" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183316275_p128837446571"><a name="en-us_topic_0183316275_p128837446571"></a><a name="en-us_topic_0183316275_p128837446571"></a>cpu</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183316275_p24819486261"><a name="en-us_topic_0183316275_p24819486261"></a><a name="en-us_topic_0183316275_p24819486261"></a>max CPU time (MIN)</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183316275_row18167105285716"><td class="cellrowborder" valign="top" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183316275_p7165205217570"><a name="en-us_topic_0183316275_p7165205217570"></a><a name="en-us_topic_0183316275_p7165205217570"></a>data</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183316275_p216335710265"><a name="en-us_topic_0183316275_p216335710265"></a><a name="en-us_topic_0183316275_p216335710265"></a>max data size (KB)</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183316275_row58218531574"><td class="cellrowborder" valign="top" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183316275_p68201953145714"><a name="en-us_topic_0183316275_p68201953145714"></a><a name="en-us_topic_0183316275_p68201953145714"></a>fsize</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183316275_p1541711817270"><a name="en-us_topic_0183316275_p1541711817270"></a><a name="en-us_topic_0183316275_p1541711817270"></a>maximum filesize (KB)</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183316275_row13444185518573"><td class="cellrowborder" valign="top" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183316275_p244205517578"><a name="en-us_topic_0183316275_p244205517578"></a><a name="en-us_topic_0183316275_p244205517578"></a>locks</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183316275_p6620718182710"><a name="en-us_topic_0183316275_p6620718182710"></a><a name="en-us_topic_0183316275_p6620718182710"></a>max number of file locks the user can hold</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183316275_row4246175712575"><td class="cellrowborder" valign="top" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183316275_p1324485745719"><a name="en-us_topic_0183316275_p1324485745719"></a><a name="en-us_topic_0183316275_p1324485745719"></a>memlock</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183316275_p224415785717"><a name="en-us_topic_0183316275_p224415785717"></a><a name="en-us_topic_0183316275_p224415785717"></a>max locked-in-memory address space (KB)</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183316275_row3759820162420"><td class="cellrowborder" valign="top" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183316275_p177551620192416"><a name="en-us_topic_0183316275_p177551620192416"></a><a name="en-us_topic_0183316275_p177551620192416"></a>msgqueue</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183316275_p0755220122413"><a name="en-us_topic_0183316275_p0755220122413"></a><a name="en-us_topic_0183316275_p0755220122413"></a>max memory used by POSIX message queues (bytes)</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183316275_row584929152411"><td class="cellrowborder" valign="top" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183316275_p7811329152419"><a name="en-us_topic_0183316275_p7811329152419"></a><a name="en-us_topic_0183316275_p7811329152419"></a>nice</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183316275_p151801412182815"><a name="en-us_topic_0183316275_p151801412182815"></a><a name="en-us_topic_0183316275_p151801412182815"></a>nice priority</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183316275_row2387203192415"><td class="cellrowborder" valign="top" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183316275_p015081417259"><a name="en-us_topic_0183316275_p015081417259"></a><a name="en-us_topic_0183316275_p015081417259"></a>nproc</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183316275_p1454164112283"><a name="en-us_topic_0183316275_p1454164112283"></a><a name="en-us_topic_0183316275_p1454164112283"></a>max number of processes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183316275_row510363316245"><td class="cellrowborder" valign="top" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183316275_p1210193311244"><a name="en-us_topic_0183316275_p1210193311244"></a><a name="en-us_topic_0183316275_p1210193311244"></a>rss</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183316275_p1330124872810"><a name="en-us_topic_0183316275_p1330124872810"></a><a name="en-us_topic_0183316275_p1330124872810"></a>max resident set size (KB)</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183316275_row10182634162415"><td class="cellrowborder" valign="top" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183316275_p71806346245"><a name="en-us_topic_0183316275_p71806346245"></a><a name="en-us_topic_0183316275_p71806346245"></a>rtprio</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183316275_p8180153492410"><a name="en-us_topic_0183316275_p8180153492410"></a><a name="en-us_topic_0183316275_p8180153492410"></a>max realtime priority</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183316275_row731643517244"><td class="cellrowborder" valign="top" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183316275_p331311358242"><a name="en-us_topic_0183316275_p331311358242"></a><a name="en-us_topic_0183316275_p331311358242"></a>rttime</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183316275_p375422114613"><a name="en-us_topic_0183316275_p375422114613"></a><a name="en-us_topic_0183316275_p375422114613"></a>realtime timeout</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183316275_row189151636172412"><td class="cellrowborder" valign="top" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183316275_p791383610241"><a name="en-us_topic_0183316275_p791383610241"></a><a name="en-us_topic_0183316275_p791383610241"></a>sigpending</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183316275_p12730126203111"><a name="en-us_topic_0183316275_p12730126203111"></a><a name="en-us_topic_0183316275_p12730126203111"></a>max number of pending signals</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183316275_row163861238152414"><td class="cellrowborder" valign="top" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183316275_p23846383242"><a name="en-us_topic_0183316275_p23846383242"></a><a name="en-us_topic_0183316275_p23846383242"></a>stack</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183316275_p19713835143120"><a name="en-us_topic_0183316275_p19713835143120"></a><a name="en-us_topic_0183316275_p19713835143120"></a>max stack size (KB)</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183316275_row144841516818"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183316275_p47292201381"><a name="en-us_topic_0183316275_p47292201381"></a><a name="en-us_topic_0183316275_p47292201381"></a>nofile</p>
    </td>
    <td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183316275_p972982017813"><a name="en-us_topic_0183316275_p972982017813"></a><a name="en-us_topic_0183316275_p972982017813"></a>max number of open file descriptors</p>
    </td>
    <td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0183316275_p77290204817"><a name="en-us_topic_0183316275_p77290204817"></a><a name="en-us_topic_0183316275_p77290204817"></a>64-bit integer, without unit. The value cannot be negative. A negative number is forcibly converted to a large positive number. In addition, "Operation not permitted" is displayed during the setting.</p>
    </td>
    </tr>
    </tbody>
    </table>


### Example

When creating or running a container, add  **--ulimit <type\>=<soft\>\[:<hard\>\]**. For example:

```
isula create/run -tid --ulimit nofile=1024:2048 busybox sh
```

### Constraints

The ulimit cannot be configured in the  **daemon.json**  and  **/etc/sysconfig/iSulad**  files \(or the iSulad command line\). Otherwise, an error is reported when iSulad is started.

