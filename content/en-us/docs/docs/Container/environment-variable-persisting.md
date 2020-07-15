# Environment Variable Persisting

- [Environment Variable Persisting](#environment-variable-persisting)


## Function Description

In a system container, you can make the  **env**  variable persistent to the configuration file in the rootfs directory of the container by specifying the  **--env-target-file**  interface parameter.

## Parameter Description


<table><thead align="left"><tr id="en-us_topic_0182200839_row1569373816419"><th class="cellrowborder" valign="top" width="16.28%" id="mcps1.1.4.1.1"><p id="en-us_topic_0182200839_p106936387415"><a name="en-us_topic_0182200839_p106936387415"></a><a name="en-us_topic_0182200839_p106936387415"></a><strong id="en-us_topic_0182200839_b74709155016"><a name="en-us_topic_0182200839_b74709155016"></a><a name="en-us_topic_0182200839_b74709155016"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="19.73%" id="mcps1.1.4.1.2"><p id="en-us_topic_0182200839_p15693173814112"><a name="en-us_topic_0182200839_p15693173814112"></a><a name="en-us_topic_0182200839_p15693173814112"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="63.99%" id="mcps1.1.4.1.3"><p id="en-us_topic_0182200839_p14522811181"><a name="en-us_topic_0182200839_p14522811181"></a><a name="en-us_topic_0182200839_p14522811181"></a><strong id="en-us_topic_0182200839_b9814121514013"><a name="en-us_topic_0182200839_b9814121514013"></a><a name="en-us_topic_0182200839_b9814121514013"></a>Value Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200839_row12693163810415"><td class="cellrowborder" valign="top" width="16.28%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200839_p66931838134110"><a name="en-us_topic_0182200839_p66931838134110"></a><a name="en-us_topic_0182200839_p66931838134110"></a>isula create/run</p>
</td>
<td class="cellrowborder" valign="top" width="19.73%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200839_p08101647154218"><a name="en-us_topic_0182200839_p08101647154218"></a><a name="en-us_topic_0182200839_p08101647154218"></a>--env-target-file</p>
</td>
<td class="cellrowborder" valign="top" width="63.99%" headers="mcps1.1.4.1.3 "><a name="en-us_topic_0182200839_ul19381113501815"></a><a name="en-us_topic_0182200839_ul19381113501815"></a><ul id="en-us_topic_0182200839_ul19381113501815"><li>Variable of the string type.</li><li>The <strong id="en-us_topic_0182200839_b129135173014"><a name="en-us_topic_0182200839_b129135173014"></a><a name="en-us_topic_0182200839_b129135173014"></a>env</strong> persistent file must be in the rootfs directory and must be an absolute path.</li></ul>
</td>
</tr>
</tbody>
</table>

## Constraints

-   If the target file specified by  **--env-target-file**  exists, the size cannot exceed 10 MB.
-   The parameter specified by  **--env-target-file**  must be an absolute path in the rootfs directory.
-   If the value of  **--env**  conflicts with that of  **env**  in the target file, the value of  **--env**  prevails.

## Example

Start a system container and specify the  **env**  environment variable and  **--env-target-file**  parameter.

```
[root@localhost ~]# isula run -tid -e abc=123 --env-target-file /etc/environment --system-container --external-rootfs /root/myrootfs none init
b75df997a64da74518deb9a01d345e8df13eca6bcc36d6fe40c3e90ea1ee088e
[root@localhost ~]# isula exec b7 cat /etc/environment
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
TERM=xterm
abc=123
```

The preceding information indicates that the  **env**  variable \(**abc=123**\) of the container has been made persistent to the  **/etc/environment**  configuration file.

