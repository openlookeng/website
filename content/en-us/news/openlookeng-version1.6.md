+++ 
title = "openLooKeng v1.6.0 Officially Released"
date = "2022-03-30"
categories = ["Announcement"]
author = "openLooKeng"
description = "openLooKeng v1.6.0 is optimized in terms of spill to disk, low latency, connector enhancement, and task recovery, featuring higher performance and reliability and a broader space for innovation."
+++
 
In this flourishing season of spring, openLooKeng v1.6.0 is officially released with the joint efforts of the openLooKeng development team and community developers. It incorporates some optimizations and provides new functions to improve engine performance.

openLooKeng v1.6.0 is optimized in terms of spill to disk, low latency, connector enhancement, and task recovery, featuring higher performance and reliability and a broader space for innovation.


### Spill to Disk
openLooKeng v1.6.0 optimizes the spill to disk feature as follows:

|      &nbsp;    | Feature   |  Scenario  |
| :--------:   | :-----  | :----  |
| 1     | Optimized the spill to disk speed and size |   When a spill occurs during Hash Aggregation and Group By, data serialization to disks is slow and the data size is large. Reducing the data size and increasing the write speed can improve the overall performance. Using Kryo for serialization can improve the speed and reduce the size of data spill to disks.     |
| 2        |   Spill to HDFS   |   Computing process data can be spilled to multiple disks. Currently, data can be spilled to HDFS to improve throughput.   |
| 3        |    Async spill/non-spill    |  When the revocable memory exceeds the threshold and triggers a spill, data from the downstream operators is blocked from being accepted. Accepting the data and adding it to the existing spill process will help complete the pipeline faster.  |
| 4   | Spill to disk for RIGHT OUTER JOIN and FULL JOIN  | When the JOIN type is RIGHT OUTER JOIN or FULL JOIN, the build-side data will not be spilled because all data needs to be looked up in memory. This results in OOM when the data size is large. To address this issue, you can enable spill and create a Bloom filter to identify the spilled data during the connection to the probe side.  | 


### Connector Enhancement
|      &nbsp;    | Feature   |  Scenario  |
| :--------:   | :------  | :---  |
| 1     | Update/Delete for PostgreSQL and openGauss |   The PostgreSQL and openGauss connectors are enhanced to support the update and delete operations.  | 

### Low Latency

|      &nbsp;    | Feature   |  Scenario  |
| :--------:   | :----  | :----  |
| 1     | Update cube command for the Star-Tree index |   The update cube command is supported, allowing the administrator to easily update the existing cube when the underlying data changes.  | 
| 2    | Optimized the heuristic index |   Reduced the index size of the Bloom filter by more than 10x.  | 



### Task Recovery

|      &nbsp;    | Feature   |  Scenario  |
| :--------:   | :-----  | :----  |
| 1     | Optimized the failure detection time |   It used to take 300 seconds to detect that a task failed and needs to be resumed. Optimizing the failure detection time will improve the resumption process and shorten the overall query time.  | 
| 2    | Optimized the snapshot speed and size |   Java serialization, which is slow and requires more space, is used to take snapshots during execution. Using Kryo can increase the total throughput by reducing the file size and improving speed.  | 

Note: Kryo is a fast serialization/deserialization tool. It depends on the bytecode generation mechanism (the underlying layer uses the ASM library). Therefore, Kryo has faster serialization speed.

These are the optimizations of the openLooKeng v1.6.0. As a key big data project, openLooKeng releases one iteration every three months and is dedicated to providing users with ultra-fast and simplified data experience.
 

---

Download openLooKeng v1.6.0 at <https://openlookeng.io/download.html>

You are welcomed to commit issues to openLooKeng Gitee repositories and share your experience and suggestions. Your voice may become the key to improving the performance of the openLooKeng engine.

openLooKeng repositories: <https://gitee.com/openlookeng>
 
If you want to leave feedback on the openLooKeng v1.6.0, send an email to  <users@openlookeng.io>. Alternatively, add the openLooKeng Assistant to your WeChat contacts, and join the openLooKeng technical communication group to discover more about openLooKeng.

openLooKeng official website: <https://openlookeng.io/zh-cn> 

WeChat ID of the openLooKeng Assistant: openLooKengoss
 
