JSON函数和操作符
============================

转换为JSON
------------

支持从`BOOLEAN`、`TINYINT`、`SMALLINT`、`INTEGER`、`BIGINT`、`REAL`、`DOUBLE`、`VARCHAR`中任意组合输入。当数组的元素类型为支持的类型之一，或者Map的键类型为`VARCHAR`且Map的值类型为支持的类型之一时，支持从`ARRAY`、`MAP`或`ROW`转换。或当行的每个字段类型都是受支持类型之一时。演员表的行为如下例所示：

 

```
SELECT CAST(NULL AS JSON); --空字符串类型
SELECT CAST(1 AS JSON); --JSON '1'，表示选择条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件为条件
SELECT CAST(9223372036854775807 AS json); -- json '9223372036854775807'（服务器名称，服务器名称，服务器名称，服务器名称）
SELECT CAST（'abc' AS JSON）; -- 'JSON' "abc"'，表示从字符串中选取字符串作为结果字符串。
SELECT CAST（真实AS JSON）; --JSON '真实'，（中文）
SELECT CAST(1.234 AS JSON); --JSON '1.234'，表示选择结果集的父集。
SELECT CAST(ARRAY[1, 23, 456] AS JSON); --JSON '（高级查询表达式） '（高级查询表达式）
SELECT CAST(ARRAY[1, NULL, 456] AS JSON); --JSON '指定查询条件'，
SELECT CAST(ARRAY[ARRAY[1, 23], ARRAY[456]] AS json); -- json字段的输入内容，其中json字段的输入内容为'[1, 23],[456]]'
SELECT CAST（MAP_FROM_ENTRIES(ARRAY【('k1'， 1）, （'k2'， 23）, （'k3'， 456）】) AS JSON); -- JSON '{"k1":1, "k2":23,"k3":456}'，（其中k2表示第23个密钥，k3表示第456个密钥）
SELECT CAST（CAST(ROW(123, 'abc'， true） AS ROW(v1 BIGINT, v2 VARCHAR, v3 BOOLEAN) <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/><c/>> <b/> <b/>> <b/c/> <b/> ,/c/c/c/> ，取值以字符串形式返回查询结果，以字符串形式返回当前字符串形式显示查询结果。
```

**说明**

从NULL到`JSON`的转换并不简单。从独立`NULL`转换将产生一个SQL`NULL`而不是`JSON'null`。但是，当从包含`NULL`s的数组或映射进行强制转换时，
产生的`JSON`将有`null`在它。


**说明**

从`ROW`到`JSON`转换时，结果不是一个JSON对象，而是一个JSON数组。这是因为对于SQL中的行，位置比名称更重要。


从JSON转换
--------------

