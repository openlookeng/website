# Basic Configuration

<!-- TOC -->

- [Basic Configuration](#basic-configuration)
    - [Setting the System Locale](#setting-the-system-locale)
        - [Displaying the Current Locale Status](#displaying-the-current-locale-status)
        - [Listing Available Locales](#listing-available-locales)
        - [Setting the Locale](#setting-the-locale)
    - [Setting the Keyboard Layout](#setting-the-keyboard-layout)
        - [Displaying the Current Settings](#displaying-the-current-settings)
        - [Listing Available Keyboard Layouts](#listing-available-keyboard-layouts)
        - [Setting the Keyboard Layout](#setting-the-keyboard-layout-1)
    - [Setting the Date and Time](#setting-the-date-and-time)
        - [Using the timedatectl Command](#using-the-timedatectl-command)
        - [Using the date Command](#using-the-date-command)
        - [Using the hwclock Command](#using-the-hwclock-command)
    - [Setting kdump](#setting-kdump)
        - [Setting the Memory Reserved for kdump](#setting-the-memory-reserved-for-kdump)
        - [Recommended Reserved Memory](#recommended-reserved-memory)
        - [Disabling Network Drivers](#disabling-network-drivers)

<!-- /TOC -->
## Setting the System Locale

System locale settings are stored in the /etc/locale.conf file and can be modified by the localectl command. These settings are read at system boot by the systemd daemon.

### Displaying the Current Locale Status

To display the current locale status, run the following command:

```
$ localectl status
```

Example command output:

```
$ localectl status
   System Locale: LANG=zh_CN.UTF-8
       VC Keymap: cn
      X11 Layout: cn
```

### Listing Available Locales

To display available locales, run the following command:

```
$ localectl list-locales
```

You can check that by listing all Chinese locales with the following command:

```
$ localectl list-locales | grep zh
zh_CN.UTF-8
```

### Setting the Locale

To set the language environment, run the following command as the user  **root**. In the command,  _locale_  indicates the language type to be set. Run the  **localectl list-locales**  command to obtain the value range. Change the value based on the site requirements.

```
# localectl set-locale LANG=locale
```

For example, if you want to use Simplified Chinese as the locale, run the following command as the user  **root**:

```
# localectl set-locale LANG=zh_CN.UTF-8
```

> ![](public_sys-resources/icon-note.gif) **NOTE:**

> After the modification, log in again or run the  command `source /etc/locale.conf` as the user **root** to update the configuration file for the modification to take effect:

## Setting the Keyboard Layout

Keyboard layout settings are stored in the /etc/locale.conf file and can be modified by the localectl command. These settings are read at early boot by the systemd daemon.

### Displaying the Current Settings

To display the current keyboard layout settings, run the following command:

```
$ localectl status
```

Example command output:

```
$ localectl status
   System Locale: LANG=zh_CN.UTF-8
       VC Keymap: cn
      X11 Layout: cn
```

### Listing Available Keyboard Layouts

To list all available keyboard layouts that can be configured on openEuler, run the following command:

```
$ localectl list-keymaps
```

For example, the command output of the Chinese keyboard layout is as follows:

```
$ localectl list-keymaps | grep cn
cn
```

### Setting the Keyboard Layout

To set the keyboard layout, run the following command as the user  **root**. In the command,  _map_  indicates the keyboard layout to be set. Run the  **localectl list-keymaps**  command to obtain the value range. Change it based on the site requirements.

```
$ localectl set-keymap map
```

The keyboard layout will be equally applied to graphical user interfaces.

Then you can verify if your setting was successful by checking the status:

```
$ localectl status
   System Locale: LANG=zh_CN.UTF-8
       VC Keymap: cn
      X11 Layout: us
```

## Setting the Date and Time

This topic describes how to set the system date, time, and time zone by using timedatectl, date, and hwclock commands.

### Using the timedatectl Command

#### Displaying the Current Date and Time

To display the current date and time, run the following command:

```
$ timedatectl
```

Example command output:

```
$ timedatectl
               Local time: Mon 2019-09-30 04:05:00 EDT
           Universal time: Mon 2019-09-30 08:05:00 UTC
                 RTC time: Mon 2019-09-30 08:05:00
                Time zone: America/New_York (EDT, -0400)
System clock synchronized: no
              NTP service: inactive
          RTC in local TZ: no
```

#### Synchronizing the System Clock with a Remote Server

Your system clock can be automatically synchronized with a remote server using the Network Time Protocol (NTP). Run the following command as the user  **root**  to enable or disable NTP. The value of  _boolean_  is  **yes**  or  **no**, indicating that the NTP is enabled or disabled for automatic system clock synchronization. Change the value based on the site requirements.

> ![](public_sys-resources/icon-note.gif) **NOTE:**  
If the remote NTP server is enabled to automatically synchronize the system clock, you cannot manually change the date and time. If you need to manually change the date or time, ensure that automatic NTP system clock synchronization is disabled. You can run the  **timedatectl set-ntp no**  command to disable the NTP service.

```
# timedatectl set-ntp boolean
```

For example, to enable automatic remote time synchronization, run the following command:

```
# timedatectl set-ntp yes
```

#### Changing the Current Date

> ![](public_sys-resources/icon-note.gif) **NOTE:**  
Before changing the date, ensure that automatic NTP system clock synchronization has been disabled.

Run the following command as the user  **root**  to change the current date. In the command,  _YYYY_  indicates the year,  _MM_  indicates the month, and  _DD_  indicates the day. Change them based on the site requirements.

```
# timedatectl set-time YYYY-MM-DD
```

For example, to change the current date to August 14, 2019, run the following command as the user  **root**:

```
# timedatectl set-time '2019-08-14'
```

#### Changing the Current Time

> ![](public_sys-resources/icon-note.gif) **NOTE:**  
Before changing the time, ensure that automatic NTP system clock synchronization has been disabled.

To change the current time, run the following command as the user  **root**. In the command,  _HH_  indicates the hour,  _MM_  indicates the minute, and  _SS_  indicates the second. Change them based on the site requirements.

```
# timedatectl set-time HH:MM:SS
```

For example, to change the current time to 15:57:24, run the following command:

```
# timedatectl set-time 15:57:24
```

#### Changing the Time Zone

To list all available time zones, run the following command:

```
$ timedatectl list-timezones
```

To change the current time zone, run the following command as the user  **root**. In the command,  _time\_zone_  indicates the time zone to be set. Change it based on the site requirements.

```
# timedatectl set-timezone time_zone
```

Imagine you want to identify which time zone is closest to your present location while you are in Asia. You can check that by listing all available time zones in Asia with the following command:

```
# timedatectl list-timezones | grep Asia
Asia/Aden
Asia/Almaty
Asia/Amman
Asia/Anadyr
Asia/Aqtau
Asia/Aqtobe
Asia/Ashgabat
Asia/Baghdad
Asia/Bahrain
......

Asia/Seoul
Asia/Shanghai
Asia/Singapore
Asia/Srednekolymsk
Asia/Taipei
Asia/Tashkent
Asia/Tbilisi
Asia/Tehran
Asia/Thimphu
Asia/Tokyo
```

To change the time zone to Asia/Shanghai, run the following command:

```
# timedatectl set-timezone Asia/Shanghai
```

### Using the date Command

#### Displaying the Current Date and Time

To display the current date and time, run the following command:

```
$ date
```

By default, the  **date**  command displays the local time. To display the time in Coordinated Universal Time (UTC), run the command with the --utc or -u command line option:

```
$ date --utc
```

You can also customize the format of the displayed information by providing the + "format" option on the command line:

```
$ date +"format"
```

**Table  1**  Formatting options

<a name="en-us_topic_0151920961_t5113feb6bf86416883c941865a536aae"></a>

<table><thead align="left"><tr id="en-us_topic_0151920961_r2ad2cb74e72f4a52ab523486d1fb5e23"><th class="cellrowborder" valign="top" width="18.23%" id="mcps1.2.3.1.1"><p id="en-us_topic_0151920961_a995c5cbca5ec49f48097e94e0692222e"><a name="en-us_topic_0151920961_a995c5cbca5ec49f48097e94e0692222e"></a><a name="en-us_topic_0151920961_a995c5cbca5ec49f48097e94e0692222e"></a>Format Option</p>
</th>
<th class="cellrowborder" valign="top" width="81.77%" id="mcps1.2.3.1.2"><p id="en-us_topic_0151920961_a2c082d7678c14c54acae9c32cb46efa9"><a name="en-us_topic_0151920961_a2c082d7678c14c54acae9c32cb46efa9"></a><a name="en-us_topic_0151920961_a2c082d7678c14c54acae9c32cb46efa9"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0151920961_r4bf64ec46df3458db0b40dd2597b96a4"><td class="cellrowborder" valign="top" width="18.23%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151920961_a7c84b16430784236af6f428bb03354e6"><a name="en-us_topic_0151920961_a7c84b16430784236af6f428bb03354e6"></a><a name="en-us_topic_0151920961_a7c84b16430784236af6f428bb03354e6"></a>%H</p>
</td>
<td class="cellrowborder" valign="top" width="81.77%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151920961_af1ad9a0cf0f74e28905916c24e9a624c"><a name="en-us_topic_0151920961_af1ad9a0cf0f74e28905916c24e9a624c"></a><a name="en-us_topic_0151920961_af1ad9a0cf0f74e28905916c24e9a624c"></a>The hour in the HH format (for example, 17)</p>
</td>
</tr>
<tr id="en-us_topic_0151920961_r81bd46c86c484a2d8127ac25f8cd3f84"><td class="cellrowborder" valign="top" width="18.23%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151920961_ac75c896629a94f5a948ecf00d9ae846c"><a name="en-us_topic_0151920961_ac75c896629a94f5a948ecf00d9ae846c"></a><a name="en-us_topic_0151920961_ac75c896629a94f5a948ecf00d9ae846c"></a>%M</p>
</td>
<td class="cellrowborder" valign="top" width="81.77%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151920961_a713b23439f944c7e89dad6ad8fd3a00b"><a name="en-us_topic_0151920961_a713b23439f944c7e89dad6ad8fd3a00b"></a><a name="en-us_topic_0151920961_a713b23439f944c7e89dad6ad8fd3a00b"></a>The minute in the MM format (for example, 37)</p>
</td>
</tr>
<tr id="en-us_topic_0151920961_r01f5733f51244eb08597f035a86f62d3"><td class="cellrowborder" valign="top" width="18.23%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151920961_a83cbeee8d15d4ab19166f8859aca3c94"><a name="en-us_topic_0151920961_a83cbeee8d15d4ab19166f8859aca3c94"></a><a name="en-us_topic_0151920961_a83cbeee8d15d4ab19166f8859aca3c94"></a>%S</p>
</td>
<td class="cellrowborder" valign="top" width="81.77%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151920961_a198c8d8580fa4d00b3a701f522cf2eb3"><a name="en-us_topic_0151920961_a198c8d8580fa4d00b3a701f522cf2eb3"></a><a name="en-us_topic_0151920961_a198c8d8580fa4d00b3a701f522cf2eb3"></a>The second in the SS format (for example, 25)</p>
</td>
</tr>
<tr id="en-us_topic_0151920961_r8bdf9b4c58f24f6982fc6b6b3def6ec3"><td class="cellrowborder" valign="top" width="18.23%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151920961_a52b3ddb644664af794aed0ceef431eae"><a name="en-us_topic_0151920961_a52b3ddb644664af794aed0ceef431eae"></a><a name="en-us_topic_0151920961_a52b3ddb644664af794aed0ceef431eae"></a>%d</p>
</td>
<td class="cellrowborder" valign="top" width="81.77%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151920961_a0d60b507d1064efdb930ff4800d11205"><a name="en-us_topic_0151920961_a0d60b507d1064efdb930ff4800d11205"></a><a name="en-us_topic_0151920961_a0d60b507d1064efdb930ff4800d11205"></a>The day of the month in the DD format (for example, 15)</p>
</td>
</tr>
<tr id="en-us_topic_0151920961_r6156a88a26d14f2f89e6540944718f47"><td class="cellrowborder" valign="top" width="18.23%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151920961_a312fb7c0a5ad48dfb2e9b7d17e99c1d9"><a name="en-us_topic_0151920961_a312fb7c0a5ad48dfb2e9b7d17e99c1d9"></a><a name="en-us_topic_0151920961_a312fb7c0a5ad48dfb2e9b7d17e99c1d9"></a>%m</p>
</td>
<td class="cellrowborder" valign="top" width="81.77%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151920961_a893723adba374d028ebb80fed09bf3e6"><a name="en-us_topic_0151920961_a893723adba374d028ebb80fed09bf3e6"></a><a name="en-us_topic_0151920961_a893723adba374d028ebb80fed09bf3e6"></a>The month in the MM format (for example, 07)</p>
</td>
</tr>
<tr id="en-us_topic_0151920961_r34b505f1fd7741cfb1780a831fbf72d2"><td class="cellrowborder" valign="top" width="18.23%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151920961_ac01465841ba64c03ae64788361a25a4e"><a name="en-us_topic_0151920961_ac01465841ba64c03ae64788361a25a4e"></a><a name="en-us_topic_0151920961_ac01465841ba64c03ae64788361a25a4e"></a>%Y</p>
</td>
<td class="cellrowborder" valign="top" width="81.77%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151920961_a6419efda4cdc4072914756ebb31ec1fa"><a name="en-us_topic_0151920961_a6419efda4cdc4072914756ebb31ec1fa"></a><a name="en-us_topic_0151920961_a6419efda4cdc4072914756ebb31ec1fa"></a>The year in the YYYY format (for example, 2019)</p>
</td>
</tr>
<tr id="en-us_topic_0151920961_r2a7d4de380fe4194ab6d757429583f60"><td class="cellrowborder" valign="top" width="18.23%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151920961_ada7b17d82b7b45668fef67f483b31b33"><a name="en-us_topic_0151920961_ada7b17d82b7b45668fef67f483b31b33"></a><a name="en-us_topic_0151920961_ada7b17d82b7b45668fef67f483b31b33"></a>%Z</p>
</td>
<td class="cellrowborder" valign="top" width="81.77%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151920961_ac10a70e17c7b4dab86f97d3e460849a8"><a name="en-us_topic_0151920961_ac10a70e17c7b4dab86f97d3e460849a8"></a><a name="en-us_topic_0151920961_ac10a70e17c7b4dab86f97d3e460849a8"></a>The time zone abbreviation (for example, CEST)</p>
</td>
</tr>
<tr id="en-us_topic_0151920961_r65c5b28a951b4f10a0ab67d51ea41c75"><td class="cellrowborder" valign="top" width="18.23%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151920961_aaf432a3ed9c548d7bd3b45929723ca72"><a name="en-us_topic_0151920961_aaf432a3ed9c548d7bd3b45929723ca72"></a><a name="en-us_topic_0151920961_aaf432a3ed9c548d7bd3b45929723ca72"></a>%F</p>
</td>
<td class="cellrowborder" valign="top" width="81.77%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151920961_a7a6917b7cf9a46759467cd140afc17e9"><a name="en-us_topic_0151920961_a7a6917b7cf9a46759467cd140afc17e9"></a><a name="en-us_topic_0151920961_a7a6917b7cf9a46759467cd140afc17e9"></a>The full date in the YYYY-MM-DD format (for example, 2019-7-15). This option is equal to %Y-%m-%d.</p>
</td>
</tr>
<tr id="en-us_topic_0151920961_r722205ab957549d187a171eb72cb040b"><td class="cellrowborder" valign="top" width="18.23%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0151920961_a2e925e19328a49b082150aadec3869a2"><a name="en-us_topic_0151920961_a2e925e19328a49b082150aadec3869a2"></a><a name="en-us_topic_0151920961_a2e925e19328a49b082150aadec3869a2"></a>%T</p>
</td>
<td class="cellrowborder" valign="top" width="81.77%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0151920961_a7dafd8b31b2e47da84f62588b5290fe6"><a name="en-us_topic_0151920961_a7dafd8b31b2e47da84f62588b5290fe6"></a><a name="en-us_topic_0151920961_a7dafd8b31b2e47da84f62588b5290fe6"></a>The full time in the HH:MM:SS format (for example, 18:30:25). This option is equal to %H:%M:%S.</p>
</td>
</tr>
</tbody>
</table>
Example commands and outputs:

- To display the current date and time:
  
  ```
  $ date 
  Sat Aug  17 17:26:34 CST 2019
  ```

- To display the current date and time in UTC:
  
  ```
  $ date --utc
  Sat Aug  17 09:26:18 UTC 2019
  ```

- To customize the output of the date command:
  
  ```
  $ date +"%Y-%m-%d %H:%M"
  2019-08-17 17:24
  ```

#### Changing the Current Time

To change the current time, run the date command with the --set or -s option as the root user: Run the following command as the user  **root**. In the command,  _HH_  indicates the hour,  _MM_  indicates the minute, and  _SS_  indicates the second. Change them based on the site requirements.

```
# date --set HH:MM:SS
```

By default, the date command sets the local time. To set the system clock in UTC instead, run the command with the --utc or -u command line option:

```
# date --set HH:MM:SS --utc
```

For example, to change the current time to 23:26:00, run the following command as the user  **root**:

```
# date --set 23:26:00
```

#### Changing the Current Date

To change the current date, run the command with the --set or -s command line option. Run the following command as the user  **root**. In the command,  _YYYY_  indicates the year,  _MM_  indicates the month, and  _DD_  indicates the day. Change them based on the site requirements.

```
# date --set YYYY-MM-DD
```

For example, to change the current date to November 2, 2019, run the following command as the user  **root**:

```
# date --set 2019-11-02
```

### Using the hwclock Command

You can run the hwclock command to set the real time clock (RTC).

#### Real-Time Clock and System Clock

Linux divides clocks into the following types:

- System clock: clock of the current Linux kernel.
- Hardware clock RTC: hardware clock of the mainboard powered by the battery. This clock can be set in the  **Standard BIOS Feature**  option of the BIOS.

When Linux starts, it reads the RTC and sets the system clock time based on the RTC time.

#### Displaying the Current Date and Time

To display the current RTC date and time, run the following command as the user  **root**:

```
# hwclock
```

Example command output:

```
# hwclock
2019-08-26 10:18:42.528948+08:00
```

#### Setting the Date and Time

Run the following command as the user  **root**  to change the date and time of the current hardware. In the command,  _dd_  indicates the day,  _mm_  indicates the month,  _yyyy_  indicates the year,  _HH_  indicates the hour, and  _MM_  indicates the minute. Change them based on the site requirements.

```
# hwclock --set --date "dd mm yyyy HH:MM"
```

For example, to change the current time to 21:17 on October 21, 2019, run the following command:

```
# hwclock --set --date "21 Oct 2019 21:17" --utc
```

## Setting kdump

This section describes how to set the memory reserved for kdump and modify parameters in the kdump configuration file.

### Setting the Memory Reserved for kdump

#### Parameter Formats of the Memory Reserved for kdump

The memory reserved for kdump must be added to the bootargs in the **/boot/efi/EFI/openEuler/grub.cfg** configuration file. The memory reserved for kdump has been added to the released openEuler version by default and can be adjusted as required. After adding or modifying the bootargs, restart the system for the setting to take effect. The parameter formats of the memory reserved for kdump are as follows:

| Bootarg| Description| Default Value| Remarks|
|----------|----------|----------|----------|
| crashkernel=x| If the physical memory size is less than 4 GB, x of the memory is reserved for kdump.| The default value is 512 MB for x86.| This configuration method is used only when the available memory size is less than 4 GB. In this case, ensure that the available contiguous memory is sufficient for reservation.|
| crashkernel=x@y| x of the memory is reserved at the start address of y for kdump.| Unused| Ensure that x of the memory at the start address of y is not reserved for other modules.|
| crashkernel=x,high| If the physical memory size is less than 4 GB, 256 MB memory is reserved. If the physical memory size is greater than 4 GB, x of the memory is reserved for kdump. | The default value is 1024M,high for ARM64.| Ensure that the available physical contiguous memory size is greater than or equal to 256 MB when the memory size is less than 4 GB, and is greater than or equal to x when the memory size is greater than 4 GB. The actual reserved memory size is 256 MB + x. |
| crashkernel=x,low crashkernel=y,high| x of the memory is reserved for kdump when the physical memory size is less than 4 GB, and y of the memory is reserved for kdump when the physical memory size is greater than 4 GB. | Unused| Ensure that the available physical contiguous memory size is greater than or equal to x when the physical memory size is less than 4 GB, and is greater than or equal to y when the physical memory size is greater than 4 GB.|

### Recommended Reserved Memory

| Recommended Solution| Reserved Parameter| Description|
|----------|----------|----------|
| General solution| crashkernel=2048M,high| If the memory size is less than 4 GB, 256 MB is reserved for kdump. If the memory size is greater than 4 GB, 2048 MB is reserved for kdump. 256 + 2048 MB in total.|
| Economical solution| crashkernel=1024M,high| If the memory size is less than 4 GB, 256 MB is reserved for kdump. If the memory size is greater than 4 GB, 1024 MB is reserved for kdump. 256 + 1024 MB in total. It is recommended that kdump files not be dumped using the network in scenarios where the system memory size is less than 512 GB. In VM scenarios, you can reduce the reserved memory. You are advised to set crashkernel to 512M or crashkernel to 256M,high.|

> ![](public_sys-resources/icon-note.gif) **NOTE:**   
>
> If kdump files are not dumped using the network, you need to set the kdump file system not to pack network drivers. Loading the network driver requires a large amount of memory. As a result, the memory reserved for kdump may be insufficient and kdump may fail. Therefore, you are advised to disable network drivers.

### Disabling Network Drivers

In the kdump configuration file **/etc/kdump.conf**, the dracut parameters can be used to set the tailored driver module. You can configure the network driver to the tailored driver list to prevent the kdump file system from loading the driver. After the configuration file is modified, restart the kdump service for the modification to take effect. Set the dracut parameters as follows:

`dracut_args --omit-drivers "mdio-gpi usb_8dev et1011c rt2x00usb bcm-phy-lib mac80211_hwsim rtl8723be rndis_host hns3_cae amd vrf rtl8192cu mt76x02-lib int51x1 ppp_deflate team_mode_loadbalance smsc911x aweth bonding mwifiex_usb hnae dnet rt2x00pci vaser_pci hdlc_ppp marvell rtl8xxxu mlxsw_i2c ath9k_htc rtl8150 smc91x cortina at803x rockchip cxgb4 spi_ks8995 mt76x2u smsc9420 mdio-cavium bnxt_en ch9200 dummy macsec ice mt7601u rtl8188ee ixgbevf net1080 liquidio_vf be2net mlxsw_switchx2 gl620a xilinx_gmii2rgmii ppp_generic rtl8192de sja1000_platform ath10k_core cc770_platform realte igb c_can_platform c_can ethoc dm9601 smsc95xx lg-vl600 ifb enic ath9 mdio-octeon ppp_mppe ath10k_pci cc770 team_mode_activebackup marvell10g hinic rt2x00lib mlx4_en iavf broadcom igc c_can_pci alx rtl8192se rtl8723ae microchip lan78xx atl1c rtl8192c-common almia ax88179_178a qed netxen_nic brcmsmac rt2800usb e1000 qla3xxx mdio-bitbang qsemi mdio-mscc-miim plx_pci ipvlan r8152 cx82310_eth slhc mt76x02-usb ems_pci xen-netfront usbnet pppoe mlxsw_minimal mlxsw_spectrum cdc_ncm rt2800lib rtl_usb hnae3 ath9k_common ath9k_hw catc mt76 hns_enet_drv ppp_async huawei_cdc_ncm i40e rtl8192ce dl2 qmi_wwan mii peak_usb plusb can-dev slcan amd-xgbe team_mode_roundrobin ste10Xp thunder_xcv pptp thunder_bgx ixgbe davicom icplus tap tun smsc75xx smsc dlci hns_dsaf mlxsw_core rt2800mmi softing uPD60620 vaser_usb dp83867 brcmfmac mwifiex_pcie mlx4_core micrel team macvlan bnx2 virtio_net rtl_pci zaurus hns_mdi libcxgb hv_netvsc nicvf mt76x0u teranetics mlxfw cdc_eem qcom-emac pppox mt76-usb sierra_net i40evf bcm87xx mwifiex pegasus rt2x00mmi sja1000 ena hclgevf cnic cxgb4vf ppp_synctty iwlmvm team_mode_broadcast vxlan vsockmon hdlc_cisc rtl8723-common bsd_comp fakelb dp83822 dp83tc811 cicada fm10 8139t sfc hs geneve hclge xgene-enet-v2 cdc_mbim hdlc asix netdevsim rt2800pci team_mode_random lxt ems_usb mlxsw_pci sr9700 mdio-thunder mlxsw_switchib macvtap atlantic cdc_ether mcs7830 nicpf mdi peak_pci atl1e cdc_subset ipvtap btcoexist mt76x0-common veth slip iwldvm bcm7xxx vitesse netconsole epic100 myri10ge r8169 qede microchip_t1 liquidi bnx2x brcmutil mwifiex_sdi mlx5_core rtlwifi vmxnet3 nlmon hns3 hdlc_raw esd_usb2 atl2 mt76x2-common iwlwifi mdio-bcm-unimac national ath rtwpci rtw88 nfp rtl8821ae fjes thunderbolt-net 8139cp atl1 mscc vcan dp83848 dp83640 hdlc_fr e1000e ipheth net_failover aquantia rtl8192ee igbvf rocker intel-xway tg3" --omit "ramdisk network ifcfg qemu-net" --install "chmod" --nofscks`