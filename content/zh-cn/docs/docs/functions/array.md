数组函数和运算符
=============================

下标操作符：\[\]
------------------------

`[]`操作符用于访问数组的一个元素，索引从1开始：

选择my_array[1]作为第一元素

级联操作符：\|\|
----------------------------

`||`运算符用于将数组与数组或相同类型的元素连接：

选择阵列[1]||阵列[2];--【1,2】
SELECT阵列[1]||2;--【1,2】选择阵列
SELECT 2||数组[1]; --【2,1】

数组函数
---------------

**array\_distinct(x)** -\>数组说明

去除数组`x`中的重复值。


**array\_intersect(x, y)**-\>数组说明

返回`x`和`y`交集中的元素数组，没有重复。


**array\_union(x, y)** -\>数组信息

返回`x`和`y`联合中的元素数组，不带
重复。


**array\_except(x, y)** -\>数组名称

返回`x`中的元素数组，但不返回`y`中的元素数组，不返回重复的元素。


**array\_join（x，分隔符，null\_replacement）** -\> varchar <字符串> <字符串>

使用分隔符和一个可选字符串连接给定数组的元素以替换空值。


**array\_max(x)** -\>数组元素

返回输入数组的最大值。


**数组\_min(x)** -\> x数组

返回输入数组的最小值。


**array\_position（x，元素）** -\> bigint（数组中的元素）

返回数组中第一个元素出现的位置。
`x`（如果没有找到，则为0）。


**array\_remove（x，元素）** -\>数组说明

移除数组`x`中所有等于`element`的元素。


**array\_sort(x)** -\>数组信息

排序并返回数组`x`。`x`的元素必须是有序的。空元素将被放在返回数组的末尾。

**array\_sort(array(T)，函数(T,T,int)) ** -\>数组（T）数组类型

根据给定的比较器`函数`对`array`进行排序并返回。比较国将采用两个可置空的论点，代表`数组`的两个可置空的要素。它返回-1、0或1作为第一个
可为空元素小于、等于或大于所述第二可为空元素。如果比较器函数返回其他值（包括`NULL`），则查询将失败并引发错误：

