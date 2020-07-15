# Using the DNF to Manage Software Packages

DNF is a Linux software package management tool used to manage RPM software packages. The DNF can query software package information, obtain software packages from a specified software library, automatically process dependencies to install or uninstall software packages, and update the system to the latest available version.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>-   DNF is fully compatible with YUM and provides YUM-compatible command lines and APIs for extensions and plug-ins.  
>-   You must have the administrator rights to use the DNF. All commands in this chapter must be executed by the administrator.  
<!-- TOC -->

- [Using the DNF to Manage Software Packages](#using-the-dnf-to-manage-software-packages)
    - [Configuring the DNF](#configuring-the-dnf)
        - [The DNF Configuration File](#the-dnf-configuration-file)
        - [Creating a Local Software Repository](#creating-a-local-software-repository)
        - [Adding, Enabling, and Disabling Software Sources](#adding-enabling-and-disabling-software-sources)
    - [Managing Software Package](#managing-software-package)
        - [Searching for Software Packages](#searching-for-software-packages)
        - [Listing Software Packages](#listing-software-packages)
        - [Displaying RPM Package Information](#displaying-rpm-package-information)
        - [Installing an RPM Package](#installing-an-rpm-package)
        - [Downloading Software Packages](#downloading-software-packages)
        - [Deleting a Software Package](#deleting-a-software-package)
    - [Managing Software Package Groups](#managing-software-package-groups)
        - [Listing Software Package Groups](#listing-software-package-groups)
        - [Displaying the Software Package Group Information](#displaying-the-software-package-group-information)
        - [Installation Software Package Group](#installation-software-package-group)
        - [Deleting a Software Package Group](#deleting-a-software-package-group)
    - [Check and Update](#check-and-update)
        - [Checking for Update](#checking-for-update)
        - [Upgrade](#upgrade)
        - [Updating All Packages and Their Dependencies](#updating-all-packages-and-their-dependencies)

<!-- /TOC -->

## Configuring the DNF



### The DNF Configuration File

The main configuration file of the DNF is /etc/dnf/dnf.conf which consists of two parts:

-   The  **main**  part in the file stores the global settings of the DNF. 

-   The **repository** part in the file stores the settings of the software source. You can add one or more  **repository**  sections to the file. 

In addition, the /etc/yum.repos.d directory stores one or more repo source files, which define different repositories. 
	
You can configure a software source by either directly configuring the /etc/dnf/dnf.conf file or configuring the .repo file in the /etc/yum.repos.d directory.

#### Configuring the main Part
The /etc/dnf/dnf.conf file contains the  **main**  part. The following is an example of the configuration file:

```
[main]
gpgcheck=1
installonly_limit=3
clean_requirements_on_remove=True
best=True
```

Common options are as follows:

**Table  1**  main parameter description

<a name="en-us_topic_0151921080_t2716a40f69b24a989ec3c0b6f278cb5d"></a>
<table><thead align="left"><tr id="en-us_topic_0151921080_re437b39f0a1647ff864353c080184c45"><th class="cellrowborder" valign="top" width="31.580000000000002%" id="mcps1.2.3.1.1"><p id="en-us_topic_0151921080_a228122f6ac30401d8237a59bf9535ad1"><a name="en-us_topic_0151921080_a228122f6ac30401d8237a59bf9535ad1"></a><a name="en-us_topic_0151921080_a228122f6ac30401d8237a59bf9535ad1"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="68.42%" id="mcps1.2.3.1.2"><p id="en-us_topic_0151921080_ae291ac87cc3c4ce1bd23cfbd2f989d09"><a name="en-us_topic_0151921080_ae291ac87cc3c4ce1bd23cfbd2f989d09"></a><a name="en-us_topic_0151921080_ae291ac87cc3c4ce1bd23cfbd2f989d09"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0151921080_raeb774ff205e457e818067d51a26a39a"><td class="cellrowborder" valign="top" width="31.580000000000002%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151921080_aca09cf10eb084bee89cf1f5fe5f35fac"><a name="en-us_topic_0151921080_aca09cf10eb084bee89cf1f5fe5f35fac"></a><a name="en-us_topic_0151921080_aca09cf10eb084bee89cf1f5fe5f35fac"></a>cachedir</p>
</td>
<td class="cellrowborder" valign="top" width="68.42%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151921080_a2151a724f4ff4a468f77b15eaec8ed3a"><a name="en-us_topic_0151921080_a2151a724f4ff4a468f77b15eaec8ed3a"></a><a name="en-us_topic_0151921080_a2151a724f4ff4a468f77b15eaec8ed3a"></a>Cache directory for storing RPM packages and database files.</p>
</td>
</tr>
<tr id="en-us_topic_0151921080_r22f24b5ffe0e4bc3be64ef01afc49c6c"><td class="cellrowborder" valign="top" width="31.580000000000002%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151921080_a33e3b7427b024df7922a3acdc7d2caf7"><a name="en-us_topic_0151921080_a33e3b7427b024df7922a3acdc7d2caf7"></a><a name="en-us_topic_0151921080_a33e3b7427b024df7922a3acdc7d2caf7"></a>keepcache</p>
</td>
<td class="cellrowborder" valign="top" width="68.42%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151921080_a16334e4f6fec4e79872c4a8b3a31d772"><a name="en-us_topic_0151921080_a16334e4f6fec4e79872c4a8b3a31d772"></a><a name="en-us_topic_0151921080_a16334e4f6fec4e79872c4a8b3a31d772"></a>The options are 1 and 0, indicating whether to cache the RPM packages and header files that have been successfully installed. The default value is 0, indicating that the RPM packages and header files are not cached.</p>
</td>
</tr>
<tr id="en-us_topic_0151921080_rc9c76f44bb7840b8b61a46b0854538b3"><td class="cellrowborder" valign="top" width="31.580000000000002%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151921080_af751af3ed4cb4a189f209994d274dfe0"><a name="en-us_topic_0151921080_af751af3ed4cb4a189f209994d274dfe0"></a><a name="en-us_topic_0151921080_af751af3ed4cb4a189f209994d274dfe0"></a>debuglevel</p>
</td>
<td class="cellrowborder" valign="top" width="68.42%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151921080_a118e43ebde57468eb40f0af51b86d751"><a name="en-us_topic_0151921080_a118e43ebde57468eb40f0af51b86d751"></a><a name="en-us_topic_0151921080_a118e43ebde57468eb40f0af51b86d751"></a>Sets debugging information generated by the DNF. The value ranges from 0 to 10. A larger value indicates more detailed debugging information. The default value is 2. The value 0 indicates that the debug information is not displayed.</p>
</td>
</tr>
<tr id="en-us_topic_0151921080_rc12e82ae45524ba8aea5248e154a832a"><td class="cellrowborder" valign="top" width="31.580000000000002%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151921080_adc7f634b391d4726808fe0b3354f969d"><a name="en-us_topic_0151921080_adc7f634b391d4726808fe0b3354f969d"></a><a name="en-us_topic_0151921080_adc7f634b391d4726808fe0b3354f969d"></a>clean_requirements_on_remove</p>
</td>
<td class="cellrowborder" valign="top" width="68.42%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151921080_ae9df2a3423504b4da46111a6e1162352"><a name="en-us_topic_0151921080_ae9df2a3423504b4da46111a6e1162352"></a><a name="en-us_topic_0151921080_ae9df2a3423504b4da46111a6e1162352"></a>Deletes the dependency items that are no longer used during DNF removal. If the software package is installed through the DNF instead of the explicit user request, the software package can be deleted only through clean_requirements_on_remove, that is, the software package is introduced as a dependency item. The default value is<strong id="b156181810165711"><a name="b156181810165711"></a><a name="b156181810165711"></a> True</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0151921080_r096417e2f0524024b93c722dab0113cd"><td class="cellrowborder" valign="top" width="31.580000000000002%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151921080_p11584914871"><a name="en-us_topic_0151921080_p11584914871"></a><a name="en-us_topic_0151921080_p11584914871"></a>best</p>
</td>
<td class="cellrowborder" valign="top" width="68.42%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151921080_a406b4dd56fb7483ea43c7231aa2a7499"><a name="en-us_topic_0151921080_a406b4dd56fb7483ea43c7231aa2a7499"></a><a name="en-us_topic_0151921080_a406b4dd56fb7483ea43c7231aa2a7499"></a>The system always attempts to install the latest version of the upgrade package. If the latest version cannot be installed, the system displays the cause and stops the installation. The default value is <strong id="b316743165712"><a name="b316743165712"></a><a name="b316743165712"></a>True</strong>.</p>
</td>
</tr>
<tr id="en-us_topic_0151921080_r447c1e6abe344a719dd9e8b109c799fa"><td class="cellrowborder" valign="top" width="31.580000000000002%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151921080_a6befc61e1a58499b96ecdcc96b0489d4"><a name="en-us_topic_0151921080_a6befc61e1a58499b96ecdcc96b0489d4"></a><a name="en-us_topic_0151921080_a6befc61e1a58499b96ecdcc96b0489d4"></a>obsoletes</p>
</td>
<td class="cellrowborder" valign="top" width="68.42%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151921080_a581b6f9d8f9b4ad7b62734f86f6d556e"><a name="en-us_topic_0151921080_a581b6f9d8f9b4ad7b62734f86f6d556e"></a><a name="en-us_topic_0151921080_a581b6f9d8f9b4ad7b62734f86f6d556e"></a>The options are <strong id="b1233155595718"><a name="b1233155595718"></a><a name="b1233155595718"></a>1</strong> and <strong id="b97439577575"><a name="b97439577575"></a><a name="b97439577575"></a>0</strong>, indicating whether to allow the update of outdated RPM packages. The default value is 1, indicating that the update is allowed.</p>
</td>
</tr>
<tr id="en-us_topic_0151921080_r30106389463d4ba0bf505a6b78034b23"><td class="cellrowborder" valign="top" width="31.580000000000002%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151921080_a51da18882a5b41ff8a5a328f73d186dd"><a name="en-us_topic_0151921080_a51da18882a5b41ff8a5a328f73d186dd"></a><a name="en-us_topic_0151921080_a51da18882a5b41ff8a5a328f73d186dd"></a>gpgcheck</p>
</td>
<td class="cellrowborder" valign="top" width="68.42%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151921080_addb19525458847cd90f1d1390b966701"><a name="en-us_topic_0151921080_addb19525458847cd90f1d1390b966701"></a><a name="en-us_topic_0151921080_addb19525458847cd90f1d1390b966701"></a>The options are <strong id="b12591163015816"><a name="b12591163015816"></a><a name="b12591163015816"></a>1</strong> and <strong id="b1614713618582"><a name="b1614713618582"></a><a name="b1614713618582"></a>0</strong>, indicating whether to perform GPG verification. The default value is <strong id="b14552491581"><a name="b14552491581"></a><a name="b14552491581"></a>1</strong>, indicating that verification is required.</p>
</td>
<tr id="en-us_topic_0151921080_ra0a9a346638c4a1bb007bbbe59eaeea7"><td class="cellrowborder" valign="top" width="31.580000000000002%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151921080_af01afb28195145988ff4ba218bfad29b"><a name="en-us_topic_0151921080_af01afb28195145988ff4ba218bfad29b"></a><a name="en-us_topic_0151921080_af01afb28195145988ff4ba218bfad29b"></a>plugins</p>
</td>
<td class="cellrowborder" valign="top" width="68.42%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151921080_a093f5fa9735a4e27a6bdbd2e1d59faee"><a name="en-us_topic_0151921080_a093f5fa9735a4e27a6bdbd2e1d59faee"></a><a name="en-us_topic_0151921080_a093f5fa9735a4e27a6bdbd2e1d59faee"></a>The options are <strong id="b198826584589"><a name="b198826584589"></a><a name="b198826584589"></a>1</strong> and <strong id="b207705014591"><a name="b207705014591"></a><a name="b207705014591"></a>0</strong>, indicating that the DNF plug-in is enabled or disabled. The default value is <strong id="b1835715503011"><a name="b1835715503011"></a><a name="b1835715503011"></a>1</strong>, indicating that the DNF plug-in is enabled.</p>
</td>
</tr>
<tr id="en-us_topic_0151921080_r1fea2c77ef6e4c63a6ca076666eb8651"><td class="cellrowborder" valign="top" width="31.580000000000002%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151921080_a66ecbecaa5494510b6b1304af3e4da43"><a name="en-us_topic_0151921080_a66ecbecaa5494510b6b1304af3e4da43"></a><a name="en-us_topic_0151921080_a66ecbecaa5494510b6b1304af3e4da43"></a>installonly_limit</p>
</td>
<td class="cellrowborder" valign="top" width="68.42%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151921080_aab5e9fba116044e4807c04ae55297cd1"><a name="en-us_topic_0151921080_aab5e9fba116044e4807c04ae55297cd1"></a><a name="en-us_topic_0151921080_aab5e9fba116044e4807c04ae55297cd1"></a>Sets the number of packages that can be installed at the same time by running the <strong id="b16680340219"><a name="b16680340219"></a><a name="b16680340219"></a>installonlypkgs</strong> command. The default value is 3. You are advised not to decrease the value.</p>
</td>
</tr>
</tbody>
</table>

#### Configuring the repository Part

The repository part allows you to customize openEuler software source repositories. The name of each repository must be unique. Otherwise, conflicts may occur. You can configure a software source by either directly configuring the /etc/dnf/dnf.conf file or configuring the .repo file in the /etc/yum.repos.d directory.

-   Configuring the /etc/dnf/dnf.conf file

    The following is a minimum configuration example of the \[repository\] section:

    ```
    [repository]
    name=repository_name
    baseurl=repository_url
    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >openEuler provides an online image source at  [https://repo.openeuler.org/](https://repo.openeuler.org/). For example, if the openEuler 20.03 version is aarch64, the  **baseurl**  can be set to  [https://repo.openeuler.org/openEuler-20.03-LTS/OS/aarch64/](https://repo.openeuler.org/openEuler-20.03-LTS/OS/aarch64/).  

    Common options are as follows:

    **Table  2**  repository parameter description <a name="en-us_topic_0151921080_t2df9dceb0ff64b2f8db8ec5cd779792a"></a>
    <table><thead align="left"><tr id="en-us_topic_0151921080_r9162be1b9c5b451f8a7ff1466f5b8430"><th class="cellrowborder" valign="top" width="31.580000000000002%" id="mcps1.2.3.1.1"><p id="en-us_topic_0151921080_af95a9e18156646249707de3f94ac1b3c"><a name="en-us_topic_0151921080_af95a9e18156646249707de3f94ac1b3c"></a><a name="en-us_topic_0151921080_af95a9e18156646249707de3f94ac1b3c"></a>Parameter</p>
    </th>
    <th class="cellrowborder" valign="top" width="68.42%" id="mcps1.2.3.1.2"><p id="en-us_topic_0151921080_a8cc2e976bc794e86a279d3bae8f901c4"><a name="en-us_topic_0151921080_a8cc2e976bc794e86a279d3bae8f901c4"></a><a name="en-us_topic_0151921080_a8cc2e976bc794e86a279d3bae8f901c4"></a>Description</p>
    </th>
    </tr>
    </thead>
    <tbody><tr id="en-us_topic_0151921080_rbfa3a638cbc24c73ab13529149b75bb1"><td class="cellrowborder" valign="top" width="31.580000000000002%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151921080_a4a0b069bbf624b09be3bdd08567c0445"><a name="en-us_topic_0151921080_a4a0b069bbf624b09be3bdd08567c0445"></a><a name="en-us_topic_0151921080_a4a0b069bbf624b09be3bdd08567c0445"></a>name=repository_name</p>
    </td>
    <td class="cellrowborder" valign="top" width="68.42%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151921080_a21ddbd0f48924c1eb7475cc34de2dc32"><a name="en-us_topic_0151921080_a21ddbd0f48924c1eb7475cc34de2dc32"></a><a name="en-us_topic_0151921080_a21ddbd0f48924c1eb7475cc34de2dc32"></a>Name string of a software repository.</p>
    </td>
    </tr>
    <tr id="en-us_topic_0151921080_r00b7f4067dc94647941026719cd6f293"><td class="cellrowborder" valign="top" width="31.580000000000002%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151921080_af53cdfe5f204471f956cdab7c466fa40"><a name="en-us_topic_0151921080_af53cdfe5f204471f956cdab7c466fa40"></a><a name="en-us_topic_0151921080_af53cdfe5f204471f956cdab7c466fa40"></a>baseurl=repository_url</p>
    </td>
    <td class="cellrowborder" valign="top" width="68.42%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151921080_aa17154cd42524a1a8075e6414160a153"><a name="en-us_topic_0151921080_aa17154cd42524a1a8075e6414160a153"></a><a name="en-us_topic_0151921080_aa17154cd42524a1a8075e6414160a153"></a>Address of the software repository.</p>
    <a name="en-us_topic_0151921080_ued0c249b843549a79bfa68170539c91e"></a><a name="en-us_topic_0151921080_ued0c249b843549a79bfa68170539c91e"></a><ul id="en-us_topic_0151921080_ued0c249b843549a79bfa68170539c91e"><li>Network location using the HTTP protocol, for example, http://path/to/repo</li><li>Network location using the FTP protocol, for example, ftp://path/to/repo</li><li>Local path: for example, file:///path/to/local/repo</li></ul>
    </td>
    </tr>
    </tbody>
    </table>


-   Configuring the .repo file in the /etc/yum.repos.d directory


    openEuler provides multiple repo sources for users online. For details about the repo sources, see [System Installation](../Releasenotes/installing-the-os.md.html). This section uses the OS repo source of the AArch64 architecture as an example. 

    For example, run the following command as the **root** user to add the openeuler repo source to the openEuler_aarch64.repo file. 

    ```
    # vi /etc/yum.repos.d/openEuler_aarch64.repo
    ```

    ```
    [osrepo]
    name=osrepo
    baseurl=https://repo.openeuler.org/openEuler-20.03-LTS/OS/aarch64/
    enabled=1
    gpgcheck=1
    gpgkey=https://repo.openeuler.org/openEuler-20.03-LTS/OS/aarch64/RPM-GPG-KEY-openEuler

    ```

    >![](public_sys-resources/icon-note.gif) **NOTE:**    
	> - **enabled** indicates whether to enable the software source repository. The value can be **1** or **0**. The default value is **1**, indicating that the software source repository is enabled.
    > - **gpgkey** is the public key used to verify the signature.


#### Displays the Current Configuration
-   To display the current configuration information, run the following command:

    ```
    dnf config-manager --dump
    ```

-   To display the configuration of a software source, query the repo id:

    ```
    dnf repolist
    ```

    Run the following command to display the software source configuration of the corresponding ID. In the command,  _repository_  indicates the repository ID.

    ```
    dnf config-manager --dump repository
    ```

-   You can also use a global regular expression to display all matching configurations.

    ```
    dnf config-manager --dump glob_expression
    ```


### Creating a Local Software Repository

To create a local repository of software sources, perform the following steps.

1.  Install the createrepo software package. Run the following command as the root user:

    ```
    dnf install createrepo
    ```

2.  Copy the required software packages to a directory, for example, /mnt/local\_repo/.
3.  Run the following command to create a software source:

    ```
    createrepo --database /mnt/local_repo
    ```


### Adding, Enabling, and Disabling Software Sources

This section describes how to add, enable, and disable the software source repository by running the  **dnf config-manager**  command.

#### Adding Software Source
To define a new software repository, you can add the repository part to the /etc/dnf/dnf.conf file or add the .repo file to the /etc/yum.repos.d/ directory. You are advised to add the .repo file. Each software source has its own .repo file. The following describes how to add the .repo file.

To add such a source to your system, run the following command as the user  **root**. After the command is executed, the corresponding .repo file is generated in the  **/etc/yum.repos.d/**  directory. In the command,  _repository\_url_  indicates the repo source address. For details, see  [Table 2](#en-us_topic_0151921080_t2df9dceb0ff64b2f8db8ec5cd779792a).

```
dnf config-manager --add-repo repository_url
```

#### Enabling a Software Repository
To enable the software source, run the following command as the user  **root**. In the command,  _repository_  indicates the repository ID in the new .repo file. You can run the  **dnf repolist**  command to query the repository ID.

```
dnf config-manager --set-enable repository
```

You can also use a global regular expression to enable all matching software sources. In the command,  _glob\_expression_  indicates the regular expression used to match multiple repository IDs.

```
dnf config-manager --set-enable glob_expression
```

#### Disabling a Software Repository
To disable a software source, run the following command as the user  **root**:

```
dnf config-manager --set-disable repository
```

You can also use a global regular expression to disable all matching software sources.

```
dnf config-manager --set-disable glob_expression
```

## Managing Software Package

The DNF enables you to query, install, and delete software packages.

### Searching for Software Packages
You can search for the required RPM package by its name, abbreviation, or description. The command is as follows:

```
dnf search term
```

The following is an example:

```
$   dnf search httpd
========================================== N/S matched: httpd ==========================================
httpd.aarch64 : Apache HTTP Server
httpd-devel.aarch64 : Development interfaces for the Apache HTTP server
httpd-manual.noarch : Documentation for the Apache HTTP server
httpd-tools.aarch64  : Tools for use with the Apache HTTP Server
libmicrohttpd.aarch64  : Lightweight library for embedding a webserver in applications
mod_auth_mellon.aarch64  : A SAML 2.0 authentication module for the Apache Httpd Server
mod_dav_svn.aarch64  : Apache httpd module for Subversion server
```

### Listing Software Packages
To list all installed and available RPM packages in the system, run the following command:

```
dnf list all
```

To list a specific RPM package in the system, run the following command:

```
dnf list glob_expression...
```

The following is an example:

```
$ dnf list httpd
Available Packages
httpd.aarch64              2.4.34-8.h5.oe1           Local
```

### Displaying RPM Package Information
To view information about one or more RPM packages, run the following command:

```
dnf info package_name...
```

The following is a command example:

```
$ dnf info httpd
Available Packages
Name        : httpd
Version     : 2.4.34
Release     : 8.h5.oe1
Arch        : aarch64 
Size        : 1.2 M
Repo        : Local
Summary     : Apache HTTP Server
URL         : http://httpd.apache.org/
License     : ASL 2.0
Description : The Apache HTTP Server is a powerful, efficient, and extensible
            : web server.
```

### Installing an RPM Package
To install a software package and all its dependencies that have not been installed, run the following command as the user  **root**:

```
dnf install package_name
```

You can also add software package names to install multiple software packages at the same time. Add the  **strict=False**  parameter to the /etc/dnf/dnf.conf configuration file and run the  **dnf**  command to add --setopt=strict=0. Run the following command as the user  **root**:

```
dnf install package_name package_name... --setopt=strict=0
```

The following is an example:

```
# dnf install httpd
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>If the RPM package fails to be installed, see  [Installation Failure Caused by Software Package Conflict, File Conflict, or Missing Software Package](faqs.html#installation-failure-caused-by-software-package-conflict-file-conflict-or-missing-software-package).  

### Downloading Software Packages
To download the software package using the DNF, run the following command as the user  **root**:

```
dnf download package_name
```

If you need to download the dependency packages that are not installed, add  **\-\-resolve**. The command is as follows:

```
dnf download --resolve package_name
```

The following is an example:

```
# dnf download --resolve httpd
```

### Deleting a Software Package
To uninstall the software package and related dependent software packages, run the following command as the user  **root**:

```
dnf remove package_name...
```

The following is an example:

```
# dnf remove totem
```

## Managing Software Package Groups

A software package set is a group of software packages that serve a common purpose, for example, a system tool set. You can use the DNF to install or delete software package groups, improving operation efficiency.

### Listing Software Package Groups
The summary parameter can be used to list the number of all installed software package groups, available groups, and available environment groups in the system. The command is as follows:

```
dnf groups summary
```

The following is an example:

```
# dnf groups summary
Last metadata expiration check: 0:11:56 ago on Sat 17 Aug 2019 07:45:14 PM CST.
Available Groups: 8
```

To list all software package groups and their group IDs, run the following command:

```
dnf group list
```

The following is an example:

```
# dnf group list
Last metadata expiration check: 0:10:32 ago on Sat 17 Aug 2019 07:45:14 PM CST.
Available Environment Groups:
   Minimal Install
   Custom Operating System
   Server
Available Groups:
   Development Tools
   Graphical Administration Tools
   Headless Management
   Legacy UNIX Compatibility
   Network Servers
   Scientific Support
   Security Tools
   System Tools

```

### Displaying the Software Package Group Information
To list the mandatory and optional packages contained in a software package group, run the following command:

```
dnf group info glob_expression...
```

The following is an example of displaying the Development Tools information:

```
# dnf group info "Development Tools"
Last metadata expiration check: 0:14:54 ago on Wed 05 Jun 2019 08:38:02 PM CST.

Group: Development Tools
 Description: A basic development environment.
 Mandatory Packages:
   binutils
   glibc-devel
   make
   pkgconf
   pkgconf-m4
   pkgconf-pkg-config
   rpm-sign
 Optional Packages:
   expect
```

### Installation Software Package Group
Each software package group has its own name and corresponding group ID. You can use the software package group name or its ID to install the software package.

To install a software package group, run the following command as the user  **root**:

```
dnf group install group_name
```

```
dnf group install groupid
```

For example, to install the software package group of Development Tools, run the following command:

```
# dnf group install "Development Tools" 
```

```
# dnf group install development
```

### Deleting a Software Package Group
To uninstall a software package group, you can use the group name or ID to run the following command as the user  **root**:

```
dnf group remove group_name
```

```
dnf group remove groupid
```

For example, to delete the software package group of Development Tools, run the following command:

```
# dnf group remove "Development Tools" 
```

```
# dnf group remove development
```

## Check and Update

You can use the DNF to check whether any software package in your system needs to be updated. You can use the DNF to list the software packages to be updated. You can choose to update all packages at a time or update only specified packages.

### Checking for Update
To list all currently available updates, run the following command:

```
dnf check-update
```

The following is an example:

```
# dnf check-update
Last metadata expiration check: 0:02:10 ago on Sun 01 Sep 2019 11:28:07 PM  CST.

anaconda-core.aarch64       19.31.123-1.14             updates
anaconda-gui.aarch64        19.31.123-1.14             updates
anaconda-tui.aarch64        19.31.123-1.14             updates
anaconda-user-help.aarch64  19.31.123-1.14             updates
anaconda-widgets.aarch64    19.31.123-1.14             updates
bind-libs.aarch64           32:9.9.4-29.3              updates
bind-libs-lite.aarch64      32:9.9.4-29.3              updates
bind-license.noarch         32:9.9.4-29.3              updates
bind-utils.aarch64          32:9.9.4-29.3              updates
...
```

### Upgrade
To upgrade a single software package, run the following command as the user  **root**:

```
dnf update package_name
```

For example, to upgrade the RPM package, run the following command:

```
# dnf update anaconda-gui.aarch64
Last metadata expiration check: 0:02:10 ago on Sun 01 Sep 2019 11:30:27 PM  CST.
Dependencies Resolved
================================================================================
 Package                  Arch         Version              Repository     Size
================================================================================
Updating:
 anaconda-gui             aarch64      19.31.123-1.14       updates       461 k
 anaconda-core            aarch64      19.31.123-1.14       updates       1.4 M
 anaconda-tui             aarch64      19.31.123-1.14       updates       274 k
 anaconda-user-help       aarch64      19.31.123-1.14       updates       315 k
 anaconda-widgets         aarch64      19.31.123-1.14       updates       748 k

Transaction Summary
================================================================================
Upgrade  5 Package

Total download size: 3.1 M
Is this ok [y/N]:
```

Similarly, to upgrade a software package group, run the following command as the user  **root**:

```
dnf group update group_name
```

### Updating All Packages and Their Dependencies
To update all packages and their dependencies, run the following command as the user  **root**:

```
dnf update
```
