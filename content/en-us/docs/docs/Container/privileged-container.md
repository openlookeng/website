# Privileged Container

- [Privileged Container](#privileged-container.)
    - [Scenarios](#scenarios)
    - [Usage Restrictions](#usage-restrictions-1)
    - [Usage Guide](#usage-guide)


## Scenarios

By default, iSulad starts common containers that are suitable for starting common processes. However, common containers have only the default permissions defined by capabilities in the  **/etc/default/isulad/config.json**  directory. To perform privileged operations \(such as use devices in the  **/sys**  directory\), a privileged container is required. By using this feature, user  **root**  in the container has  **root**  permissions of the host. Otherwise, user  **root**  in the container has only common user permissions of the host.

## Usage Restrictions

Privileged containers provide all functions for containers and remove all restrictions enforced by the device cgroup controller. A privileged container has the following features:

-   Secomp does not block any system call.
-   The  **/sys**  and  **/proc**  directories are writable.
-   All devices on the host can be accessed in the container.

-   All system capabilities will be enabled.

Default capabilities of a common container are as follows:


<table><thead align="left"><tr id="en-us_topic_0183303459_row19276183217111"><th class="cellrowborder" valign="top" width="39.53%" id="mcps1.1.3.1.1"><p id="en-us_topic_0183303459_p1438363819110"><a name="en-us_topic_0183303459_p1438363819110"></a><a name="en-us_topic_0183303459_p1438363819110"></a><strong id="en-us_topic_0183303459_b474911342710"><a name="en-us_topic_0183303459_b474911342710"></a><a name="en-us_topic_0183303459_b474911342710"></a>Capability Key</strong></p>
</th>
<th class="cellrowborder" valign="top" width="60.47%" id="mcps1.1.3.1.2"><p id="en-us_topic_0183303459_p538314381119"><a name="en-us_topic_0183303459_p538314381119"></a><a name="en-us_topic_0183303459_p538314381119"></a><strong id="en-us_topic_0183303459_b12829161617274"><a name="en-us_topic_0183303459_b12829161617274"></a><a name="en-us_topic_0183303459_b12829161617274"></a>Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0183303459_row92761932719"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p13678623182711"><a name="en-us_topic_0183303459_p13678623182711"></a><a name="en-us_topic_0183303459_p13678623182711"></a>SETPCAP</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p18678132315273"><a name="en-us_topic_0183303459_p18678132315273"></a><a name="en-us_topic_0183303459_p18678132315273"></a>Modifies the process capabilities.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row827615321111"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p1167817232278"><a name="en-us_topic_0183303459_p1167817232278"></a><a name="en-us_topic_0183303459_p1167817232278"></a>MKNOD</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p184961533175215"><a name="en-us_topic_0183303459_p184961533175215"></a><a name="en-us_topic_0183303459_p184961533175215"></a>Allows using the system call mknod() to create special files.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row52761232617"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p967852311271"><a name="en-us_topic_0183303459_p967852311271"></a><a name="en-us_topic_0183303459_p967852311271"></a>AUDIT_WRITE</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p1158419132533"><a name="en-us_topic_0183303459_p1158419132533"></a><a name="en-us_topic_0183303459_p1158419132533"></a>Writes records to kernel auditing logs.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row5513113422710"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p144621810132813"><a name="en-us_topic_0183303459_p144621810132813"></a><a name="en-us_topic_0183303459_p144621810132813"></a>CHOWN</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p116801832115317"><a name="en-us_topic_0183303459_p116801832115317"></a><a name="en-us_topic_0183303459_p116801832115317"></a>Modifies UIDs and GIDs of files. For details, see the chown(2).</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row11653848132712"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p84621410192817"><a name="en-us_topic_0183303459_p84621410192817"></a><a name="en-us_topic_0183303459_p84621410192817"></a>NET_RAW</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p20739125595315"><a name="en-us_topic_0183303459_p20739125595315"></a><a name="en-us_topic_0183303459_p20739125595315"></a>Uses RAW and PACKET sockets and binds any IP address to the transparent proxy.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row11125125382710"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p746261018283"><a name="en-us_topic_0183303459_p746261018283"></a><a name="en-us_topic_0183303459_p746261018283"></a>DAC_OVERRIDE</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p81510212545"><a name="en-us_topic_0183303459_p81510212545"></a><a name="en-us_topic_0183303459_p81510212545"></a>Ignores the discretionary access control (DAC) restrictions on files.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row06927150286"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p79423712812"><a name="en-us_topic_0183303459_p79423712812"></a><a name="en-us_topic_0183303459_p79423712812"></a>FOWNER</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p5869331548"><a name="en-us_topic_0183303459_p5869331548"></a><a name="en-us_topic_0183303459_p5869331548"></a>Ignores the restriction that the file owner ID must be the same as the process user ID.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row136814192287"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p69411373282"><a name="en-us_topic_0183303459_p69411373282"></a><a name="en-us_topic_0183303459_p69411373282"></a>FSETID</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p1087913531547"><a name="en-us_topic_0183303459_p1087913531547"></a><a name="en-us_topic_0183303459_p1087913531547"></a>Allows setting setuid bits of files.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row133892282819"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p394163762817"><a name="en-us_topic_0183303459_p394163762817"></a><a name="en-us_topic_0183303459_p394163762817"></a>KILL</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p1862718265517"><a name="en-us_topic_0183303459_p1862718265517"></a><a name="en-us_topic_0183303459_p1862718265517"></a>Allows sending signals to processes that do not belong to itself.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row1188232552818"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p1941037122812"><a name="en-us_topic_0183303459_p1941037122812"></a><a name="en-us_topic_0183303459_p1941037122812"></a>SETGID</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p1944411105512"><a name="en-us_topic_0183303459_p1944411105512"></a><a name="en-us_topic_0183303459_p1944411105512"></a>Allows the change of the process group ID.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row8890154052814"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p1555455762815"><a name="en-us_topic_0183303459_p1555455762815"></a><a name="en-us_topic_0183303459_p1555455762815"></a>SETUID</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p65715191553"><a name="en-us_topic_0183303459_p65715191553"></a><a name="en-us_topic_0183303459_p65715191553"></a>Allows the change of the process user ID.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row4208544172819"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p955415762814"><a name="en-us_topic_0183303459_p955415762814"></a><a name="en-us_topic_0183303459_p955415762814"></a>NET_BIND_SERVICE</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p870833305518"><a name="en-us_topic_0183303459_p870833305518"></a><a name="en-us_topic_0183303459_p870833305518"></a>Allows bounding to a port whose number is smaller than 1024.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row14934146182817"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p1655415710284"><a name="en-us_topic_0183303459_p1655415710284"></a><a name="en-us_topic_0183303459_p1655415710284"></a>SYS_CHROOT</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p1119118528556"><a name="en-us_topic_0183303459_p1119118528556"></a><a name="en-us_topic_0183303459_p1119118528556"></a>Allows using the system call chroot().</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row5352155019284"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p14554105782814"><a name="en-us_topic_0183303459_p14554105782814"></a><a name="en-us_topic_0183303459_p14554105782814"></a>SETFCAP</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p686316153564"><a name="en-us_topic_0183303459_p686316153564"></a><a name="en-us_topic_0183303459_p686316153564"></a>Allows transferring and deleting capabilities to other processes.</p>
</td>
</tr>
</tbody>
</table>

When a privileged container is enabled, the following capabilities are added:


<table><thead align="left"><tr id="en-us_topic_0183303459_row153251934172911"><th class="cellrowborder" valign="top" width="39.53%" id="mcps1.1.3.1.1"><p id="en-us_topic_0183303459_p1832518344292"><a name="en-us_topic_0183303459_p1832518344292"></a><a name="en-us_topic_0183303459_p1832518344292"></a><strong id="en-us_topic_0183303459_b432563462914"><a name="en-us_topic_0183303459_b432563462914"></a><a name="en-us_topic_0183303459_b432563462914"></a>Capability Key</strong></p>
</th>
<th class="cellrowborder" valign="top" width="60.47%" id="mcps1.1.3.1.2"><p id="en-us_topic_0183303459_p332511340298"><a name="en-us_topic_0183303459_p332511340298"></a><a name="en-us_topic_0183303459_p332511340298"></a><strong id="en-us_topic_0183303459_b162598249178"><a name="en-us_topic_0183303459_b162598249178"></a><a name="en-us_topic_0183303459_b162598249178"></a>Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0183303459_row33258341291"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p1134105172911"><a name="en-us_topic_0183303459_p1134105172911"></a><a name="en-us_topic_0183303459_p1134105172911"></a>SYS_MODULE</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p116381837155618"><a name="en-us_topic_0183303459_p116381837155618"></a><a name="en-us_topic_0183303459_p116381837155618"></a>Loads and unloads kernel modules.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row83251334132911"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p21341651162916"><a name="en-us_topic_0183303459_p21341651162916"></a><a name="en-us_topic_0183303459_p21341651162916"></a>SYS_RAWIO</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p169275195714"><a name="en-us_topic_0183303459_p169275195714"></a><a name="en-us_topic_0183303459_p169275195714"></a>Allows direct access to <strong id="en-us_topic_0183303459_b1419830745"><a name="en-us_topic_0183303459_b1419830745"></a><a name="en-us_topic_0183303459_b1419830745"></a>/devport</strong>, <strong id="en-us_topic_0183303459_b12289358411"><a name="en-us_topic_0183303459_b12289358411"></a><a name="en-us_topic_0183303459_b12289358411"></a>/dev/mem</strong>, <strong id="en-us_topic_0183303459_b208859391643"><a name="en-us_topic_0183303459_b208859391643"></a><a name="en-us_topic_0183303459_b208859391643"></a>/dev/kmem</strong>, and original block devices.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row8326113492919"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p11134205142918"><a name="en-us_topic_0183303459_p11134205142918"></a><a name="en-us_topic_0183303459_p11134205142918"></a>SYS_PACCT</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p171341351132915"><a name="en-us_topic_0183303459_p171341351132915"></a><a name="en-us_topic_0183303459_p171341351132915"></a>Allows the process BSD audit.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row8326834172918"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p9134651202918"><a name="en-us_topic_0183303459_p9134651202918"></a><a name="en-us_topic_0183303459_p9134651202918"></a>SYS_ADMIN</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p3716829135718"><a name="en-us_topic_0183303459_p3716829135718"></a><a name="en-us_topic_0183303459_p3716829135718"></a>Allows executing system management tasks, such as loading or unloading file systems and setting disk quotas.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row193261034152918"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p513420513291"><a name="en-us_topic_0183303459_p513420513291"></a><a name="en-us_topic_0183303459_p513420513291"></a>SYS_NICE</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p957115373578"><a name="en-us_topic_0183303459_p957115373578"></a><a name="en-us_topic_0183303459_p957115373578"></a>Allows increasing the priority and setting the priorities of other processes.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row12326834172913"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p1113513516295"><a name="en-us_topic_0183303459_p1113513516295"></a><a name="en-us_topic_0183303459_p1113513516295"></a>SYS_RESOURCE</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p156005528571"><a name="en-us_topic_0183303459_p156005528571"></a><a name="en-us_topic_0183303459_p156005528571"></a>Ignores resource restrictions.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row03261634122918"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p141351451152914"><a name="en-us_topic_0183303459_p141351451152914"></a><a name="en-us_topic_0183303459_p141351451152914"></a>SYS_TIME</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p20549045145715"><a name="en-us_topic_0183303459_p20549045145715"></a><a name="en-us_topic_0183303459_p20549045145715"></a>Allows changing the system clock.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row1932618345290"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p2135105162917"><a name="en-us_topic_0183303459_p2135105162917"></a><a name="en-us_topic_0183303459_p2135105162917"></a>SYS_TTY_CONFIG</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p1198325955710"><a name="en-us_topic_0183303459_p1198325955710"></a><a name="en-us_topic_0183303459_p1198325955710"></a>Allows configuring TTY devices.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row73261634122914"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p201359514296"><a name="en-us_topic_0183303459_p201359514296"></a><a name="en-us_topic_0183303459_p201359514296"></a>AUDIT_CONTROL</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p1943271315811"><a name="en-us_topic_0183303459_p1943271315811"></a><a name="en-us_topic_0183303459_p1943271315811"></a>Enables and disables kernel auditing, modifies audit filter rules, and extracts audit status and filtering rules.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row1832653418292"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p10135155116293"><a name="en-us_topic_0183303459_p10135155116293"></a><a name="en-us_topic_0183303459_p10135155116293"></a>MAC_ADMIN</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p3656833165814"><a name="en-us_topic_0183303459_p3656833165814"></a><a name="en-us_topic_0183303459_p3656833165814"></a>Overrides the mandatory access control (MAC), which is implemented for the Smack Linux Security Module (LSM).</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row19326173418297"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p78862241916"><a name="en-us_topic_0183303459_p78862241916"></a><a name="en-us_topic_0183303459_p78862241916"></a>MAC_OVERRIDE</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p83862555584"><a name="en-us_topic_0183303459_p83862555584"></a><a name="en-us_topic_0183303459_p83862555584"></a>Allows MAC configuration or status change, which is implemented for Smack LSM.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row1832616345293"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p8886122161913"><a name="en-us_topic_0183303459_p8886122161913"></a><a name="en-us_topic_0183303459_p8886122161913"></a>NET_ADMIN</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p08865219194"><a name="en-us_topic_0183303459_p08865219194"></a><a name="en-us_topic_0183303459_p08865219194"></a>Allows executing network management tasks.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row11326103419299"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p10886521195"><a name="en-us_topic_0183303459_p10886521195"></a><a name="en-us_topic_0183303459_p10886521195"></a>SYSLOG</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p184951138165916"><a name="en-us_topic_0183303459_p184951138165916"></a><a name="en-us_topic_0183303459_p184951138165916"></a>Performs the privileged syslog(2) operation.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row8326113414290"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p148861129192"><a name="en-us_topic_0183303459_p148861129192"></a><a name="en-us_topic_0183303459_p148861129192"></a>DAC_READ_SEARCH</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p1055910511591"><a name="en-us_topic_0183303459_p1055910511591"></a><a name="en-us_topic_0183303459_p1055910511591"></a>Ignores the DAC access restrictions on file reading and catalog search.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row43541521103017"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p12886112201910"><a name="en-us_topic_0183303459_p12886112201910"></a><a name="en-us_topic_0183303459_p12886112201910"></a>LINUX_IMMUTABLE</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p112002001707"><a name="en-us_topic_0183303459_p112002001707"></a><a name="en-us_topic_0183303459_p112002001707"></a>Allows modifying the IMMUTABLE and APPEND attributes of a file.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row9842724133012"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p1188642191912"><a name="en-us_topic_0183303459_p1188642191912"></a><a name="en-us_topic_0183303459_p1188642191912"></a>NET_BROADCAST</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p1273917718018"><a name="en-us_topic_0183303459_p1273917718018"></a><a name="en-us_topic_0183303459_p1273917718018"></a>Allows network broadcast and multicast access.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row1847052711309"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p38861123194"><a name="en-us_topic_0183303459_p38861123194"></a><a name="en-us_topic_0183303459_p38861123194"></a>IPC_LOCK</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p5198161418018"><a name="en-us_topic_0183303459_p5198161418018"></a><a name="en-us_topic_0183303459_p5198161418018"></a>Allows locking shared memory segments.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row1131730133016"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p118864210198"><a name="en-us_topic_0183303459_p118864210198"></a><a name="en-us_topic_0183303459_p118864210198"></a>IPC_OWNER</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p1997716184015"><a name="en-us_topic_0183303459_p1997716184015"></a><a name="en-us_topic_0183303459_p1997716184015"></a>Ignores the IPC ownership check.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row068317409305"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p1486761133112"><a name="en-us_topic_0183303459_p1486761133112"></a><a name="en-us_topic_0183303459_p1486761133112"></a>SYS_PTRACE</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p241212612013"><a name="en-us_topic_0183303459_p241212612013"></a><a name="en-us_topic_0183303459_p241212612013"></a>Allows tracing any process.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row1710413431301"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p38676103115"><a name="en-us_topic_0183303459_p38676103115"></a><a name="en-us_topic_0183303459_p38676103115"></a>SYS_BOOT</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p1907133704"><a name="en-us_topic_0183303459_p1907133704"></a><a name="en-us_topic_0183303459_p1907133704"></a>Allows restarting the OS.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row791294510306"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p1786713120319"><a name="en-us_topic_0183303459_p1786713120319"></a><a name="en-us_topic_0183303459_p1786713120319"></a>LEASE</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p1763934113011"><a name="en-us_topic_0183303459_p1763934113011"></a><a name="en-us_topic_0183303459_p1763934113011"></a>Allows modifying the FL_LEASE flag of a file lock.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row248014843013"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p8867111103117"><a name="en-us_topic_0183303459_p8867111103117"></a><a name="en-us_topic_0183303459_p8867111103117"></a>WAKE_ALARM</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p12472128413"><a name="en-us_topic_0183303459_p12472128413"></a><a name="en-us_topic_0183303459_p12472128413"></a>Triggers the function of waking up the system, for example, sets the CLOCK_REALTIME_ALARM and CLOCK_BOOTTIME_ALARM timers.</p>
</td>
</tr>
<tr id="en-us_topic_0183303459_row1044985503013"><td class="cellrowborder" valign="top" width="39.53%" headers="mcps1.1.3.1.1 "><p id="en-us_topic_0183303459_p20867101113114"><a name="en-us_topic_0183303459_p20867101113114"></a><a name="en-us_topic_0183303459_p20867101113114"></a>BLOCK_SUSPEND</p>
</td>
<td class="cellrowborder" valign="top" width="60.47%" headers="mcps1.1.3.1.2 "><p id="en-us_topic_0183303459_p1043455715111"><a name="en-us_topic_0183303459_p1043455715111"></a><a name="en-us_topic_0183303459_p1043455715111"></a>Allows blocking system suspension.</p>
</td>
</tr>
</tbody>
</table>

## Usage Guide

iSulad runs the  **--privileged**  command to enable the privilege mode for containers. Do not add privileges to containers unless necessary. Comply with the principle of least privilege to reduce security risks.

```
isula run --rm -it --privileged busybox
```

