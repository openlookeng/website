# Kernel Parameters

- [Kernel Parameters](#kernel-parameters)
    - [Hardening the Security of Kernel Parameters](#hardening-the-security-of-kernel-parameters)


## Hardening the Security of Kernel Parameters

### Description

Kernel parameters specify the status of network configurations and application privileges. The kernel provides system control which can be fine-tuned or configured by users. This function can improve the security of the OS by controlling configurable kernel parameters. For example, you can fine-tune or configure network options to improve system security.

### Implementation

1.  Write the hardening items in  [Table 1](#en-us_topic_0152100187_t69b5423c26644b26abe94d88d38878eb)  to the  **/etc/sysctl.conf**  file.

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >Record security hardening items as follows:  
    >```  
    >net.ipv4.icmp_echo_ignore_broadcasts = 1  
    >net.ipv4.conf.all.rp_filter = 1  
    >net.ipv4.conf.default.rp_filter = 1  
    >```  

    **Table  1**  Policies for hardening the security of kernel parameters

    <a name="en-us_topic_0152100187_t69b5423c26644b26abe94d88d38878eb"></a>
    <table><thead align="left"><tr id="en-us_topic_0152100187_raa25cc70d4fe490f9aeff1ef28082cc3"><th class="cellrowborder" valign="top" width="27.82%" id="mcps1.2.5.1.1"><p id="en-us_topic_0152100187_a3d294a7ff4e94f3cacac538105f8416e"><a name="en-us_topic_0152100187_a3d294a7ff4e94f3cacac538105f8416e"></a><a name="en-us_topic_0152100187_a3d294a7ff4e94f3cacac538105f8416e"></a><strong id="b14199248174712"><a name="b14199248174712"></a><a name="b14199248174712"></a>Item</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="42.28%" id="mcps1.2.5.1.2"><p id="p133291054141312"><a name="p133291054141312"></a><a name="p133291054141312"></a><strong id="b20327105024719"><a name="b20327105024719"></a><a name="b20327105024719"></a>Description</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="16.85%" id="mcps1.2.5.1.3"><p id="en-us_topic_0152100187_ada469cd7a6a84715ae84396e20e11d2e"><a name="en-us_topic_0152100187_ada469cd7a6a84715ae84396e20e11d2e"></a><a name="en-us_topic_0152100187_ada469cd7a6a84715ae84396e20e11d2e"></a><strong id="b895113512476"><a name="b895113512476"></a><a name="b895113512476"></a>Suggestion</strong></p>
    </th>
    <th class="cellrowborder" valign="top" width="13.05%" id="mcps1.2.5.1.4"><p id="p91291791816"><a name="p91291791816"></a><a name="p91291791816"></a>Configured as Suggested</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0152100187_r8b1dbfa22e234195bfbced76a937c44a"><td class="cellrowborder" valign="top" width="27.82%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_a34bc895b203945bbaa10ecf47c6ca388"><a name="en-us_topic_0152100187_a34bc895b203945bbaa10ecf47c6ca388"></a><a name="en-us_topic_0152100187_a34bc895b203945bbaa10ecf47c6ca388"></a>net.ipv4.icmp_echo_ignore_broadcasts</p>
    </td>
    <td class="cellrowborder" valign="top" width="42.28%" headers="mcps1.2.5.1.2 "><p id="p8329854171310"><a name="p8329854171310"></a><a name="p8329854171310"></a>Specifies whether ICMP broadcast packets are accepted. They are not accepted according to the hardening policy.</p>
    </td>
    <td class="cellrowborder" valign="top" width="16.85%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100187_a53b1ce6a103a462bb8c2b589bb162754"><a name="en-us_topic_0152100187_a53b1ce6a103a462bb8c2b589bb162754"></a><a name="en-us_topic_0152100187_a53b1ce6a103a462bb8c2b589bb162754"></a>1</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.05%" headers="mcps1.2.5.1.4 "><p id="p20129578189"><a name="p20129578189"></a><a name="p20129578189"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_r19aa5f58a362414089ba635da07935d2"><td class="cellrowborder" valign="top" width="27.82%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_a398aedc4f221443ab77a22c52040e74c"><a name="en-us_topic_0152100187_a398aedc4f221443ab77a22c52040e74c"></a><a name="en-us_topic_0152100187_a398aedc4f221443ab77a22c52040e74c"></a>net.ipv4.conf.all.rp_filter</p>
    </td>
    <td class="cellrowborder" rowspan="2" valign="top" width="42.28%" headers="mcps1.2.5.1.2 "><p id="p118393941612"><a name="p118393941612"></a><a name="p118393941612"></a>Specifies whether the actual source IP address used by a data packet is related to a routing table and whether the data packet receives responses through interfaces. The item is enabled according to the hardening policy.</p>
    </td>
    <td class="cellrowborder" valign="top" width="16.85%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100187_af33eda0103b74c6cb04754b992df526e"><a name="en-us_topic_0152100187_af33eda0103b74c6cb04754b992df526e"></a><a name="en-us_topic_0152100187_af33eda0103b74c6cb04754b992df526e"></a>1</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.05%" headers="mcps1.2.5.1.4 "><p id="p71293720187"><a name="p71293720187"></a><a name="p71293720187"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_r0b5424b75653481e8c0b54d2349f7731"><td class="cellrowborder" valign="top" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_a70e0478bd14349f0bc8e8acf6a07ed19"><a name="en-us_topic_0152100187_a70e0478bd14349f0bc8e8acf6a07ed19"></a><a name="en-us_topic_0152100187_a70e0478bd14349f0bc8e8acf6a07ed19"></a>net.ipv4.conf.default.rp_filter</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0152100187_a81cf78b891f243f28f04d250a5deabc7"><a name="en-us_topic_0152100187_a81cf78b891f243f28f04d250a5deabc7"></a><a name="en-us_topic_0152100187_a81cf78b891f243f28f04d250a5deabc7"></a>1</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.2.5.1.3 "><p id="p18129167161812"><a name="p18129167161812"></a><a name="p18129167161812"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_r03ec48a2baa6432eaad5a2f95a5c85b5"><td class="cellrowborder" valign="top" width="27.82%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_aa90f8f2fdcfc40ef86c8f751630f0d85"><a name="en-us_topic_0152100187_aa90f8f2fdcfc40ef86c8f751630f0d85"></a><a name="en-us_topic_0152100187_aa90f8f2fdcfc40ef86c8f751630f0d85"></a>net.ipv4.ip_forward</p>
    </td>
    <td class="cellrowborder" valign="top" width="42.28%" headers="mcps1.2.5.1.2 "><p id="p162271705177"><a name="p162271705177"></a><a name="p162271705177"></a>The IP forwarding function prevents unauthorized IP address packets from being transferred to a network. The item is disabled according to the hardening policy.</p>
    </td>
    <td class="cellrowborder" valign="top" width="16.85%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100187_a07ee3c75eae9493d98e79a7bd9df7449"><a name="en-us_topic_0152100187_a07ee3c75eae9493d98e79a7bd9df7449"></a><a name="en-us_topic_0152100187_a07ee3c75eae9493d98e79a7bd9df7449"></a>0</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.05%" headers="mcps1.2.5.1.4 "><p id="p191290781810"><a name="p191290781810"></a><a name="p191290781810"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_r7fdfdf1805c249d0abd5be54e16199db"><td class="cellrowborder" valign="top" width="27.82%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_aab9f3be48ad048a49dff8be6400d5eb8"><a name="en-us_topic_0152100187_aab9f3be48ad048a49dff8be6400d5eb8"></a><a name="en-us_topic_0152100187_aab9f3be48ad048a49dff8be6400d5eb8"></a>net.ipv4.conf.all.accept_source_route</p>
    </td>
    <td class="cellrowborder" rowspan="2" valign="top" width="42.28%" headers="mcps1.2.5.1.2 "><p id="p4522185513164"><a name="p4522185513164"></a><a name="p4522185513164"></a><strong id="b8496102102319"><a name="b8496102102319"></a><a name="b8496102102319"></a>accept_source_route</strong> indicates that a packet sender can specify a path for sending the packet and a path for receiving a response. The item is disabled according to the hardening policy.</p>
    </td>
    <td class="cellrowborder" valign="top" width="16.85%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100187_ad970bc2d4d8746d2819d9fa5b0f0bbe9"><a name="en-us_topic_0152100187_ad970bc2d4d8746d2819d9fa5b0f0bbe9"></a><a name="en-us_topic_0152100187_ad970bc2d4d8746d2819d9fa5b0f0bbe9"></a>0</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.05%" headers="mcps1.2.5.1.4 "><p id="p112914721813"><a name="p112914721813"></a><a name="p112914721813"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_ra433bb1dbe47458190fdb22abb665998"><td class="cellrowborder" valign="top" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_a3d4844c94bb04a60b740a33dcf5e795f"><a name="en-us_topic_0152100187_a3d4844c94bb04a60b740a33dcf5e795f"></a><a name="en-us_topic_0152100187_a3d4844c94bb04a60b740a33dcf5e795f"></a>net.ipv4.conf.default.accept_source_route</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0152100187_a682a06f32995423c8de8fb8ad3f54559"><a name="en-us_topic_0152100187_a682a06f32995423c8de8fb8ad3f54559"></a><a name="en-us_topic_0152100187_a682a06f32995423c8de8fb8ad3f54559"></a>0</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.2.5.1.3 "><p id="p91294781816"><a name="p91294781816"></a><a name="p91294781816"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_r8ef770ca7fb34a0b9dbb6b89e8370976"><td class="cellrowborder" valign="top" width="27.82%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_a342512d73c3e4195a91239afc4ff1efd"><a name="en-us_topic_0152100187_a342512d73c3e4195a91239afc4ff1efd"></a><a name="en-us_topic_0152100187_a342512d73c3e4195a91239afc4ff1efd"></a>net.ipv4.conf.all.accept_redirects</p>
    </td>
    <td class="cellrowborder" rowspan="4" valign="top" width="42.28%" headers="mcps1.2.5.1.2 "><p id="p4141124519161"><a name="p4141124519161"></a><a name="p4141124519161"></a>Specifies whether a redirected ICMP packet is sent. The packet is not sent according to the hardening policy.</p>
    </td>
    <td class="cellrowborder" valign="top" width="16.85%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100187_a191b201819404f3a8066f0fa64782147"><a name="en-us_topic_0152100187_a191b201819404f3a8066f0fa64782147"></a><a name="en-us_topic_0152100187_a191b201819404f3a8066f0fa64782147"></a>0</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.05%" headers="mcps1.2.5.1.4 "><p id="p1412907171813"><a name="p1412907171813"></a><a name="p1412907171813"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_r5390901e81f54e40ba5d940720a21faa"><td class="cellrowborder" valign="top" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_af453e4487bb748f08e38c4209fdfdcae"><a name="en-us_topic_0152100187_af453e4487bb748f08e38c4209fdfdcae"></a><a name="en-us_topic_0152100187_af453e4487bb748f08e38c4209fdfdcae"></a>net.ipv4.conf.default.accept_redirects</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0152100187_abc81602234514f698721578cdcb8fcad"><a name="en-us_topic_0152100187_abc81602234514f698721578cdcb8fcad"></a><a name="en-us_topic_0152100187_abc81602234514f698721578cdcb8fcad"></a>0</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.2.5.1.3 "><p id="p17129107161817"><a name="p17129107161817"></a><a name="p17129107161817"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_row1256953610615"><td class="cellrowborder" valign="top" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_p152163361301"><a name="en-us_topic_0152100187_p152163361301"></a><a name="en-us_topic_0152100187_p152163361301"></a>net.ipv6.conf.all.accept_redirects</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0152100187_p7216236133012"><a name="en-us_topic_0152100187_p7216236133012"></a><a name="en-us_topic_0152100187_p7216236133012"></a>0</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.2.5.1.3 "><p id="p7129870188"><a name="p7129870188"></a><a name="p7129870188"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_row9773333167"><td class="cellrowborder" valign="top" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_p746123313019"><a name="en-us_topic_0152100187_p746123313019"></a><a name="en-us_topic_0152100187_p746123313019"></a>net.ipv6.conf.default.accept_redirects</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0152100187_p184603373013"><a name="en-us_topic_0152100187_p184603373013"></a><a name="en-us_topic_0152100187_p184603373013"></a>0</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.2.5.1.3 "><p id="p912957191815"><a name="p912957191815"></a><a name="p912957191815"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_r21d6fa41ecd140b49c60799ec6027ecc"><td class="cellrowborder" valign="top" width="27.82%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_a9e1a01f9f7774b6796c6d3cf43334480"><a name="en-us_topic_0152100187_a9e1a01f9f7774b6796c6d3cf43334480"></a><a name="en-us_topic_0152100187_a9e1a01f9f7774b6796c6d3cf43334480"></a>net.ipv4.conf.all.send_redirects</p>
    </td>
    <td class="cellrowborder" rowspan="2" valign="top" width="42.28%" headers="mcps1.2.5.1.2 "><p id="p11731025131611"><a name="p11731025131611"></a><a name="p11731025131611"></a>Specifies whether a redirected ICMP packet is sent to another server. This item is enabled only when the host functions as a route. The item is disabled according to the hardening policy.</p>
    </td>
    <td class="cellrowborder" valign="top" width="16.85%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100187_a94f328309ba647909712f2fdf5333725"><a name="en-us_topic_0152100187_a94f328309ba647909712f2fdf5333725"></a><a name="en-us_topic_0152100187_a94f328309ba647909712f2fdf5333725"></a>0</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.05%" headers="mcps1.2.5.1.4 "><p id="p101309712188"><a name="p101309712188"></a><a name="p101309712188"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_rb3d65aa2f78f4c01970d6c06988eadae"><td class="cellrowborder" valign="top" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_a9a20b9854dae4621b6c0973a35c28608"><a name="en-us_topic_0152100187_a9a20b9854dae4621b6c0973a35c28608"></a><a name="en-us_topic_0152100187_a9a20b9854dae4621b6c0973a35c28608"></a>net.ipv4.conf.default.send_redirects</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0152100187_a7868ba9fb3be4ea698f39f81b11023c5"><a name="en-us_topic_0152100187_a7868ba9fb3be4ea698f39f81b11023c5"></a><a name="en-us_topic_0152100187_a7868ba9fb3be4ea698f39f81b11023c5"></a>0</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.2.5.1.3 "><p id="p1413027151816"><a name="p1413027151816"></a><a name="p1413027151816"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_r1bed925589304c3fba0a6c9034026abe"><td class="cellrowborder" valign="top" width="27.82%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_afae6e5f848b249aeb90bde8b4e2a5061"><a name="en-us_topic_0152100187_afae6e5f848b249aeb90bde8b4e2a5061"></a><a name="en-us_topic_0152100187_afae6e5f848b249aeb90bde8b4e2a5061"></a>net.ipv4.icmp_ignore_bogus_error_responses</p>
    </td>
    <td class="cellrowborder" valign="top" width="42.28%" headers="mcps1.2.5.1.2 "><p id="p5990141916176"><a name="p5990141916176"></a><a name="p5990141916176"></a>Fake ICMP packets are not recorded to logs, which saves disk space. The item is enabled according to the hardening policy.</p>
    </td>
    <td class="cellrowborder" valign="top" width="16.85%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100187_a64c552cdedca4aa2b7f729d770ba9281"><a name="en-us_topic_0152100187_a64c552cdedca4aa2b7f729d770ba9281"></a><a name="en-us_topic_0152100187_a64c552cdedca4aa2b7f729d770ba9281"></a>1</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.05%" headers="mcps1.2.5.1.4 "><p id="p71305721817"><a name="p71305721817"></a><a name="p71305721817"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_rb8245b54895041a08307c9072bfefb0c"><td class="cellrowborder" valign="top" width="27.82%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_ab7d2302698b846da93ed4585030d2cf7"><a name="en-us_topic_0152100187_ab7d2302698b846da93ed4585030d2cf7"></a><a name="en-us_topic_0152100187_ab7d2302698b846da93ed4585030d2cf7"></a>net.ipv4.tcp_syncookies</p>
    </td>
    <td class="cellrowborder" valign="top" width="42.28%" headers="mcps1.2.5.1.2 "><p id="p1990191910174"><a name="p1990191910174"></a><a name="p1990191910174"></a>SYN attack is a DoS attack that forces system restart by occupying system resources. TCP-SYN cookie protection is enabled according to the hardening policy.</p>
    </td>
    <td class="cellrowborder" valign="top" width="16.85%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100187_a414bcf82b1724530bab2c0e8acb1b439"><a name="en-us_topic_0152100187_a414bcf82b1724530bab2c0e8acb1b439"></a><a name="en-us_topic_0152100187_a414bcf82b1724530bab2c0e8acb1b439"></a>1</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.05%" headers="mcps1.2.5.1.4 "><p id="p1613011751815"><a name="p1613011751815"></a><a name="p1613011751815"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_rd7e80dd5b7584a32baf6d4650df20744"><td class="cellrowborder" valign="top" width="27.82%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_a15325a8a5b7a4ad8acc9013b5da3e484"><a name="en-us_topic_0152100187_a15325a8a5b7a4ad8acc9013b5da3e484"></a><a name="en-us_topic_0152100187_a15325a8a5b7a4ad8acc9013b5da3e484"></a>kernel.dmesg_restrict</p>
    </td>
    <td class="cellrowborder" valign="top" width="42.28%" headers="mcps1.2.5.1.2 "><p id="p799021917172"><a name="p799021917172"></a><a name="p799021917172"></a>Hardens dmesg messages. Only the administrator is allowed to view the messages.</p>
    </td>
    <td class="cellrowborder" valign="top" width="16.85%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100187_acfdaa81f3c17425090c94c0772d36788"><a name="en-us_topic_0152100187_acfdaa81f3c17425090c94c0772d36788"></a><a name="en-us_topic_0152100187_acfdaa81f3c17425090c94c0772d36788"></a>1</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.05%" headers="mcps1.2.5.1.4 "><p id="p1913097111819"><a name="p1913097111819"></a><a name="p1913097111819"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_row6299142013120"><td class="cellrowborder" valign="top" width="27.82%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_p898212316312"><a name="en-us_topic_0152100187_p898212316312"></a><a name="en-us_topic_0152100187_p898212316312"></a>kernel.sched_autogroup_enabled</p>
    </td>
    <td class="cellrowborder" valign="top" width="42.28%" headers="mcps1.2.5.1.2 "><p id="p149901195172"><a name="p149901195172"></a><a name="p149901195172"></a>Determines whether the kernel automatically groups and schedules threads. After this item is enabled, scheduling groups compete for time slices, and threads in a scheduling group compete for the time slices allocated to the scheduling group. The item is disabled according to the hardening policy.</p>
    </td>
    <td class="cellrowborder" valign="top" width="16.85%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100187_p179821131173119"><a name="en-us_topic_0152100187_p179821131173119"></a><a name="en-us_topic_0152100187_p179821131173119"></a>0</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.05%" headers="mcps1.2.5.1.4 "><p id="p131304771813"><a name="p131304771813"></a><a name="p131304771813"></a>No</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_re81efcb1fb414c438598d561d2eb9ba5"><td class="cellrowborder" valign="top" width="27.82%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_a3f2f610168e94af0b74603847d748069"><a name="en-us_topic_0152100187_a3f2f610168e94af0b74603847d748069"></a><a name="en-us_topic_0152100187_a3f2f610168e94af0b74603847d748069"></a>kernel.sysrq</p>
    </td>
    <td class="cellrowborder" valign="top" width="42.28%" headers="mcps1.2.5.1.2 "><p id="p1953982581715"><a name="p1953982581715"></a><a name="p1953982581715"></a>Disables the magic key.</p>
    <div class="note" id="note145398257178"><a name="note145398257178"></a><a name="note145398257178"></a><span class="notetitle"> NOTE: </span><div class="notebody"><p id="p653913258176"><a name="p653913258176"></a><a name="p653913258176"></a>You are advised to disable the magic key so that commands cannot be directly passed to the kernel.</p>
    </div></div>
    </td>
    <td class="cellrowborder" valign="top" width="16.85%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100187_af934bb89976b4e11808359c1dc1f7bb8"><a name="en-us_topic_0152100187_af934bb89976b4e11808359c1dc1f7bb8"></a><a name="en-us_topic_0152100187_af934bb89976b4e11808359c1dc1f7bb8"></a>0</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.05%" headers="mcps1.2.5.1.4 "><p id="p213018741817"><a name="p213018741817"></a><a name="p213018741817"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_r7a53e264bac641e89b64819dc75a6c23"><td class="cellrowborder" valign="top" width="27.82%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_af688810f79124dd59d0618268ddaeb82"><a name="en-us_topic_0152100187_af688810f79124dd59d0618268ddaeb82"></a><a name="en-us_topic_0152100187_af688810f79124dd59d0618268ddaeb82"></a>net.ipv4.conf.all.secure_redirects</p>
    </td>
    <td class="cellrowborder" rowspan="2" valign="top" width="42.28%" headers="mcps1.2.5.1.2 "><p id="p824893212174"><a name="p824893212174"></a><a name="p824893212174"></a>Specifies whether redirected ICMP messages sent from any servers or from gateways listed in the default gateway list are accepted. Redirected ICMP messages are received from any servers according to the hardening policy.</p>
    </td>
    <td class="cellrowborder" valign="top" width="16.85%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100187_a92529d808a454a978a7824c4e028a982"><a name="en-us_topic_0152100187_a92529d808a454a978a7824c4e028a982"></a><a name="en-us_topic_0152100187_a92529d808a454a978a7824c4e028a982"></a>0</p>
    </td>
    <td class="cellrowborder" valign="top" width="13.05%" headers="mcps1.2.5.1.4 "><p id="p1713019771813"><a name="p1713019771813"></a><a name="p1713019771813"></a>Yes</p>
    </td>
    </tr>
    <tr id="en-us_topic_0152100187_ra04d3e2c516d4e6289f9244e2b92ccc7"><td class="cellrowborder" valign="top" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100187_af3b14a2dba4a4c0a8e82e8b603a3aee3"><a name="en-us_topic_0152100187_af3b14a2dba4a4c0a8e82e8b603a3aee3"></a><a name="en-us_topic_0152100187_af3b14a2dba4a4c0a8e82e8b603a3aee3"></a>net.ipv4.conf.default.secure_redirects</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0152100187_aee784145b2d54922a8427cf1eb835db9"><a name="en-us_topic_0152100187_aee784145b2d54922a8427cf1eb835db9"></a><a name="en-us_topic_0152100187_aee784145b2d54922a8427cf1eb835db9"></a>0</p>
    </td>
    <td class="cellrowborder" valign="top" headers="mcps1.2.5.1.3 "><p id="p201306711817"><a name="p201306711817"></a><a name="p201306711817"></a>Yes</p>
    </td>
    </tr>
    </tbody>
    </table>

2.  Run the following command to load the kernel parameters set in the  **sysctl.conf**  file:

    ```
    sysctl -p  /etc/sysctl.conf
    ```


### Other Security Suggestions

-   **net.ipv4.icmp\_echo\_ignore\_all**: ignores ICMP requests.

    For security purposes, you are advised to enable this item. The default value is  **0**. Set the value to  **1**  to enable this item.

    After this item is enabled, all incoming ICMP Echo request packets will be ignored, which will cause failure to ping the target host. Determine whether to enable this item based on your actual networking condition.

-   **net.ipv4.conf.all.log\_martians/net.ipv4.conf.default.log\_martians**: logs spoofed, source routed, and redirect packets.

    For security purposes, you are advised to enable this item. The default value is  **0**. Set the value to  **1**  to enable this item.

    After this item is enabled, data from forbidden IP addresses will be logged. Too many new logs will overwrite old logs because the total number of logs allowed is fixed. Determine whether to enable this item based on your actual usage scenario.

-   **net.ipv4.tcp\_timestamps**: disables tcp\_timestamps.

    For security purposes, you are advised to disable tcp\_timestamps. The default value is  **1**. Set the value to  **0**  to disable tcp\_timestamps.

    After this item is disabled, TCP retransmission timeout will be affected. Determine whether to disable this item based on the actual usage scenario.

-   **net.ipv4.tcp\_max\_syn\_backlog**: determines the number of queues that is in SYN\_RECV state.

    This parameter determines the number of queues that is in SYN\_RECV state. When this number is exceeded, new TCP connection requests will not be accepted. This to some extent prevents system resource exhaustion. Configure this parameter based on your actual usage scenario.
