逻辑运算符
=================

逻辑运算符
-----------------

|操作符|说明|示例|
| :------- | :--------------------------- | :------ |
| `AND` |如果两个值都为真，则为真| a AND b |
| `OR` |两个值任意一个为真，就为真| a or b |
| `NOT` |值为false时为true | not a |

NULL对逻辑运算符的影响
-----------------------------------

`AND`比较的结果，如果表达式的一边或两边都为`NULL`，则结果可能为`NULL`。如果`AND`运算符至少有一边为`FALSE`，则表达式的计算结果为`FALSE`：

SELECT CAST(null as boolean)and true表示将字符串作为布尔值； -- null
    
SELECT CAST（将空值作为布尔值）and false; -- false
    
SELECT CAST（将空值作为布尔值） and CAST（将空值作为布尔值）; -- null

`OR`比较的结果，如果表达式的一边或两边都为`NULL`，则结果可能为`NULL`。如果`OR`运算符至少有一边为`TRUE`，则表达式的计算结果为`TRUE`：

SELECT CAST（将空值作为布尔值） or CAST（将空值作为布尔值）; -- null
    
SELECT CAST（将空值作为布尔值） or false; -- null
    
SELECT CAST（以布尔形式选择空值） or true; -- true

下面的真值表演示了`AND`和`OR`中`NULL`的处理：

 

| a|b|a和b|a或b|
| :------ | :------ | :------ | :------ |
|是|是|是|是|是|是|是
|是|是|是|是|是
| `TRUE` | `NULL` | `NULL` | `TRUE` <时钟优先级> |时钟优先级
|假的|假的|假的|假的|假的|假的|假的
假的假的假的假的假的
| `FALSE` | `NULL` | `FALSE` | `NULL` <时钟类型> <时钟类型> <时钟类型>
| `NULL` | `TRUE` | `NULL` | `TRUE` <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/> <b/c/> <
| `NULL` | `FALSE` | `FALSE` | `NULL` |
| `NULL` | `NULL` | `NULL` | `NULL` |

 

`NULL`的逻辑补码为`NULL`，如下例所示：

SELECT NOT CAST（将空值作为布尔值）; -- null

下面的真值表演示了对`NOT`中的`NULL`的处理：

不是
| :------ | :------ |
|正确| |错误|
假的假的假的
| `NULL` | `NULL` |
