# Installation and Deployment

- [Installation and Deployment](#installation-and-deployment-2)
    - [Precautions](#precautions)
    - [Basic Installation Configuration](#basic-installation-configuration)
        - [Daemon Parameter Configuration](#daemon-parameter-configuration)
        - [Daemon Running Directory Configuration](#daemon-running-directory-configuration)
        - [Daemon Network Configuration](#daemon-network-configuration)
        - [Daemon umask Configuration](#daemon-umask-configuration)
        - [Daemon Start Time](#daemon-start-time)
        - [Journald Component](#journald-component)
        - [Firewalld Component](#firewalld-component)
        - [Iptables Component](#iptables-component)
        - [Audit Component](#audit-component)
        - [Security Configuration seccomp](#security-configuration-seccomp)
        - [Do Not Modify Private Directory of Docker Daemon](#do-not-modify-private-directory-of-docker-daemon)
        - [Precautions for Common Users in the Scenario Where a Large Number of Containers Are Deployed](#precautions-for-common-users-in-the-scenario-where-a-large-number-of-containers-are-deployed)
    - [Storage Driver Configuration](#storage-driver-configuration)
        - [overlay2 Storage Driver Configuration](#overlay2-storage-driver-configuration)
        - [devicemapper Storage Driver Configuration](#devicemapper-storage-driver-configuration-35)
    - [Impact of Forcibly Killing Docker Background Processes](#impact-of-forcibly-killing-docker-background-processes)
        - [Semaphores May Be Residual](#semaphores-may-be-residual)
        - [NICs May Be Residual](#nics-may-be-residual)
        - [Failed to Restart a Container](#failed-to-restart-a-container)
        - [Failed to Restart the Docker Service](#failed-to-restart-the-docker-service)
    - [Impact of System Power-off](#impact-of-system-power-off)



## Precautions

-   The  **docker-engine**  RPM package cannot be installed together with the  **containerd**,  **runc**, or  **podman**  RPM package. This is because the  **docker-engine**  RPM package contains all components required for Docker running, including  **containerd**,  **runc**, and  **docker**  binary files. Yet the  **containerd**,  **runc**, and  **podman**  RPM packages also contain the corresponding binary files. Software package conflicts may occur due to repeated installation.

## Basic Installation Configuration



### Daemon Parameter Configuration

You can add configuration items to the  **/etc/docker/daemon.json**  file to customize parameters. You can run the  **dockerd --help**  command to view related configuration items and their usage methods. A configuration example is as follows:

```
cat /etc/docker/daemon.json 
{        
    "debug": true,        
    "storage-driver": "overlay2",        
    "storage-opts": ["overlay2.override_kernel_check=true"] 
}
```

### Daemon Running Directory Configuration

Re-configuring various running directories and files \(including  **--graph**  and  **--exec-root**\) may cause directory conflicts or file attribute changes, affecting the normal use of applications.

>![](public_sys-resources/icon-notice.gif) **NOTICE:**   
>Therefore, the specified directories or files should be used only by Docker to avoid file attribute changes and security issues caused by conflicts.  

-   Take  **--graph**  as an example. When  **/new/path/**  is used as the new root directory of the daemon, if a file exists in  **/new/path/**  and the directory or file name conflicts with that required by Docker \(for example,  **containers**,  **hooks**, and  **tmp**\), Docker may update the original directory or file attributes, including the owner and permission.

>![](public_sys-resources/icon-notice.gif) **NOTICE:**   
>From Docker 17.05, the  **--graph**  parameter is marked as  **Deprecated**  and replaced with the  **--data-root**  parameter.  

### Daemon Network Configuration

-   After the network segment of the docker0 bridge is specified by using the  **--bip**  parameter on Docker daemon, if the  **--bip**  parameter is deleted during the next Docker daemon restart, the docker0 bridge uses the previous value of  **--bip**, even if the docker0 bridge is deleted before the restart. The reason is that Docker saves the network configuration and restores the previous configuration by default during the next restart.
-   When running the  **docker network create**  command to concurrently create networks, you can create two networks with the same name. The reason is that Docker networks are distinguished by IDs. The name is only an alias that is easy to identify and may not be unique.
-   In the Docker bridge network mode, a Docker container establishes external communication through NAT on the host. When Docker daemon starts a Docker container, a docker-proxy process is started for each port mapped on the host to access the proxy. It is recommended that you map only the necessary ports when using userland-proxy to reduce the resources consumed by the port mapping of docker-proxy.

### Daemon umask Configuration

The default  **umask**  value of the main container process and exec process is  **0022**. To meet security specifications and prevent containers from being attacked, the default value of  **umask**  is changed to  **0027**  after runC implementation is modified. After the modification, the other groups cannot access new files or directories.

The default value of  **umask**  is  **0027**  when Docker starts a container. You can change the value to  **0022**  by running the  **--exec-opt native.umask=normal**  command during container startup.

>![](public_sys-resources/icon-notice.gif) **NOTICE:**   
>If  **native.umask**  is configured in  **docker create**  or  **docker run**  command, its value is used.  

For details, see the parameter description in  [4.6.2.4 create](#create.md#EN-US_TOPIC_0184808242)  and  [4.6.2.16 run](#container-management-40.md#EN-US_TOPIC_0184808238).

### Daemon Start Time

The Docker service is managed by systemd, which restricts the startup time of each service. If the Docker service fails to be started within the specified time, the possible causes are as follows:

-   If Docker daemon is started for the first time using devicemapper, the Docker daemon needs to perform the initialization operation on the device. This operation, however, will perform a large number of disk I/O operations. When the disk performance is poor or many I/O conflicts exist, the Docker daemon startup may time out. devicemapper needs to be initialized only once and does not need to be initialized again during later Docker daemon startup.
-   If the usage of the current system resources is too high, the system responses slowly, all operations in the system slow down, and the startup of the Docker service may time out.
-   During the restart, a daemon traverses and reads configuration files and the init layer and writable layer configurations of each container in the Docker working directory. If there are too many containers \(including the created and exited containers\) in the current system and the disk read and write performance is limited, the startup of the Docker service may time out due to the long-time daemon traversing.

  

If the service startup times out, you are advised to rectify the fault as follows:

-   Ensure that the container orchestration layer periodically deletes unnecessary containers, especially the exited containers.
-   Based on performance requirements of the solution, adjust the cleanup period of the orchestration layer and the start time of the Docker service.

### Journald Component

After systemd-journald is restarted, Docker daemon needs to be restarted. Journald obtains the Docker daemon logs through a pipe. If the journald service is restarted, the pipe is disabled. The write operation of Docker logs triggers the SIGPIPE signal, which causes the Docker daemon crash. If this signal is ignored, the subsequent Docker daemon logs may fail to be recorded. Therefore, you are advised to restart Docker daemon after the journald service is restarted or becomes abnormal, ensuring that Docker logs can be properly recorded and preventing status exceptions caused by daemon crash.

### Firewalld Component

You need to restart the Docker service after restarting or starting firewalld.

-   When the firewalld service is started, the iptables rules of the current system are cleared. Therefore, if the firewalld service is restarted during Docker daemon startup, the Docker service may fail to insert iptables rules, causing the Docker service startup failure.
-   If the firewalld service is restarted after the Docker service is started, or the status of the firewalld service \(service paused or resumed\) is changed, the iptables rules of the Docker service are deleted. As a result, the container with port mapping fails to be created.

### Iptables Component

If the  **--icc=false**  option is added in Docker, the communication between containers can be restricted. However, if the OS has some rules, the communication between containers may not be restricted. For example:

```
Chain FORWARD (policy ACCEPT 0 packets, 0 bytes) 
... 
0     0 ACCEPT     icmp --  *      *       0.0.0.0/0            0.0.0.0/0 
... 
0     0 DROP       all  --  docker0 docker0  0.0.0.0/0            0.0.0.0/0
...
```

In the  **Chain FORWARD**  command, the ACCEPT icmp rule is added to DROP. As a result, after the  **--icc=false**  option is added, containers can be pinged, but the peer end is unreachable if UDP or TCP is used.

Therefore, if you want to add the  **--icc=false**  option when using Docker in a container OS, you are advised to clear iptables rules on the host first.

### Audit Component

You can configure audit for Docker. However, this configuration is not mandatory. For example:

```
-w /var/lib/docker -k docker 
-w /etc/docker -k docker 
-w /usr/lib/systemd/system/docker.service -k docker 
-w /usr/lib/systemd/system/docker.socket -k docker 
-w /etc/sysconfig/docker -k docker 
-w /usr/bin/docker-containerd -k docker 
-w /usr/bin/docker-runc -k docker 
-w /etc/docker/daemon.json -k docker
```

Configuring audit for Docker brings certain benefits for auditing, while it does not have any substantial effects on attack defense. In addition, the audit configurations cause serious efficiency problems, for example, the system may not respond smoothly. Therefore, exercise caution in the production environment.

The following uses  **-w /var/lib/docker -k docker**  as an example to describe how to configure Docker audit.

```
[root@localhost signal]# cat /etc/audit/rules.d/audit.rules | grep docker -w /var/lib/docker/  -k docker 
[root@localhost signal]# auditctl -R /etc/audit/rules.d/audit.rules | grep docker 
[root@localhost signal]# auditctl -l | grep docker -w /var/lib/docker/ -p rwxa -k docker
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>**-p \[r|w|x|a\]**  and  **-w**  are used together to monitor the read, write, execution, and attribute changes \(such as timestamp changes\) of the directory. In this case, any file or directory operation in the  **/var/lib/docker**  directory will be recorded in the  **audit.log**  file. As a result, too many logs will be recorded in the  **audit.log**  file, which severely affects the memory or CPU usage of the auditd, and further affects the OS. For example, logs similar to the following will be recorded in the  **/var/log/audit/audit.log**  file each time the  **ls /var/lib/docker/containers**  command is executed:  

```
type=SYSCALL msg=audit(1517656451.457:8097): arch=c000003e syscall=257 success=yes exit=3 a0=ffffffffffffff9c a1=1b955b0 a2=90800 a3=0 items=1 ppid=17821 pid=1925 auid=0 uid=0 gid=0 euid=0 suid=0 fsuid=0 egid=0 sgid=0 fsgid=0 tty=pts6 ses=4 comm="ls" exe="/usr/bin/ls" subj=unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023 key="docker"type=CWD msg=audit(1517656451.457:8097):  cwd="/root"type=PATH msg=audit(1517656451.457:8097): item=0 name="/var/lib/docker/containers" inode=1049112 dev=fd:00 mode=040700 ouid=0 ogid=0 rdev=00:00 obj=unconfined_u:object_r:container_var_lib_t:s0 objtype=NORMAL 
```

  

### Security Configuration seccomp

During the container network performance test, it is found that the performance of Docker is lower than that of the native kernel namespace. After seccomp is enabled, system calls \(such as sendto\) are not performed through system\_call\_fastpath. Instead, tracesys is called, which greatly deteriorates the performance. Therefore, you are advised to disable seccomp in container scenarios where services require high performance. For example:

```
docker run -itd --security-opt seccomp=unconfined busybox:latest
```

### Do Not Modify Private Directory of Docker Daemon

Do not modify the root directory used by Docker \(**/var/lib/docker**  by default\), the directory during operation \(**/run/docker**  by default\), or the files or directories in the two directories. The forbidden operations include deleting files, adding files, creating soft or hard links for the directories or files, or modifying attributes, permissions, or contents of the files. If any modification is required, contact the Euler container team for review.

### Precautions for Common Users in the Scenario Where a Large Number of Containers Are Deployed

The maximum number of processes that a common user can create on an OS host can be restricted by creating the  **/etc/security/limits.d/20-nproc.conf**  file in the system. Similarly, the maximum number of processes that a common user can create in a container is determined by the value in the  **/etc/security/limits.d/20-nproc.conf**  file in the container image, as shown in the following example:

```
cat /etc/security/limits.conf 
*       soft    nproc   4096
```

If an error is reported due to insufficient resources when a large number of containers are deployed by a common user, increase the value  **4096**  in the  **/etc/security/limits.d/20-nproc.conf**  file.

Configure the maximum value based on the maximum capability of the kernel, as shown in the following example:

```
[root@localhost ~]# sysctl -a | grep pid_max 
kernel.pid_max = 32768
```

## Storage Driver Configuration

This Docker version supports two storage drivers: overlay2 and devicemapper. Since overlay2 has better performance than devicemapper, it is recommended that overlay2 be preferentially used in the production environment.



### overlay2 Storage Driver Configuration

#### Configuration Methods

overlay2 is the default storage driver of Docker. You can also use either of the following methods to check or configure the driver:

-   Edit the  **/etc/docker/daemon.json**  file to check or configure the  **storage-driver**  field.

    ```
    cat /etc/docker/daemon.json
    {
        "storage-driver": "overlay2"
    }
    ```


-   Edit the  **/etc/sysconfig/docker-storage**  file and check or configure the Docker daemon startup parameters.

    ```
    cat /etc/sysconfig/docker-storage 
    DOCKER_STORAGE_OPTIONS="--storage-driver=overlay2"
    ```


#### Precautions

-   When you perform lifecycle management operations on some containers, an error may be reported, indicating that the corresponding rootfs or executable file cannot be found.
-   If the health check of a container is configured to execute executable files in the container, an error may be reported, which causes the health check failure of the container.

-   When you use overlay2 as the graphdriver and modify an image file in a container for the first time, the modification fails if the file size is greater than the remaining space of the system. Even if a little modification on the file is involved, the whole file must be copied to the upper layer. If the remaining space is insufficient, the modification fails.
-   Compared with common file systems, the overlay2 file system has the following behavior differences:
    -   Kernel version

        overlay2 is compatible only with the native kernel 4.0 or later. You are advised to use the Ext4 file system.

    -   Copy-UP performance

        Modifying files at the lower layer triggers file replication to the upper layer. Data block replication and fsync are time-consuming.

    -   Rename directories
        -   The rename system call is allowed only when both the source and the destination paths are at the merged layer. Otherwise, the EXDEV error is reported.
        -   Kernel 4.10 introduces the redirect directory feature to fix this issue. The corresponding kernel option is  **CONFIG\_OVERLAY\_FS\_REDIRECT\_DIR**.

            When overlay2 is used, a file system directory fails to be renamed because the related feature configured in the  **/sys/module/overlay/parameters/redirect\_dir**  file has been disabled. To use this feature, you need to manually set  **/sys/module/overlay/parameters/redirect\_dir**  to  **Y**.

    -   Hard link disconnection
        -   If there are multiple hard links in the lower-layer directory, writing data to the merged layer will trigger Copy-UP, resulting in hard link disconnection.
        -   The index feature is introduced in kernel 4.13 to fix this issue. The corresponding kernel option is  **CONFIG\_OVERLAY\_FS\_INDEX**. Note that this option is not forward compatible and does not support hot upgrade.

    -   Changes of  **st\_dev**  and  **st\_ino**

        After Copy-UP is triggered, you can view only new files at the merged layer, and inodes change. Although  **attr**  and  **xattr**  can be replicated,  **st\_dev**  and  **st\_ino**  are unique and cannot be replicated. As a result, you can run  **stat**  and  **ls**  commands to check inode changes accordingly.

    -   fd change

        Before Copy-UP is triggered, you can obtain the descriptor fd1 when opening a file in read-only mode. After Copy-UP is trigger, you can obtain the descriptor fd2 when opening the file with the same name. The two descriptors point to different files. The data written to fd2 is not displayed in fd1.



#### Abnormal Scenarios

When a container uses the overlay2 storage driver, mount points may be overwritten.

  

#### Abnormal Scenario: Mount Point Being Overwritten

In the faulty container, there is a mount point in  **/var/lib/docker/overlay2**.

```
[root@localhost ~]# mount -l | grep overlay 
overlay on /var/lib/docker/overlay2/844fd3bca8e616572935808061f009d106a8748dfd29a0a4025645457fa21785/merged type overlay (rw,relatime,seclabel,lowerdir=/var/lib/docker/overlay2/l/JL5PZQLNDCIBU3ZOG3LPPDBHIJ:/var/lib/docker/overlay2/l/ELRPYU4JJG4FDPRLZJCZZE4UO6,upperdir=/var/lib/docker/overlay2/844fd3bca8e616572935808061f009d106a8748dfd29a0a4025645457fa21785/diff,workdir=/var/lib/docker/overlay2/844fd3bca8e616572935808061f009d106a8748dfd29a0a4025645457fa21785/work) 
/dev/mapper/dm-root on /var/lib/docker/overlay2 type ext4 (rw,relatime,seclabel,data=ordered)
```

An error as follows may occur when some Docker commands are executed:

```
[root@localhost ~]# docker rm 1348136d32
docker rm: Error response from daemon: driver "overlay2" failed to remove root filesystem for 1348136d32: error while removing /var/lib/docker/overlay2/844fd3bca8e616572935808061f009d106a8748dfd29a0a4025645457fa21785: invalid argument
```

You will find that the rootfs of the corresponding container cannot be found on the host. However, this does not mean that the rootfs is lost. The rootfs is overwritten by the mount point in  **/var/lib/docker/overlay2**, and services are still running properly. The solutions are as follows:

-   Solution 1
    1.  Run the following command to check the graphdriver used by Docker:

        ```
        docker info | grep "Storage Driver"
        ```

          

    2.  Run the following commands to query the current mount point:

        ```
        Devicemapper: mount -l | grep devicemapper 
        Overlay2: mount -l | grep overlay2
        ```

        The output format is  _A_  on  _B_  type  _C_  \(_D_\).

        -   _A_: block device name or  **overlay**
        -   _B_: mount point
        -   _C_: file system type
        -   _D_: mounting attribute

    3.  Run the  **umount**  command on the mount points \(_B_\) one by one from bottom to top.
    4.  Run the  **docker restart**  command on all the containers or delete all the containers.
    5.  Run the following command to restart Docker:

        ```
        systemctl restart docker
        ```



-   Solution 2
    1.  Migrate services.
    2.  Restart nodes.


### devicemapper Storage Driver Configuration

If you need to set the storage driver of Docker to devicemapper, you can also use either of the following methods to check or configure the driver:

-   Edit the  **/etc/docker/daemon.json**  file to check or configure the  **storage-driver**  field.

    ```
    cat /etc/docker/daemon.json
    {
        "storage-driver": "devicemapper"
    }
    ```


-   Edit the  **/etc/sysconfig/docker-storage**  file and check or configure the Docker daemon startup parameters.

    ```
    cat /etc/sysconfig/docker-storage 
    DOCKER_STORAGE_OPTIONS="--storage-driver=devicemapper"
    ```


#### Precautions

-   To use devicemapper, you must use the direct-lvm mode. For details about the configuration method, refer to  [https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/\#configure-direct-lvm-mode-for-production](https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/#configure-direct-lvm-mode-for-production).
-   When configuring devicemapper, if the system does not have sufficient space for automatic capacity expansion of thinpool, disable the automatic capacity expansion function.
-   Do not set both the following two parameters in the  **/etc/lvm/profile/docker-thinpool.profile**  file to  **100**:

    ```
    activation {   
      thin_pool_autoextend_threshold=80   
      thin_pool_autoextend_percent=20 
    }
    ```

-   You are advised to add  **--storage-opt dm.use\_deferred\_deletion=true**  and  **--storage-opt dm.use\_deferred\_removal=true**  when using devicemapper.
-   When devicemapper is used, you are advised to use Ext4 as the container file system. You need to add  **--storage-opt dm.fs=ext4**  to the configuration parameters of Docker daemon.
-   If graphdriver is devicemapper and the metadata files are damaged and cannot be restored, you need to manually restore the metadata files. Do not directly operate or tamper with metadata of the devicemapper storage driver in Docker daemon.
-   When the devicemapper LVM is used, if the devicemapper thinpool is damaged due to abnormal power-off, you cannot ensure the data integrity or whether the damaged thinpool can be restored. Therefore, you need to rebuild the thinpool.

**Precautions for Switching the devicemapper Storage Pool When the User Namespace Feature Is Enabled on Docker Daemon**

-   Generally, the path of the deviceset-metadata file is  **/var/lib/docker/devicemapper/metadata/deviceset-metadata**  during container startup.
-   If user namespaces are used, the path of the deviceset-metadata file is  **/var/lib/docker/**_userNSUID.GID_**/devicemapper/metadata/deviceset-metadata**.
-   When you use the devicemapper storage driver and the container is switched between the user namespace scenario and common scenario, the  **BaseDeviceUUID**  content in the corresponding deviceset-metadata file needs to be cleared. In the thinpool capacity expansion or rebuild scenario, you also need to clear the  **BaseDeviceUUID**  content in the deviceset-metadata file. Otherwise, the Docker service fails to be restarted.

## Impact of Forcibly Killing Docker Background Processes

The call chain of Docker is long. Forcibly killing docker background processes \(such as sending  **kill -9**\) may cause data status inconsistency. This section describes some problems that may be caused by forcible killing.

### Semaphores May Be Residual

When the devicemapper is used as the graphdriver, forcible killing may cause residual semaphores. Docker creates semaphores when performing operations on devicemapper. If daemon is forcibly killed before the semaphores are released, the release may fail. A maximum of one semaphore can be leaked at a time, and the leakage probability is low. However, the Linux OS has an upper limit on semaphores. When the number of semaphore leakage times reaches the upper limit, new semaphores cannot be created. As a result, Docker daemon fails to be started. The troubleshooting method is as follows:

1.  Check the residual semaphores in the system.

    ```
    $ ipcs 
    ------ Message Queues -------- 
    key        msqid      owner      perms      used-bytes   messages 
    ------ Shared Memory Segments -------- 
    key        shmid      owner      perms      bytes      nattch     status 
    ------ Semaphore Arrays -------- 
    key        semid      owner      perms      nsems 
    0x0d4d3358 238977024  root       600        1 
    0x0d4d0ec9 270172161  root       600        1 
    0x0d4dc02e 281640962  root       600        1
    ```

2.  Run the  **dmsetup**  command to check semaphores created by devicemapper. The semaphore set is the subset of the system semaphores queried in the previous step.

    ```
    $ dmsetup udevcookies 
    ```

3.  Check the upper limit of kernel semaphores. The fourth value is the upper limit of the current system semaphores.

    ```
    $ cat /proc/sys/kernel/sem 
    250     32000   32      128
    ```

    If the number of residual semaphores in step 1 is the same as the upper limit of semaphores in step 3, the number of residual semaphores reaches the upper limit. In this case, Docker daemon cannot be normally started. You can run the following command to increase the upper limit to restart Docker:

    ```
    $ echo 250 32000  32  1024 > /proc/sys/kernel/sem
    ```

    You can also run the following command to manually clear the residual devicemapper semaphores. The following describes how to clear the devicemapper semaphores applied one minute ago.

    ```
    $ dmsetup udevcomplete_all 1 
    This operation will destroy all semaphores older than 1 minutes with keys that have a prefix 3405 (0xd4d). 
    Do you really want to continue? [y/n]: y 
    0 semaphores with keys prefixed by 3405 (0xd4d) destroyed. 0 skipped.
    ```


### NICs May Be Residual

When a container is started in bridge mode, forcibly killing may cause residual NICs. In bridge network mode, when Docker creates a container, a pair of veths are created on the host, and then the NIC information is saved to the database. If daemon is forcibly killed before the NIC information is saved to the database of Docker, the NIC cannot be associated with Docker and cannot be deleted during the next startup because Docker deletes unused NICs from its database.

### Failed to Restart a Container

If container hook takes a long time, and containerd is forcibly killed during container startup, the container start operation may fail. When containerd is forcibly killed during container startup, an error is returned for the Docker start operation. After containerd is restarted, the last startup may still be in the  **runc create**  execution phase \(executing the user-defined hook may take a long time\). If you run the  **docker start**  command again to start the container, the following error message may be displayed:

```
Error response from daemon: oci runtime error: container with id exists: xxxxxx
```

This error is caused by running  **runc create**  on an existing container \(or being created\). After the  **runc create**  operation corresponding to the first start operation is complete, the  **docker start**  command can be successfully executed.

The execution of hook is not controlled by Docker. In this case, if the container is recycled, the containerd process may be suspended when an unknown hook program is executed. In addition, the risk is controllable \(although the creation of the current container is affected in a short period\).

-   After the first operation is complete, the container can be successfully started again.
-   Generally, a new container is created after the container fails to be started. The container that fails to be started cannot be reused.

In conclusion, this problem has a constraint on scenarios.

### Failed to Restart the Docker Service

The Docker service cannot be restarted properly due to frequent startup in a short period The Docker system service is monitored by systemd. If the Docker service is restarted for more than five times within 10s, the systemd service detects the abnormal startup. Therefore, the Docker service is disabled. Docker can respond to the restart command and be normally restarted only when the next period of 10s starts.

## Impact of System Power-off

When a system is unexpectedly powered off or system panic occurs, Docker daemon status may not be updated to the disk in time. As a result, Docker daemon is abnormal after the system is restarted. The possible problems include but are not limited to the following:

-   A container is created before the power-off. After the restart, the container is not displayed when the  **docker ps –a**  command is run, as the file status of the container is not updated to the disk. As a result, daemon cannot obtain the container status after the restart.
-   Before the system power-off, a file is being written. After daemon is restarted, the file format is incorrect or the file content is incomplete. As a result, loading fails.
-   As Docker database \(DB\) will be damaged during power-off, all DB files in  **data-root**  will be deleted during node restart. Therefore, the following information created before the restart will be deleted after the restart:
    -   Network: Resources created through Docker network will be deleted after the node is restarted.
    -   Volume: Resources created through Docker volume will be deleted after the node is restarted.
    -   Cache construction: The cache construction information will be deleted after the node is restarted.
    -   Metadata stored in containerd: Metadata stored in containerd will be recreated when a container is started. Therefore, the metadata stored in containerd will be deleted when the node is restarted.

        >![](public_sys-resources/icon-note.gif) **NOTE:**   
        >If you want to manually clear data and restore the environment, you can set the environment variable  **DISABLE\_CRASH\_FILES\_DELETE**  to  **true**  to disable the function of clearing DB files when the daemon process is restarted due to power-off.  



