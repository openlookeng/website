# Maximum Number of Handles

- [Maximum Number of Handles](#maximum-number-of-handles)


## Function Description

System containers support limit on the number of file handles. File handles include common file handles and network sockets. When starting a container, you can specify the  **--files-limit**  parameter to limit the maximum number of handles opened in the container.

## Parameter Description


<table><thead align="left"><tr id="en-us_topic_0182200840_row1569373816419"><th class="cellrowborder" valign="top" width="16.77%" id="mcps1.1.4.1.1"><p id="en-us_topic_0182200840_p106936387415"><a name="en-us_topic_0182200840_p106936387415"></a><a name="en-us_topic_0182200840_p106936387415"></a><strong id="en-us_topic_0182200840_b98071954400"><a name="en-us_topic_0182200840_b98071954400"></a><a name="en-us_topic_0182200840_b98071954400"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="38.47%" id="mcps1.1.4.1.2"><p id="en-us_topic_0182200840_p15693173814112"><a name="en-us_topic_0182200840_p15693173814112"></a><a name="en-us_topic_0182200840_p15693173814112"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="44.76%" id="mcps1.1.4.1.3"><p id="en-us_topic_0182200840_p1626682291619"><a name="en-us_topic_0182200840_p1626682291619"></a><a name="en-us_topic_0182200840_p1626682291619"></a><strong id="en-us_topic_0182200840_b1913015551103"><a name="en-us_topic_0182200840_b1913015551103"></a><a name="en-us_topic_0182200840_b1913015551103"></a>Value Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182200840_row12693163810415"><td class="cellrowborder" valign="top" width="16.77%" headers="mcps1.1.4.1.1 "><p id="en-us_topic_0182200840_p66931838134110"><a name="en-us_topic_0182200840_p66931838134110"></a><a name="en-us_topic_0182200840_p66931838134110"></a>isula create/run</p>
</td>
<td class="cellrowborder" valign="top" width="38.47%" headers="mcps1.1.4.1.2 "><p id="en-us_topic_0182200840_p08101647154218"><a name="en-us_topic_0182200840_p08101647154218"></a><a name="en-us_topic_0182200840_p08101647154218"></a>--files-limit</p>
<p id="en-us_topic_0182200840_p5810124718426"><a name="en-us_topic_0182200840_p5810124718426"></a><a name="en-us_topic_0182200840_p5810124718426"></a>&nbsp;&nbsp;</p>
</td>
<td class="cellrowborder" valign="top" width="44.76%" headers="mcps1.1.4.1.3 "><a name="en-us_topic_0182200840_ul2964134315162"></a><a name="en-us_topic_0182200840_ul2964134315162"></a><ul id="en-us_topic_0182200840_ul2964134315162"><li>The value cannot be negative and must be an integer.</li><li>The value <strong id="en-us_topic_0182200840_b2577525114916"><a name="en-us_topic_0182200840_b2577525114916"></a><a name="en-us_topic_0182200840_b2577525114916"></a>0</strong> indicates that the number is not limited by the parameter. The maximum number is determined by the current kernel files cgroup.</li></ul>
</td>
</tr>
</tbody>
</table>

## Constraints

-   If the value of  **--files-limit**  is too small, the system container may fail to run the  **exec**  command and the error "open temporary files" is reported. Therefore, you are advised to set the parameter to a large value.
-   File handles include common file handles and network sockets.

## Example

To use  **--files-limit**  to limit the number of file handles opened in a container, run the following command to check whether the kernel supports files cgroup:

```
[root@localhost ~]# cat /proc/1/cgroup | grep files
10:files:/
```

If  **files**  is displayed, files cgroup is supported.

Start the container, specify the  **--files-limit**  parameter, and check whether the  **files.limit**  parameter is successfully written.

```
[root@localhost ~]# isula run  -tid --files-limit 1024 --system-container  --external-rootfs /tmp/root-fs  empty init 01e82fcf97d4937aa1d96eb8067f9f23e4707b92de152328c3fc0ecb5f64e91d 
[root@localhost ~]# isula exec -it 01e82fcf97d4 bash 
[root@localhost ~]# cat /sys/fs/cgroup/files/files.limit 
1024 

```

The preceding information indicates that the number of file handles is successfully limited in the container.

