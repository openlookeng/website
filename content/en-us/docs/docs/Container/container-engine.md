# Container Engine

- [Container Engine](#container-engine)


Docker daemon is a system process that resides in the background. Before you run a docker subcommand, start Docker daemon.

  

If the Docker daemon is installed using the RPM package or system package management tool, you can run the  **systemctl start docker**  command to start the Docker daemon.

The  **docker**  command supports the following parameters:

1.  To combine parameters of a single character, run the following command:

    ```
    docker run -t -i busybox /bin/sh
    ```

    The command can be written as follows:

    ```
    docker run -ti busybox /bin/sh
    ```

2.  **bool**  command parameters such as  **--icc=true**, are displayed in the command help. If this parameter is not used, the default value displayed in the command help is used. If this parameter is used, the opposite value of the value displayed in the command help is used. In addition, if  **--icc**  is not added when Docker daemon is started,  **--icc=true**  is used by default. Otherwise,  **--icc=false**  is used.
3.  Parameters such as  **--attach=\[\]**  in the command help indicate that these parameters can be set for multiple times. For example:

    ```
    docker run --attach=stdin --attach=stdout -i -t busybox /bin/sh
    ```

4.  Parameters such as  **-a**  and  **--attach=\[\]**  in the command help indicate that the parameter can be specified using either  **-a** _value_  or  **--attach=**_value_. For example:

    ```
    docker run -a stdin --attach=stdout -i -t busybox /bin/sh
    ```

5.  Parameters such as  **--name=""**  can be configured with a character string and can be configured only once. Parameters such as  **-c=**  can be configured with an integer and can be configured only once.

**Table  1**  Parameters specified during the Docker daemon startup

<a name="en-us_topic_0183265947_table1863643514129"></a>
<table><thead align="left"><tr id="en-us_topic_0183265947_row124414579341"><th class="cellrowborder" valign="top" width="41.08%" id="mcps1.2.3.1.1"><p id="en-us_topic_0183265947_p11442165733413"><a name="en-us_topic_0183265947_p11442165733413"></a><a name="en-us_topic_0183265947_p11442165733413"></a><strong id="en-us_topic_0183265947_b151371713357"><a name="en-us_topic_0183265947_b151371713357"></a><a name="en-us_topic_0183265947_b151371713357"></a>Parameter</strong></p>
</th>
<th class="cellrowborder" valign="top" width="58.919999999999995%" id="mcps1.2.3.1.2"><p id="en-us_topic_0183265947_p13443185715341"><a name="en-us_topic_0183265947_p13443185715341"></a><a name="en-us_topic_0183265947_p13443185715341"></a><strong id="en-us_topic_0183265947_b1051681753514"><a name="en-us_topic_0183265947_b1051681753514"></a><a name="en-us_topic_0183265947_b1051681753514"></a>Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0183265947_row9949123519122"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p169501935161210"><a name="en-us_topic_0183265947_p169501935161210"></a><a name="en-us_topic_0183265947_p169501935161210"></a>--api-cors-header</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p19950535111212"><a name="en-us_topic_0183265947_p19950535111212"></a><a name="en-us_topic_0183265947_p19950535111212"></a><a href="https://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing" target="_blank" rel="noopener noreferrer">CORS header information</a> for enabling remote API calling. This interface supports the secondary development of upper-layer applications, which sets the CORS header for a remote API.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row19501635111219"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p795053515122"><a name="en-us_topic_0183265947_p795053515122"></a><a name="en-us_topic_0183265947_p795053515122"></a>--authorization-plugin=[]</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p12950035141214"><a name="en-us_topic_0183265947_p12950035141214"></a><a name="en-us_topic_0183265947_p12950035141214"></a>Authentication plug-in.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row159504359128"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p9950113512129"><a name="en-us_topic_0183265947_p9950113512129"></a><a name="en-us_topic_0183265947_p9950113512129"></a>-b,  --bridge=""</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p1495013521213"><a name="en-us_topic_0183265947_p1495013521213"></a><a name="en-us_topic_0183265947_p1495013521213"></a>Existing bridge device mounting to the docker container. Note: <strong id="en-us_topic_0183265947_b20752619111412"><a name="en-us_topic_0183265947_b20752619111412"></a><a name="en-us_topic_0183265947_b20752619111412"></a>none</strong> can be used to disable the network in the container.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row1895033520122"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p395043511215"><a name="en-us_topic_0183265947_p395043511215"></a><a name="en-us_topic_0183265947_p395043511215"></a>--bip=""</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p4951113551219"><a name="en-us_topic_0183265947_p4951113551219"></a><a name="en-us_topic_0183265947_p4951113551219"></a>Bridge IP address, which is automatically created using the CIDR address. Note: this parameter cannot be used with <strong id="en-us_topic_0183265947_b11266144119168"><a name="en-us_topic_0183265947_b11266144119168"></a><a name="en-us_topic_0183265947_b11266144119168"></a>-b</strong> .</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row4951173561216"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p18951183520125"><a name="en-us_topic_0183265947_p18951183520125"></a><a name="en-us_topic_0183265947_p18951183520125"></a>--cgroup-parent</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p159511535121212"><a name="en-us_topic_0183265947_p159511535121212"></a><a name="en-us_topic_0183265947_p159511535121212"></a>cgroup parent directory configured for all containers.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row79513355126"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p99521235101219"><a name="en-us_topic_0183265947_p99521235101219"></a><a name="en-us_topic_0183265947_p99521235101219"></a>--config-file=/etc/docker/daemon.json</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p9952143531216"><a name="en-us_topic_0183265947_p9952143531216"></a><a name="en-us_topic_0183265947_p9952143531216"></a>Configuration file for starting Docker daemon.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row16952235151219"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p995243516124"><a name="en-us_topic_0183265947_p995243516124"></a><a name="en-us_topic_0183265947_p995243516124"></a>--containerd</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p49521935191219"><a name="en-us_topic_0183265947_p49521935191219"></a><a name="en-us_topic_0183265947_p49521935191219"></a>Socket path of containerd.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row18952133515129"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p895214355129"><a name="en-us_topic_0183265947_p895214355129"></a><a name="en-us_topic_0183265947_p895214355129"></a>-D,  --debug=false</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p7953935111210"><a name="en-us_topic_0183265947_p7953935111210"></a><a name="en-us_topic_0183265947_p7953935111210"></a>Specifies whether to enable the debugging mode.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row1495343551214"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p1195313513122"><a name="en-us_topic_0183265947_p1195313513122"></a><a name="en-us_topic_0183265947_p1195313513122"></a>--default-gateway</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p14953163561219"><a name="en-us_topic_0183265947_p14953163561219"></a><a name="en-us_topic_0183265947_p14953163561219"></a>Default gateway of the container IPv4 address.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row59531935111219"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p189531735151218"><a name="en-us_topic_0183265947_p189531735151218"></a><a name="en-us_topic_0183265947_p189531735151218"></a>--default-gateway-v6</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p1595316355122"><a name="en-us_topic_0183265947_p1595316355122"></a><a name="en-us_topic_0183265947_p1595316355122"></a>Default gateway of the container IPv6 address.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row1895363510124"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p13953143517127"><a name="en-us_topic_0183265947_p13953143517127"></a><a name="en-us_topic_0183265947_p13953143517127"></a>--default-ulimit=[]</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p1595316356127"><a name="en-us_topic_0183265947_p1595316356127"></a><a name="en-us_topic_0183265947_p1595316356127"></a>Default ulimit value of the container.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row39539358124"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p18953193512124"><a name="en-us_topic_0183265947_p18953193512124"></a><a name="en-us_topic_0183265947_p18953193512124"></a>--disable-legacy-registry</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p895414354120"><a name="en-us_topic_0183265947_p895414354120"></a><a name="en-us_topic_0183265947_p895414354120"></a>Disables the original registry.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row209546350125"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p12954735101214"><a name="en-us_topic_0183265947_p12954735101214"></a><a name="en-us_topic_0183265947_p12954735101214"></a>--dns=[]</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p199541635171220"><a name="en-us_topic_0183265947_p199541635171220"></a><a name="en-us_topic_0183265947_p199541635171220"></a>DNS server of the forcibly used container.</p>
<p id="en-us_topic_0183265947_p10954135131216"><a name="en-us_topic_0183265947_p10954135131216"></a><a name="en-us_topic_0183265947_p10954135131216"></a>Example: <strong id="en-us_topic_0183265947_b650710251423"><a name="en-us_topic_0183265947_b650710251423"></a><a name="en-us_topic_0183265947_b650710251423"></a>--dns 8.8.</strong><em id="en-us_topic_0183265947_i653110251821"><a name="en-us_topic_0183265947_i653110251821"></a><a name="en-us_topic_0183265947_i653110251821"></a>x</em><strong id="en-us_topic_0183265947_b165364281526"><a name="en-us_topic_0183265947_b165364281526"></a><a name="en-us_topic_0183265947_b165364281526"></a>.</strong><em id="en-us_topic_0183265947_i196616302024"><a name="en-us_topic_0183265947_i196616302024"></a><a name="en-us_topic_0183265947_i196616302024"></a>x</em></p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row79544358126"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p11954535131217"><a name="en-us_topic_0183265947_p11954535131217"></a><a name="en-us_topic_0183265947_p11954535131217"></a>--dns-opt=[]</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p1495412354126"><a name="en-us_topic_0183265947_p1495412354126"></a><a name="en-us_topic_0183265947_p1495412354126"></a>DNS option.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row7954935151219"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p6954535121213"><a name="en-us_topic_0183265947_p6954535121213"></a><a name="en-us_topic_0183265947_p6954535121213"></a>--dns-search=[]</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p1295493518126"><a name="en-us_topic_0183265947_p1295493518126"></a><a name="en-us_topic_0183265947_p1295493518126"></a>Forcibly searches DNS search domain name used by a container.</p>
<p id="en-us_topic_0183265947_p119541435131217"><a name="en-us_topic_0183265947_p119541435131217"></a><a name="en-us_topic_0183265947_p119541435131217"></a>Example: <strong id="en-us_topic_0183265947_b1269512716213"><a name="en-us_topic_0183265947_b1269512716213"></a><a name="en-us_topic_0183265947_b1269512716213"></a>--dns-search example.com</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row19954135161211"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p12955203591211"><a name="en-us_topic_0183265947_p12955203591211"></a><a name="en-us_topic_0183265947_p12955203591211"></a>--exec-opt=[]</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p109553351127"><a name="en-us_topic_0183265947_p109553351127"></a><a name="en-us_topic_0183265947_p109553351127"></a>Parameter to be executed when a container is started.</p>
<p id="en-us_topic_0183265947_p195563591213"><a name="en-us_topic_0183265947_p195563591213"></a><a name="en-us_topic_0183265947_p195563591213"></a>For example, set the <strong id="en-us_topic_0183265947_b1257053911511"><a name="en-us_topic_0183265947_b1257053911511"></a><a name="en-us_topic_0183265947_b1257053911511"></a>native.umask</strong> parameter.</p>
<pre class="screen" id="en-us_topic_0183265947_screen095543517128"><a name="en-us_topic_0183265947_screen095543517128"></a><a name="en-us_topic_0183265947_screen095543517128"></a>#The <strong id="en-us_topic_0183265947_b12897144013322"><a name="en-us_topic_0183265947_b12897144013322"></a><a name="en-us_topic_0183265947_b12897144013322"></a>umask</strong> value of the started container is <strong id="en-us_topic_0183265947_b2590101214420"><a name="en-us_topic_0183265947_b2590101214420"></a><a name="en-us_topic_0183265947_b2590101214420"></a>0022</strong>.
--exec-opt native.umask=normal 

#The <strong id="en-us_topic_0183265947_b1871345123212"><a name="en-us_topic_0183265947_b1871345123212"></a><a name="en-us_topic_0183265947_b1871345123212"></a>umask</strong> value of the started container is <strong id="en-us_topic_0183265947_b170215241419"><a name="en-us_topic_0183265947_b170215241419"></a><a name="en-us_topic_0183265947_b170215241419"></a>0027</strong> (default value).
--exec-opt  native.umask=secure    </pre>
<p id="en-us_topic_0183265947_p79551235141220"><a name="en-us_topic_0183265947_p79551235141220"></a><a name="en-us_topic_0183265947_p79551235141220"></a>Note: If <strong id="en-us_topic_0183265947_b82325351053"><a name="en-us_topic_0183265947_b82325351053"></a><a name="en-us_topic_0183265947_b82325351053"></a>native.umask</strong> is also configured in <strong id="en-us_topic_0183265947_b1061620469510"><a name="en-us_topic_0183265947_b1061620469510"></a><a name="en-us_topic_0183265947_b1061620469510"></a>docker create</strong> or <strong id="en-us_topic_0183265947_b9501749652"><a name="en-us_topic_0183265947_b9501749652"></a><a name="en-us_topic_0183265947_b9501749652"></a>docker run</strong> command, the configuration in command is used.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row19955635141215"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p6955535151215"><a name="en-us_topic_0183265947_p6955535151215"></a><a name="en-us_topic_0183265947_p6955535151215"></a>--exec-root=/var/run/docker</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p1195512358122"><a name="en-us_topic_0183265947_p1195512358122"></a><a name="en-us_topic_0183265947_p1195512358122"></a>Root directory for storing the execution status file.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row13955203510128"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p5955133521217"><a name="en-us_topic_0183265947_p5955133521217"></a><a name="en-us_topic_0183265947_p5955133521217"></a>--fixed-cidr=""</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p09551356124"><a name="en-us_topic_0183265947_p09551356124"></a><a name="en-us_topic_0183265947_p09551356124"></a>Fixed IP address (for example, <strong id="en-us_topic_0183265947_b161653103714"><a name="en-us_topic_0183265947_b161653103714"></a><a name="en-us_topic_0183265947_b161653103714"></a>10.20.0.0/16</strong>) of the subnet. The IP address of the subnet must belong to the network bridge.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row595543551213"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p1195633591220"><a name="en-us_topic_0183265947_p1195633591220"></a><a name="en-us_topic_0183265947_p1195633591220"></a>--fixed-cidr-v6</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p19956535171218"><a name="en-us_topic_0183265947_p19956535171218"></a><a name="en-us_topic_0183265947_p19956535171218"></a>Fixed IPv6 address.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row6956835181219"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p39567359128"><a name="en-us_topic_0183265947_p39567359128"></a><a name="en-us_topic_0183265947_p39567359128"></a>-G,  --group="docker"</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p1095673514126"><a name="en-us_topic_0183265947_p1095673514126"></a><a name="en-us_topic_0183265947_p1095673514126"></a>Group assigned to the corresponding Unix socket in the background running mode. Note: When an empty string is configured for this parameter, the group information is removed.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row1395683541211"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p99560354123"><a name="en-us_topic_0183265947_p99560354123"></a><a name="en-us_topic_0183265947_p99560354123"></a>-g,  --graph="/var/lib/docker"</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p095612351125"><a name="en-us_topic_0183265947_p095612351125"></a><a name="en-us_topic_0183265947_p095612351125"></a>The root directory for running docker.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row3956735101212"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p15957153516121"><a name="en-us_topic_0183265947_p15957153516121"></a><a name="en-us_topic_0183265947_p15957153516121"></a>-H,  --host=[]</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p179575358122"><a name="en-us_topic_0183265947_p179575358122"></a><a name="en-us_topic_0183265947_p179575358122"></a>Socket bound in background mode. One or more sockets can be configured using <strong id="en-us_topic_0183265947_b892105811410"><a name="en-us_topic_0183265947_b892105811410"></a><a name="en-us_topic_0183265947_b892105811410"></a>tcp://</strong><em id="en-us_topic_0183265947_i01711002058"><a name="en-us_topic_0183265947_i01711002058"></a><a name="en-us_topic_0183265947_i01711002058"></a>host</em><strong id="en-us_topic_0183265947_b143519217511"><a name="en-us_topic_0183265947_b143519217511"></a><a name="en-us_topic_0183265947_b143519217511"></a>:</strong><em id="en-us_topic_0183265947_i13715112850"><a name="en-us_topic_0183265947_i13715112850"></a><a name="en-us_topic_0183265947_i13715112850"></a>port</em><strong id="en-us_topic_0183265947_b17899717851"><a name="en-us_topic_0183265947_b17899717851"></a><a name="en-us_topic_0183265947_b17899717851"></a>, unix:///</strong><em id="en-us_topic_0183265947_i199043171255"><a name="en-us_topic_0183265947_i199043171255"></a><a name="en-us_topic_0183265947_i199043171255"></a>path to socket</em><strong id="en-us_topic_0183265947_b10901617159"><a name="en-us_topic_0183265947_b10901617159"></a><a name="en-us_topic_0183265947_b10901617159"></a>, fd://*</strong> or <strong id="en-us_topic_0183265947_b11704191416436"><a name="en-us_topic_0183265947_b11704191416436"></a><a name="en-us_topic_0183265947_b11704191416436"></a>fd://socketfd</strong>. Example: </p>
<p id="en-us_topic_0183265947_p395713352128"><a name="en-us_topic_0183265947_p395713352128"></a><a name="en-us_topic_0183265947_p395713352128"></a><strong id="en-us_topic_0183265947_b224274474313"><a name="en-us_topic_0183265947_b224274474313"></a><a name="en-us_topic_0183265947_b224274474313"></a>$ dockerd -H tcp://0.0.0.0:2375</strong></p>
<p id="en-us_topic_0183265947_p11957153591211"><a name="en-us_topic_0183265947_p11957153591211"></a><a name="en-us_topic_0183265947_p11957153591211"></a>or</p>
<p id="en-us_topic_0183265947_p59571356125"><a name="en-us_topic_0183265947_p59571356125"></a><a name="en-us_topic_0183265947_p59571356125"></a><strong id="en-us_topic_0183265947_b4901457104318"><a name="en-us_topic_0183265947_b4901457104318"></a><a name="en-us_topic_0183265947_b4901457104318"></a>$  export DOCKER_HOST="tcp://0.0.0.0:2375"</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row295710358122"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p89571235131216"><a name="en-us_topic_0183265947_p89571235131216"></a><a name="en-us_topic_0183265947_p89571235131216"></a>--insecure-registry=[]</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p16957133561214"><a name="en-us_topic_0183265947_p16957133561214"></a><a name="en-us_topic_0183265947_p16957133561214"></a>Registry for insecure connections. By default, the Docker uses TLS certificates to ensure security for all connections. If the registry does not support HTTPS connections or the certificate is issued by an unknown certificate authority of the Docker daemon, you need to configure <strong id="en-us_topic_0183265947_b189854101908"><a name="en-us_topic_0183265947_b189854101908"></a><a name="en-us_topic_0183265947_b189854101908"></a>--insecure-registry=192.168.1.110:5000</strong> when starting the daemon. This parameter needs to be configured if a private registry is used.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row12957163519126"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p895715354124"><a name="en-us_topic_0183265947_p895715354124"></a><a name="en-us_topic_0183265947_p895715354124"></a>--image-layer-check=true</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p109571335151210"><a name="en-us_topic_0183265947_p109571335151210"></a><a name="en-us_topic_0183265947_p109571335151210"></a>Image layer integrity check. To enable the function, set this parameter to <strong id="en-us_topic_0183265947_b1919050185619"><a name="en-us_topic_0183265947_b1919050185619"></a><a name="en-us_topic_0183265947_b1919050185619"></a>true</strong>. Otherwise, set this parameter to <strong id="en-us_topic_0183265947_b993210501569"><a name="en-us_topic_0183265947_b993210501569"></a><a name="en-us_topic_0183265947_b993210501569"></a>false</strong>. If this parameter is not configured, the function is disabled by default.</p>
<p id="en-us_topic_0183265947_p19957535141217"><a name="en-us_topic_0183265947_p19957535141217"></a><a name="en-us_topic_0183265947_p19957535141217"></a>When Docker is started, the image layer integrity is checked. If the image layer is damaged, the related images are unavailable. Docker cannot verify empty files, directories, or link files. Therefore, if the preceding files are lost due to a power failure, the integrity check of Docker image data may fail. When the Docker version changes, check whether the parameter is supported. If not supported, delete it from the configuration file.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row395713516126"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p109581635171218"><a name="en-us_topic_0183265947_p109581635171218"></a><a name="en-us_topic_0183265947_p109581635171218"></a>--icc=true</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p1995893518128"><a name="en-us_topic_0183265947_p1995893518128"></a><a name="en-us_topic_0183265947_p1995893518128"></a>Enables communication between containers.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row19582358124"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p16958635131216"><a name="en-us_topic_0183265947_p16958635131216"></a><a name="en-us_topic_0183265947_p16958635131216"></a>--ip="0.0.0.0"</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p4958735121213"><a name="en-us_topic_0183265947_p4958735121213"></a><a name="en-us_topic_0183265947_p4958735121213"></a>Default IP address used when a container is bound to a port.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row1195813517123"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p17958535111213"><a name="en-us_topic_0183265947_p17958535111213"></a><a name="en-us_topic_0183265947_p17958535111213"></a>--ip-forward=true</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p20958835131214"><a name="en-us_topic_0183265947_p20958835131214"></a><a name="en-us_topic_0183265947_p20958835131214"></a>Starts the net.ipv4.ip_forward process of the container.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row1695943591210"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p12959123519128"><a name="en-us_topic_0183265947_p12959123519128"></a><a name="en-us_topic_0183265947_p12959123519128"></a>--ip-masq=true</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p1395912358122"><a name="en-us_topic_0183265947_p1395912358122"></a><a name="en-us_topic_0183265947_p1395912358122"></a>Enables IP spoofing.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row139591335131213"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p13959193511129"><a name="en-us_topic_0183265947_p13959193511129"></a><a name="en-us_topic_0183265947_p13959193511129"></a>--iptables=true</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p49592354129"><a name="en-us_topic_0183265947_p49592354129"></a><a name="en-us_topic_0183265947_p49592354129"></a>Starts the iptables rules defined by the Docker container.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row99591335201211"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p19959173519128"><a name="en-us_topic_0183265947_p19959173519128"></a><a name="en-us_topic_0183265947_p19959173519128"></a>-l,  --log-level=info</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p39591535151217"><a name="en-us_topic_0183265947_p39591535151217"></a><a name="en-us_topic_0183265947_p39591535151217"></a>Log level.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row6959435151218"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p10959153513123"><a name="en-us_topic_0183265947_p10959153513123"></a><a name="en-us_topic_0183265947_p10959153513123"></a>--label=[]</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p395993541212"><a name="en-us_topic_0183265947_p395993541212"></a><a name="en-us_topic_0183265947_p395993541212"></a>Daemon label, in <em id="en-us_topic_0183265947_i1693324311811"><a name="en-us_topic_0183265947_i1693324311811"></a><a name="en-us_topic_0183265947_i1693324311811"></a>key</em>=<em id="en-us_topic_0183265947_i15156175117817"><a name="en-us_topic_0183265947_i15156175117817"></a><a name="en-us_topic_0183265947_i15156175117817"></a>value</em> format.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row795923510120"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p6959113519129"><a name="en-us_topic_0183265947_p6959113519129"></a><a name="en-us_topic_0183265947_p6959113519129"></a>--log-driver=json-file</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p1396010353127"><a name="en-us_topic_0183265947_p1396010353127"></a><a name="en-us_topic_0183265947_p1396010353127"></a>Default log driver of container logs.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row7960113512124"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p169601435141212"><a name="en-us_topic_0183265947_p169601435141212"></a><a name="en-us_topic_0183265947_p169601435141212"></a>--log-opt=map[]</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p20960735201210"><a name="en-us_topic_0183265947_p20960735201210"></a><a name="en-us_topic_0183265947_p20960735201210"></a>Log drive parameters.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row1796012356127"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p5960193531212"><a name="en-us_topic_0183265947_p5960193531212"></a><a name="en-us_topic_0183265947_p5960193531212"></a>--mtu=0</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p8960103514124"><a name="en-us_topic_0183265947_p8960103514124"></a><a name="en-us_topic_0183265947_p8960103514124"></a>MTU value of the container network. If this parameter is not configured, value of <strong id="en-us_topic_0183265947_b1318185814528"><a name="en-us_topic_0183265947_b1318185814528"></a><a name="en-us_topic_0183265947_b1318185814528"></a>route MTU</strong> is used by default. If the default route is not configured, set this parameter to the constant value <strong id="en-us_topic_0183265947_b14687135195320"><a name="en-us_topic_0183265947_b14687135195320"></a><a name="en-us_topic_0183265947_b14687135195320"></a>1500</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row139602035111217"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p159602035161215"><a name="en-us_topic_0183265947_p159602035161215"></a><a name="en-us_topic_0183265947_p159602035161215"></a>-p,  --pidfile="/var/run/docker.pid"</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p996013591220"><a name="en-us_topic_0183265947_p996013591220"></a><a name="en-us_topic_0183265947_p996013591220"></a>PID file path of the background process.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row996073513129"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p5960163511215"><a name="en-us_topic_0183265947_p5960163511215"></a><a name="en-us_topic_0183265947_p5960163511215"></a>--raw-logs</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p149606354127"><a name="en-us_topic_0183265947_p149606354127"></a><a name="en-us_topic_0183265947_p149606354127"></a>Logs with all timestamps and without the ANSI color scheme.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row169602359120"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p896083517128"><a name="en-us_topic_0183265947_p896083517128"></a><a name="en-us_topic_0183265947_p896083517128"></a>--registry-mirror=[]</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p2960113517121"><a name="en-us_topic_0183265947_p2960113517121"></a><a name="en-us_topic_0183265947_p2960113517121"></a>Image registry preferentially used by the dockerd.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row9960535101215"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p196020352120"><a name="en-us_topic_0183265947_p196020352120"></a><a name="en-us_topic_0183265947_p196020352120"></a>-s,  --storage-driver=""</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p13960173521210"><a name="en-us_topic_0183265947_p13960173521210"></a><a name="en-us_topic_0183265947_p13960173521210"></a>Storage driver used when a container is forcibly run.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row12961635181213"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p149612035141215"><a name="en-us_topic_0183265947_p149612035141215"></a><a name="en-us_topic_0183265947_p149612035141215"></a>--selinux-enabled=false</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p196112351129"><a name="en-us_topic_0183265947_p196112351129"></a><a name="en-us_topic_0183265947_p196112351129"></a>Enables SELinux. If the kernel version is 3.10.0-862.14 or later, this parameter cannot be set to <strong id="en-us_topic_0183265947_b199931014462"><a name="en-us_topic_0183265947_b199931014462"></a><a name="en-us_topic_0183265947_b199931014462"></a>true</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row996118350122"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p10961193521219"><a name="en-us_topic_0183265947_p10961193521219"></a><a name="en-us_topic_0183265947_p10961193521219"></a>--storage-opt=[]</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p1396163513121"><a name="en-us_topic_0183265947_p1396163513121"></a><a name="en-us_topic_0183265947_p1396163513121"></a>Storage driver parameter. This parameter is valid only when the storage driver is devicemapper. Example: <strong id="en-us_topic_0183265947_b261163664416"><a name="en-us_topic_0183265947_b261163664416"></a><a name="en-us_topic_0183265947_b261163664416"></a>dockerd --storage-opt dm.blocksize=512K</strong></p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row5961123510122"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p19611935181214"><a name="en-us_topic_0183265947_p19611935181214"></a><a name="en-us_topic_0183265947_p19611935181214"></a>--tls=false</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p09611735161213"><a name="en-us_topic_0183265947_p09611735161213"></a><a name="en-us_topic_0183265947_p09611735161213"></a>Enables the TLS authentication.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row13961183531216"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p3961163581215"><a name="en-us_topic_0183265947_p3961163581215"></a><a name="en-us_topic_0183265947_p3961163581215"></a>--tlscacert="/root/.docker/ca.pem"</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p4961173514126"><a name="en-us_topic_0183265947_p4961173514126"></a><a name="en-us_topic_0183265947_p4961173514126"></a>Certificate file path that has been authenticated by the CA.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row696111359122"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p1796113515120"><a name="en-us_topic_0183265947_p1796113515120"></a><a name="en-us_topic_0183265947_p1796113515120"></a>--tlscert="/root/.docker/cert.pem"</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p99611357128"><a name="en-us_topic_0183265947_p99611357128"></a><a name="en-us_topic_0183265947_p99611357128"></a>File path of the TLS certificates.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row109613356121"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p2096163521211"><a name="en-us_topic_0183265947_p2096163521211"></a><a name="en-us_topic_0183265947_p2096163521211"></a>--tlskey="/root/.docker/key.pem"</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p196173521218"><a name="en-us_topic_0183265947_p196173521218"></a><a name="en-us_topic_0183265947_p196173521218"></a>File path of TLS keys.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row396153517121"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p596263510123"><a name="en-us_topic_0183265947_p596263510123"></a><a name="en-us_topic_0183265947_p596263510123"></a>--tlsverify=false</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p199621035151212"><a name="en-us_topic_0183265947_p199621035151212"></a><a name="en-us_topic_0183265947_p199621035151212"></a>Verifies the communication between the background processes and the client using TLS.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row1596223520126"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p69622035141217"><a name="en-us_topic_0183265947_p69622035141217"></a><a name="en-us_topic_0183265947_p69622035141217"></a>--insecure-skip-verify-enforce</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p19962235141213"><a name="en-us_topic_0183265947_p19962235141213"></a><a name="en-us_topic_0183265947_p19962235141213"></a>Whether to forcibly skip the verification of the certificate host or domain name. The default value is <strong id="en-us_topic_0183265947_b198464517228"><a name="en-us_topic_0183265947_b198464517228"></a><a name="en-us_topic_0183265947_b198464517228"></a>false</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row1396273591220"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p19962235171211"><a name="en-us_topic_0183265947_p19962235171211"></a><a name="en-us_topic_0183265947_p19962235171211"></a>--use-decrypted-key=true</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p296263531214"><a name="en-us_topic_0183265947_p296263531214"></a><a name="en-us_topic_0183265947_p296263531214"></a>Whether to use the decryption private key.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row15962203541214"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p14962113551211"><a name="en-us_topic_0183265947_p14962113551211"></a><a name="en-us_topic_0183265947_p14962113551211"></a>--userland-proxy=true</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p1896218356123"><a name="en-us_topic_0183265947_p1896218356123"></a><a name="en-us_topic_0183265947_p1896218356123"></a>Whether to use the userland proxy for the container LO device.</p>
</td>
</tr>
<tr id="en-us_topic_0183265947_row199621435121215"><td class="cellrowborder" valign="top" width="41.08%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183265947_p196203551217"><a name="en-us_topic_0183265947_p196203551217"></a><a name="en-us_topic_0183265947_p196203551217"></a>--userns-remap</p>
</td>
<td class="cellrowborder" valign="top" width="58.919999999999995%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183265947_p1962163510124"><a name="en-us_topic_0183265947_p1962163510124"></a><a name="en-us_topic_0183265947_p1962163510124"></a>User namespace-based user mapping table in the container.</p>
<div class="note" id="en-us_topic_0183265947_note383035019435"><a name="en-us_topic_0183265947_note383035019435"></a><a name="en-us_topic_0183265947_note383035019435"></a><span class="notetitle"> NOTE: </span><div class="notebody"><p id="en-us_topic_0183265947_p5962163541216"><a name="en-us_topic_0183265947_p5962163541216"></a><a name="en-us_topic_0183265947_p5962163541216"></a>This parameter is not supported in the current version.</p>
</div></div>
</td>
</tr>
</tbody>
</table>

