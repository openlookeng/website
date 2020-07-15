# Account Passwords

- [Account Passwords](#account-passwords)
    - [Shielding System Accounts](#shielding-system-accounts)
    - [Restricting Permissions on the su Command](#restricting-permissions-on-the-su-command)
    - [Setting Password Complexity](#setting-password-complexity)
    - [Setting the Password Validity Period](#setting-the-password-validity-period)
    - [Setting Password Encryption Algorithms](#setting-password-encryption-algorithms)
    - [Locking an Account After Three Login Failures](#locking-an-account-after-three-login-failures)
    - [Hardening the su Command](#hardening-the-su-command)

## Shielding System Accounts

### Description

Accounts excluding user accounts are system accounts. System accounts cannot be used for logins or performing other operations. Therefore, system accounts must be shielded.

### Implementation

Modify the shell of a system account to  **/sbin/nologin**.

```
usermod -L -s /sbin/nologin $systemaccount
```

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>_$systemaccount_  indicates the system account.  

## Restricting Permissions on the su Command

### Description

The  **su**  command is used to switch user accounts. To improve system security, only the user  **root**  and users in the wheel group can use the  **su**  command.

### Implementation

Modify the  **/etc/pam.d/su**  file as follows: 

```
auth         required      pam_wheel.so use_uid
```

  

**Table  1**  Configuration item in pam\_wheel.so

<a name="en-us_topic_0152100407_tf55aaab642874a94a4f0eacb7895b1b8"></a>
<table><thead align="left"><tr id="en-us_topic_0152100407_rf154f262c0e244db9934b613e42bcfca"><th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.1"><p id="en-us_topic_0152100407_a2c22bb6b55ec4d2fa8e67f585f77bd00"><a name="en-us_topic_0152100407_a2c22bb6b55ec4d2fa8e67f585f77bd00"></a><a name="en-us_topic_0152100407_a2c22bb6b55ec4d2fa8e67f585f77bd00"></a><strong id="b61647805"><a name="b61647805"></a><a name="b61647805"></a>Item</strong></p>
</th>
<th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.2"><p id="en-us_topic_0152100407_ab327bc2f820a4a47999edd01015e5205"><a name="en-us_topic_0152100407_ab327bc2f820a4a47999edd01015e5205"></a><a name="en-us_topic_0152100407_ab327bc2f820a4a47999edd01015e5205"></a><strong id="en-us_topic_0152100407_ab7a5363dbe0c40bb84b26c2a6c72a56a"><a name="en-us_topic_0152100407_ab7a5363dbe0c40bb84b26c2a6c72a56a"></a><a name="en-us_topic_0152100407_ab7a5363dbe0c40bb84b26c2a6c72a56a"></a>Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0152100407_rb27893de849147aebae7d108210aa01a"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0152100407_a61109f515d4745efafbc6defc8096d44"><a name="en-us_topic_0152100407_a61109f515d4745efafbc6defc8096d44"></a><a name="en-us_topic_0152100407_a61109f515d4745efafbc6defc8096d44"></a>use_uid</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0152100407_a8a42e9fe9c9749bf9de0e3b38f27bb74"><a name="en-us_topic_0152100407_a8a42e9fe9c9749bf9de0e3b38f27bb74"></a><a name="en-us_topic_0152100407_a8a42e9fe9c9749bf9de0e3b38f27bb74"></a>UID of the current account.</p>
</td>
</tr>
</tbody>
</table>

## Setting Password Complexity

### Description

You can set the password complexity requirements by modifying the corresponding configuration file. You are advised to set the password complexity based on the site requirements.

### Implementation

The password complexity is implemented by the  **pam\_pwquality.so**  and  **pam\_pwhistory.so**  modules in the  **/etc/pam.d/password-auth**  and  **/etc/pam.d/system-auth**  files. You can modify the configuration items of the two modules to change the password complexity requirements.

### Example

This section provides an example for configuring password complexity.

**Password Complexity Requirements**

1.  Contains at least eight characters.
2.  Contains at least three types of the following characters:

    - At least one lowercase letter

    - At least one uppercase letter

    - At least one digit

    - At least one space or one of the following special characters: \` \~ ! @ \# $ % ^ & \* \( \) - \_ = + \\ | \[ \{ \} \] ; : ' " , < . \> / ?

3.  Cannot be the same as an account or the account in reverse order.
4.  Cannot be the last five passwords used.

**Implementation**

Add the following content to the  **/etc/pam.d/password-auth**  and  **/etc/pam.d/system-auth**  files:

```
password    requisite     pam_pwquality.so minlen=8 minclass=3 enforce_for_root try_first_pass local_users_only retry=3 dcredit=0 ucredit=0 lcredit=0 ocredit=0 
password    required      pam_pwhistory.so use_authtok remember=5 enforce_for_root
```

  

**Configuration Item Description**

For details about the configuration items of  **pam\_pwquality.so**  and  **pam\_pwhistory.so**, see  [Table 1](#table201221044172117)  and  [Table 2](#table1212544452120), respectively.

**Table  1**  Configuration items in pam\_pwquality.so

<a name="table201221044172117"></a>
<table><thead align="left"><tr id="row18122244142118"><th class="cellrowborder" valign="top" width="23.03%" id="mcps1.2.3.1.1"><p id="p1012384412211"><a name="p1012384412211"></a><a name="p1012384412211"></a><strong id="b18676115316"><a name="b18676115316"></a><a name="b18676115316"></a>Item</strong></p>
</th>
<th class="cellrowborder" valign="top" width="76.97%" id="mcps1.2.3.1.2"><p id="p712317444217"><a name="p712317444217"></a><a name="p712317444217"></a><strong id="b31233449214"><a name="b31233449214"></a><a name="b31233449214"></a>Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="row1912374413212"><td class="cellrowborder" valign="top" width="23.03%" headers="mcps1.2.3.1.1 "><p id="p81231744152113"><a name="p81231744152113"></a><a name="p81231744152113"></a>minlen=8</p>
</td>
<td class="cellrowborder" valign="top" width="76.97%" headers="mcps1.2.3.1.2 "><p id="p81235448219"><a name="p81235448219"></a><a name="p81235448219"></a>A password must contain at least eight characters.</p>
</td>
</tr>
<tr id="row14123644132119"><td class="cellrowborder" valign="top" width="23.03%" headers="mcps1.2.3.1.1 "><p id="p512334410219"><a name="p512334410219"></a><a name="p512334410219"></a>minclass=3</p>
</td>
<td class="cellrowborder" valign="top" width="76.97%" headers="mcps1.2.3.1.2 "><p id="p12123844102114"><a name="p12123844102114"></a><a name="p12123844102114"></a>A password must contain at least three of the following types: uppercase letters, lowercase letters, digits, and special characters.</p>
</td>
</tr>
<tr id="row412354416211"><td class="cellrowborder" valign="top" width="23.03%" headers="mcps1.2.3.1.1 "><p id="p101231844102115"><a name="p101231844102115"></a><a name="p101231844102115"></a>ucredit=0</p>
</td>
<td class="cellrowborder" valign="top" width="76.97%" headers="mcps1.2.3.1.2 "><p id="p2123184472115"><a name="p2123184472115"></a><a name="p2123184472115"></a>A password contains any number of uppercase letters.</p>
</td>
</tr>
<tr id="row17123154410212"><td class="cellrowborder" valign="top" width="23.03%" headers="mcps1.2.3.1.1 "><p id="p11124154418214"><a name="p11124154418214"></a><a name="p11124154418214"></a>lcredit=0</p>
</td>
<td class="cellrowborder" valign="top" width="76.97%" headers="mcps1.2.3.1.2 "><p id="p9124174412217"><a name="p9124174412217"></a><a name="p9124174412217"></a>A password contains any number of lowercase letters.</p>
</td>
</tr>
<tr id="row13124144419211"><td class="cellrowborder" valign="top" width="23.03%" headers="mcps1.2.3.1.1 "><p id="p20124204411217"><a name="p20124204411217"></a><a name="p20124204411217"></a>dcredit=0</p>
</td>
<td class="cellrowborder" valign="top" width="76.97%" headers="mcps1.2.3.1.2 "><p id="p1412412445217"><a name="p1412412445217"></a><a name="p1412412445217"></a>A password contains any number of digits.</p>
</td>
</tr>
<tr id="row1612444402116"><td class="cellrowborder" valign="top" width="23.03%" headers="mcps1.2.3.1.1 "><p id="p111245446214"><a name="p111245446214"></a><a name="p111245446214"></a>ocredit=0</p>
</td>
<td class="cellrowborder" valign="top" width="76.97%" headers="mcps1.2.3.1.2 "><p id="p1124344202119"><a name="p1124344202119"></a><a name="p1124344202119"></a>A password contains any number of special characters.</p>
</td>
</tr>
<tr id="row18124154411213"><td class="cellrowborder" valign="top" width="23.03%" headers="mcps1.2.3.1.1 "><p id="p20124194462113"><a name="p20124194462113"></a><a name="p20124194462113"></a>retry=3</p>
</td>
<td class="cellrowborder" valign="top" width="76.97%" headers="mcps1.2.3.1.2 "><p id="p1112424414210"><a name="p1112424414210"></a><a name="p1112424414210"></a>Each time a maximum of three password changes is allowed.</p>
</td>
</tr>
<tr id="row4124164416212"><td class="cellrowborder" valign="top" width="23.03%" headers="mcps1.2.3.1.1 "><p id="p12125124418218"><a name="p12125124418218"></a><a name="p12125124418218"></a>enforce_for_root</p>
</td>
<td class="cellrowborder" valign="top" width="76.97%" headers="mcps1.2.3.1.2 "><p id="p17125204411212"><a name="p17125204411212"></a><a name="p17125204411212"></a>This configuration is also effective for user <strong id="b842352706163145"><a name="b842352706163145"></a><a name="b842352706163145"></a>root</strong>.</p>
</td>
</tr>
</tbody>
</table>

**Table  2**  Configuration items in pam\_pwhistory.so

<a name="table1212544452120"></a>
<table><thead align="left"><tr id="row412684402113"><th class="cellrowborder" valign="top" width="44.79%" id="mcps1.2.3.1.1"><p id="p141261944192114"><a name="p141261944192114"></a><a name="p141261944192114"></a><strong id="b6884240205618"><a name="b6884240205618"></a><a name="b6884240205618"></a>Item</strong></p>
</th>
<th class="cellrowborder" valign="top" width="55.21%" id="mcps1.2.3.1.2"><p id="p1212614417216"><a name="p1212614417216"></a><a name="p1212614417216"></a><strong id="b1412664419211"><a name="b1412664419211"></a><a name="b1412664419211"></a>Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="row112712446212"><td class="cellrowborder" valign="top" width="44.79%" headers="mcps1.2.3.1.1 "><p id="p13127104492113"><a name="p13127104492113"></a><a name="p13127104492113"></a>remember=5</p>
</td>
<td class="cellrowborder" valign="top" width="55.21%" headers="mcps1.2.3.1.2 "><p id="p15127174452115"><a name="p15127174452115"></a><a name="p15127174452115"></a>A password must be different from the last five passwords used.</p>
</td>
</tr>
<tr id="row17127174442113"><td class="cellrowborder" valign="top" width="44.79%" headers="mcps1.2.3.1.1 "><p id="p1612744442116"><a name="p1612744442116"></a><a name="p1612744442116"></a>enforce_for_root</p>
</td>
<td class="cellrowborder" valign="top" width="55.21%" headers="mcps1.2.3.1.2 "><p id="p1712714418213"><a name="p1712714418213"></a><a name="p1712714418213"></a>This configuration is also effective for user <strong id="b63917121575"><a name="b63917121575"></a><a name="b63917121575"></a>root</strong>.</p>
</td>
</tr>
</tbody>
</table>

## Setting the Password Validity Period

### Description

To ensure system security, you are advised to set the password validity period and notify users to change passwords before the passwords expire.

### Implementation

The password validity period is set by modifying the  **/etc/login.defs**  file.  [Table 1](#en-us_topic_0152100281_t77b5d0753721450c81911c18b74e82eb)  describes the hardening items. All hardening items in the table are in the  **/etc/login.defs**  file. You can directly modify the items in the configuration file.

**Table  1**  Configuration items in login.defs

<a name="en-us_topic_0152100281_t77b5d0753721450c81911c18b74e82eb"></a>
<table><thead align="left"><tr id="en-us_topic_0152100281_r3df3f3ed1b0a40718c7e8a0f4a4846fc"><th class="cellrowborder" valign="top" width="25.737426257374263%" id="mcps1.2.5.1.1"><p id="en-us_topic_0152100281_aeb399d5a434846a39fed2122dfa77569"><a name="en-us_topic_0152100281_aeb399d5a434846a39fed2122dfa77569"></a><a name="en-us_topic_0152100281_aeb399d5a434846a39fed2122dfa77569"></a><strong id="b574417411615"><a name="b574417411615"></a><a name="b574417411615"></a>Item</strong></p>
</th>
<th class="cellrowborder" valign="top" width="24.517548245175483%" id="mcps1.2.5.1.2"><p id="p91918303171"><a name="p91918303171"></a><a name="p91918303171"></a><strong id="b723918431161"><a name="b723918431161"></a><a name="b723918431161"></a>Description</strong></p>
</th>
<th class="cellrowborder" valign="top" width="15.718428157184283%" id="mcps1.2.5.1.3"><p id="p156742110189"><a name="p156742110189"></a><a name="p156742110189"></a><strong id="b3463114411615"><a name="b3463114411615"></a><a name="b3463114411615"></a>Suggestion</strong></p>
</th>
<th class="cellrowborder" valign="top" width="34.02659734026597%" id="mcps1.2.5.1.4"><p id="p155991527181913"><a name="p155991527181913"></a><a name="p155991527181913"></a>Configured as Suggested</p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0152100281_r29e23cf92cab42e1ac8754dff12baa4a"><td class="cellrowborder" valign="top" width="25.737426257374263%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100281_a921f936f15544de5b3f9e9ba1be84ffe"><a name="en-us_topic_0152100281_a921f936f15544de5b3f9e9ba1be84ffe"></a><a name="en-us_topic_0152100281_a921f936f15544de5b3f9e9ba1be84ffe"></a>PASS_MAX_DAYS</p>
</td>
<td class="cellrowborder" valign="top" width="24.517548245175483%" headers="mcps1.2.5.1.2 "><p id="p42393415188"><a name="p42393415188"></a><a name="p42393415188"></a>Maximum validity period of a password.</p>
</td>
<td class="cellrowborder" valign="top" width="15.718428157184283%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100281_a2aa27bf0389c4b838ed9b6eec93af8d4"><a name="en-us_topic_0152100281_a2aa27bf0389c4b838ed9b6eec93af8d4"></a><a name="en-us_topic_0152100281_a2aa27bf0389c4b838ed9b6eec93af8d4"></a>90</p>
</td>
<td class="cellrowborder" valign="top" width="34.02659734026597%" headers="mcps1.2.5.1.4 "><p id="p117617476191"><a name="p117617476191"></a><a name="p117617476191"></a>No</p>
</td>
</tr>
<tr id="en-us_topic_0152100281_r33bf5a02003341b38505f4dd8a4ec331"><td class="cellrowborder" valign="top" width="25.737426257374263%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100281_ae34622cd327944e1846fa0057c0fdd26"><a name="en-us_topic_0152100281_ae34622cd327944e1846fa0057c0fdd26"></a><a name="en-us_topic_0152100281_ae34622cd327944e1846fa0057c0fdd26"></a>PASS_MIN_DAYS</p>
</td>
<td class="cellrowborder" valign="top" width="24.517548245175483%" headers="mcps1.2.5.1.2 "><p id="p32396413180"><a name="p32396413180"></a><a name="p32396413180"></a>Minimum interval between password changes.</p>
</td>
<td class="cellrowborder" valign="top" width="15.718428157184283%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100281_a75d083f04c1d465da9fe033bd1e3c6ab"><a name="en-us_topic_0152100281_a75d083f04c1d465da9fe033bd1e3c6ab"></a><a name="en-us_topic_0152100281_a75d083f04c1d465da9fe033bd1e3c6ab"></a>0</p>
</td>
<td class="cellrowborder" valign="top" width="34.02659734026597%" headers="mcps1.2.5.1.4 "><p id="p1675154714197"><a name="p1675154714197"></a><a name="p1675154714197"></a>No</p>
</td>
</tr>
<tr id="en-us_topic_0152100281_r2b4ddf77ed6345f2af1df4ca80e8da79"><td class="cellrowborder" valign="top" width="25.737426257374263%" headers="mcps1.2.5.1.1 "><p id="en-us_topic_0152100281_a95fb2c79aba04e37a87c4f34710db6c1"><a name="en-us_topic_0152100281_a95fb2c79aba04e37a87c4f34710db6c1"></a><a name="en-us_topic_0152100281_a95fb2c79aba04e37a87c4f34710db6c1"></a>PASS_WARN_AGE</p>
</td>
<td class="cellrowborder" valign="top" width="24.517548245175483%" headers="mcps1.2.5.1.2 "><p id="p1723920441810"><a name="p1723920441810"></a><a name="p1723920441810"></a>Number of days before the password expires.</p>
</td>
<td class="cellrowborder" valign="top" width="15.718428157184283%" headers="mcps1.2.5.1.3 "><p id="en-us_topic_0152100281_a0ccc437555734423b86103bf36f3977b"><a name="en-us_topic_0152100281_a0ccc437555734423b86103bf36f3977b"></a><a name="en-us_topic_0152100281_a0ccc437555734423b86103bf36f3977b"></a>7</p>
</td>
<td class="cellrowborder" valign="top" width="34.02659734026597%" headers="mcps1.2.5.1.4 "><p id="p249184791910"><a name="p249184791910"></a><a name="p249184791910"></a>No</p>
</td>
</tr>
</tbody>
</table>

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>The  **login.defs**  file is used to set restrictions on user accounts, such as setting the maximum password validity period and maximum length. The configuration in this file is invalid for the user  **root**. If the  **/etc/shadow**  file contains the same items, the  **/etc/shadow**  configuration takes precedence over the  **/etc/login.defs**  configuration. When a user attempts to log in after the password expires, the user will be informed of the password expiry and is required to change the password. If the user does not change the password, the user cannot access the system.   

## Setting Password Encryption Algorithms

### Description

For system security, passwords cannot be stored in plaintext in the system and must be encrypted. The passwords that do not need to be restored must be encrypted using irreversible algorithms. Set the password encryption algorithm to SHA-512. This item has been set by default in openEuler. The preceding settings can effectively prevent password disclosure and ensure password security.

### Implementation

To set the password encryption algorithm, add the following configuration to the  **/etc/pam.d/password-auth**  and  **/etc/pam.d/system-auth**  files:

```
password    sufficient    pam_unix.so sha512 shadow nullok try_first_pass use_authtok
```

  

**Table  1**  Configuration items in pam\_unix.so

<a name="en-us_topic_0152100376_t0e4d45c67099425e935ada4953a4aaa1"></a>
<table><thead align="left"><tr id="en-us_topic_0152100376_r5f099f6e722f4e99a32455a5d47d934f"><th class="cellrowborder" valign="top" width="30.06%" id="mcps1.2.3.1.1"><p id="en-us_topic_0152100376_ad3eee42a35e3474d925afc02d065ea8d"><a name="en-us_topic_0152100376_ad3eee42a35e3474d925afc02d065ea8d"></a><a name="en-us_topic_0152100376_ad3eee42a35e3474d925afc02d065ea8d"></a><strong id="b18491749191310"><a name="b18491749191310"></a><a name="b18491749191310"></a>Item</strong></p>
</th>
<th class="cellrowborder" valign="top" width="69.94%" id="mcps1.2.3.1.2"><p id="en-us_topic_0152100376_a4a9755d6633d4ab78a9cfc4b7ae4e1f4"><a name="en-us_topic_0152100376_a4a9755d6633d4ab78a9cfc4b7ae4e1f4"></a><a name="en-us_topic_0152100376_a4a9755d6633d4ab78a9cfc4b7ae4e1f4"></a><strong id="b315135021315"><a name="b315135021315"></a><a name="b315135021315"></a>Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0152100376_rb5b7197d70714a90903102bb24fd0ea7"><td class="cellrowborder" valign="top" width="30.06%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0152100376_aa12ab9b1e578408a8dce9667a858c9f1"><a name="en-us_topic_0152100376_aa12ab9b1e578408a8dce9667a858c9f1"></a><a name="en-us_topic_0152100376_aa12ab9b1e578408a8dce9667a858c9f1"></a>sha512</p>
</td>
<td class="cellrowborder" valign="top" width="69.94%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0152100376_a5788f53e3377437d96ea32a5906bc9b9"><a name="en-us_topic_0152100376_a5788f53e3377437d96ea32a5906bc9b9"></a><a name="en-us_topic_0152100376_a5788f53e3377437d96ea32a5906bc9b9"></a>The SHA-512 algorithm is used for password encryption.</p>
</td>
</tr>
</tbody>
</table>

## Locking an Account After Three Login Failures

### Description

To ensure user system security, you are advised to set the maximum number of incorrect password attempts \(three attempts are recommended\) and the automatic unlocking time \(300 seconds are recommended\) for a locked account.

If an account is locked, any input is invalid but does not cause the locking timer to recount. Records of the user's invalid inputs are cleared once unlocked. The preceding settings protect passwords from being forcibly cracked and improve system security.

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>By default, the maximum number of incorrect password attempts is 3 in openEuler. After the system is locked, the automatic unlock time is 60 seconds.  

### Implementation

The password complexity is set by modifying the  **/etc/pam.d/password-auth**  and  **/etc/pam.d/system-auth**  files. The maximum number of incorrect password attempts is set to  **3**, and the unlocking time after the system is locked is set to  **300**  seconds. The configuration is as follows:

```
auth        required      pam_faillock.so preauth audit deny=3 even_deny_root unlock_time=300
auth        [default=die] pam_faillock.so authfail audit deny=3 even_deny_root unlock_time=300
auth        sufficient    pam_faillock.so authsucc audit deny=3 even_deny_root unlock_time=300
```

**Table  1**  Configuration items in pam\_faillock.so

<a name="en-us_topic_0152100313_t7b1a3221642543eaa102d4e7a74c3d38"></a>
<table><thead align="left"><tr id="en-us_topic_0152100313_r5ddcdf2378624d3ebe741051c18afc98"><th class="cellrowborder" valign="top" width="30.06%" id="mcps1.2.3.1.1"><p id="en-us_topic_0152100313_afd85f3cac36449f4ad45185e9d41b3ed"><a name="en-us_topic_0152100313_afd85f3cac36449f4ad45185e9d41b3ed"></a><a name="en-us_topic_0152100313_afd85f3cac36449f4ad45185e9d41b3ed"></a><strong id="b135211327131719"><a name="b135211327131719"></a><a name="b135211327131719"></a>Item</strong></p>
</th>
<th class="cellrowborder" valign="top" width="69.94%" id="mcps1.2.3.1.2"><p id="en-us_topic_0152100313_a1ec9687c5a6c4bd0bdfddae099040a39"><a name="en-us_topic_0152100313_a1ec9687c5a6c4bd0bdfddae099040a39"></a><a name="en-us_topic_0152100313_a1ec9687c5a6c4bd0bdfddae099040a39"></a><strong id="b11881628171719"><a name="b11881628171719"></a><a name="b11881628171719"></a>Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0152100313_r55be22dedbd741629751c2d9d410d701"><td class="cellrowborder" valign="top" width="30.06%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0152100313_acd32b0827cf145d58071658671854d46"><a name="en-us_topic_0152100313_acd32b0827cf145d58071658671854d46"></a><a name="en-us_topic_0152100313_acd32b0827cf145d58071658671854d46"></a>authfail</p>
</td>
<td class="cellrowborder" valign="top" width="69.94%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0152100313_a8de3bf60f7164d5c8aa30cbdf5ce6ce9"><a name="en-us_topic_0152100313_a8de3bf60f7164d5c8aa30cbdf5ce6ce9"></a><a name="en-us_topic_0152100313_a8de3bf60f7164d5c8aa30cbdf5ce6ce9"></a>Captures account login failure events.</p>
</td>
</tr>
<tr id="en-us_topic_0152100313_rf575e68bddd54388b9a88e56b09126d7"><td class="cellrowborder" valign="top" width="30.06%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0152100313_aae18622a5c5446ca9a2a2a8ec0edd6ed"><a name="en-us_topic_0152100313_aae18622a5c5446ca9a2a2a8ec0edd6ed"></a><a name="en-us_topic_0152100313_aae18622a5c5446ca9a2a2a8ec0edd6ed"></a>deny=3</p>
</td>
<td class="cellrowborder" valign="top" width="69.94%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0152100313_a217dbebb77344c43aa921976ca1c74bc"><a name="en-us_topic_0152100313_a217dbebb77344c43aa921976ca1c74bc"></a><a name="en-us_topic_0152100313_a217dbebb77344c43aa921976ca1c74bc"></a>A user account will be locked after three login attempts.</p>
</td>
</tr>
<tr id="en-us_topic_0152100313_re82220969a0946b4a078d1cd9baf8ea7"><td class="cellrowborder" valign="top" width="30.06%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0152100313_adf5753021b26408d8530ec8546507d09"><a name="en-us_topic_0152100313_adf5753021b26408d8530ec8546507d09"></a><a name="en-us_topic_0152100313_adf5753021b26408d8530ec8546507d09"></a>unlock_time=300</p>
</td>
<td class="cellrowborder" valign="top" width="69.94%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0152100313_a247ada1f1cec40a1bcce330826f1b7d6"><a name="en-us_topic_0152100313_a247ada1f1cec40a1bcce330826f1b7d6"></a><a name="en-us_topic_0152100313_a247ada1f1cec40a1bcce330826f1b7d6"></a>A locked common user account is automatically unlocked in 300 seconds.</p>
</td>
</tr>
<tr id="en-us_topic_0152100313_rd644bdea6d374265b1ba8407b48afc97"><td class="cellrowborder" valign="top" width="30.06%" headers="mcps1.2.3.1.1 "><p id="en-us_topic_0152100313_a534a8148efc14ec3a3c6c8525634d594"><a name="en-us_topic_0152100313_a534a8148efc14ec3a3c6c8525634d594"></a><a name="en-us_topic_0152100313_a534a8148efc14ec3a3c6c8525634d594"></a>even_deny_root</p>
</td>
<td class="cellrowborder" valign="top" width="69.94%" headers="mcps1.2.3.1.2 "><p id="en-us_topic_0152100313_a100ff1c5a82b45658e87637f2d144d92"><a name="en-us_topic_0152100313_a100ff1c5a82b45658e87637f2d144d92"></a><a name="en-us_topic_0152100313_a100ff1c5a82b45658e87637f2d144d92"></a>This configuration is also effective for user <strong id="b63481537192815"><a name="b63481537192815"></a><a name="b63481537192815"></a>root</strong>.</p>
</td>
</tr>
</tbody>
</table>

## Hardening the su Command

### Description

To enhance system security and prevent the environment variables of the current user from being brought into other environments when you run the  **su**  command to switch to another user, this item has been configured by default in openEuler. The  **PATH**  variable is always initialized when the  **su**  command is used to switch users.

### Implementation

Modify the  **/etc/login.defs**  file. The configuration is as follows:

```
ALWAYS_SET_PATH=yes
```
