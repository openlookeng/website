# Installing the OS<a name="EN-US_TOPIC_0225731123"></a>

## Release Package<a name="section19865103114280"></a>

The following table lists the [openEuler release files](http://repo.openeuler.org/openEuler-20.03-LTS/), including the ISO release package, container image, VM image, and repo source that is used online.

**Table 1**  openEuler release files<a name="table001"></a>

<table>
<thead>
<tr>
	<th>Directory</th>
	<th>Type</th>
	<th>Description</th>
</tr>
</thead>
<tr>
	<td><a href="http://repo.openeuler.org/openEuler-20.03-LTS/ISO/">ISO</a></td>
	<td id="table001row001">ISO release package</td>
	<td>The directory differentiates the ISO release packages for the AArch64, x86, and source, respectively. The details are as follows:
		<ul>
			<li><strong>openEuler-20.03-LTS-aarch64-dvd.iso</strong> and <strong>openEuler-20.03-LTS-x86_64-dvd.iso</strong> are the openEuler basic installation software package ISO files for the AArch64 and x86 architectures, respectively. The ISO files contain basic components running on the openEuler OS and meet the basic requirements of developers.</li>
			<li><strong>openEuler-20.03-LTS-everything-aarch64-dvd.iso</strong> and <strong>openEuler-20.03-LTS-everything-x86_64-dvd.iso</strong> are the openEuler full software package ISO files for the AArch64 and x86 architectures, respectively. In addition to all software in the openEuler basic installation software package, the ISO files also contain the software packages that have been verified in the openEuler community, which meet the advanced requirements of developers.</li>
			<li><strong>openEuler-20.03-LTS-debuginfo-aarch64-dvd.iso</strong> and <strong>openEuler-20.03-LTS-debuginfo-x86_64-dvd.iso</strong> are the openEuler debugging software package ISO files for the AArch64 and x86 architectures, respectively. The ISO files contain the symbol table information required for debugging and are used for debugging software functions and performance.</li>
			<li><strong>openEuler-20.03-LTS-source-dvd.iso</strong> is the ISO file that contains all source code software packages of the openEuler community, which is used offline by developers.</li>
		</ul>
		<div><span class="notetitle">Note:</span>
			<div class="notebody"><p>Each ISO release package has its own verification file, which is used to verify the integrity of the ISO release package.</p></div>
		</div>
	</td>
</tr>
<tr>
	<td><a href="http://repo.openeuler.org/openEuler-20.03-LTS/docker_img/">docker_img</a></td>
	<td id="table001row002">Container image</td>
	<td>The openEuler container image, which provides only the basic bash environment, is used as the basic container image. The directory differentiates the container images for the AArch64 and x86 architectures, respectively.
		<div><span class="notetitle">Note:</span>
			<div class="notebody"><p>Each container image has its own verification file, which is used to verify the integrity of the container image.</p></div>
		</div>
	</td>
</tr>
<tr>
	<td id="table001row003"><a href="http://repo.openeuler.org/openEuler-20.03-LTS/virtual_machine_img/">virtual_machine_img</a></td>
	<td>VM image</td>
	<td><p>The openEuler VM image provides only the basic running environment to shorten the VM deployment time. The directory differentiates the VM images for the AArch64 and x86 architectures, respectively.</p>
		<div><span class="notetitle">说明：</span>
			<div class="notebody">
				<ul>
					<li>The default password of the root user of the VM image is openEuler12#$. Change the password upon the first login.</li>
					<li>Each VM image has its own verification file, which is used to verify the integrity of the VM image.</li>
				</ul>
			</div>
		</div>
	</td>
</tr>
<tr>
	<td><a href="http://repo.openeuler.org/openEuler-20.03-LTS/EPOL/">EPOL</a></td>
	<td rowspan="7" id="table001row004">Repo source</td>
	<td>The repo sources of the openEuler third-party software package are mainly contributed by third parties and communities, and are maintained by the providers. The directory differentiates the repo sources for the AArch64 and x86 architectures, respectively.</td>
</tr>
<tr>
	<td><a href="http://repo.openeuler.org/openEuler-20.03-LTS/OS/">OS</a></td>
	<td>The repo source of the openEuler basic installation software package provides the offline version upgrade function. The content of the software package is the same as that of the basic installation software package ISO in the ISO release package. The directory differentiates the repo sources for the AArch64 and x86 architectures, respectively.</td>
</tr>
<tr>
	<td><a href="http://repo.openeuler.org/openEuler-20.03-LTS/debuginfo/">debuginfo</a></td>
	<td>The repo source of the openEuler debugging software package provides the online download function. The content of the software package is the same as that of the debugging software package ISO in the ISO release package. The directory differentiates the repo sources for the AArch64 and x86 architectures, respectively.</td>
</tr>
<tr>
	<td><a href="http://repo.openeuler.org/openEuler-20.03-LTS/everything/">everything</a></td>
	<td>The repo source of the openEuler full software package provides the online download and version upgrade functions. The content of the software package is the same as that of the full software package ISO in the ISO release package. The directory differentiates the repo sources for the AArch64 and x86 architectures, respectively.</td>
</tr>
<tr>
	<td><a href="http://repo.openeuler.org/openEuler-20.03-LTS/extras/">extras</a></td>
	<td>The repo source of the openEuler extended software package is used to release new software packages with added features. The directory differentiates the repo sources for the AArch64 and x86 architectures, respectively.</td>
</tr>
<tr>
	<td><a href="http://repo.openeuler.org/openEuler-20.03-LTS/source/">source</a></td>
	<td>The repo source of all source code software packages in the openEuler community, which is used online by developers.</td>
</tr>
<tr>
	<td><a href="http://repo.openeuler.org/openEuler-20.03-LTS/update/">update</a></td>
	<td>The repo source of the openEuler upgrade software package, which is used to fix bugs and common vulnerabilities and exposures (CVE) in released versions and to update and release software with enhancements. It provides online download and software upgrade functions. The directory differentiates the repo sources for the AArch64 and x86 architectures, respectively.</td>
</tr>
</table>



## Minimal Hardware Specifications<a name="en-us_topic_0182825778_section1542202114014"></a>

[Table 5](#en-us_topic_0182825778_tff48b99c9bf24b84bb602c53229e2541)  lists the minimum hardware specifications for installing openEuler 20.03 LTS.

**Table  5**  Minimal hardware specifications

<a name="en-us_topic_0182825778_tff48b99c9bf24b84bb602c53229e2541"></a>
<table><thead align="left"><tr id="en-us_topic_0182825778_r36f08b63edea4973a8228200caa2a50b"><th class="cellrowborder" valign="top" width="21.89%" id="mcps1.2.3.1.1"><p id="en-us_topic_0182825778_aef3575d97cdf4dcfb65f8d0c8d2d4a76"><a name="en-us_topic_0182825778_aef3575d97cdf4dcfb65f8d0c8d2d4a76"></a><a name="en-us_topic_0182825778_aef3575d97cdf4dcfb65f8d0c8d2d4a76"></a><strong id="b44837190120"><a name="b44837190120"></a><a name="b44837190120"></a>Component</strong></p>
</th>
<th class="cellrowborder" valign="top" width="78.11%" id="mcps1.2.3.1.2"><p id="en-us_topic_0182825778_a919d3bb266c8432fb33c51fa8f3a4fc3"><a name="en-us_topic_0182825778_a919d3bb266c8432fb33c51fa8f3a4fc3"></a><a name="en-us_topic_0182825778_a919d3bb266c8432fb33c51fa8f3a4fc3"></a><strong id="b1151410222115"><a name="b1151410222115"></a><a name="b1151410222115"></a>Minimal Hardware Specification</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182825778_ra68eff5c33a84bb2be6672a48a643d26"><td class="cellrowborder" valign="top" width="21.89%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0182825778_ac0a50d2069ab444cafff180647772df4"><a name="en-us_topic_0182825778_ac0a50d2069ab444cafff180647772df4"></a><a name="en-us_topic_0182825778_ac0a50d2069ab444cafff180647772df4"></a>CPU</p>
</td>
<td class="cellrowborder" valign="top" width="78.11%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0182825778_p202681030132314"><a name="en-us_topic_0182825778_p202681030132314"></a><a name="en-us_topic_0182825778_p202681030132314"></a>Kunpeng 920 (architecture: AArch64)</p>
<p id="p267183805010"><a name="p267183805010"></a><a name="p267183805010"></a>x86-64 (Skylake or later)</p>
</td>
</tr>
<tr id="en-us_topic_0182825778_rf2a5d43b74894a0882b7c17bdfeb697f"><td class="cellrowborder" valign="top" width="21.89%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0182825778_ad00611ec129a41a9841fb579eece7804"><a name="en-us_topic_0182825778_ad00611ec129a41a9841fb579eece7804"></a><a name="en-us_topic_0182825778_ad00611ec129a41a9841fb579eece7804"></a>Memory</p>
</td>
<td class="cellrowborder" valign="top" width="78.11%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0182825778_a94efe642b8694e5a85747e123b951efc"><a name="en-us_topic_0182825778_a94efe642b8694e5a85747e123b951efc"></a><a name="en-us_topic_0182825778_a94efe642b8694e5a85747e123b951efc"></a>≥ 8 GB</p>
</td>
</tr>
<tr id="en-us_topic_0182825778_rd2c1ebd93ea64e85a5f3fc88dc5ba456"><td class="cellrowborder" valign="top" width="21.89%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0182825778_afd36954546334c1681b5a391bbc386ae"><a name="en-us_topic_0182825778_afd36954546334c1681b5a391bbc386ae"></a><a name="en-us_topic_0182825778_afd36954546334c1681b5a391bbc386ae"></a>Hard disk</p>
</td>
<td class="cellrowborder" valign="top" width="78.11%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0182825778_p1224172312719"><a name="en-us_topic_0182825778_p1224172312719"></a><a name="en-us_topic_0182825778_p1224172312719"></a>≥ 120 GB</p>
</td>
</tr>
</tbody>
</table>

## Hardware Compatibility<a name="section1154104624319"></a>

[Table 6](#en-us_topic_0227922427_table39822012)  lists the typical configurations of servers and components supported by openEuler. openEuler will gradually support other servers in the future. Partners and developers are welcome to participate in the contribution and validation.

**Table  6**  Supported servers and typical configurations

<a name="en-us_topic_0227922427_table39822012"></a>
<table><thead align="left"><tr id="en-us_topic_0227922427_row17270681"><th class="cellrowborder" valign="top" width="8.200820082008201%" id="mcps1.2.6.1.1"><p id="p1239010167198"><a name="p1239010167198"></a><a name="p1239010167198"></a>Vendor</p>
</th>
<th class="cellrowborder" valign="top" width="16.28162816281628%" id="mcps1.2.6.1.2"><p id="en-us_topic_0227922427_p56747887"><a name="en-us_topic_0227922427_p56747887"></a><a name="en-us_topic_0227922427_p56747887"></a>Server</p>
</th>
<th class="cellrowborder" valign="top" width="18.71187118711871%" id="mcps1.2.6.1.3"><p id="en-us_topic_0227922427_p33176134"><a name="en-us_topic_0227922427_p33176134"></a><a name="en-us_topic_0227922427_p33176134"></a>Server Model</p>
</th>
<th class="cellrowborder" valign="top" width="17.211721172117212%" id="mcps1.2.6.1.4"><p id="p19313161314450"><a name="p19313161314450"></a><a name="p19313161314450"></a>Component</p>
</th>
<th class="cellrowborder" valign="top" width="39.59395939593959%" id="mcps1.2.6.1.5"><p id="p183840814519"><a name="p183840814519"></a><a name="p183840814519"></a>Typical Configuration</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0227922427_row7284856"><td class="cellrowborder" rowspan="4" valign="top" width="8.200820082008201%" headers="mcps1.2.6.1.1 "><p id="p111661925121918"><a name="p111661925121918"></a><a name="p111661925121918"></a>Huawei</p>
</td>
<td class="cellrowborder" rowspan="4" valign="top" width="16.28162816281628%" headers="mcps1.2.6.1.2 "><p id="en-us_topic_0227922427_p34571797"><a name="en-us_topic_0227922427_p34571797"></a><a name="en-us_topic_0227922427_p34571797"></a>TaiShan 200</p>
</td>
<td class="cellrowborder" rowspan="4" valign="top" width="18.71187118711871%" headers="mcps1.2.6.1.3 "><p id="en-us_topic_0227922427_p53202458"><a name="en-us_topic_0227922427_p53202458"></a><a name="en-us_topic_0227922427_p53202458"></a>2280 balanced model</p>
</td>
<td class="cellrowborder" valign="top" width="17.211721172117212%" headers="mcps1.2.6.1.4 "><p id="p632634144516"><a name="p632634144516"></a><a name="p632634144516"></a>CPU</p>
</td>
<td class="cellrowborder" valign="top" width="39.59395939593959%" headers="mcps1.2.6.1.5 "><p id="p269564774512"><a name="p269564774512"></a><a name="p269564774512"></a>HiSilicon Kunpeng 920</p>
</td>
</tr>
<tr id="row127460329457"><td class="cellrowborder" valign="top" headers="mcps1.2.6.1.1 "><p id="p7326641174519"><a name="p7326641174519"></a><a name="p7326641174519"></a>Memory</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.6.1.2 "><p id="p4695124774516"><a name="p4695124774516"></a><a name="p4695124774516"></a>32G*4 2933MHz</p>
</td>
</tr>
<tr id="row3713103715458"><td class="cellrowborder" valign="top" headers="mcps1.2.6.1.1 "><p id="p13326114115457"><a name="p13326114115457"></a><a name="p13326114115457"></a>RAID controller card</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.6.1.2 "><p id="p13696154764514"><a name="p13696154764514"></a><a name="p13696154764514"></a>LSI SAS3508</p>
</td>
</tr>
<tr id="row1371312378455"><td class="cellrowborder" valign="top" headers="mcps1.2.6.1.1 "><p id="p732611416456"><a name="p732611416456"></a><a name="p732611416456"></a>Network</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.6.1.2 "><p id="p13696114718455"><a name="p13696114718455"></a><a name="p13696114718455"></a>TM210</p>
</td>
</tr>
<tr id="en-us_topic_0227922427_row36446907"><td class="cellrowborder" rowspan="4" valign="top" width="8.200820082008201%" headers="mcps1.2.6.1.1 "><p id="p1831103919198"><a name="p1831103919198"></a><a name="p1831103919198"></a>Huawei</p>
</td>
<td class="cellrowborder" rowspan="4" valign="top" width="16.28162816281628%" headers="mcps1.2.6.1.2 "><p id="p1245317822418"><a name="p1245317822418"></a><a name="p1245317822418"></a>FusionServer Pro</p>
</td>
<td class="cellrowborder" rowspan="4" valign="top" width="18.71187118711871%" headers="mcps1.2.6.1.3 "><p id="p1345214816241"><a name="p1345214816241"></a><a name="p1345214816241"></a>2288H V5 rack server</p>
</td>
<td class="cellrowborder" valign="top" width="17.211721172117212%" headers="mcps1.2.6.1.4 "><p id="p1235016319467"><a name="p1235016319467"></a><a name="p1235016319467"></a>CPU</p>
</td>
<td class="cellrowborder" valign="top" width="39.59395939593959%" headers="mcps1.2.6.1.5 "><p id="p148932077463"><a name="p148932077463"></a><a name="p148932077463"></a>Intel(R) Xeon(R) Gold 5118 CPU @ 2.30GHz</p>
</td>
</tr>
<tr id="row12326548454"><td class="cellrowborder" valign="top" headers="mcps1.2.6.1.1 "><p id="p1035012313461"><a name="p1035012313461"></a><a name="p1035012313461"></a>Memory</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.6.1.2 "><p id="p13893379461"><a name="p13893379461"></a><a name="p13893379461"></a>32*4 2400MHz</p>
</td>
</tr>
<tr id="row206435916456"><td class="cellrowborder" valign="top" headers="mcps1.2.6.1.1 "><p id="p23509319462"><a name="p23509319462"></a><a name="p23509319462"></a>RAID controller card</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.6.1.2 "><p id="p16893107144611"><a name="p16893107144611"></a><a name="p16893107144611"></a>LSI SAS3508</p>
</td>
</tr>
<tr id="row5647591455"><td class="cellrowborder" valign="top" headers="mcps1.2.6.1.1 "><p id="p1835019312469"><a name="p1835019312469"></a><a name="p1835019312469"></a>Network</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.6.1.2 "><p id="p189318714460"><a name="p189318714460"></a><a name="p189318714460"></a>X722</p>
</td>
</tr>
</tbody>
</table>

