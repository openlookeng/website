任务资源
=============

Task资源提供了一组REST端点，这些端点提供了Presto
服务器能够就任务和任务输出进行交流。这个
不是一个供最终用户使用的服务，但它支持
在Presto安装上执行查询。

-获取/v1/任务

返回Prestoserver已知的所有任务的信息。

请注意，对`/v1/task`的调用的输出可能相当大。如果你
对忙碌的Presto服务器执行这个命令，收到的响应将
包括该服务器已知的每个任务的列表以及详细
操作员和司机的统计信息。

下面的示例响应显示了一个具有
被删节以符合本手册。一个忙碌的Presto真正的回应
服务器将生成页和页的输出。这里有一个
状态为'CANCELED'的任务的'taskId'。

**响应样例**：

'````{.http}'，
[ {
"taskId" : "20131222_183944_00011_dk5x2.1.0"，
"版本" : 9223372036854775807，
"state" : "已取消状态"，
"self" : "未知"，
"lastHeartbeat" : "2013-12-22T13:54:46.566-05:00"，
"outputBuffers" : {
"state" : "已完成"，
"masterSequenceId": 0（主排序序号），
"pagesAdded" : "新增页面个数"，
"缓冲区" : [ ]
}，
"noMoreSplits" : [ ]，
"stats" : {
"createTime" : "创建时间"，
"elapsedTime" : "0.00ns"，
"queuedTime" : "排队时间"，
"总驱动数" :0，
"queuedDrivers"队列驱动个数为0，
"runningDrivers" : "当前正在运行的驱动个数"，
"completedDrivers": "当前已完成的驱动个数"，
"memoryReservation" : "0B内存预留"，
"totalScheduledTime" ：
"totalCpuTime" ：
"totalBlockedTime" ：
"rawInputDataSize" : "0B数据输入大小"，
"rawInputPositions":0个位置，
"processingInputDataSize" : "输入数据大小"，
" processedInputPositions" : "处理输入位置个数"，
"outputDataSize" : "输出数据大小"，
"outputPositions": 0个输出位置
"管道": [ ]
}，
"失败数": [ ]，
"输出" : { }
}]
```


- POST /v1/task/{任务编号}


-删除/v1/任务/{taskId}操作

从Presto服务器删除给定的任务。

-
获取/v1/任务/{taskId}信息

通过`taskId`检索指定任务的信息。

下面是一个任务的输出结果示例。它包含
以下为高阶章节：

-输出缓冲区
- "更多分裂"
- "统计数据"
- "失败"
- "产出"

这是相同的输出，也出现在响应中，从
查询资源，其中列出了
特定查询。此调用由Presto用于协调查询。

**响应样例**：

'````{.http}'，
{
"taskId" : "20140115_170528_00004_dk5x2.0.0"，
"版本": 42，
"state" : "已完成"，
"self" : "http://10.193.207.128:8080/v1/task/20140115_170528_00004_dk5x2.0.0" ,（在浏览器地址栏中输入该地址，即可在浏览器中看到该地址）"，
"lastHeartbeat" : "2014-01-15T12:12:12.518-05:00"，
"outputBuffers" : {
"state" : "已完成"，
"masterSequenceId": 0（主排序序号），
"pagesAdded": "新增页面数量"，
"缓冲区" : [ {
"bufferId" : "输出"，
"finished" ：正确完成。
"bufferedPages" : "缓存的页面个数"，
"pagesSent": "已发送页数":1页
} ]
}，
"noMoreSplits" : ["8"]，
"stats" : {
"createTime" : "创建时间"，
"startTime" : "启动时间"，
"endTime" : "2014-01-15T12:12:12.518-05:00"，
"elapsedTime" : "4.00s"，
"queuedTime" : "6.39毫秒"，
"总司机数" :1，
"queuedDrivers"队列驱动个数为0，
"runningDrivers" : "当前正在运行的驱动个数"，
"已完成的司机" : 1，
"memoryReservation": "内存预留"，
"totalScheduledTime" : "调度时间"，
"totalCpuTime" : "4.09毫秒时间"，
"totalBlockedTime" : "总阻塞时间"，
"rawInputDataSize" : "原始输入数据大小"，
"rawInputPositions": 154个输入位置，
"processingInputDataSize" : "10.90kB数据输入大小"，
"processedInputPositions": 154个输入位置，
"outputDataSize" : "输出数据大小"，
"输出位置": 154，
"管道": [ {
"inputPipeline": "输入通道":true，
"outputPipeline" ：输出管道。
"总司机数" :1，
"queuedDrivers"队列驱动个数为0，
"runningDrivers" : "当前正在运行的驱动个数"，
"已完成的司机" : 1，
"memoryReservation" : "0B内存预留"，
"queuedTime" : {
"maxError": "最大错误数"，
"count" : 1.0个，单位个，单位个。
"总计":5857000.0，
"p01" : 5857000，
"p05" : 5857000，
"p10": 5857000，单位：万分之一，单位：千分之一。
"p25": 5857000，单位：万分之一，单位：千分之一。
"p50": 5857000，单位：万分之一，单位：千分之一。
"p75": 5857000，单位：万分之一，单位：千分之一。
"p90" : 5857000，
"p95": 5857000，单位：万亿千比特。
"p99" : 5857000，
"分钟" : 5857000，
“最大”：5857000
}，
"已用时间" : {
"maxError": "最大错误数"，
"count" : 1.0个，单位个，单位个。
"总计":4.1812E7，
"p01": 41812000，端口号：
"p05": 41812000，单位：个/秒。
"p10":"41812000"，
"p25":"41812000"，
"第50页": 41812000页，
"p75": 41812000，中文版本
"p90":"41812000"，
"p95":"41812000"，
"p99": 41812000,（中文大意为"p99"，英文大意为"p99"）
"分钟": 41812000，
“最大”：41812000
}，
"totalScheduledTime" : "调度时间"，
"totalCpuTime" : "4.09毫秒时间"，
"totalBlockedTime" : "总阻塞时间"，
"rawInputDataSize" : "原始输入数据大小"，
"rawInputPositions": 154个输入位置，
"processingInputDataSize" : "10.90kB数据输入大小"，
"processedInputPositions": 154个输入位置，
"outputDataSize" : "输出数据大小"，
"输出位置": 154，
"运营商汇总" : [ {
"operatorId": 0（运营商编号）
"operatorType" : "交换操作员"，
"addInputCalls": "0" ，添加输入呼叫
"addInputWall" : "0.00ns"，
"addInputCpu" : "0.00ns"，
"addInputUser" : "0.00ns"，
"inputDataSize" : "输入数据大小"，
"输入位置" : 154，
"getOutputCalls" : "获取输出呼叫数"，
"getOutputWall" ：
"getOutputCpu" : "137.90us"，
"getOutputUser" : "0.00ns"，
"outputDataSize" : "输出数据大小"，
"输出位置": 154，
"blockedWall" : "29.50毫秒"，
"finishCalls" : "0"结束本次通话
"finishWall" ：
"finishCpu" ：
"finishUser" ：
"memoryReservation" : "0B内存预留"，
"info" : {
"bufferedBytes": "0"字节，单位：字节
"平均每次请求字节数": 11158。
"bufferedPages" : "缓存的页面个数"，
"pageBufferClientStatuses": [ {缓存客户端状态列表
"uri" : "http://10.193.207.128:8080/v1/task/20140115_170528_00004_dk5x2.1.0/results/ab68e201-3878-4b21-b6b9-f6658（其中，该检查项的检查项的检查项名称与检查标准检查项名称一致） ddc408b"，
"state" : "已关闭"，
"lastUpdate" : "2014-01-15T12:12:08.562-05:00"，
"pagesReceived": "页面接收数量"，
"requestsScheduled" : 3个预约会议列表
"requestsCompleted": "请求已完成",3个
"httpRequestState" : "请求队列状态"
} ]
}
}, {
"operatorId"取值为1
"operatorType" : "过滤和工程类型"，
"addInputCalls": "添加输入呼叫个数"，
"addInputWall" ：
"addInputCpu" : "919.38us"，
"addInputUser" : "0.00ns"，
"inputDataSize" : "输入数据大小"，
"输入位置" : 154，
"getOutputCalls": "2"个输出参数，
"getOutputWall" : "获取输出窗口"，
"getOutputCpu" : "128.64us"，
"getOutputUser" : "0.00ns"，
"outputDataSize" : "输出数据大小"，
"输出位置": 154，
"blockedWall" : "0.00ns"，
"finishCalls" : 5个结束呼叫
"finishWall" : "258.00us"，
"finishCpu" : "253.19us" ，
"finishUser" ：
"memoryReservation" : "0B"
}, {
"operatorId"取值为2，
"operatorType" : "运营商订购"，
"addInputCalls": "添加输入呼叫个数"，
"addInputWall" ：
"addInputCpu" : "439.18us"，
"addInputUser" : "0.00ns"，
"inputDataSize" : "输入数据大小"，
"输入位置" : 154，
"getOutputCalls": 4个输出接口
"getOutputWall" ：
"getOutputCpu" : "831.85us"，
"getOutputUser" : "0.00ns"，
"outputDataSize" : "输出数据大小"，
"输出位置": 154，
"blockedWall" : "0.00ns"，
"finishCalls" : 4个呼叫
"finishWall" : "808.00us" ，
"finishCpu" : "810.18us" ，
"finishUser" ：
"memoryReservation": "内存预留功能"
}, {
"operatorId"参数值：3，
"operatorType" : "过滤和工程类型"，
"addInputCalls": "添加输入呼叫个数"，
"addInputWall" : "166.00us"，
"addInputCpu" : "166.66us"，
"addInputUser" : "0.00ns"，
"inputDataSize" : "输入数据大小"，
"输入位置" : 154，
"getOutputCalls" : 5个输出接口
"getOutputWall" : "305.00us"，
"getOutputCpu" : "241.14us"，
"getOutputUser" : "0.00ns"，
"outputDataSize" : "输出数据大小"，
"输出位置": 154，
"blockedWall" : "0.00ns"，
"finishCalls": "2"结束本次通话
"finishWall" ：
"finishCpu" : "71.02us" ，
"finishUser" ：
"memoryReservation" : "0B"
}, {
"operatorId"：填写4，表示操作员。
"operatorType" : "任务输出操作员"，
"addInputCalls": "添加输入呼叫个数"，
"addInputWall" ：
"addInputCpu" : "51.03us"，
"addInputUser" : "0.00ns"，
"inputDataSize" : "输入数据大小"，
"输入位置" : 154，
"getOutputCalls": "0"表示获取输出呼叫数，
"getOutputWall" ：
"getOutputCpu" : "0.00ns"，
"getOutputUser" : "0.00ns"，
"outputDataSize" : "输出数据大小"，
"输出位置": 154，
"blockedWall" : "0.00ns"，
"finishCalls": "1"结束本次通话
"finishWall" : "35.00us" ，
"finishCpu" : "35.39us" ，
"finishUser" ：
"memoryReservation" : "0B"
} ]，
"驾驶员" : [ ]
} ]
}，
"失败数": [ ]，
"输出" : { }
}
```


-获取任务/v1/任务/{taskId}/results/{输出ID}/{令牌}

Presto通过此服务获取任务输出。


-删除/v1/任务/{taskId}/results/{outputId}（根据任务ID删除结果数据）

Presto删除任务输出。

