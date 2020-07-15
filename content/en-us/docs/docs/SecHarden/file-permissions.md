
## File Permissions

- [File Permissions](#file-permissions)
    - [Setting the Permissions on and Ownership of Files](#setting-the-permissions-on-and-ownership-of-files)
    - [Deleting Unowned Files](#deleting-unowned-files)
    - [Removing a Symbolic Link to /dev/null](#removing-a-symbolic-link-to-dev-null)
    - [Setting the umask Value for a Daemon](#setting-the-umask-value-for-a-daemon)
    - [Adding a Sticky Bit Attribute to Globally Writable Directories](#adding-a-sticky-bit-attribute-to-globally-writable-directories)
    - [Disabling the Globally Writable Permission on Unauthorized Files](#disabling-the-globally-writable-permission-on-unauthorized-files)
    - [Restricting Permissions on the at Command](#restricting-permissions-on-the-at-command)
    - [Restricting Permissions on the cron Command](#restricting-permissions-on-the-cron-command)
    - [Restricting Permissions on the sudo Command](#restricting-permissions-on-the-sudo-command)


## Setting the Permissions on and Ownership of Files

### Description

In Linux, all objects are processed as files. Even a directory will be processed as a large file containing many files. Therefore, the most important thing in Linux is the security of files and directories. Their security is ensured by permissions and owners.

By default, the permissions and ownership of common directories, executable files, and configuration files in the system are set in openEuler.

### Implementation

The following uses the  **/bin**  directory as an example to describe how to change the permission and ownership of a file:

-   Modify the file permission. For example, set the permission on the  **/bin**  directory to  **755**.

    ```
    chmod 755 /bin
    ```

-   Change the ownership of the file. For example, set the ownership and group of the  **/bin**  directory to  **root:root**.

    ```
    chown root:root /bin
    ```


## Deleting Unowned Files

### Description

When deleting a user or group, the system administrator may forget to delete the files of the user or group. If the name of a new user or group is the same as that of the deleted user or group, the new user or group will own files on which it has no permission. You are advised to delete these files.

### Implementation

Delete the file whose user ID does not exist.

1.  Search for the file whose user ID does not exist.

    ```
    find / -nouser
    ```

2.  Delete the found file. In the preceding command,  _filename_  indicates the name of the file whose user ID does not exist.

    ```
    rm -f filename
    ```


Delete the file whose group ID does not exist.

1.  Search for the file whose user ID does not exist.

    ```
    find / -nogroup
    ```

2.  Delete the found file. In the preceding command,  _filename_  indicates the name of the file whose user ID does not exist.

    ```
    rm -f filename
    ```


## Removing a Symbolic Link to /dev/null

### Description

A symbolic link to  **/dev/null**  may be used by malicious users. This affects system security. You are advised to delete these symbolic links to improve system security.

### Special Scenario

After openEuler is installed, symbolic links to  **/dev/null**  may exist. These links may have corresponding functions. \(Some of them are preconfigured and may be depended by other components.\) Rectify the fault based on the site requirements. For details, see  [Implementation](#en-us_topic_0152100319_s1b24647cdd834a8eaca3032611baf072).

For example, openEuler supports UEFI and legacy BIOS installation modes. The GRUB packages supported in the two boot scenarios are installed by default. If you select the legacy BIOS installation mode, a symbolic link  **/etc/grub2-efi.cfg**  is generated. If you select the UEFI installation mode, a symbolic link  **/etc/grub2.cfg**  is generated. You need to process these symbolic links based on the site requirements.

### Implementation

1.  <a name="en-us_topic_0152100319_l4dc74664c4fb400aaf91fb314c4f9da6"></a>Run the following command to search for symbolic links to  **/dev/null**:

    ```
    find dirname -type l -follow 2>/dev/null
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >_dir__name_  indicates the directory to be searched. Normally, key system directories, such as  **/bin**,  **/boot**,  **/usr**,  **/lib64**,  **/lib**, and  **/var**, need to be searched.  

2.  If these symbolic links are useless, run the following command to delete them:

    ```
    rm -f filename
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >_filename_  indicates the file name obtained in  [Step 1](#en-us_topic_0152100319_l4dc74664c4fb400aaf91fb314c4f9da6).  


## Setting the umask Value for a Daemon

### Description

The  **umask**  value is used to set default permission on files and directories. If the  **umask**  value is not specified, the file has the globally writable permission. This brings risks. A daemon provides a service for the system to receive user requests or network customer requests. To improve the security of files and directories created by the daemon, you are advised to set  **umask**  to  **0027**. The  **umask**  value indicates the complement of a permission. For details about how to convert the  **umask**  value to a permission, see  [umask Values](#umask-values.md).

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>By default, the  **umask**  value of the daemon is set to  **0022**  in openEuler.  

### Implementation

In configuration file  **/etc/sysconfig/init**, add  **umask 0027**  as a new row.

## Adding a Sticky Bit Attribute to Globally Writable Directories

### Description

Any user can delete or modify a file or directory in a globally writable directory, which leads to unauthorized file or directory deletion. Therefore, the sticky bit attribute is required for globally writable directories. 

### Implementation

1.  Search for globally writable directories.

    ```
    find / -type d -perm -0002 ! -perm -1000 -ls | grep -v proc
    ```

2.  Add the sticky bit attribute to globally writable directories.  _dirname_  indicates the name of the directory that is found.

    ```
    chmod +t dirname
    ```


## Disabling the Globally Writable Permission on Unauthorized Files

### Description

Any user can modify globally writable files, which affects system integrity.

### Implementation

1.  Search for all globally writable files.

    ```
    find / -type d \( -perm -o+w \) | grep -v procfind / -type f \( -perm -o+w \) | grep -v proc
    ```

2.  View the settings of files \(excluding files and directories with sticky bits\) listed in step 1, and delete the files or disable the globally writable permission on them. Run the following command to remove the permission. In the command,  _filename_  indicates the file name.

      

    ```
    chmod o-w  filename
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >You can run the following command to check whether the sticky bit is set for the file or directory. If the command output contains the  **T**  flag, the file or directory is with a sticky bit. In the command,  _filename_  indicates the name of the file or directory to be queried.  
    >```  
    >ls -l filename  
    >```  


## Restricting Permissions on the at Command

### Description

The  **at**  command is used to create a scheduled task. Users who can run the  **at**  command must be specified to protect the system from being attacked.

### Implementation

1.  Delete the  **/etc/at.deny**  file.

    ```
    rm -f /etc/at.deny
    ```

2.  Run the following command to change the ownership of file  **/etc/at.allow**  file to  **root:root**.

    ```
    chown root:root /etc/at.allow
    ```

3.  Set that only user  **root**  can operate file  **/etc/at.allow**.

    ```
    chmod og-rwx /etc/at.allow
    ```


## Restricting Permissions on the cron Command

### Description

The  **cron**  command is used to create a routine task. Users who can run the  **cron**  command must be specified to protect the system from being attacked.

### Implementation

1.  Delete the  **/etc/cron.deny**  file.

    ```
    rm -f /etc/at.deny
    ```

2.  Run the following command to change the ownership of the  **/etc/cron.allow**  file to  **root:root**:

    ```
    chown root:root /etc/cron.allow
    ```

3.  Set that only user  **root**  can operate file  **/etc/cron.allow**.

    ```
    chmod og-rwx /etc/cron.allow
    ```


## Restricting Permissions on the sudo Command

### Description

A common user can use the  **sudo**  command to run commands as the user  **root**. To harden system security, it is necessary to restrict permissions on the  **sudo**  command. Only user  **root**  can use the  **sudo**  command.

### Implementation

Modify the  **/etc/sudoers**  file to restrict permissions on the  **sudo**  command. Comment out the following configuration line:

```
#%wheel ALL=(ALL)       ALL
```
