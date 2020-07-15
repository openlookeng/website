# Managing the Lifecycle of a Secure Container

- [Managing the Lifecycle of a Secure Container](#managing-the-lifecycle-of-a-secure-container)
    - [Starting a Secure Container](#starting-a-secure-container)
    - [Stopping a Secure Container](#stopping-a-secure-container)
    - [Deleting a Secure Container](#deleting-a-secure-container)
    - [Running a New Command in the Container](#running-a-new-command-in-the-container)




## Starting a Secure Container

You can use the Docker engine or iSulad as the container engine of the secure container. The invoking methods of the two engines are similar. You can select either of them to start a secure container.

To start a secure container, perform the following steps:

1.  Ensure that the secure container component has been correctly installed and deployed.
2.  Prepare the container image. If the container image is busybox, run the following commands to download the container image using the Docker engine or iSulad:

    ```
    docker pull busybox
    ```

    ```
    isula pull busybox
    ```

3.  Start a secure container. Run the following commands to start a secure container using the Docker engine and iSulad:

    ```
    docker run -tid --runtime kata-runtime --network none busybox <command>
    ```

    ```
    isula run -tid --runtime kata-runtime --network none busybox <command>
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >The secure container supports the CNI network only and does not support the CNM network. The  **-p**  and  **--expose**  options cannot be used to expose container ports. When using a secure container, you need to specify the  **--net=none**  option.  

4.  Start a pod.
    1.  Start the pause container and obtain the sandbox ID of the pod based on the command output. Run the following commands to start a pause container using the Docker engine and iSulad:

        ```
        docker run -tid --runtime kata-runtime --network none --annotation io.kubernetes.docker.type=podsandbox <pause-image> <command>
        ```

        ```
        isula run -tid --runtime kata-runtime --network none --annotation io.kubernetes.cri.container-type=sandbox <pause-image> <command>
        ```

          

    1.  Create a service container and add it to the pod. Run the following commands to create a service container using the Docker engine and iSulad:

        ```
        docker run -tid --runtime kata-runtime --network none --annotation io.kubernetes.docker.type=container --annotation io.kubernetes.sandbox.id=<sandbox-id> busybox <command>
        ```

        ```
        isula run -tid --runtime kata-runtime --network none --annotation io.kubernetes.cri.container-type=container --annotation io.kubernetes.cri.sandbox-id=<sandbox-id> busybox <command>
        ```

        **--annotation**  is used to mark the container type, which is provided by the Docker engine and iSulad, but not provided by the open-source Docker engine in the upstream community.



## Stopping a Secure Container

-   Run the following command to stop a secure container:

    ```
    docker stop <contaienr-id>
    ```

-   Stop a pod.

    When stopping a pod, note that the lifecycle of the pause container is the same as that of the pod. Therefore, stop service containers before the pause container. 


## Deleting a Secure Container

Ensure that the container has been stopped.

```
docker rm <container-id>
```

To forcibly delete a running container, run the  **-f**  command.

```
docker rm -f <container-id>
```

## Running a New Command in the Container

The pause container functions only as a placeholder container. Therefore, if you start a pod, run a new command in the service container. The pause container does not execute the corresponding command. If only one container is started, run the following command directly:

```
docker exec -ti <container-id> <command>
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>1.  If the preceding command has no response because another host runs the  **docker restart**  or  **docker stop**  command to access the same container, you can press  **Ctrl**+**P**+**Q**  to exit the operation.  
>2.  If the  **-d**  option is used, the command is executed in the background and no error information is displayed. The exit code cannot be used to determine whether the command is executed correctly.  

