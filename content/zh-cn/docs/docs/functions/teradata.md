Teradata功能介绍
==================

提供对Teradata SQL的兼容性。

字符串函数
----------------

**char2hexint（字符串）** -\> varchar（字符串）

返回字符串的UTF-16BE编码的十六进制表示形式。

**index（string，子串）** -\> bigint（大字符串）

函数`strpos`的别名。

**子串(string, start)** -\> varchar（子串开始）

函数`substr`的别名。


**子串(string, start, length)** -\> varchar（子串的开始长度）

函数`substr`的别名。


日期函数
--------------

本节中的函数使用与Teradata datetime函数兼容的格式字符串。下表基于Teradata参考手册，描述了支持的格式说明符：

| Specifier |说明|
| :------------ | :--------------------------------- |
| `- / , . ; ：冯曦|忽略标点符号|
| `dd' |每月的哪一天(1-31) |
| `hh` |一天中的小时(1-12) |
| `hh24` |一天中的小时(0-23) |
| `mi` |分钟(0-59) |
| `mm` |月份(01-12) |
| `ss` |秒(0-59) |
| `yyyy` |四位年份|
| `yy` |两位数年份|

**提示**

暂不支持大小写不敏感。所有的说明符都必须是小写的。


to\_char（时间戳，格式） -\> varchar

使用`format`将`timestamp`格式化为字符串。


**to\_timestamp（string，格式） -\>时间戳

使用`format`将`string`解析成`TIMESTAMP`。


**to\_date（string，格式） -\>日期

使用`format`将`string`解析成`DATE`。

