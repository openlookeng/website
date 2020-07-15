# Installation Guideline

1.  Install the container engine iSulad.

    ```
    # yum install iSulad
    ```

2.  Install dependent packages of system containers.

    ```
    # yum install isulad-tools authz isulad-lxcfs-toolkit lxcfs
    ```

3.  Run the following command to check whether iSulad is started:

    ```
    # systemctl status isulad
    ```

4.  Enable the lxcfs and authz services.

    ```
    # systemctl start lxcfs
    # systemctl start authz
    ```


