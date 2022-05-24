+++
title = "Open Source Promotion Plan OSPP Open for Applications"
date = "2021-05-17"
categories = ["Announcement"]
module = 'news'
author = "openLooKeng"
description = "Enjoy building and maintaining open source software? Welcome to the Open Source Promotion Plan (OSPP), a long-running summer program organized by the Open Source Software Supply Chain Promotion Plan! Here in the openLooKeng community, we are excited to take part and help college students—perhaps you! —build a bright future for open source software. No matter where you are in the world, we can do it together."
+++

Enjoy building and maintaining open source software? Welcome to the Open Source Promotion Plan (OSPP), a long-running summer program organized by the Open Source Software Supply Chain Promotion Plan! Here in the openLooKeng community, we are excited to take part and help college students—perhaps you! —build a bright future for open source software. No matter where you are in the world, we can do it together.

This summer, the openLooKeng community is launching four projects: `Iceberg Connector`, `Delta Lake Connector`, `openLooKeng Operator Pushdown Optimization`, and `Hive Connector Count/Max/Min Operator Pushdown`. You can apply for one project, whichever one you like, with help from one of our mentors. If you're successful, develop your project and add your work to the community!

You'll also receive a certificate and a bonus: **CNY8,000 for a basic difficulty project and CNY12,000** for an advanced one.

We look forward to seeing what you can do!

## How Everything Works

1. Choose

    - Choose your project and send the project's mentor an e-mail. You can write the subject like this:
    - Email subject: [OSPP Consulting] Your name + Project name.
    - In the e-mail, introduce yourself! Your school, major, and year. Of course share the project you wish to explore.

2. Apply

    - Work with your mentor to write a project proposal. You can follow the [project proposal template](https://summer-ospp.ac.cn/).
    - On the OSPP website, go to [Project List](https://summer-ospp.ac.cn/). Find your project's name. Click Apply and submit your proposal.
    - You can apply between May 20 and June 4, 2022.

3. Develop

    - The review process finishes on June 15, 2022. If your application was successful, congratulations! Start your project.
    - You can develop from July 1 to September 30, 2022.

4. Contribute

    - Your work is done! Submit the result to the community via a PR. After the PR is merged into the community repository and recognized by your mentor and the organizing committee, have yourself a well-deserved break.

## More Details

Feel free to check out the [Student Guide](https://summer-ospp.ac.cn/help/student/), the [OSPP official website](https://summer-ospp.ac.cn/), or scan the QR code to add openLooKeng Assistant on WeChat and request to join the OSPP communication group.

   <img src='./code.png' alt='2022暑期openLooKeng项目交流群' />

## openLooKeng Projects

### Project 1: Iceberg Connector (Basic Difficulty)

Apache Iceberg is an open table format designed for PB-level tables, one of the three currently popular open source data lake solutions. openLooKeng does not yet support Iceberg. This is where you come in!

What you'll do:

-   Iceberg connector design documents
-   Iceberg connector code and test cases
-   Performance test result

Skills you'll need:

-   SQL and Java programming
-   openLooKeng connector principles and design
-   Iceberg usage and design

Community mentor: [Zhou Sipei](zhousipei@huawei.com)

Related open source software repositories:

-   <https://openlookeng.io/>
-   <https://gitee.com/openlookeng/hetu-core>

### Project 2: Delta Lake Connector (Basic Difficulty)

Delta Lake is one of the three currently popular open source data lake solutions. openLooKeng does not yet support Delta Lake. Again, this is where you come in! The Delta Lake connector will use the Delta Standalone Library (DSR) provided by Delta Lake to read table metadata.

What you'll do:

-   Delta Lake connector design documents
-   Delta Lake connector code and test cases
-   Performance test result

Skills you'll need:

-   SQL and Java programming
-   openLooKeng connector principles and design
-   Delta Lake usage and design

Community mentor: [Tu Tianyi ](tutianyi@huawei.com)

Related open source software repositories:

-   <https://openlookeng.io/>
-   <https://gitee.com/openlookeng/hetu-core>

### Project 3: openLooKeng Operator Pushdown Optimization (Advanced Difficulty)

openLooKeng allows SQL subqueries to be pushed down to data sources for execution. This capability can reduce the amount of data transmitted between openLooKeng and data sources and improve the end-to-end execution efficiency of SQL statements. Due syntax and data type differences between openLooKeng and data sources, efficiently generating subquery statements pushed down to data sources becomes a key step in operator pushdown. In this project, you will analyze the pushdown process of openLooKeng operators and optimize the algorithm and workflow to improve query efficiency.

What you'll do:

-   Design documents
-   Optimization test report

Skills you'll need:

-   Database basics
-   SQL and Java programming
-   openLooKeng/Presto/Trino usage

Community mentor: [Chen Pingzeng ](chenpingzeng@huawei.com)

Related open source software repositories:

-   <https://openlookeng.io/>
-   <https://gitee.com/openlookeng/hetu-core>

### Project 4: Hive Connector Count/Max/Min Operator Pushdown (Advanced Difficulty)

When users use openLooKeng to query data on Hive, for example using the SQL statement select count(\*) from table, all data in the table is obtained but not used, wasting network bandwidth. But, when the Count, Max, and Min operators are pushed down to Hive for execution, only the table metadata needs to be read. This reduces data transmission and shortens openLooKeng's execution time. Once again, this is where you come in. Thank you!

What you'll do:

-   Successful pushdown of the Count, Max, and Min operators to Hive
-   Documents

Skills you'll need:

-   SQL and Java programming
-   Database kernel engine technologies
-   HivePartialAggregationPushdown in PrestoDB

Community mentor: [Wu Yuye](wuyuye@huawei.com)

Related open source software repositories:

-   <https://gitee.com/openlookeng/hetu-core>
-   <https://github.com/prestodb/presto>
