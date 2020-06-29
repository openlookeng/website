地图功能及操作符
===========================

下标操作符：\[\]
------------------------

`[]`运算符用于从映射中检索给定键对应的值：

SELECT名称_to_age_map【'Bob'】应用服务器bob_age；

地图功能
-------------

**心率(x)** -\> bigint

返回map`x`的基数（大小）。



**元素\_at(map(K,V), key)** -\> V元素

返回给定`key`的值，如果key没有包含在map中，则返回`NULL`。


**map()** -\> map\<未知，未知\>

返回空的map。：

SELECT映射();--{}


**map(array(K), array(V))** -\>映射（K,V）映射方式

返回使用给定的key/value数组创建的map。：

选择地图(ARRAY[1, 3], ARRAY[2, 4]);--{1->2,3->4}

创建聚合映射的操作请参见`map_agg`和`multimap_agg`。

**map\_from\_entries(array(row(K,V)))** -\>映射（K,V） ，其中数组表示K行，数组表示V行。

返回从给定的条目数组创建的映射。：

SELECT map_from_entries（ARRAY【(1, 'x'）, （2, 'y'）)); -- {1-> 'x'， 2-> 'y'} <源索引> <源索引> <目的索引> <目的索引> <目的索引> <源索引> <源索引> <源索引> <源索引> <源索引路径> <源索引> <源索引路径>

**multimap\_from\_entries（数组(行(K,V）))** -\>映射（K，数组(V）)

返回从给定的条目数组创建的多映射。每个键可以关联多个值。：

SELECT multimap_from_entries（ARRAY【(1，'x'）,（2，'y'）,（1，'z'）)); -- {1 ->【'x'， 'z'】， 2 ->【'y'】}，从左到右，从左到右，从左到右依次为：

**map\_entries(map(K,V))** -\>数组(row(K,V)) ，表示映射的表项。

返回给定映射中所有项的数组。：

SELECT map_entrys（MAP(ARRAY【1,2】， ARRAY【'x'， 'y'】）); --【行号（1, 'x'），行号（2, 'y'）】，行号（x, 'y'），行号（x, 'y'）) ，

**map\_concat(map1(K,V), map2(K,V), \..., mapN(K,V))** -\> map(K,V)

返回所有给定映射的并集。如果在多个给定映射中找到一个键，则最终映射中的键值来自这些映射中的最后一个。

**map\_filter(map(K,V)，函数(K,V,boolean))** -\> map(K,V)函数的关键字

从`函数`返回true的`map`的条目构造一个map：

SELECT map_filter(MAP(ARRAY[], ARRAY[]),(k, v) ->匹配关系标志，即匹配关系)-->true;--{}
SELECT map_filter（MAP(ARRAY[10, 20, 30], ARRAY【'a'， NULL, 'c'】）, (k, v) -> v是否为空) ; -- {10-> a, 30-> c}，即表示从源到目的的映射集合中选择一个。
SELECT map_filter（MAP(ARRAY【'k1'， 'k2'， 'k3'】， ARRAY【20, 3, 15】）, (k, v) -> v > 10), -- {k1 -> 20, k3->15}


**map\_keys(x(K,V))** -\>数组（K） ，表示映射的密钥。

返回map`x`中的所有key。


map\_values(x(K,V))** -\>数组（V）数组的数组。

返回map`x`中的所有值。


**map\_zip\_with(map(K,V1), map(K,V2)，函数(K,V1,V2,V3))** -\> map(K,V3)，函数的编译方法为：

将两个给定的map合并成一个map，方法是对具有相同key的一对值应用`function`。对于只在一个映射中呈现的键，NULL将被传递作为缺失键的值。：

SELECT map_zip_with（MAP(ARRAY【1,2,3】， ARRAY【'a'， 'b'， 'c'】）, -- {1->广告，2->广告主，3->广告主},3->广告主
MAP（ARRAY【1,2,3】，ARRAY【'd'， 'e'， 'f'】），
(k, v1, v2) ->合同项（v1, v2）)；
SELECT map_zip_with（MAP('k1'， 'k2'], ARRAY【1,2】）, -- {k1-> ROW(1, null), k2-> ROW(2, 4), k3 -> ROW（空值，9）}
MAP（ARRAY【'k2'， 'k3'】， ARRAY【4, 9】），
(k, v1, v2) -> (v1, v2) ，即从第1个版本到第2个版本。
SELECT map_zip_with（MAP('a'， 'b'， 'c'], ARRAY【1, 8, 27】）, -- {a-> a1, b-> b4, c-> c9}，即从左向右的顺序排列，即从左向右的顺序排列)
MAP（ARRAY【'a'， 'b'， 'c'】， ARRAY【1,2,3】），
(k, v1, v2) -> k || CAST(v1/v2 AS VARCHAR) <idp:styler/> <idp:styler/> <idp:styler/> <idp:styler/> <idp:styler/> <idp:<idp:styler/> <idp:styler idp:style> <id:<id:style> <id:<id:/> <id:/>重新生成的字符串中指定的字符串中指定的字符串的字符，重新编码。


**transform\_keys(map(K1,V), function(K1,V,K2))** -\>地图（K2,V）转换函数，转换函数，转换函数，转换函数

返回一个将`function`应用到`map`的每个条目的映射，并转换键：

选择变换键(MAP(ARRAY[], ARRAY[]), (k, v) -> k + 1);--{}
SELECT变换_keys（MAP(ARRAY【1,2,3】， ARRAY【'a'， 'b'， 'c'】）,(k, v) -> k + 1); -- {2 -> a, 3 -> b, 4=>c}
SELECT transform_keys（MAP('a'， 'b'， 'c'], ARRAY【1,2,3】）, (k, v) -> v * v); --{1->1,4->2,9->3}，表示从第1次开始，第3次开始。
SELECT变换_keys（MAP(ARRAY【'a'，'b'】， ARRAY【1,2】）,(k, v) -> k|| CAST(v as VARCHAR)); -- {a1->1,b2->2}（注意：这里的v是可变的，不是可变的）
SELECT变换关键字(MAP(ARRAY[1, 2],ARRAY[1.0,1.4]),--{1->1.0,2->1.4})
(k, v) -> MAP（ARRAY【1,2】， ARRAY【'1'， '2'】）【k】)；


**transform\_values(map(K,V1)，函数(K,V1,V2))** -\>映射（K,V2）转换函数

返回一个将`function`应用到`map`的每个条目的映射，并转换值：

选择变换值(MAP(ARRAY[], ARRAY[]), (k, v) -> v + 1);--{}
SELECT变换值(MAP(ARRAY[1,2,3], ARRAY[10,20,30]),(k,v)->v+k);--{1,2,22,3,33}，表示从第1次变换到第2次变换到第3次变换。
SELECT变换值（MAP(ARRAY【1,2,3】， ARRAY【'a'， 'b'， 'c'】）,(k, v) -> k * k);--{1->1,2->4,3->9}，表示从第1次变换到第9次变换的值。
SELECT变换_values（MAP(ARRAY【'a'， 'b'】， ARRAY【1,2】）, (k, v) -> k || CAST(v as VARCHAR)), -- {a-> a1, b->b2 }命令
选择变换值(MAP(ARRAY[1, 2], ARRAY[1.0, 1.4]), -- {1->一个1.0, 2->两个1.4}
(k,v) -> MAP（ARRAY【1,2】，ARRAY【'1'，'2'】）[k]|| '_' || CAST(v AS VARCHAR))，将消息发送到指定的地址进行处理。

