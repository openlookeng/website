# Installation and Configuration 


- [Installation and Configuration](installation-configuration)
    - [Installation Methods](#installation-methods)
    - [Deployment Configuration](#deployment-configuration)
        - [Configuration Mode](#configuration-mode)
        - [Storage Description](#storage-description)
        - [Constraints](#constraints)
        - [Daemon Multi-Port Binding](#daemon-multi-port-binding)
        - [Configuring TLS Authentication and Enabling Remote Access](#configuring-tls-authentication-and-enabling-remote-access)
        - [devicemapper Storage Driver Configuration](#devicemapper-storage-driver-configuration)
    


## Installation Methods

iSulad can be installed by running the  **yum**  or  **rpm**  command. The  **yum**  command is recommended because dependencies can be installed automatically.

This section describes two installation methods.

-   \(Recommended\) Run the following command to install iSulad:

    ```
    $ sudo yum install -y iSulad
    ```


-   If the  **rpm**  command is used to install iSulad, you need to download and manually install the RMP packages of iSulad and all its dependencies. To install the RPM package of a single iSulad \(the same for installing dependency packages\), run the following command:

    ```
    $ sudo rpm -ihv iSulad-xx.xx.xx-YYYYmmdd.HHMMSS.gitxxxxxxxx.aarch64.rpm
    ```


## Deployment Configuration

### Configuration Mode

The iSulad server daemon  **isulad**  can be configured with a configuration file or by running the  **isulad --xxx**  command. The priority in descending order is as follows: CLI \> configuration file \> default configuration in code.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>If systemd is used to manage the iSulad process, modify the  **OPTIONS**  field in the  **/etc/sysconfig/iSulad**  file, which functions the same as using the CLI.  

-   **CLI**

    During service startup, configure iSulad using the CLI. To view the configuration options, run the following command:

    ```
    $ isulad --help
    lightweight container runtime daemon
    
    Usage:  isulad [global options]
    
    GLOBAL OPTIONS:
    
          --authorization-plugin            Use authorization plugin
          --cgroup-parent                   Set parent cgroup for all containers
          --cni-bin-dir                     The full path of the directory in which to search for CNI plugin binaries. Default: /opt/cni/bin
          --cni-conf-dir                    The full path of the directory in which to search for CNI config files. Default: /etc/cni/net.d
          --default-ulimit                  Default ulimits for containers (default [])
      -e, --engine                          Select backend engine
      -g, --graph                           Root directory of the iSulad runtime
      -G, --group                           Group for the unix socket(default is isulad)
          --help                            Show help
          --hook-spec                       Default hook spec file applied to all containers
      -H, --host                            The socket name used to create gRPC server
          --image-layer-check               Check layer intergrity when needed
          --image-opt-timeout               Max timeout(default 5m) for image operation
          --insecure-registry               Disable TLS verification for the given registry
          --insecure-skip-verify-enforce    Force to skip the insecure verify(default false)
          --log-driver                      Set daemon log driver, such as: file
      -l, --log-level                       Set log level, the levels can be: FATAL ALERT CRIT ERROR WARN NOTICE INFO DEBUG TRACE
          --log-opt                         Set daemon log driver options, such as: log-path=/tmp/logs/ to set directory where to store daemon logs
          --native.umask                    Default file mode creation mask (umask) for containers
          --network-plugin                  Set network plugin, default is null, suppport null and cni
      -p, --pidfile                         Save pid into this file
          --pod-sandbox-image               The image whose network/ipc namespaces containers in each pod will use. (default "rnd-dockerhub.huawei.com/library/pause-${machine}:3.0")
          --registry-mirrors                Registry to be prepended when pulling unqualified images, can be specified multiple times
          --start-timeout                   timeout duration for waiting on a container to start before it is killed
      -S, --state                           Root directory for execution state files
          --storage-driver                  Storage driver to use(default overlay2)
      -s, --storage-opt                     Storage driver options
          --tls                             Use TLS; implied by --tlsverify
          --tlscacert                       Trust certs signed only by this CA (default "/root/.iSulad/ca.pem")
          --tlscert                         Path to TLS certificate file (default "/root/.iSulad/cert.pem")
          --tlskey                          Path to TLS key file (default "/root/.iSulad/key.pem")
          --tlsverify                       Use TLS and verify the remote
          --use-decrypted-key               Use decrypted private key by default(default true)
      -V, --version                         Print the version
       --websocket-server-listening-port    CRI websocket streaming service listening port (default 10350)
    ```

    Example: Start iSulad and change the log level to DEBUG.

    ```
    $ isulad -l DEBUG
    ```


-   **Configuration file**

    The iSulad configuration file is  **/etc/isulad/daemon.json**. The parameters in the file are described as follows:

    <a name="en-us_topic_0183088382_table718981551311"></a>
    <table><thead align="left"><tr id="en-us_topic_0183088382_row21901715141319"><th class="cellrowborder" valign="top" width="14.673267326732672%" id="mcps1.1.5.1.1"><p id="en-us_topic_0183088382_p719016155131"><a name="en-us_topic_0183088382_p719016155131"></a><a name="en-us_topic_0183088382_p719016155131"></a><strong id="en-us_topic_0183088382_b464501153410"><a name="en-us_topic_0183088382_b464501153410"></a><a name="en-us_topic_0183088382_b464501153410"></a>Parameter</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="32.85148514851485%" id="mcps1.1.5.1.2"><p id="en-us_topic_0183088382_p654714315202"><a name="en-us_topic_0183088382_p654714315202"></a><a name="en-us_topic_0183088382_p654714315202"></a><strong id="en-us_topic_0183088382_b1771223133416"><a name="en-us_topic_0183088382_b1771223133416"></a><a name="en-us_topic_0183088382_b1771223133416"></a>Example</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="21.237623762376238%" id="mcps1.1.5.1.3"><p id="en-us_topic_0183088382_p18190101541311"><a name="en-us_topic_0183088382_p18190101541311"></a><a name="en-us_topic_0183088382_p18190101541311"></a><strong id="en-us_topic_0183088382_b48690118397"><a name="en-us_topic_0183088382_b48690118397"></a><a name="en-us_topic_0183088382_b48690118397"></a>Description</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="31.237623762376238%" id="mcps1.1.5.1.4"><p id="en-us_topic_0183088382_p719017157130"><a name="en-us_topic_0183088382_p719017157130"></a><a name="en-us_topic_0183088382_p719017157130"></a><strong id="en-us_topic_0183088382_b622273443415"><a name="en-us_topic_0183088382_b622273443415"></a><a name="en-us_topic_0183088382_b622273443415"></a>Remarks</strong></p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0183088382_row14190121551314"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p1190151517132"><a name="en-us_topic_0183088382_p1190151517132"></a><a name="en-us_topic_0183088382_p1190151517132"></a>-e, --engine</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p1547531122010"><a name="en-us_topic_0183088382_p1547531122010"></a><a name="en-us_topic_0183088382_p1547531122010"></a>"engine": "lcr"</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p151373196179"><a name="en-us_topic_0183088382_p151373196179"></a><a name="en-us_topic_0183088382_p151373196179"></a>iSulad runtime, which is <strong id="en-us_topic_0183088382_b1135134613279"><a name="en-us_topic_0183088382_b1135134613279"></a><a name="en-us_topic_0183088382_b1135134613279"></a>Icr</strong> by default.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p219021551311"><a name="en-us_topic_0183088382_p219021551311"></a><a name="en-us_topic_0183088382_p219021551311"></a>None</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row8190315101312"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p1119061531319"><a name="en-us_topic_0183088382_p1119061531319"></a><a name="en-us_topic_0183088382_p1119061531319"></a>-G, --group</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p1750303314298"><a name="en-us_topic_0183088382_p1750303314298"></a><a name="en-us_topic_0183088382_p1750303314298"></a>"group": "isulad"</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p19549193316492"><a name="en-us_topic_0183088382_p19549193316492"></a><a name="en-us_topic_0183088382_p19549193316492"></a>Socket group.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p161905157130"><a name="en-us_topic_0183088382_p161905157130"></a><a name="en-us_topic_0183088382_p161905157130"></a>None</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row9190101515138"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p2019031515132"><a name="en-us_topic_0183088382_p2019031515132"></a><a name="en-us_topic_0183088382_p2019031515132"></a>--hook-spec</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p145471231162011"><a name="en-us_topic_0183088382_p145471231162011"></a><a name="en-us_topic_0183088382_p145471231162011"></a>"hook-spec": "/etc/default/isulad/hooks/default.json"</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p219021512133"><a name="en-us_topic_0183088382_p219021512133"></a><a name="en-us_topic_0183088382_p219021512133"></a>Default hook configuration file for all containers.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p7190171511310"><a name="en-us_topic_0183088382_p7190171511310"></a><a name="en-us_topic_0183088382_p7190171511310"></a>None</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row181901815111310"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p019121512133"><a name="en-us_topic_0183088382_p019121512133"></a><a name="en-us_topic_0183088382_p019121512133"></a>-H, --host</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p14547931142019"><a name="en-us_topic_0183088382_p14547931142019"></a><a name="en-us_topic_0183088382_p14547931142019"></a>"hosts": "unix:///var/run/isulad.sock"</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p141911115151313"><a name="en-us_topic_0183088382_p141911115151313"></a><a name="en-us_topic_0183088382_p141911115151313"></a>Communication mode.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p1019131516139"><a name="en-us_topic_0183088382_p1019131516139"></a><a name="en-us_topic_0183088382_p1019131516139"></a>In addition to the local socket, the <strong id="en-us_topic_0183088382_b56851355123920"><a name="en-us_topic_0183088382_b56851355123920"></a><a name="en-us_topic_0183088382_b56851355123920"></a>tcp://ip:port</strong> mode is supported. The port number ranges from 0 to 65535, excluding occupied ports.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row839147161519"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p1040117141516"><a name="en-us_topic_0183088382_p1040117141516"></a><a name="en-us_topic_0183088382_p1040117141516"></a>--log-driver</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p171391223173017"><a name="en-us_topic_0183088382_p171391223173017"></a><a name="en-us_topic_0183088382_p171391223173017"></a>"log-driver": "file"</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p140147171520"><a name="en-us_topic_0183088382_p140147171520"></a><a name="en-us_topic_0183088382_p140147171520"></a>Log driver configuration.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p74014712154"><a name="en-us_topic_0183088382_p74014712154"></a><a name="en-us_topic_0183088382_p74014712154"></a>None</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row1443661715157"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p124360174152"><a name="en-us_topic_0183088382_p124360174152"></a><a name="en-us_topic_0183088382_p124360174152"></a>-l, --log-level</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p1397173217305"><a name="en-us_topic_0183088382_p1397173217305"></a><a name="en-us_topic_0183088382_p1397173217305"></a>"log-level": "ERROR"</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p0436317191510"><a name="en-us_topic_0183088382_p0436317191510"></a><a name="en-us_topic_0183088382_p0436317191510"></a>Log output level.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p184362175158"><a name="en-us_topic_0183088382_p184362175158"></a><a name="en-us_topic_0183088382_p184362175158"></a>None</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row9108325191520"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p1510911259151"><a name="en-us_topic_0183088382_p1510911259151"></a><a name="en-us_topic_0183088382_p1510911259151"></a>--log-opt</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p11333194110306"><a name="en-us_topic_0183088382_p11333194110306"></a><a name="en-us_topic_0183088382_p11333194110306"></a>"log-opts": {</p>
    <p id="en-us_topic_0183088382_p113331541143016"><a name="en-us_topic_0183088382_p113331541143016"></a><a name="en-us_topic_0183088382_p113331541143016"></a>"log-file-mode": "0600",</p>
    <p id="en-us_topic_0183088382_p8333144119309"><a name="en-us_topic_0183088382_p8333144119309"></a><a name="en-us_topic_0183088382_p8333144119309"></a>"log-path": "/var/lib/isulad",</p>
    <p id="en-us_topic_0183088382_p9333114113014"><a name="en-us_topic_0183088382_p9333114113014"></a><a name="en-us_topic_0183088382_p9333114113014"></a>"max-file": "1",</p>
    <p id="en-us_topic_0183088382_p173331641103017"><a name="en-us_topic_0183088382_p173331641103017"></a><a name="en-us_topic_0183088382_p173331641103017"></a>"max-size": "30KB"</p>
    <p id="en-us_topic_0183088382_p03339417309"><a name="en-us_topic_0183088382_p03339417309"></a><a name="en-us_topic_0183088382_p03339417309"></a>}</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p51093253158"><a name="en-us_topic_0183088382_p51093253158"></a><a name="en-us_topic_0183088382_p51093253158"></a>Log-related configuration.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p2109112513150"><a name="en-us_topic_0183088382_p2109112513150"></a><a name="en-us_topic_0183088382_p2109112513150"></a>You can specify <strong id="en-us_topic_0183088382_b563284403718"><a name="en-us_topic_0183088382_b563284403718"></a><a name="en-us_topic_0183088382_b563284403718"></a>max-file</strong>, <strong id="en-us_topic_0183088382_b1544316479378"><a name="en-us_topic_0183088382_b1544316479378"></a><a name="en-us_topic_0183088382_b1544316479378"></a>max-size</strong>, and <strong id="en-us_topic_0183088382_b014925073716"><a name="en-us_topic_0183088382_b014925073716"></a><a name="en-us_topic_0183088382_b014925073716"></a>log-path</strong>. <strong id="en-us_topic_0183088382_b137315653815"><a name="en-us_topic_0183088382_b137315653815"></a><a name="en-us_topic_0183088382_b137315653815"></a>max-file</strong> indicates the number of log files. <strong id="en-us_topic_0183088382_b13349121083818"><a name="en-us_topic_0183088382_b13349121083818"></a><a name="en-us_topic_0183088382_b13349121083818"></a>max-size</strong> indicates the threshold for triggering log anti-explosion. If <strong id="en-us_topic_0183088382_b1711715552252"><a name="en-us_topic_0183088382_b1711715552252"></a><a name="en-us_topic_0183088382_b1711715552252"></a>max-file</strong> is <strong id="en-us_topic_0183088382_b48471759202517"><a name="en-us_topic_0183088382_b48471759202517"></a><a name="en-us_topic_0183088382_b48471759202517"></a>1</strong>, <strong id="en-us_topic_0183088382_b486513192619"><a name="en-us_topic_0183088382_b486513192619"></a><a name="en-us_topic_0183088382_b486513192619"></a>max-size</strong> is invalid. <strong id="en-us_topic_0183088382_b196841277380"><a name="en-us_topic_0183088382_b196841277380"></a><a name="en-us_topic_0183088382_b196841277380"></a>log-path</strong> specifies the path for storing log files. The <strong id="en-us_topic_0183088382_b102019387381"><a name="en-us_topic_0183088382_b102019387381"></a><a name="en-us_topic_0183088382_b102019387381"></a>log-file-mode</strong> command is used to set the permissions to read and write log files. The value must be in octal format, for example, 0666.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row3184173213188"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p428010440155"><a name="en-us_topic_0183088382_p428010440155"></a><a name="en-us_topic_0183088382_p428010440155"></a>--start-timeout</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p45471331102019"><a name="en-us_topic_0183088382_p45471331102019"></a><a name="en-us_topic_0183088382_p45471331102019"></a>"start-timeout": "2m"</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p42804442151"><a name="en-us_topic_0183088382_p42804442151"></a><a name="en-us_topic_0183088382_p42804442151"></a>Time required for starting a container.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p518414326185"><a name="en-us_topic_0183088382_p518414326185"></a><a name="en-us_topic_0183088382_p518414326185"></a>None</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row268925742113"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p169015722119"><a name="en-us_topic_0183088382_p169015722119"></a><a name="en-us_topic_0183088382_p169015722119"></a>--runtime</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p869085711218"><a name="en-us_topic_0183088382_p869085711218"></a><a name="en-us_topic_0183088382_p869085711218"></a>"default-runtime": "lcr"</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p969065714218"><a name="en-us_topic_0183088382_p969065714218"></a><a name="en-us_topic_0183088382_p969065714218"></a>Container runtime, which is <strong id="en-us_topic_0183088382_b17539111015224"><a name="en-us_topic_0183088382_b17539111015224"></a><a name="en-us_topic_0183088382_b17539111015224"></a>lcr</strong> by default.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p1869018570211"><a name="en-us_topic_0183088382_p1869018570211"></a><a name="en-us_topic_0183088382_p1869018570211"></a>If neither the CLI nor the configuration file specifies the runtime, <strong id="en-us_topic_0183088382_b980720266245"><a name="en-us_topic_0183088382_b980720266245"></a><a name="en-us_topic_0183088382_b980720266245"></a>lcr</strong> is used by default. The priorities of the three specifying methods are as follows: CLI &gt; configuration file &gt; default value <strong id="en-us_topic_0183088382_b19903183316281"><a name="en-us_topic_0183088382_b19903183316281"></a><a name="en-us_topic_0183088382_b19903183316281"></a>lcr</strong>. Currently, <strong id="en-us_topic_0183088382_b524793164212"><a name="en-us_topic_0183088382_b524793164212"></a><a name="en-us_topic_0183088382_b524793164212"></a>lcr</strong> and <strong id="en-us_topic_0183088382_b131019357427"><a name="en-us_topic_0183088382_b131019357427"></a><a name="en-us_topic_0183088382_b131019357427"></a>kata-runtime</strong> are supported.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row171511251322"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p1515114523213"><a name="en-us_topic_0183088382_p1515114523213"></a><a name="en-us_topic_0183088382_p1515114523213"></a>None</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><pre class="screen" id="en-us_topic_0183088382_screen1380615215512"><a name="en-us_topic_0183088382_screen1380615215512"></a><a name="en-us_topic_0183088382_screen1380615215512"></a>"runtimes":  {
        "kata-runtime": {
          "path": "/usr/bin/kata-runtime",
          "runtime-args": [
            "--kata-config",
            "/usr/share/defaults/kata-containers/configuration.toml"
          ]
        }
    }</pre>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p13151155173217"><a name="en-us_topic_0183088382_p13151155173217"></a><a name="en-us_topic_0183088382_p13151155173217"></a>When starting a container, set this parameter to specify multiple runtimes. Runtimes in this set are valid for container startup.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p515185123219"><a name="en-us_topic_0183088382_p515185123219"></a><a name="en-us_topic_0183088382_p515185123219"></a>Runtime whitelist of a container. The customized runtimes in this set are valid. <strong id="en-us_topic_0183088382_b5398161094410"><a name="en-us_topic_0183088382_b5398161094410"></a><a name="en-us_topic_0183088382_b5398161094410"></a>kata-runtime</strong> is used as the example.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row15136153112159"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p10136931171510"><a name="en-us_topic_0183088382_p10136931171510"></a><a name="en-us_topic_0183088382_p10136931171510"></a>-p, --pidfile</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p36021623203112"><a name="en-us_topic_0183088382_p36021623203112"></a><a name="en-us_topic_0183088382_p36021623203112"></a>"pidfile": "/var/run/isulad.pid"</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p18136331171519"><a name="en-us_topic_0183088382_p18136331171519"></a><a name="en-us_topic_0183088382_p18136331171519"></a>File for storing PIDs.</p>
    </td>
    <td class="cellrowborder" rowspan="3" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p1172943191815"><a name="en-us_topic_0183088382_p1172943191815"></a><a name="en-us_topic_0183088382_p1172943191815"></a>This parameter is required only when more than two container engines need to be started.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row653093817159"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p1184145184319"><a name="en-us_topic_0183088382_p1184145184319"></a><a name="en-us_topic_0183088382_p1184145184319"></a>-g, --graph</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p18548131192011"><a name="en-us_topic_0183088382_p18548131192011"></a><a name="en-us_topic_0183088382_p18548131192011"></a>"graph": "/var/lib/isulad"</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p953012380155"><a name="en-us_topic_0183088382_p953012380155"></a><a name="en-us_topic_0183088382_p953012380155"></a>Root directory for iSulad runtimes.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row136522509157"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p17652155011154"><a name="en-us_topic_0183088382_p17652155011154"></a><a name="en-us_topic_0183088382_p17652155011154"></a>-S, --state</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p15731136172118"><a name="en-us_topic_0183088382_p15731136172118"></a><a name="en-us_topic_0183088382_p15731136172118"></a>"state": "/var/run/isulad"</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p136526505159"><a name="en-us_topic_0183088382_p136526505159"></a><a name="en-us_topic_0183088382_p136526505159"></a>Root directory of the execution file.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row310079467"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p161167104619"><a name="en-us_topic_0183088382_p161167104619"></a><a name="en-us_topic_0183088382_p161167104619"></a>--storage-driver</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p10121872469"><a name="en-us_topic_0183088382_p10121872469"></a><a name="en-us_topic_0183088382_p10121872469"></a>"storage-driver": "overlay2"</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p13121979465"><a name="en-us_topic_0183088382_p13121979465"></a><a name="en-us_topic_0183088382_p13121979465"></a>Image storage driver, which is <strong id="en-us_topic_0183088382_b122631024104112"><a name="en-us_topic_0183088382_b122631024104112"></a><a name="en-us_topic_0183088382_b122631024104112"></a>overlay2</strong> by default.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p11124724618"><a name="en-us_topic_0183088382_p11124724618"></a><a name="en-us_topic_0183088382_p11124724618"></a>Only <strong id="en-us_topic_0183088382_b69247503414"><a name="en-us_topic_0183088382_b69247503414"></a><a name="en-us_topic_0183088382_b69247503414"></a>overlay2</strong> is supported.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row1193131917473"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p171931219104720"><a name="en-us_topic_0183088382_p171931219104720"></a><a name="en-us_topic_0183088382_p171931219104720"></a>-s, --storage-opt</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p181936195474"><a name="en-us_topic_0183088382_p181936195474"></a><a name="en-us_topic_0183088382_p181936195474"></a>"storage-opts": [ "overlay2.override_kernel_check=true" ]</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p141932195472"><a name="en-us_topic_0183088382_p141932195472"></a><a name="en-us_topic_0183088382_p141932195472"></a>Image storage driver configuration options.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p1219315196472"><a name="en-us_topic_0183088382_p1219315196472"></a><a name="en-us_topic_0183088382_p1219315196472"></a>The options are as follows:</p>
    <pre class="screen" id="en-us_topic_0183088382_screen930516156473"><a name="en-us_topic_0183088382_screen930516156473"></a><a name="en-us_topic_0183088382_screen930516156473"></a>overlay2.override_kernel_check=true #Ignore the kernel version check.
    overlay2.size=${size} #Set the rootfs quota to ${<em id="en-us_topic_0183088382_i6643961440"><a name="en-us_topic_0183088382_i6643961440"></a><a name="en-us_topic_0183088382_i6643961440"></a>size</em>}.
    overlay2.basesize=${size} #It is equivalent to overlay2.size.</pre>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row131175617481"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p1011776154814"><a name="en-us_topic_0183088382_p1011776154814"></a><a name="en-us_topic_0183088382_p1011776154814"></a>--image-opt-timeout</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p1011715614811"><a name="en-us_topic_0183088382_p1011715614811"></a><a name="en-us_topic_0183088382_p1011715614811"></a>"image-opt-timeout": "5m"</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p191172614487"><a name="en-us_topic_0183088382_p191172614487"></a><a name="en-us_topic_0183088382_p191172614487"></a>Image operation timeout interval, which is <strong id="en-us_topic_0183088382_b48971850173111"><a name="en-us_topic_0183088382_b48971850173111"></a><a name="en-us_topic_0183088382_b48971850173111"></a>5m</strong> by default.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p1211716634811"><a name="en-us_topic_0183088382_p1211716634811"></a><a name="en-us_topic_0183088382_p1211716634811"></a>The value <strong id="en-us_topic_0183088382_b13502125973116"><a name="en-us_topic_0183088382_b13502125973116"></a><a name="en-us_topic_0183088382_b13502125973116"></a>-1</strong> indicates that the timeout interval is not limited.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row9416750154814"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p1141645012486"><a name="en-us_topic_0183088382_p1141645012486"></a><a name="en-us_topic_0183088382_p1141645012486"></a>--registry-mirrors</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p154166500486"><a name="en-us_topic_0183088382_p154166500486"></a><a name="en-us_topic_0183088382_p154166500486"></a>"registry-mirrors": [ "docker.io" ]</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p104166505483"><a name="en-us_topic_0183088382_p104166505483"></a><a name="en-us_topic_0183088382_p104166505483"></a>Registry address.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p94161750184812"><a name="en-us_topic_0183088382_p94161750184812"></a><a name="en-us_topic_0183088382_p94161750184812"></a>None</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row1361351625020"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p106137167505"><a name="en-us_topic_0183088382_p106137167505"></a><a name="en-us_topic_0183088382_p106137167505"></a>--insecure-registry</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p13613131620505"><a name="en-us_topic_0183088382_p13613131620505"></a><a name="en-us_topic_0183088382_p13613131620505"></a>"insecure-registries": [  ]</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p1961331625018"><a name="en-us_topic_0183088382_p1961331625018"></a><a name="en-us_topic_0183088382_p1961331625018"></a>Registry without TLS verification.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p4613151635012"><a name="en-us_topic_0183088382_p4613151635012"></a><a name="en-us_topic_0183088382_p4613151635012"></a>None</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row6478229517"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p184872285117"><a name="en-us_topic_0183088382_p184872285117"></a><a name="en-us_topic_0183088382_p184872285117"></a>--native.umask</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p64810222510"><a name="en-us_topic_0183088382_p64810222510"></a><a name="en-us_topic_0183088382_p64810222510"></a>"native.umask": "secure"</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p204882245120"><a name="en-us_topic_0183088382_p204882245120"></a><a name="en-us_topic_0183088382_p204882245120"></a>Container umask policy. The default value is <strong id="en-us_topic_0183088382_b79861325183214"><a name="en-us_topic_0183088382_b79861325183214"></a><a name="en-us_topic_0183088382_b79861325183214"></a>secure</strong>. The value <strong id="en-us_topic_0183088382_b087363453215"><a name="en-us_topic_0183088382_b087363453215"></a><a name="en-us_topic_0183088382_b087363453215"></a>normal</strong> indicates insecure configuration.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p113713356399"><a name="en-us_topic_0183088382_p113713356399"></a><a name="en-us_topic_0183088382_p113713356399"></a>Set the container <strong id="en-us_topic_0183088382_b12337182613315"><a name="en-us_topic_0183088382_b12337182613315"></a><a name="en-us_topic_0183088382_b12337182613315"></a>umask</strong> value.</p>
    <p id="en-us_topic_0183088382_p83703583914"><a name="en-us_topic_0183088382_p83703583914"></a><a name="en-us_topic_0183088382_p83703583914"></a>The value can be null (<strong id="en-us_topic_0183088382_b7673152216467"><a name="en-us_topic_0183088382_b7673152216467"></a><a name="en-us_topic_0183088382_b7673152216467"></a>0027</strong> by default), <strong id="en-us_topic_0183088382_b132081190463"><a name="en-us_topic_0183088382_b132081190463"></a><a name="en-us_topic_0183088382_b132081190463"></a>normal</strong>, or <strong id="en-us_topic_0183088382_b1931632544617"><a name="en-us_topic_0183088382_b1931632544617"></a><a name="en-us_topic_0183088382_b1931632544617"></a>secure</strong>.</p>
    <pre class="screen" id="en-us_topic_0183088382_screen183793510395"><a name="en-us_topic_0183088382_screen183793510395"></a><a name="en-us_topic_0183088382_screen183793510395"></a>normal #The <strong id="en-us_topic_0183088382_b18663240153315"><a name="en-us_topic_0183088382_b18663240153315"></a><a name="en-us_topic_0183088382_b18663240153315"></a>umask</strong> value of the started container is <strong id="en-us_topic_0183088382_b1823524416329"><a name="en-us_topic_0183088382_b1823524416329"></a><a name="en-us_topic_0183088382_b1823524416329"></a>0022</strong>.
    secure #The <strong id="en-us_topic_0183088382_b37173716334"><a name="en-us_topic_0183088382_b37173716334"></a><a name="en-us_topic_0183088382_b37173716334"></a>umask</strong> value of the started container is <strong id="en-us_topic_0183088382_b13696195213210"><a name="en-us_topic_0183088382_b13696195213210"></a><a name="en-us_topic_0183088382_b13696195213210"></a>0027</strong> (default value).</pre>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row17980122213554"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p8981182218557"><a name="en-us_topic_0183088382_p8981182218557"></a><a name="en-us_topic_0183088382_p8981182218557"></a>--pod-sandbox-image</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p139811322175518"><a name="en-us_topic_0183088382_p139811322175518"></a><a name="en-us_topic_0183088382_p139811322175518"></a>"pod-sandbox-image": "rnd-dockerhub.huawei.com/library/pause-aarch64:3.0"</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p49811822155510"><a name="en-us_topic_0183088382_p49811822155510"></a><a name="en-us_topic_0183088382_p49811822155510"></a>By default, the pod uses the image. The default value is <strong id="en-us_topic_0183088382_b2062081413477"><a name="en-us_topic_0183088382_b2062081413477"></a><a name="en-us_topic_0183088382_b2062081413477"></a>rnd-dockerhub.huawei.com/library/pause-${machine}:3.0</strong>.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p69811822125512"><a name="en-us_topic_0183088382_p69811822125512"></a><a name="en-us_topic_0183088382_p69811822125512"></a>None</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row188472316584"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p1384723145811"><a name="en-us_topic_0183088382_p1384723145811"></a><a name="en-us_topic_0183088382_p1384723145811"></a>--network-plugin</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p884720325814"><a name="en-us_topic_0183088382_p884720325814"></a><a name="en-us_topic_0183088382_p884720325814"></a>"network-plugin": ""</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p1984753135819"><a name="en-us_topic_0183088382_p1984753135819"></a><a name="en-us_topic_0183088382_p1984753135819"></a>Specifies a network plug-in. The value is a null character by default, indicating that no network configuration is available and the created sandbox has only the loop NIC.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p5328256144412"><a name="en-us_topic_0183088382_p5328256144412"></a><a name="en-us_topic_0183088382_p5328256144412"></a>The CNI and null characters are supported. Other invalid values will cause iSulad startup failure.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row87801123589"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p16780161275813"><a name="en-us_topic_0183088382_p16780161275813"></a><a name="en-us_topic_0183088382_p16780161275813"></a>--cni-bin-dir</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p1490515812185"><a name="en-us_topic_0183088382_p1490515812185"></a><a name="en-us_topic_0183088382_p1490515812185"></a>"cni-bin-dir": ""</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p197801012185815"><a name="en-us_topic_0183088382_p197801012185815"></a><a name="en-us_topic_0183088382_p197801012185815"></a>Specifies the storage location of the binary file on which the CNI plug-in depends.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p67801412195816"><a name="en-us_topic_0183088382_p67801412195816"></a><a name="en-us_topic_0183088382_p67801412195816"></a>The default value is <strong id="en-us_topic_0183088382_b14428154312484"><a name="en-us_topic_0183088382_b14428154312484"></a><a name="en-us_topic_0183088382_b14428154312484"></a>/opt/cni/bin</strong>.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row1962441481812"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p2063931461819"><a name="en-us_topic_0183088382_p2063931461819"></a><a name="en-us_topic_0183088382_p2063931461819"></a>--cni-conf-dir</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p763921410185"><a name="en-us_topic_0183088382_p763921410185"></a><a name="en-us_topic_0183088382_p763921410185"></a>"cni-conf-dir": ""</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p563911146186"><a name="en-us_topic_0183088382_p563911146186"></a><a name="en-us_topic_0183088382_p563911146186"></a>Specifies the storage location of the CNI network configuration file.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p186391514131813"><a name="en-us_topic_0183088382_p186391514131813"></a><a name="en-us_topic_0183088382_p186391514131813"></a>The default value is <strong id="en-us_topic_0183088382_b225725254811"><a name="en-us_topic_0183088382_b225725254811"></a><a name="en-us_topic_0183088382_b225725254811"></a>/etc/cni/net.d</strong>.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row1512513434484"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p13381035153916"><a name="en-us_topic_0183088382_p13381035153916"></a><a name="en-us_topic_0183088382_p13381035153916"></a>--image-layer-check=false</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p3137217114920"><a name="en-us_topic_0183088382_p3137217114920"></a><a name="en-us_topic_0183088382_p3137217114920"></a>"image-layer-check": false</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p5381735103917"><a name="en-us_topic_0183088382_p5381735103917"></a><a name="en-us_topic_0183088382_p5381735103917"></a>Image layer integrity check. To enable the function, set it to <strong id="en-us_topic_0183088382_b1369811517508"><a name="en-us_topic_0183088382_b1369811517508"></a><a name="en-us_topic_0183088382_b1369811517508"></a>true</strong>; otherwise, set it to <strong id="en-us_topic_0183088382_b4387132110508"><a name="en-us_topic_0183088382_b4387132110508"></a><a name="en-us_topic_0183088382_b4387132110508"></a>false</strong>. It is disabled by default.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p73816359392"><a name="en-us_topic_0183088382_p73816359392"></a><a name="en-us_topic_0183088382_p73816359392"></a>When iSulad is started, the image layer integrity is checked. If the image layer is damaged, the related images are unavailable. iSulad cannot verify empty files, directories, and link files. Therefore, if the preceding files are lost due to a power failure, the integrity check of iSulad image data may fail to be identified. When the iSulad version changes, check whether the parameter is supported. If not, delete it from the configuration file.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row1957122819014"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p4571928901"><a name="en-us_topic_0183088382_p4571928901"></a><a name="en-us_topic_0183088382_p4571928901"></a>--insecure-skip-verify-enforce=false</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p1457182820014"><a name="en-us_topic_0183088382_p1457182820014"></a><a name="en-us_topic_0183088382_p1457182820014"></a>"insecure-skip-verify-enforce": false</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p205711285016"><a name="en-us_topic_0183088382_p205711285016"></a><a name="en-us_topic_0183088382_p205711285016"></a>Indicates whether to forcibly skip the verification of the certificate host name/domain name. The value is of the Boolean type, and the default value is <strong id="en-us_topic_0183088382_b1035216106543"><a name="en-us_topic_0183088382_b1035216106543"></a><a name="en-us_topic_0183088382_b1035216106543"></a>false</strong>. If this parameter is set to <strong id="en-us_topic_0183088382_b6953112310546"><a name="en-us_topic_0183088382_b6953112310546"></a><a name="en-us_topic_0183088382_b6953112310546"></a>true</strong>, the verification of the certificate host name/domain name is skipped.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p1057162817018"><a name="en-us_topic_0183088382_p1057162817018"></a><a name="en-us_topic_0183088382_p1057162817018"></a>The default value is <strong id="en-us_topic_0183088382_b1784145910545"><a name="en-us_topic_0183088382_b1784145910545"></a><a name="en-us_topic_0183088382_b1784145910545"></a>false</strong> (not skipped). Note: Restricted by the YAJL JSON parsing library, if a non-Boolean value that meets the JSON format requirements is configured in the <strong id="en-us_topic_0183088382_b156352885614"><a name="en-us_topic_0183088382_b156352885614"></a><a name="en-us_topic_0183088382_b156352885614"></a>/etc/isulad/daemon.json</strong> configuration file, the default value used by iSulad is <strong id="en-us_topic_0183088382_b833851735612"><a name="en-us_topic_0183088382_b833851735612"></a><a name="en-us_topic_0183088382_b833851735612"></a>false</strong>.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row77997227015"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p128007225017"><a name="en-us_topic_0183088382_p128007225017"></a><a name="en-us_topic_0183088382_p128007225017"></a>--use-decrypted-key=true</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p1580019221609"><a name="en-us_topic_0183088382_p1580019221609"></a><a name="en-us_topic_0183088382_p1580019221609"></a>"use-decrypted-key": true</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p4653451114"><a name="en-us_topic_0183088382_p4653451114"></a><a name="en-us_topic_0183088382_p4653451114"></a>Specifies whether to use an unencrypted private key. The value is of the Boolean type. If this parameter is set to <strong id="en-us_topic_0183088382_b12928333568"><a name="en-us_topic_0183088382_b12928333568"></a><a name="en-us_topic_0183088382_b12928333568"></a>true</strong>, an unencrypted private key is used. If this parameter is set to <strong id="en-us_topic_0183088382_b18412437565"><a name="en-us_topic_0183088382_b18412437565"></a><a name="en-us_topic_0183088382_b18412437565"></a>false</strong>, the encrypted private key is used, that is, two-way authentication is required.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p1980010221300"><a name="en-us_topic_0183088382_p1980010221300"></a><a name="en-us_topic_0183088382_p1980010221300"></a>The default value is <strong id="en-us_topic_0183088382_b546314547568"><a name="en-us_topic_0183088382_b546314547568"></a><a name="en-us_topic_0183088382_b546314547568"></a>true</strong>, indicating that an unencrypted private key is used. Note: Restricted by the YAJL JSON parsing library, if a non-Boolean value that meets the JSON format requirements is configured in the <strong id="en-us_topic_0183088382_b17835025115815"><a name="en-us_topic_0183088382_b17835025115815"></a><a name="en-us_topic_0183088382_b17835025115815"></a>/etc/isulad/daemon.json</strong> configuration file, the default value used by iSulad is <strong id="en-us_topic_0183088382_b22471939135820"><a name="en-us_topic_0183088382_b22471939135820"></a><a name="en-us_topic_0183088382_b22471939135820"></a>true</strong>.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row193701038184719"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p837073816475"><a name="en-us_topic_0183088382_p837073816475"></a><a name="en-us_topic_0183088382_p837073816475"></a>--tls</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p1637063817472"><a name="en-us_topic_0183088382_p1637063817472"></a><a name="en-us_topic_0183088382_p1637063817472"></a>"tls":false</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p183701238164717"><a name="en-us_topic_0183088382_p183701238164717"></a><a name="en-us_topic_0183088382_p183701238164717"></a>Specifies whether to use TLS. The value is of the Boolean type.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p837003854714"><a name="en-us_topic_0183088382_p837003854714"></a><a name="en-us_topic_0183088382_p837003854714"></a>This parameter is used only in <strong id="en-us_topic_0183088382_b1282754291116"><a name="en-us_topic_0183088382_b1282754291116"></a><a name="en-us_topic_0183088382_b1282754291116"></a>-H tcp://IP:PORT</strong> mode. The default value is <strong id="en-us_topic_0183088382_b0985173310597"><a name="en-us_topic_0183088382_b0985173310597"></a><a name="en-us_topic_0183088382_b0985173310597"></a>false</strong>.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row1063064617518"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p146308462513"><a name="en-us_topic_0183088382_p146308462513"></a><a name="en-us_topic_0183088382_p146308462513"></a>--tlsverify</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p391520813524"><a name="en-us_topic_0183088382_p391520813524"></a><a name="en-us_topic_0183088382_p391520813524"></a>"tlsverify":false</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p16630184612511"><a name="en-us_topic_0183088382_p16630184612511"></a><a name="en-us_topic_0183088382_p16630184612511"></a>Specifies whether to use TLS and verify remote access. The value is of the Boolean type.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p26306465516"><a name="en-us_topic_0183088382_p26306465516"></a><a name="en-us_topic_0183088382_p26306465516"></a>This parameter is used only in <strong id="en-us_topic_0183088382_b67821854111116"><a name="en-us_topic_0183088382_b67821854111116"></a><a name="en-us_topic_0183088382_b67821854111116"></a>-H tcp://IP:PORT</strong> mode.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row17932756195417"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p1393365665419"><a name="en-us_topic_0183088382_p1393365665419"></a><a name="en-us_topic_0183088382_p1393365665419"></a>--tlscacert</p>
    <p id="en-us_topic_0183088382_p13305174665514"><a name="en-us_topic_0183088382_p13305174665514"></a><a name="en-us_topic_0183088382_p13305174665514"></a>--tlscert</p>
    <p id="en-us_topic_0183088382_p1737975865511"><a name="en-us_topic_0183088382_p1737975865511"></a><a name="en-us_topic_0183088382_p1737975865511"></a>--tlskey</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p1691231517559"><a name="en-us_topic_0183088382_p1691231517559"></a><a name="en-us_topic_0183088382_p1691231517559"></a>"tls-config": {</p>
    <p id="en-us_topic_0183088382_p491291545520"><a name="en-us_topic_0183088382_p491291545520"></a><a name="en-us_topic_0183088382_p491291545520"></a>"CAFile": "/root/.iSulad/ca.pem",</p>
    <p id="en-us_topic_0183088382_p15912151513551"><a name="en-us_topic_0183088382_p15912151513551"></a><a name="en-us_topic_0183088382_p15912151513551"></a>"CertFile": "/root/.iSulad/server-cert.pem",</p>
    <p id="en-us_topic_0183088382_p17912181545514"><a name="en-us_topic_0183088382_p17912181545514"></a><a name="en-us_topic_0183088382_p17912181545514"></a>"KeyFile":"/root/.iSulad/server-key.pem"</p>
    <p id="en-us_topic_0183088382_p1291201575515"><a name="en-us_topic_0183088382_p1291201575515"></a><a name="en-us_topic_0183088382_p1291201575515"></a>}</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p1393395614545"><a name="en-us_topic_0183088382_p1393395614545"></a><a name="en-us_topic_0183088382_p1393395614545"></a>TLS certificate-related configuration.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p4210113494915"><a name="en-us_topic_0183088382_p4210113494915"></a><a name="en-us_topic_0183088382_p4210113494915"></a>This parameter is used only in <strong id="en-us_topic_0183088382_b175423281214"><a name="en-us_topic_0183088382_b175423281214"></a><a name="en-us_topic_0183088382_b175423281214"></a>-H tcp://IP:PORT</strong> mode.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row12466569132"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p1069616014147"><a name="en-us_topic_0183088382_p1069616014147"></a><a name="en-us_topic_0183088382_p1069616014147"></a>--authorization-plugin</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p16961706144"><a name="en-us_topic_0183088382_p16961706144"></a><a name="en-us_topic_0183088382_p16961706144"></a>"authorization-plugin": "authz-broker"</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p206965010147"><a name="en-us_topic_0183088382_p206965010147"></a><a name="en-us_topic_0183088382_p206965010147"></a>User permission authentication plugin.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p1669613013140"><a name="en-us_topic_0183088382_p1669613013140"></a><a name="en-us_topic_0183088382_p1669613013140"></a>Only <strong id="en-us_topic_0183088382_b85781406014"><a name="en-us_topic_0183088382_b85781406014"></a><a name="en-us_topic_0183088382_b85781406014"></a>authz-broker</strong> is supported.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row20710191517116"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p12710141561118"><a name="en-us_topic_0183088382_p12710141561118"></a><a name="en-us_topic_0183088382_p12710141561118"></a>--cgroup-parent</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p20710151511114"><a name="en-us_topic_0183088382_p20710151511114"></a><a name="en-us_topic_0183088382_p20710151511114"></a>"cgroup-parent": "lxc/mycgroup"</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p10710161531119"><a name="en-us_topic_0183088382_p10710161531119"></a><a name="en-us_topic_0183088382_p10710161531119"></a>Default cgroup parent path of a container, which is of the string type.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p20710515171118"><a name="en-us_topic_0183088382_p20710515171118"></a><a name="en-us_topic_0183088382_p20710515171118"></a>Specifies the cgroup parent path of a container. If <strong id="en-us_topic_0183088382_b1585463410451"><a name="en-us_topic_0183088382_b1585463410451"></a><a name="en-us_topic_0183088382_b1585463410451"></a>--cgroup-parent</strong> is specified on the client, the client parameter prevails.</p>
    <p id="en-us_topic_0183088382_p57568500219"><a name="en-us_topic_0183088382_p57568500219"></a><a name="en-us_topic_0183088382_p57568500219"></a>Note: If container A is started before container B, the cgroup parent path of container B is specified as the cgroup path of container A. When deleting a container, you need to delete container B and then container A in sequence. Otherwise, residual cgroup resources exist.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row68415012467"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p880175013463"><a name="en-us_topic_0183088382_p880175013463"></a><a name="en-us_topic_0183088382_p880175013463"></a>--default-ulimits</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p39365517472"><a name="en-us_topic_0183088382_p39365517472"></a><a name="en-us_topic_0183088382_p39365517472"></a>"default-ulimits": {</p>
    <p id="en-us_topic_0183088382_p5932551477"><a name="en-us_topic_0183088382_p5932551477"></a><a name="en-us_topic_0183088382_p5932551477"></a>"nofile": {</p>
    <p id="en-us_topic_0183088382_p593175517477"><a name="en-us_topic_0183088382_p593175517477"></a><a name="en-us_topic_0183088382_p593175517477"></a>"Name": "nofile",</p>
    <p id="en-us_topic_0183088382_p149315534710"><a name="en-us_topic_0183088382_p149315534710"></a><a name="en-us_topic_0183088382_p149315534710"></a>"Hard": 6400,</p>
    <p id="en-us_topic_0183088382_p1793135518471"><a name="en-us_topic_0183088382_p1793135518471"></a><a name="en-us_topic_0183088382_p1793135518471"></a>"Soft": 3200</p>
    <p id="en-us_topic_0183088382_p293165574716"><a name="en-us_topic_0183088382_p293165574716"></a><a name="en-us_topic_0183088382_p293165574716"></a>}</p>
    <p id="en-us_topic_0183088382_p149312555473"><a name="en-us_topic_0183088382_p149312555473"></a><a name="en-us_topic_0183088382_p149312555473"></a>}</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p8809504469"><a name="en-us_topic_0183088382_p8809504469"></a><a name="en-us_topic_0183088382_p8809504469"></a>Specifies the ulimit restriction type, soft value, and hard value.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p116711224125017"><a name="en-us_topic_0183088382_p116711224125017"></a><a name="en-us_topic_0183088382_p116711224125017"></a>Specifies the restricted resource type, for example, nofile. The two field names must be the same, that is, nofile. Otherwise, an error is reported. The value of <strong id="en-us_topic_0183088382_b205366431238"><a name="en-us_topic_0183088382_b205366431238"></a><a name="en-us_topic_0183088382_b205366431238"></a>Hard</strong> must be greater than or equal to that of <strong id="en-us_topic_0183088382_b866284717319"><a name="en-us_topic_0183088382_b866284717319"></a><a name="en-us_topic_0183088382_b866284717319"></a>Soft</strong>. If the <strong id="en-us_topic_0183088382_b151927407317"><a name="en-us_topic_0183088382_b151927407317"></a><a name="en-us_topic_0183088382_b151927407317"></a>Hard</strong> or <strong id="en-us_topic_0183088382_b1757555418310"><a name="en-us_topic_0183088382_b1757555418310"></a><a name="en-us_topic_0183088382_b1757555418310"></a>Soft</strong> field is not set, the default value <strong id="en-us_topic_0183088382_b0204134917477"><a name="en-us_topic_0183088382_b0204134917477"></a><a name="en-us_topic_0183088382_b0204134917477"></a>0</strong> is used.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088382_row156662015458"><td class="cellrowborder" valign="top" width="14.673267326732672%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183088382_p1967620144517"><a name="en-us_topic_0183088382_p1967620144517"></a><a name="en-us_topic_0183088382_p1967620144517"></a>--websocket-server-listening-port</p>
    </td>
    <td class="cellrowborder" valign="top" width="32.85148514851485%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183088382_p116772016455"><a name="en-us_topic_0183088382_p116772016455"></a><a name="en-us_topic_0183088382_p116772016455"></a>"websocket-server-listening-port": 10350</p>
    </td>
    <td class="cellrowborder" valign="top" width="21.237623762376238%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183088382_p1267202010452"><a name="en-us_topic_0183088382_p1267202010452"></a><a name="en-us_topic_0183088382_p1267202010452"></a>Specifies the listening port of the CRI WebSocket streaming service. The default port number is <strong id="en-us_topic_0183088382_b6304171353219"><a name="en-us_topic_0183088382_b6304171353219"></a><a name="en-us_topic_0183088382_b6304171353219"></a>10350</strong>.</p>
    </td>
    <td class="cellrowborder" valign="top" width="31.237623762376238%" headers="mcps1.1.5.1.4 "><p id="en-us_topic_0183088382_p967620204510"><a name="en-us_topic_0183088382_p967620204510"></a><a name="en-us_topic_0183088382_p967620204510"></a>Specifies the listening port of the CRI websocket streaming service.</p>
    <p id="en-us_topic_0183088382_p7309102310522"><a name="en-us_topic_0183088382_p7309102310522"></a><a name="en-us_topic_0183088382_p7309102310522"></a>If the client specifies <strong id="en-us_topic_0183088382_b1781526133318"><a name="en-us_topic_0183088382_b1781526133318"></a><a name="en-us_topic_0183088382_b1781526133318"></a>--websocket-server-listening-port</strong>, the specified value is used. The port number ranges from 1024 to 49151.</p>
    </td>
    </tr>
    </tbody>
    </table>

    Example: 

    ```
    $ cat /etc/isulad/daemon.json
    {
        "group": "isulad",
        "default-runtime": "lcr",
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
        "use-decrypted-key": true,
        "insecure-skip-verify-enforce": false
    }
    ```

    >![](public_sys-resources/icon-notice.gif) **NOTICE:**   
    >The default configuration file  **/etc/isulad/daemon.json**  is for reference only. Configure it based on site requirements.  


### Storage Description

<a name="en-us_topic_0183755188_table12812112117504"></a>
<table><thead align="left"><tr id="en-us_topic_0183755188_row20897152155019"><th class="cellrowborder" valign="top" width="33.333333333333336%" id="mcps1.1.4.1.1"><p id="en-us_topic_0183755188_p4898152114502"><a name="en-us_topic_0183755188_p4898152114502"></a><a name="en-us_topic_0183755188_p4898152114502"></a>File</p>
</th>
<th class="cellrowborder" valign="top" width="33.333333333333336%" id="mcps1.1.4.1.2"><p id="en-us_topic_0183755188_p1589832118507"><a name="en-us_topic_0183755188_p1589832118507"></a><a name="en-us_topic_0183755188_p1589832118507"></a>Directory</p>
</th>
<th class="cellrowborder" valign="top" width="33.333333333333336%" id="mcps1.1.4.1.3"><p id="en-us_topic_0183755188_p689882118509"><a name="en-us_topic_0183755188_p689882118509"></a><a name="en-us_topic_0183755188_p689882118509"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0183755188_row1789852111506"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183755188_p4898521125010"><a name="en-us_topic_0183755188_p4898521125010"></a><a name="en-us_topic_0183755188_p4898521125010"></a>*</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183755188_p18898182185011"><a name="en-us_topic_0183755188_p18898182185011"></a><a name="en-us_topic_0183755188_p18898182185011"></a>/etc/default/isulad/</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0183755188_p2089892145016"><a name="en-us_topic_0183755188_p2089892145016"></a><a name="en-us_topic_0183755188_p2089892145016"></a>Stores the OCI configuration file and hook template file of iSulad. The file configuration permission is set to <strong id="en-us_topic_0183755188_b15486781267"><a name="en-us_topic_0183755188_b15486781267"></a><a name="en-us_topic_0183755188_b15486781267"></a>0640</strong>, and the sysmonitor check permission is set to <strong id="en-us_topic_0183755188_b2787171118612"><a name="en-us_topic_0183755188_b2787171118612"></a><a name="en-us_topic_0183755188_b2787171118612"></a>0550</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183755188_row108989214505"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183755188_p138981221135016"><a name="en-us_topic_0183755188_p138981221135016"></a><a name="en-us_topic_0183755188_p138981221135016"></a>*</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183755188_p118981521145012"><a name="en-us_topic_0183755188_p118981521145012"></a><a name="en-us_topic_0183755188_p118981521145012"></a>/etc/isulad/</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0183755188_p15898182115506"><a name="en-us_topic_0183755188_p15898182115506"></a><a name="en-us_topic_0183755188_p15898182115506"></a>Default configuration files of iSulad and seccomp.</p>
</td>
</tr>
<tr id="en-us_topic_0183755188_row118989218509"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183755188_p089820217501"><a name="en-us_topic_0183755188_p089820217501"></a><a name="en-us_topic_0183755188_p089820217501"></a>isulad.sock</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183755188_p158987218508"><a name="en-us_topic_0183755188_p158987218508"></a><a name="en-us_topic_0183755188_p158987218508"></a>/var/run/</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0183755188_p389802105013"><a name="en-us_topic_0183755188_p389802105013"></a><a name="en-us_topic_0183755188_p389802105013"></a>Pipe communication file, which is used for the communication between the client and iSulad.</p>
</td>
</tr>
<tr id="en-us_topic_0183755188_row19898122145010"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183755188_p198986218509"><a name="en-us_topic_0183755188_p198986218509"></a><a name="en-us_topic_0183755188_p198986218509"></a>isulad.pid</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183755188_p11898221175017"><a name="en-us_topic_0183755188_p11898221175017"></a><a name="en-us_topic_0183755188_p11898221175017"></a>/var/run/</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0183755188_p289852115509"><a name="en-us_topic_0183755188_p289852115509"></a><a name="en-us_topic_0183755188_p289852115509"></a>File for storing the iSulad PIDs. It is also a file lock to prevent multiple iSulad instances from being started.</p>
</td>
</tr>
<tr id="en-us_topic_0183755188_row28986211507"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183755188_p128981021115012"><a name="en-us_topic_0183755188_p128981021115012"></a><a name="en-us_topic_0183755188_p128981021115012"></a>*</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183755188_p1898112165010"><a name="en-us_topic_0183755188_p1898112165010"></a><a name="en-us_topic_0183755188_p1898112165010"></a>/run/lxc/</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0183755188_p68981121175010"><a name="en-us_topic_0183755188_p68981121175010"></a><a name="en-us_topic_0183755188_p68981121175010"></a>Lock file, which is created during iSulad running.</p>
</td>
</tr>
<tr id="en-us_topic_0183755188_row389812120502"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183755188_p189812212507"><a name="en-us_topic_0183755188_p189812212507"></a><a name="en-us_topic_0183755188_p189812212507"></a>*</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183755188_p168981421125015"><a name="en-us_topic_0183755188_p168981421125015"></a><a name="en-us_topic_0183755188_p168981421125015"></a>/var/run/isulad/</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0183755188_p118981521185013"><a name="en-us_topic_0183755188_p118981521185013"></a><a name="en-us_topic_0183755188_p118981521185013"></a>Real-time communication cache file, which is created during iSulad running.</p>
</td>
</tr>
<tr id="en-us_topic_0183755188_row13898142116508"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183755188_p1889802125013"><a name="en-us_topic_0183755188_p1889802125013"></a><a name="en-us_topic_0183755188_p1889802125013"></a>*</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183755188_p158988216507"><a name="en-us_topic_0183755188_p158988216507"></a><a name="en-us_topic_0183755188_p158988216507"></a>/var/run/isula/</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0183755188_p2898221105010"><a name="en-us_topic_0183755188_p2898221105010"></a><a name="en-us_topic_0183755188_p2898221105010"></a>Real-time communication cache file, which is created during iSulad running.</p>
</td>
</tr>
<tr id="en-us_topic_0183755188_row68986219500"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183755188_p7898202117501"><a name="en-us_topic_0183755188_p7898202117501"></a><a name="en-us_topic_0183755188_p7898202117501"></a>*</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183755188_p11898172110509"><a name="en-us_topic_0183755188_p11898172110509"></a><a name="en-us_topic_0183755188_p11898172110509"></a>/var/lib/lcr/</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0183755188_p089882112508"><a name="en-us_topic_0183755188_p089882112508"></a><a name="en-us_topic_0183755188_p089882112508"></a>Temporary directory of the LCR component.</p>
</td>
</tr>
<tr id="en-us_topic_0183755188_row489892114506"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0183755188_p1589832145019"><a name="en-us_topic_0183755188_p1589832145019"></a><a name="en-us_topic_0183755188_p1589832145019"></a>*</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0183755188_p889892195014"><a name="en-us_topic_0183755188_p889892195014"></a><a name="en-us_topic_0183755188_p889892195014"></a>/var/lib/isulad/</p>
</td>
<td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0183755188_p148981921115016"><a name="en-us_topic_0183755188_p148981921115016"></a><a name="en-us_topic_0183755188_p148981921115016"></a>Root directory where iSulad runs, which stores the created container configuration, default log path, database file, and mount point.</p>
<p id="en-us_topic_0183755188_p3898221155011"><a name="en-us_topic_0183755188_p3898221155011"></a><a name="en-us_topic_0183755188_p3898221155011"></a><strong id="en-us_topic_0183755188_b193931311436"><a name="en-us_topic_0183755188_b193931311436"></a><a name="en-us_topic_0183755188_b193931311436"></a>/var/lib/isulad/mnt/</strong>: mount point of the container rootfs.</p>
<p id="en-us_topic_0183755188_p1989812145016"><a name="en-us_topic_0183755188_p1989812145016"></a><a name="en-us_topic_0183755188_p1989812145016"></a><strong id="en-us_topic_0183755188_b79449575312"><a name="en-us_topic_0183755188_b79449575312"></a><a name="en-us_topic_0183755188_b79449575312"></a>/var/lib/isulad/engines/lcr/</strong>: directory for storing LCR container configurations. Each container has a directory named after the container.</p>
</td>
</tr>
</tbody>
</table>

### Constraints

-   In high concurrency scenarios \(200 containers are concurrently started\), the memory management mechanism of Glibc may cause memory holes and large virtual memory \(for example, 10 GB\). This problem is caused by the restriction of the Glibc memory management mechanism in the high concurrency scenario, but not by memory leakage. Therefore, the memory consumption does not increase infinitely. You can set  **MALLOC\_ARENA\_MAX**  to reducevirtual memory error and increase the rate of reducing physical memory. However, this environment variable will cause the iSulad concurrency performance to deteriorate. Set this environment variable based on the site requirements.

    ```
    To balance performance and memory usage, set MALLOC_ARENA_MAX to 4. (The iSulad performance on the ARM64 server is affected by less than 10%.)
    
    Configuration method:
    1. To manually start iSulad, run the export MALLOC_ARENA_MAX=4 command and then start iSulad.
    2. If systemd manages iSulad, you can modify the /etc/sysconfig/iSulad file by adding MALLOC_ARENA_MAX=4.
    ```

-   Precautions for specifying the daemon running directories

    Take  **--root**  as an example. When  **/new/path/**  is used as the daemon new root directory, if a file exists in  **/new/path/**  and the directory or file name conflicts with that required by iSulad \(for example,  **engines**  and  **mnt**\), iSulad may update the original directory or file attributes including the owner and permission.

    Therefore, please note the impact of re-specifying various running directories and files on their attributes. You are advised to specify a new directory or file for iSulad to avoid file attribute changes and security issues caused by conflicts.

-   Log file management:

    >![](public_sys-resources/icon-notice.gif) **NOTICE:**   
    >Log function interconnection: logs are managed by systemd as iSulad is and then transmitted to rsyslogd. By default, rsyslog restricts the log writing speed. You can add the configuration item  **$imjournalRatelimitInterval 0**  to the  **/etc/rsyslog.conf**  file and restart the rsyslogd service.  

-   Restrictions on command line parameter parsing

    When the iSulad command line interface is used, the parameter parsing mode is slightly different from that of Docker. For flags with parameters in the command line, regardless of whether a long or short flag is used, only the first space after the flag or the character string after the equal sign \(=\) directly connected to the flag is used as the flag parameter. The details are as follows:

    1.  When a short flag is used, each character in the character string connected to the hyphen \(-\) is considered as a short flag. If there is an equal sign \(=\), the character string following the equal sign \(=\) is considered as the parameter of the short flag before the equal sign \(=\).

        **isula run -du=root busybox**  is equivalent to  **isula run -du root busybox**,  **isula run -d -u=root busybox**, or  **isula run -d -u root busybox**. When  **isula run -du:root**  is used, as  **-:**  is not a valid short flag, an error is reported. The preceding command is equivalent to  **isula run -ud root busybox**. However, this method is not recommended because it may cause semantic problems.

    1.  When a long flag is used, the character string connected to  **--**  is regarded as a long flag. If the character string contains an equal sign \(=\), the character string before the equal sign \(=\) is a long flag, and the character string after the equal sign \(=\) is a parameter.

        ```
        isula run --user=root busybox
        ```

        or

        ```
        isula run --user root busybox
        ```


-   After an iSulad container is started, you cannot run the  **isula run -i/-t/-ti**  and  **isula attach/exec**  commands as a non-root user.
-   When iSulad connects to an OCI container, only kata-runtime can be used to start the OCI container.

### Daemon Multi-Port Binding

#### Description

The daemon can bind multiple UNIX sockets or TCP ports and listen on these ports. The client can interact with the daemon through these ports.

#### Port

Users can configure one or more ports in the hosts field in the  **/etc/isulad/daemon.json**  file, or choose not to specify hosts.

```
{
    "hosts": [
        "unix:///var/run/isulad.sock",
        "tcp://localhost:5678",
        "tcp://127.0.0.1:6789"
    ]
}
```

Users can also run the  **-H**  or  **--host**  command in the  **/etc/sysconfig/iSulad**  file to configure a port, or choose not to specify hosts.

```
OPTIONS='-H unix:///var/run/isulad.sock --host tcp://127.0.0.1:6789'
```

If hosts are not specified in the  **daemon.json**  file and iSulad, the daemon listens on  **unix:///var/run/isulad.sock**  by default after startup.

#### Restrictions

-   Users cannot specify hosts in the  **/etc/isulad/daemon.json**  and  **/etc/sysconfig/iSuald**  files at the same time. Otherwise, an error will occur and iSulad cannot be started.

    ```
    unable to configure the isulad with file /etc/isulad/daemon.json: the following directives are specified both as a flag and in the configuration file: hosts: (from flag: [unix:///var/run/isulad.sock tcp://127.0.0.1:6789], from file: [unix:///var/run/isulad.sock tcp://localhost:5678 tcp://127.0.0.1:6789])
    ```

-   If the specified host is a UNIX socket, the socket must start with  **unix://**  followed by a valid absolute path.
-   If the specified host is a TCP port, the TCP port number must start with  **tcp://**  followed by a valid IP address and port number. The IP address can be that of the local host.
-   A maximum of 10 valid ports can be specified. If more than 10 ports are specified, an error will occur and iSulad cannot be started.

### Configuring TLS Authentication and Enabling Remote Access

#### Description

iSulad is designed in C/S mode. By default, the iSulad daemon process listens only on the local/var/run/isulad.sock. Therefore, you can run commands to operate containers only on the local client iSula. To enable iSula's remote access to the container, the iSulad daemon process needs to listen on the remote access port using TCP/IP. However, listening is performed only by simply configuring tcp ip:port. In this case, all IP addresses can communicate with iSulad by calling  **isula -H tcp://**_remote server IP address_**:port**, which may cause security problems. Therefore, it is recommended that a more secure version, namely Transport Layer Security \(TLS\), be used for remote access.

#### Generating TLS Certificate

-   Example of generating a plaintext private key and certificate

    ```
    #!/bin/bash
    set -e
    echo -n "Enter pass phrase:"
    read password
    echo -n "Enter public network ip:"
    read publicip
    echo -n "Enter host:"
    read HOST
    
    echo " => Using hostname: $publicip, You MUST connect to iSulad using this host!"
    
    mkdir -p $HOME/.iSulad
    cd $HOME/.iSulad
    rm -rf $HOME/.iSulad/*
    
    echo " => Generating CA key"
    openssl genrsa -passout pass:$password -aes256 -out ca-key.pem 4096
    echo " => Generating CA certificate"
    openssl req -passin pass:$password -new -x509 -days 365 -key ca-key.pem -sha256 -out ca.pem -subj "/C=CN/ST=zhejiang/L=hangzhou/O=Huawei/OU=iSulad/CN=iSulad@huawei.com"
    echo " => Generating server key"
    openssl genrsa -passout pass:$password -out server-key.pem 4096
    echo " => Generating server CSR"
    openssl req -passin pass:$password -subj /CN=$HOST -sha256 -new -key server-key.pem -out server.csr
    echo subjectAltName = DNS:$HOST,IP:$publicip,IP:127.0.0.1 >> extfile.cnf
    echo extendedKeyUsage = serverAuth >> extfile.cnf
    echo " => Signing server CSR with CA"
    openssl x509 -req -passin pass:$password -days 365 -sha256 -in server.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem -extfile extfile.cnf
    echo " => Generating client key"
    openssl genrsa -passout pass:$password -out key.pem 4096
    echo " => Generating client CSR"
    openssl req -passin pass:$password -subj '/CN=client' -new -key key.pem -out client.csr
    echo " => Creating extended key usage"
    echo extendedKeyUsage = clientAuth > extfile-client.cnf
    echo " => Signing client CSR with CA"
    openssl x509 -req -passin pass:$password -days 365 -sha256 -in client.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out cert.pem -extfile extfile-client.cnf
    rm -v client.csr server.csr extfile.cnf extfile-client.cnf
    chmod -v 0400 ca-key.pem key.pem server-key.pem
    chmod -v 0444 ca.pem server-cert.pem cert.pem
    ```


-   Example of generating an encrypted private key and certificate request file

    ```
    #!/bin/bash
    
    echo -n "Enter public network ip:"
    read publicip
    echo -n "Enter pass phrase:"
    read password
    
    # remove certificates from previous execution.
    rm -f *.pem *.srl *.csr *.cnf
    
    
    # generate CA private and public keys
    echo 01 > ca.srl
    openssl genrsa -aes256 -out ca-key.pem -passout pass:$password 2048
    openssl req -subj '/C=CN/ST=zhejiang/L=hangzhou/O=Huawei/OU=iSulad/CN=iSulad@huawei.com' -new -x509 -days $DAYS -passin pass:$password -key ca-key.pem -out ca.pem
    
    # create a server key and certificate signing request (CSR)
    openssl genrsa -aes256 -out server-key.pem -passout pass:$PASS 2048
    openssl req -new -key server-key.pem -out server.csr -passin pass:$password -subj '/CN=iSulad'
    
    echo subjectAltName = DNS:iSulad,IP:${publicip},IP:127.0.0.1 > extfile.cnf
    echo extendedKeyUsage = serverAuth >> extfile.cnf
    # sign the server key with our CA
    openssl x509 -req -days $DAYS -passin pass:$password -in server.csr -CA ca.pem -CAkey ca-key.pem -out server-cert.pem -extfile extfile.cnf
    
    # create a client key and certificate signing request (CSR)
    openssl genrsa -aes256 -out key.pem -passout pass:$password 2048
    openssl req -subj '/CN=client' -new -key key.pem -out client.csr -passin pass:$password
    
    # create an extensions config file and sign
    echo extendedKeyUsage = clientAuth > extfile.cnf
    openssl x509 -req -days 365 -passin pass:$password -in client.csr -CA ca.pem -CAkey ca-key.pem -out cert.pem -extfile extfile.cnf
    
    # remove the passphrase from the client and server key
    openssl rsa -in server-key.pem -out server-key.pem -passin pass:$password
    openssl rsa -in key.pem -out key.pem -passin pass:$password
    
    # remove generated files that are no longer required
    rm -f ca-key.pem ca.srl client.csr extfile.cnf server.csr
    ```


#### APIs

```
{
    "tls": true,
    "tls-verify": true,
    "tls-config": {
		"CAFile": "/root/.iSulad/ca.pem",
		"CertFile": "/root/.iSulad/server-cert.pem",
		"KeyFile":"/root/.iSulad/server-key.pem"
    }
}
```

#### Restrictions

The server supports the following modes:

-   Mode 1 \(client verified\): tlsverify, tlscacert, tlscert, tlskey
-   Mode 2 \(client not verified\): tls, tlscert, tlskey

The client supports the following modes:

-   Mode 1 \(verify the identity based on the client certificate, and verify the server based on the specified CA\): tlsverify, tlscacert, tlscert, tlskey
-   Mode 2 \(server verified\): tlsverify, tlscacert

Mode 1 is used for the server, and mode 2 for the client if the two-way authentication mode is used for communication.

Mode 2 is used for the server and the client if the unidirectional authentication mode is used for communication.

>![](public_sys-resources/icon-notice.gif) **NOTICE:**   
>-   If RPM is used for installation, the server configuration can be modified in the  **/etc/isulad/daemon.json**  and  **/etc/sysconfig/iSulad**  files.  
>-   Two-way authentification is recommended as it is more secure than non-authentication or unidirectional authentication.  
>-   GRPC open-source component logs are not taken over by iSulad. To view gRPC logs, set the environment variables  **gRPC\_VERBOSITY**  and  **gRPC\_TRACE**  as required.  
>    

#### Example

On the server:

```
 isulad -H=tcp://0.0.0.0:2376 --tlsverify --tlscacert ~/.iSulad/ca.pem --tlscert ~/.iSulad/server-cert.pem --tlskey ~/.iSulad/server-key.pem
```

On the client:

```
 isula version -H=tcp://$HOSTIP:2376 --tlsverify --tlscacert ~/.iSulad/ca.pem --tlscert ~/.iSulad/cert.pem --tlskey ~/.iSulad/key.pem
```

### devicemapper Storage Driver Configuration

To use the devicemapper storage driver, you need to configure a thinpool device which requires an independent block device with sufficient free space. Take the independent block device  **/dev/xvdf**  as an example. The configuration method is as follows:

1. Configuring a thinpool

1.  Stop the iSulad service.

    ```
    # systemctl stop isulad
    ```

2.  Create a logical volume manager \(LVM\) volume based on the block device.

    ```
    # pvcreate /dev/xvdf
    ```

3.  Create a volume group based on the created physical volume.

    ```
    # vgcreate isula /dev/xvdf
    Volume group "isula" successfully created:
    ```

4.  Create two logical volumes named  **thinpool**  and  **thinpoolmeta**.

    ```
    # lvcreate --wipesignatures y -n thinpool isula -l 95%VG
    Logical volume "thinpool" created.
    ```

    ```
    # lvcreate --wipesignatures y -n thinpoolmeta isula -l 1%VG
    Logical volume "thinpoolmeta" created.
    ```

5.  Convert the two logical volumes into a thinpool and the metadata used by the thinpool.

    ```
    # lvconvert -y --zero n -c 512K --thinpool isula/thinpool --poolmetadata isula/thinpoolmeta
    
    WARNING: Converting logical volume isula/thinpool and isula/thinpoolmeta to
    thin pool's data and metadata volumes with metadata wiping.
    THIS WILL DESTROY CONTENT OF LOGICAL VOLUME (filesystem etc.)
    Converted isula/thinpool to thin pool.
    ```


  

2. Modifying the iSulad configuration files

1.  If iSulad has been used in the environment, back up the running data first.

    ```
    # mkdir /var/lib/isulad.bk
    # mv /var/lib/isulad/* /var/lib/isulad.bk
    ```

2.  Modify configuration files.

    Two configuration methods are provided. Select one based on site requirements.

    -   Edit the  **/etc/isulad/daemon.json**  file, set  **storage-driver**  to  **devicemapper**, and set parameters related to the  **storage-opts**  field. For details about related parameters, see  [Parameter Description](#en-us_topic_0222861454_section1712923715282). The following lists the configuration reference:

        ```
        {
            "storage-driver": "devicemapper"
            "storage-opts": [
        	    "dm.thinpooldev=/dev/mapper/isula-thinpool",
        	    "dm.fs=ext4",
                    "dm.min_free_space=10%"
            ]
        }
        ```

    -   You can also edit  **/etc/sysconfig/iSulad**  to explicitly specify related iSulad startup parameters. For details about related parameters, see  [Parameter Description](#en-us_topic_0222861454_section1712923715282). The following lists the configuration reference:

        ```
        OPTIONS="--storage-driver=devicemapper --storage-opt dm.thinpooldev=/dev/mapper/isula-thinpool --storage-opt dm.fs=ext4 --storage-opt dm.min_free_space=10%"
        ```

3.  Start iSulad for the settings to take effect.

    ```
    # systemctl start isulad
    ```


#### Parameter Description

For details about parameters supported by storage-opts, see  [Table 1](#en-us_topic_0222861454_table3191161993812).

**Table  1**  Parameter description

<a name="en-us_topic_0222861454_table3191161993812"></a>
<table><thead align="left"><tr id="en-us_topic_0222861454_row10191171913388"><th class="cellrowborder" valign="top" width="33.333333333333336%" id="mcps1.2.4.1.1"><p id="en-us_topic_0222861454_p15732144612386"><a name="en-us_topic_0222861454_p15732144612386"></a><a name="en-us_topic_0222861454_p15732144612386"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="13.29132913291329%" id="mcps1.2.4.1.2"><p id="en-us_topic_0222861454_p197321046123819"><a name="en-us_topic_0222861454_p197321046123819"></a><a name="en-us_topic_0222861454_p197321046123819"></a>Mandatory or Not</p>
</th>
<th class="cellrowborder" valign="top" width="53.375337533753374%" id="mcps1.2.4.1.3"><p id="en-us_topic_0222861454_p177327461387"><a name="en-us_topic_0222861454_p177327461387"></a><a name="en-us_topic_0222861454_p177327461387"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0222861454_row7191219133819"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0222861454_p6732154610382"><a name="en-us_topic_0222861454_p6732154610382"></a><a name="en-us_topic_0222861454_p6732154610382"></a>dm.fs</p>
</td>
<td class="cellrowborder" valign="top" width="13.29132913291329%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0222861454_p873254663811"><a name="en-us_topic_0222861454_p873254663811"></a><a name="en-us_topic_0222861454_p873254663811"></a>Yes</p>
</td>
<td class="cellrowborder" valign="top" width="53.375337533753374%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0222861454_p77323464385"><a name="en-us_topic_0222861454_p77323464385"></a><a name="en-us_topic_0222861454_p77323464385"></a>Specifies the type of the file system used by a container. This parameter must be set to <strong id="en-us_topic_0222861454_b1637217270154"><a name="en-us_topic_0222861454_b1637217270154"></a><a name="en-us_topic_0222861454_b1637217270154"></a>ext4</strong>, that is, <strong id="en-us_topic_0222861454_b13531152516157"><a name="en-us_topic_0222861454_b13531152516157"></a><a name="en-us_topic_0222861454_b13531152516157"></a>dm.fs=ext4</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0222861454_row319112198385"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0222861454_p773244619383"><a name="en-us_topic_0222861454_p773244619383"></a><a name="en-us_topic_0222861454_p773244619383"></a>dm.basesize</p>
</td>
<td class="cellrowborder" valign="top" width="13.29132913291329%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0222861454_p873294673819"><a name="en-us_topic_0222861454_p873294673819"></a><a name="en-us_topic_0222861454_p873294673819"></a>No</p>
</td>
<td class="cellrowborder" valign="top" width="53.375337533753374%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0222861454_p2732194610387"><a name="en-us_topic_0222861454_p2732194610387"></a><a name="en-us_topic_0222861454_p2732194610387"></a>Specifies the maximum storage space of a single container. The unit can be <strong id="en-us_topic_0222861454_b321491151614"><a name="en-us_topic_0222861454_b321491151614"></a><a name="en-us_topic_0222861454_b321491151614"></a>k</strong>, <strong id="en-us_topic_0222861454_b91241136161"><a name="en-us_topic_0222861454_b91241136161"></a><a name="en-us_topic_0222861454_b91241136161"></a>m</strong>, <strong id="en-us_topic_0222861454_b202115161619"><a name="en-us_topic_0222861454_b202115161619"></a><a name="en-us_topic_0222861454_b202115161619"></a>g</strong>, <strong id="en-us_topic_0222861454_b672476111612"><a name="en-us_topic_0222861454_b672476111612"></a><a name="en-us_topic_0222861454_b672476111612"></a>t</strong>, or <strong id="en-us_topic_0222861454_b1837212819160"><a name="en-us_topic_0222861454_b1837212819160"></a><a name="en-us_topic_0222861454_b1837212819160"></a>p</strong>. An uppercase letter can also be used, for example, <strong id="en-us_topic_0222861454_b16214346181515"><a name="en-us_topic_0222861454_b16214346181515"></a><a name="en-us_topic_0222861454_b16214346181515"></a>dm.basesize=50G</strong>. This parameter is valid only during the first initialization.</p>
</td>
</tr>
<tr id="en-us_topic_0222861454_row12191151913384"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0222861454_p19732154663818"><a name="en-us_topic_0222861454_p19732154663818"></a><a name="en-us_topic_0222861454_p19732154663818"></a>dm.mkfsarg</p>
</td>
<td class="cellrowborder" valign="top" width="13.29132913291329%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0222861454_p97321246123819"><a name="en-us_topic_0222861454_p97321246123819"></a><a name="en-us_topic_0222861454_p97321246123819"></a>No</p>
</td>
<td class="cellrowborder" valign="top" width="53.375337533753374%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0222861454_p147321246123818"><a name="en-us_topic_0222861454_p147321246123818"></a><a name="en-us_topic_0222861454_p147321246123818"></a>Specifies the additional <strong id="en-us_topic_0222861454_b771563571912"><a name="en-us_topic_0222861454_b771563571912"></a><a name="en-us_topic_0222861454_b771563571912"></a>mkfs</strong> parameters when a basic device is created. For example: <strong id="en-us_topic_0222861454_b9396154215178"><a name="en-us_topic_0222861454_b9396154215178"></a><a name="en-us_topic_0222861454_b9396154215178"></a>dm.mkfsarg=-O ^has_journal</strong></p>
</td>
</tr>
<tr id="en-us_topic_0222861454_row1919116199380"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0222861454_p1373284611381"><a name="en-us_topic_0222861454_p1373284611381"></a><a name="en-us_topic_0222861454_p1373284611381"></a>dm.mountopt</p>
</td>
<td class="cellrowborder" valign="top" width="13.29132913291329%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0222861454_p157321246183816"><a name="en-us_topic_0222861454_p157321246183816"></a><a name="en-us_topic_0222861454_p157321246183816"></a>No</p>
</td>
<td class="cellrowborder" valign="top" width="53.375337533753374%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0222861454_p14732164623818"><a name="en-us_topic_0222861454_p14732164623818"></a><a name="en-us_topic_0222861454_p14732164623818"></a>Specifies additional <strong id="en-us_topic_0222861454_b12251135471913"><a name="en-us_topic_0222861454_b12251135471913"></a><a name="en-us_topic_0222861454_b12251135471913"></a>mount</strong> parameters when a container is mounted. For example: <strong id="en-us_topic_0222861454_b1849315291710"><a name="en-us_topic_0222861454_b1849315291710"></a><a name="en-us_topic_0222861454_b1849315291710"></a>dm.mountopt=nodiscard</strong></p>
</td>
</tr>
<tr id="en-us_topic_0222861454_row0191719163817"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0222861454_p8732746193819"><a name="en-us_topic_0222861454_p8732746193819"></a><a name="en-us_topic_0222861454_p8732746193819"></a>dm.thinpooldev</p>
</td>
<td class="cellrowborder" valign="top" width="13.29132913291329%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0222861454_p4732646183815"><a name="en-us_topic_0222861454_p4732646183815"></a><a name="en-us_topic_0222861454_p4732646183815"></a>No</p>
</td>
<td class="cellrowborder" valign="top" width="53.375337533753374%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0222861454_p157325468382"><a name="en-us_topic_0222861454_p157325468382"></a><a name="en-us_topic_0222861454_p157325468382"></a>Specifies the thinpool device used for container or image storage.</p>
</td>
</tr>
<tr id="en-us_topic_0222861454_row619161915388"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0222861454_p1373214466389"><a name="en-us_topic_0222861454_p1373214466389"></a><a name="en-us_topic_0222861454_p1373214466389"></a>dm.min_free_space</p>
</td>
<td class="cellrowborder" valign="top" width="13.29132913291329%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0222861454_p6733346153810"><a name="en-us_topic_0222861454_p6733346153810"></a><a name="en-us_topic_0222861454_p6733346153810"></a>No</p>
</td>
<td class="cellrowborder" valign="top" width="53.375337533753374%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0222861454_p1273384653817"><a name="en-us_topic_0222861454_p1273384653817"></a><a name="en-us_topic_0222861454_p1273384653817"></a>Specifies minimum percentage of reserved space. For example, <strong id="en-us_topic_0222861454_b1577902471920"><a name="en-us_topic_0222861454_b1577902471920"></a><a name="en-us_topic_0222861454_b1577902471920"></a>dm.min_free_space=10%</strong> indicates that storage-related operations such as container creation will fail when the remaining storage space falls below 10%.</p>
</td>
</tr>
</tbody>
</table>

#### Precautions

-   When configuring devicemapper, if the system does not have sufficient space for automatic capacity expansion of thinpool, disable the automatic capacity expansion function.

    To disable automatic capacity expansion, set both  **thin\_pool\_autoextend\_threshold**  and  **thin\_pool\_autoextend\_percent**  in the  **/etc/lvm/profile/isula-thinpool.profile**  file to  **100**.

    ```
    activation {   
      thin_pool_autoextend_threshold=100   
      thin_pool_autoextend_percent=100 
    }
    ```

-   When devicemapper is used, use Ext4 as the container file system. You need to add  **--storage-opt dm.fs=ext4**  to the iSulad configuration parameters.
-   If graphdriver is devicemapper and the metadata files are damaged and cannot be restored, you need to manually restore the metadata files. Do not directly operate or tamper with metadata of the devicemapper storage driver in Docker daemon.
-   When the devicemapper LVM is used, if the devicemapper thinpool is damaged due to abnormal power-off, you cannot ensure the data integrity or whether the damaged thinpool can be restored. Therefore, you need to rebuild the thinpool.

**Precautions for Switching the devicemapper Storage Pool When the User Namespace Feature Is Enabled on iSula**

-   Generally, the path of the deviceset-metadata file is  **/var/lib/isulad/devicemapper/metadata/deviceset-metadata**  during container startup.
-   If user namespaces are used, the path of the deviceset-metadata file is  **/var/lib/isulad/**_userNSUID.GID_**/devicemapper/metadata/deviceset-metadata**.
-   When you use the devicemapper storage driver and the container is switched between the user namespace scenario and common scenario, the  **BaseDeviceUUID**  content in the corresponding deviceset-metadata file needs to be cleared. In the thinpool capacity expansion or rebuild scenario, you also need to clear the  **BaseDeviceUUID**  content in the deviceset-metadata file. Otherwise, the iSulad service fails to be restarted.

