# Installation Guide

This chapter describes how to install virtualization components in openEuler.

- [Installation Guide](#installation-guide)
    - [Minimum Hardware Requirements](#minimum-hardware-requirements)
    - [Installing Core Virtualization Components](#installing-core-virtualization-components)
        - [Installation Methods](#installation-methods)
        - [Verifying the Installation](#verifying-the-installation)


## Minimum Hardware Requirements

The minimum hardware requirements for installing virtualization components on openEuler are as follows:

-   AArch64 processor architecture: ARMv8 or later, supporting virtualization expansion
-   x86\_64 processor architecture, supporting VT-x
-   2-core CPU
-   4 GB memory
-   16 GB available disk space

## Installing Core Virtualization Components

### Installation Methods

#### Prerequisites

-   The yum source has been configured. For details, see  _openEuler 20.03 LTS Administrator Guide_.
-   Only the administrator has permission to perform the installation.

#### Procedure

1.  Install the QEMU component.

    ```
    # yum install -y qemu
    ```

2.  Install the libvirt component.

    ```
    # yum install -y libvirt
    ```

3.  Start the libvirtd service.

    ```
    # systemctl start libvirtd
    ```


>![](public_sys-resources/icon-note.gif) **NOTE:**   
>The KVM module is integrated in the openEuler kernel and does not need to be installed separately.  

### Verifying the Installation

1.  Check whether the kernel supports KVM virtualization, that is, check whether the  **/dev/kvm**  and  **/sys/module/kvm**  files exist. The command and output are as follows:

    ```
    # ls /dev/kvm
    /dev/kvm
    ```

    ```
    # ls /sys/module/kvm
    parameters  uevent
    ```

    If the preceding files exist, the kernel supports KVM virtualization. If the preceding files do not exist, KVM virtualization is not enabled during kernel compilation. In this case, you need to use the Linux kernel that supports KVM virtualization.

2.  Check whether QEMU is successfully installed. If the installation is successful, the QEMU software package information is displayed. The command and output are as follows:

    ```
    # rpm -qi qemu
    Name        : qemu
    Epoch       : 2
    Version     : 4.0.1
    Release     : 10
    Architecture: aarch64
    Install Date: Wed 24 Jul 2019 04:04:47 PM CST
    Group       : Unspecified
    Size        : 16869484
    License     : GPLv2 and BSD and MIT and CC-BY
    Signature   : (none)
    Source RPM  : qemu-4.0.0-1.src.rpm
    Build Date  : Wed 24 Jul 2019 04:03:52 PM CST
    Build Host  : localhost
    Relocations : (not relocatable)
    URL         : http://www.qemu.org
    Summary     : QEMU is a generic and open source machine emulator and virtualizer
    Description :
    QEMU is a generic and open source processor emulator which achieves a good
    emulation speed by using dynamic translation. QEMU has two operating modes:
    
     * Full system emulation. In this mode, QEMU emulates a full system (for
       example a PC), including a processor and various peripherials. It can be
       used to launch different Operating Systems without rebooting the PC or
       to debug system code.
     * User mode emulation. In this mode, QEMU can launch Linux processes compiled
       for one CPU on another CPU.
    
    As QEMU requires no host kernel patches to run, it is safe and easy to use.
    ```

3.  Check whether libvirt is successfully installed. If the installation is successful, the libvirt software package information is displayed. The command and output are as follows:

    ```
    # rpm -qi libvirt
    Name        : libvirt
    Version     : 5.5.0
    Release     : 1
    Architecture: aarch64
    Install Date: Tue 30 Jul 2019 04:56:21 PM CST
    Group       : Unspecified
    Size        : 0
    License     : LGPLv2+
    Signature   : (none)
    Source RPM  : libvirt-5.5.0-1.src.rpm
    Build Date  : Mon 29 Jul 2019 08:14:57 PM CST
    Build Host  : 71e8c1ce149f
    Relocations : (not relocatable)
    URL         : https://libvirt.org/
    Summary     : Library providing a simple virtualization API
    Description :
    Libvirt is a C toolkit to interact with the virtualization capabilities
    of recent versions of Linux (and other OSes). The main package includes
    the libvirtd server exporting the virtualization support.
    ```

4.  Check whether the libvirt service is started successfully. If the service is in the  **Active**  state, the service is started successfully. You can use the virsh command line tool provided by the libvirt. The command and output are as follows:

    ```
    # systemctl status libvirtd
    ● libvirtd.service - Virtualization daemon
       Loaded: loaded (/usr/lib/systemd/system/libvirtd.service; enabled; vendor preset: enabled)
       Active: active (running) since Tue 2019-08-06 09:36:01 CST; 5h 12min ago
         Docs: man:libvirtd(8)
               https://libvirt.org
     Main PID: 40754 (libvirtd)
        Tasks: 20 (limit: 32768)
       Memory: 198.6M
       CGroup: /system.slice/libvirtd.service
               ─40754 /usr/sbin/libvirtd
    
    ```