SELECT数组_sort（ARRAY【3,2,5,1,2】，(x,y） -> IF(x<y,1,IF(x=y,0,-1))); --【5,3,2,2,1】，以此类推，最终的排序结果如下：
SELECT array_sort（ARRAY【'bc'， 'ab'， 'dc'】， (x, y） -> IF(x < y, 1, IF(x = y, 0, -1)))); --【'dc'， 'bc'， 'dc'， 'ab'] ,（中文）
SELECT array_sort（ARRAY【3,2，空，5，空，1,2】， --空排序，降序排列）
(x, y) ->当x为空时-1
空当然后1
当x<y时1
当x=y时
ELSE -1 END); --【空值，空值，5,3,2,2,1】
SELECT array_sort(ARRAY【3,2,null,5,null,1,2】， --空值排序，最后按降序排列
(x, y) ->用例x为空则1
空当然后-1
当x<y时1
当x=y时
ELSE -1 END); --【5,3,2,2,1，空值，空值】
SELECT array_sort(ARRAY【'a'， 'abcd'， 'abc'】， --按照字符串长度排序
(x, y) -> IF（长度(x）<长度（y），
-1，
IF(length(x) = length(y), 0, 1))); --【'a'， 'abc'， 'abcd'】， <源标识符> <源标识符> <源标识符> <源标识符> <源标识符>
SELECT array_sort(ARRAY [2,3,1], ARRAY[4,2,1,4], ARRAY[1, 2]], --按数组长度排序，以数组长度排序
(x, y) -> IF（基数(x） <基数（y），
-1，
IF(cardinality(x)=cardinality(y), 0, 1))); --【【1,2】，【2,3,1】，【4,2,1,4】】，【4,2,1,4】，(共两个参数，一个参数，一个参数，一个参数，一个参数，一个参数，一个参数。


**arrays\_overlap(x, y)** -\>布尔值类型

测试数组`x`和`y`是否有共同的非空元素。如果common中没有非null元素，但两个数组中都包含null，则返回null。


**心率(x)** -\> bigint

返回数组`x`的基数（大小）。

**concat(array1, array2, \..., arrayN)** -\>数组表示数组的数组部分。

数组数组串接：array1`,`array2`,`...`,`arrayN`。此函数提供与SQL标准串联运算符（`||`）相同的功能。


**组合(array(T), n) -\>数组(array(T))**

返回输入数组的n元素子组。如果输入数组没有重复，`combinations`将返回n个元素子集：

SELECT组合条件（ARRAY【'foo'， 'bar'， 'baz'】， 2）; --【【'foo'， 'bar'】，【'foo'， 'baz'】，【'bar'， '巴斯']]
SELECT组合方式(ARRAY[1,2,3],2); --【[1,2】，【1,3】，【2,3】]
SELECT组合方式(ARRAY[1,2,2],2);--【[1,2】，[1, 2],[2, 2]]，即选择条件

子群的次序是确定的，但未具体说明。子群中元素的次序，确定性，但未具体说明。`n`不能大于5，生成的子组总大小必须小于100000。


**包含（x，元素） -\>布尔**

如果数组`x`包含`元素`，则返回true。


**元素\_at(array(E), index)** -\> E（数组元素）

在给定的`index`处返回`array`的元素。如果`index` \> 0 ，则此函数与SQL标准的下标操作符（`[]`）具有相同的功能；如果`index` \< 0 ，则`element_at`从最后一个元素开始访问。

**filter(array(T)，函数(T,boolean))** -\>数组（T）数组类型

从`array`中`function`返回true的元素构造一个数组：

SELECT筛选器(ARRAY [],x -> true); -- []筛选器
SELECT过滤器（ARRAY[5, -6, NULL, 7], x -> x > 0） ，表示从0开始的连续跟踪。； -- [5, 7]
SELECT过滤器（ARRAY【5，空，7，空】，x->x，即非空）; -- [5, 7]


**flatten(x)** -\>数组说明

通过连接包含的数组将`array(array(T))`扁平化为`array(T)`。

**ngrams(array(T), n)** -\>数组(array(T)) <数组名称> <数组大小> <数组大小> <数组大小> <数组大小> <数组大小> <数组大小> <数组大小> <数组大小> <数组大小> <数组大小> <数组大小> <数组大小> <数组大小> <数组大小>

返回`数组`的`n`元（相邻`n`元素的子序列）。结果中`n`字的次序不详：

SELECT ngrams（'foo'， 'bar'， 'baz'， 'foo'], 2）; --【【'foo'， 'bar'】，【'bar'， 'baz'】，【'baz'， 'foo'】]，【巴兹'， 'foo'， 'foo'， 'baz'， 'foo'， 'foo'， 'baz'， 'foo'， 'foo'， 'baz'， '， 'baz'， '， '， '， '， '， ' '， ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' '
SELECT ngrams（ARRAY【'foo'， 'bar'， 'baz'， 'foo'】， 3）; --【【'foo'， 'bar'， 'baz'】，【'bar'， 'baz'， 'foo'】]
SELECT ngrams（'foo'， 'bar'， 'baz'， 'foo'], 4）; --【【'foo'， 'bar'， 'baz'， 'foo'】】（中文全称，英文全称，英文全称，英文全称）
SELECT ngrams（ARRAY【'foo'， 'bar'， 'baz'， 'foo'】， 5）; --【【'foo'， 'bar'， 'baz'， 'foo'】】（中文全称，英文全称，英文全称）
SELECT语法(ARRAY[1,2,3,4],2);--【【1,2】，【2,3】，【3,4】】，即从第几个语法包开始。

**reduce(array(T)，初始状态S，输入函数（S,T,S），
输出函数(S,R)** -\> R

返回从`array`中减少的单个值。`inputFunction`将按顺序调用`array`中的每个元素。除了接受元素，`inputFunction`还接受当前状态，最初是`initialState`，并返回新的状态。调用`outputFunction`将最终状态转化为结果值。可能是身份函数（`i -> i`） ：

选择减少(ARRAY [], 0, (s, x) -> s + x, s -> s); -- 0
SELECT decrease（阵列[5, 20, 50], 0, (s, x） -> s + x, s -> s) ，即选择减少的阵列数量； -- 75
选择减少(ARRAY[5, 20, NULL, 50], 0,(s, x) -> s + x, s -> s); -- NULL
选择减少（ARRAY【5,20,NULL,50】，0,(s,x）->s+COALESCE(x,0),s->s); -- 75（百分比）
选择减少（ARRAY【5,20,NULL,50】，0,(s,x） -> IF(x IS NULL,s,s + x),s -> s); -- 75（百分比）
SELECT decrease(ARRAY [2147483647, 1], CAST (0 AS BIGINT),(s, x) -> s + x, s -> s) ，表示对当前呼叫进行降序排列； -- 2147483648
选择减少(ARRAY [5, 6, 10, 20], --计算算术平均数： 10.25
CAST（按行(0.0,0）,AS ROW（双值，整数）)，
(s,x) -> CAST(ROW(x+s.sum, s.count+1)和AS ROW（两个值之和，算整数）)，
s -> IF(s.count = 0, NULL, s.sum / s.count) ；连续出现次数（连续出现次数）


**repeat（元素， count）** -\>数组

重复`element`元素`count`次。


**reverse(x)** -\>数组说明

返回一个数组，其数组`x`顺序颠倒。


**sequence（启动，停止）** -\>数组(bigint)

生成从`start`到`stop`的整数序列，如果`start`小于等于`stop`，则递增`1`，否则递增`-1`。

**sequence（启动，停止，步骤）** -\>数组(bigint)

生成从`start`到`stop`的整数序列，以`step`递增。

**sequence（开始，停止）** -\>数组（日期）

生成从“开始日期”到“结束日期”的序列，如果“开始日期”小于或等于“结束日期”，则递增“1”天，否则递增“1”天。

**sequence（开始，停止，步骤）** -\>数组（日期）

生成从`start`到`stop`的一系列日期，按`step`递增。step的类型可以是`隔天到第二天'，也可以是`隔年到月'。

**sequence(start,stop,step)** -\>数组（时间戳）

生成从`start`到`stop`的时间戳序列，以`step`递增。step的类型可以是`隔天到第二天'，也可以是`隔年到月'。


**shuffle(x)** -\>数组说明

生成给定数组`x`的随机置换。

**slice(x, start, length)** -\>数组，其中：

长度为`length`的子集数组`x`从索引`start`开始（如果`start`为负数，则从末尾开始）。

**变换（array(T），函数(T,U))** -\>数组(U)

返回一个数组，该数组是向`array`中的每个元素应用`function`的结果：

SELECT变换（数组[],x->x+1）;--[]
SELECT变换(ARRAY[5, 6], x->x+1);--[6, 7]，即从左到右的顺序变换。
SELECT变换(ARRAY[5, NULL, 6], x -> COALESCE(x, 0)+1)进行运算；--[6, 1, 7]进行运算
SELECT变换（ARRAY【'x'， 'abc'， 'z'】， x -> x || '0'）; --【'x0'， 'abc0'， 'z0'】， 'abc0'， 'z0'], 'abc0'， 'abc0'， 'x0'， 'x0''， '， '， '， '， '， '， '， ' ' ''， ''' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' '
SELECT变换（ARRAY [1, NULL, 2], ARRAY[3, NULL]], a ->过滤器(a, x -> x是否非空）); -- [[1, 2], [3]]

**zip（array1, array2\【， \...\】）** -\>数组（行）格式，其中：

将给定的数组按元素方式合并到单个行数组中。第N个参数的第M个元素将作为第M个输出元素的第N个字段。如果参数的长度不均匀，则丢失值
填充为`NULL`。：

SELECT zip（ARRAY【1,2】， ARRAY【'1b'， null, '3b'】）; --【ROW（1, '1b'）, ROW(2, null), ROW（null, '3b'）】，行号（空行号），行号， '3b')，行号（空行号），行号


**zip\_with(array(T)**,array(U)，函数(T,U,R)) -\>数组（R）压缩后的文件名

使用`函数`将两个给定数组按元素方式合并成一个数组。如果一个数组比较短，在应用`函数`之前，会在末尾添加null以匹配较长数组的长度：

SELECT zip_with（ARRAY【1,3,5】， ARRAY【'a'， 'b'， 'c'】，(x,y） -> (y,x)), --【ROW（'a'，1）,（行号）】， ROW（'b'， 3）, ROW（'c'， 5）) ，表示按指定范围搜索
SELECT zip_with(ARRAY[1, 2], ARRAY[3, 4], (x, y) -> x + y) ; -- [4, 6]，选择所有选中的压缩文件，选择所有需要压缩的压缩文件。
选择zip_with（ARRAY【'a'， 'b'， 'c'】， ARRAY【'd'， 'e'， 'f'】， (x, y） -> concat(x, y)); --【'ad'， 'be'， 'cf'】
SELECT zip_with（ARRAY【'a'】， ARRAY【'd'， null, 'f'】， (x, y） -> coalesce(x, y)); --【'a'， null, 'f'】， 'f'】， 'a'， 'a'， '表示从源数据中选取一个数据，然后从源数据中取出数据。

