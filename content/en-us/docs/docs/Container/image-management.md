# Image Management

- [Image Management](#image-management)
    - [Docker Image Management](#docker-image-management)
        - [Logging In to a Registry](#logging-in-to-a-registry)
        - [Logging Out of a Registry](#logging-out-of-a-registry)
        - [Pulling Images from a Registry](#pulling-images-from-a-registry)
        - [Deleting Images](#deleting-images)
        - [Loading Images](#loading-images)
        - [Listing Images](#listing-images)
        - [Inspecting Images](#inspecting-images)
        - [Two-Way Authentication](#two-way-authentication)
    - [Embedded Image Management](#embedded-image-management)
        - [Loading Images](#loading-images-3)
        - [Listing Images](#listing-images-4)
        - [Inspecting Images](#inspecting-images-5)
        - [Deleting Images](#deleting-images-6)


## Docker Image Management




### Logging In to a Registry

#### Description

The  **isula login**  command is run to log in to a registry. After successful login, you can run the  **isula pull**  command to pull images from the registry. If the registry does not require a password, you do not need to run this command before pulling images.

#### Usage

```
isula login [OPTIONS] SERVER
```

#### Parameters

For details about parameters in the  **login**  command, see  [Table 1](#command-line-parameters.md#en-us_topic_0189976507_table2711184314112).

#### Example

```
$ isula login -u abc my.csp-edge.com:5000

Login Succeeded
```

### Logging Out of a Registry

#### Description

The  **isula logout**  command is run to log out of a registry. If you run the  **isula pull**  command to pull images from the registry after logging out of the system, the image will fail to be pulled because you are not authenticated.

#### Usage

```
isula logout SERVER
```

#### Parameters

For details about parameters in the  **logout**  command, see  [Table 2](#command-line-parameters.md#en-us_topic_0189976507_table184058282137).

#### Example

```
$ isula logout my.csp-edge.com:5000
Logout Succeeded
```

### Pulling Images from a Registry

#### Description

Pull images from a registry to the local host.

#### Usage

```
isula pull [OPTIONS] NAME[:TAG|@DIGEST]
```

#### Parameters

For details about parameters in the  **pull**  command, see  [Table 3](#command-line-parameters.md#en-us_topic_0189976507_table157501230181515).

#### Example

```
$ isula pull localhost:5000/official/busybox
Image "localhost:5000/official/busybox" pulling
Image "localhost:5000/official/busybox@sha256:bf510723d2cd2d4e3f5ce7e93bf1e52c8fd76831995ac3bd3f90ecc866643aff" pulled
```

### Deleting Images

#### Description

Delete one or more images.

#### Usage

```
isula rmi [OPTIONS] IMAGE [IMAGE...]
```

#### Parameters

For details about parameters in the  **rmi**  command, see  [Table 4](#command-line-parameters.md#en-us_topic_0189976507_table856181871617).

#### Example

```
$ isula rmi rnd-dockerhub.huawei.com/official/busybox
Image "rnd-dockerhub.huawei.com/official/busybox" removed
```

### Loading Images

#### Description

Load images from a .tar package. The .tar package must be exported by using the  **docker save**  command or must be in the same format.

#### Usage

```
isula load [OPTIONS]
```

#### Parameters

For details about parameters in the  **load**  command, see  [Table 5](#command-line-parameters.md#en-us_topic_0189976507_table99761512187).

#### Example

```
$ isula load -i busybox.tar
Load image from "/root/busybox.tar" success
```

### Listing Images

#### Description

List all images in the current environment.

#### Usage

```
isula images
```

#### Parameters

For details about parameters in the  **images**  command, see  [Table 6](#command-line-parameters.md#en-us_topic_0189976507_table1698717275206).

#### Example

```
$ isula images
REF                                              IMAGE ID             CREATED              SIZE
rnd-dockerhub.huawei.com/official/busybox:latest e4db68de4ff2         2019-06-15 08:19:54  1.376 MB
```

### Inspecting Images

#### Description

After the configuration information of an image is returned, you can use the  **-f**  parameter to filter the information as needed.

#### Usage

```
isula inspect [options] CONTAINER|IMAGE [CONTAINER|IMAGE...]
```

#### Parameters

For details about parameters in the  **inspect**  command, see  [Table 7](#command-line-parameters.md#en-us_topic_0189976507_table73237211516).

#### Example

```
$ isula inspect -f "{{json .image.id}}" rnd-dockerhub.huawei.com/official/busybox
"e4db68de4ff27c2adfea0c54bbb73a61a42f5b667c326de4d7d5b19ab71c6a3b"
```

### Two-Way Authentication

#### Description

After this function is enabled, iSulad and image repositories communicate over HTTPS. Both iSulad and image repositories verify the validity of each other.

#### Usage

The corresponding registry needs to support this function and iSulad needs to be configured as follows:

1.  Modify iSulad configuration \(default path:  **/etc/isulad/daemon.json**\) and set  **use-decrypted-key**  to  **false**.
2.  Place related certificates in the folder named after the registry in the  **/etc/isulad/certs.d**  directory. For details about how to generate certificates, visit the official Docker website:
    -   [https://docs.docker.com/engine/security/certificates/](https://docs.docker.com/engine/security/certificates/)
    -   [https://docs.docker.com/engine/security/https/](https://docs.docker.com/engine/security/https/)


1.  Run the  **systemctl restart isulad**  command to restart iSulad.

#### Parameters

Parameters can be configured in the  **/etc/isulad/daemon.json**  file or carried when iSulad is started.

```
isulad --use-decrypted-key=false
```

#### Example

Set  **use-decrypted-key**  to  **false**.

```
$ cat /etc/isulad/daemon.json
{
    "group": "isulad",
    "graph": "/var/lib/isulad",
    "state": "/var/run/isulad",
    "engine": "lcr",
    "log-level": "ERROR",
    "pidfile": "/var/run/isulad.pid",
    "log-opts": {
        "log-file-mode": "0600",
        "log-path": "/var/lib/isulad",
        "max-file": "1",
        "max-size": "30KB"
    },
    "log-driver": "stdout",
    "hook-spec": "/etc/default/isulad/hooks/default.json",
    "start-timeout": "2m",
    "storage-driver": "overlay2",
    "storage-opts": [
        "overlay2.override_kernel_check=true"
    ],
    "registry-mirrors": [
        "docker.io"
    ],
    "insecure-registries": [
        "rnd-dockerhub.huawei.com"
    ],
    "pod-sandbox-image": "",
    "image-opt-timeout": "5m",
    "native.umask": "secure",
    "network-plugin": "",
    "cni-bin-dir": "",
    "cni-conf-dir": "",
    "image-layer-check": false,
    "use-decrypted-key": false,
    "insecure-skip-verify-enforce": false
}
```

Place the certificate in the corresponding directory.

```
$ pwd
/etc/isulad/certs.d/my.csp-edge.com:5000
$ ls
ca.crt  tls.cert  tls.key
```

Restart iSulad.

```
$ systemctl restart isulad
```

Run the  **pull**  command to download images from the registry:

```
$ isula pull my.csp-edge.com:5000/busybox
Image "my.csp-edge.com:5000/busybox" pulling
Image "my.csp-edge.com:5000/busybox@sha256:f1bdc62115dbfe8f54e52e19795ee34b4473babdeb9bc4f83045d85c7b2ad5c0" pulled
```

## Embedded Image Management

### Loading Images

#### Description

Load images based on the  **manifest**  files of embedded images. The value of  **--type**  must be set to  **embedded**.

#### Usage

```
isula load [OPTIONS] --input=FILE --type=TYPE
```

#### Parameters

For details about parameters in the  **load**  command, see  [Table 5](#command-line-parameters.md#en-us_topic_0189976507_table99761512187).

#### Example

```
$ isula load -i test.manifest --type embedded
Load image from "/root/work/bugfix/tmp/ci_testcase_data/embedded/img/test.manifest" success
```

### Listing Images

#### Description

List all images in the current environment.

#### Usage

```
isula images [OPTIONS]
```

#### Parameters

For details about parameters in the  **images**  command, see  [Table 6](#command-line-parameters.md#en-us_topic_0189976507_table1698717275206).

#### Example

```
$ isula images
REF                            IMAGE ID             CREATED              SIZE
test:v1                        9319da1f5233         2018-03-01 10:55:44  1.273 MB
```

### Inspecting Images

#### Description

After the configuration information of an image is returned, you can use the  **-f**  parameter to filter the information as needed.

#### Usage

```
isula inspect [options] CONTAINER|IMAGE [CONTAINER|IMAGE...]
```

#### Parameters

For details about parameters in the  **inspect**  command, see  [Table 7](#command-line-parameters.md#en-us_topic_0189976507_table73237211516).

#### Example

```
$ isula inspect -f "{{json .created}}" test:v1
"2018-03-01T15:55:44.322987811Z"
```

### Deleting Images

#### Description

Delete one or more images.

#### Usage

```
isula rmi [OPTIONS] IMAGE [IMAGE...]
```

#### Parameters

For details about parameters in the  **rmi**  command, see  [Table 4](#command-line-parameters.md#en-us_topic_0189976507_table856181871617).

#### Example

```
$ isula rmi test:v1
Image "test:v1" removed
```

