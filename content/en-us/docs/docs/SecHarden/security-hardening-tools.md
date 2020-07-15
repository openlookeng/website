# Security Hardening Tools

- [Security Hardening Tools](#security-hardening-tools)
    - [Security Hardening Procedure](#security-hardening-procedure)
    - [Hardening Items Taking Effect](#hardening-items-taking-effect)





## Security Hardening Procedure

### Overview

You need to modify the  **usr-security.conf**  file so that the security hardening tool can set hardening policies based on the  **usr-security.conf**  file. This section describes rules for modifying the  **usr-security.conf**  file. For details about the configurable security hardening items, see  [Security Hardening Guide](#security-hardening-guide.md).

### Precautions

-   After modifying the items, restart the security hardening service for the modification to take effect. For details about how to restart the service, see  [Hardening Items Taking Effect](#hardening-items-taking-effect.md).
-   When modifying security hardening items, you only need to modify the  **/etc/openEuler\_security/usr-security.conf**  file. You are not advised to modify the  **/etc/openEuler\_security/security.conf**  file. The  **security.conf**  file contains basic hardening items which are executed only once.
-   After the security hardening service is restarted for the configuration to take effect, the previous configuration cannot be deleted by deleting the corresponding hardening items from the  **usr-security.conf**  file and restarting the security hardening service.
-   Security hardening operations are recorded in the  **/var/log/openEuler-security.log**  file.

### Configuration Format

Each line in the  **usr-security.conf**  file indicates a configuration item. The configuration format varies according to the configuration content. The following describes the format of each configuration item.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>-   All configuration items start with an execution ID. The execution ID is a positive integer and can be customized.  
>-   Contents of a configuration item are separated by an at sign \(@\).  
>-   If the actual configuration content contains an at sign \(@\), use two at signs \(@@\) to distinguish the content from the separator. For example, if the actual content is  **xxx@yyy**, set this item to  **xxx@@yyy**. Currently, an at sign \(@\) cannot be placed at the beginning or end of the configuration content.  

  

-   **d**: comment

    Format:  _Execution ID_**@d@**_Object file_**@**_Match item_

    Function: Comment out lines starting with the match item \(the line can start with a space\) in an object file by adding a number sign \(\#\) at the beginning of the line.

    Example: If the execution ID is  **401**, comment out lines starting with  **%wheel**  in the  **/etc/sudoers**  file.

    ```
    401@d@/etc/sudoers@%wheel
    ```


-   **m**: replacement

    Format:  _Execution ID_**@m@**_Object file_**@**_Match item_**@**_Target value_

    Function: Replace lines starting with the match item \(the line can start with a space\) in an object file with  _match item_  and  _target value_. If the match line starts with spaces, the spaces will be deleted after the replacement.

    Example: If the execution ID is  **101**, replace lines starting with  **Protocol**  in the  **/etc/ssh/sshd\_config**  file with  **Protocol 2**. The spaces after  **Protocol**  are matched and replaced.

    ```
    101@m@/etc/ssh/sshd_config@Protocol @2
    ```

-   **sm**: accurate modification

    Format:  _Execution ID_**@sm@**_Object file_**@**_Match item_**@**_Target value_

    Function: Replace lines starting with the match item \(the line can start with a space\) in an object file with  _match item_  and  _target value_. If the match line starts with spaces, the spaces are retained after the replacement. This is the difference between  **sm**  and  **m**.

    Example: If the execution ID is  **201**, replace lines starting with  **size**  in the  **/etc/audit/hzqtest**  file with  **size 2048**.

    ```
    201@sm@/etc/audit/hzqtest@size@ 2048
    ```


-   **M**: subitem modification

    Format:  _Execution ID_**@M@**_Object file_**@**_Match item_**@**_Match subitem__\[@Value of the match subitem\]_

    Function: Match lines starting with the match item \(the line can start with a space\) in an object file and replace the content starting with the match subitem in these lines with the  _match subitem_  and  _value of the match subitem_. The value of the match subitem is optional.

    Example: If the execution ID is  **101**, find lines starting with  **key**  in the file and replace the content starting with  **key2**  in these lines with  **key2value2**.

    ```
    101@M@file@key@key2@value2
    ```

-   **systemctl**: service management

    Format:  _Execution ID_**@systemctl@**_Object service_**@**_Operation_

    Function: Use  **systemctl**  to manage object services. The value of  **Operation**  can be  **start**,  **stop**,  **restart**, or  **disable**.

    Example: If the execution ID is  **218**, stop the  **cups.service**. This provides the same function as running the  **systemctl stop cups.service**  command.

    ```
    218@systemctl@cups.service@stop
    ```

      

-   Other commands

    Format:  _Execution ID_**@**_Command_**@**_Object file_

    Function: Run the corresponding command, that is, run the command line  _Command_ _Object file_.

    Example 1: If the execution ID is  **402**, run the  **rm -f**  command to delete the  **/etc/pki/ca-trust/extracted/pem/email-ca-bundle.pem**  file.

    ```
    402@rm -f @/etc/pki/ca-trust/extracted/pem/email-ca-bundle.pem
    ```

    Example 2: If the execution ID is  **215**, run the  **touch**  command to create the  **/etc/cron.allow**  file.

    ```
    215@touch @/etc/cron.allow
    ```

    Example 3: If the execution ID is  **214**, run the  **chown**  command to change the owner of the  **/etc/at.allow**  file to  **root:root**.

    ```
    214@chown root:root @/etc/at.allow
    ```

    Example 4: If the execution ID is  **214**, run the  **chmod**  command to remove the  **rwx**  permission of the group to which the owner of the** /etc/at.allow**  file belongs and other non-owner users.

    ```
    214@chmod og-rwx @/etc/at.allow
    ```


## Hardening Items Taking Effect

After modifying the  **usr-security.conf**  file, run the following command for the new configuration items to take effect:

```
systemctl restart openEuler-security.service
```

