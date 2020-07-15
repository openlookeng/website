# Upgrade Methods

-   For an upgrade between patch versions of a major version, for example, upgrading 2.x.x to 2.x.x, run the following command:

    ```
    $ sudo yum update -y iSulad
    ```

-   For an upgrade between major versions, for example, upgrading 1.x.x to 2.x.x, save the current configuration file  **/etc/isulad/daemon.json**, uninstall the existing iSulad software package, install the iSulad software package to be upgraded, and restore the configuration file.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>-   You can run the  **sudo rpm -qa |grep iSulad**  or  **isula version**  command to check the iSulad version.  
>-   If you want to manually perform upgrade between patch versions of a major version, run the following command to download the RPM packages of iSulad and all its dependent libraries:  
>    ```  
>    $ sudo rpm -Uhv iSulad-xx.xx.xx-YYYYmmdd.HHMMSS.gitxxxxxxxx.aarch64.rpm  
>    ```  
>    If the upgrade fails, run the following command to forcibly perform the upgrade:  
>    ```  
>    $ sudo rpm -Uhv --force iSulad-xx.xx.xx-YYYYmmdd.HHMMSS.gitxxxxxxxx.aarch64.rpm  
>    ```  

