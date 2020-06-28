# Key Features<a name="EN-US_TOPIC_0228254580"></a>

-   iSula lightweight container solution, unified IoT, and edge and cloud computing container solutions
    -   Shortens a trace chain by three levels, and the memory usage of hundreds of containers is significantly lower than that of the Docker engine.
    -   Supports standard open-source container runtime interface \(CRI\) and open container initiative \(OCI\) and flexibly interconnects with multiple OCI runtimes such as runC and Kata.
    -   Secure container: combines the virtualization technology and container technology to ensure better isolation of secure containers.
    -   System container: supports local file system startup to implement quick deployment, and supports systemd deployment to improve user namespace isolation.

-   Kunpeng acceleration engine \(KAE\), supporting encryption and decryption acceleration
    -   Digest algorithm SM3, which supports asynchronous models.
    -   Symmetric encryption algorithm SM4, which supports asynchronous models and CTR, XTS, and CBC modes.
    -   Symmetric encryption algorithm AES, which supports asynchronous models and ECB, CTR, XTS, and CBC modes.
    -   Asymmetric algorithm RSA, which supports asynchronous models and key sizes 1024, 2048, 3072, and 4096.
    -   Key negotiation algorithm DH, which supports asynchronous models and key sizes 768, 1024, 1536, 2048, 3072, and 4096.


-   A-Tune intelligent system performance optimization engine, inferring service features and configuring optimal system parameters to ensure optimal service running
-   Enhancing the performance of glibc, zlib, and gzip and fully using the NEON instruction set of AArch64 to improve the basic library performance
-   Kernel feature enhancement
    -   Supports ARM64 kernel hot patches.
    -   Numa Aware Qspinlock: reduces cache/bus conflicts across NUMA nodes.
    -   Optimizes the IOVA page table lookup and release algorithms to improve the performance of the IOMMU subsystem.
    -   Optimizes the implementation of CRC32 and checksum based on ARM64 instructions and pipeline features, greatly improving data verification performance.
    -   Supports ARM v8.4 Memory System Resource Partitioning and Monitoring \(MPAM\).


