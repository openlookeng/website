# OS Hardening Overview
- [OS Hardening Overview](#os-hardening-overview)
    - [Security Hardening Purpose](#security-hardening-purpose)
    - [Security Hardening Solution](#security-hardening-solution)
    - [Security Hardening Impacts](#security-hardening-impacts)

This chapter describes the purpose and solution of openEuler system hardening.



## security-hardening-purpose

The OS, as the core of the information system, manages hardware and software resources and is the basis of information system security. Applications must depend on the OS to ensure the integrity, confidentiality, availability, and controllability of information. Without the OS security protection, protective methods against hackers and virus attacks at other layers cannot meet the security requirements.

Therefore, security hardening is essential for an OS. Security hardening helps build a dynamic and complete security system, enhance product security, and improve product competitiveness.

## security-hardening-solution

This section describes the openEuler security hardening solution, including the hardening method and items.

### Security Hardening Method

You can manually modify security hardening configurations or run commands to harden the system, or use the security hardening tool to modify security hardening items in batches. The openEuler security hardening tool runs as openEuler-security.service. When the system is started for the first time, the system automatically runs the service to execute the default hardening policy, and automatically set the service not to start as the system starts.

You can modify the  **security.conf**  file and use the security hardening tool to implement user-defined security hardening.


## security hardening impacts

Security hardening on file permissions and account passwords may change user habits, affecting system usability. For details about common hardening items that affect system usability, see  [Table 1](#en-us_topic_0152100325_ta4a48f54ff2849ada7845e2380209917).

**Table  1**  Security hardening impacts

<a name="en-us_topic_0152100325_ta4a48f54ff2849ada7845e2380209917"></a>
<table><thead align="left"><tr id="en-us_topic_0152100325_rd05d3faa5e5447ccacdcafdd6794f2e3"><th class="cellrowborder" valign="top" width="17.47%" id="mcps1.2.5.1.1"><p id="en-us_topic_0152100325_aa598371d67174f45b67422097655cb23"><a name="en-us_topic_0152100325_aa598371d67174f45b67422097655cb23"></a><a name="en-us_topic_0152100325_aa598371d67174f45b67422097655cb23"></a><strong id="b1418518812"><a name="b1418518812"></a><a name="b1418518812"></a>Item</strong></p>
</th>
<th class="cellrowborder" valign="top" width="43.78%" id="mcps1.2.5.1.2"><p id="en-us_topic_0152100325_a2c8372c081c8445da060b863a7b95513"><a name="en-us_topic_0152100325_a2c8372c081c8445da060b863a7b95513"></a><a name="en-us_topic_0152100325_a2c8372c081c8445da060b863a7b95513"></a><strong id="b1184011219914"><a name="b1184011219914"></a><a name="b1184011219914"></a>Suggestion</strong></p>
</th>
<th class="cellrowborder" valign="top" width="19.98%" id="mcps1.2.5.1.3"><p id="en-us_topic_0152100325_afe5f3d1fd3b840e4ad29ac79834b6b4d"><a name="en-us_topic_0152100325_afe5f3d1fd3b840e4ad29ac79834b6b4d"></a><a name="en-us_topic_0152100325_afe5f3d1fd3b840e4ad29ac79834b6b4d"></a><strong id="b95371146792"><a name="b95371146792"></a><a name="b95371146792"></a>Impact</strong></p>
</th>
<th class="cellrowborder" valign="top" width="18.77%" id="mcps1.2.5.1.4"><p id="p108711712131813"><a name="p108711712131813"></a><a name="p108711712131813"></a><strong id="b1500129145116"><a name="b1500129145116"></a><a name="b1500129145116"></a>Configured By Default</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0152100325_rcc11b04ab3a74cccad4589056df780a4"><td class="cellrowborder" valign="top" width="17.47%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100325_a76ea162dd00d4e7eae92a5d69cc8cd38"><a name="en-us_topic_0152100325_a76ea162dd00d4e7eae92a5d69cc8cd38"></a><a name="en-us_topic_0152100325_a76ea162dd00d4e7eae92a5d69cc8cd38"></a>Timeout setting on the text-based user interface (TUI)</p>
</td>
<td class="cellrowborder" valign="top" width="43.78%" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0152100325_adce9785c0c64448ca37abfcc273a40d3"><a name="en-us_topic_0152100325_adce9785c0c64448ca37abfcc273a40d3"></a><a name="en-us_topic_0152100325_adce9785c0c64448ca37abfcc273a40d3"></a>When the TUI is idle for a long period of time, it automatically exits.</p>
<div class="note" id="en-us_topic_0152100325_n7431bf82009941eeba404af555e7ba11"><a name="en-us_topic_0152100325_n7431bf82009941eeba404af555e7ba11"></a><a name="en-us_topic_0152100325_n7431bf82009941eeba404af555e7ba11"></a><span class="notetitle"> NOTE: </span><div class="notebody"><p id="en-us_topic_0152100325_aa4edbe9f869b4ab4acc5e75d502c2b9f"><a name="en-us_topic_0152100325_aa4edbe9f869b4ab4acc5e75d502c2b9f"></a><a name="en-us_topic_0152100325_aa4edbe9f869b4ab4acc5e75d502c2b9f"></a>When a user logs in to the system using SSH, the timeout period is determined by the smaller value of the <strong id="b480289201910"><a name="b480289201910"></a><a name="b480289201910"></a>TMOUT</strong> field in the <strong id="b1949191219195"><a name="b1949191219195"></a><a name="b1949191219195"></a>/etc/profile</strong> file and the <strong id="b411631751914"><a name="b411631751914"></a><a name="b411631751914"></a>ClientAliveInterval</strong> field in the <strong id="b1308220121913"><a name="b1308220121913"></a><a name="b1308220121913"></a>/etc/ssh/sshd_config</strong> file. You are advised to set this parameter to 300 seconds.</p>
</div></div>
</td>
<td class="cellrowborder" valign="top" width="19.98%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100325_a6342ce9d0b414cd08795e70da9a743bc"><a name="en-us_topic_0152100325_a6342ce9d0b414cd08795e70da9a743bc"></a><a name="en-us_topic_0152100325_a6342ce9d0b414cd08795e70da9a743bc"></a>If you do not perform any operation on the TUI for a long time, TUI automatically exits.</p>
</td>
<td class="cellrowborder" valign="top" width="18.77%" headers="mcps1.2.5.1.4 "><p id="p1887111261814"><a name="p1887111261814"></a><a name="p1887111261814"></a>No</p>
</td>
</tr>
<tr id="en-us_topic_0152100325_r0c042a2ace8c435d9cfaac208f7b1107"><td class="cellrowborder" valign="top" width="17.47%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100325_a9c95c3635d6445718bb8a21d22791e7b"><a name="en-us_topic_0152100325_a9c95c3635d6445718bb8a21d22791e7b"></a><a name="en-us_topic_0152100325_a9c95c3635d6445718bb8a21d22791e7b"></a>Password complexity</p>
</td>
<td class="cellrowborder" valign="top" width="43.78%" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0152100325_a6783904402a54b7996f1e127a59b3940"><a name="en-us_topic_0152100325_a6783904402a54b7996f1e127a59b3940"></a><a name="en-us_topic_0152100325_a6783904402a54b7996f1e127a59b3940"></a>The password is a string containing at least eight characters chosen from three or four of the following types: uppercase letters, lowercase letters, digits, and special characters. </p>
</td>
<td class="cellrowborder" valign="top" width="19.98%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100325_a8c83cd5f19144126b7774330f00551ee"><a name="en-us_topic_0152100325_a8c83cd5f19144126b7774330f00551ee"></a><a name="en-us_topic_0152100325_a8c83cd5f19144126b7774330f00551ee"></a>All passwords must comply with the complexity requirements. </p>
</td>
<td class="cellrowborder" valign="top" width="18.77%" headers="mcps1.2.5.1.4 "><p id="p88711112161811"><a name="p88711112161811"></a><a name="p88711112161811"></a>No</p>
</td>
</tr>
<tr id="en-us_topic_0152100325_r9b2a4f8916f145418c1da9a0c73f5d61"><td class="cellrowborder" valign="top" width="17.47%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100325_a0d982775f49c4dd7a8270a00ee40e7ba"><a name="en-us_topic_0152100325_a0d982775f49c4dd7a8270a00ee40e7ba"></a><a name="en-us_topic_0152100325_a0d982775f49c4dd7a8270a00ee40e7ba"></a>Password retry limits</p>
</td>
<td class="cellrowborder" valign="top" width="43.78%" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0152100325_ad5d6ed296d0c425e8a8bb3c539b9fa65"><a name="en-us_topic_0152100325_ad5d6ed296d0c425e8a8bb3c539b9fa65"></a><a name="en-us_topic_0152100325_ad5d6ed296d0c425e8a8bb3c539b9fa65"></a>If a user fails to enter the correct password for three consecutive times when logging in to the OS, the user account will be locked for 60 seconds.</p>
</td>
<td class="cellrowborder" valign="top" width="19.98%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100325_ae40c3acc85fb45b8bca23ca57a841a9a"><a name="en-us_topic_0152100325_ae40c3acc85fb45b8bca23ca57a841a9a"></a><a name="en-us_topic_0152100325_ae40c3acc85fb45b8bca23ca57a841a9a"></a>After the account is locked, the user can log in to the system only after 60 seconds.</p>
</td>
<td class="cellrowborder" valign="top" width="18.77%" headers="mcps1.2.5.1.4 "><p id="p14871312171816"><a name="p14871312171816"></a><a name="p14871312171816"></a>Yes</p>
</td>
</tr>
<tr id="en-us_topic_0152100325_rcc94b95d96b241aa8ff86a1e35651c93"><td class="cellrowborder" valign="top" width="17.47%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100325_a50777c5e7fb04d4aa0b2b6e7a462eda5"><a name="en-us_topic_0152100325_a50777c5e7fb04d4aa0b2b6e7a462eda5"></a><a name="en-us_topic_0152100325_a50777c5e7fb04d4aa0b2b6e7a462eda5"></a>Default <strong id="b19834033010"><a name="b19834033010"></a><a name="b19834033010"></a>umask</strong> value</p>
</td>
<td class="cellrowborder" valign="top" width="43.78%" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0152100325_a5ed2cfd9a2f94f1299195787c8e57c58"><a name="en-us_topic_0152100325_a5ed2cfd9a2f94f1299195787c8e57c58"></a><a name="en-us_topic_0152100325_a5ed2cfd9a2f94f1299195787c8e57c58"></a>The default <strong id="b460034313308"><a name="b460034313308"></a><a name="b460034313308"></a>umask</strong> value of all users is set to <strong id="b62851273251"><a name="b62851273251"></a><a name="b62851273251"></a>077</strong> so that the default permission on files created by users is <strong id="b825335742517"><a name="b825335742517"></a><a name="b825335742517"></a>600</strong> and the default permission on directories is <strong id="b11195316269"><a name="b11195316269"></a><a name="b11195316269"></a>700</strong>.</p>
</td>
<td class="cellrowborder" valign="top" width="19.98%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100325_aa9ebce6d92aa431ab74b1aae74ac4fcd"><a name="en-us_topic_0152100325_aa9ebce6d92aa431ab74b1aae74ac4fcd"></a><a name="en-us_topic_0152100325_aa9ebce6d92aa431ab74b1aae74ac4fcd"></a>Users must modify the permission on specified files or directories as required. </p>
</td>
<td class="cellrowborder" valign="top" width="18.77%" headers="mcps1.2.5.1.4 "><p id="p487281201814"><a name="p487281201814"></a><a name="p487281201814"></a>Yes</p>
</td>
</tr>
<tr id="en-us_topic_0152100325_ree47c9608d3f4fac9022789cd35ce7f5"><td class="cellrowborder" valign="top" width="17.47%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100325_ac3b034f91adb4945a27db1bdc437b5b1"><a name="en-us_topic_0152100325_ac3b034f91adb4945a27db1bdc437b5b1"></a><a name="en-us_topic_0152100325_ac3b034f91adb4945a27db1bdc437b5b1"></a>Password validity period</p>
</td>
<td class="cellrowborder" valign="top" width="43.78%" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0152100325_a24e70a421e174b9187ccffcdf1b9138e"><a name="en-us_topic_0152100325_a24e70a421e174b9187ccffcdf1b9138e"></a><a name="en-us_topic_0152100325_a24e70a421e174b9187ccffcdf1b9138e"></a>The password validity period can be modified in the <strong id="b36801440202812"><a name="b36801440202812"></a><a name="b36801440202812"></a>/etc/login.defs</strong> file and is set to <strong id="b1854203832115"><a name="b1854203832115"></a><a name="b1854203832115"></a>90 days</strong> by default. It can be modified in any time. An expiration notification will be displayed seven days before a password is to expire.</p>
</td>
<td class="cellrowborder" valign="top" width="19.98%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100325_a7233484114994985a35c9b75eeb0b299"><a name="en-us_topic_0152100325_a7233484114994985a35c9b75eeb0b299"></a><a name="en-us_topic_0152100325_a7233484114994985a35c9b75eeb0b299"></a>When a user attempts to log in after the password expires, the user will be informed of the password expiry and is required to change the password. If the user does not change the password, the user cannot access the system. </p>
</td>
<td class="cellrowborder" valign="top" width="18.77%" headers="mcps1.2.5.1.4 "><p id="p587214122187"><a name="p587214122187"></a><a name="p587214122187"></a>No</p>
</td>
</tr>
<tr id="en-us_topic_0152100325_r5d69e50d053640c2b229d2dbc29642f1"><td class="cellrowborder" valign="top" width="17.47%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100325_a7ded50eeee264e05a0ddff3830d594e8"><a name="en-us_topic_0152100325_a7ded50eeee264e05a0ddff3830d594e8"></a><a name="en-us_topic_0152100325_a7ded50eeee264e05a0ddff3830d594e8"></a><strong id="b201602408303"><a name="b201602408303"></a><a name="b201602408303"></a>su</strong> permission control</p>
</td>
<td class="cellrowborder" valign="top" width="43.78%" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0152100325_aba8c12e1e43549898d42faaabcd0fa90"><a name="en-us_topic_0152100325_aba8c12e1e43549898d42faaabcd0fa90"></a><a name="en-us_topic_0152100325_aba8c12e1e43549898d42faaabcd0fa90"></a>The <strong id="b8409113173015"><a name="b8409113173015"></a><a name="b8409113173015"></a>su</strong> command is used to switch user accounts. To improve system security, only the user <strong id="b8422913143118"><a name="b8422913143118"></a><a name="b8422913143118"></a>root</strong> and users in the wheel group can use the <strong id="b17211191520155"><a name="b17211191520155"></a><a name="b17211191520155"></a>su</strong> command.</p>
</td>
<td class="cellrowborder" valign="top" width="19.98%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100325_a68be3c8524bb4cd488cc6c538b0661f9"><a name="en-us_topic_0152100325_a68be3c8524bb4cd488cc6c538b0661f9"></a><a name="en-us_topic_0152100325_a68be3c8524bb4cd488cc6c538b0661f9"></a>Common users can successfully run the <strong id="b51891555163111"><a name="b51891555163111"></a><a name="b51891555163111"></a>su</strong> command only after joining in the wheel group.</p>
</td>
<td class="cellrowborder" valign="top" width="18.77%" headers="mcps1.2.5.1.4 "><p id="p1987211281816"><a name="p1987211281816"></a><a name="p1987211281816"></a>Yes</p>
</td>
</tr>
<tr id="en-us_topic_0152100325_r5044dfb012a24c14a3efe3b3cb6046c6"><td class="cellrowborder" valign="top" width="17.47%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100325_a1e891409915f4242b274bc4677ce60a0"><a name="en-us_topic_0152100325_a1e891409915f4242b274bc4677ce60a0"></a><a name="en-us_topic_0152100325_a1e891409915f4242b274bc4677ce60a0"></a>Disabling user <strong id="b23901613133316"><a name="b23901613133316"></a><a name="b23901613133316"></a>root</strong> from logging in using SSH</p>
</td>
<td class="cellrowborder" valign="top" width="43.78%" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0152100325_aa976bce2f5dd47e3b3b1166cac4e16fd"><a name="en-us_topic_0152100325_aa976bce2f5dd47e3b3b1166cac4e16fd"></a><a name="en-us_topic_0152100325_aa976bce2f5dd47e3b3b1166cac4e16fd"></a>Set the value of the <strong id="b210483083314"><a name="b210483083314"></a><a name="b210483083314"></a>PermitRootLogin</strong> field in the <strong id="b23761733193319"><a name="b23761733193319"></a><a name="b23761733193319"></a>/etc/ssh/sshd_config</strong> file to <strong id="b881183519333"><a name="b881183519333"></a><a name="b881183519333"></a>no</strong>. In this way, user <strong id="b138515386335"><a name="b138515386335"></a><a name="b138515386335"></a>root</strong> cannot directly log in to the system using SSH.</p>
</td>
<td class="cellrowborder" valign="top" width="19.98%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100325_aa653f882efc44a079dd857ac47e1a5a7"><a name="en-us_topic_0152100325_aa653f882efc44a079dd857ac47e1a5a7"></a><a name="en-us_topic_0152100325_aa653f882efc44a079dd857ac47e1a5a7"></a>You need to log in to the system as a common user in SSH mode and then switch to user <strong id="b124481554183315"><a name="b124481554183315"></a><a name="b124481554183315"></a>root</strong>.</p>
</td>
<td class="cellrowborder" valign="top" width="18.77%" headers="mcps1.2.5.1.4 "><p id="p187217122180"><a name="p187217122180"></a><a name="p187217122180"></a>No</p>
</td>
</tr>
<tr id="en-us_topic_0152100325_ra727376cfffd41abbda239e56ea04031"><td class="cellrowborder" valign="top" width="17.47%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100325_adb83e79e22404a0e82401e9f1f77f902"><a name="en-us_topic_0152100325_adb83e79e22404a0e82401e9f1f77f902"></a><a name="en-us_topic_0152100325_adb83e79e22404a0e82401e9f1f77f902"></a>Strong SSH encryption algorithm </p>
</td>
<td class="cellrowborder" valign="top" width="43.78%" headers="mcps1.2.5.1.2 "><p id="en-us_topic_0152100325_a99f4aab13c1a4b1eaf932d1e68a4db05"><a name="en-us_topic_0152100325_a99f4aab13c1a4b1eaf932d1e68a4db05"></a><a name="en-us_topic_0152100325_a99f4aab13c1a4b1eaf932d1e68a4db05"></a>The MACs and Ciphers configurations of SSH services support the CTR and SHA2 algorithms and do not support the CBC, MD5, and SHA1 algorithms.</p>
</td>
<td class="cellrowborder" valign="top" width="19.98%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100325_a6fb7c8685ec84d5abcf280ef6b2e2c36"><a name="en-us_topic_0152100325_a6fb7c8685ec84d5abcf280ef6b2e2c36"></a><a name="en-us_topic_0152100325_a6fb7c8685ec84d5abcf280ef6b2e2c36"></a>Some early Xshell and PuTTY versions do not support aes128-ctr, aes192-ctr, aes256-ctr, hmac-sha2-256, and hmac-sha2-512 algorithms. Ensure that the latest PuTTY (0.63 or later) and Xshell (5.0 or later) are used.</p>
</td>
<td class="cellrowborder" valign="top" width="18.77%" headers="mcps1.2.5.1.4 "><p id="p68721712101814"><a name="p68721712101814"></a><a name="p68721712101814"></a>Yes</p>
</td>
</tr>
</tbody>
</table>

