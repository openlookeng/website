+++
title = "OmniRuntime：Powering Next-Generation Analytics"
date = "2021-08-06"
tags = ["openLooKeng","BigData", "OmniRuntime"]
archives = "2021-08"
author = "gravitys169"
description = "Introduce what's OmniRuntime and it's benefits。"
+++

Modern analytics engines play a crucial role in serving businesses with real-time analysis at low latency and cost amidst data explosion in scale and variety. Moreover, present-day applications expect these systems to deliver high query concurrency and high throughput while supporting queries over both structured and unstructured data.

To satisfy these requirements, modern analytics engines and databases often rely on the compilation of query plans to native code. Hand-written operators such as FILTER, GROUPBY, and JOIN, typically contain control flows required to process different parameters and data types. Native code generation aims at minimizing the number of instructions by eliminating unnecessary code and specializing it for the underlying platform.

These techniques are widely adopted in many analytics engines such as Spark, Flink to optimize similar functionality. However, current solutions tend to have limitations in terms of ease of feature development and support of heterogeneous hardware. We designed **OmniRuntime**, a generic data analytics accelerator, to address this limitation and provide support to further improve popular analytics platforms such as openLooKeng, Spark, and Hive.

To deliver such capabilities, OmniRuntime provides five core components as illustrated in the following diagram:

<img src="/zh-cn/blog/gravitys169/omniruntime1.png">

​											Figure 1. OmniRuntime Core Components Schematic

- **OmniJit**: a transparent, easy–to-use, Just-In-Time compilation requiring zero knowledge of any low-level code generation framework such as LLVM or Janino.

- **OmniVec**: a columnar in-memory format providing high-performance memory access, full memory lifecycle management and built-in SIMD operations. It also supports all commonly used data types such as int, double, varchar, and decimal.

- **OmniOperator:** Native operator library, which makes full use of the computing capability of available hardware in today’s heterogeneous computing environment. When combined with **OmniJit**, the **OmniOperators** are capable of dnamically adapting to the workload, the parameters and the data profile to achieve the best performance.

- **OmniCache**: a relational cache that outperforms traditional block oriented cache with extremely high hit ratio.
- **OmniData**: a fast data access and collaboration layer provides bidirectional communication and data transportation between the data and compute layers.

In the following section we will provide a high level description of each components.



## OmniJIT

OmniJit component is at the Omniruntime stack's core and contributes significantly to the overall performance improvement for analytics workload.

OmniJit aims at democratizing Just-In-Time compilation for regular developers. It offers an easy-to-use framework in a high-level language such as C/C++. OmniJit automatically identifies the most performance-critical code sections in operators and optimizes them. The resulting operators are specialized using query-, runtime, and hardware-specific machine codes. OmniJit relies on runtime information to apply the best optimization based on the query context. This can be the dataset cardinality, column size, datatypes, hardware available (SIMD, accelerators, etc..), and many other information to produce the best operator optimization.

By using OmniJit, analytics engine developers will no longer need to wrestle with the convoluted low-level APIs provided by systems such LLVM or Janino to extract the best performance.

<img src="/zh-cn/blog/gravitys169/omniruntime2.png">

​								Figure 2. OmniJit branch cropping and circular unfolding optimization

 

## OmniOperator

 OmniOperator represent the computational code that will process the data for a specific query, potentially written in SQL. A SQL query can be composed of a multitude of different operators and OmniJit is responsible for optimizing them on the fly. OmniJit optimizes the C++ operators to produce executables with minimum executed instruction count.

The structure of the Operator interface is similar to the Volcano model as it follows a similar interface life cycle: Instanciate, AddInput, GetOuput and Close. All OmniOperators offer the same standard interface with the implementation being opaque to the analytics engine.

 By leveraging a standard interface, we can easily expose these operators to the upper-layer computing engine. Moreover, it helps us to provide a consistent development life cycle experience while allowing portability across various analytics platforms. The developer can either let OmniJit optimize the operator using the automated approach. Or, he can guides optimization policies such as parameter fixing, cyclical development, and vectorized adaptive execution for specific core methods within the code.

The resulting OmniOperators have less executed instruction count, lower resource consumption, and reduce development overhead than native platform operators. The following figure shows the overall OmniOperator life cycle within a Java Analytics platform. As most analytics engines are coded in Java, we also provide a JNI interface to facilitate the integration.

<img src="/zh-cn/blog/gravitys169/omniruntime3.png">

​						Figure 3. Interaction between the OmniOperator engine and the Native Operator

 

## OmniVec

 OmniVector is the next component of OmniRuntime. OmniVector defines a standard columnar memory format. OmniVector is designed to be The portable language-independent column-based memory data format for OmniRuntime. OmniVector supports a rich data type system designed to address the needs of the various analytic data systems. This in-memory data format delivers high-performance and high scalability for data intensive applications.

At its core, OmniVector is implemented in C++ with high-level language binding for cross-compatibility. It offers an asynchronous interface allowing reading and writing operations to be carried by the various components in parallel. This allows us to expose the content of an OmniVector while write or persistency operations are being carried over.

