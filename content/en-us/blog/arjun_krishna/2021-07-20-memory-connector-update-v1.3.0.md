+++
title = "Memory Connector: Sorting, Indexing and Spill-to-disk"
date = "2021-07-20"
tags = ["update", "metrics"]
archives = "2021-07"
author = "Arjun Krishna"
summary = "Improvements to openLookeng's Memory Connector in v1.3.0, including benchmarking results"
+++

# Memory Connector: Sorting, Indexing and Spill To Disk

## Introduction

openLooKeng is a data engine which allows you to view all of your data in one
place through its SQL interface. openLooKeng supports data exploration, ad hoc queries and
batch processing with near real time latency without moving your data around.
Memory Connector is a built-in database solution for openLooKeng that allows you to conduct
fast queries without leaving openLooKeng or deploying another database.

This post will showcase these new improvements to Memory Connector which allow
faster low-latency query performance and greater stability to Memory Connector. For
more information on how to use the Memory Connector and how it is built visit the
[Memory Connector documentation](https://openlookeng.io/docs/docs/connector/memory.html).

## New Improvements in v1.3.0

### Sorting and Indexing

Data can now be sorted and indexed by specifying additional properties during table
creation, e.g. **WITH (sorted_by=array['id'], index_columns=array['name', 'region'])**. This can
help reduce the input data and significantly improve query performance. For example,
in our test table, 99.7% of the input data was reduced (238.1M out of 238.8M rows, or
3.8GB out of 4.0GB).

The Memory Connector utilizes Bloom Filters, Min-Max indices, and Sparse indices to
filter data. These indices are efficient and have a small memory overhead. For more
information on these indices read the [Memory Connector indices documentation](https://openlookeng.io/docs/docs/connector/memory.html#index-types)

The next release after v1.3.0 will expand the StarTree index and allow it to be stored
in the Memory Connector (v1.3.0 only supports Hive Connector). In the next release,
using the StarTree index will increase the performance of certain aggregation queries
by pre-aggregating data while utilizing Memory Connector’s built-in optimization.

### Memory Spilling and Eviction

Memory Connector now supports spilling to disk with compression. This allows it to
store more tables than before and data can be recovered in case a node is restarted.

## Impact of New Changes

These new changes decreased query time by **84%** on a sorted `INTEGER` column, and
**65%** on a sorted `VARCHAR` column when running point queries at 100 concurrency. The
complete results are shown in the graphs below:

<img src = "/blog/arjun_krishna/2021-07-20-memory-connector-update-v1.3.0-01.svg" alt="Sorted INTEGER Column">

<img src = "/blog/arjun_krishna/2021-07-20-memory-connector-update-v1.3.0-02.svg" alt="Sorted VARCHAR Column">

These optimizations are done in the background after table creation so tables can be
created quickly. The table can still be queried during this time, although you may not
see the complete performance boost during this time.

This comparison was done using queries similar to the following, using different predicate values:

```
SELECT COUNT(*) FROM table WHERE int_id=61;

SELECT COUNT(*) FROM table WHERE varchar_id='APPID00061';
```

## Comparison With Existing Options

Let’s compare our new solution with other existing options, ClickHouse and the Hive
Connector:

- ClickHouse is a column-oriented database management system for online
analytical processing of queries.

- The Hive Connector for openLooKeng allows accessing data from Apache Hive, a data
warehouse software for reading, writing and managing large datasets residing in
distributed storage using SQL.

### Sorted and Indexed Data

The new Memory Connector is much faster than the Hive Connector and is as fast as
Clickhouse on simple equality queries on sorted **INTEGER** and **VARCHAR** columns. The
results of these tests are shown in this graph:

<img src = "/blog/arjun_krishna/2021-07-20-memory-connector-update-v1.3.0-03.svg" alt="Query on Indexed INTEGER Column">

<img src = "/blog/arjun_krishna/2021-07-20-memory-connector-update-v1.3.0-04.svg" alt="Query on Indexed VARCHAR Column">

This comparison was done using queries similar to the following, using different predicate values:

```
SELECT COUNT(*) FROM table WHERE int_id=61;

SELECT COUNT(*) FROM table WHERE varchar_id='APPID000001';
```

### Aggregation Queries Using JOIN

The new Memory Connector can run complex, memory intensive JOIN and other
Aggregation queries much faster because it benefits from openLooKeng’s built-in query
optimization capabilities. Where similar queries fail in ClickHouse due to the lack of a
JOIN query optimizer and memory limitations [1]. The results are shown in this figure:

<img src = "/blog/arjun_krishna/2021-07-20-memory-connector-update-v1.3.0-05.svg" alt="JOIN query on Indexed VARCHAR Column">

The complex queries used for this comparison were JOIN queries aggregating values
from two tables on a VARCHAR column:

```
SELECT COUNT(*) FROM table_dm AS m
INNER JOIN table_ds AS s
ON m.varchar_id=s.varchar_id AND m.varchar_id='APPIDTEST000180';
```

### Unsorted and Unindexed Data

Without sorting and indexing the performance of the new Memory Connector is
similar to that of the old Memory Connector. So if you don’t take advantage of our
new changes you can still expect the same performance as before.

The times for the Hive Connector were more than 20 times slower than all of the
other data sources, because of this it is not shown in this comparison. See this
comparison in the picture below:

<img src = "/blog/arjun_krishna/2021-07-20-memory-connector-update-v1.3.0-06.svg" alt="Query on Unindexed INTEGER Column (excluding Hive)">

For the tests without sorting and indexing the queries were similar to:

```
SELECT COUNT(*) FROM table WHERE int_id=61;
```

### StarTree Index

As mentioned earlier, integration with StarTree index is in progress. This will allow
cube tables to be stored in the Memory Connector so queries can gain additional
performance benefits. Some preliminary testing (see image below) showed that
StarTree index performance increased by **30%** at 100 concurrency using the Memory
Connector compared to Hive Connector.

<img src = "/blog/arjun_krishna/2021-07-20-memory-connector-update-v1.3.0-07.svg" alt="StarTree Index">

This is an example of the queries used for this test:

```
SELECT
	event_id
	,pt_d
	,COUNT(DISTINCT did) as uv
	,COUNT(DISTINCT session_id) as session_cnt
	,COUNT(1) as pv
FROM table
	where app_id = 'APPIDTEST00038'
GROUP BY app_id, event_id, pt_d;
```

## Set-Up

These tests used a dataset with 240 million rows with a total size of 4.0 GB. They
were done on a computing cluster of 14 nodes where each node had 330GB of
memory and 48 CPUs.

### Memory Connector

The tables on Memory Connector were set up differently for the sorted tests and the
unsorted tests (which was the same as the old Memory Connector).

For the sorted tests the table was created with the **sorted_by** property on the column
we were querying on:

```
CREATE TABLE memory.default.table
WITH (
	sorted_by=array['id']
)
AS SELECT * FROM hive.schema.table;
```

For the unsorted tests the table was created without the **sorted_by** keyword.

```
CREATE TABLE memory.default.table
AS SELECT * FROM hive.schema.table;
```

### Hive Connector

For Hive Connector, first, the table was created with data stored on HDFS:

```
CREATE TABLE hive.default.table (*)
WITH (
	external = false,
	format = 'ORC',
	location = 'hdfs://hacluster/user/hive/warehouse/default.db/table'
);
```

Next, a Bloom index was created on the Hive table using Heuristic Index to make the
comparison more fair:

```
CREATE INDEX idx USING bloom ON hive.default.table;
```

### ClickHouse

The tables on ClickHouse were created with this query:

```
CREATE TABLE default.table_distributed
(
	`app_id` String
	...
)
ENGINE = Distributed('cluster', 'default', 'table', rand())

CREATE TABLE default.table
(
	`app_id` String
	...
)
ENGINE = MergeTree()
PARTITION BY day
ORDER BY app_id
SETTINGS index_granularity_bytes = 1048576,
index_granularity = 8192;
```
Queries were run against the distributed table in order to utilize all of the nodes.

### StarTree Index

First a table was created in the Hive Connector.

```
CREATE TABLE hive.default.table (*)
WITH (
	external = false,
	format = 'ORC',
	location = 'hdfs://hacluster/user/hive/warehouse/default.db/table'
);
```

Next, cubes are created on the above table and stored in the Hive Connector and the
Memory Connector.

```
CREATE CUBE hive.default.cube ON hive.default.table
WITH (
	aggregations =
		(
			COUNT(DISTINCT session_id),
			COUNT(DISTINCT did),
			COUNT(*)),
			group=(
				app_id,
				event_id,
				pt_d),
			format='orc',
			orc_bloom_filter_columns=array['app_id']);

CREATE CUBE memory.default.cube on hive.default.table
WITH (
	aggregations =
		(
			COUNT(DISTINCT session_id),
			COUNT(DISTINCT did),
			COUNT(*)),
			group=(
				app_id,
				event_id,
				pt_d),
			sorted_by=array['app_id']);
```

Then data was inserted into the cubes from the specified table:

```
INSERT INTO hive.default.cube
WHERE app_id BETWEEN 'APPIDTEST0001' AND 'APPIDTEST00015';

INSERT INTO memory.default.cube
WHERE app_id BETWEEN 'APPIDTEST0001' AND 'APPIDTEST00015';
```

The insert into statements were repeated with different ranges of **app_id** values. The
final cube has 20M rows.

## Conclusion

If you need to explore and aggregate data across multiple sources use Memory
Connector with openLooKeng. Our new changes to Memory Connector make it even more
useful by speeding up query times and allowing tables to persist even when some
workers are restarted.

## Sources

[1] https://clickhouse.tech/docs/en/sql-reference/statements/select/join/#performance



