# Managing Devices

- [Managing Devices](#managing-devices)
    - [Configuring a PCIe Controller for a VM](#configuring-a-pcie-controller-for-a-vm)
    - [Managing Virtual Disks](#managing-virtual-disks)
    - [Managing vNICs](#managing-vnics)
    - [Configuring a Virtual Serial Port](#configuring-a-virtual-serial-port)
    - [Managing Device Passthrough](#managing-device-passthrough)
        - [PCI Passthrough](#pci-passthrough)
        - [SR-IOV Passthrough](#sr-iov-passthrough)
    - [Managing VM USB](#managing-vm-usb)
        - [Configuring USB Controllers](#configuring-usb-controllers)
        - [Configuring a USB Passthrough Device](#configuring-a-usb-passthrough-device)
    - [Storing Snapshots](#storing-snapshots)


## Configuring a PCIe Controller for a VM

### Overview

Thr NIC, disk controller, and PCIe pass-through devices in a VM must be mounted to a PCIe root port. Each root port corresponds to a PCIe slot. The devices mounted to the root port support hot swap, but the root port does not support hot swap. Therefore, users need to consider the hot swap requirements and plan the maximum number of PCIe root ports reserved for the VM. Before the VM is started, the root port is statically configured.

### Configuring the PCIe Root, PCIe Root Port, and PCIe-PCI-Bridge

The VM PCIe controller is configured using the XML file. The  **model**  corresponding to PCIe root, PCIe root port, and PCIe-PCI-bridge in the XML file are  **pcie-root**,  **pcie-root-port**, and  **pcie-to-pci-bridge**, respectively.

-   Simplified configuration method

    Add the following contents to the XML file of the VM. Other attributes of the controller are automatically filled by libvirt.

    ```
      <controller type='pci' index='0' model='pcie-root'/>
      <controller type='pci' index='1' model='pcie-root-port'/>
      <controller type='pci' index='2' model='pcie-to-pci-bridge'/>
      <controller type='pci' index='3' model='pcie-root-port'/>
      <controller type='pci' index='4' model='pcie-root-port'/>
      <controller type='pci' index='5' model='pcie-root-port'/>
    ```

    The  **pcie-root**  and  **pcie-to-pci-bridge**  occupy one  **index**  respectively. Therefore, the final  **index**  is the number of required  **root ports + 1**.

-   Complete configuration method

    Add the following contents to the XML file of the VM:

    ```
      <controller type='pci' index='0' model='pcie-root'/>
      <controller type='pci' index='1' model='pcie-root-port'>
        <model name='pcie-root-port'/>
        <target chassis='1' port='0x8'/>
        <address type='pci' domain='0x0000' bus='0x00' slot='0x01' function='0x0' multifunction='on'/>
      </controller>
      <controller type='pci' index='2' model='pcie-to-pci-bridge'>
        <model name='pcie-pci-bridge'/>
        <address type='pci' domain='0x0000' bus='0x01' slot='0x00' function='0x0'/>
      </controller>
      <controller type='pci' index='3' model='pcie-root-port'>
        <model name='pcie-root-port'/>
        <target chassis='3' port='0x9'/>
        <address type='pci' domain='0x0000' bus='0x00' slot='0x01' function='0x1'/>
      </controller>
      <controller type='pci' index='3' model='pcie-root-port'>
    ```

    In the preceding contents:

    -   The  **chassis**  and  **port**  attributes of the root port must be in ascending order. Because a PCIe-PCI-bridge is inserted in the middle, the  **chassis**  number skips  **2**, but the  **port**  numbers are still consecutive.
    -   The  **address function**  of the root port ranges from  **0\*0**  to  **0\*7**.
    -   A maximum of eight functions can be mounted to each slot. When the slot is full, the slot number increases.

    The complete configuration method is complex. Therefore, the simplified one is recommended.


## Managing Virtual Disks

### Overview

Virtual disk types include virtio-blk, virtio-scsi, and vhost-scsi. virtio-blk simulates a block device, and virtio-scsi and vhost-scsi simulate SCSI devices.

-   virtio-blk: It can be used for common system disk and data disk. In this configuration, the virtual disk is presented as  **vd\[a-z\]**  or  **vd\[a-z\]\[a-z\]**  in the VM.
-   virtio-scsi: It is recommended for common system disk and data disk. In this configuration, the virtual disk is presented as  **sd\[a-z\]**  or  **sd\[a-z\]\[a-z\]**  in the VM.
-   vhost-scsi: It is recommended for the virtual disk that has high performance requirements. In this configuration, the virtual disk is presented as  **sd\[a-z\]**  or  **sd\[a-z\]\[a-z\]**  on the VM.

### Procedure

For details about how to configure a virtual disk, see  [3.2.4.1 Storage Devices](#storage-devices). This section uses the virtio-scsi disk as an example to describe how to attach and detach a virtual disk.

-   Attach a virtio-scsi disk.

    Run the  **virsh attach-device**  command to attach the virtio-scsi virtual disk.

    ```
     # virsh attach-device <VMInstance> <attach-device.xml>
    ```

    The preceding command can be used to attach a disk to a VM online. The disk information is specified in the  **attach-device.xml**  file. The following is an example of the  **attach-device.xml**  file:

    ```
    ### attach-device.xml ###
        <disk type='file' device='disk'>
          <driver name='qemu' type='qcow2' cache='none' io='native'/>
          <source file='/path/to/another/qcow2-file'/>
          <backingStore/>
          <target dev='sdb' bus='scsi'/>
          <address type='drive' controller='0' bus='0' target='1' unit='0'/>
        </disk>
    ```

    The disk attached by running the preceding commands becomes invalid after the VM is shut down and restarted. If you need to permanently attach a virtual disk to a VM, run the  **virsh attach-device**  command with the  **--config**  parameter.

-   Detach a virtio-scsi disk.

    If a disk attached online is no longer used, run the  **virsh detach**  command to dynamically detach it.

    ```
     # virsh detach-device <VMInstance> <detach-device.xml>
    ```

    **detach-device.xml**  specifies the XML information of the disk to be detached, which must be the same as the XML information during dynamic attachment.


## Managing vNICs

### Overview

The vNIC types include virtio-net, vhost-net, and vhost-user. After creating a VM, you may need to attach or detach a vNIC. openEuler supports NIC hot swap, which can change the network throughput and improve system flexibility and scalability.

### Procedure

For details about how to configure a virtual NIC, see  [3.2.4.2 Network Devices](#network-device). This section uses the vhost-net NIC as an example to describe how to attach and detach a vNIC.

-   Attach the vhost-net NIC.

    Run the  **virsh attach-device**  command to attach the vhost-net vNIC.

    ```
     # virsh attach-device <VMInstance> <attach-device.xml>
    ```

    The preceding command can be used to attach a vhost-net NIC to a running VM. The NIC information is specified in the  **attach-device.xml**  file. The following is an example of the  **attach-device.xml**  file:

    ```
    ### attach-device.xml ###
        <interface type='bridge'>
          <mac address='52:54:00:76:f2:bb'/>
          <source bridge='br0'/>
          <virtualport type='openvswitch'/>
          <model type='virtio'/>
          <driver name='vhost' queues='2'/>
        </interface>
    ```

    The vhost-net NIC attached using the preceding commands becomes invalid after the VM is shut down and restarted. If you need to permanently attach a vNIC to a VM, run the  **virsh attach-device**  command with the  **--config**  parameter.

-   Detach the vhost-net NIC.

    If a NIC attached online is no longer used, run the  **virsh detach**  command to dynamically detach it.

    ```
     # virsh detach-device <VMInstance> <detach-device.xml>
    ```

    **detach-device.xml**  specifies the XML information of the vNIC to be detached, which must be the same as the XML information during dynamic attachment.


## Configuring a Virtual Serial Port

### Overview

In a virtualization environment, VMs and host machines need to communicate with each other to meet management and service requirements. However, in the complex network architecture of the cloud management system, services running on the management plane and VMs running on the service plane cannot communicate with each other at layer 3. As a result, service deployment and information collection are not fast enough. Therefore, a virtual serial port is required for communication between VMs and host machines. You can add serial port configuration items to the XML configuration file of a VM to implement communication between VMs and host machines.

### Procedure

The Linux VM serial port console is a pseudo terminal device connected to the host machine through the serial port of the VM. It implements interactive operations on the VM through the host machine. In this scenario, the serial port needs to be configured in the pty type. This section describes how to configure a pty serial port.

-   Add the following virtual serial port configuration items under the  **devices**  node in the XML configuration file of the VM:

    ```
        <serial type='pty'>
        </serial>
        <console type='pty'>
          <target type='serial'/>
        </console>
    ```

-   Run the  **virsh console**  command to connect to the pty serial port of the running VM.

    ```
    # virsh console <VMInstance>
    ```

-   To ensure that no serial port message is missed, use the  **--console**  option to connect to the serial port when starting the VM.

    ```
    # virsh start --console <VMInstance>
    ```


## Managing Device Passthrough

The device passthrough technology enables VMs to directly access physical devices. The I/O performance of VMs can be improved in this way.

Currently, the VFIO passthrough is used. It can be classified into PCI passthrough and SR-IOV passthrough based on device type.

### PCI Passthrough

PCI passthrough directly assigns a physical PCI device on the host to a VM. The VM can directly access the device. PCI passthrough uses the VFIO device passthrough mode. The PCI passthrough configuration file in XML format for a VM is as follows:

```
<hostdev mode='subsystem' type='pci' managed='yes'>   
    <driver name='vfio'/> 
    <source>
        <address domain='0x0000' bus='0x04' slot='0x10' function='0x01'/>
    </source>
    <rom bar='off'/>
    <address type='pci' domain='0x0000' bus='0x00' slot='0x03' function='0x0'/>
</hostdev>
```

**Table  1**  Device configuration items for PCI passthrough


<table><thead align="left"><tr id="row185697150377"><th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.2.4.1.1"><p id="p13570115123719"><a name="p13570115123719"></a><a name="p13570115123719"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.2.4.1.2"><p id="p1570015153716"><a name="p1570015153716"></a><a name="p1570015153716"></a>Description</p>
</th>
<th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.2.4.1.3"><p id="p3570115123711"><a name="p3570115123711"></a><a name="p3570115123711"></a>Value</p>
</th>
</tr>
</thead>
<tbody><tr id="row857017157375"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p16570191513372"><a name="p16570191513372"></a><a name="p16570191513372"></a>hostdev.source.address.domain</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p05702152379"><a name="p05702152379"></a><a name="p05702152379"></a>Domain ID of the PCI device on the host OS.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p257051583710"><a name="p257051583710"></a><a name="p257051583710"></a>≥ 0</p>
</td>
</tr>
<tr id="row4570171513716"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p124981022478"><a name="p124981022478"></a><a name="p124981022478"></a>hostdev.source.address.bus</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p1570101593717"><a name="p1570101593717"></a><a name="p1570101593717"></a>Bus ID of the PCI device on the host OS.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p10570161513717"><a name="p10570161513717"></a><a name="p10570161513717"></a>≥ 1</p>
</td>
</tr>
<tr id="row9570141518379"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p155701615203718"><a name="p155701615203718"></a><a name="p155701615203718"></a>hostdev.source.address.slot</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p55701515193714"><a name="p55701515193714"></a><a name="p55701515193714"></a>Device ID of the PCI device on the host OS.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p75701315123715"><a name="p75701315123715"></a><a name="p75701315123715"></a>≥ 0</p>
</td>
</tr>
<tr id="row10570171593713"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p21023329490"><a name="p21023329490"></a><a name="p21023329490"></a>hostdev.source.address.function</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p1657061593715"><a name="p1657061593715"></a><a name="p1657061593715"></a>Function ID of the PCI device on the host OS.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p85707159374"><a name="p85707159374"></a><a name="p85707159374"></a>≥ 0</p>
</td>
</tr>
<tr id="row125708153375"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p119491912175015"><a name="p119491912175015"></a><a name="p119491912175015"></a>hostdev.driver.name</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p157091543710"><a name="p157091543710"></a><a name="p157091543710"></a>Backend driver of PCI passthrough. This parameter is optional.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p105701015103719"><a name="p105701015103719"></a><a name="p105701015103719"></a><strong id="b786191616436"><a name="b786191616436"></a><a name="b786191616436"></a>vfio</strong> (default value)</p>
</td>
</tr>
<tr id="row145701015173717"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p195701715123711"><a name="p195701715123711"></a><a name="p195701715123711"></a>hostdev.rom</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p1057010157379"><a name="p1057010157379"></a><a name="p1057010157379"></a>Specifies whether the VM can access the ROM of the passthrough device.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p55705153378"><a name="p55705153378"></a><a name="p55705153378"></a>This parameter can be set to <strong id="b19245193774513"><a name="b19245193774513"></a><a name="b19245193774513"></a>on</strong> or <strong id="b1264443974517"><a name="b1264443974517"></a><a name="b1264443974517"></a>off</strong>. The default value is <strong id="b5402171644411"><a name="b5402171644411"></a><a name="b5402171644411"></a>on</strong>.</p>
<a name="ul1937231571"></a><a name="ul1937231571"></a><ul id="ul1937231571"><li><strong id="b345358194616"><a name="b345358194616"></a><a name="b345358194616"></a>on</strong>: indicates that the VM can access the ROM of the passthrough device. For example, if a VM with a passthrough NIC needs to boot from the preboot execution environment (PXE), or a VM with a passthrough Host Bus Adapter (HBA) card needs to boot from the ROM, you can set this parameter to <strong id="b878213613481"><a name="b878213613481"></a><a name="b878213613481"></a>on</strong>.</li><li><strong id="b97161513154618"><a name="b97161513154618"></a><a name="b97161513154618"></a>off</strong>: indicates that the VM cannot access the ROM of the passthrough device.</li></ul>
</td>
</tr>
<tr id="row20570201563712"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p1057013151371"><a name="p1057013151371"></a><a name="p1057013151371"></a>hostdev.address type</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p6570201510374"><a name="p6570201510374"></a><a name="p6570201510374"></a>Bus, Device, and Function (BDF) IDs on the guest OS displayed on the PCI device.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p1257011153370"><a name="p1257011153370"></a><a name="p1257011153370"></a>[0x03–0x1e] (range of slot ID)</p>
<p id="p878711532216"><a name="p878711532216"></a><a name="p878711532216"></a>Note:</p>
<a name="ul8885104953013"></a><a name="ul8885104953013"></a><ul id="ul8885104953013"><li><strong id="b134861629498"><a name="b134861629498"></a><a name="b134861629498"></a>domain</strong> indicates the domain information, <strong id="b1426413644914"><a name="b1426413644914"></a><a name="b1426413644914"></a>bus</strong> indicates the bus ID, <strong id="b1924131155210"><a name="b1924131155210"></a><a name="b1924131155210"></a>slot</strong> indicates the slot ID, and <strong id="b11341741135315"><a name="b11341741135315"></a><a name="b11341741135315"></a>function</strong> indicates the function.</li><li>Except for <strong id="b1037113613554"><a name="b1037113613554"></a><a name="b1037113613554"></a>slot</strong>, default values of these parameters are <strong id="b131425655411"><a name="b131425655411"></a><a name="b131425655411"></a>0</strong>.</li><li>The first slot <strong id="b17504125910578"><a name="b17504125910578"></a><a name="b17504125910578"></a>0x00</strong> is occupied by the system, the second slot <strong id="b551216212589"><a name="b551216212589"></a><a name="b551216212589"></a>0x01</strong> is occupied by the IDE controller and USB controller, and the third slot <strong id="b18706152316582"><a name="b18706152316582"></a><a name="b18706152316582"></a>0x02</strong> is occupied by the video.</li><li>The last slot <strong id="b128813261506"><a name="b128813261506"></a><a name="b128813261506"></a>0x1f</strong> is occupied by the PV channel.</li></ul>
</td>
</tr>
</tbody>
</table>

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>VFIO passthrough is implemented by IOMMU group. Devices are divided to IOMMU groups based on access control services \(ACS\) on hardware. Devices in the same IOMMU group can be assigned to only one VM. If multiple functions on a PCI device belong to the same IOMMU group, they can be directly assigned to only one VM as well.  

### SR-IOV Passthrough

#### Overview

Single Root I/O Virtualization \(SR-IOV\) is a hardware-based virtualization solution. With the SR-IOV technology, a physical function \(PF\) can provide multiple virtual functions \(VFs\), and each VF can be directly assigned to a VM. This greatly improves hardware resource utilization and I/O performance of VMs. A typical application scenario is SR-IOV passthrough for NICs. With the SR-IOV technology, a physical NIC \(PF\) can function as multiple VF NICs, and then the VFs can be directly assigned to VMs.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>-   SR-IOV requires the support of physical hardware. Before using SR-IOV, ensure that the hardware device to be directly assigned supports SR-IOV and the device driver on the host OS works in SR-IOV mode.  
>-   The following describes how to query the NIC model:  
>In the following command output, values in the first column indicate the PCI numbers of NICs, and  **19e5:1822**  indicates the vendor ID and device ID of the NIC.  

>```
># lspci | grep Ether  
>05:00.0 Ethernet controller: Device 19e5:1822 (rev 45)  
>07:00.0 Ethernet controller: Device 19e5:1822 (rev 45)  
>09:00.0 Ethernet controller: Device 19e5:1822 (rev 45)  
>0b:00.0 Ethernet controller: Device 19e5:1822 (rev 45)  
>81:00.0 Ethernet controller: Intel Corporation 82599ES 10-Gigabit SFI/SFP+ Network Connection (rev 01)  
>81:00.1 Ethernet controller: Intel Corporation 82599ES 10-Gigabit SFI/SFP+ Network Connection (rev 01)  
```


#### Procedure

To configure SR-IOV passthrough for a NIC, perform the following steps:

1.  Enable the SR-IOV mode for the NIC.
    1.  Ensure that VF driver support provided by the NIC supplier exists on the guest OS. Otherwise, VFs in the guest OS cannot work properly.
    2.  Enable the SMMU/IOMMU support in the BIOS of the host OS. The enabling method varies depending on the servers of different vendors. For details, see the help documents of the servers.
    3.  Configure the host driver to enable the SR-IOV VF mode. The following uses the Hi1822 NIC as an example to describe how to enable 16 VFs.

        ```
        echo 16 > /sys/class/net/ethX/device/sriov_numvfs
        ```

2.  Obtain the PCI BDF information of PFs and VFs.
    1.  Run the following command to obtain the NIC resource list on the current board:

        ```
        # lspci | grep Eth
        03:00.0 Ethernet controller: Huawei Technologies Co., Ltd. Hi1822 Family (4*25GE) (rev 45)
        04:00.0 Ethernet controller: Huawei Technologies Co., Ltd. Hi1822 Family (4*25GE) (rev 45)
        05:00.0 Ethernet controller: Huawei Technologies Co., Ltd. Hi1822 Family (4*25GE) (rev 45)
        06:00.0 Ethernet controller: Huawei Technologies Co., Ltd. Hi1822 Family (4*25GE) (rev 45)
        7d:00.0 Ethernet controller: Huawei Technologies Co., Ltd. Device a222 (rev 20)
        7d:00.1 Ethernet controller: Huawei Technologies Co., Ltd. Device a222 (rev 20)
        7d:00.2 Ethernet controller: Huawei Technologies Co., Ltd. Device a221 (rev 20)
        7d:00.3 Ethernet controller: Huawei Technologies Co., Ltd. Device a221 (rev 20)
        ```

    2.  Run the following command to view the PCI BDF information of VFs:

        ```
        # lspci | grep "Virtual Function"
        03:00.1 Ethernet controller: Huawei Technologies Co., Ltd. Hi1822 Family Virtual Function (rev 45)
        03:00.2 Ethernet controller: Huawei Technologies Co., Ltd. Hi1822 Family Virtual Function (rev 45)
        03:00.3 Ethernet controller: Huawei Technologies Co., Ltd. Hi1822 Family Virtual Function (rev 45)
        03:00.4 Ethernet controller: Huawei Technologies Co., Ltd. Hi1822 Family Virtual Function (rev 45)
        03:00.5 Ethernet controller: Huawei Technologies Co., Ltd. Hi1822 Family Virtual Function (rev 45)
        03:00.6 Ethernet controller: Huawei Technologies Co., Ltd. Hi1822 Family Virtual Function (rev 45)
        03:00.7 Ethernet controller: Huawei Technologies Co., Ltd. Hi1822 Family Virtual Function (rev 45)
        03:01.0 Ethernet controller: Huawei Technologies Co., Ltd. Hi1822 Family Virtual Function (rev 45)
        03:01.1 Ethernet controller: Huawei Technologies Co., Ltd. Hi1822 Family Virtual Function (rev 45)
        03:01.2 Ethernet controller: Huawei Technologies Co., Ltd. Hi1822 Family Virtual Function (rev 45)
        ```

    3.  Select an available VF and write its configuration to the VM configuration file based on its BDF information. For example, the bus ID of the device  **03:00.1**  is  **03**, its slot ID is  **00**, and its function ID is  **1**.

3.  Identify and manage the mapping between PFs and VFs.
    1.  Identify VFs corresponding to a PF. The following uses PF 03.00.0 as an example:

        ```
        # ls -l /sys/bus/pci/devices/0000\:03\:00.0/
        ```

        The following symbolic link information is displayed. You can obtain the VF IDs \(virtfnX\) and PCI BDF IDs based on the information.

    2.  Identify the PF corresponding to a VF. The following uses VF 03:00.1 as an example:

        ```
        # ls -l /sys/bus/pci/devices/0000\:03\:00.1/
        ```

        The following symbolic link information is displayed. You can obtain PCI BDF IDs of the PF based on the information.

        ```
        lrwxrwxrwx 1 root root       0 Mar 28 22:44 physfn -> ../0000:03:00.0
        ```

    3.  Obtain names of NICs corresponding to the PFs or VFs. For example:

        ```
        # ls /sys/bus/pci/devices/0000:03:00.0/net
        eth0
        ```

    4.  Set the MAC address, VLAN, and QoS information of VFs to ensure that the VFs are in the  **Up**  state before passthrough. The following uses VF 03:00.1 as an example. The PF is eth0 and the VF ID is  **0**.

        ```
        # ip link set eth0 vf 0 mac 90:E2:BA:21:XX:XX    #Sets the MAC address.
        # ifconfig eth0 up
        # ip link set eth0 vf 0 rate 100                 #Sets the VF outbound rate, in Mbit/s.
        # ip link show eth0                              #Views the MAC address, VLAN ID, and QoS information to check whether the configuration is successful.
        ```

4.  Mount the SR-IOV NIC to the VM.

    When creating a VM, add the SR-IOV passthrough configuration item to the VM configuration file.

    ```
    <interface type='hostdev' managed='yes'> 
        <mac address='fa:16:3e:0a:xx:xx'/>
        <source> 
            <address type='pci' domain='0x0000' bus='0x06' slot='0x11' function='0x6'/>
        </source> 
        <vlan>
            <tag id='1'/>
        </vlan>
    </interface>
    ```

    **Table  1**  SR-IOV configuration options

    
    <table><thead align="left"><tr id="row877075112560"><th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.2.4.1.1"><p id="p1877045125616"><a name="p1877045125616"></a><a name="p1877045125616"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.2.4.1.2"><p id="p9770185145613"><a name="p9770185145613"></a><a name="p9770185145613"></a>Description</p>
    </th>
    <th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.2.4.1.3"><p id="p177075115613"><a name="p177075115613"></a><a name="p177075115613"></a>Value</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="row1777010512568"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p477015111561"><a name="p477015111561"></a><a name="p477015111561"></a>hostdev.managed</p>
    </td>
    <td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p137715514569"><a name="p137715514569"></a><a name="p137715514569"></a>Two modes for libvirt to process PCI devices.</p>
    </td>
    <td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p4700154714613"><a name="p4700154714613"></a><a name="p4700154714613"></a><strong id="b11241112235417"><a name="b11241112235417"></a><a name="b11241112235417"></a>no</strong>: default value. The passthrough device is managed by the user.</p>
    <p id="p1475810591229"><a name="p1475810591229"></a><a name="p1475810591229"></a><strong id="b17808933105518"><a name="b17808933105518"></a><a name="b17808933105518"></a>yes</strong>: The passthrough device is managed by libvirt. Set this parameter to <strong id="b7799131015568"><a name="b7799131015568"></a><a name="b7799131015568"></a>yes</strong> in the SR-IOV passthrough scenario.</p>
    </td>
    </tr>
    <tr id="row37711751195619"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p677145110569"><a name="p677145110569"></a><a name="p677145110569"></a>hostdev.source.address.bus</p>
    </td>
    <td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p777135145611"><a name="p777135145611"></a><a name="p777135145611"></a>Bus ID of the PCI device on the host OS.</p>
    </td>
    <td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p117712512560"><a name="p117712512560"></a><a name="p117712512560"></a>≥ 1</p>
    </td>
    </tr>
    <tr id="row1577115113567"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p187711451175612"><a name="p187711451175612"></a><a name="p187711451175612"></a>hostdev.source.address.slot</p>
    </td>
    <td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p18771135119563"><a name="p18771135119563"></a><a name="p18771135119563"></a>Device ID of the PCI device on the host OS.</p>
    </td>
    <td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p1277125114561"><a name="p1277125114561"></a><a name="p1277125114561"></a>≥ 0</p>
    </td>
    </tr>
    <tr id="row127711651205613"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p10771135155616"><a name="p10771135155616"></a><a name="p10771135155616"></a>hostdev.source.address.function</p>
    </td>
    <td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p1777185195618"><a name="p1777185195618"></a><a name="p1777185195618"></a>Function ID of the PCI device on the host OS.</p>
    </td>
    <td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p10771195118568"><a name="p10771195118568"></a><a name="p10771195118568"></a>≥ 0</p>
    </td>
    </tr>
    </tbody>
    </table>

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >Disabling the SR-IOV function:  
    >To disable the SR-IOV function after the VM is stopped and no VF is in use, run the following command:  
    >The following uses the Hi1822 NIC \(corresponding network interface name: eth0\) as an example:  
    >```  
    >echo 0 > /sys/class/net/eth0/device/sriov_numvfs  
    >```


## Managing VM USB

To facilitate the use of USB devices such as USB key devices and USB mass storage devices on VMs, openEuler provides the USB device passthrough function. Through USB passthrough and hot-swappable interfaces, you can configure USB passthrough devices for VMs, or hot swap USB devices when VMs are running.

### Configuring USB Controllers

#### Overview

A USB controller is a virtual controller that provides specific USB functions for USB devices on VMs. To use USB devices on a VM, you must configure USB controllers for the VM. Currently, openEuler supports the following types of USB controllers:

-   Universal host controller interface \(UHCI\): also called the USB 1.1 host controller specification.
-   Enhanced host controller interface \(EHCI\): also called the USB 2.0 host controller specification.
-   Extensible host controller interface \(xHCI\): also called the USB 3.0 host controller specification.

#### Precautions

-   The host server must have USB controller hardware and modules that support USB 1.1, USB 2.0, and USB 3.0 specifications.
-   You need to configure USB controllers for the VM by following the order of USB 1.1, USB 2.0, and USB 3.0.
-   An xHCI controller has eight ports and can be mounted with a maximum of four USB 3.0 devices and four USB 2.0 devices. An EHCI controller has six ports and can be mounted with a maximum of six USB 2.0 devices. A UHCI controller has two ports and can be mounted with a maximum of two USB 1.1 devices.
-   On each VM, only one USB controller of the same type can be configured.
-   USB controllers cannot be hot swapped.
-   If the USB 3.0 driver is not installed on a VM, the xHCI controller may not be identified. For details about how to download and install the USB 3.0 driver, refer to the official description provided by the corresponding OS distributor.
-   To ensure the compatibility of the OS, set the bus ID of the USB controller to  **0**  when configuring a USB tablet for the VM. The tablet is mounted to the USB 1.1 controller by default.

#### Configuration Methods

The following describes the configuration items of USB controllers for a VM. You are advised to configure USB 1.1, USB 2.0, and USB 3.0 to ensure the VM is compatible with three types of devices.

The configuration item of the USB 1.1 controller \(UHCI\) in the XML configuration file is as follows:

```
<controller type='usb' index='0' model='piix3-uhci'>
</controller>
```

The configuration item of the USB 2.0 controller \(EHCI\) in the XML configuration file is as follows:

```
<controller type='usb' index='1' model='ehci'>
</controller>
```

The configuration item of the USB 3.0 controller \(xHCI\) in the XML configuration file is as follows:

```
<controller type='usb' index='2' model='nec-xhci'>
</controller>
```

### Configuring a USB Passthrough Device

#### Overview

After USB controllers are configured for a VM, a physical USB device on the host can be mounted to the VM through device passthrough for the VM to use. In the virtualization scenario, in addition to static configuration, hot swapping the USB device is supported. That is, the USB device can be mounted or unmounted when the VM is running.

#### Precautions

-   A USB device can be assigned to only one VM.
-   A VM with a USB passthrough device does not support live migration.
-   VM creation fails if no USB passthrough devices exist in the VM configuration file.
-   Forcibly hot removing a USB storage device that is performing read or write operation may damage files in the USB storage device.

#### Configuration Description

The following describes the configuration items of a USB device for a VM.

Description of the USB device in the XML configuration file:

```
<hostdev mode='subsystem' type='usb' managed='yes'>
    <source>        
        <address bus='m' device='n'/>
    </source>
    <address type='usb' bus='x' port='y'/>
</hostdev>
```

-   **<address bus='**_m_**'device='**_n_**'/\>**:  _m_  indicates the USB bus address on the host, and  _n_  indicates the device ID.
-   **<address type='usb'bus='**_x_**'port='**_y_**'\>**: indicates that the USB device is to be mounted to the USB controller specified on the VM.  _x_  indicates the controller ID, which corresponds to the index number of the USB controller configured on the VM.  _y_  indicates the port address. When configuring a USB passthrough device, you need to set this parameter to ensure that the controller to which the device is mounted is as expected.

#### Configuration Methods

To configure USB passthrough, perform the following steps:

1.  Configure USB controllers for the VM. For details, see  [Configuring USB Controllers](#configuring-usb-controllers).
2.  Query information about the USB device on the host.

    Run the  **lsusb**  command \(the  **usbutils**  software package needs to be installed\) to query the USB device information on the host, including the bus address, device address, device vendor ID, device ID, and product description. For example:

    ```
    # lsusb
    ```

    ```
    Bus 008 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
    Bus 007 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
    Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
    Bus 004 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub
    Bus 006 Device 002: ID 0bda:0411 Realtek Semiconductor Corp. 
    Bus 006 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
    Bus 005 Device 003: ID 136b:0003 STEC 
    Bus 005 Device 002: ID 0bda:5411 Realtek Semiconductor Corp. 
    Bus 005 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
    Bus 001 Device 003: ID 12d1:0003 Huawei Technologies Co., Ltd. 
    Bus 001 Device 002: ID 0bda:5411 Realtek Semiconductor Corp. 
    Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
    Bus 003 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub
    ```

3.  Prepare the XML description file of the USB device. Before hot removing the device, ensure that the USB device is not in use. Otherwise, data may be lost.
4.  Run the hot swapping commands.

    Take a VM whose name is  **openEulerVM**  as an example. The corresponding configuration file is  **usb.xml**.

    -   Hot adding of the USB device takes effect only for the current running VM. After the VM is restarted, hot add the USB device again.

        ```
        # virsh attach-device openEulerVM usb.xml --live
        ```

    -   Complete persistency configurations for hot adding of the USB device. After the VM is restarted, the USB device is automatically assigned to the VM.

        ```
        # virsh attach-device openEulerVM usb.xml --config
        ```

    -   Hot removing of the USB device takes effect only for the current running VM. After the VM is restarted, the USB device with persistency configurations is automatically assigned to the VM.

        ```
        # virsh detach-device openEulerVM usb.xml --live
        ```

    -   Complete persistency configurations for hot removing of the USB device.

        ```
        # virsh detach-device openEulerVM usb.xml --config
        ```



## Storing Snapshots

### Overview

The VM system may be damaged due to virus damage, system file deletion by mistake, or incorrect formatting. As a result, the system cannot be started. To quickly restore a damaged system, openEuler provides the storage snapshot function. openEuler can create a snapshot that records the VM status at specific time points without informing users \(usually within a few seconds\). The snapshot can be used to restore the VM to the status when the snapshots were taken. For example, a damaged system can be quickly restored with the help of snapshots, which improves system reliability.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>Currently, storage snapshots can be QCOW2 and RAW images only. Block devices are not supported.  

### Procedure

To create VM storage snapshots, perform the following steps:

1.  Log in to the host and run the  **virsh domblklist**  command to query the disk used by the VM.

    ```
    # virsh domblklist openEulerVM
      Target   Source
     ---------------------------------------------
      vda      /mnt/openEuler-image.qcow2
    ```


1.  Run the following command to create the VM disk snapshot  **openEuler-snapshot1.qcow2**:

    ```
    # virsh snapshot-create-as --domain openEulerVM --disk-only --diskspec vda,snapshot=external,file=/mnt/openEuler-snapshot1.qcow2 --atomic
    Domain snapshot 1582605802 created
    ```


1.  Run the following command to query disk snapshots:

    ```
    # virsh snapshot-list openEulerVM
     Name         Creation Time               State
    ---------------------------------------------------------
     1582605802   2020-02-25 12:43:22 +0800   disk-snapshot
    ```

