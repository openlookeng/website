# Querying Information

- [Querying Information](#querying-information)
    - [Querying the Service Version](#querying-the-service-version)
    - [Querying System-level Information](#querying-system-level-information)


## Querying the Service Version

### Description

The  **isula version**  command is run to query the version of the iSulad service.

### Usage

```
isula version
```

### Example

Query the version information.

```
isula version
```

If the iSulad service is running properly, you can view the information about versions of the client, server, and  **OCI config**.

```
Client:
  Version:      1.0.31
  Git commit:   fa7f9902738e8b3d7f2eb22768b9a1372ddd1199
  Built:        2019-07-30T04:21:48.521198248-04:00

Server:
  Version:      1.0.31
  Git commit:   fa7f9902738e8b3d7f2eb22768b9a1372ddd1199
  Built:        2019-07-30T04:21:48.521198248-04:00

OCI config:
  Version:      1.0.0-rc5-dev
  Default file: /etc/default/isulad/config.json
```

If the iSulad service is not running, only the client information is queried and a message is displayed indicating that the connection times out.

```
Client:
  Version:      1.0.31
  Git commit:   fa7f9902738e8b3d7f2eb22768b9a1372ddd1199
  Built:        2019-07-30T04:21:48.521198248-04:00

Can not connect with server.Is the iSulad daemon running on the host?
```

Therefore, the  **isula version**  command is often used to check whether the iSulad service is running properly.

## Querying System-level Information

### Description

The  **isula info**  command is run to query the system-level information, number of containers, and number of images.

### Usage

```
isula info
```

### Example

Query system-level information, including the number of containers, number of images, kernel version, and operating system \(OS\).

```
$ isula info
Containers: 2
 Running: 0
 Paused: 0
 Stopped: 2
Images: 8
Server Version: 1.0.31
Logging Driver: json-file
Cgroup Driverr: cgroupfs
Hugetlb Pagesize: 2MB
Kernel Version: 4.19
Operating System: Fedora 29 (Twenty Nine)
OSType: Linux
Architecture: x86_64
CPUs: 8
Total Memory: 7 GB
Name: localhost.localdomain
iSulad Root Dir: /var/lib/isulad
```

