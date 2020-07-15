# Security Features

- [Security Features](#security-features)
    - [Seccomp Security Configuration](#seccomp-security-configuration)
        - [Scenarios](#scenarios-9)
        - [Usage Restrictions](#usage-restrictions-10)
        - [Usage Guide](#usage-guide-11)
    - [capabilities Security Configuration](#capabilities-security-configuration)
        - [Scenarios](#scenarios-12)
        - [Usage Restrictions](#usage-restrictions-13)
        - [Usage Guide](#usage-guide-14)
    - [SELinux Security Configuration](#selinux-security-configuration)
        - [Scenarios](#scenarios-15)
        - [Usage Restrictions](#usage-restrictions-16)
        - [Usage Guide](#usage-guide-17)





## Seccomp Security Configuration



### Scenarios

Secure computing mode \(seccomp\) is a simple sandboxing mechanism introduced to the Linux kernel from version 2.6.23. In some specific scenarios, you may want to perform some privileged operations in a container without starting the privileged container. You can add  **--cap-add**  at runtime to obtain some small-scope permissions. For container instances with strict security requirements, th capability granularity may not meet the requirements. You can use some methods to control the permission scope in a refined manner.

-   Example

    In a common container scenario, you can use the  **-v**  flag to map a directory \(including a binary file that cannot be executed by common users\) on the host to the container.

    In the container, you can add chmod 4777 \(the modification permission of the binary file\) to the S flag bit. In this way, on the host, common users who cannot run the binary file \(or whose running permission is restricted\) can obtain the permissions of the binary file \(such as the root permission\) when running the binary file after the action added to the S flag bit is performed, so as to escalate the permission or access other files.

    In this scenario, if strict security requirements are required, the chmod, fchmod, and fchmodat system calls need to be tailored by using seccomp. 


### Usage Restrictions

-   Seccomp may affect performance. Before setting seccomp, evaluate the scenario and add the configuration only if necessary.

### Usage Guide

Use  **--security-opt**  to transfer the configuration file to the container where system calls need to be filtered.

```
isula run -itd --security-opt seccomp=/path/to/seccomp/profile.json rnd-dockerhub.huawei.com/official/busybox
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>1.  When the configuration file is transferred to the container by using  **--security-opt**  during container creation, the default configuration file \(**/etc/isulad/seccomp\_default.json**\) is used.  
>2.  When  **--security-opt**  is set to  **unconfined**  during container creation, system calls are not filtered for the container.  
>3.  **/path/to/seccomp/profile.json**  must be an absolute path.  

#### Obtaining the Default Seccomp Configuration of a Common Container

-   Start a common container \(or a container with  **--cap-add**\) and check its default permission configuration.

    ```
    cat /etc/isulad/seccomp_default.json | python -m json.tool > profile.json
    ```

    The  **seccomp**  field contains many  **syscalls**  fields. Then extract only the  **syscalls**  fields and perform the customization by referring to the customization of the seccomp configuration file.

    ```
    "defaultAction": "SCMP_ACT_ERRNO",
    "syscalls": [
    {
    "action": "SCMP_ACT_ALLOW",
    "name": "accept"
    },
    {
    "action": "SCMP_ACT_ALLOW",
    "name": "accept4"
    },
    {
    "action": "SCMP_ACT_ALLOW",
    "name": "access"
    },
    {
    "action": "SCMP_ACT_ALLOW",
    "name": "alarm"
    },
    {
    "action": "SCMP_ACT_ALLOW",
    "name": "bind"
    },
    ]...
    ```


-   Check the seccomp configuration that can be identified by the LXC.

    ```
    cat /var/lib/isulad/engines/lcr/74353e38021c29314188e29ba8c1830a4677ffe5c4decda77a1e0853ec8197cd/seccomp
    ```

    ```
    ...
    waitpid allow
    write allow
    writev allow
    ptrace allow
    personality allow [0,0,SCMP_CMP_EQ,0]
    personality allow [0,8,SCMP_CMP_EQ,0]
    personality allow [0,131072,SCMP_CMP_EQ,0]
    personality allow [0,131080,SCMP_CMP_EQ,0]
    personality allow [0,4294967295,SCMP_CMP_EQ,0]
    ...
    ```


#### Customizing the Seccomp Configuration File

When starting a container, use  **--security-opt**  to introduce the seccomp configuration file. Container instances will restrict the running of system APIs based on the configuration file. Obtain the default seccomp configuration of common containers, obtain the complete template, and customize the configuration file by referring to this section to start the container.

```
isula run --rm -it --security-opt seccomp:/path/to/seccomp/profile.json rnd-dockerhub.huawei.com/official/busybox
```

The configuration file template is as follows:

```
{
"defaultAction": "SCMP_ACT_ALLOW",
"syscalls": [
{
"name": "syscall-name",
"action": "SCMP_ACT_ERRNO",
"args": null
}
]
}
```

>![](public_sys-resources/icon-notice.gif) **NOTICE:**   
>-   **defaultAction**  and  **syscalls**: The types of their corresponding actions are the same, but their values must be different. The purpose is to ensure that each syscall has a default action. Clear definitions in the syscall array shall prevail. As long as the values of  **defaultAction**  and  **action**  are different, no action conflicts will occur. The following actions are supported:  
>    **SCMP\_ACT\_ERRNO**: forbids calling syscalls and displays error information.  
>    **SCMP\_ACT\_ALLOW**: allows calling syscalls.  
>-   **syscalls**: array, which can contain one or more syscalls.  **args**  is optional.  
>-   **name**: syscalls to be filtered.  
>-   **args**: array. The definition of each object in the array is as follows:  
>    ```  
>    type Arg struct {  
>    Index    uint     `json:"index"`     // Parameter ID. Take open(fd, buf, len) as an example. The fd corresponds to 0 and buf corresponds to 1.  
>    Value    uint64   `json:"value"`     // Value to be compared with the parameter.  
>    ValueTwo uint64   `json:"value_two"` // It is valid only when Op is set to MaskEqualTo. After the bitwise AND operation is performed on the user-defined value and the value of Value, the result is compared with the value of ValueTwo. If they are the same, the action is executed.  
>    Op       Operator `json:"op"`  
>    }  
>    ```  
>    The value of  **Op**  in  **args**  can be any of the following:  
>    "SCMP\_CMP\_NE":  NotEqualTo  
>    "SCMP\_CMP\_LT":  LessThan  
>    "SCMP\_CMP\_LE":  LessThanOrEqualTo  
>    "SCMP\_CMP\_EQ":  EqualTo  
>    "SCMP\_CMP\_GE":  GreaterThanOrEqualTo  
>    "SCMP\_CMP\_GT":  GreaterThan  
>    "SCMP\_CMP\_MASKED\_EQ": MaskEqualTo  

## capabilities Security Configuration




### Scenarios

The capability mechanism is a security feature introduced to Linux kernel after version 2.2. The super administrator permission is controlled at a smaller granularity to prevent the root permission from being used. The root permission is divided based on different domains so that the divided permissions can be enabled or disabled separately. For details about capabilities, see the  _Linux Programmer's Manual_  \([capabilities\(7\) - Linux man page](http://man7.org/linux/man-pages/man7/capabilities.7.html)\).

```
man capabilities
```

### Usage Restrictions

-   The default capability list \(whitelist\) of the iSulad service, which is carried by common container processes by default, are as follows:

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
    "CAP_AUDIT_WRITE"
    ```

-   Default configurations of capabilities include  **CAP\_SETUID**  and  **CAP\_FSETID**. If the host and a container share a directory, the container can set permissions for the binary file in the shared directory. Common users on the host can use this feature to elevate privileges. The container can write  **CAP\_AUDIT\_WRITE**  to the host, which may cause risks. If the application scenario does not require this capability, you are advised to use  **--cap-drop**  to delete the capability when starting the container.
-   Adding capabilities means that the container process has greater capabilities than before. In addition, more system call APIs are opened.

### Usage Guide

iSulad uses  **--cap-add**  or  **--cap-drop**  to add or delete specific permissions for a container. Do not add extra permissions to the container unless necessary. You are advised to remove the default but unnecessary permissions from the container.

```
isula run --rm -it --cap-add all --cap-drop SYS_ADMIN rnd-dockerhub.huawei.com/official/busybox
```

## SELinux Security Configuration



### Scenarios

Security-Enhanced Linux \(SELinux\) is a Linux kernel security module that provides a mechanism for supporting access control security policies. Through Multi-Category Security \(MCS\), iSulad labels processes in containers to control containers' access to resources, reducing privilege escalation risks and preventing further damage.

### Usage Restrictions

-   Ensure that SELinux is enabled for the host and daemon \(the  **selinux-enabled**  field in the  **/etc/isulad/daemon.json**  file is set to  **true**  or  **--selinux-enabled**  is added to command line parameters\).
-   Ensure that a proper SELinux policy has been configured on the host. container-selinux is recommended.
-   The introduction of SELinux affects the performance. Therefore, evaluate the scenario before setting SELinux. Enable the SELinux function for the daemon and set the SELinux configuration in the container only when necessary.
-   When you configure labels for a mounted volume, the source directory cannot be a subdirectory of  **/**,  **/usr**,  **/etc**,  **/tmp**,  **/home**,  **/run**,  **/var**,  **/root**, or  **/usr**.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>-   iSulad does not support labeling the container file system. To ensure that the container file system and configuration directory are labeled with the container access permission, run the  **chcon**  command to label them.  
>-   If SELinux access control is enabled for iSulad, you are advised to add a label to the  **/var/lib/isulad**  directory before starting daemon. Files and folders generated in the directory during container creation inherit the label by default. For example:  
>    ```  
>    chcon -R system_u:object_r:container_file_t:s0 /var/lib/isulad  
>    ```  

### Usage Guide

-   Enable SELinux for daemon.

    ```
    isulad --selinux-enabled
    ```


  

-   Configure SELinux security context labels during container startup.

    **--security-opt="label=user:USER"**: Set the label user for the container.

    **--security-opt="label=role:ROLE"**: Set the label role for the container.

    **--security-opt="label=type:TYPE"**: Set the label type for the container.

    **--security-opt="label=level:LEVEL"**: Set the label level for the container.

    **--security-opt="label=disable"**: Disable the SELinux configuration for the container.

    ```
    $ isula run -itd --security-opt label=type:container_t --security-opt label=level:s0:c1,c2 rnd-dockerhub.huawei.com/official/centos
    9be82878a67e36c826b67f5c7261c881ff926a352f92998b654bc8e1c6eec370
    ```


  

-   Add the selinux label to a mounted volume \(**z**  indicates the shared mode\).

    ```
    $ isula run -itd -v /test:/test:z rnd-dockerhub.huawei.com/official/centos
    9be82878a67e36c826b67f5c7261c881ff926a352f92998b654bc8e1c6eec370
    
    $ls -Z /test
    system_u:object_r:container_file_t:s0 file
    ```

      


