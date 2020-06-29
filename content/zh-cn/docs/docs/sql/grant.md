n.格兰特
=====

摘要
--------

"```{.none}"
GRANT（特权【，...】|(所有特权）)
ON [ TABLE ] table_name TO （用户|普通用户|角色角色）
【与赠款选项】
```

问题描述
-----------

将指定的权限授予指定的被授权者。

指定`ALL PRIVILEGES`将赋予用户[DELETE](./delete.md)、[INSERT](./insert.md)和[SELECT](./select.md)三种权限。

指定`ROLE PUBLIC`将授予`PUBLIC`角色权限，从而授予所有用户。

可选的`WITH GRANT OPTION`子句允许被授权者将同样的特权授予其他人。

为了使`GRANT`语句成功，执行它的用户应该拥有指定的特权以及这些特权的`GRANTOPTION`。

示例
--------

授予用户`orders`表的`INSERT`和`SELECT`权限
艾丽丝：

授权插入，选择订单给爱丽丝；

给用户`alice`授予表`nation`上的`SELECT`特权，同时允许`alice`授予其他人`SELECT`特权：

给予选择权的国家选择

在表`orders`上给每个人授予`SELECT`权限：

订单授权选择到角色公开

限制
-----------

有些连接器不支持`GRANT`。有关更多详细信息，请参阅连接器文档。

参见
--------

【废除】（./废除），【表演助学金】（./表演助学金）
