
DESCRIBE INPUT
==============

Synopsis
--------

``` sql
DESCRIBE INPUT statement_name
```

Description
-----------

Lists the input parameters of a prepared statement along with the position and type of each parameter. Parameter types that cannot be determined will appear as `unknown`.

Examples
--------

Prepare and describe a query with three parameters:

``` sql
PREPARE my_select1 FROM
SELECT ? FROM nation WHERE regionkey = ? AND name < ?;
```

``` sql
DESCRIBE INPUT my_select1;
```

``` 
Position | Type
--------------------
       0 | unknown
       1 | bigint
       2 | varchar
(3 rows)
```

Prepare and describe a query with no parameters:

``` sql
PREPARE my_select2 FROM
SELECT * FROM nation;
```

``` sql
DESCRIBE INPUT my_select2;
```

``` 
Position | Type
-----------------
(0 rows)
```

See Also
--------

[PREPARE](./prepare.html)
