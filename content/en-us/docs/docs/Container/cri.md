# CRI

- [CRI](#cri)
    - [Description](#description)
    - [APIs](#apis)
        - [Runtime Service](#runtime-service)
            - [RunPodSandbox](#runpodsandbox)
            - [StopPodSandbox](#stoppodsandbox)
            - [RemovePodSandbox](#removepodsandbox)
            - [PodSandboxStatus](#podsandboxstatus)
            - [ListPodSandbox](#listpodsandbox)
            - [CreateContainer](#createcontainer)
            - [StartContainer](#startcontainer)
            - [StopContainer](#stopcontainer)
            - [RemoveContainer](#removecontainer)
            - [ListContainers](#listcontainers)
            - [ContainerStatus](#containerstatus)
            - [UpdateContainerResources](#updatecontainerresources)
            - [ExecSync](#execsync)
            - [Exec](#exec)
            - [Attach](#attach)
            - [ContainerStats](#containerstats)
            - [ListContainerStats](#listcontainerstats)
            - [UpdateRuntimeConfig](#updateruntimeconfig)
            - [Status](#status)
        - [Image Service](#image-service)
            - [ListImages](#listimages)
            - [ImageStatus](#imagestatus)
            - [PullImage](#pullimage)
            - [RemoveImage](#removeimage)
            - [ImageFsInfo](#imagefsinfo)
    - [Constraints](#constraints-2)


## Description

The Container Runtime Interface \(CRI\) provided by Kubernetes defines container and image service APIs. iSulad uses the CRI to interconnect with Kubernetes.

Since the container runtime is isolated from the image lifecycle, two services need to be defined. This API is defined by using  [Protocol Buffer](https://developers.google.com/protocol-buffers/)  based on  [gRPC](https://grpc.io/).

The current CRI version is v1alpha1. For official API description, access the following link:

[https://github.com/kubernetes/kubernetes/blob/release-1.14/pkg/kubelet/apis/cri/runtime/v1alpha2/api.proto](https://github.com/kubernetes/kubernetes/blob/release-1.14/pkg/kubelet/apis/cri/runtime/v1alpha2/api.proto)

iSulad uses the API description file of version 1.14 used by Pass, which is slightly different from the official API description file. API description in this document prevails.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>The listening IP address of the CRI WebSocket streaming service is  **127.0.0.1**  and the port number is  **10350**. The port number can be configured in the  **--websocket-server-listening-port**  command or in the  **daemon.json**  configuration file.  

## APIs

The following tables list the parameters that may be used in each API. Some parameters do not take effect now, which have been noted in the corresponding parameter description.

### API Parameters

-   **DNSConfig**

    The API is used to configure DNS servers and search domains of a sandbox.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row7754658145911"><th class="cellrowborder" valign="top" width="39.44%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p9277611209"><a name="en-us_topic_0182207110_p9277611209"></a><a name="en-us_topic_0182207110_p9277611209"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="60.56%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p1927713119014"><a name="en-us_topic_0182207110_p1927713119014"></a><a name="en-us_topic_0182207110_p1927713119014"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row107541958115912"><td class="cellrowborder" valign="top" width="39.44%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p12277181104"><a name="en-us_topic_0182207110_p12277181104"></a><a name="en-us_topic_0182207110_p12277181104"></a>repeated string servers</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.56%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p17277911402"><a name="en-us_topic_0182207110_p17277911402"></a><a name="en-us_topic_0182207110_p17277911402"></a>DNS server list of a cluster.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row175415814599"><td class="cellrowborder" valign="top" width="39.44%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p182771218017"><a name="en-us_topic_0182207110_p182771218017"></a><a name="en-us_topic_0182207110_p182771218017"></a>repeated string searches</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.56%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p02781014017"><a name="en-us_topic_0182207110_p02781014017"></a><a name="en-us_topic_0182207110_p02781014017"></a>DNS search domain list of a cluster.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row147541558205912"><td class="cellrowborder" valign="top" width="39.44%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p927810116019"><a name="en-us_topic_0182207110_p927810116019"></a><a name="en-us_topic_0182207110_p927810116019"></a>repeated string options</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.56%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p92781615013"><a name="en-us_topic_0182207110_p92781615013"></a><a name="en-us_topic_0182207110_p92781615013"></a>DNS option list. For details, see <a href="https://linux.die.net/man/5/resolv.conf" target="_blank" rel="noopener noreferrer">https://linux.die.net/man/5/resolv.conf</a>.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **Protocol**

    The API is used to specify enum values of protocols.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row1775211308012"><th class="cellrowborder" valign="top" width="39.35%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p18470133608"><a name="en-us_topic_0182207110_p18470133608"></a><a name="en-us_topic_0182207110_p18470133608"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="60.650000000000006%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p147011336020"><a name="en-us_topic_0182207110_p147011336020"></a><a name="en-us_topic_0182207110_p147011336020"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row127528301605"><td class="cellrowborder" valign="top" width="39.35%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p14707331901"><a name="en-us_topic_0182207110_p14707331901"></a><a name="en-us_topic_0182207110_p14707331901"></a>TCP = 0↵</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.650000000000006%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p3470833904"><a name="en-us_topic_0182207110_p3470833904"></a><a name="en-us_topic_0182207110_p3470833904"></a>Transmission Control Protocol (TCP).</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row6752193015019"><td class="cellrowborder" valign="top" width="39.35%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p24701933605"><a name="en-us_topic_0182207110_p24701933605"></a><a name="en-us_topic_0182207110_p24701933605"></a>UDP = 1</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.650000000000006%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p04701338015"><a name="en-us_topic_0182207110_p04701338015"></a><a name="en-us_topic_0182207110_p04701338015"></a>User Datagram Protocol (UDP).</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **PortMapping**

    The API is used to configure the port mapping for a sandbox.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row1984119591804"><th class="cellrowborder" valign="top" width="39.53%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p522410161117"><a name="en-us_topic_0182207110_p522410161117"></a><a name="en-us_topic_0182207110_p522410161117"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="60.47%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p1224716710"><a name="en-us_topic_0182207110_p1224716710"></a><a name="en-us_topic_0182207110_p1224716710"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row7841125911011"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1422414164111"><a name="en-us_topic_0182207110_p1422414164111"></a><a name="en-us_topic_0182207110_p1422414164111"></a><a href="#en-us_topic_0182207110_li191811740184215">Protocol</a> protocol</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1822471610113"><a name="en-us_topic_0182207110_p1822471610113"></a><a name="en-us_topic_0182207110_p1822471610113"></a>Protocol used for port mapping.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row118418594010"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p172246161315"><a name="en-us_topic_0182207110_p172246161315"></a><a name="en-us_topic_0182207110_p172246161315"></a>int32 container_port</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1022410163114"><a name="en-us_topic_0182207110_p1022410163114"></a><a name="en-us_topic_0182207110_p1022410163114"></a>Port number in the container.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row158413591308"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p32241416814"><a name="en-us_topic_0182207110_p32241416814"></a><a name="en-us_topic_0182207110_p32241416814"></a>int32 host_port</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1522481618111"><a name="en-us_topic_0182207110_p1522481618111"></a><a name="en-us_topic_0182207110_p1522481618111"></a>Port number on the host.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row18841195913010"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p192256164116"><a name="en-us_topic_0182207110_p192256164116"></a><a name="en-us_topic_0182207110_p192256164116"></a>string host_ip</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p32251616717"><a name="en-us_topic_0182207110_p32251616717"></a><a name="en-us_topic_0182207110_p32251616717"></a>Host IP address.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **MountPropagation**

    The API is used to specify enums of mount propagation attributes.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row19276183217111"><th class="cellrowborder" valign="top" width="39.53%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p1438363819110"><a name="en-us_topic_0182207110_p1438363819110"></a><a name="en-us_topic_0182207110_p1438363819110"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="60.47%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p538314381119"><a name="en-us_topic_0182207110_p538314381119"></a><a name="en-us_topic_0182207110_p538314381119"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row92761932719"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p73843384118"><a name="en-us_topic_0182207110_p73843384118"></a><a name="en-us_topic_0182207110_p73843384118"></a>PROPAGATION_PRIVATE = 0</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p438419385115"><a name="en-us_topic_0182207110_p438419385115"></a><a name="en-us_topic_0182207110_p438419385115"></a>No mount propagation attributes, that is, private in Linux.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row827615321111"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1384138718"><a name="en-us_topic_0182207110_p1384138718"></a><a name="en-us_topic_0182207110_p1384138718"></a>PROPAGATION_HOST_TO_CONTAINER = 1</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p63841381115"><a name="en-us_topic_0182207110_p63841381115"></a><a name="en-us_topic_0182207110_p63841381115"></a>Mount attribute that can be propagated from the host to the container, that is, rslave in Linux.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row52761232617"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p13848383118"><a name="en-us_topic_0182207110_p13848383118"></a><a name="en-us_topic_0182207110_p13848383118"></a>PROPAGATION_BIDIRECTIONAL = 2</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1938419381917"><a name="en-us_topic_0182207110_p1938419381917"></a><a name="en-us_topic_0182207110_p1938419381917"></a>Mount attribute that can be propagated between a host and a container, that is, rshared in Linux.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **Mount**

    The API is used to mount a volume on the host to a container. \(Only files and folders are supported.\)

    <table><thead align="left"><tr id="en-us_topic_0182207110_row181661364558"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p2818191920"><a name="en-us_topic_0182207110_p2818191920"></a><a name="en-us_topic_0182207110_p2818191920"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p1181119422"><a name="en-us_topic_0182207110_p1181119422"></a><a name="en-us_topic_0182207110_p1181119422"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row191661036185516"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p416653615515"><a name="en-us_topic_0182207110_p416653615515"></a><a name="en-us_topic_0182207110_p416653615515"></a>string container_path</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p111661536135511"><a name="en-us_topic_0182207110_p111661536135511"></a><a name="en-us_topic_0182207110_p111661536135511"></a>Path in the container.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row3166153612558"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p91664365556"><a name="en-us_topic_0182207110_p91664365556"></a><a name="en-us_topic_0182207110_p91664365556"></a>string host_path</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p41666362552"><a name="en-us_topic_0182207110_p41666362552"></a><a name="en-us_topic_0182207110_p41666362552"></a>Path on the host.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row14166173675512"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p12166113655516"><a name="en-us_topic_0182207110_p12166113655516"></a><a name="en-us_topic_0182207110_p12166113655516"></a>bool readonly</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1316663613554"><a name="en-us_topic_0182207110_p1316663613554"></a><a name="en-us_topic_0182207110_p1316663613554"></a>Whether the configuration is read-only in the container.</p>
    <p id="en-us_topic_0182207110_p0270133611449"><a name="en-us_topic_0182207110_p0270133611449"></a><a name="en-us_topic_0182207110_p0270133611449"></a>Default value: <strong id="en-us_topic_0182207110_b1766415511437"><a name="en-us_topic_0182207110_b1766415511437"></a><a name="en-us_topic_0182207110_b1766415511437"></a>false</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row0166183620554"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p10166103615519"><a name="en-us_topic_0182207110_p10166103615519"></a><a name="en-us_topic_0182207110_p10166103615519"></a>bool selinux_relabel</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p15166143619556"><a name="en-us_topic_0182207110_p15166143619556"></a><a name="en-us_topic_0182207110_p15166143619556"></a>Whether to set the SELinux label. This parameter does not take effect now.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row11991253929"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p149911453626"><a name="en-us_topic_0182207110_p149911453626"></a><a name="en-us_topic_0182207110_p149911453626"></a><a href="#en-us_topic_0182207110_li201899371871">MountPropagation</a> propagation</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p7395173011490"><a name="en-us_topic_0182207110_p7395173011490"></a><a name="en-us_topic_0182207110_p7395173011490"></a>Mount propagation attribute.</p>
    <p id="en-us_topic_0182207110_p4261433204915"><a name="en-us_topic_0182207110_p4261433204915"></a><a name="en-us_topic_0182207110_p4261433204915"></a>The value can be <strong id="en-us_topic_0182207110_b277173219502"><a name="en-us_topic_0182207110_b277173219502"></a><a name="en-us_topic_0182207110_b277173219502"></a>0</strong>, <strong id="en-us_topic_0182207110_b1442483795012"><a name="en-us_topic_0182207110_b1442483795012"></a><a name="en-us_topic_0182207110_b1442483795012"></a>1</strong>, or <strong id="en-us_topic_0182207110_b043314418509"><a name="en-us_topic_0182207110_b043314418509"></a><a name="en-us_topic_0182207110_b043314418509"></a>2</strong>, corresponding to the private, rslave, and rshared propagation attributes respectively.</p>
    <p id="en-us_topic_0182207110_p599245312212"><a name="en-us_topic_0182207110_p599245312212"></a><a name="en-us_topic_0182207110_p599245312212"></a>Default value: <strong id="en-us_topic_0182207110_b073195718498"><a name="en-us_topic_0182207110_b073195718498"></a><a name="en-us_topic_0182207110_b073195718498"></a>0</strong></p>
    </td>
    </tr>
    </tbody>
    </table>


-   **NamespaceOption**

    <table><thead align="left"><tr id="en-us_topic_0182207110_row320210420420"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p3202142345"><a name="en-us_topic_0182207110_p3202142345"></a><a name="en-us_topic_0182207110_p3202142345"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p192039421544"><a name="en-us_topic_0182207110_p192039421544"></a><a name="en-us_topic_0182207110_p192039421544"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row12032421840"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p4203942245"><a name="en-us_topic_0182207110_p4203942245"></a><a name="en-us_topic_0182207110_p4203942245"></a>bool host_network</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1420374210411"><a name="en-us_topic_0182207110_p1420374210411"></a><a name="en-us_topic_0182207110_p1420374210411"></a>Whether to use host network namespaces.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row132037421842"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p520312421344"><a name="en-us_topic_0182207110_p520312421344"></a><a name="en-us_topic_0182207110_p520312421344"></a>bool host_pid</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p17203194215418"><a name="en-us_topic_0182207110_p17203194215418"></a><a name="en-us_topic_0182207110_p17203194215418"></a>Whether to use host PID namespaces.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1320315420416"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p620344217419"><a name="en-us_topic_0182207110_p620344217419"></a><a name="en-us_topic_0182207110_p620344217419"></a>bool host_ipc</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p12049428416"><a name="en-us_topic_0182207110_p12049428416"></a><a name="en-us_topic_0182207110_p12049428416"></a>Whether to use host IPC namespaces.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **Capability**

    This API is used to specify the capabilities to be added and deleted.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row1642837164314"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p12642737104318"><a name="en-us_topic_0182207110_p12642737104318"></a><a name="en-us_topic_0182207110_p12642737104318"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p1642193713437"><a name="en-us_topic_0182207110_p1642193713437"></a><a name="en-us_topic_0182207110_p1642193713437"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row86421337144310"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1855613286710"><a name="en-us_topic_0182207110_p1855613286710"></a><a name="en-us_topic_0182207110_p1855613286710"></a>repeated string add_capabilities</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p199319241760"><a name="en-us_topic_0182207110_p199319241760"></a><a name="en-us_topic_0182207110_p199319241760"></a>Capabilities to be added.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row5642103716437"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p3664193316710"><a name="en-us_topic_0182207110_p3664193316710"></a><a name="en-us_topic_0182207110_p3664193316710"></a>repeated string drop_capabilities</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p5492190683"><a name="en-us_topic_0182207110_p5492190683"></a><a name="en-us_topic_0182207110_p5492190683"></a>Capabilities to be deleted.</p>
    </td>
    </tr>
    </tbody>
    </table>


-   **Int64Value**

    The API is used to encapsulate data of the signed 64-bit integer type.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row1157618341465"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p457610342062"><a name="en-us_topic_0182207110_p457610342062"></a><a name="en-us_topic_0182207110_p457610342062"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p185762341468"><a name="en-us_topic_0182207110_p185762341468"></a><a name="en-us_topic_0182207110_p185762341468"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row357619342066"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p15763341367"><a name="en-us_topic_0182207110_p15763341367"></a><a name="en-us_topic_0182207110_p15763341367"></a>int64 value</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p175761534163"><a name="en-us_topic_0182207110_p175761534163"></a><a name="en-us_topic_0182207110_p175761534163"></a>Actual value of the signed 64-bit integer type.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **UInt64Value**

    The API is used to encapsulate data of the unsigned 64-bit integer type.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row1486419572459"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p886515724519"><a name="en-us_topic_0182207110_p886515724519"></a><a name="en-us_topic_0182207110_p886515724519"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p11865155764517"><a name="en-us_topic_0182207110_p11865155764517"></a><a name="en-us_topic_0182207110_p11865155764517"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row10865185718453"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p8865145713455"><a name="en-us_topic_0182207110_p8865145713455"></a><a name="en-us_topic_0182207110_p8865145713455"></a>uint64 value</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1486535720450"><a name="en-us_topic_0182207110_p1486535720450"></a><a name="en-us_topic_0182207110_p1486535720450"></a>Actual value of the unsigned 64-bit integer type.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **LinuxSandboxSecurityContext**

    The API is used to configure the Linux security options of a sandbox.

    Note that these security options are not applied to containers in the sandbox, and may not be applied to the sandbox without any running process.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row4877204012718"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p28767401717"><a name="en-us_topic_0182207110_p28767401717"></a><a name="en-us_topic_0182207110_p28767401717"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p78769403714"><a name="en-us_topic_0182207110_p78769403714"></a><a name="en-us_topic_0182207110_p78769403714"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row118771840376"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p11877640872"><a name="en-us_topic_0182207110_p11877640872"></a><a name="en-us_topic_0182207110_p11877640872"></a><a href="#en-us_topic_0182207110_li1182444614213">NamespaceOption</a> namespace_options</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p13877740478"><a name="en-us_topic_0182207110_p13877740478"></a><a name="en-us_topic_0182207110_p13877740478"></a>Sandbox namespace options.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row98772404713"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p387710401719"><a name="en-us_topic_0182207110_p387710401719"></a><a name="en-us_topic_0182207110_p387710401719"></a><a href="#en-us_topic_0182207110_li816815620237">SELinuxOption</a> selinux_options</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p7877540971"><a name="en-us_topic_0182207110_p7877540971"></a><a name="en-us_topic_0182207110_p7877540971"></a>SELinux options. This parameter does not take effect now.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row7877240376"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p687715407712"><a name="en-us_topic_0182207110_p687715407712"></a><a name="en-us_topic_0182207110_p687715407712"></a><a href="#en-us_topic_0182207110_li1439643415372">Int64Value</a> run_as_user</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p188771240477"><a name="en-us_topic_0182207110_p188771240477"></a><a name="en-us_topic_0182207110_p188771240477"></a>Process UID in the sandbox.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1187704010713"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p5877440378"><a name="en-us_topic_0182207110_p5877440378"></a><a name="en-us_topic_0182207110_p5877440378"></a>bool readonly_rootfs</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p087784016717"><a name="en-us_topic_0182207110_p087784016717"></a><a name="en-us_topic_0182207110_p087784016717"></a>Whether the root file system of the sandbox is read-only.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row6878840272"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p4877194019716"><a name="en-us_topic_0182207110_p4877194019716"></a><a name="en-us_topic_0182207110_p4877194019716"></a>repeated int64 supplemental_groups</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1487715403711"><a name="en-us_topic_0182207110_p1487715403711"></a><a name="en-us_topic_0182207110_p1487715403711"></a>Information of the user group of the init process in the sandbox (except the primary GID).</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row198781840073"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p138781401678"><a name="en-us_topic_0182207110_p138781401678"></a><a name="en-us_topic_0182207110_p138781401678"></a>bool privileged</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p48781440679"><a name="en-us_topic_0182207110_p48781440679"></a><a name="en-us_topic_0182207110_p48781440679"></a>Whether the sandbox is a privileged container.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row11878104014717"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1387814405720"><a name="en-us_topic_0182207110_p1387814405720"></a><a name="en-us_topic_0182207110_p1387814405720"></a>string seccomp_profile_path</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p98781640778"><a name="en-us_topic_0182207110_p98781640778"></a><a name="en-us_topic_0182207110_p98781640778"></a>Path of the seccomp configuration file. Valid values are as follows:</p>
    <p id="en-us_topic_0182207110_p852815536173"><a name="en-us_topic_0182207110_p852815536173"></a><a name="en-us_topic_0182207110_p852815536173"></a><strong id="en-us_topic_0182207110_b16881149142619"><a name="en-us_topic_0182207110_b16881149142619"></a><a name="en-us_topic_0182207110_b16881149142619"></a>// unconfined</strong>: Seccomp is not configured.</p>
    <p id="en-us_topic_0182207110_p3202192819180"><a name="en-us_topic_0182207110_p3202192819180"></a><a name="en-us_topic_0182207110_p3202192819180"></a><strong id="en-us_topic_0182207110_b57141534152711"><a name="en-us_topic_0182207110_b57141534152711"></a><a name="en-us_topic_0182207110_b57141534152711"></a>// localhost/ </strong><em id="en-us_topic_0182207110_i1121723618277"><a name="en-us_topic_0182207110_i1121723618277"></a><a name="en-us_topic_0182207110_i1121723618277"></a>Full path of the configuration file</em>: configuration file path installed in the system.</p>
    <p id="en-us_topic_0182207110_p1782797191914"><a name="en-us_topic_0182207110_p1782797191914"></a><a name="en-us_topic_0182207110_p1782797191914"></a><strong id="en-us_topic_0182207110_b148041657163219"><a name="en-us_topic_0182207110_b148041657163219"></a><a name="en-us_topic_0182207110_b148041657163219"></a>// </strong><em id="en-us_topic_0182207110_i798535823210"><a name="en-us_topic_0182207110_i798535823210"></a><a name="en-us_topic_0182207110_i798535823210"></a>Full path of the configuration file</em>: full path of the configuration file.</p>
    <p id="en-us_topic_0182207110_p1961983781914"><a name="en-us_topic_0182207110_p1961983781914"></a><a name="en-us_topic_0182207110_p1961983781914"></a><strong id="en-us_topic_0182207110_b174761112346"><a name="en-us_topic_0182207110_b174761112346"></a><a name="en-us_topic_0182207110_b174761112346"></a>// unconfined</strong> is the default value.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **LinuxPodSandboxConfig**

    The API is used to configure information related to the Linux host and containers.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row4476193722115"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p1847623722112"><a name="en-us_topic_0182207110_p1847623722112"></a><a name="en-us_topic_0182207110_p1847623722112"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p204761337192110"><a name="en-us_topic_0182207110_p204761337192110"></a><a name="en-us_topic_0182207110_p204761337192110"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row247603713217"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p147623720214"><a name="en-us_topic_0182207110_p147623720214"></a><a name="en-us_topic_0182207110_p147623720214"></a>string cgroup_parent</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p941145220242"><a name="en-us_topic_0182207110_p941145220242"></a><a name="en-us_topic_0182207110_p941145220242"></a>Parent path of the cgroup of the sandbox. The runtime can use the cgroupfs or systemd syntax based on site requirements. This parameter does not take effect now.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1647613752112"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1147613371218"><a name="en-us_topic_0182207110_p1147613371218"></a><a name="en-us_topic_0182207110_p1147613371218"></a><a href="#en-us_topic_0182207110_li20215550104713">LinuxSandboxSecurityContext</a>  security_context</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p54765378217"><a name="en-us_topic_0182207110_p54765378217"></a><a name="en-us_topic_0182207110_p54765378217"></a>Security attribute of the sandbox.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row10476637152114"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p3476113782112"><a name="en-us_topic_0182207110_p3476113782112"></a><a name="en-us_topic_0182207110_p3476113782112"></a>map&lt;string, string&gt; sysctls</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p5476163716217"><a name="en-us_topic_0182207110_p5476163716217"></a><a name="en-us_topic_0182207110_p5476163716217"></a>Linux sysctls configuration of the sandbox.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **PodSandboxMetadata**

    Sandbox metadata contains all information that constructs a sandbox name. It is recommended that the metadata be displayed on the user interface during container running to improve user experience. For example, a unique sandbox name can be generated based on the metadata during running.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row1040017392290"><th class="cellrowborder" valign="top" width="40.52%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p19400339132913"><a name="en-us_topic_0182207110_p19400339132913"></a><a name="en-us_topic_0182207110_p19400339132913"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.48%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p1040013932916"><a name="en-us_topic_0182207110_p1040013932916"></a><a name="en-us_topic_0182207110_p1040013932916"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row164012392296"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1240016398298"><a name="en-us_topic_0182207110_p1240016398298"></a><a name="en-us_topic_0182207110_p1240016398298"></a>string name</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p184001139192918"><a name="en-us_topic_0182207110_p184001139192918"></a><a name="en-us_topic_0182207110_p184001139192918"></a>Sandbox name.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row16401739152913"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p164010395299"><a name="en-us_topic_0182207110_p164010395299"></a><a name="en-us_topic_0182207110_p164010395299"></a>string uid</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p18401183917297"><a name="en-us_topic_0182207110_p18401183917297"></a><a name="en-us_topic_0182207110_p18401183917297"></a>Sandbox UID.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row5401143962911"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p7560134312404"><a name="en-us_topic_0182207110_p7560134312404"></a><a name="en-us_topic_0182207110_p7560134312404"></a>string namespace</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p104011339192911"><a name="en-us_topic_0182207110_p104011339192911"></a><a name="en-us_topic_0182207110_p104011339192911"></a>Sandbox namespace.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row16402739152910"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p386824574014"><a name="en-us_topic_0182207110_p386824574014"></a><a name="en-us_topic_0182207110_p386824574014"></a>uint32 attempt</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p811012444216"><a name="en-us_topic_0182207110_p811012444216"></a><a name="en-us_topic_0182207110_p811012444216"></a>Number of attempts to create a sandbox.</p>
    <p id="en-us_topic_0182207110_p382914359214"><a name="en-us_topic_0182207110_p382914359214"></a><a name="en-us_topic_0182207110_p382914359214"></a>Default value: <strong id="en-us_topic_0182207110_b144101563210"><a name="en-us_topic_0182207110_b144101563210"></a><a name="en-us_topic_0182207110_b144101563210"></a>0</strong></p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **PodSandboxConfig**

    This API is used to specify all mandatory and optional configurations for creating a sandbox.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row95191149114319"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p195191949164311"><a name="en-us_topic_0182207110_p195191949164311"></a><a name="en-us_topic_0182207110_p195191949164311"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p1051964913437"><a name="en-us_topic_0182207110_p1051964913437"></a><a name="en-us_topic_0182207110_p1051964913437"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row1052013496432"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p185209491435"><a name="en-us_topic_0182207110_p185209491435"></a><a name="en-us_topic_0182207110_p185209491435"></a><a href="#en-us_topic_0182207110_li2359918134912">PodSandboxMetadata</a> metadata</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p7520124913433"><a name="en-us_topic_0182207110_p7520124913433"></a><a name="en-us_topic_0182207110_p7520124913433"></a>Sandbox metadata, which uniquely identifies a sandbox. The runtime must use the information to ensure that operations are correctly performed, and to improve user experience, for example, construct a readable sandbox name.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row0520184910433"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1952054984318"><a name="en-us_topic_0182207110_p1952054984318"></a><a name="en-us_topic_0182207110_p1952054984318"></a>string hostname</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1852014490439"><a name="en-us_topic_0182207110_p1852014490439"></a><a name="en-us_topic_0182207110_p1852014490439"></a>Host name of the sandbox.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row752054964310"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p752084964310"><a name="en-us_topic_0182207110_p752084964310"></a><a name="en-us_topic_0182207110_p752084964310"></a>string log_directory</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p6520134915434"><a name="en-us_topic_0182207110_p6520134915434"></a><a name="en-us_topic_0182207110_p6520134915434"></a>Folder for storing container log files in the sandbox.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row5520134934312"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p18520204919431"><a name="en-us_topic_0182207110_p18520204919431"></a><a name="en-us_topic_0182207110_p18520204919431"></a><a href="#en-us_topic_0182207110_li1197211439388">DNSConfig</a> dns_config</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p452004954314"><a name="en-us_topic_0182207110_p452004954314"></a><a name="en-us_topic_0182207110_p452004954314"></a>Sandbox DNS configuration.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row175201049134319"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p952034984311"><a name="en-us_topic_0182207110_p952034984311"></a><a name="en-us_topic_0182207110_p952034984311"></a>repeated <a href="#en-us_topic_0182207110_li01684174215">PortMapping</a> port_mappings</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p252012494432"><a name="en-us_topic_0182207110_p252012494432"></a><a name="en-us_topic_0182207110_p252012494432"></a>Sandbox port mapping.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row6521134934310"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1452117499433"><a name="en-us_topic_0182207110_p1452117499433"></a><a name="en-us_topic_0182207110_p1452117499433"></a>map&lt;string, string&gt; labels</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p18521174913434"><a name="en-us_topic_0182207110_p18521174913434"></a><a name="en-us_topic_0182207110_p18521174913434"></a>Key-value pair that can be used to identify a sandbox or a series of sandboxes.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row19521114914313"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p752114919435"><a name="en-us_topic_0182207110_p752114919435"></a><a name="en-us_topic_0182207110_p752114919435"></a>map&lt;string, string&gt; annotations</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p852174916439"><a name="en-us_topic_0182207110_p852174916439"></a><a name="en-us_topic_0182207110_p852174916439"></a>Key-value pair that stores any information, whose values cannot be changed and can be queried by using the <a href="#en-us_topic_0182207110_li146986172010">PodSandboxStatus</a> API.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row2521149164318"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p752114904318"><a name="en-us_topic_0182207110_p752114904318"></a><a name="en-us_topic_0182207110_p752114904318"></a><a href="#en-us_topic_0182207110_li14801654104710">LinuxPodSandboxConfig</a> linux</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1152154954319"><a name="en-us_topic_0182207110_p1152154954319"></a><a name="en-us_topic_0182207110_p1152154954319"></a>Options related to the Linux host.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **PodSandboxNetworkStatus**

    The API is used to describe the network status of a sandbox.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row1426817555712"><th class="cellrowborder" valign="top" width="40.52%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p11268195195715"><a name="en-us_topic_0182207110_p11268195195715"></a><a name="en-us_topic_0182207110_p11268195195715"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.48%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p62682585719"><a name="en-us_topic_0182207110_p62682585719"></a><a name="en-us_topic_0182207110_p62682585719"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row172681054577"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p2268115105719"><a name="en-us_topic_0182207110_p2268115105719"></a><a name="en-us_topic_0182207110_p2268115105719"></a>string ip</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1126875195713"><a name="en-us_topic_0182207110_p1126875195713"></a><a name="en-us_topic_0182207110_p1126875195713"></a>IP address of the sandbox.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row5269185155714"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p17269156575"><a name="en-us_topic_0182207110_p17269156575"></a><a name="en-us_topic_0182207110_p17269156575"></a>string name</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p42699510571"><a name="en-us_topic_0182207110_p42699510571"></a><a name="en-us_topic_0182207110_p42699510571"></a>Network interface name in the sandbox.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row42691252575"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p9269135185718"><a name="en-us_topic_0182207110_p9269135185718"></a><a name="en-us_topic_0182207110_p9269135185718"></a>string network</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p162698595711"><a name="en-us_topic_0182207110_p162698595711"></a><a name="en-us_topic_0182207110_p162698595711"></a>Name of the additional network.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **Namespace**

    The API is used to set namespace options.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row13836123418153"><th class="cellrowborder" valign="top" width="40.52%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p13836113410152"><a name="en-us_topic_0182207110_p13836113410152"></a><a name="en-us_topic_0182207110_p13836113410152"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.48%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p13836163451516"><a name="en-us_topic_0182207110_p13836163451516"></a><a name="en-us_topic_0182207110_p13836163451516"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row1483683416157"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p14679164516152"><a name="en-us_topic_0182207110_p14679164516152"></a><a name="en-us_topic_0182207110_p14679164516152"></a><a href="#en-us_topic_0182207110_li1182444614213">NamespaceOption</a> options</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p3837113415154"><a name="en-us_topic_0182207110_p3837113415154"></a><a name="en-us_topic_0182207110_p3837113415154"></a>Linux namespace options.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **LinuxPodSandboxStatus**

    The API is used to describe the status of a Linux sandbox.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row15118124111716"><th class="cellrowborder" valign="top" width="40.52%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p4118164113179"><a name="en-us_topic_0182207110_p4118164113179"></a><a name="en-us_topic_0182207110_p4118164113179"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.48%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p911817418178"><a name="en-us_topic_0182207110_p911817418178"></a><a name="en-us_topic_0182207110_p911817418178"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row2118164191718"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p311814114176"><a name="en-us_topic_0182207110_p311814114176"></a><a name="en-us_topic_0182207110_p311814114176"></a><a href="#en-us_topic_0182207110_li523062951815">Namespace</a> <strong id="en-us_topic_0182207110_b24393464172"><a name="en-us_topic_0182207110_b24393464172"></a><a name="en-us_topic_0182207110_b24393464172"></a>namespaces</strong></p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p6118541201717"><a name="en-us_topic_0182207110_p6118541201717"></a><a name="en-us_topic_0182207110_p6118541201717"></a>Sandbox namespace.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **PodSandboxState**

    The API is used to specify enum data of the sandbox status values.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row843262417180"><th class="cellrowborder" valign="top" width="40.52%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p94326242187"><a name="en-us_topic_0182207110_p94326242187"></a><a name="en-us_topic_0182207110_p94326242187"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.48%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p1643202481814"><a name="en-us_topic_0182207110_p1643202481814"></a><a name="en-us_topic_0182207110_p1643202481814"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row943216241182"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p19432724181818"><a name="en-us_topic_0182207110_p19432724181818"></a><a name="en-us_topic_0182207110_p19432724181818"></a>SANDBOX_READY = 0</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p114321124161816"><a name="en-us_topic_0182207110_p114321124161816"></a><a name="en-us_topic_0182207110_p114321124161816"></a>The sandbox is ready.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row8935427161820"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p10935102791811"><a name="en-us_topic_0182207110_p10935102791811"></a><a name="en-us_topic_0182207110_p10935102791811"></a>SANDBOX_NOTREADY = 1</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p193562716181"><a name="en-us_topic_0182207110_p193562716181"></a><a name="en-us_topic_0182207110_p193562716181"></a>The sandbox is not ready.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **PodSandboxStatus**

    The API is used to describe the PodSandbox status.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row18525154581911"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p20525645171911"><a name="en-us_topic_0182207110_p20525645171911"></a><a name="en-us_topic_0182207110_p20525645171911"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p195251445151920"><a name="en-us_topic_0182207110_p195251445151920"></a><a name="en-us_topic_0182207110_p195251445151920"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row155258458192"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p65251145201918"><a name="en-us_topic_0182207110_p65251145201918"></a><a name="en-us_topic_0182207110_p65251145201918"></a>string id</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p9525164513192"><a name="en-us_topic_0182207110_p9525164513192"></a><a name="en-us_topic_0182207110_p9525164513192"></a>Sandbox ID.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row452574510197"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p115251145131915"><a name="en-us_topic_0182207110_p115251145131915"></a><a name="en-us_topic_0182207110_p115251145131915"></a><a href="#en-us_topic_0182207110_li2359918134912">PodSandboxMetadata</a> metadata</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p75251945191918"><a name="en-us_topic_0182207110_p75251945191918"></a><a name="en-us_topic_0182207110_p75251945191918"></a>Sandbox metadata.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row6525345181911"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p252644571912"><a name="en-us_topic_0182207110_p252644571912"></a><a name="en-us_topic_0182207110_p252644571912"></a><a href="#en-us_topic_0182207110_li1818214574195">PodSandboxState</a> state</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p65261445151910"><a name="en-us_topic_0182207110_p65261445151910"></a><a name="en-us_topic_0182207110_p65261445151910"></a>Sandbox status value.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row20526045171913"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p15526114515197"><a name="en-us_topic_0182207110_p15526114515197"></a><a name="en-us_topic_0182207110_p15526114515197"></a>int64 created_at</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p14526245171915"><a name="en-us_topic_0182207110_p14526245171915"></a><a name="en-us_topic_0182207110_p14526245171915"></a>Sandbox creation timestamp (unit: ns).</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row17526845121911"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p145261945131915"><a name="en-us_topic_0182207110_p145261945131915"></a><a name="en-us_topic_0182207110_p145261945131915"></a>repeated <a href="#en-us_topic_0182207110_li255017717184">PodSandboxNetworkStatus</a> networks</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1152644581913"><a name="en-us_topic_0182207110_p1152644581913"></a><a name="en-us_topic_0182207110_p1152644581913"></a>Multi-plane network status of the sandbox.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row252694511192"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1452634521914"><a name="en-us_topic_0182207110_p1452634521914"></a><a name="en-us_topic_0182207110_p1452634521914"></a><a href="#en-us_topic_0182207110_li313112151212">LinuxPodSandboxStatus</a> linux</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1752604513197"><a name="en-us_topic_0182207110_p1752604513197"></a><a name="en-us_topic_0182207110_p1752604513197"></a>Sandbox status complying with the Linux specifications.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1652664513193"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1252610459190"><a name="en-us_topic_0182207110_p1252610459190"></a><a name="en-us_topic_0182207110_p1252610459190"></a>map&lt;string, string&gt; labels</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p13526745131918"><a name="en-us_topic_0182207110_p13526745131918"></a><a name="en-us_topic_0182207110_p13526745131918"></a>Key-value pair that can be used to identify a sandbox or a series of sandboxes.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1252694512196"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p195271145191917"><a name="en-us_topic_0182207110_p195271145191917"></a><a name="en-us_topic_0182207110_p195271145191917"></a>map&lt;string, string&gt; annotations</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p14527745191914"><a name="en-us_topic_0182207110_p14527745191914"></a><a name="en-us_topic_0182207110_p14527745191914"></a>Key-value pair that stores any information, whose values cannot be changed by the runtime.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **PodSandboxStateValue**

    The API is used to encapsulate  [PodSandboxState](#en-us_topic_0182207110_li1818214574195).

    <table><thead align="left"><tr id="en-us_topic_0182207110_row1191014692714"><th class="cellrowborder" valign="top" width="40.52%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p09102612717"><a name="en-us_topic_0182207110_p09102612717"></a><a name="en-us_topic_0182207110_p09102612717"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.48%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p1191011682712"><a name="en-us_topic_0182207110_p1191011682712"></a><a name="en-us_topic_0182207110_p1191011682712"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row159111666276"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p791112632711"><a name="en-us_topic_0182207110_p791112632711"></a><a name="en-us_topic_0182207110_p791112632711"></a><a href="#en-us_topic_0182207110_li1818214574195">PodSandboxState</a> state</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p12911166162713"><a name="en-us_topic_0182207110_p12911166162713"></a><a name="en-us_topic_0182207110_p12911166162713"></a>Sandbox status value.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **PodSandboxFilter**

    The API is used to add filter criteria for the sandbox list. The intersection of multiple filter criteria is displayed.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row1167145122810"><th class="cellrowborder" valign="top" width="40.52%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p1167105116289"><a name="en-us_topic_0182207110_p1167105116289"></a><a name="en-us_topic_0182207110_p1167105116289"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.48%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p367115115287"><a name="en-us_topic_0182207110_p367115115287"></a><a name="en-us_topic_0182207110_p367115115287"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row1267165119287"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p46818511285"><a name="en-us_topic_0182207110_p46818511285"></a><a name="en-us_topic_0182207110_p46818511285"></a>string id</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p106835113282"><a name="en-us_topic_0182207110_p106835113282"></a><a name="en-us_topic_0182207110_p106835113282"></a>Sandbox ID.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row136845192810"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p16813516283"><a name="en-us_topic_0182207110_p16813516283"></a><a name="en-us_topic_0182207110_p16813516283"></a><a href="#en-us_topic_0182207110_li64922552019">PodSandboxStateValue</a> state</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1168751132815"><a name="en-us_topic_0182207110_p1168751132815"></a><a name="en-us_topic_0182207110_p1168751132815"></a>Sandbox status.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row768105115289"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p468175112814"><a name="en-us_topic_0182207110_p468175112814"></a><a name="en-us_topic_0182207110_p468175112814"></a>map&lt;string, string&gt; label_selector</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p968115114284"><a name="en-us_topic_0182207110_p968115114284"></a><a name="en-us_topic_0182207110_p968115114284"></a>Sandbox label, which does not support regular expressions and must be fully matched.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **PodSandbox**

    This API is used to provide a minimum description of a sandbox. 

    <table><thead align="left"><tr id="en-us_topic_0182207110_row17177173543219"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p191773352328"><a name="en-us_topic_0182207110_p191773352328"></a><a name="en-us_topic_0182207110_p191773352328"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p11177163514329"><a name="en-us_topic_0182207110_p11177163514329"></a><a name="en-us_topic_0182207110_p11177163514329"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row1817873543211"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p01774355326"><a name="en-us_topic_0182207110_p01774355326"></a><a name="en-us_topic_0182207110_p01774355326"></a>string id</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p9178123543213"><a name="en-us_topic_0182207110_p9178123543213"></a><a name="en-us_topic_0182207110_p9178123543213"></a>Sandbox ID.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row11782353322"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1217883523217"><a name="en-us_topic_0182207110_p1217883523217"></a><a name="en-us_topic_0182207110_p1217883523217"></a><a href="#en-us_topic_0182207110_li2359918134912">PodSandboxMetadata</a> metadata</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p4178235143211"><a name="en-us_topic_0182207110_p4178235143211"></a><a name="en-us_topic_0182207110_p4178235143211"></a>Sandbox metadata.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row151781835133214"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p13178153533219"><a name="en-us_topic_0182207110_p13178153533219"></a><a name="en-us_topic_0182207110_p13178153533219"></a><a href="#en-us_topic_0182207110_li1818214574195">PodSandboxState</a> state</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p17178183583211"><a name="en-us_topic_0182207110_p17178183583211"></a><a name="en-us_topic_0182207110_p17178183583211"></a>Sandbox status value.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1179143523213"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p2017893543215"><a name="en-us_topic_0182207110_p2017893543215"></a><a name="en-us_topic_0182207110_p2017893543215"></a>int64 created_at</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1117810355326"><a name="en-us_topic_0182207110_p1117810355326"></a><a name="en-us_topic_0182207110_p1117810355326"></a>Sandbox creation timestamp (unit: ns).</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row4180183533219"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p15179183543219"><a name="en-us_topic_0182207110_p15179183543219"></a><a name="en-us_topic_0182207110_p15179183543219"></a>map&lt;string, string&gt; labels</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p101796358325"><a name="en-us_topic_0182207110_p101796358325"></a><a name="en-us_topic_0182207110_p101796358325"></a>Key-value pair that can be used to identify a sandbox or a series of sandboxes.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1818063515320"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p20180143512324"><a name="en-us_topic_0182207110_p20180143512324"></a><a name="en-us_topic_0182207110_p20180143512324"></a>map&lt;string, string&gt; annotations</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p11180103543219"><a name="en-us_topic_0182207110_p11180103543219"></a><a name="en-us_topic_0182207110_p11180103543219"></a>Key-value pair that stores any information, whose values cannot be changed by the runtime.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **KeyValue**

    The API is used to encapsulate key-value pairs.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row136281333113315"><th class="cellrowborder" valign="top" width="40.52%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p10628173318339"><a name="en-us_topic_0182207110_p10628173318339"></a><a name="en-us_topic_0182207110_p10628173318339"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.48%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p1562811331332"><a name="en-us_topic_0182207110_p1562811331332"></a><a name="en-us_topic_0182207110_p1562811331332"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row12628153353311"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p14766942153319"><a name="en-us_topic_0182207110_p14766942153319"></a><a name="en-us_topic_0182207110_p14766942153319"></a>string key</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p9629733163311"><a name="en-us_topic_0182207110_p9629733163311"></a><a name="en-us_topic_0182207110_p9629733163311"></a>Key</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row6629533163311"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p156291633153319"><a name="en-us_topic_0182207110_p156291633153319"></a><a name="en-us_topic_0182207110_p156291633153319"></a>string value</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p56291333113311"><a name="en-us_topic_0182207110_p56291333113311"></a><a name="en-us_topic_0182207110_p56291333113311"></a>Value</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **SELinuxOption**

    The API is used to specify the SELinux label of a container.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row18751148155112"><th class="cellrowborder" valign="top" width="40.52%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p1775113816517"><a name="en-us_topic_0182207110_p1775113816517"></a><a name="en-us_topic_0182207110_p1775113816517"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.48%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p1175215815114"><a name="en-us_topic_0182207110_p1175215815114"></a><a name="en-us_topic_0182207110_p1175215815114"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row117521812514"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p2752178195111"><a name="en-us_topic_0182207110_p2752178195111"></a><a name="en-us_topic_0182207110_p2752178195111"></a>string user</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p775288145117"><a name="en-us_topic_0182207110_p775288145117"></a><a name="en-us_topic_0182207110_p775288145117"></a>User</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1775214818512"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p57524815514"><a name="en-us_topic_0182207110_p57524815514"></a><a name="en-us_topic_0182207110_p57524815514"></a>string role</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p975216895119"><a name="en-us_topic_0182207110_p975216895119"></a><a name="en-us_topic_0182207110_p975216895119"></a>Role</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row9445413125116"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p644521385118"><a name="en-us_topic_0182207110_p644521385118"></a><a name="en-us_topic_0182207110_p644521385118"></a>string type</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1445713125113"><a name="en-us_topic_0182207110_p1445713125113"></a><a name="en-us_topic_0182207110_p1445713125113"></a>Type</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row9753198165114"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1175368205113"><a name="en-us_topic_0182207110_p1175368205113"></a><a name="en-us_topic_0182207110_p1175368205113"></a>string level</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1475320875112"><a name="en-us_topic_0182207110_p1475320875112"></a><a name="en-us_topic_0182207110_p1475320875112"></a>Level</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **ContainerMetadata**

    Container metadata contains all information that constructs a container name. It is recommended that the metadata be displayed on the user interface during container running to improve user experience. For example, a unique container name can be generated based on the metadata during running.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row348741935315"><th class="cellrowborder" valign="top" width="40.52%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p748891945320"><a name="en-us_topic_0182207110_p748891945320"></a><a name="en-us_topic_0182207110_p748891945320"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.48%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p948811191538"><a name="en-us_topic_0182207110_p948811191538"></a><a name="en-us_topic_0182207110_p948811191538"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row64884193535"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p4488181917535"><a name="en-us_topic_0182207110_p4488181917535"></a><a name="en-us_topic_0182207110_p4488181917535"></a>string name</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p14881419185315"><a name="en-us_topic_0182207110_p14881419185315"></a><a name="en-us_topic_0182207110_p14881419185315"></a>Container name.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row3489121965312"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1848921975315"><a name="en-us_topic_0182207110_p1848921975315"></a><a name="en-us_topic_0182207110_p1848921975315"></a>uint32 attempt</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1216885555710"><a name="en-us_topic_0182207110_p1216885555710"></a><a name="en-us_topic_0182207110_p1216885555710"></a>Number of attempts to create a container.</p>
    <p id="en-us_topic_0182207110_p1048991916534"><a name="en-us_topic_0182207110_p1048991916534"></a><a name="en-us_topic_0182207110_p1048991916534"></a>Default value: <strong id="en-us_topic_0182207110_b6933310105712"><a name="en-us_topic_0182207110_b6933310105712"></a><a name="en-us_topic_0182207110_b6933310105712"></a>0</strong></p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **ContainerState**

    The API is used to specify enums of container status values.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row2224958205510"><th class="cellrowborder" valign="top" width="40.52%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p19224758185512"><a name="en-us_topic_0182207110_p19224758185512"></a><a name="en-us_topic_0182207110_p19224758185512"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.48%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p132251658145511"><a name="en-us_topic_0182207110_p132251658145511"></a><a name="en-us_topic_0182207110_p132251658145511"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row18225155815516"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1922525825513"><a name="en-us_topic_0182207110_p1922525825513"></a><a name="en-us_topic_0182207110_p1922525825513"></a>CONTAINER_CREATED = 0</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p19225115818550"><a name="en-us_topic_0182207110_p19225115818550"></a><a name="en-us_topic_0182207110_p19225115818550"></a>The container is created.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row152257316563"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p12251436565"><a name="en-us_topic_0182207110_p12251436565"></a><a name="en-us_topic_0182207110_p12251436565"></a>CONTAINER_RUNNING = 1</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p4225132564"><a name="en-us_topic_0182207110_p4225132564"></a><a name="en-us_topic_0182207110_p4225132564"></a>The container is running.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1622595813559"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p931041915618"><a name="en-us_topic_0182207110_p931041915618"></a><a name="en-us_topic_0182207110_p931041915618"></a>CONTAINER_EXITED  = 2</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p19225658165519"><a name="en-us_topic_0182207110_p19225658165519"></a><a name="en-us_topic_0182207110_p19225658165519"></a>The container exits.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row140581185618"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p194051110564"><a name="en-us_topic_0182207110_p194051110564"></a><a name="en-us_topic_0182207110_p194051110564"></a>CONTAINER_UNKNOWN = 3</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p292175415566"><a name="en-us_topic_0182207110_p292175415566"></a><a name="en-us_topic_0182207110_p292175415566"></a>Unknown container status.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **ContainerStateValue**

    The API is used to encapsulate the data structure of  [ContainerState](#en-us_topic_0182207110_li65182518309).

    <table><thead align="left"><tr id="en-us_topic_0182207110_row16723141511578"><th class="cellrowborder" valign="top" width="40.52%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p972313157577"><a name="en-us_topic_0182207110_p972313157577"></a><a name="en-us_topic_0182207110_p972313157577"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.48%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p1872471513575"><a name="en-us_topic_0182207110_p1872471513575"></a><a name="en-us_topic_0182207110_p1872471513575"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row2724815185714"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p18106131065816"><a name="en-us_topic_0182207110_p18106131065816"></a><a name="en-us_topic_0182207110_p18106131065816"></a><a href="#en-us_topic_0182207110_li65182518309">ContainerState</a> <strong id="en-us_topic_0182207110_b91061910165817"><a name="en-us_topic_0182207110_b91061910165817"></a><a name="en-us_topic_0182207110_b91061910165817"></a>state</strong></p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p13138131010581"><a name="en-us_topic_0182207110_p13138131010581"></a><a name="en-us_topic_0182207110_p13138131010581"></a>Container status value.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **ContainerFilter**

    The API is used to add filter criteria for the container list. The intersection of multiple filter criteria is displayed.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row4194164075811"><th class="cellrowborder" valign="top" width="40.52%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p20194124011584"><a name="en-us_topic_0182207110_p20194124011584"></a><a name="en-us_topic_0182207110_p20194124011584"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.48%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p019413405586"><a name="en-us_topic_0182207110_p019413405586"></a><a name="en-us_topic_0182207110_p019413405586"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row1319454019588"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p019417404583"><a name="en-us_topic_0182207110_p019417404583"></a><a name="en-us_topic_0182207110_p019417404583"></a>string id</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p5195640205811"><a name="en-us_topic_0182207110_p5195640205811"></a><a name="en-us_topic_0182207110_p5195640205811"></a>Container ID.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row18195194010585"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p3195184017584"><a name="en-us_topic_0182207110_p3195184017584"></a><a name="en-us_topic_0182207110_p3195184017584"></a><a href="#en-us_topic_0182207110_li64922552019">PodSandboxStateValue</a> state</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p7195144015818"><a name="en-us_topic_0182207110_p7195144015818"></a><a name="en-us_topic_0182207110_p7195144015818"></a>Container status.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row8512141175912"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p651311113597"><a name="en-us_topic_0182207110_p651311113597"></a><a name="en-us_topic_0182207110_p651311113597"></a>string pod_sandbox_id</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1951317155912"><a name="en-us_topic_0182207110_p1951317155912"></a><a name="en-us_topic_0182207110_p1951317155912"></a>Sandbox ID.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1319574075817"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1319515403587"><a name="en-us_topic_0182207110_p1319515403587"></a><a name="en-us_topic_0182207110_p1319515403587"></a>map&lt;string, string&gt; label_selector</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p121951440165812"><a name="en-us_topic_0182207110_p121951440165812"></a><a name="en-us_topic_0182207110_p121951440165812"></a>Container label, which does not support regular expressions and must be fully matched.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **LinuxContainerSecurityContext**

    The API is used to specify container security configurations.

    <table><tbody><tr id="en-us_topic_0182207110_row1653773511471"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p1153793544711"><a name="en-us_topic_0182207110_p1153793544711"></a><a name="en-us_topic_0182207110_p1153793544711"></a><strong id="en-us_topic_0182207110_b0850744111715"><a name="en-us_topic_0182207110_b0850744111715"></a><a name="en-us_topic_0182207110_b0850744111715"></a>Parameter</strong></p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p5537143514714"><a name="en-us_topic_0182207110_p5537143514714"></a><a name="en-us_topic_0182207110_p5537143514714"></a><strong id="en-us_topic_0182207110_b61401347101714"><a name="en-us_topic_0182207110_b61401347101714"></a><a name="en-us_topic_0182207110_b61401347101714"></a>Description</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row5537635134710"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p17269132255120"><a name="en-us_topic_0182207110_p17269132255120"></a><a name="en-us_topic_0182207110_p17269132255120"></a><a href="#en-us_topic_0182207110_li115631277434">Capability</a> capabilities</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p4537103564714"><a name="en-us_topic_0182207110_p4537103564714"></a><a name="en-us_topic_0182207110_p4537103564714"></a>Added or removed capabilities.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1853733544712"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p119971728145118"><a name="en-us_topic_0182207110_p119971728145118"></a><a name="en-us_topic_0182207110_p119971728145118"></a>bool privileged</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p195379357474"><a name="en-us_topic_0182207110_p195379357474"></a><a name="en-us_topic_0182207110_p195379357474"></a>Whether the container is in privileged mode. Default value: <strong id="en-us_topic_0182207110_b16351976719"><a name="en-us_topic_0182207110_b16351976719"></a><a name="en-us_topic_0182207110_b16351976719"></a>false</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row185376357476"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p1025913245117"><a name="en-us_topic_0182207110_p1025913245117"></a><a name="en-us_topic_0182207110_p1025913245117"></a><a href="#en-us_topic_0182207110_li1182444614213">NamespaceOption</a> namespace_options</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p15537193518478"><a name="en-us_topic_0182207110_p15537193518478"></a><a name="en-us_topic_0182207110_p15537193518478"></a>Container namespace options.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row05381935174712"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p17388143513517"><a name="en-us_topic_0182207110_p17388143513517"></a><a name="en-us_topic_0182207110_p17388143513517"></a><a href="#en-us_topic_0182207110_li816815620237">SELinuxOption</a> selinux_options</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p353715357473"><a name="en-us_topic_0182207110_p353715357473"></a><a name="en-us_topic_0182207110_p353715357473"></a>SELinux context, which is optional. This parameter does not take effect now.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row95385354470"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p8920153855110"><a name="en-us_topic_0182207110_p8920153855110"></a><a name="en-us_topic_0182207110_p8920153855110"></a><a href="#en-us_topic_0182207110_li1439643415372">Int64Value</a> run_as_user</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p5538143524710"><a name="en-us_topic_0182207110_p5538143524710"></a><a name="en-us_topic_0182207110_p5538143524710"></a>UID for running container processes. Only <strong id="en-us_topic_0182207110_b43001135797"><a name="en-us_topic_0182207110_b43001135797"></a><a name="en-us_topic_0182207110_b43001135797"></a>run_as_user</strong> or <strong id="en-us_topic_0182207110_b12268342997"><a name="en-us_topic_0182207110_b12268342997"></a><a name="en-us_topic_0182207110_b12268342997"></a>run_as_username</strong> can be specified at a time. <strong id="en-us_topic_0182207110_b19189144712910"><a name="en-us_topic_0182207110_b19189144712910"></a><a name="en-us_topic_0182207110_b19189144712910"></a>run_as_username</strong> takes effect preferentially.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row25380353477"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p1324534214513"><a name="en-us_topic_0182207110_p1324534214513"></a><a name="en-us_topic_0182207110_p1324534214513"></a>string run_as_username</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p6538103544717"><a name="en-us_topic_0182207110_p6538103544717"></a><a name="en-us_topic_0182207110_p6538103544717"></a>Username for running container processes. If specified, the user must exist in <strong id="en-us_topic_0182207110_b6398217181717"><a name="en-us_topic_0182207110_b6398217181717"></a><a name="en-us_topic_0182207110_b6398217181717"></a>/etc/passwd</strong> in the container image and be parsed by the runtime. Otherwise, an error must occur during running.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1253813574713"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p38591046115115"><a name="en-us_topic_0182207110_p38591046115115"></a><a name="en-us_topic_0182207110_p38591046115115"></a>bool readonly_rootfs</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p0538153574710"><a name="en-us_topic_0182207110_p0538153574710"></a><a name="en-us_topic_0182207110_p0538153574710"></a>Whether the root file system in a container is read-only. The default value is configured in <strong id="en-us_topic_0182207110_b15496116131910"><a name="en-us_topic_0182207110_b15496116131910"></a><a name="en-us_topic_0182207110_b15496116131910"></a>config.json</strong>.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row8747204114509"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p15850184915113"><a name="en-us_topic_0182207110_p15850184915113"></a><a name="en-us_topic_0182207110_p15850184915113"></a>repeated int64 supplemental_groups</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p167481141165017"><a name="en-us_topic_0182207110_p167481141165017"></a><a name="en-us_topic_0182207110_p167481141165017"></a>List of user groups of the init process running in the container (except the primary GID).</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row3219184415011"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p294616528514"><a name="en-us_topic_0182207110_p294616528514"></a><a name="en-us_topic_0182207110_p294616528514"></a>string apparmor_profile</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p1321912443503"><a name="en-us_topic_0182207110_p1321912443503"></a><a name="en-us_topic_0182207110_p1321912443503"></a>AppArmor configuration file of the container. This parameter does not take effect now.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1778183818507"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p8562455115120"><a name="en-us_topic_0182207110_p8562455115120"></a><a name="en-us_topic_0182207110_p8562455115120"></a>string seccomp_profile_path</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p27816386507"><a name="en-us_topic_0182207110_p27816386507"></a><a name="en-us_topic_0182207110_p27816386507"></a>Path of the seccomp configuration file of the container.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row146010129517"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p17383115825110"><a name="en-us_topic_0182207110_p17383115825110"></a><a name="en-us_topic_0182207110_p17383115825110"></a>bool no_new_privs</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p166191210517"><a name="en-us_topic_0182207110_p166191210517"></a><a name="en-us_topic_0182207110_p166191210517"></a>Whether to set the no_new_privs flag in the container.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **LinuxContainerResources**

    The API is used to specify configurations of Linux container resources.

    <table><tbody><tr id="en-us_topic_0182207110_row1774623104910"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p1474653124914"><a name="en-us_topic_0182207110_p1474653124914"></a><a name="en-us_topic_0182207110_p1474653124914"></a><strong id="en-us_topic_0182207110_b4223758101712"><a name="en-us_topic_0182207110_b4223758101712"></a><a name="en-us_topic_0182207110_b4223758101712"></a>Parameter</strong></p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p4746183124920"><a name="en-us_topic_0182207110_p4746183124920"></a><a name="en-us_topic_0182207110_p4746183124920"></a><strong id="en-us_topic_0182207110_b565719017188"><a name="en-us_topic_0182207110_b565719017188"></a><a name="en-us_topic_0182207110_b565719017188"></a>Description</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row174653112494"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p7746103120496"><a name="en-us_topic_0182207110_p7746103120496"></a><a name="en-us_topic_0182207110_p7746103120496"></a>int64 cpu_period</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p9746113114911"><a name="en-us_topic_0182207110_p9746113114911"></a><a name="en-us_topic_0182207110_p9746113114911"></a>CPU CFS period. Default value: <strong id="en-us_topic_0182207110_b1023661972813"><a name="en-us_topic_0182207110_b1023661972813"></a><a name="en-us_topic_0182207110_b1023661972813"></a>0</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row474673164917"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p14746143134912"><a name="en-us_topic_0182207110_p14746143134912"></a><a name="en-us_topic_0182207110_p14746143134912"></a>int64 cpu_quota</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p17746931104919"><a name="en-us_topic_0182207110_p17746931104919"></a><a name="en-us_topic_0182207110_p17746931104919"></a>CPU CFS quota. Default value: <strong id="en-us_topic_0182207110_b946132812287"><a name="en-us_topic_0182207110_b946132812287"></a><a name="en-us_topic_0182207110_b946132812287"></a>0</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row9746103124914"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p17746131164912"><a name="en-us_topic_0182207110_p17746131164912"></a><a name="en-us_topic_0182207110_p17746131164912"></a>int64 cpu_shares</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p5746103111491"><a name="en-us_topic_0182207110_p5746103111491"></a><a name="en-us_topic_0182207110_p5746103111491"></a>CPU share (relative weight). Default value: <strong id="en-us_topic_0182207110_b8668163662814"><a name="en-us_topic_0182207110_b8668163662814"></a><a name="en-us_topic_0182207110_b8668163662814"></a>0</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row47463316492"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p5746183117499"><a name="en-us_topic_0182207110_p5746183117499"></a><a name="en-us_topic_0182207110_p5746183117499"></a>int64 memory_limit_in_bytes</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p17746731114919"><a name="en-us_topic_0182207110_p17746731114919"></a><a name="en-us_topic_0182207110_p17746731114919"></a>Memory limit (unit: byte). Default value: <strong id="en-us_topic_0182207110_b1456319432288"><a name="en-us_topic_0182207110_b1456319432288"></a><a name="en-us_topic_0182207110_b1456319432288"></a>0</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row117463319495"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p1374723114913"><a name="en-us_topic_0182207110_p1374723114913"></a><a name="en-us_topic_0182207110_p1374723114913"></a>int64 oom_score_adj</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p11747731134911"><a name="en-us_topic_0182207110_p11747731134911"></a><a name="en-us_topic_0182207110_p11747731134911"></a>OOMScoreAdj that is used to adjust the OOM killer. Default value: <strong id="en-us_topic_0182207110_b1151413499285"><a name="en-us_topic_0182207110_b1151413499285"></a><a name="en-us_topic_0182207110_b1151413499285"></a>0</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row2747153115491"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p1174793116499"><a name="en-us_topic_0182207110_p1174793116499"></a><a name="en-us_topic_0182207110_p1174793116499"></a>string cpuset_cpus</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p15747133111495"><a name="en-us_topic_0182207110_p15747133111495"></a><a name="en-us_topic_0182207110_p15747133111495"></a>CPU core used by the container. Default value: null</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row474713316497"><td class="cellrowborder" valign="top" width="39.410000000000004%"><p id="en-us_topic_0182207110_p1474783184919"><a name="en-us_topic_0182207110_p1474783184919"></a><a name="en-us_topic_0182207110_p1474783184919"></a>string cpuset_mems</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.589999999999996%"><p id="en-us_topic_0182207110_p6747331134912"><a name="en-us_topic_0182207110_p6747331134912"></a><a name="en-us_topic_0182207110_p6747331134912"></a>Memory nodes used by the container. Default value: null</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **Image**

    The API is used to describe the basic information about an image.

    <table><tbody><tr id="en-us_topic_0182207110_row87661351121014"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0182207110_p1429813131216"><a name="en-us_topic_0182207110_p1429813131216"></a><a name="en-us_topic_0182207110_p1429813131216"></a><strong id="en-us_topic_0182207110_b14870181115185"><a name="en-us_topic_0182207110_b14870181115185"></a><a name="en-us_topic_0182207110_b14870181115185"></a>Parameter</strong></p>
    </td>
    <td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0182207110_p87661251111019"><a name="en-us_topic_0182207110_p87661251111019"></a><a name="en-us_topic_0182207110_p87661251111019"></a><strong id="en-us_topic_0182207110_b1214051413185"><a name="en-us_topic_0182207110_b1214051413185"></a><a name="en-us_topic_0182207110_b1214051413185"></a>Description</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row10766351101016"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0182207110_p127661551121010"><a name="en-us_topic_0182207110_p127661551121010"></a><a name="en-us_topic_0182207110_p127661551121010"></a>string id</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0182207110_p576745119102"><a name="en-us_topic_0182207110_p576745119102"></a><a name="en-us_topic_0182207110_p576745119102"></a>Image ID.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row65303296131"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0182207110_p6531112941317"><a name="en-us_topic_0182207110_p6531112941317"></a><a name="en-us_topic_0182207110_p6531112941317"></a>repeated string repo_tags</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0182207110_p13172183421411"><a name="en-us_topic_0182207110_p13172183421411"></a><a name="en-us_topic_0182207110_p13172183421411"></a>Image tag name <strong id="en-us_topic_0182207110_b10366150173010"><a name="en-us_topic_0182207110_b10366150173010"></a><a name="en-us_topic_0182207110_b10366150173010"></a>repo_tags</strong>.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row13356165612132"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0182207110_p9356135671310"><a name="en-us_topic_0182207110_p9356135671310"></a><a name="en-us_topic_0182207110_p9356135671310"></a>repeated string repo_digests</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0182207110_p15357185619138"><a name="en-us_topic_0182207110_p15357185619138"></a><a name="en-us_topic_0182207110_p15357185619138"></a>Image digest information.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row119913618153"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0182207110_p5991360151"><a name="en-us_topic_0182207110_p5991360151"></a><a name="en-us_topic_0182207110_p5991360151"></a>uint64 size</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0182207110_p89912068158"><a name="en-us_topic_0182207110_p89912068158"></a><a name="en-us_topic_0182207110_p89912068158"></a>Image size.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row19825183114156"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0182207110_p6825331191518"><a name="en-us_topic_0182207110_p6825331191518"></a><a name="en-us_topic_0182207110_p6825331191518"></a><a href="#en-us_topic_0182207110_li1439643415372">Int64Value</a> uid</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0182207110_p12825143181515"><a name="en-us_topic_0182207110_p12825143181515"></a><a name="en-us_topic_0182207110_p12825143181515"></a>Default image UID.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row84999114169"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0182207110_p104996115169"><a name="en-us_topic_0182207110_p104996115169"></a><a name="en-us_topic_0182207110_p104996115169"></a>string username</p>
    </td>
    <td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0182207110_p1249951191619"><a name="en-us_topic_0182207110_p1249951191619"></a><a name="en-us_topic_0182207110_p1249951191619"></a>Default image username.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **ImageSpec**

    The API is used to represent the internal data structure of an image. Currently, ImageSpec encapsulates only the container image name.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row18125195617212"><th class="cellrowborder" valign="top" width="40.52%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p11257567212"><a name="en-us_topic_0182207110_p11257567212"></a><a name="en-us_topic_0182207110_p11257567212"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.48%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p712510568216"><a name="en-us_topic_0182207110_p712510568216"></a><a name="en-us_topic_0182207110_p712510568216"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row412515561825"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1712575615213"><a name="en-us_topic_0182207110_p1712575615213"></a><a name="en-us_topic_0182207110_p1712575615213"></a>string image</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p8125956526"><a name="en-us_topic_0182207110_p8125956526"></a><a name="en-us_topic_0182207110_p8125956526"></a>Container image name.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **StorageIdentifier**

    The API is used to specify the unique identifier for defining the storage.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row22819405420"><th class="cellrowborder" valign="top" width="40.52%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p18283400411"><a name="en-us_topic_0182207110_p18283400411"></a><a name="en-us_topic_0182207110_p18283400411"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.48%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p8281140541"><a name="en-us_topic_0182207110_p8281140541"></a><a name="en-us_topic_0182207110_p8281140541"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row12817404411"><td class="cellrowborder" valign="top" width="40.52%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p942172311510"><a name="en-us_topic_0182207110_p942172311510"></a><a name="en-us_topic_0182207110_p942172311510"></a>string uuid</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.48%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p62920401145"><a name="en-us_topic_0182207110_p62920401145"></a><a name="en-us_topic_0182207110_p62920401145"></a>Device UUID.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **FilesystemUsage**

    <table><tbody><tr id="en-us_topic_0182207110_row486218218314"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p3862192117316"><a name="en-us_topic_0182207110_p3862192117316"></a><a name="en-us_topic_0182207110_p3862192117316"></a><strong id="en-us_topic_0182207110_b15749426141818"><a name="en-us_topic_0182207110_b15749426141818"></a><a name="en-us_topic_0182207110_b15749426141818"></a>Parameter</strong></p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p208627215314"><a name="en-us_topic_0182207110_p208627215314"></a><a name="en-us_topic_0182207110_p208627215314"></a><strong id="en-us_topic_0182207110_b987816282187"><a name="en-us_topic_0182207110_b987816282187"></a><a name="en-us_topic_0182207110_b987816282187"></a>Description</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1386220217318"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p18862192111312"><a name="en-us_topic_0182207110_p18862192111312"></a><a name="en-us_topic_0182207110_p18862192111312"></a>int64 timestamp</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p108622211933"><a name="en-us_topic_0182207110_p108622211933"></a><a name="en-us_topic_0182207110_p108622211933"></a>Timestamp when file system information is collected.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row486220211535"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p108628211934"><a name="en-us_topic_0182207110_p108628211934"></a><a name="en-us_topic_0182207110_p108628211934"></a><a href="#en-us_topic_0182207110_li3285401546">StorageIdentifier</a> storage_id</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p1862142116311"><a name="en-us_topic_0182207110_p1862142116311"></a><a name="en-us_topic_0182207110_p1862142116311"></a>UUID of the file system that stores images.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row986320211835"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p108631721737"><a name="en-us_topic_0182207110_p108631721737"></a><a name="en-us_topic_0182207110_p108631721737"></a><a href="#en-us_topic_0182207110_li1886455713453">UInt64Value</a> used_bytes</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p1086342118315"><a name="en-us_topic_0182207110_p1086342118315"></a><a name="en-us_topic_0182207110_p1086342118315"></a>Size of the metadata that stores images.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row48635211838"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p5863202112317"><a name="en-us_topic_0182207110_p5863202112317"></a><a name="en-us_topic_0182207110_p5863202112317"></a><a href="#en-us_topic_0182207110_li1886455713453">UInt64Value</a> inodes_used</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p1486312210314"><a name="en-us_topic_0182207110_p1486312210314"></a><a name="en-us_topic_0182207110_p1486312210314"></a>Number of inodes of the metadata that stores images.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **AuthConfig**

    <table><tbody><tr id="en-us_topic_0182207110_row419944410312"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p1519964418314"><a name="en-us_topic_0182207110_p1519964418314"></a><a name="en-us_topic_0182207110_p1519964418314"></a><strong id="en-us_topic_0182207110_b146630375182"><a name="en-us_topic_0182207110_b146630375182"></a><a name="en-us_topic_0182207110_b146630375182"></a>Parameter</strong></p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p1319910447317"><a name="en-us_topic_0182207110_p1319910447317"></a><a name="en-us_topic_0182207110_p1319910447317"></a><strong id="en-us_topic_0182207110_b1320110408185"><a name="en-us_topic_0182207110_b1320110408185"></a><a name="en-us_topic_0182207110_b1320110408185"></a>Description</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row819918441338"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p1199174414319"><a name="en-us_topic_0182207110_p1199174414319"></a><a name="en-us_topic_0182207110_p1199174414319"></a>string username</p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p16199194419310"><a name="en-us_topic_0182207110_p16199194419310"></a><a name="en-us_topic_0182207110_p16199194419310"></a>Username used for downloading images.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row01991844833"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p1119910441131"><a name="en-us_topic_0182207110_p1119910441131"></a><a name="en-us_topic_0182207110_p1119910441131"></a>string password</p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p141998442310"><a name="en-us_topic_0182207110_p141998442310"></a><a name="en-us_topic_0182207110_p141998442310"></a>Password used for downloading images.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row21992441835"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p20199544734"><a name="en-us_topic_0182207110_p20199544734"></a><a name="en-us_topic_0182207110_p20199544734"></a>string auth</p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p219917441631"><a name="en-us_topic_0182207110_p219917441631"></a><a name="en-us_topic_0182207110_p219917441631"></a>Authentication information used for downloading images. The value is encoded by using Base64.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row161994442311"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p1019917448312"><a name="en-us_topic_0182207110_p1019917448312"></a><a name="en-us_topic_0182207110_p1019917448312"></a>string server_address</p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p1219915441319"><a name="en-us_topic_0182207110_p1219915441319"></a><a name="en-us_topic_0182207110_p1219915441319"></a>IP address of the server where images are downloaded. This parameter does not take effect now.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row141995442310"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p5199944834"><a name="en-us_topic_0182207110_p5199944834"></a><a name="en-us_topic_0182207110_p5199944834"></a>string identity_token</p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p7199134414318"><a name="en-us_topic_0182207110_p7199134414318"></a><a name="en-us_topic_0182207110_p7199134414318"></a>Information about the token used for the registry authentication. This parameter does not take effect now.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row11199174420317"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p5199174410316"><a name="en-us_topic_0182207110_p5199174410316"></a><a name="en-us_topic_0182207110_p5199174410316"></a>string registry_token</p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p2199104418310"><a name="en-us_topic_0182207110_p2199104418310"></a><a name="en-us_topic_0182207110_p2199104418310"></a>Information about the token used for the interaction with the registry. This parameter does not take effect now.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **Container**

    The API is used to describe container information, such as the ID and status.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row195471481217"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p115477481918"><a name="en-us_topic_0182207110_p115477481918"></a><a name="en-us_topic_0182207110_p115477481918"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p105473484113"><a name="en-us_topic_0182207110_p105473484113"></a><a name="en-us_topic_0182207110_p105473484113"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row165478486115"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p155477488113"><a name="en-us_topic_0182207110_p155477488113"></a><a name="en-us_topic_0182207110_p155477488113"></a>string id</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p254714819115"><a name="en-us_topic_0182207110_p254714819115"></a><a name="en-us_topic_0182207110_p254714819115"></a>Container ID.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row17650117434"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p46500717319"><a name="en-us_topic_0182207110_p46500717319"></a><a name="en-us_topic_0182207110_p46500717319"></a>string pod_sandbox_id</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p36501771037"><a name="en-us_topic_0182207110_p36501771037"></a><a name="en-us_topic_0182207110_p36501771037"></a>ID of the sandbox to which the container belongs.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row35471348816"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p8547144813114"><a name="en-us_topic_0182207110_p8547144813114"></a><a name="en-us_topic_0182207110_p8547144813114"></a><a href="#en-us_topic_0182207110_li17135914132319">ContainerMetadata</a> metadata</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p85471948314"><a name="en-us_topic_0182207110_p85471948314"></a><a name="en-us_topic_0182207110_p85471948314"></a>Container metadata.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row0547204818111"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p125479482116"><a name="en-us_topic_0182207110_p125479482116"></a><a name="en-us_topic_0182207110_p125479482116"></a><a href="#en-us_topic_0182207110_li597891416252">ImageSpec</a> image</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1454794816115"><a name="en-us_topic_0182207110_p1454794816115"></a><a name="en-us_topic_0182207110_p1454794816115"></a>Image specifications.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row254754815111"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p185477486110"><a name="en-us_topic_0182207110_p185477486110"></a><a name="en-us_topic_0182207110_p185477486110"></a>string image_ref</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p17548648315"><a name="en-us_topic_0182207110_p17548648315"></a><a name="en-us_topic_0182207110_p17548648315"></a>Image used by the container. This parameter is an image ID for most runtime.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1354819481814"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p4734152614413"><a name="en-us_topic_0182207110_p4734152614413"></a><a name="en-us_topic_0182207110_p4734152614413"></a><a href="#en-us_topic_0182207110_li65182518309">ContainerState</a> state</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p454844819113"><a name="en-us_topic_0182207110_p454844819113"></a><a name="en-us_topic_0182207110_p454844819113"></a>Container status.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row7548548710"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p165483486112"><a name="en-us_topic_0182207110_p165483486112"></a><a name="en-us_topic_0182207110_p165483486112"></a>int64 created_at</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1754819488120"><a name="en-us_topic_0182207110_p1754819488120"></a><a name="en-us_topic_0182207110_p1754819488120"></a>Container creation timestamp (unit: ns).</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row854854811116"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p45483483115"><a name="en-us_topic_0182207110_p45483483115"></a><a name="en-us_topic_0182207110_p45483483115"></a>map&lt;string, string&gt; labels</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p45482048819"><a name="en-us_topic_0182207110_p45482048819"></a><a name="en-us_topic_0182207110_p45482048819"></a>Key-value pair that can be used to identify a container or a series of containers.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row25481481218"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p15548248314"><a name="en-us_topic_0182207110_p15548248314"></a><a name="en-us_topic_0182207110_p15548248314"></a>map&lt;string, string&gt; annotations</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p16549448617"><a name="en-us_topic_0182207110_p16549448617"></a><a name="en-us_topic_0182207110_p16549448617"></a>Key-value pair that stores any information, whose values cannot be changed by the runtime.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **ContainerStatus**

    The API is used to describe the container status information.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row535593712618"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p16355237468"><a name="en-us_topic_0182207110_p16355237468"></a><a name="en-us_topic_0182207110_p16355237468"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p7355183711613"><a name="en-us_topic_0182207110_p7355183711613"></a><a name="en-us_topic_0182207110_p7355183711613"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row113555379617"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p123556374611"><a name="en-us_topic_0182207110_p123556374611"></a><a name="en-us_topic_0182207110_p123556374611"></a>string id</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p7355123718615"><a name="en-us_topic_0182207110_p7355123718615"></a><a name="en-us_topic_0182207110_p7355123718615"></a>Container ID.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row143558371367"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p3355123712618"><a name="en-us_topic_0182207110_p3355123712618"></a><a name="en-us_topic_0182207110_p3355123712618"></a><a href="#en-us_topic_0182207110_li17135914132319">ContainerMetadata</a> metadata</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p63552379614"><a name="en-us_topic_0182207110_p63552379614"></a><a name="en-us_topic_0182207110_p63552379614"></a>Container metadata.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row18356193715616"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p635613719614"><a name="en-us_topic_0182207110_p635613719614"></a><a name="en-us_topic_0182207110_p635613719614"></a><a href="#en-us_topic_0182207110_li65182518309">ContainerState</a> state</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p33564378616"><a name="en-us_topic_0182207110_p33564378616"></a><a name="en-us_topic_0182207110_p33564378616"></a>Container status.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row183561237469"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p23569378616"><a name="en-us_topic_0182207110_p23569378616"></a><a name="en-us_topic_0182207110_p23569378616"></a>int64 created_at</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p113562378617"><a name="en-us_topic_0182207110_p113562378617"></a><a name="en-us_topic_0182207110_p113562378617"></a>Container creation timestamp (unit: ns).</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row351411324713"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p55142321472"><a name="en-us_topic_0182207110_p55142321472"></a><a name="en-us_topic_0182207110_p55142321472"></a>int64 started_at</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p151453217720"><a name="en-us_topic_0182207110_p151453217720"></a><a name="en-us_topic_0182207110_p151453217720"></a>Container start timestamp (unit: ns).</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row13333183511712"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1033311355719"><a name="en-us_topic_0182207110_p1033311355719"></a><a name="en-us_topic_0182207110_p1033311355719"></a>int64 finished_at</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p633310356713"><a name="en-us_topic_0182207110_p633310356713"></a><a name="en-us_topic_0182207110_p633310356713"></a>Container exit timestamp (unit: ns).</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row847917471875"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1847974717715"><a name="en-us_topic_0182207110_p1847974717715"></a><a name="en-us_topic_0182207110_p1847974717715"></a>int32 exit_code</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p17479047871"><a name="en-us_topic_0182207110_p17479047871"></a><a name="en-us_topic_0182207110_p17479047871"></a>Container exit code.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row15383151081"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1161122215912"><a name="en-us_topic_0182207110_p1161122215912"></a><a name="en-us_topic_0182207110_p1161122215912"></a><a href="#en-us_topic_0182207110_li597891416252">ImageSpec</a> image</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p66114223910"><a name="en-us_topic_0182207110_p66114223910"></a><a name="en-us_topic_0182207110_p66114223910"></a>Image specifications.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row15491758876"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p24981230093"><a name="en-us_topic_0182207110_p24981230093"></a><a name="en-us_topic_0182207110_p24981230093"></a>string image_ref</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p104987301290"><a name="en-us_topic_0182207110_p104987301290"></a><a name="en-us_topic_0182207110_p104987301290"></a>Image used by the container. This parameter is an image ID for most runtime.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row998013531174"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p39801533710"><a name="en-us_topic_0182207110_p39801533710"></a><a name="en-us_topic_0182207110_p39801533710"></a>string reason</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1098012531671"><a name="en-us_topic_0182207110_p1098012531671"></a><a name="en-us_topic_0182207110_p1098012531671"></a>Brief description of the reason why the container is in the current status.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row6438205212719"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p164381252671"><a name="en-us_topic_0182207110_p164381252671"></a><a name="en-us_topic_0182207110_p164381252671"></a>string message</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p8438155214711"><a name="en-us_topic_0182207110_p8438155214711"></a><a name="en-us_topic_0182207110_p8438155214711"></a>Information that is easy to read and indicates the reason why the container is in the current status.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1135715371362"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1835718378617"><a name="en-us_topic_0182207110_p1835718378617"></a><a name="en-us_topic_0182207110_p1835718378617"></a>map&lt;string, string&gt; labels</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1935703714616"><a name="en-us_topic_0182207110_p1935703714616"></a><a name="en-us_topic_0182207110_p1935703714616"></a>Key-value pair that can be used to identify a container or a series of containers.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row33571037065"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p16357113712616"><a name="en-us_topic_0182207110_p16357113712616"></a><a name="en-us_topic_0182207110_p16357113712616"></a>map&lt;string, string&gt; annotations</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p73573371661"><a name="en-us_topic_0182207110_p73573371661"></a><a name="en-us_topic_0182207110_p73573371661"></a>Key-value pair that stores any information, whose values cannot be changed by the runtime.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row265513491393"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1465520491098"><a name="en-us_topic_0182207110_p1465520491098"></a><a name="en-us_topic_0182207110_p1465520491098"></a>repeated <a href="#en-us_topic_0182207110_li6779341144216">Mount</a> mounts</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p26551449198"><a name="en-us_topic_0182207110_p26551449198"></a><a name="en-us_topic_0182207110_p26551449198"></a>Information about the container mount point.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row88661051795"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p78663511298"><a name="en-us_topic_0182207110_p78663511298"></a><a name="en-us_topic_0182207110_p78663511298"></a>string log_path</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p786614516915"><a name="en-us_topic_0182207110_p786614516915"></a><a name="en-us_topic_0182207110_p786614516915"></a>Path of the container log file that is in the <strong id="en-us_topic_0182207110_b15998549184819"><a name="en-us_topic_0182207110_b15998549184819"></a><a name="en-us_topic_0182207110_b15998549184819"></a>log_directory</strong> folder configured in <a href="#en-us_topic_0182207110_li253629701">PodSandboxConfig</a>.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **ContainerStatsFilter**

    The API is used to add filter criteria for the container stats list. The intersection of multiple filter criteria is displayed.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row1860171616141"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p188605168143"><a name="en-us_topic_0182207110_p188605168143"></a><a name="en-us_topic_0182207110_p188605168143"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p78601916161416"><a name="en-us_topic_0182207110_p78601916161416"></a><a name="en-us_topic_0182207110_p78601916161416"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row486021618140"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p38609162146"><a name="en-us_topic_0182207110_p38609162146"></a><a name="en-us_topic_0182207110_p38609162146"></a>string id</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p5860171621418"><a name="en-us_topic_0182207110_p5860171621418"></a><a name="en-us_topic_0182207110_p5860171621418"></a>Container ID.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row18611316111416"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p586191610143"><a name="en-us_topic_0182207110_p586191610143"></a><a name="en-us_topic_0182207110_p586191610143"></a>string pod_sandbox_id</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p18861171641420"><a name="en-us_topic_0182207110_p18861171641420"></a><a name="en-us_topic_0182207110_p18861171641420"></a>Sandbox ID.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1786381671416"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p138631016171414"><a name="en-us_topic_0182207110_p138631016171414"></a><a name="en-us_topic_0182207110_p138631016171414"></a>map&lt;string, string&gt; label_selector</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p5863181641417"><a name="en-us_topic_0182207110_p5863181641417"></a><a name="en-us_topic_0182207110_p5863181641417"></a>Container label, which does not support regular expressions and must be fully matched.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **ContainerStats**

    The API is used to add filter criteria for the container stats list. The intersection of multiple filter criteria is displayed.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row55685519212"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p18569195152112"><a name="en-us_topic_0182207110_p18569195152112"></a><a name="en-us_topic_0182207110_p18569195152112"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p165695517211"><a name="en-us_topic_0182207110_p165695517211"></a><a name="en-us_topic_0182207110_p165695517211"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row65691151172118"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p056915162116"><a name="en-us_topic_0182207110_p056915162116"></a><a name="en-us_topic_0182207110_p056915162116"></a><a href="#en-us_topic_0182207110_li6207185712312">ContainerAttributes</a> attributes</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p7569851172114"><a name="en-us_topic_0182207110_p7569851172114"></a><a name="en-us_topic_0182207110_p7569851172114"></a>Container information.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row19569851182110"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1456916511218"><a name="en-us_topic_0182207110_p1456916511218"></a><a name="en-us_topic_0182207110_p1456916511218"></a><a href="#en-us_topic_0182207110_li1367131122711">CpuUsage</a> cpu</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p55691751102116"><a name="en-us_topic_0182207110_p55691751102116"></a><a name="en-us_topic_0182207110_p55691751102116"></a>CPU usage information.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row135693514213"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p15569151172116"><a name="en-us_topic_0182207110_p15569151172116"></a><a name="en-us_topic_0182207110_p15569151172116"></a><a href="#en-us_topic_0182207110_li81221520111718">MemoryUsage</a> memory</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p20569125122113"><a name="en-us_topic_0182207110_p20569125122113"></a><a name="en-us_topic_0182207110_p20569125122113"></a>Memory usage information.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row65759374221"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p145767370228"><a name="en-us_topic_0182207110_p145767370228"></a><a name="en-us_topic_0182207110_p145767370228"></a><a href="#en-us_topic_0182207110_li1606183118189">FilesystemUsage</a> writable_layer</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p0576203717227"><a name="en-us_topic_0182207110_p0576203717227"></a><a name="en-us_topic_0182207110_p0576203717227"></a>Information about the writable layer usage.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **ContainerAttributes**

    The API is used to list basic container information.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row16208857162316"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p19208135716238"><a name="en-us_topic_0182207110_p19208135716238"></a><a name="en-us_topic_0182207110_p19208135716238"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p1020875792313"><a name="en-us_topic_0182207110_p1020875792313"></a><a name="en-us_topic_0182207110_p1020875792313"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row22084577234"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p920855711232"><a name="en-us_topic_0182207110_p920855711232"></a><a name="en-us_topic_0182207110_p920855711232"></a>string id</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p18208457112319"><a name="en-us_topic_0182207110_p18208457112319"></a><a name="en-us_topic_0182207110_p18208457112319"></a>Container ID.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row102081057142317"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1520835712310"><a name="en-us_topic_0182207110_p1520835712310"></a><a name="en-us_topic_0182207110_p1520835712310"></a><a href="#en-us_topic_0182207110_li17135914132319">ContainerMetadata</a> metadata</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p13209357162311"><a name="en-us_topic_0182207110_p13209357162311"></a><a name="en-us_topic_0182207110_p13209357162311"></a>Container metadata.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row10209165713237"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p2874155122512"><a name="en-us_topic_0182207110_p2874155122512"></a><a name="en-us_topic_0182207110_p2874155122512"></a>map&lt;string,string&gt; labels</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p13209145712233"><a name="en-us_topic_0182207110_p13209145712233"></a><a name="en-us_topic_0182207110_p13209145712233"></a>Key-value pair that can be used to identify a container or a series of containers.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row120919574235"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p420955742310"><a name="en-us_topic_0182207110_p420955742310"></a><a name="en-us_topic_0182207110_p420955742310"></a>map&lt;string,string&gt; annotations</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p11210165782314"><a name="en-us_topic_0182207110_p11210165782314"></a><a name="en-us_topic_0182207110_p11210165782314"></a>Key-value pair that stores any information, whose values cannot be changed by the runtime.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **CpuUsage**

    The API is used to list the CPU usage information of a container.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row113674110278"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p13681416276"><a name="en-us_topic_0182207110_p13681416276"></a><a name="en-us_topic_0182207110_p13681416276"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p1736861142719"><a name="en-us_topic_0182207110_p1736861142719"></a><a name="en-us_topic_0182207110_p1736861142719"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row193687118272"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p96863242710"><a name="en-us_topic_0182207110_p96863242710"></a><a name="en-us_topic_0182207110_p96863242710"></a>int64 timestamp</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p17368412273"><a name="en-us_topic_0182207110_p17368412273"></a><a name="en-us_topic_0182207110_p17368412273"></a>Timestamp.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row123686112271"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p2635942132713"><a name="en-us_topic_0182207110_p2635942132713"></a><a name="en-us_topic_0182207110_p2635942132713"></a>UInt64Value usage_core_nano_seconds</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p103680172713"><a name="en-us_topic_0182207110_p103680172713"></a><a name="en-us_topic_0182207110_p103680172713"></a>CPU usage (unit: ns).</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **MemoryUsage**

    The API is used to list the memory usage information of a container.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row1012332021712"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p11233203174"><a name="en-us_topic_0182207110_p11233203174"></a><a name="en-us_topic_0182207110_p11233203174"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p81231920111718"><a name="en-us_topic_0182207110_p81231920111718"></a><a name="en-us_topic_0182207110_p81231920111718"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row1012362017178"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1612318202170"><a name="en-us_topic_0182207110_p1612318202170"></a><a name="en-us_topic_0182207110_p1612318202170"></a>int64 timestamp</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p3124192071710"><a name="en-us_topic_0182207110_p3124192071710"></a><a name="en-us_topic_0182207110_p3124192071710"></a>Timestamp.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1312442021716"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p1712412071712"><a name="en-us_topic_0182207110_p1712412071712"></a><a name="en-us_topic_0182207110_p1712412071712"></a>UInt64Value working_set_bytes</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p11241209172"><a name="en-us_topic_0182207110_p11241209172"></a><a name="en-us_topic_0182207110_p11241209172"></a>Memory usage.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **FilesystemUsage**

    The API is used to list the read/write layer information of a container.

    <table><thead align="left"><tr id="en-us_topic_0182207110_row196071731201813"><th class="cellrowborder" valign="top" width="40.43%" id="mcps1.1.3.1.1"><p id="en-us_topic_0182207110_p13607163114183"><a name="en-us_topic_0182207110_p13607163114183"></a><a name="en-us_topic_0182207110_p13607163114183"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.57%" id="mcps1.1.3.1.2"><p id="en-us_topic_0182207110_p16608103181811"><a name="en-us_topic_0182207110_p16608103181811"></a><a name="en-us_topic_0182207110_p16608103181811"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182207110_row3608731151813"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p360803151817"><a name="en-us_topic_0182207110_p360803151817"></a><a name="en-us_topic_0182207110_p360803151817"></a>int64 timestamp</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p1860973118188"><a name="en-us_topic_0182207110_p1860973118188"></a><a name="en-us_topic_0182207110_p1860973118188"></a>Timestamp.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row106094314181"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p17609113181811"><a name="en-us_topic_0182207110_p17609113181811"></a><a name="en-us_topic_0182207110_p17609113181811"></a>StorageIdentifier storage_id</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p16609231151818"><a name="en-us_topic_0182207110_p16609231151818"></a><a name="en-us_topic_0182207110_p16609231151818"></a>Writable layer directory.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row368116322190"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p968113281915"><a name="en-us_topic_0182207110_p968113281915"></a><a name="en-us_topic_0182207110_p968113281915"></a>UInt64Value used_bytes</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p2681193221911"><a name="en-us_topic_0182207110_p2681193221911"></a><a name="en-us_topic_0182207110_p2681193221911"></a>Number of bytes occupied by images at the writable layer.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row29601026152012"><td class="cellrowborder" valign="top" width="40.43%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0182207110_p896002618203"><a name="en-us_topic_0182207110_p896002618203"></a><a name="en-us_topic_0182207110_p896002618203"></a>UInt64Value inodes_used</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.57%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0182207110_p17960122616208"><a name="en-us_topic_0182207110_p17960122616208"></a><a name="en-us_topic_0182207110_p17960122616208"></a>Number of inodes occupied by images at the writable layer.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **Device**

    The API is used to specify the host volume to be mounted to a container.

    <table><tbody><tr id="en-us_topic_0182207110_row0807249290"><td class="cellrowborder" valign="top" width="40.61%"><p id="en-us_topic_0182207110_p15804244293"><a name="en-us_topic_0182207110_p15804244293"></a><a name="en-us_topic_0182207110_p15804244293"></a><strong id="en-us_topic_0182207110_b1146135891815"><a name="en-us_topic_0182207110_b1146135891815"></a><a name="en-us_topic_0182207110_b1146135891815"></a>Parameter</strong></p>
    </td>
    <td class="cellrowborder" valign="top" width="59.39%"><p id="en-us_topic_0182207110_p14801324132915"><a name="en-us_topic_0182207110_p14801324132915"></a><a name="en-us_topic_0182207110_p14801324132915"></a><strong id="en-us_topic_0182207110_b1148517011195"><a name="en-us_topic_0182207110_b1148517011195"></a><a name="en-us_topic_0182207110_b1148517011195"></a>Description</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row98002422914"><td class="cellrowborder" valign="top" width="40.61%"><p id="en-us_topic_0182207110_p28062414297"><a name="en-us_topic_0182207110_p28062414297"></a><a name="en-us_topic_0182207110_p28062414297"></a>string container_path</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.39%"><p id="en-us_topic_0182207110_p188019244297"><a name="en-us_topic_0182207110_p188019244297"></a><a name="en-us_topic_0182207110_p188019244297"></a>Mounting path of a container.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row48042417299"><td class="cellrowborder" valign="top" width="40.61%"><p id="en-us_topic_0182207110_p88082412293"><a name="en-us_topic_0182207110_p88082412293"></a><a name="en-us_topic_0182207110_p88082412293"></a>string host_path</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.39%"><p id="en-us_topic_0182207110_p118062420297"><a name="en-us_topic_0182207110_p118062420297"></a><a name="en-us_topic_0182207110_p118062420297"></a>Mounting path on the host.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row3801624162913"><td class="cellrowborder" valign="top" width="40.61%"><p id="en-us_topic_0182207110_p51611220303"><a name="en-us_topic_0182207110_p51611220303"></a><a name="en-us_topic_0182207110_p51611220303"></a>string permissions</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.39%"><p id="en-us_topic_0182207110_p10801124132918"><a name="en-us_topic_0182207110_p10801124132918"></a><a name="en-us_topic_0182207110_p10801124132918"></a>Cgroup permission of a device. (<strong id="en-us_topic_0182207110_b7271122919465"><a name="en-us_topic_0182207110_b7271122919465"></a><a name="en-us_topic_0182207110_b7271122919465"></a>r</strong> indicates that containers can be read from a specified device. <strong id="en-us_topic_0182207110_b184093334619"><a name="en-us_topic_0182207110_b184093334619"></a><a name="en-us_topic_0182207110_b184093334619"></a>w</strong> indicates that containers can be written to a specified device. <strong id="en-us_topic_0182207110_b84081535144615"><a name="en-us_topic_0182207110_b84081535144615"></a><a name="en-us_topic_0182207110_b84081535144615"></a>m</strong> indicates that containers can create new device files.)</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **LinuxContainerConfig**

    The API is used to specify Linux configurations.

    <table><tbody><tr id="en-us_topic_0182207110_row383195216323"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p58335233213"><a name="en-us_topic_0182207110_p58335233213"></a><a name="en-us_topic_0182207110_p58335233213"></a><strong id="en-us_topic_0182207110_b121413710191"><a name="en-us_topic_0182207110_b121413710191"></a><a name="en-us_topic_0182207110_b121413710191"></a>Parameter</strong></p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p13831852193219"><a name="en-us_topic_0182207110_p13831852193219"></a><a name="en-us_topic_0182207110_p13831852193219"></a><strong id="en-us_topic_0182207110_b133739119198"><a name="en-us_topic_0182207110_b133739119198"></a><a name="en-us_topic_0182207110_b133739119198"></a>Description</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row98355283211"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p199781557193510"><a name="en-us_topic_0182207110_p199781557193510"></a><a name="en-us_topic_0182207110_p199781557193510"></a><a href="#en-us_topic_0182207110_li2050214613477">LinuxContainerResources</a> resources</p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p11994153633617"><a name="en-us_topic_0182207110_p11994153633617"></a><a name="en-us_topic_0182207110_p11994153633617"></a>Container resource specifications.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1283115217326"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p47151393618"><a name="en-us_topic_0182207110_p47151393618"></a><a name="en-us_topic_0182207110_p47151393618"></a><a href="#en-us_topic_0182207110_li11771452124416">LinuxContainerSecurityContext</a> security_context</p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p1841152153213"><a name="en-us_topic_0182207110_p1841152153213"></a><a name="en-us_topic_0182207110_p1841152153213"></a>Linux container security configuration.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **ContainerConfig**

    The API is used to specify all mandatory and optional fields for creating a container.

    <table><tbody><tr id="en-us_topic_0182207110_row35748215420"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p1957472104212"><a name="en-us_topic_0182207110_p1957472104212"></a><a name="en-us_topic_0182207110_p1957472104212"></a><strong id="en-us_topic_0182207110_b1675242117198"><a name="en-us_topic_0182207110_b1675242117198"></a><a name="en-us_topic_0182207110_b1675242117198"></a>Parameter</strong></p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p1657416234216"><a name="en-us_topic_0182207110_p1657416234216"></a><a name="en-us_topic_0182207110_p1657416234216"></a><strong id="en-us_topic_0182207110_b177911519141915"><a name="en-us_topic_0182207110_b177911519141915"></a><a name="en-us_topic_0182207110_b177911519141915"></a>Description</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row17575122124214"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p10388113084414"><a name="en-us_topic_0182207110_p10388113084414"></a><a name="en-us_topic_0182207110_p10388113084414"></a><a href="#en-us_topic_0182207110_li17135914132319">ContainerMetadata</a> metadata</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p16489112274513"><a name="en-us_topic_0182207110_p16489112274513"></a><a name="en-us_topic_0182207110_p16489112274513"></a>Container metadata. The information will uniquely identify a container and should be used at runtime to ensure correct operations. The information can also be used at runtime to optimize the user experience (UX) design, for example, construct a readable name. This parameter is mandatory.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row165752274211"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p20397114134715"><a name="en-us_topic_0182207110_p20397114134715"></a><a name="en-us_topic_0182207110_p20397114134715"></a><a href="#en-us_topic_0182207110_li597891416252">ImageSpec</a> image</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p125751227425"><a name="en-us_topic_0182207110_p125751227425"></a><a name="en-us_topic_0182207110_p125751227425"></a>Image used by the container. This parameter is mandatory.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1757512104211"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p1093425315472"><a name="en-us_topic_0182207110_p1093425315472"></a><a name="en-us_topic_0182207110_p1093425315472"></a>repeated string command</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p14575520422"><a name="en-us_topic_0182207110_p14575520422"></a><a name="en-us_topic_0182207110_p14575520422"></a>Command to be executed. Default value: <strong id="en-us_topic_0182207110_b3515921161115"><a name="en-us_topic_0182207110_b3515921161115"></a><a name="en-us_topic_0182207110_b3515921161115"></a>/bin/sh</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row15631191674812"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p16494161225018"><a name="en-us_topic_0182207110_p16494161225018"></a><a name="en-us_topic_0182207110_p16494161225018"></a>repeated string args</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p1463191694820"><a name="en-us_topic_0182207110_p1463191694820"></a><a name="en-us_topic_0182207110_p1463191694820"></a>Parameters of the command to be executed.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row15929104004811"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p12334191811500"><a name="en-us_topic_0182207110_p12334191811500"></a><a name="en-us_topic_0182207110_p12334191811500"></a>string working_dir</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p159291240184818"><a name="en-us_topic_0182207110_p159291240184818"></a><a name="en-us_topic_0182207110_p159291240184818"></a>Current working path of the command.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1640142916501"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p74711043155012"><a name="en-us_topic_0182207110_p74711043155012"></a><a name="en-us_topic_0182207110_p74711043155012"></a>repeated <a href="#en-us_topic_0182207110_li11598132815225">KeyValue</a> envs</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p124019291504"><a name="en-us_topic_0182207110_p124019291504"></a><a name="en-us_topic_0182207110_p124019291504"></a>Environment variables configured in the container.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row34224312518"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p19539458155110"><a name="en-us_topic_0182207110_p19539458155110"></a><a name="en-us_topic_0182207110_p19539458155110"></a>repeated <a href="#en-us_topic_0182207110_li6779341144216">Mount</a> mounts</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p34221531165114"><a name="en-us_topic_0182207110_p34221531165114"></a><a name="en-us_topic_0182207110_p34221531165114"></a>Information about the mount point to be mounted in the container.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1936219479538"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p19801913115411"><a name="en-us_topic_0182207110_p19801913115411"></a><a name="en-us_topic_0182207110_p19801913115411"></a>repeated <a href="#en-us_topic_0182207110_li19916726173311">Device</a> devices</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p15362184717536"><a name="en-us_topic_0182207110_p15362184717536"></a><a name="en-us_topic_0182207110_p15362184717536"></a>Information about the device to be mapped in the container.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1057365011549"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p918318587541"><a name="en-us_topic_0182207110_p918318587541"></a><a name="en-us_topic_0182207110_p918318587541"></a>map&lt;string, string&gt; labels</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p5574650165416"><a name="en-us_topic_0182207110_p5574650165416"></a><a name="en-us_topic_0182207110_p5574650165416"></a>Key-value pair that can be used to index and select a resource.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row717416214597"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p533396594"><a name="en-us_topic_0182207110_p533396594"></a><a name="en-us_topic_0182207110_p533396594"></a>map&lt;string, string&gt; annotations</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p1174102118599"><a name="en-us_topic_0182207110_p1174102118599"></a><a name="en-us_topic_0182207110_p1174102118599"></a>Unstructured key-value mappings that can be used to store and retrieve any metadata.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1673103817211"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p472415446214"><a name="en-us_topic_0182207110_p472415446214"></a><a name="en-us_topic_0182207110_p472415446214"></a>string log_path</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p192920136313"><a name="en-us_topic_0182207110_p192920136313"></a><a name="en-us_topic_0182207110_p192920136313"></a>Relative path to <strong id="en-us_topic_0182207110_b1765184218249"><a name="en-us_topic_0182207110_b1765184218249"></a><a name="en-us_topic_0182207110_b1765184218249"></a>PodSandboxConfig.LogDirectory</strong>, which is used to store logs (STDOUT and STDERR) on the container host.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row135091553839"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p17597120742"><a name="en-us_topic_0182207110_p17597120742"></a><a name="en-us_topic_0182207110_p17597120742"></a>bool stdin</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p750915531638"><a name="en-us_topic_0182207110_p750915531638"></a><a name="en-us_topic_0182207110_p750915531638"></a>Whether to open <strong id="en-us_topic_0182207110_b133213110292"><a name="en-us_topic_0182207110_b133213110292"></a><a name="en-us_topic_0182207110_b133213110292"></a>stdin</strong> of the container.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1901049174413"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p61419581447"><a name="en-us_topic_0182207110_p61419581447"></a><a name="en-us_topic_0182207110_p61419581447"></a>bool stdin_once</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p12147583446"><a name="en-us_topic_0182207110_p12147583446"></a><a name="en-us_topic_0182207110_p12147583446"></a>Whether to immediately disconnect other data flows connected with <strong id="en-us_topic_0182207110_b761311012317"><a name="en-us_topic_0182207110_b761311012317"></a><a name="en-us_topic_0182207110_b761311012317"></a>stdin</strong> when a data flow connected with <strong id="en-us_topic_0182207110_b9820101603120"><a name="en-us_topic_0182207110_b9820101603120"></a><a name="en-us_topic_0182207110_b9820101603120"></a>stdin</strong> is disconnected. This parameter does not take effect now.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1922645374411"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p7645558174413"><a name="en-us_topic_0182207110_p7645558174413"></a><a name="en-us_topic_0182207110_p7645558174413"></a>bool tty</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p156455589448"><a name="en-us_topic_0182207110_p156455589448"></a><a name="en-us_topic_0182207110_p156455589448"></a>Whether to use a pseudo terminal to connect to <strong id="en-us_topic_0182207110_b1249424617317"><a name="en-us_topic_0182207110_b1249424617317"></a><a name="en-us_topic_0182207110_b1249424617317"></a>stdio</strong> of the container.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row13317210511"><td class="cellrowborder" valign="top" width="40.699999999999996%"><p id="en-us_topic_0182207110_p1564317611612"><a name="en-us_topic_0182207110_p1564317611612"></a><a name="en-us_topic_0182207110_p1564317611612"></a><a href="#en-us_topic_0182207110_li13021147134718">LinuxContainerConfig</a> linux</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.3%"><p id="en-us_topic_0182207110_p13335211515"><a name="en-us_topic_0182207110_p13335211515"></a><a name="en-us_topic_0182207110_p13335211515"></a>Container configuration information in the Linux system.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **NetworkConfig**

    This API is used to specify runtime network configurations.

    <table><tbody><tr id="en-us_topic_0182207110_row1722121414463"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p12217144461"><a name="en-us_topic_0182207110_p12217144461"></a><a name="en-us_topic_0182207110_p12217144461"></a><strong id="en-us_topic_0182207110_b1661173113196"><a name="en-us_topic_0182207110_b1661173113196"></a><a name="en-us_topic_0182207110_b1661173113196"></a>Parameter</strong></p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p14225144465"><a name="en-us_topic_0182207110_p14225144465"></a><a name="en-us_topic_0182207110_p14225144465"></a><strong id="en-us_topic_0182207110_b191825338191"><a name="en-us_topic_0182207110_b191825338191"></a><a name="en-us_topic_0182207110_b191825338191"></a>Description</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row1122111418463"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p122211417468"><a name="en-us_topic_0182207110_p122211417468"></a><a name="en-us_topic_0182207110_p122211417468"></a>string pod_cidr</p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p922181415468"><a name="en-us_topic_0182207110_p922181415468"></a><a name="en-us_topic_0182207110_p922181415468"></a>CIDR used by pod IP addresses.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **RuntimeConfig**

    This API is used to specify runtime network configurations.

    <table><tbody><tr id="en-us_topic_0182207110_row104401858104711"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p34401589471"><a name="en-us_topic_0182207110_p34401589471"></a><a name="en-us_topic_0182207110_p34401589471"></a><strong id="en-us_topic_0182207110_b186461407192"><a name="en-us_topic_0182207110_b186461407192"></a><a name="en-us_topic_0182207110_b186461407192"></a>Parameter</strong></p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p1444015834710"><a name="en-us_topic_0182207110_p1444015834710"></a><a name="en-us_topic_0182207110_p1444015834710"></a><strong id="en-us_topic_0182207110_b6629134217198"><a name="en-us_topic_0182207110_b6629134217198"></a><a name="en-us_topic_0182207110_b6629134217198"></a>Description</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row174406581478"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p164406586473"><a name="en-us_topic_0182207110_p164406586473"></a><a name="en-us_topic_0182207110_p164406586473"></a><a href="#en-us_topic_0182207110_li12222146464">NetworkConfig</a> network_config</p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p16440135824717"><a name="en-us_topic_0182207110_p16440135824717"></a><a name="en-us_topic_0182207110_p16440135824717"></a>Runtime network configurations.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **RuntimeCondition**

    The API is used to describe runtime status information.

    <table><tbody><tr id="en-us_topic_0182207110_row549391719578"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p16493217155713"><a name="en-us_topic_0182207110_p16493217155713"></a><a name="en-us_topic_0182207110_p16493217155713"></a><strong id="en-us_topic_0182207110_b13955134981914"><a name="en-us_topic_0182207110_b13955134981914"></a><a name="en-us_topic_0182207110_b13955134981914"></a>Parameter</strong></p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p1749301713578"><a name="en-us_topic_0182207110_p1749301713578"></a><a name="en-us_topic_0182207110_p1749301713578"></a><strong id="en-us_topic_0182207110_b1892365213194"><a name="en-us_topic_0182207110_b1892365213194"></a><a name="en-us_topic_0182207110_b1892365213194"></a>Description</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row18493141795713"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p19493151765717"><a name="en-us_topic_0182207110_p19493151765717"></a><a name="en-us_topic_0182207110_p19493151765717"></a>string type</p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p17493161719576"><a name="en-us_topic_0182207110_p17493161719576"></a><a name="en-us_topic_0182207110_p17493161719576"></a>Runtime status type.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row767112245813"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p1671426589"><a name="en-us_topic_0182207110_p1671426589"></a><a name="en-us_topic_0182207110_p1671426589"></a>bool status</p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p13671328589"><a name="en-us_topic_0182207110_p13671328589"></a><a name="en-us_topic_0182207110_p13671328589"></a>Runtime status.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row38518584"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p48417586"><a name="en-us_topic_0182207110_p48417586"></a><a name="en-us_topic_0182207110_p48417586"></a>string reason</p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p16919175818"><a name="en-us_topic_0182207110_p16919175818"></a><a name="en-us_topic_0182207110_p16919175818"></a>Brief description of the reason for the runtime status change.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row12981958155716"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p19915581570"><a name="en-us_topic_0182207110_p19915581570"></a><a name="en-us_topic_0182207110_p19915581570"></a>string message</p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p39995818579"><a name="en-us_topic_0182207110_p39995818579"></a><a name="en-us_topic_0182207110_p39995818579"></a>Message with high readability, which indicates the reason for the runtime status change.</p>
    </td>
    </tr>
    </tbody>
    </table>
    
-   **RuntimeStatus**

    The API is used to describe runtime status.

    <table><tbody><tr id="en-us_topic_0182207110_row1225814635519"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p1125820695515"><a name="en-us_topic_0182207110_p1125820695515"></a><a name="en-us_topic_0182207110_p1125820695515"></a><strong id="en-us_topic_0182207110_b102891312206"><a name="en-us_topic_0182207110_b102891312206"></a><a name="en-us_topic_0182207110_b102891312206"></a>Parameter</strong></p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p12587625511"><a name="en-us_topic_0182207110_p12587625511"></a><a name="en-us_topic_0182207110_p12587625511"></a><strong id="en-us_topic_0182207110_b75452492018"><a name="en-us_topic_0182207110_b75452492018"></a><a name="en-us_topic_0182207110_b75452492018"></a>Description</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0182207110_row225811655518"><td class="cellrowborder" valign="top" width="41.06%"><p id="en-us_topic_0182207110_p102589635513"><a name="en-us_topic_0182207110_p102589635513"></a><a name="en-us_topic_0182207110_p102589635513"></a>repeated RuntimeCondition conditions</p>
    </td>
    <td class="cellrowborder" valign="top" width="58.940000000000005%"><p id="en-us_topic_0182207110_p32581661554"><a name="en-us_topic_0182207110_p32581661554"></a><a name="en-us_topic_0182207110_p32581661554"></a>List of current runtime status.</p>
    </td>
    </tr>
    </tbody>
    </table>




### Runtime Service

The runtime service provides APIs for operating pods and containers, and APIs for querying the configuration and status information of the runtime service.



#### RunPodSandbox

#### Prototype

```
rpc RunPodSandbox(RunPodSandboxRequest) returns (RunPodSandboxResponse) {}
```

#### Description

This API is used to create and start a PodSandbox. If the PodSandbox is successfully run, the sandbox is in the ready state.

#### Precautions

1.  The default image for starting a sandbox is  **rnd-dockerhub.huawei.com/library/pause-$\{**_machine_**\}:3.0**  where  **$\{**_machine_**\}**  indicates the architecture. On x86\_64, the value of  _machine_  is  **amd64**. On ARM64, the value of  _machine_  is  **aarch64**. Currently, only the  **amd64**  or  **aarch64**  image can be downloaded from the rnd-dockerhub registry. If the image does not exist on the host, ensure that the host can download the image from the rnd-dockerhub registry. If you want to use another image, refer to  **pod-sandbox-image**  in the  _iSulad Deployment Configuration_.
2.  The container name is obtained from fields in  [PodSandboxMetadata](#apis.md#en-us_topic_0182207110_li2359918134912)  and separated by underscores \(\_\). Therefore, the metadata cannot contain underscores \(\_\). Otherwise, the  [ListPodSandbox](#listpodsandbox.md#EN-US_TOPIC_0184808098)  API cannot be used for query even when the sandbox is running successfully.

#### Parameters

<a name="en-us_topic_0183088020_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088020_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088020_p1089154617315"><a name="en-us_topic_0183088020_p1089154617315"></a><a name="en-us_topic_0183088020_p1089154617315"></a><strong id="en-us_topic_0183088020_b19850130121011"><a name="en-us_topic_0183088020_b19850130121011"></a><a name="en-us_topic_0183088020_b19850130121011"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088020_p128984613319"><a name="en-us_topic_0183088020_p128984613319"></a><a name="en-us_topic_0183088020_p128984613319"></a><strong id="en-us_topic_0183088020_b18538114121020"><a name="en-us_topic_0183088020_b18538114121020"></a><a name="en-us_topic_0183088020_b18538114121020"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088020_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088020_p108924616314"><a name="en-us_topic_0183088020_p108924616314"></a><a name="en-us_topic_0183088020_p108924616314"></a><a href="#apis.md#en-us_topic_0182207110_li253629701">PodSandboxConfig</a> config</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088020_p1189846434"><a name="en-us_topic_0183088020_p1189846434"></a><a name="en-us_topic_0183088020_p1189846434"></a>Sandbox configuration.</p>
</td>
</tr>
<tr id="en-us_topic_0183088020_row10474111914249"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088020_p547481942417"><a name="en-us_topic_0183088020_p547481942417"></a><a name="en-us_topic_0183088020_p547481942417"></a>string runtime_handler</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088020_p144745192249"><a name="en-us_topic_0183088020_p144745192249"></a><a name="en-us_topic_0183088020_p144745192249"></a>Runtime for the created sandbox. Currently, lcr and kata-runtime are supported.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088020_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088020_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088020_p197485518319"><a name="en-us_topic_0183088020_p197485518319"></a><a name="en-us_topic_0183088020_p197485518319"></a><strong id="en-us_topic_0183088020_b38651243191019"><a name="en-us_topic_0183088020_b38651243191019"></a><a name="en-us_topic_0183088020_b38651243191019"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088020_p374185520310"><a name="en-us_topic_0183088020_p374185520310"></a><a name="en-us_topic_0183088020_p374185520310"></a><strong id="en-us_topic_0183088020_b7121174641017"><a name="en-us_topic_0183088020_b7121174641017"></a><a name="en-us_topic_0183088020_b7121174641017"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088020_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088020_p157445512318"><a name="en-us_topic_0183088020_p157445512318"></a><a name="en-us_topic_0183088020_p157445512318"></a>string pod_sandbox_id</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088020_p14745551137"><a name="en-us_topic_0183088020_p14745551137"></a><a name="en-us_topic_0183088020_p14745551137"></a>If the operation is successful, the response is returned. </p>
</td>
</tr>
</tbody>
</table>

#### StopPodSandbox

#### Prototype

```
rpc StopPodSandbox(StopPodSandboxRequest) returns (StopPodSandboxResponse) {}
```

#### Description

This API is used to stop PodSandboxes and sandbox containers, and reclaim the network resources \(such as IP addresses\) allocated to a sandbox. If any running container belongs to the sandbox, the container must be forcibly stopped.

#### Parameters

<a name="en-us_topic_0183088041_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088041_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088041_p1089154617315"><a name="en-us_topic_0183088041_p1089154617315"></a><a name="en-us_topic_0183088041_p1089154617315"></a><strong id="en-us_topic_0183088041_b9225135531110"><a name="en-us_topic_0183088041_b9225135531110"></a><a name="en-us_topic_0183088041_b9225135531110"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088041_p128984613319"><a name="en-us_topic_0183088041_p128984613319"></a><a name="en-us_topic_0183088041_p128984613319"></a><strong id="en-us_topic_0183088041_b8601105841120"><a name="en-us_topic_0183088041_b8601105841120"></a><a name="en-us_topic_0183088041_b8601105841120"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088041_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088041_p1893714794317"><a name="en-us_topic_0183088041_p1893714794317"></a><a name="en-us_topic_0183088041_p1893714794317"></a>string pod_sandbox_id</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088041_p1189846434"><a name="en-us_topic_0183088041_p1189846434"></a><a name="en-us_topic_0183088041_p1189846434"></a>Sandbox ID.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088041_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088041_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088041_p197485518319"><a name="en-us_topic_0183088041_p197485518319"></a><a name="en-us_topic_0183088041_p197485518319"></a><strong id="en-us_topic_0183088041_b1870519310124"><a name="en-us_topic_0183088041_b1870519310124"></a><a name="en-us_topic_0183088041_b1870519310124"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088041_p374185520310"><a name="en-us_topic_0183088041_p374185520310"></a><a name="en-us_topic_0183088041_p374185520310"></a><strong id="en-us_topic_0183088041_b249619618126"><a name="en-us_topic_0183088041_b249619618126"></a><a name="en-us_topic_0183088041_b249619618126"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088041_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088041_p1772427114513"><a name="en-us_topic_0183088041_p1772427114513"></a><a name="en-us_topic_0183088041_p1772427114513"></a>None</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088041_p14745551137"><a name="en-us_topic_0183088041_p14745551137"></a><a name="en-us_topic_0183088041_p14745551137"></a>None</p>
</td>
</tr>
</tbody>
</table>

#### RemovePodSandbox

#### Prototype

```
rpc RemovePodSandbox(RemovePodSandboxRequest) returns (RemovePodSandboxResponse) {}
```

#### Description

This API is used to delete a sandbox. If any running container belongs to the sandbox, the container must be forcibly stopped and deleted. If the sandbox has been deleted, no errors will be returned.

#### Precautions

1. When a sandbox is deleted, network resources of the sandbox are not deleted. Before deleting a pod, you must call StopPodSandbox to clear network resources. Ensure that StopPodSandbox is called at least once before deleting the sandbox.

#### Parameters

<a name="en-us_topic_0183088042_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088042_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088042_p1089154617315"><a name="en-us_topic_0183088042_p1089154617315"></a><a name="en-us_topic_0183088042_p1089154617315"></a><strong id="en-us_topic_0183088042_b1393115217121"><a name="en-us_topic_0183088042_b1393115217121"></a><a name="en-us_topic_0183088042_b1393115217121"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088042_p128984613319"><a name="en-us_topic_0183088042_p128984613319"></a><a name="en-us_topic_0183088042_p128984613319"></a><strong id="en-us_topic_0183088042_b1241655420126"><a name="en-us_topic_0183088042_b1241655420126"></a><a name="en-us_topic_0183088042_b1241655420126"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088042_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088042_p1893714794317"><a name="en-us_topic_0183088042_p1893714794317"></a><a name="en-us_topic_0183088042_p1893714794317"></a>string pod_sandbox_id</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088042_p1189846434"><a name="en-us_topic_0183088042_p1189846434"></a><a name="en-us_topic_0183088042_p1189846434"></a>Sandbox ID.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088042_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088042_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088042_p197485518319"><a name="en-us_topic_0183088042_p197485518319"></a><a name="en-us_topic_0183088042_p197485518319"></a><strong id="en-us_topic_0183088042_b12209105916124"><a name="en-us_topic_0183088042_b12209105916124"></a><a name="en-us_topic_0183088042_b12209105916124"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088042_p374185520310"><a name="en-us_topic_0183088042_p374185520310"></a><a name="en-us_topic_0183088042_p374185520310"></a><strong id="en-us_topic_0183088042_b1354412113138"><a name="en-us_topic_0183088042_b1354412113138"></a><a name="en-us_topic_0183088042_b1354412113138"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088042_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088042_p1772427114513"><a name="en-us_topic_0183088042_p1772427114513"></a><a name="en-us_topic_0183088042_p1772427114513"></a>None</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088042_p14745551137"><a name="en-us_topic_0183088042_p14745551137"></a><a name="en-us_topic_0183088042_p14745551137"></a>None</p>
</td>
</tr>
</tbody>
</table>

#### PodSandboxStatus

#### Prototype

```
rpc PodSandboxStatus(PodSandboxStatusRequest) returns (PodSandboxStatusResponse) {}
```

#### Description

This API is used to query the sandbox status. If the sandbox does not exist, an error is returned.

#### Parameters

<a name="en-us_topic_0183088043_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088043_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088043_p1089154617315"><a name="en-us_topic_0183088043_p1089154617315"></a><a name="en-us_topic_0183088043_p1089154617315"></a><strong id="en-us_topic_0183088043_b5464849181310"><a name="en-us_topic_0183088043_b5464849181310"></a><a name="en-us_topic_0183088043_b5464849181310"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088043_p128984613319"><a name="en-us_topic_0183088043_p128984613319"></a><a name="en-us_topic_0183088043_p128984613319"></a><strong id="en-us_topic_0183088043_b34165533138"><a name="en-us_topic_0183088043_b34165533138"></a><a name="en-us_topic_0183088043_b34165533138"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088043_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088043_p1893714794317"><a name="en-us_topic_0183088043_p1893714794317"></a><a name="en-us_topic_0183088043_p1893714794317"></a>string pod_sandbox_id</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088043_p1189846434"><a name="en-us_topic_0183088043_p1189846434"></a><a name="en-us_topic_0183088043_p1189846434"></a>Sandbox ID</p>
</td>
</tr>
<tr id="en-us_topic_0183088043_row1856117814815"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088043_p956148114812"><a name="en-us_topic_0183088043_p956148114812"></a><a name="en-us_topic_0183088043_p956148114812"></a>bool verbose</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088043_p155615864815"><a name="en-us_topic_0183088043_p155615864815"></a><a name="en-us_topic_0183088043_p155615864815"></a>Whether to display additional information about the sandbox. This parameter does not take effect now.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088043_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088043_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088043_p197485518319"><a name="en-us_topic_0183088043_p197485518319"></a><a name="en-us_topic_0183088043_p197485518319"></a><strong id="en-us_topic_0183088043_b7681103411314"><a name="en-us_topic_0183088043_b7681103411314"></a><a name="en-us_topic_0183088043_b7681103411314"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088043_p374185520310"><a name="en-us_topic_0183088043_p374185520310"></a><a name="en-us_topic_0183088043_p374185520310"></a><strong id="en-us_topic_0183088043_b176333271319"><a name="en-us_topic_0183088043_b176333271319"></a><a name="en-us_topic_0183088043_b176333271319"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088043_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088043_p157445512318"><a name="en-us_topic_0183088043_p157445512318"></a><a name="en-us_topic_0183088043_p157445512318"></a><a href="#apis.md#en-us_topic_0182207110_li146986172010">PodSandboxStatus</a> status</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088043_p14745551137"><a name="en-us_topic_0183088043_p14745551137"></a><a name="en-us_topic_0183088043_p14745551137"></a>Status of the sandbox.</p>
</td>
</tr>
<tr id="en-us_topic_0183088043_row27545518311"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088043_p953212217505"><a name="en-us_topic_0183088043_p953212217505"></a><a name="en-us_topic_0183088043_p953212217505"></a>map&lt;string, string&gt; info</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088043_p47512557310"><a name="en-us_topic_0183088043_p47512557310"></a><a name="en-us_topic_0183088043_p47512557310"></a>Additional information about the sandbox. The key can be any string, and the value is a JSON character string. The information can be any debugging content. When <strong id="en-us_topic_0183088043_b1311520217461"><a name="en-us_topic_0183088043_b1311520217461"></a><a name="en-us_topic_0183088043_b1311520217461"></a>verbose</strong> is set to <strong id="en-us_topic_0183088043_b5888112594613"><a name="en-us_topic_0183088043_b5888112594613"></a><a name="en-us_topic_0183088043_b5888112594613"></a>true</strong>, <strong id="en-us_topic_0183088043_b15182129114614"><a name="en-us_topic_0183088043_b15182129114614"></a><a name="en-us_topic_0183088043_b15182129114614"></a>info</strong> cannot be empty. This parameter does not take effect now.</p>
</td>
</tr>
</tbody>
</table>

#### ListPodSandbox

#### Prototype

```
rpc ListPodSandbox(ListPodSandboxRequest) returns (ListPodSandboxResponse) {}
```

#### Description

This API is used to return the sandbox information list. Filtering based on criteria is supported.

#### Parameters

<a name="en-us_topic_0183088044_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088044_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088044_p1089154617315"><a name="en-us_topic_0183088044_p1089154617315"></a><a name="en-us_topic_0183088044_p1089154617315"></a><strong id="en-us_topic_0183088044_b1875320301148"><a name="en-us_topic_0183088044_b1875320301148"></a><a name="en-us_topic_0183088044_b1875320301148"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088044_p128984613319"><a name="en-us_topic_0183088044_p128984613319"></a><a name="en-us_topic_0183088044_p128984613319"></a><strong id="en-us_topic_0183088044_b1548883318148"><a name="en-us_topic_0183088044_b1548883318148"></a><a name="en-us_topic_0183088044_b1548883318148"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088044_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088044_p47762110579"><a name="en-us_topic_0183088044_p47762110579"></a><a name="en-us_topic_0183088044_p47762110579"></a><a href="#apis.md#en-us_topic_0182207110_li17913177201">PodSandboxFilter</a> filter</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088044_p1189846434"><a name="en-us_topic_0183088044_p1189846434"></a><a name="en-us_topic_0183088044_p1189846434"></a>Filter criteria.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088044_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088044_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088044_p197485518319"><a name="en-us_topic_0183088044_p197485518319"></a><a name="en-us_topic_0183088044_p197485518319"></a><strong id="en-us_topic_0183088044_b418124251415"><a name="en-us_topic_0183088044_b418124251415"></a><a name="en-us_topic_0183088044_b418124251415"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088044_p374185520310"><a name="en-us_topic_0183088044_p374185520310"></a><a name="en-us_topic_0183088044_p374185520310"></a><strong id="en-us_topic_0183088044_b185713430141"><a name="en-us_topic_0183088044_b185713430141"></a><a name="en-us_topic_0183088044_b185713430141"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088044_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088044_p1118315385563"><a name="en-us_topic_0183088044_p1118315385563"></a><a name="en-us_topic_0183088044_p1118315385563"></a>repeated <a href="#apis.md#en-us_topic_0182207110_li10542191117207">PodSandbox</a> items</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088044_p518373814560"><a name="en-us_topic_0183088044_p518373814560"></a><a name="en-us_topic_0183088044_p518373814560"></a>Sandbox information list.</p>
</td>
</tr>
</tbody>
</table>

#### CreateContainer

```
grpc::Status CreateContainer(grpc::ServerContext *context, const runtime::CreateContainerRequest *request, runtime::CreateContainerResponse *reply) {}
```

#### Description

This API is used to create a container in the PodSandbox.

#### Precautions

-   **sandbox\_config**  in** CreateContainerRequest**  is the same as the configuration transferred to  **RunPodSandboxRequest**  to create a PodSandbox. It is transferred again for reference only. PodSandboxConfig must remain unchanged throughout the lifecycle of a pod.
-   The container name is obtained from fields in  [ContainerMetadata](#apis.md#en-us_topic_0182207110_li17135914132319)  and separated by underscores \(\_\). Therefore, the metadata cannot contain underscores \(\_\). Otherwise, the  [ListContainers](#listcontainers.md#EN-US_TOPIC_0184808103)  API cannot be used for query even when the sandbox is running successfully.
-   **CreateContainerRequest**  does not contain the  **runtime\_handler**  field. The runtime type of the container is the same as that of the corresponding sandbox.

#### Parameters

<a name="en-us_topic_0183088045_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088045_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088045_p1089154617315"><a name="en-us_topic_0183088045_p1089154617315"></a><a name="en-us_topic_0183088045_p1089154617315"></a><strong id="en-us_topic_0183088045_b548313557141"><a name="en-us_topic_0183088045_b548313557141"></a><a name="en-us_topic_0183088045_b548313557141"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088045_p128984613319"><a name="en-us_topic_0183088045_p128984613319"></a><a name="en-us_topic_0183088045_p128984613319"></a><strong id="en-us_topic_0183088045_b192751657131410"><a name="en-us_topic_0183088045_b192751657131410"></a><a name="en-us_topic_0183088045_b192751657131410"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088045_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088045_p114454389351"><a name="en-us_topic_0183088045_p114454389351"></a><a name="en-us_topic_0183088045_p114454389351"></a>string  pod_sandbox_id</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088045_p16591797361"><a name="en-us_topic_0183088045_p16591797361"></a><a name="en-us_topic_0183088045_p16591797361"></a>ID of the PodSandbox where a container is to be created.</p>
</td>
</tr>
<tr id="en-us_topic_0183088045_row17894468314"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088045_p1489111122411"><a name="en-us_topic_0183088045_p1489111122411"></a><a name="en-us_topic_0183088045_p1489111122411"></a><a href="#apis.md#en-us_topic_0182207110_li9517163811284">ContainerConfig</a> config</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088045_p780820166266"><a name="en-us_topic_0183088045_p780820166266"></a><a name="en-us_topic_0183088045_p780820166266"></a>Container configuration information.</p>
</td>
</tr>
<tr id="en-us_topic_0183088045_row4812119101610"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088045_p89345298375"><a name="en-us_topic_0183088045_p89345298375"></a><a name="en-us_topic_0183088045_p89345298375"></a><a href="#apis.md#en-us_topic_0182207110_li253629701">PodSandboxConfig</a> sandbox_config</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088045_p516113378378"><a name="en-us_topic_0183088045_p516113378378"></a><a name="en-us_topic_0183088045_p516113378378"></a>PodSandbox configuration information.</p>
</td>
</tr>
</tbody>
</table>

#### Supplement

Unstructured key-value mappings that can be used to store and retrieve any metadata. The field can be used to transfer parameters for the fields for which the CRI does not provide specific parameters.

-   Customize the field:

    <a name="en-us_topic_0183088045_table18570435155317"></a>
    <table><tbody><tr id="en-us_topic_0183088045_row961273515313"><td class="cellrowborder" valign="top" width="50%"><p id="en-us_topic_0183088045_p146121535155310"><a name="en-us_topic_0183088045_p146121535155310"></a><a name="en-us_topic_0183088045_p146121535155310"></a><strong id="en-us_topic_0183088045_b6471318131516"><a name="en-us_topic_0183088045_b6471318131516"></a><a name="en-us_topic_0183088045_b6471318131516"></a>Custom key:value</strong></p>
    </td>
    <td class="cellrowborder" valign="top" width="50%"><p id="en-us_topic_0183088045_p1861233511533"><a name="en-us_topic_0183088045_p1861233511533"></a><a name="en-us_topic_0183088045_p1861233511533"></a><strong id="en-us_topic_0183088045_b108031524131516"><a name="en-us_topic_0183088045_b108031524131516"></a><a name="en-us_topic_0183088045_b108031524131516"></a>Description</strong></p>
    </td>
    </tr>
    <tr id="en-us_topic_0183088045_row761273525315"><td class="cellrowborder" valign="top" width="50%"><p id="en-us_topic_0183088045_p221701745415"><a name="en-us_topic_0183088045_p221701745415"></a><a name="en-us_topic_0183088045_p221701745415"></a>cgroup.pids.max:int64_t</p>
    </td>
    <td class="cellrowborder" valign="top" width="50%"><p id="en-us_topic_0183088045_p1475318795514"><a name="en-us_topic_0183088045_p1475318795514"></a><a name="en-us_topic_0183088045_p1475318795514"></a>Used to limit the number of processes or threads in a container. (Set the parameter to <strong id="en-us_topic_0183088045_b8719165813485"><a name="en-us_topic_0183088045_b8719165813485"></a><a name="en-us_topic_0183088045_b8719165813485"></a>-1</strong> for unlimited number.)</p>
    </td>
    </tr>
    </tbody>
    </table>


#### Return Values

<a name="en-us_topic_0183088045_table1526093165012"></a>
<table><tbody><tr id="en-us_topic_0183088045_row926093115015"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088045_p14260143155018"><a name="en-us_topic_0183088045_p14260143155018"></a><a name="en-us_topic_0183088045_p14260143155018"></a><strong id="en-us_topic_0183088045_b483554020153"><a name="en-us_topic_0183088045_b483554020153"></a><a name="en-us_topic_0183088045_b483554020153"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088045_p62602031155019"><a name="en-us_topic_0183088045_p62602031155019"></a><a name="en-us_topic_0183088045_p62602031155019"></a><strong id="en-us_topic_0183088045_b10595238191520"><a name="en-us_topic_0183088045_b10595238191520"></a><a name="en-us_topic_0183088045_b10595238191520"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088045_row326093175014"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088045_p3480192112404"><a name="en-us_topic_0183088045_p3480192112404"></a><a name="en-us_topic_0183088045_p3480192112404"></a>string container_id</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088045_p14745551137"><a name="en-us_topic_0183088045_p14745551137"></a><a name="en-us_topic_0183088045_p14745551137"></a>ID of the created container.</p>
</td>
</tr>
</tbody>
</table>

#### StartContainer

#### Prototype

```
rpc StartContainer(StartContainerRequest) returns (StartContainerResponse) {}
```

#### Description

This API is used to start a container.

#### Parameters

<a name="en-us_topic_0183088046_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088046_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088046_p1089154617315"><a name="en-us_topic_0183088046_p1089154617315"></a><a name="en-us_topic_0183088046_p1089154617315"></a><strong id="en-us_topic_0183088046_b757192516228"><a name="en-us_topic_0183088046_b757192516228"></a><a name="en-us_topic_0183088046_b757192516228"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088046_p128984613319"><a name="en-us_topic_0183088046_p128984613319"></a><a name="en-us_topic_0183088046_p128984613319"></a><strong id="en-us_topic_0183088046_b5867182912212"><a name="en-us_topic_0183088046_b5867182912212"></a><a name="en-us_topic_0183088046_b5867182912212"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088046_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088046_p1019112316015"><a name="en-us_topic_0183088046_p1019112316015"></a><a name="en-us_topic_0183088046_p1019112316015"></a>string container_id</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088046_p1189846434"><a name="en-us_topic_0183088046_p1189846434"></a><a name="en-us_topic_0183088046_p1189846434"></a>Container ID.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088046_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088046_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088046_p197485518319"><a name="en-us_topic_0183088046_p197485518319"></a><a name="en-us_topic_0183088046_p197485518319"></a><strong id="en-us_topic_0183088046_b108585353229"><a name="en-us_topic_0183088046_b108585353229"></a><a name="en-us_topic_0183088046_b108585353229"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088046_p374185520310"><a name="en-us_topic_0183088046_p374185520310"></a><a name="en-us_topic_0183088046_p374185520310"></a><strong id="en-us_topic_0183088046_b1565116384224"><a name="en-us_topic_0183088046_b1565116384224"></a><a name="en-us_topic_0183088046_b1565116384224"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088046_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088046_p554418192002"><a name="en-us_topic_0183088046_p554418192002"></a><a name="en-us_topic_0183088046_p554418192002"></a>None</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088046_p4543101912019"><a name="en-us_topic_0183088046_p4543101912019"></a><a name="en-us_topic_0183088046_p4543101912019"></a>None</p>
</td>
</tr>
</tbody>
</table>

#### StopContainer

#### Prototype

```
rpc StopContainer(StopContainerRequest) returns (StopContainerResponse) {}
```

#### Description

This API is used to stop a running container. You can set a graceful timeout time. If the container has been stopped, no errors will be returned.

#### Parameters

<a name="en-us_topic_0183088047_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088047_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088047_p1089154617315"><a name="en-us_topic_0183088047_p1089154617315"></a><a name="en-us_topic_0183088047_p1089154617315"></a><strong id="en-us_topic_0183088047_b1123926142312"><a name="en-us_topic_0183088047_b1123926142312"></a><a name="en-us_topic_0183088047_b1123926142312"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088047_p128984613319"><a name="en-us_topic_0183088047_p128984613319"></a><a name="en-us_topic_0183088047_p128984613319"></a><strong id="en-us_topic_0183088047_b12768152862316"><a name="en-us_topic_0183088047_b12768152862316"></a><a name="en-us_topic_0183088047_b12768152862316"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088047_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088047_p1019112316015"><a name="en-us_topic_0183088047_p1019112316015"></a><a name="en-us_topic_0183088047_p1019112316015"></a>string container_id</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088047_p1189846434"><a name="en-us_topic_0183088047_p1189846434"></a><a name="en-us_topic_0183088047_p1189846434"></a>Container ID.</p>
</td>
</tr>
<tr id="en-us_topic_0183088047_row660924815015"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088047_p06097481802"><a name="en-us_topic_0183088047_p06097481802"></a><a name="en-us_topic_0183088047_p06097481802"></a>int64 timeout</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088047_p360920481009"><a name="en-us_topic_0183088047_p360920481009"></a><a name="en-us_topic_0183088047_p360920481009"></a>Waiting time before a container is forcibly stopped. The default value is <strong id="en-us_topic_0183088047_b17804204712523"><a name="en-us_topic_0183088047_b17804204712523"></a><a name="en-us_topic_0183088047_b17804204712523"></a>0</strong>, indicating forcible stop.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

None

#### RemoveContainer

#### Prototype

```
rpc RemoveContainer(RemoveContainerRequest) returns (RemoveContainerResponse) {}
```

#### Description

This API is used to delete a container. If the container is running, it must be forcibly stopped. If the container has been deleted, no errors will be returned.

#### Parameters

<a name="en-us_topic_0183088048_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088048_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088048_p1089154617315"><a name="en-us_topic_0183088048_p1089154617315"></a><a name="en-us_topic_0183088048_p1089154617315"></a><strong id="en-us_topic_0183088048_b1546416511236"><a name="en-us_topic_0183088048_b1546416511236"></a><a name="en-us_topic_0183088048_b1546416511236"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088048_p128984613319"><a name="en-us_topic_0183088048_p128984613319"></a><a name="en-us_topic_0183088048_p128984613319"></a><strong id="en-us_topic_0183088048_b9896135362312"><a name="en-us_topic_0183088048_b9896135362312"></a><a name="en-us_topic_0183088048_b9896135362312"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088048_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088048_p1019112316015"><a name="en-us_topic_0183088048_p1019112316015"></a><a name="en-us_topic_0183088048_p1019112316015"></a>string container_id</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088048_p1189846434"><a name="en-us_topic_0183088048_p1189846434"></a><a name="en-us_topic_0183088048_p1189846434"></a>Container ID.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

None

#### ListContainers

#### Prototype

```
rpc ListContainers(ListContainersRequest) returns (ListContainersResponse) {}
```

#### Description

This API is used to return the container information list. Filtering based on criteria is supported.

#### Parameters

<a name="en-us_topic_0183088049_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088049_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088049_p1089154617315"><a name="en-us_topic_0183088049_p1089154617315"></a><a name="en-us_topic_0183088049_p1089154617315"></a><strong id="en-us_topic_0183088049_b3883133218265"><a name="en-us_topic_0183088049_b3883133218265"></a><a name="en-us_topic_0183088049_b3883133218265"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088049_p128984613319"><a name="en-us_topic_0183088049_p128984613319"></a><a name="en-us_topic_0183088049_p128984613319"></a><strong id="en-us_topic_0183088049_b197631835112616"><a name="en-us_topic_0183088049_b197631835112616"></a><a name="en-us_topic_0183088049_b197631835112616"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088049_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088049_p1356616573315"><a name="en-us_topic_0183088049_p1356616573315"></a><a name="en-us_topic_0183088049_p1356616573315"></a><a href="#apis.md#en-us_topic_0182207110_li780212262306">ContainerFilter</a> filter</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088049_p1189846434"><a name="en-us_topic_0183088049_p1189846434"></a><a name="en-us_topic_0183088049_p1189846434"></a>Filter criteria.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088049_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088049_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088049_p197485518319"><a name="en-us_topic_0183088049_p197485518319"></a><a name="en-us_topic_0183088049_p197485518319"></a><strong id="en-us_topic_0183088049_b23465396278"><a name="en-us_topic_0183088049_b23465396278"></a><a name="en-us_topic_0183088049_b23465396278"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088049_p374185520310"><a name="en-us_topic_0183088049_p374185520310"></a><a name="en-us_topic_0183088049_p374185520310"></a><strong id="en-us_topic_0183088049_b13785104117278"><a name="en-us_topic_0183088049_b13785104117278"></a><a name="en-us_topic_0183088049_b13785104117278"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088049_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088049_p3465158518"><a name="en-us_topic_0183088049_p3465158518"></a><a name="en-us_topic_0183088049_p3465158518"></a>repeated <a href="#apis.md#en-us_topic_0182207110_li2063672883012">Container</a> containers</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088049_p14745551137"><a name="en-us_topic_0183088049_p14745551137"></a><a name="en-us_topic_0183088049_p14745551137"></a>Container information list.</p>
</td>
</tr>
</tbody>
</table>

#### ContainerStatus

#### Prototype

```
rpc ContainerStatus(ContainerStatusRequest) returns (ContainerStatusResponse) {}
```

#### Description

This API is used to return the container status information. If the container does not exist, an error will be returned.

#### Parameters

<a name="en-us_topic_0183088050_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088050_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088050_p1089154617315"><a name="en-us_topic_0183088050_p1089154617315"></a><a name="en-us_topic_0183088050_p1089154617315"></a><strong id="en-us_topic_0183088050_b10433175315277"><a name="en-us_topic_0183088050_b10433175315277"></a><a name="en-us_topic_0183088050_b10433175315277"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088050_p128984613319"><a name="en-us_topic_0183088050_p128984613319"></a><a name="en-us_topic_0183088050_p128984613319"></a><strong id="en-us_topic_0183088050_b295315557278"><a name="en-us_topic_0183088050_b295315557278"></a><a name="en-us_topic_0183088050_b295315557278"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088050_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088050_p1019112316015"><a name="en-us_topic_0183088050_p1019112316015"></a><a name="en-us_topic_0183088050_p1019112316015"></a>string container_id</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088050_p1189846434"><a name="en-us_topic_0183088050_p1189846434"></a><a name="en-us_topic_0183088050_p1189846434"></a>Container ID.</p>
</td>
</tr>
<tr id="en-us_topic_0183088050_row134851364619"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088050_p956148114812"><a name="en-us_topic_0183088050_p956148114812"></a><a name="en-us_topic_0183088050_p956148114812"></a>bool verbose</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088050_p155615864815"><a name="en-us_topic_0183088050_p155615864815"></a><a name="en-us_topic_0183088050_p155615864815"></a>Whether to display additional information about the sandbox. This parameter does not take effect now.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088050_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088050_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088050_p197485518319"><a name="en-us_topic_0183088050_p197485518319"></a><a name="en-us_topic_0183088050_p197485518319"></a><strong id="en-us_topic_0183088050_b87305415283"><a name="en-us_topic_0183088050_b87305415283"></a><a name="en-us_topic_0183088050_b87305415283"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088050_p374185520310"><a name="en-us_topic_0183088050_p374185520310"></a><a name="en-us_topic_0183088050_p374185520310"></a><strong id="en-us_topic_0183088050_b194651461282"><a name="en-us_topic_0183088050_b194651461282"></a><a name="en-us_topic_0183088050_b194651461282"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088050_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088050_p157445512318"><a name="en-us_topic_0183088050_p157445512318"></a><a name="en-us_topic_0183088050_p157445512318"></a><a href="#apis.md#en-us_topic_0182207110_li1234063113301">ContainerStatus</a> status</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088050_p14745551137"><a name="en-us_topic_0183088050_p14745551137"></a><a name="en-us_topic_0183088050_p14745551137"></a>Container status information.</p>
</td>
</tr>
<tr id="en-us_topic_0183088050_row27545518311"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088050_p953212217505"><a name="en-us_topic_0183088050_p953212217505"></a><a name="en-us_topic_0183088050_p953212217505"></a>map&lt;string, string&gt; info</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088050_p47512557310"><a name="en-us_topic_0183088050_p47512557310"></a><a name="en-us_topic_0183088050_p47512557310"></a>Additional information about the sandbox. The key can be any string, and the value is a JSON character string. The information can be any debugging content. When <strong id="en-us_topic_0183088050_b33801996615"><a name="en-us_topic_0183088050_b33801996615"></a><a name="en-us_topic_0183088050_b33801996615"></a>verbose</strong> is set to <strong id="en-us_topic_0183088050_b203801491961"><a name="en-us_topic_0183088050_b203801491961"></a><a name="en-us_topic_0183088050_b203801491961"></a>true</strong>, <strong id="en-us_topic_0183088050_b103811492068"><a name="en-us_topic_0183088050_b103811492068"></a><a name="en-us_topic_0183088050_b103811492068"></a>info</strong> cannot be empty. This parameter does not take effect now.</p>
</td>
</tr>
</tbody>
</table>

#### UpdateContainerResources

#### Prototype

```
rpc UpdateContainerResources(UpdateContainerResourcesRequest) returns (UpdateContainerResourcesResponse) {}
```

#### Description

This API is used to update container resource configurations.

#### Precautions

-   This API cannot be used to update the pod resource configurations.
-   The value of  **oom\_score\_adj**  of any container cannot be updated.

#### Parameters

<a name="en-us_topic_0183088051_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088051_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088051_p1089154617315"><a name="en-us_topic_0183088051_p1089154617315"></a><a name="en-us_topic_0183088051_p1089154617315"></a><strong id="en-us_topic_0183088051_b169122232812"><a name="en-us_topic_0183088051_b169122232812"></a><a name="en-us_topic_0183088051_b169122232812"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088051_p128984613319"><a name="en-us_topic_0183088051_p128984613319"></a><a name="en-us_topic_0183088051_p128984613319"></a><strong id="en-us_topic_0183088051_b20432122482819"><a name="en-us_topic_0183088051_b20432122482819"></a><a name="en-us_topic_0183088051_b20432122482819"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088051_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088051_p1019112316015"><a name="en-us_topic_0183088051_p1019112316015"></a><a name="en-us_topic_0183088051_p1019112316015"></a>string container_id</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088051_p1189846434"><a name="en-us_topic_0183088051_p1189846434"></a><a name="en-us_topic_0183088051_p1189846434"></a>Container ID.</p>
</td>
</tr>
<tr id="en-us_topic_0183088051_row134851364619"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088051_p18181582213"><a name="en-us_topic_0183088051_p18181582213"></a><a name="en-us_topic_0183088051_p18181582213"></a><a href="#apis.md#en-us_topic_0182207110_li2050214613477">LinuxContainerResources</a> linux</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088051_p155615864815"><a name="en-us_topic_0183088051_p155615864815"></a><a name="en-us_topic_0183088051_p155615864815"></a>Linux resource configuration information.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

None

#### ExecSync

#### Prototype

```
rpc ExecSync(ExecSyncRequest) returns (ExecSyncResponse) {}
```

#### Description

The API is used to run a command in containers in synchronization mode through the gRPC communication method.

#### Precautions

The interaction between the terminal and the containers must be disabled when a single command is executed.

#### Parameters

<a name="en-us_topic_0183088052_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088052_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088052_p1089154617315"><a name="en-us_topic_0183088052_p1089154617315"></a><a name="en-us_topic_0183088052_p1089154617315"></a><strong id="en-us_topic_0183088052_b98988346300"><a name="en-us_topic_0183088052_b98988346300"></a><a name="en-us_topic_0183088052_b98988346300"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088052_p128984613319"><a name="en-us_topic_0183088052_p128984613319"></a><a name="en-us_topic_0183088052_p128984613319"></a><strong id="en-us_topic_0183088052_b49551236133014"><a name="en-us_topic_0183088052_b49551236133014"></a><a name="en-us_topic_0183088052_b49551236133014"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088052_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088052_p293511573266"><a name="en-us_topic_0183088052_p293511573266"></a><a name="en-us_topic_0183088052_p293511573266"></a>string container_id</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088052_p1189846434"><a name="en-us_topic_0183088052_p1189846434"></a><a name="en-us_topic_0183088052_p1189846434"></a>Container ID.</p>
</td>
</tr>
<tr id="en-us_topic_0183088052_row17894468314"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088052_p1489111122411"><a name="en-us_topic_0183088052_p1489111122411"></a><a name="en-us_topic_0183088052_p1489111122411"></a>repeated string cmd</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088052_p780820166266"><a name="en-us_topic_0183088052_p780820166266"></a><a name="en-us_topic_0183088052_p780820166266"></a>Command to be executed.</p>
</td>
</tr>
<tr id="en-us_topic_0183088052_row4812119101610"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088052_p24734935614"><a name="en-us_topic_0183088052_p24734935614"></a><a name="en-us_topic_0183088052_p24734935614"></a>int64 timeout</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088052_p6510957162719"><a name="en-us_topic_0183088052_p6510957162719"></a><a name="en-us_topic_0183088052_p6510957162719"></a>Timeout period for stopping the command (unit: second). The default value is <strong id="en-us_topic_0183088052_b16786155213142"><a name="en-us_topic_0183088052_b16786155213142"></a><a name="en-us_topic_0183088052_b16786155213142"></a>0</strong>, indicating that there is no timeout limit. This parameter does not take effect now.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088052_table1244111592419"></a>
<table><tbody><tr id="en-us_topic_0183088052_row844114513243"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088052_p244117515249"><a name="en-us_topic_0183088052_p244117515249"></a><a name="en-us_topic_0183088052_p244117515249"></a><strong id="en-us_topic_0183088052_b767413425301"><a name="en-us_topic_0183088052_b767413425301"></a><a name="en-us_topic_0183088052_b767413425301"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088052_p10441155152411"><a name="en-us_topic_0183088052_p10441155152411"></a><a name="en-us_topic_0183088052_p10441155152411"></a><strong id="en-us_topic_0183088052_b12586144515306"><a name="en-us_topic_0183088052_b12586144515306"></a><a name="en-us_topic_0183088052_b12586144515306"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088052_row17442659244"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088052_p44421057247"><a name="en-us_topic_0183088052_p44421057247"></a><a name="en-us_topic_0183088052_p44421057247"></a>bytes stdout</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088052_p14442857248"><a name="en-us_topic_0183088052_p14442857248"></a><a name="en-us_topic_0183088052_p14442857248"></a>Standard output of the capture command.</p>
</td>
</tr>
<tr id="en-us_topic_0183088052_row444214512412"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088052_p19834172715201"><a name="en-us_topic_0183088052_p19834172715201"></a><a name="en-us_topic_0183088052_p19834172715201"></a>bytes stderr</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088052_p18188336182011"><a name="en-us_topic_0183088052_p18188336182011"></a><a name="en-us_topic_0183088052_p18188336182011"></a>Standard error output of the capture command.</p>
</td>
</tr>
<tr id="en-us_topic_0183088052_row16951195032014"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088052_p1195135062019"><a name="en-us_topic_0183088052_p1195135062019"></a><a name="en-us_topic_0183088052_p1195135062019"></a>int32 exit_code</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088052_p987318251219"><a name="en-us_topic_0183088052_p987318251219"></a><a name="en-us_topic_0183088052_p987318251219"></a>Exit code, which represents the completion of command execution. The default value is <strong id="en-us_topic_0183088052_b061148112619"><a name="en-us_topic_0183088052_b061148112619"></a><a name="en-us_topic_0183088052_b061148112619"></a>0</strong>, indicating that the command is executed successfully.</p>
</td>
</tr>
</tbody>
</table>

#### Exec

#### Prototype

```
rpc Exec(ExecRequest) returns (ExecResponse) {}
```

#### Description

This API is used to run commands in a container through the gRPC communication method, that is, obtain URLs from the CRI server, and then use the obtained URLs to establish a long connection to the WebSocket server, implementing the interaction with the container.

#### Precautions

The interaction between the terminal and the container can be enabled when a single command is executed. One of  **stdin**,  **stdout**, and  **stderr **must be true. If  **tty**  is true,  **stderr**  must be false. Multiplexing is not supported. In this case, the output of  **stdout**  and  **stderr**  will be combined to a stream.

#### Parameters

<a name="en-us_topic_0183088053_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088053_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088053_p1089154617315"><a name="en-us_topic_0183088053_p1089154617315"></a><a name="en-us_topic_0183088053_p1089154617315"></a><strong id="en-us_topic_0183088053_b17946124515315"><a name="en-us_topic_0183088053_b17946124515315"></a><a name="en-us_topic_0183088053_b17946124515315"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088053_p128984613319"><a name="en-us_topic_0183088053_p128984613319"></a><a name="en-us_topic_0183088053_p128984613319"></a><strong id="en-us_topic_0183088053_b36589470313"><a name="en-us_topic_0183088053_b36589470313"></a><a name="en-us_topic_0183088053_b36589470313"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088053_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088053_p1253351115517"><a name="en-us_topic_0183088053_p1253351115517"></a><a name="en-us_topic_0183088053_p1253351115517"></a>string container_id</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088053_p1189846434"><a name="en-us_topic_0183088053_p1189846434"></a><a name="en-us_topic_0183088053_p1189846434"></a>Container ID.</p>
</td>
</tr>
<tr id="en-us_topic_0183088053_row17894468314"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088053_p1489111122411"><a name="en-us_topic_0183088053_p1489111122411"></a><a name="en-us_topic_0183088053_p1489111122411"></a>repeated string cmd</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088053_p780820166266"><a name="en-us_topic_0183088053_p780820166266"></a><a name="en-us_topic_0183088053_p780820166266"></a>Command to be executed.</p>
</td>
</tr>
<tr id="en-us_topic_0183088053_row4812119101610"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088053_p3218304144"><a name="en-us_topic_0183088053_p3218304144"></a><a name="en-us_topic_0183088053_p3218304144"></a>bool tty</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088053_p1947314925616"><a name="en-us_topic_0183088053_p1947314925616"></a><a name="en-us_topic_0183088053_p1947314925616"></a>Whether to run the command in a TTY.</p>
</td>
</tr>
<tr id="en-us_topic_0183088053_row1569883411415"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088053_p06982346147"><a name="en-us_topic_0183088053_p06982346147"></a><a name="en-us_topic_0183088053_p06982346147"></a>bool stdin</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088053_p469919340142"><a name="en-us_topic_0183088053_p469919340142"></a><a name="en-us_topic_0183088053_p469919340142"></a>Whether to generate the standard input stream.</p>
</td>
</tr>
<tr id="en-us_topic_0183088053_row12135742161414"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088053_p5135242161417"><a name="en-us_topic_0183088053_p5135242161417"></a><a name="en-us_topic_0183088053_p5135242161417"></a>bool stdout</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088053_p1613584220142"><a name="en-us_topic_0183088053_p1613584220142"></a><a name="en-us_topic_0183088053_p1613584220142"></a>Whether to generate the standard output stream.</p>
</td>
</tr>
<tr id="en-us_topic_0183088053_row101281154171413"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088053_p151281754181412"><a name="en-us_topic_0183088053_p151281754181412"></a><a name="en-us_topic_0183088053_p151281754181412"></a>bool stderr</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088053_p51282542141"><a name="en-us_topic_0183088053_p51282542141"></a><a name="en-us_topic_0183088053_p51282542141"></a>Whether to generate the standard error output stream.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088053_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088053_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088053_p197485518319"><a name="en-us_topic_0183088053_p197485518319"></a><a name="en-us_topic_0183088053_p197485518319"></a><strong id="en-us_topic_0183088053_b10846857163110"><a name="en-us_topic_0183088053_b10846857163110"></a><a name="en-us_topic_0183088053_b10846857163110"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088053_p374185520310"><a name="en-us_topic_0183088053_p374185520310"></a><a name="en-us_topic_0183088053_p374185520310"></a><strong id="en-us_topic_0183088053_b2064112014323"><a name="en-us_topic_0183088053_b2064112014323"></a><a name="en-us_topic_0183088053_b2064112014323"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088053_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088053_p15574205011242"><a name="en-us_topic_0183088053_p15574205011242"></a><a name="en-us_topic_0183088053_p15574205011242"></a>string url</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088053_p103555206255"><a name="en-us_topic_0183088053_p103555206255"></a><a name="en-us_topic_0183088053_p103555206255"></a>Fully qualified URL of the exec streaming server.</p>
</td>
</tr>
</tbody>
</table>

#### Attach

#### Prototype

```
rpc Attach(AttachRequest) returns (AttachResponse) {}
```

#### Description

This API is used to take over the init process of a container through the gRPC communication method, that is, obtain URLs from the CRI server, and then use the obtained URLs to establish a long connection to the WebSocket server, implementing the interaction with the container. Only containers whose runtime is of the LCR type are supported.

#### Parameters

<a name="en-us_topic_0183088054_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088054_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088054_p1089154617315"><a name="en-us_topic_0183088054_p1089154617315"></a><a name="en-us_topic_0183088054_p1089154617315"></a><strong id="en-us_topic_0183088054_b1145614180320"><a name="en-us_topic_0183088054_b1145614180320"></a><a name="en-us_topic_0183088054_b1145614180320"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088054_p128984613319"><a name="en-us_topic_0183088054_p128984613319"></a><a name="en-us_topic_0183088054_p128984613319"></a><strong id="en-us_topic_0183088054_b7905112017323"><a name="en-us_topic_0183088054_b7905112017323"></a><a name="en-us_topic_0183088054_b7905112017323"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088054_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088054_p1253351115517"><a name="en-us_topic_0183088054_p1253351115517"></a><a name="en-us_topic_0183088054_p1253351115517"></a>string container_id</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088054_p1189846434"><a name="en-us_topic_0183088054_p1189846434"></a><a name="en-us_topic_0183088054_p1189846434"></a>Container ID.</p>
</td>
</tr>
<tr id="en-us_topic_0183088054_row4812119101610"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088054_p3218304144"><a name="en-us_topic_0183088054_p3218304144"></a><a name="en-us_topic_0183088054_p3218304144"></a>bool tty</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088054_p1947314925616"><a name="en-us_topic_0183088054_p1947314925616"></a><a name="en-us_topic_0183088054_p1947314925616"></a>Whether to run the command in a TTY.</p>
</td>
</tr>
<tr id="en-us_topic_0183088054_row1569883411415"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088054_p06982346147"><a name="en-us_topic_0183088054_p06982346147"></a><a name="en-us_topic_0183088054_p06982346147"></a>bool stdin</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088054_p469919340142"><a name="en-us_topic_0183088054_p469919340142"></a><a name="en-us_topic_0183088054_p469919340142"></a>Whether to generate the standard input stream.</p>
</td>
</tr>
<tr id="en-us_topic_0183088054_row12135742161414"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088054_p5135242161417"><a name="en-us_topic_0183088054_p5135242161417"></a><a name="en-us_topic_0183088054_p5135242161417"></a>bool stdout</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088054_p1613584220142"><a name="en-us_topic_0183088054_p1613584220142"></a><a name="en-us_topic_0183088054_p1613584220142"></a>Whether to generate the standard output stream.</p>
</td>
</tr>
<tr id="en-us_topic_0183088054_row101281154171413"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088054_p151281754181412"><a name="en-us_topic_0183088054_p151281754181412"></a><a name="en-us_topic_0183088054_p151281754181412"></a>bool stderr</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088054_p51282542141"><a name="en-us_topic_0183088054_p51282542141"></a><a name="en-us_topic_0183088054_p51282542141"></a>Whether to generate the standard error output stream.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088054_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088054_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088054_p197485518319"><a name="en-us_topic_0183088054_p197485518319"></a><a name="en-us_topic_0183088054_p197485518319"></a><strong id="en-us_topic_0183088054_b109921252323"><a name="en-us_topic_0183088054_b109921252323"></a><a name="en-us_topic_0183088054_b109921252323"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088054_p374185520310"><a name="en-us_topic_0183088054_p374185520310"></a><a name="en-us_topic_0183088054_p374185520310"></a><strong id="en-us_topic_0183088054_b0887828183218"><a name="en-us_topic_0183088054_b0887828183218"></a><a name="en-us_topic_0183088054_b0887828183218"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088054_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088054_p15574205011242"><a name="en-us_topic_0183088054_p15574205011242"></a><a name="en-us_topic_0183088054_p15574205011242"></a>string url</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088054_p103555206255"><a name="en-us_topic_0183088054_p103555206255"></a><a name="en-us_topic_0183088054_p103555206255"></a>Fully qualified URL of the attach streaming server.</p>
</td>
</tr>
</tbody>
</table>

#### ContainerStats

#### Prototype

```
rpc ContainerStats(ContainerStatsRequest) returns (ContainerStatsResponse) {}
```

#### Description

This API is used to return information about resources occupied by a container. Only containers whose runtime is of the LCR type are supported.

#### Parameters

<a name="en-us_topic_0183088056_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088056_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088056_p1089154617315"><a name="en-us_topic_0183088056_p1089154617315"></a><a name="en-us_topic_0183088056_p1089154617315"></a><strong id="en-us_topic_0183088056_b1299984153312"><a name="en-us_topic_0183088056_b1299984153312"></a><a name="en-us_topic_0183088056_b1299984153312"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088056_p128984613319"><a name="en-us_topic_0183088056_p128984613319"></a><a name="en-us_topic_0183088056_p128984613319"></a><strong id="en-us_topic_0183088056_b349515718331"><a name="en-us_topic_0183088056_b349515718331"></a><a name="en-us_topic_0183088056_b349515718331"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088056_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088056_p759712497119"><a name="en-us_topic_0183088056_p759712497119"></a><a name="en-us_topic_0183088056_p759712497119"></a>string container_id</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088056_p1189846434"><a name="en-us_topic_0183088056_p1189846434"></a><a name="en-us_topic_0183088056_p1189846434"></a>Container ID.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088056_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088056_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088056_p197485518319"><a name="en-us_topic_0183088056_p197485518319"></a><a name="en-us_topic_0183088056_p197485518319"></a><strong id="en-us_topic_0183088056_b14824203215330"><a name="en-us_topic_0183088056_b14824203215330"></a><a name="en-us_topic_0183088056_b14824203215330"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088056_p374185520310"><a name="en-us_topic_0183088056_p374185520310"></a><a name="en-us_topic_0183088056_p374185520310"></a><strong id="en-us_topic_0183088056_b18656113519336"><a name="en-us_topic_0183088056_b18656113519336"></a><a name="en-us_topic_0183088056_b18656113519336"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088056_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088056_p3465158518"><a name="en-us_topic_0183088056_p3465158518"></a><a name="en-us_topic_0183088056_p3465158518"></a><a href="#apis.md#en-us_topic_0182207110_li55689514215">ContainerStats</a> stats</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088056_p14745551137"><a name="en-us_topic_0183088056_p14745551137"></a><a name="en-us_topic_0183088056_p14745551137"></a>Container information. Note: Disks and inodes support only the query of containers started by OCI images.</p>
</td>
</tr>
</tbody>
</table>

#### ListContainerStats

#### Prototype

```
rpc ListContainerStats(ListContainerStatsRequest) returns (ListContainerStatsResponse) {}
```

#### Description

This API is used to return the information about resources occupied by multiple containers. Filtering based on criteria is supported.

#### Parameters

<a name="en-us_topic_0183088057_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088057_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088057_p1089154617315"><a name="en-us_topic_0183088057_p1089154617315"></a><a name="en-us_topic_0183088057_p1089154617315"></a><strong id="en-us_topic_0183088057_b241612153419"><a name="en-us_topic_0183088057_b241612153419"></a><a name="en-us_topic_0183088057_b241612153419"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088057_p128984613319"><a name="en-us_topic_0183088057_p128984613319"></a><a name="en-us_topic_0183088057_p128984613319"></a><strong id="en-us_topic_0183088057_b148002423418"><a name="en-us_topic_0183088057_b148002423418"></a><a name="en-us_topic_0183088057_b148002423418"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088057_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088057_p759712497119"><a name="en-us_topic_0183088057_p759712497119"></a><a name="en-us_topic_0183088057_p759712497119"></a><a href="#apis.md#en-us_topic_0182207110_li285981611148">ContainerStatsFilter</a> filter</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088057_p1189846434"><a name="en-us_topic_0183088057_p1189846434"></a><a name="en-us_topic_0183088057_p1189846434"></a>Filter criteria.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088057_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088057_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088057_p197485518319"><a name="en-us_topic_0183088057_p197485518319"></a><a name="en-us_topic_0183088057_p197485518319"></a><strong id="en-us_topic_0183088057_b20833191553410"><a name="en-us_topic_0183088057_b20833191553410"></a><a name="en-us_topic_0183088057_b20833191553410"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088057_p374185520310"><a name="en-us_topic_0183088057_p374185520310"></a><a name="en-us_topic_0183088057_p374185520310"></a><strong id="en-us_topic_0183088057_b626341373412"><a name="en-us_topic_0183088057_b626341373412"></a><a name="en-us_topic_0183088057_b626341373412"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088057_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088057_p3465158518"><a name="en-us_topic_0183088057_p3465158518"></a><a name="en-us_topic_0183088057_p3465158518"></a>repeated <a href="#apis.md#en-us_topic_0182207110_li55689514215">ContainerStats</a> stats</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088057_p14745551137"><a name="en-us_topic_0183088057_p14745551137"></a><a name="en-us_topic_0183088057_p14745551137"></a>Container information list. Note: Disks and inodes support only the query of containers started by OCI images.</p>
</td>
</tr>
</tbody>
</table>

#### UpdateRuntimeConfig

#### Prototype

```
rpc UpdateRuntimeConfig(UpdateRuntimeConfigRequest) returns (UpdateRuntimeConfigResponse);
```

#### Description

This API is used as a standard CRI to update the pod CIDR of the network plug-in. Currently, the CNI network plug-in does not need to update the pod CIDR. Therefore, this API records only access logs.

#### Precautions

API operations will not modify the system management information, but only record a log.

#### Parameters

<a name="en-us_topic_0183088058_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088058_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088058_p1089154617315"><a name="en-us_topic_0183088058_p1089154617315"></a><a name="en-us_topic_0183088058_p1089154617315"></a><strong id="en-us_topic_0183088058_b677812233363"><a name="en-us_topic_0183088058_b677812233363"></a><a name="en-us_topic_0183088058_b677812233363"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088058_p128984613319"><a name="en-us_topic_0183088058_p128984613319"></a><a name="en-us_topic_0183088058_p128984613319"></a><strong id="en-us_topic_0183088058_b16426192683611"><a name="en-us_topic_0183088058_b16426192683611"></a><a name="en-us_topic_0183088058_b16426192683611"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088058_row17894468314"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088058_p476122243220"><a name="en-us_topic_0183088058_p476122243220"></a><a name="en-us_topic_0183088058_p476122243220"></a><a href="#apis.md#en-us_topic_0182207110_li544075884710">RuntimeConfig</a> runtime_config</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088058_p5596114510551"><a name="en-us_topic_0183088058_p5596114510551"></a><a name="en-us_topic_0183088058_p5596114510551"></a>Information to be configured for the runtime.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

None

#### Status

#### Prototype

```
rpc Status(StatusRequest) returns (StatusResponse) {};
```

#### Description

This API is used to obtain the network status of the runtime and pod. Obtaining the network status will trigger the update of network configuration. Only containers whose runtime is of the LCR type are supported.

#### Precautions

If the network configuration fails to be updated, the original configuration is not affected. The original configuration is overwritten only when the update is successful.

#### Parameters

<a name="en-us_topic_0183088059_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088059_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088059_p1089154617315"><a name="en-us_topic_0183088059_p1089154617315"></a><a name="en-us_topic_0183088059_p1089154617315"></a><strong id="en-us_topic_0183088059_b64421540153617"><a name="en-us_topic_0183088059_b64421540153617"></a><a name="en-us_topic_0183088059_b64421540153617"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088059_p128984613319"><a name="en-us_topic_0183088059_p128984613319"></a><a name="en-us_topic_0183088059_p128984613319"></a><strong id="en-us_topic_0183088059_b1213713434361"><a name="en-us_topic_0183088059_b1213713434361"></a><a name="en-us_topic_0183088059_b1213713434361"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088059_row17894468314"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088059_p133821342185014"><a name="en-us_topic_0183088059_p133821342185014"></a><a name="en-us_topic_0183088059_p133821342185014"></a>bool verbose</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088059_p5596114510551"><a name="en-us_topic_0183088059_p5596114510551"></a><a name="en-us_topic_0183088059_p5596114510551"></a>Whether to display additional runtime information. This parameter does not take effect now.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088059_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088059_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088059_p197485518319"><a name="en-us_topic_0183088059_p197485518319"></a><a name="en-us_topic_0183088059_p197485518319"></a><strong id="en-us_topic_0183088059_b1281246103614"><a name="en-us_topic_0183088059_b1281246103614"></a><a name="en-us_topic_0183088059_b1281246103614"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088059_p374185520310"><a name="en-us_topic_0183088059_p374185520310"></a><a name="en-us_topic_0183088059_p374185520310"></a><strong id="en-us_topic_0183088059_b2867948103620"><a name="en-us_topic_0183088059_b2867948103620"></a><a name="en-us_topic_0183088059_b2867948103620"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088059_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088059_p13351101810514"><a name="en-us_topic_0183088059_p13351101810514"></a><a name="en-us_topic_0183088059_p13351101810514"></a><a href="#apis.md#en-us_topic_0182207110_li15257663554">RuntimeStatus</a> status</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088059_p18351018105117"><a name="en-us_topic_0183088059_p18351018105117"></a><a name="en-us_topic_0183088059_p18351018105117"></a>Runtime status.</p>
</td>
</tr>
<tr id="en-us_topic_0183088059_row1187724514524"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088059_p1887784525214"><a name="en-us_topic_0183088059_p1887784525214"></a><a name="en-us_topic_0183088059_p1887784525214"></a>map&lt;string, string&gt; info</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088059_p20877184519522"><a name="en-us_topic_0183088059_p20877184519522"></a><a name="en-us_topic_0183088059_p20877184519522"></a>Additional information about the runtime. The key of <strong id="en-us_topic_0183088059_b0839105613415"><a name="en-us_topic_0183088059_b0839105613415"></a><a name="en-us_topic_0183088059_b0839105613415"></a>info</strong> can be any value. The value must be in JSON format and can contain any debugging information. When <strong id="en-us_topic_0183088059_b4510153754414"><a name="en-us_topic_0183088059_b4510153754414"></a><a name="en-us_topic_0183088059_b4510153754414"></a>verbose</strong> is set to <strong id="en-us_topic_0183088059_b105106376442"><a name="en-us_topic_0183088059_b105106376442"></a><a name="en-us_topic_0183088059_b105106376442"></a>true</strong>, <strong id="en-us_topic_0183088059_b10510143794412"><a name="en-us_topic_0183088059_b10510143794412"></a><a name="en-us_topic_0183088059_b10510143794412"></a>info</strong> cannot be empty.</p>
</td>
</tr>
</tbody>
</table>

### Image Service

The service provides the gRPC API for pulling, viewing, and removing images from the registry.


#### ListImages

#### Prototype

```
rpc ListImages(ListImagesRequest) returns (ListImagesResponse) {}
```

#### Description

This API is used to list existing image information.

#### Precautions

This is a unified API. You can run the  **cri images**  command to query embedded images. However, embedded images are not standard OCI images. Therefore, query results have the following restrictions:

-   An embedded image does not have an image ID. Therefore, the value of  **image ID**  is the config digest of the image.
-   An embedded image has only config digest, and it does not comply with the OCI image specifications. Therefore, the value of  **digest**  cannot be displayed.

#### Parameters

<a name="en-us_topic_0183088060_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088060_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088060_p1089154617315"><a name="en-us_topic_0183088060_p1089154617315"></a><a name="en-us_topic_0183088060_p1089154617315"></a><strong id="en-us_topic_0183088060_b710175411372"><a name="en-us_topic_0183088060_b710175411372"></a><a name="en-us_topic_0183088060_b710175411372"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088060_p128984613319"><a name="en-us_topic_0183088060_p128984613319"></a><a name="en-us_topic_0183088060_p128984613319"></a><strong id="en-us_topic_0183088060_b17781857203716"><a name="en-us_topic_0183088060_b17781857203716"></a><a name="en-us_topic_0183088060_b17781857203716"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088060_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088060_p0136125811713"><a name="en-us_topic_0183088060_p0136125811713"></a><a name="en-us_topic_0183088060_p0136125811713"></a><a href="#apis.md#en-us_topic_0182207110_li597891416252">ImageSpec</a> filter</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088060_p1189846434"><a name="en-us_topic_0183088060_p1189846434"></a><a name="en-us_topic_0183088060_p1189846434"></a>Name of the image to be filtered.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088060_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088060_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088060_p197485518319"><a name="en-us_topic_0183088060_p197485518319"></a><a name="en-us_topic_0183088060_p197485518319"></a><strong id="en-us_topic_0183088060_b5713121719381"><a name="en-us_topic_0183088060_b5713121719381"></a><a name="en-us_topic_0183088060_b5713121719381"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088060_p374185520310"><a name="en-us_topic_0183088060_p374185520310"></a><a name="en-us_topic_0183088060_p374185520310"></a><strong id="en-us_topic_0183088060_b1616032014382"><a name="en-us_topic_0183088060_b1616032014382"></a><a name="en-us_topic_0183088060_b1616032014382"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088060_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088060_p157445512318"><a name="en-us_topic_0183088060_p157445512318"></a><a name="en-us_topic_0183088060_p157445512318"></a>repeated  <a href="#apis.md#en-us_topic_0182207110_li597891416252">Image</a> images</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088060_p14745551137"><a name="en-us_topic_0183088060_p14745551137"></a><a name="en-us_topic_0183088060_p14745551137"></a>Image information list.</p>
</td>
</tr>
</tbody>
</table>

#### ImageStatus

#### Prototype

```
rpc ImageStatus(ImageStatusRequest) returns (ImageStatusResponse) {}
```

#### Description

The API is used to query the information about a specified image.

#### Precautions

1.  If the image to be queried does not exist,  **ImageStatusResponse**  is returned and  **Image**  is set to  **nil**  in the return value.
2.  This is a unified API. Since embedded images do not comply with the OCI image specifications and do not contain required fields, the images cannot be queried by using this API.

#### Parameters

<a name="en-us_topic_0183088061_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088061_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088061_p1089154617315"><a name="en-us_topic_0183088061_p1089154617315"></a><a name="en-us_topic_0183088061_p1089154617315"></a><strong id="en-us_topic_0183088061_b20178097437"><a name="en-us_topic_0183088061_b20178097437"></a><a name="en-us_topic_0183088061_b20178097437"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088061_p128984613319"><a name="en-us_topic_0183088061_p128984613319"></a><a name="en-us_topic_0183088061_p128984613319"></a><strong id="en-us_topic_0183088061_b17961101174317"><a name="en-us_topic_0183088061_b17961101174317"></a><a name="en-us_topic_0183088061_b17961101174317"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088061_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088061_p0136125811713"><a name="en-us_topic_0183088061_p0136125811713"></a><a name="en-us_topic_0183088061_p0136125811713"></a><a href="#apis.md#en-us_topic_0182207110_li597891416252">ImageSpec</a> image</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088061_p1189846434"><a name="en-us_topic_0183088061_p1189846434"></a><a name="en-us_topic_0183088061_p1189846434"></a>Image name.</p>
</td>
</tr>
<tr id="en-us_topic_0183088061_row1665161618234"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088061_p56519161236"><a name="en-us_topic_0183088061_p56519161236"></a><a name="en-us_topic_0183088061_p56519161236"></a>bool verbose</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088061_p1765216132316"><a name="en-us_topic_0183088061_p1765216132316"></a><a name="en-us_topic_0183088061_p1765216132316"></a>Whether to query additional information. This parameter does not take effect now. No additional information is returned.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088061_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088061_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088061_p197485518319"><a name="en-us_topic_0183088061_p197485518319"></a><a name="en-us_topic_0183088061_p197485518319"></a><strong id="en-us_topic_0183088061_b20843152518479"><a name="en-us_topic_0183088061_b20843152518479"></a><a name="en-us_topic_0183088061_b20843152518479"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088061_p374185520310"><a name="en-us_topic_0183088061_p374185520310"></a><a name="en-us_topic_0183088061_p374185520310"></a><strong id="en-us_topic_0183088061_b7391172854714"><a name="en-us_topic_0183088061_b7391172854714"></a><a name="en-us_topic_0183088061_b7391172854714"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088061_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088061_p157445512318"><a name="en-us_topic_0183088061_p157445512318"></a><a name="en-us_topic_0183088061_p157445512318"></a><a href="#apis.md#en-us_topic_0182207110_li597891416252">Image</a> image</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088061_p14745551137"><a name="en-us_topic_0183088061_p14745551137"></a><a name="en-us_topic_0183088061_p14745551137"></a>Image information.</p>
</td>
</tr>
<tr id="en-us_topic_0183088061_row467913219246"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088061_p46799211246"><a name="en-us_topic_0183088061_p46799211246"></a><a name="en-us_topic_0183088061_p46799211246"></a>map&lt;string, string&gt; info</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088061_p167918215244"><a name="en-us_topic_0183088061_p167918215244"></a><a name="en-us_topic_0183088061_p167918215244"></a>Additional image information. This parameter does not take effect now. No additional information is returned.</p>
</td>
</tr>
</tbody>
</table>

#### PullImage

#### Prototype

```
 rpc PullImage(PullImageRequest) returns (PullImageResponse) {}
```

#### Description

This API is used to download images.

#### Precautions

Currently, you can download public images, and use the username, password, and auth information to download private images. The  **server\_address**,  **identity\_token**, and  **registry\_token**  fields in  **authconfig**  cannot be configured.

#### Parameters

<a name="en-us_topic_0183088062_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088062_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088062_p1089154617315"><a name="en-us_topic_0183088062_p1089154617315"></a><a name="en-us_topic_0183088062_p1089154617315"></a><strong id="en-us_topic_0183088062_b15951141214911"><a name="en-us_topic_0183088062_b15951141214911"></a><a name="en-us_topic_0183088062_b15951141214911"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088062_p128984613319"><a name="en-us_topic_0183088062_p128984613319"></a><a name="en-us_topic_0183088062_p128984613319"></a><strong id="en-us_topic_0183088062_b19416415114920"><a name="en-us_topic_0183088062_b19416415114920"></a><a name="en-us_topic_0183088062_b19416415114920"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088062_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088062_p0136125811713"><a name="en-us_topic_0183088062_p0136125811713"></a><a name="en-us_topic_0183088062_p0136125811713"></a><a href="#apis.md#en-us_topic_0182207110_li597891416252">ImageSpec</a> image</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088062_p1189846434"><a name="en-us_topic_0183088062_p1189846434"></a><a name="en-us_topic_0183088062_p1189846434"></a>Name of the image to be downloaded.</p>
</td>
</tr>
<tr id="en-us_topic_0183088062_row9786152142810"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088062_p177861927284"><a name="en-us_topic_0183088062_p177861927284"></a><a name="en-us_topic_0183088062_p177861927284"></a><a href="#apis.md#en-us_topic_0182207110_li1017394413316">AuthConfig</a> auth</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088062_p20786182142817"><a name="en-us_topic_0183088062_p20786182142817"></a><a name="en-us_topic_0183088062_p20786182142817"></a>Verification information for downloading a private image.</p>
</td>
</tr>
<tr id="en-us_topic_0183088062_row1665161618234"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088062_p56519161236"><a name="en-us_topic_0183088062_p56519161236"></a><a name="en-us_topic_0183088062_p56519161236"></a><a href="#apis.md#en-us_topic_0182207110_li253629701">PodSandboxConfig</a> sandbox_config</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088062_p1765216132316"><a name="en-us_topic_0183088062_p1765216132316"></a><a name="en-us_topic_0183088062_p1765216132316"></a>Whether to download an image in the pod context. This parameter does not take effect now.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

<a name="en-us_topic_0183088062_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088062_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088062_p197485518319"><a name="en-us_topic_0183088062_p197485518319"></a><a name="en-us_topic_0183088062_p197485518319"></a><strong id="en-us_topic_0183088062_b634915904812"><a name="en-us_topic_0183088062_b634915904812"></a><a name="en-us_topic_0183088062_b634915904812"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088062_p374185520310"><a name="en-us_topic_0183088062_p374185520310"></a><a name="en-us_topic_0183088062_p374185520310"></a><strong id="en-us_topic_0183088062_b46159264916"><a name="en-us_topic_0183088062_b46159264916"></a><a name="en-us_topic_0183088062_b46159264916"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088062_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088062_p157445512318"><a name="en-us_topic_0183088062_p157445512318"></a><a name="en-us_topic_0183088062_p157445512318"></a>string image_ref</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088062_p14745551137"><a name="en-us_topic_0183088062_p14745551137"></a><a name="en-us_topic_0183088062_p14745551137"></a>Information about the downloaded image.</p>
</td>
</tr>
</tbody>
</table>

#### RemoveImage

#### Prototype

```
rpc RemoveImage(RemoveImageRequest) returns (RemoveImageResponse) {}
```

#### Description

This API is used to delete specified images.

#### Precautions

This is a unified API. Since embedded images do not comply with the OCI image specifications and do not contain required fields, you cannot delete embedded images by using this API and the image ID.

#### Parameters

<a name="en-us_topic_0183088063_table184320467318"></a>
<table><tbody><tr id="en-us_topic_0183088063_row78917461336"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088063_p1089154617315"><a name="en-us_topic_0183088063_p1089154617315"></a><a name="en-us_topic_0183088063_p1089154617315"></a><strong id="en-us_topic_0183088063_b0623851105017"><a name="en-us_topic_0183088063_b0623851105017"></a><a name="en-us_topic_0183088063_b0623851105017"></a>Parameter</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088063_p128984613319"><a name="en-us_topic_0183088063_p128984613319"></a><a name="en-us_topic_0183088063_p128984613319"></a><strong id="en-us_topic_0183088063_b156951254185014"><a name="en-us_topic_0183088063_b156951254185014"></a><a name="en-us_topic_0183088063_b156951254185014"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088063_row10898461533"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088063_p0136125811713"><a name="en-us_topic_0183088063_p0136125811713"></a><a name="en-us_topic_0183088063_p0136125811713"></a><a href="#apis.md#en-us_topic_0182207110_li597891416252">ImageSpec</a> image</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088063_p1189846434"><a name="en-us_topic_0183088063_p1189846434"></a><a name="en-us_topic_0183088063_p1189846434"></a>Name or ID of the image to be deleted.</p>
</td>
</tr>
</tbody>
</table>

#### Return Values

None

#### ImageFsInfo

#### Prototype

```
rpc ImageFsInfo(ImageFsInfoRequest) returns (ImageFsInfoResponse) {}
```

#### Description

This API is used to query the information about the file system that stores images.

#### Precautions

Queried results are the file system information in the image metadata.

#### Parameters

None

#### Return Values

<a name="en-us_topic_0183088064_table15296551936"></a>
<table><tbody><tr id="en-us_topic_0183088064_row18741555834"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088064_p197485518319"><a name="en-us_topic_0183088064_p197485518319"></a><a name="en-us_topic_0183088064_p197485518319"></a><strong id="en-us_topic_0183088064_b1683151205216"><a name="en-us_topic_0183088064_b1683151205216"></a><a name="en-us_topic_0183088064_b1683151205216"></a>Return Value</strong></p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088064_p374185520310"><a name="en-us_topic_0183088064_p374185520310"></a><a name="en-us_topic_0183088064_p374185520310"></a><strong id="en-us_topic_0183088064_b2069655395210"><a name="en-us_topic_0183088064_b2069655395210"></a><a name="en-us_topic_0183088064_b2069655395210"></a>Description</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183088064_row87419551317"><td class="cellrowborder" valign="top" width="39.54%"><p id="en-us_topic_0183088064_p157445512318"><a name="en-us_topic_0183088064_p157445512318"></a><a name="en-us_topic_0183088064_p157445512318"></a>repeated <a href="#apis.md#en-us_topic_0182207110_li1606183118189">FilesystemUsage</a> image_filesystems</p>
</td>
<td class="cellrowborder" valign="top" width="60.46%"><p id="en-us_topic_0183088064_p14745551137"><a name="en-us_topic_0183088064_p14745551137"></a><a name="en-us_topic_0183088064_p14745551137"></a>Information about the file system that stores images.</p>
</td>
</tr>
</tbody>
</table>

### Constraints

1.  If  **log\_directory**  is configured in the  **PodSandboxConfig**  parameter when a sandbox is created,  **log\_path**  must be specified in  **ContainerConfig**  when all containers that belong to the sandbox are created. Otherwise, the containers may not be started or deleted by using the CRI.

    The actual value of  **LOGPATH**  of containers is  **log\_directory/log\_path**. If  **log\_path**  is not set, the final value of  **LOGPATH**  is changed to  **log\_directory**.

    -   If the path does not exist, iSulad will create a soft link pointing to the actual path of container logs when starting a container. Then  **log\_directory**  becomes a soft link. There are two cases:
        1.  In the first case, if  **log\_path**  is not configured for other containers in the sandbox,  **log\_directory**  will be deleted and point to  **log\_path**  of the newly started container. As a result, logs of the first started container point to logs of the later started container.
        2.  In the second case, if  **log\_path**  is configured for other containers in the sandbox, the value of  **LOGPATH**  of the container is  **log\_directory/log\_path**. Because  **log\_directory**  is a soft link, the creation fails when  **log\_directory/log\_path**  is used as the soft link to point to the actual path of container logs.

    -   If the path exists, iSulad will attempt to delete the path \(non-recursive\) when starting a container. If the path is a folder path containing content, the deletion fails. As a result, the soft link fails to be created, the container fails to be started, and the same error occurs when the container is going to be deleted.

2.  If  **log\_directory**  is configured in the  **PodSandboxConfig**  parameter when a sandbox is created, and  **log\_path**  is specified in  **ContainerConfig**  when a container is created, the final value of  **LOGPATH**  is  **log\_directory/log\_path**. iSulad does not recursively create  **LOGPATH**, therefore, you must ensure that  **dirname\(LOGPATH\)**  exists, that is, the upper-level path of the final log file path exists.
3.  If  **log\_directory**  is configured in the  **PodSandboxConfig**  parameter when a sandbox is created, and the same  **log\_path**  is specified in  **ContainerConfig**  when multiple containers are created, or if containers in different sandboxes point to the same  **LOGPATH**, the latest container log path will overwrite the previous path after the containers are started successfully.
4.  If the image content in the remote registry changes and the original image is stored in the local host, the name and tag of the original image are changed to  **none**  when you call the CRI Pull image API to download the image again.

    An example is as follows:

    Locally stored images:

    ```
    IMAGE                                        TAG                 IMAGE ID            SIZE
    rnd-dockerhub.huawei.com/pproxyisulad/test   latest              99e59f495ffaa       753kB
    ```

    After the  **rnd-dockerhub.huawei.com/pproxyisulad/test:latest**  image in the remote registry is updated and downloaded again:

    ```
    IMAGE                                        TAG                 IMAGE ID            SIZE
    <none>                                       <none>              99e59f495ffaa       753kB
    rnd-dockerhub.huawei.com/pproxyisulad/test   latest              d8233ab899d41       1.42MB
    ```

    Run the  **isula images**  command. The value of  **REF**  is displayed as  **-**.

    ```
    REF                                               IMAGE ID               CREATED              SIZE       
    rnd-dockerhub.huawei.com/pproxyisulad/test:latest d8233ab899d41          2019-02-14 19:19:37  1.42MB     
    -                                                 99e59f495ffaa          2016-05-04 02:26:41  753kB
    ```


