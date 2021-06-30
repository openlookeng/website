+++ 
title = "openLooKeng v1.3.0 Official Released"
date = "2021-06-30"
categories = ["Announcement"]
author = "openLooKeng"
description = "To continuously provide partners with an optimal data analysis experience, openLooKeng iterates once every three months, with the most recent version (openLooKeng v1.3.0) released in June 2021. Based on partners' experience and suggestions, we enhanced existing features, and introduced new features to improve the engine performance. "
+++


Since moving to open source on June 30, 2020, openLooKeng has been providing support for an increasing number of services, including HUAWEI CLOUD Data Lake Insight (DLI), the data assets management platform of Beiming Software, and UiAuto of Legion Technology. To continuously provide partners with an optimal data analysis experience, openLooKeng iterates once every three months, with the most recent version (openLooKeng v1.3.0) released in June 2021. Based on partners' experience and suggestions, we enhanced existing features, and introduced new features to improve the engine performance.

For the engine kernel, openLooKeng v1.3.0 provides optimized converged analysis and performance:

## Convergent analysis

### Task recovery

Task recovery facilitates query task retry operations. This means, in the event of a fault of a query task or a worker node, the query task can be restored on another node. openLooKeng v1.3.0 is compatible with the Common Table Expression (CTE) and spill-to-disk features, offering best-in-class the batch query capability of the engine kernel.

## Improved performance

### 1. Star-tree index

The star-tree index is a pre-aggregation technique used to achieve low latency runtime for iceberg queries. It enables you to create and manage different cubes (multidimentional datasets) tailored to your needs. openLooKeng v1.3.0 supports the creation of large cubes (10 billion aggregations and dimensions), where incremental data can be inserted into cubes, and filters can be created in the cubes to filter data.

### 2. CTE

The execution plan for the CTE (WITH statements) is optimized, by which the CTE is executed only once and is transmitted in streaming mode to other references in the query, reducing the required computing resources. openLooKeng v1.3.0 supports operator pushdown of CTE, further improving the overall concurrency of the system.

### 3. Cost-based optimization (CBO)

A sort aggregator is added for sorted tables in the new version of openLooKeng. Compared with the original hash aggregator, the sort aggregator prevents the storage of unnecessary data, accelerating memory and processing, and improving engine query performance.

Our openLooKeng team attaches great importance to enhancing the engine kernel and developing the southbound ecosystem. We look forward to working with more partners for this common goal. In openLooKeng v1.3.0, we optimized existing connectors, and added new connectors such as Hudi, Greenplum, and ClickHouse, offering a better data experience for partners.

## Optimized function

1.The Oracle connector supports update and delete operations.

2.The JDBC connector supports multi-shard queries and improves performance by increasing concurrency.

3.The Memory connector uses hetuMetastore to support data and metadata persistence, preventing memory table information loss. It provides a new data layout to support sorting and indexing, improving data query performance.

## Newly-added data source connectors

1.The Hudi connector supports access to and query of the Hudi data source.

2.The Greenplum connector supports basic read and write operations on the Greenplum data source, but does not support delete and update operations.

3.The ClickHouse connector supports basic read and write operations on the ClickHouse data source. SQL statements can be pushed to the data source, and external functions can be registered and pushed to the data source.

To provide better user experience and improve engine reliability, openLooKeng v1.3.0 also enhances the resource isolation feature. Specifically, openLooKeng v1.3.0 implements throttled scheduling or task termination based on the configured restrictions and resource usage to ensure proper use of resources.

### **Download openLooKeng v1.3.0 at**

<https://openlookeng.io/download.html>

As a key project of big data, openLooKeng has been committed to providing users with ultra-fast and simplified data experience. Up to now, openLooKeng has been iterated and updated over six versions. With each interaction, the engine performance has been continuously improved, which in turn has spurred the community. For those who have joined us on our journey, we are grateful for your support; for those interested in working with us, we look forward to you joining the openLooKeng family in the future. Let's work together to advance the big data engine technologies.

openLooKeng, Make Big Data Simplified!

If you want to leave feedback on the openLooKeng v1.3.0, send an email to users@openlookeng.io.

openLooKeng official website: <https://openlookeng.io/>

openLooKeng code repository: <https://gitee.com/openlookeng>
