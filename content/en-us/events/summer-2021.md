+++
author = "openLooKeng"
time = "2021.02-2021.11"
title = "Summer 2021 of Open Source Promotion Plan（openLooKeng）"
location = "Online"
tag = "Developers Competition"
img = "/img/events/summer-2021-en.png"
img_mobile = "/img/events/summer-2021-en.png"
link = "./events/summer-2021.html"
eventtype = ""
description = ""
+++


## About Summer 2021

Summer 2021 of Open Source Promotion Plan (Summer 2021) is a summer activity for college students jointly organized by Institute of Software Chinese Academy of Sciences and openEuler community. It aims to encourage college students to actively participate in the development and maintenance of open-source software and promote the vigorous development of excellent open-source software community. We will cooperate with major open-source communities to provide projects for the development and maintenance of important open source software, and will open enrollment to college students around the world.

Students are free to choose projects and communicate with mentors on implementation plans in order to write project plans. The selected students will complete the development task as planned and contribute the results to the community under the guidance of the community mentor. The community evaluates student completion and the organizer committee grants the money award to students based on the evaluation results.

<img src="/img/events/summer-2021-en.png">

## Tasks released by openLooKeng Community

openLooKeng community is releasing three tasks in Summer 2021. Students can find the tasks that you are interested in from this article, and communicate with the tutor by email, or contact openLooKeng assistant (Wechat openlookengoss) for assistance.

---
#### Task 1 openLooKeng Function Enhancement

1.	Name：openLooKeng supports HA Proxy

2.	Description：openLooKeng supports the HA mode. With the capabilities of third-party agents, such as Nginx, load balancing can be implemented among multiple coordinators. However, third-party agents, such as Nginx, cannot automatically discovery coordinators. If a new coordinator is added, in this case, you need to manually modify the configuration of third-party proxies such as Nginx, which makes cluster management difficult. This project extends the original proxy logic of openLooKeng and combines the discovery framework of openLooKeng to implement the following functions:

    a) Automatic discovery and monitoring. When a Coordinator node joins or exits, the service list can be updated in near real time (at the millisecond level).

    b) Load balancing. By default, only one policy is required to be implemented, but the interface must be scalable to support multiple load balancing policies.

    c) High-performance forwarding, taking Nginx as the benchmark;

3.	Project Difficulty：Medium

4.	Community Mentor：Zhang Jingfang

5.	Email: 410920672@qq.com

6.	Project Out Requirements：

    - Proxy design documents;

    - Proxy code and related test cases;

    - Proxy performance test result;

7.	Project Technical Requirements：

    - Mechanism of Forward proxy;

    - Theoretical knowledge of NIO;

    - Load balancing theory;

    - Airlift Discovery framework;

8.	Related Open Source Repositories：

    <https://gitee.com/openlookeng/hetu-core>

---

#### Task 2 openLooKeng Performance Optimization

1.	Name: openLooKeng AI parameter optimization

2.	Description: When openLooKeng is deployed in a new cluster, parameter adjustment to achieve higher performance is an eternal challenge. openLooKeng has many core parameters. Performance optimization involves parameters in various configuration files, such as feature configuration attributes, JDK parameters and so on. How to recommend better parameter configurations based on inputs from multiple dimensions, such as the number of nodes in a cluster, the number of CPU cores, memory size, and network conditions, so implement AutoML, and perform adaptive parameter learning to obtain better parameter configurations. Make openLooKeng run faster.

3.	Project Difficulty: medium

4.	Community Mentor: LiZheng

5.	Email: lizheng@hust.edu.cn

6.	Project Out Requirements:

    - AutoML model and automatic parameter optimization based on openLooKeng

    - TPCDS benchmark and performance comparison test before and after parameter adjustment

7.	Project Technical Requirements:

    - Search for the optimal parameters in parameters of openLooKeng. Compared with the default parameter, the performance is significantly improved.

    - Multiple AutoML models can be referenced.

8.	Related Open Source Software Repositories:

    <https://gitee.com/openlookeng/hetu-core>

    DAC: [Datasize-Aware High Dimensional Configurations Auto-Tuning【 Zhibin Yu et al. （2018）】](http://alchem.usc.edu/portal/static/download/dac.pdf)

    Vega: [Towards an End-to-end configurable AutoML pipline 【Jiajin Zhang et al. 2020】](https://arxiv.org/abs/2011.01507)

---

#### Task 3 openLooKeng Function Enhancement and Performance Optimization

1.	Name: The openLooKeng Elasticsearch Connector supports pushdown.

2.	Description: When the openLooKeng Elasticsearch Connector is used to query Elasticsearch data source, the entire table data needs to be retrieved. When a large amount of data is involved and the SQL statements entered in the openLooKeng contains many data filtering conditions, a large amount of data that is retrieved is useless when all data items are retrieved, which wastes network bandwidth. Elasticsearch data source has strong computing capabilities and can filter and calculate data. Map filtering operators in the openLooKeng kernel to filtering operations that can be performed by Elasticsearch so that data can be filtered and calculated in Elasticsearch in advance. (For example, the count operator in openLooKeng is pushed to Elasticsearch.) , reducing data transmission and greatly shortening the execution time of openLooKeng SQL jobs, which is the purpose of this project.

3.	Project Difficulty: medium

4.	Community Mentor: Li Yize/Armlly

5.	Email：liyizeyouxiang@live.cn

6.	Project Out Requirements: 

    - Mapping model from the openLooKeng filtering operator to the Elasticsearch filtering operation;

    - Reconstruct the existing openLooKeng jdbc connector operator pushdown framework and submit executable code;

    - TPCDS Benchmark: comparison and analysis of TPCDS execution performance before and after pushdown;

7.	Project Technical Requirements: 

    - SQL and Java programming;

    - Database kernel engine related technologies;

    - openLooKeng and use Elasticsearch;

8.	Related Open Source Software Repositories: 
       
    <https://gitee.com/openlookeng/hetu-core>

## Schedule

| Date                      | Stage                                     |
| ------------------------- | ---------------------------------------- |
| Jan 29th               | Open of application for open source community                            |
| Apr 2nd               | Announcement of the first list of accepted open source community
|
| May 20th               | Deadline of application for open source community                        |
| May 21th             | Announcement of the second list of accepted open source community                        |
| **May 24th - Jun 13th** | **Student application period**                     |
| **Jun 30th**               | **Announcement of accepted student application**                     |
| Jul 1st - Aug 15th | The first phase of developing project                         |
| Aug 30th               | Announcement of the students who pass mid-term assessment                     |
| Aug 16th - Sep 30th | The second phase of developing project                         |
| **Oct 22nd**               | **Announcement of the students who pass final assessment**                     |
| Early November                 | Announcement of excellent projects                         |



## Participation Guide to “Summer 2021”

* If you are a student, see [Student Guide](https://summer.iscas.ac.cn/help/en/student/).
* If you are a community mentor, see [Mentor Guide](https://summer.iscas.ac.cn/help/en/mentor/).
* To get more details, visit [Summer 2021 of Open Source Promotion Plan](https://summer.iscas.ac.cn/#/homepage).