The following figure shows the overall architecture of OmniVec.

<img src="/zh-cn/blog/gravitys169/omniruntime4.png">
​													Figure 4. OmniVec Binging and Native Architecture

 Scope based full life cycle management of OmniVector not only eliminates the possibility of memory leak, but also provides the high performance memory access. Each OmniVector goes through several steps in its life cycle. Each step is triggered by a OmniVector operation:

1. Scope Creation : In order to have efficient memory management and avoid pagefault overhead, vectors are allocated within a specific execution scope. This allows efficient memory pooling, which minimizes memory management overhead.

2. OmniVector Allocation : By using the scope create above, developers can now allocate a new vector.

3. OmniVector Mutation : the API support Set and Put operations. The former operates a single value at a specific corresponding index position. The latter is the batch put method, in which an array is inserted to a specified start position.

4. OmniVector Read : Like the Mutation, we either support single value retrieval or batch operations.

5. OmniVector Release : Once a vector is not used, it can then be released to the scope memory pool

6. Scope Release: Once all vectors are released, we can release the scope and the associated memory pool.

 As a result of this design OmniVector support the following features: 

- Zero copy  operations
- Supports data lifecycle management and memory leakage detection.
- Supports complex data structures, such as MAP, LIST, and Structure.
- SIMD instruction optimization and hardware acceleration interface
- Automatic spill over to storage 
- High performance memory allocation and pooling.

 

## OmniJIT, OmniVector, And OmniOperator performance 

 We integrated OmniRuntime and OmniJit in popular Big Data systems such as openLooKeng, Spark, and Hive. We then benchmarked the integration using TPC-H to show that the designed framework significantly outperforms commercial analytics engines.

<img src="/zh-cn/blog/gravitys169/omniruntime5.png">

​												Figure 5. Operator effect of OmniJit optimization

 

## OmniCache

The OmniCache is a relational cache within  OmniRuntime. The OmniCache not only caches data, but also maintains relation between data with schema information in the cache. OmniCache constructs virtual data sets, caches relational data derived from physical data sets or other virtual data sets, and uses SQL SELECT statements to define relational data for cache.

This approach has the advantage over the traditional file block-based cache system. The entire file block must be cached or discarded, which may cause many data swap-in and swap-out operations, resulting in a very low cache hit ratio.

To maintain relational information, OmniCache exposes its status and schema information to the query optimizer to maximize the hit ratio. The exposed cache metadata helps the analytics engine to optimize the query planand access the data in the cache first rather than through the slow data storage. Moreover, the cache is also able to store intermediate query results. It allows accelerated operation by enabling the query planner to directly access the previously computed data rather than executing the complete query plan as shown in figure 5.



<img src="/zh-cn/blog/gravitys169/omniruntime6.png">

​														Figure 6. OmniCache operation schematic

 Omnicache expose the following features:

- Cache management: Generate and manage materialized views by using materialized view commands.
- SQL rewriting: SQL rewriting is performed using relational algebra and cost models to efficiently utilize cache data.
- Cache Store: The relational cache store of the global memory pool is implemented based on the external memory of the heap, implementing efficient data storage and access.



## OmniData

OmniData is OmniRuntime's fast data access and collaboration layer targetting data transfer reduction between the segregated data and compute layers, which commonly seen in morden data centers.

Rather than directly loading files from the storage side and then processing data, the OmniData offloads specific operations to the storage side for near-data processing. The objective is to cull the amount of required network communication and overall computation.

OmniData achieves this by dividing the query execution into several segments matching the data distribution. Each segment representing sub-processing operations is then sent to the near or on storage node for execution. Affinity scheduling is used to avoid overloading the storage node computational capability and retain a high through overall throughput. The segment operations allow local data loading and processing.

On top of its near data processing capabilities, OmniData also offer the following features: 

- Data encryption and compression leveraging native heterogeneous computing devices, the hardware accelerated adedicated encryption and compression capability engine can dramatically increase the data processing throughput.

- Dynamic data filtering: we leverage dynamic code generation to support in-nic operations in order to maximize the processing throughput while reducing the resource used. 

- Network stack offloading:  TOE and Zero-copy acceleration is further leverage for transferring the results from the local computation

<img src="/zh-cn/blog/gravitys169/omniruntime7.png">

​														Figure 7. OmniData Operation Schematic

 

## Summary

OmniRuntime uses the combination of OmniJIT, OminVec, OmniOperator, OmniCache, and OmniData to provide a common data processing foundation for next-generation analytics platforms. OmniRuntime dramatically reduces the burden of creating custom optimization by offering a generic engine with contextualized optimization capabilities for different analysis engines.

Omniruntime framework supports heterogeneous hardware environments including various processors (x86, ARM), accelerators (GPU, FPGA, ..), and interconnects.

OmniRuntime's powerful capabilities for next-generation data processing enable the data analytics engines to meet current and future business requirements of high concurrency, high throughput, over structured and unstructured queries.