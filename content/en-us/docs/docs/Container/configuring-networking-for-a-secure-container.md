# Configuring Networking for a Secure Container

- [Configuring Networking for a Secure Container](#configuring-networking-for-a-secure-container)


## TAP-based Network Support

The secure container technology is implemented based on QEMU VMs. For a physical machine system, a secure container is equivalent to a VM. Therefore, the secure container may connect the VM to an external network in the Neutron network by using the test access point \(TAP\) technology. You do not need to pay attention to TAP device creation and bridging. You only need to hot add the specified TAP device \(with an existing host\) to the VM in the pause container and update the NIC information.

Related commands are as follows:

1.  **Run the following command to add a TAP NIC for a started container:**

    ```
    $ cat ./test-iface.json | kata-runtime kata-network add-iface 6ec7a98 -
    ```

    In the preceding command,  **6ec7a98**  is the truncated container ID, and  **test-infs.json**  is the file that describes the NIC information. The following is an example:

    ```
    {
        "device": "tap-test", 
        "name": "eth-test", 
        "IPAddresses": [
            {
                "address": "172.16.0.3", 
                "mask": "16"
            }
        ], 
        "hwAddr":"02:42:20:6f:a3:69",
        "mtu": 1500,
        "vhostUserSocket":"/usr/local/var/run/openvswitch/vhost-user1",
        "queues":5
    }
    ```

    The fields in the JSON file are described as follows:


    <table><thead align="left"><tr id="en-us_topic_0182219836_row1254161815116"><th class="cellrowborder" valign="top" width="20.14%" id="mcps1.1.4.1.1"><p id="en-us_topic_0182219836_p1254171865115"><a name="en-us_topic_0182219836_p1254171865115"></a><a name="en-us_topic_0182219836_p1254171865115"></a>Field</p>
    </th>
    <th class="cellrowborder" valign="top" width="20.68%" id="mcps1.1.4.1.2"><p id="en-us_topic_0182219836_p5437983523"><a name="en-us_topic_0182219836_p5437983523"></a><a name="en-us_topic_0182219836_p5437983523"></a>Mandatory/Optional</p>
    </th>
    <th class="cellrowborder" valign="top" width="59.18%" id="mcps1.1.4.1.3"><p id="en-us_topic_0182219836_p162548181514"><a name="en-us_topic_0182219836_p162548181514"></a><a name="en-us_topic_0182219836_p162548181514"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0182219836_row125471810511"><td class="cellrowborder" valign="top" width="20.14%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182219836_p12254718115115"><a name="en-us_topic_0182219836_p12254718115115"></a><a name="en-us_topic_0182219836_p12254718115115"></a>device</p>
    </td>
    <td class="cellrowborder" valign="top" width="20.68%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182219836_p1343710819525"><a name="en-us_topic_0182219836_p1343710819525"></a><a name="en-us_topic_0182219836_p1343710819525"></a>Mandatory</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.18%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182219836_p925431811516"><a name="en-us_topic_0182219836_p925431811516"></a><a name="en-us_topic_0182219836_p925431811516"></a>Name of the NIC on a host. The value can contain a maximum of 15 characters, including letters, digits, underscores (_), hyphens (-), and periods (.). It must start with a letter. The device name must be unique on the same host.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182219836_row1254141812511"><td class="cellrowborder" valign="top" width="20.14%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182219836_p4254111855111"><a name="en-us_topic_0182219836_p4254111855111"></a><a name="en-us_topic_0182219836_p4254111855111"></a>name</p>
    </td>
    <td class="cellrowborder" valign="top" width="20.68%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182219836_p64371689527"><a name="en-us_topic_0182219836_p64371689527"></a><a name="en-us_topic_0182219836_p64371689527"></a>Mandatory</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.18%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182219836_p11254161855115"><a name="en-us_topic_0182219836_p11254161855115"></a><a name="en-us_topic_0182219836_p11254161855115"></a>Name of the NIC in the container. The value can contain a maximum of 15 characters, including letters, digits, underscores (_), hyphens (-), and periods (.). It must start with a letter. The name must be unique in the same sandbox.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182219836_row152541118155116"><td class="cellrowborder" valign="top" width="20.14%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182219836_p112540187516"><a name="en-us_topic_0182219836_p112540187516"></a><a name="en-us_topic_0182219836_p112540187516"></a>IPAddresses</p>
    </td>
    <td class="cellrowborder" valign="top" width="20.68%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182219836_p4437984520"><a name="en-us_topic_0182219836_p4437984520"></a><a name="en-us_topic_0182219836_p4437984520"></a>Optional</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.18%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182219836_p1254151812510"><a name="en-us_topic_0182219836_p1254151812510"></a><a name="en-us_topic_0182219836_p1254151812510"></a>IP address of the NIC. Currently, one IP address can be configured for each NIC. If no IP address is configured for the NIC, no IP address will be configured in the container, either.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182219836_row11367141719564"><td class="cellrowborder" valign="top" width="20.14%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182219836_p4368517175610"><a name="en-us_topic_0182219836_p4368517175610"></a><a name="en-us_topic_0182219836_p4368517175610"></a>hwAddr</p>
    </td>
    <td class="cellrowborder" valign="top" width="20.68%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182219836_p13368417205615"><a name="en-us_topic_0182219836_p13368417205615"></a><a name="en-us_topic_0182219836_p13368417205615"></a>Mandatory</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.18%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182219836_p16368111710561"><a name="en-us_topic_0182219836_p16368111710561"></a><a name="en-us_topic_0182219836_p16368111710561"></a>MAC address of the NIC.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182219836_row9462132017562"><td class="cellrowborder" valign="top" width="20.14%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182219836_p12462142045618"><a name="en-us_topic_0182219836_p12462142045618"></a><a name="en-us_topic_0182219836_p12462142045618"></a>mtu</p>
    </td>
    <td class="cellrowborder" valign="top" width="20.68%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182219836_p6462120115613"><a name="en-us_topic_0182219836_p6462120115613"></a><a name="en-us_topic_0182219836_p6462120115613"></a>Mandatory</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.18%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182219836_p164629208564"><a name="en-us_topic_0182219836_p164629208564"></a><a name="en-us_topic_0182219836_p164629208564"></a>MTU of the NIC. The value ranges from 46 to 9600.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182219836_row16336324105610"><td class="cellrowborder" valign="top" width="20.14%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182219836_p93363246566"><a name="en-us_topic_0182219836_p93363246566"></a><a name="en-us_topic_0182219836_p93363246566"></a>vhostUserSocket</p>
    </td>
    <td class="cellrowborder" valign="top" width="20.68%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182219836_p73369248564"><a name="en-us_topic_0182219836_p73369248564"></a><a name="en-us_topic_0182219836_p73369248564"></a>Optional</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.18%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182219836_p17336192420566"><a name="en-us_topic_0182219836_p17336192420566"></a><a name="en-us_topic_0182219836_p17336192420566"></a>Socket path for DPDK polling. The path contains a maximum of 128 bytes. The naming rule can contain digits, letters, and hyphens (-). The path name must start with a letter.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0182219836_row27941415575"><td class="cellrowborder" valign="top" width="20.14%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182219836_p87911143578"><a name="en-us_topic_0182219836_p87911143578"></a><a name="en-us_topic_0182219836_p87911143578"></a>queues</p>
    </td>
    <td class="cellrowborder" valign="top" width="20.68%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182219836_p6791314185719"><a name="en-us_topic_0182219836_p6791314185719"></a><a name="en-us_topic_0182219836_p6791314185719"></a>Optional</p>
    </td>
    <td class="cellrowborder" valign="top" width="59.18%" headers="mcps1.1.4.1.3 "><p id="en-us_topic_0182219836_p4798148572"><a name="en-us_topic_0182219836_p4798148572"></a><a name="en-us_topic_0182219836_p4798148572"></a>Number of NIC queues. If this parameter is not set, the default value <strong id="en-us_topic_0182219836_b811014819506"><a name="en-us_topic_0182219836_b811014819506"></a><a name="en-us_topic_0182219836_b811014819506"></a>0</strong> is used.</p>
    </td>
    </tr>
    </tbody>
    </table>

    The following describes the output of the  **kata-runtime kata-network add-iface**  command for adding NICs:

    -   If the command is successfully executed, the NIC information in JSON format is returned from  **standard output \(stdout\)**. The content in JSON format is the same as the input NIC information.

        Example: 

        ```
        $ kata-runtime kata-network add-iface <container-id> net.json 
        {"device":"tap_test","name":"eth-test","IPAddresses":[{"Family":2,"Address":"173.85.100.1","Mask":"24"}],"mtu":1500,"hwAddr":"02:42:20:6e:03:01","pciAddr":"01.0/00"}
        ```

    -   If the command fails to be executed, null is returned from  **stdout**.

        Example: 

        ```
        $ kata-runtime kata-network add-iface <container-id> netbad.json 2>/dev/null
        null
        ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >If an IP address is specified for an NIC that is successfully added, Kata adds a default route whose destination is in the same network segment as the IP address of the NIC. In the preceding example, after the NIC is added, the following route is added to the container:  
    >```  
    >[root@6ec7a98 /]# ip route  
    >172.16.0.0/16 dev eth-test proto kernel scope link src 172.16.0.3  
    >```  

2.  **Run the following command to view the added NICs:**

    ```
    $ kata-runtime kata-network list-ifaces 6ec7a98
    [{"name":"eth-test","mac":"02:42:20:6f:a3:69","ip":["172.16.0.3/16"],"mtu":1500}]
    ```

    The information about the added NICs is displayed.

    The following describes the output of the  **kata-runtime kata-network list-ifaces **command for listing added NICs:

    -   If the command is executed successfully, information about all NICs inserted into the pod in JSON format is returned from  **stdout**.

        If multiple NICs are inserted into the pod, the NIC information in JSON array format is returned.

        ```
        $ kata-runtime kata-network list-ifaces <container-id>
        [{"name":"container_eth","mac":"02:42:20:6e:a2:59","ip":["172.17.25.23/8"],"mtu":1500},{"name":"container_eth_2","mac":"02:90:50:6b:a2:29","ip":["192.168.0.34/24"],"mtu":1500}]
        ```

        If no NIC is inserted into the pod, null is returned from  **stdout**.

        ```
        $ kata-runtime kata-network list-ifaces <container-id>
        null
        ```

    -   If the command fails to be executed, null is returned from  **stdout**, and error description is returned from  **standard error \(stderr\)**.

        Example: 

        ```
        $ kata-runtime kata-network list-ifaces <container-id>
        null
        ```

3.  **Add a route for a specified NIC.**

    ```
    $ cat ./test-route.json | kata-runtime kata-network add-route 6ec7a98 -
    [{"dest":"default","gateway":"172.16.0.1","device":"eth-test"}]
    ```

    The following describes the output of the  **kata-runtime kata-network add-route**  command for adding a route to a specified NIC:

    -   If the command is executed successfully, the added route information in JSON format is returned from  **stdout**.

        Example: 

        ```
        $ kata-runtime kata-network add-route <container-id> route.json 
        [{"dest":"177.17.0.0/24","gateway":"177.17.25.1","device":"netport_test_1"}]
        ```

    -   If the command fails to be executed, null is returned from  **stdout**, and error description is returned from  **standard error \(stderr\)**.

        Example: 

        ```
        $ kata-runtime kata-network add-route <container-id> routebad.json 2>/dev/null
        null
        ```

    Key fields are described as follows:

    -   **dest**: Network segment corresponding to the route. The value is in the format of <_ip_\>/<_mask_\>. <_ip_\> is mandatory. There are three cases:
        1.  Both IP address and mask are configured.
        2.  If only an IP address is configured, the default mask is 32.
        3.  If  **"dest":"default"**  is configured, there is no destination by default. In this case, the gateway needs to be configured.

    -   **gateway**: Next-hop gateway of the route. When  **"dest":"default"**  is configured, the gateway is mandatory. In other cases, this parameter is optional.
    -   **device**: Name of the NIC corresponding to the route, which is mandatory. The value contains a maximum of 15 characters.

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >If a route is added for the loopback device  **lo**  in the container, the device name corresponding to the  **device**  field in the route configuration file is  **lo**.  

4.  **Run the following command to delete a specified route:**

    ```
    $ cat ./test-route.json | kata-runtime kata-network del-route 6ec7a98 -
    ```

    The fields in the  **test-route.json**  file are the same as those in the JSON file for adding a route.

    The following describes the output of the** kata-runtime kata-network del-route**  command for deleting a specified route:

    -   If the command is executed successfully, the added route information in JSON format is returned from  **stdout**.

        Example: 

        ```
        $ kata-runtime kata-network del-route <container-id> route.json 
        [{"dest":"177.17.0.0/24","gateway":"177.17.25.1","device":"netport_test_1"}]
        ```

    -   If the command fails to be executed, null is returned from  **stdout**, and error description is returned from  **standard error \(stderr\)**.

        Example: 

        ```
        $ kata-runtime kata-network del-route <container-id> routebad.json 2>/dev/null
        null
        ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >-   In the input fields,  **dest**  is mandatory, and both  **device**  and  **gateway**  are optional. Kata performs fuzzy match based on different fields and deletes the corresponding routing rules. For example, if  **dest**  is set to an IP address, all rules of this IP address will be deleted.  
    >-   If the route of the loopback device  **lo**  in the container is deleted, the device name corresponding to the  **device**  field in the route configuration file is  **lo**.  

5.  **Run the following command to delete an NIC:**

    ```
    $ cat ./test-iface.json | kata-runtime kata-network del-iface 6ec7a98 -
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >When deleting an NIC, you can only delete it based on the  **name**  field in the NIC container. Kata does not identify other fields.  

    The following describes the output of the  **kata-runtime kata-network del-iface **command for deleting NICs:

    -   If the command is executed successfully, null is returned from  **stdout**.

        Example: 

        ```
        $ kata-runtime kata-network del-iface <container-id> net.json
        null
        ```

    -   If the command fails to be executed, the information about NICs that fail to be deleted in JSON format is returned from  **stdout**, and error description is returned from  **stderr**.

        Example: 

        ```
        $ kata-runtime kata-network del-iface <container-id> net.json
        {"device":"tapname_fun_012","name":"netport_test_1","IPAddresses":[{"Family":0,"Address":"177.17.0.1","Mask":"8"}],"mtu":1500,"hwAddr":"02:42:20:6e:a2:59","linkType":"tap"}
        ```



The preceding are common commands. For details about the command line interfaces, see  [APIs](#apis-32.md#EN-US_TOPIC_0184808188).

## Kata IPVS Subsystem

The secure container provides an API for adding the  **ipvs**  command and setting the IPVS rule for the container. The functions include adding, editing, and deleting virtual services, adding, editing, and deleting real servers, querying IPVS service information, setting connection timeout, clearing the system connection cache, and importing rules in batches.

1.  Add a virtual service address for the container.

    ```
    kata-runtime kata-ipvs ipvsadm --parameters "--add-service --tcp-service 172.17.0.7:80 --scheduler rr --persistent 3000" <container-id>
    ```

2.  Modify virtual service parameters of a container.

    ```
    kata-runtime kata-ipvs ipvsadm --parameters "--edit-service --tcp-service 172.17.0.7:80 --scheduler rr --persistent 5000" <container-id>
    ```

3.  Delete the virtual service address of a container.

    ```
    kata-runtime kata-ipvs ipvsadm --parameters "--delete-service --tcp-service 172.17.0.7:80" <container-id>
    ```

4.  Add a real server for the virtual service address.

    ```
    kata-runtime kata-ipvs ipvsadm --parameters "--add-server --tcp-service 172.17.0.7:80 --real-server 172.17.0.4:80 --weight 100" <container-id>
    ```

5.  Modify real server parameters of a container.

    ```
    kata-runtime kata-ipvs ipvsadm --parameters "--edit-server --tcp-service 172.17.0.7:80 --real-server 172.17.0.4:80 --weight 200" <container-id>
    ```

6.  Delete a real server from a container.

    ```
    kata-runtime kata-ipvs ipvsadm --parameters "--delete-server --tcp-service 172.17.0.7:80 --real-server 172.17.0.4:80" <container-id>
    ```

7.  Query service information.

    ```
    kata-runtime kata-ipvs ipvsadm --parameters "--list" <container-id>
    ```

8.  It takes a long time to import rules one by one. You can write rules into a file and import them in batches.

    ```
    kata-runtime kata-ipvs ipvsadm --restore - < <rule file path> <container-id>
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >By default, the NAT mode is used for adding a single real server. To add real servers in batches, you need to manually add the  **-m**  option to use the NAT mode.  
    >The following is an example of the rule file content:  
    >-A -t 10.10.11.12:100 -s rr -p  3000  
    >-a -t 10.10.11.12:100 -r  172.16.0.1:80 -m  
    >-a -t 10.10.11.12:100 -r  172.16.0.1:81 -m  
    >-a -t 10.10.11.12:100 -r 172.16.0.1:82  -m  

9.  Clear the system connection cache.

    ```
    kata-runtime kata-ipvs cleanup --parameters "--orig-dst 172.17.0.4 --protonum tcp" <container-id>
    ```

10. Set timeout interval for TCP, TCP FIN, or UDP connections.

    ```
    kata-runtime kata-ipvs ipvsadm --parameters "--set 100 100 200" <container-id>
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >1.  Each container supports a maximum of 20000 iptables rules \(5000 services and three servers/services\). Both add-service and add-server are rules.  
    >2.  Before importing rules in batches, you need to clear existing rules.  
    >3.  No concurrent test scenario exists.  
    >4.  The preceding are common commands. For details about the command line interfaces, see  [APIs](#apis-32.md#EN-US_TOPIC_0184808188).  


