语句资源
==================

- POST /v1/声明

查询查询

：需要执行的SQL查询

请求头X-Presto-User

代表执行语句的用户（可选）

请求头X-Presto-Source

：查询来源

请求器X-Presto-Catalog

：要执行查询的目录

请求头X-Presto-Schema

：执行查询的模式

提交语句给Presto执行。Presto客户端执行
代表用户进行针对目录和架构的查询。你跑的时候
使用PrestoCLI的查询，则调用语句资源
普雷斯托协调人。

对语句资源的请求就是要作为
发布标准X-Presto-Catalog,X-Presto-Source，
X-Presto-Schema头域和X-Presto-User头域。

语句资源的响应包含一个查询标识符
可用于收集查询的详细信息。这个
初始响应还包括关于具有以下特征的阶段的信息：
被创建来对Prestoworker执行此查询。每个查询都有一个
根级和根级被赋予一个级标识符\"0\"作为
响应示例如下。

这个根阶段聚合了其他阶段的响应。
普雷斯托工人和交付他们通过普雷斯托协调员给客户。
当一个客户端收到这个POST的响应时，它将包含一个
属性指示客户端查询此地址以获取
查询的附加结果。

**请求样例**：

>```{.http} ,（中文名）
> POST /v1/语句HTTP/1.1语法检查
> ```
>
>主机：localhost:8001 X-Presto-Catalog:jmx X-Presto-来源：presto-cli前置脚本脚本
> X-Presto-Schema：表示使用jmx用户代理：表示使用StatementClient/0.55-SNAPSHOT
> X-Presto-User:tobrie1内容-长度：41字节
>
>从中选择名称\"java.lang:type=runtime\"

**响应样例**：

>```{.http} ,（中文名）
> HTTP/1.1 200确定（中文）
> ```
>
>内容类型：application/json，内容类型：X-Content-Type，选项：nosniff
>传输编码：chunked
>
> {
>
> : \"id\":\"20140108\_110629\_00011\_dk5x2\"，
> \"infoUri\":\"<http://本地主机名称：8001/v1/query/20140108_110629_00011_dk5x2>\"，
> \"partialCancelUri\":\"<http://10.193.207.128:8080/v1/stage/20140108_110629_00011_dk5x2.1> <部分取消会议按钮的图标>\"，
> \"nextUri\":\"<http://本地主机名称：8001/v1/statement/20140108_110629_00011_dk5x2/1>\"，
> \"columns\": \【{\"name\":\"name\",\"类型\":\"varchar\"} \】，
> \"stats\": {\"状态\":\"运行\", \"定时\":false，
> \"节点数\":1, \"总拆分数\":0, \"队列拆分数\":0，
> \"runningSplits\":0, \"completedSplits\":0, \"CPU时间毫秒\":0，
> \"wallTimeMillis\":0, \"处理行数\":0, \"处理字节数\":0，
> \"rootStage\" : {\"舞台标识\":\"0\", \"状态\":\"SCHEDULED\"，
> \"done\":false, \"节点数\":1, \"拆分总数\":0，
> \"队列拆分数\":0, \"运行拆分数\":0, \"完成拆分数\":0，
> \"cpuTimeMillis\":0, \"防火墙时间Millis\":0, \"处理行数\":0，
> \"已处理字节数\":0, \"子阶段\": \[ { \"stageId\"":\"1\"，
> \"状态\":\"SCHEDULED\", \"done\":false, \"节点\":1，
> \"总分裂数\":0, \"队列分裂数\":0, \"运行分裂数\":0，
> \"已完成拆分\":0, \"cpuTimeMillis\":0, \"防火墙时间Millis\":0，
> \"处理行数\":0, \"处理字节数\":0, \"子阶段\":\[\] } \]
> } }
>
> }
   

-获取/v1/语句/{queryId}/{token}信息

查询queryId

：初始POST返回给/v1/statement的查询标识

查询令牌

：从初始POST到/v1/statement或从
对同一呼叫的上一个呼叫

当Presto客户端提交语句以供执行时，Presto会创建一个
query，然后向客户端返回一个nextUri。此呼叫对应
，并且可以包含查询的状态更新
或它能够将最终结果交付给客户端。

**请求样例**：

>```{.http} ,（中文名）
> GET /v1/statement/20140108_110629_00011_dk5x2/1开放接口协议接口协议接口协议接口协议接口协议接口协议/1.1
>主机：local主机：8001
> User-Agent：声明客户端/0.55-SNAPSHOT
> ```

**响应样例**：

>```{.http} ,（中文名）
> HTTP/1.1 200确定（中文）
> ```
>
>内容类型：application/json X-内容类型-选项：nosniff变量：
>接受编码，用户代理转移编码：chunked
>
> 383 { \"id\":\"20140108\_110629\_00011\_dk5x2\" ，
> \"infoUri\":\"<http://本地主机名称：8001/v1/query/20140108_110629_00011_dk5x2>\"，
> \"columns\": \【{\"name\":\"name\",\"类型\":\"varchar\"} \】，
> \"data\": \[\[\"<4165@domU-12-31-39-0F-CC-72>\"\"\] \], \"stats\": { <当前日期>\<当前日期>\<当前日期>\<当前日期>\<当前日期>\<当前日期>\<当前日期>
> \"state\":\"FINISHED\", \"scheduled\":true, \"节点个数\":1，
> \"总分裂数\":2, \"队列分裂数\":0, \"运行分裂数\":0，
> \"已完成拆分\":2, \"cpuTimeMillis\":1, \"wallTimeMillis\":4，
> \"处理行数\":1, \"处理字节数\":27, \"rootStage\": {
> \"stageId\":\"0\", \"state\":\"FINISHED\", \"done\":true, \"节点名称\":1，
> \"总分裂数\":1, \"队列分裂数\":0, \"运行分裂数\":0，
> \"completedSplits\":1, \"cpuTimeMillis\":0, \"防火墙时间Millis\":0，
> \"已处理行数\":1, \"已处理字节数\":32, \"子阶段\": \[ {
> \"stageId\":\"1\", \"state\":\"FINISHED\", \"done\":true, \"节点名称\":1，
> \"总分裂数\":1, \"队列分裂数\":0, \"运行分裂数\":0，
> \"completedSplits\":1, \"cpuTimeMillis\":0, \"防火墙时间Millis\":4，
> \"处理行数\":1, \"处理字节数\":27, \"子阶段\":\[\] } \] }
> } }
   

-删除/v1/语句/{queryId}/{token}，删除指定的token。

查询queryId

：初始POST返回给/v1/statement的查询标识

请求头X-Presto-User

代表执行语句的用户（可选）

请求头X-Presto-Source

：查询来源

请求器X-Presto-Catalog

：要执行查询的目录

请求头X-Presto-Schema

：执行查询的模式
