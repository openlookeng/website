# Known Issues<a name="EN-US_TOPIC_0225731124"></a>

-   The FIPS boot mode of the kernel has not been fully authenticated. The FIPS boot may be abnormal.  [I17Z18](https://gitee.com/src-openeuler/crypto-policies/issues/I17Z18?from=project-issue)
-   When libvirt is used to start the GlusterFS VM, a 300-byte memory leak occurs each time. For details about the discussion, click  [https://github.com/gluster/glusterfs/issues/818](https://github.com/gluster/glusterfs/issues/818).  [I185CH](https://gitee.com/src-openeuler/glusterfs/issues/I185CH?from=project-issue)
-   When the libvirt interface is used to continuously perform disk hot swap operations, there is a possibility that the hot remove interface returns a success message, but the disk is not removed and cannot be hot swapped again. You can stop the VM and then restart it.  [I1C72L](https://gitee.com/src-openeuler/qemu/issues/I1C72L?from=project-issue)
-   There is a low probability that an unknown installation exception occurs when the x86\_64 VM is used for installation. In this case, install the x86\_64 VM again.  [I1C8HS](https://gitee.com/src-openeuler/anaconda/issues/I1C8HS?from=project-issue)
-   CVE-2012-0039: When a local application calls the  **g\_str\_hash**  function, the application continuously consumes CPU resources, causing DoS attacks. This issue will not be resolved in the community.
-   CVE-2015-9541: When Qt attempts to parse the abnormal SVG files which are constructed to launch exponential XML entity extension attacks, the memory may be insufficient. For details about the discussion, click  [https://codereview.qt-project.org/c/qt/qtbase/+/293909](https://codereview.qt-project.org/c/qt/qtbase/+/293909).
-   Before compiling some open-source packages, you need to install basic software such as GDB, GCC, and make. Otherwise, the compilation fails due to lack of dependency.
-   AArch64 and x86\_64 have different definitions of the character type. As a result, an error is reported during the self-check using Coreutils, Augeas, and Diffutils. You can add the  **--fsigned-char**  compilation option to solve the problem.

