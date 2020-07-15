# Supporting OCI hooks

- [Supporting OCI hooks](#supporting-oci-hooks)
    - [Description](#description)
    - [APIs](#apis)
    - [Usage Restrictions](#usage-restrictions)


## Description

The running of standard OCI hooks within the lifecycle of a container is supported. There are three types of standard hooks:

-   prestart hook: executed after the  **isula start**  command is executed and before the init process of the container is started.
-   poststart hook: executed after the init process is started and before the  **isula start**  command is returned.
-   poststop hook: executed after the container is stopped and before the stop command is returned.

The configuration format specifications of OCI hooks are as follows:

-   **path**: \(Mandatory\) The value must be a character string and must be an absolute path. The specified file must have the execute permission.
-   **args**: \(Optional\) The value must be a character string array. The syntax is the same as that of  **args**  in  **execv**.
-   **env**: \(Optional\) The value must be a character string array. The syntax is the same as that of environment variables. The content is a key-value pair, for example,  **PATH=/usr/bin**.
-   **timeout**: \(Optional\) The value must be an integer that is greater than 0. It indicates the timeout interval for hook execution. If the running time of the hook process exceeds the configured time, the hook process is killed.

The hook configuration is in JSON format and usually stored in a file ended with  **json**. An example is as follows:

```
{
        "prestart": [
            {
                "path": "/usr/bin/echo",
                "args": ["arg1", "arg2"],
                "env":  [ "key1=value1"],
                "timeout": 30
            },
            {
                "path": "/usr/bin/ls",
                "args": ["/tmp"]
            }
        ],
        "poststart": [
            {
                "path": "/usr/bin/ls",
                "args": ["/tmp"],
                "timeout": 5
            }
        ],
        "poststop": [
            {
                "path": "/tmp/cleanup.sh",
                "args": ["cleanup.sh", "-f"]
            }
        ]
}
```

## APIs

Both iSulad and iSula provide the hook APIs. The default hook configurations provided by iSulad apply to all containers. The hook APIs provided by iSula apply only to the currently created container.

The default OCI hook configurations provided by iSulad are as follows:

-   Set the configuration item  **hook-spec**  in the  **/etc/isulad/daemon.json**  configuration file to specify the path of the hook configuration file. Example:  **"hook-spec": "/etc/default/isulad/hooks/default.json"**
-   Use the  **isulad --hook-spec**  parameter to set the path of the hook configuration file.

The OCI hook configurations provided by iSula are as follows:

-   **isula create --hook-spec**: specifies the path of the hook configuration file in JSON format.
-   **isula run --hook-spec**: specifies the path of the hook configuration file in JSON format.

The configuration for  **run**  takes effect in the creation phase.

## Usage Restrictions

-   The path specified by  **hook-spec**  must be an absolute path.
-   The file specified by  **hook-spec**  must exist.
-   The path specified by  **hook-spec**  must contain a common text file in JSON format.
-   The file specified by  **hook-spec**  cannot exceed 10 MB.
-   **path**  configured for hooks must be an absolute path.
-   The file that is designated by  **path**  configured for hooks must exist.
-   The file that is designated by  **path**  configured for hooks must have the execute permission.
-   The owner of the file that is designated by  **path**  configured for hooks must be user  **root**.
-   Only user  **root**  has the write permission on the file that is designated by  **path**  configured for hooks.
-   The value of  **timeout**  configured for hooks must be greater than  **0**.

      


