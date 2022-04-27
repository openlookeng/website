+++
title = "openLooKeng v1.6.1 补丁发布"
date = "2021-04-27"
categories = ["Announcement"]
author = "openLooKeng"
description = "社区的小伙伴们，大家好！前不久openLooKeng社区发布最新版本1.6.0，社区最大程度倾听用户声音，接收用户反馈，在研发和社区的小伙伴的推动下，现对最新版本1.6.0进行补丁优化，供大家参考。"
+++
 

社区的小伙伴们，大家好！前不久openLooKeng社区发布最新版本1.6.0，社区最大程度倾听用户声音，接收用户反馈，在研发和社区的小伙伴的推动下，现对最新版本1.6.0进行补丁优化，供大家参考。

## 数据源统计信息：

 
 
|  描述   | 链接  |
|  ----  | ----  |
| 增加统计信息获取方式，支持从Connector直接获取统计信息。有些算子可以下推到Connector里面进行计算，可能需要直接从Connector获取统计信息才能展示真正被处理的数据量。 |    PR：https://gitee.com/openlookeng/hetu-core/pulls/1450<br> https://gitee.com/openlookeng/hetu-core/pulls/1451   |  


## 算子处理扩展：

|  描述   | 链接  |
|  ----  | ----  |
| 增加通过用户自定义worker结点物理执行计划的生成，用户可以实现自己的算子pipeline代替原生实现，加速算子处理。 |   PR： https://gitee.com/openlookeng/hetu-core/pulls/1436 <br> https://gitee.com/openlookeng/hetu-core/pulls/1443   |  


## HIVE UDF扩展：

|  描述   | 链接  |
|  ----  | ----  |
| 增加 HIVE UDF 函数命名空间的适配，以支持执行基于HIVE UDF框架编写的UDF（含GenericUDF） |    https://gitee.com/openlookeng/hetu-core/pulls/1455   |  



欢迎在openLooKeng gitee仓上提Issue，分享您的体验感受与建议，您的声音或将成为openLooKeng引擎性能提升的关键。

openLooKeng开源社区官方网站:
<https://openlookeng.io/zh-cn/>

openLooKeng代码仓地址: 
<https://gitee.com/openlookeng>


openLooKeng小助手微信号：** openLooKengoss **

<style>
   table td{
     width:50%
   }
  </style>