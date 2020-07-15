# SELinux Configuration

## Overview

Discretionary access control \(DAC\) determines whether a resource can be accessed based on users, groups, and other permissions. It does not allow the system administrator to create comprehensive and fine-grained security policies. SELinux \(Security-Enhanced Linux\) is a module of the Linux kernel and a security subsystem of Linux. SELinux implements mandatory access control \(MAC\). Each process and system resource has a special security label. In addition to the principles specified by the DAC, the SELinux needs to determine whether each type of process has the permission to access a type of resource.

By default, openEuler uses SELinux to improve system security. SELinux has three modes:

-   **permissive**: The SELinux outputs alarms but does not forcibly execute the security policy.
-   **enforcing**: The SELinux security policy is forcibly executed.
-   **disabled**: The SELinux security policy is not loaded.

## Configuration Description

SELinux is enabled for openEuler by default and the default mode is enforcing. You can change the SELinux mode by changing the value of  **SELINUX**  in  **/etc/selinux/config**.

-   To disable the SELinux policy, run the following command:

    ```
    SELINUX=disabled
    ```

-   To use the permissive policy, run the following command:

    ```
    SELINUX=permissive
    ```


>![](public_sys-resources/icon-note.gif) **NOTE:**   
>When you switch between the disabled mode and the other mode, you need to restart the system for the switch to take effect.  
>```  
># reboot  
>```  

## SELinux Commands

-   Query the SELinux mode. For example, the following shows that the SELinux mode is permissive.

    ```
    # getenforce
    Permissive
    ```

-   Set the SELinux mode.  **0**  indicates the permissive mode, and  **1**  indicates the enforcing mode. For example, run the following command to set the SELinux mode to enforcing. This command cannot be used to set the disabled mode. After the system is restarted, the mode set in  **/etc/selinux/config**  is restored.

    ```
    # setenforce 1
    ```

-   Query the SELinux status.  **SELinux status**  indicates the SELinux status.  **enabled**  indicates that SELinux is enabled, and  **disabled**  indicates that SELinux is disabled.  **Current mode**  indicates the current security policy of the SELinux.

    ```
    # sestatus
    SELinux status:                 enabled
    SELinuxfs mount:                /sys/fs/selinux
    SELinux root directory:         /etc/selinux
    Loaded policy name:             targeted
    Current mode:                   enforcing
    Mode from config file:          enforcing
    Policy MLS status:              enabled
    Policy deny_unknown status:     allowed
    Memory protection checking:     actual (secure)
    Max kernel policy version:      31
    ```


