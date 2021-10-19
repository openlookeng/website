+++ 
title = "openLooKeng v1.4.0 Officially Released"
date = "2021-10-15"
categories = ["Announcement"]
author = "openLooKeng"
description = "In October, openLooKeng v1.4.0 is officially released with optimizations based on partners' experience and suggestions, to improve the engine performance. "
+++


As IT construction costs become lower and lower, along with the rapid development of data storage, platform construction, open source data technologies, and artificial intelligence, various industries are paying more attention to big data analytics capabilities. Since moving to open source in June 2020, openLooKeng has provided users with simpler and more reliable data analytics experience with each iteration. As a result, more and more users are using openLooKeng, including independent software vendors (ISVs), governments, financial institutions, and Internet companies. We appreciate the support from our users and partners. In October, openLooKeng v1.4.0 is officially released with optimizations based on partners' experience and suggestions, to improve the engine performance.


### · Star Tree index

The star-tree index is a pre-aggregation technique used to achieve low latency run time for iceberg queries. It enables you to create and manage different cubes (multidimentional datasets) tailored to your needs. In addition to the support for the creation of large cubes (10 billion aggregations and dimensions), in openLooKeng v1.4.0, APIs are updated to support JDBC connectors, such as ClickHouse Connector, to use cubes. More JDBC connectors will be supported in the future.

### · Heuristic indexing

In openLooKeng v1.4.0, the heuristic indexing has been enhanced as follows:

1. UPDATE INDEX is supported. In previous versions, to modify an index, you must delete it then create a new one. In openLooKeng v1.4.0, update operations can be performed on existing indexes.

2. The index size, memory and disk usage information are added to SHOW INDEX, so that you can use indexes more properly.

3. Nmap cache is added to the bloom index to reduce memory usage.

4. Indexes can be deleted simultaneously as the DROP TABLE statement is executed.

5. Indexes can be automatically loaded after being created.

### · Memory connector

Several major errors are fixed to resolve occasional incorrect results in large datasets and caused by specific operators.

### · Task recovery

Several major errors are fixed to resolve data inconsistencies that occur occasionally in high concurrency scenarios and when a worker node is faulty.

### · Low latency

1. The stats calculation of point query SQL statements that does not contain JOIN is optimized to accelerate the query speed.

2. Adaptive sharding and grouping are added to improve the throughput of high concurrency queries.

3. Non-equivalent dynamic filters are supported to speed up queries with predicates such as <, >, <= & >=.

### · Newly added Kylin connector

The Kylin data source can be accessed and queried.

### · Deploying openLooKeng on Yarn

The openLooKeng cluster can be deployed in the Yarn containers. Currently, deployment of a single coordinator node with multiple worker nodes is supported. 

---

These are the optimizations of the openLooKeng v1.4.0. As a key project of big data, openLooKeng has been committed to providing users with ultra-fast and simplified data experience. If you are interested in big data, welcome to join openLooKeng and share your ideas about big data engine technologies.

openLooKeng, Make Big Data Simplified !

Welcome to download and use openLooKeng v1.4.0 at <https://openlookeng.io/download.html>.

You are welcomed to commit issues to openLooKeng Gitee repositories and share your experience and suggestions. Your voice may become the key to improving the performance of the openLooKeng engine.

openLooKeng code repositories: <https://gitee.com/openlookeng>

If you want to leave feedback on the openLooKeng v1.4.0, send an email to users@openlookeng.io.

openLooKeng community official website: <https://openlookeng.io/>
