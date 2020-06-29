创建角色
===========

摘要
--------

"```{.none}"
创建ROLE角色名
[与管理员（用户|普通用户|角色|当前角色|当前角色|当前角色） ]
```

问题描述
-----------

`CREATE ROLE`在当前目录中创建指定的角色。

可选`WITH ADMIN`子句导致角色被创建，指定的用户作为角色admin。角色admin具有删除或授予角色的权限。如果未指定可选的`WITH ADMIN`子句，则以当前用户admin创建角色。

示例
--------

创建角色`admin` ：

创建ROLE管理员；

使用admin `bob`创建角色`moderator`：

创建角色版主与管理员用户bob；

限制
-----------

部分Connector不支持角色管理。有关更多详细信息，请参阅连接器文档。

参见
--------

【drop-role】（./drop-role），【set-role】（./set-role），【grant-role】（./grant-role），【revoke-roles】(./revoke-roles),（取消角色角色） ,（取消角色） ,（取消角色）
