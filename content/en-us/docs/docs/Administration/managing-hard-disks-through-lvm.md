# Managing Hard Disks Through LVM
<!-- TOC -->

- [Managing Hard Disks Through LVM](#managing-hard-disks-through-lvm)
    - [LVM Overview](#lvm-overview)
        - [Basic Terms](#basic-terms)
    - [Installing the LVM](#installing-the-lvm)
    - [Managing PVs](#managing-pvs)
        - [Creating a PV](#creating-a-pv)
        - [Viewing a PV](#viewing-a-pv)
        - [Modifying PV Attributes](#modifying-pv-attributes)
        - [Deleting a PV](#deleting-a-pv)
    - [Managing VGs](#managing-vgs)
        - [Creating a VG](#creating-a-vg)
        - [Viewing a VG](#viewing-a-vg)
        - [Modifying VG Attributes](#modifying-vg-attributes)
        - [Extending a VG](#extending-a-vg)
        - [Shrinking a VG](#shrinking-a-vg)
        - [Deleting a VG](#deleting-a-vg)
    - [Managing LVs](#managing-lvs)
        - [Creating an LV](#creating-an-lv)
        - [Viewing an LV](#viewing-an-lv)
        - [Adjusting the LV Size](#adjusting-the-lv-size)
        - [Extending an LV](#extending-an-lv)
        - [Shrinking an LV](#shrinking-an-lv)
        - [Deleting an LV](#deleting-an-lv)
    - [Creating and Mounting a File System](#creating-and-mounting-a-file-system)
        - [Creating a File System](#creating-a-file-system)
        - [Manually Mounting a File System](#manually-mounting-a-file-system)
        - [Automatically Mounting a File System](#automatically-mounting-a-file-system)

<!-- /TOC -->


## LVM Overview

Logical Volume Manager \(LVM\) is a mechanism used for managing disk partitions in Linux. By adding a logical layer between disks and file systems, LVM shields the disk partition layout for file systems, thereby improving flexibility in managing disk partitions.

The procedure of managing a disk through LVM is as follows:

1.  Create physical volumes for a disk.
2.  Combine several physical volumes into a volume group.
3.  Create logical volumes in the volume group.
4.  Create file systems on logical volumes.

When disks are managed using LVM, file systems are distributed on multiple disks and can be easily resized as needed. Therefore, file system space will no longer be limited by disk capacities.

### Basic Terms
-   Physical media: refers to physical storage devices in the system, such as hard disks \(**/dev/hda**  and  **/dev/sda**\). It is the storage unit at the lowest layer of the storage system.

-   Physical volume \(PV\): refers to a disk partition or device \(such as a RAID\) that has the same logical functions as a disk partition. PVs are basic logical storage blocks of LVM. A PV contains a special label that is stored in the second 512-byte sector by default. It can also be stored in one of the first four sectors. A label contains the universal unique identifier \(UUID\) of the PV, size of the block device, and the storage location of LVM metadata in the device.

-   Volume group \(VG\): consists of PVs and shields the details of underlying PVs. You can create one or more logical volumes within a VG without considering detailed PV information.

-   Logical volume \(LV\): A VG cannot be used directly. It can be used only after being partitioned into LVs. LVs can be formatted into different file systems and can be directly used after being mounted.

-   Physical extent \(PE\): A PE is a small storage unit in a PV. The PE size is the same as the size of the logical extent in the VG.

-   Logical extent \(LE\): An LE is a small storage unit in an LV. In one VG, the LEs of all the LVs have the same size.

## Installing the LVM

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>The LVM has been installed on the openEuler OS by default. You can run the  **rpm -qa | grep lvm2**  command to check whether it is installed. If the command output contains "lvm2", the LVM has been installed. In this case, skip this section. If no information is output, the LVM is not installed. Install it by referring to this section.  

1.  Configure the local yum source. For details, see  [Configuring the Repo Server](configuring-the-repo-server.html).
2.  Clear the cache.

    ```
    $ dnf clean all
    ```

3.  Create a cache.

    ```
    $ dnf makecache
    ```

4.  Install the LVM as the **root** user.

    ```
    # dnf install lvm2
    ```

5.  Check the installed RPM package.

    ```
    $ rpm -qa | grep lvm2
    ```


## Managing PVs

### Creating a PV
Run the  **pvcreate**  command as the **root** user to create a PV.

```
pvcreate [option] devname ...
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    -   **-f**: forcibly creates a PV without user confirmation.
    -   **-u**: specifies the UUID of the device.
    -   **-y**: answers yes to all questions.

-   _devname_: specifies the name of the device corresponding to the PV to be created. If multiple PVs need to be created in batches, set this option to multiple device names and separate the names with spaces.

Example 1: Create PVs based on  **/dev/sdb**  and  **/dev/sdc**.

```
# pvcreate /dev/sdb /dev/sdc
```

Example 2: Create PVs based on  **/dev/sdb1**  and  **/dev/sdb2**.

```
# pvcreate /dev/sdb1 /dev/sdb2
```

### Viewing a PV
Run the  **pvdisplay**  command as the **root** user to view PV information, including PV name, VG to which the PV belongs, PV size, PE size, total number of PEs, number of available PEs, number of allocated PEs, and UUID.

```
pvdisplay [option] devname
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    -   **-s**: outputs information in short format.
    -   **-m**: displays the mapping from PEs to LEs.

-   _devname_: indicates the device corresponding to the PV to be viewed. If no PVs are specified, information about all PVs is displayed.

Example: Run the following command to display the basic information about the PV  **/dev/sdb**:

```
# pvdisplay /dev/sdb
```

### Modifying PV Attributes
Run the  **pvchange**  command as the **root** user to modify the attributes of a PV.

```
pvchange [option] pvname ...
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    -   **-u**: generates a new UUID.
    -   **-x**: indicates whether PE allocation is allowed.

-   _pvname_: specifies the name of the device corresponding to the PV to be modified. If multiple PVs need to be modified in batches, set this option to multiple device names and separate the names with spaces.

Example: Run the following command to prohibit PEs on the PV  **/dev/sdb**  from being allocated.

```
# pvchange -x n /dev/sdb
```

### Deleting a PV
Run the  **pvremove**  command as the **root** user to delete a PV.

```
pvremove [option] pvname ...
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    -   **-f**: forcibly deletes a PV without user confirmation.
    -   **-y**: answers yes to all questions.

-   _pvname_: specifies the name of the device corresponding to the PV to be deleted. If multiple PVs need to be deleted in batches, set this option to multiple device names and separate the names with spaces.

Example: Run the following command to delete the PV  **/dev/sdb**:

```
# pvremove /dev/sdb
```

## Managing VGs

### Creating a VG
Run the  **vgcreate**  command as the **root** user to create a VG.

```
vgcreate [option] vgname pvname ...
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    -   **-l**: specifies the maximum number of LVs that can be created on the VG.
    -   **-p**: specifies the maximum number of PVs that can be added to the VG.
    -   **-s**: specifies the PE size of a PV in the VG.

-   _vgname_: name of the VG to be created.
-   _pvname_: name of the PV to be added to the VG.

Example: Run the following command to create VG  **vg1**  and add the PVs  **/dev/sdb**  and  **/dev/sdc**  to the VG.

```
# vgcreate vg1 /dev/sdb /dev/sdc  
```

### Viewing a VG
Run the  **vgdisplay**  command as the **root** user to view VG information.

```
vgdisplay [option] [vgname]
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    -   **-s**: outputs information in short format.
    -   **-A**: displays only attributes of active VGs.

-   _vgname_: name of the VG to be viewed. If no VGs are specified, information about all VGs is displayed.

Example: Run the following command to display the basic information about VG  **vg1**:

```
# vgdisplay vg1
```

### Modifying VG Attributes
Run the  **vgchange**  command as the **root** user to modify the attributes of a VG.

```
vgchange [option] vgname
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    -   **-a**: sets the active status of the VG.

-   _vgname_: name of the VG whose attributes are to be modified.

Example: Run the following command to change the status of  **vg1**  to active.

```
# vgchange -ay vg1
```

### Extending a VG
Run the  **vgextend**  command as the **root** user to dynamically extend a VG. In this way, the VG size is extended by adding PVs to the VG.

```
vgextend [option] vgname pvname ...
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    -   **dev**: debugging mode.
    -   **-t**: test only.

-   _vgname_: name of the VG whose size is to be extended.
-   _pvname_: name of the PV to be added to the VG.

Example: Run the following command to add PV  **/dev/sdb**  to VG  **vg1**:

```
# vgextend vg1 /dev/sdb
```

### Shrinking a VG
Run the  **vgreduce**  command as the **root** user to delete PVs from a VG to reduce the VG size. A VG must contain at least one PV.

```
vgreduce [option] vgname pvname ...
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    -   **-a**: If no PVs are specified in the command, all empty PVs are deleted.
    -   **\-\-removemissing**: deletes lost PVs in the VG to restore the VG to the normal state.

-   _vgname_: name of the VG to be shrunk.
-   _pvname_: name of the PV to be deleted from the VG.

Example: Run the following command to remove PV  **/dev/sdb2**  from VG  **vg1**:

```
# vgreduce vg1 /dev/sdb2
```

### Deleting a VG
Run the  **vgremove**  command as the **root** user to delete a VG.

```
vgremove [option] vgname
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    -   **-f**: forcibly deletes a VG without user confirmation.

-   _vgname_: name of the VG to be deleted.

Example: Run the following command to delete VG  **vg1**.

```
# vgremove vg1
```

## Managing LVs

### Creating an LV
Run the  **lvcreate**  command as the **root** user to create an LV.

```
lvcreate [option] vgname
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    -   **-L**: specifies the size of the LV in kKmMgGtT.
    -   **-l**: specifies the size of the LV \(number of LEs\).
    -   **-n**: specifies the name of the LV to be created.
    -   **-s**: creates a snapshot.

-   _vgname_: name of the VG to be created.

Example 1: Run the following command to create a 10 GB LV in VG  **vg1**.

```
# lvcreate -L 10G vg1
```

Example 2: Run the following command to create a 200 MB LV in VG  **vg1**  and name the LV  **lv1**.

```
# lvcreate -L 200M -n lv1 vg1
```

### Viewing an LV
Run the  **lvdisplay**  command as the **root** user to view the LV information, including the size of the LV, its read and write status, and snapshot information.

```
lvdisplay [option] [lvname]
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    
-   **-v**: displays the mapping from LEs to PEs.
    
-   _lvname_: device file corresponding to the LV whose attributes are to be displayed. If this option is not set, attributes of all LVs are displayed.

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >Device files corresponding to LVs are stored in the VG directory. For example, if LV  **lv1**  is created in VG  **vg1**, the device file corresponding to  **lv1**  is  **/dev/vg1/lv1**.  


Example: Run the following command to display the basic information about LV  **lv1**:

```
# lvdisplay /dev/vg1/lv1
```

### Adjusting the LV Size
Run the  **lvresize**  command as the **root** user to increase or reduce the size of an LVM LV. This may cause data loss. Therefore, exercise caution when running this command.

```
lvresize [option] vgname
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    -   **-L**: specifies the size of the LV in kKmMgGtT.
    -   **-l**: specifies the size of the LV \(number of LEs\).
    -   **-f**: forcibly adjusts the size of the LV without user confirmation.

-   _lvname_: name of the LV to be adjusted.

Example 1: Run the following command to increase the size of LV  **/dev/vg1/lv1**  by 200 MB.

```
# lvresize -L +200 /dev/vg1/lv1
```

Example 2: Run the following command to reduce the size of LV  **/dev/vg1/lv1**  by 200 MB.

```
# lvresize -L -200 /dev/vg1/lv1
```

### Extending an LV
Run the  **lvextend**  command as the **root** user to dynamically extend the size of an LV online without interrupting the access of applications to the LV.

```
lvextend [option] lvname
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    -   **-L**: specifies the size of the LV in kKmMgGtT.
    -   **-l**: specifies the size of the LV \(number of LEs\).
    -   **-f**: forcibly adjusts the size of the LV without user confirmation.

-   _lvname_: device file of the LV whose size is to be extended.

Example: Run the following command to increase the size of LV  **/dev/vg1/lv1**  by 100 MB.

```
# lvextend -L +100M /dev/vg1/lv1
```

### Shrinking an LV
Run the  **lvreduce**  command as the **root** user to reduce the size of an LV. This may delete existing data on the LV. Therefore, confirm whether the data can be deleted before running the command.

```
lvreduce [option] lvname
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    -   **-L**: specifies the size of the LV in kKmMgGtT.
    -   **-l**: specifies the size of the LV \(number of LEs\).
    -   **-f**: forcibly adjusts the size of the LV without user confirmation.

-   _lvname_: device file of the LV whose size is to be extended.

Example: Run the following command to reduce the space of LV  **/dev/vg1/lvl**  by 100 MB:

```
# lvreduce -L -100M /dev/vg1/lv1
```

### Deleting an LV
Run the  **lvremove**  command as the **root** user to delete an LV. If the LV has been mounted by running the  **mount**  command, you need to run the  **umount**  command to unmount the LV before running the  **lvremove**  command.

```
lvremove [option] vgname
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    -   **-f**: forcibly deletes an LV without user confirmation.

-   _vgname_: name of the LV to be deleted.

Example: Run the following command to delete LV  **/dev/vg1/lv1**.

```
# lvremove /dev/vg1/lv1
```

## Creating and Mounting a File System

After creating an LV, you need to create a file system on the LV and mount the file system to the corresponding directory.

### Creating a File System
Run the  **mkfs**  command as the **root** user to create a file system.

```
mkfs [option] lvname
```

In the preceding information:

-   _option_: command parameter options. Common parameter options are as follows:
    -   **-t**: specifies the type of the Linux system to be created, such as  **ext2**,  **ext3**, and  **ext4**. The default type is  **ext2**.

-   _lvname_: name of the LV device file corresponding to the file system to be created.

Example: Run the following command to create the  **ext4**  file system on LV  **/dev/vg1/lv1**:

```
# mkfs -t ext4 /dev/vg1/lv1
```

### Manually Mounting a File System
The file system that is manually mounted is not valid permanently. It does not exist after the OS is restarted.

Run the  **mount**  command as the **root** user to mount a file system.

```
mount lvname mntpath
```

In the preceding information:

-   _lvname_: name of the LV device file corresponding to the file system to be mounted.
-   _mntpath_: mount path.

Example: Run the following command to mount LV  **/dev/vg1/lv1**  to the directory  **/mnt/data**.

```
# mount /dev/vg1/lv1 /mnt/data
```

### Automatically Mounting a File System
A file system that is automatically mounted does not exist after the OS is restarted. You need to manually mount the file system again. If you perform the following steps as the **root** user after manually mounting the file system, the file system can be automatically mounted after the OS is restarted.

1.  <a name="li65701520154311"></a>Run the  **blkid**  command to query the UUID of an LV. The following uses LV  **/dev/vg1/lv1**  as an example:

    ```
    # blkid /dev/vg1/lv1
    ```

    Check the command output. It contains the following information in which  _uuidnumber_  is a string of digits, indicating the UUID, and  _fstype_  indicates the file system type.

    /dev/vg1/lv1: UUID="  _uuidnumber_  " TYPE="  _fstype_  "

2.  Run the  **vi /etc/fstab**  command to edit the  **fstab**  file and add the following content to the end of the file:

    ```
    UUID=uuidnumber  mntpath                   fstype    defaults        0 0
    ```

    In the preceding information:

    -   Column 1: indicates the UUID. Enter  _uuidnumber_  obtained in  [1](#li65701520154311).
    -   Column 2: indicates the mount directory of the file system. Replace  _mntpath_  with the actual value.
    -   Column 3: indicates the file system format. Enter  _fstype_  obtained in  [1](#li65701520154311).
    -   Column 4: indicates the mount option. In this example,  **defaults**  is used.
    -   Column 5: indicates the backup option. Enter either  **1**  \(the system automatically backs up the file system\) or  **0**  \(the system does not back up the file system\). In this example,  **0**  is used.
    -   Column 6: indicates the scanning option. Enter either  **1**  \(the system automatically scans the file system during startup\) or  **0**  \(the system does not scan the file system\). In this example,  **0**  is used.

3.  Verify the automatic mounting function.
    1.  Run the  **umount**  command to unmount the file system. The following uses LV  **/dev/vg1/lv1**  as an example:

        ```
        # umount /dev/vg1/lv1
        ```

    2.  Run the following command to reload all content in the  **/etc/fstab**  file:

        ```
        # mount -a
        ```

    3.  Run the following command to query the file system mounting information \(**/mnt/data**  is used as an example\):

        ```
        # mount | grep /mnt/data
        ```

        Check the command output. If the command output contains the following information, the automatic mounting function takes effect:

        /dev/vg1/lv1 on /mnt/data
