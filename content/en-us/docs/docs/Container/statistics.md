# Statistics

- [Statistics](#statistics)
    - [events](#events)
    - [info](#info)
    - [version](#version)


## events

Syntax:  **docker events \[**_options_**\]**

Function: Obtains real-time events from the docker daemon.

Parameter description:

**--since=""**: Displays events generated after the specified timestamp.

**--until=""**: Displays events generated before the specified timestamp.

Example: 

After the  **docker events**  command is executed, a container is created and started by running the  **docker run**  command. create and start events are output.

```
$ sudo docker events
2019-08-28T16:23:09.338838795+08:00 container create 53450588a20800d8231aa1dc4439a734e16955387efb5f259c47737dba9e2b5e (image=busybox:latest, name=eager_wu)
2019-08-28T16:23:09.339909205+08:00 container attach 53450588a20800d8231aa1dc4439a734e16955387efb5f259c47737dba9e2b5e (image=busybox:latest, name=eager_wu)
2019-08-28T16:23:09.397717518+08:00 network connect e2e20f52662f1ee2b01545da3b02e5ec7ff9c85adf688dce89a9eb73661dedaa (container=53450588a20800d8231aa1dc4439a734e16955387efb5f259c47737dba9e2b5e, name=bridge, type=bridge)
2019-08-28T16:23:09.922224724+08:00 container start 53450588a20800d8231aa1dc4439a734e16955387efb5f259c47737dba9e2b5e (image=busybox:latest, name=eager_wu)
2019-08-28T16:23:09.924121158+08:00 container resize 53450588a20800d8231aa1dc4439a734e16955387efb5f259c47737dba9e2b5e (height=48, image=busybox:latest, name=eager_wu, width=210)
```

  

## info

Syntax:  **docker info**

Function: Displays the Docker system information, including the number of containers, number of images, image storage driver, container execution driver, kernel version, and host OS version.

Parameter description: none.

Example:

```
$ sudo docker info
Containers: 4
 Running: 3
 Paused: 0
 Stopped: 1
Images: 45
Server Version: 18.09.0
Storage Driver: devicemapper
 Pool Name: docker-thinpool
 Pool Blocksize: 524.3kB
 Base Device Size: 10.74GB
 Backing Filesystem: ext4
 Udev Sync Supported: true
 Data Space Used: 11GB
 Data Space Total: 51GB
 Data Space Available: 39.99GB
 Metadata Space Used: 5.083MB
 Metadata Space Total: 532.7MB
 Metadata Space Available: 527.6MB
 Thin Pool Minimum Free Space: 5.1GB
 Deferred Removal Enabled: true
 Deferred Deletion Enabled: true
 Deferred Deleted Device Count: 0
......
```

  

## version

Syntax:  **docker version**

Function: Displays the Docker version information, including the client version, server version, Go version, and OS and Arch information.

Parameter description: none.

Example:

```
$ sudo docker version
Client:
 Version:           18.09.0
 EulerVersion:      18.09.0.48
 API version:       1.39
 Go version:        go1.11
 Git commit:        cbf6283
 Built:             Mon Apr  1 00:00:00 2019
 OS/Arch:           linux/arm64
 Experimental:      false

Server:
 Engine:
  Version:          18.09.0
  EulerVersion:     18.09.0.48
  API version:      1.39 (minimum version 1.12)
  Go version:       go1.11
  Git commit:       cbf6283
  Built:            Mon Apr  1 00:00:00 2019
  OS/Arch:          linux/arm64
  Experimental:     false
```

  

