# Checking the Container Health Status

- [Checking the Container Health Status](#checking-the-container-health-status)
    - [Scenarios](#scenarios-7)
    - [Configuration Methods](#configuration-methods)
    - [Check Rules](#check-rules)
    - [Usage Restrictions](#usage-restrictions-8)



## Scenarios

In the production environment, bugs are inevitable in applications provided by developers or services provided by platforms. Therefore, a management system is indispensable for periodically checking and repairing applications. The container health check mechanism adds a user-defined health check function for containers. When a container is created, the  **--health-cmd**  option is configured so that commands are periodically executed in the container to monitor the health status of the container based on return values.

## Configuration Methods

Configurations during container startup:

```
isula run -itd --health-cmd "echo iSulad >> /tmp/health_check_file || exit 1" --health-interval 5m --health-timeout 3s --health-exit-on-unhealthy  busybox bash
```

The configurable options are as follows:

-   **--health-cmd**: This option is mandatory. If  **0**  is returned after a command is run in a container, the command execution succeeds. If a value other than  **0**  is returned, the command execution fails.
-   **--health-interval**: interval between two consecutive command executions. The default value is  **30s**. The value ranges from  **1s**  to the maximum value of Int64 \(unit: nanosecond\). If the input parameter is set to  **0s**, the default value is used.
-   **--health-timeout**: maximum duration for executing a single check command. If the execution times out, the command execution fails. The default value is  **30s**. The value ranges from  **1s**  to the maximum value of Int64 \(unit: nanosecond\). If the input parameter is set to  **0s**, the default value is used. Only containers whose runtime is of the LCR type are supported.
-   **--health-start-period**: container initialization time. The default value is  **0s**. The value ranges from  **1s**  to the maximum value of Int64 \(unit: nanosecond\).
-   **--health-retries**: maximum number of retries for the health check. The default value is  **3**. The maximum value is the maximum value of Int32.
-   **--health-exit-on-unhealthy**: specifies whether to kill a container when it is unhealthy. The default value is  **false**.

## Check Rules

1.  After a container is started, the container status is  **health:starting**.
2.  After the period specified by  **start-period**, the  **cmd**  command is periodically executed in the container at the interval specified by  **interval**. That is, after the command is executed, the command will be executed again after the specified period.
3.  If the  **cmd**  command is successfully executed within the time specified by  **timeout**  and the return value is  **0**, the check is successful. Otherwise, the check fails. If the check is successful, the container status changes to  **health:healthy**.
4.  If the  **cmd**  command fails to be executed for the number of times specified by  **retries**, the container status changes to  **health:unhealthy**, and the container continues the health check.
5.  When the container status is  **health:unhealthy**, the container status changes to  **health:healthy**  if a check succeeds.
6.  If  **--exit-on-unhealthy**  is set, and the container exits due to reasons other than being killed \(the returned exit code is  **137**\), the health check takes effect only after the container is restarted.
7.  When the  **cmd**  command execution is complete or times out, Docker daemon will record the start time, return value, and standard output of the check to the configuration file of the container. A maximum of five records can be recorded. In addition, the configuration file of the container stores health check parameters.
8.  When the container is running, the health check status is written into the container configurations. You can run the  **isula inspect**  command to view the status.

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

## Usage Restrictions

-   A maximum of five health check status records can be stored in a container. The last five records are saved.
-   If health check parameters are set to  **0**  during container startup, the default values are used.
-   After a container with configured health check parameters is started, if iSulad daemon exits, the health check is not executed. After iSulad daemon is restarted, the health status of the running container changes to  **starting**. Afterwards, the check rules are the same as above.
-   If the health check fails for the first time, the health check status will not change from  **starting**  to  **unhealthy**  until the specified number of retries \(**--health-retries**\) is reached, or to  **healthy**  until the health check succeeds.
-   The health check function of containers whose runtime is of the Open Container Initiative \(OCI\) type needs to be improved. Only containers whose runtime is of the LCR type are supported.

