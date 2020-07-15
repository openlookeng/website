# VM Configuration

- [VM Configuration](#vm-configuration)
    - [Introduction](#introduction)
    - [VM Description](#vm-description)
    - [vCPU and Virtual Memory](#vcpu-and-virtual-memory)
    - [Virtual Device Configuration](#virtual-device-configuration)
        - [Storage Devices](#storage-devices)
        - [Network Device](#network-device)
        - [Bus Configuration](#bus-configuration)
        - [Other Common Devices](#other-common-devices)
    - [Configurations Related to the System Architecture](#configurations-related-to-the-system-architecture)
    - [Other Common Configuration Items](#other-common-configuration-items)
    - [XML Configuration File Example](#xml-configuration-file-example)

## Introduction

### Overview

Libvirt tool uses XML files to describe a VM feature, including the VM name, CPU, memory, disk, NIC, mouse, and keyboard. You can manage a VM by modifying configuration files. This section describes the elements in the XML configuration file to help users configure VMs.

### Format

The VM XML configuration file uses domain as the root element, which contains multiple other elements. Some elements in the XML configuration file can contain corresponding attributes and attribute values to describe VM information in detail. Different attributes of the same element are separated by spaces.

The basic format of the XML configuration file is as follows. In the format,  **label**  indicates the label name,  **attribute**  indicates the attribute, and  **value**  indicates the attribute value. Change them based on the site requirements.

```
<domain type='kvm'>
    <name>VMName</name>
    <memory attribute='value'>8</memory>
    <vcpu>4</vcpu>
    <os>
       <label attribute='value' attribute='value'>
         ...
       </label>
    </os>
    <label attribute='value' attribute='value'>
      ...
    </label>  
</domain>
```

### Process

1.  Create an XML configuration file with domain root element.
2.  Use the name tag to specify a unique VM name based on the naming rule.
3.  Configure system resources such as the virtual CPU \(vCPU\) and virtual memory.
4.  Configure virtual devices.
    1.  Configure storage devices.
    2.  Configure network devices.
    3.  Configure the external bus structure.
    4.  Configure external devices such as the mouse.

5.  Save the XML configuration file.

## VM Description

### Overview

This section describes how to configure the VM  **domain**  root element and VM name.

### Elements

-   **domain**: Root element of a VM XML configuration file, which is used to configure the type of the hypervisor that runs the VM.

    **type**: Type of a domain in virtualization. In the openEuler virtualization, the attribute value is  **kvm**.

-   **name**: VM name.

    The VM name is a unique character string on the same host. The VM name can contain only digits, letters, underscores \(\_\), hyphens \(-\), and colons \(:\), but cannot contain only digits. The VM name can contain a maximum of 64 characters.


### Configuration Example

For example, if the VM name is  **openEuler**, the configuration is as follows:

```
<domain type='kvm'>
    <name>openEuler</name>
    ...
</domain>
```

## vCPU and Virtual Memory

### Overview

This section describes how to configure the vCPU and virtual memory.

### Elements

-   **vcpu**: The number of virtual processors.
-   **memory**: The size of the virtual memory.

    **unit**: The memory unit. The value can be KiB \(2<sup>10</sup>  bytes\), MiB \(2<sup>20</sup>  bytes\), GiB \(2<sup>30</sup>  bytes\), or TiB \(2<sup>40</sup>  bytes\).

-   **cpu**: The mode of the virtual processor.

    **mode**: The mode of the vCPU. The  **host-passthrough**  indicates that the architecture and features of the virtual CPU are the same as those of the host.

    Sub-element  **topology**: A sub-element of the element cpu, used to describe the topology structure of a vCPU mode.

    -   The attributes  **socket**,  **cores**, and  **threads**  of the sub-element topology describe the number of CPU sockets of a VM, the number of processor cores included in each CPU socket, and the number of hyperthreads included in each processor core, respectively. The attribute value is a positive integer, and a product of the three values is equal to the number of of vCPUs.


### Configuration Example

For example, if the number of vCPUs is 4, the processing mode is host-passthrough, the virtual memory is 8 GiB, the four CPUs are distributed in two CPU sockets, and hyperthreading  is not supported, the configuration is as follows:

```
<domain type='kvm'>
    ...
    <vcpu>4</vcpu>
    <memory unit='GiB'>8</memory>
    <cpu mode='host-passthrough'>
        <topology sockets='2' cores='2' threads='1'/>
    </cpu>
...
</domain>
```

## Virtual Device Configuration

The VM XML configuration file uses the  **devices**  elements to configure virtual devices, including storage devices, network devices, buses, and mouse devices. This section describes how to configure common virtual devices.

### Storage Devices

#### Overview

This section describes how to configure virtual storage devices, including floppy disks, disks, and CD-ROMs and their storage types.

#### Elements

The XML configuration file uses the  **disk**  element to configure storage devices.  [Table 1](#table14200183410353)  describes common  **disk**  attributes.  [Table 2](#table4866134925114)  describes common subelements and their attributes.

**Table  1**  Common attributes of the  **disk**  element

<a name="table14200183410353"></a>
<table><thead align="left"><tr id="row720143463519"><th class="cellrowborder" valign="top" width="7.5200000000000005%" id="mcps1.2.5.1.1"><p id="p559231514916"><a name="p559231514916"></a><a name="p559231514916"></a>Element</p>
</th>
<th class="cellrowborder" valign="top" width="11.39%" id="mcps1.2.5.1.2"><p id="p92021634133518"><a name="p92021634133518"></a><a name="p92021634133518"></a>Attribute</p>
</th>
<th class="cellrowborder" valign="top" width="21.69%" id="mcps1.2.5.1.3"><p id="p42026341354"><a name="p42026341354"></a><a name="p42026341354"></a>Description</p>
</th>
<th class="cellrowborder" valign="top" width="59.4%" id="mcps1.2.5.1.4"><p id="p12202193443516"><a name="p12202193443516"></a><a name="p12202193443516"></a>Attribute Value and Description</p>
</th>
</tr>
</thead>
<tbody><tr id="row1820215342359"><td class="cellrowborder" rowspan="2" valign="top" width="7.5200000000000005%" headers="mcps1.2.5.1.1 "><p id="p742912318910"><a name="p742912318910"></a><a name="p742912318910"></a>disk</p>
</td>
<td class="cellrowborder" valign="top" width="11.39%" headers="mcps1.2.5.1.2 "><p id="p3202103453512"><a name="p3202103453512"></a><a name="p3202103453512"></a><strong id="b4261847145610"><a name="b4261847145610"></a><a name="b4261847145610"></a>type</strong></p>
</td>
<td class="cellrowborder" valign="top" width="21.69%" headers="mcps1.2.5.1.3 "><p id="p1920223493510"><a name="p1920223493510"></a><a name="p1920223493510"></a>Specifies the type of the backend storage medium.</p>
</td>
<td class="cellrowborder" valign="top" width="59.4%" headers="mcps1.2.5.1.4 "><p id="p1437102115361"><a name="p1437102115361"></a><a name="p1437102115361"></a><strong id="b1778815133515"><a name="b1778815133515"></a><a name="b1778815133515"></a>block</strong>: block device</p>
<p id="p8202113415351"><a name="p8202113415351"></a><a name="p8202113415351"></a><strong id="b1042731320358"><a name="b1042731320358"></a><a name="b1042731320358"></a>file</strong>: file device</p>
<p id="p13953102263316"><a name="p13953102263316"></a><a name="p13953102263316"></a><strong id="b18794216103518"><a name="b18794216103518"></a><a name="b18794216103518"></a>dir</strong>: directory path</p>
</td>
</tr>
<tr id="row142028345356"><td class="cellrowborder" valign="top" headers="mcps1.2.5.1.1 "><p id="p52031734143515"><a name="p52031734143515"></a><a name="p52031734143515"></a><strong id="b1532475513564"><a name="b1532475513564"></a><a name="b1532475513564"></a>device</strong></p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.5.1.2 "><p id="p120313453518"><a name="p120313453518"></a><a name="p120313453518"></a>Specifies the storage medium to be presented to the VM.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.5.1.3 "><p id="p18259554183415"><a name="p18259554183415"></a><a name="p18259554183415"></a><strong id="b4934327173519"><a name="b4934327173519"></a><a name="b4934327173519"></a>disk</strong>: disk (default)</p>
<p id="p15491211123817"><a name="p15491211123817"></a><a name="p15491211123817"></a><strong id="b17296123613513"><a name="b17296123613513"></a><a name="b17296123613513"></a>floppy</strong>: floppy disk</p>
<p id="p720343433510"><a name="p720343433510"></a><a name="p720343433510"></a><strong id="b14918844143515"><a name="b14918844143515"></a><a name="b14918844143515"></a>cdrom</strong>: CD-ROM</p>
</td>
</tr>
</tbody>
</table>

**Table  2**  Common subelements and attributes of the  **disk**  element

<a name="table4866134925114"></a>
<table><thead align="left"><tr id="row5867349175120"><th class="cellrowborder" valign="top" width="13.3%" id="mcps1.2.4.1.1"><p id="p1532019194524"><a name="p1532019194524"></a><a name="p1532019194524"></a>Subelement</p>
</th>
<th class="cellrowborder" valign="top" width="21.42%" id="mcps1.2.4.1.2"><p id="p44946337529"><a name="p44946337529"></a><a name="p44946337529"></a>Subelement Description</p>
</th>
<th class="cellrowborder" valign="top" width="65.28%" id="mcps1.2.4.1.3"><p id="p19867184935114"><a name="p19867184935114"></a><a name="p19867184935114"></a>Attribute Description</p>
</th>
</tr>
</thead>
<tbody><tr id="row186719494512"><td class="cellrowborder" valign="top" width="13.3%" headers="mcps1.2.4.1.1 "><p id="p186719490514"><a name="p186719490514"></a><a name="p186719490514"></a>source</p>
</td>
<td class="cellrowborder" valign="top" width="21.42%" headers="mcps1.2.4.1.2 "><p id="p466752217444"><a name="p466752217444"></a><a name="p466752217444"></a>Specifies the backend storage medium, which corresponds to the type specified by the <strong id="b847793912182"><a name="b847793912182"></a><a name="b847793912182"></a>type</strong> attribute of the <strong id="b724617521188"><a name="b724617521188"></a><a name="b724617521188"></a>disk</strong> element.</p>
</td>
<td class="cellrowborder" valign="top" width="65.28%" headers="mcps1.2.4.1.3 "><p id="p5608740181019"><a name="p5608740181019"></a><a name="p5608740181019"></a><strong id="b15742194833420"><a name="b15742194833420"></a><a name="b15742194833420"></a>file</strong>: file type. The value is the fully qualified path of the corresponding file.</p>
<p id="p164275439106"><a name="p164275439106"></a><a name="p164275439106"></a><strong id="b1259225283417"><a name="b1259225283417"></a><a name="b1259225283417"></a>dev</strong>: block type. The value is the fully qualified path of the corresponding host device.</p>
<p id="p15881242194919"><a name="p15881242194919"></a><a name="p15881242194919"></a><strong id="b6708185653411"><a name="b6708185653411"></a><a name="b6708185653411"></a>dir</strong>: directory type. The value is the fully qualified path of the disk directory.</p>
</td>
</tr>
<tr id="row34652194612"><td class="cellrowborder" valign="top" width="13.3%" headers="mcps1.2.4.1.1 "><p id="p184654191365"><a name="p184654191365"></a><a name="p184654191365"></a>driver</p>
</td>
<td class="cellrowborder" valign="top" width="21.42%" headers="mcps1.2.4.1.2 "><p id="p114659199618"><a name="p114659199618"></a><a name="p114659199618"></a>Details about the specified backend driver</p>
</td>
<td class="cellrowborder" valign="top" width="65.28%" headers="mcps1.2.4.1.3 "><p id="p114651719267"><a name="p114651719267"></a><a name="p114651719267"></a><strong id="b147071449371"><a name="b147071449371"></a><a name="b147071449371"></a>type</strong>: disk format type. The value can be <strong id="b427816418382"><a name="b427816418382"></a><a name="b427816418382"></a>raw</strong> or <strong id="b1023625017388"><a name="b1023625017388"></a><a name="b1023625017388"></a>qcow2</strong>, which must be the same as that of source.</p>
<p id="p17729162795"><a name="p17729162795"></a><a name="p17729162795"></a><strong id="b11843918113812"><a name="b11843918113812"></a><a name="b11843918113812"></a>io</strong>: disk I/O mode. The options are <strong id="b231012200410"><a name="b231012200410"></a><a name="b231012200410"></a>native</strong> and <strong id="b15171523154120"><a name="b15171523154120"></a><a name="b15171523154120"></a>threads</strong>.</p>
<p id="p14680718191016"><a name="p14680718191016"></a><a name="p14680718191016"></a><strong id="b34049735212"><a name="b34049735212"></a><a name="b34049735212"></a>cache</strong>: disk cache mode. The value can be <strong id="b149601234145119"><a name="b149601234145119"></a><a name="b149601234145119"></a>none</strong>, <strong id="b1190434815119"><a name="b1190434815119"></a><a name="b1190434815119"></a>writethrough</strong>, <strong id="b193195317518"><a name="b193195317518"></a><a name="b193195317518"></a>writeback</strong>, or <strong id="b10772155685113"><a name="b10772155685113"></a><a name="b10772155685113"></a>directsync</strong>.</p>
<p id="p17896143411122"><a name="p17896143411122"></a><a name="p17896143411122"></a><strong id="b16456171445216"><a name="b16456171445216"></a><a name="b16456171445216"></a>iothread</strong>: I/O thread allocated to the disk.</p>
</td>
</tr>
<tr id="row08679492515"><td class="cellrowborder" valign="top" width="13.3%" headers="mcps1.2.4.1.1 "><p id="p188671349195119"><a name="p188671349195119"></a><a name="p188671349195119"></a>target</p>
</td>
<td class="cellrowborder" valign="top" width="21.42%" headers="mcps1.2.4.1.2 "><p id="p144948333527"><a name="p144948333527"></a><a name="p144948333527"></a>The bus and device that a disk presents to a VM.</p>
</td>
<td class="cellrowborder" valign="top" width="65.28%" headers="mcps1.2.4.1.3 "><p id="p158671649195117"><a name="p158671649195117"></a><a name="p158671649195117"></a><strong id="b398714369574"><a name="b398714369574"></a><a name="b398714369574"></a>dev</strong>: specifies the logical device name of a disk, for example, <strong id="b991220105815"><a name="b991220105815"></a><a name="b991220105815"></a>sd[a-p]</strong> for SCSI, SATA, and USB buses and <strong id="b20572133412581"><a name="b20572133412581"></a><a name="b20572133412581"></a>hd[a-d]</strong> for IDE disks.</p>
<p id="p7960169114"><a name="p7960169114"></a><a name="p7960169114"></a><strong id="b177746155918"><a name="b177746155918"></a><a name="b177746155918"></a>bus</strong>: specifies the type of a disk. Common types include scsi, usb, sata, and virtio.</p>
</td>
</tr>
<tr id="row386764955116"><td class="cellrowborder" valign="top" width="13.3%" headers="mcps1.2.4.1.1 "><p id="p19867049125114"><a name="p19867049125114"></a><a name="p19867049125114"></a>boot</p>
</td>
<td class="cellrowborder" valign="top" width="21.42%" headers="mcps1.2.4.1.2 "><p id="p2313201420517"><a name="p2313201420517"></a><a name="p2313201420517"></a>The disk can be used as the boot disk.</p>
</td>
<td class="cellrowborder" valign="top" width="65.28%" headers="mcps1.2.4.1.3 "><p id="p11867149165120"><a name="p11867149165120"></a><a name="p11867149165120"></a><strong id="b195415181010"><a name="b195415181010"></a><a name="b195415181010"></a>order</strong>: specifies the disk startup sequence.</p>
</td>
</tr>
<tr id="row18868164965114"><td class="cellrowborder" valign="top" width="13.3%" headers="mcps1.2.4.1.1 "><p id="p486814495519"><a name="p486814495519"></a><a name="p486814495519"></a>readonly</p>
</td>
<td class="cellrowborder" valign="top" width="21.42%" headers="mcps1.2.4.1.2 "><p id="p184942033175213"><a name="p184942033175213"></a><a name="p184942033175213"></a>The disk is read-only and cannot be modified by the VM. Generally, it is used together with the CD-ROM drive.</p>
</td>
<td class="cellrowborder" valign="top" width="65.28%" headers="mcps1.2.4.1.3 "><p id="p98681249135119"><a name="p98681249135119"></a><a name="p98681249135119"></a>-</p>
</td>
</tr>
</tbody>
</table>

#### Configuration Example

After the VM image is prepared according to  [Preparing a VM Image](#preparing-a-vm-image), you can use the following XML configuration file to configure the virtual disk for the VM.

In this example, two I/O threads, one block disk device and one CD, are configured for the VM, and the first I/O thread is allocated to the block disk device for use. The backend medium of the disk device is in qcow2 format and is used as the preferred boot disk.

```
<domain type='kvm'>
    ...
    <iothreads>2</iothreads>
    <devices>
        <disk type='file' device='disk'>
	    <driver name='qemu' type='qcow2' cache='none' io='native' iothread="1"/>
	    <source file='/mnt/openEuler-image.qcow2'/>
	    <target dev='vda' bus='virtio'/>
	    <boot order='1'/>
	</disk>
	<disk type='file' device='cdrom'>
	    <driver name='qemu' type='raw' cache='none' io='native'/>
	    <source file='/mnt/openEuler-20.03-LTS-aarch64-dvd.iso'/>
	    <target dev='sdb' bus='scsi'/>
	    <readonly/>
	    <boot order='2'/>
	</disk>
         ...
    </devices>
</domain>
```

### Network Device

#### Overview

The XML configuration file can be used to configure virtual network devices, including the ethernet mode, bridge mode, and vhostuser mode. This section describes how to configure vNICs.

#### Elements

In the XML configuration file, the element  **interface**  is used, and its attribute  **type**  indicates the mode of the vNIC. The options are  **ethernet**,  **bridge**, and  **vhostuser**. The following uses the vNIC in bridge mode as an example to describe its subelements and attributes.

**Table  1**  Common subelements of a vNIC in bridge mode


<table><thead align="left"><tr id="row5867349175120"><th class="cellrowborder" valign="top" width="13.3%" id="mcps1.2.4.1.1"><p id="p1532019194524"><a name="p1532019194524"></a><a name="p1532019194524"></a>Subelement</p>
</th>
<th class="cellrowborder" valign="top" width="21.42%" id="mcps1.2.4.1.2"><p id="p44946337529"><a name="p44946337529"></a><a name="p44946337529"></a>Subelement Description</p>
</th>
<th class="cellrowborder" valign="top" width="65.28%" id="mcps1.2.4.1.3"><p id="p19867184935114"><a name="p19867184935114"></a><a name="p19867184935114"></a>Attribute and Description</p>
</th>
</tr>
</thead>
<tbody><tr id="row186719494512"><td class="cellrowborder" valign="top" width="13.3%" headers="mcps1.2.4.1.1 "><p id="p1389163520221"><a name="p1389163520221"></a><a name="p1389163520221"></a>mac</p>
</td>
<td class="cellrowborder" valign="top" width="21.42%" headers="mcps1.2.4.1.2 "><p id="p466752217444"><a name="p466752217444"></a><a name="p466752217444"></a>The mac address of the vNIC.</p>
</td>
<td class="cellrowborder" valign="top" width="65.28%" headers="mcps1.2.4.1.3 "><p id="p5608740181019"><a name="p5608740181019"></a><a name="p5608740181019"></a><strong id="b14802133216224"><a name="b14802133216224"></a><a name="b14802133216224"></a>address</strong>: specifies the mac address. If this parameter is not set, the system automatically generates a mac address.</p>
</td>
</tr>
<tr id="row08679492515"><td class="cellrowborder" valign="top" width="13.3%" headers="mcps1.2.4.1.1 "><p id="p188671349195119"><a name="p188671349195119"></a><a name="p188671349195119"></a>target</p>
</td>
<td class="cellrowborder" valign="top" width="21.42%" headers="mcps1.2.4.1.2 "><p id="p144948333527"><a name="p144948333527"></a><a name="p144948333527"></a>Name of the backend vNIC.</p>
</td>
<td class="cellrowborder" valign="top" width="65.28%" headers="mcps1.2.4.1.3 "><p id="p158671649195117"><a name="p158671649195117"></a><a name="p158671649195117"></a><strong id="b1169884111231"><a name="b1169884111231"></a><a name="b1169884111231"></a>dev</strong>: name of the created backend tap device.</p>
</td>
</tr>
<tr id="row11249184413266"><td class="cellrowborder" valign="top" width="13.3%" headers="mcps1.2.4.1.1 "><p id="p14250184410269"><a name="p14250184410269"></a><a name="p14250184410269"></a>source</p>
</td>
<td class="cellrowborder" valign="top" width="21.42%" headers="mcps1.2.4.1.2 "><p id="p925004411264"><a name="p925004411264"></a><a name="p925004411264"></a>Specify the backend of the vNIC.</p>
</td>
<td class="cellrowborder" valign="top" width="65.28%" headers="mcps1.2.4.1.3 "><p id="p225044417263"><a name="p225044417263"></a><a name="p225044417263"></a><strong id="b95441444202414"><a name="b95441444202414"></a><a name="b95441444202414"></a>bridge</strong>: used together with the bridge mode. The value is the <strong id="b36002982519"><a name="b36002982519"></a><a name="b36002982519"></a>bridge name</strong>.</p>
</td>
</tr>
<tr id="row386764955116"><td class="cellrowborder" valign="top" width="13.3%" headers="mcps1.2.4.1.1 "><p id="p19867049125114"><a name="p19867049125114"></a><a name="p19867049125114"></a>boot</p>
</td>
<td class="cellrowborder" valign="top" width="21.42%" headers="mcps1.2.4.1.2 "><p id="p2313201420517"><a name="p2313201420517"></a><a name="p2313201420517"></a>The NIC can be used for remote startup.</p>
</td>
<td class="cellrowborder" valign="top" width="65.28%" headers="mcps1.2.4.1.3 "><p id="p11867149165120"><a name="p11867149165120"></a><a name="p11867149165120"></a><strong id="b113691627102512"><a name="b113691627102512"></a><a name="b113691627102512"></a>order</strong>: specifies the startup sequence of NICs.</p>
</td>
</tr>
<tr id="row18868164965114"><td class="cellrowborder" valign="top" width="13.3%" headers="mcps1.2.4.1.1 "><p id="p486814495519"><a name="p486814495519"></a><a name="p486814495519"></a>model</p>
</td>
<td class="cellrowborder" valign="top" width="21.42%" headers="mcps1.2.4.1.2 "><p id="p184942033175213"><a name="p184942033175213"></a><a name="p184942033175213"></a>Indicates the type of a vNIC.</p>
</td>
<td class="cellrowborder" valign="top" width="65.28%" headers="mcps1.2.4.1.3 "><p id="p98681249135119"><a name="p98681249135119"></a><a name="p98681249135119"></a><strong id="b1182616408255"><a name="b1182616408255"></a><a name="b1182616408255"></a>type</strong>: <strong id="b14483540182616"><a name="b14483540182616"></a><a name="b14483540182616"></a>virtio</strong> is usually used for the NIC in bridge mode.</p>
</td>
</tr>
<tr id="row5709165573315"><td class="cellrowborder" valign="top" width="13.3%" headers="mcps1.2.4.1.1 "><p id="p2071025553313"><a name="p2071025553313"></a><a name="p2071025553313"></a>virtualport</p>
</td>
<td class="cellrowborder" valign="top" width="21.42%" headers="mcps1.2.4.1.2 "><p id="p2710855113315"><a name="p2710855113315"></a><a name="p2710855113315"></a>Port type</p>
</td>
<td class="cellrowborder" valign="top" width="65.28%" headers="mcps1.2.4.1.3 "><p id="p271095513338"><a name="p271095513338"></a><a name="p271095513338"></a><strong id="b44356412718"><a name="b44356412718"></a><a name="b44356412718"></a>type</strong>: If an OVS bridge is used, set this parameter to <strong id="b1395701202718"><a name="b1395701202718"></a><a name="b1395701202718"></a>openvswitch</strong>.</p>
</td>
</tr>
<tr id="row990801184116"><td class="cellrowborder" valign="top" width="13.3%" headers="mcps1.2.4.1.1 "><p id="p18909310415"><a name="p18909310415"></a><a name="p18909310415"></a>driver</p>
</td>
<td class="cellrowborder" valign="top" width="21.42%" headers="mcps1.2.4.1.2 "><p id="p090918115413"><a name="p090918115413"></a><a name="p090918115413"></a>Backend driver type</p>
</td>
<td class="cellrowborder" valign="top" width="65.28%" headers="mcps1.2.4.1.3 "><p id="p1090918194112"><a name="p1090918194112"></a><a name="p1090918194112"></a><strong id="b826415388276"><a name="b826415388276"></a><a name="b826415388276"></a>name</strong>: driver name. The value is <strong id="b11841751182718"><a name="b11841751182718"></a><a name="b11841751182718"></a>vhost</strong>.</p>
<p id="p84340111436"><a name="p84340111436"></a><a name="p84340111436"></a><strong id="b19135262810"><a name="b19135262810"></a><a name="b19135262810"></a>queues</strong>: the number of NIC queues.</p>
</td>
</tr>
</tbody>
</table>

#### Configuration Example

-   After creating the Linux bridge br0 by referring to  [Preparing the VM Network](#preparing-the-vm-network), configure a vNIC of the VirtIO type bridged on the br0 bridge. The corresponding XML configuration is as follows:

    ```
    <domain type='kvm'>
        ...
        <devices>
            <interface type='bridge'>
    	    <source bridge='br0'/>
                <model type='virtio'/>
    	</interface>
            ...
        </devices>
    </domain>
    ```

-   If an OVS network bridge is created according to  [Preparing the VM Network](#preparing-the-vm-network), configure a VirtIO vNIC device that uses the vhost driver and has four queues.

    ```
    <domain type='kvm'>
        ...
        <devices>
            <interface type='bridge'>
    	    <source bridge='br0'/>
                <virtualport type='openvswitch'/> 
                <model type='virtio'/>
                <driver name='vhost' queues='4'/> 
    	</interface>
            ...
        </devices>
    </domain>
    ```


### Bus Configuration

#### Overview

The bus is a channel for information communication between components of a computer. An external device needs to be mounted to a corresponding bus, and each device is assigned a unique address \(specified by the subelement  **address**\). Information exchange with another device or a central processing unit \(CPU\) is completed through the bus network. Common device buses include the ISA bus, PCI bus, USB bus, SCSI bus, and PCIe bus.

The PCIe bus is a typical tree structure and has good scalability. The buses are associated with each other by using a controller. The following uses the PCIe bus as an example to describe how to configure a bus topology for a VM.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>The bus configuration is complex. If the device topology does not need to be precisely controlled, the default bus configuration automatically generated by libvirt can be used.  

#### Elements

In the XML configuration of libvirt, each controller element \(**controller**\) represents a bus, and one or more controllers or devices can be mounted to one controller depending on the VM architecture. This topic describes common attributes and subelements.

**controller**: controller element, which indicates a bus.

-   Attribute  **type**: bus type, which is mandatory for the controller. The common values are  **pci**,  **usb**,  **scsi**,  **virtio-serial**,  **fdc**, and  **ccid**.
-   Attribute  **index**: bus number of the controller \(the number starts from 0\), which is mandatory for the controller. This attribute can be used in the  **address**  element.
-   Attribute  **model**: specific model of the controller, which is mandatory for the controller. The available values are related to the value of  **type**. For details about the mapping and description, see  [Table 1](#table191911761111).
-   Subelement  **address**: mount location of a device or controller on the bus network.
    -   Attribute  **type**: device address type. The common values are  **pci**,  **usb**, or  **drive**. The attribute varies according to the  **type**  of the  **address**. For details about the common  **type**  attribute value and the corresponding  **address**  attribute, see  [Table 2](#table1200165711314).

-   Subelement  **model**: name of a controller model.
    -   Attribute  **name**: name of a controller model, which corresponds to the  **model**  attribute in the parent element controller.


**Table  1**  Mapping between the common values of  **type**  and  **model**  for the controller.


<table><thead align="left"><tr id="row2208179119"><th class="cellrowborder" valign="top" width="15.690000000000001%" id="mcps1.2.4.1.1"><p id="p17201217141114"><a name="p17201217141114"></a><a name="p17201217141114"></a>Value of Type</p>
</th>
<th class="cellrowborder" valign="top" width="28.52%" id="mcps1.2.4.1.2"><p id="p1520817171119"><a name="p1520817171119"></a><a name="p1520817171119"></a>Value of Model</p>
</th>
<th class="cellrowborder" valign="top" width="55.78999999999999%" id="mcps1.2.4.1.3"><p id="p1120517141112"><a name="p1120517141112"></a><a name="p1120517141112"></a>Introduction</p>
</th>
</tr>
</thead>
<tbody><tr id="row720101781119"><td class="cellrowborder" rowspan="3" valign="top" width="15.690000000000001%" headers="mcps1.2.4.1.1 "><p id="p172011751118"><a name="p172011751118"></a><a name="p172011751118"></a>pci</p>
</td>
<td class="cellrowborder" valign="top" width="28.52%" headers="mcps1.2.4.1.2 "><p id="p19202176114"><a name="p19202176114"></a><a name="p19202176114"></a>pcie-root</p>
</td>
<td class="cellrowborder" valign="top" width="55.78999999999999%" headers="mcps1.2.4.1.3 "><p id="p520417161112"><a name="p520417161112"></a><a name="p520417161112"></a>PCIe root node, which can be used to mount PCIe devices or controllers.</p>
</td>
</tr>
<tr id="row34183091319"><td class="cellrowborder" valign="top" headers="mcps1.2.4.1.1 "><p id="p5413016139"><a name="p5413016139"></a><a name="p5413016139"></a>pcie-root-port</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.4.1.2 "><p id="p104130141319"><a name="p104130141319"></a><a name="p104130141319"></a>Only one slot can be used to mount a PCIe device or controller.</p>
</td>
</tr>
<tr id="row3266142571311"><td class="cellrowborder" valign="top" headers="mcps1.2.4.1.1 "><p id="p7266122511139"><a name="p7266122511139"></a><a name="p7266122511139"></a>pcie-to-pci-bridge</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.4.1.2 "><p id="p13266142517138"><a name="p13266142517138"></a><a name="p13266142517138"></a>PCIe-to-PCI bridge controller, which can be used to mount PCI devices.</p>
</td>
</tr>
<tr id="row3942151816165"><td class="cellrowborder" rowspan="2" valign="top" width="15.690000000000001%" headers="mcps1.2.4.1.1 "><p id="p1296875715235"><a name="p1296875715235"></a><a name="p1296875715235"></a>usb</p>
</td>
<td class="cellrowborder" valign="top" width="28.52%" headers="mcps1.2.4.1.2 "><p id="p199601718161616"><a name="p199601718161616"></a><a name="p199601718161616"></a>ehci</p>
</td>
<td class="cellrowborder" valign="top" width="55.78999999999999%" headers="mcps1.2.4.1.3 "><p id="p4960718181613"><a name="p4960718181613"></a><a name="p4960718181613"></a>USB 2.0 controller, which can be used to mount USB 2.0 devices.</p>
</td>
</tr>
<tr id="row166823191418"><td class="cellrowborder" valign="top" headers="mcps1.2.4.1.1 "><p id="p0612321419"><a name="p0612321419"></a><a name="p0612321419"></a>nec-xhci</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.4.1.2 "><p id="p161123171414"><a name="p161123171414"></a><a name="p161123171414"></a>USB 3.0 controller, which can be used to mount USB 3.0 devices.</p>
</td>
</tr>
<tr id="row4208152615123"><td class="cellrowborder" valign="top" width="15.690000000000001%" headers="mcps1.2.4.1.1 "><p id="p8209326151213"><a name="p8209326151213"></a><a name="p8209326151213"></a>scsi</p>
</td>
<td class="cellrowborder" valign="top" width="28.52%" headers="mcps1.2.4.1.2 "><p id="p1520972631215"><a name="p1520972631215"></a><a name="p1520972631215"></a>virtio-scsi</p>
</td>
<td class="cellrowborder" valign="top" width="55.78999999999999%" headers="mcps1.2.4.1.3 "><p id="p520922617123"><a name="p520922617123"></a><a name="p520922617123"></a>VirtIO SCSI controller, which can be used to mount block devices, such as disks and CD-ROMs.</p>
</td>
</tr>
<tr id="row16488195941212"><td class="cellrowborder" valign="top" width="15.690000000000001%" headers="mcps1.2.4.1.1 "><p id="p1748811598122"><a name="p1748811598122"></a><a name="p1748811598122"></a>virtio-serial</p>
</td>
<td class="cellrowborder" valign="top" width="28.52%" headers="mcps1.2.4.1.2 "><p id="p174881059161214"><a name="p174881059161214"></a><a name="p174881059161214"></a>virtio-serial</p>
</td>
<td class="cellrowborder" valign="top" width="55.78999999999999%" headers="mcps1.2.4.1.3 "><p id="p748825916121"><a name="p748825916121"></a><a name="p748825916121"></a>VirtIO serial port controller, which can be used to mount serial port devices, such as a pty serial port.</p>
</td>
</tr>
</tbody>
</table>

**Table  2**  Attributes of the  **address**  element in different devices.


<table><thead align="left"><tr id="row202004570319"><th class="cellrowborder" valign="top" width="15.370000000000001%" id="mcps1.2.4.1.1"><p id="p172015573318"><a name="p172015573318"></a><a name="p172015573318"></a>Value of Type</p>
</th>
<th class="cellrowborder" valign="top" width="23.52%" id="mcps1.2.4.1.2"><p id="p17202111511010"><a name="p17202111511010"></a><a name="p17202111511010"></a>Description</p>
</th>
<th class="cellrowborder" valign="top" width="61.11%" id="mcps1.2.4.1.3"><p id="p32016571036"><a name="p32016571036"></a><a name="p32016571036"></a>Address</p>
</th>
</tr>
</thead>
<tbody><tr id="row19201145719315"><td class="cellrowborder" valign="top" width="15.370000000000001%" headers="mcps1.2.4.1.1 "><p id="p1620115571339"><a name="p1620115571339"></a><a name="p1620115571339"></a>pci</p>
</td>
<td class="cellrowborder" valign="top" width="23.52%" headers="mcps1.2.4.1.2 "><p id="p202310814107"><a name="p202310814107"></a><a name="p202310814107"></a>The <strong id="b15473171032017"><a name="b15473171032017"></a><a name="b15473171032017"></a>address</strong> type is PCI address, indicating the mount location of the device on the PCI bus network.</p>
</td>
<td class="cellrowborder" valign="top" width="61.11%" headers="mcps1.2.4.1.3 "><p id="p1320110578310"><a name="p1320110578310"></a><a name="p1320110578310"></a><strong id="b1171012092214"><a name="b1171012092214"></a><a name="b1171012092214"></a>domain</strong>: domain ID of the PCI device.</p>
<p id="p22594251151"><a name="p22594251151"></a><a name="p22594251151"></a><strong id="b165148415228"><a name="b165148415228"></a><a name="b165148415228"></a>bus</strong>: bus number of the PCI device.</p>
<p id="p162261129459"><a name="p162261129459"></a><a name="p162261129459"></a><strong id="b1435720819220"><a name="b1435720819220"></a><a name="b1435720819220"></a>slot</strong>: device number of the PCI device.</p>
<p id="p124103331054"><a name="p124103331054"></a><a name="p124103331054"></a><strong id="b121241910162211"><a name="b121241910162211"></a><a name="b121241910162211"></a>function</strong>: function number of the PCI device.</p>
<p id="p1447013400512"><a name="p1447013400512"></a><a name="p1447013400512"></a><strong id="b4380213102220"><a name="b4380213102220"></a><a name="b4380213102220"></a>multifunction</strong>: (optional) specifies whether to enable the multifunction function. </p>
</td>
</tr>
<tr id="row1020113571236"><td class="cellrowborder" valign="top" width="15.370000000000001%" headers="mcps1.2.4.1.1 "><p id="p52017571238"><a name="p52017571238"></a><a name="p52017571238"></a>usb</p>
</td>
<td class="cellrowborder" valign="top" width="23.52%" headers="mcps1.2.4.1.2 "><p id="p423198161015"><a name="p423198161015"></a><a name="p423198161015"></a>The <strong id="b114102531238"><a name="b114102531238"></a><a name="b114102531238"></a>address</strong> type is USB address, indicating the location of the device on the USB bus.</p>
</td>
<td class="cellrowborder" valign="top" width="61.11%" headers="mcps1.2.4.1.3 "><p id="p92011257837"><a name="p92011257837"></a><a name="p92011257837"></a><strong id="b1369212222269"><a name="b1369212222269"></a><a name="b1369212222269"></a>bus</strong>: bus number of the USB device.</p>
<p id="p19705183371613"><a name="p19705183371613"></a><a name="p19705183371613"></a><strong id="b316683132616"><a name="b316683132616"></a><a name="b316683132616"></a>port</strong>: port number of the USB device.</p>
</td>
</tr>
<tr id="row92018571731"><td class="cellrowborder" valign="top" width="15.370000000000001%" headers="mcps1.2.4.1.1 "><p id="p820117571731"><a name="p820117571731"></a><a name="p820117571731"></a>drive</p>
</td>
<td class="cellrowborder" valign="top" width="23.52%" headers="mcps1.2.4.1.2 "><p id="p123208121020"><a name="p123208121020"></a><a name="p123208121020"></a>The <strong id="b3139153515276"><a name="b3139153515276"></a><a name="b3139153515276"></a>address</strong> type is storage device address, indicating the owning disk controller and its position on the bus.</p>
</td>
<td class="cellrowborder" valign="top" width="61.11%" headers="mcps1.2.4.1.3 "><p id="p3201357231"><a name="p3201357231"></a><a name="p3201357231"></a><strong id="b158903378465"><a name="b158903378465"></a><a name="b158903378465"></a>controller</strong>: the number of the owning controller.</p>
<p id="p1389922903710"><a name="p1389922903710"></a><a name="p1389922903710"></a><strong id="b45961940114910"><a name="b45961940114910"></a><a name="b45961940114910"></a>bus</strong>: channel number of the device output.</p>
<p id="p621944515379"><a name="p621944515379"></a><a name="p621944515379"></a><strong id="b5576162615154"><a name="b5576162615154"></a><a name="b5576162615154"></a>target</strong>: target number of the storage device.</p>
<p id="p567815011374"><a name="p567815011374"></a><a name="p567815011374"></a><strong id="b3736142191712"><a name="b3736142191712"></a><a name="b3736142191712"></a>unit</strong>: lun number of the storage device.</p>
</td>
</tr>
</tbody>
</table>

#### Configuration Example

This example shows the topology of a PCIe bus. Three PCIe-Root-Port controllers are mounted to the PCIe root node \(BUS 0\). The multifunction function is enabled for the first PCIe-Root-Port controller \(BUS 1\). A PCIe-to-PCI-bridge controller is mounted to the first PCIe-Root-Port controller to form a PCI bus \(BUS 3\). A virtio-serial device and a USB 2.0 controller are mounted to the PCI bus. A SCSI controller is mounted to the second PCIe-Root-Port controller \(BUS 2\). No device is mounted to the third PCIe-Root-Port controller \(BUS 0\). The configuration details are as follows:

```
<domain type='kvm'>
    ...
    <devices>
        <controller type='pci' index='0' model='pcie-root'/>
	<controller type='pci' index='1' model='pcie-root-port'>
	    <address type='pci' domain='0x0000' bus='0x00' slot='0x01' function='0x0' multifunction='on'/>
	</controller>
	<controller type='pci' index='2' model='pcie-root-port'>
	    <address type='pci' domain='0x0000' bus='0x00' slot='0x01' function='0x1'/>
	</controller>
	<controller type='pci' index='3' model='pcie-to-pci-bridge'>
	    <model name='pcie-pci-bridge'/>
	    <address type='pci' domain='0x0000' bus='0x01' slot='0x00' function='0x0'/>
	</controller>
	<controller type='pci' index='4' model='pcie-root-port'>
	    <address type='pci' domain='0x0000' bus='0x00' slot='0x01' function='0x2'/>
	</controller>
	<controller type='scsi' index='0' model='virtio-scsi'>
	    <address type='pci' domain='0x0000' bus='0x02' slot='0x00' function='0x0'/>
	</controller>
	<controller type='virtio-serial' index='0'>
	    <address type='pci' domain='0x0000' bus='0x03' slot='0x02' function='0x0'/>
	</controller>
	<controller type='usb' index='0' model='ehci'>
	    <address type='pci' domain='0x0000' bus='0x03' slot='0x01' function='0x0'/>
	</controller>
	...
	</devices>
</domain>
```

### Other Common Devices

#### Overview

In addition to storage devices and network devices, some external devices need to be specified in the XML configuration file. This section describes how to configure these elements.

#### Elements

-   **serial**: serial port device

    Attribute  **type**: specifies the serial port type. The common attribute values are  **pty**,  **tcp**,  **pipe**, and  **file**.


-   **video**: media device

    **type**  attribute: media device type The common attribute value of the AArch architecture is  **virtio**, and that of the x86\_64 architecture is  **vga**  or  **cirrus**.

    Subelement  **model**: subelement of  **video**, which is used to specify the media device type.

    In the subelement  **model**, if  **type**  is set to  **vga**, a Video Graphics Array \(VGA\) video card is configured.  **vram**  indicates the size of the video RAM, in KB by default.

    For example, if a 16 MB VGA video card is configured for an x86\_64 VM, configuration in the XML file is as follows. In the example, the value of  **vram**  is the size of video RAM, in KB by default.

    ```
    <video>
        <model type='vga' vram='16384' heads='1' primary='yes'/>
    </video>
    ```

-   **input**: output device

    **type**  attribute: specifies the type of the output device. The common attribute values are  **tabe**  and  **keyboard**, indicating that the output device is the tablet and keyboard respectively.

    **bus**: specifies the bus to be mounted. The common attribute value is  **USB**.

-   **emulator**: emulator application path
-   **graphics**: graphics device

    **type**  attribute: specifies the type of a graphics device. The common attribute value is  **vnc**.

    **listen**  attribute: specifies the IP address to be listened to.


#### Configuration Example

For example, in the following example, the VM emulator path, pty serial port, VirtIO media device, USB tablet, USB keyboard, and VNC graphics device are configured.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>When  **type**  of  **graphics**  is set to  **VNC**, you are advised to set the  **passwd**  attribute, that is, the password for logging in to the VM using VNC.  

```
<domain type='kvm'>
    ...
    <devices>
        <emulator>/usr/libexec/qemu-kvm</emulator>
        <console type='pty'/>
        <video>
            <model type='virtio'/>
        </video>
        <input type='tablet' bus='usb'/>
        <input type='keyboard' bus='usb'/>
        <graphics type='vnc' listen='0.0.0.0' passwd='n8VfjbFK'/>
	...
	</devices>
</domain>
```

## Configurations Related to the System Architecture

### Overview

The XML configuration file contain configurations related to the system architecture, which cover the mainboard, CPU, and some features related to the architecture. This section describes meanings of these configurations.

### Elements

-   **os**: defines VM startup parameters.

    Subelement  **type**: specifies the VM type. The attribute  **arch**  indicates the architecture type, for example, AArch64. The attribute  **machine**  indicates the type of VM chipset. Supported chipset type can be queried by running the  **qemu-kvm -machine ?**  command. For example, the AArch64 architecture supports the  **virt**  type.

    Subelement  **loader**: specifies the firmware to be loaded, for example, the UEFI file provided by the EDK. The  **readonly**  attribute indicates whether the file is read-only. The value can be  **yes**  or  **no**. The  **type**  attribute indicates the  **loader**  type. The common values are  **rom**  and  **pflash**.

    Subelement  **nvram**: specifies the path of the  **nvram**  file, which is used to store the UEFI startup configuration.


-   **features**: Hypervisor controls some VM CPU/machine features, such as the advanced configuration and power interface \(ACPI\) and the GICv3 interrupt controller specified by the ARM processor.

### Example for AArch64 Architecture

The VM is of the  **aarch64**  type and uses  **virt**  chipset. The VM configuration started using UEFI is as follows:

```
<domain type='kvm'>
    ...
    <os>
        <type arch='aarch64' machine='virt'>hvm</type>
        <loader readonly='yes' type='pflash'>/usr/share/edk2/aarch64/QEMU_EFI-pflash.raw</loader>
        <nvram>/var/lib/libvirt/qemu/nvram/openEulerVM.fd</nvram>
    </os>
    ...
</domain>
```

Configure ACPI and GIC V3 interrupt controller features for the VM.

```
<features>
    <acpi/>
    <gic version='3'/>
</features>
```

### Example for x86\_64 Architecture

The x86\_64 architecture supports both BIOS and UEFI boot modes. If  **loader**  is not configured, the default BIOS boot mode is used. The following is a configuration example in which the UEFI boot mode and Q35 chipsets are used.

```
<domain type='kvm'>
    ...
    <os>
        <type arch='x86_64' machine='q35'>hvm</type>
        <loader type='rom'>/usr/share/edk2/ovmf/OVMF.fd</loader>
    </os>
    ...
</domain>
```

## Other Common Configuration Items

### Overview

In addition to system resources and virtual devices, other elements need to be configured in the XML configuration file. This section describes how to configure these elements.

### Elements

-   **iothreads**: specifies the number of  **iothread**, which can be used to accelerate storage device performance.

-   **on\_poweroff**: action taken when a VM is powered off.
-   **on\_reboot**: action taken when a VM is rebooted.
-   **on\_crash**: action taken when a VM is on crash.
-   **clock**: indicates the clock type.

    **offset**  attribute: specifies the VM clock synchronization type. The value can be  **localtime**,  **utc**,  **timezone**, or  **variable**.


### Configuration Example

Configure two  **iothread**  for the VM to accelerate storage device performance.

```
<iothreads>2</iothreads>
```

Destroy the VM when it is powered off.

```
<on_poweroff>destroy</on_poweroff>
```

Restart the VM.

```
<on_reboot>restart</on_reboot>
```

Restart the VM when it is crashed.

```
<on_crash>restart</on_crash>
```

The clock uses the  **utc**  synchronization mode.

```
<clock offset='utc'/>
```

## XML Configuration File Example

### Overview

This section provides XML configuration files of a basic AArch64 VM and a x86\_64 VM as two examples for reference.

### Example 1

An XML configuration file of AArch64 VM, which contains basic elements. The following is a configuration example:

```
<domain type='kvm'>
    <name>openEulerVM</name>
    <memory unit='GiB'>8</memory>
    <vcpu>4</vcpu>
    <os>
	<type arch='aarch64' machine='virt'>hvm</type>
	<loader readonly='yes' type='pflash'>/usr/share/edk2/aarch64/QEMU_EFI-pflash.raw</loader>
	<nvram>/var/lib/libvirt/qemu/nvram/openEulerVM.fd</nvram>
    </os>
    <features>
	<acpi/>
	<gic version='3'/>
    </features>
    <cpu mode='host-passthrough'>
        <topology sockets='2' cores='2' threads='1'/>
    </cpu>
    <iothreads>1</iothreads>
    <clock offset='utc'/>
    <on_poweroff>destroy</on_poweroff>
    <on_reboot>restart</on_reboot>
    <on_crash>restart</on_crash>
    <devices>
	<emulator>/usr/libexec/qemu-kvm</emulator>
	<disk type='file' device='disk'>
	    <driver name='qemu' type='qcow2' iothread="1"/>
	    <source file='/mnt/openEuler-image.qcow2'/>
	    <target dev='vda' bus='virtio'/>
	    <boot order='1'/>
	</disk>
	<disk type='file' device='cdrom'>
	    <driver name='qemu' type='raw'/>
	    <source file='/mnt/openEuler-20.03-LTS-aarch64-dvd.iso'/>
	    <readonly/>
	    <target dev='sdb' bus='scsi'/>
	    <boot order='2'/>
	</disk>
	<interface type='bridge'>
	    <source bridge='br0'/>
	    <model type='virtio'/>
	</interface>
	<console type='pty'/>
        <video>
           <model type='virtio'/>
        </video>
        <controller type='scsi' index='0' model='virtio-scsi'/>
	<controller type='usb' model='ehci'/>
	<input type='tablet' bus='usb'/>
	<input type='keyboard' bus='usb'/>
	<graphics type='vnc' listen='0.0.0.0' passwd='n8VfjbFK'/>
    </devices>
</domain>
```

### Example 2

An XML configuration file of x86\_64 VM, which contains basic elements and bus elements. The following is a configuration example:

```
<domain type='kvm'>
  <name>openEulerVM</name>
  <memory unit='KiB'>8388608</memory>
  <currentMemory unit='KiB'>8388608</currentMemory>
  <vcpu placement='static'>4</vcpu>
  <iothreads>1</iothreads>
  <os>
    <type arch='x86_64' machine='pc-i440fx-4.0'>hvm</type>
  </os>
  <features>
    <acpi/>
  </features>
  <cpu mode='host-passthrough' check='none'>
    <topology sockets='2' cores='2' threads='1'/>
  </cpu>
  <clock offset='utc'/>
  <on_poweroff>destroy</on_poweroff>
  <on_reboot>restart</on_reboot>
  <on_crash>restart</on_crash>
  <devices>
    <emulator>/usr/libexec/qemu-kvm</emulator>
    <disk type='file' device='disk'>
      <driver name='qemu' type='qcow2' iothread='1'/>
      <source file='/mnt/openEuler-image.qcow2'/>
      <target dev='vda' bus='virtio'/>
      <boot order='1'/>
      <address type='pci' domain='0x0000' bus='0x00' slot='0x08' function='0x0'/>
    </disk>
    <controller type='scsi' index='0' model='virtio-scsi'>
    </controller>
    <controller type='virtio-serial' index='0'>
    </controller>
    <controller type='usb' index='0' model='ehci'>
    </controller>
    <controller type='sata' index='0'>
    </controller>
    <controller type='pci' index='0' model='pci-root'/>
    <interface type='bridge'>
      <mac address='52:54:00:c1:c4:23'/>
      <source bridge='virbr0'/>
      <model type='virtio'/>
    </interface>
    <serial type='pty'>
      <target type='isa-serial' port='0'>
        <model name='isa-serial'/>
      </target>
    </serial>
    <console type='pty'>
      <target type='serial' port='0'/>
    </console>
    <input type='tablet' bus='usb'>
      <address type='usb' bus='0' port='1'/>
    </input>
    <input type='keyboard' bus='usb'>
      <address type='usb' bus='0' port='2'/>
    </input>
    <input type='mouse' bus='ps2'/>
    <input type='keyboard' bus='ps2'/>
    <graphics type='vnc' port='-1' autoport='yes' listen='0.0.0.0'>
      <listen type='address' address='0.0.0.0'/>
    </graphics>
    <video>
      <model type='vga' vram='16384' heads='1' primary='yes'/>
      <address type='pci' domain='0x0000' bus='0x00' slot='0x02' function='0x0'/>
    </video>
    <memballoon model='virtio'>
    </memballoon>
  </devices>
</domain>
```
