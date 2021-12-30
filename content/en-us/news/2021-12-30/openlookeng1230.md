+++ 
title = "openLooKeng v1.5.0 Officially Released"
date = "2021-12-30"
categories = ["Announcement"]
author = "openLooKeng"
description = "the community has attracted over 100,000 users and 2,000 pull requests, received 1,500 issues, and housed 1,500 comments. openLooKeng has been downloaded more than 100,000 times by users from 210 cities across 41 countries and regions. "
+++
 
On June 30, 2020, the data virtualization engine openLooKeng officially went open source. Since then, the community has attracted over 100,000 users and 2,000 pull requests, received 1,500 issues, and housed 1,500 comments. openLooKeng has been downloaded more than 100,000 times by users from 210 cities across 41 countries and regions. More and more people are paying attention to openLooKeng. Today, the neighborhood presents a vibrant, leafy scene. 

openLooKeng has provided users with simpler data analytics experience with each iteration. On December 30, 2021, openLooKeng v1.5.0 will be officially released. Based on the earlier versions, the existing features are optimized and new features are provided to improve the engine performance.

 
### Star Tree Indexing
In openLooKeng v1.5.0, the Star Tree indexing has been enhanced as follows:

1、 Support for optimizing join queries, such as star schema queries.

2、 Optimized the query plan by redirecting the aggregation operation to the Cube, which contains the pre-aggregation results. The performance improvement is obvious when the GROUP BY clause completely matches the Cube group.

3、 Bug fixes to further enhance the usability, and robustness of Cubes.


### Memory Connector

1、Improved the performance of the memory connector by adding support for memory table partitioning to allow data skipping of entire partitions.

2、 Support for openLooKeng cost based optimizers by collecting statistics on the memory tables.

### Task Recovery
Several important bug fixes to address data inconsistency issues, and query hanging issues that occasionally occur during high concurrency, and during worker failures.

### Spill to Disk

Optimized the spill-to-disk mechanism. Serialized pages are directly written to the disk instead of being cached. In this way, the operator uses less memory, boosting the performance by 30%.


### OLK-on-Yarn
Support for the deployment of HA-enabled openLooKeng cluster instance on Yarn. The instance contains a reverse proxy (Nginx by default), and two or more coordinator nodes. The cluster can be scaled in and out manually by adding and removing Yarn containers to the coordinator and worker components.

These are the optimizations of the openLooKeng v1.5.0. As a key project of big data, openLooKeng has been committed to providing users with ultra-fast and simplified data experience. If you are a fan of big data, welcome to join openLooKeng for more big data knowledge and trivia. Together, we will build a prosperous big data ecosystem. Welcome to download and use openLooKeng. 

openLooKeng, Make Big Data Simplified!

---

Download openLooKeng v1.5.0 at <https://openlookeng.io/download.html>.

You are welcomed to commit issues to openLooKeng Gitee repositories and share your experience and suggestions. 

Your voice may become the key to improving the performance of the openLooKeng engine.


openLooKeng repositories: <https://gitee.com/openlookeng>

If you want to leave feedback on the openLooKeng v1.5.0, send an email to users@openlookeng.io.

openLooKeng official website: <https://openlookeng.io>
 


