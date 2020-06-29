字符串函数和运算符
==============================

字符串运算符
----------------

`||`运算符执行串联。

字符串函数
----------------

**说明**

这些函数假定输入字符串包含有效的UTF-8编码的Unicode代码点。没有对有效的UTF-8进行显式检查，函数在无效的UTF-8上可能返回错误结果。
可以使用`from_utf8`纠正无效的UTF-8数据。

此外，函数在Unicode编码点上操作，而不是在用户可见的*字符*（或*grapheme簇*）上操作。
一种语言的书写系统的单元，但是函数将把每个代码点作为一个单独的单元。

`lower`和`upper`函数不执行某些语言所需的区域、上下文或一对多映射。

具体而言，这将返回立陶宛语、土耳其语和阿塞拜疆语的不正确结果。

**chr(n)** -\> varchar

以单个字符串的形式返回Unicode编码点`n`。

**codepoint(string)** -\>整数类型

返回`string`唯一字符的Unicode编码点。

**concat(string1, \..., stringN)** -\> varchar

返回`string1`,`string2`,`...`,`stringN`的拼接字符串。此函数提供与SQL标准串联运算符（`||`）相同的功能。

**hamming\_distance（字符串1，字符串2）** -\> bigint <字符串1> <字符串2>

返回`string1`和`string2`的汉明距离，即对应字符不同的位置个数。

注意事项
两个字符串的长度必须相等。


长度（字符串） -\> bigint

以字符形式返回`string`的长度。


**levenshtein\_distance（字符串1，字符串2）** -\> bigint（字符串）

返回`string1`和`string2`的Levenshtein编辑距离，即将`string1`更改为`string2`所需的单字符编辑（插入、删除或替换）的最小次数。

**lower(string)** -\> varchar

将`string`转换为小写。

**lpad（字符串，大小，padstring）** -\> varchar

左垫`字符串`到`大小`字符`与`字符串`。如果`size`小于`string`的长度，结果将被截断为`size`个字符。size不能为负数，padstring不能为空。

**ltrim(string)** -\> varchar

去掉`string`中的前导空格。

**replace（string，搜索）** -\> varchar（替换后的字符串）

从`string`中移除`search`的所有实例。

**替换（字符串，搜索，替换）** -\> varchar

将`search`的所有实例替换为`string`中的`replace`。


**反向（字符串）** -\> varchar

返回字符串`string`，字符顺序颠倒。

**rpad(string,size,padstring)** -\> varchar（字符串类型）

右垫`字符串`到`大小`字符`与`字符串`。如果`size`小于`string`的长度，结果将被截断为`size`个字符。size不能为负数，padstring不能为空。

**rtrim(string)** -\> varchar

从`string`中删除尾随的空白。

split（string，分隔符） -\>数组(varchar)

在`delimiter`上拆分`string`，返回一个数组。

split（字符串，分隔符，limit） -\>数组(varchar)

在`delimiter`上拆分`string`，并返回一个大小为`limit`的数组。数组中的最后一个元素总是包含`string`中剩下的所有内容。`limit`必须是正数。

split\_part（字符串，分隔符，索引）** -\> varchar

将`string`拆分到`delimiter`上，返回字段`index`。字段索引以`1`开头。如果索引大于字段数，则返回null。

**split\_to**\_map（string，条目分隔符，keyValue分隔符） -\>映射\<varchar, varchar\>

将`string`按`entryDelimiter`和`keyValueDelimiter`进行分割，返回一个map。`entryDelimiter`将`string`分割成键值对。

`keyValueDelimiter`将每一对分割成key和value。

split\_to\_multimap（字符串类型，输入分隔符，keyValue分隔符） -\> map（varchar，数组类型(varchar）)

将`string`按`entryDelimiter`和`keyValueDelimiter`拆分，并返回一个map，其中包含每个唯一键的值数组。

`entryDelimiter`将`string`分割成键值对。`keyValueDelimiter`将每一对分割成key和value。每个键的值将按照它们在`string`中出现的顺序排列。

**strpos（string，子串）** -\> bigint（大字符串）

返回`string`中`substring`的第一个实例的起始位置。职位以`1`开头。如果未找到，则返回`0`。

**position（substring IN字符串）** -\> bigint（子串输入字符串）

返回`string`中`substring`的第一个实例的起始位置。职位以`1`开头。如果未找到，则返回`0`。

**substr(string, start)** -\> varchar

从起始位置`start`返回`string`的其余部分。
职位以`1`开头。负的起始位置被解释为相对于字符串的结尾。

**substr(string, start, length) <字符串长度> <字符串长度> <字符串长度> <字符串长度> <字符串长度> <字符串长度> <字符串长度> -\> varchar

返回从起始位置`start`开始的长度为`length`的`string`string`的子字符串。职位以`1`开头。负的起始位置被解释为相对于字符串的结尾。

**trim（字符串）** -\> varchar（字符串）

从`string`中去掉前导和尾随的空白。

**upper(string)** -\> varchar

将`string`转换为大写。

**word\_stem（单词）** -\> varchar <字符串> <字符串> <字符串> <字符串> <字符串>

返回英文单词'word'的词干。

**word\_stem(word, lang)** -\> varchar

返回`lang`语言中`word`的词干。


Unicode函数
-----------------

**normalize(string)** -\> varchar

转换`string`与NFC归一化形式。

**normalize（string，表单）** -\> varchar（字符串类型）

使用指定的规范化形式转换`string`。`form`必须是下列关键字之一：

|形式|说明|
| :----- | :----------------------------------------------------------- |
| `NFD' |标准分解|
| `NFC` |规范分解，然后是规范组合|
| `NFKD' |兼容性分解|
| `NFKC' |兼容性分解，然后是规范组合|

**说明**

这个SQL标准函数有特殊语法，要求指定`form`为关键字，而不是字符串。

**to\_utf8(string)** -\>变量二进制格式

将`string`编码成UTF-8的varbinary表示形式。

**from\_utf8（二进制）** -\> varchar（字符串）

从`binary`解码UTF-8编码的字符串。使用Unicode替换字符`U+FFFD`替换无效的UTF-8序列。

**from\_utf8（二进制，替换）** -\> varchar（字符串）

从`binary`解码UTF-8编码的字符串。将无效的UTF-8序列替换为`replace`。替换字符串`replace`必须是单个字符或空字符（在这种情况下是无效字符）
移除)。

