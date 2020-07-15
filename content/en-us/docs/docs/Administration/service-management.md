# Service Management

This topic describes how to manage your operating system and services using the systemd.
<!-- TOC -->

- [Service Management](#service-management)
    - [Introduction to systemd](#introduction-to-systemd)
        - [Systemd Units](#systemd-units)
    - [Features](#features)
        - [Fast Activation](#fast-activation)
        - [On-Demand Activation](#on-demand-activation)
        - [Service Lifecycle Management by Cgroups](#service-lifecycle-management-by-cgroups)
        - [Mount and Automount Point Management](#mount-and-automount-point-management)
        - [Transactional Dependency Management](#transactional-dependency-management)
        - [Compatibility with SysVinit Scripts](#compatibility-with-sysvinit-scripts)
        - [System State Snapshots and System Restoration](#system-state-snapshots-and-system-restoration)
    - [Managing System Services](#managing-system-services)
        - [Comparison Between SysVinit and systemd Commands](#comparison-between-sysvinit-and-systemd-commands)
        - [Listing Services](#listing-services)
        - [Displaying Service Status](#displaying-service-status)
        - [Starting a Service](#starting-a-service)
        - [Stopping a Service](#stopping-a-service)
        - [Restarting a Service](#restarting-a-service)
        - [Enabling a Service](#enabling-a-service)
        - [Disabling a Service](#disabling-a-service)
    - [Changing a Runlevel](#changing-a-runlevel)
        - [Targets and Runlevels](#targets-and-runlevels)
        - [Viewing the Default Startup Target](#viewing-the-default-startup-target)
        - [Viewing All Startup Targets](#viewing-all-startup-targets)
        - [Changing the Default Target](#changing-the-default-target)
        - [Changing the Current Target](#changing-the-current-target)
        - [Changing to Rescue Mode](#changing-to-rescue-mode)
        - [Changing to Emergency Mode](#changing-to-emergency-mode)
    - [Shutting Down, Suspending, and Hibernating the Operating System](#shutting-down-suspending-and-hibernating-the-operating-system)
        - [systemctl Command](#systemctl-command)
        - [Shutting Down the Operating System](#shutting-down-the-operating-system)
        - [Restarting the Operating System](#restarting-the-operating-system)
        - [Suspending the Operating System](#suspending-the-operating-system)
        - [Hibernating the Operating System](#hibernating-the-operating-system)

<!-- /TOC -->


## Introduction to systemd

The systemd is a system and service manager for Linux operating systems. It is designed to be backward compatible with SysV and LSB init scripts, and provides a number of features such as Socket & D-Bus based activation of services, on-demand activation of daemons, system state snapshots, and mount & automount point management. With systemd, the service control logic and parallelization are refined.

### Systemd Units
In systemd, the targets of most actions are units, which are resources systemd know how to manage. Units are categorized by the type of resources they represent and defined in unit configuration files. For example, the avahi.service unit represents the Avahi daemon and is defined in the  **avahi.service**  file.  [Table 1](#en-us_topic_0151921012_t2dcb6d973cc249ed9ccd56729751ca6b)  lists available types of systemd units.

**Table  1**  Available types of systemd units

<a name="en-us_topic_0151921012_t2dcb6d973cc249ed9ccd56729751ca6b"></a>
<table><thead align="left"><tr id="en-us_topic_0151921012_r7b42846c4fae43e7884a3f020f608fe2"><th class="cellrowborder" valign="top" width="23.18%" id="mcps1.2.4.1.1"><p id="en-us_topic_0151921012_ab281691f1f2b4cc1bbe493047d2362d9"><a name="en-us_topic_0151921012_ab281691f1f2b4cc1bbe493047d2362d9"></a><a name="en-us_topic_0151921012_ab281691f1f2b4cc1bbe493047d2362d9"></a>Unit Type</p>
</th>
<th class="cellrowborder" valign="top" width="20.36%" id="mcps1.2.4.1.2"><p id="en-us_topic_0151921012_a0f7c1823e26547e796c1641f97c33fdd"><a name="en-us_topic_0151921012_a0f7c1823e26547e796c1641f97c33fdd"></a><a name="en-us_topic_0151921012_a0f7c1823e26547e796c1641f97c33fdd"></a>File Extension</p>
</th>
<th class="cellrowborder" valign="top" width="56.46%" id="mcps1.2.4.1.3"><p id="en-us_topic_0151921012_a60a2db60a7044830b7484a6acc33be0e"><a name="en-us_topic_0151921012_a60a2db60a7044830b7484a6acc33be0e"></a><a name="en-us_topic_0151921012_a60a2db60a7044830b7484a6acc33be0e"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0151921012_r792e4f30a76a4d1a87472bf69f4208ab"><td class="cellrowborder" valign="top" width="23.18%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151921012_a920c3978e086448eab26a0c108b3fc4b"><a name="en-us_topic_0151921012_a920c3978e086448eab26a0c108b3fc4b"></a><a name="en-us_topic_0151921012_a920c3978e086448eab26a0c108b3fc4b"></a>Service unit</p>
</td>
<td class="cellrowborder" valign="top" width="20.36%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151921012_ab53b8d9e50b3496f9c42ac71130179a8"><a name="en-us_topic_0151921012_ab53b8d9e50b3496f9c42ac71130179a8"></a><a name="en-us_topic_0151921012_ab53b8d9e50b3496f9c42ac71130179a8"></a>.service</p>
</td>
<td class="cellrowborder" valign="top" width="56.46%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151921012_a4021f8a9f8ac44889df66eb405ba8707"><a name="en-us_topic_0151921012_a4021f8a9f8ac44889df66eb405ba8707"></a><a name="en-us_topic_0151921012_a4021f8a9f8ac44889df66eb405ba8707"></a>A system service.</p>
</td>
</tr>
<tr id="en-us_topic_0151921012_r1dc46642b82640b8ba50c274a71c0115"><td class="cellrowborder" valign="top" width="23.18%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151921012_acc7293f71641476d866484f4b4e2e17d"><a name="en-us_topic_0151921012_acc7293f71641476d866484f4b4e2e17d"></a><a name="en-us_topic_0151921012_acc7293f71641476d866484f4b4e2e17d"></a>Target unit</p>
</td>
<td class="cellrowborder" valign="top" width="20.36%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151921012_a972c16ba24e44039a202a8a8b500cf0d"><a name="en-us_topic_0151921012_a972c16ba24e44039a202a8a8b500cf0d"></a><a name="en-us_topic_0151921012_a972c16ba24e44039a202a8a8b500cf0d"></a>.target</p>
</td>
<td class="cellrowborder" valign="top" width="56.46%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151921012_a794b9638ea42413087672632eb3ecc9b"><a name="en-us_topic_0151921012_a794b9638ea42413087672632eb3ecc9b"></a><a name="en-us_topic_0151921012_a794b9638ea42413087672632eb3ecc9b"></a>A group of systemd units.</p>
</td>
</tr>
<tr id="en-us_topic_0151921012_rf862dcc0891e4292b214e743020fad44"><td class="cellrowborder" valign="top" width="23.18%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151921012_aa36d2a004680460eb77cd61abfda11ff"><a name="en-us_topic_0151921012_aa36d2a004680460eb77cd61abfda11ff"></a><a name="en-us_topic_0151921012_aa36d2a004680460eb77cd61abfda11ff"></a>Automount unit</p>
</td>
<td class="cellrowborder" valign="top" width="20.36%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151921012_aea349872c8b64346aca1fd99b220ade4"><a name="en-us_topic_0151921012_aea349872c8b64346aca1fd99b220ade4"></a><a name="en-us_topic_0151921012_aea349872c8b64346aca1fd99b220ade4"></a>.automount</p>
</td>
<td class="cellrowborder" valign="top" width="56.46%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151921012_a2752debc211c4c2a8d2dec5df410cd5f"><a name="en-us_topic_0151921012_a2752debc211c4c2a8d2dec5df410cd5f"></a><a name="en-us_topic_0151921012_a2752debc211c4c2a8d2dec5df410cd5f"></a>A file system automount point.</p>
</td>
</tr>
<tr id="en-us_topic_0151921012_r151262203bbd41dfbcf6450b977adcd8"><td class="cellrowborder" valign="top" width="23.18%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151921012_a63ad759ddc924457ae160f5ef2134665"><a name="en-us_topic_0151921012_a63ad759ddc924457ae160f5ef2134665"></a><a name="en-us_topic_0151921012_a63ad759ddc924457ae160f5ef2134665"></a>Device unit</p>
</td>
<td class="cellrowborder" valign="top" width="20.36%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151921012_a1d72eda1c2e14a5ca5b4bbd3d1e04df2"><a name="en-us_topic_0151921012_a1d72eda1c2e14a5ca5b4bbd3d1e04df2"></a><a name="en-us_topic_0151921012_a1d72eda1c2e14a5ca5b4bbd3d1e04df2"></a>.device</p>
</td>
<td class="cellrowborder" valign="top" width="56.46%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151921012_a17fb3dcba5df47e9bd6dcadb1fdd0570"><a name="en-us_topic_0151921012_a17fb3dcba5df47e9bd6dcadb1fdd0570"></a><a name="en-us_topic_0151921012_a17fb3dcba5df47e9bd6dcadb1fdd0570"></a>A device file recognized by the kernel.</p>
</td>
</tr>
<tr id="en-us_topic_0151921012_re7d8c6541280475e900e3b336b9af327"><td class="cellrowborder" valign="top" width="23.18%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151921012_a4950ed734138459c83be23229b5f3d6a"><a name="en-us_topic_0151921012_a4950ed734138459c83be23229b5f3d6a"></a><a name="en-us_topic_0151921012_a4950ed734138459c83be23229b5f3d6a"></a>Mount unit</p>
</td>
<td class="cellrowborder" valign="top" width="20.36%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151921012_ab745de23d809475d9c5c9e20e81066d1"><a name="en-us_topic_0151921012_ab745de23d809475d9c5c9e20e81066d1"></a><a name="en-us_topic_0151921012_ab745de23d809475d9c5c9e20e81066d1"></a>.mount</p>
</td>
<td class="cellrowborder" valign="top" width="56.46%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151921012_a689c3d6fa3124b61af6546d7ff4e5f42"><a name="en-us_topic_0151921012_a689c3d6fa3124b61af6546d7ff4e5f42"></a><a name="en-us_topic_0151921012_a689c3d6fa3124b61af6546d7ff4e5f42"></a>A file system mount point.</p>
</td>
</tr>
<tr id="en-us_topic_0151921012_r1c9abcac0409405390c79d039efd1f73"><td class="cellrowborder" valign="top" width="23.18%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151921012_a105f139cb99a424ebf6668c409fbfd10"><a name="en-us_topic_0151921012_a105f139cb99a424ebf6668c409fbfd10"></a><a name="en-us_topic_0151921012_a105f139cb99a424ebf6668c409fbfd10"></a>Path unit</p>
</td>
<td class="cellrowborder" valign="top" width="20.36%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151921012_af1454bde836a4118b58341b586e1770a"><a name="en-us_topic_0151921012_af1454bde836a4118b58341b586e1770a"></a><a name="en-us_topic_0151921012_af1454bde836a4118b58341b586e1770a"></a>.path</p>
</td>
<td class="cellrowborder" valign="top" width="56.46%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151921012_ace9baa2479c64f97abb493519474df4d"><a name="en-us_topic_0151921012_ace9baa2479c64f97abb493519474df4d"></a><a name="en-us_topic_0151921012_ace9baa2479c64f97abb493519474df4d"></a>A file or directory in a file system.</p>
</td>
</tr>
<tr id="en-us_topic_0151921012_r110ad4c541c241ac816e2827ef85c035"><td class="cellrowborder" valign="top" width="23.18%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151921012_aaa9d61a1976b4c399f8d26feee1f8a9a"><a name="en-us_topic_0151921012_aaa9d61a1976b4c399f8d26feee1f8a9a"></a><a name="en-us_topic_0151921012_aaa9d61a1976b4c399f8d26feee1f8a9a"></a>Scope unit</p>
</td>
<td class="cellrowborder" valign="top" width="20.36%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151921012_ad16b81af817345d3822330091c783398"><a name="en-us_topic_0151921012_ad16b81af817345d3822330091c783398"></a><a name="en-us_topic_0151921012_ad16b81af817345d3822330091c783398"></a>.scope</p>
</td>
<td class="cellrowborder" valign="top" width="56.46%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151921012_a4c7749fd392348668a0cb1b25cbac70d"><a name="en-us_topic_0151921012_a4c7749fd392348668a0cb1b25cbac70d"></a><a name="en-us_topic_0151921012_a4c7749fd392348668a0cb1b25cbac70d"></a>An externally created process.</p>
</td>
</tr>
<tr id="en-us_topic_0151921012_r6f7302c1ed8244e291ffa0ae08a3b27c"><td class="cellrowborder" valign="top" width="23.18%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151921012_ab41ebb369a5c47598601bd96ca5d95af"><a name="en-us_topic_0151921012_ab41ebb369a5c47598601bd96ca5d95af"></a><a name="en-us_topic_0151921012_ab41ebb369a5c47598601bd96ca5d95af"></a>Slice unit</p>
</td>
<td class="cellrowborder" valign="top" width="20.36%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151921012_a18c465ebe76c4ffb8950064ee9a62858"><a name="en-us_topic_0151921012_a18c465ebe76c4ffb8950064ee9a62858"></a><a name="en-us_topic_0151921012_a18c465ebe76c4ffb8950064ee9a62858"></a>.slice</p>
</td>
<td class="cellrowborder" valign="top" width="56.46%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151921012_a060e385703ed49a0bbb993f60520a6dd"><a name="en-us_topic_0151921012_a060e385703ed49a0bbb993f60520a6dd"></a><a name="en-us_topic_0151921012_a060e385703ed49a0bbb993f60520a6dd"></a>A group of hierarchically organized units that manage system processes.</p>
</td>
</tr>
<tr id="en-us_topic_0151921012_r464fbcf4d5b04ed29b11f52b150531ab"><td class="cellrowborder" valign="top" width="23.18%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151921012_a8c0ed4656ebb4a10b1fcbce2ce396683"><a name="en-us_topic_0151921012_a8c0ed4656ebb4a10b1fcbce2ce396683"></a><a name="en-us_topic_0151921012_a8c0ed4656ebb4a10b1fcbce2ce396683"></a>Snapshot unit</p>
</td>
<td class="cellrowborder" valign="top" width="20.36%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151921012_a2815b0c797784a9e95de60f614a683a7"><a name="en-us_topic_0151921012_a2815b0c797784a9e95de60f614a683a7"></a><a name="en-us_topic_0151921012_a2815b0c797784a9e95de60f614a683a7"></a>.snapshot</p>
</td>
<td class="cellrowborder" valign="top" width="56.46%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151921012_adf4318e96e0d47efbad6c438a124d924"><a name="en-us_topic_0151921012_adf4318e96e0d47efbad6c438a124d924"></a><a name="en-us_topic_0151921012_adf4318e96e0d47efbad6c438a124d924"></a>A saved state of the systemd manager.</p>
</td>
</tr>
<tr id="en-us_topic_0151921012_rf411a13d70a64af0913d1403098c35f4"><td class="cellrowborder" valign="top" width="23.18%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151921012_a20f3e23c829a4337a8fb5fc64b628fda"><a name="en-us_topic_0151921012_a20f3e23c829a4337a8fb5fc64b628fda"></a><a name="en-us_topic_0151921012_a20f3e23c829a4337a8fb5fc64b628fda"></a>Socket unit</p>
</td>
<td class="cellrowborder" valign="top" width="20.36%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151921012_a4dde23a95c7f49649608dea395226e51"><a name="en-us_topic_0151921012_a4dde23a95c7f49649608dea395226e51"></a><a name="en-us_topic_0151921012_a4dde23a95c7f49649608dea395226e51"></a>.socket</p>
</td>
<td class="cellrowborder" valign="top" width="56.46%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151921012_a0b30893d3da240388885a50af44269db"><a name="en-us_topic_0151921012_a0b30893d3da240388885a50af44269db"></a><a name="en-us_topic_0151921012_a0b30893d3da240388885a50af44269db"></a>An inter-process communication socket.</p>
</td>
</tr>
<tr id="en-us_topic_0151921012_r954b0bbd2609438ca1ecc49402117695"><td class="cellrowborder" valign="top" width="23.18%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151921012_a2e0d25e939104ff5a1c3f79c5285689f"><a name="en-us_topic_0151921012_a2e0d25e939104ff5a1c3f79c5285689f"></a><a name="en-us_topic_0151921012_a2e0d25e939104ff5a1c3f79c5285689f"></a>Swap unit</p>
</td>
<td class="cellrowborder" valign="top" width="20.36%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151921012_af7250fd0df504b6db1ae83ea22ad4dc3"><a name="en-us_topic_0151921012_af7250fd0df504b6db1ae83ea22ad4dc3"></a><a name="en-us_topic_0151921012_af7250fd0df504b6db1ae83ea22ad4dc3"></a>.swap</p>
</td>
<td class="cellrowborder" valign="top" width="56.46%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151921012_aed1f0dc1800f457d9271ab272aaf9019"><a name="en-us_topic_0151921012_aed1f0dc1800f457d9271ab272aaf9019"></a><a name="en-us_topic_0151921012_aed1f0dc1800f457d9271ab272aaf9019"></a>A swap device or a swap file.</p>
</td>
</tr>
<tr id="en-us_topic_0151921012_r27a40c4c1d7b4c74ac4913185f408b22"><td class="cellrowborder" valign="top" width="23.18%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151921012_aec67b2a244f843f59fda49a59083ecd8"><a name="en-us_topic_0151921012_aec67b2a244f843f59fda49a59083ecd8"></a><a name="en-us_topic_0151921012_aec67b2a244f843f59fda49a59083ecd8"></a>Timer unit</p>
</td>
<td class="cellrowborder" valign="top" width="20.36%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151921012_a0890a8d257014b609f9609b7d64d1535"><a name="en-us_topic_0151921012_a0890a8d257014b609f9609b7d64d1535"></a><a name="en-us_topic_0151921012_a0890a8d257014b609f9609b7d64d1535"></a>.timer</p>
</td>
<td class="cellrowborder" valign="top" width="56.46%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151921012_a907849cda16f459b9c50d4b58324ec7d"><a name="en-us_topic_0151921012_a907849cda16f459b9c50d4b58324ec7d"></a><a name="en-us_topic_0151921012_a907849cda16f459b9c50d4b58324ec7d"></a>A systemd timer.</p>
</td>
</tr>
</tbody>
</table>

All available types of systemd units are located in one of the following directories listed in  [Table 2](#en-us_topic_0151921012_t2523a0a9a0c54f9b849e52d1efa0160c).

**Table  2**  Locations of available systemd units

<a name="en-us_topic_0151921012_t2523a0a9a0c54f9b849e52d1efa0160c"></a>
<table><thead align="left"><tr id="en-us_topic_0151921012_r213bb3b501954621bfa006ab9ddfbd62"><th class="cellrowborder" valign="top" width="32.33%" id="mcps1.2.3.1.1"><p id="en-us_topic_0151921012_afce39246edb84dd7a9aa40dff9b8c7e3"><a name="en-us_topic_0151921012_afce39246edb84dd7a9aa40dff9b8c7e3"></a><a name="en-us_topic_0151921012_afce39246edb84dd7a9aa40dff9b8c7e3"></a>Directory</p>
</th>
<th class="cellrowborder" valign="top" width="67.67%" id="mcps1.2.3.1.2"><p id="en-us_topic_0151921012_abebe174b3f9c4ff4b28270e3f1907b5b"><a name="en-us_topic_0151921012_abebe174b3f9c4ff4b28270e3f1907b5b"></a><a name="en-us_topic_0151921012_abebe174b3f9c4ff4b28270e3f1907b5b"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0151921012_rcae60499dc8540328df0a6bf543aaafa"><td class="cellrowborder" valign="top" width="32.33%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151921012_a7f7f73f64b3d4294a2f717f5a5dedd1c"><a name="en-us_topic_0151921012_a7f7f73f64b3d4294a2f717f5a5dedd1c"></a><a name="en-us_topic_0151921012_a7f7f73f64b3d4294a2f717f5a5dedd1c"></a>/usr/lib/systemd/system/</p>
</td>
<td class="cellrowborder" valign="top" width="67.67%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151921012_af3744f8424524c1c864a7ff18092079d"><a name="en-us_topic_0151921012_af3744f8424524c1c864a7ff18092079d"></a><a name="en-us_topic_0151921012_af3744f8424524c1c864a7ff18092079d"></a>Systemd units distributed with installed RPM packages.</p>
</td>
</tr>
<tr id="en-us_topic_0151921012_r381a8939b45e4b419479c02bf07f0cd7"><td class="cellrowborder" valign="top" width="32.33%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151921012_aabacb836c0fa4f6f96476ff465870cd0"><a name="en-us_topic_0151921012_aabacb836c0fa4f6f96476ff465870cd0"></a><a name="en-us_topic_0151921012_aabacb836c0fa4f6f96476ff465870cd0"></a>/run/systemd/system/</p>
</td>
<td class="cellrowborder" valign="top" width="67.67%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151921012_a2edec0a6cd0741a0b8b067d9f9c33b98"><a name="en-us_topic_0151921012_a2edec0a6cd0741a0b8b067d9f9c33b98"></a><a name="en-us_topic_0151921012_a2edec0a6cd0741a0b8b067d9f9c33b98"></a>Systemd units created at runtime.</p>
</td>
</tr>
<tr id="en-us_topic_0151921012_rc0974b74cedf4b5ba85d1347bb553c14"><td class="cellrowborder" valign="top" width="32.33%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151921012_a54ab3b765b2c4590a35494886586dcc3"><a name="en-us_topic_0151921012_a54ab3b765b2c4590a35494886586dcc3"></a><a name="en-us_topic_0151921012_a54ab3b765b2c4590a35494886586dcc3"></a>/etc/systemd/system/</p>
</td>
<td class="cellrowborder" valign="top" width="67.67%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151921012_a9fc8f932d4ff4ba4b6c0469219073cb4"><a name="en-us_topic_0151921012_a9fc8f932d4ff4ba4b6c0469219073cb4"></a><a name="en-us_topic_0151921012_a9fc8f932d4ff4ba4b6c0469219073cb4"></a>Systemd units created and managed by the system administrator.</p>
</td>
</tr>
</tbody>
</table>

## Features

### Fast Activation
The systemd provides more aggressive parallelization than UpStart. The use of Socket- and D-Bus based activation reduces the time required to boot the operating system.

To accelerate system boot, systemd seeks to:

-   Activate only the necessary processes
-   Activate as many processes as possible in parallel

### On-Demand Activation
During SysVinit initialization, it activates all the possible background service processes that might be used. Users can log in only after all these service processes are activated. The drawbacks in SysVinit are obvious: slow system boot and a waste of system resources.

Some services may rarely or even never be used during system runtime. For example, CUPS, printing services are rarely used on most servers. SSHD is rarely accessed on many servers. It is unnecessary to spend time on starting these services and system resources.

systemd can only be activated when a service is requested. If the service request is over, systemd stops.

### Service Lifecycle Management by Cgroups
An important role of an init system is to track and manage the lifecycle of services. It can start and stop a service. However, it is more difficult than you could ever imagine to encode an init system into stopping services.

Service processes often run in background as daemons and sometimes fork twice. In UpStart, the expect stanza in the configuration file must be correctly configured. Otherwise, UpStart is unable to learn a daemon's PID by counting the number of forks. 

Things are made simpler with Cgroups, which have long been used to manage system resource quotas. The ease of use comes largely from its file-system-like user interface. When a parent service creates a child service, the latter inherits all attributes of the Cgroup to which the parent service belongs. This means that all relevant services are put into the same Cgroup. The systemd can find the PIDs of all relevant services simply by traversing their control group and then stop them one by one.

### Mount and Automount Point Management
In traditional Linux systems, users can use the  **/etc/fstab**  file to maintain fixed file system mount points. These mount points are automatically mounted during system startup. Once the startup is complete, these mount points are available. These mount points are file systems critical to system running, such as the  **HOME**  directory. Like SysVinit, systemd manages these mount points so that they can be automatically mounted at system startup. systemd is also compatible with the  **/etc/fstab**  file. You can continue to use this file to manage mount points.

There are times when you need to mount or unmount on demand. For example, a temporary mounting point is required for you to access the DVD content, and the mounting point is canceled \(using the  **umount**  command\) if you no longer need to access the content, thereby saving resources. This is traditionally achieved using the autofs service.

The systemd allows automatic mount without a need to install autofs.

### Transactional Dependency Management
System boot involves a host of separate jobs, some of which may be dependent on each other. For example, a network file system \(NFS\) can be mounted only after network connectivity is activated. The systemd can run a large number of dependent jobs in parallel, but not all of them. Looking back to the NFS example, it is impossible to mount NFS and activate network at the same time. Before running a job, systemd calculates its dependencies, creates a temporary transaction, and verifies that this transaction is consistent \(all relevant services can be activated without any dependency on each other\).

### Compatibility with SysVinit Scripts
Like UpStart, systemd introduces new configuration methods and has new requirements for application development. If you want to replace the currently running initialization system with systemd, systemd must be compatible with the existing program. It is difficult to modify all the service code in any Linux distribution in a short time for the purpose of using systemd.

The systemd provides features compatible with SysVinit and LSB initscripts. You do not need to modify the existing services and processes in the system. This reduces the cost of migrating the system to systemd, making it possible for users to replace the existing initialization system with systemd.

### System State Snapshots and System Restoration
The systemd can be started on demand. Therefore, the running status of the system changes dynamically, and you cannot know the specific services that are running in the system. systemd snapshots enable the current system running status to be saved and restored.

For example, if services A and B are running in the system, you can run the  **systemd**  command to create a snapshot for the current system running status. Then stop process A or make any other change to the system, for example, starting process C. After these changes, run the snapshot restoration command of systemd to restore the system to the point at which the snapshot was taken. That is, only services A and B are running. A possible application scenario is debugging. For example, when an exception occurs on the server, a user saves the current status as a snapshot for debugging, and then perform any operation, for example, stopping the service. After the debugging is complete, restore the snapshot.

## Managing System Services

The systemd provides the systemctl command to start, stop, restart, view, enable, and disable system services.

### Comparison Between SysVinit and systemd Commands
The  **systemctl**  command from the  **systemd**  command has the functions similar to the  **SysVinit**  command. Note that the  **service**  and  **chkconfig**  commands are supported in this version. For details, see  [Table 3](#en-us_topic_0151920917_ta7039963b0c74b909b72c22cbc9f2e28). You are advised to manage system services by running the  **systemctl**  command.

**Table  3**  Comparison between SysVinit and systemd commands

<a name="en-us_topic_0151920917_ta7039963b0c74b909b72c22cbc9f2e28"></a>
<table><thead align="left"><tr id="en-us_topic_0151920917_rfd1d35347f514aad968791e4f806aeae"><th class="cellrowborder" valign="top" width="30%" id="mcps1.2.4.1.1"><p id="en-us_topic_0151920917_a28f83d4ce4004293a41179a86a5498d6"><a name="en-us_topic_0151920917_a28f83d4ce4004293a41179a86a5498d6"></a><a name="en-us_topic_0151920917_a28f83d4ce4004293a41179a86a5498d6"></a>SysVinit Command</p>
</th>
<th class="cellrowborder" valign="top" width="37%" id="mcps1.2.4.1.2"><p id="en-us_topic_0151920917_a3e59af7c25ab4c08b96205eebd7df00c"><a name="en-us_topic_0151920917_a3e59af7c25ab4c08b96205eebd7df00c"></a><a name="en-us_topic_0151920917_a3e59af7c25ab4c08b96205eebd7df00c"></a>systemd Command</p>
</th>
<th class="cellrowborder" valign="top" width="33%" id="mcps1.2.4.1.3"><p id="en-us_topic_0151920917_a045311be27aa4014afbe4159033e3ac2"><a name="en-us_topic_0151920917_a045311be27aa4014afbe4159033e3ac2"></a><a name="en-us_topic_0151920917_a045311be27aa4014afbe4159033e3ac2"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0151920917_r2de0ab9c58c14fbb9df4fb27b6b2a6cb"><td class="cellrowborder" valign="top" width="30%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920917_a5a2e2e920ad842969ba0cfae30934767"><a name="en-us_topic_0151920917_a5a2e2e920ad842969ba0cfae30934767"></a><a name="en-us_topic_0151920917_a5a2e2e920ad842969ba0cfae30934767"></a>service <em id="i25691814141714"><a name="i25691814141714"></a><a name="i25691814141714"></a>network</em> start</p>
</td>
<td class="cellrowborder" valign="top" width="37%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920917_a0990a28043f244f3a7c63159310ea5fc"><a name="en-us_topic_0151920917_a0990a28043f244f3a7c63159310ea5fc"></a><a name="en-us_topic_0151920917_a0990a28043f244f3a7c63159310ea5fc"></a>systemctl start <em id="i1147010194173"><a name="i1147010194173"></a><a name="i1147010194173"></a>network</em>.service</p>
</td>
<td class="cellrowborder" valign="top" width="33%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920917_a6f87a02ac1cb4b37845b6a91ba35eb02"><a name="en-us_topic_0151920917_a6f87a02ac1cb4b37845b6a91ba35eb02"></a><a name="en-us_topic_0151920917_a6f87a02ac1cb4b37845b6a91ba35eb02"></a>Starts a service.</p>
</td>
</tr>
<tr id="en-us_topic_0151920917_r234d52fbaf2744e58e62737f22a62ee9"><td class="cellrowborder" valign="top" width="30%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920917_a4d1be5b113c748b5a81a5898138d28d8"><a name="en-us_topic_0151920917_a4d1be5b113c748b5a81a5898138d28d8"></a><a name="en-us_topic_0151920917_a4d1be5b113c748b5a81a5898138d28d8"></a>service <em id="i76031221191716"><a name="i76031221191716"></a><a name="i76031221191716"></a>network</em> stop</p>
</td>
<td class="cellrowborder" valign="top" width="37%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920917_a44b1659e2bfd463da45b05e17f4d6021"><a name="en-us_topic_0151920917_a44b1659e2bfd463da45b05e17f4d6021"></a><a name="en-us_topic_0151920917_a44b1659e2bfd463da45b05e17f4d6021"></a>systemctl stop <em id="i1176117234177"><a name="i1176117234177"></a><a name="i1176117234177"></a>network</em>.service</p>
</td>
<td class="cellrowborder" valign="top" width="33%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920917_afada400adfde455aafcf5f45494e85cf"><a name="en-us_topic_0151920917_afada400adfde455aafcf5f45494e85cf"></a><a name="en-us_topic_0151920917_afada400adfde455aafcf5f45494e85cf"></a>Stops a service.</p>
</td>
</tr>
<tr id="en-us_topic_0151920917_r7954bf07d8b24964a6fd9d102c0fbda8"><td class="cellrowborder" valign="top" width="30%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920917_a7bcda643db174a779968a5ae5a9f7c18"><a name="en-us_topic_0151920917_a7bcda643db174a779968a5ae5a9f7c18"></a><a name="en-us_topic_0151920917_a7bcda643db174a779968a5ae5a9f7c18"></a>service <em id="i314182613171"><a name="i314182613171"></a><a name="i314182613171"></a>network</em> restart</p>
</td>
<td class="cellrowborder" valign="top" width="37%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920917_ac4319fcaf27b4960acc4025be401420d"><a name="en-us_topic_0151920917_ac4319fcaf27b4960acc4025be401420d"></a><a name="en-us_topic_0151920917_ac4319fcaf27b4960acc4025be401420d"></a>systemctl restart <em id="i2763627191712"><a name="i2763627191712"></a><a name="i2763627191712"></a>network</em>.service</p>
</td>
<td class="cellrowborder" valign="top" width="33%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920917_a2b544d2a4b744822a7371b4c2d302fcd"><a name="en-us_topic_0151920917_a2b544d2a4b744822a7371b4c2d302fcd"></a><a name="en-us_topic_0151920917_a2b544d2a4b744822a7371b4c2d302fcd"></a>Restarts a service.</p>
</td>
</tr>
<tr id="en-us_topic_0151920917_r5fb05eeabf4743f6b95858329d896d77"><td class="cellrowborder" valign="top" width="30%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920917_ab4f282845e28411e8f96b6186b6db84b"><a name="en-us_topic_0151920917_ab4f282845e28411e8f96b6186b6db84b"></a><a name="en-us_topic_0151920917_ab4f282845e28411e8f96b6186b6db84b"></a>service <em id="i5183203114173"><a name="i5183203114173"></a><a name="i5183203114173"></a>network</em> reload</p>
</td>
<td class="cellrowborder" valign="top" width="37%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920917_abf350ef96d69405cae647284bfcf4ce2"><a name="en-us_topic_0151920917_abf350ef96d69405cae647284bfcf4ce2"></a><a name="en-us_topic_0151920917_abf350ef96d69405cae647284bfcf4ce2"></a>systemctl reload <em id="i8989468178"><a name="i8989468178"></a><a name="i8989468178"></a>network</em>.service</p>
</td>
<td class="cellrowborder" valign="top" width="33%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920917_acf06a1fd807d49a796e2064a403448e1"><a name="en-us_topic_0151920917_acf06a1fd807d49a796e2064a403448e1"></a><a name="en-us_topic_0151920917_acf06a1fd807d49a796e2064a403448e1"></a>Reloads a configuration file without interrupting an operation.</p>
</td>
</tr>
<tr id="en-us_topic_0151920917_rd496143bec874f7b943e64194f84f21e"><td class="cellrowborder" valign="top" width="30%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920917_ac09908e607dc41be9ca836fcc1239f84"><a name="en-us_topic_0151920917_ac09908e607dc41be9ca836fcc1239f84"></a><a name="en-us_topic_0151920917_ac09908e607dc41be9ca836fcc1239f84"></a>service <em id="i8594125511173"><a name="i8594125511173"></a><a name="i8594125511173"></a>network</em> condrestart</p>
</td>
<td class="cellrowborder" valign="top" width="37%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920917_af07ff7e0d19e4be2b48478bb7bc8d598"><a name="en-us_topic_0151920917_af07ff7e0d19e4be2b48478bb7bc8d598"></a><a name="en-us_topic_0151920917_af07ff7e0d19e4be2b48478bb7bc8d598"></a>systemctl condrestart <em id="i1862127131818"><a name="i1862127131818"></a><a name="i1862127131818"></a>network</em>.service</p>
</td>
<td class="cellrowborder" valign="top" width="33%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920917_a7bdfc64d030a4b42bd585516423597c2"><a name="en-us_topic_0151920917_a7bdfc64d030a4b42bd585516423597c2"></a><a name="en-us_topic_0151920917_a7bdfc64d030a4b42bd585516423597c2"></a>Restarts a service only if it is running.</p>
</td>
</tr>
<tr id="en-us_topic_0151920917_r713e5d55a8f9431f9d3bd610a471a75b"><td class="cellrowborder" valign="top" width="30%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920917_a3bfd99b1d31b49d78942a71f95a591b7"><a name="en-us_topic_0151920917_a3bfd99b1d31b49d78942a71f95a591b7"></a><a name="en-us_topic_0151920917_a3bfd99b1d31b49d78942a71f95a591b7"></a>service <em id="i129331410101817"><a name="i129331410101817"></a><a name="i129331410101817"></a>network</em> status</p>
</td>
<td class="cellrowborder" valign="top" width="37%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920917_abcf4fcc5f3eb49e98177485d1e0fa8c8"><a name="en-us_topic_0151920917_abcf4fcc5f3eb49e98177485d1e0fa8c8"></a><a name="en-us_topic_0151920917_abcf4fcc5f3eb49e98177485d1e0fa8c8"></a>systemctl status <em id="i14167141311818"><a name="i14167141311818"></a><a name="i14167141311818"></a>network</em>.service</p>
</td>
<td class="cellrowborder" valign="top" width="33%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920917_a2edbdadf7af149a785e7bb53e742957d"><a name="en-us_topic_0151920917_a2edbdadf7af149a785e7bb53e742957d"></a><a name="en-us_topic_0151920917_a2edbdadf7af149a785e7bb53e742957d"></a>Checks the service running status.</p>
</td>
</tr>
<tr id="en-us_topic_0151920917_rdbb2c99800964d3a939744820783d83e"><td class="cellrowborder" valign="top" width="30%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920917_a532ae2e1fcee47c1b2c793af353c8497"><a name="en-us_topic_0151920917_a532ae2e1fcee47c1b2c793af353c8497"></a><a name="en-us_topic_0151920917_a532ae2e1fcee47c1b2c793af353c8497"></a>chkconfig <em id="i12543718141817"><a name="i12543718141817"></a><a name="i12543718141817"></a>network</em> on</p>
</td>
<td class="cellrowborder" valign="top" width="37%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920917_ac70b593c72654611b5fb947cc4ce0be8"><a name="en-us_topic_0151920917_ac70b593c72654611b5fb947cc4ce0be8"></a><a name="en-us_topic_0151920917_ac70b593c72654611b5fb947cc4ce0be8"></a>systemctl enable <em id="i68755202187"><a name="i68755202187"></a><a name="i68755202187"></a>network</em>.service</p>
</td>
<td class="cellrowborder" valign="top" width="33%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920917_af0790cedca9e4ba6815f635b0ebbeaf0"><a name="en-us_topic_0151920917_af0790cedca9e4ba6815f635b0ebbeaf0"></a><a name="en-us_topic_0151920917_af0790cedca9e4ba6815f635b0ebbeaf0"></a>Enables a service when the service activation time arrives or a trigger condition for enabling the service is met.</p>
</td>
</tr>
<tr id="en-us_topic_0151920917_rd68859dcb33542debd6ee8ad5156b36c"><td class="cellrowborder" valign="top" width="30%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920917_a709258a9eeee403aa92657a02bf35217"><a name="en-us_topic_0151920917_a709258a9eeee403aa92657a02bf35217"></a><a name="en-us_topic_0151920917_a709258a9eeee403aa92657a02bf35217"></a>chkconfig <em id="i103391827191816"><a name="i103391827191816"></a><a name="i103391827191816"></a>network</em> off</p>
</td>
<td class="cellrowborder" valign="top" width="37%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920917_ac33b4c8bd2f24d66b4e3b818331588b1"><a name="en-us_topic_0151920917_ac33b4c8bd2f24d66b4e3b818331588b1"></a><a name="en-us_topic_0151920917_ac33b4c8bd2f24d66b4e3b818331588b1"></a>systemctl disable <em id="i83771532111817"><a name="i83771532111817"></a><a name="i83771532111817"></a>network</em>.service</p>
</td>
<td class="cellrowborder" valign="top" width="33%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920917_a1845b23447a9422993c7f35412d8bccd"><a name="en-us_topic_0151920917_a1845b23447a9422993c7f35412d8bccd"></a><a name="en-us_topic_0151920917_a1845b23447a9422993c7f35412d8bccd"></a>Disables a service when the service activation time arrives or a trigger condition for disabling the service is met.</p>
</td>
</tr>
<tr id="en-us_topic_0151920917_r6e6a32f051694436a17223d750d3ca5d"><td class="cellrowborder" valign="top" width="30%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920917_a7100f90dea8e4aac9ebbd1046cfe1b61"><a name="en-us_topic_0151920917_a7100f90dea8e4aac9ebbd1046cfe1b61"></a><a name="en-us_topic_0151920917_a7100f90dea8e4aac9ebbd1046cfe1b61"></a>chkconfig <em id="i20188173712184"><a name="i20188173712184"></a><a name="i20188173712184"></a>network</em></p>
</td>
<td class="cellrowborder" valign="top" width="37%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920917_a1d84c3ad47164379a76dc7e895d8ec75"><a name="en-us_topic_0151920917_a1d84c3ad47164379a76dc7e895d8ec75"></a><a name="en-us_topic_0151920917_a1d84c3ad47164379a76dc7e895d8ec75"></a>systemctl is-enabled <em id="i891911394186"><a name="i891911394186"></a><a name="i891911394186"></a>network</em>.service</p>
</td>
<td class="cellrowborder" valign="top" width="33%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920917_a6443c2f5c45d46098389ce04d7c4d067"><a name="en-us_topic_0151920917_a6443c2f5c45d46098389ce04d7c4d067"></a><a name="en-us_topic_0151920917_a6443c2f5c45d46098389ce04d7c4d067"></a>Checks whether a service is enabled.</p>
</td>
</tr>
<tr id="en-us_topic_0151920917_r4714a5d93d1f4bb68bc6aad5119cffb1"><td class="cellrowborder" valign="top" width="30%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920917_aa363ce8663604d429955880c4d56dadb"><a name="en-us_topic_0151920917_aa363ce8663604d429955880c4d56dadb"></a><a name="en-us_topic_0151920917_aa363ce8663604d429955880c4d56dadb"></a>chkconfig \-\-list</p>
</td>
<td class="cellrowborder" valign="top" width="37%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920917_a921188067f294d718d37be90122b8e9d"><a name="en-us_topic_0151920917_a921188067f294d718d37be90122b8e9d"></a><a name="en-us_topic_0151920917_a921188067f294d718d37be90122b8e9d"></a>systemctl list-unit-files \-\-type=service</p>
</td>
<td class="cellrowborder" valign="top" width="33%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920917_a2575b1e1d82e42178cd3ffd724ffa6c8"><a name="en-us_topic_0151920917_a2575b1e1d82e42178cd3ffd724ffa6c8"></a><a name="en-us_topic_0151920917_a2575b1e1d82e42178cd3ffd724ffa6c8"></a>Lists all services in each runlevel and checks whether they are enabled.</p>
</td>
</tr>
<tr id="en-us_topic_0151920917_ref5860825d054488a966acab6382ccb3"><td class="cellrowborder" valign="top" width="30%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920917_acd5c91b22ffe4cf5ab418a2d65820f02"><a name="en-us_topic_0151920917_acd5c91b22ffe4cf5ab418a2d65820f02"></a><a name="en-us_topic_0151920917_acd5c91b22ffe4cf5ab418a2d65820f02"></a>chkconfig <em id="i187651543191814"><a name="i187651543191814"></a><a name="i187651543191814"></a>network</em> \-\-list</p>
</td>
<td class="cellrowborder" valign="top" width="37%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920917_afa513e24075d4ca7bd2348451ea1d27b"><a name="en-us_topic_0151920917_afa513e24075d4ca7bd2348451ea1d27b"></a><a name="en-us_topic_0151920917_afa513e24075d4ca7bd2348451ea1d27b"></a>ls /etc/systemd/system/*.wants/<em id="i7400164691813"><a name="i7400164691813"></a><a name="i7400164691813"></a>network</em>.service</p>
</td>
<td class="cellrowborder" valign="top" width="33%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920917_a75394896b43b4c6689ca601670afda3b"><a name="en-us_topic_0151920917_a75394896b43b4c6689ca601670afda3b"></a><a name="en-us_topic_0151920917_a75394896b43b4c6689ca601670afda3b"></a>Lists the runlevels in which a service is enabled and those in which the service is disabled.</p>
</td>
</tr>
<tr id="en-us_topic_0151920917_rd6c7141c6da9413db38f999f2db4c6bc"><td class="cellrowborder" valign="top" width="30%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920917_ac75a48e757db42699bd3c7e801285334"><a name="en-us_topic_0151920917_ac75a48e757db42699bd3c7e801285334"></a><a name="en-us_topic_0151920917_ac75a48e757db42699bd3c7e801285334"></a>chkconfig <em id="i5122352111811"><a name="i5122352111811"></a><a name="i5122352111811"></a>network</em> \-\-add</p>
</td>
<td class="cellrowborder" valign="top" width="37%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920917_ab3f7243a981f4731bee057367493d1d3"><a name="en-us_topic_0151920917_ab3f7243a981f4731bee057367493d1d3"></a><a name="en-us_topic_0151920917_ab3f7243a981f4731bee057367493d1d3"></a>systemctl daemon-reload</p>
</td>
<td class="cellrowborder" valign="top" width="33%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920917_af79feff246144baca76efe245350d793"><a name="en-us_topic_0151920917_af79feff246144baca76efe245350d793"></a><a name="en-us_topic_0151920917_af79feff246144baca76efe245350d793"></a>Used when you need to create a service file or change settings.</p>
</td>
</tr>
</tbody>
</table>

### Listing Services
To list all currently loaded services, run the following command:

```
systemctl list-units --type service
```

To list all services regardless of whether they are loaded, run the following command \(with the all option\):

```
systemctl list-units --type service --all
```

Example list of all currently loaded services:

```
$ systemctl list-units --type service
UNIT                        LOAD   ACTIVE     SUB     JOB   DESCRIPTION  
atd.service                 loaded active     running       Deferred execution scheduler  
auditd.service              loaded active     running       Security Auditing Service  
avahi-daemon.service        loaded active     running       Avahi mDNS/DNS-SD Stack  
chronyd.service             loaded active     running       NTP client/server  
crond.service               loaded active     running       Command Scheduler  
dbus.service                loaded active     running       D-Bus System Message Bus  
dracut-shutdown.service     loaded active     exited        Restore /run/initramfs on shutdown  
firewalld.service           loaded active     running       firewalld - dynamic firewall daemon  
getty@tty1.service          loaded active     running       Getty on tty1  
gssproxy.service            loaded active     running       GSSAPI Proxy Daemon  
irqbalance.service          loaded active     running       irqbalance daemon  
iscsid.service              loaded activating start   start Open-iSCSI
```

### Displaying Service Status
To display the status of a service, run the following command:

```
systemctl status name.service
```

[Table 4](#en-us_topic_0151920917_t36cd267d69244ed39ae06bb117ed8e62)  describes the parameters in the command output.

**Table  4**  Output parameters

<a name="en-us_topic_0151920917_t36cd267d69244ed39ae06bb117ed8e62"></a>
<table><thead align="left"><tr id="en-us_topic_0151920917_r2bf0635c239b4bbeaf7bc4eb4d85459e"><th class="cellrowborder" valign="top" width="19%" id="mcps1.2.3.1.1"><p id="en-us_topic_0151920917_a8dde4401e621448eab369aa9ade622e4"><a name="en-us_topic_0151920917_a8dde4401e621448eab369aa9ade622e4"></a><a name="en-us_topic_0151920917_a8dde4401e621448eab369aa9ade622e4"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="81%" id="mcps1.2.3.1.2"><p id="en-us_topic_0151920917_a93c35017023145e4a3dd692445c4eb75"><a name="en-us_topic_0151920917_a93c35017023145e4a3dd692445c4eb75"></a><a name="en-us_topic_0151920917_a93c35017023145e4a3dd692445c4eb75"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0151920917_r2276fbc401e24f5e965a75e8ec40f61b"><td class="cellrowborder" valign="top" width="19%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151920917_a35d67ba3f4394bd5aee0cdba9f1b5462"><a name="en-us_topic_0151920917_a35d67ba3f4394bd5aee0cdba9f1b5462"></a><a name="en-us_topic_0151920917_a35d67ba3f4394bd5aee0cdba9f1b5462"></a>Loaded</p>
</td>
<td class="cellrowborder" valign="top" width="81%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151920917_ae54693b5ed144dd5ae89496a1c688eb0"><a name="en-us_topic_0151920917_ae54693b5ed144dd5ae89496a1c688eb0"></a><a name="en-us_topic_0151920917_ae54693b5ed144dd5ae89496a1c688eb0"></a>Information on whether the service has been loaded, the absolute path to the service file, and a note of whether the service is enabled.</p>
</td>
</tr>
<tr id="en-us_topic_0151920917_r72275c1194ff4dd593d77bf34620d7bd"><td class="cellrowborder" valign="top" width="19%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151920917_aba7f0a647fde4e12a202c0dd74d0c589"><a name="en-us_topic_0151920917_aba7f0a647fde4e12a202c0dd74d0c589"></a><a name="en-us_topic_0151920917_aba7f0a647fde4e12a202c0dd74d0c589"></a>Active</p>
</td>
<td class="cellrowborder" valign="top" width="81%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151920917_a0a0de97e681f4218bc2ab1b2192acf56"><a name="en-us_topic_0151920917_a0a0de97e681f4218bc2ab1b2192acf56"></a><a name="en-us_topic_0151920917_a0a0de97e681f4218bc2ab1b2192acf56"></a>Information on whether the service is running and a time stamp.</p>
</td>
</tr>
<tr id="en-us_topic_0151920917_r5dea7cb1916a448da864f6d5ddaaed60"><td class="cellrowborder" valign="top" width="19%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151920917_ae137d23b2f0f476fbfcfbf5042afcbf8"><a name="en-us_topic_0151920917_ae137d23b2f0f476fbfcfbf5042afcbf8"></a><a name="en-us_topic_0151920917_ae137d23b2f0f476fbfcfbf5042afcbf8"></a>Main PID</p>
</td>
<td class="cellrowborder" valign="top" width="81%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151920917_a7627b260b2c74e43b6be78acb9c9dd97"><a name="en-us_topic_0151920917_a7627b260b2c74e43b6be78acb9c9dd97"></a><a name="en-us_topic_0151920917_a7627b260b2c74e43b6be78acb9c9dd97"></a>PID of the service.</p>
</td>
</tr>
<tr id="en-us_topic_0151920917_r67e18953b9624b95bd4884e28ef20376"><td class="cellrowborder" valign="top" width="19%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151920917_aa122289518d847cea99e32c1d22ab121"><a name="en-us_topic_0151920917_aa122289518d847cea99e32c1d22ab121"></a><a name="en-us_topic_0151920917_aa122289518d847cea99e32c1d22ab121"></a>CGroup</p>
</td>
<td class="cellrowborder" valign="top" width="81%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151920917_a668e34c741a44741929beeab402bf767"><a name="en-us_topic_0151920917_a668e34c741a44741929beeab402bf767"></a><a name="en-us_topic_0151920917_a668e34c741a44741929beeab402bf767"></a>Additional information about related control groups.</p>
</td>
</tr>
</tbody>
</table>

To verify whether a particular service is running, run the following command:

```
systemctl is-active name.service
```

The output of the  **is-active**  command is as follows:

**Table  5**  Output of the is-active command

<a name="table157842227315"></a>
<table><thead align="left"><tr id="row878417221132"><th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.1"><p id="p1978432212315"><a name="p1978432212315"></a><a name="p1978432212315"></a>Status</p>
</th>
<th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.2"><p id="p878410225314"><a name="p878410225314"></a><a name="p878410225314"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="row87841522439"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p153819129412"><a name="p153819129412"></a><a name="p153819129412"></a>active(running)</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p938116129415"><a name="p938116129415"></a><a name="p938116129415"></a>One or more services are running in the system.</p>
</td>
</tr>
<tr id="row7784112217315"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p153829121246"><a name="p153829121246"></a><a name="p153829121246"></a>active(exited)</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p103822012844"><a name="p103822012844"></a><a name="p103822012844"></a>A service that ends properly after being executed only once. Currently, no program is running in the system. For example, the <strong id="b9225113174212"><a name="b9225113174212"></a><a name="b9225113174212"></a>quotaon</strong> function is performed only when the program is started or mounted.</p>
</td>
</tr>
<tr id="row978416227312"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p1838251219416"><a name="p1838251219416"></a><a name="p1838251219416"></a>active(waiting)</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p23822129416"><a name="p23822129416"></a><a name="p23822129416"></a>The program needs to wait for other events to continue running. For example, the print queue service is being started, but it needs to be queued (print jobs) so that it can continue to wake up the printer service to perform the next print function.</p>
</td>
</tr>
<tr id="row10784102216316"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p13382171211418"><a name="p13382171211418"></a><a name="p13382171211418"></a>inactive</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p1338217126410"><a name="p1338217126410"></a><a name="p1338217126410"></a>The service is not running.</p>
</td>
</tr>
</tbody>
</table>

Similarly, to determine whether a particular service is enabled, run the following command:

```
systemctl is-enabled name.service
```

The output of the  **is-enabled**  command is as follows:

**Table  6**  Output of the is-enabled command

<a name="table105177355318"></a>
<table><thead align="left"><tr id="row9517635538"><th class="cellrowborder" valign="top" width="32.48%" id="mcps1.2.3.1.1"><p id="p551716356313"><a name="p551716356313"></a><a name="p551716356313"></a>Status</p>
</th>
<th class="cellrowborder" valign="top" width="67.52%" id="mcps1.2.3.1.2"><p id="p1051716351935"><a name="p1051716351935"></a><a name="p1051716351935"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="row195171351134"><td class="cellrowborder" valign="top" width="32.48%" headers="mcps1.2.3.1.1 "><p id="p165171351231"><a name="p165171351231"></a><a name="p165171351231"></a>"enabled"</p>
</td>
<td class="cellrowborder" valign="top" width="67.52%" headers="mcps1.2.3.1.2 "><p id="p155175351731"><a name="p155175351731"></a><a name="p155175351731"></a>Has been permanently enabled through <strong id="b148912491227"><a name="b148912491227"></a><a name="b148912491227"></a>Alias= </strong><em id="i165841226152210"><a name="i165841226152210"></a><a name="i165841226152210"></a>Alias</em>, <strong id="b12754203218224"><a name="b12754203218224"></a><a name="b12754203218224"></a>.wants/</strong>, or <strong id="b1979210365223"><a name="b1979210365223"></a><a name="b1979210365223"></a>.requires/</strong> soft link in the <strong id="b1288740102212"><a name="b1288740102212"></a><a name="b1288740102212"></a>/etc/systemd/system/</strong> directory.</p>
</td>
</tr>
<tr id="row95171335339"><td class="cellrowborder" valign="top" width="32.48%" headers="mcps1.2.3.1.1 "><p id="p1951717351433"><a name="p1951717351433"></a><a name="p1951717351433"></a>"enabled-runtime"</p>
</td>
<td class="cellrowborder" valign="top" width="67.52%" headers="mcps1.2.3.1.2 "><p id="p9517135835"><a name="p9517135835"></a><a name="p9517135835"></a>Has been temporarily enabled through <strong id="b6687233182313"><a name="b6687233182313"></a><a name="b6687233182313"></a>Alias= </strong><em id="i11688123392310"><a name="i11688123392310"></a><a name="i11688123392310"></a>Alias</em>, <strong id="b1068812335233"><a name="b1068812335233"></a><a name="b1068812335233"></a>.wants/</strong>, or <strong id="b9688173322317"><a name="b9688173322317"></a><a name="b9688173322317"></a>.requires/</strong> soft link in the <strong id="b062114433239"><a name="b062114433239"></a><a name="b062114433239"></a>/run/systemd/system/</strong> directory.</p>
</td>
</tr>
<tr id="row7517143515314"><td class="cellrowborder" valign="top" width="32.48%" headers="mcps1.2.3.1.1 "><p id="p125176351137"><a name="p125176351137"></a><a name="p125176351137"></a>"linked"</p>
</td>
<td class="cellrowborder" valign="top" width="67.52%" headers="mcps1.2.3.1.2 "><p id="p145171535934"><a name="p145171535934"></a><a name="p145171535934"></a>Although the unit file is not in the standard unit directory, one or more soft links pointing to the unit file exist in the <strong id="b02821452182114"><a name="b02821452182114"></a><a name="b02821452182114"></a>/etc/systemd/system/</strong> permanent directory.</p>
</td>
</tr>
<tr id="row125176351137"><td class="cellrowborder" valign="top" width="32.48%" headers="mcps1.2.3.1.1 "><p id="p2051718353313"><a name="p2051718353313"></a><a name="p2051718353313"></a>"linked-runtime"</p>
</td>
<td class="cellrowborder" valign="top" width="67.52%" headers="mcps1.2.3.1.2 "><p id="p115171835936"><a name="p115171835936"></a><a name="p115171835936"></a>Although the unit file is not in the standard unit directory, one or more soft links pointing to the unit file exist in the <strong id="b14859450102319"><a name="b14859450102319"></a><a name="b14859450102319"></a>/run/systemd/system/</strong> temporary directory.</p>
</td>
</tr>
<tr id="row851719352312"><td class="cellrowborder" valign="top" width="32.48%" headers="mcps1.2.3.1.1 "><p id="p1651753520319"><a name="p1651753520319"></a><a name="p1651753520319"></a>"masked"</p>
</td>
<td class="cellrowborder" valign="top" width="67.52%" headers="mcps1.2.3.1.2 "><p id="p25171351233"><a name="p25171351233"></a><a name="p25171351233"></a>Has been masked permanently by the <strong id="b1145211952819"><a name="b1145211952819"></a><a name="b1145211952819"></a>/etc/systemd/system/</strong> directory (soft link to <strong id="b713110353286"><a name="b713110353286"></a><a name="b713110353286"></a>/dev/null</strong>). Therefore, the <strong id="b5498164316282"><a name="b5498164316282"></a><a name="b5498164316282"></a>start</strong> operation fails.</p>
</td>
</tr>
<tr id="row551715351136"><td class="cellrowborder" valign="top" width="32.48%" headers="mcps1.2.3.1.1 "><p id="p175178351334"><a name="p175178351334"></a><a name="p175178351334"></a>"masked-runtime"</p>
</td>
<td class="cellrowborder" valign="top" width="67.52%" headers="mcps1.2.3.1.2 "><p id="p135171135138"><a name="p135171135138"></a><a name="p135171135138"></a>Has been masked temporarily by the <strong id="b1210717017349"><a name="b1210717017349"></a><a name="b1210717017349"></a>/run/systemd/systemd/</strong> directory (soft link to <strong id="b1233184423417"><a name="b1233184423417"></a><a name="b1233184423417"></a>/dev/null</strong>). Therefore, the <strong id="b5586115110346"><a name="b5586115110346"></a><a name="b5586115110346"></a>start</strong> operation fails.</p>
</td>
</tr>
<tr id="row35171935533"><td class="cellrowborder" valign="top" width="32.48%" headers="mcps1.2.3.1.1 "><p id="p751714351231"><a name="p751714351231"></a><a name="p751714351231"></a>"static"</p>
</td>
<td class="cellrowborder" valign="top" width="67.52%" headers="mcps1.2.3.1.2 "><p id="p551718355313"><a name="p551718355313"></a><a name="p551718355313"></a>Not enabled. There is no option available for the <strong id="b1835611271535"><a name="b1835611271535"></a><a name="b1835611271535"></a>enable</strong> command in the [Install] section of the unit file.</p>
</td>
</tr>
<tr id="row1012314171440"><td class="cellrowborder" valign="top" width="32.48%" headers="mcps1.2.3.1.1 "><p id="p131245179420"><a name="p131245179420"></a><a name="p131245179420"></a>"indirect"</p>
</td>
<td class="cellrowborder" valign="top" width="67.52%" headers="mcps1.2.3.1.2 "><p id="p91241717648"><a name="p91241717648"></a><a name="p91241717648"></a>Not enabled. But the list of values for the <strong id="b559774115552"><a name="b559774115552"></a><a name="b559774115552"></a>Also=</strong> option in the [Install] section of the unit file is not empty (that is, some units in the list may have been enabled), or the unit file has an alias soft link which is not in the <strong id="b11106144165815"><a name="b11106144165815"></a><a name="b11106144165815"></a>Also=</strong> list. For a template unit, it indicates that an instance different from <strong id="b23790755915"><a name="b23790755915"></a><a name="b23790755915"></a>DefaultInstance=</strong> is enabled.</p>
</td>
</tr>
<tr id="row123141521241"><td class="cellrowborder" valign="top" width="32.48%" headers="mcps1.2.3.1.1 "><p id="p831417211244"><a name="p831417211244"></a><a name="p831417211244"></a>"disabled"</p>
</td>
<td class="cellrowborder" valign="top" width="67.52%" headers="mcps1.2.3.1.2 "><p id="p531419213418"><a name="p531419213418"></a><a name="p531419213418"></a>Not enabled. But the [Install] section of the unit file contains options available for the <strong id="b89807342590"><a name="b89807342590"></a><a name="b89807342590"></a>enable</strong> command.</p>
</td>
</tr>
<tr id="row173149216411"><td class="cellrowborder" valign="top" width="32.48%" headers="mcps1.2.3.1.1 "><p id="p83159211343"><a name="p83159211343"></a><a name="p83159211343"></a>"generated"</p>
</td>
<td class="cellrowborder" valign="top" width="67.52%" headers="mcps1.2.3.1.2 "><p id="p43151219416"><a name="p43151219416"></a><a name="p43151219416"></a>The unit file is dynamically generated by the unit generator. The generated unit file may not be directly enabled, but is implicitly enabled by the unit generator.</p>
</td>
</tr>
<tr id="row37625251844"><td class="cellrowborder" valign="top" width="32.48%" headers="mcps1.2.3.1.1 "><p id="p57620251419"><a name="p57620251419"></a><a name="p57620251419"></a>"transient"</p>
</td>
<td class="cellrowborder" valign="top" width="67.52%" headers="mcps1.2.3.1.2 "><p id="p127638251244"><a name="p127638251244"></a><a name="p127638251244"></a>The unit file is dynamically and temporarily generated by the <strong id="b117311036706"><a name="b117311036706"></a><a name="b117311036706"></a>runtime</strong> API. The temporary unit may not be enabled.</p>
</td>
</tr>
<tr id="row57631925642"><td class="cellrowborder" valign="top" width="32.48%" headers="mcps1.2.3.1.1 "><p id="p876316256412"><a name="p876316256412"></a><a name="p876316256412"></a>"bad"</p>
</td>
<td class="cellrowborder" valign="top" width="67.52%" headers="mcps1.2.3.1.2 "><p id="p187635255419"><a name="p187635255419"></a><a name="p187635255419"></a>The unit file is incorrect or other errors occur. <strong id="b513219571802"><a name="b513219571802"></a><a name="b513219571802"></a>is-enabled</strong> does not return this status, but displays an error message. The <strong id="b14156144311112"><a name="b14156144311112"></a><a name="b14156144311112"></a>list-unit-files</strong> command may display this unit.</p>
</td>
</tr>
</tbody>
</table>

For example, to display the status of gdm.service, run the  **systemctl status gdm.service**  command.

```
# systemctl status gdm.service
gdm.service - GNOME Display Manager   Loaded: loaded (/usr/lib/systemd/system/gdm.service; enabled)   Active: active (running) since Thu 2013-10-17 17:31:23 CEST; 5min ago
 Main PID: 1029 (gdm)
   CGroup: /system.slice/gdm.service
           ├─1029 /usr/sbin/gdm
           ├─1037 /usr/libexec/gdm-simple-slave --display-id /org/gno...           
           └─1047 /usr/bin/Xorg :0 -background none -verbose -auth /r...Oct 17 17:31:23 localhost systemd[1]: Started GNOME Display Manager.
```

### Starting a Service
To start a service, run the following command as the user  **root**:

```
systemctl start name.service
```

For example, to start the httpd service, run the following command:

```
# systemctl start httpd.service
```

### Stopping a Service
To stop a service, run the following command as the user  **root**:

```
systemctl stop name.service
```

For example, to stop the Bluetooth service, run the following command:

```
# systemctl stop bluetooth.service
```

### Restarting a Service
To restart a service, run the following command as the user  **root**:

```
systemctl restart name.service
```

This command stops the selected service in the current session and immediately starts it again. If the selected service is not running, this command starts it too.

For example, to restart the Bluetooth service, run the following command:

```
# systemctl restart bluetooth.service
```

### Enabling a Service
To configure a service to start automatically at system boot time, run the following command as the user  **root**:

```
systemctl enable name.service
```

For example, to configure the httpd service to start automatically at system boot time, run the following command:

```
# systemctl enable httpd.service
ln -s '/usr/lib/systemd/system/httpd.service' '/etc/systemd/system/multi-user.target.wants/httpd.service'
```

### Disabling a Service
To prevent a service from starting automatically at system boot time, run the following command as the user  **root**:

```
systemctl disable name.service
```

For example, to prevent the Bluetooth service from starting automatically at system boot time, run the following command:

```
# systemctl disable bluetooth.service
Removed /etc/systemd/system/bluetooth.target.wants/bluetooth.service.
Removed /etc/systemd/system/dbus-org.bluez.service.
```

## Changing a Runlevel

### Targets and Runlevels
In systemd, the concept of runlevels has been replaced with systemd targets to improve flexibility. For example, you can inherit an existing target and turn it into your own target by adding other services.  [Table 7](#en-us_topic_0151920939_t9af92c282ad240ea9a79fb08d26e8181)  provides a complete list of runlevels and their corresponding systemd targets.

**Table  7**  Mapping between runlevels and targets

<a name="en-us_topic_0151920939_t9af92c282ad240ea9a79fb08d26e8181"></a>
<table><thead align="left"><tr id="en-us_topic_0151920939_r6198e54b95054c25ad4cbf7f6a4d94a8"><th class="cellrowborder" valign="top" width="13.389999999999999%" id="mcps1.2.4.1.1"><p id="en-us_topic_0151920939_a8ca063ccd2b5493eaba60d772b3a210e"><a name="en-us_topic_0151920939_a8ca063ccd2b5493eaba60d772b3a210e"></a><a name="en-us_topic_0151920939_a8ca063ccd2b5493eaba60d772b3a210e"></a><strong id="en-us_topic_0151920939_b19983173191520"><a name="en-us_topic_0151920939_b19983173191520"></a><a name="en-us_topic_0151920939_b19983173191520"></a>Runlevel</strong></p>
</th>
<th class="cellrowborder" valign="top" width="31.53%" id="mcps1.2.4.1.2"><p id="en-us_topic_0151920939_ae345f9616c9e4b99b91537e14bf301fc"><a name="en-us_topic_0151920939_ae345f9616c9e4b99b91537e14bf301fc"></a><a name="en-us_topic_0151920939_ae345f9616c9e4b99b91537e14bf301fc"></a><strong id="en-us_topic_0151920939_b39909313153"><a name="en-us_topic_0151920939_b39909313153"></a><a name="en-us_topic_0151920939_b39909313153"></a>systemd Target</strong></p>
</th>
<th class="cellrowborder" valign="top" width="55.08%" id="mcps1.2.4.1.3"><p id="en-us_topic_0151920939_a51d30f31c3494031a3cb05ad3f0f83b0"><a name="en-us_topic_0151920939_a51d30f31c3494031a3cb05ad3f0f83b0"></a><a name="en-us_topic_0151920939_a51d30f31c3494031a3cb05ad3f0f83b0"></a><strong id="en-us_topic_0151920939_b139918317157"><a name="en-us_topic_0151920939_b139918317157"></a><a name="en-us_topic_0151920939_b139918317157"></a>Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0151920939_rf26e9f9e50504c07a370b9dc87a197c9"><td class="cellrowborder" valign="top" width="13.389999999999999%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920939_a6d80989a801f4bf4bb4546c17a7b3a33"><a name="en-us_topic_0151920939_a6d80989a801f4bf4bb4546c17a7b3a33"></a><a name="en-us_topic_0151920939_a6d80989a801f4bf4bb4546c17a7b3a33"></a>0</p>
</td>
<td class="cellrowborder" valign="top" width="31.53%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920939_a7d9fff8415094170a9f174a1dc243183"><a name="en-us_topic_0151920939_a7d9fff8415094170a9f174a1dc243183"></a><a name="en-us_topic_0151920939_a7d9fff8415094170a9f174a1dc243183"></a>runlevel0.target, poweroff.target</p>
</td>
<td class="cellrowborder" valign="top" width="55.08%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920939_a70514fee2f27437cbae934e8c574f997"><a name="en-us_topic_0151920939_a70514fee2f27437cbae934e8c574f997"></a><a name="en-us_topic_0151920939_a70514fee2f27437cbae934e8c574f997"></a>The operating system is powered off.</p>
</td>
</tr>
<tr id="en-us_topic_0151920939_r1e5afff728cc4151b419680f76671293"><td class="cellrowborder" valign="top" width="13.389999999999999%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920939_a6bed301641504e7691830451ccd13084"><a name="en-us_topic_0151920939_a6bed301641504e7691830451ccd13084"></a><a name="en-us_topic_0151920939_a6bed301641504e7691830451ccd13084"></a>1, s, single</p>
</td>
<td class="cellrowborder" valign="top" width="31.53%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920939_af07325c424aa41fd91422796a8c5530a"><a name="en-us_topic_0151920939_af07325c424aa41fd91422796a8c5530a"></a><a name="en-us_topic_0151920939_af07325c424aa41fd91422796a8c5530a"></a>runlevel1.target, rescue.target</p>
</td>
<td class="cellrowborder" valign="top" width="55.08%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920939_a835efcb9d2ec42219ba2cf84f320006d"><a name="en-us_topic_0151920939_a835efcb9d2ec42219ba2cf84f320006d"></a><a name="en-us_topic_0151920939_a835efcb9d2ec42219ba2cf84f320006d"></a>The operating system is in single user mode.</p>
</td>
</tr>
<tr id="en-us_topic_0151920939_re1071d4eed334f439f54040112b05c4a"><td class="cellrowborder" valign="top" width="13.389999999999999%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920939_en-us_topic_0072985277_p188013479275"><a name="en-us_topic_0151920939_en-us_topic_0072985277_p188013479275"></a><a name="en-us_topic_0151920939_en-us_topic_0072985277_p188013479275"></a>2, 4</p>
</td>
<td class="cellrowborder" valign="top" width="31.53%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920939_a97565d2aa66a42bba4e87bd5a75413e8"><a name="en-us_topic_0151920939_a97565d2aa66a42bba4e87bd5a75413e8"></a><a name="en-us_topic_0151920939_a97565d2aa66a42bba4e87bd5a75413e8"></a>runlevel2.target, runlevel4.target, multi-user.target</p>
</td>
<td class="cellrowborder" valign="top" width="55.08%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920939_a99315964c38d404585856756e975fbfd"><a name="en-us_topic_0151920939_a99315964c38d404585856756e975fbfd"></a><a name="en-us_topic_0151920939_a99315964c38d404585856756e975fbfd"></a>The operating system is in user-defined or domain-specific runlevel (by default, it is equivalent to runlevel 3).</p>
</td>
</tr>
<tr id="en-us_topic_0151920939_rb065a846486b406690e8c4224a0a0ac9"><td class="cellrowborder" valign="top" width="13.389999999999999%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920939_en-us_topic_0072985277_p680154702718"><a name="en-us_topic_0151920939_en-us_topic_0072985277_p680154702718"></a><a name="en-us_topic_0151920939_en-us_topic_0072985277_p680154702718"></a>3</p>
</td>
<td class="cellrowborder" valign="top" width="31.53%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920939_a0180d9e5e866452ebd0ec8be94dc4f05"><a name="en-us_topic_0151920939_a0180d9e5e866452ebd0ec8be94dc4f05"></a><a name="en-us_topic_0151920939_a0180d9e5e866452ebd0ec8be94dc4f05"></a>runlevel3.target, multi-user.target</p>
</td>
<td class="cellrowborder" valign="top" width="55.08%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920939_a9c5a2a48aa5d49bf8e86a1cce1711303"><a name="en-us_topic_0151920939_a9c5a2a48aa5d49bf8e86a1cce1711303"></a><a name="en-us_topic_0151920939_a9c5a2a48aa5d49bf8e86a1cce1711303"></a>The operating system is in non-graphical multi-user mode, and can be accessed from multiple consoles or networks.</p>
</td>
</tr>
<tr id="en-us_topic_0151920939_r0184cfc9111840b6be09d7621237f91b"><td class="cellrowborder" valign="top" width="13.389999999999999%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920939_aecd758e276a34d828c7f57d56aba812d"><a name="en-us_topic_0151920939_aecd758e276a34d828c7f57d56aba812d"></a><a name="en-us_topic_0151920939_aecd758e276a34d828c7f57d56aba812d"></a>5</p>
</td>
<td class="cellrowborder" valign="top" width="31.53%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920939_a0519be8c47be4ec4a47bd2942ebdee20"><a name="en-us_topic_0151920939_a0519be8c47be4ec4a47bd2942ebdee20"></a><a name="en-us_topic_0151920939_a0519be8c47be4ec4a47bd2942ebdee20"></a>runlevel5.target, graphical.target</p>
</td>
<td class="cellrowborder" valign="top" width="55.08%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920939_ad3463085cd604e0081dfffaa13efdad9"><a name="en-us_topic_0151920939_ad3463085cd604e0081dfffaa13efdad9"></a><a name="en-us_topic_0151920939_ad3463085cd604e0081dfffaa13efdad9"></a>The operating system is in graphical multi-user mode. All the services running at level 3 can be accessed through graphical login.</p>
</td>
</tr>
<tr id="en-us_topic_0151920939_rdd9338b99fb2419fa9257a7a21e2774f"><td class="cellrowborder" valign="top" width="13.389999999999999%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920939_a7564c4a239924b33af88cbb8a34ec8dc"><a name="en-us_topic_0151920939_a7564c4a239924b33af88cbb8a34ec8dc"></a><a name="en-us_topic_0151920939_a7564c4a239924b33af88cbb8a34ec8dc"></a>6</p>
</td>
<td class="cellrowborder" valign="top" width="31.53%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920939_a86730dd7a4054dedbfd4562630d462e5"><a name="en-us_topic_0151920939_a86730dd7a4054dedbfd4562630d462e5"></a><a name="en-us_topic_0151920939_a86730dd7a4054dedbfd4562630d462e5"></a>runlevel6.target, reboot.target</p>
</td>
<td class="cellrowborder" valign="top" width="55.08%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920939_a473a6a5eca6c4b60a880ce8da3222f83"><a name="en-us_topic_0151920939_a473a6a5eca6c4b60a880ce8da3222f83"></a><a name="en-us_topic_0151920939_a473a6a5eca6c4b60a880ce8da3222f83"></a>The operating system is rebooted.</p>
</td>
</tr>
<tr id="row13256325195913"><td class="cellrowborder" valign="top" width="13.389999999999999%" headers="mcps1.2.4.1.1 "><p id="p625642510595"><a name="p625642510595"></a><a name="p625642510595"></a>emergency</p>
</td>
<td class="cellrowborder" valign="top" width="31.53%" headers="mcps1.2.4.1.2 "><p id="p1384413745917"><a name="p1384413745917"></a><a name="p1384413745917"></a>emergency.target</p>
</td>
<td class="cellrowborder" valign="top" width="55.08%" headers="mcps1.2.4.1.3 "><p id="p92561925185919"><a name="p92561925185919"></a><a name="p92561925185919"></a>Emergency shell.</p>
</td>
</tr>
</tbody>
</table>

### Viewing the Default Startup Target
Run the following command to view the default startup target of the system:

```
systemctl get-default
```

### Viewing All Startup Targets
Run the following command to view all startup targets of the system:

```
systemctl list-units --type=target
```

### Changing the Default Target
To change the default target, run the following command as the user  **root**:

```
systemctl set-default name.target
```

### Changing the Current Target
To change the current target, run the following command as the user  **root**:

```
systemctl isolate name.target
```

### Changing to Rescue Mode
To change the operating system to rescue mode, run the following command as the user  **root**:

```
systemctl rescue
```

This command is similar to the  **systemctl isolate rescue.target**  command. After the command is executed, the following information is displayed on the serial port:

```
You are in rescue mode. After logging in, type "journalctl -xb" to viewsystem logs, "systemctl reboot" to reboot, "systemctl default" or "exit"to boot into default mode.
Give root password for maintenance
(or press Control-D to continue):
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>You need to restart the system to enter the normal working mode from the rescue mode.  

### Changing to Emergency Mode
To change the operating system to emergency mode, run the following command as the user  **root**:

```
systemctl emergency
```

This command is similar to the  **systemctl isolate emergency.target**  command. After the command is executed, the following information is displayed on the serial port:

```
You are in emergency mode. After logging in, type "journalctl -xb" to viewsystem logs, "systemctl reboot" to reboot, "systemctl default" or "exit"to boot into default mode.
Give root password for maintenance
(or press Control-D to continue):
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>You need to restart the system to enter the normal working mode from the emergency mode.  

## Shutting Down, Suspending, and Hibernating the Operating System

### systemctl Command
The systemd uses the systemctl command instead of old Linux system management commands to shut down, restart, suspend, and hibernate the operating system. Although previous Linux system management commands are still available in systemd for compatibility reasons, you are advised to use  **systemctl**  when possible. The mapping relationship is shown in  [Table 8](#en-us_topic_0151920964_t3daaaba6a03b4c36be9668efcdb61f3b).

**Table  8**  Mapping between old Linux system management commands and systemctl

<a name="en-us_topic_0151920964_t3daaaba6a03b4c36be9668efcdb61f3b"></a>
<table><thead align="left"><tr id="en-us_topic_0151920964_r8e883e3ea8fd4bfe835dac3154666bfd"><th class="cellrowborder" valign="top" width="27.69276927692769%" id="mcps1.2.4.1.1"><p id="en-us_topic_0151920964_affa97759370e4199bee6b37a54620de8"><a name="en-us_topic_0151920964_affa97759370e4199bee6b37a54620de8"></a><a name="en-us_topic_0151920964_affa97759370e4199bee6b37a54620de8"></a>Linux Management Command</p>
</th>
<th class="cellrowborder" valign="top" width="38.97389738973897%" id="mcps1.2.4.1.2"><p id="en-us_topic_0151920964_a74833d21addd43428693aba25495ea5e"><a name="en-us_topic_0151920964_a74833d21addd43428693aba25495ea5e"></a><a name="en-us_topic_0151920964_a74833d21addd43428693aba25495ea5e"></a>systemctl Command</p>
</th>
<th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.2.4.1.3"><p id="en-us_topic_0151920964_a96c730244eaa417f932cd978d244b817"><a name="en-us_topic_0151920964_a96c730244eaa417f932cd978d244b817"></a><a name="en-us_topic_0151920964_a96c730244eaa417f932cd978d244b817"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0151920964_r088f89c8dd43418bb576a2b80963402d"><td class="cellrowborder" valign="top" width="27.69276927692769%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920964_ad51772983856400792c77b80694b2910"><a name="en-us_topic_0151920964_ad51772983856400792c77b80694b2910"></a><a name="en-us_topic_0151920964_ad51772983856400792c77b80694b2910"></a>halt</p>
</td>
<td class="cellrowborder" valign="top" width="38.97389738973897%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920964_ab7a0cde876c74144b333192a6711037f"><a name="en-us_topic_0151920964_ab7a0cde876c74144b333192a6711037f"></a><a name="en-us_topic_0151920964_ab7a0cde876c74144b333192a6711037f"></a>systemctl halt</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920964_ae55b9739eb8f407a8eb672f146f01db2"><a name="en-us_topic_0151920964_ae55b9739eb8f407a8eb672f146f01db2"></a><a name="en-us_topic_0151920964_ae55b9739eb8f407a8eb672f146f01db2"></a>Shuts down the operating system.</p>
</td>
</tr>
<tr id="en-us_topic_0151920964_r32060b64b8684bfda592c954f3b0a451"><td class="cellrowborder" valign="top" width="27.69276927692769%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920964_a0b98bb5ee6b444f2907e601c8a769960"><a name="en-us_topic_0151920964_a0b98bb5ee6b444f2907e601c8a769960"></a><a name="en-us_topic_0151920964_a0b98bb5ee6b444f2907e601c8a769960"></a>poweroff</p>
</td>
<td class="cellrowborder" valign="top" width="38.97389738973897%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920964_a0b8755b08ffb4d2da8bd9e1c23bba8a9"><a name="en-us_topic_0151920964_a0b8755b08ffb4d2da8bd9e1c23bba8a9"></a><a name="en-us_topic_0151920964_a0b8755b08ffb4d2da8bd9e1c23bba8a9"></a>systemctl poweroff</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920964_a0a93593a65134bf9a6adc404eca43b5d"><a name="en-us_topic_0151920964_a0a93593a65134bf9a6adc404eca43b5d"></a><a name="en-us_topic_0151920964_a0a93593a65134bf9a6adc404eca43b5d"></a>Powers off the operating system.</p>
</td>
</tr>
<tr id="en-us_topic_0151920964_rc44a19bda3f24ea3969e224b28e5400d"><td class="cellrowborder" valign="top" width="27.69276927692769%" headers="mcps1.2.4.1.1 "><p id="en-us_topic_0151920964_a9c6bf9b686b84e05b5bf465d925cb8b9"><a name="en-us_topic_0151920964_a9c6bf9b686b84e05b5bf465d925cb8b9"></a><a name="en-us_topic_0151920964_a9c6bf9b686b84e05b5bf465d925cb8b9"></a>reboot</p>
</td>
<td class="cellrowborder" valign="top" width="38.97389738973897%" headers="mcps1.2.4.1.2 "><p id="en-us_topic_0151920964_a246d6cb896454110aad9838aeb055198"><a name="en-us_topic_0151920964_a246d6cb896454110aad9838aeb055198"></a><a name="en-us_topic_0151920964_a246d6cb896454110aad9838aeb055198"></a>systemctl reboot</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="en-us_topic_0151920964_a14f63a55961440c98d20cafe61072b30"><a name="en-us_topic_0151920964_a14f63a55961440c98d20cafe61072b30"></a><a name="en-us_topic_0151920964_a14f63a55961440c98d20cafe61072b30"></a>Reboots the operating system.</p>
</td>
</tr>
</tbody>
</table>

### Shutting Down the Operating System
To shut down the system and power off the operating system, run the following command as the user  **root**:

```
systemctl poweroff
```

To shut down the operating system without powering it off, run the following command as the user  **root**:

```
systemctl halt
```

By default, running either of these commands causes systemd to send an informative message to all login users. To prevent systemd from sending this message, run this command with the  **\-\-no\-wall**  option. The command is as follows:

```
systemctl --no-wall poweroff
```

### Restarting the Operating System
To restart the operating system, run the following command as the user  **root**:

```
systemctl reboot
```

By default, running either of these commands causes systemd to send an informative message to all login users. To prevent systemd from sending this message, run this command with the  **\-\-no\-wall**  option. The command is as follows:

```
systemctl --no-wall reboot
```

### Suspending the Operating System
To suspend the operating system, run the following command as the user  **root**:

```
systemctl suspend
```

### Hibernating the Operating System
To hibernate the operating system, run the following command as the user  **root**:

```
systemctl hibernate
```

To suspend and hibernate the operating system, run the following command as the user  **root**:

```
systemctl hybrid-sleep
```
