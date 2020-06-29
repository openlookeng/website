Lambda表达式
==================

Lambda表达式使用`->`：

x->x+1配置
(x, y) -> x+y，以此类推
x -> regexp_like（x, 'a+'）
x -> x[1] / x[2]
x -> IF（x>0、x,-x） ，其中，
x -> COALESCE(x, 0)
x -> CAST（x AS的JSON格式）
x->x +TRY(1 / 0) ，表示从x开始计数。

大多数SQL表达式都可以用在lambda体中，但有一些例外：

-不支持子查询。第x步->第2+ (SELECT 3)步
-不支持聚合。x->max(y)`，即从x到y的差值。
