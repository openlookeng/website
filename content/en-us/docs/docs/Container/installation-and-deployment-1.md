# Installation and Deployment

- [Installation and Deployment](#installation-and-deployment-1)
    - [Installation Methods](#installation-methods-26)
    - [Deployment Configuration](#deployment-configuration-27)
        - [Configuring the Docker Engine](#configuring-the-docker-engine)
        - [iSulad Configuration](#isulad-configuration)
        - [Configuration.toml](#configuration-toml)


## Installation Methods

### Prerequisites

-   For better performance experience, a secure container needs to run on the bare metal server and must not run on VMs.
-   A secure container depends on the following components \(openEuler 1.0 version\). Ensure that the required components have been installed in the environment. To install iSulad, refer to  [Installation Methods](#installation-methods.md).
    -   docker-engine
    -   qemu


### Installation Procedure

Released secure container components are integrated in the  **kata-containers-**_version_**.rpm**  package. You can run the  **rpm**  command to install the corresponding software.

```
rpm -ivh kata-containers-<version>.rpm
```

## Deployment Configuration

### Configuring the Docker Engine

To enable the Docker engine to support kata-runtime, perform the following steps to configure the Docker engine:

1.  Ensure that all software packages \(**docker-engine**  and  **kata-containers**\) have been installed in the environment.
2.  Stop the Docker engine.

    ```
    systemctl stop docker
    ```

3.  Modify the configuration file  **/etc/docker/daemon.json**  of the Docker engine and add the following configuration:

    ```
    {
      "runtimes": {
        "kata-runtime": {
          "path": "/usr/bin/kata-runtime",
          "runtimeArgs": [
              "--kata-config",
              "/usr/share/defaults/kata-containers/configuration.toml"
            ]
        }
      }
    }
    ```

4.  Restart the Docker engine.

    ```
    systemctl start docker
    ```


### iSulad Configuration

To enable the iSulad to support the new container runtime kata-runtime, perform the following steps which are similar to those for the container engine docker-engine:

1.  Ensure that all software packages \(iSulad and kata-containers\) have been installed in the environment.
2.  Stop iSulad.

    ```
    systemctl stop isulad
    ```

3.  Modify the  **/etc/isulad/daemon.json**  configuration file of the iSulad and add the following configurations:

    ```
    {
      "runtimes": {
        "kata-runtime": {
          "path": "/usr/bin/kata-runtime",
          "runtime-args": [
              "--kata-config",
              "/usr/share/defaults/kata-containers/configuration.toml"
            ]
        }
      }
    }
    ```

4.  Restart iSulad.

    ```
    systemctl start isulad
    ```


### Configuration.toml

The secure container provides a global configuration file configuration.toml. Users can also customize the path and configuration options of the secure container configuration file.

In the  **runtimeArges**  field of Docker engine, you can use  **--kata-config**  to specify a private file. The default configuration file path is  **/usr/share/defaults/kata-containers/configuration.toml**.

The following lists the common fields in the configuration file. For details about the configuration file options, see  [configuration.toml](#configuration-toml-31.md).

1.  hypervisor.qemu
    -   **path**: specifies the execution path of the virtualization QEMU.
    -   **kernel**: specifies the execution path of the guest kernel.
    -   **initrd**: specifies the guest initrd execution path.
    -   **machine\_type**: specifies the type of the analog chip. The value is  **virt**  for the ARM architecture and  **pc**  for the x86 architecture.
    -   **kernel\_params**: specifies the running parameters of the guest kernel.

2.  proxy.kata
    -   **path**: specifies the kata-proxy running path.
    -   **enable\_debug**: enables the debugging function for the kata-proxy process.

3.  agent.kata
    -   **enable\_blk\_mount**: enables guest mounting of the block device.
    -   **enable\_debug**: enables the debugging function for the kata-agent process.

4.  runtime
    -   **enable\_cpu\_memory\_hotplug**: enables CPU and memory hot swap.
    -   **enable\_debug**: enables debugging for the kata-runtime process.


