# Using the KAE
<!-- TOC -->

- [Using the KAE](#using-the-kae)
    - [Overview](#overview)
    - [Application Scenarios](#application-scenarios)
    - [Installing, Running, and Uninstalling the KAE](#installing-running-and-uninstalling-the-kae)
        - [Installing the Accelerator Software Packages](#installing-the-accelerator-software-packages)
        - [Upgrading the Accelerator Software Packages](#upgrading-the-accelerator-software-packages)
        - [Uninstalling the Accelerator Software Packages](#uninstalling-the-accelerator-software-packages)
    - [Querying Logs](#querying-logs)
    - [Acceleration Engine Application](#acceleration-engine-application)
        - [Example Code for the KAE](#example-code-for-the-kae)
        - [Using the KAE in the OpenSSL Configuration File openssl.cnf](#using-the-kae-in-the-openssl-configuration-file-opensslcnf)
    - [Troubleshooting](#troubleshooting)
        - [Initialization Failure](#initialization-failure)
        - [Failed to Identify Accelerator Devices After the Acceleration Engine Is Installed](#failed-to-identify-accelerator-devices-after-the-acceleration-engine-is-installed)
        - [Failed to Upgrade the Accelerator Drivers](#failed-to-upgrade-the-accelerator-drivers)

<!-- /TOC -->
## Overview

Kunpeng Accelerator Engine \(KAE\) is a software acceleration library of openEuler, which provides hardware acceleration engine function on the Kunpeng 920 processor. The engine supports symmetric encryption, asymmetric encryption, and digital signature. It is ideal for accelerating SSL/TLS applications, and can significantly reduce processor consumption and improve processor efficiency. In addition, users can quickly migrate existing services through the standard OpenSSL interface.

The KAE supports the following algorithms:

-   Digest algorithm SM3, which supports the asynchronous mode.
-   Symmetric encryption algorithm SM4, which supports asynchronous, CTR, XTS, and CBC modes.

-   Symmetric encryption algorithm AES, which supports asynchronous, ECB, CTR, XTS, and CBC modes.
-   Asymmetric algorithm RSA, which supports asynchronous mode, and key sizes 1024, 2048, 3072, and 4096.
-   Key negotiation algorithm DH, which supports asynchronous mode, and key sizes 768, 1024, 1536, 2048, 3072, and 4096.

## Application Scenarios

The KAE applies to the following scenarios, as shown in  [Table 1](#table11915824163418).

**Table  1**  Application scenarios

<a name="table11915824163418"></a>
<table><thead align="left"><tr id="row12819762"><th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.1"><p id="p31767774"><a name="p31767774"></a><a name="p31767774"></a>Scenario</p>
</th>
<th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.2"><p id="p55347837"><a name="p55347837"></a><a name="p55347837"></a>Data</p>
</th>
</tr>
</thead>
<tbody><tr id="row53989823"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p11099566"><a name="p11099566"></a><a name="p11099566"></a>Big data</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p11137969"><a name="p11137969"></a><a name="p11137969"></a>Stream data</p>
</td>
</tr>
<tr id="row33132859"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p66515904"><a name="p66515904"></a><a name="p66515904"></a>Data encryption</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p1907972"><a name="p1907972"></a><a name="p1907972"></a>Block data</p>
</td>
</tr>
<tr id="row17171756"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p48735027"><a name="p48735027"></a><a name="p48735027"></a>Intelligent security protection</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p43884268"><a name="p43884268"></a><a name="p43884268"></a>Video stream data</p>
</td>
</tr>
<tr id="row59414099"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p47812724"><a name="p47812724"></a><a name="p47812724"></a>Web service</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p32455223"><a name="p32455223"></a><a name="p32455223"></a>Handshake connections</p>
</td>
</tr>
</tbody>
</table>

## Installing, Running, and Uninstalling the KAE



### Installing the Accelerator Software Packages



#### Preparing for Installation

##### Environment Requirements
-   The accelerator engine is enabled on TaiShan 200 servers.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>-   You need to import the accelerator license. For details, see section "License Management" in the  [TaiShan Rack Server iBMC \(V500 or Later\) User Guide](https://support.huawei.com/enterprise/en/doc/EDOC1100121685/426cffd9?idPath=7919749|9856522|21782478|8060757).  
>-   If the accelerator is used in the physical machine scenario, the SMMU must be disabled. For details, see the  [TaiShan 200 Server BIOS Parameter Reference](https://support.huawei.com/enterprise/en/doc/EDOC1100088647).  

-   CPU: Kunpeng 920
-   OS: openEuler-20.03-LTS-aarch64-dvd.iso

##### KAE Software Description
**Table  2**  RPM software packages of the KAE

<a name="table9060076"></a>
<table><thead align="left"><tr id="row36699979"><th class="cellrowborder" valign="top" width="48.57%" id="mcps1.2.3.1.1"><p id="p19908318"><a name="p19908318"></a><a name="p19908318"></a><strong id="b842352706103848"><a name="b842352706103848"></a><a name="b842352706103848"></a>Software Package</strong></p>
</th>
<th class="cellrowborder" valign="top" width="51.43%" id="mcps1.2.3.1.2"><p id="p1961070"><a name="p1961070"></a><a name="p1961070"></a><strong id="b842352706154240"><a name="b842352706154240"></a><a name="b842352706154240"></a>Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="row48788899"><td class="cellrowborder" valign="top" width="48.57%" headers="mcps1.2.3.1.1 "><p id="p59586712"><a name="p59586712"></a><a name="p59586712"></a>kae_driver-<em id="i93394206582"><a name="i93394206582"></a><a name="i93394206582"></a>version number</em>-<em id="i184257245581"><a name="i184257245581"></a><a name="i184257245581"></a>1.OS type</em>.aarch64.rpm</p>
</td>
<td class="cellrowborder" valign="top" width="51.43%" headers="mcps1.2.3.1.2 "><p id="p61794345"><a name="p61794345"></a><a name="p61794345"></a>Accelerator driver, including the uacce.ko, hisi_qm.ko, hisi_sec2.ko, and hisi_hpre.ko kernel modules.</p>
<p id="p186913584617"><a name="p186913584617"></a><a name="p186913584617"></a>Support: SM3, SM4, AES, RSA, and DH algorithms.</p>
</td>
</tr>
<tr id="row49528506"><td class="cellrowborder" valign="top" width="48.57%" headers="mcps1.2.3.1.1 "><p id="p52386074"><a name="p52386074"></a><a name="p52386074"></a>libwd-<em id="i071418435561"><a name="i071418435561"></a><a name="i071418435561"></a>version number</em>-<em id="i096243095817"><a name="i096243095817"></a><a name="i096243095817"></a>1.OS type</em>.aarch64.rpm</p>
</td>
<td class="cellrowborder" valign="top" width="51.43%" headers="mcps1.2.3.1.2 "><p id="p15413619"><a name="p15413619"></a><a name="p15413619"></a>Coverage: <strong id="b4202013529"><a name="b4202013529"></a><a name="b4202013529"></a>libwd.so</strong> dynamic link library.</p>
<p id="p4504844"><a name="p4504844"></a><a name="p4504844"></a>It provides interfaces for the KAE.</p>
</td>
</tr>
<tr id="row40543596"><td class="cellrowborder" valign="top" width="48.57%" headers="mcps1.2.3.1.1 "><p id="p62805805"><a name="p62805805"></a><a name="p62805805"></a>libkae-<em id="i34342116598"><a name="i34342116598"></a><a name="i34342116598"></a>version number</em>-<em id="i1643152113599"><a name="i1643152113599"></a><a name="i1643152113599"></a>1.OS type</em>.aarch64.rpm</p>
</td>
<td class="cellrowborder" valign="top" width="51.43%" headers="mcps1.2.3.1.2 "><p id="p54105439"><a name="p54105439"></a><a name="p54105439"></a>Dependency: libwd RPM package.</p>
<p id="p17186905"><a name="p17186905"></a><a name="p17186905"></a>Coverage: <strong id="b121301253165118"><a name="b121301253165118"></a><a name="b121301253165118"></a>libkae.so</strong> dynamic library.</p>
<p id="p20464425"><a name="p20464425"></a><a name="p20464425"></a>Support: SM3, SM4, AES, RSA, and DH algorithms.</p>
</td>
</tr>
</tbody>
</table>

#### Installing the Accelerator Software Package

##### Prerequisites
-   The remote SSH login tool has been installed on the local PC.
-   The openEuler OS has been installed.
-   The RPM tool is running properly.
-   OpenSSL 1.1.1a or a later version has been installed.

    You can run the following commands to query the version number of OpenSSL:

    -   openssl version


##### Procedure
1.  Log in to the openEuler OS CLI as user  **root**.
2.  Create a directory for storing accelerator engine software packages.
3.  Use SSH to copy all accelerator engine software package to the created directory.
4.  In the directory, run the  **rpm -ivh**  command to install the accelerator engine software packages.

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >Install the  **libwd**  package first because the  **libkae**  package installation depends on the  **libwd**  package.  

    ```
    rpm -ivh uacce*.rpm hisi*.rpm libwd-*.rpm libkae*.rpm
    ```

    ```
    Verifying...                          ################################# [100%]
    Preparing...                          ################################# [100%]
    checking installed modules
    uacce modules start to install
    Updating / installing...
       1:uacce-1.2.10-4.oe1               ################################# [ 14%]
    uacce modules installed
       2:libwd-1.2.10-3.oe1               ################################# [ 29%]
       3:libkae-1.2.10-3.oe1              ################################# [ 43%]
    checking installed modules
    hisi_hpre modules start to install
       4:hisi_hpre-1.2.10-4.oe1           ################################# [ 57%]
    hisi_hpre modules installed
    checking installed modules
    hisi_rde modules start to install
       5:hisi_rde-1.2.10-4.oe1            ################################# [ 71%]
    hisi_rde modules installed
    checking installed modules
    hisi_sec2 modules start to install
       6:hisi_sec2-1.2.10-4.oe1           ################################# [ 86%]
    hisi_sec2 modules installed
    checking installed modules
    hisi_zip modules start to install
       7:hisi_zip-1.2.10-4.oe1            ################################# [100%]
    hisi_zip modules installed
    ```

5.  Run the  **rpm -qa**  command to check whether the accelerator software packages have been installed properly. Run the  **rpm -ql**  command to check whether files in the software packages are correct. The following is an example:

    ```
    rpm -qa|grep -E "hisi|uacce|libwd|libkae"
    ```

    ```
    hisi_rde-1.2.10-4.oe1.aarch64
    hisi_sec2-1.2.10-4.oe1.aarch64
    libkae-1.2.10-3.oe1.aarch64
    hisi_hpre-1.2.10-4.oe1.aarch64
    uacce-1.2.10-4.oe1.aarch64
    libwd-1.2.10-3.oe1.aarch64
    hisi_zip-1.2.10-4.oe1.aarch64
    ```

    ```
    rpm -ql uacce hisi* libwd* libkae
    ```

    ```
    /lib/modules/4.19.90-2003.4.0.0036.oe1.aarch64/extra/hisi_qm.ko
    /lib/modules/4.19.90-2003.4.0.0036.oe1.aarch64/extra/uacce.ko
    /etc/modprobe.d/hisi_hpre.conf
    /lib/modules/4.19.90-2003.4.0.0036.oe1.aarch64/extra/hisi_hpre.ko
    /etc/modprobe.d/hisi_rde.conf
    /lib/modules/4.19.90-2003.4.0.0036.oe1.aarch64/extra/hisi_rde.ko
    /etc/modprobe.d/hisi_sec2.conf
    /lib/modules/4.19.90-2003.4.0.0036.oe1.aarch64/extra/hisi_sec2.ko
    /etc/modprobe.d/hisi_zip.conf
    /lib/modules/4.19.90-2003.4.0.0036.oe1.aarch64/extra/hisi_zip.ko
    /usr/include/warpdrive/config.h
    /usr/include/warpdrive/include/uacce.h
    /usr/include/warpdrive/smm.h
    /usr/include/warpdrive/wd.h
    /usr/include/warpdrive/wd_bmm.h
    /usr/include/warpdrive/wd_cipher.h
    /usr/include/warpdrive/wd_comp.h
    /usr/include/warpdrive/wd_dh.h
    /usr/include/warpdrive/wd_digest.h
    /usr/include/warpdrive/wd_rsa.h
    /usr/lib64/libwd.so.1.2.10
    /usr/local/lib/engines-1.1/libkae.so.1.2.10
    ```

6.  Restart the system or run commands to manually load the accelerator engine drivers to the kernel in sequence, and check whether the drivers are successfully loaded.

    ```
    # modprobe uacce 
    # lsmod | grep uacce 
    # modprobe hisi_qm
    # lsmod | grep hisi_qm 
    # modprobe hisi_qm
    # modprobe hisi_sec2 # Loads the hisi_sec2 driver to the kernel based on the configuration file in /etc/modprobe.d/hisi_sec2.conf.
    # modprobe hisi_hpre # Loads the hisi_hpre driver to the kernel based on the configuration file in /etc/modprobe.d/hisi_hpre.conf.
    ```


##### Setting Environment Variables
Run the following command to export the environment variable \(If you have specified the installation directory, use the actual installation directory instead of  **/usr/local**\):

```
export OPENSSL_ENGINES=/usr/local/lib/engines-1.1
```

##### Performing the Post-Installation Check
Run the  **rpm -qa**  command to check whether the accelerator engine software packages are successfully installed.

If the command output contains  _software package name_**-**_version number_**-**, the software package is successfully installed. The following is an example:

```
rpm -qa|grep -E "hisi|uacce|libwd|libkae"
```

```
hisi_rde-1.2.10-4.oe1.aarch64
hisi_sec2-1.2.10-4.oe1.aarch64
libkae-1.2.10-3.oe1.aarch64
hisi_hpre-1.2.10-4.oe1.aarch64
uacce-1.2.10-4.oe1.aarch64
libwd-1.2.10-3.oe1.aarch64
hisi_zip-1.2.10-4.oe1.aarch64
```

#### Performing Required Operations After Installation

##### Testing the OpenSSL Accelerator Engine

You can run the following commands to test some accelerator functions.

-   Use the OpenSSL software algorithm to test the RSA performance.

    ```
    linux-rmw4:/usr/local/bin # ./openssl speed -elapsed rsa2048
    ...
                     sign    verify    sign/s verify/s
    rsa 2048 bits 0.001384s 0.000035s   724.1  28365.8.
    ```

-   Use the KAE to test the RSA performance.

    ```
    linux-rmw4:/usr/local/bin # ./openssl speed -elapsed -engine kae rsa2048
    ....
                     sign    verify    sign/s verify/s
    rsa 2048 bits 0.000355s 0.000022s   2819.0  45478.4
    ```


>![](public_sys-resources/icon-note.gif) **NOTE:**   
>\#After KAE acceleration, the signature performance is improved from 724.1 sign/s to 2819 sign/s.  

-   Use the OpenSSL software algorithm to test the asynchronous RSA performance.

    ```
    linux-rmw4:/usr/local/bin # ./openssl speed -elapsed -async_jobs 36 rsa2048 
    ....
                      sign    verify    sign/s verify/s
    rsa 2048 bits 0.001318s 0.000032s    735.7  28555
    ```

-   Use the KAE to test the asynchronous RSA performance.

    ```
    linux-rmw4:/usr/local/bin # ./openssl speed -engine kae -elapsed -async_jobs 36 rsa2048 
    .... 
                      sign    verify    sign/s verify/s
    rsa 2048 bits 0.000018s 0.000009s  54384.1 105317.0
    ```


>![](public_sys-resources/icon-note.gif) **NOTE:**   
>\#After KAE acceleration, the asynchronous RSA signature performance is improved from 735.7 sign/s to 54384.1 sign/s.  

-   Use the OpenSSL software algorithm to test the performance of the SM4 CBC mode.

    ```
    linux-rmw4:/usr/local/bin # ./openssl speed -elapsed -evp sm4-cbc
    You have chosen to measure elapsed time instead of user CPU time.
    ....
    Doing sm4-cbc for 3s on 10240 size blocks: 2196 sm4-cbc's in 3.00s  ....
    type          51200 bytes 102400 bytes1048576 bytes2097152 bytes4194304 bytes8388608 bytes
    sm4-cbc          82312.53k    85196.80k    85284.18k    85000.85k    85284.18k    85261.26k
    ```

-   Use the KAE to test the SM4 CBC mode performance.

    ```
    linux-rmw4:/usr/local/bin # ./openssl speed -elapsed -engine kae -evp sm4-cbc
    engine "kae" set. 
    You have chosen to measure elapsed time instead of user CPU time.
    ...
    Doing sm4-cbc for 3s on 1048576 size blocks: 11409 sm4-cbc's in 3.00s
    ...
    type          51200 bytes 102400 bytes1048576 bytes2097152 bytes4194304 bytes8388608 bytes
    sm4-cbc         383317.33k   389427.20k   395313.15k   392954.73k   394264.58k   394264.58k
    ```


>![](public_sys-resources/icon-note.gif) **NOTE:**   
>After KAE acceleration, the SM4 CBC mode performance is improved from 82312.53 kbit/s to 383317.33 kbit/s when the input data block size is 8 MB.  

-   Use the OpenSSL software algorithm to test the SM3 mode performance.

    ```
    linux-rmw4:/usr/local/bin # ./openssl speed -elapsed -evp sm3
    You have chosen to measure elapsed time instead of user CPU time.
    Doing sm3 for 3s on 102400 size blocks: 1536 sm3's in 3.00s
    ....
    type          51200 bytes 102400 bytes1048576 bytes2097152 bytes4194304 bytes8388608 bytes
    sm3              50568.53k    52428.80k    52428.80k    52428.80k    52428.80k    52428.80k
    ```

-   Use the KAE to test the SM3 mode performance.

    ```
    linux-rmw4:/usr/local/bin # ./openssl speed -elapsed -engine kae -evp sm3
    engine "kae" set.
    You have chosen to measure elapsed time instead of user CPU time.
    Doing sm3 for 3s on 102400 size blocks: 19540 sm3's in 3.00s
    ....
    type            51200 bytes  102400 bytes  1048576 bytes 2097152 bytes 4194304 bytes 8388608 bytes
    sm3             648243.20k   666965.33k   677030.57k   678778.20k   676681.05k   668292.44k
    ```


>![](public_sys-resources/icon-note.gif) **NOTE:**   
>After KAE acceleration, the SM3 algorithm performance is improved from 52428.80 kbit/s to 668292.44 kbit/s when the input data block size is 8 MB.  

-   Use the OpenSSL software algorithm to test the asynchronous performance of the AES algorithm in CBC mode.

    ```
    linux-rmw4:/usr/local/bin # ./openssl speed -elapsed -evp aes-128-cbc -async_jobs 4
    You have chosen to measure elapsed time instead of user CPU time.
    Doing aes-128-cbc for 3s on 51200 size blocks: 65773 aes-128-cbc's in 3.00s
    Doing aes-128-cbc for 3s on 102400 size blocks: 32910 aes-128-cbc's in 3.00s
    ....
    type          51200 bytes 102400 bytes1048576 bytes2097152 bytes4194304 bytes8388608 bytes
    aes-128-cbc    1122525.87k  1123328.00k  1120578.22k  1121277.27k  1119879.17k  1115684.86k
    ```

-   Use the KEA engine to test the asynchronous performance of the AES algorithm in CBC mode.

    ```
    linux-rmw4:/usr/local/bin # ./openssl speed -elapsed -evp aes-128-cbc -async_jobs 4 -engine kae
    engine "kae" set.
    You have chosen to measure elapsed time instead of user CPU time.
    Doing aes-128-cbc for 3s on 51200 size blocks: 219553 aes-128-cbc's in 3.00s
    Doing aes-128-cbc for 3s on 102400 size blocks: 117093 aes-128-cbc's in 3.00s
    ....
    type          51200 bytes 102400 bytes1048576 bytes2097152 bytes4194304 bytes8388608 bytes
    aes-128-cbc    3747037.87k  3996774.40k  1189085.18k  1196774.74k  1196979.11k  1199570.94k
    ```


>![](public_sys-resources/icon-note.gif) **NOTE:**   
>-   The AES algorithm supports only asynchronous usage when the data length is 256 KB or less.  
>-   After KAE acceleration, the AES algorithm performance is improved from 1123328.00 kbit/s to 3996774.40 kbit/s when the input data block size is 100 KB.  

### Upgrading the Accelerator Software Packages

#### Scenario
You can run the  **rpm -Uvh**  command to upgrade the accelerator software.

#### Procedure
1.  Download the latest accelerator engine software packages from the openEuler community.
2.  Use SSH to log in to the Linux CLI as user  **root**.
3.  Save the downloaded software packages to a directory.
4.  In the directory, run the  **rpm -Uvh**  command to upgrade the accelerator driver package and engine library package. The following is an example:

    The command and output are as follows:

    ![](figures/en-us_image_0231143189.png)

    ![](figures/en-us_image_0231143191.png)

5.  Run the  **rpm -qa**  command to check whether the upgrade is successful. Ensure that the queried version is the latest version.

    ![](figures/en-us_image_0231143193.png)

    ![](figures/en-us_image_0231143195.png)

6.  Restart the system or run the following commands to manually uninstall the drivers of the earlier version, load the drivers of the latest version, and check whether the new drivers are successfully loaded.

    ```
    Uninstall the existing drivers.
    # lsmod | grep uacce 
    uacce                 262144  3 hisi_hpre,hisi_sec2,hisi_qm 
    # 
    # rmmod hisi_hpre 
    # rmmod hisi_sec2 
    # rmmod hisi_qm 
    # rmmod uacce 
    # lsmod | grep uacce 
    # 
    Load the new drivers.# modprobe uacce
    # modprobe hisi_qm# modprobe hisi_sec2 #Loads the hisi_sec2 driver to the kernel based on the configuration file in /etc/modprobe.d/hisi_sec2.conf.
    # modprobe hisi_hpre  #Loads the hisi_hpre driver to the kernel based on the configuration file in /etc/modprobe.d/hisi_hpre.conf.
    # lsmod | grep uacce 
    uacce                36864  3 hisi_sec2,hisi_qm,hisi_hpre
    ```


### Uninstalling the Accelerator Software Packages

#### Scenario
You do not need the accelerator engine software or you want to install new accelerator engine software.

#### Procedure
1.  Use SSH to log in to the Linux CLI as user  **root**.
2.  Restart the system or run commands to manually uninstall the accelerator drivers loaded to the kernel, and check whether the drivers are successfully uninstalled.

    ```
    # lsmod | grep uacce 
    uacce                36864  3 hisi_sec2,hisi_qm,hisi_hpre 
    # rmmod hisi_hpre 
    # rmmod hisi_sec2  
    # rmmod hisi_qm 
    # rmmod uacce 
    # lsmod | grep uacce 
    #
    ```

3.  Run the  **rpm -e**  command to uninstall the accelerator engine software packages. The following is an example:

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >Due to the dependency relationships, the  **libkae**  package must be uninstalled before the  **libwd**  package.  

    ![](figures/en-us_image_0231143196.png)

    ![](figures/en-us_image_0231143197.png)

4.  Run the  **rpm -qa |grep**  command to check whether the uninstallation is successful.

    ![](figures/en-us_image_0231143198.png)


## Querying Logs

[Table 3](#table52821836)  lists log information related to the accelerator engine.

**Table  3**  Log information

<a name="table52821836"></a>
<table><thead align="left"><tr id="row62537016"><th class="cellrowborder" valign="top" width="28.28282828282828%" id="mcps1.2.4.1.1"><p id="p32333556"><a name="p32333556"></a><a name="p32333556"></a>Directory</p>
</th>
<th class="cellrowborder" valign="top" width="27.27272727272727%" id="mcps1.2.4.1.2"><p id="p1772413"><a name="p1772413"></a><a name="p1772413"></a>File</p>
</th>
<th class="cellrowborder" valign="top" width="44.44444444444445%" id="mcps1.2.4.1.3"><p id="p9347770"><a name="p9347770"></a><a name="p9347770"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="row18971924"><td class="cellrowborder" valign="top" width="28.28282828282828%" headers="mcps1.2.4.1.1 "><p id="p60330866"><a name="p60330866"></a><a name="p60330866"></a>/var/log/</p>
</td>
<td class="cellrowborder" valign="top" width="27.27272727272727%" headers="mcps1.2.4.1.2 "><p id="p54961981"><a name="p54961981"></a><a name="p54961981"></a>kae.log</p>
</td>
<td class="cellrowborder" valign="top" width="44.44444444444445%" headers="mcps1.2.4.1.3 "><p id="p22735452"><a name="p22735452"></a><a name="p22735452"></a>By default, the log level of the OpenSSL engine log is <strong id="b0271153255912"><a name="b0271153255912"></a><a name="b0271153255912"></a>error</strong>. To set the log level, perform the following procedure:</p>
<a name="ol3292479"></a><a name="ol3292479"></a><ol id="ol3292479"><li>Run <strong id="b3236183234914"><a name="b3236183234914"></a><a name="b3236183234914"></a>export KAE_CONF_ENV=/var/log/</strong>.</li><li>Create the <strong id="b10293194619016"><a name="b10293194619016"></a><a name="b10293194619016"></a>kae.cnf</strong> file in <strong id="b82946461903"><a name="b82946461903"></a><a name="b82946461903"></a>/var/log/</strong>.</li><li>In the <strong id="b162251191116"><a name="b162251191116"></a><a name="b162251191116"></a>kae.cnf</strong> file, configure the content as follows:<p id="p60010105"><a name="p60010105"></a><a name="p60010105"></a>[LogSection]</p>
<p id="p3220036"><a name="p3220036"></a><a name="p3220036"></a>debug_level=error #Value: <strong id="b203790579120"><a name="b203790579120"></a><a name="b203790579120"></a>none</strong>, <strong id="b46045913113"><a name="b46045913113"></a><a name="b46045913113"></a>error</strong>, <strong id="b4532501620"><a name="b4532501620"></a><a name="b4532501620"></a>info</strong>, <strong id="b119954316214"><a name="b119954316214"></a><a name="b119954316214"></a>warning</strong> or <strong id="b27231361722"><a name="b27231361722"></a><a name="b27231361722"></a>debug</strong></p>
</li></ol>
<div class="note" id="note28980331"><a name="note28980331"></a><a name="note28980331"></a><span class="notetitle"> NOTE: </span><div class="notebody"><p class="textintable" id="p59496389"><a name="p59496389"></a><a name="p59496389"></a>In normal cases, you are advised not to enable the <strong id="b21311424624"><a name="b21311424624"></a><a name="b21311424624"></a>info</strong> or <strong id="b99951227621"><a name="b99951227621"></a><a name="b99951227621"></a>debug</strong> log level. Otherwise, the accelerator performance will deteriorate.</p>
</div></div>
</td>
</tr>
<tr id="row65705461"><td class="cellrowborder" valign="top" width="28.28282828282828%" headers="mcps1.2.4.1.1 "><p id="p20542144"><a name="p20542144"></a><a name="p20542144"></a>/var/log/</p>
</td>
<td class="cellrowborder" valign="top" width="27.27272727272727%" headers="mcps1.2.4.1.2 "><p id="p53300980"><a name="p53300980"></a><a name="p53300980"></a>message/syslog</p>
</td>
<td class="cellrowborder" valign="top" width="44.44444444444445%" headers="mcps1.2.4.1.3 "><a name="ul22412087"></a><a name="ul22412087"></a><ul id="ul22412087"><li>Kernel logs are stored in the <strong id="b24957411319"><a name="b24957411319"></a><a name="b24957411319"></a>/var/log/message</strong> directory.</li></ul>
<div class="note" id="note30958167"><a name="note30958167"></a><a name="note30958167"></a><span class="notetitle"> NOTE: </span><div class="notebody"><p class="textintable" id="p10188049"><a name="p10188049"></a><a name="p10188049"></a>Alternatively, you can run the <strong id="b43486522218"><a name="b43486522218"></a><a name="b43486522218"></a>dmesg &gt; /var/log/dmesg.log</strong> command to collect driver and kernel logs.</p>
</div></div>
</td>
</tr>
</tbody>
</table>

## Acceleration Engine Application

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>If you have not purchased the engine license, you are advised not to use the KAE engine to invoke the corresponding algorithms. Otherwise, the performance of the OpenSSL encryption algorithm may be affected.  



### Example Code for the KAE

```
#include <stdio.h> 

#include <stdlib.h> 

/* OpenSSL headers */ 

#include <openssl/bio.h> 

#include <openssl/ssl.h> 

#include <openssl/err.h> 

#include <openssl/engine.h> 

int main(int argc, char **argv) 

{ 

    /* Initializing OpenSSL */ 

    SSL_load_error_strings(); 

    ERR_load_BIO_strings(); 

    OpenSSL_add_all_algorithms(); 

    /*You can use ENGINE_by_id Function to get the handle of the Huawei Accelerator Engine*/ 

    ENGINE *e = ENGINE_by_id("kae"); 

    /* Enable the accelerator asynchronization function. This parameter is optional. The value 0 indicates disabled, and the value 1 indicates enabled. The asynchronous function is enabled by default. */

    ENGINE_ctrl_cmd_string(e, "KAE_CMD_ENABLE_ASYNC", "1", 0) 

    ENGINE_init(e); 

    RSA*rsa=RSA_new_method(e);#Specify the engine for RSA encryption and decryption.

    /*The user code*/ 

    ...... 

; 

    ENGINE_free(e); 

; 

}
```

### Using the KAE in the OpenSSL Configuration File openssl.cnf

Create the  **openssl.cnf**  file and add the following configuration information to the file:

```
openssl_conf=openssl_def 
[openssl_def] 
engines=engine_section 
[engine_section] 
kae=kae_section 
[kae_section] 
engine_id=kae 
dynamic_path=/usr/local/lib/engines-1.1/kae.so 
KAE_CMD_ENABLE_ASYNC=1 #The value 0 indicates that the asynchronous function is disabled. The value 1 indicates that the asynchronous function is enabled. The asynchronous function is enabled by default.
default_algorithms=ALL 
init=1
```

Export the environment variable  **OPENSSL\_CONF**.

```
export OPENSSL_CONF=/home/app/openssl.cnf #Path for storing the openssl.cnf file
```

The following is an example of the OpenSSL configuration file:

```
#include <stdio.h>  

#include <stdlib.h>  

/* OpenSSL headers */  

#include <openssl/bio.h>  

#include <openssl/ssl.h>  

#include <openssl/err.h>  

#include <openssl/engine.h>  

int main(int argc, char **argv)  

{  

    /* Initializing OpenSSL */  

    SSL_load_error_strings();  

    ERR_load_BIO_strings();  

#Load openssl configure 

OPENSSL_init_crypto(OPENSSL_INIT_LOAD_CONFIG, NULL);    OpenSSL_add_all_algorithms();  

    /*You can use ENGINE_by_id Function to get the handle of the Huawei Accelerator Engine*/  

    ENGINE *e = ENGINE_by_id("kae"); 

    /*The user code*/  

    ......  

;  

    ENGINE_free(e);  

;
}
```

## Troubleshooting



### Initialization Failure

#### Symptom
The accelerator engine is not completely loaded due to an initialization failure.

#### Solution
1.  Check whether the accelerator drivers are loaded successfully. Specifically, run the  **lsmod**  command to check whether uacce.ko, qm.ko, sgl.ko, hisi\_sec2.ko, hisi\_hpre.ko, hisi\_zip.ko, and hisi\_rde.ko exist.

    ```
    # lsmod | grep uacce
    uacce                  262144  2 hisi_hpre,hisi_qm,hisi_sec2,hisi_zip,hisi_rde
    ```

2.  Check whether the accelerator engine library exists in  **/usr/lib64**  \(directory for RPM installation\) or  **/usr/local/lib**  \(directory for source code installation\) and the OpenSSL installation directory, and check whether the correct soft link is established.

    ```
     [root@localhost home]# ll /usr/local/lib/engines-1.1/ |grep kae 
    #Check whether the KAE has been correctly installed and whether a soft link has been established. If yes, the displayed information is as follows:
    # ll /usr/local/lib/engines-1.1/ |grep kae
    lrwxrwxrwx. 1 root root     22 Nov 12 02:33 kae.so -> kae.so.1.0.1
    lrwxrwxrwx. 1 root root     22 Nov 12 02:33 kae.so.0 -> kae.so.1.0.1
    -rwxr-xr-x. 1 root root 112632 May 25  2019 kae.so.1.0.1
    [[root@localhost home]#
     [root@localhost home]# ll /usr/lib64/ | grep libwd  
    #Check whether libwd has been correctly installed and whether a soft link has been established. If yes, the displayed information is as follows:
    lrwxrwxrwx.  1 root root       14 Nov 12 02:33 libwd.so -> libwd.so.1.0.1
    lrwxrwxrwx.  1 root root       14 Nov 12 02:33 libwd.so.0 -> libwd.so.1.0.1
    -rwxr-xr-x.  1 root root   137120 May 25  2019 libwd.so.1.0.1
    [root@localhost home]#
    ```

3.  Check whether the path of the OpenSSL engine library can be exported by running the  **export**  command.

    ```
    # echo $OPENSSL_ENGINES 
    # export OPENSSL_ENGINES=/usr/local/lib/engines-1.1
    #  echo $OPENSSL_ENGINES
    /usr/local/lib/engines-1.1
    ```


### Failed to Identify Accelerator Devices After the Acceleration Engine Is Installed

#### Symptom
After the acceleration engine is installed, the accelerator devices cannot be identified.

#### Solution
1.  <a name="li1760055514614"></a>Check whether the device exists in the virtual file system. Normally, the following accelerator devices are displayed:

    ```
    # ls -al /sys/class/uacce/
    total 0
    lrwxrwxrwx. 1 root root 0 Nov 14 03:45 hisi_hpre-2 -> ../../devices/pci0000:78/0000:78:00.0/0000:79:00.0/uacce/hisi_hpre-2
    lrwxrwxrwx. 1 root root 0 Nov 14 03:45 hisi_hpre-3 -> ../../devices/pci0000:b8/0000:b8:00.0/0000:b9:00.0/uacce/hisi_hpre-3
    lrwxrwxrwx. 1 root root 0 Nov 17 22:09 hisi_rde-4 -> ../../devices/pci0000:78/0000:78:01.0/uacce/hisi_rde-4
    lrwxrwxrwx. 1 root root 0 Nov 17 22:09 hisi_rde-5 -> ../../devices/pci0000:b8/0000:b8:01.0/uacce/hisi_rde-5
    lrwxrwxrwx. 1 root root 0 Nov 14 08:39 hisi_sec-0 -> ../../devices/pci0000:74/0000:74:01.0/0000:76:00.0/uacce/hisi_sec-0
    lrwxrwxrwx. 1 root root 0 Nov 14 08:39 hisi_sec-1 -> ../../devices/pci0000:b4/0000:b4:01.0/0000:b6:00.0/uacce/hisi_sec-1
    lrwxrwxrwx. 1 root root 0 Nov 17 22:09 hisi_zip-6 -> ../../devices/pci0000:74/0000:74:00.0/0000:75:00.0/uacce/hisi_zip-6
    lrwxrwxrwx. 1 root root 0 Nov 17 22:09 hisi_zip-7 -> ../../devices/pci0000:b4/0000:b4:00.0/0000:b5:00.0/uacce/hisi_zip-7
    ```

2.  If you want to use the HPRE device but the device is not found in  [1](#li1760055514614), check whether the accelerator software is correctly installed by referring to  [Failed to Upgrade the Accelerator Drivers](#failed-to-upgrade-the-accelerator-drivers).
3.  <a name="li1560012551369"></a>If the accelerator software is correctly installed, run the  **lspci**  command to check whether the physical device exists.

    ```
    # lspci | grep HPRE
    79:00.0 Network and computing encryption device: Huawei Technologies Co., Ltd. HiSilicon HPRE Engine (rev 21)
    b9:00.0 Network and computing encryption device: Huawei Technologies Co., Ltd. HiSilicon HPRE Engine (rev 21)
    ## lspci | grep SEC
    76:00.0 Network and computing encryption device: Huawei Technologies Co., Ltd. HiSilicon SEC Engine (rev 21)
    b6:00.0 Network and computing encryption device: Huawei Technologies Co., Ltd. HiSilicon SEC Engine (rev 21)
    ## lspci | grep RDE
    78:01.0 RAID bus controller: Huawei Technologies Co., Ltd. HiSilicon RDE Engine (rev 21)
    b8:01.0 RAID bus controller: Huawei Technologies Co., Ltd. HiSilicon RDE Engine (rev 21)
    ## lspci | grep ZIP
    75:00.0 Processing accelerators: Huawei Technologies Co., Ltd. HiSilicon ZIP Engine (rev 21)
    b5:00.0 Processing accelerators: Huawei Technologies Co., Ltd. HiSilicon ZIP Engine (rev 21)
    #
    ```

4.  If no physical device is found in  [3](#li1560012551369), perform the following operations:
    -   Check whether the accelerator license has been imported. If no, import the accelerator license. For details, see "License Management" in the  [TaiShan Rack Server iBMC \(V500 or Later\) User Guide](https://support.huawei.com/enterprise/en/doc/EDOC1100121685/426cffd9?idPath=7919749|9856522|21782478|8060757). After the accelerator license is imported, power off and restart the BMC to enable the license.
    -   Check whether the BMC and BIOS versions support the accelerator feature.


### Failed to Upgrade the Accelerator Drivers

#### Symptom
After the accelerator drivers are upgraded, the driver version is not changed after the system is restarted.

#### Possible Cause
Before the accelerator drivers are upgraded, the system upgrades other driver packages. These driver packages may update the boot file system initramfs, and update the accelerator drivers to initramfs before upgrade. For example, if the NIC driver is updated or initramfs is manually updated, the system loads the accelerator drivers from initramfs first during restart.

#### Solution
After the accelerator drivers are upgraded, run the  **dracut \-\-force**  command to update initramfs again.
