正则表达式函数
============================

所有的正则表达式函数都使用【Javapattern】（）语法，但有一些值得注意的例外：

-使用多行模式（通过`(?m）`标志启用)时，仅`\n`被识别为行结束符。此外，`(?d)`标志不支持，也不得使用。
-不区分大小写的匹配（通过`(?i）`标记启用)始终以Unicode感知的方式执行。但不支持上下文敏感匹配和本地敏感匹配。此外，"(?u)"
flag不支持，不能使用。
-不支持代理对。例如，`\uD800\uDC00`不作为`U+10000`处理，必须指定为`\x{10000}`。非间隔标记的边界（`\b`）处理不正确
不带基本字符。
-字符类（如`[A-Z123]`）不支持`\Q`和`\E`，而是将它们视为文字。
-支持Unicode字符类（`\p{prop}`） ，但存在以下差异：
-名称中的下划线必须全部去掉。例如，使用`OldItalic`代替`Old_Italic`。
-必须直接指定脚本，不能带`Is`、`script=`或`sc=`前缀。示例：`\p{Hiragana}`
-必须以`In`前缀指定块。不支持`block=`和`blk=`前缀。示例：`\p{蒙古文}`
-必须直接指定类别，而不使用`Is`、`general_category=`或`gc=`前缀。示例：`\p{L}`
-二进制属性必须直接指定，不能带`is`。示例：`\p{非字符编码点}`

**regexp\_extract\_all（字符串，模式）** -\>数组(varchar)

返回匹配`string`中`pattern`正则表达式的子字符串：

SELECT regexp_extract_all（'1a 2b 14m'， '\d+'）; --【1,2,14】，表示从第1条数据中抽取数据。

**regexp\_extract\_all（字符串，模式，组）** -\>数组(varchar)

在`string`中查找所有出现正则表达式`pattern`的地方，并返回【捕获组号】() `group`：

SELECT regexp_extract_all（'1a 2b 14m'， '(\d+）（【a-z】+）'， 2); --【'a'， 'b'， 'm'】； --正则表达式，字符串，字符串，字符串，字符串

**regexp\_extract（string，模式）** -\> varchar <字符串> <字符串> <字符串> <模式> <字符串> <字符串> <字符串> <模式> <字符串> <字符串> <模式> <字符串> <模式> <字符串> - > varchar <字符串>

返回`string`中匹配正则表达式`pattern`的第一个子字符串：

SELECT regexp_extract（'1a 2b 14m'， '\d+'）; -- 1

**regexp\_extract（字符串，模式，组）** -\> varchar

在`string`中找到正则表达式`pattern`的第一个匹配项，并返回【捕获组号】() `group`：

SELECT regexp_extract（'1a 2b 14m'， '(\d+）（【a-z】+）'， 2); -- 'a'

**regexp\_like（字符串，模式）** -\>布尔值

计算正则表达式`pattern`，并判断它是否包含在`string`中。

这个函数与`LIKE`操作符类似，只是模式只需要包含于`string`中，而不需要匹配`string`的所有内容。换句话说，它执行一个*contains*操作
而不是*match*操作。可以通过使用`^`和`$`锚定模式来匹配整个字符串：

SELECT regexp_like（'1a 2b 14m'， '\d+b'）; -- <用户名> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码> <密码>的输入>的随机码值


**regexp\_replace（string，模式）** -\> varchar <字符串> <字符串> <字符串> <模式> <字符串> <字符串> <字符串> <模式> <字符串> <字符串> <模式> <字符串> <字符串> -<字符串> <模式> <字符串> -<字符串> varchar <字符串>

从`string`中移除匹配正则表达式`pattern`的子字符串的每个实例：

SELECT regexp_replace（'1a 2b 14m'， '\d+[ab] '）; -- '14m'

**regexp\_replace（字符串，pattern，替换）** -\> varchar（字符串，模式，替换）

将`string`中的`pattern`正则表达式匹配的所有子字符串实例替换为`replacement`。【捕获组】（）可以用`$g`表示编号，在`replacement'中引用。
group或者`${name}`，表示一个命名的组。替换时，可以用反斜杠（`\$`）转义，从而包含一个美元符号（`$`） ：

SELECT regexp_replace（'1a 2b 14m'， '(\d+）（[ab]） '， '3c$2'); -- '3ca 3cb 14m'， '1a 2b 14m'， '(d+)([ab]) '， 3c$2 '， <用户名>替换规则名称，输入值，输入值，输入值。

**regexp\_replace（字符串，模式，函数）** -\> varchar

使用函数`function`替换`string`中`pattern`正则表达式匹配的所有子字符串实例。使用`lambda表达式<lambda>`{.interpreted-text role="doc"} `函数`为
调用每个匹配，以数组形式传递【捕获组】（）。捕获组编号从1开始；整个匹配中没有组(如果需要，在整个表达式中用
括号)。

SELECT regexp_replace（'new york'， '(\w）（\w*）'， x ->上半部(x[1]) ||下半部(x[2])); --'纽约'，


**regexp\_split（字符串，模式）** -\>数组(varchar)

使用正则表达式`pattern`对`string`进行拆分，并返回一个数组。保留尾随空字符串：

SELECT regexp_split（'1a 2b 14m'， '\s*[a-z]+\s*'）; --【1,2,14，】，将两个参数进行分割，分割后，将两个参数进行替换。

