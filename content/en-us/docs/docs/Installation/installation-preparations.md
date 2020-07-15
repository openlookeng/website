# Installation Preparations

This section describes the compatibility of the hardware and software and the related configurations and preparations required for the installation.

<!-- TOC -->

- [Installation Preparations](#installation-preparations)
    - [Obtaining the Installation Source](#obtaining-the-installation-source)
    - [Release Package Integrity Check](#release-package-integrity-check)
        - [Introduction](#introduction)
        - [Prerequisites](#prerequisites)
        - [Procedure](#procedure)
    - [Installation Requirements for PMs](#installation-requirements-for-pms)
        - [Hardware Compatibility](#hardware-compatibility)
        - [Minimum Hardware Specifications](#minimum-hardware-specifications)
    - [Installation Requirements for VMs](#installation-requirements-for-vms)
        - [Virtualization Platform Compatibility](#virtualization-platform-compatibility)
        - [Minimum Virtualization Space](#minimum-virtualization-space)

<!-- /TOC -->

## Obtaining the Installation Source

Obtain the openEuler release package and verification file before the installation.

Perform the following operations to obtain the openEuler release package:

1.  Log in to the  [openEuler Community](https://openeuler.org)  website.
2.  Click  **Download**. 
3.  Click the link provided after  **Download ISO**. The download list is displayed.
4.  Click  **openEuler-20.03-LTS**. The openEuler 20.03 LTS version download list is displayed.
5.  Click  **ISO**. The ISO download list is displayed.
    -   **aarch64**: ISO image file of the AArch64 architecture
    -   **x86\_64**: ISO image file of the x86\_64 architecture
    -   **source**: ISO image file of the openEuler source code

6.  Select the openEuler release package and verification file to be downloaded based on the architecture of the environment to be installed.
    -   If the AArch64 architecture is used:
        1.  Click  **aarch64**.
        2.  Click  **openEuler-20.03-LTS-aarch64-dvd.iso**  to download the openEuler release package to the local host.
        3.  Click  **openEuler-20.03-LTS-aarch64-dvd.iso.sha256sum**  to download the openEuler verification file to the local host.

    -   If the x86\_64 architecture is used:
        1.  Click  **x86\_64**.
        2.  Click  **openEuler-20.03-LTS-x86\_64-dvd.iso**  to download the openEuler release package to the local host.
        3.  Click  **openEuler-20.03-LTS-x86\_64-dvd.iso.sha256sum**  to download the openEuler verification file to the local host.

## Release Package Integrity Check

>![](C:/Users/Administrator/Downloads/openDocs/docs/content/en/docs/Installation/public_sys-resources/icon-note.gif) **NOTE:**   
>This section describes how to verify the integrity of the release package in the AArch64 architecture. The procedure for verifying the integrity of the release package in the x86\_64 architecture is the same.  

### Introduction

To prevent the software package from being incompletely downloaded due to network or storage device faults during transmission, you need to verify the integrity of the software package after obtaining it. Only the software packages that pass the verification can be installed.

Compare the verification value recorded in the verification file with the .iso file verification value calculated manually to check whether the software package passes the verification. If the verification values are consistent, the .iso file is not damaged. If they are inconsistent, you can confirm that the file is damaged and you need to obtain the file again.

### Prerequisites

Before verifying the integrity of the release package, you need to prepare the following files:

ISO file:  **openEuler-20.03-LTS-aarch64-dvd.iso**

Verification file:  **openEuler-20.03-LTS-aarch64-dvd.iso.sha256sum**

### Procedure

To verify the file integrity, perform the following operations:

1.  Obtain the verification value in the verification file. Run the following command:

    ```
    #cat openEuler-20.03-LTS-aarch64-dvd.iso.sha256sum 
    ```

2.  Calculate the SHA256 verification value of the file. Run the following command:

    ```
    #sha256sum openEuler-20.03-LTS-aarch64-dvd.iso
    ```

    After the command is run, the verification value is displayed.

3.  Check whether the values calculated in step 1 and step 2 are consistent.

    If the verification values are consistent, the .iso file is not damaged. If they are inconsistent, you can confirm that the file is damaged and you need to obtain the file again.

## Installation Requirements for PMs

To install the openEuler OS on a PM, the PM must meet the following hardware compatibility and minimum hardware requirements.

### Hardware Compatibility

You need to take hardware compatibility into account during openEuler installation.  [Table 1](#table14948632047)  describes the types of supported servers.

>![](C:/Users/Administrator/Downloads/openDocs/docs/content/en/docs/Installation/public_sys-resources/icon-note.gif) **NOTE:**   
>
>-   TaiShan 200 servers are backed by Huawei Kunpeng 920 processors.  
>-   Currently, only Huawei TaiShan and FusionServer Pro servers are supported. More servers from other vendors will be supported in the future.  

**Table  1**  Supported servers

<a name="table14948632047"></a>

<table><thead align="left"><tr id="row5949431547"><th class="cellrowborder" valign="top" width="26.369999999999997%" id="mcps1.2.4.1.1"><p id="p694923843"><a name="p694923843"></a><a name="p694923843"></a>Server Type</p>
</th>
<th class="cellrowborder" valign="top" width="24%" id="mcps1.2.4.1.2"><p id="p132705020556"><a name="p132705020556"></a><a name="p132705020556"></a>Server Name</p>
</th>
<th class="cellrowborder" valign="top" width="49.63%" id="mcps1.2.4.1.3"><p id="p119491131848"><a name="p119491131848"></a><a name="p119491131848"></a>Server Model</p>
</th>
</tr>
</thead>
<tbody><tr id="row8949153348"><td class="cellrowborder" valign="top" width="26.369999999999997%" headers="mcps1.2.4.1.1 "><p id="p4893192424117"><a name="p4893192424117"></a><a name="p4893192424117"></a>Rack server</p>
</td>
<td class="cellrowborder" valign="top" width="24%" headers="mcps1.2.4.1.2 "><p id="p02706012553"><a name="p02706012553"></a><a name="p02706012553"></a>TaiShan 200</p>
</td>
<td class="cellrowborder" valign="top" width="49.63%" headers="mcps1.2.4.1.3 "><p id="p126551941225"><a name="p126551941225"></a><a name="p126551941225"></a>2280 balanced model</p>
</td>
</tr>
<tr id="row104064391909"><td class="cellrowborder" valign="top" width="26.369999999999997%" headers="mcps1.2.4.1.1 "><p id="p54061539609"><a name="p54061539609"></a><a name="p54061539609"></a>Rack server</p>
</td>
<td class="cellrowborder" valign="top" width="24%" headers="mcps1.2.4.1.2 "><p id="p9937105713311"><a name="p9937105713311"></a><a name="p9937105713311"></a>FusionServer Pro </p>
</td>
<td class="cellrowborder" valign="top" width="49.63%" headers="mcps1.2.4.1.3 "><p id="p154063394011"><a name="p154063394011"></a><a name="p154063394011"></a>FusionServer Pro 2288H V5</p>
<div class="note" id="note2046771016316"><a name="note2046771016316"></a><a name="note2046771016316"></a><span class="notetitle"> NOTE: </span><div class="notebody"><p id="p1646710101130"><a name="p1646710101130"></a><a name="p1646710101130"></a>The server must be configured with the Avago SAS3508 RAID controller card and the LOM-X722 NIC.</p>
</div></div>
</td>
</tr>
</tbody>
</table>

### Minimum Hardware Specifications

[Table 2](#tff48b99c9bf24b84bb602c53229e2541)  lists the minimum hardware specifications supported by openEuler.

**Table  2**  Minimum hardware specifications

<a name="tff48b99c9bf24b84bb602c53229e2541"></a>

<table><thead align="left"><tr id="r36f08b63edea4973a8228200caa2a50b"><th class="cellrowborder" valign="top" width="11.19111911191119%" id="mcps1.2.4.1.1"><p id="aef3575d97cdf4dcfb65f8d0c8d2d4a76"><a name="aef3575d97cdf4dcfb65f8d0c8d2d4a76"></a><a name="aef3575d97cdf4dcfb65f8d0c8d2d4a76"></a>Component</p>
</th>
<th class="cellrowborder" valign="top" width="40.06400640064006%" id="mcps1.2.4.1.2"><p id="a919d3bb266c8432fb33c51fa8f3a4fc3"><a name="a919d3bb266c8432fb33c51fa8f3a4fc3"></a><a name="a919d3bb266c8432fb33c51fa8f3a4fc3"></a>Minimum Hardware Specifications</p>
</th>
<th class="cellrowborder" valign="top" width="48.74487448744874%" id="mcps1.2.4.1.3"><p id="a3ac7cf4867974c4990ee6deab716db5f"><a name="a3ac7cf4867974c4990ee6deab716db5f"></a><a name="a3ac7cf4867974c4990ee6deab716db5f"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="r1a3ceb0cc79241c6ba8c5fb800c274e2"><td class="cellrowborder" valign="top" width="11.19111911191119%" headers="mcps1.2.4.1.1 "><p id="af37d7ef138ee45eca00898e0d34a03f4"><a name="af37d7ef138ee45eca00898e0d34a03f4"></a><a name="af37d7ef138ee45eca00898e0d34a03f4"></a>Architecture</p>
</td>
<td class="cellrowborder" valign="top" width="40.06400640064006%" headers="mcps1.2.4.1.2 "><a name="ul262164044016"></a><a name="ul262164044016"></a><ul id="ul262164044016"><li>AArch64</li><li>x86_64</li></ul>
</td>
<td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><a name="ul1830173916388"></a><a name="ul1830173916388"></a><ul id="ul1830173916388"><li>64-bit Arm architecture</li><li>64-bit Intel x86 architecture</li></ul>
</td>
</tr>
<tr id="ra68eff5c33a84bb2be6672a48a643d26"><td class="cellrowborder" valign="top" width="11.19111911191119%" headers="mcps1.2.4.1.1 "><p id="ac0a50d2069ab444cafff180647772df4"><a name="ac0a50d2069ab444cafff180647772df4"></a><a name="ac0a50d2069ab444cafff180647772df4"></a>CPU</p>
</td>
<td class="cellrowborder" valign="top" width="40.06400640064006%" headers="mcps1.2.4.1.2 "><a name="ul97131912175915"></a><a name="ul97131912175915"></a><ul id="ul97131912175915"><li>Huawei Kunpeng 920 series</li><li>Intel <sup>&reg;</sup> Xeon<sup>&reg;</sup> processor</li></ul>
</td>
<td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="a2601e9eece5f4c7bb02881c9ac647a61"><a name="a2601e9eece5f4c7bb02881c9ac647a61"></a><a name="a2601e9eece5f4c7bb02881c9ac647a61"></a>-</p>
</td>
</tr>
<tr id="rf2a5d43b74894a0882b7c17bdfeb697f"><td class="cellrowborder" valign="top" width="11.19111911191119%" headers="mcps1.2.4.1.1 "><p id="ad00611ec129a41a9841fb579eece7804"><a name="ad00611ec129a41a9841fb579eece7804"></a><a name="ad00611ec129a41a9841fb579eece7804"></a>Memory</p>
</td>
<td class="cellrowborder" valign="top" width="40.06400640064006%" headers="mcps1.2.4.1.2 "><p id="a94efe642b8694e5a85747e123b951efc"><a name="a94efe642b8694e5a85747e123b951efc"></a><a name="a94efe642b8694e5a85747e123b951efc"></a>≥ 4 GB (8 GB or higher recommended for better user experience)</p>
</td>
<td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="abfb44d28dca741f68df94e4e276d2410"><a name="abfb44d28dca741f68df94e4e276d2410"></a><a name="abfb44d28dca741f68df94e4e276d2410"></a>-</p>
</td>
</tr>
<tr id="rd2c1ebd93ea64e85a5f3fc88dc5ba456"><td class="cellrowborder" valign="top" width="11.19111911191119%" headers="mcps1.2.4.1.1 "><p id="afd36954546334c1681b5a391bbc386ae"><a name="afd36954546334c1681b5a391bbc386ae"></a><a name="afd36954546334c1681b5a391bbc386ae"></a>Hard disk</p>
</td>
<td class="cellrowborder" valign="top" width="40.06400640064006%" headers="mcps1.2.4.1.2 "><p id="p1224172312719"><a name="p1224172312719"></a><a name="p1224172312719"></a>≥ 120 GB (for better user experience)</p>
</td>
<td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="acc0affdd82e34f32966171e21855ef40"><a name="acc0affdd82e34f32966171e21855ef40"></a><a name="acc0affdd82e34f32966171e21855ef40"></a>The hard disk supports IDE, SATA, SAS interfaces.</p>
</td>
</tr>
</tbody>
</table>

## Installation Requirements for VMs

To install the openEuler OS on a VM, the VM must meet the following hardware compatibility and minimum hardware requirements.

### Virtualization Platform Compatibility

When installing openEuler, pay attention to the compatibility of the virtualization platform. Currently, the following virtualization platforms are supported:

-   A virtualization platform created by the virtualization components \(openEuler as the host OS and QEMU and KVM provided in the release package\) of openEuler
-   x86 virtualization platform of Huawei public cloud

### Minimum Virtualization Space

[Table 3](#tff48b99c9bf24b84bb602c53229e2541)  lists the minimum virtualization space required by openEuler.

**Table  3**  Minimum virtualization space

<a name="tff48b99c9bf24b84bb602c53229e2541"></a>

<table><thead align="left"><tr id="r36f08b63edea4973a8228200caa2a50b"><th class="cellrowborder" valign="top" width="11.511151115111511%" id="mcps1.2.4.1.1"><p id="aef3575d97cdf4dcfb65f8d0c8d2d4a76"><a name="aef3575d97cdf4dcfb65f8d0c8d2d4a76"></a><a name="aef3575d97cdf4dcfb65f8d0c8d2d4a76"></a>Component</p>
</th>
<th class="cellrowborder" valign="top" width="39.74397439743974%" id="mcps1.2.4.1.2"><p id="a919d3bb266c8432fb33c51fa8f3a4fc3"><a name="a919d3bb266c8432fb33c51fa8f3a4fc3"></a><a name="a919d3bb266c8432fb33c51fa8f3a4fc3"></a><strong id="a9386cf027c1e47d99651159bb62130e7"><a name="a9386cf027c1e47d99651159bb62130e7"></a><a name="a9386cf027c1e47d99651159bb62130e7"></a>Minimum Virtualization Space</strong></p>
</th>
<th class="cellrowborder" valign="top" width="48.74487448744874%" id="mcps1.2.4.1.3"><p id="a3ac7cf4867974c4990ee6deab716db5f"><a name="a3ac7cf4867974c4990ee6deab716db5f"></a><a name="a3ac7cf4867974c4990ee6deab716db5f"></a><strong id="a0206841e981640cf833dc2556a7def50"><a name="a0206841e981640cf833dc2556a7def50"></a><a name="a0206841e981640cf833dc2556a7def50"></a>Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="r1a3ceb0cc79241c6ba8c5fb800c274e2"><td class="cellrowborder" valign="top" width="11.511151115111511%" headers="mcps1.2.4.1.1 "><p id="af37d7ef138ee45eca00898e0d34a03f4"><a name="af37d7ef138ee45eca00898e0d34a03f4"></a><a name="af37d7ef138ee45eca00898e0d34a03f4"></a>Architecture</p>
</td>
<td class="cellrowborder" valign="top" width="39.74397439743974%" headers="mcps1.2.4.1.2 "><a name="ul12618156163"></a><a name="ul12618156163"></a><ul id="ul12618156163"><li>AArch64</li><li>x86_64</li></ul>
</td>
<td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="aa0dbd77b34bc472cbad6f8ead108471d"><a name="aa0dbd77b34bc472cbad6f8ead108471d"></a><a name="aa0dbd77b34bc472cbad6f8ead108471d"></a>-</p>
</td>
</tr>
<tr id="ra68eff5c33a84bb2be6672a48a643d26"><td class="cellrowborder" valign="top" width="11.511151115111511%" headers="mcps1.2.4.1.1 "><p id="ac0a50d2069ab444cafff180647772df4"><a name="ac0a50d2069ab444cafff180647772df4"></a><a name="ac0a50d2069ab444cafff180647772df4"></a>CPU</p>
</td>
<td class="cellrowborder" valign="top" width="39.74397439743974%" headers="mcps1.2.4.1.2 "><p id="p847135012587"><a name="p847135012587"></a><a name="p847135012587"></a>Two CPUs</p>
</td>
<td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="a2601e9eece5f4c7bb02881c9ac647a61"><a name="a2601e9eece5f4c7bb02881c9ac647a61"></a><a name="a2601e9eece5f4c7bb02881c9ac647a61"></a>-</p>
</td>
</tr>
<tr id="rf2a5d43b74894a0882b7c17bdfeb697f"><td class="cellrowborder" valign="top" width="11.511151115111511%" headers="mcps1.2.4.1.1 "><p id="ad00611ec129a41a9841fb579eece7804"><a name="ad00611ec129a41a9841fb579eece7804"></a><a name="ad00611ec129a41a9841fb579eece7804"></a>Memory</p>
</td>
<td class="cellrowborder" valign="top" width="39.74397439743974%" headers="mcps1.2.4.1.2 "><p id="a94efe642b8694e5a85747e123b951efc"><a name="a94efe642b8694e5a85747e123b951efc"></a><a name="a94efe642b8694e5a85747e123b951efc"></a>≥ 4 GB (8 GB or higher recommended for better user experience)</p>
</td>
<td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="abfb44d28dca741f68df94e4e276d2410"><a name="abfb44d28dca741f68df94e4e276d2410"></a><a name="abfb44d28dca741f68df94e4e276d2410"></a>-</p>
</td>
</tr>
<tr id="rd2c1ebd93ea64e85a5f3fc88dc5ba456"><td class="cellrowborder" valign="top" width="11.511151115111511%" headers="mcps1.2.4.1.1 "><p id="afd36954546334c1681b5a391bbc386ae"><a name="afd36954546334c1681b5a391bbc386ae"></a><a name="afd36954546334c1681b5a391bbc386ae"></a>Hard disk</p>
</td>
<td class="cellrowborder" valign="top" width="39.74397439743974%" headers="mcps1.2.4.1.2 "><p id="p1224172312719"><a name="p1224172312719"></a><a name="p1224172312719"></a>≥ 32 GB (120 GB or higher recommended for better user experience)</p>
</td>
<td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="acc0affdd82e34f32966171e21855ef40"><a name="acc0affdd82e34f32966171e21855ef40"></a><a name="acc0affdd82e34f32966171e21855ef40"></a>-</p>
</td>
</tr>
</tbody>
</table>



















