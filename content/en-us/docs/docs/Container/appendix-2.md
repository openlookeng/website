# Appendix

- [Appendix](#appendix-2)
    - [configuration.toml](#configuration-toml)
    - [APIs](#apis)

## configuration.toml

>![](public_sys-resources/icon-note.gif) **NOTE:**   
>The value of each field in the  **configuration.toml**  file is subject to the  **configuration.toml**  file in the  **kata-containers-<**_version_**\>.rpm package**. You cannot set any field in the configuration file.  

```
[hypervisor.qemu]
path: specifies the execution path of the virtualization QEMU.
kernel: specifies the execution path of the guest kernel.
initrd: specifies the guest initrd execution path.
image: specifies the execution path of the guest image (not applicable).
machine_type: specifies the type of the analog chip. The value is virt for the ARM architecture and pc for the x86 architecture.
kernel_params: specifies the running parameters of the guest kernel.
firmware: specifies the firmware path. If this parameter is left blank, the default firmware is used.
machine_accelerators: specifies an accelerator.
default_vcpus: specifies the default number of vCPUs for each SB/VM.
default_maxvcpus: specifies the default maximum number of vCPUs for each SB/VM.
default_root_ports: specifies the default number of root ports for each SB/VM.
default_bridges: specifies the default number of bridges for each SB/VM.
default_memory: specifies the default memory size of each SB/VM. The default value is 1024 MiB.
memory_slots: specifies the number of memory slots for each SB/VM. The default value is 10.
memory_offset: specifies the memory offset. The default value is 0.
disable_block_device_use: disables the block device from being used by the rootfs of the container.
shared_fs: specifies the type of the shared file system. The default value is virtio-9p.
virtio_fs_daemon: specifies the path of the vhost-user-fs daemon process.
virtio_fs_cache_size: specifies the default size of the DAX cache.
virtio_fs_cache: specifies the cache mode.
block_device_driver: specifies the driver of a block device.
block_device_cache_set: specifies whether to set cache-related options for a block device. The default value is false.
block_device_cache_direct: specifies whether to enable O_DIRECT. The default value is false.
block_device_cache_noflush: specifies whether to ignore device update requests. The default value is false.
enable_iothreads: enables iothreads.
enable_mem_prealloc: enables VM RAM pre-allocation. The default value is false.
enable_hugepages: enables huge pages. The default value is false.
enable_swap: enables the swap function. The default value is false.
enable_debug: enables QEMU debugging. The default value is false.
disable_nesting_checks: disables nested check.
msize_9p = 8192: specifies the number of bytes transmitted in each 9p packet.
use_vsock: uses vsocks to directly communicate with the agent (the prerequisite is that vsocks is supported). The default value is false.
hotplug_vfio_on_root_bus: enables the hot swap of the VFIO device on the root bus. The default value is false.
disable_vhost_net: disables vhost_net. The default value is false.
entropy_source: specifies the default entropy source.
guest_hook_path: specifies the binary path of the guest hook.

[factory]
enable_template: enables the VM template. The default value is false.
template_path: specifies the template path.
vm_cache_number: specifies the number of VM caches. The default value is 0.
vm_cache_endpoint: specifies the address of the Unix socket used by the VMCache. The default value is /var/run/kata-containers/cache.sock.

[proxy.kata]
path: specifies the kata-proxy running path.
enable_debug: enables proxy debugging. The default value is false.

[shim.kata]
path: specifies the running path of kata-shim.
enable_debug: enables shim debugging. The default value is false.
enable_tracing: enables shim opentracing.

[agent.kata]
enable_debug: enables the agent debugging function. The default value is false.
enable_tracing: enables the agent tracing function.
trace_mode: specifies the trace mode.
trace_type: specifies the trace type.
enable_blk_mount: enables guest mounting of the block device.

[netmon]
enable_netmon: enables network monitoring. The default value is false.
path: specifies the kata-netmon running path.
enable_debug: enables netmon debugging. The default value is false.

[runtime]
enable_debug: enables runtime debugging. The default value is false.
enable_cpu_memory_hotplug: enables CPU and memory hot swap. The default value is false.
internetworking_model: specifies the network interconnection mode between VMs and containers.
disable_guest_seccomp: disables the seccemp security mechanism in the guest application. The default value is true.
enable_tracing: enables runtime opentracing. The default value is false.
disable_new_netns: disables network namespace creation for the shim and hypervisor processes. The default value is false.
experimental: enables the experimental feature, which does not support user-defined configurations.
```

## APIs

**Table  1**  Commands related to the kata-runtime network

<a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_table66385264135"></a>
<table><thead align="left"><tr id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_row16639152615133"><th class="cellrowborder" valign="top" width="17.05829417058294%" id="mcps1.2.7.1.1"><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p5639726151315"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p5639726151315"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p5639726151315"></a><strong id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_b36001652466"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_b36001652466"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_b36001652466"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="17.18828117188281%" id="mcps1.2.7.1.2"><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p17639226141312"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p17639226141312"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p17639226141312"></a><strong id="en-us_topic_0182220026_b1662671294118"><a name="en-us_topic_0182220026_b1662671294118"></a><a name="en-us_topic_0182220026_b1662671294118"></a>Subcommand</strong></p>
</th>
<th class="cellrowborder" valign="top" width="19.71802819718028%" id="mcps1.2.7.1.3"><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p2028452514173"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p2028452514173"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p2028452514173"></a><strong id="en-us_topic_0182220026_b1154191914412"><a name="en-us_topic_0182220026_b1154191914412"></a><a name="en-us_topic_0182220026_b1154191914412"></a>File Example</strong></p>
</th>
<th class="cellrowborder" valign="top" width="7.4992500749925%" id="mcps1.2.7.1.4"><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p863942612139"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p863942612139"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p863942612139"></a><strong id="en-us_topic_0182220026_b65520238415"><a name="en-us_topic_0182220026_b65520238415"></a><a name="en-us_topic_0182220026_b65520238415"></a>Field</strong></p>
</th>
<th class="cellrowborder" valign="top" width="16.14838516148385%" id="mcps1.2.7.1.5"><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p10639132681314"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p10639132681314"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p10639132681314"></a><strong id="en-us_topic_0182220026_b281512412412"><a name="en-us_topic_0182220026_b281512412412"></a><a name="en-us_topic_0182220026_b281512412412"></a>Description</strong></p>
</th>
<th class="cellrowborder" valign="top" width="22.38776122387761%" id="mcps1.2.7.1.6"><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p9105194011715"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p9105194011715"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p9105194011715"></a><strong id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_b1464445184619"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_b1464445184619"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_b1464445184619"></a>Remarks</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_row1554902132910"><td class="cellrowborder" rowspan="13" valign="top" width="17.05829417058294%" headers="mcps1.2.7.1.1 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p19639122651310"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p19639122651310"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p19639122651310"></a><strong id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_b69171014184613"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_b69171014184613"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_b69171014184613"></a>kata-network</strong></p>
<div class="note" id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_note173211717183519"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_note173211717183519"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_note173211717183519"></a><span class="notetitle"> NOTE: </span><div class="notebody"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_ul1472122519332"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_ul1472122519332"></a><ul id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_ul1472122519332"><li>The kata-network command must be used in groups. Network devices that are not added using <strong id="en-us_topic_0182220026_b1778484094112"><a name="en-us_topic_0182220026_b1778484094112"></a><a name="en-us_topic_0182220026_b1778484094112"></a>kata-runtime kata-network</strong> cannot be deleted or listed using <strong id="en-us_topic_0182220026_b1048824515414"><a name="en-us_topic_0182220026_b1048824515414"></a><a name="en-us_topic_0182220026_b1048824515414"></a>kata-runtime kata-network</strong>. The reverse is also true.</li><li><strong id="en-us_topic_0182220026_b6975759144111"><a name="en-us_topic_0182220026_b6975759144111"></a><a name="en-us_topic_0182220026_b6975759144111"></a>kata-runtime kata-network</strong> imports configuration parameters through a file or stdin.</li></ul>
</div></div>
</td>
<td class="cellrowborder" rowspan="6" valign="top" width="17.18828117188281%" headers="mcps1.2.7.1.2 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p11116581890"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p11116581890"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p11116581890"></a><strong id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b9588163211106"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b9588163211106"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b9588163211106"></a>add-iface</strong></p>
<div class="note" id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_note16321526151911"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_note16321526151911"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_note16321526151911"></a><span class="notetitle"> NOTE: </span><div class="notebody"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_ul142008225339"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_ul142008225339"></a><ul id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_ul142008225339"><li>An interface can be added to only one container.</li><li>The execution result is subject to the returned value (non-zero return value).</li></ul>
</div></div>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p113091322192419"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p113091322192419"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p113091322192419"></a>&nbsp;&nbsp;</p>
</td>
<td class="cellrowborder" rowspan="6" valign="top" width="19.71802819718028%" headers="mcps1.2.7.1.3 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p034191618252"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p034191618252"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p034191618252"></a>{</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p03411316122515"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p03411316122515"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p03411316122515"></a>"device":"tap1",</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p834181642514"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p834181642514"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p834181642514"></a>"name":"eth1",</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p33412016112514"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p33412016112514"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p33412016112514"></a>"IPAddresses":[{"address":"172.17.1.10","mask":"24"}],</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p0341161682515"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p0341161682515"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p0341161682515"></a>"mtu":1300,</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p93411416172510"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p93411416172510"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p93411416172510"></a>"hwAddr":"02:42:20:6f:a2:80"</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p5108173192612"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p5108173192612"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p5108173192612"></a>"vhostUserSocket":"/usr/local/var/run/openvswitch/vhost-user1"</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p17341131614258"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p17341131614258"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p17341131614258"></a>}</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p330916223244"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p330916223244"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p330916223244"></a>&nbsp;&nbsp;</p>
</td>
<td class="cellrowborder" valign="top" width="7.4992500749925%" headers="mcps1.2.7.1.4 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p855072117296"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p855072117296"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p855072117296"></a>device</p>
</td>
<td class="cellrowborder" valign="top" width="16.14838516148385%" headers="mcps1.2.7.1.5 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p55501921162915"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p55501921162915"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p55501921162915"></a>Sets the name of the NIC on a host.</p>
</td>
<td class="cellrowborder" valign="top" width="22.38776122387761%" headers="mcps1.2.7.1.6 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p19199141452819"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p19199141452819"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p19199141452819"></a>Mandatory. The value can contain a maximum of 15 characters, including letters, digits, underscores (_), hyphens (-), and periods (.). It must start with a letter. The device name must be unique on the same host.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_row1563914260136"><td class="cellrowborder" valign="top" headers="mcps1.2.7.1.1 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p1563922616131"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p1563922616131"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p1563922616131"></a>name</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.2 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p156391826161313"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p156391826161313"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p156391826161313"></a>Sets the name of the NIC in the container.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.3 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1954874319"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1954874319"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1954874319"></a>Mandatory. The value can contain a maximum of 15 characters, including letters, digits, underscores (_), hyphens (-), and periods (.). It must start with a letter. Ensure that the name is unique in the same sandbox.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_row416183171610"><td class="cellrowborder" valign="top" headers="mcps1.2.7.1.1 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p58291193271"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p58291193271"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p58291193271"></a>IPAddresses</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.2 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p2167318165"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p2167318165"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p2167318165"></a>Sets the IP address of an NIC.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.3 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p1106144015178"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p1106144015178"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p1106144015178"></a>Optional.</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1645464962810"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1645464962810"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1645464962810"></a>Currently, one IP address can be configured for each NIC. If no IP address is configured for the NIC, no IP address will be configured in the container, either.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_row13672165951510"><td class="cellrowborder" valign="top" headers="mcps1.2.7.1.1 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p1567214598153"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p1567214598153"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p1567214598153"></a>mtu</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.2 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p1467235981512"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p1467235981512"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p1467235981512"></a>Sets the MTU of an NIC.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.3 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p13305156121820"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p13305156121820"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p13305156121820"></a>Mandatory.</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p12189171833011"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p12189171833011"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p12189171833011"></a>The value ranges from 46 to 9600.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_row1679005612156"><td class="cellrowborder" valign="top" headers="mcps1.2.7.1.1 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p37901256111518"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p37901256111518"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p37901256111518"></a>hwAddr</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.2 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p1479011564157"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p1479011564157"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p1479011564157"></a>Sets the MAC address of an NIC.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.3 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p4106134014178"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p4106134014178"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p4106134014178"></a>Mandatory.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_row3307422102411"><td class="cellrowborder" valign="top" headers="mcps1.2.7.1.1 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p13091722122417"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p13091722122417"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p13091722122417"></a>vhostUserSocket</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.2 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p2310142218242"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p2310142218242"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p2310142218242"></a>Sets the DPDK polling socket path.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.3 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p6310422182410"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p6310422182410"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p6310422182410"></a>Optional.</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p949911537279"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p949911537279"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p949911537279"></a>The path contains a maximum of 128 bytes. The naming rule can contain digits, letters, and hyphens (-). The path name must start with a letter.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_row04261503150"><td class="cellrowborder" valign="top" headers="mcps1.2.7.1.1 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p16391226111316"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p16391226111316"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p16391226111316"></a><strong id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b948121112118"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b948121112118"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b948121112118"></a>del-iface</strong></p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.2 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p398520181327"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p398520181327"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p398520181327"></a>{</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p109851718183212"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p109851718183212"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p109851718183212"></a>"name":"eth1"</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p198551814320"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p198551814320"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p198551814320"></a>}</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.3 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p2428950151518"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p2428950151518"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p2428950151518"></a>None</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.4 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p14428175051511"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p14428175051511"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p14428175051511"></a>Deletes an NIC from a container.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.5 "><div class="note" id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_note79081420342"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_note79081420342"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_note79081420342"></a><span class="notetitle"> NOTE: </span><div class="notebody"><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1591374123420"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1591374123420"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1591374123420"></a>When deleting a NIC, you can only delete it based on the name field in the NIC container. Kata does not identify other fields.</p>
</div></div>
</td>
</tr>
<tr id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_row4639626111319"><td class="cellrowborder" valign="top" headers="mcps1.2.7.1.1 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p964014261131"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p964014261131"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p964014261131"></a><strong id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b16379102719112"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b16379102719112"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b16379102719112"></a>list-ifaces</strong></p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.2 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p16285152541713"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p16285152541713"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p16285152541713"></a>None</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.3 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p17640132601313"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p17640132601313"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p17640132601313"></a>None</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.4 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p14640202613133"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p14640202613133"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p14640202613133"></a>Queries the NIC list in a container.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.5 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p13106184061718"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p13106184061718"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_en-us_topic_0117295236_en-us_topic_0058941414_p13106184061718"></a>None</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_row879186191219"><td class="cellrowborder" rowspan="3" valign="top" headers="mcps1.2.7.1.1 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p681186151218"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p681186151218"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p681186151218"></a><strong id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b132121515139"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b132121515139"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b132121515139"></a>add-route</strong></p>
</td>
<td class="cellrowborder" rowspan="3" valign="top" headers="mcps1.2.7.1.2 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1089432211409"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1089432211409"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1089432211409"></a>{</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p14894722164012"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p14894722164012"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p14894722164012"></a>"dest":"172.17.10.10/24",</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p10894422184015"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p10894422184015"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p10894422184015"></a>"gateway":"",</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p68941722114010"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p68941722114010"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p68941722114010"></a>"device":"eth1"</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p489413229409"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p489413229409"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p489413229409"></a>}</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.3 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p78115631210"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p78115631210"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p78115631210"></a>dest</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.4 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p48114611125"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p48114611125"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p48114611125"></a>Sets the network segment corresponding to the route.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.5 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p18146131215"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p18146131215"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p18146131215"></a>The value is in the format of &lt;<em id="en-us_topic_0182220026_i13241357174619"><a name="en-us_topic_0182220026_i13241357174619"></a><a name="en-us_topic_0182220026_i13241357174619"></a>ip</em>&gt;/&lt;<em id="en-us_topic_0182220026_i71111094716"><a name="en-us_topic_0182220026_i71111094716"></a><a name="en-us_topic_0182220026_i71111094716"></a>mask</em>&gt;. &lt;<em id="en-us_topic_0182220026_i1192353134718"><a name="en-us_topic_0182220026_i1192353134718"></a><a name="en-us_topic_0182220026_i1192353134718"></a>ip</em>&gt; is mandatory.</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1736115864212"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1736115864212"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1736115864212"></a>There are three cases:</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1361158154216"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1361158154216"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1361158154216"></a>1. Both IP address and mask are configured.</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p0361558204220"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p0361558204220"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p0361558204220"></a>2. If only an IP address is configured, the default mask is 32.</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p336125814424"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p336125814424"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p336125814424"></a>3. If <strong id="en-us_topic_0182220026_b541514544813"><a name="en-us_topic_0182220026_b541514544813"></a><a name="en-us_topic_0182220026_b541514544813"></a>"dest":"default"</strong> is configured, there is no destination by default. In this case, the gateway needs to be configured.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_row2567947104013"><td class="cellrowborder" valign="top" headers="mcps1.2.7.1.1 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p12568164794015"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p12568164794015"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p12568164794015"></a>gateway</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.2 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p14568847184011"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p14568847184011"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p14568847184011"></a>Sets the next-hop gateway of the route.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.3 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p9569144720407"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p9569144720407"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p9569144720407"></a>When <strong id="en-us_topic_0182220026_b368962114818"><a name="en-us_topic_0182220026_b368962114818"></a><a name="en-us_topic_0182220026_b368962114818"></a>"dest":"default"</strong> is configured, the gateway is mandatory. In other cases, this parameter is optional.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_row12666164411404"><td class="cellrowborder" valign="top" headers="mcps1.2.7.1.1 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p3668124424016"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p3668124424016"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p3668124424016"></a>device</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.2 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p22806548439"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p22806548439"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p22806548439"></a>Sets the name of the NIC corresponding to the route. </p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.3 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1668114494018"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1668114494018"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1668114494018"></a>Mandatory. </p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p16787861443"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p16787861443"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p16787861443"></a>The value contains a maximum of 15 characters.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_row08132961210"><td class="cellrowborder" valign="top" headers="mcps1.2.7.1.1 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1382122961211"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1382122961211"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1382122961211"></a><strong id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b102395117136"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b102395117136"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b102395117136"></a>del-route</strong></p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.2 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p101025239448"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p101025239448"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p101025239448"></a>{</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p5102142304411"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p5102142304411"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p5102142304411"></a>"dest":"172.17.10.10/24"</p>
<p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p2102823194419"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p2102823194419"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p2102823194419"></a>}</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.3 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p78292914124"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p78292914124"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p78292914124"></a>None</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.4 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1082129191210"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1082129191210"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1082129191210"></a>Deletes a container routing rule.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.5 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p5664639124712"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p5664639124712"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p5664639124712"></a><strong id="en-us_topic_0182220026_b12858112484918"><a name="en-us_topic_0182220026_b12858112484918"></a><a name="en-us_topic_0182220026_b12858112484918"></a>dest</strong> is mandatory, and both <strong id="en-us_topic_0182220026_b17858192414491"><a name="en-us_topic_0182220026_b17858192414491"></a><a name="en-us_topic_0182220026_b17858192414491"></a>device</strong> and <strong id="en-us_topic_0182220026_b385892415497"><a name="en-us_topic_0182220026_b385892415497"></a><a name="en-us_topic_0182220026_b385892415497"></a>gateway</strong> are optional.</p>
<div class="note" id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_note19424114018479"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_note19424114018479"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_note19424114018479"></a><span class="notetitle"> NOTE: </span><div class="notebody"><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p3769786466"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p3769786466"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p3769786466"></a>Kata performs fuzzy match based on different fields and deletes the corresponding routing rules.</p>
</div></div>
</td>
</tr>
<tr id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_row8794731171212"><td class="cellrowborder" valign="top" headers="mcps1.2.7.1.1 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1179414319123"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1179414319123"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p1179414319123"></a><strong id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b19240131141311"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b19240131141311"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_b19240131141311"></a>list-routes</strong></p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.2 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p2286152581716"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p2286152581716"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p2286152581716"></a>None</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.3 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p27941431131219"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p27941431131219"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p27941431131219"></a>None</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.4 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p10794143110125"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p10794143110125"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p10794143110125"></a>Queries the route list in a container.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.7.1.5 "><p id="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p107941431141219"><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p107941431141219"></a><a name="en-us_topic_0182220026_en-us_topic_0176326774_en-us_topic_0144414542_p107941431141219"></a>None</p>
</td>
</tr>
</tbody>
</table>

**Table  2**  kata-ipvs command line interfaces

<a name="en-us_topic_0182220026_table20898132412379"></a>
<table><thead align="left"><tr id="en-us_topic_0182220026_row194632488374"><th class="cellrowborder" valign="top" width="6.380638063806381%" id="mcps1.2.8.1.1"><p id="en-us_topic_0182220026_p5810105523715"><a name="en-us_topic_0182220026_p5810105523715"></a><a name="en-us_topic_0182220026_p5810105523715"></a><strong id="en-us_topic_0182220026_b681116558376"><a name="en-us_topic_0182220026_b681116558376"></a><a name="en-us_topic_0182220026_b681116558376"></a>Command</strong></p>
</th>
<th class="cellrowborder" valign="top" width="6.63066306630663%" id="mcps1.2.8.1.2"><p id="en-us_topic_0182220026_p946474818373"><a name="en-us_topic_0182220026_p946474818373"></a><a name="en-us_topic_0182220026_p946474818373"></a><strong id="en-us_topic_0182220026_b87591165019"><a name="en-us_topic_0182220026_b87591165019"></a><a name="en-us_topic_0182220026_b87591165019"></a>Subcommand</strong></p>
</th>
<th class="cellrowborder" valign="top" width="7.620762076207621%" id="mcps1.2.8.1.3"><p id="en-us_topic_0182220026_p10464134813712"><a name="en-us_topic_0182220026_p10464134813712"></a><a name="en-us_topic_0182220026_p10464134813712"></a><strong id="en-us_topic_0182220026_b1920514514391"><a name="en-us_topic_0182220026_b1920514514391"></a><a name="en-us_topic_0182220026_b1920514514391"></a>Field</strong></p>
</th>
<th class="cellrowborder" valign="top" width="11.77117711771177%" id="mcps1.2.8.1.4"><p id="en-us_topic_0182220026_p9464114811377"><a name="en-us_topic_0182220026_p9464114811377"></a><a name="en-us_topic_0182220026_p9464114811377"></a><strong id="en-us_topic_0182220026_b641963165014"><a name="en-us_topic_0182220026_b641963165014"></a><a name="en-us_topic_0182220026_b641963165014"></a>Parameter</strong></p>
</th>
<th class="cellrowborder" valign="top" width="10.57105710571057%" id="mcps1.2.8.1.5"><p id="en-us_topic_0182220026_p164641648193711"><a name="en-us_topic_0182220026_p164641648193711"></a><a name="en-us_topic_0182220026_p164641648193711"></a><strong id="en-us_topic_0182220026_b1260215525016"><a name="en-us_topic_0182220026_b1260215525016"></a><a name="en-us_topic_0182220026_b1260215525016"></a>Sub-parameter</strong></p>
</th>
<th class="cellrowborder" valign="top" width="12.37123712371237%" id="mcps1.2.8.1.6"><p id="en-us_topic_0182220026_p1646518482370"><a name="en-us_topic_0182220026_p1646518482370"></a><a name="en-us_topic_0182220026_p1646518482370"></a><strong id="en-us_topic_0182220026_b136331272504"><a name="en-us_topic_0182220026_b136331272504"></a><a name="en-us_topic_0182220026_b136331272504"></a>Description</strong></p>
</th>
<th class="cellrowborder" valign="top" width="44.654465446544656%" id="mcps1.2.8.1.7"><p id="en-us_topic_0182220026_p10465448103712"><a name="en-us_topic_0182220026_p10465448103712"></a><a name="en-us_topic_0182220026_p10465448103712"></a><strong id="en-us_topic_0182220026_b2021011523918"><a name="en-us_topic_0182220026_b2021011523918"></a><a name="en-us_topic_0182220026_b2021011523918"></a>Remarks</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="en-us_topic_0182220026_row656825123716"><td class="cellrowborder" rowspan="22" valign="top" width="6.380638063806381%" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p165612511378"><a name="en-us_topic_0182220026_p165612511378"></a><a name="en-us_topic_0182220026_p165612511378"></a><strong id="en-us_topic_0182220026_b115611255377"><a name="en-us_topic_0182220026_b115611255377"></a><a name="en-us_topic_0182220026_b115611255377"></a>kata-ipvs</strong></p>
</td>
<td class="cellrowborder" rowspan="20" valign="top" width="6.63066306630663%" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p25620257372"><a name="en-us_topic_0182220026_p25620257372"></a><a name="en-us_topic_0182220026_p25620257372"></a><strong id="en-us_topic_0182220026_b105682517378"><a name="en-us_topic_0182220026_b105682517378"></a><a name="en-us_topic_0182220026_b105682517378"></a>ipvsadm</strong></p>
</td>
<td class="cellrowborder" rowspan="19" valign="top" width="7.620762076207621%" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p35612583712"><a name="en-us_topic_0182220026_p35612583712"></a><a name="en-us_topic_0182220026_p35612583712"></a>--parameters</p>
</td>
<td class="cellrowborder" rowspan="3" valign="top" width="11.77117711771177%" headers="mcps1.2.8.1.4 "><p id="en-us_topic_0182220026_p85652512376"><a name="en-us_topic_0182220026_p85652512376"></a><a name="en-us_topic_0182220026_p85652512376"></a>-A, --add-service</p>
</td>
<td class="cellrowborder" valign="top" width="10.57105710571057%" headers="mcps1.2.8.1.5 "><p id="en-us_topic_0182220026_p256202513711"><a name="en-us_topic_0182220026_p256202513711"></a><a name="en-us_topic_0182220026_p256202513711"></a>-t, --tcp-service</p>
<p id="en-us_topic_0182220026_p556825123720"><a name="en-us_topic_0182220026_p556825123720"></a><a name="en-us_topic_0182220026_p556825123720"></a>-u, --udp-service</p>
</td>
<td class="cellrowborder" valign="top" width="12.37123712371237%" headers="mcps1.2.8.1.6 "><p id="en-us_topic_0182220026_p125617257379"><a name="en-us_topic_0182220026_p125617257379"></a><a name="en-us_topic_0182220026_p125617257379"></a>Virtual service type.</p>
</td>
<td class="cellrowborder" valign="top" width="44.654465446544656%" headers="mcps1.2.8.1.7 "><p id="en-us_topic_0182220026_p145682513712"><a name="en-us_topic_0182220026_p145682513712"></a><a name="en-us_topic_0182220026_p145682513712"></a>Mandatory. You can select <strong id="en-us_topic_0182220026_b1432119495112"><a name="en-us_topic_0182220026_b1432119495112"></a><a name="en-us_topic_0182220026_b1432119495112"></a>--tcp-service</strong> or <strong id="en-us_topic_0182220026_b370614675114"><a name="en-us_topic_0182220026_b370614675114"></a><a name="en-us_topic_0182220026_b370614675114"></a>--udp-service</strong>. The format is <strong id="en-us_topic_0182220026_b96181199512"><a name="en-us_topic_0182220026_b96181199512"></a><a name="en-us_topic_0182220026_b96181199512"></a>ip:port</strong>. The value of <strong id="en-us_topic_0182220026_b61721114195116"><a name="en-us_topic_0182220026_b61721114195116"></a><a name="en-us_topic_0182220026_b61721114195116"></a>port</strong> ranges from 1 to 65535.</p>
<p id="en-us_topic_0182220026_p12561825163713"><a name="en-us_topic_0182220026_p12561825163713"></a><a name="en-us_topic_0182220026_p12561825163713"></a>Example:</p>
<pre class="screen" id="en-us_topic_0182220026_screen165611253377"><a name="en-us_topic_0182220026_screen165611253377"></a><a name="en-us_topic_0182220026_screen165611253377"></a>kata-runtime kata-ipvs ipvsadm --parameters "--add-service --tcp-service 172.17.0.7:80 --scheduler rr --persistent 3000" &lt;container-id&gt;</pre>
</td>
</tr>
<tr id="en-us_topic_0182220026_row356192583713"><td class="cellrowborder" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p95632583713"><a name="en-us_topic_0182220026_p95632583713"></a><a name="en-us_topic_0182220026_p95632583713"></a>-s, --scheduler</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p75672553710"><a name="en-us_topic_0182220026_p75672553710"></a><a name="en-us_topic_0182220026_p75672553710"></a>Load balancing scheduling algorithm.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p175610253373"><a name="en-us_topic_0182220026_p175610253373"></a><a name="en-us_topic_0182220026_p175610253373"></a>Mandatory. Value range: rr|wrr|lc|wlc|lblc|lblcr|dh|sh|sed|nq.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_row185642563719"><td class="cellrowborder" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p19561325173717"><a name="en-us_topic_0182220026_p19561325173717"></a><a name="en-us_topic_0182220026_p19561325173717"></a>-p, --persistent</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p156172553716"><a name="en-us_topic_0182220026_p156172553716"></a><a name="en-us_topic_0182220026_p156172553716"></a>Service duration.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p105652513713"><a name="en-us_topic_0182220026_p105652513713"></a><a name="en-us_topic_0182220026_p105652513713"></a>Mandatory. The value ranges from 1 to 2678400, in seconds.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_row17571025143718"><td class="cellrowborder" rowspan="3" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p115772516371"><a name="en-us_topic_0182220026_p115772516371"></a><a name="en-us_topic_0182220026_p115772516371"></a>-E, --edit-service</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p457112543716"><a name="en-us_topic_0182220026_p457112543716"></a><a name="en-us_topic_0182220026_p457112543716"></a>-t, --tcp-service</p>
<p id="en-us_topic_0182220026_p7571256375"><a name="en-us_topic_0182220026_p7571256375"></a><a name="en-us_topic_0182220026_p7571256375"></a>-u, --udp-service</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p1657102514370"><a name="en-us_topic_0182220026_p1657102514370"></a><a name="en-us_topic_0182220026_p1657102514370"></a>Virtual service type.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.4 "><p id="en-us_topic_0182220026_p2057192513711"><a name="en-us_topic_0182220026_p2057192513711"></a><a name="en-us_topic_0182220026_p2057192513711"></a>Mandatory. You can select <strong id="en-us_topic_0182220026_b31141722125211"><a name="en-us_topic_0182220026_b31141722125211"></a><a name="en-us_topic_0182220026_b31141722125211"></a>--tcp-service</strong> or <strong id="en-us_topic_0182220026_b611572275220"><a name="en-us_topic_0182220026_b611572275220"></a><a name="en-us_topic_0182220026_b611572275220"></a>--udp-service</strong>. The format is <strong id="en-us_topic_0182220026_b11445112320524"><a name="en-us_topic_0182220026_b11445112320524"></a><a name="en-us_topic_0182220026_b11445112320524"></a>ip:port</strong>. The value of <strong id="en-us_topic_0182220026_b174461323185213"><a name="en-us_topic_0182220026_b174461323185213"></a><a name="en-us_topic_0182220026_b174461323185213"></a>port</strong> ranges from 1 to 65535.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_row65762583710"><td class="cellrowborder" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p175772543712"><a name="en-us_topic_0182220026_p175772543712"></a><a name="en-us_topic_0182220026_p175772543712"></a>-s, --scheduler</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p165716257371"><a name="en-us_topic_0182220026_p165716257371"></a><a name="en-us_topic_0182220026_p165716257371"></a>Load balancing scheduling algorithm.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p85732519371"><a name="en-us_topic_0182220026_p85732519371"></a><a name="en-us_topic_0182220026_p85732519371"></a>Mandatory. Value range: rr|wrr|lc|wlc|lblc|lblcr|dh|sh|sed|nq.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_row55742563712"><td class="cellrowborder" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p2578253370"><a name="en-us_topic_0182220026_p2578253370"></a><a name="en-us_topic_0182220026_p2578253370"></a>-p, --persistent</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p557132516371"><a name="en-us_topic_0182220026_p557132516371"></a><a name="en-us_topic_0182220026_p557132516371"></a>Service duration.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p1457142511372"><a name="en-us_topic_0182220026_p1457142511372"></a><a name="en-us_topic_0182220026_p1457142511372"></a>Mandatory. The value ranges from 1 to 2678400, in seconds.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_row14571025183718"><td class="cellrowborder" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p257025163715"><a name="en-us_topic_0182220026_p257025163715"></a><a name="en-us_topic_0182220026_p257025163715"></a>-D, --delete-service</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p205752510371"><a name="en-us_topic_0182220026_p205752510371"></a><a name="en-us_topic_0182220026_p205752510371"></a>-t, --tcp-service</p>
<p id="en-us_topic_0182220026_p458925203715"><a name="en-us_topic_0182220026_p458925203715"></a><a name="en-us_topic_0182220026_p458925203715"></a>-u, --udp-service</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p165822523717"><a name="en-us_topic_0182220026_p165822523717"></a><a name="en-us_topic_0182220026_p165822523717"></a>Virtual service type.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.4 "><p id="en-us_topic_0182220026_p95882512376"><a name="en-us_topic_0182220026_p95882512376"></a><a name="en-us_topic_0182220026_p95882512376"></a>Mandatory. You can select <strong id="en-us_topic_0182220026_b55916538524"><a name="en-us_topic_0182220026_b55916538524"></a><a name="en-us_topic_0182220026_b55916538524"></a>--tcp-service</strong> or <strong id="en-us_topic_0182220026_b25921153165214"><a name="en-us_topic_0182220026_b25921153165214"></a><a name="en-us_topic_0182220026_b25921153165214"></a>--udp-service</strong>. The format is <strong id="en-us_topic_0182220026_b16841255205211"><a name="en-us_topic_0182220026_b16841255205211"></a><a name="en-us_topic_0182220026_b16841255205211"></a>ip:port</strong>. The value of <strong id="en-us_topic_0182220026_b18842145595218"><a name="en-us_topic_0182220026_b18842145595218"></a><a name="en-us_topic_0182220026_b18842145595218"></a>port</strong> ranges from 1 to 65535.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_row13585253371"><td class="cellrowborder" rowspan="3" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p1158725123716"><a name="en-us_topic_0182220026_p1158725123716"></a><a name="en-us_topic_0182220026_p1158725123716"></a>-a, --add-server</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p45872583711"><a name="en-us_topic_0182220026_p45872583711"></a><a name="en-us_topic_0182220026_p45872583711"></a>-t, --tcp-service</p>
<p id="en-us_topic_0182220026_p15581325103716"><a name="en-us_topic_0182220026_p15581325103716"></a><a name="en-us_topic_0182220026_p15581325103716"></a>-u, --udp-service</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p25892563717"><a name="en-us_topic_0182220026_p25892563717"></a><a name="en-us_topic_0182220026_p25892563717"></a>Virtual service type.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.4 "><p id="en-us_topic_0182220026_p19582025153715"><a name="en-us_topic_0182220026_p19582025153715"></a><a name="en-us_topic_0182220026_p19582025153715"></a>Mandatory. You can select <strong id="en-us_topic_0182220026_b341314107532"><a name="en-us_topic_0182220026_b341314107532"></a><a name="en-us_topic_0182220026_b341314107532"></a>--tcp-service</strong> or <strong id="en-us_topic_0182220026_b5413191012531"><a name="en-us_topic_0182220026_b5413191012531"></a><a name="en-us_topic_0182220026_b5413191012531"></a>--udp-service</strong>. The format is <strong id="en-us_topic_0182220026_b5698101815319"><a name="en-us_topic_0182220026_b5698101815319"></a><a name="en-us_topic_0182220026_b5698101815319"></a>ip:port</strong>. The value of <strong id="en-us_topic_0182220026_b06991518135310"><a name="en-us_topic_0182220026_b06991518135310"></a><a name="en-us_topic_0182220026_b06991518135310"></a>port</strong> ranges from 1 to 65535.</p>
<p id="en-us_topic_0182220026_p6588251379"><a name="en-us_topic_0182220026_p6588251379"></a><a name="en-us_topic_0182220026_p6588251379"></a>Example:</p>
<pre class="screen" id="en-us_topic_0182220026_screen12581825143719"><a name="en-us_topic_0182220026_screen12581825143719"></a><a name="en-us_topic_0182220026_screen12581825143719"></a>kata-runtime kata-ipvs ipvsadm --parameters "--add-server --tcp-service 172.17.0.7:80 --real-server 172.17.0.4:80 --weight 100" &lt;container-id&gt;</pre>
</td>
</tr>
<tr id="en-us_topic_0182220026_row5580254370"><td class="cellrowborder" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p05811258371"><a name="en-us_topic_0182220026_p05811258371"></a><a name="en-us_topic_0182220026_p05811258371"></a>-r, --real-server</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p175814258376"><a name="en-us_topic_0182220026_p175814258376"></a><a name="en-us_topic_0182220026_p175814258376"></a>Real server address.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p105814257374"><a name="en-us_topic_0182220026_p105814257374"></a><a name="en-us_topic_0182220026_p105814257374"></a>Mandatory. The format is <strong id="en-us_topic_0182220026_b2089653312535"><a name="en-us_topic_0182220026_b2089653312535"></a><a name="en-us_topic_0182220026_b2089653312535"></a>ip:port</strong>. The value of <strong id="en-us_topic_0182220026_b12897123385319"><a name="en-us_topic_0182220026_b12897123385319"></a><a name="en-us_topic_0182220026_b12897123385319"></a>port</strong> ranges from 1 to 65535.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_row17581625153719"><td class="cellrowborder" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p15819257372"><a name="en-us_topic_0182220026_p15819257372"></a><a name="en-us_topic_0182220026_p15819257372"></a>-w, --weight</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p359152519373"><a name="en-us_topic_0182220026_p359152519373"></a><a name="en-us_topic_0182220026_p359152519373"></a>Weight</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p10591525143711"><a name="en-us_topic_0182220026_p10591525143711"></a><a name="en-us_topic_0182220026_p10591525143711"></a>Optional. The value ranges from 0 to 65535.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_row185917254379"><td class="cellrowborder" rowspan="3" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p359182518373"><a name="en-us_topic_0182220026_p359182518373"></a><a name="en-us_topic_0182220026_p359182518373"></a>-e, --edit-server</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p95913251373"><a name="en-us_topic_0182220026_p95913251373"></a><a name="en-us_topic_0182220026_p95913251373"></a>-t, --tcp-service</p>
<p id="en-us_topic_0182220026_p359142563711"><a name="en-us_topic_0182220026_p359142563711"></a><a name="en-us_topic_0182220026_p359142563711"></a>-u, --udp-service</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p559152543712"><a name="en-us_topic_0182220026_p559152543712"></a><a name="en-us_topic_0182220026_p559152543712"></a>Virtual service type.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.4 "><p id="en-us_topic_0182220026_p759142513719"><a name="en-us_topic_0182220026_p759142513719"></a><a name="en-us_topic_0182220026_p759142513719"></a>Mandatory. You can select <strong id="en-us_topic_0182220026_b6430155775312"><a name="en-us_topic_0182220026_b6430155775312"></a><a name="en-us_topic_0182220026_b6430155775312"></a>--tcp-service</strong> or <strong id="en-us_topic_0182220026_b2431257195319"><a name="en-us_topic_0182220026_b2431257195319"></a><a name="en-us_topic_0182220026_b2431257195319"></a>--udp-service</strong>. The format is <strong id="en-us_topic_0182220026_b16407155811533"><a name="en-us_topic_0182220026_b16407155811533"></a><a name="en-us_topic_0182220026_b16407155811533"></a>ip:port</strong>. The value of <strong id="en-us_topic_0182220026_b0408115810533"><a name="en-us_topic_0182220026_b0408115810533"></a><a name="en-us_topic_0182220026_b0408115810533"></a>port</strong> ranges from 1 to 65535.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_row3591225133718"><td class="cellrowborder" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p75913255373"><a name="en-us_topic_0182220026_p75913255373"></a><a name="en-us_topic_0182220026_p75913255373"></a>-r, --real-server</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p135962517378"><a name="en-us_topic_0182220026_p135962517378"></a><a name="en-us_topic_0182220026_p135962517378"></a>Real server address.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p759192583716"><a name="en-us_topic_0182220026_p759192583716"></a><a name="en-us_topic_0182220026_p759192583716"></a>Mandatory. The format is <strong id="en-us_topic_0182220026_b183033151547"><a name="en-us_topic_0182220026_b183033151547"></a><a name="en-us_topic_0182220026_b183033151547"></a>ip:port</strong>. The value of <strong id="en-us_topic_0182220026_b10303191535419"><a name="en-us_topic_0182220026_b10303191535419"></a><a name="en-us_topic_0182220026_b10303191535419"></a>port</strong> ranges from 1 to 65535.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_row18591025163718"><td class="cellrowborder" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p1259102517373"><a name="en-us_topic_0182220026_p1259102517373"></a><a name="en-us_topic_0182220026_p1259102517373"></a>-w, --weight</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p1759182517379"><a name="en-us_topic_0182220026_p1759182517379"></a><a name="en-us_topic_0182220026_p1759182517379"></a>Weight</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p459162512377"><a name="en-us_topic_0182220026_p459162512377"></a><a name="en-us_topic_0182220026_p459162512377"></a>Optional. The value ranges from 0 to 65535.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_row2592025163712"><td class="cellrowborder" rowspan="2" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p55992516378"><a name="en-us_topic_0182220026_p55992516378"></a><a name="en-us_topic_0182220026_p55992516378"></a>-d, --delete-server</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p559125103712"><a name="en-us_topic_0182220026_p559125103712"></a><a name="en-us_topic_0182220026_p559125103712"></a>-t, --tcp-service</p>
<p id="en-us_topic_0182220026_p1860102516379"><a name="en-us_topic_0182220026_p1860102516379"></a><a name="en-us_topic_0182220026_p1860102516379"></a>-u, --udp-service</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p6603255378"><a name="en-us_topic_0182220026_p6603255378"></a><a name="en-us_topic_0182220026_p6603255378"></a>Virtual service type.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.4 "><p id="en-us_topic_0182220026_p8601256377"><a name="en-us_topic_0182220026_p8601256377"></a><a name="en-us_topic_0182220026_p8601256377"></a>Mandatory. You can select <strong id="en-us_topic_0182220026_b17326183985417"><a name="en-us_topic_0182220026_b17326183985417"></a><a name="en-us_topic_0182220026_b17326183985417"></a>--tcp-service</strong> or <strong id="en-us_topic_0182220026_b132712391546"><a name="en-us_topic_0182220026_b132712391546"></a><a name="en-us_topic_0182220026_b132712391546"></a>--udp-service</strong>. The format is <strong id="en-us_topic_0182220026_b16595114045412"><a name="en-us_topic_0182220026_b16595114045412"></a><a name="en-us_topic_0182220026_b16595114045412"></a>ip:port</strong>. The value of <strong id="en-us_topic_0182220026_b15595194014545"><a name="en-us_topic_0182220026_b15595194014545"></a><a name="en-us_topic_0182220026_b15595194014545"></a>port</strong> ranges from 1 to 65535.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_row16601425123715"><td class="cellrowborder" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p206062517372"><a name="en-us_topic_0182220026_p206062517372"></a><a name="en-us_topic_0182220026_p206062517372"></a>-r, --real-server</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p16601325183716"><a name="en-us_topic_0182220026_p16601325183716"></a><a name="en-us_topic_0182220026_p16601325183716"></a>Real server address.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p13601625113720"><a name="en-us_topic_0182220026_p13601625113720"></a><a name="en-us_topic_0182220026_p13601625113720"></a>Mandatory. The format is <strong id="en-us_topic_0182220026_b09228496541"><a name="en-us_topic_0182220026_b09228496541"></a><a name="en-us_topic_0182220026_b09228496541"></a>ip:port</strong>. The value of <strong id="en-us_topic_0182220026_b17922174913543"><a name="en-us_topic_0182220026_b17922174913543"></a><a name="en-us_topic_0182220026_b17922174913543"></a>port</strong> ranges from 1 to 65535.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_row1160192503714"><td class="cellrowborder" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p86017253377"><a name="en-us_topic_0182220026_p86017253377"></a><a name="en-us_topic_0182220026_p86017253377"></a>-L, --list</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p1760142512373"><a name="en-us_topic_0182220026_p1760142512373"></a><a name="en-us_topic_0182220026_p1760142512373"></a>-t, --tcp-service</p>
<p id="en-us_topic_0182220026_p1060625163714"><a name="en-us_topic_0182220026_p1060625163714"></a><a name="en-us_topic_0182220026_p1060625163714"></a>-u, --udp-service</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p1160152573719"><a name="en-us_topic_0182220026_p1160152573719"></a><a name="en-us_topic_0182220026_p1160152573719"></a>Queries virtual service information.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.4 "><p id="en-us_topic_0182220026_p26012533711"><a name="en-us_topic_0182220026_p26012533711"></a><a name="en-us_topic_0182220026_p26012533711"></a>Optional.</p>
<p id="en-us_topic_0182220026_p156013254374"><a name="en-us_topic_0182220026_p156013254374"></a><a name="en-us_topic_0182220026_p156013254374"></a>Example:</p>
<pre class="screen" id="en-us_topic_0182220026_screen1360112511379"><a name="en-us_topic_0182220026_screen1360112511379"></a><a name="en-us_topic_0182220026_screen1360112511379"></a>kata-runtime kata-ipvs ipvsadm --parameters "--list --tcp-service ip:port" &lt;container-id&gt;</pre>
</td>
</tr>
<tr id="en-us_topic_0182220026_row1260325113711"><td class="cellrowborder" rowspan="3" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p17600254379"><a name="en-us_topic_0182220026_p17600254379"></a><a name="en-us_topic_0182220026_p17600254379"></a>--set</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p1660925113716"><a name="en-us_topic_0182220026_p1660925113716"></a><a name="en-us_topic_0182220026_p1660925113716"></a>--tcp</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p26032510371"><a name="en-us_topic_0182220026_p26032510371"></a><a name="en-us_topic_0182220026_p26032510371"></a>TCP timeout.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.4 "><p id="en-us_topic_0182220026_p1260172514375"><a name="en-us_topic_0182220026_p1260172514375"></a><a name="en-us_topic_0182220026_p1260172514375"></a>Mandatory. The value ranges from 0 to 1296000.</p>
<p id="en-us_topic_0182220026_p360122523716"><a name="en-us_topic_0182220026_p360122523716"></a><a name="en-us_topic_0182220026_p360122523716"></a>Example:</p>
<pre class="screen" id="en-us_topic_0182220026_screen56042514378"><a name="en-us_topic_0182220026_screen56042514378"></a><a name="en-us_topic_0182220026_screen56042514378"></a>kata-runtime kata-ipvs ipvsadm --parameters "--set 100 100 200" &lt;container-id&gt;</pre>
</td>
</tr>
<tr id="en-us_topic_0182220026_row860182518379"><td class="cellrowborder" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p146092573711"><a name="en-us_topic_0182220026_p146092573711"></a><a name="en-us_topic_0182220026_p146092573711"></a>--tcpfin</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p860142510373"><a name="en-us_topic_0182220026_p860142510373"></a><a name="en-us_topic_0182220026_p860142510373"></a>TCP FIN timeout.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p360125123718"><a name="en-us_topic_0182220026_p360125123718"></a><a name="en-us_topic_0182220026_p360125123718"></a>Mandatory. The value ranges from 0 to 1296000.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_row86052553710"><td class="cellrowborder" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p1060525133718"><a name="en-us_topic_0182220026_p1060525133718"></a><a name="en-us_topic_0182220026_p1060525133718"></a>--udp</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p26014258377"><a name="en-us_topic_0182220026_p26014258377"></a><a name="en-us_topic_0182220026_p26014258377"></a>UDP timeout.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.3 "><p id="en-us_topic_0182220026_p1960192515372"><a name="en-us_topic_0182220026_p1960192515372"></a><a name="en-us_topic_0182220026_p1960192515372"></a>Mandatory. The value ranges from 0 to 1296000.</p>
</td>
</tr>
<tr id="en-us_topic_0182220026_row860172553711"><td class="cellrowborder" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p26072514370"><a name="en-us_topic_0182220026_p26072514370"></a><a name="en-us_topic_0182220026_p26072514370"></a>--restore</p>
</td>
<td class="cellrowborder" colspan="2" valign="top" headers="mcps1.2.8.1.4 mcps1.2.8.1.5 "><p id="en-us_topic_0182220026_p1860525203718"><a name="en-us_topic_0182220026_p1860525203718"></a><a name="en-us_topic_0182220026_p1860525203718"></a>-</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.6 "><p id="en-us_topic_0182220026_p2061142593713"><a name="en-us_topic_0182220026_p2061142593713"></a><a name="en-us_topic_0182220026_p2061142593713"></a>Imports standard inputs in batches.</p>
<p id="en-us_topic_0182220026_p176117251378"><a name="en-us_topic_0182220026_p176117251378"></a><a name="en-us_topic_0182220026_p176117251378"></a>Rule files can be specified.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.7 "><p id="en-us_topic_0182220026_p196142573717"><a name="en-us_topic_0182220026_p196142573717"></a><a name="en-us_topic_0182220026_p196142573717"></a>Example:</p>
<pre class="screen" id="en-us_topic_0182220026_screen196119255371"><a name="en-us_topic_0182220026_screen196119255371"></a><a name="en-us_topic_0182220026_screen196119255371"></a>kata-runtime kata-ipvs ipvsadm --restore - &lt; &lt;rule file path&gt; &lt;container-id&gt;</pre>
<div class="note" id="en-us_topic_0182220026_note122642164417"><a name="en-us_topic_0182220026_note122642164417"></a><a name="en-us_topic_0182220026_note122642164417"></a><span class="notetitle"> NOTE: </span><div class="notebody"><p id="en-us_topic_0182220026_p11611425143712"><a name="en-us_topic_0182220026_p11611425143712"></a><a name="en-us_topic_0182220026_p11611425143712"></a>By default, the NAT mode is used for adding a single real server. To add real servers in batches, you need to manually add the <strong id="en-us_topic_0182220026_b11188297568"><a name="en-us_topic_0182220026_b11188297568"></a><a name="en-us_topic_0182220026_b11188297568"></a>-m</strong> option to use the NAT mode.</p>
<p id="en-us_topic_0182220026_p126182533712"><a name="en-us_topic_0182220026_p126182533712"></a><a name="en-us_topic_0182220026_p126182533712"></a>The following is an example of the rule file content:</p>
<p id="en-us_topic_0182220026_p126162514372"><a name="en-us_topic_0182220026_p126162514372"></a><a name="en-us_topic_0182220026_p126162514372"></a>-A -t 10.10.11.12:100 -s rr -p  3000</p>
<p id="en-us_topic_0182220026_p461225203718"><a name="en-us_topic_0182220026_p461225203718"></a><a name="en-us_topic_0182220026_p461225203718"></a>-a -t 10.10.11.12:100 -r  172.16.0.1:80 -m</p>
<p id="en-us_topic_0182220026_p186116257373"><a name="en-us_topic_0182220026_p186116257373"></a><a name="en-us_topic_0182220026_p186116257373"></a>-a -t 10.10.11.12:100 -r  172.16.0.1:81 -m</p>
<p id="en-us_topic_0182220026_p66152513376"><a name="en-us_topic_0182220026_p66152513376"></a><a name="en-us_topic_0182220026_p66152513376"></a>-a -t 10.10.11.12:100 -r 172.16.0.1:82  -m</p>
</div></div>
</td>
</tr>
<tr id="en-us_topic_0182220026_row1161425133716"><td class="cellrowborder" rowspan="2" valign="top" headers="mcps1.2.8.1.1 "><p id="en-us_topic_0182220026_p361172553710"><a name="en-us_topic_0182220026_p361172553710"></a><a name="en-us_topic_0182220026_p361172553710"></a><strong id="en-us_topic_0182220026_b46111259379"><a name="en-us_topic_0182220026_b46111259379"></a><a name="en-us_topic_0182220026_b46111259379"></a>cleanup</strong></p>
</td>
<td class="cellrowborder" rowspan="2" valign="top" headers="mcps1.2.8.1.2 "><p id="en-us_topic_0182220026_p3617258375"><a name="en-us_topic_0182220026_p3617258375"></a><a name="en-us_topic_0182220026_p3617258375"></a>--parameters</p>
</td>
<td class="cellrowborder" colspan="2" valign="top" headers="mcps1.2.8.1.4 mcps1.2.8.1.5 "><p id="en-us_topic_0182220026_p196119251373"><a name="en-us_topic_0182220026_p196119251373"></a><a name="en-us_topic_0182220026_p196119251373"></a>-d, --orig-dst</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.6 "><p id="en-us_topic_0182220026_p1961112517374"><a name="en-us_topic_0182220026_p1961112517374"></a><a name="en-us_topic_0182220026_p1961112517374"></a>Specifies the IP address.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.7 "><p id="en-us_topic_0182220026_p16618253379"><a name="en-us_topic_0182220026_p16618253379"></a><a name="en-us_topic_0182220026_p16618253379"></a>Mandatory.</p>
<p id="en-us_topic_0182220026_p561122593718"><a name="en-us_topic_0182220026_p561122593718"></a><a name="en-us_topic_0182220026_p561122593718"></a>Example:</p>
<pre class="screen" id="en-us_topic_0182220026_screen361102513371"><a name="en-us_topic_0182220026_screen361102513371"></a><a name="en-us_topic_0182220026_screen361102513371"></a>kata-runtime kata-ipvs cleanup --parameters "--orig-dst 172.17.0.4 --protonum tcp" &lt;container-id&gt;</pre>
</td>
</tr>
<tr id="en-us_topic_0182220026_row161525153711"><td class="cellrowborder" colspan="2" valign="top" headers="mcps1.2.8.1.4 mcps1.2.8.1.5 "><p id="en-us_topic_0182220026_p861142583719"><a name="en-us_topic_0182220026_p861142583719"></a><a name="en-us_topic_0182220026_p861142583719"></a>-p, --protonum</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.6 "><p id="en-us_topic_0182220026_p1061625193720"><a name="en-us_topic_0182220026_p1061625193720"></a><a name="en-us_topic_0182220026_p1061625193720"></a>Protocol type.</p>
</td>
<td class="cellrowborder" valign="top" headers="mcps1.2.8.1.7 "><p id="en-us_topic_0182220026_p1561325113719"><a name="en-us_topic_0182220026_p1561325113719"></a><a name="en-us_topic_0182220026_p1561325113719"></a>Mandatory. The value can be <strong id="en-us_topic_0182220026_b2026815719561"><a name="en-us_topic_0182220026_b2026815719561"></a><a name="en-us_topic_0182220026_b2026815719561"></a>tcp</strong> or <strong id="en-us_topic_0182220026_b188201659145617"><a name="en-us_topic_0182220026_b188201659145617"></a><a name="en-us_topic_0182220026_b188201659145617"></a>udp</strong>.</p>
</td>
</tr>
</tbody>
</table>

