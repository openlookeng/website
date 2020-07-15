# Application Development Guide

This document describes the common tools used for application development and guides users to develop applications based on openEuler.

## Overview

This document describes the following four parts to guide users to use openEuler and develop code based on openEuler.

-   Install and use the GCC compiler in the openEuler operating system \(OS\), and complete the development, compilation, and execution of simple code.
-   In the openEuler OS, use the JDK built-in tool to compile and execute code.
-   Install IntelliJ IDEA in the openEuler OS for Java development.
-   Create an RPM package locally or using the Open Build Service \(OBS\).

## Intended Audience

This document is intended for all users who use the openEuler OS for code development. You are expected to have the following experience or capabilities:

-   Have basic knowledge of the Linux OS.
-   Know how to use Linux command lines.

## Symbol Conventions

The symbols that may be found in this document are defined as follows.

<a name="table2622507016410"></a>
<table><thead align="left"><tr id="row1530720816410"><th class="cellrowborder" valign="top" width="20.580000000000002%" id="mcps1.1.3.1.1"><p id="p6450074116410"><a name="p6450074116410"></a><a name="p6450074116410"></a><strong id="b2136615816410"><a name="b2136615816410"></a><a name="b2136615816410"></a>Symbol</strong></p>
</th>
<th class="cellrowborder" valign="top" width="79.42%" id="mcps1.1.3.1.2"><p id="p5435366816410"><a name="p5435366816410"></a><a name="p5435366816410"></a><strong id="b5941558116410"><a name="b5941558116410"></a><a name="b5941558116410"></a>Description</strong></p>
</th>
</tr>
</thead>
<tbody><tr id="row5786682116410"><td class="cellrowborder" valign="top" width="20.580000000000002%" headers="mcps1.1.3.1.1 "><p id="p2204984716410"><a name="p2204984716410"></a><a name="p2204984716410"></a><a name="image4504446716410"></a><a name="image4504446716410"></a><span><img class="" id="image4504446716410" height="25.270000000000003" width="55.9265" src="figures/en-us_image_0229243712.png"></span></p>
</td>
<td class="cellrowborder" valign="top" width="79.42%" headers="mcps1.1.3.1.2 "><p id="p4388861916410"><a name="p4388861916410"></a><a name="p4388861916410"></a>Indicates a potentially hazardous situation which, if not avoided, could result in equipment damage, data loss, performance deterioration, or unanticipated results. </p>
<p id="p1238861916410"><a name="p1238861916410"></a><a name="p1238861916410"></a>NOTICE is used to address practices not related to personal injury.</p>
</td>
</tr>
<tr id="row2856923116410"><td class="cellrowborder" valign="top" width="20.580000000000002%" headers="mcps1.1.3.1.1 "><p id="p5555360116410"><a name="p5555360116410"></a><a name="p5555360116410"></a><a name="image799324016410"></a><a name="image799324016410"></a><span><img class="" id="image799324016410" height="15.96" width="47.88" src="figures/en-us_image_0229243671.png"></span></p>
</td>
<td class="cellrowborder" valign="top" width="79.42%" headers="mcps1.1.3.1.2 "><p id="p4612588116410"><a name="p4612588116410"></a><a name="p4612588116410"></a>Supplements the important information in the main text.</p>
<p id="p1232588116410"><a name="p1232588116410"></a><a name="p1232588116410"></a>NOTE is used to address information not related to personal injury, equipment damage, and environment deterioration.</p>
</td>
</tr>
</tbody>
</table>

## Command Conventions

**Table  1**  Command conventions

