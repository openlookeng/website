# Best Practices

- [Best Practices](#best-practices)
    - [Performance Best Practices](#performance-best-practices)
        - [Halt-Polling](#halt-polling)
        - [I/O Thread Configuration](#i-o-thread-configuration)
        - [Raw Device Mapping](#raw-device-mapping)
        - [kworker Isolation and Binding](#kworker-isolation-and-binding)
        - [HugePage Memory](#hugepage-memory)
    - [Security Best Practices](#security-best-practices)
        - [Libvirt Authentication](#libvirt-authentication)
        - [qemu-ga](#qemu-ga)
        - [sVirt Protection](#svirt-protection)

## Performance Best Practices

### Halt-Polling

#### Overview

If compute resources are sufficient, the halt-polling feature can be used to enable VMs to obtain performance similar to that of physical machines. If the halt-polling feature is not enabled, the host allocates CPU resources to other processes when the vCPU exits due to idle timeout. When the halt-polling feature is enabled on the host, the vCPU of the VM performs polling when it is idle. The polling duration depends on the actual configuration. If the vCPU is woken up during the polling, the vCPU can continue to run without being scheduled from the host. This reduces the scheduling overhead and improves the VM system performance.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>The halt-polling mechanism ensures that the vCPU thread of the VM responds in a timely manner. However, when the VM has no load, the host also performs polling. As a result, the host detects that the CPU usage of the vCPU is high, but the actual CPU usage of the VM is not high.  

#### Instructions

The halt-polling feature is enabled by default. You can dynamically change the halt-polling time of vCPU by modifying the  **halt\_poll\_ns**  file. The default value is  **500000**, in ns.

For example, to set the polling duration to 400,000 ns, run the following command:

```
# echo 400000 > /sys/module/kvm/parameters/halt_poll_ns
```

### I/O Thread Configuration

#### Overview

By default, QEMU main threads handle backend VM read and write operations on the KVM. This causes the following issues:

-   VM I/O requests are processed by a QEMU main thread. Therefore, the single-thread CPU usage becomes the bottleneck of VM I/O performance.
-   The QEMU global lock \(qemu\_global\_mutex\) is used when VM I/O requests are processed by the QEMU main thread. If the I/O processing takes a long time, the QEMU main thread will occupy the global lock for a long time. As a result, the VM vCPU cannot be scheduled properly, affecting the overall VM performance and user experience.

You can configure the I/O thread attribute for the virtio-blk disk or virtio-scsi controller. At the QEMU backend, an I/O thread is used to process read and write requests of a virtual disk. The mapping relationship between the I/O thread and the virtio-blk disk or virtio-scsi controller can be a one-to-one relationship to minimize the impact on the QEMU main thread, enhance the overall I/O performance of the VM, and improve user experience.

#### Configuration Description

To use I/O threads to process VM disk read and write requests, you need to modify VM configurations as follows:

-   Configure the total number of high-performance virtual disks on the VM. For example, set  **<iothreads\>**  to  **4**  to control the total number of I/O threads.

    ```
    <domain type='kvm' xmlns:qemu='http://libvirt.org/schemas/domain/qemu/1.0'>   
         <name>VMName</name>
         <memory>4194304</memory>
         <currentMemory>4194304</currentMemory>
         <vcpu>4</vcpu>
         <iothreads>4</iothreads>
    ```

-   Configure the I/O thread attribute for the virtio-blk disk.  **<iothread\>**  indicates I/O thread IDs. The IDs start from 1 and each ID must be unique. The maximum ID is the value of  **<iothreads\>**. For example, to allocate I/O thread 2 to the virtio-blk disk, set parameters as follows:

    ```
    <disk type='file' device='disk'>
          <driver name='qemu' type='raw' cache='none' io='native' iothread='2'/>
          <source file='/path/test.raw'/>
          <target dev='vdb' bus='virtio'/>
          <address type='pci' domain='0x0000' bus='0x00' slot='0x05' function='0x0'/>
    </disk>
    ```

-   Configure the I/O thread attribute for the virtio-scsi controller. For example, to allocate I/O thread 2 to the virtio-scsi controller, set parameters as follows:

    ```
    <controller type='scsi' index='0' model='virtio-scsi'>
          <driver iothread='2'/>
          <alias name='scsi0'/>
          <address type='pci' domain='0x0000' bus='0x00' slot='0x04' function='0x0'/>
    </controller>
    ```

-   Bind I/O threads to a physical CPU.

    Binding I/O threads to specified physical CPUs does not affect the resource usage of vCPU threads.  **<iothread\>**  indicates I/O thread IDs, and  **<cpuset\>**  indicates IDs of the bound physical CPUs.

    ```
    <cputune>
    <iothreadpin iothread='1' cpuset='1-3,5,7-12' />
    <iothreadpin iothread='2' cpuset='1-3,5,7-12' />
    </cputune>
    ```


### Raw Device Mapping

#### Overview

When configuring VM storage devices, you can use configuration files to configure virtual disks for VMs, or connect block devices \(such as physical LUNs and LVs\) to VMs for use to improve storage performance. The latter configuration method is called raw device mapping \(RDM\). Through RDM, a virtual disk is presented as a small computer system interface \(SCSI\) device to the VM and supports most SCSI commands.

RDM can be classified into virtual RDM and physical RDM based on backend implementation features. Compared with virtual RDM, physical RDM provides better performance and more SCSI commands. However, for physical RDM, the entire SCSI disk needs to be mounted to a VM for use. If partitions or logical volumes are used for configuration, the VM cannot identify the disk.

#### Configuration Example

VM configuration files need to be modified for RDM. The following is a configuration example.

-   Virtual RDM

    The following is an example of mounting the SCSI disk  **/dev/sdc**  on the host to the VM as a virtual raw device:

    ```
    <domain type='kvm'>
     <devices>
        ...
        <controller type='scsi' model='virtio-scsi' index='0'/>
        <disk type='block' device='disk'>
            <driver name='qemu' type='raw' cache='none' io='native'/>
            <source dev='/dev/sdc'/>
            <target dev='sdc' bus='scsi'/>
            <address type='drive' controller='0' bus='0' target='0' unit='0'/>
        </disk>
        ...
     </devices>
    </domain>
    ```


-   Physical RDM

    The following is an example of mounting the SCSI disk  **/dev/sdc**  on the host to the VM as a physical raw device:

    ```
    <domain type='kvm'>
     <devices>
        ...
        <controller type='scsi' model='virtio-scsi' index='0'/>
        <disk type='block' device='lun' rawio='yes'>
            <driver name='qemu' type='raw' cache='none' io='native'/>
            <source dev='/dev/sdc'/>
            <target dev='sdc' bus='scsi'/>
            <address type='drive' controller='0' bus='0' target='0' unit='0'/>
        </disk>
        ...
     </devices>
    </domain>
    ```


### kworker Isolation and Binding

#### Overview

kworker is a per-CPU thread implemented by the Linux kernel. It is used to execute workqueue requests in the system. kworker threads will compete for physical core resources with vCPU threads, resulting in virtualization service performance jitter. To ensure that the VM can run stably and reduce the interference of kworker threads on the VM, you can bind kworker threads on the host to a specific CPU.

#### Instructions

You can modify the  **/sys/devices/virtual/workqueue/cpumask**  file to bind tasks in the workqueue to the CPU specified by  **cpumasks**. Masks in  **cpumask**  are in hexadecimal format. For example, if you need to bind kworker to CPU0 to CPU7, run the following command to change the mask to  **ff**:

```
# echo ff > /sys/devices/virtual/workqueue/cpumask
```

### HugePage Memory

#### Overview

Compared with traditional 4 KB memory paging, openEuler also supports 2 MB/1 GB memory paging. HugePage memory can effectively reduce TLB misses and significantly improve the performance of memory-intensive services. openEuler uses two technologies to implement HugePage memory.

-   Static HugePages

    The static HugePage requires that a static HugePage pool be reserved before the host OS is loaded. When creating a VM, you can modify the XML configuration file to specify that the VM memory is allocated from the static HugePage pool. The static HugePage ensures that all memory of a VM exists on the host as the HugePage to ensure physical continuity. However, the deployment difficulty is increased. After the page size of the static HugePage pool is changed, the host needs to be restarted for the change to take effect. The size of a static HugePage can be 2 MB or 1 GB.


-   THP

    If the transparent HugePage \(THP\) mode is enabled, the VM automatically selects available 2 MB consecutive pages and automatically splits and combines HugePages when allocating memory. When no 2 MB consecutive pages are available, the VM selects available 64 KB \(AArch64 architecture\) or 4 KB \(x86\_64 architecture\) pages for allocation. By using THP, users do not need to be aware of it and 2 MB HugePages can be used to improve memory access performance.


If VMs use static HugePages, you can disable THP to reduce the overhead of the host OS and ensure stable VM performance.

#### Instructions

-   Configure static HugePages.

    Before creating a VM, modify the XML file to configure a static HugePage for the VM.

    ```
      <memoryBacking>
        <hugepages>
          <page size='1' unit='GiB'/>
        </hugepages>
      </memoryBacking>
    ```

    The preceding XML segment indicates that a 1 GB static HugePage is configured for the VM.

    ```
      <memoryBacking>
        <hugepages>
          <page size='2' unit='MiB'/>
        </hugepages>
      </memoryBacking>
    ```

    The preceding XML segment indicates that a 2 MB static HugePage is configured for the VM.

-   Configure transparent HugePage.

    Dynamically enable the THP through sysfs.

    ```
    # echo always > /sys/kernel/mm/transparent_hugepage/enabled
    ```

    Dynamically disable the THP.

    ```
    # echo never > /sys/kernel/mm/transparent_hugepage/enabled
    ```


## security Best Practices

### Libvirt Authentication

#### Overview

When a user uses libvirt remote invocation but no authentication is performed, any third-party program that connects to the host's network can operate VMs through the libvirt remote invocation mechanism. This poses security risks. To improve system security, openEuler provides the libvirt authentication function. That is, users can remotely invoke a VM through libvirt only after identity authentication. Only specified users can access the VM, thereby protecting VMs on the network.

#### Enabling Libvirt Authentication

By default, the libvirt remote invocation function is disabled on openEuler. This following describes how to enable the libvirt remote invocation and libvirt authentication functions.

1.  Log in to the host.
2.  Modify the libvirt service configuration file  **/etc/libvirt/libvirtd.conf**  to enable the libvirt remote invocation and libvirt authentication functions. For example, to enable the TCP remote invocation that is based on the Simple Authentication and Security Layer \(SASL\) framework, configure parameters by referring to the following:

    ```
    #Transport layer security protocol. The value 0 indicates that the protocol is disabled, and the value 1 indicates that the protocol is enabled. You can set the value as needed.
    listen_tls = 0
    #Enable the TCP remote invocation. To enable the libvirt remote invocation and libvirt authentication functions, set the value to 1.
    listen_tcp = 1
    #User-defined protocol configuration for TCP remote invocation. The following uses sasl as an example.
    auth_tcp = "sasl" 
    ```

3.  Modify the  **/etc/sasl2/libvirt.conf**  configuration file to set the SASL mechanism and SASLDB.

    ```
    #Authentication mechanism of the SASL framework.
    mech_list: digest-md5
    #Database for storing usernames and passwords
    sasldb_path: /etc/libvirt/passwd.db
    ```

4.  Add the user for SASL authentication and set the password. Take the user  **userName**  as an example. The command is as follows:

    ```
    # saslpasswd2 -a libvirt userName
    Password:
    Again (for verification):
    ```

5.  Modify the  **/etc/sysconfig/libvirtd**  configuration file to enable the libvirt listening option.

    ```
    LIBVIRTD_ARGS="--listen"
    ```

6.  Restart the libvirtd service to make the modification to take effect.

    ```
    # systemctl restart libvirtd
    ```

7.  Check whether the authentication function for libvirt remote invocation takes effect. Enter the username and password as prompted. If the libvirt service is successfully connected, the function is successfully enabled.

    ```
    # virsh -c qemu+tcp://192.168.0.1/system
    Please enter your authentication name: openeuler
    Please enter your password:
    Welcome to virsh, the virtualization interactive terminal.
    
    Type:  'help' for help with commands
           'quit' to quit
    
    virsh #
    ```


#### Managing SASL

The following describes how to manage SASL users.

-   Query an existing user in the database.

    ```
    # sasldblistusers2 -f /etc/libvirt/passwd.db
    user@localhost.localdomain: userPassword
    ```

-   Delete a user from the database.

    ```
    # saslpasswd2 -a libvirt -d user
    ```


### qemu-ga

#### Overview

QEMU guest agent \(qemu-ga\) is a daemon running within VMs. It allows users on a host OS to perform various management operations on the guest OS through outband channels provided by QEMU. The operations include file operations \(open, read, write, close, seek, and flush\), internal shutdown, VM suspend \(suspend-disk, suspend-ram, and suspend-hybrid\), and obtaining of VM internal information \(including the memory, CPU, NIC, and OS information\).

In some scenarios with high security requirements, qemu-ga provides the blacklist function to prevent internal information leakage of VMs. You can use a blacklist to selectively shield some functions provided by qemu-ga.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>The qemu-ga installation package is  **qemu-guest-agent-**_xx_**.rpm**. It is not installed on openEuler by default.  _xx_  indicates the actual version number.  

#### Procedure

To add a qemu-ga blacklist, perform the following steps:

1.  Log in to the VM and ensure that the qemu-guest-agent service exists and is running.

    ```
    # systemctl status qemu-guest-agent |grep Active
       Active: active (running) since Wed 2018-03-28 08:17:33 CST; 9h ago
    ```

2.  Query which  **qemu-ga**  commands can be added to the blacklist:

    ```
    # qemu-ga --blacklist ?
    guest-sync-delimited
    guest-sync
    guest-ping
    guest-get-time
    guest-set-time
    guest-info
    ...
    ```


1.  Set the blacklist. Add the commands to be shielded to  **--blacklist**  in the  **/usr/lib/systemd/system/qemu-guest-agent.service**  file. Use spaces to separate different commands. For example, to add the  **guest-file-open**  and  **guest-file-close**  commands to the blacklist, configure the file by referring to the following:

    ```
    [Service]
    ExecStart=-/usr/bin/qemu-ga \
          --blacklist=guest-file-open guest-file-close
    ```


1.  Restart the qemu-guest-agent service.

    ```
    # systemctl daemon-reload
    # systemctl restart qemu-guest-agent
    ```

2.  Check whether the qemu-ga blacklist function takes effect on the VM, that is, whether the  **--blacklist**  parameter configured for the qemu-ga process is correct.

    ```
    # ps -ef|grep qemu-ga|grep -E "blacklist=|b="
    root       727     1  0 08:17 ?        00:00:00 /usr/bin/qemu-ga --method=virtio-serial --path=/dev/virtio-ports/org.qemu.guest_agent.0 --blacklist=guest-file-open guest-file-close guest-file-read guest-file-write guest-file-seek guest-file-flush -F/etc/qemu-ga/fsfreeze-hook
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >For more information about qemu-ga, visit  [https://wiki.qemu.org/Features/GuestAgent](https://wiki.qemu.org/Features/GuestAgent).  


### sVirt Protection

#### Overview

In a virtualization environment that uses the discretionary access control \(DAC\) policy only, malicious VMs running on hosts may attack the hypervisor or other VMs. To improve security in virtualization scenarios, openEuler uses sVirt for protection. sVirt is a security protection technology based on SELinux. It is applicable to KVM virtualization scenarios. A VM is a common process on the host OS. In the hypervisor, the sVirt mechanism labels QEMU processes corresponding to VMs with SELinux labels. In addition to types which are used to label virtualization processes and files, different categories are used to label different VMs. Each VM can access only file devices of the same category. This prevents VMs from accessing files and devices on unauthorized hosts or other VMs, thereby preventing VM escape and improving host and VM security.

#### Enabling sVirt Protection

1.  Enable SELinux on the host.
    1.  Log in to the host.
    2.  Enable the SELinux function on the host.
        1.  Modify the system startup parameter file  **grub.cfg**  to set  **selinux**  to  **1**.

            ```
            selinux=1
            ```

        2.  Modify  **/etc/selinux/config**  to set the  **SELINUX**  to  **enforcing**.

            ```
            SELINUX=enforcing
            ```

    3.  Restart the host.

        ```
        # reboot
        ```



1.  Create a VM where the sVirt function is enabled.
    1.  Add the following information to the VM configuration file:

        ```
        <seclabel type='dynamic' model='selinux' relabel='yes'/>
        ```

        Or check whether the following configuration exists in the file:

        ```
        <seclabel type='none' model='selinux'/>
        ```

    2.  Create a VM.

        ```
        # virsh define openEulerVM.xml
        ```

2.  Check whether sVirt is enabled.

    Run the following command to check whether sVirt protection has been enabled for the QEMU process of the running VM. If  **svirt\_t:s0:c**  exists, sVirt protection has been enabled.

    ```
    # ps -eZ|grep qemu |grep "svirt_t:s0:c"
    system_u:system_r:svirt_t:s0:c200,c947 11359 ? 00:03:59 qemu-kvm
    system_u:system_r:svirt_t:s0:c427,c670 13790 ? 19:02:07 qemu-kvm
    ```


