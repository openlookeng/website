# Usage Guide


System container functions are enhanced based on the iSula container engine. The container management function and the command format of the function provided by system containers are the same as those provided by the iSula container engine.

The following sections describe how to use the enhanced functions provided by system containers. For details about other command operations, see  [iSulad Container Engine](#isulad-container-engine.md#EN-US_TOPIC_0184808037).

The system container functions involve only the  **isula create/run**  command. Unless otherwise specified, this command is used for all functions. The command format is as follows:

```
isula create/run [OPTIONS] [COMMAND] [ARG...]
```

In the preceding format:

-   **OPTIONS**: one or more command parameters. For details about supported parameters, see  [iSulad Container Engine](#isulad-container-engine.md#EN-US_TOPIC_0184808037)  \>  [Appendix](#appendix.md#EN-US_TOPIC_0184808158)  \>  [Command Line Parameters](#command-line-parameters.md#EN-US_TOPIC_0189976936).
-   **COMMAND**: command executed after a system container is started.
-   **ARG**: parameter corresponding to the command executed after a system container is started.