>投射到`BOOLEAN`、`TINYINT`、`SMALLINT`、`INTEGER`、`BIGINT`，
>支持`REAL`、`DOUBLE`、`VARCHAR`三种类型。铸造到`ARRAY'和
> `MAP`当数组的元素类型为
>支持的类型，或者当map的key类型为`VARCHAR`时，
“>”值类型是支持的类型之一。的行为
>演员阵容如下：
>
> SELECT CAST（JSON 'null' AS VARCHAR）; --空字符串类型
> SELECT CAST（JSON '1' AS INTEGER）; -- 1
> SELECT CAST（JSON '9223372036854775807' AS BIGINT） <源数据索引> <数据索引> <数据索引> <数据索引> <数据索引> <数据索引> <数据索引> -- 9223372036854775807；
> SELECT CAST（JSON '"abc"' AS VARCHAR）; -- abc
> SELECT CAST（JSON 'true' AS BOOLEAN）; --表达式为真
> SELECT CAST（JSON '1.234' AS DOUBLE）; -- 1.234
> SELECT CAST（JSON '[1,23,456]' AS ARRAY(INTEGER）)); --【1,23,456】，表示从第1条数据开始计算。
> SELECT CAST（JSON '[1,null,456]' AS ARRAY(INTEGER）)); --【1, NULL, 456】，表示从第1条数据开始，第456条数据结束。
> SELECT CAST（JSON '[1, 23],[456]]' AS ARRAY(ARRAY(整数）))); -- [[1, 23], [456]]（其中【1, 23】表示整数， [456]]表示整数）
> SELECT CAST（JSON '{"k1":1,"k2":23,"k3":456}' AS MAP(VARCHAR, INTEGER）)); -- {k1=1, k2=23，则返回此错误码，否则返回此错误码。k3=456}（千字节）
> SELECT CAST（JSON '{"v1":123,"v2":"abc","v3":true}'子句指定的行号(v1 BIGINT, v2 VARCHAR, v3 BOOLEAN）); -- -- {版本号1=123，版本号2=abc，版本号3=true}
> SELECT CAST（JSON '[123,"abc",true]' AS ROW(v1 BIGINT, v2 VARCHAR, v3 BOOLEAN）)); -- {参数1的值1=123，参数2=abc，参数3=true}, <参数1> ，参数2=abc，参数2=参数3=true}, <参数3> ，参数1表示变量被选中。

**说明**

JSON数组可以有混合的元素类型，JSON映射可以有混合的值类型。这使得在某些情况下无法将它们转换为SQL数组和映射。为了解决这个问题， Presto支持数组和映射的部分强制转换：

SELECT CAST（JSON '[1, 23], 456]' AS ARRAY(JSON）); --【JSON '【1, 23】'， JSON '456'】，进行条件判断，并返回查询结果。
SELECT CAST（JSON '{"k1": [1, 23], "k2": 456}' AS MAP(VARCHAR, JSON）); -- {k1 = JSON '【1, 23】'，（其中k1代表字符串长度，其他代表字符串长度） k2 = JSON '456'}（文本类型）
SELECT CAST（JSON '[null]' AS ARRAY(JSON）); --【JSON 'null'】； <b/><b/>（基于字符串查询的查询接口）


**说明**

从`JSON`到`ROW`转换时，支持JSON数组和JSON对象。


JSON函数
--------------

**is\_json\_scalar(json)** -\>布尔类型

确定`json`是否为标量（即JSON数字，JSON字符串，`true`,`false`或`null`）：

SELECT is_json_scalar（'1'）; --子句为真
SELECT is_json_scalar（'【1,2,3】'）; --语法错误，不符合语法规范


**json\_array\_contains(json, value)** -\>布尔值类型

判断`json`（一个包含JSON数组的字符串）中是否存在`value`：

SELECT json_array_contains（'【1,2,3】'，2）；


**json\_array\_get（json\_array，索引）** -\> json <数组字符串> <数组字符串>

**提示**

这个函数的语义被破坏了。如果提取的元素是一个字符串，它将被转换成一个没有正确引号的无效`JSON`值(值不会被引号包围，也不会被任何
内引号不会被转义)。

我们建议不要使用该功能。它不能在不影响现有使用的情况下被修复，并且可能在将来的版本中被移除。


将指定索引处的元素返回到`json_array`中。索引从零开始：

SELECT json_array_get（'["a", [3, 9], "c"]'， 0）; -- JSON 'a'（无效的JSON字符串类型）
SELECT json_array_get（'["a", [3, 9], "c"]'， 1）; --JSON '【3, 9】'， <标签名称> <标签名称> <标签值> <标签值> <标签值> <标签值> <标签值> <标签值> <标签值> <标签值> <标签值> <标签值> <标签值> <标签值>

该函数还支持从数组尾端获取索引的负索引：

SELECT json_array_get（'["c", [3, 9], "a"]'， -1）; --JSON 'a'（无效的JSON字符串类型）
SELECT json_array_get（'["c", [3, 9], "a"]'， -2）; --JSON '【3, 9】'， <标签名称> <数组值> <数组值> <数组值> <数组值> <数组值> <数组值> <数组值> <数组值> <数组值> <数组值> <数组值> <数组值>

如果指定索引处的元素不存在，函数返回null：

SELECT json_array_get（'【】'， 0）; --选项内容为空
SELECT json_array_get（'【"a", "b", "c"】'， 10）; --为空字符串
SELECT json_array_get（'【"c", "b", "a"】'， -10）; --为空字符串


**json\_array\_length(json)** -\> <数组长度> <数组长度> <字符串长度> <字符串长度> <字符串长度> <字符串长度> - <字符串长度> <字符串长度> - <字符串长度> <字符串长度> - <字符串长度> <字符串长度> <字符串长度> <字符串长度> <字符串长度> <字符串长度> <字符串长度> >

返回`json`（一个包含JSON数组的字符串）的数组长度：

SELECT json_array_length（'【1,2,3】'）；数组数组数组的长度，数组的长度，数组的长度，数组的长度。


**json\_extract(json, json\_path)** -\> json

计算`json`（一个包含JSON的字符串）上的类[JSONPath]()表达式`json_path`，并以JSON字符串的形式返回结果：

SELECT json_extract（json, '$.store.book'）；

**json\_extract\_scalar(json, json\_path) <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> > > >

类似于`json_extract，但将结果值作为字符串返回（而不是编码为JSON）。`json_path`引用的值必须是标量(boolean、number或
字符串)：

SELECT json_extract_scalar（'【1, 2, 3】'， '$[2]'）；
SELECT json_extract_scalar（json, '$.store.book[0].author'）；


**json\_format(json)** -\> varchar

返回从输入JSON值序列化的JSON文本。这是`json_parse`的反函数：

