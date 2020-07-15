# Preparation

<!-- TOC -->

- [Preparation](#preparation)
    - [Configuring the Development Environment](#configuring-the-development-environment)
        - [OS Requirements](#os-requirements)
    - [Configuring a Repo Source](#configuring-a-repo-source)
        - [Configuring a Repo Source by Directly Obtaining the Repo Source File](#configuring-a-repo-source-by-directly-obtaining-the-repo-source-file)
        - [Configuring a Repo Source by Mounting an ISO File](#configuring-a-repo-source-by-mounting-an-iso-file)
    - [Installing the Software Package](#installing-the-software-package)
        - [Installing the JDK Software Package](#installing-the-jdk-software-package)
        - [Installing the rpm-build Software Package](#installing-the-rpm-build-software-package)
    - [Using the IDE for Java Development](#using-the-ide-for-java-development)
        - [Overview](#overview)
        - [Logging In to the Server Using MobaXterm](#logging-in-to-the-server-using-mobaxterm)
        - [Setting the JDK Environment](#setting-the-jdk-environment)
        - [Downloading and Installing the GTK Library](#downloading-and-installing-the-gtk-library)
        - [Setting X11 Forwarding](#setting-x11-forwarding)
        - [Downloading and Running IntelliJ IDEA](#downloading-and-running-intellij-idea)

<!-- /TOC -->
## Configuring the Development Environment

- If physical machines (PMs) are used, the minimum hardware requirements of the development environment are described in  [Table 1](#table154419352610).
  
  **Table  1**  Minimum hardware specifications
  
  <a name="table154419352610"></a>
  
  <table><thead align="left"><tr id="row4446359618"><th class="cellrowborder" valign="top" width="11.19111911191119%" id="mcps1.2.4.1.1"><p id="p14417351063"><a name="p14417351063"></a><a name="p14417351063"></a><strong id="b1345735965"><a name="b1345735965"></a><a name="b1345735965"></a>Component</strong></p>
  </th>
  <th class="cellrowborder" valign="top" width="40.06400640064006%" id="mcps1.2.4.1.2"><p id="p13451335867"><a name="p13451335867"></a><a name="p13451335867"></a><strong id="b7456351569"><a name="b7456351569"></a><a name="b7456351569"></a>Minimum Hardware Specification</strong></p>
  </th>
  <th class="cellrowborder" valign="top" width="48.74487448744874%" id="mcps1.2.4.1.3"><p id="p184573513616"><a name="p184573513616"></a><a name="p184573513616"></a><strong id="b44553512615"><a name="b44553512615"></a><a name="b44553512615"></a>Description</strong></p>
  </th>
  </tr>
  </thead>
  <tbody><tr id="row1545193517615"><td class="cellrowborder" valign="top" width="11.19111911191119%" headers="mcps1.2.4.1.1 "><p id="p6457351868"><a name="p6457351868"></a><a name="p6457351868"></a>Architecture</p>
  </td>
  <td class="cellrowborder" valign="top" width="40.06400640064006%" headers="mcps1.2.4.1.2 "><a name="ul262164044016"></a><a name="ul262164044016"></a><ul id="ul262164044016"><li>AArch64</li><li>x86_64</li></ul>
  </td>
  <td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><a name="ul1830173916388"></a><a name="ul1830173916388"></a><ul id="ul1830173916388"><li>64-bit Arm architecture</li><li>64-bit Intel x86 architecture</li></ul>
  </td>
  </tr>
  <tr id="row124517351664"><td class="cellrowborder" valign="top" width="11.19111911191119%" headers="mcps1.2.4.1.1 "><p id="p134573512615"><a name="p134573512615"></a><a name="p134573512615"></a>CPU</p>
  </td>
  <td class="cellrowborder" valign="top" width="40.06400640064006%" headers="mcps1.2.4.1.2 "><a name="ul97131912175915"></a><a name="ul97131912175915"></a><ul id="ul97131912175915"><li>Huawei Kunpeng 920 series</li><li>Intel <sup id="sup487664501416"><a name="sup487664501416"></a><a name="sup487664501416"></a>&reg;</sup> Xeon<sup id="sup10571950171416"><a name="sup10571950171416"></a><a name="sup10571950171416"></a>&reg;</sup> processor</li></ul>
  </td>
  <td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="p4455351613"><a name="p4455351613"></a><a name="p4455351613"></a>-</p>
  </td>
  </tr>
  <tr id="row11457358618"><td class="cellrowborder" valign="top" width="11.19111911191119%" headers="mcps1.2.4.1.1 "><p id="p1545163512616"><a name="p1545163512616"></a><a name="p1545163512616"></a>Memory</p>
  </td>
  <td class="cellrowborder" valign="top" width="40.06400640064006%" headers="mcps1.2.4.1.2 "><p id="p1453351269"><a name="p1453351269"></a><a name="p1453351269"></a>≥ 4 GB (8 GB or higher recommended for better user experience)</p>
  </td>
  <td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="p74519351563"><a name="p74519351563"></a><a name="p74519351563"></a>-</p>
  </td>
  </tr>
  <tr id="row445113512611"><td class="cellrowborder" valign="top" width="11.19111911191119%" headers="mcps1.2.4.1.1 "><p id="p24514350612"><a name="p24514350612"></a><a name="p24514350612"></a>Hard disk</p>
  </td>
  <td class="cellrowborder" valign="top" width="40.06400640064006%" headers="mcps1.2.4.1.2 "><p id="p3451035464"><a name="p3451035464"></a><a name="p3451035464"></a>≥ 120 GB (for better user experience)</p>
  </td>
  <td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="p1845133516618"><a name="p1845133516618"></a><a name="p1845133516618"></a>IDE, SATA, SAS interfaces are supported.</p>
  </td>
  </tr>
  </tbody>
  </table>

- If virtual machines (VMs) are used, the minimum virtualization space required for the development environment is described in  [Table 2](#table780410493819).
  
  **Table  2**  Minimum virtualization space
  
  <a name="table780410493819"></a>
  
  <table><thead align="left"><tr id="row138041049682"><th class="cellrowborder" valign="top" width="11.511151115111511%" id="mcps1.2.4.1.1"><p id="p98041649182"><a name="p98041649182"></a><a name="p98041649182"></a><strong id="b188046491883"><a name="b188046491883"></a><a name="b188046491883"></a>Component</strong></p>
  </th>
  <th class="cellrowborder" valign="top" width="39.74397439743974%" id="mcps1.2.4.1.2"><p id="p380418492812"><a name="p380418492812"></a><a name="p380418492812"></a><strong id="b1774971516018"><a name="b1774971516018"></a><a name="b1774971516018"></a>Minimum Virtualization Space</strong></p>
  </th>
  <th class="cellrowborder" valign="top" width="48.74487448744874%" id="mcps1.2.4.1.3"><p id="p580474913816"><a name="p580474913816"></a><a name="p580474913816"></a><strong id="b1580410491682"><a name="b1580410491682"></a><a name="b1580410491682"></a>Description</strong></p>
  </th>
  </tr>
  </thead>
  <tbody><tr id="row180415492085"><td class="cellrowborder" valign="top" width="11.511151115111511%" headers="mcps1.2.4.1.1 "><p id="p10804164916818"><a name="p10804164916818"></a><a name="p10804164916818"></a>Architecture</p>
  </td>
  <td class="cellrowborder" valign="top" width="39.74397439743974%" headers="mcps1.2.4.1.2 "><a name="ul12618156163"></a><a name="ul12618156163"></a><ul id="ul12618156163"><li>AArch64</li><li>x86_64</li></ul>
  </td>
  <td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="p5804849987"><a name="p5804849987"></a><a name="p5804849987"></a>-</p>
  </td>
  </tr>
  <tr id="row18804349380"><td class="cellrowborder" valign="top" width="11.511151115111511%" headers="mcps1.2.4.1.1 "><p id="p080410498820"><a name="p080410498820"></a><a name="p080410498820"></a>CPU</p>
  </td>
  <td class="cellrowborder" valign="top" width="39.74397439743974%" headers="mcps1.2.4.1.2 "><p id="p847135012587"><a name="p847135012587"></a><a name="p847135012587"></a>Two CPUs</p>
  </td>
  <td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="p580454919810"><a name="p580454919810"></a><a name="p580454919810"></a>-</p>
  </td>
  </tr>
  <tr id="row13804849380"><td class="cellrowborder" valign="top" width="11.511151115111511%" headers="mcps1.2.4.1.1 "><p id="p1580454913817"><a name="p1580454913817"></a><a name="p1580454913817"></a>Memory</p>
  </td>
  <td class="cellrowborder" valign="top" width="39.74397439743974%" headers="mcps1.2.4.1.2 "><p id="p1180518499810"><a name="p1180518499810"></a><a name="p1180518499810"></a>≥ 4 GB (8 GB or higher recommended for better user experience)</p>
  </td>
  <td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="p180594918817"><a name="p180594918817"></a><a name="p180594918817"></a>-</p>
  </td>
  </tr>
  <tr id="row13805549588"><td class="cellrowborder" valign="top" width="11.511151115111511%" headers="mcps1.2.4.1.1 "><p id="p4805144913815"><a name="p4805144913815"></a><a name="p4805144913815"></a>Hard disk</p>
  </td>
  <td class="cellrowborder" valign="top" width="39.74397439743974%" headers="mcps1.2.4.1.2 "><p id="p28051499810"><a name="p28051499810"></a><a name="p28051499810"></a>≥ 32 GB (120 GB or higher recommended for better user experience)</p>
  </td>
  <td class="cellrowborder" valign="top" width="48.74487448744874%" headers="mcps1.2.4.1.3 "><p id="p48057494818"><a name="p48057494818"></a><a name="p48057494818"></a>-</p>
  </td>
  </tr>
  </tbody>
  </table>


### OS Requirements

The openEuler OS is required.

For details about how to install the openEuler OS, see the \[*openEuler 20.03 LTS Installation Guide*\](../Installation/Installation.html ). On the  **SOFTWARE SELECTION**  page, select  **Development Tools**  in the  **Add-Ons for Selected Environment**  area.

## Configuring a Repo Source

Configure an online yum source by directly obtaining the online openEuler repo source. Alternatively, configure a local yum source by mounting an ISO file and creating a local openEuler repo source.

### Configuring a Repo Source by Directly Obtaining the Repo Source File

> ![](public_sys-resources/icon-note.gif) **NOTE:**   
> openEuler provides multiple repo sources for users online. For details about the repo sources, see [System Installation](../Releasenotes/installing-the-os.html). This section uses the **openEuler\_aarch64.repo** file as an example to describe how to configure the OS repo source as the yum source.

1. Go to the yum source directory and check the .repo configuration file in the directory.
   
   ```
   $ cd /etc/yum.repos.d
   $ ls 
   openEuler_aarch64.repo
   ```

2. Edit the **openEuler\_aarch64.repo** file as the **root** user. Configure the online openEuler repo source as the yum source.
   
   ```
   # vi openEuler_aarch64.repo
   ```
   
   Edit the  **openEuler\_aarch64.repo**  file as follows:
   
   ```
   [osrepo]
   
   name=osrepo
   
   baseurl=http://repo.openeuler.org/openEuler-20.03-LTS/OS/aarch64/
   
   enabled=1
   
   gpgcheck=1
   gpgkey=http://repo.openeuler.org/openEuler-20.03-LTS/OS/aarch64/RPM-GPG-KEY-openEuler
   ```
   
   ****
   
   
   > ![](public_sys-resources/icon-note.gif) **NOTE:**
   > 
   > - The repoid in \[*repoid* \] indicates the ID of the software repository. Repoids in all .repo configuration files must be unique. In the example, repoid is set to **base**.
   > - **name** indicates the string that the software repository describes.
   > - **baseurl** indicates the address of the software repository.
   > - **enabled** indicates whether to enable the software source repository. The value can be **1** or **0**. The default value is **1**, indicating that the software source repository is enabled.
   > - **gpgcheck** indicates whether to enable the GNU privacy guard (GPG) to check the validity and security of sources of RPM packages.  **1**  indicates GPG check is enabled.  **0**  indicates the GPG check is disabled. If this option is not specified, the GPG check is enabled by default.
   > - **gpgkey** is the public key used to verify the signature.
  

### Configuring a Repo Source by Mounting an ISO File

> ![](public_sys-resources/icon-note.gif) ********NOTE:********   
> openEuler provides multiple ISO release packages. For details about each ISO release package, see [System Installation](../Releasenotes/installing-the-os.html). This section uses the  **openEuler-20.03-LTS-aarch64-dvd.iso**  file and  **openEuler-20.03-LTS-aarch64-dvd.iso.sha256sum**  verification file as examples. Modify them based on the actual requirements.

1. Download the ISO release package.
   
   - Download an ISO image using a cross-platform file transfer tool.
     
     1. Log in to the openEuler community at  [https://openeuler.org](https://openeuler.org).
     
     2. Click  **Download**.
     
     3. Click the link provided after **Download ISO**. The download list is displayed.
     
     4. Select the version to be downloaded, for example, openEuler 20.03 LTS. Then, click  **openEuler-20.03-LTS**. The download list is displayed.
     
     5. Click  **ISO**. The ISO download list is displayed.
        
        - **aarch64**: ISO image file of the AArch64 architecture
        - **x86\_64**: ISO image file of the x86\_64 architecture
        - **source**: ISO image file of the openEuler source code
     
     6. Click  **aarch64**.
     
     7. Click  **openEuler-20.03-LTS-aarch64-dvd.iso**  to download the openEuler release package to the local host.
     
     8. Click  **openEuler-20.03-LTS-aarch64-dvd.iso.sha256sum**  to download the openEuler verification file to the local host.
     
     9. Log in to the openEuler OS and create a directory for storing the release package and verification file, for example,  ~/iso\*\*.
        
        ```
        $ mkdir ~/iso
        ```
     
     10. Use a cross-platform file transfer tool (such as WinSCP) to upload the local openEuler release package and verification file to the target openEuler OS.
   
   - Run the  **wget**  command to download the ISO image.
     
     1. Log in to the openEuler community at  [https://openeuler.org](https://openeuler.org).
     
     2. Click  **Download**.
     
     3. Click the link provided after **Download ISO**. The download list is displayed.
     
     4. Select the version to be downloaded, for example, openEuler 20.03 LTS. Then, click  **openEuler-20.03-LTS**. The download list is displayed.
     
     5. Click  **ISO**. The ISO download list is displayed.
        
        - **aarch64**: ISO image file of the AArch64 architecture
        - **x86\_64**: ISO image file of the x86\_64 architecture
        - **source**: ISO image file of the openEuler source code
     
     6. Click  **aarch64**.
     
     7. <a name="li62369349505"></a>Right-click  **openEuler-20.03-LTS-aarch64-dvd.iso**  and choose  **Copy URL**  from the shortcut menu to copy the address of the openEuler release package.
     
     8. <a name="li9236203405015"></a>Right-click  **openEuler-20.03-LTS-aarch64-dvd.iso.sha256sum**  and choose  **Copy URL**  from the shortcut menu to copy the address of the openEuler verification file.
     
     9. Log in to the openEuler OS, create a directory (for example,  **~/iso**) for storing the release package and verification file, and switch to the directory.
        
        ```
        $ mkdir ~/iso
        $ cd ~/iso
        ```
     
     10. Run the  **wget**  command to remotely download the release package and verification file. In the command,  **ipaddriso**  and  **ipaddrisosum**  are the addresses copied in  [1.g](#li62369349505)  and  [1.h](#li9236203405015).
         
         ```
         $ wget ipaddriso
         $ wget ipaddrisosum
         ```

2. Release Package Integrity Check
   
   1. Obtain the verification value in the verification file.
      
      ```
      $ cat openEuler-20.03-LTS-aarch64-dvd.iso.sha256sum
      ```
   
   2. Calculate the SHA256 verification value of the openEuler release package.
      
      ```
      $ sha256sum openEuler-20.03-LTS-aarch64-dvd.iso 
      ```
      
      After the command is run, the verification value is displayed.
   
   3. Check whether the values calculated in step 1 and step 2 are consistent.
      
      If the verification values are consistent, the .iso file is not damaged. If they are inconsistent, the file is damaged and you need to obtain the file again.

3. <a name="li6236932222"></a>Mount the ISO file and configure it as a repo source.
   
   Run the  **mount**  command as the  **root** user to mount the image file.
   
   The following is an example:
   
   ```
   # mount /home/iso/openEuler-20.03-LTS-aarch64-dvd.iso /mnt/
   ```
   
   The mounted  **mnt**  directory is as follows:
   
   ```
   .
   │── boot.catalog
   │── docs
   │── EFI
   │── images
   │── Packages
   │── repodata
   │── TRANS.TBL
   └── RPM-GPG-KEY-openEuler
   ```
   
   In the preceding command,  **Packages**  indicates the directory where the RPM package is stored,  **repodata**  indicates the directory where the repo source metadata is stored, and  **RPM-GPG-KEY-openEuler**  indicates the public key for signing openEuler.

4. Go to the yum source directory and check the .repo configuration file in the directory.
   
   ```
   $ cd /etc/yum.repos.d
   $ ls 
   openEuler_aarch64.repo
   ```

6. Edit the **openEuler\_aarch64.repo** file as the **root** user. Configure the local openEuler repo source created in step [3](#li6236932222) as the yum source.
   
   ```
   # vi openEuler_aarch64.repo
   ```
   
   Edit the  **openEuler\_aarch64.repo**  file as follows:
   
    ```
	[localosrepo]

    name=localosrepo

    baseurl=file:///mnt

    enabled=1

    gpgcheck=1
	gpgkey=file:///mnt/RPM-GPG-KEY-openEuler
	```

## Installing the Software Package

Install the software required for development. The software required varies in different development environments. However, the installation methods are the same. This section describes how to install common software packages (such as JDK and rpm-build). Some development software, such as GCC and GNU make, is provided by the openEuler OS by default.

### Installing the JDK Software Package

1. Run the  **dnf list installed \| grep jdk**  command to check whether the JDK software is installed.
   
   ```
   $ dnf list installed | grep jdk
   ```
   
   Check the command output. If the command output contains "jdk", the JDK has been installed. If no such information is displayed, the software is not installed.

2. Clear the cache.
   
   ```
   $ dnf clean all
   ```

3. Create a cache.
   
   ```
   $ dnf makecache
   ```

4. Query the JDK software package that can be installed.
   
   ```
   $ dnf search jdk | grep jdk
   ```
   
   View the command output and install the  **java-x.x.x-openjdk-devel.aarch64**  software package.  **x.x.x**  indicates the version number.

5. Install the JDK software package as the **root** user. The following uses the  **java-1.8.0-openjdk-devel**  software package as an example.
   
   ```
   # dnf install java-1.8.0-openjdk-devel.aarch64
   ```

6. Query information about the JDK software.
   
   ```
   $ java -version
   ```
   
   Check the command output. If the command output contains "openjdk version "1.8.0\_232"", the JDK has been correctly installed. In the command output,  **1.8.0\_232**  indicates the JDK version.

### Installing the rpm-build Software Package

1. Run the  **dnf list installed \| grep rpm-build**  command to check whether the rpm-build software is installed.
   
   ```
   $ dnf list installed | grep rpm-build
   ```
   
   Check the command output. If the command output contains "rpm-build", the software has been installed. If no such information is displayed, the software is not installed.

2. Clear the cache.
   
   ```
   $ dnf clean all
   ```

3. Create a cache.
   
   ```
   $ dnf makecache
   ```

4. Install the rpm-build package as the **root** user.
   
   ```
   # dnf install rpm-build
   ```

5. Query the rpm-build software version.
   
   ```
   $ rpmbuild --version
   ```

## Using the IDE for Java Development

For small-sized Java applications, you can directly use JDK to compile them to run Java applications. However, for medium- and large-sized Java applications, this method cannot meet the development requirements. You can perform the following steps to install and use the IDE to facilitate Java development on the openEuler OS.

### Overview

IntelliJ IDEA is a popular Java IDE. You can download the community edition of IntelliJ IDEA for free. Currently, openEuler supports Java development in the IntelliJ IDEA integrated development environment (IDE), improving the work efficiency of developers.

### Logging In to the Server Using MobaXterm

MobaXterm is an excellent SSH client. It has an X Server and can easily solve remote GUI display problems.

You need to download, install, and start MobaXterm in advance, and then log in to your server in SSH mode to perform the following operations:

### Setting the JDK Environment

Before setting JAVA\_HOME, you need to find the installation path of the JDK. You are supported to have installed the JDK. If you have not installed the JDK, install it by referring to Preparation > Installing the Software Package > Installing the JDK Software Package.

Run the following command to view the Java path:

```
$ which java
/usr/bin/java
```

Run the following command to check the directory to which the soft link points:

```
$ ls -la /usr/bin/java
lrwxrwxrwx. 1 root root  22 Mar 6 20:28 /usr/bin/java -> /etc/alternatives/java
$ ls -la /etc/alternatives/java
lrwxrwxrwx. 1 root root  83 Mar 6 20:28 /etc/alternatives/java -> /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.232.b09-1.h2.aarch64/jre/bin/java
```

The actual path is  **/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.232.b09-1.h2.aarch64**. Run the following command to set  **JAVA\_HOME**  and  **PATH**:

```
$ export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.232.b09-1.h2.aarch64
$ export PATH=$JAVA_HOME/bin:$PATH
```

### Downloading and Installing the GTK Library

Run the following command:

```
$ dnf list installed | grep gtk
```

If  **gtk2**  or  **gtk3**  is displayed, the GTK library has been installed. In this case, skip this step. Otherwise, run the following command as the **root** user to automatically download and install the GTK library:

```
# dnf -y install gtk2 libXtst libXrender  xauth
```

### Setting X11 Forwarding

Switch to the SSHD configuration directory.

```
$ cd ~/.ssh
```

If the directory does not exist, run the following command to create the directory and then switch to the directory:

```
$ mkdir ~/.ssh
```

Edit the configuration file in the  **.ssh**  directory and save the file.

1. Run the  **vim**  command to open the configuration file.
   
   ```
   $ vim config
   ```

2. Add the following content to the end of the file and save the file:
   
   ```
   Host *
   		  ForwardAgent yes
   		  ForwardX11 yes
   ```

### Downloading and Running IntelliJ IDEA

After the preceding environment configuration is complete, you can download and run the IntelliJ IDEA. The latest version of IntelliJ IDEA is incompatible with openEuler in some functions. You are advised to click  [here](https://www.jetbrains.com/idea/download/other.html)  and download the Linux package of the 2018 version. Move the downloaded package to the directory where you want to install the software and decompress the package.

```
$ tar xf ideaIC-2018.3.tar.gz
```

Decompress the package, switch to the IntelliJ IDEA directory, and run the IntelliJ IDEA.

```
$ cd ./idea-IC-183.4284.148
$ bin/idea.sh &
```