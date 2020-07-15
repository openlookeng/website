## Container Management

- [Container Management](#container-management-1)
    - [Creating a Container](#creating-a-container)
    - [Creating Containers Using hook-spec](#creating-containers-using-hook-spec)
    - [Configuring Health Check During Container Creation](#configuring-health-check-during-container-creation)
    - [Stopping and Deleting a Container](#stopping-and-deleting-a-container)
    - [Querying Container Information](#querying-container-information)
    - [Modification Operations](#modification-operations)



## Creating a Container

### Downloading Images

Only user  **root**  can run the  **docker**  command. If you log in as a common user, you need to use the  **sudo**  command before running the  **docker**  command.

```
[root@localhost ~]# docker pull busybox
```

This command is used to download the  **busybox:latest**  image from the official Docker registry. \(If no tag is specified in the command, the default tag name  **latest**  is used.\) During the image download, the system checks whether the dependent layer exists locally. If yes, the image download is skipped. When downloading images from a private registry, specify the registry description. For example, if a private registry containing some common images is created and its IP address is  **192.168.1.110:5000**, you can run the following command to download the image from the private registry:

```
[root@localhost ~]# docker pull 192.168.1.110:5000/busybox
```

The name of the image downloaded from the private registry contains the registry address information, which may be too long. Run the  **docker tag**  command to generate an image with a shorter name.

```
[root@localhost ~]# docker tag 192.168.1.110:5000/busybox busybox
```

Run the  **docker images**  command to view the local image list.

### Running a Simple Application

```
[root@localhost ~]# docker run busybox /bin/echo "Hello world"
Hello world
```

This command uses the  **busybox:latest**  image to create a container, and executes the  **echo "Hello world"**  command in the container. Run the following command to view the created container:

```
[root@localhost ~]# docker ps -l
CONTAINER ID        IMAGE               COMMAND                   CREATED             STATUS                     PORTS               NAMES
d8c0a3315bc0        busybox"/bin/echo 'Hello wo..."   5 seconds ago       Exited (0) 3 seconds ago                       practical_franklin
```

### Creating an Interactive Container

```
[root@localhost ~]# docker run -it busybox /bin/bash
root@bf22919af2cf:/# ls 
bin  boot  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var 
root@bf22919af2cf:/# pwd 
/
```

The  **-ti**  option allocates a pseudo terminal to the container and uses standard input \(STDIN\) for interaction. You can run commands in the container. In this case, the container is an independent Linux VM. Run the  **exit**  command to exit the container.

### Running a Container in the Background

Run the following command.  **-d**  indicates that the container is running in the background.  **--name=container1**  indicates that the container name is  **container1**.

```
[root@localhost ~]# docker run -d --name=container1 busybox /bin/sh -c "while true;do echo hello world;sleep 1;done"
7804d3e16d69b41aac5f9bf20d5f263e2da081b1de50044105b1e3f536b6db1c
```

The command output contains the container ID but does not contain  **hello world**. In this case, the container is running in the background. You can run the  **docker ps**  command to view the running container.

```
[root@localhost ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
7804d3e16d69        busybox "/bin/sh -c 'while tr"   11 seconds ago      Up 10 seconds                           container1
```

Run the following  **docker logs**  command to view the output during container running:

```
[root@localhost ~]# docker logs container1
hello world
hello world
hello world
...
```

### Container Network Connection

By default, a container can access an external network, while port mapping is required when an external network accesses a container. The following uses how to run the private registry service in Docker as an example. In the following command,  **-P**  is used to expose open ports in the registry to the host.

```
[root@localhost ~]# docker run --name=container_registry -d -P registry 
cb883f6216c2b08a8c439b3957fb396c847a99079448ca741cc90724de4e4731 
```

The container\_registry container has been started, but the mapping between services in the container and ports on the host is not clear. You need to run the  **docker port**  command to view the port mapping.

```
[root@localhost ~]# docker port container_registry 
5000/tcp -> 0.0.0.0:49155 
```

The command output shows that port 5000 in the container is mapped to port 49155 on the host. You can access the registry service by using the host IP address  **49155**. Enter  **http://localhost:49155**  in the address box of the browser and press  **Enter**. The registry version information is displayed.

When running registry images, you can directly specify the port mapping, as shown in the following:

```
docker run --name=container_registry -d -p 5000:5000 registry 
```

**-p 5000:5000**  is used to map port 5000 in the container to port 5000 on the host.

### Precautions

-   **Do Not Add -a stdin Independently During Container Startup**

    When starting a container, you must add  **-a stdout**  or  **-a stderr**  together with  **-a stdin**  instead of  **-a stdin**  only. Otherwise, the device stops responding even after the container exits.


-   **Do Not Use the Long Or Short ID of an Existing Container As the Name of a New Container**

    When creating a container, do not use the long or short ID of the existing container A as the name of the new container B. If the long ID of container A is used as the name of container B, Docker will match container A even though the name of container B is used as the specified target container for operations. If the short ID of container A is used as the name of container B, Docker will match container B even though the short ID of container A is used as the specified target container for operations. This is because Docker matches the long IDs of all containers first. If the matching fails, the system performs exact matching using the value of  **container\_name**. If matching failure persists, the container ID is directly matched in fuzzy mode.

-   **Containers That Depend on Standard Input and Output, Such As sh/bash, Must Use the -ti Parameter to Avoid Exceptions**

    Normal case: If you do not use the  **-ti**  parameter to start a process container such as sh/bash, the container exits immediately.

    The cause of this problem is that Docker creates a stdin that matches services in the container first. If the interactive parameters such as  **-ti**  are not set, Docker closes pipe after the container is started and the service container process sh/bash exits after stdin is closed.

    Exception: If Docker daemon is forcibly killed in a specific phase \(before pipe is closed\), daemon of the pipe is not closed in time. In this case, the sh/bash process does not exit even without  **-ti**. As a result, an exception occurs. You need to manually clear the container.

    After being restarted, daemon takes over the original container stream. Containers without the  **-ti**  parameter may not be able to process the stream because these containers do not have streams to be taken over in normal cases. In actual services, sh/bash without the  **-ti**  parameter does not take effect and is seldom used. To avoid this problem, the  **-ti**  parameter is used to restrict interactive containers.

-   **Container Storage Volumes**

    If you use the  **-v**  parameter to mount files on the host to a container when the container is started, the inodes of the files may be changed when you run the  **vi**  or  **sed**  command to modify the files on the host or in the container. As a result, files on the host and in the container are not synchronized. Do not mount files in the container in this mode \(or do not use together with the  **vi**  and  **sed**  commands\). You can also mount the upper-layer directories of the files to avoid exceptions. The  **nocopy**  option can be used to prevent original files in the mount point directory of a container from being copied to the source directory of the host when Docker mounts volumes. However, this option can be used only when an anonymous volume is mounted and cannot be used in the bind mount scenario.

-   **Do Not Use Options That May Affect the Host**

    The  **--privileged**  option enables all permissions for a container. On the container, mounting operations can be performed and directories such as  **/proc**  and  **/sys**  can be modified, which may affect the host. Therefore, do not use this option for common containers.

    A host-shared namespace, such as the  **--pid host**,  **--ipc host**, or  **--net host**  option, can enable a container to share the namespace with the host, which will also affect the host. Therefore, do not use this option.

-   **Do Not Use the Unstable Kernel Memory Cgroup**

    Kernel memory cgroup on the Linux kernel earlier than 4.0 is still in the experimental phase and runs unstably. Therefore, do not use kernel memory cgroup.

    When the  **docker run --kernel-memory**  command is executed, the following alarm is generated:

    ```
    WARNING: You specified a kernel memory limit on a kernel older than 4.0. Kernel memory limits are experimental on older kernels, it won't work as expected as expected and can cause your system to be unstable.
    ```

-   **blkio-weight Parameter Is Unavailable in the Kernel That Supports blkio Precise Control**

    **--blkio-weight-device**  can implement more accurate blkio control in a container. The control requires a specified disk device, which can be implemented through the  **--blkio-weight-device**  parameter of Docker. In this kernel, Docker does not provide the  **--blkio-weight**  mode to limit the container blkio. If you use this parameter to create a container, the following error is reported:

    ```
    docker: Error response from daemon: oci runtime error: container_linux.go:247: starting container process caused "process_linux.go:398: container init caused \"process_linux.go:369: setting cgroup config for ready process caused \\\"blkio.weight not supported, use weight_device instead\\\"\""
    ```

-   **Using --blkio-weight-device in CFQ Scheduling Policy**

    The  **--blkio-weight-device**  parameter works only when the disk works in the Completely Fair Queuing \(CFQ\) policy.

    You can view the scheduler file \(**/sys/block/**_disk_**/queue/scheduler**\) to obtain the policies supported by the disk and the current policy. For example, you can run the following command to view  **sda**.

    ```
    # cat /sys/block/sda/queue/scheduler noop [deadline] cfq 
    ```

    **sda**  supports the following scheduling policies:  **noop**,  **deadline**, and  **cfq**, and the  **deadline**  policy is being used. You can run the  **echo**  command to change the policy to  **cfq**.

    ```
    # echo cfq > /sys/block/sda/queue/scheduler
    ```


-   **systemd Usage Restrictions in Basic Container Images**

    When containers created from basic images are used, systemd in basic images is used only for system containers.


### Concurrent Performance

-   There is an upper limit for the message buffer in Docker. If the number of messages exceeds the upper limit, the messages are discarded. Therefore, it is recommended that the number of commands executed concurrently should not exceed 1000. Otherwise, the internal messages in Docker may be lost and the container may fail to be started.
-   When containers are concurrently created and restarted, the error message"oci runtime error: container init still running" is occasionally reported. This is because containerd optimizes the performance of the event waiting queue. When a container is stopped, the  **runc delete**  command is executed to kill the init processes in the container within 1s. If the init processes are not killed within 1s, runC returns this error message. The garbage collection \(GC\) mechanism of containerd reclaims residual resources after  **runc delete**  is executed at an interval of 10s. Therefore, operations on the container are not affected. If the preceding error occurs, wait for 4 or 5s and restart the container.

### Security Feature Interpretation

1.  The following describes default permission configuration analysis of Docker.

    In the default configuration of a native Docker, capabilities carried by each default process are as follows:

    ```
    "CAP_CHOWN", 
    "CAP_DAC_OVERRIDE", 
    "CAP_FSETID", 
    "CAP_FOWNER", 
    "CAP_MKNOD", 
    "CAP_NET_RAW", 
    "CAP_SETGID", 
    "CAP_SETUID", 
    "CAP_SETFCAP", 
    "CAP_SETPCAP", 
    "CAP_NET_BIND_SERVICE", 
    "CAP_SYS_CHROOT", 
    "CAP_KILL", 
    "CAP_AUDIT_WRITE",
    ```

    The default seccomp configuration is a whitelist. If any syscall is not in the whitelist,  **SCMP\_ACT\_ERRNO**  is returned by default. Different system invoking is enabled for different caps of Docker. If a capability is not in the whitelist, Docker will not assign it to the container by default.

2.  CAP\_SYS\_MODULE

    CAP\_SYS\_MODULE allows a container to insert the ko module. Adding this capability allows the container to escape or even damage the kernel. Namespace provides the maximum isolation for a container. In the ko module, you only need to point its namespace to  **init\_nsproxy**.

3.  CAP\_SYS\_ADMIN

    The sys\_admin permission provides the following capabilities for a container:

    -   For file system:  **mount**,  **umount**, and  **quotactl**
    -   For namespace setting:  **setns**,  **unshare**, and  **clone new namespace**
    -   driver ioctl
    -   For PCI control:  **pciconfig\_read**,  **pciconfig\_write**, and  **pciconfig\_iobase**
    -   **sethostname**

4.  CAP\_NET\_ADMIN

    CAP\_NET\_ADMIN allows a container to access network interfaces and sniff network traffic. The container can obtain the network traffic of all containers including the host, which greatly damages network isolation.

5.  CAP\_DAC\_READ\_SEARCH

    CAP\_DAC\_READ\_SEARCH calls the open\_by\_handle\_at and name\_to\_handle\_at system calls. If the host is not protected by SELinux, the container can perform brute-force search for the inode number of the file\_handle structure to open any file on the host, which affects the isolation of the file system.

6.  CAP\_SYS\_RAWIO

    CAP\_SYS\_RAWIO allows a container to write I/O ports to the host, which may cause the host kernel to crash.

7.  CAP\_SYS\_PTRACE

    The ptrace permission for a container provides ptrace process debugging in the container. RunC has fixed this vulnerability. However, some tools, such as nsenter and docker-enter, are not protected. In a container, processes executed by these tools can be debugged to obtain resource information \(such as namespace and fd\) brought by these tools. In addition, ptrace can bypass seccomp, greatly increasing attack risks of the kernel.

8.  Docker capability interface: --cap-add all

    --cap-add all grants all permissions to a container, including the dangerous permissions mentioned in this section, which allows the container to escape.

9.  Do not disable the seccomp feature of Docker.

    Docker has a default seccomp configuration with a whitelist.  **sys\_call**  that is not in the whitelist is disabled by seccomp. You can disable the seccomp feature by running  **--security-opt 'seccomp:unconfined'**. If seccomp is disabled or the user-defined seccomp configuration is used but the filtering list is incomplete, attack risks of the kernel in the container are increased.

10. Do not set the  **/sys**  and  **/proc**  directories to writable.

    The  **/sys**  and  **/proc**  directories contain Linux kernel maintenance parameters and device management interfaces. If the write permission is configured for the directories in a container, the container may escape.

11. Docker open capability: --CAP\_AUDIT\_CONTROL

    The permission allows a container to control the audit system and run the  **AUDIT\_TTY\_GET**  and  **AUDIT\_TTY\_SET**  commands to obtain the TTY execution records \(including the  **root**  password\) recorded in the audit system.

12. CAP\_BLOCK\_SUSPEND and CAP\_WAKE\_ALARM

    The permission provides a container the capability to block the system from suspending \(epoll\).

13. CAP\_IPC\_LOCK

    With this permission, a container can break the max locked memory limit in  **ulimit**  and use any mlock large memory block to cause DoS attacks.

14. CAP\_SYS\_LOG

    In a container with this permission, system kernel logs can be read by using dmesg to break through kernel kaslr protection.

15. CAP\_SYS\_NICE

    In a container with this permission, the scheduling policy and priority of a process can be changed, causing DoS attacks.

16. CAP\_SYS\_RESOURCE

    With this permission, a container can bypass resource restrictions, such as disk space resource restriction, keymaps quantity restriction, and  **pipe-size-max**  restriction, causing DoS attacks.

17. CAP\_SYS\_TIME

    In a container with this capability, the time on the host can be changed.

18. Risk analysis of Docker default capabilities

    The default capabilities of Docker include CAP\_SETUID and CAP\_FSETID. If the host and a container share a directory, the container can set permissions for the binary file in the shared directory. Common users on the host can use this method to elevate privileges. With the CAP\_AUDIT\_WRITE capability, a container can write logs to the host, and the host must be configured with log anti-explosion measures.

19. Docker and host share namespace parameters, such as  **--pid**,  **--ipc**, and  **--uts**.

    This parameter indicates that the container and host share the namespace. The container can attack the host as the namespace of the container is not isolated from that of the host. For example, if you use  **--pid**  to share PID namespace with the host, the PID on the host can be viewed in the container, and processes on the host can be killed at will.

20. **--device**  is used to map the sensitive directories or devices of the host to the container.

    The Docker management plane provides interfaces for mapping directories or devices on a host to the container, such as  **--device**  and  **-v**. Do not map sensitive directories or devices on the host to the container.


## Creating Containers Using hook-spec

### Principles and Application Scenarios

Docker supports the extended features of hooks. The execution of hook applications and underlying runC complies with the OCI standards. For details about the standards, visit  [https://github.com/opencontainers/runtime-spec/blob/master/config.md\#hooks](#https://github.com/opencontainers/runtime-spec/blob/master/config.md#hooks).

There are three types of hooks: prestart, poststart, and poststop. They are respectively used before applications in the container are started, after the applications are started, and after the applications are stopped.

### API Reference

The  **--hook-spec**  parameter is added to the  **docker run**  and  **create**  commands and is followed by the absolute path of the  **spec**  file. You can specify the hooks to be added during container startup. These hooks will be automatically appended after the hooks that are dynamically created by Docker \(currently only libnetwork prestart hook\) to execute programs specified by users during the container startup or destruction.

The structure of  **spec**  is defined as follows:

```
// Hook specifies a command that is run at a particular event in the lifecycle of a container
type Hook struct{       
               Path    string   `json:"path"`    
               Args    []string `json:"args,omitempty"`    
               Env     []string `json:"env,omitempty"`      
               Timeout *int     `json:"timeout,omitempty"`
}
// Hooks for container setup and teardown
type  Hooks struct{
               // Prestart is a list of hooks to be run before the container process is executed.
               // On Linux, they are run after the container namespaces are created.         
               Prestart []Hook `json:"prestart,omitempty"`
               // Poststart is a list of hooks to be run after the container process is started.         
               Poststart []Hook `json:"poststart,omitempty"`
               // Poststop is a list of hooks to be run after the container process exits.         
               Poststop []Hook `json:"poststop,omitempty"`
}
```

-   The  **Path**,  **Args**, and  **Env**  parameters are mandatory.
-   **Timeout**  is optional, while you are advised to set this parameter to a value ranging from 1 to 120. The parameter type is int. Floating point numbers are not allowed.
-   The content of the  **spec**  file must be in JSON format as shown in the preceding example. If the format is incorrect, an error is reported.
-   Both  **docker run --hook-spec /tmp/hookspec.json **_xxx_, and  **docker create --hook-spec /tmp/hookspec.json **_xxx_** && docker start **_xxx_  can be used.

### Customizing Hooks for a Container

Take adding a NIC during the startup as an example. The content of the  **hook spec**  file is as follows:

```
{
    "prestart": [
         {
             "path": "/var/lib/docker/hooks/network-hook",             
             "args": ["network-hook", "tap0", "myTap"],             
             "env": [],
             "timeout": 5
         }
     ],
     "poststart":[],     
     "poststop":[]
}
```

Specify prestart hook to add the configuration of a network hook. The path is  **/var/lib/docker/hooks/network-hook**.  **args**  indicates the program parameters. Generally, the first parameter is the program name, and the second parameter is the parameter accepted by the program. For the network-hook program, two parameters are required. One is the name of the NIC on the host, and the other is the name of the NIC in the container.

  

-   Precautions
    1.  The  **hook**  path must be in the** hooks**  folder in the  **graph**  directory \(**--graph**\) of Docker. Its default value is  **/var/lib/docker/hooks**. You can run the  **docker info**  command to view the root path.

        ```
        [root@localhost ~]# docker info 
        ... 
        Docker Root Dir: /var/lib/docker 
        ...
        ```

        This path may change due to the user's manual configuration and the use of user namespaces \(**daemon --userns-remap**\). After the symbolic link of the path is parsed, the parsed path must start with  _Docker Root Dir_**/hooks**  \(for example,  **/var/lib/docker/hooks**\). Otherwise, an error message is displayed.

    2.  The  **hook**  path must be an absolute path because daemon cannot properly process a relative path. In addition, an absolute path meets security requirements.
    3.  The information output by the hook program to stderr is output to the client and affects the container lifecycle \(for example, the container may fail to be started\). The information output to stdout is ignored.
    4.  Do not reversely call Docker instructions in hooks.
    5.  The execute permission must have been granted on the configured hook execution file. Otherwise, an error is reported during hook execution.
    6.  The execution time of the hook operation must be as short as possible. If the prestart period is too long \(more than 2 minutes\), the container startup times out. If the poststop period is too long \(more than 2 minutes\), the container is abnormal.

        The known exceptions are as follows: When the  **docker stop**  command is executed to stop a container and the clearing operation is performed after 2 minutes, the hook operation is not complete. Therefore, the system waits until the hook operation is complete \(the process holds a lock\). As a result, all operations related to the container stop responding. The operations can be recovered only after the hook operation is complete. In addition, the two-minute timeout processing of the  **docker stop**  command is an asynchronous process. Therefore, even if the  **docker stop**  command is successfully executed, the container status is still  **up**. The container status is changed to  **exited**  only after the hook operation is completed.



-   Suggestions
    1.  You are advised to set the hook timeout threshold to a value less than 5s.
    2.  You are advised to configure only one prestart hook, one poststart hook, and one poststop hook for each container. If too many hooks are configured, the container startup may take a long time.
    3.  You are advised to identify the dependencies between multiple hooks. If required, you need to adjust the sequence of the hook configuration files according to the dependencies. The execution sequence of hooks is based on the sequence in the configured  **spec**  file.


### Multiple  **hook-spec**

If multiple hook configuration files are available and you need to run multiple hooks, you must manually combine these files into a configuration file and specify the new configuration file by using the  **--hook-spec**  parameter. Then all hooks can take effect. If multiple  **--hook-spec**  parameters are configured, only the last one takes effect.

Configuration examples:

The content of the  **hook1.json**  file is as follows:

```
# cat /var/lib/docker/hooks/hookspec.json 
{
    "prestart": [
        {
            "path": "/var/lib/docker/hooks/lxcfs-hook",             
            "args": ["lxcfs-hook", "--log", "/var/log/lxcfs-hook.log"],             
            "env": []
        }
     ],     
     "poststart":[],     
     "poststop":[]
}
```

The content of the  **hook2.json**  file is as follows:

```
# cat /etc/isulad-tools/hookspec.json 
{
      "prestart": [
         {
               "path": "/docker-root/hooks/docker-hooks",             
               "args": ["docker-hooks", "--state", "prestart"],             
               "env": []
         }
       ],     
       "poststart":[],     
       "poststop":[
          {
               "path": "/docker-root/hooks/docker-hooks",             
               "args": ["docker-hooks", "--state", "poststop"],             
               "env": []
          }
        ]
}
```

The content in JSON format after manual combination is as follows:

```
{
       "prestart":[
          {
                "path": "/var/lib/docker/hooks/lxcfs-hook",             
                "args": ["lxcfs-hook", "--log", "/var/log/lxcfs-hook.log"],             
                "env": []
           },         
           {
                "path": "/docker-root/hooks/docker-hooks",             
                "args": ["docker-hooks", "--state", "prestart"],             
                "env": []
           }
        ],     
        "poststart":[],     
        "poststop":[
            {
                "path": "/docker-root/hooks/docker-hooks",             
                "args": ["docker-hooks", "--state", "poststop"],             
                "env": []
            }
         ]
}
```

Docker daemon reads the binary values of hook in actions such as prestart in the hook configuration files in sequence based on the array sequence and executes the actions. Therefore, you need to identify the dependencies between multiple hooks. If required, you need to adjust the sequence of the hook configuration files according to the dependencies.

### Customizing Default Hooks for All Containers

Docker daemon can receive the  **--hook-spec**  parameter. The semantics of  **--hook-spec**  is the same as that of  **--hook-spec**  in  **docker create**  or  **docker run**. You can also add hook configurations to the  **/etc/docker/daemon.json**  file.

```
{
     "hook-spec": "/tmp/hookspec.json"
}
```

When a container is running, hooks specified in  **--hook-spec**  defined by daemon are executed first, and then hooks customized for each container are executed.

## Configuring Health Check During Container Creation

Docker provides the user-defined health check function for containers. You can configure the  **HEALTHCHECK CMD**  option in the Dockerfile, or configure the  **--health-cmd**  option when a container is created so that commands are periodically executed in the container to monitor the health status of the container based on return values.

### Configuration Methods

-   Add the following configurations to the Dockerfile file:

    ```
    HEALTHCHECK --interval=5m --timeout=3s --health-exit-on-unhealthy=true \
       CMD curl -f http://localhost/ || exit 1
    ```

    The configurable options are as follows:

    1.  **--interval=DURATION**: interval between two consecutive command executions. The default value is  **30s**. After a container is started, the first check is performed after the interval time.
    2.  **--timeout=DURATION**: maximum duration for executing a single check command. If the execution times out, the command execution fails. The default value is  **30s**.
    3.  **--start-period=DURATION**: container initialization period. The default value is  **0s**. During the initialization, the health check is also performed, while the health check failure is not counted into the maximum number of retries. However, if the health check is successful during initialization, the container is considered as started. All subsequent consecutive check failures are counted in the maximum number of retries.
    4.  **--retries=N**. maximum number of retries for the health check. The default value is  **3**.
    5.  **--health-exit-on-unhealthy=BOOLEAN**: whether to kill a container when it is unhealthy. The default value is  **false**.
    6.  **CMD**: This option is mandatory. If  **0**  is returned after a command is run in a container, the command execution succeeds. If a value other than  **0**  is returned, the command execution fails.

        After  **HEALTHCHECK**  is configured, related configurations are written into the image configurations during image creation. You can run the  **docker inspect**  command to view the configurations. For example:

        ```
        "Healthcheck": {
            "Test": [
                "CMD-SHELL",
                "/test.sh"
            ]
        },
        ```


-   Configurations during container creation:

    ```
    docker run -itd --health-cmd "curl -f http://localhost/ || exit 1" --health-interval 5m --health-timeout 3s --health-exit-on-unhealthy centos bash
    ```

    The configurable options are as follows:

    1.  **--health-cmd**: This option is mandatory. If  **0**  is returned after a command is run in a container, the command execution succeeds. If a value other than  **0**  is returned, the command execution fails.
    2.  **--health-interval**: interval between two consecutive command executions. The default value is  **30s**. The upper limit of the value is the maximum value of Int64 \(unit: nanosecond\).
    3.  **--health-timeout**: maximum duration for executing a single check command. If the execution times out, the command execution fails. The default value is  **30s**. The upper limit of the value is the maximum value of Int64 \(unit: nanosecond\).
    4.  **--health-start-period**: container initialization time. The default value is  **0s**. The upper limit of the value is the maximum value of Int64 \(unit: nanosecond\).
    5.  **--health-retries**: maximum number of retries for the health check. The default value is  **3**. The maximum value is the maximum value of Int32.
    6.  **--health-exit-on-unhealthy**: specifies whether to kill a container when it is unhealthy. The default value is  **false**.

        After the container is started, the  **HEALTHCHECK**  configurations are written into the container configurations. You can run the  **docker inspect**  command to view the configurations. For example:

        ```
        "Healthcheck": {
            "Test": [
                "CMD-SHELL",
                "/test.sh"
            ]
        },
        ```



### Check Rules

1.  After a container is started, the container status is  **health:starting**.
2.  After the period specified by  **start-period**, the  **cmd**  command is periodically executed in the container at the interval specified by  **interval**. That is, after the command is executed, the command will be executed again after the specified period.
3.  If the  **cmd**  command is successfully executed within the time specified by  **timeout**  and the return value is  **0**, the check is successful. Otherwise, the check fails. If the check is successful, the container status changes to  **health:healthy**.
4.  If the  **cmd**  command fails to be executed for the number of times specified by  **retries**, the container status changes to  **health:unhealthy**, and the container continues the health check.
5.  When the container status is  **health:unhealthy**, the container status changes to  **health:healthy**  if a check succeeds.
6.  If  **--health-exit-on-unhealthy**  is set, and the container exits due to reasons other than being killed \(the returned exit code is  **137**\), the health check takes effect only after the container is restarted.
7.  When the  **cmd**  command execution is complete or times out, Docker daemon will record the start time, return value, and standard output of the check to the configuration file of the container. A maximum of five latest records can be recorded. In addition, the configuration file of the container stores health check parameters.

Run the  **docker ps**  command to view the container status.

```
[root@bac shm]# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                         PORTS               NAMES
7de2228674a2        testimg             "bash"              About an hour ago   Up About an hour (unhealthy)                       cocky_davinci
```

When the container is running, the health check status is written into the container configurations. You can run the  **docker inspect**  command to view the configurations.

```
"Health": {
    "Status": "healthy",
    "FailingStreak": 0,
    "Log": [
        {
            "Start": "2018-03-07T07:44:15.481414707-05:00",
            "End": "2018-03-07T07:44:15.556908311-05:00",
            "ExitCode": 0,
            "Output": ""
        },
        {
            "Start": "2018-03-07T07:44:18.557297462-05:00",
            "End": "2018-03-07T07:44:18.63035891-05:00",
            "ExitCode": 0,
            "Output": ""
        },
        ......
}
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>-   A maximum of five health check status records can be stored in a container. The last five records are saved.  
>-   Only one health check configuration item can take effect in a container at a time. The later items configured in the Dockerfile will overwrite the earlier ones. Configurations during container creation will overwrite those in images.  
>-   In the Dockerfile, you can set  **HEALTHCHECK NONE**  to cancel the health check configuration in a referenced image. When a container is running, you can set  **--no-healthcheck**  to cancel the health check configuration in an image. Do not configure the health check and  **--no-healthcheck**  parameters at the same time during the startup.  
>-   After a container with configured health check parameters is started, if Docker daemon exits, the health check is not executed. After Docker daemon is restarted, the container health status changes to  **starting**. Afterwards, the check rules are the same as above.  
>-   If health check parameters are set to  **0**  during container image creation, the default values are used.  
>-   If health check parameters are set to  **0**  during container startup, the default values are used.  

## Stopping and Deleting a Container

Run the  **docker stop**  command to stop the container named  **container1**.

```
[root@localhost ~]# docker stop container1
```

Or run the  **docker kill**  command to kill and stop the container.

```
[root@localhost ~]# docker kill container1
```

After the container is stopped, run the  **docker rm**  command to delete the container.

```
[root@localhost ~]# docker rm container1
```

Or run the  **docker rm -f**  command to forcibly delete the container.

```
[root@localhost ~]# docker rm -f container1
```

### Precautions

-   Do not run the  **docker rm –f **_XXX_  command to delete a container. If you forcibly delete a container, the  **docker rm**  command ignores errors during the process, which may cause residual metadata of the container. If you delete an image in common mode and an error occurs during the deletion process, the deletion fails and no metadata remains.
-   Do not run the  **docker kill**  command. The  **docker kill**  command sends related signals to service processes in a container. Depending on the signal processing policies of service processes in the container may cause the result that the signal execution cannot be performed as expected.
-   A container in the restarting state may not stop immediately when you run the  **docker stop**  command. If a container uses the restart rules, when the container is in the restarting state, there is a low probability that the  **docker stop**  command on the container returns immediately. The container will still be restarted with the impact of the restart rule.
-   Do not run the  **docker restart**  command to restart a container with the  **--rm**  parameter. When a container with the  **--rm**  parameter exits, the container is automatically deleted. If the container with the  **--rm**  parameter is restarted, exceptions may occur. For example, if both the  **--rm**  and  **-ti**  parameters are added when the container is started, the restart operation cannot be performed on the container, otherwise, the container may stop responding and cannot exit.

### When Using docker stop/restart to Specify -t and t<0, Ensure That Applications in the Container Can Process Stop Signal

Stop Principle: \(The stop process is called by  **Restart**.\)

1.  The SIGTERM \(15\) signal can be sent to a container for the first time.
2.  Wait for a period of time \(**t**  entered by the user\).
3.  If the container process still exists, send the SIGKILL \(9\) signal to forcibly kill the process.

The meaning of the input parameter  **t**  \(unit: s\) is as follows:

-   **t**  < 0: Wait for graceful stop. This setting is preferred when users are assured that their applications have a proper stop signal processing mechanism.
-   **t**  = 0: Do not wait and send  **kill -9**  to the container immediately.
-   **t**  \> 0: Wait for a specified period and send  **kill -9**  to the container if the container does not stop within the specified period.

Therefore, if  **t**  is set to a value less than 0 \(for example,  **t**  =  **-1**\), ensure that the container application correctly processes the SIGTERM signal. If the container ignores this signal, the container will be suspended when the  **docker stop**  command is run.

### Manually Deleting Containers in the Dead State As the Underlying File System May Be Busy

When Docker deletes a container, it stops related processes of the container, changes the container status to Dead, and then deletes the container rootfs. When the file system or devicemapper is busy, the last step of deleting rootfs fails. Run the  **docker ps -a**  command. The command output shows that the container is in the Dead state. Containers in the Dead state cannot be started again. Wait until the file system is not busy and run the  **docker rm**  command again to delete the containers.

### In PID namespace Shared Containers, If Child Container Is in pause State, Parent Container Stops Responding and the docker run Command Cannot Be Executed

When the  **--pid**  parameter is used to create the parent and child containers that share PID namespace, if any process in the child container cannot exit \(for example, it is in the D or pause state\) when the  **docker stop**  command is executed, the  **docker stop**  command of the parent container is waiting. You need to manually recover the process so that the command can be executed normally.

In this case, run the  **docker inspect**  command on the container in the pause state to check whether the parent container corresponding to  **PidMode**  is the container that requires  **docker stop**. For the required container, run the  **docker unpause**  command to cancel the pause state of the child container. Then, proceed to the next step.

Generally, the possible cause is that the PID namespace corresponding to the container cannot be destroyed due to residual processes. If the problem persists, use Linux tools to obtain the residual processes and locate the cause of the process exit failure in PID namespace. After the problem is solved, the container can exit.

-   Obtain PID namespace ID in a container.

    ```
    docker inspect --format={{.State.Pid}} CONTAINERID | awk '{print  "/proc/"$1"/ns/pid"}' |xargs readlink
    ```

-   Obtain threads in the namespace.

    ```
     ls -l /proc/*/task/*/ns/pid |grep -F PIDNAMESPACE_ID |awk '{print $9}' |awk -F  \/ '{print $5}'
    ```


## Querying Container Information

In any case, the container status should not be determined based on whether the  **docker**  command is successfully returned. To view the container status, you are advised to use the following command:

```
docker inspect <NAME|ID>
```

## Modification Operations

### Precautions for Starting Multiple Processes in Container Using docker exec 

When the first  **docker exec**  command executed in a container is the  **bash**  command, ensure that all processes started by  **exec**  are stopped before you run the  **exit**  command. Otherwise, the device may stop responding when you run the  **exit**  command. To ensure that the process started by  **exec**  is still running in the background when the  **exit**  command is run, add  **nohup**  when starting the process.

### Usage Conflict Between docker rename and docker stats  _container\_name_

If you run the  **docker stats **_container\_name_  command to monitor a container in real time, after the container is renamed by using  **docker rename**, the name displayed after  **docker stats**  is executed is the original name instead of the renamed one.

### Failed to Perform docker rename Operation on Container in restarting State

When the rename operation is performed on a container in the restarting state, Docker modifies the container network configuration accordingly. The container in the restarting state may not be started and the network does not exist. As a result, the rename operation reports an error indicating that the sandbox does not exist. You are advised to rename only containers that are not in the restarting state.

### docker cp

1.  When you run  **docker cp**  to copy files to a container, all operations on the container can be performed only after the  **docker cp**  command is executed.
2.  When a container runs as a non-**root**  user, and you run the  **docker cp**  command to copy a non-**root**  file on the host to the container, the permission role of the file in the container changes to  **root**. Different from the  **cp**  command, the  **docker cp**  command changes UIDs and GIDs of the files copied to the container to  **root**.

### docker login

After the  **docker login**  command is executed,  **usrer/passwd**  encrypted by AES \(256-bit\) is saved in  **/root/.docker/config.json**. At the same time,  _root_**.docker/aeskey**  \(permission 0600\) is generated to decrypt  **usrer/passwd**  in  **/root/.docker/config.json**. Currently, AES key cannot be updated periodically. You need to manually delete the AES key for updating. After AES key is updated, you need to log in to Docker daemon again to push the AES key no matter whether Docker daemon is restarted. For example:

```
root@hello:~/workspace/dockerfile# docker login 
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one. 
Username: example Password: 
Login Succeeded 
root@hello:~/workspace/dockerfile# docker push example/empty 
The push refers to a repository [docker.io/example/empty] 
547b6288eb33: Layer already exists 
latest: digest: sha256:99d4fb4ce6c6f850f3b39f54f8eca0bbd9e92bd326761a61f106a10454b8900b size: 524 
root@hello:~/workspace/dockerfile# rm /root/.docker/aeskey 
root@hello:~/workspace/dockerfile# docker push example/empty 
WARNING: Error loading config file:/root/.docker/config.json - illegal base64 data at input byte 0 
The push refers to a repository [docker.io/example/empty] 
547b6288eb33: Layer already exists 
errors: 
denied: requested access to the resource is denied 
unauthorized: authentication required 
root@hello:~/workspace/dockerfile# docker login 
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one. 
Username: example 
Password: 
Login Succeeded 
root@hello:~/workspace/dockerfile# docker push example/empty 
The push refers to a repository [docker.io/example/empty] 
547b6288eb33: Layer already exists 
latest: digest: sha256:99d4fb4ce6c6f850f3b39f54f8eca0bbd9e92bd326761a61f106a10454b8900b size: 524
```