SELECT json_format（JSON '【1,2,3】'）; -- '【1,2,3】'，表示选择指定的json数据格式，其中，
SELECT json_format（JSON '"a"'）; -- '"a"'


**说明**

`json_format和`CAST(json AS VARCHAR)`在语义上完全不同。

`json_format将输入的JSON值序列化为符合`7159的JSON文本。JSON值可以是JSON对象、JSON数组、JSON字符串、JSON数字、`true`、`false`或`null`：

SELECT json_format（JSON '{"a": 1, "b": 2}'）; -- '{"a":1,"b":2}'
SELECT json_format（JSON '【1,2,3】'）; -- '【1,2,3】'，表示选择指定的json数据格式，其中，
SELECT json_format（JSON '"abc"'）; -- '"abc"'
SELECT json_format（JSON '42'）; -- '42'
SELECT json_format（JSON 'true'）; -- 'true'
SELECT json_format（JSON '空'）; -- '空'，表示从源数据中选取数据。

`CAST(json AS VARCHAR)`将JSON值转换为对应的SQL VARCHAR值。对于JSON字符串、JSON编号、`true`、`false`或`null`，强制转换行为与对应的SQL类型相同。JSON对象和JSON数组不能转换为VARCHAR：

SELECT CAST（JSON '{"a": 1, "b": 2}' AS VARCHAR）; --错误，返回此错误码。
SELECT CAST（JSON '【1,2,3】' AS VARCHAR）; --错误!（中文意思）
SELECT CAST（JSON '"abc"' AS VARCHAR）; -- 'abc'；注意双引号已经去掉了
SELECT CAST（JSON '42' AS VARCHAR）; -- '42'
SELECT CAST（JSON 'true' as VARCHAR）; -- 'true'，表示对字符串进行选择操作。
SELECT CAST（以JSON 'null' as VARCHAR）; --字符串类型NULL表示查询字符串

**json\_parse(string)【字符串】** -\> json <字符串> <字符串> <字符串> <字符串> <字符串> <字符串> <字符串> <字符串>

返回从输入JSON文本反序列化的JSON值。这是`json_format`的反函数：

SELECT json_parse（'【1,2,3】'）; -- json格式字符串'【1,2,3】'，表示从源数据中解析出目标数据。
SELECT json_parse（'"abc"'）; -- json格式字符串'"abc"'，其中abc为字符串类型。


**说明**

`json_parse`和`CAST(string AS JSON)`在语义上完全不同。

`json_parse`期望一个符合`7159`{.interpreted-text role="rfc"}的JSON文本，并返回该JSON文本。
从JSON文本反序列化的值。JSON值可以是JSON对象、JSON数组、JSON字符串、JSON数字、`true`、`false`或`null`：

选择json_parse（'not_json'）;--错误！
SELECT json_parse（'【"a": 1, "b": 2】'）; --JSON '【"a": 1, "b": 2】'，表示选择从指定的地址进行解析的JSON字符串。
SELECT json_parse（'【1,2,3】'）; -- json格式字符串'【1,2,3】'，表示从源数据中解析出目标数据。
SELECT json_parse（'"abc"'）; -- json格式字符串'"abc"'，其中abc为字符串类型。
SELECT json_parse（'42'）; -- json格式字符串'42'，表示选择解析json文件。
SELECT json_parse（'true'）; -- json格式字符串'true'，表示选择解析的json格式字符串。
SELECT json_parse（'null'）; -- json格式字符串'null'，表示选择解析的空字符串。

`CAST(string AS JSON)`以任意VARCHAR值作为输入，返回一个JSON字符串，其值设置为input string：

SELECT CAST（'not_json' AS JSON）; -- '' json'，表示选择的是json格式，而不是json格式。
SELECT CAST（'["a": 1, "b": 2]' AS的JSON）; -- JSON '"[\"a\"": 1, \"b\": 2]"'，（其中a为数字，b为数字，b为数字）为数字，2为数字，2为数字。
SELECT CAST（'【1,2,3】' AS JSON）; -- JSON '"【1,2,3】"'，表示选择应用服务器的JSON格式。
SELECT CAST（'"abc"' AS JSON）; -- ''JSON'"\"abc\""'，表示选择字符串为字符串类型。
SELECT CAST（'42' AS JSON）; -- JSON '"42"'
SELECT CAST（'true' AS JSON）; -- JSON '"true"'
SELECT CAST（'null' AS JSON）; -- JSON '"null"'


**json\_size(json, json\_path)** -\> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径> <路径>

与`json_extract`类似，但返回值的大小。对于对象或数组，size为成员数，而标量值的大小为零：

SELECT json_size（'{"x": {"a": 1, "b": 2}}'， '$.x'）; -- 2
SELECT json_size('{"x"：
SELECT json_size（'{"x": {"a": 1, "b": 2}}'， '$.x.a'）; -- 0

