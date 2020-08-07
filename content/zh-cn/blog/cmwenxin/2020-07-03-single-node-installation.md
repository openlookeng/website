+++
title = "openLooKeng初体验-单节点自动安装"
date = "2020-07-03"
tags = ["openLooKeng","大数据", "单节点安装","自动安装"]
archives = "2020-07"
author = "cmwenxin"
description = "openLooKeng初体验,单节点自动安装"
+++

来源:<a>https://blog.csdn.net/cmwenxin1992/article/details/107094914</a>

openLooKeng初体验-单节点自动安装
===============================

今天浏览新闻时看到华为近期开源了一款名为[openLooKeng数据虚拟化引擎](https://www.huawei.com/cn/news/2020/7/huawei-data-virtualization-engine-openlookeng)。正好最近在研究跨源跨域异构数据分析的问题，于是便继续了解了一下。访问其[官方网站](https://www.openlookeng.io/docs/docs/installation/deployment-auto.html) 感觉页面风格做得还挺简洁清爽。阅读了一些概念和简介，大概七七八八了解了个轮廓。 然后顺着首页[quick start 指导]( https://www.openlookeng.io/docs/docs/start.html )，我准备动手实践一下。

![home page quick start](https://img-blog.csdnimg.cn/20200703112441997.png)



## 我的环境
根据文档说明，仅仅只要一台linux 环境，内存大于4G即可，于是我就用了我自己的公有云机器：

![myenv](https://img-blog.csdnimg.cn/20200703112513555.png)



## 安装和使用

在linux命令行窗口执行：
```shell script
wget -O - https://download.openlookeng.io/install.sh|bash
```
从脚本运行日志来看，脚本应该是自动做了一些环境检查，并自动从下载了openLooKeng的安装包和依赖包。接着又自动下载了安装包并部署到环境上。此外，从下图可以看到脚本帮我创建了一个名为openlkadmin的用户，用于管理openLooKeng服务的。这点值得表扬。可以很好地避免了用root 用户来操作一切。

![install_processing](https://img-blog.csdnimg.cn/20200703112532576.png)

过了一会儿，日志显示部署成功了。如下图：

![auto_deployment_sc1](https://img-blog.csdnimg.cn/20200703112605217.png)

总体感觉安装很顺畅，整个过程我并没有做任何操作。不过也吐槽一下，中间有有一个环节卡了一会儿，我估计是在下载openLooKeng的安装，整个过程没有任何信息输出，我还以为部署脚本卡住了。好在过了一分钟后脚本继续往下走了。 估计是我网络导致下载缓慢的缘故吧。

安装结束时，脚本提示它已自动将openLooKeng的服务运行起来了， 并提示可以运行运行cli 来连接openLooKeng。

照着部署结束的提示，运行如下命令：

```shell
/opt/openlookeng/bin/openlk-cli
```

![clicommand](https://img-blog.csdnimg.cn/2020070311263914.png)

可以看到`openlk-cl ` 连接到了localhost 的8090 端口，通过简单的查询可以看到系统已经内置了几个数据源： [system]( https://openlookeng.io/docs/docs/connector/system.html ), [memory]( https://openlookeng.io/docs/docs/connector/memory.html ), [tpcds]( https://openlookeng.io/docs/docs/connector/tpcds.html ), [tpch]( https://openlookeng.io/docs/docs/connector/tpch.html )

进一步看tpdcs下有哪些数据表：

```sql
show tables from tpcds.sf100
```

![sf100tables](https://img-blog.csdnimg.cn/20200703112718486.png)

从表名字来看，就是标准的[tpcds benchmark]( http://www.tpc.org/tpcds/ ) 的测试数据了。不管三七二十一，先看看数据量大小：

![sf100_count.png](https://img-blog.csdnimg.cn/20200703112746668.png)



![sf1_count](https://img-blog.csdnimg.cn/20200703112811282.png)

对比结果比较明了，sf后缀的数值越大，数据量也越大。

顺手我就跑了几个[tpcds标准的查询]( https://github.com/hdinsight/tpcds-hdinsight/tree/master/queries )。 先从数据量小的跑一个吧：

```sql
use tpcds.sf1;
```

```sql
select dt.d_year 
 , item.i_brand_id brand_id 
 , item.i_brand brand
 , sum(ss_ext_sales_price) sum_agg
from date_dim dt 
 , store_sales
 , item
where dt.d_date_sk = store_sales.ss_sold_date_sk
    and store_sales.ss_item_sk = item.i_item_sk
    and item.i_manufact_id = 436
    and dt.d_moy=12
group by dt.d_year
 ,item.i_brand
 ,item.i_brand_id
order by dt.d_year
 ,sum_agg desc
 ,brand_id
limit 100;
```

![query3_result](https://img-blog.csdnimg.cn/20200703112837531.png)

​		![query3_runtime](https://img-blog.csdnimg.cn/20200703112853828.png)

总耗时46秒， 处理了297万行数据， 印象还不错。 



换个数据大的，在换个更复杂的联合查询试了一下：

```sql
use tpcds.sf100;
```

```sql
with
    customer_total_return
    as
    (
        select sr_customer_sk as ctr_customer_sk 
            , sr_store_sk as ctr_store_sk 
            , sum(SR_FEE) as ctr_total_return
        from store_returns 
            , date_dim
        where sr_returned_date_sk = d_date_sk and d_year =2000
        group by sr_customer_sk 
            ,sr_store_sk
    )
select c_customer_id
from customer_total_return ctr1 
    , store 
    , customer
where ctr1.ctr_total_return > (
        select avg(ctr_total_return)*1.2
        from customer_total_return ctr2
        where ctr1.ctr_store_sk = ctr2.ctr_store_sk
    ) 
    and s_store_sk = ctr1.ctr_store_sk 
    and s_state = 'NM' 
    and ctr1.ctr_customer_sk = c_customer_sk
order by c_customer_id
limit 100;
```

值得注意的是，cli 界面也会显示执行过程。

![executing_processing](https://img-blog.csdnimg.cn/20200703112923575.png)

![runtime_bigger](https://img-blog.csdnimg.cn/20200703112938627.png)

可以看到，总耗时2分46秒处理了近6千多万记录。

实际上，我们去[WEB UI 界面]( https://openlookeng.io/docs/docs/admin/web-interface.html )上去看，浏览器登陆http://localhost:8090, 可以看到整个执行中间过程，包括内存使用，数据传输率等信息。

![runing_processing_webui_mid](https://img-blog.csdnimg.cn/20200703112958527.png)



## 初步体验感受

整个安装过程比较简单，一键式无需干预。 脚本也完成了创建用户、校验/安装jdk依赖、配置以及默认数据源的添加等操作，对于我们初尝openLooKeng 来说非常方便，省去了阅读冗长安装部署的文档。

从使用openLooKeng的角度而言，我还需要做更多的探索。目前是单节点运行，且体验了内置数据源。下一步，我先了解下openLooKeng的[connector]( https://openlookeng.io/docs/docs/connector.html )， 然后试着去连接更多的真实数据源。 如果能找到更多的机器，我也会试一下多节点安装，以及多节点部署后的openLooKeng 是否会带来性能的极大提升。

to be continued : )

