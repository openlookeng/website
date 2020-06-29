ALTER表格
===========

摘要
--------

"```{.none}"
表名重命名为new_name
ALTER表名ADD COLUMN列名data_type【注释】【WITH（property_name =表达式[,...】）】
表名DROP COLUMN列名_name
表名RENAME列名to new_column_name列名
```

问题描述
-----------

更改现有表的定义。

示例
--------

将表`users`重命名为`person`：

改变表使用者对人的称呼；

在表`users`中增加一列`zip`：

表用户添加压缩文件；

从`users`表中删除`zip`列：

表格用户落栏拉链；

将`users`表中的`id`列重命名为`user_id`：

表用户重命名列id to user_id；

参见
--------

【创建表】(./create-table)
