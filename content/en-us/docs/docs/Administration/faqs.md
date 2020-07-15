# FAQs
<!-- TOC -->

- [FAQs](#faqs)
    - [Why Is the Memory Usage of the libvirtd Service Queried by Running the systemctl and top Commands Different?](#why-is-the-memory-usage-of-the-libvirtd-service-queried-by-running-the-systemctl-and-top-commands-different)
    - [An Error Occurs When stripsize Is Set to 4 During RAID 0 Volume Configuration](#an-error-occurs-when-stripsize-is-set-to-4-during-raid-0-volume-configuration)
    - [Failed to Compile MariaDB Using rpmbuild](#failed-to-compile-mariadb-using-rpmbuild)
    - [Failed to Start the SNTP Service Using the Default Configuration](#failed-to-start-the-sntp-service-using-the-default-configuration)
    - [Installation Failure Caused by Software Package Conflict, File Conflict, or Missing Software Package](#installation-failure-caused-by-software-package-conflict-file-conflict-or-missing-software-package)

<!-- /TOC -->
## Why Is the Memory Usage of the libvirtd Service Queried by Running the systemctl and top Commands Different?

### Symptom
The output of the  **systemctl**  and  **systemd-cgtop**  commands shows that the libvirtd service occupies more than 1.5 GB memory, but the output of the  **top**  command shows that the libvirtd service occupies about 70 MB memory.

### Possible Cause
The memory displayed in the services \(including systemctl and systemd-cgtop\) managed by systemd can be obtained from  **memory.usage\_in\_bytes**  in Cgroup. Running the  **top**  command is to query the memory information in the  **/proc**  directory. The query results are different because the statistical method varies.

Generally, the memory used by service processes has the following types:

-   anon\_rss: anonymous pages in user mode address spaces, for example, memory allocated by calling the malloc function or the mmap function with configured  **MAP\_ANONYMOUS**. When the system memory is insufficient, this type of memory can be swapped by the kernel.
-   file\_rss: mapped pages in user mode address spaces, including map file \(such as mmap of a specified file\) and map tmpfs \(such as IPC shared memory\). When the system memory is insufficient, the kernel can reclaim these pages. Data may need to be synchronized between the kernel and map file before reclamation.
-   file\_cache: file cache \(page in page cache of disk file\), which is generated when a file is read or written. When the system memory is insufficient, the kernel can reclaim these pages. Data may need to be synchronized between the kernel and map file before reclamation.
-   buffer pages: belongs to page cache, for example, cache generated when block device files are read.

anon\_rss and file\_rss belong to the resident set size \(RSS\) of processes, and file\_cache and buffer pages belong to page cache. In brief:

RSS in the output of the  **top**  command = anon\_rss + file\_rss; Shared memory \(SHR\) = file\_rss

**memory.usage\_in\_bytes**  in Cgroup = cache + RSS + swap

In conclusion, the definition of memory usage obtained by running the  **systemd**  command is different from that obtained by running the  **top**  command. Therefore, the query results are different.

## An Error Occurs When stripsize Is Set to 4 During RAID 0 Volume Configuration

### Symptom
An error occurs when the  **stripsize**  parameter is set to  **4**  during RAID 0 volume configuration.

### Possible Cause
The 64 KB page table can be enabled only in the scenario where  **stripsize**  is set to  **64**.

### Solution
You do not need to modify the configuration file. When running the  **lvcreate** command on openEuler, set  **stripesize**  to  **64**  because the minimum supported stripe size is 64 KB.

## Failed to Compile MariaDB Using rpmbuild

### Symptom
When you log in to the system as user  **root**  and run the  **rpmbuild**  command to compile the MariaDB source code, the compilation fails and the following information is displayed:

```
+ echo 'mysql can'\''t run test as root'
mysql can't run test as root
+ exit 1
```

### Possible Cause
The MariaDB does not allow user  **root**  to execute test cases. However, test cases are automatically executed during compilation. As a result, the compilation process is blocked.

### Solution
Use a text editor, such as vi, to modify the value of the  **runtest**  variable in the  **mariadb.spec**  file.

Before the modification:

```
%global runtest 1
```

After the modification:

```
%global runtest 0
```

The modification disables the function of executing test cases during compilation, which does not affect the compilation and the RPM package content after compilation.

## Failed to Start the SNTP Service Using the Default Configuration

### Symptom
The SNTP service fails to be started with the default configuration.

### Possible Cause
The domain name of the NTP server is not added to the default configuration.

### Solution
Modify the  **/etc/sysconfig/sntp**  file and add the domain name of the NTP server in China:  **0.generic.pool.ntp.org**.

## Installation Failure Caused by Software Package Conflict, File Conflict, or Missing Software Package

### Symptom
Software package conflict, file conflict, or missing software packages may occur during software package installation. As a result, the upgrade is interrupted and the installation fails. The error information about software package conflict, file conflict, and missing software packages is as follows:

The following is an example of software package conflict error information \(the conflict between  **libev-libevent-devel-4.24-11.oe1.aarch64**  and  **libevent-devel-2.1.11-2.oe1.aarch64**  is used as an example\):

```
package libev-libevent-devel-4.24-11.oe1.aarch64 conflicts with libevent-devel provided by libevent-devel-2.1.11-2.oe1.aarch64  
 - cannot install the best candidate for the job  
 - conflicting requests
```

The following is an example of file conflict error information \(the  **/usr/bin/containerd**  file conflict is used as an example\):

```
Error: Transaction test error:  
 file /usr/bin/containerd from install of containerd-1.2.0-101.oe1.aarch64 conflicts with file from package docker-engine-18.09.0-100.aarch64  
 file /usr/bin/containerd-shim from install of containerd-1.2.0-101.oe1.aarch64 conflicts with file from package docker-engine-18.09.0-100.aarch64
```

The following is an example of the error message indicating that the  **blivet-data**  software package is missing:

```
Error:  
  Problem: cannot install both blivet-data-1:3.1.1-6.oe1.noarch and blivet-data-1:3.1.1-5.noarch  
   - package python2-blivet-1:3.1.1-5.noarch requires blivet-data = 1:3.1.1-5, but none of the providers can be installed  
   - cannot install the best update candidate for package blivet-data-1:3.1.1-5.noarch  
   - problem with installed package python2-blivet-1:3.1.1-5.noarch(try to add '--allowerasing' to command line to replace conflicting packages or '--skip-broken' to skip uninstallable packages or '--nobest' to use not only best candidate packages)
```

### Possible Cause
-   In the software packages provided by openEuler, some software packages have different names but the same functions. As a result, the software packages cannot be installed at the same time.
-   In the software packages provided by openEuler, some software packages have different names but the same functions. As a result, the files after installation are the same, causing file conflict.
-   Some software packages are depended on by other software packages before the upgrade. After the software packages are upgraded, the software packages that depend on them may fail to be installed due to lack of software packages.

### Solution
If a software package conflict occurs, perform the following steps \(the software package conflict in "Symptom" is used as an example\):

1.  According to the error message displayed during the installation, the software package that conflicts with the to-be-installed software package  **libev-libevent-devel-4.24-11.oe1.aarch64**  is  **libevent-devel-2.1.11-2.oe1.aarch64**.
2.  Run the  **dnf remove**  command to uninstall the software package that conflicts with the software package to be installed.

    ```
    # dnf remove libevent-devel-2.1.11-2.oe1.aarch64
    ```

3.  Perform the installation again.

If a file conflict occurs, perform the following steps \(the file conflict in "Symptom" is used as an example\):

1.  According to the error message displayed during the installation, the names of the software packages that cause the file conflict are  **containerd-1.2.0-101.oe1.aarch64**  and  **docker-engine-18.09.0-100.aarch64**.
2.  Record the names of the software packages that do not need to be installed. The following uses  **docker-engine-18.09.0-100.aarch64**  as an example.
3.  Run the  **dnf remove**  command to uninstall the software package that does not need to be installed.

    ```
    # dnf remove docker-engine-18.09.0-100.aarch64
    ```

4.  Perform the installation again.

If a software package is missing, perform the following steps \(the missed software package in "Symptom" is used as an example\):

1.  Determine the name of the software package to be upgraded \(**blivet-data-1:3.1.1-5.noarch**\) and the name of the dependent software package \(**python2-blivet-1:3.1.1-5.noarch**\) based on the error information displayed during the upgrade.
2.  Run the  **dnf remove**  command to uninstall the software package that depends on the upgrade package or add the  **\-\-allowerasing**  parameter when upgrading the software package.
    -   Run the  **dnf remove**  command to uninstall the software package that depends on the  **blivet-data-1:3.1.1-5.noarch**  software package.

        ```
        # dnf remove python2-blivet-1:3.1.1-5.noarch
        ```

    -   Add the  **\-\-allowerasing**  parameter when upgrading the software package.

        ```
        # yum update blivet-data-1:3.1.1-5.noarch -y --allowerasing
        ```

3.  Perform the upgrade again.
