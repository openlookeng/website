+++
title = "ARM: Points to be noted"
date = "2020-06-30"
tags = ["ARM"]
archives = "2020-06"
author = "Amit Dattatray Khandekar"
description = "The story of ARM began in 1993 with a joint venture of Apple with ARM (then Acorn RISC Machines) to launch the “Apple Newton” handheld PC. And the story continues today with news that Apple is going to switch their MACs to ARM processors. What has not changed in the story is ARM’s reputation as a power-efficient processor. "
+++

Source: https://amitdkhan-pg.blogspot.com/


The story of ARM began in 1993 with a joint venture of Apple with ARM (then Acorn RISC Machines) to launch the “Apple Newton” handheld PC. And the story continues today with news that Apple is going to switch their MACs to ARM processors. What has not changed in the story is ARM’s reputation as a power-efficient processor. This is the primary reason why it is so popular in smarthphones, and why it has made its way into smart cars, drones and other internet-of-things devices where it is crucial to preserve battery life and minimize heat generation. Today even data centers can run on ARM. Due to such widespread market disruption happening, I thought about putting some specific points which I think are good-to-know for users and software developers who have just begun using the ARM ecosystem …

The reason why ARM power consumption is less has to do with the inherent nature of RISC architecture on which ARM is based. RISC instructions are so simple that each of them requires only one clock cycle to execute; so they require less transistors, and hence less power is required and less heat is generated.

Ok, but then why ARM processors started making their way into data centers? After all, mobile phones and data centers don’t have anything in common. Or do they?

Well, both consume power, and both need to perform well for a given price. Even though data centers are huge as compared to the size of a mobile phone, their CPU usage is also huge. So power efficiency is equally important. And so is the price for a given performance.

### Divide and conquer

So, just replace the existing expensive processors with more number of cheaper ARM processors, so that the total CPU power will be equal to the existing power ? Yes, this does work. Suppose, there are 4 CPUs serving 16 parallel processes, it’s better for them to be instead served by 8 or 16 lower performing CPUs. Overall throughput will likely be higher.

But what if there is a single long database query which needs high CPU power ? Even here, the database query can make use of multiple CPUs to run a parallelized query. Here we see that even the software needs to adapt to this paradigm shift: divide the task into number of parallel tasks wherever possible. We need to understand the fact that more than the power of a single CPU, what counts is the total power of all the CPUs.

Another thing is that, the worloads are not always high. For instance, cloud service workloads are always mixed, frequently with numerous small tasks, where again a server with large number of low power CPUs fits well.

### big.LITTLE

In the ARM’s big.LITTLE architecture, there can be two or more cores of different performance capacity in the same SoC. And if the workload processed by one of them changes, the other one can take over that workload on the fly if it is more suitable for the changed workload. This way unnecessary power usage and heat generation is prevented because the low-power processor type gets chosen. There has been support for doing such scheduling particularly for big.LITTLE in the linux kernel.

### ARM’s licensing model

As many of you might know, ARM does not manufacture chips; it designs them. And it’s clients buy its license to manufacture chips based on ARM’s design. Now, there are two kinds of licenses.

One is the core license. When a company buys the core license, it has to manufacture the complete CPU core using ARM’s in-house core design without modifying it. The ARM’s family of core designs that it licenses, are named Cortex-A**. E.g. in Qualcomm’s Snapdragon 855 chipset, all CPU cores are based on Cortex-A series; it means they used the ARM core license.

The other is the ARM architecture license. When a company buys this license and not the core license, it has to design it’s own core, but the core design has to be compatible with the ARM instruction set. Such cores are often called custom cores, because they have their own micro-architecture that is not designed by ARM. This provides flexibility to the big companies to build cores as per their own needs. Companies like Qualcomm, Huawei, Apple and Samsung have built such custom cores.

The beauty of this licensing model is : the ready-made core design is available to just anybody (of course a license has to be bought). And hence there are a number of vendors who all have manufactured compatibile chips. This drives innovation and competition.

### Applications

Applications for mobile devices were already written from scratch on ARM processers. But what about the software running on servers ? Well, Linux kernel has support for ARM, so OSes like Ubuntu, CentOS and Debian already have officially supported ARM images. Furthermore, if you are running on, say Ubuntu, almost all the usual x86 packages that are present in the Ubuntu repository are already there for ARM as well, at least for ARMv8. I was able to install the PostgreSQL database package, and have been running pgbench with high contention, and it runs just fine. (Probably in later blogs, I will elaborate on PostgreSQL further) Also, the compilers like gcc/g++ are already tuned for ARM architecture, so most of the hardware-specific compiler optimizations are transparently done for ARM.

But when it comes to running software meant for data servers, a lot of adaptation might be required to have a reasonable performance. For instance, applications have to be aware of the implications of the ARM’s weak memory model, especially for code synchronizatoin. Secondly, they should leverage in-built ARM capabilities like NEON (which is the ARM’s brand name for SIMD) to parallelize same operation on multiple data; and so on.

A lot of research and analysis is going on to optimize sofware running in the ARM ecosystem as a whole. But we are already seeing a gradual transition and adaptation to this ecosystem.