<a name="it_osca_smma_400004_mmccppss_tab01"></a>
<table><thead align="left"><tr id="row31344565"><th class="cellrowborder" valign="top" width="17.169999999999998%" id="mcps1.2.3.1.1"><p id="p55881847"><a name="p55881847"></a><a name="p55881847"></a><strong id="b842352706111143"><a name="b842352706111143"></a><a name="b842352706111143"></a>Format</strong></p>
</th>
<th class="cellrowborder" valign="top" width="82.83%" id="mcps1.2.3.1.2"><p id="p30135782"><a name="p30135782"></a><a name="p30135782"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="row25079273"><td class="cellrowborder" valign="top" width="17.169999999999998%" headers="mcps1.2.3.1.1 "><p id="p18155241"><a name="p18155241"></a><a name="p18155241"></a><strong id="b29179443"><a name="b29179443"></a><a name="b29179443"></a>Boldface</strong></p>
</td>
<td class="cellrowborder" valign="top" width="82.83%" headers="mcps1.2.3.1.2 "><p id="p14724664"><a name="p14724664"></a><a name="p14724664"></a>Command keywords, which remain unchanged in the commands, are in <strong id="b254283714320"><a name="b254283714320"></a><a name="b254283714320"></a>boldface</strong>.</p>
</td>
</tr>
<tr id="row51847150"><td class="cellrowborder" valign="top" width="17.169999999999998%" headers="mcps1.2.3.1.1 "><p id="p38869628"><a name="p38869628"></a><a name="p38869628"></a><em id="i14282340"><a name="i14282340"></a><a name="i14282340"></a>Italic</em></p>
</td>
<td class="cellrowborder" valign="top" width="82.83%" headers="mcps1.2.3.1.2 "><p id="p16018923"><a name="p16018923"></a><a name="p16018923"></a>Command parameters, which are replaced with actual values in the commands, are in <em id="i15112194584314"><a name="i15112194584314"></a><a name="i15112194584314"></a>italic</em>.</p>
</td>
</tr>
<tr id="row22464349"><td class="cellrowborder" valign="top" width="17.169999999999998%" headers="mcps1.2.3.1.1 "><p id="p7672996"><a name="p7672996"></a><a name="p7672996"></a>[ ]</p>
</td>
<td class="cellrowborder" valign="top" width="82.83%" headers="mcps1.2.3.1.2 "><p id="p17532968"><a name="p17532968"></a><a name="p17532968"></a>Items in square brackets are optional.</p>
</td>
</tr>
<tr id="row23578988"><td class="cellrowborder" valign="top" width="17.169999999999998%" headers="mcps1.2.3.1.1 "><p id="p30849877"><a name="p30849877"></a><a name="p30849877"></a>{ x | y | ... }</p>
</td>
<td class="cellrowborder" valign="top" width="82.83%" headers="mcps1.2.3.1.2 "><p id="p15812143"><a name="p15812143"></a><a name="p15812143"></a>Optional items are grouped in braces and separated by vertical bars. One item is selected.</p>
</td>
</tr>
<tr id="row8091566"><td class="cellrowborder" valign="top" width="17.169999999999998%" headers="mcps1.2.3.1.1 "><p id="p51437108"><a name="p51437108"></a><a name="p51437108"></a>[ x | y | ... ]</p>
</td>
<td class="cellrowborder" valign="top" width="82.83%" headers="mcps1.2.3.1.2 "><p id="p5656190"><a name="p5656190"></a><a name="p5656190"></a>Optional items are grouped in brackets and separated by vertical bars. One item is selected or no item is selected. </p>
</td>
</tr>
<tr id="row50905712"><td class="cellrowborder" valign="top" width="17.169999999999998%" headers="mcps1.2.3.1.1 "><p id="p29722012"><a name="p29722012"></a><a name="p29722012"></a>{ x | y | ... }<sup id="sup66171520"><a name="sup66171520"></a><a name="sup66171520"></a>*</sup></p>
</td>
<td class="cellrowborder" valign="top" width="82.83%" headers="mcps1.2.3.1.2 "><p id="p58292871"><a name="p58292871"></a><a name="p58292871"></a>Optional items are grouped in brackets and separated by vertical bars. A minimum of one or a maximum of all can be selected.</p>
</td>
</tr>
<tr id="row54873797"><td class="cellrowborder" valign="top" width="17.169999999999998%" headers="mcps1.2.3.1.1 "><p id="p15592595"><a name="p15592595"></a><a name="p15592595"></a>[ x | y | ... ]<sup id="sup6115628"><a name="sup6115628"></a><a name="sup6115628"></a>*</sup></p>
</td>
<td class="cellrowborder" valign="top" width="82.83%" headers="mcps1.2.3.1.2 "><p id="p25603865"><a name="p25603865"></a><a name="p25603865"></a>Optional items are grouped in brackets and separated by vertical bars. One or more items are selected or no item is selected. </p>
</td>
</tr>
</tbody>
</table>
