# system-services

- [System Services](#system-services)
    - [Hardening the SSH Service](#hardening-the-ssh-service)


## hardening-the-ssh-service

### Description

The Secure Shell \(SSH\) is a reliable security protocol for remote logins and other network services. SSH prevents information disclosure during remote management. SSH encrypts transferred data to prevent domain name server \(DNS\) spoofing and IP spoofing. OpenSSH was created as an open source alternative to the proprietary SSH protocol.

Hardening the SSH service is to modify configurations of the SSH service to set the algorithm and authentication parameters when the system uses the OpenSSH protocol, improving the system security.  [Table 1](#en-us_topic_0152100390_ta2fdb8e4931b4c1a8f502b3c7d887b95)  describes the hardening items, recommended hardening values, and default policies.

### Implementation

To harden a server, perform the following steps:

1.  Open the configuration file  **/etc/ssh/sshd\_config**  of the SSH service on the server, and modify or add hardening items and values in the file.
2.  Save the  **/etc/ssh/sshd\_config**  file.
3.  Run the following command to restart the SSH service:

    ```
    systemctl restart sshd
    ```


  

To harden a client, perform the following steps:

1.  Open the configuration file  **/etc/ssh/ssh\_config**  of the SSH service on the client, and modify or add hardening items and values in the file.
2.  Save the  **/etc/ssh/ssh\_config**  file.
3.  Run the following command to restart the SSH service:

    ```
    systemctl restart sshd
    ```


### Hardening Items

-   Server hardening policies

    All SSH service hardening items are stored in the  **/etc/ssh/sshd\_config**  configuration file. For details about the server hardening items, hardening suggestions, and whether the hardening items are configured as suggested, see  [Table 1](#en-us_topic_0152100390_ta2fdb8e4931b4c1a8f502b3c7d887b95).

    **Table  1**  SSH hardening items on a server

    <a name="en-us_topic_0152100390_ta2fdb8e4931b4c1a8f502b3c7d887b95"></a>
    <table><thead align="left"><tr id="en-us_topic_0152100390_r4d2f72fcafd14675bc02bee3c0ea0406"><th class="cellrowborder" valign="top" width="16.56%" id="mcps1.2.5.1.1"><p id="en-us_topic_0152100390_a5a788889da7540eebcd9aaf9bc3aeccc"><a name="en-us_topic_0152100390_a5a788889da7540eebcd9aaf9bc3aeccc"></a><a name="en-us_topic_0152100390_a5a788889da7540eebcd9aaf9bc3aeccc"></a><strong id="b14010205318"><a name="b14010205318"></a><a name="b14010205318"></a>Item</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="45.34%" id="mcps1.2.5.1.2"><p id="p1214261722614"><a name="p1214261722614"></a><a name="p1214261722614"></a><strong id="b1337812303312"><a name="b1337812303312"></a><a name="b1337812303312"></a>Description</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="13.01%" id="mcps1.2.5.1.3"><p id="p5637181913256"><a name="p5637181913256"></a><a name="p5637181913256"></a><strong id="b4690121283313"><a name="b4690121283313"></a><a name="b4690121283313"></a>Suggestion</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="25.09%" id="mcps1.2.5.1.4"><p id="p885822412517"><a name="p885822412517"></a><a name="p885822412517"></a>Configured as Suggested</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0152100390_r5a9b833c70ba483b8c499394a5b309d1"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_ad4862b74ec314751ba5ed51f58c5dac5"><a name="en-us_topic_0152100390_ad4862b74ec314751ba5ed51f58c5dac5"></a><a name="en-us_topic_0152100390_ad4862b74ec314751ba5ed51f58c5dac5"></a>Protocol</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p1414317178266"><a name="p1414317178266"></a><a name="p1414317178266"></a>SSH protocol version.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a2d6a51ca12e947908f69d67b9af193ca"><a name="en-us_topic_0152100390_a2d6a51ca12e947908f69d67b9af193ca"></a><a name="en-us_topic_0152100390_a2d6a51ca12e947908f69d67b9af193ca"></a>2</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p4859724192520"><a name="p4859724192520"></a><a name="p4859724192520"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_r44ceabeb34da4e9987fe3935c1736412"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_a4be82302c28f48eb8bcca4ba76fe6eb7"><a name="en-us_topic_0152100390_a4be82302c28f48eb8bcca4ba76fe6eb7"></a><a name="en-us_topic_0152100390_a4be82302c28f48eb8bcca4ba76fe6eb7"></a>SyslogFacility</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p1914301718261"><a name="p1914301718261"></a><a name="p1914301718261"></a>Log type of the SSH service. The item is set to <strong id="b7257181017363"><a name="b7257181017363"></a><a name="b7257181017363"></a>AUTH</strong>, indicating authentication logs.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a4cd5d59270a14e119a26e2bf8dece17e"><a name="en-us_topic_0152100390_a4cd5d59270a14e119a26e2bf8dece17e"></a><a name="en-us_topic_0152100390_a4cd5d59270a14e119a26e2bf8dece17e"></a>AUTH</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p13859152420253"><a name="p13859152420253"></a><a name="p13859152420253"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_rc73eb068887e494585be470e8f5b32a9"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_a40f1f280f2c745b5b1a02acc779f84f5"><a name="en-us_topic_0152100390_a40f1f280f2c745b5b1a02acc779f84f5"></a><a name="en-us_topic_0152100390_a40f1f280f2c745b5b1a02acc779f84f5"></a>LogLevel</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p141431217102615"><a name="p141431217102615"></a><a name="p141431217102615"></a>Level for recording SSHD logs.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a34e8840e11fb42c0afb835476c79352b"><a name="en-us_topic_0152100390_a34e8840e11fb42c0afb835476c79352b"></a><a name="en-us_topic_0152100390_a34e8840e11fb42c0afb835476c79352b"></a>VERBOSE</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p08594247255"><a name="p08594247255"></a><a name="p08594247255"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_redc311a4d1bf4716895f5e70c7ac0382"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_ac6bf86f546904e7f8377599f3078fa78"><a name="en-us_topic_0152100390_ac6bf86f546904e7f8377599f3078fa78"></a><a name="en-us_topic_0152100390_ac6bf86f546904e7f8377599f3078fa78"></a>X11Forwarding</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p15143317142614"><a name="p15143317142614"></a><a name="p15143317142614"></a>Specifies whether a GUI can be used after login using SSH.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_ae83240dc2f4a4f588d85e04b30424475"><a name="en-us_topic_0152100390_ae83240dc2f4a4f588d85e04b30424475"></a><a name="en-us_topic_0152100390_ae83240dc2f4a4f588d85e04b30424475"></a>no</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p178596245259"><a name="p178596245259"></a><a name="p178596245259"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_re2ea8a3183cc4ae7824db49a63a4bad8"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_ae68a30c310a8457d9042a56e828694ee"><a name="en-us_topic_0152100390_ae68a30c310a8457d9042a56e828694ee"></a><a name="en-us_topic_0152100390_ae68a30c310a8457d9042a56e828694ee"></a>MaxAuthTries</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p1314331713267"><a name="p1314331713267"></a><a name="p1314331713267"></a>Maximum number of authentication attempts.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a889f057aeb1842f8a7c32fec43bad7e0"><a name="en-us_topic_0152100390_a889f057aeb1842f8a7c32fec43bad7e0"></a><a name="en-us_topic_0152100390_a889f057aeb1842f8a7c32fec43bad7e0"></a>3</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p16859192422518"><a name="p16859192422518"></a><a name="p16859192422518"></a>No</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_r91fb5f04b38544849fcf242a2fabe923"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_a25d8470312d144d0b378ed395c824774"><a name="en-us_topic_0152100390_a25d8470312d144d0b378ed395c824774"></a><a name="en-us_topic_0152100390_a25d8470312d144d0b378ed395c824774"></a>PubkeyAuthentication</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p15143171752617"><a name="p15143171752617"></a><a name="p15143171752617"></a>Specifies whether public key authentication is allowed.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_aa8df8c847c004e1fa5fb241a8caa5d04"><a name="en-us_topic_0152100390_aa8df8c847c004e1fa5fb241a8caa5d04"></a><a name="en-us_topic_0152100390_aa8df8c847c004e1fa5fb241a8caa5d04"></a>yes</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p15859102415254"><a name="p15859102415254"></a><a name="p15859102415254"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_r22fd663814db48f48583a040a98b105f"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_a34807ea1b3cd4970ba9cc4052df8bb28"><a name="en-us_topic_0152100390_a34807ea1b3cd4970ba9cc4052df8bb28"></a><a name="en-us_topic_0152100390_a34807ea1b3cd4970ba9cc4052df8bb28"></a>RSAAuthentication</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p7143191762613"><a name="p7143191762613"></a><a name="p7143191762613"></a>Specifies whether only RSA security authentication is allowed.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a42b290004abd4e52bf03b3b65a756d55"><a name="en-us_topic_0152100390_a42b290004abd4e52bf03b3b65a756d55"></a><a name="en-us_topic_0152100390_a42b290004abd4e52bf03b3b65a756d55"></a>yes</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p18591824132510"><a name="p18591824132510"></a><a name="p18591824132510"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_r97a5a1c692bf484f91c209a942809976"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_a8ae9f5b1489b46d6868761438680a1ee"><a name="en-us_topic_0152100390_a8ae9f5b1489b46d6868761438680a1ee"></a><a name="en-us_topic_0152100390_a8ae9f5b1489b46d6868761438680a1ee"></a>IgnoreRhosts</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p17144101742611"><a name="p17144101742611"></a><a name="p17144101742611"></a>Specifies whether the <strong id="b19581539114013"><a name="b19581539114013"></a><a name="b19581539114013"></a>rhosts</strong> and <strong id="b19885134313405"><a name="b19885134313405"></a><a name="b19885134313405"></a>shosts</strong> files are used for authentication. The <strong id="b339772104117"><a name="b339772104117"></a><a name="b339772104117"></a>rhosts</strong> and <strong id="b5637205124111"><a name="b5637205124111"></a><a name="b5637205124111"></a>shosts</strong> files record the names of the servers that support remote access and related login names.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a1a88179b609c4f709e5650ea62f64a83"><a name="en-us_topic_0152100390_a1a88179b609c4f709e5650ea62f64a83"></a><a name="en-us_topic_0152100390_a1a88179b609c4f709e5650ea62f64a83"></a>yes</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p3859142402516"><a name="p3859142402516"></a><a name="p3859142402516"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_re2468ad8b6874a55a2435bfc39126bbd"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_a2cd3e51dc2074a2faa96cf19f8bedf53"><a name="en-us_topic_0152100390_a2cd3e51dc2074a2faa96cf19f8bedf53"></a><a name="en-us_topic_0152100390_a2cd3e51dc2074a2faa96cf19f8bedf53"></a>RhostsRSAAuthentication</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p161441117182619"><a name="p161441117182619"></a><a name="p161441117182619"></a>Specifies whether the RSA algorithm security authentication based on the <strong id="b6288731104214"><a name="b6288731104214"></a><a name="b6288731104214"></a>rhosts</strong> file is used. The <strong id="b7562114434217"><a name="b7562114434217"></a><a name="b7562114434217"></a>rhosts</strong> file records the names of the servers that support remote access and related login names.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a36c9f090456947068b1086fd7e8dfbed"><a name="en-us_topic_0152100390_a36c9f090456947068b1086fd7e8dfbed"></a><a name="en-us_topic_0152100390_a36c9f090456947068b1086fd7e8dfbed"></a>no</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p1085912411254"><a name="p1085912411254"></a><a name="p1085912411254"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_raac33be7b06943288f95e8d45fe437c2"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_a8067046d06194e50a28132f28cb68058"><a name="en-us_topic_0152100390_a8067046d06194e50a28132f28cb68058"></a><a name="en-us_topic_0152100390_a8067046d06194e50a28132f28cb68058"></a>HostbasedAuthentication</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p12144201715262"><a name="p12144201715262"></a><a name="p12144201715262"></a>Specifies whether host-based authentication is used. Host-based authentication indicates that any user of a trusted client can use the SSH service.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_ae677e78eeffa4a9b9b42b1f05f571373"><a name="en-us_topic_0152100390_ae677e78eeffa4a9b9b42b1f05f571373"></a><a name="en-us_topic_0152100390_ae677e78eeffa4a9b9b42b1f05f571373"></a>no</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p1685915246254"><a name="p1685915246254"></a><a name="p1685915246254"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_ra02142c2f88e45e9b5be9a7454ae9448"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_aeb3a4319a7f44cbc8f2241e48f65f48e"><a name="en-us_topic_0152100390_aeb3a4319a7f44cbc8f2241e48f65f48e"></a><a name="en-us_topic_0152100390_aeb3a4319a7f44cbc8f2241e48f65f48e"></a>PermitRootLogin</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p91440171268"><a name="p91440171268"></a><a name="p91440171268"></a>Specifies whether to allow user <strong id="b9136193323713"><a name="b9136193323713"></a><a name="b9136193323713"></a>root</strong> to log in to the system using SSH.</p>
    <div class="note" id="note1914411176268"><a name="note1914411176268"></a><a name="note1914411176268"></a><span class="notetitle"> NOTE: </span><div class="notebody"><p id="p6144151714266"><a name="p6144151714266"></a><a name="p6144151714266"></a>If you want to log in to the system using SSH as user <strong id="b2795274442"><a name="b2795274442"></a><a name="b2795274442"></a>root</strong>, set the value of the <strong id="b126672516920"><a name="b126672516920"></a><a name="b126672516920"></a>PermitRootLogin</strong> field in the <strong id="b158384319440"><a name="b158384319440"></a><a name="b158384319440"></a>/etc/ssh/sshd_config</strong> file to <strong id="b126418345447"><a name="b126418345447"></a><a name="b126418345447"></a>yes</strong>.</p>
    </div></div>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a326aa8c282c7444b92feef6953d085c4"><a name="en-us_topic_0152100390_a326aa8c282c7444b92feef6953d085c4"></a><a name="en-us_topic_0152100390_a326aa8c282c7444b92feef6953d085c4"></a>no</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p1686018241259"><a name="p1686018241259"></a><a name="p1686018241259"></a>No</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_r7aacc28c65c74fca90175077fc480e57"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_ac503e1548200403bb052d000995c8544"><a name="en-us_topic_0152100390_ac503e1548200403bb052d000995c8544"></a><a name="en-us_topic_0152100390_ac503e1548200403bb052d000995c8544"></a>PermitEmptyPasswords</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p2144101742618"><a name="p2144101742618"></a><a name="p2144101742618"></a>Specifies whether accounts with empty passwords can log in.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a48de835fb1904c11a24b42319258a456"><a name="en-us_topic_0152100390_a48de835fb1904c11a24b42319258a456"></a><a name="en-us_topic_0152100390_a48de835fb1904c11a24b42319258a456"></a>no</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p7860224102518"><a name="p7860224102518"></a><a name="p7860224102518"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_re0d7fbc7c9fc401a843c873cb06e10a7"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_a8a5d7bed067a420dbe244d758132ac48"><a name="en-us_topic_0152100390_a8a5d7bed067a420dbe244d758132ac48"></a><a name="en-us_topic_0152100390_a8a5d7bed067a420dbe244d758132ac48"></a>PermitUserEnvironment</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p10144161722617"><a name="p10144161722617"></a><a name="p10144161722617"></a>Specifies whether to resolve the environment variables set in <strong id="b021731218459"><a name="b021731218459"></a><a name="b021731218459"></a>~/.ssh/environment</strong> and <strong id="b15217171204514"><a name="b15217171204514"></a><a name="b15217171204514"></a>~/.ssh/authorized_keys</strong>.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a8e7ecdd5a0984e68ae64dc126d15e6bd"><a name="en-us_topic_0152100390_a8e7ecdd5a0984e68ae64dc126d15e6bd"></a><a name="en-us_topic_0152100390_a8e7ecdd5a0984e68ae64dc126d15e6bd"></a>no</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p13860024142511"><a name="p13860024142511"></a><a name="p13860024142511"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_rb13a2c9225ea4e96b12ff171f63e2446"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_aec82f1776aed4ed1be55c30b97c8132e"><a name="en-us_topic_0152100390_aec82f1776aed4ed1be55c30b97c8132e"></a><a name="en-us_topic_0152100390_aec82f1776aed4ed1be55c30b97c8132e"></a>Ciphers</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p181455177265"><a name="p181455177265"></a><a name="p181455177265"></a>Encryption algorithm of SSH data transmission.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="p13917183744911"><a name="p13917183744911"></a><a name="p13917183744911"></a>aes128-ctr,aes192-ctr,aes256-ctr,chacha20-poly1305@openssh.com,aes128-gcm@openssh.com,aes256-gcm@openssh.com</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p17860112452519"><a name="p17860112452519"></a><a name="p17860112452519"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_r58aef0c769124e4faef4dbcc9fba6289"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_a71358cf17e6643e79098ebe8b6e4d5f3"><a name="en-us_topic_0152100390_a71358cf17e6643e79098ebe8b6e4d5f3"></a><a name="en-us_topic_0152100390_a71358cf17e6643e79098ebe8b6e4d5f3"></a>ClientAliveCountMax</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p151453173265"><a name="p151453173265"></a><a name="p151453173265"></a>Timeout count. After the server sends a request, if the number of times that the client does not respond reaches a specified value, the server automatically disconnects from the client.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_afd18ff131e504d68935c01c5d631a30b"><a name="en-us_topic_0152100390_afd18ff131e504d68935c01c5d631a30b"></a><a name="en-us_topic_0152100390_afd18ff131e504d68935c01c5d631a30b"></a>0</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p4860192442514"><a name="p4860192442514"></a><a name="p4860192442514"></a>No</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_r58ec735106794e20b7134090d12b88ca"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_a457dd97fd178472fb72aef33c32bb862"><a name="en-us_topic_0152100390_a457dd97fd178472fb72aef33c32bb862"></a><a name="en-us_topic_0152100390_a457dd97fd178472fb72aef33c32bb862"></a>Banner</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p14997203714265"><a name="p14997203714265"></a><a name="p14997203714265"></a>File of the prompt information displayed before and after SSH login.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_afec727bade404e77a57d60c6aba39281"><a name="en-us_topic_0152100390_afec727bade404e77a57d60c6aba39281"></a><a name="en-us_topic_0152100390_afec727bade404e77a57d60c6aba39281"></a>/etc/issue.net</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p8860424182511"><a name="p8860424182511"></a><a name="p8860424182511"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_r4727e45c60c54b53861f18f423f489e1"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_a957811640d1949ae8f7893b0de61df8e"><a name="en-us_topic_0152100390_a957811640d1949ae8f7893b0de61df8e"></a><a name="en-us_topic_0152100390_a957811640d1949ae8f7893b0de61df8e"></a>MACs</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p19145217162616"><a name="p19145217162616"></a><a name="p19145217162616"></a>Hash algorithm for SSH data verification.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_ab749b83348bd4b078841e5f2c959c1ce"><a name="en-us_topic_0152100390_ab749b83348bd4b078841e5f2c959c1ce"></a><a name="en-us_topic_0152100390_ab749b83348bd4b078841e5f2c959c1ce"></a>hmac-sha2-512,hmac-sha2-512-etm@openssh.com,hmac-sha2-256,hmac-sha2-256-etm@openssh.com,hmac-sha1,hmac-sha1-etm@openssh.com</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p18860142412259"><a name="p18860142412259"></a><a name="p18860142412259"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_r8fb6ef1702d345cb9f3fcf00feac2574"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_aca557b5729654c54bb8db977cb923ec4"><a name="en-us_topic_0152100390_aca557b5729654c54bb8db977cb923ec4"></a><a name="en-us_topic_0152100390_aca557b5729654c54bb8db977cb923ec4"></a>StrictModes</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p131452176264"><a name="p131452176264"></a><a name="p131452176264"></a>Specifies whether to check the permission on and ownership of the home directory and <strong id="b3541204475111"><a name="b3541204475111"></a><a name="b3541204475111"></a>rhosts</strong> file before SSH receives login requests.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a4c394be7008f4a15b7ae04b68f73aba6"><a name="en-us_topic_0152100390_a4c394be7008f4a15b7ae04b68f73aba6"></a><a name="en-us_topic_0152100390_a4c394be7008f4a15b7ae04b68f73aba6"></a>yes</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p886012442513"><a name="p886012442513"></a><a name="p886012442513"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_r81f8f25273ac4cb5b45ae266156df059"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_a0e112f6e6dc5457296c3937a65f4baa9"><a name="en-us_topic_0152100390_a0e112f6e6dc5457296c3937a65f4baa9"></a><a name="en-us_topic_0152100390_a0e112f6e6dc5457296c3937a65f4baa9"></a>UsePAM</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p71452172269"><a name="p71452172269"></a><a name="p71452172269"></a>Specifies whether to use PAM for login authentication.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a83ba0cb8d2f24245a7957de6b7213713"><a name="en-us_topic_0152100390_a83ba0cb8d2f24245a7957de6b7213713"></a><a name="en-us_topic_0152100390_a83ba0cb8d2f24245a7957de6b7213713"></a>yes</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p108601524132516"><a name="p108601524132516"></a><a name="p108601524132516"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_ra3c194f027b347198caaa62aa1c97e72"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_ae1abad7ddf904a52be365eac52040e76"><a name="en-us_topic_0152100390_ae1abad7ddf904a52be365eac52040e76"></a><a name="en-us_topic_0152100390_ae1abad7ddf904a52be365eac52040e76"></a>AllowTcpForwarding</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p51461217182615"><a name="p51461217182615"></a><a name="p51461217182615"></a>Specifies whether to allow TCP forwarding.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a88c2e0bdc8ac4f3690521085a4c7302b"><a name="en-us_topic_0152100390_a88c2e0bdc8ac4f3690521085a4c7302b"></a><a name="en-us_topic_0152100390_a88c2e0bdc8ac4f3690521085a4c7302b"></a>no</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p1686010249252"><a name="p1686010249252"></a><a name="p1686010249252"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_r208b7c1f7be144839be09bed7353ffc2"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_aafda9d2b0cb144719aa1408e26ce4ac0"><a name="en-us_topic_0152100390_aafda9d2b0cb144719aa1408e26ce4ac0"></a><a name="en-us_topic_0152100390_aafda9d2b0cb144719aa1408e26ce4ac0"></a>Subsystem       sftp    /usr/libexec/openssh/sftp-server</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p4146171742619"><a name="p4146171742619"></a><a name="p4146171742619"></a>SFTP log record level, which records the INFO level and authentication logs.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a3a131d5ce5454d2d9a80fc4db4989cda"><a name="en-us_topic_0152100390_a3a131d5ce5454d2d9a80fc4db4989cda"></a><a name="en-us_topic_0152100390_a3a131d5ce5454d2d9a80fc4db4989cda"></a>-l INFO -f AUTH</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p1586014245253"><a name="p1586014245253"></a><a name="p1586014245253"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_r73f4a056def8438aa97e31e5bd9896c1"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_a78beead59f23417ebbb776213482756c"><a name="en-us_topic_0152100390_a78beead59f23417ebbb776213482756c"></a><a name="en-us_topic_0152100390_a78beead59f23417ebbb776213482756c"></a>AllowAgentForwarding</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p214612178266"><a name="p214612178266"></a><a name="p214612178266"></a>Specifies whether to allow SSH Agent forwarding.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a9b2f10649aee4a4e8e859892ee34a54f"><a name="en-us_topic_0152100390_a9b2f10649aee4a4e8e859892ee34a54f"></a><a name="en-us_topic_0152100390_a9b2f10649aee4a4e8e859892ee34a54f"></a>no</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p1886019242254"><a name="p1886019242254"></a><a name="p1886019242254"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_rb752bff1881344b79822b8e9f18cc2f2"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_af95ea51d936b4d969964b788b89e219c"><a name="en-us_topic_0152100390_af95ea51d936b4d969964b788b89e219c"></a><a name="en-us_topic_0152100390_af95ea51d936b4d969964b788b89e219c"></a>GatewayPorts</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p17146617122613"><a name="p17146617122613"></a><a name="p17146617122613"></a>Specifies whether SSH can connect to ports on the forwarding client.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a9e17bcb62c0848589c235f0bb5cc9a17"><a name="en-us_topic_0152100390_a9e17bcb62c0848589c235f0bb5cc9a17"></a><a name="en-us_topic_0152100390_a9e17bcb62c0848589c235f0bb5cc9a17"></a>no</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p13860172412513"><a name="p13860172412513"></a><a name="p13860172412513"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_r3051ba44322c48e9833a9952befb40ba"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_a815df24daad140979fdf9d41a0ab3cf2"><a name="en-us_topic_0152100390_a815df24daad140979fdf9d41a0ab3cf2"></a><a name="en-us_topic_0152100390_a815df24daad140979fdf9d41a0ab3cf2"></a>PermitTunnel</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p5146717152611"><a name="p5146717152611"></a><a name="p5146717152611"></a>Specifies whether Tunnel devices are allowed.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a081f059f935f46fdbb4cf4300e0b0646"><a name="en-us_topic_0152100390_a081f059f935f46fdbb4cf4300e0b0646"></a><a name="en-us_topic_0152100390_a081f059f935f46fdbb4cf4300e0b0646"></a>no</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p7860202492510"><a name="p7860202492510"></a><a name="p7860202492510"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_r4c9c8b38fdc74f838f2c43ead0e7232b"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_a979db52808dd45b78e6206b0cefd9dd0"><a name="en-us_topic_0152100390_a979db52808dd45b78e6206b0cefd9dd0"></a><a name="en-us_topic_0152100390_a979db52808dd45b78e6206b0cefd9dd0"></a>KexAlgorithms</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p1914641722613"><a name="p1914641722613"></a><a name="p1914641722613"></a>SSH key exchange algorithms.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="p209516241518"><a name="p209516241518"></a><a name="p209516241518"></a>curve25519-sha256,curve25519-sha256@@libssh.org,diffie-hellman-group14-sha1,diffie-hellman-group-exchange-sha1,diffie-hellman-group-exchange-sha256</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p19860122420254"><a name="p19860122420254"></a><a name="p19860122420254"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_row120445315716"><td class="cellrowborder" valign="top" width="16.56%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_p1221012943318"><a name="en-us_topic_0152100390_p1221012943318"></a><a name="en-us_topic_0152100390_p1221012943318"></a>LoginGraceTime</p>
    </td>
    <td class="cellrowborder" valign="top" width="45.34%" headers="mcps1.2.5.1.2 "><p id="p1014611782612"><a name="p1014611782612"></a><a name="p1014611782612"></a>Time limit for users passing the authentication. <strong id="b2015420612572"><a name="b2015420612572"></a><a name="b2015420612572"></a>0</strong> indicates no limit. The default value is <strong id="b10360192313573"><a name="b10360192313573"></a><a name="b10360192313573"></a>60</strong> seconds.</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.01%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_p182107295333"><a name="en-us_topic_0152100390_p182107295333"></a><a name="en-us_topic_0152100390_p182107295333"></a>60</p>
    </td>
    <td class="cellrowborder" valign="top" width="25.09%" headers="mcps1.2.5.1.4 "><p id="p78601124112511"><a name="p78601124112511"></a><a name="p78601124112511"></a>No</p>
    </td>
    </tr>
    </tbody>
    </table>

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >By default, the messages displayed before and after SSH login are saved in the  **/etc/issue.net**  file. The default information in the  **/etc/issue.net**  file is  **Authorized users only.** **All activities may be monitored and reported.**  


-   Client hardening policies

    All SSH service hardening items are stored in the  **/etc/ssh/ssh\_config**  configuration file. For details about the client hardening items, hardening suggestions, and whether the hardening items are configured as suggested, see  [Table 2](#en-us_topic_0152100390_tb289c5a6f1c7420ab4339187f9018ea4).

    **Table  2**  SSH hardening items on a client

    <a name="en-us_topic_0152100390_tb289c5a6f1c7420ab4339187f9018ea4"></a>
    <table><thead align="left"><tr id="en-us_topic_0152100390_r44edd336d98b4b9d8f79541632485d69"><th class="cellrowborder" valign="top" width="27.07%" id="mcps1.2.5.1.1"><p id="en-us_topic_0152100390_aa6b40273f27a4fe6b5d9dc2621704e2a"><a name="en-us_topic_0152100390_aa6b40273f27a4fe6b5d9dc2621704e2a"></a><a name="en-us_topic_0152100390_aa6b40273f27a4fe6b5d9dc2621704e2a"></a><strong id="b2074993017417"><a name="b2074993017417"></a><a name="b2074993017417"></a>Item</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="9.569999999999999%" id="mcps1.2.5.1.2"><p id="p4200165344720"><a name="p4200165344720"></a><a name="p4200165344720"></a><strong id="b16581133217413"><a name="b16581133217413"></a><a name="b16581133217413"></a>Description</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="54.510000000000005%" id="mcps1.2.5.1.3"><p id="en-us_topic_0152100390_a290970b43dee442f998bcc1c350766d9"><a name="en-us_topic_0152100390_a290970b43dee442f998bcc1c350766d9"></a><a name="en-us_topic_0152100390_a290970b43dee442f998bcc1c350766d9"></a><strong id="b17261433164113"><a name="b17261433164113"></a><a name="b17261433164113"></a>Suggestion</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="8.85%" id="mcps1.2.5.1.4"><p id="p1180961694714"><a name="p1180961694714"></a><a name="p1180961694714"></a><strong id="b14521195301112"><a name="b14521195301112"></a><a name="b14521195301112"></a>Configured as Suggested</strong></p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0152100390_r560ff9b97c674848a5d4d6660ce545f0"><td class="cellrowborder" valign="top" width="27.07%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_aad01e5b2344c4aa39339721d5d43108d"><a name="en-us_topic_0152100390_aad01e5b2344c4aa39339721d5d43108d"></a><a name="en-us_topic_0152100390_aad01e5b2344c4aa39339721d5d43108d"></a>KexAlgorithms</p>
    </td>
    <td class="cellrowborder" valign="top" width="9.569999999999999%" headers="mcps1.2.5.1.2 "><p id="p6200165334714"><a name="p6200165334714"></a><a name="p6200165334714"></a>SSH key exchange algorithms.</p>
    </td>
    <td class="cellrowborder" valign="top" width="54.510000000000005%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_a2afb24fc01c44ad9923f003fd9c2200a"><a name="en-us_topic_0152100390_a2afb24fc01c44ad9923f003fd9c2200a"></a><a name="en-us_topic_0152100390_a2afb24fc01c44ad9923f003fd9c2200a"></a>ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521,diffie-hellman-group-exchange-sha256,diffie-hellman-group-exchange-sha1,diffie-hellman-group14-sha1</p>
    </td>
    <td class="cellrowborder" valign="top" width="8.85%" headers="mcps1.2.5.1.4 "><p id="p10810111614714"><a name="p10810111614714"></a><a name="p10810111614714"></a>No</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100390_r40dd5cf27e034257a10c8c91b60f643f"><td class="cellrowborder" valign="top" width="27.07%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100390_ab489f8fce6a44f0592d72a2c4c8e7a18"><a name="en-us_topic_0152100390_ab489f8fce6a44f0592d72a2c4c8e7a18"></a><a name="en-us_topic_0152100390_ab489f8fce6a44f0592d72a2c4c8e7a18"></a>VerifyHostKeyDNS</p>
    </td>
    <td class="cellrowborder" valign="top" width="9.569999999999999%" headers="mcps1.2.5.1.2 "><p id="p14201553194712"><a name="p14201553194712"></a><a name="p14201553194712"></a>Specifies whether to verify HostKey files by using DNS or SSHFP.</p>
    </td>
    <td class="cellrowborder" valign="top" width="54.510000000000005%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100390_ac6c69b55dd3647c68a2ff6ec73cf0ed5"><a name="en-us_topic_0152100390_ac6c69b55dd3647c68a2ff6ec73cf0ed5"></a><a name="en-us_topic_0152100390_ac6c69b55dd3647c68a2ff6ec73cf0ed5"></a>ask</p>
    </td>
    <td class="cellrowborder" valign="top" width="8.85%" headers="mcps1.2.5.1.4 "><p id="p12810181644719"><a name="p12810181644719"></a><a name="p12810181644719"></a>No</p>
    </td>
    </tr>
    </tbody>
    </table>

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >Third-party clients and servers that use the Diffie-Hellman algorithm are required to allow at least 2048-bit connection.  


### Other Security Suggestions

-   The SSH service only listens on specified IP addresses.

    For security purposes, you are advised to only listen on required IP addresses rather than listen on 0.0.0.0 when using the SSH service. You can specify the IP addresses that SSH needs to listen on in the ListenAddress configuration item in the  **/etc/ssh/sshd\_config**  file.

    1.  Open and modify the  **/etc/ssh/sshd\_config**  file.

        ```
        vi /etc/ssh/sshd_config
        ```

        The following information indicates that the bound listening IP address is  **192.168.1.100**. You can change the listening IP address based on the site requirements.

        ```
        ...
        ListenAddress 192.168.1.100
        ...
        ```

    2.  Restart the SSH service.

        ```
        systemctl restart sshd.service
        ```



-   SFTP users are restricted from access to upper-level directories.

    SFTP is a secure FTP designed to provide secure file transfer over SSH. Users can only use dedicated accounts to access SFTP for file upload and download, instead of SSH login. In addition, directories that can be accessed over SFTP are limited to prevent directory traversal attacks. The configuration process is as follows:

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >In the following configurations,  **sftpgroup**  is an example user group name, and  **sftpuser**  is an example username.  

    1.  Create an SFTP user group.

        ```
        groupadd sftpgroup
        ```

    2.  Create an SFTP root directory.

        ```
        mkdir /sftp
        ```

    3.  Modify the ownership of and permission on the SFTP root directory.

        ```
        chown root:root /sftp
        chmod 755 /sftp
        ```

    4.  Create an SFTP user.

        ```
        useradd -g sftpgroup -s /sbin/nologin sftpuser
        ```

    5.  Set the password of the SFTP user.

        ```
        passwd sftpuser
        ```

    6.  Create a directory used to store files uploaded by the SFTP user.

        ```
        mkdir /sftp/sftpuser
        ```

    7.  Modify the ownership of and permission on the upload directory of the SFTP user.

        ```
        chown root:root /sftp/sftpuser
        chmod 777 /sftp/sftpuser
        ```

    8.  Modify the  **/etc/ssh/sshd\_config**  file.

        ```
        vi /etc/ssh/sshd_config
        ```

        Modify the following information:

        ```
        #Subsystem sftp /usr/libexec/openssh/sftp-server -l INFO -f AUTH
        Subsystem sftp internal-sftp -l INFO -f AUTH
        ...
         
        Match Group sftpgroup                  
            ChrootDirectory /sftp/%u
            ForceCommand internal-sftp
        ```

        >![](public_sys-resources/icon-note.gif) **NOTE:**   
        >-   **%u**  is a wildcard character. Enter  **%u**  to represent the username of the current SFTP user.  
        >-   The following content must be added to the end of the  **/etc/ssh/sshd\_config**  file:  
        >    ```  
        >      Match Group sftpgroup                    
        >        ChrootDirectory /sftp/%u  
        >        ForceCommand internal-sftp  
        >    ```  

    9.  Restart the SSH service.

        ```
        systemctl restart sshd.service
        ```



-   Remotely execute commands using SSH.

    When a command is executed remotely through OpenSSH, TTY is disabled by default. If a password is required during command execution, the password is displayed in plain text. To ensure password input security, you are advised to add the  **-t**  option to the command. Example: 

    ```
    ssh -t testuser@192.168.1.100 su
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >**192.168.1.100**  is an example IP address, and  **testuser**  is an example username.  
