二进制函数和运算符
==============================

二元运算符
----------------

`||`运算符执行串联。

二进制函数
----------------

**长度（二进制）** -\> bigint

以字节为单位返回`binary`的长度。

**concat（二进制1,\...，二进制N）** -\> varbinary（二进制文件）

返回`binary1`,`binary2`,`...`,`binaryN`的拼接方法。此函数提供与SQL标准串联运算符（`||`）相同的功能。

**substr（二进制，start）** -\> varbinary（二进制文件）

返回从起始位置`start`开始的`binary`的其余部分，以字节为单位。职位以`1`开头。负的起始位置被解释为相对于字符串的结尾。

**substr（二进制，起始，长度）** -\> varbinary

从起始位置`start`开始返回长度为`length`的`binary`的子字符串，以字节为单位。职位以`1`开头。负的起始位置被解释为相对于末端
字符串的。

**to\_base64（二进制）** -\> varchar（二进制）

将`binary`编码为base64字符串表示形式。

**from\_base64(string)** -\> varbinary

从base64编码的`string`中解码二进制数据。

**to\_base64url（二进制）** -\> varchar（中文字符）

使用URL安全字母表将`binary`编码为base64字符串表示形式。


**from\_base64url(string)** -\>变量二进制形式

使用URL安全字母表从base64编码的`string`中解码二进制数据。

**to\_hex（二进制）** -\> varchar（字符串）

将`binary`编码为十六进制字符串表示形式。

**from\_hex(string)** -\>变量二进制形式

从十六进制编码的`string`中解码二进制数据。

**to\_big\_endian\_64(bigint)** -\>变量二进制格式

将`bigint`编码为64位2的补码大端格式。

**from\_big\_endian\_64（二进制）** -\>宏定义

从64位2的补码big endian`binary`中解码出`bigint`值。

**to\_big\_endian\_32（整型）** -\> varbinary（二进制变量）

将`integer`编码为32位2的补码大端。

from\_big\_endian\_32（二进制）** -\>整数类型

从32位2的补码big endian`binary`中解码出`integer`值。


**to\_ieee754\_32（实名）** -\> varbinary（二进制形式）

将`real`按照IEEE 754单精度浮点数格式编码为32位大端二进制。


**from\_ieee754\_32（二进制）** -\>实名认证

解码IEEE 754单精度浮点数格式的32位大端`binary`。


**to\_ieee754\_64(double)** -\>变量二进制格式

按照IEEE 754双精度浮点数格式，将`double`编码为64位大端二进制。


**from\_ieee754\_64（二进制）** -\>加倍显示

解码IEEE 754双精度浮点格式的64位大端`binary`。

**lpad（二进制，大小，垫二进制）** -\> varbinary

左垫`二进制`到`大小`字节与`padbinary`。如果`size`小于`binary`的长度，结果将被截断为`size`个字符。size不能为负数，padbinary不能为空。


**rpad（二进制，大小，padbinary）** -\>变量二进制

右填充`二进制`到`大小`字节`padbinary`。如果`size`小于`binary`的长度，结果将被截断为`size`个字符。size不能为负数，padbinary不能为空。

**crc32（二进制）** -\> bigint

计算`binary`的CRC-32校验。对于一般目的的散列，使用`xxhash64`，因为它更快，并产生更好的质量散列。

**md5（二进制）** -\> varbinary

计算`binary`的md5哈希值。


**sha1（二进制）** -\> varbinary（二进制）

计算`binary`的sha1哈希值。


**sha256（二进制）** -\> varbinary（二进制）

计算`binary`的sha256哈希值。


**sha512（二进制）** -\> varbinary（二进制）

计算`binary`的sha512哈希值。


**xxhash64（二进制）** -\> varbinary（二进制文件）

计算`binary`的xxhash64哈希值。


**spooky\_hash\_v2\_32（二进制）** -\>变量二进制

计算`binary`的32位SpookyHashV2哈希值。


**spooky\_hash\_v2\_64（二进制）** -\>变量二进制

计算`binary`的64位SpookyHashV2哈希。


**hmac\_md5（二进制，密钥）** -\> varbinary（二进制文件）

使用给定的`key`，用`binary`的md5值计算HMAC。


**hmac\_sha1（二进制，密钥）** -\> varbinary

用`binary`的sha1和给定的`key`计算HMAC。


**hmac\_sha256（二进制，密钥）** -\> varbinary（二进制文件）

使用给定的`key`，用`binary`的sha256计算HMAC。


**hmac\_sha512（二进制，密钥）** -\> varbinary（二进制文件）

用`二进制`的sha512和给定的`密钥`计算HMAC。

