# Configuring Resources for a Secure Container

- [Configuring Resources for a Secure Container](#configuring-resources-for-a-secure-container)
    - [Sharing Resources](#sharing-resources)
    - [Limiting CPU Resources](#limiting-cpu-resources)
    - [Limiting Memory Resources](#limiting-memory-resources)
    - [Limiting Block I/O Resources](#limiting-block-i-o-resources)
    - [Limiting File Descriptor Resources](#limiting-file-descriptor-resources)


The secure container runs on a virtualized and isolated lightweight VM. Therefore, resource configuration is divided into two parts: resource configuration for the lightweight VM, that is, host resource configuration; resource configuration for containers in the VM, that is, guest container resource configuration. The following describes resource configuration for the two parts in detail.


## Sharing Resources

Because the secure container runs on a virtualized and isolated lightweight VM, resources in some namespaces on the host cannot be accessed. Therefore,  **--net host**,  **--ipc host**,  **--pid host**, and  **--uts host**  are not supported during startup.

When a pod is started, all containers in the pod share the same net namespace and ipc namespace by default. If containers in the same pod need to share the pid namespace, you can use Kubernetes to configure the pid namespace. In Kubernetes 1.11, the pid namespace is disabled by default.

## Limiting CPU Resources

1.  Configure CPU resources for running a lightweight VM.

    Configuring CPU resources of a lightweight VM is to configure the vCPUs for running the VM. The secure container uses  **--annotation com.github.containers.virtcontainers.sandbox\_cpu**  to configure the CPU resources for running the lightweight VM. This option can be configured only on the pause container.

    ```
    docker run -tid --runtime kata-runtime --network none --annotation io.kubernetes.docker.type=podsandbox --annotation com.github.containers.virtcontainers.sandbox_cpu=<cpu-nums> <pause-image> <command>
    ```

    Example:

    ```
    #Start a pause container.
    docker run -tid --runtime kata-runtime --network none --annotation io.kubernetes.docker.type=podsandbox --annotation com.github.containers.virtcontainers.sandbox_cpu=4 busybox sleep 999999
    be3255a3f66a35508efe419bc52eccd3b000032b9d8c9c62df611d5bdc115954
    
    #Access the container and check whether the number of CPUs is the same as that configured in the com.github.containers.virtcontainers.sandbox_cpu file.
    docker exec be32 lscpu
    Architecture:        aarch64
    Byte Order:          Little Endian
    CPU(s):              4
    On-line CPU(s) list: 0-3
    Thread(s) per core:  1
    Core(s) per socket:  1
    Socket(s):           4
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >The maximum number of CPUs that can be configured is the number of CPUs \(excluding isolated cores\) that can run on the OS. The minimum number of CPUs is 0.5.  

2.  Configure CPU resources for running a container.

    The method of configuring CPU resources for a container is the same as that for an open-source Docker container. You can configure CPU resources by setting the following parameters in the  **docker run**  command:

    <a name="en-us_topic_0183903699_table11321051171213"></a>
    <table><thead align="left"><tr id="en-us_topic_0183903699_row5321251121219"><th class="cellrowborder" valign="top" width="50%" id="mcps1.1.3.1.1"><p id="en-us_topic_0183903699_p1208737146"><a name="en-us_topic_0183903699_p1208737146"></a><a name="en-us_topic_0183903699_p1208737146"></a><strong id="en-us_topic_0183903699_b16155132818307"><a name="en-us_topic_0183903699_b16155132818307"></a><a name="en-us_topic_0183903699_b16155132818307"></a>Parameter</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="50%" id="mcps1.1.3.1.2"><p id="en-us_topic_0183903699_p1332145111210"><a name="en-us_topic_0183903699_p1332145111210"></a><a name="en-us_topic_0183903699_p1332145111210"></a><strong id="en-us_topic_0183903699_b1448362915301"><a name="en-us_topic_0183903699_b1448362915301"></a><a name="en-us_topic_0183903699_b1448362915301"></a>Description</strong></p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0183903699_row1532175119122"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183903699_p15321251191214"><a name="en-us_topic_0183903699_p15321251191214"></a><a name="en-us_topic_0183903699_p15321251191214"></a>--cpu-shares</p>
    </td>
    <td class="cellrowborder" valign="top" width="50%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183903699_p232951121217"><a name="en-us_topic_0183903699_p232951121217"></a><a name="en-us_topic_0183903699_p232951121217"></a>Sets the percentage of CPU time that can be used by the container.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183903699_row1232125121218"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183903699_p43265191210"><a name="en-us_topic_0183903699_p43265191210"></a><a name="en-us_topic_0183903699_p43265191210"></a>--cpus</p>
    </td>
    <td class="cellrowborder" valign="top" width="50%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183903699_p193217517128"><a name="en-us_topic_0183903699_p193217517128"></a><a name="en-us_topic_0183903699_p193217517128"></a>Sets the number of CPUs that can be used by the container.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183903699_row173275113128"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183903699_p43295116127"><a name="en-us_topic_0183903699_p43295116127"></a><a name="en-us_topic_0183903699_p43295116127"></a>--cpu-period</p>
    </td>
    <td class="cellrowborder" valign="top" width="50%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183903699_p16321151161215"><a name="en-us_topic_0183903699_p16321151161215"></a><a name="en-us_topic_0183903699_p16321151161215"></a>Sets the scheduling period of the container process.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183903699_row188213501157"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183903699_p158831150161512"><a name="en-us_topic_0183903699_p158831150161512"></a><a name="en-us_topic_0183903699_p158831150161512"></a>--cpu-quota</p>
    </td>
    <td class="cellrowborder" valign="top" width="50%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183903699_p12883750151511"><a name="en-us_topic_0183903699_p12883750151511"></a><a name="en-us_topic_0183903699_p12883750151511"></a>Sets the CPU time that can be used by the container process in a scheduling period.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183903699_row1475055510158"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183903699_p5750145515159"><a name="en-us_topic_0183903699_p5750145515159"></a><a name="en-us_topic_0183903699_p5750145515159"></a>--cpuset-cpus</p>
    </td>
    <td class="cellrowborder" valign="top" width="50%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183903699_p1750125561520"><a name="en-us_topic_0183903699_p1750125561520"></a><a name="en-us_topic_0183903699_p1750125561520"></a>Sets the list of CPUs that can be used by the container process.</p>
    <div class="note" id="en-us_topic_0183903699_note1610940172310"><a name="en-us_topic_0183903699_note1610940172310"></a><a name="en-us_topic_0183903699_note1610940172310"></a><span class="notetitle"> NOTE: </span><div class="notebody"><p id="en-us_topic_0183903699_p1410950132311"><a name="en-us_topic_0183903699_p1410950132311"></a><a name="en-us_topic_0183903699_p1410950132311"></a>When the secure container uses the <strong id="en-us_topic_0183903699_b209151346113119"><a name="en-us_topic_0183903699_b209151346113119"></a><a name="en-us_topic_0183903699_b209151346113119"></a>--cpuset-cpus</strong> option to bind a CPU, the CPU ID cannot exceed the number of CPUs in the lightweight VM corresponding to the secure container minus 1. (The CPU ID in the lightweight VM starts from 0.)</p>
    </div></div>
    </td>
    </tr>
    <tr id="en-us_topic_0183903699_row830172021620"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183903699_p173012012166"><a name="en-us_topic_0183903699_p173012012166"></a><a name="en-us_topic_0183903699_p173012012166"></a>--cpuset-mems</p>
    </td>
    <td class="cellrowborder" valign="top" width="50%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183903699_p129461755102515"><a name="en-us_topic_0183903699_p129461755102515"></a><a name="en-us_topic_0183903699_p129461755102515"></a>Sets the memory node that can be accessed by the container process.</p>
    <div class="note" id="en-us_topic_0183903699_note17106188267"><a name="en-us_topic_0183903699_note17106188267"></a><a name="en-us_topic_0183903699_note17106188267"></a><span class="notetitle"> NOTE: </span><div class="notebody"><p id="en-us_topic_0183903699_p21015188261"><a name="en-us_topic_0183903699_p21015188261"></a><a name="en-us_topic_0183903699_p21015188261"></a>Secure containers do not support the multi-NUMA architecture and configuration. The <strong id="en-us_topic_0183903699_b42249243323"><a name="en-us_topic_0183903699_b42249243323"></a><a name="en-us_topic_0183903699_b42249243323"></a>--cpuset-mems</strong> option of NUMA memory can only be set to <strong id="en-us_topic_0183903699_b20916154219322"><a name="en-us_topic_0183903699_b20916154219322"></a><a name="en-us_topic_0183903699_b20916154219322"></a>0</strong>.</p>
    </div></div>
    </td>
    </tr>
    </tbody>
    </table>

3.  Configure CPU hot swap.

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >The CPU hot swap function of the secure container requires the virtualization component QEMU.  

    The  **enable\_cpu\_memory\_hotplug**  option in the kata-runtime configuration file  **config.toml**  is used to enable or disable CPU and memory hot swap. The default value is  **false**, indicating that CPU and memory hot swap is disabled. If the value is  **true**, CPU and memory hot swap is enabled.

    The  **--cpus**  option is reused in kata-runtime to implement the CPU hot swap function. The total number of  **--cpus**  options of all containers in a pod is calculated to determine the number of CPUs to be hot added to the lightweight VM.

    Example:

    ```
    #Start a pause container. By default, one vCPU is allocated to a lightweight VM.
    docker run -tid --runtime kata-runtime --network none --annotation io.kubernetes.docker.type=podsandbox busybox sleep 999999
    77b40fb72f63b11dd3fcab2f6dabfc7768295fced042af8c7ad9c0286b17d24f
    
    #View the number of CPUs in the lightweight VM after the pause container is started.
    docker exec 77b40fb72f6 lscpu
    Architecture:          x86_64
    CPU op-mode(s):        32-bit, 64-bit
    Byte Order:            Little Endian
    CPU(s):                1
    On-line CPU(s) list:   0
    Thread(s) per core:    1
    Core(s) per socket:    1
    Socket(s):             1
    
    #Start a new container in the same pod and run the --cpus command to set the number of CPUs required by the container to 4.
    docker run -tid --runtime kata-runtime --network none --cpus 4 --annotation io.kubernetes.docker.type=container --annotation io.kubernetes.sandbox.id=77b40fb72f63b11dd3fcab2f6dabfc7768295fced042af8c7ad9c0286b17d24f busybox sleep 999999
    7234d666851d43cbdc41da356bf62488b89cd826361bb71d585a049b6cedafd3
    
    #View the number of CPUs in the current lightweight VM.
    docker exec 7234d6668 lscpu
    Architecture:          x86_64
    CPU op-mode(s):        32-bit, 64-bit
    Byte Order:            Little Endian
    CPU(s):                4
    On-line CPU(s) list:   0-3
    Thread(s) per core:    1
    Core(s) per socket:    1
    Socket(s):             4
    
    #View the number of CPUs in the lightweight VM after deleting the container where CPUs are hot added.
    docker rm -f 7234d666851d
    7234d666851d
    
    docker exec 77b40fb72f6  lscpu
    Architecture:          x86_64
    CPU op-mode(s):        32-bit, 64-bit
    Byte Order:            Little Endian
    CPU(s):                1
    On-line CPU(s) list:   0
    Thread(s) per core:    1
    Core(s) per socket:    1
    Socket(s):             1
    ```

      

      

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >The pause container is only a placeholder container and does not have any workload. Therefore, when a lightweight VM is started, the CPU allocated by default can be shared by other containers. Therefore, you only need to hot add three CPUs to the lightweight VM for the new container started in the preceding example.  

    -   After the container where the CPU is hot added is stopped, the CPU is removed when the container is started.


## Limiting Memory Resources

1.  Configure memory resources for running a lightweight VM.

    Configuring the memory resources of a lightweight VM is to configure the memory for running the VM. The secure container uses  **--annotation com.github.containers.virtcontainers.sandbox\_mem**  to configure the memory resources for running the lightweight VM. This option can be configured only on the pause container.

    ```
    docker run -tid --runtime kata-runtime --network none --annotation io.kubernetes.docker.type=podsandbox --annotation com.github.containers.virtcontainers.sandbox_mem=<memory-size> <pause-image> <command>
    ```

    Example:

    ```
    #Start a pause container and use --annotation com.github.containers.virtcontainers.sandbox_mem=4G to allocate 4 GB memory to the lightweight VM.
    docker run -tid --runtime kata-runtime --network none --annotation io.kubernetes.docker.type=podsandbox --annotation com.github.containers.virtcontainers.sandbox_mem=4G busybox sleep 999999
    1532c3e59e7a45cd6b419aa1db07dd0069b0cdd93097f8944177a25e457e4297
    
    #View the memory information of the lightweight VM and check whether the memory size is the same as that configured in the com.github.containers.virtcontainers.sandbox_mem file.
    docker exec 1532c3e free -m
                  total        used        free      shared  buff/cache   available
    Mem:           3950          20        3874          41          55        3858
    Swap:             0           0           0
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >-   If the memory size of a lightweight VM is not set using  **--annotation com.github.containers.virtcontainers.sandbox\_mem**, the lightweight VM uses 1 GB memory by default.  
    >-   The minimum memory size of a pod in a secure container is 1 GB, and the maximum memory size is 256 GB. If the memory size allocated to a user exceeds 256 GB, an undefined error may occur. Currently, secure containers do not support the scenario where the memory size exceeds 256 GB.  

2.  Configure memory resources for running a container.

    The method of configuring memory resources for running a container is the same as that for the open-source Docker container. You can configure memory resource limitation parameters in the  **docker run**  command.


    <table><thead align="left"><tr id="en-us_topic_0182219834_row5321251121219"><th class="cellrowborder" valign="top" width="50%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182219834_p1208737146"><a name="en-us_topic_0182219834_p1208737146"></a><a name="en-us_topic_0182219834_p1208737146"></a><strong id="en-us_topic_0182219834_b142172544447"><a name="en-us_topic_0182219834_b142172544447"></a><a name="en-us_topic_0182219834_b142172544447"></a>Parameter</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="50%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182219834_p1332145111210"><a name="en-us_topic_0182219834_p1332145111210"></a><a name="en-us_topic_0182219834_p1332145111210"></a><strong id="en-us_topic_0182219834_b956575511443"><a name="en-us_topic_0182219834_b956575511443"></a><a name="en-us_topic_0182219834_b956575511443"></a>Description</strong></p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182219834_row1532175119122"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182219834_p15321251191214"><a name="en-us_topic_0182219834_p15321251191214"></a><a name="en-us_topic_0182219834_p15321251191214"></a>-m/--memory</p>
    </td>
    <td class="cellrowborder" valign="top" width="50%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182219834_p232951121217"><a name="en-us_topic_0182219834_p232951121217"></a><a name="en-us_topic_0182219834_p232951121217"></a>Sets the memory size that can be used by the container process.</p>
    <div class="note" id="en-us_topic_0182219834_note04024417164"><a name="en-us_topic_0182219834_note04024417164"></a><a name="en-us_topic_0182219834_note04024417164"></a><span class="notetitle"> NOTE: </span><div class="notebody"><a name="en-us_topic_0182219834_ul16187123721710"></a><a name="en-us_topic_0182219834_ul16187123721710"></a><ul id="en-us_topic_0182219834_ul16187123721710"><li>When memory hot swap is disabled, the value of <strong id="en-us_topic_0182219834_b57585884515"><a name="en-us_topic_0182219834_b57585884515"></a><a name="en-us_topic_0182219834_b57585884515"></a>-m</strong> must be less than or equal to the memory size allocated when the lightweight VM is started.</li></ul>
    </div></div>
    </td>
    </tr>
    </tbody>
    </table>

3.  Configure memory hot add.

    The memory hot add function is also configured by the  **enable\_cpu\_memory\_hotplug**  option in the kata-runtime configuration file  **config.toml**. For details, see  [3](#limiting-cpu-resources.md#en-us_topic_0183903699_li2167326144011).

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >Currently, memory resources support hot add only.  

    The  **-m**  option is reused in kata-runtime to implement the memory hot add function. The sum of the  **-m**  options of all containers in a pod is collected to determine the number of memories to be hot added to a lightweight VM. 

    Example:

    ```
    #Start a pause container. By default, 1 GB memory is allocated to the lightweight VM.
    docker run -tid --runtime kata-runtime --network none --annotation io.kubernetes.docker.type=podsandbox busybox sleep 999999
    99b78508ada3fa7dcbac457bb0f6e3784e64e7f7131809344c5496957931119f
    
    #View the memory size of the lightweight VM after the pause container is started.
    docker exec 99b78508ada free -m
                  total        used        free      shared  buff/cache   available
    Mem:            983          18         914          36          50         908
    Swap:             0           0           0
    
    #Start a new container in the same pod and run the -m command to set the memory size required by the container to 4 GB.
    docker run -tid --runtime kata-runtime --network none -m 4G --annotation io.kubernetes.docker.type=container --annotation io.kubernetes.sandbox.id=99b78508ada3fa7dcbac457bb0f6e3784e64e7f7131809344c5496957931119f busybox sleep 999999
    c49461745a712b2ef3127fdf43b2cbb034b7614e6060b13db12b7a5ff3c830c8
    
    #View the memory size of the lightweight VM.
    docker exec c49461745 free -m
                  total        used        free      shared  buff/cache   available
    Mem:           4055          69        3928          36          57        3891
    Swap:             0           0           0
    
    #After deleting the container where the CPU is hot added, check the memory size of the lightweight VM.
    docker rm -f c49461745
    c49461745
    
    #The hot added memory does not support the hot add function. Therefore, after the hot added memory container is deleted from the lightweight VM, the memory is still 4 GB.
    docker exec 99b78508ada free -m
                  total        used        free      shared  buff/cache   available
    Mem:           4055          69        3934          36          52        3894
    Swap:             0           0           0
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >The pause container is only a placeholder container and does not have any workload. Therefore, the memory allocated to the lightweight VM during startup can be shared by other containers. You only need to hot add 3 GB memory to the lightweight VM for the new container started in the preceding example.  


## Limiting Block I/O Resources

1.  Configure the block I/O resources for running a lightweight VM.

    To configure block I/O resources for running a lightweight VM of secure containers, use  **--annotation com.github.containers.virtcontainers.blkio\_cgroup**. This option can be configured only on the pause container.

    ```
    docker run -tid --runtime --network none --annotation io.kubernetes.docker.type=podsandbox --annotation com.github.containers.virtcontainers.blkio_cgroup=<blkio json string<pause-image> <command>
    ```

    The value of  **--annotation com.github.containers.virtcontainers.blkio\_cgroup**  must comply with the definition of the BlkioCgroup structure.

    ```
    // BlkioCgroup for Linux cgroup 'blkio' data exchange
    type BlkioCgroup struct {
    	// Items specifies per cgroup values
    	Items []BlockIOCgroupItem `json:"blkiocgroup,omitempty"`
    }
    
    type BlockIOCgroupItem struct {
    	// Path represent path of blkio device
    	Path string `json:"path,omitempty"`
    	// Limits specifies the blkio type and value
    	Limits []IOLimit `json:"limits,omitempty"`
    }
    
    type IOLimit struct {
    	// Type specifies IO type
    	Type string `json:"type,omitempty"`
    	// Value specifies rate or weight value
    	Value uint64 `json:"value,omitempty"`
    }
    ```

    The values of the  **Type**  field in the  **IOLimit**  structure body are as follows:

    ```
    // BlkioThrottleReadBps is the key to fetch throttle_read_bps
    BlkioThrottleReadBps = "throttle_read_bps"
    
    // BlkioThrottleWriteBps is the key to fetch throttle_write_bps
    BlkioThrottleWriteBps = "throttle_write_bps"
    
    // BlkioThrottleReadIOPS is the key to fetch throttle_read_iops
    BlkioThrottleReadIOPS = "throttle_read_iops"
    
    // BlkioThrottleWriteIOPS is the key to fetch throttle_write_iops
    BlkioThrottleWriteIOPS = "throttle_write_iops"
    
    // BlkioWeight is the key to fetch blkio_weight
    BlkioWeight = "blkio_weight"
    
    // BlkioLeafWeight is the key to fetch blkio_leaf_weight
    BlkioLeafWeight = "blkio_leaf_weight"
    ```

    Example:

    ```
    docker run -tid --runtime kata-runtime --network none --annotation com.github.containers.virtcontainers.blkio_cgroup='{"blkiocgroup":[{"path":"/dev/sda","limits":[{"type":"throttle_read_bps","value":400},{"type":"throttle_write_bps","value":400},{"type":"throttle_read_iops","value":700},{"type":"throttle_write_iops","value":699}]},{"limits":[{"type":"blkio_weight","value":78}]}]}' busybox sleep 999999
    ```

    The preceding command is used to limit the block I/O traffic of the  **/dev/sda**  disk used by the started secure container by setting  **throttle\_read\_bps**  to 400 bit/s,  **throttle\_write\_bps**  to 400 bit/s,  **throttle\_read\_iops**  to 700 times/s,  **throttle\_write\_iops**  to 699 times/s, and the weight of the block I/O cgroup to 78.


## Limiting File Descriptor Resources

To prevent the file descriptor resources on the host from being exhausted when a large number of files in the 9p shared directory are opened in the container, the secure container can customize the maximum number of file descriptors that can be opened by the QEMU process of the secure container.

The secure container reuses the  **--files-limit**  option in the  **docker run**  command to set the maximum number of file descriptors that can be opened by the QEMU process of the secure container. This parameter can be configured only on the pause container. The usage method is as follows:

```
docker run -tid --runtime kata-runtime --network none --annotation io.kubernetes.docker.type=podsandbox --files-limit <max-open-files> <pause-image> bash
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>-   If the value of  **--files-limit**  is less than the default minimum value  **1024**  and is not  **0**, the maximum number of file descriptors that can be opened by the QEMU process of the secure container is set to the minimum value  **1024**.  
>-   If the value of  **--files-limit**  is 0, the maximum number of file descriptors that can be opened by the QEMU process of the secure container is the default value obtained by dividing the maximum number of file descriptors that can be opened by the system \(/proc/sys/fs/file-max\) by 400.  
>-   If the maximum number of file descriptors that can be opened by the QEMU process of the secure container is not displayed when the secure container is started, the maximum number of file descriptors that can be opened by the QEMU process of the secure container is the same as the system default value.  

