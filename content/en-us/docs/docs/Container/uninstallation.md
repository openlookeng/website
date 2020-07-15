# Uninstallation

To uninstall iSulad, perform the following operations:

1.  Uninstall iSulad and its dependent software packages.
    -   If the  **yum**  command is used to install iSulad, run the following command to uninstall iSulad:

        ```
        $ sudo yum remove iSulad
        ```

    -   If the  **rpm**  command is used to install iSulad, uninstall iSulad and its dependent software packages. Run the following command to uninstall an RPM package.

        ```
        sudo rpm -e iSulad-xx.xx.xx-YYYYmmdd.HHMMSS.gitxxxxxxxx.aarch64.rpm
        ```

2.  Images, containers, volumes, and related configuration files are not automatically deleted. The reference command is as follows:

    ```
    $ sudo rm -rf /var/lib/iSulad
    ```


