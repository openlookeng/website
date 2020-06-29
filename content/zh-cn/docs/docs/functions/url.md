URL功能
=============

抽取功能
--------------------

URL提取函数从HTTP URL（或任何符合[2396](https://tools.ietf.org/html/rfc2396.html）的合法URI)中提取组件，支持的语法如下：

"```{.none}"
【协议：】【//主机【：端口】】【路径】[?query]【#碎片】
```

抽取的组件不包含`:`或`?`等URI语法分隔符。

**url\_extract\_fragment(url)** -\> varchar

从`url`返回片段标识符。

**url\_extract\_host(url)** -\> varchar

从`url`返回host。

**url\_extract\_parameter(url，名称** -\> varchar <路径> <参数名> <参数名> <参数名>

从`url`中返回第一个名为`name`的查询字符串参数的值。参数提取按照[1866#section-8.2.1] (https://tools.ietf.org/html/rfc1866.html#section-8.2.1)的典型方式处理。


**url\_extract\_path(url)** -\> varchar

从`url`返回路径。

**url\_extract\_port(url)** -\> <大图标> <大图标> <小图标> <小图标> <大图标> <小图标>

从`url`返回端口号。


**url\_extract\_protocol(url)** -\> varchar

从`url`返回协议。


**url\_extract\_query(url)** -\> varchar

从`url`返回查询字符串。


编码功能
------------------

**url\_encode（值）** -\> varchar <字符串> <字符串>

对`value`进行编码，使其安全地包含在URL查询参数名和值中：

-字母数字字符不编码。
-字符`.`,`-`,`*`,`_`不编码。
- ASCII空格字符编码为`+`。
-其他字符统一转换为UTF-8编码为字符串`%XX`,`XX`为UTF-8字节的大写十六进制值。

**url\_decode(value)** -\> varchar

对URL编码后的`value`进行转义。该函数是`url_encode`的逆函数。

