# Container Management

- [Container Management](#container-management-2)
    - [attach](#attach-41)
    - [commit](#commit)
    - [cp](#cp)
    - [create](#create)
    - [diff](#diff)
    - [exec](#exec-42)
    - [export](#export)
    - [inspect](#inspect)
    - [logs](#logs)
    - [pause/unpause](#pause-unpause)
    - [port](#port)
    - [ps](#ps)
    - [rename](#rename)
    - [restart](#restart)
    - [rm](#rm)
    - [run](#run)
    - [start](#start)
    - [stats](#stats)
    - [stop](#stop)
    - [top](#top)
    - [update](#update)
    - [wait](#wait)


Subcommands supported by the current Docker are classified into the following groups by function:


<table><thead align="left"><tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row1183915"><th class="cellrowborder" valign="top" id="mcps1.1.5.1.1"><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p28788263"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p28788263"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p28788263"></a><strong id="en-us_topic_0183243657_b2756155817459"><a name="en-us_topic_0183243657_b2756155817459"></a><a name="en-us_topic_0183243657_b2756155817459"></a>Function</strong></p>
</th>
<th class="cellrowborder" colspan="2" valign="top" id="mcps1.1.5.1.2"><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p50147992"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p50147992"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p50147992"></a><strong id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_b683194415355"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_b683194415355"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_b683194415355"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" id="mcps1.1.5.1.3"><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p35455590"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p35455590"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p35455590"></a><strong id="en-us_topic_0183243657_b1544135612465"><a name="en-us_topic_0183243657_b1544135612465"></a><a name="en-us_topic_0183243657_b1544135612465"></a>Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row50664859"><td class="cellrowborder" rowspan="2" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p10212927"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p10212927"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p10212927"></a>Host environment</p>
</td>
<td class="cellrowborder" colspan="2" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p21940722"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p21940722"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p21940722"></a>version</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p32368095"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p32368095"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p32368095"></a>Views the Docker version.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row22877402"><td class="cellrowborder" colspan="2" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p41130254"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p41130254"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p41130254"></a>info</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p43216271"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p43216271"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p43216271"></a>Views the Docker system and host environment information.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row53402119"><td class="cellrowborder" rowspan="20" valign="top" width="25%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p30604389"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p30604389"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p30604389"></a>Container-related information</p>
</td>
<td class="cellrowborder" rowspan="7" valign="top" width="25%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p63036484"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p63036484"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p63036484"></a>Container lifecycle management</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p5681612"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p5681612"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p5681612"></a>create</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p57557412"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p57557412"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p57557412"></a>Creates a container using an image.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row48254661"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p16313497"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p16313497"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p16313497"></a>run</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p46324881"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p46324881"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p46324881"></a>Creates and runs a container using an image.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row14270750"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p15080136"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p15080136"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p15080136"></a>start</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p13531531"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p13531531"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p13531531"></a>Starts a stopped container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row54674917"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p66592127"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p66592127"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p66592127"></a>stop</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p25253189"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p25253189"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p25253189"></a>Stops a running container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row25952117"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p21746729"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p21746729"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p21746729"></a>restart</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p16654654"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p16654654"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p16654654"></a>Restarts a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row45420240"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p55160823"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p55160823"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p55160823"></a>wait</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p38841670"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p38841670"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p38841670"></a>Waits for a container to stop and prints the exit code.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row14030717"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p62746268"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p62746268"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p62746268"></a>rm</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p49282936"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p49282936"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p49282936"></a>Deletes a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row40893240"><td class="cellrowborder" rowspan="4" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p24018105"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p24018105"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p24018105"></a>Container process management</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p66418347"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p66418347"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p66418347"></a>pause</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p11177013"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p11177013"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p11177013"></a>Suspends all processes in a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row33484259"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p27870469"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p27870469"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p27870469"></a>unpause</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p42915540"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p42915540"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p42915540"></a>Resumes a suspended process in a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row50695543"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p12698356"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p12698356"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p12698356"></a>top</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p21933905"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p21933905"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p21933905"></a>Views processes in a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row63187419"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p17907308"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p17907308"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p17907308"></a>exec</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p41205809"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p41205809"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p41205809"></a>Executes a process in containers.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row35307962"><td class="cellrowborder" rowspan="9" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p41372713"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p41372713"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p41372713"></a>Container inspection tool</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p62855489"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p62855489"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p62855489"></a>ps</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p58129833"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p58129833"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p58129833"></a>Views running containers (without attaching any option).</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row53406450"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p30955222"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p30955222"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p30955222"></a>logs</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p24345054"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p24345054"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p24345054"></a>Displays the log information of a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row17778899"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p30804749"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p30804749"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p30804749"></a>attach</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p12156768"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p12156768"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p12156768"></a>Connects standard input and output to a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row42302050"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p3913996"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p3913996"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p3913996"></a>inspect</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p48598242"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p48598242"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p48598242"></a>Returns the bottom-layer information of a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row34731002"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p61747774"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p61747774"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p61747774"></a>port</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p35513827"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p35513827"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p35513827"></a>Lists the port mappings between containers and hosts.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row51188993"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p52667802"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p52667802"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p52667802"></a>diff</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p38233575"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p38233575"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p38233575"></a>Returns the changes made by the container compared with rootfs in the image.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row8557861"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p22098140"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p22098140"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p22098140"></a>cp</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p45118907"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p45118907"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p45118907"></a>Copies files between containers and hosts.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row3416986"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p8340425"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p8340425"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p8340425"></a>export</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p4485813"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p4485813"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p4485813"></a>Exports the file system in a container in a .tar package.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row44406948121132"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p35936326121132"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p35936326121132"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p35936326121132"></a>stats</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p25161274121132"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p25161274121132"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p25161274121132"></a>Views the resource usage of a container in real time.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row40372317"><td class="cellrowborder" rowspan="14" valign="top" width="25%" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p48932206"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p48932206"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p48932206"></a>Images</p>
</td>
<td class="cellrowborder" rowspan="4" valign="top" width="25%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p4085744"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p4085744"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p4085744"></a>Generates an image.</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p62509834"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p62509834"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p62509834"></a>build</p>
</td>
<td class="cellrowborder" valign="top" width="25%" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p30131813"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p30131813"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p30131813"></a>Creates an image using a Dockerfile.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row2750866"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p21493617"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p21493617"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p21493617"></a>commit</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p63261412"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p63261412"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p63261412"></a>Creates an image based on the container rootfs.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row32481801"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p13780214"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p13780214"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p13780214"></a>import</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p42455531"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p42455531"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p42455531"></a>Creates an image using the content in the .tar package as the file system.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row46555465"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p12896286"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p12896286"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p12896286"></a>load</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p37966223"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p37966223"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p37966223"></a>Loads an image from the .tar package.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row6151694"><td class="cellrowborder" rowspan="5" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p28525238"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p28525238"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p28525238"></a>Image registry</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p28842926"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p28842926"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p28842926"></a>login</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p54575646"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p54575646"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p54575646"></a>Logs in to a registry.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row21418771"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p57198891"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p57198891"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p57198891"></a>logout</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p2598608"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p2598608"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p2598608"></a>Logs out of a registry.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row23387474"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p15337269"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p15337269"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p15337269"></a>pull</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p34359256"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p34359256"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p34359256"></a>Pulls an image from the registry.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row40797849"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p16291455"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p16291455"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p16291455"></a>push</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p44539515"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p44539515"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p44539515"></a>Pushes an image to the registry.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row65311315"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p55725192"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p55725192"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p55725192"></a>search</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p17446726"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p17446726"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p17446726"></a>Searches for an image in the registry.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row22802807"><td class="cellrowborder" rowspan="5" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p35088084"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p35088084"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p35088084"></a>Image management</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p23562574"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p23562574"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p23562574"></a>images</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p29520332"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p29520332"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p29520332"></a>Displays images in the system.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row64356400"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p45485936"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p45485936"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p45485936"></a>history</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p60482217"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p60482217"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p60482217"></a>Displays the change history of an image.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row7469042"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p1012626"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p1012626"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p1012626"></a>rmi</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p14913854"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p14913854"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p14913854"></a>Deletes an image.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row6965"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p564191"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p564191"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p564191"></a>tag</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p45699530"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p45699530"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p45699530"></a>Adds a tag to an image.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row8642591"><td class="cellrowborder" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p28961294"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p28961294"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p28961294"></a>save</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p64163473"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p64163473"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p64163473"></a>Saves an image to a .tar package.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row40600350"><td class="cellrowborder" rowspan="2" valign="top" headers="mcps1.1.5.1.1 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p294043"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p294043"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p294043"></a>Others</p>
</td>
<td class="cellrowborder" colspan="2" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p23817504"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p23817504"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p23817504"></a>events</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p50169686"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p50169686"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p50169686"></a>Obtains real-time events from the Docker daemon.</p>
</td>
</tr>
<tr id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_row2952396121125"><td class="cellrowborder" colspan="2" valign="top" headers="mcps1.1.5.1.2 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p5522470121253"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p5522470121253"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p5522470121253"></a>rename</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.1.5.1.3 "><p id="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p9096874121125"><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p9096874121125"></a><a name="en-us_topic_0183243657_en-us_topic_0155236992_en-us_topic_0076221003_en-us_topic_0043209396_p9096874121125"></a>Renames a container.</p>
</td>
</tr>
</tbody>
</table>

Some subcommands have some parameters, such as  **docker run**. You can run the  **docker **_command _**--help**  command to view the help information of the command. For details about the command parameters, see the preceding command parameter description. The following sections describe how to use each command.



## attach

Syntax:  **docker attach \[**_options_**\]** _container_

Function: Attaches an option to a running container.

Parameter description:

**--no-stdin=false**: Does not attach any STDIN.

**--sig-proxy=true**: Proxies all signals of the container, except SIGCHLD, SIGKILL, and SIGSTOP.

Example:

```
$ sudo docker attach attach_test
root@2988b8658669:/# ls bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

## commit

Syntax:  **docker commit \[**_options_**\] **_container _**\[**_repository\[:tag\]_**\]**

Function: creates an image from a container.

Parameter description:

**-a**,  **--author=""**: specifies an author.

**-m**,  **--message=""**: specifies the submitted information.

**-p**,  **--pause=true**: pauses the container during submission.

Example:

Run the following command to start a container and submit the container as a new image:

```
$ sudo docker commit test busybox:test
sha256:be4672959e8bd8a4291fbdd9e99be932912fe80b062fba3c9b16ee83720c33e1

$ sudo docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
busybox             latest              e02e811dd08f        2 years ago         1.09MB
```

  

## cp

Syntax:  **docker cp \[**_options_**\] **_container_**:**_src\_path_ _dest\_path_**|-**

**docker cp \[**_options_**\]** _src\_path_**|-** _container_**:**_dest\_path_

Function: Copies a file or folder from a path in a container to a path on the host or copies a file or folder from the host to the container:

Precautions: The  **docker cp**  command does not support the copy of files in virtual file systems such as  **/proc**,  **/sys**,  **/dev**, and  **/tmp**  in the container and files in the file systems mounted by users in the container.

Parameter description:

**-a**,  **--archive**: Sets the owner of the file copied to the container to the  **container**  user \(**--user**\).

**-L**,  **--follow-link**: Parses and traces the symbolic link of a file.

Example:

Run the following command to copy the  **/test**  directory in the registry container to the  **/home/**_aaa_  directory on the host:

```
$ sudo docker cp registry:/test /home/aaa
```

## create

Syntax:  **docker create \[**_options_**\]** _image_ **\[**_command_**\] \[**_arg_**...\]**

Function: Creates a container using an image file and return the ID of the container. After the container is created, run the  **docker start**  command to start the container.  _options_  are used to configure the container during container creation. Some parameters will overwrite the container configuration in the image file.  _command_  indicates the command to be executed during container startup.

Parameter description:

**Table  1**  Parameter description

<a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_table1239044502210"></a>
<table><thead align="left"><tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row439004518223"><th class="cellrowborder" valign="top" width="32%" id="mcps1.2.3.1.1"><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p19390104532213"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p19390104532213"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p19390104532213"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="68%" id="mcps1.2.3.1.2"><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1039064522216"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1039064522216"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1039064522216"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row13390104518221"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p16390174542214"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p16390174542214"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p16390174542214"></a>-a --attach=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1239011453221"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1239011453221"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1239011453221"></a>Attaches the console to the STDIN, STDOUT, and STDERR of the process in the container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row03908454227"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p639018453223"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p639018453223"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p639018453223"></a>--name=""</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p4391134519226"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p4391134519226"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p4391134519226"></a>Name of a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row163918452222"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p10391174517228"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p10391174517228"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p10391174517228"></a>--add-host=[host:ip]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p661113016127"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p661113016127"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p661113016127"></a>Adds a mapping between the host name and IP address to the <strong id="en-us_topic_0183243660_b31559219217"><a name="en-us_topic_0183243660_b31559219217"></a><a name="en-us_topic_0183243660_b31559219217"></a>/etc/hosts</strong> in the container.</p>
<p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p0783519172414"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p0783519172414"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p0783519172414"></a>For example, <strong id="en-us_topic_0183243660_b1235210421622"><a name="en-us_topic_0183243660_b1235210421622"></a><a name="en-us_topic_0183243660_b1235210421622"></a>--add-host=test:10.10.10.10</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row10693921155915"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17958540404"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17958540404"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17958540404"></a>--annotation</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p20424151611011"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p20424151611011"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p20424151611011"></a>Sets annotations for the container. For example, set the <strong id="en-us_topic_0183243660_b35053219281"><a name="en-us_topic_0183243660_b35053219281"></a><a name="en-us_topic_0183243660_b35053219281"></a>native.umask</strong> parameter.</p>
<pre class="screen" id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_screen188792816013"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_screen188792816013"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_screen188792816013"></a>--annotation native.umask=normal #The <strong id="en-us_topic_0183243660_b1926311515334"><a name="en-us_topic_0183243660_b1926311515334"></a><a name="en-us_topic_0183243660_b1926311515334"></a>umask</strong> value of the started container is 0022.
--annotation native.umask=secure #The <strong id="en-us_topic_0183243660_b128155712337"><a name="en-us_topic_0183243660_b128155712337"></a><a name="en-us_topic_0183243660_b128155712337"></a>umask</strong> value of the started container is 0027.</pre>
<p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p126931121195914"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p126931121195914"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p126931121195914"></a>If this parameter is not set, the <strong id="en-us_topic_0183243660_b19456181817414"><a name="en-us_topic_0183243660_b19456181817414"></a><a name="en-us_topic_0183243660_b19456181817414"></a>umask</strong> configuration in dockerd is used.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row939164522218"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p03911345142218"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p03911345142218"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p03911345142218"></a>--blkio-weight</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1139111453223"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1139111453223"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1139111453223"></a>Relative weight of blockio, which ranges from 10 to 1000.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row1139110458220"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1339110456222"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1339110456222"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1339110456222"></a>--blkio-weight-device=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p5912131582516"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p5912131582516"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p5912131582516"></a>Blockio weight, which configures the relative weight.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row339184572217"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p83911445172217"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p83911445172217"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p83911445172217"></a>-c, --cpu-shares=0</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p3391145132220"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p3391145132220"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p3391145132220"></a>Relative weight of the host CPU obtained by the container. This parameter can be used to obtain a higher priority. By default, all containers obtain the same CPU priority.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row1639114454221"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p143911545142214"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p143911545142214"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p143911545142214"></a>--cap-add=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p02723315267"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p02723315267"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p02723315267"></a>Adds Linux functions.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row16136171852612"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p18137121810261"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p18137121810261"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p18137121810261"></a>--cap-drop=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p7137141892617"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p7137141892617"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p7137141892617"></a>Clears Linux functions.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row1695452015268"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p13954192022614"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p13954192022614"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p13954192022614"></a>--cgroup-parent</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p729685122617"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p729685122617"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p729685122617"></a>cgroup parent directory for the container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row1838402332617"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p15384122332619"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p15384122332619"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p15384122332619"></a>--cidfile=""</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p147641332151417"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p147641332151417"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p147641332151417"></a>Writes the container ID to a specified file.</p>
<p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p23841223192619"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p23841223192619"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p23841223192619"></a>For example: <strong id="en-us_topic_0183243660_b9861105113305"><a name="en-us_topic_0183243660_b9861105113305"></a><a name="en-us_topic_0183243660_b9861105113305"></a>--cidfile=/home/cidfile-test</strong> writes the container ID to the <strong id="en-us_topic_0183243660_b272015511311"><a name="en-us_topic_0183243660_b272015511311"></a><a name="en-us_topic_0183243660_b272015511311"></a>/home/cidfile-test</strong> file.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row8107726122617"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p51070266260"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p51070266260"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p51070266260"></a>--cpu-period</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p6107926132615"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p6107926132615"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p6107926132615"></a>CPU CFS period.</p>
<p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1869573811136"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1869573811136"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1869573811136"></a>The default value is <strong id="en-us_topic_0183243660_b1268211474153"><a name="en-us_topic_0183243660_b1268211474153"></a><a name="en-us_topic_0183243660_b1268211474153"></a>100</strong> ms. Generally, <strong id="en-us_topic_0183243660_b4682144716152"><a name="en-us_topic_0183243660_b4682144716152"></a><a name="en-us_topic_0183243660_b4682144716152"></a>--cpu-period</strong> and<strong id="en-us_topic_0183243660_b1668214710156"><a name="en-us_topic_0183243660_b1668214710156"></a><a name="en-us_topic_0183243660_b1668214710156"></a> --cpu-quota</strong> are used together. For example, <strong id="en-us_topic_0183243660_b96821847101518"><a name="en-us_topic_0183243660_b96821847101518"></a><a name="en-us_topic_0183243660_b96821847101518"></a>--cpu-period=50000 --cpu-quota=25000</strong> indicates that if there is one CPU, the container can obtain 50% of the CPU every 50 ms.</p>
<p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p754192711814"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p754192711814"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p754192711814"></a><strong id="en-us_topic_0183243660_b136361150143119"><a name="en-us_topic_0183243660_b136361150143119"></a><a name="en-us_topic_0183243660_b136361150143119"></a>--cpus=0.5</strong> has the same effect.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row5206162817268"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p3206528112617"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p3206528112617"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p3206528112617"></a>--cpu-quota</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p416835333813"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p416835333813"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p416835333813"></a>CPU CFS quota. The default value is <strong id="en-us_topic_0183243660_b12179077327"><a name="en-us_topic_0183243660_b12179077327"></a><a name="en-us_topic_0183243660_b12179077327"></a>0</strong>, indicating that there is no restriction on the quota.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row156458413395"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1264694173910"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1264694173910"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1264694173910"></a>--cpuset-cpus</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p924612309396"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p924612309396"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p924612309396"></a>Number of CPUs (0-3, 0, 1) that can be used by processes in the container. By default, there is no restriction on this parameter.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row2946124394"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p494181216393"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p494181216393"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p494181216393"></a>--cpuset-mems</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p20942126396"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p20942126396"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p20942126396"></a>Memory nodes (0-3, 0, 1) for running processes in the container. This parameter is valid only for the NUMA system.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row1246231483919"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1046321410394"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1046321410394"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1046321410394"></a>--device=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17463141416395"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17463141416395"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17463141416395"></a>Adds the host device to a container, for example, <strong id="en-us_topic_0183243660_b16891161453314"><a name="en-us_topic_0183243660_b16891161453314"></a><a name="en-us_topic_0183243660_b16891161453314"></a>--device=/dev/sdc:/dev/xvdc:rwm</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row5677161718393"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p9677717143920"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p9677717143920"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p9677717143920"></a>--dns=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p8677191743912"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p8677191743912"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p8677191743912"></a>Forcibly enables the container to use the specified DNS server. For example, <strong id="en-us_topic_0183243660_b15704136153312"><a name="en-us_topic_0183243660_b15704136153312"></a><a name="en-us_topic_0183243660_b15704136153312"></a>--dns=114.114.</strong><em id="en-us_topic_0183243660_i32641440193319"><a name="en-us_topic_0183243660_i32641440193319"></a><a name="en-us_topic_0183243660_i32641440193319"></a>xxx.xxx</em> indicates that <strong id="en-us_topic_0183243660_b17705142163418"><a name="en-us_topic_0183243660_b17705142163418"></a><a name="en-us_topic_0183243660_b17705142163418"></a>nameserver 114.114.</strong><em id="en-us_topic_0183243660_i122201145123410"><a name="en-us_topic_0183243660_i122201145123410"></a><a name="en-us_topic_0183243660_i122201145123410"></a>xxx.xxx</em> is written to <strong id="en-us_topic_0183243660_b17252144933416"><a name="en-us_topic_0183243660_b17252144933416"></a><a name="en-us_topic_0183243660_b17252144933416"></a>/etc/resolv.conf</strong> of the created container and the original content is overwritten.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row35991149113218"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p9599849173216"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p9599849173216"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p9599849173216"></a>--dns-opt=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p157887213330"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p157887213330"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p157887213330"></a>DNS options.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row10476452143212"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p147616528321"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p147616528321"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p147616528321"></a>--dns-search=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p44042037103310"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p44042037103310"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p44042037103310"></a>Forcibly searches DNS search domain name used by a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row115101955143215"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p3510855103218"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p3510855103218"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p3510855103218"></a>-e, --env=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1510125516321"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1510125516321"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1510125516321"></a>Sets environment variable for the container.</p>
<p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p6236165619264"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p6236165619264"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p6236165619264"></a>--env=[KERNEL_MODULES=]:</p>
<p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p174241144162614"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p174241144162614"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p174241144162614"></a>Inserts a specified module into a container. Currently, only the modules on the host can be inserted. After the container is deleted, the modules still reside on the host, and the <strong id="en-us_topic_0183243660_b1615330183817"><a name="en-us_topic_0183243660_b1615330183817"></a><a name="en-us_topic_0183243660_b1615330183817"></a>--hook-spec</strong> option must be configured for the container. The following are valid parameter formats:</p>
<p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p9502124212615"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p9502124212615"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p9502124212615"></a>KERNEL_MODULERS=</p>
<p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17753847172611"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17753847172611"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17753847172611"></a>KERNEL_MODULERS=a</p>
<p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p953414962610"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p953414962610"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p953414962610"></a>KERNEL_MODULERS=a,b</p>
<p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1381113162616"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1381113162616"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1381113162616"></a>KERNEL_MODULERS=a,b,</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row763085713328"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1663015712322"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1663015712322"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1663015712322"></a>--entrypoint=""</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1763135714328"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1763135714328"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1763135714328"></a>Overwrites the original <strong id="en-us_topic_0183243660_b131681127163910"><a name="en-us_topic_0183243660_b131681127163910"></a><a name="en-us_topic_0183243660_b131681127163910"></a>entrypoint</strong> in the image. The <strong id="en-us_topic_0183243660_b10867182473919"><a name="en-us_topic_0183243660_b10867182473919"></a><a name="en-us_topic_0183243660_b10867182473919"></a>entrypoint</strong> is used to set the command executed when the container is started.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row1774265915324"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p2074275918322"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p2074275918322"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p2074275918322"></a>--env-file=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1774275913325"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1774275913325"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1774275913325"></a>Reads environment variables from a file. Multiple environment variables are separated by lines in the file. For example: <strong id="en-us_topic_0183243660_b09531821134018"><a name="en-us_topic_0183243660_b09531821134018"></a><a name="en-us_topic_0183243660_b09531821134018"></a>--env-file=/home/test/env</strong> indicates multiple environment variables are stored in the <strong id="en-us_topic_0183243660_b1551618379574"><a name="en-us_topic_0183243660_b1551618379574"></a><a name="en-us_topic_0183243660_b1551618379574"></a>env</strong> file.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row638182183316"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p2038112143313"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p2038112143313"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p2038112143313"></a>--expose=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p3518135163415"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p3518135163415"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p3518135163415"></a>Enables an internal port of a container. The <strong id="en-us_topic_0183243660_b1447126105817"><a name="en-us_topic_0183243660_b1447126105817"></a><a name="en-us_topic_0183243660_b1447126105817"></a>-P</strong> option described in the following section maps the enabled port to a port on the host.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row1571316419339"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p971311443316"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p971311443316"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p971311443316"></a>--group-add=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p343520423515"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p343520423515"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p343520423515"></a>Adds a specified container to an additional group.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row11663811333"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p16661381334"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p16661381334"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p16661381334"></a>-h, --hostname=""</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p966158203310"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p966158203310"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p966158203310"></a>Host name.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row51351554164810"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p12135115420482"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p12135115420482"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p12135115420482"></a>--health-cmd</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1213565464815"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1213565464815"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1213565464815"></a>Container health check command.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row8969222144910"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p0969922164919"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p0969922164919"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p0969922164919"></a>--health-interval</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p13295335504"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p13295335504"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p13295335504"></a>Interval between two consecutive command executions. The default value is <strong id="en-us_topic_0183243660_b769402724219"><a name="en-us_topic_0183243660_b769402724219"></a><a name="en-us_topic_0183243660_b769402724219"></a>30s</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row649018725011"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1949177205019"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1949177205019"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1949177205019"></a>--health-timeout</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p104917718506"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p104917718506"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p104917718506"></a>Maximum duration for executing a single check command. If the execution times out, the command fails to be executed. The default value is <strong id="en-us_topic_0183243660_b118154438015"><a name="en-us_topic_0183243660_b118154438015"></a><a name="en-us_topic_0183243660_b118154438015"></a>30s</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row126076111509"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1660751155012"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1660751155012"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1660751155012"></a>--health-start-period</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17607711175014"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17607711175014"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17607711175014"></a>Interval between the time when the container is started and the time when the first health check is performed. The default value is <strong id="en-us_topic_0183243660_b52621348115"><a name="en-us_topic_0183243660_b52621348115"></a><a name="en-us_topic_0183243660_b52621348115"></a>0s</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row66385917505"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1363814925013"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1363814925013"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1363814925013"></a>--health-retries</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1863816915017"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1863816915017"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1863816915017"></a>Maximum number of retries after a health check fails. The default value is <strong id="en-us_topic_0183243660_b833119920113"><a name="en-us_topic_0183243660_b833119920113"></a><a name="en-us_topic_0183243660_b833119920113"></a>3</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row15336158104814"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p93366583488"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p93366583488"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p93366583488"></a>--health-exit-on-unhealthy</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p14336125813484"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p14336125813484"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p14336125813484"></a>Specifies whether to stop a container when the container is unhealthy. The default value is <strong id="en-us_topic_0183243660_b2068310341731"><a name="en-us_topic_0183243660_b2068310341731"></a><a name="en-us_topic_0183243660_b2068310341731"></a>false</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row1463141184610"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p176421112467"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p176421112467"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p176421112467"></a>--host-channel=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p12641211194620"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p12641211194620"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p12641211194620"></a>Sets a channel for communication between processes in the container and the host, in <em id="en-us_topic_0183243660_i1444465318618"><a name="en-us_topic_0183243660_i1444465318618"></a><a name="en-us_topic_0183243660_i1444465318618"></a>host path</em>:<em id="en-us_topic_0183243660_i1626045714615"><a name="en-us_topic_0183243660_i1626045714615"></a><a name="en-us_topic_0183243660_i1626045714615"></a>container path</em>:<em id="en-us_topic_0183243660_i83231628713"><a name="en-us_topic_0183243660_i83231628713"></a><a name="en-us_topic_0183243660_i83231628713"></a>rw/ro</em>:<em id="en-us_topic_0183243660_i17754145573"><a name="en-us_topic_0183243660_i17754145573"></a><a name="en-us_topic_0183243660_i17754145573"></a>size limit</em> format.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row16526101063313"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p105261107331"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p105261107331"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p105261107331"></a>-i, --interactive=false</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p841113270358"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p841113270358"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p841113270358"></a>Enables STDIN even if it is not attached.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row950341273310"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p19503121273317"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p19503121273317"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p19503121273317"></a>--ip</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1547019395354"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1547019395354"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1547019395354"></a>IPv4 address of a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row87181149143513"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p171814919351"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p171814919351"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p171814919351"></a>--ip6</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p67181649103512"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p67181649103512"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p67181649103512"></a>IPv6 address of a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row1717716527350"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p111771752113512"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p111771752113512"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p111771752113512"></a>--ipc</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1689831418365"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1689831418365"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1689831418365"></a>IPC namespace of a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row10615195415353"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17615654143517"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17615654143517"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17615654143517"></a>--isolation</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p178131223133615"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p178131223133615"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p178131223133615"></a>Container isolation policy.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row15103164904017"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p210364914409"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p210364914409"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p210364914409"></a>-l, --label=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p185289288418"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p185289288418"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p185289288418"></a>Label of a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row1669151694117"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1669110162412"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1669110162412"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1669110162412"></a>--label-file=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p48722030164217"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p48722030164217"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p48722030164217"></a>Obtains the label from the file.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row157612515412"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p18576165164117"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p18576165164117"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p18576165164117"></a>--link=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p19577655418"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p19577655418"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p19577655418"></a>Links to another container. This parameter adds environment variables of the IP address and port number of the linked container to the container and adds a mapping to the <strong id="en-us_topic_0183243660_b16778563215"><a name="en-us_topic_0183243660_b16778563215"></a><a name="en-us_topic_0183243660_b16778563215"></a>/etc/hosts</strong> file, for example, <strong id="en-us_topic_0183243660_b1473134213218"><a name="en-us_topic_0183243660_b1473134213218"></a><a name="en-us_topic_0183243660_b1473134213218"></a>--link=</strong><em id="en-us_topic_0183243660_i3355105116219"><a name="en-us_topic_0183243660_i3355105116219"></a><a name="en-us_topic_0183243660_i3355105116219"></a>name:alias</em>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row6312814104119"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p163125144414"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p163125144414"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p163125144414"></a>--log-driver</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p16201659144116"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p16201659144116"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p16201659144116"></a>Log driver of a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row1943121115418"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p394331118414"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p394331118414"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p394331118414"></a>--log-opt=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1348874894116"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1348874894116"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1348874894116"></a>Log driver option.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row1469012816412"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p26901688416"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p26901688416"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p26901688416"></a>-m, --memory=""</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1469017824112"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1469017824112"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1469017824112"></a>Memory limit of a container. The format is <em id="en-us_topic_0183243660_i61051422132213"><a name="en-us_topic_0183243660_i61051422132213"></a><a name="en-us_topic_0183243660_i61051422132213"></a>number</em><em id="en-us_topic_0183243660_i710622242219"><a name="en-us_topic_0183243660_i710622242219"></a><a name="en-us_topic_0183243660_i710622242219"></a>optional unit</em>, and available units are <strong id="en-us_topic_0183243660_b710722218224"><a name="en-us_topic_0183243660_b710722218224"></a><a name="en-us_topic_0183243660_b710722218224"></a>b</strong>, <strong id="en-us_topic_0183243660_b151071222202211"><a name="en-us_topic_0183243660_b151071222202211"></a><a name="en-us_topic_0183243660_b151071222202211"></a>k</strong>, <strong id="en-us_topic_0183243660_b410742292216"><a name="en-us_topic_0183243660_b410742292216"></a><a name="en-us_topic_0183243660_b410742292216"></a>m</strong>, and <strong id="en-us_topic_0183243660_b21081722112214"><a name="en-us_topic_0183243660_b21081722112214"></a><a name="en-us_topic_0183243660_b21081722112214"></a>g</strong>. The minimum value of this parameter is <strong id="en-us_topic_0183243660_b105124263222"><a name="en-us_topic_0183243660_b105124263222"></a><a name="en-us_topic_0183243660_b105124263222"></a>4m</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row102019564425"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p10201566422"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p10201566422"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p10201566422"></a>--mac-address</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p920175644216"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p920175644216"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p920175644216"></a>MAC address of a container, for example, <strong id="en-us_topic_0183243660_b132863556223"><a name="en-us_topic_0183243660_b132863556223"></a><a name="en-us_topic_0183243660_b132863556223"></a>92:d0:c6:0a:</strong><em id="en-us_topic_0183243660_i7116165712228"><a name="en-us_topic_0183243660_i7116165712228"></a><a name="en-us_topic_0183243660_i7116165712228"></a>xx</em><strong id="en-us_topic_0183243660_b10221115952216"><a name="en-us_topic_0183243660_b10221115952216"></a><a name="en-us_topic_0183243660_b10221115952216"></a>:</strong><em id="en-us_topic_0183243660_i131757212234"><a name="en-us_topic_0183243660_i131757212234"></a><a name="en-us_topic_0183243660_i131757212234"></a>xx</em>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row1718125964210"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p11811595428"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p11811595428"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p11811595428"></a>--memory-reservation</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p21815598424"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p21815598424"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p21815598424"></a>Container memory limit. The default value is the same as that of <strong id="en-us_topic_0183243660_b4805178142316"><a name="en-us_topic_0183243660_b4805178142316"></a><a name="en-us_topic_0183243660_b4805178142316"></a>--memory</strong>. <strong id="en-us_topic_0183243660_b21251147134317"><a name="en-us_topic_0183243660_b21251147134317"></a><a name="en-us_topic_0183243660_b21251147134317"></a>--memory</strong> is a hard limit, and <strong id="en-us_topic_0183243660_b17126247174313"><a name="en-us_topic_0183243660_b17126247174313"></a><a name="en-us_topic_0183243660_b17126247174313"></a>--memory-reservation</strong> is a soft limit. When the memory usage exceeds the preset value, the memory usage is dynamically adjusted (the system attempts to reduce the memory usage to a value less than the preset value when reclaiming the memory). However, the memory usage may exceed the preset value. Generally, this parameter can be used together with <strong id="en-us_topic_0183243660_b824605118435"><a name="en-us_topic_0183243660_b824605118435"></a><a name="en-us_topic_0183243660_b824605118435"></a>--memory</strong>. The value must be less than the preset value of <strong id="en-us_topic_0183243660_b724685118436"><a name="en-us_topic_0183243660_b724685118436"></a><a name="en-us_topic_0183243660_b724685118436"></a>--memory</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row13297131204317"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17297171144317"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17297171144317"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p17297171144317"></a>--memory-swap</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p20638163719436"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p20638163719436"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p20638163719436"></a>Total usage of the common memory and swap partition. <strong id="en-us_topic_0183243660_b1210535984311"><a name="en-us_topic_0183243660_b1210535984311"></a><a name="en-us_topic_0183243660_b1210535984311"></a>-1</strong> indicates no restriction is set on the usage. If this parameter is not set, the swap partition size is twice the value of <strong id="en-us_topic_0183243660_b14421847448"><a name="en-us_topic_0183243660_b14421847448"></a><a name="en-us_topic_0183243660_b14421847448"></a>--memory</strong>. That is, the swap partition can use the same amount of memory as<strong id="en-us_topic_0183243660_b1844344194417"><a name="en-us_topic_0183243660_b1844344194417"></a><a name="en-us_topic_0183243660_b1844344194417"></a> --memory</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row586111317439"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p168611638434"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p168611638434"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p168611638434"></a>--memory-swappiness=-1</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1463649144316"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1463649144316"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1463649144316"></a>Time when the container uses the swap memory. The value ranges from 0 to 100, in percentage.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row1115912604311"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p916016613431"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p916016613431"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p916016613431"></a>--net="bridge"</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1396135910430"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1396135910430"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1396135910430"></a>Network mode of the container. Docker 1.3.0 has the following network modes: <strong id="en-us_topic_0183243660_b19707124220445"><a name="en-us_topic_0183243660_b19707124220445"></a><a name="en-us_topic_0183243660_b19707124220445"></a>bridge</strong>, <strong id="en-us_topic_0183243660_b852994420441"><a name="en-us_topic_0183243660_b852994420441"></a><a name="en-us_topic_0183243660_b852994420441"></a>host</strong>, <strong id="en-us_topic_0183243660_b12265154611442"><a name="en-us_topic_0183243660_b12265154611442"></a><a name="en-us_topic_0183243660_b12265154611442"></a>none</strong>, and <strong id="en-us_topic_0183243660_b059755516445"><a name="en-us_topic_0183243660_b059755516445"></a><a name="en-us_topic_0183243660_b059755516445"></a>container:</strong><em id="en-us_topic_0183243660_i1657259104417"><a name="en-us_topic_0183243660_i1657259104417"></a><a name="en-us_topic_0183243660_i1657259104417"></a>name</em><strong id="en-us_topic_0183243660_b10946131015453"><a name="en-us_topic_0183243660_b10946131015453"></a><a name="en-us_topic_0183243660_b10946131015453"></a>|</strong><em id="en-us_topic_0183243660_i1985482204514"><a name="en-us_topic_0183243660_i1985482204514"></a><a name="en-us_topic_0183243660_i1985482204514"></a>id</em>. The default value is <strong id="en-us_topic_0183243660_b92788155448"><a name="en-us_topic_0183243660_b92788155448"></a><a name="en-us_topic_0183243660_b92788155448"></a>bridge</strong>.</p>
<a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_ul9922135114448"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_ul9922135114448"></a><ul id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_ul9922135114448"><li><strong id="en-us_topic_0183243660_b613012185453"><a name="en-us_topic_0183243660_b613012185453"></a><a name="en-us_topic_0183243660_b613012185453"></a>bridge</strong>: Creates a network stack on the bridge when the Docker daemon is started.</li><li><strong id="en-us_topic_0183243660_b153416517467"><a name="en-us_topic_0183243660_b153416517467"></a><a name="en-us_topic_0183243660_b153416517467"></a>host</strong>: Uses the network stack of the host in the container.</li><li><strong id="en-us_topic_0183243660_b831712378465"><a name="en-us_topic_0183243660_b831712378465"></a><a name="en-us_topic_0183243660_b831712378465"></a>none</strong>: Does not use networks.</li><li><strong id="en-us_topic_0183243660_b17331043172310"><a name="en-us_topic_0183243660_b17331043172310"></a><a name="en-us_topic_0183243660_b17331043172310"></a>container:</strong><em id="en-us_topic_0183243660_i637165314238"><a name="en-us_topic_0183243660_i637165314238"></a><a name="en-us_topic_0183243660_i637165314238"></a>name</em><strong id="en-us_topic_0183243660_b93752533236"><a name="en-us_topic_0183243660_b93752533236"></a><a name="en-us_topic_0183243660_b93752533236"></a>|</strong><em id="en-us_topic_0183243660_i1637375372312"><a name="en-us_topic_0183243660_i1637375372312"></a><a name="en-us_topic_0183243660_i1637375372312"></a>id</em>: Reuses the network stack of another container.</li></ul>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row5294172735110"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1129516276515"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1129516276515"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1129516276515"></a>--no-healthcheck</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p2295162775113"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p2295162775113"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p2295162775113"></a>Does not perform health check for a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row168110614418"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1281116624417"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1281116624417"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1281116624417"></a>--oom-kill-disable</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p444212918453"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p444212918453"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p444212918453"></a>Disables the OOM killer. You are advised not to set this parameter if the <strong id="en-us_topic_0183243660_b32120483246"><a name="en-us_topic_0183243660_b32120483246"></a><a name="en-us_topic_0183243660_b32120483246"></a>-m</strong> parameter is not set.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row341617138444"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1841691311447"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1841691311447"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1841691311447"></a>--oom-score-adj</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p2416131319445"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p2416131319445"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p2416131319445"></a>Adjusts the OOM rule of a container. The value ranges from -1000 to 1000.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row246419153446"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p12464215164418"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p12464215164418"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p12464215164418"></a>-P, --publish-all=false</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p12464201574416"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p12464201574416"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p12464201574416"></a>Maps all enabled ports of a container to host ports. Containers can be accessed through the host ports. You can run the <strong id="en-us_topic_0183243660_b1613906192617"><a name="en-us_topic_0183243660_b1613906192617"></a><a name="en-us_topic_0183243660_b1613906192617"></a>docker port</strong> command to view the mapping between container ports and host ports.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row9418171810445"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p841881874416"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p841881874416"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p841881874416"></a>-p, --publish=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1541861824418"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1541861824418"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1541861824418"></a>Maps a port in a container to a port on the host, in <em id="en-us_topic_0183243660_i1032185811264"><a name="en-us_topic_0183243660_i1032185811264"></a><a name="en-us_topic_0183243660_i1032185811264"></a>IP address</em><strong id="en-us_topic_0183243660_b1114082317272"><a name="en-us_topic_0183243660_b1114082317272"></a><a name="en-us_topic_0183243660_b1114082317272"></a>:</strong><em id="en-us_topic_0183243660_i139238142717"><a name="en-us_topic_0183243660_i139238142717"></a><a name="en-us_topic_0183243660_i139238142717"></a>host port</em><strong id="en-us_topic_0183243660_b1497517244273"><a name="en-us_topic_0183243660_b1497517244273"></a><a name="en-us_topic_0183243660_b1497517244273"></a>:</strong><em id="en-us_topic_0183243660_i65681661271"><a name="en-us_topic_0183243660_i65681661271"></a><a name="en-us_topic_0183243660_i65681661271"></a>container port</em> <strong id="en-us_topic_0183243660_b737317192273"><a name="en-us_topic_0183243660_b737317192273"></a><a name="en-us_topic_0183243660_b737317192273"></a>|</strong> <em id="en-us_topic_0183243660_i8401454192713"><a name="en-us_topic_0183243660_i8401454192713"></a><a name="en-us_topic_0183243660_i8401454192713"></a>IP address</em><strong id="en-us_topic_0183243660_b5656757152718"><a name="en-us_topic_0183243660_b5656757152718"></a><a name="en-us_topic_0183243660_b5656757152718"></a>::</strong><em id="en-us_topic_0183243660_i1981725772714"><a name="en-us_topic_0183243660_i1981725772714"></a><a name="en-us_topic_0183243660_i1981725772714"></a>container port</em><strong id="en-us_topic_0183243660_b1722131111286"><a name="en-us_topic_0183243660_b1722131111286"></a><a name="en-us_topic_0183243660_b1722131111286"></a> | </strong><em id="en-us_topic_0183243660_i1382671115287"><a name="en-us_topic_0183243660_i1382671115287"></a><a name="en-us_topic_0183243660_i1382671115287"></a>host port</em><strong id="en-us_topic_0183243660_b19243171712283"><a name="en-us_topic_0183243660_b19243171712283"></a><a name="en-us_topic_0183243660_b19243171712283"></a>:</strong><em id="en-us_topic_0183243660_i16358161715286"><a name="en-us_topic_0183243660_i16358161715286"></a><a name="en-us_topic_0183243660_i16358161715286"></a>container port</em><strong id="en-us_topic_0183243660_b1023119217288"><a name="en-us_topic_0183243660_b1023119217288"></a><a name="en-us_topic_0183243660_b1023119217288"></a> | </strong><em id="en-us_topic_0183243660_i63410225287"><a name="en-us_topic_0183243660_i63410225287"></a><a name="en-us_topic_0183243660_i63410225287"></a>container port</em> format. If no IP address is configured, accesses of all NICs on the host is listened. If no host port is configured, the host port is automatically allocated.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row89921542103611"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p11992134219363"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p11992134219363"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p11992134219363"></a>--pid</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p18568141920378"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p18568141920378"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p18568141920378"></a>PID namespace of a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row89658387"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1092051386"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1092051386"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1092051386"></a>--privileged=false</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p3910573819"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p3910573819"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p3910573819"></a>Grants extra permission to a container. If the <strong id="en-us_topic_0183243660_b1247481853013"><a name="en-us_topic_0183243660_b1247481853013"></a><a name="en-us_topic_0183243660_b1247481853013"></a>--privileged</strong> option is used, the container can access all devices on the host.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row15237826153817"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p0237182619382"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p0237182619382"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p0237182619382"></a>--restart=""</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p2345184412396"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p2345184412396"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p2345184412396"></a>Configures restart rule when the container exits. Currently, version 1.3.1 supports the following rules:</p>
<a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_ul17280105917391"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_ul17280105917391"></a><ul id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_ul17280105917391"><li><strong id="en-us_topic_0183243660_b27221954175518"><a name="en-us_topic_0183243660_b27221954175518"></a><a name="en-us_topic_0183243660_b27221954175518"></a>no</strong>: indicates that the container is not restarted when it is stopped.</li><li><strong id="en-us_topic_0183243660_b4137906564"><a name="en-us_topic_0183243660_b4137906564"></a><a name="en-us_topic_0183243660_b4137906564"></a>on-failure</strong>: indicates that the container is restarted when the container exit code is not 0. This rule can be used to add the maximum number of restart times, for example, <strong id="en-us_topic_0183243660_b613813016565"><a name="en-us_topic_0183243660_b613813016565"></a><a name="en-us_topic_0183243660_b613813016565"></a>on-failure:5</strong>, indicating that the container can be restarted for a maximum of five times.</li><li><strong id="en-us_topic_0183243660_b66837392550"><a name="en-us_topic_0183243660_b66837392550"></a><a name="en-us_topic_0183243660_b66837392550"></a>always</strong>: indicates the container is exited regardless of the exit code.</li></ul>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row18911132323815"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p691142343810"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p691142343810"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p691142343810"></a>--read-only</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p18668559397"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p18668559397"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p18668559397"></a>Mounts the root file system of the container in read-only mode.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row115202185389"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p35201018113818"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p35201018113818"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p35201018113818"></a>--security-opt=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p10176115516385"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p10176115516385"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p10176115516385"></a>Container security rule.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row95053164386"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p05053168384"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p05053168384"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p05053168384"></a>--shm-size</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p108581345163819"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p108581345163819"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p108581345163819"></a>Size of the <strong id="en-us_topic_0183243660_b23291958135419"><a name="en-us_topic_0183243660_b23291958135419"></a><a name="en-us_topic_0183243660_b23291958135419"></a>/dev/shm</strong> device. The default value is <strong id="en-us_topic_0183243660_b1255443155513"><a name="en-us_topic_0183243660_b1255443155513"></a><a name="en-us_topic_0183243660_b1255443155513"></a>64M</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row34721411143812"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1847261112385"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1847261112385"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1847261112385"></a>--stop-signal=SIGTERM</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p147783314387"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p147783314387"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p147783314387"></a>Container stop signal. The default value is <strong id="en-us_topic_0183243660_b10838952105414"><a name="en-us_topic_0183243660_b10838952105414"></a><a name="en-us_topic_0183243660_b10838952105414"></a>SIGTERM</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row18696045133612"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p66961459369"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p66961459369"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p66961459369"></a>-t, --tty=false</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p18445955113719"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p18445955113719"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p18445955113719"></a>Allocates a pseudo terminal.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row842624843616"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p144266481367"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p144266481367"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p144266481367"></a>--tmpfs=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p942618487361"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p942618487361"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p942618487361"></a>Mounts the tmpfs directory.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row12203175133620"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p620395113367"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p620395113367"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p620395113367"></a>-u, --user=""</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1388111347372"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1388111347372"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1388111347372"></a>User name or user ID.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row14460853103619"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p246185363611"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p246185363611"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p246185363611"></a>--ulimit=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p117531243374"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p117531243374"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p117531243374"></a>ulimit option.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row864743674613"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p36471436134619"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p36471436134619"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p36471436134619"></a>--userns</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p122220164710"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p122220164710"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p122220164710"></a>User namespace of a container.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row1165391469"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p4693913466"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p4693913466"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p4693913466"></a>-v, --volume=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p96153964610"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p96153964610"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p96153964610"></a>Mounts a directory of the host to the container, or create a volume in the container. For example, <strong id="en-us_topic_0183243660_b13154028205110"><a name="en-us_topic_0183243660_b13154028205110"></a><a name="en-us_topic_0183243660_b13154028205110"></a>-v /home/test:/home</strong> mounts the <strong id="en-us_topic_0183243660_b139055345112"><a name="en-us_topic_0183243660_b139055345112"></a><a name="en-us_topic_0183243660_b139055345112"></a>/home/test</strong> directory of the host to the <strong id="en-us_topic_0183243660_b126771044524"><a name="en-us_topic_0183243660_b126771044524"></a><a name="en-us_topic_0183243660_b126771044524"></a>/home</strong> directory of the container, and <strong id="en-us_topic_0183243660_b073412101525"><a name="en-us_topic_0183243660_b073412101525"></a><a name="en-us_topic_0183243660_b073412101525"></a>-v /tmp</strong> creates the <strong id="en-us_topic_0183243660_b48122053195218"><a name="en-us_topic_0183243660_b48122053195218"></a><a name="en-us_topic_0183243660_b48122053195218"></a>tmp</strong> folder in the <strong id="en-us_topic_0183243660_b1029000145315"><a name="en-us_topic_0183243660_b1029000145315"></a><a name="en-us_topic_0183243660_b1029000145315"></a>root</strong> directory of the container, the folder can be shared by other containers using the <strong id="en-us_topic_0183243660_b2017581125319"><a name="en-us_topic_0183243660_b2017581125319"></a><a name="en-us_topic_0183243660_b2017581125319"></a>--volumes-from</strong> option. The host directory cannot be mounted to the <strong id="en-us_topic_0183243660_b1057242705318"><a name="en-us_topic_0183243660_b1057242705318"></a><a name="en-us_topic_0183243660_b1057242705318"></a>/proc</strong> subdirectory of the container. Otherwise, an error is reported when the container is started.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row764314134618"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p196438413462"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p196438413462"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p196438413462"></a>--volume-driver</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p19643184184612"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p19643184184612"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p19643184184612"></a>Data volume driver of the container. This parameter is optional.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row429319445461"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p11293204410466"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p11293204410466"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p11293204410466"></a>--volumes-from=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p112931244114612"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p112931244114612"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p112931244114612"></a>Mounts the volume of another container to the current container to share the volume. For example, <strong id="en-us_topic_0183243660_b1369815118497"><a name="en-us_topic_0183243660_b1369815118497"></a><a name="en-us_topic_0183243660_b1369815118497"></a>-volumes-from</strong> <em id="en-us_topic_0183243660_i18200558154914"><a name="en-us_topic_0183243660_i18200558154914"></a><a name="en-us_topic_0183243660_i18200558154914"></a>container_name</em> mounts the volume of <em id="en-us_topic_0183243660_i87451219175019"><a name="en-us_topic_0183243660_i87451219175019"></a><a name="en-us_topic_0183243660_i87451219175019"></a>container_name</em> to the current container. <strong id="en-us_topic_0183243660_b374884513483"><a name="en-us_topic_0183243660_b374884513483"></a><a name="en-us_topic_0183243660_b374884513483"></a>-v</strong> and <strong id="en-us_topic_0183243660_b9969104874819"><a name="en-us_topic_0183243660_b9969104874819"></a><a name="en-us_topic_0183243660_b9969104874819"></a>--volumes-from=[]</strong> are two very important options for data backup and live migration.</p>
</td>
</tr>
<tr id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_row12256348174612"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p925654819460"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p925654819460"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p925654819460"></a>-w, --workdir=""</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1624165744718"><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1624165744718"></a><a name="en-us_topic_0183243660_en-us_topic_0155236887_en-us_topic_0124544921_en-us_topic_0043209392_p1624165744718"></a>Specifies the working directory of the container.</p>
</td>
</tr>
</tbody>
</table>

Example:

Run the following command to create a container named  **busybox**  and run the  **docker start**  command to start the container.

```
$ sudo docker create -ti --name=busybox busybox /bin/bash
```

## diff

Syntax:  **docker diff** _container_

Function: Checks the differences between containers and determines the changes have been made compared with the container creation.

Parameter description: none.

Example:

```
$ sudo docker diff registry
C /root
A /root/.bash_history
A /test
```

  

## exec

Syntax:  **docker exec \[**_options_**\]** _container_ _command_ **\[**_arg..._**\]**

Function: Runs a command in the container.

Parameter description:

**-d**  and  **--detach=false**: Run in the background.

**-i**  and  **--interactive=false**: Keep the STDIN of the container enabled.

**-t**  and  **--tty=false**: Allocate a virtual terminal.

**--privileged**: Executes commands in privilege mode.

**-u**  and  **--user**: Specifies the user name or UID.

Example:

```
$ sudo docker exec -ti exec_test ls
bin  etc   lib	  media  opt   root  sbin  sys	 tmp  var
dev  home  lib64  mnt	 proc  run   srv   test  usr
```

  

## export

Syntax:  **docker export** _container_

Function: Exports the file system content of a container to STDOUT in .tar format.

Parameter description: none.

Example:

Run the following commands to export the contents of the container named  **busybox**  to the  **busybox.tar**  package:

```
$ sudo docker export busybox > busybox.tar
$ ls
busybox.tar 
```

  

## inspect

Syntax:  **docker inspect \[**_options_**\] **_container_**|**_image _**\[**_container_|_image..._**\]**

Function: Returns the underlying information about a container or image.

Parameter description:

**-f**  and  **--format=""**: Output information in a specified format.

**-s**  and  **--size**: Display the total file size of the container when the query type is container.

**--type**: Returns the JSON format of the specified type.

**-t**  and  **--time=120**: Timeout interval, in seconds. If the  **docker inspect**  command fails to be executed within the timeout interval, the system stops waiting and immediately reports an error. The default value is  **120**.

Example:

1.  Run the following command to return information about a container:

    ```
    $ sudo docker inspect busybox_test
    [
        {
            "Id": "9fbb8649d5a8b6ae106bb0ac7686c40b3cbd67ec2fd1ab03e0c419a70d755577",
            "Created": "2019-08-28T07:43:51.27745746Z",
            "Path": "bash",
            "Args": [],
            "State": {
                "Status": "running",
                "Running": true,
                "Paused": false,
                "Restarting": false,
                "OOMKilled": false,
                "Dead": false,
                "Pid": 64177,
                "ExitCode": 0,
                "Error": "",
                "StartedAt": "2019-08-28T07:43:53.021226383Z",
                "FinishedAt": "0001-01-01T00:00:00Z"
            },
    ......
    ```

      

2.  Run the following command to return the specified information of a container in a specified format. The following uses the IP address of the busybox\_test container as an example.

    ```
    $ sudo docker inspect -f {{.NetworkSettings.IPAddress}} busybox_test
    172.17.0.91
    ```


## logs

Syntax:  **docker logs \[**_options_**\]** _container_

Function: Captures logs in a container that is in the  **running**  or  **stopped**  state.

Parameter description:

**-f**  and  **--follow=false**: Print logs in real time.

**-t**  and  **--timestamps=false**: Display the log timestamp.

**--since**: Displays logs generated after the specified time.

**--tail="all"**: Sets the number of lines to be displayed. By default, all lines are displayed.

Example:

1.  Run the following command to check the logs of the jaegertracing container where a jaegertracing service runs:

    ```
    $ sudo docker logs jaegertracing
    {"level":"info","ts":1566979103.3696961,"caller":"healthcheck/handler.go:99","msg":"Health Check server started","http-port":14269,"status":"unavailable"}
    {"level":"info","ts":1566979103.3820567,"caller":"memory/factory.go:55","msg":"Memory storage configuration","configuration":{"MaxTraces":0}}
    {"level":"info","ts":1566979103.390773,"caller":"tchannel/builder.go:94","msg":"Enabling service discovery","service":"jaeger-collector"}
    {"level":"info","ts":1566979103.3908608,"caller":"peerlistmgr/peer_list_mgr.go:111","msg":"Registering active peer","peer":"127.0.0.1:14267"}
    {"level":"info","ts":1566979103.3922884,"caller":"all-in-one/main.go:186","msg":"Starting agent"}
    {"level":"info","ts":1566979103.4047635,"caller":"all-in-one/main.go:226","msg":"Starting jaeger-collector TChannel server","port":14267}
    {"level":"info","ts":1566979103.404901,"caller":"all-in-one/main.go:236","msg":"Starting jaeger-collector HTTP server","http-port":14268}
    {"level":"info","ts":1566979103.4577134,"caller":"all-in-one/main.go:256","msg":"Listening for Zipkin HTTP traffic","zipkin.http-port":9411}
    ```

      

2.  Add  **-f**  to the command to output the logs of the jaegertracing container in real time.

    ```
    $ sudo docker logs -f jaegertracing
    {"level":"info","ts":1566979103.3696961,"caller":"healthcheck/handler.go:99","msg":"Health Check server started","http-port":14269,"status":"unavailable"}
    {"level":"info","ts":1566979103.3820567,"caller":"memory/factory.go:55","msg":"Memory storage configuration","configuration":{"MaxTraces":0}}
    {"level":"info","ts":1566979103.390773,"caller":"tchannel/builder.go:94","msg":"Enabling service discovery","service":"jaeger-collector"}
    {"level":"info","ts":1566979103.3908608,"caller":"peerlistmgr/peer_list_mgr.go:111","msg":"Registering active peer","peer":"127.0.0.1:14267"}
    {"level":"info","ts":1566979103.3922884,"caller":"all-in-one/main.go:186","msg":"Starting agent"}
    ```

      


## pause/unpause

Syntax:  **docker pause** _container_

**docker unpause** _container_

Function: The two commands are used in pairs. The  **docker pause**  command suspends all processes in a container, and the  **docker unpause**  command resumes the suspended processes.

Parameter description: none.

Example:

The following uses a container where the docker registry service runs as an example. After the  **docker pause**  command is executed to pause the process of the container, access of the registry service by running the  **curl**  command is blocked. You can run the  **docker unpause**  command to resume the suspended registry service. The registry service can be accessed by running the  **curl**  command.

1.  Run the following command to start a registry container:

    ```
    $ sudo docker run -d --name pause_test -p 5000:5000 registry
    ```

    Run the  **curl**  command to access the service. Check whether the status code  **200 OK**  is returned.

    ```
    $ sudo curl -v 127.0.0.1:5000
    ```

      

2.  Run the following command to stop the processes in the container:

    ```
    $ sudo docker pause pause_test
    ```

    Run the  **curl**  command to access the service to check whether it is blocked and wait until the service starts.

3.  Run the following command to resume the processes in the container:

    ```
    $ sudo docker unpause pause_test
    ```

    The cURL access in step 2 is restored and the request status code  **200 OK**  is returned.

      


## port

Syntax:  **docker port **_container_ **\[**_private\_port\[/proto\]_**\]**

Function: Lists the port mapping of a container or queries the host port where a specified port resides.

Parameter description: none.

Example:

1.  Run the following command to list all port mappings of a container:

    ```
    $ sudo docker port registry
    5000/tcp -> 0.0.0.0.:5000
    ```

2.  Run the following command to query the mapping of a specified container port:

    ```
    $ sudo docker port registry 5000
    0.0.0.0.:5000
    ```


## ps

Syntax:** docker ps \[**_options_**\]**

Function: Lists containers in different states based on different parameters. If no parameter is added, all running containers are listed.

Parameter description:

**-a**  and  **--all=false**: Display the container.

**-f**  and  **--filter=\[\]**: Filter values. The available options are:  **exited=**_int_  \(exit code of the container\)  **status=**_restarting|running|paused|exited_  \(status code of the container\), for example,  **-f status=running**: lists the running containers.

**-l**  and  **--latest=false**: List the latest created container.

**-n=-1**: Lists the latest created  _n_  containers.

**--no-trunc=false**: Displays all 64-bit container IDs. By default, 12-bit container IDs are displayed.

**-q**  and  **--quiet=false**: Display the container ID.

**-s**  and  **--size=false**: Display the container size.

Example:

1.  Run the following command to lists running containers:

    ```
    $ sudo docker ps
    ```

2.  Run the following command to display all containers:

    ```
    $ sudo docker ps -a
    ```


## rename

Syntax:  **docker rename OLD\_NAME NEW\_NAME**

Function: Renames a container.

Example:

Run the  **docker run**  command to create and start a container, run the  **docker rename**  command to rename the container, and check whether the container name is changed.

```
$ sudo docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
b15976967abb        busybox:latest        "bash"              3 seconds ago       Up 2 seconds                            festive_morse
$ sudo docker rename pedantic_euler new_name
$ sudo docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
b15976967abb        busybox:latest        "bash"              34 seconds ago      Up 33 seconds                           new_name
```

  

## restart

Syntax:  **docker restart \[**_options_**\]** _container_ **\[**_container..._**\]**

Function: Restarts a running container.

Parameter description:

**-t**  and  **--time=10**: Number of seconds to wait for the container to stop before the container is killed. If the container has stopped, restart the container. The default value is  **10**.

Example:

```
$ sudo docker restart busybox
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>During the container restart, if a process in the  **D**  or  **Z**  state exists in the container, the container may fail to be restarted. In this case, you need to analyze the cause of the  **D**  or  **Z**  state of the process in the container. Restart the container after the  **D**  or  **Z**  state of the process in the container is released.  

## rm

Syntax:  **docker rm \[**_options_**\] **_container_ **\[**_container..._**\]**

Function: Deletes one or more containers.

Parameter description:

**-f**  and  **--force=false**: Forcibly delete a running container.

**-l**  and  **--link=false**: Remove the specified link and do not remove the underlying container.

**-v**  and  **--volumes=false**: Remove the volumes associated with the container.

Example:

1.  Run the following command to delete a stopped container:

    ```
    $ sudo docker rm test
    ```

2.  Run the following command to delete a running container:

    ```
    $ sudo docker rm -f rm_test
    ```


## run

Syntax:  **docker run \[**_options_**\] **_image_ **\[**_command_**\] \[**_arg_**...\]**

Function: Creates a container from a specified image \(if the specified image does not exist, an image is downloaded from the official image registry\), starts the container, and runs the specified command in the container. This command integrates the  **docker create**,  **docker start**, and  **docker exec**  commands.

Parameter description: \(The parameters of this command are the same as those of the  **docker create**  command. For details, see the parameter description of the  **docker create**  command. Only the following two parameters are different.\)

**--rm=false**: Specifies the container to be automatically deleted when it exits.

**-v**: Mounts a local directory or an anonymous volume to the container. Note: When a local directory is mounted to a container with a SELinux security label, do not add or delete the local directory at the same time. Otherwise, the security label may not take effect.

**--sig-proxy=true**: Receives proxy of the process signal. SIGCHLD, SIGSTOP, and SIGKILL do not use the proxy.

Example:

Run the busybox image to start a container and run the  **/bin/sh**  command after the container is started:

```
$ sudo docker run -ti busybox /bin/sh
```

## start

Syntax:  **docker start \[**_options_**\]** _container_ **\[**_container_**...\]**

Function: Starts one or more containers that are not running.

Parameter description:

**-a**  and  **--attach=false**: Attach the standard output and error output of a container to STDOUT and STDERR of the host.

**-i**  and  **--interactive=false**: Attach the standard input of the container to the STDIN of the host.

Example:

Run the following command to start a container named  **busybox**  and add the  **-i -a**  to the command to add standard input and output. After the container is started, directly enter the container. You can exist the container by entering  **exit**.

If  **-i -a**  is not added to the command when the container is started, the container is started in the background.

```
$ sudo docker start -i -a busybox
```

## stats

Syntax:  **docker stats \[**_options_**\] \[**_container_**...\]**

Function: Continuously monitors and displays the resource usage of a specified container. \(If no container is specified, the resource usage of all containers is displayed by default.\)

Parameter description:

**-a**, and  **--all**: Display information about all containers. By default, only running containers are displayed.

**--no-stream**: Displays only the first result and does not continuously monitor the result.

Example:

Run the  **docker run**  command to start and create a container, and run the  **docker stats**  command to display the resource usage of the container:

```
$ sudo docker stats
CONTAINER ID        NAME                    CPU %               MEM USAGE / LIMIT     MEM %               NET I/O             BLOCK I/O           PIDS
2e242bcdd682        jaeger                  0.00%               77.08MiB / 125.8GiB   0.06%               42B / 1.23kB        97.9MB / 0B         38
02a06be42b2c        relaxed_chandrasekhar   0.01%               8.609MiB / 125.8GiB   0.01%               0B / 0B             0B / 0B             10
deb9e49fdef1        hardcore_montalcini     0.01%               12.79MiB / 125.8GiB   0.01%               0B / 0B             0B / 0B             9
```

  

## stop

Syntax:  **docker stop \[**_options_**\]** _container_ **\[**_container_**...\]**

Function: Sends a SIGTERM signal to a container and then sends a SIGKILL signal to stop the container after a certain period.

Parameter description:

**-t**  and  **--time=10**: Number of seconds that the system waits for the container to exit before the container is killed. The default value is  **10**.

Example:

```
$ sudo docker stop -t=15 busybox
```

## top

Syntax:  **docker top** _container_ **\[**_ps options_**\]**

Function: Displays the processes running in a container.

Parameter description: none.

Example:

Run the top\_test container and run the  **top**  command in the container.

```
$ sudo docker top top_test
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
root                70045               70028               0                   15:52               pts/0               00:00:00            bash
```

The value of  **PID**  is the PID of the process in the container on the host.

## update

Syntax:  **docker update \[**_options_**\]** _container_ **\[**_container_**...\]**

Function: Hot changes one or more container configurations.

Parameter description:

**Table  1**  Parameter description

<a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_table1239044502210"></a>
<table><thead align="left"><tr id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_row439004518223"><th class="cellrowborder" valign="top" width="32%" id="mcps1.2.3.1.1"><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p19390104532213"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p19390104532213"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p19390104532213"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="68%" id="mcps1.2.3.1.2"><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1039064522216"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1039064522216"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1039064522216"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_row1349192781120"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p2350827111119"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p2350827111119"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p2350827111119"></a>--accel=[]</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p535052711113"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p535052711113"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p535052711113"></a>Configures one or more container accelerators.</p>
</td>
</tr>
<tr id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_row939164522218"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p03911345142218"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p03911345142218"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p03911345142218"></a>--blkio-weight</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1139111453223"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1139111453223"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1139111453223"></a>Relative weight of the container blockio. The value ranges from 10 to 1000.</p>
</td>
</tr>
<tr id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_row339184572217"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p83911445172217"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p83911445172217"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p83911445172217"></a>--cpu-shares</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p3391145132220"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p3391145132220"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p3391145132220"></a>Relative weight of the host CPU obtained by the container. This parameter can be used to obtain a higher priority. By default, all containers obtain the same CPU priority.</p>
</td>
</tr>
<tr id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_row8107726122617"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p51070266260"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p51070266260"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p51070266260"></a>--cpu-period</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p6107926132615"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p6107926132615"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p6107926132615"></a>CPU CFS period.</p>
<p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1869573811136"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1869573811136"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1869573811136"></a>The default value is <strong id="en-us_topic_0183243758_b19154594811"><a name="en-us_topic_0183243758_b19154594811"></a><a name="en-us_topic_0183243758_b19154594811"></a>100</strong> ms. Generally, <strong id="en-us_topic_0183243758_b122332611483"><a name="en-us_topic_0183243758_b122332611483"></a><a name="en-us_topic_0183243758_b122332611483"></a>--cpu-period</strong> and<strong id="en-us_topic_0183243758_b12404898483"><a name="en-us_topic_0183243758_b12404898483"></a><a name="en-us_topic_0183243758_b12404898483"></a> --cpu-quota</strong> are used together. For example, <strong id="en-us_topic_0183243758_b10524141912486"><a name="en-us_topic_0183243758_b10524141912486"></a><a name="en-us_topic_0183243758_b10524141912486"></a>--cpu-period=50000 --cpu-quota=25000</strong> indicates that if there is one CPU, the container can obtain 50% of the CPU every 50 ms.</p>
</td>
</tr>
<tr id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_row5206162817268"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p3206528112617"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p3206528112617"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p3206528112617"></a>--cpu-quota</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p416835333813"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p416835333813"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p416835333813"></a>CPU CFS quota. The default value is <strong id="en-us_topic_0183243758_b185507410487"><a name="en-us_topic_0183243758_b185507410487"></a><a name="en-us_topic_0183243758_b185507410487"></a>0</strong>, indicating that there is no restriction on the quota.</p>
</td>
</tr>
<tr id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_row156458413395"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1264694173910"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1264694173910"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1264694173910"></a>--cpuset-cpus</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p924612309396"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p924612309396"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p924612309396"></a>Number of CPUs (0-3, 0, 1) that can be used by processes in the container. By default, there is no restriction on this parameter.</p>
</td>
</tr>
<tr id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_row2946124394"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p494181216393"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p494181216393"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p494181216393"></a>--cpuset-mems</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p20942126396"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p20942126396"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p20942126396"></a>Memory nodes (0-3, 0, 1) for running processes in the container. This parameter is valid only for the NUMA system.</p>
</td>
</tr>
<tr id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_row125801648161311"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p7581448101317"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p7581448101317"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p7581448101317"></a>--kernel-memory=""</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1858174812134"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1858174812134"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1858174812134"></a>Kernel memory limit of a container. The format is <em id="en-us_topic_0183243758_i1268633713512"><a name="en-us_topic_0183243758_i1268633713512"></a><a name="en-us_topic_0183243758_i1268633713512"></a>number</em><em id="en-us_topic_0183243758_i1020211217526"><a name="en-us_topic_0183243758_i1020211217526"></a><a name="en-us_topic_0183243758_i1020211217526"></a>optional unit</em>, and available units are <strong id="en-us_topic_0183243758_b1484073720529"><a name="en-us_topic_0183243758_b1484073720529"></a><a name="en-us_topic_0183243758_b1484073720529"></a>b</strong>, <strong id="en-us_topic_0183243758_b4836842165213"><a name="en-us_topic_0183243758_b4836842165213"></a><a name="en-us_topic_0183243758_b4836842165213"></a>k</strong>, <strong id="en-us_topic_0183243758_b121113441523"><a name="en-us_topic_0183243758_b121113441523"></a><a name="en-us_topic_0183243758_b121113441523"></a>m</strong>, and <strong id="en-us_topic_0183243758_b17332846145213"><a name="en-us_topic_0183243758_b17332846145213"></a><a name="en-us_topic_0183243758_b17332846145213"></a>g</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_row1469012816412"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p26901688416"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p26901688416"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p26901688416"></a>-m, --memory=""</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1469017824112"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1469017824112"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1469017824112"></a>Memory limit of a container. The format is <em id="en-us_topic_0183243758_i1851712125320"><a name="en-us_topic_0183243758_i1851712125320"></a><a name="en-us_topic_0183243758_i1851712125320"></a>number</em><em id="en-us_topic_0183243758_i18521012165316"><a name="en-us_topic_0183243758_i18521012165316"></a><a name="en-us_topic_0183243758_i18521012165316"></a>optional unit</em>, and available units are <strong id="en-us_topic_0183243758_b285310127531"><a name="en-us_topic_0183243758_b285310127531"></a><a name="en-us_topic_0183243758_b285310127531"></a>b</strong>, <strong id="en-us_topic_0183243758_b16854512165317"><a name="en-us_topic_0183243758_b16854512165317"></a><a name="en-us_topic_0183243758_b16854512165317"></a>k</strong>, <strong id="en-us_topic_0183243758_b0854171214531"><a name="en-us_topic_0183243758_b0854171214531"></a><a name="en-us_topic_0183243758_b0854171214531"></a>m</strong>, and <strong id="en-us_topic_0183243758_b148551712185319"><a name="en-us_topic_0183243758_b148551712185319"></a><a name="en-us_topic_0183243758_b148551712185319"></a>g</strong>. The minimum value of this parameter is <strong id="en-us_topic_0183243758_b132411291533"><a name="en-us_topic_0183243758_b132411291533"></a><a name="en-us_topic_0183243758_b132411291533"></a>4m</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_row1718125964210"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p11811595428"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p11811595428"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p11811595428"></a>--memory-reservation</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p21815598424"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p21815598424"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p21815598424"></a>Container memory limit. The default value is the same as that of <strong id="en-us_topic_0183243758_b175688476536"><a name="en-us_topic_0183243758_b175688476536"></a><a name="en-us_topic_0183243758_b175688476536"></a>--memory</strong>. <strong id="en-us_topic_0183243758_b1551952541"><a name="en-us_topic_0183243758_b1551952541"></a><a name="en-us_topic_0183243758_b1551952541"></a>--memory</strong> is a hard limit, and <strong id="en-us_topic_0183243758_b755210525410"><a name="en-us_topic_0183243758_b755210525410"></a><a name="en-us_topic_0183243758_b755210525410"></a>--memory-reservation</strong> is a soft limit. When the memory usage exceeds the preset value, the memory usage is dynamically adjusted (the system attempts to reduce the memory usage to a value less than the preset value when reclaiming the memory). However, the memory usage may exceed the preset value. Generally, this parameter can be used together with <strong id="en-us_topic_0183243758_b3834868545"><a name="en-us_topic_0183243758_b3834868545"></a><a name="en-us_topic_0183243758_b3834868545"></a>--memory</strong>. The value must be less than the preset value of <strong id="en-us_topic_0183243758_b5835116155414"><a name="en-us_topic_0183243758_b5835116155414"></a><a name="en-us_topic_0183243758_b5835116155414"></a>--memory</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_row13297131204317"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p17297171144317"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p17297171144317"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p17297171144317"></a>--memory-swap</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p20638163719436"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p20638163719436"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p20638163719436"></a>Total usage of the common memory and swap partition. <strong id="en-us_topic_0183243758_b4692183419545"><a name="en-us_topic_0183243758_b4692183419545"></a><a name="en-us_topic_0183243758_b4692183419545"></a>-1</strong> indicates no restriction is set on the usage. If this parameter is not set, the swap partition size is twice the value of <strong id="en-us_topic_0183243758_b29707144558"><a name="en-us_topic_0183243758_b29707144558"></a><a name="en-us_topic_0183243758_b29707144558"></a>--memory</strong>. That is, the swap partition can use the same amount of memory as<strong id="en-us_topic_0183243758_b9872132316553"><a name="en-us_topic_0183243758_b9872132316553"></a><a name="en-us_topic_0183243758_b9872132316553"></a> --memory</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_row15237826153817"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p0237182619382"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p0237182619382"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p0237182619382"></a>--restart=""</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p2345184412396"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p2345184412396"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p2345184412396"></a>Configures restart rule when the container exits. Currently, version 1.3.1 supports the following rules:</p>
<a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_ul17280105917391"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_ul17280105917391"></a><ul id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_ul17280105917391"><li><strong id="en-us_topic_0183243758_b3232137115619"><a name="en-us_topic_0183243758_b3232137115619"></a><a name="en-us_topic_0183243758_b3232137115619"></a>no</strong>: indicates that the container is not restarted when it is stopped.</li><li><strong id="en-us_topic_0183243758_b115642278569"><a name="en-us_topic_0183243758_b115642278569"></a><a name="en-us_topic_0183243758_b115642278569"></a>on-failure</strong>: indicates that the container is restarted when the container exit code is not 0. This rule can be used to add the maximum number of restart times, for example, <strong id="en-us_topic_0183243758_b1830657575"><a name="en-us_topic_0183243758_b1830657575"></a><a name="en-us_topic_0183243758_b1830657575"></a>on-failure:5</strong>, indicating that the container can be restarted for a maximum of five times.</li><li><strong id="en-us_topic_0183243758_b14833133495717"><a name="en-us_topic_0183243758_b14833133495717"></a><a name="en-us_topic_0183243758_b14833133495717"></a>always</strong>: indicates the container is exited regardless of the exit code.</li></ul>
</td>
</tr>
<tr id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_row209473268151"><td class="cellrowborder" valign="top" width="32%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p189474268154"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p189474268154"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p189474268154"></a>--help</p>
</td>
<td class="cellrowborder" valign="top" width="68%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1394720264154"><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1394720264154"></a><a name="en-us_topic_0183243758_en-us_topic_0155237612_en-us_topic_0138971318_p1394720264154"></a>Help information.</p>
</td>
</tr>
</tbody>
</table>

Example:

Run the following command to change the CPU and memory configurations of the container named  **busybox**, including changing the relative weight of the host CPU obtained by the container to  **512**, the CPU cores that can be run by processes in the container to  **0,1,2,3**, and the memory limit for running the container to  **512 m**.

```
$ sudo docker update  --cpu-shares 512  --cpuset-cpus=0,3 --memory 512m ubuntu 
```

## wait

Syntax:  **docker wait** _container_ **\[**_container..._**\]**

Function: Waits for a container to stop and print the exit code of the container:

Parameter description: none.

Example:

Run the following command to start a container named  **busybox**:

```
$ sudo docker start -i -a busybox
```

Run the  **docker wait**  command:

```
$ sudo docker wait busybox
0
```

Wait until the busybox container exits. After the busybox container exits, the exit code  **0**  is displayed.

