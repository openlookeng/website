# Image Management

- [Image Management](#image-management-2)
    - [build](#build)
    - [history](#history)
    - [images](#images)
    - [import](#import)
    - [load](#load)
    - [login](#login)
    - [logout](#logout)
    - [pull](#pull)
    - [push](#push)
    - [rmi](#rmi)
    - [save](#save)
    - [search](#search)
    - [tag](#tag)


  



## build

Syntax:  **docker build \[**_options_**\]** _path_ **|** _URL_ **| -**

Function: Builds an image using the Dockerfile in the specified path.

Parameter description: Common parameters are as follows. For details about more parameters, see the  **docker help build**  command section.

**Table  1**  Parameter description

<a name="en-us_topic_0183243738_table14251918184"></a>
<table><thead align="left"><tr id="en-us_topic_0183243738_row172615113189"><th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.1"><p id="en-us_topic_0183243738_p3263119181"><a name="en-us_topic_0183243738_p3263119181"></a><a name="en-us_topic_0183243738_p3263119181"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.2"><p id="en-us_topic_0183243738_p162691131813"><a name="en-us_topic_0183243738_p162691131813"></a><a name="en-us_topic_0183243738_p162691131813"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0183243738_row122619121815"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243738_p1526614185"><a name="en-us_topic_0183243738_p1526614185"></a><a name="en-us_topic_0183243738_p1526614185"></a>--force-rm=false</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243738_p9803426131816"><a name="en-us_topic_0183243738_p9803426131816"></a><a name="en-us_topic_0183243738_p9803426131816"></a>Deletes containers generated during the build process even if the build is not successful.</p>
</td>
</tr>
<tr id="en-us_topic_0183243738_row660114322184"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243738_p460219324184"><a name="en-us_topic_0183243738_p460219324184"></a><a name="en-us_topic_0183243738_p460219324184"></a>--no-cache=false</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243738_p5602163216189"><a name="en-us_topic_0183243738_p5602163216189"></a><a name="en-us_topic_0183243738_p5602163216189"></a>Builds cache without using cache.</p>
</td>
</tr>
<tr id="en-us_topic_0183243738_row9354121121913"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243738_p9354714196"><a name="en-us_topic_0183243738_p9354714196"></a><a name="en-us_topic_0183243738_p9354714196"></a>-q, --quiet=false</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243738_p33544151914"><a name="en-us_topic_0183243738_p33544151914"></a><a name="en-us_topic_0183243738_p33544151914"></a>Prevents the redundant information generation during the build.</p>
</td>
</tr>
<tr id="en-us_topic_0183243738_row37811581916"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243738_p177819158192"><a name="en-us_topic_0183243738_p177819158192"></a><a name="en-us_topic_0183243738_p177819158192"></a>--rm=true</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243738_p1546216313191"><a name="en-us_topic_0183243738_p1546216313191"></a><a name="en-us_topic_0183243738_p1546216313191"></a>Deletes the container generated during the build after the build is successful.</p>
</td>
</tr>
<tr id="en-us_topic_0183243738_row136272022111912"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243738_p862882217196"><a name="en-us_topic_0183243738_p862882217196"></a><a name="en-us_topic_0183243738_p862882217196"></a>-t, --tag=""</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243738_p13391038161911"><a name="en-us_topic_0183243738_p13391038161911"></a><a name="en-us_topic_0183243738_p13391038161911"></a>Tag name of the image generated during the build.</p>
</td>
</tr>
<tr id="en-us_topic_0183243738_row7484172061913"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243738_p4485320161916"><a name="en-us_topic_0183243738_p4485320161916"></a><a name="en-us_topic_0183243738_p4485320161916"></a>--build-arg=[]</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243738_p3485112061914"><a name="en-us_topic_0183243738_p3485112061914"></a><a name="en-us_topic_0183243738_p3485112061914"></a>Configures the build parameters.</p>
</td>
</tr>
<tr id="en-us_topic_0183243738_row3920817171919"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243738_p19920121701910"><a name="en-us_topic_0183243738_p19920121701910"></a><a name="en-us_topic_0183243738_p19920121701910"></a>--label=[]</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243738_p777151152020"><a name="en-us_topic_0183243738_p777151152020"></a><a name="en-us_topic_0183243738_p777151152020"></a>Image-related parameters. The description of each parameter is similar to that of the <strong id="en-us_topic_0183243738_b1625613375246"><a name="en-us_topic_0183243738_b1625613375246"></a><a name="en-us_topic_0183243738_b1625613375246"></a>create</strong> command.</p>
</td>
</tr>
<tr id="en-us_topic_0183243738_row1993117602010"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243738_p18931106112015"><a name="en-us_topic_0183243738_p18931106112015"></a><a name="en-us_topic_0183243738_p18931106112015"></a>--isolation</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243738_p29312652012"><a name="en-us_topic_0183243738_p29312652012"></a><a name="en-us_topic_0183243738_p29312652012"></a>Container isolation method.</p>
</td>
</tr>
<tr id="en-us_topic_0183243738_row1325154192018"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243738_p825184112011"><a name="en-us_topic_0183243738_p825184112011"></a><a name="en-us_topic_0183243738_p825184112011"></a>--pull</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243738_p22517417207"><a name="en-us_topic_0183243738_p22517417207"></a><a name="en-us_topic_0183243738_p22517417207"></a>Obtains the latest image during the build.</p>
</td>
</tr>
</tbody>
</table>

**Dockerfile Command**

Dockerfile is used to describe how to build an image and automatically build a container. The format of all  **Dockerfile**  commands is  _instruction_ _arguments_.

  

**FROM Command**

Syntax:  **FROM** _image_  or  **FROM** _image_:_tag_

Function: Specifies a basic image, which is the first command for all Dockerfile files. If the tag of a basic image is not specified, the default tag name  **latest**  is used.

  

**RUN Command**

Syntax:  **RUN** _command_  \(for example,  **run in a shell - \`/bin/sh -c\`**\) or

**RUN \[**_executable_,  _param1_,  _param2_  ...  **\]**  \(in the  **exec**  command format\)

Function: Runs any command in the image specified by the  **FROM**  command and then commits the result. The committed image can be used in later commands. The  **RUN**  command is equivalent to:

**docker run** _image_ _command_

**docker commit** _container\_id_

  

**Remarks**

The number sign \(\#\) is used to comment out.

  

**MAINTAINER Command**

Syntax:  **MAINTAINER **_name_

Function: Specifies the name and contact information of the maintenance personnel.

  

**ENTRYPOINT Command**

Syntax:  **ENTRYPOINT cmd **_param1 param2..._  or  **ENTRYPOINT \[**_"cmd", "param1", "param2"..._**\]**

Function: Configures the command to be executed during container startup.

  

**USER Command**

Syntax:  **USER **_name_

Function: Specifies the running user of memcached.

  

**EXPOSE Command**

Syntax:  **EXPOSE **_port_** \[**_port_**...\]**

Function: Enables one or more ports for images.

  

**ENV Command**

Syntax:  **ENV**_ key value_

Function: Configures environment variables. After the environment variables are configured, the  **RUN**  commands can be subsequently used.

  

**ADD Command**

Syntax:  **ADD**_ src dst_

Function: Copies a file from the  _src_  directory to the  _dest_  directory of a container.  _src_  indicates the relative path of the source directory to be built. It can be the path of a file or directory, or a remote file URL.  _dest_  indicates the absolute path of the container.

  

**VOLUME Command**

Syntax:  **VOLUME \["**_mountpoint_**"\]**

Function: Creates a mount point for sharing a directory.

  

**WORKDIR Command**

Syntax:  **workdir **_path_

Function: Runs the  **RUN**,  **CMD**, and  **ENTRYPOINT**  commands to set the current working path. The current working path can be set multiple times. If the current working path is a relative path, it is relative to the previous  **WORKDIR**  command.

  

**CMD command**

Syntax:  **CMD \[**_"executable","param1","param2"_**\]**  \(This command is similar to the  **exec**  command and is preferred.\)

**CMD \["**_param1_**","**_param2_**"\]**  \(The parameters are the default parameters for ENTRYPOINT.\)

**CMD** _command_ _param1_ _param2_  \(This command is similar to the  **shell**  command.\)

Function: A Dockerfile can contain only one CMD command. If there are multiple CMD commands, only the last one takes effect.

  

**ONBUILD Commands**

Syntax:  **ONBUILD \[**_other commands_**\]**

Function: This command is followed by other commands, such as the  **RUN**  and  **COPY**  commands. This command is not executed during image build and is executed only when the current image is used as the basic image to build the next-level image.

The following is a complete example of the Dockerfile command that builds an image with the sshd service installed.

<a name="en-us_topic_0183243738_en-us_topic_0155237683_en-us_topic_0076221025_en-us_topic_0043209539_table50916422"></a>
<table><tbody><tr id="en-us_topic_0183243738_en-us_topic_0155237683_en-us_topic_0076221025_en-us_topic_0043209539_row58396974"><td class="cellrowborder" valign="top" width="100%"><pre class="screen" id="en-us_topic_0183243738_en-us_topic_0155237683_en-us_topic_0076221025_en-us_topic_0043209539_screen13353554311"><a name="en-us_topic_0183243738_en-us_topic_0155237683_en-us_topic_0076221025_en-us_topic_0043209539_screen13353554311"></a><a name="en-us_topic_0183243738_en-us_topic_0155237683_en-us_topic_0076221025_en-us_topic_0043209539_screen13353554311"></a>FROM busybox
ENV  http_proxy http://192.168.0.226:3128
ENV  https_proxy https://192.168.0.226:3128
RUN apt-get update &amp;&amp; apt-get install -y openssh-server
RUN mkdir -p /var/run/sshd
EXPOSE 22
ENTRYPOINT /usr/sbin/sshd -D</pre>
</td>
</tr>
</tbody>
</table>

Example:

1.  Run the following command to build an image using the preceding Dockerfile:

    ```
    $ sudo docker build -t busybox:latest
    ```

2.  Run the following command to view the generated image:

    ```
    docker images | grep busybox
    ```


## history

Syntax:  **docker history \[**_options_**\]** _image_

Function: Displays the change history of an image.

Parameter description:

-H, --human=true

**--no-trunc=false**: Does not delete any output.

**-q**  and  **--quiet=false**: Display only IDs.

Example:

```
$ sudo docker history busybox:test
IMAGE               CREATED             CREATED BY          SIZE                COMMENT
be4672959e8b        15 minutes ago      bash                23B
21970dfada48        4 weeks ago                             128MB               Imported from -
```

  

## images

Syntax:  **docker images \[**_options_**\] \[**_name_**\]**

Function: Lists existing images. The intermediate image is not displayed if no parameter is configured.

Parameter description:

**-a**  and  **--all=false**: Display all images.

**-f**  and  **--filter=\[\]**: Specify a filtering value, for example,  **dangling=true**.

**--no-trunc=false**: Does not delete any output.

**-q**  and  **--quiet=false**: Display only IDs.

Example:

```
$ sudo docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
busybox             latest              e02e811dd08f        2 years ago         1.09MB
```

  

## import

Syntax:  **docker import URL|- \[**_repository_**\[**_:tag_**\]\]**

Function: Imports a .tar package that contains rootfs as an image. This parameter corresponds to the  **docker export**  command.

Parameter description: none.

Example:

Run the following command to generate a new image for  **busybox.tar**  exported using the  **docker export**  command:

```
$ sudo docker import busybox.tar busybox:test
sha256:a79d8ae1240388fd3f6c49697733c8bac4d87283920defc51fb0fe4469e30a4f
$ sudo docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
busybox             test                a79d8ae12403        2 seconds ago       1.3MB
```

  

## load

Syntax:  **docker load \[**_options_**\]**

Function: Reloads an image from .tar package obtained by running the  **docker save**  command. This parameter corresponds to the  **docker save**  command.

Parameter description:

**-i**  and  **--input=""**  can be used.

Example:

```
$ sudo docker load -i busybox.tar
Loaded image ID: sha256:e02e811dd08fd49e7f6032625495118e63f597eb150403d02e3238af1df240ba
$ sudo docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
busybox             latest              e02e811dd08f        2 years ago         1.09MB
```

## login

Syntax:  **docker login \[**_options_**\] \[**_server_**\]**

Function: Logs in to an image server. If no server is specified, the system logs in to  **https://index.docker.io/v1/**  by default.

Parameter description:

**-e**  and  **--email=""**: Email address.

**-p**  and  **--password=""**: Password.

**-u**  and  **--username=""**: User name.

Example:

```
$ sudo docker login
```

## logout

Syntax:  **docker logout \[**_server_**\]**

Function: Logs out of an image server. If no server is specified, the system logs out of  **https://index.docker.io/v1/**  by default.

Parameter description: none.

Example:

```
$ sudo docker logout
```

## pull

Syntax:  **docker pull \[**_options_**\]** _name_**\[**_:tag_**\]**

Function: Pulls an image from an official or private registry.

Parameter description:

**-a**  and  **--all-tags=false**: Download all images in a registry. \(A registry can be tagged with multiple tags. For example, a busybox registry may have multiple tags, such as  **busybox:14.04**,  **busybox:13.10**,  **busybox:latest**. If  **-a**  is used, all busybox images with tags are pulled.\)

Example:

1.  Run the following command to obtain the Nginx image from the official registry:

    ```
    $ sudo docker pull nginx
    Using default tag: latest
    latest: Pulling from official/nginx
    94ed0c431eb5: Pull complete
    9406c100a1c3: Pull complete
    aa74daafd50c: Pull complete
    Digest: sha256:788fa27763db6d69ad3444e8ba72f947df9e7e163bad7c1f5614f8fd27a311c3
    Status: Downloaded newer image for nginx:latest
    ```

    When an image is pulled, the system checks whether the dependent layer exists. If yes, the local layer is used.

2.  Pull an image from a private registry.

    Run the following command to pull the Fedora image from the private registry, for example, the address of the private registry is  **192.168.1.110:5000**:

    ```
    $ sudo docker pull 192.168.1.110:5000/fedora
    ```


## push

Syntax:  **docker push** _name_**\[**_:tag_**\]**

Function: Pushes an image to the image registry.

Parameter description: none.

Example:

1.  Run the following command to push an image to the private image registry at 192.168.1.110:5000.
2.  Label the image to be pushed. \(The  **docker tag**  command is described in the following section.\) In this example, the image to be pushed is busybox:sshd.

    ```
    $ sudo docker tag ubuntu:sshd 192.168.1.110:5000/busybox:sshd
    ```

3.  Run the following command to push the tagged image to the private image registry:

    ```
    $ sudo docker push 192.168.1.110:5000/busybox:sshd
    ```

    During the push, the system automatically checks whether the dependent layer exists in the image registry. If yes, the layer is skipped.


## rmi

Syntax:  **docker rmi \[**_options_**\] **_image _**\[**_image..._**\]**

Function: Deletes one or more images. If an image has multiple tags in the image library, only the untag operation is performed when the image is deleted. If the image has only one tag, the dependent layers are deleted in sequence.

Parameter description:

**-f**  and  **--force=false**: Forcibly delete an image.

**--no-prune=false**: Does not delete parent images without tags.

Example:

```
$ sudo docker rmi 192.168.1.110:5000/busybox:sshd
```

## save

Syntax:  **docker save \[**_options_**\] **_image _**\[**_image..._**\]**

Function: Saves an image to a TAR package. The output is  **STDOUT**  by default.

Parameter description:

**-o**  and  **--output=""**: Save an image to a file rather than STDOUT.

Example:

```
$ sudo docker save -o nginx.tar nginx:latest
$ ls
nginx.tar
```

## search

Syntax:  **docker search **_options_ _TERM_

Function: Searches for a specific image in the image registry.

Parameter description:

**--automated=false**: Displays the automatically built image.

**--no-trunc=false**: Does not delete any output.

**-s**  and  **--stars=0**: Display only images of a specified star level or higher.

Example:

1.  Run the following command to search for Nginx in the official image library:

    ```
    $ sudo docker search nginx
    NAME                              DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
    nginx                             Official build of Nginx.                        11873               [OK]
    jwilder/nginx-proxy               Automated Nginx reverse proxy for docker con...   1645                                    [OK]
    richarvey/nginx-php-fpm           Container running Nginx + PHP-FPM capable of...   739                                     [OK]
    linuxserver/nginx                 An Nginx container, brought to you by LinuxS...   74
    bitnami/nginx                     Bitnami nginx Docker Image                      70                                      [OK]
    tiangolo/nginx-rtmp               Docker image with Nginx using the nginx-rtmp...   51                                      [OK]
    ```

      

2.  Run the following command to search for busybox in the private image library. The address of the private image library must be added during the search.

    ```
    $ sudo docker search 192.168.1.110:5000/busybox
    ```


## tag

Syntax:  **docker tag \[**_options_**\] **_image_**\[**_:tag_**\] \[**_registry host/_**\]\[**_username/_**\]**_name_**\[**_:tag_**\]**

Function: Tags an image to a registry.

Parameter description:

**-f**  or  **--force=false**: Forcibly replaces the original image when the same tag name exists.

Example:

```
$ sudo docker tag busybox:latest busybox:test
```

