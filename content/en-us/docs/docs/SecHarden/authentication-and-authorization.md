# Authentication and Authorization

- [Authentication and Authorization](#authentication-and-authorization)
    - [Setting a Warning for Remote Network Access](#setting-a-warning-for-remote-network-access)
    - [Forestalling Unauthorized System Restart by Holding Down Ctrl, Alt, and Delete](#forestalling-unauthorized-system-restart-by-holding-down-ctrl-alt-and-delete)
    - [Setting an Automatic Exit Interval for Shell](#setting-an-automatic-exit-interval-for-shell)
    - [Setting the Default umask Value for Users to 0077](#setting-the-default-umask-value-for-users-to-0077)
    - [Setting the GRUB2 Encryption Password](#setting-the-grub2-encryption-password)
    - [Setting the Secure Single-user Mode](#setting-the-secure-single-user-mode)
    - [Disabling Interactive Startup](#disabling-interactive-startup)



## Setting a Warning for Remote Network Access

### Description

A warning for remote network access is configured and displayed for users who attempt to remotely log in to the system. The warning indicates the penalty for authorized access and is used to threaten potential attackers. When the warning is displayed, system architecture and other system information are hidden to protect the system from being attacked.

### Implementation

This setting can be implemented by modifying the  **/etc/issue.net**  file. Replace the original content in the  **/etc/issue.net**  file with the following information \(which has been set by default in openEuler\):

```
Authorized users only. All activities may be monitored and reported. 
```

## Forestalling Unauthorized System Restart by Holding Down Ctrl, Alt, and Delete

### Description

By default, you can restart the OS by holding down  **Ctrl**,  **Alt**, and  **Delete**. Disabling this feature can prevent data loss caused by misoperations.

### Implementation

To disable the feature of restarting the system by holding down  **Ctrl**,  **Alt**, and  **Delete**, perform the following steps:

1.  Run the following commands to delete the two  **ctrl-alt-del.target**  files:

    ```
    rm -f /etc/systemd/system/ctrl-alt-del.target
    rm -f /usr/lib/systemd/system/ctrl-alt-del.target
    ```

2.  Change  **\#CtrlAltDelBurstAction=reboot-force**  to  **CtrlAltDelBurstAction=none**  in the  **/etc/systemd/system.conf**  file.
3.  Run the following command to restart systemd for the modification to take effect:

    ```
    systemctl daemon-reexec
    ```

## Setting an Automatic Exit Interval for Shell

### Description

An unattended shell is prone to listening or attacks. Therefore, a mechanism must be configured to ensure that a shell can automatically exit when it does not run for a period.

### Implementation

At the end of file  **/etc/profile**, set the  **TMOUT**  field \(unit: second\) that specifies the interval for automatic exit as follows:

```
export TMOUT=300
```

## Setting the Default umask Value for Users to 0077

### Description

The  **umask**  value is used to set default permission on files and directories. A smaller  **umask**  value indicates that group users or other users have incorrect permission, which brings system security risks. Therefore, the default  **umask**  value must be set to  **0077**  for all users, that is, the default permission on user directories is  **700**  and the permission on user files is  **600**. The  **umask**  value indicates the complement of a permission. For details about how to convert the  **umask**  value to a permission, see  [umask Values](#umask-values.md).

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>By default, the  **umask**  value of the openEuler user is set to  **0077**.  

### Implementation

1.  Add  **umask 0077**  to the  **/etc/bashrc**  file and all files in the  **/etc/profile.d/**  directory.

    ```
    echo "umask 0077" >> $FILE
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >_$FILE_  indicates the file name, for example, echo "umask 0077" \>\> /etc/bashrc.  

2.  Set the ownership and group of the  **/etc/bashrc**  file and all files in the  **/etc/profile.d/**  directory to  **root**.

    ```
    chown root.root $FILE
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >_$FILE_  indicates the file name, for example,  **chown root.root /etc/bashrc**.  


## Setting the GRUB2 Encryption Password

### Description

GRand Unified Bootloader \(GRUB\) is an operating system boot manager used to boot different systems \(such as Windows and Linux\). GRUB2 is an upgraded version of GRUB.

When starting the system, you can modify the startup parameters of the system on the GRUB2 screen. To ensure that the system startup parameters are not modified randomly, you need to encrypt the GRUB2 screen. The startup parameters can be modified only when the correct GRUB2 password is entered.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>The default password of GRUB2 is  **openEuler\#12**. You are advised to change the default password upon the first login and periodically update the password. If the password is leaked, startup item configurations may be modified, causing the system startup failure.   

### Implementation

1.  Run the  **grub2-mkpasswd-pbkdf2**  command to generate an encrypted password.

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >SHA-512 is used as the GRUB2 encryption algorithm.  

    ```
    # grub2-mkpasswd-pbkdf2
    Enter password: 
    Reenter password: 
    PBKDF2 hash of your password is 
    grub.pbkdf2.sha512.10000.5A45748D892672FDA02DD3B6F7AE390AC6E6D532A600D4AC477D25C7D087644697D8A0894DFED9D86DC2A27F4E01D925C46417A225FC099C12DBD3D7D49A7425.2BD2F5BF4907DCC389CC5D165DB85CC3E2C94C8F9A30B01DACAA9CD552B731BA1DD3B7CC2C765704D55B8CD962D2AEF19A753CBE9B8464E2B1EB39A3BB4EAB08
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >Enter the same password in the  **Enter password**  and  **Reenter password**  lines.  
    >After  **openEuler\#12**  is encrypted by  **grub2-mkpasswd-pbkdf2**, the output is  **grub.pbkdf2.sha512.10000.5A45748D892672FDA02DD3B6F7AE390AC6E6D532A600D4AC477D25C7D087644697D8A0894DFED9D86DC2A27F4E01D925C46417A225FC099C12DBD3D7D49A7425.2BD2F5BF4907DCC389CC5D165DB85CC3E2C94C8F9A30B01DACAA9CD552B731BA1DD3B7CC2C765704D55B8CD962D2AEF19A753CBE9B8464E2B1EB39A3BB4EAB08**. The ciphertext is different each time.  

2.  Open  **/boot/efi/EFI/openEuler/grub.cfg**  in a vi editor. Append the following fields to the beginning of  **/boot/efi/EFI/openEuler/grub.cfg**.

    ```
    set superusers="root"
    password_pbkdf2 root grub.pbkdf2.sha512.10000.5A45748D892672FDA02DD3B6F7AE390AC6E6D532A600D4AC477D25C7D087644697D8A0894DFED9D86DC2A27F4E01D925C46417A225FC099C12DBD3D7D49A7425.2BD2F5BF4907DCC389CC5D165DB85CC3E2C94C8F9A30B01DACAA9CD552B731BA1DD3B7CC2C765704D55B8CD962D2AEF19A753CBE9B8464E2B1EB39A3BB4EAB08
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >-   The  **superusers**  field is used to set the account name of the super GRUB2 administrator.  
    >-   The first parameter following the  **password\_pbkdf2**  field is the GRUB2 account name, and the second parameter is the encrypted password of the account.  


## Setting the Secure Single-user Mode

### Description

When you log in to the system as user  **root**  in single-user mode, if the  **root**  password is not set, high security risks exist.

### Implementation

This setting can be implemented by modifying the  **/etc/sysconfig/init**  file. Set  **SINGLE**  to  **SINGLE=/sbin/sulogin**.

## Disabling Interactive Startup

### Description

With interactive guidance, console users can disable audit, firewall, or other services, which compromises system security. Users can disable interactive startup to improve security. This item is disabled by default in openEuler.

### Implementation

This setting can be implemented by modifying the  **/etc/sysconfig/init**  file. Set  **PROMPT**  to  **no**.
